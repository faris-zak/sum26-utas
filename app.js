(() => {
  "use strict";

  const data = window.STUDENT_GUIDE_DATA;
  const engine = window.STUDENT_GUIDE_ENGINE;
  const page = document.body.dataset.page || "home";
  const storageKeys = {
    locale: "smart-guide-locale",
    reminders: "smart-guide-reminders",
    university: "smart-guide-university"
  };

  const state = {
    locale: localStorage.getItem(storageKeys.locale) === "en" ? "en" : "ar",
    currentScenarioId: new URLSearchParams(location.search).get("scenario") || data.scenarios[0].id,
    currentUniversityId: localStorage.getItem(storageKeys.university) || (data.universities?.[0]?.id ?? ""),
    customQuery: "",
    fallback: false,
    deferredInstallPrompt: null,
    lastFocusedElement: null
  };

  if (!data.scenarios.some((scenario) => scenario.id === state.currentScenarioId)) {
    state.currentScenarioId = data.scenarios[0].id;
  }

  const l = (value) => {
    if (value && typeof value === "object" && "ar" in value && "en" in value) {
      return value[state.locale];
    }
    return value ?? "";
  };

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const icon = (name) => `<i data-lucide="${name}" aria-hidden="true"></i>`;

  const pageFile = {
    home: "index.html",
    demo: "demo.html",
    technology: "technology.html",
    impact: "impact.html"
  };

  const pageTitles = {
    ar: {
      home: "دليل الطالب الذكي | تحدي الصيف 2026",
      demo: "تجربة المساعد | دليل الطالب الذكي",
      technology: "التقنية | دليل الطالب الذكي",
      impact: "الأثر | دليل الطالب الذكي"
    },
    en: {
      home: "Smart Student Guide | Summer Challenge 2026",
      demo: "Assistant Demo | Smart Student Guide",
      technology: "Technology | Smart Student Guide",
      impact: "Impact | Smart Student Guide"
    }
  };

  function navLink(key, mobile = false) {
    const active = page === key ? ' aria-current="page"' : "";
    const className = mobile ? "nav-link mobile-nav-link" : "nav-link";
    return `<a class="${className}" href="${pageFile[key]}"${active}>${l(data.nav[key])}</a>`;
  }

  function renderShell() {
    document.documentElement.lang = state.locale;
    document.documentElement.dir = state.locale === "ar" ? "rtl" : "ltr";
    document.title = pageTitles[state.locale][page];

    const shell = document.getElementById("site-shell");
    shell.innerHTML = `
      <a class="skip-link" href="#main-content">${l(data.common.skip)}</a>
      <header class="site-header">
        <div class="container header-inner">
          <a class="brand" href="index.html" aria-label="${escapeHtml(l(data.brand.product))}">
            <span class="brand-mark">${icon("graduation-cap")}</span>
            <span class="brand-copy">
              <strong>${l(data.brand.product)}</strong>
              <small>${l(data.brand.event)}</small>
            </span>
          </a>
          <nav class="desktop-nav" aria-label="${state.locale === "ar" ? "التنقل الرئيسي" : "Primary navigation"}">
            ${navLink("home")}
            ${navLink("demo")}
            ${navLink("technology")}
            ${navLink("impact")}
          </nav>
          <div class="header-actions">
            <button class="install-button" id="installButton" type="button" hidden>${icon("download")} ${l(data.common.install)}</button>
            <button class="language-button" id="languageButton" type="button" aria-label="${state.locale === "ar" ? "Switch to English" : "التبديل إلى العربية"}">${l(data.common.language)}</button>
            <button class="icon-button" id="menuButton" type="button" aria-expanded="false" aria-controls="mobileNav" aria-label="${l(data.common.menu)}">${icon("menu")}</button>
          </div>
        </div>
      </header>
      <nav class="mobile-nav" id="mobileNav" aria-label="${state.locale === "ar" ? "تنقل الهاتف" : "Mobile navigation"}">
        ${navLink("home", true)}
        ${navLink("demo", true)}
        ${navLink("technology", true)}
        ${navLink("impact", true)}
      </nav>
      <div class="status-strip">
        <div class="container status-inner">
          <span class="demo-mode">${l(data.brand.demoLabel)}</span>
          <span class="network-state" id="networkState" aria-live="polite"></span>
        </div>
      </div>
      ${renderPage()}
      ${renderFooter()}
      <div id="modalRoot"></div>
      <div class="toast-region" id="toastRegion" aria-live="polite" aria-atomic="true"></div>
    `;

    bindGlobalEvents();
    bindPageEvents();
    refreshIcons();
    updateNetworkState();
    setupInstallButton();
  }

  function renderPage() {
    if (page === "demo") return renderDemoPage();
    if (page === "technology") return renderTechnologyPage();
    if (page === "impact") return renderImpactPage();
    return renderHomePage();
  }

  function renderFooter() {
    return `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div class="footer-brand">
            <strong>${l(data.brand.product)}</strong>
            <p>${l(data.brand.demoNotice)}</p>
          </div>
          <nav class="footer-links" aria-label="${state.locale === "ar" ? "روابط التذييل" : "Footer navigation"}">
            ${navLink("home")}
            ${navLink("demo")}
            ${navLink("technology")}
            ${navLink("impact")}
          </nav>
        </div>
        <div class="container footer-bottom">
          <span>${l(data.brand.organization)} · ${l(data.brand.event)}</span>
          <span>${state.locale === "ar" ? "جميع المحتويات المؤسسية تجريبية وخيالية." : "All institutional content is fictional demo material."}</span>
        </div>
      </footer>
    `;
  }

  function renderHomePage() {
    return `
      <main id="main-content" tabindex="-1">
        <section class="hero">
          <div class="container hero-grid">
            <div class="hero-copy">
              <p class="eyebrow">${l(data.home.eyebrow)}</p>
              <h1>${l(data.home.title)}</h1>
              <p class="lead">${l(data.home.intro)}</p>
              <div class="button-row">
                <a class="button button-primary" href="demo.html">${l(data.common.openDemo)} ${icon(state.locale === "ar" ? "arrow-left" : "arrow-right")}</a>
                <a class="button button-secondary" href="technology.html">${l(data.common.learnTechnology)}</a>
              </div>
              <p class="trust-line">${icon("shield-check")} ${l(data.home.trustLine)}</p>
            </div>
            <div class="hero-visual">
              <img src="assets/images/student-journey.webp" width="1536" height="1024" alt="${state.locale === "ar" ? "تصور أصلي لطالب يسير عبر محطات رحلته الأكاديمية" : "Original visualization of a student moving through an academic journey"}">
              <div class="hero-note">${l(data.brand.demoNotice)}</div>
            </div>
          </div>
        </section>

        <section class="section section-white" aria-labelledby="scenarios-title">
          <div class="container">
            <div class="section-heading">
              <p class="eyebrow">${l(data.brand.demoLabel)}</p>
              <h2 id="scenarios-title">${l(data.home.scenariosTitle)}</h2>
              <p class="lead">${l(data.home.scenariosIntro)}</p>
            </div>
            <div class="scenario-grid">
              ${data.scenarios.map((scenario, index) => `
                <a class="scenario-card" href="demo.html?scenario=${scenario.id}">
                  <span class="icon-disc${index % 2 ? " orange" : ""}">${icon(scenario.icon)}</span>
                  <h3>${l(scenario.title)}</h3>
                  <p>${l(scenario.summary)}</p>
                  <span class="card-arrow">${l(data.common.readMore)} ${icon("arrow-left")}</span>
                </a>
              `).join("")}
            </div>
          </div>
        </section>

        ${renderUniversitySection()}

        <section class="section section-dark" aria-labelledby="journey-title">
          <div class="container">
            <div class="section-heading">
              <p class="eyebrow">${state.locale === "ar" ? "رحلة العمل" : "The flow"}</p>
              <h2 id="journey-title">${l(data.home.journeyTitle)}</h2>
            </div>
            <div class="journey-list">
              ${data.home.journey.map((item) => `
                <article class="journey-item">
                  <span class="journey-number">${icon(item.icon)}</span>
                  <h3>${l(item.title)}</h3>
                  <p>${l(item.text)}</p>
                </article>
              `).join("")}
            </div>
          </div>
        </section>

        <section class="section section-white" aria-labelledby="qr-title">
          <div class="container qr-layout">
            <div>
              <p class="eyebrow">${l(data.brand.event)}</p>
              <h2 id="qr-title">${l(data.home.qrTitle)}</h2>
              <p class="lead">${l(data.home.qrText)}</p>
              <p class="qr-hint">${l(data.home.qrHint)}</p>
            </div>
            <div class="qr-frame" id="eventQr" aria-label="${state.locale === "ar" ? "رمز QR لفتح تجربة المساعد" : "QR code to open the assistant demo"}"></div>
          </div>
        </section>

        <section class="section" aria-labelledby="faq-title">
          <div class="container">
            <div class="section-heading centered">
              <p class="eyebrow">FAQ</p>
              <h2 id="faq-title">${l(data.home.faqTitle)}</h2>
            </div>
            <div class="faq-list">
              ${data.faq.map((item, index) => `
                <article class="faq-item">
                  <h3>
                    <button class="faq-button" type="button" aria-expanded="false" aria-controls="faq-answer-${index}">
                      <span>${l(item.q)}</span>${icon("plus")}
                    </button>
                  </h3>
                  <div class="faq-answer" id="faq-answer-${index}" hidden>${l(item.a)}</div>
                </article>
              `).join("")}
            </div>
          </div>
        </section>
      </main>
    `;
  }

  function renderUniversitySection() {
    const selectedUniversity = currentUniversity();
    return `
      <section class="section section-white" aria-labelledby="universities-title" id="universitySection">
        <div class="container">
          <div class="section-heading">
            <p class="eyebrow">${l(data.brand.demoLabel)}</p>
            <h2 id="universities-title">${l(data.home.universitiesTitle)}</h2>
            <p class="lead">${l(data.home.universitiesIntro)}</p>
          </div>
          <div class="university-logos">
            ${data.universities.map((uni) => `
              <button class="university-logo-button${uni.id === selectedUniversity.id ? " active" : ""}" type="button" data-university="${escapeHtml(uni.id)}" aria-pressed="${uni.id === selectedUniversity.id}">
                <img src="${escapeHtml(uni.image)}" width="120" height="80" alt="${escapeHtml(l(uni.short))}">
                <span>${escapeHtml(l(uni.short))}</span>
              </button>
            `).join("")}
          </div>
          <div class="university-grid">
            ${data.universities.map((uni) => `
              <button class="university-card${uni.id === selectedUniversity.id ? " active" : ""}" type="button" data-university="${escapeHtml(uni.id)}" aria-pressed="${uni.id === selectedUniversity.id}">
                <div class="university-copy">
                  <strong>${l(uni.name)}</strong>
                  <p>${l(uni.description)}</p>
                </div>
              </button>
            `).join("")}
          </div>
          <div class="university-details">
            <div class="university-details-header">
              <img class="university-detail-logo" src="${escapeHtml(selectedUniversity.image)}" width="72" height="48" alt="${escapeHtml(l(selectedUniversity.short))}">
              <div>
                <span class="eyebrow">${l(data.demoPage.universityLabel)}</span>
                <strong>${l(selectedUniversity.name)}</strong>
              </div>
            </div>
            <ul class="rule-list">
              ${selectedUniversity.rules.map((rule) => `<li>${l(rule)}</li>`).join("")}
            </ul>
            <p class="qr-hint">${l(data.home.universitiesPrompt)}</p>
          </div>
        </div>
      </section>
    `;
  }

  function bindUniversityEvents() {
    document.querySelectorAll("[data-university]").forEach((button) => {
      button.addEventListener("click", () => {
        const selected = button.dataset.university;
        if (!selected || selected === state.currentUniversityId) return;
        state.currentUniversityId = selected;
        localStorage.setItem(storageKeys.university, selected);
        updateUniversitySection();
      });
    });
  }

  function updateUniversitySection() {
    const section = document.getElementById("universitySection");
    if (!section) return;
    section.outerHTML = renderUniversitySection();
    bindUniversityEvents();
    refreshIcons();
  }

  function renderDemoPage() {
    return `
      <main id="main-content" tabindex="-1">
        <section class="page-hero">
          <div class="container section-heading">
            <p class="eyebrow">${l(data.demoPage.eyebrow)}</p>
            <h1>${l(data.demoPage.title)}</h1>
            <p class="lead">${l(data.demoPage.intro)}</p>
          </div>
        </section>
        <section class="section compact">
          <div class="container" id="demo-workspace">${renderDemoWorkspace()}</div>
        </section>
      </main>
    `;
  }

  function currentScenario() {
    return data.scenarios.find((scenario) => scenario.id === state.currentScenarioId) || data.scenarios[0];
  }

  function currentUniversity() {
    return data.universities.find((uni) => uni.id === state.currentUniversityId) || data.universities[0];
  }

  function currentSources() {
    if (state.fallback) return [];
    const scenario = currentScenario();
    return scenario.citationIds.map((id) => data.knowledge.find((article) => article.id === id)).filter(Boolean);
  }

  function renderDemoWorkspace() {
    const scenario = currentScenario();
    const sources = currentSources();
    const userMessage = state.customQuery || l(scenario.prompt);
    const reminders = loadReminders();
    return `
      <div class="demo-layout">
        <aside class="demo-panel scenario-picker" aria-labelledby="scenario-picker-label">
          <span class="panel-label" id="scenario-picker-label">${l(data.demoPage.choose)}</span>
          <div class="scenario-picker-list">
            ${data.scenarios.map((item) => `
              <button class="scenario-option${item.id === scenario.id && !state.fallback ? " active" : ""}" type="button" data-scenario="${item.id}" aria-pressed="${item.id === scenario.id && !state.fallback}">
                ${icon(item.icon)}<span>${l(item.title)}</span>
              </button>
            `).join("")}
          </div>
        </aside>

        <section class="demo-panel chat-panel" aria-label="${l(data.demoPage.assistantName)}">
          <header class="chat-header">
            <div class="assistant-identity">
              <span class="assistant-avatar">${icon("bot")}</span>
              <span><strong>${l(data.demoPage.assistantName)}</strong><small>${l(data.demoPage.assistantStatus)}</small></span>
            </div>
            <button class="reset-button" id="resetDemo" type="button" title="${l(data.demoPage.reset)}">${icon("rotate-ccw")}<span>${l(data.demoPage.reset)}</span></button>
          </header>
          <div class="messages" id="messages" aria-live="polite">
            <div class="message message-user">${escapeHtml(userMessage)}</div>
            <div class="message message-assistant">
              ${state.fallback ? `<p>${l(data.demoPage.fallback)}</p>` : `
                <p>${l(scenario.answer)}</p>
                <ol class="assistant-steps">
                  ${scenario.steps[state.locale].map((step) => `<li>${step}</li>`).join("")}
                </ol>
                <div class="message-actions">
                  <button class="button button-light" type="button" data-action="form">${icon("file-text")} ${l(data.demoPage.previewForm)}</button>
                  <button class="button button-primary" type="button" data-action="reminder">${icon("bell-plus")} ${l(data.demoPage.createReminder)}</button>
                </div>
              `}
            </div>
          </div>
          <form class="chat-composer" id="chatForm">
            <label class="panel-label" for="chatInput">${l(data.demoPage.inputLabel)}</label>
            <div class="composer-row">
              <input id="chatInput" name="question" autocomplete="off" placeholder="${escapeHtml(l(data.demoPage.inputPlaceholder))}">
              <button class="button button-primary" type="submit">${icon("send")}<span>${l(data.demoPage.send)}</span></button>
            </div>
            <p class="composer-hint">${l(data.demoPage.hint)}</p>
          </form>
        </section>

        <aside class="demo-panel source-panel" aria-labelledby="source-panel-label">
          <span class="panel-label" id="source-panel-label">${l(data.demoPage.sources)}</span>
          <div class="source-list">
            ${sources.length ? sources.map((source, index) => `
              <button class="source-button" type="button" data-source="${source.id}">
                <small>${index + 1} · ${l(source.category)}</small>
                <strong>${l(source.title)}</strong>
                <time datetime="${source.updated}">${source.updated}</time>
              </button>
            `).join("") : `<p class="qr-hint">${l(data.demoPage.fallback)}</p>`}
          </div>
          <div class="source-divider"></div>
          <span class="panel-label">${l(data.demoPage.remindersTitle)}</span>
          <div class="reminder-list" id="reminderList">
            ${reminders.length ? reminders.map(renderReminderItem).join("") : `<p class="qr-hint">${l(data.demoPage.noReminders)}</p>`}
          </div>
        </aside>
      </div>
    `;
  }

  function renderReminderItem(reminder) {
    const scenario = data.scenarios.find((item) => item.id === reminder.scenarioId);
    const title = scenario ? l(scenario.reminder) : reminder.title;
    return `
      <div class="reminder-item">
        <span><strong>${escapeHtml(title)}</strong><time datetime="${escapeHtml(reminder.date)}">${formatDate(reminder.date)}</time></span>
        <button class="delete-reminder" type="button" data-delete-reminder="${escapeHtml(reminder.id)}" aria-label="${l(data.demoPage.deleteReminder)}">${icon("trash-2")}</button>
      </div>
    `;
  }

  function renderTechnologyPage() {
    return `
      <main id="main-content" tabindex="-1">
        <section class="page-hero">
          <div class="container section-heading">
            <p class="eyebrow">${l(data.technology.eyebrow)}</p>
            <h1>${l(data.technology.title)}</h1>
            <p class="lead">${l(data.technology.intro)}</p>
          </div>
        </section>
        <section class="section section-white" aria-labelledby="flow-title">
          <div class="container tech-visual-layout">
            <div class="tech-visual">
              <img src="assets/images/contextual-rag.webp" width="1536" height="1024" alt="${state.locale === "ar" ? "تصور أصلي لتدفق المعرفة والسياق والإجابة الموثقة" : "Original visualization of knowledge, context, and a cited answer"}">
            </div>
            <div>
              <div class="section-heading">
                <p class="eyebrow">RAG</p>
                <h2 id="flow-title">${l(data.technology.flowTitle)}</h2>
              </div>
              <div class="flow-list">
                ${data.technology.flow.map((item) => `
                  <article class="flow-row">
                    <span class="icon-disc orange">${icon(item.icon)}</span>
                    <div><h3>${l(item.title)}</h3><p>${l(item.text)}</p></div>
                  </article>
                `).join("")}
              </div>
            </div>
          </div>
        </section>
        <section class="section section-dark" aria-labelledby="architecture-title">
          <div class="container">
            <div class="section-heading">
              <p class="eyebrow">${state.locale === "ar" ? "التقنية" : "Technology"}</p>
              <h2 id="architecture-title">${l(data.technology.architectureTitle)}</h2>
            </div>
            <div class="architecture-grid">
              ${data.technology.architecture.map((item) => `
                <article class="architecture-card"><span class="icon-disc">${icon(item.icon)}</span><h3>${l(item.title)}</h3><p>${l(item.text)}</p></article>
              `).join("")}
            </div>
          </div>
        </section>
        <section class="section" aria-labelledby="privacy-title">
          <div class="container">
            <div class="section-heading"><p class="eyebrow">${icon("lock-keyhole")} Privacy</p><h2 id="privacy-title">${l(data.technology.privacyTitle)}</h2></div>
            <div class="privacy-grid">
              ${data.technology.privacy.map((item) => `
                <article class="privacy-item"><span class="icon-disc orange">${icon(item.icon)}</span><h3>${l(item.title)}</h3><p>${l(item.text)}</p></article>
              `).join("")}
            </div>
          </div>
        </section>
      </main>
    `;
  }

  function renderImpactPage() {
    return `
      <main id="main-content" tabindex="-1">
        <section class="page-hero">
          <div class="container section-heading">
            <p class="eyebrow">${l(data.impact.eyebrow)}</p>
            <h1>${l(data.impact.title)}</h1>
            <p class="lead">${l(data.impact.intro)}</p>
          </div>
        </section>
        <section class="section section-white" aria-labelledby="metrics-title">
          <div class="container">
            <div class="section-heading"><p class="eyebrow">${l(data.common.projected)}</p><h2 id="metrics-title">${l(data.impact.metricsTitle)}</h2></div>
            <div class="metric-grid">
              ${data.metrics.map((metric) => `
                <article class="metric-card">
                  <span class="icon-disc">${icon(metric.icon)}</span>
                  <span class="metric-value">${metric.value}</span>
                  <span class="metric-status">${l(data.common.projected)}</span>
                  <h3>${l(metric.label)}</h3>
                  <p>${l(metric.note)}</p>
                </article>
              `).join("")}
            </div>
          </div>
        </section>
        <section class="section section-dark" aria-labelledby="roadmap-title">
          <div class="container">
            <div class="section-heading"><p class="eyebrow">2026+</p><h2 id="roadmap-title">${l(data.impact.roadmapTitle)}</h2></div>
            <div class="roadmap">
              ${data.roadmap.map((item) => `
                <article class="roadmap-item"><span class="roadmap-dot"></span><span class="roadmap-phase">${l(item.phase)}</span><h3>${l(item.title)}</h3><p>${l(item.text)}</p></article>
              `).join("")}
            </div>
          </div>
        </section>
        <section class="section" aria-labelledby="team-title">
          <div class="container">
            <div class="section-heading"><p class="eyebrow">${state.locale === "ar" ? "القدرات" : "Capabilities"}</p><h2 id="team-title">${l(data.impact.teamTitle)}</h2></div>
            <div class="team-grid">
              ${data.team.map((item) => `
                <article class="team-item"><span class="icon-disc orange">${icon(item.icon)}</span><h3>${l(item.title)}</h3><p>${l(item.text)}</p></article>
              `).join("")}
            </div>
          </div>
        </section>
        <section class="section compact section-white" aria-labelledby="method-title">
          <div class="container">
            <div class="method-box">
              <span class="icon-disc orange">${icon("chart-no-axes-combined")}</span>
              <div><h2 id="method-title">${l(data.impact.methodTitle)}</h2><p>${l(data.impact.methodText)}</p></div>
            </div>
          </div>
        </section>
      </main>
    `;
  }

  function bindGlobalEvents() {
    const languageButton = document.getElementById("languageButton");
    const menuButton = document.getElementById("menuButton");
    const mobileNav = document.getElementById("mobileNav");

    languageButton?.addEventListener("click", () => {
      state.locale = state.locale === "ar" ? "en" : "ar";
      localStorage.setItem(storageKeys.locale, state.locale);
      renderShell();
    });

    menuButton?.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.innerHTML = icon(open ? "x" : "menu");
      mobileNav?.classList.toggle("open", open);
      document.body.classList.toggle("nav-open", open);
      refreshIcons();
    });

    mobileNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMobileNav));
  }

  function closeMobileNav() {
    const button = document.getElementById("menuButton");
    const nav = document.getElementById("mobileNav");
    button?.setAttribute("aria-expanded", "false");
    if (button) button.innerHTML = icon("menu");
    nav?.classList.remove("open");
    document.body.classList.remove("nav-open");
    refreshIcons();
  }

  function bindPageEvents() {
    if (page === "home") bindHomeEvents();
    if (page === "demo") bindDemoEvents();
  }

  function bindHomeEvents() {
    document.querySelectorAll(".faq-button").forEach((button) => {
      button.addEventListener("click", () => {
        const expanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!expanded));
        const answer = document.getElementById(button.getAttribute("aria-controls"));
        if (answer) answer.hidden = expanded;
      });
    });

    bindUniversityEvents();

    const qrRoot = document.getElementById("eventQr");
    if (qrRoot && window.QRCode) {
      const demoUrl = new URL("demo.html", location.href).href;
      new window.QRCode(qrRoot, {
        text: demoUrl,
        width: 238,
        height: 238,
        colorDark: "#07182e",
        colorLight: "#ffffff",
        correctLevel: window.QRCode.CorrectLevel.H
      });
    }
  }

  function bindDemoEvents() {
    document.querySelectorAll("[data-scenario]").forEach((button) => {
      button.addEventListener("click", () => {
        state.currentScenarioId = button.dataset.scenario;
        state.customQuery = "";
        state.fallback = false;
        updateDemoWorkspace();
      });
    });

    document.getElementById("chatForm")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = document.getElementById("chatInput");
      const query = input?.value.trim() || "";
      if (!query) {
        input?.focus();
        return;
      }
      const match = engine.matchScenario(query, data.scenarios, state.locale);
      state.customQuery = query;
      state.fallback = !match;
      if (match) state.currentScenarioId = match.id;
      updateDemoWorkspace();
    });

    document.querySelector("[data-action='form']")?.addEventListener("click", openFormPreview);
    document.querySelector("[data-action='reminder']")?.addEventListener("click", openReminderForm);
    document.getElementById("resetDemo")?.addEventListener("click", () => {
      localStorage.removeItem(storageKeys.reminders);
      state.currentScenarioId = data.scenarios[0].id;
      state.customQuery = "";
      state.fallback = false;
      updateDemoWorkspace();
      showToast(state.locale === "ar" ? "تمت إعادة ضبط التجربة." : "Demo reset complete.");
    });

    document.querySelectorAll("[data-source]").forEach((button) => {
      button.addEventListener("click", () => openSource(button.dataset.source));
    });

    document.querySelectorAll("[data-delete-reminder]").forEach((button) => {
      button.addEventListener("click", () => deleteReminder(button.dataset.deleteReminder));
    });
  }

  function updateDemoWorkspace() {
    const workspace = document.getElementById("demo-workspace");
    if (!workspace) return;
    workspace.innerHTML = renderDemoWorkspace();
    bindDemoEvents();
    refreshIcons();
    const messages = document.getElementById("messages");
    messages?.scrollTo({ top: messages.scrollHeight, behavior: "smooth" });
  }

  function openSource(sourceId) {
    const source = data.knowledge.find((article) => article.id === sourceId);
    if (!source) return;
    openModal(l(source.title), `
      <div class="demo-document-banner">${icon("badge-info")} ${l(data.brand.demoNotice)}</div>
      <p class="eyebrow">${l(source.category)}</p>
      <p class="lead">${l(source.excerpt)}</p>
      <p>${l(source.detail)}</p>
      <p class="qr-hint">${state.locale === "ar" ? "آخر تحديث تجريبي:" : "Demo update:"} <time datetime="${source.updated}">${source.updated}</time></p>
    `);
  }

  function openFormPreview() {
    const scenario = currentScenario();
    const form = data.forms.find((item) => item.id === scenario.formId);
    if (!form) return;
    openModal(l(form.title), `
      <div class="demo-document-banner">${icon("file-warning")} ${l(data.brand.demoNotice)}</div>
      <div class="form-preview">
        ${form.fields.map((field) => `<div class="preview-field"><small>${l(field.label)}</small><strong>${l(field.value)}</strong></div>`).join("")}
      </div>
    `);
  }

  function openReminderForm() {
    const scenario = currentScenario();
    const defaultDate = new Date(Date.now() + 86400000);
    const dateValue = defaultDate.toISOString().slice(0, 10);
    openModal(l(data.demoPage.createReminder), `
      <div class="demo-document-banner">${icon("bell-ring")} ${state.locale === "ar" ? "سيُحفظ هذا التذكير داخل متصفحك فقط." : "This reminder will be stored only in your browser."}</div>
      <form class="reminder-form" id="reminderForm">
        <div class="field-group">
          <label for="reminderTitle">${state.locale === "ar" ? "عنوان التذكير" : "Reminder title"}</label>
          <input id="reminderTitle" name="title" value="${escapeHtml(l(scenario.reminder))}" required>
        </div>
        <div class="field-group">
          <label for="reminderDate">${state.locale === "ar" ? "التاريخ" : "Date"}</label>
          <input id="reminderDate" name="date" type="date" value="${dateValue}" required>
        </div>
        <button class="button button-primary" type="submit">${icon("bell-plus")} ${l(data.demoPage.createReminder)}</button>
      </form>
    `);

    document.getElementById("reminderForm")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const reminder = engine.createReminder({
        scenarioId: scenario.id,
        title: String(formData.get("title") || l(scenario.reminder)),
        date: String(formData.get("date") || dateValue),
        locale: state.locale
      });
      const reminders = loadReminders();
      reminders.push(reminder);
      localStorage.setItem(storageKeys.reminders, JSON.stringify(reminders));
      closeModal();
      updateDemoWorkspace();
      showToast(l(data.demoPage.reminderSaved));
    });
  }

  function loadReminders() {
    try {
      const reminders = JSON.parse(localStorage.getItem(storageKeys.reminders) || "[]");
      return Array.isArray(reminders) ? reminders : [];
    } catch {
      return [];
    }
  }

  function deleteReminder(id) {
    const reminders = loadReminders().filter((reminder) => reminder.id !== id);
    localStorage.setItem(storageKeys.reminders, JSON.stringify(reminders));
    updateDemoWorkspace();
  }

  function formatDate(value) {
    const date = new Date(`${value}T12:00:00`);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat(state.locale === "ar" ? "ar-OM" : "en-GB", { dateStyle: "medium" }).format(date);
  }

  function openModal(title, body) {
    state.lastFocusedElement = document.activeElement;
    const root = document.getElementById("modalRoot");
    if (!root) return;
    root.innerHTML = `
      <div class="modal-backdrop" id="modalBackdrop">
        <section class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
          <header class="modal-header"><h2 id="modalTitle">${title}</h2><button class="modal-close" type="button" aria-label="${l(data.common.close)}">${icon("x")}</button></header>
          <div class="modal-body">${body}</div>
        </section>
      </div>
    `;
    document.body.classList.add("nav-open");
    document.querySelector("main")?.setAttribute("aria-hidden", "true");
    document.querySelector(".site-header")?.setAttribute("aria-hidden", "true");
    root.querySelector(".modal-close")?.addEventListener("click", closeModal);
    root.querySelector(".modal-backdrop")?.addEventListener("click", (event) => {
      if (event.target === event.currentTarget) closeModal();
    });
    refreshIcons();
    requestAnimationFrame(() => root.querySelector(".modal-close")?.focus());
  }

  function closeModal() {
    const root = document.getElementById("modalRoot");
    if (root) root.innerHTML = "";
    document.body.classList.remove("nav-open");
    document.querySelector("main")?.removeAttribute("aria-hidden");
    document.querySelector(".site-header")?.removeAttribute("aria-hidden");
    if (state.lastFocusedElement instanceof HTMLElement) state.lastFocusedElement.focus();
  }

  function trapModalFocus(event) {
    const modal = document.querySelector(".modal");
    if (!modal || event.key !== "Tab") return;
    const focusable = [...modal.querySelectorAll("button, input, select, textarea, a[href], [tabindex]:not([tabindex='-1'])")]
      .filter((element) => !element.hasAttribute("disabled") && !element.hidden);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function showToast(message) {
    const region = document.getElementById("toastRegion");
    if (!region) return;
    region.innerHTML = `<div class="toast">${icon("circle-check-big")}<span>${escapeHtml(message)}</span></div>`;
    refreshIcons();
    window.setTimeout(() => { region.innerHTML = ""; }, 3200);
  }

  function refreshIcons() {
    if (window.lucide?.createIcons) {
      window.lucide.createIcons({ attrs: { "stroke-width": 1.8 } });
    }
  }

  function updateNetworkState() {
    const element = document.getElementById("networkState");
    if (!element) return;
    const online = navigator.onLine;
    element.classList.toggle("offline", !online);
    element.textContent = online ? l(data.common.online) : l(data.common.offline);
  }

  function setupInstallButton() {
    const button = document.getElementById("installButton");
    if (!button) return;
    button.hidden = !state.deferredInstallPrompt;
    button.addEventListener("click", async () => {
      if (!state.deferredInstallPrompt) return;
      state.deferredInstallPrompt.prompt();
      await state.deferredInstallPrompt.userChoice;
      state.deferredInstallPrompt = null;
      button.hidden = true;
    });
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    state.deferredInstallPrompt = event;
    const button = document.getElementById("installButton");
    if (button) button.hidden = false;
  });

  window.addEventListener("online", updateNetworkState);
  window.addEventListener("offline", updateNetworkState);
  document.addEventListener("keydown", (event) => {
    trapModalFocus(event);
    if (event.key === "Escape") {
      if (document.getElementById("modalBackdrop")) closeModal();
      else closeMobileNav();
    }
  });

  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    window.addEventListener("load", () => navigator.serviceWorker.register("service-worker.js"));
  }

  renderShell();
})();
