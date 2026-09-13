"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const nav=[
 ["Dashboard","/administrator","⌂"],
 ["Student Registration","/administrator/registration","＋"],
 ["Students & Families","/administrator/students","◉"],
 ["Staff Records","/administrator/staff","♙"],
 ["Records & Documents","/administrator/records","▤"],
 ["Transfers & Promotion","/administrator/lifecycle","↗"],
 ["Attendance Desk","/administrator/attendance","✓"],
 ["Operations","/administrator/operations","◇"],
 ["Notices","/administrator/notices","✦"],
];

export default function AdministratorShell({children}:{children:ReactNode}){
 const pathname=usePathname();
 const active=(href:string)=>href==="/administrator"?pathname===href:pathname.startsWith(href);
 return <div className="admin-shell">
  <aside className="admin-sidebar">
   <div className="admin-brand"><div className="admin-mark">S</div><div><strong>SchoolOS</strong><span>Administration Desk</span></div></div>
   <div className="admin-campus"><span>ACTIVE SCHOOL</span><strong>BrightGate Academy</strong><small>Kaduna Campus · Whole-school administration</small></div>
   <nav className="admin-nav"><p>ADMINISTRATION</p>{nav.map(([label,href,icon])=><Link key={href} href={href} className={active(href)?"active":""}><i>{icon}</i><span>{label}</span></Link>)}</nav>
   <div className="admin-boundary"><strong>ROLE BOUNDARY</strong><p>Administrator manages operational records and workflows. Academic decisions, proprietor governance and confidential payroll remain with their authorized roles.</p></div>
   <div className="admin-user"><span>FA</span><div><strong>Mrs. Fatima Ahmad</strong><small>School Administrator</small></div></div>
  </aside>
  <section className="admin-main"><header className="admin-topbar"><div><strong>Administration Workspace</strong><span>2026/2027 · Term 1</span></div><div><input placeholder="Search student, guardian, staff ID, document..."/><button>Notifications <b>5</b></button></div></header><div className="admin-content">{children}</div></section>
 </div>
}
