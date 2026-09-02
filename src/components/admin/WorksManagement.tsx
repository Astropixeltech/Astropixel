import { useState, useEffect } from "react";
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

  // Local state for instant CRUD operations with localStorage persistence
  const [worksList, setWorksList] = useState<Work[]>(() => getSavedWorks());

  useEffect(() => {
    // Background fetch from Supabase if DB contains items
    const fetchSupabaseWorks = async () => {
      try {
        const { data, error } = await (supabase as any)
          .from("works")
          .select("*")
          .order("order_index", { ascending: true });
        if (!error && data && data.length > 0) {
          setWorksList(data as Work[]);
          if (typeof window !== "undefined") {
            localStorage.setItem("astropixel_works", JSON.stringify(data));
          }
        }
      } catch (err) {}
    };
    fetchSupabaseWorks();
  }, []);

  const saveWorksList = (updated: Work[]) => {
    setWorksList(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("astropixel_works", JSON.stringify(updated));
    }
    queryClient.invalidateQueries({ queryKey: ["public-works"] });
    queryClient.invalidateQueries({ queryKey: ["admin-works"] });
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "web",
    image_url: "",
    project_url: "",
    is_featured: false,
    is_published: true,
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "web",
      image_url: "",
      project_url: "",
      is_featured: false,
      is_published: true,
    });
    setEditingWork(null);
    setIsFormOpen(false);
  };

  const handleAddNew = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const handleEdit = (work: Work) => {
    setEditingWork(work);
    setFormData({
      title: work.title,
      description: work.description || "",
      category: work.category,
      image_url: work.image_url || "",
      project_url: work.project_url || "",
      is_featured: work.is_featured,
      is_published: work.is_published,
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("আপনি কি নিশ্চিত এই প্রজেক্টটি ডিলিট করতে চান?")) return;
    const updated = worksList.filter((w) => w.id !== id);
    saveWorksList(updated);
    toast.success("পোর্টফোলিও প্রজেক্ট ডিলিট করা হয়েছে!");

    try {
      await (supabase as any).from("works").delete().eq("id", id);
    } catch (err) {}
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Project Title is required");
      return;
    }

    if (editingWork) {
      const updated = worksList.map((w) =>
        w.id === editingWork.id
          ? {
              ...w,
              ...formData,
              description: formData.description || null,
              image_url: formData.image_url || null,
              project_url: formData.project_url || null,
            }
          : w
      );
      saveWorksList(updated);
      toast.success("পোর্টফোলিও প্রজেক্ট সফলভাবে আপডেট করা হয়েছে!");

      try {
        await (supabase as any).from("works").update(formData).eq("id", editingWork.id);
      } catch (err) {}
    } else {
      const newWork: Work = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description || null,
        category: formData.category,
        image_url: formData.image_url || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
        project_url: formData.project_url || null,
        is_featured: formData.is_featured,
        is_published: formData.is_published,
        order_index: worksList.length + 1,
      };
      const updated = [...worksList, newWork];
      saveWorksList(updated);
      toast.success("নতুন পোর্টফোলিও প্রজেক্ট সফলভাবে যুক্ত করা হয়েছে!");

      try {
        await (supabase as any).from("works").insert(formData);
      } catch (err) {}
    }

    resetForm();
  };

  // Full-page Inline Editor Mode
  if (isFormOpen) {
    return (
      <ProjectBuilder 
        initialData={editingWork || formData}
        onCancel={resetForm}
        onSaveSuccess={() => {
          resetForm();
          // The queryClient in layout should invalidate/refetch, or we can force reload
          if (typeof window !== 'undefined') {
            window.location.reload();
          }
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <WorkHeroEditor />

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Portfolio / Works ({worksList.length})</h2>
        <Button onClick={handleAddNew} className="gap-2">
          <Plus className="w-4 h-4" />
          Add New Project
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {worksList.map((work) => (
          <Card key={work.id} className={`overflow-hidden flex flex-col hover:shadow-md transition-all duration-200 border-border/60 ${!work.is_published ? "opacity-60" : ""}`}>
            {/* Top Image Section - Clean, no overlays */}
            <div className="relative aspect-[16/10] bg-muted w-full overflow-hidden border-b border-border/40">
              {work.image_url ? (
                <img
                  src={work.image_url}
                  alt={work.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Image className="w-10 h-10 text-muted-foreground/30" />
                </div>
              )}
            </div>

            {/* Content Section */}
            <CardContent className="p-5 flex-grow flex flex-col">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase tracking-wider">
                  {work.category}
                </span>
                {work.is_featured && (
                  <span className="px-1.5 py-0.5 bg-amber-500/10 text-amber-600 text-[10px] font-bold uppercase rounded">
                    Featured
                  </span>
                )}
                {!work.is_published && (
                  <span className="px-1.5 py-0.5 bg-red-500/10 text-red-600 text-[10px] font-bold uppercase rounded">
                    Draft
                  </span>
                )}
              </div>

              {/* Title and Actions */}
              <div className="flex justify-between items-start gap-3 mb-2">
                <h3 className="text-lg font-bold leading-tight line-clamp-2 text-foreground">
                  {work.title}
                </h3>
                <div className="flex gap-1 shrink-0 -mt-1 -mr-2">
                  <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-primary" onClick={() => handleEdit(work)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(work.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* Description */}
              {work.description && (
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">
                  {work.description}
                </p>
              )}
              
              {/* Footer */}
              <div className="mt-auto pt-4 border-t border-border/40 flex justify-between items-center">
                {work.project_url ? (
                  <a
                    href={work.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 flex items-center gap-1.5 text-sm font-semibold transition-colors"
                  >
                    View Live <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <span className="text-sm text-muted-foreground italic">No link available</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {worksList.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No portfolio projects found. Click the button above to add a new project.
        </div>
      )}
    </div>
  );
};
