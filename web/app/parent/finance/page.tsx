"use client";
import Link from "next/link";
import { useMemo, useState } from "react";

const money=(n:number)=>`₦${n.toLocaleString("en-NG")}`;

const initialLedger=[
 {date:"13 Sep 2026",child:"Maryam Abdullahi",ref:"TRX-260913-94821",channel:"Student Term Account",amount:25000,status:"Confirmed"},
 {date:"12 Sep 2026",child:"Hafsa Abdullahi",ref:"TRX-260912-0041",channel:"Student Term Account",amount:20000,status:"Confirmed"},
 {date:"06 Sep 2026",child:"Maryam Abdullahi",ref:"TRX-260906-0033",channel:"Student Term Account",amount:20000,status:"Confirmed"},
 {date:"28 Aug 2026",child:"Maryam Abdullahi",ref:"TRX-260828-0008",channel:"Payment mandate",amount:15000,status:"Confirmed"},
];

const initialChildren=[
 {name:"Maryam Abdullahi",className:"JSS 2A",account:"1047263815",bank:"Partner Bank A",gross:185000,adjustment:"₦0",paid:60000,balance:125000},
 {name:"Hafsa Abdullahi",className:"Primary 3",account:"1047263914",bank:"Partner Bank A",gross:145000,adjustment:"₦10,000 sibling discount",paid:80000,balance:55000},
];

function combinedRef(){
 const d=new Date();
 const stamp=`${String(d.getFullYear()).slice(2)}${String(d.getMonth()+1).padStart(2,"0")}${String(d.getDate()).padStart(2,"0")}`;
 const rand=Math.floor(1000+Math.random()*9000);
 return `FAM-${stamp}-${rand}`;
}

