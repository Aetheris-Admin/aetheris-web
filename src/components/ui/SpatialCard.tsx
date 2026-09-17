import type { ReactNode } from 'react';

type SpatialCardProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function SpatialCard({ title, subtitle, children }: SpatialCardProps) {
  return (
    <article className="border border-white/10 bg-white/[.03] p-6 min-h-48 hover:border-[#D600E0]/60 transition-colors">
      <p className="text-xs uppercase tracking-[.18em] text-[#D600E0]">{subtitle}</p>
      <h2 className="mt-3 text-lg font-medium text-white">{title}</h2>
      <div className="mt-6">{children}</div>
    </article>
  );
}