# Align the feed with the two light-pattern directions

The uploaded direction cards identify two light patterns we are already close to:

1. **LegibleCuration** — a "why am I seeing this?" explanation on every surfaced post.
2. **Muted metrics** — like and follower counts hidden by default.

The prototype already implements (1) well: every card has an expandable explanation with signals, data used, not used, and economics. It does not yet implement (2): every post still shows a heart count and comment count, and some meta lines include follower counts.

## What we will change

- Remove public like counts from the feed cards entirely.
- Remove comment counts from the like/action row as well, so the card no longer displays any engagement score.
- Remove follower counts from account meta lines (e.g. "1.2M followers").
- Keep the action buttons (heart, comment, share icons) if present, but without numeric counts.
- Audit explanation copy so ranking signals no longer lean on public like counts as a justification; replace them with dwell time, saves, shares, follow graph, and other non-public-metric signals where needed.
- Preserve the "Why am I seeing this?" button and the expanded explanation panels.

## Out of scope for this plan

- Adding a toggle to reveal metrics (the direction says "hidden by default", so default-hidden is enough for the prototype).
- Changing the gradient/glass visual style or the light mode.
- New posts or new explanation categories.

## Files to edit

- `src/components/FeedPostCard.tsx` — remove the likes/comments display block.
- `src/data/feed.ts` — remove `likes` and `comments` fields from posts; update meta lines that include follower counts; adjust explanation signals that cite like counts.
