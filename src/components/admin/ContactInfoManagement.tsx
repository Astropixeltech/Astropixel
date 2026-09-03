import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Save, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Plus, 
  Pencil, 
  Trash2, 
  Globe, 
  Map, 
  Layers, 
  Share2, 
  Sparkles,
  ExternalLink,
  Loader2
} from "lucide-react";
import { toast } from "sonner";

export interface ContactSocialLink {
  id: string;
  name: string;
  handle: string;
  url: string;
  icon: string;
  brand: string;
}

export const SOCIAL_PLATFORMS = [
  { name: "Facebook", icon: "Facebook", brand: "#1877F2", defaultHandle: "@astropixel.tech", defaultUrl: "https://facebook.com/astropixel.tech" },
  { name: "Instagram", icon: "Instagram", brand: "#E4405F", defaultHandle: "@astropixel.tech", defaultUrl: "https://instagram.com/astropixel.tech/" },
  { name: "Twitter / X", icon: "Twitter", brand: "#000000", defaultHandle: "@astropixeltech", defaultUrl: "https://x.com/astropixeltech" },
  { name: "LinkedIn", icon: "Linkedin", brand: "#0A66C2", defaultHandle: "AstroPixel Agency", defaultUrl: "https://linkedin.com/company/astropixel/" },
  { name: "YouTube", icon: "Youtube", brand: "#FF0000", defaultHandle: "@astropixeltech", defaultUrl: "https://youtube.com/@astropixeltech" },
  { name: "Pinterest", icon: "Pinterest", brand: "#E60023", defaultHandle: "@astropixeltech", defaultUrl: "https://pinterest.com/astropixeltech/" },
  { name: "Behance", icon: "Behance", brand: "#1769FF", defaultHandle: "astropixel", defaultUrl: "https://behance.net/astropixel" },
  { name: "Dribbble", icon: "Dribbble", brand: "#EA4C89", defaultHandle: "astropixel", defaultUrl: "https://dribbble.com/astropixel" },
  { name: "TikTok", icon: "TikTok", brand: "#000000", defaultHandle: "@astropixeltech", defaultUrl: "https://tiktok.com/@astropixeltech" },
  { name: "Discord", icon: "Discord", brand: "#5865F2", defaultHandle: "AstroPixel Server", defaultUrl: "https://discord.gg/astropixel" },
  { name: "Telegram", icon: "Telegram", brand: "#26A5E4", defaultHandle: "@astropixel", defaultUrl: "https://t.me/astropixel" },
  { name: "WhatsApp", icon: "MessageCircle", brand: "#25D366", defaultHandle: "+880 1344-497808", defaultUrl: "https://wa.me/8801344497808" },
  { name: "Email", icon: "Mail", brand: "#EA4335", defaultHandle: "hello@astropixel.tech", defaultUrl: "mailto:hello@astropixel.tech" },
  { name: "Website", icon: "Globe", brand: "#6366F1", defaultHandle: "astropixel.tech", defaultUrl: "https://astropixel.tech" },
];

export const DEFAULT_CONTACT_SOCIALS: ContactSocialLink[] = [
  { id: "1", name: "Facebook", handle: "@astropixel.tech", url: "https://www.facebook.com/astropixel.tech", icon: "Facebook", brand: "#1877F2" },
  { id: "2", name: "WhatsApp", handle: "+880 1344-497808", url: "https://wa.me/8801344497808", icon: "MessageCircle", brand: "#25D366" },
  { id: "3", name: "Instagram", handle: "@astropixel.tech", url: "https://www.instagram.com/astropixel.tech/", icon: "Instagram", brand: "#E4405F" },
  { id: "4", name: "LinkedIn", handle: "AstroPixel Agency", url: "https://www.linkedin.com/company/astropixel/", icon: "Linkedin", brand: "#0A66C2" },
  { id: "5", name: "YouTube", handle: "@astropixeltech", url: "https://www.youtube.com/@astropixeltech", icon: "Youtube", brand: "#FF0000" },
  { id: "6", name: "Pinterest", handle: "@astropixeltech", url: "https://www.pinterest.com/astropixeltech/", icon: "Pinterest", brand: "#E60023" },
  { id: "7", name: "Behance", handle: "astropixel", url: "https://www.behance.net/astropixel", icon: "Behance", brand: "#1769FF" },
  { id: "8", name: "Dribbble", handle: "astropixel", url: "https://dribbble.com/astropixel", icon: "Dribbble", brand: "#EA4C89" },
];

export const getSavedContactSocials = (): ContactSocialLink[] => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("astropixel_contact_socials");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
  }
  return DEFAULT_CONTACT_SOCIALS;
};

