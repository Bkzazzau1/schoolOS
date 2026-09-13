"use client";

import { useMemo, useState } from "react";
import SchoolLifeNav from "../../components/school-life-nav";
import "../school-life.css";

type MealDay = { day:string; breakfast:string; lunch:string; snack:string; servings:number; status:"Planned"|"Serving"|"Completed"; note:string };
const meals:MealDay[]=[
  {day:"Monday",breakfast:"Pap + akara",lunch:"Jollof rice + chicken + vegetables",snack:"Fruit",servings:412,status:"Completed",note:"Standard school menu."},
  {day:"Tuesday",breakfast:"Tea + bread + egg",lunch:"Beans + plantain",snack:"Yoghurt / fruit",servings:405,status:"Completed",note:"Alternative meal requests handled privately where configured."},
  {day:"Wednesday",breakfast:"Moi-moi + pap",lunch:"Rice + stew + fish",snack:"Fruit",servings:418,status:"Serving",note:"Sample active-service state in this prototype; the selected day is not tied to the current calendar date."},
  {day:"Thursday",breakfast:"Oats + milk",lunch:"Yam porridge + vegetables",snack:"Biscuit + drink",servings:410,status:"Planned",note:"Menu can vary by school policy."},
  {day:"Friday",breakfast:"Tea + bread",lunch:"Fried rice + chicken",snack:"Fruit",servings:398,status:"Planned",note:"Friday service can follow the school timetable configured by the tenant."},
];

export default function MealsPage(){
  const [query,setQuery]=useState("");
  const [selected,setSelected]=useState("Wednesday");
  const [notice,setNotice]=useState("");
  const visible=useMemo(()=>meals.filter(m=>`${m.day} ${m.breakfast} ${m.lunch} ${m.snack}`.toLowerCase().includes(query.toLowerCase())),[query]);
  const current=meals.find(m=>m.day===selected)??meals[0];
  return <main className="school-life-page">
    <SchoolLifeNav active="meals" />
    <section className="school-life-scope"><div><strong>Meals & Cafeteria</strong><span>Menus, meal service and safe exceptions</span></div><p>Coordinate school meal plans, service counts and approved alternatives while keeping health or dietary details private and visible only to staff who need them.</p></section>
    <section className="school-life-stat-grid"><article className="school-life-stat"><span>Weekly menu</span><strong>5 days</strong><small>Sample school week</small></article><article className="school-life-stat"><span>Selected-day servings</span><strong>{current.servings}</strong><small>{current.day} sample</small></article><article className="school-life-stat"><span>Meal locations</span><strong>2</strong><small>Main cafeteria + Early Years</small></article><article className="school-life-stat"><span>Special meal flags</span><strong>7</strong><small>Details restricted</small></article><article className="school-life-stat"><span>Payment integration</span><strong>Later</strong><small>UI phase only</small></article></section>
    <section className="school-life-grid"><article className="school-life-card"><div className="school-life-section-head"><div><h2>Weekly menu</h2><p>This is a sample service week, not a live calendar. Families can later see published menus; sensitive dietary notes stay in restricted staff workflows.</p></div><button onClick={()=>setNotice("Menu editor opened locally in the UI prototype.")}>Edit menu</button></div><div className="school-life-filters"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search menu items or day..."/></div>{notice&&<div className="school-life-note" style={{marginBottom:12}}><strong>Prototype only</strong>{notice}</div>}<div className="activity-list">{visible.map(m=><button key={m.day} className="activity-row" onClick={()=>setSelected(m.day)} style={{width:"100%",textAlign:"left",background:selected===m.day?"#f6faf8":"#fff",cursor:"pointer"}}><div className="activity-icon">☰</div><div><div className="activity-meta"><span>{m.status}</span><span>{m.servings} servings</span></div><h3>{m.day}</h3><p>Breakfast: {m.breakfast}</p><p>Lunch: {m.lunch} · Snack: {m.snack}</p><small>{m.note}</small></div><span className="activity-status">{m.status}</span></button>)}</div></article><aside className="school-life-sidebar"><article className="school-life-card"><span className="school-life-kicker">SELECTED DAY</span><h3 style={{margin:"5px 0 8px"}}>{current.day}</h3><div className="school-life-policy-list"><div><strong>{current.breakfast}</strong><small>Breakfast</small></div><div><strong>{current.lunch}</strong><small>Lunch</small></div><div><strong>{current.snack}</strong><small>Snack</small></div></div></article><article className="school-life-card"><span className="school-life-kicker">PRIVACY RULE</span><p style={{margin:"6px 0 0",color:"#69768a",fontSize:12,lineHeight:1.65}}>The general cafeteria page should not expose a child&apos;s allergy, diagnosis, religion or medical history. Staff receive only the minimum meal-related instruction necessary for safe service.</p></article></aside></section>
  </main>;
}
