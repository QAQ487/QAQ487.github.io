/* ===== UI demos (UI-01 … UI-17) — all scoped inside this IIFE ===== */
(()=>{
const G=c=>c.scale(2,2); /* hi:true canvases: keep 240×135 coordinates, crisp text */
const backOut=x=>{const c1=1.70158,c3=c1+1;x=clamp(x);return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2)};
const ioc=x=>{x=clamp(x);return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2};
function bg(c,a='#16202e',b='#0f1621'){const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,a);g.addColorStop(1,b);c.fillStyle=g;c.fillRect(0,0,W,H);c.fillStyle='rgba(255,255,255,.035)';for(let x=0;x<W;x+=12)c.fillRect(x,0,1,H);for(let y=0;y<H;y+=12)c.fillRect(0,y,W,1)}
function panel(c,x,y,w,h,bd='#e9edf2',fill='#1d2533'){R(c,x-1,y-1,w+2,h+2,P.ink);R(c,x,y,w,h,bd);R(c,x+1,y+1,w-2,h-2,fill)}
function cursor(c,x,y,no){c.fillStyle=P.ink;c.beginPath();c.moveTo(x-1,y-1);c.lineTo(x-1,y+11);c.lineTo(x+3,y+8);c.lineTo(x+6,y+13);c.lineTo(x+8,y+12);c.lineTo(x+5,y+7);c.lineTo(x+9,y+7);c.closePath();c.fill();c.fillStyle='#fff';c.beginPath();c.moveTo(x,y+1);c.lineTo(x,y+9);c.lineTo(x+3,y+6.5);c.lineTo(x+5.5,y+11);c.lineTo(x+6.5,y+10.5);c.lineTo(x+4,y+6);c.lineTo(x+7,y+6);c.closePath();c.fill();if(no){ring(c,x+10,y+12,3,1.2,P.red);c.strokeStyle=P.red;c.beginPath();c.moveTo(x+8,y+10);c.lineTo(x+12,y+14);c.stroke()}}
function star(c,x,y,r,col){c.fillStyle=col;c.beginPath();for(let j=0;j<10;j++){const a=-Math.PI/2+j*Math.PI/5,rr=j%2?r*.45:r;c.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr)}c.closePath();c.fill()}
function tri(c,x,y,a,s,col){c.fillStyle=col;c.beginPath();c.moveTo(x+Math.cos(a)*s,y+Math.sin(a)*s);c.lineTo(x+Math.cos(a+2.5)*s*.8,y+Math.sin(a+2.5)*s*.8);c.lineTo(x+Math.cos(a-2.5)*s*.8,y+Math.sin(a-2.5)*s*.8);c.closePath();c.fill()}
function hsl(h,s=85,l=62){return 'hsl('+(((h%360)+360)%360)+','+s+'%,'+l+'%)'}

/* UI-01 tweening / easing: same move, four curves; dots show spacing */
const EASES=[['LINEAR',x=>clamp(x)],['EASE-OUT',eo],['IN-OUT',ioc],['BACK',backOut]];
DEMOS['UI-01']={d:3,hi:true,f:(c,t)=>{G(c);bg(c);const x0=70,x1=220;const k=t<.55?seg(t,.08,.5):1-seg(t,.6,.95);const fwd=t<.55;
EASES.forEach(([n,f],i)=>{const y=20+i*28;txt(c,n,6,y,i===3?P.gold:'#cfd8e3',7,'left');R(c,x0,y,x1-x0,1,'rgba(255,255,255,.18)');for(let j=0;j<=12;j++){const v=f(j/12);R(c,x0+(x1-x0)*v-1,y+5,2,2,'rgba(127,227,216,.55)')}
const v=fwd?f(k):1-f(1-k);const px=x0+(x1-x0)*v;R(c,px-6,y-6,12,12,P.ink);R(c,px-5,y-5,10,10,i===3?P.gold:P.cyan)});
label(c,'dots = equal time steps',150,128,'#8aa')}};

/* UI-02 number roll: instant vs count-up vs odometer */
const EV=[[.5,250],[2.1,480]];
function uiVal(s,roll){let v=120,rolling=0,pop=0;for(const[e,a]of EV){if(s<e)break;if(!roll){v+=a;pop=Math.max(pop,1-seg(s,e,e+.12));continue}const k=seg(s,e,e+.8);v+=a*eo(k);if(k<1)rolling=1;else pop=Math.max(pop,1-seg(s,e+.8,e+.92))}return{v,rolling,pop}}
DEMOS['UI-02']={d:4,hi:true,f:(c,t,_w,_h,p)=>{G(c);bg(c);const s=t*p.dur;const cols=[[40,'INSTANT'],[120,'COUNT-UP'],[200,'ODOMETER']];
cols.forEach(([x,n],i)=>{label(c,n,x,22,'#cfd8e3');panel(c,x-34,48,68,26,'#4a5568','#141a24');const r=uiVal(s,i>0);spr(c,'coin',x-24,64);
if(i<2){const sc=1+.15*Math.sin(r.pop*Math.PI);otxt(c,String(Math.floor(r.v)).padStart(4,'0'),x+6,61,r.rolling?P.gold:'#fff',Math.round(11*sc))}
else{c.save();c.beginPath();c.rect(x-16,52,44,18);c.clip();const v=r.v;for(let pl=0;pl<4;pl++){const dx=x+22-pl*10;const q=v/Math.pow(10,pl);let d=Math.floor(q)%10,fr;if(pl===0)fr=q-Math.floor(q);else{const low=(v%Math.pow(10,pl))/Math.pow(10,pl);fr=clamp((low-.9)*10)}
for(const[dd,off]of[[d,0],[(d+1)%10,1]])otxt(c,String(dd),dx,61-fr*14+off*14,r.rolling?P.gold:'#fff',11)}c.restore();R(c,x-16,52,44,3,'rgba(0,0,0,.45)');R(c,x-16,67,44,3,'rgba(0,0,0,.45)')}
for(const[e,a]of EV){const k=seg(s,e,e+.7);if(k>0&&k<1){c.globalAlpha=1-k;otxt(c,'+'+a,x+14,42-k*8,P.gold,7);c.globalAlpha=1}}
if(i===1)bar(c,x-30,84,60,2,clamp(Math.max(seg(s,.5,1.3),0)*(s<2.1?1:0)+seg(s,2.1,2.9)),P.gold)});
tl(c,t,EV.map(e=>e[0]/p.dur))}};

