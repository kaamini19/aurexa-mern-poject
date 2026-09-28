const u = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const IMAGES = {
  hero: "/images/hero-bg.jpg",
  paper: u("photo-1616410731303-6affae095a0a", 1400),
};

export const COLLECTION = [
  {
    id: "art-1",
    title: "The Departure of the Argonauts",
    origin: "Circle of Giovanni Paolo Panini",
    period: "c. 1730",
    medium: "Oil on canvas",
    category: "Paintings",
    dimensions: "142 × 198 cm",
    provenance: "Private Collection, Milan; Thence by descent.",
    description: "An evocative masterwork depicting mythological grandeur with Panini's hallmark classical architecture, golden atmosphere, and sublime sense of monumental scale.",
    img: u("photo-1578301978162-7aae4d755744"),
  },
  {
    id: "art-2",
    title: "Venus at her Toilet",
    origin: "Italian School",
    period: "Late 18th Century",
    medium: "Carrara marble",
    category: "Sculptures",
    dimensions: "84 × 42 × 38 cm",
    provenance: "Palazzo Torlonia Collection, Rome.",
    description: "Carved from pristine statuary Carrara marble with breathtaking softness in drapery and anatomical grace, epitomizing neoclassical purity.",
    img: u("photo-1685062478366-907bf61feee0"),
  },
  {
    id: "art-3",
    title: "Funerary Mask of a Roman General",
    origin: "Roman Imperial",
    period: "2nd Century AD",
    medium: "Gilt bronze with niello inlay",
    category: "Artifacts",
    dimensions: "28 × 22 × 16 cm",
    provenance: "Excavated Campania, 1894; Collection of Prince Barberini.",
    description: "An extraordinary survival of Roman metallurgy, presenting individualized portraiture rendered in hammered bronze with intact gold leaf.",
    img: u("photo-1779497698182-2316ce352f94"),
  },
  {
    id: "art-4",
    title: "Roses and Peonies in a Glass Vase",
    origin: "Dutch School",
    period: "c. 1680",
    medium: "Oil on oak panel",
    category: "Classical",
    dimensions: "68 × 52 cm",
    provenance: "Van Rijn Estate, The Hague, 1722.",
    description: "A triumph of Golden Age chiaroscuro and botanical realism, rendered with dewdrop precision against deep nocturnal shadows.",
    img: u("photo-1579783901586-d88db74b4fe4"),
  },
  {
    id: "art-5",
    title: "Bust of a Vestal Virgin",
    origin: "Roman Antonine Period",
    period: "c. 140 AD",
    medium: "White Pentelic marble",
    category: "Sculptures",
    dimensions: "62 × 38 × 29 cm",
    provenance: "Acquired via Galerie Segoura, Paris, 1968.",
    description: "Exquisite veiled portraiture displaying the intricate coiffure and serene solemnity characteristic of imperial religious dedications.",
    img: u("photo-1625948085447-2881572802ca"),
  },
  {
    id: "art-6",
    title: "Chromatic Solitude No. 7",
    origin: "Contemporary European Master",
    period: "2024",
    medium: "Oil and mineral pigment on raw linen",
    category: "Contemporary",
    dimensions: "200 × 170 cm",
    provenance: "Artist's Studio, Basel; Private Collection, Zurich.",
    description: "A monumental study of light and negative space, bridging classical pigment layering with meditative abstract geometry.",
    img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "art-7",
    title: "Diana and her Companions",
    origin: "Flemish School",
    period: "c. 1620",
    medium: "Oil on canvas",
    category: "Paintings",
    dimensions: "164 × 220 cm",
    provenance: "Ducal Collection of Bavaria; Acquired 1934.",
    description: "Dynamic baroque composition celebrating pastoral mythology through rich jewel-toned drapery and dramatic atmospheric depth.",
    img: u("photo-1746039076922-7d8f7c38d972"),
  },
  {
    id: "art-8",
    title: "Corinthian Architectural Fragment",
    origin: "Greek Magna Graecia",
    period: "4th Century BC",
    medium: "Fine-grained limestone with traces of polychromy",
    category: "Artifacts",
    dimensions: "45 × 50 × 32 cm",
    provenance: "Sir Arthur Evans Collection, Oxford.",
    description: "Sculpted acanthus foliage demonstrating the zenith of Hellenistic architectural relief carving.",
    img: u("photo-1663324370858-2aaf45dbf11f"),
  },
  {
    id: "art-9",
    title: "The Silent Rostrum",
    origin: "Contemporary Atelier",
    period: "2025",
    medium: "Patinated black bronze & gold leaf",
    category: "Contemporary",
    dimensions: "110 × 40 × 40 cm",
    provenance: "Commissioned for AUREXA Private Collection.",
    description: "A striking minimalist bronze monolith that dialogues directly with classical antiquities in space and proportion.",
    img: u("photo-1771845220856-8c5fc1c3e93d"),
  },
  {
    id: "art-10",
    title: "Capriccio with Arch of Titus",
    origin: "Circle of Giovanni Paolo Panini",
    period: "c. 1745",
    medium: "Oil on canvas",
    category: "Classical",
    dimensions: "98 × 136 cm",
    provenance: "Lord Elgin Collection, Broomhall House.",
    description: "Romantic grand tour perspective combining authentic ancient Roman ruins with atmospheric sky and picturesque travelers.",
    img: u("photo-1578301978018-3005759f48f7"),
  },
];

