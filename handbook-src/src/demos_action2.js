/* ===== Action presentation demos 2 (ACT-45..47, FB-32/33, NAV-15/16, UI-28, ANI-23, CAM-37) ===== */
(()=>{
const GY=100;
const aTag=(c,s,x,y,col='#e9edf2',size=6,align='center')=>prTag(c,s,x,y,col,'rgba(10,14,24,.8)',size,align);
const aLine=(c,x0,y0,x1,y1,col,w=2,cap='round')=>{c.save();c.strokeStyle=col;c.lineWidth=w;c.lineCap=cap;c.beginPath();c.moveTo(x0,y0);c.lineTo(x1,y1);c.stroke();c.restore()};
const aArrow=(c,x0,y0,x1,y1,col,w=2,hd=4)=>{aLine(c,x0,y0,x1,y1,col,w,'butt');const a=Math.atan2(y1-y0,x1-x0);c.fillStyle=col;c.beginPath();c.moveTo(x1+Math.cos(a)*hd,y1+Math.sin(a)*hd);c.lineTo(x1+Math.cos(a+2.4)*hd,y1+Math.sin(a+2.4)*hd);c.lineTo(x1+Math.cos(a-2.4)*hd,y1+Math.sin(a-2.4)*hd);c.closePath();c.fill()};
const aStar=(c,x,y,r,col,n=8,rot=0)=>{c.fillStyle=col;c.beginPath();for(let j=0;j<n*2;j++){const a=rot+j*Math.PI/n,rr=j%2?r*.35:r;c.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr)}c.closePath();c.fill()};
const aShake=(u,amp,seed=3)=>(hash(Math.floor(u*400)+seed)-.5)*2*amp;
const aRing=(c,x,y,k,col,r0=3,r1=22,w=3)=>{if(k<0||k>=1)return;c.globalAlpha=1-k;ring(c,x,y,lerp(r0,r1,eo(k)),Math.max(1,w*(1-k)),col);c.globalAlpha=1};
const aRot=(c,x,y,a,fn)=>{c.save();c.translate(x,y);c.rotate(a);fn();c.restore()};
const aDots=(c,pts,col,step=1,s=2)=>{c.fillStyle=col;for(let i=0;i<pts.length;i+=step){const[x,y]=pts[i];c.fillRect(Math.round(x-s/2),Math.round(y-s/2),s,s)}};
const aSide=c=>prSide(c,120,67,{props:false});
const aSpikes=(c,x0,x1)=>{for(let x=x0;x<x1;x+=6){c.fillStyle=P.stoneD;c.beginPath();c.moveTo(x,GY);c.lineTo(x+3,GY-8);c.lineTo(x+6,GY);c.closePath();c.fill();c.fillStyle='#cfd8e3';c.fillRect(x+2,GY-7,1,4)}};
const aSlash=(c,x,y,r,a0,a1,col='#fff',w=2.5)=>{c.save();c.strokeStyle=col;c.lineWidth=w;c.lineCap='round';c.beginPath();c.arc(x,y,r,a0,a1);c.stroke();c.restore()};

/* ACT-45 pogo bounce: down-strike touches foe / spikes -> fixed bounce, spikes do not hurt */
DEMOS['ACT-45']={d:5,f:(c,t)=>{const u=prWrap(t);aSide(c);
 const S=[[.04,.22,30,GY,86,GY-28,40],[.25,.43,86,GY-28,128,GY-16,32],[.46,.62,128,GY-16,168,GY-16,32],[.65,.82,168,GY-16,212,GY,30]];
 const stops=[[.22,.25,'FOE'],[.43,.46,'SPIKES'],[.62,.65,'SPIKES']];
 const pos=v=>{if(v<S[0][0])return[30,GY,0,-1];for(let i=0;i<S.length;i++){const[a,b,x0,y0,x1,y1,h]=S[i];if(v>=a&&v<b){const s=(v-a)/(b-a);return[lerp(x0,x1,s),lerp(y0,y1,s)-h*4*s*(1-s),s,i]}if(i<S.length-1&&v>=b&&v<S[i+1][0])return[x1,y1,1,i]}return[212,GY,1,9]};
 aSpikes(c,112,142);aSpikes(c,152,184);
 let stopI=-1;stops.forEach((s,i)=>{if(u>=s[0]&&u<s[1])stopI=i});
 const foeHit=u>=.22;const fsq=u>=.22&&u<.3?1-.2*Math.sin(seg(u,.22,.3)*Math.PI):1;
 shadow(c,86,GY,7);spr(c,'foe',86,GY,{sx:1.8*(2-fsq),sy:1.8*fsq,flash:stopI===0?1:0});
 // dotted path so far
 const pts=[];for(let v=.04;v<=Math.min(u,.82);v+=.006){const p=pos(v);pts.push([p[0],p[1]-9])}c.globalAlpha=.55;aDots(c,pts,'#fff',2,2);c.globalAlpha=1;
 const [x,y,s,i]=pos(u);const al=u>=.92?1-seg(u,.92,.98):u<.03?seg(u,0,.03):1;
 const falling=(i<=2&&s>.55)||stopI>=0;
 c.globalAlpha=al;shadow(c,x,GY,5,.25);prWalker(c,x,y,0,{s:1.8,still:1});
 if(falling&&u<.82){aLine(c,x+2,y-6,x+2,y+9,'#e9edf2',2);aLine(c,x-1,y-5,x+5,y-5,P.gold,1.5);c.strokeStyle='rgba(255,255,255,.5)';c.lineWidth=1;c.beginPath();c.arc(x+2,y+2,9,.4,Math.PI-.4);c.stroke()}
 else if(u<.82&&u>=.04)aLine(c,x+6,y-12,x+12,y-18,'#e9edf2',2);
 c.globalAlpha=1;
 if(stopI>=0){const k=seg(u,stops[stopI][0],stops[stopI][1]);aStar(c,x+2,y+10,8,'#fff6c8',8,u*4);aRing(c,x+2,y+10,k,'#fff6c8',3,16,2)}
 stops.forEach((s,j)=>{if(u>=s[0]&&u<s[0]+.12){const p=pos(s[0]);burst(c,p[0]+2,p[1]+10,(u-s[0])*3,10,7+j*13,{speed:40,life:.4,col:(l,q)=>q%2?P.gold:'#fff'})}});
 if(stopI>=0)aTag(c,'BOUNCE',x+2,y-32,P.gold,7,'center');
 if(u>=.43&&u<.56)aTag(c,'SPIKES: NO DAMAGE',148,GY-48,'#7ee36b',6,'center');
 if(u>=.25&&u<.35)aTag(c,'AIR JUMP REFRESHED',86,GY-64,P.cyan,6,'center');
 if(u<.2)aTag(c,'DOWN + ATTACK IN AIR',60,GY-62,'#e9edf2',6,'center');
 if(u>=.82&&u<.92)aTag(c,'LANDED',212,GY-30,'#e9edf2',6,'center');
 aTag(c,'POGO BOUNCE',4,3,P.gold,7,'left')}};

/* FB-32 projectile reflect: early swing whiffs and gets hit; on-time swing sends it back faster in player colour */
DEMOS['FB-32']={d:4,f:(c,t)=>{const u=prWrap(t);
 const lane=on=>gy=>{const hx=46,fx=200,oy=gy-14;let hxo=0;
  // shooter
  const back=on?(u>=.58?Math.sin(seg(u,.58,.8)*Math.PI)*8:0):0;const fxx=fx+back;
  shadow(c,fxx,gy,6);spr(c,'foe',fxx,gy,{sx:1.7,sy:1.7,flip:1,flash:on&&u>=.58&&u<.62?1:0});R(c,fxx-14,gy-15,8,3,P.stoneD);
  if(u>=.08&&u<.11)aStar(c,fxx-16,gy-14,5,'#fff6c8',6,0);
  // orb state
  let ox=null,col=P.red,dir=-1,trail=10;
  if(on){if(u>=.08&&u<.4){ox=lerp(fx-16,hx+14,seg(u,.08,.4))}else if(u>=.4&&u<.43){ox=hx+14}else if(u>=.43&&u<.58){ox=lerp(hx+14,fxx-6,ei(seg(u,.43,.58)));col=P.cyan;dir=1;trail=26}}
  else{if(u>=.08&&u<.43){ox=lerp(fx-16,hx+4,seg(u,.08,.43))}}
  // hero
  const hit=!on&&u>=.43&&u<.6;if(hit)hxo=-6*Math.sin(seg(u,.43,.6)*Math.PI);
  shadow(c,hx+hxo,gy,6);prWalker(c,hx+hxo,gy,0,{s:1.7,still:1,flash:hit&&u<.47?1:0});
  const sw0=on?.37:.22,sw1=sw0+.06;
  if(u>=sw0&&u<sw1){const k=seg(u,sw0,sw1);aSlash(c,hx+hxo+6,gy-14,14,-1.6+k*1.6,-.6+k*1.6,'#fff',3)}else aLine(c,hx+hxo+6,gy-12,hx+hxo+13,gy-20,'#e9edf2',2);
  if(ox!==null){c.globalAlpha=.55;aLine(c,ox-dir*trail,oy,ox,oy,col,3);c.globalAlpha=1;circ(c,ox,oy,4,P.ink);circ(c,ox,oy,3,col);R(c,ox-1,oy-1,2,2,'#fff')}
  if(on&&u>=.4&&u<.43){aStar(c,hx+14,oy,9,'#fff6c8',8,u*5);}
  if(on&&u>=.4&&u<.55)burst(c,hx+14,oy,(u-.4)*3,10,17,{speed:40,life:.4,col:(l,i)=>i%2?P.gold:'#fff'});
  if(on&&u>=.43&&u<.58)aTag(c,'TEAM SWAP · x1.6 SPEED',ox,gy-40,P.cyan,6,'center');
  if(on&&u>=.58&&u<.72){burst(c,fxx-4,oy,(u-.58)*3,14,29,{speed:50,life:.45,col:(l,i)=>i%2?P.cyan:'#fff'});aRing(c,fxx-4,oy,seg(u,.58,.68),P.cyan,4,22,3);aTag(c,'SHOOTER HIT',fx-10,gy-44,P.cyan,6,'center')}
  if(!on&&u>=.22&&u<.34)aTag(c,'SWING: NOTHING THERE',hx+30,gy-42,'#cfd8e3',6,'center');
  if(!on&&u>=.43&&u<.62){burst(c,hx+4,oy,(u-.43)*3,10,41,{speed:35,life:.4,col:(l,i)=>i%2?P.red:'#fff'});aTag(c,'HIT',hx,gy-42,P.red,7,'center')}};
 prLane(c,0,'EARLY SWING: GETS HIT',P.red,lane(0));prLane(c,1,'ON TIME: REFLECTED',P.cyan,lane(1))}};

/* FB-33 telekinesis: aim, pull along arc, hover, throw; then catch an enemy grenade and throw it back */
DEMOS['FB-33']={d:7,f:(c,t)=>{const u=prWrap(t);aSide(c);
 const hx=44,hand=[hx+7,GY-14],Hd=[hx+22,GY-42],fx0=198;
 const qb=(a,b,k,cx,cy)=>[(1-k)*(1-k)*a[0]+2*k*(1-k)*cx+k*k*b[0],(1-k)*(1-k)*a[1]+2*k*(1-k)*cy+k*k*b[1]];
 const fk=u>=.4&&u<.6?Math.sin(seg(u,.4,.6)*Math.PI)*10:u>=.79&&u<.97?Math.sin(seg(u,.79,.97)*Math.PI)*14:0;const fx=fx0+fk;
 shadow(c,fx,GY,6);spr(c,'foe',fx,GY,{sx:1.8,sy:1.8,flip:1,flash:(u>=.4&&u<.44)||(u>=.79&&u<.83)?1:0});
 shadow(c,hx,GY,6);prWalker(c,hx,GY,0,{s:1.8,still:1});
 const crate=(x,y,a,col)=>aRot(c,x,y,a,()=>{R(c,-6,-6,12,12,col||P.wood);c.strokeStyle=P.woodD;c.lineWidth=1;c.strokeRect(-5.5,-5.5,11,11);c.beginPath();c.moveTo(-5,-5);c.lineTo(5,5);c.stroke()});
 const nade=(x,y,col)=>{circ(c,x,y,4,P.ink);circ(c,x,y,3,P.stoneD);R(c,x-1,y-6,2,2,P.stone);if(Math.floor(u*24)%2)R(c,x-1,y-1,2,2,col)};
 const tether=(o)=>{c.save();c.strokeStyle='rgba(154,90,209,.85)';c.lineWidth=1.5;c.beginPath();for(let i=0;i<=12;i++){const k=i/12,x=lerp(hand[0],o[0],k),y=lerp(hand[1],o[1],k)+Math.sin(k*9+u*80)*2*Math.sin(k*Math.PI);i?c.lineTo(x,y):c.moveTo(x,y)}c.stroke();c.restore();aLine(c,hx+4,GY-12,hand[0]+3,hand[1]-3,P.skin,2)};
 const halo=(o)=>{for(let i=0;i<8;i++){const a=u*20+i*TAU/8;R(c,o[0]+Math.cos(a)*11-1,o[1]+Math.sin(a)*5-1,2,2,i%2?P.purple:P.cyan)}};
 const reticle=(x,y,col)=>{c.strokeStyle=col;c.lineWidth=1;c.beginPath();c.arc(x,y,7,0,TAU);c.moveTo(x-11,y);c.lineTo(x-4,y);c.moveTo(x+4,y);c.lineTo(x+11,y);c.moveTo(x,y-11);c.lineTo(x,y-4);c.moveTo(x,y+4);c.lineTo(x,y+11);c.stroke()};
 const C0=[112,GY-6];let lab='';
 // crate
 if(u<.06){crate(C0[0],C0[1],0);c.strokeStyle=P.gold;c.lineWidth=1;c.strokeRect(C0[0]-8.5,C0[1]-8.5,17,17);reticle(C0[0],C0[1],'#fff');lab='AIM'}
 else if(u<.16){const k=eo(seg(u,.06,.16));const p=qb(C0,Hd,k,96,GY-64);crate(p[0],p[1],k*2);tether(p);burst(c,C0[0],C0[1]+4,(u-.06)*3,8,5,{speed:20,life:.3,col:P.dirt});lab='GRAB'}
 else if(u<.34){const p=[Hd[0]+Math.sin(u*40)*1.5,Hd[1]+Math.sin(u*25)*2];crate(p[0],p[1],2+Math.sin(u*30)*.2);tether(p);halo(p);const k=ease(seg(u,.16,.3));reticle(lerp(Hd[0]+30,fx-2,k),GY-14,'#fff');lab='HOLD · AIM'}
 else if(u<.4){const k=ei(seg(u,.34,.4));const x=lerp(Hd[0],fx-8,k),y=lerp(Hd[1],GY-14,k);c.globalAlpha=.5;for(let g=1;g<4;g++)aLine(c,x-g*9,y-(Hd[1]-(GY-14))*-.0+0,x-g*9-6,y,'#fff',1);c.globalAlpha=1;aLine(c,Hd[0],Hd[1],x,y,'rgba(233,237,242,.45)',2);crate(x,y,2+k*3);lab='THROW'}
 else if(u<.5){burst(c,fx-6,GY-14,(u-.4)*2.5,14,51,{speed:50,life:.4,grav:20,col:(l,i)=>i%2?P.wood:P.woodD,size:()=>3});lab='IMPACT'}
 // grenade catch and release
 const g0=[fx-8,GY-18];const mid=[120,GY-58];
 if(u>=.5&&u<.58){const k=seg(u,.5,.58);const p=qb(g0,mid,k,170,GY-74);nade(p[0],p[1],P.red);lab='ENEMY THROWS'}
 else if(u>=.58&&u<.64){const k=eo(seg(u,.58,.64));const p=[lerp(mid[0],Hd[0],k),lerp(mid[1],Hd[1],k)];nade(p[0],p[1],k>.5?P.cyan:P.red);tether(p);lab='CATCH IN FLIGHT'}
 else if(u>=.64&&u<.74){const p=[Hd[0]+Math.sin(u*40)*1.5,Hd[1]+Math.sin(u*25)*2];nade(p[0],p[1],P.cyan);tether(p);halo(p);reticle(fx-2,GY-14,'#fff');lab='HELD · TEAM SWAP'}
 else if(u>=.74&&u<.79){const k=ei(seg(u,.74,.79));const x=lerp(Hd[0],fx-8,k),y=lerp(Hd[1],GY-14,k);aLine(c,Hd[0],Hd[1],x,y,'rgba(127,227,216,.5)',2);nade(x,y,P.cyan);lab='THROW BACK'}
 else if(u>=.79&&u<.92){const e=u-.79;burst(c,fx-6,GY-14,e*2.5,18,77,{speed:60,life:.45,col:(l,i)=>i%3?P.orange:P.gold,size:()=>3});aRing(c,fx-6,GY-14,seg(e,0,.08),'#fff6c8',4,28,3);lab='THROW BACK'}
 if(lab)aTag(c,lab,W-4,3,u>=.5?P.cyan:P.gold,7,'right');
 aTag(c,'TELEKINESIS',4,3,P.purple,7,'left');
 // stage strip
 const st=['GRAB','HOLD','THROW'];const cur=u<.06?-1:u<.16?0:u<.34?1:u<.5?2:u<.58?-1:u<.64?0:u<.74?1:u<.92?2:-1;st.forEach((s,i)=>{const x=60+i*44,y=H-12;R(c,x,y,40,9,i===cur?P.purple:'rgba(10,14,24,.7)');txt(c,s,x+20,y+5,i===cur?'#fff':'#9aa6b8',6)})}};

/* NAV-15 blink arc: preview arc + marker, invalid turns red, wall hit snaps to ledge top, release teleports */
DEMOS['NAV-15']={d:6,f:(c,t)=>{const u=prWrap(t);aSide(c);
 const LX=150,LY=54;R(c,LX,LY,W-LX,GY-LY+40,P.stoneD);R(c,LX,LY,W-LX,4,P.grass);R(c,LX,LY+4,W-LX,1,P.grassD);for(let r=0;r<6;r++)R(c,LX,LY+10+r*8,W-LX,1,P.stone);
 const hx=40,hand=[hx+7,GY-15];
 let tgt=null,mode='';
 if(u>=.06&&u<.24){tgt=[lerp(72,124,ease(seg(u,.06,.22))),GY];mode='ok'}
 else if(u>=.24&&u<.38){const k=ease(seg(u,.24,.3));tgt=[lerp(124,128,k),lerp(GY,18,k)];mode='bad'}
 else if(u>=.38&&u<.56){const k=ease(seg(u,.38,.44));tgt=[LX,lerp(26,76,k)];mode=k>=1?'snap':'wall'}
 const tele=u>=.56;
 const arc=(a,b,col)=>{const cx=(a[0]+b[0])/2,cy=Math.min(a[1],b[1])-30;const pts=[];for(let i=0;i<=40;i++){const k=i/40;pts.push([(1-k)*(1-k)*a[0]+2*k*(1-k)*cx+k*k*b[0],(1-k)*(1-k)*a[1]+2*k*(1-k)*cy+k*k*b[1]])}aDots(c,pts,col,1,2)};
 const ghost=(x,y,col)=>{c.globalAlpha=.5;prWalker(c,x,y,0,{s:1.8,still:1});c.globalAlpha=1;ring(c,x,y,7,1.5,col)};
 // hero (at start or ledge)
 let hxp=hx,hyp=GY,al=1;if(tele){hxp=166;hyp=LY;al=u>=.92?1-seg(u,.92,.97):1}if(u>=.97){hxp=hx;hyp=GY;al=seg(u,.97,1)}
 if(!(u>=.56&&u<.585)){c.globalAlpha=al;shadow(c,hxp,hyp,5,.3);prWalker(c,hxp,hyp,0,{s:1.8,still:1,flash:u>=.585&&u<.61?1:0});c.globalAlpha=1}
 if(tgt&&!tele){aLine(c,hx+4,GY-12,hand[0],hand[1],P.skin,2);
  if(mode==='ok'){arc(hand,tgt,P.cyan);ghost(tgt[0],tgt[1],P.cyan);aTag(c,'VALID LANDING',tgt[0],GY-44,P.cyan,6,'center')}
  else if(mode==='bad'){arc(hand,tgt,P.red);aLine(c,tgt[0]-5,tgt[1]-5,tgt[0]+5,tgt[1]+5,P.red,2);aLine(c,tgt[0]+5,tgt[1]-5,tgt[0]-5,tgt[1]+5,P.red,2);aTag(c,'OUT OF RANGE: NO BLINK',tgt[0]+4,tgt[1]+10,P.red,6,'center')}
  else{arc(hand,tgt,P.cyan);circ(c,tgt[0],tgt[1],2.5,'#fff');if(mode==='snap'){c.save();c.setLineDash([2,2]);aLine(c,tgt[0]+2,tgt[1]-2,166,LY-4,'#fff',1);c.restore();ghost(166,LY,P.cyan);aArrow(c,180,LY+10,180,LY-8,P.gold,2,4);aTag(c,'LEDGE SNAP',182,LY-26,P.gold,7,'center');aTag(c,'AIMED AT WALL',tgt[0]-26,tgt[1]+8,'#e9edf2',6,'center')}}}
 if(u>=.56&&u<.72){const e=u-.56;burst(c,hx,GY-8,e*2.5,16,9,{speed:30,life:.4,col:(l,i)=>i%2?P.cyan:'#fff'});c.globalAlpha=Math.max(0,1-e*8);prWalker(c,hx,GY,0,{s:1.8,still:1,alpha:.4});c.globalAlpha=1;aRing(c,166,LY,seg(e,0,.1),P.cyan,3,22,3);aTag(c,'RELEASE: BLINK',120,20,P.cyan,7,'center')}
 if(u<.06)aTag(c,'HOLD BLINK',hx,GY-40,'#e9edf2',6,'center');
 aTag(c,'BLINK PREVIEW',4,3,P.cyan,7,'left')}};

/* ACT-46 slip: roll leaves range vs feet-planted slip that keeps you in counter range */
DEMOS['ACT-46']={d:6,f:(c,t)=>{const u=prWrap(t);
 const lane=slip=>gy=>{let hx=96,fx=134;const A=[{w:.06,s:.14,r:.22,kind:'lean'},{w:.52,s:.6,r:.68,kind:'duck'}];
  let lean=0,sy=1,roll=0,rx=0,cnt=-1;
  for(const a of A){if(slip){if(a.kind==='lean'){if(u>=a.s-.04&&u<a.r+.08){const k=u<a.r?eo(seg(u,a.s-.04,a.s+.02)):1-ease(seg(u,a.r,a.r+.08));lean=-.5*k}}else{if(u>=a.s-.04&&u<a.r+.08){const k=u<a.r?eo(seg(u,a.s-.04,a.s+.02)):1-ease(seg(u,a.r,a.r+.08));sy=1-.42*k}}
    if(u>=a.r+.08&&u<a.r+.16)cnt=a===A[0]?0:1}
   else{if(u>=a.s-.05&&u<a.s+.06){const k=seg(u,a.s-.05,a.s+.06);roll=k*TAU;rx=-26*ease(k)}else if(u>=a.s+.06&&u<a.r+.16){rx=-26}else if(u>=a.r+.16&&u<a.r+.26){rx=-26*(1-ease(seg(u,a.r+.16,a.r+.26)))}}}
  // foe punch
  let fist=0,over=0,flash=0;for(const a of A){if(u>=a.w&&u<a.s)fist=-.3*seg(u,a.w,a.s);else if(u>=a.s&&u<a.r)fist=seg(u,a.s,a.s+.03);if(u>=a.s+.03&&u<a.r+.1&&(slip||true))over=Math.sin(seg(u,a.s+.03,a.r+.1)*Math.PI)*4;if(slip&&u>=a.r+.1&&u<a.r+.13)flash=1}
  const fxx=fx-over;shadow(c,fxx,gy,6);spr(c,'foe',fxx,gy,{sx:1.7,sy:1.7,flip:1,flash});
  const fy=gy-15,fxEnd=fxx-6-Math.max(0,fist)*30+Math.min(0,fist)*-6;aLine(c,fxx-5,fy+1,fxEnd,fy,P.foeD,3);circ(c,fxEnd,fy,2.5,P.foe);
  // hero
  const X=hx+rx;shadow(c,X,gy,6);c.save();c.translate(X,gy);if(roll){c.translate(0,-8);c.rotate(-roll);c.translate(0,8)}c.rotate(lean);c.scale(1,sy);prWalker(c,0,0,0,{s:1.7,still:1});c.restore();
  // head hurtbox
  if(slip){const hxh=X+Math.sin(lean)*15+1,hyh=gy-15*sy*Math.cos(lean)+(sy<1?2:0);c.save();c.setLineDash([2,2]);c.strokeStyle=P.cyan;c.lineWidth=1;c.strokeRect(Math.round(hxh-5)+.5,Math.round(hyh-5)+.5,9,9);c.restore();
   R(c,X-5,gy+1,4,2,P.gold);R(c,X+1,gy+1,4,2,P.gold)}
  if(cnt>=0){const k=seg(u,A[cnt].r+.08,A[cnt].r+.16);aLine(c,X+4,gy-12,X+4+18*Math.sin(k*Math.PI),gy-14-(cnt?6*k:0),P.skin,3);if(k>.3&&k<.7)aStar(c,fxx-4,gy-16,6,'#fff6c8',8,u*5);aTag(c,'COUNTER',fxx-6,gy-46,'#7ee36b',7,'center')}
  for(const a of A){if(u>=a.s&&u<a.r+.06)aTag(c,slip?(a.kind==='lean'?'LEAN BACK · WHIFF':'DUCK · WHIFF'):'ROLL AWAY',slip?150:110,gy-46,slip?P.cyan:'#cfd8e3',6,'center')
   if(!slip&&u>=a.r+.06&&u<a.r+.16)aTag(c,'OUT OF COUNTER RANGE',110,gy-46,P.red,6,'center')}
  if(slip&&u>=.14&&u<.3)aTag(c,'FEET PLANTED',X,gy-34,P.gold,6,'center')};
 prLane(c,0,'ROLL: BODY LEAVES',P.red,lane(0));prLane(c,1,'SLIP: FEET STAY',P.cyan,lane(1))}};

/* UI-28 directional guard: three-wedge marker on the opponent; cyan = your guard, red = incoming; match blocks */
DEMOS['UI-28']={d:6,f:(c,t)=>{const u=prWrap(t);aSide(c);
 const DIR={L:Math.PI,T:-Math.PI/2,R:0};const atk=[{w:.06,h:.3,d:'T'},{w:.4,h:.62,d:'R'},{w:.7,h:.92,d:'L'}];
 const guard=u<.2?'L':u<.8?'T':'L';
 let cur=null;for(const a of atk)if(u>=a.w&&u<a.h+.08)cur=a;
 const hx=88,fx=152;const res=cur&&u>=cur.h;const block=res&&cur.d===guard;const hitme=res&&!block;
 const kb=hitme?-8*Math.sin(seg(u,cur.h,cur.h+.08)*Math.PI):block?-3*Math.sin(seg(u,cur.h,cur.h+.08)*Math.PI):0;
 shadow(c,fx,GY,6);spr(c,'foe',fx,GY,{sx:1.9,sy:1.9,flip:1});
 const fa=cur?(u<cur.h?lerp(-1.9,cur.d==='T'?-2.6:cur.d==='L'?-2.2:-1.2,ease(seg(u,cur.w,cur.w+.06))):-3.0):-1.9;aLine(c,fx-6,GY-13,fx-6+Math.cos(fa)*20,GY-13+Math.sin(fa)*20,P.stone,3);
 shadow(c,hx+kb,GY,6);prWalker(c,hx+kb,GY,0,{s:1.9,still:1,flash:hitme&&u<cur.h+.04?1:0});
 const ga=guard==='T'?-1.75:guard==='L'?-2.5:-.75;aLine(c,hx+kb+6,GY-13,hx+kb+6+Math.cos(ga)*16,GY-13+Math.sin(ga)*16,'#e9edf2',2.5);
 // marker around opponent's upper body
 const mx=fx,my=GY-46,r=20;
 for(const k of['L','T','R']){const a=DIR[k];let col='rgba(233,237,242,.35)',w=5;
  const inc=cur&&cur.d===k&&u<cur.h+.02;const fl=inc&&(Math.floor(u*(14+30*seg(u,cur.w,cur.h)))%2===0);
  if(k===guard){col=P.cyan;w=6}
  c.lineCap='butt';c.strokeStyle=P.ink;c.lineWidth=w+2;c.beginPath();c.arc(mx,my,r,a-.55,a+.55);c.stroke();c.strokeStyle=col;c.lineWidth=w;c.stroke();
  if(inc){c.strokeStyle=fl?'#fff':P.red;c.lineWidth=3;c.beginPath();c.arc(mx,my,r+6,a-.55,a+.55);c.stroke()}
  txt(c,k==='T'?'TOP':k,mx+Math.cos(a)*(r+14),my+Math.sin(a)*(r+12),'#e9edf2',6)}
 circ(c,mx,my,2,'#e9edf2');
 if(res&&u<cur.h+.08){const cx=hx+kb+16,cy=GY-22;if(block){aStar(c,cx,cy,8,'#fff6c8',8,u*4);burst(c,cx,cy,(u-cur.h)*3,10,13,{speed:40,life:.35,col:(l,i)=>i%2?P.gold:'#fff'});aTag(c,'MATCH: BLOCKED',hx,GY-62,P.cyan,7,'center')}else{burst(c,hx+kb,GY-14,(u-cur.h)*3,10,23,{speed:35,life:.35,col:(l,i)=>i%2?P.red:'#fff'});aTag(c,'WRONG SIDE: HIT',hx,GY-62,P.red,7,'center')}}
 if(u>=.18&&u<.24)aTag(c,'GUARD → TOP',hx,GY-62,P.cyan,6,'center');if(u>=.78&&u<.84)aTag(c,'GUARD → L',hx,GY-62,P.cyan,6,'center');
 // legend
 R(c,4,16,74,24,'rgba(10,14,24,.8)');R(c,8,20,8,4,P.cyan);txt(c,'YOUR GUARD',20,22,'#e9edf2',6,'left');R(c,8,31,8,4,P.red);txt(c,'INCOMING',20,33,'#e9edf2',6,'left');
 aTag(c,'DIRECTIONAL GUARD',4,3,P.gold,7,'left')}};

/* ANI-23 creature climbing: cling with hands + feet, sway outward on shake (feet off), re-plant, get flung */
DEMOS['ANI-23']={d:7,f:(c,t)=>{const u=prWrap(t);
 const rx=46,ry=30;const cxw=lerp(108,132,u<.62?u/.62:1),bob=Math.sin(u*TAU*6)*(u<.3||(u>=.55&&u<.65)?1.5:.4);
 const sh=(a,b,amp,n)=>u>=a&&u<b?Math.sin(seg(u,a,b)*TAU*n)*amp*Math.sin(seg(u,a,b)*Math.PI):0;
 const th=sh(.32,.54,.16,5)+sh(.64,.78,.28,4);
 const sway=Math.min(.75,Math.abs(th)*3.2+(u>=.32&&u<.54?.15*Math.sin(seg(u,.32,.54)*Math.PI):0)+(u>=.64&&u<.76?.35*seg(u,.64,.74):0));
 const thrown=u>=.76;const camS=(u>=.32&&u<.54)||(u>=.64&&u<.8)?aShake(u,1.6,5):0;
 const phi=lerp(162,222,ease(seg(u,.04,.3)))*Math.PI/180;
 c.save();c.translate(camS,0);aSide(c);
 const B=[cxw,GY-50+bob];
 const toW=(p)=>[B[0]+p[0]*Math.cos(th)-p[1]*Math.sin(th),B[1]+p[0]*Math.sin(th)+p[1]*Math.cos(th)];
 // creature
 c.save();c.translate(B[0],B[1]);c.rotate(th);
 for(const lx of[-30,-12,14,32]){const sw=Math.sin(u*TAU*6+lx)*3*(u<.62?1:.3);R(c,lx-4+sw,14,9,32,'#4a3d34');R(c,lx-5+sw,46,11,4,'#2e2620')}
 c.fillStyle='#5b4a3e';c.beginPath();c.ellipse(0,0,rx,ry,0,0,TAU);c.fill();c.fillStyle='#6d5a4a';c.beginPath();c.ellipse(-4,-6,rx-10,ry-10,0,0,TAU);c.fill();
 c.strokeStyle='#3a2f28';c.lineWidth=2;for(let i=0;i<12;i++){const a=Math.PI+.25+i*.22,x=Math.cos(a)*rx,y=Math.sin(a)*ry;c.beginPath();c.moveTo(x,y);c.lineTo(x*1.08,y*1.14-2);c.stroke()}
 circ(c,rx+4,-12,14,'#5b4a3e');R(c,rx+8,-16,4,4,'#fff6c8');R(c,rx+9,-15,2,2,P.ink);R(c,rx+12,-4,10,3,'#3a2f28');
 c.restore();
 // hero in creature-local space
 const S=[rx*Math.cos(phi),ry*Math.sin(phi)];const tg=[-rx*Math.sin(phi),ry*Math.cos(phi)];const tl=Math.hypot(tg[0],tg[1]);const tu=[tg[0]/tl,tg[1]/tl];
 const nn=[S[0]/(rx*rx),S[1]/(ry*ry)];const nl=Math.hypot(nn[0],nn[1]);const nu=[nn[0]/nl,nn[1]/nl];
 const Hl=[S[0]+tu[0]*19+nu[0]*2,S[1]+tu[1]*19+nu[1]*2];
 let feetOff=sway>.28;const d=[Math.cos(sway)*tu[0]-Math.sin(sway)*nu[0],Math.cos(sway)*tu[1]-Math.sin(sway)*nu[1]];
 const Fl=[Hl[0]-d[0]*19,Hl[1]-d[1]*19];const al=Math.atan2(d[0],-d[1]);
 let hw,fw,ang;
 if(!thrown){hw=toW(Hl);fw=toW(Fl);ang=al+th}
 else{const H0=(()=>{const tt=th;return[B[0]+Hl[0]*Math.cos(tt)-Hl[1]*Math.sin(tt),B[1]+Hl[0]*Math.sin(tt)+Hl[1]*Math.cos(tt)]})();
  const k=seg(u,.76,.86);const sx=lerp(H0[0],34,k),sy=lerp(H0[1],GY,k)-Math.sin(k*Math.PI)*34;fw=[sx,sy];ang=k<1?k*TAU*1.2:0;hw=null}
 let al2=1;if(u>=.94)al2=1-seg(u,.94,.98);if(u<.03)al2=seg(u,0,.03);
 c.globalAlpha=al2;
 if(thrown){const k=seg(u,.76,.86);if(k>=1)shadow(c,34,GY,6);aRot(c,fw[0],fw[1],ang,()=>prWalker(c,0,0,0,{s:2,still:1}));if(u>=.86&&u<.92)burst(c,34,GY,(u-.86)*3,8,61,{speed:22,life:.35,col:P.dirt})}
 else{aRot(c,fw[0],fw[1],ang,()=>prWalker(c,0,0,0,{s:2,still:1}));R(c,hw[0]-1.5,hw[1]-1.5,3,3,P.gold);if(!feetOff){const fp=toW([S[0]+nu[0]*1,S[1]+nu[1]*1]);R(c,fp[0]-2,fp[1]-2,4,4,P.gold)}}
 c.globalAlpha=1;c.restore();
 // grip meter
 const grip=u<.32?1:u<.54?1-.35*seg(u,.32,.54):u<.64?lerp(.65,.85,seg(u,.54,.64)):u<.76?.85-.85*seg(u,.64,.76):u<.95?0:1;
 R(c,4,16,64,12,'rgba(10,14,24,.8)');txt(c,'GRIP',8,22,'#e9edf2',6,'left');bar(c,30,19,34,4,grip,grip<.3?P.red:P.gold);
 const lab=u<.04?'GRAB ON':u<.32?'CLIMB: HANDS + FEET ON SURFACE':u<.54?'SHAKE: BODY SWINGS, FEET OFF':u<.64?'RE-PLANT':u<.76?'BIGGER SHAKE · GRIP FAILING':u<.92?'FLUNG OFF':'';
 if(lab)aTag(c,lab,W-4,3,u>=.32&&u<.92?P.gold:'#e9edf2',7,'right')}};

/* CAM-37 perspective shift: 3D follow -> camera swings to side view with input remap & depth lock -> back */
DEMOS['CAM-37']={d:8,f:(c,t)=>{const u=prWrap(t);
 const k=u<.25?0:u<.45?ease(seg(u,.25,.45)):u<.75?1:u<.95?1-ease(seg(u,.75,.95)):0;const a=k*Math.PI/2;
 const X=u<.25?lerp(0,14,u/.25):u<.45?lerp(14,22,seg(u,.25,.45)):u<.75?lerp(22,40,seg(u,.45,.75)):lerp(40,48,seg(u,.75,1));
 const jy=X>30.6&&X<33.4?Math.sin(seg(X,30.6,33.4)*Math.PI)*1.4:0;
 const D=lerp(5,15,k),h=lerp(2.2,.6,k),F=lerp(105,270,k);const f=[Math.cos(a),Math.sin(a)],r=[Math.sin(a),-Math.cos(a)];
 const cam=[X-f[0]*D,1+h,0-f[1]*D];
 const P3=(x,y,z)=>{const rx=x-cam[0],ry=y-cam[1],rz=z-cam[2];const zz=rx*f[0]+rz*f[1];if(zz<.4)return null;return{x:W/2+F*(rx*r[0]+rz*r[1])/zz,y:72-F*(ry+h)/zz,s:F/zz,z:zz}};
 R(c,0,0,W,H,P.sky);R(c,0,72,W,H-72,P.grass);
 const seg3=(x0,z0,x1,z1,col,w=1)=>{const n=16;let prev=null;c.strokeStyle=col;c.lineWidth=w;for(let i=0;i<=n;i++){const p=P3(lerp(x0,x1,i/n),0,lerp(z0,z1,i/n));if(p&&prev){c.beginPath();c.moveTo(prev.x,prev.y);c.lineTo(p.x,p.y);c.stroke()}prev=p}};
 for(let x=-10;x<=80;x+=2)seg3(x,-4,x,4,'rgba(61,114,54,.8)',1);
 for(const z of[-4,-2,2,4])seg3(-10,z,80,z,'rgba(61,114,54,.8)',1);
 // shift zone
 c.save();c.setLineDash([4,3]);seg3(15,-3,15,3,P.gold,2);seg3(15,-3,70,-3,P.gold,1);seg3(15,3,70,3,P.gold,1);c.restore();
 seg3(-10,0,80,0,k>.9?P.gold:P.dirt,k>.9?3:2);
 const objs=[];for(let x=-8;x<=80;x+=6)for(const z of[-4.5,4.5])objs.push(['pil',x,z]);objs.push(['box',32,0]);objs.push(['hero',X,0]);
 const L=objs.map(o=>[o,P3(o[1],0,o[2])]).filter(q=>q[1]).sort((p,q)=>q[1].z-p[1].z);
 for(const[o,p]of L){if(p.x<-30||p.x>W+30)continue;
  if(o[0]==='pil'){const top=P3(o[1],3,o[2]);if(!top)continue;const w=Math.max(1,p.s*.35);R(c,p.x-w/2,top.y,w,p.y-top.y,P.stone);R(c,p.x-w/2,top.y,w,Math.max(1,w*.3),P.stoneD)}
  else if(o[0]==='box'){const top=P3(o[1],1,o[2]);if(!top)continue;const w=Math.max(2,p.s*1);R(c,p.x-w/2,top.y,w,p.y-top.y,P.wood);c.strokeStyle=P.woodD;c.lineWidth=1;c.strokeRect(Math.round(p.x-w/2)+.5,Math.round(top.y)+.5,Math.round(w)-1,Math.round(p.y-top.y)-1)}
  else{const pj=P3(o[1],jy,o[2]);const s=Math.max(.6,1.8*p.s/17);shadow(c,p.x,p.y,Math.max(2,p.s*.4),.3);c.save();c.translate(pj.x,pj.y);if(k<.5){prWalker(c,0,0,u*30,{s,still:0,name:'hero'})}else prWalker(c,0,0,u*30,{s});c.restore()}}
 // HUD: stick + mapping
 const sx=22,sy=H-22;circ(c,sx,sy,11,'rgba(10,14,24,.8)');ring(c,sx,sy,11,1,'#9aa6b8');const trans=k>0&&k<1;
 const sd=k<.5?[0,-1]:[1,0];const held=trans;circ(c,sx+(held?0:sd[0])*6,sy+(held?-1:sd[1])*6,3.5,held?P.gold:P.cyan);
 txt(c,trans?'HELD DIR KEPT':k<.5?'STICK UP = FORWARD':'STICK RIGHT = RIGHT',38,sy,trans?P.gold:'#e9edf2',6,'left');
 if(k>.9)aTag(c,'DEPTH LOCKED TO RAIL',W/2,H-34,P.gold,6,'center');
 // inset: top view of camera yaw
 const ix=W-30,iy=H-28;R(c,ix-24,iy-20,48,40,'rgba(10,14,24,.8)');aLine(c,ix-20,iy,ix+20,iy,P.dirt,2);R(c,ix-2,iy-2,4,4,P.red);
 const cxp=ix-Math.cos(a)*14,cyp=iy-Math.sin(a)*14;aLine(c,cxp,cyp,cxp+Math.cos(a-.4)*8,cyp+Math.sin(a-.4)*8,'#e9edf2',1);aLine(c,cxp,cyp,cxp+Math.cos(a+.4)*8,cyp+Math.sin(a+.4)*8,'#e9edf2',1);R(c,cxp-1.5,cyp-1.5,3,3,P.cyan);txt(c,'CAM',ix,iy+15,'#9aa6b8',5);
 const lab=u<.25?'3D FOLLOW':u<.45?'ENTER ZONE: SWING TO SIDE':u<.75?'SIDE-SCROLL':u<.95?'EXIT: SWING BACK':'3D FOLLOW';
 aTag(c,lab,W-4,3,trans?P.gold:'#e9edf2',7,'right');aTag(c,'PERSPECTIVE SHIFT',4,3,P.cyan,7,'left');
 if(u>=.97||u<.02){c.fillStyle='rgba(10,14,24,'+(u>=.97?seg(u,.97,1):1-seg(u,0,.02))+')';c.fillRect(0,0,W,H)}}};

/* NAV-16 colour-coded projectiles: orange = shoot down, purple spiked = avoid, blue ring = dash through; grayscale check */
DEMOS['NAV-16']={d:7,f:(c,t)=>{const u=prWrap(t);const gray=u>=.84;
 const G=h=>{if(!gray)return h;const n=parseInt(h.slice(1),16),r=n>>16&255,g=n>>8&255,b=n&255,l=Math.round(.3*r+.59*g+.11*b);return'rgb('+l+','+l+','+l+')'};
 const OR=G('#f08a3a'),PU=G('#9a5ad1'),BL=G('#4a78c8'),WH='#ffffff';
 const AW=184;R(c,0,0,W,H,'#121826');c.fillStyle='#1b2333';for(let x=0;x<AW;x+=12)c.fillRect(x,0,1,H);for(let y=0;y<H;y+=12)c.fillRect(0,y,AW,1);
 const ex=92,ey=22;circ(c,ex,ey,11,'#2b2236');circ(c,ex,ey,7,G('#e04a3a'));ring(c,ex,ey,11,1,'#5e636e');
 const orb=(x,y)=>{circ(c,x,y,4,P.ink);circ(c,x,y,3,OR);R(c,x-1,y-1,2,2,WH)};
 const spike=(x,y,rot)=>{c.fillStyle=P.ink;c.beginPath();for(let j=0;j<8;j++){const a=rot+j*Math.PI/4,rr=j%2?2.5:6.5;c.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr)}c.closePath();c.fill();c.fillStyle=PU;c.beginPath();for(let j=0;j<8;j++){const a=rot+j*Math.PI/4,rr=j%2?1.8:5;c.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr)}c.closePath();c.fill()};
 const wave=(r)=>{c.strokeStyle=P.ink;c.lineWidth=5;c.beginPath();c.arc(ex,ey,r,0,TAU);c.stroke();c.strokeStyle=BL;c.lineWidth=3;c.stroke();c.strokeStyle=G('#6fb3e8');c.lineWidth=1;c.beginPath();c.arc(ex,ey,r-1,0,TAU);c.stroke()};
 const v=u<.84?u:.8; // hold a composed frame for the grayscale check
 // hero path
 const hxOf=q=>q<.3?92:q<.4?lerp(92,58,ease(seg(q,.3,.4))):q<.62?58:q<.66?lerp(58,92,ease(seg(q,.62,.66))):92;const hx=hxOf(v),hy=114;
 const dashing=v>=.62&&v<.66;
 // orange: aimed down the hero column, popped by shots
 for(let i=0;i<7;i++){const t0=.02+i*.045,ang=Math.PI/2+(i%3-1)*.35;const e=v-t0;if(e<0)continue;const sp=230;let x=ex+Math.cos(ang)*sp*e,y=ey+Math.sin(ang)*sp*e;const target=(i%3===1);const popY=78;
  if(target&&y>=popY){const pe=(y-popY)/sp;if(pe<.06)burst(c,x,popY,pe*3,8,i*9,{speed:30,life:.3,col:(l,q)=>q%2?OR:WH});continue}
  if(y<H+6&&x>-6&&x<AW+6)orb(x,y)}
 // hero shots
 if(v<.32||v>=.66){for(let i=0;i<6;i++){const y=hy-14-((v*600+i*14)%60);if(y>78||v>=.66)R(c,hx-1,y,2,5,WH)}}
 // purple spiked columns
 const cols=[30,48,74,96,118,140,160];for(let i=0;i<cols.length;i++){const t0=.3+(i%2)*.04;const e=v-t0;if(e<0)continue;const y=ey+10+150*e;if(y<H+8)spike(cols[i],y,u*6+i)}
 // blue ring
 if(v>=.5&&v<.78){const r=12+(v-.5)*420;if(r<200)wave(r)}
 // hero
 if(dashing){for(let g=1;g<4;g++){c.globalAlpha=.25;spr(c,'hero',hxOf(v-g*.008),hy,{sx:1.5,sy:1.5});c.globalAlpha=1}}
 spr(c,'hero',hx,hy,{sx:1.5,sy:1.5,flash:dashing?.8:0});
 // labels in arena
 const lab=v<.3?'ORANGE: SHOOT IT DOWN':v<.5?'PURPLE SPIKED: AVOID':v<.78?'BLUE RING: DASH THROUGH':'';if(lab&&!gray)aTag(c,lab,AW/2,H-10,'#e9edf2',6,'center');
 if(gray)aTag(c,'GRAYSCALE: SHAPES STILL READ',AW/2,H-10,'#e9edf2',6,'center');
 // legend panel
 R(c,AW,0,W-AW,H,'#0b0f17');R(c,AW,0,1,H,'#2b3446');txt(c,'RULES',AW+28,10,'#9aa6b8',6);
 orb(AW+10,30);txt(c,'SHOOT',AW+18,30,'#e9edf2',6,'left');spike(AW+10,54,0);txt(c,'AVOID',AW+18,54,'#e9edf2',6,'left');
 c.strokeStyle=P.ink;c.lineWidth=5;c.beginPath();c.arc(AW+10,78,6,0,TAU);c.stroke();c.strokeStyle=BL;c.lineWidth=3;c.stroke();txt(c,'DASH',AW+18,78,'#e9edf2',6,'left');
 txt(c,'1 COLOUR',AW+28,100,'#9aa6b8',5);txt(c,'+ 1 SHAPE',AW+28,108,'#9aa6b8',5);txt(c,'= 1 ANSWER',AW+28,116,'#9aa6b8',5);
 aTag(c,'COLOUR-CODED BULLETS',4,3,P.gold,7,'left')}};

