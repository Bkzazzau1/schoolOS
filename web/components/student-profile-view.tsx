"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { schoolProfile } from "../lib/school-profile";
import styles from "./student-profile.module.css";

type RoleContext = "principal" | "headmaster" | "teacher";
type TabKey = "overview" | "academics" | "attendance" | "family" | "school-life" | "services" | "history" | "status" | "documents" | "timeline" | "notes";
type EnrollmentStatus = "Active" | "Transfer pending" | "Withdrawn" | "Alumni";
type EmergencyContact = { name: string; relationship: string; channel: string; priority: string };
type HistoryRow = { session: string; className: string; outcome: string; note: string };
type Sibling = { id: string; name: string; className: string; section: string; status: string };

type StudentRecord = {
  id: string;
  admissionNo: string;
  name: string;
  className: string;
  section: "Secondary" | "Primary";
  campus: string;
  status: string;
  enrollmentStatus: EnrollmentStatus;
  average: number;
  attendance: number;
  trend: number;
  classTeacher: string;
  guardian: string;
  guardianPhone: string;
  familyAccountId: string;
  admissionDate: string;
  dateOfBirth: string;
  gender: string;
  house: string;
  bloodGroup: string;
  genotype: string;
  medicalInstruction: string;
  emergencyContacts: EmergencyContact[];
  siblings: Sibling[];
  activities: string[];
  awards: string[];
  transport: string;
  meals: string;
  boarding: string;
  feeVisibility: string;
  previousSchool: string;
  promotionHistory: HistoryRow[];
  documents: { name: string; status: string; visibility: string }[];
  subjects: { name: string; score: number; trend: string }[];
  attendanceSummary: { label: string; value: string }[];
  timeline: { date: string; title: string; detail: string; visibility: string }[];
  attention: string;
};

