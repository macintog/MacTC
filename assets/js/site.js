(function () {
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
