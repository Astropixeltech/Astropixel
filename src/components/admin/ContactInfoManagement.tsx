import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Phone, Mail, MapPin, Clock, MessageCircle, Sparkles, FileText, Zap, Plus, Pencil, Trash2, Globe, Share2 } from "lucide-react";
import { toast } from "sonner";

export interface ContactSocialLink {
  id: string;
  name: string;
  handle: string;
  url: string;
  icon: string;
  brand: string;
}

export const DEFAULT_CONTACT_SOCIALS: ContactSocialLink[] = [
  { id: "1", name: "Facebook", handle: "@astropixel.tech", url: "https://www.facebook.com/astropixel.tech", icon: "Facebook", brand: "#1877F2" },
  { id: "2", name: "WhatsApp", handle: "+880 1344-497808", url: "https://wa.me/8801344497808", icon: "MessageCircle", brand: "#25D366" },
  { id: "3", name: "Instagram", handle: "@astropixel.tech", url: "https://www.instagram.com/astropixel.tech/", icon: "Instagram", brand: "#E4405F" },
  { id: "4", name: "LinkedIn", handle: "AstroPixel Agency", url: "https://www.linkedin.com/company/astropixel/", icon: "Linkedin", brand: "#0A66C2" },
  { id: "5", name: "YouTube", handle: "@astropixeltech", url: "https://www.youtube.com/@astropixeltech", icon: "Youtube", brand: "#FF0000" },
  { id: "6", name: "Pinterest", handle: "@astropixeltech", url: "https://www.pinterest.com/astropixeltech/", icon: "Pinterest", brand: "#E60023" },
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

  // Contact Info State
  const [infoValues, setInfoValues] = useState<Record<string, string>>(() => getSavedContactInfo());

  // Social Links State
  const [socialsList, setSocialsList] = useState<ContactSocialLink[]>(() => getSavedContactSocials());

  // Social Dialog Form State
  const [isSocialDialogOpen, setIsSocialDialogOpen] = useState(false);
  const [editingSocial, setEditingSocial] = useState<ContactSocialLink | null>(null);
  const [socialFormData, setSocialFormData] = useState({
    name: "Facebook",
    handle: "@astropixel.tech",
    url: "https://facebook.com/...",
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
    saveContactInfo(infoValues);
    toast.success("যোগাযোগের তথ্য সফলভাবে সেভ করা হয়েছে!");

    try {
      const rows = Object.entries(infoValues).map(([key, val]) => ({
        page_name: "contact",
        content_key: key,
        content_en: val,
      }));
      await (supabase as any).from("page_content").upsert(rows, { onConflict: "page_name,content_key" });
    } catch (err) {}
  };

  // Social Link CRUD
  const resetSocialForm = () => {
    setSocialFormData({
      name: "Facebook",
      handle: "@astropixel.tech",
      url: "https://facebook.com/",
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
    if (!confirm("আপনি কি নিশ্চিত এই সোশ্যাল মিডিয়া লিংকটি ডিলিট করতে চান?")) return;
    const updated = socialsList.filter((s) => s.id !== id);
    saveSocialsList(updated);
    toast.success("সোশ্যাল মিডিয়া লিংক সফলভাবে ডিলিট করা হয়েছে!");
  };

  const handleSaveSocial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!socialFormData.name || !socialFormData.url) {
      toast.error("Platform Name and URL are required");
      return;
    }

    if (editingSocial) {
      const updated = socialsList.map((s) =>
        s.id === editingSocial.id ? { ...s, ...socialFormData } : s
      );
      saveSocialsList(updated);
      toast.success("সোশ্যাল লিংক আপডেট করা হয়েছে!");
    } else {
      const newSocial: ContactSocialLink = {
        id: Date.now().toString(),
        ...socialFormData,
      };
      const updated = [...socialsList, newSocial];
      saveSocialsList(updated);
      toast.success("নতুন সোশ্যাল মিডিয়া লিংক যোগ করা হয়েছে!");
    }

    resetSocialForm();
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap p-4 rounded-2xl bg-card border border-border/60 shadow-sm">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary" />
            Contact Page & Social Accounts
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage phone, email, office address, working hours, and social media channels.
          </p>
        </div>
        <Button onClick={handleSaveAllInfo} className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
          <Save className="w-4 h-4" />
          Save All Info Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Details & Hero Information */}
        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              Contact Information & Cards
            </CardTitle>
            <CardDescription>Phone, Email, Location, Business Hours, and Hero text.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="font-medium">Hero Top Badge</Label>
              <Input
                value={infoValues["hero.subtitle"] || ""}
                onChange={(e) => setInfoValues({ ...infoValues, "hero.subtitle": e.target.value })}
                placeholder="e.g. Available for new projects"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="font-medium">Hero Headline Title</Label>
              <Input
                value={infoValues["hero.title"] || ""}
                onChange={(e) => setInfoValues({ ...infoValues, "hero.title": e.target.value })}
                placeholder="e.g. Let's talk."
                className="mt-1"
              />
            </div>

            <div>
              <Label className="font-medium">Hero Description</Label>
              <Textarea
                value={infoValues["hero.description"] || ""}
                onChange={(e) => setInfoValues({ ...infoValues, "hero.description": e.target.value })}
                placeholder="Short overview..."
                rows={3}
                className="mt-1"
              />
            </div>

            <div className="pt-2 border-t border-border/50 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label className="font-medium">📱 Phone Number</Label>
                <Input
                  value={infoValues["info.phone"] || ""}
                  onChange={(e) => setInfoValues({ ...infoValues, "info.phone": e.target.value })}
                  placeholder="+880 1344-497808"
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="font-medium">✉️ Email Address</Label>
                <Input
                  value={infoValues["info.email"] || ""}
                  onChange={(e) => setInfoValues({ ...infoValues, "info.email": e.target.value })}
                  placeholder="hello@astropixel.tech"
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="font-medium">📍 Office Location / Address</Label>
                <Input
                  value={infoValues["info.address"] || ""}
                  onChange={(e) => setInfoValues({ ...infoValues, "info.address": e.target.value })}
                  placeholder="Hi-Tech Park, Rajshahi, Bangladesh"
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="font-medium">🕐 Business Working Hours</Label>
                <Input
                  value={infoValues["info.hours"] || ""}
                  onChange={(e) => setInfoValues({ ...infoValues, "info.hours": e.target.value })}
                  placeholder="Sat – Thu · 10:00 AM – 8:00 PM"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label className="font-medium">💬 WhatsApp Direct Number</Label>
              <Input
                value={infoValues["info.whatsapp"] || ""}
                onChange={(e) => setInfoValues({ ...infoValues, "info.whatsapp": e.target.value })}
                placeholder="8801344497808"
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Media Channels Manager */}
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Share2 className="w-4 h-4 text-primary" />
                Social Media Accounts ({socialsList.length})
              </CardTitle>
              <CardDescription>Add, edit, or delete social media links shown on the contact page.</CardDescription>
            </div>
            <Dialog open={isSocialDialogOpen} onOpenChange={setIsSocialDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" onClick={() => resetSocialForm()} className="gap-1">
                  <Plus className="w-3.5 h-3.5" /> Add Link
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingSocial ? "Edit Social Media Link" : "Add New Social Media Link"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSaveSocial} className="space-y-3.5 pt-2">
                  <div>
                    <Label>Platform Name *</Label>
                    <Input
                      value={socialFormData.name}
                      onChange={(e) => setSocialFormData({ ...socialFormData, name: e.target.value })}
                      placeholder="e.g. Facebook, WhatsApp, Instagram"
                      required
                    />
                  </div>

                  <div>
                    <Label>Handle / Display Subtitle</Label>
                    <Input
                      value={socialFormData.handle}
                      onChange={(e) => setSocialFormData({ ...socialFormData, handle: e.target.value })}
                      placeholder="e.g. @astropixel.tech or +880 1344..."
                    />
                  </div>

                  <div>
                    <Label>Direct URL *</Label>
                    <Input
                      value={socialFormData.url}
                      onChange={(e) => setSocialFormData({ ...socialFormData, url: e.target.value })}
                      placeholder="https://facebook.com/..."
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Lucide Icon</Label>
                      <Select
                        value={socialFormData.icon}
                        onValueChange={(val) => setSocialFormData({ ...socialFormData, icon: val })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select Icon" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Facebook">Facebook</SelectItem>
                          <SelectItem value="MessageCircle">MessageCircle / WhatsApp</SelectItem>
                          <SelectItem value="Instagram">Instagram</SelectItem>
                          <SelectItem value="Linkedin">LinkedIn</SelectItem>
                          <SelectItem value="Youtube">YouTube</SelectItem>
                          <SelectItem value="Pinterest">Pinterest</SelectItem>
                          <SelectItem value="Twitter">Twitter / X</SelectItem>
                          <SelectItem value="Globe">Globe / Website</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Brand Color (Hex)</Label>
                      <div className="flex gap-2 items-center mt-1">
                        <Input
                          type="color"
                          value={socialFormData.brand}
                          onChange={(e) => setSocialFormData({ ...socialFormData, brand: e.target.value })}
                          className="w-10 h-10 p-1 rounded-lg cursor-pointer shrink-0"
                        />
                        <Input
                          value={socialFormData.brand}
                          onChange={(e) => setSocialFormData({ ...socialFormData, brand: e.target.value })}
                          placeholder="#1877F2"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-3">
                    <Button type="submit" className="flex-1">
                      Save Social Link
                    </Button>
                    <Button type="button" variant="outline" onClick={resetSocialForm}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="space-y-2">
            {socialsList.map((social) => (
              <div
                key={social.id}
                className="flex items-center justify-between p-3 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs shrink-0"
                    style={{ backgroundColor: `${social.brand}15`, color: social.brand }}
                  >
                    {social.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{social.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{social.handle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => handleEditSocial(social)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteSocial(social.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}

            {socialsList.length === 0 && (
              <div className="text-center py-8 text-xs text-muted-foreground">
                No social links added. Click "+ Add Link" above.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={handleSaveAllInfo} className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
          <Save className="w-4 h-4" />
          Save All Info Changes
        </Button>
      </div>
    </div>
  );
}
