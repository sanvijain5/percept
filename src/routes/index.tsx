import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Bell,
  Bookmark,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Compass,
  Copy,
  Flame,
  Heart,
  Image as ImageIcon,
  Info,
  LayoutDashboard,
  Lightbulb,
  Lock,
  MessageCircle,
  MoreHorizontal,
  Moon,
  Plus,
  Search,
  Send,
  Settings,
  Shield,
  Sparkles,
  Sun,
  ThumbsUp,
  TrendingUp,
  Upload,
  UserRound,
  Users,
  Video,
  X,
  Zap,
  BarChart3,
  SlidersHorizontal,
  Flag,
  Ban,
  LogOut,
  Eye,
  Mic,
  Play,
  CheckCircle2,
  Menu,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ChangeEvent, type ReactNode, type CSSProperties } from "react";

export const Route = createFileRoute("/")({
  component: PerceptApp,
});

type Category =
  | "All"
  | "Career"
  | "Relationships"
  | "College"
  | "Style"
  | "Design"
  | "Life"
  | "Technology"
  | "Art";

type PostType = "text" | "image" | "video" | "poll" | "comparison";

type Perspective = {
  title: string;
  percent: number;
  tone: string;
  color: string;
  description: string;
};

type Post = {
  id: number;
  identity: string;
  category: Exclude<Category, "All">;
  title: string;
  body: string;
  type: PostType;
  image?: string;
  created: string;
  responses: number;
  likes: number;
  saved: boolean;
  liked: boolean;
  perspectiveCount: number;
  hot?: boolean;
  perspectives: Perspective[];
  tags: string[];
  aiSummary: string;
  responsesList: { id: number; identity: string; text: string; likes: number; liked: boolean }[];
};

const identities = [
  "Quiet Falcon #482",
  "Curious Fox #719",
  "Sage Sparrow #208",
  "Moss Owl #531",
  "Calm Comet #847",
  "Emerald Finch #316",
  "Thoughtful Wolf #624",
  "Hidden Willow #195",
];

const starterPosts: Post[] = [
  {
    id: 1,
    identity: "Quiet Falcon #482",
    category: "Career",
    title: "Would you leave a stable job to pursue something you actually love?",
    body: "I have a stable role but I keep thinking about switching paths. What would your honest first reaction be?",
    type: "text",
    created: "8 min ago",
    responses: 34,
    likes: 82,
    saved: false,
    liked: false,
    perspectiveCount: 4,
    hot: true,
    tags: ["career", "decision", "life"],
    aiSummary:
      "Most people support exploring the change, but a strong minority recommends protecting financial stability first. The common thread is to test the new path before making an irreversible move.",
    perspectives: [
      { title: "Take the opportunity", percent: 42, tone: "Optimistic", color: "#35c98a", description: "The opportunity to grow matters more than staying comfortable." },
      { title: "Wait until you're ready", percent: 27, tone: "Practical", color: "#78d6a8", description: "Build savings, skills and a fallback plan before moving." },
      { title: "Try it on the side", percent: 19, tone: "Balanced", color: "#b8f2d0", description: "Test the new direction without giving up the stable one." },
      { title: "Stay for now", percent: 12, tone: "Cautious", color: "#9ab8aa", description: "Stability can be valuable while you learn more about what you want." },
    ],
    responsesList: [
      { id: 11, identity: "Moss Owl #531", text: "If you can test the new path first, I would. You don't need to make the decision irreversible.", likes: 12, liked: false },
      { id: 12, identity: "Sage Sparrow #208", text: "Honestly, life is too short to stay somewhere you already know you don't want to be.", likes: 8, liked: false },
      { id: 13, identity: "Emerald Finch #316", text: "I'd calculate six months of expenses first. Freedom feels better when your basics are covered.", likes: 16, liked: false },
    ],
  },
  {
    id: 2,
    identity: "Curious Fox #719",
    category: "Style",
    title: "First impression: does this outfit feel professional or too casual?",
    body: "I have an interview next week. Be honest — what is the first thing you notice?",
    type: "image",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85",
    created: "21 min ago",
    responses: 61,
    likes: 143,
    saved: true,
    liked: true,
    perspectiveCount: 3,
    tags: ["style", "first-impression"],
    aiSummary: "The dominant perception is polished and confident. A smaller group feels the styling could be slightly more formal for a conservative interview.",
    perspectives: [
      { title: "Polished & confident", percent: 56, tone: "Positive", color: "#35c98a", description: "The silhouette and neutral palette read as intentional and professional." },
      { title: "A little too casual", percent: 29, tone: "Critical", color: "#78d6a8", description: "A more structured layer could make the look interview-ready." },
      { title: "Depends on the company", percent: 15, tone: "Contextual", color: "#b8f2d0", description: "The answer changes significantly with the workplace culture." },
    ],
    responsesList: [
      { id: 21, identity: "Calm Comet #847", text: "Professional overall. The neutral tones make it feel confident without trying too hard.", likes: 21, liked: false },
      { id: 22, identity: "Hidden Willow #195", text: "For a bank or law firm I would add a blazer. For a creative company this is great.", likes: 17, liked: false },
    ],
  },
  {
    id: 3,
    identity: "Sage Sparrow #208",
    category: "Design",
    title: "Which landing page feels more trustworthy?",
    body: "A/B comparison for a small student startup. Pick the one you would trust with your email.",
    type: "comparison",
    created: "42 min ago",
    responses: 48,
    likes: 97,
    saved: false,
    liked: false,
    perspectiveCount: 2,
    tags: ["design", "startup", "ux"],
    aiSummary: "People strongly prefer the cleaner layout because the hierarchy feels clearer and less promotional.",
    perspectives: [
      { title: "Cleaner wins", percent: 64, tone: "Strong signal", color: "#35c98a", description: "Less visual noise makes the product feel more credible." },
      { title: "More personality", percent: 36, tone: "Alternative", color: "#78d6a8", description: "A more expressive page can feel memorable and human." },
    ],
    responsesList: [
      { id: 31, identity: "Thoughtful Wolf #624", text: "The simpler version feels like it knows exactly what it wants me to do.", likes: 10, liked: false },
      { id: 32, identity: "Quiet Falcon #482", text: "I actually prefer the expressive one. Trust is also about personality.", likes: 7, liked: false },
    ],
  },
  {
    id: 4,
    identity: "Emerald Finch #316",
    category: "Relationships",
    title: "Is it better to say everything or protect someone's feelings?",
    body: "Sometimes honesty can hurt. Where do you draw the line?",
    type: "text",
    created: "1 hr ago",
    responses: 89,
    likes: 211,
    saved: false,
    liked: false,
    perspectiveCount: 5,
    hot: true,
    tags: ["relationships", "honesty", "boundaries"],
    aiSummary: "Responses split between radical honesty and compassionate timing. Most agree that honesty matters, but not every truth needs to be delivered immediately.",
    perspectives: [
      { title: "Honesty first", percent: 36, tone: "Direct", color: "#35c98a", description: "People deserve the truth to make informed decisions." },
      { title: "Kindness changes timing", percent: 28, tone: "Compassionate", color: "#78d6a8", description: "The truth can be true and still need a kinder delivery." },
      { title: "Context matters", percent: 19, tone: "Nuanced", color: "#b8f2d0", description: "The relationship, stakes and intention should shape the choice." },
      { title: "Protect feelings", percent: 11, tone: "Gentle", color: "#9ab8aa", description: "Some truths can be unnecessarily painful when they do not help." },
      { title: "Unsure", percent: 6, tone: "Reflective", color: "#668c7a", description: "There may be no universal rule." },
    ],
    responsesList: [
      { id: 41, identity: "Blue Sparrow #407", text: "I would rather know a difficult truth than build a relationship around a lie.", likes: 28, liked: false },
      { id: 42, identity: "Moss Owl #531", text: "Honesty without empathy is just cruelty with good branding.", likes: 31, liked: false },
    ],
  },
  {
    id: 5,
    identity: "Calm Comet #847",
    category: "College",
    title: "Would you choose a lower-paying job with a better learning curve?",
    body: "Assume the company is stable and the team is good. Which factor matters more at 21?",
    type: "poll",
    created: "2 hr ago",
    responses: 122,
    likes: 264,
    saved: false,
    liked: false,
    perspectiveCount: 3,
    tags: ["college", "career", "poll"],
    aiSummary: "The strongest signal favors learning early in a career, but compensation becomes more important when financial responsibilities increase.",
    perspectives: [
      { title: "Optimize for learning", percent: 58, tone: "Growth", color: "#35c98a", description: "Skills compound quickly when you are early in your career." },
      { title: "Balance both", percent: 28, tone: "Balanced", color: "#78d6a8", description: "A reasonable salary and strong learning environment can coexist." },
      { title: "Take the money", percent: 14, tone: "Practical", color: "#b8f2d0", description: "Higher compensation can create options and reduce stress." },
    ],
    responsesList: [
      { id: 51, identity: "Hidden Willow #195", text: "At the beginning, I would optimize for the people and problems I get to work on.", likes: 19, liked: false },
      { id: 52, identity: "Sage Sparrow #208", text: "Money matters, but a great mentor can change your trajectory.", likes: 14, liked: false },
    ],
  },
];

