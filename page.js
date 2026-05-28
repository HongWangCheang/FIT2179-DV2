const opt = { actions: false };

const charts = [
  { id: "bar_chart",               file: "chart 1 section1(bar).json" },
  { id: "map_chart",               file: "section1 chart2(Map).json" },
  { id: "waffle_chart",            file: "wafflechart.json" },
  { id: "bubble_1chart",           file: "scatterplot.json" },
  { id: "line_chart",              file: "section2chart1(dual_line).json" },
  { id: "radial_chart",            file: "secton2or3chart.json" },
  { id: "heatmap_chart",           file: "section3chart(heatmap).json" },
  { id: "fire_chart",              file: "sectionchart10.json" },
  { id: "wetland_map_chart",       file: "wetland.json" },
  { id: "bubble_chart",            file: "section3.json" },
  { id: "lollipop_chart",          file: "sectionchart9.json" },
  { id: "indexed_dual_line_chart", file: "chart12.json" },
  { id: "removed_list_chart",      file: "Removedlist.json" }
];

charts.forEach(({ id, file }) => {
  vegaEmbed("#" + id, file, opt)
    .catch(err => console.error('Failed to load "' + file + '":', err));
});

/* ── Reading progress bar ─────────────────────────────── */
const progressBar = document.getElementById("reading-progress");
if (progressBar) {
  const updateProgress = () => {
    const scrollTop  = document.documentElement.scrollTop;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + "%";
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
}

/* ── Scroll fade-up for chart cards ──────────────────── */
const fadeEls = document.querySelectorAll(".fade-up");
if (fadeEls.length && "IntersectionObserver" in window) {
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        fadeObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.07 });
  fadeEls.forEach(el => fadeObserver.observe(el));
} else {
  fadeEls.forEach(el => el.classList.add("visible"));
}

/* ── Back to top button ───────────────────────────────── */
const backToTop = document.getElementById("back-to-top");
if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 480);
  }, { passive: true });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ── Count-up animation for stats strip ──────────────── */
const statNums = document.querySelectorAll(".stat-num[data-target]");
if (statNums.length && "IntersectionObserver" in window) {
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = parseInt(el.dataset.target, 10);
      const dur    = 1400;
      const fps    = 60;
      const steps  = Math.round(dur / (1000 / fps));
      let   frame  = 0;
      el.textContent = "0";
      const timer = setInterval(() => {
        frame++;
        const progress = frame / steps;
        const eased    = 1 - Math.pow(1 - progress, 3); /* ease-out cubic */
        el.textContent = Math.floor(eased * target).toLocaleString();
        if (frame >= steps) {
          el.textContent = target.toLocaleString();
          clearInterval(timer);
        }
      }, 1000 / fps);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.6 });
  statNums.forEach(el => countObserver.observe(el));
}

/* ── Active nav link highlight on scroll ─────────────── */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".top-nav a");
if (sections.length && navLinks.length && "IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => a.classList.remove("active"));
        const link = document.querySelector('.top-nav a[href="#' + e.target.id + '"]');
        if (link) link.classList.add("active");
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach(s => navObserver.observe(s));
}
