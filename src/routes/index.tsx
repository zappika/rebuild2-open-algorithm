import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { feed } from "@/data/feed";
import { FeedPostCard } from "@/components/FeedPostCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Why Am I Seeing This? — Transparent Feed Prototype" },
      {
        name: "description",
        content:
          "A social feed prototype where every post explains the ranking decisions, signals and data behind it in plain language.",
      },
      { property: "og:title", content: "Why Am I Seeing This? — Transparent Feed Prototype" },
      {
        property: "og:description",
        content:
          "Tap any post to see the exact signals, weights and data the algorithm used to put it in your feed.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const toggleSave = (id: string) =>
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));

  return (
    <div className="relative min-h-screen bg-ink font-body text-slate-900">
      <div className="aur-bg pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-[440px] px-4 py-4 sm:py-6">
        <header className="sticky top-0 z-10 mb-4 flex items-center justify-between px-1 py-2">
          <div className="flex items-center gap-2.5">
            <span className="size-8 rounded-full bg-gradient-to-br from-aur1 via-aur2 to-aur3 shadow-sm" />
            <span className="font-display text-lg font-semibold tracking-tight text-slate-900">
              Open
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div
              title="Saved for later — come back when you have time"
              className={`flex h-9 items-center gap-1.5 rounded-full bg-white/60 px-3 text-slate-700 ring-1 ring-ink/10 backdrop-blur-sm transition-opacity ${
                savedIds.length > 0 ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-aur1">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              <span className="text-xs font-semibold">{savedIds.length}</span>
            </div>
            <button
              aria-label="Messages"
              className="flex size-9 items-center justify-center rounded-full bg-white/60 text-slate-700 ring-1 ring-ink/10 backdrop-blur-sm transition-colors hover:bg-white/80"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </button>
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=faces"
              alt="Your profile"
              className="size-9 rounded-full object-cover ring-1 ring-ink/10"
            />
          </div>
        </header>

        <div className="space-y-4">
          {feed.map((post) => (
            <FeedPostCard
              key={post.id}
              post={post}
              saved={savedIds.includes(post.id)}
              onToggleSave={() => toggleSave(post.id)}
            />
          ))}
        </div>

        <div className="glass mt-6 overflow-hidden rounded-[18px] p-6 text-center ring-1 ring-ink/10">
          <span className="mx-auto block size-8 rounded-full bg-gradient-to-br from-aur1 via-aur2 to-aur3 opacity-70" />
          <p className="mt-3 font-display text-lg font-semibold tracking-tight text-slate-900">
            You're all caught up
          </p>
          <p className="mx-auto mt-1 max-w-[280px] text-pretty text-sm text-slate-700">
            That's everything from the people you follow since your last visit.
          </p>
          {savedIds.length > 0 && (
            <p className="mt-2 text-xs font-medium text-aur1">
              You saved {savedIds.length} {savedIds.length === 1 ? "post" : "posts"} for later.
            </p>
          )}
          <p className="mt-3 text-xs text-faint">
            Nothing new to scroll for — a good place to stop.
          </p>
          <p className="mt-4 text-[11px] text-faint">
            Prototype · explanations are illustrative, not real ranking data.
          </p>
        </div>
      </div>
    </div>
  );
}