const records: Record<string, StudentRecord> = {
  "STU-001": {
    id: "STU-001", admissionNo: "BGA/2023/SEC/001", name: "Maryam Abdullahi", className: "JSS 2A", section: "Secondary", campus: "Kaduna Campus", status: "Strong", enrollmentStatus: "Active", average: 86, attendance: 96, trend: 4.2,
    classTeacher: "Mrs. Amina Yusuf", guardian: "Alhaji Abdullahi Musa", guardianPhone: "+234 800 111 0001", familyAccountId: "FAM-ABD-0041", admissionDate: "12 Sep 2023", dateOfBirth: "14 Feb 2013", gender: "Female", house: "Blue House",
    bloodGroup: "O+", genotype: "AA", medicalInstruction: "No active school-day medical instruction in this mock record.",
    emergencyContacts: [{ name: "Hajiya Zainab Abdullahi", relationship: "Mother", channel: "+234 800 111 0101", priority: "Primary" }, { name: "Alhaji Abdullahi Musa", relationship: "Father", channel: "+234 800 111 0001", priority: "Secondary" }],
    siblings: [{ id: "PRI-006", name: "Ahmad Musa", className: "Primary 6", section: "Primary", status: "Active" }],
    activities: ["Chess Club", "Debate & Public Speaking"], awards: ["Excellent Attendance · Term 2", "Debate Team Recognition"], transport: "BUS-02 · Barnawa / Kakuri Route", meals: "Standard school menu", boarding: "Day student", feeVisibility: "Finance team + authorized guardian only", previousSchool: "Al-Hikmah Primary School, Kaduna",
    promotionHistory: [{ session: "2025/2026", className: "JSS 1A", outcome: "Promoted to JSS 2", note: "Normal progression" }, { session: "2024/2025", className: "Primary 6", outcome: "Completed", note: "Admission transition record" }],
    documents: [{ name: "Admission form", status: "Verified", visibility: "Leadership + Records" }, { name: "Birth record", status: "Verified", visibility: "Leadership + Records" }, { name: "Guardian consent", status: "Current", visibility: "Leadership + Guardian" }],
    subjects: [{ name: "Mathematics", score: 88, trend: "+3.0" }, { name: "English", score: 84, trend: "+2.1" }, { name: "Basic Science", score: 87, trend: "+5.2" }, { name: "Social Studies", score: 85, trend: "+4.0" }],
    attendanceSummary: [{ label: "Present", value: "96%" }, { label: "Late", value: "2" }, { label: "Excused", value: "1" }, { label: "Unexplained", value: "0" }],
    timeline: [{ date: "10 Sep", title: "Debate recognition", detail: "Recognized for contribution to inter-house debate preparation.", visibility: "School + Guardian" }, { date: "6 Sep", title: "Assessment completed", detail: "Basic Science assessment recorded at 87%.", visibility: "Teacher + Leadership + Guardian" }, { date: "2 Sep", title: "Attendance review", detail: "Attendance remained above section target.", visibility: "Leadership + Teacher" }],
    attention: "No current major concern. Continue normal academic and co-curricular support.",
  },
  "STU-003": {
    id: "STU-003", admissionNo: "BGA/2023/SEC/003", name: "Yusuf Bello", className: "JSS 2B", section: "Secondary", campus: "Kaduna Campus", status: "At risk", enrollmentStatus: "Active", average: 48, attendance: 79, trend: -8.4,
    classTeacher: "Mr. Sani Bello", guardian: "Alhaji Musa Bello", guardianPhone: "+234 800 111 0003", familyAccountId: "FAM-BEL-0087", admissionDate: "9 Sep 2023", dateOfBirth: "22 Jun 2012", gender: "Male", house: "Red House",
    bloodGroup: "A+", genotype: "AA", medicalInstruction: "Health details restricted. No diagnosis should be inferred from attendance or performance data.",
    emergencyContacts: [{ name: "Hajiya Rabi Musa", relationship: "Mother", channel: "+234 800 111 0301", priority: "Primary" }, { name: "Alhaji Musa Bello", relationship: "Father", channel: "+234 800 111 0003", priority: "Secondary" }],
    siblings: [{ id: "PRI-002", name: "Muhammad Kabir", className: "Primary 2", section: "Primary", status: "Active" }],
    activities: ["Football Academy"], awards: ["House Participation · Term 1"], transport: "No school transport", meals: "Standard school menu", boarding: "Day student", feeVisibility: "Finance team + authorized guardian only", previousSchool: "Darul Ilm Academy, Kaduna",
    promotionHistory: [{ session: "2025/2026", className: "JSS 1B", outcome: "Promoted to JSS 2", note: "Support plan continued" }, { session: "2024/2025", className: "Primary 6", outcome: "Completed", note: "Admission transition record" }],
    documents: [{ name: "Admission form", status: "Verified", visibility: "Leadership + Records" }, { name: "Birth record", status: "Verified", visibility: "Leadership + Records" }, { name: "Guardian contact record", status: "Current", visibility: "Leadership + Guardian" }],
    subjects: [{ name: "Mathematics", score: 42, trend: "-11.0" }, { name: "English", score: 51, trend: "-5.0" }, { name: "Basic Science", score: 46, trend: "-9.0" }, { name: "Social Studies", score: 53, trend: "-4.0" }],
    attendanceSummary: [{ label: "Present", value: "79%" }, { label: "Late", value: "5" }, { label: "Excused", value: "3" }, { label: "Unexplained", value: "6" }],
    timeline: [{ date: "12 Sep", title: "Guardian follow-up requested", detail: "Leadership requested coordinated attendance and learning follow-up.", visibility: "Leadership + Guardian" }, { date: "8 Sep", title: "Teacher intervention", detail: "Short Mathematics revision support plan started.", visibility: "Teacher + Leadership" }, { date: "4 Sep", title: "Attendance pattern reviewed", detail: "Repeated absences flagged for human follow-up; no family cause inferred.", visibility: "Leadership only" }],
    attention: "Attendance weakness and academic decline are appearing together. Review context with teacher and guardian before deciding next support action.",
  },
  "PRI-003": {
    id: "PRI-003", admissionNo: "BGA/2022/PRI/003", name: "Hafsa Abdullahi", className: "Primary 3", section: "Primary", campus: "Kaduna Campus", status: "Needs support", enrollmentStatus: "Active", average: 58, attendance: 82, trend: -6.8,
    classTeacher: "Mrs. Khadija Musa", guardian: "Alhaji Abdullahi Sani", guardianPhone: "+234 800 222 0003", familyAccountId: "FAM-ABD-0065", admissionDate: "11 Sep 2022", dateOfBirth: "7 Mar 2017", gender: "Female", house: "Green House",
    bloodGroup: "O+", genotype: "AA", medicalInstruction: "No active school-day medical instruction in this mock record.",
    emergencyContacts: [{ name: "Hajiya Fatima Abdullahi", relationship: "Mother", channel: "+234 800 222 0301", priority: "Primary" }, { name: "Alhaji Abdullahi Sani", relationship: "Father", channel: "+234 800 222 0003", priority: "Secondary" }],
    siblings: [{ id: "STU-005", name: "Abdullahi Umar", className: "SS 1A", section: "Secondary", status: "Active" }],
    activities: ["Reading Buddies", "Creative Arts"], awards: ["Kindness Recognition · Term 1"], transport: "BUS-01 · Zaria Road Route", meals: "Standard school menu", boarding: "Day pupil", feeVisibility: "Finance team + authorized guardian only", previousSchool: "BrightGate Nursery Section",
    promotionHistory: [{ session: "2025/2026", className: "Primary 2", outcome: "Promoted to Primary 3", note: "Continue reading support" }, { session: "2024/2025", className: "Primary 1", outcome: "Promoted to Primary 2", note: "Normal progression" }],
    documents: [{ name: "Admission form", status: "Verified", visibility: "Leadership + Records" }, { name: "Birth record", status: "Verified", visibility: "Leadership + Records" }, { name: "Pickup authorization", status: "Current", visibility: "Leadership + Guardian" }],
    subjects: [{ name: "Literacy", score: 54, trend: "-8.0" }, { name: "Numeracy", score: 61, trend: "-3.0" }, { name: "Basic Science", score: 60, trend: "-4.0" }, { name: "Creative Arts", score: 78, trend: "+2.0" }],
    attendanceSummary: [{ label: "Present", value: "82%" }, { label: "Late", value: "4" }, { label: "Excused", value: "2" }, { label: "Unexplained", value: "4" }],
    timeline: [{ date: "11 Sep", title: "Reading support review", detail: "Class teacher recommended continued guided reading practice.", visibility: "Teacher + Leadership + Guardian" }, { date: "7 Sep", title: "Attendance follow-up", detail: "Headmistress requested guardian conversation about attendance pattern.", visibility: "Leadership + Guardian" }, { date: "3 Sep", title: "Creative activity", detail: "Strong participation recorded during class creative work.", visibility: "Teacher + Guardian" }],
    attention: "Reading progress and attendance both need supportive follow-up. Avoid permanent ability labels; review evidence over multiple cycles.",
  },
};

