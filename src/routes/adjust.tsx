import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  availableFeeds,
  availableFilters,
  conflictNote,
  type StackPiece,
} from "@/data/stack";

type Focus = "signals" | "data" | undefined;

export const Route = createFileRoute("/adjust")({
  validateSearch: (search: Record<string, unknown>): { focus?: Focus } => ({
    focus:
      search["focus"] === "signals" || search["focus"] === "data"
        ? (search["focus"] as Focus)
        : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Adjust what you see — Open" },
      {
        name: "description",
        content:
          "Tune the signals behind your feed, pick a ranking preset, and decide which data the algorithm may use.",
      },
      { property: "og:title", content: "Adjust what you see — Open" },
      {
        property: "og:description",
        content:
          "Three layers of control over your feed: presets, signal tuning, and data permissions.",
      },
    ],
  }),
  component: AdjustPage,
});

const presets = [
  {
    id: "balanced",
    name: "Balanced",
    desc: "A mix of friends, interests, and discovery. The default.",
  },
  {
    id: "friends",
    name: "Friends first",
    desc: "Mostly people you follow. Little discovery, fewer ads.",
  },
  {
    id: "chrono",
    name: "Chronological",
    desc: "No ranking. Newest first, no suggested content.",
  },
];

const signals = [
  { id: "close", name: "Close friends & family", desc: "Posts from people you interact with most." },
  { id: "life", name: "Life events", desc: "Weddings, moves, new jobs — boosted so you don't miss them." },
  { id: "topics", name: "Topics you follow", desc: "Interests inferred from what you like and save." },
  { id: "discovery", name: "Discovery", desc: "New accounts and voices you don't follow yet." },
  { id: "ads", name: "Ads", desc: "How often paid placements appear in your feed." },
  { id: "news", name: "News", desc: "Articles and current events from publishers." },
  { id: "sports", name: "Sports", desc: "Scores, results, and event coverage." },
] as const;

type SignalLevel = "less" | "normal" | "more";
const levels: { id: SignalLevel; label: string }[] = [
  { id: "less", label: "Less" },
  { id: "normal", label: "Normal" },
  { id: "more", label: "More" },
];

const dataPermissions = [
  {
    id: "latenight",
    name: "Late-night activity",
    desc: "When you open the app at night.",
    onNote: "Used for sleep- and routine-related recommendations.",
    offNote: "Sleep-related ads may become less relevant to you.",
    defaultOn: true,
  },
  {
    id: "offapp",
    name: "Off-app browsing",
    desc: "What partner sites and pixels report about you.",
    onNote: "Used to match ads to things you've looked at elsewhere.",
    offNote: "Ads will rely only on what you do inside this app.",
    defaultOn: true,
  },
  {
    id: "location",
    name: "Precise location",
    desc: "Your exact position, not just your city.",
    onNote: "Used for local events and nearby suggestions.",
    offNote: "Only your rough city-level location is used.",
    defaultOn: false,
  },
  {
    id: "engagement",
    name: "Engagement history",
    desc: "Everything you've liked, saved, and dwelled on.",
    onNote: "The main ingredient in ranking your feed.",
    offNote: "Ranking falls back to recency and who you follow.",
    defaultOn: true,
  },
];

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="px-1">
      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-aur2">{kicker}</p>
      <h2 className="mt-1 font-display text-lg font-semibold tracking-tight text-slate-900">
        {title}
      </h2>
    </div>
  );
}

type StackEntry = { id: string; kind: "feed" | "filter" };

