/* ==========================================================================
   KYARA EYRE | WILLIAMS LUXURY HOMES
   consent.js — cookie consent banner + tracking-script gate.
   Plain JavaScript, no libraries. Loads on every page.

   HOW THIS WORKS
   1. On first visit, a banner appears offering Accept / Decline for
      non-essential cookies (analytics, advertising, etc.).
   2. The visitor's choice is saved in localStorage as "kyara-cookie-consent"
      ("accepted" or "declined") so the banner does not reappear.
   3. Nothing in the "GATED TRACKING SCRIPTS" section below runs unless
      the stored value is "accepted". This site ships with NO analytics
      or advertising scripts installed — the gate exists so anything
      added later (Google Analytics, Meta Pixel, etc.) only loads after
      consent, as required by the privacy policy in privacy.html.
   ========================================================================== */
(function () {
  "use strict";

  var STORAGE_KEY = "kyara-cookie-consent";
  var banner, acceptBtn, declineBtn;

  function getConsent() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      // Private browsing / storage blocked: treat as no stored choice.
      return null;
    }
  }

  function setConsent(value) {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      /* If storage is unavailable, the banner will simply reappear next visit. */
    }
  }

  function hideBanner() {
    if (banner) banner.classList.remove("is-visible");
  }

  function showBanner() {
    if (banner) banner.classList.add("is-visible");
  }

  /* -----------------------------------------------------------
     GATED TRACKING SCRIPTS
     Paste any analytics/advertising snippet inside loadTrackingScripts().
     It only ever runs after the visitor clicks "Accept" (this session
     or a previous one). Leave empty until you have something to add.
     ----------------------------------------------------------- */
  function loadTrackingScripts() {
    // Example (commented out on purpose):
    //
    // var ga = document.createElement("script");
    // ga.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX";
    // ga.async = true;
    // document.head.appendChild(ga);
    // window.dataLayer = window.dataLayer || [];
    // function gtag(){ dataLayer.push(arguments); }
    // gtag("js", new Date());
    // gtag("config", "G-XXXXXXX");
  }

  function buildBanner() {
    banner = document.createElement("div");
    banner.className = "cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-live", "polite");
    banner.setAttribute("aria-label", "Cookie consent");
    banner.innerHTML =
      '<p>This site uses cookies for essential functionality and, only with your permission, for analytics that help us understand how visitors use the site. You can change your mind anytime by clearing your browser data. See our <a href="/privacy.html" class="text-link" style="text-transform:none;letter-spacing:normal;font-weight:500;">Privacy &amp; Cookie Policy</a>.</p>' +
      '<div class="cookie-banner-actions">' +
        '<button type="button" class="btn" data-consent="accept">Accept</button>' +
        '<button type="button" class="btn btn-outline" data-consent="decline">Decline</button>' +
      "</div>";
    document.body.appendChild(banner);

    acceptBtn = banner.querySelector('[data-consent="accept"]');
    declineBtn = banner.querySelector('[data-consent="decline"]');

    acceptBtn.addEventListener("click", function () {
      setConsent("accepted");
      hideBanner();
      loadTrackingScripts();
    });
    declineBtn.addEventListener("click", function () {
      setConsent("declined");
      hideBanner();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    buildBanner();
    var existing = getConsent();
    if (existing === "accepted") {
      loadTrackingScripts();
    } else if (existing === null) {
      // No stored choice yet — show the banner on this first visit.
      showBanner();
    }
    // If existing === "declined", the banner stays hidden and nothing loads.
  });
})();
