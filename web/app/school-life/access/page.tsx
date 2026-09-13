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
    note: "Owner-level prototype access across the complete School Life layer and school-wide academic structure.",
    capabilities: [
      { module: "Community", level: "Manage school-wide", detail: "Post, moderate, pin and approve selected public-showcase content across the school.", href: "/community" },
      { module: "Noticeboard", level: "Publish school-wide", detail: "Publish whole-school, campus, section or audience-specific official notices and emergencies.", href: "/noticeboard" },
      { module: "Activities & Clubs", level: "Manage all", detail: "Create programmes, clubs, sports and enrichment activities and appoint coordinators.", href: "/activities" },
      { module: "Events & Calendar", level: "Manage all", detail: "Create school-wide and section calendar events and resolve school-level scheduling conflicts.", href: "/events" },
      { module: "Houses & Teams", level: "Manage all", detail: "Configure houses, coordinators, captains, competitions and school-life points.", href: "/houses" },
      { module: "Media Gallery", level: "Approve visibility", detail: "Manage albums and approve parent/public showcase visibility subject to consent rules.", href: "/gallery" },
      { module: "Excursions & Consent", level: "Manage all", detail: "Approve trips, transport/readiness workflows and school-wide excursion policy.", href: "/excursions" },
      { module: "Service & Volunteering", level: "Manage all", detail: "Create or approve school/community service programmes and recognition policy.", href: "/service" },
      { module: "Awards & Recognition", level: "Issue & publish", detail: "Approve school-wide awards and decide internal, parent or public visibility.", href: "/awards" },
      { module: "Teaching Models", level: "Configure all sections", detail: "Set Class Teacher, Subject Teacher or Hybrid structures across Nursery, Primary and Secondary.", href: "/teaching-models" },
    ],
  },
  principal: {
    label: "Principal",
    scope: "Secondary School",
    note: "Secondary leadership access. Whole-school ownership controls remain outside this workspace.",
    capabilities: [
      { module: "Community", level: "Manage Secondary", detail: "Post and moderate Secondary conversations, classes and approved staff/student audiences.", href: "/community" },
      { module: "Noticeboard", level: "Publish Secondary", detail: "Publish official Secondary notices, including class- or year-specific announcements.", href: "/noticeboard" },
      { module: "Activities & Clubs", level: "Manage Secondary", detail: "Manage Secondary clubs, sports and coordinators within section scope.", href: "/activities" },
      { module: "Events & Calendar", level: "Manage Secondary", detail: "Create Secondary events and propose whole-school events for owner approval.", href: "/events" },
      { module: "Houses & Teams", level: "Coordinate Secondary", detail: "Manage Secondary participation, teams and house activities without overriding school-wide structure.", href: "/houses" },
      { module: "Media Gallery", level: "Manage Secondary media", detail: "Create section albums; public showcase remains subject to school policy and approval.", href: "/gallery" },
      { module: "Excursions & Consent", level: "Manage Secondary trips", detail: "Coordinate consent, transport and readiness for Secondary excursions.", href: "/excursions" },
      { module: "Service & Volunteering", level: "Manage Secondary", detail: "Coordinate age-appropriate Secondary service projects and participation records.", href: "/service" },
      { module: "Awards & Recognition", level: "Issue Secondary awards", detail: "Recognize Secondary students, teachers, teams and clubs without school-wide override.", href: "/awards" },
      { module: "Teaching Models", level: "Configure Secondary", detail: "Manage subject-teacher/class-tutor structures and approved Secondary assignments.", href: "/teaching-models" },
    ],
  },
  headmaster: {
    label: "Headmistress",
    scope: "Primary School",
    note: "Primary leadership access, including schools that use one class teacher for most subjects.",
    capabilities: [
      { module: "Community", level: "Manage Primary", detail: "Post and moderate Primary community content and class/guardian discussions.", href: "/community" },
      { module: "Noticeboard", level: "Publish Primary", detail: "Publish official Primary notices to all Primary families or selected classes.", href: "/noticeboard" },
      { module: "Activities & Clubs", level: "Manage Primary", detail: "Coordinate Primary clubs, sports and enrichment activities.", href: "/activities" },
      { module: "Events & Calendar", level: "Manage Primary", detail: "Create Primary events, parent meetings and section activities within scope.", href: "/events" },
      { module: "Houses & Teams", level: "Coordinate Primary", detail: "Manage Primary house participation and teams within the configured school structure.", href: "/houses" },
      { module: "Media Gallery", level: "Manage Primary media", detail: "Create parent-visible Primary albums subject to configured media permissions.", href: "/gallery" },
      { module: "Excursions & Consent", level: "Manage Primary trips", detail: "Coordinate Primary trips, consent, transport and supervision readiness.", href: "/excursions" },
      { module: "Service & Volunteering", level: "Manage Primary", detail: "Coordinate age-appropriate Primary service and peer-support activities.", href: "/service" },
      { module: "Awards & Recognition", level: "Issue Primary awards", detail: "Recognize pupils, teachers, houses, clubs and positive contribution within Primary.", href: "/awards" },
      { module: "Teaching Models", level: "Configure Primary", detail: "Choose Class Teacher, Subject Teacher or Hybrid per Primary class.", href: "/teaching-models" },
    ],
  },
  headteacher: {
    label: "Head Teacher",
    scope: "Nursery / Early Years",
    note: "Early Years leadership access with child-safe, developmentally appropriate participation and recognition.",
    capabilities: [
      { module: "Community", level: "Manage Early Years", detail: "Post updates mainly for educators and guardians; direct young-child participation stays school-policy controlled.", href: "/community" },
      { module: "Noticeboard", level: "Publish Early Years", detail: "Publish official Nursery / Reception notices and guardian updates within section scope.", href: "/noticeboard" },
      { module: "Activities & Clubs", level: "Manage Early Years", detail: "Coordinate play, movement, creative activities and age-appropriate enrichment.", href: "/activities" },
      { module: "Events & Calendar", level: "Manage Early Years", detail: "Create family mornings, celebrations and Early Years events within section scope.", href: "/events" },
      { module: "Houses & Teams", level: "View / age-appropriate participation", detail: "Use only age-appropriate house or group activities; avoid competitive ranking of young children.", href: "/houses" },
      { module: "Media Gallery", level: "Manage Early Years media", detail: "Create guardian-facing albums subject to child-media consent and visibility rules.", href: "/gallery" },
      { module: "Excursions & Consent", level: "Manage Early Years trips", detail: "Coordinate age-appropriate outings, consent, supervision and minimum necessary safety information.", href: "/excursions" },
      { module: "Service & Volunteering", level: "Age-appropriate activities", detail: "Use simple participation and kindness/community activities rather than mandatory service hours.", href: "/service" },
      { module: "Awards & Recognition", level: "Issue Early Years recognition", detail: "Celebrate kindness, creativity, participation and milestones without ranking children.", href: "/awards" },
      { module: "Teaching Models", level: "Configure Early Years", detail: "Use room lead/class teacher, assistants and specialist-support patterns by group.", href: "/teaching-models" },
    ],
  },
  teacher: {
    label: "Teacher",
    scope: "Assigned classes / activities",
    note: "Participation-oriented access. Teachers do not automatically receive whole-school publishing or configuration authority.",
    capabilities: [
      { module: "Community", level: "Post & comment in scope", detail: "Participate in assigned class, staff, club and permitted school-community audiences.", href: "/community" },
      { module: "Noticeboard", level: "View / delegated class notice", detail: "View official notices; class-level publishing requires explicit delegation by school leadership.", href: "/noticeboard" },
      { module: "Activities & Clubs", level: "Manage assigned activities", detail: "Coordinate only clubs, teams or activities where the teacher is assigned as coordinator.", href: "/activities" },
      { module: "Events & Calendar", level: "View / propose", detail: "View relevant events and propose class/club events; publishing depends on delegated authority.", href: "/events" },
      { module: "Houses & Teams", level: "Assigned coordination", detail: "View houses and manage only teams or house duties explicitly assigned to the teacher.", href: "/houses" },
      { module: "Media Gallery", level: "Contribute in scope", detail: "Add media to permitted class/activity albums; visibility approval remains leadership-controlled.", href: "/gallery" },
      { module: "Excursions & Consent", level: "Supervise assigned trips", detail: "View participant/readiness information necessary for trips the teacher supervises.", href: "/excursions" },
      { module: "Service & Volunteering", level: "Coordinate assigned projects", detail: "Record participation only for projects the teacher is assigned to supervise.", href: "/service" },
      { module: "Awards & Recognition", level: "Nominate / view", detail: "Nominate students or activities for recognition; final award approval remains leadership-controlled.", href: "/awards" },
      { module: "Teaching Models", level: "View only", detail: "See the configured class/subject model relevant to assigned teaching responsibilities.", href: "/teaching-models" },
    ],
  },
};

