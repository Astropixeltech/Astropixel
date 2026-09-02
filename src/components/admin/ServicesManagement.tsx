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
import { Plus, Pencil, Trash2, ArrowLeft, Save, Sparkles, CheckCircle2 } from "lucide-react";
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
  const [isFormOpen, setIsFormOpen] = useState(false);
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
    setIsFormOpen(false);
  };

  const handleAddNew = () => {
    resetForm();
    setIsFormOpen(true);
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
    setIsFormOpen(true);
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

  // Full-page Inline Editor Mode
  if (isFormOpen) {
    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        {/* Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-border/60 shadow-sm">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={resetForm} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Services
            </Button>
            <div>
              <h2 className="text-xl font-bold">
                {editingService ? `Edit Service: ${editingService.title}` : "Add New Service"}
              </h2>
              <p className="text-xs text-muted-foreground">
                Customize title, tagline, showcase image, and features list for the website.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={resetForm}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
              <Save className="w-4 h-4" />
              Save Service
            </Button>
          </div>
        </div>

        {/* Full Page Form Grid */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column: Essential Details */}
            <Card className="border-border/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-semibold">General Information</CardTitle>
                <CardDescription>Service title, tagline, description, and icon badge.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="font-medium">Service Title *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. UI/UX Design, Web Development"
                    className="mt-1.5"
                    required
                  />
                </div>

                <div>
                  <Label className="font-medium">Subtitle / Tagline</Label>
                  <Input
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="e.g. Product Design & Prototyping"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label className="font-medium">Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Provide a compelling overview of what this service offers..."
                    rows={4}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label className="font-medium">Lucide Icon Badge</Label>
                  <Select
                    value={formData.icon}
                    onValueChange={(val) => setFormData({ ...formData, icon: val })}
                  >
                    <SelectTrigger className="mt-1.5">
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

                <div className="flex items-center justify-between p-3.5 rounded-xl border border-border/60 bg-muted/30 mt-4">
                  <div>
                    <Label className="font-medium cursor-pointer">Active Status</Label>
                    <p className="text-xs text-muted-foreground">Visible on public /services page</p>
                  </div>
                  <Switch
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Right Column: Visuals & Features List */}
            <Card className="border-border/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Visual Assets & Feature Bullet Points</CardTitle>
                <CardDescription>Upload cover showcase image and enter feature bullet points.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="font-medium">Cover Showcase Image</Label>
                  <div className="mt-1.5">
                    <ImageUploader
                      value={formData.image_url}
                      onChange={(url) => setFormData({ ...formData, image_url: url })}
                      folder="services"
                      placeholder="Paste Image URL or click Upload"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <Label className="font-medium">Feature Bullet Points</Label>
                    <span className="text-xs text-muted-foreground">One item per line</span>
                  </div>
                  <Textarea
                    value={formData.features_text}
                    onChange={(e) => setFormData({ ...formData, features_text: e.target.value })}
                    placeholder="Mobile & Web Application Design&#10;Interactive Prototyping & Wireframing&#10;User Research & Usability Testing&#10;Design Systems & Component Libraries"
                    rows={8}
                    className="mt-1.5 font-mono text-sm leading-relaxed"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Action Bar */}
          <div className="flex items-center justify-end gap-3 mt-6 p-4 rounded-2xl bg-card border border-border/60 shadow-sm">
            <Button type="button" variant="outline" onClick={resetForm}>
              Cancel
            </Button>
            <Button type="submit" className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
              <Save className="w-4 h-4" />
              Save Service
            </Button>
          </div>
        </form>
      </div>
    );
  }

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
        <Button onClick={handleAddNew} className="gap-2">
          <Plus className="w-4 h-4" />
          Add New Service
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {servicesList.map((service) => (
          <Card key={service.id} className={`overflow-hidden flex flex-col hover:shadow-md transition-all duration-200 border-border/60 ${!service.is_active ? "opacity-60 grayscale-[0.2]" : ""}`}>
            {/* Top Image Section - Clean, no overlays */}
            {service.image_url && (
              <div className="relative aspect-[16/10] bg-muted w-full overflow-hidden border-b border-border/40 group">
                <img
                  src={service.image_url}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}

            {/* Content Section */}
            <CardContent className="p-5 flex-grow flex flex-col">
              {/* Title and Actions */}
              <div className="flex justify-between items-start gap-3 mb-1">
                <h3 className="text-xl font-bold leading-tight text-foreground">
                  {service.title}
                </h3>
                <div className="flex gap-1 shrink-0 -mt-1 -mr-2">
                  <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-primary" onClick={() => handleEdit(service)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(service.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* Subtitle */}
              {service.subtitle && (
                <p className="text-[10px] text-primary font-bold uppercase tracking-wider mb-3">
                  {service.subtitle}
                </p>
              )}

              {/* Description */}
              {service.description && (
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {service.description}
                </p>
              )}
              
              {/* Features List */}
              {service.features && service.features.length > 0 && (
                <div className="mt-auto pt-3 border-t border-border/40">
                  <p className="text-[11px] font-semibold text-foreground/60 uppercase tracking-widest mb-2">
                    Features ({service.features.length})
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1.5">
                    {service.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-primary/60 mt-1.5 shrink-0" />
                        <span className="truncate">{f}</span>
                      </li>
                    ))}
                    {service.features.length > 3 && (
                      <li className="text-[10px] text-primary font-bold pl-2.5">
                        + {service.features.length - 3} MORE
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {!service.is_active && (
                <div className="mt-4 pt-3 border-t border-border/40">
                  <span className="inline-block px-2 py-1 bg-red-500/10 text-red-600 rounded text-[10px] font-bold uppercase tracking-widest">
                    Inactive
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
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
