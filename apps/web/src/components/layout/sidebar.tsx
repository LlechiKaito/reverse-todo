'use client';

import { House, History, Settings, Menu } from 'lucide-react';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const navItems: NavItem[] = [
  { icon: <House size={20} />, label: 'ホーム', active: true },
  { icon: <History size={20} />, label: '履歴' },
  { icon: <Settings size={20} />, label: '設定' },
];

export function Sidebar() {
  return (
    <aside className="flex flex-col gap-7 w-[240px] h-full bg-[var(--color-bg-secondary)] border-r border-[var(--color-border)] px-5 py-7">
      {/* Logo */}
      <div className="flex items-center gap-2.5 w-full">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent">
          <span className="text-white text-lg font-black">✕</span>
        </div>
        <span className="text-[var(--color-text-primary)] text-lg font-bold tracking-tight">
          NOT-To-Do
        </span>
        <div className="flex-1" />
        <button className="flex items-center justify-center p-1 rounded-md">
          <Menu size={16} className="text-[var(--color-text-secondary)]" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 w-full">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`flex items-center gap-3 w-full rounded-xl px-3.5 py-2.5 text-sm transition-colors ${
              item.active
                ? 'bg-accent text-white font-semibold'
                : 'text-[var(--color-text-secondary)] font-medium hover:bg-[var(--color-white-10)]'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* User */}
      <div className="flex items-center gap-3 w-full">
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-accent">
          <span className="text-white text-sm font-bold">T</span>
        </div>
        <span className="text-[var(--color-text-secondary)] text-sm font-medium">Tomoya</span>
      </div>
    </aside>
  );
}
