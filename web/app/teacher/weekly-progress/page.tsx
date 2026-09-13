"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type SubjectUpdate={subject:string;planned:string;covered:string;next:string;evidence:string;support:string};

const seed:SubjectUpdate[]=[
 {subject:"Mathematics",planned:"Linear equations and guided practice",covered:"Linear equations completed with worked examples and short class assessment",next:"Simultaneous equations",evidence:"Classwork 82% · Assignment 79%",support:"Fractions remain the main practice area for a small group"},
 {subject:"English",planned:"Narrative writing and comprehension",covered:"Narrative writing and comprehension completed",next:"Formal letter writing",evidence:"Writing task completed · comprehension check 84%",support:"Sentence structure practice continues"},
 {subject:"Basic Science",planned:"Human digestive system",covered:"Digestive system introduced and labelled diagram completed",next:"Nutrition and balanced diet",evidence:"Class diagram + 10-question check",support:"Key vocabulary needs reinforcement for some learners"},
];

export default function WeeklyProgressPublisher(){
 const [week,setWeek]=useState("Week 6"); const [className,setClassName]=useState("JSS 2A"); const [updates,setUpdates]=useState(seed); const [note,setNote]=useState("The class completed the major planned topics this week. Mathematics practice will continue before the next topic begins."); const [status,setStatus]=useState("Draft"); const [selected,setSelected]=useState(0);
 const current=updates[selected]; const completion=useMemo(()=>Math.round(updates.filter(x=>x.covered.trim()).length/updates.length*100),[updates]);
 function edit(field:keyof SubjectUpdate,value:string){setUpdates(list=>list.map((u,i)=>i===selected?{...u,[field]:value}:u));setStatus("Draft changed")}
 return <main className="teacher-module-shell weekly-progress-page">
  <header className="teacher-module-topbar"><div><span className="page-kicker">TEACHER PORTAL · WEEKLY LEARNING UPDATE</span><h1>Weekly Learning Progress</h1><p>Turn approved lesson plans into one parent-ready weekly update without rewriting the same work.</p></div><div className="module-top-actions"><Link href="/teacher/lesson-plans">Lesson Plans</Link><Link href="/teacher/assignments">Assignments</Link><Link href="/teacher/messages">Messages</Link></div></header>

  <section className="module-stats"><article><span>Class</span><strong>{className}</strong><small>current selection</small></article><article><span>Week</span><strong>{week}</strong><small>2026/2027 Term 1</small></article><article><span>Subjects ready</span><strong>{updates.length}</strong><small>{completion}% with coverage notes</small></article><article><span>Publication</span><strong>{status}</strong><small>parent-safe summary</small></article></section>

  <section className="weekly-flow-card"><strong>Teacher does the work once</strong><div><b>Approved lesson plan</b><span>What was intended</span></div><div><b>Actual classroom delivery</b><span>What was covered</span></div><div><b>Evidence</b><span>Classwork / assignment</span></div><div><b>Parent update</b><span>What happened + what is next</span></div></section>

  <section className="weekly-progress-grid">
   <article className="module-panel weekly-subject-list"><header><div><h2>Subjects this week</h2><p>Select a subject and confirm what was actually taught.</p></div><div className="weekly-inline-selects"><select value={className} onChange={e=>setClassName(e.target.value)}><option>JSS 2A</option><option>JSS 2B</option><option>JSS 3A</option></select><select value={week} onChange={e=>setWeek(e.target.value)}><option>Week 6</option><option>Week 7</option><option>Week 8</option></select></div></header>{updates.map((u,i)=><button key={u.subject} onClick={()=>setSelected(i)} className={selected===i?"active":""}><div><strong>{u.subject}</strong><span>{u.covered}</span><small>Next: {u.next}</small></div><em>{i===0?"From LP-206":"Linked plan"}</em></button>)}</article>
   <article className="module-panel weekly-editor"><header><div><h2>{current.subject}</h2><p>{className} · {week}</p></div><span className="status-badge">{status}</span></header><label>Planned from lesson plan<textarea value={current.planned} onChange={e=>edit("planned",e.target.value)}/></label><label>Actually covered<textarea value={current.covered} onChange={e=>edit("covered",e.target.value)}/></label><label>Classwork / assignment evidence<textarea value={current.evidence} onChange={e=>edit("evidence",e.target.value)}/></label><label>Topic or support area to continue<textarea value={current.support} onChange={e=>edit("support",e.target.value)}/></label><label>What comes next<textarea value={current.next} onChange={e=>edit("next",e.target.value)}/></label><div className="editor-actions"><button className="secondary-action" onClick={()=>setStatus("Draft saved")}>Save draft</button><button className="primary-action" onClick={()=>setStatus("Published to parents")}>Publish weekly update</button></div></article>
  </section>

  <section className="weekly-parent-preview module-panel"><header><div><h2>Parent preview</h2><p>This is the family-safe version generated from the teacher&apos;s classroom record.</p></div><span>{status}</span></header><div className="weekly-preview-head"><div><span>WEEKLY LEARNING UPDATE</span><h3>{className} · {week}</h3><p>Teacher: Mrs. Amina Yusuf</p></div><small>BrightGate Academy</small></div><div className="weekly-preview-subjects">{updates.map(u=><div key={u.subject}><strong>{u.subject}</strong><p><b>This week:</b> {u.covered}</p><p><b>Evidence:</b> {u.evidence}</p><p><b>Next:</b> {u.next}</p><small>{u.support}</small></div>)}</div><label>Whole-class note<textarea value={note} onChange={e=>setNote(e.target.value)}/></label><div className="weekly-parent-note">{note}</div></section>

  <section className="module-panel"><div className="weekly-rule"><strong>Publication rule</strong><p>Parents receive classroom learning information relevant to their linked child. Internal teacher notes, other children&apos;s records, private safeguarding information and staff-only comments are never included in the parent version.</p></div></section>
 </main>
}
