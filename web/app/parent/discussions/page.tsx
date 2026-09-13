"use client";

import { useMemo, useState } from "react";

type Scope = "Whole school" | "Parents only" | "Primary" | "Secondary" | "JSS 2A" | "Primary 3";
type ForumPost = {
  id: string;
  author: string;
  scope: Scope;
  title: string;
  body: string;
  time: string;
  reactions: number;
  comments: number;
  tag: string;
  followed?: boolean;
};

const seedPosts: ForumPost[] = [
  { id:"DISC-001", author:"Hajiya Fatima Sani", scope:"Parents only", title:"Ideas for the next parent reading circle", body:"Can we share age-appropriate Hausa and English storybooks our children enjoy at home?", time:"18 min ago", reactions:31, comments:14, tag:"Reading" },
  { id:"DISC-002", author:"Mrs. Hauwa Sule", scope:"Primary", title:"Primary reading week: what is working at home?", body:"Parents can share simple routines that have helped children stay interested in reading this week.", time:"1 hr ago", reactions:46, comments:22, tag:"Primary" },
  { id:"DISC-003", author:"Alhaji Musa Bello", scope:"Whole school", title:"Transport pickup communication", body:"It may help if parents receive one clear alert when a bus leaves school and another near the pickup point.", time:"2 hrs ago", reactions:39, comments:18, tag:"Transport" },
  { id:"DISC-004", author:"Mrs. Amina Yusuf", scope:"JSS 2A", title:"Science project showcase questions", body:"Families may use this thread to ask project-related questions. Please keep comments focused on the learning activity.", time:"Yesterday", reactions:24, comments:11, tag:"Academics" },
  { id:"DISC-005", author:"Hajiya Zainab Kabir", scope:"Primary 3", title:"Primary 3 homework routine", body:"What time do your children usually settle into homework without becoming tired?", time:"Yesterday", reactions:19, comments:16, tag:"Homework" },
];

const trends = [
  { rank:1, topic:"Reading Week", tag:"Reading", posts:12, engagement:"+38%", note:"Primary and parent discussions are accelerating" },
  { rank:2, topic:"Transport Alerts", tag:"Transport", posts:8, engagement:"+29%", note:"Parents discussing pickup communication" },
  { rank:3, topic:"Inter-house Sports", tag:"Activities", posts:7, engagement:"+24%", note:"Whole-school reactions increased today" },
  { rank:4, topic:"Homework Routines", tag:"Homework", posts:6, engagement:"+18%", note:"Primary family discussion remains active" },
  { rank:5, topic:"Science Projects", tag:"Academics", posts:5, engagement:"+13%", note:"JSS 2A project thread gaining comments" },
];

