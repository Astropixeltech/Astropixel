import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, ExternalLink, Image } from "lucide-react";
import { toast } from "sonner";
import ImageUploader from "./ImageUploader";
import WorkHeroEditor from "./WorkHeroEditor";
import { DEFAULT_PORTFOLIO_PROJECTS, Work, getSavedWorks, PORTFOLIO_CATEGORIES } from "@/hooks/useWorks";

export const WorksManagement = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
    setIsDialogOpen(false);
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
    setIsDialogOpen(true);
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

  return (
    <div className="space-y-6">
      <WorkHeroEditor />

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Portfolio / Works ({worksList.length})</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="w-4 h-4 mr-2" />
              Add New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingWork ? "Edit Project" : "Add New Project"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Title *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Project Title"
                  required
                />
              </div>

              <div>
                <Label>Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(val) => setFormData({ ...formData, category: val })}
                >
                  <SelectTrigger>
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
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Short Description"
                  rows={3}
                />
              </div>

              <div>
                <Label>Cover Image URL</Label>
                <ImageUploader
                  value={formData.image_url}
                  onChange={(url) => setFormData({ ...formData, image_url: url })}
                  folder="works"
                  placeholder="Image URL"
                />
              </div>

              <div>
                <Label>Live Project Link / URL</Label>
                <Input
                  value={formData.project_url}
                  onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Featured Project (Show on Homepage)</Label>
                <Switch
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Published (Visible on Site)</Label>
                <Switch
                  checked={formData.is_published}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  Save Project
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
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
