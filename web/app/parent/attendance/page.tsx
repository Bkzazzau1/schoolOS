import Link from "next/link";

const events=[
 ["13 Sep 2026","Maryam Abdullahi","07:41","—","Main Gate","Face terminal","Present"],
 ["12 Sep 2026","Maryam Abdullahi","07:38","15:19","Main Gate","Face terminal","Present"],
 ["11 Sep 2026","Maryam Abdullahi","08:01","15:16","Main Gate","Face terminal","Late"],
 ["13 Sep 2026","Hafsa Abdullahi","07:44","—","Primary Gate","NFC card","Present"],
 ["12 Sep 2026","Hafsa Abdullahi","07:49","14:46","Primary Gate","NFC card","Present"],
 ["11 Sep 2026","Hafsa Abdullahi","07:52","14:41","Primary Gate","NFC card","Present"],
];

const children=[
 {name:"Maryam Abdullahi",className:"JSS 2A",attendance:"96%",present:"24 / 25",late:"1",last:"Today · 07:41",device:"Main Gate Face Terminal"},
 {name:"Hafsa Abdullahi",className:"Primary 3",attendance:"92%",present:"23 / 25",late:"2",last:"Today · 07:44",device:"Primary Gate NFC"},
];

export default function ParentAttendancePage(){return <main className="family-page">
 <header className="family-head"><div><span className="family-kicker">FAMILY ACCOUNT · ATTENDANCE</span><h1>Attendance & Arrival</h1><p>See check-in, check-out and weekly attendance records for your linked children.</p></div><div className="family-actions"><Link href="/parent">Dashboard</Link><Link href="/parent/children">My children</Link></div></header>

 <section className="family-finance-kpis"><article><span>Maryam attendance</span><strong>96%</strong><small>24 of 25 school days</small></article><article><span>Hafsa attendance</span><strong>92%</strong><small>23 of 25 school days</small></article><article><span>Late arrivals</span><strong>3</strong><small>Across both children</small></article><article><span>Today</span><strong>2 checked in</strong><small>Both children arrived</small></article></section>

 <section className="family-grid two">{children.map(child=><article className="family-card" key={child.name}><header><div><h2>{child.name}</h2><p>{child.className}</p></div><strong>{child.attendance}</strong></header><div className="info-grid"><div><span>Present days</span><strong>{child.present}</strong></div><div><span>Late arrivals</span><strong>{child.late}</strong></div><div><span>Latest check-in</span><strong>{child.last}</strong></div><div><span>Captured by</span><strong>{child.device}</strong></div></div><div className="family-callout" style={{marginTop:10}}>Today&apos;s arrival record was captured by school attendance hardware and synchronized to the family portal.</div></article>)}</section>

 <section className="family-card"><header><div><h2>Attendance history</h2><p>Arrival and departure facts for your linked children.</p></div></header><div className="family-table"><div className="family-table-head"><span>Date</span><span>Child</span><span>Check-in</span><span>Check-out</span><span>Gate</span><span>Status</span></div>{events.map((r,i)=><div className="family-table-row" key={`${r[0]}-${r[1]}-${i}`}><span>{r[0]}</span><strong>{r[1]}</strong><span>{r[2]}</span><span>{r[3]}</span><span>{r[4]} · {r[5]}</span><em>{r[6]}</em></div>)}</div></section>

 <section className="family-grid two"><article className="family-card"><header><div><h2>Notification history</h2><p>Examples of family-facing attendance messages.</p></div></header><div className="family-list"><div><strong>Maryam checked in at 07:41</strong><span>Main Gate · 13 Sep 2026</span></div><div><strong>Hafsa checked in at 07:44</strong><span>Primary Gate · 13 Sep 2026</span></div><div><strong>Maryam checked out at 15:19</strong><span>Main Gate · 12 Sep 2026</span></div></div></article><article className="family-card"><header><div><h2>Attendance principle</h2><p>Facts, not assumptions.</p></div></header><div className="family-callout">Attendance records show when a child was captured by the school&apos;s authorized attendance process. The portal does not guess why a child was late or absent. If hardware was offline, a record may appear after synchronization or an approved correction.</div></article></section>
 </main>}