export default function ParentDiscussionsPage(){
  const [posts,setPosts]=useState(seedPosts);
  const [tab,setTab]=useState<"feed"|"trending"|"following">("feed");
  const [scope,setScope]=useState<"All"|Scope>("All");
  const [title,setTitle]=useState("");
  const [body,setBody]=useState("");
  const [postScope,setPostScope]=useState<Scope>("Parents only");
  const [notice,setNotice]=useState("");

  const visible=useMemo(()=>posts.filter(post=>{
    const scopeOk=scope==="All"||post.scope===scope;
    const followOk=tab!=="following"||post.followed;
    return scopeOk&&followOk;
  }),[posts,scope,tab]);

  function publish(){
    if(!title.trim()||!body.trim()){setNotice("Add a discussion title and message first.");return;}
    const next:ForumPost={id:`DISC-${String(posts.length+1).padStart(3,"0")}`,author:"Alhaji Abdullahi Yusuf",scope:postScope,title:title.trim(),body:body.trim(),time:"Just now · prototype",reactions:0,comments:0,tag:"Parent post",followed:true};
    setPosts(current=>[next,...current]);setTitle("");setBody("");setNotice("Discussion posted locally in this UI prototype.");setTab("feed");
  }

  function react(id:string){setPosts(current=>current.map(post=>post.id===id?{...post,reactions:post.reactions+1}:post));}
  function comment(id:string){setPosts(current=>current.map(post=>post.id===id?{...post,comments:post.comments+1}:post));}
  function follow(id:string){setPosts(current=>current.map(post=>post.id===id?{...post,followed:!post.followed}:post));}

  return <main className="family-page">
    <header className="family-head"><div><span className="family-kicker">FAMILY COMMUNITY · MODERATED DISCUSSIONS</span><h1>School Discussions</h1><p>Join approved school conversations, follow active topics and see what the community is discussing.</p></div><div className="family-actions"><button onClick={()=>setTab("feed")}>Latest discussions</button><button className="primary" onClick={()=>setTab("trending")}>View trends</button></div></header>

    <section className="family-forum-stats"><article><span>Active discussions</span><strong>46</strong><small>This week</small></article><article><span>Parent posts</span><strong>18</strong><small>Across approved spaces</small></article><article><span>Comments</span><strong>183</strong><small>Moderated conversation</small></article><article><span>Trending topics</span><strong>5</strong><small>Based on recent activity</small></article></section>

    <div className="family-forum-tabs"><button className={tab==="feed"?"active":""} onClick={()=>setTab("feed")}>Discussion feed</button><button className={tab==="trending"?"active":""} onClick={()=>setTab("trending")}>Trending</button><button className={tab==="following"?"active":""} onClick={()=>setTab("following")}>Following</button></div>

    {tab==="trending" ? <section className="family-grid two">
      <article className="family-card"><header><div><h2>Trending now</h2><p>Topics gaining the most recent posts, comments and reactions.</p></div></header><div className="family-trend-list">{trends.map(item=><div key={item.rank}><b>#{item.rank}</b><div><strong>{item.topic}</strong><span>{item.note}</span><small>{item.posts} active posts · {item.tag}</small></div><em>{item.engagement}</em></div>)}</div></article>
      <aside className="family-card"><header><div><h2>Community pulse</h2><p>Aggregate discussion activity only.</p></div></header><div className="family-trend-bars"><div><span>Primary</span><i><b style={{width:"88%"}}/></i><strong>88</strong></div><div><span>Secondary</span><i><b style={{width:"72%"}}/></i><strong>72</strong></div><div><span>Parents only</span><i><b style={{width:"64%"}}/></i><strong>64</strong></div><div><span>Whole school</span><i><b style={{width:"58%"}}/></i><strong>58</strong></div></div><div className="family-callout" style={{marginTop:12}}>Trend signals summarize discussion activity. They do not rank families, infer parent sentiment, or score individual children.</div></aside>
    </section> : <section className="family-forum-layout">
      <article className="family-card">
        <header><div><h2>Start a discussion</h2><p>Post only to communities linked to your family account.</p></div></header>
        <div className="family-forum-composer"><input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Discussion title"/><textarea value={body} onChange={e=>setBody(e.target.value)} placeholder="Share a question, suggestion or school-community topic..."/><div><select value={postScope} onChange={e=>setPostScope(e.target.value as Scope)}><option>Parents only</option><option>Whole school</option><option>Primary</option><option>Secondary</option><option>JSS 2A</option><option>Primary 3</option></select><button onClick={publish}>Post discussion</button></div>{notice&&<small>{notice}</small>}</div>

        <div className="family-forum-filter"><strong>{tab==="following"?"Following":"Community feed"}</strong><select value={scope} onChange={e=>setScope(e.target.value as "All"|Scope)}><option>All</option><option>Whole school</option><option>Parents only</option><option>Primary</option><option>Secondary</option><option>JSS 2A</option><option>Primary 3</option></select></div>
        <div className="family-forum-feed">{visible.map(post=><article key={post.id}><div className="family-forum-post-head"><div><span>{post.author.split(" ").map(x=>x[0]).slice(0,2).join("")}</span><div><strong>{post.author}</strong><small>{post.scope} · {post.time}</small></div></div><em>{post.tag}</em></div><h3>{post.title}</h3><p>{post.body}</p><div className="family-forum-meta"><span>{post.reactions} reactions</span><span>{post.comments} comments</span><span>{post.id}</span></div><div className="family-forum-actions"><button onClick={()=>react(post.id)}>React</button><button onClick={()=>comment(post.id)}>Comment</button><button className={post.followed?"following":""} onClick={()=>follow(post.id)}>{post.followed?"Following":"Follow"}</button><button onClick={()=>setNotice(`${post.id} reported to moderation locally.`)}>Report</button></div></article>)}</div>
      </article>
      <aside className="family-forum-side"><article className="family-card"><header><div><h2>Trending topics</h2><p>Fast-moving school discussions.</p></div></header><div className="family-mini-trends">{trends.slice(0,4).map(item=><button key={item.rank} onClick={()=>setTab("trending")}><b>#{item.rank}</b><div><strong>{item.topic}</strong><small>{item.engagement} activity</small></div></button>)}</div></article><article className="family-card"><header><div><h2>Forum rules</h2><p>Community conversation stays safe and useful.</p></div></header><div className="family-list"><div><strong>Respect privacy</strong><span>Do not post another child’s private academic, health or family information.</span></div><div><strong>Moderated space</strong><span>Posts and comments can be reported and reviewed by authorized moderators.</span></div><div><strong>Discussions are not notices</strong><span>Official instructions and emergency communication remain on the school Noticeboard.</span></div></div></article></aside>
    </section>}
  </main>;
}
