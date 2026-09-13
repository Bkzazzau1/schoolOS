"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type CaseType = "Routine care" | "Minor safety" | "Health support" | "Behaviour support" | "Safeguarding";
type CaseStatus = "Open" | "Monitoring" | "Resolved" | "Restricted";
type Priority = "Routine" | "Prompt" | "Urgent";

type WelfareCase = {
  id: string;
  child: string;
  childId: string;
  group: string;
  type: CaseType;
  title: string;
  summary: string;
  priority: Priority;
  status: CaseStatus;
  owner: string;
  guardian: "Not needed" | "Pending" | "Contacted";
  updated: string;
  restricted?: boolean;
};

type TimelineItem = { time: string; actor: string; text: string };

const initialCases: WelfareCase[] = [
  { id:"EY-W-101", child:"Child Ibrahim", childId:"EY-C002", group:"Nursery 1", type:"Routine care", title:"Settling-in support", summary:"Morning settling has taken longer on several days. Keep the familiar arrival routine and coordinate with the guardian.", priority:"Routine", status:"Monitoring", owner:"Mrs. Aisha Musa", guardian:"Contacted", updated:"Today · 10:30 AM" },
  { id:"EY-W-102", child:"Child David", childId:"EY-C004", group:"Nursery 2", type:"Minor safety", title:"Small playground scrape", summary:"Minor playground incident recorded. Child was comforted, the area was checked and the guardian was informed.", priority:"Prompt", status:"Resolved", owner:"Mrs. Halima Yusuf", guardian:"Contacted", updated:"Yesterday · 12:15 PM" },
  { id:"EY-W-103", child:"Child Yusuf", childId:"EY-C006", group:"Reception A", type:"Health support", title:"Child felt unwell during class", summary:"Child was moved to a calm supervised area and guardian contact was initiated. No diagnosis is recorded in this workspace.", priority:"Prompt", status:"Open", owner:"Mrs. Fatima Bello", guardian:"Pending", updated:"Today · 11:40 AM" },
  { id:"EY-W-104", child:"Child Grace", childId:"EY-C007", group:"Reception A", type:"Behaviour support", title:"Repeated transition difficulty", summary:"Educators are tracking the transition routine and environmental context before deciding whether any additional support is needed.", priority:"Routine", status:"Monitoring", owner:"Mr. Daniel Musa", guardian:"Not needed", updated:"Today · 9:55 AM" },
  { id:"EY-W-105", child:"Restricted", childId:"Restricted", group:"Early Years", type:"Safeguarding", title:"Restricted safeguarding record", summary:"Sensitive details are intentionally hidden from this ordinary welfare view.", priority:"Urgent", status:"Restricted", owner:"Authorized safeguarding lead", guardian:"Not needed", updated:"Restricted", restricted:true },
];

const timelines: Record<string, TimelineItem[]> = {
  "EY-W-101": [
    { time:"Today · 7:48 AM", actor:"Mrs. Aisha Musa", text:"Child arrived and needed additional support to enter the normal play routine." },
    { time:"Today · 8:12 AM", actor:"Nursery 1 team", text:"Child joined familiar construction play after a calm transition." },
    { time:"Today · 10:30 AM", actor:"Head Teacher", text:"Continue the current routine and compare the pattern across several mornings before changing support." },
  ],
  "EY-W-102": [
    { time:"Yesterday · 11:26 AM", actor:"Outdoor duty team", text:"Minor scrape recorded during supervised outdoor play." },
    { time:"Yesterday · 11:32 AM", actor:"Mrs. Halima Yusuf", text:"Child comforted and returned to normal activity after routine first-response care." },
    { time:"Yesterday · 12:15 PM", actor:"Head Teacher", text:"Guardian informed and play area check completed. Case closed for routine monitoring." },
  ],
  "EY-W-103": [
    { time:"Today · 11:18 AM", actor:"Mrs. Fatima Bello", text:"Child said they did not feel well and stopped participating in the current activity." },
    { time:"Today · 11:22 AM", actor:"Reception A team", text:"Child moved to a calm supervised area while guardian contact was prepared." },
    { time:"Today · 11:40 AM", actor:"Head Teacher", text:"Guardian contact pending. Record observations only; do not diagnose from the school record." },
  ],
  "EY-W-104": [
    { time:"Today · 9:12 AM", actor:"Mr. Daniel Musa", text:"Transition from learning centre to circle activity took longer than usual." },
    { time:"Today · 9:55 AM", actor:"Head Teacher", text:"Monitor routine, staffing and environmental context before considering a new support plan." },
  ],
};

