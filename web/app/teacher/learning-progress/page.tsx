"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Topic={name:string;classwork:number;assignment:number;assessment:number;cbt:number;trend:number};
type Student={id:string;name:string;className:string;subject:string;average:number;attendance:number;topics:Topic[]};

const students:Student[]=[
 {id:"STU-001",name:"Maryam Abdullahi",className:"JSS 2A",subject:"Mathematics",average:86,attendance:96,topics:[
  {name:"Fractions",classwork:58,assignment:61,assessment:60,cbt:62,trend:3},
  {name:"Decimals",classwork:82,assignment:85,assessment:84,cbt:86,trend:5},
  {name:"Algebra",classwork:88,assignment:91,assessment:89,cbt:92,trend:6},
  {name:"Geometry",classwork:66,assignment:70,assessment:68,cbt:71,trend:2},
 ]},
 {id:"STU-002",name:"Ibrahim Sani",className:"JSS 2A",subject:"Mathematics",average:61,attendance:88,topics:[
  {name:"Fractions",classwork:49,assignment:52,assessment:47,cbt:50,trend:-4},
  {name:"Decimals",classwork:68,assignment:65,assessment:64,cbt:66,trend:-1},
  {name:"Algebra",classwork:63,assignment:61,assessment:58,cbt:60,trend:-5},
  {name:"Geometry",classwork:71,assignment:69,assessment:67,cbt:70,trend:1},
 ]},
 {id:"STU-003",name:"Yusuf Bello",className:"JSS 2B",subject:"Mathematics",average:48,attendance:79,topics:[
  {name:"Fractions",classwork:42,assignment:40,assessment:38,cbt:41,trend:-7},
  {name:"Decimals",classwork:51,assignment:49,assessment:46,cbt:48,trend:-5},
  {name:"Algebra",classwork:45,assignment:43,assessment:40,cbt:42,trend:-8},
  {name:"Geometry",classwork:57,assignment:54,assessment:52,cbt:55,trend:-3},
 ]},
 {id:"STU-004",name:"Fatima Musa",className:"JSS 3A",subject:"Mathematics",average:91,attendance:98,topics:[
  {name:"Fractions",classwork:89,assignment:92,assessment:91,cbt:93,trend:5},
  {name:"Decimals",classwork:94,assignment:95,assessment:93,cbt:94,trend:4},
  {name:"Algebra",classwork:92,assignment:94,assessment:93,cbt:96,trend:6},
  {name:"Geometry",classwork:87,assignment:89,assessment:88,cbt:90,trend:3},
 ]},
];

function avg(t:Topic){return Math.round((t.classwork+t.assignment+t.assessment+t.cbt)/4)}

