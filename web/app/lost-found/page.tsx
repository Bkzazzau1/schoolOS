"use client";

import { useMemo, useState } from "react";
import SchoolLifeNav from "../../components/school-life-nav";
import "../school-life.css";

type ItemStatus = "Unclaimed" | "Claim review" | "Returned";
type Item = { id:string; item:string; category:string; found:string; date:string; storage:string; status:ItemStatus; claimant:string; note:string };
const items:Item[]=[
  {id:"LF-101",item:"Blue school sweater",category:"Uniform",found:"Primary playground",date:"13 Sep 2026",storage:"Front Office Shelf A",status:"Unclaimed",claimant:"—",note:"Name tag is not visible in the public listing."},
  {id:"LF-102",item:"Black water bottle",category:"Personal item",found:"ICT Lab",date:"12 Sep 2026",storage:"Front Office Shelf B",status:"Claim review",claimant:"Primary 6 guardian request",note:"Claim should be verified using item details not shown publicly."},
  {id:"LF-103",item:"Mathematics textbook",category:"Book",found:"JSS 2 corridor",date:"11 Sep 2026",storage:"Secondary Office",status:"Returned",claimant:"Verified student",note:"Returned after ownership check."},
  {id:"LF-104",item:"Lunch bag",category:"Meal item",found:"Main cafeteria",date:"13 Sep 2026",storage:"Cafeteria desk",status:"Unclaimed",claimant:"—",note:"Perishable contents handled separately; bag retained."},
  {id:"LF-105",item:"Sports shoes",category:"Sports",found:"Changing area",date:"10 Sep 2026",storage:"Sports Office",status:"Unclaimed",claimant:"—",note:"Pair stored together with internal identifying notes."},
];

export default function LostFoundPage(){
  const [status,setStatus]=useState("All statuses");
  const [query,setQuery]=useState("");
  const [overrides,setOverrides]=useState<Record<string,ItemStatus>>({});
  const live=items.map(i=>({...i,status:overrides[i.id]??i.status}));
  const visible=useMemo(()=>live.filter(i=>(status==="All statuses"||i.status===status)&&`${i.item} ${i.category} ${i.found}`.toLowerCase().includes(query.toLowerCase())),[query,status,overrides]);
  return <main className="school-life-page">
    <SchoolLifeNav active="lost-found" />
    <section className="school-life-scope"><div><strong>Lost & Found</strong><span>Item recovery without exposing private identifiers</span></div><p>Log found items, storage location and claim status. Public-facing descriptions should omit identifying details that can be used to falsely claim an item.</p></section>
    <section className="school-life-stat-grid"><article className="school-life-stat"><span>Open items</span><strong>{live.filter(i=>i.status!=="Returned").length}</strong><small>Current mock register</small></article><article className="school-life-stat"><span>Claim review</span><strong>{live.filter(i=>i.status==="Claim review").length}</strong><small>Needs ownership check</small></article><article className="school-life-stat"><span>Returned</span><strong>{live.filter(i=>i.status==="Returned").length}</strong><small>Current sample</small></article><article className="school-life-stat"><span>Storage points</span><strong>4</strong><small>Front office + section desks</small></article><article className="school-life-stat"><span>Auto disposal</span><strong>Off</strong><small>Policy required later</small></article></section>
    <section className="school-life-grid"><article className="school-life-card"><div className="school-life-section-head"><div><h2>Found-item register</h2><p>Claim verification happens through staff; the school feed should never reveal every identifying detail.</p></div></div><div className="school-life-filters"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search item, category or location..."/><select value={status} onChange={e=>setStatus(e.target.value)}><option>All statuses</option><option>Unclaimed</option><option>Claim review</option><option>Returned</option></select></div><div className="activity-list">{visible.map(i=><div className="activity-row" key={i.id}><div className="activity-icon">?</div><div><div className="activity-meta"><span>{i.category}</span><span>{i.status}</span><span>{i.date}</span></div><h3>{i.item}</h3><p>Found: {i.found} · Stored: {i.storage}</p><p>{i.note}</p><small>Claimant: {i.claimant}</small><div className="notice-actions" style={{marginTop:8}}><button onClick={()=>setOverrides(c=>({...c,[i.id]:"Claim review"}))}>Start claim review</button><button onClick={()=>setOverrides(c=>({...c,[i.id]:"Returned"}))}>Mark returned</button></div></div><span className="activity-status">{i.status}</span></div>)}</div></article><aside className="school-life-sidebar"><article className="school-life-card"><span className="school-life-kicker">CLAIM RULE</span><div className="school-life-policy-list"><div><strong>Keep one detail private</strong><small>Use hidden identifying details to verify the claimant.</small></div><div><strong>No child contact data</strong><small>Do not publish names, phone numbers or addresses in item listings.</small></div><div><strong>Retention policy later</strong><small>Schools can configure how long unclaimed items remain before disposal/donation.</small></div></div></article></aside></section>
  </main>;
}
