"use client";

import { useMemo, useState } from "react";
import SchoolLifeNav from "../../components/school-life-nav";
import "../school-life.css";

type Dorm = { name:string; houseParent:string; capacity:number; occupied:number; onCampus:number; approvedLeave:number; maintenance:number; status:"Normal"|"Review"; note:string };
const dorms:Dorm[]=[
  {name:"Amina Hall",houseParent:"Mrs. Grace Daniel",capacity:48,occupied:44,onCampus:42,approvedLeave:2,maintenance:0,status:"Normal",note:"Girls senior dormitory; evening roll and welfare handover complete."},
  {name:"Unity Hall",houseParent:"Mr. Samuel Peter",capacity:52,occupied:49,onCampus:47,approvedLeave:2,maintenance:0,status:"Normal",note:"Boys senior dormitory; normal operations."},
  {name:"Peace Hall",houseParent:"Mrs. Ruth Musa",capacity:36,occupied:32,onCampus:31,approvedLeave:1,maintenance:2,status:"Review",note:"Two maintenance items awaiting facilities follow-up."},
];

export default function BoardingPage(){
  const [previewEnabled,setPreviewEnabled]=useState(true);
  const [query,setQuery]=useState("");
  const [reviewed,setReviewed]=useState<string[]>([]);
  const visible=useMemo(()=>dorms.filter(d=>`${d.name} ${d.houseParent} ${d.status}`.toLowerCase().includes(query.toLowerCase())),[query]);
  const occupied=dorms.reduce((s,d)=>s+d.occupied,0);
  const capacity=dorms.reduce((s,d)=>s+d.capacity,0);
  const onCampus=dorms.reduce((s,d)=>s+d.onCampus,0);
  const approvedLeave=dorms.reduce((s,d)=>s+d.approvedLeave,0);
  const maintenance=dorms.reduce((s,d)=>s+d.maintenance,0);
  return <main className="school-life-page">
    <SchoolLifeNav active="boarding" />
    <section className="school-life-scope"><div><strong>Boarding & Hostel</strong><span>Optional school module</span></div><p>Schools without boarding can remove this module through tenant configuration later. This page only previews enabled/disabled UI states; it does not change school configuration.</p></section>
    <section className="school-life-stat-grid"><article className="school-life-stat"><span>Preview state</span><strong>{previewEnabled?"Enabled":"Off"}</strong><small>Local UI only</small></article><article className="school-life-stat"><span>Dorm occupancy</span><strong>{occupied}/{capacity}</strong><small>Current mock residents</small></article><article className="school-life-stat"><span>On campus</span><strong>{onCampus}</strong><small>Derived from dorm records</small></article><article className="school-life-stat"><span>Approved leave</span><strong>{approvedLeave}</strong><small>Expected return tracked separately</small></article><article className="school-life-stat"><span>Maintenance items</span><strong>{maintenance}</strong><small>Facilities follow-up</small></article></section>
    <section className="school-life-grid"><article className="school-life-card"><div className="school-life-section-head"><div><h2>Dormitory overview</h2><p>Operational accountability without continuous or invasive monitoring of students.</p></div><button onClick={()=>setPreviewEnabled(v=>!v)}>{previewEnabled?"Preview disabled state":"Restore enabled preview"}</button></div>{previewEnabled?<><div className="school-life-filters"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search dorm or house parent..."/></div><div className="activity-list">{visible.map(d=>{const done=reviewed.includes(d.name);return <div className="activity-row" key={d.name}><div className="activity-icon">⌂</div><div><div className="activity-meta"><span>{d.status}</span><span>{d.occupied}/{d.capacity} occupied</span><span>{d.approvedLeave} on leave</span></div><h3>{d.name}</h3><p>House parent: {d.houseParent}</p><p>{d.note}</p><small>{d.onCampus} on campus · {d.maintenance} maintenance items</small><div className="notice-actions" style={{marginTop:8}}><button onClick={()=>setReviewed(c=>c.includes(d.name)?c.filter(x=>x!==d.name):[...c,d.name])}>{done?"Reopen review":"Mark handover reviewed"}</button></div></div><span className="activity-status">{done?"Reviewed":d.status}</span></div>})}</div></>:<div className="school-life-note"><strong>Disabled-state preview only</strong>In production, a day school would disable Boarding in tenant settings and the module would disappear from shared navigation. This local button does not persist or alter access.</div>}</article><aside className="school-life-sidebar"><article className="school-life-card"><span className="school-life-kicker">BOARDING BOUNDARY</span><div className="school-life-policy-list"><div><strong>Welfare, not surveillance</strong><small>Use roll checks, duty handover and approved leave—not intrusive monitoring.</small></div><div><strong>Restricted records</strong><small>Private welfare or health details belong in authorized workflows.</small></div><div><strong>Optional by tenant</strong><small>Day schools should not carry unused hostel navigation once tenant configuration is implemented.</small></div></div></article></aside></section>
  </main>;
}
