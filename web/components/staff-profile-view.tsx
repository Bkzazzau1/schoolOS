"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./staff-profile.module.css";

type RoleContext = "principal" | "headmaster";
type Tab = "overview" | "employment" | "qualifications" | "assignments" | "attendance" | "leave" | "documents" | "timeline" | "notes" | "payroll-boundary";

type StaffRecord = {
  id: string;
  payrollId: string;
  name: string;
  section: "Secondary" | "Primary";
  campus: string;
  jobTitle: string;
  department: string;
  employmentType: string;
  employmentStatus: string;
  hireDate: string;
  qualification: string;
  professionalId: string;
  phone: string;
  email: string;
  nextOfKin: string;
  emergencyPhone: string;
  attendance: number;
  punctuality: number;
  weeklyPeriods: number;
  workload: string;
  classResponsibility: string;
  subjects: string[];
  assignments: { className: string; subject: string; periods: number; role: string }[];
  leave: { type: string; dates: string; days: number; status: string }[];
  documents: { name: string; status: string; visibility: string }[];
  timeline: { date: string; title: string; detail: string }[];
  supportNote: string;
};

const secondary: Record<string, StaffRecord> = {
  "TCH-001": { id:"TCH-2048", payrollId:"PAY-BGA-2048", name:"Mrs. Amina Yusuf", section:"Secondary", campus:"Kaduna Campus", jobTitle:"Mathematics Teacher", department:"Mathematics", employmentType:"Full-time · Permanent", employmentStatus:"Active", hireDate:"15 January 2022", qualification:"B.Ed Mathematics", professionalId:"TRCN-MOCK-2048", phone:"+234 800 000 0000", email:"amina.yusuf@example.edu", nextOfKin:"Alhaji Yusuf Ibrahim", emergencyPhone:"+234 800 000 0101", attendance:98, punctuality:96, weeklyPeriods:28, workload:"Heavy", classResponsibility:"Subject teacher", subjects:["Mathematics","Further Mathematics"], assignments:[{className:"JSS 2A",subject:"Mathematics",periods:7,role:"Subject teacher"},{className:"JSS 2B",subject:"Mathematics",periods:7,role:"Subject teacher"},{className:"JSS 3A",subject:"Mathematics",periods:7,role:"Subject teacher"},{className:"SS 1A",subject:"Further Mathematics",periods:7,role:"Subject teacher"}], leave:[{type:"Annual leave",dates:"12–13 Aug 2026",days:2,status:"Approved"},{type:"Personal leave",dates:"3 Jun 2026",days:1,status:"Approved"}], documents:[{name:"B.Ed certificate",status:"Verified",visibility:"HR + authorized leadership"},{name:"TRCN record",status:"Verified",visibility:"HR + authorized leadership"},{name:"Employment letter",status:"Current",visibility:"HR + authorized leadership"}], timeline:[{date:"Sep 2026",title:"Teaching load reviewed",detail:"JSS 2B syllabus pace flagged for support follow-up."},{date:"Aug 2026",title:"Annual leave",detail:"Two days approved and recorded."},{date:"May 2026",title:"Professional development",detail:"Completed classroom assessment workshop."}], supportNote:"Strong attendance and lesson planning. JSS 2B syllabus pace needs supportive follow-up." },
  "TCH-002": { id:"TCH-2051", payrollId:"PAY-BGA-2051", name:"Mr. Ahmad Sani", section:"Secondary", campus:"Kaduna Campus", jobTitle:"Mathematics Teacher", department:"Mathematics", employmentType:"Full-time · Permanent", employmentStatus:"Active", hireDate:"3 September 2021", qualification:"B.Sc Ed Mathematics", professionalId:"TRCN-MOCK-2051", phone:"+234 800 000 0051", email:"ahmad.sani@example.edu", nextOfKin:"Hajiya Maryam Sani", emergencyPhone:"+234 800 000 0151", attendance:97, punctuality:94, weeklyPeriods:22, workload:"Balanced", classResponsibility:"Subject teacher", subjects:["Mathematics"], assignments:[{className:"JSS 1A",subject:"Mathematics",periods:7,role:"Subject teacher"},{className:"JSS 1B",subject:"Mathematics",periods:7,role:"Subject teacher"},{className:"SS 2A",subject:"Mathematics",periods:8,role:"Subject teacher"}], leave:[{type:"Annual leave",dates:"21 Aug 2026",days:1,status:"Approved"}], documents:[{name:"Degree certificate",status:"Verified",visibility:"HR + authorized leadership"},{name:"Employment letter",status:"Current",visibility:"HR + authorized leadership"}], timeline:[{date:"Sep 2026",title:"Assessment review",detail:"Assessment completion remains strong."}], supportNote:"Consistent assessment completion and syllabus progress." },
  "TCH-003": { id:"TCH-2057", payrollId:"PAY-BGA-2057", name:"Mrs. Fatima Bello", section:"Secondary", campus:"Kaduna Campus", jobTitle:"English Language Teacher", department:"Languages", employmentType:"Full-time · Permanent", employmentStatus:"Active", hireDate:"8 February 2023", qualification:"B.A Ed English", professionalId:"TRCN-MOCK-2057", phone:"+234 800 000 0057", email:"fatima.bello@example.edu", nextOfKin:"Alhaji Bello Musa", emergencyPhone:"+234 800 000 0157", attendance:95, punctuality:91, weeklyPeriods:30, workload:"Heavy", classResponsibility:"Subject teacher", subjects:["English Language"], assignments:[{className:"JSS 1A",subject:"English Language",periods:6,role:"Subject teacher"},{className:"JSS 2A",subject:"English Language",periods:6,role:"Subject teacher"},{className:"JSS 3A",subject:"English Language",periods:6,role:"Subject teacher"},{className:"SS 1A",subject:"English Language",periods:6,role:"Subject teacher"},{className:"SS 2A",subject:"English Language",periods:6,role:"Subject teacher"}], leave:[], documents:[{name:"Degree certificate",status:"Verified",visibility:"HR + authorized leadership"},{name:"TRCN record",status:"Verified",visibility:"HR + authorized leadership"}], timeline:[{date:"Sep 2026",title:"Workload review",detail:"Marking volume and report preparation reviewed."}], supportNote:"High workload. Monitor marking volume and report-card preparation." },
  "TCH-004": { id:"TCH-2064", payrollId:"PAY-BGA-2064", name:"Mr. Bashir Musa", section:"Secondary", campus:"Kaduna Campus", jobTitle:"Science Teacher", department:"Science", employmentType:"Full-time · Permanent", employmentStatus:"Active", hireDate:"10 October 2020", qualification:"B.Sc Ed Physics", professionalId:"TRCN-MOCK-2064", phone:"+234 800 000 0064", email:"bashir.musa@example.edu", nextOfKin:"Hajiya Aisha Musa", emergencyPhone:"+234 800 000 0164", attendance:89, punctuality:84, weeklyPeriods:24, workload:"Balanced", classResponsibility:"Subject teacher", subjects:["Basic Science","Physics"], assignments:[{className:"JSS 2B",subject:"Basic Science",periods:8,role:"Subject teacher"},{className:"SS 1A",subject:"Physics",periods:8,role:"Subject teacher"},{className:"SS 2A",subject:"Physics",periods:8,role:"Subject teacher"}], leave:[{type:"Medical leave",dates:"4 Jul 2026",days:1,status:"Approved"}], documents:[{name:"Degree certificate",status:"Verified",visibility:"HR + authorized leadership"}], timeline:[{date:"Sep 2026",title:"Support conversation requested",detail:"Punctuality and assessment completion need contextual review."}], supportNote:"Repeated lateness and lower assessment completion. Schedule a supportive conversation before drawing conclusions." },
  "TCH-005": { id:"TCH-2070", payrollId:"PAY-BGA-2070", name:"Mrs. Hauwa Sani", section:"Secondary", campus:"Kaduna Campus", jobTitle:"Humanities Teacher", department:"Humanities", employmentType:"Full-time · Permanent", employmentStatus:"Active", hireDate:"17 April 2021", qualification:"B.Ed Social Studies", professionalId:"TRCN-MOCK-2070", phone:"+234 800 000 0070", email:"hauwa.sani@example.edu", nextOfKin:"Alhaji Sani Umar", emergencyPhone:"+234 800 000 0170", attendance:99, punctuality:98, weeklyPeriods:18, workload:"Light", classResponsibility:"Subject teacher", subjects:["Social Studies","Civic Education"], assignments:[{className:"JSS 1A",subject:"Social Studies",periods:6,role:"Subject teacher"},{className:"JSS 2A",subject:"Civic Education",periods:6,role:"Subject teacher"},{className:"JSS 3A",subject:"Social Studies",periods:6,role:"Subject teacher"}], leave:[], documents:[{name:"Degree certificate",status:"Verified",visibility:"HR + authorized leadership"}], timeline:[{date:"Sep 2026",title:"Mentoring capacity noted",detail:"Strong current operational indicators; possible peer-support role."}], supportNote:"Strong current teaching indicators. Consider optional mentoring support, not extra workload by default." }
};