type DirectorySummary = Pick<StudentRecord, "name" | "className" | "status" | "average" | "attendance" | "trend" | "classTeacher" | "guardian" | "attention">;
const directorySummaries: Record<string, DirectorySummary> = {
  "STU-002": { name: "Ibrahim Sani", className: "JSS 2A", status: "Watch", average: 61, attendance: 88, trend: -3.1, classTeacher: "Mrs. Amina Yusuf", guardian: "Alhaji Sani Ibrahim", attention: "Recent Mathematics decline needs review across more than one assessment before changing support." },
  "STU-004": { name: "Fatima Musa", className: "JSS 3A", status: "Strong", average: 91, attendance: 98, trend: 6.0, classTeacher: "Mrs. Zainab Lawal", guardian: "Hajiya Aisha Musa", attention: "Strong current academic and attendance evidence. Continue normal support and enrichment." },
  "STU-005": { name: "Abdullahi Umar", className: "SS 1A", status: "Stable", average: 68, attendance: 91, trend: -1.9, classTeacher: "Mr. Umar Faruq", guardian: "Alhaji Umar Abdullahi", attention: "Overall stable; Physics and Further Mathematics need routine subject-level review." },
  "STU-006": { name: "Zainab Aliyu", className: "SS 2A", status: "Stable", average: 74, attendance: 93, trend: 2.1, classTeacher: "Mrs. Hauwa Sani", guardian: "Alhaji Aliyu Ibrahim", attention: "No major concern. Continue normal academic monitoring." },
  "PRI-001": { name: "Aisha Ibrahim", className: "Primary 1", status: "Strong", average: 82, attendance: 97, trend: 5.2, classTeacher: "Mrs. Zainab Musa", guardian: "Hajiya Maryam Ibrahim", attention: "No current learning-support action required." },
  "PRI-002": { name: "Muhammad Kabir", className: "Primary 2", status: "Stable", average: 70, attendance: 93, trend: 1.4, classTeacher: "Mrs. Safiya Ahmad", guardian: "Alhaji Kabir Muhammad", attention: "Continue routine numeracy reinforcement and monitor the next learning cycle." },
  "PRI-004": { name: "Umar Faruq", className: "Primary 4", status: "Strong", average: 81, attendance: 95, trend: 3.7, classTeacher: "Mr. Bashir Ahmad", guardian: "Alhaji Ahmad Faruq", attention: "No current learning-support action required." },
  "PRI-005": { name: "Khadija Sani", className: "Primary 5", status: "Watch", average: 71, attendance: 90, trend: -2.1, classTeacher: "Mr. Kabiru Lawal", guardian: "Hajiya Rukayya Sani", attention: "Monitor literacy trend over the next two assessments before changing support." },
  "PRI-006": { name: "Ahmad Musa", className: "Primary 6", status: "Stable", average: 80, attendance: 94, trend: 2.9, classTeacher: "Unassigned class teacher", guardian: "Alhaji Musa Ahmad", attention: "Academic progress is stable; class-teacher assignment remains an operational gap." },
};

