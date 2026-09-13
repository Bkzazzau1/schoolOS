"use client";

import { useMemo, useState } from "react";

const accounts = [
  {id:"BGA/2023/SEC/001",student:"Maryam Abdullahi",className:"JSS 2A",guardian:"Alhaji Abdullahi Yusuf",account:"1047263815",provider:"Partner Bank A",gross:185000,scholarship:0,discount:0,paid:60000,limit:125000,status:"Active",last:"₦25,000 · 13 Sep"},
  {id:"BGA/2022/PRI/003",student:"Hafsa Abdullahi",className:"Primary 3",guardian:"Alhaji Abdullahi Yusuf",account:"1047263914",provider:"Partner Bank A",gross:145000,scholarship:0,discount:10000,paid:80000,limit:55000,status:"Active",last:"₦20,000 · 12 Sep"},
  {id:"BGA/2024/PRI/014",student:"Muhammad Kabir",className:"Primary 5",guardian:"Alhaji Kabir Musa",account:"1047263948",provider:"Partner Bank B",gross:155000,scholarship:30000,discount:0,paid:75000,limit:50000,status:"Active",last:"₦50,000 · Today"},
  {id:"BGA/2025/NUR/007",student:"Zainab Aliyu",className:"Nursery 2",guardian:"Hajiya Aisha Aliyu",account:"1047263999",provider:"Partner Bank B",gross:125000,scholarship:25000,discount:0,paid:50000,limit:50000,status:"Review",last:"₦15,000 · Today"},
];

const feed=[
  {time:"10:42 AM",student:"Maryam Abdullahi",amount:25000,account:"1047263815",status:"Confirmed",ref:"TRX-260913-94821"},
  {time:"10:37 AM",student:"Muhammad Kabir",amount:50000,account:"1047263948",status:"Confirmed",ref:"TRX-260913-94817"},
  {time:"10:31 AM",student:"Zainab Aliyu",amount:15000,account:"1047263999",status:"Confirmed",ref:"TRX-260913-94811"},
  {time:"09:58 AM",student:"Hafsa Abdullahi",amount:20000,account:"1047263914",status:"Confirmed",ref:"TRX-260913-94790"},
];

const money=(n:number)=>`₦${n.toLocaleString("en-NG")}`;

