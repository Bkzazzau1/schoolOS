"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./student-profile.module.css";

type RoleContext = "principal" | "headmaster" | "teacher";
type TabKey = "overview" | "academics" | "attendance" | "guardians" | "school-life" | "services" | "documents" | "timeline" | "notes";

type StudentRecord = {
  id: string;
  name: string;
  className: string;
  section: "Secondary" | "Primary";
  campus: string;
  status: string;
  average: number;
  attendance: number;
  trend: number;
  classTeacher: string;
  guardian: string;
  guardianPhone: string;
  admissionDate: string;
  dateOfBirth: string;
  gender: string;
  house: string;
  activities: string[];
  awards: string[];
  transport: string;
  meals: string;
  boarding: string;
  documents: { name: string; status: string; visibility: string }[];
  subjects: { name: string; score: number; trend: string }[];
  attendanceSummary: { label: string; value: string }[];
  timeline: { date: string; title: string; detail: string; visibility: string }[];
  attention: string;
};

const records: Record<string, StudentRecord> = {
  "STU-001": {
    id: "STU-001", name: "Student Alpha", className: "JSS 2A", section: "Secondary", campus: "Kaduna Campus", status: "Strong", average: 86, attendance: 96, trend: 4.2,
    classTeacher: "Mrs. Amina Yusuf", guardian: "Guardian A", guardianPhone: "+234 800 111 0001", admissionDate: "12 Sep 2023", dateOfBirth: "14 Feb 2013", gender: "Female", house: "Blue House",
    activities: ["Chess Club", "Debate & Public Speaking"], awards: ["Excellent Attendance · Term 2", "Debate Team Recognition"], transport: "BUS-02 · Barnawa / Kakuri Route", meals: "Standard school menu", boarding: "Day student",
    documents: [
      { name: "Admission form", status: "Verified", visibility: "Leadership + Records" }, { name: "Birth record", status: "Verified", visibility: "Leadership + Records" }, { name: "Guardian consent", status: "Current", visibility: "Leadership + Guardian" },
    ],
    subjects: [{ name: "Mathematics", score: 88, trend: "+3.0" }, { name: "English", score: 84, trend: "+2.1" }, { name: "Basic Science", score: 87, trend: "+5.2" }, { name: "Social Studies", score: 85, trend: "+4.0" }],
    attendanceSummary: [{ label: "Present", value: "96%" }, { label: "Late", value: "2" }, { label: "Excused", value: "1" }, { label: "Unexplained", value: "0" }],
    timeline: [{ date: "10 Sep", title: "Debate recognition", detail: "Recognized for contribution to inter-house debate preparation.", visibility: "School + Guardian" }, { date: "6 Sep", title: "Assessment completed", detail: "Basic Science assessment recorded at 87%.", visibility: "Teacher + Leadership + Guardian" }, { date: "2 Sep", title: "Attendance review", detail: "Attendance remained above section target.", visibility: "Leadership + Teacher" }],
    attention: "No current major concern. Continue normal academic and co-curricular support.",
  },
  "STU-003": {
    id: "STU-003", name: "Student Gamma", className: "JSS 2B", section: "Secondary", campus: "Kaduna Campus", status: "At risk", average: 48, attendance: 79, trend: -8.4,
    classTeacher: "Mr. Samuel John", guardian: "Guardian C", guardianPhone: "+234 800 111 0003", admissionDate: "9 Sep 2023", dateOfBirth: "22 Jun 2012", gender: "Male", house: "Red House",
    activities: ["Football Academy"], awards: ["House Participation · Term 1"], transport: "No school transport", meals: "Standard school menu", boarding: "Day student",
    documents: [{ name: "Admission form", status: "Verified", visibility: "Leadership + Records" }, { name: "Birth record", status: "Verified", visibility: "Leadership + Records" }, { name: "Guardian contact record", status: "Current", visibility: "Leadership + Guardian" }],
    subjects: [{ name: "Mathematics", score: 42, trend: "-11.0" }, { name: "English", score: 51, trend: "-5.0" }, { name: "Basic Science", score: 46, trend: "-9.0" }, { name: "Social Studies", score: 53, trend: "-4.0" }],
    attendanceSummary: [{ label: "Present", value: "79%" }, { label: "Late", value: "5" }, { label: "Excused", value: "3" }, { label: "Unexplained", value: "6" }],
    timeline: [{ date: "12 Sep", title: "Guardian follow-up requested", detail: "Leadership requested coordinated attendance and learning follow-up.", visibility: "Leadership + Guardian" }, { date: "8 Sep", title: "Teacher intervention", detail: "Short Mathematics revision support plan started.", visibility: "Teacher + Leadership" }, { date: "4 Sep", title: "Attendance pattern reviewed", detail: "Repeated absences flagged for human follow-up; no family cause inferred.", visibility: "Leadership only" }],
    attention: "Attendance weakness and academic decline are appearing together. Review context with teacher and guardian before deciding next support action.",
  },
  "PRI-003": {
    id: "PRI-003", name: "Pupil Gamma", className: "Primary 3", section: "Primary", campus: "Kaduna Campus", status: "Needs support", average: 58, attendance: 82, trend: -6.8,
    classTeacher: "Mrs. Ruth James", guardian: "Guardian Gamma", guardianPhone: "+234 800 222 0003", admissionDate: "11 Sep 2022", dateOfBirth: "7 Mar 2017", gender: "Female", house: "Green House",
    activities: ["Reading Buddies", "Creative Arts"], awards: ["Kindness Recognition · Term 1"], transport: "BUS-01 · Zaria Road Route", meals: "Standard school menu", boarding: "Day pupil",
    documents: [{ name: "Admission form", status: "Verified", visibility: "Leadership + Records" }, { name: "Birth record", status: "Verified", visibility: "Leadership + Records" }, { name: "Pickup authorization", status: "Current", visibility: "Leadership + Guardian" }],
    subjects: [{ name: "Literacy", score: 54, trend: "-8.0" }, { name: "Numeracy", score: 61, trend: "-3.0" }, { name: "Basic Science", score: 60, trend: "-4.0" }, { name: "Creative Arts", score: 78, trend: "+2.0" }],
    attendanceSummary: [{ label: "Present", value: "82%" }, { label: "Late", value: "4" }, { label: "Excused", value: "2" }, { label: "Unexplained", value: "4" }],
    timeline: [{ date: "11 Sep", title: "Reading support review", detail: "Class teacher recommended continued guided reading practice.", visibility: "Teacher + Leadership + Guardian" }, { date: "7 Sep", title: "Attendance follow-up", detail: "Headmistress requested guardian conversation about attendance pattern.", visibility: "Leadership + Guardian" }, { date: "3 Sep", title: "Creative activity", detail: "Strong participation recorded during class creative work.", visibility: "Teacher + Guardian" }],
    attention: "Reading progress and attendance both need supportive follow-up. Avoid permanent ability labels; review evidence over multiple cycles.",
  },
};

