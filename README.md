# Lorenzo Ginyard — Finance × Technology × Systems

Personal portfolio and publishing platform connecting financial operations, software, data, cloud systems, and fintech.

**Portfolio:** [lorenzoginyard.com](https://lorenzoginyard.com)  
**GitHub:** [github.com/lnginyard](https://github.com/lnginyard)  
**AICPE engine:** [AI-Cascade-Prevention-Engine](https://github.com/lnginyard/AI-Cascade-Prevention-Engine)  
**AICPE dashboard:** [Cascade-Prevention-App](https://github.com/lnginyard/Cascade-Prevention-App)

## Site structure

The GitHub Pages entry point is at the repository root:

- `index.html` — semantic page structure and portfolio content
- `style.css` — responsive dark, luxury-tech visual system
- `script.js` — navigation, project filters, and fictional-data reconciliation demo
- `CNAME` — custom domain configuration

The earlier `src/` files are retained as a working/history copy; the root files are the intended static-site entry point.

## Featured work

- **Artificial Intelligence Cascade Prevention Engine (AICPE):** an early MVP foundation exploring telemetry normalization, rule-based cascade signatures, and event-driven AWS components. The companion dashboard is a simulation using local demo data; it should not be described as connected to live AWS telemetry unless that integration is implemented and verified.
- **Smart Reconciliation Workbench:** a portfolio concept demonstrating why transaction matching, missing documentation, and approval exceptions should remain traceable. The embedded demo uses fictional data and is not a live accounting system.
- **Receipt Tracking & Audit Readiness:** a real-world Excel workflow created during internal-audit support; all requested receipts were collected by the end of the audit.
- **MyCommerce:** a Django/Vue e-commerce codebase, subject to fresh-install and workflow verification.
- **InventoryGuard:** an educational Android inventory application project.
- **Artemis Financial assessment:** a coursework-based secure-software assessment report, not a professional penetration test.

## Run locally

No build tool is required for the static portfolio. Serve the repository root with any local static HTTP server, or open `index.html` in a browser. Some browser features may behave more consistently over HTTP than when opened as a local file.

## Design and accessibility

- Responsive desktop and mobile layouts
- Keyboard-visible focus states and a skip link
- Reduced-motion support
- Mobile navigation and project-category filters
- A reconciliation demo with selectable fictional transactions and explanatory exception notes

## Accuracy and privacy

This site distinguishes real-world experience, educational projects, early prototypes, and planned work. Demo data is fictional. Do not add employer confidential data, production credentials, private customer data, or secrets to this repository.

## Publishing notes

GitHub Pages should publish from the repository root because `index.html`, `style.css`, and `script.js` are now at the root and reference one another with relative paths. Confirm the Pages source and custom-domain/DNS settings in GitHub and your domain provider before assuming the site is live.
