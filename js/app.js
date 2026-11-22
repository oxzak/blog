// ====== CONFIGS ======
const CONFIG = {
  name: "Abdulrazak Othman",
  title: "Hi, I am Abdulrazak Othman and this is my website.",
  homePosts: 7,
  socials: [
    ["GitHub", "https://github.com/oxzak", "github"],
    ["Medium", "https://medium.com/@oxzak", "medium"],
    ["dev.to", "https://dev.to/oxzak", "devto"],
    ["LinkedIn", "https://www.linkedin.com/in/oxzak/", "linkedin"],
    ["Kaggle", "https://www.kaggle.com/iamabdulrazak", "kaggle"],
    ["Hugging Face", "https://huggingface.co/0xZak", "huggingface"],
  ],
};
// =======================

const P = d => `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${d}"/></svg>`;
const T = (t, size) => `<svg viewBox="0 0 24 24" aria-hidden="true"><text x="12" y="${size > 15 ? 18 : 16}" text-anchor="middle" font-family="Share Tech Mono, monospace" font-size="${size}" font-weight="700" fill="currentColor">${t}</text></svg>`;
const ICONS = {
  github: P("M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"),
  medium: P("M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"),
  linkedin: P("M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"),
  devto: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="3" width="20" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><text x="12" y="16" text-anchor="middle" font-family="Share Tech Mono, monospace" font-size="9" font-weight="700" fill="currentColor">DEV</text></svg>`,
  kaggle: T("k", 22),
  huggingface: T("🤗", 18),
};

const app = document.getElementById("app"), nav = document.getElementById("nav");
let posts = [];
let lastList = "";   // "" = home, "all" = writing page: where a post was opened from
const NAV = `<span>~/</span><span><a href="#all">Writing</a> · <a href="#">home</a></span>`;

document.querySelectorAll("[data-t]").forEach(a => a.onclick = e => {
  e.preventDefault();
  document.documentElement.dataset.theme = a.dataset.t;
  try { localStorage.setItem("theme", a.dataset.t); } catch (_) {}
});

const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

function parse(raw) {
  raw = raw.replace(/^\uFEFF/, "").replace(/^\s+/, ""); // strip BOM / leading blank lines
  const m = raw.match(/^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/);
  const meta = {};
  if (m) m[1].split(/\r?\n/).forEach(l => {
    const i = l.indexOf(":"); if (i < 0) return;
    meta[l.slice(0, i).trim().toLowerCase()] = l.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  });
  return { meta, body: m ? raw.slice(m[0].length) : raw };
}

// Obsidian syntax: ![[img.png]] -> image, [[Note]] -> plain text
const obsidian = md => md.split(/(```[\s\S]*?```|`[^`\n]*`)/g).map((part, i) => i % 2 ? part : part // leave code untouched
  .replace(/!\[\[([^\]|]+)(?:\|[^\]]*)?\]\]/g, (_, f) => `![${f}](posts/images/${encodeURI(f.trim())})`)
  .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, a, b) => b || a)).join("");

async function load() {
  const files = await (await fetch("posts/posts.json")).json();
  posts = (await Promise.all(files.map(async f => {
    try {
      const r = await fetch("posts/" + encodeURIComponent(f)); if (!r.ok) return null;
      const { meta, body } = parse(await r.text());
      const slug = f.replace(/\.md$/, "");
      return { slug, body, title: meta.title || slug.replace(/-/g, " "), date: (meta.date || "").slice(0, 10), desc: meta.description || "", tags: (meta.tags || "").replace(/[\[\]]/g, "").split(",").map(t => t.trim()).filter(Boolean), highlight: meta.highlight, medium: meta.medium, devto: meta.devto, canonical: meta.canonical };
    } catch (_) { return null; }
  }))).filter(Boolean).sort((a, b) => b.date.localeCompare(a.date));
}

const table = list => list.length ? `<table class="posts">${list.map(p => `<tr><td class="pd">${esc(p.date)}</td><td class="pt"><a href="#${encodeURIComponent(p.slug)}">${esc(p.title)}</a>${p.desc ? `<span class="s">— ${esc(p.desc)}</span>` : ""}</td></tr>`).join("")}</table>` : "<p>No posts yet.</p>";

function home() {
  document.title = CONFIG.name;
  nav.innerHTML = NAV;
  app.innerHTML = `
    <div class="kicker">${esc(CONFIG.name)}</div>
    <h1>${esc(CONFIG.title)}</h1>
    <div class="socials">${CONFIG.socials.map(([t, u, i]) => `<a class="ico" href="${esc(u)}" title="${esc(t)}" aria-label="${esc(t)}" target="_blank" rel="noopener">${ICONS[i] || esc(t)}</a>`).join("")}</div>
    <h2 class="sec">~/writing</h2>
    ${table(posts.slice(0, CONFIG.homePosts))}
    ${posts.length > CONFIG.homePosts ? `<a class="more" href="#all">[[ view all writing ]]</a>` : ""}`;
}

function all() {
  document.title = CONFIG.name;
  nav.innerHTML = NAV;
  app.innerHTML = `<h2 class="sec">~/writing</h2>${table(posts)}`;
}

function post(slug) {
  const p = posts.find(x => x.slug === slug);
  if (!p) return home();
  document.title = CONFIG.name;
  const fromAll = lastList === "all";
  nav.innerHTML = `<a href="#${lastList}">← ${fromAll ? "Writing" : "home"}</a><a href="#${fromAll ? "" : "all"}">${fromAll ? "home" : "Writing"}</a>`;
  const kicker = ["WRITING", ...p.tags].map(t => esc(t.toUpperCase())).join(" · ");
  // highlight: use `highlight:` from front matter (a word/phrase of the title), else the last word
  let title = esc(p.title);
  const hl = p.highlight ? esc(p.highlight) : esc(p.title.trim().split(/\s+/).pop());
  const i = p.highlight ? title.indexOf(hl) : title.lastIndexOf(hl);
  if (i >= 0) title = title.slice(0, i) + `<span class="hl">${hl}</span>` + title.slice(i + hl.length);
  const also = [["Medium", p.medium], ["dev.to", p.devto]].filter(x => x[1]).map(([n, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${n}</a>`).join(" · ");
  const body = p.body.replace(/^#\s+.*\n+/, ""); // drop duplicate H1
  app.innerHTML = `<article>
    <div class="pkicker">/* ${kicker} */</div>
    <h1 class="ptitle">${title}</h1>
    ${p.desc ? `<div class="sum">// ${esc(p.desc)}</div>` : ""}
    <div class="pdate">${esc(p.date)}${also ? ` · Also on ${also}` : ""}</div>
    <div class="prose">${marked.parse(obsidian(body))}</div>
  </article>`;
  window.scrollTo(0, 0);
}

function route() {
  const h = decodeURIComponent(location.hash.slice(1));
  if (!h) { lastList = ""; home(); } else if (h === "all") { lastList = "all"; all(); } else post(h);
  window.scrollTo(0, 0);
}

load().then(() => { addEventListener("hashchange", route); route(); })
  .catch(() => app.innerHTML = "<p>Couldn't load posts. Run a local server (see README) and check posts/posts.json.</p>");