const primaryNames: Record<string, [string,string,string,string,number,number,string]> = {
  "PRI-T01":["Mrs. Zainab Musa","Primary 1 Class Teacher","Primary","B.Ed Primary Education",98,22,"Strong class routines and literacy follow-up."],
  "PRI-T02":["Mr. Ahmad Yusuf","Primary 4 Class Teacher","Primary","B.Ed Mathematics",96,24,"Good numeracy delivery; review workload before adding periods."],
  "PRI-T03":["Mrs. Khadija Musa","Primary 3 Class Teacher","Primary","B.Ed English Education",91,21,"Primary 3 needs supportive literacy and attendance review."],
  "PRI-T04":["Mr. Kabiru Lawal","Primary 5 Class Teacher","Primary","B.Ed Basic Science",95,23,"Steady science and assessment delivery."],
  "PRI-T05":["Mrs. Safiya Ahmad","Primary 2 Class Teacher","Primary","B.Ed Social Studies",99,18,"Strong planning and pupil-support follow-up."],
  "PRI-T06":["Mr. Musa Bello","Subject Specialist","Primary","B.Ed Mathematics",94,20,"Specialist teacher with limited additional capacity."],
  "PRI-T07":["Mrs. Halima Sani","Subject Specialist","Primary","B.Ed Computer Education",97,16,"Light current load; review before assigning additional specialist periods."]
};

