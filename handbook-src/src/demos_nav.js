/* ===== NAV demos (visual guidance & readability) ===== */
(()=>{
const nvMk=(w,h,fn)=>{const k=mk(w,h),g=k.getContext('2d');fn(g);return k};
const nvSilC=new Map();
function nvSil(k,col){const key=col;let m=nvSilC.get(k);if(!m){m={};nvSilC.set(k,m)}if(m[key])return m[key];const s=mk(k.width,k.height),g=s.getContext('2d');g.drawImage(k,0,0);g.globalCompositeOperation='source-in';g.fillStyle=col;g.fillRect(0,0,s.width,s.height);return m[key]=s}
/* draw canvas k at scale sc with 1-lowres-px outline (alpha a) */
function nvOutlined(c,k,x,y,sc,col,a){c.save();c.imageSmoothingEnabled=false;if(a>0){c.globalAlpha=a;const s=nvSil(k,col);for(const[dx,dy]of[[-1,0],[1,0],[0,-1],[0,1]])c.drawImage(s,Math.round(x)+dx,Math.round(y)+dy,k.width*sc,k.height*sc)}c.globalAlpha=1;c.drawImage(k,Math.round(x),Math.round(y),k.width*sc,k.height*sc);c.restore()}
let nvObj=null;function nvObjs(){if(nvObj)return nvObj;nvObj={
chest:nvMk(12,9,g=>{R(g,0,2,12,7,P.wood);R(g,0,0,12,3,P.woodD);R(g,1,1,10,1,P.wood);R(g,0,5,12,1,P.woodD);R(g,5,3,2,3,P.gold);R(g,0,8,12,1,P.woodD)}),
sign:nvMk(12,13,g=>{R(g,5,6,2,7,P.woodD);R(g,0,0,12,7,P.wood);R(g,0,6,12,1,P.woodD);R(g,2,2,8,1,P.woodD);R(g,2,4,6,1,P.woodD)}),
barrel:nvMk(9,11,g=>{R(g,1,0,7,11,P.wood);R(g,0,2,9,7,P.wood);R(g,0,2,9,1,P.stoneD);R(g,0,8,9,1,P.stoneD);R(g,3,0,1,11,P.woodD);R(g,6,1,1,9,P.woodD)}),
crate:nvMk(10,10,g=>{R(g,0,0,10,10,P.wood);R(g,0,0,10,1,P.woodD);R(g,0,9,10,1,P.woodD);R(g,0,0,1,10,P.woodD);R(g,9,0,1,10,P.woodD);for(let i=1;i<9;i++)R(g,i,i,1,1,P.woodD)})};return nvObj}
function nvPrompt(c,x,y,a){c.globalAlpha=a;R(c,x-5,y-5,10,10,P.ink);R(c,x-4,y-4,8,8,'#e9edf2');txt(c,'E',x,y+.5,P.ink,7);c.globalAlpha=1}
function nvDashCircle(c,x,y,r,col,w=1,dash=[2,2],off=0){c.save();c.strokeStyle=col;c.lineWidth=w;c.setLineDash(dash);c.lineDashOffset=off;c.beginPath();c.arc(x,y,r,0,TAU);c.stroke();c.restore()}

/* NAV-01 interactable highlight: hero walks past barrel (not usable), chest and sign (usable) */
DEMOS['NAV-01']={d:6,f:(c,t)=>{ground(c);R(c,0,92,W,14,P.dirt);R(c,0,92,W,1,P.dirtD);R(c,0,105,W,1,P.dirtD);const O=nvObjs();
const items=[{k:O.barrel,x:62,use:false},{k:O.crate,x:96,use:false},{k:O.chest,x:140,use:true},{k:O.sign,x:196,use:true}];
const hx=26+188*(.5-.5*Math.cos(t*TAU)),face=Math.sin(t*TAU)<0;
let best=-1,bd=1e9;items.forEach((o,i)=>{const d=Math.abs(o.x-hx);if(o.use&&d<30&&d<bd){bd=d;best=i}});
const pulse=.6+.4*(.5+.5*Math.sin(t*TAU*5));
for(let i=0;i<items.length;i++){const o=items[i],sc=2,w=o.k.width*sc,h=o.k.height*sc;const k=i===best?clamp((30-bd)/8):0;shadow(c,o.x,98,w*.45,.3);nvOutlined(c,o.k,o.x-w/2,98-h,sc,'#ffe08a',k*pulse);if(k>0)nvPrompt(c,o.x,98-h-10,k)}
shadow(c,hx,99,6);spr(c,'hero',hx,99,{sx:2,sy:2,flip:face});
label(c,'USABLE: OUTLINE + PROMPT',W/2,10);label(c,'not usable',79,118,'#cfd8e3');label(c,'usable',168,118,'#ffe08a')}};

/* NAV-02 yellow paint: same cliff, left without cue, right with consistent yellow marks */
const nvLedges=[[24,104,14,1],[56,92,12,0],[40,82,14,1],[70,70,12,0],[22,58,12,1],[52,46,14,1],[30,30,12,0],[64,24,18,1]];
let nvCliff=null;function nvCliffC(){if(nvCliff)return nvCliff;nvCliff=nvMk(118,135,g=>{const gr=g.createLinearGradient(0,0,0,135);gr.addColorStop(0,'#9cc6dc');gr.addColorStop(1,'#d6e6ea');g.fillStyle=gr;g.fillRect(0,0,118,135);R(g,10,14,90,121,P.stone);for(let i=0;i<90;i++){const x=10+hash(i*3.1)*88,y=14+hash(i*7.7)*118;R(g,x,y,2+hash(i)*4|0,1,P.stoneD)}for(let i=0;i<14;i++){const x=12+hash(i+40)*80,y=16+hash(i+80)*110;R(g,x,y,8,3,'#9aa0aa');R(g,x,y+3,8,1,P.stoneD)}
for(const[x,y,w]of nvLedges){R(g,x,y,w,3,'#a3a9b3');R(g,x,y+3,w,1,P.stoneD)}R(g,0,120,118,15,P.grassD);R(g,0,120,118,2,P.grass)});return nvCliff}
const nvPath=nvLedges.filter(l=>l[3]);
function nvClimb(t){const n=nvPath.length,f=clamp(t/.9)*(n-1),i=Math.min(n-2,Math.floor(f)),k=f-i,a=nvPath[i],b=nvPath[i+1];const ax=a[0]+a[2]/2,bx=b[0]+b[2]/2;return [lerp(ax,bx,ease(k)),lerp(a[1],b[1],ease(k))-Math.sin(Math.PI*k)*8]}
DEMOS['NAV-02']={d:6,f:(c,t)=>{const k=nvCliffC();for(const side of[0,1]){const ox=side?122:0;c.drawImage(k,ox,0);if(side){for(const[x,y,w,ok]of nvLedges){if(!ok)continue;R(c,ox+x,y,w,2,P.gold);for(let j=0;j<1+Math.floor(hash(x*1.3+y)*3);j++){const dx=Math.floor(hash(x+y*.7+j*3.3)*(w-1));R(c,ox+x+dx,y+2,1,2+Math.floor(hash(j+x)*2),'#d9a92e')}}}
const tt=side?t:0;let [hx,hy]=side?nvClimb(t):[60,120];if(t>.9&&side){hx=nvPath[nvPath.length-1][0]+9;hy=nvPath[nvPath.length-1][1]}spr(c,'hero',ox+hx,hy,{});if(!side&&(t*4%1)<.6)otxt(c,'?',ox+60,104,'#fff',8)}
R(c,118,0,4,H,P.ink);label(c,'NO CUE',59,7,P.ink);label(c,'YELLOW PAINT',181,7,P.ink)}};

/* NAV-03 foreground-background separation: wipe between flat and separated */
let nvBg=null,nvBgS=null,nvFg=null,nvFgSil=null;
function nvBgDraw(g){R(g,0,0,W,H,'#4f8f6a');for(let i=0;i<24;i++){const x=hash(i+11)*W,y=40+hash(i+31)*80;tree(g,x,y,0,i%2?P.leaf:'#4fa04a',P.leafD)}for(let i=0;i<30;i++){const x=hash(i+71)*W,y=hash(i+91)*H;R(g,x,y,5,3,i%3?'#b9925e':'#7a5034')}for(let i=0;i<10;i++){circ(g,hash(i+5)*W,10+hash(i+6)*40,3,i%2?P.red:P.gold)}}
function nvBuild(){if(nvBg)return;nvBg=nvMk(W,H,nvBgDraw);nvBgS=nvMk(W,H,g=>{g.drawImage(nvBg,0,0);const d=g.getImageData(0,0,W,H),p=d.data,hz=[159,184,200];for(let i=0;i<p.length;i+=4)for(let j=0;j<3;j++){let v=128+(p[i+j]-128)*.6;p[i+j]=Math.round(lerp(v,hz[j],.5))}g.putImageData(d,0,0)});nvFg=mk(W,H);nvFgSil=mk(W,H)}
const nvPlat=[[0,112,90,23],[110,92,50,8],[176,72,64,8],[150,118,90,17]];
function nvFgDraw(g,t){g.clearRect(0,0,W,H);for(const[x,y,w,h]of nvPlat){R(g,x,y,w,h,P.dirt);R(g,x,y,w,3,P.grass);R(g,x,y+3,w,1,P.grassD);for(let i=0;i<w/8;i++)R(g,x+3+i*8,y+7,3,1,P.dirtD)}
const hp=(t*2)%1,hx=lerp(30,200,t),hy=hx<110?112:hx<160?92:hx<176?92:72;spr(g,'hero',hx,hy-Math.abs(Math.sin(t*TAU*6))*2,{sx:1.5,sy:1.5});spr(g,'foe',132,92,{sx:1.5,sy:1.5,flip:true});spr(g,'foe',210,118,{sx:1.5,sy:1.5});for(let i=0;i<3;i++)spr(g,'coin',188+i*12,64-Math.round(Math.sin(t*TAU+i)*1.5),{})}
DEMOS['NAV-03']={d:6,f:(c,t)=>{nvBuild();const sx=Math.round(W*(.5-.5*Math.cos(t*TAU)));nvFgDraw(nvFg.getContext('2d'),t);const sg=nvFgSil.getContext('2d');sg.globalCompositeOperation='source-over';sg.clearRect(0,0,W,H);sg.drawImage(nvFg,0,0);sg.globalCompositeOperation='source-in';sg.fillStyle=P.ink;sg.fillRect(0,0,W,H);
c.drawImage(nvBg,0,0);c.save();c.beginPath();c.rect(0,0,sx,H);c.clip();c.drawImage(nvBgS,0,0);for(const[dx,dy]of[[-1,0],[1,0],[0,-1],[0,1]])c.drawImage(nvFgSil,dx,dy);c.restore();c.drawImage(nvFg,0,0);
R(c,sx-1,0,2,H,'#fff');if(sx>40)otxt(c,'SEPARATED',sx/2,8,'#fff',7);if(W-sx>40)otxt(c,'FLAT',(sx+W)/2,8,'#fff',7)}};

/* NAV-04 attack telegraph: radial-fill circle, then forward-filling lane */
DEMOS['NAV-04']={d:5,f:(c,t)=>{const shake=t>.4&&t<.46?Math.round((hash(Math.floor(t*200))-.5)*4):0;c.save();c.translate(shake,0);ground(c);const ex=120,ey=64,r=34;
const pA=seg(t,.05,.4);if(t>=.05&&t<.4){circ(c,ex,ey,r,'rgba(224,74,58,0.18)');circ(c,ex,ey,r*pA,'rgba(224,74,58,0.4)');ring(c,ex,ey,r,3,'rgba(20,26,36,.85)');ring(c,ex,ey,r-1,1,P.red)}
if(t>=.4&&t<.48){const k=seg(t,.4,.48);if(k<.35)circ(c,ex,ey,r,'rgba(255,255,255,'+(.8*(1-k/.35))+')');ring(c,ex,ey,r*(1+k*.6),2,'rgba(255,240,200,'+(1-k)+')')}
const ang=Math.atan2(104-64,170-120),L=105,lw=18;const pB=seg(t,.5,.8);if(t>=.5&&t<.8){c.save();c.translate(ex,ey);c.rotate(ang);R(c,0,-lw/2,L,lw,'rgba(224,74,58,0.18)');R(c,0,-lw/2,L*pB,lw,'rgba(224,74,58,0.4)');c.strokeStyle='rgba(20,26,36,.85)';c.lineWidth=3;c.strokeRect(0,-lw/2,L,lw);c.strokeStyle=P.red;c.lineWidth=1;c.strokeRect(.5,-lw/2+.5,L-1,lw-1);c.restore()}
let gx=ex,gy=ey;if(t>=.8&&t<.88){const k=eo(seg(t,.8,.88));gx=ex+Math.cos(ang)*L*k;gy=ey+Math.sin(ang)*L*k;burst(c,gx,gy+2,(t-.8)*5,8,7,{speed:20,life:.4,col:P.dirtD,fade:true})}else if(t>=.88){const k=ease(seg(t,.9,1));gx=lerp(ex+Math.cos(ang)*L,ex,k);gy=lerp(ey+Math.sin(ang)*L,ey,k)}
/* hero dodges: inside circle -> out; then stays clear of lane */
const hk=ease(seg(t,.12,.32)),hx=lerp(132,170,hk),hy=lerp(72,104,hk);const dk=ease(seg(t,.55,.7)),hx2=hx+14*dk,hy2=hy-18*dk;shadow(c,hx2,hy2,6);spr(c,'hero',hx2,hy2,{sx:2,sy:2,flip:true});
const wind=(t>.05&&t<.4)||(t>.5&&t<.8);shadow(c,gx,gy+8,9);spr(c,'foe',gx,gy+8,{sx:2,sy:wind?2-.15*Math.abs(Math.sin(t*TAU*8)):2,flash:wind&&(t*20%1<.15)?.6:0});c.restore();
tl(c,t,[.4,.8]);label(c,t<.48?'AoE: FILL = COUNTDOWN':'LANE: FILLS FORWARD',W/2,9)}};

/* NAV-05 placement ghost on a 12px grid */
const CS=12,GW=20,GH=11;let nvBlk=null;function nvBlocked(){if(nvBlk)return nvBlk;nvBlk=new Set();const add=(x,y)=>nvBlk.add(x+','+y);
[[3,2],[4,2],[3,3],[4,3]].forEach(a=>add(...a));/* existing house */[[9,3],[13,6],[6,7]].forEach(a=>add(...a));/* rocks */for(let y=5;y<=8;y++)for(let x=14;x<=17;x++)if(!((x===14||x===17)&&(y===5||y===8)))add(x,y);/* pond */return nvBlk}
let nvMap=null;function nvMapC(){if(nvMap)return nvMap;nvMap=nvMk(W,H,g=>{ground(g);for(let y=5;y<=8;y++)for(let x=14;x<=17;x++)if(!((x===14||x===17)&&(y===5||y===8)))R(g,x*CS,y*CS,CS,CS,P.water);R(g,15*CS,6*CS+4,10,2,P.waterL);house(g,4*CS,4*CS);for(const[x,y]of[[9,3],[13,6],[6,7]]){circ(g,x*CS+6,y*CS+7,5,P.stone);R(g,x*CS+2,y*CS+8,9,3,P.stoneD)}});return nvMap}
const nvKeys=[[30,20],[110,30],[175,70],[150,95],[80,95],[100,60],[100,60]];
function nvCur(t){const n=nvKeys.length-1,f=clamp(t/.8)*n,i=Math.min(n-1,Math.floor(f)),k=ease(f-i);return[lerp(nvKeys[i][0],nvKeys[i+1][0],k),lerp(nvKeys[i][1],nvKeys[i+1][1],k)]}
DEMOS['NAV-05']={d:6,f:(c,t)=>{c.drawImage(nvMapC(),0,0);const B=nvBlocked();const [mx,my]=nvCur(t);const cx=clamp(Math.floor(mx/CS-.5),0,GW-2),cy=clamp(Math.floor(my/CS-.5),0,GH-2);const placed=t>=.86;
if(!placed){c.fillStyle='rgba(255,255,255,.14)';for(let x=0;x<=GW;x++)c.fillRect(x*CS,0,1,H);for(let y=0;y<=GH;y++)c.fillRect(0,y*CS,W,1);
let ok=true;const cells=[[cx,cy],[cx+1,cy],[cx,cy+1],[cx+1,cy+1]];for(const[x,y]of cells)if(B.has(x+','+y))ok=false;
c.globalAlpha=.5;house(c,cx*CS+CS,cy*CS+2*CS);c.globalAlpha=1;
for(const[x,y]of cells){const bad=B.has(x+','+y);R(c,x*CS+1,y*CS+1,CS-1,CS-1,ok?'rgba(80,220,120,0.35)':bad?'rgba(230,60,60,0.5)':'rgba(230,60,60,0.25)');if(bad){c.strokeStyle='#ff5a4a';c.lineWidth=1.5;c.beginPath();c.moveTo(x*CS+3,y*CS+3);c.lineTo(x*CS+CS-2,y*CS+CS-2);c.moveTo(x*CS+CS-2,y*CS+3);c.lineTo(x*CS+3,y*CS+CS-2);c.stroke()}}
c.strokeStyle=ok?'#50dc78':'#e63c3c';c.lineWidth=1;c.strokeRect(cx*CS+.5,cy*CS+.5,2*CS,2*CS);
if(!ok){const tx=clamp(mx+8,0,W-46);R(c,tx,my+6,44,9,'rgba(20,26,36,.85)');txt(c,'BLOCKED',tx+22,my+10.5,'#ff8a7a',7)}
/* cursor */c.fillStyle='#fff';c.beginPath();c.moveTo(mx,my);c.lineTo(mx,my+8);c.lineTo(mx+2.5,my+6);c.lineTo(mx+5,my+6);c.closePath();c.fill();c.strokeStyle=P.ink;c.lineWidth=.8;c.stroke()}
else{const k=seg(t,.86,.92),s=1+.25*Math.sin(Math.PI*k);const hx=cx*CS+CS,hy=cy*CS+2*CS;c.save();c.translate(hx,hy);c.scale(s,s);house(c,0,0);c.restore();burst(c,hx,hy-2,(t-.86)*6,14,3,{speed:26,life:.5,col:'#e8d8b0',fade:true,spread:Math.PI,a0:-Math.PI/2})}
label(c,placed?'PLACED':'GHOST: GREEN = OK, RED = BLOCKED',W/2,H-6)}};

/* NAV-06 range indicator: placement preview, selection, upgrade preview + grow */
const nvTP=[[-12,104],[64,104],[84,66],[158,66],[178,100],[252,100]];let nvTL=null;
function nvPt(s){if(!nvTL){nvTL=[0];for(let i=1;i<nvTP.length;i++)nvTL.push(nvTL[i-1]+Math.hypot(nvTP[i][0]-nvTP[i-1][0],nvTP[i][1]-nvTP[i-1][1]))}const L=nvTL[nvTL.length-1];s=((s%L)+L)%L;let i=1;while(nvTL[i]<s)i++;const k=(s-nvTL[i-1])/(nvTL[i]-nvTL[i-1]);return[lerp(nvTP[i-1][0],nvTP[i][0],k),lerp(nvTP[i-1][1],nvTP[i][1],k)]}
let nvTD=null;function nvTDC(){if(nvTD)return nvTD;nvTD=nvMk(W,H,g=>{ground(g);g.strokeStyle=P.dirtD;g.lineWidth=14;g.lineJoin='round';g.beginPath();nvTP.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.stroke();g.strokeStyle=P.dirt;g.lineWidth=11;g.stroke()});return nvTD}
DEMOS['NAV-06']={d:8,f:(c,t)=>{c.drawImage(nvTDC(),0,0);const TX=120,TY=40;const placing=t<.25;const r0=38,r1=56;const gr=eo(seg(t,.72,.76));const rad=t<.72?r0:lerp(r0,r1,gr);
let tx=TX,ty=TY;if(placing){const k=ease(seg(t,0,.22));tx=lerp(40,TX,k);ty=lerp(30,TY,k)+Math.sin(k*Math.PI)*12}
const ens=[];for(let i=0;i<5;i++){const L=nvTL?nvTL[nvTL.length-1]:400;ens.push(nvPt(t*420+i*72))}
/* range circle */const fillA=placing?.1:.12;circ(c,tx,ty+4,rad,'rgba(255,255,255,'+fillA+')');if(placing)nvDashCircle(c,tx,ty+4,rad,'rgba(120,255,160,.9)',1,[3,2],-t*60);else ring(c,tx,ty+4,rad,1,'rgba(255,255,255,0.8)');
if(t>=.55&&t<.72)nvDashCircle(c,tx,ty+4,r1,'rgba(242,201,76,.95)',1,[2,2],-t*40);
for(const[x,y]of ens){shadow(c,x,y+1,5);spr(c,'foe',x,y+1,{})}
if(!placing){const inr=ens.filter(([x,y])=>Math.hypot(x-tx,y-ty-4)<rad);for(const[x,y]of inr)R(c,x-1,y-15,3,3,P.red);
const sh=Math.floor(t*40);if(inr.length&&(t*40%1)<.35){const [x,y]=inr[sh%inr.length];c.strokeStyle='rgba(255,240,170,.9)';c.lineWidth=1;c.beginPath();c.moveTo(tx,ty-18);c.lineTo(x,y-5);c.stroke();circ(c,x,y-5,2,'#fff')}}
c.globalAlpha=placing?.6:1;tower(c,tx,ty+6);c.globalAlpha=1;
if(placing)label(c,'PLACING: RANGE PREVIEW',W/2,H-6);else if(t<.55)label(c,'SELECTED: IN-RANGE MARKED',W/2,H-6);else if(t<.72)label(c,'UPGRADE PREVIEW (DASHED)',W/2,H-6);else label(c,'UPGRADED RANGE',W/2,H-6)}};
})();
