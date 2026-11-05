/* ===== ANI demos (角色動畫表現) — everything local to this IIFE, helpers prefixed an ===== */
(()=>{
const D2R=Math.PI/180;
const anBG=(c,top='#2a3446',bot='#1f2836',gy=100)=>{R(c,0,0,W,H,top);R(c,0,gy,W,H-gy,bot);R(c,0,gy,W,1,'rgba(255,255,255,.12)')};
const anTag=(c,s,x,y,col='#e9edf2',bg='rgba(0,0,0,.55)')=>{c.font='bold 7px monospace';const w=Math.ceil(c.measureText(s).width)+6;R(c,x-w/2,y-5,w,10,bg);txt(c,s,x,y,col,7)};
const anLine=(c,a,b,w,col)=>{c.strokeStyle=col;c.lineWidth=w;c.lineCap='round';c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.stroke()};
const anPt=(o,len,ang,dir)=>[o[0]+Math.sin(ang)*len*dir,o[1]+Math.cos(ang)*len];
/* side-view figure: pelvis (px,py); angles in rad, 0 = straight down for limbs, 0 = upright for torso; positive = forward */
function anFig(c,px,py,o={}){const s=o.s||1,dir=o.dir||1,sil=o.sil;const body=sil||o.col||P.blue,bodyD=sil||o.colD||'#2f4f8a',skin=sil||P.skin,hair=sil||o.hair||'#3a2a20';
const lean=o.lean||0,pel=[px,py];const neck=[px+Math.sin(lean)*9*s*dir,py-Math.cos(lean)*9*s];const ha=lean+(o.head||0);const head=[neck[0]+Math.sin(ha)*4.5*s*dir,neck[1]-Math.cos(ha)*4.5*s];
const leg=(th,kn,col)=>{const k=anPt(pel,6*s,th,dir),f=anPt(k,6*s,th-kn,dir);anLine(c,pel,k,2.6*s,col);anLine(c,k,f,2.4*s,col);anLine(c,f,[f[0]+2*s*dir,f[1]],2*s,col);return f};
const arm=(sh,el,col)=>{const sp=[lerp(neck[0],pel[0],.15),lerp(neck[1],pel[1],.15)],e=anPt(sp,5*s,sh,dir),h=anPt(e,5*s,sh+el,dir);anLine(c,sp,e,2.2*s,col);anLine(c,e,h,2*s,col);return h};
const L=o.legs||[.15,.1,-.15,.1],A=o.arms||[-.2,.3,.25,.3];
const fB=leg(L[2],L[3],bodyD);const hB=arm(A[2],A[3],sil||'#c9a27c');
anLine(c,pel,neck,4*s,body);const fF=leg(L[0],L[1],body);
if(!o.noHead){circ(c,head[0],head[1],3.6*s,skin);if(!sil){c.fillStyle=hair;c.beginPath();c.arc(head[0]-dir*.6*s,head[1]-.6*s,3.7*s,Math.PI*(dir>0?.75:-.75)-Math.PI*.25,Math.PI*(dir>0?.75:-.75)+Math.PI*1.05);c.fill();if(!o.blink)R(c,head[0]+dir*1.6*s-.5*s,head[1]-.6*s,Math.max(1,s),Math.max(1,1.2*s),P.ink);else R(c,head[0]+dir*1.6*s-.8*s,head[1],Math.max(1,1.4*s),Math.max(1,.5*s),P.ink)}}
const hF=arm(A[0],A[1],sil||P.skin);return {pel,neck,head,hF,hB,fF,fB}}
const anWalk=(ph,amp=1)=>{const a=Math.sin(ph*TAU)*.5*amp,b=Math.sin(ph*TAU+Math.PI)*.5*amp;return {legs:[a,.15+Math.max(0,-Math.cos(ph*TAU))*.6*amp,b,.15+Math.max(0,Math.cos(ph*TAU))*.6*amp],arms:[b*.8,.35,a*.8,.35],bob:Math.abs(Math.cos(ph*TAU))*1.2*amp}};
const anIK=(h,t,a,b,dir)=>{const dx=t[0]-h[0],dy=t[1]-h[1];let d=Math.hypot(dx,dy);d=clamp(d,Math.abs(a-b)+.01,a+b-.01);const base=Math.atan2(dy,dx),k=Math.acos(clamp((a*a+d*d-b*b)/(2*a*d),-1,1));const ang=base-k*dir;return [h[0]+Math.cos(ang)*a,h[1]+Math.sin(ang)*a]};

/* ANI-01 Smear frame */
const anSw=[-40,-60,60,110,130,125];
DEMOS['ANI-01']={d:2.4,f:(c,t)=>{anBG(c);let fi=t<.2?0:t<.62?Math.min(5,1+Math.floor(seg(t,.2,.62)*5)):t<.85?5:0;
[[60,0,'NO SMEAR'],[180,1,'SMEAR ON F3']].forEach(([x,on,lab])=>{const s=1.6,py=100-12*s;const a=anSw[fi]*D2R;const r=anFig(c,x-8,py,{s,dir:1,col:on?P.purple:P.blue,colD:on?'#5e3590':'#2f4f8a',lean:fi>=2?.15:fi===1?-.15:0,arms:[(180-anSw[fi])*D2R,0,.3,.3]});
const hx=r.hF[0],hy=r.hF[1],sh=[lerp(r.neck[0],r.pel[0],.15),lerp(r.neck[1],r.pel[1],.15)];
if(on&&fi===2){const a0=(anSw[1]-90)*D2R,a1=(anSw[3]-90)*D2R,n=14;for(let i=0;i<n;i++){const k0=i/n,k1=(i+1)/n;c.fillStyle='rgba(230,240,255,'+(.15+.85*k1*k1)+')';c.beginPath();c.arc(sh[0],sh[1],32,a0+(a1-a0)*k0,a0+(a1-a0)*k1+.02);c.arc(sh[0],sh[1],10,a0+(a1-a0)*k1+.02,a0+(a1-a0)*k0,true);c.fill()}
c.strokeStyle='#ffffff';c.lineWidth=2;c.beginPath();c.arc(sh[0],sh[1],31,a1-.25,a1);c.stroke()}else{const ex=hx+Math.cos(a-Math.PI/2)*16,ey=hy+Math.sin(a-Math.PI/2)*16;anLine(c,[hx,hy],[ex,ey],2,'#dfe8f5');anLine(c,[hx,hy],[hx+Math.cos(a-Math.PI/2)*3,hy+Math.sin(a-Math.PI/2)*3],3,P.woodD)}
shadow(c,x-6,101,10,.3);anTag(c,lab,x,14,on?P.gold:'#e9edf2')});
for(let i=0;i<6;i++){const bx=34+i*24;R(c,bx,110,21,12,i===fi?P.gold:'#3a4558');txt(c,'F'+(i+1),bx+10,116,i===fi?P.ink:'#c8d0dc',7)}txt(c,'F3=smear',208,116,P.gold,6);txt(c,'x3 slow',16,116,'#9aa6b8',6);tl(c,t,[.2,.62,.85])}};

/* ANI-02 Animating on twos */
DEMOS['ANI-02']={d:4,f:(c,t,_w,_h,p)=>{R(c,0,0,W,H,'#222b3a');const sec=t*4;[[24,'ON ONES (24)'],[12,'ON TWOS (12)'],[8,'ON THREES (8)']].forEach(([fps,lab],i)=>{const gy=40+i*40;R(c,0,gy,W,1,'rgba(255,255,255,.18)');const q=Math.floor(sec*fps)/fps,ph=(q*1.25)%1,w=anWalk(ph);const x=-10+((t*260)%260);anFig(c,x,gy-12-w.bob,{dir:1,legs:w.legs,arms:w.arms,col:[P.blue,P.purple,P.orange][i],colD:['#2f4f8a','#5e3590','#a3561f'][i]});
for(let k=0;k<fps/2;k++){const tk=Math.floor(sec*fps-k)/fps;if(tk<0)break}txt(c,lab,4,gy-30,'#e9edf2',7,'left');const nf=Math.floor(sec*fps)%2;R(c,W-12,gy-33,6,6,nf?P.gold:'#56627a')});txt(c,'root motion stays smooth; only poses step',W/2,H-10,'#9aa6b8',6);tl(c,t,[])}};

/* ANI-03 Hold frame / Impact frame */
DEMOS['ANI-03']={d:3,f:(c,t)=>{const hit=.36,e=t-hit,imp=e>=0&&e<.08,inv=e>=.04&&e<.08,hold=e>=0&&e<.16;
const bgc=imp?(inv?'#ffffff':'#000000'):null;if(bgc)R(c,0,0,W,H,bgc);else anBG(c);const sil=imp?(inv?'#000000':'#ffffff'):null;
let punch=t<.28?-.6*ease(t/.28):t<hit?lerp(-.6,1.5,eo((t-.28)/(hit-.28))):hold?1.5:t<.7?lerp(1.5,-.2,ease((t-hit-.16)/(.7-hit-.16))):-.2;
const ax=t<.28?92:t<hit?lerp(92,104,eo((t-.28)/(hit-.28))):t<.7?lerp(104,92,ease(seg(t,hit+.16,.7))):92;
let vl=0,vx=148;if(e>=.08){const k=e-.08;vl=-Math.exp(-k*9)*Math.sin(Math.min(1,k*14)*Math.PI*.5)*.7;vx=148+eo(k/.2)*6*(1-seg(k,.4,.6))}
if(imp){c.strokeStyle=inv?'#000':'#fff';for(let i=0;i<16;i++){const a=i/16*TAU+hash(i)*.2,r0=14+hash(i+3)*10;c.lineWidth=1+hash(i+9)*2;c.beginPath();c.moveTo(136+Math.cos(a)*r0,60+Math.sin(a)*r0);c.lineTo(136+Math.cos(a)*170,60+Math.sin(a)*170);c.stroke()}}
const s=1.7;if(!imp){shadow(c,ax,101,10,.3);shadow(c,vx,101,10,.3)}
anFig(c,ax,100-12*s,{s,dir:1,sil,lean:punch>1?.2:-.05,arms:[punch,punch>1?0:.9,-.4,.6],legs:[.35,.05,-.35,.1]});
anFig(c,vx,100-12*s,{s,dir:-1,sil,col:P.red,colD:'#8a2a22',lean:vl,head:vl*.6,arms:[.2-vl,.4,-.2-vl,.4]});
if(e>=.08&&e<.4)burst(c,136,62,(e-.08)*3,12,5,{speed:55,life:.6,col:(l,i)=>i%2?P.gold:'#fff',size:l=>l<.4?3:2});
if(!imp)anTag(c,hold?'HOLD 3f':t<hit?'WIND-UP':'RECOVER',ax,16,hold?P.gold:'#e9edf2');else anTag(c,inv?'IMPACT 2 (invert)':'IMPACT 1',W/2,16,inv?'#fff':P.ink,inv?'#000':'#fff');tl(c,t,[hit,hit+.04,hit+.08,hit+.16])}};

/* ANI-04 Idle animation */
DEMOS['ANI-04']={d:6,f:(c,t)=>{anBG(c);const s=2.2;const fid=seg(t,.45,.6),fk=Math.sin(fid*Math.PI);
[[65,0,'NO IDLE'],[175,1,'IDLE LOOP']].forEach(([x,on,lab])=>{const br=on?Math.round((Math.sin(t*TAU*4)*.5+.5)*1)*1:0;const blink=on&&((t>.25&&t<.27)||(t>.78&&t<.8));const py=100-12*s+br*0;shadow(c,x,101,12,.3);
const arms=on&&fk>0?[lerp(-.1,2.9,fk),lerp(.3,.1,fk),lerp(.2,3.05,fk),.1]:[-.1,.3,.2,.3];const r=anFig(c,x,py,{s,dir:1,col:on?P.purple:P.stoneD,colD:on?'#5e3590':'#4a4f58',lean:on?-.06*fk:0,head:on?(-.15*fk+Math.sin(t*TAU*2)*.04):0,arms,legs:[.12,0,-.12,0],blink});
if(on){const nk=r.neck;R(c,nk[0]-5,nk[1]+2-br,10,1,'rgba(255,255,255,.0)');const hx=r.head[0]-s*3.4,hy=r.head[1]-s;const sw=Math.sin(t*TAU*2)*1.5;anLine(c,[hx,hy],[hx-3+sw*.3,hy+6],2,'#3a2a20');anLine(c,[hx-3+sw*.3,hy+6],[hx-4+sw,hy+11],1.6,'#3a2a20');
c.save();c.translate(0,-br);c.restore();}
anTag(c,lab,x,14,on?P.gold:'#e9edf2')});
txt(c,'breath 1.5s · blink · fidget after 8s idle',W/2,112,'#9aa6b8',6);if(fk>0)anTag(c,'FIDGET',175,124,P.gold);tl(c,t,[.25,.45,.6,.78])}};

/* ANI-05 Hit reaction */
const anFlinch=(t,h)=>{const e=t-h;if(e<0)return 0;const ein=.03,eout=.22;return e<ein?eo(e/ein):e<ein+eout?1-ease((e-ein)/eout):0};
DEMOS['ANI-05']={d:4,f:(c,t)=>{anBG(c);const s=2,x=120;const f1=anFlinch(t,.2),f2=anFlinch(t,.62);const lean=-.55*f1+.5*f2;const w=anWalk((t*6)%1,.7);
shadow(c,x,101,12,.3);anFig(c,x,100-12*s-w.bob,{s,dir:1,col:P.red,colD:'#8a2a22',lean,head:lean*.5,legs:w.legs,arms:[w.arms[0]+lean*-1.2,.4+Math.abs(lean),w.arms[2]+lean*-1.2,.4]});
const pr=(h,from)=>{const e=t-h;if(e>-.12&&e<0){const k=1+e/.12,px=from>0?lerp(W+5,132,k):lerp(-5,108,k);circ(c,px,72,3,P.cyan);R(c,px+(from>0?3:-9),71,6,2,'rgba(127,227,216,.5)')}if(e>=0&&e<.12)burst(c,from>0?130:110,72,e*2,8,h*99,{speed:40,life:.5,col:'#fff'})};pr(.2,1);pr(.62,-1);
if(t>.18&&t<.5){anTag(c,'FRONT HIT → recoil back',x,16,P.gold)}else if(t>.6&&t<.92)anTag(c,'BACK HIT → pitch forward',x,16,P.gold);else anTag(c,'walking',x,16);txt(c,'upper body only · legs keep walking',W/2,114,'#9aa6b8',6);
R(c,6,120,40,4,'#3a4558');R(c,6,120,40*Math.max(f1,f2),4,P.gold);txt(c,'weight',26,128,'#9aa6b8',6);tl(c,t,[.2,.62])}};

/* ANI-06 Death animation */
DEMOS['ANI-06']={d:4,f:(c,t)=>{anBG(c);const s=1.8,fx=140,gy=100;const hit=.15;let rot=0,lift=0,alpha=1,st='ALIVE';
if(t>=hit){const e=t-hit;if(e<.05){rot=-.25*eo(e/.05)*-1;st='LEAN BACK'}else if(e<.16){rot=lerp(.25,Math.PI/2,ei((e-.05)/.11));st='FALL'}else{rot=Math.PI/2;const b=e-.16;lift=b<.06?Math.sin(b/.06*Math.PI)*3:0;st=b<.3?'HOLD ON GROUND':'BLINK OUT';if(e>.46){alpha=Math.floor((e-.46)/.018)%2?.15:1}if(e>.6){alpha=0;st='REMOVED'}}}
if(t>.9){alpha=seg(t,.9,.98);rot=0;lift=0;st='RESPAWN'}
shadow(c,rot>1?fx+12:fx,101,rot>1?16:10,.3*alpha);c.save();c.globalAlpha=alpha;c.translate(fx,gy-lift);c.rotate(rot);anFig(c,0,-12*s,{s,dir:-1,col:P.red,colD:'#8a2a22',lean:rot>.3?-.2:0,legs:rot>.3&&rot<1.5?[.4,.6,-.1,.3]:[.1,.05,-.1,.05],arms:rot>.3?[-1.6,.2,-1.3,.2]:[.1,.3,-.1,.3]});c.restore();
const hx=t<hit?lerp(96,108,eo(seg(t,.05,hit))):lerp(108,96,ease(seg(t,hit,.35)));anFig(c,hx,gy-12*1.6,{s:1.6,dir:1,arms:[t>.1&&t<.22?1.5:-.2,.1,.2,.3],legs:[.3,.05,-.3,.1]});if(t>hit&&t<hit+.1)burst(c,128,74,(t-hit)*3,10,4,{speed:45,life:.5,col:P.gold});
anTag(c,st,W/2,16,st==='ALIVE'?'#e9edf2':P.gold);tl(c,t,[hit,hit+.05,hit+.16,hit+.46,hit+.6])}};

/* ANI-07 4-way / 8-way directional sprites (top-down) */
const anDirN=['E','SE','S','SW','W','NW','N','NE'];
function anTop(c,x,y,d,s=1.6){const a=d*Math.PI/4,fx=Math.cos(a),fy=Math.sin(a),px=-fy,py=fx;shadow(c,x,y+1,7*s/1.6,.35);
const pack=()=>R(c,x-fx*4*s-3*s,y-9*s-fy*2*s,6*s,6*s,P.woodD);if(fy<-.1)0;else pack();
for(const sd of[-1,1])R(c,x+px*sd*2.5*s-1.5*s+fx*sd*0,y-3*s+py*sd*1.2*s,3*s,3*s,'#2f3a52');
c.fillStyle=P.blue;c.beginPath();c.ellipse(x,y-7*s,5*s*(.75+.25*Math.abs(fy)),4*s,0,0,TAU);c.fill();if(fy<-.1)pack();
const hx=x,hy=y-13*s;circ(c,hx,hy,4.6*s,'#3a2a20');if(fy>-.75){c.save();c.beginPath();c.arc(hx,hy,4.6*s,0,TAU);c.clip();circ(c,hx+fx*2.2*s,hy+fy*1.6*s+1.2*s,3.6*s,P.skin);c.restore();
if(fy>-.2){for(const sd of[-1,1]){const ex=hx+fx*2.6*s+px*sd*1.6*s*Math.max(.2,fy),ey=hy+fy*1.2*s+.8*s;if(Math.abs(fy)<.3&&sd===(fx>0?-1:1))continue;R(c,ex-.5*s,ey-.6*s,1*s,1.4*s,P.ink)}}}
const sx=x+px*5*s+fx*1*s,sy=y-6*s+py*2*s;anLine(c,[sx,sy],[sx+fx*7*s,sy+fy*7*s-2*s],1.6*s,'#dfe8f5')}
DEMOS['ANI-07']={d:8,f:(c,t)=>{R(c,0,0,W,H,'#2b3a2e');for(let i=0;i<40;i++)R(c,hash(i)*W,hash(i+40)*H,2,1,'#34473a');const ang=t*TAU,d8=((Math.round(ang/(Math.PI/4))%8)+8)%8,d4=(((Math.round(ang/(Math.PI/2))%4)+4)%4)*2;
[[60,d4,'4-WAY',[0,2,6]],[180,d8,'8-WAY',[0,1,2,6,7]]].forEach(([x,d,lab,uniq])=>{const cy=78;ring(c,x,cy-6,30,1,'rgba(255,255,255,.15)');const jx=x+Math.cos(ang)*30,jy=cy-6+Math.sin(ang)*30;circ(c,jx,jy,2,P.cyan);anLine(c,[x,cy-6],[jx,jy],1,'rgba(127,227,216,.4)');
const mir=!uniq.includes(d);if(mir){c.save();c.translate(x,0);c.scale(-1,1);anTop(c,0,cy,(12-d)%8);c.restore()}else anTop(c,x,cy,d);anTag(c,lab,x,12,P.gold);anTag(c,anDirN[d]+(mir?' (mirror)':' (drawn)'),x,112,mir?P.cyan:'#e9edf2')});
txt(c,'input',120,40,P.cyan,6);tl(c,t,[])}};

/* ANI-08 Procedural animation: 4-legged walker */
const anL=480,anS=40;const anG=x=>100+6*Math.sin(x/anL*TAU*3)+3*Math.sin(x/anL*TAU*7+1);
DEMOS['ANI-08']={d:6,f:(c,t)=>{const bx=t*anL,cam=bx-120;R(c,0,0,W,H,'#283244');c.fillStyle='#3b3550';c.beginPath();c.moveTo(0,H);for(let x=0;x<=W;x+=4)c.lineTo(x,anG(x+cam));c.lineTo(W,H);c.fill();c.strokeStyle='#6a5f8c';c.lineWidth=1;c.beginPath();for(let x=0;x<=W;x+=4)c.lineTo(x,anG(x+cam));c.stroke();
const legs=[[14,0],[-14,.5],[6,.5],[-6,0]];const feet=legs.map(([off,ph])=>{const u=(bx+ph*anS)/anS,k=Math.floor(u),f=u-k;const plant=n=>n*anS-ph*anS+off+anS*.6;let fxw,fyw,lift=0;if(f<.75){fxw=plant(k);fyw=anG(fxw)}else{const m=(f-.75)/.25,a=plant(k),b=plant(k+1);fxw=lerp(a,b,ease(m));lift=Math.sin(m*Math.PI)*5;fyw=anG(fxw)-lift}return [fxw-cam,fyw,lift>0]});
const avg=feet.reduce((a,f)=>a+f[1],0)/4,by=avg-16+Math.sin(t*TAU*12)*1;const body=[120,by];
legs.forEach(([off],i)=>{const hip=[120+off*.35,by+2],ft=feet[i],kn=anIK(hip,[ft[0],ft[1]],13,13,off>0?1:-1);const col=i>=2?'#9a7fd0':'#c4b0f0';anLine(c,hip,kn,2,col);anLine(c,kn,ft,1.6,col);if(ft[2])circ(c,ft[0],ft[1],1.5,P.gold);else R(c,ft[0]-1,ft[1]-1,2,2,'#fff')});
c.fillStyle='#7c62b8';c.beginPath();c.ellipse(body[0],body[1],12,6,0,0,TAU);c.fill();circ(c,body[0]+11,body[1]-1,4,'#7c62b8');R(c,body[0]+12,body[1]-3,2,2,P.gold);R(c,body[0]+14,body[1]-2,1,1,P.gold);
anTag(c,'feet find the ground (no keyframes)',W/2,12);R(c,6,120,4,4,P.gold);txt(c,'stepping',13,122,'#c8d0dc',6,'left');R(c,60,121,2,2,'#fff');txt(c,'planted',65,122,'#c8d0dc',6,'left');tl(c,t,[])}};

/* ANI-09 Ragdoll (verlet, precomputed deterministically) */
const anStair=x=>x<70?62:Math.min(126,62+Math.floor((x-70)/22+1)*8);
const anBones=[[0,1],[1,2],[0,2],[1,3],[3,4],[1,5],[5,6],[2,7],[7,8],[2,9],[9,10],[3,5],[7,9]];
const anRag={};
function anSim(v){if(anRag[v])return anRag[v];const fx=48,fy=62;const P0=[[0,-27],[0,-22],[0,-12],[3,-17],[5,-12],[-3,-17],[-4,-12],[2,-6],[2,0],[-2,-6],[-2,0]].map(([x,y])=>[fx+x,fy+y]);
const pts=P0.map(p=>({x:p[0],y:p[1],ox:p[0],oy:p[1]}));const L=anBones.map(([a,b])=>Math.hypot(P0[a][0]-P0[b][0],P0[a][1]-P0[b][1]));
const dt=1/60,g=170,imp=v?[95,-70,0.55]:[60,-40,1.0];pts.forEach((p,i)=>{const up=i<=6?1:imp[2]*.4;p.ox=p.x-imp[0]*up*dt;p.oy=p.y-imp[1]*up*dt});const frames=[];
for(let f=0;f<240;f++){for(const p of pts){const vx=(p.x-p.ox)*.995,vy=(p.y-p.oy)*.995;p.ox=p.x;p.oy=p.y;p.x+=vx;p.y+=vy+g*dt*dt}
for(let it=0;it<8;it++){anBones.forEach(([a,b],k)=>{const A=pts[a],B=pts[b],dx=B.x-A.x,dy=B.y-A.y,d=Math.hypot(dx,dy)||1e-6,df=(d-L[k])/d*.5;if(k>=11&&d>L[k])return;A.x+=dx*df;A.y+=dy*df;B.x-=dx*df;B.y-=dy*df});
for(const p of pts){const gy=anStair(p.x);if(p.y>gy){p.y=gy;p.ox=lerp(p.ox,p.x,.35)}if(p.x<2)p.x=2;if(p.x>W-2)p.x=W-2}}frames.push(pts.map(p=>[p.x,p.y]))}return anRag[v]=frames}
DEMOS['ANI-09']={d:7,f:(c,t)=>{R(c,0,0,W,H,'#232c3c');c.fillStyle='#4a5068';c.beginPath();c.moveTo(0,H);c.lineTo(0,62);for(let x=0;x<W;x++){c.lineTo(x,anStair(x));c.lineTo(x+1,anStair(x))}c.lineTo(W,H);c.fill();R(c,0,62,70,1,'#6a7090');
const v=t<.5?0:1,lt=(t%.5)/.5,hit=.12;const k=TMP(),q=k.getContext('2d');if(lt<hit){anFig(c,48,50,{dir:1,col:P.red,colD:'#8a2a22',legs:[.05,0,-.05,0]});const ax=lerp(10,40,lt/hit);circ(c,ax,40,3,P.cyan)}else{const fr=anSim(v),i=Math.min(fr.length-1,Math.floor((lt-hit)*3.5*60)),p=fr[i];const al=lt>.9?1-seg(lt,.9,1):1;c.globalAlpha=al;
const col=(a,b,w,cc)=>anLine(c,p[a],p[b],w,cc);col(2,9,2.4,'#8a2a22');col(9,10,2.2,'#8a2a22');col(1,5,2,'#c9a27c');col(5,6,1.8,'#c9a27c');col(1,2,4,P.red);col(2,7,2.4,P.red);col(7,8,2.2,P.red);col(1,3,2,P.skin);col(3,4,1.8,P.skin);circ(c,p[0][0],p[0][1],3.6,P.skin);
for(const q of p)R(c,q[0]-.5,q[1]-.5,1,1,'rgba(255,255,255,.7)');c.globalAlpha=1;if(lt<hit+.06)burst(c,50,40,(lt-hit)*3,8,v*7+1,{speed:40,life:.5,col:P.gold})}
anTag(c,v?'HIT #2: weaker, lower':'HIT #1: strong, high',W/2,12,P.gold);txt(c,'same rig · physics decides the fall',W/2,24,'#9aa6b8',6);tl(c,t,[.06,.5,.56])}};

/* ANI-10 Spring bones (precomputed periodic sim) */
const anPX=t=>{const k=t%1;return k<.25?lerp(40,190,ease(k/.25)*.0+seg(k,0,.25)):k<.5?190:k<.75?lerp(190,40,seg(k,.5,.75)):40};
let anSpr=null;
function anSpring(){if(anSpr)return anSpr;const N=360,ch=[0,1].map(()=>Array.from({length:4},()=>({x:0,y:0,ox:0,oy:0})));let init=false;const out=[];
for(let f=0;f<N*2;f++){const t=(f%N)/N,x=anPX(t),dir=(t<.25||t>=.75&&false)?1:(t>=.5&&t<.75)?-1:t<.5?1:-1;const roots=[[x-dir*3,56],[x-dir*1,66]];
ch.forEach((cn,ci)=>{let par=roots[ci];if(!init)cn.forEach((p,i)=>{p.x=p.ox=par[0]-dir*(i+1)*4;p.y=p.oy=par[1]+(i+1)*2});cn.forEach((p,i)=>{const vx=(p.x-p.ox)*(1-.025),vy=(p.y-p.oy)*(1-.025);p.ox=p.x;p.oy=p.y;p.x+=vx;p.y+=vy+.02;const rx=par[0]-dir*4*.75,ry=par[1]+4*.66;p.x=lerp(p.x,rx,.07);p.y=lerp(p.y,ry,.07);const dx=p.x-par[0],dy=p.y-par[1],d=Math.hypot(dx,dy)||1;p.x=par[0]+dx/d*4;p.y=par[1]+dy/d*4;par=[p.x,p.y]})});init=true;
if(f>=N)out.push(ch.map(cn=>cn.map(p=>[p.x,p.y])))}return anSpr=out}
DEMOS['ANI-10']={d:4,f:(c,t)=>{R(c,0,0,W,H,'#222b3a');const fr=anSpring()[Math.min(359,Math.floor(t*360))];const x=anPX(t),mv=(t<.25)||(t>=.5&&t<.75),dir=t<.5?1:-1;
[[0,'RIGID'],[1,'SPRING BONES']].forEach(([on,lab],li)=>{const oy=li*58,gy=56+oy;R(c,0,gy+1,W,1,'rgba(255,255,255,.18)');const w=anWalk(mv?(t*8)%1:0,mv?1:0);
const r=anFig(c,x,gy-12-w.bob,{dir,legs:w.legs,arms:w.arms,col:on?P.purple:P.stoneD,colD:on?'#5e3590':'#4a4f58',lean:mv?.12:0});
const hroot=[r.head[0]-dir*3,r.head[1]-1],croot=[r.neck[0]-dir*1,r.neck[1]+1];
const draw=(root,pts,col,w0)=>{let pr=root;pts.forEach((p,i)=>{anLine(c,pr,p,Math.max(1,w0-i*.4),col);pr=p})};
if(on){const off=(pt,base,root)=>[pt[0]-base[0]+root[0],pt[1]-base[1]+root[1]];const bh=[x-dir*3,56],bc=[x-dir*1,66];draw(croot,fr[1].map(p=>off(p,bc,croot)),'#c04a6a',2.6);draw(hroot,fr[0].map(p=>off(p,bh,hroot)),'#3a2a20',2.2)}
else{draw(croot,[1,2,3,4].map(i=>[croot[0]-dir*i*3,croot[1]+i*3]),'#c04a6a',2.6);draw(hroot,[1,2,3,4].map(i=>[hroot[0]-dir*i*3,hroot[1]+i*2.6]),'#3a2a20',2.2)}
txt(c,lab,4,8+oy,on?P.gold:'#e9edf2',7,'left')});txt(c,mv?'running':'sudden stop',W-4,8,'#9aa6b8',6,'right');tl(c,t,[.25,.5,.75])}};

/* ANI-11 Look-at / head tracking */
const anLookDes=t=>{const a=t*TAU,tx=118+Math.cos(a)*84,ty=42+Math.sin(a)*30;const hx=108,hy=37.7;const ang=Math.atan2(ty-hy,tx-hx);return {tx,ty,ang,ok:Math.abs(ang)<70*D2R}};
DEMOS['ANI-11']={d:6,f:(c,t)=>{anBG(c,'#26303f','#1d2532',104);const hx=108,hy=37.7;let sm=0;for(let i=0;i<12;i++){const q=anLookDes(((t-i*.004)%1+1)%1);sm+=(q.ok?clamp(q.ang,-70*D2R,70*D2R):0)}sm/=12;const cur=anLookDes(t);
c.fillStyle='rgba(127,227,216,.10)';c.beginPath();c.moveTo(hx,hy);c.arc(hx,hy,90,-70*D2R,70*D2R);c.fill();c.strokeStyle='rgba(127,227,216,.35)';c.lineWidth=1;c.beginPath();c.moveTo(hx+Math.cos(-70*D2R)*90,hy+Math.sin(-70*D2R)*90);c.lineTo(hx,hy);c.lineTo(hx+Math.cos(70*D2R)*90,hy+Math.sin(70*D2R)*90);c.stroke();
const s=2.6;anFig(c,108,104-12*s,{s,dir:1,noHead:1,col:P.orange,colD:'#a3561f',head:0,arms:[.1,.3,-.1,.3]});
/* overdraw head turned by sm */
circ(c,hx,hy,3.9*s,P.skin);c.fillStyle='#3a2a20';c.beginPath();c.arc(hx,hy,4*s,sm+Math.PI*.55,sm+Math.PI*1.45+.6);c.fill();const ex=hx+Math.cos(sm-.18)*2.6*s,ey=hy+Math.sin(sm-.18)*2.6*s;R(c,ex-1,ey-1.5,2,3,P.ink);const nx=hx+Math.cos(sm+.12)*4.2*s,ny=hy+Math.sin(sm+.12)*4.2*s;circ(c,nx,ny,1.3,P.skin);
if(cur.ok){c.setLineDash([3,3]);anLine(c,[ex,ey],[cur.tx,cur.ty],1,'rgba(242,201,76,.7)');c.setLineDash([])}
circ(c,cur.tx,cur.ty,4,cur.ok?P.gold:'#7a8396');ring(c,cur.tx,cur.ty,6,1,cur.ok?'rgba(242,201,76,.6)':'rgba(150,160,180,.4)');
anTag(c,cur.ok?'TRACKING (head only)':'OUT OF ±70° → return to neutral',W/2,12,cur.ok?P.gold:'#e9edf2');txt(c,'body stays',108,112,'#9aa6b8',6);tl(c,t,[])}};

/* ANI-12 Foot IK / foot placement */
DEMOS['ANI-12']={d:5,f:(c,t)=>{R(c,0,0,W,H,'#232c3c');const h=Math.round(9*Math.sin(t*TAU)+3);
[[60,0,'IK OFF'],[180,1,'FOOT IK ON']].forEach(([x,on,lab])=>{const gy=108,lfX=x-7,rfX=x+7;R(c,x-50,gy,100,H-gy,'#3b4258');const bt=gy-h;R(c,rfX-7,Math.min(bt,gy),14,Math.abs(h)+(h<0?0:0)||1,h>=0?'#5d6688':'#141a24');if(h<0){R(c,rfX-7,gy,14,-h,'#141a24')}R(c,rfX-7,bt,14,1,'#8a93b8');
const s=1.8,legL=12*s,a=6*s;let pelY=gy-legL;const tgtL=[lfX,gy],tgtR=[rfX,bt];if(on){const drop=Math.max(0,bt-gy);pelY+=drop}
const pel=[x,pelY];const neck=[x,pelY-9*s],head=[x,pelY-13.5*s];
const leg=(hip,tg,col)=>{let ft;if(on){ft=tg}else{ft=[tg[0],gy]}const kn=anIK(hip,ft,a,a,-1);anLine(c,hip,kn,2.6*s,col);anLine(c,kn,ft,2.4*s,col);anLine(c,ft,[ft[0]+2*s,ft[1]],2*s,col);return ft};
const hipL=[x-2,pelY],hipR=[x+2,pelY];leg(hipL,tgtL,'#2f4f8a');const fR=leg(hipR,tgtR,P.blue);anLine(c,pel,neck,4*s,P.blue);circ(c,head[0],head[1],3.6*s,P.skin);R(c,head[0]+2,head[1]-1,2,2,P.ink);anLine(c,[x,neck[1]+3],[x+3,pelY-2],2*s,P.skin);
if(on){c.setLineDash([2,2]);anLine(c,[lfX,pelY-6],[lfX,gy],1,'rgba(127,227,216,.8)');anLine(c,[rfX,pelY-6],[rfX,bt],1,'rgba(127,227,216,.8)');c.setLineDash([]);circ(c,rfX,bt,1.5,P.cyan);circ(c,lfX,gy,1.5,P.cyan)}
else{if(h>0)anTag(c,'CLIPS INTO BLOCK',x,40,'#ff8a7a');else if(h<0)anTag(c,'FOOT FLOATS',x,40,'#ff8a7a')}
anTag(c,lab,x,12,on?P.gold:'#e9edf2')});txt(c,'step height '+(h>0?'+':'')+h+' px',W/2,128,'#9aa6b8',6);tl(c,t,[])}};

/* ANI-13 Morph targets / blend shapes */
const anMB=[[-14,0],[-7,-2],[0,-2.5],[7,-2],[14,0],[7,2],[0,2.5],[-7,2]];
const anMD={open:[[1,0],[0,-1],[0,-1.5],[0,-1],[-1,0],[0,7],[0,9],[0,7]],smile:[[-2,-6],[0,-2],[0,0],[0,-2],[2,-6],[0,-1],[0,1],[0,-1]],frown:[[1,5],[0,1],[0,0],[0,1],[-1,5],[0,1],[0,0],[0,1]]};
DEMOS['ANI-13']={d:6,hi:true,f:(c,t)=>{c.scale(2,2);R(c,0,0,W,H,'#20283a');const seg80=Math.floor(t*6/.08);const talk=t>.06&&t<.42?.15+.65*Math.abs(Math.sin(seg80*1.7+hash(seg80)*2)):0;
const sm=ease(seg(t,.45,.55))*(1-ease(seg(t,.68,.74))),fr=ease(seg(t,.74,.8))*(1-ease(seg(t,.9,.96)));const bl=b=>Math.max(0,1-Math.abs(t-b)/.012);const blink=Math.max(bl(.3),bl(.62),bl(.86)),wink=Math.max(0,1-Math.abs(t-.52)/.02);
const w={open:talk,smile:sm,frown:fr};const cx=72,cy=66;circ(c,cx,cy,40,'#f0c69a');c.fillStyle='#3a2a20';c.beginPath();c.arc(cx,cy-4,41,Math.PI*1.05,Math.PI*1.95);c.fill();
const eye=(ex,cl)=>{c.fillStyle='#fff';c.beginPath();c.ellipse(ex,cy-6,6,Math.max(.4,5*(1-cl)),0,0,TAU);c.fill();if(cl<.8){circ(c,ex+1,cy-6,2.4*(1-cl*.6),P.ink)}anLine(c,[ex-6,cy-6-5*(1-cl)],[ex+6,cy-6-5*(1-cl)],1.2,'#6b4a35')};eye(cx-15,blink);eye(cx+15,Math.max(blink,wink));
const brow=(bx,sd)=>{const dy=-14-sm*2+fr*3,tilt=fr*4*sd;anLine(c,[bx-7,dy+cy+tilt],[bx+7,dy+cy-tilt],2.5,'#3a2a20')};brow(cx-15,-1);brow(cx+15,1);
const pts=anMB.map((b,i)=>{let x=b[0],y=b[1];for(const k in anMD){x+=w[k]*anMD[k][i][0];y+=w[k]*anMD[k][i][1]}return [cx+x,cy+18+y]});c.fillStyle='#7a2a2a';c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.closePath();c.fill();c.strokeStyle='#4a1a1a';c.lineWidth=1.2;c.stroke();for(const p of pts)circ(c,p[0],p[1],1.1,P.cyan);
circ(c,cx-26,cy+8,5,'rgba(230,110,110,'+(.15+.3*sm)+')');circ(c,cx+26,cy+8,5,'rgba(230,110,110,'+(.15+.3*sm)+')');
const rows=[['mouth_open',talk],['smile',sm],['frown',fr],['blink_L',blink],['blink_R',Math.max(blink,wink)]];rows.forEach(([n,v],i)=>{const y=26+i*16;txt(c,n,140,y,'#c8d0dc',7,'left');R(c,140,y+5,80,4,'#3a4558');R(c,140,y+5,80*v,4,P.gold);txt(c,v.toFixed(2),224,y+7,'#e9edf2',6,'left')});
txt(c,'v = base + Σ wᵢ·Δᵢ',180,112,P.cyan,7);txt(c,'cyan dots = morphed vertices',180,122,'#9aa6b8',6);tl(c,t,[.06,.42,.52,.74])}};

/* ANI-14 Sync groups: walk->run blend, unsynced (independent clip clocks) vs leader/follower phase sync */
const an14W=1.0,an14R=.62;
const an14w=t=>t<.15?0:t<.4?ease((t-.15)/.25):t<.6?1:t<.85?1-ease((t-.6)/.25):0;
const an14ph=t=>{/* integrate synced phase rate = lerp(1/walk,1/run,w) over demo time (8 s); pure function of t */const n=160,dt=t/n;let p=0;for(let i=0;i<n;i++)p+=lerp(1/an14W,1/an14R,an14w((i+.5)*dt))*dt*8;return p};
const an14mix=(a,b,w)=>({legs:a.legs.map((v,i)=>lerp(v,b.legs[i],w)),arms:a.arms.map((v,i)=>lerp(v,b.arms[i],w)),bob:lerp(a.bob,b.bob,w)});
DEMOS['ANI-14']={d:8,f:(c,t)=>{anBG(c,'#2a3446','#1f2836',92);const w=an14w(t),T=t*8;
const pw=T/an14W,pr=T/an14R+.43,ps=an14ph(t);
[[60,0,'NO SYNC'],[180,1,'SYNC GROUP']].forEach(([x,on,lab])=>{const a=on?anWalk(ps,1):anWalk(pw,1),b=on?anWalk(ps,1.7):anWalk(pr,1.7);const m=an14mix(a,b,w);const s=1.5,py=92-12*s-m.bob;
const r=anFig(c,x,py,{s,dir:1,col:on?P.cyan:P.blue,colD:on?'#2f8a80':'#2f4f8a',lean:w*.25,legs:m.legs,arms:m.arms});shadow(c,x+2,93,12,.3);
const sepr=Math.abs(m.legs[0]-m.legs[2]);if(!on&&w>.15&&w<.85&&sepr<.25)txt(c,'legs cross',x,38,'#ffb3a8',6);
anTag(c,lab,x,12,on?P.cyan:'#e9edf2');
/* phase bars: walk clip & run clip with LeftDown (L) / RightDown (R) markers */
const ph=[on?ps:pw,on?ps:pr];['walk','run'].forEach((nm,k)=>{const yy=101+k*11,bx=x-42,bw=86;R(c,bx,yy,bw,7,'#1a2130');R(c,bx+bw*.25-1,yy,2,7,P.gold);R(c,bx+bw*.75-1,yy,2,7,'#e9edf2');const f=((ph[k]%1)+1)%1;R(c,bx+bw*f-1,yy-1,2,9,k?P.red:P.cyan);txt(c,nm,bx-2,yy+4,'#9aa6b8',5,'right');if(on&&k===0)txt(c,w>=.5?'leader: run':'leader: walk',x+40,yy-4,'#bff3ec',5)})});
txt(c,'L = LeftDown   R = RightDown markers',120,128,'#9aa6b8',5);R(c,96,124,2,2,P.gold);
bar(c,104,24,32,3,w,P.gold);txt(c,'run weight',120,31,'#c8d0dc',5);tl(c,t,[.15,.4,.6,.85])}};
/* ---- round 2: ANI-15..18 ---- */
const an15x=u=>1-(1-u)*(1-u);
DEMOS['ANI-15']={d:7,f:(c,t)=>{R(c,0,0,W,H,'#2a3446');
const u=seg(t,.08,.72),x0=24,x1=196,D=x1-x0;
[[52,0,'TIME-BASED STOP'],[112,1,'DISTANCE MATCHED']].forEach(([gy,on,lab])=>{R(c,0,gy,W,H*0+3,'#1f2836');R(c,0,gy,W,1,'rgba(255,255,255,.14)');
for(let i=0;i<12;i++)R(c,8+i*20,gy+1,1,2,'rgba(255,255,255,.18)');
R(c,x1-.5,gy-26,1,26,P.gold);R(c,x1,gy-26,8,5,P.gold);
const x=x0+D*an15x(u);const rem=x1-x;
let ph,amp;if(on){ph=(x-x0)/22;amp=clamp(rem/40+.15,0,1)*(u<1?1:0)}else{const ut=clamp(u/.62);ph=(x0+D*an15x(ut)-x0)/22;amp=clamp(1-ut,0,1)}
const w=anWalk(ph,amp),s=1.4,py=gy-12*s-w.bob*.6;anFig(c,x,py,{s,dir:1,col:on?P.cyan:P.blue,colD:on?'#2f8a80':'#2f4f8a',legs:w.legs,arms:w.arms});shadow(c,x+1,gy+1,10,.3);
anTag(c,lab,52,gy-34,on?P.cyan:'#cfd6e2');
const slide=!on&&u>.62&&u<1;if(slide)anTag(c,'FEET STOPPED · BODY SLIDES',150,gy-34,'#ffb3a8');
if(on){const v=rem/D;bar(c,120,gy-37,60,4,v,P.cyan);txt(c,'dist '+(rem/20).toFixed(1)+' m → anim time',150,gy-28,'#9aa6b8',6)}});
tl(c,t,[.08,.72])}};

DEMOS['ANI-16']={d:8,f:(c,t)=>{R(c,0,0,W,H,'#2a3446');
const T=t*8,sp=1+.4*Math.sin(t*TAU);const off=28*(T+8*.4*(1-Math.cos(t*TAU))/TAU);
const ph=T*1.6;
[[58,0,'PLAYBACK RATE ONLY'],[118,1,'STRIDE WARPING']].forEach(([gy,on,lab])=>{R(c,0,gy,W,4,'#1f2836');R(c,0,gy,W,1,'rgba(255,255,255,.14)');
for(let i=-1;i<14;i++){const gx=((i*20-off)%280+280)%280-20;R(c,gx,gy+1,1,3,'rgba(255,255,255,.25)')}
const amp=on?.55+.45*sp:1;const w=anWalk(ph,amp),s=1.4,x=110,py=gy-12*s-w.bob*.6;
anFig(c,x,py,{s,dir:1,col:on?P.cyan:P.blue,colD:on?'#2f8a80':'#2f4f8a',legs:w.legs,arms:w.arms,lean:(sp-1)*.25});shadow(c,x+1,gy+1,10,.3);
anTag(c,lab,52,gy-40,on?P.cyan:'#cfd6e2');
const mis=Math.abs(sp-1);if(!on&&mis>.2)anTag(c,sp>1?'FEET SKATE (too short)':'FEET SKATE (too long)',170,gy-40,'#ffb3a8');
if(on)txt(c,'stride ×'+amp.toFixed(2),170,gy-40,P.cyan,7)});
txt(c,'ground speed ×'+sp.toFixed(2),120,6,'#e9edf2',7);bar(c,80,11,80,3,(sp-.6)/.8,P.gold);tl(c,t,[])}};

const an17dir=t=>{const k=seg(t,.1,.35)-seg(t,.55,.8);return k*65*D2R};
DEMOS['ANI-17']={d:7,f:(c,t)=>{R(c,0,0,W,H,'#26303f');
const mv=an17dir(t),T=t*7;
[[60,0,'NO WARP'],[180,1,'ORIENTATION WARP']].forEach(([cx,on,lab])=>{const cy=72;
R(c,cx-56,18,112,104,'#2e3a4d');for(let i=0;i<6;i++){R(c,cx-56,18+i*20+((T*14)%20),112,1,'rgba(255,255,255,.07)')}
anTag(c,lab,cx,12,on?P.cyan:'#cfd6e2');
const aim=-Math.PI/2;const hip=on?aim+mv*.75:aim;const fwd=[Math.cos(hip),Math.sin(hip)],side=[-fwd[1],fwd[0]];
const md=aim+mv;const ph=T*1.4*TAU;
for(const k of[-1,1]){const st=Math.sin(ph+(k>0?0:Math.PI));
let fx,fy;if(on){fx=cx+side[0]*5*k+Math.cos(md)*st*9;fy=cy+side[1]*5*k+Math.sin(md)*st*9}else{fx=cx+side[0]*5*k+Math.cos(md)*st*9;fy=cy+side[1]*5*k+Math.sin(md)*st*9}
R(c,fx-2.5,fy-2.5,5,5,on?'#2f8a80':'#2f4f8a')}
c.save();c.translate(cx,cy);c.rotate(hip+Math.PI/2);R(c,-7,-2,14,4,on?'#5fd0c0':'#6f8fd0');c.restore();
c.save();c.translate(cx,cy);c.rotate(aim+Math.PI/2);c.fillStyle=on?P.cyan:P.blue;c.beginPath();c.ellipse(0,0,10,5,0,0,TAU);c.fill();c.restore();circ(c,cx,cy,3.6,P.skin);
anLine(c,[cx,cy-6],[cx,cy-40],1.5,P.gold);c.fillStyle=P.gold;c.beginPath();c.moveTo(cx,cy-44);c.lineTo(cx-3,cy-38);c.lineTo(cx+3,cy-38);c.fill();
anLine(c,[cx,cy],[cx+Math.cos(md)*34,cy+Math.sin(md)*34],1,'rgba(255,255,255,.5)');
if(!on&&Math.abs(mv)>30*D2R)anTag(c,'LEGS CROSS / SIDESTEP POP',cx,112,'#ffb3a8');
if(on)anTag(c,'hips '+Math.round(mv*.75/D2R)+'° · chest keeps aim',cx,112,P.cyan)});
txt(c,'aim ▲ (gold)   move dir (white) '+Math.round(mv/D2R)+'°',120,129,'#9aa6b8',6);tl(c,t,[.1,.35,.55,.8])}};

const an18A=x=>.6*Math.sin(x*TAU*.9),an18B=x=>-.5+.25*Math.sin(x*TAU*1.3+1);
DEMOS['ANI-18']={d:7,f:(c,t)=>{R(c,0,0,W,H,'#232c3a');
const gx=10,gw=150,gy=18,gh=100,ts=.45,mid=gy+gh/2,sc=gh*.42;
R(c,gx,gy,gw,gh,'#1b2330');R(c,gx+gw*ts,gy,1,gh,'rgba(255,214,102,.5)');txt(c,'switch',gx+gw*ts,gy-5,P.gold,6);
const v0=an18A(ts),d0=(an18A(ts+.001)-an18A(ts))/.001,v1=an18B(ts),d1=(an18B(ts+.001)-an18B(ts))/.001;
const cut=x=>x<ts?an18A(x):an18B(x);
const xf=x=>{if(x<ts)return an18A(x);const w=ease(clamp((x-ts)/.3));return lerp(an18A(x),an18B(x),w)};
const ine=x=>{if(x<ts)return an18A(x);const dt=x-ts,T1=.25;if(dt>=T1)return an18B(x);const x0=v0-v1,vv=d0-d1;const k=dt/T1;const off=(x0+vv*dt)*Math.pow(1-k,3)*(1+3*k);return an18B(x)+off};
const lines=[[cut,'#ff8a7a','HARD CUT'],[xf,'#8fb4ff','CROSSFADE 0.3s'],[ine,P.cyan,'INERTIALIZATION']];
const tm=t;
lines.forEach(([f,col],i)=>{c.strokeStyle=col;c.lineWidth=i==2?2:1.2;c.beginPath();let first=true;for(let k=0;k<=gw;k++){const x=k/gw;if(x>tm)break;const y=mid-f(x)*sc;if(i==0&&Math.abs(x-ts)<1/gw){c.lineTo(gx+k,y);continue}first?c.moveTo(gx+k,y):c.lineTo(gx+k,y);first=false}c.stroke()});
c.setLineDash([2,2]);c.strokeStyle='rgba(255,255,255,.25)';c.lineWidth=1;c.beginPath();for(let k=0;k<=gw;k++){const x=k/gw,y=mid-an18B(x)*sc;k?c.lineTo(gx+k,y):c.moveTo(gx+k,y)}c.stroke();c.setLineDash([]);
R(c,gx+gw*tm,gy,1,gh,'rgba(255,255,255,.6)');
lines.forEach(([f,col,lab],i)=>{const y=26+i*36,ax=200;txt(c,lab,ax,y-4,col,6);const a=f(Math.min(tm,1))*1.2;const sh=[ax-6,y+8];circ(c,sh[0],sh[1],3,'#c9d2e0');const e=[sh[0]+Math.cos(a)*14,sh[1]-Math.sin(a)*14];anLine(c,sh,e,2.4,col);circ(c,e[0],e[1],2,col)});
txt(c,'joint angle · dashed = target clip',gx+gw/2,gy+gh+7,'#9aa6b8',6);tl(c,t,[ts])}};

})();
