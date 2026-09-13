"use client";

import { useMemo, useState } from "react";

type EventStatus="Checked in"|"Late"|"Checked out"|"Unknown scan"|"Offline synced";
type DeviceStatus="Online"|"Offline"|"Syncing";

const liveEvents=[
 {time:"07:41",student:"Maryam Abdullahi",className:"JSS 2A",device:"Main Gate Face Terminal",method:"Face",status:"Checked in" as EventStatus,parent:"Sent"},
 {time:"07:44",student:"Hafsa Abdullahi",className:"Primary 3",device:"Primary Gate NFC",method:"NFC Card",status:"Checked in" as EventStatus,parent:"Sent"},
 {time:"07:58",student:"Ibrahim Sani",className:"JSS 2A",device:"Main Gate Face Terminal",method:"Face",status:"Late" as EventStatus,parent:"Sent"},
 {time:"08:03",student:"Muhammad Kabir",className:"Primary 5",device:"Primary Gate NFC",method:"NFC Card",status:"Offline synced" as EventStatus,parent:"Queued"},
 {time:"08:05",student:"Unknown credential",className:"—",device:"Main Gate Face Terminal",method:"Face",status:"Unknown scan" as EventStatus,parent:"Not sent"},
];

const devices=[
 {name:"Main Gate Face Terminal",location:"Main entrance",type:"Face recognition",status:"Online" as DeviceStatus,last:"08:05",events:"281 events"},
 {name:"Primary Gate NFC",location:"Primary entrance",type:"NFC / RFID",status:"Online" as DeviceStatus,last:"08:03",events:"196 events"},
 {name:"Early Years Check-in",location:"Nursery reception",type:"Guardian QR + staff confirm",status:"Online" as DeviceStatus,last:"07:56",events:"83 events"},
 {name:"Rear Gate Terminal",location:"Transport / rear gate",type:"Face + NFC",status:"Syncing" as DeviceStatus,last:"07:49",events:"42 queued"},
 {name:"Sports Exit Reader",location:"Sports field gate",type:"NFC / RFID",status:"Offline" as DeviceStatus,last:"Yesterday 16:18",events:"0 today"},
];

const sections=[
 ["Early Years",96,83,2,1],
 ["Primary",93,312,11,7],
 ["Secondary",91,228,14,9],
];

const requests=[
 ["ATT-081","Maryam Abdullahi","JSS 2A","Absent → Present","Teacher submitted correction"],
 ["ATT-082","Hafsa Abdullahi","Primary 3","Late → Present","Arrival log attached"],
 ["ATT-083","Ibrahim Sani","JSS 2A","Present → Excused","Leadership review required"],
];

