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
    note: "Owner-level prototype access across school-wide community, official notices, co-curricular structure, recognition and academic structure.",
    capabilities: [
      { module: "Community", level: "Manage school-wide", detail: "Post, moderate, pin and approve selected public-showcase content across the school.", href: "/community" },
      { module: "Noticeboard", level: "Publish school-wide", detail: "Publish whole-school, campus, section or audience-specific official notices and emergencies.", href: "/noticeboard" },
      { module: "Activities & Clubs", level: "Manage all", detail: "Create school-wide programmes, houses, clubs, sports and excursions and appoint coordinators.", href: "/activities" },
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
      { module: "Activities & Clubs", level: "Manage Secondary", detail: "Manage Secondary clubs, sports, trips and coordinators within section scope.", href: "/activities" },
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
      { module: "Activities & Clubs", level: "Manage Primary", detail: "Coordinate Primary clubs, sports, houses, excursions and participation.", href: "/activities" },
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
      { module: "Activities & Clubs", level: "Manage Early Years", detail: "Coordinate play, movement, creative activities, events and age-appropriate trips.", href: "/activities" },
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

      <section className="school-life-scope">
        <div><strong>{policy.label}</strong><span>{policy.scope}</span></div>
        <p>{policy.note}</p>
      </section>

      <section className="school-life-stat-grid">
        <article className="school-life-stat"><span>Active role</span><strong>{policy.label}</strong><small>UI prototype context</small></article>
        <article className="school-life-stat"><span>Scope</span><strong style={{fontSize:16}}>{policy.scope}</strong><small>Does not expand automatically</small></article>
        <article className="school-life-stat"><span>Shared modules</span><strong>5</strong><small>One School Life layer</small></article>
        <article className="school-life-stat"><span>Cross-section override</span><strong>Off</strong><small>Separate membership required</small></article>
        <article className="school-life-stat"><span>Backend enforcement</span><strong>Later</strong><small>Current phase is UI only</small></article>
      </section>

      <section className="school-life-grid">
        <article className="school-life-card">
          <div className="school-life-section-head"><div><h2>Role permissions</h2><p>What this portal should be able to do when School Life is connected to production authorization.</p></div></div>
          <div className="school-life-policy-list">
            {policy.capabilities.map((item) => (
              <Link key={item.module} href={`${item.href}${suffix}`} style={{textDecoration:"none",color:"inherit"}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:12,alignItems:"start"}}>
                  <div><strong style={{fontSize:13}}>{item.module}</strong><small>{item.detail}</small></div>
                  <span style={{fontSize:9,fontWeight:900,padding:"6px 8px",borderRadius:999,background:"#edf3f8",color:"#4f6982",whiteSpace:"nowrap"}}>{item.level}</span>
                </div>
              </Link>
            ))}
          </div>
        </article>

        <aside className="school-life-sidebar">
          <article className="school-life-card">
            <span className="school-life-kicker">ACCESS PRINCIPLE</span>
            <h3 style={{margin:"5px 0 8px"}}>One module, different authority</h3>
            <p style={{margin:0,color:"#69768a",fontSize:12,lineHeight:1.65}}>SchoolOS should not build separate Community or Noticeboard systems for every portal. The same school-wide module is reused, while membership, campus, section, class and delegated permissions determine what each person can see or do.</p>
          </article>
          <article className="school-life-card">
            <span className="school-life-kicker">PRODUCTION RULE</span>
            <h3 style={{margin:"5px 0 8px"}}>UI permissions are not security</h3>
            <p style={{margin:0,color:"#69768a",fontSize:12,lineHeight:1.65}}>These controls currently demonstrate the intended workflow only. Final posting, moderation, notice publishing, award approval and teaching-model changes must be authorized server-side.</p>
          </article>
        </aside>
      </section>
    </main>
  );
}
