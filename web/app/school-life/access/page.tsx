"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import SchoolLifeNav from "../../../components/school-life-nav";
import "../../school-life.css";

type Capability = { module: string; level: string; detail: string; href: string };
type RolePolicy = { label: string; scope: string; note: string; capabilities: Capability[] };

const policies: Record<string, RolePolicy> = {
  proprietor: {
    label: "Proprietor",
    scope: "Whole school",
    note: "Owner-level prototype access across the complete School Life and school operations layer.",
    capabilities: [
      { module:"Community",level:"Manage school-wide",detail:"Post, moderate, pin and approve selected public-showcase content across the school.",href:"/community" },
      { module:"Noticeboard",level:"Publish school-wide",detail:"Publish whole-school, campus, section or audience-specific official notices and emergencies.",href:"/noticeboard" },
      { module:"Activities & Clubs",level:"Manage all",detail:"Create programmes, clubs, sports and enrichment activities and appoint coordinators.",href:"/activities" },
      { module:"Events & Calendar",level:"Manage all",detail:"Create school-wide and section events and resolve school-level scheduling conflicts.",href:"/events" },
      { module:"Houses & Teams",level:"Manage all",detail:"Configure houses, coordinators, captains, competitions and school-life points.",href:"/houses" },
      { module:"Media Gallery",level:"Approve visibility",detail:"Manage albums and approve parent/public showcase visibility subject to consent rules.",href:"/gallery" },
      { module:"Excursions & Consent",level:"Manage all",detail:"Approve trips, consent, transport/readiness workflows and excursion policy.",href:"/excursions" },
      { module:"School Transport",level:"Manage fleet & routes",detail:"Configure vehicles, routes, transport staff, service availability and school-wide transport policy.",href:"/transport" },
      { module:"Meals & Cafeteria",level:"Manage service",detail:"Configure meal service, menus and operational policy while sensitive exceptions remain need-to-know.",href:"/meals" },
      { module:"Boarding & Hostel",level:"Configure / disable",detail:"Enable or disable boarding and manage dorm structure, capacity and delegated boarding leadership.",href:"/boarding" },
      { module:"Assembly & Faith",level:"Configure school-wide",detail:"Set assembly, civic, wellbeing and optional faith-programme structures and participation policy.",href:"/assembly" },
      { module:"Visitor Management",level:"Govern front office",detail:"Set visitor-access policy and review operational visitor controls without making logs public.",href:"/visitors" },
      { module:"Lost & Found",level:"Manage policy",detail:"Configure retention/claim policy and front-office ownership of found-item records.",href:"/lost-found" },
      { module:"Service & Volunteering",level:"Manage all",detail:"Create or approve school/community service programmes and recognition policy.",href:"/service" },
      { module:"Awards & Recognition",level:"Issue & publish",detail:"Approve school-wide awards and decide internal, parent or public visibility.",href:"/awards" },
      { module:"Teaching Models",level:"Configure all sections",detail:"Set Class Teacher, Subject Teacher or Hybrid structures across Nursery, Primary and Secondary.",href:"/teaching-models" },
    ],
  },
  principal: {
    label: "Principal",
    scope: "Secondary School",
    note: "Secondary leadership access. Whole-school ownership and cross-section controls remain outside this workspace.",
    capabilities: [
      { module:"Community",level:"Manage Secondary",detail:"Post and moderate Secondary conversations and approved audiences.",href:"/community" },
      { module:"Noticeboard",level:"Publish Secondary",detail:"Publish official Secondary notices, including class- or year-specific announcements.",href:"/noticeboard" },
      { module:"Activities & Clubs",level:"Manage Secondary",detail:"Manage Secondary clubs, sports and coordinators within section scope.",href:"/activities" },
      { module:"Events & Calendar",level:"Manage Secondary",detail:"Create Secondary events and propose whole-school events for owner approval.",href:"/events" },
      { module:"Houses & Teams",level:"Coordinate Secondary",detail:"Manage Secondary participation and teams without overriding school-wide house structure.",href:"/houses" },
      { module:"Media Gallery",level:"Manage Secondary media",detail:"Create section albums; public showcase remains subject to school approval.",href:"/gallery" },
      { module:"Excursions & Consent",level:"Manage Secondary trips",detail:"Coordinate consent, transport and readiness for Secondary excursions.",href:"/excursions" },
      { module:"School Transport",level:"Review Secondary riders",detail:"Review section transport exceptions and assigned-route issues without changing whole-school fleet policy.",href:"/transport" },
      { module:"Meals & Cafeteria",level:"View / escalate",detail:"See Secondary meal-service information and escalate service issues; restricted dietary details remain need-to-know.",href:"/meals" },
      { module:"Boarding & Hostel",level:"Manage Secondary boarders",detail:"Where enabled, coordinate Secondary boarding welfare, leave and section-level follow-up.",href:"/boarding" },
      { module:"Assembly & Faith",level:"Manage Secondary",detail:"Schedule Secondary assemblies and configured section programmes within school policy.",href:"/assembly" },
      { module:"Visitor Management",level:"View hosted Secondary visits",detail:"Review visitors hosted by Secondary leadership; general visitor administration remains front-office controlled.",href:"/visitors" },
      { module:"Lost & Found",level:"Section handoff",detail:"Review Secondary items held by the section and send unresolved items to front office.",href:"/lost-found" },
      { module:"Service & Volunteering",level:"Manage Secondary",detail:"Coordinate age-appropriate Secondary service projects and participation records.",href:"/service" },
      { module:"Awards & Recognition",level:"Issue Secondary awards",detail:"Recognize Secondary students, teachers, teams and clubs without school-wide override.",href:"/awards" },
      { module:"Teaching Models",level:"Configure Secondary",detail:"Manage subject-teacher/class-tutor structures and approved Secondary assignments.",href:"/teaching-models" },
    ],
  },
  headmaster: {
    label: "Headmistress",
    scope: "Primary School",
    note: "Primary leadership access, including schools that use one class teacher for most subjects.",
    capabilities: [
      { module:"Community",level:"Manage Primary",detail:"Post and moderate Primary community content and class/guardian discussions.",href:"/community" },
      { module:"Noticeboard",level:"Publish Primary",detail:"Publish official Primary notices to all Primary families or selected classes.",href:"/noticeboard" },
      { module:"Activities & Clubs",level:"Manage Primary",detail:"Coordinate Primary clubs, sports and enrichment activities.",href:"/activities" },
      { module:"Events & Calendar",level:"Manage Primary",detail:"Create Primary events, parent meetings and section activities within scope.",href:"/events" },
      { module:"Houses & Teams",level:"Coordinate Primary",detail:"Manage Primary house participation and teams within school structure.",href:"/houses" },
      { module:"Media Gallery",level:"Manage Primary media",detail:"Create parent-visible Primary albums subject to media permissions.",href:"/gallery" },
      { module:"Excursions & Consent",level:"Manage Primary trips",detail:"Coordinate Primary trips, consent, transport and supervision readiness.",href:"/excursions" },
      { module:"School Transport",level:"Review Primary riders",detail:"Coordinate Primary transport exceptions and dismissal handoff within configured routes.",href:"/transport" },
      { module:"Meals & Cafeteria",level:"Coordinate Primary service",detail:"Review Primary meal service and communicate operational issues while private dietary instructions stay restricted.",href:"/meals" },
      { module:"Boarding & Hostel",level:"Manage Primary boarders",detail:"Where enabled, coordinate Primary boarding routines and approved leave within delegated scope.",href:"/boarding" },
      { module:"Assembly & Faith",level:"Manage Primary",detail:"Schedule Primary assemblies and configured age-appropriate programmes.",href:"/assembly" },
      { module:"Visitor Management",level:"View hosted Primary visits",detail:"Review visitors hosted by the Primary office; front desk retains general visitor administration.",href:"/visitors" },
      { module:"Lost & Found",level:"Section handoff",detail:"Manage Primary found items before transfer to front office where needed.",href:"/lost-found" },
      { module:"Service & Volunteering",level:"Manage Primary",detail:"Coordinate age-appropriate Primary service and peer-support activities.",href:"/service" },
      { module:"Awards & Recognition",level:"Issue Primary awards",detail:"Recognize pupils, teachers, houses, clubs and positive contribution within Primary.",href:"/awards" },
      { module:"Teaching Models",level:"Configure Primary",detail:"Choose Class Teacher, Subject Teacher or Hybrid per Primary class.",href:"/teaching-models" },
    ],
  },
  headteacher: {
    label: "Head Teacher",
    scope: "Nursery / Early Years",
    note: "Early Years leadership access with child-safe, developmentally appropriate participation and operations.",
    capabilities: [
      { module:"Community",level:"Manage Early Years",detail:"Post updates mainly for educators and guardians; direct young-child participation remains policy controlled.",href:"/community" },
      { module:"Noticeboard",level:"Publish Early Years",detail:"Publish official Nursery / Reception notices and guardian updates.",href:"/noticeboard" },
      { module:"Activities & Clubs",level:"Manage Early Years",detail:"Coordinate play, movement, creative activities and age-appropriate enrichment.",href:"/activities" },
      { module:"Events & Calendar",level:"Manage Early Years",detail:"Create family mornings, celebrations and Early Years events.",href:"/events" },
      { module:"Houses & Teams",level:"Age-appropriate only",detail:"Use only age-appropriate group activities and avoid competitive ranking of young children.",href:"/houses" },
      { module:"Media Gallery",level:"Manage Early Years media",detail:"Create guardian-facing albums subject to child-media consent and visibility rules.",href:"/gallery" },
      { module:"Excursions & Consent",level:"Manage Early Years trips",detail:"Coordinate age-appropriate outings, consent and minimum necessary safety information.",href:"/excursions" },
      { module:"School Transport",level:"Coordinate child handoff",detail:"Review Early Years transport/handoff exceptions only for authorized children and routes.",href:"/transport" },
      { module:"Meals & Cafeteria",level:"Coordinate Early Years meals",detail:"Review meal service and safe feeding instructions without exposing private health or family details.",href:"/meals" },
      { module:"Boarding & Hostel",level:"Usually not applicable",detail:"Early Years boarding can remain hidden unless the school explicitly configures an appropriate programme.",href:"/boarding" },
      { module:"Assembly & Faith",level:"Manage Early Years",detail:"Schedule circle gatherings and age-appropriate configured programmes.",href:"/assembly" },
      { module:"Visitor Management",level:"View hosted Early Years visits",detail:"Review authorized visitors hosted by Early Years; child collection still requires separate pickup authorization.",href:"/visitors" },
      { module:"Lost & Found",level:"Manage Early Years items",detail:"Record and return child items through guardian/staff verification without public identifiers.",href:"/lost-found" },
      { module:"Service & Volunteering",level:"Age-appropriate activities",detail:"Use simple kindness/community activities rather than mandatory service hours.",href:"/service" },
      { module:"Awards & Recognition",level:"Issue Early Years recognition",detail:"Celebrate kindness, creativity, participation and milestones without ranking children.",href:"/awards" },
      { module:"Teaching Models",level:"Configure Early Years",detail:"Use room lead/class teacher, assistants and specialist-support patterns by group.",href:"/teaching-models" },
    ],
  },
  teacher: {
    label: "Teacher",
    scope: "Assigned classes / activities",
    note: "Participation-oriented access. Teachers do not automatically receive school-wide publishing, visitor-log or operations authority.",
    capabilities: [
      { module:"Community",level:"Post & comment in scope",detail:"Participate in assigned class, staff, club and permitted community audiences.",href:"/community" },
      { module:"Noticeboard",level:"View / delegated class notice",detail:"View official notices; class publishing requires explicit delegation.",href:"/noticeboard" },
      { module:"Activities & Clubs",level:"Manage assigned activities",detail:"Coordinate only clubs, teams or activities explicitly assigned to the teacher.",href:"/activities" },
      { module:"Events & Calendar",level:"View / propose",detail:"View relevant events and propose class/club events; publishing depends on authority.",href:"/events" },
      { module:"Houses & Teams",level:"Assigned coordination",detail:"Manage only teams or house duties explicitly assigned to the teacher.",href:"/houses" },
      { module:"Media Gallery",level:"Contribute in scope",detail:"Add media to permitted class/activity albums; visibility approval remains leadership-controlled.",href:"/gallery" },
      { module:"Excursions & Consent",level:"Supervise assigned trips",detail:"View participant/readiness information necessary for trips the teacher supervises.",href:"/excursions" },
      { module:"School Transport",level:"Assigned duty only",detail:"See only transport details required for an assigned dismissal, route or supervision duty.",href:"/transport" },
      { module:"Meals & Cafeteria",level:"View menu / safe instruction",detail:"View menus and only meal instructions necessary for assigned students; no broad dietary records.",href:"/meals" },
      { module:"Boarding & Hostel",level:"Assigned duty only",detail:"Where applicable, access only dorm/duty information explicitly assigned to the staff member.",href:"/boarding" },
      { module:"Assembly & Faith",level:"View / lead assigned session",detail:"View schedules and lead only sessions or activities assigned to the teacher.",href:"/assembly" },
      { module:"Visitor Management",level:"Host only",detail:"View or confirm visitors for whom the teacher is the named host; no general visitor-log access.",href:"/visitors" },
      { module:"Lost & Found",level:"Report / handoff",detail:"Log a found item or support verified return; retention policy remains front-office controlled.",href:"/lost-found" },
      { module:"Service & Volunteering",level:"Coordinate assigned projects",detail:"Record participation only for projects the teacher is assigned to supervise.",href:"/service" },
      { module:"Awards & Recognition",level:"Nominate / view",detail:"Nominate students or activities; final award approval remains leadership-controlled.",href:"/awards" },
      { module:"Teaching Models",level:"View only",detail:"See the configured class/subject model relevant to assigned teaching responsibilities.",href:"/teaching-models" },
    ],
  },
};

