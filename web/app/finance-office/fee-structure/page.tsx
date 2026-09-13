"use client";

import { useState } from "react";

const sections = [
  {section:"Nursery / Early Years",students:84,tuition:95000,development:10000,activities:7500,technology:5000,total:117500},
  {section:"Primary School",students:286,tuition:115000,development:12000,activities:8000,technology:10000,total:145000},
  {section:"Secondary School",students:278,tuition:145000,development:15000,activities:10000,technology:15000,total:185000},
];

const optional = [
  ["Transport","Route-based","Optional","Assigned after route selection"],
  ["Meals / Feeding","₦35,000","Optional","Per term"],
  ["Boarding","Configured separately","Optional","Where school offers boarding"],
  ["Books / Materials","Class-based","Optional / required by policy","Itemized before billing"],
  ["Uniform","Item-based","Optional","Not merged into tuition silently"],
];

const money=(n:number)=>`₦${n.toLocaleString("en-NG")}`;

export default function FeeStructurePage(){
  const [term,setTerm]=useState("2026/2027 · Term 1");
  const [notice,setNotice]=useState("");
  return <main className="fo-page">
    <header className="fo-head"><div><span>FINANCE OFFICE · BILLING POLICY</span><h1>Fee Structure</h1><p>Define transparent section-level charges before student accounts, discounts, scholarships and collection limits are calculated.</p></div><div className="fo-actions"><select value={term} onChange={e=>setTerm(e.target.value)}><option>2026/2027 · Term 1</option><option>2026/2027 · Term 2</option><option>2026/2027 · Term 3</option></select><button className="primary" onClick={()=>setNotice("Draft fee structure saved locally in this UI prototype.")}>Save draft</button></div></header>

    <section className="ra-kpis"><article><span>Active term</span><strong>{term.split(" · ")[1]}</strong><small>2026/2027 session</small></article><article><span>Early Years base fee</span><strong>{money(117500)}</strong><small>Before optional services</small></article><article><span>Primary base fee</span><strong>{money(145000)}</strong><small>Before optional services</small></article><article><span>Secondary base fee</span><strong>{money(185000)}</strong><small>Before optional services</small></article><article><span>Billing population</span><strong>648</strong><small>Active pupils/students</small></article></section>

    {notice&&<div className="ra-notice">{notice}</div>}

    <section className="fo-card"><header><div><h2>Core term charges by section</h2><p>Every component remains visible instead of hiding all charges inside one number.</p></div><span className="ra-badge">Draft policy</span></header><div className="ra-table"><div className="ra-table-head fee"><span>Section</span><span>Students</span><span>Tuition</span><span>Development</span><span>Activities</span><span>Technology</span><span>Base total</span></div>{sections.map(r=><div className="ra-table-row fee" key={r.section}><strong>{r.section}</strong><span>{r.students}</span><span>{money(r.tuition)}</span><span>{money(r.development)}</span><span>{money(r.activities)}</span><span>{money(r.technology)}</span><b>{money(r.total)}</b></div>)}</div></section>

    <section className="fo-grid two"><article className="fo-card"><header><div><h2>Optional / service charges</h2><p>Added only where the child is actually enrolled in the service.</p></div></header><div className="ra-table"><div className="ra-table-head service"><span>Charge</span><span>Amount</span><span>Mode</span><span>Rule</span></div>{optional.map(r=><div className="ra-table-row service" key={r[0]}><strong>{r[0]}</strong><span>{r[1]}</span><span>{r[2]}</span><span>{r[3]}</span></div>)}</div></article><article className="fo-card"><header><div><h2>Billing sequence</h2><p>How SchoolOS should derive the amount each child can actually be asked to pay.</p></div></header><div className="ra-flow"><div><b>1</b><span><strong>Section fee structure</strong><small>Nursery, Primary or Secondary base charges.</small></span></div><div><b>2</b><span><strong>Optional services</strong><small>Transport, feeding, books and other enrolled services.</small></span></div><div><b>3</b><span><strong>Scholarships & discounts</strong><small>Approved concessions reduce the parent obligation.</small></span></div><div><b>4</b><span><strong>Net collectible</strong><small>Becomes the student term-account collection ceiling.</small></span></div><div><b>5</b><span><strong>Collections</strong><small>Partial deposits and mandates reduce the outstanding balance.</small></span></div></div></article></section>

    <section className="fo-callout"><strong>Important accounting distinction:</strong> fee structure defines what the school charges. Scholarships, sibling/staff discounts and approved waivers reduce what the parent owes. Unpaid balances are calculated only after those concessions are applied.</section>
  </main>;
}
