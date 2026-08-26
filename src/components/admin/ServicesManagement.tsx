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
import { Plus, Pencil, Trash2, Sparkles, Layers } from "lucide-react";
import { toast } from "sonner";
import ImageUploader from "./ImageUploader";
import PageHeroEditor from "./PageHeroEditor";
import { DEFAULT_SERVICES, Service, getSavedServices } from "@/hooks/useServices";

const iconOptions = [
  "Palette", "PenTool", "Share2", "Monitor", "Zap", "TrendingUp",
  "Sparkles", "Layers", "Code", "Megaphone", "Video", "Search",
  "Smartphone", "Box", "Shield", "Settings"
];

export const ServicesManagement = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Local state for instant CRUD operations with localStorage persistence
  const [servicesList, setServicesList] = useState<Service[]>(() => getSavedServices());

  useEffect(() => {
    // Background fetch from Supabase if DB contains items
    const fetchSupabaseServices = async () => {
      try {
        const { data, error } = await (supabase as any)
          .from("services")
          .select("*")
          .order("order_index", { ascending: true });
        if (!error && data && data.length > 0) {
          setServicesList(data as Service[]);
          if (typeof window !== "undefined") {
            localStorage.setItem("astropixel_services", JSON.stringify(data));
          }
        }
      } catch (err) {}
    };
    fetchSupabaseServices();
  }, []);

  const saveServicesList = (updated: Service[]) => {
    setServicesList(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("astropixel_services", JSON.stringify(updated));
    }
    queryClient.invalidateQueries({ queryKey: ["public-services"] });
    queryClient.invalidateQueries({ queryKey: ["admin-services"] });
  };

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    image_url: "",
    icon: "Sparkles",
    features_text: "",
    is_active: true,
  });

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      image_url: "",
      icon: "Sparkles",
      features_text: "",
      is_active: true,
    });
    setEditingService(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      subtitle: service.subtitle || "",
      description: service.description || "",
      image_url: service.image_url || "",
      icon: service.icon || "Sparkles",
      features_text: service.features ? service.features.join("\n") : "",
      is_active: service.is_active,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("আপনি কি নিশ্চিত এই সার্ভিসটি ডিলিট করতে চান?")) return;
    const updated = servicesList.filter((s) => s.id !== id);
    saveServicesList(updated);
    toast.success("সার্ভিস সফলভাবে ডিলিট করা হয়েছে!");

    try {
      await (supabase as any).from("services").delete().eq("id", id);
    } catch (err) {}
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Service Title is required");
      return;
    }

    const parsedFeatures = formData.features_text
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    if (editingService) {
      const updated = servicesList.map((s) =>
        s.id === editingService.id
          ? {
              ...s,
              title: formData.title,
              subtitle: formData.subtitle || null,
              description: formData.description || null,
              image_url: formData.image_url || null,
              icon: formData.icon,
              features: parsedFeatures.length > 0 ? parsedFeatures : null,
              is_active: formData.is_active,
            }
          : s
      );
      saveServicesList(updated);
      toast.success("সার্ভিস সফলভাবে আপডেট করা হয়েছে!");

      try {
        await (supabase as any)
          .from("services")
          .update({
            title: formData.title,
            subtitle: formData.subtitle || null,
            description: formData.description || null,
            image_url: formData.image_url || null,
            icon: formData.icon,
            features: parsedFeatures.length > 0 ? parsedFeatures : null,
            is_active: formData.is_active,
          })
          .eq("id", editingService.id);
      } catch (err) {}
    } else {
      const newService: Service = {
        id: Date.now().toString(),
        title: formData.title,
        subtitle: formData.subtitle || null,
        description: formData.description || null,
        image_url: formData.image_url || null,
        icon: formData.icon,
        features: parsedFeatures.length > 0 ? parsedFeatures : null,
        is_active: formData.is_active,
        order_index: servicesList.length + 1,
      };
      const updated = [...servicesList, newService];
      saveServicesList(updated);
      toast.success("নতুন সার্ভিস সফলভাবে যুক্ত করা হয়েছে!");

      try {
        await (supabase as any).from("services").insert({
          title: formData.title,
          subtitle: formData.subtitle || null,
          description: formData.description || null,
          image_url: formData.image_url || null,
          icon: formData.icon,
          features: parsedFeatures.length > 0 ? parsedFeatures : null,
          is_active: formData.is_active,
          order_index: servicesList.length + 1,
        });
      } catch (err) {}
    }

    resetForm();
  };

  return (
    <div className="space-y-6">
      <PageHeroEditor
        pageName="services"
        title="Services Page — Hero Section"
        subtitle="Click to edit top badge, headline, and description"
        fields={[
          { key: "hero.subtitle", label: "🔖 Top Badge", description: "Small uppercase text above title", type: "input", fallback: "Our Services" },
          { key: "hero.title", label: "✨ Hero Title", description: "Wrap highlighted words in | | — e.g. Crafted for |Excellence|", type: "input", fallback: "Services Crafted for |Excellence|" },
          { key: "hero.description", label: "📝 Description", description: "Paragraph shown below title", type: "textarea", fallback: "Tailored creative and technical solutions designed to scale your brand." },
        ]}
      />

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Services ({servicesList.length})</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="w-4 h-4 mr-2" />
              Add New Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingService ? "Edit Service" : "Add New Service"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Service Title *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. UI/UX Design, Web Development"
                  required
                />
              </div>

              <div>
                <Label>Subtitle / Tagline</Label>
                <Input
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g. Product Design & Prototyping"
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed explanation of the service..."
                  rows={3}
                />
              </div>

              <div>
                <Label>Cover Showcase Image URL</Label>
                <ImageUploader
                  value={formData.image_url}
                  onChange={(url) => setFormData({ ...formData, image_url: url })}
                  folder="services"
                  placeholder="Showcase Image URL or Upload"
                />
              </div>

              <div>
                <Label>Icon</Label>
                <Select
                  value={formData.icon}
                  onValueChange={(val) => setFormData({ ...formData, icon: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((iconName) => (
                      <SelectItem key={iconName} value={iconName}>
                        {iconName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Features / Bullet Points (One per line)</Label>
                <Textarea
                  value={formData.features_text}
                  onChange={(e) => setFormData({ ...formData, features_text: e.target.value })}
                  placeholder="Mobile & Web Application Design&#10;Interactive Prototyping & Wireframing&#10;User Research & Usability Testing"
                  rows={5}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Active (Visible on Website)</Label>
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  Save Service
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
        {servicesList.map((service) => (
          <Card key={service.id} className={!service.is_active ? "opacity-60" : ""}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg font-bold">{service.title}</CardTitle>
                  {service.subtitle && (
                    <p className="text-xs text-primary font-semibold uppercase tracking-wider mt-0.5">
                      {service.subtitle}
                    </p>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(service)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(service.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {service.image_url && (
                <div className="relative aspect-video rounded-md overflow-hidden mb-3 bg-muted">
                  <img
                    src={service.image_url}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="space-y-2 text-sm">
                {service.description && (
                  <p className="text-muted-foreground line-clamp-2">{service.description}</p>
                )}
                {service.features && service.features.length > 0 && (
                  <div className="pt-2 border-t border-border/50">
                    <p className="text-xs font-semibold text-foreground/70 mb-1">
                      Features ({service.features.length}):
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                      {service.features.slice(0, 3).map((f, i) => (
                        <li key={i} className="truncate">{f}</li>
                      ))}
                      {service.features.length > 3 && (
                        <li className="text-primary font-medium list-none">+ {service.features.length - 3} more</li>
                      )}
                    </ul>
                  </div>
                )}
                {!service.is_active && (
                  <span className="inline-block mt-2 px-2 py-0.5 bg-red-500/10 text-red-600 rounded text-xs">
                    Inactive
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {servicesList.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No services found. Click the button above to add a new service.
        </div>
      )}
    </div>
  );
};
