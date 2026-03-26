(function () {
  const themeModeKey = "mactc-theme-mode";
  const root = document.documentElement;
  const themeToggleButtons = document.querySelectorAll("[data-theme-toggle]");
  const themeToggleLabels = document.querySelectorAll(
    "[data-theme-toggle-label]",
  );
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
    const nextModeHint =
      mode === "auto" ? "dark" : mode === "dark" ? "light" : "auto";

    root.setAttribute("data-theme", resolvedTheme);
    root.setAttribute("data-theme-mode", mode);

    themeToggleLabels.forEach((label) => {
      label.textContent = "Mode: " + modeLabel;
    });

    themeToggleButtons.forEach((button) => {
      button.setAttribute(
        "aria-label",
        "Color mode " +
          modeLabel +
          ". Click to switch to " +
          nextModeHint +
          ".",
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
  if (
    activeThemeMode !== "auto" &&
    activeThemeMode !== "dark" &&
    activeThemeMode !== "light"
  ) {
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

  const productShot = document.querySelector("[data-product-shot]");
  const shotCopyRail = document.querySelector(".split-copy-open");
  const productRail = document.querySelector(".product-rail-open");
  if (productShot && shotCopyRail && productRail) {
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let activeShotState = "default";
    let hoverShotState = null;
    let idleTimer = 0;

    const setShotState = (state) => {
      if (state !== "default" && state !== "advanced") {
        return;
      }

      activeShotState = state;
      productShot.setAttribute("data-shot-state", state);
    };

    const scheduleIdleToggle = (delay) => {
      if (idleTimer) {
        window.clearTimeout(idleTimer);
      }

      if (reducedMotionQuery.matches || hoverShotState) {
        idleTimer = 0;
        return;
      }

      idleTimer = window.setTimeout(() => {
        const nextState =
          activeShotState === "advanced" ? "default" : "advanced";
        setShotState(nextState);
        scheduleIdleToggle(5000);
      }, delay);
    };

    const applyHoverState = (state) => {
      hoverShotState = state;
      if (idleTimer) {
        window.clearTimeout(idleTimer);
        idleTimer = 0;
      }
      setShotState(state);
    };

    const clearHoverState = () => {
      hoverShotState = null;
      scheduleIdleToggle(5000);
    };

    setShotState("default");
    scheduleIdleToggle(5000);

    shotCopyRail.addEventListener("pointerover", (event) => {
      const zone = event.target.closest("[data-shot-target]");
      if (!(zone instanceof HTMLElement)) {
        return;
      }

      const state = zone.getAttribute("data-shot-target");
      if (state) {
        applyHoverState(state);
      }
    });

    productRail.addEventListener("pointerleave", clearHoverState);

    shotCopyRail.addEventListener("focusin", (event) => {
      const zone = event.target.closest("[data-shot-target]");
      if (!(zone instanceof HTMLElement)) {
        return;
      }

      const state = zone.getAttribute("data-shot-target");
      if (state) {
        applyHoverState(state);
      }
    });

    productRail.addEventListener("focusout", () => {
      window.requestAnimationFrame(() => {
        const activeElement = document.activeElement;
        if (
          !(activeElement instanceof Element) ||
          !productRail.contains(activeElement)
        ) {
          clearHoverState();
        }
      });
    });

    const handleReducedMotionChange = () => {
      if (reducedMotionQuery.matches) {
        if (idleTimer) {
          window.clearTimeout(idleTimer);
          idleTimer = 0;
        }
        setShotState("default");
        return;
      }

      if (!hoverShotState) {
        scheduleIdleToggle(5000);
      }
    };

    if (typeof reducedMotionQuery.addEventListener === "function") {
      reducedMotionQuery.addEventListener("change", handleReducedMotionChange);
    } else if (typeof reducedMotionQuery.addListener === "function") {
      reducedMotionQuery.addListener(handleReducedMotionChange);
    }
  }

  const thermalCanvas = document.getElementById("thermalCanvas");
  if (thermalCanvas instanceof HTMLCanvasElement) {
    const context = thermalCanvas.getContext("2d");
    if (context) {
      let animationFrame = 0;
      let phase = 0;

      function resizeCanvas() {
        const rect = thermalCanvas.getBoundingClientRect();
        const scale = Math.min(window.devicePixelRatio || 1, 2);
        thermalCanvas.width = Math.max(1, Math.floor(rect.width * scale));
        thermalCanvas.height = Math.max(1, Math.floor(rect.height * scale));
        context.setTransform(scale, 0, 0, scale, 0, 0);
      }

      function currentPalette() {
        const styles = getComputedStyle(root);
        return {
          background: styles.getPropertyValue("--bg").trim() || "#07090b",
          cool: styles.getPropertyValue("--accent-cool").trim() || "#18d0b0",
          hot: styles.getPropertyValue("--accent-hot").trim() || "#ff7443",
          grid:
            styles.getPropertyValue("--grid-line").trim() ||
            "rgba(255,255,255,0.05)",
        };
      }

      function colorWithAlpha(color, alpha) {
        if (!color.startsWith("#")) {
          return color;
        }

        let hex = color.slice(1);
        if (hex.length === 3) {
          hex = hex
            .split("")
            .map((value) => value + value)
            .join("");
        }

        const red = Number.parseInt(hex.slice(0, 2), 16);
        const green = Number.parseInt(hex.slice(2, 4), 16);
        const blue = Number.parseInt(hex.slice(4, 6), 16);
        return "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")";
      }

      function drawWave(
        width,
        height,
        yBase,
        amplitude,
        frequency,
        localPhase,
        strokeStyle,
        lineWidth,
      ) {
        context.beginPath();
        context.lineWidth = lineWidth;
        context.strokeStyle = strokeStyle;
        for (let x = 0; x <= width; x += 2) {
          const y =
            yBase +
            Math.sin(x * frequency + localPhase) * amplitude +
            Math.sin(x * frequency * 0.42 + localPhase * 1.7) *
              amplitude *
              0.35;
          if (x === 0) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        }
        context.stroke();
      }

      function render(staticFrame) {
        const rect = thermalCanvas.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const palette = currentPalette();

        context.clearRect(0, 0, width, height);

        const haze = context.createRadialGradient(
          width * 0.68,
          height * 0.36,
          0,
          width * 0.68,
          height * 0.36,
          width * 0.42,
        );
        haze.addColorStop(0, colorWithAlpha(palette.hot, 0.09));
        haze.addColorStop(0.45, colorWithAlpha(palette.cool, 0.04));
        haze.addColorStop(1, "rgba(0, 0, 0, 0)");
        context.fillStyle = haze;
        context.fillRect(0, 0, width, height);

        const basePhase = staticFrame ? 1.4 : phase;
        drawWave(
          width,
          height,
          height * 0.42,
          28,
          0.008,
          basePhase,
          colorWithAlpha(palette.cool, 0.2),
          2,
        );
        drawWave(
          width,
          height,
          height * 0.47,
          38,
          0.005,
          basePhase * 0.82 + 1.2,
          colorWithAlpha(palette.hot, 0.14),
          1.5,
        );
        drawWave(
          width,
          height,
          height * 0.52,
          24,
          0.012,
          basePhase * 1.3 + 2.4,
          colorWithAlpha(palette.cool, 0.08),
          1,
        );
      }

      function animate() {
        render(false);
        phase += 0.012;
        animationFrame = window.requestAnimationFrame(animate);
      }

      resizeCanvas();

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );
      if (reducedMotion.matches) {
        render(true);
      } else {
        animate();
      }

      window.addEventListener("resize", resizeCanvas);
      const rerenderStatic = () => {
        if (reducedMotion.matches) {
          render(true);
        }
      };
      if (typeof reducedMotion.addEventListener === "function") {
        reducedMotion.addEventListener("change", rerenderStatic);
      } else if (typeof reducedMotion.addListener === "function") {
        reducedMotion.addListener(rerenderStatic);
      }
      window.addEventListener("pagehide", () => {
        if (animationFrame) {
          window.cancelAnimationFrame(animationFrame);
        }
      });
    }
  }

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
    { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
})();