const idAliases: Record<string, string> = { "STU-J2A-001": "STU-001", "STU-J2A-002": "STU-002", "STU-J2B-001": "STU-003", "STU-J3A-001": "STU-004", "STU-S1A-001": "STU-005" };

function generatedAdmissionNo(id: string, primary: boolean) {
  const digits = id.replace(/\D/g, "").padStart(3, "0").slice(-3);
  return `BGA/2026/${primary ? "PRI" : "SEC"}/${digits}`;
}

function makeGeneratedRecord(id: string, summary: DirectorySummary): StudentRecord {
  const primary = id.startsWith("PRI-");
  const base = primary ? records["PRI-003"] : records["STU-001"];
  const score = Math.max(35, Math.min(96, Math.round(summary.average)));
  return {
    ...base, id, admissionNo: generatedAdmissionNo(id, primary), name: summary.name, className: summary.className, section: primary ? "Primary" : "Secondary", status: summary.status, average: summary.average, attendance: summary.attendance, trend: summary.trend, classTeacher: summary.classTeacher, guardian: summary.guardian,
    familyAccountId: `FAM-${summary.guardian.replace(/[^A-Za-z]/g, "").slice(-3).toUpperCase()}-${id.replace(/\D/g, "").padStart(4, "0")}`,
    guardianPhone: primary ? "+234 800 222 0000" : "+234 800 111 0000", emergencyContacts: [{ name: summary.guardian, relationship: "Authorized guardian", channel: primary ? "+234 800 222 0000" : "+234 800 111 0000", priority: "Primary" }],
    siblings: [], activities: primary ? ["Creative Arts", "Reading / Games programme"] : ["School activity participation"], awards: summary.status === "Strong" ? ["Positive contribution recognition"] : [], transport: "Service relationship not configured in this sample", house: primary ? "Blue House" : "Green House", previousSchool: primary ? "Previous Early Years / Primary record" : "Previous-school record available to authorized admissions staff",
    promotionHistory: [{ session: "2025/2026", className: "Previous class", outcome: `Progressed to ${summary.className}`, note: "Representative mock progression record" }], feeVisibility: "Finance team + authorized guardian only",
    subjects: primary ? [{ name: "Literacy", score: score - 3, trend: `${summary.trend}` }, { name: "Numeracy", score: score + 2, trend: `${summary.trend / 2}` }] : [{ name: "Mathematics", score: score - 4, trend: `${summary.trend}` }, { name: "English", score: score + 2, trend: `${summary.trend / 2}` }],
    attendanceSummary: [{ label: "Present", value: `${summary.attendance}%` }, { label: "Late", value: "—" }, { label: "Excused", value: "—" }, { label: "Unexplained", value: "—" }], timeline: [{ date: "Current term", title: "Profile summary", detail: "Representative student record generated from the directory mock for consistent profile navigation.", visibility: "Teacher + Leadership" }], attention: summary.attention,
  };
}

