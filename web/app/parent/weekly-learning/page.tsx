"use client";

import { useState } from "react";

const weeks=[
 {week:"Week 6",date:"13 Sep 2026",child:"Maryam Abdullahi",className:"JSS 2A",teacher:"Mrs. Amina Yusuf",note:"The class completed the major planned topics this week. Mathematics practice will continue before the next topic begins.",subjects:[
  ["Mathematics","Linear equations completed with worked examples and short class assessment","Classwork 82% · Assignment 79%","Simultaneous equations","Fractions remain the main practice area for a small group"],
  ["English","Narrative writing and comprehension completed","Writing task completed · comprehension check 84%","Formal letter writing","Sentence structure practice continues"],
  ["Basic Science","Digestive system introduced and labelled diagram completed","Class diagram + 10-question check","Nutrition and balanced diet","Key vocabulary will be reinforced"]
 ]},
 {week:"Week 5",date:"6 Sep 2026",child:"Maryam Abdullahi",className:"JSS 2A",teacher:"Mrs. Amina Yusuf",note:"Good participation across the week. Continue routine home reading and Mathematics practice.",subjects:[
  ["Mathematics","Simplifying algebraic expressions completed","Classwork 86%","Linear equations","Continue practice with negative signs"],
  ["English","Reading comprehension and summary writing","Summary task completed","Narrative writing","Use complete sentences in written answers"],
  ["Basic Science","Classes of food and digestion overview","Short quiz 85%","Human digestive system","Revise key food groups"]
 ]},
 {week:"Week 6",date:"13 Sep 2026",child:"Hafsa Abdullahi",className:"Primary 3",teacher:"Mrs. Khadija Musa",note:"Hafsa's class completed the planned literacy and numeracy work. Guided reading will continue next week.",subjects:[
  ["Literacy","Reading comprehension and sentence building","Reading activity completed","Paragraph writing","Continue guided reading practice"],
  ["Numeracy","Multiplication using groups and arrays","Classwork 74%","Division as sharing","Times-table practice will help"],
  ["Basic Science","Living and non-living things review","Workbook activity completed","Simple habitats","Review examples from home and school"]
 ]}
];

export default function ParentWeeklyLearning(){
 const [child,setChild]=useState("Maryam Abdullahi"); const filtered=weeks.filter(w=>w.child===child); const [index,setIndex]=useState(0); const current=filtered[Math.min(index,filtered.length-1)];
 return <main className="family-page weekly-family-page">
  <header className="family-head"><div><span className="family-kicker">FAMILY PORTAL · WEEKLY LEARNING</span><h1>Weekly Learning Update</h1><p>See what your child learned this week, classroom evidence, what comes next and where a little extra practice may help.</p></div><div className="family-actions"><select value={child} onChange={e=>{setChild(e.target.value);setIndex(0)}}><option>Maryam Abdullahi</option><option>Hafsa Abdullahi</option></select></div></header>

  <section className="weekly-family-hero"><div><span>{current.week} · {current.date}</span><h2>{current.child}</h2><p>{current.className} · Class teacher: {current.teacher}</p></div><div><strong>Published</strong><small>Parent-safe weekly summary</small></div></section>

  <section className="weekly-family-grid"><aside className="weekly-history family-card"><header><div><h2>Weekly history</h2><p>Look back at previous published updates.</p></div></header>{filtered.map((w,i)=><button key={`${w.week}-${w.date}`} className={i===index?"active":""} onClick={()=>setIndex(i)}><strong>{w.week}</strong><span>{w.date}</span><small>{w.subjects.length} subject updates</small></button>)}</aside>
   <article className="family-card"><header><div><h2>What happened this week</h2><p>Based on the teacher's lesson plan and actual classroom delivery.</p></div></header><div className="weekly-family-subjects">{current.subjects.map(s=><div key={s[0]}><div className="weekly-family-subject-head"><strong>{s[0]}</strong><span>Completed</span></div><p><b>This week</b>{s[1]}</p><p><b>Learning evidence</b>{s[2]}</p><p><b>Next</b>{s[3]}</p><small>{s[4]}</small></div>)}</div></article>
  </section>

  <section className="family-grid two"><article className="family-card"><header><div><h2>Teacher's weekly note</h2><p>Short summary for the family.</p></div></header><div className="weekly-family-note">{current.note}</div></article><article className="family-card"><header><div><h2>How to use this update</h2><p>Support learning without turning the weekly update into another report card.</p></div></header><div className="family-list"><div><strong>Ask about the topic</strong><span>Let your child explain what was learned in their own words.</span></div><div><strong>Use suggested practice</strong><span>Focus on the specific topic named by the teacher.</span></div><div><strong>Check next week</strong><span>You can see what the class plans to learn next.</span></div></div></article></section>

  <section className="family-card"><div className="family-callout">Weekly updates describe classroom learning and current evidence. They are not permanent ability labels, class rankings, diagnoses or predictions about your child's future performance.</div></section>
 </main>
}
