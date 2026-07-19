
const C=window.QUEST_HANYU_CONTENT;
const state={
  screen:"home", unit:1, storyIndex:0, activityIndex:0, bossIndex:0,
  hearts:3, stars:0, dragonHP:100, playerHP:100,
  selectedAvatar:localStorage.getItem("qh_avatar")||"🐼",
  matchLeft:null, matchDone:0, sentenceAnswer:[]
};
const el=id=>document.getElementById(id);
const profile=()=>({
  name:localStorage.getItem("qh_name")||"Murid",
  avatar:localStorage.getItem("qh_avatar")||"🐼",
  stars:+(localStorage.getItem("qh_stars")||0),
  crystals:+(localStorage.getItem("qh_crystals")||0),
  worlds:+(localStorage.getItem("qh_worlds")||0)
});
function tri(h,p,m){return `<span class="tri"><span class="hz">${h}</span><span class="py">${p}</span><span class="ms">${m}</span></span>`}
function showToast(t){const x=el("toast");x.textContent=t;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),1800)}
function render(){const a=el("app");a.innerHTML=views[state.screen]();bind();}
function go(s){state.screen=s;render();scrollTo({top:0,behavior:"smooth"})}
function safeUnit(){return C.units[state.unit]||{story:[],activities:[],boss:[]}}
const nav=()=>`<div class="top"><button class="pill" data-go="home">🏠 主页 · zhǔyè · Utama</button><button class="pill" data-go="passport">🧳 护照 · hùzhào · Pasport</button></div>`;

