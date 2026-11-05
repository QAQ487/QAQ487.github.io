/* ===== UX principle demos (canvas, hi-res text) ===== */
(()=>{
const LBL=[['Potion','Ether','Rope','Key'],['Slash','Guard','Dash','Heal'],['Town','Field','Pond','Gate']];
const TABS=['ITEM','SKILL','MAP'],ROWS=[['Potion','x3'],['Ether','x1'],['Rope','x2'],['Key','x1']];
function panel(c,x,y,w,h,tab,tabX,focus,fs,dim=1){R(c,x,y,w,h,'rgba(20,26,36,.94)');R(c,x,y,w,1,P.gold);R(c,x,y+h-1,w,1,'#2f3a4d');
 TABS.forEach((s,i)=>txt(c,s,x+10+i*(w-20)/3+(w-20)/6,y+9,i===tab?'#e9edf2':'#7d8798',6));R(c,x+10+tabX*(w-20)/3+4,y+15,(w-20)/3-8,2,P.cyan);
 ROWS.forEach((r,i)=>{const ry=y+24+i*14,f=i===focus;if(f){c.save();const cx=x+w/2,cy=ry+5;c.translate(cx,cy);c.scale(fs,fs);c.translate(-cx,-cy);R(c,x+6,ry,w-12,11,'rgba(127,227,216,.18)');R(c,x+6,ry,2,11,P.cyan);c.restore()}txt(c,LBL[tab][i],x+14,ry+6,f?'#ffffff':'#cfd8e3',6,'left');if(tab===0)txt(c,r[1],x+w-12,ry+6,'#9aa6b8',6,'right')})}
/* timeline shared by both demos */
const tl16=u=>{const open=seg(u,.05,.18),close=seg(u,.86,.96),tabX=prKeys([[0,0],[.34,0],[.42,1],[.6,1],[.68,2],[1,2]],u,eo),tab=u<.38?0:u<.64?1:2,focus=u<.24?0:u<.3?1:u<.38?2:u<.5?0:u<.64?1:u<.76?0:1;const tf=[.24,.3,.38,.5,.64,.76].reduce((a,b)=>u>=b?b:a,0);return{open,close,tabX,tab,focus,tf}};
DEMOS['UX-16']={d:6,hi:true,f:(c,t,_w,_h,p)=>{c.scale(2,2);const u=prWrap(t),s=tl16(u);c.drawImage(scene('eday'),0,0);R(c,0,0,W,H,'rgba(13,22,48,'+(.45*eo(s.open)*(1-s.close)).toFixed(3)+')');
 const px=lerp(W+4,W-118,eo(s.open))+lerp(0,122,ei(s.close)),fe=(u-s.tf)*p.dur,fs=1+.08*Math.exp(-fe*10)*Math.cos(fe*30);panel(c,px,16,110,84,s.tab,s.tabX,s.focus,fs);
 prTag(c,u<.2?'panel slides in':u<.34?'focus bounce':u<.7?'tab underline glides':u<.86?'focus bounce':'panel slides out',4,4,P.gold);prTag(c,'UI motion',4,H-14,'#e9edf2')}};
/* UX-20 reduced motion: same states, no travel */
DEMOS['UX-20']={d:6,hi:true,f:(c,t,_w,_h,p)=>{c.scale(2,2);const u=prWrap(t),s=tl16(u);for(const i of[0,1]){const x0=i*121;c.save();c.beginPath();c.rect(x0,0,119,H);c.clip();c.translate(x0,0);
 R(c,0,0,119,H,P.sky);const drift=i?0:u*60;for(let k=0;k<4;k++){const x=((k*40+hash(k+3)*20-drift)%160+160)%160-30;R(c,x,10+k*7,22,4,'#d8eef7')}c.fillStyle='#8cc79a';for(let k=-1;k<4;k++){const hx=k*45-(i?0:(u*30)%45);c.beginPath();c.arc(hx+22,H,30,Math.PI,0);c.fill()}R(c,0,H-18,119,18,P.grass);
 const bob=i?0:Math.round(Math.sin(u*TAU*4)*2);spr(c,'hero',12,H-14+bob,{sx:2,sy:2});
 const op=i?(s.open>0?1:0)*(s.close<1?1:0):1,px=i?28:lerp(124,28,eo(s.open))+lerp(0,96,ei(s.close)),fe=(u-s.tf)*p.dur,fs=i?1:1+.08*Math.exp(-fe*10)*Math.cos(fe*30);
 if(op>0){c.save();c.translate(px,0);c.scale(.8,.8);panel(c,0,30,112,84,s.tab,i?s.tab:s.tabX,s.focus,fs);c.restore()}c.restore()}R(c,119,0,2,H,P.ink);
 prTag(c,'DEFAULT',4,4,'#e9edf2');prTag(c,'REDUCED MOTION',125,4,P.cyan);txt(c,'bg moves, slide, bob',70,H-7,'#ffffff',5);txt(c,'static, states snap',191,H-7,'#ffffff',5)}};

/* ---- remaining UX principle demos ---- */
const G=c=>c.scale(2,2);
const tri=(c,x,y,a,s,col)=>{c.fillStyle=col;c.beginPath();c.moveTo(x+Math.cos(a)*s,y+Math.sin(a)*s);c.lineTo(x+Math.cos(a+2.4)*s*.85,y+Math.sin(a+2.4)*s*.85);c.lineTo(x+Math.cos(a-2.4)*s*.85,y+Math.sin(a-2.4)*s*.85);c.fill()};
const diam=(c,x,y,s,col)=>{c.fillStyle=col;c.beginPath();c.moveTo(x,y-s);c.lineTo(x+s,y);c.lineTo(x,y+s);c.lineTo(x-s,y);c.fill()};
const hudHP=(c,hp,ammo,a=1)=>{if(a<=0)return;c.save();c.globalAlpha=a;for(let i=0;i<3;i++)spr(c,'heart',10+i*8,10,{sx:1,sy:1,alpha:i<Math.ceil(hp*3)?1:.25});bar(c,38,6,50,5,hp,hp<.35?P.red:'#5be35b');txt(c,Math.round(hp*100)+'%',92,9,'#e9edf2',5,'left');R(c,W-58,4,52,14,'rgba(10,14,24,.7)');txt(c,'AMMO '+ammo,W-32,11,'#e9edf2',6);c.restore()};
const chest=(c,x,y,open=0)=>{R(c,x-8,y-8,16,8,P.wood);R(c,x-8,y-4,16,4,P.woodD);R(c,x-2,y-6,4,2,P.gold);if(open)R(c,x-8,y-14,16,6,P.wood)};
const gateBlock=(c,x,y,w,h,locked)=>{R(c,x,y,w,h,P.stone);R(c,x,y,w,3,P.stoneD);for(let i=0;i<3;i++)R(c,x+4+i*((w-8)/3),y+6,3,h-10,P.stoneD);if(locked){circ(c,x+w/2,y+h/2,4,P.gold);R(c,x+w/2-1,y+h/2,2,5,P.gold)}};

/* UX-01 HUD overlay that can hide contextually */
DEMOS['UX-01']={d:5,hi:true,f:(c,t)=>{G(c);const u=prWrap(t);c.drawImage(scene('eday'),0,0);const hx=lerp(50,170,ease(prTri(u))),hide=u>.55&&u<.78;shadow(c,hx,98,6);spr(c,'hero',hx,98,{sx:2,sy:2,flip:u>.5});hudHP(c,.72,24,hide?1-ease(seg(u,.55,.62))+ease(seg(u,.72,.78)):1);prTag(c,hide?'HUD hidden':'HUD active',4,H-14,hide?'#9aa6b8':P.gold);prTag(c,'play-time status',4,4,'#e9edf2')}};

/* UX-02 resource meters: length + number + segments */
DEMOS['UX-02']={d:5,hi:true,f:(c,t)=>{G(c);const u=prWrap(t),hp=.72-seg(u,.2,.35)*.4+seg(u,.7,.85)*.4,mp=.45+Math.sin(u*TAU)*.15,st=Math.max(0,1-seg(u,.4,.55)+seg(u,.85,1));
 R(c,0,0,W,H,'#16202e');R(c,16,18,208,100,'#1d2533');R(c,16,18,208,1,P.gold);
 const meters=[['HP',hp,P.red,Math.round(hp*100)+'/100'],['MP',mp,P.cyan,Math.round(mp*10)+'/10'],['STAMINA',st,P.gold,String(Math.round(st*5))+'/5']];
 meters.forEach(([n,v,col,lab],i)=>{const y=36+i*28;txt(c,n,28,y+5,'#cfd8e3',6,'left');bar(c,70,y,110,10,v,col);txt(c,lab,188,y+5,col,6,'left');
  if(i===2)for(let k=0;k<5;k++){R(c,70+k*22,y,20,10,'rgba(0,0,0,.25)');if(k<Math.round(v*5))R(c,70+k*22+1,y+1,18,8,P.gold);R(c,70+k*22+20,y,1,10,'#16202e')}});
 prTag(c,'length · number · segments',4,4,P.cyan);prTag(c,'color is not the only cue',4,H-14,'#e9edf2')}};

/* UX-03 reticle: aim ≠ impact */
DEMOS['UX-03']={d:5,hi:true,f:(c,t)=>{G(c);const u=prWrap(t);c.drawImage(scene('eday'),0,0);const hx=70,hy=100,fx=170,fy=70;shadow(c,hx,hy,6);spr(c,'hero',hx,hy,{sx:2,sy:2});shadow(c,fx,fy,5);spr(c,'foe',fx,fy,{sx:2,sy:2,flip:true});
 const rx=140,ry=62;R(c,rx-8,ry,16,1,'#e9edf2');R(c,rx,ry-8,1,16,'#e9edf2');ring(c,rx,ry,10,1,P.cyan);prTag(c,'RETICLE',rx+14,ry-10,P.cyan);
 const shot=seg(u,.25,.7);if(shot>0){c.save();c.strokeStyle=P.gold;c.lineWidth=1.5;c.beginPath();for(let i=0;i<=20;i++){const k=i/20*shot,x=lerp(hx+10,rx+30,k),y=lerp(hy-14,ry,k)-Math.sin(k*Math.PI)*28;i?c.lineTo(x,y):c.moveTo(x,y)}c.stroke();c.restore();
  const bx=lerp(hx+10,rx+30,shot),by=lerp(hy-14,ry,shot)-Math.sin(shot*Math.PI)*28;circ(c,bx,by,2,P.gold)}
 if(u>.55)prTag(c,'shot curves away',W-4,4,P.gold,'rgba(10,14,24,.75)',6,'right');prTag(c,'aim ≠ impact',4,4,'#e9edf2')}};

/* UX-04 waypoint diamond vs objective tracker */
DEMOS['UX-04']={d:6,hi:true,f:(c,t)=>{G(c);const u=prWrap(t),hx=lerp(60,320,u),hy=198+Math.sin(u*TAU)*8,z=1+.15*Math.sin(u*TAU);prView(c,hx,hy,z,g=>{shadow(g,hx,hy,5);prWalker(g,hx,hy,hx/10,{s:1.4,flip:false});
  R(g,300,150,40,80,P.stone);R(g,300,150,40,4,P.stoneD);const bob=5+Math.sin(u*TAU*4)*2;diam(g,340,120,bob,P.gold);prLine(g,hx,hy-16,340,126,'rgba(242,201,76,.35)',1,[2,2])});
 const[mx,my]=prW2S(340,120,hx,hy,z);const dist=Math.round(Math.hypot(340-hx,120-hy)/4);if(mx>-10&&mx<W+10){diam(c,clamp(mx,10,W-10),clamp(my,14,H-20),5,P.gold);txt(c,dist+'m',clamp(mx,10,W-10),clamp(my,14,H-20)-10,P.gold,5)}
 R(c,4,4,110,22,'rgba(10,14,24,.8)');txt(c,'OBJ  Reach the gate',8,11,'#e9edf2',6,'left');txt(c,'tracker = what',8,20,P.cyan,5,'left');
 prTag(c,'diamond = where',W-4,4,P.gold,'rgba(10,14,24,.75)',6,'right');prTag(c,'through wall != route',4,H-14,'#9aa6b8')}};

/* UX-05 contextual prompt: near + facing */
DEMOS['UX-05']={d:6,hi:true,f:(c,t)=>{G(c);const u=prWrap(t);c.drawImage(scene('eday'),0,0);const cx=150,cy=95;chest(c,cx,cy);const pathX=prKeys([[0,40],[.25,40],[.45,140],[.6,140],[.75,140],[.95,40],[1,40]],u);
 const faceR=pathX<145||(u>.45&&u<.72);shadow(c,pathX,cy+4,5);spr(c,'hero',pathX,cy+4,{sx:2,sy:2,flip:!faceR});
 const near=Math.abs(pathX-cx)<28&&faceR;if(near){const bob=Math.round(Math.sin(u*TAU*4));R(c,cx-22,cy-28+bob,44,14,'rgba(10,14,24,.85)');txt(c,'[E] Open',cx,cy-21+bob,P.gold,6);ring(c,cx,cy-4,18,1,'rgba(127,227,216,.5)')}
 prTag(c,near?'in range + facing':faceR?'too far':'wrong facing',4,4,near?P.cyan:P.gold);prTag(c,'contextual prompt',4,H-14,'#e9edf2')}};

/* UX-06 focus ≠ equipped selection */
DEMOS['UX-06']={d:5,hi:true,f:(c,t)=>{G(c);const u=prWrap(t),focus=Math.floor(u*6)%3,pulse=.5+.5*Math.sin(u*TAU*6);R(c,0,0,W,H,'#16202e');R(c,30,16,180,104,'#1d2533');R(c,30,16,180,1,P.gold);txt(c,'EQUIPMENT',40,26,'#9aa6b8',6,'left');
 const items=['Shield','Bow','Potion'];items.forEach((n,i)=>{const y=40+i*24,f=i===focus,eq=i===0;R(c,42,y,156,18,f?'rgba(127,227,216,'+(.15+.15*pulse)+')':eq?'rgba(242,201,76,.12)':'#141a24');
  if(f)R(c,42,y,3,18,P.cyan);if(eq)R(c,42,y,156,1,P.gold);txt(c,n,52,y+9,f?'#fff':'#cfd8e3',7,'left');if(eq)txt(c,'EQUIPPED',188,y+9,P.gold,5,'right');if(f)txt(c,'FOCUS',188,y+9,P.cyan,5,'right')});
 R(c,42,118,156,3,'#2f3a4d');R(c,42+focus*52,118,52,3,P.cyan);prTag(c,'focus moves; shield stays equipped',4,H-14,'#e9edf2')}};

/* UX-07 tabs + focus order arrows */
DEMOS['UX-07']={d:6,hi:true,f:(c,t)=>{G(c);const u=prWrap(t),tabX=prKeys([[0,0],[.28,0],[.38,1],[.62,1],[.72,2],[1,2]],u,eo),tab=Math.round(tabX),fi=Math.floor(u*8)%4;R(c,0,0,W,H,'#16202e');R(c,20,14,200,108,'#1d2533');R(c,20,14,200,1,P.gold);
 const tabs=['EQUIP','SKILL','MAP'];tabs.forEach((s,i)=>{const x=30+i*64,on=i===tab;R(c,x,22,58,14,on?'#2a3a52':'#141a24');txt(c,s,x+29,29,on?P.cyan:'#7d8798',6)});R(c,30+tabX*64+4,34,50,2,P.cyan);
 const names=[['Sword','Bow','Shield','Cape'],['Slash','Guard','Dash','Heal'],['Town','Field','Pond','Gate']][tab];
 names.forEach((n,i)=>{const col=i%2,r=Math.floor(i/2),x=40+col*90,y=50+r*28,f=i===fi;R(c,x,y,80,22,f?'rgba(127,227,216,.25)':'#141a24');if(f)R(c,x,y,2,22,P.cyan);txt(c,n,x+40,y+11,f?'#fff':'#cfd8e3',6)});
 const order=[[80,61],[170,61],[170,89],[80,89]];for(let i=0;i<3;i++){const a=order[i],b=order[i+1];prLine(c,a[0],a[1],b[0],b[1],'rgba(242,201,76,.7)',1);tri(c,b[0],b[1],Math.atan2(b[1]-a[1],b[0]-a[0]),4,P.gold)}
 const cur=order[fi];ring(c,cur[0],cur[1],8+Math.sin(u*TAU*4)*2,1,P.gold);prTag(c,'tabs switch · arrows = focus order',4,H-14,P.gold)}};

/* UX-08 modal: focus trapped, world may keep moving */
DEMOS['UX-08']={d:5,hi:true,f:(c,t)=>{G(c);const u=prWrap(t);c.drawImage(scene('eday'),0,0);const hx=30+((u*140)%180),bob=Math.round(Math.sin(u*TAU*5)*2);shadow(c,hx,98,5);spr(c,'hero',hx,98+bob,{sx:2,sy:2,flip:Math.sin(u*TAU*2)>0});
 R(c,0,0,W,H,'rgba(13,22,48,'+(.4+.2*Math.sin(u*TAU))+')');R(c,50,28,140,78,'#1d2533');R(c,50,28,140,1,P.gold);txt(c,'Delete this save?',120,44,'#e9edf2',7);
 const focus=Math.floor(u*6)%2,pulse=.5+.5*Math.sin(u*TAU*8);[['CANCEL',70],['DELETE',130]].forEach(([n,x],i)=>{const f=i===focus;R(c,x-24,70,48,16,f?'rgba(127,227,216,'+(.2+.2*pulse)+')':'#141a24');if(f)R(c,x-24,70,2,16,i?P.red:P.cyan);txt(c,n,x,78,i?P.red:'#e9edf2',6)});
 prTag(c,'focus trapped in modal',4,4,P.gold);prTag(c,'bg still moves',4,H-14,'#9aa6b8')}};

/* UX-09 progressive disclosure */
DEMOS['UX-09']={d:5,hi:true,f:(c,t)=>{G(c);const u=prWrap(t),vol=.4+.35*Math.sin(u*TAU),open=u>.3&&u<.8,k=ease(seg(u,.3,.42))*(1-ease(seg(u,.7,.8)));R(c,0,0,W,H,'#16202e');
 R(c,20,16,200,lerp(70,104,k),'#1d2533');R(c,20,16,200,1,P.gold);txt(c,'SETTINGS',30,26,'#9aa6b8',6,'left');
 txt(c,'Volume',30,44,'#e9edf2',6,'left');bar(c,80,40,90,6,vol,P.cyan);txt(c,String(Math.round(vol*100)),178,44,'#cfd8e3',6,'left');
 const subOn=u<.5;txt(c,'Subtitles',30,60,'#e9edf2',6,'left');txt(c,subOn?'ON':'OFF',100,60,subOn?P.cyan:P.red,6,'left');
 R(c,30,72,120,14,open?'rgba(127,227,216,.2)':'#141a24');txt(c,(open?'v':'>')+' Advanced',90,79,open?P.cyan:'#cfd8e3',6);
 if(k>0){c.globalAlpha=k;txt(c,'VSync          OFF',40,96,'#9aa6b8',5,'left');txt(c,'Bloom quality  HIGH',40,106,'#9aa6b8',5,'left');c.globalAlpha=1}
 prTag(c,'optional details',4,H-14,P.gold)}};

/* UX-10 subtitles vs captions */
DEMOS['UX-10']={d:6,hi:true,f:(c,t)=>{G(c);const u=prWrap(t);c.drawImage(scene('eday'),0,0);const hx=70+Math.sin(u*TAU)*8,nx=155+Math.cos(u*TAU*1.5)*6;shadow(c,hx,98,5);spr(c,'hero',hx,98,{sx:2,sy:2,flip:u>.5});shadow(c,nx,90,5);spr(c,'npc',nx,90,{sx:2,sy:2});
 const lines=[[0,'"Did you hear that?"',0],[.25,'[door slams]',1],[.45,'"Did you hear that?"',1],[.65,'"Stay close."',0],[.85,'[footsteps]',1]],line=lines.reduce((a,b)=>u>=b[0]?b:a);
 R(c,20,108,200,20,'rgba(10,14,24,.85)');txt(c,line[1],120,118,line[2]?P.gold:'#e9edf2',6);
 if(line[2]&&u>.25&&u<.45){R(c,170,40,20,50,P.wood);c.globalAlpha=.5+Math.sin(u*40)*.3;R(c,0,0,W,H,'rgba(20,20,30,.15)');c.globalAlpha=1}
 prTag(c,line[2]?'CAPTION':'SUBTITLE',4,4,line[2]?P.gold:P.cyan);prTag(c,'not every sound',4,H-14,'#9aa6b8')}};

/* UX-11 diegetic: physical terminal in world */
DEMOS['UX-11']={d:5,hi:true,f:(c,t)=>{G(c);const u=prWrap(t);R(c,0,0,W,H,P.sky);R(c,0,90,W,45,P.dirtD);R(c,0,90,W,4,P.grass);R(c,140,50,40,40,P.stone);R(c,148,58,24,18,'#0a2030');
 const blink=Math.floor(u*6)%2;R(c,152,62,16,10,blink?P.cyan:'#1a4050');txt(c,'AIR',160,67,blink?'#0a2030':'#7fe3d8',5);txt(c,'OK',160,74,P.cyan,5);
 const hx=lerp(40,128,ease(seg(u,0,.35)));shadow(c,hx,100,6);spr(c,'hero',hx,100,{sx:2,sy:2});
 if(u>.4){R(c,148,40,24,12,'rgba(10,14,24,.0)');prTag(c,'reads terminal',120,20,P.gold);ring(c,160,67,16,1,'rgba(127,227,216,.4)')}
 prTag(c,'DIEGETIC',4,4,P.cyan);prTag(c,'fiction object, not HUD',4,H-14,'#e9edf2')}};

/* UX-12 non-diegetic overlay UI */
DEMOS['UX-12']={d:5,hi:true,f:(c,t)=>{G(c);const u=prWrap(t);c.drawImage(scene('eday'),0,0);const hx=lerp(60,160,ease(prTri(u)));shadow(c,hx,98,5);spr(c,'hero',hx,98,{sx:2,sy:2,flip:u>.5});
 hudHP(c,.65,12);R(c,W-54,22,48,28,'rgba(10,14,24,.75)');['A','B','C'].forEach((n,i)=>{R(c,W-48+i*14,28,12,12,i===1?P.gold:'#2f3a4d');txt(c,n,W-42+i*14,34,i===1?P.ink:'#9aa6b8',5)});
 prTag(c,'OVERLAY for player',4,4,P.gold);prTag(c,'not for the character',4,H-14,'#9aa6b8')}};

/* UX-13 spatial UI: scene-anchored nameplate + trail */
DEMOS['UX-13']={d:6,hi:true,f:(c,t)=>{G(c);const u=prWrap(t),fx=lerp(100,280,ease(prTri(u))),fy=210;prView(c,fx,fy,1.2,g=>{
  for(let i=8;i>=0;i--){const k=i/8,px=fx-k*40*(u<.5?1:-1),py=fy;R(g,px-1,py-1,2,2,'rgba(127,227,216,'+((1-k)*.7)+')')}
  shadow(g,fx,fy,5);spr(g,'foe',fx,fy,{sx:1.5,sy:1.5,flip:u>.5});R(g,fx-16,fy-22,32,10,'rgba(10,14,24,.75)');txt(g,'SLIME',fx,fy-17,'#e9edf2',5)});
 prTag(c,'SPATIAL: anchored',4,4,P.cyan);prTag(c,'not physical to NPCs',4,H-14,'#9aa6b8')}};

/* UX-14 meta UI: injury vignette */
DEMOS['UX-14']={d:5,hi:true,f:(c,t)=>{G(c);const u=prWrap(t),hp=clamp(.95-u*.7+.2*Math.sin(u*TAU*2)),hx=100+Math.sin(u*TAU)*30;c.drawImage(scene('eday'),0,0);shadow(c,hx,98,6);spr(c,'hero',hx,98,{sx:2,sy:2,flash:hp<.4&&Math.floor(u*16)%2?1:0,flip:u>.5});
 const hurt=1-hp,pulse=hurt>.3?.7+.3*Math.sin(u*TAU*8):1;if(hurt>.05)vignette(c,'rgba(200,20,20,A)',hurt*.8*pulse,.18+hurt*.25);bar(c,8,8,60,5,hp,hp<.35?P.red:'#5be35b');txt(c,Math.round(hp*100)+'%',72,11,'#e9edf2',5,'left');
 prTag(c,'META: edge injury',4,H-14,P.red);prTag(c,'no physical panel',W-4,4,'#e9edf2','rgba(10,14,24,.75)',6,'right')}};

/* UX-15 world-space vs screen-space UI */
DEMOS['UX-15']={d:5,hi:true,f:(c,t)=>{G(c);const u=prWrap(t);for(const i of[0,1]){const x0=i*121;c.save();c.beginPath();c.rect(x0,0,119,H);c.clip();c.translate(x0,0);
  R(c,0,0,119,H,P.sky);R(c,0,90,119,45,P.grass);const hx=40+Math.sin(u*TAU)*10,hy=100;shadow(c,hx,hy,5);spr(c,'hero',hx,hy,{sx:2,sy:2});
  if(i===0){/* world-space bar above head, occluded by tree */tree(c,55,70);bar(c,hx-16,hy-28,32,4,.7,P.red);R(c,48,hy-32,20,12,P.leaf);prTag(c,'WORLD',4,4,P.cyan)}
  else{bar(c,8,8,50,5,.7,P.red);txt(c,'HP',62,11,'#e9edf2',5,'left');tree(c,55,70);prTag(c,'SCREEN',4,4,P.gold)}
  c.restore()}R(c,119,0,2,H,P.ink);prTag(c,'space ≠ diegetic',4,H-14,'#e9edf2')}};

/* UX-17 directional damage indicator */
DEMOS['UX-17']={d:4,hi:true,f:(c,t)=>{G(c);const u=prWrap(t);c.drawImage(scene('eday'),0,0);shadow(c,120,98,6);spr(c,'hero',120,98,{sx:2,sy:2,flash:u>.3&&u<.38?1:0});
 const hit=u>=.3&&u<.75,a=hit?eo(seg(u,.3,.4))*(1-ease(seg(u,.55,.75))):0;if(a>0){c.save();c.translate(120,90);c.rotate(-2.2);c.globalAlpha=a;c.fillStyle=P.red;c.beginPath();c.moveTo(0,0);c.arc(0,0,38,-.55,.55);c.closePath();c.fill();c.restore()}
 const hp=.85-seg(u,.3,.4)*.35;bar(c,8,8,60,5,hp,P.red);prTag(c,'INCOMING sector',4,H-14,P.red);prTag(c,'not hit confirm',W-4,4,'#e9edf2','rgba(10,14,24,.75)',6,'right')}};

/* UX-18 multimodal redundant cues */
DEMOS['UX-18']={d:5,hi:true,f:(c,t)=>{G(c);const u=prWrap(t),hits=[.15,.45,.75],hit=hits.some(h=>u>=h&&u<h+.18),hk=hits.reduce((a,h)=>u>=h&&u<h+.18?seg(u,h,h+.18):a,0);
 c.drawImage(scene('eday'),0,0);const hx=90+Math.sin(u*TAU)*8,fx=155+Math.cos(u*TAU*1.3)*10;if(hit){c.globalAlpha=.45*(1-hk);R(c,0,0,W,H,P.gold);c.globalAlpha=1}
 shadow(c,hx,98,5);spr(c,'hero',hx,98,{sx:2,sy:2});shadow(c,fx,90,5);spr(c,'foe',fx,90,{sx:2,sy:2,flip:true,flash:hit&&hk<.25?1:0});
 if(hit)burst(c,(hx+fx)/2,80,hk*2,12,5,{speed:55,life:.5,col:P.gold});
 [['VISUAL',4,P.gold],['AUDIO',84,P.cyan],['HAPTIC',164,'#9a5ad1']].forEach(([n,x,col],i)=>{const on=hit;R(c,x,112,72,16,on?col:'#1d2533');txt(c,n,x+36,120,on?P.ink:'#7d8798',5);
  if(i===1&&hit){for(let j=0;j<3;j++)ring(c,x+36,120,4+j*3+hk*6,1,'rgba(127,227,216,'+(1-hk)*(1-j*.3)+')')}
  if(i===2&&hit){const shake=Math.sin(hk*50)*3;R(c,x+28+shake,116,16,8,'#cfd8e3')}});
 prTag(c,'one event · three channels',4,4,'#e9edf2')}};

/* UX-21 affordance: ability meets geometry */
DEMOS['UX-21']={d:5,hi:true,f:(c,t)=>{G(c);const u=prWrap(t);for(const i of[0,1]){const y0=i?69:0;c.save();c.beginPath();c.rect(0,y0,W,66);c.clip();R(c,0,y0,W,66,P.sky);R(c,0,y0+50,W,16,P.grass);R(c,100,y0+30,40,20,P.stone);R(c,100,y0+30,40,3,P.grass);
  const can=i===1;let hx=lerp(40,can?160:95,ease(seg(u,.15,.55))),hy=y0+54;if(can&&u>.35&&u<.55){const k=seg(u,.35,.55);hy=y0+54-Math.sin(k*Math.PI)*22;hx=lerp(90,160,k)}
  shadow(c,hx,y0+54,5);prWalker(c,hx,hy,hx/10,{s:1.6,still:can&&u>.35&&u<.55});
  prTag(c,can?'CAN VAULT':'NO ABILITY',4,y0+3,can?P.cyan:P.red);c.restore()}R(c,0,66,W,3,P.ink);prTag(c,'same wall · rules decide',4,H-14,'#e9edf2')}};

/* UX-22 signifier: stripes suggest action */
DEMOS['UX-22']={d:5,hi:true,f:(c,t)=>{G(c);const u=prWrap(t);c.drawImage(scene('eday'),0,0);R(c,160,60,30,40,P.wood);for(let i=0;i<5;i++)R(c,160,64+i*6,30,3,i%2?P.gold:P.woodD);R(c,186,78,6,4,P.stone); /* handle */
 const hx=lerp(50,155,ease(seg(u,0,.4)));shadow(c,hx,100,5);spr(c,'hero',hx,100,{sx:2,sy:2});
 const tryOpen=u>.45&&u<.7;if(tryOpen){prTag(c,'LOCKED',175,50,P.red);ring(c,175,80,20,1,'rgba(224,74,58,.6)');txt(c,'✗',175,80,P.red,10)}
 prTag(c,'SIGNIFIER',4,4,P.gold);prTag(c,tryOpen?'false expectation':'stripes + handle',4,H-14,tryOpen?P.red:'#e9edf2')}};

/* UX-23 wayfinding: locate then choose */
DEMOS['UX-23']={d:6,hi:true,f:(c,t)=>{G(c);const u=prWrap(t),hx=lerp(200,480,ease(seg(u,.15,.85))),hy=200;prView(c,hx,hy,.9,g=>{
  R(g,380,140,40,70,P.wall);R(g,380,140,40,4,P.roof);txt(g,'LAB',400,155,P.cyan,5);R(g,520,140,40,70,P.wall);R(g,520,140,40,4,P.leaf);txt(g,'GARDEN',540,155,'#7ee36b',4);
  R(g,440,180,20,40,P.dirt);shadow(g,hx,hy,5);prWalker(g,hx,hy,hx/14,{s:1.3});
  if(u<.3){ring(g,hx,hy-8,12,1,P.gold);txt(g,'YOU',hx,hy-20,P.gold,5)}});
 prTag(c,u<.3?'1 LOCATE':'2 CHOOSE path',4,4,u<.3?P.gold:P.cyan);prTag(c,'player decisions',4,H-14,'#e9edf2')}};

/* UX-24 signpost at junction */
DEMOS['UX-24']={d:5,hi:true,f:(c,t)=>{G(c);const u=prWrap(t);R(c,0,0,W,H,P.sky);R(c,0,100,W,35,P.grass);R(c,0,95,W,6,P.dirt);R(c,118,70,4,30,P.woodD);
 R(c,100,58,40,18,'#1d2533');R(c,100,58,40,1,P.gold);txt(c,'< TOWN',120,64,'#cfd8e3',5);txt(c,'GATE >',120,72,P.cyan,5);
 R(c,40,70,36,30,P.wall);txt(c,'INN',58,78,'#9aa6b8',5);R(c,170,70,36,30,P.stone);txt(c,'GATE',188,78,P.cyan,5);
 const hx=lerp(20,200,ease(prTri(u)));shadow(c,hx,108,5);spr(c,'hero',hx,108,{sx:2,sy:2,flip:u>.5});
 prTag(c,'SIGNPOST',4,4,P.gold);prTag(c,'junction cue',4,H-14,'#e9edf2')}};

/* UX-25 landmark tower */
DEMOS['UX-25']={d:6,hi:true,f:(c,t)=>{G(c);const u=prWrap(t),ang=u*TAU,cx=480+Math.cos(ang)*160,cy=200+Math.sin(ang)*90;
 prView(c,cx,cy,.9,g=>{tower(g,480,180);house(g,400,210);house(g,560,220);tree(g,420,160);tree(g,540,150);
  const hx=cx,hy=cy+20;shadow(g,hx,hy,5);prWalker(g,hx,hy,u*8,{s:1.2,flip:Math.sin(ang)>0});prLine(g,hx,hy-10,480,160,'rgba(242,201,76,.5)',1,[2,2]);
  diam(g,480,155,4+Math.sin(u*TAU*3),P.gold)});
 prTag(c,'LANDMARK',4,4,P.gold);prTag(c,'orbit '+Math.round(u*360)+' deg',W-4,4,P.cyan,'rgba(10,14,24,.75)',6,'right');prTag(c,'orients from many paths',4,H-14,'#e9edf2')}};

/* UX-26 leading lines suggest exit */
DEMOS['UX-26']={d:5,hi:true,f:(c,t)=>{G(c);const u=prWrap(t);R(c,0,0,W,H,P.sky);R(c,0,100,W,35,P.grass);/* rails */for(let i=0;i<8;i++){R(c,20+i*25,70+i*3,22,2,P.stone);R(c,20+i*25,78+i*3,22,2,P.stone)}
 R(c,200,55,30,45,P.wood);txt(c,'EXIT',215,70,P.gold,5);R(c,110,95,30,20,P.stone); /* obstacle */
 const hx=prKeys([[0,30],[.4,100],[.55,100],[.75,190],[1,210]],u),hy=prKeys([[0,108],[.4,108],[.55,90],[.75,108],[1,108]],u);
 shadow(c,hx,108,5);spr(c,'hero',hx,hy,{sx:2,sy:2});prLine(c,30,110,100,110,P.cyan,1,[2,2]);prLine(c,140,110,200,110,P.cyan,1,[2,2]);
 prTag(c,'rails suggest',4,4,P.gold);prTag(c,'path goes around',4,H-14,P.cyan)}};

/* UX-27 sightline: glass blocks walking */
DEMOS['UX-27']={d:5,hi:true,f:(c,t)=>{G(c);const u=prWrap(t);R(c,0,0,W,H,P.sky);R(c,0,100,W,35,P.grass);R(c,110,40,8,60,'rgba(127,227,216,.35)');R(c,110,40,8,60,'rgba(200,230,240,.15)');
 for(let i=0;i<4;i++)R(c,110,40+i*15,8,1,'rgba(233,237,242,.5)');R(c,110,40,8,2,P.stone);R(c,110,98,8,2,P.stone);
 const foeX=170;shadow(c,foeX,108,5);spr(c,'foe',foeX,108,{sx:2,sy:2,flip:true});
 const hx=lerp(40,105,ease(seg(u,.1,.5)));shadow(c,hx,108,5);spr(c,'hero',hx,108,{sx:2,sy:2});
 if(u>.5){prLine(c,hx+6,95,foeX-6,95,P.gold,1,[2,2]);prTag(c,'SEE',120,50,P.gold);prTag(c,'BLOCKED',120,85,P.red)}
 prTag(c,'visible ≠ walkable',4,4,'#e9edf2')}};

/* UX-28 vista overlook + approach */
DEMOS['UX-28']={d:6,hi:true,f:(c,t)=>{G(c);const u=prWrap(t),phase=u<.45?0:1;
 if(phase===0){/* overlook */R(c,0,0,W,H,P.sky);R(c,0,70,W,65,P.grass);R(c,0,70,W,8,P.dirtD);R(c,100,90,20,12,P.stone);R(c,150,95,16,10,P.stone);spr(c,'foe',160,100,{sx:1.5,sy:1.5});R(c,200,85,24,20,P.wood);txt(c,'EXIT',212,92,P.gold,4);
  shadow(c,50,68,5);spr(c,'hero',50,68,{sx:2,sy:2});prTag(c,'VISTA preview',4,4,P.gold);prTag(c,'cover · threat · exit',4,H-14,'#e9edf2')}
 else{R(c,0,0,W,H,P.sky);R(c,0,100,W,35,P.grass);for(let i=0;i<6;i++)R(c,40+i*12,100-i*4,14,4,P.dirt);const hx=lerp(30,100,ease(seg(u,.45,.9)));shadow(c,hx,108,5);spr(c,'hero',hx,108,{sx:2,sy:2});
  prTag(c,'APPROACH ramp',4,4,P.cyan);prTag(c,'connects to entry',4,H-14,'#e9edf2')}}};

/* UX-29 breadcrumb trail of supplies */
DEMOS['UX-29']={d:6,hi:true,f:(c,t)=>{G(c);const u=prWrap(t);c.drawImage(scene('eforest'),0,0);const crumbs=[[50,100],[90,85],[130,95],[170,75],[200,90]];
 const hx=lerp(30,210,ease(seg(u,0,.85)));crumbs.forEach(([x,y],i)=>{const taken=hx>x+5;if(!taken){spr(c,'coin',x,y,{sx:1.2,sy:1.2});if(i<crumbs.length-1)prLine(c,x,y,crumbs[i+1][0],crumbs[i+1][1],'rgba(242,201,76,.35)',1,[2,2])}});
 shadow(c,hx,105,5);spr(c,'hero',hx,105,{sx:2,sy:2});
 const back=u>.85;if(back)prTag(c,'may turn back',W-4,4,P.red,'rgba(10,14,24,.75)',6,'right');
 prTag(c,'BREADCRUMBS',4,4,P.gold);prTag(c,'next clue',4,H-14,'#e9edf2')}};

/* UX-30 lighting + color + symbols */
DEMOS['UX-30']={d:5,hi:true,f:(c,t)=>{G(c);const u=prWrap(t);R(c,0,0,W,H,'#1a2440');R(c,0,100,W,35,P.stoneD);
 const doors=[[50,P.red,'!'],[120,P.cyan,'*'],[190,P.gold,'Q']];doors.forEach(([x,col,sym],i)=>{R(c,x-16,55,32,45,P.stone);const lit=.5+.5*Math.sin(u*TAU*2+i);R(c,x-12,60,24,35,col);c.globalAlpha=.3+lit*.4;circ(c,x,70,20,col);c.globalAlpha=1;txt(c,sym,x,78,'#fff',10);txt(c,['DANGER','SAFE','QUEST'][i],x,50,'#cfd8e3',4)});
 const hx=lerp(20,220,ease(prTri(u)));shadow(c,hx,108,5);spr(c,'hero',hx,108,{sx:2,sy:2,flip:u>.5});
 prTag(c,'light + color + symbol',4,4,P.gold);prTag(c,'bright != always exit',4,H-14,'#9aa6b8')}};

/* UX-31 critical path vs optional */
DEMOS['UX-31']={d:6,hi:true,f:(c,t)=>{G(c);const u=prWrap(t);R(c,0,0,W,H,P.sky);R(c,0,100,W,35,P.grass);R(c,0,100,W,6,P.dirt);
 R(c,200,60,30,40,P.stone);gateBlock(c,200,60,30,40,u<.7);R(c,70,70,16,10,P.gold);txt(c,'SW',78,75,P.ink,4); /* switch */
 R(c,40,40,20,16,P.wood);spr(c,'coin',50,48);txt(c,'SIDE',50,36,'#9aa6b8',4);
 const branch=u>.25&&u<.45,hx=branch?lerp(60,50,seg(u,.25,.35)):prKeys([[0,30],[.25,70],[.45,70],[.7,200],[1,210]],u);
 const hy=branch?lerp(108,55,Math.sin(seg(u,.25,.45)*Math.PI)):108;
 shadow(c,Math.min(hx,195),108,5);spr(c,'hero',hx,hy,{sx:2,sy:2});
 if(u>.65){prTag(c,'switch opens exit',W-4,50,P.cyan,'rgba(10,14,24,.75)',6,'right')}
 prTag(c,'MAIN path',120,120,P.cyan);prTag(c,'critical ≠ shortest',4,4,P.gold)}};

/* UX-32 hard gate: enemies must be zero */
DEMOS['UX-32']={d:6,hi:true,f:(c,t)=>{G(c);const u=prWrap(t),alive=u<.55?Math.max(0,3-Math.floor(u*5.5)):0;c.drawImage(scene('eday'),0,0);
 gateBlock(c,190,55,28,50,alive>0);for(let i=0;i<alive;i++){const fx=100+i*28+Math.sin(u*8+i)*3;shadow(c,fx,100,4);spr(c,'foe',fx,100,{sx:1.8,sy:1.8,flip:true})}
 shadow(c,50,105,5);spr(c,'hero',50,105,{sx:2,sy:2});R(c,4,4,70,14,'rgba(10,14,24,.85)');txt(c,'ENEMIES '+alive,38,11,alive?P.red:P.cyan,6);
 prTag(c,alive?'HARD GATE locked':'gate opens',4,H-14,alive?P.red:P.cyan)}};

/* UX-33 soft gate: usable under pressure */
DEMOS['UX-33']={d:5,hi:true,f:(c,t)=>{G(c);const u=prWrap(t);c.drawImage(scene('eday'),0,0);R(c,180,70,20,12,P.gold);txt(c,'SW',190,76,P.ink,5);
 const hx=lerp(40,175,ease(seg(u,.1,.7)));shadow(c,hx,100,5);spr(c,'hero',hx,100,{sx:2,sy:2,flash:u>.3&&Math.floor(u*20)%3===0?1:0});
 for(let i=0;i<2;i++){const fx=80+i*40+Math.sin(u*10+i)*8;shadow(c,fx,70,4);spr(c,'foe',fx,70,{sx:1.5,sy:1.5});prLine(c,fx,70,hx,95,'rgba(224,74,58,.3)',1)}
 if(u>.65)prTag(c,'switch usable',190,55,P.cyan);prTag(c,'SOFT GATE',4,4,P.gold);prTag(c,'pressure ≠ lock',4,H-14,'#e9edf2')}};

/* UX-34 lock-and-key / ability gate */
DEMOS['UX-34']={d:7,hi:true,f:(c,t)=>{G(c);const u=prWrap(t),phase=u<.3?0:u<.55?1:u<.75?2:3;R(c,0,0,W,H,P.sky);R(c,0,100,W,35,P.grass);
 R(c,130,55,20,45,P.stone);if(phase<3){R(c,130,55,20,45,'#5e636e');txt(c,'▓▓',140,75,'#3a3f48',8)}else burst(c,140,75,(u-.75)*4,8,3,{speed:40,life:.5,col:P.stone});
 const hx=phase===0?lerp(40,120,ease(u/.3)):phase===1?lerp(120,40,ease((u-.3)/.25)):phase===2?40:lerp(40,180,ease((u-.75)/.25));
 shadow(c,hx,108,5);spr(c,'hero',hx,108,{sx:2,sy:2,flip:phase===1});
 if(phase>=2){R(c,20,8,50,14,'rgba(10,14,24,.85)');txt(c,'WALL-BREAK',45,15,P.cyan,5)}
 prTag(c,['see barrier','find key ability','return','break'][phase],4,H-14,P.gold)}};

/* UX-35 one-way drop */
DEMOS['UX-35']={d:5,hi:true,f:(c,t)=>{G(c);const u=prWrap(t);R(c,0,0,W,H,P.sky);R(c,0,40,120,20,P.dirtD);R(c,0,40,120,4,P.grass);R(c,0,100,W,35,P.dirtD);R(c,0,100,W,4,P.grass);
 const fall=seg(u,.25,.45),hx=lerp(40,100,ease(seg(u,0,.25)))+(u>.45?seg(u,.45,.8)*60:0),hy=u<.25?48:u<.45?lerp(48,108,eo(fall)):108;
 shadow(c,hx,u<.45?48:108,5,u<.45&&u>.25?0:.35);spr(c,'hero',hx,hy,{sx:2,sy:2});
 if(u>.5){prLine(c,100,48,100,100,P.red,1,[2,2]);tri(c,100,55,Math.PI/2,5,P.red);prTag(c,'no climb back',W-4,40,P.red,'rgba(10,14,24,.75)',6,'right')}
 prTag(c,'ONE-WAY drop',4,4,P.gold);prTag(c,'local, not chapter',4,H-14,'#9aa6b8')}};

/* UX-36 unlockable shortcut */
DEMOS['UX-36']={d:7,hi:true,f:(c,t)=>{G(c);const u=prWrap(t),open=u>.55;R(c,0,0,W,H,P.sky);R(c,0,100,W,35,P.grass);R(c,0,100,140,6,P.dirt);R(c,160,100,80,6,P.dirt);
 R(c,140,70,20,36,P.stone);if(!open)R(c,145,78,10,20,P.woodD);else R(c,145,78,10,20,'rgba(90,154,74,.5)');
 /* long detour */R(c,40,50,160,4,P.dirt);R(c,196,50,4,50,P.dirt);
 const hx=u<.55?prKeys([[0,30],[.2,30],[.35,50],[.45,200],[.55,180]],u):lerp(180,50,ease(seg(u,.55,.9)));
 const hy=u<.2?108:u<.55?(u<.35?108:54):108;
 shadow(c,hx,hy>80?108:54,5);spr(c,'hero',hx,hy,{sx:2,sy:2,flip:u>.55});
 if(u>.5&&u<.6)prTag(c,'unlatch',150,60,P.cyan);prTag(c,open?'SHORTCUT open':'long detour first',4,4,open?P.cyan:P.gold)}};

/* UX-37 onboarding: teach → practice → apply */
DEMOS['UX-37']={d:7,hi:true,f:(c,t)=>{G(c);const u=prWrap(t),phase=u<.28?0:u<.55?1:2;R(c,0,0,W,H,P.sky);R(c,0,100,W,35,P.grass);R(c,100,100,40,20,'#1d1712');
 const jump=(a,b)=>{const k=seg(u,a,b);return k>0&&k<1?Math.sin(k*Math.PI)*28:0};
 let hx,hy=108;if(phase===0){hx=lerp(30,90,ease(seg(u,0,.2)));hy=108-jump(.18,.28);R(c,60,70,50,16,'rgba(10,14,24,.85)');txt(c,'[A] JUMP',85,78,P.gold,6)}
 else if(phase===1){hx=lerp(30,150,ease(seg(u,.28,.5)));hy=108-jump(.4,.5);prTag(c,'PRACTICE',4,20,P.cyan)}
 else{hx=lerp(30,210,ease(seg(u,.55,.9)));hy=108-jump(.65,.78);R(c,180,70,30,30,P.gold);txt(c,'GOAL',195,85,P.ink,5);prTag(c,'APPLY',4,20,P.gold)}
 shadow(c,hx,108,5,hy<100?0:.35);spr(c,'hero',hx,hy,{sx:2,sy:2});
 prTag(c,['TEACH','PRACTICE','APPLY'][phase],4,4,P.cyan)}};

/* UX-38 checkpoint / respawn ≠ autosave */
DEMOS['UX-38']={d:6,hi:true,f:(c,t)=>{G(c);const u=prWrap(t);c.drawImage(scene('eday'),0,0);R(c,70,60,3,40,P.woodD);R(c,73,60,20,12,P.red);R(c,73,72,14,2,P.red);
 const die=u>=.45&&u<.55,resp=u>=.55;let hx,hy,al=1;if(u<.4){hx=lerp(40,180,ease(u/.4));hy=100}else if(die){hx=180;hy=100;al=.3;c.globalAlpha=.45;R(c,0,0,W,H,P.red);c.globalAlpha=1}
 else{hx=70;hy=100;al=ease(seg(u,.55,.7))}
 shadow(c,hx,hy,5);spr(c,'hero',hx,hy,{sx:2,sy:2,alpha:al,flash:die?1:0});
 prTag(c,die?'FAIL':resp?'RESPAWN at flag':'checkpoint',4,4,die?P.red:resp?P.cyan:P.gold);
 prTag(c,'respawn != autosave',4,H-14,'#9aa6b8')}};
})();