/* UI-03 button states */
function btn(c,x,y,w,h,st,txtS,pop){/* st: 0 normal 1 hover 2 pressed 3 disabled */const base=st===3?'#5e636e':P.blue;let dy=st===1?-1:st===2?2:0;const sc=1+pop*.08;c.save();c.translate(x+w/2,y+h/2+dy);c.scale(sc,sc);c.translate(-w/2,-h/2);if(st!==2)R(c,0,2,w,h,st===3?'#3a3f48':'#24365e');R(c,-1,-1,w+2,h+2,st===1?'#fff':P.ink);R(c,0,0,w,h,st===2?'#3a5fa0':st===1?'#6a96e0':base);R(c,1,1,w-2,1,'rgba(255,255,255,'+(st===3?.08:.3)+')');c.globalAlpha=st===3?.5:1;txt(c,txtS,w/2,h/2+.5,st===3?'#aab':'#fff',8);c.restore()}
DEMOS['UI-03']={d:4,hi:true,f:(c,t,_w,_h,p)=>{G(c);bg(c);const s=t*p.dur;const A=[50,48,60,18],B=[134,48,60,18];
const path=[[0,120,112],[.5,78,58],[1.9,78,58],[2.3,162,58],[3.5,162,58],[4,120,112]];let cx=120,cy=112;for(let i=0;i<path.length-1;i++){const[a0,x0,y0]=path[i],[a1,x1,y1]=path[i+1];if(s>=a0&&s<=a1){const k=ease((s-a0)/(a1-a0));cx=lerp(x0,x1,k);cy=lerp(y0,y1,k)}}
const onA=cx>A[0]&&cx<A[0]+A[2]&&cy>A[1]-2&&cy<A[1]+A[3]+2,onB=cx>B[0]&&cx<B[0]+B[2]&&cy>B[1]-2&&cy<B[1]+B[3]+2;const pressA=onA&&s>1.0&&s<1.3,pressB=onB&&s>2.8&&s<3.1;
const pop=s>1.3&&s<1.45?Math.sin(seg(s,1.3,1.45)*Math.PI):0;const stA=pressA?2:onA?1:0;btn(c,...A,stA,'PLAY',pop);btn(c,...B,3,'SHOP',0);
if(pressA)burst(c,A[0]+A[2]/2,A[1]+9,s-1.0,8,3,{speed:30,life:.3,col:'#cfe1ff',size:()=>1});
cursor(c,cx,cy+(pressA||pressB?1:0),onB&&s>2.6);
const cur=onB?3:stA;['NORMAL','HOVER','PRESSED','DISABLED'].forEach((n,i)=>{const x=30+i*60,on=cur===i;R(c,x-27,90,54,13,on?P.gold:'#263042');txt(c,n,x,97,on?P.ink:'#8a96a8',7)});
label(c,'press shows on press, not release',120,122,'#8aa')}};

/* UI-04 error shake on a code field */
DEMOS['UI-04']={d:4,hi:true,f:(c,t,_w,_h,p)=>{G(c);bg(c);const s=t*p.dur;const tries=[{t0:.2,code:'1234',end:1.0,ok:0},{t0:2.0,code:'7294',end:2.8,ok:1}];
let shown='',state=0,se=-1;for(const tr of tries){if(s<tr.t0)break;const n=Math.min(4,Math.floor((s-tr.t0)/.2)+1);shown=tr.code.slice(0,n);if(s>=tr.end){state=tr.ok?2:1;se=s-tr.end}if(!tr.ok&&s>=1.85){shown='';state=0}}
let ox=0;if(state===1&&se<.35){const k=se/.35;ox=6*Math.sin(k*TAU*3)*Math.pow(1-k,2)}
label(c,'ENTER CODE',120,26,'#cfd8e3');const col=state===1?P.red:state===2?'#5be35b':'#e9edf2';
for(let i=0;i<4;i++){const x=72+i*26+ox;R(c,x-1,39,22,26,P.ink);R(c,x,40,20,24,col);R(c,x+1,41,18,22,'#141a24');if(shown[i])otxt(c,shown[i],x+10,52.5,'#fff',12);else if(i===shown.length&&state===0&&Math.floor(s*3)%2)R(c,x+6,58,8,1,'#fff')}
if(state===1)txt(c,'WRONG CODE',120+ox,78,P.red,8);if(state===2){txt(c,'UNLOCKED',120,78,'#5be35b',8)}
label(c,'only the field moves — screen stays still',120,104,'#8aa');tl(c,t,[1.0/p.dur,2.8/p.dur])}};

