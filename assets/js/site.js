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

  function updateThemeColor(theme) {
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.setAttribute(
        "content",
        theme === "dark" ? "#07090b" : "#f4f5f7",
      );
    }
  }

  function applyThemeMode(mode, persistMode) {
    const resolvedTheme = getThemeForMode(mode);
    const modeLabel = mode.charAt(0).toUpperCase() + mode.slice(1);
    const nextModeHint =
      mode === "auto" ? "dark" : mode === "dark" ? "light" : "auto";

    root.setAttribute("data-theme", resolvedTheme);
    root.setAttribute("data-theme-mode", mode);
    updateThemeColor(resolvedTheme);
    root.dispatchEvent(new Event("mactc-theme-change"));

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

  const supportForms = document.querySelectorAll("[data-support-form]");
  supportForms.forEach((form) => {
    if (!(form instanceof HTMLFormElement)) {
      return;
    }

    const endpoint = form.getAttribute("data-support-endpoint");
    const submitButton = form.querySelector('button[type="submit"]');
    const status = form.querySelector("[data-support-form-status]");
    if (!endpoint || !(submitButton instanceof HTMLButtonElement) || !status) {
      return;
    }

    const defaultLabel = submitButton.textContent;
    const pendingLabel = form.getAttribute("data-pending-label") || "Sending…";
    const successMessage =
      form.getAttribute("data-success-message") || "Request received.";

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!form.reportValidity()) {
        return;
      }

      const formData = new FormData(form);
      const body = Object.fromEntries(formData.entries());
      submitButton.disabled = true;
      submitButton.textContent = pendingLabel;
      status.textContent = "";
      status.removeAttribute("data-status");

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          mode: "cors",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          if (response.status === 400) {
            throw new Error("invalid_request");
          }
          throw new Error("unavailable");
        }

        form.reset();
        status.textContent = successMessage;
        status.setAttribute("data-status", "success");
      } catch (error) {
        status.textContent =
          error instanceof Error && error.message === "invalid_request"
            ? "Check the form fields and try again."
            : "Request could not be sent. Please try again later.";
        status.setAttribute("data-status", "error");
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = defaultLabel;
      }
    });
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
      if (hoverShotState === state && activeShotState === state) {
        return;
      }

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

    const applyShotTargetFromEvent = (event) => {
      const zone = event.target.closest("[data-shot-target]");
      if (!(zone instanceof HTMLElement)) {
        return;
      }

      const state = zone.getAttribute("data-shot-target");
      if (state) {
        applyHoverState(state);
      }
    };

    shotCopyRail.addEventListener("pointerover", applyShotTargetFromEvent);
    shotCopyRail.addEventListener("pointermove", applyShotTargetFromEvent);
    shotCopyRail.addEventListener("mouseover", applyShotTargetFromEvent);
    shotCopyRail.addEventListener("mousemove", applyShotTargetFromEvent);

    productRail.addEventListener("pointermove", (event) => {
      if (event.target.closest("[data-shot-target]")) {
        return;
      }

      if (hoverShotState) {
        clearHoverState();
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
      const frameInterval = 1000 / 15;
      const phasePerMillisecond = 0.0003;
      let animationFrame = 0;
      let frameTimer = 0;
      let resizeTimer = 0;
      let phase = 1.4;
      let lastFrameTime = 0;
      let canvasIsVisible = true;
      let width = 1;
      let height = 1;
      let palette;
      let haze;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

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

      function refreshDrawingResources() {
        const styles = getComputedStyle(root);
        palette = {
          cool: styles.getPropertyValue("--accent-cool").trim() || "#18d0b0",
          hot: styles.getPropertyValue("--accent-hot").trim() || "#ff7443",
        };

        haze = context.createRadialGradient(
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
      }

      function resizeCanvas() {
        const rect = thermalCanvas.getBoundingClientRect();
        const scale = Math.min(window.devicePixelRatio || 1, 1);
        width = Math.max(1, rect.width);
        height = Math.max(1, rect.height);
        thermalCanvas.width = Math.max(1, Math.floor(rect.width * scale));
        thermalCanvas.height = Math.max(1, Math.floor(rect.height * scale));
        context.setTransform(scale, 0, 0, scale, 0, 0);
        refreshDrawingResources();
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
        for (let x = 0; x <= width; x += 4) {
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

      function render(localPhase) {
        context.clearRect(0, 0, width, height);
        context.fillStyle = haze;
        context.fillRect(0, 0, width, height);

        drawWave(
          width,
          height,
          height * 0.42,
          28,
          0.008,
          localPhase,
          colorWithAlpha(palette.cool, 0.2),
          2,
        );
        drawWave(
          width,
          height,
          height * 0.47,
          38,
          0.005,
          localPhase * 0.82 + 1.2,
          colorWithAlpha(palette.hot, 0.14),
          1.5,
        );
        drawWave(
          width,
          height,
          height * 0.52,
          24,
          0.012,
          localPhase * 1.3 + 2.4,
          colorWithAlpha(palette.cool, 0.08),
          1,
        );
      }

      function shouldAnimate() {
        return (
          canvasIsVisible &&
          document.visibilityState === "visible" &&
          !reducedMotion.matches
        );
      }

      function stopAnimation() {
        if (frameTimer) {
          window.clearTimeout(frameTimer);
          frameTimer = 0;
        }
        if (animationFrame) {
          window.cancelAnimationFrame(animationFrame);
          animationFrame = 0;
        }
        lastFrameTime = 0;
      }

      function scheduleAnimation() {
        if (!shouldAnimate() || frameTimer || animationFrame) {
          return;
        }

        frameTimer = window.setTimeout(() => {
          frameTimer = 0;
          animationFrame = window.requestAnimationFrame(animate);
        }, frameInterval);
      }

      function animate(timestamp) {
        animationFrame = 0;
        if (!shouldAnimate()) {
          stopAnimation();
          return;
        }

        if (lastFrameTime) {
          phase += (timestamp - lastFrameTime) * phasePerMillisecond;
        }
        lastFrameTime = timestamp;
        render(phase);
        scheduleAnimation();
      }

      function updateAnimationState() {
        if (shouldAnimate()) {
          scheduleAnimation();
        } else {
          stopAnimation();
        }
      }

      function handleResize() {
        if (resizeTimer) {
          window.clearTimeout(resizeTimer);
        }
        resizeTimer = window.setTimeout(() => {
          resizeTimer = 0;
          resizeCanvas();
          render(reducedMotion.matches ? 1.4 : phase);
        }, 100);
      }

      function handleReducedMotionChange() {
        stopAnimation();
        render(reducedMotion.matches ? 1.4 : phase);
        updateAnimationState();
      }

      resizeCanvas();
      render(reducedMotion.matches ? 1.4 : phase);
      updateAnimationState();

      window.addEventListener("resize", handleResize);
      document.addEventListener("visibilitychange", updateAnimationState);
      root.addEventListener("mactc-theme-change", () => {
        refreshDrawingResources();
        render(reducedMotion.matches ? 1.4 : phase);
      });
      if (typeof reducedMotion.addEventListener === "function") {
        reducedMotion.addEventListener("change", handleReducedMotionChange);
      } else if (typeof reducedMotion.addListener === "function") {
        reducedMotion.addListener(handleReducedMotionChange);
      }

      if ("IntersectionObserver" in window) {
        const canvasObserver = new IntersectionObserver((entries) => {
          canvasIsVisible = entries.some((entry) => entry.isIntersecting);
          updateAnimationState();
        });
        canvasObserver.observe(thermalCanvas);
      }

      window.addEventListener("pagehide", stopAnimation);
      window.addEventListener("pageshow", () => {
        render(reducedMotion.matches ? 1.4 : phase);
        updateAnimationState();
      });
    }
  }

  const revealElements = Array.from(document.querySelectorAll(".reveal"));
  const reducedRevealMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  const finishReveal = (el) => {
    el.classList.add("is-visible");
    el.style.transform = "";
    el.style.willChange = "";
  };

  if (reducedRevealMotion.matches || !("IntersectionObserver" in window)) {
    revealElements.forEach(finishReveal);
    return;
  }

  const revealStartCutoff = window.innerHeight * 0.88;

  const prepareReveal = (el) => {
    const rect = el.getBoundingClientRect();
    const startsInView = rect.top < revealStartCutoff && rect.bottom > 0;
    if (startsInView) {
      finishReveal(el);
      return false;
    }

    el.style.transform = "translateY(18px)";
    el.style.willChange = "transform";
    return true;
  };

  const playReveal = (el) => {
    if (el.classList.contains("is-visible")) {
      return;
    }

    const from = { transform: "translateY(18px)" };
    finishReveal(el);

    if (typeof el.animate === "function") {
      el.animate([from, { transform: "translateY(0)" }], {
        duration: 520,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        fill: "none",
      });
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          playReveal(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
  );

  revealElements.forEach((el) => {
    if (prepareReveal(el)) {
      observer.observe(el);
    }
  });
})();
