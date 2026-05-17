import { useState, useEffect, useCallback, useRef } from "react";
import {
  MapPin, Phone, Mail, ChevronLeft, ChevronRight,
  Calendar, Users, Sparkles, Clock, Check, ArrowRight,
  UtensilsCrossed, Leaf, Heart, Star, Menu, X
} from "lucide-react";

/* ─── Asset Paths ─────────────────────────────────────────────── */
// ✅ Import each image at the top of the file
import LOGO_H_GREEN  from "./assets/Asset 14@4x.png";
import LOGO_H_YELLOW from "./assets/Asset 16@4x.png";
import LOGO_V_YELLOW from "./assets/Asset 20@4x.png";
import LOGO_YELLOW   from "./assets/Asset 9@4x.png";

import PHOTO1 from "./assets/photo1.jpg";
import PHOTO2 from "./assets/photo2.jpg";
import PHOTO3 from "./assets/photo3.jpg";
import PIC1   from "./assets/pic(1).jpg";
import PIC2   from "./assets/pic(2).jpg";
import PIC3   from "./assets/pic(3).jpg";
import PIC4   from "./assets/pic(4).jpg";
import PIC5   from "./assets/pic(5).jpg";

/* ─── Global CSS ──────────────────────────────────────────────── */
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,200;0,9..144,400;0,9..144,600;1,9..144,200;1,9..144,400&family=Geist:wght@300;400;500;600&display=swap');

  :root {
    --bg:          #080807;
    --bg2:         #0f0e0d;
    --surface:     #161513;
    --surface2:    #1e1c1a;
    --surface3:    #252320;
    --border:      rgba(255,247,230,0.07);
    --border2:     rgba(255,247,230,0.13);
    --text:        #f5f0e8;
    --text2:       #c8bfb0;
    --muted:       #7a7265;
    --muted2:      #4a4540;
    --gold:        #d4a843;
    --gold2:       #e8c06a;
    --gold-dim:    rgba(212,168,67,0.10);
    --gold-glow:   rgba(212,168,67,0.22);
    --serif:       'Fraunces', Georgia, serif;
    --sans:        'Geist', system-ui, sans-serif;
    --radius:      12px;
    --radius-lg:   20px;
    --ease-spring: cubic-bezier(0.34,1.56,0.64,1);
    --ease-out:    cubic-bezier(0.16,1,0.3,1);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--sans);
    font-weight: 300;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
  img { display: block; max-width: 100%; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.93); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes pulseRing {
    0%   { box-shadow: 0 0 0 0 var(--gold-glow); }
    70%  { box-shadow: 0 0 0 16px transparent; }
    100% { box-shadow: 0 0 0 0 transparent; }
  }
  @keyframes float {
    0%,100% { transform: translateY(0) rotate(-3deg); }
    50%      { transform: translateY(-14px) rotate(3deg); }
  }

  .reveal {
    opacity: 0; transform: translateY(28px);
    transition: opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out);
  }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  .reveal-left {
    opacity: 0; transform: translateX(-28px);
    transition: opacity 0.72s var(--ease-out), transform 0.72s var(--ease-out);
  }
  .reveal-left.visible { opacity: 1; transform: translateX(0); }

  .reveal-right {
    opacity: 0; transform: translateX(28px);
    transition: opacity 0.72s var(--ease-out), transform 0.72s var(--ease-out);
  }
  .reveal-right.visible { opacity: 1; transform: translateX(0); }

  .photo-zoom { overflow: hidden; }
  .photo-zoom img { transition: transform 0.65s var(--ease-out); }
  .photo-zoom:hover img { transform: scale(1.07); }

  .btn-primary {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: var(--gold); color: #080807;
    border: none; border-radius: 8px;
    padding: 0.875rem 1.875rem;
    font-family: var(--sans); font-size: 0.82rem; font-weight: 600;
    letter-spacing: 0.07em; text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s, transform 0.25s var(--ease-spring), box-shadow 0.25s;
  }
  .btn-primary:hover {
    background: var(--gold2);
    transform: scale(1.04);
    box-shadow: 0 8px 28px rgba(212,168,67,0.35);
  }
  .btn-primary:active { transform: scale(0.98); }

  .btn-ghost {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: transparent; color: var(--text2);
    border: 1px solid var(--border2); border-radius: 8px;
    padding: 0.875rem 1.625rem;
    font-family: var(--sans); font-size: 0.82rem; font-weight: 400;
    letter-spacing: 0.07em; text-transform: uppercase;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s, transform 0.25s var(--ease-spring);
  }
  .btn-ghost:hover { border-color: var(--gold); color: var(--gold); transform: scale(1.03); }
  .btn-ghost:active { transform: scale(0.98); }

  .field-input {
    width: 100%; background: var(--surface2);
    border: 1px solid var(--border); border-radius: 8px;
    padding: 0.8rem 1rem;
    font-family: var(--sans); font-size: 0.9rem; font-weight: 300;
    color: var(--text); outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .field-input:focus { border-color: var(--gold); box-shadow: 0 0 0 3px var(--gold-dim); }
  .field-input::placeholder { color: var(--muted); }

  .nav-link {
    background: none; border: none; cursor: pointer;
    font-family: var(--sans); font-size: 0.8rem; font-weight: 500;
    letter-spacing: 0.08em; text-transform: uppercase;
    padding: 0.3rem 0; position: relative;
    transition: color 0.2s;
  }
  .nav-link::after {
    content: ''; position: absolute; bottom: -2px; left: 0; right: 0;
    height: 1px; background: var(--gold);
    transform: scaleX(0); transform-origin: right;
    transition: transform 0.3s var(--ease-out);
  }
  .nav-link:hover::after, .nav-link.active::after {
    transform: scaleX(1); transform-origin: left;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--muted2); border-radius: 99px; }

  @media (max-width: 900px) {
    .desktop-nav { display: none !important; }
    .mobile-nav-btn { display: flex !important; }
  }
  @media (min-width: 901px) {
    .mobile-nav-btn { display: none !important; }
  }
  @media (max-width: 768px) {
    .hero-visual-col { display: none !important; }
    .about-grid-inner { grid-template-columns: 1fr !important; }
    .features-inner { grid-template-columns: 1fr !important; }
    .footer-inner { grid-template-columns: 1fr !important; }
    .bento-inner { grid-template-columns: 1fr !important; grid-auto-rows: 240px !important; }
    .bento-inner > * { grid-column: 1/2 !important; grid-row: span 1 !important; }
    .time-grid-inner { grid-template-columns: repeat(3,1fr) !important; }
    .booking-form-grid { grid-template-columns: 1fr !important; }
    .booking-form-grid > * { grid-column: 1/2 !important; }
    .step-label-text { display: none !important; }
    .stats-row-inner { gap: 1.5rem !important; flex-wrap: wrap; }
  }
