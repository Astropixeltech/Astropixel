import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from 'next-themes';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  LayoutDashboard, 
  BookOpen, 
  Key, 
  Users, 
  Plus, 
  Trash2, 
  LogOut,
  Copy,
  Check,
  X,
  User,
  Lock,
  Mail,
  Phone,
  UserPlus,
  Search,
  TrendingUp,
  Shield,
  Camera,
  Edit,
  DollarSign,
  Banknote,
  Moon,
  Sun,
  Languages,
  BarChart3,
  PieChart,
  Briefcase,
  UsersRound,
  Wrench,
  Settings,
  FileText,
  Link2,
  GraduationCap,
  Send,
  
  Ticket,
  Sparkles,
  RotateCcw,
  Home,
  Info,
  ChevronRight,
} from 'lucide-react';

import { WorksManagement } from '@/components/admin/WorksManagement';
import { TeamManagement } from '@/components/admin/TeamManagement';
import { ServicesManagement } from '@/components/admin/ServicesManagement';
import SiteSettingsManagement from '@/components/admin/SiteSettingsManagement';
import PageContentManagement from '@/components/admin/PageContentManagement';
import ContactInfoManagement from '@/components/admin/ContactInfoManagement';
import AboutPageEditor from '@/components/admin/AboutPageEditor';
import alphazeroLogoAsset from '@/assets/alphazero-logo.png.asset.json';
import HomepageEditor from '@/components/admin/HomepageEditor';
import FooterManagement from '@/components/admin/FooterManagement';
import EmailManagement from '@/components/admin/EmailManagement';
import ApiKeyManagement from '@/components/admin/ApiKeyManagement';
import PaymentApiManagement from '@/components/admin/PaymentApiManagement';
import FeedbackViewer from '@/components/admin/FeedbackViewer';
import AdminAssistant from '@/components/admin/AdminAssistant';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

// Chart colors
const CHART_COLORS = ['#0ea5e9', '#06b6d4', '#14b8a6', '#10b981', '#22c55e', '#84cc16', '#eab308', '#f97316', '#ef4444', '#ec4899'];

