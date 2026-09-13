import "./finance-office.css";
import FinanceOfficeShell from "../../components/finance-office-shell";

export default function FinanceOfficeLayout({children}:{children:React.ReactNode}){
  return <FinanceOfficeShell>{children}</FinanceOfficeShell>;
}