/* ACT-47 air juggle: launcher, low-gravity hang with decaying pops, spike into a ground bounce */
const a2Juggle=(()=>{const hits=[.24,.32,.40,.48,.56],spike=.66,launch=.1;const out=[];let y=0,vy=0,x=126,air=false,bounced=0,stop=-1,rest=false;const g=11000;let n=0,landT=-1,popI=-1;
 for(let i=0;i<=500;i++){const v=i/500;const tags={};
  if(Math.abs(v-launch)<.001){vy=1100;air=true}
  for(let j=0;j<hits.length;j++)if(Math.abs(v-hits[j])<.001){stop=v+.016;vy=380*Math.pow(.82,j);n=j+1;x+=2;popI=j}
  if(Math.abs(v-spike)<.001){stop=v+.02;vy=-2600}
  const frozen=v<stop;
  if(!frozen&&air&&!rest){const gs=v>spike?2.5:1+.1*n;vy-=g*gs*.002;y+=vy*.002;if(y<=0){y=0;if(v>spike&&!bounced){vy=420;bounced=1;landT=v}else if(v>spike){rest=true;air=false;vy=0}else{y=0}}}
  out.push({y,x,frozen,rest,n})}
 return{out,hits,spike,launch,landT:()=>{for(let i=0;i<out.length;i++)if(i/500>spike&&out[i].y===0)return i/500;return .7}}})();
