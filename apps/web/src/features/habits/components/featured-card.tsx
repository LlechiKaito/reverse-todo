'use client';

import { Smartphone, Check, X } from 'lucide-react';

interface FeaturedCardProps {
  category: string;
  title: string;
  message: string;
  streakDays: number;
}

export function FeaturedCard({ category, title, message, streakDays }: FeaturedCardProps) {
  return (
    <div className="flex items-center gap-6 w-full rounded-[20px] px-8 py-7 shadow-[0_8px_24px_rgba(99,102,241,0.2)] bg-gradient-to-br from-[#4F46E5] to-[#059669]">
      {/* Left */}
      <div className="flex flex-col gap-2.5 flex-1">
        <div className="flex items-center gap-1.5 bg-white/[0.13] rounded-lg px-2.5 py-1 w-fit">
          <Smartphone size={12} className="text-white/80" />
          <span className="text-white/80 text-[11px] font-semibold">{category}</span>
        </div>
        <h2 className="font-fraunces text-[22px] font-semibold text-white tracking-tight">
          {title}
        </h2>
        <p className="text-white/80 text-sm">{message}</p>
        <div className="flex items-center gap-2.5 mt-1">
          <button className="flex items-center gap-1.5 bg-[#32D583]/25 text-[#32D583] rounded-xl px-4 py-2.5 text-[13px] font-semibold hover:bg-[#32D583]/35 transition">
            <Check size={14} />
            <span>今日もOK</span>
          </button>
          <button className="flex items-center gap-1.5 bg-[#F87171]/20 text-[#F87171] rounded-xl px-4 py-2.5 text-[13px] font-semibold hover:bg-[#F87171]/30 transition">
            <X size={14} />
            <span>今日は敗北…</span>
          </button>
        </div>
      </div>

      {/* Right - Streak */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-white text-[72px] font-bold tracking-[-2px]" style={{ lineHeight: 0.85 }}>
          {streakDays}
        </span>
        <span className="text-white/80 text-base font-medium">日連続</span>
      </div>
    </div>
  );
}