`;

/* ─── Helpers ────────────────────────────────────────────────── */
const MONTHS_FULL  = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const MONTHS_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS_LONG    = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function formatDate(d) {
  if (!d) return "";
  return `${DAYS_LONG[d.getDay()]}, ${MONTHS_SHORT[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

/* ─── useReveal ──────────────────────────────────────────────── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); }
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─── NAV ────────────────────────────────────────────────────── */
function Nav({ active, onNav }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [["home","Home"],["menu","Menu"],["about","About"],["booking","Reservations"]];

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled ? "rgba(8,8,7,0.90)" : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        transition: "background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease",
      }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto",
          padding: "0 clamp(1rem, 4vw, 2.5rem)",
          height: 68, display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div onClick={() => onNav("home")} style={{ cursor: "pointer", flexShrink: 0 }}>
            <img src={LOGO_H_YELLOW} alt="Little Lemon" style={{ height: 34, width: "auto" }} />
          </div>

          {/* Desktop */}
          <nav className="desktop-nav" style={{ display: "flex", gap: "2.25rem", alignItems: "center" }}>
            {links.map(([id, label]) => (
              <button key={id} onClick={() => onNav(id)}
                className={`nav-link ${active === id ? "active" : ""}`}
                style={{ color: active === id ? "var(--gold)" : "var(--muted)" }}
              >{label}</button>
            ))}
            <button onClick={() => onNav("booking")} className="btn-primary"
              style={{ padding: "0.6rem 1.25rem", fontSize: "0.75rem" }}>
              Book a Table
            </button>
          </nav>

          {/* Mobile toggle */}
          <button className="mobile-nav-btn" onClick={() => setMobileOpen(v => !v)} style={{
            background: "none", border: "1px solid var(--border)", borderRadius: 8,
            width: 40, height: 40, alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "var(--text)",
            transition: "border-color 0.2s",
          }}>
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 199,
          background: "rgba(8,8,7,0.96)", backdropFilter: "blur(20px)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: "2rem", animation: "fadeIn 0.2s ease",
        }}>
          {links.map(([id, label]) => (
            <button key={id} onClick={() => { onNav(id); setMobileOpen(false); }} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "var(--serif)", fontSize: "2.5rem", fontWeight: 200,
              color: active === id ? "var(--gold)" : "var(--text2)",
              fontStyle: "italic", letterSpacing: "-0.01em",
              transition: "color 0.2s",
            }}>{label}</button>
          ))}
        </div>
      )}
    </>
  );
}

