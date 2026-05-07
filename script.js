/**
 * ================================================================
 *  ABHIRAM MADAKA — PORTFOLIO SCRIPT
 *  script.js
 *
 *  All personal data is now managed via the Admin Dashboard.
 *  Defaults live in data.js — no manual edits needed here.
 * ================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    const data = PortfolioData.load();

    injectProfileText(data);
    injectProfilePhoto();
    injectSkills(data);
    injectContactLinks(data);
    injectAboutStats(data);
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initSkillBarAnimations();
});

/* ────────────────────────────────────────────────────────────────
   PROFILE TEXT INJECTION
   Updates hero section and about section from stored data.
──────────────────────────────────────────────────────────────── */
function injectProfileText(data) {
    const p = data.profile;

    // Hero
    setTextContent("hero-greeting-text", p.greeting);
    setTextContent("hero-name-text", p.name);
    setTextContent("hero-tagline-text", p.tagline);
    setTextContent("hero-intro-text", p.intro);
    setTextContent("footer-name-text", p.name);
    setTextContent("footer-year-text", `© ${new Date().getFullYear()} ${p.name}. All rights reserved.`);

    // Email button in contact section
    const emailBtn = document.getElementById("contact-email-btn");
    if (emailBtn) {
        emailBtn.href = `mailto:${p.email}`;
        emailBtn.textContent = "Send an Email";
    }

    // About paragraphs
    setTextContent("about-p1", p.aboutP1);
    setTextContent("about-p2", p.aboutP2);
}

/* ────────────────────────────────────────────────────────────────
   PROFILE PHOTO INJECTION
   Loads base64 from localStorage (set via admin photo upload).
   Falls back to initials when no photo exists.
──────────────────────────────────────────────────────────────── */
function injectProfilePhoto() {
    const heroPhoto = document.getElementById("hero-photo");
    const aboutPhoto = document.getElementById("about-photo");
    const base64 = PortfolioData.loadPhoto();

    if (!base64) return; // keep initials fallback

    const buildImg = (alt) => {
        const img = document.createElement("img");
        img.src = base64;
        img.alt = alt;
        return img;
    };

    const altName = PortfolioData.load().profile.name || "Profile photo";

    if (heroPhoto) {
        heroPhoto.innerHTML = "";
        heroPhoto.appendChild(buildImg(altName));
    }

    if (aboutPhoto) {
        aboutPhoto.innerHTML = "";
        aboutPhoto.appendChild(buildImg(altName));
    }
}

/* ────────────────────────────────────────────────────────────────
   SKILLS GRID INJECTION
──────────────────────────────────────────────────────────────── */
function injectSkills(data) {
    const grid = document.getElementById("skills-grid");
    if (!grid) return;

    const skills = data.skills || [];

    grid.innerHTML = skills.map((skill, i) => `
        <div class="skill-card reveal" style="transition-delay: ${(i % 4) * 0.08}s">
            <span class="skill-icon">${skill.icon}</span>
            <div class="skill-name">${skill.name}</div>
            <div class="skill-bar-bg">
                <div class="skill-bar-fill" data-level="${skill.level}"></div>
            </div>
        </div>
    `).join("");
}

/* ────────────────────────────────────────────────────────────────
   CONTACT LINKS INJECTION
──────────────────────────────────────────────────────────────── */
function injectContactLinks(data) {
    const container = document.getElementById("contact-links");
    if (!container) return;

    const links = data.contactLinks || [];

    container.innerHTML = links.map(link => `
        <a href="${link.href}" target="_blank" rel="noopener" class="contact-link-item">
            <span class="clink-icon">${link.icon}</span>
            <span>
                <span class="clink-label">${link.label}</span>
                <span class="clink-value">${link.value}</span>
            </span>
        </a>
    `).join("");
}

/* ────────────────────────────────────────────────────────────────
   ABOUT STATS INJECTION
──────────────────────────────────────────────────────────────── */
function injectAboutStats(data) {
    const container = document.getElementById("about-stats");
    if (!container) return;

    const stats = data.aboutStats || [];

    container.innerHTML = stats.map(stat => `
        <div class="stat">
            <strong>${stat.value}</strong>
            <span>${stat.label}</span>
        </div>
    `).join("");
}

