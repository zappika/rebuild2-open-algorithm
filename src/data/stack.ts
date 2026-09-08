export type StackPiece = {
  id: string;
  name: string;
  author: string;
  oneLiner: string;
  effect: string;
};

/** Positive axis — feeds pull content in. Each does exactly one job. */
export const availableFeeds: StackPiece[] = [
  {
    id: "close-friends",
    name: "Close friends",
    author: "by Open",
    oneLiner: "Only the twenty or so people you actually talk to.",
    effect: "Would surface 3 more posts from people you message weekly.",
  },
  {
    id: "local-news",
    name: "Local news",
    author: "by City Desk Collective",
    oneLiner: "Reporting from publishers based in your city.",
    effect: "Would add roughly 2 local stories a day.",
  },
  {
    id: "whats-slow",
    name: "What's slow",
    author: "by longform.club",
    oneLiner: "Long reads and posts older than 24 hours only.",
    effect: "Would drop fast-moving posts and add 1–2 long reads.",
  },
  {
    id: "first-voices",
    name: "First-time voices",
    author: "by newvoices.dev",
    oneLiner: "Accounts posting publicly for the first time this month.",
    effect: "Would introduce 1–2 accounts you don't follow.",
  },
  {
    id: "sports-results",
    name: "Sports results",
    author: "by matchday",
    oneLiner: "Final scores for the teams you follow. Nothing else.",
    effect: "Would keep results and remove sports commentary.",
  },
];

/** Negative axis — filters push content out. Subscribable, single-purpose. */
export const availableFilters: StackPiece[] = [
  {
    id: "no-ads",
    name: "No ads",
    author: "by Open",
    oneLiner: "Hides every paid placement.",
    effect: "Would hide 3 posts in your current feed.",
  },
  {
    id: "no-political",
    name: "No political content",
    author: "by civicfilter.org",
    oneLiner: "Hides campaigning and election messaging.",
    effect: "Would hide 1 post — including publicly funded ones.",
  },
  {
    id: "no-bait",
    name: "Hide engagement bait",
    author: "by baitwatch",
    oneLiner: "Labels posts written to provoke replies.",
    effect: "Would label 2 posts and collapse them behind a tap.",
  },
  {
    id: "no-latenight",
    name: "No late-night targeting",
    author: "by sleepwell labs",
    oneLiner: "Blocks ads that use your night-time activity.",
    effect: "Would hide 1 post targeting you after midnight.",
  },
  {
    id: "my-mutes",
    name: "My mute list",
    author: "yours, private",
    oneLiner: "Words and accounts only you can see.",
    effect: "Currently empty — nothing muted yet.",
  },
];

export const conflictNote =
  "You chose to keep ads from brands you follow — that overrides No ads for those posts.";
