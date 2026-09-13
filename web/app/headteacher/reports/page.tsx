"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { schoolProfile } from "../../../lib/school-profile";

type DevelopmentState = "Emerging" | "Developing" | "Secure";
type ReportStatus = "Draft" | "Ready for review" | "Approved" | "Released";
type Report = {
  id: string;
  child: string;
  childId: string;
  group: string;
  age: string;
  educator: string;
  attendance: number;
  observations: number;
  status: ReportStatus;
  language: DevelopmentState;
  numeracy: DevelopmentState;
  physical: DevelopmentState;
  personalSocial: DevelopmentState;
  creative: DevelopmentState;
  educatorComment: string;
  headTeacherComment: string;
  nextSteps: string[];
};

const initialReports: Report[] = [
  { id:"EYR-001", child:"Child Amina", childId:"EY-C001", group:"Nursery 1", age:"3y 5m", educator:"Mrs. Aisha Musa", attendance:98, observations:94, status:"Approved", language:"Developing", numeracy:"Developing", physical:"Secure", personalSocial:"Secure", creative:"Secure", educatorComment:"Amina participates confidently in familiar routines, enjoys storytelling and collaborates well during play. She is increasingly using language to explain choices and ideas.", headTeacherComment:"A positive term with broad participation across routines and play-based learning. Continue offering rich language and creative opportunities at her current pace.", nextSteps:["Continue story retelling and descriptive vocabulary.","Extend sorting and quantity language through play.","Maintain varied creative and physical experiences."] },
  { id:"EYR-002", child:"Child Ibrahim", childId:"EY-C002", group:"Nursery 1", age:"3y 7m", educator:"Mrs. Aisha Musa", attendance:95, observations:90, status:"Ready for review", language:"Emerging", numeracy:"Developing", physical:"Secure", personalSocial:"Developing", creative:"Secure", educatorComment:"Ibrahim is settling more independently and is joining small-group activities with increasing confidence. Familiar-word use and peer interaction are developing steadily.", headTeacherComment:"Keep the current settling routine stable and continue small-group language opportunities. Progress should be reviewed through repeated observations rather than one snapshot.", nextSteps:["Continue familiar-word storytelling.","Provide small-group turn-taking opportunities.","Maintain the current arrival routine."] },
  { id:"EYR-003", child:"Child Maryam", childId:"EY-C003", group:"Nursery 2", age:"4y 2m", educator:"Mrs. Halima Yusuf", attendance:97, observations:92, status:"Released", language:"Secure", numeracy:"Developing", physical:"Secure", personalSocial:"Secure", creative:"Developing", educatorComment:"Maryam communicates clearly, participates well with peers and engages positively with practical numeracy and creative activities.", headTeacherComment:"A strong developmental picture supported by consistent attendance and observation coverage. Keep provision broad and play-based.", nextSteps:["Extend comparison and quantity language.","Offer more open-ended creative choices.","Continue collaborative play opportunities."] },
  { id:"EYR-004", child:"Child David", childId:"EY-C004", group:"Nursery 2", age:"4y 4m", educator:"Mrs. Halima Yusuf", attendance:91, observations:83, status:"Draft", language:"Developing", numeracy:"Developing", physical:"Developing", personalSocial:"Developing", creative:"Secure", educatorComment:"David engages positively in creative activities. Current developmental evidence is incomplete because several observations remain outstanding this cycle.", headTeacherComment:"Complete the observation cycle and review attendance context before strengthening any developmental conclusion in the family-facing report.", nextSteps:["Complete pending observations.","Review attendance context with guardian if needed.","Continue broad physical and social play opportunities."] },
  { id:"EYR-005", child:"Child Fatima", childId:"EY-C005", group:"Reception A", age:"5y 0m", educator:"Mrs. Fatima Bello", attendance:96, observations:88, status:"Ready for review", language:"Secure", numeracy:"Secure", physical:"Developing", personalSocial:"Secure", creative:"Developing", educatorComment:"Fatima participates confidently in sound play, early number activities and group routines. She shows growing independence and steady transition readiness.", headTeacherComment:"The report shows a balanced developmental picture. Keep physical and creative opportunities visible alongside early literacy and numeracy work.", nextSteps:["Continue mixed sound-play activities.","Extend pattern and number-language opportunities.","Maintain physical and creative choice activities."] },
  { id:"EYR-006", child:"Child Yusuf", childId:"EY-C006", group:"Reception A", age:"5y 1m", educator:"Mrs. Fatima Bello", attendance:89, observations:76, status:"Draft", language:"Developing", numeracy:"Emerging", physical:"Secure", personalSocial:"Developing", creative:"Developing", educatorComment:"Yusuf participates best when routines are familiar and support is consistent. Current evidence is limited by lower attendance and incomplete observation coverage.", headTeacherComment:"Do not over-interpret this report. Improve attendance context, routine stability and observation coverage first, then review the developmental picture with the educator and guardian.", nextSteps:["Stabilize familiar routines.","Complete observation coverage.","Continue supportive guardian communication."] },
];