const views={
home:()=>`<main class="screen"><section class="card hero"><div class="mascot">🐼</div><div class="logo">Quest Hanyu AI</div>
<p>华语学习冒险<br><span class="small">Huáyǔ Xuéxí Màoxiǎn</span><br>Pengembaraan Pembelajaran Bahasa Cina</p>
<button class="btn red" data-go="profile">${tri("开始","kāishǐ","Mula")}</button>
<button class="btn orange" data-go="map">${tri("继续","jìxù","Teruskan")}</button>
<button class="btn green" data-go="passport">${tri("华语护照","Huáyǔ Hùzhào","Pasport Bahasa Cina")}</button>
<button class="btn purple" data-go="teacher">${tri("教师专区","Jiàoshī Zhuānqū","Ruang Guru")}</button>
<div class="notice">📱 Buka pautan melalui Safari dan pilih “Tambah ke Skrin Utama” untuk memasang aplikasi.</div></section></main>`,

profile:()=>{const p=profile();return `<main class="screen">${nav()}<section class="card"><h1>学生资料<br><span class="small">Xuéshēng Zīliào · Profil Murid</span></h1>
<label><b>姓名 · xìngmíng · Nama</b></label><input id="nameInput" class="field" value="${p.name==="Murid"?"":p.name}" placeholder="写你的名字…">
<h3>头像 · tóuxiàng · Avatar</h3><div class="avatars">${["🐼","🦉","🐉","🐰"].map(x=>`<button class="avatar ${x===state.selectedAvatar?"selected":""}" data-avatar="${x}">${x}</button>`).join("")}</div>
<button class="btn red" id="saveProfile">${tri("保存","bǎocún","Simpan")}</button></section></main>`},

map:()=>{const p=profile();return `<main class="screen">${nav()}<section class="card"><h1>世界地图<br><span class="small">Shìjiè Dìtú · Peta Dunia</span></h1>
<div class="worlds">${C.worlds.map(w=>{const unlocked=w.unit<=p.worlds+1;return `<div class="world ${unlocked?"":"locked"}"><div class="wi">${w.icon}</div><div><b>${w.hanzi}</b><br><span class="small">${w.pinyin}<br>${w.malay}</span></div><button class="enter" ${unlocked?`data-unit="${w.unit}"`:""}>${unlocked?`进入<br><span class="small">jìnrù · Masuk</span>`:"🔒"}</button></div>`}).join("")}</div></section></main>`},

intro:()=>{const w=C.worlds[state.unit-1],u=safeUnit();return `<main class="screen">${nav()}<section class="card hero"><div class="mascot">${w.icon}</div><h1>${w.hanzi}<br><span class="small">${w.pinyin} · ${w.malay}</span></h1>
<p>💎 Kristal ${w.crystal}</p><div class="notice">${u.story.length?"Cerita unit tersedia.":"Kandungan rasmi unit belum dimasukkan."}</div>
<button class="btn blue" id="openStory">${tri("故事","gùshi","Cerita")}</button>
<button class="btn green" id="startActivities">${tri("开始任务","kāishǐ rènwù","Mulakan Misi")}</button></section></main>`},

story:()=>{const u=safeUnit(),s=u.story[state.storyIndex];if(!s)return emptyUnit("Cerita");return `<main class="screen">${nav()}<section class="card"><h2>故事<br><span class="small">gùshi · Cerita</span></h2>
<div class="story-image">${s.image}</div><div class="content-block"><div class="hanzi">${s.hanzi}</div><div class="pinyin">${s.pinyin}</div><div class="malay">${s.malay}</div></div>
<div class="grid"><button class="btn orange" id="storyPrev">${tri("上一页","shàng yī yè","Sebelumnya")}</button><button class="btn green" id="storyNext">${tri("下一页","xià yī yè","Seterusnya")}</button></div></section></main>`},

activity:()=>{const u=safeUnit(),q=u.activities[state.activityIndex];if(!q)return emptyUnit("Aktiviti");return `<main class="screen">${nav()}<section class="card"><div class="status"><span class="pill">❤️ ${state.hearts}</span><span class="pill">⭐ ${state.stars}</span><span class="pill">${state.activityIndex+1}/${u.activities.length}</span></div>
<div class="progress"><div style="width:${state.activityIndex/u.activities.length*100}%"></div></div>${renderQuestion(q)}<div id="feedback" class="feedback"></div></section></main>`},

boss:()=>{const u=safeUnit(),q=u.boss[state.bossIndex];if(!q)return emptyUnit("Cabaran Naga");return `<main class="screen">${nav()}<section class="card"><h1>神龙挑战<br><span class="small">Shénlóng Tiǎozhàn · Cabaran Naga</span></h1><div class="center mascot">🐉</div>
<div class="hp-row"><div class="hp"><b>神龙 · Naga</b><div class="hpbar"><div class="dragon" style="width:${state.dragonHP}%"></div></div></div><div class="hp"><b>学生 · Murid</b><div class="hpbar"><div class="player" style="width:${state.playerHP}%"></div></div></div></div>
${renderQuestion(q)}<div id="feedback" class="feedback"></div></section></main>`},

reward:()=>`<main class="screen"><section class="card hero"><div class="reward">💎</div><h1>恭喜<br><span class="small">gōngxǐ · Tahniah</span></h1><h2>任务完成<br><span class="small">rènwù wánchéng · Misi Selesai</span></h2>
<p>⭐ ${state.stars}　💎 1</p><button class="btn green" data-go="passport">${tri("查看护照","chákàn hùzhào","Lihat Pasport")}</button><button class="btn blue" data-go="map">${tri("返回地图","fǎnhuí dìtú","Kembali ke Peta")}</button></section></main>`,

passport:()=>{const p=profile();return `<main class="screen">${nav()}<section class="passport"><h1>华语护照<br><span class="small">Huáyǔ Hùzhào · Pasport Bahasa Cina</span></h1><h2>${p.avatar} ${p.name}</h2><p class="center">${"💎 ".repeat(p.crystals)}${"◇ ".repeat(5-p.crystals)}</p>
${skill("已完成的世界","yǐ wánchéng de shìjiè","Dunia Disiapkan",p.worlds/5*100,"#38ae6c")}
${skill("词语","cíyǔ","Kosa Kata",Math.min(100,p.stars*5),"#5b9eea")}
${skill("听力","tīnglì","Mendengar",Math.min(100,p.worlds*18),"#38ae6c")}
${skill("口语","kǒuyǔ","Bertutur",Math.min(100,p.worlds*12),"#f3c93e")}
${skill("阅读","yuèdú","Membaca",Math.min(100,p.worlds*15),"#9b6be6")}
${skill("书写","shūxiě","Menulis",Math.min(100,p.worlds*10),"#ed69b6")}
<button class="btn orange" data-go="map">${tri("地图","dìtú","Peta")}</button></section></main>`},

teacher:()=>{const p=profile();return `<main class="screen">${nav()}<section class="card"><h1>教师专区<br><span class="small">Jiàoshī Zhuānqū · Ruang Guru</span></h1>
<div class="grid"><div class="stat">⭐<h2>${p.stars}</h2>Bintang</div><div class="stat">💎<h2>${p.crystals}</h2>Kristal</div><div class="stat">📚<h2>${p.worlds}/5</h2>Unit</div><div class="stat">👤<h2>${p.name}</h2>Murid</div></div>
<h3>Senarai Semak Pentaksiran</h3>${["Mengenal kosa kata","Mendengar dan memilih jawapan","Bertutur dengan bimbingan","Membaca perkataan mudah","Menulis aksara sasaran"].map(x=>`<p><label><input type="checkbox"> ${x}</label></p>`).join("")}
<h3>Rekod Aktiviti</h3><table class="table"><tr><th>Unit</th><th>Status</th><th>Ganjaran</th></tr>${C.worlds.map(w=>`<tr><td>${w.unit}</td><td>${w.unit<=p.worlds?"Selesai":"Belum"}</td><td>${w.unit<=p.crystals?"💎":"—"}</td></tr>`).join("")}</table>
<button class="btn red" id="resetData">${tri("重置记录","chóngzhì jìlù","Tetapkan Semula Rekod")}</button></section></main>`}
};
function skill(h,p,m,v,c){return `<div class="skill"><b>${h} · ${p} · ${m}</b><div class="skillbar"><div style="width:${v}%;background:${c}"></div></div></div>`}
function emptyUnit(name){return `<main class="screen">${nav()}<section class="card hero"><div class="mascot">📚</div><h1>${name}</h1><div class="notice">Kandungan rasmi Unit ${state.unit} belum dimasukkan. Sistem tidak akan mencipta kosa kata atau ayat secara rawak.</div><button class="btn blue" data-go="map">${tri("返回地图","fǎnhuí dìtú","Kembali ke Peta")}</button></section></main>`}
function renderQuestion(q){
  const head=`<div class="content-block"><div class="hanzi">${q.hanzi||""}</div><div class="pinyin">${q.pinyin||""}</div><div class="malay">${q.malay||""}</div></div>`;
  if(q.type==="choice")return head+`<div class="answers">${q.options.map((o,i)=>`<button class="answer" data-choice="${i}">${o}</button>`).join("")}</div>`;
  if(q.type==="matching")return head+`<div class="match-grid">${q.pairs.map((x,i)=>`<button class="match-item" data-left="${i}">${x.left}</button>`).join("")}${q.pairs.map((x,i)=>`<button class="match-item" data-right="${i}">${x.right}</button>`).join("")}</div>`;
  if(q.type==="sentence")return head+`<div class="dropzone" id="dropzone"></div><div class="sentence-parts">${q.parts.map((x,i)=>`<button class="part" data-part="${i}">${x}</button>`).join("")}</div><button class="btn green" id="checkSentence">${tri("检查","jiǎnchá","Semak")}</button>`;
  return head;
}
function bind(){
  document.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>go(b.dataset.go));
  document.querySelectorAll("[data-avatar]").forEach(b=>b.onclick=()=>{state.selectedAvatar=b.dataset.avatar;render()});
  const sp=el("saveProfile");if(sp)sp.onclick=()=>{localStorage.setItem("qh_name",el("nameInput").value.trim()||"Murid");localStorage.setItem("qh_avatar",state.selectedAvatar);go("map")};
  document.querySelectorAll("[data-unit]").forEach(b=>b.onclick=()=>{state.unit=+b.dataset.unit;go("intro")});
  if(el("openStory"))el("openStory").onclick=()=>{state.storyIndex=0;go("story")};
  if(el("startActivities"))el("startActivities").onclick=()=>{state.activityIndex=0;state.hearts=3;state.stars=0;go("activity")};
  if(el("storyPrev"))el("storyPrev").onclick=()=>{state.storyIndex=Math.max(0,state.storyIndex-1);render()};
  if(el("storyNext"))el("storyNext").onclick=()=>{const n=safeUnit().story.length;if(state.storyIndex<n-1){state.storyIndex++;render()}else go("activity")};
  document.querySelectorAll("[data-choice]").forEach(b=>b.onclick=()=>handleChoice(+b.dataset.choice,b));
  document.querySelectorAll("[data-left]").forEach(b=>b.onclick=()=>{state.matchLeft=+b.dataset.left;b.classList.add("selected")});
  document.querySelectorAll("[data-right]").forEach(b=>b.onclick=()=>handleMatch(+b.dataset.right,b));
  document.querySelectorAll("[data-part]").forEach(b=>b.onclick=()=>{const i=+b.dataset.part;if(!state.sentenceAnswer.includes(i)){state.sentenceAnswer.push(i);b.classList.add("used");updateDropzone()}});
  if(el("checkSentence"))el("checkSentence").onclick=checkSentence;
  if(el("resetData"))el("resetData").onclick=()=>{["qh_name","qh_avatar","qh_stars","qh_crystals","qh_worlds"].forEach(k=>localStorage.removeItem(k));showToast("Rekod telah ditetapkan semula");setTimeout(()=>go("home"),700)};
}
function handleChoice(i,b){
  document.querySelectorAll(".answer").forEach(x=>x.disabled=true);
  const inBoss=state.screen==="boss";const q=inBoss?safeUnit().boss[state.bossIndex]:safeUnit().activities[state.activityIndex];
  if(i===q.correct){b.classList.add("correct");state.stars++;if(inBoss)state.dragonHP=Math.max(0,state.dragonHP-25);feedback("答对了 · dá duì le · Betul")}
  else{b.classList.add("wrong");if(inBoss)state.playerHP=Math.max(0,state.playerHP-25);else state.hearts--;feedback("再试一次 · zài shì yí cì · Cuba Lagi")}
  setTimeout(()=>inBoss?advanceBoss():advanceActivity(),900);
}
function handleMatch(i,b){
  if(state.matchLeft===null){showToast("Pilih bahagian kiri dahulu");return}
  if(i===state.matchLeft){b.classList.add("done");document.querySelector(`[data-left="${i}"]`).classList.add("done");state.matchDone++;state.matchLeft=null;if(state.matchDone>=safeUnit().activities[state.activityIndex].pairs.length){state.stars++;setTimeout(advanceActivity,600)}}
  else{state.hearts--;feedback("再试一次 · zài shì yí cì · Cuba Lagi");state.matchLeft=null;setTimeout(render,700)}
}
function updateDropzone(){const q=safeUnit().activities[state.activityIndex],d=el("dropzone");if(d)d.innerHTML=state.sentenceAnswer.map(i=>`<span class="part">${q.parts[i]}</span>`).join("")}
function checkSentence(){const q=safeUnit().activities[state.activityIndex];if(JSON.stringify(state.sentenceAnswer)===JSON.stringify(q.correctOrder)){state.stars++;feedback(`答对了 · Betul<br>${q.fullHanzi}<br>${q.fullPinyin}<br>${q.fullMalay}`);setTimeout(advanceActivity,1100)}else{state.hearts--;state.sentenceAnswer=[];feedback("再试一次 · Cuba Lagi");setTimeout(render,800)}}
function feedback(t){if(el("feedback"))el("feedback").innerHTML=t}
function advanceActivity(){
  state.matchLeft=null;state.matchDone=0;state.sentenceAnswer=[];
  if(state.hearts<=0){state.hearts=3;state.activityIndex=0;state.stars=0;showToast("乐乐等你回来 · Lele menunggu kamu kembali");render();return}
  state.activityIndex++;
  if(state.activityIndex>=safeUnit().activities.length){state.bossIndex=0;state.dragonHP=100;state.playerHP=100;go("boss")}else render()
}
function advanceBoss(){
  if(state.dragonHP<=0){completeUnit();return}
  if(state.playerHP<=0){state.playerHP=100;state.dragonHP=100;state.bossIndex=0;showToast("再试一次 · Cuba Lagi");render();return}
  state.bossIndex=(state.bossIndex+1)%safeUnit().boss.length;render()
}
function completeUnit(){
  const p=profile();localStorage.setItem("qh_stars",p.stars+state.stars);
  if(state.unit===p.worlds+1)localStorage.setItem("qh_worlds",state.unit);
  localStorage.setItem("qh_crystals",Math.max(p.crystals,state.unit));go("reward")
}
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js"));
render();
