(() => {
  "use strict";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  const menuButton = $(".menu-toggle");
  const nav = $("#primary-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      const label = $("span", menuButton);
      if (label) label.textContent = isOpen ? "−" : "＋";
    });
    $$("a", nav).forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      const label = $("span", menuButton);
      if (label) label.textContent = "＋";
    }));
  }

  const filterButtons = $$(".filter");
  const cards = $$(".project-card");
  filterButtons.forEach(button => button.addEventListener("click", () => {
    const selected = button.dataset.filter || "all";
    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    cards.forEach(card => {
      const categories = (card.dataset.category || "").split(/\s+/);
      card.hidden = selected !== "all" && !categories.includes(selected);
    });
  }));

  const records = [
    {ref:"TXN-1001",date:"2026-09-02",description:"Office supplies",source:248.75,ledger:248.75,support:"Attached",status:"matched",note:"Amount and reference match; supporting documentation is present."},
    {ref:"TXN-1002",date:"2026-09-03",description:"Software subscription",source:129.00,ledger:129.00,support:"Attached",status:"matched",note:"Vendor and amount match the ledger entry."},
    {ref:"TXN-1003",date:"2026-09-05",description:"Travel reimbursement",source:485.20,ledger:485.20,support:"Review",status:"review",note:"Amounts match, but supporting documentation needs review before the item is cleared."},
    {ref:"TXN-1004",date:"2026-09-08",description:"Equipment purchase",source:1240.00,ledger:1190.00,support:"Missing",status:"exception",note:"The source and ledger amounts differ by $50.00 and support is missing. Do not auto-match; investigate and route for approval."},
    {ref:"TXN-1005",date:"2026-09-11",description:"Training expense",source:350.00,ledger:350.00,support:"Attached",status:"matched",note:"Amount and reference match; supporting documentation is present."},
    {ref:"TXN-1006",date:"2026-09-14",description:"Vendor payment",source:720.50,ledger:720.50,support:"Review",status:"review",note:"Amounts match, but the vendor reference needs confirmation before final reconciliation."}
  ];
  const rows = $("#transaction-rows");
  const filter = $("#demo-filter");
  const count = $("#demo-count");
  const reviewedCount = $("#reviewed-count");
  const explanation = $("#demo-explanation");
  const reset = $("#reset-demo");
  const reviewed = new Set();
  const money = value => new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(value);

  function render() {
    if (!rows) return;
    const visible = records.filter(record => !filter || filter.value === "all" || record.status === filter.value);
    rows.replaceChildren();
    visible.forEach(record => {
      const tr = document.createElement("tr");
      tr.tabIndex = 0;
      tr.setAttribute("aria-label", record.ref + ", " + record.status + ". Select to review details.");
      tr.innerHTML = `<td>${record.ref}</td><td>${record.description}<br><small>${record.date}</small></td><td>${money(record.source)}</td><td>${money(record.ledger)}</td><td>${record.support}</td><td><span class="status ${record.status}">${record.status === "matched" ? "Matched" : record.status === "review" ? "Needs review" : "Exception"}</span></td>`;
      const selectRecord = () => {
        $$("#transaction-rows tr").forEach(item => item.classList.remove("selected"));
        tr.classList.add("selected");
        reviewed.add(record.ref);
        if (explanation) explanation.textContent = record.ref + " — " + record.note;
        if (reviewedCount) reviewedCount.textContent = String(reviewed.size);
      };
      tr.addEventListener("click", selectRecord);
      tr.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") { event.preventDefault(); selectRecord(); }
      });
      rows.appendChild(tr);
    });
    if (count) count.textContent = String(visible.length);
    if (visible.length === 0 && explanation) explanation.textContent = "No records match this filter.";
  }
  if (filter) filter.addEventListener("change", render);
  if (reset) reset.addEventListener("click", () => {
    if (filter) filter.value = "all";
    reviewed.clear();
    if (reviewedCount) reviewedCount.textContent = "0";
    if (explanation) explanation.textContent = "Select a record to inspect why it was matched or flagged.";
    render();
  });
  render();
})();