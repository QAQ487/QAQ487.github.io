/* ===== MATX demos — original procedural material diagrams (per-pixel shading on the 240×135 canvas) ===== */
(()=>{
const mtSat=v=>v<0?0:v>1?1:v;
const mtSS=(a,b,x)=>{const k=mtSat((x-a)/(b-a));return k*k*(3-2*k)};
const mtN3=(x,y,z)=>{const l=Math.hypot(x,y,z)||1;return [x/l,y/l,z/l]};
const mtC=v=>v<0?0:v>255?255:v;
function mtLab(c,s,x,y,col='#e9edf2'){const ww=Math.ceil(s.length*4.3);R(c,x-ww/2-2,y-5,ww+4,10,'rgba(10,14,22,.78)');label(c,s,x,y,col)}
/* periodic smooth 1D value noise (n cells per loop) */
function mtPN(t,n,seed){const f=((t%1)+1)%1*n,i=Math.floor(f),k=f-i,s=k*k*(3-2*k);return lerp(hash(seed+(i%n)*13.1),hash(seed+((i+1)%n)*13.1),s)}
/* 2D value noise */
function mtVN(x,y,seed){const xi=Math.floor(x),yi=Math.floor(y),fx=x-xi,fy=y-yi,sx=fx*fx*(3-2*fx),sy=fy*fy*(3-2*fy);const h=(i,j)=>hash(seed+(xi+i)*57.3+(yi+j)*131.7);return lerp(lerp(h(0,0),h(1,0),sx),lerp(h(0,1),h(1,1),sx),sy)}
function mtBg(d,top,bot){for(let y=0;y<H;y++){const k=y/(H-1),r=lerp(top[0],bot[0],k),g=lerp(top[1],bot[1],k),b=lerp(top[2],bot[2],k);for(let x=0;x<W;x++){const p=(y*W+x)*4;d[p]=r;d[p+1]=g;d[p+2]=b;d[p+3]=255}}}
function mtSet(d,x,y,r,g,b){const p=(y*W+x)*4;d[p]=mtC(r);d[p+1]=mtC(g);d[p+2]=mtC(b);d[p+3]=255}

/* ---------- MATX-01 Matcap ---------- */
function mtCapClay(nx,ny){const nz=Math.sqrt(Math.max(0,1-nx*nx-ny*ny));const L=mtN3(-.5,-.6,.65);const nl=Math.max(0,nx*L[0]+ny*L[1]+nz*L[2]);const hl=Math.pow(Math.max(0,nx*-.28+ny*-.34+nz*.9),40);const rim=Math.pow(1-nz,3);return [70+150*nl+200*hl+40*rim,58+120*nl+190*hl+30*rim,52+95*nl+180*hl+50*rim]}
function mtCapChrome(nx,ny){const nz=Math.sqrt(Math.max(0,1-nx*nx-ny*ny));let r,g,b;const hz=ny*.9+nx*.15;if(hz<.05){const k=mtSat(-hz);r=150+90*k;g=190+50*k;b=235}else{const k=mtSat(hz*1.6);r=110-70*k;g=80-55*k;b=60-40*k}const ln=Math.exp(-Math.pow((hz-.05)/.035,2));r+=120*ln;g+=110*ln;b+=90*ln;const hl=Math.pow(Math.max(0,nx*-.35+ny*-.45+nz*.82),90);r+=255*hl;g+=255*hl;b+=255*hl;const ed=Math.pow(1-nz,2)*.35;return [r*(1-ed),g*(1-ed),b*(1-ed)]}
function mtCap(nx,ny,k){const a=mtCapClay(nx,ny),b=mtCapChrome(nx,ny);return [lerp(a[0],b[0],k),lerp(a[1],b[1],k),lerp(a[2],b[2],k)]}
const mtDimples=[];for(let i=0;i<14;i++){const u=hash(i*3.1+1)*2-1,a=hash(i*7.7+2)*TAU,s=Math.sqrt(1-u*u);mtDimples.push([s*Math.cos(a),u,s*Math.sin(a)])}
DEMOS['MATX-01']={d:6,f:(c,t)=>{const o=outData(c),d=o.data;mtBg(d,[34,38,52],[18,20,28]);
const k=mtSS(.42,.5,t)-mtSS(.92,1,t);const a=t*TAU;const ca=Math.cos(a),sa=Math.sin(a);
/* matcap disc (left) */
const dx0=42,dy0=64,dr=30;for(let y=dy0-dr;y<=dy0+dr;y++)for(let x=dx0-dr;x<=dx0+dr;x++){const nx=(x+.5-dx0)/dr,ny=(y+.5-dy0)/dr;if(nx*nx+ny*ny>=1)continue;const col=mtCap(nx,ny,k);mtSet(d,x,y,col[0],col[1],col[2])}
/* rotating dimpled sphere shaded only by the matcap (right) */
const cx=162,cy=66,r=44,cr=Math.cos(.32),srr=1-cr;
for(let y=cy-r;y<=cy+r;y++)for(let x=cx-r;x<=cx+r;x++){const nx=(x+.5-cx)/r,ny=(y+.5-cy)/r,q=nx*nx+ny*ny;if(q>=1)continue;const nz=Math.sqrt(1-q);
/* view normal -> object space (rotate about vertical axis) */
const ox=nx*ca+nz*sa,oz=-nx*sa+nz*ca,oy=ny;let px=nx,py=ny,pz=nz;
for(const D of mtDimples){const dd=ox*D[0]+oy*D[1]+oz*D[2];if(dd>cr){const w=(dd-cr)/srr;const vx=D[0]*ca-D[2]*sa,vz=D[0]*sa+D[2]*ca,vy=D[1];const s=-1.6*Math.sin(w*Math.PI);px+=(nx-vx)*s;py+=(ny-vy)*s;pz+=(nz-vz)*s}}
const n=mtN3(px,py,pz);const col=mtCap(n[0],n[1],k);mtSet(d,x,y,col[0],col[1],col[2])}
c.putImageData(o,0,0);
/* scene light orbits but has no effect */
const lx=162+Math.cos(a*2)*70,ly=66+Math.sin(a*2)*48;circ(c,lx,ly,3,'#ffe066');ring(c,lx,ly,6,1,'rgba(255,224,102,.5)');
c.strokeStyle='rgba(233,237,242,.5)';c.beginPath();c.moveTo(74,64);c.lineTo(112,64);c.stroke();R(c,110,62,3,5,'rgba(233,237,242,.6)');
mtLab(c,k<.5?'MATCAP: CLAY':'MATCAP: CHROME',42,16);mtLab(c,'light moves, shading stays',162,126,'#ffe066');mtLab(c,'uv = N.xy',93,56)}};

/* ---------- MATX-02 Clear coat / sheen / iridescence ---------- */
DEMOS['MATX-02']={d:6,f:(c,t)=>{const o=outData(c),d=o.data;mtBg(d,[30,34,46],[14,16,22]);
const a=t*TAU;const L=mtN3(Math.cos(a)*.8,-.45+Math.sin(a)*.3,.6);const Hh=mtN3(L[0],L[1],L[2]+1);
const film=.5+.5*Math.sin(a);
const sp=[[40,'coat'],[120,'sheen'],[200,'irid']],cy=60,r=31;
for(const [cx,kind] of sp)for(let y=cy-r;y<=cy+r;y++)for(let x=cx-r;x<=cx+r;x++){const nx=(x+.5-cx)/r,ny=(y+.5-cy)/r,q=nx*nx+ny*ny;if(q>=1)continue;const nz=Math.sqrt(1-q);
const nl=Math.max(0,nx*L[0]+ny*L[1]+nz*L[2]),nh=Math.max(0,nx*Hh[0]+ny*Hh[1]+nz*Hh[2]),fr=Math.pow(1-nz,5);let R0,G0,B0;
if(kind==='coat'){const Fc=.04+.96*fr;const base=1-Fc;const bs=Math.pow(nh,10)*.35;const cs=Math.pow(nh,420)*3.2;const env=Fc*(ny<0?150:40);
R0=(190*nl+18)*base+bs*255*base+cs*255+env;G0=(26*nl+6)*base+bs*90*base+cs*255+env;B0=(40*nl+8)*base+bs*90*base+cs*255+env*1.3}
else if(kind==='sheen'){const wrap=Math.max(0,(nx*L[0]+ny*L[1]+nz*L[2]+.4)/1.4);const sh=Math.pow(1-nz,2.2)*wrap*1.3;R0=60*wrap+12+sh*235;G0=18*wrap+5+sh*190;B0=82*wrap+14+sh*255}
else{const th=.9+film*.9;const ph=th*(1.2+nz*1.3);const ir=[.5+.5*Math.cos(TAU*ph),.5+.5*Math.cos(TAU*(ph+.33)),.5+.5*Math.cos(TAU*(ph+.67))];const F=.25+.75*Math.pow(1-nz,1.5);const s=Math.pow(nh,60)*1.6;
R0=14+ir[0]*F*(70+170*nl)+s*255;G0=16+ir[1]*F*(70+170*nl)+s*255;B0=24+ir[2]*F*(70+170*nl)+s*255}
mtSet(d,x,y,R0,G0,B0)}
c.putImageData(o,0,0);const lx=120+L[0]*100,ly=60+L[1]*60;circ(c,lx,ly,2,'#ffe066');
mtLab(c,'CLEAR COAT',40,104);mtLab(c,'SHEEN',120,104);mtLab(c,'IRIDESCENCE',200,104);
txt(c,'2 highlights',40,117,'#9fb0c4',7);txt(c,'glowing edges',120,117,'#9fb0c4',7);txt(c,'hue vs angle',200,117,'#9fb0c4',7)}};

/* ---------- MATX-03 Triplanar ---------- */
function mtBrick(u,v){const bh=.22,bw=.44;const row=Math.floor(v/bh);const uu=u+(row&1)*bw*.5;const col=Math.floor(uu/bw);const fu=uu/bw-col,fv=v/bh-row;const m=Math.min(fu,1-fu)*bw,n=Math.min(fv,1-fv)*bh;if(m<.025||n<.025)return [72,64,60];const h=hash(row*17.3+col*5.1);return [150+h*60,82+h*30,62+h*20]}
DEMOS['MATX-03']={d:8,f:(c,t)=>{const o=outData(c),d=o.data;mtBg(d,[44,52,66],[20,24,32]);
const a=t*TAU,ca=Math.cos(a),sa=Math.sin(a),tl=.42,ct=Math.cos(tl),st=Math.sin(tl);const L=mtN3(-.4,.8,-.45);
const cyy=66,r=46;
for(const side of [0,1]){const cx=side?180:60;for(let y=cyy-r;y<=cyy+r;y++)for(let x=cx-r;x<=cx+r;x++){const nx=(x+.5-cx)/r,ny=-(y+.5-cyy)/r,q=nx*nx+ny*ny;if(q>=1)continue;const nz=-Math.sqrt(1-q);
/* view → world: tilt (camera looks down) then orbit about world Y */
const y1=ny*ct-nz*st,z1=ny*st+nz*ct;const wx=nx*ca+z1*sa,wz=-nx*sa+z1*ca,wy=y1;const S=1.35;const px=wx*S,py=wy*S,pz=wz*S;
let col;if(!side){col=mtBrick(px+3,pz+3)}else{let w0=Math.pow(Math.abs(wx),4),w1=Math.pow(Math.abs(wy),4),w2=Math.pow(Math.abs(wz),4);const s=w0+w1+w2;w0/=s;w1/=s;w2/=s;const A=mtBrick(pz+3,py+3),B=mtBrick(px+3,pz+3),C=mtBrick(px+3,py+3);col=[A[0]*w0+B[0]*w1+C[0]*w2,A[1]*w0+B[1]*w1+C[1]*w2,A[2]*w0+B[2]*w1+C[2]*w2]}
const nl=.35+.75*Math.max(0,wx*L[0]+wy*L[1]+wz*L[2]);mtSet(d,x,y,col[0]*nl,col[1]*nl,col[2]*nl)}}
c.putImageData(o,0,0);mtLab(c,'PLANAR (top-down UV)',60,10);mtLab(c,'TRIPLANAR',180,10);txt(c,'stretched sides',60,124,'#ffb070',7);txt(c,'even density',180,124,'#8fe3a0',7)}};

/* ---------- MATX-04 Height blend ---------- */
let mtSplat=null;
function mtSplatInit(){const pw=118,N=pw*H;const sh=new Float32Array(N),sc=new Float32Array(N*3),gh=new Float32Array(N),gc=new Float32Array(N*3);const cs=15;
for(let y=0;y<H;y++)for(let x=0;x<pw;x++){const i=y*pw+x;const gx=Math.floor(x/cs),gy=Math.floor(y/cs);let d1=1e9,d2=1e9,id=0;
for(let j=-1;j<=1;j++)for(let k=-1;k<=1;k++){const ax=gx+k,ay=gy+j;const px=(ax+.2+.6*hash(ax*7.1+ay*13.3))*cs,py=(ay+.2+.6*hash(ax*3.7+ay*29.1+5))*cs;const dd=Math.hypot(x-px,y-py);if(dd<d1){d2=d1;d1=dd;id=ax*31+ay}else if(dd<d2)d2=dd}
const e=mtSat((d2-d1)/9);sh[i]=Math.sqrt(e)*.95;const hv=hash(id*.37),sn=mtVN(x*.5,y*.5,3)*.15;const lit=.55+.45*Math.sqrt(e);sc[i*3]=(120+hv*40)*(lit+sn);sc[i*3+1]=(118+hv*30)*(lit+sn);sc[i*3+2]=(112+hv*25)*(lit+sn);
const bl=mtVN(x*.9,y*.35,9);gh[i]=bl*.55;const gv=.7+.5*bl;gc[i*3]=62*gv;gc[i*3+1]=140*gv;gc[i*3+2]=58*gv}
return mtSplat={pw,sh,sc,gh,gc}}
DEMOS['MATX-04']={d:6,f:(c,t)=>{const S=mtSplat||mtSplatInit();const o=outData(c),d=o.data;mtBg(d,[16,18,24],[16,18,24]);
const b=.5+.36*Math.sin(t*TAU);
for(const side of [0,1]){const ox=side?122:0;for(let y=0;y<H;y++)for(let x=0;x<S.pw;x++){const i=y*S.pw+x;const u=x/S.pw+(mtVN(x*.08,y*.08,21)-.5)*.25;const a=mtSat((u-b)/.36+.5);/* a = grass weight */
let ws,wg;if(!side){ws=1-a;wg=a}else{const vs=S.sh[i]+(1-a),vg=S.gh[i]+a,m=Math.max(vs,vg)-.1;ws=Math.max(vs-m,0);wg=Math.max(vg-m,0);const s=ws+wg;ws/=s;wg/=s}
mtSet(d,ox+x,y,S.sc[i*3]*ws+S.gc[i*3]*wg,S.sc[i*3+1]*ws+S.gc[i*3+1]*wg,S.sc[i*3+2]*ws+S.gc[i*3+2]*wg)}}
c.putImageData(o,0,0);R(c,118,0,4,H,'#0b0d12');mtLab(c,'ALPHA BLEND',59,10);mtLab(c,'HEIGHT BLEND',181,10);
const bx=b*S.pw;R(c,bx-.5,128,1,5,'#ffe066');R(c,122+bx-.5,128,1,5,'#ffe066');txt(c,'mask',bx+12,130,'#ffe066',6)}};

/* ---------- MATX-05 Wet surface ---------- */
const mtHor=40,mtPX=150,mtBase=64,mtTop=24;
DEMOS['MATX-05']={d:8,f:(c,t)=>{const o=outData(c),d=o.data;
const w=mtSS(.06,.38,t)*(1-mtSS(.6,.96,t));const rain=mtSS(.04,.1,t)*(1-mtSS(.52,.6,t));
const rough=lerp(1,.22,w),dark=lerp(1,.55,w),level=w*.5;
for(let y=0;y<H;y++)for(let x=0;x<W;x++){if(y<mtHor){const k=y/mtHor;mtSet(d,x,y,lerp(36,92,k)*(1-.3*rain),lerp(44,98,k)*(1-.3*rain),lerp(70,118,k)*(1-.25*rain));continue}
const dy=y-mtHor+.5,z=260/dy,X=(x-120)*z/120,Z=z;/* ground plane coords */
const tx=X*.5,tz=Z*.5,fx=tx-Math.floor(tx),fz=tz-Math.floor(tz);const grout=(fx<.05||fz<.05);const tv=hash(Math.floor(tx)*7.3+Math.floor(tz)*19.1);
let al=grout?52:96+tv*34+mtVN(X*3,Z*3,4)*20;al*=dark;let r=al,g=al*.96,b=al*.9;
const ht=mtVN(X*.55,Z*.55,11)*.8+mtVN(X*1.7,Z*1.7,12)*.2;const pud=mtSat((level-ht)/.04);
/* glossy lamp reflection: vertical streak, tightens as roughness drops */
const ry=mtBase+(mtBase-mtTop),ex=x-mtPX,ey=y-ry;const sx=1.2+16*rough,sy=sx*(2.2+2.5*(1-rough));const amp=(1.15-rough)*1.1;const spec=amp*Math.exp(-(ex*ex)/(sx*sx)-(ey*ey)/(sy*sy));const fog=mtSat(1-dy/95);
r+=255*spec;g+=225*spec;b+=160*spec;
if(pud>0){const mk=(2*mtHor-y);const sk=mtSat(1-(y-mtHor)/80);let pr=lerp(18,70,sk),pg=lerp(22,78,sk),pb=lerp(34,104,sk);
const ps=Math.exp(-(ex*ex)/2.2-(ey*ey)/40)*1.4;pr+=255*ps;pg+=230*ps;pb+=170*ps;if(Math.abs(ex)<1&&y>mtBase&&y<ry-4){pr*=.35;pg*=.35;pb*=.35}
const rip=rain>0?Math.max(0,Math.sin((Math.hypot(X*3-Math.floor(X*3)-.5,Z*3-Math.floor(Z*3)-.5)*30-t*TAU*24+hash(Math.floor(X*3)+Math.floor(Z*3)*9)*6)))*rain*.15:0;
r=lerp(r,pr*(1+rip),pud);g=lerp(g,pg*(1+rip),pud);b=lerp(b,pb*(1+rip),pud)}
mtSet(d,x,y,lerp(r,60,fog*.35),lerp(g,66,fog*.35),lerp(b,84,fog*.35))}
c.putImageData(o,0,0);
R(c,mtPX-1,mtTop,2,mtBase-mtTop,'#1a1d26');R(c,mtPX-4,mtTop-3,8,4,'#2a2e3a');circ(c,mtPX,mtTop+2,2,'#ffe7a8');
if(rain>0){c.strokeStyle='rgba(190,210,235,'+(.55*rain)+')';c.beginPath();for(let i=0;i<70;i++){const x0=hash(i*3.3)*W,sp=1+hash(i*1.7)*2;const y0=((hash(i*5.1)+t*7*sp)%1)*(H+20)-20;c.moveTo(x0,y0);c.lineTo(x0-1,y0+6)}c.stroke()}
mtLab(c,'wetness '+w.toFixed(2),38,10);bar(c,8,18,60,4,w,'#6fb3e8');txt(c,'roughness '+rough.toFixed(2),38,30,'#e9edf2',6)}};

/* ---------- MATX-06 Dithered transparency ---------- */
let mtTreeImg=null;
function mtTree(){if(mtTreeImg)return mtTreeImg;const k=mk(120,H),g=k.getContext('2d');R(g,55,62,10,40,'#5a3a22');R(g,57,62,3,40,'#6e4a2c');
const blobs=[[60,48,30],[38,58,18],[82,56,20],[60,30,20],[44,38,16],[76,38,16]];for(const[x,y,r]of blobs)circ(g,x,y,r,'#2f7a3a');for(const[x,y,r]of blobs)circ(g,x-3,y-4,r*.7,'#3f9a46');for(let i=0;i<40;i++)R(g,20+hash(i*2.3)*80,18+hash(i*4.1)*60,2,1,'#62b85a');
return mtTreeImg=g.getImageData(0,0,120,H)}
DEMOS['MATX-06']={d:6,f:(c,t)=>{const T=mtTree();
for(const side of [0,1]){const ox=side*120;R(c,ox,0,120,H,P.grass);for(let i=0;i<40;i++)R(c,ox+hash(i*9.1)*118,hash(i*3.7)*H,2,1,P.grass2);R(c,ox,56,120,14,P.dirt);
const hx=ox+12+96*(.5-.5*Math.cos(t*TAU));spr(c,'hero',hx,60,{sx:2,sy:2,flip:Math.sin(t*TAU)<0})}
const g=c.getImageData(0,0,W,H),d=g.data;
/* opacity drops while the hero is under the canopy */
const hxl=12+96*(.5-.5*Math.cos(t*TAU));const near=mtSat(1-Math.abs(hxl-60)/34);const al=1-.68*mtSS(0,1,near);
for(let y=0;y<H;y++)for(let x=0;x<120;x++){const q=(y*120+x)*4;const ta=T.data[q+3];if(!ta)continue;const tr=T.data[q],tg=T.data[q+1],tb=T.data[q+2];
let p=(y*W+x)*4;d[p]=lerp(d[p],tr,al);d[p+1]=lerp(d[p+1],tg,al);d[p+2]=lerp(d[p+2],tb,al);
p=(y*W+x+120)*4;const th=(BAYER4[(y&3)*4+(x&3)]+1)/17;if(al>=th){d[p]=tr;d[p+1]=tg;d[p+2]=tb}}
c.putImageData(g,0,0);R(c,119,0,2,H,'#0b0d12');mtLab(c,'ALPHA BLEND',60,10);mtLab(c,'SCREEN-DOOR (4x4 BAYER)',180,10);mtLab(c,'opacity '+al.toFixed(2),120,126,'#ffe066')}};

/* ---------- MATX-07 Hologram ---------- */
const mtHoloParts=[[120,34,10,11],[120,70,19,24],[101,66,5,16],[139,66,5,16],[112,102,6,12],[128,102,6,12]];
DEMOS['MATX-07']={d:4,f:(c,t)=>{const o=outData(c),d=o.data;mtBg(d,[10,16,26],[6,8,14]);
const fr=Math.floor(t*20),gl=hash(fr*3.7+1)>.78,bob=Math.sin(t*TAU)*1.5;const fl=gl?.6:1;
for(let y=0;y<H;y++){const band=Math.floor(y/7);const sh=gl&&hash(band*5.3+fr*11.1)>.55?Math.round((hash(band*2.9+fr*7.3)-.5)*14):0;
for(let x=0;x<W;x++){let a=0;const sx=x-sh,sy=y-bob;for(const[cx,cy,rx,ry]of mtHoloParts){const nx=(sx+.5-cx)/rx,ny=(sy+.5-cy)/ry,q=nx*nx+ny*ny;if(q<1){const nv=Math.sqrt(1-q);a=Math.max(a,.22+.78*Math.pow(1-nv,2))}}
/* projector cone */
const cone=y>40&&y<120?mtSat(1-Math.abs(x-120)/(8+(120-y)*.5))*mtSat((y-40)/80)*.18:0;
if(a===0&&cone===0)continue;const sl=((Math.floor(sy-t*32)%4)+4)%4<2?1:.45;const v=a*sl*fl;const p=(y*W+x)*4;d[p]=mtC(d[p]+(111*v+60*cone));d[p+1]=mtC(d[p+1]+(240*v+170*cone));d[p+2]=mtC(d[p+2]+(255*v+190*cone))}}
c.putImageData(o,0,0);c.fillStyle='#24384a';c.beginPath();c.ellipse(120,122,26,5,0,0,TAU);c.fill();c.fillStyle='#6ff0ff';c.globalAlpha=.6;c.beginPath();c.ellipse(120,121,14,2,0,0,TAU);c.fill();c.globalAlpha=1;
mtLab(c,'HOLOGRAM',40,12,'#6ff0ff');txt(c,'fresnel edge',40,26,'#9fb0c4',7);txt(c,'scanlines',40,36,'#9fb0c4',7);if(gl)mtLab(c,'GLITCH',200,12,'#ff8fa0')}};

/* ---------- MATX-08 Force field ---------- */
const mtTh=.5,mtCt=Math.cos(mtTh),mtSt=Math.sin(mtTh);const mtFw=[0,-mtSt,mtCt],mtUp=[0,mtCt,mtSt];const mtRs=50,mtBox=[30,0,-16,66,30,16];
function mtRayBox(O,D,b){let t0=-1e9,t1=1e9,ax=0;for(let i=0;i<3;i++){if(Math.abs(D[i])<1e-9){if(O[i]<b[i]||O[i]>b[i+3])return null;continue}let u=(b[i]-O[i])/D[i],v=(b[i+3]-O[i])/D[i];if(u>v){const s=u;u=v;v=s}if(u>t0){t0=u;ax=i}if(v<t1)t1=v;if(t0>t1)return null}return t0>0?[t0,ax]:null}
function mtHex(x,y){const m=(v,k)=>v-k*Math.floor(v/k);let ax=m(x,1)-.5,ay=m(y,1.732)-.866,bx=m(x-.5,1)-.5,by=m(y-.866,1.732)-.866;if(bx*bx+by*by<ax*ax+ay*ay){ax=bx;ay=by}ax=Math.abs(ax);ay=Math.abs(ay);const hd=Math.max(ax*.5+ay*.866,ax);return Math.max(0,1-(.5-hd)/.06)}
const mtHit=mtN3(-.75,.45,-.5);
DEMOS['MATX-08']={d:4,f:(c,t)=>{const o=outData(c),d=o.data;
const rp=mtSat((t-.35)/.45),rr=rp*95,ra=rp>0&&rp<1?(1-rp):0;
for(let y=0;y<H;y++)for(let x=0;x<W;x++){const sx=x+.5-120,sy=92-(y+.5);const O=[sx,sy*mtUp[1]-200*mtFw[1],sy*mtUp[2]-200*mtFw[2]];const D=mtFw;
/* opaque scene: ground y=0 + crate */
let tg=-O[1]/D[1],r,g,b;const bh=mtRayBox(O,D,mtBox);
if(bh&&bh[0]<tg){tg=bh[0];const P0=[O[0]+D[0]*tg,O[1]+D[1]*tg,O[2]+D[2]*tg];const sh=bh[1]===1?1:bh[1]===0?.62:.8;const pl=(Math.floor(P0[1]/6)+Math.floor((P0[0]+P0[2])/12))&1;r=(150+pl*14)*sh;g=(104+pl*10)*sh;b=(60+pl*6)*sh;if(Math.abs((P0[0]-48)%12)<1||P0[1]>29)r*=.7,g*=.7,b*=.7}
else{const P0=[O[0]+D[0]*tg,0,O[2]+D[2]*tg];const ck=(Math.floor(P0[0]/16)+Math.floor(P0[2]/16))&1;const f=mtSat(1-Math.hypot(P0[0],P0[2])/260);r=(40+ck*10)*f+14;g=(46+ck*12)*f+16;b=(60+ck*14)*f+22}
/* shield sphere at origin, radius mtRs (transparent, additive) */
const bq=O[0]*D[0]+O[1]*D[1]+O[2]*D[2],cq=O[0]*O[0]+O[1]*O[1]+O[2]*O[2]-mtRs*mtRs,disc=bq*bq-cq;
if(disc>0){const sq=Math.sqrt(disc);for(const ts of [-bq-sq,-bq+sq]){if(ts>tg)continue;const Pp=[O[0]+D[0]*ts,O[1]+D[1]*ts,O[2]+D[2]*ts];if(Pp[1]<0)continue;const N=[Pp[0]/mtRs,Pp[1]/mtRs,Pp[2]/mtRs];const nv=Math.abs(N[0]*D[0]+N[1]*D[1]+N[2]*D[2]);const front=ts===-bq-sq;
const fres=Math.pow(1-nv,3);const edge=1-mtSat((tg-ts)/7);
const ln=mtHex(Pp[0]/10,(Pp[1]+Pp[2]*.5)/10+t*1.732);const hd=Math.hypot(N[0]-mtHit[0],N[1]-mtHit[1],N[2]-mtHit[2])*mtRs;const rip=ra*Math.exp(-Math.pow((hd-rr)/5,2));
const k=(front?1:.45)*(.06+fres*.85+edge*1.4+ln*.3+rip*(1.2+ln*2));r+=92*k;g+=200*k;b+=255*k}}
mtSet(d,x,y,r,g,b)}
c.putImageData(o,0,0);
/* character inside (drawn after for clarity, tinted by shield) */
spr(c,'hero',120,92,{sx:2,sy:2});R(c,104,64,32,30,'rgba(92,200,255,.10)');
if(t>.2&&t<.36){const k=(t-.2)/.15;const hx=120+mtHit[0]*mtRs,hy=92-(mtHit[1]*mtUp[1]*mtRs+mtHit[2]*mtUp[2]*mtRs);const bx=lerp(-6,hx,k),by=lerp(hy-18,hy,k);R(c,bx-3,by-1,6,2,'#ffb070')}
mtLab(c,'FORCE FIELD',36,10,'#5cc8ff');txt(c,'edge = depth diff',196,10,'#9fb0c4',7);if(ra>0)txt(c,'hit ripple',30,24,'#ffb070',7)}};

/* ---------- MATX-09 Vertex animation texture ---------- */
const mtVC=6,mtVR=4,mtNV=mtVC*mtVR,mtNF=16;const mtVat=[];/* baked offsets, quantised to 8 bits like a texture */
for(let f=0;f<mtNF;f++){const row=[];for(let i=0;i<mtNV;i++){const cI=i%mtVC,rI=Math.floor(i/mtVC);const ph=f/mtNF*TAU-cI*.95+rI*.25;const dy=Math.sin(ph)*cI*1.5,dx=-Math.abs(Math.cos(ph))*cI*.9;row.push([Math.round(dx/12*127)+128,Math.round(dy/12*127)+128])}mtVat.push(row)}
DEMOS['MATX-09']={d:4,f:(c,t)=>{R(c,0,0,W,H,'#161a24');const fF=t*mtNF,f0=Math.floor(fF)%mtNF,f1=(f0+1)%mtNF,fk=fF-Math.floor(fF);
/* texture view: columns = vertices, rows = frames */
const tx=8,ty=30,ts=3;for(let f=0;f<mtNF;f++)for(let i=0;i<mtNV;i++){const v=mtVat[f][i];R(c,tx+i*ts,ty+f*ts,ts,ts,'rgb('+v[0]+','+v[1]+',110)')}
c.strokeStyle='#ffe066';c.lineWidth=1;c.strokeRect(tx-.5,ty+f0*ts-.5,mtNV*ts+1,ts+1);R(c,tx+23*ts,ty-4,ts,2,'#ff6a5a');
txt(c,'u = vertex id',tx+36,ty-10,'#9fb0c4',6);txt(c,'v = frame',tx+36,ty+mtNF*ts+7,'#9fb0c4',6);txt(c,'frame '+(f0+1)+'/'+mtNF,tx+36,ty+mtNF*ts+17,'#ffe066',7);
/* decode positions */
const pts=[];for(let i=0;i<mtNV;i++){const a=mtVat[f0][i],b=mtVat[f1][i];const dx=lerp((a[0]-128)/127*12,(b[0]-128)/127*12,fk),dy=lerp((a[1]-128)/127*12,(b[1]-128)/127*12,fk);const cI=i%mtVC,rI=Math.floor(i/mtVC);pts.push([116+cI*20+dx,38+rI*16+dy])}
R(c,113,30,3,96,'#8a8f99');
for(let rI=0;rI<mtVR-1;rI++)for(let cI=0;cI<mtVC-1;cI++){const a=pts[rI*mtVC+cI],b=pts[rI*mtVC+cI+1],e=pts[(rI+1)*mtVC+cI+1],g=pts[(rI+1)*mtVC+cI];const sl=(b[1]-a[1])/20;const sh=mtSat(.75-sl*.9);c.fillStyle='rgb('+Math.round(200*sh+30)+','+Math.round(60*sh+20)+','+Math.round(60*sh+30)+')';c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.lineTo(e[0],e[1]);c.lineTo(g[0],g[1]);c.closePath();c.fill()}
c.strokeStyle='rgba(233,237,242,.45)';c.beginPath();for(let rI=0;rI<mtVR;rI++)for(let cI=0;cI<mtVC;cI++){const p=pts[rI*mtVC+cI];if(cI<mtVC-1){const q=pts[rI*mtVC+cI+1];c.moveTo(p[0],p[1]);c.lineTo(q[0],q[1])}if(rI<mtVR-1){const q=pts[(rI+1)*mtVC+cI];c.moveTo(p[0],p[1]);c.lineTo(q[0],q[1])}}c.stroke();
for(let i=0;i<mtNV;i++){const p=pts[i];R(c,p[0]-1,p[1]-1,2,2,i===23?'#ff6a5a':'#e9edf2')}
mtLab(c,'VAT (RG = offset)',42,12);mtLab(c,'MESH READS ROW',176,12)}};

/* ---------- MATX-10 X-ray silhouette ---------- */
function mtSlime(g,x,y){g.fillStyle='#4fbf6a';g.beginPath();g.ellipse(x,y-7,11,8,0,Math.PI,0);g.lineTo(x+11,y);g.lineTo(x-11,y);g.fill();R(g,x-11,y-2,22,2,'#2f8a48');R(g,x-5,y-10,3,3,'#141a24');R(g,x+3,y-10,3,3,'#141a24')}
const mtWall=[88,26,154,112];
DEMOS['MATX-10']={d:6,f:(c,t)=>{R(c,0,0,W,H,'#3a4256');R(c,0,96,W,H-96,'#5a5048');for(let i=0;i<30;i++)R(c,hash(i*4.3)*W,98+hash(i*7.7)*36,3,1,'#4a4038');
const hx=20+200*(.5-.5*Math.cos(t*TAU)),sxp=220-200*(.5-.5*Math.cos(t*TAU+1.2));
const A=TMP(),ga=A.getContext('2d');spr(ga,'hero',hx,104,{sx:2,sy:2,flip:Math.sin(t*TAU)<0});const B=TMP2(),gb=B.getContext('2d');mtSlime(gb,sxp,106);
c.drawImage(A,0,0);c.drawImage(B,0,0);
/* wall in front */
R(c,mtWall[0],mtWall[1],mtWall[2]-mtWall[0],mtWall[3]-mtWall[1],'#7a7f8c');for(let r=0;mtWall[1]+r*10<mtWall[3];r++)for(let k=-1;k<7;k++){const x0=mtWall[0]+k*12+(r&1)*6,y0=mtWall[1]+r*10;if(x0>=mtWall[0]&&x0<mtWall[2])R(c,x0,y0,1,Math.min(10,mtWall[3]-y0),'#5e636e');R(c,mtWall[0],y0,mtWall[2]-mtWall[0],1,'#5e636e')}R(c,mtWall[0],mtWall[1],mtWall[2]-mtWall[0],3,'#9aa0ad');
/* silhouette pass: characters drawn again only where the wall is in front (depth GREATER) */
const da=ga.getImageData(0,0,W,H).data,db=gb.getImageData(0,0,W,H).data;const g=c.getImageData(mtWall[0],mtWall[1],mtWall[2]-mtWall[0],mtWall[3]-mtWall[1]),d=g.data,gw=mtWall[2]-mtWall[0];
for(let y=mtWall[1];y<mtWall[3];y++)for(let x=mtWall[0];x<mtWall[2];x++){const q=(y*W+x)*4,p=((y-mtWall[1])*gw+(x-mtWall[0]))*4;for(const[src,col]of[[da,[74,168,255]],[db,[255,90,74]]]){if(!src[q+3])continue;const edge=!src[q+3-4]||!src[q+3+4]||!src[q+3-W*4]||!src[q+3+W*4];const k=edge?.95:.6;const cc=edge?[col[0]*.4+153,col[1]*.4+153,col[2]*.4+153]:col;d[p]=lerp(d[p],cc[0],k);d[p+1]=lerp(d[p+1],cc[1],k);d[p+2]=lerp(d[p+2],cc[2],k)}}
c.putImageData(g,mtWall[0],mtWall[1]);mtLab(c,'X-RAY SILHOUETTE',121,12);txt(c,'ally',30,20,'#4aa8ff',7);txt(c,'enemy',210,20,'#ff5a4a',7)}};
})();
