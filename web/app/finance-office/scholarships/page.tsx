"use client";

import { useState } from "react";

const awards=[
 {student:"Yusuf Bello",className:"JSS 2B",type:"Founder Scholarship",gross:185000,amount:75000,parent:110000,sponsor:"BrightGate Founder Fund",status:"Approved"},
 {student:"Hafsa Abdullahi",className:"Primary 3",type:"Sibling Discount",gross:145000,amount:10000,parent:135000,sponsor:"School policy",status:"Applied"},
 {student:"Muhammad Kabir",className:"Primary 5",type:"Academic Scholarship",gross:145000,amount:50000,parent:95000,sponsor:"BrightGate Scholarship Fund",status:"Approved"},
 {student:"Aisha Ibrahim",className:"Nursery 2",type:"Staff Child Discount",gross:117500,amount:23500,parent:94000,sponsor:"Staff benefit policy",status:"Applied"},
];
const money=(n:number)=>`₦${n.toLocaleString("en-NG")}`;

export default function ScholarshipsPage(){
 const [filter,setFilter]=useState("All");
 const [notice,setNotice]=useState("");
 const visible=filter==="All"?awards:awards.filter(a=>a.type.includes(filter));
 const total=awards.reduce((s,a)=>s+a.amount,0);
 return <main className="fo-page">
  <header className="fo-head"><div><span>FINANCE OFFICE · CONCESSIONS</span><h1>Scholarships & Discounts</h1><p>Track every approved concession separately so proprietors never confuse supported students with unpaid debt.</p></div><div className="fo-actions"><select value={filter} onChange={e=>setFilter(e.target.value)}><option>All</option><option>Scholarship</option><option>Discount</option></select><button className="primary" onClick={()=>setNotice("New concession workflow opened locally in this UI prototype.")}>＋ New concession</button></div></header>
  <section className="ra-kpis"><article><span>Gross fee represented</span><strong>{money(592500)}</strong><small>Sample award population</small></article><article><span>Scholarships & discounts</span><strong>{money(total)}</strong><small>Approved concessions</small></article><article><span>Net parent obligation</span><strong>{money(592500-total)}</strong><small>After concessions</small></article><article><span>Students supported</span><strong>4</strong><small>Sample records</small></article><article><span>Pending review</span><strong>3</strong><small>Human approval queue</small></article></section>
  {notice&&<div className="ra-notice">{notice}</div>}
  <section className="fo-grid two"><article className="fo-card"><header><div><h2>Concession ledger</h2><p>Every award shows the original fee and the amount the family truly owes afterward.</p></div></header><div className="ra-table"><div className="ra-table-head concession"><span>Student</span><span>Type</span><span>Gross fee</span><span>Concession</span><span>Parent obligation</span><span>Status</span></div>{visible.map(a=><div className="ra-table-row concession" key={`${a.student}-${a.type}`}><div><strong>{a.student}</strong><small>{a.className}</small></div><span>{a.type}</span><span>{money(a.gross)}</span><b>{money(a.amount)}</b><strong>{money(a.parent)}</strong><em>{a.status}</em></div>)}</div></article><aside className="fo-card"><header><div><h2>Concession types</h2><p>Keep financial support explicit and reportable.</p></div></header><div className="fo-list"><div><strong>Scholarships</strong><span>Founder, academic, community, sports or external sponsor awards.</span><small>Tracked as support, not debt.</small></div><div><strong>Discounts</strong><span>Sibling, staff-child and policy-based reductions.</span><small>Reduces billable amount before collection.</small></div><div><strong>Approved waivers</strong><span>Specific authorized charges written off by policy.</span><small>Requires clear approval trail.</small></div><div><strong>Sponsorships</strong><span>Third party pays all or part of the child obligation.</span><small>Sponsor receivable can be tracked separately.</small></div></div></aside></section>
  <section className="fo-grid equal"><article className="fo-card"><header><div><h2>Funding source</h2><p>Who absorbs the concession.</p></div></header><div className="ra-bars-horizontal"><div><span>Founder / school fund</span><i><b style={{width:"72%"}}/></i><strong>₦125k</strong></div><div><span>Policy discounts</span><i><b style={{width:"34%"}}/></i><strong>₦33.5k</strong></div><div><span>External sponsors</span><i><b style={{width:"18%"}}/></i><strong>₦0 sample</strong></div></div></article><article className="fo-card"><header><div><h2>Control principle</h2><p>The collection engine uses the net obligation.</p></div></header><div className="fo-callout">If a student has a ₦185,000 standard fee and receives a ₦75,000 scholarship, SchoolOS should normally set the parent obligation and term-account collection ceiling from ₦110,000—not continue treating ₦75,000 as unpaid school fees.</div></article></section>
 </main>;
}
