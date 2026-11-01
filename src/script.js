
(() => {
  "use strict";

  const $ = (selector, root = document) =>
    root.querySelector(selector);

  const $$ = (selector, root = document) =>
    [...root.querySelectorAll(selector)];

  // Update the copyright year
  const year = $("#year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Mobile navigation
  const menuButton = $(".menu-toggle");
  const nav = $("#primary-nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");

      menuButton.setAttribute("aria-expanded", String(isOpen));

      const menuLabel = $("span", menuButton);
      if (menuLabel) {
        menuLabel.textContent = isOpen ? "−" : "＋";
      }
    });

    $$("a", nav).forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");

        const menuLabel = $("span", menuButton);
        if (menuLabel) {
          menuLabel.textContent = "＋";
        }
      });
    });
  }

  // Portfolio project filters
  const filterButtons = $$(".filter");
  const projectCards = $$(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter || "all";

      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });

      projectCards.forEach((card) => {
        const category = card.dataset.category || "";
        const matches =
          selectedFilter === "all" ||
          category.split(/\s+/).includes(selectedFilter);

        card.hidden = !matches;
      });
    });
  });

  // Interactive reconciliation workbench demo
  const transactions = [
    {
      id: "TXN-1001",
      date: "2026-09-02",
      description: "Office supplies",
      amount: 248.75,
      status: "matched",
      note: "Amount and reference match."
    },
    {
      id: "TXN-1002",
      date: "2026-09-03",
      description: "Software subscription",
      amount: 129.00,
      status: "matched",
      note: "Vendor and amount match."
    },
    {
      id: "TXN-1003",
      date: "2026-09-05",
      description: "Travel reimbursement",
      amount: 485.20,
      status: "review",
      note: "Supporting documentation needs review."
    },
    {
      id: "TXN-1004",
      date: "2026-09-08",
      description: "Equipment purchase",
      amount: 1240.00,
      status: "exception",
      note: "Potential budget or approval exception."
    },
    {
      id: "TXN-1005",
      date: "2026-09-11",
      description: "Training expense",
      amount: 350.00,
      status: "matched",
      note: "Amount and reference match."
    },
    {
      id: "TXN-1006",
      date: "2026-09-14",
      description: "Vendor payment",
      amount: 720.50,
      status: "review",
      note: "Vendor reference requires confirmation."
    }
  ];

  const transactionRows = $("#transaction-rows");
  const demoFilter = $("#demo-filter");
  const demoCount = $("#demo-count");
  const reviewedCount = $("#reviewed-count");
  const matchSummary = $("#match-summary");
  const demoExplanation = $("#demo-explanation");
  const resetDemo = $("#reset-demo");

  const money = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(amount);

  const statusLabel = (status) => {
    const labels = {
      matched: "Matched",
      review: "Needs review",
      exception: "Exception"
    };

    return labels[status] || status;
  };

  function renderTransactions() {
    if (!transactionRows) return;

    const selectedStatus = demoFilter?.value || "all";

    const visibleTransactions = transactions.filter((transaction) => {
      return (
        selectedStatus === "all" ||
        transaction.status === selectedStatus
      );
    });

    transactionRows.replaceChildren();

    visibleTransactions.forEach((transaction) => {
      const row = document.createElement("tr");

      const values = [
        transaction.id,
        transaction.date,
        transaction.description,
        money(transaction.amount),
        statusLabel(transaction.status)
      ];

      values.forEach((value, index) => {
        const cell = document.createElement("td");
        if (index === 4) {
          const badge = document.createElement("span");
          badge.className = `status${transaction.status === "matched" ? "" : " review"}`;
          badge.textContent = value;
          cell.appendChild(badge);
        } else {
          cell.textContent = value;
        }

        if (index === 4) {
          cell.dataset.status = transaction.status;
        }

        row.appendChild(cell);
      });

      transactionRows.appendChild(row);
    });

    if (demoCount) {
      demoCount.textContent =
        `${visibleTransactions.length} transaction` +
        (visibleTransactions.length === 1 ? "" : "s");
    }

    const matched = transactions.filter(
      (transaction) => transaction.status === "matched"
    ).length;

    const needsReview = transactions.filter(
      (transaction) => transaction.status === "review"
    ).length;

    const exceptions = transactions.filter(
      (transaction) => transaction.status === "exception"
    ).length;

    if (reviewedCount) {
      reviewedCount.textContent = String(transactions.length);
    }

    if (matchSummary) {
      matchSummary.textContent =
        `${matched} matched · ${needsReview} for review · ` +
        `${exceptions} exception${exceptions === 1 ? "" : "s"}`;
    }

    if (demoExplanation) {
      if (selectedStatus === "all") {
        demoExplanation.textContent =
          "Review matched transactions, documentation gaps, and " +
          "potential exceptions. This demonstration uses fictional data.";
      } else {
        const descriptions = {
          matched: "Transactions whose available references appear to match.",
          review: "Transactions that need additional documentation or verification.",
          exception: "Potential control, budget, or approval exceptions requiring review."
        };

        demoExplanation.textContent =
          descriptions[selectedStatus] ||
          "Review the selected transactions.";
      }
    }
  }

  if (demoFilter) {
    demoFilter.addEventListener("change", renderTransactions);
  }

  if (resetDemo) {
    resetDemo.addEventListener("click", () => {
      if (demoFilter) {
        demoFilter.value = "all";
      }

      renderTransactions();
    });
  }

  renderTransactions();

  // Project details and article preview dialog
  const dialog = $("#content-dialog");
  const dialogKicker = $("#dialog-kicker");
  const dialogTitle = $("#dialog-title");
  const dialogBody = $("#dialog-body");

  const content = {
    reconciliation: {
      kicker: "CASE STUDY",
      title: "Smart Reconciliation Workbench",
      body: `
        <p>
          A prototype exploring how financial teams can identify
          matching transactions, missing documentation, and potential
          control exceptions.
        </p>
        <h3>Problem</h3>
        <p>
          Manual reconciliation can consume time when transaction
          details do not match, approvals are missing, or supporting
          documentation is incomplete.
        </p>
        <h3>Approach</h3>
        <p>
          Organize transactions by status, highlight exceptions, and
          give reviewers a clearer path to investigate discrepancies.
        </p>
        <h3>Controls matter</h3>
        <p>
          Automation should flag exceptions for human review rather
          than silently approving out-of-budget or unauthorized
          transactions.
        </p>
        <p><strong>Note:</strong> This is a demonstration using fictional data,
        not a production accounting system.</p>
      `
    },

    automation: {
      kicker: "PROJECT OVERVIEW",
      title: "Financial Process Automation",
      body: `
        <p>
          A prototype for reducing repetitive finance work while
          preserving review controls and an audit trail.
        </p>
        <h3>Potential workflows</h3>
        <ul>
          <li>Missing receipt and approval tracking</li>
          <li>Transaction matching and reconciliation support</li>
          <li>Month-end close task monitoring</li>
          <li>Exception reporting and follow-up</li>
        </ul>
        <p>
          The objective is not simply to automate tasks. It is to make
          financial processes more accurate, transparent, and easier
          to audit.
        </p>
      `
    },

    "ap-backlog": {
      kicker: "CASE STUDY / PROCESS IMPROVEMENT",
      title: "AP Backlog Triage Tracker",
      body: `
        <p>
          A real-world accounts payable workflow created for a
          regional distribution company with hundreds of invoices
          waiting to be converted into bills, reviewed, approved,
          and moved through the AP process.
        </p>
        <h3>The problem</h3>
        <p>
          The backlog was difficult to prioritize because invoice
          urgency, purchase-order status, exceptions, duplicate risk,
          ownership, and next actions were spread across disconnected
          lists. The team needed a practical way to see what required
          attention first and where each invoice was in the process.
        </p>
        <h3>What the system does</h3>
        <ul>
          <li>Logs one row per invoice with vendor, amount, PO, due date, discount, owner, and status</li>
          <li>Calculates days to due, invoice age, duplicate risk, blockers, and urgency</li>
          <li>Routes work into prioritized buckets: urgent, clean PO, non-PO, exception, and duplicate</li>
          <li>Tracks exception owners, follow-up dates, resolutions, and daily throughput</li>
          <li>Shows required pace versus actual pace for clearing the backlog</li>
        </ul>
        <h3>Why it matters</h3>
        <p>
          Instead of treating the spreadsheet as a passive list, the
          tracker acts as a lightweight operating system for AP:
          analysts can filter the queue, batch clean work by vendor,
          chase blockers, and understand whether the team is on track
          to meet its clear-date target.
        </p>
        <div class="dialog-callout">
          This workflow generated real-time operational results by
          turning a real-world finance problem into a visible,
          measurable process. Company and vendor names in the sample
          workbook have been generalized for privacy.
        </div>
        <p>
          <a href="./Regional_Distribution_AP_Backlog_Triage_Tracker.xlsx" download>
            Download the privacy-safe tracker workbook ↗
          </a>
        </p>
      `
    },

    cloud: {
      kicker: "PROJECT OVERVIEW",
      title: "Cloud and Data Engineering",
      body: `
        <p>
          Exploring cloud architecture, data workflows, and practical
          ways to build reliable software for business operations.
        </p>
        <h3>Areas of focus</h3>
        <ul>
          <li>Cloud fundamentals and architecture</li>
          <li>Data quality and validation</li>
          <li>API design and integration</li>
          <li>Security, monitoring, and reliability</li>
        </ul>
        <p>
          Future iterations can connect a tested interface to a
          database and secure backend service.
        </p>
      `
    },

    ai: {
      kicker: "PROJECT OVERVIEW",
      title: "Applied AI for Business Operations",
      body: `
        <p>
          Investigating how AI and anomaly detection can help identify
          unusual patterns, explain potential disruptions, and support
          more informed operational decisions.
        </p>
        <h3>Design principles</h3>
        <ul>
          <li>Explainable findings rather than unexplained alerts</li>
          <li>Human review for consequential decisions</li>
          <li>Clear measurement of accuracy and limitations</li>
          <li>Privacy-aware data handling</li>
        </ul>
      `
    },

    article1: {
      kicker: "THE CONVERGENCE BRIEF",
      title: "Why Reconciliation Is a Systems Problem",
      body: `
        <p>
          Reconciliation is often treated as a spreadsheet task.
          In reality, it is a systems problem involving data quality,
          business rules, approvals, timing, and accountability.
        </p>
        <p>
          A useful automation workflow should distinguish a clean
          match from a transaction that merely looks similar. It
          should also surface missing documentation and route
          exceptions to the appropriate reviewer.
        </p>
        <p>
          The strongest financial automation does more than save
          clicks: it strengthens controls and makes the process easier
          to understand and audit.
        </p>
      `
    },

    article2: {
      kicker: "THE CONVERGENCE BRIEF",
      title: "Automation Without Losing Control",
      body: `
        <p>
          Good automation should make policy easier to follow, not
          easier to bypass.
        </p>
        <p>
          When a transaction falls outside an approved budget or
          lacks required authorization, the system should flag the
          issue, preserve the evidence, and direct it to a responsible
          reviewer.
        </p>
        <p>
          The goal is a faster process with stronger accountability,
          not an automatic approval for every transaction.
        </p>
      `
    },

    article3: {
      kicker: "THE CONVERGENCE BRIEF",
      title: "The Finance Professional as a Systems Thinker",
      body: `
        <p>
          Finance professionals see how policies, people, systems,
          and financial data interact. Software development offers
          a way to turn those observations into repeatable workflows.
        </p>
        <p>
          Combining accounting knowledge with technical skills can
          help teams reduce repetitive work, improve data quality,
          and make decisions with better information.
        </p>
      `
    }
  };

  function openContent(key) {
    if (!dialog || !dialogTitle || !dialogBody) return;

    const item = content[key];

    if (!item) return;

    if (dialogKicker) {
      dialogKicker.textContent = item.kicker;
    }

    dialogTitle.textContent = item.title;
    dialogBody.innerHTML = item.body;

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
  }

  function openArticle(article) {
    if (!dialog || !dialogTitle || !dialogBody) return;

    if (dialogKicker) {
      dialogKicker.textContent = article.category;
    }

    dialogTitle.textContent = article.title;
    dialogBody.replaceChildren();

    article.body.forEach((paragraph) => {
      const element = document.createElement("p");
      element.textContent = paragraph;
      dialogBody.appendChild(element);
    });

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
  }

  async function loadBriefArchive() {
    const briefArticles = $("#brief-articles");
    const briefStatus = $("#brief-status");

    if (!briefArticles) return;

    try {
      const response = await fetch("./data/brief.json");
      if (!response.ok) {
        throw new Error(`Brief archive request failed: ${response.status}`);
      }

      const archive = await response.json();
      const articles = archive.articles || [];
      briefArticles.replaceChildren();

      articles.forEach((article, index) => {
        const row = document.createElement("article");
        row.className = "article-row";

        const number = document.createElement("span");
        number.className = "article-number";
        number.textContent = String(index + 1).padStart(2, "0");

        const contentColumn = document.createElement("div");
        const category = document.createElement("p");
        category.className = "article-category";
        category.textContent = article.category;

        const title = document.createElement("h3");
        title.textContent = article.title;

        const excerpt = document.createElement("p");
        excerpt.textContent = article.excerpt;

        const button = document.createElement("button");
        button.className = "read-article";
        button.type = "button";
        button.dataset.articleSlug = article.slug;
        button.textContent = article.status === "published"
          ? "Read article "
          : "Preview queued article ";

        const arrow = document.createElement("span");
        arrow.setAttribute("aria-hidden", "true");
        arrow.textContent = "↗";
        button.appendChild(arrow);

        contentColumn.append(category, title, excerpt, button);

        const label = document.createElement("span");
        label.className = "article-side";
        label.textContent = article.label;

        row.append(number, contentColumn, label);
        briefArticles.appendChild(row);
      });

      briefArticles.addEventListener("click", (event) => {
        const button = event.target.closest("[data-article-slug]");
        if (!button) return;

        const article = articles.find(
          (item) => item.slug === button.dataset.articleSlug
        );
        if (article) openArticle(article);
      });

      if (briefStatus) {
        const publishedCount = articles.filter(
          (article) => article.status === "published"
        ).length;
        const queuedCount = articles.filter(
          (article) => article.status === "queued"
        ).length;
        briefStatus.textContent =
          `${publishedCount} PUBLISHED · ${queuedCount} QUEUED · WEEKLY PUBLICATION PIPELINE`;
      }
    } catch (error) {
      console.error("Unable to load The Convergence Brief archive.", error);
      if (briefStatus) {
        briefStatus.textContent = "ARCHIVE UNAVAILABLE · CHECK BACK SOON";
      }
    }
  }

  loadBriefArchive();

  $$("[data-open]").forEach((button) => {
    button.addEventListener("click", () => {
      openContent(button.dataset.open);
    });
  });

  $$(".dialog-close").forEach((button) => {
    button.addEventListener("click", () => {
      if (dialog?.open) {
        dialog.close();
      } else {
        dialog?.removeAttribute("open");
      }
    });
  });

  if (dialog) {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });
  }

  // Prepare an accessible email inquiry without requiring a backend.
  const contactForm = $("#contact-form");
  const formStatus = $("#form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const message = String(formData.get("message") || "").trim();

      if (!name || !email || !message) {
        if (formStatus) {
          formStatus.textContent = "Please complete each field before continuing.";
        }
        return;
      }

      const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n${message}`
      );

      if (formStatus) {
        formStatus.textContent = "Your email draft is ready to review in your mail app.";
      }

      window.location.href =
        `mailto:hello@lorenzoginyard.com?subject=${subject}&body=${body}`;
    });
  }
})();
