"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  Zap,
  BookOpen,
  Compass,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Quote,
  Flame,
  Brain,
} from "lucide-react";
import { Button } from "@heroui/react";
import { fetchBookInsights } from "@/lib/api/ai";

export default function AIInsightsCard({ book }) {
  const [insights, setInsights] = useState(null);
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleGenerate = async () => {
    if (insights) {
      setIsExpanded((prev) => !prev);
      return;
    }

    setLoading(true);
    setError(null);
    setIsExpanded(true);

    try {
      const res = await fetchBookInsights({
        title: book?.title,
        author: book?.author,
        category: book?.category,
        description: book?.description,
      });

      if (res?.success && res?.insights) {
        setInsights(res.insights);
        setProvider(res.provider || "BiblioAI Engine");
      } else {
        throw new Error("Could not parse AI insights");
      }
    } catch (err) {
      console.error("AI Insights Error:", err);
      setError(err.message || "Failed to analyze book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full pt-4">
      {/* Trigger Button with Glowing Gradient Accent */}
      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
        <button
          type="button"
          onClick={handleGenerate}
          className="w-full relative overflow-hidden group rounded-2xl p-[1.5px] focus:outline-none cursor-pointer transition-shadow hover:shadow-lg hover:shadow-primary/20"
        >
          {/* Animated gradient border */}
          <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary animate-gradient-x opacity-80 group-hover:opacity-100 transition-opacity" />

          {/* Button Body */}
          <div className="relative flex items-center justify-between px-5 py-3.5 rounded-[15px] bg-card/95 dark:bg-card-soft/95 backdrop-blur-md transition-colors group-hover:bg-card/90">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                <Sparkles size={18} className="animate-pulse" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold font-poppins text-foreground tracking-tight">
                    Should I Read This?
                  </span>
                  <span className="text-[10px] uppercase font-black tracking-widest px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/20">
                    AI Insights
                  </span>
                </div>
                <p className="text-xs text-muted-foreground font-medium">
                  {insights
                    ? "Instant spoiler-free themes, audience fit & reading pace"
                    : "Tap for instant spoiler-free summary, audience fit & vibe analysis"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
              {loading ? (
                <RefreshCw size={16} className="animate-spin text-primary" />
              ) : isExpanded ? (
                <ChevronUp size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
              ) : (
                <ChevronDown size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
              )}
            </div>
          </div>
        </button>
      </motion.div>

      {/* Expandable Insights Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-4 p-6 sm:p-7 rounded-[28px] border border-border/70 bg-card/60 dark:bg-card-soft/60 backdrop-blur-xl shadow-xl space-y-6">
              {/* Header Status / Provider Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-border/40">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-muted-foreground">
                  <Brain size={16} className="text-primary" />
                  <span>BiblioAI Reader Intelligence</span>
                </div>
                {provider && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-bold text-primary font-poppins">
                    <Zap size={12} fill="currentColor" />
                    Powered by {provider}
                  </span>
                )}
              </div>

              {/* Loading Skeleton State */}
              {loading && (
                <div className="py-8 space-y-5">
                  <div className="flex items-center justify-center gap-3 text-sm font-bold text-muted-foreground animate-pulse">
                    <Sparkles size={18} className="text-primary animate-spin" />
                    <span>Analyzing narrative themes, audience fit & reading difficulty...</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="h-28 rounded-2xl bg-card-soft/40 animate-pulse border border-border/30" />
                    <div className="h-28 rounded-2xl bg-card-soft/40 animate-pulse border border-border/30" />
                  </div>
                  <div className="h-20 rounded-2xl bg-card-soft/40 animate-pulse border border-border/30" />
                </div>
              )}

              {/* Error State */}
              {!loading && error && (
                <div className="p-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <AlertCircle size={20} className="shrink-0" />
                    <span className="text-sm font-bold">{error}</span>
                  </div>
                  <Button
                    size="sm"
                    onClick={handleGenerate}
                    className="bg-red-500/20 text-red-500 border border-red-500/30 rounded-lg text-xs font-bold"
                  >
                    Retry
                  </Button>
                </div>
              )}

              {/* Insights Results */}
              {!loading && insights && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* 1. In 3 Bullets (Spoiler-Free Takeaways) */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <BookOpen size={14} className="text-primary" />
                      In 3 Bullets (Spoiler-Free Key Themes)
                    </h4>
                    <div className="space-y-2.5">
                      {insights?.bullets?.map((bullet, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.08 }}
                          className="flex items-start gap-3 p-3.5 rounded-2xl bg-card-soft/50 border border-border/40 hover:border-border/70 transition-colors"
                        >
                          <div className="w-5 h-5 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-[10px] font-black">{idx + 1}</span>
                          </div>
                          <p className="text-sm text-foreground/90 font-medium leading-relaxed font-urbanist">
                            {bullet}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* 2. Target Audience (Perfect For vs Skip If) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Perfect For */}
                    <div className="p-4 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/25 space-y-2">
                      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-black text-xs uppercase tracking-wider font-poppins">
                        <CheckCircle2 size={16} />
                        <span>Perfect For You If</span>
                      </div>
                      <p className="text-xs sm:text-sm text-foreground/85 font-medium leading-relaxed">
                        {insights?.targetAudience?.perfectFor || "Readers who appreciate compelling storytelling."}
                      </p>
                    </div>

                    {/* Skip If */}
                    <div className="p-4 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/25 space-y-2">
                      <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-black text-xs uppercase tracking-wider font-poppins">
                        <AlertCircle size={16} />
                        <span>Skip Or Choose Another If</span>
                      </div>
                      <p className="text-xs sm:text-sm text-foreground/85 font-medium leading-relaxed">
                        {insights?.targetAudience?.skipIf || "You are in search of a starkly contrasting genre."}
                      </p>
                    </div>
                  </div>

                  {/* 3. Reading Vibe & Pace Metrics */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <Compass size={14} className="text-primary" />
                      Reading Vibe & Pace
                    </h4>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {/* Pace */}
                      <div className="p-3.5 rounded-2xl bg-card-soft/40 border border-border/40 text-center space-y-1">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                          Pace
                        </span>
                        <span className="text-xs sm:text-sm font-extrabold font-poppins text-foreground block">
                          {insights?.readingVibe?.pace || "Moderate"}
                        </span>
                      </div>

                      {/* Difficulty */}
                      <div className="p-3.5 rounded-2xl bg-card-soft/40 border border-border/40 text-center space-y-1">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                          Complexity
                        </span>
                        <span className="text-xs sm:text-sm font-extrabold font-poppins text-foreground block">
                          {insights?.readingVibe?.difficulty || "Accessible"}
                        </span>
                      </div>

                      {/* Estimated Days */}
                      <div className="p-3.5 rounded-2xl bg-card-soft/40 border border-border/40 text-center space-y-1">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                          Est. Reading Time
                        </span>
                        <span className="text-xs sm:text-sm font-extrabold font-poppins text-foreground block">
                          {insights?.readingVibe?.estimatedDays || "3-5 days"}
                        </span>
                      </div>

                      {/* Tone */}
                      <div className="p-3.5 rounded-2xl bg-card-soft/40 border border-border/40 text-center space-y-1">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                          Tone
                        </span>
                        <span className="text-xs sm:text-sm font-extrabold font-poppins text-foreground block truncate">
                          {insights?.readingVibe?.tone || "Engaging"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 4. Bottom Line Verdict Callout */}
                  {insights?.verdict && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/5 border border-primary/25 relative overflow-hidden">
                      <div className="flex items-start gap-3">
                        <Quote size={20} className="text-primary shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-primary block mb-1">
                            The Bottom Line
                          </span>
                          <p className="text-sm font-bold font-urbanist text-foreground leading-relaxed italic">
                            &ldquo;{insights.verdict}&rdquo;
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Refresh Footer */}
                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={handleGenerate}
                      className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <RefreshCw size={12} />
                      Re-analyze with AI
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
