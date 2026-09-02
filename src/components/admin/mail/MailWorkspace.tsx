import { useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Inbox, Send, Edit, Trash2, Mail, MoreVertical, Reply, CornerUpLeft, Star, Paperclip, Clock, X, File as FileIcon, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function MailWorkspace() {
  const [activeFolder, setActiveFolder] = useState('inbox');
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  
  // Reply State
  const [replyText, setReplyText] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // MOCK DATA
  const folders = [
    { id: 'inbox', label: 'Inbox', icon: Inbox, count: 3 },
    { id: 'sent', label: 'Sent', icon: Send },
    { id: 'drafts', label: 'Drafts', icon: Edit },
    { id: 'trash', label: 'Trash', icon: Trash2 },
  ];

  const threads = [
    { id: '1', subject: 'Project Proposal: Web Application', from: 'Atik Hasan', fromEmail: 'atik@astropixel.tech', preview: 'Hello, I have attached the latest project proposal for the new web application. Please review it and let me know your thoughts.', time: '10:30 AM', unread: true, initials: 'AH' },
    { id: '2', subject: 'Figma Designs for V2', from: 'Design Team', fromEmail: 'design@astropixel.tech', preview: 'The new screens are ready for review. We have updated the dashboard and mail workspace.', time: 'Yesterday', unread: false, initials: 'DT' },
    { id: '3', subject: 'Resend Weekly Usage Report', from: 'Resend', fromEmail: 'monitor@resend.com', preview: 'Your daily usage report is here. You have used 15% of your quota.', time: 'Aug 24', unread: false, initials: 'RE' },
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      
      // Check size limit (e.g. 5MB per file for preview)
      const validFiles = newFiles.filter(file => {
        if (file.size > 5 * 1024 * 1024) {
          toast.error(file.name + " is too large (max 5MB)");
          return false;
        }
        return true;
      });

      setAttachments(prev => [...prev, ...validFiles]);
    }
    // Reset input so the same file can be selected again if needed
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSendReply = () => {
    if (!replyText.trim() && attachments.length === 0) {
      toast.error("Please enter a message or attach a file.");
      return;
    }
    
    toast.success("Reply sent successfully! (Mock)");
    setReplyText('');
    setAttachments([]);
  };

  return (
    <div className="flex h-[80vh] min-h-[700px] bg-background/95 backdrop-blur-xl border border-border/40 rounded-2xl overflow-hidden shadow-2xl shadow-primary/5">
      
      {/* Left Sidebar */}
      <div className="w-64 border-r border-border/40 bg-secondary/10 flex flex-col hidden md:flex">
        <div className="p-5 border-b border-border/40">
          <Button className="w-full h-12 rounded-xl justify-center gap-2 bg-gradient-to-r from-blue-600 via-primary to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-primary/20 transition-all duration-300 transform hover:-translate-y-0.5">
            <Edit className="w-4 h-4" /> 
            <span className="font-semibold text-base">Compose Mail</span>
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 ml-2 mt-2">Folders</div>
          {folders.map(f => (
            <button
              key={f.id}
              onClick={() => { setActiveFolder(f.id); setSelectedThreadId(null); }}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-xl transition-all duration-200 group",
                activeFolder === f.id 
                  ? "bg-primary/10 text-primary font-semibold shadow-sm" 
                  : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <f.icon className={cn("w-4 h-4 transition-colors", activeFolder === f.id ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                {f.label}
              </div>
              {f.count && (
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-[11px] font-bold",
                  activeFolder === f.id ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                )}>
                  {f.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Middle Column - Thread List */}
      <div className={cn("w-full md:w-80 border-r border-border/40 flex flex-col bg-background/50", selectedThreadId ? "hidden md:flex" : "flex")}>
        <div className="p-4 border-b border-border/40 bg-background/80 backdrop-blur-sm z-10 sticky top-0">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Search emails..." 
              className="pl-9 h-10 bg-secondary/30 border-border/50 rounded-xl focus-visible:ring-primary/30 focus-visible:bg-background transition-all" 
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {threads.map((t, i) => (
            <div 
              key={t.id}
              onClick={() => setSelectedThreadId(t.id)}
              className={cn(
                "relative p-4 border-b border-border/30 cursor-pointer transition-all duration-200",
                selectedThreadId === t.id ? "bg-primary/[0.03]" : "hover:bg-secondary/20",
                t.unread && "bg-primary/[0.02]"
              )}
            >
              {selectedThreadId === t.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-purple-500 rounded-r-md hidden md:block" />
              )}
              
              <div className="flex justify-between items-baseline mb-1.5 pl-1">
                <span className={cn("text-sm truncate pr-2", t.unread ? "font-bold text-foreground" : "font-medium text-foreground/80")}>
                  {t.from}
                </span>
                <span className={cn("text-xs whitespace-nowrap", t.unread ? "text-primary font-semibold" : "text-muted-foreground")}>
                  {t.time}
                </span>
              </div>
              <div className={cn("text-sm truncate mb-1 pl-1", t.unread ? "font-semibold text-foreground" : "text-foreground/70")}>
                {t.subject}
              </div>
              <div className="text-xs text-muted-foreground line-clamp-2 leading-relaxed pl-1">
                {t.preview}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Reading Pane */}
      <div className={cn("flex-1 flex flex-col bg-background/30 relative", !selectedThreadId ? "hidden md:flex" : "flex")}>
        {selectedThreadId ? (
          <>
            {/* Header */}
            <div className="px-6 py-5 border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-10 flex justify-between items-start gap-4">
              <div className="flex items-center gap-3">
                {/* Mobile Back Button */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden -ml-2 text-muted-foreground"
                  onClick={() => setSelectedThreadId(null)}
                >
                  <CornerUpLeft className="w-5 h-5" />
                </Button>
                <div>
                  <h2 className="text-xl font-bold tracking-tight mb-2">Project Proposal: Web Application</h2>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-primary/5 text-primary text-xs font-normal border-primary/20">Inbox</Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3"/> Today, 10:30 AM</span>
                  </div>
                </div>
              </div>
              
              <div className="hidden sm:flex gap-1 bg-secondary/30 rounded-lg p-1 border border-border/50">
                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-background shadow-sm"><CornerUpLeft className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-background shadow-sm"><Star className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-md text-muted-foreground hover:text-red-500 hover:bg-red-500/10 shadow-sm"><Trash2 className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-background shadow-sm"><MoreVertical className="w-4 h-4" /></Button>
              </div>
            </div>

            {/* Email Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              <div className="flex gap-4 mb-8 items-start">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-primary/20 flex-shrink-0">
                  AH
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-base truncate">Atik Hasan</span>
                    <span className="text-xs text-muted-foreground truncate hidden sm:inline">&lt;atik@astropixel.tech&gt;</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-0.5">
                    to <span className="font-medium text-foreground/80">me</span>
                  </div>
                </div>
              </div>
              
              <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-foreground/90 leading-relaxed">
                <p>Hello Atik,</p>
                <p>We are very interested in your UI/UX design services. Attached is our project proposal outlining the requirements and budget for the upcoming SaaS dashboard.</p>
                <p>We need a premium, glassy look with a lot of purple and blue gradients, exactly like the Astropixel brand.</p>
                <p>Looking forward to hearing from you.</p>
                <br/>
                <p className="font-medium text-foreground">Best regards,<br/>Atik Hasan<br/><span className="text-sm text-muted-foreground font-normal">CEO, Astropixel</span></p>
              </div>

              {/* Received Attachments Mock */}
              <div className="mt-8 pt-6 border-t border-border/40">
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2"><Paperclip className="w-4 h-4"/> 1 Attachment</h4>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-border/50 bg-secondary/20 hover:bg-secondary/40 transition-colors cursor-pointer w-full sm:w-64">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                      <span className="font-bold text-xs">PDF</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">Proposal_V2.pdf</div>
                      <div className="text-xs text-muted-foreground">2.4 MB</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Reply Box */}
            <div className="p-4 border-t border-border/40 bg-background/80 backdrop-blur-sm m-4 rounded-2xl border shadow-sm flex flex-col gap-3 transition-all focus-within:ring-2 focus-within:ring-primary/20">
              
              {/* Draft Attachments Preview */}
              {attachments.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1 pb-2">
                  {attachments.map((file, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-secondary/50 border border-border/50 rounded-lg px-2.5 py-1.5 text-xs max-w-[200px] group">
                      {file.type.startsWith('image/') ? <ImageIcon className="w-3.5 h-3.5 text-primary" /> : <FileIcon className="w-3.5 h-3.5 text-primary" />}
                      <span className="truncate flex-1 font-medium">{file.name}</span>
                      <button 
                        onClick={() => removeAttachment(idx)}
                        className="text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <Input 
                placeholder="Reply to Atik Hasan..." 
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendReply();
                  }
                }}
                className="bg-transparent border-none shadow-none focus-visible:ring-0 px-2 text-base" 
              />
              <div className="flex justify-between items-center pt-2 border-t border-border/50 px-1">
                <div className="flex gap-1 relative">
                  <input 
                    type="file" 
                    multiple 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={handleFileSelect}
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-9 h-9 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                    title="Attach Files"
                  >
                    <Paperclip className="w-4.5 h-4.5"/>
                  </Button>
                </div>
                <Button 
                  onClick={handleSendReply}
                  className="h-10 px-5 rounded-lg gap-2 bg-gradient-to-r from-primary to-purple-600 text-white shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95"
                >
                  Send <Send className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
            <div className="w-24 h-24 rounded-full bg-secondary/30 flex items-center justify-center mb-6">
              <Mail className="w-10 h-10 opacity-40 text-primary" />
            </div>
            <p className="text-lg font-medium text-foreground/80">Your Inbox</p>
            <p className="text-sm mt-1">Select an email from the list to read</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Simple Badge component mockup
function Badge({ children, className, variant }: any) {
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", className)}>{children}</span>
}
