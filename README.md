# Lorenzo Ginyard — Portfolio + The Convergence Brief

A responsive, static portfolio and publishing hub built with semantic HTML, CSS, and vanilla JavaScript. The site presents Lorenzo's finance and technology work as a polished product surface while making the underlying systems thinking visible.

## What's included
- Dark, luxury-tech visual direction
- Responsive navigation and mobile menu
- Hero, selected projects, about, operating principles, contact, and publication sections
- Interactive case-study/article preview dialogs
- Fictional-data reconciliation workbench with status filtering
- The Convergence Brief archive sourced from Markdown files
- GitHub Actions workflow that publishes one queued article every Monday
- Inquiry form that prepares an email draft without a backend
- Skip link, visible focus states, labelled controls, and reduced-motion support
- Responsive styling
- No build step required

## Preview locally
Run `python3 -m http.server 8000 --directory src`, then open `http://127.0.0.1:8000/`. The Brief archive is loaded from `src/data/brief.json`, so it should be previewed over HTTP rather than opened directly from the filesystem.

## Publishing The Convergence Brief
Articles live in `content/brief/queue/` and use Markdown frontmatter for their title, category, label, date, status, and excerpt. The weekly workflow in `.github/workflows/publish-brief.yml` moves the oldest queued article into `content/brief/published/`, rebuilds `src/data/brief.json`, and commits the update back to the repository. GitHub Pages then serves the updated archive.

To publish manually, run:

```bash
node scripts/publish-brief.mjs
node scripts/build-brief.mjs
```

Add a new `.md` file to the queue when you want to prepare a future article. The workflow can also be started manually from the repository's **Actions** tab with **Run workflow**.

## Before publishing
1. Confirm education status and graduation wording.
2. Add a professional email address and correct LinkedIn profile URL.
3. Add real repository/demo links, sanitized project screenshots, and a downloadable resume.
4. Verify all project statements and outcomes.
5. Choose and register a domain name, then connect it to your hosting provider.
6. Set up analytics, SEO/social preview metadata, and a privacy notice if collecting emails.
7. Connect newsletter and social publishing. Those integrations are not active in this starter.

## Deployment options
This static site can be hosted using GitHub Pages, Netlify, or Vercel. Upload the files or push them to a repository, then follow the host's custom-domain instructions. Registering a domain and configuring DNS require your account and approval.

## Suggested brand architecture
- Personal brand: Lorenzo Ginyard
- Publication: The Convergence Brief
- Domain idea: `lorenzoginyard.com` (availability not checked)