function PieceRow({
  piece,
  added,
  onToggle,
  kind,
}: {
  piece: StackPiece;
  added: boolean;
  onToggle: () => void;
  kind: "feed" | "filter";
}) {
  return (
    <div className="flex items-start gap-3 p-4">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-900">
          {piece.name} <span className="font-normal text-faint">{piece.author}</span>
        </p>
        <p className="mt-0.5 text-xs leading-relaxed text-slate-700">{piece.oneLiner}</p>
        <p className="mt-1 text-[11px] leading-relaxed text-faint">{piece.effect}</p>
      </div>
      <button
        onClick={onToggle}
        aria-pressed={added}
        className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
          added
            ? "bg-aur1/10 text-aur1 ring-1 ring-aur1/30"
            : "bg-white/70 text-slate-700 ring-1 ring-ink/10 hover:ring-aur1/40"
        }`}
      >
        {added ? "Added" : kind === "feed" ? "Add feed" : "Add filter"}
      </button>
    </div>
  );
}

function AdjustPage() {
  const { focus } = Route.useSearch();
  const [preset, setPreset] = useState("balanced");
  const [stack, setStack] = useState<StackEntry[]>([]);
  const [levels_, setLevels] = useState<Record<string, SignalLevel>>({});
  const [perms, setPerms] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(dataPermissions.map((p) => [p.id, p.defaultOn])),
  );
  const [saved, setSaved] = useState(false);
  const savedTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const signalsRef = useRef<HTMLElement>(null);
  const dataRef = useRef<HTMLElement>(null);

  const flashSaved = () => {
    setSaved(true);
    clearTimeout(savedTimer.current);
    savedTimer.current = setTimeout(() => setSaved(false), 1600);
  };

  useEffect(() => {
    if (!focus) return;
    const el = focus === "data" ? dataRef.current : signalsRef.current;
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [focus]);

  const focusRing = (id: "signals" | "data") =>
    focus === id ? "ring-aur1/40 shadow-[0_0_0_4px] shadow-aur1/10" : "ring-ink/10";

  const inStack = (id: string) => stack.some((s) => s.id === id);
  const togglePiece = (id: string, kind: "feed" | "filter") => {
    setStack((prev) =>
      prev.some((s) => s.id === id) ? prev.filter((s) => s.id !== id) : [...prev, { id, kind }],
    );
    flashSaved();
  };
  const move = (index: number, dir: -1 | 1) => {
    setStack((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      const a = next[index]!;
      next[index] = next[target]!;
      next[target] = a;
      return next;
    });
    flashSaved();
  };

  const pieceById = (id: string) =>
    [...availableFeeds, ...availableFilters].find((p) => p.id === id)!;
  const presetName = presets.find((p) => p.id === preset)?.name ?? "Balanced";

  return (
    <div className="relative min-h-screen bg-ink font-body text-slate-900">
      <div className="aur-bg pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-[440px] px-4 py-4 sm:py-6">
        <header className="sticky top-0 z-10 mb-4 flex items-center justify-between px-1 py-2">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm font-medium text-slate-700 transition-colors hover:text-aur1"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            Back to feed
          </Link>
          <span
            className={`rounded-full bg-white/60 px-3 py-1 text-xs font-semibold text-aur1 ring-1 ring-ink/10 backdrop-blur-sm transition-opacity ${
              saved ? "opacity-100" : "opacity-0"
            }`}
            aria-live="polite"
          >
            Saved
          </span>
        </header>

        <div className="mb-6 px-1">
          <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-900">
            Adjust what you see
          </h1>
          <p className="mt-1 text-pretty text-sm text-slate-700">
            Your feed is built from pieces. Start from a baseline, then add feeds that pull content
            in and filters that push content out.
          </p>
        </div>

        <div className="space-y-8">
          {/* Baseline */}
          <section>
            <SectionTitle kicker="Baseline" title="Good on its own" />
            <p className="mt-1 px-1 text-xs text-faint">
              Nothing below is required. This works as-is.
            </p>
            <div className="mt-3 space-y-2.5">
              {presets.map((p) => {
                const active = preset === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setPreset(p.id);
                      flashSaved();
                    }}
                    aria-pressed={active}
                    className={`glass flex w-full items-center gap-3 rounded-[18px] p-4 text-left ring-1 transition-all ${
                      active ? "ring-aur1/50 bg-aur1/5" : "ring-ink/10 hover:ring-aur1/30"
                    }`}
                  >
                    <span
                      className={`flex size-5 shrink-0 items-center justify-center rounded-full ring-1 transition-colors ${
                        active ? "ring-aur1 bg-aur1" : "ring-ink/20 bg-white/70"
                      }`}
                    >
                      {active && <span className="size-2 rounded-full bg-white" />}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-slate-900">{p.name}</span>
                      <span className="mt-0.5 block text-xs text-faint">{p.desc}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Positive axis */}
          <section>
            <SectionTitle kicker="Pull content in" title="Add a feed" />
            <p className="mt-1 px-1 text-xs text-faint">
              Each feed does one job. Subscribe to as many as you like.
            </p>
            <div className="glass mt-3 divide-y divide-ink/5 rounded-[18px] ring-1 ring-ink/10">
              {availableFeeds.map((f) => (
                <PieceRow
                  key={f.id}
                  piece={f}
                  kind="feed"
                  added={inStack(f.id)}
                  onToggle={() => togglePiece(f.id, "feed")}
                />
              ))}
            </div>
          </section>

          {/* Negative axis */}
          <section>
            <SectionTitle kicker="Push content out" title="Add a filter" />
            <p className="mt-1 px-1 text-xs text-faint">
              Filters are separate services. They hide or label — they never rank.
            </p>
            <div className="glass mt-3 divide-y divide-ink/5 rounded-[18px] ring-1 ring-ink/10">
              {availableFilters.map((f) => (
                <PieceRow
                  key={f.id}
                  piece={f}
                  kind="filter"
                  added={inStack(f.id)}
                  onToggle={() => togglePiece(f.id, "filter")}
                />
              ))}
            </div>
          </section>

          {/* The stack */}
          <section>
            <SectionTitle kicker="Your stack" title="How it all layers" />
            <p className="mt-1 px-1 text-xs text-faint">
              Content passes through these in order. Reorder to change who wins.
            </p>
            <div className="glass mt-3 divide-y divide-ink/5 rounded-[18px] ring-1 ring-ink/10">
              <div className="flex items-center gap-3 p-4">
                <span className="size-2 shrink-0 rounded-full bg-gradient-to-br from-aur1 to-aur3" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-900">{presetName} baseline</p>
                  <p className="mt-0.5 text-[11px] text-faint">Always first. Can't be removed.</p>
                </div>
              </div>

              {stack.length === 0 && (
                <p className="p-4 text-xs leading-relaxed text-faint">
                  Nothing stacked yet. Your feed is running on the baseline alone — which is fine.
                </p>
              )}

              {stack.map((entry, i) => {
                const piece = pieceById(entry.id);
                return (
                  <div key={entry.id} className="flex items-start gap-3 p-4">
                    <span
                      className={`mt-1.5 size-2 shrink-0 rounded-full ${
                        entry.kind === "feed" ? "bg-aur2" : "bg-slate-400"
                      }`}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-900">
                        {piece.name}{" "}
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-faint">
                          {entry.kind}
                        </span>
                      </p>
                      <p className="mt-0.5 text-[11px] leading-relaxed text-faint">{piece.effect}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      <button
                        aria-label={`Move ${piece.name} up`}
                        disabled={i === 0}
                        onClick={() => move(i, -1)}
                        className="flex size-7 items-center justify-center rounded-full bg-white/70 text-slate-700 ring-1 ring-ink/10 transition-colors hover:text-aur1 disabled:opacity-30"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 15l-6-6-6 6" />
                        </svg>
                      </button>
                      <button
                        aria-label={`Move ${piece.name} down`}
                        disabled={i === stack.length - 1}
                        onClick={() => move(i, 1)}
                        className="flex size-7 items-center justify-center rounded-full bg-white/70 text-slate-700 ring-1 ring-ink/10 transition-colors hover:text-aur1 disabled:opacity-30"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>
                      <button
                        aria-label={`Remove ${piece.name}`}
                        onClick={() => togglePiece(entry.id, entry.kind)}
                        className="flex size-7 items-center justify-center rounded-full bg-white/70 text-slate-700 ring-1 ring-ink/10 transition-colors hover:text-aur3"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            {inStack("no-ads") && (
              <p className="mt-2 rounded-[14px] bg-aur3/10 px-3 py-2 text-[11px] leading-relaxed text-aur3">
                Layers disagree: {conflictNote}
              </p>
            )}
          </section>

          {/* Fine-tuning */}
          <section ref={signalsRef} className="scroll-mt-20">
            <SectionTitle kicker="Fine-tuning" title="Tune the signals" />
            <div className={`glass mt-3 divide-y divide-ink/5 rounded-[18px] ring-1 transition-shadow ${focusRing("signals")}`}>
              {signals.map((s) => {
                const level = levels_[s.id] ?? "normal";
                return (
                  <div key={s.id} className="p-4">
                    <p className="text-sm font-semibold text-slate-900">{s.name}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-faint">{s.desc}</p>
                    <div
                      role="group"
                      aria-label={`${s.name} level`}
                      className="mt-3 flex rounded-full bg-slate-900/5 p-1"
                    >
                      {levels.map((l) => {
                        const active = level === l.id;
                        return (
                          <button
                            key={l.id}
                            onClick={() => {
                              setLevels((prev) => ({ ...prev, [s.id]: l.id }));
                              flashSaved();
                            }}
                            aria-pressed={active}
                            className={`flex-1 rounded-full py-1.5 text-xs font-semibold transition-all ${
                              active
                                ? "bg-white text-aur1 shadow-sm ring-1 ring-aur1/30"
                                : "text-mist hover:text-slate-700"
                            }`}
                          >
                            {l.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section ref={dataRef} className="scroll-mt-20">
            <SectionTitle kicker="Fine-tuning" title="Data the algorithm may use" />
            <div className={`glass mt-3 divide-y divide-ink/5 rounded-[18px] ring-1 transition-shadow ${focusRing("data")}`}>
              {dataPermissions.map((d) => {
                const on = perms[d.id];
                return (
                  <div key={d.id} className="p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900">{d.name}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-faint">{d.desc}</p>
                      </div>
                      <button
                        role="switch"
                        aria-checked={on}
                        aria-label={d.name}
                        onClick={() => {
                          setPerms((prev) => ({ ...prev, [d.id]: !prev[d.id] }));
                          flashSaved();
                        }}
                        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
                          on ? "bg-aur1" : "bg-slate-900/15"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 size-6 rounded-full bg-white shadow-sm transition-all ${
                            on ? "left-[22px]" : "left-0.5"
                          }`}
                        />
                      </button>
                    </div>
                    <p className={`mt-2 text-[11px] leading-relaxed ${on ? "text-faint" : "text-aur3"}`}>
                      {on ? d.onNote : d.offNote}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          <p className="pb-6 text-center text-[11px] text-faint">
            Prototype · changes are illustrative and reset when you leave.
          </p>
        </div>
      </div>
    </div>
  );
}

