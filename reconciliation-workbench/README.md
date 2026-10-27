# Smart Reconciliation Workbench

LG Convergence portfolio prototype for financial reconciliation, exception review, CSV workflows, and a session-only audit trail.

**Demo scope:** fictional sample data only. This static browser prototype does not connect to bank accounts, a general ledger, an ERP, or a production accounting system. CSV processing is local to the browser. Audit entries are session-only and are not immutable production audit storage.

## Included workflow
- Overview metrics and reconciliation status
- Searchable transaction register and status filters
- CSV import for source and ledger records
- Reference-based matching and amount variance checks
- Missing ledger entry, missing support, and duplicate-candidate flags
- Exception owner, decision, reviewer note, and session audit log
- CSV export of records and open exceptions

## Run locally
Open `index.html` in a current browser, or run `python -m http.server 8000` from this folder.

## Next engineering steps
Add unit tests for parsing and matching, candidate matching by date/description, authorization and budget checks, persistent API/database storage, role-based access, immutable audit events, and deployment hardening before any production use.