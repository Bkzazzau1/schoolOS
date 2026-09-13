import Link from "next/link";

const nav = [
  ["Dashboard", "/headteacher"],
  ["Educators", "/headteacher/educators"],
  ["Children", "/headteacher/children"],
  ["Development & Learning", "/headteacher/development"],
  ["Attendance", "/headteacher/attendance"],
  ["Observations", "/headteacher/observations"],
  ["Planning & Activities", "/headteacher/planning"],
  ["Reports", "/headteacher/reports"],
  ["Daily Routines", "/headteacher/routines"],
  ["Guardians", "/headteacher/guardians"],
  ["Welfare & Incidents", "/headteacher/incidents"],
  ["Head Teacher AI", "/headteacher/ai"],
  ["Early Years Performance", "/headteacher/performance"],
  ["Profile", "/headteacher/profile"],
];

const classes = [
  { name: "Nursery 1", children: 28, attendance: "96%", observations: "91%", routines: "Strong", status: "Strong" },
  { name: "Nursery 2", children: 30, attendance: "93%", observations: "84%", routines: "On track", status: "On track" },
  { name: "Reception A", children: 26, attendance: "90%", observations: "78%", routines: "Watch", status: "Watch" },
];

const routines = [
  { time: "7:30–8:10", title: "Arrival & settling", note: "Greeting, belongings, emotional settling and family handoff." },
  { time: "8:10–8:35", title: "Circle time", note: "Language, songs, class routine and social participation." },
  { time: "8:35–10:00", title: "Guided play & learning centres", note: "Early literacy, numeracy, sensory, creative and motor activities." },
  { time: "10:00–10:30", title: "Snack & care routine", note: "Hygiene, eating routine, independence and social habits." },
  { time: "10:30–12:00", title: "Outdoor / focused activity", note: "Movement, exploration, teacher observation and small-group work." },
];

const priorities = [
  { level: "TODAY", title: "Reception A observation completion", note: "Observation coverage is below the Early Years target; review educator notes before close." },
  { level: "TODAY", title: "Two guardian follow-ups", note: "Attendance and settling-in conversations are still open." },
  { level: "THIS WEEK", title: "Nursery 2 language activity review", note: "Compare recent language observations with planned activities." },
];

const activity = [
  { time: "8:18 AM", title: "Nursery 1 attendance completed", note: "27 of 28 children present." },
  { time: "9:05 AM", title: "Observation added", note: "Fine-motor activity observation recorded in Nursery 2." },
  { time: "10:12 AM", title: "Guardian message received", note: "Reception A settling-in follow-up needs a response." },
  { time: "11:30 AM", title: "Routine check completed", note: "Snack and hygiene routine marked on track." },
];

