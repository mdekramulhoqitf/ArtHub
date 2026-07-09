export interface UniversityArtwork {
  id: string;
  title: string;
  artist: string;
  artistBangla?: string;
  year: string;
  date?: string;
  medium: string;
  image: string;
  category: string;
  team?: string;
  department?: string;
  whyCreated: string;
  description: string;
  tags: string[];
}

export interface University {
  slug: string;
  name: string;
  nameBangla: string;
  shortName: string;
  established: string;
  location: string;
  departmentName: string;
  image: string;
  coverImage: string;
  about: string;
  website?: string;
  totalArtworks: number;
  artworks: UniversityArtwork[];
}

export const UNIVERSITIES: University[] = [
  {
    slug: "dhaka-university",
    name: "University of Dhaka",
    nameBangla: "ঢাকা বিশ্ববিদ্যালয়",
    shortName: "DU",
    established: "1921",
    location: "Dhaka",
    departmentName: "Faculty of Fine Arts (Charukala)",
    image: "/images/banners/banner_1.png",
    coverImage: "/images/banners/banner_1.png",
    about:
      "The Faculty of Fine Arts (Charukala O Kanakaladiploma) at Dhaka University is the oldest and most prestigious fine arts faculty in Bangladesh, founded by Zainul Abedin in 1948. It has produced generations of Bangladesh's greatest artists, sculptors, and designers.",
    website: "https://du.ac.bd",
    totalArtworks: 6,
    artworks: [
      {
        id: "du-001",
        title: "Bengal Famine Sketches",
        artist: "Zainul Abedin",
        artistBangla: "জয়নুল আবেদিন",
        year: "1943",
        date: "1943",
        medium: "Charcoal on paper",
        image: "/images/artworks/image_1.png",
        category: "Drawing",
        department: "Drawing & Painting",
        team: "Zainul Abedin (solo work)",
        whyCreated:
          "Abedin witnessed the 1943 Bengal famine firsthand in Calcutta. He drew compulsively as an act of testimony — to document the human cost of colonial policy failure and wartime neglect. The works were an urgent moral response to mass death.",
        description:
          "A series of harrowing charcoal drawings depicting victims of the 1943 Bengal famine. Considered the founding masterwork of Bangladeshi modern art and among the most powerful social documents in South Asian art history.",
        tags: ["famine", "charcoal", "social realism", "historical", "zainul abedin"],
      },
      {
        id: "du-002",
        title: "Nabanna (New Harvest)",
        artist: "Zainul Abedin",
        artistBangla: "জয়নুল আবেদিন",
        year: "1955",
        date: "1955",
        medium: "Watercolor on paper",
        image: "/images/artworks/image_2.png",
        category: "Painting",
        department: "Drawing & Painting",
        team: "Zainul Abedin (solo work)",
        whyCreated:
          "Created to celebrate rural Bengali life and the harvest season. After years of depicting suffering, Abedin turned to the joy and vitality of village culture as a way of affirming Bangladesh's folk heritage.",
        description:
          "Vibrant watercolor depicting rural harvest celebration. One of Abedin's most beloved works, capturing the rhythm and color of village life in Bangladesh.",
        tags: ["watercolor", "rural life", "harvest", "folk", "zainul abedin"],
      },
      {
        id: "du-003",
        title: "Manpura",
        artist: "Zainul Abedin",
        artistBangla: "জয়নুল আবেদিন",
        year: "1970",
        date: "November 1970",
        medium: "Ink on paper scroll",
        image: "/images/artworks/image_3.png",
        category: "Scroll Painting",
        department: "Drawing & Painting",
        team: "Zainul Abedin (solo work)",
        whyCreated:
          "Created after the catastrophic 1970 Bhola cyclone that killed over 500,000 people in the Manpura coastal region. A 32-foot scroll painted in grief and outrage at government inaction in the face of mass death.",
        description:
          "A monumental 32-foot ink scroll painting depicting the destruction wrought by the 1970 Bhola cyclone. One of the great protest works in Bangladesh's artistic history.",
        tags: ["cyclone", "disaster", "ink", "scroll", "protest", "manpura"],
      },
      {
        id: "du-004",
        title: "The Survivor",
        artist: "Aminul Islam",
        artistBangla: "আমিনুল ইসলাম",
        year: "1971",
        date: "1971",
        medium: "Oil on canvas",
        image: "/images/artworks/image_4.png",
        category: "Painting",
        department: "Drawing & Painting",
        team: "Faculty of Fine Arts — Liberation War Documentation Group",
        whyCreated:
          "Created during and after the Bangladesh Liberation War of 1971 to document the atrocities and human cost of the genocide. Part of a broader effort by DU Fine Arts faculty to preserve visual memory of the war.",
        description:
          "Powerful oil painting depicting a gaunt figure representing the survivors of the 1971 Liberation War. A landmark work in the documentation of Bangladesh's independence struggle.",
        tags: ["liberation war", "1971", "oil painting", "war", "survivor"],
      },
      {
        id: "du-005",
        title: "Ekushey (21 February)",
        artist: "Murtaja Baseer",
        artistBangla: "মুর্তজা বশীর",
        year: "1953",
        date: "February 1953",
        medium: "Oil on canvas",
        image: "/images/artworks/image_5.png",
        category: "Painting",
        department: "Drawing & Painting",
        team: "Murtaja Baseer (solo work)",
        whyCreated:
          "Painted to commemorate the Language Movement martyrs of 21 February 1952, when students were killed demanding recognition of Bangla as a state language. Baseer was a student at the Fine Arts Institute at the time.",
        description:
          "A seminal painting depicting the Language Movement of 1952. Red and green palette symbolizing blood and hope became an iconic visual language for Bangladesh's cultural identity.",
        tags: ["language movement", "ekushey", "21 february", "1952", "cultural identity"],
      },
      {
        id: "du-006",
        title: "Kalpana (Imagination)",
        artist: "Shahabuddin Ahmed",
        artistBangla: "শাহাবুদ্দিন আহমেদ",
        year: "1995",
        date: "1995",
        medium: "Oil on canvas",
        image: "/images/artworks/image_6.png",
        category: "Painting",
        department: "Drawing & Painting",
        team: "Shahabuddin Ahmed (solo work, created in Paris)",
        whyCreated:
          "Shahabuddin explored the theme of movement and liberation — informed by his own experience as a freedom fighter in 1971 and his later life as a Bangladeshi artist working in Paris. The work asks what it means to truly be free.",
        description:
          "Dynamic oil painting featuring Shahabuddin's signature style of figures in explosive motion. Captures the energy and aspiration of the human spirit in bold, gestural brushwork.",
        tags: ["expressionism", "freedom", "movement", "paris", "shahabuddin"],
      },
    ],
  },
  {
    slug: "rajshahi-university",
    name: "University of Rajshahi",
    nameBangla: "রাজশাহী বিশ্ববিদ্যালয়",
    shortName: "RU",
    established: "1953",
    location: "Rajshahi",
    departmentName: "Department of Fine Arts",
    image: "/images/banners/banner_1.png",
    coverImage: "/images/banners/banner_1.png",
    about:
      "Rajshahi University's Department of Fine Arts is one of the oldest art departments in Bangladesh, producing many distinguished painters, printmakers, and sculptors. The department is known for its strong tradition in printmaking and sculpture.",
    website: "https://ru.ac.bd",
    totalArtworks: 4,
    artworks: [
      {
        id: "ru-001",
        title: "Padma River Series",
        artist: "Qayyum Chowdhury",
        artistBangla: "কাইয়ুম চৌধুরী",
        year: "1975",
        date: "1975",
        medium: "Watercolor & gouache",
        image: "/images/artworks/image_1.png",
        category: "Painting",
        department: "Department of Fine Arts",
        team: "Qayyum Chowdhury (solo work)",
        whyCreated:
          "Inspired by the Padma River flowing near Rajshahi, Chowdhury sought to capture the seasonal moods, the boatmen, the char lands, and the ever-changing nature of Bengal's greatest river as a living landscape.",
        description:
          "A series of watercolor and gouache paintings depicting the Padma River through seasons. Qayyum Chowdhury's bold graphic style and folk-influenced color palette make this one of the finest landscape series in Bangladeshi art.",
        tags: ["padma", "river", "watercolor", "landscape", "rajshahi"],
      },
      {
        id: "ru-002",
        title: "Terracotta Monuments",
        artist: "Novera Ahmed",
        artistBangla: "নভেরা আহমেদ",
        year: "1960",
        date: "1960",
        medium: "Terracotta sculpture",
        image: "/images/artworks/image_2.png",
        category: "Sculpture",
        department: "Sculpture",
        team: "Novera Ahmed (solo work)",
        whyCreated:
          "Novera Ahmed, Bangladesh's first modern sculptor, sought to fuse ancient terracotta traditions of Bengal with modernist sculptural form. She used local clay to create works that are simultaneously ancient and contemporary.",
        description:
          "Groundbreaking terracotta sculptures that established modern sculpture in Bangladesh. Novera Ahmed's work draws from Bengal's ancient terracotta tradition and transforms it into a powerful contemporary idiom.",
        tags: ["terracotta", "sculpture", "novera ahmed", "clay", "traditional"],
      },
      {
        id: "ru-003",
        title: "Barsha (Monsoon)",
        artist: "SM Sultan",
        artistBangla: "এস এম সুলতান",
        year: "1982",
        date: "1982",
        medium: "Oil on canvas",
        image: "/images/artworks/image_3.png",
        category: "Painting",
        department: "Drawing & Painting",
        team: "SM Sultan (solo work)",
        whyCreated:
          "Sultan celebrated the muscular peasants and farmers of Bengal as heroic figures, countering colonial representations of Bengali people as weak and submissive. The monsoon series shows figures working the flooded fields with power and dignity.",
        description:
          "Part of Sultan's iconic peasant cycle showing muscular village figures harvesting in monsoon-flooded fields. One of the most distinctive visions in all of Bangladeshi art.",
        tags: ["peasant", "monsoon", "oil painting", "sultan", "village life", "rural"],
      },
      {
        id: "ru-004",
        title: "Print Portfolio — Bengal Motifs",
        artist: "Abdul Baset",
        artistBangla: "আব্দুল বাসেত",
        year: "1990",
        date: "1990",
        medium: "Woodblock print",
        image: "/images/artworks/image_4.png",
        category: "Printmaking",
        department: "Printmaking",
        team: "Printmaking Workshop, Department of Fine Arts, RU",
        whyCreated:
          "The Printmaking Department at Rajshahi University developed a strong workshop culture. This portfolio was created as a collaborative teaching and artistic project to document and reinterpret traditional Bengali motifs through the printmaking medium.",
        description:
          "A portfolio of woodblock prints reinterpreting traditional Bengali folk motifs — nakshi kantha patterns, terracotta designs, and riverine imagery — in a modernist printmaking tradition.",
        tags: ["printmaking", "woodblock", "folk motifs", "bengal", "nakshi kantha"],
      },
    ],
  },
  {
    slug: "chittagong-university",
    name: "University of Chittagong",
    nameBangla: "চট্টগ্রাম বিশ্ববিদ্যালয়",
    shortName: "CU",
    established: "1966",
    location: "Chittagong",
    departmentName: "Department of Fine Arts & Music",
    image: "/images/banners/banner_1.png",
    coverImage: "/images/banners/banner_1.png",
    about:
      "The Department of Fine Arts & Music at Chittagong University has a strong tradition in painting and mixed media, with many graduates going on to represent Bangladesh in international exhibitions. The department has particular strength in contemporary and experimental art.",
    website: "https://cu.ac.bd",
    totalArtworks: 3,
    artworks: [
      {
        id: "cu-001",
        title: "Sea of Memories",
        artist: "Rokeya Sultana",
        artistBangla: "রোকেয়া সুলতানা",
        year: "2005",
        date: "2005",
        medium: "Mixed media on canvas",
        image: "/images/artworks/image_5.png",
        category: "Mixed Media",
        department: "Fine Arts",
        team: "Rokeya Sultana (solo work)",
        whyCreated:
          "Created as part of a series exploring women's experience, memory, and displacement in Bangladesh. Sultana used textile fragments, earth, and paint to create work that speaks to female identity and the body's relationship with landscape.",
        description:
          "Mixed media painting incorporating textile, earth pigments, and oil paint. A powerful exploration of female memory and identity, characteristic of Rokeya Sultana's feminist artistic vision.",
        tags: ["feminist", "mixed media", "women", "identity", "memory", "textile"],
      },
      {
        id: "cu-002",
        title: "Hill Country",
        artist: "Kanak Chanpa Chakma",
        artistBangla: "কনক চাঁপা চাকমা",
        year: "2010",
        date: "2010",
        medium: "Acrylic on canvas",
        image: "/images/artworks/image_6.png",
        category: "Painting",
        department: "Fine Arts",
        team: "Kanak Chanpa Chakma (solo work)",
        whyCreated:
          "As one of Bangladesh's leading indigenous artists from the Chittagong Hill Tracts, Chakma created this work to document the landscape, culture, and people of the CHT — giving visibility to a community whose stories are often absent from mainstream Bangladeshi art.",
        description:
          "Vibrant acrylic painting depicting the Chittagong Hill Tracts landscape and indigenous Chakma community life. A landmark work for indigenous representation in Bangladeshi contemporary art.",
        tags: ["chittagong hill tracts", "indigenous", "chakma", "acrylic", "identity"],
      },
      {
        id: "cu-003",
        title: "Port City (Industrial Series)",
        artist: "Mohammed Kibria",
        artistBangla: "মোহাম্মদ কিবরিয়া",
        year: "1980",
        date: "1980",
        medium: "Oil on canvas",
        image: "/images/artworks/image_1.png",
        category: "Painting",
        department: "Drawing & Painting",
        team: "Mohammed Kibria (solo work)",
        whyCreated:
          "Kibria was inspired by the industrial landscape of Chittagong Port — the cranes, ships, workers, and the meeting of land and sea. He sought to find beauty and abstraction in industrial form, bridging European Abstract Expressionism with Bangladeshi subject matter.",
        description:
          "Large-scale oil painting exploring the industrial landscape of Chittagong Port in a semi-abstract style. Mohammed Kibria is considered one of Bangladesh's greatest abstract painters.",
        tags: ["abstract", "industrial", "port", "oil painting", "kibria", "chittagong"],
      },
    ],
  },
  {
    slug: "jahangirnagar-university",
    name: "Jahangirnagar University",
    nameBangla: "জাহাঙ্গীরনগর বিশ্ববিদ্যালয়",
    shortName: "JU",
    established: "1970",
    location: "Savar, Dhaka",
    departmentName: "Department of Fine & Performing Arts",
    image: "/images/banners/banner_1.png",
    coverImage: "/images/banners/banner_1.png",
    about:
      "Jahangirnagar University's Department of Fine & Performing Arts is known for integrating visual arts with performance and theater. Set in a beautiful campus surrounded by nature, the department has a unique interdisciplinary identity combining painting, sculpture, theater, and folk arts.",
    totalArtworks: 3,
    artworks: [
      {
        id: "ju-001",
        title: "Winter Migratory Birds (Jahangir Campus Series)",
        artist: "Hashem Khan",
        artistBangla: "হাশেম খান",
        year: "1985",
        date: "Winter 1985",
        medium: "Watercolor on paper",
        image: "/images/artworks/image_2.png",
        category: "Painting",
        department: "Fine Arts",
        team: "Hashem Khan (solo work)",
        whyCreated:
          "Hashem Khan was deeply inspired by the thousands of migratory birds that arrive at the Jahangirnagar lake every winter. He created this series to celebrate the natural beauty of the campus and the ecological wonder of migratory bird populations in Bangladesh.",
        description:
          "Delicate watercolor series depicting the migratory winter birds at Jahangirnagar University's lake. Hashem Khan's sensitive line work and muted palette capture the quiet beauty of these seasonal visitors.",
        tags: ["birds", "nature", "watercolor", "jahangirnagar", "migratory", "campus"],
      },
      {
        id: "ju-002",
        title: "Liberation Mural (Muktijoddha Series)",
        artist: "JU Fine Arts Faculty",
        artistBangla: "জাহাঙ্গীরনগর বিশ্ববিদ্যালয় চারুকলা অনুষদ",
        year: "1972",
        date: "December 1972",
        medium: "Mural (paint on wall)",
        image: "/images/artworks/image_3.png",
        category: "Mural",
        department: "Fine Arts",
        team: "Collective work — JU Fine Arts founding faculty & students",
        whyCreated:
          "Created in the first year after independence to honor the liberation war freedom fighters (Muktijoddha). A collective work by the founding faculty and students of the newly established department as an act of commemoration and national celebration.",
        description:
          "Large-scale mural on the campus commemorating the Liberation War of 1971. One of the earliest post-independence artworks created collectively by an academic art department in Bangladesh.",
        tags: ["mural", "liberation war", "1971", "collective", "muktijoddha", "independence"],
      },
      {
        id: "ju-003",
        title: "Folk Tales of Bengal",
        artist: "Rina Begum",
        artistBangla: "রিনা বেগম",
        year: "2003",
        date: "2003",
        medium: "Acrylic & natural pigments",
        image: "/images/artworks/image_4.png",
        category: "Painting",
        department: "Fine Arts",
        team: "Rina Begum (solo work)",
        whyCreated:
          "Rina Begum drew on the folk tales, myths, and oral traditions of rural Bengal — stories of spirits, rivers, and village life — to create a body of work that preserves these narratives in visual form before they are lost.",
        description:
          "A series of paintings depicting scenes from Bengali folk tales and oral mythology using acrylic and natural earth pigments. Rich in symbolism and folk imagery.",
        tags: ["folk tales", "mythology", "bengal", "acrylic", "oral tradition", "folk art"],
      },
    ],
  },
  {
    slug: "khulna-university",
    name: "Khulna University",
    nameBangla: "খুলনা বিশ্ববিদ্যালয়",
    shortName: "KU",
    established: "1991",
    location: "Khulna",
    departmentName: "Fine Arts Discipline",
    image: "/images/banners/banner_1.png",
    coverImage: "/images/banners/banner_1.png",
    about:
      "Khulna University's Fine Arts Discipline is one of the younger but rapidly growing art programs in Bangladesh. Located in the Sundarbans delta region, the department has developed a distinctive identity centered on the landscape, ecology, and culture of the Southwest Bangladesh.",
    totalArtworks: 3,
    artworks: [
      {
        id: "ku-001",
        title: "Sundarbans Ecology Series",
        artist: "Mamun ur Rashid",
        artistBangla: "মামুন উর রশিদ",
        year: "2015",
        date: "2015",
        medium: "Mixed media & photography",
        image: "/images/artworks/image_5.png",
        category: "Mixed Media",
        department: "Fine Arts",
        team: "Mamun ur Rashid with KU Environmental Arts Group",
        whyCreated:
          "Created as an environmental art project responding to the threats facing the Sundarbans mangrove forest from climate change, shrimp farming, and industrial development. The work raises awareness while documenting the forest's endangered beauty.",
        description:
          "An environmental art series combining photography, printmaking, and mixed media to document and protest the threats to the Sundarbans mangrove ecosystem. A pioneering work of eco-art in Bangladesh.",
        tags: ["sundarbans", "ecology", "environmental art", "mixed media", "climate", "mangrove"],
      },
      {
        id: "ku-002",
        title: "Shipyard Workers",
        artist: "Taslima Akhter",
        artistBangla: "তসলিমা আখতার",
        year: "2012",
        date: "2012",
        medium: "Oil on canvas",
        image: "/images/artworks/image_6.png",
        category: "Painting",
        department: "Fine Arts",
        team: "Taslima Akhter (solo work)",
        whyCreated:
          "The Mongla shipyard near Khulna employs thousands of workers in dangerous conditions. Akhter documented their labor, dignity, and daily lives as a way of giving artistic visibility to Bangladesh's industrial working class.",
        description:
          "Oil paintings depicting workers at the Mongla shipyard — celebrating their labor and humanity with a social realist approach that draws on the tradition of Zainul Abedin.",
        tags: ["shipyard", "workers", "social realism", "oil painting", "khulna", "labor"],
      },
      {
        id: "ku-003",
        title: "Delta Dream",
        artist: "Sabbir Ahmed",
        artistBangla: "সাব্বির আহমেদ",
        year: "2018",
        date: "2018",
        medium: "Watercolor on paper",
        image: "/images/artworks/image_1.png",
        category: "Painting",
        department: "Fine Arts",
        team: "Sabbir Ahmed (KU MFA Thesis Work)",
        whyCreated:
          "Created as Sabbir Ahmed's MFA thesis exploring the geography, mythology, and disappearing islands of the Bengal delta. The work meditates on impermanence and the relationship between people, land, and water.",
        description:
          "Ethereal watercolor paintings depicting the shifting char islands and water bodies of the Bengal delta. A meditative work exploring impermanence and ecological transformation.",
        tags: ["delta", "watercolor", "char island", "bengal", "water", "geography"],
      },
    ],
  },
  {
    slug: "bangladesh-university-of-engineering-technology",
    name: "Bangladesh University of Engineering & Technology",
    nameBangla: "বাংলাদেশ প্রকৌশল বিশ্ববিদ্যালয়",
    shortName: "BUET",
    established: "1962",
    location: "Dhaka",
    departmentName: "Department of Architecture (Art Integration)",
    image: "/images/banners/banner_1.png",
    coverImage: "/images/banners/banner_1.png",
    about:
      "While BUET is primarily an engineering and technology university, its Department of Architecture has a strong tradition of integrating fine arts, public art, and architectural murals. BUET architects and students have created some of Bangladesh's most significant public art installations.",
    totalArtworks: 2,
    artworks: [
      {
        id: "buet-001",
        title: "Aparajeyo Bangla",
        artist: "Syed Abdullah Khalid",
        artistBangla: "সৈয়দ আবদুল্লাহ খালিদ",
        year: "1979",
        date: "16 December 1979",
        medium: "Bronze sculpture",
        image: "/images/artworks/image_2.png",
        category: "Public Sculpture",
        department: "Architecture / Fine Arts",
        team: "Syed Abdullah Khalid with BUET sculpture team",
        whyCreated:
          "Created to honor the freedom fighters of the 1971 Liberation War on the Dhaka University campus. 'Aparajeyo Bangla' (Unconquered Bengal) depicts three freedom fighters — male, female, and student — symbolizing the unity and sacrifice of the liberation struggle.",
        description:
          "Iconic bronze sculpture on the Dhaka University campus depicting three freedom fighters of 1971. One of the most recognizable public artworks in Bangladesh and a national symbol of liberation.",
        tags: ["liberation war", "sculpture", "bronze", "public art", "1971", "freedom fighters", "iconic"],
      },
      {
        id: "buet-002",
        title: "BUET Campus Mural Series",
        artist: "Architecture Department Students",
        artistBangla: "স্থাপত্য বিভাগ শিক্ষার্থী",
        year: "2000",
        date: "2000–2010",
        medium: "Wall mural (acrylic and cement)",
        image: "/images/artworks/image_3.png",
        category: "Mural",
        department: "Architecture",
        team: "Multiple batches of Architecture students, supervised by faculty",
        whyCreated:
          "An ongoing project to integrate visual art into the built environment of the campus. Each batch of architecture students contributes murals that reflect the history, culture, and aspirations of Bangladesh.",
        description:
          "Series of large-scale campus murals created by architecture students over a decade, depicting Bangladeshi history, landscape, and culture through diverse artistic styles.",
        tags: ["mural", "campus art", "architecture", "collective", "buet", "public art"],
      },
    ],
  },
  {
    slug: "national-university-bangladesh",
    name: "National University, Bangladesh",
    nameBangla: "জাতীয় বিশ্ববিদ্যালয়",
    shortName: "NU",
    established: "1992",
    location: "Gazipur, Dhaka",
    departmentName: "Fine Arts (Affiliated Colleges)",
    image: "/images/banners/banner_1.png",
    coverImage: "/images/banners/banner_1.png",
    about:
      "National University affiliates hundreds of colleges across Bangladesh, many of which offer Fine Arts programs. As the largest university by enrollment in Bangladesh, NU's affiliated colleges have produced countless working artists, art teachers, and craftspeople across all 64 districts.",
    totalArtworks: 2,
    artworks: [
      {
        id: "nu-001",
        title: "National Craft Exhibition — Diploma Works",
        artist: "Various NU-affiliated college students",
        artistBangla: "বিভিন্ন সরকারি কলেজের শিক্ষার্থী",
        year: "2020",
        date: "2020",
        medium: "Various (painting, craft, printmaking)",
        image: "/images/artworks/image_4.png",
        category: "Group Exhibition",
        department: "Fine Arts (multiple colleges)",
        team: "Selected students from 24 affiliated colleges across Bangladesh",
        whyCreated:
          "Created as a showcase of the breadth and diversity of fine arts education across Bangladesh's districts. The exhibition was designed to demonstrate that world-class art education and practice exists outside Dhaka.",
        description:
          "A national exhibition of diploma-level works from NU-affiliated colleges, spanning all major disciplines of fine arts. Represents the geographic and cultural diversity of Bangladeshi art practice.",
        tags: ["national university", "affiliated colleges", "diploma", "group exhibition", "diversity"],
      },
      {
        id: "nu-002",
        title: "Nakshi Kantha Heritage Series",
        artist: "Women Artists — Mymensingh Region",
        artistBangla: "ময়মনসিংহ অঞ্চলের নারী শিল্পী",
        year: "2016",
        date: "2016",
        medium: "Embroidery on cloth (Nakshi Kantha)",
        image: "/images/artworks/image_5.png",
        category: "Textile Art",
        department: "Fine Arts — Craft Specialization",
        team: "Community art project, supported by NU Mymensingh affiliated colleges",
        whyCreated:
          "Created to document, preserve, and elevate the nakshi kantha tradition of Bangladesh — a folk embroidery art form practiced by women for centuries. The project gave formal academic recognition to craft arts previously excluded from official art education.",
        description:
          "A collection of nakshi kantha (traditional embroidered quilts) documenting folk stories, nature patterns, and cultural narratives from the Mymensingh region. A landmark project recognizing folk textile art as fine art.",
        tags: ["nakshi kantha", "embroidery", "textile", "folk art", "women artists", "mymensingh"],
      },
    ],
  },
];
