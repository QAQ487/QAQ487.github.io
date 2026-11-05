/* ===== LGT demos — original procedural lighting diagrams (per-pixel where light matters) ===== */
(()=>{
const lgSat=v=>v<0?0:v>1?1:v;
const lgSS=(a,b,x)=>{const k=lgSat((x-a)/(b-a));return k*k*(3-2*k)};
function lgLab(c,s,x,y,col='#e9edf2'){const ww=Math.ceil(s.length*4.3);R(c,x-ww/2-2,y-5,ww+4,10,'rgba(10,14,22,.78)');label(c,s,x,y,col)}
/* segment (x0,y0)-(x1,y1) vs box [x0,y0,x1,y1] */
function lgSegBox(ax,ay,bx,by,b){let t0=0,t1=1;const dx=bx-ax,dy=by-ay;if(Math.abs(dx)<1e-9){if(ax<b[0]||ax>b[2])return false}else{let u=(b[0]-ax)/dx,v=(b[2]-ax)/dx;if(u>v){const s=u;u=v;v=s}if(u>t0)t0=u;if(v<t1)t1=v;if(t0>t1)return false}if(Math.abs(dy)<1e-9){if(ay<b[1]||ay>b[3])return false}else{let u=(b[1]-ay)/dy,v=(b[3]-ay)/dy;if(u>v){const s=u;u=v;v=s}if(u>t0)t0=u;if(v<t1)t1=v;if(t0>t1)return false}return true}
/* periodic smooth 1D value noise: n cells per loop, t in [0,1) */
function lgPN(t,n,seed){const f=((t%1)+1)%1*n,i=Math.floor(f),k=f-i,s=k*k*(3-2*k);return lerp(hash(seed+(i%n)*13.1),hash(seed+((i+1)%n)*13.1),s)}
function lgPut(c,fn){const o=outData(c),d=o.data;for(let y=0;y<H;y++)for(let x=0;x<W;x++){const p=(y*W+x)*4,r=fn(x,y);d[p]=r[0];d[p+1]=r[1];d[p+2]=r[2];d[p+3]=255}c.putImageData(o,0,0)}
const lgFloor=(x,y)=>(((x>>3)+(y>>3))&1)?[118,122,132]:[104,108,118];

/* LGT-01 directional / point / spot */
DEMOS['LGT-01']={d:6,f:(c,t)=>{const a=t*TAU;const boxes=[0,1,2].map(i=>[i*80+34,58,i*80+46,70]);
const dir=[Math.cos(a*1+.6),Math.sin(a*1+.6)],pl=[40+80+Math.cos(a)*24,64+Math.sin(a)*30],sp=[200,20],sa=Math.PI/2+Math.sin(a)*.7,cosIn=Math.cos(.22),cosOut=Math.cos(.36);
const o=outData(c),d=o.data;for(let y=0;y<H;y++)for(let x=0;x<W;x++){const pn=Math.floor(x/80);const b=boxes[pn];let L=0,col=[255,240,214];
if(pn===0){if(!lgSegBox(x+.5,y+.5,x+.5-dir[0]*200,y+.5-dir[1]*200,b))L=.85}
else if(pn===1){const dx=pl[0]-x,dy=pl[1]-y,dd=Math.hypot(dx,dy);const at=lgSat(1-Math.pow(dd/60,4));L=at*at/(1+dd*dd/500)*1.6;if(L>0&&lgSegBox(x+.5,y+.5,pl[0],pl[1],b))L=0;col=[255,196,120]}
else{const dx=x-sp[0],dy=y-sp[1],dd=Math.hypot(dx,dy)+1e-6;const cs=(dx*Math.cos(sa)+dy*Math.sin(sa))/dd;const cone=lgSS(cosOut,cosIn,cs);const at=lgSat(1-Math.pow(dd/140,4));L=cone*at*1.1;if(L>0&&lgSegBox(x+.5,y+.5,sp[0],sp[1],b))L=0;col=[220,236,255]}
const f=lgFloor(x,y),amb=.18,p=(y*W+x)*4;d[p]=Math.min(255,f[0]*(amb+L*col[0]/255*1.2));d[p+1]=Math.min(255,f[1]*(amb+L*col[1]/255*1.2));d[p+2]=Math.min(255,f[2]*(amb+L*col[2]/255*1.2));d[p+3]=255}
c.putImageData(o,0,0);for(const b of boxes){R(c,b[0],b[1],b[2]-b[0],b[3]-b[1],P.woodD);R(c,b[0]+1,b[1]+1,b[2]-b[0]-2,b[3]-b[1]-2,P.wood)}R(c,79,0,2,H,P.ink);R(c,159,0,2,H,P.ink);
/* glyphs */for(let i=-2;i<=2;i++){const ox=40+i*12-dir[0]*28,oy=64+i*0-dir[1]*28;}
c.strokeStyle=P.gold;c.lineWidth=1;for(let i=-1;i<=1;i++){const px=40-dir[0]*45-dir[1]*i*10,py=64-dir[1]*45+dir[0]*i*10;c.beginPath();c.moveTo(px,py);c.lineTo(px+dir[0]*12,py+dir[1]*12);c.stroke()}
circ(c,pl[0],pl[1],3,'#fff3c0');circ(c,sp[0],sp[1],3,'#e8f2ff');c.strokeStyle='rgba(232,242,255,.5)';for(const s of[-.36,.36]){c.beginPath();c.moveTo(sp[0],sp[1]);c.lineTo(sp[0]+Math.cos(sa+s)*40,sp[1]+Math.sin(sa+s)*40);c.stroke()}
lgLab(c,'DIRECTIONAL',40,8,P.gold);lgLab(c,'POINT',120,8,P.orange);lgLab(c,'SPOT',200,8,P.cyan);
lgLab(c,'parallel',40,127);lgLab(c,'radial',120,127);lgLab(c,'cone',200,127)}};

/* LGT-02 attenuation curves */
const lgCurves=[['LINEAR',d=>lgSat(1-d/70),P.gold],['INVERSE-SQUARE',d=>1/(1+d*d/120),P.orange],['WINDOWED',d=>{const w=lgSat(1-Math.pow(d/70,4));return w*w/(1+d*d/120)},P.cyan]];
DEMOS['LGT-02']={d:6,f:(c,t)=>{const lx=40+70*(.5-.5*Math.cos(t*TAU));const o=outData(c),dt=o.data;for(let y=0;y<H;y++){const k=Math.floor(y/45),ly=k*45+24;const fn=lgCurves[k][1];for(let x=0;x<W;x++){const dd=Math.hypot(x-lx,(y-ly)*1.6);let L=fn(dd);const q=(((x>>2)+(y>>2))&1)?1:.9;const p=(y*W+x)*4;dt[p]=Math.min(255,(22+225*L)*q);dt[p+1]=Math.min(255,(26+175*L)*q);dt[p+2]=Math.min(255,(40+100*L)*q);dt[p+3]=255}}c.putImageData(o,0,0);
for(let k=0;k<3;k++){const y0=k*45,ly=y0+24;R(c,0,y0+44,W,1,P.ink);circ(c,lx,ly,2.5,'#fff');R(c,Math.round(lx+70),ly-3,1,6,'rgba(255,255,255,.5)');
const gx=176,gy=y0+8,gw=58,gh=26;R(c,gx-2,gy-2,gw+4,gh+4,'rgba(10,14,22,.85)');c.strokeStyle=lgCurves[k][2];c.lineWidth=1;c.beginPath();for(let i=0;i<=gw;i++){const v=lgCurves[k][1](i*1.6);const yy=gy+gh-v*gh;i?c.lineTo(gx+i,yy):c.moveTo(gx+i,yy)}c.stroke();R(c,gx+Math.round(70/1.6),gy,1,gh,'rgba(255,255,255,.35)');
lgLab(c,lgCurves[k][0],34+lgCurves[k][0].length*1.5,y0+7,lgCurves[k][2])}
lgLab(c,'r',lx+70,128)}};

/* LGT-03 cookie / gobo */
let lgLeafN=null;function lgLeaf(u,v){if(!lgLeafN){lgLeafN=new Float32Array(64*64);for(let j=0;j<64;j++)for(let i=0;i<64;i++){let s=0,a=.6;for(const f of[8,16]){const gx=i/64*f,gy=j/64*f,ix=Math.floor(gx),iy=Math.floor(gy),fx=gx-ix,fy=gy-iy;const h=(x,y)=>hash((x%f)*31+(y%f)*197+f);s+=a*lerp(lerp(h(ix,iy),h(ix+1,iy),fx),lerp(h(ix,iy+1),h(ix+1,iy+1),fx),fy);a*=.5}lgLeafN[j*64+i]=s/.9}}const i=((Math.floor(u*64)%64)+64)%64,j=((Math.floor(v*64)%64)+64)%64;return lgSS(.52,.6,lgLeafN[j*64+i])}
function lgWin(u,v){const fu=((u%1)+1)%1,fv=((v%1)+1)%1;if(u<0||u>1||v<0||v>1)return 0;const bx=Math.abs(fu*3-Math.round(fu*3))<.09||fu<.05||fu>.95,by=Math.abs(fv*2-Math.round(fv*2))<.07||fv<.06||fv>.94;return bx||by?0:1}
DEMOS['LGT-03']={d:8,f:(c,t)=>{const leaf=t>=.5,k=leaf?(t-.5)*2:t*2,fade=Math.min(lgSat(k/.08),lgSat((1-k)/.08));const sk=.35+.35*Math.sin(k*TAU);
const o=outData(c),d=o.data;for(let y=0;y<H;y++)for(let x=0;x<W;x++){const pl=(Math.floor(y/9)+((Math.floor(x/38)+Math.floor(y/9))&1)*0)%2;const base=((y%9)===0)?[70,44,28]:(Math.floor(y/9)%2?[132,88,56]:[122,80,50]);let L;
if(!leaf){const u=(x-70-(y-20)*sk)/110,v=(y-28)/80;L=lgWin(u,v)}else{L=lgLeaf(x/150+k*.5,y/150+k*.12)*.9+.05}
L*=fade;const amb=.22,p=(y*W+x)*4,lc=leaf?[1.15,1.15,.8]:[1.25,1.1,.85];d[p]=Math.min(255,base[0]*(amb+L*lc[0]*1.3));d[p+1]=Math.min(255,base[1]*(amb+L*lc[1]*1.3));d[p+2]=Math.min(255,base[2]*(amb+L*lc[2]*1.3));d[p+3]=255}c.putImageData(o,0,0);
/* cookie thumbnail */const tx=6,ty=16,ts=30;R(c,tx-2,ty-2,ts+4,ts+4,P.ink);for(let j=0;j<ts;j++)for(let i=0;i<ts;i++){const v=leaf?lgLeaf(i/ts*1.5,j/ts*1.5):lgWin(i/ts,j/ts);if(v>.5)R(c,tx+i,ty+j,1,1,'#f4f0e0');else R(c,tx+i,ty+j,1,1,'#222')}
lgLab(c,'COOKIE',tx+ts/2,ty+ts+8,P.gold);lgLab(c,leaf?'LEAF COOKIE · PANNING':'WINDOW COOKIE · SUN ANGLE',150,8,P.cyan)}};

/* LGT-04 flicker: random vs noise vs pattern */
const lgPat='mmamammmmammamamaaamammma';
const lgFl=[['RANDOM',t=>.55+.45*hash(Math.floor(t*150)*7.3)],['NOISE',t=>.55+.45*(lgPN(t,40,3)*.67+lgPN(t,92,9)*.33)],['PATTERN',t=>{const i=Math.floor(t*50)%lgPat.length;return(lgPat.charCodeAt(i)-97)/12}]];
DEMOS['LGT-04']={d:5,f:(c,t)=>{const v=lgFl.map(f=>lgSat(f[1](t)));const o=outData(c),d=o.data;for(let y=0;y<H;y++)for(let x=0;x<W;x++){const pn=Math.floor(x/80),cx=pn*80+40,cy=48,I=v[pn],r=46*(.94+.06*I);const dd=Math.hypot(x-cx,(y-cy)*1.2);const w=lgSat(1-Math.pow(dd/r,2));const L=I*w*w*1.4;const brick=((y%8)===0||((x+((y>>3)&1)*6)%12)===0)?.6:1;const sc=brick*(.9+.1*hash(((x/12|0)*7+(y>>3))*3.1));const b=[92*sc,80*sc,74*sc],p=(y*W+x)*4;d[p]=Math.min(255,b[0]*(.12+L*1.6));d[p+1]=Math.min(255,b[1]*(.12+L*1.15));d[p+2]=Math.min(255,b[2]*(.12+L*.6));d[p+3]=255}c.putImageData(o,0,0);
for(let k=0;k<3;k++){const cx=k*80+40,I=v[k];R(c,cx-1,50,3,12,P.woodD);R(c,cx-2,49,5,2,P.stoneD);if(I>.05){const fh=4+5*I;R(c,cx-2,49-fh,5,fh,'#f08a3a');R(c,cx-1,50-fh*.8,3,fh*.7,'#ffd35a');R(c,cx,49-fh*.5,1,fh*.4,'#fff6c8')}
R(c,k*80+79,0,1,H,P.ink);/* graph */const gx=k*80+8,gy=96,gw=64,gh=20;R(c,gx-1,gy-1,gw+2,gh+2,'rgba(10,14,22,.85)');c.strokeStyle=k===0?P.red:k===1?P.gold:P.cyan;c.lineWidth=1;c.beginPath();for(let i=0;i<=gw;i++){const tt=t-(gw-i)/gw*.25;const vv=lgSat(lgFl[k][1](((tt%1)+1)%1));const yy=gy+gh-vv*gh;i?c.lineTo(gx+i,yy):c.moveTo(gx+i,yy)}c.stroke();circ(c,gx+gw,gy+gh-I*gh,1.5,'#fff');
lgLab(c,lgFl[k][0],cx,8,k===0?P.red:k===1?P.gold:P.cyan)}
lgLab(c,'glitchy',40,126);lgLab(c,'firelight',120,126);lgLab(c,'broken lamp',200,126)}};

/* LGT-05 point vs area light, side view, floating box */
DEMOS['LGT-05']={d:6,f:(c,t)=>{const by=74+18*Math.sin(t*TAU);const floor=112;const NS=10;
const o=outData(c),d=o.data;for(let y=0;y<H;y++)for(let x=0;x<W;x++){const pn=x<120?0:1,ox=pn*120,lx=ox+60,ly=14,b=[ox+46,by-6,ox+74,by+6];let vis=0;
if(pn===0){vis=lgSegBox(x+.5,y+.5,lx,ly,b)?0:1}else{for(let s=0;s<NS;s++){const sx=lx-22+44*(s+.5)/NS;if(!lgSegBox(x+.5,y+.5,sx,ly,b))vis++}vis/=NS}
const dd=Math.hypot(x-lx,y-ly);const at=1/(1+dd*dd/9000);const onF=y>=floor;const base=onF?((((x>>3)+((y-floor)>>2))&1)?[150,140,124]:[138,128,112]):[70,78,96];const L=vis*at*(onF?1.25:.75),amb=.16;const lc=pn?[.9,.95,1.1]:[1.1,1,.85];const p=(y*W+x)*4;d[p]=Math.min(255,base[0]*(amb+L*lc[0]));d[p+1]=Math.min(255,base[1]*(amb+L*lc[1]));d[p+2]=Math.min(255,base[2]*(amb+L*lc[2]));d[p+3]=255}c.putImageData(o,0,0);
for(const pn of[0,1]){const ox=pn*120;R(c,ox+46,by-6,28,12,P.woodD);R(c,ox+47,by-5,26,10,P.wood);R(c,ox+59,14,1,by-20,'rgba(255,255,255,.15)');if(pn===0)circ(c,ox+60,14,3,'#fff3c0');else{R(c,ox+38,12,44,4,'#e8f2ff');R(c,ox+38,16,44,1,'#9fb4d0')}}
R(c,119,0,2,H,P.ink);lgLab(c,'POINT · HARD EDGE',60,126,P.gold);lgLab(c,'AREA · PENUMBRA',180,126,P.cyan);lgLab(c,'umbra',180,floor-8)}};

/* LGT-06 baked lightmap */
let lgLM=null;const LMW=30,LMH=17;const lgTable=[96,60,140,84];
function lgBake(){if(lgLM)return lgLM;lgLM=new Float32Array(LMW*LMH);for(let j=0;j<LMH;j++)for(let i=0;i<LMW;i++){const x=(i+.5)*8,y=(j+.5)*8;let v=0;for(let s=0;s<16;s++){const wy=34+60*(s+.5)/16;const dx=x-4,dy=y-wy,dd=Math.hypot(dx,dy);if(!lgSegBox(x,y,4,wy,lgTable))v+=Math.max(0,dx/dd)/(1+dd*dd/24000)}v/=16;/* corner darkening + bounce */const cr=Math.min(x,W-x,y,H-y);v=v*.9*lgSS(0,18,cr)+.12*lgSS(-10,40,cr)+.05;lgLM[j*LMW+i]=v}return lgLM}
function lgLMs(x,y){const L=lgBake();const fx=x/8-.5,fy=y/8-.5,i=Math.max(0,Math.min(LMW-2,Math.floor(fx))),j=Math.max(0,Math.min(LMH-2,Math.floor(fy))),a=lgSat(fx-i),b=lgSat(fy-j);return lerp(lerp(L[j*LMW+i],L[j*LMW+i+1],a),lerp(L[(j+1)*LMW+i],L[(j+1)*LMW+i+1],a),b)}
DEMOS['LGT-06']={d:9,f:(c,t)=>{const ph=t<.25?0:t<.5?1:2;const o=outData(c),d=o.data;for(let y=0;y<H;y++)for(let x=0;x<W;x++){const inT=x>=lgTable[0]&&x<lgTable[2]&&y>=lgTable[1]&&y<lgTable[3];const al=inT?[150,96,60]:((((x>>4)+(y>>4))&1)?[196,170,130]:[184,158,118]);const p=(y*W+x)*4;let m=1;if(ph>0){m=lgLMs(x,y)*2.2;if(inT)m=Math.max(m,.5)}
if(ph===1){const v=Math.min(255,m*120);d[p]=v;d[p+1]=v*.97;d[p+2]=v*.9}else{d[p]=Math.min(255,al[0]*m);d[p+1]=Math.min(255,al[1]*m);d[p+2]=Math.min(255,al[2]*m)}d[p+3]=255}c.putImageData(o,0,0);
R(c,0,34,3,60,'#e8f2ff');if(ph===1){c.fillStyle='rgba(0,0,0,.25)';for(let i=0;i<=LMW;i++)c.fillRect(i*8,0,1,H);for(let j=0;j<=LMH;j++)c.fillRect(0,j*8,W,1)}
if(ph===2){const k=seg(t,.5,1),bx=30+180*(.5-.5*Math.cos(k*TAU)),byy=70+20*Math.sin(k*TAU*2);const m=lgLMs(bx,byy)*2.2;circ(c,bx,byy,7,'rgb('+Math.min(255,220*m|0)+','+Math.min(255,70*m|0)+','+Math.min(255,60*m|0)+')');circ(c,bx-2,byy-2,2,'rgba(255,255,255,.6)');lgLab(c,'DYNAMIC · NO BAKED SHADOW',bx,byy-14,P.red)}
lgLab(c,['1 ALBEDO','2 LIGHTMAP (30x17 TEXELS)','3 ALBEDO x LIGHTMAP'][ph],120,8,P.gold);lgLab(c,'window',22,100,P.cyan)}};

/* LGT-07 light probes */
const lgLights=[[30,40,[255,80,60],90],[210,95,[70,120,255],90],[120,20,[255,230,180],50]];const lgRoof=[96,58,144,92];
function lgIrr(x,y){let r=14,g=14,b=18;for(const[lx,ly,col,rad]of lgLights){const dd=Math.hypot(x-lx,y-ly);let a=lgSat(1-dd/rad);a*=a;if(a>0&&lgSegBox(x,y,lx,ly,lgRoof)&&!(x>=lgRoof[0]&&x<=lgRoof[2]&&y>=lgRoof[1]&&y<=lgRoof[3]))a*=.12;if(x>=lgRoof[0]&&x<=lgRoof[2]&&y>=lgRoof[1]&&y<=lgRoof[3])a*=.2;r+=col[0]*a;g+=col[1]*a;b+=col[2]*a}return[Math.min(255,r),Math.min(255,g),Math.min(255,b)]}
let lgBG=null,lgPR=null;const PX0=20,PY0=15,PDX=40,PDY=35,PNX=6,PNY=4;
DEMOS['LGT-07']={d:8,f:(c,t)=>{if(!lgBG){lgBG=mk(W,H);const g=lgBG.getContext('2d'),o=g.createImageData(W,H),d=o.data;for(let y=0;y<H;y++)for(let x=0;x<W;x++){const I=lgIrr(x,y),f=lgFloor(x,y),p=(y*W+x)*4;d[p]=f[0]*I[0]/150;d[p+1]=f[1]*I[1]/150;d[p+2]=f[2]*I[2]/150;d[p+3]=255}g.putImageData(o,0,0);g.fillStyle='rgba(20,18,30,.55)';g.fillRect(lgRoof[0],lgRoof[1],lgRoof[2]-lgRoof[0],lgRoof[3]-lgRoof[1]);g.strokeStyle='#3a3550';g.strokeRect(lgRoof[0]+.5,lgRoof[1]+.5,lgRoof[2]-lgRoof[0]-1,lgRoof[3]-lgRoof[1]-1);lgPR=[];for(let j=0;j<PNY;j++)for(let i=0;i<PNX;i++)lgPR.push(lgIrr(PX0+i*PDX,PY0+j*PDY))}
c.drawImage(lgBG,0,0);for(const[lx,ly,col]of lgLights){circ(c,lx,ly,3,'rgb('+col+')');circ(c,lx,ly,1.5,'#fff')}
const a=t*TAU,hx=120+85*Math.cos(a),hy=70+38*Math.sin(a*2)*.9+8*Math.sin(a);const fi=lgSat((hx-PX0)/PDX/(PNX-1))*(PNX-1),fj=lgSat((hy-PY0)/PDY/(PNY-1))*(PNY-1),i0=Math.min(PNX-2,Math.floor(fi)),j0=Math.min(PNY-2,Math.floor(fj)),u=fi-i0,v=fj-j0;const Pq=(i,j)=>lgPR[j*PNX+i];const col=[0,1,2].map(k=>lerp(lerp(Pq(i0,j0)[k],Pq(i0+1,j0)[k],u),lerp(Pq(i0,j0+1)[k],Pq(i0+1,j0+1)[k],u),v)|0);
c.strokeStyle='rgba(255,255,255,.45)';c.lineWidth=1;for(const[i,j]of[[i0,j0],[i0+1,j0],[i0,j0+1],[i0+1,j0+1]]){c.beginPath();c.moveTo(PX0+i*PDX,PY0+j*PDY);c.lineTo(hx,hy-6);c.stroke()}
for(let j=0;j<PNY;j++)for(let i=0;i<PNX;i++){const pc=Pq(i,j),sel=(i===i0||i===i0+1)&&(j===j0||j===j0+1);circ(c,PX0+i*PDX,PY0+j*PDY,sel?4:3,sel?'#fff':P.ink);circ(c,PX0+i*PDX,PY0+j*PDY,sel?3:2,'rgb('+pc.map(v=>Math.min(255,v|0))+')')}
const k=TMP(),g=k.getContext('2d');spr(g,'hero',hx,hy+5,{sx:2,sy:2});g.globalCompositeOperation='source-atop';g.globalAlpha=.65;g.fillStyle='rgb('+col+')';g.fillRect(0,0,W,H);g.globalCompositeOperation='multiply';g.globalAlpha=1;g.fillStyle='rgb('+col.map(v=>Math.min(255,v*1.4+40|0))+')';g.fillRect(0,0,W,H);g.globalCompositeOperation='destination-in';spr(g,'hero',hx,hy+5,{sx:2,sy:2});shadow(c,hx,hy+5,6,.4);c.drawImage(k,0,0);
R(c,W-34,H-20,24,14,P.ink);R(c,W-33,H-19,22,12,'rgb('+col+')');lgLab(c,'SAMPLED',W-22,H-27,'#fff');lgLab(c,'PROBE GRID',30,H-8,P.gold)}};

/* LGT-08 cascaded shadow maps (top-down diagram) */
const lgTrees=[];for(let i=0;i<26;i++)lgTrees.push([12+hash(i*3+1)*216,8+hash(i*5+2)*104,3+hash(i*7+3)*3]);
const lgCas=[[0,30,1,[255,90,90]],[30,62,3,[90,255,120]],[62,130,6,[90,140,255]]];
DEMOS['LGT-08']={d:8,f:(c,t)=>{const dbg=t>=.5;const a=t*TAU*2+.4,L=[Math.cos(a),Math.sin(a)*.6+.2],ll=Math.hypot(L[0],L[1]);L[0]/=ll;L[1]/=ll;const cx=120,cy=130,half=.62;
const o=outData(c),d=o.data;for(let y=0;y<H;y++)for(let x=0;x<W;x++){const dx=x-cx,dy=cy-y;const inF=dy>0&&Math.abs(dx)<dy*half+4;const dist=dy;let ci=2;for(let k=0;k<3;k++)if(dist<lgCas[k][1]){ci=k;break}const ts=inF?lgCas[ci][2]:6;const sx=(Math.floor(x/ts)+.5)*ts,sy=(Math.floor(y/ts)+.5)*ts;let sh=0;for(const[tx,ty,tr]of lgTrees){const ex=tx+L[0]*tr*4,ey=ty+L[1]*tr*4;const vx=ex-tx,vy=ey-ty,wx=sx-tx,wy=sy-ty;const k2=lgSat((wx*vx+wy*vy)/(vx*vx+vy*vy));const qx=wx-vx*k2,qy=wy-vy*k2;if(qx*qx+qy*qy<tr*tr){sh=1;break}}
const g=(hash((x>>1)*7+(y>>1)*131)>.8)?[80,140,64]:[90,154,74];let m=sh?.45:1;if(!inF)m*=.45;const p=(y*W+x)*4;let r=g[0]*m,gg=g[1]*m,b=g[2]*m;if(dbg&&inF){const cc=lgCas[ci][3];r=r*.55+cc[0]*.35*m;gg=gg*.55+cc[1]*.35*m;b=b*.55+cc[2]*.35*m}d[p]=r;d[p+1]=gg;d[p+2]=b;d[p+3]=255}c.putImageData(o,0,0);
for(const[tx,ty,tr]of lgTrees){circ(c,tx,ty,tr+1,P.leafD);circ(c,tx-.5,ty-.5,tr,P.leaf)}
c.strokeStyle='rgba(255,255,255,.7)';c.lineWidth=1;c.beginPath();c.moveTo(cx-130*half,0);c.lineTo(cx,cy);c.lineTo(cx+130*half,0);c.stroke();c.strokeStyle='rgba(255,255,255,.35)';for(const k of[0,1]){const yy=cy-lgCas[k][1],hw=lgCas[k][1]*half;c.beginPath();c.moveTo(cx-hw,yy);c.lineTo(cx+hw,yy);c.stroke()}
R(c,cx-4,cy-4,8,5,P.ink);R(c,cx-3,cy-3,6,3,'#cfd8e3');
c.strokeStyle=P.gold;c.beginPath();c.moveTo(20,20);c.lineTo(20+L[0]*12,20+L[1]*12);c.stroke();circ(c,20,20,3,P.gold);
lgLab(c,dbg?'DEBUG: CASCADE 1 / 2 / 3':'NEAR CRISP · FAR BLOCKY',120,8,dbg?P.cyan:'#fff');lgLab(c,'cam',cx+14,cy-4)}};

/* LGT-09 contact shadows (side view) */
function lgShadowSil(g,x,foot,k,s){/* project silhouette onto floor: x' = x + k*(foot-y), y' = foot - (foot-y)*s */const sil=TMP2(),sg=sil.getContext('2d');spr(sg,'hero',x,foot,{sx:4,sy:4,sil:'#000'});g.save();g.setTransform(1,0,-k,s,k*foot,foot*(1-s));g.drawImage(sil,0,0);g.restore()}
DEMOS['LGT-09']={d:6,f:(c,t)=>{const k=.7+.4*(.5-.5*Math.cos(t*TAU)),sq=.34;const foot=104;
for(const pn of[0,1]){const ox=pn*120;c.save();c.beginPath();c.rect(ox,0,120,H);c.clip();R(c,ox,0,120,foot-34,'#5e6b80');R(c,ox,foot-34,120,H,'#9a8c76');c.fillStyle='#8a7c66';for(let i=0;i<8;i++)c.fillRect(ox+i*16,foot-34,1,H);
const x=ox+44,cx0=ox+10;/* shadow map: low-res + bias -> soft, detached from feet ("peter-panning") */const k1=TMP(),g1=k1.getContext('2d');lgShadowSil(g1,x+5,foot-6,k,sq);g1.fillStyle='#000';g1.fillRect(cx0+2-k*6,foot-14-6,14,7);c.globalAlpha=.6;c.filter='blur(1.5px)';c.drawImage(k1,0,0);c.filter='none';c.globalAlpha=1;
if(pn===1){/* contact shadow: short screen-space march near contact points -> sharp and grounded */const k2=TMP(),g2=k2.getContext('2d');lgShadowSil(g2,x,foot,k,sq);g2.fillStyle='#000';g2.fillRect(cx0-k*6,foot-6,14+Math.abs(k)*6,6);g2.globalCompositeOperation='destination-in';const gr=g2.createLinearGradient(0,foot-9,0,foot);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(1,'rgba(0,0,0,1)');g2.fillStyle=gr;g2.fillRect(0,0,W,H);c.globalAlpha=.9;c.drawImage(k2,0,0);c.globalAlpha=1;R(c,x-7,foot-1,14,2,'rgba(0,0,0,.5)')}
R(c,cx0,foot-14,14,14,P.woodD);R(c,cx0+1,foot-13,12,12,P.wood);spr(c,'hero',x,foot,{sx:4,sy:4});c.restore()}
R(c,119,0,2,H,P.ink);for(const lx of[60,180]){const sx=lx-44-k*8;circ(c,sx,10,3,P.gold);c.strokeStyle=P.gold;c.beginPath();c.moveTo(sx,10);c.lineTo(sx+k*6,18);c.stroke()}
lgLab(c,'SHADOW MAP ONLY',60,124,P.red);lgLab(c,'+ CONTACT SHADOWS',180,124,P.cyan);lgLab(c,'gap at feet',60,foot+10,'#fff');lgLab(c,'grounded',180,foot+10,'#fff')}};

/* LGT-10 blob shadow: jump vs walk north ambiguity */
DEMOS['LGT-10']={d:4,f:(c,t)=>{for(const pn of[0,1]){const ox=pn*120;c.save();c.beginPath();c.rect(ox,0,120,H);c.clip();ground(c,ox*3,0);
/* jumper */const j=Math.sin(seg(t,0,.5)*Math.PI)*28;const gx=ox+36,gy=92;/* walker north */const wy=92-28*Math.sin(seg(t,.5,1)*Math.PI);const wx=ox+84;
if(pn){const sw=w=>w/(1+j*.05);shadow(c,gx,gy,sw(7),.45/(1+j*.04));shadow(c,wx,wy,7,.45);if(t<.5)R(c,gx,gy-j,1,j,'rgba(255,255,255,.35)')}
spr(c,'hero',gx,gy-j,{sx:2,sy:2});spr(c,'npc',wx,wy,{sx:2,sy:2});c.restore()}
R(c,119,0,2,H,P.ink);lgLab(c,'NO SHADOW',60,8,P.red);lgLab(c,'BLOB SHADOW',180,8,P.cyan);for(const ox of[0,120]){lgLab(c,'jump',ox+36,112);lgLab(c,'walk N',ox+84,112)}lgLab(c,'which one jumps?',60,126);lgLab(c,'shadow stays on ground',180,126)}};

/* LGT-11 clustered / tiled light culling */
const lgNL=48,lgPL=[];for(let i=0;i<lgNL;i++)lgPL.push({cx:hash(i*3.1)*W,cy:hash(i*5.7)*H,rx:10+hash(i*7.3)*50,ry:6+hash(i*9.1)*30,f:1+Math.floor(hash(i*11.9)*2),ph:hash(i*13.7),r:10+hash(i*17.3)*12,col:[[255,120,80],[120,200,255],[255,220,120],[200,120,255]][i%4]});
DEMOS['LGT-11']={d:8,f:(c,t)=>{const dbg=t>=.5;const Ls=lgPL.map(l=>{const a=(t*l.f+l.ph)*TAU;return[l.cx+Math.cos(a)*l.rx,l.cy+Math.sin(a)*l.ry,l.r,l.col]});
R(c,0,0,W,H,'#141a28');c.fillStyle='#1c2436';for(let y=0;y<H;y+=10)for(let x=(y/10%2)*10;x<W;x+=20)c.fillRect(x,y,10,10);
c.globalCompositeOperation='lighter';for(const[x,y,r,col]of Ls){const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,'rgba('+col+',.55)');g.addColorStop(1,'rgba('+col+',0)');c.fillStyle=g;c.fillRect(x-r,y-r,2*r,2*r)}c.globalCompositeOperation='source-over';for(const[x,y,,col]of Ls)R(c,x-1,y-1,2,2,'rgb('+col+')');
const TW=15,TH=15,NX=16,NY=9;if(dbg){let mx=0;for(let j=0;j<NY;j++)for(let i=0;i<NX;i++){let n=0;const x0=i*TW,y0=j*TH;for(const[x,y,r]of Ls){const qx=clamp(x,x0,x0+TW),qy=clamp(y,y0,y0+TH);if((qx-x)**2+(qy-y)**2<r*r)n++}const h=lgSat(n/8);const col=h<.5?[lerp(40,60,h*2),lerp(80,220,h*2),lerp(220,120,h*2)]:[lerp(60,255,(h-.5)*2),lerp(220,60,(h-.5)*2),lerp(120,40,(h-.5)*2)];R(c,x0,y0,TW,TH,'rgba('+col.map(v=>v|0)+',.55)');if(n)txt(c,String(n),x0+7.5,y0+8,'#fff',7)}c.fillStyle='rgba(0,0,0,.4)';for(let i=0;i<=NX;i++)c.fillRect(i*TW,0,1,H);for(let j=0;j<=NY;j++)c.fillRect(0,j*TH,W,1)}
lgLab(c,dbg?'DEBUG: LIGHTS PER TILE (16x9)':lgNL+' DYNAMIC LIGHTS',120,8,dbg?P.gold:P.cyan)}};

/* LGT-12 height fog */
let lgRidge=null;function lgR(){if(lgRidge)return lgRidge;lgRidge=[0,1,2].map(l=>{const a=new Float32Array(W);for(let x=0;x<W;x++){let h=0;for(let o=1;o<=3;o++)h+=Math.sin(x*.018*o*(1+l*.6)+l*2.1+o*1.7)/o;a[x]=[42,70,96][l]-h*[24,18,10][l]-(l===0&&Math.abs(x-176)<4?30:0)}return a});return lgRidge}
DEMOS['LGT-12']={d:8,f:(c,t)=>{const fh=8+38*(.5-.5*Math.cos(t*TAU));const rg=lgR();const depth=[180,90,30],colL=[[96,112,140],[74,100,84],[60,84,58]];const fog=[184,196,208];
const o=outData(c),d=o.data;for(let y=0;y<H;y++)for(let x=0;x<W;x++){let l=-1;for(let k=2;k>=0;k--)if(y>=rg[k][x]){l=k;break}const p=(y*W+x)*4;let col,dist;if(l<0){const u=y/H;col=[lerp(90,170,u),lerp(140,200,u),lerp(210,232,u)];dist=0}else{col=colL[l];if(l===0&&Math.abs(x-176)<4)col=[110,110,122];dist=depth[l]}
const hgt=(H-y);const dens=.022*Math.exp(-Math.max(0,hgt-(H-120))*0)*Math.exp(-(hgt-(H-112)+fh)*-0)*1;const dd=.03*Math.exp(-Math.max(0,hgt-fh)*.11);const f=l<0?0:1-Math.exp(-dd*dist);d[p]=lerp(col[0],fog[0],f);d[p+1]=lerp(col[1],fog[1],f);d[p+2]=lerp(col[2],fog[2],f);d[p+3]=255}c.putImageData(o,0,0);
const yf=H-fh;R(c,W-10,20,4,H-26,'rgba(10,14,22,.8)');R(c,W-10,yf,4,H-6-yf,P.cyan);c.fillStyle='rgba(255,255,255,.5)';for(let x=0;x<W-14;x+=6)c.fillRect(x,Math.round(yf),3,1);lgLab(c,'FOG HEIGHT',W-34,Math.max(14,yf-8),P.cyan);lgLab(c,'peaks stay clear',60,8,'#fff')}};

/* LGT-13 atmospheric scattering (single-scatter style approximation) */
const lgBeta=[5.8/33.1,13.5/33.1,1];
const lgAM=e=>{const ed=Math.max(-2,e*180/Math.PI);return 1/(Math.sin(Math.max(e,-.03))+.15*Math.pow(ed+3.885,-1.253)+.02)};
let lgMt=null;
DEMOS['LGT-13']={d:10,f:(c,t)=>{const se=lerp(-.02,1.05,.5+.5*Math.cos(t*TAU)),sa=-.35;const sd=[Math.cos(se)*Math.sin(sa),Math.sin(se),Math.cos(se)*Math.cos(sa)];const hy=100;const mS=lgAM(se);const sunT=lgBeta.map(b=>Math.exp(-b*mS*.35));
if(!lgMt){lgMt=[new Float32Array(W),new Float32Array(W)];for(let x=0;x<W;x++){lgMt[0][x]=hy-14-10*Math.sin(x*.03+1)-6*Math.sin(x*.071);lgMt[1][x]=hy+4-6*Math.sin(x*.05+3)-3*Math.sin(x*.13)}}
const o=outData(c),d=o.data;let hz=[0,0,0];for(let y=0;y<H;y++)for(let x=0;x<W;x++){const az=(x/W-.5)*1.6,el=Math.max(.002,(hy-y)/hy*1.25);const v=[Math.cos(el)*Math.sin(az),Math.sin(el),Math.cos(el)*Math.cos(az)];const mu=v[0]*sd[0]+v[1]*sd[1]+v[2]*sd[2];const mV=lgAM(el);const pr=.75*(1+mu*mu),g=.76,pm=(1-g*g)/Math.pow(1+g*g-2*g*mu,1.5)*.06;
const mP=lgAM(se+el*.5);const sky=lgBeta.map((b,i)=>{const ins=(1-Math.exp(-b*mV*.5));return .05*b*lgSS(-.1,.05,se)+ins*Math.exp(-b*mP*.3)*(pr*b*1.2+pm*1.4)*(.08+.92*lgSS(-.06,.03,se))*1.7});
let col=sky;const p=(y*W+x)*4;let land=-1;if(y>=lgMt[1][x])land=1;else if(y>=lgMt[0][x])land=0;
if(land>=0){const ap=land?.25:.6;const hzc=lgBeta.map((b,i)=>{const ins=(1-Math.exp(-b*lgAM(.03)*.5));return ins*sunT[i]*(.75*(1+mu*mu*.3)*b*1.2+pm*.6)*(.08+.92*lgSS(-.06,.03,se))*1.7});const base=land?[.08,.12,.06]:[.12,.14,.18];const sl=Math.max(0,sd[1])*.6+.05;col=[0,1,2].map(i=>lerp(base[i]*sl*sunT[i]*3,hzc[i],ap))}
const ton=v=>255*(1-Math.exp(-v*2.2));d[p]=ton(col[0]);d[p+1]=ton(col[1]);d[p+2]=ton(col[2]);d[p+3]=255}c.putImageData(o,0,0);
/* sun disc */const sx=W*(.5+Math.atan2(sd[0],sd[2])/1.6),sy=hy-Math.asin(sd[1])/1.25*hy;if(sy<hy+6){const sc=sunT.map(v=>Math.min(255,255*Math.pow(v,.6)|0));c.save();c.beginPath();c.rect(0,0,W,hy+2);c.clip();circ(c,sx,sy,5,'rgb('+sc+')');circ(c,sx,sy,3,'rgba(255,255,255,.7)');c.restore()}
lgLab(c,'SUN '+Math.round(se*180/Math.PI)+'°',30,8,P.gold);lgLab(c,'aerial perspective',60,hy+24,'#fff')}};
})();
