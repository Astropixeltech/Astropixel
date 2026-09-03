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
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

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

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const updated = worksList.filter((w) => w.id !== id);
    saveWorksList(updated);
    toast.success("Project deleted successfully!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      toast.error("Project title is required");
      return;
    }

    if (editingWork) {
      const updated = worksList.map((w) =>
        w.id === editingWork.id ? { ...w, ...formData } : w
      );
      saveWorksList(updated);
      toast.success("Project updated successfully!");
    } else {
      const newWork: Work = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        category: formData.category,
        image_url: formData.image_url,
        project_url: formData.project_url,
        is_featured: formData.is_featured,
        is_published: formData.is_published,
        order_index: worksList.length + 1,
      };
      const updated = [newWork, ...worksList];
      saveWorksList(updated);
      toast.success("New project created successfully!");
    }

    resetForm();
  };

  if (isFormOpen) {
    if (editingWork) {
      return (
        <div className="space-y-6">
          <Button variant="ghost" onClick={resetForm} className="gap-2 mb-2">
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </Button>
          <ProjectBuilder
            initialData={editingWork}
            onSaveSuccess={() => {
              toast.success("Project saved successfully!");
              setIsFormOpen(false);
            }}
            onCancel={resetForm}
          />
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={resetForm}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold">Add New Project</h2>
            <p className="text-muted-foreground text-sm">Create a new portfolio project showcase</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <Card className="border-border/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Project Details</CardTitle>
                <CardDescription>Enter title, description, and classification.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="font-medium text-xs">Project Title *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Modern FinTech Brand Identity"
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label className="font-medium text-xs">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(val) => setFormData({ ...formData, category: val })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">Web Design & Development</SelectItem>
                      <SelectItem value="graphics">Graphic Design</SelectItem>
                      <SelectItem value="branding">Logo & Branding</SelectItem>
                      <SelectItem value="motion">Motion & Video</SelectItem>
                      <SelectItem value="photography">Photography</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="font-medium text-xs">Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of the project, deliverables, and outcome..."
                    rows={4}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="font-medium text-xs">Live Website / Behance / Video URL</Label>
                  <Input
                    value={formData.project_url}
                    onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                    placeholder="https://..."
                    className="mt-1"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl border border-border/60 bg-secondary/30">
                  <div>
                    <Label className="text-xs font-semibold cursor-pointer">Featured Project</Label>
                    <p className="text-[11px] text-muted-foreground">Highlight on homepage showcase</p>
                  </div>
                  <Switch
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Cover Media</CardTitle>
                <CardDescription>Upload cover image or teaser artwork.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="font-medium text-xs">Cover Showcase Image</Label>
                  <div className="mt-1">
                    <ImageUploader
                      value={formData.image_url}
                      onChange={(url) => setFormData({ ...formData, image_url: url })}
                      folder="works"
                      placeholder="Paste image URL or click Upload"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl border border-border/60 bg-secondary/30">
                  <div>
                    <Label className="text-xs font-semibold cursor-pointer">Published Status</Label>
                    <p className="text-[11px] text-muted-foreground">Make visible on public portfolio</p>
                  </div>
                  <Switch
                    checked={formData.is_published}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center justify-end gap-3 mt-6 p-4 rounded-2xl bg-card border border-border/60 shadow-sm">
            <Button type="button" variant="outline" onClick={resetForm}>
              Cancel
            </Button>
            <Button type="submit" className="gap-2 bg-gradient-to-r from-primary to-purple-600 text-white">
              <Save className="w-4 h-4" /> Save Project
            </Button>
          </div>
        </form>
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
