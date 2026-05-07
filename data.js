/**
 * ================================================================
 *  DATA.JS — Portfolio Data Layer
 *  Single source of truth. All hardcoded defaults live here.
 *  Edits from the admin dashboard are saved to localStorage
 *  and loaded back on every page load.
 * ================================================================
 */

const STORAGE_KEY = "portfolioData_v1";
const PHOTO_KEY = "portfolioPhoto_v1";

/* ────────────────────────────────────────────────────────────────
   DEFAULT DATA  ← original content preserved exactly
──────────────────────────────────────────────────────────────── */
const DEFAULT_DATA = {

    profile: {
        name: "Abhiram Madaka",
        greeting: "Hello, I'm",
        tagline: "Future Embedded Engineer | Problem Solver",
        intro: "I build real-world electronics and software solutions with a focus on embedded systems and safety-driven innovation.",
        aboutTitle: "Passionate about\nElectronics & Code",
        aboutP1: "I'm an ECE student with a deep passion for Embedded Systems and real-world problem solving. I enjoy bridging the gap between software and hardware to create practical, impactful solutions — from AI-powered voice assistants to smart emergency alert systems.",
        aboutP2: "My goal is to engineer products that make people safer, smarter, and more connected — one circuit at a time.",
        email: "abhirammadaka70@gmail.com",
        logoText: "AM",
    },

    aboutStats: [
        { value: "2+", label: "Projects Built" },
        { value: "ECE", label: "Specialisation" },
        { value: "100%", label: "Passion-Driven" },
    ],

    projects: [
        {
            id: 1,
            number: "01",
            title: "AI Assistant",
            desc: "Built a Python-based AI assistant capable of voice interaction and opening applications like YouTube on command.",
            tags: ["Python", "Voice AI", "Automation"],
            github: "https://github.com/abhiram412",
        },
        {
            id: 2,
            number: "02",
            title: "SOS Emergency System",
            desc: "Designed a smart SOS emergency system that automatically sends alerts during accidents — detects falls and network changes for reliable critical communication.",
            tags: ["Embedded C", "Arduino", "IoT"],
            github: "https://github.com/abhiram412",
        },
    ],

    skills: [
        { id: 1, name: "C Programming", icon: "⚡", level: 80 },
        { id: 2, name: "Python", icon: "🐍", level: 75 },
        { id: 3, name: "Arduino", icon: "🔌", level: 70 },
        { id: 4, name: "Electronics Fundamentals", icon: "🔧", level: 78 },
        { id: 5, name: "Embedded Systems", icon: "💡", level: 65 },
        { id: 6, name: "Voice AI / NLP", icon: "🤖", level: 60 },
        { id: 7, name: "IoT & Sensors", icon: "📡", level: 65 },
        { id: 8, name: "Problem Solving", icon: "🧠", level: 85 },
    ],

    contactLinks: [
        { id: 1, icon: "📧", label: "Email", value: "abhirammadaka70@gmail.com", href: "mailto:abhirammadaka70@gmail.com" },
        { id: 2, icon: "💻", label: "GitHub", value: "github.com/abhiram412", href: "https://github.com/abhiram412" },
        { id: 3, icon: "🔗", label: "LinkedIn", value: "Madaka Abhiram", href: "https://www.linkedin.com/in/madaka-abhiram-499b04370" },
        { id: 4, icon: "📸", label: "Instagram", value: "@abhiram__madaka", href: "https://instagram.com/abhiram__madaka" },
    ],
};

/* ────────────────────────────────────────────────────────────────
   LOAD / SAVE
──────────────────────────────────────────────────────────────── */

/**
 * Deep-merge: fills any missing keys from defaults so old saved
 * data keeps working after new keys are added to DEFAULT_DATA.
 */
function deepMerge(defaults, saved) {
    if (typeof saved !== "object" || saved === null) return defaults;
    const out = { ...defaults };
    for (const key of Object.keys(defaults)) {
        if (key in saved) {
            const dv = defaults[key];
            const sv = saved[key];
            if (Array.isArray(dv)) {
                out[key] = Array.isArray(sv) && sv.length > 0 ? sv : dv;
            } else if (typeof dv === "object" && dv !== null) {
                out[key] = deepMerge(dv, sv);
            } else {
                out[key] = sv !== undefined && sv !== null ? sv : dv;
            }
        }
    }
    return out;
}

function loadData() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return JSON.parse(JSON.stringify(DEFAULT_DATA));
        return deepMerge(DEFAULT_DATA, JSON.parse(raw));
    } catch (e) {
        console.warn("PortfolioData: could not load from localStorage.", e);
        return JSON.parse(JSON.stringify(DEFAULT_DATA));
    }
}

function saveData(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error("PortfolioData: could not save to localStorage.", e);
        return false;
    }
}

function resetData() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(PHOTO_KEY);
}

function loadPhoto() {
    return localStorage.getItem(PHOTO_KEY) || "";
}

function savePhoto(base64) {
    try {
        localStorage.setItem(PHOTO_KEY, base64);
        return true;
    } catch (e) {
        console.error("PortfolioData: photo too large for localStorage.", e);
        return false;
    }
}

function removePhoto() {
    localStorage.removeItem(PHOTO_KEY);
}

/* Expose globally so both script.js and admin.js can use this */
window.PortfolioData = {
    load: loadData,
    save: saveData,
    reset: resetData,
    loadPhoto,
    savePhoto,
    removePhoto,
    defaults: DEFAULT_DATA,
    STORAGE_KEY,
    PHOTO_KEY,
};
