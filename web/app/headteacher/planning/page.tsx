"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Readiness = "Ready" | "Nearly ready" | "Needs attention";
type Activity = { id:string; group:string; theme:string; activity:string; type:string; domain:string; educator:string; when:string; readiness:number; status:Readiness; resources:string[]; observation:string };

const activities: Activity[] = [
  {id:"PLAN-101",group:"Nursery 1",theme:"Our Families",activity:"Family picture storytelling",type:"Small Group",domain:"Language & Communication",educator:"Mrs. Aisha Musa",when:"Mon · 9:00 AM",readiness:100,status:"Ready",resources:["Picture cards","Story basket"],observation:"Listen for familiar words, turn-taking and retelling attempts."},
  {id:"PLAN-102",group:"Nursery 1",theme:"Our Families",activity:"Sorting household objects",type:"Learning Centre",domain:"Early Numeracy",educator:"Mr. Samuel John",when:"Tue · 9:20 AM",readiness:92,status:"Ready",resources:["Object sets","Sorting trays"],observation:"Observe sorting choices and comparison language during play."},
  {id:"PLAN-103",group:"Nursery 2",theme:"Colours & Patterns",activity:"Pattern-printing studio",type:"Creative",domain:"Creative Exploration",educator:"Miss Grace Peter",when:"Mon · 10:10 AM",readiness:78,status:"Needs attention",resources:["Paint","Sponges","Pattern blocks"],observation:"Record choices, persistence and explanation of created patterns."},
  {id:"PLAN-104",group:"Nursery 2",theme:"Colours & Patterns",activity:"Snack-time independence",type:"Routine-linked",domain:"Personal & Social",educator:"Mrs. Halima Yusuf",when:"Tue · 10:00 AM",readiness:96,status:"Ready",resources:["Routine cards","Child-safe utensils"],observation:"Observe independence, peer interaction and help-seeking."},
  {id:"PLAN-105",group:"Reception A",theme:"Sounds Around Us",activity:"Initial-sound sound walk",type:"Small Group",domain:"Language & Communication",educator:"Mrs. Fatima Bello",when:"Mon · 9:15 AM",readiness:90,status:"Ready",resources:["Sound cards","Picture prompts"],observation:"Capture examples of children noticing initial sounds in familiar words."},
  {id:"PLAN-106",group:"Reception A",theme:"Sounds Around Us",activity:"Build the repeating pattern",type:"Learning Centre",domain:"Early Numeracy",educator:"Mr. Daniel Musa",when:"Wed · 9:40 AM",readiness:82,status:"Nearly ready",resources:["Blocks","Pattern cards"],observation:"Record whether children copy, extend or explain a repeating pattern."},
  {id:"PLAN-107",group:"Reception A",theme:"Sounds Around Us",activity:"Music and movement choices",type:"Creative",domain:"Creative Exploration",educator:"Mrs. Fatima Bello",when:"Thu · 11:00 AM",readiness:74,status:"Needs attention",resources:["Shakers","Drums","Scarves"],observation:"Observe rhythm, choice-making, collaboration and expressive movement."},
];

const themes = [
  {group:"Nursery 1",theme:"Our Families",focus:"Language, belonging, routines",plan:96,observations:91},
  {group:"Nursery 2",theme:"Colours & Patterns",focus:"Creative play, pattern, independence",plan:88,observations:84},
  {group:"Reception A",theme:"Sounds Around Us",focus:"Communication, sound awareness, pattern",plan:82,observations:78},
];

const coverage = [
  ["Language & Communication",7,6],["Early Numeracy",6,6],["Physical Development",5,5],["Personal & Social",4,5],["Creative Exploration",5,5]
] as const;

const gaps = [
  {id:"RG-01",group:"Nursery 2",item:"Washable printing sponges",impact:"Pattern-printing studio"},
  {id:"RG-02",group:"Reception A",item:"Extra rhythm instruments",impact:"Music and movement choices"},
  {id:"RG-03",group:"Reception A",item:"Laminated sound cards",impact:"Sound-walk backup set"},
];

