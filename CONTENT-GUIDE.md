# Portfolio Maintenance & Content Update Guide

This guide explains how to easily update projects, resume PDFs, social media links, skills, and images in `D:\portifolio`.

---

## 1. Updating Projects & Case Studies

### A. Updating Project Cards on the Pages
- **Agency Website (`index.html`):** Edit the `<section id="work">` block to modify services, client work, or pricing tiers.
- **Founder Portfolio (`portfolio.html`):** Edit the `<section id="projects">` block for deep technical breakdown.
- **Card title & description:** Edit the `<h3>` and `<p class="project-desc">` tags.
- **Tech tags:** Add or modify `<span class="tech-tag">Tag</span>` elements.
- **Image preview:** Update the `src` attribute in the `<div class="project-thumb-wrapper">`.

### B. Updating Case Study Modal Details
Open `D:\portifolio\script.js` and locate the `CASE_STUDIES` object at the top of the file:
```javascript
const CASE_STUDIES = {
  "pdf-editor": {
    title: "Project Title",
    subtitle: "Play Store Metrics",
    overview: "Description...",
    architecture: ["Point 1", "Point 2"],
    metrics: [{ label: "Downloads", val: "3M+" }],
    techStack: ["Kotlin", "Room DB"]
  }
};
```
Modify or append new project case studies here.

---

## 2. Updating Resume PDF Files

When you update your CVs:
1. Save your updated Technical CV as:
   `D:\portifolio\public\Muhammad_Usama_Ali_Android_Flutter_Resume.pdf`
2. Save your updated Creative / SMM CV as:
   `D:\portifolio\public\Muhammad_Usama_Ali_Creative_SocialMedia_Resume.pdf`
3. The download buttons in the website link directly to these files, so replacing the PDFs in `public/` automatically updates all download links.

---

## 3. Updating Social Links & Contact Details

Search for the relevant items in `D:\portifolio\index.html`:
- **Email:** Search for `u3345ali@gmail.com`
- **Phone / WhatsApp:** Search for `923404779596` or `wa.me/923404779596`
- **LinkedIn / GitHub:** Search for `https://github.com` and `https://linkedin.com` in `<footer class="site-footer">` and replace with your profile URLs.

---

## 4. Updating Skills & Badges

In `D:\portifolio\index.html`, navigate to `<section id="skills">`. Each skill is wrapped in:
```html
<span class="skill-chip"><i class="fa-solid fa-check"></i> Your Skill</span>
```
Simply add, remove, or edit skill chips within the corresponding category cards.

---

## 5. Adding or Replacing Images

All images are stored in `D:\portifolio\assets\images\` and mirrored to `D:\portifolio\public\images\`:
- `avatar.jpg`: Hero profile avatar (1:1 ratio recommended).
- `project-*.jpg`: Project preview banners (16:9 ratio recommended).