export const getSavedContactInfo = (): Record<string, string> => {
  const defaults: Record<string, string> = {
    "hero.subtitle": "Available for new projects",
    "hero.title": "Let's talk.",
    "hero.description": "Tell us about your idea. Whether it's a rebrand, a launch, or a full digital product — we reply within 24 hours.",
    "info.phone": "+880 1344-497808",
    "info.email": "hello@astropixel.tech",
    "info.address": "Hi-Tech Park, Rajshahi, Bangladesh",
    "info.hours": "Sat – Thu · 10:00 AM – 8:00 PM",
    "info.whatsapp": "8801344497808",
    "info.map_embed": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3634.364448554907!2d88.5833!3d24.3733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbefa400000001%3A0x6b44781775e52d6a!2sSheikh%20Kamal%20IT%20Incubator%20%26%20Training%20Centre%2C%20Rajshahi!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd",
    "info.map_directions": "https://maps.google.com/?q=Sheikh+Kamal+IT+Incubator+Rajshahi",
    "info.studio_title": "Come say hi in Rajshahi.",
    "info.studio_subtitle": "Our studio",
  };

  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("astropixel_contact_info");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...defaults, ...parsed };
      } catch (e) {}
    }
  }
  return defaults;
};

export default function ContactInfoManagement() {
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<"info" | "socials" | "map">("info");
  const [infoValues, setInfoValues] = useState<Record<string, string>>(() => getSavedContactInfo());
  const [socialsList, setSocialsList] = useState<ContactSocialLink[]>(() => getSavedContactSocials());
  const [isSaving, setIsSaving] = useState(false);

  // Social Dialog Form State
  const [isSocialDialogOpen, setIsSocialDialogOpen] = useState(false);
  const [editingSocial, setEditingSocial] = useState<ContactSocialLink | null>(null);
  const [socialFormData, setSocialFormData] = useState({
    name: "Facebook",
    handle: "@astropixel.tech",
    url: "https://facebook.com/astropixel.tech",
    icon: "Facebook",
    brand: "#1877F2",
  });

  const saveContactInfo = (updatedInfo: Record<string, string>) => {
    setInfoValues(updatedInfo);
    if (typeof window !== "undefined") {
      localStorage.setItem("astropixel_contact_info", JSON.stringify(updatedInfo));
    }
    queryClient.invalidateQueries({ queryKey: ["page-content"] });
    queryClient.invalidateQueries({ queryKey: ["contact-info-management"] });
  };

  const saveSocialsList = (updatedSocials: ContactSocialLink[]) => {
    setSocialsList(updatedSocials);
    if (typeof window !== "undefined") {
      localStorage.setItem("astropixel_contact_socials", JSON.stringify(updatedSocials));
    }
    queryClient.invalidateQueries({ queryKey: ["public-footer-links"] });
    queryClient.invalidateQueries({ queryKey: ["contact-info-management"] });
  };

  const handleSaveAllInfo = async () => {
    setIsSaving(true);
    saveContactInfo(infoValues);
    try {
      const rows = Object.entries(infoValues).map(([key, val]) => ({
        page_name: "contact",
        content_key: key,
        content_en: val,
      }));
      await (supabase as any).from("page_content").upsert(rows, { onConflict: "page_name,content_key" });
      toast.success("Contact settings saved successfully!");
    } catch {
      toast.success("Saved to local settings!");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSelectPlatformPreset = (platformName: string) => {
    const preset = SOCIAL_PLATFORMS.find((p) => p.name === platformName);
    if (preset) {
      setSocialFormData({
        name: preset.name,
        handle: preset.defaultHandle,
        url: preset.defaultUrl,
        icon: preset.icon,
        brand: preset.brand,
      });
    }
  };

  const resetSocialForm = () => {
    setSocialFormData({
      name: "Facebook",
      handle: "@astropixel.tech",
      url: "https://facebook.com/astropixel.tech",
      icon: "Facebook",
      brand: "#1877F2",
    });
    setEditingSocial(null);
    setIsSocialDialogOpen(false);
  };

  const handleEditSocial = (social: ContactSocialLink) => {
    setEditingSocial(social);
    setSocialFormData({
      name: social.name,
      handle: social.handle,
      url: social.url,
      icon: social.icon,
      brand: social.brand,
    });
    setIsSocialDialogOpen(true);
  };

  const handleDeleteSocial = (id: string) => {
    if (!confirm("Are you sure you want to delete this social media link?")) return;
    const updated = socialsList.filter((s) => s.id !== id);
    saveSocialsList(updated);
    toast.success("Social link removed!");
  };

  const handleSaveSocial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!socialFormData.name || !socialFormData.url) {
      toast.error("Platform name and URL are required.");
      return;
    }

    if (editingSocial) {
      const updated = socialsList.map((s) =>
        s.id === editingSocial.id ? { ...s, ...socialFormData } : s
      );
      saveSocialsList(updated);
      toast.success("Social link updated!");
    } else {
      const newSocial: ContactSocialLink = {
        id: Date.now().toString(),
        ...socialFormData,
      };
      const updated = [...socialsList, newSocial];
      saveSocialsList(updated);
      toast.success("New social link added!");
    }
    resetSocialForm();
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex items-center justify-between gap-4 flex-wrap p-5 rounded-2xl bg-card border border-border/60 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary" />
            Contact Page & Information
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage contact channels, hero copy, Google Maps studio location, and social media platforms.
          </p>
        </div>
        <Button 
          onClick={handleSaveAllInfo} 
          disabled={isSaving}
          className="gap-2 bg-gradient-to-r from-primary to-purple-600 text-white hover:opacity-95 shadow-md"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isSaving ? "Saving..." : "Save All Changes"}
        </Button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-xl bg-secondary/40 border border-border/50 w-fit">
        <button
          onClick={() => setActiveTab("info")}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "info"
              ? "bg-card text-foreground shadow-sm border border-border/60"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Phone className="w-3.5 h-3.5" /> General & Direct Channels
        </button>

        <button
          onClick={() => setActiveTab("socials")}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "socials"
              ? "bg-card text-foreground shadow-sm border border-border/60"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Share2 className="w-3.5 h-3.5" /> Social Accounts ({socialsList.length})
        </button>

        <button
          onClick={() => setActiveTab("map")}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "map"
              ? "bg-card text-foreground shadow-sm border border-border/60"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Map className="w-3.5 h-3.5" /> Studio & Google Map
        </button>
      </div>

      {/* ── Tab 1: General & Direct Channels ── */}
      {activeTab === "info" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Direct Communication Channels */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500" />
                Direct Communication Channels
              </CardTitle>
              <CardDescription>Main email, phone number, and office hours displayed on website.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-xs font-semibold">📞 Official Phone Number</Label>
                <Input
                  value={infoValues["info.phone"] || ""}
                  onChange={(e) => setInfoValues({ ...infoValues, "info.phone": e.target.value })}
                  placeholder="+880 1344-497808"
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold">✉️ Official Email Address</Label>
                <Input
                  value={infoValues["info.email"] || ""}
                  onChange={(e) => setInfoValues({ ...infoValues, "info.email": e.target.value })}
                  placeholder="hello@astropixel.tech"
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold">💬 WhatsApp Number</Label>
                <Input
                  value={infoValues["info.whatsapp"] || ""}
                  onChange={(e) => setInfoValues({ ...infoValues, "info.whatsapp": e.target.value })}
                  placeholder="8801344497808"
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold">🕒 Business / Working Hours</Label>
                <Input
                  value={infoValues["info.hours"] || ""}
                  onChange={(e) => setInfoValues({ ...infoValues, "info.hours": e.target.value })}
                  placeholder="Sat – Thu · 10:00 AM – 8:00 PM"
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold">📍 Physical Office Address</Label>
                <Input
                  value={infoValues["info.address"] || ""}
                  onChange={(e) => setInfoValues({ ...infoValues, "info.address": e.target.value })}
                  placeholder="Hi-Tech Park, Rajshahi, Bangladesh"
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Page Hero Header Text */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Contact Hero Banner Copy
              </CardTitle>
              <CardDescription>Hero badge, headline title, and description text on /contact.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-xs font-semibold">Hero Top Pill Badge</Label>
                <Input
                  value={infoValues["hero.subtitle"] || ""}
                  onChange={(e) => setInfoValues({ ...infoValues, "hero.subtitle": e.target.value })}
                  placeholder="Available for new projects"
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold">Hero Main Headline</Label>
                <Input
                  value={infoValues["hero.title"] || ""}
                  onChange={(e) => setInfoValues({ ...infoValues, "hero.title": e.target.value })}
                  placeholder="Let's talk."
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold">Hero Description Text</Label>
                <Textarea
                  value={infoValues["hero.description"] || ""}
                  onChange={(e) => setInfoValues({ ...infoValues, "hero.description": e.target.value })}
                  placeholder="Tell us about your idea..."
                  rows={4}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ── Tab 2: Social Media Platforms ── */}
      {activeTab === "socials" && (
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Share2 className="w-4 h-4 text-primary" />
                Connected Social Media Accounts
              </CardTitle>
              <CardDescription>Active social profiles shown in contact grid & website footer.</CardDescription>
            </div>
            <Button onClick={() => { resetSocialForm(); setIsSocialDialogOpen(true); }} size="sm" className="gap-1.5">
              <Plus className="w-4 h-4" /> Add Platform
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
              {socialsList.map((s) => (
                <div
                  key={s.id}
                  className="p-3.5 rounded-2xl border border-border/60 bg-secondary/20 hover:bg-secondary/40 hover:border-primary/30 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm"
                      style={{ backgroundColor: s.brand }}
                    >
                      <Globe className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-bold text-foreground truncate">{s.name}</h4>
                      <p className="text-xs text-muted-foreground truncate">{s.handle}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border/40 text-xs">
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary hover:underline flex items-center gap-1 font-medium"
                    >
                      Visit <ExternalLink className="w-3 h-3" />
                    </a>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="w-7 h-7 hover:text-primary" onClick={() => handleEditSocial(s)}>
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="w-7 h-7 hover:text-red-500" onClick={() => handleDeleteSocial(s.id)}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── Tab 3: Studio & Google Map ── */}
      {activeTab === "map" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Map className="w-4 h-4 text-cyan-500" />
                Google Maps Embed & Directions
              </CardTitle>
              <CardDescription>Configure Google Maps iframe embed URL and Google Maps direction link.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-xs font-semibold">Studio Section Subtitle</Label>
                <Input
                  value={infoValues["info.studio_subtitle"] || ""}
                  onChange={(e) => setInfoValues({ ...infoValues, "info.studio_subtitle": e.target.value })}
                  placeholder="Our studio"
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold">Studio Section Title</Label>
                <Input
                  value={infoValues["info.studio_title"] || ""}
                  onChange={(e) => setInfoValues({ ...infoValues, "info.studio_title": e.target.value })}
                  placeholder="Come say hi in Rajshahi."
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold">Google Maps Embed URL (iframe src)</Label>
                <Textarea
                  value={infoValues["info.map_embed"] || ""}
                  onChange={(e) => setInfoValues({ ...infoValues, "info.map_embed": e.target.value })}
                  placeholder="https://www.google.com/maps/embed?pb=..."
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold">Google Maps Directions Link</Label>
                <Input
                  value={infoValues["info.map_directions"] || ""}
                  onChange={(e) => setInfoValues({ ...infoValues, "info.map_directions": e.target.value })}
                  placeholder="https://maps.google.com/?q=..."
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Live Preview of Map */}
          <Card className="border-border/60 shadow-sm overflow-hidden flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" /> Map Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-4">
              <div className="w-full h-72 rounded-xl overflow-hidden border border-border/50 bg-slate-900">
                <iframe
                  title="Studio Preview"
                  src={infoValues["info.map_embed"] || ""}
                  className="w-full h-full border-0 filter opacity-90"
                  loading="lazy"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add / Edit Social Platform Modal */}
      <Dialog open={isSocialDialogOpen} onOpenChange={setIsSocialDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingSocial ? "Edit Social Link" : "Add Social Platform"}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSaveSocial} className="space-y-4 pt-2">
            <div>
              <Label className="text-xs">Quick Platform Preset</Label>
              <Select onValueChange={handleSelectPlatformPreset} defaultValue={socialFormData.name}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select platform preset..." />
                </SelectTrigger>
                <SelectContent>
                  {SOCIAL_PLATFORMS.map((p) => (
                    <SelectItem key={p.name} value={p.name}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs">Platform Display Name</Label>
              <Input
                value={socialFormData.name}
                onChange={(e) => setSocialFormData({ ...socialFormData, name: e.target.value })}
                placeholder="e.g. Behance"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs">Handle / Username</Label>
              <Input
                value={socialFormData.handle}
                onChange={(e) => setSocialFormData({ ...socialFormData, handle: e.target.value })}
                placeholder="e.g. @astropixel"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs">Full Profile URL</Label>
              <Input
                value={socialFormData.url}
                onChange={(e) => setSocialFormData({ ...socialFormData, url: e.target.value })}
                placeholder="https://behance.net/..."
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs">Brand Hex Color Code</Label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="color"
                  value={socialFormData.brand}
                  onChange={(e) => setSocialFormData({ ...socialFormData, brand: e.target.value })}
                  className="w-10 h-10 rounded-lg cursor-pointer border border-border"
                />
                <Input
                  value={socialFormData.brand}
                  onChange={(e) => setSocialFormData({ ...socialFormData, brand: e.target.value })}
                  placeholder="#1877F2"
                  className="flex-1"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button type="button" variant="outline" onClick={resetSocialForm} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-primary text-white">
                {editingSocial ? "Update Link" : "Save Link"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
