interface StatCardProps {
  label: string;
  value: string;
  valueColor?: string;
}

export function StatCard({ label, value, valueColor }: StatCardProps) {
  return (
    <div className="flex flex-col gap-2 flex-1 bg-[var(--color-bg-card)] rounded-2xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.25)]">
      <span className="text-[var(--color-text-secondary)] text-[13px] font-medium">{label}</span>
      <span
        className="text-4xl font-bold tracking-tighter"
        style={{ lineHeight: 0.9, color: valueColor || 'var(--color-text-primary)' }}
      >
        {value}
      </span>
    </div>
  );
}