function resolveStudentRecord(studentId: string, role: RoleContext): StudentRecord {
  const canonicalId = idAliases[studentId] ?? studentId;
  const direct = records[canonicalId];
  const resolved = direct ?? (directorySummaries[canonicalId] ? makeGeneratedRecord(canonicalId, directorySummaries[canonicalId]) : records[role === "headmaster" ? "PRI-003" : "STU-003"]);
  return studentId === canonicalId ? resolved : { ...resolved, id: studentId };
}

const tabs: { key: TabKey; label: string }[] = [
  { key: "overview", label: "Overview" }, { key: "academics", label: "Academics" }, { key: "attendance", label: "Attendance" }, { key: "family", label: "Family" }, { key: "school-life", label: "School Life" }, { key: "services", label: "Services" }, { key: "history", label: "History" }, { key: "status", label: "Status & Promotion" }, { key: "documents", label: "Documents" }, { key: "timeline", label: "Timeline" }, { key: "notes", label: "Notes" },
];

const roleMeta: Record<RoleContext, { label: string; scope: string; back: string; note: string }> = {
  principal: { label: "Principal", scope: "Secondary leadership", back: "/principal/students", note: "Leadership view can see section-wide academic, attendance, intervention and approved administrative context." },
  headmaster: { label: "Headmistress", scope: "Primary leadership", back: "/headmaster/pupils", note: "Primary leadership view can see pupil learning, attendance, guardian and approved operational context." },
  teacher: { label: "Teacher", scope: "Assigned students only", back: "/teacher/students", note: "Teacher view is limited to assigned classes and professional teaching context. Administrative-only information stays out of scope." },
};

