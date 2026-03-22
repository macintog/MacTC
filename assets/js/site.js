(function () {
    const themeModeKey = "mactc-theme-mode";
    const root = document.documentElement;
    const themeToggleButtons = document.querySelectorAll("[data-theme-toggle]");
    const themeToggleLabels = document.querySelectorAll("[data-theme-toggle-label]");
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    function readSavedThemeMode() {
        try {
            return localStorage.getItem(themeModeKey);
        } catch (error) {
            return null;
        }
    }

    function saveThemeMode(mode) {
        try {
            localStorage.setItem(themeModeKey, mode);
        } catch (error) {
            // Best-effort persistence only.
        }
    }

    function getSystemTheme() {
        return darkModeMediaQuery.matches ? "dark" : "light";
    }

    function getThemeForMode(mode) {
        if (mode === "dark" || mode === "light") {
            return mode;
        }
        return getSystemTheme();
    }

    function applyThemeMode(mode, persistMode) {
        const resolvedTheme = getThemeForMode(mode);
        const modeLabel = mode.charAt(0).toUpperCase() + mode.slice(1);
        const nextModeHint = mode === "auto" ? "dark" : mode === "dark" ? "light" : "auto";

        root.setAttribute("data-theme", resolvedTheme);
        root.setAttribute("data-theme-mode", mode);

        themeToggleLabels.forEach((label) => {
            label.textContent = "Mode: " + modeLabel;
        });

        themeToggleButtons.forEach((button) => {
            button.setAttribute(
                "aria-label",
                "Color mode " + modeLabel + ". Click to switch to " + nextModeHint + "."
            );
            button.setAttribute("title", "Color mode: " + modeLabel);
        });

        if (persistMode) {
            saveThemeMode(mode);
        }
    }

    function getNextThemeMode(mode) {
        if (mode === "auto") {
            return "dark";
        }
        if (mode === "dark") {
            return "light";
        }
        return "auto";
    }

    let activeThemeMode = readSavedThemeMode();
    if (activeThemeMode !== "auto" && activeThemeMode !== "dark" && activeThemeMode !== "light") {
        activeThemeMode = "auto";
    }

    applyThemeMode(activeThemeMode, false);

    themeToggleButtons.forEach((button) => {
        button.addEventListener("click", () => {
            activeThemeMode = getNextThemeMode(activeThemeMode);
            applyThemeMode(activeThemeMode, true);
        });
    });

    const handleSystemThemeChange = () => {
        if (activeThemeMode === "auto") {
            applyThemeMode("auto", false);
        }
    };

    if (typeof darkModeMediaQuery.addEventListener === "function") {
        darkModeMediaQuery.addEventListener("change", handleSystemThemeChange);
    } else if (typeof darkModeMediaQuery.addListener === "function") {
        darkModeMediaQuery.addListener(handleSystemThemeChange);
    }

    const yearEls = document.querySelectorAll("[data-year]");
    const currentYear = String(new Date().getFullYear());

    yearEls.forEach((el) => {
        el.textContent = currentYear;
    });

    const pathname = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".main-nav a[href]");
    navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (href === pathname || (pathname === "" && href === "index.html")) {
            link.setAttribute("aria-current", "page");
        }
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        document.querySelectorAll(".reveal").forEach((el) => {
            el.classList.add("is-visible");
        });
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
})();
