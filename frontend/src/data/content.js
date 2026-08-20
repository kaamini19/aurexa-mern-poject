const u = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const IMAGES = {
  hero: u("photo-1700144387984-44122b36998c", 2200),
  paper: u("photo-1616410731303-6affae095a0a", 1400),
};

export const COLLECTION = [
  { title: "The Departure of the Argonauts", origin: "Circle of Giovanni Paolo Panini", period: "c. 1730", medium: "Oil on canvas", category: "Paintings", img: u("photo-1578301978162-7aae4d755744") },
  { title: "Venus at her Toilet", origin: "Italian School", period: "Late 18th Century", medium: "Carrara marble", category: "Marble & Sculpture", img: u("photo-1685062478366-907bf61feee0") },
  { title: "Funerary Mask of a General", origin: "Roman Imperial", period: "2nd Century AD", medium: "Gilt bronze", category: "Antiquities", img: u("photo-1779497698182-2316ce352f94") },
  { title: "Roses in a Glass Vase", origin: "Dutch School", period: "c. 1680", medium: "Oil on oak panel", category: "Paintings", img: u("photo-1579783901586-d88db74b4fe4") },
  { title: "Empire Centrepiece", origin: "Paris", period: "c. 1810", medium: "Ormolu & patinated bronze", category: "Decorative Arts", img: "https://images.pexels.com/photos/35226355/pexels-photo-35226355.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { title: "Bust of a Vestal", origin: "Roman", period: "c. 120 AD", medium: "White marble", category: "Marble & Sculpture", img: u("photo-1625948085447-2881572802ca") },
  { title: "Mercury in Flight", origin: "After Giambologna", period: "19th Century", medium: "Bronze, dark patina", category: "Rare Objects", img: u("photo-1771845220856-8c5fc1c3e93d") },
  { title: "Diana and her Companions", origin: "Flemish School", period: "c. 1620", medium: "Oil on canvas", category: "Paintings", img: u("photo-1746039076922-7d8f7c38d972") },
];

export const CATEGORIES = [
  { name: "Paintings", count: "42 Works" },
  { name: "Marble & Sculpture", count: "18 Works" },
  { name: "Antiquities", count: "23 Works" },
  { name: "Decorative Arts", count: "31 Works" },
  { name: "Collector's Objects", count: "16 Works" },
  { name: "Rare Objects", count: "11 Works" },
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
