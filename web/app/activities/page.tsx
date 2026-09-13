"use client";

import { useMemo, useState } from "react";
import SchoolLifeNav from "../../components/school-life-nav";
import "../school-life.css";

type ActivityType = "Sport" | "Club" | "House" | "Creative" | "Academic enrichment" | "Trip / excursion";
type Activity = { id:string; name:string; type:ActivityType; section:string; coordinator:string; members:number; schedule:string; venue:string; attendance:number; consent:string; status:string; icon:string; note:string };

const seed:Activity[]=[
  {id:"ACT-001",name:"Football Academy",type:"Sport",section:"Primary + Secondary",coordinator:"Mr. Daniel Musa",members:64,schedule:"Tue & Thu · 3:00 PM",venue:"Main field",attendance:92,consent:"Not required",status:"Active",icon:"⚽",note:"Skill development, teamwork and inter-school fixtures."},
  {id:"ACT-002",name:"Chess Club",type:"Club",section:"Primary + Secondary",coordinator:"Mrs. Grace Audu",members:38,schedule:"Wednesday · 2:30 PM",venue:"Library hall",attendance:88,consent:"Not required",status:"Active",icon:"♟",note:"Weekly practice, internal ladder and friendly school tournaments."},
  {id:"ACT-003",name:"Coding & Robotics Club",type:"Academic enrichment",section:"Primary 5–6 + Secondary",coordinator:"Mr. Samuel Ter",members:42,schedule:"Friday · 2:30 PM",venue:"ICT Lab",attendance:90,consent:"Not required",status:"Active",icon:"⌘",note:"Coding challenges, simple robotics builds and digital creativity."},
  {id:"ACT-004",name:"Music & Drama",type:"Creative",section:"Whole school",coordinator:"Mrs. Ruth Adams",members:57,schedule:"Thursday · 2:30 PM",venue:"Assembly hall",attendance:86,consent:"Not required",status:"Active",icon:"♪",note:"Choir, drama, cultural performance and school-event preparation."},
  {id:"ACT-005",name:"Blue House",type:"House",section:"Whole school",coordinator:"Mrs. Fatima Bello",members:172,schedule:"Inter-house calendar",venue:"School-wide",attendance:95,consent:"Not required",status:"Active",icon:"◆",note:"Sports, quiz, sanitation and community-service house activities."},
  {id:"ACT-006",name:"Science Discovery Trip",type:"Trip / excursion",section:"JSS 2",coordinator:"Science Department",members:86,schedule:"26 Sep · 8:00 AM",venue:"Kaduna science centre",attendance:0,consent:"68 / 86 received",status:"Consent open",icon:"↗",note:"Supervised science excursion with guardian consent and transport manifest."},
];