const starterNotifications = [
  { id: 1, title: "Your perspective map is ready", text: "Quiet Falcon #482 has enough responses for an AI summary.", time: "8 min", type: "ai" },
  { id: 2, title: "Someone saved your perspective", text: "A reader found your answer helpful.", time: "23 min", type: "save" },
  { id: 3, title: "New connection request", text: "A perspective you liked wants to connect anonymously.", time: "1 hr", type: "connect" },
];

function PerceptApp() {
  const [signedIn, setSignedIn] = useState<boolean>(() => loadState("percept-session", true));
  const [posts, setPosts] = useState<Post[]>(() => loadState("percept-posts", starterPosts));
  const [active, setActive] = useState("Home");
  const [category, setCategory] = useState<Category>("All");
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">(() => loadState("percept-theme", "dark"));
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [notifications, setNotifications] = useState(starterNotifications);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [toast, setToast] = useState("");
  const [connected, setConnected] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  useEffect(() => saveState("percept-session", signedIn), [signedIn]);
  useEffect(() => saveState("percept-posts", posts), [posts]);
  useEffect(() => {
    saveState("percept-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
    if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }
  }, [theme]);
  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(t);
  }, [toast]);

  const filteredPosts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return posts.filter((p) => {
      const categoryMatch = category === "All" || p.category === category;
      const searchMatch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.body.toLowerCase().includes(q) ||
        p.tags.some((tag) => tag.includes(q));
      const savedMatch = active === "Saved" ? p.saved : true;
      return categoryMatch && searchMatch && savedMatch;
    });
  }, [posts, category, search, active]);

  function navigate(item: string) {
    setActive(item);
    setSelectedPost(null);
    setShowCreate(false);
    setShowSearch(false);
    setShowNotifications(false);
    setMobileNav(false);
  }

  function updatePost(id: number, updater: (post: Post) => Post) {
    setPosts((current) => current.map((p) => (p.id === id ? updater(p) : p)));
  }

  function toggleLike(id: number) {
    updatePost(id, (p) => ({ ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) }));
  }

  function toggleSave(id: number) {
    updatePost(id, (p) => ({ ...p, saved: !p.saved }));
    setToast("Saved to your collection");
  }

  function handlePublish(data: { title: string; body: string; category: Exclude<Category, "All">; type: PostType; image?: string; tags: string[] }) {
    const newPost: Post = {
      id: Date.now(),
      identity: identities[Math.floor(Math.random() * identities.length)],
      category: data.category,
      title: data.title,
      body: data.body,
      type: data.type,
      image: data.image,
      created: "just now",
      responses: 0,
      likes: 0,
      saved: false,
      liked: false,
      perspectiveCount: 0,
      tags: data.tags.length ? data.tags : [data.category.toLowerCase()],
      aiSummary: "AI is waiting for more perspectives. Once enough responses arrive, Percept will map the viewpoints.",
      perspectives: [],
      responsesList: [],
    };
    setPosts((p) => [newPost, ...p]);
    setShowCreate(false);
    setActive("Home");
    setToast("Your perception is live — anonymously.");
  }

  if (!signedIn) {
    return (
      <AuthScreen
        theme={theme}
        setTheme={setTheme}
        onSignIn={() => setSignedIn(true)}
      />
    );
  }

  return (
    <div className={`percept-shell ${theme}`}>
      <AmbientBackground />
      <div className="app-grid">
        <Sidebar active={active} onNavigate={navigate} onCreate={() => setShowCreate(true)} />
        <main className="main-column">
          <Topbar
            search={search}
            setSearch={setSearch}
            onSearch={() => setShowSearch(true)}
            onNotifications={() => setShowNotifications((v) => !v)}
            onProfile={() => setShowProfileMenu((v) => !v)}
            onProfileNavigate={() => { setShowProfileMenu(false); navigate("Profile"); }}
            onSettings={() => { setShowProfileMenu(false); navigate("Settings"); }}
            onSignOut={() => { setShowProfileMenu(false); setSignedIn(false); }}
            notificationCount={notifications.length}
            theme={theme}
            setTheme={setTheme}
            showProfileMenu={showProfileMenu}
            onChat={() => setChatOpen(true)}
          />

          {active === "Home" && (
            <HomeView
              posts={filteredPosts}
              category={category}
              setCategory={setCategory}
              onCreate={() => setShowCreate(true)}
              onOpen={setSelectedPost}
              onLike={toggleLike}
              onSave={toggleSave}
              onNavigate={navigate}
            />
          )}

          {active === "Explore" && (
            <ExploreView
              posts={posts}
              onOpen={setSelectedPost}
              onNavigate={navigate}
              onCreate={() => setShowCreate(true)}
            />
          )}

          {active === "Saved" && (
            <SavedView posts={filteredPosts} onOpen={setSelectedPost} onSave={toggleSave} onNavigate={navigate} />
          )}

          {active === "Connections" && (
            <ConnectionsView connected={connected} setConnected={setConnected} onChat={() => setChatOpen(true)} />
          )}

          {active === "Notifications" && (
            <NotificationsView notifications={notifications} clear={() => setNotifications([])} />
          )}

          {active === "Profile" && <ProfileView posts={posts} onOpen={setSelectedPost} />}
          {active === "Settings" && <SettingsView theme={theme} setTheme={setTheme} onToast={setToast} />}

          {active === "Safety" && <SafetyView />}

          {active === "About" && <AboutView onCreate={() => setShowCreate(true)} />}

          <MobileNav active={active} onNavigate={navigate} onCreate={() => setShowCreate(true)} />
        </main>
      </div>

      {selectedPost && (
        <PostModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onLike={toggleLike}
          onSave={toggleSave}
          onToast={setToast}
          onConnect={() => {
            setConnected(true);
            setToast("Connection request sent anonymously.");
          }}
        />
      )}

      {showCreate && <CreateModal onClose={() => setShowCreate(false)} onPublish={handlePublish} />}

      {showNotifications && (
        <NotificationPopover
          notifications={notifications}
          onClose={() => setShowNotifications(false)}
          onOpen={() => {
            setShowNotifications(false);
            navigate("Notifications");
          }}
        />
      )}

      {showSearch && (
        <SearchOverlay
          search={search}
          setSearch={setSearch}
          posts={posts}
          onClose={() => setShowSearch(false)}
          onOpen={(post) => {
            setShowSearch(false);
            setSelectedPost(post);
          }}
        />
      )}

      {chatOpen && <ChatModal onClose={() => setChatOpen(false)} />}

      {toast && <div className="toast"><CheckCircle2 size={17} /> {toast}</div>}
    </div>
  );
}