/* UI-05 cooldown sweep */
function icon(c,k,x,y){R(c,x,y,28,28,['#3a4f7a','#7a3a2a','#2f5a4a'][k]);if(k===0){c.strokeStyle='#e9edf2';c.lineWidth=3;c.beginPath();c.moveTo(x+7,y+21);c.lineTo(x+21,y+7);c.stroke();R(c,x+6,y+17,6,2,P.gold)}else if(k===1){circ(c,x+14,y+15,8,P.orange);circ(c,x+14,y+16,4,P.gold)}else{c.fillStyle=P.cyan;c.beginPath();c.moveTo(x+14,y+5);c.lineTo(x+22,y+9);c.lineTo(x+20,y+19);c.lineTo(x+14,y+24);c.lineTo(x+8,y+19);c.lineTo(x+6,y+9);c.fill()}}
const CDS=[[.3,1.2],[.6,2.0],[.5,3.0]];
DEMOS['UI-05']={d:4,hi:true,f:(c,t,_w,_h,p)=>{G(c);bg(c);const s=t*p.dur;R(c,36,34,168,48,'rgba(0,0,0,.4)');
CDS.forEach(([u,cd],i)=>{const x=56+i*48,y=40;const press=s>=u&&s<u+.06?1:0;R(c,x-2,y-2+press,32,32,P.ink);icon(c,i,x,y+press);const e=s-u,k=e/cd;
if(e>=0&&k<1){c.save();c.beginPath();c.rect(x,y,28,28);c.clip();c.fillStyle='rgba(0,0,0,.6)';c.beginPath();c.moveTo(x+14,y+14);const a0=-Math.PI/2+k*TAU;c.arc(x+14,y+14,24,a0,-Math.PI/2+TAU);c.closePath();c.fill();c.restore();const rem=cd-e;otxt(c,rem>1?String(Math.ceil(rem)):rem.toFixed(1),x+14,y+14,'#fff',9)}
const r=e-cd;if(r>=0&&r<.25){c.globalAlpha=r<.1?.8:0;R(c,x,y,28,28,'#fff');c.globalAlpha=1-r/.25;ring(c,x+14,y+14,16+r*40,2,'#fff');c.globalAlpha=1}
txt(c,String(i+1),x+14,y+38,'#8a96a8',7)});
label(c,'clockwise from 12 o\u2019clock',120,112,'#8aa');tl(c,t,CDS.map(([u,cd])=>(u+cd)/p.dur))}};

/* UI-06 reward pop / level-up */
DEMOS['UI-06']={d:4,hi:true,f:(c,t,_w,_h,p)=>{G(c);c.drawImage(scene('day'),0,0);R(c,0,0,W,H,'rgba(13,22,48,.35)');const s=t*p.dur,L=1.3;
const xp=s<L?lerp(.3,1,eo(seg(s,.1,1.2))):lerp(0,.18,seg(s,1.5,4));R(c,20,121,200,8,P.ink);bar(c,22,123,196,4,xp,P.cyan);txt(c,'XP',12,125,'#cfe',7);
const lv=s<L?4:5,lp=s>=L?1+.4*(1-eo(seg(s,L,L+.3))):1;panel(c,6,6,40,16);otxt(c,'LV '+lv,26,14,s>=L&&s<L+.3?P.gold:'#fff',Math.round(8*lp));
const fo=1-seg(s,2.8,3.1);if(s>=L&&fo>0){const k=seg(s,L,L+.3),sc=backOut(k)*1.1;c.save();c.globalAlpha=fo*clamp(k*3);c.translate(120,62);c.rotate(s*30*Math.PI/180);c.globalCompositeOperation='lighter';for(let j=0;j<12;j++){c.rotate(TAU/12);c.fillStyle='rgba(242,201,76,.28)';c.beginPath();c.moveTo(0,0);c.lineTo(-7*sc,-80*sc);c.lineTo(7*sc,-80*sc);c.fill()}c.restore();
c.globalAlpha=fo;burst(c,120,62,s-L,20,41,{speed:80,grav:40,life:1.1,col:(l,i)=>i%3?P.gold:'#fff6c8',size:l=>l<.4?3:2});c.globalAlpha=fo;c.save();c.translate(120,62);c.scale(sc,sc);otxt(c,'LEVEL UP!',0,0,P.gold,16);c.restore();c.globalAlpha=1}
tl(c,t,[L/p.dur])}};