function primaryRecord(id:string):StaffRecord {
  const row=primaryNames[id]??primaryNames["PRI-T01"];
  return { id, payrollId:`PAY-BGA-${id.replace(/\D/g,"") || "P01"}`, name:row[0], section:"Primary", campus:"Kaduna Campus", jobTitle:row[1], department:"Primary School", employmentType:"Full-time · Permanent", employmentStatus:"Active", hireDate:"September 2022", qualification:row[3], professionalId:`TRCN-MOCK-${id}`, phone:"+234 800 100 0000", email:`${row[0].replace(/Mrs\.|Mr\./g,"").trim().toLowerCase().replaceAll(" ",".")}@example.edu`, nextOfKin:"Authorized family contact on HR record", emergencyPhone:"+234 800 100 0100", attendance:row[4], punctuality:Math.max(80,row[4]-2), weeklyPeriods:row[5], workload:row[5]>=24?"Heavy":row[5]<=18?"Light":"Balanced", classResponsibility:row[1], subjects:["Primary curriculum"], assignments:[{className:row[1].includes("Primary")?row[1].split(" Class")[0]:"Multiple Primary classes",subject:"Primary curriculum",periods:row[5],role:row[1]}], leave:[{type:"Annual leave",dates:"Recorded in HR",days:2,status:"Approved"}], documents:[{name:"Qualification certificate",status:"Verified",visibility:"HR + authorized leadership"},{name:"Employment letter",status:"Current",visibility:"HR + authorized leadership"}], timeline:[{date:"Sep 2026",title:"Workload reviewed",detail:"Primary responsibility and current periods reviewed."}], supportNote:row[6] };
}

