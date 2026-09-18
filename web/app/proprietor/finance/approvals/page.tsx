"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ConcessionRequest, decideConcessionRequest, money, useConcessionRequests } from "../../../../lib/concessions-store";

const stateClass = (status: string) => status === "Approved" ? "approved" : status === "Declined" ? "declined" : "pending";

export default function ProprietorConcessionApprovalsPage() {
  const requests = useConcessionRequests();
  const [filter, setFilter] = useState("Pending Approval");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [result, setResult] = useState<{ id: string; status: "Approved" | "Declined" } | null>(null);

  const filtered = useMemo(() => requests.filter((r) => {
    const matchesFilter = filter === "All" || r.status === filter;
    const matchesQuery = `${r.student} ${r.className} ${r.type} ${r.requestedBy}`.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  }), [requests, filter, query]);

  const selected: ConcessionRequest | undefined = requests.find((r) => r.id === selectedId) ?? filtered[0] ?? requests[0];

  const pendingCount = requests.filter((r) => r.status === "Pending Approval").length;
  const approvedValue = requests.filter((r) => r.status === "Approved").reduce((s, r) => s + r.amount, 0);
  const declinedCount = requests.filter((r) => r.status === "Declined").length;

  function decide(status: "Approved" | "Declined") {
    if (!selected) return;
    decideConcessionRequest(selected.id, status, "Proprietor", note);
    setResult({ id: selected.id, status });
    setNote("");
  }

  return (
    <main className="owner-module-page">
      <header className="owner-module-head">
        <div><span>PROPRIETOR · APPROVALS</span><h1>Scholarship & Discount Approvals</h1><p>Only the Proprietor can approve a concession. Finance Office, Administrator, Head Master, Principal and Directors may only request one.</p></div>
        <div className="owner-module-actions"><Link href="/proprietor/finance">Back to Finance</Link><Link href="/finance-office/scholarships">Finance Office view</Link></div>
      </header>

      <section className="owner-module-kpis">
        <article><span>Pending your approval</span><strong>{pendingCount}</strong><small>Needs a decision</small></article>
        <article><span>Approved concessions</span><strong>{money(approvedValue)}</strong><small>Total value approved</small></article>
        <article><span>Declined</span><strong>{declinedCount}</strong><small>Requests turned down</small></article>
        <article><span>Total requests</span><strong>{requests.length}</strong><small>All time, this browser</small></article>
      </section>

      {requests.length === 0 && <div className="ra-notice">No concession requests yet. Finance Office, Administrator, Head Master, Principal or a Director can submit one from Finance Office → Scholarships & Discounts.</div>}

      {selected && (
        <section className="owner-approval-workspace">
          <article className="owner-approval-list">
            <header><div><h2>Request queue</h2><p>Concessions submitted for your decision.</p></div></header>
            <div className="owner-approval-toolbar"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search student, class or requester..." /><select value={filter} onChange={(e) => setFilter(e.target.value)}><option>Pending Approval</option><option>Approved</option><option>Declined</option><option>All</option></select></div>
            <div className="owner-approval-items">
              {filtered.map((r) => (
                <button key={r.id} className={selected.id === r.id ? "selected" : ""} onClick={() => { setSelectedId(r.id); setNote(""); setResult(null); }}>
                  <div><strong>{r.student}</strong><b>{r.type} · {r.className}</b><small>{r.requestedByRole} · {r.requestedAt}</small></div>
                  <em className={`owner-approval-state ${stateClass(r.status)}`}>{r.status}</em>
                </button>
              ))}
              {filtered.length === 0 && <div style={{ padding: 14, fontSize: 9, color: "#8797a0" }}>Nothing matches this filter.</div>}
            </div>
          </article>

          <article className="owner-approval-review">
            <div className="owner-approval-head"><div><span>{selected.type} · {selected.id}</span><h2>{selected.student}</h2><p>{selected.className} · requested by {selected.requestedBy} ({selected.requestedByRole}) on {selected.requestedAt}</p></div><b className={`owner-approval-state ${stateClass(selected.status)}`}>{selected.status}</b></div>

            <div className="owner-approval-detail-grid">
              <div><span>Gross term fee</span><strong>{money(selected.grossFee)}</strong></div>
              <div><span>Requested concession</span><strong>{money(selected.amount)}</strong></div>
              <div><span>Net parent obligation if approved</span><strong>{money(selected.grossFee - selected.amount)}</strong></div>
              <div><span>Reason / sponsor</span><strong>{selected.reason}</strong></div>
              {selected.decidedBy && <div><span>Decided by</span><strong>{selected.decidedBy} · {selected.decidedAt}</strong></div>}
              {selected.decisionNote && <div><span>Decision note</span><strong>{selected.decisionNote}</strong></div>}
            </div>

            {selected.status === "Pending Approval" ? (
              <>
                <label className="owner-approval-note">Proprietor note (optional)<textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add a note for the audit trail..." /></label>
                <div className="owner-approval-actions"><button className="owner-decline-btn" onClick={() => decide("Declined")}>Decline</button><button className="owner-approve-btn" onClick={() => decide("Approved")}>Approve</button></div>
              </>
            ) : (
              <div className={`owner-approval-result ${selected.status === "Approved" ? "good" : "warn"}`}>{selected.status === "Approved" ? "Approved. Finance Office can now apply this concession to the student's term account." : "Declined. Finance Office will see this decision on their concession ledger."}</div>
            )}
            {result && result.id === selected.id && <div className={`owner-approval-result ${result.status === "Approved" ? "good" : "warn"}`}>Decision saved.</div>}
          </article>
        </section>
      )}

      <section className="owner-module-card"><header><div><h2>Approval rule</h2><p>How concession authority works across SchoolOS.</p></div></header><div className="owner-module-callout">Finance Office, Administrator, Head Master, Principal and Director accounts can only <b>request</b> a scholarship or discount. A request stays informational until the Proprietor approves it here — only then does it reduce a student's net fee obligation.</div></section>
    </main>
  );
}