const fallback: RolePolicy = {
  label: "School member",
  scope: "Policy-controlled",
  note: "The final system will resolve these permissions from the authenticated membership and school policy.",
  capabilities: [
    { module: "Community", level: "Policy controlled", detail: "Audience and posting rights depend on role, section and school configuration.", href: "/community" },
    { module: "Noticeboard", level: "View", detail: "Official publishing requires authorized leadership permission.", href: "/noticeboard" },
    { module: "Activities & Clubs", level: "View / participate", detail: "Participation and coordination depend on assignment and consent.", href: "/activities" },
    { module: "Events & Calendar", level: "View relevant", detail: "Relevant school and section events are visible according to audience.", href: "/events" },
    { module: "Houses & Teams", level: "View / participate", detail: "House/team access depends on membership and school policy.", href: "/houses" },
    { module: "Media Gallery", level: "View permitted", detail: "Albums respect audience and consent visibility.", href: "/gallery" },
    { module: "Excursions & Consent", level: "View relevant", detail: "Trip information and consent actions depend on role and participant relationship.", href: "/excursions" },
    { module: "Service & Volunteering", level: "View / participate", detail: "Participation depends on programme eligibility and age-appropriate policy.", href: "/service" },
    { module: "Awards & Recognition", level: "View", detail: "Nomination and approval permissions depend on role.", href: "/awards" },
    { module: "Teaching Models", level: "View", detail: "Configuration is restricted to authorized academic leadership.", href: "/teaching-models" },
  ],
};