export default function HeadTeacherPlanningPage(){
  const [group,setGroup]=useState("All groups");
  const [status,setStatus]=useState("All statuses");
  const [query,setQuery]=useState("");
  const [selectedId,setSelectedId]=useState("PLAN-103");
  const [resolved,setResolved]=useState<string[]>([]);
  const [note,setNote]=useState("");

  const filtered=useMemo(()=>activities.filter(a=>
    (group==="All groups"||a.group===group) &&
    (status==="All statuses"||a.status===status) &&
    `${a.group} ${a.theme} ${a.activity} ${a.domain} ${a.educator} ${a.type}`.toLowerCase().includes(query.toLowerCase())
  ),[group,status,query]);
  const selected=activities.find(a=>a.id===selectedId)??activities[0];
  const avg=Math.round(activities.reduce((s,a)=>s+a.readiness,0)/activities.length);

  return <main className="headteacher-main early-planning-page" style={{maxWidth:1380,margin:"0 auto"}}>
    <header className="headteacher-topbar"><div><span className="headteacher-kicker">HEAD TEACHER · NURSERY / EARLY YEARS</span><h1>Planning & Activities</h1><p>Coordinate weekly themes, learning centres, small-group work, outdoor provision, resources and developmental coverage.</p></div><div className="headteacher-actions"><Link href="/headteacher">Dashboard</Link><Link href="/headteacher/development">Development & Learning</Link><Link href="/headteacher/observations">Observations</Link></div></header>

    <section className="headteacher-scope"><div><span>ACTIVE SECTION</span><strong>Nursery / Early Years</strong><small>Kaduna Campus · Head Teacher Mrs. Mary Daniel</small></div><p>Plans create rich, age-appropriate opportunities for play and observation; they are not scripts every child must complete identically.</p></section>

    <section className="early-planning-kpis"><article><span>Planned activities</span><strong>{activities.length}</strong><small>Representative week</small></article><article><span>Ready</span><strong>{activities.filter(a=>a.status==="Ready").length}</strong><small>Clear ownership</small></article><article><span>Needs attention</span><strong>{activities.filter(a=>a.status==="Needs attention").length}</strong><small>Before delivery</small></article><article><span>Average readiness</span><strong>{avg}%</strong><small>Prototype metric</small></article><article><span>Resource gaps</span><strong>{gaps.length-resolved.length}</strong><small>Open local items</small></article><article><span>Domain gaps</span><strong>1</strong><small>Personal & Social</small></article></section>

    <section className="early-theme-grid">{themes.map(t=><article className="headteacher-card early-theme-card" key={t.group}><span>{t.group}</span><h3>{t.theme}</h3><p>{t.focus}</p><div><small>Plan readiness</small><strong>{t.plan}%</strong></div><div><small>Observation coverage</small><strong>{t.observations}%</strong></div></article>)}</section>

    <section className="early-planning-workspace">
      <article className="headteacher-card early-planning-table-card"><header className="headteacher-section-head"><div><h3>Weekly activity plan</h3><p>Filter by group, readiness, educator, domain or activity.</p></div><div className="early-planning-filters"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search plan, educator or domain..."/><select value={group} onChange={e=>setGroup(e.target.value)}><option>All groups</option><option>Nursery 1</option><option>Nursery 2</option><option>Reception A</option></select><select value={status} onChange={e=>setStatus(e.target.value)}><option>All statuses</option><option>Ready</option><option>Nearly ready</option><option>Needs attention</option></select></div></header><div className="early-planning-list">{filtered.map(a=><button key={a.id} className={selected.id===a.id?"selected":""} onClick={()=>{setSelectedId(a.id);setNote("")}}><div><strong>{a.activity}</strong><small>{a.type} · {a.group}</small></div><span>{a.domain}</span><span>{a.educator}</span><span>{a.when}</span><div><b>{a.readiness}%</b><em className={a.status.toLowerCase().replaceAll(" ","-")}>{a.status}</em></div></button>)}</div></article>

      <aside className="headteacher-card early-plan-detail"><span className="headteacher-kicker">SELECTED ACTIVITY</span><h2>{selected.activity}</h2><p>{selected.group} · {selected.theme} · {selected.when}</p><div className="early-plan-detail-grid"><div><span>Type</span><strong>{selected.type}</strong></div><div><span>Domain</span><strong>{selected.domain}</strong></div><div><span>Educator</span><strong>{selected.educator}</strong></div><div><span>Readiness</span><strong>{selected.readiness}%</strong></div></div><div className="early-plan-resources"><span>RESOURCES</span><div>{selected.resources.map(r=><b key={r}>{r}</b>)}</div></div><div className="early-plan-observation"><span>OBSERVATION INTENT</span><p>{selected.observation}</p></div><label className="early-plan-note">Head Teacher planning note<textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Add a local planning or resource note..."/></label><div className="early-plan-links"><Link href="/headteacher/educators">Educator context</Link><Link href="/headteacher/observations">Observation workflow</Link></div><small>Prototype only: notes are not persisted.</small></aside>
    </section>

    <section className="early-planning-lower-grid"><article className="headteacher-card"><header className="headteacher-section-head"><div><h3>Developmental coverage</h3><p>Keep weekly provision broad without forcing identical experiences.</p></div></header><div className="early-domain-coverage-list">{coverage.map(([name,planned,target])=><div key={name}><div><strong>{name}</strong><small>{planned>=target?"Coverage on target":"Add one planned opportunity"}</small></div><span><b>{planned}</b> planned / {target} target</span><i className={planned>=target?"ok":"gap"}>{planned>=target?"Covered":"Add opportunity"}</i></div>)}</div></article><article className="headteacher-card"><header className="headteacher-section-head"><div><h3>Resource & readiness gaps</h3><p>Operational blockers to resolve before delivery.</p></div></header><div className="early-resource-gap-list">{gaps.map(g=>{const done=resolved.includes(g.id);return <div className={done?"resolved":""} key={g.id}><div><span>{g.group}</span><strong>{g.item}</strong><small>{g.impact}</small></div><button onClick={()=>setResolved(c=>c.includes(g.id)?c.filter(x=>x!==g.id):[...c,g.id])}>{done?"Reopen":"Mark resolved"}</button></div>})}</div></article></section>

    <section className="headteacher-card early-planning-ai-card"><span className="headteacher-kicker">HEAD TEACHER AI · PLANNING BRIEF</span><h3>Protect breadth of provision while fixing readiness gaps</h3><p>The prototype plan is broadly balanced. Resolve the Nursery 2 and Reception A material gaps, then add one more Personal & Social opportunity rather than changing areas that already have stable provision.</p><div><span>Priority 1</span><strong>Resolve material gaps</strong></div><div><span>Priority 2</span><strong>Add Personal & Social opportunity</strong></div><div><span>Keep stable</span><strong>Existing broad provision</strong></div><Link href="/headteacher/ai">Ask Head Teacher AI</Link></section>

    <section className="headteacher-card early-planning-boundary"><span className="headteacher-kicker">EARLY YEARS PLANNING RULE</span><h3>Plan opportunities, not identical outcomes</h3><p>Activities should support play, communication, exploration, movement and observation. Participation should not be converted into a test score or a fixed judgement about a child.</p></section>
  </main>;
}
