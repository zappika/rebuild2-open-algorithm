import { useState } from "react";
import { Link } from "@tanstack/react-router";
import type { Accent, FeedPost } from "@/data/feed";

const accentText: Record<Accent, string> = {
  aur1: "text-aur1",
  aur2: "text-aur2",
  aur3: "text-aur3",
};

const accentRing: Record<Accent, string> = {
  aur1: "ring-aur1/30 bg-aur1/5 hover:bg-aur1/10",
  aur2: "ring-aur2/30 bg-aur2/5 hover:bg-aur2/10",
  aur3: "ring-aur3/30 bg-aur3/5 hover:bg-aur3/10",
};

const accentDot: Record<Accent, string> = {
  aur1: "bg-aur1",
  aur2: "bg-aur2",
  aur3: "bg-aur3",
};

const accentPanelRing: Record<Accent, string> = {
  aur1: "ring-aur1/15",
  aur2: "ring-aur2/15",
  aur3: "ring-aur3/15",
};

const barFills = [
  "bg-gradient-to-r from-aur1 to-aur2",
  "bg-gradient-to-r from-aur2 to-aur3",
  "bg-aur3",
  "bg-aur1",
];

export function FeedPostCard({
  post,
  saved,
  onToggleSave,
}: {
  post: FeedPost;
  saved: boolean;
  onToggleSave: () => void;
}) {
  const [open, setOpen] = useState(false);
  const { explanation: ex } = post;

  return (
    <article
      className={`glass overflow-hidden rounded-[18px] ring-1 ${
        post.kind === "ad" ? "ring-aur3/20" : "ring-ink/10"
      }`}
    >
      <div className={`flex items-center gap-3 px-4 ${post.suggestedAccount ? "py-4" : "py-3"}`}>
        <img
          src={post.avatar}
          alt=""
          loading="lazy"
          width={512}
          height={512}
          className={`${post.suggestedAccount ? "size-11" : "size-9"} shrink-0 rounded-full object-cover`}
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-900">{post.handle}</p>
          <p
            className={`truncate text-xs ${
              post.kind === "ad" ? "text-aur3" : post.suggestedAccount ? "text-mist" : "text-faint"
            }`}
          >
            {post.meta}
          </p>
        </div>
        {post.suggestedAccount ? (
          <button className="rounded-full bg-aur1 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-aur1/90">
            Follow
          </button>
        ) : (
          <span className="text-xs tracking-widest text-faint">···</span>
        )}
      </div>

      {post.image && (
        <img
          src={post.image}
          alt={`${post.handle} post`}
          loading="lazy"
          width={1024}
          height={1024}
          className="aspect-square w-full object-cover"
        />
      )}

      <div className={`px-4 ${post.suggestedAccount ? "pb-4" : "py-3"}`}>
        {post.caption && (
          <p className="mt-2 text-pretty text-sm text-slate-700">
            <span className="font-semibold text-slate-900">{post.handle}</span> {post.caption}
          </p>
        )}

        <div className="mt-3 flex items-center gap-4">
          <button aria-label="Like" className="text-slate-700 transition-colors hover:text-aur3">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
          <button aria-label="Comment" className="text-slate-700 transition-colors hover:text-aur1">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </button>
          <button aria-label="Share" className="text-slate-700 transition-colors hover:text-aur2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13" />
              <path d="M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
          <button
            aria-label={saved ? "Remove from saved" : "Save for later"}
            aria-pressed={saved}
            onClick={onToggleSave}
            className={`ml-auto flex items-center gap-1.5 transition-colors ${
              saved ? "text-aur1" : "text-slate-700 hover:text-aur1"
            }`}
          >
            {saved && <span className="text-xs font-medium">Saved for later</span>}
            <svg width="22" height="22" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className={`mt-3 flex w-full items-center gap-2 rounded-xl px-3.5 py-2.5 text-left ring-1 transition-colors ${
            open ? accentRing[post.accent] : "ring-ink/10 hover:ring-aur1/50"
          }`}
        >
          <span
            className={`size-1.5 shrink-0 rounded-full ${open ? accentDot[post.accent] : "bg-mist"}`}
          />
          <span
            className={`text-sm font-medium ${open ? accentText[post.accent] : "text-slate-700"}`}
          >
            {post.buttonLabel}
          </span>
          <span className={`ml-auto text-xs font-semibold ${open ? accentText[post.accent] : "text-faint"}`}>
            {open ? "Hide" : "Show"}
          </span>
        </button>

        {open && (
          <div className={`mt-3 rounded-xl bg-white/70 p-4 ring-1 ${accentPanelRing[post.accent]}`}>
            <p className={`text-[11px] font-semibold uppercase tracking-[0.15em] ${accentText[post.accent]}`}>
              How this was chosen
            </p>
            <p className="reveal-row mt-2 text-pretty text-sm text-slate-700">{ex.summary}</p>

            <div className="mt-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-mist">
                {ex.signalsHeading}
              </p>
              <div className="mt-3 space-y-3">
                {ex.signals.map((s, i) => (
                  <div
                    key={s.label}
                    className="reveal-row"
                    style={{ animationDelay: `${0.05 + i * 0.08}s` }}
                  >
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-700">{s.label}</span>
                      <span className="text-mist">{s.weight}%</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-slate-900/5">
                      <div
                        className={`h-full rounded-full ${barFills[i % barFills.length]}`}
                        style={{ width: `${s.weight}%` }}
                      />
                    </div>
                    <p className="mt-1 text-[11px] leading-relaxed text-faint">{s.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-mist">Data used</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {ex.dataUsed.map((d) => (
                  <span
                    key={d}
                    className="rounded-full bg-slate-900/5 px-2.5 py-1 text-[11px] text-slate-700"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-mist">Not used</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {ex.notUsed.map((d) => (
                  <span
                    key={d}
                    className="rounded-full px-2.5 py-1 text-[11px] text-faint ring-1 ring-ink/10 line-through"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {post.economics && (
              <div className="mt-4 rounded-lg bg-aur3/5 p-3 ring-1 ring-aur3/15">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-aur3">
                  The money behind this
                </p>
                <div className="mt-2 flex items-baseline justify-between gap-3">
                  <span className="text-xs text-slate-700">Estimated cost to reach you</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {post.economics.costToReach}
                  </span>
                </div>
                <p className="mt-1 text-[11px] leading-relaxed text-faint">
                  {post.economics.auctionNote}
                </p>
              </div>
            )}

            <Link
              to="/adjust"
              search={{ focus: post.kind === "ad" ? "data" : "signals" }}
              className="mt-4 inline-block text-sm font-medium text-aur2 transition-colors hover:text-aur1"
            >
              Adjust what you see →
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
