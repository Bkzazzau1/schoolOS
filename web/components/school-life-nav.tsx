import Link from "next/link";

type SchoolLifeSection = "community" | "noticeboard" | "activities" | "awards" | "teaching-models";

const links: { key: SchoolLifeSection; label: string; href: string }[] = [
  { key: "community", label: "Community", href: "/community" },
  { key: "noticeboard", label: "Noticeboard", href: "/noticeboard" },
  { key: "activities", label: "Activities & Clubs", href: "/activities" },
  { key: "awards", label: "Awards & Recognition", href: "/awards" },
  { key: "teaching-models", label: "Teaching Models", href: "/teaching-models" },
];

export default function SchoolLifeNav({ active }: { active: SchoolLifeSection }) {
  return (
    <>
      <header className="school-life-header">
        <div>
          <span className="school-life-kicker">SCHOOL-WIDE · BRIGHTGATE ACADEMY · KADUNA CAMPUS</span>
          <h1>School Life</h1>
          <p>Community, official communication, co-curricular life, recognition and flexible teaching structure.</p>
        </div>
        <Link className="school-life-back" href="/">Back to SchoolOS</Link>
      </header>
      <nav className="school-life-nav" aria-label="School Life modules">
        {links.map((item) => (
          <Link key={item.key} className={active === item.key ? "active" : ""} href={item.href}>{item.label}</Link>
        ))}
      </nav>
    </>
  );
}
