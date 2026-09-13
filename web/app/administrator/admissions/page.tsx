"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Stage="New"|"Documents"|"Screening"|"Offer"|"Accepted"|"Registered";
const applicants=[
 {ref:"BGA-ADM-26094",name:"Aisha Sani",section:"Primary",className:"Primary 2",guardian:"Alhaji Sani Ibrahim",phone:"0803 100 2401",stage:"Documents" as Stage,submitted:"13 Sep"},
 {ref:"BGA-ADM-26093",name:"Muhammad Kabir",section:"Secondary",className:"JSS 1",guardian:"Hajiya Amina Kabir",phone:"0806 221 1480",stage:"Screening" as Stage,submitted:"13 Sep"},
 {ref:"BGA-ADM-26091",name:"Zainab Aliyu",section:"Nursery",className:"Nursery 2",guardian:"Alhaji Aliyu Sani",phone:"0812 334 0192",stage:"Offer" as Stage,submitted:"12 Sep"},
 {ref:"BGA-ADM-26088",name:"Umar Faruq",section:"Primary",className:"Primary 4",guardian:"Hajiya Maryam Umar",phone:"0703 518 9941",stage:"Accepted" as Stage,submitted:"11 Sep"},
 {ref:"BGA-ADM-26082",name:"Fatima Musa",section:"Secondary",className:"JSS 2",guardian:"Alhaji Musa Bello",phone:"0805 292 4118",stage:"Registered" as Stage,submitted:"09 Sep"},
];
const stages:Stage[]=["New","Documents","Screening","Offer","Accepted","Registered"];

export default function AdmissionsPipelinePage(){
 const [filter,setFilter]=useState<"All"|Stage>("All");
 const [selected,setSelected]=useState(applicants[0].ref);
 const current=applicants.find(a=>a.ref===selected)??applicants[0];
 const rows=useMemo(()=>filter==="All"?applicants:applicants.filter(a=>a.stage===filter),[filter]);
 return <main className="admin-page">
  <header className="admin-page-head"><div><span>ADMINISTRATION · ADMISSIONS</span><h1>Admissions Pipeline</h1><p>Manage online applications from the school website through document review, screening, offer and final registration.</p></div><div className="admin-head-actions"><Link href="/admissions">Open public website</Link><Link href="/administrator/registration" className="primary">Register accepted child</Link></div></header>
  <section className="admin-kpis"><article><span>Applications</span><strong>131</strong><small>Current admission cycle</small></article><article><span>Awaiting documents</span><strong>17</strong><small>Parent follow-up</small></article><article><span>Screening queue</span><strong>24</strong><small>Assessment/interview</small></article><article><span>Offers issued</span><strong>100</strong><small>Across all sections</small></article><article><span>Accepted</span><strong>79</strong><small>Ready for registration</small></article></section>
  <section className="admin-card"><header><div><h2>Application stages</h2><p>Each online application moves through a controlled admissions journey.</p></div></header><div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{(["All",...stages] as const).map(s=><button key={s} onClick={()=>setFilter(s)} className={filter===s?"admin-filter active":"admin-filter"}>{s}</button>)}</div></section>
  <section className="admin-grid two"><article className="admin-card"><header><div><h2>Applicant queue</h2><p>{rows.length} sample applications shown</p></div></header><div className="admin-list">{rows.map(a=><button key={a.ref} onClick={()=>setSelected(a.ref)} style={{textAlign:"left",width:"100%",background:selected===a.ref?"#f2f8f6":"#fff",border:"1px solid #e5ebee",borderRadius:10,padding:10}}><strong>{a.name}</strong><span>{a.ref} · {a.section} · {a.className}</span><small>{a.guardian} · {a.phone} · {a.stage}</small></button>)}</div></article>
   <article className="admin-card"><header><div><h2>{current.name}</h2><p>{current.ref} · submitted {current.submitted}</p></div><span>{current.stage}</span></header><div className="admin-info-grid"><div><span>Applying for</span><strong>{current.section} · {current.className}</strong></div><div><span>Guardian</span><strong>{current.guardian}</strong></div><div><span>Phone</span><strong>{current.phone}</strong></div><div><span>Source</span><strong>School website</strong></div></div><div className="admin-list" style={{marginTop:12}}><div><strong>Birth certificate</strong><span>Received</span></div><div><strong>Previous school report</strong><span>{current.stage==="Documents"?"Pending":"Received"}</span></div><div><strong>Guardian ID</strong><span>Received</span></div></div><div className="admin-head-actions" style={{marginTop:14}}><button>Request document</button><button>Schedule screening</button><button>Issue offer</button><Link className="primary" href="/administrator/registration">Proceed to registration</Link></div></article>
  </section>
  <section className="admin-callout"><strong>Admissions boundary</strong><p>Online application creates an applicant record only. A child becomes an active student after the school completes registration, guardian linking, class placement and finance setup.</p></section>
 </main>
}
