'use client';

import { useMemo, useState } from 'react';

type PageKey =
  | 'overview'
  | 'students'
  | 'teachers'
  | 'academics'
  | 'attendance'
  | 'results'
  | 'finance'
  | 'communication'
  | 'ai'
  | 'reports'
  | 'settings';

const nav: { key: PageKey; label: string; icon: string }[] = [
  { key: 'overview', label: 'Overview', icon: '⌂' },
  { key: 'students', label: 'Students', icon: '◉' },
  { key: 'teachers', label: 'Teachers', icon: '♙' },
  { key: 'academics', label: 'Academics', icon: '▤' },
  { key: 'attendance', label: 'Attendance', icon: '✓' },
  { key: 'results', label: 'Results', icon: '▥' },
  { key: 'finance', label: 'Finance', icon: '₦' },
  { key: 'communication', label: 'Communication', icon: '✉' },
  { key: 'ai', label: 'AI Intelligence', icon: '✦' },
  { key: 'reports', label: 'Reports', icon: '↗' },
  { key: 'settings', label: 'Settings', icon: '⚙' },
];

const students = [
  ['BGA/26/0012', 'Amina Bello', 'JSS 2A', '94%', 'Excellent'],
  ['BGA/26/0018', 'David Terna', 'JSS 2A', '88%', 'Good'],
  ['BGA/26/0031', 'Hauwa Musa', 'Primary 6', '97%', 'Excellent'],
  ['BGA/26/0044', 'Samuel Okafor', 'SS 1B', '79%', 'Watch'],
  ['BGA/26/0057', 'Maryam Sani', 'JSS 3A', '91%', 'Good'],
  ['BGA/26/0069', 'John Audu', 'Primary 5', '72%', 'At risk'],
];

const teachers = [
  ['Mrs. Amina Yusuf', 'Mathematics', '96%', '87%', '100%', '+11.4%', 'Good'],
  ['Mrs. Fatima Bello', 'English', '99%', '94%', '100%', '+14.2%', 'Excellent'],
  ['Mr. David Okoro', 'Basic Science', '94%', '79%', '92%', '+7.8%', 'Watch'],
  ['Mr. Samuel Ter', 'ICT', '91%', '76%', '84%', '+3.1%', 'Support'],
  ['Mrs. Grace Audu', 'Biology', '98%', '91%', '96%', '+12.0%', 'Excellent'],
];

const timetable = [
  ['08:00', 'Mathematics', 'JSS 2A', 'Mrs. Amina Yusuf', 'Room 12'],
  ['09:00', 'English', 'JSS 3A', 'Mrs. Fatima Bello', 'Room 8'],
  ['10:20', 'Basic Science', 'Primary 6', 'Mr. David Okoro', 'Science Lab'],
  ['11:20', 'ICT', 'SS 1B', 'Mr. Samuel Ter', 'ICT Lab'],
  ['12:40', 'Biology', 'SS 2A', 'Mrs. Grace Audu', 'Biology Lab'],
];

const fees = [
  ['JSS 1', '132', '₦13.2m', '₦10.8m', '82%'],
  ['JSS 2', '124', '₦12.4m', '₦10.7m', '86%'],
  ['JSS 3', '118', '₦11.8m', '₦10.4m', '88%'],
  ['SS 1', '104', '₦11.4m', '₦8.9m', '78%'],
  ['SS 2', '91', '₦10.0m', '₦8.6m', '86%'],
];

