"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

type SchoolLifeSection = "access" | "community" | "noticeboard" | "activities" | "awards" | "teaching-models";

const links: { key: SchoolLifeSection; label: string; href: string }[] = [
  { key: "access", label: "Access & Roles", href: "/school-life/access" },
  { key: "community", label: "Community", href: "/community" },
  { key: "noticeboard", label: "Noticeboard", href: "/noticeboard" },
  { key: "activities", label: "Activities & Clubs", href: "/activities" },
  { key: "awards", label: "Awards & Recognition", href: "/awards" },
  { key: "teaching-models", label: "Teaching Models", href: "/teaching-models" },
];

const portalMeta: Record<string, { label: string; scope: string; returnHref: string }> = {
  proprietor: { label: "Proprietor", scope: "Whole school", returnHref: "/proprietor" },
  principal: { label: "Principal", scope: "Secondary School", returnHref: "/principal" },
  headmaster: { label: "Headmistress", scope: "Primary School", returnHref: "/headmaster" },
  headteacher: { label: "Head Teacher", scope: "Nursery / Early Years", returnHref: "/headteacher" },
  teacher: { label: "Teacher", scope: "Assigned classes / activities", returnHref: "/teacher" },
};

export default function SchoolLifeNav({ active }: { active: SchoolLifeSection }) {
  const params = useSearchParams();
  const portalKey = params.get("portal") ?? "";
  const portal = portalMeta[portalKey];
  const suffix = portalKey ? `?portal=${portalKey}` : "";

  return (
    <>
      <header className="school-life-header">
        <div>
          <span className="school-life-kicker">SCHOOL-WIDE · BRIGHTGATE ACADEMY · KADUNA CAMPUS</span>
          <h1>School Life</h1>
          <p>{portal ? `${portal.label} access · ${portal.scope}. ` : ""}Community, official communication, co-curricular life, recognition and flexible teaching structure.</p>
        </div>
        <Link className="school-life-back" href={portal?.returnHref ?? "/"}>{portal ? `Back to ${portal.label}` : "Back to SchoolOS"}</Link>
      </header>
      <nav className="school-life-nav" aria-label="School Life modules">
        {links.map((item) => (
          <Link key={item.key} className={active === item.key ? "active" : ""} href={`${item.href}${suffix}`}>{item.label}</Link>
        ))}
      </nav>
    </>
  );
}
