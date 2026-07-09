export interface ArtOwner {
  slug: string;
  name: string;
  image: string;
  coverImage: string;
  title: string;
  location: string;
  bio: string;
  longBio: string;
  collectionFocus: string;
  collectionSlugs: string[];
  contact?: string;
  website?: string;
  stats: {
    totalWorks: number;
    yearsCollecting: number;
    countries: number;
  };
}

export const ART_OWNERS: ArtOwner[] = [
  {
    slug: "nazmul-anwar-jewel",
    name: "Nazmul Anwar Jewel",
    image: "/images/artists/owner_1.png",
    coverImage: "/images/banners/banner_1.png",
    title: "Art Collector & Patron",
    location: "Dhaka, Bangladesh",
    bio: "Art collector and patron based in Dhaka, Bangladesh. Has been collecting significant works of Bangladeshi modern art for over two decades, with a particular focus on preserving the legacy of S. M. Sultan and his contemporaries.",
    longBio: `Nazmul Anwar Jewel is one of Bangladesh's most respected private art collectors — a passionate patron whose collection spans over two decades and includes significant works by the founding masters of Bangladeshi modern art.

His collecting journey began in the early 2000s when he acquired his first major work at an auction in Dhaka. Struck by the power and cultural importance of Bangladeshi painting, he committed himself to building a collection that would preserve and celebrate this heritage for future generations.

His particular focus is the generation of artists who emerged in the 1950s–1980s — the foundational figures who established Bangladesh's artistic identity: S. M. Sultan, Murtaja Baseer, Zainul Abedin, and their contemporaries. He has also selectively acquired international works that dialogue with his Bangladeshi collection.

Beyond collecting, Jewel has been an active advocate for Bangladeshi art — lending works for museum exhibitions, supporting conservation projects, and sponsoring publications on Bangladeshi art history. He believes strongly that great art belongs to the public and makes his collection available for scholarly research and exhibition.

His collection is considered one of the most important private holdings of Bangladeshi modern art outside a museum context.`,
    collectionFocus: "Bangladeshi modern art (1940s–1990s), S. M. Sultan and contemporaries, selected international masterworks",
    collectionSlugs: [
      "gate-series-murtaja-baseer",
      "the-scream",
      "bengal-famine-sketch-1943",
      "first-monsoon-sm-sultan",
      "freedom-fighter-shahabuddin",
    ],
    stats: {
      totalWorks: 47,
      yearsCollecting: 24,
      countries: 8,
    },
  },
];
