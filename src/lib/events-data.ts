export type EventType = "EXHIBITION" | "WORKSHOP" | "AUCTION" | "FAIR" | "TALK" | "OPENING";

export interface ArtEvent {
  id: string;
  title: string;
  type: EventType;
  venue: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  startTime?: string;
  imageUrl: string;
  description: string;
  organizer: string;
  ticketUrl?: string;
  isFree: boolean;
  price?: string;
  tags: string[];
  featured: boolean;
}

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  EXHIBITION: "Exhibition",
  WORKSHOP: "Workshop",
  AUCTION: "Auction",
  FAIR: "Art Fair",
  TALK: "Artist Talk",
  OPENING: "Opening Night",
};

export const EVENT_TYPE_COLORS: Record<EventType, string> = {
  EXHIBITION: "bg-blue-50 text-blue-700 border-blue-200",
  WORKSHOP: "bg-emerald-50 text-emerald-700 border-emerald-200",
  AUCTION: "bg-rose-50 text-rose-700 border-rose-200",
  FAIR: "bg-amber-50 text-amber-700 border-amber-200",
  TALK: "bg-purple-50 text-purple-700 border-purple-200",
  OPENING: "bg-pink-50 text-pink-700 border-pink-200",
};

export const EVENTS: ArtEvent[] = [
  {
    id: "e1",
    title: "Dhaka Art Summit 2026",
    type: "FAIR",
    venue: "Bangabandhu International Conference Center",
    city: "Dhaka",
    country: "Bangladesh",
    startDate: "2026-06-05",
    endDate: "2026-06-10",
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800",
    description: "South Asia's largest contemporary art event returns to Dhaka with over 300 artists from 40 countries. Featuring installations, performances, and a major curated exhibition exploring post-colonial narratives in South Asian art.",
    organizer: "Samdani Art Foundation",
    isFree: false,
    price: "৳500 / day",
    ticketUrl: "/contact",
    tags: ["contemporary", "south asia", "installation", "performance"],
    featured: true,
  },
  {
    id: "e2",
    title: "Zainul Memorial Watercolor Exhibition",
    type: "EXHIBITION",
    venue: "National Museum of Bangladesh",
    city: "Dhaka",
    country: "Bangladesh",
    startDate: "2026-05-28",
    endDate: "2026-06-28",
    imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800",
    description: "A major retrospective of watercolor works honoring Zainul Abedin, celebrating his 107th birth anniversary. The exhibition brings together 80 works from national collections alongside contemporary tributes from leading Bangladeshi artists.",
    organizer: "Faculty of Fine Arts, University of Dhaka",
    isFree: true,
    tags: ["watercolor", "retrospective", "zainul abedin", "bangladeshi"],
    featured: true,
  },
  {
    id: "e3",
    title: "Nakshi Kantha: Stitch & Story",
    type: "EXHIBITION",
    venue: "Bengal Gallery of Fine Arts",
    city: "Dhaka",
    country: "Bangladesh",
    startDate: "2026-06-01",
    endDate: "2026-06-30",
    imageUrl: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800",
    description: "A landmark exhibition celebrating the Nakshi Kantha tradition — exploring how this ancient folk art form is being reinterpreted by contemporary textile artists in Bangladesh.",
    organizer: "Bengal Foundation",
    isFree: false,
    price: "৳200",
    tags: ["textile", "kantha", "folk art", "traditional"],
    featured: false,
  },
  {
    id: "e4",
    title: "Oil Painting Masterclass with Prof. Rokeya Sultana",
    type: "WORKSHOP",
    venue: "ArtHub Studio Space",
    city: "Dhaka",
    country: "Bangladesh",
    startDate: "2026-06-07",
    endDate: "2026-06-07",
    startTime: "10:00 AM",
    imageUrl: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800",
    description: "A full-day intensive masterclass with Prof. Rokeya Sultana covering her signature approach to figurative oil painting. Limited to 12 participants. Materials included.",
    organizer: "ArtHub",
    isFree: false,
    price: "৳3,500",
    ticketUrl: "/contact?subject=workshop",
    tags: ["oil painting", "masterclass", "figurative", "workshop"],
    featured: false,
  },
  {
    id: "e5",
    title: "Contemporary Dhaka: A Collector's Guide",
    type: "TALK",
    venue: "Alliance Française de Dacca",
    city: "Dhaka",
    country: "Bangladesh",
    startDate: "2026-06-12",
    endDate: "2026-06-12",
    startTime: "6:00 PM",
    imageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800",
    description: "An evening talk for new and experienced collectors exploring how to build a meaningful collection of contemporary Bangladeshi art — with expert panel discussion and Q&A.",
    organizer: "Alliance Française & ArtHub",
    isFree: true,
    tags: ["collecting", "contemporary", "panel", "guide"],
    featured: false,
  },
  {
    id: "e6",
    title: "Monsoon Open Studios",
    type: "OPENING",
    venue: "Shilpacharya Zainul Abedin Sangrahashala",
    city: "Mymensingh",
    country: "Bangladesh",
    startDate: "2026-06-20",
    endDate: "2026-06-22",
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800",
    description: "Twenty artists open their studios to the public across three days of art, music, and cultural exchange in Mymensingh. A rare chance to meet artists in their creative spaces and acquire work directly.",
    organizer: "Mymensingh Artists Collective",
    isFree: true,
    tags: ["open studio", "mymensingh", "community", "monsoon"],
    featured: false,
  },
  {
    id: "e7",
    title: "ArtHub Live Auction — Summer Edition",
    type: "AUCTION",
    venue: "Online + Live Stream",
    city: "Dhaka",
    country: "Bangladesh",
    startDate: "2026-06-25",
    endDate: "2026-06-25",
    startTime: "7:00 PM",
    imageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800",
    description: "ArtHub's Summer live auction features 20 curated works from top Bangladeshi artists, available for bidding online and in-person. Pre-registration required.",
    organizer: "ArtHub",
    isFree: true,
    ticketUrl: "/auctions",
    tags: ["auction", "live", "summer", "online"],
    featured: true,
  },
];
