import { useState, useEffect, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, ExternalLink, Image, ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import ImageUploader from "./ImageUploader";
import WorkHeroEditor from "./WorkHeroEditor";
import { DEFAULT_PORTFOLIO_PROJECTS, Work, getSavedWorks } from "@/hooks/useWorks";
import ProjectBuilder from "./ProjectBuilder";

export const WorksManagement = () => {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingWork, setEditingWork] = useState<Work | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);

  // Local state initialized with saved/fallback works
  const [worksList, setWorksList] = useState<Work[]>(() => getSavedWorks());

  const fetchWorks = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/works");
      if (res.ok) {
        const json = await res.json();
        if (json.works && json.works.length > 0) {
          setWorksList(json.works);
          if (typeof window !== "undefined") {
            localStorage.setItem("astropixel_works", JSON.stringify(json.works));
          }
          return;
        }
      }
    } catch (err) {
      console.warn("Error fetching /api/works:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorks();
  }, [fetchWorks]);

  const saveWorksList = (updated: Work[]) => {
    setWorksList(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("astropixel_works", JSON.stringify(updated));
    }
    queryClient.invalidateQueries({ queryKey: ["public-works"] });
    queryClient.invalidateQueries({ queryKey: ["admin-works"] });
  };

  const resetForm = () => {
    setEditingWork(null);
    setIsFormOpen(false);
  };

  const handleAddNew = () => {
    setEditingWork(null);
    setIsFormOpen(true);
  };

  const handleEdit = (work: Work) => {
    setEditingWork(work);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await fetch(`/api/works?id=${id}`, { method: "DELETE" });
      const updated = worksList.filter((w) => w.id !== id);
      saveWorksList(updated);
      toast.success("Project deleted successfully!");
    } catch {
      toast.error("Failed to delete project");
    }
  };

  if (isFormOpen) {
    return (
      <div className="space-y-4">
        <ProjectBuilder
          initialData={
            editingWork || {
              title: "",
              category: "web",
              description: "",
              image_url: "",
              is_published: true,
              is_featured: false,
              content_blocks: [],
            }
          }
          onSaveSuccess={() => {
            fetchWorks();
            queryClient.invalidateQueries({ queryKey: ["public-works"] });
            queryClient.invalidateQueries({ queryKey: ["admin-works"] });
            setIsFormOpen(false);
          }}
          onCancel={resetForm}
        />
      </div>
    );
  }

  const filteredWorks = selectedCategory === "all"
    ? worksList
    : worksList.filter((w) => w.category === selectedCategory);

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web" },
    { id: "branding", label: "Branding" },
    { id: "graphics", label: "Graphics" },
    { id: "motion", label: "Motion" },
  ];

  return (
    <div className="space-y-6">
      <WorkHeroEditor />

      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-card border border-border/60 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            Portfolio Projects ({filteredWorks.length})
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage case studies, client works, and homepage featured showcases.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1 p-1 bg-secondary/40 border border-border/50 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-card text-foreground shadow-sm border border-border/60"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <Button onClick={handleAddNew} className="gap-2 bg-gradient-to-r from-primary to-purple-600 text-white shadow-md">
            <Plus className="w-4 h-4" /> Add Project
          </Button>
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredWorks.map((work) => (
          <div
            key={work.id}
            className={`group rounded-2xl border border-border/50 bg-card overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col justify-between ${
              !work.is_published ? "opacity-60" : ""
            }`}
          >
            {/* Thumbnail */}
            <div className="relative aspect-[16/10] bg-muted w-full overflow-hidden">
              {work.image_url ? (
                <img
                  src={work.image_url}
                  alt={work.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-secondary/30">
                  <Image className="w-10 h-10 text-muted-foreground/30" />
                </div>
              )}

              {/* Badges Overlay */}
              <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                <span className="px-2.5 py-0.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold rounded-full uppercase tracking-wider border border-white/20">
                  {work.category}
                </span>
                {work.is_featured && (
                  <span className="px-2.5 py-0.5 bg-amber-500/90 backdrop-blur-md text-white text-[10px] font-bold rounded-full uppercase">
                    ★ Featured
                  </span>
                )}
              </div>

              {!work.is_published && (
                <span className="absolute top-3 right-3 px-2 py-0.5 bg-red-500/80 backdrop-blur-md text-white text-[10px] font-bold rounded-full">
                  Draft
                </span>
              )}
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="text-base font-bold text-foreground leading-snug line-clamp-1 group-hover:text-primary transition-colors">
                  {work.title}
                </h3>
                {work.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1.5 leading-relaxed">
                    {work.description}
                  </p>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-border/40 flex items-center justify-between">
                {work.project_url ? (
                  <a
                    href={work.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                  >
                    Live Preview <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-xs text-muted-foreground italic">Case Study</span>
                )}

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2.5 text-xs gap-1 hover:text-primary hover:bg-primary/10"
                    onClick={() => handleEdit(work)}
                  >
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 hover:text-red-500 hover:bg-red-500/10"
                    onClick={() => handleDelete(work.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredWorks.length === 0 && (
        <div className="text-center py-16 rounded-2xl border border-dashed border-border text-muted-foreground space-y-3">
          <p className="text-sm">No portfolio projects found in this category.</p>
          <Button onClick={handleAddNew} size="sm" variant="outline">
            Create First Project
          </Button>
        </div>
      )}
    </div>
  );
};
