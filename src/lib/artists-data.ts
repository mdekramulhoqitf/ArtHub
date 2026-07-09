export interface Artwork {
  title: string;
  year: string;
  medium: string;
  image: string;
}

export interface TimelineEvent {
  year: string;
  event: string;
}

export interface Artist {
  slug: string;
  name: string;
  banglaName?: string;
  born: string;
  died?: string;
  birthPlace: string;
  nationality: string;
  style: string[];
  image: string;
  coverImage: string;
  bio: string;
  longBio: string;
  famousFor: string;
  awards: string[];
  education: string[];
  timeline: TimelineEvent[];
  famousWorks: Artwork[];
  quote?: string;
}

export const ARTISTS: Artist[] = [
  {
    slug: "zainul-abedin",
    name: "Zainul Abedin",
    banglaName: "জয়নুল আবেদিন",
    born: "29 December 1914",
    died: "28 May 1976",
    birthPlace: "Kishorganj, Bengal (now Bangladesh)",
    nationality: "Bangladeshi",
    style: ["Realism", "Expressionism", "Folk Art"],
    image: "/images/artists/Zainul Abedin.png",
    coverImage: "/images/banners/banner_1.png",
    bio: "Zainul Abedin, known as Shilpacharya (Master of Art), was a pioneering Bangladeshi artist and founder of the Institute of Fine Arts, Dhaka. His Bengal Famine sketches of 1943 brought international recognition.",
    longBio: `Zainul Abedin (1914–1976), fondly called Shilpacharya (The Great Teacher of Art), was the founding father of modern Bangladeshi art. Born in Kishorganj, he studied at the Government School of Art in Calcutta before founding the Government Institute of Fine Arts in Dhaka in 1948, which later became the Faculty of Fine Arts at the University of Dhaka.

His most celebrated works are the Bengal Famine Sketches (1943), a series of harrowing drawings depicting the devastating Bengal famine that killed millions. Executed in charcoal and ink, these works stand among the most powerful social documents in the history of South Asian art — raw, urgent, and deeply human.

Beyond tragedy, Abedin celebrated the beauty of rural Bengal through vibrant depictions of rivers, boats, fishermen and everyday village life. His scroll paintings — Nakshi Kantha (1969) and Manpura (1970) — are among the longest narrative paintings in the world.

He received the Pride of Performance Award from Pakistan in 1958, the Sitara-e-Imtiaz in 1966, and became the first recipient of Bangladesh's highest civilian honour, the Independence Day Award, in 1976, just months before his death.`,
    famousFor: "Bengal Famine Sketches (1943), founding father of Bangladeshi modern art",
    awards: ["Shilpacharya (Title)", "Independence Day Award, Bangladesh (1976)", "Sitara-e-Imtiaz, Pakistan (1966)", "Pride of Performance Award (1958)"],
    education: ["Government School of Art, Calcutta (1933–1938)"],
    timeline: [
      { year: "1914", event: "Born in Kishorganj, Bengal" },
      { year: "1938", event: "Graduated from Government School of Art, Calcutta" },
      { year: "1943", event: "Created Bengal Famine Sketches — iconic social documents" },
      { year: "1948", event: "Founded Government Institute of Fine Arts, Dhaka" },
      { year: "1966", event: "Awarded Sitara-e-Imtiaz by Pakistan" },
      { year: "1969", event: "Completed Nakshi Kantha scroll painting" },
      { year: "1975", event: "Founded Bangladesh National Museum of Art" },
      { year: "1976", event: "Received Independence Day Award; passed away in Dhaka" },
    ],
    famousWorks: [
      { title: "Bengal Famine Sketch No. 1", year: "1943", medium: "Charcoal on paper", image: "/images/artworks/image_1.png" },
      { title: "Flood", year: "1955", medium: "Watercolour", image: "/images/artworks/image_2.png" },
      { title: "Nakshi Kantha", year: "1969", medium: "Scroll — mixed media", image: "/images/artworks/image_4.png" },
      { title: "Manpura", year: "1970", medium: "Scroll — mixed media", image: "/images/artworks/image_5.png" },
      { title: "Boat on the River", year: "1952", medium: "Oil on canvas", image: "/images/artworks/image_6.png" },
      { title: "Village Women", year: "1960", medium: "Ink on paper", image: "/images/artworks/image_7.png" },
    ],
    quote: "Art is not a luxury; it is a necessity of life — as necessary as bread.",
  },
  {
    slug: "sheikh-muhammed-sultan",
    name: "Sheikh Muhammed Sultan",
    banglaName: "শেখ মুহাম্মদ সুলতান",
    born: "10 August 1923",
    died: "10 October 1994",
    birthPlace: "Narail, Bengal (now Bangladesh)",
    nationality: "Bangladeshi",
    style: ["Expressionism", "Figurative", "Rural Realism"],
    image: "/images/artists/Sheikh Muhammed Sultan.png",
    coverImage: "/images/banners/banner_2.png",
    bio: "S.M. Sultan, known for his monumental canvases of muscular Bangladeshi peasants, was an eccentric genius who lived among rural communities. He is celebrated for transforming the image of the Bengali farmer into a symbol of dignity and strength.",
    longBio: `Sheikh Muhammed Sultan (1923–1994), widely known as S.M. Sultan or Laal Mia, was one of Bangladesh's most celebrated and unconventional painters. Born into a family of modest means in Narail, he showed artistic talent early and eventually made his way to the Government School of Art in Calcutta.

Sultan's most iconic works depict the farmers and peasants of rural Bangladesh with muscular, almost superhuman physiques — a deliberate artistic choice to restore dignity and power to those who work the land. Where colonial-era depictions often showed the Bengali peasant as emaciated and defeated, Sultan painted them as giants striding across lush fields.

Despite his international fame — he exhibited in New York, London and Karachi in the late 1940s — Sultan chose to return to his village of Narail, where he lived in self-imposed simplicity, surrounded by animals and children. He established a school for village children called the Children's Fantasy School.

His palette was characteristically lush: deep greens, rich browns, golden ochres — the colours of Bengal's riverine landscape. His canvases were large and ambitious, painted with a freedom that bordered on the ecstatic.`,
    famousFor: "Monumental paintings of Bangladeshi peasants, S.M. Sultan Smriti Sangrahasala",
    awards: ["Ekushey Padak (1982)", "Independence Day Award, Bangladesh (1993)", "Shilpakala Academy Award"],
    education: ["Government School of Art, Calcutta"],
    timeline: [
      { year: "1923", event: "Born in Narail, Bengal" },
      { year: "1941", event: "Enrolled in Government School of Art, Calcutta" },
      { year: "1946", event: "Exhibited in New York and London" },
      { year: "1953", event: "Returned to Narail, chose rural life over fame" },
      { year: "1969", event: "Established Children's Fantasy School in Narail" },
      { year: "1982", event: "Received Ekushey Padak" },
      { year: "1993", event: "Received Independence Day Award" },
      { year: "1994", event: "Passed away in Jessore" },
    ],
    famousWorks: [
      { title: "First Monsoon", year: "1974", medium: "Oil on canvas", image: "/images/artworks/image_1.png" },
      { title: "Harvest", year: "1975", medium: "Oil on canvas", image: "/images/artworks/image_2.png" },
      { title: "Char Dakhol", year: "1976", medium: "Oil on canvas", image: "/images/artworks/image_4.png" },
      { title: "Riverine Bengal", year: "1980", medium: "Watercolour", image: "/images/artworks/image_5.png" },
      { title: "Village Festival", year: "1985", medium: "Oil on canvas", image: "/images/artworks/image_6.png" },
      { title: "Ploughmen", year: "1988", medium: "Oil on canvas", image: "/images/artworks/image_7.png" },
    ],
    quote: "I paint the peasants large because they are the ones who feed the world.",
  },
  {
    slug: "qayyum-chowdhury",
    name: "Qayyum Chowdhury",
    banglaName: "কাইয়ুম চৌধুরী",
    born: "9 March 1934",
    died: "30 November 2014",
    birthPlace: "Feni, Bengal (now Bangladesh)",
    nationality: "Bangladeshi",
    style: ["Graphic Design", "Illustration", "Abstract"],
    image: "/images/artists/Qayyum Chowdhury.png",
    coverImage: "/images/banners/banner_3.png",
    bio: "Qayyum Chowdhury was a painter, illustrator, and typographer whose work profoundly shaped Bangladeshi visual culture. He designed hundreds of iconic book covers and was celebrated for integrating Bangla script into modern design.",
    longBio: `Qayyum Chowdhury (1934–2014) was one of the most versatile visual artists of Bangladesh — a painter, book cover designer, illustrator, typographer, and art educator who shaped the visual identity of his nation for over six decades.

A student of Zainul Abedin, he graduated from the Government Institute of Fine Arts, Dhaka. His painting style drew on folk art traditions, geometric abstraction, and Bengali calligraphy — creating works that felt simultaneously rooted and contemporary.

As a book cover designer, he was unmatched. His covers for major Bangladeshi publishers — featuring bold colour fields, hand-lettered type, and folk motifs — defined the look of Bengali literary publishing from the 1960s through the 2000s. He designed the visual identity for Ekushey February commemorations and many national cultural events.

His later paintings became increasingly abstract, though always anchored in the colours and forms of Bengal — mustard yellow, paddy green, river blue. He received the Ekushey Padak in 1984 and the Independence Day Award in 2014.`,
    famousFor: "Iconic Bangla book cover designs, integration of folk art and modern abstraction",
    awards: ["Ekushey Padak (1984)", "Independence Day Award, Bangladesh (2014)", "Shilpakala Academy Award"],
    education: ["Government Institute of Fine Arts, Dhaka (student of Zainul Abedin)"],
    timeline: [
      { year: "1934", event: "Born in Feni, Bengal" },
      { year: "1954", event: "Graduated from Government Institute of Fine Arts, Dhaka" },
      { year: "1960s", event: "Began designing iconic Bangla book covers" },
      { year: "1971", event: "Created visual materials for Bangladesh Liberation War" },
      { year: "1984", event: "Received Ekushey Padak" },
      { year: "2000s", event: "Major retrospective exhibitions held" },
      { year: "2014", event: "Received Independence Day Award; passed away in Dhaka" },
    ],
    famousWorks: [
      { title: "Folk Forms I", year: "1965", medium: "Oil on canvas", image: "/images/artworks/image_1.png" },
      { title: "Padma", year: "1972", medium: "Acrylic on canvas", image: "/images/artworks/image_2.png" },
      { title: "Book Cover — Tagore Omnibus", year: "1975", medium: "Mixed media", image: "/images/artworks/images_3.png" },
      { title: "Abstract Geometry", year: "1985", medium: "Oil on canvas", image: "/images/artworks/image_4.png" },
      { title: "Village Festival II", year: "1990", medium: "Watercolour", image: "/images/artworks/image_5.png" },
      { title: "Bangladesh Red-Green", year: "2000", medium: "Acrylic on canvas", image: "/images/artworks/image_6.png" },
    ],
    quote: "Design is the art of giving form to thought.",
  },
  {
    slug: "hashem-khan",
    name: "Hashem Khan",
    banglaName: "হাশেম খান",
    born: "7 April 1941",
    birthPlace: "Munshiganj, Bangladesh",
    nationality: "Bangladeshi",
    style: ["Folk Art", "Typography", "Painting"],
    image: "/images/artists/Hashem Khan.png",
    coverImage: "/images/banners/banner_4.png",
    bio: "Hashem Khan is a living legend of Bangladeshi art — a painter, illustrator, typographer, and teacher who has shaped visual culture for more than five decades. He is known for his bold folk imagery and revolutionary Bangla typography.",
    longBio: `Hashem Khan (born 1941) is among the most beloved living artists of Bangladesh — a painter, children's book illustrator, typographer, and veteran art educator at the Faculty of Fine Arts, University of Dhaka, where he taught for over three decades.

A graduate of the Government Institute of Fine Arts, Dhaka, Khan's work is characterised by bold lines, vivid primary colours, and imagery drawn from Bangladesh's folk traditions — Jamdani weaving, terracotta temple art, Nakshi Kantha embroidery, and river life.

As a typographer, he made profound contributions to the visual identity of Bangla script, designing typefaces and lettering systems that are still widely used. His children's book illustrations introduced generations of Bangladeshi children to their visual heritage.

During the Liberation War of 1971, Khan contributed artworks to the freedom movement. His post-independence career has been marked by continuous exploration — from large-scale public murals to intimate book illustrations.

He received the Ekushey Padak in 1988 and remains actively creative today.`,
    famousFor: "Folk art painting, Bangla typography, children's book illustration",
    awards: ["Ekushey Padak (1988)", "National Film Award for Art Direction", "Shilpakala Academy Award"],
    education: ["Government Institute of Fine Arts, Dhaka"],
    timeline: [
      { year: "1941", event: "Born in Munshiganj, Bangladesh" },
      { year: "1961", event: "Graduated from Government Institute of Fine Arts, Dhaka" },
      { year: "1965", event: "Joined Faculty of Fine Arts, University of Dhaka as teacher" },
      { year: "1971", event: "Contributed art to Bangladesh Liberation War" },
      { year: "1975", event: "Began pioneering work in Bangla typography" },
      { year: "1988", event: "Received Ekushey Padak" },
      { year: "2000s", event: "Major public mural commissions across Bangladesh" },
    ],
    famousWorks: [
      { title: "River Life", year: "1968", medium: "Oil on canvas", image: "/images/artworks/image_1.png" },
      { title: "Nakshi Kantha Pattern", year: "1975", medium: "Mixed media", image: "/images/artworks/image_2.png" },
      { title: "Folk Celebration", year: "1980", medium: "Acrylic on canvas", image: "/images/artworks/images_3.png" },
      { title: "Village Market", year: "1988", medium: "Watercolour", image: "/images/artworks/image_4.png" },
      { title: "Jamdani Dreams", year: "1995", medium: "Oil on canvas", image: "/images/artworks/image_5.png" },
      { title: "Children of Bengal", year: "2005", medium: "Illustration", image: "/images/artworks/image_6.png" },
    ],
  },
  {
    slug: "rashid-chowdhury",
    name: "Rashid Chowdhury",
    banglaName: "রশীদ চৌধুরী",
    born: "1 April 1932",
    died: "12 December 1986",
    birthPlace: "Faridpur, Bengal (now Bangladesh)",
    nationality: "Bangladeshi",
    style: ["Tapestry", "Painting", "Printmaking"],
    image: "/images/artists/Rashid Choudhury.png",
    coverImage: "/images/banners/banner_5.png",
    bio: "Rashid Chowdhury was a pioneering Bangladeshi artist celebrated for introducing tapestry as a fine art medium in Bangladesh. He studied in Paris and Madrid and brought European textile art traditions to Bengal.",
    longBio: `Rashid Chowdhury (1932–1986) was one of the most internationally connected Bangladeshi artists of his generation — a painter, tapestry artist, and printmaker who studied in Paris and Madrid and played a crucial role in building the Faculty of Fine Arts at the University of Chittagong.

Born in Faridpur, he studied at the Government Institute of Fine Arts in Dhaka before winning a scholarship to study in Paris at the École nationale supérieure des Beaux-Arts, and later in Madrid. In Europe, he became fascinated with tapestry — the ancient medium of woven textile art — and trained under master tapestry weavers.

Returning to Bangladesh, he introduced tapestry as a recognised fine art form, creating large-scale woven works that combined European techniques with Bangladeshi motifs: river landscapes, folk patterns, liberation struggle imagery.

He founded the Department of Fine Arts at Chittagong University and trained a generation of artists. His paintings in oil and watercolour show the same richness of texture and colour as his tapestries.

He received the Ekushey Padak in 1980.`,
    famousFor: "Introducing tapestry as fine art in Bangladesh, founding Chittagong University art department",
    awards: ["Ekushey Padak (1980)", "Government of Bangladesh National Award"],
    education: ["Government Institute of Fine Arts, Dhaka", "École nationale supérieure des Beaux-Arts, Paris", "Escuela de Bellas Artes, Madrid"],
    timeline: [
      { year: "1932", event: "Born in Faridpur, Bengal" },
      { year: "1956", event: "Graduated from Government Institute of Fine Arts, Dhaka" },
      { year: "1959", event: "Scholarship to École des Beaux-Arts, Paris" },
      { year: "1963", event: "Trained in tapestry in Madrid and Paris" },
      { year: "1967", event: "Founded Department of Fine Arts, Chittagong University" },
      { year: "1980", event: "Received Ekushey Padak" },
      { year: "1986", event: "Passed away in Dhaka" },
    ],
    famousWorks: [
      { title: "Bengal River Tapestry", year: "1968", medium: "Handwoven tapestry", image: "/images/artworks/image_1.png" },
      { title: "Liberation", year: "1973", medium: "Tapestry", image: "/images/artworks/image_2.png" },
      { title: "Monsoon", year: "1975", medium: "Oil on canvas", image: "/images/artworks/images_3.png" },
      { title: "Folk Motif Tapestry", year: "1978", medium: "Handwoven tapestry", image: "/images/artworks/image_4.png" },
      { title: "Village at Dusk", year: "1982", medium: "Watercolour", image: "/images/artworks/image_5.png" },
      { title: "Chittagong Hills", year: "1985", medium: "Oil on canvas", image: "/images/artworks/image_6.png" },
    ],
  },
  {
    slug: "safiuddin-ahmed",
    name: "Safiuddin Ahmed",
    banglaName: "সফিউদ্দীন আহমেদ",
    born: "1922",
    died: "2012",
    birthPlace: "Kolkata, Bengal (now India)",
    nationality: "Bangladeshi",
    style: ["Printmaking", "Etching", "Aquatint"],
    image: "/images/artists/Safiuddin Ahmed.png",
    coverImage: "/images/banners/banner_6.png",
    bio: "Safiuddin Ahmed was a pioneering printmaker whose technically mastery of etching and aquatint produced some of the most accomplished prints in South Asian art. He was a founding faculty member of the Government Institute of Fine Arts, Dhaka.",
    longBio: `Safiuddin Ahmed (1922–2012) was one of the most technically accomplished artists of Bangladesh — a printmaker, draughtsman, and teacher whose mastery of etching, aquatint, and intaglio produced some of the finest graphic works in South Asian art history.

Born in Kolkata, he studied at the Government School of Art there before joining Zainul Abedin as one of the founding faculty members of the Government Institute of Fine Arts in Dhaka in 1948. He later studied printmaking in London, where he deepened his technical mastery.

His prints — often depicting the landscape, boats, and figures of Bengal — are characterised by extraordinary tonal richness. Working in aquatint, he achieved velvety blacks and delicate greys that recalled the best of the European tradition while remaining distinctly rooted in the Bengali visual world.

He taught printmaking in Dhaka for decades, training generations of Bangladeshi artists. His influence on the development of printmaking as a fine art in Bangladesh cannot be overstated.

He received the Ekushey Padak in 1965 and the Independence Day Award in 2012.`,
    famousFor: "Pioneer of printmaking in Bangladesh, founding faculty of Fine Arts Institute Dhaka",
    awards: ["Ekushey Padak (1965)", "Independence Day Award, Bangladesh (2012)", "Sitara-e-Imtiaz, Pakistan"],
    education: ["Government School of Art, Calcutta", "Government Institute of Fine Arts, Dhaka", "London (printmaking studies)"],
    timeline: [
      { year: "1922", event: "Born in Kolkata, Bengal" },
      { year: "1945", event: "Graduated from Government School of Art, Calcutta" },
      { year: "1948", event: "Joined founding faculty of Government Institute of Fine Arts, Dhaka" },
      { year: "1955", event: "Studied advanced printmaking techniques in London" },
      { year: "1965", event: "Received Ekushey Padak" },
      { year: "1980s", event: "Produced major aquatint series depicting Bengal landscapes" },
      { year: "2012", event: "Received Independence Day Award; passed away in Dhaka" },
    ],
    famousWorks: [
      { title: "Bengal Landscape I", year: "1955", medium: "Aquatint", image: "/images/artworks/image_1.png" },
      { title: "Boats on the Buriganga", year: "1962", medium: "Etching", image: "/images/artworks/image_2.png" },
      { title: "Village Women", year: "1968", medium: "Aquatint", image: "/images/artworks/images_3.png" },
      { title: "Storm", year: "1975", medium: "Intaglio", image: "/images/artworks/image_4.png" },
      { title: "Padma Series No. 4", year: "1982", medium: "Etching & aquatint", image: "/images/artworks/image_5.png" },
      { title: "Still Life", year: "1990", medium: "Dry point", image: "/images/artworks/image_6.png" },
    ],
  },
  {
    slug: "mohammad-kibria",
    name: "Mohammad Kibria",
    banglaName: "মোহাম্মদ কিবরিয়া",
    born: "1929",
    died: "2011",
    birthPlace: "Rajshahi, Bengal (now Bangladesh)",
    nationality: "Bangladeshi",
    style: ["Abstract", "Expressionism", "Printmaking"],
    image: "/images/artists/Mohammad Kibria.png",
    coverImage: "/images/banners/banner_7.png",
    bio: "Mohammad Kibria was one of Bangladesh's foremost abstract painters and printmakers. He studied in Tokyo and brought Japanese printmaking traditions back to Bangladesh, creating a uniquely hybrid visual language.",
    longBio: `Mohammad Kibria (1929–2011) was one of the most internationally acclaimed Bangladeshi abstract artists — a painter and printmaker whose work synthesised Japanese aesthetics with Bengali sensibility, creating a visual language that was uniquely his own.

Born in Rajshahi, he studied at the Government Institute of Fine Arts in Dhaka before winning a scholarship to study in Tokyo, Japan, under the Colombo Plan. In Tokyo, he immersed himself in Japanese woodblock printing traditions and Zen-influenced aesthetics, which profoundly shaped his subsequent work.

Returning to Bangladesh, Kibria joined the faculty of the Institute of Fine Arts, Dhaka, where he taught for many years. His abstract paintings — large canvases of layered colour fields, gestural marks, and subtle textures — draw on both the Bengali landscape and the meditative traditions of Japanese art. His palette was restrained and sophisticated: ochres, greys, deep blues, and earthy reds.

His prints, influenced by Japanese mokuhanga (woodblock) traditions, achieved international exhibition and collection in Japan, Europe, and North America.

He received the Ekushey Padak in 1980.`,
    famousFor: "Abstract painting and printmaking, synthesis of Japanese and Bengali visual traditions",
    awards: ["Ekushey Padak (1980)", "Japan Foundation Fellowship", "Bangladesh Shilpakala Academy Award"],
    education: ["Government Institute of Fine Arts, Dhaka", "Tokyo University of the Arts (Colombo Plan scholarship)"],
    timeline: [
      { year: "1929", event: "Born in Rajshahi, Bengal" },
      { year: "1954", event: "Graduated from Government Institute of Fine Arts, Dhaka" },
      { year: "1959", event: "Scholarship to study in Tokyo, Japan" },
      { year: "1964", event: "Returned to Dhaka; joined faculty of Institute of Fine Arts" },
      { year: "1975", event: "Major solo exhibition in Tokyo" },
      { year: "1980", event: "Received Ekushey Padak" },
      { year: "1990s", event: "International exhibitions in Europe and USA" },
      { year: "2011", event: "Passed away in Dhaka" },
    ],
    famousWorks: [
      { title: "Abstract No. 7", year: "1966", medium: "Oil on canvas", image: "/images/artworks/image_1.png" },
      { title: "Tokyo Memory", year: "1972", medium: "Woodblock print", image: "/images/artworks/image_2.png" },
      { title: "River Abstraction", year: "1978", medium: "Oil on canvas", image: "/images/artworks/images_3.png" },
      { title: "Silence", year: "1985", medium: "Mixed media", image: "/images/artworks/image_4.png" },
      { title: "Bengal Horizon", year: "1992", medium: "Oil on canvas", image: "/images/artworks/image_5.png" },
      { title: "Late Evening", year: "2000", medium: "Acrylic on canvas", image: "/images/artworks/image_6.png" },
    ],
  },
  {
    slug: "nitun-kundo",
    name: "Nitun Kundo",
    banglaName: "নিতুন কুণ্ডু",
    born: "1935",
    died: "2006",
    birthPlace: "Dhaka, Bangladesh",
    nationality: "Bangladeshi",
    style: ["Sculpture", "Public Art", "Installation"],
    image: "/images/artists/Nitun Kundu.png",
    coverImage: "/images/banners/banner_1.png",
    bio: "Nitun Kundo was Bangladesh's foremost sculptor, creator of iconic public monuments including the famous Swopno Senapati (Captain of Dreams). His works stand at the heart of Bangladeshi public space.",
    longBio: `Nitun Kundo (1935–2006) was the foremost sculptor of Bangladesh — the artist whose public monuments have become inseparable from the visual identity of Bangladeshi cities and civic life.

Born in Dhaka, he studied at the Government Institute of Fine Arts before going abroad to study sculpture in London and Italy. Returning to Bangladesh, he joined the faculty of the Institute of Fine Arts and dedicated himself to building sculpture as a recognised fine art discipline in the country.

His most famous public works include the Swopno Senapati (Captain of Dreams), Akanksha, and numerous monuments at Dhaka University, the National Parliament, and public parks across Bangladesh. These works — bold, figurative, heroic in scale — celebrate the aspirations of the Bangladeshi people, the struggle for liberation, and the dignity of ordinary life.

Beyond public monuments, Kundo created an extensive body of smaller sculptures in bronze, terracotta, and mixed media. His work bridges folk tradition and modernist form — deeply Bengali in spirit, yet universal in its humanity.

He received the Ekushey Padak in 1987.`,
    famousFor: "Swopno Senapati and other iconic public sculptures of Bangladesh",
    awards: ["Ekushey Padak (1987)", "Bangladesh Shilpakala Academy Award", "National Sculpture Award"],
    education: ["Government Institute of Fine Arts, Dhaka", "London (sculpture studies)", "Italy (advanced sculpture)"],
    timeline: [
      { year: "1935", event: "Born in Dhaka, Bangladesh" },
      { year: "1957", event: "Graduated from Government Institute of Fine Arts, Dhaka" },
      { year: "1963", event: "Studied sculpture in London and Italy" },
      { year: "1968", event: "Joined faculty of Institute of Fine Arts, Dhaka" },
      { year: "1974", event: "Created Swopno Senapati — iconic public sculpture" },
      { year: "1987", event: "Received Ekushey Padak" },
      { year: "2000", event: "Major retrospective at Bangladesh National Museum" },
      { year: "2006", event: "Passed away in Dhaka" },
    ],
    famousWorks: [
      { title: "Swopno Senapati", year: "1974", medium: "Bronze", image: "/images/artworks/image_1.png" },
      { title: "Akanksha", year: "1980", medium: "Bronze", image: "/images/artworks/image_2.png" },
      { title: "Liberation Figures", year: "1973", medium: "Cast iron", image: "/images/artworks/images_3.png" },
      { title: "Mother and Child", year: "1985", medium: "Terracotta", image: "/images/artworks/image_4.png" },
      { title: "River Goddess", year: "1990", medium: "Bronze", image: "/images/artworks/image_5.png" },
      { title: "Eternal Flame", year: "1998", medium: "Steel and bronze", image: "/images/artworks/image_6.png" },
    ],
  },
  {
    slug: "monirul-islam",
    name: "Monirul Islam",
    banglaName: "মনিরুল ইসলাম",
    born: "1943",
    birthPlace: "Comilla, Bangladesh",
    nationality: "Bangladeshi",
    style: ["Printmaking", "Abstract", "Etching"],
    image: "/images/artists/Monirul Islam.png",
    coverImage: "/images/banners/banner_2.png",
    bio: "Monirul Islam is one of Bangladesh's most celebrated printmakers, based in Madrid since the 1970s. He has won international acclaim for his lyrical etchings that fuse Spanish and Bengali visual sensibilities.",
    longBio: `Monirul Islam (born 1943) is one of the most internationally acclaimed Bangladeshi artists alive — a printmaker and painter based in Madrid whose lyrical etchings are held in major collections across Europe, Asia, and the Americas.

Born in Comilla, he studied at the Government Institute of Fine Arts in Dhaka before moving to Spain in the early 1970s on a scholarship. He settled in Madrid, studied at the Escuela de Bellas Artes de San Fernando, and has remained there ever since — though Bangladesh remains at the heart of his artistic imagination.

His etchings are celebrated for their extraordinary delicacy — hair-thin lines, subtle tonal gradations, and a dreamlike quality that defies easy categorisation. They are at once abstract and deeply evocative, suggesting water, light, breath, memory. Spanish critics have called him a master of etching; Bangladeshi critics claim him as their finest printmaker.

He has exhibited extensively across Europe, North America, and Japan, and his work is held in the Bibliothèque nationale de France, the Victoria and Albert Museum, and the Bangladesh National Museum.

He received the Ekushey Padak in 1980 and Spain's prestigious Premio Nacional de Artes Gráficas.`,
    famousFor: "Internationally acclaimed etchings combining Spanish and Bengali visual traditions",
    awards: ["Ekushey Padak (1980)", "Premio Nacional de Artes Gráficas, Spain", "Bangladesh Independence Day Award"],
    education: ["Government Institute of Fine Arts, Dhaka", "Escuela de Bellas Artes de San Fernando, Madrid"],
    timeline: [
      { year: "1943", event: "Born in Comilla, Bangladesh" },
      { year: "1965", event: "Graduated from Government Institute of Fine Arts, Dhaka" },
      { year: "1973", event: "Scholarship to Spain; studied at Escuela de Bellas Artes, Madrid" },
      { year: "1978", event: "First major international exhibition in Madrid" },
      { year: "1980", event: "Received Ekushey Padak" },
      { year: "1990s", event: "Works acquired by Bibliothèque nationale de France and V&A" },
      { year: "2005", event: "Major retrospective in Dhaka and Madrid" },
    ],
    famousWorks: [
      { title: "Memory of Water", year: "1978", medium: "Etching", image: "/images/artworks/image_1.png" },
      { title: "Madrid Nocturne", year: "1982", medium: "Aquatint", image: "/images/artworks/image_2.png" },
      { title: "Bengal Dream", year: "1988", medium: "Etching & aquatint", image: "/images/artworks/images_3.png" },
      { title: "Silence II", year: "1993", medium: "Etching", image: "/images/artworks/image_4.png" },
      { title: "Light on Water", year: "2000", medium: "Aquatint", image: "/images/artworks/image_5.png" },
      { title: "Breath", year: "2008", medium: "Etching", image: "/images/artworks/image_6.png" },
    ],
    quote: "Etching is like writing a poem — every line must carry its weight.",
  },
  {
    slug: "aminul-islam",
    name: "Aminul Islam",
    banglaName: "আমিনুল ইসলাম",
    born: "1931",
    died: "2011",
    birthPlace: "Khulna, Bengal (now Bangladesh)",
    nationality: "Bangladeshi",
    style: ["Abstract", "Expressionism", "Oil Painting"],
    image: "/images/artists/image 50.png",
    coverImage: "/images/banners/banner_3.png",
    bio: "Aminul Islam was one of Bangladesh's most important abstract painters. Trained in Florence, he developed a distinctive style that synthesised Abstract Expressionism with the earthy palette of Bengal.",
    longBio: `Aminul Islam (1931–2011) was one of the founding generation of modern Bangladeshi abstract painters — a bold, instinctive artist whose large oil paintings pulsed with energy, texture, and colour.

Born in Khulna, he studied at the Government Institute of Fine Arts in Dhaka before winning a scholarship to study in Florence, Italy, at the Accademia di Belle Arti. The experience of Italian art — Renaissance masters, contemporary abstraction — transformed his practice.

Returning to Bangladesh, he joined the faculty of the Institute of Fine Arts, Dhaka, and began developing his mature abstract style: thick impasto surfaces, palette-knife passages, and a colour sensibility shaped by the Bengali landscape — terracotta reds, river greys, monsoon greens.

His paintings are characterised by their physicality — surfaces that seem to have been wrestled into being, bearing the marks of a struggle resolved. He moved freely between gestural abstraction and more composed pictorial structures, always maintaining the energy of direct mark-making.

He received the Ekushey Padak in 1988.`,
    famousFor: "Large-scale abstract oil paintings with distinctive Bengali earthy palette",
    awards: ["Ekushey Padak (1988)", "Bangladesh Shilpakala Academy Award", "Florence Academy Prize"],
    education: ["Government Institute of Fine Arts, Dhaka", "Accademia di Belle Arti, Florence"],
    timeline: [
      { year: "1931", event: "Born in Khulna, Bengal" },
      { year: "1956", event: "Graduated from Government Institute of Fine Arts, Dhaka" },
      { year: "1960", event: "Scholarship to Accademia di Belle Arti, Florence" },
      { year: "1965", event: "Returned to Dhaka; joined faculty of Institute of Fine Arts" },
      { year: "1971", event: "Created works responding to Bangladesh Liberation War" },
      { year: "1988", event: "Received Ekushey Padak" },
      { year: "2000", event: "Major retrospective at Bangladesh National Museum" },
      { year: "2011", event: "Passed away in Dhaka" },
    ],
    famousWorks: [
      { title: "Red Earth", year: "1965", medium: "Oil on canvas", image: "/images/artworks/image_1.png" },
      { title: "Abstract Bengal I", year: "1972", medium: "Oil on canvas", image: "/images/artworks/image_2.png" },
      { title: "Monsoon Abstraction", year: "1978", medium: "Oil on canvas", image: "/images/artworks/images_3.png" },
      { title: "Terra", year: "1985", medium: "Mixed media on canvas", image: "/images/artworks/image_4.png" },
      { title: "River Memory", year: "1993", medium: "Oil on canvas", image: "/images/artworks/image_5.png" },
      { title: "Late Work No. 3", year: "2005", medium: "Acrylic on canvas", image: "/images/artworks/image_6.png" },
    ],
  },
  {
    slug: "kazi-abdul-baset",
    name: "Kazi Abdul Baset",
    banglaName: "কাজী আবদুল বাসেত",
    born: "1943",
    died: "2012",
    birthPlace: "Faridpur, Bangladesh",
    nationality: "Bangladeshi",
    style: ["Printmaking", "Painting", "Drawing"],
    image: "/images/artists/image 51.png",
    coverImage: "/images/banners/banner_4.png",
    bio: "Kazi Abdul Baset was a celebrated Bangladeshi printmaker and painter who taught at the Faculty of Fine Arts, University of Dhaka for decades, shaping generations of Bangladeshi artists.",
    longBio: `Kazi Abdul Baset (1943–2012) was a dedicated printmaker, painter, and art educator who contributed significantly to the development of visual arts in Bangladesh. He studied at the Faculty of Fine Arts, University of Dhaka, and later trained in printmaking techniques abroad.

His work in printmaking — lithography, screenprint, and etching — was characterised by strong compositional sense and a deep connection to Bangladeshi folk motifs and landscape. He was particularly interested in the interplay between line and texture, creating prints of remarkable visual complexity.

As a teacher at the Faculty of Fine Arts, University of Dhaka, he influenced generations of students and played an important role in establishing printmaking as a respected discipline. His approach in the studio combined technical rigour with creative freedom.

Beyond printmaking, he produced paintings in oil and watercolour that showed a sensitive response to light and colour. He participated in numerous national and international exhibitions throughout his career.`,
    famousFor: "Printmaking and art education at Dhaka University Faculty of Fine Arts",
    awards: ["Bangladesh Shilpakala Academy Award", "Faculty of Fine Arts Award"],
    education: ["Faculty of Fine Arts, University of Dhaka"],
    timeline: [
      { year: "1943", event: "Born in Faridpur, Bangladesh" },
      { year: "1967", event: "Graduated from Faculty of Fine Arts, University of Dhaka" },
      { year: "1972", event: "Joined faculty of Fine Arts, University of Dhaka" },
      { year: "1980s", event: "Major printmaking series exhibited nationally" },
      { year: "1995", event: "Retrospective exhibition at Bangladesh Shilpakala Academy" },
      { year: "2012", event: "Passed away in Dhaka" },
    ],
    famousWorks: [
      { title: "Rural Forms I", year: "1970", medium: "Lithograph", image: "/images/artworks/image_1.png" },
      { title: "Village Screen", year: "1976", medium: "Screen print", image: "/images/artworks/image_2.png" },
      { title: "Bengal Pattern", year: "1982", medium: "Etching", image: "/images/artworks/images_3.png" },
      { title: "Morning Light", year: "1988", medium: "Watercolour", image: "/images/artworks/image_4.png" },
      { title: "Abstract Landscape", year: "1995", medium: "Oil on canvas", image: "/images/artworks/image_5.png" },
      { title: "Final Series No. 2", year: "2008", medium: "Mixed media", image: "/images/artworks/image_6.png" },
    ],
  },
  {
    slug: "syed-jahangir",
    name: "Syed Jahangir",
    banglaName: "সৈয়দ জাহাঙ্গীর",
    born: "1935",
    birthPlace: "Dhaka, Bangladesh",
    nationality: "Bangladeshi",
    style: ["Oil Painting", "Realism", "Figurative"],
    image: "/images/artists/image 52.png",
    coverImage: "/images/banners/banner_5.png",
    bio: "Syed Jahangir is a veteran Bangladeshi painter known for his sophisticated oil paintings that blend realism with lyrical abstraction. He has exhibited widely across Asia and Europe.",
    longBio: `Syed Jahangir (born 1935) is a senior figure in Bangladeshi art — a painter of elegant, considered oil works that have evolved over more than six decades from careful realism toward a looser, more lyrical pictorial language.

Born in Dhaka, he studied at the Government Institute of Fine Arts before going abroad to deepen his skills. His paintings span portraiture, landscape, still life, and abstraction, always marked by refined draughtsmanship and a sensitive approach to colour.

Jahangir was among the generation of artists who helped establish Bangladesh's visual art infrastructure after independence in 1971. He participated in founding exhibitions and teaching programmes that laid the groundwork for today's flourishing art scene.

His later works are particularly valued for their quality of light — luminous surfaces that seem to glow from within, achieving warmth through careful layering of translucent oil glazes. He has exhibited in Dhaka, Kolkata, London, and across Southeast Asia.`,
    famousFor: "Sophisticated oil paintings spanning realism and lyrical abstraction",
    awards: ["Bangladesh Shilpakala Academy Award", "Faculty of Fine Arts Award", "National Art Exhibition Prize"],
    education: ["Government Institute of Fine Arts, Dhaka"],
    timeline: [
      { year: "1935", event: "Born in Dhaka, Bangladesh" },
      { year: "1958", event: "Graduated from Government Institute of Fine Arts, Dhaka" },
      { year: "1965", event: "First major solo exhibition in Dhaka" },
      { year: "1972", event: "Participated in first post-independence national art exhibition" },
      { year: "1985", event: "International exhibitions in London and Southeast Asia" },
      { year: "2000", event: "Major retrospective at Bangladesh National Museum" },
      { year: "2010", event: "Lifetime Achievement Award from Bangladesh Shilpakala Academy" },
    ],
    famousWorks: [
      { title: "Portrait Study", year: "1962", medium: "Oil on canvas", image: "/images/artworks/image_1.png" },
      { title: "Old Dhaka", year: "1970", medium: "Oil on canvas", image: "/images/artworks/image_2.png" },
      { title: "River at Dawn", year: "1977", medium: "Oil on canvas", image: "/images/artworks/images_3.png" },
      { title: "Still Life with Pottery", year: "1984", medium: "Oil on canvas", image: "/images/artworks/image_4.png" },
      { title: "Light Study", year: "1995", medium: "Oil on canvas", image: "/images/artworks/image_5.png" },
      { title: "Evening", year: "2008", medium: "Oil on canvas", image: "/images/artworks/image_6.png" },
    ],
  },
  {
    slug: "sm-sultan",
    name: "S M Sultan",
    banglaName: "এস এম সুলতান",
    born: "10 August 1923",
    died: "10 October 1994",
    birthPlace: "Narail, Bengal (now Bangladesh)",
    nationality: "Bangladeshi",
    style: ["Expressionism", "Figurative", "Rural Realism"],
    image: "/images/artists/SM Sultan.png",
    coverImage: "/images/banners/banner_6.png",
    bio: "S M Sultan — Sheikh Muhammed Sultan — was a visionary Bangladeshi painter who depicted rural peasants as powerful, heroic figures. His ecstatic canvases of agricultural life transformed the Bengali farmer into a symbol of universal human dignity.",
    longBio: `Sheikh Muhammed Sultan (1923–1994), popularly known as S M Sultan or Laal Mia, was one of the most singular artistic voices of the subcontinent. He exhibited internationally in the late 1940s — in New York, London, and Karachi — yet chose to return to his village of Narail and live among its farmers and fisherfolk.

His large oil canvases portray Bangladeshi peasants with exaggerated musculature — a deliberate artistic manifesto. Where colonial representation diminished the rural Bengali, Sultan painted labourers as titans striding a fertile earth, celebrating their physical and moral power.

Sultan's colour sense was deeply Bengali — lush paddy greens, river blues, terracotta reds. He worked on an epic scale, his canvases sometimes several metres wide. He also ran a school for village children in Narail, teaching them art and music.

His work gained renewed international recognition in the 1980s and he received Bangladesh's highest honours before his death in 1994.`,
    famousFor: "Monumental paintings of muscular Bangladeshi peasants as symbols of human dignity",
    awards: ["Ekushey Padak (1982)", "Independence Day Award, Bangladesh (1993)", "Shilpakala Academy Award"],
    education: ["Government School of Art, Calcutta"],
    timeline: [
      { year: "1923", event: "Born in Narail, Bengal" },
      { year: "1941", event: "Enrolled in Government School of Art, Calcutta" },
      { year: "1946", event: "International exhibitions in New York and London" },
      { year: "1953", event: "Returned to Narail; chose village life over fame" },
      { year: "1969", event: "Established Children's Fantasy School, Narail" },
      { year: "1982", event: "Received Ekushey Padak" },
      { year: "1993", event: "Received Independence Day Award" },
      { year: "1994", event: "Passed away in Jessore" },
    ],
    famousWorks: [
      { title: "First Monsoon", year: "1974", medium: "Oil on canvas", image: "/images/artworks/image_1.png" },
      { title: "Harvest", year: "1975", medium: "Oil on canvas", image: "/images/artworks/image_2.png" },
      { title: "Char Dakhol", year: "1976", medium: "Oil on canvas", image: "/images/artworks/image_4.png" },
      { title: "Ploughmen", year: "1980", medium: "Oil on canvas", image: "/images/artworks/image_5.png" },
      { title: "Bengal Earth", year: "1985", medium: "Oil on canvas", image: "/images/artworks/image_6.png" },
      { title: "Village Festival", year: "1990", medium: "Oil on canvas", image: "/images/artworks/image_7.png" },
    ],
    quote: "I paint the peasants large because they are the ones who feed the world.",
  },
  {
    slug: "dilara-begum-jolly",
    name: "Dilara Begum Jolly",
    banglaName: "দিলারা বেগম জলি",
    born: "1952",
    birthPlace: "Dhaka, Bangladesh",
    nationality: "Bangladeshi",
    style: ["Painting", "Installation", "Mixed Media"],
    image: "/images/artists/Dilara Begum Jolly.png",
    coverImage: "/images/banners/banner_7.png",
    bio: "Dilara Begum Jolly is one of Bangladesh's leading contemporary women artists, known for richly layered paintings and installations that explore identity, womanhood, and cultural memory through bold colour and symbolism.",
    longBio: `Dilara Begum Jolly (born 1952) is among the most prominent women artists of Bangladesh — a painter and installation artist whose work engages deeply with questions of feminine identity, cultural tradition, and social transformation.

She studied at the Faculty of Fine Arts, University of Dhaka, where she later became a teacher and a mentor to generations of women artists. Her early paintings drew on folk traditions and floral motifs, arranged in dense, jewel-like compositions. Over time her work grew more complex — layered canvases incorporating text, fabric, and found objects alongside painting.

Her installations often address the condition of women in South Asian society — using saris, domestic objects, and photographic imagery to create immersive environments that are simultaneously beautiful and politically charged.

Jolly has been a pioneering figure in making space for women in Bangladesh's art world, and her teaching and advocacy have had a transformative impact on subsequent generations.`,
    famousFor: "Pioneering women's voice in Bangladeshi contemporary art and installation practice",
    awards: ["Bangladesh Shilpakala Academy Award", "Faculty of Fine Arts Award", "South Asian Women Artists Award"],
    education: ["Faculty of Fine Arts, University of Dhaka"],
    timeline: [
      { year: "1952", event: "Born in Dhaka, Bangladesh" },
      { year: "1976", event: "Graduated from Faculty of Fine Arts, University of Dhaka" },
      { year: "1980", event: "Joined Faculty of Fine Arts as teacher" },
      { year: "1990s", event: "Developed installation practice alongside painting" },
      { year: "2000", event: "International exhibitions in Europe and USA" },
      { year: "2010", event: "Major retrospective at Bangladesh National Museum" },
    ],
    famousWorks: [
      { title: "Feminine Cosmos", year: "1982", medium: "Oil on canvas", image: "/images/artworks/image_1.png" },
      { title: "Sari Series I", year: "1990", medium: "Mixed media installation", image: "/images/artworks/image_2.png" },
      { title: "Memory Garden", year: "1997", medium: "Oil on canvas", image: "/images/artworks/images_3.png" },
      { title: "Women's Voices", year: "2003", medium: "Installation", image: "/images/artworks/image_4.png" },
      { title: "Red Ground", year: "2008", medium: "Acrylic on canvas", image: "/images/artworks/image_5.png" },
      { title: "Inner Landscape", year: "2015", medium: "Mixed media", image: "/images/artworks/image_6.png" },
    ],
  },
  {
    slug: "farida-zaman",
    name: "Farida Zaman",
    banglaName: "ফরিদা জামান",
    born: "1956",
    birthPlace: "Dhaka, Bangladesh",
    nationality: "Bangladeshi",
    style: ["Painting", "Drawing", "Figurative"],
    image: "/images/artists/Farida Zaman.png",
    coverImage: "/images/banners/banner_1.png",
    bio: "Farida Zaman is a celebrated Bangladeshi painter and professor whose richly coloured figurative works explore womanhood, nature, and cultural identity with lyrical intensity.",
    longBio: `Farida Zaman (born 1956) is one of Bangladesh's most respected contemporary painters — a figurative artist of lyrical intensity whose canvases weave together images of women, nature, birds, and flowers into dense, patterned compositions.

She studied at the Faculty of Fine Arts, University of Dhaka, and later taught there for many years, becoming a Professor and Head of Department. Her influence on Bangladeshi art through teaching has been profound.

Her paintings draw on diverse sources — folk textiles, miniature painting traditions, Art Nouveau, and contemporary figurative art — combining them into a personal visual language of great richness. Her women are often shown in contemplative states, surrounded by organic forms: vines, petals, fish, birds. Colour is used boldly and symbolically.

She has exhibited extensively across South Asia, Europe, and North America, and her work is held in major public and private collections.`,
    famousFor: "Lyrical figurative paintings exploring womanhood and nature through rich pattern and colour",
    awards: ["Ekushey Padak", "Bangladesh Shilpakala Academy Award", "Faculty of Fine Arts Distinguished Teaching Award"],
    education: ["Faculty of Fine Arts, University of Dhaka"],
    timeline: [
      { year: "1956", event: "Born in Dhaka, Bangladesh" },
      { year: "1980", event: "Graduated from Faculty of Fine Arts, University of Dhaka" },
      { year: "1984", event: "Joined Faculty of Fine Arts as teacher" },
      { year: "1995", event: "International exhibitions in Europe" },
      { year: "2005", event: "Appointed Professor and Head of Department" },
      { year: "2012", event: "Major retrospective in Dhaka" },
    ],
    famousWorks: [
      { title: "Woman in Garden", year: "1985", medium: "Oil on canvas", image: "/images/artworks/image_1.png" },
      { title: "Floral Figure", year: "1992", medium: "Oil on canvas", image: "/images/artworks/image_2.png" },
      { title: "Bird and Woman", year: "1998", medium: "Acrylic on canvas", image: "/images/artworks/images_3.png" },
      { title: "Nature's Embrace", year: "2004", medium: "Oil on canvas", image: "/images/artworks/image_4.png" },
      { title: "Pattern of Life", year: "2010", medium: "Mixed media", image: "/images/artworks/image_5.png" },
      { title: "Green Season", year: "2017", medium: "Acrylic on canvas", image: "/images/artworks/image_6.png" },
    ],
  },
  {
    slug: "nisar-hossain",
    name: "Nisar Hossain",
    banglaName: "নিসার হোসেন",
    born: "1954",
    birthPlace: "Dhaka, Bangladesh",
    nationality: "Bangladeshi",
    style: ["Painting", "Drawing", "Social Realism"],
    image: "/images/artists/Nisar Hossain.png",
    coverImage: "/images/banners/banner_2.png",
    bio: "Nisar Hossain is a prominent Bangladeshi painter whose figurative and semi-abstract works engage with social issues, urban life, and the human condition, rendered through expressive draughtsmanship.",
    longBio: `Nisar Hossain (born 1954) is a senior figure in Bangladeshi contemporary art — a painter and draughtsman whose work has consistently engaged with the social realities of Bangladeshi life: poverty, labour, urban transformation, and the resilience of ordinary people.

He studied at the Faculty of Fine Arts, University of Dhaka, and joined its faculty as a teacher, where he spent most of his professional career. His paintings and drawings show strong figurative instincts — expressively drawn human forms placed in compressed, energetic compositions.

His palette tends toward earthy, sombre tones, but is punctuated by passages of vivid colour that create dramatic contrasts. His works on paper — ink drawings, charcoal studies — are particularly valued for their economy of line.

He has exhibited widely in Bangladesh and internationally, and his work is part of major Bangladeshi public collections.`,
    famousFor: "Socially engaged figurative painting and expressive draughtsmanship",
    awards: ["Bangladesh Shilpakala Academy Award", "Faculty of Fine Arts Award"],
    education: ["Faculty of Fine Arts, University of Dhaka"],
    timeline: [
      { year: "1954", event: "Born in Dhaka, Bangladesh" },
      { year: "1978", event: "Graduated from Faculty of Fine Arts, University of Dhaka" },
      { year: "1982", event: "Joined Faculty of Fine Arts as teacher" },
      { year: "1992", event: "First major solo exhibition in Dhaka" },
      { year: "2003", event: "International exhibition participation" },
      { year: "2010", event: "Retrospective at Dhaka Art Centre" },
    ],
    famousWorks: [
      { title: "Urban Crowd", year: "1983", medium: "Oil on canvas", image: "/images/artworks/image_1.png" },
      { title: "Working Man", year: "1990", medium: "Charcoal on paper", image: "/images/artworks/image_2.png" },
      { title: "City Fragments", year: "1997", medium: "Oil on canvas", image: "/images/artworks/images_3.png" },
      { title: "Human Condition", year: "2003", medium: "Mixed media", image: "/images/artworks/image_4.png" },
      { title: "Market Day", year: "2009", medium: "Oil on canvas", image: "/images/artworks/image_5.png" },
      { title: "Labour", year: "2015", medium: "Acrylic on canvas", image: "/images/artworks/image_6.png" },
    ],
  },
  {
    slug: "novera-ahmed",
    name: "Novera Ahmed",
    banglaName: "নভেরা আহমেদ",
    born: "1930",
    died: "5 May 2015",
    birthPlace: "Jessore, Bengal (now Bangladesh)",
    nationality: "Bangladeshi",
    style: ["Sculpture", "Abstract", "Figurative"],
    image: "/images/artists/Novera Ahmed.png",
    coverImage: "/images/banners/banner_3.png",
    bio: "Novera Ahmed was the first modern sculptor of Bangladesh — a pioneering figure who studied in London and Florence, created iconic public sculptures in Dhaka, and then lived in voluntary exile in Paris for four decades.",
    longBio: `Novera Ahmed (1930–2015) was Bangladesh's first modern sculptor and one of the most remarkable — and elusive — artists of the subcontinent. She studied sculpture in London at the Camberwell School of Arts and Crafts, then in Florence, before returning to East Pakistan in the late 1950s.

With her collaborator Hamidur Rahman, she designed the Central Shaheed Minar (Martyr's Monument) in Dhaka — the iconic structure that became the most important symbol of the Bengali language movement and, later, of Bangladesh itself. She also created an extraordinary series of sculptures depicting everyday Bengali life: terracotta figures of fishermen, mothers, children, and labourers rendered with modernist simplicity and deep empathy.

In 1970, she left for Europe and settled in Paris, where she lived for over forty years in near-total seclusion from the Bangladeshi art world. She continued to work but showed rarely. Her return to public consciousness came through retrospective research by younger Bangladeshi art historians, who recovered and documented her extensive early body of work.

She died in Paris in 2015 — a giant of Bangladesh's cultural heritage, belatedly recognised.`,
    famousFor: "Central Shaheed Minar design, first modern sculptor of Bangladesh, terracotta figure series",
    awards: ["Ekushey Padak (1997, awarded in absentia)", "Independence Day Award, Bangladesh (2013)"],
    education: ["Camberwell School of Arts and Crafts, London", "Accademia di Belle Arti, Florence"],
    timeline: [
      { year: "1930", event: "Born in Jessore, Bengal" },
      { year: "1951", event: "Studied sculpture at Camberwell School of Arts, London" },
      { year: "1955", event: "Advanced studies in Florence" },
      { year: "1957", event: "Returned to East Pakistan; began major sculpture projects" },
      { year: "1963", event: "Co-designed Central Shaheed Minar, Dhaka" },
      { year: "1970", event: "Left for Europe; settled in Paris" },
      { year: "1997", event: "Received Ekushey Padak (awarded in absentia)" },
      { year: "2015", event: "Passed away in Paris" },
    ],
    famousWorks: [
      { title: "Shaheed Minar Design", year: "1963", medium: "Architecture & sculpture", image: "/images/artworks/image_1.png" },
      { title: "Fisherman", year: "1958", medium: "Terracotta", image: "/images/artworks/image_2.png" },
      { title: "Mother and Child", year: "1960", medium: "Terracotta", image: "/images/artworks/images_3.png" },
      { title: "Village Woman", year: "1961", medium: "Terracotta", image: "/images/artworks/image_4.png" },
      { title: "Abstract Figure", year: "1965", medium: "Bronze", image: "/images/artworks/image_5.png" },
      { title: "Paris Study", year: "1985", medium: "Mixed media", image: "/images/artworks/image_6.png" },
    ],
    quote: "Sculpture is the art of silence — it speaks without words.",
  },
  {
    slug: "murtaja-baseer",
    name: "Murtaja Baseer",
    banglaName: "মুর্তজা বশীর",
    born: "17 August 1932",
    died: "15 August 2020",
    birthPlace: "Dhaka, Bengal (now Bangladesh)",
    nationality: "Bangladeshi",
    style: ["Painting", "Printmaking", "Abstract"],
    image: "/images/artists/Murtaja Baseer.png",
    coverImage: "/images/banners/banner_4.png",
    bio: "Murtaja Baseer was a multi-faceted Bangladeshi artist, filmmaker, and intellectual — celebrated for his Gate series, Tablet series, and Epitaph series, as well as pioneering films about Bengali visual culture.",
    longBio: `Murtaja Baseer (1932–2020) was one of the most intellectually and artistically complex figures of Bangladeshi cultural life — a painter, printmaker, filmmaker, numismatist, and writer whose career spanned seven decades.

Son of the noted Bengali scholar Dr. Muhammad Shahidullah, he studied at the Government Institute of Fine Arts in Dhaka, then in Florence at the Accademia di Belle Arti. He later worked and studied in Paris, where he encountered the European avant-garde and developed the abstract sensibility that would mark his mature painting.

His most celebrated series include: the Gate series (large paintings evoking ancient portals and thresholds), the Tablet series (works resembling inscribed stone tablets, exploring writing, memory, and history), and the Epitaph series (dark, funerary meditations on mortality and the Language Movement martyrs of 1952).

He also made documentary films about Bangladeshi art and cultural heritage, and was a serious collector and scholar of ancient Bengali coins.

He received the Ekushey Padak in 1980.`,
    famousFor: "Gate series, Tablet series, Epitaph series, and documentary films on Bangladeshi culture",
    awards: ["Ekushey Padak (1980)", "Independence Day Award, Bangladesh (2019)", "Bangladesh Shilpakala Academy Award"],
    education: ["Government Institute of Fine Arts, Dhaka", "Accademia di Belle Arti, Florence", "Paris (residency)"],
    timeline: [
      { year: "1932", event: "Born in Dhaka, Bengal" },
      { year: "1954", event: "Graduated from Government Institute of Fine Arts, Dhaka" },
      { year: "1958", event: "Studies in Florence at Accademia di Belle Arti" },
      { year: "1963", event: "Paris residency; engagement with European abstraction" },
      { year: "1971", event: "Created Epitaph series responding to Liberation War" },
      { year: "1975", event: "Began Gate series" },
      { year: "1980", event: "Received Ekushey Padak" },
      { year: "1990s", event: "Tablet series and documentary film work" },
      { year: "2020", event: "Passed away in Dhaka" },
    ],
    famousWorks: [
      { title: "Gate No. 1", year: "1975", medium: "Oil on canvas", image: "/images/artworks/image_1.png" },
      { title: "Epitaph", year: "1972", medium: "Oil on canvas", image: "/images/artworks/image_2.png" },
      { title: "Tablet Series I", year: "1990", medium: "Mixed media on canvas", image: "/images/artworks/images_3.png" },
      { title: "Ancient Script", year: "1995", medium: "Oil on canvas", image: "/images/artworks/image_4.png" },
      { title: "Gate No. 7", year: "1985", medium: "Oil on canvas", image: "/images/artworks/image_5.png" },
      { title: "Memory Stone", year: "2005", medium: "Mixed media", image: "/images/artworks/image_6.png" },
    ],
    quote: "Art is the most honest form of history.",
  },
  {
    slug: "mohammed-eunus",
    name: "Mohammed Eunus",
    banglaName: "মোহাম্মদ ইউনুস",
    born: "1950",
    birthPlace: "Dhaka, Bangladesh",
    nationality: "Bangladeshi",
    style: ["Painting", "Drawing", "Figurative"],
    image: "/images/artists/Mohammad Eunus.png",
    coverImage: "/images/banners/banner_5.png",
    bio: "Mohammed Eunus is a noted Bangladeshi painter and educator whose figurative works capture the textures of everyday Bangladeshi life with sensitivity and formal discipline.",
    longBio: `Mohammed Eunus (born 1950) is a respected Bangladeshi painter and art educator whose career has spanned painting, drawing, and art education at the Faculty of Fine Arts, University of Dhaka.

His figurative paintings are characterised by careful observation of light and shadow, a muted but sophisticated palette, and a sensitivity to the quiet dignity of everyday subjects — figures at rest, interior spaces, still life arrangements. He works primarily in oil on canvas and watercolour.

As a teacher, he has influenced many younger artists through his emphasis on rigorous draughtsmanship and careful observation of the visible world. His approach is disciplined but never dry — his best works carry genuine emotional warmth.

He has participated in national and group exhibitions across Bangladesh and South Asia over several decades.`,
    famousFor: "Sensitive figurative paintings and dedicated art education at Dhaka University",
    awards: ["Bangladesh Shilpakala Academy Award", "Faculty of Fine Arts Award"],
    education: ["Faculty of Fine Arts, University of Dhaka"],
    timeline: [
      { year: "1950", event: "Born in Dhaka, Bangladesh" },
      { year: "1975", event: "Graduated from Faculty of Fine Arts, University of Dhaka" },
      { year: "1980", event: "Joined Faculty of Fine Arts as teacher" },
      { year: "1990", event: "First major solo exhibition" },
      { year: "2000", event: "Group exhibitions across South Asia" },
      { year: "2012", event: "Retrospective in Dhaka" },
    ],
    famousWorks: [
      { title: "Quiet Interior", year: "1978", medium: "Oil on canvas", image: "/images/artworks/image_1.png" },
      { title: "Figure Study", year: "1985", medium: "Charcoal on paper", image: "/images/artworks/image_2.png" },
      { title: "Still Life", year: "1992", medium: "Oil on canvas", image: "/images/artworks/images_3.png" },
      { title: "Afternoon Light", year: "1999", medium: "Watercolour", image: "/images/artworks/image_4.png" },
      { title: "Seated Woman", year: "2006", medium: "Oil on canvas", image: "/images/artworks/image_5.png" },
      { title: "Late Evening II", year: "2014", medium: "Oil on canvas", image: "/images/artworks/image_6.png" },
    ],
  },
  {
    slug: "shahabuddin-ahmed",
    name: "Shahabuddin Ahmed",
    banglaName: "শাহাবুদ্দিন আহমেদ",
    born: "15 September 1950",
    birthPlace: "Narsingdi, Bangladesh",
    nationality: "Bangladeshi",
    style: ["Expressionism", "Figurative", "Dynamic Realism"],
    image: "/images/artists/Shahabuddin Ahmed.png",
    coverImage: "/images/banners/banner_6.png",
    bio: "Shahabuddin Ahmed is one of Bangladesh's most internationally celebrated living painters, based in Paris since 1974. His monumental canvases of dynamic, airborne figures — inspired by the liberation fighters of 1971 — are iconic worldwide.",
    longBio: `Shahabuddin Ahmed (born 1950) is Bangladesh's most internationally renowned living painter — a Parisian-based artist whose explosive, gestural canvases of leaping, striding human figures have made him famous across Europe, Japan, and the Americas.

He participated in the Bangladesh Liberation War of 1971 as a freedom fighter (Muktijoddha). This experience was foundational — the memory of men in motion, fighting and dying for freedom, became the central subject of his life's work. In 1974 he moved to Paris on a scholarship and settled there permanently.

His paintings are immediately recognisable: large canvases dominated by a single dynamic male figure — arms outstretched, body twisting, caught in an instant of maximal physical and emotional intensity. The backgrounds are loose, gestural, atmospheric. The figures are painted with rapid, confident brushwork in rich earth tones and ochres, catching light along the edges of muscles and limbs.

He has received France's highest cultural honour, the Officier de l'Ordre des Arts et des Lettres, and his work is held in major museums and private collections worldwide including the Musée d'Art Moderne de Paris. He received Bangladesh's Independence Day Award in 2000.`,
    famousFor: "Dynamic figurative paintings of freedom fighters; most internationally renowned living Bangladeshi painter",
    awards: [
      "Independence Day Award, Bangladesh (2000)",
      "Ekushey Padak (1996)",
      "Officier de l'Ordre des Arts et des Lettres, France",
      "Grand Prix International de Peinture, Cannes",
    ],
    education: ["Faculty of Fine Arts, University of Dhaka", "École nationale supérieure des Beaux-Arts, Paris"],
    timeline: [
      { year: "1950", event: "Born in Narsingdi, Bangladesh" },
      { year: "1971", event: "Participated in Bangladesh Liberation War as freedom fighter" },
      { year: "1973", event: "Graduated from Faculty of Fine Arts, University of Dhaka" },
      { year: "1974", event: "Scholarship to Paris; settled in France" },
      { year: "1983", event: "First major European solo exhibition in Paris" },
      { year: "1996", event: "Received Ekushey Padak" },
      { year: "2000", event: "Received Independence Day Award; major international recognition" },
      { year: "2010", event: "Works acquired by Musée d'Art Moderne de Paris" },
    ],
    famousWorks: [
      { title: "Freedom Fighter", year: "1977", medium: "Oil on canvas", image: "/images/artworks/image_1.png" },
      { title: "Liberation", year: "1982", medium: "Oil on canvas", image: "/images/artworks/image_2.png" },
      { title: "Running Man", year: "1988", medium: "Oil on canvas", image: "/images/artworks/images_3.png" },
      { title: "Dynamic Figure I", year: "1995", medium: "Oil on canvas", image: "/images/artworks/image_4.png" },
      { title: "Ecstasy", year: "2003", medium: "Oil on canvas", image: "/images/artworks/image_5.png" },
      { title: "Man in Motion", year: "2012", medium: "Oil on canvas", image: "/images/artworks/image_6.png" },
    ],
    quote: "My figures leap because freedom itself is not static — it must be fought for, again and again.",
  },
  {
    slug: "shahid-kabir",
    name: "Shahid Kabir",
    banglaName: "শহীদ কবীর",
    born: "1943",
    died: "2019",
    birthPlace: "Dhaka, Bangladesh",
    nationality: "Bangladeshi",
    style: ["Painting", "Expressionism", "Figurative"],
    image: "/images/artists/Shahid Kabir.png",
    coverImage: "/images/banners/banner_7.png",
    bio: "Shahid Kabir was a senior Bangladeshi painter known for his gestural figurative paintings and his long career as an art educator at the Faculty of Fine Arts, University of Dhaka.",
    longBio: `Shahid Kabir (1943–2019) was a respected Bangladeshi painter and art educator who spent his professional life painting and teaching at the Faculty of Fine Arts, University of Dhaka.

His paintings are characterised by expressive figuration — loosely rendered human forms placed in ambiguous, emotionally charged spaces. He worked primarily in oil on canvas, favouring a relatively muted palette enlivened by selective passages of vivid colour.

Over his long career he produced a substantial body of work spanning portraiture, figurative composition, and semi-abstract painting. He was known as a dedicated teacher who emphasised creative freedom alongside technical discipline.

He participated in numerous national exhibitions and contributed to the development of Bangladeshi art through both his creative work and his teaching.`,
    famousFor: "Expressive figurative painting and long dedication to art education in Bangladesh",
    awards: ["Bangladesh Shilpakala Academy Award", "Faculty of Fine Arts Lifetime Award"],
    education: ["Faculty of Fine Arts, University of Dhaka"],
    timeline: [
      { year: "1943", event: "Born in Dhaka, Bangladesh" },
      { year: "1967", event: "Graduated from Faculty of Fine Arts, University of Dhaka" },
      { year: "1970", event: "Joined Faculty of Fine Arts as teacher" },
      { year: "1985", event: "Major solo exhibition in Dhaka" },
      { year: "2000", event: "Retrospective at Bangladesh Shilpakala Academy" },
      { year: "2019", event: "Passed away in Dhaka" },
    ],
    famousWorks: [
      { title: "Figure Composition I", year: "1970", medium: "Oil on canvas", image: "/images/artworks/image_1.png" },
      { title: "Portrait", year: "1978", medium: "Oil on canvas", image: "/images/artworks/image_2.png" },
      { title: "Abstract Figure", year: "1985", medium: "Oil on canvas", image: "/images/artworks/images_3.png" },
      { title: "Composition", year: "1993", medium: "Mixed media", image: "/images/artworks/image_4.png" },
      { title: "Late Painting", year: "2005", medium: "Oil on canvas", image: "/images/artworks/image_5.png" },
      { title: "Final Series", year: "2015", medium: "Acrylic on canvas", image: "/images/artworks/image_6.png" },
    ],
  },
  {
    slug: "abdus-shakoor",
    name: "Abdus Shakoor",
    banglaName: "আবদুস শাকুর শাহ",
    born: "1941",
    birthPlace: "Sylhet, Bangladesh",
    nationality: "Bangladeshi",
    style: ["Painting", "Abstract", "Nature-Inspired"],
    image: "/images/artists/Abdus Shakoor Shah.png",
    coverImage: "/images/banners/banner_1.png",
    bio: "Abdus Shakoor Shah is a senior Bangladeshi painter whose meditative abstract canvases draw on the natural world — especially water, light, and organic form — to create works of quiet profundity.",
    longBio: `Abdus Shakoor Shah (born 1941) is a senior Bangladeshi painter based in Sylhet, whose work stands somewhat apart from the Dhaka-centred mainstream of Bangladeshi art — drawing on the particular landscape and spiritual character of the Sylhet region.

He studied at the Faculty of Fine Arts, University of Dhaka, before returning to his home region. His paintings are meditative and nature-inspired — semi-abstract canvases in which forms suggest water, mist, hills, and light without literally depicting them. His palette is characteristically soft and luminous: pale greens, misty blues, warm ochres.

His work has a contemplative quality rooted in his deep attachment to the natural world of northeast Bangladesh — the rivers, forests, and tea gardens of the Sylhet region. He has exhibited in Dhaka and internationally, and is regarded as a significant regional voice in Bangladeshi contemporary art.`,
    famousFor: "Meditative abstract paintings inspired by Sylhet's landscape and natural world",
    awards: ["Bangladesh Shilpakala Academy Award", "Regional Art Award, Sylhet"],
    education: ["Faculty of Fine Arts, University of Dhaka"],
    timeline: [
      { year: "1941", event: "Born in Sylhet, Bangladesh" },
      { year: "1966", event: "Graduated from Faculty of Fine Arts, University of Dhaka" },
      { year: "1970", event: "Returned to Sylhet; began independent practice" },
      { year: "1985", event: "First major Dhaka solo exhibition" },
      { year: "2000", event: "International exhibitions" },
      { year: "2010", event: "Major retrospective in Sylhet and Dhaka" },
    ],
    famousWorks: [
      { title: "Mist and Water", year: "1975", medium: "Oil on canvas", image: "/images/artworks/image_1.png" },
      { title: "Tea Garden", year: "1982", medium: "Oil on canvas", image: "/images/artworks/image_2.png" },
      { title: "River at Dusk", year: "1990", medium: "Watercolour", image: "/images/artworks/images_3.png" },
      { title: "Green Silence", year: "1998", medium: "Oil on canvas", image: "/images/artworks/image_4.png" },
      { title: "Morning Fog", year: "2006", medium: "Mixed media", image: "/images/artworks/image_5.png" },
      { title: "Light on Leaves", year: "2015", medium: "Oil on canvas", image: "/images/artworks/image_6.png" },
    ],
  },
  {
    slug: "quamrul-hassan",
    name: "Quamrul Hassan",
    banglaName: "কামরুল হাসান",
    born: "2 December 1921",
    died: "2 February 1988",
    birthPlace: "Calcutta, Bengal (now India)",
    nationality: "Bangladeshi",
    style: ["Folk Art", "Political Art", "Painting"],
    image: "/images/artists/Quamrul Hassan.png",
    coverImage: "/images/banners/banner_2.png",
    bio: "Quamrul Hassan, known as Potua (folk painter), was a towering Bangladeshi artist celebrated for his bold folk-inspired paintings and his famous 1971 Liberation War poster depicting Pakistani generals as animals — one of the most iconic political images in South Asian history.",
    longBio: `Quamrul Hassan (1921–1988), known affectionately as Potua (folk painter), was one of the most beloved and politically engaged artists of Bangladesh. He was a painter whose work synthesised the bold simplicity of Bengali folk art traditions — especially the Patachitra scroll paintings and Kalighat paintings — with the urgency of political commitment.

He studied at the Government School of Art in Calcutta before becoming one of the founding teachers at the Government Institute of Fine Arts in Dhaka in 1948, where he was a colleague of Zainul Abedin and Safiuddin Ahmed.

His most famous image — created during the Bangladesh Liberation War of 1971 — depicts the military leaders of Pakistan as grotesque animals devouring the Bangladeshi people. This poster, produced under enormous personal risk, became one of the most potent political images in South Asian history and was circulated widely during and after the war.

His paintings outside the political sphere are characterised by their joyful, bold folk aesthetic — bright primary colours, stylised figures, intricate folk motifs. He painted rural life, festivals, and figures in a manner that celebrated the Bengali visual heritage.

He died at his drawing board in 1988, reportedly still working. He received the Ekushey Padak in 1962.`,
    famousFor: "1971 Liberation War political poster depicting Pakistani generals as animals; folk art synthesis",
    awards: ["Ekushey Padak (1962)", "Independence Day Award, Bangladesh (posthumous)", "Shilpakala Academy Award"],
    education: ["Government School of Art, Calcutta"],
    timeline: [
      { year: "1921", event: "Born in Calcutta, Bengal" },
      { year: "1945", event: "Graduated from Government School of Art, Calcutta" },
      { year: "1948", event: "Joined founding faculty of Government Institute of Fine Arts, Dhaka" },
      { year: "1962", event: "Received Ekushey Padak" },
      { year: "1971", event: "Created iconic Liberation War political poster" },
      { year: "1975", event: "Co-founded Bangladesh Chhayanaut cultural organisation" },
      { year: "1982", event: "Major retrospective of folk and political works" },
      { year: "1988", event: "Passed away at his drawing board in Dhaka" },
    ],
    famousWorks: [
      { title: "Liberation War Poster", year: "1971", medium: "Ink on paper", image: "/images/artworks/image_1.png" },
      { title: "Folk Festival", year: "1958", medium: "Oil on canvas", image: "/images/artworks/image_2.png" },
      { title: "Rural Women", year: "1965", medium: "Oil on canvas", image: "/images/artworks/images_3.png" },
      { title: "Boat Race", year: "1970", medium: "Oil on canvas", image: "/images/artworks/image_4.png" },
      { title: "Village Life", year: "1978", medium: "Tempera on board", image: "/images/artworks/image_5.png" },
      { title: "Bengal Folk", year: "1984", medium: "Oil on canvas", image: "/images/artworks/image_6.png" },
    ],
    quote: "I am a Potua — a folk painter. I paint for my people.",
  },
  {
    slug: "kalidas-karmakar",
    name: "Kalidas Karmakar",
    banglaName: "কালিদাস কর্মকার",
    born: "20 October 1946",
    birthPlace: "Barisal, Bangladesh",
    nationality: "Bangladeshi",
    style: ["Printmaking", "Painting", "Mixed Media"],
    image: "/images/artists/image 23.png",
    coverImage: "/images/banners/banner_3.png",
    bio: "Kalidas Karmakar is one of Bangladesh's foremost printmakers and painters — a prolific and technically masterful artist whose work spans printmaking, painting, and mixed media, rooted in Bengali folk tradition and contemporary abstraction.",
    longBio: `Kalidas Karmakar (born 1946) is a senior Bangladeshi artist of remarkable versatility and productivity — a printmaker, painter, and mixed-media artist whose career has spanned more than five decades and produced an extraordinarily large body of work.

He studied at the Faculty of Fine Arts, University of Dhaka, and later at Goldsmiths College in London and in Paris, where he immersed himself in European printmaking traditions. Returning to Bangladesh, he joined the Faculty of Fine Arts and taught there for many years.

His printmaking — woodcuts, etchings, lithographs — draws on Bengali folk visual tradition, Hindu iconography, and modernist abstraction. His images often pulse with a raw, elemental energy: figures, animals, and organic forms rendered in bold lines and vivid colour. He is particularly celebrated for his large-format woodcuts.

His paintings show the same energy and folk-rooted symbolism, but in oil and acrylic. He has exhibited extensively in Bangladesh, India, Europe, and Japan, and is represented in major collections worldwide.

He received the Ekushey Padak in 1997.`,
    famousFor: "Large-format woodcuts and prolific output spanning printmaking, painting, and mixed media",
    awards: ["Ekushey Padak (1997)", "Bangladesh Shilpakala Academy Award", "International Print Biennale Prizes"],
    education: ["Faculty of Fine Arts, University of Dhaka", "Goldsmiths College, London", "Paris (residency)"],
    timeline: [
      { year: "1946", event: "Born in Barisal, Bangladesh" },
      { year: "1970", event: "Graduated from Faculty of Fine Arts, University of Dhaka" },
      { year: "1975", event: "Studies in London at Goldsmiths College" },
      { year: "1978", event: "Paris residency; major printmaking development" },
      { year: "1982", event: "Joined Faculty of Fine Arts, University of Dhaka" },
      { year: "1990s", event: "International print biennale participation and prizes" },
      { year: "1997", event: "Received Ekushey Padak" },
      { year: "2005", event: "Major retrospective in Dhaka and abroad" },
    ],
    famousWorks: [
      { title: "Woodcut Series I", year: "1978", medium: "Woodcut", image: "/images/artworks/image_1.png" },
      { title: "Folk God", year: "1983", medium: "Woodcut", image: "/images/artworks/image_2.png" },
      { title: "Earth Forms", year: "1989", medium: "Lithograph", image: "/images/artworks/images_3.png" },
      { title: "Animal Spirit", year: "1995", medium: "Woodcut", image: "/images/artworks/image_4.png" },
      { title: "Bengal Myth", year: "2003", medium: "Mixed media print", image: "/images/artworks/image_5.png" },
      { title: "Fire and Earth", year: "2012", medium: "Woodcut & oil", image: "/images/artworks/image_6.png" },
    ],
    quote: "A woodcut is an act of faith — you commit every mark, you cannot erase.",
  },
];