DEMOS['ACT-47']={d:6,f:(c,t)=>{const u=prWrap(t);const J=a2Juggle;const idx=Math.min(500,Math.floor(u*500));const st=J.out[idx];const land=J.landT();
 const shk=u>=land&&u<land+.05?aShake(u,2,9):0;c.save();c.translate(0,shk);aSide(c);
 // foe trail
 c.globalAlpha=.5;for(let i=Math.floor(J.launch*500);i<idx;i+=4){const s=J.out[i];R(c,s.x-1,GY-12-s.y-1,2,2,'#fff')}c.globalAlpha=1;
 let fl=0;for(const h of J.hits)if(u>=h&&u<h+.016)fl=1;if(u>=J.spike&&u<J.spike+.02)fl=1;
 const down=st.rest&&u<.92?Math.PI/2:u>=.92?Math.PI/2*(1-ease(seg(u,.92,.99))):0;
 shadow(c,st.x,GY,7,st.y>4?.15:.35);aRot(c,st.x,GY-st.y,down?-down:(st.y>2?Math.sin(u*40)*.15:0),()=>spr(c,'foe',0,0,{sx:1.8,sy:1.8,flip:1,flash:fl}));
 // hero follows
 let hx=104,hy=0;if(u>=.14&&u<J.spike+.04){const k=ease(seg(u,.14,.2));hy=lerp(0,Math.max(0,st.y-2),k);hx=lerp(104,st.x-16,k)}else if(u>=J.spike+.04&&u<.82){const k=ease(seg(u,J.spike+.04,.8));hy=lerp(Math.max(0,J.out[Math.floor((J.spike+.04)*500)].y),0,k);hx=lerp(J.out[Math.floor((J.spike+.04)*500)].x-16,104,k)}
 shadow(c,hx,GY,6,hy>3?.15:.35);prWalker(c,hx,GY-hy,0,{s:1.8,still:1});
 if(u>=.06&&u<.12){const k=seg(u,.06,.12);aSlash(c,hx+6,GY-hy-12,16,.9-k*2.4,1.9-k*2.4,'#fff',3)}
 for(const h of J.hits)if(u>=h-.02&&u<h+.03){const k=seg(u,h-.02,h+.03);aSlash(c,hx+6,GY-hy-14,15,-1.2+k*1.6,-.2+k*1.6,'#fff',2.5);if(u>=h&&u<h+.016)aStar(c,st.x-4,GY-st.y-12,7,'#fff6c8',8,u*4)}
 if(u>=J.spike-.02&&u<J.spike+.03){const k=seg(u,J.spike-.02,J.spike+.03);aSlash(c,hx+6,GY-hy-14,15,-1.6+k*2.6,-.6+k*2.6,P.gold,3)}
 if(u>=land&&u<land+.12){burst(c,st.x,GY,(u-land)*3,14,33,{speed:40,life:.4,grav:-10,col:(l,i)=>i%2?P.dirt:P.dirtD,size:()=>3});aRing(c,st.x,GY-2,seg(u,land,land+.08),'#fff',4,26,2)}
 c.restore();
 const lab=u<.06?'':u<.18?'LAUNCHER':u<J.spike?'AIR HITS · GRAVITY x0.4':u<land?'SPIKE':u<land+.12?'GROUND BOUNCE':'KNOCKDOWN';if(lab)aTag(c,lab,W-4,3,u>=.18&&u<J.spike?P.cyan:P.gold,7,'right');
 // decay panel
 const px=4,py=16;R(c,px,py,70,34,'rgba(10,14,24,.8)');txt(c,'POP PER HIT',px+4,py+6,'#e9edf2',5,'left');
 for(let j=0;j<5;j++){const on=u>=J.hits[j];const hgt=18*Math.pow(.82,j);R(c,px+6+j*12,py+30-hgt,8,hgt,on?P.cyan:'#2b3446')}
 aTag(c,'AIR JUGGLE',4,H-14,P.gold,7,'left')}};
})();
