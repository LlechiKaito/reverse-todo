import { Plus } from 'lucide-react';

interface HeaderProps {
  date: string;
  title: string;
}

export function Header({ date, title }: HeaderProps) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-col gap-1">
        <span className="text-[var(--color-text-secondary)] text-sm font-medium">{date}</span>
        <h1 className="font-fraunces text-[28px] font-semibold text-[var(--color-text-primary)] tracking-tight">
          {title}
        </h1>
      </div>
      <button className="flex items-center gap-2 bg-accent text-white rounded-xl px-5 py-2.5 text-sm font-semibold shadow-[0_8px_24px_rgba(99,102,241,0.2)] hover:brightness-110 transition">
        <Plus size={18} />
        <span>新規宣言</span>
      </button>
    </div>
  );
}
