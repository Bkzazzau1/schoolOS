"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const sections = [
  { name: "Nursery / Early Years", leader: "Mrs. Maryam Abdullahi", role: "Head Teacher", students: 84, attendance: 93, academic: 89, fees: 96, staff: 12, status: "Healthy" },
  { name: "Primary School", leader: "Mrs. Hauwa Sule", role: "Headmistress", students: 286, attendance: 94, academic: 82, fees: 91, staff: 28, status: "Healthy" },
  { name: "Secondary School", leader: "Mr. Ibrahim Danladi", role: "Principal", students: 278, attendance: 90, academic: 76, fees: 86, staff: 24, status: "Watch" },
];

const leadership = [
  { name: "Mrs. Maryam Abdullahi", role: "Head Teacher", scope: "Nursery / Early Years", signal: "On track", note: "Observation coverage and guardian follow-up are stable." },
  { name: "Mrs. Hauwa Sule", role: "Headmistress", scope: "Primary School", signal: "On track", note: "Primary attendance and class-teacher coverage remain healthy." },
  { name: "Mr. Ibrahim Danladi", role: "Principal", scope: "Secondary School", signal: "Review", note: "JSS 2 attendance and two subject pacing issues need follow-up." },
  { name: "Mrs. Zainab Musa", role: "Vice Principal Academics", scope: "Secondary School", signal: "On track", note: "Assessment completion and timetable compliance are stable." },
];

const attention = [
  { tone: "high", title: "Secondary attendance is below school target", detail: "90% section attendance versus 94% target. JSS 2B has the largest gap.", owner: "Principal", href: "/proprietor/reports" },
  { tone: "medium", title: "₦3.7m remains outstanding", detail: "73 family accounts have unpaid current-term balances.", owner: "Finance", href: "/proprietor/finance" },
  { tone: "medium", title: "Two curriculum pacing gaps need review", detail: "Secondary Mathematics and Basic Science are behind the configured term plan.", owner: "VP Academics", href: "/proprietor/reports" },
  { tone: "info", title: "Primary 6 needs a confirmed class teacher", detail: "The class-teacher responsibility remains operationally unassigned.", owner: "Headmistress", href: "/proprietor/staff" },
];

const activity = [
  ["17:20", "Finance", "₦250,000 received across six family accounts"],
  ["16:45", "Secondary", "Principal submitted weekly section review"],
  ["15:30", "Primary", "Primary 3 literacy support review completed"],
  ["14:10", "School Life", "Inter-house sports schedule published"],
  ["12:25", "Early Years", "Guardian follow-up queue reduced to two"],
  ["10:40", "Operations", "BUS-02 maintenance inspection marked complete"],
];

const financeTrend = [72, 78, 81, 84, 88, 91, 94];
const enrollmentTrend = [598, 612, 621, 630, 638, 644, 648];

