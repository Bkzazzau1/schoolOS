import Link from "next/link";

const modules: Record<string, { title: string; description: string; items: string[] }> = {
  teachers: { title: "Teachers", description: "School-wide teacher oversight, support indicators and teaching activity.", items: ["Teacher directory", "Attendance and punctuality", "Lesson-plan compliance", "Syllabus progress", "Assessment completion", "Support and follow-up notes"] },
  academics: { title: "Academics", description: "Monitor curriculum delivery, classes, subjects and academic health across the school.", items: ["Class performance", "Subject performance", "Syllabus coverage", "Lesson delivery", "Academic calendar", "Intervention tracking"] },
  students: { title: "Students", description: "School-wide student academic, attendance and intervention oversight.", items: ["Student directory", "Academic risk", "Attendance risk", "Behaviour flags", "Interventions", "Parent follow-up"] },
  attendance: { title: "Attendance", description: "Monitor teacher and student attendance across classes and school operations.", items: ["Student attendance", "Teacher attendance", "Late arrivals", "Absence patterns", "Class comparisons", "Escalations"] },
  approvals: { title: "Approvals", description: "Review teacher work and controlled academic actions awaiting principal decision.", items: ["Lesson plans", "Assessments", "Report cards", "Score corrections", "Teacher submissions", "Approve / return with comment"] },
  results: { title: "Results & Reports", description: "Review academic results, report cards and school performance reports before release.", items: ["Class results", "Student report cards", "Result approval", "Comments", "Print/PDF review", "Release readiness"] },
  timetable: { title: "Timetable", description: "Oversee school timetable coverage, substitutions and teaching-period conflicts.", items: ["Master timetable", "Teacher timetable", "Class timetable", "Substitutions", "Conflicts", "Missed lessons"] },
  communication: { title: "Communication", description: "School leadership communication with teachers, parents and authorized groups.", items: ["Announcements", "Teacher messages", "Parent escalations", "Staff notices", "Read status", "Communication history"] },
  incidents: { title: "Incidents", description: "Track behaviour, safety, welfare and operational incidents that require principal attention.", items: ["Incident register", "Student incidents", "Staff incidents", "Escalation status", "Action taken", "Follow-up notes"] },
  ai: { title: "Principal AI", description: "School-wide intelligence grounded in the principal's authorized school context.", items: ["Morning brief", "Ask the school", "Teacher support insights", "Student risk insights", "Class comparisons", "Recommended actions"] },
  performance: { title: "School Performance", description: "High-level academic and operational performance across the principal's school scope.", items: ["Academic health", "Attendance health", "Teacher compliance", "Syllabus coverage", "Student risk", "Term comparisons"] },
  profile: { title: "Profile", description: "Principal profile, preferences and personal security settings.", items: ["Personal details", "Position", "Notifications", "Availability", "Security", "Active sessions"] },
};

export default async function PrincipalModulePage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const module = modules[section] ?? { title: "Principal Module", description: "This feature is being prepared.", items: [] };

  return <main className="principal-module-shell">
    <header className="principal-module-header">
      <div><span className="page-kicker">PRINCIPAL PORTAL</span><h1>{module.title}</h1><p>{module.description}</p></div>
      <div className="principal-module-actions"><Link href="/principal">Dashboard</Link><Link href="/principal/approvals">Approvals</Link><Link href="/principal/ai">Principal AI</Link></div>
    </header>
    <section className="principal-module-card">
      <h2>{module.title}</h2>
      <p>{module.description}</p>
      <div className="principal-capabilities">{module.items.map((item) => <div key={item}><span>PRINCIPAL CAPABILITY</span><strong>{item}</strong></div>)}</div>
    </section>
  </main>;
}
