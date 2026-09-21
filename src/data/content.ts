// All site content lives here. Edit this file to update text, links and data.
// Items in [square brackets] are placeholders to replace before launch.

export const PROFILE = {
  name: "Thejan Marasinhe",
  firstName: "Thejan",
  lastName: "Marasinhe",
  initials: "TM",
  role: "International Education Consultant",
  focus: "Australia",
};

export const CONTACT = {
  whatsapp: "94XXXXXXXXX", // digits only, with country code
  email: "you@example.com",
};

export const NAV = [
  { label: "About", href: "#about" },
  { label: "Australia", href: "#australia" },
  { label: "Destinations", href: "#destinations" },
  { label: "Stories", href: "#stories" },
  { label: "Tours", href: "#tours" },
  { label: "Contact", href: "#contact" },
];

export const HERO = {
  eyebrow: "Registered education agent · Australia · NZ · UK",
  promise: ["Study abroad.", "Choose the right destination.", "Build your future."],
  sub: "Personalised guidance for students planning to study in Australia, plus New Zealand, the United Kingdom, Europe, Asia and North America.",
};

// Card images live in public/images/services/. Wide cards: 1680 x 700 px. Standard cards: 1000 x 840 px.
// If an image file is missing, the card falls back to the plain design.
export const SERVICES = [
  { icon: "compass", title: "Destination selection", text: "Compare countries that suit your profile, not just the popular ones.", image: "/images/services/destination.webp" },
  { icon: "school", title: "University and course selection", text: "Find institutions and programs that fit your goals.", image: "/images/services/university.webp" },
  { icon: "wallet", title: "Budget planning", text: "Understand tuition, living costs and financial options before you commit.", image: "/images/services/budget.webp" },
  { icon: "file", title: "Application guidance", text: "Support with your documents and the application process.", image: "/images/services/application.webp" },
  { icon: "stamp", title: "Visa guidance", text: "Know which visa requirements and documents apply to you.", image: "/images/services/visa.webp" },
  { icon: "house", title: "Pre-departure", text: "Prepare for accommodation, travel and settling in overseas.", image: "/images/services/pre-departure.webp" },
  { icon: "rocket", title: "Career-focused planning", text: "Choose study with your longer-term career in mind.", image: "/images/services/career.webp" },
] as const;

export const AUSTRALIA = {
  heading: "Australia, done properly.",
  intro:
    "Australia is my main focus. As a registered education agent, I help you choose the right city, university and course, then guide you through the application and visa process.",
  pillars: [
    { title: "Post-study work", text: "Graduates may be eligible for the Temporary Graduate visa (subclass 485)." },
    { title: "Work while you study", text: "Student visa holders can work part-time, subject to visa conditions." },
    { title: "Recognised degrees", text: "Qualifications respected by employers around the world." },
    { title: "Multicultural life", text: "Large international student communities in every major city." },
  ],
  // City card images: public/images/cities/<name>.webp, 900 x 1260 px. Missing images fall back to the gradient design.
  cities: [
    { code: "SYD", name: "Sydney", state: "New South Wales", text: "Harbour city, Australia's largest city and a major business and finance hub.", good: ["Business", "IT", "Health"], hue: ["#FF7A3D", "#7C3AED"], image: "/images/cities/sydney.webp" },
    { code: "MEL", name: "Melbourne", state: "Victoria", text: "Culture, coffee and a huge student population. Regularly ranked among the world's most liveable cities.", good: ["IT", "Engineering", "Hospitality"], hue: ["#2DD4BF", "#1E3A8A"], image: "/images/cities/melbourne.webp" },
    { code: "BNE", name: "Brisbane", state: "Queensland", text: "Subtropical climate, relaxed lifestyle and host city of the 2032 Olympic Games.", good: ["Nursing", "Engineering", "Tourism"], hue: ["#FFB23F", "#DB2777"], image: "/images/cities/brisbane.webp" },
    { code: "PER", name: "Perth", state: "Western Australia", text: "Beaches, sunshine and the closest major Australian city to South Asia.", good: ["Engineering", "Health", "Business"], hue: ["#38BDF8", "#0F766E"], image: "/images/cities/perth.webp" },
    { code: "ADL", name: "Adelaide", state: "South Australia", text: "A calm, affordable city with a strong university and research scene.", good: ["Health", "Engineering", "IT"], hue: ["#F472B6", "#9A3412"], image: "/images/cities/adelaide.webp" },
  ],
};

