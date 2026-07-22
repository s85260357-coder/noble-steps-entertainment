# EmperoReal

A football talent & media website: a "subscribe first" gate, then a full site
with four help pathways (Talent, Creator, Coaching, Community), a watch
section linking to your YouTube channel, and a contact form.

No build tools required — it's plain HTML/CSS/JS, so it works as-is on
GitHub Pages.

## Files

- `index.html` — all page markup (gate screen + main site)
- `styles.css` — design system and layout
- `script.js` — gate logic, scroll reveal, form handling
- `README.md` — this file

## 1. Put it on GitHub

1. Create a new repository, e.g. `emperoreal`.
2. Add these files (`index.html`, `styles.css`, `script.js`, `README.md`)
   to the **repo root** — not inside a subfolder. GitHub Pages looks for
   `index.html` at the top level by default. Two ways to add them:

   **Option A — GitHub's website (no terminal needed)**
   1. Open your new repo on github.com.
   2. Click **Add file → Upload files**.
   3. Drag in all four files (`index.html`, `styles.css`, `script.js`,
      `README.md`) at once.
   4. Scroll down and click **Commit changes**.

   **Option B — git on your computer**
   ```bash
   git clone https://github.com/your-username/emperoreal.git
   cd emperoreal
   # copy index.html, styles.css, script.js, README.md into this folder
   git add .
   git commit -m "Add EmperoReal site"
   git push
   ```
3. Either way, refresh the repo page and confirm you see `index.html`
   sitting next to `styles.css` and `script.js` — not nested inside another
   folder.

## 2. Turn on GitHub Pages

1. In your repo, go to **Settings → Pages**.
2. Under **Source**, choose **Deploy from a branch**.
3. Pick your default branch (usually `main`) and the `/ (root)` folder.
4. Save. GitHub gives you a URL like:
   `https://your-username.github.io/emperoreal/`
   (If you name the repo `your-username.github.io`, the site lives at the
   root of that URL instead.)

It can take a minute or two to go live after the first deploy.

## Important: about the "subscribe to enter" gate

YouTube does not give a website any way to check whether a visitor actually
subscribed — there's no public API for that, and Anthropic's Claude cannot
build around that limit either. So the gate works on an **honour system**:

1. The visitor clicks **Subscribe**, which opens your channel in a new tab.
2. That click unlocks the **Enter EmperoReal** button.
3. Nothing confirms they actually subscribed — someone could close the tab
   and still get in.

This is standard for "subscribe to unlock" pages you'll see elsewhere too.
If you want something closer to real verification, the only reliable options
are:
- **YouTube Data API + Google Sign-In**: ask visitors to sign in with the
  Google account they use on YouTube, then call the API to check their
  subscriptions. This needs a backend (or serverless function) to keep your
  API credentials private, plus a Google Cloud project and OAuth consent
  screen — meaningfully more setup than a static GitHub Pages site.
- Accept the honour system. Most channels do, because the goal is usually
  to nudge genuine fans, not to lock out determined non-subscribers.

The site remembers a visitor's confirmation in their browser (`localStorage`),
so they won't see the gate again on that device.

## Wiring up the contact form

Right now the form at the bottom of the page (`#joinForm`) just shows a
"thanks" message — it doesn't send anywhere. To actually receive
submissions, pick one:

- **Formspree** (formspree.io) or **Getform** (getform.io): free tiers, no
  backend needed. Sign up, get a form endpoint URL, then set `action="..."`
  and `method="POST"` on the `<form>` in `index.html`, and remove the
  `e.preventDefault()` line in `script.js` (or follow their JS snippet).
- **A plain mailto link**: simplest option, but opens the visitor's email
  client instead of submitting quietly. Swap the form for
  `<a href="mailto:you@example.com">Email us</a>` if you'd rather keep it
  minimal.

## Customizing

- **Channel link**: search `UCEkxk8DMzmjtTJ3WmI_73VQ` in `index.html` and
  replace if it ever changes.
- **Colors / fonts**: all defined as CSS variables at the top of
  `styles.css` under `:root`.
- **Copy**: every section in `index.html` is plain text — safe to rewrite
  without touching the CSS or JS.
- **Embedding actual videos**: replace the placeholder panel inside
  `#watch` with a YouTube `<iframe>` embed for a specific video, e.g.:
  ```html
  <iframe width="560" height="315"
    src="https://www.youtube.com/embed/VIDEO_ID"
    title="YouTube video" frameborder="0" allowfullscreen></iframe>
  ```

## Accessibility & performance notes already built in

- Keyboard focus is visible on all buttons and form fields.
- Animations are disabled automatically for visitors with
  `prefers-reduced-motion` set.
- No external JS frameworks — just two Google Fonts requests and native
  browser APIs.