const groupReadiness = [
  {group:"Nursery 1", complete:96, ready:25, total:28},
  {group:"Nursery 2", complete:88, ready:25, total:30},
  {group:"Reception A", complete:78, ready:19, total:26},
];

export default function HeadTeacherReportsPage(){
  const [reports,setReports]=useState(initialReports);
  const [group,setGroup]=useState("All groups");
  const [status,setStatus]=useState("All statuses");
  const [query,setQuery]=useState("");
  const [selectedId,setSelectedId]=useState("EYR-006");
  const [notice,setNotice]=useState("");

  const filtered=useMemo(()=>reports.filter(r=>{
    const q=`${r.child} ${r.childId} ${r.group} ${r.educator}`.toLowerCase().includes(query.toLowerCase());
    return q&&(group==="All groups"||r.group===group)&&(status==="All statuses"||r.status===status);
  }),[reports,group,status,query]);
  const selected=reports.find(r=>r.id===selectedId)??reports[0];
  const ready=reports.filter(r=>r.status==="Ready for review").length;
  const approved=reports.filter(r=>r.status==="Approved").length;
  const released=reports.filter(r=>r.status==="Released").length;
  const avgObs=Math.round(reports.reduce((s,r)=>s+r.observations,0)/reports.length);

  const domains=[
    ["Language & Communication",selected.language],
    ["Early Numeracy",selected.numeracy],
    ["Physical Development",selected.physical],
    ["Personal & Social Development",selected.personalSocial],
    ["Creative Exploration",selected.creative],
  ] as const;

  function move(next:ReportStatus){
    setReports(current=>current.map(r=>r.id===selected.id?{...r,status:next}:r));
    setNotice(`${selected.child} moved to ${next} in this UI prototype.`);
  }

  return <main className="headteacher-main early-reports-page" style={{maxWidth:1400,margin:"0 auto"}}>
    <header className="headteacher-topbar"><div><span className="headteacher-kicker">HEAD TEACHER · NURSERY / EARLY YEARS</span><h1>Reports</h1><p>Review age-appropriate developmental summaries, educator comments and guardian-facing reports.</p></div><div className="headteacher-actions"><Link href="/headteacher">Dashboard</Link><Link href="/headteacher/observations">Observations</Link><Link href="/headteacher/children">Children</Link></div></header>

    <section className="headteacher-scope"><div><span>ACTIVE SECTION</span><strong>Nursery / Early Years</strong><small>Kaduna Campus · Head Teacher Mrs. Mary Daniel</small></div><p>Reports summarize developmental evidence and routines. They do not rank children or convert Early Years development into exam-style marks.</p></section>

    <section className="early-report-kpis">
      <article><span>Representative reports</span><strong>{reports.length}</strong><small>UI sample records</small></article>
      <article><span>Ready for review</span><strong>{ready}</strong><small>Needs Head Teacher review</small></article>
      <article><span>Approved</span><strong>{approved}</strong><small>Ready for release workflow</small></article>
      <article><span>Released</span><strong>{released}</strong><small>Prototype status only</small></article>
      <article><span>Observation coverage</span><strong>{avgObs}%</strong><small>Representative reports</small></article>
      <article><span>Ranking</span><strong>Off</strong><small>No position or ability score</small></article>
    </section>

    <section className="early-report-readiness headteacher-card"><header className="headteacher-section-head"><div><h3>Group report readiness</h3><p>Completion should reflect evidence and review quality, not child attainment.</p></div></header><div>{groupReadiness.map(g=><div key={g.group}><div><strong>{g.group}</strong><small>{g.ready} of {g.total} reports ready</small></div><span>{g.complete}%</span><div className="early-report-progress"><i style={{width:`${g.complete}%`}}/></div></div>)}</div></section>

    <section className="early-report-workspace">
      <article className="headteacher-card early-report-list"><header className="headteacher-section-head"><div><h3>Development report register</h3><p>Select a child to review the family-facing developmental summary.</p></div><div className="early-report-filters"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search child, educator or group..."/><select value={group} onChange={e=>setGroup(e.target.value)}><option>All groups</option><option>Nursery 1</option><option>Nursery 2</option><option>Reception A</option></select><select value={status} onChange={e=>setStatus(e.target.value)}><option>All statuses</option><option>Draft</option><option>Ready for review</option><option>Approved</option><option>Released</option></select></div></header>
        <div className="early-report-table"><div className="early-report-row heading"><span>Child</span><span>Group</span><span>Observations</span><span>Attendance</span><span>Status</span></div>{filtered.map(r=><button className={`early-report-row ${selected.id===r.id?"selected":""}`} key={r.id} onClick={()=>{setSelectedId(r.id);setNotice("")}}><div><strong>{r.child}</strong><small>{r.childId} · {r.educator}</small></div><span>{r.group}</span><b>{r.observations}%</b><b>{r.attendance}%</b><em className={r.status.toLowerCase().replaceAll(" ","-")}>{r.status}</em></button>)}</div>
      </article>

      <aside className="headteacher-card early-report-review"><span className="headteacher-kicker">HEAD TEACHER REVIEW</span><h2>{selected.child}</h2><p>{selected.group} · {selected.age} · {selected.educator}</p><div className="early-report-review-grid"><div><span>Attendance</span><strong>{selected.attendance}%</strong></div><div><span>Observation coverage</span><strong>{selected.observations}%</strong></div><div><span>Status</span><strong>{selected.status}</strong></div></div>
        <div className="early-report-domain-list">{domains.map(([label,value])=><div key={label}><strong>{label}</strong><em className={value.toLowerCase()}>{value}</em></div>)}</div>
        <div className="early-report-review-actions"><button onClick={()=>move("Draft")}>Return to draft</button><button onClick={()=>move("Approved")}>Approve</button><button onClick={()=>move("Released")}>Mark released</button></div>{notice&&<p className="early-report-notice">{notice}</p>}
        <small>Prototype only: status changes are local and no guardian notification is sent.</small>
      </aside>
    </section>

    <section className="headteacher-card early-report-preview-wrap"><header className="headteacher-section-head no-print"><div><h3>Guardian-facing report preview</h3><p>Official school identity remains proprietor-managed and read-only in this workspace.</p></div><button onClick={()=>window.print()}>Print / Save as PDF</button></header>
      <article className="early-report-paper">
        <header className="early-report-letterhead"><div className="early-report-logo">{schoolProfile.logoText}</div><div><h2>{schoolProfile.name}</h2><p>{schoolProfile.motto}</p><small>{schoolProfile.address} · {schoolProfile.phone} · {schoolProfile.email}</small><small>{schoolProfile.registration}</small></div></header>
        <div className="early-report-title"><span>EARLY YEARS DEVELOPMENT REPORT</span><h1>{selected.child}</h1><p>{selected.group} · {selected.age} · Term Development Summary</p></div>
        <div className="early-report-meta"><div><span>Child ID</span><strong>{selected.childId}</strong></div><div><span>Lead educator</span><strong>{selected.educator}</strong></div><div><span>Attendance</span><strong>{selected.attendance}%</strong></div><div><span>Observation coverage</span><strong>{selected.observations}%</strong></div></div>
        <section className="early-report-paper-section"><h3>Developmental summary</h3><div className="early-report-domain-paper">{domains.map(([label,value])=><div key={label}><span>{label}</span><strong className={value.toLowerCase()}>{value}</strong></div>)}</div></section>
        <section className="early-report-paper-section"><h3>Educator comment</h3><p>{selected.educatorComment}</p></section>
        <section className="early-report-paper-section"><h3>Next learning opportunities</h3><ul>{selected.nextSteps.map(step=><li key={step}>{step}</li>)}</ul></section>
        <section className="early-report-paper-section"><h3>Head Teacher comment</h3><p>{selected.headTeacherComment}</p></section>
        <footer className="early-report-signatures"><div><span>Lead Educator</span><strong>{selected.educator}</strong></div><div><span>Head Teacher</span><strong>Mrs. Mary Daniel</strong></div><div><span>Report Status</span><strong>{selected.status}</strong></div></footer>
        <p className="early-report-footer">This Early Years report summarizes observed developmental learning over time. It is not a diagnostic assessment, examination result or child ranking.</p>
      </article>
    </section>

    <section className="headteacher-card early-report-boundary"><span className="headteacher-kicker">EARLY YEARS REPORTING RULE</span><h3>Describe development; do not label the child</h3><p>Reports should use repeated observations, routines and educator evidence to describe current developmental patterns and next opportunities. The UI should not create permanent ability labels, diagnoses, class positions or high-stakes decisions from Early Years developmental summaries.</p></section>
  </main>
}