export const CATEGORIES = [
  "All",
  "Paintings",
  "Sculptures",
  "Classical",
  "Contemporary",
  "Artifacts",
];

export const LOTS = [
  { no: "01", title: "The Penitent Magdalene", origin: "Follower of Guido Reni", period: "c. 1640", medium: "Oil on canvas", estimate: "€1,200,000 – 1,800,000", img: u("photo-1556005693-00fff02f134c") },
  { no: "02", title: "Standing Draped Figure", origin: "Italian, early 19th Century", period: "c. 1810", medium: "Statuary marble", estimate: "€380,000 – 520,000", img: u("photo-1662808141421-54240cbfd45f") },
  { no: "03", title: "Still Life with Peonies", origin: "Dutch School, 17th Century", period: "c. 1675", medium: "Oil on oak", estimate: "€460,000 – 700,000", img: u("photo-1700213396551-48c119a84c8e") },
  { no: "04", title: "Study of Hands", origin: "Roman, 1st Century AD", period: "Antiquity", medium: "Marble fragment", estimate: "€95,000 – 140,000", img: u("photo-1593494193844-c2bd6b1a0e16") },
  { no: "05", title: "Capriccio with Ruins", origin: "Manner of Panini", period: "c. 1750", medium: "Oil on canvas", estimate: "€240,000 – 360,000", img: u("photo-1578301978018-3005759f48f7") },
  { no: "06", title: "The Young Sculptor", origin: "French, c. 1880", period: "19th Century", medium: "Terracotta & plaster", estimate: "€180,000 – 260,000", img: u("photo-1742495211859-d2e95a1e9354") },
];

export const EDITION_ONE = [
  { no: "01", caption: "The Old Masters Room", img: u("photo-1554907984-15263bfd63bd") },
  { no: "02", caption: "The Marble Corridor", img: u("photo-1621886292650-520f76c747d6") },
  { no: "03", caption: "The Antiquities Cabinet", img: u("photo-1663324370858-2aaf45dbf11f") },
  { no: "04", caption: "The Ceiling of the Palazzo", img: u("photo-1583119912267-cc97c911e416") },
];

export const EDITION_TWO_IMG = u("photo-1627922155847-bd3df93573f8", 1400);

export const ARTICLES = [
  {
    title: "The Language of Objects",
    category: "On Connoisseurship",
    date: "12 June 2026",
    excerpt: "Every object speaks — in patina, in weight, in the hesitation of a chisel. Learning to listen is the first discipline of the collector.",
    img: u("photo-1570569977384-be17f90f1a10", 1200),
  },
  {
    title: "The Art of Collecting",
    category: "Essay",
    date: "28 May 2026",
    excerpt: "A collection is not an accumulation. It is an argument — made slowly, in marble, canvas and bronze — about what deserves to survive.",
    img: u("photo-1584727638057-78254f636b5a", 1200),
  },
  {
    title: "When Marble Becomes Memory",
    category: "Provenance",
    date: "14 May 2026",
    excerpt: "Stone forgets nothing. On the sculptures that have outlived empires, and the hands that carried them through the centuries.",
    img: u("photo-1592520543979-07ab03eba6ec", 1200),
  },
  {
    title: "The Return of Antiquity",
    category: "Essay",
    date: "30 April 2026",
    excerpt: "Why the world's most discerning rooms are once again making space for the ancient — and what the auction record fails to tell you.",
    img: u("photo-1689191416567-a6db4a507eb7", 1200),
  },
  {
    title: "What Makes an Object Collectible?",
    category: "Notes",
    date: "16 April 2026",
    excerpt: "Rarity, condition, provenance — and a fourth quality that no catalogue can print.",
    img: u("photo-1583934583792-262536fa7003", 1200),
  },
];

export const PARTNERS = [
  { tier: "Presenting Partner", names: ["Maison Verlaine"] },
  { tier: "Luxury Partners", names: ["Banque Héritage", "Maison Ardoise", "Hôtel Particulier"] },
  { tier: "Cultural Partners", names: ["Fondazione Belle Arti", "The Antiquarian Society", "Institut du Patrimoine"] },
  { tier: "Design Partners", names: ["Atelier Norr", "Studio Marbre"] },
  { tier: "Patrons", names: ["The Aureum Circle", "E. von Arx", "The Meridian Trust"] },
];

export const INTERESTS = [
  "Paintings",
  "Marble & Sculpture",
  "Antiquities",
  "Decorative Arts",
  "Collector's Objects",
  "Rare Objects",
];