type DirectorySummary = Pick<StudentRecord, "name" | "className" | "status" | "average" | "attendance" | "trend" | "classTeacher" | "guardian" | "attention">;

const directorySummaries: Record<string, DirectorySummary> = {
  "STU-002": { name: "Student Beta", className: "JSS 2A", status: "Watch", average: 61, attendance: 88, trend: -3.1, classTeacher: "Mrs. Amina Yusuf", guardian: "Guardian B", attention: "Recent Mathematics decline needs review across more than one assessment before changing support." },
  "STU-004": { name: "Student Delta", className: "JSS 3A", status: "Strong", average: 91, attendance: 98, trend: 6.0, classTeacher: "Mrs. Grace Audu", guardian: "Guardian D", attention: "Strong current academic and attendance evidence. Continue normal support and enrichment." },
  "STU-005": { name: "Student Epsilon", className: "SS 1A", status: "Stable", average: 68, attendance: 91, trend: -1.9, classTeacher: "Mr. Daniel Musa", guardian: "Guardian E", attention: "Overall stable; Physics and Further Mathematics need routine subject-level review." },
  "STU-006": { name: "Student Zeta", className: "SS 2A", status: "Stable", average: 74, attendance: 93, trend: 2.1, classTeacher: "Mrs. Ruth Adams", guardian: "Guardian F", attention: "No major concern. Continue normal academic monitoring." },
  "PRI-001": { name: "Pupil Alpha", className: "Primary 1", status: "Strong", average: 82, attendance: 97, trend: 5.2, classTeacher: "Mrs. Zainab Musa", guardian: "Guardian Alpha", attention: "No current learning-support action required." },
  "PRI-002": { name: "Pupil Beta", className: "Primary 2", status: "Stable", average: 70, attendance: 93, trend: 1.4, classTeacher: "Mrs. Esther Daniel", guardian: "Guardian Beta", attention: "Continue routine numeracy reinforcement and monitor the next learning cycle." },
  "PRI-004": { name: "Pupil Delta", className: "Primary 4", status: "Strong", average: 81, attendance: 95, trend: 3.7, classTeacher: "Mr. David Joseph", guardian: "Guardian Delta", attention: "No current learning-support action required." },
  "PRI-005": { name: "Pupil Epsilon", className: "Primary 5", status: "Watch", average: 71, attendance: 90, trend: -2.1, classTeacher: "Mr. Kabiru Lawal", guardian: "Guardian Epsilon", attention: "Monitor literacy trend over the next two assessments before changing support." },
  "PRI-006": { name: "Pupil Zeta", className: "Primary 6", status: "Stable", average: 80, attendance: 94, trend: 2.9, classTeacher: "Unassigned class teacher", guardian: "Guardian Zeta", attention: "Academic progress is stable; class-teacher assignment remains an operational gap." },
};

