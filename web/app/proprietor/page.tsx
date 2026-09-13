"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const sections = [
  { name: "Nursery / Early Years", leader: "Mrs. Maryam Abdullahi", role: "Head Teacher", students: 84, attendance: 93, academic: 89, fees: 96, staff: 12, status: "Healthy" },
  { name: "Primary School", leader: "Mrs. Hauwa Sule", role: "Headmistress", students: 286, attendance: 94, academic: 82, fees: 91, staff: 28, status: "Healthy" },
  { name: "Secondary School", leader: "Mr. Ibrahim Danladi", role: "Principal", students: 278, attendance: 90, academic: 76, fees: 86, staff: 24, status: "Watch" },
];

const attention = [
  { title: "Secondary attendance below target", detail: "90% versus the 94% school target. JSS 2B has the widest current gap.", owner: "Principal", href: "/principal/attendance", tone: "high" },
  { title: "₦3.7m remains outstanding", detail: "73 family accounts still have current-term balances.", owner: "Finance", href: "/proprietor/finance", tone: "medium" },
  { title: "Two curriculum pacing gaps", detail: "Secondary Mathematics and Basic Science require follow-up.", owner: "VP Academics", href: "/principal/academics", tone: "medium" },
  { title: "Primary 6 class-teacher gap", detail: "The responsibility remains operationally unassigned.", owner: "Headmistress", href: "/headmaster/assignments", tone: "info" },
];

const leadership = [
  ["Mrs. Maryam Abdullahi", "Head Teacher", "Nursery / Early Years", "On track"],
  ["Mrs. Hauwa Sule", "Headmistress", "Primary School", "On track"],
  ["Mr. Ibrahim Danladi", "Principal", "Secondary School", "Review"],
  ["Mrs. Zainab Musa", "Vice Principal Academics", "Secondary School", "On track"],
];

