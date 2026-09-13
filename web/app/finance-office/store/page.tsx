"use client";

import { useMemo, useState } from "react";

type OrderStatus="Awaiting payment"|"Paid · ready"|"Partially issued"|"Completed";
type Order={id:string;student:string;className:string;guardian:string;items:string;amount:number;account:string;expires:string;status:OrderStatus;issued:string};

const seedOrders:Order[]=[
 {id:"ORD-2026-00481",student:"Maryam Abdullahi",className:"JSS 2A",guardian:"Alhaji Abdullahi Yusuf",items:"2 Shirts · 1 Skirt · Book Pack",amount:34500,account:"2038457291",expires:"18 Sep 2026",status:"Partially issued",issued:"Uniform issued · Book Pack pending"},
 {id:"ORD-2026-00482",student:"Hafsa Abdullahi",className:"Primary 3",guardian:"Alhaji Abdullahi Yusuf",items:"Primary Book Pack · Cardigan",amount:28500,account:"2038457307",expires:"19 Sep 2026",status:"Paid · ready",issued:"Awaiting collection"},
 {id:"ORD-2026-00483",student:"Muhammad Kabir",className:"Primary 5",guardian:"Hajiya Amina Kabir",items:"Sportswear Set",amount:12500,account:"2038457315",expires:"18 Sep 2026",status:"Awaiting payment",issued:"Not issued"},
 {id:"ORD-2026-00479",student:"Zainab Aliyu",className:"Nursery 2",guardian:"Alhaji Aliyu Sani",items:"2 Nursery Uniform Sets",amount:22000,account:"2038457264",expires:"15 Sep 2026",status:"Completed",issued:"Fully issued"},
];

const stock=[
 ["School Shirt","160","86","124","₦7,000"],
 ["Skirt","92","41","51","₦8,500"],
 ["Primary Book Pack","110","68","42","₦18,000"],
 ["JSS Book Pack","95","54","41","₦12,000"],
 ["Sportswear Set","78","39","39","₦12,500"],
 ["Cardigan","64","28","36","₦10,500"],
];

function money(v:number){return `₦${v.toLocaleString("en-NG")}`}

export default function SchoolStorePage(){
 const [orders,setOrders]=useState(seedOrders);const [selected,setSelected]=useState(seedOrders[0].id);const [notice,setNotice]=useState("");
 const current=orders.find(o=>o.id===selected)??orders[0];
 const paid=useMemo(()=>orders.filter(o=>o.status!=="Awaiting payment").reduce((s,o)=>s+o.amount,0),[orders]);
 function markPaid(){setOrders(list=>list.map(o=>o.id===selected?{...o,status:"Paid · ready"}:o));setNotice(`${selected} marked paid locally. Store receipt generated.`)}
 function issue(){setOrders(list=>list.map(o=>o.id===selected?{...o,status:"Completed",issued:"Fully issued"}:o));setNotice(`${selected} marked fully issued locally.`)}
 return <main className="fo-page store-page">
  <header className="fo-head"><div><span>FINANCE OFFICE · SCHOOL STORE & SUNDRY COLLECTIONS</span><h1>School Store & Collections</h1><p>Separate tuition from books, uniforms and other school purchases using order-specific payment accounts.</p></div><div className="fo-actions"><button>＋ New order</button><button className="primary">Assign payment account</button></div></header>
  <section className="fo-kpis"><article><span>Store sales</span><strong>{money(paid)}</strong><small>Paid sample orders</small></article><article><span>Open orders</span><strong>3</strong><small>Awaiting payment or issue</small></article><article><span>Paid not fully issued</span><strong>2</strong><small>Owner-visible exception</small></article><article><span>Awaiting payment</span><strong>1</strong><small>Dynamic account active</small></article><article><span>Low-stock items</span><strong>2</strong><small>Review replenishment</small></article></section>

  <section className="store-rule"><strong>Two separate collection rails</strong><div><b>School Fees</b><span>Static student term account · tuition and approved compulsory term charges only.</span></div><div><b>Store / Sundry</b><span>Dynamic account created for one order · exact expected amount · linked directly to goods/services.</span></div></section>

  <section className="fo-grid two"><article className="fo-card"><header><div><h2>Orders & payment accounts</h2><p>Every order has its own expected amount, temporary account and issue status.</p></div></header><div className="store-order-list">{orders.map(o=><button key={o.id} className={selected===o.id?"active":""} onClick={()=>setSelected(o.id)}><div><strong>{o.student}</strong><span>{o.className} · {o.id}</span><small>{o.items}</small></div><div><b>{money(o.amount)}</b><em>{o.status}</em></div></button>)}</div></article>
   <article className="fo-card store-detail"><header><div><h2>{current.id}</h2><p>{current.student} · {current.guardian}</p></div><em>{current.status}</em></header><div className="store-account"><span>DYNAMIC ORDER ACCOUNT</span><strong>{current.account}</strong><small>Partner Bank Store Rail · expires {current.expires}</small></div><div className="store-detail-grid"><div><span>Expected amount</span><strong>{money(current.amount)}</strong></div><div><span>Maximum receivable</span><strong>{money(current.amount)}</strong></div><div><span>Items</span><strong>{current.items}</strong></div><div><span>Issue status</span><strong>{current.issued}</strong></div></div><div className="store-actions"><button onClick={markPaid}>Confirm payment</button><button onClick={issue}>Mark items issued</button><button>Print store receipt</button></div>{notice&&<div className="fo-callout" style={{marginTop:10}}>{notice}</div>}</article>
  </section>

  <section className="fo-grid two"><article className="fo-card"><header><div><h2>Inventory movement</h2><p>Monitor what was received, sold/issued and what remains available.</p></div></header><div className="store-stock"><div className="store-stock-head"><span>Item</span><span>Opening</span><span>Issued</span><span>Available</span><span>Price</span></div>{stock.map(r=><div key={r[0]}><strong>{r[0]}</strong>{r.slice(1).map((v,i)=><span key={i}>{v}</span>)}</div>)}</div></article>
   <article className="fo-card"><header><div><h2>Store control exceptions</h2><p>Money collection and physical issue must reconcile.</p></div></header><div className="fo-list"><div><strong>2 paid orders not fully issued</strong><span>Finance has confirmed payment, but store fulfillment is incomplete.</span><small>Priority control exception</small></div><div><strong>1 order awaiting payment</strong><span>Dynamic account remains active until expiry.</span><small>No tuition balance affected</small></div><div><strong>Books revenue · ₦58,500</strong><span>Tracked separately from tuition collections.</span><small>Store revenue ledger</small></div><div><strong>Uniform revenue · ₦39,000</strong><span>Linked to item issue records and stock movement.</span><small>Inventory-linked</small></div></div></article>
  </section>
 </main>
}
