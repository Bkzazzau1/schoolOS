import "./administrator.css";
import "./attendance/hardware.css";
import AdministratorShell from "../../components/administrator-shell";

export default function AdministratorLayout({children}:Readonly<{children:React.ReactNode}>){return <AdministratorShell>{children}</AdministratorShell>}