/* UI-07 background blur on pause: world freezes, snapshot blurs */
let uiWorld=null,uiSmall=null,uiSmall2=null;
function world(gt){if(!uiWorld)uiWorld=mk(W,H);const g=uiWorld.getContext('2d');g.imageSmoothingEnabled=false;g.drawImage(scene('eday'),0,0);const hx=40+((gt*28)%160);shadow(g,hx,98);spr(g,'hero',hx,98);const gx=200-((gt*20)%120),gy=70+Math.round(Math.sin(gt*5)*2);shadow(g,gx,gy);spr(g,'foe',gx,gy,{flip:true});for(let i=0;i<3;i++){const cx=((gt*12+i*90)%300)-30;R(g,cx,14+i*9,22,4,'rgba(255,255,255,.55)')}return uiWorld}
DEMOS['UI-07']={d:4,hi:true,f:(c,t,_w,_h,p)=>{G(c);const s=t*p.dur,P0=1.2,P1=2.8;const gt=s<P0?s:s<P1?P0:s-(P1-P0);const b=ease(seg(s,P0,P0+.25))-ease(seg(s,P1,P1+.18));const w=world(gt);
if(b<=0.001)c.drawImage(w,0,0);else{if(!uiSmall){uiSmall=mk(W,H);uiSmall2=mk(W,H)}const f=1/(1+b*7),sw=Math.max(4,Math.round(W*f)),sh=Math.max(3,Math.round(H*f));const g1=uiSmall.getContext('2d'),g2=uiSmall2.getContext('2d');g1.imageSmoothingEnabled=true;g2.imageSmoothingEnabled=true;g1.clearRect(0,0,W,H);g1.drawImage(w,0,0,W/2,H/2);g2.clearRect(0,0,W,H);g2.drawImage(uiSmall,0,0,W/2,H/2,0,0,sw,sh);c.drawImage(w,0,0);c.globalAlpha=clamp(b*4);c.imageSmoothingEnabled=true;c.drawImage(uiSmall2,0,0,sw,sh,0,0,W,H);c.imageSmoothingEnabled=false;c.globalAlpha=1;R(c,0,0,W,H,'rgba(13,22,48,'+(.35*b)+')')}
if(b>0.01){c.save();c.globalAlpha=b;c.translate(0,12*(1-b));panel(c,80,30,80,72,'#cfd8e3','#141a24');txt(c,'PAUSED',120,42,P.gold,9);['RESUME','OPTIONS','QUIT'].forEach((n,i)=>{const y=60+i*13;if(i===0)R(c,86,y-5,68,11,'#2f4a7a');txt(c,n,120,y,i===0?'#fff':'#9aa6b8',7)});c.restore()}
R(c,4,4,52,11,'rgba(0,0,0,.5)');txt(c,s>=P0&&s<P1+.1?'II PAUSED':'> PLAYING',30,10,s>=P0&&s<P1+.1?P.gold:'#cfe',7);tl(c,t,[P0/p.dur,P1/p.dur])}};

/* UI-08 minimap: 2× main view following the hero, 1/4 overview in the corner */
function mmPos(t){return[120+80*Math.cos(TAU*t),68+36*Math.sin(TAU*t*2)]}
const GOB=t=>[[190+12*Math.sin(TAU*t*2),95],[45,35+10*Math.sin(TAU*t*3)],[150+20*Math.cos(TAU*t),118]];
DEMOS['UI-08']={d:8,hi:true,f:(c,t)=>{G(c);const[hx,hy]=mmPos(t);const cx=clamp(hx,60,180),cy=clamp(hy,34,101);const vx=cx-60,vy=cy-33.75;
c.save();c.scale(2,2);c.translate(-vx,-vy);c.drawImage(scene('eday'),0,0);star(c,222,122,4,P.gold);for(const[gx,gy]of GOB(t)){shadow(c,gx,gy,4);spr(c,'foe',gx,gy)}shadow(c,hx,hy,4);spr(c,'hero',hx,hy,{flip:Math.sin(TAU*t)>0});c.restore();
const mx=W-66,my=5,mw=60,mh=34,sc=mw/W;R(c,mx-2,my-2,mw+4,mh+4,P.ink);R(c,mx-1,my-1,mw+2,mh+2,'#cfd8e3');c.globalAlpha=.85;c.imageSmoothingEnabled=true;c.drawImage(scene('eday'),mx,my,mw,mh);c.imageSmoothingEnabled=false;c.globalAlpha=1;R(c,mx,my,mw,mh,'rgba(10,20,40,.25)');
c.strokeStyle='#fff';c.lineWidth=.6;c.strokeRect(mx+vx*sc,my+vy*sc,120*sc,67.5*sc);for(const[gx,gy]of GOB(t))R(c,mx+gx*sc-1,my+gy*sc-1,2,2,P.red);star(c,mx+222*sc,my+122*sc,2.2,P.gold);if(Math.floor(t*8*2)%2===0)R(c,mx+hx*sc-1.5,my+hy*sc-1.5,3,3,'#fff');
label(c,'MINIMAP',mx+mw/2,my+mh+6,'#fff')}};

/* UI-09 off-screen indicator / edge arrow */
DEMOS['UI-09']={d:6,hi:true,f:(c,t)=>{G(c);const ox=t*60;ground(c,ox,0);c.save();c.translate(-ox%W,0);path(c);path(c,-W);c.restore();const C=[120,72];shadow(c,120,78);spr(c,'hero',120,78);
const RX=lerp(60,210,.5+.5*Math.sin(TAU*t*2)),A=TAU*t;const tg=[{x:C[0]+Math.cos(A)*RX,y:C[1]+Math.sin(A)*RX*.55,col:P.gold,k:'star'},{x:C[0]+Math.cos(-A*2+2)*160,y:C[1]+Math.sin(-A*2+2)*95,col:P.red,k:'foe'}];
const IN=10;for(const o of tg){const on=o.x>IN&&o.x<W-IN&&o.y>IN&&o.y<H-IN;const dx=o.x-C[0],dy=o.y-C[1],dist=Math.round(Math.hypot(dx,dy)/6);
if(on){if(o.k==='star')star(c,o.x,o.y,5,o.col);else{shadow(c,o.x,o.y+1);spr(c,'foe',o.x,o.y+1)}const bob=Math.round(Math.sin(t*TAU*6)*1.5);tri(c,o.x,o.y-15+bob,Math.PI/2,4,o.col)}
else{const hw=W/2-IN,hh=H/2-IN;const k=Math.min(hw/Math.max(1e-3,Math.abs(dx)),(hh)/Math.max(1e-3,Math.abs(dy)));const px=C[0]+dx*k,py=C[1]+dy*k,an=Math.atan2(dy,dx);c.save();c.globalAlpha=.6;circ(c,px,py,6.5,P.ink);c.restore();tri(c,px,py,an,6,o.col);const tx=px-Math.cos(an)*14,ty=py-Math.sin(an)*10;otxt(c,dist+'m',tx,ty,o.col,7)}}
c.strokeStyle='rgba(255,255,255,.25)';c.setLineDash([2,3]);c.strokeRect(IN,IN,W-2*IN,H-2*IN);c.setLineDash([]);txt(c,'10px inset safe rect',14,H-16,'rgba(255,255,255,.7)',6,'left')}};

