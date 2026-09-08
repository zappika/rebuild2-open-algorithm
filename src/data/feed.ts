import avatarMaya from "@/assets/avatar-maya.jpg";
import postMayaWedding from "@/assets/post-maya-wedding.jpg";
import avatarNorthbrew from "@/assets/avatar-northbrew.jpg";
import postNorthbrew from "@/assets/post-northbrew.jpg";
import avatarVela from "@/assets/avatar-vela.jpg";
import postVela from "@/assets/post-vela.jpg";
import avatarFieldnotes from "@/assets/avatar-fieldnotes.jpg";
import avatarFjell from "@/assets/avatar-fjell.jpg";
import postFjell from "@/assets/post-fjell.jpg";
import avatarVote from "@/assets/avatar-vote.jpg";
import postVote from "@/assets/post-vote.jpg";
import avatarNews from "@/assets/avatar-news.jpg";
import postNews from "@/assets/post-news.jpg";
import avatarSports from "@/assets/avatar-sports.jpg";
import postSports from "@/assets/post-sports.jpg";
import avatarVacation from "@/assets/avatar-vacation.jpg";
import postVacation from "@/assets/post-vacation.jpg";
import avatarDriftlab from "@/assets/avatar-driftlab.jpg";
import postDriftlab from "@/assets/post-driftlab.jpg";

export type Accent = "aur1" | "aur2" | "aur3";

export type Signal = {
  label: string;
  weight: number;
  detail: string;
};

export type Explanation = {
  summary: string;
  signalsHeading: string;
  signals: Signal[];
  dataUsed: string[];
  notUsed: string[];
};

export type Economics = {
  costToReach: string;
  auctionNote: string;
};

export type FeedPost = {
  id: string;
  handle: string;
  meta: string;
  kind: string;
  avatar: string;
  image?: string;
  caption?: string;
  accent: Accent;
  buttonLabel: string;
  suggestedAccount?: boolean;
  placement: "Organic" | "Paid placement" | "Publicly funded";
  economics?: Economics;
  explanation: Explanation;
};

