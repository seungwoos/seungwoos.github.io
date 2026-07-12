# seungwoos.github.io

Personal homepage and blog. Built with Next.js (static export) and deployed to
GitHub Pages — pushing to `main` triggers the deploy workflow automatically.

## Development

```bash
pnpm install
pnpm dev     # dev server at http://localhost:3000
pnpm build   # static export to out/
```

No environment variables or secrets are required.

## Project structure

```
app/
  layout.tsx          # root layout: fonts, header/footer, theme
  page.tsx            # homepage: name, links, bio, recent posts
  post/               # /post (list) and /post/[slug] (article) pages
  globals.css         # all shared styles; .site-container controls page width
components/           # Header, Footer, Markdown renderer, theme toggle, ...
lib/
  profile.ts          # homepage content: name, links, email, bio, photo
  posts.ts            # reads content/posts/*.md at build time
content/posts/        # blog posts (Markdown, committed to the repo)
public/               # static assets (images, favicon, ...)
.github/workflows/
  deploy.yaml         # build + deploy to GitHub Pages on push to main
```

## Writing a post

Add a Markdown file to `content/posts/`. The file name becomes the URL:
`content/posts/my-post.md` → `/post/my-post`.

Each file needs this frontmatter:

```markdown
---
title: "Post title"
date: "2026-07-12"        # YYYY-MM-DD, used for sorting (newest first)
description: "One-line summary shown under the title on the homepage."
---

Post body here.
```

- **Markdown** — GitHub-flavored Markdown is supported (tables, task lists,
  strikethrough, code blocks).
- **Images** — put files in `public/images/` and reference them as
  `![alt](/images/foo.png)`.
- **Math** — KaTeX renders at build time: `$e^{i\pi} + 1 = 0$` inline, or
  `$$ ... $$` for display equations.

## Editing the homepage

All intro content (name, links, email, bio, profile photo) lives in
`lib/profile.ts`. Site-wide page width is `.site-container` in
`app/globals.css`.