const groupSummary = [
  { group:"Nursery 1", open:1, monitoring:1, resolved:2, guardian:1 },
  { group:"Nursery 2", open:0, monitoring:0, resolved:3, guardian:1 },
  { group:"Reception A", open:1, monitoring:1, resolved:1, guardian:1 },
];

export default function HeadTeacherIncidentsPage(){
  const [cases,setCases]=useState(initialCases);
  const [query,setQuery]=useState("");
  const [group,setGroup]=useState("All groups");
  const [type,setType]=useState("All types");
  const [selectedId,setSelectedId]=useState("EY-W-103");
  const [note,setNote]=useState("");
  const [accessRequested,setAccessRequested]=useState(false);

  const filtered=useMemo(()=>cases.filter(item=>{
    const matches=`${item.id} ${item.child} ${item.group} ${item.type} ${item.title} ${item.owner}`.toLowerCase().includes(query.toLowerCase());
    return matches&&(group==="All groups"||item.group===group)&&(type==="All types"||item.type===type);
  }),[cases,query,group,type]);

  const selected=cases.find(item=>item.id===selectedId)??cases[0];
  const openCount=cases.filter(item=>item.status==="Open").length;
  const monitoringCount=cases.filter(item=>item.status==="Monitoring").length;
  const guardianPending=cases.filter(item=>item.guardian==="Pending").length;

  function setCaseStatus(status:CaseStatus){
    if(selected.restricted) return;
    setCases(current=>current.map(item=>item.id===selected.id?{...item,status,updated:"Just now · prototype"}:item));
  }

  return <main className="headteacher-main early-incidents-page" style={{maxWidth:1400,margin:"0 auto"}}>
    <header className="headteacher-topbar">
      <div><span className="headteacher-kicker">HEAD TEACHER · NURSERY / EARLY YEARS</span><h1>Welfare & Incidents</h1><p>Coordinate routine care, safety events, operational health support, behaviour support and restricted safeguarding workflow.</p></div>
      <div className="headteacher-actions"><Link href="/headteacher">Dashboard</Link><Link href="/headteacher/children">Children</Link><Link href="/headteacher/guardians">Guardians</Link></div>
    </header>

    <section className="headteacher-scope"><div><span>ACTIVE SECTION</span><strong>Nursery / Early Years</strong><small>Kaduna Campus · Head Teacher Mrs. Mary Daniel</small></div><p>Ordinary welfare records are Early Years only. Safeguarding-sensitive details require separate authorization and remain hidden here.</p></section>

    <section className="early-incident-kpis">
      <article><span>Open cases</span><strong>{openCount}</strong><small>Needs current action</small></article>
      <article><span>Monitoring</span><strong>{monitoringCount}</strong><small>Context being reviewed</small></article>
      <article><span>Guardian contact pending</span><strong>{guardianPending}</strong><small>Follow-up required</small></article>
      <article><span>Resolved this cycle</span><strong>6</strong><small>Routine cases closed</small></article>
      <article><span>Restricted records</span><strong>1</strong><small>Separate authorization</small></article>
      <article><span>Automatic decisions</span><strong>Off</strong><small>Human review required</small></article>
    </section>

    <section className="early-incidents-workspace">
      <article className="headteacher-card early-case-list-card">
        <header className="headteacher-section-head"><div><h3>Case register</h3><p>Operational and welfare records visible to the Early Years Head Teacher.</p></div></header>
        <div className="early-case-filters">
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search child, case, type or owner..." />
          <select value={group} onChange={e=>setGroup(e.target.value)}><option>All groups</option><option>Nursery 1</option><option>Nursery 2</option><option>Reception A</option><option>Early Years</option></select>
          <select value={type} onChange={e=>setType(e.target.value)}><option>All types</option><option>Routine care</option><option>Minor safety</option><option>Health support</option><option>Behaviour support</option><option>Safeguarding</option></select>
        </div>
        <div className="early-case-list">
          {filtered.map(item=><button key={item.id} className={`early-case-row ${selected.id===item.id?"selected":""} ${item.restricted?"restricted":""}`} onClick={()=>{setSelectedId(item.id);setNote("");}}>
            <div><span>{item.id}</span><strong>{item.title}</strong><small>{item.restricted?"Sensitive details hidden":`${item.child} · ${item.group}`}</small></div>
            <div><span>TYPE</span><b>{item.type}</b></div>
            <div><span>PRIORITY</span><b>{item.priority}</b></div>
            <div><span>OWNER</span><b>{item.owner}</b></div>
            <em className={`early-case-status ${item.status.toLowerCase()}`}>{item.status}</em>
          </button>)}
        </div>
      </article>

      <aside className={`headteacher-card early-case-detail ${selected.restricted?"restricted":""}`}>
        {selected.restricted ? <>
          <span className="headteacher-kicker">RESTRICTED SAFEGUARDING RECORD</span>
          <h2>Details are not available in this workspace</h2>
          <p>This ordinary Head Teacher case view can confirm that a restricted record exists, but it cannot reveal allegations, evidence, identities, notes or safeguarding conclusions.</p>
          <div className="early-restricted-box"><strong>Separate authorization required</strong><span>Access must be granted through the safeguarding role/workflow, not by editing this profile or changing a UI filter.</span></div>
          <button className="early-primary-action" onClick={()=>setAccessRequested(true)}>{accessRequested?"Access request noted":"Request authorized review"}</button>
          <small>Prototype only: requesting review does not unlock any sensitive information.</small>
        </> : <>
          <div className="early-case-detail-head"><div><span>{selected.id}</span><h2>{selected.title}</h2><p>{selected.child} · {selected.group}</p></div><em className={`early-case-status ${selected.status.toLowerCase()}`}>{selected.status}</em></div>
          <div className="early-case-meta"><div><span>Type</span><strong>{selected.type}</strong></div><div><span>Priority</span><strong>{selected.priority}</strong></div><div><span>Owner</span><strong>{selected.owner}</strong></div><div><span>Guardian</span><strong>{selected.guardian}</strong></div></div>
          <div className="early-case-summary"><span>FACTUAL SUMMARY</span><p>{selected.summary}</p></div>
          <div className="early-case-timeline"><span>CASE TIMELINE</span>{(timelines[selected.id]??[]).map(item=><div key={`${item.time}-${item.actor}`}><time>{item.time}</time><strong>{item.actor}</strong><p>{item.text}</p></div>)}</div>
          <label className="early-case-note">Private leadership note<textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Add factual follow-up, action or coordination note..." /></label>
          <div className="early-case-actions"><button onClick={()=>setCaseStatus("Monitoring")}>Monitor</button><button onClick={()=>setCaseStatus("Resolved")}>Resolve locally</button><Link href="/headteacher/guardians">Guardian communication</Link></div>
          <small className="early-case-local">Prototype only: status changes and notes are local UI state.</small>
        </>}
      </aside>
    </section>

    <section className="early-incidents-lower-grid">
      <article className="headteacher-card">
        <header className="headteacher-section-head"><div><h3>Group welfare overview</h3><p>Case workload by Early Years group.</p></div></header>
        <div className="early-group-case-list">{groupSummary.map(item=><div key={item.group}><strong>{item.group}</strong><span>Open<b>{item.open}</b></span><span>Monitoring<b>{item.monitoring}</b></span><span>Resolved<b>{item.resolved}</b></span><span>Guardian contact<b>{item.guardian}</b></span></div>)}</div>
      </article>

      <article className="headteacher-card early-incident-ai">
        <span className="headteacher-kicker">HEAD TEACHER AI · WELFARE OPERATIONS</span>
        <h3>Reception A has the highest current follow-up workload</h3>
        <p>The safe AI role is to summarize open operational tasks: one health-support follow-up, one routine/behaviour-support monitoring item and guardian communication. It must not decide medical cause, blame, punishment, abuse status or safeguarding outcome.</p>
        <div><span>Review first</span><strong>Guardian contact pending</strong></div>
        <div><span>Then check</span><strong>Routine and staffing context</strong></div>
        <div><span>Restricted area</span><strong>Safeguarding details excluded</strong></div>
        <Link href="/headteacher/ai">Ask Head Teacher AI</Link>
      </article>
    </section>

    <section className="headteacher-card early-incident-rule">
      <span className="headteacher-kicker">CHILD WELFARE SAFETY RULE</span>
      <h3>Record facts, protect sensitive information and keep human judgement in the loop</h3>
      <p>This UI may coordinate care, timelines and follow-up. It must not diagnose illness, determine guilt, prescribe punishment, infer abuse or expose restricted safeguarding details to an unauthorized role.</p>
    </section>
  </main>;
}