/* UI-10 floating nameplates / overhead bars */
const HITS_A=[.8,1.6,2.4],HIT_B=2.0;
function hp(s,hits,dmg){let v=1;for(const h of hits)if(s>=h)v-=dmg;return v}
DEMOS['UI-10']={d:4,hi:true,f:(c,t,_w,_h,p)=>{G(c);ground(c);path(c);fence(c,10,30,8);tree(c,220,40);const s=t*p.dur;
const vx=40+25*Math.sin(TAU*t),ax=140+Math.round(Math.sin(s*3)*3),bx=196+Math.round(Math.cos(s*2.4)*4);const units=[{x:vx,y:92,k:'npc',n:'MIRA',col:'#7ee36b'},{x:ax,y:84,k:'foe',n:'SLIME',col:'#ff7a6a',hp:hp(s,HITS_A,.22),last:Math.max(...HITS_A.filter(h=>s>=h),-9)},{x:bx,y:104,k:'foe',n:'SLIME',col:'#ff7a6a',hp:hp(s,[HIT_B],.3),last:s>=HIT_B?HIT_B:-9}];
shadow(c,112,86);spr(c,'hero',112,86);
for(const u of units){const fl=u.last!=null&&s-u.last>=0&&s-u.last<.08?1:0;shadow(c,u.x,u.y);spr(c,u.k,u.x,u.y,{flash:fl,sx:1.4,sy:1.4})}
for(const u of units){const hx=Math.round(u.x),top=u.y-16;let a=1;if(u.hp!=null){const since=s-u.last;a=u.last<0?0:clamp(1-(since-1.4)/.3);if(a>0){c.globalAlpha=a;bar(c,hx-8,top-4,16,2,u.hp,P.red);c.globalAlpha=1}}c.globalAlpha=u.hp!=null&&u.last<0?.75:1;otxt(c,u.n,hx,top-9,u.col,5);c.globalAlpha=1}
for(const h of HITS_A){const e=s-h;if(e>-.1&&e<.05){c.strokeStyle='#fff';c.lineWidth=1.5;c.beginPath();c.arc(ax-6,78,8,-1.4+e*20,-.4+e*20);c.stroke()}}
label(c,'bar shows after damage, fades when idle',120,126,'#fff')}};

/* UI-11 radial menu */
const ITEMS=[['SWORD','#cfd8e3'],['BOW','#b9925e'],['BOMB','#5e636e'],['POTION','#e04a3a'],['KEY',P.gold],['TORCH',P.orange],['MAP','#e3c99a'],['ROPE','#94704a']];
function stickAngle(s){const keys=[[.6,-Math.PI/2],[1.3,-Math.PI/2+TAU/8*2],[2.1,-Math.PI/2+TAU/8*2],[2.7,-Math.PI/2+TAU/8*5]];if(s<keys[0][0])return keys[0][1];for(let i=0;i<keys.length-1;i++){const[a0,v0]=keys[i],[a1,v1]=keys[i+1];if(s<a1)return lerp(v0,v1,ease((s-a0)/(a1-a0)))}return keys[keys.length-1][1]}
DEMOS['UI-11']={d:4,hi:true,f:(c,t,_w,_h,p)=>{G(c);const s=t*p.dur,O0=.4,C0=3.0;const open=s>=O0&&s<C0+.08;const ok=s<C0?backOut(seg(s,O0,O0+.12))*.4+.6:1-seg(s,C0,C0+.08)*.4;const al=s<C0?clamp((s-O0)/.06):1-seg(s,C0,C0+.08);
c.drawImage(scene('day'),0,0);if(open)R(c,0,0,W,H,'rgba(13,22,48,'+(.45*al)+')');const n=8,cx=120,cy=64,ri=14,ro=40;
const a=stickAngle(s),sel=Math.floor(((a+Math.PI/2+Math.PI/n)%TAU+TAU)%TAU/(TAU/n));
if(open){c.save();c.globalAlpha=al;c.translate(cx,cy);c.scale(ok,ok);for(let i=0;i<n;i++){const a0=-Math.PI/2+(i-.5)*TAU/n+.03,a1=a0+TAU/n-.06,on=i===sel&&s>.6,push=on?3:0,mid=(a0+a1)/2;c.save();c.translate(Math.cos(mid)*push,Math.sin(mid)*push);c.fillStyle=on?'#3f6bb8':'rgba(20,26,36,.85)';c.beginPath();c.arc(0,0,ro,a0,a1);c.arc(0,0,ri,a1,a0,true);c.closePath();c.fill();c.strokeStyle=on?'#fff':'rgba(255,255,255,.25)';c.lineWidth=1;c.stroke();circ(c,Math.cos(mid)*27,Math.sin(mid)*27,4,ITEMS[i][1]);c.restore()}
circ(c,0,0,ri-2,'rgba(20,26,36,.9)');if(s>.6)txt(c,ITEMS[sel][0],0,0,'#fff',5);const sr=s>.6?6:0;circ(c,Math.cos(a)*sr,Math.sin(a)*sr+8,1.5,P.cyan);c.restore()}
if(s>=C0&&s<C0+.15){c.globalAlpha=1-seg(s,C0,C0+.15);ring(c,cx,cy,ro*.7+seg(s,C0,C0+.15)*20,3,'#fff');c.globalAlpha=1}
panel(c,6,108,62,20);txt(c,open?'HOLD [Q]':'[Q] ITEMS',37,118,open?P.gold:'#cfd8e3',7);const cur=s>=C0?5:2;panel(c,206,108,26,20);circ(c,219,118,5,ITEMS[s>=C0?ITEMS.length-3:2][1]);label(c,ITEMS[s>=C0?5:2][0],219,103,'#fff');void cur;tl(c,t,[O0/p.dur,C0/p.dur])}};

