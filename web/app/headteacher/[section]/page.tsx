import Link from "next/link";

const sections: Record<string, { title: string; description: string; bullets: string[] }> = {
  educators: { title: "Early Years Educators", description: "Educator responsibilities, planning, observations, workload and support.", bullets: ["Class/group responsibility", "Observation completion", "Activity planning", "Attendance", "Support needs"] },
  children: { title: "Early Years Children", description: "Child profiles and age-appropriate developmental context.", bullets: ["Class placement", "Attendance", "Learning observations", "Routines", "Guardian context"] },
  development: { title: "Development & Learning", description: "Play-based learning and developmental progress across Early Years.", bullets: ["Language & communication", "Early numeracy", "Physical development", "Personal & social development", "Creative exploration"] },
  attendance: { title: "Early Years Attendance", description: "Daily child and educator attendance with guardian follow-up.", bullets: ["Present / absent", "Lateness", "Class comparison", "Repeat absence", "Guardian follow-up"] },
  observations: { title: "Observations", description: "Structured teacher observations without reducing children to one score.", bullets: ["Observation records", "Development areas", "Evidence notes", "Review cycle", "Follow-up"] },
  planning: { title: "Planning & Activities", description: "Early Years weekly plans, learning centres and activity readiness.", bullets: ["Weekly themes", "Learning centres", "Resources", "Small-group activities", "Outdoor learning"] },
  reports: { title: "Early Years Reports", description: "Age-appropriate developmental summaries and family-facing reports.", bullets: ["Development summaries", "Teacher comments", "Head Teacher review", "Guardian release", "Print / PDF"] },
  routines: { title: "Daily Routines", description: "Arrival, care, snack, hygiene, transitions, play and departure routines.", bullets: ["Arrival", "Circle time", "Learning centres", "Care routines", "Departure"] },
  guardians: { title: "Guardian Communication", description: "Family communication and Early Years follow-up.", bullets: ["Inbox", "Settling-in updates", "Attendance follow-up", "Announcements", "Development conversations"] },
  incidents: { title: "Welfare & Incidents", description: "Routine care, health & safety events and restricted safeguarding workflow.", bullets: ["Routine support", "Safety events", "Guardian contact", "Case timeline", "Restricted safeguarding"] },
  ai: { title: "Head Teacher AI", description: "Ask questions using only authorized Early Years context.", bullets: ["Daily priorities", "Observation gaps", "Attendance patterns", "Educator support", "Guardian follow-up"] },
  performance: { title: "Early Years Performance", description: "Section-wide operational and developmental scorecard without child ranking.", bullets: ["Attendance", "Observation coverage", "Routine quality", "Planning readiness", "Guardian engagement"] },
  profile: { title: "Head Teacher Profile", description: "Role identity, Early Years scope and workspace permissions.", bullets: ["Account", "Section scope", "Permissions", "Workspace switching", "Security"] },
};

export default async function HeadTeacherSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const item = sections[section] ?? { title: "Nursery / Early Years", description: "Early Years leadership workspace.", bullets: [] };

  return (
    <main className="headteacher-main" style={{ maxWidth: 1180, margin: "0 auto" }}>
      <header className="headteacher-topbar">
        <div><span className="headteacher-kicker">HEAD TEACHER · NURSERY / EARLY YEARS</span><h1>{item.title}</h1><p>{item.description}</p></div>
        <div className="headteacher-actions"><Link href="/headteacher">Back to dashboard</Link></div>
      </header>
      <section className="headteacher-scope"><div><span>ACTIVE SECTION</span><strong>Nursery / Early Years</strong><small>Kaduna Campus · Mrs. Mary Daniel</small></div><p>UI prototype only. Primary and Secondary remain separate workspaces.</p></section>
      <section className="headteacher-card">
        <div className="headteacher-section-head"><div><h3>Planned module scope</h3><p>This placeholder will be replaced by the dedicated module UI.</p></div></div>
        <div className="quick-link-grid">{item.bullets.map((bullet) => <div key={bullet} style={{ border: "1px solid #e7eaf0", borderRadius: 11, padding: 12, color: "#33455e", fontSize: 12, fontWeight: 700 }}>{bullet}</div>)}</div>
      </section>
    </main>
  );
}