function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden="true">
      <span className="orb orb-a" />
      <span className="orb orb-b" />
      <span className="orb orb-c" />
      <span className="grain" />
    </div>
  );
}

function Sidebar({ active, onNavigate, onCreate }: { active: string; onNavigate: (x: string) => void; onCreate: () => void }) {
  const items = [
    { label: "Home", icon: LayoutDashboard },
    { label: "Explore", icon: Compass },
    { label: "Saved", icon: Bookmark },
    { label: "Connections", icon: Users },
  ];
  return (
    <aside className="sidebar">
      <div className="brand" onClick={() => onNavigate("Home")} role="button" tabIndex={0}>
        <div className="brand-mark"><Sparkles size={18} /></div>
        <div><strong>percept</strong><span>everyone sees it differently</span></div>
      </div>
      <button className="ask-button" onClick={onCreate}><Plus size={18} /> Ask the world <span>⌘N</span></button>
      <div className="nav-section">
        <span className="nav-label">Discover</span>
        {items.map(({ label, icon: Icon }) => (
          <button key={label} className={`nav-item ${active === label ? "active" : ""}`} onClick={() => onNavigate(label)}>
            <Icon size={18} /><span>{label}</span>
            {label === "Connections" && <em>2</em>}
          </button>
        ))}
      </div>
      <div className="nav-section">
        <span className="nav-label">Your space</span>
        {[
          { label: "Notifications", icon: Bell },
          { label: "Profile", icon: UserRound },
          { label: "Settings", icon: Settings },
        ].map(({ label, icon: Icon }) => (
          <button key={label} className={`nav-item ${active === label ? "active" : ""}`} onClick={() => onNavigate(label)}>
            <Icon size={18} /><span>{label}</span>
            {label === "Notifications" && <em>3</em>}
          </button>
        ))}
      </div>
      <div className="sidebar-spacer" />
      <div className="sidebar-card">
        <div className="tiny-orbit"><span /><span /><span /></div>
        <strong>Perspective Map</strong>
        <p>Turn scattered opinions into a clearer picture.</p>
        <button onClick={() => onNavigate("Explore")}>See how it works <ArrowRight size={14} /></button>
      </div>
      <button className={`nav-item ${active === "Safety" ? "active" : ""}`} onClick={() => onNavigate("Safety")}><Shield size={18} /><span>Safety center</span></button>
      <button className={`nav-item ${active === "About" ? "active" : ""}`} onClick={() => onNavigate("About")}><CircleHelp size={18} /><span>About Percept</span></button>
    </aside>
  );
}

function Topbar({
  search, setSearch, onSearch, onNotifications, onProfile, onProfileNavigate, onSettings, onSignOut,
  notificationCount, theme, setTheme, showProfileMenu, onChat,
}: {
  search: string; setSearch: (x: string) => void; onSearch: () => void; onNotifications: () => void; onProfile: () => void;
  onProfileNavigate: () => void; onSettings: () => void; onSignOut: () => void;
  notificationCount: number; theme: "dark" | "light"; setTheme: (x: "dark" | "light") => void; showProfileMenu: boolean; onChat: () => void;
}) {
  return (
    <header className="topbar">
      <div className="mobile-brand"><div className="brand-mark"><Sparkles size={17} /></div><strong>percept</strong></div>
      <div className="search-box" onClick={onSearch}>
        <Search size={17} />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search perspectives..." onClick={(e) => e.stopPropagation()} />
        <kbd>⌘ K</kbd>
      </div>
      <div className="top-actions">
        <button className="icon-btn mobile-only" onClick={onSearch}><Search size={18} /></button>
        <button className="icon-btn" onClick={onChat} title="Open anonymous chat"><MessageCircle size={18} /></button>
        <button className="icon-btn notification-btn" onClick={onNotifications}><Bell size={18} />{notificationCount > 0 && <i>{notificationCount}</i>}</button>
        <button className="icon-btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} title="Toggle theme">
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="profile-trigger" onClick={onProfile}>
          <Avatar name="Quiet Falcon" />
          <ChevronDown size={14} />
        </button>
        {showProfileMenu && <div className="profile-menu">
          <div className="menu-user"><Avatar name="Quiet Falcon" /><div><strong>Quiet Falcon #482</strong><span>Anonymous explorer</span></div></div>
          <button onClick={onProfileNavigate}><UserRound size={15} /> My profile</button>
          <button onClick={onSettings}><Settings size={15} /> Settings</button>
          <button className="danger" onClick={onSignOut}><LogOut size={15} /> Sign out</button>
        </div>}
      </div>
    </header>
  );
}

