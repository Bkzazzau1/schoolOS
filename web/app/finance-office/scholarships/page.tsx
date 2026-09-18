"use client";

import { useMemo, useState } from "react";
import { REQUESTER_ROLES, RequesterRole, addConcessionRequest, money, useConcessionRequests } from "../../../lib/concessions-store";

const statusClass = (status: string) => status === "Approved" ? "" : status === "Declined" ? "danger" : "watch";

export default function ScholarshipsPage() {
  const requests = useConcessionRequests();
  const [filter, setFilter] = useState("All");
  const [notice, setNotice] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ student: "", className: "", type: "Scholarship" as "Scholarship" | "Discount", grossFee: "", amount: "", reason: "", requestedBy: "", requestedByRole: "Finance Office" as RequesterRole });

  const visible = useMemo(() => requests.filter((r) => filter === "All" || r.type === filter || r.status === filter), [requests, filter]);
  const approved = requests.filter((r) => r.status === "Approved");
  const grossTotal = approved.reduce((s, r) => s + r.grossFee, 0);
  const concessionTotal = approved.reduce((s, r) => s + r.amount, 0);
  const pendingCount = requests.filter((r) => r.status === "Pending Approval").length;
  const studentsSupported = new Set(approved.map((r) => r.student)).size;

  function submitRequest(e: React.FormEvent) {
    e.preventDefault();
    if (!form.student || !form.className || !form.grossFee || !form.amount || !form.requestedBy) return;
    addConcessionRequest({
      student: form.student,
      className: form.className,
      type: form.type,
      grossFee: Number(form.grossFee),
      amount: Number(form.amount),
      reason: form.reason || `${form.type} request`,
      requestedBy: form.requestedBy,
      requestedByRole: form.requestedByRole,
    });
    setNotice(`Request sent to the Proprietor for approval. ${form.student} will see this concession only after it is approved.`);
    setForm({ student: "", className: "", type: "Scholarship", grossFee: "", amount: "", reason: "", requestedBy: "", requestedByRole: "Finance Office" });
    setShowForm(false);
  }

  return (
    <main className="fo-page">
      <header className="fo-head">
        <div><span>FINANCE OFFICE · CONCESSIONS</span><h1>Scholarships & Discounts</h1><p>Track every concession request separately so proprietors never confuse supported students with unpaid debt.</p></div>
        <div className="fo-actions">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option>All</option><option>Scholarship</option><option>Discount</option>
            <option>Pending Approval</option><option>Approved</option><option>Declined</option>
          </select>
          <button className="primary" onClick={() => { setShowForm((v) => !v); setNotice(""); }}>＋ New concession request</button>
        </div>
      </header>

      <section className="ra-kpis">
        <article><span>Gross fee represented</span><strong>{money(grossTotal)}</strong><small>Approved concession population</small></article>
        <article><span>Scholarships & discounts</span><strong>{money(concessionTotal)}</strong><small>Approved concessions only</small></article>
        <article><span>Net parent obligation</span><strong>{money(grossTotal - concessionTotal)}</strong><small>After approved concessions</small></article>
        <article><span>Students supported</span><strong>{studentsSupported}</strong><small>Approved records</small></article>
        <article><span>Pending proprietor review</span><strong>{pendingCount}</strong><small>Awaiting approval</small></article>
      </section>

      <div className="ra-notice">Only the Proprietor can approve a scholarship or discount. Finance Office, Administrator, Head Master, Principal and Director accounts may submit a request here — it stays <b>Pending Approval</b> until the Proprietor decides.</div>
      {notice && <div className="ra-notice">{notice}</div>}

      {showForm && (
        <form className="fo-card" style={{ marginBottom: 14 }} onSubmit={submitRequest}>
          <header><div><h2>New concession request</h2><p>This goes to the Proprietor's approval queue. It will not reduce any fee until approved.</p></div></header>
          <div className="concession-form-grid">
            <label>Student name<input value={form.student} onChange={(e) => setForm({ ...form, student: e.target.value })} placeholder="e.g. Maryam Abdullahi" required /></label>
            <label>Class<input value={form.className} onChange={(e) => setForm({ ...form, className: e.target.value })} placeholder="e.g. JSS 2A" required /></label>
            <label>Type<select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as "Scholarship" | "Discount" })}><option>Scholarship</option><option>Discount</option></select></label>
            <label>Gross term fee (₦)<input type="number" min="0" value={form.grossFee} onChange={(e) => setForm({ ...form, grossFee: e.target.value })} required /></label>
            <label>Concession amount (₦)<input type="number" min="0" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required /></label>
            <label>Reason / sponsor<input value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} placeholder="e.g. Sibling discount, BrightGate Fund" /></label>
            <label>Requested by (name)<input value={form.requestedBy} onChange={(e) => setForm({ ...form, requestedBy: e.target.value })} placeholder="Your name" required /></label>
            <label>Requesting as<select value={form.requestedByRole} onChange={(e) => setForm({ ...form, requestedByRole: e.target.value as RequesterRole })}>{REQUESTER_ROLES.map((r) => <option key={r}>{r}</option>)}</select></label>
          </div>
          <div className="fo-actions" style={{ marginTop: 12 }}><button type="button" onClick={() => setShowForm(false)}>Cancel</button><button className="primary" type="submit">Send to Proprietor for approval</button></div>
        </form>
      )}

      <section className="fo-grid two">
        <article className="fo-card">
          <header><div><h2>Concession ledger</h2><p>Every request shows the original fee and the amount the family owes once a decision is made.</p></div></header>
          <div className="ra-table">
            <div className="ra-table-head concession"><span>Student</span><span>Type</span><span>Gross fee</span><span>Concession</span><span>Requested by</span><span>Status</span></div>
            {visible.map((r) => (
              <div className="ra-table-row concession" key={r.id}>
                <div><strong>{r.student}</strong><small>{r.className}</small></div>
                <span>{r.type}</span>
                <span>{money(r.grossFee)}</span>
                <b>{money(r.amount)}</b>
                <strong>{r.requestedByRole}</strong>
                <em className={statusClass(r.status)}>{r.status}</em>
              </div>
            ))}
            {visible.length === 0 && <div style={{ padding: 14, fontSize: 9, color: "#8797a0" }}>No concession requests match this filter.</div>}
          </div>
        </article>
        <aside className="fo-card">
          <header><div><h2>Concession types</h2><p>Keep financial support explicit and reportable.</p></div></header>
          <div className="fo-list">
            <div><strong>Scholarships</strong><span>Founder, academic, community, sports or external sponsor awards.</span><small>Tracked as support, not debt.</small></div>
            <div><strong>Discounts</strong><span>Sibling, staff-child and policy-based reductions.</span><small>Reduces billable amount before collection.</small></div>
            <div><strong>Approval authority</strong><span>Finance Office, Administrator, Head Master, Principal and Directors can request.</span><small>Only the Proprietor can approve.</small></div>
            <div><strong>Audit trail</strong><span>Every decision records who approved it and when.</span><small>Visible on the Proprietor's approval queue</small></div>
          </div>
        </aside>
      </section>

      <section className="fo-grid equal">
        <article className="fo-card"><header><div><h2>Funding source</h2><p>Who absorbs the concession.</p></div></header><div className="ra-bars-horizontal"><div><span>Founder / school fund</span><i><b style={{ width: "72%" }} /></i><strong>₦125k</strong></div><div><span>Policy discounts</span><i><b style={{ width: "34%" }} /></i><strong>₦33.5k</strong></div><div><span>External sponsors</span><i><b style={{ width: "18%" }} /></i><strong>₦0 sample</strong></div></div></article>
        <article className="fo-card"><header><div><h2>Control principle</h2><p>The collection engine uses the net obligation.</p></div></header><div className="fo-callout">If a student has a ₦185,000 standard fee and receives a ₦75,000 scholarship, SchoolOS should normally set the parent obligation and term-account collection ceiling from ₦110,000—not continue treating ₦75,000 as unpaid school fees.</div></article>
      </section>
    </main>
  );
}
