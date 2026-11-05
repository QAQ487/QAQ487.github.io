/* ===== CAM principle demos (canvas) ===== */
(()=>{
const hdr=(c,s)=>prTag(c,s,4,4);
const stepOf=(fn,u)=>fn(prWrap(u+.002))-fn(u);
/* CAM-01 position-locking: hero pinned to a screen guide while the world slides */
DEMOS['CAM-01']={d:6,f:(c,t)=>{const k=ease(prTri(t)),hx=lerp(40,520,k),dir=prWrap(t)<.5?1:-1;prSide(c,hx,67);
 shadow(c,120,100,6);prWalker(c,120,100,hx/16,{s:2,flip:dir<0,still:k<.002||k>.998});
 prLine(c,120.5,16,120.5,112,'rgba(127,227,216,.9)',1,[3,2]);prTag(c,'LOCK X',124,16,P.cyan);
 R(c,60,121,120,5,'rgba(10,14,24,.75)');R(c,61,123,118,1,'#5e636e');R(c,60+(hx-40)/480*118,120,3,7,P.gold);txt(c,'world x '+Math.round(hx),120,131,'#cfd8e3',6);hdr(c,'Position-lock')}};
/* CAM-02 dead zone */
const p2=u=>prKeys([[0,0],[.08,22],[.16,-20],[.24,0],[.42,130],[.52,100],[.6,80],[.8,-30],[1,0]],u);
const s2=prSeries('c2',()=>({cx:0}),(s,u)=>{const hx=p2(u);if(hx>s.cx+30)s.cx=hx-30;if(hx<s.cx-30)s.cx=hx+30});
DEMOS['CAM-02']={d:6,f:(c,t)=>{const hx=p2(t),cx=prAt(s2,t).cx,mv=stepOf(p2,t);prSide(c,cx+300,67);const sx=120+hx-cx;
 const push=Math.abs(hx-cx)>29.5&&Math.abs(mv)>.01,col=push?P.gold:P.cyan;R(c,90,34,60,70,push?'rgba(242,201,76,.12)':'rgba(127,227,216,.1)');prDash(c,90,34,60,70,col);
 shadow(c,sx,100,6);prWalker(c,sx,100,hx/14,{s:2,flip:mv<0,still:Math.abs(mv)<.01});prTag(c,'DEAD ZONE',90,26,col,'rgba(10,14,24,.75)');
 prTag(c,push?'edge: camera pushed':'inside: camera still',120,112,push?P.gold:'#e9edf2','rgba(10,14,24,.75)',6,'center');hdr(c,'Dead zone')}};
/* CAM-03 soft zone: inner dead area, soft band (damped catch-up), hard limit */
const p3=u=>prKeys([[0,0],[.06,0],[.22,150],[.5,150],[.56,150],[.74,0],[1,0]],u,x=>x);
const s3=prSeries('c3',()=>({cx:0}),(s,u,dt)=>{const hx=p3(u),d=hx-s.cx,ad=Math.abs(d);if(ad>16)s.cx+=Math.sign(d)*(ad-16)*9*dt;const e=hx-s.cx;if(e>64)s.cx=hx-64;if(e<-64)s.cx=hx+64});
DEMOS['CAM-03']={d:6,f:(c,t)=>{const hx=p3(t),cx=prAt(s3,t).cx,mv=stepOf(p3,t);prSide(c,cx+300,67);const off=hx-cx,sx=120+off;
 R(c,56,30,128,78,'rgba(242,201,76,.16)');R(c,104,30,32,78,'rgba(127,227,216,.18)');prDash(c,104,30,32,78,P.cyan);prLine(c,56.5,30,56.5,108,P.red,1);prLine(c,183.5,30,183.5,108,P.red,1);
 shadow(c,sx,100,6);prWalker(c,sx,100,hx/14,{s:2,flip:mv<0,still:Math.abs(mv)<.01});
 const band=Math.abs(off)>16.5;prTag(c,'hard',58,22,P.red);prTag(c,'soft',140,22,P.gold);prTag(c,'dead',105,22,P.cyan);
 prTag(c,band?'soft band: easing in':'inner: no reframe',120,112,band?P.gold:'#e9edf2','rgba(10,14,24,.75)',6,'center');hdr(c,'Soft zone')}};
/* CAM-04 damping: target vs lagging camera, with plot */
const p4=u=>prKeys([[0,0],[.05,0],[.28,140],[.5,140],[.53,140],[.76,0],[1,0]],u,x=>x);
const s4=prSeries('c4',()=>({cx:0,v:0}),(s,u,dt)=>{const k=260,dmp=2*Math.sqrt(k);s.v+=(k*(p4(u)-s.cx)-dmp*s.v)*dt;s.cx+=s.v*dt});
DEMOS['CAM-04']={d:6,f:(c,t)=>{const hx=p4(t),cx=prAt(s4,t).cx,mv=stepOf(p4,t);c.save();c.beginPath();c.rect(0,0,W,106);c.clip();prSide(c,cx+300,72);const sx=120+hx-cx;shadow(c,sx,105,6);prWalker(c,sx,105,hx/14,{s:2,flip:mv<0,still:Math.abs(mv)<.01});
 R(c,sx-1,60,2,6,P.cyan);R(c,sx-3,62,6,2,P.cyan);R(c,119,58,2,10,P.gold);R(c,115,62,10,2,P.gold);c.restore();
 R(c,0,106,W,29,'#141a24');for(let i=0;i<W;i++){const u=i/W;R(c,i,131-p4(u)/140*20,1,1,P.cyan);R(c,i,131-prAt(s4,u).cx/140*20,1,1,P.gold)}R(c,Math.floor(t*W),107,1,28,'#e9edf2');
 txt(c,'target',4,110,P.cyan,6,'left');txt(c,'camera',40,110,P.gold,6,'left');hdr(c,'Camera damping')}};
/* CAM-05 platform snapping: camera Y only realigns after landing */
const SEG5=[['w',20,70,100,.1],['j',70,100,140,80,.09],['w',140,170,80,.08],['j',170,80,250,60,.09],['w',250,295,60,.12],['w',295,250,60,.06],['j',250,60,170,80,.09],['w',170,140,80,.05],['j',140,80,70,100,.09],['w',70,20,100,.13]];
const tot5=SEG5.reduce((a,s)=>a+s[s.length-1],0);
function h5(u){let a=0;for(const s of SEG5){const d=s[s.length-1]/tot5;if(u<=a+d||s===SEG5[SEG5.length-1]){const k=clamp((u-a)/d);if(s[0]==='w')return{x:lerp(s[1],s[2],k),y:s[3],g:s[3],air:0,dir:Math.sign(s[2]-s[1])};const x=lerp(s[1],s[3],k),y=lerp(s[2],s[4],k)-Math.sin(k*Math.PI)*28;return{x,y,g:null,air:1,dir:Math.sign(s[3]-s[1])}}a+=d}}
const s5=prSeries('c5',()=>({gy:100,cy:67,v:0}),(s,u,dt)=>{const h=h5(u);if(!h.air)s.gy=h.g;const k=300,d=2*Math.sqrt(k);s.v+=(k*(s.gy-33-s.cy)-d*s.v)*dt;s.cy+=s.v*dt});
DEMOS['CAM-05']={d:6,f:(c,t)=>{const h=h5(prWrap(t)),st=prAt(s5,t),cx=h.x+40;prSide(c,cx,st.cy,{plats:[[-500,100,600],[120,80,60],[230,60,1000]],props:false});
 const ox=Math.round(W/2-cx),oy=Math.round(H/2-st.cy);const sy=h.y+oy;shadow(c,h.x+ox,(h.air?null:sy)||sy,5,h.air?0:.35);prWalker(c,h.x+ox,sy,h.x/14,{s:2,flip:h.dir<0,still:!!h.air});
 const ry=st.gy+oy;prLine(c,0,ry+.5,W,ry+.5,'rgba(242,201,76,.9)',1,[4,3]);prTag(c,'cam Y ref',W-4,ry-11,P.gold,'rgba(10,14,24,.75)',6,'right');
 const re=Math.abs(st.v)>4;prTag(c,h.air?'airborne: Y held':re?'landed: realign':'grounded',120,122,h.air?'#e9edf2':re?P.gold:P.cyan,'rgba(10,14,24,.75)',6,'center');hdr(c,'Platform snap')}};
/* CAM-07 region-based anchors */
const RG=[[0,300,'FIELD',.75,-10],[300,540,'ROOM',1.6,0],[540,1e9,'POND VIEW',1,-55]];
const rgOf=x=>RG.find(r=>x>=r[0]&&x<r[1]);
const p7=u=>lerp(120,700,ease(prTri(u)));
const s7=prSeries('c7',()=>({z:.75,oy:-10}),(s,u,dt)=>{const r=rgOf(p7(u));s.z+=(r[3]-s.z)*Math.min(1,10*dt);s.oy+=(r[4]-s.oy)*Math.min(1,10*dt)});
DEMOS['CAM-07']={d:7,f:(c,t)=>{const hx=p7(t),st=prAt(s7,t),r=rgOf(hx),dir=prWrap(t)<.5?1:-1;
 prView(c,hx,198+st.oy,st.z,g=>{R(g,300,140,240,110,'#6e6e78');for(let i=0;i<24;i++)for(let j=0;j<11;j++)if((i+j)%2)R(g,300+i*10,140+j*10,10,10,'#787884');R(g,296,136,248,4,P.stoneD);R(g,296,250,248,4,P.stoneD);R(g,296,136,4,56,P.stoneD);R(g,296,206,4,48,P.stoneD);R(g,540,136,4,56,P.stoneD);R(g,540,206,4,48,P.stoneD);
  for(const x of[300,540])prLine(g,x,-60,x,440,'rgba(242,201,76,.8)',1/st.z*1,[4,3]);shadow(g,hx,199,5);prWalker(g,hx,199,hx/14,{flip:dir<0})});
 prTag(c,'region: '+r[2],4,4,P.gold);prTag(c,'zoom x'+st.z.toFixed(2),W-4,4,'#e9edf2','rgba(10,14,24,.75)',6,'right');prTag(c,'Region anchors',120,122,'#e9edf2','rgba(10,14,24,.75)',6,'center')}};
/* CAM-10 orbit camera */
DEMOS['CAM-10']={d:8,f:(c,t)=>{const th=t*TAU;prOrbit(c,th);prInset(c,W-26,26,20,th,{col:P.gold});hdr(c,'Orbit yaw '+String(Math.round(t*360)).padStart(3,'0')+'°');prTag(c,'target stays centred',120,122,'#e9edf2','rgba(10,14,24,.75)',6,'center')}};
/* CAM-12 auto-recenter */
const th12=u=>prKeys([[0,0],[.1,0],[.3,1.9],[.56,1.9],[.8,0],[1,0]],u);
DEMOS['CAM-12']={d:6,f:(c,t)=>{const u=prWrap(t),th=th12(u);prOrbit(c,th,{arrow:1,ph:u*12});prInset(c,W-26,26,20,th,{goal:0});
 const input=u>.1&&u<.3,idle=u>=.3&&u<.56,rec=u>=.56&&u<.8;R(c,6,104,24,24,'rgba(10,14,24,.75)');ring(c,18,116,8,1,'#5e636e');circ(c,18+(input?6:0),116,4,input?P.cyan:'#9aa6b8');
 if(idle){bar(c,36,118,50,4,seg(u,.3,.56),P.gold);txt(c,'idle',36,111,'#cfd8e3',6,'left')}
 prTag(c,input?'stick: free look':idle?'no input: waiting':rec?'recenter behind':'behind character',120,4,rec?P.gold:'#e9edf2','rgba(10,14,24,.75)',6,'center');hdr(c,'Recenter')}};
/* CAM-13 group framing */
DEMOS['CAM-13']={d:6,f:(c,t)=>{const k=ease(prKeys([[0,0],[.15,0],[.45,1],[.65,1],[.95,0],[1,0]],prWrap(t),x=>x));const a=[lerp(300,170,k),lerp(196,150,k)],b=[lerp(318,470,k),lerp(200,262,k)];
 const x0=Math.min(a[0],b[0])-24,x1=Math.max(a[0],b[0])+24,y0=Math.min(a[1],b[1])-30,y1=Math.max(a[1],b[1])+14,z=clamp(Math.min(W/(x1-x0),H/(y1-y0))*.9,.5,2.2),cx=(x0+x1)/2,cy=(y0+y1)/2;
 prView(c,cx,cy,z,g=>{shadow(g,a[0],a[1],5);prWalker(g,a[0],a[1],a[0]/10,{flip:true,still:k<.01||k>.99});shadow(g,b[0],b[1],5);prWalker(g,b[0],b[1],b[0]/10,{name:'npc',still:k<.01||k>.99})});
 const [sx0,sy0]=prW2S(x0,y0,cx,cy,z),[sx1,sy1]=prW2S(x1,y1,cx,cy,z);prDash(c,sx0,sy0,sx1-sx0,sy1-sy0,P.gold);const [mx,my]=prW2S((a[0]+b[0])/2,(a[1]+b[1])/2,cx,cy,z);R(c,mx-1,my-3,2,6,P.cyan);R(c,mx-3,my-1,6,2,P.cyan);
 prTag(c,'zoom x'+z.toFixed(2),W-4,4,'#e9edf2','rgba(10,14,24,.75)',6,'right');hdr(c,'Group framing')}};
/* CAM-27 rail camera along a closed spline */
const RAIL=[[150,130],[380,100],[600,150],[740,250],[500,330],[250,300]];
function rail(u){const n=RAIL.length,f=prWrap(u)*n,i=Math.floor(f),s=f-i,p=j=>RAIL[(j+n)%n];const[p0,p1,p2,p3]=[p(i-1),p(i),p(i+1),p(i+2)];const cr=(a,b,c2,d)=>.5*(2*b+(-a+c2)*s+(2*a-5*b+4*c2-d)*s*s+(-a+3*b-3*c2+d)*s*s*s);return[cr(p0[0],p1[0],p2[0],p3[0]),cr(p0[1],p1[1],p2[1],p3[1])]}
DEMOS['CAM-27']={d:7,f:(c,t)=>{const[cx,cy]=rail(t),z=1.3;const hx=cx+Math.sin(t*TAU*3)*26,hy=cy+12+Math.cos(t*TAU*2)*10;
 prView(c,cx,cy,z,g=>{g.fillStyle='rgba(242,201,76,.9)';for(let i=0;i<120;i++){const[x,y]=rail(i/120);g.fillRect(Math.round(x),Math.round(y),1,1)}for(const[x,y]of RAIL)R(g,x-1.5,y-1.5,3,3,P.gold);shadow(g,hx,hy,5);prWalker(g,hx,hy,t*30,{flip:Math.cos(t*TAU*3)<0})});
 const mx=W-62,my=4;R(c,mx,my,58,30,'rgba(10,14,24,.8)');c.fillStyle=P.gold;for(let i=0;i<60;i++){const[x,y]=rail(i/60);c.fillRect(Math.round(mx+4+x/800*50),Math.round(my+3+y/360*24),1,1)}R(c,mx+4+cx/800*50-4,my+3+cy/360*24-3,8,5,'rgba(127,227,216,.45)');R(c,mx+4+cx/800*50-1,my+3+cy/360*24-1,2,2,P.cyan);
 hdr(c,'Rail u='+prWrap(t).toFixed(2));prTag(c,'camera locked to path',120,122,'#e9edf2','rgba(10,14,24,.75)',6,'center')}};
/* CAM-29 rack focus: framing fixed, sharpness moves between depth layers */
DEMOS['CAM-29']={d:6,f:(c,t)=>{const f=prKeys([[0,0],[.25,0],[.42,1],[.72,1],[.9,0],[1,0]],prWrap(t));const k=TMP(),g=k.getContext('2d');g.drawImage(scene('eday'),0,0);const nx=172+Math.sin(t*TAU)*10;shadow(g,nx,74,5);prWalker(g,nx,74,t*8,{name:'npc',s:1.5,flip:Math.cos(t*TAU)<0});
 c.save();c.filter='blur('+((1-f)*2.4).toFixed(2)+'px)';c.drawImage(k,0,0);c.restore();const k2=TMP2(),g2=k2.getContext('2d');fence(g2,-4,140,14);spr(g2,'hero',62,142,{sx:5,sy:5});c.save();c.filter='blur('+(f*3).toFixed(2)+'px)';c.drawImage(k2,0,0);c.restore();
 R(c,70,4,100,12,'rgba(10,14,24,.75)');txt(c,'near',76,10,f<.5?P.cyan:'#9aa6b8',6,'left');txt(c,'far',164,10,f>.5?P.cyan:'#9aa6b8',6,'right');R(c,96,9,46,1,'#5e636e');R(c,96+f*44,7,3,5,P.gold);hdr(c,'Rack focus');prTag(c,'framing fixed',W-4,4,'#e9edf2','rgba(10,14,24,.75)',6,'right')}};
/* CAM-30 general camera shake: impulses jitter the whole view and settle; HUD frame stays */
const IMP=[[.08,6,1],[.5,4.5,2],[.58,2.5,3]];
function shk(u,d){let x=0,y=0,a=0,m=0;for(const[t0,amp,sd]of IMP){const e=(u-t0)*d;if(e<0)continue;const k=amp*Math.exp(-e*4.2);m=Math.max(m,k);x+=k*Math.sin(e*41+sd*7);y+=k*Math.sin(e*53+sd*3)*(sd===2?1.4:.8);a+=k*.004*Math.sin(e*29+sd)}return{x,y,a,m}}
DEMOS['CAM-30']={d:6,f:(c,t,_w,_h,p)=>{const u=prWrap(t),s=shk(u,p.dur);c.save();c.translate(W/2+Math.round(s.x),H/2+Math.round(s.y));c.rotate(s.a);c.translate(-W/2,-H/2);c.drawImage(scene('eday'),-10,-10,W+20,H+20);
 const hy=u>.42&&u<.5?lerp(40,86,ei(seg(u,.42,.5))):86;shadow(c,110,87,6);spr(c,'hero',110,hy,{sx:1.5,sy:1.5});R(c,160,74,10,12,P.wood);R(c,160,78,10,2,P.woodD);const e=(u-.08)*p.dur;if(e>=0&&e<.6){c.globalAlpha=clamp(1-e/.6);circ(c,165,78,4+e*50,'rgba(255,214,120,.8)');circ(c,165,78,2+e*26,'#fff6c8');c.globalAlpha=1;burst(c,165,78,e,14,4,{speed:60,life:.6,col:(l,i)=>i%2?P.orange:P.gold})}
 if(u>=.5&&u<.6)burst(c,110,87,(u-.5)*p.dur,10,9,{a0:Math.PI,spread:Math.PI,speed:26,life:.5,col:P.dirt});c.restore();
 prDash(c,2,2,W-5,H-5,'rgba(233,237,242,.5)');for(let i=0;i<3;i++)spr(c,'heart',10+i*8,16);R(c,4,H-12,64,8,'rgba(10,14,24,.75)');bar(c,30,H-10,34,4,s.m/6,P.gold);txt(c,'shake',6,H-8,'#e9edf2',6,'left');prTag(c,u<.42?'BOOM':u<.5?'jump':'LAND',W-4,4,P.gold,'rgba(10,14,24,.75)',6,'right');prTag(c,'Camera shake',120,4,'#e9edf2','rgba(10,14,24,.75)',6,'center')}};
/* CAM-31 hard cut between two views */
function shotA(c,u){c.drawImage(scene('eday'),0,0);shadow(c,180,60,4);spr(c,'foe',180,60);R(c,0,0,W,H,'rgba(20,26,36,.08)');spr(c,'hero',66,150+Math.round(Math.sin(u*TAU*6)),{sx:6,sy:6})}
function shotB(c,u){R(c,0,0,W,H,'#2a2440');R(c,0,92,W,43,'#3d3460');circ(c,120,58,30,'#463a70');spr(c,'foe',120,100+Math.round(Math.sin(u*TAU*5)*1.5),{sx:5,sy:5})}
DEMOS['CAM-31']={d:6,f:(c,t)=>{const u=prWrap(t),B=u>=.5;(B?shotB:shotA)(c,u);const cut=Math.abs(u-.5)<.012||u<.012;if(cut){R(c,0,0,W,3,P.gold);R(c,0,H-3,W,3,P.gold)}
 R(c,40,H-11,160,7,'rgba(10,14,24,.8)');R(c,41,H-10,79,5,'#4f8c42');R(c,120,H-10,79,5,'#463a70');R(c,119,H-12,2,9,P.gold);R(c,40+u*160,H-13,1,11,'#fff');txt(c,'A',36,H-8,'#e9edf2',6,'right');txt(c,'B',204,H-8,'#e9edf2',6,'left');
 prTag(c,B?'VIEW B: boss':'VIEW A: behind hero',4,4);prTag(c,'CUT = 0 frames between',W-4,4,cut?P.gold:'#e9edf2','rgba(10,14,24,.75)',6,'right')}};
/* CAM-32 camera blend between exploration and dialogue states */
DEMOS['CAM-32']={d:6,f:(c,t)=>{const u=prWrap(t),w=prKeys([[0,0],[.15,0],[.5,1],[.65,1],[1,0]],u,x=>x*x*(3-2*x)),cx=lerp(330,316,w),cy=lerp(185,189,w),z=lerp(.8,2.6,w);
 prView(c,cx,cy,z,g=>{shadow(g,304,200,5);prWalker(g,304,200,0,{still:1});shadow(g,328,198,5);prWalker(g,328,198,0,{name:'npc',flip:true,still:1});if(w>.95){R(g,326,180,16,7,'#fff');R(g,330,186,2,2,'#fff');txt(g,'...',334,183,P.ink,5)}});
 R(c,60,H-14,120,10,'rgba(10,14,24,.8)');txt(c,'EXPLORE',62,H-9,w<.5?P.cyan:'#9aa6b8',5,'left');txt(c,'TALK',178,H-9,w>.5?P.cyan:'#9aa6b8',5,'right');R(c,98,H-9,44,1,'#5e636e');R(c,98+w*42,H-11,3,5,P.gold);
 prTag(c,'Blend w='+w.toFixed(2),4,4,P.gold);prTag(c,'zoom x'+z.toFixed(2),W-4,4,'#e9edf2','rgba(10,14,24,.75)',6,'right')}};

/* ===== CAM-06, 08, 09, 11, 14–21: static SVG entries rebuilt in the pixel world ===== */
const BHOR=46,BEYE=1.35;
const BH={tree:27,house:25,hero:10,foe:10,npc:10};
function b1s(cam,z){const d=z-cam.z;if(d<.25)return 0;return cam.ortho?cam.ortho:cam.f/d}
function b1p(cam,wx,wz,cx){const s=b1s(cam,wz);if(!s)return null;return{s,x:cx+wx*s,foot:BHOR+BEYE*s,d:wz-cam.z}}
function b1Sky(c,x0,x1){R(c,x0,0,x1-x0,BHOR+1,P.sky);for(let i=0;i<4;i++){const w=x1-x0;R(c,x0+hash(i+2)*w,6+hash(i+9)*16,Math.min(24,w*.28),4,'#d8eef7')}
 c.fillStyle='#7eaf86';const n=Math.max(3,Math.round((x1-x0)/42));for(let i=0;i<n;i++){c.beginPath();c.arc(x0+8+i*((x1-x0)/n),BHOR+1,16,Math.PI,0);c.fill()}}
function b1Ground(c,cam,x0,x1,cx){if(cam.ortho){R(c,x0,BHOR,x1-x0,H-BHOR,P.grass);c.fillStyle=P.grass2;for(let i=0;i<36;i++)R(c,x0+hash(i+4)*(x1-x0),BHOR+6+hash(i+8)*(H-BHOR-12),2,1);
  const foot=Math.round(BHOR+BEYE*cam.ortho);R(c,x0,foot-3,x1-x0,12,P.dirt);R(c,x0,foot-3,x1-x0,1,P.dirtD);R(c,x0,foot+8,x1-x0,1,P.dirtD);return}
 for(let y=BHOR;y<H;y++){const den=y-BHOR+.5,d=cam.f*BEYE/den,band=Math.floor(d*1.25)%2;R(c,x0,y,x1-x0,1,band?P.grass:P.grass2);
  const hw=den/BEYE,a=Math.max(x0,cx-hw),b=Math.min(x1,cx+hw);if(b>a){R(c,a,y,b-a,1,band?P.dirt:P.dirtD);R(c,a,y,1,1,P.dirtD);R(c,b-1,y,1,1,P.dirtD)}}}
function b1Spr(c,p,kind,scH){const bh=BH[kind]||10,sc=p.s/scH;c.save();c.translate(Math.round(p.x),Math.round(p.foot));c.scale(sc,sc);shadow(c,0,0,6,.28);
 if(kind==='tree')tree(c,0,0);else if(kind==='house')house(c,0,0,0);else spr(c,kind==='npc'?'npc':kind==='foe'?'foe':'hero',0,0);c.restore();
 return{x:p.x,top:p.foot-bh*sc,foot:p.foot,h:bh*sc,s:p.s}}
function b1Panel(c,x0,x1,cam,cx,objs){c.save();c.beginPath();c.rect(x0,0,Math.max(1,x1-x0),H);c.clip();b1Sky(c,x0,x1);b1Ground(c,cam,x0,x1,cx);
 const drawn=objs.map(o=>({o,p:b1p(cam,o.x,o.z,cx)})).filter(it=>it.p).sort((a,b)=>b.p.d-a.p.d);const out=[];
 for(const it of drawn)out.push(Object.assign({kind:it.o.kind,id:it.o.id},b1Spr(c,it.p,it.o.kind,it.o.sc||14)));c.restore();return out}
function b1Br(c,x,top,foot,col){const y0=Math.round(Math.max(28,top)),y1=Math.round(Math.min(H-6,foot));if(y1-y0<3)return;R(c,x,y0,1,y1-y0,col);R(c,x,y0,4,1,col);R(c,x,y1-1,4,1,col)}
function b1Rig(c,cam,nz,fz){const x=W-68,y=4,w=64,h=28;R(c,x,y,w,h,'rgba(10,14,24,.8)');const X=z=>x+4+(z/12)*(w-10);R(c,x+4,y+18,w-8,1,'#5e636e');
 R(c,X(nz)-1,y+13,2,7,P.cyan);R(c,X(fz)-1,y+15,2,5,P.gold);R(c,X(cam.z)-2,y+10,4,3,P.red);txt(c,'z'+cam.z.toFixed(1),x+3,y+6,P.red,5,'left');txt(c,'f'+Math.round(cam.f),x+w-2,y+6,'#e9edf2',5,'right')}
function b1Back(c,x,foot,sc,side){const p=(dx,dy,w,h,col)=>R(c,Math.round(x+dx*sc),Math.round(foot+dy*sc),Math.max(1,Math.round(w*sc)),Math.max(1,Math.round(h*sc)),col);
 shadow(c,x,foot,9,.35);p(-3,-6,2,6,P.woodD);p(1,-6,2,6,P.woodD);p(-5,-15,10,10,P.red);p(-5,-15,10,2,'#a8342a');
 if(side>0){p(5,-16,4,9,'#a8342a');p(-8,-13,3,6,P.red)}else{p(-9,-16,4,9,'#a8342a');p(5,-13,3,6,P.red)}
 p(-1,-16,2,2,P.skin);p(-3,-22,6,7,P.skin);p(-4,-24,8,4,'#d9a441');p(-3,-23,6,2,'#d9a441');p(1,-21,1,11,'#cfd8e3')}
function b1Aim(c,x,y,r,col){R(c,x-r,y-1,5,2,col);R(c,x+r-5,y-1,5,2,col);R(c,x-1,y-r,2,5,col);R(c,x-1,y+r-5,2,5,col);ring(c,x,y,Math.max(3,r*.45),1,col)}
function b1Hit(a,b,r){for(let i=1;i<=36;i++){const k=i/36,x=lerp(a[0],b[0],k),y=lerp(a[1],b[1],k);if(x>r[0]&&x<r[0]+r[2]&&y>r[1]&&y<r[1]+r[3])return[x,y]}return null}
function b1Cam(c,x,y,col,a){c.save();c.translate(Math.round(x),Math.round(y));c.rotate(a||0);R(c,-5,-3,7,6,col);R(c,2,-2,3,4,P.ink);R(c,2,-1,2,2,col);c.restore()}
const b1K=t=>prKeys([[0,0],[.1,.2],[.3,.62],[.5,1],[.7,.38],[.9,.08],[1,0]],t);

/* CAM-06 look-ahead: gold focus leads velocity, so the pit shows up early. Facing can disagree. */
 function b1x6(u){return lerp(58,308,ease(prTri(u)))}
DEMOS['CAM-06']={d:6,f:(c,t)=>{const hx=b1x6(t),vx=stepOf(b1x6,t)/.002/6,lead=clamp(vx*.62,-100,100),fx=hx+lead;
 const faceR=!(t>.64&&t<.98),mismatch=!faceR?false:vx<-18;prSide(c,fx,67,{props:false});
 const ox=Math.round(W/2-fx),oy=Math.round(H/2-67);
 tree(c,130+ox,100+oy);tree(c,210+ox,100+oy);house(c,40+ox,100+oy,0);
 R(c,328+ox,100+oy,56,36,P.ink);R(c,328+ox,100+oy,56,3,P.dirtD);txt(c,'GAP',356+ox,112+oy,'#9aa6b8',6);
 shadow(c,292+ox,100+oy,5);spr(c,'foe',292+ox,100+oy);
 const sx=W/2+(hx-fx);shadow(c,sx,100,6);prWalker(c,sx,100,hx/14,{s:2,flip:!faceR,still:Math.abs(vx)<12});
 prLine(c,sx,86,120,86,P.gold,1);R(c,116,78,8,2,P.gold);R(c,118,74,4,10,P.gold);txt(c,'focus',120,68,P.gold,5);
 if(Math.abs(lead)>10){const dir=Math.sign(lead);c.fillStyle=P.gold;c.beginPath();c.moveTo(sx+dir*16,86);c.lineTo(sx+dir*8,82);c.lineTo(sx+dir*8,90);c.fill()}
 hdr(c,'Look-ahead');prTag(c,'lead '+Math.round(lead)+'px',4,16,P.gold);
 prTag(c,mismatch?'face ≠ velocity':Math.abs(lead)<12?'stopped':'room ahead',120,16,mismatch?P.red:'#e9edf2','rgba(10,14,24,.75)',6,'center');
 tl(c,t,[.5])}};

/* CAM-08 region focus: 0.7 anchor + 0.3 player. The offset holds; a damping ghost catches up and the camera does not. */
function b1x8(u){return prKeys([[0,236],[.12,236],[.4,372],[.72,372],[1,236]],u)}
DEMOS['CAM-08']={d:7,f:(c,t)=>{const hx=b1x8(t),ax=300,fx=ax*.7+hx*.3,hold=t>.4&&t<.72,damp=hold?ease((t-.4)/.32):0,ghost=lerp(fx,hx,damp);
 prSide(c,fx,67,{props:false,plats:[[200,100,200]]});const ox=Math.round(W/2-fx),oy=Math.round(H/2-67);
 R(c,200+ox,78+oy,8,22,P.stone);R(c,392+ox,78+oy,8,22,P.stone);fence(c,214+ox,100+oy,6);
 ring(c,ax+ox,100+oy,7,1,P.gold);txt(c,'A',ax+ox,86+oy,P.gold,6);
 const sx=W/2+(hx-fx);shadow(c,sx,100,6);prWalker(c,sx,100,hx/12,{s:2,flip:stepOf(b1x8,t)<0,still:hold});
 R(c,118,62,4,28,P.gold);R(c,112,74,16,2,P.gold);txt(c,'cam',132,66,P.gold,5,'left');
 if(hold){const gx=W/2+(ghost-fx);prLine(c,gx,48,gx,108,P.red,1,[2,2]);txt(c,'damped',gx,44,P.red,5)}
 const map=v=>16+(v-200)/200*208;R(c,12,H-18,216,12,'rgba(10,14,24,.8)');R(c,16,H-13,208,1,'#5e636e');
 R(c,map(ax)-1,H-17,2,6,P.gold);R(c,map(hx)-1,H-17,2,6,P.cyan);R(c,map(fx)-2,H-18,4,8,'#fff');
 if(hold)R(c,map(ghost)-1,H-17,2,6,P.red);
 txt(c,'A',map(ax),H-22,P.gold,5);txt(c,'F',map(fx),H-22,'#fff',5);txt(c,'P',map(hx),H-22,P.cyan,5);
 hdr(c,'Region focus');prTag(c,'0.7A + 0.3P',4,16,P.gold);
 prTag(c,hold?'offset holds':'blend',W-4,16,hold?P.gold:'#e9edf2','rgba(10,14,24,.75)',6,'right');tl(c,t,[.12,.4,.72])}};

/* CAM-09 confinement: the frame stops inset by half a view, so the map edge meets the screen edge. */
function b1x9(u){return prKeys([[0,170],[.12,170],[.5,450],[.72,450],[1,170]],u)}
DEMOS['CAM-09']={d:6,f:(c,t)=>{const hx=b1x9(t),cx=clamp(hx,120,360),clamped=hx>360||hx<120;
 prSide(c,cx,67,{props:false,plats:[[0,100,480]]});const ox=Math.round(W/2-cx),oy=Math.round(H/2-67);
 tree(c,90+ox,100+oy);tree(c,210+ox,100+oy);house(c,300+ox,100+oy,0);
 R(c,466+ox,62+oy,16,38,P.stone);R(c,466+ox,58+oy,16,5,P.stoneD);R(c,470+ox,78+oy,8,6,P.gold);
 const sx=W/2+(hx-cx);shadow(c,sx,100,6);prWalker(c,sx,100,hx/14,{s:2,flip:stepOf(b1x9,t)<0,still:Math.abs(stepOf(b1x9,t))<.01});
 const mm={x:156,y:18,w:80,h:36},W0=-70,W1=620,X=v=>mm.x+((v-W0)/(W1-W0))*mm.w;
 R(c,mm.x,mm.y,mm.w,mm.h,'rgba(10,14,24,.82)');R(c,X(0),mm.y+7,X(480)-X(0),mm.h-14,P.grassD);
 prDash(c,X(hx-120),mm.y+5,Math.max(2,X(hx+120)-X(hx-120)),mm.h-10,P.red);
 prDash(c,X(cx-120),mm.y+8,Math.max(2,X(cx+120)-X(cx-120)),mm.h-16,P.cyan);
 R(c,X(120)-1,mm.y+4,1,4,P.gold);R(c,X(360)-1,mm.y+4,1,4,P.gold);circ(c,X(hx),mm.y+mm.h/2,2,P.red);
 txt(c,'void',mm.x+mm.w-2,mm.y+mm.h-4,'#9aa6b8',5,'right');
 hdr(c,'Confined');prTag(c,clamped?'frame = map edge':'following',4,16,clamped?P.gold:'#e9edf2');
 prTag(c,'inset half view',W-4,4,'#cfd8e3','rgba(10,14,24,.75)',6,'right');tl(c,t,[.12,.5])}};

/* CAM-11 over-the-shoulder: a near shoulder parks the body on one side and leaves the aim open. */
DEMOS['CAM-11']={d:6,f:(c,t)=>{const s=prKeys([[0,1],[.16,1],[.34,-1],[.66,-1],[.84,1],[1,1]],t);
 const charX=lerp(W-36,36,(1-s)/2),vp=lerp(72,W-72,(1-s)/2);
 const cam={z:0,f:108},fz=7.2+Math.sin(t*TAU)*.6,fx=Math.sin(t*TAU*2)*.35;
 const objs=[{id:'a',kind:'tree',x:-1.35,z:5.2,sc:13},{id:'b',kind:'tree',x:1.45,z:6.4,sc:13},{id:'c',kind:'tree',x:-1.7,z:10,sc:13},{id:'d',kind:'house',x:1.1,z:12,sc:13},{id:'foe',kind:'foe',x:fx,z:fz,sc:6}];
 const got=b1Panel(c,0,W,cam,vp,objs);const foe=got.filter(o=>o.id==='foe').pop();
 if(foe)b1Aim(c,foe.x,(foe.top+foe.foot)/2,11,P.cyan);
 b1Back(c,charX,132,2.55,s);
 hdr(c,'Over-shoulder');prTag(c,s>.35?'R shoulder':s<-.35?'L shoulder':'swap',4,16,P.gold);
 prTag(c,'aim space',W-4,16,P.cyan,'rgba(10,14,24,.75)',6,'right');tl(c,t,[.16,.34,.66,.84])}};

/* CAM-14 collision: the wanted camera is inside the wall; resolution slides it toward the hero, outside the solid. */
function b1x14(u){return prKeys([[0,196],[.14,196],[.46,128],[.62,108],[.78,108],[1,196]],u)}
DEMOS['CAM-14']={d:6,f:(c,t)=>{const hx=b1x14(t),hy=78,wall=[46,36,40,70],des=[hx-50,hy];
 const inside=des[0]>wall[0]-2&&des[0]<wall[0]+wall[2]+2&&des[1]>wall[1]&&des[1]<wall[1]+wall[3];
 const rx=inside?wall[0]+wall[2]+8:des[0],ry=hy;
 ground(c);tree(c,18,34);tree(c,214,118);
 R(c,wall[0],wall[1],wall[2],wall[3],P.stone);R(c,wall[0],wall[1],wall[2],4,P.stoneD);R(c,wall[0]+8,wall[1]+16,8,10,'#6f8a99');
 c.save();c.globalAlpha=.22;c.fillStyle=P.cyan;c.beginPath();c.moveTo(rx,ry);c.lineTo(rx+64,ry-26);c.lineTo(rx+64,ry+26);c.fill();c.restore();
 prLine(c,des[0],des[1],hx-8,hy,inside?P.red:P.cyan,1,[3,2]);
 if(inside){ring(c,des[0],des[1],6,1,P.red);prLine(c,des[0]-4,des[1]-4,des[0]+4,des[1]+4,P.red,1);prLine(c,des[0]-4,des[1]+4,des[0]+4,des[1]-4,P.red,1);txt(c,'want',des[0],des[1]-10,P.red,5)}
 b1Cam(c,rx,ry,P.cyan,0);shadow(c,hx,hy,6);prWalker(c,hx,hy,t*8,{s:2,flip:false,still:hx<150});
 hdr(c,'Cam collision');prTag(c,inside?'pushed to target':'clear of wall',4,16,inside?P.gold:'#e9edf2');
 prTag(c,'not occlusion',W-4,16,'#cfd8e3','rgba(10,14,24,.75)',6,'right');tl(c,t,[.14,.46,.78])}};

/* CAM-15 deocclusion: the pillar stays solid; the camera steps off the blocked ray until the hero is visible. */
DEMOS['CAM-15']={d:6,f:(c,t)=>{const k=b1K(t),a=lerp(-.02,1.28,k),pill=[62,52,26,34],pc=[75,69],hero=[75,30],rad=50;
 const camAt=ang=>[pc[0]+Math.sin(ang)*rad,pc[1]+Math.cos(ang)*rad];
 const cur=camAt(a),was=camAt(-.02),hit=b1Hit(cur,hero,pill),hit0=b1Hit(was,hero,pill),clear=!hit;
 ground(c);tree(c,16,36);tree(c,28,120);
 prLine(c,was[0],was[1],hit0?hit0[0]:hero[0],hit0?hit0[1]:hero[1],'rgba(224,74,58,.9)',1,[3,2]);
 prLine(c,cur[0],cur[1],hit?hit[0]:hero[0],hit?hit[1]:hero[1],clear?P.cyan:P.red,1);
 R(c,pill[0],pill[1],pill[2],pill[3],P.stone);R(c,pill[0],pill[1],pill[2],3,P.stoneD);R(c,pill[0]+6,pill[1]+8,6,8,'#6f8a99');
 b1Cam(c,was[0],was[1],'#9aa6b8',0);b1Cam(c,cur[0],cur[1],clear?P.cyan:P.red,Math.atan2(hero[1]-cur[1],hero[0]-cur[0]));
 shadow(c,hero[0],hero[1],5);prWalker(c,hero[0],hero[1],0,{s:2,still:1});
 const ix=158,iy=22,iw=76,ih=52;c.save();c.beginPath();c.rect(ix,iy,iw,ih);c.clip();R(c,ix,iy,iw,ih*.55,P.sky);R(c,ix,iy+ih*.55,iw,ih*.45,P.grass);
 if(clear){R(c,ix+8,iy+16,16,30,P.stone);spr(c,'hero',ix+52,iy+ih-8,{sx:2,sy:2})}else{R(c,ix+28,iy+8,22,ih-10,P.stone);txt(c,'hidden',ix+iw/2,iy+14,P.red,5)}
 c.restore();prDash(c,ix,iy,iw,ih,'#e9edf2');txt(c,clear?'hero visible':'pillar solid',ix+iw/2,iy+ih+6,clear?P.cyan:P.red,5);
 hdr(c,'Deocclusion');prTag(c,clear?'ray clear':'ray blocked',4,16,clear?P.cyan:P.red);tl(c,t,[.3,.7])}};

/* CAM-16 perspective: equal trees scale with 1/z. The side panel is the ortho reference. */
DEMOS['CAM-16']={d:6,f:(c,t)=>{const k=b1K(t),hz=lerp(8.6,3.15,k),cam={z:0,f:96},cx=78;
 const got=b1Panel(c,0,156,cam,cx,[{id:'far',kind:'tree',x:-.15,z:9,sc:14},{id:'near',kind:'tree',x:-1.2,z:4,sc:14},{id:'hero',kind:'hero',x:1.25,z:hz,sc:7}]);
 const far=got.find(o=>o.id==='far'),near=got.find(o=>o.id==='near'),hero=got.find(o=>o.id==='hero');
 if(far)b1Br(c,far.x+8,far.top,far.foot,P.gold);if(near)b1Br(c,near.x-12,near.top,near.foot,P.cyan);
 const ortho={z:0,ortho:15},ox=198;b1Panel(c,160,W,ortho,ox,[{kind:'tree',x:-.55,z:9,sc:14},{kind:'tree',x:.55,z:4,sc:14}]);
 R(c,158,0,2,H,P.ink);
 hdr(c,'Perspective');prTag(c,'h ∝ 1/z',4,16,P.gold);
 if(near&&far)prTag(c,'trees '+Math.round(near.h)+'/'+Math.round(far.h),78,16,P.cyan,'rgba(10,14,24,.75)',6,'center');
 prTag(c,'ORTHO = equal',W-4,16,'#e9edf2','rgba(10,14,24,.75)',6,'right');
 if(hero)txt(c,'z '+hz.toFixed(1),hero.x,Math.max(30,hero.top-6),P.cyan,5);
 tl(c,t,[.5])}};

/* CAM-17 orthographic: same pixel height at two depths, parallel road. Inset shows perspective shrinking the far tree. */
DEMOS['CAM-17']={d:6,f:(c,t)=>{const k=b1K(t),ortho={z:0,ortho:16},cx=92;
 b1Panel(c,0,W,ortho,cx,[{id:'far',kind:'tree',x:-1.6,z:10,sc:14},{id:'near',kind:'tree',x:.2,z:4,sc:14}]);
 const hx=lerp(46,132,k);c.save();c.translate(hx,Math.round(BHOR+BEYE*16));c.scale(1.15,1.15);shadow(c,0,0,6,.3);spr(c,'hero',0,0);c.restore();
 b1Br(c,cx-1.6*16-16,BHOR+BEYE*16-27*16/14,BHOR+BEYE*16,P.gold);b1Br(c,cx+.2*16+12,BHOR+BEYE*16-27*16/14,BHOR+BEYE*16,P.gold);
 const ix=152,iy=20,iw=82,ih=64;c.save();c.beginPath();c.rect(ix,iy,iw,ih);c.clip();
 const cam={z:0,f:42},pcx=ix+iw/2,hor=iy+16;R(c,ix,iy,iw,ih,P.sky);R(c,ix,hor,iw,iy+ih-hor,P.grass);
 for(let y=hor;y<iy+ih;y++){const den=y-hor+.5,hw=den/BEYE;R(c,pcx-hw,y,hw*2,1,den%6<3?P.dirt:P.dirtD)}
 [{x:-.7,z:9,sc:.55,col:P.leaf},{x:.55,z:4,sc:1.15,col:P.leafD}].forEach(o=>{const s=cam.f/o.z;c.save();c.translate(pcx+o.x*s,hor+BEYE*s);c.scale(o.sc,o.sc);tree(c,0,0);c.restore()});
 c.restore();prDash(c,ix,iy,iw,ih,P.gold);txt(c,'PERSP',ix+iw/2,iy+8,P.gold,5);
 hdr(c,'Orthographic');prTag(c,'equal height',4,16,P.gold);prTag(c,'not top-down',4,28,'#e9edf2');tl(c,t,[.5])}};

/* CAM-18 FOV: same camera position, wider hFOV shrinks the subject and lets the side trees in. */
DEMOS['CAM-18']={d:6,f:(c,t)=>{const k=b1K(t),f=lerp(140,58,k),cam={z:0,f},cx=W/2;
 const got=b1Panel(c,0,W,cam,cx,[{id:'far',kind:'tree',x:.7,z:9,sc:14},{id:'near',kind:'hero',x:-.15,z:4,sc:7},{id:'L',kind:'tree',x:-8.2,z:8,sc:13},{id:'R',kind:'tree',x:8.2,z:8,sc:13}]);
 const near=got.find(o=>o.id==='near');if(near)b1Br(c,near.x+16,near.top,near.foot,P.cyan);
 const fov=Math.round(2*Math.atan((W/2)/f)*180/Math.PI);
 prTag(c,'hFOV '+fov+'°',4,16,P.gold);prTag(c,'pos fixed',4,28,'#e9edf2');b1Rig(c,cam,4,9);tl(c,t,[.5]);hdr(c,'FOV')}};

/* CAM-19 lens zoom: viewpoint fixed, both depths scale by the same factor so the ratio holds. */
DEMOS['CAM-19']={d:6,f:(c,t)=>{const k=b1K(t),f=lerp(72,144,k),cam={z:0,f},cx=W/2;
 const got=b1Panel(c,0,W,cam,cx,[{id:'far',kind:'tree',x:.85,z:10,sc:14},{id:'near',kind:'tree',x:-.7,z:4,sc:14}]);
 const near=got.find(o=>o.id==='near'),far=got.find(o=>o.id==='far'),ratio=near&&far?near.s/far.s:0;
 if(near)b1Br(c,near.x-16,near.top,near.foot,P.cyan);if(far)b1Br(c,far.x+12,far.top,far.foot,P.gold);
 const m=lerp(8,18,k);c.strokeStyle=P.cyan;c.lineWidth=1;[[18,32,1,1],[W-18,32,-1,1],[18,H-12,1,-1],[W-18,H-12,-1,-1]].forEach(([x,y,sx,sy])=>{c.beginPath();c.moveTo(x,y+sy*m);c.lineTo(x,y);c.lineTo(x+sx*m,y);c.stroke()});
 hdr(c,'Lens zoom');prTag(c,'x'+(f/72).toFixed(2)+' both',4,16,P.gold);prTag(c,'ratio '+ratio.toFixed(2),4,28,P.cyan);b1Rig(c,cam,4,10);tl(c,t,[.5])}};

/* CAM-20 dolly: moving the camera two units doubles the near tree and grows the far one only x1.25. */
DEMOS['CAM-20']={d:6,f:(c,t)=>{const k=b1K(t),cam={z:lerp(0,2,k),f:78},cx=W/2;
 const got=b1Panel(c,0,W,cam,cx,[{id:'far',kind:'tree',x:.9,z:10,sc:14},{id:'near',kind:'tree',x:-.65,z:4,sc:14}]);
 const near=got.find(o=>o.id==='near'),far=got.find(o=>o.id==='far');
 const nf=4/(4-cam.z),ff=10/(10-cam.z);
 if(near)b1Br(c,near.x-16,near.top,near.foot,P.cyan);if(far)b1Br(c,far.x+12,far.top,far.foot,P.gold);
 hdr(c,'Dolly in');prTag(c,'near x'+nf.toFixed(2),4,16,P.cyan);prTag(c,'far x'+ff.toFixed(2),4,28,P.gold);b1Rig(c,cam,4,10);tl(c,t,[.5])}};

/* CAM-21 dolly zoom: approach while halving f. Near hero stays the same height; the houses shrink. */
DEMOS['CAM-21']={d:6,f:(c,t)=>{const k=b1K(t),camZ=lerp(0,2,k),cam={z:camZ,f:lerp(200,100,k)},cx=W/2;
 const got=b1Panel(c,0,W,cam,cx,[{id:'hL',kind:'house',x:-3.3,z:10,sc:13},{id:'hR',kind:'house',x:3.3,z:10,sc:13},{id:'hero',kind:'hero',x:0,z:4,sc:6.4}]);
 const hero=got.find(o=>o.id==='hero'),house=got.find(o=>o.id==='hR');
 const sf=(cam.f/200)*(4/(4-camZ)),bf=(cam.f/200)*(10/(10-camZ));
 if(hero){b1Br(c,hero.x+18,hero.top,hero.foot,P.cyan);prLine(c,hero.x-28,hero.top,hero.x+28,hero.top,P.cyan,1)}
 hdr(c,'Dolly zoom');prTag(c,'subj x'+sf.toFixed(2),4,16,P.cyan);prTag(c,'bg x'+bf.toFixed(2),4,28,house?P.gold:'#e9edf2');b1Rig(c,cam,4,10);tl(c,t,[.5])}};
})();