function AuthScreen({
  theme,
  setTheme,
  onSignIn,
}: {
  theme: "dark" | "light";
  setTheme: (x: "dark" | "light") => void;
  onSignIn: () => void;
}) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Enter your email and password to continue.");
      return;
    }
    setError("");
    onSignIn();
  }

  return (
    <div className={`auth-shell ${theme}`}>
      <AmbientBackground />
      <div className="auth-card">
        <div className="auth-brand">
          <div className="brand-mark"><Sparkles size={20} /></div>
          <div><strong>percept</strong><span>everyone sees it differently</span></div>
        </div>
        <div className="auth-copy">
          <span className="eyebrow"><Lock size={13} /> Anonymous by design</span>
          <h1>{mode === "signin" ? "Welcome back." : "Create your perspective space."}</h1>
          <p>Ask anonymously. Hear honest reactions. Let Percept reveal the patterns.</p>
        </div>
        <div className="auth-tabs">
          <button className={mode === "signin" ? "active" : ""} onClick={() => { setMode("signin"); setError(""); }}>Sign in</button>
          <button className={mode === "signup" ? "active" : ""} onClick={() => { setMode("signup"); setError(""); }}>Create account</button>
        </div>
        <form className="auth-form" onSubmit={submit}>
          {mode === "signup" && <input aria-label="Name" placeholder="Optional display name" />}
          <input aria-label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          <input aria-label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          {error && <div className="auth-error">{error}</div>}
          <button className="primary-btn auth-submit" type="submit">
            {mode === "signin" ? "Enter Percept" : "Create anonymously"} <ArrowRight size={16} />
          </button>
        </form>
        <div className="auth-divider"><span>or</span></div>
        <button className="auth-secondary" onClick={onSignIn}><Users size={16} /> Continue with demo account</button>
        <div className="auth-privacy"><Shield size={14} /> Your public identity is always anonymous.</div>
        <button className="theme-switch" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />} {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </div>
  );
}

function Avatar({ name, size = "normal" }: { name: string; size?: "small" | "normal" | "large" }) {
  const colors = ["#35c98a", "#78d6a8", "#b8f2d0", "#9ab8aa"];
  const n = name.charCodeAt(0) % colors.length;
  return <div className={`avatar ${size}`} style={{ "--avatar": colors[n] } as CSSProperties}><span>{name.slice(0, 1)}</span></div>;
}

function HomeView({
  posts, category, setCategory, onCreate, onOpen, onLike, onSave, onNavigate,
}: {
  posts: Post[]; category: Category; setCategory: (x: Category) => void; onCreate: () => void;
  onOpen: (x: Post) => void; onLike: (x: number) => void; onSave: (x: number) => void; onNavigate: (x: string) => void;
}) {
  return (
    <div className="content">
      <section className="hero-row">
        <div>
          <div className="eyebrow"><span className="pulse-dot" /> The anonymous perspective network</div>
          <h1>One question.<br /><em>Many perspectives.</em></h1>
          <p className="hero-copy">Ask anything without attaching your identity. Hear honest reactions from people around the world — then let AI show you the patterns.</p>
          <div className="hero-actions">
            <button className="primary-btn" onClick={onCreate}><Sparkles size={17} /> Ask the world <ArrowRight size={16} /></button>
            <button className="ghost-btn" onClick={() => onNavigate("Explore")}>Explore perspectives</button>
          </div>
          <div className="trust-row"><Lock size={14} /> Your identity stays yours <span /> <Users size={14} /> 100% anonymous by default</div>
        </div>
        <PerspectiveHero />
      </section>

      <section className="feed-header">
        <div>
          <span className="section-kicker">The world is talking</span>
          <h2>Fresh perspectives</h2>
        </div>
        <div className="feed-controls">
          <div className="segmented">
            {(["All", "Career", "Relationships", "Style", "Design", "College"] as Category[]).map((c) => (
              <button key={c} className={category === c ? "selected" : ""} onClick={() => setCategory(c)}>{c}</button>
            ))}
          </div>
          <button className="filter-btn"><SlidersHorizontal size={15} /> Filter</button>
        </div>
      </section>

      <div className="feed-grid">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onOpen={onOpen} onLike={onLike} onSave={onSave} />
        ))}
      </div>
      {!posts.length && <EmptyState title="No perspectives found" text="Try another category or ask the world a new question." action="Create a perception" onAction={onCreate} />}
    </div>
  );
}

function PerspectiveHero() {
  return (
    <div className="perspective-hero">
      <div className="hero-grid" />
      <div className="hero-question">
        <span>LIVE EXAMPLE</span>
        <strong>Should I move to another city?</strong>
        <small>64 anonymous perspectives</small>
      </div>
      <div className="orbit-line orbit-1" />
      <div className="orbit-line orbit-2" />
      <PerspectiveBubble className="bubble-one" percent="42%" title="Take the opportunity" color="#35c98a" />
      <PerspectiveBubble className="bubble-two" percent="27%" title="Stay for now" color="#78d6a8" />
      <PerspectiveBubble className="bubble-three" percent="19%" title="Try it first" color="#b8f2d0" />
      <PerspectiveBubble className="bubble-four" percent="12%" title="Depends on career" color="#7da895" />
      <div className="ai-orb"><Sparkles size={20} /><span>AI</span></div>
      <div className="hero-caption"><BarChart3 size={14} /> AI Perspective Map</div>
    </div>
  );
}

function PerspectiveBubble({ className, percent, title, color }: { className: string; percent: string; title: string; color: string }) {
  return <div className={`perspective-bubble ${className}`} style={{ "--bubble": color } as CSSProperties}><b>{percent}</b><span>{title}</span></div>;
}

