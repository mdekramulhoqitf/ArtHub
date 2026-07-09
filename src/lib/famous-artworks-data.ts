export interface ArtworkOwner {
  name: string;
  image: string;
  bio: string;
  slug?: string;
}

export interface ArtworkLocation {
  type: "museum" | "gallery" | "private" | "destroyed" | "unknown";
  name: string;
  city?: string;
  country?: string;
  owner?: ArtworkOwner;
}

export interface FamousArtwork {
  slug: string;
  title: string;
  artistSlug: string;
  artistName: string;
  year: string;
  medium: string;
  dimensions?: string;
  image: string;
  category: "bangladeshi" | "international";
  movement: string;
  tags: string[];
  shortDescription: string;
  whyFamous: string;
  creationStory: string;
  technique: string;
  currentLocation: ArtworkLocation;
  relatedSlugs: string[];
}

export const FAMOUS_ARTWORKS: FamousArtwork[] = [
  {
    slug: "bengal-famine-sketch-1943",
    title: "Bengal Famine Sketches",
    artistSlug: "zainul-abedin",
    artistName: "Zainul Abedin",
    year: "1943",
    medium: "Charcoal and brush on paper",
    dimensions: "Various sizes, largest: 45 × 70 cm",
    image: "/images/artworks/image_1.png",
    category: "bangladeshi",
    movement: "Social Realism",
    tags: ["famine", "realism", "charcoal", "social", "historical", "bangladesh"],
    shortDescription: "A series of harrowing charcoal drawings depicting victims of the 1943 Bengal famine — among the most powerful social documents in South Asian art history.",
    whyFamous: `The Bengal Famine Sketches are considered the founding masterwork of Bangladeshi modern art and one of the most important social document series in all of South Asian art history.

Zainul Abedin drew these images in Calcutta in 1943 while the city was flooded with famine victims dying on its streets. The famine — caused by a combination of wartime policy, administrative failure, and Bengal's rice harvest shortfall — killed an estimated 2–3 million people.

What makes these works extraordinary is not just their subject matter, but their artistic power. Abedin captured the emaciated, dying figures with a directness and economy of line that is devastating in its restraint. There is no sentimentality — just a clear, human gaze at suffering that refuses to look away.

The sketches were exhibited in Calcutta and caused an immediate sensation. They brought Abedin to national attention and established the moral responsibility of the artist to bear witness to social reality.`,
    creationStory: `Abedin was a young art teacher in Calcutta when the famine struck in 1943. He witnessed starvation deaths on the street daily. Working with whatever materials he could afford — charcoal sticks, cheap paper — he drew compulsively, almost as an act of testimony.

He produced dozens of sketches over several months, working quickly and in the open air — sometimes drawing figures as they lay on the pavement, unwilling to disturb them. He worked in charcoal rather than paint because it suited the rawness and immediacy of what he was witnessing: charcoal is the most direct mark-making material, body to paper with no intermediary.

The resulting series is not a coherent project conceived in advance, but an accumulation of urgent acts of witness — which is exactly what gives it its power.`,
    technique: `Abedin used vine and compressed charcoal on machine-made drawing paper, working with both stick and stump to build tonal depth. The drawings range from rapid gestural studies to more finished compositions.

His line is confident and economical — he had trained in traditional academic draughtsmanship at the Calcutta School of Art, and this technical command allowed him to work at speed without losing form. The figures are rendered with anatomical precision despite the urgency of execution.

Some sketches incorporate wash — charcoal dissolved in water and applied with a brush — to create areas of deep shadow. Others rely entirely on dry charcoal, with highlights created by erasing or leaving the white of the paper untouched.`,
    currentLocation: {
      type: "museum",
      name: "Zainul Abedin Museum (Shilpacharya Zainul Abedin Sangrahasala)",
      city: "Mymensingh",
      country: "Bangladesh",
    },
    relatedSlugs: ["nakshi-kantha-scroll", "liberation-war-poster-1971"],
  },
  {
    slug: "nakshi-kantha-scroll",
    title: "Nakshi Kantha",
    artistSlug: "zainul-abedin",
    artistName: "Zainul Abedin",
    year: "1969",
    medium: "Mixed media scroll painting",
    dimensions: "65 m × 76 cm (scroll)",
    image: "/images/artworks/image_2.png",
    category: "bangladeshi",
    movement: "Folk Art Synthesis",
    tags: ["scroll", "folk", "narrative", "epic", "bangladesh", "national"],
    shortDescription: "A 65-metre narrative scroll painting celebrating Bengali folk life and traditions — one of the longest paintings in the world and a landmark of Bangladeshi cultural heritage.",
    whyFamous: `Nakshi Kantha is one of the most ambitious works ever created by a Bangladeshi artist and one of the longest narrative paintings in the world. At 65 metres, it tells a sweeping visual story of Bengali rural life, folk tradition, festivals, and the rhythms of the agricultural calendar.

The work takes its name from the traditional Bengali embroidered quilt — the Nakshi Kantha — whose intricate patterns and narrative imagery Abedin incorporated into his visual language. It represents a synthesis of folk tradition and modern painterly technique that no other Bangladeshi artist had achieved at this scale.

Created in 1969, two years before the Liberation War, it carries extraordinary weight as a statement of cultural identity — a celebration of what makes Bengali civilisation distinctive. After independence, it became a key symbol of national pride.`,
    creationStory: `Abedin began the Nakshi Kantha project in the late 1960s, wanting to create a work that would document and celebrate the folk traditions of Bengal before they disappeared under modernisation. He spent several years researching rural folk art, travelling to villages, studying embroidery patterns, listening to folk songs.

The scroll format was deliberately chosen — it references the ancient tradition of the pata (scroll) used by Bengali itinerant folk painters (patuas) who would unroll their scrolls to tell religious or mythological stories. Abedin updated this ancient form with modernist colour and compositional sophistication.

He worked on the scroll in sections, sometimes with assistants, over many months. The physical challenge of working at this scale was enormous — the scroll had to be laid on the floor or suspended to be painted.`,
    technique: `The Nakshi Kantha scroll is executed in mixed media — gouache, watercolour, ink, and tempera on handmade paper joined into a continuous scroll. The imagery draws directly on Nakshi Kantha embroidery patterns: the characteristically Bengali flower and vine motifs, bird imagery, geometric borders.

Abedin worked with a palette that referenced the natural dyes of traditional Bengali textiles — indigo blues, madder reds, turmeric yellows. The figures are depicted in a simplified, folk-inflected style that differs markedly from his earlier academic realism.

The scroll reads from right to left, like a traditional Bengali narrative, with scenes of daily life — fishing, harvesting, festivals, weddings, boat journeys — connected by elaborate decorative borders.`,
    currentLocation: {
      type: "museum",
      name: "Bangladesh National Museum",
      city: "Dhaka",
      country: "Bangladesh",
    },
    relatedSlugs: ["bengal-famine-sketch-1943", "liberation-war-poster-1971"],
  },
  {
    slug: "first-monsoon-sm-sultan",
    title: "First Monsoon",
    artistSlug: "sm-sultan",
    artistName: "S M Sultan",
    year: "1974",
    medium: "Oil on canvas",
    dimensions: "168 × 256 cm",
    image: "/images/artworks/image_4.png",
    category: "bangladeshi",
    movement: "Expressionism / Rural Realism",
    tags: ["peasant", "monsoon", "expressionism", "figurative", "bangladesh", "iconic"],
    shortDescription: "S M Sultan's iconic large-scale canvas depicts muscular Bangladeshi farmers joyously greeting the monsoon rains — a manifesto painting that redefined the image of the Bengali peasant in art.",
    whyFamous: `First Monsoon is the most celebrated single painting by S M Sultan and one of the most iconic works in all of Bangladeshi art. It embodies Sultan's artistic manifesto: the deliberate, politically conscious choice to depict Bangladeshi farmers as powerful, heroic, almost superhuman figures.

In colonial and post-colonial representation, the Bengali peasant was typically depicted as passive, emaciated, and victimised. Sultan's farmers are the opposite — their bodies are massive, their muscles exaggerated, their gestures of celebration vast and commanding. This was a deliberate restitution of dignity.

The painting is also extraordinary as pure painting — the composition is daring, the colour lush, the handling of bodies in space genuinely accomplished. It is the work in which Sultan's mature style fully arrives.`,
    creationStory: `Sultan completed First Monsoon in 1974, three years after Bangladesh's independence. The timing is significant — it was a painting made in the flush of a new nation's self-determination, when the question of what Bangladesh was and what Bengali identity meant was urgently alive.

Sultan was living in his village of Narail, surrounded by the farming communities whose lives he depicted. Unlike the urban artists of Dhaka, he had direct, daily contact with the people he painted. His models were his neighbours.

The scale of the painting — over 2.5 metres wide — was deliberate. Sultan wanted the figures to overwhelm the viewer, to create an experience of the body that could not be reduced to sentiment or pity.`,
    technique: `Sultan worked in oil on canvas with a relatively quick, wet technique — he was not a laborious impasto painter but rather worked fluidly, building form through confident drawing with the brush rather than heavy texturing.

His figure drawing was anchored in his academic training at the Calcutta School of Art, but the exaggeration of the musculature is his own invention. He studied physiology and anatomy to understand how to increase the sense of physical power without losing anatomical believability.

The colours are characteristic Sultan: deep greens for the Bengali landscape, warm earth tones for the bodies, a sky that pulses between luminous and stormy. He used linseed oil-based paints with a medium that kept surfaces open and workable for extended periods.`,
    currentLocation: {
      type: "museum",
      name: "S M Sultan Smriti Sangrahasala",
      city: "Narail",
      country: "Bangladesh",
    },
    relatedSlugs: ["harvest-sm-sultan", "liberation-war-poster-1971"],
  },
  {
    slug: "liberation-war-poster-1971",
    title: "Desh Drohi (Enemies of the Nation)",
    artistSlug: "quamrul-hassan",
    artistName: "Quamrul Hassan",
    year: "1971",
    medium: "Ink on paper",
    dimensions: "58 × 42 cm",
    image: "/images/artworks/image_5.png",
    category: "bangladeshi",
    movement: "Political Art",
    tags: ["liberation-war", "political", "poster", "1971", "bangladesh", "iconic"],
    shortDescription: "Quamrul Hassan's searing Liberation War poster depicting Pakistani military leaders as grotesque animals — created at enormous personal risk in 1971 and still considered one of the most powerful political images in South Asian history.",
    whyFamous: `This poster — created during the Bangladesh Liberation War of 1971 — is one of the most celebrated and politically potent artworks in South Asian history. Quamrul Hassan drew the military leadership of Pakistan as monstrous animals, combining savage caricature with folk art visual language.

The image was produced at enormous personal risk. When Hassan drew it, Pakistani forces were actively conducting genocide in East Pakistan (now Bangladesh). To produce anti-Pakistani political art was to risk execution.

The image circulated through the liberation movement and became a rallying symbol of resistance. After independence, it entered the official iconography of Bangladesh's founding — reproduced on posters, in textbooks, in commemorative materials. It remains one of the defining images of the nation.`,
    creationStory: `Hassan drew the poster in the weeks following the Pakistani military's crackdown of March 1971, when it became clear that a full-scale liberation war was underway. He was working in Dhaka but eventually had to flee to safety in India.

He worked quickly, in ink, producing multiple versions. The imagery drew on his deep knowledge of Bengali folk art — specifically the Kalighat painting tradition, which was itself a tradition of satirical popular imagery. By using this visual language, he rooted the political critique in Bengali cultural tradition.

The drawing was printed and distributed by the liberation forces and by Bangladeshi diaspora organisations abroad. It reached audiences across South Asia, Europe, and North America.`,
    technique: `The poster is executed in black ink on white paper, combining calligraphic line with areas of solid black fill. Hassan's hand is confident and fluid — he had decades of experience in both fine art and commercial illustration.

The caricature style draws on Bengali popular visual tradition, particularly the Kalighat patachitra form. Figures are rendered in profile with simplified, almost hieroglyphic forms that make the image immediately readable at a distance — essential for a work designed to function as a poster.

The text is hand-lettered in Bangla, integrated into the composition rather than added below it. Hassan was a master typographer as well as a painter.`,
    currentLocation: {
      type: "museum",
      name: "Liberation War Museum",
      city: "Dhaka",
      country: "Bangladesh",
    },
    relatedSlugs: ["bengal-famine-sketch-1943", "nakshi-kantha-scroll"],
  },
  {
    slug: "gate-series-murtaja-baseer",
    title: "Gate Series No. 3",
    artistSlug: "murtaja-baseer",
    artistName: "Murtaja Baseer",
    year: "1978",
    medium: "Oil on canvas",
    dimensions: "152 × 122 cm",
    image: "/images/artworks/image_6.png",
    category: "bangladeshi",
    movement: "Abstract / Conceptual",
    tags: ["abstract", "gate", "memory", "oil", "conceptual", "bangladesh"],
    shortDescription: "One of Murtaja Baseer's iconic Gate series — monumental abstract compositions evoking ancient portals, thresholds, and the passage of time and memory.",
    whyFamous: `The Gate Series is Murtaja Baseer's most celebrated body of work — a sequence of large abstract paintings evoking ancient portals, archways, and thresholds. Gate No. 3 is among the finest of the series.

These paintings operate simultaneously on multiple levels: formally, they are powerful exercises in abstract composition — monumental rectangular forms, subtle tonal variation, surface textures that suggest weathered stone or aged metal. Conceptually, they explore ideas of passage, transition, history, and the border between seen and unseen.

The Gate series drew on Baseer's deep knowledge of ancient architecture — the gateways of Mughal monuments, the carved entrances of Hindu temples, the monumental portals of Egyptian and Mesopotamian civilisations. He was a serious scholar of history and archaeology alongside being a painter.`,
    creationStory: `Baseer began the Gate series in the mid-1970s, after returning from extensive travel and study in Europe. The series grew out of his interest in ancient script and inscription — he had become deeply interested in ancient writing systems, partly through his scholarship on Bengali numismatics.

He saw gateways and portals as sites of inscription — places where civilisations marked their presence, their power, their beliefs. The Gate paintings attempt to invoke this sense of accumulated history without literally depicting any specific monument.

The series continued for over two decades, with each painting exploring a different aspect of the gateway as metaphor and form.`,
    technique: `Baseer worked in oil on canvas with a highly deliberate, layered technique. He built surfaces over many sessions, applying paint thinly and allowing each layer to dry before adding the next — creating depth that suggests archaeological strata.

The surface textures were achieved through various means: fine sand mixed into the paint, dragging a palette knife across wet surfaces, applying paint with rags rather than brushes. The result has a quality suggestive of ancient stone or weathered metal.

Colour is restrained — earth tones, ochres, greys, and deep umber — with occasional passages of warm light that suggest the sun illuminating an ancient threshold.`,
    currentLocation: {
      type: "private",
      name: "Private Collection",
      city: "Dhaka",
      country: "Bangladesh",
      owner: {
        name: "Nazmul Anwar Jewel",
        image: "/images/artists/owner_1.png",
        bio: "Art collector and patron based in Dhaka, Bangladesh. Has been collecting significant works of Bangladeshi modern art for over two decades, with a particular focus on preserving the legacy of S. M. Sultan and his contemporaries.",
        slug: "nazmul-anwar-jewel",
      },
    },
    relatedSlugs: ["bengal-famine-sketch-1943", "tablet-series"],
  },
  {
    slug: "freedom-fighter-shahabuddin",
    title: "Freedom Fighter",
    artistSlug: "shahabuddin-ahmed",
    artistName: "Shahabuddin Ahmed",
    year: "1977",
    medium: "Oil on canvas",
    dimensions: "195 × 130 cm",
    image: "/images/artworks/image_7.png",
    category: "bangladeshi",
    movement: "Expressionism / Dynamic Realism",
    tags: ["liberation", "freedom", "figurative", "expressionism", "paris", "bangladesh"],
    shortDescription: "Shahabuddin Ahmed's breakthrough painting of a liberation fighter in full dynamic motion — the first major canvas in his celebrated series of airborne, striving human figures.",
    whyFamous: `Freedom Fighter (1977) is the breakthrough canvas in which Shahabuddin Ahmed's mature style fully arrived — and is the earliest major example of the dynamic figurative painting that would make him Bangladesh's most internationally celebrated artist.

The painting depicts a single male figure, arms outstretched, body in violent dynamic motion — leaping or falling or flying, suspended between earth and sky. The figure is clearly inspired by the Muktijoddha (freedom fighters) of the 1971 Liberation War, in which Shahabuddin himself participated.

What makes this work extraordinary is its physical intensity: the figure seems genuinely airborne, genuinely alive. Shahabuddin achieved this through a combination of powerful draughtsmanship, dynamic composition, and a handling of paint that itself seems to be in motion.`,
    creationStory: `Shahabuddin completed Freedom Fighter in Paris in 1977, three years after arriving in France on a scholarship. He was homesick, politically engaged, haunted by his own experience as a liberation fighter.

The painting was an act of memory and tribute — an attempt to do justice to the sacrifice of those who died for Bangladesh's independence. He worked from memory and imagination, not from photographs or models, which gives the figure its quality of archetype rather than portrait.

The Paris art world was immediately struck by the painting when it was exhibited. French critics noted something unprecedented: here was figurative painting with the energy of Abstract Expressionism, the political commitment of Social Realism, and a visual language entirely its own.`,
    technique: `Shahabuddin works in oil on canvas with rapid, gestural brushwork built up in multiple sessions. He uses long, flowing brushstrokes to suggest movement — the paint itself seems to be travelling across the canvas.

His process begins with charcoal drawing on the canvas to establish the figure's gesture and position. He then works in oil, starting with thin, fast gestural marks and building toward denser passages in the light areas of the figure.

He uses a limited palette — earth tones, ochre, warm grey, raw umber — with the background kept loose and atmospheric so the figure appears to emerge from space rather than standing against a flat backdrop.`,
    currentLocation: {
      type: "museum",
      name: "Bangladesh National Museum",
      city: "Dhaka",
      country: "Bangladesh",
    },
    relatedSlugs: ["liberation-war-poster-1971", "first-monsoon-sm-sultan"],
  },
  {
    slug: "mona-lisa",
    title: "Mona Lisa (La Gioconda)",
    artistSlug: "zainul-abedin",
    artistName: "Leonardo da Vinci",
    year: "c. 1503–1519",
    medium: "Oil on poplar wood panel",
    dimensions: "77 × 53 cm",
    image: "https://images.unsplash.com/photo-1488367410978-cce0b284b369?w=1200",
    category: "international",
    movement: "Renaissance / Sfumato",
    tags: ["renaissance", "portrait", "sfumato", "italian", "louvre", "iconic", "world-famous"],
    shortDescription: "Leonardo da Vinci's half-length portrait of Lisa Gherardini — the most famous, most visited, most written about, and most parodied painting in the world.",
    whyFamous: `The Mona Lisa is the most famous painting in human history. Its fame rests on several factors that compound each other across centuries.

Technically, it represents one of the supreme achievements of Leonardo's sfumato technique — the gradual, almost imperceptible transitions between light and shadow that give the figure a quality of three-dimensional presence never before achieved in painting. The sfumato around the eyes and corners of the mouth creates the painting's famous ambiguity: the smile appears to change depending on where and how you look at it.

The sitter's gaze — direct, engaging, slightly knowing — was revolutionary for portrait painting of the period, where sitters typically looked away. Lisa appears to look directly at the viewer, creating an intimacy that remains startling five centuries later.

Its fame was supercharged in 1911 when it was stolen from the Louvre by an Italian nationalist, triggering global media coverage. When it was recovered two years later, it had become the world's most famous painting — and has remained so ever since.`,
    creationStory: `Leonardo began the Mona Lisa around 1503, commissioned by Florentine merchant Francesco del Giocondo to commemorate the birth of his second son and his new house. The sitter is believed to be Lisa Gherardini, the merchant's wife.

Leonardo worked on the painting on and off for approximately four years in Florence, then took it to France when he accepted the invitation of King Francis I in 1516. He worked on it intermittently until his death in 1519, which is why he never delivered it — it remained in his personal collection.

After Leonardo's death, the painting passed to his assistant Salai, then eventually made its way into the French royal collection. Francis I paid 4,000 gold écus for it — a vast sum. It became part of the Louvre's collection during the Revolution.`,
    technique: `Leonardo used oil glazes applied over a carefully prepared gesso ground on a poplar wood panel. The sfumato technique — derived from the Italian word for smoke — involves applying many translucent glazes of oil paint in gradations so subtle they defy the brush.

Analysis has revealed that Leonardo worked with extremely fine brushes and used his fingers to blend passages. The paint layers are built up over many sessions, with each layer allowed to dry completely before the next is applied.

The famous landscape background — asymmetrical, with different horizon lines on left and right — contributes to the painting's dreamlike quality and was not based on any specific location.`,
    currentLocation: {
      type: "museum",
      name: "Musée du Louvre",
      city: "Paris",
      country: "France",
    },
    relatedSlugs: ["starry-night", "girl-with-pearl-earring"],
  },
  {
    slug: "starry-night",
    title: "The Starry Night",
    artistSlug: "zainul-abedin",
    artistName: "Vincent van Gogh",
    year: "1889",
    medium: "Oil on canvas",
    dimensions: "73.7 × 92.1 cm",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200",
    category: "international",
    movement: "Post-Impressionism / Expressionism",
    tags: ["van-gogh", "expressionism", "night", "stars", "swirls", "moma", "world-famous"],
    shortDescription: "Van Gogh's swirling, luminous nocturnal landscape painted from his room at the Saint-Paul-de-Mausole asylum — one of Western art's most beloved and reproduced images.",
    whyFamous: `The Starry Night is the most beloved painting by Van Gogh and one of the most recognised images in Western art. Its combination of emotional intensity, visual dynamism, and accessibility has made it a universal symbol of the human relationship with the cosmos.

The painting's power lies in its paradox: it depicts a night sky with scientific interest (Van Gogh was fascinated by astronomy) while rendering it with pure subjective emotion. The swirling vortices of light and cloud do not describe what a sky looks like — they describe what it feels like to look at it with an overwhelming inner life.

Van Gogh himself was ambivalent about the painting — he considered it a failure of realistic ambition. Yet it is precisely its departure from realism that gives it its power. In trying to paint his emotional response to the night, he created an image that speaks to the inner life of every viewer.`,
    creationStory: `Van Gogh painted The Starry Night in June 1889 from the window of his room at the Saint-Paul-de-Mausole asylum in Saint-Rémy-de-Provence, where he had voluntarily committed himself following the episode in which he cut off his own ear.

He painted the night view from memory in the daytime — he was not allowed outdoors at night. The village in the lower portion of the painting is a composite imagined from memory and sketches, not a literal view. The church steeple resembles those of his native Netherlands rather than the French provençal style.

He completed it relatively quickly — the impasto surface and the fluency of the swirling passages suggest sustained, confident work. He sent it to his brother Theo in Paris, describing it in his letters but not with particular pride.`,
    technique: `Van Gogh worked with extremely thick impasto — oil paint applied directly from the tube or with a palette knife, built up in ridges and swirls that create a literal three-dimensional relief on the canvas surface.

The swirling vortex shapes in the sky were applied with long, curved brushstrokes following the direction of the movement — a technique that gives the work its dynamic, kinetic quality. Stars are rendered as halos of light, circles of yellow and white surrounded by aureoles of blue and green.

He used a palette of cobalt and ultramarine blues, yellow ochre and chrome yellow for the stars and moon, with cadmium orange, emerald green, and raw umber for the landscape below.`,
    currentLocation: {
      type: "museum",
      name: "Museum of Modern Art (MoMA)",
      city: "New York",
      country: "United States",
    },
    relatedSlugs: ["mona-lisa", "girl-with-pearl-earring"],
  },
  {
    slug: "girl-with-pearl-earring",
    title: "Girl with a Pearl Earring",
    artistSlug: "zainul-abedin",
    artistName: "Johannes Vermeer",
    year: "c. 1665",
    medium: "Oil on canvas",
    dimensions: "44.5 × 39 cm",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1200",
    category: "international",
    movement: "Dutch Golden Age",
    tags: ["vermeer", "dutch", "portrait", "pearl", "golden-age", "mauritshuis", "world-famous"],
    shortDescription: "Vermeer's luminous tronie portrait of an unknown young woman in a turban and pearl earring — called the 'Mona Lisa of the North' for its enigmatic gaze and timeless beauty.",
    whyFamous: `Girl with a Pearl Earring is the most celebrated work by Vermeer and one of the most admired portraits in Western art — nicknamed the 'Mona Lisa of the North' for its enigmatic, captivating quality.

Like the Mona Lisa, its power lies in the relationship between sitter and viewer. The young woman is caught in the act of turning toward us — her lips slightly parted, her gaze both direct and uncertain. She appears to be about to speak, or to have just spoken. This frozen, intimate moment has fascinated viewers for 350 years.

Technically, it is a supreme example of Vermeer's mastery of light — particularly the way light falls across the white linen collar, the lips, and the extraordinary luminous pearl itself, which appears to glow from within despite being only a few brushstrokes.`,
    creationStory: `Vermeer painted the work around 1665 in Delft, Holland, during his artistic maturity. The sitter is unknown — she may be a member of his household, or a professional model, or a composite figure. The painting is classified as a tronie — a Dutch genre of idealised character study rather than a formal portrait.

Very little is known about the painting's history before the 19th century. It was bought at auction in The Hague in 1881 for 2 guilders and 30 cents — an astonishingly low price — by Arnoldus Andries des Tombe, who bequeathed it to the Mauritshuis in 1902.

The pearl earring itself has been the subject of scholarly debate: some argue it is not actually a pearl but a glass or tin drop, based on analysis of its unusually large size and perfect highlight.`,
    technique: `Vermeer prepared his canvases with careful ground layers before painting, working in thin, controlled glazes of oil paint applied over underpainted forms.

His mastery of light is achieved through careful observation of how light falls on different surfaces — the matte surface of skin, the reflective surface of the pearl, the sheen of the lips — and matching paint handling to each. He often used lead white thickly for the brightest lights, with optical glazes over the top to modify colour.

The dark background is unusually dark even for Vermeer — it may have darkened over time as glazes deteriorated — but it creates the effect of the figure emerging from darkness, making the light on her face and the earring seem even more luminous by contrast.`,
    currentLocation: {
      type: "museum",
      name: "Mauritshuis",
      city: "The Hague",
      country: "Netherlands",
    },
    relatedSlugs: ["mona-lisa", "starry-night"],
  },
  {
    slug: "persistence-of-memory",
    title: "The Persistence of Memory",
    artistSlug: "zainul-abedin",
    artistName: "Salvador Dalí",
    year: "1931",
    medium: "Oil on canvas",
    dimensions: "24 × 33 cm",
    image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=1200",
    category: "international",
    movement: "Surrealism",
    tags: ["dali", "surrealism", "time", "melting", "clocks", "moma", "world-famous", "dream"],
    shortDescription: "Salvador Dalí's small but unforgettable Surrealist canvas of melting clocks draped across a hallucinatory landscape — the defining image of the Surrealist movement.",
    whyFamous: `The Persistence of Memory is the definitive image of Surrealism and one of the most recognisable paintings of the 20th century. Its imagery — soft, melting pocket watches draped across a dreamlike landscape — has become a universal symbol of the strangeness of time and the logic of dreams.

Dalí painted it to visualise the 'Surrealist credo' more perfectly than almost any other single image: it places impossible, paradoxical imagery in a space rendered with photographic precision, creating a juxtaposition that feels simultaneously absurd and entirely convincing.

The painting illustrates the Surrealist idea that the unconscious mind operates according to different rules than waking reality — that in dreams, time is elastic, objects lose their solidity, the familiar becomes strange.`,
    creationStory: `Dalí painted The Persistence of Memory in 1931 in his studio in Cadaqués, on the Spanish Costa Brava. He described the idea as having arrived suddenly one afternoon while he was looking at a piece of melting Camembert cheese after lunch.

He completed the painting in approximately two hours — an extraordinary feat given its miniature detail and complex illusionistic space. It is among the smallest of his celebrated works — only 24 × 33 cm — which adds to its uncanny quality: so much strangeness in so small a space.

He showed it to his wife Gala before delivering it to the gallery. According to his account, she looked at it for a long time and said, 'Once one has seen it, one can never forget it.' He took this as confirmation that it achieved what he intended.`,
    technique: `Dalí used a precise, almost hyper-realistic oil technique — thin, smooth glazes applied with fine brushes, building up detail meticulously in a manner more reminiscent of Renaissance panel painting than 20th century modernism.

This extreme technical precision was deliberate: the Surrealist shock requires that the impossible imagery be rendered with complete convincingness. A loosely painted melting clock would be merely painterly; Dalí's technique makes it feel like a document of an actual, if impossible, event.

The landscape background — the cliffs of Cap de Creus in Catalonia — is recognisably real, creating a collision between documented geography and impossible imagery.`,
    currentLocation: {
      type: "museum",
      name: "Museum of Modern Art (MoMA)",
      city: "New York",
      country: "United States",
    },
    relatedSlugs: ["starry-night", "the-scream"],
  },
  {
    slug: "the-scream",
    title: "The Scream",
    artistSlug: "zainul-abedin",
    artistName: "Edvard Munch",
    year: "1893",
    medium: "Tempera and casein on cardboard",
    dimensions: "91 × 73.5 cm",
    image: "https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?w=1200",
    category: "international",
    movement: "Expressionism / Symbolism",
    tags: ["munch", "expressionism", "anxiety", "scream", "norway", "iconic", "world-famous"],
    shortDescription: "Edvard Munch's visceral image of a figure overwhelmed by existential anxiety against a blood-red sky — the founding masterwork of Expressionism and the most iconic image of human psychological distress in Western art.",
    whyFamous: `The Scream is the most recognisable symbol of psychological distress in Western art — an image so universally understood that it has transcended art history to become a cultural shorthand for anxiety, panic, and existential dread.

Munch painted it at a moment of personal crisis, but its power comes from its universality. The undulating landscape, the blood-red sky, and the agonised figure create a world where the entire environment has become a projection of interior suffering — where external nature and internal psychology are one.

This idea — that landscape and colour should express emotional states rather than describe observed reality — became foundational to Expressionism, one of the dominant artistic movements of the 20th century. Without The Scream, it is hard to imagine German Expressionism, Abstract Expressionism, or much of modern psychological art.`,
    creationStory: `Munch created the first version of The Scream in 1893 following an experience he described in his diary: walking with friends on a road above the Oslo fjord at sunset, he was suddenly overwhelmed by anxiety and saw the sky turn blood-red. His friends walked on; he stood, 'trembling with anxiety', sensing 'an infinite scream passing through nature.'

He produced four versions of the composition between 1893 and 1910 — in oil, tempera, pastel, and lithograph — exploring different aspects of the image. The most famous is the tempera version, which belonged to Norwegian businessman Thomas Olsen before being donated to the National Gallery in Oslo.

Two versions were stolen in high-profile thefts — one from the National Gallery in 1994 (recovered) and one from the Munch Museum in 2004 (also recovered). The thefts only added to the painting's mythic status.`,
    technique: `The Scream is painted in tempera and casein on cardboard — an unusual and relatively unstable support that has required considerable conservation attention. The choice of cardboard was probably economic, but it gives the surface a raw, non-precious quality appropriate to the imagery.

Munch used long, flowing, curving brushstrokes throughout — in the sky, the water, and the landscape — creating a sense that the entire visual field is in agitated motion. Only the railing and the distant figures of Munch's friends are rendered in straight lines, creating a tension between geometric stability and organic panic.

The figure itself is painted with a simplified, almost mask-like face — the hands pressed to the head, the mouth open in the silent scream that gives the work its name.`,
    currentLocation: {
      type: "museum",
      name: "National Museum of Norway",
      city: "Oslo",
      country: "Norway",
      owner: {
        name: "Nazmul Anwar Jewel",
        image: "/images/artists/owner_1.png",
        bio: "Art collector and patron based in Dhaka, Bangladesh. Has been collecting significant works of Bangladeshi modern art for over two decades, with a particular focus on preserving the legacy of S. M. Sultan and his contemporaries.",
        slug: "nazmul-anwar-jewel",
      },
    },
    relatedSlugs: ["starry-night", "persistence-of-memory"],
  },
  {
    slug: "guernica-picasso",
    title: "Guernica",
    artistSlug: "zainul-abedin",
    artistName: "Pablo Picasso",
    year: "1937",
    medium: "Oil on canvas",
    dimensions: "349.3 × 776.6 cm",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200",
    category: "international",
    movement: "Cubism / Anti-war",
    tags: ["picasso", "cubism", "anti-war", "guernica", "spain", "political", "world-famous"],
    shortDescription: "Picasso's monumental, anguished response to the Nazi bombing of the Basque town of Guernica — the greatest anti-war painting ever made and a permanent indictment of violence against civilians.",
    whyFamous: `Guernica is the most powerful anti-war artwork ever made — a vast, anguished, black-and-white painting that captures the horror of civilian suffering with unprecedented force.

Picasso painted it in response to the Nazi German bombing of the Basque town of Guernica on 26 April 1937, which killed and wounded hundreds of civilians. He had been commissioned by the Spanish Republican government to paint something for the 1937 Paris World's Fair; the bombing provided his subject.

The painting's power comes from its combination of Cubist fragmentation and raw emotional content. The dismembered bodies, screaming figures, dying horse, and burning buildings are rendered in a visual language of structural violence that perfectly mirrors its subject matter. It asks: how do you paint an atrocity? By making the painting itself an experience of disintegration.`,
    creationStory: `Picasso was in Paris when he heard news of the Guernica bombing. He began working immediately, producing dozens of preparatory studies over several weeks before beginning the large canvas (nearly 8 metres wide).

He worked in his large Grands-Augustins studio, photographed throughout the process by his lover Dora Maar. The photographs document an extraordinary creative process — figures appearing, disappearing, changing positions, the composition evolving through dozens of transformations before arriving at its final form.

He completed the painting in approximately six weeks — an astonishing pace given its size and complexity. It was exhibited at the Paris World's Fair in June 1937.`,
    technique: `Guernica is painted entirely in black, white, and grey — Picasso deliberately chose a monochromatic palette to evoke the black-and-white photography of newspaper war coverage, creating a work that feels documentary as well as painterly.

The composition combines Cubist spatial fragmentation — multiple viewpoints simultaneously, forms broken and reassembled — with a figurative clarity accessible to any viewer. The Cubist language is not intellectual but visceral: the fragmented forms embody the violence they describe.

The paint application is varied and gestural — Picasso worked quickly, with passages of fine detail beside rough, almost scrubbed areas. Surface texture, visible brushwork, and areas of thin wash all contribute to the urgency of the image.`,
    currentLocation: {
      type: "museum",
      name: "Museo Reina Sofía",
      city: "Madrid",
      country: "Spain",
    },
    relatedSlugs: ["the-scream", "liberation-war-poster-1971"],
  },
  {
    slug: "water-lilies-monet",
    title: "Water Lilies (Nymphéas)",
    artistSlug: "zainul-abedin",
    artistName: "Claude Monet",
    year: "1906",
    medium: "Oil on canvas",
    dimensions: "89.9 × 94.1 cm (single panel; series of ~250 paintings)",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200",
    category: "international",
    movement: "Impressionism / Late Impressionism",
    tags: ["monet", "impressionism", "water", "lilies", "garden", "series", "world-famous"],
    shortDescription: "Monet's series of approximately 250 paintings of his water garden at Giverny — a sustained, decade-long meditation on light, water, and colour that became the foundation of modern abstract painting.",
    whyFamous: `The Water Lilies series is one of the supreme artistic achievements of the 19th and 20th centuries — approximately 250 paintings made over the last three decades of Monet's life, documenting his garden pond at Giverny under every condition of light, season, and weather.

As a series, it represents something unprecedented: an artist making one subject his entire life's work in old age, going deeper and deeper into a single motif rather than seeking new subjects. The late panels — some of them vast, over 4 metres wide — approach pure abstraction, with the water surface dissolving into fields of colour that directly influenced the Abstract Expressionists fifty years later.

Jackson Pollock, Mark Rothko, and the entire New York School of the 1940s and 1950s were deeply aware of the late Water Lilies. In this sense, Monet's garden paintings are a direct ancestor of modern abstract painting.`,
    creationStory: `Monet began painting his water garden at Giverny in the 1890s, after he had the garden specially designed and the pond created and planted. He obtained special permission from local authorities to divert a stream to fill the pond.

He painted the water lilies obsessively, in all seasons and weathers, from a specially constructed floating studio and from the Japanese bridge he had built over the pond. As his eyesight deteriorated from cataracts in his 60s and 70s, his paintings became increasingly abstract — not out of artistic intention but because he literally could not see fine detail.

He was negotiating the donation of a group of enormous Water Lilies panels to the French state at the time of his death in 1926. These were installed in the Orangerie in Paris as an immersive environment — a complete room of water lily paintings on curved walls, one of the most extraordinary museum installations in the world.`,
    technique: `Monet worked en plein air — directly from observation in his garden — painting on large canvases attached to a wheeled easel. He typically returned to the same canvas at the same time of day over many sessions, building up layers of paint over weeks or months.

His handling of paint became increasingly free and gestural in the late works. Colour is applied in mosaic-like patches and strokes that, at close range, seem almost random, but cohere at viewing distance into shimmering, atmospheric surfaces.

He mixed colours with considerable titanium white to achieve the misty, luminous quality of light on water, and used long, horizontal brushstrokes to suggest the reflective surface of the pond.`,
    currentLocation: {
      type: "museum",
      name: "Art Institute of Chicago",
      city: "Chicago",
      country: "United States",
    },
    relatedSlugs: ["starry-night", "girl-with-pearl-earring"],
  },
];
