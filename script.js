// ---- Customize these ----
const COMMUNITY_JOIN_URL = "https://example.com"; // replace with your link (e.g. Linktree, FB group, Meetup, etc.)
const EVENTS = [
  {
    title: "Wednesday Social & Lesson",
    date: "Every Wednesday",
    time: "7:00 PM Lesson • 8:00 PM Social",
    location: "Your Venue Name, Las Vegas",
    tag: "Weekly Social",
    url: "https://example.com/event1"
  },
  {
    title: "Beginner Series (4-week)",
    date: "Starts Jan 7",
    time: "6:30 PM",
    location: "Your Studio Name",
    tag: "Classes",
    url: "https://example.com/event2"
  },
  {
    title: "Live Band Night",
    date: "Feb 15",
    time: "8:00 PM",
    location: "Your Venue Name",
    tag: "Special",
    url: "https://example.com/event3"
  }
];
// -------------------------

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === "class") node.className = v;
    else if (k === "html") node.innerHTML = v;
    else node.setAttribute(k, v);
  });
  for (const c of children) node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  return node;
}

function renderEvents() {
  const grid = document.getElementById("eventsGrid");
  grid.innerHTML = "";

  EVENTS.forEach((ev) => {
    const card = el("div", { class: "card event-card" }, [
      el("div", { class: "row" }, [
        el("h3", {}, [ev.title]),
        el("span", { class: "pill" }, [ev.tag || "Event"])
      ]),
      el("div", { class: "meta" }, [`${ev.date} • ${ev.time}`, document.createElement("br"), ev.location]),
      el("div", { class: "actions" }, [
        el("a", { class: "button small", href: ev.url, target: "_blank", rel: "noopener" }, ["Details"]),
        el("a", { class: "button small ghost", href: "#contact" }, ["Ask a question"])
      ])
    ]);

    grid.appendChild(card);
  });

  // Next up card
  const next = EVENTS[0];
  const nextBox = document.getElementById("nextEvent");
  nextBox.innerHTML = "";
  nextBox.appendChild(el("div", { class: "title" }, [next.title]));
  nextBox.appendChild(el("div", { class: "meta" }, [`${next.date} • ${next.time}`]));
  nextBox.appendChild(el("div", { class: "meta" }, [next.location]));
  nextBox.appendChild(el("a", { class: "button small", href: next.url, target: "_blank", rel: "noopener" }, ["View details"]));
}

function init() {
  document.getElementById("year").textContent = new Date().getFullYear();
  const cta = document.getElementById("primaryCta");
  cta.href = COMMUNITY_JOIN_URL;
  renderEvents();
}

init();
