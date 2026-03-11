import { useState, useEffect, useRef } from "react";

const SOCIAL = {
  github: "https://github.com/RudraK29",
  instagram: "https://www.instagram.com/rudrakansara_2",
  linkedin: "https://www.linkedin.com/in/rudra-kansara-aa2665366/",
};

const NAV_LINKS = ["Home", "About", "Projects", "Skills", "Contact"];

const PROJECTS = [
  {
    title: "Project Alpha",
    desc: "A full-stack web application with modern UI and real-time features.",
    tags: ["React", "Node.js", "MongoDB"],
    color: "#00f5a0",
  },
  {
    title: "Project Beta",
    desc: "Mobile-first responsive app with seamless user experience.",
    tags: ["Flutter", "Firebase"],
    color: "#7b61ff",
  },
  {
    title: "Project Gamma",
    desc: "Data visualization dashboard with interactive charts.",
    tags: ["Python", "D3.js", "Flask"],
    color: "#ff6b6b",
  },
  {
    title: "Project Delta",
    desc: "Open-source CLI tool for developer productivity.",
    tags: ["JavaScript", "Shell"],
    color: "#ffd93d",
  },
];

const SKILLS = [
  { name: "JavaScript", level: 88 },
  { name: "React", level: 85 },
  { name: "Python", level: 80 },
  { name: "Node.js", level: 78 },
  { name: "CSS / Tailwind", level: 90 },
  { name: "Git & GitHub", level: 92 },
];

function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (ref.current) {
        ref.current.style.left = e.clientX + "px";
        ref.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        pointerEvents: "none",
        zIndex: 0,
        width: 400,
        height: 400,
        borderRadius: "50%",
        transform: "translate(-50%,-50%)",
        background: "radial-gradient(circle, rgba(0,245,160,0.07) 0%, transparent 70%)",
        transition: "left 0.12s ease, top 0.12s ease",
      }}
    />
  );
}

function TypeWriter({ words }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[idx % words.length];
    const timeout = setTimeout(() => {
      if (!del) {
        setText(word.slice(0, text.length + 1));
        if (text.length + 1 === word.length) setTimeout(() => setDel(true), 1200);
      } else {
        setText(word.slice(0, text.length - 1));
        if (text.length === 0) { setDel(false); setIdx((i) => i + 1); }
      }
    }, del ? 50 : 90);
    return () => clearTimeout(timeout);
  }, [text, del, idx, words]);
  return (
    <span style={{ color: "#00f5a0" }}>
      {text}
      <span style={{ animation: "blink 1s step-end infinite" }}>|</span>
    </span>
  );
}

