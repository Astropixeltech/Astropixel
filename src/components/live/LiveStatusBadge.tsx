import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Radio } from 'lucide-react';

interface LiveStatusBadgeProps {
  lc?: any;
  status?: 'upcoming' | 'live' | 'ended' | string;
  language?: 'en' | 'bn' | string;
  className?: string;
}

export default function LiveStatusBadge({ lc, status, language = 'en', className = '' }: LiveStatusBadgeProps) {
  const currentStatus = status || (lc ? (lc.is_active ? 'live' : 'upcoming') : 'upcoming');

  if (currentStatus === 'live') {
    return (
      <Badge className={`bg-red-500 hover:bg-red-600 text-white gap-1 animate-pulse ${className}`}>
        <Radio className="w-3 h-3 animate-ping" />
        {language === 'bn' ? 'লাইভ চলছে' : 'LIVE NOW'}
      </Badge>
    );
  }

  if (currentStatus === 'ended') {
    return (
      <Badge variant="secondary" className={`bg-slate-700 text-slate-300 ${className}`}>
        {language === 'bn' ? 'শেষ হয়েছে' : 'ENDED'}
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className={`border-purple-500/50 text-purple-400 gap-1 ${className}`}>
      <Radio className="w-3 h-3 text-purple-400" />
      {language === 'bn' ? 'আসন্ন' : 'UPCOMING'}
    </Badge>
  );
}
