# Kyara Eyre — Website: How to Use This Folder

This is your complete website: plain HTML and CSS files, no software to install, no database, no monthly platform fee. You (or anyone comfortable editing text) can open any `.html` file in a text editor, change the words, and save it. This guide explains what every file does and exactly where to look when you want to change something.

**Before you publish:** this site is content-complete but has a handful of things only you can finish — placeholder photos, one legal review, and a small number of facts flagged `[VERIFY]`. See "Before You Go Live" at the bottom of this file for the full checklist.

---

## 1. The Big Picture

- Every page is its own `.html` file. Open it in any text editor (even Notepad or TextEdit) to change words.
- All the *design* — colors, fonts, spacing, button styles — lives in **one file**: `css/styles.css`. Change a color there once, and it updates on every page automatically.
- All the *behavior* — the mobile menu, the "Communities" dropdown, the cookie banner, the photo lightbox — lives in two small files inside the `js/` folder.
- There is no server and no database. The contact form on `contact.html` needs to be connected to an email/form service before it will actually send you messages — see the note in that section below.

## 2. Folder Map

```
/
├── index.html                 Home page
├── about.html                 About Kyara
├── contact.html                Contact page + form
├── privacy.html                 Privacy & Cookie Policy
├── favicon.svg / favicon.ico    Browser-tab icon (KE monogram)
├── robots.txt                   Tells search engines & AI crawlers they're welcome
├── sitemap.xml                  List of every page, for search engines
├── llms.txt                     Plain-language summary of the site, for AI assistants
├── css/
│   └── styles.css               ALL design/colors/fonts/layout — one file controls the whole site
├── js/
│   ├── main.js                  Mobile menu, dropdown, sticky nav, scroll animations, photo lightbox
│   └── consent.js               Cookie consent banner + where to paste analytics code later
├── assets/images/
│   ├── logo.png                 Your Williams Luxury Homes logo
│   └── kyara-headshot.jpg       Your headshot
├── areas/
│   ├── paradise-valley.html
│   ├── north-scottsdale.html
│   ├── central-scottsdale.html
│   ├── arcadia.html
│   └── north-phoenix.html
└── blog/
    ├── index.html                Blog listing page
    ├── how-much-does-a-home-cost-in-north-scottsdale-2026.html
    ├── moving-to-paradise-valley-relocation-guide.html
    ├── paradise-valley-vs-north-scottsdale.html
    ├── how-long-to-close-on-a-luxury-home-in-scottsdale.html
    ├── arcadia-vs-central-scottsdale.html
    └── buying-in-a-gated-golf-community-north-scottsdale.html
```

## 3. Common Changes — Where to Go

| I want to change... | Go to... |
|---|---|
| My phone number or email | It appears on **every page** in the footer, and again on `contact.html` and at the end of each blog post. Easiest method: use your text editor's "Find in Files" / "Find and Replace across folder" feature to replace `708-714-2896` or `kyara@williamsluxuryhomes.com` everywhere at once. |
| My brand colors | `css/styles.css`, right near the top, inside the `:root { ... }` block. The five hex codes are labeled `--color-black`, `--color-white`, `--color-sand`, `--color-taupe`, `--color-bronze`. |
| My fonts | Same `:root` block in `css/styles.css` — `--font-serif` (Cormorant Garamond, used for headlines) and `--font-sans` (Montserrat, used for body text and navigation). |
| My logo | Replace the file `assets/images/logo.png` with a new file of the *same name* and it updates everywhere automatically. |
| My headshot | Replace `assets/images/kyara-headshot.jpg` the same way. |
| My bio | `about.html` — the paragraphs are in plain sentences, easy to find and edit. |
| A testimonial | `index.html` — search for `testimonial` — and add more `<blockquote>` blocks in the same style if you get additional reviews. |
| Area page content (prices, subdivisions, etc.) | The matching file inside `areas/` — e.g. `areas/paradise-valley.html`. |
| A blog post | The matching file inside `blog/`. |
| Adding a new blog post | Copy an existing file in `blog/`, rename it, change the title/date/content, and add a link to it in `blog/index.html` and in `sitemap.xml`. |
| The Equal Housing Opportunity / license line in the footer | Search any page for `Equal Housing Opportunity` — it's identical on every page, so use Find-and-Replace across the folder if you need to change the license number later. |

## 4. Placeholder Photos — Full List

