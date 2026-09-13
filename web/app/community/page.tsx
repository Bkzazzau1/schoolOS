"use client";

import { useMemo, useState } from "react";
import SchoolLifeNav from "../../components/school-life-nav";
import "../school-life.css";

type Audience = "Whole school" | "Early Years" | "Primary" | "Secondary" | "Staff only" | "Parents only" | "JSS 2A";
type Visibility = "School only" | "Public showcase";
type Post = {
  id: string;
  author: string;
  role: string;
  audience: Audience;
  visibility: Visibility;
  title: string;
  body: string;
  time: string;
  reactions: number;
  comments: { author: string; text: string }[];
  media?: string;
};

const seedPosts: Post[] = [
  { id:"POST-001", author:"Mrs. Mary Daniel", role:"Head Teacher · Early Years", audience:"Whole school", visibility:"School only", title:"Reception A nature walk highlights", body:"The children explored leaves, shapes and sounds around the school garden today. Families can continue the conversation at home by asking children what they noticed and compared.", time:"Today · 11:42 AM", reactions:34, comments:[{author:"Guardian Fatima",text:"She told us about the yellow leaves already. Lovely activity."},{author:"Mrs. Hauwa Sule",text:"Beautiful way to connect observation and language."}], media:"Photo gallery · 8 items" },
  { id:"POST-002", author:"Sports Committee", role:"School activity team", audience:"Whole school", visibility:"Public showcase", title:"Blue House wins inter-house relay", body:"Congratulations to Blue House for winning the senior relay final. Full inter-house sports points will be published after all events are completed.", time:"Yesterday · 4:15 PM", reactions:61, comments:[{author:"Mr. Ibrahim Danladi",text:"Well done to all four houses for excellent sportsmanship."}], media:"Event photos · 12 items" },
  { id:"POST-003", author:"Mrs. Hauwa Sule", role:"Headmistress · Primary", audience:"Primary", visibility:"School only", title:"Primary reading week discussion", body:"What books are your children enjoying this week? Parents can share titles or short recommendations in the comments. Teachers will compile age-appropriate suggestions for each class.", time:"Yesterday · 1:20 PM", reactions:27, comments:[{author:"Guardian Hauwa",text:"We are reading The Clever Tortoise at home."},{author:"Primary 4 Teacher",text:"Great choice. We will add folktales to Friday's sharing session."}] },
  { id:"POST-004", author:"Mr. Ibrahim Danladi", role:"Principal · Secondary", audience:"JSS 2A", visibility:"School only", title:"Science project showcase", body:"JSS 2A teams may use this thread to share project photos, questions and peer feedback. Keep comments constructive and focused on the work.", time:"Monday · 3:05 PM", reactions:19, comments:[{author:"Science Teacher",text:"Remember to label your materials and explain the observation, not only the final model."}] },
];