export default function ActivitiesPage(){
  const [activities,setActivities]=useState(seed);
  const [type,setType]=useState("All types");
  const [section,setSection]=useState("All sections");
  const [query,setQuery]=useState("");
  const [selected,setSelected]=useState("ACT-006");
  const [notice,setNotice]=useState("");
  const current=activities.find(x=>x.id===selected)??activities[0];
  const visible=useMemo(()=>activities.filter(item=>`${item.name} ${item.type} ${item.section} ${item.coordinator}`.toLowerCase().includes(query.toLowerCase())&&(type==="All types"||item.type===type)&&(section==="All sections"||item.section.includes(section))),[activities,query,type,section]);

  function markAttendance(id:string){setActivities(currentRows=>currentRows.map(item=>item.id===id?{...item,attendance:item.attendance||94}:item));setNotice("Activity attendance updated locally in this UI prototype.");}

  return <main className="school-life-page">
    <SchoolLifeNav active="activities" />
    <section className="school-life-scope"><div><strong>Activities, Clubs, Sports & Houses</strong><span>Beyond the classroom</span></div><p>SchoolOS should schedule and document co-curricular life just as clearly as lessons, while keeping participation separate from academic attainment.</p></section>

    <section className="school-life-stat-grid">
      <article className="school-life-stat"><span>Active programmes</span><strong>18</strong><small>Clubs, sports, houses and enrichment</small></article>
      <article className="school-life-stat"><span>Participating students</span><strong>472</strong><small>Across configured activities</small></article>
      <article className="school-life-stat"><span>House system</span><strong>4</strong><small>Blue, Red, Green, Yellow</small></article>
      <article className="school-life-stat"><span>Upcoming events</span><strong>6</strong><small>Next 30 days</small></article>
      <article className="school-life-stat"><span>Consent pending</span><strong>18</strong><small>Science Discovery Trip</small></article>
    </section>

    <section className="school-life-grid">
      <article className="school-life-card">
        <div className="school-life-section-head"><div><h2>Programme directory</h2><p>Sports, clubs, houses, creative programmes, enrichment and excursions.</p></div><button onClick={()=>setNotice("New activity form opened locally.")}>＋ Add activity</button></div>
        <div className="school-life-filters"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search activity, coordinator or section..."/><select value={type} onChange={e=>setType(e.target.value)}><option>All types</option><option>Sport</option><option>Club</option><option>House</option><option>Creative</option><option>Academic enrichment</option><option>Trip / excursion</option></select><select value={section} onChange={e=>setSection(e.target.value)}><option>All sections</option><option>Early Years</option><option>Primary</option><option>Secondary</option><option>Whole school</option></select></div>
        <div className="activity-list">{visible.map(item=><button className="activity-row" key={item.id} onClick={()=>setSelected(item.id)} style={{textAlign:"left",background:selected===item.id?"#fbfcfd":"#fff",cursor:"pointer"}}><span className="activity-icon">{item.icon}</span><div><div className="activity-meta"><span>{item.type}</span><span>{item.section}</span><span>{item.members} members</span></div><h3>{item.name}</h3><p>{item.note}</p><div className="activity-meta"><span>{item.schedule}</span><span>{item.venue}</span><span>{item.coordinator}</span></div>{item.attendance>0&&<div className="activity-progress"><i style={{width:`${item.attendance}%`}}/></div>}</div><em className="activity-status">{item.status}</em></button>)}</div>
        {notice&&<p className="school-life-note" style={{marginTop:12}}>{notice}</p>}
      </article>

      <aside className="school-life-sidebar">
        <article className="school-life-card"><span className="school-life-kicker">SELECTED PROGRAMME</span><h2 style={{margin:"6px 0"}}>{current.name}</h2><p style={{color:"#6d7a8d",fontSize:12,lineHeight:1.6}}>{current.note}</p><div className="school-life-policy-list"><div><strong>Coordinator</strong><small>{current.coordinator}</small></div><div><strong>Schedule & venue</strong><small>{current.schedule} · {current.venue}</small></div><div><strong>Participation</strong><small>{current.members} members · {current.attendance?`${current.attendance}% recent attendance`:"Attendance not taken yet"}</small></div><div><strong>Guardian consent</strong><small>{current.consent}</small></div></div><div style={{display:"flex",gap:8,marginTop:12}}><button className="school-life-primary" onClick={()=>markAttendance(current.id)}>Take attendance</button><button className="school-life-secondary" onClick={()=>setNotice("Member register opened locally.")}>Members</button></div></article>
        <article className="school-life-card"><div className="school-life-section-head"><div><h3>Co-curricular timetable</h3><p>School time is more than academic periods.</p></div></div><div className="school-life-policy-list"><div><strong>Assembly</strong><small>Monday · 7:45 AM · Whole school</small></div><div><strong>Club period</strong><small>Friday · 2:30 PM · Primary + Secondary</small></div><div><strong>Sports period</strong><small>Section-specific PE and games slots</small></div><div><strong>Library / Lab / Creative</strong><small>Can appear as structured non-subject periods.</small></div></div></article>
        <article className="school-life-note"><strong>Participation rule</strong>Activity attendance, house points or club participation may support recognition and engagement, but must not silently become an academic ability score.</article>
      </aside>
    </section>
  </main>;
}
