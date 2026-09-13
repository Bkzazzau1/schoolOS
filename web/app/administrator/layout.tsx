import "./administrator.css";
import "./attendance/hardware.css";
import "./staff-attendance/staff-attendance.css";
import AdministratorShell from "../../components/administrator-shell";

export default function AdministratorLayout({children}:Readonly<{children:React.ReactNode}>){return <AdministratorShell>{children}</AdministratorShell>}
