"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const nav = [
  ["Home", "/parent", "⌂"],
  ["My Children", "/parent/children", "◉"],
  ["Learning Progress", "/parent/progress", "↗"],
  ["Attendance", "/parent/attendance", "✓"],
  ["Finance & Payments", "/parent/finance", "₦"],
  ["Messages", "/parent/messages", "✉"],
  ["School Discussions", "/parent/discussions", "☵"],
  ["School Life", "/parent/school-life", "✦"],
  ["Documents & Consent", "/parent/documents", "▤"],
  ["Parent AI", "/parent/ai", "AI"],
];

export default function ParentShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const active = (href: string) => href === "/parent" ? pathname === href : pathname.startsWith(href);

  return <div className="parent-shell">
    <aside className="parent-sidebar">
      <div className="parent-brand"><div className="parent-mark">S</div><div><strong>SchoolOS</strong><span>Family Portal</span></div></div>
      <div className="parent-family-card"><span>FAMILY ACCOUNT</span><strong>FAM-BGA-0042</strong><small>Alhaji Abdullahi Yusuf · 2 linked children</small></div>
      <nav className="parent-nav"><p>FAMILY WORKSPACE</p>{nav.map(([label,href,icon])=><Link href={href} key={href} className={active(href)?"active":""}><i>{icon}</i><span>{label}</span></Link>)}</nav>
      <div className="parent-privacy"><span>PRIVATE FAMILY ACCESS</span><p>You only see children and family records linked to this guardian account. School staff private notes, other families and restricted safeguarding records are never shown here.</p></div>
      <div className="parent-user"><span>AY</span><div><strong>Alhaji Abdullahi Yusuf</strong><small>Parent / Guardian</small></div></div>
    </aside>
    <section className="parent-main">
      <header className="parent-topbar"><div><strong>BrightGate Academy</strong><span>Kaduna Campus · 2026/2027 Term 1</span></div><div className="parent-top-actions"><button>Notifications <b>3</b></button><button>Help</button></div></header>
      <div className="parent-content">{children}</div>
    </section>
  </div>;
}
