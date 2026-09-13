"use client";

import { useMemo, useState } from "react";

type ReminderStatus="Scheduled"|"Sent"|"Skipped"|"Needs review";
type FamilyRow={id:string;student:string;guardian:string;className:string;balance:number;arrangement:string;nextAmount:number;nextDate:string;channels:string;status:ReminderStatus;reason:string};

const seed:FamilyRow[]=[
 {id:"REM-26091",student:"Maryam Abdullahi",guardian:"Alhaji Abdullahi Yusuf",className:"JSS 2A",balance:125000,arrangement:"Active mandate",nextAmount:30000,nextDate:"25 Sep 2026",channels:"Portal · WhatsApp",status:"Scheduled",reason:"Upcoming authorized deduction"},
 {id:"REM-26092",student:"Hafsa Abdullahi",guardian:"Alhaji Abdullahi Yusuf",className:"Primary 3",balance:55000,arrangement:"Manual partial payment",nextAmount:20000,nextDate:"20 Sep 2026",channels:"Portal · SMS",status:"Scheduled",reason:"Agreed next payment"},
 {id:"REM-26093",student:"Ibrahim Sani",guardian:"Alhaji Sani Ibrahim",className:"JSS 2A",balance:100000,arrangement:"Payment plan",nextAmount:25000,nextDate:"18 Sep 2026",channels:"Portal · WhatsApp",status:"Sent",reason:"3 days before agreed payment"},
 {id:"REM-26094",student:"Yusuf Bello",guardian:"Alhaji Musa Bello",className:"JSS 2B",balance:120000,arrangement:"No arrangement",nextAmount:120000,nextDate:"Overdue",channels:"Portal · SMS · Finance call",status:"Needs review",reason:"No active collection arrangement"},
 {id:"REM-26095",student:"Muhammad Kabir",guardian:"Hajiya Amina Kabir",className:"Primary 5",balance:85000,arrangement:"Education financing",nextAmount:0,nextDate:"Partner schedule",channels:"Portal",status:"Skipped",reason:"Financing workflow already active"},
];

const stages=[
 ["7 days before","Gentle upcoming-payment notice"],
 ["3 days before","Reminder with amount, date and payment account"],
 ["Due date","Due-today notice or mandate-scheduled notice"],
 ["3 days overdue","Outstanding-payment follow-up"],
 ["7 days overdue","Finance Office review queue"],
];

function money(v:number){return `₦${v.toLocaleString("en-NG")}`}

