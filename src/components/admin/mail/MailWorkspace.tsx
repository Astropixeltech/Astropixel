import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Search, Inbox, Send, Edit, Trash2, Mail, MoreVertical, Reply } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MailWorkspace() {
  const [activeFolder, setActiveFolder] = useState('inbox');
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);

  // MOCK DATA for now until API is ready
  const folders = [
    { id: 'inbox', label: 'Inbox', icon: Inbox, count: 3 },
    { id: 'sent', label: 'Sent', icon: Send },
    { id: 'drafts', label: 'Drafts', icon: Edit },
    { id: 'trash', label: 'Trash', icon: Trash2 },
  ];

  const threads = [
    { id: '1', subject: 'Project Proposal', from: 'client@example.com', preview: 'Hello Atik, attached is the...', time: '10:30 AM', unread: true },
    { id: '2', subject: 'Figma Designs', from: 'design@astropixel.tech', preview: 'The new screens are ready for review.', time: 'Yesterday', unread: false },
    { id: '3', subject: 'Server Alert', from: 'monitor@resend.com', preview: 'Your daily usage report', time: 'Aug 24', unread: false },
  ];

  return (
    <div className="flex h-[800px] bg-background border border-border/50 rounded-xl overflow-hidden shadow-sm">
      {/* Sidebar */}
      <div className="w-64 border-r border-border/50 bg-secondary/20 flex flex-col">
        <div className="p-4 border-b border-border/50">
          <Button className="w-full justify-start gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white border-0">
            <Edit className="w-4 h-4" /> Compose
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {folders.map(f => (
            <button
              key={f.id}
              onClick={() => { setActiveFolder(f.id); setSelectedThreadId(null); }}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors",
                activeFolder === f.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-2">
                <f.icon className="w-4 h-4" />
                {f.label}
              </div>
              {f.count && <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">{f.count}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Middle Column - Thread List */}
      <div className="w-80 border-r border-border/50 flex flex-col bg-background">
        <div className="p-3 border-b border-border/50">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search emails..." className="pl-9 bg-secondary/30 border-none" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {threads.map(t => (
            <div 
              key={t.id}
              onClick={() => setSelectedThreadId(t.id)}
              className={cn(
                "p-3 border-b border-border/10 cursor-pointer transition-colors hover:bg-secondary/30",
                selectedThreadId === t.id && "bg-secondary/50",
                t.unread && "bg-primary/5"
              )}
            >
              <div className="flex justify-between items-baseline mb-1">
                <span className={cn("text-sm truncate font-medium", t.unread && "text-foreground")}>{t.from}</span>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{t.time}</span>
              </div>
              <div className={cn("text-sm truncate", t.unread ? "font-medium text-foreground" : "text-foreground/80")}>{t.subject}</div>
              <div className="text-xs text-muted-foreground truncate mt-0.5">{t.preview}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Reading Pane */}
      <div className="flex-1 flex flex-col bg-background/50">
        {selectedThreadId ? (
          <>
            <div className="p-4 border-b border-border/50 flex justify-between items-center bg-background">
              <h2 className="text-lg font-semibold">Project Proposal</h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon"><Reply className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon"><Trash2 className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  C
                </div>
                <div>
                  <div className="font-medium text-sm">client@example.com</div>
                  <div className="text-xs text-muted-foreground">to me • 10:30 AM</div>
                </div>
              </div>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p>Hello Atik,</p>
                <p>We are very interested in your UI/UX design services. Attached is our project proposal outlining the requirements and budget.</p>
                <p>Looking forward to hearing from you.</p>
                <p>Best,<br/>The Client</p>
              </div>
            </div>
            <div className="p-4 border-t border-border/50 bg-background">
              <Input placeholder="Reply to this email..." className="bg-secondary/30" />
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
            <Mail className="w-12 h-12 mb-4 opacity-20" />
            <p>Select an email to read</p>
          </div>
        )}
      </div>
    </div>
  );
}