export default function HomePage() {
  const [page, setPage] = useState<PageKey>('overview');
  const [school, setSchool] = useState('BrightGate Academy');
  const [role, setRole] = useState('Proprietor');
  const [query, setQuery] = useState('');
  const [mobileNav, setMobileNav] = useState(false);

  const title = nav.find((item) => item.key === page)?.label ?? 'Overview';
  const filteredStudents = useMemo(
    () => students.filter((row) => row.join(' ').toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <div className="product-shell">
      <aside className={`sidebar ${mobileNav ? 'open' : ''}`}>
        <div className="brand-row">
          <div className="brand-mark">S</div>
          <div><strong>SchoolOS</strong><span>AI</span></div>
          <button className="sidebar-close" onClick={() => setMobileNav(false)}>×</button>
        </div>

        <button className="school-switcher">
          <div className="school-avatar">BA</div>
          <div><strong>{school}</strong><small>Kaduna Campus</small></div>
          <span>⌄</span>
        </button>

        <p className="nav-label">WORKSPACE</p>
        <nav className="main-nav">
          {nav.map((item) => (
            <button
              key={item.key}
              className={page === item.key ? 'active' : ''}
              onClick={() => { setPage(item.key); setMobileNav(false); }}
            >
              <i>{item.icon}</i><span>{item.label}</span>{item.key === 'ai' && <b>AI</b>}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="tenant-safe"><span>✓</span><div><strong>Private workspace</strong><small>Tenant isolation enabled</small></div></div>
          <div className="plan-card"><small>ACTIVE PLAN</small><strong>SchoolOS Standard</strong><p>₦500 / student / term</p></div>
        </div>
      </aside>

      <main className="workspace">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileNav(true)}>☰</button>
          <div className="global-search"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search students, teachers, activities..." /></div>
          <div className="top-actions">
            <select value={school} onChange={(e) => setSchool(e.target.value)}><option>BrightGate Academy</option><option>Future Leaders School</option></select>
            <select value={role} onChange={(e) => setRole(e.target.value)}><option>Proprietor</option><option>Principal</option><option>Teacher</option><option>Accountant</option><option>Parent</option></select>
            <button className="notification">♢<i /></button>
            <button className="user-avatar">IB</button>
          </div>
        </header>

        <div className="workspace-body">
          <div className="security-strip"><span>✓</span> You are inside <strong>{school}</strong>. Data, reports and AI context are restricted to this school workspace.</div>
          <div className="page-heading">
            <div><small>{role.toUpperCase()} WORKSPACE · 2026/2027 SESSION</small><h1>{title}</h1><p>{page === 'overview' ? `Good morning. Here’s what is happening across ${school}.` : getSubtitle(page)}</p></div>
            <div className="heading-actions"><button className="ghost-btn">Export</button><button className="primary-btn">＋ Quick action</button></div>
          </div>

          {page === 'overview' && <Overview setPage={setPage} />}
          {page === 'students' && <Students rows={filteredStudents} />}
          {page === 'teachers' && <Teachers />}
          {page === 'academics' && <Academics />}
          {page === 'attendance' && <Attendance />}
          {page === 'results' && <Results />}
          {page === 'finance' && <Finance />}
          {page === 'communication' && <Communication />}
          {page === 'ai' && <AIIntelligence />}
          {page === 'reports' && <Reports />}
          {page === 'settings' && <Settings />}
        </div>
      </main>
    </div>
  );
}

function Overview({ setPage }: { setPage: (page: PageKey) => void }) {
  return <>
    <section className="ai-brief">
      <div className="ai-orb">✦</div>
      <div><div className="brief-title"><strong>AI Morning Brief</strong><span>Updated 4 min ago</span></div>
        <p>Attendance is healthy at <b>91.4%</b>, but JSS 2A has declined for six consecutive school days. Mathematics in Primary 5 is two lessons behind plan, three teachers arrived late, and <b>18 students</b> need academic attention.</p>
        <div className="brief-actions"><button onClick={() => setPage('ai')}>View 5 recommendations →</button><button onClick={() => setPage('ai')}>✦ Ask School AI</button></div>
      </div>
    </section>

    <section className="stat-grid">
      <Stat label="Student attendance" value="91.4%" note="592 of 648 present" trend="+2.1%" />
      <Stat label="Teacher compliance" value="82%" note="Lesson notes & plans" trend="+4.8%" />
      <Stat label="Lessons completed" value="96%" note="142 of 148 scheduled" trend="-1.3%" down />
      <Stat label="Fees outstanding" value="₦3.7m" note="73 families" trend="-₦420k" />
    </section>

    <section className="dashboard-grid">
      <Card title="Teacher Intelligence" subtitle="Live teaching activity and support indicators" action="View all" onAction={() => setPage('teachers')}>
        <div className="teacher-mini-list">
          {teachers.slice(0,4).map((t) => <div className="teacher-mini" key={t[0]}><Avatar name={t[0]} /><div className="teacher-name"><strong>{t[0]}</strong><span>{t[1]}</span></div><MiniProgress label="Syllabus" value={parseInt(t[3])}/><strong className="growth">{t[5]}</strong><Status text={t[6]} /></div>)}
        </div>
      </Card>
      <Card title="AI Attention Queue" subtitle="Issues that may need management action" badge="5">
        <Alert tone="danger" title="JSS 2A attendance declining" text="Down 8.7% across 6 consecutive school days." />
        <Alert tone="warning" title="Primary 5 Mathematics behind plan" text="Two lessons behind expected curriculum position." />
        <Alert tone="warning" title="18 students at academic risk" text="Assessment trend suggests an intervention may help." />
        <Alert tone="info" title="73 families have outstanding fees" text="₦3.7m remains unpaid for the current term." />
      </Card>
    </section>

    <section className="dashboard-grid bottom-grid">
      <Card title="School Activity Timeline" subtitle="One intelligent stream of key school events" action="Today">
        {['07:32|Teacher Musa checked in','08:05|SS 2A attendance completed — 38/40 present','09:15|Mathematics lesson completed in JSS 3B','10:30|4 students absent from JSS 1B','12:40|₦150,000 school fees received','14:30|96% of scheduled lessons completed'].map((x)=><div className="timeline-row" key={x}><i/><time>{x.split('|')[0]}</time><span>{x.split('|')[1]}</span></div>)}
      </Card>
      <Card title="Academic Health" subtitle="Current-term institutional snapshot">
        <div className="health-wrap"><div className="score-ring"><div><strong>84</strong><span>/100</span></div></div><div><strong>Healthy, with 3 areas to watch</strong><p>Driven by attendance, assessment performance, syllabus progress and teacher compliance.</p></div></div>
        <MetricBar label="Attendance consistency" value={91}/><MetricBar label="Assessment performance" value={78}/><MetricBar label="Syllabus progression" value={83}/><MetricBar label="Teacher compliance" value={82}/>
      </Card>
    </section>
  </>;
}

function Students({ rows }: { rows: string[][] }) {
  return <><section className="stat-grid"><Stat label="Active students" value="648" note="Across 24 classes" trend="+36 this term"/><Stat label="Boys" value="327" note="50.5% of enrollment" trend="+3.2%"/><Stat label="Girls" value="321" note="49.5% of enrollment" trend="+2.8%"/><Stat label="At-risk students" value="18" note="Require intervention" trend="-4"/></section>
    <Card title="Student Directory" subtitle="Enrollment, attendance and academic health" action="＋ Add student"><DataTable headers={['Student ID','Student','Class','Attendance','Academic health']} rows={rows} statusColumn={4}/></Card></>;
}

function Teachers() {
  return <><section className="stat-grid"><Stat label="Teaching staff" value="45" note="42 present today" trend="+2"/><Stat label="Avg. attendance" value="95.6%" note="This term" trend="+1.8%"/><Stat label="Lesson compliance" value="82%" note="Plans and notes" trend="+4.8%"/><Stat label="Need support" value="4" note="AI-assisted flag" trend="-2"/></section>
    <Card title="Teacher Intelligence" subtitle="Performance indicators are support signals, not automatic disciplinary scores" action="Configure metrics"><DataTable headers={['Teacher','Subject','Attendance','Syllabus','Lesson plans','Student trend','Status']} rows={teachers} statusColumn={6}/></Card>
    <section className="dashboard-grid"><Card title="Workload Balance" subtitle="Weekly scheduled periods"><MetricBar label="Mrs. Amina Yusuf" value={78}/><MetricBar label="Mrs. Fatima Bello" value={71}/><MetricBar label="Mr. David Okoro" value={90}/><MetricBar label="Mr. Samuel Ter" value={63}/></Card><Card title="Professional Support" subtitle="AI-recommended coaching focus"><Alert tone="warning" title="ICT lesson-plan consistency" text="Mr. Samuel Ter has 84% plan compliance over the last four weeks."/><Alert tone="info" title="Science practical coverage" text="Consider an additional laboratory period for Primary 6."/></Card></section></>;
}

function Academics() {
  return <><div className="subnav"><button className="selected">Timetable</button><button>Classes</button><button>Subjects</button><button>Lesson Plans</button><button>Syllabus</button><button>Academic Calendar</button></div>
    <section className="stat-grid"><Stat label="Classes" value="24" note="Primary + Secondary" trend="Active"/><Stat label="Subjects" value="38" note="Across all levels" trend="Configured"/><Stat label="Today's lessons" value="148" note="142 completed" trend="96%"/><Stat label="Behind syllabus" value="6" note="Subject-class pairs" trend="Needs action" down/></section>
    <Card title="Today's Timetable" subtitle="Saturday, September 13" action="Generate timetable"><DataTable headers={['Time','Subject','Class','Teacher','Venue']} rows={timetable}/></Card>
    <section className="dashboard-grid"><Card title="Syllabus Coverage" subtitle="Current term progress"><MetricBar label="Mathematics" value={87}/><MetricBar label="English Language" value={94}/><MetricBar label="Basic Science" value={79}/><MetricBar label="ICT" value={76}/><MetricBar label="Biology" value={91}/></Card><Card title="Curriculum Alerts" subtitle="AI checks against planned progression"><Alert tone="danger" title="Primary 5 Mathematics" text="Two lessons behind the configured term plan."/><Alert tone="warning" title="SS 1 ICT" text="Practical activities are progressing slower than theory."/><Alert tone="info" title="JSS 3 English" text="On track and 4% ahead of planned coverage."/></Card></section></>;
}

function Attendance() {
  const classes = [['JSS 1A','39 / 42','92.9%','3'],['JSS 2A','38 / 44','86.4%','6'],['JSS 3A','41 / 42','97.6%','1'],['SS 1B','35 / 40','87.5%','5'],['Primary 6','37 / 39','94.9%','2']];
  return <><section className="stat-grid"><Stat label="Present today" value="592" note="of 648 students" trend="91.4%"/><Stat label="Absent" value="56" note="Across all campuses" trend="8.6%" down/><Stat label="Late arrivals" value="17" note="Students" trend="-5"/><Stat label="Staff present" value="42/45" note="3 absent" trend="93.3%"/></section>
    <Card title="Class Attendance" subtitle="Live attendance completion and exceptions" action="Take attendance"><DataTable headers={['Class','Present','Attendance rate','Absent']} rows={classes}/></Card>
    <section className="dashboard-grid"><Card title="7-Day Attendance Trend" subtitle="Whole-school consistency"><div className="chart-bars">{[82,89,91,88,94,92,91].map((v,i)=><div key={i}><i style={{height:`${v}%`}}/><span>{['M','T','W','T','F','S','S'][i]}</span></div>)}</div></Card><Card title="Attendance Intelligence" subtitle="Patterns requiring attention"><Alert tone="danger" title="JSS 2A sustained decline" text="Attendance has fallen for six consecutive school days."/><Alert tone="warning" title="Repeated Monday absences" text="9 students show a recurring Monday absence pattern."/></Card></section></>;
}

function Results() {
  const rows=[['JSS 1A','78.4%','76.1%','+2.3%','English'],['JSS 2A','72.8%','74.9%','-2.1%','Mathematics'],['JSS 3A','81.3%','78.6%','+2.7%','Basic Science'],['SS 1B','69.9%','68.2%','+1.7%','Biology'],['Primary 6','84.2%','80.8%','+3.4%','English']];
  return <><section className="stat-grid"><Stat label="School average" value="76.9%" note="Current term" trend="+2.6%"/><Stat label="Assessments" value="214" note="Recorded this term" trend="96% marked"/><Stat label="Students improving" value="71%" note="vs last term" trend="+5%"/><Stat label="At academic risk" value="18" note="AI early-warning" trend="-4"/></section><Card title="Academic Performance" subtitle="Class-level result intelligence" action="Create assessment"><DataTable headers={['Class','Current avg.','Previous avg.','Change','Top subject']} rows={rows}/></Card><section className="dashboard-grid"><Card title="Performance Distribution" subtitle="Current-term scores"><MetricBar label="Excellent (80–100)" value={34}/><MetricBar label="Good (65–79)" value={42}/><MetricBar label="Average (50–64)" value={18}/><MetricBar label="Needs support (<50)" value={6}/></Card><Card title="AI Academic Insights" subtitle="Evidence-based patterns"><Alert tone="danger" title="JSS 2A Mathematics" text="Average score declined 6.2 points across three assessments."/><Alert tone="info" title="Primary 6 improvement" text="English performance has improved steadily for four weeks."/></Card></section></>;
}

function Finance() {
  return <><section className="stat-grid"><Stat label="Term invoices" value="₦62.8m" note="648 active students" trend="Generated"/><Stat label="Collected" value="₦59.1m" note="94.1% collection rate" trend="+₦4.2m"/><Stat label="Outstanding" value="₦3.7m" note="73 families" trend="-₦420k"/><Stat label="Today's payments" value="₦720k" note="18 transactions" trend="+12.5%"/></section>
    <Card title="Fee Collection by Level" subtitle="Current-term billing and receipts" action="＋ Record payment"><DataTable headers={['Level','Students','Invoiced','Collected','Collection']} rows={fees}/></Card>
    <section className="dashboard-grid"><Card title="Collection Progress" subtitle="Term target"><div className="big-progress"><div><strong>94.1%</strong><span>collected</span></div><i><b style={{width:'94.1%'}}/></i><p>₦59.1m received of ₦62.8m invoiced.</p></div></Card><Card title="Finance Intelligence" subtitle="Automated follow-up opportunities"><Alert tone="warning" title="73 families outstanding" text="Generate targeted reminders based on balance and due date."/><Alert tone="info" title="SS 1 has lowest collection" text="78% paid versus 94% school-wide average."/></Card></section></>;
}

function Communication() {
  const messages=[['School Management','Mid-term assessment notice','All parents','10:32 AM','Sent'],['Accounts','Fee reminder — Term 1','73 parents','09:18 AM','Sent'],['Mrs. Fatima Bello','JSS 3 English assignment','JSS 3A','Yesterday','Read'],['Principal','Staff briefing','All staff','Yesterday','Sent']];
  return <><section className="stat-grid"><Stat label="Messages today" value="186" note="Across all channels" trend="+14%"/><Stat label="Delivery rate" value="98.7%" note="SMS / email / push" trend="Healthy"/><Stat label="Unread parent msgs" value="23" note="Require response" trend="-8"/><Stat label="Announcements" value="4" note="Active this week" trend="Current"/></section><div className="subnav"><button className="selected">Inbox</button><button>Announcements</button><button>Parents</button><button>Templates</button><button>Notifications</button></div><Card title="Communication Centre" subtitle="School-wide messages and parent engagement" action="＋ New message"><DataTable headers={['Sender','Subject','Audience','Time','Status']} rows={messages} statusColumn={4}/></Card></>;
}

function AIIntelligence() {
  return <><section className="ask-ai-panel"><div className="ask-ai-head"><div className="ai-orb large">✦</div><div><span>SchoolOS Intelligence</span><h2>Ask anything about your school.</h2><p>Answers respect your active school, role and permissions.</p></div></div><div className="ask-box"><input placeholder="Why did JSS 2 performance decline this term?"/><button>Ask AI →</button></div><div className="suggestions"><button>Which students need support?</button><button>Which teachers are behind syllabus?</button><button>Summarize today's school activity</button><button>Compare this term with last term</button></div></section>
    <section className="stat-grid"><Stat label="Insights today" value="12" note="5 need attention" trend="Live"/><Stat label="Students flagged" value="18" note="Academic early warning" trend="-4"/><Stat label="Compliance checks" value="142" note="Lesson activities reviewed" trend="96%"/><Stat label="AI usage" value="64%" note="Monthly allowance" trend="Within plan"/></section>
    <section className="dashboard-grid"><Card title="Priority Recommendations" subtitle="Generated from authorized school data"><Alert tone="danger" title="Intervene in JSS 2A attendance" text="Contact guardians for six students with repeated absences and review class-level factors."/><Alert tone="warning" title="Support Primary 5 Mathematics" text="Review syllabus plan and schedule a catch-up period before the next assessment."/><Alert tone="info" title="Recognize English improvement" text="JSS 3 English is outperforming its previous-term baseline by 8.2%."/></Card><Card title="AI Agents" subtitle="Specialized intelligence across SchoolOS"><Agent name="Principal AI" status="Active" text="Management summaries and operational risks"/><Agent name="Academic AI" status="Active" text="Assessments, curriculum and student progress"/><Agent name="Teacher AI" status="Active" text="Lesson planning and teaching support"/><Agent name="Finance AI" status="Active" text="Fees, collections and financial patterns"/></Card></section></>;
}

function Reports() {
  const reports=[['Executive School Report','Management','Today, 08:00','Ready'],['Attendance Summary','Attendance','Yesterday','Ready'],['Teacher Activity Report','Teachers','Sep 12','Ready'],['Fee Collection Report','Finance','Sep 12','Ready'],['Academic Performance Report','Academics','Sep 10','Ready']];
  return <><section className="report-hero"><div><small>SMART REPORTING</small><h2>Turn school activity into decisions.</h2><p>Generate management, academic, finance and compliance reports from the same trusted workspace.</p></div><button className="primary-btn">＋ Create report</button></section><Card title="Recent Reports" subtitle="Generated and scheduled reports"><DataTable headers={['Report','Category','Generated','Status']} rows={reports} statusColumn={3}/></Card></>;
}

function Settings() {
  return <div className="settings-layout"><aside className="settings-nav"><button className="active">School profile</button><button>Campuses</button><button>Academic setup</button><button>Users & roles</button><button>Billing</button><button>Integrations</button><button>Storage</button><button>AI controls</button><button>Audit log</button></aside><div className="settings-panel"><div className="settings-title"><div><h2>School Profile</h2><p>Core information used across your SchoolOS workspace.</p></div><button className="primary-btn">Save changes</button></div><div className="form-grid"><Field label="School name" value="BrightGate Academy"/><Field label="Workspace slug" value="brightgate"/><Field label="School type" value="Nursery, Primary & Secondary"/><Field label="Main campus" value="Kaduna Campus"/><Field label="Academic session" value="2026/2027"/><Field label="Current term" value="First Term"/></div><div className="settings-section"><h3>Subscription</h3><div className="subscription-card"><div><small>CURRENT PRICING</small><strong>₦500 per active student / term</strong><p>648 active students · projected term charge ₦324,000</p></div><Status text="Active"/></div></div><div className="settings-section"><h3>Infrastructure</h3><div className="infra-grid"><div><span>Object storage</span><strong>Wasabi</strong><small>Private S3-compatible tenant storage</small></div><div><span>Database</span><strong>PostgreSQL</strong><small>Tenant-scoped operational data</small></div><div><span>AI security</span><strong>Permission gated</strong><small>AI retrieval follows role + tenant boundary</small></div></div></div></div></div>;
}

function Stat({ label, value, note, trend, down=false }: { label:string; value:string; note:string; trend:string; down?:boolean }) { return <article className="stat-card"><div className="stat-top"><span>{label}</span><b className={down?'negative':''}>{trend}</b></div><strong>{value}</strong><p>{note}</p></article>; }
function Card({ title, subtitle, children, action, badge, onAction }: { title:string; subtitle:string; children:React.ReactNode; action?:string; badge?:string; onAction?:()=>void }) { return <section className="card"><div className="card-head"><div><h2>{title}</h2><p>{subtitle}</p></div>{badge?<b className="count-badge">{badge}</b>:action?<button onClick={onAction}>{action}</button>:null}</div>{children}</section>; }
function Avatar({ name }: {name:string}) { const initials=name.replace(/(Mrs\.|Mr\.|Dr\.)/g,'').trim().split(' ').slice(0,2).map(x=>x[0]).join(''); return <div className="avatar">{initials}</div>; }
function Status({ text }:{text:string}) { const cls=text.toLowerCase().replace(/\s/g,'-'); return <span className={`status ${cls}`}>{text}</span>; }
function MiniProgress({label,value}:{label:string;value:number}) { return <div className="mini-progress"><span>{label}</span><i><b style={{width:`${value}%`}}/></i><small>{value}%</small></div>; }
function MetricBar({label,value}:{label:string;value:number}) { return <div className="metric-bar"><div><span>{label}</span><b>{value}%</b></div><i><b style={{width:`${value}%`}}/></i></div>; }
function Alert({tone,title,text}:{tone:'danger'|'warning'|'info';title:string;text:string}) { return <div className="alert-row"><i className={tone}>!</i><div><strong>{title}</strong><p>{text}</p></div><button>→</button></div>; }
function Agent({name,status,text}:{name:string;status:string;text:string}) { return <div className="agent-row"><div className="agent-icon">✦</div><div><strong>{name}</strong><p>{text}</p></div><Status text={status}/></div>; }
function DataTable({headers,rows,statusColumn}:{headers:string[];rows:string[][];statusColumn?:number}) { return <div className="table-wrap"><table><thead><tr>{headers.map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((r,i)=><tr key={i}>{r.map((cell,j)=><td key={j}>{j===statusColumn?<Status text={cell}/>:cell}</td>)}</tr>)}</tbody></table></div>; }
function Field({label,value}:{label:string;value:string}) { return <label className="field"><span>{label}</span><input defaultValue={value}/></label>; }
function getSubtitle(page:PageKey) { const map:Record<PageKey,string>={overview:'',students:'Manage enrollment, profiles and student health.',teachers:'Support teachers with activity, workload and performance intelligence.',academics:'Classes, subjects, timetables, lesson plans and curriculum progression.',attendance:'Monitor student and staff attendance across every campus.',results:'Assessments, grading, report cards and academic intelligence.',finance:'Fees, payments, outstanding balances and school financial operations.',communication:'Connect management, staff, parents and students.',ai:'Ask questions, surface risks and turn school data into action.',reports:'Generate operational and decision-ready reports.',settings:'Configure your school workspace, users, billing and integrations.'}; return map[page]; }
