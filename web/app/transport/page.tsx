"use client";

import { useMemo, useState } from "react";
import SchoolLifeNav from "../../components/school-life-nav";
import "../school-life.css";

type RouteStatus = "On route" | "Arrived" | "Preparing" | "Maintenance";
type Route = { id:string; name:string; vehicle:string; driver:string; assistant:string; riders:number; stops:number; morning:string; afternoon:string; status:RouteStatus; note:string };

const routes:Route[]=[
  {id:"BUS-01",name:"Zaria Road Route",vehicle:"Toyota Coaster · BGA-01",driver:"Mr. Musa Lawal",assistant:"Mrs. Esther John",riders:34,stops:8,morning:"34 / 34 checked",afternoon:"Pending dismissal",status:"Arrived",note:"Morning run completed; vehicle parked on campus."},
  {id:"BUS-02",name:"Barnawa / Kakuri Route",vehicle:"Toyota Hiace · BGA-02",driver:"Mr. Daniel Peter",assistant:"Mr. Kabiru Ali",riders:26,stops:7,morning:"25 / 26 checked",afternoon:"Pending dismissal",status:"Arrived",note:"One registered rider recorded as absent from school today."},
  {id:"BUS-03",name:"Kawo / Ungwan Rimi Route",vehicle:"Toyota Coaster · BGA-03",driver:"Mr. Samuel Audu",assistant:"Mrs. Ruth James",riders:31,stops:9,morning:"31 / 31 checked",afternoon:"Pending dismissal",status:"Arrived",note:"Normal morning service."},
  {id:"BUS-04",name:"Backup Vehicle",vehicle:"Hiace · BGA-04",driver:"Relief pool",assistant:"Assigned as needed",riders:0,stops:0,morning:"Not dispatched",afternoon:"Standby",status:"Maintenance",note:"Routine brake inspection; unavailable until cleared."},
];

export default function TransportPage(){
  const [query,setQuery]=useState("");
  const [status,setStatus]=useState("All statuses");
  const [reviewed,setReviewed]=useState<string[]>([]);
  const visible=useMemo(()=>routes.filter(r=>(status==="All statuses"||r.status===status)&&`${r.name} ${r.vehicle} ${r.driver}`.toLowerCase().includes(query.toLowerCase())),[query,status]);
  const riders=routes.reduce((s,r)=>s+r.riders,0);

  return <main className="school-life-page">
    <SchoolLifeNav active="transport" />
    <section className="school-life-scope"><div><strong>School Transport</strong><span>Routes, vehicles and rider accountability</span></div><p>Coordinate school buses, routes, drivers, assistants, stops and daily rider checks. Live GPS and transport notifications are not implemented in this UI prototype.</p></section>
    <section className="school-life-stat-grid"><article className="school-life-stat"><span>Configured routes</span><strong>3</strong><small>Plus 1 backup vehicle</small></article><article className="school-life-stat"><span>Registered riders</span><strong>{riders}</strong><small>Across active routes</small></article><article className="school-life-stat"><span>Vehicles available</span><strong>3 / 4</strong><small>1 under maintenance</small></article><article className="school-life-stat"><span>Morning exceptions</span><strong>1</strong><small>Absent registered rider</small></article><article className="school-life-stat"><span>GPS tracking</span><strong>Later</strong><small>No live location in UI phase</small></article></section>
    <section className="school-life-grid"><article className="school-life-card"><div className="school-life-section-head"><div><h2>Transport routes</h2><p>Operational status should show who is expected, who checked in and whether the vehicle is cleared.</p></div></div><div className="school-life-filters"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search route, vehicle or driver..."/><select value={status} onChange={e=>setStatus(e.target.value)}><option>All statuses</option><option>Arrived</option><option>On route</option><option>Preparing</option><option>Maintenance</option></select></div><div className="activity-list">{visible.map(r=>{const done=reviewed.includes(r.id);return <div className="activity-row" key={r.id}><div className="activity-icon">▰</div><div><div className="activity-meta"><span>{r.status}</span><span>{r.riders} riders</span><span>{r.stops} stops</span></div><h3>{r.name}</h3><p>{r.vehicle} · Driver {r.driver} · Assistant {r.assistant}</p><p>{r.note}</p><small>Morning: {r.morning} · Afternoon: {r.afternoon}</small><div className="notice-actions" style={{marginTop:8}}><button onClick={()=>setReviewed(c=>c.includes(r.id)?c.filter(id=>id!==r.id):[...c,r.id])}>{done?"Reopen check":"Mark route reviewed"}</button></div></div><span className="activity-status">{done?"Reviewed":r.status}</span></div>})}</div></article><aside className="school-life-sidebar"><article className="school-life-card"><span className="school-life-kicker">TRANSPORT SAFETY</span><div className="school-life-policy-list"><div><strong>Daily rider check</strong><small>Boarding and school-arrival status should be reconciled.</small></div><div><strong>Vehicle readiness</strong><small>Maintenance clearance should override scheduling.</small></div><div><strong>Authorized staff only</strong><small>Detailed rider lists and pickup points should not be public.</small></div></div></article><article className="school-life-card"><span className="school-life-kicker">PARENT EXPERIENCE LATER</span><p style={{margin:"6px 0 0",color:"#69768a",fontSize:12,lineHeight:1.65}}>Parents can later receive their own child&apos;s route, boarding/drop status and approved transport alerts without seeing other children&apos;s addresses or stops.</p></article></aside></section>
  </main>;
}
