'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Search, Inbox, Send, Edit, Trash2, Mail, CornerUpLeft,
  Star, Paperclip, Clock, X, File as FileIcon, Image as ImageIcon, RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type Attachment = { name: string; size: number; type: string };

type EmailThread = {
  id: string;
  folder: string;
  subject: string;
  from: string;
  fromEmail: string;
  preview: string;
  body: string;
  time: string;
  unread: boolean;
  initials: string;
  attachments?: Attachment[];
};

const MAILBOX = 'atik@astropixel.tech';

export default function MailWorkspace() {
  const [activeFolder, setActiveFolder] = useState('inbox');
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [emails, setEmails] = useState<EmailThread[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [composeTo, setComposeTo] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');
  const [replyText, setReplyText] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fetchError, setFetchError] = useState<string>('');

  // ─── Fetch emails from real DB ───────────────────────────────
  const fetchFolder = useCallback(async (folder: string) => {
    setIsLoading(true);
    setFetchError('');
    try {
      const res = await fetch(`/api/mail/inbox?address=${encodeURIComponent(MAILBOX)}&folder=${folder}`);
      const data = await res.json();
      if (!res.ok) {
        setFetchError(`API Error ${res.status}: ${data.error || 'Unknown'}`);
        return;
      }
      const messages: EmailThread[] = (data.messages || []).map((m: any) => ({
        id: m.id,
        folder: m.folder,
        subject: m.subject || '(No Subject)',
        from: m.from_name || m.from_address || 'Unknown',
        fromEmail: m.from_address || '',
        preview: (m.body_text || '').replace(/<[^>]+>/g, '').substring(0, 80) + '...',
        body: m.body_text || m.body_html || '(No content)',
        time: new Date(m.received_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        unread: !m.is_read,
        initials: (m.from_name || m.from_address || '?').charAt(0).toUpperCase(),
        attachments: (m.attachments || []).map((a: any) => ({ name: a.filename, size: a.size, type: a.content_type }))
      }));
      setEmails(prev => [...prev.filter(e => e.folder !== folder), ...messages]);
      console.log(`[Mail] Loaded ${messages.length} emails for folder: ${folder}`);
    } catch (err: any) {
      setFetchError(`Fetch failed: ${err.message}`);
      console.error('fetchFolder error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load + polling
  useEffect(() => {
    fetchFolder('inbox');
    const interval = setInterval(() => fetchFolder('inbox'), 20000);
    return () => clearInterval(interval);
  }, [fetchFolder]);

  // ─── Derived state ────────────────────────────────────────────
  const activeThreads = emails.filter(e => e.folder === activeFolder);
  const selectedThread = emails.find(e => e.id === selectedThreadId) || null;
  const unreadCount = emails.filter(e => e.folder === 'inbox' && e.unread).length;

  const folders = [
    { id: 'inbox',  label: 'Inbox',  icon: Inbox,  count: unreadCount },
    { id: 'sent',   label: 'Sent',   icon: Send,   count: 0 },
    { id: 'drafts', label: 'Drafts', icon: Edit,   count: 0 },
    { id: 'trash',  label: 'Trash',  icon: Trash2, count: 0 },
  ];

  // ─── Handlers ────────────────────────────────────────────────
  const handleFolderChange = (folderId: string) => {
    setActiveFolder(folderId);
    setSelectedThreadId(null);
    setIsComposing(false);
    fetchFolder(folderId);
  };

  const handleSelectThread = (id: string) => {
    setSelectedThreadId(id);
    setIsComposing(false);
    setEmails(prev => prev.map(e => e.id === id ? { ...e, unread: false } : e));
  };

  const handleSendCompose = async () => {
    if (!composeTo || !composeSubject || !composeBody) {
      toast.error('Please fill in all fields');
      return;
    }
    const toastId = toast.loading('Sending email...');
    try {
      const res = await fetch('/api/mail/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: composeTo, subject: composeSubject, html: composeBody, text: composeBody })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send');

      // Add to sent folder locally
      setEmails(prev => [{
        id: Date.now().toString(),
        folder: 'sent',
        subject: composeSubject,
        from: 'Me (Admin)',
        fromEmail: 'admin@astropixel.tech',
        preview: composeBody.substring(0, 80),
        body: composeBody,
        time: 'Just now',
        unread: false,
        initials: 'M'
      }, ...prev]);

      toast.success('Email sent!', { id: toastId });
      setIsComposing(false);
      setComposeTo(''); setComposeSubject(''); setComposeBody('');
      setActiveFolder('sent');
    } catch (err: any) {
      toast.error(err.message || 'Failed to send', { id: toastId });
    }
  };

  const handleDelete = async () => {
    if (!selectedThreadId) return;
    if (activeFolder === 'trash') {
      setEmails(prev => prev.filter(e => e.id !== selectedThreadId));
      toast.success('Permanently deleted');
    } else {
      setEmails(prev => prev.map(e => e.id === selectedThreadId ? { ...e, folder: 'trash' } : e));
      toast.success('Moved to trash');
    }
    setSelectedThreadId(null);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const valid = Array.from(e.target.files).filter(f => {
        if (f.size > 5 * 1024 * 1024) { toast.error(f.name + ' is too large (max 5MB)'); return false; }
        return true;
      });
      setAttachments(prev => [...prev, ...valid]);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSendReply = async () => {
    if (!replyText.trim() && attachments.length === 0) {
      toast.error('Please enter a message');
      return;
    }
    const toastId = toast.loading('Sending reply...');
    try {
      const res = await fetch('/api/mail/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: selectedThread?.fromEmail,
          subject: 'Re: ' + (selectedThread?.subject || ''),
          html: replyText,
          text: replyText,
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      toast.success('Reply sent!', { id: toastId });
      setReplyText('');
      setAttachments([]);
    } catch (err: any) {
      toast.error(err.message || 'Failed to send', { id: toastId });
    }
  };

  // ─── Render ──────────────────────────────────────────────────
  return (
    <div className="flex h-[80vh] min-h-[700px] bg-background/95 backdrop-blur-xl border border-border/40 rounded-2xl overflow-hidden shadow-2xl shadow-primary/5">

      {/* LEFT SIDEBAR */}
      <div className="hidden md:flex w-64 border-r border-border/40 bg-secondary/10 flex-col">
        <div className="p-5 border-b border-border/40">
          <Button
            onClick={() => { setIsComposing(true); setSelectedThreadId(null); }}
            className="w-full h-12 rounded-xl gap-2 bg-gradient-to-r from-blue-600 via-primary to-purple-600 hover:opacity-90 text-white shadow-lg shadow-primary/20 transition-all"
          >
            <Edit className="w-4 h-4" /> Compose Mail
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 ml-2 mt-2">Folders</p>
          {folders.map(f => (
            <button
              key={f.id}
              onClick={() => handleFolderChange(f.id)}
              className={cn(
                'w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-xl transition-all duration-200 group',
                activeFolder === f.id && !isComposing
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-muted-foreground hover:bg-secondary/40 hover:text-foreground'
              )}
            >
              <div className="flex items-center gap-3">
                <f.icon className="w-4 h-4" />
                {f.label}
              </div>
              {f.count > 0 && (
                <span className={cn(
                  'px-2 py-0.5 rounded-full text-[11px] font-bold',
                  activeFolder === f.id && !isComposing ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'
                )}>{f.count}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* MIDDLE: THREAD LIST */}
      <div className={cn(
        'flex-col border-r border-border/40 bg-background/50 w-full md:w-80',
        (selectedThreadId || isComposing) ? 'hidden md:flex' : 'flex'
      )}>
        <div className="p-4 border-b border-border/40 bg-background/80 sticky top-0 z-10 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search emails..." className="pl-9 h-10 bg-secondary/30 border-border/50 rounded-xl" />
          </div>
          <Button
            variant="ghost" size="icon"
            onClick={() => fetchFolder(activeFolder)}
            className={cn('shrink-0 rounded-xl', isLoading && 'animate-spin opacity-50')}
            disabled={isLoading}
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {fetchError && (
            <div className="p-4 m-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs">
              ⚠️ {fetchError}
              <div className="mt-1 text-muted-foreground">Mailbox: {MAILBOX}</div>
            </div>
          )}
          {isLoading && activeThreads.length === 0 && (
            <div className="p-8 text-center text-muted-foreground text-sm animate-pulse">Loading emails...</div>
          )}
          {!isLoading && !fetchError && activeThreads.length === 0 && (
            <div className="p-8 text-center text-muted-foreground text-sm">No emails in {activeFolder}</div>
          )}
          {activeThreads.map(t => (
            <div
              key={t.id}
              onClick={() => handleSelectThread(t.id)}
              className={cn(
                'relative p-4 border-b border-border/30 cursor-pointer transition-all duration-200',
                selectedThreadId === t.id ? 'bg-primary/5' : 'hover:bg-secondary/20',
                t.unread && 'bg-blue-500/[0.03]'
              )}
            >
              {selectedThreadId === t.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-purple-500 rounded-r-md" />
              )}
              <div className="flex justify-between items-baseline mb-1 pl-1">
                <span className={cn('text-sm truncate pr-2', t.unread ? 'font-bold text-foreground' : 'font-medium text-foreground/80')}>
                  {t.from}
                </span>
                <span className={cn('text-xs whitespace-nowrap shrink-0', t.unread ? 'text-primary font-semibold' : 'text-muted-foreground')}>
                  {t.time}
                </span>
              </div>
              <div className={cn('text-sm truncate mb-1 pl-1', t.unread ? 'font-semibold' : 'text-foreground/70')}>{t.subject}</div>
              <div className="text-xs text-muted-foreground line-clamp-1 pl-1">{t.preview}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: READING PANE or COMPOSE */}
      <div className={cn(
        'flex-1 flex-col bg-background/30',
        (!selectedThreadId && !isComposing) ? 'hidden md:flex' : 'flex'
      )}>
        {isComposing ? (
          <div className="flex-1 flex flex-col p-6 bg-background">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">New Message</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsComposing(false)}><X className="w-5 h-5" /></Button>
            </div>
            <div className="space-y-3 flex-1 flex flex-col">
              <Input placeholder="To" value={composeTo} onChange={e => setComposeTo(e.target.value)} className="h-12 bg-secondary/20 rounded-xl" />
              <Input placeholder="Subject" value={composeSubject} onChange={e => setComposeSubject(e.target.value)} className="h-12 bg-secondary/20 rounded-xl" />
              <Textarea
                placeholder="Write your message..."
                value={composeBody}
                onChange={e => setComposeBody(e.target.value)}
                className="flex-1 resize-none bg-secondary/10 rounded-xl p-4 text-base"
              />
            </div>
            <div className="pt-4 flex justify-between items-center border-t border-border/40 mt-4">
              <Button variant="outline" onClick={() => setIsComposing(false)}>Discard</Button>
              <Button onClick={handleSendCompose} className="h-11 px-8 rounded-xl gap-2 bg-gradient-to-r from-primary to-purple-600 text-white">
                Send <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : selectedThread ? (
          <>
            {/* Header */}
            <div className="px-6 py-5 border-b border-border/40 bg-background/80 sticky top-0 z-10 flex justify-between items-start gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <Button variant="ghost" size="icon" className="md:hidden shrink-0" onClick={() => setSelectedThreadId(null)}>
                  <CornerUpLeft className="w-5 h-5" />
                </Button>
                <div className="min-w-0">
                  <h2 className="text-xl font-bold truncate">{selectedThread.subject}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase font-semibold">{selectedThread.folder}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{selectedThread.time}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:text-yellow-500"><Star className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:text-red-500 hover:bg-red-500/10" onClick={handleDelete}><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              <div className="flex gap-4 mb-8 items-start">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                  {selectedThread.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold">{selectedThread.from}</span>
                    <span className="text-xs text-muted-foreground">&lt;{selectedThread.fromEmail}&gt;</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-0.5">to <span className="font-medium text-foreground/80">me</span></div>
                </div>
              </div>
              <div className="prose prose-sm dark:prose-invert max-w-none text-foreground/90 leading-relaxed whitespace-pre-wrap">
                {selectedThread.body}
              </div>
              {selectedThread.attachments && selectedThread.attachments.length > 0 && (
                <div className="mt-8 pt-6 border-t border-border/40">
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2"><Paperclip className="w-4 h-4" /> {selectedThread.attachments.length} Attachment(s)</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedThread.attachments.map((att, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-border/50 bg-secondary/20 cursor-pointer hover:bg-secondary/40 w-full sm:w-64">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                          <span className="font-bold text-[10px] uppercase">{att.name?.split('.').pop()}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{att.name}</div>
                          <div className="text-xs text-muted-foreground">{((att.size || 0) / 1024).toFixed(0)} KB</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Reply Box */}
            {activeFolder !== 'trash' && activeFolder !== 'sent' && (
              <div className="p-4 border-t border-border/40 bg-background/80 m-4 rounded-2xl border shadow-sm flex flex-col gap-3 focus-within:ring-2 focus-within:ring-primary/20">
                {attachments.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {attachments.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 bg-secondary/50 border border-border/50 rounded-lg px-2.5 py-1.5 text-xs max-w-[200px]">
                        {f.type.startsWith('image/') ? <ImageIcon className="w-3.5 h-3.5 text-primary shrink-0" /> : <FileIcon className="w-3.5 h-3.5 text-primary shrink-0" />}
                        <span className="truncate font-medium">{f.name}</span>
                        <button onClick={() => setAttachments(prev => prev.filter((_, idx) => idx !== i))} className="text-muted-foreground hover:text-red-500 shrink-0">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <Input
                  placeholder={'Reply to ' + selectedThread.from + '...'}
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendReply(); } }}
                  className="bg-transparent border-none shadow-none focus-visible:ring-0 px-2 text-base"
                />
                <div className="flex justify-between items-center pt-2 border-t border-border/50 px-1">
                  <div>
                    <input type="file" multiple className="hidden" ref={fileInputRef} onChange={handleFileSelect} />
                    <Button variant="ghost" size="icon" onClick={() => fileInputRef.current?.click()} className="w-9 h-9 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button onClick={handleSendReply} className="h-10 px-5 rounded-lg gap-2 bg-gradient-to-r from-primary to-purple-600 text-white">
                    Send <Send className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
            <div className="w-24 h-24 rounded-full bg-secondary/30 flex items-center justify-center mb-6">
              <Mail className="w-10 h-10 opacity-40 text-primary" />
            </div>
            <p className="text-lg font-medium text-foreground/80">Your Workspace</p>
            <p className="text-sm mt-1">Select an email or compose a new one</p>
          </div>
        )}
      </div>
    </div>
  );
}