export type FieldKey = "it" | "health" | "business" | "eng" | "hosp";
export type PriorityKey = "work" | "cost" | "near" | "english";

export const STUDY_FIELDS: { value: FieldKey | ""; label: string }[] = [
  { value: "", label: "Any field" },
  { value: "it", label: "IT and computing" },
  { value: "health", label: "Nursing and health" },
  { value: "business", label: "Business and management" },
  { value: "eng", label: "Engineering" },
  { value: "hosp", label: "Hospitality and tourism" },
];

export const PRIORITIES: { value: PriorityKey; label: string }[] = [
  { value: "work", label: "Post-study work" },
  { value: "cost", label: "Lower cost" },
  { value: "near", label: "Close to home" },
  { value: "english", label: "English-taught" },
];

export type Destination = {
  c: string;
  n: string;
  f: string;
  st: "reg" | "open";
  fields: FieldKey[];
  p: PriorityKey[];
  focus?: boolean;
};

// Matching tags are placeholders. Update them to reflect your own advice.
export const DESTINATIONS: Destination[] = [
  { c: "AUS", n: "Australia", f: "🇦🇺", st: "reg", fields: ["it", "health", "business", "eng", "hosp"], p: ["work", "english"], focus: true },
  { c: "NZL", n: "New Zealand", f: "🇳🇿", st: "reg", fields: ["it", "health", "business", "eng", "hosp"], p: ["work", "english"] },
  { c: "GBR", n: "United Kingdom", f: "🇬🇧", st: "reg", fields: ["it", "health", "business", "eng", "hosp"], p: ["work", "english"] },
  { c: "IRL", n: "Ireland", f: "🇮🇪", st: "open", fields: ["it", "business", "eng"], p: ["work", "english"] },
  { c: "CAN", n: "Canada", f: "🇨🇦", st: "open", fields: ["it", "health", "business", "eng", "hosp"], p: ["work", "english"] },
  { c: "FRA", n: "France", f: "🇫🇷", st: "open", fields: ["business", "hosp", "eng"], p: ["cost"] },
  { c: "FIN", n: "Finland", f: "🇫🇮", st: "open", fields: ["it", "eng", "business"], p: ["cost"] },
  { c: "MLT", n: "Malta", f: "🇲🇹", st: "open", fields: ["hosp", "business", "it"], p: ["cost", "english"] },
  { c: "CHE", n: "Switzerland", f: "🇨🇭", st: "open", fields: ["hosp", "business"], p: [] },
  { c: "ITA", n: "Italy", f: "🇮🇹", st: "open", fields: ["eng", "business"], p: ["cost"] },
  { c: "JPN", n: "Japan", f: "🇯🇵", st: "open", fields: ["it", "eng", "business"], p: ["near"] },
  { c: "SGP", n: "Singapore", f: "🇸🇬", st: "open", fields: ["it", "business", "hosp"], p: ["near", "english"] },
  { c: "MYS", n: "Malaysia", f: "🇲🇾", st: "open", fields: ["it", "business", "eng", "hosp"], p: ["near", "cost", "english"] },
  { c: "ARE", n: "Dubai / UAE", f: "🇦🇪", st: "open", fields: ["business", "hosp", "it"], p: ["near", "english"] },
];

export const DEST_INFO_KEYS = [
  "Popular programs",
  "Entry requirements",
  "Tuition range",
  "Scholarships and finance",
  "Student work",
  "Accommodation",
  "Visa information",
  "Post-study options",
  "Universities",
  "Current intakes",
];

// Optional per-country details. Anything missing shows "Ask for current details".
export const DEST_INFO: Record<string, Partial<Record<string, string>>> = {
  AUS: {
    "Popular programs": "IT, nursing, business, engineering, hospitality",
    "Student work": "Part-time work rights during study, subject to visa conditions",
    "Visa information": "Student visa (subclass 500)",
    "Post-study options": "Temporary Graduate visa (subclass 485), subject to eligibility",
  },
};

