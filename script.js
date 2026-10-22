/**
 * Muhammad Usama Ali - Modern Interactive Portfolio Engine
 * Zero bloat, responsive, accessible, high performance vanilla JavaScript.
 */

(function () {
  "use strict";

  // ---------------------------------------------------------------------------
  // 1. DATA: PROJECT CASE STUDIES
  // ---------------------------------------------------------------------------
  const CASE_STUDIES = {
    "pdf-editor": {
      title: "PDF Creator & Document Editor",
      subtitle: "3,000,000+ Downloads on Google Play Store",
      category: "Android Application (Native Kotlin)",
      badge: "3M+ Downloads",
      image: "assets/images/project-pdf-editor.jpg",
      overview: "Built feature-rich document editing and annotation capabilities from scratch, scaling to over 3 million downloads globally with a 4.5+ star rating on Google Play Store.",
      architecture: [
        "Architected with MVVM pattern using Kotlin, Coroutines, and Flow for asynchronous file I/O.",
        "Custom Canvas and Android Graphics pipeline for real-time document annotation, freehand drawing, highlighter overlays, and digital signature stamps.",
        "Built modular PDF manipulation pipelines enabling multi-page merge, page deletion, watermark injection, and high-speed PDF splitting without excessive memory overhead.",
        "Integrated Room Database for indexed local document caching and search history."
      ],
      metrics: [
        { label: "Total Downloads", val: "3,000,000+" },
        { label: "Crash-Free Rate", val: "99.4%" },
        { label: "Play Store Rating", val: "4.5 / 5.0" },
        { label: "Memory Optimization", val: "-35% Heap" }
      ],
      techStack: ["Kotlin", "Android SDK", "Room DB", "Coroutines", "Canvas API", "MVVM", "Play Console"]
    },
    "buksh-apps": {
      title: "Buksh Mobile Productivity Suite",
      subtitle: "1,000,000+ & 4,000,000+ Combined Downloads",
      category: "Cross-Platform Application (Flutter & Dart)",
      badge: "Multi-Million Downloads",
      image: "assets/images/project-buksh-apps.jpg",
      overview: "High-throughput mobile utility ecosystem deployed worldwide. Engineered clean architecture data layers, state management, and real-time synchronization pipelines.",
      architecture: [
        "Employed Clean Architecture separation: Data, Domain, and Presentation layers for rock-solid testability.",
        "Optimized app initialization pipelines and widget render trees, reducing cold-start load times by over 40%.",
        "Configured Firebase Cloud Messaging (FCM) for targeted push notifications and Firestore for cloud sync.",
        "Built responsive interfaces scaling seamlessly from 5-inch phones to 12-inch Android tablets."
      ],
      metrics: [
        { label: "Combined Reach", val: "5,000,000+" },
        { label: "Load Time Reduction", val: "40%+" },
        { label: "Daily Active Users", val: "150K+" },
        { label: "Architecture", val: "Clean Arch" }
      ],
      techStack: ["Flutter", "Dart", "Firebase", "Clean Architecture", "REST APIs", "Provider"]
    },
    "dashcam": {
      title: "DashCam & Real-Time Speedometer HUD",
      subtitle: "Automotive Safety & Telemetry Tracker",
      category: "Native Android & Hardware Integration",
      badge: "Automotive Telemetry",
      image: "assets/images/project-dashcam-speedo.jpg",
      overview: "Advanced driving safety application combining background video loop recording with GPS route tracking, live speedometer HUD, and acceleration telemetry.",
      architecture: [
        "Implemented CameraX alongside the Natario camera library for background video loop recording, storage rotation, and emergency snapshot triggers.",
        "Integrated OSMdroid map framework for offline and online road mapping without proprietary map licensing costs.",
        "Engineered real-time speedometer accelerator modules reading hardware GPS and accelerometer sensors with low latency filtering.",
        "Used Room Database to log trip history, average velocity, and geo-coordinates for exportable route logs."
      ],
      metrics: [
        { label: "FPS Stability", val: "60 FPS HUD" },
        { label: "Sensor Latency", val: "< 50ms" },
        { label: "Battery Drain", val: "Optimized" },
        { label: "Storage", val: "Smart Cache" }
      ],
      techStack: ["Kotlin", "CameraX", "Natario Library", "OSMdroid Maps", "Room DB", "Sensor APIs"]
    },
    "jobs-shopper": {
      title: "Jobs Shopper Platform",
      subtitle: "Career Hunting & Application Tracking",
      category: "Android Mobile Client",
      badge: "5,000+ Downloads",
      image: "assets/images/project-buksh-apps.jpg",
      overview: "Mobile job search engine allowing candidates to discover openings, filter by skills, save favorite postings, and track interview pipelines.",
      architecture: [
        "Built REST API consumption pipeline using Retrofit with token-based authentication and automatic token refresh.",
        "Cached bookmarked listings and application history locally using Room Database for offline accessibility.",
        "Implemented reactive search filtering with Kotlin Flow debounce operators to minimize API query spam."
      ],
      metrics: [
        { label: "Downloads", val: "5,000+" },
        { label: "API Query Latency", val: "< 120ms" },
        { label: "Offline Mode", val: "Full Cache" }
      ],
      techStack: ["Kotlin", "REST APIs", "Room DB", "Coroutines", "MVVM", "Material 3"]
    },
    "web-platforms": {
      title: "Modern Business Web Platforms",
      subtitle: "High-Performance Responsive Web Development",
      category: "Modern Web Development",
      badge: "100 Core Vitals",
      image: "assets/images/project-social-campaign.jpg",
      overview: "Custom responsive websites and landing pages engineered for optimal conversion, flawless mobile responsiveness, and industry-leading Core Web Vitals performance.",
      architecture: [
        "Constructed using semantic HTML5, modular CSS design tokens, and vanilla ES6 modules.",
        "Achieved near-perfect 95-100 scores in Lighthouse for Performance, Accessibility, and SEO.",
        "Engineered interactive elements, custom responsive navigation, and direct lead generation forms."
      ],
      metrics: [
        { label: "Performance", val: "99 / 100" },
        { label: "Accessibility", val: "100 / 100" },
        { label: "SEO Score", val: "100 / 100" }
      ],
      techStack: ["HTML5", "Modern CSS3", "JavaScript ES6+", "Responsive Design", "SEO"]
    },
    "quran-gym": {
      title: "Quran App & Gym Fitness Telemetry",
      subtitle: "Specialized Multi-App Software Suite",
      category: "Flutter & Native Android Suite",
      badge: "Internal Releases",
      image: "assets/images/project-creative-reels.jpg",
      overview: "Two internal production releases: a localized Quran audio player with verse-by-verse recitation streaming, and a biometric fitness workout logging system.",
      architecture: [
        "Engineered background audio playback service with notification controls and offline reciter caching.",
        "Built customized workout timer intervals and exercise history logging backed by Room DB."
      ],
      metrics: [
        { label: "Audio Bitrate", val: "Adaptive" },
        { label: "Offline Storage", val: "Modular" }
      ],
      techStack: ["Flutter", "Kotlin", "Audio Streaming", "Room DB", "Clean Architecture"]
    }
  };

  // ---------------------------------------------------------------------------
  // 2. THEME CONTROLLER (DARK / LIGHT MODE)
  // ---------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const htmlRoot = document.documentElement;

  function initTheme() {
    const savedTheme = localStorage.getItem("portfolio_theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

    applyTheme(initialTheme);
  }

  function applyTheme(theme) {
    htmlRoot.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio_theme", theme);

    if (theme === "light") {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    } else {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const current = htmlRoot.getAttribute("data-theme") || "dark";
      const nextTheme = current === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
    });
  }

  // ---------------------------------------------------------------------------
  // 3. AMBIENT PARTICLES CANVAS
  // ---------------------------------------------------------------------------
  const canvas = document.getElementById("ambient-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationFrameId;
    let width, height;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.45;
        this.speedY = (Math.random() - 0.5) * 0.45;
        this.alpha = Math.random() * 0.4 + 0.15;
        this.colorType = Math.floor(Math.random() * 3);
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        const isDark = htmlRoot.getAttribute("data-theme") !== "light";
        // Unified single primary cyan color for all particles
        const color = isDark ? `rgba(0, 240, 255, ${this.alpha})` : `rgba(8, 145, 178, ${this.alpha * 0.6})`;

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initParticles() {
      resizeCanvas();
      particles = [];
      const count = Math.min(Math.floor((width * height) / 30000), 45);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }

    function drawLines() {
      const isDark = htmlRoot.getAttribute("data-theme") !== "light";
      const maxDist = 120;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * (isDark ? 0.08 : 0.04);
            ctx.strokeStyle = isDark ? `rgba(0, 240, 255, ${alpha})` : `rgba(8, 145, 178, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      if (prefersReducedMotion) return;
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      drawLines();
      animationFrameId = requestAnimationFrame(animate);
    }

    if (!prefersReducedMotion) {
      window.addEventListener("resize", () => {
        resizeCanvas();
      });
      initParticles();
      animate();
    }
  }

  // ---------------------------------------------------------------------------
  // 4. SCROLL PROGRESS & STICKY HEADER & SCROLL SPY
  // ---------------------------------------------------------------------------
  const progressBar = document.getElementById("scroll-progress");
  const header = document.getElementById("site-header");
  const navLinks = document.querySelectorAll("#main-nav .nav-link, #mobile-drawer .nav-link");
  const sections = document.querySelectorAll("section[id]");

  function handleScroll() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    if (header) {
      if (scrollY > 20) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }

    // Scroll spy
    let currentSectionId = "";
    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentSectionId = sec.getAttribute("id");
      }
    });

    if (currentSectionId) {
      navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (href === `#${currentSectionId}`) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });

  // ---------------------------------------------------------------------------
  // 5. TYPEWRITER ROTATING ROLE EFFECT
  // ---------------------------------------------------------------------------
  const typedRoleEl = document.getElementById("typed-role");
  if (typedRoleEl) {
    const roles = [
      "Android & Flutter Developer",
      "Mobile Architect (3M+ Downloads)",
      "Modern Web Developer",
      "Creative Video & Motion Editor",
      "Social Media Strategist"
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function typeLoop() {
      const currentRole = roles[roleIdx];

      if (isDeleting) {
        typedRoleEl.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
        typingSpeed = 45;
      } else {
        typedRoleEl.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
        typingSpeed = 90;
      }

      if (!isDeleting && charIdx === currentRole.length) {
        typingSpeed = 2200; // Pause at end of text
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typingSpeed = 400; // Pause before new word
      }

      setTimeout(typeLoop, typingSpeed);
    }

    typeLoop();
  }

  // ---------------------------------------------------------------------------
  // 6. FILTERABLE PROJECTS GRID
  // ---------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category") || "";
        if (filterValue === "all" || category.includes(filterValue)) {
          card.style.display = "flex";
          card.style.opacity = "0";
          card.style.transform = "translateY(15px)";
          setTimeout(() => {
            card.style.transition = "all 0.3s ease-out";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 30);
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // ---------------------------------------------------------------------------
  // 7. PROJECT CASE STUDY MODAL SYSTEM
  // ---------------------------------------------------------------------------
  const caseStudyModal = document.getElementById("case-study-modal");
  const modalContentContainer = document.getElementById("modal-content-container");
  const closeModalBtn = document.getElementById("close-modal-btn");

  function openCaseStudy(projectId) {
    const data = CASE_STUDIES[projectId];
    if (!data || !caseStudyModal || !modalContentContainer) return;

    modalContentContainer.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <span class="section-tag" style="margin-bottom: 0.5rem;"><i class="fa-solid fa-code-branch"></i> ${data.category}</span>
        <h2 style="font-size: 2rem; margin-bottom: 0.25rem;">${data.title}</h2>
        <div style="font-size: 1.1rem; color: var(--emerald-400); font-weight: 600;">${data.subtitle}</div>
      </div>

      <div style="border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1.75rem; border: 1px solid var(--border-subtle); max-height: 380px;">
        <img src="${data.image}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">Project Overview</h3>
        <p style="color: var(--text-secondary); line-height: 1.7;">${data.overview}</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem; margin-bottom: 2rem; padding: 1.25rem; background: var(--bg-secondary); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
        ${data.metrics.map(m => `
          <div style="text-align: center;">
            <div style="font-size: 1.4rem; font-weight: 800; color: var(--cyan-400);">${m.val}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">${m.label}</div>
          </div>
        `).join("")}
      </div>

      <div style="margin-bottom: 1.75rem;">
        <h3 style="font-size: 1.25rem; margin-bottom: 0.75rem;">Architecture & Key Solutions</h3>
        <ul style="display: flex; flex-direction: column; gap: 0.6rem;">
          ${data.architecture.map(a => `
            <li style="display: flex; gap: 0.6rem; color: var(--text-secondary); font-size: 0.9375rem;">
              <span style="color: var(--emerald-400); font-weight: bold;">▹</span>
              <span>${a}</span>
            </li>
          `).join("")}
        </ul>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 1rem; margin-bottom: 0.5rem; color: var(--text-muted);">Technologies Used</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          ${data.techStack.map(t => `<span class="tech-tag">${t}</span>`).join("")}
        </div>
      </div>
    `;

    caseStudyModal.classList.add("open");
    caseStudyModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeCaseStudy() {
    if (!caseStudyModal) return;
    caseStudyModal.classList.remove("open");
    caseStudyModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".open-case-study-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const pId = btn.getAttribute("data-project");
      openCaseStudy(pId);
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeCaseStudy);
  }

  if (caseStudyModal) {
    caseStudyModal.addEventListener("click", (e) => {
      if (e.target === caseStudyModal) {
        closeCaseStudy();
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 8. RESUME SELECTION MODAL
  // ---------------------------------------------------------------------------
  const resumeModal = document.getElementById("resume-modal");
  const openCvModalBtn = document.getElementById("open-cv-modal-btn");
  const closeResumeModalBtn = document.getElementById("close-resume-modal-btn");

  function openResumeModal() {
    if (!resumeModal) return;
    resumeModal.classList.add("open");
    resumeModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeResumeModal() {
    if (!resumeModal) return;
    resumeModal.classList.remove("open");
    resumeModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (openCvModalBtn) {
    openCvModalBtn.addEventListener("click", openResumeModal);
  }

  if (closeResumeModalBtn) {
    closeResumeModalBtn.addEventListener("click", closeResumeModal);
  }

  if (resumeModal) {
    resumeModal.addEventListener("click", (e) => {
      if (e.target === resumeModal) {
        closeResumeModal();
      }
    });
  }

  // Global ESC key listener to close modals
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCaseStudy();
      closeResumeModal();
    }
  });

  // ---------------------------------------------------------------------------
  // 9. INTERACTIVE WEEKLY CONTENT CALENDAR PREVIEW
  // ---------------------------------------------------------------------------
  const calendarCells = document.querySelectorAll(".cal-day-cell");
  const calDetailBox = document.getElementById("calendar-day-detail");
  const calDetailTitle = document.getElementById("cal-detail-title");
  const calDetailDesc = document.getElementById("cal-detail-desc");

  const CALENDAR_DATA = {
    "Monday": {
      title: "Monday - Product Reel",
      desc: "Hook: '3 Android Development secrets that cut app load time by 40%...' | Formats: 9:16 Short-Form Reel | Target: Tech & Mobile Dev Community."
    },
    "Tuesday": {
      title: "Tuesday - Tips & Architecture Carousel",
      desc: "Visual multi-slide breakdown: 'Room Database vs SQLite in Kotlin: Migration & Transaction Best Practices' | Platform: Instagram Carousel & LinkedIn."
    },
    "Wednesday": {
      title: "Wednesday - Fast Telemetry Shorts",
      desc: "Hook: 'How we built a real-time 60FPS speedometer HUD using OSMdroid without paying map API fees!' | Platform: YouTube Shorts & TikTok."
    },
    "Thursday": {
      title: "Thursday - Behind The Scenes Studio Reel",
      desc: "Time-lapse video editing session inside Premiere Pro showing sound design syncing and kinetic subtitle animations."
    },
    "Friday": {
      title: "Friday - Weekly Performance Recap",
      desc: "Engagement analytics review: highlighting +185% reach growth, top-performing captions, and comment retention."
    },
    "Saturday": {
      title: "Saturday - Quick UI/UX Hack",
      desc: "Short 30s tutorial: 'Designing high-contrast YouTube thumbnails with +15% CTR boost using Figma & Photoshop.'"
    },
    "Sunday": {
      title: "Sunday - Community Q&A & Poll",
      desc: "Interactive story poll & Q&A session asking audience for next week's tech tutorials and video reviews."
    }
  };

  calendarCells.forEach((cell) => {
    cell.addEventListener("click", () => {
      calendarCells.forEach(c => c.style.borderColor = "var(--border-subtle)");
      cell.style.borderColor = "var(--emerald-400)";

      const day = cell.getAttribute("data-day");
      if (CALENDAR_DATA[day] && calDetailBox) {
        calDetailTitle.textContent = CALENDAR_DATA[day].title;
        calDetailDesc.textContent = CALENDAR_DATA[day].desc;
        calDetailBox.style.display = "block";
      }
    });
  });

  // ---------------------------------------------------------------------------
  // 10. COPY EMAIL & TOAST NOTIFICATION
  // ---------------------------------------------------------------------------
  const toastNotice = document.getElementById("toast-notice");
  const toastText = document.getElementById("toast-text");
  let toastTimer;

  function showToast(message) {
    if (!toastNotice) return;
    toastText.textContent = message;
    toastNotice.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotice.classList.remove("show");
    }, 3200);
  }

  document.querySelectorAll(".copy-trigger").forEach((btn) => {
    btn.addEventListener("click", () => {
      const textToCopy = btn.getAttribute("data-copy") || "u3345ali@gmail.com";
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied ${textToCopy} to clipboard!`);
      }).catch(() => {
        showToast("Email: u3345ali@gmail.com");
      });
    });
  });

  // ---------------------------------------------------------------------------
  // 11. CONTACT FORM VALIDATION & ACTIONS
  // ---------------------------------------------------------------------------
  const contactForm = document.getElementById("contact-form");
  const formFeedback = document.getElementById("form-feedback");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("contact-name").value.trim();
      const email = document.getElementById("contact-email").value.trim();
      const subject = document.getElementById("contact-subject").value;
      const message = document.getElementById("contact-message").value.trim();

      // Basic validation
      if (!name || !email || !subject || !message) {
        formFeedback.className = "form-feedback error";
        formFeedback.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Please fill in all required fields.';
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        formFeedback.className = "form-feedback error";
        formFeedback.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Please enter a valid email address.';
        return;
      }

      // Generate pre-filled mailto & WhatsApp shortcuts
      const mailtoUrl = `mailto:u3345ali@gmail.com?subject=${encodeURIComponent(subject + " - from " + name)}&body=${encodeURIComponent("Sender: " + name + " (" + email + ")\n\n" + message)}`;
      const waUrl = `https://wa.me/923404779596?text=${encodeURIComponent("Hi Usama, my name is " + name + " (" + email + "). Topic: " + subject + "\n\n" + message)}`;

      formFeedback.className = "form-feedback success";
      formFeedback.innerHTML = `
        <div style="margin-bottom: 0.5rem;">
          <strong><i class="fa-solid fa-circle-check"></i> Thank you, ${name}!</strong>
        </div>
        <div>Your message has been validated. Send it instantly using your preferred channel:</div>
        <div style="margin-top: 0.75rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="${mailtoUrl}" class="btn btn-primary btn-sm" style="font-size: 0.8125rem;">
            <i class="fa-regular fa-envelope"></i> Open Email Client
          </a>
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="font-size: 0.8125rem;">
            <i class="fa-brands fa-whatsapp"></i> Send via WhatsApp
          </a>
        </div>
      `;

      showToast("Message prepared! Click Email or WhatsApp to send.");
    });
  }

  // ---------------------------------------------------------------------------
  // 12. MOBILE MENU DRAWER
  // ---------------------------------------------------------------------------
  const mobileToggle = document.getElementById("mobile-toggle");
  const mobileDrawer = document.getElementById("mobile-drawer");

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = mobileDrawer.classList.contains("open");
      if (isOpen) {
        mobileDrawer.classList.remove("open");
        mobileToggle.classList.remove("active");
        mobileDrawer.setAttribute("aria-hidden", "true");
        mobileToggle.setAttribute("aria-expanded", "false");
      } else {
        mobileDrawer.classList.add("open");
        mobileToggle.classList.add("active");
        mobileDrawer.setAttribute("aria-hidden", "false");
        mobileToggle.setAttribute("aria-expanded", "true");
      }
    });

    mobileDrawer.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        mobileDrawer.classList.remove("open");
        mobileToggle.classList.remove("active");
        mobileDrawer.setAttribute("aria-hidden", "true");
        mobileToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Set current year in footer
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Dynamic Tab Title
  const portfolioDocTitle = document.title;
  window.addEventListener("blur", () => {
    document.title = "⚡ Usama Ali | SevenSpire Code";
  });
  window.addEventListener("focus", () => {
    document.title = portfolioDocTitle;
  });

  // Initialize
  initTheme();
  handleScroll();

})();
