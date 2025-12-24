// app.js
async function loadJson(path) {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return res.json();
}

function applyTheme(cfg) {
  const t = cfg.theme || {};
  const root = document.documentElement.style;
  if (t.bg) root.setProperty("--bg", t.bg);
  if (t.card) root.setProperty("--card", t.card);
  if (t.text) root.setProperty("--text", t.text);
  if (t.muted) root.setProperty("--muted", t.muted);
  if (t.border) root.setProperty("--border", t.border);
  if (t.accent) root.setProperty("--accent", t.accent);
  if (t.accent2) root.setProperty("--accent2", t.accent2);
  if (t.accent3) root.setProperty("--accent3", t.accent3);
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function setHref(id, href) {
  const el = document.getElementById(id);
  if (el) el.href = href;
}

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = v;
    else if (k === "html") node.innerHTML = v;
    else node.setAttribute(k, v);
  }
  for (const c of children) node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  return node;
}

function renderFeed(containerId, items, kind) {
  const box = document.getElementById(containerId);
  if (!box) return;
  box.innerHTML = "";

  items.forEach((it) => {
    const card = el("div", { class: "card" }, [
      el("div", {}, [
        el("span", { class: "pill" }, [
          el("span", { class: "dot" }, []),
          kind
        ])
      ]),
      el("h3", { class: "item-title", style: "margin-top:12px" }, [it.title]),
      el("p", { class: "item-meta" }, [it.meta || ""]),
      it.body ? el("p", { class: "muted", style: "margin:10px 0 0" }, [it.body]) : el("span", {}, []),
      el("div", { class: "item-actions" }, [
        it.url ? el("a", { class: "button small", href: it.url, target: "_blank", rel: "noopener" }, ["Details"]) : el("span", {}, []),
        it.secondaryUrl ? el("a", { class: "button small ghost", href: it.secondaryUrl, target: "_blank", rel: "noopener" }, ["More"]) : el("span", {}, [])
      ])
    ]);

    box.appendChild(card);
  });
}

function renderCalendar(cfg) {
  const wrap = document.getElementById("calendarEmbed");
  if (!wrap) return;

  if (!cfg.googleCalendarEmbedUrl) {
    wrap.innerHTML = `
      <div class="embed-placeholder">
        <p class="muted">
          Add your Google Calendar embed URL in <code>config.js</code> as <code>googleCalendarEmbedUrl</code>.
        </p>
      </div>`;
    return;
  }

  const src = cfg.googleCalendarEmbedUrl;
  wrap.innerHTML = `
    <iframe
      title="Swing Dance Vegas Calendar"
      src="${src}"
      style="border:0"
      width="100%"
      height="720"
      frameborder="0"
      scrolling="no"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>`;
}

async function init() {
  const cfg = window.SDV_CONFIG;
  applyTheme(cfg);

  setText("brandName", cfg.brandName);
  setText("tagline", cfg.tagline);
  setHref("ctaPrimary", cfg.primaryCtaUrl);
  setText("ctaPrimary", cfg.primaryCtaText);

  setHref("igLink", cfg.instagramUrl);
  setHref("fbLink", cfg.facebookUrl);

  // Weekly anchor
  const anchor = document.getElementById("weeklyAnchor");
  if (anchor && cfg.weeklyAnchor) {
    anchor.innerHTML = "";
    anchor.appendChild(el("div", { class: "pill" }, [el("span", { class: "dot" }, []), "Weekly"]));
    anchor.appendChild(el("h3", { style: "margin:12px 0 6px" }, [cfg.weeklyAnchor.title]));
    anchor.appendChild(el("p", { class: "muted", style: "margin:0 0 10px" }, [cfg.weeklyAnchor.lessonTime]));
    const locs = (cfg.weeklyAnchor.locations || []).map(l => `${l.note}: ${l.name}`).join(" • ");
    anchor.appendChild(el("p", { class: "muted", style: "margin:0 0 12px" }, [locs]));
    anchor.appendChild(el("a", { class: "button small", href: cfg.weeklyAnchor.detailsUrl }, ["See details"]));
  }

  // Data-driven pages
  try {
    const announcements = await loadJson("data/announcements.json");
    const events = await loadJson("data/events.json");
    const around = await loadJson("data/around.json");

    // Homepage previews
    renderFeed("announcementsPreview", announcements.slice(0, 3), "News");
    renderFeed("eventsPreview", events.slice(0, 3), "Event");

    // Full pages
    renderFeed("announcementsList", announcements, "News");
    renderFeed("eventsList", events, "Event");
    renderFeed("aroundList", around, "Around Vegas");
  } catch (e) {
    // non-fatal
    console.warn(e);
  }

  renderCalendar(cfg);

  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

init();
