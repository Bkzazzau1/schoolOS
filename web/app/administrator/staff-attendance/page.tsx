"use client";

import { useState } from "react";

const staff=[
 {id:"STAFF-001",name:"Mrs. Amina Yusuf",role:"Teacher",section:"Secondary",expected:22,present:21,leave:1,late:2,unexplained:0,status:"Ready"},
 {id:"STAFF-009",name:"Mrs. Khadija Musa",role:"Class Teacher",section:"Primary",expected:22,present:20,leave:1,late:1,unexplained:1,status:"Review"},
 {id:"STAFF-014",name:"Mr. Ahmad Sani",role:"Teacher",section:"Secondary",expected:22,present:22,leave:0,late:3,unexplained:0,status:"Ready"},
 {id:"STAFF-021",name:"Mrs. Safiya Ahmad",role:"Teacher",section:"Primary",expected:22,present:19,leave:2,late:0,unexplained:1,status:"Review"},
];

const devices=[
 ["Staff Main Gate Face Terminal","Main entrance","Face recognition","Online · 63 scans today"],
 ["Staff Office NFC Reader","Administration block","NFC / RFID","Online · 18 scans today"],
 ["Primary Staff Gate","Primary entrance","Face + NFC","Syncing · 7 queued"],
];

export default function StaffAttendancePage(){
 const [sent,setSent]=useState(false);
 return <main className="staff-att-page">
  <header className="admin-head"><div><span className="admin-kicker">ADMINISTRATION · STAFF ATTENDANCE</span><h1>Staff Attendance & Payroll Readiness</h1><p>Use hardware attendance as operational evidence, review leave and exceptions, then hand a verified attendance summary to payroll.</p></div><div className="admin-actions"><button>Export attendance</button><button className="primary" onClick={()=>setSent(true)}>{sent?"Summary sent":"Send payroll summary"}</button></div></header>

  <section className="staff-att-kpis"><article><span>Expected staff today</span><strong>64</strong><small>All active staff</small></article><article><span>Present</span><strong>61</strong><small>Hardware + reviewed records</small></article><article><span>Late arrivals</span><strong>6</strong><small>Informational until reviewed</small></article><article><span>Attendance exceptions</span><strong>2</strong><small>Need HR/admin review</small></article><article><span>Payroll-ready</span><strong>62 / 64</strong><small>2 records held for review</small></article></section>

  <section className="staff-att-panel"><header><div><h2>Controlled attendance-to-payroll flow</h2><p>Attendance informs payroll preparation without silently changing anyone’s salary.</p></div></header><div className="staff-att-flow"><div><strong>1. Staff scan</strong><span>Face · NFC · authorized device</span></div><div><strong>2. Attendance ledger</strong><span>Arrival, departure, late, absent</span></div><div><strong>3. Review context</strong><span>Approved leave · correction · exception</span></div><div><strong>4. Payroll readiness</strong><span>Verified days and unresolved items</span></div><div><strong>5. Finance handoff</strong><span>Summary only · human review retained</span></div></div></section>

  <section className="staff-att-grid"><article className="staff-att-panel"><header><div><h2>Staff attendance ledger</h2><p>Current payroll period summary.</p></div></header><div className="staff-att-list">{staff.map(s=><div className="staff-att-row" key={s.id}><div><strong>{s.name}</strong><small>{s.id} · {s.role} · {s.section}</small></div><div><strong>{s.present}/{s.expected}</strong><span>present days</span></div><div><strong>{s.leave}</strong><span>approved leave</span></div><div><strong>{s.late}</strong><span>late arrivals</span></div><div><span className={`staff-att-chip ${s.status==="Review"?"review":""}`}>{s.status}</span><small>{s.unexplained} unexplained absence</small></div></div>)}</div></article>
   <article className="staff-att-panel"><header><div><h2>Hardware status</h2><p>Devices supplying staff attendance evidence.</p></div></header><div className="staff-device-list">{devices.map(d=><div key={d[0]}><div><strong>{d[0]}</strong><span>{d[1]}</span><small>{d[2]}</small></div><div><span className="staff-att-chip">{d[3]}</span></div></div>)}</div><div className="staff-att-note" style={{marginTop:10}}>Queued scans should sync before an absence is finalized. Unknown or conflicting scans require human review rather than automatic payroll action.</div></article></section>

  <section className="staff-att-panel"><header><div><h2>Payroll handoff preview</h2><p>Only the reviewed attendance fields needed for payroll preparation move to Finance.</p></div></header><div className="staff-payroll-table"><div className="staff-payroll-head"><span>Staff</span><span>Expected</span><span>Present</span><span>Leave</span><span>Unexplained</span><span>Payroll state</span></div>{staff.map(s=><div className="staff-payroll-line" key={s.id}><div><strong>{s.name}</strong><small>{s.id}</small></div><span>{s.expected}</span><span>{s.present}</span><span>{s.leave}</span><span>{s.unexplained}</span><span className={`staff-att-chip ${s.status==="Review"?"warn":""}`}>{s.status==="Ready"?"Attendance verified":"Hold for review"}</span></div>)}</div></section>

  <section className="staff-att-note"><strong>Governance rule:</strong> attendance records may support payroll preparation, but lateness, absence or device data must not automatically create salary deductions, disciplinary action or employment decisions. Those require the school’s authorized human workflow.</section>
 </main>
}
