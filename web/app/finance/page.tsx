"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import "./finance.css";

type LedgerStatus = "Paid" | "Part paid" | "Due" | "Scheduled";
type FinancingStatus = "Active" | "Completed" | "Review";

type StudentFinance = {
  id: string;
  student: string;
  className: string;
  guardian: string;
  termAccount: string;
  accountProvider: string;
  term: string;
  invoiced: number;
  paid: number;
  paymentPlan: string;
  autoDebit: boolean;
  monthlyAmount: number;
  debitDay: number;
  financingOutstanding: number;
};

const students: StudentFinance[] = [
  { id: "STU-001", student: "Maryam Abdullahi", className: "JSS 2A", guardian: "Alhaji Abdullahi Musa", termAccount: "1047263815", accountProvider: "Partner collection bank · mock", term: "2026/2027 · Term 1", invoiced: 185000, paid: 135000, paymentPlan: "Monthly", autoDebit: true, monthlyAmount: 25000, debitDay: 25, financingOutstanding: 0 },
  { id: "STU-002", student: "Ibrahim Sani", className: "JSS 2A", guardian: "Alhaji Sani Ibrahim", termAccount: "1047263823", accountProvider: "Partner collection bank · mock", term: "2026/2027 · Term 1", invoiced: 185000, paid: 85000, paymentPlan: "Flexible", autoDebit: false, monthlyAmount: 0, debitDay: 0, financingOutstanding: 60000 },
  { id: "STU-003", student: "Yusuf Bello", className: "JSS 2B", guardian: "Alhaji Musa Bello", termAccount: "1047263831", accountProvider: "Partner collection bank · mock", term: "2026/2027 · Term 1", invoiced: 185000, paid: 65000, paymentPlan: "Monthly", autoDebit: true, monthlyAmount: 30000, debitDay: 28, financingOutstanding: 90000 },
  { id: "PRI-003", student: "Hafsa Abdullahi", className: "Primary 3", guardian: "Alhaji Abdullahi Sani", termAccount: "1047263914", accountProvider: "Partner collection bank · mock", term: "2026/2027 · Term 1", invoiced: 145000, paid: 95000, paymentPlan: "Monthly", autoDebit: true, monthlyAmount: 25000, debitDay: 20, financingOutstanding: 0 },
];

const ledger = [
  { date: "05 Sep 2026", student: "Maryam Abdullahi", reference: "PAY-260905-0182", channel: "Term account transfer", amount: 50000, status: "Paid" as LedgerStatus },
  { date: "29 Aug 2026", student: "Maryam Abdullahi", reference: "PAY-260829-0147", channel: "Parent monthly debit", amount: 25000, status: "Paid" as LedgerStatus },
  { date: "24 Aug 2026", student: "Yusuf Bello", reference: "PAY-260824-0118", channel: "Term account transfer", amount: 35000, status: "Paid" as LedgerStatus },
  { date: "28 Sep 2026", student: "Yusuf Bello", reference: "SCH-260928-0031", channel: "Parent monthly debit", amount: 30000, status: "Scheduled" as LedgerStatus },
  { date: "20 Sep 2026", student: "Hafsa Abdullahi", reference: "SCH-260920-0024", channel: "Parent monthly debit", amount: 25000, status: "Scheduled" as LedgerStatus },
];

const financing = [
  { id: "EDU-26001", student: "Yusuf Bello", guardian: "Alhaji Musa Bello", principal: 120000, repaid: 30000, outstanding: 90000, instalment: 30000, nextDate: "28 Sep 2026", status: "Active" as FinancingStatus },
  { id: "EDU-26002", student: "Ibrahim Sani", guardian: "Alhaji Sani Ibrahim", principal: 100000, repaid: 40000, outstanding: 60000, instalment: 20000, nextDate: "25 Sep 2026", status: "Active" as FinancingStatus },
  { id: "EDU-25018", student: "Fatima Musa", guardian: "Hajiya Aisha Musa", principal: 90000, repaid: 90000, outstanding: 0, instalment: 30000, nextDate: "Completed", status: "Completed" as FinancingStatus },
];

const history = [
  { session: "2026/2027 Term 1", billed: 185000, paid: 135000, financing: 0, balance: 50000, note: "Current term" },
  { session: "2025/2026 Term 3", billed: 165000, paid: 165000, financing: 0, balance: 0, note: "Cleared" },
  { session: "2025/2026 Term 2", billed: 165000, paid: 165000, financing: 30000, balance: 0, note: "Financing fully repaid" },
  { session: "2025/2026 Term 1", billed: 160000, paid: 160000, financing: 0, balance: 0, note: "Cleared" },
];