export default function ProprietorDashboard() {
  const [campus, setCampus] = useState("All campuses");
  const [period, setPeriod] = useState("Current term");
  const [expandedSection, setExpandedSection] = useState("Secondary School");

  const totalStudents = useMemo(() => sections.reduce((sum, item) => sum + item.students, 0), []);
  const totalStaff = useMemo(() => sections.reduce((sum, item) => sum + item.staff, 0), []);
  const avgAttendance = Math.round(sections.reduce((sum, item) => sum + item.attendance * item.students, 0) / totalStudents);
  const avgAcademic = Math.round(sections.reduce((sum, item) => sum + item.academic * item.students, 0) / totalStudents);
  const selected = sections.find((item) => item.name === expandedSection) ?? sections[2];

  return (
    <main className="owner-app">
      <aside className="owner-sidebar">
        <div className="owner-brand"><div className="owner-mark">S</div><div><strong>SchoolOS</strong><span>Owner Command Center</span></div></div>
        <div className="owner-school-switcher"><span>ACTIVE ORGANIZATION</span><strong>BrightGate Academy</strong><small>Nursery · Primary · Secondary</small><button type="button">Kaduna Campus <b>⌄</b></button></div>
        <nav className="owner-nav">
          <p>EXECUTIVE</p>
          <Link className="active" href="/proprietor"><i>⌂</i>Executive Overview</Link>
          <Link href="/proprietor/ai"><i>✦</i>Proprietor AI</Link>
          <Link href="/proprietor/reports"><i>↗</i>Executive Reports</Link>
          <Link href="/proprietor/campuses"><i>▦</i>Campus Comparison</Link>
          <p>BUSINESS</p>
          <Link href="/proprietor/finance"><i>₦</i>Owner Finance</Link>
          <Link href="/proprietor/enrollment"><i>◉</i>Enrollment & Admissions</Link>
          <Link href="/proprietor/staff"><i>♙</i>Staff & HR Overview</Link>
          <p>GOVERNANCE & SCHOOL LIFE</p>
          <Link href="/proprietor/structure"><i>◇</i>Structure & Leadership</Link>
          <Link href="/school-life/access?portal=proprietor"><i>◎</i>School Life</Link>
        </nav>
        <div className="owner-side-foot"><div className="owner-plan"><span>SCHOOLOS PLAN</span><strong>Standard</strong><small>648 active students · ₦500/student/term</small></div><div className="owner-profile-mini"><span>IB</span><div><strong>Proprietor</strong><small>Whole-school authority</small></div><button type="button">⋯</button></div></div>
      </aside>

      <section className="owner-main">
        <header className="owner-topbar"><div className="owner-search"><span>⌕</span><input placeholder="Search students, staff, finance, operations..." /></div><div className="owner-top-actions"><select value={campus} onChange={(e) => setCampus(e.target.value)}><option>All campuses</option><option>Kaduna Campus</option><option>Zaria Campus · planned</option></select><select value={period} onChange={(e) => setPeriod(e.target.value)}><option>Current term</option><option>This month</option><option>Today</option><option>2026/2027 session</option></select><button className="owner-icon-btn" type="button">◔</button><button className="owner-icon-btn notify" type="button">♢<i /></button></div></header>

        <div className="owner-content">
          <section className="owner-title-row"><div><span className="owner-kicker">PROPRIETOR WORKSPACE · {campus.toUpperCase()}</span><h1>Executive Overview</h1><p>A decision-focused view of performance, finance, people, enrollment and school operations.</p></div><div className="owner-title-actions"><Link href="/proprietor/reports">Executive reports</Link><Link href="/proprietor/ai">✦ Ask Proprietor AI</Link></div></section>

          <section className="owner-ai-brief"><div className="owner-ai-icon">AI</div><div className="owner-ai-copy"><div><strong>Executive AI Brief</strong><span>Prototype · {period}</span></div><p>School-wide operations are stable with <b>{avgAttendance}% student attendance</b> and <b>94.1% fee collection</b>. Owner attention is concentrated on Secondary attendance, ₦3.7m outstanding fees, two curriculum pacing gaps and one Primary staffing gap.</p><div><Link href="/proprietor/reports" style={{color:"inherit",textDecoration:"none"}}>View priorities →</Link><Link href="/proprietor/ai" style={{color:"inherit",textDecoration:"none"}}>Ask School AI</Link></div></div><div className="owner-health-score"><span>School health</span><strong>87</strong><small>/100 · Stable</small></div></section>

          <section className="owner-kpis executive-kpis">
            <Kpi label="Active students" value={String(totalStudents)} note="Across three academic sections" trend="+4.8% YoY" tone="green" />
            <Kpi label="Fee collection" value="94.1%" note="₦59.1m of ₦62.8m billed" trend="+6.2%" tone="green" />
            <Kpi label="Outstanding fees" value="₦3.7m" note="73 family accounts" trend="-₦420k" tone="amber" />
            <Kpi label="Staff strength" value={String(totalStaff)} note="Teaching staff sample" trend="96% attendance" tone="blue" />
            <Kpi label="Student attendance" value={`${avgAttendance}%`} note="Weighted school average" trend="+1.9%" tone="green" />
            <Kpi label="Academic health" value={`${avgAcademic}%`} note="Cross-section indicator" trend="3 items to watch" tone="purple" />
          </section>

          <section className="owner-grid owner-grid-main">
            <article className="owner-card owner-performance-card"><header><div><h2>Section Performance</h2><p>Compare Nursery, Primary and Secondary without reducing them to one opaque score.</p></div><Link href="/proprietor/reports">Executive report →</Link></header><div className="owner-section-performance-head"><span>Section</span><span>Students</span><span>Attendance</span><span>Academic</span><span>Fee collection</span><span>Status</span></div>{sections.map((item) => <button type="button" key={item.name} className={`owner-section-performance-row ${expandedSection === item.name ? "selected" : ""}`} onClick={() => setExpandedSection(item.name)}><div><strong>{item.name}</strong><small>{item.role} · {item.leader}</small></div><b>{item.students}</b><Metric value={item.attendance}/><Metric value={item.academic}/><Metric value={item.fees}/><em className={item.status.toLowerCase()}>{item.status}</em></button>)}<div className="owner-section-detail"><div><span>Selected section</span><strong>{selected.name}</strong><small>{selected.leader} · {selected.role}</small></div><div><span>Students</span><strong>{selected.students}</strong></div><div><span>Staff</span><strong>{selected.staff}</strong></div><div><span>Status</span><strong>{selected.status}</strong></div></div></article>

            <article className="owner-card owner-attention-card"><header><div><h2>Owner Attention Queue</h2><p>Items requiring oversight or leadership follow-up.</p></div><span className="owner-count">4</span></header><div className="owner-attention-list">{attention.map((item) => <div key={item.title} className={`owner-attention ${item.tone}`}><i>!</i><div><strong>{item.title}</strong><p>{item.detail}</p><small>Owner: {item.owner}</small></div><Link href={item.href}>Open →</Link></div>)}</div></article>
          </section>

          <section className="owner-grid owner-grid-equal">
            <article className="owner-card owner-finance-card"><header><div><h2>Finance & Cash Collection</h2><p>Current-term billing, collection and financing exposure.</p></div><Link href="/proprietor/finance">Owner Finance →</Link></header><div className="owner-finance-summary"><div><span>Invoiced</span><strong>₦62.8m</strong></div><div><span>Collected</span><strong>₦59.1m</strong></div><div><span>Outstanding</span><strong>₦3.7m</strong></div><div><span>Education financing</span><strong>₦150k</strong></div></div><div className="owner-chart"><div className="owner-chart-label"><span>Collection trend</span><strong>94.1%</strong></div><div className="owner-bars">{financeTrend.map((value,index)=><i key={index} style={{height:`${value}%`}}><b>{value}%</b></i>)}</div><div className="owner-chart-axis"><span>W1</span><span>W2</span><span>W3</span><span>W4</span><span>W5</span><span>W6</span><span>Now</span></div></div></article>

            <article className="owner-card owner-enrollment-card"><header><div><h2>Enrollment & Retention</h2><p>Whole-school demand and section distribution.</p></div><Link href="/proprietor/enrollment">Admissions view →</Link></header><div className="owner-enrollment-number"><div><span>Current enrollment</span><strong>648</strong><small>+29 net students this session</small></div><div className="owner-retention-ring"><strong>96%</strong><span>retention</span></div></div><div className="owner-sparkline">{enrollmentTrend.map((value,index)=><i key={index} style={{height:`${Math.max(18,(value-580)*1.15)}px`}}><b>{index===enrollmentTrend.length-1?value:""}</b></i>)}</div><div className="owner-enrollment-split"><div><span>Early Years</span><strong>84</strong></div><div><span>Primary</span><strong>286</strong></div><div><span>Secondary</span><strong>278</strong></div></div></article>
          </section>

          <section className="owner-grid owner-grid-main">
            <article className="owner-card"><header><div><h2>Leadership Oversight</h2><p>Section leaders and the context behind current signals.</p></div><Link href="/proprietor/staff">Staff & HR →</Link></header><div className="owner-leadership-table"><div className="owner-leadership-head"><span>Leader</span><span>Scope</span><span>Signal</span><span>Context</span></div>{leadership.map(item=><div key={item.name}><div><strong>{item.name}</strong><small>{item.role}</small></div><span>{item.scope}</span><em className={item.signal==="Review"?"review":"good"}>{item.signal}</em><p>{item.note}</p></div>)}</div><div className="owner-boundary-note"><strong>Leadership principle</strong><p>Use evidence, workload and operational context for oversight. Do not reduce leaders or teachers to one automatic employment score.</p></div></article>

            <article className="owner-card owner-activity-card"><header><div><h2>School Activity Stream</h2><p>Important events from across the school today.</p></div><button type="button">Today</button></header><div className="owner-activity-list">{activity.map(([time,area,text])=><div key={`${time}-${area}`}><time>{time}</time><i/><div><strong>{area}</strong><p>{text}</p></div></div>)}</div></article>
          </section>

          <section className="owner-quick-grid">
            <Quick href="/proprietor/finance" icon="₦" title="Owner Finance" text="Collections, outstanding fees, payment plans and financing exposure" />
            <Quick href="/proprietor/enrollment" icon="◉" title="Enrollment & Admissions" text="Applications, conversion, capacity and retention" />
            <Quick href="/proprietor/staff" icon="♙" title="Staff & HR" text="Staffing, workload, leadership and HR attention" />
            <Quick href="/proprietor/reports" icon="↗" title="Executive Reports" text="Owner and board-ready review packs" />
            <Quick href="/proprietor/campuses" icon="▦" title="Campus Comparison" text="Branch performance, readiness and operating scope" />
            <Quick href="/proprietor/ai" icon="✦" title="Proprietor AI" text="Ask whole-school questions within owner-authorized boundaries" />
          </section>
        </div>
      </section>
    </main>
  );
}

function Kpi({label,value,note,trend,tone}:{label:string;value:string;note:string;trend:string;tone:string}){return <article className={`owner-kpi ${tone}`}><div><span>{label}</span><b>{trend}</b></div><strong>{value}</strong><p>{note}</p></article>}
function Metric({value}:{value:number}){return <div className="owner-mini-metric"><b>{value}%</b><i><span style={{width:`${value}%`}}/></i></div>}
function Quick({href,icon,title,text}:{href:string;icon:string;title:string;text:string}){return <Link href={href}><span>{icon}</span><div><strong>{title}</strong><p>{text}</p></div><b>→</b></Link>}
