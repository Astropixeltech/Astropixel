'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Search, Inbox, Send, Edit, Trash2, Mail, CornerUpLeft,
  Star, Paperclip, Clock, X, File as FileIcon, Image as ImageIcon,
  RefreshCw, ChevronDown, Check, Shield, ArrowLeft, MoreVertical,
  Reply, Forward, Archive, AlertOctagon, Sparkles
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
  starred?: boolean;
  initials: string;
  attachments?: Attachment[];
};

const AVAILABLE_MAILBOXES = [
  { address: 'atik@astropixel.tech', name: 'Atik (Lead Engineer)' },
  { address: 'hello@astropixel.tech', name: 'Hello (General Inquiries)' },
  { address: 'admin@astropixel.tech', name: 'Admin (System & Operations)' },
  { address: 'support@astropixel.tech', name: 'Support (Client Helpdesk)' },
  { address: 'sofiullah@astropixel.tech', name: 'Sofiullah Ahammad (CEO)' },
];

export default function StandaloneWebmailPage() {
  const [currentMailbox, setCurrentMailbox] = useState('atik@astropixel.tech');
  const [activeFolder, setActiveFolder] = useState('inbox');
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [emails, setEmails] = useState<EmailThread[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMailboxDropdownOpen, setIsMailboxDropdownOpen] = useState(false);

  // Compose State
  const [composeTo, setComposeTo] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');
  const [replyText, setReplyText] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fetchError, setFetchError] = useState<string>('');

  // ─── Fetch emails from real API/DB ───────────────────────────
  const fetchFolder = useCallback(async (folder: string, mailbox: string) => {
    setIsLoading(true);
    setFetchError('');
    try {
      const res = await fetch(`/api/mail/inbox?address=${encodeURIComponent(mailbox)}&folder=${folder}`);
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
        preview: (m.body_text || '').replace(/<[^>]+>/g, '').substring(0, 90) + '...',
        body: m.body_text || m.body_html || '(No content)',
        time: new Date(m.received_at).toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        unread: !m.is_read,
        starred: false,
        initials: (m.from_name || m.from_address || '?').charAt(0).toUpperCase(),
        attachments: (m.attachments || []).map((a: any) => ({
          name: a.filename,
          size: a.size,
          type: a.content_type
        }))
      }));

      // Fallback sample email if mailbox is empty so user sees a beautiful functional UI immediately
      if (messages.length === 0 && folder === 'inbox') {
        const sampleEmail: EmailThread = {
          id: 'welcome-001',
          folder: 'inbox',
          subject: `Welcome to AstroPixel Webmail (${mailbox})`,
          from: 'AstroPixel System',
          fromEmail: 'system@astropixel.tech',
          preview: 'Your official AstroPixel enterprise webmail client is active and configured.',
          body: `Hello,\n\nWelcome to your AstroPixel Webmail Workspace on mail.astropixel.tech.\n\nYour mailbox ${mailbox} is connected to our email routing backend. You can compose, receive, star, organize, and reply to client inquiries in real time.\n\nBest regards,\nAstroPixel Infrastructure Team`,
          time: 'Today, 10:00 AM',
          unread: true,
          starred: true,
          initials: 'A',
          attachments: [
            { name: 'astropixel-security-guide.pdf', size: 1024 * 450, type: 'application/pdf' }
          ]
        };
        setEmails([sampleEmail]);
      } else {
        setEmails(prev => [...prev.filter(e => e.folder !== folder), ...messages]);
      }
    } catch (err: any) {
      setFetchError(`Fetch failed: ${err.message}`);
      console.error('fetchFolder error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load + polling
  useEffect(() => {
    fetchFolder('inbox', currentMailbox);
    const interval = setInterval(() => fetchFolder('inbox', currentMailbox), 25000);
    return () => clearInterval(interval);
  }, [fetchFolder, currentMailbox]);

  // Derived state
  const filteredThreads = emails
    .filter(e => {
      if (activeFolder === 'starred') return e.starred;
      return e.folder === activeFolder;
    })
    .filter(e => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        e.subject.toLowerCase().includes(q) ||
        e.from.toLowerCase().includes(q) ||
        e.fromEmail.toLowerCase().includes(q) ||
        e.preview.toLowerCase().includes(q)
      );
    });

  const selectedThread = emails.find(e => e.id === selectedThreadId) || null;
  const unreadCount = emails.filter(e => e.folder === 'inbox' && e.unread).length;

  const folders = [
    { id: 'inbox',   label: 'Inbox',   icon: Inbox,   count: unreadCount },
    { id: 'starred', label: 'Starred', icon: Star,    count: emails.filter(e => e.starred).length },
    { id: 'sent',    label: 'Sent',    icon: Send,    count: emails.filter(e => e.folder === 'sent').length },
    { id: 'drafts',  label: 'Drafts',  icon: Edit,    count: emails.filter(e => e.folder === 'drafts').length },
    { id: 'archive', label: 'Archive', icon: Archive, count: 0 },
    { id: 'spam',    label: 'Spam',    icon: AlertOctagon, count: 0 },
    { id: 'trash',   label: 'Trash',   icon: Trash2,  count: emails.filter(e => e.folder === 'trash').length },
  ];

  // Handlers
  const handleFolderChange = (folderId: string) => {
    setActiveFolder(folderId);
    setSelectedThreadId(null);
    setIsComposing(false);
    fetchFolder(folderId, currentMailbox);
  };

  const handleSelectThread = (id: string) => {
    setSelectedThreadId(id);
    setIsComposing(false);
    setEmails(prev => prev.map(e => e.id === id ? { ...e, unread: false } : e));
  };

  const toggleStar = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setEmails(prev => prev.map(item => item.id === id ? { ...item, starred: !item.starred } : item));
    toast.success('Updated starred status');
  };

  const handleSendCompose = async () => {
    if (!composeTo || !composeSubject || !composeBody) {
      toast.error('Please fill in recipient, subject, and message.');
      return;
    }
    const toastId = toast.loading('Sending email via AstroPixel Mail...');
    try {
      const res = await fetch('/api/mail/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: composeTo,
          from: currentMailbox,
          subject: composeSubject,
          html: composeBody.replace(/\n/g, '<br/>'),
          text: composeBody
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send email');

      setEmails(prev => [{
        id: Date.now().toString(),
        folder: 'sent',
        subject: composeSubject,
        from: `Me (${currentMailbox})`,
        fromEmail: currentMailbox,
        preview: composeBody.substring(0, 90),
        body: composeBody,
        time: 'Just now',
        unread: false,
        starred: false,
        initials: currentMailbox.charAt(0).toUpperCase()
      }, ...prev]);

      toast.success('Email successfully sent!', { id: toastId });
      setIsComposing(false);
      setComposeTo('');
      setComposeSubject('');
      setComposeBody('');
      setActiveFolder('sent');
    } catch (err: any) {
      toast.error(err.message || 'Failed to send email', { id: toastId });
    }
  };

  const handleDelete = () => {
    if (!selectedThreadId) return;
    if (activeFolder === 'trash') {
      setEmails(prev => prev.filter(e => e.id !== selectedThreadId));
      toast.success('Permanently deleted email');
    } else {
      setEmails(prev => prev.map(e => e.id === selectedThreadId ? { ...e, folder: 'trash' } : e));
      toast.success('Moved to trash');
    }
    setSelectedThreadId(null);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const valid = Array.from(e.target.files).filter(f => {
        if (f.size > 10 * 1024 * 1024) {
          toast.error(`${f.name} exceeds 10MB limit`);
          return false;
        }
        return true;
      });
      setAttachments(prev => [...prev, ...valid]);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSendReply = async () => {
    if (!replyText.trim() && attachments.length === 0) {
      toast.error('Please type a reply message.');
      return;
    }
    const toastId = toast.loading('Sending reply...');
    try {
      const res = await fetch('/api/mail/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: selectedThread?.fromEmail,
          from: currentMailbox,
          subject: 'Re: ' + (selectedThread?.subject || ''),
          html: replyText.replace(/\n/g, '<br/>'),
          text: replyText,
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send reply');
      toast.success('Reply sent successfully!', { id: toastId });
      setReplyText('');
      setAttachments([]);
    } catch (err: any) {
      toast.error(err.message || 'Failed to send reply', { id: toastId });
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-50 text-slate-900 font-sans antialiased select-none">
      
      {/* ════════════════════ TOP NAVBAR ════════════════════ */}
      <header className="h-16 px-4 sm:px-6 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs flex items-center justify-between gap-4 shrink-0 z-30">
        
        {/* Brand & Subdomain Info */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base tracking-tight text-slate-900 font-display">AstroPixel</span>
                <span className="text-[11px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 border border-purple-200">Mail</span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono">mail.astropixel.tech</p>
            </div>
          </Link>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-xl hidden md:block">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search emails, senders, keywords..."
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-100/90 border-slate-200 text-slate-800 placeholder-slate-400 text-xs sm:text-sm focus:bg-white focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Mailbox Switcher & Controls */}
        <div className="flex items-center gap-3">
          
          {/* Active Mailbox Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsMailboxDropdownOpen(!isMailboxDropdownOpen)}
              className="flex items-center gap-2 h-10 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200/70 border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 transition-colors shadow-xs"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="max-w-[160px] sm:max-w-[200px] truncate font-semibold text-slate-800">{currentMailbox}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {isMailboxDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white border border-slate-200 p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">Switch Mailbox</p>
                {AVAILABLE_MAILBOXES.map((m) => (
                  <button
                    key={m.address}
                    onClick={() => {
                      setCurrentMailbox(m.address);
                      setIsMailboxDropdownOpen(false);
                      toast.success(`Switched to ${m.address}`);
                    }}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs transition-colors',
                      currentMailbox === m.address
                        ? 'bg-purple-50 text-purple-700 font-bold border border-purple-200'
                        : 'text-slate-700 hover:bg-slate-50'
                    )}
                  >
                    <div>
                      <p className="font-bold text-slate-900">{m.address}</p>
                      <p className="text-[11px] text-slate-500">{m.name}</p>
                    </div>
                    {currentMailbox === m.address && <Check className="w-4 h-4 text-purple-600 shrink-0" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Refresh button */}
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              fetchFolder(activeFolder, currentMailbox);
              toast.success('Mailbox synced');
            }}
            disabled={isLoading}
            className="h-10 w-10 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl"
            title="Refresh inbox"
          >
            <RefreshCw className={cn('w-4 h-4', isLoading && 'animate-spin text-purple-600')} />
          </Button>

          {/* Admin Dashboard Back Link */}
          <Button asChild size="sm" variant="outline" className="hidden sm:inline-flex border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 rounded-xl h-10 px-3.5 text-xs shadow-xs">
            <Link href="/admin">
              <Shield className="w-3.5 h-3.5 mr-1.5 text-purple-600" />
              Admin
            </Link>
          </Button>

        </div>
      </header>

      {/* ════════════════════ MAIN WORKSPACE ════════════════════ */}
      <div className="flex flex-1 overflow-hidden relative">

        {/* ── 1. LEFT SIDEBAR: FOLDERS ── */}
        <aside className="w-64 border-r border-slate-200/90 bg-white flex flex-col shrink-0 hidden md:flex">
          <div className="p-4">
            <Button
              onClick={() => {
                setIsComposing(true);
                setSelectedThreadId(null);
              }}
              className="w-full h-12 rounded-xl gap-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-sm shadow-md shadow-purple-600/20 transition-all cursor-pointer"
            >
              <Edit className="w-4 h-4" />
              <span>Compose Email</span>
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">Mailbox Folders</p>
            {folders.map(f => (
              <button
                key={f.id}
                onClick={() => handleFolderChange(f.id)}
                className={cn(
                  'w-full flex items-center justify-between px-3.5 py-2.5 text-xs sm:text-sm rounded-xl transition-all duration-200 group font-medium',
                  activeFolder === f.id && !isComposing
                    ? 'bg-purple-50 text-purple-700 font-bold border border-purple-200/80 shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                )}
              >
                <div className="flex items-center gap-3">
                  <f.icon className={cn(
                    'w-4 h-4 transition-colors',
                    activeFolder === f.id && !isComposing ? 'text-purple-600' : 'text-slate-400 group-hover:text-slate-700'
                  )} />
                  <span>{f.label}</span>
                </div>
                {f.count > 0 && (
                  <span className={cn(
                    'px-2 py-0.5 rounded-full text-[11px] font-bold',
                    activeFolder === f.id && !isComposing
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600'
                  )}>
                    {f.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Storage Meter */}
          <div className="p-4 border-t border-slate-200/90 text-[11px] text-slate-500 space-y-2 bg-slate-50/50">
            <div className="flex justify-between">
              <span className="font-medium">Cloud Storage</span>
              <span className="font-semibold text-slate-700">1.2 GB / 25 GB</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 w-[5%]" />
            </div>
          </div>
        </aside>

        {/* ── 2. MIDDLE PANE: THREAD LIST ── */}
        <section className={cn(
          'w-full md:w-96 lg:w-[420px] border-r border-slate-200/90 bg-white flex flex-col shrink-0 overflow-hidden',
          (selectedThreadId || isComposing) ? 'hidden md:flex' : 'flex'
        )}>
          {/* Thread list header */}
          <div className="p-4 border-b border-slate-200/90 bg-slate-50/80 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900 capitalize">{activeFolder}</h3>
              <p className="text-xs text-slate-500 font-medium">{filteredThreads.length} conversation{filteredThreads.length !== 1 ? 's' : ''}</p>
            </div>
            <Button
              size="sm"
              onClick={() => { setIsComposing(true); setSelectedThreadId(null); }}
              className="md:hidden bg-purple-600 text-white rounded-lg text-xs font-semibold shadow-sm"
            >
              <Edit className="w-3.5 h-3.5 mr-1" /> Compose
            </Button>
          </div>

          {/* Thread List Items */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {isLoading && emails.length === 0 ? (
              <div className="p-12 text-center text-slate-400 space-y-3">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto text-purple-600" />
                <p className="text-xs font-medium">Loading emails for {currentMailbox}...</p>
              </div>
            ) : filteredThreads.length === 0 ? (
              <div className="p-12 text-center text-slate-400 space-y-3">
                <Inbox className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-sm font-bold text-slate-700">No emails in {activeFolder}</p>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">Emails sent to {currentMailbox} will appear here instantly.</p>
              </div>
            ) : (
              filteredThreads.map((thread) => {
                const isSelected = thread.id === selectedThreadId;
                return (
                  <div
                    key={thread.id}
                    onClick={() => handleSelectThread(thread.id)}
                    className={cn(
                      'p-4 cursor-pointer transition-all duration-200 relative border-l-4',
                      isSelected
                        ? 'bg-purple-50/80 border-l-purple-600'
                        : 'border-l-transparent hover:bg-slate-50/80',
                      thread.unread ? 'bg-purple-50/30' : ''
                    )}
                  >
                    {/* Unread dot */}
                    {thread.unread && (
                      <span className="absolute top-4 left-1.5 w-2 h-2 rounded-full bg-purple-600 shadow-xs" />
                    )}

                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2.5 truncate">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-100 to-indigo-100 text-purple-700 text-xs font-bold flex items-center justify-center shrink-0 border border-purple-200">
                          {thread.initials}
                        </div>
                        <span className={cn(
                          'text-xs sm:text-sm truncate',
                          thread.unread ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'
                        )}>
                          {thread.from}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-[11px] text-slate-400 font-mono">{thread.time}</span>
                        <button
                          onClick={(e) => toggleStar(thread.id, e)}
                          className={cn('p-1 rounded hover:bg-slate-200/50', thread.starred ? 'text-amber-500' : 'text-slate-300 hover:text-slate-500')}
                        >
                          <Star className={cn('w-3.5 h-3.5', thread.starred && 'fill-current')} />
                        </button>
                      </div>
                    </div>

                    <h4 className={cn(
                      'text-xs sm:text-sm truncate mb-1',
                      thread.unread ? 'font-bold text-slate-900' : 'font-semibold text-slate-800'
                    )}>
                      {thread.subject}
                    </h4>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-normal">
                      {thread.preview}
                    </p>

                    {thread.attachments && thread.attachments.length > 0 && (
                      <div className="mt-2 flex items-center gap-1 text-[11px] text-purple-600 font-medium">
                        <Paperclip className="w-3 h-3" />
                        <span>{thread.attachments.length} attachment{thread.attachments.length > 1 ? 's' : ''}</span>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* ── 3. RIGHT PANE: EMAIL VIEWER OR COMPOSE ── */}
        <main className={cn(
          'flex-1 bg-slate-50/60 flex flex-col overflow-hidden',
          (!selectedThreadId && !isComposing) ? 'hidden md:flex items-center justify-center' : 'flex'
        )}>
          
          {/* COMPOSE VIEW */}
          {isComposing ? (
            <div className="flex-1 flex flex-col p-6 overflow-y-auto">
              <div className="max-w-3xl w-full mx-auto bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2 font-display">
                    <Edit className="w-4 h-4 text-purple-600" />
                    New Message
                  </h3>
                  <button onClick={() => setIsComposing(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3.5">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-500 w-16 uppercase">From:</span>
                    <span className="text-xs font-mono font-bold text-purple-700 px-3 py-1.5 bg-purple-50 rounded-lg border border-purple-200">{currentMailbox}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-500 w-16 uppercase">To:</span>
                    <Input
                      value={composeTo}
                      onChange={(e) => setComposeTo(e.target.value)}
                      placeholder="client@company.com"
                      className="bg-slate-50 border-slate-200 text-slate-900 text-xs sm:text-sm h-11 rounded-xl focus:bg-white focus:border-purple-600"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-500 w-16 uppercase">Subject:</span>
                    <Input
                      value={composeSubject}
                      onChange={(e) => setComposeSubject(e.target.value)}
                      placeholder="Project Proposal / Inquiry Response"
                      className="bg-slate-50 border-slate-200 text-slate-900 text-xs sm:text-sm h-11 rounded-xl focus:bg-white focus:border-purple-600"
                    />
                  </div>

                  <div className="space-y-1 pt-1">
                    <Textarea
                      rows={10}
                      value={composeBody}
                      onChange={(e) => setComposeBody(e.target.value)}
                      placeholder="Write your email message here..."
                      className="w-full bg-slate-50 border-slate-200 text-slate-900 text-xs sm:text-sm resize-none p-4 rounded-xl leading-relaxed focus:bg-white focus:border-purple-600"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      multiple
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs gap-1.5 rounded-xl h-10 shadow-xs"
                    >
                      <Paperclip className="w-3.5 h-3.5" /> Attach
                    </Button>
                    {attachments.length > 0 && (
                      <span className="text-xs text-purple-600 font-medium">{attachments.length} file(s) attached</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsComposing(false)}
                      className="text-slate-500 hover:text-slate-900 rounded-xl"
                    >
                      Discard
                    </Button>
                    <Button
                      onClick={handleSendCompose}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm px-6 h-10 rounded-xl gap-2 shadow-md shadow-purple-600/20 cursor-pointer"
                    >
                      <Send className="w-4 h-4" /> Send Email
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : selectedThread ? (
            /* THREAD DETAIL READER VIEW */
            <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50/50">
              
              {/* Header Action Bar */}
              <div className="h-14 px-6 border-b border-slate-200/90 bg-white flex items-center justify-between shrink-0 shadow-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedThreadId(null)}
                    className="md:hidden p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => toggleStar(selectedThread.id)}
                    className={cn('h-9 w-9 rounded-lg', selectedThread.starred ? 'text-amber-500' : 'text-slate-400 hover:text-slate-800')}
                  >
                    <Star className={cn('w-4 h-4', selectedThread.starred && 'fill-current')} />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleDelete}
                    className="h-9 w-9 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                    title="Delete email"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setReplyText(`\n\n--- On ${selectedThread.time}, ${selectedThread.from} wrote:\n> ${selectedThread.body}`);
                    }}
                    className="border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs gap-1.5 rounded-xl h-9 shadow-xs"
                  >
                    <Reply className="w-3.5 h-3.5" /> Reply
                  </Button>
                </div>
              </div>

              {/* Message Content Body */}
              <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
                
                {/* Subject Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-display">
                  {selectedThread.subject}
                </h2>

                {/* Sender Header Card */}
                <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-100 to-indigo-100 text-purple-700 font-bold text-sm flex items-center justify-center border border-purple-200 shadow-xs">
                      {selectedThread.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-slate-900 text-sm">{selectedThread.from}</p>
                        <span className="text-xs text-slate-500 font-mono">&lt;{selectedThread.fromEmail}&gt;</span>
                      </div>
                      <p className="text-[11px] text-slate-400">To: {currentMailbox}</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 font-mono shrink-0">{selectedThread.time}</span>
                </div>

                {/* Body Text / HTML */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200/90 text-slate-800 text-sm sm:text-[14.5px] leading-relaxed whitespace-pre-wrap font-normal shadow-xs">
                  {selectedThread.body}
                </div>

                {/* Attachments Section */}
                {selectedThread.attachments && selectedThread.attachments.length > 0 && (
                  <div className="space-y-2.5 pt-2">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Attachments ({selectedThread.attachments.length})</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedThread.attachments.map((att, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between hover:border-purple-300 shadow-xs transition-colors"
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <FileIcon className="w-5 h-5 text-purple-600 shrink-0" />
                            <div className="truncate">
                              <p className="text-xs font-bold text-slate-800 truncate">{att.name}</p>
                              <p className="text-[11px] text-slate-400 font-mono">{(att.size / 1024).toFixed(1)} KB</p>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost" className="text-xs text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Inline Reply Box */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 mt-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
                    <Reply className="w-3.5 h-3.5 text-purple-600" />
                    <span>Quick Reply as <strong className="text-purple-700 font-mono">{currentMailbox}</strong></span>
                  </div>
                  <Textarea
                    rows={4}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={`Reply to ${selectedThread.from}...`}
                    className="w-full bg-slate-50 border-slate-200 text-slate-900 text-xs sm:text-sm p-3.5 rounded-xl resize-none leading-relaxed focus:bg-white focus:border-purple-600"
                  />
                  <div className="flex justify-between items-center pt-1">
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        className="border-slate-200 bg-white text-slate-600 hover:text-slate-900 text-xs gap-1.5 rounded-xl shadow-xs"
                      >
                        <Paperclip className="w-3.5 h-3.5" /> Attach
                      </Button>
                    </div>
                    <Button
                      onClick={handleSendReply}
                      className="bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm px-5 h-9 rounded-xl gap-2 shadow-md shadow-purple-600/20 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" /> Send Reply
                    </Button>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            /* EMPTY PLACEHOLDER */
            <div className="text-center p-12 text-slate-400 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mx-auto text-slate-300 shadow-sm">
                <Mail className="w-8 h-8 text-slate-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800 font-display">No conversation selected</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  Select an email thread from the left or compose a new message using your official <strong className="text-slate-700 font-medium">{currentMailbox}</strong> account.
                </p>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
