import "./parent.css";
import "./parent-modules.css";
import ParentShell from "../../components/parent-shell";

export default function ParentLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <ParentShell>{children}</ParentShell>;
}
