/**
 * SCOPERISE TECH - AGENCY ENGINE & INTERACTIVE CONTROLLERS
 * Clean vanilla JavaScript with real-time project estimator, theme management, and instant chat links.
 */

(function () {
  "use strict";

  // ---------------------------------------------------------------------------
  // 1. THEME MANAGER (DARK / LIGHT)
  // ---------------------------------------------------------------------------
  const themeToggle = document.getElementById("agency-theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  function initTheme() {
    const saved = localStorage.getItem("scoperise_theme") || localStorage.getItem("byteframe_theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = saved || (prefersDark ? "dark" : "dark"); // Default dark
    setTheme(theme);
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("scoperise_theme", theme);
    if (themeIcon) {
      if (theme === "light") {
        themeIcon.className = "fa-solid fa-sun";
      } else {
        themeIcon.className = "fa-solid fa-moon";
      }
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      setTheme(current === "dark" ? "light" : "dark");
    });
  }

  // ---------------------------------------------------------------------------
  // 2. MOBILE NAVIGATION DRAWER
  // ---------------------------------------------------------------------------
  const mobileToggle = document.getElementById("mobile-toggle");
  const mobileDrawer = document.getElementById("mobile-drawer");

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener("click", () => {
      mobileDrawer.classList.toggle("open");
    });

    mobileDrawer.querySelectorAll(".nav-item, .btn").forEach((link) => {
      link.addEventListener("click", () => {
        mobileDrawer.classList.remove("open");
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 3. INTERACTIVE PROJECT ESTIMATOR
  // ---------------------------------------------------------------------------
  const PRICING_MATRIX = {
    service: {
      "mobile-app": { name: "Mobile App (Android/Flutter)", baseMin: 800, baseMax: 2000, time: "3-4 Weeks" },
      "web-dev": { name: "Modern Web / SaaS Platform", baseMin: 500, baseMax: 1400, time: "2-3 Weeks" },
      "video-media": { name: "Viral Video & Reels Production", baseMin: 300, baseMax: 800, time: "5-7 Days" },
      "full-package": { name: "Full-Stack App + Media Growth", baseMin: 1400, baseMax: 3200, time: "4-6 Weeks" }
    },
    tier: {
      "starter": { name: "MVP / Essential", mult: 1.0 },
      "growth": { name: "Growth & Scaling", mult: 1.6 },
      "enterprise": { name: "Custom Enterprise", mult: 2.4 }
    },
    speed: {
      "standard": { name: "Standard Delivery", mult: 1.0, timeMod: "" },
      "express": { name: "Express Fast-Track", mult: 1.25, timeMod: " (Fast-Track)" }
    }
  };

  let selectedConfig = {
    service: "mobile-app",
    tier: "growth",
    speed: "standard"
  };

  const calcButtons = document.querySelectorAll(".calc-selector, .calc-btn");
  const summaryService = document.getElementById("est-summary-service");
  const summaryTier = document.getElementById("est-summary-tier");
  const summarySpeed = document.getElementById("est-summary-speed");
  const summaryTimeline = document.getElementById("est-summary-timeline");
  const summaryPrice = document.getElementById("est-summary-price");
  const btnEstimateWa = document.getElementById("btn-estimate-wa");
  const btnEstimateEmail = document.getElementById("btn-estimate-email");

  function updateEstimator() {
    const srv = PRICING_MATRIX.service[selectedConfig.service];
    const tier = PRICING_MATRIX.tier[selectedConfig.tier];
    const spd = PRICING_MATRIX.speed[selectedConfig.speed];

    if (!srv || !tier || !spd) return;

    const minPrice = Math.round((srv.baseMin * tier.mult * spd.mult) / 50) * 50;
    const maxPrice = Math.round((srv.baseMax * tier.mult * spd.mult) / 50) * 50;
    const timelineStr = srv.time + spd.timeMod;

    if (summaryService) summaryService.textContent = srv.name;
    if (summaryTier) summaryTier.textContent = tier.name;
    if (summarySpeed) summarySpeed.textContent = spd.name;
    if (summaryTimeline) summaryTimeline.textContent = timelineStr;
    if (summaryPrice) summaryPrice.textContent = `$${minPrice} - $${maxPrice}`;

    // Generate WhatsApp CTA
    const waText = encodeURIComponent(
      `Hello ScopeRise Tech! I used your Project Estimator on scoperisetech.com:\n\n` +
      `• Service: ${srv.name}\n` +
      `• Tier: ${tier.name}\n` +
      `• Speed: ${spd.name}\n` +
      `• Estimated Budget: $${minPrice} - $${maxPrice}\n` +
      `• Estimated Timeline: ${timelineStr}\n\n` +
      `I'd like to discuss starting this project with you!`
    );
    if (btnEstimateWa) {
      btnEstimateWa.href = `https://wa.me/923404779596?text=${waText}`;
    }

    // Generate Email Mailto CTA
    const emailSubject = encodeURIComponent(`Project Inquiry: ${srv.name} (${tier.name}) - ScopeRise Tech`);
    const emailBody = encodeURIComponent(
      `Hi Usama & ScopeRise Tech Team,\n\n` +
      `I reviewed your services on scoperisetech.com and configured this project estimate:\n\n` +
      `Service: ${srv.name}\n` +
      `Package Tier: ${tier.name}\n` +
      `Timeline: ${timelineStr}\n` +
      `Estimated Budget: $${minPrice} - $${maxPrice}\n\n` +
      `Please let me know when we can schedule a quick consultation.`
    );
    if (btnEstimateEmail) {
      btnEstimateEmail.href = `mailto:u3345ali@gmail.com?subject=${emailSubject}&body=${emailBody}`;
    }
  }

  calcButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const group = btn.dataset.group;
      const val = btn.dataset.value;

      if (!group || !val) return;

      // Deselect siblings in the same group
      document.querySelectorAll(`[data-group="${group}"]`).forEach((b) => {
        b.classList.remove("active");
      });

      btn.classList.add("active");
      selectedConfig[group] = val;
      updateEstimator();
    });
  });

  // ---------------------------------------------------------------------------
  // 4. CONTACT & KICKOFF FORM
  // ---------------------------------------------------------------------------
  const contactForm = document.getElementById("agency-contact-form");
  const formFeedback = document.getElementById("agency-form-feedback");

  if (contactForm && formFeedback) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("client-name").value.trim();
      const email = document.getElementById("client-email").value.trim();
      const service = document.getElementById("client-service").value;
      const budget = document.getElementById("client-budget").value;
      const message = document.getElementById("client-message").value.trim();

      if (!name || !email || !message) {
        alert("Please fill in all required fields.");
        return;
      }

      const waMessage = encodeURIComponent(
        `Hello ScopeRise Tech!\n\n` +
        `New Client Project Inquiry:\n` +
        `• Name: ${name}\n` +
        `• Email/Contact: ${email}\n` +
        `• Service: ${service}\n` +
        `• Budget Range: ${budget}\n\n` +
        `Message:\n"${message}"`
      );

      const mailtoUrl = `mailto:u3345ali@gmail.com?subject=${encodeURIComponent("Client Inquiry: " + service + " - " + name)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\nService: " + service + "\nBudget: " + budget + "\n\nMessage:\n" + message)}`;
      const waUrl = `https://wa.me/923404779596?text=${waMessage}`;

      formFeedback.className = "form-feedback success";
      formFeedback.innerHTML = `
        <div style="font-weight: 700; margin-bottom: 0.5rem;">
          <i class="fa-solid fa-circle-check"></i> Inquiry Prepared Successfully!
        </div>
        <p style="font-size: 0.875rem; margin-bottom: 0.75rem;">
          Choose your preferred direct method to send this inquiry to our lead team instantly:
        </p>
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            <i class="fa-brands fa-whatsapp"></i> Send via WhatsApp (Instant Reply)
          </a>
          <a href="${mailtoUrl}" class="btn btn-secondary btn-sm">
            <i class="fa-regular fa-envelope"></i> Send via Email
          </a>
        </div>
      `;
    });
  }

  // ---------------------------------------------------------------------------
  // 5. SMOOTH SCROLL FOR ANCHORS
  // ---------------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Init
  initTheme();
  updateEstimator();

})();