function SkillBar({ name, level, delay }) {
  const [w, setW] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setTimeout(() => setW(level), delay); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [level, delay]);
  return (
    <div ref={ref} style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontFamily: "'Space Mono', monospace", fontSize: 13, color: "#aaa" }}>
        <span>{name}</span><span style={{ color: "#00f5a0" }}>{w}%</span>
      </div>
      <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 99, height: 6, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${w}%`, background: "linear-gradient(90deg,#00f5a0,#00b4d8)", borderRadius: 99, transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)" }} />
      </div>
    </div>
  );
}

function ProjectCard({ p, i }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hov ? p.color + "55" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 16,
        padding: "28px 24px",
        cursor: "pointer",
        transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
        transform: hov ? "translateY(-6px)" : "none",
        boxShadow: hov ? `0 20px 60px ${p.color}22` : "none",
        animation: `fadeUp 0.6s ease ${i * 0.15}s both`,
      }}
    >
      <div style={{ width: 36, height: 36, borderRadius: 10, background: p.color + "22", border: `1px solid ${p.color}44`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: p.color }} />
      </div>
      <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 10 }}>{p.title}</h3>
      <p style={{ color: "#888", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{p.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {p.tags.map((t) => (
          <span key={t} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 99, background: p.color + "18", color: p.color, fontFamily: "'Space Mono', monospace", letterSpacing: 0.5 }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Mono:wght@400;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    @keyframes blink { 50% { opacity: 0; } }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: none; } }
    @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes pulse { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #050a0e; }
    ::-webkit-scrollbar-thumb { background: #00f5a0; border-radius: 99px; }
    .nav-link { background: none; border: none; cursor: pointer; font-family: 'Space Mono', monospace; font-size: 13px; letter-spacing: 1px; padding: 8px 14px; border-radius: 8px; transition: all 0.25s; }
    .social-btn { display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.04); cursor: pointer; transition: all 0.3s; text-decoration: none; color: #aaa; font-size: 18px; }
    .social-btn:hover { border-color: #00f5a0 !important; color: #00f5a0 !important; transform: translateY(-3px); }
    .cta-btn { font-family: 'Space Mono', monospace; font-size: 13px; letter-spacing: 1px; padding: 14px 28px; border-radius: 10px; cursor: pointer; transition: all 0.3s; border: none; }
    .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,245,160,0.25); }
    .tech-badge { font-family: 'Space Mono',monospace; font-size: 12px; padding: 10px 18px; border-radius: 10px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: #ccc; letter-spacing: 0.5px; cursor: default; transition: all 0.25s; }
    .tech-badge:hover { border-color: #00f5a0 !important; color: #00f5a0 !important; background: rgba(0,245,160,0.08) !important; }
    .contact-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 24px 28px; display: flex; align-items: center; gap: 16px; transition: all 0.3s; }
    .contact-card:hover { transform: translateY(-4px); }
    @media (max-width: 768px) {
      .desktop-nav { display: none !important; }
      .hamburger { display: flex !important; }
      .hero-grid { flex-direction: column !important; text-align: center; }
      .hero-avatar { display: none !important; }
      .hero-btns { justify-content: center !important; }
      .hero-social { justify-content: center !important; }
      .two-col { grid-template-columns: 1fr !important; }
      .hero-title { font-size: clamp(2.2rem, 8vw, 3.5rem) !important; }
    }
  `;

  return (
    <div style={{ background: "#050a0e", minHeight: "100vh", color: "#fff", overflowX: "hidden" }}>
      <style>{css}</style>
      <CursorGlow />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrollY > 40 ? "rgba(5,10,14,0.92)" : "transparent",
        backdropFilter: scrollY > 40 ? "blur(20px)" : "none",
        borderBottom: scrollY > 40 ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.4s ease",
        padding: "0 5vw",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 68,
      }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22, color: "#fff", letterSpacing: -0.5 }}>
          RK<span style={{ color: "#00f5a0" }}>.</span>
        </div>
        <div className="desktop-nav" style={{ display: "flex", gap: 4 }}>
          {NAV_LINKS.map((l) => (
            <button key={l} className="nav-link" onClick={() => scrollTo(l)}
              style={{ color: active === l ? "#00f5a0" : "#888", background: active === l ? "rgba(0,245,160,0.08)" : "none" }}>
              {l}
            </button>
          ))}
        </div>
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", display: "none", flexDirection: "column", gap: 5, padding: 8 }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: "block", width: 24, height: 2, background: "#00f5a0", borderRadius: 99, transition: "all 0.3s",
              transform: menuOpen ? (i === 0 ? "rotate(45deg) translate(5px,5px)" : i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "none") : "none",
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(5,10,14,0.98)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
          {NAV_LINKS.map((l) => (
            <button key={l} className="nav-link" onClick={() => scrollTo(l)}
              style={{ color: active === l ? "#00f5a0" : "#ccc", fontSize: 20, padding: "16px 32px" }}>
              {l}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="home" style={{ minHeight: "100vh", padding: "120px 5vw 80px", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,245,160,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,160,0.04) 1px,transparent 1px)", backgroundSize: "60px 60px", zIndex: 0 }} />
        <div style={{ position: "absolute", top: "20%", right: "10%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,245,160,0.12),transparent 70%)", animation: "float 6s ease-in-out infinite", zIndex: 0 }} />
        <div style={{ position: "absolute", bottom: "15%", left: "5%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,180,216,0.1),transparent 70%)", animation: "float 8s ease-in-out infinite 2s", zIndex: 0 }} />

        <div className="hero-grid" style={{ display: "flex", alignItems: "center", gap: 60, width: "100%", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,245,160,0.08)", border: "1px solid rgba(0,245,160,0.2)", borderRadius: 99, padding: "6px 16px", marginBottom: 24, animation: "fadeUp 0.6s ease both" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#00f5a0", display: "inline-block", animation: "pulse 2s infinite" }} />
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "#00f5a0", letterSpacing: 1 }}>Available for work</span>
            </div>

            <h1 className="hero-title" style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2.8rem,5vw,5rem)", fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: 20, animation: "fadeUp 0.6s ease 0.1s both", letterSpacing: -1 }}>
              Hi, I'm<br /><span style={{ color: "#00f5a0" }}>Rudra Kansara</span>
            </h1>

            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(1.1rem,2.5vw,1.7rem)", fontWeight: 400, color: "#555", marginBottom: 24, animation: "fadeUp 0.6s ease 0.2s both" }}>
              <TypeWriter words={["Full Stack Developer", "UI/UX Enthusiast", "Open Source Contributor", "Problem Solver"]} />
            </h2>

            <p style={{ color: "#666", fontSize: 15, lineHeight: 1.8, maxWidth: 480, marginBottom: 36, animation: "fadeUp 0.6s ease 0.3s both" }}>
              Crafting clean, performant digital experiences. Passionate about building products that make a difference — one commit at a time.
            </p>

            <div className="hero-btns" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 36, animation: "fadeUp 0.6s ease 0.4s both" }}>
              <button className="cta-btn" onClick={() => scrollTo("Projects")} style={{ background: "#00f5a0", color: "#050a0e", fontWeight: 700 }}>View Projects →</button>
              <button className="cta-btn" onClick={() => scrollTo("Contact")} style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.15)" }}>Get in Touch</button>
            </div>

            <div className="hero-social" style={{ display: "flex", gap: 12, animation: "fadeUp 0.6s ease 0.5s both" }}>
              {[
                { href: SOCIAL.github, label: "GitHub", icon: "GH" },
                { href: SOCIAL.linkedin, label: "LinkedIn", icon: "in" },
                { href: SOCIAL.instagram, label: "Instagram", icon: "IG" },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="social-btn" title={s.label}
                  style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Avatar orb */}
          <div className="hero-avatar" style={{ flexShrink: 0, animation: "float 5s ease-in-out infinite" }}>
            <div style={{ position: "relative", width: 240, height: 240 }}>
              <div style={{ position: "absolute", inset: -18, borderRadius: "50%", border: "1px dashed rgba(0,245,160,0.3)", animation: "spin 20s linear infinite" }} />
              <div style={{ position: "absolute", inset: -34, borderRadius: "50%", border: "1px dashed rgba(0,180,216,0.15)", animation: "spin 35s linear infinite reverse" }} />
              <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "linear-gradient(135deg,rgba(0,245,160,0.12),rgba(0,180,216,0.12))", border: "2px solid rgba(0,245,160,0.3)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(10px)" }}>
                <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 80, color: "#00f5a0", lineHeight: 1 }}>R</span>
              </div>
              {/* Orbiting dots */}
              {[0, 120, 240].map((deg) => (
                <div key={deg} style={{ position: "absolute", top: "50%", left: "50%", width: 8, height: 8, marginTop: -4, marginLeft: -4, borderRadius: "50%", background: "#00f5a0", transformOrigin: "4px 130px", transform: `rotate(${deg}deg) translateX(0)`, animation: `spin ${6 + deg/60}s linear infinite` }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 5vw", background: "rgba(255,255,255,0.015)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "#00f5a0", letterSpacing: 3, marginBottom: 12 }}>01 / ABOUT</p>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, color: "#fff", marginBottom: 48, letterSpacing: -0.5 }}>Who I Am</h2>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }}>
            <div>
              <p style={{ color: "#888", lineHeight: 1.9, fontSize: 15, marginBottom: 20 }}>
                I'm <strong style={{ color: "#fff" }}>Rudra Kansara</strong> — a developer who loves the intersection of logic and aesthetics. I build digital products that are not just functional, but delightful to use.
              </p>
              <p style={{ color: "#888", lineHeight: 1.9, fontSize: 15, marginBottom: 28 }}>
                When I'm not coding, you'll find me exploring design systems, contributing to open source, or sharing moments on Instagram.
              </p>
              <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                {[["20+", "Projects"], ["2+", "Years Exp."], ["∞", "Coffee"]].map(([num, label]) => (
                  <div key={label}>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 36, fontWeight: 800, color: "#00f5a0", lineHeight: 1 }}>{num}</div>
                    <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "#555", letterSpacing: 1, marginTop: 4 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              {SKILLS.map((s, i) => <SkillBar key={s.name} {...s} delay={i * 100} />)}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "100px 5vw" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "#00f5a0", letterSpacing: 3, marginBottom: 12 }}>02 / PROJECTS</p>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, color: "#fff", marginBottom: 16, letterSpacing: -0.5 }}>What I've Built</h2>
          <p style={{ color: "#555", marginBottom: 48, fontSize: 15 }}>
            A selection of projects from my GitHub.{" "}
            <a href={SOCIAL.github} target="_blank" rel="noreferrer" style={{ color: "#00f5a0", textDecoration: "none" }}>See all →</a>
          </p>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {PROJECTS.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "100px 5vw", background: "rgba(255,255,255,0.015)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "#00f5a0", letterSpacing: 3, marginBottom: 12 }}>03 / SKILLS</p>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, color: "#fff", marginBottom: 48, letterSpacing: -0.5 }}>Tech Stack</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {["JavaScript","TypeScript","React","Next.js","Node.js","Python","Flask","MongoDB","PostgreSQL","Git","GitHub","CSS3","Tailwind","Figma","Linux","REST APIs"].map((tech, i) => (
              <span key={tech} className="tech-badge" style={{ animation: `fadeUp 0.5s ease ${i * 0.04}s both` }}>{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px 5vw" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "#00f5a0", letterSpacing: 3, marginBottom: 12 }}>04 / CONTACT</p>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, color: "#fff", marginBottom: 16, letterSpacing: -0.5 }}>Let's Connect</h2>
          <p style={{ color: "#666", marginBottom: 56, fontSize: 15, maxWidth: 500 }}>Open to opportunities, collaborations, or just a good conversation about tech. Reach out!</p>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { label: "GitHub", value: "RudraK29", href: SOCIAL.github, color: "#00f5a0" },
              { label: "LinkedIn", value: "Rudra Kansara", href: SOCIAL.linkedin, color: "#0a66c2" },
              { label: "Instagram", value: "@rudrakansara_2", href: SOCIAL.instagram, color: "#e1306c" },
              { label: "Location", value: "India 🇮🇳", href: null, color: "#ffd93d" },
            ].map((item) => (
              <div key={item.label} className="contact-card"
                onClick={() => item.href && window.open(item.href, "_blank")}
                style={{ cursor: item.href ? "pointer" : "default" }}
                onMouseEnter={(e) => { if (item.href) e.currentTarget.style.borderColor = item.color + "55"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: item.color + "18", border: `1px solid ${item.color}33`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: item.color, animation: "pulse 2s infinite" }} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "#444", letterSpacing: 1, marginBottom: 5 }}>{item.label}</div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, color: "#ddd" }}>{item.value}</div>
                </div>
                {item.href && <div style={{ marginLeft: "auto", color: "#333", fontSize: 18 }}>↗</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "32px 5vw", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, color: "#fff" }}>RK<span style={{ color: "#00f5a0" }}>.</span></span>
        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "#333", letterSpacing: 1 }}>© 2026 Rudra Kansara — Built with passion</span>
        <div style={{ display: "flex", gap: 10 }}>
          {[{ href: SOCIAL.github, t: "GH" }, { href: SOCIAL.linkedin, t: "in" }, { href: SOCIAL.instagram, t: "IG" }].map((s) => (
            <a key={s.t} href={s.href} target="_blank" rel="noreferrer" className="social-btn"
              style={{ width: 38, height: 38, fontSize: 11, fontFamily: "'Space Mono',monospace", fontWeight: 700, letterSpacing: 0.5 }}>
              {s.t}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
