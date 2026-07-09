export type AuctionStatus = "LIVE" | "UPCOMING" | "ENDED";

export interface Bid {
  bidder: string;
  amount: number;
  time: string;
}

export interface Auction {
  id: string;
  title: string;
  artistName: string;
  shopSlug: string;
  imageUrl: string;
  images: string[];
  description: string;
  medium: string;
  dimensions: string;
  yearCreated: number;
  startingBid: number;
  currentBid: number;
  currency: string;
  status: AuctionStatus;
  startTime: string;
  endTime: string;
  totalBids: number;
  recentBids: Bid[];
  tags: string[];
  estimatedValue: string;
}

export const AUCTIONS: Auction[] = [
  {
    id: "a1",
    title: "The Padma at Dusk",
    artistName: "Rana Begum",
    shopSlug: "rana-begum-studio",
    imageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800",
    images: [
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800",
    ],
    description: "A luminous oil painting capturing the Padma River at dusk — the sky ablaze in violet and gold, the water still as glass. Rana Begum spent three weeks on the riverbank creating studies for this work, translating light into emotion.",
    medium: "Oil on linen",
    dimensions: "90 × 120 cm",
    yearCreated: 2024,
    startingBid: 25000,
    currentBid: 41500,
    currency: "BDT",
    status: "LIVE",
    startTime: "2026-05-21T10:00:00Z",
    endTime: "2026-05-22T18:00:00Z",
    totalBids: 14,
    recentBids: [
      { bidder: "Collector R***", amount: 41500, time: "2 min ago" },
      { bidder: "ArtLover S***", amount: 39000, time: "18 min ago" },
      { bidder: "Gallery M***", amount: 36500, time: "45 min ago" },
      { bidder: "Collector K***", amount: 34000, time: "1h ago" },
    ],
    tags: ["landscape", "river", "oil", "bangladeshi"],
    estimatedValue: "৳55,000 – ৳70,000",
  },
  {
    id: "a2",
    title: "Nakshi Kantha No. 7",
    artistName: "Dilara Begum Jolly",
    shopSlug: "jolly-textile-arts",
    imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800",
    images: [
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800",
    ],
    description: "An extraordinary large-format Nakshi Kantha quilt rendered as fine art — every stitch a meditation, every motif a story drawn from Bangladeshi folklore. Jolly spent eight months completing this piece.",
    medium: "Thread on cotton (Kantha)",
    dimensions: "180 × 180 cm",
    yearCreated: 2023,
    startingBid: 60000,
    currentBid: 87000,
    currency: "BDT",
    status: "LIVE",
    startTime: "2026-05-20T08:00:00Z",
    endTime: "2026-05-22T20:00:00Z",
    totalBids: 9,
    recentBids: [
      { bidder: "Museum C***", amount: 87000, time: "5 min ago" },
      { bidder: "Collector A***", amount: 82000, time: "30 min ago" },
      { bidder: "Gallery D***", amount: 76000, time: "2h ago" },
    ],
    tags: ["textile", "kantha", "traditional", "bangladeshi"],
    estimatedValue: "৳90,000 – ৳120,000",
  },
  {
    id: "a3",
    title: "Old Dhaka Fragments",
    artistName: "Moinul Islam",
    shopSlug: "moinul-studio",
    imageUrl: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800",
    images: [
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800",
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800",
    ],
    description: "Moinul's bold mixed-media triptych documents the disappearing architecture of Old Dhaka through layers of photography, acrylic paint, and recycled street ephemera — rickshaw prints, newspaper fragments, and faded signage.",
    medium: "Mixed media on board",
    dimensions: "3 × (60 × 80 cm)",
    yearCreated: 2025,
    startingBid: 35000,
    currentBid: 35000,
    currency: "BDT",
    status: "UPCOMING",
    startTime: "2026-05-23T10:00:00Z",
    endTime: "2026-05-25T18:00:00Z",
    totalBids: 0,
    recentBids: [],
    tags: ["dhaka", "mixed media", "urban", "triptych"],
    estimatedValue: "৳50,000 – ৳65,000",
  },
  {
    id: "a4",
    title: "Monsoon Study III",
    artistName: "Parisa Ahmed",
    shopSlug: "parisa-fine-art",
    imageUrl: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800",
    images: [
      "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800",
    ],
    description: "This evocative watercolor captures the drama of the Bangladesh monsoon — sheets of rain over paddy fields, dark clouds, and the silver light that follows a storm. Part of Parisa's celebrated 'Weather' series.",
    medium: "Watercolor on Arches paper",
    dimensions: "56 × 76 cm",
    yearCreated: 2024,
    startingBid: 18000,
    currentBid: 29500,
    currency: "BDT",
    status: "ENDED",
    startTime: "2026-05-15T10:00:00Z",
    endTime: "2026-05-17T18:00:00Z",
    totalBids: 11,
    recentBids: [
      { bidder: "Collector T***", amount: 29500, time: "Winner" },
    ],
    tags: ["watercolor", "monsoon", "landscape", "weather"],
    estimatedValue: "৳28,000 – ৳35,000",
  },
];
