import Link from "next/link";

const sections: Record<string, { title: string; description: string; bullets: string[] }> = {
  teachers: { title: "Primary Teachers", description: "Primary-section teacher oversight and support.", bullets: ["Class teachers", "Subject teachers", "Workload", "Planning", "Support needs"] },
  pupils: { title: "Primary Pupils", description: "Pupil records, progress and intervention overview.", bullets: ["Profiles", "Class placement", "Literacy", "Numeracy", "Welfare follow-up"] },
  academics: { title: "Primary Academics", description: "Curriculum delivery and class learning health.", bullets: ["Curriculum progress", "Literacy", "Numeracy", "Class comparison", "Learning support"] },
  attendance: { title: "Primary Attendance", description: "Daily pupil and staff attendance monitoring.", bullets: ["Present/absent", "Lateness", "Class registers", "Repeated absence", "Guardian follow-up"] },
  assignments: { title: "Teaching Assignments", description: "Assign Primary teachers to classes and subjects.", bullets: ["Class teacher assignment", "Subject assignment", "Workload checks", "Unassigned subjects", "Reassignment"] },
  results: { title: "Assessments & Reports", description: "Primary assessment and report-card oversight.", bullets: ["Continuous assessment", "Term results", "Report cards", "Comments", "Release status"] },
  timetable: { title: "Primary Timetable", description: "Primary lesson schedule and teacher coverage.", bullets: ["Class timetable", "Teacher timetable", "Substitutions", "Clashes", "Room usage"] },
  communication: { title: "Primary Communication", description: "Staff and guardian communication within Primary School.", bullets: ["Guardian messages", "Staff messages", "Announcements", "Read status", "Follow-up"] },
  incidents: { title: "Welfare & Incidents", description: "Primary pupil welfare, behaviour and safety follow-up.", bullets: ["Welfare notes", "Behaviour cases", "Safety issues", "Guardian contact", "Resolution"] },
  ai: { title: "Headmaster AI", description: "Ask questions about authorized Primary School data.", bullets: ["Primary priorities", "Pupils needing support", "Teacher support", "Class trends", "Attendance patterns"] },
  performance: { title: "Primary Performance", description: "Primary-section academic and operational scorecard.", bullets: ["Learning outcomes", "Attendance", "Teacher delivery", "Guardian engagement", "Term comparison"] },
  profile: { title: "Headmaster Profile", description: "Personal role, preferences and Primary workspace context.", bullets: ["Account", "Primary scope", "Notifications", "Security", "Activity"] },
};

export default async function HeadmasterSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const item = sections[section] ?? { title: "Primary School", description: "Primary leadership workspace.", bullets: [] };

  return (
    <main className="headmaster-content">
      <section className="headmaster-hero">
        <div><span className="page-kicker">HEADMASTER · PRIMARY SCHOOL</span><h2>{item.title}</h2><p>{item.description}</p></div>
        <div><Link href="/headmaster">Back to dashboard</Link></div>
      </section>
      <section className="headmaster-panel" style={{ marginTop: 18 }}>
        <header><div><h3>Prototype scope</h3><p>This page is UI-only and restricted conceptually to Primary School.</p></div></header>
        <div className="headmaster-quick-grid">{item.bullets.map((bullet) => <div key={bullet} style={{ background: "#f5f8fb", border: "1px solid #e5ebf1", borderRadius: 12, padding: 14, fontWeight: 700 }}>{bullet}</div>)}</div>
      </section>
    </main>
  );
}