export default function ProprietorDashboard() {
  const [selected, setSelected] = useState("Secondary School");
  const totalStudents = useMemo(() => sections.reduce((sum, item) => sum + item.students, 0), []);
  const totalStaff = useMemo(() => sections.reduce((sum, item) => sum + item.staff, 0), []);
  const attendance = Math.round(sections.reduce((sum, item) => sum + item.attendance * item.students, 0) / totalStudents);
  const academic = Math.round(sections.reduce((sum, item) => sum + item.academic * item.students, 0) / totalStudents);
  const current = sections.find(item => item.name === selected) ?? sections[2];

  return <main className="owner-dashboard-page">
    <section className="owner-title-row">
      <div><span className="owner-kicker">PROPRIETOR · WHOLE SCHOOL</span><h1>Executive Overview</h1><p>A decision-focused view of finance, enrollment, people, performance and school operations.</p></div>
      <div className="owner-title-actions"><Link href="/proprietor/reports">Executive reports</Link><Link href="/proprietor/ai">Ask Proprietor AI</Link></div>
    </section>

    <section className="owner-ai-brief">
      <div className="owner-ai-icon">AI</div>
      <div className="owner-ai-copy"><div><strong>Executive AI Brief</strong><span>Prototype · current term</span></div><p>School-wide operations are stable with <b>{attendance}% attendance</b> and <b>94% fee collection</b>. The current owner priorities are Secondary attendance, outstanding fees, two curriculum pacing gaps and one Primary staffing assignment.</p><div><Link href="/proprietor/ai">Ask School AI →</Link><Link href="/proprietor/reports">Open executive report</Link></div></div>
      <div className="owner-health-score"><span>School health</span><strong>87</strong><small>/100 · Stable</small></div>
    </section>

    <section className="owner-kpis executive-kpis">
      <Kpi label="Active students" value={String(totalStudents)} note="Across three sections" trend="+4.8% YoY" tone="green" />
      <Kpi label="Fee collection" value="94.1%" note="₦59.1m of ₦62.8m billed" trend="+6.2%" tone="green" />
      <Kpi label="Outstanding fees" value="₦3.7m" note="73 family accounts" trend="Review" tone="amber" />
      <Kpi label="Teaching staff" value={String(totalStaff)} note="Current section sample" trend="96% attendance" tone="blue" />
      <Kpi label="Student attendance" value={`${attendance}%`} note="Weighted school average" trend="+1.9%" tone="green" />
      <Kpi label="Academic health" value={`${academic}%`} note="Cross-section indicator" trend="3 watch items" tone="purple" />
    </section>

    <section className="owner-grid owner-grid-main">
      <article className="owner-card owner-performance-card">
        <header><div><h2>Section Performance</h2><p>Compare each school section without collapsing everything into one score.</p></div><Link href="/proprietor/reports">View reports →</Link></header>
        <div className="owner-section-performance-head"><span>Section</span><span>Students</span><span>Attendance</span><span>Academic</span><span>Fee collection</span><span>Status</span></div>
        {sections.map(item => <button type="button" key={item.name} className={`owner-section-performance-row ${selected === item.name ? "selected" : ""}`} onClick={() => setSelected(item.name)}><div><strong>{item.name}</strong><small>{item.role} · {item.leader}</small></div><b>{item.students}</b><Metric value={item.attendance}/><Metric value={item.academic}/><Metric value={item.fees}/><em className={item.status.toLowerCase()}>{item.status}</em></button>)}
        <div className="owner-section-detail"><div><span>Selected section</span><strong>{current.name}</strong><small>{current.leader} · {current.role}</small></div><div><span>Students</span><strong>{current.students}</strong></div><div><span>Staff</span><strong>{current.staff}</strong></div><div><span>Status</span><strong>{current.status}</strong></div></div>
      </article>

      <article className="owner-card owner-attention-card">
        <header><div><h2>Owner Attention Queue</h2><p>Items requiring oversight or delegated follow-up.</p></div><span className="owner-count">4</span></header>
        <div className="owner-attention-list">{attention.map(item => <div key={item.title} className={`owner-attention ${item.tone}`}><i>!</i><div><strong>{item.title}</strong><p>{item.detail}</p><small>Owner: {item.owner}</small></div><Link href={item.href}>Open →</Link></div>)}</div>
      </article>
    </section>

    <section className="owner-grid owner-grid-equal">
      <article className="owner-card owner-finance-card"><header><div><h2>Finance & Cash Collection</h2><p>Owner-level collection and exposure summary.</p></div><Link href="/proprietor/finance">Owner Finance →</Link></header><div className="owner-finance-summary"><div><span>Invoiced</span><strong>₦62.8m</strong></div><div><span>Collected</span><strong>₦59.1m</strong></div><div><span>Outstanding</span><strong>₦3.7m</strong></div><div><span>Financing</span><strong>₦150k</strong></div></div><div className="owner-chart"><div className="owner-chart-label"><span>Collection trend</span><strong>94.1%</strong></div><div className="owner-bars">{[72,78,81,84,88,91,94].map((value,index)=><i key={index} style={{height:`${value}%`}}><b>{value}%</b></i>)}</div></div></article>
      <article className="owner-card owner-enrollment-card"><header><div><h2>Enrollment & Retention</h2><p>Whole-school enrollment movement.</p></div><Link href="/proprietor/enrollment">Enrollment →</Link></header><div className="owner-enrollment-number"><div><span>Current enrollment</span><strong>648</strong><small>+29 net students this session</small></div><div className="owner-retention-ring"><strong>96%</strong><span>retention</span></div></div><div className="owner-enrollment-split"><div><span>Early Years</span><strong>84</strong></div><div><span>Primary</span><strong>286</strong></div><div><span>Secondary</span><strong>278</strong></div></div></article>
    </section>

    <section className="owner-grid owner-grid-main">
      <article className="owner-card"><header><div><h2>Leadership Oversight</h2><p>Current section leadership and owner-level signal.</p></div><Link href="/proprietor/structure">Manage structure →</Link></header><div className="owner-leadership-table"><div className="owner-leadership-head"><span>Leader</span><span>Role</span><span>Scope</span><span>Signal</span></div>{leadership.map(row => <div key={row[0]}><div><strong>{row[0]}</strong><small>{row[1]}</small></div><span>{row[1]}</span><span>{row[2]}</span><em className={row[3] === "Review" ? "review" : "good"}>{row[3]}</em></div>)}</div></article>
      <article className="owner-card"><header><div><h2>Owner Quick Access</h2><p>Move directly to executive modules.</p></div></header><div className="owner-quick-grid"><Quick href="/proprietor/finance" title="Owner Finance" text="Collections, outstanding balances and financing exposure"/><Quick href="/proprietor/enrollment" title="Enrollment" text="Admissions, retention and section distribution"/><Quick href="/proprietor/staff" title="Staff & HR" text="Staffing, workload, contracts and vacancies"/><Quick href="/proprietor/reports" title="Reports" text="Executive reporting and section comparisons"/><Quick href="/proprietor/campuses" title="Campuses" text="Branch comparison and expansion readiness"/><Quick href="/proprietor/ai" title="Proprietor AI" text="Ask whole-school management questions"/></div></article>
    </section>
  </main>;
}

function Kpi({label,value,note,trend,tone}:{label:string;value:string;note:string;trend:string;tone:string}){return <article className={`owner-kpi ${tone}`}><div><span>{label}</span><b>{trend}</b></div><strong>{value}</strong><p>{note}</p></article>}
function Metric({value}:{value:number}){return <div className="owner-mini-metric"><b>{value}%</b><i><span style={{width:`${value}%`}}/></i></div>}
function Quick({href,title,text}:{href:string;title:string;text:string}){return <Link href={href}><strong>{title}</strong><span>{text}</span><b>Open →</b></Link>}