export default function ParentFinancePage(){
 const [autoPay,setAutoPay]=useState(true);const [debitDay,setDebitDay]=useState("25th");const [amount,setAmount]=useState("30000");const [copied,setCopied]=useState("");
 const [children,setChildren]=useState(initialChildren);
 const [ledger,setLedger]=useState(initialLedger);
 const [selected,setSelected]=useState<Record<string,boolean>>({[initialChildren[0].account]:true,[initialChildren[1].account]:true});
 const [payAmounts,setPayAmounts]=useState<Record<string,string>>({[initialChildren[0].account]:String(initialChildren[0].balance),[initialChildren[1].account]:String(initialChildren[1].balance)});
 const [combinedNotice,setCombinedNotice]=useState<{ref:string;total:number;names:string[]}|null>(null);

 async function copyAccount(account:string){try{await navigator.clipboard.writeText(account);setCopied(account);}catch{setCopied(account)}}

 const selectedAccounts=children.filter(c=>selected[c.account]);
 const combinedTotal=selectedAccounts.reduce((s,c)=>s+(Number(payAmounts[c.account])||0),0);

 function toggleChild(account:string,balance:number){
  setSelected(s=>({...s,[account]:!s[account]}));
  setPayAmounts(p=>p[account]?p:{...p,[account]:String(balance)});
 }

 function makeCombinedPayment(){
  if(selectedAccounts.length<2||combinedTotal<=0)return;
  const ref=combinedRef();
  const today=new Date().toLocaleDateString("en-NG",{day:"2-digit",month:"short",year:"numeric"});
  const newRows=selectedAccounts.map(c=>({date:today,child:c.name,ref,channel:"Combined family payment",amount:Number(payAmounts[c.account])||0,status:"Confirmed"}));
  setLedger(l=>[...newRows,...l]);
  setChildren(cs=>cs.map(c=>selected[c.account]?{...c,paid:c.paid+(Number(payAmounts[c.account])||0),balance:Math.max(0,c.balance-(Number(payAmounts[c.account])||0))}:c));
  setCombinedNotice({ref,total:combinedTotal,names:selectedAccounts.map(c=>c.name)});
 }

 const grossTotal=useMemo(()=>children.reduce((s,c)=>s+c.gross,0),[children]);
 const paidTotal=useMemo(()=>children.reduce((s,c)=>s+c.paid,0),[children]);
 const balanceTotal=useMemo(()=>children.reduce((s,c)=>s+c.balance,0),[children]);

 return <main className="family-page"><header className="family-head"><div><span className="family-kicker">FAMILY ACCOUNT · SMART COLLECTIONS</span><h1>Finance & Payments</h1><p>Pay each child through a unique term account, make small deposits anytime, view balances and print confirmed receipts.</p></div><div className="family-actions"><Link href="/parent/finance/reminders">Fee reminders</Link><Link href="/parent/finance/purchases">Purchases & Orders</Link><Link href="/parent/finance/receipts">View receipts</Link></div></header>
 <section className="family-finance-kpis"><article><span>Gross term fees</span><strong>{money(grossTotal)}</strong><small>{children.length} linked children</small></article><article><span>Discounts</span><strong>₦10,000</strong><small>Sibling discount</small></article><article><span>Paid</span><strong>{money(paidTotal)}</strong><small>Across all term accounts</small></article><article><span>Outstanding</span><strong>{money(balanceTotal)}</strong><small>Net family obligation</small></article></section>

 <section className="family-card" style={{marginBottom:14}}>
  <header><div><h2>Pay for multiple children at once</h2><p>Select two or more of your children and pay them together. One payment reference is created and it covers every child selected — each term account is credited from that single payment.</p></div></header>
  <div className="family-combo">
   {children.map(c=><div className="family-combo-row" key={c.account}>
    <label><input type="checkbox" checked={!!selected[c.account]} onChange={()=>toggleChild(c.account,c.balance)}/><div><strong>{c.name}</strong><small>{c.className} · Outstanding {money(c.balance)}</small></div></label>
    <input className="family-combo-amount" type="number" min={0} max={c.balance} disabled={!selected[c.account]} value={payAmounts[c.account]??""} onChange={e=>setPayAmounts(p=>({...p,[c.account]:e.target.value}))}/>
   </div>)}
  </div>
  <div className="family-combo-total"><span>Total for this combined payment</span><strong>{money(combinedTotal)}</strong></div>
  <button className="family-save" disabled={selectedAccounts.length<2||combinedTotal<=0} onClick={makeCombinedPayment}>Pay for {selectedAccounts.length||0} children together</button>
  {combinedNotice&&<div className="family-callout" style={{marginTop:10}}>Combined payment created: one payment ID <b>{combinedNotice.ref}</b> now covers {combinedNotice.names.join(" and ")} — total {money(combinedNotice.total)}. Both term accounts were credited from this single reference; see it twice, once per child, in Payment history below.</div>}
  {selectedAccounts.length<2&&!combinedNotice&&<div className="family-callout" style={{marginTop:10}}>Select at least two children to combine them into one payment.</div>}
 </section>

 <section className="family-grid two"><article className="family-card"><header><div><h2>Student term accounts</h2><p>Each account is unique to the child and remains fixed for the active term.</p></div></header><div className="family-account-list">{children.map(child=><div key={child.account}><div><strong>{child.name}</strong><span>{child.className} · 2026/2027 Term 1</span></div><div><small>{child.bank}</small><b>{child.account}</b><button className="family-save" style={{marginTop:6}} onClick={()=>copyAccount(child.account)}>{copied===child.account?"Copied":"Copy account"}</button></div><div><small>Outstanding</small><b>{money(child.balance)}</b><span>{child.adjustment}</span></div></div>)}</div><div className="family-callout" style={{marginTop:10}}>You can deposit smaller amounts at any time, or use the combined payment above to pay several children in one transaction. Large payments above the authorized collection limit require a special arrangement with the school Finance Office.</div></article>
 <article className="family-card"><header><div><h2>Automatic payment mandate</h2><p>Optional recurring collection connected to the same school-fee ledger.</p></div></header><div className="family-plan"><label><span>Automatic monthly charge</span><button className={autoPay?"toggle on":"toggle"} onClick={()=>setAutoPay(v=>!v)}><i/></button></label><label><span>Monthly amount</span><input value={amount} onChange={e=>setAmount(e.target.value)}/></label><label><span>Preferred debit day</span><select value={debitDay} onChange={e=>setDebitDay(e.target.value)}><option>5th</option><option>10th</option><option>15th</option><option>20th</option><option>25th</option><option>28th</option></select></label><label><span>Collection method</span><select defaultValue="bank"><option value="bank">Bank direct debit · prototype</option><option value="salary">Salary-linked collection · prototype</option></select></label><button className="family-save">Save payment mandate preference</button><div className="family-callout">Prototype UI only. This represents a parent-authorized mandate and does not create any real debit instruction.</div></div></article></section>
 <section className="family-card"><header><div><h2>Upcoming fee reminder</h2><p>SchoolOS uses your current arrangement before deciding what reminder to show.</p></div><Link href="/parent/finance/reminders">Open reminder center</Link></header><div className="family-list"><div><strong>Maryam Abdullahi · ₦30,000 scheduled</strong><span>Automatic bank mandate · 25 Sep 2026</span></div><div><strong>Hafsa Abdullahi · ₦20,000 expected</strong><span>Manual partial payment · 20 Sep 2026</span></div></div></section>
 <section className="family-card"><header><div><h2>Payment history</h2><p>Every confirmed credit is linked to the child and creates a receipt. A combined payment shares one reference across every child it covers.</p></div><Link href="/parent/finance/receipts">Open receipt center</Link></header><div className="family-table"><div className="family-table-head"><span>Date</span><span>Child</span><span>Reference</span><span>Channel</span><span>Amount</span><span>Status</span></div>{ledger.map((r,i)=><div className="family-table-row" key={`${r.ref}-${r.child}-${i}`}><span>{r.date}</span><span>{r.child}</span><span>{r.ref}</span><span>{r.channel}</span><b>{money(r.amount)}</b><em>{r.status}</em></div>)}</div></section>
 <section className="family-grid two"><article className="family-card"><header><div><h2>School fees vs store purchases</h2><p>Two separate payment rails keep records clear.</p></div></header><div className="family-list"><div><strong>School fees</strong><span>Use the child’s static term account, or the combined payment above to pay several children at once. These payments reduce tuition/term obligations only.</span></div><div><strong>Books & uniforms</strong><span>Use the dynamic account assigned to that specific store order.</span></div><div><strong>Store order tracking</strong><span><Link href="/parent/finance/purchases">Open Purchases & Orders →</Link></span></div></div></article><article className="family-card"><header><div><h2>Finance principle</h2><p>Payment history is a factual record—not a child score.</p></div></header><div className="family-callout">SchoolOS must not use family payment history to lower grades, restrict classroom support, rank families, or automatically approve/deny future financing.</div></article></section></main>}
