import React from 'react';
import { Option1Logo } from '@/components/ui/Option1Logo';
import { Option2Logo } from '@/components/ui/Option2Logo';
import { SpatialCard } from '@/components/ui/SpatialCard';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] text-white flex flex-col justify-between p-6 md:p-12 selection:bg-[#D600E0] selection:text-white">
      <header className="w-full max-w-6xl mx-auto flex justify-between items-center py-4 border-b border-white/10">
        <Option2Logo className="text-xl" />
        <nav className="flex gap-6 text-sm text-zinc-400">
          <a href="#platform" className="hover:text-white transition-colors">Platform</a>
          <a href="#sovereignty" className="hover:text-white transition-colors">Sovereignty</a>
          <a href="#executives" className="hover:text-white transition-colors">Executives</a>
        </nav>
      </header>

      <section className="w-full max-w-4xl mx-auto my-16 text-center flex flex-col items-center">
        <Option1Logo className="w-36 h-36 mb-8 hover:scale-105 transition-transform duration-300 cursor-pointer" />
        <h1 className="text-4xl md:text-6xl font-sans font-bold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
          autonomous studio orchestration
        </h1>
        <p className="mt-4 text-lg text-zinc-400 max-w-2xl font-light">
          aetheris integrates deterministic waterfall splits, C-suite intercom networks, and real-time spatial web components.
        </p>
      </section>

      <section className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        <SpatialCard title="01 / Sovereign Waterfall" subtitle="Ledger Automation">
          <p className="text-xs text-zinc-300 leading-relaxed">
            Public financial ledger enforcing immutable split structures ($1.50 OpEx / $5.00 Treasury / $3.50 Incubator) direct to Supabase.
          </p>
        </SpatialCard>
        <SpatialCard title="02 / Gatekeeper Validation" subtitle="Autonomous Safeguards">
          <p className="text-xs text-zinc-300 leading-relaxed">
            Live-fire compute cap checks enforcing density rules. Margin thresholds automatically reject or approve deployment payloads.
          </p>
        </SpatialCard>
        <SpatialCard title="03 / Intercom Matrix" subtitle="C-Suite Directives">
          <p className="text-xs text-zinc-300 leading-relaxed">
            Direct node execution via WF 87 bypassing SSRF restrictions, enabling native LLM agent dialogue across Sofia and Maya.
          </p>
        </SpatialCard>
      </section>

      <footer className="w-full max-w-6xl mx-auto border-t border-white/10 pt-6 text-center text-xs text-zinc-500">
        © 2026 Aetheris Studios. All rights reserved.
      </footer>
    </main>
  );
}
