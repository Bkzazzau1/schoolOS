"use client";

import { useMemo, useState } from "react";
import SchoolLifeNav from "../../components/school-life-nav";
import "../school-life.css";

type Priority = "Normal" | "Important" | "Emergency";
type Audience = "Whole school" | "Early Years" | "Primary" | "Secondary" | "Staff only" | "Parents only" | "JSS 3";
type Notice = { id:string; title:string; body:string; author:string; role:string; priority:Priority; audience:Audience; published:string; expires:string; acknowledgement:boolean; read:number; total:number; pinned:boolean };

const seed:Notice[]=[
  {id:"NB-001",title:"School closes at 12:00 PM on Friday",body:"All academic sections will close at 12:00 PM on Friday for staff professional development. Transport and collection arrangements should follow the revised closing time.",author:"School Proprietor Office",role:"Proprietor",priority:"Important",audience:"Whole school",published:"Today · 8:00 AM",expires:"Friday · 6:00 PM",acknowledgement:true,read:921,total:1084,pinned:true},
  {id:"NB-002",title:"JSS 3 mock examination timetable released",body:"The mock examination timetable is now available. Students and parents should review the schedule and report timetable conflicts through the Secondary office.",author:"Mr. Ibrahim Danladi",role:"Principal · Secondary",priority:"Normal",audience:"JSS 3",published:"Yesterday · 3:30 PM",expires:"30 Sep 2026",acknowledgement:false,read:148,total:176,pinned:false},
  {id:"NB-003",title:"Reception A guardian meeting window",body:"Reception A families with open attendance or settling-in follow-ups may book a short meeting with the Early Years team on Tuesday morning.",author:"Mrs. Mary Daniel",role:"Head Teacher · Early Years",priority:"Normal",audience:"Early Years",published:"Yesterday · 11:15 AM",expires:"Tuesday · 12:00 PM",acknowledgement:false,read:64,total:84,pinned:false},
  {id:"NB-004",title:"Primary water interruption notice",body:"A short water-supply interruption is expected between 10:00 and 11:00 AM. The school has arranged backup water and classes will continue normally.",author:"Mrs. Hauwa Sule",role:"Headmistress · Primary",priority:"Important",audience:"Primary",published:"Today · 7:40 AM",expires:"Today · 1:00 PM",acknowledgement:false,read:302,total:386,pinned:true},
];