/* UI-12 tooltip with hover delay and edge flip */
const SLOTS=[0,1,2,3,4,5,6,7].map(i=>[64+(i%4)*36,40+Math.floor(i/4)*30]);
const TIP={1:['IRON SWORD','#e9edf2',['ATK +12','Common']],3:['EMBER STAFF',P.purple,['MAG +31','Epic \u2022 burns']]};
function slotIcon(c,i,x,y){const cols=['#7a5034','#cfd8e3','#5fa8c8',P.purple,P.red,P.gold,'#6fbf4a','#e3c99a'];const col=cols[i];if(i===1){c.strokeStyle=col;c.lineWidth=2;c.beginPath();c.moveTo(x+5,y+17);c.lineTo(x+17,y+5);c.stroke()}else if(i===3){R(c,x+10,y+6,2,13,'#7a5034');circ(c,x+11,y+6,3.5,P.orange)}else circ(c,x+11,y+11,5,col)}
DEMOS['UI-12']={d:5,hi:true,f:(c,t,_w,_h,p)=>{G(c);bg(c,'#1b2333','#121822');txt(c,'INVENTORY',64,22,'#cfd8e3',8,'left');const s=t*p.dur;
const path=[[0,40,118],[.6,93,52],[2.0,93,52],[2.2,150,100],[2.5,190,52],[4.3,190,52],[5,40,118]];let cx=40,cy=118;for(let i=0;i<path.length-1;i++){const[a0,x0,y0]=path[i],[a1,x1,y1]=path[i+1];if(s>=a0&&s<=a1){const k=ease((s-a0)/(a1-a0));cx=lerp(x0,x1,k);cy=lerp(y0,y1,k)}}
let hov=-1;SLOTS.forEach(([x,y],i)=>{const on=cx>=x&&cx<x+22&&cy>=y&&cy<y+22;if(on)hov=i;R(c,x-1,y-1,24,24,on?'#fff':P.ink);R(c,x,y,22,22,'#273246');slotIcon(c,i,x,y)});
let rest=0;if(hov===1)rest=s-.6;else if(hov===3)rest=s-2.5;const D=.35;
if(hov>=0&&TIP[hov]&&rest>D){const[nm,col,lines]=TIP[hov];const a=clamp((rest-D)/.1);const w=72,h=34;let tx=cx+8,ty=cy+8;let flip=false;if(tx+w>W-2){tx=cx-8-w;flip=true}if(ty+h>H-2)ty=cy-8-h;c.globalAlpha=a;R(c,tx-1,ty-1,w+2,h+2,col);R(c,tx,ty,w,h,'rgba(20,26,36,.95)');txt(c,nm,tx+4,ty+7,col,7,'left');lines.forEach((l,i)=>txt(c,l,tx+4,ty+17+i*9,'#9aa6b8',6,'left'));c.globalAlpha=1;if(flip)label(c,'flipped left at edge',tx+w/2,ty+h+6,P.gold)}
if(hov>=0&&TIP[hov]&&rest>0&&rest<D){ring(c,cx+3,cy-3,3,1,'rgba(255,255,255,.25)');c.strokeStyle='#fff';c.lineWidth=1;c.beginPath();c.arc(cx+3,cy-3,3,-Math.PI/2,-Math.PI/2+TAU*rest/D);c.stroke()}
cursor(c,cx,cy);label(c,'0.35 s hover delay',200,126,'#8aa')}};

/* UI-13 toasts: slide in, stack, merge duplicates, expire */
const TOASTS=[{b:.3,r:.6,txt:s=>s<.6?'+1 WOOD':'+2 WOOD',col:'#b9925e'},{b:1.4,r:1.4,txt:()=>'QUEST UPDATED',col:P.cyan},{b:2.2,r:2.2,txt:()=>'ACHIEVEMENT!',col:P.gold},{b:2.7,r:2.7,txt:()=>'+5 GOLD',col:P.gold}];
DEMOS['UI-13']={d:6,hi:true,f:(c,t,_w,_h,p)=>{G(c);c.drawImage(world(t*p.dur),0,0);const s=t*p.dur,LIFE=2.5,TW=96,TH=14;
TOASTS.forEach((o,i)=>{if(s<o.b)return;const end=o.r+LIFE;if(s>end+.25)return;let yy=6;for(let j=i+1;j<TOASTS.length;j++){const q=TOASTS[j];if(s>=q.b&&s<=q.r+LIFE+.25)yy+=16*eo(seg(s,q.b,q.b+.15))}
for(let j=i+1;j<TOASTS.length;j++){const q=TOASTS[j];if(s>q.r+LIFE+.25)yy-=0}
const slide=1-eo(seg(s,o.b,o.b+.2)),a=1-seg(s,end,end+.25);const x=W-TW-6+slide*(TW+10);const pop=s>=o.r&&s<o.r+.12&&o.r!==o.b?Math.sin(seg(s,o.r,o.r+.12)*Math.PI)*.12:0;
c.globalAlpha=a;R(c,x-1,yy-1,TW+2,TH+2,P.ink);R(c,x,yy,TW,TH,'rgba(20,26,36,.92)');R(c,x,yy,3,TH,o.col);R(c,x+6,yy+3,8,8,o.col);c.save();c.translate(x+18,yy+TH/2);c.scale(1+pop,1+pop);txt(c,o.txt(s),0,.5,'#fff',7,'left');c.restore();R(c,x+3,yy+TH-1,(TW-3)*(1-clamp((s-o.r)/LIFE)),1,'rgba(255,255,255,.35)');c.globalAlpha=1});
label(c,'auto-dismiss 2.5 s \u2022 duplicates merge',90,126,'#fff');tl(c,t,TOASTS.map(o=>o.b/p.dur))}};

