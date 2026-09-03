import { useState, useEffect, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Pencil, Trash2, Facebook, Instagram, Linkedin, Twitter, Mail, MessageCircle, ArrowLeft, Save, Globe, Loader2 } from "lucide-react";
import { toast } from "sonner";
import ImageUploader from "./ImageUploader";
import { DEFAULT_TEAM_MEMBERS, TeamMember } from "@/hooks/useTeamMembers";

const EMPTY_FORM: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'> = {
  name: "", role: "", bio: "", image_url: "", email: "",
  facebook_url: "", instagram_url: "", linkedin_url: "", twitter_url: "",
  whatsapp_url: "", fiverr_url: "", upwork_url: "", portfolio_url: "", threads_url: "",
  is_active: true, order_index: 0, site_scope: "agency",
};

export const TeamManagement = () => {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [membersList, setMembersList] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState<typeof EMPTY_FORM>({ ...EMPTY_FORM });

  // Fetch from real DB
  const fetchMembers = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/team');
      const data = await res.json();
      if (data.members && data.members.length > 0) {
        setMembersList(data.members);
      } else {
        setMembersList(DEFAULT_TEAM_MEMBERS);
      }
    } catch {
      setMembersList(DEFAULT_TEAM_MEMBERS);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchMembers(); }, [fetchMembers]);

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['team-members'] });
    fetchMembers();
  };

  const openAdd = () => {
    setForm({ ...EMPTY_FORM, order_index: membersList.length + 1 });
    setEditingMember(null);
    setIsFormOpen(true);
  };

  const openEdit = (m: TeamMember) => {
    setForm({
      name: m.name, role: m.role || "", bio: m.bio || "", image_url: m.image_url || "",
      email: m.email || "", facebook_url: m.facebook_url || "", instagram_url: m.instagram_url || "",
      linkedin_url: m.linkedin_url || "", twitter_url: m.twitter_url || "",
      whatsapp_url: m.whatsapp_url || "", fiverr_url: m.fiverr_url || "",
      upwork_url: m.upwork_url || "", portfolio_url: m.portfolio_url || "",
      threads_url: m.threads_url || "", is_active: m.is_active,
      order_index: m.order_index, site_scope: m.site_scope,
    });
    setEditingMember(m);
    setIsFormOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) { toast.error('Name is required'); return; }
    setIsSaving(true);
    try {
      const payload = editingMember ? { id: editingMember.id, ...form } : form;
      const res = await fetch('/api/team', {
        method: editingMember ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      toast.success(editingMember ? 'Member updated!' : 'Member added!');
      setIsFormOpen(false);
      invalidate();
    } catch (err: any) {
      toast.error(err.message || 'Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete ${name}?`)) return;
    try {
      const res = await fetch(`/api/team?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed');
      toast.success('Deleted!');
      invalidate();
    } catch { toast.error('Failed to delete'); }
  };

  const handleToggleActive = async (m: TeamMember) => {
    try {
      await fetch('/api/team', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: m.id, is_active: !m.is_active }),
      });
      invalidate();
    } catch { toast.error('Failed'); }
  };

  const setField = (key: string, value: any) => setForm(prev => ({ ...prev, [key]: value }));

  // ── FORM VIEW ──────────────────────────────────────────────────
  if (isFormOpen) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setIsFormOpen(false)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold">{editingMember ? 'Edit Member' : 'Add New Member'}</h2>
            <p className="text-muted-foreground text-sm">Changes save directly to the database</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Photo & Status */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-border/60 p-5 space-y-4 bg-secondary/5">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Photo</h3>
              <div className="flex justify-center">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={form.image_url || ''} />
                  <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                    {form.name.charAt(0) || '?'}
                  </AvatarFallback>
                </Avatar>
              </div>
              <ImageUploader
                value={form.image_url || ''}
                onChange={(url) => setField('image_url', url)}
                label="Upload Photo"
              />
            </div>
            <div className="rounded-2xl border border-border/60 p-5 space-y-4 bg-secondary/5">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Settings</h3>
              <div className="flex items-center justify-between">
                <Label>Active</Label>
                <Switch checked={form.is_active} onCheckedChange={(v) => setField('is_active', v)} />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">Display Order</Label>
                <Input type="number" value={form.order_index} onChange={e => setField('order_index', +e.target.value)} className="h-9" />
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl border border-border/60 p-5 space-y-4 bg-secondary/5">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Basic Info</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div><Label className="text-xs mb-1 block">Full Name *</Label><Input placeholder="John Doe" value={form.name} onChange={e => setField('name', e.target.value)} /></div>
                <div><Label className="text-xs mb-1 block">Role / Title</Label><Input placeholder="CEO, Designer..." value={form.role || ''} onChange={e => setField('role', e.target.value)} /></div>
              </div>
              <div><Label className="text-xs mb-1 block">Email</Label><Input type="email" placeholder="john@example.com" value={form.email || ''} onChange={e => setField('email', e.target.value)} /></div>
              <div><Label className="text-xs mb-1 block">Bio</Label><Textarea placeholder="Short biography..." value={form.bio || ''} onChange={e => setField('bio', e.target.value)} rows={3} /></div>
            </div>

            <div className="rounded-2xl border border-border/60 p-5 space-y-3 bg-secondary/5">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Social Links</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { key: 'facebook_url', icon: Facebook, label: 'Facebook' },
                  { key: 'instagram_url', icon: Instagram, label: 'Instagram' },
                  { key: 'linkedin_url', icon: Linkedin, label: 'LinkedIn' },
                  { key: 'twitter_url', icon: Twitter, label: 'Twitter / X' },
                  { key: 'whatsapp_url', icon: MessageCircle, label: 'WhatsApp' },
                  { key: 'fiverr_url', icon: Globe, label: 'Fiverr' },
                  { key: 'upwork_url', icon: Globe, label: 'Upwork' },
                  { key: 'portfolio_url', icon: Globe, label: 'Portfolio' },
                ].map(({ key, icon: Icon, label }) => (
                  <div key={key} className="relative">
                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder={label}
                      value={(form as any)[key] || ''}
                      onChange={e => setField(key, e.target.value)}
                      className="pl-9 h-9"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button variant="outline" onClick={() => setIsFormOpen(false)} className="flex-1">Cancel</Button>
          <Button onClick={handleSave} disabled={isSaving} className="flex-1 gap-2 bg-gradient-to-r from-primary to-purple-600 text-white">
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isSaving ? 'Saving...' : 'Save to Database'}
          </Button>
        </div>
      </div>
    );
  }

  // ── LIST VIEW ──────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Team Members</h2>
          <p className="text-muted-foreground text-sm">Changes save to database — visible on all devices</p>
        </div>
        <Button onClick={openAdd} className="gap-2 bg-gradient-to-r from-primary to-purple-600 text-white">
          <Plus className="w-4 h-4" /> Add Member
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground gap-2">
          <Loader2 className="w-5 h-5 animate-spin" /> Loading from database...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {membersList.map((member, index) => {
            // Formatted role with pipe separators like the reference image
            const formattedRole = (member.role || "")
              .split(",")
              .map(r => r.trim())
              .filter(Boolean)
              .join(" | ");

            // Vibrant modern banner gradients matching the reference image style
            const bannerGradients = [
              "from-[#FF5500] via-[#FF6A00] to-[#FFA033]",
              "from-[#6366F1] via-[#8B5CF6] to-[#EC4899]",
              "from-[#0EA5E9] via-[#2563EB] to-[#4F46E5]",
              "from-[#10B981] via-[#059669] to-[#047857]",
              "from-[#F59E0B] via-[#EA580C] to-[#DC2626]",
              "from-[#8B5CF6] via-[#A855F7] to-[#D946EF]",
              "from-[#06B6D4] via-[#0284C7] to-[#2563EB]",
            ];
            const currentGradient = bannerGradients[index % bannerGradients.length];

            return (
              <div
                key={member.id}
                className="group relative rounded-[26px] border border-border/50 bg-card overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* ── Top Cover Banner ── */}
                <div className={`relative h-28 sm:h-32 bg-gradient-to-r ${currentGradient} overflow-hidden`}>
                  {/* Decorative Geometric Watermark */}
                  <svg
                    className="absolute -right-6 -bottom-8 w-40 h-40 text-white/20 pointer-events-none transform rotate-12"
                    viewBox="0 0 100 100"
                    fill="currentColor"
                  >
                    <path d="M50 0 C22.4 0 0 22.4 0 50 C0 77.6 22.4 100 50 100 C77.6 100 100 77.6 100 50 C100 22.4 77.6 0 50 0 Z M50 20 C66.6 20 80 33.4 80 50 C80 66.6 66.6 80 50 80 C33.4 80 20 66.6 20 50 C20 33.4 33.4 20 50 20 Z" />
                    <rect x="40" y="25" width="45" height="20" rx="10" transform="rotate(45 50 50)" />
                  </svg>

                  {/* Top Status & Quick Action Badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide backdrop-blur-md transition-all ${
                        member.is_active
                          ? "bg-black/30 text-white border border-white/20"
                          : "bg-black/50 text-white/70"
                      }`}
                    >
                      {member.is_active ? "● Active" : "Hidden"}
                    </span>
                  </div>
                </div>

                {/* ── Overlapping Avatar ── */}
                <div className="relative px-6 -mt-12 flex items-end justify-between">
                  <div className="relative w-22 h-22 sm:w-24 sm:h-24 rounded-full border-4 border-card bg-background overflow-hidden shadow-lg shrink-0">
                    <img
                      src={member.image_url || "/sofiullah-ahammad.jpg"}
                      alt={member.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = member.name.toLowerCase().includes("sofiullah")
                          ? "/sofiullah-ahammad.jpg"
                          : "/team/adib.png";
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* ── Content Details ── */}
                <div className="px-6 pt-3 pb-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg sm:text-xl text-foreground tracking-tight">
                      {member.name}
                    </h3>
                    {formattedRole && (
                      <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">
                        {formattedRole}
                      </p>
                    )}
                    {member.bio && (
                      <p className="text-xs text-muted-foreground/80 line-clamp-2 pt-1">
                        {member.bio}
                      </p>
                    )}
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center gap-2 flex-wrap pt-1">
                    {member.facebook_url && (
                      <a
                        href={member.facebook_url}
                        target="_blank"
                        rel="noreferrer"
                        className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 transition-colors"
                      >
                        <Facebook className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.instagram_url && (
                      <a
                        href={member.instagram_url}
                        target="_blank"
                        rel="noreferrer"
                        className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-pink-500 hover:bg-pink-500/10 transition-colors"
                      >
                        <Instagram className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.linkedin_url && (
                      <a
                        href={member.linkedin_url}
                        target="_blank"
                        rel="noreferrer"
                        className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-blue-600 hover:bg-blue-600/10 transition-colors"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.twitter_url && (
                      <a
                        href={member.twitter_url}
                        target="_blank"
                        rel="noreferrer"
                        className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-sky-500 hover:bg-sky-500/10 transition-colors"
                      >
                        <Twitter className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  {/* ── Bottom Actions Bar ── */}
                  <div className="flex items-center justify-between pt-3 border-t border-border/40">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={member.is_active}
                        onCheckedChange={() => handleToggleActive(member)}
                        className="scale-75"
                      />
                      <span className="text-xs text-muted-foreground">
                        {member.is_active ? "Active" : "Hidden"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2.5 text-xs gap-1 hover:text-primary hover:bg-primary/10"
                        onClick={() => openEdit(member)}
                      >
                        <Pencil className="w-3.5 h-3.5" /> Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 hover:text-red-500 hover:bg-red-500/10"
                        onClick={() => handleDelete(member.id, member.name)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