const fallback: RolePolicy = {
  label: "School member",
  scope: "Policy-controlled",
  note: "The final system will resolve permissions from authenticated membership, school configuration and delegated duties.",
  capabilities: [
    {module:"Community",level:"Policy controlled",detail:"Audience and posting rights depend on role and scope.",href:"/community"},
    {module:"Noticeboard",level:"View",detail:"Official publishing requires authorized leadership permission.",href:"/noticeboard"},
    {module:"Activities & Clubs",level:"View / participate",detail:"Participation depends on assignment and consent.",href:"/activities"},
    {module:"Events & Calendar",level:"View relevant",detail:"Relevant school and section events are visible by audience.",href:"/events"},
    {module:"Houses & Teams",level:"View / participate",detail:"Access depends on membership and school policy.",href:"/houses"},
    {module:"Media Gallery",level:"View permitted",detail:"Albums respect audience and consent visibility.",href:"/gallery"},
    {module:"Excursions & Consent",level:"View relevant",detail:"Trip information depends on role and participant relationship.",href:"/excursions"},
    {module:"School Transport",level:"View own relationship",detail:"Route detail is limited to authorized riders, guardians or assigned staff.",href:"/transport"},
    {module:"Meals & Cafeteria",level:"View menu",detail:"General menus may be visible; sensitive exceptions stay restricted.",href:"/meals"},
    {module:"Boarding & Hostel",level:"If applicable",detail:"Visible only when boarding is enabled and the member has a relevant relationship.",href:"/boarding"},
    {module:"Assembly & Faith",level:"View relevant",detail:"Schedules follow school configuration and audience rules.",href:"/assembly"},
    {module:"Visitor Management",level:"Restricted",detail:"General visitor logs are not community-visible.",href:"/visitors"},
    {module:"Lost & Found",level:"View safe listing",detail:"Only non-identifying item information should be broadly visible.",href:"/lost-found"},
    {module:"Service & Volunteering",level:"View / participate",detail:"Participation depends on programme eligibility and age policy.",href:"/service"},
    {module:"Awards & Recognition",level:"View",detail:"Nomination and approval permissions depend on role.",href:"/awards"},
    {module:"Teaching Models",level:"View",detail:"Configuration is restricted to authorized academic leadership.",href:"/teaching-models"},
  ],
};

