(function () {
  // [label, href, subItems?] — subItems render as a desktop dropdown only;
  // the mobile menu ignores them and keeps top-level links.
  const navItems = [
    ["Product", "product.html", [
      ["ISN", "product.html#product"],
      ["Settlement Flows", "product.html#flows"],
      ["Tech & IP", "product.html#tech"]
    ]],
    ["Use Cases", "usecases.html", [
      ["Cross-border Payout", "usecases.html#payout"],
      ["On / Off Ramp", "usecases.html#ramp"],
      ["Liquidity Supply", "usecases.html#liquidity"]
    ]],
    ["Developers", "developers.html"],
    ["Onboarding", "onboarding.html"],
    ["Company", "company.html", [
      ["About Us", "company.html#about"],
      ["PR / News", "company.html#news"],
      ["Events", "company.html#events"]
    ]]
  ];

  let currentView = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const normalizePage = href => {
    const url = new URL(href, location.href);
    return (url.pathname.split("/").pop() || "index.html").toLowerCase();
  };
  const activeClass = href => currentView === normalizePage(href) ? ' class="active"' : "";
  const GA_MEASUREMENT_ID = "G-5Y067726SX";
  const compactAddress = () => {
    if (currentView === "404.html") return;
    if (!location.pathname.endsWith(".html")) return;
    history.replaceState(history.state, document.title, `./${location.search}${location.hash}`);
  };
  compactAddress();

  const topMount = document.getElementById("site-chrome-top");
  if (topMount) {
    topMount.innerHTML = `
      <div class="side-rail" aria-label="Quick menu">
        <a href="developers.html">API Docs</a>
        <a class="primary" href="mailto:ops@aracore.io">Talk to us</a>
      </div>
      <nav class="nav">
        <div class="container nav-inner">
          <a class="brand" href="index.html">
            <img class="brand-symbol" src="brand/aracore-sideway-default.svg" alt="Aracore" />
          </a>
          <div class="nav-links">
            ${navItems.map(([label, href, subItems]) => {
              const caret = subItems ? '<svg class="nav-caret" width="9" height="6" viewBox="0 0 9 6" aria-hidden="true"><path d="M1 1l3.5 3.5L8 1" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' : "";
              const topLink = `<a${activeClass(href)} href="${href}">${label}${caret}</a>`;
              if (!subItems) return topLink;
              return `<div class="nav-item">${topLink}<div class="nav-sub">${subItems.map(([subLabel, subHref]) => `<a href="${subHref}">${subLabel}</a>`).join("")}</div></div>`;
            }).join("")}
          </div>
          <div class="nav-cta">
            <a class="btn" href="developers.html">API Docs</a>
            <a class="btn primary" href="index.html#contact">Talk to us</a>
          </div>
          <button class="nav-toggle" type="button" aria-label="Menu" aria-expanded="false" aria-controls="mobile-menu">
            <span></span><span></span><span></span>
          </button>
        </div>
        <div class="mobile-menu" id="mobile-menu" hidden>
          <div class="container mobile-menu-inner">
            ${navItems.map(([label, href]) => `<a class="mobile-link${currentView === normalizePage(href) ? ' active' : ''}" href="${href}">${label}</a>`).join("")}
            <div class="mobile-menu-cta">
              <a class="btn" href="developers.html">API Docs</a>
              <a class="btn primary" href="index.html#contact">Talk to us</a>
            </div>
          </div>
        </div>
      </nav>`;
  }

  const footerMount = document.getElementById("site-chrome-footer");
  if (footerMount) {
    footerMount.innerHTML = `
      <footer class="footer">
        <div class="container footer-grid">
          <div>
            <img class="footer-lockup" src="brand/aracore-tagline-lockup-darkmode.svg" alt="Aracore - Settlement Infrastructure for Digital Dollars" />
            <p style="line-height:1.6">Institutional Settlement Network for cross-border payout and settlement orchestration.</p>
            <a href="mailto:ops@aracore.io">ops@aracore.io</a>
          </div>
          <div>
            <b>Product</b>
            <a href="product.html">ISN</a>
            <a href="product.html#flows">Settlement Flow</a>
            <a href="product.html#tech">Tech &amp; IP</a>
          </div>
          <div>
            <b>Developers</b>
            <a href="developers.html">API Docs</a>
            <a href="onboarding.html">Onboarding</a>
          </div>
          <div>
            <b>Use Cases</b>
            <a href="usecases.html#payout">Remittance</a>
            <a href="usecases.html#liquidity">Liquidity</a>
            <a href="usecases.html#ramp">On / Off Ramp</a>
          </div>
          <div>
            <b>Company</b>
            <a href="company.html">About</a>
            <a href="company.html">Partners</a>
            <a href="index.html#contact">Contact</a>
          </div>
        </div>
      </footer>`;
  }

  // Settlement Flow animation. The SVG in index.html is self-describing:
  // steps come from data-step (1..N, N auto-detected), colors from data-tone
  // ("blue" | "cyan" | "deep") mapped to --flow-* CSS vars in styles.css.
  const FLOW_STEP_MS = 900;
  const FLOW_HOLD_MS = 3000;
  let flowAnimationTimer = 0;
  let flowAnimationTimeouts = [];

  function startFlowAnimation() {
    clearInterval(flowAnimationTimer);
    flowAnimationTimeouts.forEach(clearTimeout);
    flowAnimationTimeouts = [];
    const steps = [...document.querySelectorAll(".demo-screen [data-step]")];
    if (!steps.length) return;
    const maxStep = Math.max(...steps.map(el => Number(el.dataset.step) || 0));
    const runAnimation = () => {
      steps.forEach(el => el.classList.remove("active"));
      for (let i = 1; i <= maxStep; i++) {
        flowAnimationTimeouts.push(setTimeout(() => {
          document.querySelectorAll(`.demo-screen [data-step="${i}"]`).forEach(el => el.classList.add("active"));
        }, FLOW_STEP_MS * (i - 1)));
      }
    };
    runAnimation();
    flowAnimationTimer = setInterval(runAnimation, FLOW_STEP_MS * maxStep + FLOW_HOLD_MS);
  }

  function updateActiveNav(page) {
    currentView = page;
    document.querySelectorAll(".nav-links a, .mobile-link").forEach(link => {
      if (link.closest(".nav-sub")) return;
      link.classList.toggle("active", normalizePage(link.getAttribute("href")) === currentView);
    });
  }

  const navToggle = document.querySelector(".nav-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  function setMenuOpen(open) {
    if (!navToggle || !mobileMenu) return;
    navToggle.setAttribute("aria-expanded", String(open));
    mobileMenu.hidden = !open;
    document.body.classList.toggle("menu-open", open);
  }
  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", () => {
      setMenuOpen(navToggle.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") setMenuOpen(false);
    });
  }

  // Back-to-top button: part of the shared chrome, appended to <body> so it
  // survives soft navigation. Shown only after meaningful scrolling, so pages
  // that fit in (or nearly fit in) one viewport never surface it.
  const toTop = document.createElement("button");
  toTop.className = "to-top";
  toTop.type = "button";
  toTop.setAttribute("aria-label", "Back to top");
  toTop.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 10l5-5 5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  toTop.addEventListener("click", () => {
    scrollTo({ top: 0, behavior: "smooth" });
    toTop.blur();
  });
  document.body.appendChild(toTop);
  const updateToTop = () => {
    toTop.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.6);
  };
  window.addEventListener("scroll", updateToTop, { passive: true });
  updateToTop();

  function scrollToHash(hash) {
    if (!hash) {
      scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = document.querySelector(hash);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function trackPageView(url, title) {
    if (!ensureGtag()) return;
    const page = normalizePage(url.href);
    const pagePath = page === "index.html" ? "/" : url.pathname;
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_title: title,
      page_path: `${pagePath}${url.hash || ""}`
    });
  }

  function ensureGtag() {
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag !== "function") {
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
    }
    return typeof window.gtag === "function";
  }

  function trackEvent(name, params = {}) {
    if (!ensureGtag()) return;
    window.gtag("event", name, {
      transport_type: "beacon",
      ...params
    });
  }

  function trackLinkIntent(link, href) {
    if (!href) return;
    const label = link.textContent.trim();
    if (href.startsWith("mailto:")) {
      trackEvent("contact_click", {
        link_text: label,
        contact_method: "email",
        link_url: href
      });
      return;
    }
    const page = normalizePage(href);
    if (page === "developers.html" && /api docs|view api docs/i.test(label)) {
      trackEvent("api_docs_click", {
        link_text: label,
        link_url: href
      });
      return;
    }
    if (/talk to us|contact/i.test(label)) {
      trackEvent("contact_click", {
        link_text: label,
        contact_method: "site_cta",
        link_url: href
      });
    }
  }

  async function loadPageInPlace(href) {
    const url = new URL(href, location.href);
    const page = normalizePage(url.href);
    const main = document.querySelector("main");
    if (!main) return false;
    document.body.classList.add("is-loading-page");
    try {
      const response = await fetch(url.pathname, { cache: "no-cache" });
      if (!response.ok) throw new Error(`Page load failed: ${response.status}`);
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      const nextMain = doc.querySelector("main");
      if (!nextMain) return false;
      main.replaceWith(nextMain);
      document.title = doc.title || document.title;
      updateActiveNav(page);
      startFlowAnimation();
      trackPageView(url, document.title);
      requestAnimationFrame(() => scrollToHash(url.hash));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      document.body.classList.remove("is-loading-page");
    }
  }

  function showComingSoon() {
    const existing = document.getElementById("coming-soon-toast");
    if (existing) existing.dismiss();

    const toast = document.createElement("div");
    toast.id = "coming-soon-toast";
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.textContent = "API reference is coming soon — thank you for your patience.";
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("is-visible"));

    let done = false;
    toast.dismiss = () => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      document.removeEventListener("click", onClick, true);
      toast.classList.remove("is-visible");
      toast.addEventListener("transitionend", () => toast.remove(), { once: true });
    };
    const onClick = () => toast.dismiss();
    const timer = setTimeout(() => toast.dismiss(), 1000);
    // Register after the current click finishes so it isn't dismissed immediately.
    setTimeout(() => document.addEventListener("click", onClick, true), 0);
  }

  document.addEventListener("click", event => {
    const link = event.target.closest("a[href]");
    if (!link) return;
    const href = link.getAttribute("href");
    if (link.hasAttribute("data-coming-soon")) {
      event.preventDefault();
      showComingSoon();
      return;
    }
    trackLinkIntent(link, href);
    if (link.closest(".mobile-menu")) setMenuOpen(false);
    if (!href || href.startsWith("mailto:") || href.startsWith("tel:") || link.target) return;
    const url = new URL(href, location.href);
    if (url.origin !== location.origin) return;
    const page = normalizePage(url.href);
    if (!page.endsWith(".html")) return;
    event.preventDefault();
    const sub = link.closest(".nav-sub");
    if (sub) {
      // The dropdown is shown via :hover/:focus-within — hide it until the
      // pointer leaves the nav item, otherwise it lingers after navigation.
      link.blur();
      sub.style.display = "none";
      sub.closest(".nav-item").addEventListener("mouseleave", () => {
        sub.style.display = "";
      }, { once: true });
    }
    if (page === currentView && url.hash) {
      scrollToHash(url.hash);
      return;
    }
    loadPageInPlace(url.href).then(loaded => {
      if (!loaded) location.href = href;
    });
  });

  startFlowAnimation();
})();