export const feed: FeedPost[] = [
  {
    id: "vacation",
    placement: "Organic",
    handle: "leo.bennett",
    meta: "2 weeks ago",
    kind: "friend",
    avatar: avatarVacation,
    image: postVacation,
    caption: "Somehow pulled off the whole group. Greece, you were good to us.",
    accent: "aur1",
    buttonLabel: "Why am I seeing this?",
    explanation: {
      summary:
        "Leo is a close friend you message often, and you liked his last two travel posts. The feed is surfacing a recent post you hadn't seen yet.",
      signalsHeading: "Why now",
      signals: [
        {
          label: "Close friendship",
          weight: 40,
          detail: "You message weekly and are tagged together in several albums.",
        },
        {
          label: "Past travel interest",
          weight: 25,
          detail: "You liked and saved his previous Greece and Italy posts.",
        },
        {
          label: "Unseen content",
          weight: 20,
          detail: "Posted two weeks ago but you hadn't scrolled far enough to catch it.",
        },
        {
          label: "Photo engagement pattern",
          weight: 15,
          detail: "You tend to pause on group-travel photos with people you know.",
        },
      ],
      dataUsed: ["Follow graph", "Message history (counts)", "Past likes", "Dwell time"],
      notUsed: ["Advertiser targeting", "Purchase history", "Location"],
    },
  },
  {
    id: "driftlab",
    placement: "Paid placement",
    handle: "driftlab.app",
    meta: "Sponsored",
    kind: "ad",
    avatar: avatarDriftlab,
    image: postDriftlab,
    caption: "Still awake? Fall asleep in minutes with soundscapes tuned to your breathing.",
    accent: "aur3",
    buttonLabel: "Why am I seeing this ad?",
    economics: {
      costToReach: "≈ $0.07",
      auctionNote:
        "driftlab paid a premium bid for late-night slots — users reached after midnight convert 3× better.",
    },
    explanation: {
      summary:
        "driftlab paid to reach people the feed infers are sleeping badly. That inference came from your late-night scrolling and your browsing on other websites — signals you may not have realised were being collected.",
      signalsHeading: "How this ad was targeted",
      signals: [
        {
          label: "Late-night activity pattern",
          weight: 38,
          detail: "You opened the app after 2am on four of the last seven nights.",
        },
        {
          label: "Inferred 'sleep difficulty' interest",
          weight: 26,
          detail: "The feed derived this interest bucket from your activity. You never stated it.",
        },
        {
          label: "Off-app browsing signal",
          weight: 21,
          detail: "A partner pixel recorded your visits to articles about insomnia and sleep aids.",
        },
        {
          label: "Auction bid",
          weight: 15,
          detail: "driftlab outbid 4 other advertisers for this slot in your feed.",
        },
      ],
      dataUsed: [
        "App open times",
        "Inferred health-adjacent interest",
        "Off-app browsing (pixel)",
        "Ad click history",
      ],
      notUsed: ["Your messages", "Health records", "Exact GPS location"],
    },
  },
  {
    id: "maya",
    placement: "Organic",
    handle: "maya.okafor",
    meta: "12 hours ago",
    kind: "friend",
    avatar: avatarMaya,
    image: postMayaWedding,
    caption: "married my favourite person. still floating.",
    accent: "aur1",
    buttonLabel: "Why am I seeing this?",
    explanation: {
      summary:
        "You haven't messaged Maya in a while, but the feed detected a major life event — her wedding — and decided it should reach you even though your regular contact has faded.",
      signalsHeading: "Why now",
      signals: [
        {
          label: "Life-event detection",
          weight: 40,
          detail: "The post was classified as a wedding/major milestone from captions, tags and image signals.",
        },
        {
          label: "Close friendship history",
          weight: 28,
          detail: "You two exchanged 180+ messages back in 2022 and still follow each other.",
        },
        {
          label: "Re-engagement boost",
          weight: 18,
          detail: "The feed periodically re-surfaces dormant close ties around important moments.",
        },
        {
          label: "Mutual friend tag",
          weight: 14,
          detail: "She tagged @sam.ellery, someone you interact with weekly.",
        },
      ],
      dataUsed: ["Follow graph", "Past likes", "Message history (counts only)", "Life-event tags"],
      notUsed: ["Location", "Purchase history", "Advertiser lists"],
    },
  },
  {
    id: "vote",
    placement: "Publicly funded",
    handle: "elections.official",
    meta: "Sponsored · Funded by the Electoral Commission",
    kind: "ad",
    avatar: avatarVote,
    image: postVote,
    caption: "Election day is 14 October. Check your polling place, deadlines, and what to bring.",
    accent: "aur3",
    buttonLabel: "Why am I seeing this ad?",
    economics: {
      costToReach: "$0.00",
      auctionNote:
        "Publicly funded by the Electoral Commission — this message did not compete in the ad auction.",
    },
    explanation: {
      summary:
        "This message wasn't targeted at you personally. It's a government-funded turnout campaign shown to every eligible voter in the country — the same message, the same week, no profiling.",
      signalsHeading: "How this message was distributed",
      signals: [
        {
          label: "Universal reach",
          weight: 45,
          detail: "Sent to every account in the eligible-voter age band nationwide, not a selected audience.",
        },
        {
          label: "Election calendar",
          weight: 25,
          detail: "Scheduled by the Electoral Commission to run in the final two weeks before the vote.",
        },
        {
          label: "Public-interest classification",
          weight: 20,
          detail: "Government-funded civic messages bypass the ad auction and get guaranteed placement.",
        },
        {
          label: "No profile data",
          weight: 10,
          detail: "No interests, behaviour, or look-alike data were used to select you.",
        },
      ],
      dataUsed: ["Age eligibility band", "Country-level location", "Election calendar"],
      notUsed: [
        "Political affiliation",
        "Your interests",
        "Dwell time",
        "Off-app browsing",
        "Advertiser lists",
      ],
    },
  },
  {
    id: "northbrew",
    placement: "Organic",
    handle: "northbrew",
    meta: "1 day ago",
    kind: "brand",
    avatar: avatarNorthbrew,
    image: postNorthbrew,
    caption: "Cold season means a slower brew. New single-origin just landed.",
    accent: "aur1",
    buttonLabel: "Why am I seeing this?",
    explanation: {
      summary:
        "You followed Northbrew 8 months ago and you keep watching coffee-gear videos to the end. This is an organic post from an account you chose — not a paid placement.",
      signalsHeading: "Why this brand",
      signals: [
        {
          label: "You follow this account",
          weight: 40,
          detail: "Followed on 12 Jan. Roughly 1 of their posts in 4 reaches your feed.",
        },
        {
          label: "Topic match · coffee, slow living",
          weight: 25,
          detail: "You've watched 11 coffee-related posts past 80% in the last 30 days.",
        },
        {
          label: "Past likes on similar posts",
          weight: 20,
          detail: "You liked 6 brew-gear flat-lays in the last two months.",
        },
        {
          label: "Strong early engagement",
          weight: 15,
          detail: "The post outperformed their baseline in its first hour.",
        },
      ],
      dataUsed: ["Follow graph", "Watch-through rate", "Topic interests", "Past likes"],
      notUsed: ["Advertiser targeting", "Contacts", "Off-app browsing"],
    },
  },
  {
    id: "vela",
    placement: "Paid placement",
    economics: {
      costToReach: "≈ $0.03",
      auctionNote: "Vela outbid 6 other advertisers for this slot in your feed.",
    },
    handle: "vela.wellness",
    meta: "Sponsored",
    kind: "ad",
    avatar: avatarVela,
    image: postVela,
    caption: "Your wind-down routine, refined. 90-day ritual, no fillers.",
    accent: "aur3",
    buttonLabel: "Why am I seeing this ad?",
    explanation: {
      summary:
        "Vela Wellness paid to reach people like you. They uploaded an audience list and set targeting; the feed matched you on three of their criteria and won the auction slot.",
      signalsHeading: "How this ad was targeted",
      signals: [
        {
          label: "Advertiser interest targeting",
          weight: 35,
          detail: "Vela targeted 'sleep & wellness' — you're in that inferred interest bucket.",
        },
        {
          label: "Age & location band",
          weight: 25,
          detail: "Targeted 28-40, city-level location. No precise location was shared.",
        },
        {
          label: "Website visit signal",
          weight: 24,
          detail: "Their pixel recorded a visit from your browser on 14 Aug.",
        },
        {
          label: "Auction bid",
          weight: 16,
          detail: "They outbid 6 other advertisers for this slot in your feed.",
        },
      ],
      dataUsed: [
        "Inferred interests",
        "Age range",
        "City-level location",
        "Advertiser pixel visit",
        "Ad click history",
      ],
      notUsed: ["Your messages", "Your photos", "Exact GPS location"],
    },
  },
  {
    id: "fieldnotes",
    placement: "Organic",
    handle: "field.notes",
    meta: "Suggested account",
    kind: "suggested",
    avatar: avatarFieldnotes,
    accent: "aur1",
    buttonLabel: "Why is this suggested?",
    suggestedAccount: true,
    explanation: {
      summary:
        "This account is suggested because three people you follow started following it in the last two weeks, and its posts look like ones you save.",
      signalsHeading: "Why this suggestion",
      signals: [
        {
          label: "Mutual follows",
          weight: 44,
          detail: "3 accounts you follow started following field.notes recently.",
        },
        {
          label: "Saved-post similarity",
          weight: 31,
          detail: "You saved 9 landscape photography posts this year.",
        },
        {
          label: "New-account exploration",
          weight: 25,
          detail: "The feed reserves a slot for accounts you might want to follow.",
        },
      ],
      dataUsed: ["Follow graph", "Saved posts", "Topic interests"],
      notUsed: ["Advertiser targeting", "Location", "Contacts"],
    },
  },
  {
    id: "fjell",
    placement: "Organic",
    handle: "fjell.bruk",
    meta: "2 days ago",
    kind: "brand",
    avatar: avatarFjell,
    image: postFjell,
    caption: "The winter shell is back in stock. Built for Nordic conditions, not landfill.",
    accent: "aur1",
    buttonLabel: "Why am I seeing this?",
    explanation: {
      summary:
        "You follow fjell.bruk and recently watched a repair-your-gear video to the end. This organic post matches your interest in durable outdoor clothing.",
      signalsHeading: "Why this brand",
      signals: [
        {
          label: "You follow this account",
          weight: 38,
          detail: "Followed 5 months ago; you open roughly 1 in 3 of their posts.",
        },
        {
          label: "Topic match · outdoor gear",
          weight: 27,
          detail: "You watched two jacket comparison videos past 75% last week.",
        },
        {
          label: "Sustainability interest",
          weight: 20,
          detail: "You saved a post about repair services and circular design.",
        },
        {
          label: "Seasonal signal",
          weight: 15,
          detail: "Cold-weather content is trending in your region right now.",
        },
      ],
      dataUsed: ["Follow graph", "Watch-through rate", "Saved posts", "Topic interests"],
      notUsed: ["Purchase history", "Advertiser lists", "Contacts"],
    },
  },
  {
    id: "news",
    placement: "Organic",
    handle: "citywire",
    meta: "4 hours ago",
    kind: "brand",
    avatar: avatarNews,
    image: postNews,
    caption: "Cost of living rises at the slowest pace in two years. What it means for rents and groceries.",
    accent: "aur2",
    buttonLabel: "Why am I seeing this?",
    explanation: {
      summary:
        "You follow citywire and read two economics stories this week. This article is from a publisher you chose, not a paid placement.",
      signalsHeading: "Why this story",
      signals: [
        {
          label: "You follow this publisher",
          weight: 36,
          detail: "Followed since 2021; you regularly open their economy coverage.",
        },
        {
          label: "Topic match · cost of living",
          weight: 28,
          detail: "You spent 4+ minutes on housing and inflation articles yesterday.",
        },
        {
          label: "Breaking-news weight",
          weight: 20,
          detail: "Major economic indicators were released this morning.",
        },
        {
          label: "Social discussion",
          weight: 16,
          detail: "People in your network are sharing and commenting on this story.",
        },
      ],
      dataUsed: ["Follow graph", "Read time", "Topic interests", "Network activity"],
      notUsed: ["Advertiser targeting", "Purchase history", "Exact location"],
    },
  },
  {
    id: "sports",
    placement: "Organic",
    handle: "matchday",
    meta: "1 hour ago",
    kind: "influencer",
    avatar: avatarSports,
    image: postSports,
    caption: "Full time. Affton 2-1 Truscott. Late winner in the 89th minute.",
    accent: "aur2",
    buttonLabel: "Why am I seeing this?",
    explanation: {
      summary:
        "You don't follow matchday, but you watched highlights from this league last weekend and several friends reacted to this result.",
      signalsHeading: "Why this result",
      signals: [
        {
          label: "Recent sports engagement",
          weight: 35,
          detail: "You watched two match highlights to the end last Sunday.",
        },
        {
          label: "Friend activity",
          weight: 28,
          detail: "Five people you follow liked or commented on this post.",
        },
        {
          label: "Live event velocity",
          weight: 22,
          detail: "Final-score posts spike quickly while a match is still fresh.",
        },
        {
          label: "Topic gap filler",
          weight: 15,
          detail: "Your followed sports accounts hadn't posted in the last few hours.",
        },
      ],
      dataUsed: ["Watch history", "Friend engagement", "Trending signals", "Topic interests"],
      notUsed: ["Advertiser targeting", "Message history", "Purchase history"],
    },
  },
];
