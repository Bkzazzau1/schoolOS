import Link from "next/link";

const reminders=[
 {child:"Maryam Abdullahi",className:"JSS 2A",balance:"₦125,000",next:"₦30,000",date:"25 Sep 2026",method:"Automatic bank mandate",status:"Scheduled",message:"A payment of ₦30,000 is scheduled for 25 Sep 2026. No action is needed if the authorized deduction proceeds successfully."},
 {child:"Hafsa Abdullahi",className:"Primary 3",balance:"₦55,000",next:"₦20,000",date:"20 Sep 2026",method:"Manual partial payment",status:"Upcoming",message:"A school-fee payment of ₦20,000 is expected on 20 Sep 2026. You may pay through Hafsa's student term account."},
];

const history=[
 ["13 Sep 2026","Maryam Abdullahi","Portal","Mandate scheduled for 25 Sep","Viewed"],
 ["12 Sep 2026","Hafsa Abdullahi","SMS + Portal","₦20,000 expected 20 Sep","Delivered"],
 ["06 Sep 2026","Maryam Abdullahi","Portal","Payment received · balance updated","Viewed"],
];

export default function ParentFeeReminders(){return <main className="family-page">
 <header className="family-head"><div><span className="family-kicker">FAMILY ACCOUNT · FEE REMINDERS</span><h1>School Fee Reminders</h1><p>See upcoming school-fee commitments, scheduled deductions and reminder history for your linked children.</p></div><div className="family-actions"><Link href="/parent/finance">Finance & Payments</Link><Link href="/parent/finance/receipts">Receipts</Link></div></header>
 <section className="family-grid two">{reminders.map(r=><article className="family-card" key={r.child}><header><div><h2>{r.child}</h2><p>{r.className} · 2026/2027 Term 1</p></div><strong>{r.status}</strong></header><div className="info-grid"><div><span>Outstanding</span><strong>{r.balance}</strong></div><div><span>Next expected payment</span><strong>{r.next}</strong></div><div><span>Date</span><strong>{r.date}</strong></div><div><span>Collection method</span><strong>{r.method}</strong></div></div><div className="family-callout" style={{marginTop:10}}>{r.message}</div></article>)}</section>
 <section className="family-card"><header><div><h2>Reminder history</h2><p>Messages about school-fee payments and confirmed balance changes.</p></div></header><div className="family-table"><div className="family-table-head"><span>Date</span><span>Child</span><span>Channel</span><span>Message</span><span>Status</span></div>{history.map((r,i)=><div className="family-table-row" key={i}>{r.map((v,j)=>j===4?<em key={j}>{v}</em>:<span key={j}>{v}</span>)}</div>)}</div></section>
 <section className="family-grid two"><article className="family-card"><header><div><h2>How reminders work</h2><p>SchoolOS uses the current finance arrangement before deciding what message to show.</p></div></header><div className="family-list"><div><strong>Active mandate</strong><span>You see the scheduled deduction rather than a duplicate “please pay” message.</span></div><div><strong>Payment plan</strong><span>Only the agreed instalment is shown, not the full balance as immediately due.</span></div><div><strong>Recent payment</strong><span>Reminder timing should update after the confirmed credit reduces the balance.</span></div></div></article><article className="family-card"><header><div><h2>Need another arrangement?</h2><p>Contact Finance if the current payment plan needs review.</p></div></header><div className="family-callout">A reminder is a finance communication only. It does not affect your child’s grades, classroom participation, teacher support or academic record.</div></article></section>
 </main>}