export default function SchoolLifeAccessPage() {
  const params = useSearchParams();
  const portal = params.get("portal") ?? "";
  const policy = policies[portal] ?? fallback;
  const suffix = portal ? `?portal=${portal}` : "";

  return <main className="school-life-page">
    <SchoolLifeNav active="access" />
    <section className="school-life-scope"><div><strong>{policy.label}</strong><span>{policy.scope}</span></div><p>{policy.note}</p></section>
    <section className="school-life-stat-grid"><article className="school-life-stat"><span>Active role</span><strong>{policy.label}</strong><small>UI prototype context</small></article><article className="school-life-stat"><span>Scope</span><strong style={{fontSize:16}}>{policy.scope}</strong><small>Does not expand automatically</small></article><article className="school-life-stat"><span>Shared modules</span><strong>16</strong><small>One School Life layer</small></article><article className="school-life-stat"><span>Cross-section override</span><strong>Off</strong><small>Separate membership required</small></article><article className="school-life-stat"><span>Backend enforcement</span><strong>Later</strong><small>Current phase is UI only</small></article></section>
    <section className="school-life-grid"><article className="school-life-card"><div className="school-life-section-head"><div><h2>Role permissions</h2><p>What this portal should be able to do when School Life is connected to production authorization.</p></div></div><div className="school-life-policy-list">{policy.capabilities.map(item=><Link key={item.module} href={`${item.href}${suffix}`} style={{textDecoration:"none",color:"inherit"}}><div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:12,alignItems:"start"}}><div><strong style={{fontSize:13}}>{item.module}</strong><small>{item.detail}</small></div><span style={{fontSize:9,fontWeight:900,padding:"6px 8px",borderRadius:999,background:"#edf3f8",color:"#4f6982",whiteSpace:"nowrap"}}>{item.level}</span></div></Link>)}</div></article><aside className="school-life-sidebar"><article className="school-life-card"><span className="school-life-kicker">ACCESS PRINCIPLE</span><h3 style={{margin:"5px 0 8px"}}>One module, different authority</h3><p style={{margin:0,color:"#69768a",fontSize:12,lineHeight:1.65}}>The same school-wide modules are reused while membership, campus, section, class and delegated duties determine what each person can see or do.</p></article><article className="school-life-card"><span className="school-life-kicker">PRODUCTION RULE</span><h3 style={{margin:"5px 0 8px"}}>UI permissions are not security</h3><p style={{margin:0,color:"#69768a",fontSize:12,lineHeight:1.65}}>These controls demonstrate intended workflow only. Final transport, meals, boarding, visitor, consent and publishing access must be authorized server-side.</p></article></aside></section>
  </main>;
}
