"use client";

import { useMemo, useState } from "react";
import SchoolLifeNav from "../../components/school-life-nav";
import "../school-life.css";

type House = { name:string; captain:string; coordinator:string; members:number; points:number; sports:number; academics:number; service:number; status:string };
const seed:House[]=[
  {name:"Blue House",captain:"Amina Bello",coordinator:"Mrs. Fatima Bello",members:172,points:428,sports:170,academics:138,service:120,status:"Leading"},
  {name:"Red House",captain:"David Terna",coordinator:"Mr. Daniel John",members:168,points:401,sports:150,academics:141,service:110,status:"Strong"},
  {name:"Green House",captain:"Hauwa Musa",coordinator:"Mrs. Grace Audu",members:174,points:389,sports:142,academics:132,service:115,status:"Strong"},
  {name:"Gold House",captain:"Samuel Okafor",coordinator:"Mr. Peter James",members:169,points:371,sports:135,academics:129,service:107,status:"On track"},
];

export default function HousesPage(){
  const [query,setQuery]=useState("");
  const [selected,setSelected]=useState("Blue House");
  const visible=useMemo(()=>seed.filter(h=>`${h.name} ${h.captain} ${h.coordinator}`.toLowerCase().includes(query.toLowerCase())),[query]);
  const current=seed.find(h=>h.name===selected)??seed[0];
  return <main className="school-life-page">
    <SchoolLifeNav active="houses" />
    <section className="school-life-scope"><div><strong>Houses & Teams</strong><span>Belonging, competition and service</span></div><p>Configure school houses, teams, captains, coordinators, points and activities without mixing house points into academic grading.</p></section>
    <section className="school-life-stat-grid"><article className="school-life-stat"><span>Active houses</span><strong>4</strong><small>Whole-school structure</small></article><article className="school-life-stat"><span>Members</span><strong>683</strong><small>Mock total across houses</small></article><article className="school-life-stat"><span>Events this term</span><strong>12</strong><small>Sports, quiz, service</small></article><article className="school-life-stat"><span>Leading house</span><strong style={{fontSize:16}}>Blue</strong><small>428 points</small></article><article className="school-life-stat"><span>Ranking scope</span><strong>House only</strong><small>No academic rank conversion</small></article></section>
    <section className="school-life-grid">
      <article className="school-life-card"><div className="school-life-section-head"><div><h2>House standings</h2><p>Points can come from sports, quizzes, conduct-approved service and school competitions.</p></div></div><div className="school-life-filters"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search house, captain or coordinator..."/></div><div className="award-list">{visible.map(h=><button key={h.name} onClick={()=>setSelected(h.name)} className="award-row" style={{width:"100%",textAlign:"left",background:selected===h.name?"#f6faf8":"#fff",cursor:"pointer"}}><div className="award-medal">◆</div><div><div className="award-meta"><span>{h.status}</span><span>{h.members} members</span></div><h3>{h.name}</h3><p>Captain {h.captain} · Coordinator {h.coordinator}</p></div><strong style={{fontSize:22}}>{h.points}</strong><div className="award-citation">Sports {h.sports} · Academic competitions {h.academics} · Community/service {h.service}</div></button>)}</div></article>
      <aside className="school-life-sidebar"><article className="school-life-card"><span className="school-life-kicker">SELECTED HOUSE</span><h3 style={{margin:"5px 0 8px"}}>{current.name}</h3><div className="school-life-policy-list"><div><strong>{current.points} points</strong><small>Current-term prototype total.</small></div><div><strong>{current.captain}</strong><small>Student captain</small></div><div><strong>{current.coordinator}</strong><small>Staff coordinator</small></div></div></article><article className="school-life-card"><span className="school-life-kicker">HOUSE RULE</span><p style={{margin:"6px 0 0",color:"#69768a",fontSize:12,lineHeight:1.65}}>House points are for school-life participation and competitions. They must not secretly change exam results, promotion decisions or child academic profiles.</p></article></aside>
    </section>
  </main>;
}
