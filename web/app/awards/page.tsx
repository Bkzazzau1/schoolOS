"use client";

import { useMemo, useState } from "react";
import SchoolLifeNav from "../../components/school-life-nav";
import "../school-life.css";

type RecipientType = "Student" | "Teacher" | "Team" | "House" | "Club" | "Staff";
type Visibility = "School + parents" | "Public showcase" | "Internal only";
type Award = { id:string; title:string; recipient:string; recipientType:RecipientType; section:string; category:string; citation:string; issuer:string; date:string; visibility:Visibility; badge:string };

const seed:Award[]=[
  {id:"AW-001",title:"Teacher of the Term",recipient:"Mrs. Fatima Bello",recipientType:"Teacher",section:"Secondary",category:"Teaching Excellence",citation:"Recognized for consistent lesson preparation, strong learner engagement and support for colleagues during the term.",issuer:"School Leadership",date:"13 Sep 2026",visibility:"School + parents",badge:"★"},
  {id:"AW-002",title:"Kindness & Community Award",recipient:"Child Amina",recipientType:"Student",section:"Early Years",category:"Positive Contribution",citation:"Celebrated for helping classmates during routines and participating warmly in collaborative play.",issuer:"Early Years Team",date:"12 Sep 2026",visibility:"School + parents",badge:"♥"},
  {id:"AW-003",title:"Inter-House Sports Champion",recipient:"Blue House",recipientType:"House",section:"Whole school",category:"Sports",citation:"Highest combined points after athletics, relay and field events, with excellent sportsmanship across age groups.",issuer:"Sports Committee",date:"10 Sep 2026",visibility:"Public showcase",badge:"◆"},
  {id:"AW-004",title:"Most Improved Reader",recipient:"Hauwa Musa",recipientType:"Student",section:"Primary 6",category:"Growth & Progress",citation:"Recognized for sustained improvement in reading fluency and consistent participation in reading-week activities.",issuer:"Primary School",date:"9 Sep 2026",visibility:"School + parents",badge:"↑"},
  {id:"AW-005",title:"Innovation Showcase Award",recipient:"Coding & Robotics Club",recipientType:"Club",section:"Primary + Secondary",category:"Innovation",citation:"Awarded for designing a simple school-environment monitoring prototype during the term showcase.",issuer:"ICT Department",date:"8 Sep 2026",visibility:"Public showcase",badge:"✦"},
];

export default function AwardsPage(){
  const [awards,setAwards]=useState(seed);
  const [query,setQuery]=useState("");
  const [type,setType]=useState("All recipients");
  const [visibility,setVisibility]=useState("All visibility");
  const [notice,setNotice]=useState("");
  const visible=useMemo(()=>awards.filter(item=>`${item.title} ${item.recipient} ${item.section} ${item.category}`.toLowerCase().includes(query.toLowerCase())&&(type==="All recipients"||item.recipientType===type)&&(visibility==="All visibility"||item.visibility===visibility)),[awards,query,type,visibility]);

  function addRecognition(){
    setAwards(current=>[{id:`AW-${String(current.length+1).padStart(3,"0")}`,title:"New Recognition",recipient:"Selected recipient",recipientType:"Student",section:"School",category:"Achievement",citation:"Prototype citation awaiting authorized review.",issuer:"Authorized school leader",date:"Today · prototype",visibility:"Internal only",badge:"★"},...current]);
    setNotice("Recognition draft added locally. Production publishing will require issuer authority and visibility review.");
  }

  return <main className="school-life-page">
    <SchoolLifeNav active="awards" />
    <section className="school-life-scope"><div><strong>Awards & Recognition</strong><span>Celebrate contribution, growth and excellence</span></div><p>Recognition may be visible to the school community, parents or the public showcase. It should celebrate meaningful achievements without creating permanent high-stakes rankings.</p></section>

    <section className="school-life-stat-grid">
      <article className="school-life-stat"><span>Recognitions this term</span><strong>37</strong><small>Students, teachers, teams and clubs</small></article>
      <article className="school-life-stat"><span>Teacher awards</span><strong>6</strong><small>Supportive recognition</small></article>
      <article className="school-life-stat"><span>Student recognitions</span><strong>21</strong><small>Achievement + growth + contribution</small></article>
      <article className="school-life-stat"><span>Team / house awards</span><strong>7</strong><small>Sports, clubs and service</small></article>
      <article className="school-life-stat"><span>Public showcase</span><strong>{awards.filter(x=>x.visibility==="Public showcase").length}</strong><small>Approved public-facing items</small></article>
    </section>

    <section className="school-life-grid">
      <article className="school-life-card">
        <div className="school-life-section-head"><div><h2>Recognition wall</h2><p>School-wide achievements that can appear in dashboards, family portals and approved public showcase areas.</p></div><button onClick={addRecognition}>＋ Add recognition</button></div>
        <div className="school-life-filters"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search award, recipient, section or category..."/><select value={type} onChange={e=>setType(e.target.value)}><option>All recipients</option><option>Student</option><option>Teacher</option><option>Team</option><option>House</option><option>Club</option><option>Staff</option></select><select value={visibility} onChange={e=>setVisibility(e.target.value)}><option>All visibility</option><option>School + parents</option><option>Public showcase</option><option>Internal only</option></select></div>
        <div className="award-list">{visible.map(item=><article className="award-row" key={item.id}><span className="award-medal">{item.badge}</span><div><div className="award-meta"><span>{item.category}</span><span>{item.section}</span><span>{item.recipientType}</span></div><h3>{item.title}</h3><p><strong>{item.recipient}</strong> · {item.date} · Issued by {item.issuer}</p></div><em className="award-visibility">{item.visibility}</em><div className="award-citation">{item.citation}</div></article>)}</div>
        {notice&&<p className="school-life-note" style={{marginTop:12}}>{notice}</p>}
      </article>

      <aside className="school-life-sidebar">
        <article className="school-life-card"><div className="school-life-section-head"><div><h3>Recognition categories</h3><p>Broader than “best student.”</p></div></div><div className="school-life-policy-list"><div><strong>Academic growth</strong><small>Improvement, effort, research or project work—not only highest marks.</small></div><div><strong>Teaching excellence</strong><small>Recognition for preparation, support, innovation and contribution.</small></div><div><strong>Sports & activities</strong><small>Individual, team, club and house achievement.</small></div><div><strong>Character & service</strong><small>Kindness, leadership, attendance, community service and school contribution.</small></div><div><strong>Creative & innovation</strong><small>Music, drama, art, coding, science, design and other creative work.</small></div></div></article>
        <article className="school-life-card"><div className="school-life-section-head"><div><h3>Where awards appear</h3><p>Controlled visibility.</p></div></div><div className="school-life-policy-list"><div><strong>School dashboards</strong><small>Current community recognitions and recent achievements.</small></div><div><strong>Parent portal</strong><small>Recognition involving their child plus approved school-wide highlights.</small></div><div><strong>Community feed</strong><small>Authorized award posts can generate celebration threads.</small></div><div><strong>Public showcase</strong><small>Only approved recognition with appropriate privacy/media consent.</small></div></div></article>
        <article className="school-life-note"><strong>Early Years guardrail</strong>Recognition should celebrate participation, kindness, creativity, confidence and developmental milestones without creating a public “best child” league table or fixed ability label.</article>
      </aside>
    </section>
  </main>;
}