export default function NoticeboardPage(){
  const [notices,setNotices]=useState(seed);
  const [audience,setAudience]=useState("All audiences");
  const [priority,setPriority]=useState("All priorities");
  const [query,setQuery]=useState("");
  const [title,setTitle]=useState("");
  const [body,setBody]=useState("");
  const [draftAudience,setDraftAudience]=useState<Audience>("Whole school");
  const [draftPriority,setDraftPriority]=useState<Priority>("Normal");
  const [ack,setAck]=useState(false);
  const [notice,setNotice]=useState("");

  const visible=useMemo(()=>notices.filter(item=>`${item.title} ${item.body} ${item.author} ${item.role}`.toLowerCase().includes(query.toLowerCase())&&(audience==="All audiences"||item.audience===audience)&&(priority==="All priorities"||item.priority===priority)),[notices,query,audience,priority]);

  function publish(){
    if(!title.trim()||!body.trim()){setNotice("Add a notice title and message first.");return;}
    setNotices(current=>[{id:`NB-${String(current.length+1).padStart(3,"0")}`,title:title.trim(),body:body.trim(),author:"Current authorized leader",role:"Prototype publisher",priority:draftPriority,audience:draftAudience,published:"Just now · prototype",expires:"Not set",acknowledgement:ack,read:0,total:draftAudience==="Whole school"?1084:120,pinned:draftPriority==="Emergency"},...current]);
    setTitle("");setBody("");setNotice("Official notice published locally in this UI prototype.");
  }

  function togglePin(id:string){setNotices(current=>current.map(item=>item.id===id?{...item,pinned:!item.pinned}:item));}

  return <main className="school-life-page">
    <SchoolLifeNav active="noticeboard" />
    <section className="school-life-scope"><div><strong>Official Noticeboard</strong><span>Authoritative school communication</span></div><p>Only authorized leadership roles can publish. Notices can be school-wide or scoped to a section, class, staff group or guardians, with urgency, expiry and acknowledgement controls.</p></section>

    <section className="school-life-stat-grid">
      <article className="school-life-stat"><span>Active notices</span><strong>{notices.length}</strong><small>Across current audiences</small></article>
      <article className="school-life-stat"><span>Pinned</span><strong>{notices.filter(x=>x.pinned).length}</strong><small>High-visibility notices</small></article>
      <article className="school-life-stat"><span>Need acknowledgement</span><strong>{notices.filter(x=>x.acknowledgement).length}</strong><small>Critical read confirmation</small></article>
      <article className="school-life-stat"><span>Average read rate</span><strong>82%</strong><small>Prototype audience delivery</small></article>
      <article className="school-life-stat"><span>Scheduled</span><strong>3</strong><small>Future publication queue</small></article>
    </section>

    <section className="school-life-grid">
      <article className="school-life-card">
        <div className="school-life-section-head"><div><h2>Notices & announcements</h2><p>Official school messages with scope, urgency and delivery status.</p></div></div>
        <div className="school-life-composer">
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Official notice title..."/>
          <textarea value={body} onChange={e=>setBody(e.target.value)} placeholder="Write the official announcement..."/>
          <div className="school-life-composer-row">
            <select value={draftAudience} onChange={e=>setDraftAudience(e.target.value as Audience)}><option>Whole school</option><option>Early Years</option><option>Primary</option><option>Secondary</option><option>Staff only</option><option>Parents only</option><option>JSS 3</option></select>
            <select value={draftPriority} onChange={e=>setDraftPriority(e.target.value as Priority)}><option>Normal</option><option>Important</option><option>Emergency</option></select>
          </div>
          <label style={{fontSize:11,color:"#607086"}}><input type="checkbox" checked={ack} onChange={e=>setAck(e.target.checked)}/> Require recipient acknowledgement</label>
          <div className="school-life-composer-actions"><small>Prototype only. Production publish rights will be role- and scope-controlled.</small><button className="school-life-primary" onClick={publish}>Publish notice</button></div>{notice&&<small>{notice}</small>}
        </div>

        <div className="school-life-filters"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search notices..."/><select value={audience} onChange={e=>setAudience(e.target.value)}><option>All audiences</option><option>Whole school</option><option>Early Years</option><option>Primary</option><option>Secondary</option><option>Staff only</option><option>Parents only</option><option>JSS 3</option></select><select value={priority} onChange={e=>setPriority(e.target.value)}><option>All priorities</option><option>Normal</option><option>Important</option><option>Emergency</option></select></div>

        <div className="notice-list">{visible.sort((a,b)=>Number(b.pinned)-Number(a.pinned)).map(item=><article className="notice-row" key={item.id}><div><div className="notice-meta"><span>{item.audience}</span><span>{item.role}</span>{item.pinned&&<span>PINNED</span>}{item.acknowledgement&&<span>ACK REQUIRED</span>}</div><h3>{item.title}</h3><p>{item.body}</p><div className="notice-meta"><span>Published {item.published}</span><span>Expires {item.expires}</span><span>{item.read}/{item.total} read</span></div><div className="notice-actions"><button onClick={()=>togglePin(item.id)}>{item.pinned?"Unpin":"Pin"}</button><button onClick={()=>setNotice(`${item.id} edit opened locally.`)}>Edit</button><button onClick={()=>setNotice(`${item.id} delivery report opened locally.`)}>Delivery report</button></div></div><em className={`notice-priority ${item.priority.toLowerCase()}`}>{item.priority}</em></article>)}</div>
      </article>

      <aside className="school-life-sidebar">
        <article className="school-life-card"><div className="school-life-section-head"><div><h3>Publishing authority</h3><p>Recommended school-wide policy.</p></div></div><div className="school-life-policy-list"><div><strong>Proprietor</strong><small>May publish whole-school and any authorized campus notice.</small></div><div><strong>Principal / Vice Principal</strong><small>Secondary and delegated whole-school operational announcements.</small></div><div><strong>Headmistress / Headmaster</strong><small>Primary notices within Primary scope.</small></div><div><strong>Head Teacher</strong><small>Early Years notices within Early Years scope.</small></div><div><strong>Teachers</strong><small>Class notices only when explicit class-publishing permission is enabled.</small></div></div></article>
        <article className="school-life-card"><div className="school-life-section-head"><div><h3>Delivery channels</h3><p>Planned production behavior.</p></div></div><div className="school-life-policy-list"><div><strong>In-app / portal</strong><small>Default noticeboard delivery with read state.</small></div><div><strong>SMS / WhatsApp / Email</strong><small>Optional external delivery for configured schools and templates.</small></div><div><strong>Acknowledgement</strong><small>Critical notices can require “I acknowledge” rather than relying only on read receipts.</small></div></div></article>
        <article className="school-life-note"><strong>Noticeboard ≠ Community feed</strong>Noticeboard content is authoritative and permission-controlled. Community posts can be conversational and interactive without carrying official-instruction status.</article>
      </aside>
    </section>
  </main>;
}