export const CREDENTIALS = [
  { flag: "🇦🇺", country: "Australia", status: "Current", title: "[Exact credential title, e.g. QEAC certification]", featured: true },
  { flag: "🇳🇿", country: "New Zealand", status: "Current", title: "[Exact credential title as issued]" },
  { flag: "🇬🇧", country: "United Kingdom", status: "Current", title: "[Exact credential title as issued]" },
  { flag: "🌍", country: "More destinations", status: "In progress", title: "Additional country registrations are on the way.", soon: true },
];

export const PARTNERSHIPS = [
  { caption: "Partnership meeting with [Institution]", place: "Colombo, Sri Lanka · 2026" },
  { caption: "University partnership discussion", place: "Melbourne, Australia · 2026" },
  { caption: "Industry collaboration", place: "Sri Lanka · 2026" },
  { caption: "Education fair", place: "[City] · 2026" },
  { caption: "Institution visit", place: "[City] · 2026" },
];

// Add a YouTube video id to show the real video instead of the placeholder.
export const TOURS = [
  { title: "Australian university visit", country: "Australia", flag: "🇦🇺", youtubeId: "" },
  { title: "University of West London campus tour", country: "United Kingdom", flag: "🇬🇧", youtubeId: "" },
  { title: "University visit", country: "Malaysia", flag: "🇲🇾", youtubeId: "" },
  { title: "University visit", country: "Sri Lanka", flag: "🇱🇰", youtubeId: "" },
];

export const STORY_FILTERS = [
  { key: "all", label: "All" },
  { key: "au", label: "Australia" },
  { key: "nz", label: "New Zealand" },
  { key: "uk", label: "UK" },
  { key: "asia", label: "Asia" },
];

export const STORIES = [
  { r: "au", name: "[Student name]", flag: "🇦🇺", country: "Australia", program: "Nursing", quote: "From my first consultation to enrolment…" },
  { r: "uk", name: "[Student name]", flag: "🇬🇧", country: "United Kingdom", program: "Master's", quote: "[Short quote from the video]" },
  { r: "asia", name: "[Student name]", flag: "🇲🇾", country: "Malaysia", program: "Bachelor's", quote: "[Short quote from the video]" },
  { r: "nz", name: "[Student name]", flag: "🇳🇿", country: "New Zealand", program: "Business", quote: "[Short quote from the video]" },
];

export const REVIEWS = [
  { text: "The guidance helped me understand my options and choose the right pathway.", name: "[Student name]", flag: "🇬🇧", country: "United Kingdom" },
  { text: "From the first consultation to my application, everything was explained clearly.", name: "[Student name]", flag: "🇦🇺", country: "Australia" },
  { text: "[Real review text from Google or a written testimonial]", name: "[Student name]", flag: "🇳🇿", country: "New Zealand" },
  { text: "[Real review text from Google or a written testimonial]", name: "[Student name]", flag: "🇲🇾", country: "Malaysia" },
];

export const ABOUT = {
  heading: "My journey in international education",
  paragraphs: [
    "My journey began with a simple goal: helping students make better decisions about their future.",
    "Since then, I've worked with students, universities, institutions and industry partners across several international education markets.",
    "Today I help students explore opportunities in Australia, New Zealand, the United Kingdom, Europe, Asia and North America.",
  ],
  motto: "Understand the student first. Then find the right destination, institution and pathway.",
};

export const STEPS = [
  { title: "Send your profile", text: "Share your academic background, English level and goals." },
  { title: "Profile assessment", text: "I review your circumstances and study objectives." },
  { title: "Explore your options", text: "We identify suitable countries, courses and universities." },
  { title: "Choose your path", text: "Compare options and pick the pathway that fits best." },
  { title: "Application and visa", text: "Guidance through your application and the relevant visa process." },
  { title: "Prepare to go", text: "Get ready for travel, accommodation and your first weeks." },
];

export const FORM_OPTIONS = {
  qualifications: ["O/L or equivalent", "A/L or equivalent", "Diploma", "Bachelor's degree", "Master's degree"],
  english: ["Not taken yet", "Booked", "IELTS completed", "PTE completed", "TOEFL completed", "Other"],
  budget: ["Not sure yet", "Under USD 10,000", "USD 10,000–20,000", "USD 20,000–35,000", "Over USD 35,000"],
};