const tabs:{key:Tab;label:string}[]=[{key:"overview",label:"Overview"},{key:"employment",label:"Employment"},{key:"qualifications",label:"Qualifications"},{key:"assignments",label:"Teaching Load"},{key:"attendance",label:"Attendance"},{key:"leave",label:"Leave"},{key:"documents",label:"Documents"},{key:"timeline",label:"Timeline"},{key:"notes",label:"Leadership Notes"},{key:"payroll-boundary",label:"Payroll Access"}];

export default function StaffProfileView({staffId,role}:{staffId:string;role:RoleContext}){
  const [tab,setTab]=useState<Tab>("overview");
  const [note,setNote]=useState("");
  const [saved,setSaved]=useState(false);
  const record=role==="principal"?(secondary[staffId]??secondary["TCH-001"]):primaryRecord(staffId);
  const back=role==="principal"?"/principal/teachers":"/headmaster/teachers";
  const message=role==="principal"?"/principal/communication":"/headmaster/communication";
  const assignments=role==="principal"?"/principal/assignments":"/headmaster/assignments";
  const initials=record.name.replace(/Mrs\.|Mr\./g,"").trim().split(" ").map(x=>x[0]).join("").slice(0,2);
  const documentCount=useMemo(()=>record.documents.length,[record.documents.length]);

  return <main className={styles.page}>
    <header className={styles.top}><div><span>{role==="principal"?"PRINCIPAL · SECONDARY":"HEADMISTRESS · PRIMARY"} · STAFF PROFILE</span><h1>{record.name}</h1><p>{record.jobTitle} · {record.campus}</p></div><div className={styles.actions}><Link href={back}>← Back to teachers</Link><Link href={message}>Message teacher</Link></div></header>
    <section className={styles.hero}><div className={styles.avatar}>{initials}</div><div><span>{record.id} · {record.payrollId}</span><h2>{record.name}</h2><p>{record.department} · {record.employmentType}</p><div className={styles.chips}><em>{record.employmentStatus}</em><em>{record.workload} workload</em><em>{record.section}</em></div></div><div className={styles.metrics}><article><span>Attendance</span><strong>{record.attendance}%</strong></article><article><span>Punctuality</span><strong>{record.punctuality}%</strong></article><article><span>Weekly periods</span><strong>{record.weeklyPeriods}</strong></article></div></section>
    <nav className={styles.tabs}>{tabs.map(item=><button key={item.key} className={tab===item.key?styles.active:""} onClick={()=>setTab(item.key)}>{item.label}</button>)}</nav>
    <section className={styles.layout}><div className={styles.card}>
      {tab==="overview"&&<><Heading title="Staff overview" copy="Employment and teaching context available to section leadership."/><div className={styles.grid}><Info label="Staff ID" value={record.id}/><Info label="Payroll status" value="Active · detail restricted"/><Info label="Department" value={record.department}/><Info label="Job title" value={record.jobTitle}/><Info label="Hire date" value={record.hireDate}/><Info label="Employment" value={record.employmentType}/></div><div className={styles.note}><span>Leadership support note</span><strong>{record.supportNote}</strong></div><div className={styles.boundary}>This view intentionally excludes salary amount, bank account, deductions, staff-loan balances and payslip detail. Those belong to the staff member and authorized HR/finance roles.</div></>}
      {tab==="employment"&&<><Heading title="Employment record" copy="Core HR context visible to authorized section leadership."/><div className={styles.grid}><Info label="Status" value={record.employmentStatus}/><Info label="Hire date" value={record.hireDate}/><Info label="Phone" value={record.phone}/><Info label="Email" value={record.email}/><Info label="Next of kin" value={record.nextOfKin}/><Info label="Emergency contact" value={record.emergencyPhone}/></div></>}
      {tab==="qualifications"&&<><Heading title="Qualifications & professional standing" copy="Use verified evidence rather than assumptions about teaching quality."/><div className={styles.list}><Row title={record.qualification} copy="Primary qualification" end="Verified"/><Row title={record.professionalId} copy="Professional registration reference · mock" end="Verified"/><Row title="Professional development record" copy="School training and CPD history" end="Available"/></div></>}
      {tab==="assignments"&&<><Heading title="Teaching load" copy="Section responsibilities and weekly periods."/><div className={styles.list}>{record.assignments.map(a=><Row key={`${a.className}-${a.subject}`} title={`${a.className} · ${a.subject}`} copy={`${a.periods} periods/week`} end={a.role}/>)}</div><Link className={styles.inline} href={assignments}>Open Teaching Assignments</Link></>}
      {tab==="attendance"&&<><Heading title="Attendance context" copy="Operational evidence for supportive management, not an automatic employment score."/><div className={styles.metricGrid}><Info label="Attendance" value={`${record.attendance}%`}/><Info label="Punctuality" value={`${record.punctuality}%`}/><Info label="Current workload" value={record.workload}/><Info label="Weekly periods" value={String(record.weeklyPeriods)}/></div><div className={styles.boundary}>Attendance should be reviewed with approved leave, timetable and context before any employment decision.</div></>}
      {tab==="leave"&&<><Heading title="Leave record" copy="Approved leave remains distinct from attendance concerns."/><div className={styles.list}>{record.leave.length?record.leave.map(x=><Row key={`${x.type}-${x.dates}`} title={x.type} copy={`${x.dates} · ${x.days} day(s)`} end={x.status}/>):<p className={styles.empty}>No leave entries in this mock record.</p>}</div></>}
      {tab==="documents"&&<><Heading title="Staff documents" copy="Labels only in this UI prototype; no real files are stored here."/><div className={styles.list}>{record.documents.map(d=><Row key={d.name} title={d.name} copy={d.visibility} end={d.status}/>)}</div></>}
      {tab==="timeline"&&<><Heading title="Staff timeline" copy="Auditable employment, support and professional-development events."/><div className={styles.timeline}>{record.timeline.map(t=><div key={`${t.date}-${t.title}`}><time>{t.date}</time><section><strong>{t.title}</strong><p>{t.detail}</p></section></div>)}</div></>}
      {tab==="notes"&&<><Heading title="Private leadership notes" copy="Support/coaching notes are not automatically visible to the teacher or other roles."/><textarea className={styles.textarea} value={note} onChange={e=>{setNote(e.target.value);setSaved(false)}} placeholder="Add factual support, observation or follow-up context..."/><button className={styles.save} onClick={()=>setSaved(true)}>{saved?"Saved locally":"Save prototype note"}</button><div className={styles.boundary}>Do not use AI or a single metric to make firing, promotion, pay or disciplinary decisions automatically.</div></>}
      {tab==="payroll-boundary"&&<><Heading title="Payroll & staff-finance boundary" copy="Leadership can see whether payroll records exist, not confidential amounts by default."/><div className={styles.grid}><Info label="Payroll record" value="Active"/><Info label="Payslips" value="Available to staff + payroll"/><Info label="Salary amount" value="Restricted"/><Info label="Bank account" value="Restricted"/><Info label="Deductions" value="Restricted"/><Info label="Loans / advances" value="Restricted"/></div><div className={styles.boundary}>A future HR/Finance role may receive explicit permission to manage salary, deductions, staff loans, repayment history and payslips. Principal/Headmistress access should not imply automatic payroll authority.</div></>}
    </div><aside className={styles.side}><article><span>SECTION</span><strong>{record.section}</strong><p>{record.campus}</p></article><article><span>RESPONSIBILITY</span><strong>{record.classResponsibility}</strong><p>{record.subjects.join(" · ")}</p></article><article><span>DOCUMENTS</span><strong>{documentCount}</strong><p>Visible HR document labels</p></article><article><span>PRIVACY</span><p>Payroll amounts, bank details, deductions and loan balances remain outside ordinary academic-leadership access.</p></article></aside></section>
  </main>;
}

function Heading({title,copy}:{title:string;copy:string}){return <div className={styles.heading}><div><h3>{title}</h3><p>{copy}</p></div></div>}
function Info({label,value}:{label:string;value:string}){return <div><span>{label}</span><strong>{value}</strong></div>}
function Row({title,copy,end}:{title:string;copy:string;end:string}){return <div><div><strong>{title}</strong><small>{copy}</small></div><em>{end}</em></div>}