/* UI-14 nine-slice vs plain scaling */
let uiNine=null;function nineSrc(){if(uiNine)return uiNine;const k=mk(24,24),g=k.getContext('2d');R(g,0,0,24,24,P.ink);R(g,1,1,22,22,'#7a5034');R(g,2,2,20,20,'#55361f');R(g,3,3,18,18,'#26324a');for(let i=4;i<20;i+=4){R(g,i,1,2,1,'#f2c94c');R(g,i,22,2,1,'#f2c94c');R(g,1,i,1,2,'#f2c94c');R(g,22,i,1,2,'#f2c94c')}for(const[x,y]of[[0,0],[16,0],[0,16],[16,16]]){R(g,x+1,y+1,7,7,P.ink);R(g,x+2,y+2,5,5,P.gold);R(g,x+4,y+2,1,5,'#b6483a');R(g,x+2,y+4,5,1,'#b6483a');R(g,x+4,y+4,1,1,'#fff6c8')}R(g,3,3,18,18,'#26324a');return uiNine=k}
function nine(c,x,y,w,h){const s=nineSrc(),m=8;x=Math.round(x);y=Math.round(y);w=Math.round(w);h=Math.round(h);const iw=w-2*m,ih=h-2*m;c.drawImage(s,0,0,m,m,x,y,m,m);c.drawImage(s,16,0,m,m,x+w-m,y,m,m);c.drawImage(s,0,16,m,m,x,y+h-m,m,m);c.drawImage(s,16,16,m,m,x+w-m,y+h-m,m,m);
for(let o=0;o<iw;o+=8){const sw=Math.min(8,iw-o);c.drawImage(s,8,0,sw,m,x+m+o,y,sw,m);c.drawImage(s,8,16,sw,m,x+m+o,y+h-m,sw,m)}for(let o=0;o<ih;o+=8){const sh=Math.min(8,ih-o);c.drawImage(s,0,8,m,sh,x,y+m+o,m,sh);c.drawImage(s,16,8,m,sh,x+w-m,y+m+o,m,sh)}c.drawImage(s,8,8,8,8,x+m,y+m,iw,ih)}
DEMOS['UI-14']={d:4,hi:true,f:(c,t)=>{G(c);bg(c);const src=nineSrc();txt(c,'SOURCE 24px',36,22,'#cfd8e3',7);c.drawImage(src,12,34,48,48);c.strokeStyle=P.cyan;c.lineWidth=.5;c.setLineDash([2,2]);for(const v of[28,44]){c.beginPath();c.moveTo(12+(v-12),32);c.lineTo(12+(v-12),84);c.stroke();c.beginPath();c.moveTo(10,34+(v-12));c.lineTo(62,34+(v-12));c.stroke()}c.setLineDash([]);txt(c,'3\u00d73 grid',36,92,P.cyan,6);
const k=.5-.5*Math.cos(TAU*t),k2=.5-.5*Math.cos(TAU*t*2),w=lerp(36,132,k),h=lerp(22,46,k2);txt(c,'SCALED',84,7,P.red,7,'left');c.drawImage(src,0,0,24,24,84,13,w,h);txt(c,'9-SLICE',84,70,'#5be35b',7,'left');nine(c,84,76,w,h);
txt(c,'corners keep',36,108,'#8aa',6);txt(c,'their size',36,116,'#8aa',6)}};

