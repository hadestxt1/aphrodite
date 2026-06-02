# BORF on Base — A Simple Onchain Story

A one-page interactive educational microsite created as a BORF Writing Contest submission for X.

The site explains BORF in the Base ecosystem through a human, beginner-friendly lens. It keeps the focus on education, community content, Base awareness, and onchain participation instead of speculation or unsupported claims.

## Project purpose

This project is meant to be a creative alternative to a normal X thread. It turns the contest entry into a small editorial-style microsite with:

- A simple BORF and Base explainer
- Interactive three-step awareness flow
- Mini quiz for beginner concepts
- Share-to-X contest button
- Copy page link button
- Scroll progress and reveal animations
- Mobile-first dark mode design

## Files

- `index.html` — Page content, SEO meta tags, Open Graph tags, and site structure
- `style.css` — Visual design, responsive layout, animation, and accessibility-friendly states
- `script.js` — Scroll progress, reveal animation, share button, copy link, step interaction, and quiz logic
- `README.md` — Setup, editing, deployment, and contest submission notes

## How to edit content

Most visible text is inside `index.html`. Open the file and edit section copy directly.

Common edits:

- Hero title and intro: edit the `<section class="hero">` block
- Summary cards: edit the `#summary` section
- BORF explanation: edit the `#what-is-borf` section
- Base explanation: edit the `#base` section
- Personal perspective: edit the `#perspective` section
- Takeaways: edit the `.takeaway-list` items

Quiz questions and interactive step text are stored in `script.js`:

- `stepContent` controls the three-step BORF awareness visual
- `quiz` controls the three quiz questions, answers, correct choices, and feedback
- `shareText` controls the text used by the X share button

## How to change X and GitHub links

Footer social links are in `index.html` near the bottom:

```html
<a href="https://x.com/aphroditte17">X</a>
<a href="https://github.com/hadestxt1">GitHub</a>
```

Replace those URLs with your own links if needed.

The X share text is in `script.js`:

```js
const shareText = 'I created a simple educational microsite about BORF ...';
```

Edit the text, hashtags, or tagged accounts there.

## How to deploy to GitHub Pages

1. Push this repository to GitHub.
2. Open the repository on GitHub.
3. Go to **Settings** → **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the branch you want to publish, usually `main`.
6. Select the root folder `/`.
7. Save.
8. GitHub will provide a Pages URL after the deployment finishes.

Because this project uses only static HTML, CSS, and JavaScript, no build step is required.

## How to submit as a contest entry

1. Deploy the microsite to GitHub Pages.
2. Open the live page and test the quiz, share button, copy button, and mobile layout.
3. Click **Share on X** or create your own X post.
4. Include the live GitHub Pages link.
5. Include the contest hashtags:
   - `#BORF`
   - `#BORFWRITINGCONTEST`
   - `#BORFBASE`
   - `#BaseEcosystem`
   - `#Onchain`
6. Tag:
   - `@BORFSTRATEGY`
   - `@base`
   - `@asal_alizade`

## Local preview

You can open `index.html` directly in a browser, or run a tiny local server:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```