function AdminDashboardInner() {
  const scope: 'agency' | 'learn' = 'agency';
  const { user, profile, signOut, isAdmin, isLoading: authLoading } = useAuth();
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Admin profile state
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);

  // Add admin state
  const [showAddAdminDialog, setShowAddAdminDialog] = useState(false);
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [addingAdmin, setAddingAdmin] = useState(false);

  // Edit profile state
  const [showEditProfileDialog, setShowEditProfileDialog] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);


  // Admin list state
  const [admins, setAdmins] = useState<Array<{
    id: string;
    user_id: string;
    full_name: string;
    email: string;
    avatar_url: string | null;
    created_at: string | null;
  }>>([]);
  const [loadingAdmins, setLoadingAdmins] = useState(false);


  // Fetch all admins
  const fetchAdmins = async () => {
    setLoadingAdmins(true);
    try {
      // Get all user_ids with admin role
      const { data: adminRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id')
        .eq('role', 'admin');

      if (rolesError) {
        console.error('Error fetching admin roles:', rolesError);
        return;
      }

      if (!adminRoles || adminRoles.length === 0) {
        setAdmins([]);
        return;
      }

      const adminUserIds = adminRoles.map(r => r.user_id);

      // Get profiles for these users
      const { data: adminProfiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, user_id, full_name, email, avatar_url, created_at')
        .in('user_id', adminUserIds);

      if (profilesError) {
        console.error('Error fetching admin profiles:', profilesError);
        return;
      }

      setAdmins(adminProfiles || []);
    } catch (error) {
      console.error('Error fetching admins:', error);
    } finally {
      setLoadingAdmins(false);
    }
  };



  // 2.5s safety fallback timer for auth loading
  const [authTimeout, setAuthTimeout] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setAuthTimeout(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Redirect non-admin users
  useEffect(() => {
    if ((!authLoading || authTimeout) && (!user || !isAdmin)) {
      navigate('/admin/login');
    }
  }, [user, isAdmin, authLoading, authTimeout, navigate]);

  if (authLoading && !authTimeout) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#6D28D9] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-slate-300">Verifying Admin Access...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };


  // Change password handler
  const handleChangePassword = async () => {
    if (!newPassword.trim() || !confirmPassword.trim()) {
      toast.error('Provide all information');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setChangingPassword(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        toast.error(error.message);
        setChangingPassword(false);
        return;
      }

      toast.success('Password changed!');
      setShowPasswordDialog(false);
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setChangingPassword(false);
    }
  };

  // Add admin handler
  const handleAddAdmin = async () => {
    if (!newAdminName.trim() || !newAdminEmail.trim() || !newAdminPassword.trim()) {
      toast.error('Provide all information');
      return;
    }

    if (newAdminPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setAddingAdmin(true);

    try {
      const { data, error } = await supabase.functions.invoke('create-admin', {
        body: {
          full_name: newAdminName.trim(),
          email: newAdminEmail.trim(),
          password: newAdminPassword,
        },
      });

      if (error) {
        toast.error(error.message || 'Failed to create Admin');
        return;
      }

      if (data?.error) {
        toast.error(data.error);
        return;
      }

      toast.success('New Admin added successfully!');
      setShowAddAdminDialog(false);
      setNewAdminName('');
      setNewAdminEmail('');
      // Refresh admin list
      fetchAdmins();
      setNewAdminPassword('');
    } catch (error) {
      console.error('Add admin error:', error);
      toast.error('Something went wrong');
    } finally {
      setAddingAdmin(false);
    }
  };

  // Update profile handler
  const handleUpdateProfile = async () => {
    if (!editName.trim()) {
      toast.error('Enter name');
      return;
    }

    setUpdatingProfile(true);

    try {
      // Update profile in database
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ full_name: editName.trim() })
        .eq('user_id', user?.id);

      if (profileError) {
        toast.error(profileError.message);
        return;
      }

      // Update email if changed
      if (editEmail.trim() !== profile?.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: editEmail.trim(),
        });

        if (emailError) {
          toast.error(emailError.message);
          return;
        }
        toast.info('Confirm new email to update email');
      }

      toast.success('Profile updated!');
      setShowEditProfileDialog(false);
      window.location.reload();
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error('Something went wrong');
    } finally {
      setUpdatingProfile(false);
    }
  };

  // Avatar upload handler
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Upload image files only');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('File size must be less than 2MB');
      return;
    }

    setUploadingAvatar(true);

    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${user?.id}/avatar.${fileExt}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        toast.error(uploadError.message);
        return;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update profile with avatar URL
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('user_id', user?.id);

      if (profileError) {
        toast.error(profileError.message);
        return;
      }

      toast.success('Profile picture uploaded!');
      window.location.reload();
    } catch (error) {
      console.error('Avatar upload error:', error);
      toast.error('Something went wrong');
    } finally {
      setUploadingAvatar(false);
    }
  };


  // Collapsible sidebar state
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    lms_core: true,
    lms_more: false,
    cms: true,
    settings: true,
  });

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  // Navigation items - grouped logically
  // scopeTag: 'learn' | 'agency' | 'both' — controls visibility per selected site scope

  const cmsItemsAll = [
    { id: 'homepage', icon: Home, label: language === 'bn' ? 'Homepage' : 'Homepage', scopeTag: 'both' as const },
    { id: 'about', icon: Info, label: 'About', scopeTag: 'both' as const },
    { id: 'services', icon: Wrench, label: language === 'bn' ? 'Service' : 'Services', scopeTag: 'agency' as const },
    { id: 'works', icon: Briefcase, label: language === 'bn' ? 'Works' : 'Works', scopeTag: 'agency' as const },
    { id: 'team', icon: UsersRound, label: language === 'bn' ? 'Team' : 'Team', scopeTag: 'agency' as const },
    { id: 'contact', icon: Phone, label: 'Contact', scopeTag: 'both' as const },
    { id: 'footer', icon: Link2, label: language === 'bn' ? 'Footer' : 'Footer', scopeTag: 'both' as const },
  ];

  const settingsItemsAll = [
    { id: 'settings', icon: Settings, label: language === 'bn' ? 'Settings' : 'Settings', scopeTag: 'both' as const },
    { id: 'apikeys', icon: Key, label: language === 'bn' ? 'API Key' : 'API Keys', scopeTag: 'both' as const },
    { id: 'paymentapi', icon: Key, label: language === 'bn' ? 'Payment API' : 'Payment API', scopeTag: 'both' as const },
    { id: 'email', icon: Send, label: language === 'bn' ? 'Email' : 'Email', scopeTag: 'both' as const },
    { id: 'feedback', icon: FileText, label: language === 'bn' ? 'Feedback' : 'Feedback', scopeTag: 'both' as const },
    { id: 'profile', icon: User, label: language === 'bn' ? 'Admin' : 'Admins', scopeTag: 'both' as const },
  ];

  const inScope = (t: 'learn' | 'agency' | 'both') => t === 'both' || t === scope;
  const cmsItems = cmsItemsAll.filter(i => inScope(i.scopeTag));
  const settingsItems = settingsItemsAll.filter(i => inScope(i.scopeTag));

  // AI Assistant panel state
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const dashboardItem = { id: 'dashboard', icon: LayoutDashboard, label: language === 'bn' ? 'Dashboard' : 'Dashboard' };
  // Hidden settings sub-tabs (accessible only via the Settings hub cards)
  const settingsHubChildren = [
    { id: 'sitesettings', icon: Settings, label: 'Site Settings' },
    { id: 'paymentmethod', icon: Banknote, label: 'Payment Method' },
  ];
  const allNavItems = [dashboardItem, ...cmsItems, ...settingsItems, ...settingsHubChildren];

  // If active tab isn't visible in current scope, switch to dashboard
  useEffect(() => {
    if (!allNavItems.some(i => i.id === activeTab)) {
      setActiveTab('dashboard');
    }
  }, [scope]);





  // Render a nav button
  const renderNavButton = (item: { id: string; icon: any; label: string; badge?: number }, colorClass: string) => (
    <button
      key={item.id}
      onClick={() => setActiveTab(item.id)}
      className={`w-full flex items-center gap-2.5 px-2.5 md:px-3 py-2 md:py-2 rounded-xl text-sm font-medium transition-all duration-200 relative group ${
        activeTab === item.id
          ? `bg-gradient-to-r ${colorClass} text-white shadow-md`
          : 'text-muted-foreground hover:text-foreground hover:bg-secondary/80'
      }`}
    >
      <item.icon className={`w-4 h-4 flex-shrink-0 ${activeTab === item.id ? '' : 'group-hover:scale-110 transition-transform'}`} />
      <span className="hidden md:inline truncate">{item.label}</span>
      {item.badge && item.badge > 0 && (
        <span className={`absolute top-1 right-1 md:static md:ml-auto min-w-4 h-4 px-1 text-[10px] rounded-full flex items-center justify-center font-bold ${
          activeTab === item.id ? 'bg-white/25 text-white' : 'bg-red-500 text-white animate-pulse'
        }`}>
          {item.badge}
        </span>
      )}
    </button>
  );

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 ${language === 'bn' ? 'font-bengali' : ''}`}>
      {/* Minimal Floating Sidebar */}
      <aside className="fixed left-4 top-4 bottom-4 w-16 md:w-56 bg-white dark:bg-slate-900 rounded-2xl border border-border/50 shadow-xl shadow-black/5 z-50 flex flex-col overflow-hidden">
        {/* Logo */}
        <div className="p-3 md:p-4 border-b border-border/50">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <img
              src={alphazeroLogoAsset.url}
              alt="Astropixel Logo"
              className="w-auto flex-shrink-0 h-8 brightness-0 dark:invert"
            />
            <div className="hidden md:block">
              <h1 className={`font-bold text-sm bg-gradient-to-r from-primary to-cyan-600 bg-clip-text text-transparent ${language === 'bn' ? 'font-[SabinaShorolipi]' : ''}`}>
                {language === 'bn' ? 'আলফা ড্যাশবোর্ড' : 'Alpha Dashboard'}
              </h1>
              <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                Admin Panel
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 md:p-3 space-y-1 overflow-y-auto scrollbar-none">
          {/* Dashboard */}
          <div className="mb-2">
            {renderNavButton(dashboardItem as any, 'from-fuchsia-500 to-pink-500')}
          </div>


          {/* CMS Section */}
          <div className="mb-2">
            <p className="hidden md:block text-[10px] font-medium text-muted-foreground/60 uppercase tracking-widest px-2 mb-1.5">
              {language === 'bn' ? 'ওয়েবসাইট' : 'Website'}
            </p>
            <div className="space-y-0.5">
              {cmsItems.map((item) => renderNavButton(item, 'from-violet-500 to-purple-500'))}
            </div>
          </div>

          {/* Settings - single entry, opens Settings hub */}
          <div>
            {renderNavButton(
              { id: 'settings', icon: Settings, label: language === 'bn' ? 'সেটিংস' : 'Settings' } as any,
              'from-amber-500 to-orange-500'
            )}
          </div>

        </nav>

        {/* Footer Actions - Language, Theme, Logout */}
        <div className="p-2 md:p-3 border-t border-border/50 space-y-2">
          {/* Language toggle removed — English only */}

          
          {/* Theme toggle removed */}

          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-2.5 md:px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 bg-gradient-to-r from-red-500/10 to-rose-500/10 hover:from-red-500/20 hover:to-rose-500/20 border border-red-500/20 text-red-600 dark:text-red-400"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center flex-shrink-0">
              <LogOut className="w-4 h-4 text-white" />
            </div>
            <span className="hidden md:inline font-semibold">
              {language === 'bn' ? 'লগ আউট' : 'Logout'}
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`ml-24 md:ml-64 p-4 md:p-6 min-h-screen transition-all duration-300 ${isAssistantOpen ? 'mr-[380px]' : ''}`}>
        {/* Top Bar with Stats */}
        <div className="mb-6">
          {/* Greeting */}
          <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className={`text-2xl font-bold text-foreground ${language === 'bn' ? 'font-[SabinaShorolipi]' : ''}`}>
                  {language === 'bn' ? 'স্বাগতম' : 'Welcome'}, {profile?.full_name?.split(' ')[0]}
                </h1>
                <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
                  {language === 'bn' ? 'এজেন্সি সাইট' : 'Agency Site'}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {language === 'bn' ? 'আজ ' : 'Today is '}{new Date().toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Alpha AI Button */}
              <button
                onClick={() => setIsAssistantOpen(!isAssistantOpen)}
                className={`h-9 px-3.5 rounded-xl flex items-center gap-2 text-sm font-semibold transition-all duration-300 group ${
                  isAssistantOpen
                    ? 'bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 text-white shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-[1.03]'
                }`}
              >
                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span className="hidden sm:inline tracking-wide">Alpha AI</span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                </span>
              </button>
              {/* Profile Button */}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowProfileDialog(true)}
                className="gap-2"
              >
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="" className="w-5 h-5 rounded-full object-cover" />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-cyan-600 flex items-center justify-center text-[10px] font-bold text-white">
                    {profile?.full_name?.charAt(0)}
                  </div>
                )}
                <span className='hidden sm:inline'>{language === 'bn' ? 'প্রোফাইল' : 'Profile'}</span>
              </Button>
            </div>
          </div>

        </div>

        {/* Content Area */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Hidden TabsList - controlled by sidebar */}
          <TabsList className="hidden">
            {allNavItems.map(item => (
              <TabsTrigger key={item.id} value={item.id}>{item.label}</TabsTrigger>
            ))}
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {scope === 'agency' ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'homepage', icon: Home, label: 'Homepage', desc: 'Landing sections', gradient: 'from-fuchsia-500 to-pink-500' },
                    { id: 'about', icon: Info, label: 'About', desc: 'Story & values', gradient: 'from-indigo-500 to-blue-500' },
                    { id: 'services', icon: Wrench, label: 'Services', desc: 'Offerings & pricing', gradient: 'from-emerald-500 to-teal-500' },
                    { id: 'works', icon: Briefcase, label: 'Works', desc: 'Portfolio & projects', gradient: 'from-violet-500 to-purple-500' },
                    { id: 'team', icon: UsersRound, label: 'Team', desc: 'Members & roles', gradient: 'from-sky-500 to-cyan-500' },
                    { id: 'contact', icon: Phone, label: 'Contact', desc: 'Info & socials', gradient: 'from-amber-500 to-orange-500' },
                    { id: 'footer', icon: Link2, label: 'Footer', desc: 'Links & bottom bar', gradient: 'from-slate-500 to-slate-700' },
                    { id: 'settings', icon: Settings, label: 'Settings', desc: 'Site & SEO config', gradient: 'from-rose-500 to-red-500' },
                  ].map((card) => (
                    <button
                      key={card.id}
                      onClick={() => setActiveTab(card.id)}
                      className="group text-left bg-white dark:bg-slate-900 rounded-2xl p-4 border border-border/50 hover:border-transparent hover:shadow-lg hover:shadow-black/5 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform`}>
                        <card.icon className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-sm font-semibold text-foreground">{card.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{card.desc}</p>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                  <div className="lg:col-span-2 rounded-2xl p-5 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/5 to-transparent border border-violet-500/20">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-foreground mb-1">
                          {language === 'bn' ? 'অ্যাজেন্সি সাইট পরিচালনা' : 'Manage your Agency Site'}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {language === 'bn'
                            ? 'উপরের কার্ড থেকে সরাসরি যেকোনো পেজ এডিট করুন। প্রতিটি পরিবর্তন সাথে সাথে লাইভ হয়ে যাবে।'
                            : 'Jump straight into any page from the cards above. Every change goes live instantly.'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsAssistantOpen(true)}
                    className="text-left rounded-2xl p-5 bg-gradient-to-br from-primary/10 to-cyan-500/5 border border-primary/20 hover:border-primary/40 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-bold">Alpha AI</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {language === 'bn' ? 'AI দিয়ে দ্রুত কন্টেন্ট তৈরি করুন।' : 'Generate content instantly with AI.'}
                    </p>
                  </button>
                </div>
              </div>
            ) : null}
          </TabsContent>

          {/* Works Tab */}
          <TabsContent value="works" className="space-y-6">
            <WorksManagement />
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <TeamManagement />
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <ServicesManagement />
          </TabsContent>

          {/* Homepage Editor */}
          <TabsContent value="homepage" className="space-y-6">
            <HomepageEditor />
          </TabsContent>



          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-6">
            <ContactInfoManagement />
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-6">
            <AboutPageEditor />
          </TabsContent>




          {/* Footer Tab */}
          <TabsContent value="footer" className="space-y-6">
            <FooterManagement />
          </TabsContent>

          {/* Email Tab */}
          <TabsContent value="email" className="space-y-6">
            <EmailManagement language={language} />
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="space-y-6">
            <FeedbackViewer />
          </TabsContent>



          {/* AI Assistant removed from tabs - now a persistent side panel */}


          {/* Settings Hub */}
          <TabsContent value="settings" className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{language === 'bn' ? 'অ্যাডমিন প্যানেল সেটিংস' : 'Admin Panel Settings'}</h2>
                <p className="text-sm text-muted-foreground">
                  {language === 'bn' ? 'যেকোনো একটি অপশন বেছে নিন' : 'Pick any option below to configure'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                { id: 'sitesettings', icon: Settings, label: 'Site Settings', desc: 'Favicon, logo, site name', gradient: 'from-sky-500 to-cyan-500' },
                { id: 'paymentmethod', icon: Banknote, label: 'Payment Method', desc: 'Bkash, Nagad & payment APIs', gradient: 'from-emerald-500 to-teal-500' },
                { id: 'apikeys', icon: Key, label: 'API Keys', desc: 'Third-party service keys', gradient: 'from-violet-500 to-purple-500' },
                { id: 'analytics', icon: BarChart3, label: 'Analytics', desc: 'Traffic & sales', gradient: 'from-rose-500 to-pink-500' },
                { id: 'email', icon: Send, label: 'Email', desc: 'Outbound mail & threads', gradient: 'from-indigo-500 to-blue-500' },
                { id: 'feedback', icon: FileText, label: 'Feedback', desc: 'Student video feedback', gradient: 'from-fuchsia-500 to-pink-500' },
                { id: 'comments', icon: FileText, label: 'Comments', desc: 'Lesson comments & Q&A', scopeTag: 'learn', gradient: 'from-amber-500 to-orange-500' },
                { id: 'coupons', icon: Ticket, label: 'Coupons', desc: 'Discount codes', scopeTag: 'learn', gradient: 'from-yellow-500 to-amber-500' },
                { id: 'profile', icon: User, label: 'Admins', desc: 'Admin accounts', gradient: 'from-slate-500 to-slate-700' },
              ]
                .filter((c: any) => !c.scopeTag || c.scopeTag === scope)
                .map((card) => (
                <button
                  key={card.id}
                  onClick={() => setActiveTab(card.id)}
                  className="group text-left bg-white dark:bg-slate-900 rounded-2xl p-4 border border-border/50 hover:border-transparent hover:shadow-lg hover:shadow-black/5 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform`}>
                    <card.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">{card.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{card.desc}</p>
                </button>
              ))}
            </div>
          </TabsContent>

          {/* Site Settings (general) */}
          <TabsContent value="sitesettings" className="space-y-6">
            <Button variant="ghost" size="sm" onClick={() => setActiveTab('settings')} className="gap-1.5 -ml-2">
              <ChevronRight className="w-4 h-4 rotate-180" />
              {language === 'bn' ? 'সেটিংসে ফিরে যান' : 'Back to Settings'}
            </Button>
            <SiteSettingsManagement filter="general" />
          </TabsContent>

          {/* Payment Method (Bkash/Nagad + Payment API combined) */}
          <TabsContent value="paymentmethod" className="space-y-6">
            <Button variant="ghost" size="sm" onClick={() => setActiveTab('settings')} className="gap-1.5 -ml-2">
              <ChevronRight className="w-4 h-4 rotate-180" />
              {language === 'bn' ? 'সেটিংসে ফিরে যান' : 'Back to Settings'}
            </Button>
            <SiteSettingsManagement filter="payment" />
            <div className="pt-2 border-t border-border/50" />
            <PaymentApiManagement />
          </TabsContent>

          {/* API Keys Tab */}
          <TabsContent value="apikeys" className="space-y-6">
            <Button variant="ghost" size="sm" onClick={() => setActiveTab('settings')} className="gap-1.5 -ml-2">
              <ChevronRight className="w-4 h-4 rotate-180" />
              {language === 'bn' ? 'সেটিংসে ফিরে যান' : 'Back to Settings'}
            </Button>
            <ApiKeyManagement />
          </TabsContent>






          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className={`text-xl font-semibold ${language === 'bn' ? 'font-[Aloka]' : ''}`}>
                {language === 'bn' ? 'Admin প্রোফাইল' : 'Admin Profile'}
              </h2>
              <Button onClick={() => setShowAddAdminDialog(true)} className="gap-2">
                <Shield className="w-4 h-4" />
                {language === 'bn' ? 'নতুন Admin যোগ' : 'Add New Admin'}
              </Button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Profile Info Card */}
              <Card className="md:col-span-2 lg:col-span-1">
                <CardHeader>
                  <CardTitle className={`text-lg flex items-center gap-2 ${language === 'bn' ? 'font-[Aloka]' : ''}`}>
                    <User className="w-5 h-5" />
                    {language === 'bn' ? 'প্রোফাইল তথ্য' : 'Profile Info'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative group">
                      {(profile as any)?.avatar_url ? (
                        <img 
                          src={(profile as any).avatar_url} 
                          alt={profile?.full_name}
                          className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-cyan-600 flex items-center justify-center">
                          <span className="text-3xl font-bold text-white">
                            {profile?.full_name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden"
                          onChange={handleAvatarUpload}
                          disabled={uploadingAvatar}
                        />
                        {uploadingAvatar ? (
                          <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent" />
                        ) : (
                          <Camera className="w-6 h-6 text-white" />
                        )}
                      </label>
                    </div>
                    <div className="mt-4">
                      <p className="font-semibold text-lg">{profile?.full_name}</p>
                      <p className="text-sm text-muted-foreground">{profile?.email}</p>
                      <Badge className="mt-2 bg-gradient-to-r from-primary to-cyan-600">Admin</Badge>
                    </div>
                  </div>
                  <Button 
                    onClick={() => {
                      setEditName(profile?.full_name || '');
                      setEditEmail(profile?.email || '');
                      setShowEditProfileDialog(true);
                    }} 
                    variant="outline"
                    className="w-full gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    {language === 'bn' ? 'প্রোফাইল এডিট করুন' : 'Edit Profile'}
                  </Button>
                </CardContent>
              </Card>

              {/* Password Change Card */}
              <Card>
                <CardHeader>
                  <CardTitle className={`text-lg flex items-center gap-2 ${language === 'bn' ? 'font-[Aloka]' : ''}`}>
                    <Lock className="w-5 h-5" />
                    {language === 'bn' ? 'পাসওয়ার্ড' : 'Password'}
                  </CardTitle>
                  <CardDescription>
                    {language === 'bn' ? 'অ্যাকাউন্ট সুরক্ষিত রাখতে পাসওয়ার্ড পরিবর্তন করুন' : 'Change password to keep your account secure'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => setShowPasswordDialog(true)} 
                    variant="outline"
                    className="w-full gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    {language === 'bn' ? 'পাসওয়ার্ড পরিবর্তন' : 'Change Password'}
                  </Button>
                </CardContent>
              </Card>

              {/* Add Admin Card */}
              <Card className="border-dashed border-2">
                <CardHeader>
                  <CardTitle className={`text-lg flex items-center gap-2 ${language === 'bn' ? 'font-[Aloka]' : ''}`}>
                    <Shield className="w-5 h-5" />
                    {language === 'bn' ? 'নতুন Admin' : 'New Admin'}
                  </CardTitle>
                  <CardDescription>
                    {language === 'bn' ? 'আরেকজন Admin যোগ করুন যারা সব ম্যানেজ করতে পারবে' : 'Add another admin who can manage everything'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => setShowAddAdminDialog(true)} 
                    className="w-full gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    {language === 'bn' ? 'Admin যোগ করুন' : 'Add Admin'}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Admin List */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className={`text-lg flex items-center gap-2 ${language === 'bn' ? 'font-[Aloka]' : ''}`}>
                      <Shield className="w-5 h-5" />
                      {language === 'bn' ? `All Admins (${admins.length})` : `All Admins (${admins.length})`}
                    </CardTitle>
                    <CardDescription>
                      {language === 'bn' ? 'যারা এই প্ল্যাটফর্ম ম্যানেজ করতে পারে' : 'Those who can manage this platform'}
                    </CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={fetchAdmins}
                    disabled={loadingAdmins}
                    className="gap-2"
                  >
                    {loadingAdmins ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
                    ) : (
                      <TrendingUp className="w-4 h-4" />
                    )}
                    {language === 'bn' ? 'রিফ্রেশ' : 'Refresh'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {loadingAdmins ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
                  </div>
                ) : admins.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>{language === 'bn' ? 'কোনো Admin পাওয়া যায়নি' : 'No admins found'}</p>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {admins.map((admin) => (
                      <div 
                        key={admin.id}
                        className={`flex items-center gap-3 p-4 rounded-lg border ${
                          admin.user_id === user?.id 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:bg-muted/50'
                        } transition-colors`}
                      >
                        {admin.avatar_url ? (
                          <img 
                            src={admin.avatar_url} 
                            alt={admin.full_name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-cyan-600 flex items-center justify-center flex-shrink-0">
                            <span className="text-lg font-bold text-white">
                              {admin.full_name?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate flex items-center gap-2">
                            {admin.full_name}
                            {admin.user_id === user?.id && (
                              <Badge variant="secondary" className="text-xs">
                                {language === 'bn' ? 'আপনি' : 'You'}
                              </Badge>
                            )}
                          </p>
                          <p className="text-sm text-muted-foreground truncate">{admin.email}</p>
                          {admin.created_at && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {language === 'bn' ? 'যোগদান' : 'Joined'}: {new Date(admin.created_at).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US')}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Password Change Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              {language === 'bn' ? 'পাসওয়ার্ড পরিবর্তন' : 'Change Password'}
            </DialogTitle>
            <DialogDescription>
              {language === 'bn' ? 'নতুন পাসওয়ার্ড দিন' : 'Enter your new password'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor='new-password'>{language === 'bn' ? 'নতুন পাসওয়ার্ড' : 'New Password'}</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={language === 'bn' ? 'কমপক্ষে ৬ অক্ষর' : 'At least 6 characters'}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor='confirm-password'>{language === 'bn' ? 'পাসওয়ার্ড নিশ্চিত করুন' : 'Confirm Password'}</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={language === 'bn' ? 'আবার পাসওয়ার্ড দিন' : 'Re-enter password'}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
              {language === 'bn' ? 'বাতিল' : 'Cancel'}
            </Button>
            <Button onClick={handleChangePassword} disabled={changingPassword}>
              {changingPassword ? (language === 'bn' ? 'পরিবর্তন হচ্ছে...' : 'Changing...') : (language === 'bn' ? 'পাসওয়ার্ড পরিবর্তন' : 'Change Password')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Profile Dialog */}
      <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{language === 'bn' ? 'Admin প্রোফাইল' : 'Admin Profile'}</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex items-center gap-4">
              {(profile as any)?.avatar_url ? (
                <img 
                  src={(profile as any).avatar_url} 
                  alt={profile?.full_name}
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-cyan-600 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {profile?.full_name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <p className="font-semibold text-xl">{profile?.full_name}</p>
                <p className="text-muted-foreground">{profile?.email}</p>
                <Badge className="mt-2">Admin</Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => {
                  setShowProfileDialog(false);
                  setEditName(profile?.full_name || '');
                  setEditEmail(profile?.email || '');
                  setShowEditProfileDialog(true);
                }} 
                variant="outline"
                className="flex-1 gap-2"
              >
                <Edit className="w-4 h-4" />
                {language === 'bn' ? 'এডিট' : 'Edit'}
              </Button>
              <Button 
                onClick={() => {
                  setShowProfileDialog(false);
                  setShowPasswordDialog(true);
                }} 
                variant="outline"
                className="flex-1 gap-2"
              >
                <Lock className="w-4 h-4" />
                {language === 'bn' ? 'পাসওয়ার্ড' : 'Password'}
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowProfileDialog(false)}>
              {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Profile Dialog */}
      <Dialog open={showEditProfileDialog} onOpenChange={setShowEditProfileDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5" />
              {language === 'bn' ? 'প্রোফাইল এডিট' : 'Edit Profile'}
            </DialogTitle>
            <DialogDescription>
              {language === 'bn' ? 'আপনার নাম এবং Email পরিবর্তন করুন' : 'Change your name and email'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor='edit-name'>{language === 'bn' ? 'নাম' : 'Name'}</Label>
              <Input
                id="edit-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder={language === 'bn' ? 'আপনার নাম' : 'Your name'}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor='edit-email'>{language === 'bn' ? 'Email' : 'Email'}</Label>
              <Input
                id="edit-email"
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                placeholder={language === 'bn' ? 'আপনার Email' : 'Your email'}
              />
              <p className="text-xs text-muted-foreground">
                {language === 'bn' ? 'Email পরিবর্তন করলে নতুন Emailে confirm করতে হবে' : 'Email change requires confirmation on new email'}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditProfileDialog(false)}>
              {language === 'bn' ? 'বাতিল' : 'Cancel'}
            </Button>
            <Button onClick={handleUpdateProfile} disabled={updatingProfile}>
              {updatingProfile ? (language === 'bn' ? 'আপডেট হচ্ছে...' : 'Updating...') : (language === 'bn' ? 'আপডেট করুন' : 'Update')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Admin Dialog */}
      <Dialog open={showAddAdminDialog} onOpenChange={setShowAddAdminDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              {language === 'bn' ? 'নতুন Admin যোগ করুন' : 'Add New Admin'}
            </DialogTitle>
            <DialogDescription>
              {language === 'bn' ? 'নতুন Admin এর তথ্য দিন' : 'Enter new admin details'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor='admin-name'>{language === 'bn' ? 'নাম' : 'Name'}</Label>
              <Input
                id="admin-name"
                value={newAdminName}
                onChange={(e) => setNewAdminName(e.target.value)}
                placeholder={language === 'bn' ? 'Admin এর নাম' : 'Admin name'}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor='admin-email'>{language === 'bn' ? 'Email' : 'Email'}</Label>
              <Input
                id="admin-email"
                type="email"
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                placeholder="admin@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor='admin-password'>{language === 'bn' ? 'পাসওয়ার্ড' : 'Password'}</Label>
              <Input
                id="admin-password"
                type="password"
                value={newAdminPassword}
                onChange={(e) => setNewAdminPassword(e.target.value)}
                placeholder={language === 'bn' ? 'কমপক্ষে ৬ অক্ষর' : 'At least 6 characters'}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddAdminDialog(false)}>
              {language === 'bn' ? 'বাতিল' : 'Cancel'}
            </Button>
            <Button onClick={handleAddAdmin} disabled={addingAdmin}>
              {addingAdmin ? (language === 'bn' ? 'যোগ হচ্ছে...' : 'Adding...') : (language === 'bn' ? 'Admin যোগ করুন' : 'Add Admin')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* AI Assistant Side Panel */}
      <AdminAssistant isOpen={isAssistantOpen} onToggle={() => setIsAssistantOpen(false)} />
    </div>
  );
}

export default AdminDashboardInner;
