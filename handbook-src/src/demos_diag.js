/* ===== DIAG demos (畫面問題診斷) — software rendering into ImageData, everything local to this IIFE ===== */
(()=>{
const enc=x=>{x=clamp(x);return x<=.0031308?12.92*x:1.055*Math.pow(x,1/2.4)-.055};
const dec=x=>x<=.04045?x/12.92:Math.pow((x+.055)/1.055,2.4);
let IDc=null;const img=c=>IDc||(IDc=c.createImageData(W,H));
const put=(d,x,y,r,g,b)=>{const j=(y*W+x)*4;d[j]=r*255;d[j+1]=g*255;d[j+2]=b*255;d[j+3]=255};
const clr=(d,col=[11,15,22])=>{for(let i=0;i<d.length;i+=4){d[i]=col[0];d[i+1]=col[1];d[i+2]=col[2];d[i+3]=255}};
const tag=(c,s,x,y,col='#e9edf2')=>{c.font='bold 7px monospace';const w=Math.ceil(c.measureText(s).width)+6;R(c,x-w/2,y-5,w,10,'rgba(0,0,0,.6)');txt(c,s,x,y,col,7)};

/* DIAG-01 Premultiplied alpha: magnified smoke texel grid, straight vs premultiplied filtering */
let smk=null;
function smkTex(){const N=16,a=new Float32Array(N*N),rgb=new Float32Array(N*N*3);for(let y=0;y<N;y++)for(let x=0;x<N;x++){const dx=(x+.5-N/2)/(N/2),dy=(y+.5-N/2)/(N/2),r=Math.hypot(dx,dy)+(hash(x*31+y*17)-.5)*.25;const al=r<.62?1:r<.8?(.8-r)/.18:0;const i=y*N+x;a[i]=al>.06?al:0;const v=.92-.12*hash(x*7+y*13);rgb[i*3]=a[i]>0?v:0;rgb[i*3+1]=a[i]>0?v:0;rgb[i*3+2]=a[i]>0?v*1.02:0}return{N,a,rgb}}
DEMOS['DIAG-01']={d:6,f:(c,t)=>{const T=smk||(smk=smkTex()),id=img(c),d=id.data;clr(d);const N=T.N;
const sc=4.2+1.4*Math.sin(t*TAU),rot=t*TAU*.25,cs=Math.cos(rot),sn=Math.sin(rot);
const samp=(u,v,pm)=>{u-=.5;v-=.5;const x0=Math.floor(u),y0=Math.floor(v),fx=u-x0,fy=v-y0;let A=0,r=0,g=0,b=0;for(const[ox,oy,w]of[[0,0,(1-fx)*(1-fy)],[1,0,fx*(1-fy)],[0,1,(1-fx)*fy],[1,1,fx*fy]]){const xx=x0+ox,yy=y0+oy;if(xx<0||yy<0||xx>=N||yy>=N)continue;const i=yy*N+xx,al=T.a[i],k=pm?al:1;A+=al*w;r+=T.rgb[i*3]*k*w;g+=T.rgb[i*3+1]*k*w;b+=T.rgb[i*3+2]*k*w}return[r,g,b,A]};
for(let p=0;p<2;p++){const ox=p*120,cx=ox+60,cy=62;for(let y=14;y<112;y++)for(let x=ox+4;x<ox+116;x++){
const band=.5+.5*Math.sin((x*.06+y*.03)-t*TAU),bg=[.55+.35*band,.68+.25*band,.85+.12*band];
const lx=(x-cx)/sc,ly=(y-cy)/sc,u=cs*lx+sn*ly+N/2,v=-sn*lx+cs*ly+N/2;const s=samp(u,v,p===1);
let o;if(p===0)o=[s[0]*s[3]+bg[0]*(1-s[3]),s[1]*s[3]+bg[1]*(1-s[3]),s[2]*s[3]+bg[2]*(1-s[3])];else o=[s[0]+bg[0]*(1-s[3]),s[1]+bg[1]*(1-s[3]),s[2]+bg[2]*(1-s[3])];put(d,x,y,clamp(o[0]),clamp(o[1]),clamp(o[2]))}}
c.putImageData(id,0,0);tag(c,'STRAIGHT alpha + filtering',60,7,P.red);tag(c,'PREMULTIPLIED (rgb x a)',180,7,P.cyan);
txt(c,'dark fringe = filtered black rgb',60,120,'#ffb3a8',6);txt(c,'out = src + dst x (1 - a)',180,120,'#bff3ec',6);txt(c,'scale '+sc.toFixed(1)+'x',120,128,'#9aa6b8',6);tl(c,t,[])}};

/* DIAG-02 Linear workflow: light falloff + overlap, and colour gradients, gamma-space vs linear */
DEMOS['DIAG-02']={d:8,f:(c,t)=>{const id=img(c),d=id.data;clr(d);const sp=10+8*Math.sin(t*TAU);
const L=[[-sp,[1,.62,.3]],[sp,[.3,.62,1]]];
for(let p=0;p<2;p++){const ox=p*120,cx=ox+60;for(let y=13;y<66;y++)for(let x=ox+3;x<ox+117;x++){let r=0,g=0,b=0;for(const[dx,col]of L){const dd=Math.hypot(x-(cx+dx),y-40),f=1.7/(1+(dd/13)*(dd/13));r+=col[0]*f;g+=col[1]*f;b+=col[2]*f}
if(p===0){const a=.5;put(d,x,y,clamp(a*r),clamp(a*g),clamp(a*b))}else{const a=dec(.5);put(d,x,y,enc(a*r),enc(a*g),enc(a*b))}}}
const hs=[[[1,0,0],[0,1,0]],[[0,.2,1],[1,.85,0]],[[1,0,.5],[0,.9,.9]]],k=t*3,i0=Math.floor(k)%3,i1=(i0+1)%3,fk=ease(clamp((k%1-.7)/.3));
const A=[0,1,2].map(j=>lerp(hs[i0][0][j],hs[i1][0][j],fk)),B=[0,1,2].map(j=>lerp(hs[i0][1][j],hs[i1][1][j],fk));
for(let x=8;x<232;x++){const f=(x-8)/223;const gm=[0,1,2].map(j=>lerp(A[j],B[j],f)),ln=[0,1,2].map(j=>enc(lerp(dec(A[j]),dec(B[j]),f)));for(let y=84;y<97;y++)put(d,x,y,gm[0],gm[1],gm[2]);for(let y=108;y<121;y++)put(d,x,y,ln[0],ln[1],ln[2])}
c.putImageData(id,0,0);tag(c,'GAMMA-SPACE math',60,7,P.red);tag(c,'LINEAR math + sRGB out',180,7,P.cyan);
txt(c,'hard falloff, overlap clips',60,71,'#ffb3a8',6);txt(c,'soft falloff, overlap adds',180,71,'#bff3ec',6);
txt(c,'lerp in sRGB values: dark muddy middle',120,79,'#ffb3a8',6);txt(c,'lerp in linear, encode once: even middle',120,104,'#bff3ec',6);R(c,119,84,2,13,'rgba(0,0,0,.6)');R(c,119,108,2,13,'rgba(0,0,0,.6)');tl(c,t,[])}};

/* DIAG-03 Mipmapping + anisotropic: analytic box-filtered checker floor */
const F2=x=>{const m=((x%2)+2)%2;return 1-Math.abs(m-1)};
const sqf=(x,w)=>w<1e-3?((((Math.floor(x))%2)+2)%2?-1:1):(F2(x+w/2)-F2(x-w/2))/w;
DEMOS['DIAG-03']={d:8,f:(c,t)=>{const id=img(c),d=id.data;clr(d);const hz=30,scroll=t*16,yaw=.18*Math.sin(t*TAU);const cs=Math.cos(yaw),sn=Math.sin(yaw);
const modes=['point','tri','aniso'];
for(let p=0;p<3;p++){const ox=p*80,cx=ox+40;for(let y=14;y<118;y++){const sy=y-hz+.5;if(sy<=0){for(let x=ox+2;x<ox+78;x++)put(d,x,y,.42,.55,.72);continue}
const z=60/sy,dz=60/(sy*sy);for(let x=ox+2;x<ox+78;x++){const sx=(x-cx+.5)*.035*z;let u=cs*sx-sn*z*1.2,v=sn*sx+cs*z*1.2+scroll;
let fu=.035*z,fv=dz*1.2;let val;if(p===0){const jx=(hash(x*7+y*131)-.5)*0,uu=u+jx;val=sqf(uu*2,0)*sqf(v*2,0)}else if(p===1){const w=Math.max(fu,fv)*2*1.0;val=sqf(u*2,w)*sqf(v*2,w)}else{let wu=fu*2,wv=fv*2;const mx=Math.max(wu,wv),mn=Math.max(Math.min(wu,wv),mx/16);if(wu<wv)wu=mn;else wv=mn;val=sqf(u*2,wu)*sqf(v*2,wv)}
const fog=clamp((z-1)/30),g=.5+.42*val;put(d,x,y,lerp(g*.95,.42,fog*.6),lerp(g,.55,fog*.6),lerp(g*.9,.72,fog*.6))}}}
c.putImageData(id,0,0);tag(c,'POINT, no mips',40,7,P.red);tag(c,'TRILINEAR mips',120,7,P.gold);tag(c,'+ ANISO 16x',200,7,P.cyan);
txt(c,'shimmer / moire',40,124,'#ffb3a8',6);txt(c,'stable, far blurs',120,124,'#ffe49a',6);txt(c,'stable and sharp',200,124,'#bff3ec',6);R(c,79,12,2,108,P.ink);R(c,159,12,2,108,P.ink);tl(c,t,[])}};

/* DIAG-04 HDR order: clamp-early + UI before exposure vs float HDR -> tonemap -> sRGB -> UI */
const aces=x=>clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14));
DEMOS['DIAG-04']={d:8,f:(c,t)=>{const id=img(c),d=id.data;clr(d);const I=.6+7.4*ease(clamp(t<.5?t/.4:(1-t)/.4));const ex=1/(1+.22*I);
for(let p=0;p<2;p++){const ox=p*120,cx=ox+60,cy=60;for(let y=13;y<108;y++)for(let x=ox+3;x<ox+117;x++){const r2=((x-cx)**2+(y-cy)**2);const e=Math.exp(-r2/(2*13*13)),core=Math.exp(-r2/(2*5*5));
const amb=[.05,.06,.09].map(v=>v*(1+.3*Math.sin(x*.2+y*.15)));let L=[amb[0]+I*(e*1+core*.9),amb[1]+I*(e*.45+core*.85),amb[2]+I*(e*.12+core*.7)];
let o;if(p===0){o=L.map(v=>clamp(v)*ex*1.9).map(v=>clamp(v))}else{o=L.map(v=>enc(aces(v*ex*1.2)))}put(d,x,y,o[0],o[1],o[2])}}
c.putImageData(id,0,0);
for(let p=0;p<2;p++){const ox=p*120;bar(c,ox+10,96,50,5,.72,P.red);txt(c,'HP',ox+66,98,'#ffffff',6,'left');R(c,ox+8,18,40,9,'rgba(0,0,0,.5)');txt(c,'SCORE 120',ox+28,22,'#ffffff',6);if(p===0){const a=1-clamp(ex*1.9);R(c,ox+7,93,72,11,'rgba(0,0,0,'+(a*.9)+')');R(c,ox+7,17,42,11,'rgba(0,0,0,'+(a*.9)+')')}}
tag(c,'CLAMP EARLY, UI DIMS',60,7,P.red);tag(c,'HDR>TONEMAP>sRGB>UI',180,7,P.cyan);
txt(c,'flat white blob, HUD dims',60,114,'#ffb3a8',6);txt(c,'white-to-orange core, HUD steady',180,114,'#bff3ec',6);txt(c,'intensity '+I.toFixed(1)+'  exposure '+ex.toFixed(2),120,124,'#9aa6b8',6);tl(c,t,[.4,.6])}};
})();
/* ===== round 2: DIAG-05..10 — own IIFE, local helpers prefixed dg ===== */
(()=>{
let dgID=null;const dgImg=c=>dgID||(dgID=c.createImageData(W,H));
const dgPut=(d,x,y,r,g,b)=>{const j=(y*W+x)*4;d[j]=r*255;d[j+1]=g*255;d[j+2]=b*255;d[j+3]=255};
const dgClr=(d,v=[11,15,22])=>{for(let i=0;i<d.length;i+=4){d[i]=v[0];d[i+1]=v[1];d[i+2]=v[2];d[i+3]=255}};
const dgTag=(c,s,x,y,col='#e9edf2')=>{c.font='bold 7px monospace';const w=Math.ceil(c.measureText(s).width)+6;R(c,x-w/2,y-5,w,10,'rgba(0,0,0,.6)');txt(c,s,x,y,col,7)};
const dgN=(x,y,z)=>{const l=Math.hypot(x,y,z)||1;return[x/l,y/l,z/l]};
const dgDot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];

/* DIAG-05 Z-fighting: perspective ground with a coplanar road decal; left = low precision far away, right = reversed-Z float */
DEMOS['DIAG-05']={d:8,f:(c,t)=>{const id=dgImg(c),d=id.data;dgClr(d);const hz=34,scroll=t*24,camX=1.2*Math.sin(t*TAU);
for(let p=0;p<2;p++){const x0=p*120+2,pw=116;
for(let y=12;y<H-8;y++){for(let x=x0;x<x0+pw;x++){let r,g,b;
if(y<=hz){const k=(hz-y)/22;r=.38+.2*k;g=.5+.2*k;b=.68+.15*k}else{const z=70/(y-hz);const wx=(x-x0-pw/2)*z/58+camX,wz=z+scroll;
const ck=((Math.floor(wx*.5)+Math.floor(wz*.5))&1)?.04:0;r=.24+ck;g=.42+ck;b=.22+ck;
const road=Math.abs(wx)<2.2;if(road){let show=true;if(p===0){const f=clamp((z-3.5)/5);if(f>0){const s=Math.sin(wx*2.3+wz*1.1+t*TAU)+.7*Math.sin(wz*.41-t*TAU*.5+wx*.8);show=s>-1.7+3.4*f*.5+.0}}
if(show){const dash=Math.abs(wx)<.12&&(Math.floor(wz*.5)&1);r=dash?.82:.46;g=dash?.78:.45;b=dash?.6:.47}}
const fog=clamp((z-6)/60)*.55;r=lerp(r,.5,fog);g=lerp(g,.62,fog);b=lerp(b,.74,fog)}
dgPut(d,x,y,r,g,b)}}}
c.putImageData(id,0,0);
dgTag(c,'near 0.01 · D24 standard Z',60,6,'#ffb3a8');dgTag(c,'reversed-Z · D32F',180,6,P.cyan);
txt(c,'far road fights the ground',60,H-5,'#ffb3a8',6);txt(c,'stable to the horizon',180,H-5,P.cyan,6);R(c,119,10,2,H-16,'#0b0f16')}};

/* DIAG-06 Alpha-to-coverage: magnified pixel grid of a leaf edge, 1 sample (alpha test) vs 4-sample coverage */
const dg06S=[[-.375,-.125],[.125,-.375],[.375,.125],[-.125,.375]];
const dg06leaf=(u,v,t)=>{const a=t*TAU*.25,cs=Math.cos(a),sn=Math.sin(a);const x=u*cs+v*sn,y=-u*sn+v*cs;const e=(x/8.5)**2+(y/4.6)**2;const notch=Math.abs(y)<.9&&x>3;return e<1&&!notch};
DEMOS['DIAG-06']={d:8,f:(c,t)=>{R(c,0,0,W,H,'#151b25');const cs=5,N=22;
[[6,0,'ALPHA TEST (1 sample)'],[126,1,'ALPHA-TO-COVERAGE 4x']].forEach(([x0,on,lab])=>{const y0=14,ox=.6*Math.sin(t*TAU*.5),oy=.4*Math.cos(t*TAU*.5);
for(let j=0;j<N;j++)for(let i=0;i<N;i++){const u=i+.5-N/2+ox,v=j+.5-N/2+oy;let cov;if(!on)cov=dg06leaf(u,v,t)?1:0;else{cov=0;for(const[sx,sy]of dg06S)cov+=dg06leaf(u+sx,v+sy,t)?.25:0}
const r=lerp(.62,.2,cov),g=lerp(.74,.55,cov),b=lerp(.86,.24,cov);R(c,x0+i*cs,y0+j*cs,cs-.4,cs-.4,'rgb('+(r*255|0)+','+(g*255|0)+','+(b*255|0)+')')}
dgTag(c,lab,x0+55,7,on?P.cyan:'#ffb3a8')});
txt(c,'hard 0/1 steps, shimmer when moving',61,128,'#ffb3a8',6);txt(c,'0 · 25 · 50 · 75 · 100 % steps',181,128,P.cyan,6)}};

/* DIAG-07 Detail normal blending: linear add vs RNM on a large dome with fine grooves, rotating light */
DEMOS['DIAG-07']={d:8,f:(c,t)=>{const id=dgImg(c),d=id.data;dgClr(d,[18,22,30]);const la=t*TAU;const L=dgN(Math.cos(la)*.85,Math.sin(la)*.85,.4);
for(let p=0;p<2;p++){const x0=p*120+6,y0=14,pw=108,ph=104;
for(let y=0;y<ph;y++)for(let x=0;x<pw;x++){const u=(x-pw/2)/(pw/2),v=(y-ph/2)/(ph/2);
const r2=u*u+v*v,k=1.5*Math.exp(-r2*2.4);const n1=dgN(u*k*2,v*k*2,1);
const gx=.8*Math.cos(x*.55),gy=.0;const n2=dgN(gx,gy,1);let n;
if(p===0)n=dgN(n1[0]+n2[0],n1[1]+n2[1],n1[2]+n2[2]);else{const T=[n1[0],n1[1],n1[2]+1],U=[-n2[0],-n2[1],n2[2]];const dd=dgDot(T,U);n=dgN(T[0]*dd/T[2]-U[0],T[1]*dd/T[2]-U[1],T[2]*dd/T[2]-U[2])}
const df=Math.max(0,dgDot(n,L));const s=.12+.8*df;dgPut(d,x0+x,y0+y,s*.86,s*.62,s*.46)}}
c.putImageData(id,0,0);dgTag(c,'LINEAR  normalize(n1+n2)',60,7,'#ffb3a8');dgTag(c,'RNM (reoriented)',180,7,P.cyan);
txt(c,'dome + grooves both flattened',60,126,'#ffb3a8',6);txt(c,'full dome + full grooves',180,126,P.cyan,6)}};

/* DIAG-08 Box-projected cubemap: side section of a room; infinite lookup vs box-projected lookup */
const dg08box=(o,dir,b)=>{let tm=1e9;for(let a=0;a<2;a++){if(Math.abs(dir[a])<1e-6)continue;const t1=(b[a]-o[a])/dir[a],t2=(b[a+2]-o[a])/dir[a];tm=Math.min(tm,Math.max(t1,t2))}return[o[0]+dir[0]*tm,o[1]+dir[1]*tm]};
DEMOS['DIAG-08']={d:8,f:(c,t)=>{R(c,0,0,W,H,'#161c27');const B=[16,16,150,112];/* minx,miny,maxx,maxy */
R(c,B[0],B[1],B[2]-B[0],B[3]-B[1],'#283244');R(c,B[0],B[3],B[2]-B[0],2,'#8fa3bf');
const lamp=[66,92];R(c,lamp[0],B[1],lamp[1]-lamp[0],3,P.gold);txt(c,'lamp',79,22,P.gold,6);
const win=[40,70];R(c,B[0],win[0],3,win[1]-win[0],'#8fd3ff');
const probe=[83,64];ring(c,probe[0],probe[1],3,1,'#cfd6e2');txt(c,'probe',probe[0],probe[1]+8,'#cfd6e2',6);
const P0=[104,B[3]];const cam=[lerp(126,40,cmT(t)),40+18*Math.sin(t*TAU)];
const V=[P0[0]-cam[0],P0[1]-cam[1]],l=Math.hypot(V[0],V[1]);const Rv=[V[0]/l,-V[1]/l];
const hb=dg08box(P0,Rv,B),hi=dg08box(probe,Rv,B);
const what=h=>h[1]<=B[1]+.5&&h[0]>=lamp[0]&&h[0]<=lamp[1]?['lamp',P.gold]:h[0]<=B[0]+.5&&h[1]>=win[0]&&h[1]<=win[1]?['window','#8fd3ff']:['wall','#6a7890'];
const linec=(a,b,col,dash)=>{c.save();c.strokeStyle=col;c.lineWidth=1.2;if(dash)c.setLineDash([3,2]);c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.stroke();c.restore()};
linec(cam,P0,'rgba(255,255,255,.55)');linec(P0,hb,P.cyan);linec(probe,hi,'#ff8a7a',true);
circ(c,hb[0],hb[1],2.5,P.cyan);circ(c,hi[0],hi[1],2.5,'#ff8a7a');circ(c,P0[0],P0[1],2,'#fff');
c.fillStyle='#e9edf2';c.beginPath();c.arc(cam[0],cam[1],4,0,TAU);c.fill();txt(c,'eye',cam[0],cam[1]-8,'#e9edf2',6);
const wb=what(hb),wi=what(hi);
txt(c,'floor shows:',196,22,'#9aa6b8',6);
R(c,160,30,72,26,'#1f2633');R(c,163,33,12,12,wi[1]);txt(c,'infinite',205,37,'#ff8a7a',6);txt(c,wi[0],205,47,wi[1],6);
R(c,160,62,72,26,'#1f2633');R(c,163,65,12,12,wb[1]);txt(c,'box-proj.',205,69,P.cyan,6);txt(c,wb[0],205,79,wb[1],6);
dgTag(c,wb[0]===wi[0]?'agree':'MISMATCH → reflection slides',196,100,wb[0]===wi[0]?'#cfd6e2':'#ffb3a8');
txt(c,'dashed = probe lookup (no box)',83,124,'#ff8a7a',5);txt(c,'solid = surface→box',196,124,P.cyan,5)}};
const cmT=t=>.5-.5*Math.cos(t*TAU);

/* DIAG-09 Planar reflection vs SSR: tall tower partly off the top of the screen, walker leaving the edge */
const dg09scene=(c,x0,w,t)=>{const hz=60,th=lerp(30,64,.5-.5*Math.cos(t*TAU)),wx=x0+lerp(w-20,-6,t);
R(c,x0+w*.55,hz-th,14,th,'#c98b5a');R(c,x0+w*.55+3,hz-th+4,3,4,'#ffe08a');R(c,x0+w*.55+3,hz-th+16,3,4,'#ffe08a');
circ(c,x0+w*.2,hz-28,7,'#e8eef8');circ(c,x0+w*.3,6+3*Math.sin(t*TAU*2),5,'#ff8a7a');R(c,x0+w*.3-.5,10+3*Math.sin(t*TAU*2),1,8,'#ddd');
R(c,wx-3,hz-14,6,10,P.cyan);circ(c,wx,hz-17,3,P.skin);R(c,wx-3,hz-4,2,4,'#2f8a80');R(c,wx+1,hz-4,2,4,'#2f8a80');return hz};
DEMOS['DIAG-09']={d:9,f:(c,t)=>{R(c,0,0,W,H,'#151b25');const top=14;
[[2,0,'SCREEN-SPACE REFLECTION'],[122,1,'PLANAR REFLECTION']].forEach(([x0,on,lab])=>{const w=116;
c.save();c.beginPath();c.rect(x0,top,w,H-top-10);c.clip();
const hz=60;const g=c.createLinearGradient(0,top,0,hz);g.addColorStop(0,'#5a78a8');g.addColorStop(1,'#a9c2dd');c.fillStyle=g;c.fillRect(x0,top,w,hz-top);
dg09scene(c,x0,w,t);R(c,x0,hz,w,H-hz,'#24425e');
c.save();c.beginPath();c.rect(x0,hz,w,H-hz);c.clip();c.translate(0,2*hz);c.scale(1,-1);c.globalAlpha=.55;
if(!on){c.beginPath();c.rect(x0,top,w,hz-top);c.clip()}
dg09scene(c,x0,w,t);c.restore();
if(!on){const g2=c.createLinearGradient(0,2*hz-top-14,0,2*hz-top);g2.addColorStop(0,'rgba(36,66,94,0)');g2.addColorStop(1,'rgba(36,66,94,1)');c.fillStyle=g2;c.fillRect(x0,2*hz-top-14,w,14);c.fillStyle='#24425e';c.fillRect(x0,2*hz-top,w,H)}
for(let y=hz+2;y<H;y+=4)R(c,x0,y+Math.sin(y*.7+t*TAU)*.5,w,1,'rgba(255,255,255,.06)');
c.restore();R(c,x0,top,w,1,'rgba(255,255,255,.3)');dgTag(c,lab,x0+w/2,7,on?P.cyan:'#ffb3a8')});
txt(c,'off-screen parts missing in reflection',60,H-4,'#ffb3a8',5);txt(c,'mirrored camera renders everything',180,H-4,P.cyan,5)}};

/* DIAG-10 Specular AA: glossy bumpy cylinder, 1 sample per pixel; left = no AA (sparkles), right = roughness widened by normal variance */
DEMOS['DIAG-10']={d:10,f:(c,t)=>{const id=dgImg(c),d=id.data;dgClr(d,[14,18,26]);const zoom=lerp(1,3.2,.5-.5*Math.cos(t*TAU)),pan=t*6;
const la=.5*Math.sin(t*TAU);const Lv=dgN(Math.sin(la)*.5,-.45,.75),V=[0,0,1],Hh=dgN(Lv[0]+V[0],Lv[1]+V[1],Lv[2]+V[2]);
const amp=.22;
for(let p=0;p<2;p++){const x0=p*120+4,pw=112,y0=16,ph=100;
for(let y=0;y<ph;y++){const v=(y-ph/2)/(ph/2);const cyl=[0,v*.95,Math.sqrt(Math.max(.02,1-v*v*.9))];
for(let x=0;x<pw;x++){const u=(x+pan*8)*zoom*.55,w2=y*zoom*.55;
const fx=amp*(Math.sin(u*1.7+w2*.3)+.6*Math.sin(u*.9-w2*2.1+1.3)),fy=amp*(Math.cos(w2*1.9-u*.4)+.6*Math.sin(w2*.7+u*1.3));
const fr=zoom*.55,att=p===1?1/(1+fr*fr*2.5):1;const n=dgN(cyl[0]+fx*att,cyl[1]+fy*att,cyl[2]);
let a2=.004;if(p===1){const vr=amp*amp*1.6*(1-att*att);a2=clamp(a2+Math.min(vr,.18),0,1)}
const nh=Math.max(0,dgDot(n,Hh)),dd=nh*nh*(a2-1)+1;const spec=.55*(a2*a2/(dd*dd));
const df=Math.max(0,dgDot(n,Lv))*.28+.06;const r=df*.75+spec,g=df*.78+spec,b=df*.86+spec;dgPut(d,x0+x,y0+y,r,g,b)}}}
c.putImageData(id,0,0);dgTag(c,'NO SPECULAR AA',60,8,'#ffb3a8');dgTag(c,'SPECULAR AA ON',180,8,P.cyan);
txt(c,'sparkles crawl as it shrinks',60,H-6,'#ffb3a8',6);txt(c,'wider, stable highlight',180,H-6,P.cyan,6);txt(c,'detail scale ×'+zoom.toFixed(1),120,H-14,'#9aa6b8',5)}};
})();