/* UI-15 typewriter */
const TW_LINES=[{s:.3,txt:'Hello, traveller. The bridge is out... take the forest path!',skip:null},{s:3.7,txt:'Press a button while it types and the whole line appears at once.',skip:4.3}];
const twCache={};function twLayout(c,text){if(twCache[text])return twCache[text];c.font='bold 7px monospace';const cw=c.measureText('M').width,maxW=200;const lines=[];let cur='';for(const wd of text.split(' ')){const nx=cur?cur+' '+wd:wd;if(nx.length*cw>maxW){lines.push(cur);cur=wd}else cur=nx}lines.push(cur);const times=[];let tt=0;const full=lines.join('\n');for(const ch of full){times.push(tt);if(ch==='\n')continue;tt+=1/20;if(ch===',')tt+=.15;if('.!?'.includes(ch))tt+=.35/3}return twCache[text]={lines,times,cw,dur:tt}}
DEMOS['UI-15']={d:6.5,hi:true,f:(c,t,_w,_h,p)=>{G(c);c.drawImage(scene('day'),0,0);const s=t*p.dur;panel(c,8,84,224,44,'#e9edf2','#141a24');
let L=TW_LINES[0];if(s>=TW_LINES[1].s)L=TW_LINES[1];const lay=twLayout(c,L.txt);const e=s-L.s;let vis=0;const skipped=L.skip!=null&&s>=L.skip;lay.times.forEach((tm,i)=>{if(e>=tm)vis=i+1});if(skipped)vis=lay.times.length;
let idx=0;lay.lines.forEach((ln,li)=>{for(let j=0;j<ln.length;j++){if(idx<vis)txt(c,ln[j],16+j*lay.cw,96+li*11,'#fff',7,'left');idx++}idx++});
const done=vis>=lay.times.length&&e>0;if(done&&Math.floor(s/.3)%2===0||done&&(s%.6)<.3)tri(c,222,120+((s%.6)<.3?0:2),Math.PI/2,3,P.gold);
if(L.skip!=null&&s>=L.skip&&s<L.skip+.3){R(c,180,70,44,12,P.gold);txt(c,'[A] SKIP',202,76,P.ink,7)}
R(c,8,4,90,11,'rgba(0,0,0,.55)');txt(c,'20 cps + pauses',53,10,'#cfe',7);tl(c,t,[TW_LINES[1].s/p.dur,4.3/p.dur])}};

/* UI-16 dialogue box: open, speaker tag + portrait, speaker switch, close */
function portrait(c,k,x,y,col){R(c,x-1,y-1,34,34,P.ink);R(c,x,y,32,32,col);R(c,x+1,y+1,30,30,'#2a3450');spr(c,k,x+16,y+36,{sx:3,sy:3})}
const DLG=[{a:.45,b:2.7,who:'MIRA',k:'npc',col:'#4f9a5a',side:0,txt:['The old bridge washed away','in last night\u2019s storm.']},{a:2.8,b:5.0,who:'HERO',k:'hero',col:'#b6483a',side:1,txt:['Then I will take the','forest path instead.']}];
DEMOS['UI-16']={d:6,hi:true,f:(c,t,_w,_h,p)=>{G(c);c.drawImage(scene('eday'),0,0);shadow(c,100,70);spr(c,'hero',100,70,{flip:false});shadow(c,140,70);spr(c,'npc',140,70);const s=t*p.dur;
const op=s<5.3?backOut(seg(s,.2,.35)):1-seg(s,5.3,5.4);if(op<=0.01){label(c,'(no dialogue)',120,110,'#fff');return}const bx=8,bw=224,bh=40,by=H-bh-6;
c.save();c.translate(0,by+bh/2);c.scale(1,op);c.translate(0,-(by+bh/2));panel(c,bx,by,bw,bh,'#e3c99a','#141a24');c.restore();if(op<.95)return;
for(const d of DLG){const a=clamp((s-d.a)/.12)*(1-clamp((s-d.b)/.1));if(a<=0)continue;c.globalAlpha=a;const px=d.side?bx+bw-36:bx+4,tx=d.side?bx+8:bx+42;portrait(c,d.k,px,by+4,d.col);const tagx=d.side?bx+bw-52:bx+4;R(c,tagx-1,by-11,50,11,P.ink);R(c,tagx,by-10,48,9,d.col);txt(c,d.who,tagx+24,by-5.5,'#fff',7);
d.txt.forEach((ln,i)=>{const la=clamp((s-d.a-.15-i*.35)/.15);c.globalAlpha=a*la;txt(c,ln,tx,by+12+i*11,'#fff',7,'left')});c.globalAlpha=a;if(s>d.a+.9){const bob=(s%.6)<.3?0:2;tri(c,d.side?bx+bw-46:bx+bw-8,by+bh-6+bob,Math.PI/2,3,P.gold)}c.globalAlpha=1}
const sp=s>=2.75&&s<5.3?(s<2.8?0:1):0;const who=s>=2.75?1:0;const[sx]=[who?100:140];if(s>.45&&s<5.1){tri(c,sx,48+Math.round(Math.sin(s*8)),Math.PI/2,3,'#fff')}void sp;tl(c,t,[.2/p.dur,2.8/p.dur,5.3/p.dur])}};

/* UI-17 animated text: wave, shake, rainbow (only tagged words move) */
const AT=[['A ','wavy hello','!','wave'],['I am ','so scared','...','shake'],['You found a ','RAINBOW GEM','.','rainbow']];
DEMOS['UI-17']={d:3,hi:true,f:(c,t)=>{G(c);bg(c);c.font='bold 9px monospace';const cw=c.measureText('M').width;
AT.forEach(([pre,eff,post,kind],r)=>{const y=30+r*36;const all=pre+eff+post;let x=120-all.length*cw/2;txt(c,'<'+kind+'>',8,y-14,P.cyan,6,'left');
[...all].forEach((ch,i)=>{const inEff=i>=pre.length&&i<pre.length+eff.length,j=i-pre.length;let dx=0,dy=0,col='#e9edf2';
if(inEff){if(kind==='wave')dy=Math.round(2*Math.sin(TAU*t*2+j*.6)*1);if(kind==='shake'){const f=Math.floor(t*60);dx=Math.round(hash(f*31+j*7)*2-1);dy=Math.round(hash(f*17+j*13+5)*2-1);col='#ff9a8a'}if(kind==='rainbow')col=hsl(t*360+j*30)}
if(ch!==' ')otxt(c,ch,x+i*cw+cw/2+dx,y+dy,col,9);});});
label(c,'plain words stay still',120,126,'#8aa')}};
})();