function money(value: number) {
  return `₦${value.toLocaleString("en-NG")}`;
}

export default function FinancePage() {
  const [selectedId, setSelectedId] = useState("STU-001");
  const [tab, setTab] = useState("accounts");
  const [autoDebit, setAutoDebit] = useState(true);
  const [monthlyAmount, setMonthlyAmount] = useState("25000");
  const [debitDay, setDebitDay] = useState("25");
  const [saved, setSaved] = useState(false);

  const selected = students.find((item) => item.id === selectedId) ?? students[0];
  const totalInvoiced = useMemo(() => students.reduce((sum, item) => sum + item.invoiced, 0), []);
  const totalPaid = useMemo(() => students.reduce((sum, item) => sum + item.paid, 0), []);
  const outstanding = totalInvoiced - totalPaid;
  const financed = financing.reduce((sum, item) => sum + item.outstanding, 0);

  function chooseStudent(id: string) {
    const item = students.find((student) => student.id === id) ?? students[0];
    setSelectedId(id);
    setAutoDebit(item.autoDebit);
    setMonthlyAmount(item.monthlyAmount ? String(item.monthlyAmount) : "");
    setDebitDay(item.debitDay ? String(item.debitDay) : "");
    setSaved(false);
  }

  return <main className="finance-page">
    <header className="finance-topbar">
      <div><span>FINANCE · STUDENT & FAMILY ACCOUNTS</span><h1>School Finance Center</h1><p>Fees, term collection accounts, parent payment plans, payment history and education financing.</p></div>
      <div className="finance-top-actions"><Link href="/">School workspace</Link><button type="button">Export ledger</button></div>
    </header>

    <section className="finance-scope"><strong>Prototype finance controls</strong><p>Student financial data is restricted to authorized finance staff, school leadership where permitted, and the linked guardian. Teachers do not receive fee balances or financing records.</p></section>

    <section className="finance-kpis">
      <article><span>Sample invoiced</span><strong>{money(totalInvoiced)}</strong><small>Current-term sample accounts</small></article>
      <article><span>Collected</span><strong>{money(totalPaid)}</strong><small>{Math.round((totalPaid / totalInvoiced) * 100)}% of sample billing</small></article>
      <article><span>Fee outstanding</span><strong>{money(outstanding)}</strong><small>Before financing balances</small></article>
      <article><span>Financing outstanding</span><strong>{money(financed)}</strong><small>Human-reviewed education financing</small></article>
      <article><span>Auto-debit families</span><strong>{students.filter((item) => item.autoDebit).length}</strong><small>Parent-selected monthly plans</small></article>
    </section>

    <nav className="finance-tabs">
      {[['accounts','Student Accounts'],['plans','Payment Plans'],['history','Payment History'],['financing','Financing & Loans']].map(([key,label]) => <button type="button" key={key} onClick={() => setTab(key)} className={tab === key ? "active" : ""}>{label}</button>)}
    </nav>

    <section className="finance-layout">
      <aside className="finance-students">
        <header><h2>Family accounts</h2><p>Choose a student or pupil.</p></header>
        {students.map((item) => <button type="button" key={item.id} onClick={() => chooseStudent(item.id)} className={selected.id === item.id ? "active" : ""}><span>{item.id}</span><strong>{item.student}</strong><small>{item.className} · {item.guardian}</small><em>{money(item.invoiced - item.paid)} fee balance</em></button>)}
      </aside>

      <section className="finance-main">
        {tab === 'accounts' && <>
          <div className="finance-student-head"><div><span>{selected.id}</span><h2>{selected.student}</h2><p>{selected.className} · {selected.guardian}</p></div><Link href={selected.id.startsWith('PRI-') ? `/headmaster/pupils/${selected.id}` : `/principal/students/${selected.id}`}>Open student profile</Link></div>

          <div className="term-account-card"><div><span>ACTIVE TERM PAYMENT ACCOUNT</span><strong>{selected.termAccount}</strong><p>{selected.accountProvider}</p></div><div><span>Account validity</span><strong>{selected.term}</strong><small>Static for this student during the active term. A new account may be issued for a later term.</small></div></div>

          <div className="finance-summary-grid"><div><span>Term invoice</span><strong>{money(selected.invoiced)}</strong></div><div><span>Received</span><strong>{money(selected.paid)}</strong></div><div><span>Fee balance</span><strong>{money(selected.invoiced - selected.paid)}</strong></div><div><span>Financing balance</span><strong>{money(selected.financingOutstanding)}</strong></div></div>

          <div className="finance-info-banner"><strong>Reconciliation rule</strong><p>Transfers into the term account should be reconciled to this student automatically when a real banking/payment webhook is integrated. Manual review remains available for unmatched or reversed transactions.</p></div>
        </>}

        {tab === 'plans' && <>
          <header className="finance-section-head"><div><h2>Parent payment plan</h2><p>The guardian chooses whether SchoolOS may schedule a monthly debit and sets the preferred amount/day within school policy.</p></div><span>Guardian consent required</span></header>
          <div className="plan-form">
            <label className="toggle-row"><div><strong>Monthly automatic charge</strong><small>Prototype consent control. No real debit will occur.</small></div><input type="checkbox" checked={autoDebit} onChange={(event) => { setAutoDebit(event.target.checked); setSaved(false); }} /></label>
            <label>Monthly amount<input type="number" min="0" value={monthlyAmount} onChange={(event) => { setMonthlyAmount(event.target.value); setSaved(false); }} placeholder="25000" /></label>
            <label>Preferred debit day<select value={debitDay} onChange={(event) => { setDebitDay(event.target.value); setSaved(false); }}><option value="">Choose day</option><option>5</option><option>10</option><option>15</option><option>20</option><option>25</option><option>28</option></select></label>
            <label>Funding method<select defaultValue="linked"><option value="linked">Linked parent payment method · mock</option><option value="transfer">Term account transfer only</option></select></label>
            <button type="button" onClick={() => setSaved(true)}>{saved ? "Plan saved locally" : "Save prototype plan"}</button>
          </div>
          <div className="finance-info-banner"><strong>Parent control</strong><p>The production flow should require explicit authorization, clear debit dates and amounts, receipts, cancellation/pause options, failed-debit handling and an audit trail. SchoolOS should never silently enroll a parent in recurring charges.</p></div>
        </>}

        {tab === 'history' && <>
          <header className="finance-section-head"><div><h2>Payment & repayment history</h2><p>Factual transaction history — not a hidden parent credit score.</p></div><span>Auditable ledger</span></header>
          <div className="finance-table"><div className="finance-table-head"><span>Date</span><span>Student</span><span>Reference</span><span>Channel</span><span>Amount</span><span>Status</span></div>{ledger.map((row) => <div key={row.reference}><span>{row.date}</span><strong>{row.student}</strong><code>{row.reference}</code><span>{row.channel}</span><b>{money(row.amount)}</b><em className={`ledger-status ${row.status.toLowerCase().replace(' ','-')}`}>{row.status}</em></div>)}</div>
          <h3 className="history-title">Term history · {selected.student}</h3>
          <div className="history-grid">{history.map((row) => <article key={row.session}><span>{row.session}</span><strong>{money(row.paid)} paid</strong><small>Billed {money(row.billed)} · Financing {money(row.financing)} · Balance {money(row.balance)}</small><em>{row.note}</em></article>)}</div>
        </>}

        {tab === 'financing' && <>
          <header className="finance-section-head"><div><h2>Education financing / student loan ledger</h2><p>Manage approved financing and repayments without automated eligibility decisions.</p></div><button type="button">＋ New financing request</button></header>
          <div className="finance-table financing-table"><div className="finance-table-head"><span>Facility</span><span>Student / Guardian</span><span>Principal</span><span>Repaid</span><span>Outstanding</span><span>Next repayment</span></div>{financing.map((item) => <div key={item.id}><code>{item.id}</code><div><strong>{item.student}</strong><small>{item.guardian}</small></div><span>{money(item.principal)}</span><span>{money(item.repaid)}</span><b>{money(item.outstanding)}</b><div><span>{item.nextDate}</span><small>{item.status}</small></div></div>)}</div>
          <div className="finance-guardrails"><article><strong>Human approval</strong><p>SchoolOS may organize an application and repayment ledger, but it should not approve or deny financing solely from payment history.</p></article><article><strong>No punitive student treatment</strong><p>A parent financing balance must not silently affect academic grading, awards, classroom treatment or AI student-risk scoring.</p></article><article><strong>Transparent repayment</strong><p>Show principal, charges where legally applicable, repayments, outstanding amount, next due date and full transaction history.</p></article></div>
        </>}
      </section>
    </section>
  </main>;
}