export default function HeadTeacherDashboard() {
  return (
    <main className="headteacher-shell">
      <aside className="headteacher-sidebar">
        <div className="headteacher-brand">
          <div className="headteacher-brand-mark">EY</div>
          <div><strong>Nursery / Early Years</strong><span>Head Teacher Workspace</span></div>
        </div>

        <nav className="headteacher-nav">
          {nav.map(([label, href], index) => <Link key={href} className={index === 0 ? "active" : ""} href={href}>{label}</Link>)}
        </nav>

        <div className="headteacher-sidebar-note">
          <span>ACTIVE LEADERSHIP SCOPE</span>
          <strong>Mrs. Mary Daniel · Head Teacher</strong>
          <span>Kaduna Campus · Nursery / Early Years</span>
        </div>
      </aside>

      <section className="headteacher-main">
        <header className="headteacher-topbar">
          <div>
            <span className="headteacher-kicker">HEAD TEACHER · NURSERY / EARLY YEARS</span>
            <h1>Early Years Overview</h1>
            <p>Developmental learning, routines, observations, attendance and guardian engagement.</p>
          </div>
          <div className="headteacher-actions">
            <Link href="/headteacher/observations">Review observations</Link>
            <Link href="/headteacher/guardians">Guardian follow-ups</Link>
            <Link href="/headteacher/ai">Ask Head Teacher AI</Link>
          </div>
        </header>

        <section className="headteacher-scope">
          <div><span>ACTIVE SECTION</span><strong>Nursery / Early Years</strong><small>Kaduna Campus · Head Teacher Mrs. Mary Daniel</small></div>
          <p>This workspace is limited to Early Years. Primary and Secondary leadership, records and decisions remain in their own sections.</p>
        </section>

        <section className="headteacher-hero-grid">
          <article className="headteacher-card headteacher-hero">
            <span>EARLY YEARS LEADERSHIP</span>
            <h2>See the whole day, not only the final result.</h2>
            <p>Early Years quality depends on routines, teacher observations, play-based learning, developmental progress, attendance and strong family communication. This workspace brings those signals together without forcing children into one academic score.</p>
            <div className="headteacher-hero-actions">
              <Link href="/headteacher/development">Development & Learning</Link>
              <Link href="/headteacher/routines">Daily Routines</Link>
              <Link href="/headteacher/educators">Educators</Link>
            </div>
          </article>

          <article className="headteacher-card headteacher-ai-brief">
            <span className="headteacher-kicker">HEAD TEACHER AI BRIEF</span>
            <h3>Reception A needs the clearest review today</h3>
            <p>Attendance and observation completion are both lower than the other Early Years groups in this mock dashboard.</p>
            <ul>
              <li>Review educator observation coverage.</li>
              <li>Check two open guardian follow-ups.</li>
              <li>Confirm the daily routine is running normally before interpreting learning signals.</li>
            </ul>
          </article>
        </section>

        <section className="headteacher-kpis">
          <article className="headteacher-kpi"><span>Children present</span><strong>80 / 84</strong><small>95% today</small></article>
          <article className="headteacher-kpi"><span>Educators present</span><strong>11 / 12</strong><small>1 cover arrangement</small></article>
          <article className="headteacher-kpi"><span>Observation coverage</span><strong>86%</strong><small>Current cycle</small></article>
          <article className="headteacher-kpi"><span>Routines on track</span><strong>8 / 9</strong><small>1 review item</small></article>
          <article className="headteacher-kpi"><span>Guardian follow-ups</span><strong>2</strong><small>Open today</small></article>
          <article className="headteacher-kpi"><span>Reports ready</span><strong>72%</strong><small>Development summaries</small></article>
        </section>

        <section className="headteacher-content-grid">
          <article className="headteacher-card">
            <div className="headteacher-section-head"><div><h3>Early Years group health</h3><p>Attendance, observation coverage and routine stability.</p></div><Link href="/headteacher/performance">Full performance →</Link></div>
            <div className="early-class-list">
              {classes.map((item) => <div className="early-class-row" key={item.name}>
                <div><strong>{item.name}</strong><small>{item.children} children</small></div>
                <span>Attendance<br/><strong>{item.attendance}</strong></span>
                <span>Observations<br/><strong>{item.observations}</strong></span>
                <span>Routines<br/><strong>{item.routines}</strong></span>
                <span>Development<br/><strong>{item.status === "Watch" ? "Review" : "On track"}</strong></span>
                <span className={`early-status ${item.status.toLowerCase().replaceAll(" ", "-")}`}>{item.status}</span>
              </div>)}
            </div>
          </article>

          <article className="headteacher-card">
            <div className="headteacher-section-head"><div><h3>Today’s routine</h3><p>Operational rhythm of the Early Years day.</p></div><Link href="/headteacher/routines">Open routines →</Link></div>
            <div className="routine-list">
              {routines.map((item) => <div className="routine-item" key={item.time}><span>{item.time}</span><strong>{item.title}</strong><p>{item.note}</p></div>)}
            </div>
          </article>
        </section>

        <section className="headteacher-lower-grid">
          <article className="headteacher-card">
            <div className="headteacher-section-head"><div><h3>Leadership priorities</h3><p>Current Early Years follow-up items.</p></div></div>
            <div className="priority-list">
              {priorities.map((item) => <div className="priority-item" key={item.title}><span>{item.level}</span><strong>{item.title}</strong><p>{item.note}</p></div>)}
            </div>
          </article>

          <article className="headteacher-card">
            <div className="headteacher-section-head"><div><h3>Quick leadership actions</h3><p>Common Early Years workflows.</p></div></div>
            <div className="quick-link-grid">
              <Link href="/headteacher/educators">Educator oversight</Link>
              <Link href="/headteacher/children">Children</Link>
              <Link href="/headteacher/observations">Observations</Link>
              <Link href="/headteacher/planning">Activity planning</Link>
              <Link href="/headteacher/attendance">Attendance</Link>
              <Link href="/headteacher/reports">Development reports</Link>
              <Link href="/headteacher/guardians">Guardian communication</Link>
              <Link href="/headteacher/incidents">Welfare & incidents</Link>
            </div>
          </article>

          <article className="headteacher-card">
            <div className="headteacher-section-head"><div><h3>Early Years activity</h3><p>Recent operational events.</p></div></div>
            <div className="activity-list">
              {activity.map((item) => <div className="activity-item" key={`${item.time}-${item.title}`}><span>{item.time}</span><strong>{item.title}</strong><p>{item.note}</p></div>)}
            </div>
          </article>
        </section>

        <section className="headteacher-card headteacher-boundary" style={{marginTop:16}}>
          <span className="headteacher-kicker">ROLE BOUNDARY</span>
          <h3>Head Teacher authority is Early Years only</h3>
          <p>The Head Teacher can oversee Early Years educators, children, developmental learning, routines, observations, attendance, reports and guardian communication within this section.</p>
          <ul>
            <li>No automatic access to Primary or Secondary records.</li>
            <li>No proprietor-level school identity or finance control.</li>
            <li>Restricted safeguarding details require separate authorization.</li>
            <li>A person who also leads another section must switch to that separate membership/workspace.</li>
          </ul>
        </section>
      </section>
    </main>
  );
}