function PostCard({ post, onOpen, onLike, onSave }: { post: Post; onOpen: (x: Post) => void; onLike: (x: number) => void; onSave: (x: number) => void }) {
  return (
    <article className={`post-card ${post.hot ? "hot" : ""}`}>
      <div className="post-top">
        <div className="identity">
          <Avatar name={post.identity} size="small" />
          <div><strong>{post.identity}</strong><span>{post.created} · {post.category}</span></div>
        </div>
        <button className="more-btn"><MoreHorizontal size={18} /></button>
      </div>
      <div className="post-content" onClick={() => onOpen(post)}>
        <div className="post-type-row">
          {post.hot && <span className="hot-pill"><Flame size={12} /> Trending</span>}
          <span className="type-pill">{post.type === "image" ? <ImageIcon size={12} /> : post.type === "video" ? <Video size={12} /> : post.type === "poll" ? <BarChart3 size={12} /> : <Lightbulb size={12} />} {post.type}</span>
        </div>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        {post.image && <div className="post-image"><img src={post.image} alt="Perception request" /></div>}
        {post.type === "comparison" && <ComparisonPreview />}
        {post.type === "poll" && <PollPreview />}
      </div>
      <div className="tag-row">{post.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>
      <div className="post-stats">
        <button onClick={() => onOpen(post)}><MessageCircle size={15} /> {post.responses}</button>
        <span><Sparkles size={14} /> {post.perspectiveCount || "—"} perspectives</span>
      </div>
      <div className="post-actions">
        <button className={post.liked ? "liked" : ""} onClick={() => onLike(post.id)}><Heart size={17} fill={post.liked ? "currentColor" : "none"} /> {post.likes}</button>
        <button onClick={() => onOpen(post)}><MessageCircle size={17} /> Respond</button>
        <button className={post.saved ? "saved" : ""} onClick={() => onSave(post.id)}><Bookmark size={17} fill={post.saved ? "currentColor" : "none"} /></button>
        <button><MoreHorizontal size={17} /></button>
      </div>
    </article>
  );
}

function ComparisonPreview() {
  return <div className="comparison-preview"><div><span>A</span><div className="mock-design a">P</div><b>61%</b></div><div className="versus">VS</div><div><span>B</span><div className="mock-design b">P</div><b>39%</b></div></div>;
}
function PollPreview() {
  return <div className="poll-preview"><div><span>Learning curve</span><b>58%</b></div><div><span>Balance both</span><b>28%</b></div><div><span>Take the money</span><b>14%</b></div></div>;
}

function ExploreView({ posts, onOpen, onNavigate, onCreate }: { posts: Post[]; onOpen: (x: Post) => void; onNavigate: (x: string) => void; onCreate: () => void }) {
  const categories = [
    ["Career", "Decisions, ambition & work", "↗", "#35c98a"],
    ["Relationships", "Love, friendship & boundaries", "♡", "#78d6a8"],
    ["Design", "Creative choices & first impressions", "◈", "#b8f2d0"],
    ["College", "Campus, learning & early career", "✦", "#9ab8aa"],
    ["Style", "Outfits, aesthetics & confidence", "✧", "#72b894"],
    ["Life", "The questions nobody has answers for", "∞", "#4f9a79"],
  ];
  const mostDivided = [...posts].sort((a, b) => b.perspectiveCount - a.perspectiveCount).slice(0, 3);
  return <div className="content">
    <section className="page-heading">
      <div><span className="section-kicker">Explore</span><h1>Find a perspective<br /><em>you didn't expect.</em></h1></div>
      <button className="primary-btn" onClick={onCreate}><Plus size={17} /> Ask the world</button>
    </section>
    <div className="category-grid">
      {categories.map(([title, text, symbol, color]) => <button key={title} className="category-card" onClick={() => { onNavigate("Home"); }}>
        <span style={{ color }}>{symbol}</span><div><strong>{title}</strong><p>{text}</p></div><ArrowRight size={16} />
      </button>)}
    </div>
    <section className="explore-section"><div className="section-head"><div><span className="section-kicker">Signal</span><h2>Most divided</h2></div><span className="soft-label">Where perspectives disagree</span></div>
      <div className="divided-grid">{mostDivided.map((p) => <button className="divided-card" key={p.id} onClick={() => onOpen(p)}><div className="mini-map">{p.perspectives.slice(0, 4).map((x) => <span key={x.title} style={{ width: `${Math.max(12, x.percent)}%`, background: x.color }} />)}</div><small>{p.category}</small><strong>{p.title}</strong><span>{p.responses} responses · {p.perspectiveCount} perspectives</span></button>)}</div>
    </section>
    <section className="explore-section"><div className="section-head"><div><span className="section-kicker">Visual</span><h2>Perception in pictures</h2></div></div>
      <div className="visual-grid">{posts.filter(p => p.image).map(p => <button key={p.id} className="visual-card" onClick={() => onOpen(p)}><img src={p.image} alt="" /><div><span>{p.category}</span><strong>{p.title}</strong><small><MessageCircle size={13} /> {p.responses} reactions</small></div></button>)}</div>
    </section>
  </div>;
}

function SavedView({ posts, onOpen, onSave, onNavigate }: { posts: Post[]; onOpen: (x: Post) => void; onSave: (x: number) => void; onNavigate: (x: string) => void }) {
  return <div className="content">
    <section className="page-heading"><div><span className="section-kicker">Your collection</span><h1>Saved <em>perspectives.</em></h1><p>Keep the questions and viewpoints worth coming back to.</p></div></section>
    {posts.length ? <div className="feed-grid">{posts.map(p => <PostCard key={p.id} post={p} onOpen={onOpen} onLike={() => {}} onSave={onSave} />)}</div> : <EmptyState title="Nothing saved yet" text="When a perspective makes you pause, save it here." action="Explore" onAction={() => onNavigate("Explore")} />}
  </div>;
}

function ConnectionsView({ connected, setConnected, onChat }: { connected: boolean; setConnected: (x: boolean) => void; onChat: () => void }) {
  return <div className="content">
    <section className="page-heading"><div><span className="section-kicker">Anonymous connections</span><h1>Meet minds, not <em>profiles.</em></h1><p>Connect with people because of how they think — not who they are.</p></div></section>
    <div className="connection-hero"><div className="connection-visual"><div className="conn-node n1"><Avatar name="Quiet Falcon" /></div><div className="conn-node n2"><Avatar name="Moss Owl" /></div><div className="conn-node n3"><Avatar name="Sage Sparrow" /></div><div className="conn-center"><Sparkles size={26} /></div></div><div><span className="section-kicker">Consent first</span><h2>Identity stays hidden.</h2><p>Both people decide if a conversation becomes a connection. Reveal details one layer at a time, only with mutual consent.</p><div className="reveal-steps"><span className="done">Nickname <Check /></span><span>Interests</span><span>City</span><span>Social</span><span>Real name</span></div></div></div>
    <section className="explore-section"><div className="section-head"><div><span className="section-kicker">Suggested</span><h2>Perspectives you might connect with</h2></div></div>
      <div className="connect-grid">{[
        ["Moss Owl #531", "You both value practical advice over quick answers.", "Career"],
        ["Sage Sparrow #208", "You disagreed thoughtfully on a relationship question.", "Relationships"],
        ["Hidden Willow #195", "Similar creative instincts across 4 conversations.", "Design"],
      ].map(([name, reason, cat], i) => <div className="connect-card" key={name}><div className="connect-top"><Avatar name={name} size="large" /><span>{cat}</span></div><strong>{name}</strong><p>{reason}</p><button className={connected && i === 0 ? "success-btn" : "outline-btn"} onClick={() => { setConnected(true); }}>{connected && i === 0 ? <><Check size={15} /> Requested</> : <>Connect anonymously <ArrowRight size={15} /></>}</button></div>)}</div>
    </section>
    <div className="chat-callout"><div><MessageCircle size={21} /><div><strong>Already have a connection?</strong><p>Continue your anonymous conversations.</p></div></div><button className="primary-btn" onClick={onChat}>Open chat <ArrowRight size={15} /></button></div>
  </div>;
}

function NotificationsView({ notifications, clear }: { notifications: typeof starterNotifications; clear: () => void }) {
  return <div className="content narrow">
    <section className="page-heading"><div><span className="section-kicker">Your activity</span><h1>Notifications</h1></div><button className="ghost-btn" onClick={clear}>Mark all read</button></section>
    <div className="notification-list">{notifications.length ? notifications.map(n => <div className="notification-item" key={n.id}><div className={`notification-icon ${n.type}`}>{n.type === "ai" ? <Sparkles size={17} /> : n.type === "connect" ? <Users size={17} /> : <Bookmark size={17} />}</div><div><strong>{n.title}</strong><p>{n.text}</p><span>{n.time} ago</span></div><button><MoreHorizontal size={16} /></button></div>) : <EmptyState title="You're all caught up" text="No new notifications right now." />}</div>
  </div>;
}

function ProfileView({ posts, onOpen }: { posts: Post[]; onOpen: (x: Post) => void }) {
  const myPosts = posts.filter(p => p.identity === "Quiet Falcon #482");
  return <div className="content">
    <div className="profile-cover"><div className="profile-glow" /><div className="profile-avatar"><Avatar name="Quiet Falcon" size="large" /></div><div className="profile-meta"><span className="eyebrow">Anonymous explorer · since today</span><h1>Quiet Falcon <span>#482</span></h1><p>Curious about people, decisions and the tiny things that make us human.</p><div className="profile-tags"><span>Career</span><span>Life</span><span>Design</span><span>Relationships</span></div></div><button className="outline-btn"><Settings size={15} /> Edit preferences</button></div>
    <div className="stat-row"><div><strong>86</strong><span>Helpful signals</span></div><div><strong>24</strong><span>Perspectives given</span></div><div><strong>9</strong><span>Questions asked</span></div><div><strong>7</strong><span>Connections</span></div></div>
    <section className="profile-section"><div className="section-head"><div><span className="section-kicker">Your questions</span><h2>Perceptions you've started</h2></div></div>{myPosts.length ? myPosts.map(p => <button className="profile-post" key={p.id} onClick={() => onOpen(p)}><div><span>{p.category}</span><strong>{p.title}</strong><small>{p.responses} responses · {p.perspectiveCount} perspectives</small></div><ArrowRight size={17} /></button>) : <div className="profile-empty">Your anonymous questions will appear here.</div>}</section>
    <section className="profile-section"><div className="section-head"><div><span className="section-kicker">Reputation</span><h2>Thoughtful, not popular.</h2></div><span className="reputation">84 / 100</span></div><div className="reputation-bar"><span /></div><p className="small-note">Your reputation reflects how constructive and thoughtful your contributions are — never how many followers you have.</p></section>
  </div>;
}

function SettingsView({ theme, setTheme, onToast }: { theme: "dark" | "light"; setTheme: (x: "dark" | "light") => void; onToast: (x: string) => void }) {
  return <div className="content narrow">
    <section className="page-heading"><div><span className="section-kicker">Control your experience</span><h1>Settings</h1></div></section>
    <div className="settings-list">
      <SettingGroup title="Appearance" icon={<Sun size={17} />}><SettingRow title="Theme" description="Choose how Percept looks on your device"><div className="theme-toggle"><button className={theme === "dark" ? "active" : ""} onClick={() => setTheme("dark")}><Moon size={14} /> Dark</button><button className={theme === "light" ? "active" : ""} onClick={() => setTheme("light")}><Sun size={14} /> Light</button></div></SettingRow></SettingGroup>
      <SettingGroup title="Privacy" icon={<Lock size={17} />}><SettingRow title="Default anonymity" description="Keep your real identity hidden on every public interaction"><Toggle on /><span className="status-label">Always on</span></SettingRow><SettingRow title="Auto-expire media" description="Remove uploaded media after 7 days"><Toggle on /></SettingRow><SettingRow title="Allow anonymous connections" description="Let people request a connection after a response"><Toggle on /></SettingRow></SettingGroup>
      <SettingGroup title="Notifications" icon={<Bell size={17} />}><SettingRow title="Perspective summaries" description="Tell me when AI has enough responses to map a question"><Toggle on /></SettingRow><SettingRow title="Connection requests" description="Notify me when someone wants to connect"><Toggle on /></SettingRow></SettingGroup>
      <SettingGroup title="Data & security" icon={<Shield size={17} />}><SettingRow title="Download my data" description="Get a copy of your Percept activity"><button className="outline-btn small" onClick={() => onToast("Data export prepared in demo mode.")}>Export data</button></SettingRow><SettingRow title="Delete account" description="Permanently remove your account and associated data"><button className="danger-btn">Delete account</button></SettingRow></SettingGroup>
    </div>
  </div>;
}

function SettingGroup({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }) {
  return <section className="settings-group"><div className="settings-title"><span>{icon}</span><strong>{title}</strong></div>{children}</section>;
}
function SettingRow({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return <div className="setting-row"><div><strong>{title}</strong><p>{description}</p></div><div className="setting-control">{children}</div></div>;
}
function Toggle({ on }: { on: boolean }) { return <span className={`toggle ${on ? "on" : ""}`}><i /></span>; }

function SafetyView() {
  return <div className="content narrow">
    <section className="page-heading"><div><span className="section-kicker">Trust & safety</span><h1>Anonymous <em>doesn't mean unsafe.</em></h1><p>Percept is designed around privacy without giving harmful behavior a free pass.</p></div></section>
    <div className="safety-grid">{[
      [Shield, "AI-assisted moderation", "Posts and responses are screened for harassment, threats, spam and unsafe media."],
      [Lock, "Privacy by design", "Real identities are never shown publicly. Anonymous identities rotate across conversations."],
      [Flag, "Report & block", "Every interaction has clear controls to report, block or mute another person."],
      [Ban, "Panic exit", "Leave an anonymous conversation instantly and prevent future matching."],
      [ImageIcon, "Media protection", "Uploaded media can be expired and metadata should never be exposed publicly."],
      [Users, "Consent-first reveal", "Identity reveal only moves forward when both people explicitly agree."],
    ].map(([Icon, title, text]) => <div className="safety-card" key={title as string}><div className="safety-icon"><Icon size={18} /></div><strong>{title as string}</strong><p>{text as string}</p></div>)}</div>
    <div className="safety-note"><Info size={18} /><div><strong>Remember</strong><p>Never share information that could identify you if you are not comfortable with it. Screenshots and external copies can never be fully prevented by a website.</p></div></div>
  </div>;
}

function AboutView({ onCreate }: { onCreate: () => void }) {
  return <div className="content">
    <section className="about-hero"><span className="eyebrow"><Sparkles size={14} /> Built around one idea</span><h1>People don't see the world<br /><em>the same way.</em></h1><p>Percept makes those differences visible — anonymously, thoughtfully, and with AI that helps you understand the signal behind the noise.</p><button className="primary-btn" onClick={onCreate}>Ask your first question <ArrowRight size={16} /></button></section>
    <div className="about-grid"><div><span className="section-kicker">Our principle</span><h2>Understanding beats validation.</h2><p>Percept isn't designed to tell you that you're right. It is designed to help you discover why other people might see the same thing differently.</p></div><div className="about-stats"><div><strong>01</strong><span>Ask anonymously</span></div><div><strong>02</strong><span>Collect perspectives</span></div><div><strong>03</strong><span>See the pattern</span></div></div></div>
  </div>;
}

function PostModal({ post, onClose, onLike, onSave, onToast, onConnect }: { post: Post; onClose: () => void; onLike: (x: number) => void; onSave: (x: number) => void; onToast: (x: string) => void; onConnect: () => void }) {
  const [reply, setReply] = useState("");
  const [responses, setResponses] = useState(post.responsesList);
  const [showAll, setShowAll] = useState(false);
  const [analysis, setAnalysis] = useState(false);
  const visible = showAll ? responses : responses.slice(0, 3);
  function submitReply() {
    if (!reply.trim()) return;
    const newResponse = { id: Date.now(), identity: identities[Math.floor(Math.random() * identities.length)], text: reply.trim(), likes: 0, liked: false };
    setResponses((r) => [newResponse, ...r]);
    setReply("");
    onToast("Your response was posted anonymously.");
  }
  function runAI() {
    setAnalysis(true);
    window.setTimeout(() => setAnalysis(false), 1500);
  }
  return <div className="modal-backdrop" onMouseDown={(e) => { if (e.currentTarget === e.target) onClose(); }}>
    <div className="post-modal">
      <div className="modal-top"><div className="identity"><Avatar name={post.identity} size="small" /><div><strong>{post.identity}</strong><span>{post.created} · {post.category}</span></div></div><button className="close-btn" onClick={onClose}><X size={18} /></button></div>
      <div className="modal-scroll">
        <span className="type-pill">{post.type}</span>
        <h2>{post.title}</h2>
        <p className="modal-body">{post.body}</p>
        {post.image && <img className="modal-media" src={post.image} alt="Perception request" />}
        {post.type === "comparison" && <ComparisonPreview />}
        {post.type === "poll" && <PollPreview />}
        <div className="modal-actions"><button className={post.liked ? "liked" : ""} onClick={() => onLike(post.id)}><Heart size={17} fill={post.liked ? "currentColor" : "none"} /> {post.likes}</button><button onClick={() => onSave(post.id)} className={post.saved ? "saved" : ""}><Bookmark size={17} fill={post.saved ? "currentColor" : "none"} /> Save</button><button onClick={() => onToast("Report dialog opened in demo mode.")}><Flag size={16} /> Report</button><button onClick={onConnect}><Users size={16} /> Connect</button></div>

        <section className="ai-panel">
          <div className="ai-panel-head"><div className="ai-title"><div className="ai-spark"><Sparkles size={15} /></div><div><strong>AI Perspective Map</strong><span>{post.perspectives.length ? `${post.perspectives.length} viewpoints · ${post.responses} responses` : "Waiting for more responses"}</span></div></div><button className="ghost-btn small" onClick={runAI}>{analysis ? "Understanding..." : "Refresh AI"} <Zap size={14} /></button></div>
          {analysis ? <div className="ai-loading"><div className="loading-orbit"><span /><span /><span /></div><strong>Understanding the perspectives...</strong><small>Clustering responses by meaning, not keywords.</small></div> : post.perspectives.length ? <><div className="perspective-bars">{post.perspectives.map((p) => <div key={p.title} className="perspective-row"><div><span><i style={{ background: p.color }} />{p.title}</span><b>{p.percent}%</b></div><div className="bar"><span style={{ width: `${p.percent}%`, background: p.color }} /></div><small>{p.description}</small></div>)}</div><div className="ai-summary"><Sparkles size={16} /><div><strong>What the room is saying</strong><p>{post.aiSummary}</p></div></div><div className="opposing"><span>↗ Another perspective</span><p>{post.perspectives[post.perspectives.length - 1]?.description}</p></div></> : <div className="ai-empty"><Sparkles size={19} /><div><strong>Not enough signal yet.</strong><p>Collect a few more responses and Percept will map the different viewpoints.</p></div></div>}
        </section>

        <section className="responses-section"><div className="section-head compact"><div><span className="section-kicker">Anonymous reactions</span><h3>{responses.length || post.responses} perspectives</h3></div><span className="soft-label"><Shield size={12} /> identity protected</span></div>
          <div className="reply-box"><Avatar name="Quiet Falcon" size="small" /><textarea value={reply} onChange={(e) => setReply(e.target.value)} placeholder="What's your honest perspective?" /><button disabled={!reply.trim()} onClick={submitReply}><Send size={16} /></button></div>
          <div className="response-list">{visible.map((r) => <div className="response" key={r.id}><Avatar name={r.identity} size="small" /><div className="response-main"><div><strong>{r.identity}</strong><span>just now</span></div><p>{r.text}</p><button><ThumbsUp size={14} /> {r.likes || "Helpful"}</button></div><button className="more-btn"><MoreHorizontal size={16} /></button></div>)}</div>
          {responses.length > 3 && <button className="load-more" onClick={() => setShowAll(!showAll)}>{showAll ? "Show less" : "Show all responses"} <ChevronDown size={15} /></button>}
        </section>
      </div>
    </div>
  </div>;
}

function CreateModal({ onClose, onPublish }: { onClose: () => void; onPublish: (data: { title: string; body: string; category: Exclude<Category, "All">; type: PostType; image?: string; tags: string[] }) => void }) {
  const [type, setType] = useState<PostType>("text");
  const [category, setCategory] = useState<Exclude<Category, "All">>("Life");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState<string>();
  const [aiSuggestion, setAiSuggestion] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(1);

  function onFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) { alert("Please choose a file under 8 MB."); return; }
    setImage(URL.createObjectURL(file));
  }
  function improve() {
    if (!title.trim()) return;
    setAiSuggestion(title.endsWith("?") ? "This question is already clear. You could add one line of context to invite more nuanced perspectives." : `Try: "${title.trim()} — what's your honest first reaction?"`);
  }
  function publish() {
    if (!title.trim()) return;
    onPublish({ title: title.trim(), body: body.trim() || "I want honest perspectives. What do you think?", category, type, image, tags: [category.toLowerCase(), type] });
  }
  return <div className="modal-backdrop" onMouseDown={(e) => { if (e.currentTarget === e.target) onClose(); }}>
    <div className="create-modal">
      <div className="create-head"><div><span className="section-kicker">New perception</span><h2>Ask the world.</h2></div><button className="close-btn" onClick={onClose}><X size={18} /></button></div>
      <div className="stepper"><span className={step >= 1 ? "active" : ""}>01 Ask</span><i /><span className={step >= 2 ? "active" : ""}>02 Add context</span><i /><span className={step >= 3 ? "active" : ""}>03 Preview</span></div>
      {step === 1 && <div className="create-body"><label>What do you want people's perspective on?</label><textarea className="big-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Would you choose a higher salary or a better learning environment?" autoFocus /><div className="ai-suggest"><Sparkles size={16} /><div><strong>Need help framing it?</strong><p>Percept can make your question clearer without changing what you mean.</p></div><button className="outline-btn small" onClick={improve}>Suggest</button></div>{aiSuggestion && <div className="suggestion"><Sparkles size={14} /><span>{aiSuggestion}</span><button onClick={() => setTitle(aiSuggestion.replace(/^Try: "/, "").replace(/"$/, ""))}><Check size={14} /></button></div>}<div className="type-picker"><span>What kind of perception?</span><div>{(["text", "image", "video", "poll", "comparison"] as PostType[]).map(t => <button key={t} className={type === t ? "selected" : ""} onClick={() => setType(t)}>{t === "image" ? <ImageIcon size={16} /> : t === "video" ? <Video size={16} /> : t === "poll" ? <BarChart3 size={16} /> : t === "comparison" ? <Copy size={16} /> : <MessageCircle size={16} />}{t}</button>)}</div></div><button className="primary-btn full" disabled={!title.trim()} onClick={() => setStep(2)}>Continue <ArrowRight size={16} /></button></div>}
      {step === 2 && <div className="create-body"><label>Add a little context</label><textarea className="context-input" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Give people enough context to understand what you're asking. Keep it as personal as you're comfortable with." />{(type === "image" || type === "video" || type === "comparison") && <div className="upload-zone" onClick={() => fileRef.current?.click()}>{image ? <img src={image} alt="Upload preview" /> : <><Upload size={25} /><strong>Drop an image or video here</strong><span>PNG, JPG, WEBP, MP4 · up to 8 MB</span></>}<input ref={fileRef} type="file" accept="image/*,video/*" onChange={onFile} hidden /></div>}<div className="field-row"><div><label>Category</label><select value={category} onChange={e => setCategory(e.target.value as Exclude<Category, "All">)}>{(["Career","Relationships","College","Style","Design","Life","Technology","Art"] as const).map(c => <option key={c}>{c}</option>)}</select></div><div><label>Visibility</label><div className="privacy-pill"><Lock size={14} /> Anonymous by default</div></div></div><div className="privacy-note"><Shield size={16} /><span>Percept will never show your real identity with this post. Media is treated as sensitive and should not contain information you don't want shared.</span></div><div className="button-row"><button className="ghost-btn" onClick={() => setStep(1)}><ChevronLeft size={15} /> Back</button><button className="primary-btn" onClick={() => setStep(3)}>Preview <ArrowRight size={15} /></button></div></div>}
      {step === 3 && <div className="create-body"><div className="preview-card"><div className="post-top"><div className="identity"><Avatar name="Quiet Falcon" size="small" /><div><strong>Quiet Falcon #482</strong><span>just now · {category}</span></div></div><span className="type-pill">{type}</span></div><h3>{title}</h3><p>{body || "I want honest perspectives. What do you think?"}</p>{image && <img src={image} alt="" />}</div><div className="button-row"><button className="ghost-btn" onClick={() => setStep(2)}><ChevronLeft size={15} /> Edit</button><button className="primary-btn" onClick={publish}><Sparkles size={16} /> Publish anonymously</button></div></div>}
    </div>
  </div>;
}

function NotificationPopover({ notifications, onClose, onOpen }: { notifications: typeof starterNotifications; onClose: () => void; onOpen: () => void }) {
  return <div className="popover-panel notification-popover"><div className="popover-head"><strong>Notifications</strong><button onClick={onClose}><X size={15} /></button></div>{notifications.slice(0, 3).map(n => <div className="mini-notification" key={n.id}><div className={`notification-icon ${n.type}`}>{n.type === "ai" ? <Sparkles size={15} /> : n.type === "connect" ? <Users size={15} /> : <Bookmark size={15} />}</div><div><strong>{n.title}</strong><span>{n.time} ago</span></div></div>)}<button className="view-all" onClick={onOpen}>View all notifications <ArrowRight size={14} /></button></div>;
}

function SearchOverlay({ search, setSearch, posts, onClose, onOpen }: { search: string; setSearch: (x: string) => void; posts: Post[]; onClose: () => void; onOpen: (x: Post) => void }) {
  const q = search.toLowerCase();
  const results = posts.filter(p => !q || p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  return <div className="modal-backdrop"><div className="search-overlay"><div className="search-large"><Search size={20} /><input autoFocus value={search} onChange={e => setSearch(e.target.value)} placeholder="Search questions, topics and perspectives..." /><kbd>ESC</kbd><button onClick={onClose}><X size={18} /></button></div><div className="search-results"><span className="section-kicker">{search ? "Results" : "Try searching"}</span>{results.slice(0, 6).map(p => <button key={p.id} onClick={() => onOpen(p)}><div className="result-icon"><Sparkles size={15} /></div><div><strong>{p.title}</strong><span>{p.category} · {p.responses} responses</span></div><ArrowRight size={15} /></button>)}</div></div></div>;
}

function ChatModal({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState([
    { id: 1, mine: false, text: "I liked your perspective on the career question.", time: "8:42 PM" },
    { id: 2, mine: true, text: "Thanks. I think I needed to hear the practical side too.", time: "8:43 PM" },
    { id: 3, mine: false, text: "Same. It is interesting how two people can read the same situation so differently.", time: "8:44 PM" },
  ]);
  const [text, setText] = useState("");
  function send() { if (!text.trim()) return; setMessages(m => [...m, { id: Date.now(), mine: true, text: text.trim(), time: "now" }]); setText(""); }
  return <div className="modal-backdrop"><div className="chat-modal"><div className="chat-head"><div className="identity"><Avatar name="Moss Owl" /><div><strong>Moss Owl #531</strong><span><i className="online-dot" /> anonymous connection · stage 1</span></div></div><button className="close-btn" onClick={onClose}><X size={18} /></button></div><div className="reveal-strip"><Lock size={14} /><span>Identity hidden</span><button>Request next reveal</button></div><div className="messages">{messages.map(m => <div key={m.id} className={`message ${m.mine ? "mine" : ""}`}><p>{m.text}</p><span>{m.time}</span></div>)}</div><div className="chat-tools"><button title="Voice note"><Mic size={17} /></button><button title="Add image"><ImageIcon size={17} /></button><input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Say something..." /><button className="send-btn" onClick={send}><Send size={16} /></button></div><button className="panic-btn" onClick={onClose}>Exit & block this connection</button></div></div>;
}

function MobileNav({ active, onNavigate, onCreate }: { active: string; onNavigate: (x: string) => void; onCreate: () => void }) {
  return <nav className="mobile-nav"><button className={active === "Home" ? "active" : ""} onClick={() => onNavigate("Home")}><LayoutDashboard size={19} /><span>Home</span></button><button className={active === "Explore" ? "active" : ""} onClick={() => onNavigate("Explore")}><Compass size={19} /><span>Explore</span></button><button className="mobile-create" onClick={onCreate}><Plus size={22} /></button><button className={active === "Notifications" ? "active" : ""} onClick={() => onNavigate("Notifications")}><Bell size={19} /><span>Alerts</span></button><button className={active === "Profile" ? "active" : ""} onClick={() => onNavigate("Profile")}><UserRound size={19} /><span>Profile</span></button></nav>;
}

function EmptyState({ title, text, action, onAction }: { title: string; text: string; action?: string; onAction?: () => void }) {
  return <div className="empty-state"><div className="empty-orb"><Sparkles size={22} /></div><h3>{title}</h3><p>{text}</p>{action && onAction && <button className="primary-btn" onClick={onAction}>{action} <ArrowRight size={15} /></button>}</div>;
}

function loadState<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function saveState<T>(key: string, value: T) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* demo mode */ }
}
