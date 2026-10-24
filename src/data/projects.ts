// Single source of truth for projects. Imported by the Projects page and the
// homepage showcase. Flip `pinned` to control what appears in both.

// What kind of thing is it? Filters use this instead of tech tags, since a
// reader scanning a portfolio wants "is this serious?", not "does it use React?".
// Tech tags still show on each card.
export type Category = "Products" | "Tools" | "Data viz" | "Coursework";
export const CATEGORIES: Category[] = ["Products", "Tools", "Data viz", "Coursework"];

export interface Project {
  title: string;
  image: string;
  category: Category;
  // Pinned projects get the large stacked cards on the Projects page and the
  // bento tiles on the homepage. Everything else goes in the compact grid.
  pinned?: boolean;
  // Honest in-progress label instead of a dead "coming soon" button.
  status?: string;
  description: string[];
  tags: string[];
  links: { label: string; href: string }[];
  accent?: string;
}

export const PROJECTS: Project[] = [
  {
    title: "AfterWord",
    image: "/images/projects/aw_mockup.jpeg",
    category: "Products",
    pinned: true,
    tags: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Mobile App"],
    accent: "#eef2ff",
    description: [
      "AI-powered reading companion that transforms Kindle highlights into a searchable personal knowledge platform",
      "Semantic retrieval, vector search, AI-generated insights, reading analytics, and scalable ingestion pipelines",
    ],
    links: [
      { label: "Get AfterWord", href: "https://getafterword.vercel.app/" },
      { label: "Blog Post", href: "/blog/devlog2" },
    ],
  },
  {
    title: "Pigeon Post",
    image: "/images/projects/pigeon_post.png",
    category: "Tools",
    pinned: true,
    tags: ["HTML/CSS/JS", "Local-first", "Email"],
    accent: "#fbc3be",
    description: [
      "Journaling tool that turns diary entries into styled letters you email to yourself, making your inbox a searchable archive",
      "11 email templates, a perforated postage-stamp maker, and sign-off icons, built as a single zero-backend HTML file with local-only storage and .eml export",
    ],
    links: [
      { label: "Try Pigeon Post", href: "https://pigeon-poster.vercel.app/" },
      { label: "Source Code", href: "https://github.com/vvegesna01/Pigeon-Post" },
      { label: "Blog Post", href: "/blog/pigeonpost" },
    ],
  },
  {
    title: "KrachBooks",
    image: "/images/projects/krachbooks_mockup1.png",
    category: "Products",
    pinned: true,
    tags: ["Python", "Streamlit", "Data Viz", "Dashboard"],
    accent: "#fff7ed",
    description: [
      "Stats dashboard and badge tracker for a friend group book club",
      "Parses monthly CSV exports, Plotly charts, per-member badges, and a spin-wheel curator picker",
    ],
    links: [
      { label: "Check it out!", href: "/blog/krachbooks" },
      { label: "Source Code", href: "https://github.com/vvegesna01/KrachBooks" },
    ],
  },
  {
    title: "Jot",
    image: "/images/projects/jot_triage.gif",
    category: "Tools",
    pinned: true,
    status: "Mac download coming soon",
    tags: ["Electron", "macOS"],
    accent: "#fefce8",
    description: [
      "Global hotkey summons a minimal floating input — capture thoughts without breaking flow",
      "Inline syntax (#folder, !priority, due:date) parsed in real time with a full triage window",
    ],
    links: [{ label: "Blog Post", href: "/blog/smallsoftware" }],
  },
  {
    title: "Where Does Your Data Go?",
    image: "/images/projects/datago_mockup.png",
    category: "Data viz",
    tags: ["Python", "Streamlit", "Data Viz"],
    accent: "#f0fdf4",
    description: [
      "Visualizes the real-time journey of your data across CDNs, load balancers, servers, and storage",
      "Four animated scenarios: photo upload, message, search, and video stream",
    ],
    links: [
      { label: "Visit Live App", href: "https://where-does-your-data-go.streamlit.app/" },
      { label: "Source Code", href: "https://github.com/vvegesna01/Where-Does-Your-Data-Go" },
      // Slug matches the blog index (3_wheredoesyourdatago), not /blog/wheredoesyourdatago.
      { label: "Blog Post", href: "/blog/3_wheredoesyourdatago" },
    ],
  },
  {
    title: "Obsidian Movie Vault",
    image: "/images/projects/add_movie.gif",
    category: "Tools",
    status: "Tutorial coming soon",
    tags: ["Obsidian"],
    accent: "#fdf4ff",
    description: [
      "Personal movie database inside Obsidian — IMDb API pulls metadata, Dataview handles dynamic queries",
      "Sort and filter by genre, rating, or watch status; a lightweight local alternative to tracking apps",
    ],
    links: [],
  },
  {
    title: "Design Detective 🔎",
    image: "/images/projects/font_detective.gif",
    category: "Tools",
    tags: ["HTML/CSS/JS", "Browser Extension"],
    accent: "#fffbeb",
    description: [
      "Hover over any font or color on any website and copy the font name or hex code instantly",
    ],
    links: [{ label: "Download Extension", href: "https://github.com/vvegesna01/Design-Detective" }],
  },
  {
    title: "Shelf This",
    image: "/images/projects/shelf_this.png",
    category: "Data viz",
    tags: ["Python", "Streamlit", "Data Viz", "Dashboard"],
    accent: "#f0f9ff",
    description: [
      "Dashboard to visualise reading habits from Goodreads / Storygraph exports",
      "Stats: Highest Rated Reads, Books by Format, Reading Pace, and more",
    ],
    links: [
      { label: "Source Code", href: "https://github.com/vvegesna01/ShelfThis" },
      { label: "Go to Website", href: "https://shelfthis.streamlit.app/" },
    ],
  },
  {
    title: "The Eras Tour Tracker",
    image: "/images/projects/eras_mockup.png",
    category: "Data viz",
    tags: ["React", "Next.js", "Data Viz", "Dashboard"],
    accent: "#fdf2f8",
    description: [
      "Geo-coded tracker for Taylor Swift's Eras Tour — venues, openers, and song analytics on a live map",
      "Dynamic visual representation of setlists and venue info across all devices",
    ],
    links: [
      { label: "Source Code", href: "https://github.com/vvegesna01/eras-tour-tracker" },
      { label: "Go to Website", href: "https://eras-tour-tracker.vercel.app/" },
    ],
  },
  {
    title: "Investogram",
    image: "/images/projects/investogram_profile.png",
    category: "Coursework",
    tags: ["React", "Next.js", "MongoDB", "Dashboard"],
    accent: "#ecfdf5",
    description: [
      "Beginner trading app with play money — learn investing by doing, with a live social feed",
      "Portfolio dashboard, leaderboard, and full social layer: posts, comments, likes",
    ],
    links: [
      { label: "Source Code", href: "https://github.com/CS-407/Investogram-Frontend" },
      { label: "Demo Slides", href: "https://docs.google.com/presentation/d/1m5OFbwTUwbOdZnJzoAFLw9boNMa-b-4CzSh_a33uPkQ" },
    ],
  },
  {
    title: "PurduePAL",
    image: "/images/projects/purduePAL.png",
    category: "Coursework",
    tags: ["React", "Python", "MongoDB"],
    accent: "#f5f3ff",
    description: [
      "Social media app for Purdue students — posts, comments, likes, and interest-based pages",
      "Anonymous posting, profile customization with bio, photo, and username",
    ],
    links: [{ label: "Source Code", href: "https://github.com/CS307Spring2022/PurduePAL-Backend" }],
  },
  {
    title: "Shell Project",
    image: "/images/projects/shell.png",
    category: "Coursework",
    tags: ["C", "Systems Programming"],
    accent: "#f8fafc",
    description: [
      "Shell interpreter in C++ replicating csh and bash: piping, redirection, subshell, wildcard expansion",
      "Command history, path completion, exit signal handling, and environment variable expansion",
    ],
    // TODO: add your own repo here if it's public. If it has to stay private
    // for course policy, leaving this empty is fine.
    links: [],
  },
];

// The original site, shown as a quiet footnote on the Projects page.
export const OLD_PORTFOLIO = {
  site: "https://vvegesna01.github.io/old-portfolio/",
  repo: "https://github.com/vvegesna01/old-portfolio",
};