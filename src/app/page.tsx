"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Zap, Sparkles, UserCheck, RefreshCw } from "lucide-react";
import { SpatialCard } from "@/components/ui/SpatialCard";
import { Option1Logo } from "@/components/ui/Option1Logo";

interface StrategyzerData {
  hero_headline: string;
  hero_subdeck: string;
  customer_jobs: string[];
  pain_relievers: string[];
  gain_creators: string[];
}

interface AvatarPrediction {
  id: string;
  status: string;
  output?: string[];
  urls?: { get: string };
}

export default function Home() {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [strategy, setStrategy] = useState<StrategyzerData | null>(null);

  // Task 2: Executive Avatar State
  const [selectedExec, setSelectedExec] = useState<"sofia" | "maya">("sofia");
  const [isGeneratingAvatar, setIsGeneratingAvatar] = useState(false);
  const [avatarData, setAvatarData] = useState<AvatarPrediction | null>(null);
  const [avatarError, setAvatarError] = useState<string | null>(null);

  const handleGenerateStrategy = async () => {
    if (!description.trim()) return;

    const strategyWebhookUrl =
      process.env.NEXT_PUBLIC_STRATEGYZER_WEBHOOK_URL ??
      "https://aetheris.app.n8n.cloud/webhook/venture-strategyzer";

    setIsLoading(true);
    try {
      const response = await fetch(strategyWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ venture_description: description }),
      });

      if (!response.ok) throw new Error("Strategyzer pipeline response failed");
      
      const data = await response.json();
      setStrategy(data);
    } catch (error) {
      console.error("Strategyzer Pipeline Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateAvatar = async () => {
    const avatarWebhookUrl =
      process.env.NEXT_PUBLIC_AVATAR_WEBHOOK_URL ??
      "https://aetheris.app.n8n.cloud/webhook/generate-avatar";

    setIsGeneratingAvatar(true);
    setAvatarError(null);
    setAvatarData(null);

    try {
      const response = await fetch(avatarWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ executive: selectedExec }),
      });

      if (!response.ok) throw new Error("Avatar generation request failed");

      const data: AvatarPrediction = await response.json();
      setAvatarData(data);
    } catch (error) {
      console.error("Avatar Generation Error:", error);
      setAvatarError("Failed to trigger Replicate prediction node.");
    } finally {
      setIsGeneratingAvatar(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0A0A0F] text-zinc-300 font-sans selection:bg-[#D600E0] selection:text-white p-6 md:p-12 flex flex-col items-center">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl flex justify-between items-center mb-12"
      >
        <div className="w-32"><Option1Logo /></div>
        <div className="text-xs uppercase tracking-widest text-zinc-500 border border-zinc-800 px-3 py-1 rounded-full bg-zinc-900/50">
          Autonomous Strategy & Avatar Engine
        </div>
      </motion.div>

      {/* Dynamic Hero Section */}
      <motion.div layout className="w-full max-w-4xl text-center mb-10">
        <motion.h1 layout className="text-4xl md:text-6xl font-medium tracking-tight text-white mb-4 lowercase">
          {strategy ? strategy.hero_headline : "map your venture."}
        </motion.h1>
        <motion.p layout className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto">
          {strategy ? strategy.hero_subdeck : "Input your core mechanics. The Aetheris node will map it to strict Strategyzer primitives and synthesize C-Suite executive avatars."}
        </motion.p>
      </motion.div>

      {/* Input Console */}
      <motion.div layout className="w-full max-w-3xl relative mb-12">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-zinc-800 via-[#D600E0]/30 to-zinc-800 rounded-xl blur opacity-30"></div>
        <div className="relative bg-[#0d0d12] border border-zinc-800 rounded-xl p-3 flex flex-col">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Aetheris Studios uses autonomous AI agents to build React components and manage cloud deployment..."
            className="w-full bg-transparent text-white placeholder-zinc-600 p-4 min-h-[110px] focus:outline-none resize-none text-sm md:text-base"
            spellCheck={false}
          />
          <div className="flex justify-end p-2 border-t border-zinc-800/50 mt-2">
            <button
              onClick={handleGenerateStrategy}
              disabled={isLoading || !description.trim()}
              className="flex items-center gap-2 bg-[#D600E0] hover:bg-[#b000b8] text-white px-6 py-2.5 rounded-md font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(214,0,224,0.25)]"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
              {isLoading ? "Ingesting Strategy..." : "Generate Primitives"}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Strategyzer Primitives Section */}
      <AnimatePresence>
        {strategy && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }}
            className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            <SpatialCard title="Customer Jobs">
              <ul className="space-y-3 mt-4">
                {strategy.customer_jobs.map((job, i) => (
                  <li key={i} className="text-sm border-b border-zinc-800/50 pb-2 text-zinc-300 last:border-0">• {job}</li>
                ))}
              </ul>
            </SpatialCard>
            
            <SpatialCard title="Pain Relievers">
              <ul className="space-y-3 mt-4">
                {strategy.pain_relievers.map((pain, i) => (
                  <li key={i} className="text-sm border-b border-zinc-800/50 pb-2 text-zinc-300 last:border-0">• {pain}</li>
                ))}
              </ul>
            </SpatialCard>
            
            <SpatialCard title="Gain Creators">
              <ul className="space-y-3 mt-4">
                {strategy.gain_creators.map((gain, i) => (
                  <li key={i} className="text-sm border-b border-zinc-800/50 pb-2 text-zinc-300 last:border-0">• {gain}</li>
                ))}
              </ul>
            </SpatialCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Executive Avatar Synthesis Panel */}
      <motion.div layout className="w-full max-w-6xl border-t border-zinc-800/80 pt-12 mt-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-2xl font-medium text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D600E0]" />
              Executive Avatar Generator
            </h2>
            <p className="text-sm text-zinc-400 mt-1">
              Select an executive profile to dispatch an 8K SDXL rendering pipeline via n8n and Replicate.
            </p>
          </div>

          {/* Executive Switcher Controls */}
          <div className="flex items-center gap-3 bg-[#0d0d12] border border-zinc-800 p-1.5 rounded-lg">
            <button
              onClick={() => setSelectedExec("sofia")}
              className={`px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedExec === "sofia"
                  ? "bg-[#D600E0] text-white shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Sofia (Tech Exec)
            </button>
            <button
              onClick={() => setSelectedExec("maya")}
              className={`px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedExec === "maya"
                  ? "bg-[#D600E0] text-white shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Maya (Creative Dir)
            </button>
          </div>
        </div>

        {/* Action & Status Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <SpatialCard title={`Synthesize ${selectedExec.toUpperCase()} Avatar`}>
            <p className="text-sm text-zinc-400 mt-2 mb-6">
              Prompt target: <span className="text-zinc-200 font-mono text-xs">{selectedExec === "sofia" ? "Brunette Tech Executive / Cyber Magenta Rim Lighting" : "Blonde Creative Director / Glassmorphic Minimalist Styling"}</span>
            </p>

            <button
              onClick={handleGenerateAvatar}
              disabled={isGeneratingAvatar}
              className="w-full flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 px-6 py-3 rounded-lg font-medium text-sm transition-all disabled:opacity-50"
            >
              {isGeneratingAvatar ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#D600E0]" />
                  <span>Dispatching Prediction Node...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 text-[#D600E0]" />
                  <span>Render {selectedExec === "sofia" ? "Sofia" : "Maya"} (SDXL Node)</span>
                </>
              )}
            </button>

            {avatarError && (
              <p className="text-xs text-red-400 mt-4 border border-red-900/50 bg-red-950/20 p-3 rounded-md">
                {avatarError}
              </p>
            )}
          </SpatialCard>

          {/* Prediction Output Monitor */}
          <SpatialCard title="Replicate Prediction Status">
            {avatarData ? (
              <div className="space-y-4 mt-2">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <span className="text-xs text-zinc-400">Prediction ID</span>
                  <span className="text-xs font-mono text-white bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
                    {avatarData.id}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <span className="text-xs text-zinc-400">Pipeline Status</span>
                  <span className="text-xs font-medium text-[#D600E0] uppercase tracking-wider flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5" />
                    {avatarData.status}
                  </span>
                </div>
                <div className="pt-2">
                  <a
                    href={`https://replicate.com/p/${avatarData.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-xs text-[#D600E0] hover:underline gap-1 font-mono"
                  >
                    View Replicate GPU Output stream →
                  </a>
                </div>
              </div>
            ) : (
              <div className="min-h-[120px] flex flex-col items-center justify-center text-center p-6 border border-dashed border-zinc-800/80 rounded-lg mt-2">
                <p className="text-xs text-zinc-500">
                  No prediction queued. Select an executive and dispatch the generator node.
                </p>
              </div>
            )}
          </SpatialCard>
        </div>
      </motion.div>
    </main>
  );
}