Every spot that needs a real photo is a labeled dashed box (search any file for `placeholder-img` to find them in the code, or just look at the pages — they're the tan-striped boxes with instructions written inside). Here is the complete list of what to shoot or source and where it goes:

**Home page (`index.html`):**
- Hero: twilight exterior of a luxury Scottsdale-area listing, wide shot with mountain backdrop
- 5 small community photos (one per area card): Paradise Valley, North Scottsdale, Central Scottsdale, Arcadia, North Phoenix
- 3 "Portfolio" gallery photos: a listing exterior, a kitchen, a backyard pool at sunset

**Each area page (`areas/*.html`):**
- 1 wide hero photo specific to that community
- 3 gallery photos specific to that community (see the `data-lightbox-caption` text in each file for exactly what's wanted)

**Each blog post (`blog/*.html`):**
- 1 hero photo related to that post's topic

**Contact page (`contact.html`):**
- A Google Maps embed of the office address (currently a placeholder box — see the "Map" note below)

To swap a placeholder for a real photo: replace the `<div class="placeholder-img">...</div>` block with an `<img src="..." alt="...">` tag pointing at your photo file. Keep photo files inside `assets/images/` and give them descriptive names (e.g. `paradise-valley-hero.jpg`).

**Map embed:** Go to Google Maps, search your office address, click Share → Embed a map, and paste the provided `<iframe>` code in place of the placeholder box on `contact.html`.

## 5. Items Marked `[VERIFY]`

Throughout the area pages and blog posts, a small tan **VERIFY** tag appears next to a handful of statements — pricing nuances, HOA/club fee generalities, zoning specifics, and typical closing timelines. These were included because they're standard, general knowledge about these communities and about real estate transactions, but they were **not facts you gave me directly**, so they should not go live until you (or your broker/lender/title contact) confirm them. Search any file for `verify-flag` to jump straight to them. Files containing at least one VERIFY item:

- `areas/paradise-valley.html`
- `areas/north-scottsdale.html`
- `areas/central-scottsdale.html`
- `areas/arcadia.html`
- `areas/north-phoenix.html`
- `blog/how-much-does-a-home-cost-in-north-scottsdale-2026.html`
- `blog/moving-to-paradise-valley-relocation-guide.html`
- `blog/paradise-valley-vs-north-scottsdale.html`
- `blog/how-long-to-close-on-a-luxury-home-in-scottsdale.html`
- `blog/arcadia-vs-central-scottsdale.html`
- `blog/buying-in-a-gated-golf-community-north-scottsdale.html`

Once you've confirmed a fact, just delete the `<span class="verify-flag">VERIFY</span>` tag next to it (leave the sentence itself, or edit it to match what you've confirmed).

## 6. The Testimonial

The one testimonial you provided appears on `index.html`, lightly cleaned up for grammar and clarity — no claims were added or changed. It's currently credited as "Verified Client" since no name was provided. If you'd like it attributed by name, initials, or general location (e.g. "— J.M., Paradise Valley Buyer"), search `index.html` for `<cite>` and update it. When you get 1-2 more testimonials, copy the same `<div class="testimonial">` block and add them.

## 7. The Contact Form

`contact.html` has a real-looking contact form, but **this site has no server or database**, so as built the form does not actually send anywhere. Before you publish, do one of the following:
1. Sign up for a free/low-cost form service (Formspree, Basin, and similar are common options) and paste the URL they give you into the form's `action="..."` attribute in `contact.html`, or
2. Replace the submit button with a `mailto:` link.

There's a comment in the code right above the `<form>` tag in `contact.html` marking exactly where to make this change.

## 8. Cookie Banner & Analytics

The cookie consent banner (bottom-left popup on first visit) is already working — it remembers a visitor's choice and currently blocks nothing because **no analytics or tracking scripts are installed yet**. When you're ready to add Google Analytics, a Meta Pixel, or similar:

1. Open `js/consent.js`.
2. Find the `loadTrackingScripts()` function near the top — it's clearly commented.
3. Paste your tracking snippet inside that function.

It will then only run after a visitor clicks "Accept" on the cookie banner, which is what your Privacy Policy promises.

## 9. Legal Note on `privacy.html`

The Privacy & Cookie Policy is a **general template, not legal advice**. Please have it reviewed by an attorney familiar with Arizona and applicable federal requirements before the site goes live, especially if you plan to add analytics, advertising pixels, or start collecting information beyond the basic contact form.

## 10. Fair Housing

Every page was written to describe places and properties — never residents, buyer types, or demographics — in keeping with Fair Housing law. If you or anyone editing this site later adds new copy, keep that same rule: describe the home, the lot, the amenities, and the neighborhood, never who might "fit" there.

## 11. AEO / AI Visibility Files

- `robots.txt` explicitly welcomes search engines and AI crawlers (Googlebot, GPTBot, ClaudeBot, PerplexityBot, Google-Extended, and others).
- `sitemap.xml` lists every page so search engines can find them all.
- `llms.txt` is a plain-text summary of your credentials and service areas, written specifically for AI assistants (like ChatGPT, Claude, and Perplexity) to read when someone asks them a question about Scottsdale-area real estate.
- Every page includes structured data (invisible to visitors, read by search engines and AI) confirming your name, license, brokerage, and service areas. You don't need to edit this unless your license number, name, or brokerage changes — if so, use Find-and-Replace across the whole folder for `SA703476000`, `Kyara Eyre`, or `Williams Luxury Homes`.

## 12. Before You Go Live — Checklist

- [ ] Replace all placeholder photo boxes with real images (see section 4)
- [ ] Add the Google Maps embed on `contact.html` (see section 4)
- [ ] Connect the contact form to a real email/form service (see section 7)
- [ ] Review and resolve every `[VERIFY]` item (see section 5)
- [ ] Have `privacy.html` reviewed by an attorney (see section 9)
- [ ] Decide whether to attribute the testimonial by name (see section 6)
- [ ] Buy/point the domain **kyaraeyre.com** to wherever you host these files, and upload the whole folder keeping the same structure
- [ ] Once live, submit `sitemap.xml` to Google Search Console and Bing Webmaster Tools

---

If you get stuck on any of this, any web developer (or a future session with Claude) can open this same folder and make changes quickly — everything is organized and commented specifically so that's easy to do.