/* ─── HERO ───────────────────────────────────────────────────── */
function Hero({ onNav }) {
  return (
    <section style={{
      minHeight: "100svh", position: "relative", overflow: "hidden",
      display: "flex", alignItems: "center", background: "var(--bg)",
    }}>
      {/* Ambient */}
      <div style={{ position:"absolute", width:700, height:700, borderRadius:"50%", left:"-12%", top:"5%", background:"radial-gradient(circle, rgba(212,168,67,0.055) 0%, transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", width:400, height:400, borderRadius:"50%", right:"8%",  bottom:"8%", background:"radial-gradient(circle, rgba(74,92,71,0.09) 0%, transparent 70%)", pointerEvents:"none" }} />

      {/* Right photo panel */}
      <div className="hero-visual-col" style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: "47%",
        display: "grid", gridTemplateRows: "58% 42%",
      }}>
        <div className="photo-zoom" style={{ position: "relative" }}>
          <img src={PHOTO1} alt="Chef" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, var(--bg) 0%, transparent 38%)" }} />
        </div>
        <div className="photo-zoom" style={{ position: "relative" }}>
          <img src={PHOTO3} alt="Pizza" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, var(--bg) 0%, transparent 38%)" }} />
        </div>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, var(--bg) 0%, transparent 42%)", pointerEvents:"none" }} />
      </div>

      {/* Floating logo */}
      <div className="hero-visual-col" style={{
        position:"absolute", right:"49%", top:"50%", transform:"translateY(-50%)",
        zIndex:2, pointerEvents:"none", opacity:0.12,
        animation:"float 5s ease-in-out infinite",
      }}>
        <img src={LOGO_YELLOW} alt="" style={{ width:88, height:"auto" }} />
      </div>

      {/* Content */}
      <div style={{
        maxWidth: 1280, margin: "0 auto", width: "100%",
        padding: "clamp(5rem,12vh,9rem) clamp(1rem,4vw,2.5rem) clamp(3rem,6vh,5rem)",
        position: "relative", zIndex: 1,
      }}>
        <div style={{ maxWidth: 620, animation: "fadeUp 0.9s var(--ease-out) both" }}>

          {/* Eyebrow pill */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            background: "var(--gold-dim)", border: "1px solid rgba(212,168,67,0.2)",
            borderRadius: 999, padding: "0.3rem 0.9rem", marginBottom: "2rem",
          }}>
            <MapPin size={11} color="var(--gold)" />
            <span style={{ fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--gold)" }}>
              Chicago · Est. 2012
            </span>
          </div>

          <h1 style={{
            fontFamily: "var(--serif)", fontWeight: 200,
            fontSize: "clamp(3rem, 7.5vw, 6.5rem)",
            lineHeight: 1.04, letterSpacing: "-0.02em",
            color: "var(--text)", marginBottom: "1.5rem",
          }}>
            Sun-Kissed<br />
            Flavours <em style={{ fontStyle:"italic", color:"var(--gold)" }}>of the<br />Mediterranean</em>
          </h1>

          <p style={{
            fontSize: "clamp(0.95rem,1.5vw,1.05rem)", lineHeight: 1.85,
            fontWeight: 300, color: "var(--text2)", maxWidth: 460, marginBottom: "2.75rem",
          }}>
            A family table rooted in Italian, Greek & Turkish tradition —
            reimagined for a modern appetite.
          </p>

          <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => onNav("menu")}>
              Explore Menu <ArrowRight size={14} />
            </button>
            <button className="btn-ghost" onClick={() => onNav("booking")}>
              Reserve a Table
            </button>
          </div>

          {/* Stats */}
          <div className="stats-row-inner" style={{
            display: "flex", gap: "3rem", marginTop: "4.5rem",
            paddingTop: "2.5rem", borderTop: "1px solid var(--border)",
            animation: "fadeUp 0.9s var(--ease-out) 0.2s both",
          }}>
            {[["12+","Years of service"],["3","Mediterranean traditions"],["∞","Family recipes"]].map(([n, l]) => (
              <div key={l}>
                <div style={{
                  fontFamily: "var(--serif)", fontWeight: 200,
                  fontSize: "clamp(2rem,4vw,2.75rem)",
                  color: "var(--gold)", lineHeight: 1, letterSpacing: "-0.02em",
                }}>{n}</div>
                <div style={{
                  fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em",
                  textTransform: "uppercase", color: "var(--muted)", marginTop: "0.5rem",
                }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FEATURES ───────────────────────────────────────────────── */
function Features({ onNav }) {
  const ref = useReveal();
  const cards = [
    { icon: <Leaf size={18} />,  title: "Seasonal Menu",    body: "Mario curates 12–15 dishes each season from heirloom recipes and the finest local produce. Every plate honours the Mediterranean coast.", link: "See this season", to: "menu" },
    { icon: <Star size={18} />,  title: "Rustic Atmosphere", body: "Step into a warm space designed for lingering. Whether a quick lunch or a long Saturday dinner, Little Lemon always feels like home.", link: "Our story",        to: "about", accent: true },
    { icon: <Heart size={18} />, title: "Family Owned",     body: "Brothers Mario and Adrian moved from Italy with one dream — share grandmother's recipes with Chicago. Every dish carries that love.", link: "Meet the team",     to: "about" },
  ];

  return (
    <section style={{ padding: "clamp(3rem,8vw,6rem) clamp(1rem,4vw,2.5rem)" }}>
      <div ref={ref} className="reveal features-inner" style={{
        maxWidth: 1280, margin: "0 auto",
        display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px",
        background: "var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden",
      }}>
        {cards.map((c, i) => (
          <div key={c.title} style={{
            background: c.accent
              ? "linear-gradient(145deg, rgba(212,168,67,0.09), rgba(212,168,67,0.04))"
              : "var(--surface)",
            padding: "clamp(1.5rem,3vw,2.5rem)",
            display: "flex", flexDirection: "column",
            transition: "transform 0.35s var(--ease-spring), box-shadow 0.35s var(--ease-out)",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.45)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)";    e.currentTarget.style.boxShadow = "none"; }}
          >
            <div style={{
              width: 42, height: 42, borderRadius: 10,
              background: "var(--gold-dim)", border: "1px solid rgba(212,168,67,0.18)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--gold)", marginBottom: "1.5rem", flexShrink: 0,
            }}>{c.icon}</div>

            <h3 style={{
              fontFamily: "var(--serif)", fontSize: "1.45rem", fontWeight: 400,
              lineHeight: 1.2, letterSpacing: "-0.01em", color: "var(--text)",
              marginBottom: "0.75rem",
            }}>{c.title}</h3>

            <p style={{
              fontSize: "0.875rem", lineHeight: 1.82, fontWeight: 300,
              color: "var(--muted)", flex: 1, marginBottom: "1.75rem",
            }}>{c.body}</p>

            <button onClick={() => onNav(c.to)} style={{
              background: "none", border: "none", padding: 0, cursor: "pointer",
              fontFamily: "var(--sans)", fontSize: "0.73rem", fontWeight: 600,
              letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)",
              display: "inline-flex", alignItems: "center", gap: "0.4rem", width: "fit-content",
              transition: "gap 0.25s var(--ease-spring)",
            }}
              onMouseEnter={e => e.currentTarget.style.gap = "0.85rem"}
              onMouseLeave={e => e.currentTarget.style.gap = "0.4rem"}
            >{c.link} <ArrowRight size={12} /></button>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── MENU ───────────────────────────────────────────────────── */
function MenuSection({ onNav }) {
  const headRef = useReveal();
  const dishes = [
    { img: PHOTO1, tag: "Chef's Special",   name: "Grilled Vegetable Medley",    price: "$18", desc: "Seasonal roasted vegetables with herb oil, micro greens, and house-made radish pickle.",              cuisine: "Greek",      featured: false, colSpan: 1, rowSpan: 2 },
    { img: PHOTO2, tag: "Fan Favourite",    name: "Spaghetti al Pomodoro",       price: "$16", desc: "Slow-cooked San Marzano tomatoes, fresh basil, aged Parmigiano, and Sicilian olive oil.",           cuisine: "Italian",    featured: true,  colSpan: 2, rowSpan: 1 },
    { img: PHOTO3, tag: "Wood-Fired",       name: "Pizza Margherita",            price: "$19", desc: "Neapolitan dough, hand-crushed tomatoes, fior di latte, and basil.",                                cuisine: "Neapolitan", featured: false, colSpan: 1, rowSpan: 1 },
    { img: PIC2,   tag: "Vegetarian",       name: "Greek Village Salad",         price: "$13", desc: "Tomatoes, cucumber, Kalamata olives, red onion, generous feta, and olive oil.",                     cuisine: "Greek",      featured: false, colSpan: 1, rowSpan: 1 },
    { img: PIC3,   tag: "Catch of the Day", name: "Grilled Sea Bass",            price: "$28", desc: "Mediterranean sea bass over open flame with lemon, dill, cherry tomatoes, and baby potatoes.",     cuisine: "Turkish",    featured: false, colSpan: 2, rowSpan: 1 },
    { img: PIC5,   tag: "Starter",          name: "Bruschetta al Pomodoro",      price: "$12", desc: "Toasted sourdough, ricotta, slow-roasted cherry tomatoes, capers, and fresh basil.",               cuisine: "Italian",    featured: false, colSpan: 1, rowSpan: 1 },
    { img: PIC4,   tag: "Spicy",            name: "Penne all'Arrabbiata",        price: "$15", desc: "Penne rigate in a fiery Calabrian chilli sauce with garlic and flat-leaf parsley.",                 cuisine: "Italian",    featured: false, colSpan: 1, rowSpan: 1 },
    { img: PIC1,   tag: "Appetiser",        name: "Chef's Bruschetta Board",     price: "$16", desc: "A curated board of four seasonal bruschetta — ask your server for today's rotating varieties.",     cuisine: "Mediter.",   featured: false, colSpan: 1, rowSpan: 2 },
  ];

  return (
    <section id="menu" style={{ background: "var(--bg2)", padding: "clamp(4rem,10vw,8rem) clamp(1rem,4vw,2.5rem)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div ref={headRef} className="reveal" style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          flexWrap: "wrap", gap: "2rem", marginBottom: "clamp(2.5rem,5vw,4rem)",
        }}>
          <div>
            <p style={{ fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.16em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"1rem" }}>
              <UtensilsCrossed size={11} style={{ display:"inline", marginRight:6 }} />Seasonal Favourites
            </p>
            <h2 style={{
              fontFamily:"var(--serif)", fontWeight:200,
              fontSize:"clamp(2.25rem,5vw,4.25rem)",
              lineHeight:1.08, letterSpacing:"-0.02em", color:"var(--text)",
            }}>
              A Taste of the<br /><em style={{ fontStyle:"italic", color:"var(--gold)" }}>Mediterranean</em>
            </h2>
          </div>
          <p style={{ fontSize:"0.875rem", lineHeight:1.85, fontWeight:300, color:"var(--muted)", maxWidth:340 }}>
            Every dish is crafted from Mario's family recipes. Our menu rotates with the seasons — always fresh, always soulful.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="bento-inner" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridAutoRows: "280px",
          gap: "10px",
        }}>
          {dishes.map((d, i) => (
            <BentoCard key={d.name} dish={d} delay={i * 0.05} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "clamp(2rem,4vw,3.5rem)" }}>
          <button className="btn-primary" onClick={() => onNav("booking")}>
            Reserve Your Table <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}

function BentoCard({ dish, delay }) {
  const ref = useReveal();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className="reveal photo-zoom"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: `span ${dish.colSpan}`,
        gridRow:    `span ${dish.rowSpan}`,
        position: "relative", borderRadius: "var(--radius)", overflow: "hidden",
        cursor: "pointer",
        border: dish.featured ? "1px solid rgba(212,168,67,0.28)" : "1px solid var(--border)",
        transitionDelay: `${delay}s`,
        transition: "transform 0.38s var(--ease-spring), box-shadow 0.38s var(--ease-out)",
        transform: hovered ? "scale(1.013)" : "scale(1)",
        boxShadow: hovered ? "0 22px 55px rgba(0,0,0,0.55), 0 0 0 1px rgba(212,168,67,0.15)" : "none",
      }}
    >
      <img src={dish.img} alt={dish.name} style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        objectFit: "cover",
        transition: "transform 0.65s var(--ease-out)",
        transform: hovered ? "scale(1.08)" : "scale(1)",
      }} />

      {/* Overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: hovered
          ? "linear-gradient(to top, rgba(8,8,7,0.93) 0%, rgba(8,8,7,0.35) 55%, transparent 100%)"
          : "linear-gradient(to top, rgba(8,8,7,0.82) 0%, rgba(8,8,7,0.12) 55%, transparent 100%)",
        transition: "background 0.38s ease",
      }} />

      {/* Tag */}
      <div style={{
        position: "absolute", top: 14, left: 14,
        background: dish.featured ? "var(--gold)" : "rgba(8,8,7,0.72)",
        color: dish.featured ? "#080807" : "var(--text)",
        fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.1em",
        textTransform: "uppercase", padding: "0.28rem 0.65rem",
        borderRadius: 999, backdropFilter: "blur(8px)",
        fontFamily: "var(--sans)",
      }}>{dish.tag}</div>

      {/* Content */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "clamp(0.875rem,2vw,1.4rem)",
        transform: hovered ? "translateY(0)" : "translateY(5px)",
        transition: "transform 0.38s var(--ease-out)",
      }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"0.3rem" }}>
          <h3 style={{
            fontFamily: "var(--serif)", fontWeight: 400,
            fontSize: dish.colSpan > 1 ? "1.5rem" : "1.2rem",
            color: "var(--text)", lineHeight: 1.15, letterSpacing: "-0.01em",
          }}>{dish.name}</h3>
          <span style={{
            fontFamily: "var(--serif)", fontSize: "1.25rem", fontWeight: 200,
            color: "var(--gold)", whiteSpace: "nowrap", marginLeft: "0.65rem",
          }}>{dish.price}</span>
        </div>

        <p style={{
          fontSize: "0.78rem", color: "rgba(245,240,232,0.62)", lineHeight: 1.6,
          maxWidth: 340, maxHeight: hovered ? "4.5em" : "0",
          overflow: "hidden",
          transition: "max-height 0.38s var(--ease-out), opacity 0.3s ease",
          opacity: hovered ? 1 : 0,
          marginBottom: hovered ? "0.45rem" : 0,
        }}>{dish.desc}</p>

        <span style={{
          fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.12em",
          textTransform: "uppercase", color: "var(--muted)",
          border: "1px solid rgba(255,247,230,0.12)", borderRadius: 999,
          padding: "0.14rem 0.52rem", fontFamily: "var(--sans)",
        }}>{dish.cuisine}</span>
      </div>
    </div>
  );
}

/* ─── ABOUT ──────────────────────────────────────────────────── */
function About({ onNav }) {
  const leftRef  = useReveal();
  const rightRef = useReveal();

  return (
    <section id="about" style={{ padding: "clamp(4rem,10vw,8rem) clamp(1rem,4vw,2.5rem)" }}>
      <div className="about-grid-inner" style={{
        maxWidth: 1280, margin: "0 auto",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "clamp(2rem,6vw,6rem)", alignItems: "center",
      }}>
        {/* Text */}
        <div ref={leftRef} className="reveal-left">
          <p style={{ fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.16em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"1rem" }}>
            Our Heritage
          </p>

          <h2 style={{
            fontFamily:"var(--serif)", fontWeight:200,
            fontSize:"clamp(2.25rem,5vw,4.25rem)",
            lineHeight:1.08, letterSpacing:"-0.02em", color:"var(--text)",
            marginBottom:"1.5rem",
          }}>
            Born in Italy,<br /><em style={{ fontStyle:"italic", color:"var(--gold)" }}>Grown in Chicago</em>
          </h2>

          <p style={{ fontSize:"clamp(0.95rem,1.5vw,1.05rem)", lineHeight:1.85, fontWeight:300, color:"var(--text2)", marginBottom:"1.25rem" }}>
            Mario and Adrian Rossi arrived in Chicago with suitcases full of family recipes and an unshakeable belief that good food brings people together.
          </p>
          <p style={{ fontSize:"0.875rem", lineHeight:1.85, fontWeight:300, color:"var(--muted)", marginBottom:"2.5rem" }}>
            Today, Little Lemon is a neighbourhood institution — moderately priced, warmly run, and always delicious. From Mario's hand-rolled pasta to Adrian's wood-fired breads, every visit feels like sitting down at a family table in Palermo.
          </p>

          <div style={{ marginBottom: "2.25rem" }}>
            <img src={LOGO_V_YELLOW} alt="Little Lemon" style={{ height: 100, width: "auto", opacity: 0.8 }} />
          </div>

          <button className="btn-primary" onClick={() => onNav("booking")}>
            Book Your Table <ArrowRight size={14} />
          </button>
        </div>

        {/* Mosaic */}
        <div ref={rightRef} className="reveal-right" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "230px 230px",
          gap: "10px",
        }}>
          <div className="photo-zoom" style={{ gridRow: "span 2", borderRadius: "var(--radius)", overflow: "hidden" }}>
            <img src={PHOTO1} alt="Chef" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
          </div>
          <div className="photo-zoom" style={{ borderRadius: "var(--radius)", overflow: "hidden", position: "relative" }}>
            <img src={PIC1} alt="Bruschetta" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
            <div style={{
              position: "absolute", bottom: 12, left: 12,
              background: "rgba(8,8,7,0.82)", backdropFilter: "blur(12px)",
              border: "1px solid var(--border2)", borderRadius: 10,
              padding: "0.55rem 0.85rem",
            }}>
              <div style={{ fontSize:"0.58rem", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"0.15rem" }}>Est.</div>
              <div style={{ fontFamily:"var(--serif)", fontSize:"1.35rem", fontWeight:200, color:"var(--text)", lineHeight:1 }}>2012</div>
            </div>
          </div>
          <div className="photo-zoom" style={{ borderRadius: "var(--radius)", overflow: "hidden" }}>
            <img src={PHOTO2} alt="Pasta" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── BOOKING ────────────────────────────────────────────────── */
const MONTHS_CAL = MONTHS_FULL;
const TIMES = [
  {t:"12:00 PM",full:false},{t:"12:30 PM",full:false},{t:"1:00 PM",full:true},
  {t:"1:30 PM", full:false},{t:"2:00 PM", full:true}, {t:"2:30 PM",full:false},
  {t:"5:00 PM", full:false},{t:"5:30 PM", full:false},{t:"6:00 PM",full:true},
  {t:"6:30 PM", full:true}, {t:"7:00 PM", full:false},{t:"7:30 PM",full:true},
  {t:"8:00 PM", full:false},{t:"8:30 PM", full:false},{t:"9:00 PM",full:true},
  {t:"9:30 PM", full:false},
];
const GUESTS = ["1","2","3","4","5","6","7","8+"];
const OCCASIONS = [
  {emoji:"🎂",label:"Birthday"},{emoji:"💑",label:"Anniversary"},
  {emoji:"💼",label:"Business"},{emoji:"🌹",label:"Date Night"},
  {emoji:"👨‍👩‍👧",label:"Family"}, {emoji:"✨",label:"Other"},
];

function CalendarPicker({ selected, onSelect }) {
  const [year,  setYear]  = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const today = new Date(); today.setHours(0,0,0,0);
  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const navBtnStyle = {
    background: "var(--surface3)", border: "1px solid var(--border)",
    borderRadius: 8, width: 34, height: 34,
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", transition: "border-color 0.2s",
  };

  return (
    <div style={{ background:"var(--surface2)", border:"1px solid var(--border)", borderRadius:"var(--radius)", padding:"1.25rem" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"1rem" }}>
        <button style={navBtnStyle}
          onMouseEnter={e=>e.currentTarget.style.borderColor="var(--gold)"}
          onMouseLeave={e=>e.currentTarget.style.borderColor="var(--border)"}
          onClick={() => month===0 ? (setMonth(11),setYear(y=>y-1)) : setMonth(m=>m-1)}
        ><ChevronLeft size={15} color="var(--muted)" /></button>
        <span style={{ fontFamily:"var(--serif)", fontSize:"1.05rem", fontWeight:400, color:"var(--text)", letterSpacing:"-0.01em" }}>
          {MONTHS_CAL[month]} {year}
        </span>
        <button style={navBtnStyle}
          onMouseEnter={e=>e.currentTarget.style.borderColor="var(--gold)"}
          onMouseLeave={e=>e.currentTarget.style.borderColor="var(--border)"}
          onClick={() => month===11 ? (setMonth(0),setYear(y=>y+1)) : setMonth(m=>m+1)}
        ><ChevronRight size={15} color="var(--muted)" /></button>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:2, marginBottom:4 }}>
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d=>(
          <div key={d} style={{ textAlign:"center", fontSize:"0.62rem", fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase", color:"var(--muted2)", padding:"0.3rem 0" }}>{d}</div>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:2 }}>
        {Array(firstDay).fill(null).map((_,i)=><div key={`b${i}`}/>)}
        {Array(daysInMonth).fill(null).map((_,i) => {
          const day=i+1, cd=new Date(year,month,day);
          const past = cd < today;
          const sel  = selected && selected.getFullYear()===year && selected.getMonth()===month && selected.getDate()===day;
          return (
            <button key={day} disabled={past} onClick={()=>!past&&onSelect(cd)} style={{
              border: sel?"1px solid var(--gold)":"1px solid transparent",
              borderRadius:7, padding:"0.5rem 0",
              background: sel?"var(--gold-dim)":"transparent",
              color: past?"var(--muted2)":sel?"var(--gold)":"var(--text)",
              fontSize:"0.82rem", fontFamily:"var(--sans)", fontWeight:sel?500:300,
              cursor:past?"not-allowed":"pointer", opacity:past?0.3:1,
              transition:"all 0.15s", textAlign:"center",
              boxShadow: sel?"0 0 0 2px var(--gold-dim)":"none",
            }}
              onMouseEnter={e=>{ if(!past&&!sel) e.currentTarget.style.background="var(--surface3)"; }}
              onMouseLeave={e=>{ if(!past&&!sel) e.currentTarget.style.background="transparent"; }}
            >{day}</button>
          );
        })}
      </div>
    </div>
  );
}

function StepDots({ step }) {
  const labels = ["Date & Time","Guest Details","Confirm"];
  return (
    <div style={{ display:"flex", alignItems:"center", gap:0, marginBottom:"clamp(1.5rem,3vw,2.5rem)" }}>
      {labels.map((label, i) => {
        const n=i+1, done=step>n, active=step===n;
        return (
          <div key={label} style={{ display:"flex", alignItems:"center", flex:i<labels.length-1?1:"none" }}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"0.4rem" }}>
              <div style={{
                width:34, height:34, borderRadius:"50%",
                background: done?"var(--gold)":active?"var(--gold-dim)":"var(--surface3)",
                border: done?"none":`1px solid ${active?"var(--gold)":"var(--border)"}`,
                display:"flex", alignItems:"center", justifyContent:"center",
                transition:"all 0.3s var(--ease-out)",
                boxShadow: active?"0 0 0 4px var(--gold-dim)":"none",
              }}>
                {done ? <Check size={14} color="#080807"/> : <span style={{ fontSize:"0.78rem", fontWeight:500, color:active?"var(--gold)":"var(--muted2)" }}>{n}</span>}
              </div>
              <span className="step-label-text" style={{
                fontSize:"0.6rem", fontWeight:600, letterSpacing:"0.1em",
                textTransform:"uppercase", whiteSpace:"nowrap",
                color: active?"var(--gold)":done?"var(--text2)":"var(--muted2)",
                transition:"color 0.3s",
              }}>{label}</span>
            </div>
            {i<labels.length-1&&(
              <div style={{ flex:1, height:1, margin:"0 6px", marginBottom:"1.4rem", background:done?"var(--gold)":"var(--border)", transition:"background 0.4s" }}/>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── EXPORTED VALIDATION HELPERS (used by unit tests) ──────── */
export function validateStep1(form) {
  const e = {};
  if (!form.date)  e.date = "Please select a date";
  if (!form.time)  e.time = "Please select a time";
  return e;
}

export function validateStep2(form) {
  const e = {};
  if (!form.firstName.trim()) e.firstName = "Required";
  if (!form.lastName.trim())  e.lastName  = "Required";
  if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
    e.email = "Valid email required";
  if (!form.phone.trim()) e.phone = "Required";
  return e;
}

/* ─── initializeTimes: pure function used by parent + tests ─── */
export function initializeTimes() {
  return [
    { t:"12:00 PM", full:false }, { t:"12:30 PM", full:false },
    { t:"1:00 PM",  full:true  }, { t:"1:30 PM",  full:false },
    { t:"2:00 PM",  full:true  }, { t:"2:30 PM",  full:false },
    { t:"5:00 PM",  full:false }, { t:"5:30 PM",  full:false },
    { t:"6:00 PM",  full:true  }, { t:"6:30 PM",  full:true  },
    { t:"7:00 PM",  full:false }, { t:"7:30 PM",  full:true  },
    { t:"8:00 PM",  full:false }, { t:"8:30 PM",  full:false },
    { t:"9:00 PM",  full:true  }, { t:"9:30 PM",  full:false },
  ];
}

/* ─── updateTimes: returns times for a given date (pure, testable) */
export function updateTimes(date) {
  // Weekend evenings are busier — mark more slots full
  if (!date) return initializeTimes();
  const day = date.getDay(); // 0=Sun, 6=Sat
  const isWeekend = day === 0 || day === 6;
  return initializeTimes().map(slot => ({
    ...slot,
    full: slot.full || (isWeekend && parseInt(slot.t) >= 7),
  }));
}

/* ─── BOOKING FORM (child component) ───────────────────────── */
export function BookingForm({ availableTimes, dispatch, onConfirmed }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    date: null, time: "", guests: "2", occasion: "",
    firstName: "", lastName: "", email: "", phone: "", requests: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (k, v) => {
    setForm(s => ({ ...s, [k]: v }));
    // When date changes, ask parent to update available times
    if (k === "date") dispatch({ type: "UPDATE_TIMES", date: v });
  };

  function next() {
    const errs = step === 1 ? validateStep1(form) : validateStep2(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStep(s => s + 1);
  }

  async function confirm() {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    onConfirmed(form);
  }

  const FL = (txt, opt) => (
    <label style={{ display:"block", fontSize:"0.67rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--muted)", marginBottom:"0.5rem" }}>
      {txt}{opt && <span style={{ color:"var(--muted2)", fontWeight:300, textTransform:"none", letterSpacing:0 }}> (optional)</span>}
    </label>
  );
  const EM = k => errors[k] && <p data-testid={`error-${k}`} style={{ fontSize:"0.71rem", color:"#e05252", marginTop:"0.32rem" }}>{errors[k]}</p>;

  return (
    <div data-testid="booking-form">
        <>
            <StepDots step={step} />

            {step===1 && (
              <div style={{ animation:"fadeUp 0.5s var(--ease-out) both" }}>
                <div className="booking-form-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem" }}>
                  <div style={{ gridColumn:"1/-1" }}>
                    {FL("Select a Date")}
                    <CalendarPicker selected={form.date} onSelect={d=>set("date",d)} />
                    {EM("date")}
                  </div>

                  <div style={{ gridColumn:"1/-1" }}>
                    {FL("Select a Time")}
                    <div className="time-grid-inner" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:6 }}>
                      {availableTimes.map(({t,full})=>(
                        <button key={t} disabled={full} onClick={()=>!full&&set("time",t)} style={{
                          padding:"0.6rem 0.35rem", borderRadius:8, textAlign:"center",
                          fontFamily:"var(--sans)", fontSize:"0.78rem", fontWeight:300,
                          border: form.time===t?"1px solid var(--gold)":"1px solid var(--border)",
                          background: form.time===t?"var(--gold-dim)":full?"transparent":"var(--surface3)",
                          color: full?"var(--muted2)":form.time===t?"var(--gold)":"var(--text2)",
                          cursor:full?"not-allowed":"pointer", opacity:full?0.35:1,
                          textDecoration:full?"line-through":"none",
                          transition:"all 0.15s",
                          boxShadow:form.time===t?"0 0 0 2px var(--gold-dim)":"none",
                        }}>{t}</button>
                      ))}
                    </div>
                    {EM("time")}
                  </div>

                  <div>
                    {FL("Guests")}
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                      {GUESTS.map(g=>(
                        <button key={g} onClick={()=>set("guests",g)} style={{
                          width:42, height:42, borderRadius:8,
                          border:form.guests===g?"1px solid var(--gold)":"1px solid var(--border)",
                          background:form.guests===g?"var(--gold-dim)":"var(--surface3)",
                          color:form.guests===g?"var(--gold)":"var(--text2)",
                          fontSize:"0.84rem", fontFamily:"var(--sans)", fontWeight:300,
                          cursor:"pointer", transition:"all 0.15s",
                          boxShadow:form.guests===g?"0 0 0 2px var(--gold-dim)":"none",
                        }}>{g}</button>
                      ))}
                    </div>
                  </div>

                  <div>
                    {FL("Occasion", true)}
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                      {OCCASIONS.map(({emoji,label})=>(
                        <button key={label} onClick={()=>set("occasion",form.occasion===label?"":label)} style={{
                          padding:"0.38rem 0.72rem", borderRadius:999,
                          border:form.occasion===label?"1px solid var(--gold)":"1px solid var(--border)",
                          background:form.occasion===label?"var(--gold-dim)":"var(--surface3)",
                          color:form.occasion===label?"var(--gold)":"var(--muted)",
                          fontSize:"0.74rem", fontFamily:"var(--sans)", fontWeight:300,
                          cursor:"pointer", display:"flex", alignItems:"center", gap:"0.3rem",
                          transition:"all 0.15s",
                        }}>{emoji} {label}</button>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ display:"flex", justifyContent:"flex-end", marginTop:"2rem", paddingTop:"1.5rem", borderTop:"1px solid var(--border)" }}>
                  <button className="btn-primary" onClick={next}>Continue <ChevronRight size={14}/></button>
                </div>
              </div>
            )}

            {step===2 && (
              <div style={{ animation:"fadeUp 0.5s var(--ease-out) both" }}>
                <div className="booking-form-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.25rem" }}>
                  {[
                    {k:"firstName",label:"First Name",     ph:"Mario",              type:"text",  col:"1/2"},
                    {k:"lastName", label:"Last Name",      ph:"Rossi",              type:"text",  col:"2/3"},
                    {k:"email",    label:"Email Address",  ph:"mario@example.com",  type:"email", col:"1/-1"},
                    {k:"phone",    label:"Phone Number",   ph:"+1 (312) 555-0100",  type:"tel",   col:"1/-1"},
                  ].map(({k,label,ph,type,col})=>(
                    <div key={k} style={{ gridColumn:col }}>
                      {FL(label)}
                      <input className="field-input" type={type} placeholder={ph}
                        value={form[k]} onChange={e=>set(k,e.target.value)}
                        style={{ borderColor:errors[k]?"#e05252":"" }}
                      />
                      {EM(k)}
                    </div>
                  ))}
                  <div style={{ gridColumn:"1/-1" }}>
                    {FL("Special Requests", true)}
                    <textarea className="field-input" rows={3}
                      placeholder="Allergies, high chair, celebration setup…"
                      value={form.requests} onChange={e=>set("requests",e.target.value)}
                      style={{ resize:"vertical", minHeight:80 }}
                    />
                  </div>
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", marginTop:"2rem", paddingTop:"1.5rem", borderTop:"1px solid var(--border)" }}>
                  <button className="btn-ghost" onClick={()=>setStep(1)}><ChevronLeft size={14}/> Back</button>
                  <button className="btn-primary" onClick={next}>Review Booking <ChevronRight size={14}/></button>
                </div>
              </div>
            )}

            {step===3 && (
              <div style={{ animation:"fadeUp 0.5s var(--ease-out) both" }}>
                <div style={{ background:"var(--surface2)", border:"1px solid var(--border)", borderRadius:"var(--radius-lg)", overflow:"hidden", marginBottom:"1.75rem" }}>
                  <div style={{ padding:"1.25rem 1.5rem", background:"var(--gold-dim)", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", gap:"0.85rem" }}>
                    <div style={{ width:34, height:34, borderRadius:"50%", background:"var(--gold-dim)", border:"1px solid rgba(212,168,67,0.3)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <Check size={14} color="var(--gold)"/>
                    </div>
                    <div>
                      <h3 style={{ fontFamily:"var(--serif)", fontSize:"1.15rem", fontWeight:400, color:"var(--text)" }}>Almost there!</h3>
                      <p style={{ fontSize:"0.78rem", color:"var(--muted)" }}>Review your details before confirming.</p>
                    </div>
                  </div>

                  <div style={{ padding:"1.25rem 1.5rem" }}>
                    {[
                      {icon:<Calendar size={14} color="var(--gold)"/>, label:"Date & Time", val:`${formatDate(form.date)} at ${form.time}`},
                      {icon:<Users    size={14} color="var(--gold)"/>, label:"Guests",      val:`${form.guests} ${form.guests==="1"?"guest":"guests"}`},
                      ...(form.occasion?[{icon:<Sparkles size={14} color="var(--gold)"/>, label:"Occasion", val:form.occasion}]:[]),
                      {icon:<Clock    size={14} color="var(--gold)"/>, label:"Name",        val:`${form.firstName} ${form.lastName}`},
                      {icon:<Mail     size={14} color="var(--gold)"/>, label:"Email",       val:form.email},
                      {icon:<Phone    size={14} color="var(--gold)"/>, label:"Phone",       val:form.phone},
                      ...(form.requests?[{icon:<UtensilsCrossed size={14} color="var(--gold)"/>, label:"Requests", val:form.requests}]:[]),
                    ].map(({icon,label,val},i,arr)=>(
                      <div key={label} style={{ display:"flex", gap:"0.875rem", alignItems:"flex-start", paddingBottom:i<arr.length-1?"0.85rem":0, marginBottom:i<arr.length-1?"0.85rem":0, borderBottom:i<arr.length-1?"1px solid var(--border)":"none" }}>
                        <div style={{ marginTop:1, flexShrink:0 }}>{icon}</div>
                        <div style={{ flex:1, display:"flex", justifyContent:"space-between", gap:"1rem", flexWrap:"wrap" }}>
                          <span style={{ fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.09em", textTransform:"uppercase", color:"var(--muted)" }}>{label}</span>
                          <span style={{ fontSize:"0.85rem", fontWeight:300, color:"var(--text2)", textAlign:"right" }}>{val}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ padding:"0.875rem 1.5rem", borderTop:"1px solid var(--border)", background:"rgba(0,0,0,0.18)" }}>
                    <p style={{ fontSize:"0.72rem", color:"var(--muted2)", lineHeight:1.65 }}>
                      A confirmation email will be sent after booking. We hold reservations for 15 minutes past the scheduled time.
                    </p>
                  </div>
                </div>

                <div style={{ display:"flex", justifyContent:"space-between", paddingTop:"1rem", borderTop:"1px solid var(--border)" }}>
                  <button className="btn-ghost" onClick={()=>setStep(2)}><ChevronLeft size={14}/> Edit</button>
                  <button className="btn-primary" onClick={confirm} disabled={loading} style={{ opacity:loading?0.7:1, cursor:loading?"wait":"pointer" }}>
                    {loading?"Confirming…":"Confirm Reservation"}
                    {!loading&&<Check size={14}/>}
                  </button>
                </div>
              </div>
            )}
          </>
    </div>
  );
}

/* ─── BOOKING SECTION (parent — owns availableTimes state) ───── */
function BookingSection() {
  const secRef = useReveal();
  const [availableTimes, setAvailableTimes] = useState(initializeTimes);
  const [confirmed, setConfirmed]       = useState(false);
  const [confirmedForm, setConfirmedForm] = useState(null);

  function dispatch({ type, date }) {
    if (type === "UPDATE_TIMES") setAvailableTimes(updateTimes(date));
  }

  return (
    <section id="booking" style={{ background:"var(--bg2)", padding:"clamp(4rem,10vw,8rem) clamp(1rem,4vw,2.5rem)" }}>
      <div style={{ maxWidth:780, margin:"0 auto" }}>
        <div ref={secRef} className="reveal" style={{ textAlign:"center", marginBottom:"clamp(2rem,4vw,3.5rem)" }}>
          <p style={{ fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.16em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"1rem" }}>
            <Calendar size={11} style={{ display:"inline", marginRight:6 }} />Reservations
          </p>
          <h2 style={{
            fontFamily:"var(--serif)", fontWeight:200,
            fontSize:"clamp(2.25rem,5vw,4.25rem)",
            lineHeight:1.08, letterSpacing:"-0.02em", color:"var(--text)",
          }}>
            Reserve Your<br /><em style={{ fontStyle:"italic", color:"var(--gold)" }}>Table</em>
          </h2>
        </div>

        {confirmed && confirmedForm ? (
          <div style={{
            background:"linear-gradient(145deg,rgba(212,168,67,0.09),rgba(212,168,67,0.04))",
            border:"1px solid rgba(212,168,67,0.25)", borderRadius:"var(--radius-lg)",
            padding:"clamp(2rem,5vw,3.5rem)", textAlign:"center",
            animation:"scaleIn 0.55s var(--ease-spring) both",
          }}>
            <div style={{
              width:60, height:60, borderRadius:"50%", background:"var(--gold)",
              display:"flex", alignItems:"center", justifyContent:"center",
              margin:"0 auto 1.75rem",
              animation:"pulseRing 1.5s ease 0.4s",
            }}><Check size={26} color="#080807"/></div>
            <h3 style={{ fontFamily:"var(--serif)", fontWeight:400, fontSize:"1.85rem", letterSpacing:"-0.01em", color:"var(--text)", marginBottom:"0.75rem" }}>You're confirmed!</h3>
            <p style={{ fontSize:"0.875rem", lineHeight:1.85, fontWeight:300, color:"var(--muted)", maxWidth:420, margin:"0 auto 2rem" }}>
              Your table is reserved for{" "}
              <strong style={{ color:"var(--text2)" }}>{formatDate(confirmedForm.date)} at {confirmedForm.time}</strong>{" "}
              for {confirmedForm.guests} {confirmedForm.guests==="1"?"guest":"guests"}. A confirmation is heading to {confirmedForm.email}.
            </p>
            <button className="btn-ghost" onClick={()=>{ setConfirmed(false); setConfirmedForm(null); }}>
              Make Another Reservation
            </button>
          </div>
        ) : (
          <BookingForm
            availableTimes={availableTimes}
            dispatch={dispatch}
            onConfirmed={(form) => { setConfirmedForm(form); setConfirmed(true); }}
          />
        )}
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ───────────────────────────────────────────── */
function Testimonials() {
  const headRef = useReveal();
  const [active, setActive] = useState(0);

  const reviews = [
    {
      name: "Sofia Marchetti",
      location: "Chicago, IL",
      rating: 5,
      date: "March 2026",
      title: "A genuine taste of the Mediterranean",
      body: "Every bite transported me straight to the Amalfi coast. The sea bass was perfectly charred, the service warm and unhurried. Little Lemon has become our anniversary ritual — three years running.",
      initials: "SM",
      accent: "#d4a843",
    },
    {
      name: "James & Claire Okafor",
      location: "Evanston, IL",
      rating: 5,
      date: "January 2026",
      title: "Best date-night restaurant in Chicago",
      body: "We've tried almost every Mediterranean spot in the city and nothing comes close. The bruschetta board, the village salad, the Arrabbiata — every single dish was flawless. The atmosphere is intimate without feeling stuffy.",
      initials: "JO",
      accent: "#8aaa80",
    },
    {
      name: "Nadia El-Fassi",
      location: "Lincoln Park, Chicago",
      rating: 5,
      date: "April 2026",
      title: "Mario's kitchen is pure magic",
      body: "I grew up in Tunisia and I am very particular about Mediterranean food. Little Lemon honours the traditions without becoming a museum. The seasonal menu changes just enough to keep every visit exciting. I bring every out-of-town guest here.",
      initials: "NE",
      accent: "#c47a5a",
    },
    {
      name: "Thomas Bergmann",
      location: "West Loop, Chicago",
      rating: 5,
      date: "February 2026",
      title: "Feels like home, even for a German",
      body: "The Grilled Vegetable Medley is a masterpiece of simplicity. You can taste that the produce is chosen with real care. The sourdough bruschetta is reason enough to visit. My partner and I now have a standing Thursday booking.",
      initials: "TB",
      accent: "#7a8ec4",
    },
    {
      name: "Rachel & Priya Sharma",
      location: "Wicker Park, Chicago",
      rating: 5,
      date: "May 2026",
      title: "Worth every penny — and then some",
      body: "Little Lemon hits that rare sweet spot of genuinely great food at fair prices. The booking process is seamless, the team remembered Priya's nut allergy without being asked twice, and the Margherita pizza is criminally good.",
      initials: "RS",
      accent: "#b47aba",
    },
  ];

  const prev = () => setActive(a => (a - 1 + reviews.length) % reviews.length);
  const next = () => setActive(a => (a + 1) % reviews.length);

  return (
    <section style={{ background:"var(--bg2)", padding:"clamp(4rem,10vw,8rem) clamp(1rem,4vw,2.5rem)", overflow:"hidden" }}>
      <div style={{ maxWidth:1280, margin:"0 auto" }}>

        {/* Header */}
        <div ref={headRef} className="reveal" style={{ textAlign:"center", marginBottom:"clamp(3rem,6vw,5rem)" }}>
          <p style={{ fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.16em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"1rem" }}>
            <Star size={11} style={{ display:"inline", marginRight:6 }} />What Our Guests Say
          </p>
          <h2 style={{
            fontFamily:"var(--serif)", fontWeight:200,
            fontSize:"clamp(2.25rem,5vw,4rem)",
            lineHeight:1.08, letterSpacing:"-0.02em", color:"var(--text)",
          }}>
            Loved by Every <em style={{ fontStyle:"italic", color:"var(--gold)" }}>Table</em>
          </h2>
          <p style={{ fontSize:"0.875rem", lineHeight:1.85, fontWeight:300, color:"var(--muted)", maxWidth:420, margin:"1.25rem auto 0" }}>
            Over 2,400 five-star reviews across Google and Yelp. Here's what our community has to say.
          </p>
          {/* Aggregate stars */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"0.5rem", marginTop:"1.5rem" }}>
            {[...Array(5)].map((_,i)=>(
              <Star key={i} size={18} fill="var(--gold)" color="var(--gold)" />
            ))}
            <span style={{ fontFamily:"var(--serif)", fontSize:"1.5rem", fontWeight:200, color:"var(--gold)", marginLeft:"0.4rem" }}>5.0</span>
            <span style={{ fontSize:"0.75rem", color:"var(--muted)", marginLeft:"0.2rem" }}>· 2,400+ reviews</span>
          </div>
        </div>

        {/* Featured (large) card */}
        <div style={{ position:"relative", marginBottom:"2rem" }}>
          <div key={active} style={{
            background:"var(--surface)", border:"1px solid var(--border2)",
            borderRadius:"var(--radius-lg)", padding:"clamp(2rem,4vw,3.5rem)",
            position:"relative", overflow:"hidden",
            animation:"scaleIn 0.45s var(--ease-out) both",
          }}>
            {/* Accent glow */}
            <div style={{
              position:"absolute", width:320, height:320, borderRadius:"50%",
              top:-80, right:-60,
              background:`radial-gradient(circle, ${reviews[active].accent}18 0%, transparent 70%)`,
              pointerEvents:"none",
            }}/>
            {/* Quote mark */}
            <div style={{
              fontFamily:"var(--serif)", fontSize:"8rem", lineHeight:1,
              color:"var(--border2)", position:"absolute", top:"1rem", left:"2rem",
              pointerEvents:"none", userSelect:"none",
            }}>"</div>

            <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", gap:"1.5rem" }}>
              {/* Stars + date */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"0.75rem" }}>
                <div style={{ display:"flex", gap:4 }}>
                  {[...Array(reviews[active].rating)].map((_,i)=>(
                    <Star key={i} size={16} fill="var(--gold)" color="var(--gold)" />
                  ))}
                </div>
                <span style={{ fontSize:"0.72rem", color:"var(--muted)", letterSpacing:"0.06em" }}>{reviews[active].date}</span>
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily:"var(--serif)", fontWeight:400,
                fontSize:"clamp(1.3rem,2.5vw,1.85rem)", lineHeight:1.25,
                letterSpacing:"-0.01em", color:"var(--text)",
              }}>
                {reviews[active].title}
              </h3>

              {/* Body */}
              <p style={{
                fontSize:"clamp(0.9rem,1.3vw,1.025rem)", lineHeight:1.9,
                fontWeight:300, color:"var(--text2)", maxWidth:760,
              }}>
                {reviews[active].body}
              </p>

              {/* Reviewer */}
              <div style={{ display:"flex", alignItems:"center", gap:"1rem", paddingTop:"0.75rem", borderTop:"1px solid var(--border)" }}>
                <div style={{
                  width:46, height:46, borderRadius:"50%", flexShrink:0,
                  background:`linear-gradient(135deg, ${reviews[active].accent}55, ${reviews[active].accent}22)`,
                  border:`1.5px solid ${reviews[active].accent}66`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontFamily:"var(--serif)", fontWeight:400, fontSize:"0.9rem",
                  color:reviews[active].accent,
                }}>
                  {reviews[active].initials}
                </div>
                <div>
                  <div style={{ fontSize:"0.875rem", fontWeight:500, color:"var(--text)" }}>{reviews[active].name}</div>
                  <div style={{ fontSize:"0.72rem", color:"var(--muted)", marginTop:"0.2rem" }}>{reviews[active].location}</div>
                </div>
                <div style={{ marginLeft:"auto", fontSize:"0.68rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--gold)", background:"var(--gold-dim)", border:"1px solid rgba(212,168,67,0.2)", borderRadius:6, padding:"0.3rem 0.7rem" }}>
                  Verified Diner
                </div>
              </div>
            </div>
          </div>

          {/* Arrow controls */}
          <div style={{ display:"flex", gap:"0.625rem", justifyContent:"flex-end", marginTop:"1.25rem" }}>
            <button onClick={prev} style={{
              width:42, height:42, borderRadius:"50%",
              background:"var(--surface2)", border:"1px solid var(--border2)",
              display:"flex", alignItems:"center", justifyContent:"center",
              cursor:"pointer", color:"var(--muted)",
              transition:"border-color 0.2s, color 0.2s, transform 0.25s var(--ease-spring)",
            }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor="var(--gold)"; e.currentTarget.style.color="var(--gold)"; e.currentTarget.style.transform="scale(1.08)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor="var(--border2)"; e.currentTarget.style.color="var(--muted)"; e.currentTarget.style.transform="scale(1)"; }}
            ><ChevronLeft size={16}/></button>
            <button onClick={next} style={{
              width:42, height:42, borderRadius:"50%",
              background:"var(--surface2)", border:"1px solid var(--border2)",
              display:"flex", alignItems:"center", justifyContent:"center",
              cursor:"pointer", color:"var(--muted)",
              transition:"border-color 0.2s, color 0.2s, transform 0.25s var(--ease-spring)",
            }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor="var(--gold)"; e.currentTarget.style.color="var(--gold)"; e.currentTarget.style.transform="scale(1.08)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor="var(--border2)"; e.currentTarget.style.color="var(--muted)"; e.currentTarget.style.transform="scale(1)"; }}
            ><ChevronRight size={16}/></button>
          </div>
        </div>

        {/* Mini cards row */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:"1px", background:"var(--border)", borderRadius:"var(--radius-lg)", overflow:"hidden" }}>
          {reviews.map((r, i) => (
            <button key={r.name} onClick={() => setActive(i)} style={{
              background: active===i ? "linear-gradient(145deg, rgba(212,168,67,0.1), rgba(212,168,67,0.04))" : "var(--surface)",
              border:"none", padding:"1.25rem 1.5rem",
              textAlign:"left", cursor:"pointer",
              transition:"background 0.3s",
              outline:"none",
            }}>
              <div style={{ display:"flex", gap:2, marginBottom:"0.65rem" }}>
                {[...Array(r.rating)].map((_,j)=>(
                  <Star key={j} size={11} fill={active===i?"var(--gold)":"var(--muted2)"} color={active===i?"var(--gold)":"var(--muted2)"} />
                ))}
              </div>
              <div style={{ fontSize:"0.78rem", fontWeight:500, color:active===i?"var(--text)":"var(--text2)", marginBottom:"0.25rem", lineHeight:1.3 }}>{r.name}</div>
              <div style={{ fontSize:"0.68rem", color:"var(--muted)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{r.location}</div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ borderTop:"1px solid var(--border)", background:"var(--bg)", padding:"clamp(3rem,6vw,5rem) clamp(1rem,4vw,2.5rem) clamp(1.5rem,3vw,2.5rem)" }}>
      <div style={{ maxWidth:1280, margin:"0 auto" }}>
        <div className="footer-inner" style={{ display:"grid", gridTemplateColumns:"1.2fr 1fr 1fr", gap:"clamp(2rem,5vw,4rem)", marginBottom:"clamp(2rem,4vw,3rem)" }}>
          <div>
            <div style={{ marginBottom:"1.25rem" }}>
              <img src={LOGO_H_GREEN} alt="Little Lemon" style={{ height:40, width:"auto", opacity:0.72 }} />
            </div>
            <p style={{ fontSize:"0.875rem", lineHeight:1.85, fontWeight:300, color:"var(--muted)", maxWidth:280 }}>
              A family-owned Mediterranean restaurant in the heart of Chicago. Good food. Warm tables. Always.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize:"0.67rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"1.25rem" }}>Visit Us</h4>
            <div style={{ display:"flex", flexDirection:"column", gap:"0.65rem" }}>
              {[[<MapPin size={13}/>,"742 W Randolph St, Chicago, IL 60661"],[<Phone size={13}/>,"(312) 555-0192"],[<Mail size={13}/>,"hello@littlelemon.com"]].map(([icon,text],i)=>(
                <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:"0.5rem" }}>
                  <span style={{ color:"var(--muted)", marginTop:2, flexShrink:0 }}>{icon}</span>
                  <span style={{ fontSize:"0.875rem", fontWeight:300, color:"var(--muted)" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize:"0.67rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"1.25rem" }}>Navigate</h4>
            <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem" }}>
              {["Home","Menu","About","Reservations"].map(link=>(
                <a key={link} href={`#${link.toLowerCase()}`} style={{ fontSize:"0.875rem", fontWeight:300, color:"var(--muted)", textDecoration:"none", transition:"color 0.2s" }}
                  onMouseEnter={e=>e.target.style.color="var(--text)"}
                  onMouseLeave={e=>e.target.style.color="var(--muted)"}
                >{link}</a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ paddingTop:"1.5rem", borderTop:"1px solid var(--border)", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"0.5rem" }}>
          <p style={{ fontSize:"0.71rem", color:"var(--muted2)" }}>© 2026 Little Lemon Restaurant. All rights reserved.</p>
          <p style={{ fontSize:"0.71rem", color:"var(--muted2)" }}>Family-owned Mediterranean restaurant · Chicago, Illinois</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── APP ────────────────────────────────────────────────────── */
export default function App() {
  const [activeNav, setActiveNav] = useState("home");

  function handleNav(id) {
    setActiveNav(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior:"smooth", block:"start" });
    else window.scrollTo({ top:0, behavior:"smooth" });
  }

  return (
    <>
      <style>{globalCSS}</style>
      <div style={{ background:"var(--bg)", minHeight:"100vh" }}>
        <Nav active={activeNav} onNav={handleNav} />
        <div id="home"><Hero onNav={handleNav} /></div>
        <Features onNav={handleNav} />
        <MenuSection onNav={handleNav} />
        <About onNav={handleNav} />
        <BookingSection />
        <Testimonials />
        <Footer />
      </div>
    </>
  );
}