export const SOCIALS = [
  { key: "instagram", label: "Instagram", handle: "@yourhandle", href: "#" },
  { key: "facebook", label: "Facebook", handle: "Your page", href: "#" },
  { key: "tiktok", label: "TikTok", handle: "@yourhandle", href: "#" },
  { key: "youtube", label: "YouTube", handle: "University tours", href: "#" },
  { key: "linkedin", label: "LinkedIn", handle: "Professional updates", href: "#" },
] as const;

export const TOPICS = ["🎓 Study abroad", "🌏 Destination updates", "🏫 University visits", "🎥 Student stories", "📚 Education tips", "🛂 Visa updates", "💼 Careers", "🎤 Webinars and events"];

export const ROUTE = [
  { f: "🇦🇺", c: "AUS" },
  { f: "🇳🇿", c: "NZL" },
  { f: "🇬🇧", c: "GBR" },
  { f: "🇪🇺", c: "EUR" },
  { f: "🇯🇵", c: "ASIA" },
  { f: "🇨🇦", c: "CAN" },
  { f: "🇦🇪", c: "UAE" },
];

// Partner logos (public/images/partners/). Shown on the loading screen and in the Partnerships section.
// Education and migration partners are listed first.
export const PARTNERS = [
  { name: "AusAsia Education & Migration", logo: "/images/partners/ausasia-education-migration.webp" },
  { name: "E4R Education & Recruiting", logo: "/images/partners/e4r-education-recruiting.webp" },
  { name: "SkillSync Australia", logo: "/images/partners/skillsync-australia.webp" },
  { name: "Skill City Recruitment", logo: "/images/partners/skill-city-recruitment.webp" },
  { name: "Skill City Facility Solutions", logo: "/images/partners/skill-city-facility-solutions.webp" },
  { name: "Skill City Security", logo: "/images/partners/skill-city-security.webp" },
  { name: "Melbourne TV", logo: "/images/partners/melbourne-tv.webp" },
  { name: "Zeylon TV", logo: "/images/partners/zeylon-tv.webp" },
  { name: "Melbourne Nilame", logo: "/images/partners/melbourne-nilame.webp" },
  { name: "Kandy Crown", logo: "/images/partners/kandy-crown.webp" },
  { name: "Aeye Creations", logo: "/images/partners/aeye-creations.webp" },
  { name: "Brand Crafters", logo: "/images/partners/brand-crafters.webp" },
  { name: "Braxd Crafters", logo: "/images/partners/braxd-crafters.webp" },
  { name: "Inkorax", logo: "/images/partners/inkorax.webp" },
  { name: "Studio Amazing Plus", logo: "/images/partners/studio-amazing-plus.webp" },
  { name: "Darkcloud Productions", logo: "/images/partners/darkcloud-productions.webp" },
  { name: "D Entertainment", logo: "/images/partners/d-entertainment.webp" },
  { name: "Heavenly Events", logo: "/images/partners/heavenly-events.webp" },
  { name: "Pixel Booth", logo: "/images/partners/pixel-booth.webp" },
  { name: "Samsul Creation", logo: "/images/partners/samsul-creation.webp" },
  { name: "Trendzii", logo: "/images/partners/trendzii.webp" },
  { name: "Langrow Naturals", logo: "/images/partners/langrow-naturals.webp" },
  { name: "Niro's Kitchen", logo: "/images/partners/niros-kitchen.webp" },
  { name: "Sweet Tamarind", logo: "/images/partners/sweet-tamarind.webp" },
  { name: "AutoGlen Detailing", logo: "/images/partners/autoglen-detailing.webp" },
  { name: "Tenth Car & Van Rental", logo: "/images/partners/tenth-car-van-rental.webp" },
  { name: "Traditional Fire Dance Costume", logo: "/images/partners/traditional-fire-dance-costume.webp" },
];

export const DISCLAIMER =
  "Visa information is general guidance. Immigration advice is provided only by appropriately licensed professionals.";
