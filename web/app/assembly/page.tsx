"use client";

import { useMemo, useState } from "react";
import SchoolLifeNav from "../../components/school-life-nav";
import "../school-life.css";

type SessionType = "General Assembly" | "Section Assembly" | "Faith / Religious" | "Civic" | "Wellbeing";
type Session = { id:string; title:string; type:SessionType; audience:string; day:string; time:string; venue:string; lead:string; participation:string; note:string };
const sessions:Session[]=[
  {id:"ASM-01",title:"Monday Whole-School Assembly",type:"General Assembly",audience:"Whole school",day:"Monday",time:"7:45 AM",venue:"Main assembly ground",lead:"School Leadership",participation:"Whole school",note:"Announcements, recognition, safety reminders and weekly priorities."},
  {id:"ASM-02",title:"Primary Values Assembly",type:"Section Assembly",audience:"Primary",day:"Wednesday",time:"8:00 AM",venue:"Primary courtyard",lead:"Headmistress Office",participation:"Primary pupils + staff",note:"Age-appropriate school values, reading, songs and pupil presentations."},
  {id:"ASM-03",title:"Friday Faith Programme",type:"Faith / Religious",audience:"Configured participants",day:"Friday",time:"12:30 PM",venue:"Configured venue",lead:"Approved school coordinator",participation:"School-policy controlled",note:"Example faith activity. Schools configure programme type, audience, alternatives and participation rules to fit their own context."},
  {id:"ASM-04",title:"Civic & Leadership Talk",type:"Civic",audience:"Secondary",day:"Thursday",time:"10:30 AM",venue:"Assembly hall",lead:"Principal Office",participation:"Secondary students",note:"Citizenship, leadership and school-community responsibilities."},
  {id:"ASM-05",title:"Early Years Circle Gathering",type:"Wellbeing",audience:"Early Years",day:"Daily",time:"8:10 AM",venue:"Early Years rooms",lead:"Group educators",participation:"Nursery / Reception",note:"Songs, routine, belonging and age-appropriate group participation."},
];

export default function AssemblyPage(){
  const [type,setType]=useState("All types");
  const [query,setQuery]=useState("");
  const visible=useMemo(()=>sessions.filter(s=>(type==="All types"||s.type===type)&&`${s.title} ${s.audience} ${s.lead}`.toLowerCase().includes(query.toLowerCase())),[type,query]);
  return <main className="school-life-page">
    <SchoolLifeNav active="assembly" />
    <section className="school-life-scope"><div><strong>Assembly & Faith Activities</strong><span>Configurable school culture calendar</span></div><p>Plan whole-school and section assemblies, civic programmes, wellbeing gatherings and optional faith/religious activities without assuming every school follows the same model.</p></section>
    <section className="school-life-stat-grid"><article className="school-life-stat"><span>Configured sessions</span><strong>{sessions.length}</strong><small>Representative weekly pattern</small></article><article className="school-life-stat"><span>Whole-school</span><strong>1</strong><small>Monday assembly</small></article><article className="school-life-stat"><span>Section sessions</span><strong>3</strong><small>Primary, Secondary, Early Years</small></article><article className="school-life-stat"><span>Faith programmes</span><strong>1</strong><small>Tenant-configurable</small></article><article className="school-life-stat"><span>Participation policy</span><strong>Config</strong><small>School-defined</small></article></section>
    <section className="school-life-grid"><article className="school-life-card"><div className="school-life-section-head"><div><h2>Weekly gatherings</h2><p>Separate schedule, audience and participation rules for each school culture activity.</p></div></div><div className="school-life-filters"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search session, audience or lead..."/><select value={type} onChange={e=>setType(e.target.value)}><option>All types</option><option>General Assembly</option><option>Section Assembly</option><option>Faith / Religious</option><option>Civic</option><option>Wellbeing</option></select></div><div className="activity-list">{visible.map(s=><div className="activity-row" key={s.id}><div className="activity-icon">◎</div><div><div className="activity-meta"><span>{s.type}</span><span>{s.audience}</span><span>{s.day}</span></div><h3>{s.title}</h3><p>{s.time} · {s.venue} · Lead: {s.lead}</p><p>{s.note}</p><small>Participation: {s.participation}</small></div><span className="activity-status">{s.day}</span></div>)}</div></article><aside className="school-life-sidebar"><article className="school-life-card"><span className="school-life-kicker">CONFIGURATION PRINCIPLE</span><div className="school-life-policy-list"><div><strong>No hard-coded faith model</strong><small>Each school configures programmes that match its identity and obligations.</small></div><div><strong>Audience-aware</strong><small>Whole-school and section gatherings remain distinct.</small></div><div><strong>Alternatives supported</strong><small>Participation rules and alternatives can be configured later where needed.</small></div></div></article></aside></section>
  </main>;
}
