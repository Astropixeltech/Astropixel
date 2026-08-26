import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Pencil, Trash2, Facebook, Instagram, Linkedin, Twitter, Mail, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import ImageUploader from "./ImageUploader";
import PageHeroEditor from "./PageHeroEditor";
import { DEFAULT_TEAM_MEMBERS, TeamMember, getSavedTeamMembers } from "@/hooks/useTeamMembers";

export const TeamManagement = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  // Local state for instant CRUD operations with localStorage persistence
  const [membersList, setMembersList] = useState<TeamMember[]>(() => getSavedTeamMembers());

  useEffect(() => {
    // Attempt background fetch from Supabase if table populated
    const fetchSupabaseTeam = async () => {
      try {
        const { data, error } = await (supabase as any)
          .from("team_members")
          .select("*")
          .order("order_index", { ascending: true });
        if (!error && data && data.length > 0) {
          setMembersList(data as TeamMember[]);
          if (typeof window !== "undefined") {
            localStorage.setItem("astropixel_team_members", JSON.stringify(data));
          }
        }
      } catch (err) {}
    };
    fetchSupabaseTeam();
  }, []);

  const saveTeamList = (updated: TeamMember[]) => {
    setMembersList(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("astropixel_team_members", JSON.stringify(updated));
    }
    queryClient.invalidateQueries({ queryKey: ["public-team-members"] });
    queryClient.invalidateQueries({ queryKey: ["admin-team-members"] });
  };

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    image_url: "",
    facebook_url: "",
    instagram_url: "",
    linkedin_url: "",
    twitter_url: "",
    whatsapp_url: "",
    email: "",
    fiverr_url: "",
    upwork_url: "",
    portfolio_url: "",
    threads_url: "",
    is_active: true,
  });

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      bio: "",
      image_url: "",
      facebook_url: "",
      instagram_url: "",
      linkedin_url: "",
      twitter_url: "",
      whatsapp_url: "",
      email: "",
      fiverr_url: "",
      upwork_url: "",
      portfolio_url: "",
      threads_url: "",
      is_active: true,
    });
    setEditingMember(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      bio: member.bio || "",
      image_url: member.image_url || "",
      facebook_url: member.facebook_url || "",
      instagram_url: member.instagram_url || "",
      linkedin_url: member.linkedin_url || "",
      twitter_url: member.twitter_url || "",
      whatsapp_url: member.whatsapp_url || "",
      email: member.email || "",
      fiverr_url: member.fiverr_url || "",
      upwork_url: member.upwork_url || "",
      portfolio_url: member.portfolio_url || "",
      threads_url: member.threads_url || "",
      is_active: member.is_active,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("আপনি কি নিশ্চিত এই টিম মেম্বারকে ডিলিট করতে চান?")) return;
    const updated = membersList.filter((m) => m.id !== id);
    saveTeamList(updated);
    toast.success("টিম মেম্বার সফলভাবে ডিলিট করা হয়েছে!");

    try {
      await (supabase as any).from("team_members").delete().eq("id", id);
    } catch (err) {}
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.role.trim()) {
      toast.error("Name and Role requirements must be filled");
      return;
    }

    if (editingMember) {
      const updated = membersList.map((m) =>
        m.id === editingMember.id
          ? {
              ...m,
              ...formData,
              bio: formData.bio || null,
              image_url: formData.image_url || null,
              facebook_url: formData.facebook_url || null,
              instagram_url: formData.instagram_url || null,
              linkedin_url: formData.linkedin_url || null,
              twitter_url: formData.twitter_url || null,
              whatsapp_url: formData.whatsapp_url || null,
              email: formData.email || null,
              fiverr_url: formData.fiverr_url || null,
              upwork_url: formData.upwork_url || null,
              portfolio_url: formData.portfolio_url || null,
              threads_url: formData.threads_url || null,
            }
          : m
      );
      saveTeamList(updated);
      toast.success("টিম মেম্বারের তথ্য সফলভাবে আপডেট করা হয়েছে!");

      try {
        await (supabase as any).from("team_members").update(formData).eq("id", editingMember.id);
      } catch (err) {}
    } else {
      const newMember: TeamMember = {
        id: Date.now().toString(),
        name: formData.name,
        role: formData.role,
        bio: formData.bio || null,
        image_url: formData.image_url || "/team/default.png",
        facebook_url: formData.facebook_url || null,
        instagram_url: formData.instagram_url || null,
        linkedin_url: formData.linkedin_url || null,
        twitter_url: formData.twitter_url || null,
        whatsapp_url: formData.whatsapp_url || null,
        email: formData.email || null,
        fiverr_url: formData.fiverr_url || null,
        upwork_url: formData.upwork_url || null,
        portfolio_url: formData.portfolio_url || null,
        threads_url: formData.threads_url || null,
        is_active: formData.is_active,
        order_index: membersList.length + 1,
      };
      const updated = [...membersList, newMember];
      saveTeamList(updated);
      toast.success("নতুন টিম মেম্বার সফলভাবে যুক্ত করা হয়েছে!");

      try {
        await (supabase as any).from("team_members").insert(formData);
      } catch (err) {}
    }

    resetForm();
  };

  return (
    <div className="space-y-6">
      <PageHeroEditor
        pageName="team"
        title="Team Page — Hero Section"
        subtitle="Click to edit the top hero (badge, title, description)"
        fields={[
          { key: "hero.subtitle", label: "🔖 Top Badge", description: "Small uppercase text above the title", type: "input", fallback: "Our Team" },
          { key: "hero.title", label: "👥 Hero Title", description: "Wrap highlighted words with | | — e.g. Meet the |Creators|", type: "input", fallback: "Meet the |Creators|" },
          { key: "hero.description", label: "📝 Description", description: "Paragraph shown below the title", type: "textarea", fallback: "The creative minds behind Astropixel." },
        ]}
      />

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Team Members ({membersList.length})</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="w-4 h-4 mr-2" />
              Add New Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingMember ? "Edit Team Member" : "Add New Team Member"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Full Name"
                  required
                />
              </div>

              <div>
                <Label>Position / Role *</Label>
                <Input
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g. CEO, Designer, Developer"
                  required
                />
              </div>

              <div>
                <Label>Bio / Introduction</Label>
                <Textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Short Bio"
                  rows={3}
                />
              </div>

              <div>
                <Label>Profile Picture URL</Label>
                <ImageUploader
                  value={formData.image_url}
                  onChange={(url) => setFormData({ ...formData, image_url: url })}
                  folder="team"
                  placeholder="Profile Picture"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Facebook URL</Label>
                  <Input
                    value={formData.facebook_url}
                    onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                    placeholder="https://facebook.com/..."
                    className="text-xs"
                  />
                </div>
                <div>
                  <Label className="text-xs">Instagram URL</Label>
                  <Input
                    value={formData.instagram_url}
                    onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                    placeholder="https://instagram.com/..."
                    className="text-xs"
                  />
                </div>
                <div>
                  <Label className="text-xs">LinkedIn URL</Label>
                  <Input
                    value={formData.linkedin_url}
                    onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                    placeholder="https://linkedin.com/..."
                    className="text-xs"
                  />
                </div>
                <div>
                  <Label className="text-xs">Twitter/X URL</Label>
                  <Input
                    value={formData.twitter_url}
                    onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
                    placeholder="https://x.com/..."
                    className="text-xs"
                  />
                </div>
                <div>
                  <Label className="text-xs">WhatsApp URL / Number</Label>
                  <Input
                    value={formData.whatsapp_url}
                    onChange={(e) => setFormData({ ...formData, whatsapp_url: e.target.value })}
                    placeholder="https://wa.me/..."
                    className="text-xs"
                  />
                </div>
                <div>
                  <Label className="text-xs">Email</Label>
                  <Input
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label>Active (Visible on Website)</Label>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  Save
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
        {membersList.map((member) => (
          <Card key={member.id} className={!member.is_active ? "opacity-60" : ""}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={member.image_url || ""} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(member)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(member.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                {member.bio && (
                  <p className="text-muted-foreground line-clamp-2">{member.bio}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  {member.facebook_url && (
                    <a href={member.facebook_url} target="_blank" rel="noopener noreferrer" title="Facebook">
                      <Facebook className="w-4 h-4 text-blue-600" />
                    </a>
                  )}
                  {member.instagram_url && (
                    <a href={member.instagram_url} target="_blank" rel="noopener noreferrer" title="Instagram">
                      <Instagram className="w-4 h-4 text-pink-600" />
                    </a>
                  )}
                  {member.twitter_url && (
                    <a href={member.twitter_url} target="_blank" rel="noopener noreferrer" title="Twitter/X">
                      <Twitter className="w-4 h-4 text-sky-500" />
                    </a>
                  )}
                  {member.whatsapp_url && (
                    <a href={member.whatsapp_url} target="_blank" rel="noopener noreferrer" title="WhatsApp">
                      <MessageCircle className="w-4 h-4 text-green-500" />
                    </a>
                  )}
                  {member.email && (
                    <a href={`mailto:${member.email}`} title="Email">
                      <Mail className="w-4 h-4 text-red-500" />
                    </a>
                  )}
                  {member.linkedin_url && (
                    <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                      <Linkedin className="w-4 h-4 text-blue-700" />
                    </a>
                  )}
                </div>
                {!member.is_active && (
                  <span className="px-2 py-1 bg-red-500/10 text-red-600 rounded text-xs">
                    Inactive
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {membersList.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No team members found. Click the button above to add a new member.
        </div>
      )}
    </div>
  );
};