export default function StudentProfileView({ studentId, role }: { studentId: string; role: RoleContext }) {
  const [tab, setTab] = useState<TabKey>("overview");
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  const [enrollmentStatus, setEnrollmentStatus] = useState<EnrollmentStatus>("Active");
  const [nextClass, setNextClass] = useState("");
  const [workflowSaved, setWorkflowSaved] = useState(false);
  const base = resolveStudentRecord(studentId, role);
  const meta = roleMeta[role];
  const visibleDocuments = useMemo(() => role === "teacher" ? base.documents.filter((doc) => doc.visibility.includes("Guardian")) : base.documents, [base.documents, role]);
  const initials = base.name.split(" ").map((part) => part[0]).join("").slice(0, 2);
  const barcodeBars = base.admissionNo.replace(/[^0-9]/g, "").split("");

  return <main className={styles.page}>
    <header className={styles.topbar}>
      <div><span>{meta.label.toUpperCase()} · STUDENT PROFILE</span><h1>{base.name}</h1><p>{base.className} · {base.section} · {base.campus}</p></div>
      <div className={styles.actions}><Link href={meta.back}>← Back to directory</Link><button type="button" onClick={() => window.print()}>Print profile / ID</button><Link href={role === "teacher" ? "/teacher/messages" : role === "headmaster" ? "/headmaster/communication" : "/principal/communication"}>Contact guardian</Link></div>
    </header>

    <section className={styles.scope}><div><strong>{meta.scope}</strong><small>{meta.note}</small></div><span>{enrollmentStatus} · UI prototype</span></section>

    <section className={styles.hero}>
      <div className={styles.photo}><div>{initials}</div><small>Student photo</small></div>
      <div className={styles.identity}><span>{base.admissionNo}</span><h2>{base.name}</h2><p>{base.className} · {base.classTeacher}</p><div><em>{base.status}</em><em>{base.house}</em><em>{enrollmentStatus}</em></div></div>
      <div className={styles.heroMetrics}><div><span>Average</span><strong>{base.average}%</strong></div><div><span>Attendance</span><strong>{base.attendance}%</strong></div><div><span>Trend</span><strong className={base.trend < 0 ? styles.negative : styles.positive}>{base.trend > 0 ? "+" : ""}{base.trend}%</strong></div></div>
    </section>

    <nav className={styles.tabs}>{tabs.map((item) => <button key={item.key} onClick={() => setTab(item.key)} className={tab === item.key ? styles.activeTab : ""}>{item.label}</button>)}</nav>

    <section className={styles.layout}>
      <div className={styles.mainCard}>
        {tab === "overview" && <><div className={styles.sectionHead}><div><h3>Student overview</h3><p>Identity, admission and authorized school context in one record.</p></div></div><div className={styles.infoGrid}><div><span>Admission number</span><strong>{base.admissionNo}</strong></div><div><span>Internal ID</span><strong>{base.id}</strong></div><div><span>Date of birth</span><strong>{base.dateOfBirth}</strong></div><div><span>Admission date</span><strong>{base.admissionDate}</strong></div><div><span>Class</span><strong>{base.className}</strong></div><div><span>Class teacher</span><strong>{base.classTeacher}</strong></div></div><div className={styles.attention}><span>Current attention</span><strong>{base.attention}</strong></div><div className={styles.quickGrid}><div><span>Guardian</span><strong>{base.guardian}</strong><small>{role === "teacher" ? "Contact through SchoolOS messaging" : base.guardianPhone}</small></div><div><span>Family account</span><strong>{role === "teacher" ? "Restricted" : base.familyAccountId}</strong><small>Sibling and guardian linkage</small></div><div><span>Finance</span><strong>Restricted</strong><small>{base.feeVisibility}</small></div></div></>}

        {tab === "academics" && <><div className={styles.sectionHead}><div><h3>Academic profile</h3><p>Subject evidence and recent direction. This is not a permanent ability label.</p></div></div><div className={styles.subjectList}>{base.subjects.map((subject) => <div key={subject.name}><div><strong>{subject.name}</strong><small>Trend {subject.trend}%</small></div><span>{subject.score}%</span><i><b style={{width:`${subject.score}%`}} /></i></div>)}</div><div className={styles.boundary}>AI may summarize patterns and suggest review areas, but final academic judgement remains with teachers and authorized school leadership.</div></>}

        {tab === "attendance" && <><div className={styles.sectionHead}><div><h3>Attendance context</h3><p>Patterns can trigger supportive follow-up but should not be used to infer family circumstances.</p></div></div><div className={styles.metricGrid}>{base.attendanceSummary.map((item) => <div key={item.label}><span>{item.label}</span><strong>{item.value}</strong></div>)}</div><div className={styles.attention}><span>Human review rule</span><strong>Check reasons and school records before interpreting an attendance pattern. No neglect, health or family inference from attendance alone.</strong></div></>}

        {tab === "family" && <><div className={styles.sectionHead}><div><h3>Guardian, siblings & family account</h3><p>One guardian account may securely link multiple children without exposing unrelated family records.</p></div></div><div className={styles.familyHeader}><div><span>Family account</span><strong>{role === "teacher" ? "Restricted" : base.familyAccountId}</strong><small>{base.guardian}</small></div>{role !== "teacher" && <Link href="/finance">Open family finance</Link>}</div><div className={styles.contactList}>{base.emergencyContacts.map((contact) => <div key={`${contact.name}-${contact.priority}`}><div><strong>{contact.name}</strong><small>{contact.relationship} · {contact.priority}</small></div><span>{role === "teacher" ? "School contact workflow" : contact.channel}</span></div>)}</div><h4 className={styles.subTitle}>Linked children / siblings</h4><div className={styles.siblingGrid}>{base.siblings.length ? base.siblings.map((sibling) => <article key={sibling.id}><span>{sibling.id}</span><strong>{sibling.name}</strong><small>{sibling.className} · {sibling.section}</small><em>{sibling.status}</em></article>) : <div className={styles.empty}>No linked sibling in this mock family account.</div>}</div><div className={styles.boundary}>Family linking supports shared guardian access and consolidated billing, but each child still keeps a separate academic, welfare and attendance record.</div></>}

        {tab === "school-life" && <><div className={styles.sectionHead}><div><h3>School Life</h3><p>Activities, houses and recognition remain separate from academic grading.</p></div></div><div className={styles.split}><div><span>Activities</span>{base.activities.map((item) => <strong key={item}>{item}</strong>)}</div><div><span>Awards & recognition</span>{base.awards.length ? base.awards.map((item) => <strong key={item}>{item}</strong>) : <strong>No recognition record in this mock profile</strong>}</div></div></>}

        {tab === "services" && <><div className={styles.sectionHead}><div><h3>School services & health boundary</h3><p>Operational relationships and minimum-necessary safety information only.</p></div></div><div className={styles.serviceList}><div><span>Transport</span><strong>{base.transport}</strong></div><div><span>Meals & Cafeteria</span><strong>{base.meals}</strong></div><div><span>Boarding</span><strong>{base.boarding}</strong></div><div><span>Medical instruction</span><strong>{role === "teacher" ? "Only actionable school-day instruction when authorized" : base.medicalInstruction}</strong></div></div>{role !== "teacher" && <div className={styles.healthGrid}><div><span>Blood group</span><strong>{base.bloodGroup}</strong></div><div><span>Genotype</span><strong>{base.genotype}</strong></div><div><span>Health record</span><strong>Restricted</strong></div></div>}<div className={styles.boundary}>Medical information is not a general profile feature. Production access must be minimum-necessary and separately authorized.</div></>}

        {tab === "history" && <><div className={styles.sectionHead}><div><h3>Enrollment & promotion history</h3><p>Track progression without rewriting prior records.</p></div></div><div className={styles.historyLead}><span>Previous school</span><strong>{base.previousSchool}</strong></div><div className={styles.historyTable}>{base.promotionHistory.map((row) => <div key={`${row.session}-${row.className}`}><span>{row.session}</span><strong>{row.className}</strong><em>{row.outcome}</em><small>{row.note}</small></div>)}</div><div className={styles.boundary}>Transfers, withdrawals, repeats and promotions should remain auditable. Historical records should never be silently overwritten.</div></>}

        {tab === "status" && <><div className={styles.sectionHead}><div><h3>Status, transfer & class-change workflow</h3><p>Prototype controls for promotion, transfer, withdrawal and alumni lifecycle.</p></div></div>{role === "teacher" ? <div className={styles.boundary}>Teachers can view the current enrollment state but cannot change promotion, transfer, withdrawal or alumni status.</div> : <div className={styles.workflowGrid}><label>Enrollment status<select value={enrollmentStatus} onChange={(e) => { setEnrollmentStatus(e.target.value as EnrollmentStatus); setWorkflowSaved(false); }}><option>Active</option><option>Transfer pending</option><option>Withdrawn</option><option>Alumni</option></select></label><label>Next class / destination<input value={nextClass} onChange={(e) => { setNextClass(e.target.value); setWorkflowSaved(false); }} placeholder={base.section === "Primary" ? "e.g. Primary 4" : "e.g. JSS 3A"} /></label><label>Effective session<select defaultValue="2026/2027"><option>2026/2027</option><option>2027/2028</option></select></label><label>Action type<select defaultValue="Promote"><option>Promote</option><option>Move class</option><option>Transfer out</option><option>Withdraw</option><option>Mark alumni</option></select></label><button type="button" onClick={() => setWorkflowSaved(true)}>{workflowSaved ? "Workflow saved locally" : "Save prototype workflow"}</button></div>}<div className={styles.statusCards}><article><span>Current</span><strong>{enrollmentStatus}</strong><small>{base.className}</small></article><article><span>Admission record</span><strong>{base.admissionNo}</strong><small>Never reused</small></article><article><span>History policy</span><strong>Append only</strong><small>No silent overwrite</small></article></div><div className={styles.boundary}>In production, promotion/class changes should be approved, dated and reversible through an audit trail. Alumni status should preserve historical records but remove the student from active enrollment counts.</div></>}

        {tab === "documents" && <><div className={styles.sectionHead}><div><h3>Documents & records</h3><p>Visibility differs by role. This prototype shows labels only, not real files.</p></div></div><div className={styles.documentList}>{visibleDocuments.length ? visibleDocuments.map((doc) => <div key={doc.name}><span>▤</span><div><strong>{doc.name}</strong><small>{doc.visibility}</small></div><em>{doc.status}</em></div>) : <div className={styles.empty}>No administrative documents are exposed to this role.</div>}</div></>}

        {tab === "timeline" && <><div className={styles.sectionHead}><div><h3>Student timeline</h3><p>Important events across learning, attendance and school life.</p></div></div><div className={styles.timeline}>{base.timeline.filter((item) => role !== "teacher" || !item.visibility.includes("Leadership only")).map((item) => <div key={`${item.date}-${item.title}`}><time>{item.date}</time><i /><div><strong>{item.title}</strong><p>{item.detail}</p><small>{item.visibility}</small></div></div>)}</div></>}

        {tab === "notes" && <><div className={styles.sectionHead}><div><h3>{role === "teacher" ? "Teacher note" : "Leadership note"}</h3><p>Internal professional note. Not automatically visible to parents or students.</p></div></div><label className={styles.noteField}>Add note<textarea value={note} onChange={(event) => { setNote(event.target.value); setSaved(false); }} placeholder="Add factual follow-up, support or intervention context..." /></label><button className={styles.save} onClick={() => setSaved(true)}>{saved ? "Saved locally" : "Save prototype note"}</button><div className={styles.boundary}>Private notes must not leak into guardian-facing reports, community posts or student-visible profile views unless deliberately approved for sharing.</div></>}
      </div>

      <aside className={styles.side}>
        <article className={styles.idCard}><span>STUDENT ID PREVIEW</span><div className={styles.idPhoto}>{initials}</div><strong>{base.name}</strong><p>{base.admissionNo}<br />{base.className}</p><small>{schoolProfile.name}<br />{base.campus}</small><div className={styles.fakeQr}><i/><i/><i/><i/><i/><i/><i/><i/><i/></div><div className={styles.barcode}>{barcodeBars.map((digit, index) => <i key={`${digit}-${index}`} style={{width: `${2 + (Number(digit || 1) % 4)}px`}} />)}</div><em>QR / barcode prototype</em><button type="button" onClick={() => window.print()}>Print ID / profile</button></article>
        <article><span>ADMISSION NUMBER</span><strong>{base.admissionNo}</strong><p>Stable student identifier; not reused after withdrawal, transfer or graduation.</p></article>
        <article><span>FAMILY ACCOUNT</span><strong>{role === "teacher" ? "Restricted" : base.familyAccountId}</strong><p>Links authorized guardians, siblings and consolidated finance options.</p></article>
        <article><span>FINANCE BOUNDARY</span><p>{base.feeVisibility}. Teachers do not receive fee balances through the general student profile.</p>{role !== "teacher" && <Link href="/finance">Open Finance Center</Link>}</article>
        <article><span>AI BOUNDARY</span><p>AI can summarize evidence and suggest questions. It must not diagnose, rank the child permanently, infer family risk, or make disciplinary decisions autonomously.</p></article>
      </aside>
    </section>
  </main>;
}