export default function SmartCollectionsPage(){
  const [selected,setSelected]=useState(accounts[0]);
  const [temporaryLimit,setTemporaryLimit]=useState(String(accounts[0].limit));
  const [reason,setReason]=useState("Term fee + approved charges");
  const [notice,setNotice]=useState("");
  const totals=useMemo(()=>({gross:accounts.reduce((s,a)=>s+a.gross,0),concession:accounts.reduce((s,a)=>s+a.scholarship+a.discount,0),paid:accounts.reduce((s,a)=>s+a.paid,0)}),[]);
  const outstanding=totals.gross-totals.concession-totals.paid;

  function choose(a:(typeof accounts)[number]){setSelected(a);setTemporaryLimit(String(a.limit));setNotice("");}
  function saveLimit(){setNotice(`Prototype limit updated for ${selected.student}: ${money(Number(temporaryLimit)||0)}.`)}

  return <main>
    <header className="fo-head"><div><span>REVENUE ASSURANCE · SMART COLLECTIONS</span><h1>Collections Control Room</h1><p>Unique term accounts, flexible deposits, collection limits, live payment identification and automatic receipts.</p></div><div className="fo-actions"><button>Export collections</button><button className="primary">＋ New special arrangement</button></div></header>

    <section className="fo-kpis"><article><span>Gross term fees</span><strong>{money(totals.gross)}</strong><small>Selected prototype accounts</small></article><article><span>Scholarships & discounts</span><strong>{money(totals.concession)}</strong><small>Removed before collection</small></article><article><span>Collected</span><strong>{money(totals.paid)}</strong><small>Across term accounts</small></article><article><span>Outstanding</span><strong>{money(outstanding)}</strong><small>Net parent obligation</small></article><article><span>Active term accounts</span><strong>{accounts.length}</strong><small>One per child · per term</small></article></section>

    <section className="smart-collection-grid">
      <article className="fo-card smart-account-list"><header><div><h2>Student term accounts</h2><p>Static account number for the active term.</p></div></header>{accounts.map(a=><button key={a.account} onClick={()=>choose(a)} className={selected.account===a.account?"active":""}><div><strong>{a.student}</strong><span>{a.className} · {a.id}</span></div><div><code>{a.account}</code><small>{a.provider}</small></div><div><b>{money(a.gross-a.scholarship-a.discount-a.paid)}</b><small>outstanding</small></div></button>)}</article>

      <article className="fo-card smart-account-detail"><header><div><h2>{selected.student}</h2><p>{selected.className} · {selected.guardian}</p></div><em>{selected.status}</em></header>
        <div className="term-account-hero"><span>2026/2027 · TERM 1 COLLECTION ACCOUNT</span><strong>{selected.account}</strong><small>{selected.provider} · Account name: BRIGHTGATE / {selected.student.toUpperCase()}</small></div>
        <div className="smart-money-grid"><div><span>Gross fee</span><strong>{money(selected.gross)}</strong></div><div><span>Scholarship</span><strong>{money(selected.scholarship)}</strong></div><div><span>Discount</span><strong>{money(selected.discount)}</strong></div><div><span>Paid</span><strong>{money(selected.paid)}</strong></div><div><span>Outstanding</span><strong>{money(selected.gross-selected.scholarship-selected.discount-selected.paid)}</strong></div><div><span>Collection ceiling</span><strong>{money(selected.limit)}</strong></div></div>
        <div className="fo-callout">Parents may deposit smaller amounts at any time. The UI treats this as <strong>amount paid toward fees</strong>, not as money stored in a wallet. Payments above the authorized collection ceiling require a school-arranged limit change.</div>
      </article>
    </section>

    <section className="fo-grid two">
      <article className="fo-card"><header><div><h2>Collection limit control</h2><p>Temporary or permanent ceiling for unusually large incoming payments.</p></div><span className="smart-tag">Audited change</span></header><div className="smart-limit-form"><label>Current account<input value={selected.account} readOnly/></label><label>Authorized receivable<input value={temporaryLimit} onChange={e=>setTemporaryLimit(e.target.value)} type="number"/></label><label>Reason<select value={reason} onChange={e=>setReason(e.target.value)}><option>Term fee + approved charges</option><option>Transport + tuition</option><option>Books + tuition</option><option>Previous-term arrears</option><option>Advance payment</option><option>Other approved arrangement</option></select></label><label>Validity<select defaultValue="term"><option value="term">Until term closes</option><option value="24h">24 hours</option><option value="72h">72 hours</option><option value="7d">7 days</option></select></label><button onClick={saveLimit}>Authorize prototype limit</button>{notice&&<small>{notice}</small>}</div></article>

      <article className="fo-card"><header><div><h2>Collection status</h2><p>What finance staff need to resolve today.</p></div></header><div className="fo-list"><div><strong>7 failed mandate attempts</strong><span>Retry, reschedule or contact guardian.</span></div><div><strong>2 unmatched bank transactions</strong><span>Need reference/account investigation.</span></div><div><strong>1 over-limit attempt</strong><span>Awaiting special arrangement approval.</span></div><div><strong>11 accounts nearly cleared</strong><span>Outstanding balance below ₦20,000.</span></div></div></article>
    </section>

    <section className="fo-card"><header><div><h2>Live collections feed</h2><p>Credits arriving through unique student term accounts.</p></div><span className="smart-live">● Live prototype</span></header><div className="smart-feed"><div className="smart-feed-head"><span>Time</span><span>Student</span><span>Account</span><span>Reference</span><span>Amount</span><span>Status</span></div>{feed.map(x=><div key={x.ref}><span>{x.time}</span><strong>{x.student}</strong><code>{x.account}</code><code>{x.ref}</code><b>{money(x.amount)}</b><em>{x.status}</em></div>)}</div></section>
  </main>
}
