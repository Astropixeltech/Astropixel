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
      <div className="space-y-6 animate-in fade-in duration-200">
        {/* Header Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-border/60 shadow-sm">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={resetForm} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Works
            </Button>
            <div>
              <h2 className="text-xl font-bold">
                {editingWork ? `Edit Project: ${editingWork.title}` : "Add New Project"}
              </h2>
              <p className="text-xs text-muted-foreground">
                Set project title, category, description, cover showcase image, and live URL.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={resetForm}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
              <Save className="w-4 h-4" />
              Save Project
            </Button>
          </div>
        </div>

        {/* Form Body Grid */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column: Project Info */}
            <Card className="border-border/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Project Overview</CardTitle>
                <CardDescription>Title, category selection, and description.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="font-medium">Project Title *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Project Title"
                    className="mt-1.5"
                    required
                  />
                </div>

                <div>
                  <Label className="font-medium">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(val) => setFormData({ ...formData, category: val })}
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">Web Design & Development</SelectItem>
                      <SelectItem value="graphics">Graphic Design</SelectItem>
                      <SelectItem value="branding">Logo & Branding</SelectItem>
                      <SelectItem value="photography">Photography</SelectItem>
                      <SelectItem value="motion">Motion / 3D</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="font-medium">Project Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Short summary of technologies used, goal, or results..."
                    rows={5}
                    className="mt-1.5"
                  />
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between p-3.5 rounded-xl border border-border/60 bg-muted/30">
                    <div>
                      <Label className="font-medium cursor-pointer">Featured Project</Label>
                      <p className="text-xs text-muted-foreground">Show in homepage showcase grid</p>
                    </div>
                    <Switch
                      checked={formData.is_featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl border border-border/60 bg-muted/30">
                    <div>
                      <Label className="font-medium cursor-pointer">Published Status</Label>
                      <p className="text-xs text-muted-foreground">Visible on public portfolio page</p>
                    </div>
                    <Switch
                      checked={formData.is_published}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Column: Cover Image & Links */}
            <Card className="border-border/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Cover Media & Live Links</CardTitle>
                <CardDescription>Upload cover preview image and set project URL.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="font-medium">Cover Showcase Image</Label>
                  <div className="mt-1.5">
                    <ImageUploader
                      value={formData.image_url}
                      onChange={(url) => setFormData({ ...formData, image_url: url })}
                      folder="works"
                      placeholder="Cover Image URL or Upload"
                    />
                  </div>
                </div>

                <div>
                  <Label className="font-medium">Live Website / Project Link</Label>
                  <Input
                    value={formData.project_url}
                    onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                    placeholder="https://example.com"
                    className="mt-1.5"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-end gap-3 mt-6 p-4 rounded-2xl bg-card border border-border/60 shadow-sm">
            <Button type="button" variant="outline" onClick={resetForm}>
              Cancel
            </Button>
            <Button type="submit" className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
              <Save className="w-4 h-4" />
              Save Project
            </Button>
          </div>
        </form>
      </div>
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
          <Card key={work.id} className={!work.is_published ? "opacity-60" : ""}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-bold">{work.title}</CardTitle>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(work)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(work.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {work.image_url ? (
                <div className="relative aspect-video rounded-md overflow-hidden mb-3 bg-muted">
                  <img
                    src={work.image_url}
                    alt={work.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-video rounded-md bg-muted flex items-center justify-center mb-3">
                  <Image className="w-8 h-8 text-muted-foreground" />
                </div>
              )}
              <div className="space-y-2">
                <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded uppercase tracking-wider">
                  {work.category}
                </span>
                {work.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {work.description}
                  </p>
                )}
                <div className="flex justify-between items-center pt-2 text-xs">
                  <div className="flex gap-2">
                    {work.is_featured && (
                      <span className="px-1.5 py-0.5 bg-amber-500/10 text-amber-600 rounded">
                        Featured
                      </span>
                    )}
                    {!work.is_published && (
                      <span className="px-1.5 py-0.5 bg-red-500/10 text-red-600 rounded">
                        Draft
                      </span>
                    )}
                  </div>
                  {work.project_url && (
                    <a
                      href={work.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1 font-medium"
                    >
                      View Live <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
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
