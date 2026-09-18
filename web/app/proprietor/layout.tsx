import "./proprietor.css";
import "./executive.css";
import "./owner-modules.css";
import "./owner-approvals.css";
import "./shell.css";
import ProprietorShell from "../../components/proprietor-shell";

export default function ProprietorLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <ProprietorShell>{children}</ProprietorShell>;
}
