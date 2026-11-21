export type Category = "Products" | "Tools" | "Data viz" | "Coursework";
export const CATEGORIES: Category[] = ["Products", "Tools", "Data viz", "Coursework"];

export interface Project {
  title: string;
  image: string; // static still; doubles as the video poster
  video?: string; // optional mp4; plays on hover
  category: Category;
  pinned?: boolean; // large cards at the top; the rest go in the compact grid
  status?: string;
  year?: string | number;
  summary: string; // one sentence
  tags: string[];
  links: { label: string; href: string }[];
  accent?: string;
}

export const PROJECTS: Project[] = [
  {
    title: "AfterWord",
    image: "/images/projects/aw_mockup.jpeg",
    // video: "/images/projects/afterword.mp4",
    category: "Products",
    pinned: true,
    tags: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Mobile App"],
    accent: "#eef2ff",
    summary:
      "Reading companion that turns Kindle highlights into a searchable knowledge base using vector search and scalable ingestion pipelines.",
    links: [
      { label: "Get AfterWord", href: "https://getafterword.vercel.app/" },
      { label: "Blog Post", href: "/blog/devlog2" },
    ],
  },
    {
    title: "Pickle",
    image: "/images/projects/pickle_banner.png",
    // video: "/images/projects/afterword.mp4",
    category: "Products",
    pinned: true,
    tags: ["TypeScript", "Supabase", "PostgreSQL", "Mobile App"],
    accent: "#a7e271",
    summary:
      "Helps organize your saves across Instagram, Youtube, Articles, etc, and find them later easily with filters and search.",
    links: [
      { label: "Get Pickle", href: "https://keethapps.github.io/Pickle/" },
      // { label: "Blog Post", href: "/blog/devlog2" },
    ],
  },
  {
    title: "Jot",
    image: "/images/projects/jot_triage.gif", // swap for a still PNG once the mp4 exists
    video: "/images/projects/jot_triage.mp4",
    category: "Tools",
    pinned: true,
    status: "Mac download coming soon",
    tags: ["Electron", "macOS"],
    accent: "#fefce8",
    summary:
      "Electron app where a global hotkey opens a floating input that parses #folder, !priority, and due:date as you type.",
    links: [{ label: "Blog Post", href: "/blog/smallsoftware" }],
  },
  {
    title: "KrachBooks",
    image: "/images/projects/krachbooks_mockup1.png",
    // video: "/images/projects/krachbooks.mp4",
    category: "Products",
    pinned: true,
    tags: ["Python", "Streamlit", "Data Viz", "Dashboard"],
    accent: "#fff7ed",
    summary:
      "Streamlit dashboard that turns a book club's monthly CSV exports into stats, member badges, and a spin-wheel curator picker.",
    links: [
      { label: "Check it out!", href: "/blog/krachbooks" },
      { label: "Source Code", href: "https://github.com/vvegesna01/KrachBooks" },
    ],
  },
  {
    title: "Investogram",
    image: "/images/projects/investogram_profile.png",
    // video: "/images/projects/investogram.mp4",
    category: "Coursework",
    pinned: true,
    tags: ["React", "Next.js", "MongoDB", "Dashboard"],
    accent: "#ecfdf5",
    summary:
      "Play-money trading app with a portfolio dashboard, a leaderboard, and a social feed of posts, comments, and likes.",
    links: [
      { label: "Source Code", href: "https://github.com/CS-407/Investogram-Frontend" },
      { label: "Demo Slides", href: "https://docs.google.com/presentation/d/1m5OFbwTUwbOdZnJzoAFLw9boNMa-b-4CzSh_a33uPkQ" },
    ],
  },

  // ── More things I've built ──
  {
    title: "Pigeon Post",
    image: "/images/projects/pigeon_post.png",
    category: "Tools",
    tags: ["HTML/CSS/JS", "Local-first", "Email"],
    accent: "#f5f0e8",
    summary:
      "Journaling tool that turns diary entries into styled letters you email to yourself, built as a single zero-backend HTML file with local-only storage and .eml export.",
    links: [
      { label: "Try Pigeon Post", href: "https://pigeon-poster.vercel.app/" },
      { label: "Source Code", href: "https://github.com/vvegesna01/Pigeon-Post" },
      { label: "Blog Post", href: "/blog/pigeonpost" },
    ],
  },
  {
    title: "Where Does Your Data Go?",
    image: "/images/projects/datago_mockup.png",
    category: "Data viz",
    tags: ["Python", "Streamlit", "Data Viz"],
    accent: "#f0fdf4",
    summary:
      "Animated explainer that traces a photo upload, message, search, and video stream through CDNs, load balancers, and storage.",
    links: [
      { label: "Visit Live App", href: "https://where-does-your-data-go.streamlit.app/" },
      { label: "Source Code", href: "https://github.com/vvegesna01/Where-Does-Your-Data-Go" },
      { label: "Blog Post", href: "/blog/3_wheredoesyourdatago" },
    ],
  },
  {
    title: "Obsidian Movie Vault",
    image: "/images/projects/add_movie.gif",
    video: "/images/projects/add_movie.mp4",
    category: "Tools",
    status: "Tutorial coming soon",
    tags: ["Obsidian"],
    accent: "#fdf4ff",
    summary: "Obsidian setup that pulls IMDb metadata into a queryable local movie database using Dataview.",
    links: [],
  },
  {
    title: "Design Detective 🔎",
    image: "/images/projects/font_detective.gif",
    video: "/images/projects/font_detective.mp4",
    category: "Tools",
    tags: ["HTML/CSS/JS", "Browser Extension"],
    accent: "#fffbeb",
    summary: "Browser extension that copies the font name or hex code of anything you hover over.",
    links: [{ label: "Download Extension", href: "https://github.com/vvegesna01/Design-Detective" }],
  },
  // {
  //   title: "Shelf This",
  //   image: "/images/projects/shelf_this.png",
  //   category: "Data viz",
  //   tags: ["Python", "Streamlit", "Data Viz", "Dashboard"],
  //   accent: "#f0f9ff",
  //   summary: "Dashboard that visualizes reading habits from Goodreads and StoryGraph exports.",
  //   links: [
  //     { label: "Source Code", href: "https://github.com/vvegesna01/ShelfThis" },
  //     { label: "Go to Website", href: "https://shelfthis.streamlit.app/" },
  //   ],
  // },
  {
    title: "The Eras Tour Tracker",
    image: "/images/projects/eras_mockup.png",
    category: "Data viz",
    tags: ["React", "Next.js", "Data Viz", "Dashboard"],
    accent: "#fdf2f8",
    summary: "Interactive map of every Eras Tour show with venues, openers, and setlist analytics.",
    links: [
      { label: "Source Code", href: "https://github.com/vvegesna01/eras-tour-tracker" },
      { label: "Go to Website", href: "https://eras-tour-tracker.vercel.app/" },
    ],
  },
  {
    title: "PurduePAL",
    image: "/images/projects/purduePAL.png",
    category: "Coursework",
    tags: ["React", "Python", "MongoDB"],
    accent: "#f5f3ff",
    summary: "Social app for Purdue students with anonymous posting, interest-based pages, and profile customization.",
    links: [{ label: "Source Code", href: "https://github.com/CS307Spring2022/PurduePAL-Backend" }],
  },
  {
    title: "Shell Project",
    image: "/images/projects/shell.png",
    category: "Coursework",
    tags: ["C++", "Systems Programming"], // was "C", but the project is C++
    accent: "#f8fafc",
    summary: "C++ shell replicating csh and bash features including piping, redirection, subshells, and wildcard expansion.",
    // TODO: add your own repo here if it's public.
    links: [],
  },
];

// The original site, kept as a quiet footnote instead of a card with no description.
export const OLD_PORTFOLIO = {
  site: "https://vvegesna01.github.io/old-portfolio/",
  repo: "https://github.com/vvegesna01/old-portfolio",
};