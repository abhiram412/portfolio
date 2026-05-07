/**
 * ================================================================
 *  ABHIRAM MADAKA — PORTFOLIO SCRIPT
 *  script.js
 *
 *  ╔══════════════════════════════════════════════════════════╗
 *  ║  EASY EDIT ZONE — Change your personal data here only.  ║
 *  ║  You never need to touch the logic below.               ║
 *  ╚══════════════════════════════════════════════════════════╝
 * ================================================================
 */

/* ────────────────────────────────────────────────────────────────
   PROFILE PHOTO
   • To add/change a photo, set this to your image path.
   • Example: "assets/profile.jpg"  or  "./me.png"
   • Leave as empty string "" to show initials instead.
──────────────────────────────────────────────────────────────── */
const PROFILE_PHOTO = "";   // ← PUT YOUR PHOTO PATH HERE

/* ────────────────────────────────────────────────────────────────
   SKILLS DATA
   • name:     displayed label
   • icon:     emoji or text icon
   • level:    0-100 (progress bar fill %)
──────────────────────────────────────────────────────────────── */
const SKILLS_DATA = [
    { name: "C Programming",             icon: "⚡", level: 80 },
    { name: "Python",                    icon: "🐍", level: 75 },
    { name: "Arduino",                   icon: "🔌", level: 70 },
    { name: "Electronics Fundamentals",  icon: "🔧", level: 78 },
    { name: "Embedded Systems",          icon: "💡", level: 65 },
    { name: "Voice AI / NLP",            icon: "🤖", level: 60 },
    { name: "IoT & Sensors",             icon: "📡", level: 65 },
    { name: "Problem Solving",           icon: "🧠", level: 85 },
];

/* ────────────────────────────────────────────────────────────────
   CONTACT LINKS
   • icon:  emoji
   • label: shown in bold
   • value: shown in small text below label
   • href:  the link target
──────────────────────────────────────────────────────────────── */
const CONTACT_LINKS = [
    {
        icon:  "📧",
        label: "Email",
        value: "abhirammadaka70@gmail.com",
        href:  "mailto:abhirammadaka70@gmail.com",
    },
    {
        icon:  "💻",
        label: "GitHub",
        value: "github.com/abhiram412",
        href:  "https://github.com/abhiram412",
    },
    {
        icon:  "🔗",
        label: "LinkedIn",
        value: "Madaka Abhiram",
        href:  "https://www.linkedin.com/in/madaka-abhiram-499b04370",
    },
    {
        icon:  "📸",
        label: "Instagram",
        value: "@abhiram__madaka",
        href:  "https://instagram.com/abhiram__madaka",
    },
];

/* ================================================================
   ║   LOGIC BELOW — No edits needed unless you're customising   ║
   ================================================================ */

document.addEventListener("DOMContentLoaded", () => {
    injectProfilePhoto();
    injectSkills();
    injectContactLinks();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initSkillBarAnimations();
});

/* ────────────────────────────────────────────────────────────────
   PROFILE PHOTO INJECTION
   Populates both the hero and about section photos.
   Falls back to initials when PROFILE_PHOTO is empty.
──────────────────────────────────────────────────────────────── */
function injectProfilePhoto() {
    const heroPhoto  = document.getElementById("hero-photo");
    const aboutPhoto = document.getElementById("about-photo");

    if (!PROFILE_PHOTO) return; // keep initials fallback

    const buildImg = (alt) => {
        const img = document.createElement("img");
        img.src = PROFILE_PHOTO;
        img.alt = alt;
        return img;
    };

    if (heroPhoto) {
        heroPhoto.innerHTML = "";   // remove initials
        heroPhoto.appendChild(buildImg("Abhiram Madaka"));
    }

    if (aboutPhoto) {
        aboutPhoto.innerHTML = "";
        aboutPhoto.appendChild(buildImg("Abhiram Madaka"));
    }
}

/* ────────────────────────────────────────────────────────────────
   SKILLS GRID INJECTION
──────────────────────────────────────────────────────────────── */
function injectSkills() {
    const grid = document.getElementById("skills-grid");
    if (!grid) return;

    grid.innerHTML = SKILLS_DATA.map((skill, i) => `
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
function injectContactLinks() {
    const container = document.getElementById("contact-links");
    if (!container) return;

    container.innerHTML = CONTACT_LINKS.map(link => `
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
   NAVBAR — scroll state + active link
──────────────────────────────────────────────────────────────── */
function initNavbar() {
    const navbar   = document.getElementById("navbar");
    const sections = document.querySelectorAll("section[id]");
    const links    = document.querySelectorAll(".nav-link");

    let ticking = false;

    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Scrolled style
                navbar.classList.toggle("scrolled", window.scrollY > 60);

                // Active link
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
    const menu   = document.getElementById("nav-menu");

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
   SMOOTH SCROLL — accounts for fixed navbar height
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
   SCROLL REVEAL — fade-in on viewport entry
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

    // Observe existing .reveal elements
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

    // Also watch dynamically-injected elements (skills are added after DOMContentLoaded)
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
   Runs when the bar enters the viewport for the first time.
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

    // Run now for static elements, and again after skills are injected
    runBars();
    setTimeout(runBars, 300);
}