export default function AttendanceDesk(){
 const [filter,setFilter]=useState("All");
 const filtered=useMemo(()=>filter==="All"?liveEvents:liveEvents.filter(e=>e.status===filter),[filter]);
 return <main>
  <header className="admin-head"><div><span className="admin-kicker">ADMINISTRATION · HARDWARE ATTENDANCE</span><h1>Attendance Control Center</h1><p>Monitor device events, student check-in/check-out, late arrivals, offline sync and documented corrections from one operational view.</p></div><div className="admin-actions"><button>Export today</button><button className="primary">Register device</button></div></header>

  <section className="att-hw-kpis">
   <article><span>Present today</span><strong>623</strong><small>96.1% of expected students</small></article>
   <article><span>Late arrivals</span><strong>27</strong><small>Across all sections</small></article>
   <article><span>Absent / not checked in</span><strong>25</strong><small>Requires normal follow-up</small></article>
   <article><span>Active devices</span><strong>4 / 5</strong><small>1 device currently offline</small></article>
   <article><span>Queued events</span><strong>42</strong><small>Waiting for device sync</small></article>
  </section>

  <section className="att-panel"><header className="admin-card-head"><div><h2>How hardware attendance reaches SchoolOS</h2><p>Prototype architecture for gate terminals and attendance devices.</p></div></header><div className="att-flow"><div><strong>1. Device scan</strong><span>Face · NFC · QR</span></div><div><strong>2. Identify student</strong><span>Match credential</span></div><div><strong>3. Record event</strong><span>Time + device + direction</span></div><div><strong>4. Attendance rule</strong><span>Present · Late · Exit</span></div><div><strong>5. SchoolOS ledger</strong><span>Daily history</span></div><div><strong>6. Parent update</strong><span>Arrival / departure</span></div></div></section>

  <section className="att-hw-grid">
   <article className="att-panel"><header className="admin-card-head"><div><h2>Live attendance events</h2><p>Latest device activity for the school day.</p></div><select value={filter} onChange={e=>setFilter(e.target.value)}><option>All</option><option>Checked in</option><option>Late</option><option>Offline synced</option><option>Unknown scan</option></select></header><div className="att-live-list">{filtered.map((e,i)=><div className="att-live-item" key={`${e.time}-${i}`}><div><strong>{e.student}</strong><span>{e.className} · {e.method}</span><small>{e.device}</small></div><div><strong>{e.time}</strong><span>Today</span></div><div><span className={`att-chip ${e.status==="Late"?"warn":e.status==="Unknown scan"?"danger":e.status==="Offline synced"?"offline":""}`}>{e.status}</span><small>Parent: {e.parent}</small></div></div>)}</div></article>
   <article className="att-panel"><header className="admin-card-head"><div><h2>Device health</h2><p>Connectivity and event-sync status.</p></div></header><div className="att-device-list">{devices.map(d=><div className="att-device-item" key={d.name}><div><strong>{d.name}</strong><span>{d.location}</span><small>{d.type}</small></div><div><strong>Last event {d.last}</strong><span>{d.events}</span></div><div><span className={`att-chip ${d.status==="Offline"?"danger":d.status==="Syncing"?"warn":""}`}>{d.status}</span></div></div>)}</div></article>
  </section>

  <section className="att-hw-grid">
   <article className="att-panel"><header className="admin-card-head"><div><h2>Attendance by section</h2><p>Current school-day picture from synchronized records.</p></div></header><div className="att-section-bars">{sections.map(([name,rate,present,late,absent])=><div key={String(name)}><strong>{name}</strong><i><b style={{width:`${rate}%`}}/></i><span>{rate}%</span><small style={{gridColumn:"2 / span 2"}}>{present} present · {late} late · {absent} absent</small></div>)}</div></article>
   <article className="att-panel"><header className="admin-card-head"><div><h2>Exceptions requiring attention</h2><p>Hardware data should be trusted, but not blindly.</p></div></header><div className="admin-list"><div><strong>42 offline events waiting to sync</strong><span>Rear Gate Terminal captured scans locally while connectivity was unavailable.</span><small>Do not mark these students absent until sync completes.</small></div><div><strong>1 unknown credential scan</strong><span>Main Gate Face Terminal could not confidently match the credential.</span><small>Review manually; never guess the student identity.</small></div><div><strong>3 correction requests</strong><span>Teacher/admin evidence conflicts with the current daily ledger.</span><small>Review with audit trail.</small></div></div></article>
  </section>

  <section className="att-correction-wrap admin-card"><header className="admin-card-head"><div><h2>Attendance corrections</h2><p>Documented corrections remain available when hardware or operational records need review.</p></div></header><div className="admin-table"><div className="admin-table-head"><span>Request</span><span>Student</span><span>Class</span><span>Requested change</span><span>Evidence</span><span>Action</span></div>{requests.map(r=><div className="admin-table-row" key={r[0]}><strong>{r[0]}</strong><span>{r[1]}</span><span>{r[2]}</span><span>{r[3]}</span><span>{r[4]}</span><button>Review</button></div>)}</div></section>

  <section className="att-parent-note"><h3>Attendance integrity rule</h3><p>Hardware events create operational evidence, not accusations. Offline events should synchronize before absence is finalized; unknown scans require human review; corrections retain requester, approver, reason and timestamp. Parent notifications should report arrival/departure facts without inferring why a child was late or absent.</p></section>
 </main>
}