const idAliases: Record<string, string> = {
  "STU-J2A-001": "STU-001",
  "STU-J2A-002": "STU-002",
  "STU-J2B-001": "STU-003",
  "STU-J3A-001": "STU-004",
  "STU-S1A-001": "STU-005",
};

function makeGeneratedRecord(id: string, summary: DirectorySummary): StudentRecord {
  const primary = id.startsWith("PRI-");
  const base = primary ? records["PRI-003"] : records["STU-001"];
  const score = Math.max(35, Math.min(96, Math.round(summary.average)));
  const lower = Math.max(30, score - 4);
  const higher = Math.min(98, score + 3);

  return {
    ...base,
    id,
    name: summary.name,
    className: summary.className,
    section: primary ? "Primary" : "Secondary",
    status: summary.status,
    average: summary.average,
    attendance: summary.attendance,
    trend: summary.trend,
    classTeacher: summary.classTeacher,
    guardian: summary.guardian,
    guardianPhone: primary ? "+234 800 222 0000" : "+234 800 111 0000",
    activities: primary ? ["Creative Arts", "Reading / Games programme"] : ["School activity participation"],
    awards: summary.status === "Strong" ? ["Positive contribution recognition"] : [],
    transport: "Service relationship not configured in this sample",
    house: primary ? "Blue House" : "Green House",
    subjects: primary
      ? [{ name: "Literacy", score: lower, trend: `${summary.trend >= 0 ? "+" : ""}${summary.trend.toFixed(1)}` }, { name: "Numeracy", score: higher, trend: `${summary.trend >= 0 ? "+" : ""}${(summary.trend / 2).toFixed(1)}` }, { name: "Basic Science", score, trend: "0.0" }, { name: "Creative Arts", score: Math.min(98, score + 5), trend: "+1.0" }]
      : [{ name: "Mathematics", score: lower, trend: `${summary.trend >= 0 ? "+" : ""}${summary.trend.toFixed(1)}` }, { name: "English", score: higher, trend: `${summary.trend >= 0 ? "+" : ""}${(summary.trend / 2).toFixed(1)}` }, { name: "Basic Science", score, trend: "0.0" }, { name: "Social Studies", score: Math.min(98, score + 2), trend: "+1.0" }],
    attendanceSummary: [{ label: "Present", value: `${summary.attendance}%` }, { label: "Late", value: "—" }, { label: "Excused", value: "—" }, { label: "Unexplained", value: "—" }],
    timeline: [{ date: "Current term", title: "Profile summary", detail: "Representative student record generated from the directory mock for consistent profile navigation.", visibility: "Teacher + Leadership" }],
    attention: summary.attention,
  };
}

function resolveStudentRecord(studentId: string, role: RoleContext): StudentRecord {
  const canonicalId = idAliases[studentId] ?? studentId;
  const direct = records[canonicalId];
  const resolved = direct ?? (directorySummaries[canonicalId] ? makeGeneratedRecord(canonicalId, directorySummaries[canonicalId]) : records[role === "headmaster" ? "PRI-003" : "STU-003"]);
  return studentId === canonicalId ? resolved : { ...resolved, id: studentId };
}

