
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
        cell.textContent = value;

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
          A concept for reducing repetitive finance work while
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
})();
