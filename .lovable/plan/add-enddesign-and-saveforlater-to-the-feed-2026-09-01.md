# Add EndDesign and SaveForLater to the feed

LegibleCuration stays the core of the prototype. We will add two more Finitude principles from the direction card:

1. **SaveForLater** — decouple capture from consumption: a save action on every post.
2. **EndDesign** — a genuine ending that releases the user instead of an endless scroll.

## SaveForLater

- Add a bookmark icon button to each card's action row (next to the heart/comment icons, no counts).
- Tapping it toggles a saved state: the icon fills, and a subtle "Saved for later" toast/inline confirmation appears — with no pressure to read it now.
- The header gets a small saved indicator (e.g. a bookmark chip with a count) so saved items feel captured, not lost. Tapping it can be non-functional or show a minimal "Saved — come back when you have time" note; a full saved-posts view is out of scope.
- Saved state lives in React state for the session (prototype, no backend).

## EndDesign

- After the last post, replace the current small "Prototype · explanations are illustrative" footer with a proper end-of-feed moment:
  - A calm card: "You're all caught up." with a line like "That's everything from the people you follow since your last visit."
  - Optionally a gentle release cue: "Nothing new to scroll for — a good place to stop." plus the session's saved count ("You saved 2 posts for later").
  - Keep the aurora gradient style; this should feel like a designed ending, not an error or empty state.

## Out of scope

- DifferentiatedTime, ConstraintTime Locking, and the other principles.
- A real saved-posts page, persistence, or any backend.
- Changes to the explanations, ordering, or visual style.

## Files to edit

- `src/components/FeedPostCard.tsx` — save button + saved state on the action row.
- `src/routes/index.tsx` — saved indicator in the header, end-of-feed card replacing the footer note, shared saved-state (lift state up or a tiny context).
- `src/data/feed.ts` — no changes expected.