const tabs: { key: TabKey; label: string }[] = [
  { key: "overview", label: "Overview" }, { key: "academics", label: "Academics" }, { key: "attendance", label: "Attendance" }, { key: "guardians", label: "Guardians" }, { key: "school-life", label: "School Life" }, { key: "services", label: "Services" }, { key: "documents", label: "Documents" }, { key: "timeline", label: "Timeline" }, { key: "notes", label: "Notes" },
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
  const base = resolveStudentRecord(studentId, role);
  const meta = roleMeta[role];

  const visibleDocuments = useMemo(() => role === "teacher" ? base.documents.filter((doc) => doc.visibility.includes("Guardian")) : base.documents, [base.documents, role]);

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <div><span>{meta.label.toUpperCase()} · STUDENT PROFILE</span><h1>{base.name}</h1><p>{base.className} · {base.section} · {base.campus}</p></div>
        <div className={styles.actions}><Link href={meta.back}>← Back to directory</Link><Link href={role === "teacher" ? "/teacher/messages" : role === "headmaster" ? "/headmaster/communication" : "/principal/communication"}>Contact guardian</Link></div>
      </header>

      <section className={styles.scope}><div><strong>{meta.scope}</strong><small>{meta.note}</small></div><span>UI prototype · role-aware visibility</span></section>

      <section className={styles.hero}>
        <div className={styles.avatar}>{base.name.split(" ").map((part) => part[0]).join("").slice(0,2)}</div>
        <div className={styles.identity}><span>{base.id}</span><h2>{base.name}</h2><p>{base.className} · {base.classTeacher}</p><div><em>{base.status}</em><em>{base.house}</em><em>{base.section}</em></div></div>
        <div className={styles.heroMetrics}><div><span>Average</span><strong>{base.average}%</strong></div><div><span>Attendance</span><strong>{base.attendance}%</strong></div><div><span>Trend</span><strong className={base.trend < 0 ? styles.negative : styles.positive}>{base.trend > 0 ? "+" : ""}{base.trend}%</strong></div></div>
      </section>

      <nav className={styles.tabs}>{tabs.map((item) => <button key={item.key} onClick={() => setTab(item.key)} className={tab === item.key ? styles.activeTab : ""}>{item.label}</button>)}</nav>

      <section className={styles.layout}>
        <div className={styles.mainCard}>
          {tab === "overview" && <>
            <div className={styles.sectionHead}><div><h3>Student overview</h3><p>One record connecting academic, guardian and school-life context.</p></div></div>
            <div className={styles.infoGrid}>
              <div><span>Student ID</span><strong>{base.id}</strong></div><div><span>Date of birth</span><strong>{base.dateOfBirth}</strong></div><div><span>Gender</span><strong>{base.gender}</strong></div><div><span>Admission date</span><strong>{base.admissionDate}</strong></div><div><span>Class</span><strong>{base.className}</strong></div><div><span>Class teacher</span><strong>{base.classTeacher}</strong></div>
            </div>
            <div className={styles.attention}><span>Current attention</span><strong>{base.attention}</strong></div>
            <div className={styles.quickGrid}><div><span>Guardian</span><strong>{base.guardian}</strong><small>{role === "teacher" ? "Contact through SchoolOS messaging" : base.guardianPhone}</small></div><div><span>School Life</span><strong>{base.activities.length} activities</strong><small>{base.awards.length} recognition records</small></div><div><span>Services</span><strong>{base.transport}</strong><small>{base.meals}</small></div></div>
          </>}

          {tab === "academics" && <><div className={styles.sectionHead}><div><h3>Academic profile</h3><p>Subject evidence and recent direction. This is not a permanent ability label.</p></div></div><div className={styles.subjectList}>{base.subjects.map((subject) => <div key={subject.name}><div><strong>{subject.name}</strong><small>Trend {subject.trend}%</small></div><span>{subject.score}%</span><i><b style={{width:`${subject.score}%`}} /></i></div>)}</div><div className={styles.boundary}>AI may summarize patterns and suggest review areas, but final academic judgement remains with teachers and authorized school leadership.</div></>}

          {tab === "attendance" && <><div className={styles.sectionHead}><div><h3>Attendance context</h3><p>Patterns can trigger supportive follow-up but should not be used to infer family circumstances.</p></div></div><div className={styles.metricGrid}>{base.attendanceSummary.map((item) => <div key={item.label}><span>{item.label}</span><strong>{item.value}</strong></div>)}</div><div className={styles.attention}><span>Human review rule</span><strong>Check reasons and school records before interpreting an attendance pattern. No neglect, health or family inference from attendance alone.</strong></div></>}

          {tab === "guardians" && <><div className={styles.sectionHead}><div><h3>Guardian relationships</h3><p>Contact and relationship information should be shown only to authorized roles.</p></div></div><div className={styles.guardianCard}><div className={styles.avatar}>GA</div><div><span>Primary guardian</span><h3>{base.guardian}</h3><p>{role === "teacher" ? "Direct phone hidden in teacher view" : base.guardianPhone}</p></div><Link href={role === "teacher" ? "/teacher/messages" : role === "headmaster" ? "/headmaster/communication" : "/principal/communication"}>Open communication</Link></div><div className={styles.boundary}>Pickup authorization, legal custody restrictions and sensitive family information should use separate restricted workflows rather than a broad profile card.</div></>}

          {tab === "school-life" && <><div className={styles.sectionHead}><div><h3>School Life</h3><p>Activities, houses and recognition remain separate from academic grading.</p></div></div><div className={styles.split}><div><span>Activities</span>{base.activities.map((item) => <strong key={item}>{item}</strong>)}</div><div><span>Awards & recognition</span>{base.awards.length ? base.awards.map((item) => <strong key={item}>{item}</strong>) : <strong>No recognition record in this mock</strong>}</div></div><div className={styles.infoGrid}><div><span>House</span><strong>{base.house}</strong></div><div><span>Recognition rule</span><strong>No grade conversion</strong></div></div></>}

          {tab === "services" && <><div className={styles.sectionHead}><div><h3>School services</h3><p>Operational relationships only. Sensitive route, meal or welfare details stay restricted.</p></div></div><div className={styles.serviceList}><div><span>Transport</span><strong>{base.transport}</strong><small>{role === "teacher" ? "Detailed stops hidden unless assigned transport duty" : "Route relationship on record"}</small></div><div><span>Meals & Cafeteria</span><strong>{base.meals}</strong><small>Health/dietary exceptions are not exposed here</small></div><div><span>Boarding</span><strong>{base.boarding}</strong><small>Optional school service</small></div></div></>}

          {tab === "documents" && <><div className={styles.sectionHead}><div><h3>Documents & records</h3><p>Visibility differs by role. This prototype shows labels only, not real files.</p></div></div><div className={styles.documentList}>{visibleDocuments.length ? visibleDocuments.map((doc) => <div key={doc.name}><span>▤</span><div><strong>{doc.name}</strong><small>{doc.visibility}</small></div><em>{doc.status}</em></div>) : <div className={styles.empty}>No administrative documents are exposed to this role.</div>}</div></>}

          {tab === "timeline" && <><div className={styles.sectionHead}><div><h3>Student timeline</h3><p>Important events across learning, attendance and school life.</p></div></div><div className={styles.timeline}>{base.timeline.filter((item) => role !== "teacher" || !item.visibility.includes("Leadership only")).map((item) => <div key={`${item.date}-${item.title}`}><time>{item.date}</time><i /><div><strong>{item.title}</strong><p>{item.detail}</p><small>{item.visibility}</small></div></div>)}</div></>}

          {tab === "notes" && <><div className={styles.sectionHead}><div><h3>{role === "teacher" ? "Teacher note" : "Leadership note"}</h3><p>Internal professional note. Not automatically visible to parents or students.</p></div></div><label className={styles.noteField}>Add note<textarea value={note} onChange={(event) => { setNote(event.target.value); setSaved(false); }} placeholder="Add factual follow-up, support or intervention context..." /></label><button className={styles.save} onClick={() => setSaved(true)}>{saved ? "Saved locally" : "Save prototype note"}</button><div className={styles.boundary}>Private notes must not leak into guardian-facing reports, community posts or student-visible profile views unless deliberately approved for sharing.</div></>}
        </div>

        <aside className={styles.side}>
          <article><span>PROFILE COMPLETENESS</span><strong>92%</strong><p>Mock completeness across identity, guardian, academic and operational fields.</p></article>
          <article><span>VISIBILITY</span><strong>{meta.label}</strong><p>{role === "teacher" ? "Assigned-class scope only." : `${base.section} leadership scope only.`}</p></article>
          <article><span>AI BOUNDARY</span><p>AI can summarize evidence and suggest questions. It must not diagnose, rank the child permanently, infer family risk, or make disciplinary decisions autonomously.</p></article>
          <article><span>CONNECTED AREAS</span><div className={styles.sideLinks}><Link href="/awards">Awards</Link><Link href="/activities">Activities</Link><Link href="/transport">Transport</Link><Link href="/meals">Meals</Link></div></article>
        </aside>
      </section>
    </main>
  );
}
