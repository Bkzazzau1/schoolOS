"use client";

import { useMemo, useState } from "react";
import SchoolLifeNav from "../../components/school-life-nav";
import "../school-life.css";

type VisitStatus = "Expected" | "On campus" | "Checked out" | "Review";
type Visit = { id:string; visitor:string; organization:string; purpose:string; host:string; area:string; arrival:string; departure:string; status:VisitStatus; pass:string; note:string };
const visits:Visit[]=[
  {id:"VIS-101",visitor:"Mrs. Zainab Ahmed",organization:"Parent / Guardian",purpose:"Scheduled meeting",host:"Primary Office",area:"Primary reception",arrival:"9:10 AM",departure:"10:02 AM",status:"Checked out",pass:"V-101",note:"Scheduled guardian meeting; normal checkout completed."},
  {id:"VIS-102",visitor:"Mr. Samuel Okoro",organization:"EduTech Services",purpose:"ICT maintenance",host:"ICT Department",area:"ICT Lab",arrival:"10:25 AM",departure:"—",status:"On campus",pass:"V-102",note:"Vendor access limited to approved work area with staff host."},
  {id:"VIS-103",visitor:"Dr. Mary James",organization:"Guest speaker",purpose:"Career talk",host:"Principal Office",area:"Assembly Hall",arrival:"Expected 12:15 PM",departure:"—",status:"Expected",pass:"Pre-reg",note:"Pre-registered guest for Secondary programme."},
  {id:"VIS-104",visitor:"Delivery Rider",organization:"Courier",purpose:"Package delivery",host:"Front Office",area:"Reception only",arrival:"11:05 AM",departure:"11:12 AM",status:"Checked out",pass:"Desk log",note:"No student-area access required."},
];

export default function VisitorsPage(){
  const [status,setStatus]=useState("All statuses");
  const [query,setQuery]=useState("");
  const [checked,setChecked]=useState<string[]>([]);
  const visible=useMemo(()=>visits.filter(v=>(status==="All statuses"||v.status===status)&&`${v.visitor} ${v.organization} ${v.purpose} ${v.host}`.toLowerCase().includes(query.toLowerCase())),[status,query]);
  return <main className="school-life-page">
    <SchoolLifeNav active="visitors" />
    <section className="school-life-scope"><div><strong>Visitor Management</strong><span>Front-office access and host accountability</span></div><p>Track expected visitors, purpose, host, permitted area, pass and checkout status. The school community should never see a public directory of visitors.</p></section>
    <section className="school-life-stat-grid"><article className="school-life-stat"><span>Visits today</span><strong>{visits.length}</strong><small>Representative UI records</small></article><article className="school-life-stat"><span>On campus</span><strong>1</strong><small>Currently signed in</small></article><article className="school-life-stat"><span>Expected</span><strong>1</strong><small>Pre-registered</small></article><article className="school-life-stat"><span>Checked out</span><strong>2</strong><small>Completed visits</small></article><article className="school-life-stat"><span>Unescorted exceptions</span><strong>0</strong><small>Prototype indicator</small></article></section>
    <section className="school-life-grid"><article className="school-life-card"><div className="school-life-section-head"><div><h2>Front-office visitor register</h2><p>Visitors should have a clear host, purpose and permitted area before wider campus access.</p></div></div><div className="school-life-filters"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search visitor, purpose or host..."/><select value={status} onChange={e=>setStatus(e.target.value)}><option>All statuses</option><option>Expected</option><option>On campus</option><option>Checked out</option><option>Review</option></select></div><div className="activity-list">{visible.map(v=>{const done=checked.includes(v.id);return <div className="activity-row" key={v.id}><div className="activity-icon">◉</div><div><div className="activity-meta"><span>{v.status}</span><span>{v.pass}</span><span>{v.area}</span></div><h3>{v.visitor}</h3><p>{v.organization} · {v.purpose}</p><p>Host: {v.host} · Arrival {v.arrival} · Departure {v.departure}</p><small>{v.note}</small><div className="notice-actions" style={{marginTop:8}}><button onClick={()=>setChecked(c=>c.includes(v.id)?c.filter(id=>id!==v.id):[...c,v.id])}>{done?"Reopen front-desk review":"Mark record reviewed"}</button></div></div><span className="activity-status">{done?"Reviewed":v.status}</span></div>})}</div></article><aside className="school-life-sidebar"><article className="school-life-card"><span className="school-life-kicker">ACCESS RULES</span><div className="school-life-policy-list"><div><strong>Host required</strong><small>Visitor access should be tied to an accountable staff office/person.</small></div><div><strong>Minimum data</strong><small>Collect only what the school needs for safety and operational accountability.</small></div><div><strong>Restricted log</strong><small>Visitor history should not be visible to ordinary students or general community users.</small></div></div></article><article className="school-life-card"><span className="school-life-kicker">PICKUP NOTE</span><p style={{margin:"6px 0 0",color:"#69768a",fontSize:12,lineHeight:1.65}}>Authorized child pickup should later use its own relationship/authorization check. A generic visitor pass must not automatically authorize collection of a child.</p></article></aside></section>
  </main>;
}
