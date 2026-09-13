"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const sets=[
 {id:"CBT-MTH-026",title:"JSS 2 Mathematics · Linear Equations",className:"JSS 2A",questions:20,duration:20,status:"Published",attempts:38,avg:78},
 {id:"CBT-MTH-027",title:"JSS 2 Mathematics · Fractions Review",className:"JSS 2A",questions:15,duration:15,status:"Draft",attempts:0,avg:0},
 {id:"CBT-MTH-021",title:"JSS 2B Mathematics · Week 5 Practice",className:"JSS 2B",questions:20,duration:20,status:"Closed",attempts:36,avg:64},
];

const results=[
 {student:"Maryam Abdullahi",className:"JSS 2A",score:"16/20",accuracy:"80%",time:"14m 12s",focus:"Fractions · Geometry"},
 {student:"Ibrahim Sani",className:"JSS 2A",score:"12/20",accuracy:"60%",time:"19m 08s",focus:"Linear equations"},
 {student:"Yusuf Bello",className:"JSS 2B",score:"9/20",accuracy:"45%",time:"20m 00s",focus:"Fractions · Word problems"},
];

export default function TeacherCbtPage(){
 const [selected,setSelected]=useState(sets[0].id);const [status,setStatus]=useState("Published");const [title,setTitle]=useState("JSS 2 Mathematics · Linear Equations");const [questions,setQuestions]=useState("20");const [duration,setDuration]=useState("20");
 const current=useMemo(()=>sets.find(x=>x.id===selected)??sets[0],[selected]);
 return <main className="teacher-module-shell cbt-admin-page">
  <header className="teacher-module-topbar"><div><span className="page-kicker">TEACHER PORTAL · CBT PRACTICE CENTER</span><h1>CBT Practice Center</h1><p>Create computer-based practice, assign it to classes, review attempts and feed topic-level evidence into Learning Intelligence.</p></div><div className="module-top-actions"><Link href="/teacher">Dashboard</Link><Link href="/teacher/assessments">Assessments</Link><Link href="/cbt">Open student kiosk</Link></div></header>

  <section className="module-stats"><article><span>Question sets</span><strong>12</strong><small>8 published · 4 draft</small></article><article><span>Practice attempts</span><strong>286</strong><small>this term</small></article><article><span>Average accuracy</span><strong>74%</strong><small>across assigned practice</small></article><article><span>Topics needing review</span><strong>3</strong><small>Fractions · Geometry · Word problems</small></article></section>

  <section className="cbt-admin-grid">
   <article className="module-panel"><header><div><h2>My CBT practice sets</h2><p>Practice is for learning and exam familiarity, not permanent ranking.</p></div><button className="primary-action">+ New set</button></header><div className="cbt-set-list">{sets.map(s=><button key={s.id} onClick={()=>{setSelected(s.id);setTitle(s.title);setQuestions(String(s.questions));setDuration(String(s.duration));setStatus(s.status)}} className={selected===s.id?"active":""}><div><strong>{s.title}</strong><span>{s.id} · {s.className}</span><small>{s.questions} questions · {s.duration} minutes · {s.attempts} attempts</small></div><div><em>{s.status}</em>{s.attempts>0&&<small>Avg {s.avg}%</small>}</div></button>)}</div></article>
   <article className="module-panel"><header><div><h2>Practice configuration</h2><p>{current.id}</p></div><span className="status-badge">{status}</span></header><div className="cbt-config"><label>Title<input value={title} onChange={e=>setTitle(e.target.value)}/></label><label>Class<select defaultValue={current.className}><option>JSS 2A</option><option>JSS 2B</option><option>JSS 3A</option></select></label><label>Questions<input value={questions} onChange={e=>setQuestions(e.target.value)}/></label><label>Duration (minutes)<input value={duration} onChange={e=>setDuration(e.target.value)}/></label><label>Result mode<select><option>Show score + topic feedback</option><option>Show score only</option><option>Teacher review before release</option></select></label><label>Instructions<textarea defaultValue="Answer all questions. You may move between questions before submitting. Use this practice to become comfortable with CBT navigation and timing."/></label><div className="editor-actions"><button className="secondary-action" onClick={()=>setStatus("Draft saved")}>Save draft</button><button className="primary-action" onClick={()=>setStatus("Published")}>Publish practice</button></div></div></article>
  </section>

  <section className="cbt-admin-grid"><article className="module-panel"><header><div><h2>Question preview</h2><p>Sample question from the selected practice set.</p></div></header><div className="cbt-question-card"><header><strong>Question 7 of 20</strong><span>Linear Equations</span></header><p>If 3x + 4 = 19, what is the value of x?</p><div className="cbt-options"><span>A. 3</span><span>B. 4</span><span>C. 5</span><span>D. 6</span></div></div><div className="cbt-insight" style={{marginTop:10}}><strong>Question design principle</strong><span>Each item should carry a topic tag so results can show where learners need more practice instead of reporting only one total score.</span></div></article>
   <article className="module-panel"><header><div><h2>Recent learner results</h2><p>Evidence from practice attempts.</p></div></header><div className="cbt-result-list">{results.map(r=><div key={r.student}><div><strong>{r.student}</strong><span>{r.className} · {r.score} · {r.accuracy}</span><small>Time {r.time} · Practice focus: {r.focus}</small></div><em>Review</em></div>)}</div></article></section>

  <section className="module-panel"><header><div><h2>Learning Intelligence handoff</h2><p>CBT should contribute evidence, not replace teacher judgment.</p></div></header><div className="cbt-insight"><strong>Example insight</strong><span>Maryam Abdullahi scored 80% overall, but missed 3 of 4 fractions questions. Add fractions as a temporary practice focus in Student 360 while keeping her overall Mathematics trend separate.</span></div></section>
 </main>
}
