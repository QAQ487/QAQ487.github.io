/* ===== Action presentation demos 3 (ACT-48, NAV-17, FX-41) ===== */
(()=>{
const GY=100;
const sTag=(c,s,x,y,col='#e9edf2',size=6,align='center')=>prTag(c,s,x,y,col,'rgba(10,14,24,.8)',size,align);
const sLine=(c,x0,y0,x1,y1,col,w=2)=>{c.save();c.strokeStyle=col;c.lineWidth=w;c.lineCap='round';c.beginPath();c.moveTo(x0,y0);c.lineTo(x1,y1);c.stroke();c.restore()};
const sStar=(c,x,y,r,col,n=6,rot=0)=>{c.fillStyle=col;c.beginPath();for(let j=0;j<n*2;j++){const a=rot+j*Math.PI/n,rr=j%2?r*.38:r;c.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr)}c.closePath();c.fill()};
const sGlow=(c,name,x,y,o,col,a)=>{if(a<=0)return;for(const[dx,dy]of[[-2,0],[2,0],[0,-2],[0,2],[-1,-1],[1,1],[-1,1],[1,-1]])spr(c,name,x+dx,y+dy,Object.assign({},o,{sil:col,alpha:a}))};
const sDizzy=(c,x,y,u)=>{for(let i=0;i<3;i++){const a=u*TAU*3+i*TAU/3;sStar(c,x+Math.cos(a)*7,y+Math.sin(a)*2,2.5,P.gold,5,a)}};
const sStick=(c,x,y,dx,col,on)=>{R(c,x-13,y-13,26,26,'rgba(10,14,24,.8)');ring(c,x,y,9,1,'#5e636e');circ(c,x+dx*6,y,4,on?col:'#3a4356');if(on){sLine(c,x,y,x+dx*9,y,col,1)}};
const sBtn=(c,x,y,s,on,col)=>{circ(c,x,y,6,P.ink);circ(c,x,y,5,on?col:'#2b3446');txt(c,s,x,y+.5,on?P.ink:'#9aa6b8',5,'center')};

/* ACT-48 directional counter dodge: blue -> dodge toward = warp behind + whiff stagger; purple -> dodge away = push-off + ranged window */
DEMOS['ACT-48']={d:8,f:(c,t)=>{const u=prWrap(t);prSide(c,120,67,{props:false});R(c,0,0,W,H,'rgba(13,22,48,.55)');
 const BL='#6fb3e8',PU='#c79af0';
 const A=u<.5,k=A?u/.5:(u-.5)/.5; // phase-local 0..1
 const col=A?BL:PU;
 // ---- foe ----
 let fx=150,fr=0,fflash=0,wind=0,swing=-1;
 if(A){wind=seg(k,.06,.36);if(k>=.36&&k<.48)swing=seg(k,.36,.48);
  if(k>=.46&&k<.84){const q=seg(k,.46,.56);fx=150-6*eo(q);fr=-.25*eo(q)}else if(k>=.84){fx=lerp(144,150,seg(k,.84,.96));fr=lerp(-.25,0,seg(k,.84,.96))}
  if(k>=.62&&k<.66)fflash=1}
 else{wind=seg(k,.06,.36);if(k>=.4&&k<.46)fflash=1;
  if(k>=.4&&k<.86){fx=150+22*eo(seg(k,.4,.52));fr=.18*Math.sin(seg(k,.4,.6)*Math.PI)}else if(k>=.86)fx=lerp(172,150,ease(seg(k,.86,.98)))}
 const fo={sx:1.9,sy:1.9,flip:1,flash:fflash};
 c.save();c.translate(fx,GY);c.rotate(fr);c.translate(-fx,-GY);
 shadow(c,fx,GY,8);
 const ga=wind>0&&swing<0&&!(A&&k>=.46)&&!(!A&&k>=.4)?(.7+.3*Math.sin(u*120))*Math.min(1,.4+wind*2):0;
 if(ga>0){c.globalAlpha=ga*.3;circ(c,fx,GY-10,17+2*Math.sin(u*60),col);c.globalAlpha=ga*.45;circ(c,fx,GY-10,12,col);c.globalAlpha=1}
 sGlow(c,'foe',fx,GY,fo,col,ga);spr(c,'foe',fx,GY,fo);
 c.restore();
 // foe attack arc (aimed left, at where the hero stood)
 if(A&&swing>=0){c.save();c.strokeStyle='rgba(255,255,255,.85)';c.lineWidth=3;c.lineCap='round';c.beginPath();c.arc(fx-6,GY-12,18,Math.PI*.55+swing*1.2,Math.PI*1.15+swing*1.2);c.stroke();c.restore();sTag(c,'WHIFF',fx-26,GY-44,'#e9edf2',6,'center')}
 if(!A&&k>=.36&&k<.42){c.save();c.strokeStyle='rgba(255,255,255,.7)';c.lineWidth=2;c.beginPath();c.arc(fx-6,GY-12,16,Math.PI*.7,Math.PI*1.2);c.stroke();c.restore()}
 // weak point revealed after push-off
 if(!A&&k>=.54&&k<.9){const p=.5+.5*Math.sin(u*90);ring(c,fx,GY-9,4+p*2,1.5,P.gold);circ(c,fx,GY-9,1.5,'#fff6c8');sTag(c,'WEAK POINT',fx,GY-40,P.gold,6,'center')}
 // ---- hero ----
 let hx=80,hy=GY,flip=0,al=1,streak=null;
 if(A){if(k>=.3&&k<.38){const q=seg(k,.3,.38);streak=[80,lerp(80,184,eo(q))];al=.15}else if(k>=.38&&k<.86){hx=184;flip=1}else if(k>=.86){const q=seg(k,.86,.98);hx=lerp(184,80,ease(q));flip=q<.5?1:0;al=1-Math.sin(q*Math.PI)*.7}}
 else{if(k>=.34&&k<.4){hx=lerp(80,124,eo(seg(k,.34,.4)))}else if(k>=.4&&k<.54){const q=seg(k,.4,.54);hx=lerp(124,46,eo(q));hy=GY-22*Math.sin(q*Math.PI)}else if(k>=.54&&k<.88)hx=46;else if(k>=.88)hx=lerp(46,80,ease(seg(k,.88,.98)))}
 if(streak){for(let i=0;i<6;i++){const x=lerp(streak[0],streak[1],i/5);prWalker(c,x,GY,0,{s:1.8,still:1,alpha:.12+.1*i,flash:1})}sLine(c,streak[0],GY-9,streak[1],GY-9,col,2);sTag(c,'WARP BEHIND',132,GY-62,col,7,'center')}
 shadow(c,hx,GY,6);prWalker(c,hx,hy,0,{s:1.8,still:1,flip,alpha:al});
 // weapon (glows in counter colour while in range)
 const inRange=wind>0&&k<.34;const wcol=inRange?col:'#e9edf2';const dir=flip?-1:1;
 if(!(streak)){if(A&&k>=.56&&k<.66){const q=seg(k,.56,.66);c.save();c.strokeStyle='#fff';c.lineWidth=3;c.lineCap='round';c.beginPath();c.arc(hx-4,hy-12,14,-1.9+q*2.2,-1.1+q*2.2,false);c.stroke();c.restore()}
  else{sLine(c,hx+dir*6,hy-12,hx+dir*12,hy-20,wcol,inRange?3:2)}}
 if(A&&k>=.6&&k<.72){burst(c,fx+6,GY-12,(k-.6)*2,12,9,{speed:45,life:.35,col:(l,i)=>i%2?P.gold:'#fff'});sTag(c,'BACK ATTACK',fx+8,GY-54,P.gold,7,'center')}
 if(A&&k>=.46&&k<.84){sDizzy(c,fx-2,GY-26,u);if(k<.58)sTag(c,'BACK EXPOSED',fx,GY-44,'#e9edf2',6,'center')}
 if(!A&&k>=.4&&k<.5){sStar(c,124+8,GY-10,7,'#fff6c8',8,u*4);sTag(c,'PUSH-OFF',122,GY-52,PU,7,'center')}
 if(!A&&k>=.58&&k<.86){// ranged shots
  for(let j=0;j<3;j++){const s0=.6+j*.08,q=seg(k,s0,s0+.06);if(k>=s0&&k<s0+.06){const x=lerp(hx+10,fx-2,q);R(c,x-3,GY-10,6,2,PU)}if(k>=s0+.06&&k<s0+.09)sStar(c,fx,GY-9,5,'#fff6c8',6,j)}
  R(c,hx+5,hy-12,6,3,P.stoneD);sTag(c,'RANGED UP',hx,GY-46,PU,6,'center')}
 // ---- cue + input HUD ----
 if(wind>0&&k<.3){sTag(c,A?'BLUE: DODGE TOWARD':'PURPLE: DODGE AWAY',150,GY-70,col,7,'center');sTag(c,'WEAPON GLOWS = IN RANGE',80,GY-48,col,5,'center')}
 const pressed=A?(k>=.26&&k<.34):(k>=.28&&k<.36);
 sStick(c,20,20,A?1:-1,col,pressed);sBtn(c,42,20,'B',pressed,col);
 txt(c,A?'STICK TOWARD':'STICK AWAY',31,38,'#cfd8e3',5,'center');
 sTag(c,'DIRECTIONAL COUNTER DODGE',236,3,P.gold,7,'right')}};

/* NAV-17 scan pulse: one-shot wavefront reveals objects in distance order, through walls, then marks fade */
DEMOS['NAV-17']={d:6,f:(c,t)=>{const u=prWrap(t);
 prSide(c,120,67,{props:false,plats:[[-2000,100,5000],[168,62,90]]});
 const hx=60,hy=GY,ox=hx,oy=GY-8;
 // objects: [x,y,type,dist]
 const O=[[92,GY,'crate'],[18,GY,'coin'],[127,GY,'foeW'],[170,62,'ledge'],[214,62,'foe']].map(o=>{const d=Math.hypot(o[0]-ox,(o[1]-6)-oy);return o.concat([d])});
 // enemy hidden behind the wall
 spr(c,'foe',127,GY,{sx:1.5,sy:1.5,flip:1});
 // wall
 R(c,118,52,18,48,P.stone);R(c,118,52,18,3,P.stoneD);for(let y=58;y<100;y+=8){R(c,118,y,18,1,P.stoneD);R(c,(y/8)%2?126:122,y,1,8,P.stoneD)}
 // props
 R(c,86,GY-11,12,11,P.wood);c.strokeStyle=P.woodD;c.lineWidth=1;c.strokeRect(86.5,GY-10.5,11,10);
 spr(c,'coin',18,GY-1,{sx:1.4,sy:1.4});
 spr(c,'foe',214,62,{sx:1.6,sy:1.6,flip:1});
 shadow(c,hx,GY,6);prWalker(c,hx,hy,0,{s:1.8,still:1});
 // dim the world so the scan reads
 R(c,0,0,W,H,'rgba(12,20,44,.5)');
 // drone
 const dy=GY-30+Math.sin(u*TAU*2)*1.5;R(c,hx-14,dy-2,8,4,'#cfd8e3');R(c,hx-15,dy-4,10,1,'#9aa6b8');R(c,hx-11,dy-1,2,2,P.cyan);
 const t0=.1,t1=.58,maxR=200;
 const r=u>=t0&&u<t1?seg(u,t0,t1)*maxR:u>=t1?maxR:-1;
 // wave: glow inside + ring
 if(u>=t0&&u<t1+.06){const fa=u<t1?1:1-seg(u,t1,t1+.06);c.save();c.beginPath();c.arc(ox,oy,Math.max(0,r),0,TAU);c.clip();c.fillStyle='rgba(127,227,216,'+(.12*fa)+')';c.fillRect(0,0,W,H);c.restore();
  c.globalAlpha=fa;ring(c,ox,oy,r,3,'rgba(127,227,216,.45)');ring(c,ox,oy,r,1,'#e9fffb');c.globalAlpha=1}
 if(u>=t0-.04&&u<t0+.08){ring(c,hx-10,dy,4+seg(u,t0-.04,t0+.08)*8,1,P.cyan);sTag(c,'SCAN',hx-10,dy-18,P.cyan,7,'center')}
 // reveals
 const sorted=O.slice().sort((a,b)=>a[3]-b[3]);
 const hold=.8,fade=.94;
 sorted.forEach((o,i)=>{const[x,y,type,d]=o;const tr=t0+(t1-t0)*Math.min(1,d/maxR);if(u<tr)return;
  const a=u<hold?1:1-seg(u,hold,fade);if(a<=0)return;const pop=1-seg(u,tr,tr+.05);c.globalAlpha=a;
  if(type==='crate'){c.strokeStyle=P.gold;c.lineWidth=1+pop;c.strokeRect(85.5,GY-11.5,13,12);txt(c,'ITEM',92,GY-18,P.gold,5,'center')}
  else if(type==='coin'){ring(c,18,GY-5,6+pop*3,1,P.gold);txt(c,'ITEM',18,GY-16,P.gold,5,'center')}
  else if(type==='foeW'){spr(c,'foe',127,GY,{sx:1.5,sy:1.5,flip:1,sil:'#e04a3a',alpha:a*.85});txt(c,'BEHIND WALL',127,GY-26,'#ff8a7a',5,'center')}
  else if(type==='ledge'){R(c,168,61,22,2,P.gold);R(c,168,61,2,10,P.gold);txt(c,'CLIMB',178,54,P.gold,5,'center')}
  else if(type==='foe'){sGlow(c,'foe',214,62,{sx:1.6,sy:1.6,flip:1},'#e04a3a',.9);spr(c,'foe',214,62,{sx:1.6,sy:1.6,flip:1});txt(c,'ENEMY',214,40,'#ff8a7a',5,'center')}
  // order badge
  const bx=type==='ledge'?160:type==='foe'?198:x-9,by=type==='ledge'?54:type==='foe'?40:(type==='foeW'?GY-34:y-26);R(c,bx-4,by-4,8,8,'rgba(10,14,24,.85)');txt(c,String(i+1),bx,by+.5,'#e9edf2',5,'center');
  c.globalAlpha=1});
 if(u>=.2&&u<.6)sTag(c,'LIGHTS UP IN DISTANCE ORDER',120,4,'#e9edf2',6,'center');
 if(u>=.8&&u<.95)sTag(c,'MARKS FADE',120,4,'#cfd8e3',6,'center');
 // cooldown meter
 const cd=u<t0?1:u<t0+.02?0:Math.min(1,seg(u,t0,.98));R(c,4,H-12,62,9,'rgba(10,14,24,.8)');txt(c,'SCAN',8,H-7.5,'#cfd8e3',5,'left');bar(c,26,H-9,36,3,cd,cd>=1?P.cyan:'#5e636e');
 sTag(c,'SCAN PULSE',236,H-13,P.cyan,7,'right')}};

/* FX-41 diegetic-to-score: positional source -> full stereo score with ambience ducked -> back to the object */
DEMOS['FX-41']={d:9,f:(c,t)=>{const u=prWrap(t);
 // transition amount k (0 = in the room, 1 = score)
 const k=u<.3?0:u<.46?ease(seg(u,.3,.46)):u<.7?1:u<.84?1-ease(seg(u,.7,.84)):0;
 // hero path: walk in, sit, (camera turn test), stand, walk out
 const hx=u<.24?lerp(206,110,ease(seg(u,0,.24))):u<.86?110:lerp(110,206,ease(seg(u,.86,1)));
 const pan=u>=.52&&u<.68?Math.sin(seg(u,.52,.68)*TAU)*14:0; // camera turn
 const RY=88;
 c.save();c.translate(Math.round(pan),0);
 // room
 R(c,-20,0,W+40,RY,'#3b2a3a');for(let x=-20;x<W+20;x+=16)R(c,x,0,1,RY,'#46324a');R(c,-20,RY,W+40,H-RY,P.woodD);for(let x=-20;x<W+20;x+=12)R(c,x,RY,1,H-RY,P.wood);
 // full-screen score bars: screen space (undo the camera pan), behind the props
 if(k>0){const n=24,bw=W/n;for(let i=0;i<n;i++){const h=(.35+.65*Math.abs(Math.sin(u*TAU*9+hash(i+3)*6)))*40*k;c.globalAlpha=.6*k;R(c,i*bw+1-Math.round(pan),RY-h,bw-2,h,i%2?P.gold:'#f6dc8a');c.globalAlpha=1}}
 // window with wind
 R(c,168,16,36,28,'#1b2c4a');R(c,168,16,36,2,P.woodD);R(c,185,16,2,28,P.woodD);R(c,166,44,40,3,P.woodD);
 const sw=Math.sin(u*TAU*6)*2;tree(c,176,44,sw,'#2f7a4a','#1f5a38');tree(c,198,44,sw*.8,'#2f7a4a','#1f5a38');
 const amb=1-.75*k;for(let i=0;i<4;i++){const x=170+((u*400+i*13)%34);c.globalAlpha=.5*amb;R(c,x,20+i*6,5,1,'#cfd8e3');c.globalAlpha=1}
 // table + record player
 const sx=46,sy=RY-24;R(c,sx-16,sy+4,32,3,P.wood);R(c,sx-14,sy+7,2,RY-sy-7,P.woodD);R(c,sx+12,sy+7,2,RY-sy-7,P.woodD);
 R(c,sx-11,sy-4,22,8,P.wood);circ(c,sx-2,sy-4,7,P.ink);circ(c,sx-2,sy-4,2,P.red);R(c,sx-2+Math.round(Math.cos(u*TAU*8)*5),sy-4+Math.round(Math.sin(u*TAU*8)*2),1,1,'#9aa6b8');sLine(c,sx+8,sy-8,sx+2,sy-5,'#cfd8e3',1);
 // positional rings (fade as k rises)
 for(let i=0;i<4;i++){const q=((u*6+i/4)%1);c.globalAlpha=(1-q)*(1-k)*.9;ring(c,sx-2,sy-6,4+q*40,1,P.gold);c.globalAlpha=1}
 // room echo: faint copies off the right wall
 if(k<.9){for(let i=0;i<3;i++){const q=((u*6+i/3+.5)%1);c.globalAlpha=(1-q)*.35*(1-k);ring(c,sx+106,sy-6,2+q*20,1,'#e3c99a');c.globalAlpha=1}c.globalAlpha=1-k;txt(c,'ROOM ECHO',sx+106,sy+16,'#e3c99a',5,'center');c.globalAlpha=1}
 // hero (sitting while k>0)
 const sitting=u>=.26&&u<.86;const hy=RY;shadow(c,hx,hy,6);prWalker(c,hx,sitting?hy+3:hy,u*8,{s:1.8,still:sitting?1:0,flip:1});if(sitting)R(c,hx-8,hy-2,16,3,P.wood);
 c.restore();
 // ---- HUD ----
 R(c,0,RY+8,W,H-RY-8,'rgba(10,14,24,.85)');
 // music pan: source position relative to listener
 const rel=clamp((sx-(hx))/120,-1,1)*(1-k);
 txt(c,'MUSIC POS',6,RY+15,'#cfd8e3',5,'left');R(c,48,RY+14,60,1,'#5e636e');R(c,77,RY+11,1,7,'#5e636e');circ(c,78+rel*28+(k<.5?pan*.0:0),RY+14.5,2.5,k>.5?P.gold:P.cyan);txt(c,'L',44,RY+15,'#9aa6b8',5,'center');txt(c,'R',112,RY+15,'#9aa6b8',5,'center');
 const dist=Math.abs(hx-sx);const vol=lerp(clamp(1.15-dist/180,.25,1),1,k);
 txt(c,'MUSIC',6,RY+25,'#cfd8e3',5,'left');bar(c,48,RY+23,60,4,vol,k>.5?P.gold:P.cyan);
 txt(c,'ROOM ECHO',6,RY+35,'#cfd8e3',5,'left');bar(c,48,RY+33,60,4,.7*(1-k)+.08,'#e3c99a');
 txt(c,'AMBIENCE',124,RY+15,'#cfd8e3',5,'left');bar(c,168,RY+13,52,4,amb,'#9aa6b8');if(k>.3)txt(c,'LOW-PASS',196,RY+22,'#9aa6b8',5,'center');
 // song playhead: never restarts
 txt(c,'SONG',124,RY+35,'#cfd8e3',5,'left');bar(c,148,RY+33,72,4,u,'#7ee36b');
 // state labels
 const mode=k<.02?'IN THE ROOM':k>.98?'SCORE':'BLENDING';
 sTag(c,mode,4,3,k>.5?P.gold:P.cyan,7,'left');
 if(u>=.22&&u<.32)sTag(c,'SIT DOWN',hx,RY-48,'#e9edf2',6,'center');
 if(u>=.52&&u<.68)sTag(c,'TURN CAMERA: MUSIC STAYS',120,18,P.gold,6,'center');
 if(u>=.7&&u<.84)sTag(c,'STAND UP: BACK TO OBJECT',120,18,P.cyan,6,'center');
 sTag(c,'DIEGETIC → SCORE',236,3,P.gold,7,'right')}};
})();
