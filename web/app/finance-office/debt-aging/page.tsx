"use client";

import { useState } from "react";

const families=[
 {family:"Abdullahi Yusuf Family",children:"Maryam · Hafsa",balance:180000,age:"0–30 days",plan:"Mandate active",next:"25 Sep",status:"Scheduled"},
 {family:"Musa Bello Family",children:"Yusuf",balance:50000,age:"31–60 days",plan:"Partial payment",next:"Contacted 12 Sep",status:"Watch"},
 {family:"Sani Ibrahim Family",children:"Ibrahim",balance:100000,age:"61–90 days",plan:"Financing active",next:"25 Sep",status:"Structured"},
 {family:"Kabir Ahmad Family",children:"Muhammad · Zainab",balance:135000,age:"90+ days",plan:"No arrangement",next:"Finance follow-up",status:"Action"},
 {family:"Aliyu Umar Family",children:"Aisha",balance:35000,age:"0–30 days",plan:"Manual deposits",next:"Last paid 10 Sep",status:"Current"},
];
const money=(n:number)=>`₦${n.toLocaleString("en-NG")}`;

export default function DebtAgingPage(){
 const [bucket,setBucket]=useState("All");
 const visible=bucket==="All"?families:families.filter(f=>f.age===bucket);
 return <main className="fo-page">
  <header className="fo-head"><div><span>FINANCE OFFICE · RECEIVABLES</span><h1>Outstanding Fees & Aging</h1><p>Separate current balances, scheduled collections, structured financing and genuinely overdue debt before taking action.</p></div><div className="fo-actions"><select value={bucket} onChange={e=>setBucket(e.target.value)}><option>All</option><option>0–30 days</option><option>31–60 days</option><option>61–90 days</option><option>90+ days</option></select><button className="primary">Export aging</button></div></header>

  <section className="ra-kpis"><article><span>Total open receivables</span><strong>₦18.7m</strong><small>After scholarships & discounts</small></article><article><span>0–30 days</span><strong>₦8.2m</strong><small>Current / newly due</small></article><article><span>31–60 days</span><strong>₦5.4m</strong><small>Follow-up window</small></article><article><span>61–90 days</span><strong>₦3.1m</strong><small>Structured review</small></article><article><span>90+ days</span><strong>₦2.0m</strong><small>Priority owner visibility</small></article></section>

  <section className="fo-grid two"><article className="fo-card"><header><div><h2>Receivable aging</h2><p>Age alone does not tell the whole story—collection arrangements matter.</p></div></header><div className="ra-aging"><div><span>0–30 days</span><i><b style={{width:"100%"}}/></i><strong>₦8.2m</strong></div><div><span>31–60 days</span><i><b style={{width:"66%"}}/></i><strong>₦5.4m</strong></div><div><span>61–90 days</span><i><b style={{width:"38%"}}/></i><strong>₦3.1m</strong></div><div><span>90+ days</span><i><b style={{width:"24%"}}/></i><strong>₦2.0m</strong></div></div></article><aside className="fo-card"><header><div><h2>Arrangement quality</h2><p>How much of the outstanding balance already has a recovery path.</p></div></header><div className="fo-list"><div><strong>₦6.8m · Active mandates</strong><span>Authorized future collection attempts scheduled.</span><small>Do not classify as unarranged debt.</small></div><div><strong>₦3.4m · Payment plans</strong><span>Families making agreed partial payments.</span><small>Monitor adherence.</small></div><div><strong>₦1.2m · Education financing</strong><span>Approved structured repayment.</span><small>Tracked separately from ordinary arrears.</small></div><div><strong>₦7.3m · No active arrangement</strong><span>Requires finance follow-up or school-approved action.</span><small>Primary collection attention.</small></div></div></aside></section>

  <section className="fo-card"><header><div><h2>Family receivables queue</h2><p>Operational view for respectful collection follow-up.</p></div></header><div className="ra-table"><div className="ra-table-head aging"><span>Family</span><span>Children</span><span>Balance</span><span>Age</span><span>Arrangement</span><span>Next action</span><span>Status</span></div>{visible.map(f=><div className="ra-table-row aging" key={f.family}><strong>{f.family}</strong><span>{f.children}</span><b>{money(f.balance)}</b><span>{f.age}</span><span>{f.plan}</span><span>{f.next}</span><em className={f.status==="Action"?"danger":f.status==="Watch"?"watch":""}>{f.status}</em></div>)}</div></section>

  <section className="fo-grid equal"><article className="fo-card"><header><div><h2>Collection actions</h2><p>Actions depend on arrangement, not labels about the family.</p></div></header><div className="ra-actions-grid"><button>Send payment reminder</button><button>Review mandate</button><button>Offer payment plan</button><button>Record promise to pay</button><button>Review financing</button><button>Escalate to proprietor</button></div></article><article className="fo-card"><header><div><h2>SchoolOS principle</h2><p>Finance facts stay separate from treatment of the child.</p></div></header><div className="fo-callout">No debt-aging status should automatically affect grades, classroom participation, academic support, awards or hidden student-risk scoring. The finance team manages the account; academic staff manage learning.</div></article></section>
 </main>;
}