export default function CommunityPage(){
  const [posts,setPosts]=useState(seedPosts);
  const [audience,setAudience]=useState("All audiences");
  const [query,setQuery]=useState("");
  const [draftTitle,setDraftTitle]=useState("");
  const [draftBody,setDraftBody]=useState("");
  const [draftAudience,setDraftAudience]=useState<Audience>("Whole school");
  const [draftVisibility,setDraftVisibility]=useState<Visibility>("School only");
  const [notice,setNotice]=useState("");

  const visible=useMemo(()=>posts.filter(post=>{
    const q=`${post.author} ${post.role} ${post.title} ${post.body} ${post.audience}`.toLowerCase().includes(query.toLowerCase());
    return q&&(audience==="All audiences"||post.audience===audience);
  }),[posts,query,audience]);

  function publish(){
    if(!draftTitle.trim()||!draftBody.trim()){setNotice("Add a title and post message first.");return;}
    const next:Post={id:`POST-${String(posts.length+1).padStart(3,"0")}`,author:"Ibrahim Bashir Yahaya",role:"Proprietor workspace · prototype",audience:draftAudience,visibility:draftVisibility,title:draftTitle.trim(),body:draftBody.trim(),time:"Just now · prototype",reactions:0,comments:[]};
    setPosts(current=>[next,...current]);
    setDraftTitle("");setDraftBody("");setNotice("Post published locally in this UI prototype.");
  }

  function react(id:string){setPosts(current=>current.map(post=>post.id===id?{...post,reactions:post.reactions+1}:post));}
  function comment(id:string){setPosts(current=>current.map(post=>post.id===id?{...post,comments:[...post.comments,{author:"Current user",text:"Thanks for sharing — prototype comment."}]}:post));}

  return <main className="school-life-page">
    <SchoolLifeNav active="community" />
    <section className="school-life-scope"><div><strong>School Community</strong><span>Private school social space · moderated</span></div><p>Conversation is school-scoped by default. Selected posts may be marked for a public showcase, but child privacy, guardian permissions and moderation still apply.</p></section>

    <section className="school-life-stat-grid">
      <article className="school-life-stat"><span>Community members</span><strong>1,084</strong><small>Staff, guardians and eligible students</small></article>
      <article className="school-life-stat"><span>Posts this week</span><strong>46</strong><small>Across all school audiences</small></article>
      <article className="school-life-stat"><span>Comments</span><strong>183</strong><small>Moderated discussion</small></article>
      <article className="school-life-stat"><span>Public showcase</span><strong>7</strong><small>Approved school-facing posts</small></article>
      <article className="school-life-stat"><span>Reports awaiting review</span><strong>2</strong><small>Community moderation queue</small></article>
    </section>

    <section className="school-life-grid">
      <article className="school-life-card">
        <div className="school-life-section-head"><div><h2>School feed</h2><p>Posts, photos, discussions and reactions for the audiences each member is allowed to see.</p></div></div>
        <div className="school-life-composer">
          <input value={draftTitle} onChange={e=>setDraftTitle(e.target.value)} placeholder="Post title..." />
          <textarea value={draftBody} onChange={e=>setDraftBody(e.target.value)} placeholder="Share an update, activity, question or school moment..." />
          <div className="school-life-composer-row">
            <select value={draftAudience} onChange={e=>setDraftAudience(e.target.value as Audience)}><option>Whole school</option><option>Early Years</option><option>Primary</option><option>Secondary</option><option>Staff only</option><option>Parents only</option><option>JSS 2A</option></select>
            <select value={draftVisibility} onChange={e=>setDraftVisibility(e.target.value as Visibility)}><option>School only</option><option>Public showcase</option></select>
          </div>
          <div className="school-life-composer-actions"><small>Prototype posting only. Production publishing will use role permissions, moderation and audit logs.</small><button className="school-life-primary" onClick={publish}>Publish post</button></div>
          {notice&&<small>{notice}</small>}
        </div>

        <div className="school-life-filters"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search community posts..."/><select value={audience} onChange={e=>setAudience(e.target.value)}><option>All audiences</option><option>Whole school</option><option>Early Years</option><option>Primary</option><option>Secondary</option><option>Staff only</option><option>Parents only</option><option>JSS 2A</option></select></div>

        <div className="school-life-feed">{visible.map(post=><article className="community-post" key={post.id}>
          <div className="community-post-head"><div className="community-author"><span className="community-avatar">{post.author.split(" ").map(x=>x[0]).slice(0,2).join("")}</span><div><strong>{post.author}</strong><small>{post.role} · {post.time}</small></div></div><div className="community-badges"><em className="community-badge">{post.audience}</em><em className={`community-badge ${post.visibility==="Public showcase"?"public":""}`}>{post.visibility}</em></div></div>
          <h3>{post.title}</h3><p>{post.body}</p>{post.media&&<div className="community-media">{post.media}</div>}
          <div className="community-meta"><span>{post.reactions} reactions</span><span>{post.comments.length} comments</span><span>{post.id}</span></div>
          <div className="community-actions"><button onClick={()=>react(post.id)}>React</button><button onClick={()=>comment(post.id)}>Comment</button><button onClick={()=>setNotice(`${post.id} reported to moderation locally.`)}>Report</button></div>
          {post.comments.length>0&&<div className="community-comments">{post.comments.map((item,index)=><div className="community-comment" key={`${post.id}-${index}`}><strong>{item.author}</strong>{item.text}</div>)}</div>}
        </article>)}</div>
      </article>

      <aside className="school-life-sidebar">
        <article className="school-life-card"><div className="school-life-section-head"><div><h3>Who can participate?</h3><p>Configurable by school and age group.</p></div></div><div className="school-life-policy-list"><div><strong>Staff</strong><small>Post, comment and react according to role scope.</small></div><div><strong>Parents / Guardians</strong><small>Comment, react and create posts where school policy allows.</small></div><div><strong>Secondary students</strong><small>Can be enabled for approved class/club spaces with moderation.</small></div><div><strong>Primary / Early Years children</strong><small>Direct accounts are off by default; adults represent classroom and family participation.</small></div></div></article>
        <article className="school-life-card"><div className="school-life-section-head"><div><h3>Moderation</h3><p>Community should feel social without becoming uncontrolled.</p></div></div><div className="school-life-policy-list"><div><strong>2 reports awaiting review</strong><small>Moderators can hide, restore or escalate content.</small></div><div><strong>Public showcase approval</strong><small>Public-facing posts should require authorized approval and media/privacy checks.</small></div><div><strong>Audit trail</strong><small>Edits, removals and moderation actions should be logged later in backend.</small></div></div></article>
        <article className="school-life-note"><strong>Community ≠ Noticeboard</strong>Community is conversational. Official instructions, emergency notices and acknowledgement-required messages belong on the Noticeboard.</article>
      </aside>
    </section>
  </main>;
}