/* ────────────────────────────────────────────────────────────────
   PROJECTS INJECTION
   Projects are dynamically rendered from stored data.
──────────────────────────────────────────────────────────────── */
function injectProjects(data) {
    const grid = document.getElementById("projects-grid");
    if (!grid) return;

    const projects = data.projects || [];

    const githubSVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57
        0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695
        -.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99
        .105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225
        -.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405
        c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225
        0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3
        0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>`;

    grid.innerHTML = projects.map(project => `
        <article class="project-card reveal" data-index="${project.number}">
            <div class="project-card-header">
                <span class="project-number">${project.number}</span>
                <div class="project-links-top">
                    <a href="${project.github || '#'}" target="_blank" rel="noopener" aria-label="View on GitHub">
                        ${githubSVG}
                    </a>
                </div>
            </div>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-desc">${project.desc}</p>
            <div class="project-tags">
                ${(project.tags || []).map(tag => `<span>${tag}</span>`).join("")}
            </div>
            <a href="${project.github || '#'}" target="_blank" rel="noopener" class="project-cta">
                View Code <span aria-hidden="true">→</span>
            </a>
        </article>
    `).join("");
}

/* ────────────────────────────────────────────────────────────────
   NAVBAR — scroll state + active link
──────────────────────────────────────────────────────────────── */
function initNavbar() {
    const navbar = document.getElementById("navbar");
    const sections = document.querySelectorAll("section[id]");
    const links = document.querySelectorAll(".nav-link");

    let ticking = false;

    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                navbar.classList.toggle("scrolled", window.scrollY > 60);

                const scrollY = window.scrollY + 110;
                sections.forEach(sec => {
                    if (
                        scrollY >= sec.offsetTop &&
                        scrollY < sec.offsetTop + sec.offsetHeight
                    ) {
                        const id = sec.getAttribute("id");
                        links.forEach(l => {
                            l.classList.toggle("active",
                                l.getAttribute("href") === `#${id}`
                            );
                        });
                    }
                });

                ticking = false;
            });
            ticking = true;
        }
    });
}

/* ────────────────────────────────────────────────────────────────
   MOBILE MENU
──────────────────────────────────────────────────────────────── */
function initMobileMenu() {
    const toggle = document.getElementById("nav-toggle");
    const menu = document.getElementById("nav-menu");

    const close = () => {
        toggle?.classList.remove("active");
        menu?.classList.remove("active");
        document.body.style.overflow = "";
    };

    toggle?.addEventListener("click", () => {
        const isOpen = menu?.classList.toggle("active");
        toggle.classList.toggle("active");
        document.body.style.overflow = isOpen ? "hidden" : "";
    });

    menu?.querySelectorAll(".nav-link").forEach(l => l.addEventListener("click", close));

    document.addEventListener("click", e => {
        if (!menu?.contains(e.target) && !toggle?.contains(e.target)) close();
    });
}

/* ────────────────────────────────────────────────────────────────
   SMOOTH SCROLL
──────────────────────────────────────────────────────────────── */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", e => {
            const target = document.querySelector(link.getAttribute("href"));
            if (!target) return;
            e.preventDefault();
            const offset = document.querySelector(".navbar")?.offsetHeight || 0;
            window.scrollTo({
                top: target.offsetTop - offset,
                behavior: "smooth",
            });
        });
    });
}

/* ────────────────────────────────────────────────────────────────
   SCROLL REVEAL
──────────────────────────────────────────────────────────────── */
function initScrollReveal() {
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { rootMargin: "0px 0px -60px 0px", threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

    const mutObs = new MutationObserver(() => {
        document.querySelectorAll(".reveal:not([data-observed])").forEach(el => {
            el.dataset.observed = "1";
            observer.observe(el);
        });
    });
    mutObs.observe(document.body, { childList: true, subtree: true });
}

/* ────────────────────────────────────────────────────────────────
   SKILL BAR ANIMATIONS
──────────────────────────────────────────────────────────────── */
function initSkillBarAnimations() {
    const runBars = () => {
        document.querySelectorAll(".skill-bar-fill:not([data-animated])").forEach(bar => {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        bar.dataset.animated = "1";
                        setTimeout(() => {
                            bar.style.width = bar.dataset.level + "%";
                        }, 200);
                        observer.unobserve(bar);
                    }
                });
            }, { threshold: 0.5 });
            observer.observe(bar);
        });
    };

    runBars();
    setTimeout(runBars, 300);
}

/* ────────────────────────────────────────────────────────────────
   HELPER
──────────────────────────────────────────────────────────────── */
function setTextContent(id, text) {
    const el = document.getElementById(id);
    if (el && text !== undefined && text !== null) el.textContent = text;
}