export default function SchoolLifeAccessPage() {
  const params = useSearchParams();
  const portal = params.get("portal") ?? "";
  const policy = policies[portal] ?? fallback;
  const suffix = portal ? `?portal=${portal}` : "";

  return (
    <main className="school-life-page">
      <SchoolLifeNav active="access" />
      <section className="school-life-scope"><div><strong>{policy.label}</strong><span>{policy.scope}</span></div><p>{policy.note}</p></section>
      <section className="school-life-stat-grid">
        <article className="school-life-stat"><span>Active role</span><strong>{policy.label}</strong><small>UI prototype context</small></article>
        <article className="school-life-stat"><span>Scope</span><strong style={{fontSize:16}}>{policy.scope}</strong><small>Does not expand automatically</small></article>
        <article className="school-life-stat"><span>Shared modules</span><strong>10</strong><small>One School Life layer</small></article>
        <article className="school-life-stat"><span>Cross-section override</span><strong>Off</strong><small>Separate membership required</small></article>
        <article className="school-life-stat"><span>Backend enforcement</span><strong>Later</strong><small>Current phase is UI only</small></article>
      </section>
      <section className="school-life-grid">
        <article className="school-life-card"><div className="school-life-section-head"><div><h2>Role permissions</h2><p>What this portal should be able to do when School Life is connected to production authorization.</p></div></div><div className="school-life-policy-list">{policy.capabilities.map((item) => <Link key={item.module} href={`${item.href}${suffix}`} style={{textDecoration:"none",color:"inherit"}}><div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:12,alignItems:"start"}}><div><strong style={{fontSize:13}}>{item.module}</strong><small>{item.detail}</small></div><span style={{fontSize:9,fontWeight:900,padding:"6px 8px",borderRadius:999,background:"#edf3f8",color:"#4f6982",whiteSpace:"nowrap"}}>{item.level}</span></div></Link>)}</div></article>
        <aside className="school-life-sidebar"><article className="school-life-card"><span className="school-life-kicker">ACCESS PRINCIPLE</span><h3 style={{margin:"5px 0 8px"}}>One module, different authority</h3><p style={{margin:0,color:"#69768a",fontSize:12,lineHeight:1.65}}>SchoolOS should reuse the same school-wide modules while membership, campus, section, class and delegated permissions determine what each person can see or do.</p></article><article className="school-life-card"><span className="school-life-kicker">PRODUCTION RULE</span><h3 style={{margin:"5px 0 8px"}}>UI permissions are not security</h3><p style={{margin:0,color:"#69768a",fontSize:12,lineHeight:1.65}}>These controls demonstrate intended workflow only. Final posting, media visibility, consent, award approval, trip access and teaching-model changes must be authorized server-side.</p></article></aside>
      </section>
    </main>
  );
}