export default function FeeRemindersPage(){
 const [rows,setRows]=useState(seed);const [filter,setFilter]=useState("All");const [selected,setSelected]=useState(seed[0].id);const [notice,setNotice]=useState("");
 const visible=useMemo(()=>filter==="All"?rows:rows.filter(r=>r.status===filter),[rows,filter]);
 const current=rows.find(r=>r.id===selected)??rows[0];
 function sendNow(){setRows(v=>v.map(r=>r.id===current.id?{...r,status:"Sent"}:r));setNotice(`Reminder for ${current.student} marked sent locally.`)}
 function skip(){setRows(v=>v.map(r=>r.id===current.id?{...r,status:"Skipped"}:r));setNotice(`Reminder for ${current.student} suppressed locally.`)}
 return <main className="fo-page reminder-page">
  <header className="fo-head"><div><span>FINANCE OFFICE · SCHOOL FEE REMINDERS</span><h1>Fee Reminder Center</h1><p>Send the right reminder based on the family’s actual balance, payment arrangement, mandate status and next expected payment.</p></div><div className="fo-actions"><button>Reminder rules</button><button className="primary">Create campaign</button></div></header>

  <section className="fo-kpis"><article><span>Due in 7 days</span><strong>84</strong><small>Families with upcoming obligations</small></article><article><span>Mandate-backed</span><strong>39</strong><small>Use softer scheduled-debit wording</small></article><article><span>Payment-plan families</span><strong>21</strong><small>Remind only agreed instalment</small></article><article><span>No arrangement</span><strong>17</strong><small>Needs finance follow-up</small></article><article><span>Suppressed today</span><strong>11</strong><small>Financing, recent payment or manual pause</small></article></section>

  <section className="fo-grid two"><article className="fo-card"><header><div><h2>Reminder queue</h2><p>Collection-aware messages, not blanket debt notifications.</p></div><select value={filter} onChange={e=>setFilter(e.target.value)}><option>All</option><option>Scheduled</option><option>Sent</option><option>Skipped</option><option>Needs review</option></select></header><div className="reminder-list">{visible.map(r=><button key={r.id} className={selected===r.id?"active":""} onClick={()=>{setSelected(r.id);setNotice("")}}><div><strong>{r.student}</strong><span>{r.className} · {r.guardian}</span><small>{r.arrangement}</small></div><div><b>{money(r.balance)}</b><span>Outstanding</span></div><em className={r.status==="Needs review"?"danger":r.status==="Skipped"?"muted":""}>{r.status}</em></button>)}</div></article>

   <article className="fo-card reminder-detail"><header><div><h2>{current.student}</h2><p>{current.guardian} · {current.className}</p></div><em>{current.status}</em></header><div className="reminder-balance"><span>Outstanding school-fee balance</span><strong>{money(current.balance)}</strong><small>{current.arrangement}</small></div><div className="reminder-facts"><div><span>Next expected payment</span><strong>{current.nextAmount?money(current.nextAmount):"Handled by active workflow"}</strong></div><div><span>Expected date</span><strong>{current.nextDate}</strong></div><div><span>Channels</span><strong>{current.channels}</strong></div><div><span>Why this reminder?</span><strong>{current.reason}</strong></div></div><div className="reminder-preview"><span>MESSAGE PREVIEW</span><p>{current.arrangement==="Active mandate"?`A payment of ${money(current.nextAmount)} for ${current.student} is scheduled for ${current.nextDate}. Current school-fee balance is ${money(current.balance)}. No action is needed if your authorized deduction proceeds successfully.`:current.arrangement==="No arrangement"?`${current.student} has an outstanding school-fee balance of ${money(current.balance)}. Please use the student term account or contact the Finance Office to arrange a payment plan.`:`A school-fee payment of ${current.nextAmount?money(current.nextAmount):"your agreed amount"} for ${current.student} is expected on ${current.nextDate}. Current outstanding balance is ${money(current.balance)}.`}</p></div><div className="store-actions"><button onClick={sendNow}>Send now</button><button onClick={skip}>Suppress reminder</button><button>Open family account</button></div>{notice&&<div className="fo-callout" style={{marginTop:10}}>{notice}</div>}</article>
  </section>

  <section className="fo-grid two"><article className="fo-card"><header><div><h2>Reminder escalation</h2><p>Suggested timing around an agreed due date.</p></div></header><div className="reminder-stages">{stages.map((s,i)=><div key={s[0]}><i>{i+1}</i><div><strong>{s[0]}</strong><span>{s[1]}</span></div></div>)}</div></article><article className="fo-card"><header><div><h2>Smart suppression rules</h2><p>Prevent noisy or misleading reminders.</p></div></header><div className="fo-list"><div><strong>Recent payment received</strong><span>Pause a scheduled reminder when a new credit already reduced the balance.</span><small>Recalculate before sending</small></div><div><strong>Active mandate pending</strong><span>Tell the guardian that a deduction is scheduled instead of asking them to pay twice.</span><small>Mandate-aware wording</small></div><div><strong>Education financing active</strong><span>Use the financing schedule rather than ordinary school-fee reminders.</span><small>Separate repayment workflow</small></div><div><strong>Manual finance pause</strong><span>Authorized Finance staff can temporarily suppress contact while an arrangement is being reviewed.</span><small>Reason should remain visible in audit history</small></div></div></article></section>

  <section className="fo-card"><header><div><h2>Communication history</h2><p>Finance can see what was sent, when, through which channel and why.</p></div></header><div className="reminder-history"><div><strong>13 Sep · 10:30</strong><span>Ibrahim Sani · WhatsApp + Portal</span><b>₦25,000 due 18 Sep</b><em>Delivered</em></div><div><strong>12 Sep · 09:15</strong><span>Maryam Abdullahi · Portal</span><b>Mandate scheduled 25 Sep</b><em>Viewed</em></div><div><strong>11 Sep · 14:05</strong><span>Yusuf Bello · SMS</span><b>Finance arrangement requested</b><em>Delivered</em></div></div></section>

  <section className="fo-callout" style={{marginTop:14}}>Reminder status must never affect a pupil’s grades, classroom support, teacher treatment or academic profile. The reminder engine is a finance communication tool only.</section>
 </main>
}
