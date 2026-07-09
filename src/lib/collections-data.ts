export interface Collection {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  accentColor: string;
  tags: string[];
  artworkSlugs: string[];
  artworks: CollectionArtwork[];
}

export interface CollectionArtwork {
  id: string;
  title: string;
  artistName: string;
  price: number;
  imageUrl: string;
  medium: string;
  slug: string;
}

const SAMPLE_ARTWORKS: CollectionArtwork[] = [
  { id: "1", title: "Golden Sunset", artistName: "Rana Begum", price: 4500, imageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600", medium: "Oil on canvas", slug: "golden-sunset" },
  { id: "2", title: "Blue Serenity", artistName: "Nadia Islam", price: 3200, imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600", medium: "Watercolor", slug: "blue-serenity" },
  { id: "3", title: "Urban Echoes", artistName: "Moinul Islam", price: 7800, imageUrl: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600", medium: "Acrylic", slug: "urban-echoes" },
  { id: "4", title: "Abstract Thoughts", artistName: "Parisa Ahmed", price: 5600, imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600", medium: "Mixed media", slug: "abstract-thoughts" },
  { id: "5", title: "Quiet Harbor", artistName: "Studio Lumi", price: 4800, imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600", medium: "Oil", slug: "quiet-harbor" },
  { id: "6", title: "Crimson Tide", artistName: "Red Brush", price: 3900, imageUrl: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=600", medium: "Acrylic", slug: "crimson-tide" },
];

export const COLLECTIONS: Collection[] = [
  {
    slug: "under-5000",
    title: "Under ৳5,000",
    subtitle: "Original art within reach",
    description: "Discover authentic, original artworks by talented Bangladeshi artists — all priced under ৳5,000. Collecting doesn't have to break the bank.",
    coverImage: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200",
    accentColor: "from-emerald-600 to-teal-700",
    tags: ["affordable", "original", "accessible"],
    artworkSlugs: [],
    artworks: SAMPLE_ARTWORKS.filter(a => a.price < 5000),
  },
  {
    slug: "abstract",
    title: "Abstract Expressions",
    subtitle: "Bold, emotional, contemporary",
    description: "Paintings that speak without words. A curated selection of abstract works from Bangladesh's most daring contemporary painters — ideal for modern interiors.",
    coverImage: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200",
    accentColor: "from-violet-600 to-purple-700",
    tags: ["abstract", "contemporary", "bold"],
    artworkSlugs: [],
    artworks: SAMPLE_ARTWORKS.slice(0, 4),
  },
  {
    slug: "landscapes",
    title: "Bangladesh Landscapes",
    subtitle: "River, delta, paddy field",
    description: "The beauty of Bangladesh — haor wetlands, monsoon rivers, golden paddy fields — captured by artists who grew up with this land. For those who love the country.",
    coverImage: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1200",
    accentColor: "from-green-600 to-emerald-700",
    tags: ["landscape", "nature", "bangladesh"],
    artworkSlugs: [],
    artworks: SAMPLE_ARTWORKS.slice(0, 3),
  },
  {
    slug: "gift-ideas",
    title: "Perfect Gifts",
    subtitle: "Art that lasts a lifetime",
    description: "Give the gift of original art. These works have been selected for their emotional resonance, beauty, and ability to transform any space — perfect for weddings, anniversaries, or milestones.",
    coverImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200",
    accentColor: "from-rose-600 to-pink-700",
    tags: ["gift", "special occasion", "emotional"],
    artworkSlugs: [],
    artworks: SAMPLE_ARTWORKS.slice(1, 5),
  },
  {
    slug: "new-arrivals",
    title: "New Arrivals",
    subtitle: "Just added this week",
    description: "The freshest works from ArtHub's community — published in the last 7 days. Be among the first to discover and collect new talent before the rest of the world catches on.",
    coverImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200",
    accentColor: "from-blue-600 to-indigo-700",
    tags: ["new", "fresh", "trending"],
    artworkSlugs: [],
    artworks: SAMPLE_ARTWORKS.slice(2, 6),
  },
  {
    slug: "watercolor",
    title: "Watercolor Works",
    subtitle: "Luminous, transparent, alive",
    description: "Watercolor has deep roots in Bangladeshi art — from Zainul Abedin's famine sketches to the contemporary masters. This collection celebrates the medium's unique luminosity.",
    coverImage: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=1200",
    accentColor: "from-cyan-600 to-sky-700",
    tags: ["watercolor", "traditional", "technique"],
    artworkSlugs: [],
    artworks: SAMPLE_ARTWORKS.filter(a => a.medium === "Watercolor" || a.medium === "Oil"),
  },
  {
    slug: "home-office",
    title: "Home Office Art",
    subtitle: "Inspire your workspace",
    description: "Curated for the modern home office — works that energize, inspire focus, or bring calm to a working environment. Clean compositions, strong visuals, professional energy.",
    coverImage: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=1200",
    accentColor: "from-slate-600 to-gray-700",
    tags: ["office", "workspace", "minimal"],
    artworkSlugs: [],
    artworks: SAMPLE_ARTWORKS.slice(0, 4),
  },
  {
    slug: "large-format",
    title: "Statement Pieces",
    subtitle: "Works that command a room",
    description: "Large-format originals that make an unforgettable first impression. These are the pieces collectors remember — and rooms are built around.",
    coverImage: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1200",
    accentColor: "from-amber-600 to-orange-700",
    tags: ["large", "statement", "original"],
    artworkSlugs: [],
    artworks: SAMPLE_ARTWORKS.slice(3, 6),
  },
];
