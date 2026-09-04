/* ==========================================================================
   KYARA EYRE | WILLIAMS LUXURY HOMES
   main.js: mobile navigation, sticky header shadow, scroll-triggered
   reveals, smooth anchor scrolling, and a simple photo lightbox.
   Plain JavaScript, no libraries or frameworks. Every effect here is
   purely visual: all page content lives in the HTML and is fully
   present and readable if JavaScript is off, so nothing is hidden
   from visitors or from search/AI crawlers.
   ========================================================================== */
(function () {
  "use strict";

  /* -----------------------------------------------------------
     1. Mobile navigation toggle
     ----------------------------------------------------------- */
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // Close the mobile menu after a link is tapped
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* -----------------------------------------------------------
     1b. Communities dropdown (click-to-toggle, works alongside
         the CSS :hover/:focus-within behavior on desktop)
     ----------------------------------------------------------- */
  document.querySelectorAll(".has-dropdown > .dropdown-toggle").forEach(function (toggle) {
    toggle.addEventListener("click", function (e) {
      var parent = toggle.closest(".has-dropdown");
      var isOpen = parent.classList.contains("is-open");
      // Close any other open dropdowns first
      document.querySelectorAll(".has-dropdown.is-open").forEach(function (el) {
        if (el !== parent) el.classList.remove("is-open");
      });
      if (window.innerWidth <= 760) {
        e.preventDefault();
        parent.classList.toggle("is-open", !isOpen);
      }
    });
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".has-dropdown")) {
      document.querySelectorAll(".has-dropdown.is-open").forEach(function (el) {
        el.classList.remove("is-open");
      });
    }
  });

  /* -----------------------------------------------------------
     2. Sticky header shadow on scroll
     ----------------------------------------------------------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 12) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* -----------------------------------------------------------
     3. Scroll-triggered fade + rise reveals
     All .reveal elements are visible by default (see CSS) unless
     JS runs, at which point IntersectionObserver progressively
     reveals them. Crawlers and no-JS visitors always see full content.
     ----------------------------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      // Generous rootMargin so content well below the fold is already
      // marked visible before a visitor (or a crawler that doesn't
      // scroll) ever reaches it.
      { threshold: 0.01, rootMargin: "0px 0px 600px 0px" }
    );
    revealEls.forEach(function (el) { observer.observe(el); });

    // Safety net: a single-shot renderer/crawler that never scrolls, or
    // any edge case where the observer doesn't fire, must still end up
    // with fully visible content. Force-reveal anything still hidden a
    // couple seconds after load so nothing stays permanently hidden.
    window.setTimeout(function () {
      document.querySelectorAll(".reveal:not(.is-visible)").forEach(function (el) {
        el.classList.add("is-visible");
      });
    }, 2000);
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* -----------------------------------------------------------
     4. Smooth anchor scrolling (for browsers without CSS support,
        and to account for the sticky header height)
     ----------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (!id || id === "#" || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var navHeight = header ? header.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
      window.scrollTo({ top: top, behavior: "smooth" });
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });

  /* -----------------------------------------------------------
     5. Simple photo lightbox
     Markup pattern:
       <div class="gallery-grid">
         <button class="gallery-item" data-lightbox-caption="Caption text">
           <div class="placeholder-img">...</div>
         </button>
       </div>
       <div class="lightbox-overlay" id="lightbox">
         <button class="lightbox-close" aria-label="Close">&times;</button>
         <div class="lightbox-content"><div id="lightbox-body"></div></div>
       </div>
     ----------------------------------------------------------- */
  var lightbox = document.getElementById("lightbox");
  if (lightbox) {
    var lightboxBody = document.getElementById("lightbox-body");
    var closeBtn = lightbox.querySelector(".lightbox-close");
    var prevBtn = lightbox.querySelector(".lightbox-prev");
    var nextBtn = lightbox.querySelector(".lightbox-next");
    var galleryItems = Array.prototype.slice.call(document.querySelectorAll(".gallery-item"));
    var currentIndex = 0;

    var renderLightbox = function (index) {
      var item = galleryItems[index];
      var caption = item.getAttribute("data-lightbox-caption") || "";
      var html = item.querySelector(".placeholder-img")
        ? item.querySelector(".placeholder-img").outerHTML
        : "";
      lightboxBody.innerHTML = html + (caption ? '<p style="margin-top:1rem;color:#cfc9c0;font-size:0.85rem;">' + caption + "</p>" : "");
    };

    var openLightbox = function (item) {
      currentIndex = galleryItems.indexOf(item);
      renderLightbox(currentIndex);
      lightbox.classList.add("is-open");
      lightbox.classList.toggle("has-nav", galleryItems.length > 1);
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    };

    var closeLightbox = function () {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
    };

    var showNext = function () {
      if (!galleryItems.length) return;
      currentIndex = (currentIndex + 1) % galleryItems.length;
      renderLightbox(currentIndex);
    };

    var showPrev = function () {
      if (!galleryItems.length) return;
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      renderLightbox(currentIndex);
    };

    galleryItems.forEach(function (item) {
      item.addEventListener("click", function () { openLightbox(item); });
    });
    closeBtn.addEventListener("click", closeLightbox);
    if (nextBtn) nextBtn.addEventListener("click", function (e) { e.stopPropagation(); showNext(); });
    if (prevBtn) prevBtn.addEventListener("click", function (e) { e.stopPropagation(); showPrev(); });
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    });
  }

  /* -----------------------------------------------------------
     6. Instagram carousel: prev/next arrows scroll the track.
        Native horizontal scroll/swipe already works without JS;
        this just makes the arrow buttons drive the same scroll.
     ----------------------------------------------------------- */
  document.querySelectorAll(".instagram-carousel").forEach(function (carousel) {
    var track = carousel.querySelector(".instagram-track");
    var prevBtn = carousel.querySelector(".instagram-arrow.prev");
    var nextBtn = carousel.querySelector(".instagram-arrow.next");
    if (!track) return;

    var scrollByTile = function (direction) {
      var tile = track.querySelector(".instagram-tile");
      var amount = tile ? tile.getBoundingClientRect().width + 24 : track.clientWidth * 0.8;
      track.scrollBy({ left: direction * amount, behavior: "smooth" });
    };

    if (prevBtn) prevBtn.addEventListener("click", function () { scrollByTile(-1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { scrollByTile(1); });
  });

  /* -----------------------------------------------------------
     7. Listings page tabs: Current / Sold / Rentals.
        Every tab's listings live in the page's HTML from the start;
        this just shows one panel at a time and lets a link land
        directly on a tab via a #sold or #rentals hash.
     ----------------------------------------------------------- */
  var tabButtons = document.querySelectorAll(".listing-tab-btn");
  var tabPanels = document.querySelectorAll(".listing-tab-panel");

  if (tabButtons.length && tabPanels.length) {
    var activateTab = function (name) {
      var found = false;
      tabPanels.forEach(function (panel) {
        var isMatch = panel.getAttribute("data-tab-panel") === name;
        panel.classList.toggle("is-active", isMatch);
        if (isMatch) found = true;
      });
      if (!found) return;
      tabButtons.forEach(function (btn) {
        var isMatch = btn.getAttribute("data-tab") === name;
        btn.classList.toggle("is-active", isMatch);
        btn.setAttribute("aria-selected", isMatch ? "true" : "false");
      });
    };

    tabButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        activateTab(btn.getAttribute("data-tab"));
      });
    });

    var initialTab = window.location.hash.replace("#", "");
    if (initialTab && document.querySelector('.listing-tab-panel[data-tab-panel="' + initialTab + '"]')) {
      activateTab(initialTab);
    }
  }

  /* -----------------------------------------------------------
     8. Hero background carousel: each photo shows for a fixed
        duration, and each video plays out its full natural length
        before the carousel advances to the next slide. Without
        JavaScript, the CSS-only fixed-timing cycle in styles.css
        (.hero-carousel .hero-slide / @keyframes heroSlideCycle)
        keeps every slide visible on a simple timer instead.
     ----------------------------------------------------------- */
  document.querySelectorAll(".hero-carousel").forEach(function (carousel) {
    var slides = Array.prototype.slice.call(carousel.querySelectorAll(".hero-slide"));
    if (slides.length < 2) return;

    carousel.classList.add("js-carousel");

    var PHOTO_DURATION = 6000;
    var VIDEO_SAFETY_TIMEOUT = 20000; // in case a video never fires "ended"
    var current = 0;
    var advanceTimer = null;

    var goTo = function (index) {
      window.clearTimeout(advanceTimer);

      var prevSlide = slides[current];
      var prevVideo = prevSlide.querySelector("video");
      if (prevVideo) prevVideo.pause();
      prevSlide.classList.remove("is-active");

      current = index % slides.length;
      var slide = slides[current];
      slide.classList.add("is-active");

      /* Get a head start on the NEXT slide's video (if any) as soon as
         this slide becomes active, so it has this slide's full display
         time to download in the background instead of stalling the
         moment it's needed. Paired with preload="none" in the HTML,
         this means only the current/upcoming video is ever being
         fetched, instead of every video in the carousel downloading
         at once on page load. */
      var nextVideo = slides[(current + 1) % slides.length].querySelector("video");
      if (nextVideo && nextVideo.preload !== "auto") {
        nextVideo.preload = "auto";
        nextVideo.load();
      }

      var video = slide.querySelector("video");
      if (video) {
        var advanced = false;
        var advanceOnce = function () {
          if (advanced) return;
          advanced = true;
          goTo(current + 1);
        };
        video.currentTime = 0;
        var playPromise = video.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(function () { /* autoplay blocked; safety timeout below still advances */ });
        }
        video.addEventListener("ended", advanceOnce, { once: true });
        advanceTimer = window.setTimeout(advanceOnce, VIDEO_SAFETY_TIMEOUT);
      } else {
        advanceTimer = window.setTimeout(function () { goTo(current + 1); }, PHOTO_DURATION);
      }
    };

    goTo(0);
  });
})();
