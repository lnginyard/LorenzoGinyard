const dialog = document.querySelector("#contentDialog");
const dialogKicker = document.querySelector("#dialogKicker");
const dialogTitle = document.querySelector("#dialogTitle");
const dialogBody = document.querySelector("#dialogBody");
const content = {
  receipt: {
    kicker: "CASE STUDY / FINANCIAL OPERATIONS",
    title: "Receipt Tracking & Audit Readiness",
    body: `<p><strong>The challenge.</strong> During an internal audit, receipt documentation was incomplete. The process needed a clearer way to show what had been submitted, what remained outstanding, and who needed to follow up.</p><h3>Workflow design</h3><ul><li>Created an Excel-based tracking process for receipt status.</li><li>Made outstanding documentation visible to the employee, requester, and financial manager.</li><li>Supported follow-up with purchasers and made the collection status easier to monitor.</li></ul><div class="dialog-callout">Reported outcome from the experience: all requested receipts were collected by the end of the audit. Add a sanitized sample workbook and screenshots before public launch.</div><h3>Skills demonstrated</h3><p>Process improvement · Audit support · Excel · Stakeholder communication · Internal controls</p>`
  },
  ai: {
    kicker: "PROJECT CONCEPT / APPLIED AI",
    title: "Anomaly & Disruption Intelligence",
    body: `<p>This case-study space documents an AI competition concept focused on detecting anomalies or disruptions, suggesting mitigation actions, and forecasting disruption and resolution patterns.</p><h3>What to add before launch</h3><ul><li>Problem definition and target users.</li><li>Architecture or system diagram, dataset notes, and model approach.</li><li>Demo, repository, evaluation method, and known limitations.</li></ul><div class="dialog-callout">Keep claims tied to what was actually built, tested, or presented. Clearly distinguish the original concept from any future implementation.</div>`
  },
  cloud: {
    kicker: "TECHNICAL LAB / CLOUD",
    title: "Cloud & Infrastructure Lab",
    body: `<p>A living collection of cloud architecture notes, hands-on experiments, deployment examples, and security decisions.</p><h3>Suggested case-study format</h3><ul><li>Architecture diagram and business purpose.</li><li>Services used, deployment method, and estimated cost controls.</li><li>Identity and access management, monitoring, and security trade-offs.</li><li>Repository or demo with setup instructions.</li></ul><div class="dialog-callout">Add specific AWS, Azure, or other cloud work only when you have concrete examples to demonstrate.</div>`
  },
  reconciliations: {
    kicker: "THE CONVERGENCE BRIEF / ARTICLE PREVIEW",
    title: "The Hidden Business Cost of Poor Reconciliations",
    body: `<p>Reconciliations are often treated as a routine accounting task. In reality, they are one of the ways an organization tests whether its financial story matches the underlying activity.</p><p>When documentation is missing, approvals are unclear, or extracted transaction data does not match recorded information, the work extends beyond correcting a balance. Teams lose time investigating exceptions, closing periods becomes harder to predict, and leaders have less confidence in the reports they use to make decisions.</p><h3>A better operating model</h3><ul><li>Define who owns each reconciliation and when it is due.</li><li>Track exceptions with an owner, reason, supporting evidence, and resolution date.</li><li>Use consistent matching rules, while preserving human review for exceptions.</li><li>Review recurring issues as process signals—not just one-off errors.</li></ul><div class="dialog-callout">Thesis: strong controls do more than protect the past. They make the next decision more reliable.</div><p><em>Editorial draft preview. This article has not yet been published.</em></p>`
  },
  data: {
    kicker: "THE CONVERGENCE BRIEF / ARTICLE PREVIEW",
    title: "What Accountants Understand About Data That Software Engineers Need to Know",
    body: `<p>A field in a database is not just a value. In a business system, it represents an event, a decision, an obligation, or evidence that someone may need to verify months later.</p><p>Accounting work makes the importance of traceability tangible: a transaction must connect to its support, its approval, its classification, and its place in a report. Software teams can apply the same discipline through data validation, audit trails, clear exception handling, and thoughtful system design.</p><h3>Design questions worth asking</h3><ul><li>Where did this data originate?</li><li>What makes it valid—and what happens when it is not?</li><li>Can someone trace the value back to evidence?</li><li>How will changes and exceptions be explained later?</li></ul><p><em>Editorial draft preview. This article has not yet been published.</em></p>`
  },
  build: {
    kicker: "THE CONVERGENCE BRIEF / ARTICLE PREVIEW",
    title: "From Financial Control to Software Design",
    body: `<p>A process problem can be the beginning of a software idea. The first step is not always to write code; it is to understand the people, handoffs, evidence, and failure points in the current workflow.</p><p>A useful prototype makes the next action clearer. It shows what is missing, who owns the follow-up, what has been completed, and how a reviewer can understand the result. Only after that workflow is understood does it make sense to decide whether a spreadsheet, script, database-backed application, or larger system is appropriate.</p><h3>Build deliberately</h3><ul><li>Define the user and the pain point.</li><li>Map the current process and its exceptions.</li><li>Build the smallest useful prototype.</li><li>Test with realistic, sanitized data.</li><li>Measure whether the process became clearer or faster.</li></ul><p><em>Editorial draft preview. This article has not yet been published.</em></p>`
  }
};
function openContent(key) {
  const item = content[key];
  if (!item) return;
  dialogKicker.textContent = item.kicker;
  dialogTitle.textContent = item.title;
  dialogBody.innerHTML = item.body;
  dialog.showModal();
}
document.querySelectorAll("[data-project]").forEach(button => button.addEventListener("click", () => openContent(button.dataset.project)));
document.querySelectorAll("[data-article]").forEach(button => button.addEventListener("click", () => openContent(button.dataset.article)));
document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.querySelector("span").textContent = open ? "−" : "＋";
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open"); menuButton.setAttribute("aria-expanded", "false"); menuButton.querySelector("span").textContent = "＋";
}));
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#emailButton").addEventListener("click", () => {
  alert("Before launch, replace this placeholder with your preferred professional email address in index.html.");
});