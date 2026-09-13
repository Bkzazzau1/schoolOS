"use client";

import Link from "next/link";
import { useState } from "react";

const orders=[
 {id:"ORD-2026-00481",child:"Maryam Abdullahi",className:"JSS 2A",items:["2 School Shirts","1 Skirt","JSS Book Pack"],amount:"₦34,500",account:"2038457291",bank:"Partner Bank Store Rail",status:"Partially issued",issue:"Uniform issued · Book Pack pending",receipt:"BGA/STORE/2026/00182",expires:"18 Sep 2026"},
 {id:"ORD-2026-00482",child:"Hafsa Abdullahi",className:"Primary 3",items:["Primary Book Pack","Cardigan"],amount:"₦28,500",account:"2038457307",bank:"Partner Bank Store Rail",status:"Paid · ready",issue:"Ready for collection",receipt:"BGA/STORE/2026/00183",expires:"19 Sep 2026"},
 {id:"ORD-2026-00503",child:"Hafsa Abdullahi",className:"Primary 3",items:["Sportswear Set"],amount:"₦12,500",account:"2038457412",bank:"Partner Bank Store Rail",status:"Awaiting payment",issue:"Not issued",receipt:"—",expires:"20 Sep 2026"},
];

export default function ParentPurchasesPage(){
 const [selected,setSelected]=useState(orders[0].id);const [copied,setCopied]=useState("");const current=orders.find(o=>o.id===selected)??orders[0];
 async function copyAccount(){try{await navigator.clipboard.writeText(current.account)}catch{}setCopied(current.account)}
 return <main className="family-page">
  <header className="family-head"><div><span className="family-kicker">FAMILY FINANCE · SCHOOL STORE</span><h1>Purchases & Orders</h1><p>Books, uniforms and other school-store purchases are kept separate from school-fee payments.</p></div><div className="family-actions"><Link href="/parent/finance">School fees</Link><Link className="primary" href="/parent/finance/receipts">Receipts</Link></div></header>
  <section className="family-finance-kpis"><article><span>Open orders</span><strong>3</strong><small>Current family orders</small></article><article><span>Paid orders</span><strong>2</strong><small>Separate from tuition</small></article><article><span>Awaiting payment</span><strong>1</strong><small>Dynamic account active</small></article><article><span>Ready / pending issue</span><strong>2</strong><small>Collection status tracked</small></article></section>
  <section className="family-grid two"><article className="family-card"><header><div><h2>Orders</h2><p>Select an order to see payment and issue details.</p></div></header><div className="family-link-list">{orders.map(o=><button key={o.id} onClick={()=>setSelected(o.id)}><strong>{o.child} · {o.id}</strong><span>{o.items.join(" · ")}</span><span>{o.amount} · {o.status}</span></button>)}</div></article>
   <article className="family-card"><header><div><h2>{current.id}</h2><p>{current.child} · {current.className}</p></div></header><div className="family-account-list"><div><div><strong>Order payment account</strong><span>{current.bank}</span></div><div><small>Dynamic account</small><b>{current.account}</b></div><div><small>Exact amount</small><b>{current.amount}</b></div></div></div><div className="family-plan" style={{marginTop:10}}><button className="family-save" onClick={copyAccount}>{copied===current.account?"Account copied":"Copy payment account"}</button></div><div className="family-list" style={{marginTop:10}}><div><strong>Payment status</strong><span>{current.status}</span></div><div><strong>Issue status</strong><span>{current.issue}</span></div><div><strong>Account expiry</strong><span>{current.expires}</span></div><div><strong>Store receipt</strong><span>{current.receipt}</span></div></div></article>
  </section>
  <section className="family-card"><header><div><h2>Why this payment is separate</h2><p>Your school-fee term account is never used for store purchases.</p></div></header><div className="family-list"><div><strong>School fees</strong><span>Use the child’s static term account. Payments reduce tuition/term obligations only.</span></div><div><strong>Books & uniforms</strong><span>Each order receives a separate temporary account for the exact invoice amount.</span></div><div><strong>After payment</strong><span>The store order changes to paid, a store receipt becomes available, and issue/collection status is tracked until completion.</span></div></div></section>
 </main>
}
