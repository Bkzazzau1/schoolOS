"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const nav = [
  { label: "Executive Overview", href: "/proprietor", icon: "⌂" },
  { label: "Owner Finance", href: "/proprietor/finance", icon: "₦" },
  { label: "Enrollment & Admissions", href: "/proprietor/enrollment", icon: "◎" },
  { label: "Staff & HR", href: "/proprietor/staff", icon: "♙" },
  { label: "Executive Reports", href: "/proprietor/reports", icon: "▤" },
  { label: "Campus Comparison", href: "/proprietor/campuses", icon: "◇" },
  { label: "Proprietor AI", href: "/proprietor/ai", icon: "AI" },
  { label: "Structure & Leadership", href: "/proprietor/structure", icon: "⚙" },
  { label: "School Appearance", href: "/proprietor/appearance", icon: "◐" },
  { label: "School Life", href: "/school-life/access?portal=proprietor", icon: "✦" },
];

export default function ProprietorShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const active = (href: string) => href === "/proprietor" ? pathname === href : pathname.startsWith(href.split("?")[0]);

  return (
    <div className="owner-shell">
      <aside className="owner-shell-sidebar">
        <div className="owner-shell-brand"><div className="owner-shell-mark">S</div><div><strong>SchoolOS</strong><span>Owner Command Center</span></div></div>
        <div className="owner-shell-school"><span>ACTIVE ORGANIZATION</span><strong>BrightGate Academy</strong><small>Kaduna Campus · Whole-school authority</small><button type="button">Kaduna Campus <b>⌄</b></button></div>
        <nav className="owner-shell-nav">
          <p>OWNER WORKSPACE</p>
          {nav.slice(0, 7).map(item => <Link key={item.href} className={active(item.href) ? "active" : ""} href={item.href}><i>{item.icon}</i><span>{item.label}</span></Link>)}
          <p>CONTROL & SCHOOL LIFE</p>
          {nav.slice(7).map(item => <Link key={item.href} className={active(item.href) ? "active" : ""} href={item.href}><i>{item.icon}</i><span>{item.label}</span></Link>)}
        </nav>
        <div className="owner-shell-footer"><div><span>PLAN</span><strong>Standard</strong><small>648 active students · ₦500/student/term</small></div><div className="owner-shell-user"><span>IB</span><div><strong>Proprietor</strong><small>Whole-school access</small></div></div></div>
      </aside>
      <section className="owner-shell-main">
        <header className="owner-shell-topbar"><div className="owner-shell-search"><span>⌕</span><input placeholder="Search students, staff, finance, operations..." /></div><div className="owner-shell-top-actions"><button type="button">Kaduna Campus</button><button type="button">Current term</button><button type="button" className="icon">◔</button><button type="button" className="icon">♢</button></div></header>
        <div className="owner-shell-content">{children}</div>
      </section>
    </div>
  );
}