export default function LearningProgressPage(){
 const [classFilter,setClassFilter]=useState("All classes");
 const [selectedId,setSelectedId]=useState("STU-001");
 const [evidence,setEvidence]=useState("All evidence");
 const visible=useMemo(()=>students.filter(s=>classFilter==="All classes"||s.className===classFilter),[classFilter]);
 const selected=students.find(s=>s.id===selectedId)??visible[0]??students[0];
 const weakest=[...selected.topics].sort((a,b)=>avg(a)-avg(b))[0];
 const strongest=[...selected.topics].sort((a,b)=>avg(b)-avg(a))[0];
 return <main className="teacher-module-shell learning-progress-page">
  <header className="teacher-module-topbar"><div><span className="page-kicker">TEACHER PORTAL · LEARNING PROGRESS</span><h1>Learning Progress & Performance</h1><p>Combine classwork, assignments, assessments and CBT evidence to identify the exact subjects and topics that need more teaching support.</p></div><div className="module-top-actions"><Link href="/teacher/assignments">Assignments</Link><Link href="/teacher/assessments">Assessments</Link><Link href="/teacher/cbt">CBT Practice</Link><Link href="/teacher/students">Students</Link></div></header>

  <section className="module-stats"><article><span>Students tracked</span><strong>150</strong><small>Across assigned classes</small></article><article><span>Evidence sources</span><strong>4</strong><small>Classwork · Assignment · Assessment · CBT</small></article><article><span>Topics needing review</span><strong>7</strong><small>Across current classes</small></article><article><span>Improving topics</span><strong>12</strong><small>Positive multi-evidence trend</small></article></section>

  <section className="learning-evidence-flow"><strong>One learning evidence model</strong><div><b>Classwork</b><span>Daily understanding</span></div><div><b>Assignments</b><span>Independent practice</span></div><div><b>Assessments</b><span>Formal checks</span></div><div><b>CBT</b><span>Question-level practice</span></div><div><b>Learning Intelligence</b><span>Topic trend + next action</span></div></section>

  <section className="learning-progress-grid">
   <article className="module-panel learning-directory"><header><div><h2>Students</h2><p>Select a learner to inspect evidence by topic.</p></div><select value={classFilter} onChange={e=>setClassFilter(e.target.value)}><option>All classes</option><option>JSS 2A</option><option>JSS 2B</option><option>JSS 3A</option></select></header><div className="learning-student-list">{visible.map(s=><button key={s.id} className={selected.id===s.id?"active":""} onClick={()=>setSelectedId(s.id)}><div><strong>{s.name}</strong><span>{s.className} · {s.subject}</span><small>{s.id}</small></div><div><b>{s.average}%</b><span>Avg</span></div><div><b>{s.attendance}%</b><span>Attendance</span></div></button>)}</div></article>
   <article className="module-panel learning-summary"><header><div><h2>{selected.name}</h2><p>{selected.className} · {selected.subject}</p></div><select value={evidence} onChange={e=>setEvidence(e.target.value)}><option>All evidence</option><option>Classwork</option><option>Assignments</option><option>Assessments</option><option>CBT</option></select></header><div className="learning-highlight-grid"><div><span>Current average</span><strong>{selected.average}%</strong></div><div><span>Attendance context</span><strong>{selected.attendance}%</strong></div><div className="watch"><span>Main practice area</span><strong>{weakest.name}</strong><small>{avg(weakest)}% combined evidence</small></div><div><span>Strongest topic</span><strong>{strongest.name}</strong><small>{avg(strongest)}% combined evidence</small></div></div><div className="learning-ai-note"><strong>Suggested next teaching action</strong><p>{weakest.trend<0?`${weakest.name} is declining across more than one evidence source. Re-teach the core concept with guided examples, then collect another short classwork sample before deciding whether the support should continue.`:`${weakest.name} remains the lowest-evidence topic, but the recent trend is improving. Continue focused practice and review again after the next assignment or CBT set.`}</p></div></article>
  </section>

  <section className="module-panel"><header><div><h2>Topic evidence matrix</h2><p>Compare evidence sources before deciding that a learner has a weak area.</p></div></header><div className="learning-matrix"><div className="learning-matrix-head"><span>Topic</span><span>Classwork</span><span>Assignment</span><span>Assessment</span><span>CBT</span><span>Combined</span><span>Trend</span></div>{selected.topics.map(t=><div className="learning-matrix-row" key={t.name}><strong>{t.name}</strong><span>{t.classwork}%</span><span>{t.assignment}%</span><span>{t.assessment}%</span><span>{t.cbt}%</span><b className={avg(t)<60?"weak":avg(t)<75?"watch":""}>{avg(t)}%</b><em className={t.trend<0?"down":"up"}>{t.trend>0?"+":""}{t.trend}%</em></div>)}</div></section>

  <section className="learning-bottom-grid"><article className="module-panel"><header><div><h2>Evidence interpretation</h2><p>Look for patterns, not one bad score.</p></div></header><div className="learning-principles"><div><strong>Classwork low, exam high</strong><span>The learner may understand after revision; inspect timing and support before concluding.</span></div><div><strong>Assignment high, CBT low</strong><span>Check independent recall and question format rather than assuming the topic is mastered.</span></div><div><strong>All evidence declining</strong><span>This is a stronger signal for re-teaching and human follow-up.</span></div><div><strong>Attendance also weak</strong><span>Review learning opportunity and missed lessons as context, without inferring a family cause.</span></div></div></article><article className="module-panel"><header><div><h2>Teacher action queue</h2><p>Supportive next steps generated from current evidence.</p></div></header><div className="learning-actions"><div><strong>Maryam Abdullahi · Fractions</strong><span>Continue targeted practice; trend is improving.</span><button>Create practice task</button></div><div><strong>Ibrahim Sani · Algebra</strong><span>Declining across assessment and CBT evidence.</span><button>Plan revision</button></div><div><strong>Yusuf Bello · Algebra</strong><span>Low multi-source evidence plus reduced attendance.</span><button>Review support</button></div></div></article></section>

  <section className="module-panel"><div className="learning-governance"><strong>Learning Intelligence rule</strong><p>SchoolOS should describe current evidence and suggest support. It must not assign a permanent intelligence level, publicly rank children, diagnose a condition, or let AI make promotion, punishment or exclusion decisions.</p></div></section>
 </main>
}
