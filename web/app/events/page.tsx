"use client";

import { useMemo, useState } from "react";
import SchoolLifeNav from "../../components/school-life-nav";
import "../school-life.css";

type EventType = "Academic" | "School-wide" | "Sports" | "Parents" | "Club" | "Holiday";
type Event = { id:string; title:string; type:EventType; audience:string; date:string; time:string; venue:string; owner:string; status:"Scheduled"|"Registration open"|"Completed"; note:string };

const seed: Event[] = [
  {id:"EV-001",title:"Parent–Teacher Conference",type:"Parents",audience:"Primary + Secondary families",date:"18 Sep 2026",time:"9:00 AM–2:00 PM",venue:"Classrooms",owner:"Academic Leadership",status:"Scheduled",note:"Appointment windows by class; families can see only their allocated child/class meetings."},
  {id:"EV-002",title:"Inter-House Sports Day",type:"Sports",audience:"Whole school",date:"24 Sep 2026",time:"8:00 AM–4:00 PM",venue:"Main field",owner:"Sports Committee",status:"Registration open",note:"Athletics, relays and field events with house points and parent viewing areas."},
  {id:"EV-003",title:"Early Years Family Morning",type:"School-wide",audience:"Nursery / Early Years",date:"26 Sep 2026",time:"9:00 AM–11:30 AM",venue:"Early Years courtyard",owner:"Mrs. Mary Daniel",status:"Scheduled",note:"Play-based family activities, classroom showcase and routine guidance."},
  {id:"EV-004",title:"JSS 3 Mock Examination",type:"Academic",audience:"JSS 3",date:"5 Oct 2026",time:"8:00 AM",venue:"Secondary blocks",owner:"Principal Office",status:"Scheduled",note:"Multi-day examination window; timetable details remain in the academic module."},
  {id:"EV-005",title:"Coding & Robotics Showcase",type:"Club",audience:"Whole school",date:"10 Oct 2026",time:"11:00 AM–1:00 PM",venue:"ICT Lab",owner:"ICT Department",status:"Scheduled",note:"Student projects, demonstrations and club recruitment."},
];

export default function EventsPage(){
  const [events,setEvents]=useState(seed);
  const [type,setType]=useState("All types");
  const [query,setQuery]=useState("");
  const [notice,setNotice]=useState("");
  const visible=useMemo(()=>events.filter(e=>(type==="All types"||e.type===type)&&`${e.title} ${e.audience} ${e.owner}`.toLowerCase().includes(query.toLowerCase())),[events,type,query]);
  const upcoming=events.filter(e=>e.status!=="Completed").length;

  function addEvent(){
    const id=`EV-${String(events.length+1).padStart(3,"0")}`;
    setEvents(current=>[{id,title:"New school event",type:"School-wide",audience:"Whole school",date:"TBD",time:"TBD",venue:"TBD",owner:"School Leadership",status:"Scheduled",note:"Prototype event created locally. Edit workflow will be role-controlled later."},...current]);
    setNotice(`${id} created locally in the UI prototype.`);
  }

  return <main className="school-life-page">
    <SchoolLifeNav active="events" />
    <section className="school-life-scope"><div><strong>Events & School Calendar</strong><span>Academic + community calendar</span></div><p>One shared calendar for school-wide events, section activities, parent meetings, sports, clubs and holidays. Academic timetable periods remain separate.</p></section>
    <section className="school-life-stat-grid">
      <article className="school-life-stat"><span>Upcoming events</span><strong>{upcoming}</strong><small>Across current mock calendar</small></article>
      <article className="school-life-stat"><span>This month</span><strong>3</strong><small>September 2026</small></article>
      <article className="school-life-stat"><span>Parent-facing</span><strong>3</strong><small>Conference, sports, family morning</small></article>
      <article className="school-life-stat"><span>Registration open</span><strong>1</strong><small>Inter-House Sports Day</small></article>
      <article className="school-life-stat"><span>Calendar conflicts</span><strong>0</strong><small>Prototype indicator</small></article>
    </section>
    <section className="school-life-grid">
      <article className="school-life-card">
        <div className="school-life-section-head"><div><h2>School calendar</h2><p>Filter events by type and audience.</p></div><button onClick={addEvent}>+ Add event</button></div>
        <div className="school-life-filters"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search event, audience or owner..."/><select value={type} onChange={e=>setType(e.target.value)}><option>All types</option><option>Academic</option><option>School-wide</option><option>Sports</option><option>Parents</option><option>Club</option><option>Holiday</option></select></div>
        {notice&&<div className="school-life-note" style={{marginBottom:12}}><strong>Prototype update</strong>{notice}</div>}
        <div className="activity-list">{visible.map(event=><div className="activity-row" key={event.id}><div className="activity-icon">{event.type==="Sports"?"⚑":event.type==="Academic"?"A":event.type==="Parents"?"P":"•"}</div><div><div className="activity-meta"><span>{event.type}</span><span>{event.audience}</span><span>{event.status}</span></div><h3>{event.title}</h3><p>{event.date} · {event.time} · {event.venue}</p><p>{event.note}</p><small>{event.owner}</small></div><span className="activity-status">{event.status}</span></div>)}</div>
      </article>
      <aside className="school-life-sidebar">
        <article className="school-life-card"><span className="school-life-kicker">CALENDAR RULE</span><h3 style={{margin:"5px 0 8px"}}>Audience and authority matter</h3><p style={{margin:0,color:"#69768a",fontSize:12,lineHeight:1.65}}>A section leader may create events for their section; whole-school events require school-wide authority. Parents and students see only events targeted to them.</p></article>
        <article className="school-life-card"><span className="school-life-kicker">INTEGRATIONS LATER</span><div className="school-life-policy-list"><div><strong>Noticeboard</strong><small>Turn an event into an official announcement.</small></div><div><strong>Activities & Clubs</strong><small>Link fixtures, club sessions and showcases.</small></div><div><strong>Excursions</strong><small>Attach consent and transport requirements.</small></div></div></article>
      </aside>
    </section>
  </main>;
}
