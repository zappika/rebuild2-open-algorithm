# "Adjust what you see" page

A new page, reachable only from the "Adjust what you see →" link inside each post's explanation panel. It gives users three layers of control over their feed, inspired by Bluesky's algorithmic-agency work (feed presets, more/less feedback, granular preferences) but going one step further by tying controls directly to the signals shown in the explanations.

## What gets built

**New route `/adjust`** (`src/routes/adjust.tsx`), same light aurora/glass aesthetic as the feed, max-width column layout like the feed page. Head metadata: "Adjust what you see — Open".

### Layer 1 — Feed presets (top)
Three selectable preset cards (radio-style, one active):
- **Balanced** (default) — a mix of friends, interests, and discovery.
- **Friends first** — mostly people you follow, little discovery, fewer ads.
- **Chronological** — no ranking, newest first, no suggested content.
Each preset card explains in one line what changes. Selecting one marks it active with aurora accent styling.

### Layer 2 — Signal tuning (middle)
The same signals used across the feed explanations, presented as simple controls — not a cockpit. One row per signal with a three-state control: **Less / Normal / More** (segmented pill, Bluesky "show more/less" energy). Signals: Close friends & family, Life events, Topics you follow, Discovery (new accounts), Ads, News, Sports. Each row carries a one-line plain-language description, matching the tone of the explanations.

### Layer 3 — Data permissions (bottom)
Toggle switches for *what data the algorithm may use at all* — our differentiator:
- Late-night activity (on by default — the driftlab ad signal)
- Off-app browsing via partner pixels
- Precise location
- Engagement history
Turning one off shows a short consequence note, e.g. "Sleep-related ads may become less relevant to you." This mirrors the "Data used / Not used" chips from the explanations.

### Entry & continuity
- The "Adjust what you see →" button in `FeedPostCard` becomes a `Link` to `/adjust`, carrying a `?focus=` search param with the post's accent/signal category; the page scrolls to and briefly highlights the matching section.
- A "Back to feed" link at the top returns to `/`.

## Behavior & state
- Prototype-grade interactivity: all controls are clickable and update local state with visible feedback (active states, a subtle "Saved" confirmation chip appearing briefly).
- State lives in the page component (session-only, no backend, no localStorage persistence) — this is a demo of the concept, not a working settings system.
- No changes to the feed itself; adjustments don't alter the demo posts.

## Technical details
- New file `src/routes/adjust.tsx` with `createFileRoute("/adjust")`, `validateSearch` for the optional `focus` param, and its own `head()`.
- `FeedPostCard.tsx`: the bottom "Adjust what you see →" button becomes a TanStack `Link` with `search` param; everything else untouched.
- Reuse existing tokens (`glass`, `aur1/2/3`, `ink`, `mist`, `faint`) — no new colors, no new fonts.
- `routeTree.gen.ts` regenerates automatically; never edit it.
- Verify with `bunx tsgo` and a Playwright pass: navigate from an expanded explanation, check scroll/highlight, toggle controls, return to feed.
