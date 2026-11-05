/* ===== Expansion demos (ACT/UX/NAV/ENV/UI/FX/REN/A11Y) ===== */
(()=>{
const pit=(c,gy,a,b)=>{R(c,a,gy,b-a,12,'#1d1712');R(c,a,gy,1,12,P.dirtD);R(c,b-1,gy,1,12,P.dirtD)};
const meter=(c,x,y,w,h,v,col)=>{R(c,x-1,y-1,w+2,h+2,P.ink);R(c,x,y,w,h,'#1d2533');R(c,x,y,Math.round(w*clamp(v)),h,col)};

/* ACT-39 variable jump height: tap vs hold */
DEMOS['ACT-39']={d:5,f:(c,t)=>{const u=prWrap(t);
 const arc=(hold,uu)=>{const launch=.18,apex=hold?.55:.38,land=hold?.88:.62;if(uu<launch)return{x:50,y:0,cut:0};
  const k=seg(uu,launch,land);let h=Math.sin(Math.min(k,1)*Math.PI)*(hold?40:18);if(!hold&&k>.35){const cut=seg(k,.35,.55);h*=1-cut*.55}
  const x=lerp(50,hold?190:130,eo(Math.min(k*1.05,1)));return{x,y:h,cut:!hold&&k>.35&&k<.7}};
 prLane(c,0,'TAP / JUMP CUT',P.gold,gy=>{const a=arc(0,u);shadow(c,a.x,gy,5,a.y>1?0:.35);prWalker(c,a.x,gy-a.y,0,{s:1.5,still:1});
  if(a.cut)prTag(c,'CUT',a.x,gy-a.y-18,P.gold);txt(c,'short',a.x,gy+8,'#cfd8e3',5)});
 prLane(c,1,'HOLD',P.cyan,gy=>{const a=arc(1,u);shadow(c,a.x,gy,5,a.y>1?0:.35);prWalker(c,a.x,gy-a.y,0,{s:1.5,still:1});
  if(u>.18&&u<.55)prTag(c,'HOLD',a.x,gy-a.y-18,P.cyan);txt(c,'full',a.x,gy+8,'#cfd8e3',5)});
 prTag(c,'same launch · release cuts vy',W-4,4,'#e9edf2','rgba(10,14,24,.75)',6,'right')}};

/* ACT-40 stamina climb/glide */
DEMOS['ACT-40']={d:6,f:(c,t)=>{const u=prWrap(t);
 R(c,0,0,W,H,P.sky);R(c,0,110,W,25,P.dirtD);R(c,0,110,W,3,P.grass);
 R(c,20,30,28,80,P.stone);R(c,20,30,4,80,P.stoneD);
 const climb=u<.45,glide=u>=.45&&u<.78,stam=climb?1-seg(u,0,.45)*0.95:glide?0.05+seg(u,.45,.78)*0.0:ease(seg(u,.78,.95));
 let x=34,y=100;if(climb){y=lerp(100,40,eo(seg(u,0,.45)));x=34}else if(glide){const k=seg(u,.45,.78);x=lerp(34,170,k);y=lerp(40,70,k*k)}else{x=170;y=lerp(70,100,ease(seg(u,.78,.95)))}
 if(climb&&stam<.02){y=lerp(40,100,eo(seg(u,.42,.55)));prTag(c,'DROP',x+16,y-10,P.red)}
 shadow(c,x,110,5,y<109?0:.3);prWalker(c,x,y,0,{s:1.6,still:1});
 if(glide){c.strokeStyle=P.cyan;c.beginPath();c.moveTo(x-6,y-8);c.lineTo(x+10,y-2);c.lineTo(x-6,y+2);c.stroke();prTag(c,'GLIDE',x,y-20,P.cyan)}
 meter(c,160,8,70,6,climb?1-seg(u,0,.45):glide?0.05:stam,stam<.25?P.red:P.cyan);txt(c,'STAMINA',160,20,'#e9edf2',5,'left');
 prTag(c,climb?'CLIMB':glide?'GLIDE':'RECOVER',4,4,P.gold)}};

/* ACT-41 stance / poise break */
DEMOS['ACT-41']={d:5,f:(c,t)=>{const u=prWrap(t),hit=.22,hit2=.38,brk=.52;
 prSide(c,120,67,{props:false});const gy=100;
 const poise=u<hit?0.15:u<hit2?0.45:u<brk?0.85:1;
 const broken=u>=brk&&u<.85;
 shadow(c,70,gy,7);prWalker(c,70,gy,0,{s:2,still:1});
 const foeX=broken?130+Math.sin((u-brk)*40)*2:118;
 shadow(c,foeX,gy,7);spr(c,'foe',foeX,gy,{sx:2,sy:2,flip:1,flash:u>hit&&u<hit+.05||u>hit2&&u<hit2+.05?1:0});
 meter(c,100,8,80,5,poise,broken?P.gold:P.purple);txt(c,'POISE',100,20,P.purple,5,'left');
 meter(c,100,24,80,4,0.7,'#e04a3a');txt(c,'HP',100,34,'#e04a3a',5,'left');
 if(u>=hit&&u<hit+.12)prTag(c,'HIT',90,gy-36,P.cyan);
 if(u>=hit2&&u<hit2+.12)prTag(c,'HEAVY',90,gy-36,P.gold);
 if(broken){prTag(c,'BREAK',foeX,gy-40,P.gold);prDash(c,foeX-12,gy-28,24,28,P.gold);txt(c,'punish window',foeX,gy+10,P.gold,5)}}};

/* ENV-18 fire/rain systemic */
DEMOS['ENV-18']={d:6,f:(c,t)=>{const u=prWrap(t);
 R(c,0,0,W,H,u>.55?P.night:P.sky);R(c,0,100,W,35,P.dirtD);R(c,0,100,W,4,P.grass);
 // grass cells
 for(let i=0;i<12;i++){const x=20+i*16,burn=u>.2&&u<.7&&i>=3&&i<=8&&!(u>.55&&i<=6),wet=u>.55,charred=u>.7&&i>=3&&i<=8||(u>.55&&i>=3&&i<=6);
  const col=burn?P.orange:charred?P.stoneD:wet?P.water:P.grass;R(c,x,92,12,8,col);if(burn){R(c,x+4,84-Math.sin(u*30+i)*4,4,10,P.orange);R(c,x+5,80,2,6,P.gold)}}
 if(u>.55){for(let i=0;i<18;i++){const x=(hash(i+3)*W+u*40)%W;R(c,x,10+(hash(i)*80),1,6,'rgba(127,227,216,.55)')}prTag(c,'RAIN',4,4,P.cyan)}
 else if(u>.2)prTag(c,'FIRE SPREAD',4,4,P.orange);
 else prTag(c,'DRY GRASS',4,4,P.grass);
 txt(c,'path of ash after burn',120,120,'#cfd8e3',5)}};

/* ACT-42 guard counter */
DEMOS['ACT-42']={d:5,f:(c,t)=>{const u=prWrap(t),block=.28,win=.42,counter=.5;
 prLane(c,0,'BLOCK ONLY',P.red,gy=>{shadow(c,70,gy,6);prWalker(c,70,gy,0,{s:1.8,still:1});shadow(c,130,gy,6);spr(c,'foe',130,gy,{sx:1.8,sy:1.8,flip:1});
  if(u>=block&&u<.55){R(c,78,gy-18,6,14,P.cyan);prTag(c,'GUARD',70,gy-36,P.cyan)}
  if(u>=.55)prTag(c,'no counter',70,gy-36,P.red)});
 prLane(c,1,'GUARD COUNTER',P.gold,gy=>{shadow(c,70,gy,6);const cx=u>=counter&&u<.75?lerp(70,110,eo(seg(u,counter,.62))):70;
  prWalker(c,cx,gy,0,{s:1.8,still:1});shadow(c,130,gy,6);spr(c,'foe',130-(u>=counter&&u<.7?8:0),gy,{sx:1.8,sy:1.8,flip:1,flash:u>counter&&u<counter+.08?1:0});
  if(u>=block&&u<win){R(c,78,gy-18,6,14,P.cyan);bar(c,60,gy-40,40,3,1-seg(u,block,win),P.gold);txt(c,'window',80,gy-46,P.gold,5)}
  if(u>=counter&&u<.7)prTag(c,'COUNTER',cx,gy-36,P.gold)})}};

/* ACT-43 perfect dodge window vs FB-10 note */
DEMOS['ACT-43']={d:5,f:(c,t)=>{const u=prWrap(t),ifr0=.36,ifr1=.48,atk=.4;
 prLane(c,0,'OUTSIDE WINDOW',P.red,gy=>{const dodge=u>=.22&&u<.55;const x=dodge?lerp(90,50,eo(seg(u,.22,.4))):90;
  shadow(c,x,gy,5);prWalker(c,x,gy,0,{s:1.6,still:1});R(c,140,gy-16,40,4,P.red);if(u>=atk&&u<.55)prTag(c,'HIT',x,gy-30,P.red);
  R(c,70,gy+6,80,3,'#1d2533');R(c,70+ifr0*80,gy+6,(ifr1-ifr0)*80,3,P.cyan);R(c,70+u*80,gy+4,2,7,'#fff')});
 prLane(c,1,'PERFECT WINDOW',P.cyan,gy=>{const dodge=u>=.3&&u<.7;const x=dodge?lerp(90,48,eo(seg(u,.3,.45))):90;
  shadow(c,x,gy,5);prWalker(c,x,gy,0,{s:1.6,still:1});R(c,140,gy-16,40,4,P.red);
  const perfect=u>=ifr0&&u<=ifr1;if(perfect){prTag(c,'PERFECT',x,gy-32,P.gold);ring(c,x,gy-10,14,1,P.gold)}
  R(c,70,gy+6,80,3,'#1d2533');R(c,70+ifr0*80,gy+6,(ifr1-ifr0)*80,3,P.gold);R(c,70+u*80,gy+4,2,7,'#fff');txt(c,'rule window → FB-10 presents',120,gy-48,'#cfd8e3',5)})}};

/* NAV-09 weak point */
DEMOS['NAV-09']={d:4,f:(c,t)=>{const u=prWrap(t);prSide(c,120,67,{props:false});const gy=100;
 shadow(c,120,gy,10);spr(c,'foe',120,gy,{sx:3,sy:3,flip:1});
 const pulse=.6+.4*Math.sin(u*TAU*2);c.globalAlpha=pulse;ring(c,128,gy-28,7,2,P.gold);c.globalAlpha=1;R(c,124,gy-32,8,8,P.gold);prTag(c,'WEAK',128,gy-44,P.gold);
 txt(c,'only hittable part outlined',120,12,'#e9edf2',6)}};

/* NAV-10 detection meter */
DEMOS['NAV-10']={d:5,f:(c,t)=>{const u=prWrap(t);R(c,0,0,W,H,P.night);R(c,0,105,W,30,P.dirtD);
 const seen=u>.2&&u<.7,det=seen?ease(seg(u,.2,.65)):u>=.7?1-ease(seg(u,.7,.9)):0;
 shadow(c,50,105,6);prWalker(c,50,105,0,{s:1.6,still:1});
 shadow(c,160,105,6);spr(c,'foe',160,105,{sx:1.8,sy:1.8,flip:1});
 // eye meter
 const ex=160,ey=70;R(c,ex-12,ey-6,24,12,P.ink);R(c,ex-11,ey-5,22,10,'#1d2533');R(c,ex-11,ey-5,Math.round(22*det),10,det>.85?P.red:P.gold);
 circ(c,ex,ey,3,det>.5?'#fff':P.gold);if(det>=1)prTag(c,'ALERT',ex,ey-16,P.red);else if(det>0)prTag(c,'DETECTING',ex,ey-16,P.gold);
 if(seen)prLine(c,150,95,60,95,'rgba(242,201,76,.4)',1,[2,2])}};

/* NAV-11 LKP silhouette */
DEMOS['NAV-11']={d:6,f:(c,t)=>{const u=prWrap(t);R(c,0,0,W,H,P.night);R(c,0,105,W,30,P.dirtD);tree(c,200,105);
 const hide=u>.35;const px=hide?40:110,py=105;
 if(u>.35){c.globalAlpha=.45;spr(c,'hero',110,105,{sx:1.6,sy:1.6});c.globalAlpha=1;prTag(c,'LKP',110,70,P.cyan);prDash(c,102,82,16,24,P.cyan)}
 shadow(c,px,py,5);prWalker(c,px,py,0,{s:1.6,still:1});
 const foeX=u<.35?170:lerp(170,110,ease(seg(u,.4,.7)));shadow(c,foeX,105,6);spr(c,'foe',foeX,105,{sx:1.7,sy:1.7,flip:1});
 if(u>.7)prTag(c,'SEARCH',foeX,70,P.gold)}};

/* NAV-12 noise investigation */
DEMOS['NAV-12']={d:5,f:(c,t)=>{const u=prWrap(t);R(c,0,0,W,H,P.night);R(c,0,105,W,30,P.dirtD);
 shadow(c,40,105,5);prWalker(c,40,105,0,{s:1.5,still:1});
 if(u>=.2&&u<.35){burst(c,90,95,u-.2,8,11,{speed:40,life:.4,col:P.gold,size:()=>2});prTag(c,'NOISE',90,78,P.gold);circ(c,90,100,3,P.gold)}
 const fx=u<.25?170:u<.7?lerp(170,90,ease(seg(u,.25,.55))):90;shadow(c,fx,105,6);spr(c,'foe',fx,105,{sx:1.7,sy:1.7,flip:1});
 if(u>=.55&&u<.85)prTag(c,'INVESTIGATE',fx,70,P.cyan)}};

/* NAV-13 visibility / light */
DEMOS['NAV-13']={d:5,hi:true,f:(c,t)=>{c.scale(2,2);const u=prWrap(t);
 R(c,0,0,W,H,P.night);R(c,0,105,W,30,P.dirtD);
 // lamp cone
 const lamp=140;R(c,lamp-2,40,4,20,P.wood);circ(c,lamp,38,4,P.gold);
 c.fillStyle='rgba(242,201,76,.18)';c.beginPath();c.moveTo(lamp,42);c.lineTo(lamp-36,105);c.lineTo(lamp+36,105);c.fill();
 const inLight=u>.35&&u<.7;const x=lerp(40,lamp,ease(seg(u,.15,.5)));
 shadow(c,x,105,5);prWalker(c,x,105,0,{s:1.5,still:1});
 const vis=inLight?0.85:x<80?0.2:0.45;meter(c,8,8,60,6,vis,vis>.6?P.gold:P.cyan);txt(c,'VISIBILITY',8,20,'#e9edf2',5,'left');
 prTag(c,inLight?'EXPOSED':'SHADOW',x,70,inLight?P.gold:P.cyan)}};

/* NAV-14 contextual ping */
DEMOS['NAV-14']={d:4,f:(c,t)=>{const u=prWrap(t);c.drawImage(scene('day'),0,0);
 spr(c,'foe',170,95,{sx:1.5,sy:1.5,flip:1});spr(c,'coin',70,90);
 const ping=u>.25;if(ping){const k=ease(seg(u,.25,.4));c.globalAlpha=.4+k*.6;ring(c,170,70,8+k*6,2,P.red);
  c.fillStyle=P.red;c.beginPath();c.moveTo(170,58);c.lineTo(164,68);c.lineTo(176,68);c.fill();c.globalAlpha=1;prTag(c,'ENEMY',170,48,P.red);
  if(u>.55){ring(c,70,70,8,2,P.gold);prTag(c,'LOOT',70,48,P.gold)}}
 prTag(c,'CONTEXT PING',4,4,P.cyan)}};

/* UX-39 low durability */
DEMOS['UX-39']={d:4,hi:true,f:(c,t)=>{c.scale(2,2);R(c,0,0,W,H,'#16202e');
 const u=prWrap(t),dur=1-ease(seg(u,.1,.85));const warn=dur<.2;const flash=warn&&Math.floor(u*8)%2;
 R(c,90,40,60,60,P.ink);R(c,92,42,56,56,flash?P.red:'#1d2533');R(c,100,50,40,40,P.wood);R(c,118,46,6,30,P.stone);
 if(dur<.35){prLine(c,105,55,130,80,P.red,1);prLine(c,112,70,135,55,P.red,1)}
 meter(c,90,110,60,6,dur,warn?P.red:P.cyan);txt(c,'DURABILITY',120,108,warn?P.red:'#cfd8e3',6);
 prTag(c,warn?'LOW — SWAP SOON':'OK',120,28,warn?P.red:P.cyan,'rgba(10,14,24,.75)',6,'center')}};

/* UX-40 revive prompt */
DEMOS['UX-40']={d:5,f:(c,t)=>{const u=prWrap(t);c.drawImage(scene('day'),0,0);
 spr(c,'hero',80,100,{sx:1.5,sy:1.5}); // helper
 // downed
 c.save();c.translate(150,108);c.rotate(.5);spr(c,'npc',0,0,{sx:1.5,sy:1.5});c.restore();
 const hold=ease(seg(u,.25,.75));meter(c,125,60,50,5,hold,P.cyan);ring(c,150,70,12,2,'#1d2533');
 c.strokeStyle=P.cyan;c.beginPath();c.arc(150,70,12,-Math.PI/2,-Math.PI/2+hold*TAU);c.stroke();
 prTag(c,'HOLD TO REVIVE',150,48,P.cyan);if(hold>=1)prTag(c,'UP!',150,30,P.gold)}};

/* UX-41 objective voting */
DEMOS['UX-41']={d:5,hi:true,f:(c,t)=>{c.scale(2,2);R(c,0,0,W,H,'#16202e');const u=prWrap(t);
 txt(c,'VOTE: NEXT OBJECTIVE',120,16,P.gold,7);
 const opts=[['ATTACK',2],['STEALTH',3],['RETREAT',1]];let votes=[0,0,0];
 if(u>.2)votes[0]=1;if(u>.35)votes[1]=2;if(u>.5)votes=[2,3,1];
 opts.forEach((o,i)=>{const x=30+i*70,y=40,sel=votes[i]===Math.max(...votes)&&u>.5;R(c,x,y,60,50,sel?P.gold:'#2a3344');R(c,x+2,y+2,56,46,'#141a24');txt(c,o[0],x+30,y+18,'#e9edf2',6);txt(c,votes[i]+' votes',x+30,y+34,P.cyan,6)});
 const left=Math.max(0,1-u);txt(c,'lock '+Math.ceil(left*15)+'s',120,110,'#9aa6b8',6)}};

/* UI-18 quick chat wheel */
DEMOS['UI-18']={d:4,hi:true,f:(c,t)=>{c.scale(2,2);c.drawImage(scene('day'),0,0);R(c,0,0,W,H,'rgba(13,22,48,.35)');
 const u=prWrap(t),open=ease(seg(u,.1,.25));const phrases=['ON ME','HELP','LOOT','THANKS','ENEMY','WAIT'];
 const cx=120,cy=70,R0=34*open,r0=12*open;const sel=Math.floor(seg(u,.3,.8)*6)%6;
 phrases.forEach((p,i)=>{const a=-Math.PI/2+i*TAU/6,x=cx+Math.cos(a)*(R0+r0)/2,y=cy+Math.sin(a)*(R0+r0)/2;
  const on=i===sel&&u>.3;R(c,x-16,y-6,32,12,on?P.gold:'#1d2533');txt(c,p,x,y,on?P.ink:'#e9edf2',5)});
 circ(c,cx,cy,r0,'#141a24');txt(c,'CHAT',cx,cy,'#cfd8e3',5);if(u>.85)prTag(c,'SENT: '+phrases[sel],cx,20,P.cyan)}};

/* FX-39 voice stealing */
DEMOS['FX-39']={d:5,hi:true,f:(c,t)=>{c.scale(2,2);R(c,0,0,W,H,'#16202e');const u=prWrap(t);
 txt(c,'VOICE SLOTS (max 4)',120,14,'#e9edf2',7);
 const voices=[];for(let i=0;i<6;i++){const start=.08+i*.12;if(u>=start)voices.push({i,start,pri:i===5?5:1+i%3,alive:true})}
 // steal when >4
 let live=voices.filter(v=>u<v.start+.55);while(live.length>4){live.sort((a,b)=>a.pri-b.pri||a.start-b.start);live.shift()}
 for(let i=0;i<6;i++){const x=20+i*36,y=50,v=voices.find(z=>z.i===i),on=live.some(z=>z.i===i);
  R(c,x,y,30,40,on?P.cyan:'#2a3344');txt(c,'V'+(i+1),x+15,y+14,'#fff',6);if(v)txt(c,'p'+v.pri,x+15,y+28,on?P.gold:P.red,5);if(v&&!on)prTag(c,'STEAL',x+15,y-8,P.red)}}};

/* REN-43 LOD crossfade */
DEMOS['REN-43']={d:5,f:(c,t)=>{const u=prWrap(t);R(c,0,0,W,H,P.sky);R(c,0,110,W,25,P.dirtD);R(c,0,110,W,3,P.grass);
 const dist=lerp(0,1,ease(seg(u,.1,.9))); // 0 near, 1 far
 const fade=clamp((dist-.45)/.2); // crossfade band
 // near LOD detailed
 c.globalAlpha=1-fade;tree(c,120,110);house(c,40,110);c.globalAlpha=1;
 // far LOD simplified blocks
 c.globalAlpha=fade;R(c,108,70,24,40,P.leaf);R(c,116,60,8,14,P.wood);R(c,40,85,36,25,P.wall);R(c,40,78,36,10,P.roof);c.globalAlpha=1;
 meter(c,160,8,70,5,dist,P.cyan);txt(c,'DISTANCE',160,20,'#e9edf2',5,'left');
 prTag(c,fade<=0?'LOD0':fade>=1?'LOD1':'CROSS-FADE',4,4,fade>0&&fade<1?P.gold:P.cyan)}};

/* A11Y-07 hold vs toggle */
DEMOS['A11Y-07']={d:5,hi:true,f:(c,t)=>{c.scale(2,2);R(c,0,0,W,H,'#16202e');const u=prWrap(t);
 txt(c,'HOLD MODE',60,18,P.cyan,7);const held=u>.15&&u<.55;R(c,20,32,80,36,held?P.cyan:'#2a3344');txt(c,held?'SPRINT ON':'released',60,50,held?P.ink:'#cfd8e3',7);
 R(c,20,78,80,8,'#1d2533');if(held)R(c,20,78,Math.round(80*seg(u,.15,.55)),8,P.cyan);txt(c,'finger down',60,98,'#9aa6b8',5);
 txt(c,'TOGGLE MODE',180,18,P.gold,7);const taps=[.18,.4,.62,.82];let latched=0;for(const tp of taps){if(u>=tp)latched^=1}
 R(c,140,32,80,36,latched?P.gold:'#2a3344');txt(c,latched?'SPRINT ON':'off',180,50,latched?P.ink:'#cfd8e3',7);
 R(c,198,78,22,14,latched?P.gold:'#5e636e');txt(c,latched?'ON':'OFF',209,85,latched?P.ink:'#cfd8e3',5);txt(c,'HUD state icon',180,108,'#9aa6b8',5);
 for(const tp of taps){if(Math.abs(u-tp)<.04)prTag(c,'TAP',180,20,P.gold)}}};
})();
