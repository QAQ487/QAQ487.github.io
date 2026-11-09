/* ===== Combat presentation demos (UI-27, FB-26..31, ACT-44, VFX-22, CAM-36, ANI-22) ===== */
(()=>{
const GY=100;
const cbTag=(c,s,x,y,col='#e9edf2',size=6,align='center')=>prTag(c,s,x,y,col,'rgba(10,14,24,.8)',size,align);
const cbLine=(c,x0,y0,x1,y1,col,w=2,cap='round')=>{c.save();c.strokeStyle=col;c.lineWidth=w;c.lineCap=cap;c.beginPath();c.moveTo(x0,y0);c.lineTo(x1,y1);c.stroke();c.restore()};
const cbBlade=(c,x0,y0,len,a,col='#e9edf2',w=2)=>cbLine(c,x0,y0,x0+Math.cos(a)*len,y0+Math.sin(a)*len,col,w);
const cbRing=(c,x,y,k,col,r0=3,r1=22,w=3)=>{if(k<0||k>=1)return;c.globalAlpha=1-k;ring(c,x,y,lerp(r0,r1,eo(k)),Math.max(1,w*(1-k)),col);c.globalAlpha=1};
const cbStar=(c,x,y,r,col,n=8,rot=0)=>{c.fillStyle=col;c.beginPath();for(let j=0;j<n*2;j++){const a=rot+j*Math.PI/n,rr=j%2?r*.35:r;c.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr)}c.closePath();c.fill()};
const cbShake=(u,amp,seed=3)=>(hash(Math.floor(u*400)+seed)-.5)*2*amp;
const cbArrow=(c,x0,y0,x1,y1,col,w=2,hd=4)=>{cbLine(c,x0,y0,x1,y1,col,w,'butt');const a=Math.atan2(y1-y0,x1-x0);c.fillStyle=col;c.beginPath();c.moveTo(x1+Math.cos(a)*hd,y1+Math.sin(a)*hd);c.lineTo(x1+Math.cos(a+2.4)*hd,y1+Math.sin(a+2.4)*hd);c.lineTo(x1+Math.cos(a-2.4)*hd,y1+Math.sin(a-2.4)*hd);c.closePath();c.fill()};
const cbFoeRot=(c,x,y,a,o={})=>{c.save();c.translate(Math.round(x),Math.round(y));c.rotate(a);spr(c,'foe',0,0,o);c.restore()};
const cbSide=c=>prSide(c,120,67,{props:false});

/* UI-27 threat direction ring: arcs on a ring under the player point at off-screen attackers */
DEMOS['UI-27']={d:5,f:(c,t)=>{const u=prWrap(t);bgArena(c);
 const fx=58,fy=16,fw=124,fh=78;
 const A={x:214,y:122,w0:.06,w1:.42,col:P.red,name:'MELEE'},B={x:20,y:44,w0:.52,w1:.86,col:P.purple,name:'RANGED'};
 const dodge=u>=.42&&u<.6?Math.sin(seg(u,.42,.6)*Math.PI)*12:0;const hx=120-dodge,hy=66;
 // enemies (outside the screen rectangle)
 for(const e of[A,B]){const k=seg(u,e.w0,e.w1),wind=u>=e.w0&&u<e.w1;shadow(c,e.x,e.y,7);spr(c,'foe',e.x,e.y,{sx:1.5,sy:1.5,flip:e.x>120?1:0,flash:wind&&k>.8?(Math.floor(u*60)%2):0});
  if(wind){if(e===A)cbBlade(c,e.x-4,e.y-12,10,-1.2-k*1.2,'#e9edf2',2);else{c.strokeStyle=P.woodD;c.lineWidth=1.5;c.beginPath();c.arc(e.x+6,e.y-9,7,-1.2,1.2);c.stroke();cbLine(c,e.x+6-k*5,e.y-9,e.x+12,e.y-15,'#cfd8e3',1);cbLine(c,e.x+6-k*5,e.y-9,e.x+12,e.y-3,'#cfd8e3',1)}}}
 if(u>=.8&&u<.86){const k=seg(u,.8,.86);const px=lerp(B.x+8,hx-8,k),py=lerp(B.y-9,hy-6,k);cbLine(c,px-6,py-1,px,py,'#e9edf2',1.5)}
 // dim everything outside the screen rectangle
 c.fillStyle='rgba(10,14,24,.5)';c.fillRect(0,0,W,fy);c.fillRect(0,fy+fh,W,H-fy-fh);c.fillRect(0,fy,fx,fh);c.fillRect(fx+fw,fy,W-fx-fw,fh);
 prDash(c,fx,fy,fw,fh,'#e9edf2');cbTag(c,'SCREEN',fx+2,fy+2,'#e9edf2',6,'left');txt(c,'OFF-SCREEN',4,H-6,'#cfd8e3',6,'left');
 // the ring
 const cx=hx,cy=hy-4,r=20;c.globalAlpha=.55;ring(c,cx,cy,r,1,'#e9edf2');c.globalAlpha=1;
 shadow(c,hx,hy,6);spr(c,'hero',hx,hy,{sx:1.5,sy:1.5});
 for(const e of[A,B]){const res=e.w1,fade=u>=res?1-seg(u,res,res+.05):1;if(u<e.w0||fade<=0)continue;const k=seg(u,e.w0,e.w1),a=Math.atan2(e.y-8-cy,e.x-cx);
  const pulse=.5+.5*Math.sin(k*k*40),lw=2.5+k*4;c.globalAlpha=fade;
  if(u<res){c.save();c.setLineDash([2,3]);c.globalAlpha=fade*.5;cbLine(c,cx+Math.cos(a)*(r+5),cy+Math.sin(a)*(r+5),e.x,e.y-8,e.col,1,'butt');c.restore();c.globalAlpha=fade}
  c.lineCap='round';c.strokeStyle=P.ink;c.lineWidth=lw+2;c.beginPath();c.arc(cx,cy,r,a-.42,a+.42);c.stroke();c.strokeStyle=e.col;c.lineWidth=lw;c.stroke();
  if(u<res&&pulse>.6){c.strokeStyle='#fff';c.lineWidth=1;c.stroke()}c.lineCap='butt';c.globalAlpha=1;
  if(u<res){const lx=cx+Math.cos(a)*(r+30),ly=cy+Math.sin(a)*(r+16);cbTag(c,e.name,lx,ly-5,e.col,6,'center')}}
 if(u>=.42&&u<.5)cbTag(c,'DODGE: ARC FADES',hx,fy+fh-12,'#7ee36b',6,'center');
 if(u>=.86&&u<.95){cbRing(c,hx-8,hy-8,seg(u,.86,.93),P.gold,2,14);cbTag(c,'PARRY: ARC FADES',hx,fy+fh-12,'#7ee36b',6,'center')}
 cbTag(c,'THREAT RING',W-4,3,P.gold,7,'right')}};

/* FB-26 perfect parry vs late (normal) block */
DEMOS['FB-26']={d:3.5,f:(c,t)=>{const u=prWrap(t),hit=.2;
 const lane=(perfect)=>gy=>{const hx=96;let fx=134;const piv=()=>[fx-5,gy-13];
  let fa;if(u<.14)fa=lerp(-1.5,-1.95,eo(seg(u,0,.14)));else if(u<hit)fa=lerp(-1.95,-2.75,ei(seg(u,.14,hit)));else fa=-2.75;
  let lean=0,hxo=0;
  if(perfect){if(u>=.36&&u<.9){const k=seg(u,.36,.46),rk=seg(u,.75,.9);fa=lerp(-2.75,-.7,eo(k));fa=lerp(fa,-1.5,ease(rk));lean=(.35*eo(k)-.35*ease(rk))+(u<.75?Math.sin(u*60)*.04:0);fx+=10*eo(k)-10*ease(rk)}else if(u>=.9)fa=-1.5}
  else{if(u>=hit){const k=seg(u,hit,.3),rk=seg(u,.5,.75);hxo=-8*eo(k)+8*ease(rk);fa=lerp(-2.75,-2.2,eo(seg(u,hit,.3)));fa=lerp(fa,-1.5,ease(seg(u,.4,.7)))}}
  const atkFrozen=perfect?(u>=hit&&u<.36):(u>=hit&&u<.23),defFrozen=perfect?(u>=hit&&u<.23):(u>=hit&&u<.23);
  const sx=atkFrozen?cbShake(u,1,perfect?5:9):0;
  shadow(c,hx+hxo,gy,6);prWalker(c,hx+hxo,gy,0,{s:1.7,still:1,flash:defFrozen?.6:0});
  const gx=hx+hxo+6,ga=-1.15;cbBlade(c,gx,gy-12,13,ga,'#e9edf2',2);
  shadow(c,fx,gy,6);cbFoeRot(c,fx+sx,gy,lean,{sx:1.7,sy:1.7,flip:1,flash:atkFrozen?.5:0});
  const [px,py]=piv();cbBlade(c,px+sx,py,20,fa,P.stone,3);
  const cpx=hx+hxo+12,cpy=gy-24;
  if(perfect){const k=seg(u,hit,hit+.12);if(u>=hit&&u<hit+.05)cbStar(c,cpx,cpy,10,'#fff6c8',8,u*3);cbRing(c,cpx,cpy,k,'#fff6c8',3,24,3);if(u>=hit)burst(c,cpx,cpy,(u-hit)*3.5,14,11,{speed:55,life:.5,col:(l,i)=>i%2?P.gold:'#fff'});
   if(u>=.36&&u<.75)cbTag(c,'OFF-BALANCE',fx-8,gy-38,P.gold,6,'center');
   // asymmetric hitstop bars
   const bx=176,by=gy-50;R(c,bx-3,by-3,64,30,'rgba(10,14,24,.8)');txt(c,'HITSTOP',bx,by+2,'#e9edf2',5,'left');txt(c,'DEF',bx,by+9,'#cfd8e3',5,'left');R(c,bx+16,by+7,6,4,u>=hit&&u<.23?'#fff':P.cyan);txt(c,'ATK',bx,by+16,'#cfd8e3',5,'left');R(c,bx+16,by+14,30,4,u>=hit&&u<.36?'#fff':P.red);
   const d=u>=hit&&u<.42?1-.8*Math.sin(seg(u,hit,.42)*Math.PI):1;txt(c,'SFX',bx,by+23,'#cfd8e3',5,'left');R(c,bx+16,by+21,30*d,4,'#9aa6b8');if(d<.9)txt(c,'duck',bx+48,by+23,'#9aa6b8',5,'left')}
  else{if(u>=hit)burst(c,cpx,cpy,(u-hit)*3,6,23,{speed:25,life:.4,col:(l,i)=>i%2?P.orange:P.stoneD});if(u>=hit&&u<.45)cbTag(c,'PUSHED BACK · NO RING',hx+14,gy-40,'#cfd8e3',6,'center')}};
 prLane(c,0,'LATE: NORMAL BLOCK',P.red,lane(0));
 prLane(c,1,'PERFECT PARRY',P.gold,lane(1))}};

/* ACT-44 weapon clash: blades meet before bodies; symmetric freeze then rebound, or a bind */
DEMOS['ACT-44']={d:4,f:(c,t)=>{const u=prWrap(t),hit=.2;
 const lane=(bind)=>gy=>{let hx=92,fx=148,ha,fa;
  if(u<.14){const k=eo(seg(u,0,.14));ha=lerp(-1.2,-2.1,k);fa=lerp(-1.94,-1.04,k)}else if(u<hit){const k=ei(seg(u,.14,hit));ha=lerp(-2.1,-.6,k);fa=lerp(-1.04,-2.54,k)}else{ha=-.6;fa=-2.54}
  let push=0,freeze=false;
  if(!bind){freeze=u>=hit&&u<.32;if(u>=.32){const k=eo(seg(u,.32,.42)),rk=ease(seg(u,.55,.8));hx-=12*k-12*rk;fx+=12*k-12*rk;ha=lerp(-.6,-2.0,k);fa=lerp(-2.54,-1.14,k);ha=lerp(ha,-1.2,rk);fa=lerp(fa,-1.94,rk)}}
  else{freeze=u>=hit&&u<.28;if(u>=.28&&u<.76){push=Math.sin((u-.28)*TAU*4)*3}else if(u>=.76){const k=eo(seg(u,.76,.86)),rk=ease(seg(u,.88,1));fx+=22*k-22*rk;fa=lerp(-2.54,-1.0,k);fa=lerp(fa,-1.94,rk);ha=lerp(-.6,-1.2,rk)}}
  hx+=push;fx+=push;const sx=freeze?cbShake(u,1,7):0;
  shadow(c,hx,gy,6);prWalker(c,hx+sx,gy,0,{s:1.7,still:1,flash:freeze?.45:0});cbBlade(c,hx+5+sx,gy-12,28,ha,'#e9edf2',2);
  shadow(c,fx,gy,6);spr(c,'foe',fx-sx,gy,{sx:1.7,sy:1.7,flip:1,flash:freeze?.45:0});cbBlade(c,fx-5-sx,gy-12,28,fa,P.stone,3);
  const cx=120+push,cy=gy-26;
  if(u>=hit&&u<hit+.05)cbStar(c,cx,cy,9,'#fff6c8',8,u*4);if(u>=hit)burst(c,cx,cy,(u-hit)*3.2,12,31,{speed:45,life:.45,col:(l,i)=>i%2?P.gold:'#fff'});
  if(bind&&u>=.28&&u<.76){const f=Math.floor(u*90);cbStar(c,cx,cy,4+3*hash(f),hash(f+1)>.5?'#fff6c8':P.gold,6,f);burst(c,cx,cy,(u*90-f)/3,5,f*7,{speed:30,life:.33,col:(l,i)=>i%2?P.gold:P.orange});cbTag(c,'BLADE LOCK',120,gy-50,P.gold,6,'center')}
  if(freeze)cbTag(c,'BOTH FREEZE',120,gy-50,'#e9edf2',6,'center');
  if(!bind&&u>=.32)cbTag(c,'REBOUND · NO DAMAGE',120,gy-50,P.cyan,6,'center');
  if(bind&&u>=.76&&u<.95)cbTag(c,'SHOVE',fx,gy-44,P.gold,6,'center')};
 prLane(c,0,'CLASH',P.cyan,lane(0));prLane(c,1,'CLASH → BIND',P.gold,lane(1))}};

/* FB-27 part break: tail cracks, snaps off as debris, stump shows inner layer, silhouette changes */
const fbMonster=(g,o)=>{const col=o.sil||P.foe,colD=o.sil||P.foeD;
 g.lineCap='round';g.strokeStyle=colD;g.lineWidth=9;g.beginPath();g.moveTo(130,84);g.lineTo(104,90);g.stroke();
 if(!o.broken){g.lineWidth=6;g.strokeStyle=o.flash?'#fff':colD;g.beginPath();g.moveTo(104,90);g.lineTo(80,94);g.lineTo(66,90);g.stroke()}
 g.lineCap='butt';
 R(g,136,88,6,12,colD);R(g,166,88,6,12,colD);
 g.fillStyle=col;g.beginPath();g.ellipse(152,78,30,15,0,0,TAU);g.fill();
 g.fillStyle=o.sil||P.stone;g.beginPath();g.moveTo(132,68);g.lineTo(144,58);g.lineTo(162,58);g.lineTo(172,68);g.closePath();g.fill();
 circ(g,186,72,11,col);if(!o.sil){R(g,188,68,3,3,P.ink);R(g,191,76,6,2,P.ink)}
 R(g,140,88,6,12,col);R(g,160,88,6,12,col)};
DEMOS['FB-27']={d:5,f:(c,t)=>{const u=prWrap(t),hits=[.06,.13,.2,.27],brk=.31;
 cbSide(c);const broken=u>=brk;
 let lastHit=-1;for(const h of hits)if(u>=h)lastHit=h;const flash=lastHit>0&&u-lastHit<.02&&!broken;const n=hits.filter(h=>u>=h).length;
 fbMonster(c,{broken,flash});
 if(!broken&&n>0){c.strokeStyle=P.ink;c.lineWidth=1;for(let i=0;i<n;i++){const x=84+i*5;c.beginPath();c.moveTo(x,90);c.lineTo(x+2,93);c.lineTo(x,96);c.stroke()}}
 if(broken){circ(c,104,90,4.5,P.red);circ(c,104,90,2.5,'#ffb3a8');cbTag(c,'INNER LAYER',104,62,'#ffb3a8',6,'center');cbLine(c,104,72,104,85,'#ffb3a8',1)}
 // hero attacking the tail
 const hx=46,swingA=lastHit>0&&u-lastHit<.05&&!broken;shadow(c,hx,GY,6);prWalker(c,hx,GY,0,{s:1.8,still:1});
 if(swingA){const k=(u-lastHit)/.05;c.strokeStyle='#fff';c.lineWidth=2;c.beginPath();c.arc(hx+6,GY-14,16,-1.4+k*1.2,-.4+k*1.2);c.stroke()}
 if(!broken&&n>0)cbTag(c,'CRACKS: '+n,82,70,P.gold,6,'center');
 // debris flight
 if(broken){const e=u-brk;burst(c,104,92,e*3,14,47,{speed:50,life:.45,col:(l,i)=>i%2?P.gold:'#fff'});
  const T1=.12;let x,y,a;if(e<T1){const k=e/T1;x=lerp(85,76,k);y=lerp(92,GY-3,k)-Math.sin(k*Math.PI)*40;a=k*5.6}else{const b=seg(e,T1,T1+.08);x=lerp(76,70,b);y=GY-3-Math.sin(b*Math.PI)*8;a=5.6+b*.68}
  c.save();c.translate(x,y);c.rotate(a);c.strokeStyle=P.foeD;c.lineCap='round';c.lineWidth=6;c.beginPath();c.moveTo(-12,0);c.lineTo(10,-2);c.stroke();circ(c,11,-2,3,P.red);c.lineCap='butt';c.restore();
  if(e<.06)cbTag(c,'SNAP!',104,48,'#fff',8,'center');
  if(u>.5){cbTag(c,'DEBRIS STAYS',70,74,'#e9edf2',6,'center');
   // silhouette before/after inset
   const ix=150,iy=4,iw=86,ih=34,ss=.28;R(c,ix,iy,iw,ih,P.ink);
   c.save();c.translate(ix+22-129*ss,iy+5-58*ss);c.scale(ss,ss);fbMonster(c,{sil:'#9aa6b8'});c.restore();
   c.save();c.translate(ix+64-129*ss,iy+5-58*ss);c.scale(ss,ss);fbMonster(c,{sil:P.gold,broken:1});c.restore();
   txt(c,'BEFORE',ix+22,iy+28,'#9aa6b8',5);txt(c,'AFTER',ix+64,iy+28,P.gold,5)}}
 cbTag(c,'PART BREAK',4,3,P.gold,7,'left')}};

/* FB-28 unblockable signifier drawn over occluders, with the answer category */
DEMOS['FB-28']={d:4,f:(c,t)=>{const u=prWrap(t);cbSide(c);
 const atk=[{w0:.08,f:.42,ans:'JUMP'},{w0:.55,f:.88,ans:'DODGE'}];
 const fx=170;shadow(c,fx,GY,7);
 let cur=null;for(const a of atk)if(u>=a.w0&&u<a.f)cur=a;
 spr(c,'foe',fx,GY,{sx:2,sy:2,flip:1,flash:cur&&u>cur.f-.06?(Math.floor(u*60)%2):0});
 cbBlade(c,fx+3,GY-12,22,cur?-1.25:-.85,P.stoneD,3);
 // pillar occludes most of the enemy
 R(c,150,26,22,74,P.stone);R(c,150,26,4,74,P.stoneD);R(c,147,22,28,6,P.stoneD);R(c,147,96,28,4,P.stoneD);
 // hero answers
 let hx=50,hy=0;const j=seg(u,.42,.56);if(u>=.42&&u<.56)hy=Math.sin(j*Math.PI)*24;const d=seg(u,.88,.98);if(u>=.88)hx=50-Math.sin(d*Math.PI)*20;
 shadow(c,hx,GY,6,hy>1?.15:.35);prWalker(c,hx,GY-hy,0,{s:1.8,still:1});cbBlade(c,hx+6,GY-hy-12,10,-1.2,'#e9edf2',2);
 // attacks
 if(u>=.42&&u<.56){const k=seg(u,.42,.56);const x=lerp(fx-12,10,k);cbLine(c,x,GY-3,x+20,GY-3,P.red,3);cbTag(c,'SWEEP',x+10,GY-18,P.red,6,'center')}
 if(u>=.88&&u<.98){const k=eo(seg(u,.88,.93));cbLine(c,fx-10,GY-14,lerp(fx-10,60,k),GY-14,P.red,3)}
 // the signifier, always on top
 if(cur){const k=seg(u,cur.w0,cur.w0+.04),s=k<1?eo(k)*1.35:lerp(1.35,1,seg(u,cur.w0+.04,cur.w0+.07));const sx=fx-4,sy=40;
  c.save();c.translate(sx,sy);c.scale(s,s);c.fillStyle=P.red;c.beginPath();c.moveTo(0,-11);c.lineTo(11,0);c.lineTo(0,11);c.lineTo(-11,0);c.closePath();c.fill();c.strokeStyle='#fff';c.lineWidth=1.5;c.stroke();R(c,-1.5,-6,3,8,'#fff');R(c,-1.5,4,3,3,'#fff');c.restore();
  if(k>=1){const bx=sx+16,by=sy-8;R(c,bx,by,40,16,'rgba(10,14,24,.85)');txt(c,cur.ans,bx+20,by+5,'#fff',6);
   if(cur.ans==='JUMP')cbArrow(c,bx+20,by+15,bx+20,by+10,P.gold,1.5,3);else cbArrow(c,bx+28,by+12,bx+12,by+12,P.gold,1.5,3);
   // crossed guard icon
   const gx=sx-26,gy2=sy-6;R(c,gx,gy2,10,12,P.blue);c.strokeStyle=P.red;c.lineWidth=2;c.beginPath();c.moveTo(gx-2,gy2-2);c.lineTo(gx+12,gy2+14);c.stroke();R(c,gx-14,gy2+16,38,8,'rgba(10,14,24,.8)');txt(c,'NO GUARD',gx+5,gy2+20,P.red,5);
   cbLine(c,sx,sy+13,sx,64,'#e9edf2',1);cbTag(c,'DRAWN OVER PILLAR',161,108,'#e9edf2',6,'center')}}
 cbTag(c,'UNBLOCKABLE SIGNIFIER',4,3,P.red,7,'left')}};

/* VFX-22 weapon infusion: coat spreads hilt->tip, flows, colours trail and hit; recedes tip->hilt */
DEMOS['VFX-22']={d:6,f:(c,t)=>{const u=prWrap(t);
 const EL=u<.5?{n:'FIRE',a:P.orange,b:P.gold,p:'#fff6c8'}:{n:'LIGHTNING',a:P.purple,b:P.cyan,p:'#fff'};const o=u<.5?0:.5,v=u-o;
 const reveal=eo(seg(v,.02,.1)),recede=ease(seg(v,.42,.48)),blink=v>=.36&&v<.42?(Math.floor(u*90)%2):1;
 const cov=reveal*(1-recede);// fraction from hilt that is coated
 R(c,0,0,W,68,'#1a2130');
 const x0=50,x1=206,y0=34;
 R(c,24,y0-2,22,6,P.wood);R(c,24,y0-1,22,1,P.woodD);R(c,46,y0-8,4,18,P.gold);
 c.fillStyle='#cfd8e3';c.beginPath();c.moveTo(x0,y0-4);c.lineTo(x1-10,y0-4);c.lineTo(x1,y0+1);c.lineTo(x1-10,y0+6);c.lineTo(x0,y0+6);c.closePath();c.fill();R(c,x0,y0,x1-x0-12,1,'#9aa6b8');
 if(cov>0){const cx=x0+(x1-x0)*cov;c.save();c.beginPath();c.moveTo(x0,y0-4);c.lineTo(x1-10,y0-4);c.lineTo(x1,y0+1);c.lineTo(x1-10,y0+6);c.lineTo(x0,y0+6);c.closePath();c.clip();c.beginPath();c.rect(x0,0,cx-x0,68);c.clip();
  c.globalAlpha=blink?1:.35;R(c,x0,y0-4,x1-x0,11,EL.a);for(let i=0;i<10;i++){const x=x0+((i*17+u*600)%(x1-x0));R(c,x,y0-4,5,11,EL.b)}R(c,x0,y0-4,x1-x0,1,EL.p);c.globalAlpha=1;c.restore();
  R(c,cx-1,y0-6,2,14,'#fff');
  for(let i=0;i<14;i++){const ph=(u*7+hash(i+3))%1,x=x0+hash(i+9)*(cx-x0);if(EL.n==='FIRE')R(c,x,y0-6-ph*16,1+(ph<.5?1:0),1+(ph<.5?1:0),ph<.5?EL.b:EL.a);else if(ph<.3){cbLine(c,x,y0-4,x+3,y0-9,EL.b,1,'butt');cbLine(c,x+3,y0-9,x+1,y0-13,EL.b,1,'butt')}}}
 if(v>=.02&&v<.12)cbArrow(c,x0+4,y0+16,x0+70,y0+16,EL.b,1.5,4),cbTag(c,'HILT → TIP',x0+40,y0+20,EL.b,6,'center');
 if(v>=.42&&v<.5)cbArrow(c,x1-20,y0+16,x1-86,y0+16,'#9aa6b8',1.5,4),cbTag(c,'EXPIRE: TIP → HILT',x1-50,y0+20,'#cfd8e3',6,'center');
 if(v>=.36&&v<.42)cbTag(c,'BLINK',x1-24,y0+16,'#e9edf2',6,'center');
 cbTag(c,'INFUSED: '+EL.n,4,3,EL.b,7,'left');
 // bottom: hero swings, trail and hit inherit the element
 R(c,0,68,W,67,P.sky);R(c,0,118,W,17,P.dirtD);R(c,0,118,W,3,P.grass);R(c,0,68,W,1,P.ink);
 const hx=96,gy=118;shadow(c,hx,gy,6);prWalker(c,hx,gy,0,{s:1.8,still:1});prDummy(c,140,gy,0,0);
 const sw=seg(v,.17,.3),on=v>=.17&&v<.33,coated=cov>.95;
 if(on){const trail=coated?EL.a:'#e9edf2';c.strokeStyle=trail;c.lineWidth=5;c.beginPath();c.arc(hx+6,gy-14,20,-1.9+sw*1.4,-.6+sw*1.4);c.stroke();if(coated){c.strokeStyle=EL.b;c.lineWidth=1;c.stroke()}
  if(sw>.5){burst(c,136,gy-16,(v-.23)*2.5,12,61+o*10,{speed:40,life:.45,col:(l,i)=>i%2?EL.a:EL.b});if(coated)cbStar(c,136,gy-16,6,EL.b,6,u*5)}}
 else cbBlade(c,hx+6,gy-12,12,-1.1,coated?EL.a:'#e9edf2',2);
 cbTag(c,'TRAIL + HIT = '+EL.n,W-4,74,EL.b,6,'right')}};

/* CAM-36 contextual finisher: geometry picks the pose; side close-up cut; hitstop; blend back */
DEMOS['CAM-36']={d:6,f:(c,t)=>{const u=prWrap(t);
 const align=ease(seg(u,.18,.3)),slam=.46,hs=u>=slam&&u<.52;
 let hx=lerp(108,148,align),fx=lerp(146,166,align);let lie=0;
 if(u>=.36&&u<slam){fx=lerp(166,170,seg(u,.36,slam))}if(u>=slam)fx=170;if(u>=.8){lie=ease(seg(u,.8,.9))}
 const world=g=>{cbSide(g);R(g,176,26,24,74,P.stone);for(let r=0;r<9;r++)for(let k=0;k<2;k++)R(g,176+(r%2?6:0)+k*12,26+r*8,1,8,P.stoneD);for(let r=1;r<9;r++)R(g,176,26+r*8,24,1,P.stoneD);
  R(g,26,86,24,14,P.wood);R(g,26,86,24,2,P.woodD);
  if(u>=slam){g.strokeStyle=P.ink;g.lineWidth=1;g.beginPath();g.moveTo(177,74);g.lineTo(183,70);g.lineTo(181,64);g.moveTo(183,70);g.lineTo(190,72);g.stroke()}
  shadow(g,hx,GY,6);prWalker(g,hx,GY,0,{s:1.8,still:1});
  if(lie>0)cbFoeRot(g,fx,GY,-lie*Math.PI/2,{sx:1.8,sy:1.8,flip:1});else{shadow(g,fx,GY,6);const sl=u>=.52?.22*ease(seg(u,.52,.6)):0;cbFoeRot(g,fx+(u<.18?Math.sin(u*50)*1.5:0),GY,sl,{sx:1.8,sy:1.8,flip:1,flash:hs?1:0});if(u>=.52&&u<.8)for(let i=0;i<3;i++){const a=u*14+i*TAU/3;R(g,fx+Math.cos(a)*7-1,GY-24+Math.sin(a)*2-1,2,2,P.gold)}}
  if(u>=.36&&u<.52)cbLine(g,hx+6,GY-12,fx-6,GY-14,P.skin,3);
  if(u>=slam&&u<slam+.12)burst(g,176,GY-16,(u-slam)*3,14,71,{speed:45,life:.4,col:(l,i)=>i%2?P.gold:'#fff'})};
 let z=1,cx=120,cy=67;if(u>=.3&&u<.62){z=2.2;cx=158;cy=80}else if(u>=.62&&u<.8){const k=ease(seg(u,.62,.8));z=lerp(2.2,1,k);cx=lerp(158,120,k);cy=lerp(80,67,k)}
 const sh=hs?cbShake(u,2,13):0;
 c.save();c.translate(W/2-cx*z+sh,H/2-cy*z);c.scale(z,z);world(c);c.restore();
 if(u>=.3&&u<.62){R(c,0,0,W,12,P.ink);R(c,0,H-12,W,12,P.ink)}
 if(u>=.18&&u<.32){const k=seg(u,.18,.3);c.globalAlpha=1-k*.6;ring(c,(hx+fx)/2,GY-10,10+k*36,1,P.cyan);c.globalAlpha=1;c.strokeStyle=P.gold;c.lineWidth=1;c.strokeRect(175.5,25.5,25,75)}
 // chooser
 if(u<.36){const bx=4,by=16;R(c,bx,by,78,32,P.ink);const rows=[['WALL','SLAM',1],['COVER','OVER',0],['OPEN','THROW',0]];rows.forEach(([a,b,on],i)=>{const sel=on&&u>=.18;txt(c,(sel?'> ':'  ')+a,bx+4,by+6+i*10,sel?P.gold:'#9aa6b8',6,'left');txt(c,b,bx+50,by+6+i*10,sel?P.gold:'#9aa6b8',6,'left')})}
 if(u<.18)cbTag(c,'[F] FINISH',146,52,P.gold,6,'center');
 {const zx=W-60,zy=H-(u>=.3&&u<.62?22:10);R(c,zx-2,zy-3,58,9,P.ink);txt(c,'ZOOM',zx,zy+1,'#cfd8e3',5,'left');bar(c,zx+20,zy-1,34,3,(z-1)/1.2,P.gold)}
 const lab=u<.18?'FOLLOW CAM':u<.3?'PROBE + ALIGN TO WALL':u<.62?(hs?'HITSTOP':'CUT: SIDE CLOSE-UP'):u<.8?'BLEND BACK':'FOLLOW CAM · CONTROL';
 cbTag(c,lab,W-4,u>=.3&&u<.62?14:3,u>=.3&&u<.62?P.gold:'#e9edf2',7,'right')}};

/* ANI-22 contextual vault / slide: hand plants on the edge, speed is kept */
DEMOS['ANI-22']={d:5,f:(c,t)=>{const u=prWrap(t);const X=v=>lerp(-12,252,v);
 const runner=(gy,v,kind)=>{const x=X(v);let y=0,rot=0,hand=null;
  if(kind==='vault'){const k=seg(x,42,80);if(x>=42&&x<80){y=Math.sin(k*Math.PI)*12;rot=-Math.sin(k*Math.PI)*.6;if(k>.2&&k<.65)hand=[60,gy-14]}}
  else{const k=seg(x,150,196);if(x>=150&&x<196){rot=-Math.min(1,Math.sin(k*Math.PI)*2.2)*1.2;y=0}}
  return{x,y,rot,hand}};
 const draw=(gy,kind)=>{
  if(kind==='vault'){R(c,52,gy-14,16,14,P.wood);R(c,52,gy-14,16,2,P.woodD);R(c,58,gy-12,1,12,P.woodD)}
  else{R(c,166,gy-14,2,14,P.stoneD);R(c,186,gy-14,2,14,P.stoneD);R(c,164,gy-16,26,4,P.stone)}
  for(let g=3;g>=0;g--){const v=u-g*.025;const r=runner(gy,v,kind);c.save();c.translate(r.x,gy-r.y);c.rotate(r.rot);if(!g)shadow(c,0,0,5,.3);prWalker(c,0,0,v*9,{s:1.6,alpha:g?.14+.04*(3-g):1,still:kind==='slide'&&Math.abs(r.rot)>.2});c.restore();
   if(!g&&r.hand){circ(c,r.hand[0],r.hand[1],2.5,P.skin);ring(c,r.hand[0],r.hand[1],5,1,P.gold);cbTag(c,'HAND PLANT',r.hand[0]+44,gy-40,P.gold,6,'center');cbLine(c,r.hand[0]+20,gy-34,r.hand[0]+5,gy-17,P.gold,1)}
   if(!g&&kind==='slide'&&Math.abs(r.rot)>.3){burst(c,r.x-6,gy-1,(u*40)%1*.4,6,Math.floor(u*40),{speed:20,life:.4,col:P.dirt});cbTag(c,'SLIDE UNDER',177,gy-36,P.gold,6,'center')}
   if(!g){const xr=r.x;const ahead=kind==='vault'?52:164;if(xr>ahead-34&&xr<ahead-6){cbLine(c,xr+6,gy-8,ahead,gy-8,P.cyan,1);cbTag(c,kind==='vault'?'DETECT: WAIST':'DETECT: GAP',(xr+ahead)/2,gy-30,P.cyan,6,'center')}}}
  txt(c,'SPEED',W-58,gy-48,'#e9edf2',5,'left');bar(c,W-36,gy-50,30,3,1,P.cyan)};
 prLane(c,0,'WAIST HEIGHT: VAULT',P.cyan,gy=>draw(gy,'vault'));
 prLane(c,1,'GAP BELOW: SLIDE',P.cyan,gy=>draw(gy,'slide'))}};

/* FB-29 delayed slash detonation: rifts hang in space, hush, burst on the sheathe click */
DEMOS['FB-29']={d:5,f:(c,t)=>{const u=prWrap(t),click=.5;
 const foes=[{x:118,a:-.7},{x:156,a:.6},{x:194,a:-.4}];const dash0=.06,dash1=.2;
 const hxOf=v=>v<dash0?28:v<dash1?lerp(28,220,eo(seg(v,dash0,dash1))):220;const hx=hxOf(u);
 const passT=fx=>{for(let i=0;i<=40;i++){const v=lerp(dash0,dash1,i/40);if(hxOf(v)>=fx)return v}return dash1};
 const hush=u>=dash1&&u<click?seg(u,dash1,dash1+.08):0,boom=u>=click&&u<click+.03;
 const sh=u>=click&&u<click+.08?cbShake(u,2.5,17):0;
 c.save();c.translate(sh,0);cbSide(c);
 for(const f of foes){const pt=passT(f.x);let y=0,a=0,fl=0;if(u>=pt&&u<pt+.02)fl=.7;
  if(u>=click+.03&&u<.9){const k=seg(u,click+.03,.85);y=Math.sin(Math.min(k,1)*Math.PI)*(30+hash(f.x)*14);a=k*4*(f.a>0?1:-1)}
  if(u>=click&&u<click+.03)fl=1;
  const al=u>=.9?1-seg(u,.9,.97):1;const al2=u>=.97?seg(u,.97,1):al;c.globalAlpha=Math.max(0,u>=.97?al2:al);shadow(c,f.x,GY,6);cbFoeRot(c,f.x,GY-y,a,{sx:1.7,sy:1.7,flip:1,flash:fl});c.globalAlpha=1}
 // rifts
 for(const f of foes){const pt=passT(f.x);if(u<pt||u>=click+.3)continue;const cx=f.x,cy=GY-12,L=15,dx=Math.cos(f.a)*L,dy=Math.sin(f.a)*L;
  if(u<click){const pts=[];for(let s=0;s<=8;s++){const k=s/8,j=(s%2?1:-1)*(s&&s<8?1.5:0);pts.push([cx-dx+2*dx*k-Math.sin(f.a)*j,cy-dy+2*dy*k+Math.cos(f.a)*j])}
   const pl=(col,w,ox,oy)=>{c.save();c.strokeStyle=col;c.lineWidth=w;c.lineJoin='round';c.beginPath();pts.forEach(([x,y],i)=>i?c.lineTo(x+ox,y+oy):c.moveTo(x+ox,y+oy));c.stroke();c.restore()};
   const w=Math.sin(u*120+f.x)*1.2;c.globalAlpha=.3;pl(P.cyan,7,0,0);c.globalAlpha=.6;pl(P.purple,3,w,-w);pl(P.ink,1,-w,w);c.globalAlpha=1;pl('#fff',1.5,0,0)}
  else{const e=u-click;for(let s=0;s<6;s++){const k=s/5,px=cx-dx+2*dx*k,py=cy-dy+2*dy*k;burst(c,px,py,e*1.4,4,f.x+s*11,{speed:30,life:.4,col:(l,i)=>i%2?'#fff':P.cyan,size:()=>2})}}}
 c.restore();
 if(hush>0){c.fillStyle='rgba(10,14,24,'+(.3*hush)+')';c.fillRect(0,0,W,H)}
 if(boom){c.fillStyle='rgba(255,255,255,.55)';c.fillRect(0,0,W,H)}
 // hero: dash then sheathe
 shadow(c,hx,GY,6);prWalker(c,hx,GY,0,{s:1.8,still:1,flip:u>=dash1?1:0});
 if(u>=dash0&&u<dash1){for(let g=1;g<4;g++){c.globalAlpha=.25;prWalker(c,hxOf(u-g*.012),GY,0,{s:1.8,still:1});c.globalAlpha=1}}
 if(u>=dash1&&u<click+.1){const k=seg(u,dash1+.05,click);const a=lerp(-2.3,-1.7,ease(k));cbBlade(c,hx-6,GY-12,lerp(12,2,ease(k)),Math.PI-a,'#e9edf2',2);R(c,hx-14,GY-8,10,2,P.woodD)}
 // audio duck meter
 const bx=6,by=20;txt(c,'AMBIENCE',bx,by,'#e9edf2',5,'left');bar(c,bx,by+5,40,3,u<dash1?1:u<click?1-.75*hush:u<click+.06?1:1,'#9aa6b8');
 const lab=u<dash1?'FAST SLASHES':u<click?'RIFTS HANG · HUSH · SHEATHE':u<click+.06?'CLICK → ALL BURST':'ALL HIT TOGETHER';
 cbTag(c,lab,W-4,3,u>=click&&u<.9?P.cyan:'#e9edf2',7,'right')}};

/* FB-30 weapon recall: tug free, curve back accelerating, hit enemies on the return path, heavy catch */
DEMOS['FB-30']={d:5,f:(c,t)=>{const u=prWrap(t);
 const P0=[28,62],C=[110,112],hand=[196,88];const bez=s=>[(1-s)*(1-s)*P0[0]+2*s*(1-s)*C[0]+s*s*hand[0],(1-s)*(1-s)*P0[1]+2*s*(1-s)*C[1]+s*s*hand[1]];
 const f0=.29,f1=.6;const sOf=v=>ei(seg(v,f0,f1));const s=sOf(u);
 const catchK=u>=f1&&u<f1+.08;const sh=catchK?cbShake(u,1.6,21):0;
 c.save();c.translate(sh,0);cbSide(c);R(c,0,30,24,70,P.stone);for(let r=0;r<9;r++)R(c,0,30+r*8,24,1,P.stoneD);
 const axe=(x,y,a)=>{c.save();c.translate(x,y);c.rotate(a);R(c,-1,-10,2,16,P.wood);c.fillStyle='#cfd8e3';c.beginPath();c.moveTo(1,-10);c.lineTo(8,-13);c.lineTo(9,-3);c.lineTo(1,-5);c.closePath();c.fill();R(c,1,-10,1,5,P.stoneD);c.restore()};
 // foes on the return path
 const foes=[{x:86,s:.35},{x:140,s:.66}];
 for(const f of foes){const hitAt=f0+(f1-f0)*Math.cbrt(f.s);const hit=u>=hitAt&&u<.9;const k=hit?eo(seg(u,hitAt,hitAt+.08)):0;const x=f.x+k*12;const back=u>=.9?seg(u,.9,1):1;
  c.globalAlpha=u>=.9?back:1;shadow(c,x,GY,6);cbFoeRot(c,x,GY,hit?k*.35:0,{sx:1.7,sy:1.7,flip:1,flash:hit&&u<hitAt+.03?1:0});c.globalAlpha=1;
  if(hit&&u<hitAt+.1){burst(c,f.x,GY-12,(u-hitAt)*3,10,f.x,{speed:40,life:.4,col:(l,i)=>i%2?P.gold:'#fff'});cbTag(c,'HIT',f.x,GY-40,P.gold,6,'center')}}
 // hero with catch recoil
 const rec=u>=f1?Math.exp(-(u-f1)*40)*6:0;const hx=204+rec;shadow(c,hx,GY,6);prWalker(c,hx,GY,0,{s:1.8,still:1,flip:1});
 // the return path
 if(u>=.1&&u<.84){c.globalAlpha=u<f0?.7:.45;for(let i=1;i<24;i++){const p=bez(i/24);R(c,p[0]-1,p[1]-1,2,2,'#e9edf2')}c.globalAlpha=1;if(u<f0)cbTag(c,'RETURN PATH',110,112,'#e9edf2',6,'center')}
 // the weapon
 if(u<f0){let x=P0[0],y=P0[1],a=-.9;if(u>=.1){const k=seg(u,.1,f0);x+=Math.sin(u*300)*1.5*(1-k)+k*4;y+=k*2}axe(x,y,a);if(u>=.1)cbTag(c,'TUG',40,40,P.gold,6,'center');else cbTag(c,'STUCK',40,40,'#e9edf2',6,'center')}
 else if(u<f1){for(let g=4;g>=1;g--){const p=bez(sOf(u-g*.012));c.globalAlpha=.12+.05*(4-g);axe(p[0],p[1],sOf(u-g*.012)*TAU*3);c.globalAlpha=1}const p=bez(s);axe(p[0],p[1],s*TAU*3);cbTag(c,'ACCELERATING',p[0],p[1]-26,P.cyan,6,'center')}
 else if(u<.88){axe(hand[0]+rec-4,hand[1]-2,-.4);if(u>=f1+.08)cbTag(c,'IN HAND · BOTH HIT',150,40,'#e9edf2',6,'center')}
 else{const k=seg(u,.88,.98);const x=lerp(hand[0],P0[0],k),y=lerp(hand[1]-6,P0[1],k);axe(x,y,k*TAU*2)}
 if(catchK){burst(c,hand[0],hand[1]-4,(u-f1)*3,10,91,{speed:35,life:.35,col:'#fff'});cbTag(c,'CATCH',hand[0],52,'#fff',8,'center')}
 c.restore();cbTag(c,'WEAPON RECALL',4,3,P.gold,7,'left')}};

/* FB-31 stasis: one target frozen while the world runs; hits store into a growing arrow; release launches */
DEMOS['FB-31']={d:6,f:(c,t)=>{const u=prWrap(t);cbSide(c);
 const on=.04,rel=.64,hits=[.12,.2,.28,.36,.44];const n=hits.filter(h=>u>=h).length;
 // world keeps running: walker and birds
 const wx=lerp(250,-20,u);prWalker(c,wx,GY-2,u*16,{s:1.3,name:'npc',alpha:.85});
 for(let i=0;i<3;i++){const bx=((u*240+i*80)%280)-20,by=18+i*8+Math.sin(u*TAU*4+i)*2;cbLine(c,bx,by,bx+3,by+2,P.ink,1,'butt');cbLine(c,bx+3,by+2,bx+6,by,P.ink,1,'butt')}
 cbTag(c,'WORLD RUNS',wx,GY-28,'#e9edf2',5,'center');
 const bx0=132,by0=GY-12,dir=[Math.cos(-.55),Math.sin(-.55)];
 let bx=bx0,by=by0,frozen=u>=on&&u<rel;
 if(u>=rel){const e=u-rel,sp=60+n*30;bx=bx0+dir[0]*sp*e*4;by=by0+dir[1]*sp*e*4+200*e*e;if(u<.92){c.globalAlpha=.6;for(let i=1;i<5;i++)cbLine(c,bx-dir[0]*(14+i*5)-dir[1]*(i*3-7),by-dir[1]*(14+i*5)+dir[0]*(i*3-7),bx-dir[0]*(30+i*7)-dir[1]*(i*3-7),by-dir[1]*(30+i*7)+dir[0]*(i*3-7),'#fff',1,'butt');c.globalAlpha=1;cbTag(c,'x'+n+' STORED → FAR',bx0+40,by0-60,P.red,6,'center')}}
 const vis=u<.92||u>=.97;const al=u>=.97?seg(u,.97,1):1;
 if(vis&&bx<W+20&&by>-20){c.globalAlpha=al;circ(c,bx,by+1,12,P.stoneD);circ(c,bx-1,by-1,11,P.stone);R(c,bx-5,by-5,3,2,'#b0b5bf');
  let last=-1;for(const h of hits)if(u>=h)last=h;if(frozen&&last>0&&u-last<.02)circ(c,bx,by,12,'#fff');
  if(frozen){const blink=u>=.56?(Math.floor(u*80)%2):1;c.globalAlpha=al*(blink?.4:.15);circ(c,bx,by,13,P.gold);c.globalAlpha=al;ring(c,bx,by,14,1,P.gold);
   const k=seg(u,on,rel);c.strokeStyle='#fff';c.lineWidth=2;c.beginPath();c.arc(bx,by,18,-Math.PI/2,-Math.PI/2+TAU*(1-k));c.stroke()}
  c.globalAlpha=1}
 if(u>=on&&u<on+.05)cbRing(c,bx0,by0,seg(u,on,on+.05),P.gold,6,26);
 // stored-impact arrow
 if(frozen&&n>0){const L=10+n*9,col=n<=1?P.gold:n<=3?P.orange:P.red;cbArrow(c,bx0+dir[0]*14,by0+dir[1]*14,bx0+dir[0]*(14+L),by0+dir[1]*(14+L),col,3,5);cbTag(c,'STORED x'+n,bx0+30,by0-62,col,6,'center')}
 // hero hitting from lower-left
 const hx=104;shadow(c,hx,GY,6);prWalker(c,hx,GY,0,{s:1.8,still:1});
 let last=-1;for(const h of hits)if(u>=h)last=h;if(u<rel&&last>0&&u-last<.04){const k=(u-last)/.04;c.strokeStyle='#fff';c.lineWidth=2;c.beginPath();c.arc(hx+6,GY-14,16,-1.4+k*1.2,-.4+k*1.2);c.stroke()}
 const lab=u<on?'TARGET':u<rel?(u>=.56?'ENDING…':'STASIS · HITS STORED'):u<.92?'RELEASE → LAUNCH':'';if(lab)cbTag(c,lab,W-4,3,u>=rel?P.red:P.gold,7,'right')}};
})();
