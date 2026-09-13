import Link from "next/link";
import "../school-life.css";

const modules = [
  { title:"Community", href:"/community", tag:"Social", description:"Private school discussion feed with posts, comments, reactions, scoped audiences, moderation and approved public showcase content." },
  { title:"Noticeboard", href:"/noticeboard", tag:"Official", description:"Authoritative announcements with publishing authority, urgency, audience scope, expiry, read receipts and acknowledgement." },
  { title:"Activities & Clubs", href:"/activities", tag:"Co-curricular", description:"Sports, clubs, creative programmes and enrichment activities with coordinators, schedules, attendance and participation." },
  { title:"Events & Calendar", href:"/events", tag:"Calendar", description:"One school calendar for parent meetings, sports days, section events, club showcases, academic events and holidays." },
  { title:"Houses & Teams", href:"/houses", tag:"Belonging", description:"School houses, captains, coordinators, points, competitions and service activity without affecting academic grades." },
  { title:"Media Gallery", href:"/gallery", tag:"Media", description:"Audience-scoped photo and video albums with internal, parent and separately approved public-showcase visibility." },
  { title:"Excursions & Consent", href:"/excursions", tag:"Trips", description:"Trip planning, destinations, transport, guardian consent, manifests, emergency-readiness checks and supervision." },
  { title:"Service & Volunteering", href:"/service", tag:"Community", description:"Supervised school and community projects, participants, service hours and contribution records separate from academic marks." },
  { title:"Awards & Recognition", href:"/awards", tag:"Recognition", description:"Celebrate students, teachers, teams, houses, clubs and service without turning recognition into permanent ranking." },
  { title:"Teaching Models", href:"/teaching-models", tag:"Academic structure", description:"Configure Class Teacher, Subject Teacher or Hybrid models by section and class—including one-class-one-teacher Primary structures." },
];

export default function SchoolLifeHub(){
  return <main className="school-life-page">
    <header className="school-life-header"><div><span className="school-life-kicker">SCHOOL-WIDE FOUNDATION · BRIGHTGATE ACADEMY</span><h1>School Life</h1><p>Everything that connects the school community beyond marks, attendance and fees.</p></div><Link className="school-life-back" href="/">Back to SchoolOS</Link></header>
    <section className="school-life-scope"><div><strong>One shared layer for every portal</strong><span>Role-aware in production</span></div><p>Parents, teachers, students and leaders can see the parts relevant to them, while publishing, moderation, consent, recognition and configuration rights remain role- and scope-controlled.</p></section>
    <section className="school-life-stat-grid"><article className="school-life-stat"><span>Shared modules</span><strong>{modules.length}</strong><small>School-wide foundation</small></article><article className="school-life-stat"><span>Leadership scopes</span><strong>4</strong><small>Owner + 3 academic sections</small></article><article className="school-life-stat"><span>Community layer</span><strong>1</strong><small>Reused by every portal</small></article><article className="school-life-stat"><span>Academic ranking</span><strong>Separate</strong><small>School Life does not alter grades</small></article><article className="school-life-stat"><span>Current phase</span><strong>UI</strong><small>Mock state only</small></article></section>
    <section className="school-life-card" style={{maxWidth:1400,margin:"0 auto"}}><div className="school-life-section-head"><div><h2>School-wide modules</h2><p>These routes become shared destinations from Proprietor, Principal, Headmaster, Head Teacher, Teacher, Parent and Student portals.</p></div></div><div className="school-life-policy-list">{modules.map(module=><Link href={module.href} key={module.href} style={{textDecoration:"none",color:"inherit",display:"block"}}><div><span className="school-life-kicker">{module.tag}</span><strong style={{fontSize:15,marginTop:4}}>{module.title}</strong><small>{module.description}</small></div></Link>)}</div></section>
  </main>;
}
