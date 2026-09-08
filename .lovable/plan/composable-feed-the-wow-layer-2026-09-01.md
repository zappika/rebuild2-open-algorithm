# Composable feed: the "wow" layer

Right now the demo proves one idea beautifully (every post explains itself) and the adjust page is a settings screen: presets, sliders, toggles.

The Bluesky insight to steal: **stop shipping one dial, ship pieces the user assembles.** The feed itself stays as it is — this is about turning the adjust page into a composable surface.

## The two moves


### 1. Two axes, not one dial
Split the adjust page into two clearly different surfaces:

- **Feeds (pull content in)** — a small marketplace of single-purpose feeds the user can add on top of the default: "Close friends", "Local news", "What's slow" (long-form only), "First-time voices", "Sports results". Each one line, one job.
- **Filters (push content out)** — subscribable single-purpose filters: "No ads", "No political content", "Hide engagement bait", "No late-night targeting", plus a personal mute. Each shows what it removed.

The current preset row becomes the **default baseline** at the top, framed as "your baseline — good on its own", with everything below presented as optional things you add. No setting looks broken or unfinished.

### 2. A visible stack you can reorder
Under the two pickers, a single "Your stack" panel lists what is active, in order: baseline → added feeds → filters → your own mutes. Each row is draggable (or has up/down), removable, and shows a one-line effect ("removes 2 posts from your current feed"). When two layers disagree, the panel says so in plain language ("You chose to show ads from brands you follow — this overrides the No ads filter").

The panel is self-explanatory on the adjust page itself: each row states what it does and roughly what it would change, without touching the live feed.

## What stays untouched
The feed page is unchanged: no feed tabs, no live re-filtering, no change banner. Post explanations, order, saved-for-later, the "You're all caught up" ending, and the visual style all stay as they are.

## Technical notes
- Each feed/filter is a small declarative object in `src/data/stack.ts` with `id`, `name`, `oneLiner`, and a static "what it would change" line — deliberately single-purpose so they read as composable.
- All state is local to `/adjust`: session-only, no backend, no persistence, no shared store.
- `/adjust` keeps its existing signal tuners and data permissions as a third, lower section ("Fine-tuning") so nothing is lost.
- Reordering via simple up/down buttons rather than a drag library, to keep it dependency-free.

