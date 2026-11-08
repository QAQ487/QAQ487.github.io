/* ===== REN principle demos (canvas) ===== */
(()=>{
/* ---- shared helpers (local to this IIFE) ---- */
const rnN=(x,y,z)=>{const l=Math.hypot(x,y,z)||1;return[x/l,y/l,z/l]};
const rnL=t=>{const a=t*TAU+.4;return rnN(Math.cos(a)*.9,.55+Math.sin(a)*.25,.55)};
const rnBg=(d,a=[42,52,68],b=[18,22,32])=>{for(let y=0;y<H;y++){const k=y/(H-1),r=lerp(a[0],b[0],k),g=lerp(a[1],b[1],k),bl=lerp(a[2],b[2],k);for(let x=0;x<W;x++){const p=(y*W+x)*4;d[p]=r;d[p+1]=g;d[p+2]=bl;d[p+3]=255}}};
const rnPx=(d,x,y,r,g,b)=>{if(x<0||y<0||x>=W||y>=H)return;const p=(y*W+x)*4;d[p]=clamp(r,0,255);d[p+1]=clamp(g,0,255);d[p+2]=clamp(b,0,255);d[p+3]=255};
const rnBall=(d,cx,cy,r,shade)=>{for(let y=cy-r;y<=cy+r;y++)for(let x=cx-r;x<=cx+r;x++){const nx=(x+.5-cx)/r,ny=(y+.5-cy)/r,q=nx*nx+ny*ny;if(q>=1)continue;const nz=Math.sqrt(1-q),col=shade(nx,ny,nz,x,y);if(col)rnPx(d,x,y,col[0],col[1],col[2])}};
const rnSun=(c,L,cx=120,cy=60,sc=70)=>{const x=cx+L[0]*sc,y=cy-L[1]*sc*.7;circ(c,x,y,3,P.gold);ring(c,x,y,6,1,'rgba(242,201,76,.45)')};
const rnDiv=(c,x)=>{R(c,x,0,1,H,'rgba(233,237,242,.85)')};

/* REN-30 eye adaptation: exposure lags behind the change in scene brightness */
const ox30=u=>prKeys([[0,0],[.15,0],[.32,240],[.6,240],[.77,0],[1,0]],u);
const lum30=u=>lerp(.32,1,clamp(ox30(u)/240));
const s30=prSeries('r30',()=>({e:.32}),(s,u,dt)=>{const L=lum30(u);s.e=Math.exp(lerp(Math.log(s.e),Math.log(L),Math.min(1,(L>s.e?4.5:2.5)*dt*6/1.2)))});
DEMOS['REN-30']={d:7,f:(c,t)=>{const u=prWrap(t),ox=ox30(u),e=prAt(s30,u).e,k=TMP(),g=k.getContext('2d');g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,W,H);g.save();g.translate(-Math.round(ox),0);
 g.fillStyle='rgb(46,40,52)';g.fillRect(0,0,240,H);g.fillStyle='rgb(36,30,40)';for(let y=0;y<100;y+=8)for(let x=(y/8%2)*8;x<240;x+=16)g.fillRect(x,y,15,7);g.fillStyle='rgb(60,44,32)';g.fillRect(0,100,240,35);
 const fl=.7+.3*Math.sin(u*TAU*9);circ(g,60,50,10*fl,'rgba(255,170,80,.35)');R(g,58,50,4,10,P.woodD);circ(g,60,47,3,P.orange);
 g.drawImage(scene('eday'),240,0);R(g,234,0,8,H,P.stoneD);g.restore();shadow(g,120,104,6);const mv=Math.abs(ox30(prWrap(u+.002))-ox)>.05;prWalker(g,120,104,ox/14,{s:2,flip:ox30(prWrap(u+.002))<ox,still:!mv});
 const br=clamp(.85/e,.6,2.6);c.save();c.filter='brightness('+br.toFixed(3)+')';c.drawImage(k,0,0);c.restore();
 const ev=Math.log2(e);R(c,W-58,4,54,22,'rgba(10,14,24,.8)');txt(c,'EV',W-54,10,'#e9edf2',6,'left');R(c,W-40,9,32,2,'#5e636e');R(c,W-40+clamp((ev+1.7)/1.7)*30,7,3,6,P.gold);txt(c,'gain x'+br.toFixed(1),W-31,20,P.gold,5);
 const blown=br*lum30(u)>1.25,dark=br*lum30(u)<.8;prTag(c,blown?'adapting: too bright':dark?'adapting: too dark':'adapted',4,4,blown||dark?P.gold:P.cyan)}};
/* REN-33 motion blur: accumulate several sub-frame samples along velocity */
DEMOS['REN-33']={d:3,f:(c,t)=>{const x=u=>120+Math.sin(u*TAU)*92,ang=u=>u*TAU*3;for(const i of[0,1])prLane(c,i,i?'ON: 8 samples':'OFF',i?P.cyan:'#e9edf2',gy=>{tree(c,40,gy);tree(c,200,gy);fence(c,96,gy,8);const N=i?8:1,sh=.035;for(let j=N-1;j>=0;j--){const uu=t-sh*j/Math.max(1,N-1)*(i?1:0);c.globalAlpha=i?(j===0?.45:.2):1;const hx=x(uu);spr(c,'hero',hx,gy,{sx:2,sy:2,flip:Math.cos(uu*TAU)<0});const wx=hx,wy=gy-34,a=ang(uu);for(let s=0;s<4;s++){const aa=a+s*Math.PI/2;R(c,wx+Math.cos(aa)*7-1,wy+Math.sin(aa)*7-1,3,3,P.gold)}}c.globalAlpha=1;const sp=Math.abs(Math.cos(t*TAU));if(i)bar(c,150,gy-46,40,3,sp,P.cyan),txt(c,'speed',148,gy-45,P.cyan,5,'right')});
 prTag(c,'shutter 0.035',W-4,4,'#e9edf2','rgba(10,14,24,.75)',6,'right')}};
/* REN-40 temporal AA: point-sampled thin lines crawl; jittered history converges */
const HAL=[[.5,.333],[.25,.667],[.75,.111],[.125,.444],[.625,.778],[.375,.222],[.875,.556],[.0625,.889]];
function lines40(u){const L=[];for(let i=0;i<5;i++){const a=.12+i*.13+Math.sin(u*TAU+i)*.03,nx=-Math.sin(a),ny=Math.cos(a);L.push([nx,ny,8+i*9+u*6+nx*0])}L.push([1,0,170+Math.sin(u*TAU)*3]);L.push([Math.sin(.9),Math.cos(.9),150+u*4]);return L}
DEMOS['REN-40']={d:6,f:(c,t,_w,_h,p)=>{const u=prWrap(t),fd=1/(p.dur*30);const img=c.createImageData(W,H),D=img.data;const sky=[95,168,200],ln=[32,28,36];
 const cov=(L,x,y)=>{for(const[nx,ny,d]of L)if(Math.abs(nx*x+ny*y-d)<.32)return 1;return 0};
 const hist=[];for(let k=0;k<8;k++)hist.push(lines40(u-k*fd));
 for(let y=0;y<H;y++){const lane=y<66?0:y>=69?1:-1;for(let x=0;x<W;x++){const o=(y*W+x)*4;if(lane<0){D[o]=20;D[o+1]=26;D[o+2]=36;D[o+3]=255;continue}const ly=lane?y-69:y;let v;if(!lane)v=cov(hist[0],x+.5,ly+.5);else{v=0;for(let k=0;k<8;k++)v+=cov(hist[k],x+HAL[k][0],ly+HAL[k][1]);v/=8}
  const g=ly>52?1:0;const bg=g?[148,112,74]:sky;D[o]=lerp(bg[0],ln[0],v);D[o+1]=lerp(bg[1],ln[1],v);D[o+2]=lerp(bg[2],ln[2],v);D[o+3]=255}}
 c.putImageData(img,0,0);for(const y0 of[0,69]){R(c,0,y0+52,W,2,P.grass);for(let i=0;i<5;i++)R(c,164+i*12,y0+40,2,12,P.woodD)}
 prTag(c,'NO AA: crawl',4,3,P.red);prTag(c,'TAA: 8 jittered frames',4,72,P.cyan);
 for(const[i,y0]of[[0,0],[1,69]]){for(let yy=0;yy<12;yy++)for(let xx=0;xx<12;xx++){const q=((y0+14+yy)*W+34+xx)*4;R(c,W-40+xx*3,y0+6+yy*3,3,3,'rgb('+D[q]+','+D[q+1]+','+D[q+2]+')')}prDash(c,33,y0+13,13,13,'rgba(233,237,242,.6)');prDash(c,W-40,y0+6,36,36,'#e9edf2')}}};
/* REN-41 TAA ghosting: rejected history vs smeared trails */
DEMOS['REN-41']={d:4,f:(c,t)=>{const x=u=>120+Math.sin(u*TAU)*95;for(const i of[0,1])prLane(c,i,i?'GHOSTING':'CLEAN',i?P.red:P.cyan,gy=>{house(c,60,gy);tree(c,150,gy);tree(c,210,gy);if(i){for(let k=8;k>=1;k--){const uu=t-k*.018;c.globalAlpha=.42*Math.pow(.8,k);spr(c,'hero',x(uu),gy,{sx:2,sy:2,flip:Math.cos(uu*TAU)<0});c.globalAlpha=.25*Math.pow(.8,k);circ(c,x(uu),gy-30,4,P.gold)}c.globalAlpha=1}
  spr(c,'hero',x(t),gy,{sx:2,sy:2,flip:Math.cos(t*TAU)<0});circ(c,x(t),gy-30,4,P.gold);circ(c,x(t)-1,gy-31,1.5,'#fff6c8')});
 prTag(c,'history rejected',W-4,4,P.cyan,'rgba(10,14,24,.75)',6,'right');prTag(c,'history kept: trail',W-4,73,P.red,'rgba(10,14,24,.75)',6,'right')}};

/* ========== remaining REN IDs ========== */

/* REN-01 PBR lit vs flat: same albedo, light orbits — only lit sphere responds */
DEMOS['REN-01']={d:5,f:(c,t)=>{const o=outData(c),d=o.data,L=rnL(t);rnBg(d);
 rnBall(d,60,68,34,(nx,ny,nz)=>{const base=[90,170,150];return[base[0],base[1],base[2]]});
 rnBall(d,180,68,34,(nx,ny,nz)=>{const nd=Math.max(0,nx*L[0]+ny*L[1]+nz*L[2]),H=rnN(L[0],L[1],L[2]+1),nh=Math.max(0,nx*H[0]+ny*H[1]+nz*H[2]),sp=Math.pow(nh,48)*180,amb=.18,k=amb+.82*nd;return[90*k+sp,170*k+sp,150*k+sp]});
 c.putImageData(o,0,0);rnDiv(c,120);rnSun(c,L,180,68,55);prTag(c,'FLAT albedo',4,4);prTag(c,'PBR lit',124,4,P.cyan);prTag(c,'same color in → light shapes form',120,126,'#e9edf2','rgba(10,14,24,.75)',6,'center')}};

/* REN-02 Unlit ignores scene light */
DEMOS['REN-02']={d:5,f:(c,t)=>{const o=outData(c),d=o.data,L=rnL(t);rnBg(d,[28,34,48],[12,14,22]);
 for(const[cx,unlit]of[[60,1],[180,0]])rnBall(d,cx,70,32,(nx,ny,nz)=>{if(unlit)return[210,150,70];const nd=Math.max(0,nx*L[0]+ny*L[1]+nz*L[2]),k=.15+.85*nd,sp=Math.pow(Math.max(0,nx*L[0]+ny*L[1]+nz*(L[2]+1))/Math.hypot(L[0],L[1],L[2]+1),60)*200;return[210*k+sp,150*k+sp*.9,70*k+sp*.6]});
 c.putImageData(o,0,0);rnDiv(c,120);rnSun(c,L,180,70,52);prTag(c,'UNLIT',4,4,P.gold);prTag(c,'LIT',124,4,P.cyan);prTag(c,'light moves — unlit stays flat',120,126,'#e9edf2','rgba(10,14,24,.75)',6,'center')}};

/* REN-03 Toon bands vs continuous Lambert (+ wrap / Half-Lambert phase) */
DEMOS['REN-03']={d:6,f:(c,t)=>{const o=outData(c),d=o.data,L=rnL(t),ph=Math.min(2,Math.floor(t*3));rnBg(d,[50,58,72],[22,26,36]);
 /* 0: Lambert | toon 3-tone · 1: wrap · 2: Half-Lambert */
 for(const[cx,right]of[[60,0],[180,1]])rnBall(d,cx,68,34,(nx,ny,nz)=>{const nd=nx*L[0]+ny*L[1]+nz*L[2];let k;if(!right){if(ph===0)k=.12+.88*Math.max(0,nd);else if(ph===1){const w=.35;k=.12+.88*clamp((nd+w)/(1+w))}else k=.12+.88*(nd*.5+.5)}
  else{if(ph===0)k=nd>.72?.95:nd>.38?.62:.28;else if(ph===1){const w=.35,nw=clamp((nd+w)/(1+w));k=nw>.72?.95:nw>.38?.62:.28}else{const hl=nd*.5+.5;k=hl>.72?.95:hl>.38?.62:.28}}
  const B=[220,96,78];return[B[0]*k,B[1]*k,B[2]*k]});
 c.putImageData(o,0,0);rnDiv(c,120);rnSun(c,L,180,68,55);
 for(let i=0;i<3;i++)R(c,188+i*14,118,12,6,['rgb(62,27,22)','rgb(136,59,48)','rgb(209,91,74)'][i]);
 const labs=[['LAMBERT','TOON 3-tone'],['WRAP','TOON + wrap'],['HALF-LAMBERT','TOON + H-L']];
 prTag(c,labs[ph][0],4,4,P.gold);prTag(c,labs[ph][1],124,4,P.cyan);tl(c,t,[1/3,2/3])}};

/* REN-04 Outline: inverted-hull shell vs image-edge */
DEMOS['REN-04']={d:5,f:(c,t)=>{const bob=Math.round(Math.sin(t*TAU)*3);for(const i of[0,1])prLane(c,i,i?'EDGE detect':'SHELL (hull)',i?P.gold:P.cyan,gy=>{house(c,50,gy);tree(c,170,gy);const hx=120,hy=gy+bob;if(!i){const t=TMP(),g=t.getContext('2d');g.imageSmoothingEnabled=false;g.save();g.translate(hx,hy);g.scale(2.35,2.35);spr(g,'hero',0,0,{sx:1,sy:1});g.globalCompositeOperation='source-atop';R(g,-20,-24,40,40,P.ink);g.restore();c.drawImage(t,0,0);spr(c,'hero',hx,hy,{sx:2,sy:2})}
  else{spr(c,'hero',hx,hy,{sx:2,sy:2});c.save();c.strokeStyle=P.gold;c.lineWidth=1.5;c.strokeRect(hx-9,hy-20,18,22);c.restore()}},{bg:P.sky});
 prTag(c,'backface expand',W-4,4,P.cyan,'rgba(10,14,24,.75)',6,'right');prTag(c,'image edges',W-4,73,P.gold,'rgba(10,14,24,.75)',6,'right')}};

/* REN-05 Rim light: bright band inside contour */
DEMOS['REN-05']={d:5,f:(c,t)=>{const o=outData(c),d=o.data,L=rnL(t),rimK=prTri(t);rnBg(d,[18,22,36],[8,10,18]);
 rnBall(d,120,70,42,(nx,ny,nz)=>{const nd=Math.max(0,nx*L[0]+ny*L[1]+nz*L[2]),k=.08+.55*nd,rim=rimK*Math.pow(1-Math.max(0,nz),2.8)*1.4;return[40*k+rim*220,70*k+rim*200,110*k+rim*180]});
 c.putImageData(o,0,0);rnSun(c,L,120,70,60);bar(c,160,8,60,4,rimK,P.cyan);prTag(c,'rim '+rimK.toFixed(2),4,4,rimK>.3?P.cyan:'#9aa6b8');prTag(c,'bright band inside silhouette',120,126,'#e9edf2','rgba(10,14,24,.75)',6,'center')}};

/* REN-06 Fresnel: reflectance rises at grazing */
DEMOS['REN-06']={d:5,f:(c,t)=>{const o=outData(c),d=o.data,a=t*TAU,L=rnN(Math.cos(a)*.7,.4,.6),pow=2+4*prTri(t);rnBg(d,[30,36,50],[12,14,22]);
 rnBall(d,120,68,44,(nx,ny,nz)=>{const nd=Math.max(0,nx*L[0]+ny*L[1]+nz*L[2]),F=Math.pow(1-Math.max(0,nz),pow),base=[50,90,140],env=[200,220,240];const k=.15+.7*nd;return[lerp(base[0]*k,env[0],F),lerp(base[1]*k,env[1],F),lerp(base[2]*k,env[2],F)]});
 c.putImageData(o,0,0);rnSun(c,L,120,68,58);
 for(let i=0;i<5;i++){const ang=-.9+i*.45+t,x=120+Math.cos(ang)*44,y=68+Math.sin(ang)*44,len=4+i*3;prLine(c,x,y,x+Math.cos(ang)*len,y+Math.sin(ang)*len,P.gold,1)}
 bar(c,160,8,60,4,(pow-2)/4,P.gold);prTag(c,'Fresnel ↑ at edges',4,4,P.gold);prTag(c,'face-on dim · grazing bright',120,126,'#e9edf2','rgba(10,14,24,.75)',6,'center')}};

/* REN-07 Base color / albedo before light */
DEMOS['REN-07']={d:5,f:(c,t)=>{const o=outData(c),d=o.data,L=rnL(t),kLite=.5+.5*Math.sin(t*TAU);rnBg(d);
 const tex=(nx,ny)=>{const u=Math.floor((nx+1)*4),v=Math.floor((ny+1)*3);return((u+v)&1)?[210,70,70]:[70,140,210]};
 rnBall(d,60,68,34,(nx,ny)=>tex(nx,ny));
 rnBall(d,180,68,34,(nx,ny,nz)=>{const B=tex(nx,ny),nd=Math.max(0,nx*L[0]+ny*L[1]+nz*L[2]),k=.2+.8*nd*kLite;return[B[0]*k,B[1]*k,B[2]*k]});
 c.putImageData(o,0,0);rnDiv(c,120);rnSun(c,L,180,68,50);prTag(c,'BASE COLOR',4,4,P.cyan);prTag(c,'× light',124,4,P.gold);prTag(c,'pattern lives in albedo',120,126,'#e9edf2','rgba(10,14,24,.75)',6,'center')}};

/* REN-08 Roughness: highlight width */
DEMOS['REN-08']={d:5,f:(c,t)=>{const o=outData(c),d=o.data,L=rnL(t),rough=.08+.84*prTri(t);rnBg(d,[36,40,54],[16,18,26]);
 rnBall(d,120,66,46,(nx,ny,nz)=>{const nd=Math.max(0,nx*L[0]+ny*L[1]+nz*L[2]),H=rnN(L[0],L[1],L[2]+1),nh=Math.max(0,nx*H[0]+ny*H[1]+nz*H[2]),pw=lerp(220,8,rough),sp=Math.pow(nh,pw)*(1.2-rough*.5)*220,k=.2+.6*nd;return[95*k+sp,110*k+sp,130*k+sp]});
 c.putImageData(o,0,0);rnSun(c,L,120,66,62);R(c,40,118,160,8,'rgba(10,14,24,.75)');R(c,42,120,156,4,'#5e636e');R(c,42+rough*152,118,4,8,P.gold);txt(c,'smooth',44,114,P.cyan,5,'left');txt(c,'rough',170,114,'#9aa6b8',5,'left');prTag(c,'roughness '+rough.toFixed(2),4,4,P.gold)}};

/* REN-09 Metalness: dielectric vs metal */
DEMOS['REN-09']={d:5,f:(c,t)=>{const o=outData(c),d=o.data,L=rnL(t);rnBg(d,[32,36,48],[14,16,22]);
 const shade=(nx,ny,nz,metal)=>{const nd=Math.max(0,nx*L[0]+ny*L[1]+nz*L[2]),H=rnN(L[0],L[1],L[2]+1),nh=Math.max(0,nx*H[0]+ny*H[1]+nz*H[2]),sp=Math.pow(nh,64),F=Math.pow(1-Math.max(0,nz),3);if(!metal){const k=.18+.82*nd;return[180*k+sp*180,70*k+sp*180,55*k+sp*180]}const tint=[200,150,60],k=.05+.25*nd;return[tint[0]*(k+sp*.9+F*.4),tint[1]*(k+sp*.85+F*.35),tint[2]*(k+sp*.5+F*.2)]};
 rnBall(d,60,68,34,(nx,ny,nz)=>shade(nx,ny,nz,0));rnBall(d,180,68,34,(nx,ny,nz)=>shade(nx,ny,nz,1));
 c.putImageData(o,0,0);rnDiv(c,120);rnSun(c,L,180,68,52);prTag(c,'DIELECTRIC',4,4);prTag(c,'METAL',124,4,P.gold);prTag(c,'color in diffuse vs specular',120,126,'#e9edf2','rgba(10,14,24,.75)',6,'center')}};

/* REN-10 Specular moves with light and view */
DEMOS['REN-10']={d:5,f:(c,t)=>{const o=outData(c),d=o.data,L=rnL(t);rnBg(d,[40,48,62],[18,22,30]);
 let hx=0,hy=0;rnBall(d,120,68,44,(nx,ny,nz)=>{const nd=Math.max(0,nx*L[0]+ny*L[1]+nz*L[2]),H=rnN(L[0],L[1],L[2]+1),nh=Math.max(0,nx*H[0]+ny*H[1]+nz*H[2]),sp=Math.pow(nh,80);if(sp>.55){hx=nx;hy=ny}const k=.15+.7*nd;return[70*k+sp*255,100*k+sp*255,140*k+sp*255]});
 c.putImageData(o,0,0);rnSun(c,L,120,68,60);const px=120+hx*44,py=68+hy*44;ring(c,px,py,6,1,P.gold);prLine(c,120+L[0]*60,68-L[1]*42,px,py,P.cyan,1,[2,2]);prTag(c,'specular tracks L + V',4,4,P.gold)}};

/* REN-11 Anisotropic streak highlight */
DEMOS['REN-11']={d:5,f:(c,t)=>{const o=outData(c),d=o.data,L=rnL(t);rnBg(d,[28,30,40],[12,12,18]);
 for(const[cx,aniso]of[[60,0],[180,1]])rnBall(d,cx,68,34,(nx,ny,nz)=>{const nd=Math.max(0,nx*L[0]+ny*L[1]+nz*L[2]),H=rnN(L[0],L[1],L[2]+1);let sp;if(!aniso)sp=Math.pow(Math.max(0,nx*H[0]+ny*H[1]+nz*H[2]),70);else{const tdir=rnN(0,1,0),hdot=nx*H[0]+ny*H[1]+nz*H[2],td=tdir[0]*H[0]+tdir[1]*H[1]+tdir[2]*H[2];sp=Math.pow(Math.max(0,1-td*td),4)*Math.pow(Math.max(0,hdot),.8)*.9}const k=.12+.55*nd;return[160*k+sp*220,160*k+sp*220,170*k+sp*230]});
 c.putImageData(o,0,0);rnDiv(c,120);rnSun(c,L,180,68,50);prTag(c,'isotropic',4,4);prTag(c,'ANISO streak',124,4,P.cyan)}};

/* REN-12 Emission ≠ bloom ≠ light */
DEMOS['REN-12']={d:6,f:(c,t)=>{const ph=Math.min(2,Math.floor(t*3)),ex=80+Math.sin(t*TAU)*40;
 for(const i of[0,1])prLane(c,i,i?['EMIT only','+ BLOOM','+ lights wall'][ph]:'reference',i?P.cyan:'#9aa6b8',gy=>{R(c,40,gy-40,50,40,P.wall);R(c,40,gy-40,50,3,P.wallD);R(c,150,gy-40,50,40,P.wall);R(c,150,gy-40,50,3,P.wallD);
  const ey=gy-22;circ(c,ex,ey,8,P.orange);circ(c,ex,ey,4,'#fff6c8');
  if(i&&ph>=1){c.save();c.globalCompositeOperation='lighter';circ(c,ex,ey,18,'rgba(255,160,60,.35)');circ(c,ex,ey,28,'rgba(255,140,40,.18)');c.restore()}
  if(i&&ph>=2){const fall=.4*(1-Math.abs(ex-65)/80);c.globalAlpha=clamp(fall,0,.4);R(c,40,gy-38,50,36,P.orange);c.globalAlpha=clamp(fall*.7,0,.3);R(c,150,gy-38,50,36,P.orange);c.globalAlpha=1}},{bg:'#1a2030'});
 prTag(c,['surface glow','glow + bloom','glow lights nearby'][ph],W-4,4,P.gold,'rgba(10,14,24,.75)',6,'right')}};

/* REN-13 Normal map: shading moves, silhouette fixed */
DEMOS['REN-13']={d:5,f:(c,t)=>{const o=outData(c),d=o.data,L=rnL(t),a=t*TAU;rnBg(d,[44,52,66],[20,24,32]);
 const bump=(nx,ny,nz)=>{const u=Math.atan2(nx,nz),v=Math.asin(clamp(ny,-1,1));const bu=Math.sin(u*6+a)*Math.cos(v*4)*.45;const n=rnN(nx+bu,ny+Math.cos(u*6)*.2,nz);const nd=Math.max(0,n[0]*L[0]+n[1]*L[1]+n[2]*L[2]),k=.2+.8*nd;return[140*k,120*k,95*k]};
 rnBall(d,70,70,40,(nx,ny,nz)=>{const nd=Math.max(0,nx*L[0]+ny*L[1]+nz*L[2]),k=.2+.8*nd;return[140*k,120*k,95*k]});
 rnBall(d,175,70,40,bump);
 c.putImageData(o,0,0);rnDiv(c,122);/* silhouette guides */ring(c,70,70,40,1,'rgba(233,237,242,.35)');ring(c,175,70,40,1,'rgba(127,227,216,.55)');
 rnSun(c,L,175,70,55);prTag(c,'smooth N',4,4);prTag(c,'NORMAL map',126,4,P.cyan);prTag(c,'outline unchanged',120,126,'#e9edf2','rgba(10,14,24,.75)',6,'center')}};

/* REN-14 Parallax: UVs shift with view, mesh outline fixed */
DEMOS['REN-14']={d:5,f:(c,t)=>{const o=outData(c),d=o.data,view=Math.sin(t*TAU)*.55;rnBg(d,[48,56,70],[22,26,34]);
 const brick=(u,v)=>{const uu=((u%1)+1)%1,vv=((v%1)+1)%1;if(uu<.08||vv<.1)return[60,50,44];return[170,90,70]};
 for(const[cx,pom]of[[60,0],[180,1]])rnBall(d,cx,68,34,(nx,ny,nz)=>{const u=(Math.atan2(nx,nz)/TAU+.5)*3,v=(ny*.5+.5)*2;let uu=u,vv=v;if(pom){const h=((Math.sin(u*TAU)+Math.sin(v*TAU))*.25+.5);uu+=view*h*.5;vv+=view*h*.25}const B=brick(uu,vv),nd=.35+.65*Math.max(0,nz);return[B[0]*nd,B[1]*nd,B[2]*nd]});
 c.putImageData(o,0,0);rnDiv(c,120);ring(c,60,68,34,1,'rgba(233,237,242,.3)');ring(c,180,68,34,1,'rgba(127,227,216,.5)');
 prTag(c,'flat UV',4,4);prTag(c,'PARALLAX',124,4,P.cyan);prTag(c,'view '+view.toFixed(2)+' · silhouette fixed',120,126,'#e9edf2','rgba(10,14,24,.75)',6,'center')}};

/* REN-15 Displacement moves silhouette */
DEMOS['REN-15']={d:5,f:(c,t)=>{const o=outData(c),d=o.data,L=rnL(t),amp=.5+.5*Math.sin(t*TAU);rnBg(d,[40,50,64],[18,22,30]);
 rnBall(d,60,68,34,(nx,ny,nz)=>{const nd=Math.max(0,nx*L[0]+ny*L[1]+nz*L[2]),k=.2+.8*nd;return[100*k,140*k,90*k]});
 /* displaced: ray-ish radius varies */
 const cx=180,cy=68,R0=34;for(let y=cy-R0-8;y<=cy+R0+8;y++)for(let x=cx-R0-8;x<=cx+R0+8;x++){const nx=(x+.5-cx)/R0,ny=(y+.5-cy)/R0,q=nx*nx+ny*ny;if(q<.0001)continue;const r=Math.sqrt(q),th=Math.atan2(ny,nx);const disp=1+amp*.22*Math.sin(th*5)*Math.sin(th*3+1);if(r>disp)continue;const nz=Math.sqrt(Math.max(0,1-(r/disp)*(r/disp)));const N=rnN(nx,ny,nz),nd=Math.max(0,N[0]*L[0]+N[1]*L[1]+N[2]*L[2]),k=.2+.8*nd;rnPx(d,x,y,100*k,140*k,90*k)}
 c.putImageData(o,0,0);rnDiv(c,120);ring(c,60,68,34,1,'rgba(233,237,242,.35)');prTag(c,'normal only',4,4);prTag(c,'DISPLACE',124,4,P.gold);prTag(c,'silhouette moves',120,126,P.gold,'rgba(10,14,24,.75)',6,'center')}};

/* REN-16 Alpha blend / translucency */
DEMOS['REN-16']={d:5,f:(c,t)=>{c.drawImage(scene('eday'),0,0);const a=.25+.55*prTri(t),x=40+Math.sin(t*TAU)*30;
 c.save();c.globalAlpha=a;R(c,x,20,70,90,P.cyan);R(c,x+8,28,54,74,'rgba(127,227,216,.5)');c.restore();
 spr(c,'hero',120,100,{sx:2,sy:2});prTag(c,'alpha '+a.toFixed(2),4,4,P.cyan);prTag(c,'see-through overlay',W-4,4,'#e9edf2','rgba(10,14,24,.75)',6,'right')}};

/* REN-17 Alpha clip / cutout */
DEMOS['REN-17']={d:5,f:(c,t)=>{const thr=.15+.7*prTri(t),scroll=Math.floor(t*40);for(const i of[0,1])prLane(c,i,i?'CLIP @ '+thr.toFixed(2):'BLEND',i?P.gold:P.cyan,gy=>{tree(c,40,gy);tree(c,200,gy);house(c,100,gy);spr(c,'hero',30+Math.sin(t*TAU)*20,gy,{sx:1.5,sy:1.5});
  const x0=70,y0=gy-48,w=100,h=36;for(let y=0;y<h;y++)for(let x=0;x<w;x++){const u=(x+scroll)/w,v=y/h,mask=Math.sin(u*18)*Math.sin(v*10)*.35+.5+hash(x*3+y*7)*.15;const edge=Math.min(x/w,1-x/w,v,1-v)*4;const A=clamp(mask*edge);if(!i){if(A>.05){c.globalAlpha=A;R(c,x0+x,y0+y,1,1,P.leaf)}}else if(A>=thr)R(c,x0+x,y0+y,1,1,P.leaf)}c.globalAlpha=1});
 prTag(c,'binary keep/kill',W-4,73,P.gold,'rgba(10,14,24,.75)',6,'right')}};

/* REN-18 Refraction: screen-space displace bg */
DEMOS['REN-18']={d:5,f:(c,t)=>{const s=imgData('eday').data,o=outData(c),d=o.data,bx=120+Math.sin(t*TAU)*50,by=62,Rr=28;
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=(y*W+x)*4;let sx=x,sy=y;const dx=x-bx,dy=y-by,r=Math.hypot(dx,dy);if(r<Rr&&r>0){const f=r/Rr,off=7*f*(1-f*f);sx=Math.round(x-dx/r*off);sy=Math.round(y-dy/r*off)}sx=clamp(sx,0,W-1);sy=clamp(sy,0,H-1);const j=(sy*W+sx)*4;d[i]=s[j];d[i+1]=s[j+1];d[i+2]=s[j+2];d[i+3]=255}
 c.putImageData(o,0,0);ring(c,bx,by,Rr,1,'rgba(255,255,255,.6)');circ(c,bx-8,by-8,3,'rgba(255,255,255,.5)');prTag(c,'refraction offset',4,4,P.cyan)}};

/* REN-19 SSS soft bleed through thin parts */
DEMOS['REN-19']={d:5,f:(c,t)=>{const o=outData(c),d=o.data,L=rnL(t),sssK=prTri(t);rnBg(d,[24,20,28],[10,8,14]);
 rnBall(d,130,72,36,(nx,ny,nz)=>{const nd=Math.max(0,nx*L[0]+ny*L[1]+nz*L[2]),back=Math.max(0,-nx*L[0]-ny*L[1]-nz*L[2]);const wrap=Math.max(0,(nx*L[0]+ny*L[1]+nz*L[2]+.55)/1.55);const sss=sssK*Math.pow(1-Math.abs(nz),.8)*back*1.6*Math.pow(wrap,.5);const k=.12+.7*nd;return[210*k+sss*255,140*k+sss*90,110*k+sss*40]});
 for(let y=40;y<90;y++)for(let x=70;x<105;x++){const nx=(x-88)/18,ny=(y-65)/28,q=nx*nx+ny*ny;if(q>1)continue;const thick=Math.sqrt(1-q),nd=Math.max(0,-.6*L[0]+ny*L[1]),sss=sssK*(1-thick)*1.4;const k=.15+.5*nd;rnPx(d,x,y,210*k+sss*255,130*k+sss*80,100*k+sss*30)}
 c.putImageData(o,0,0);rnSun(c,L,130,72,55);prTag(c,'SSS '+sssK.toFixed(2),4,4,sssK>.3?P.orange:'#9aa6b8');prTag(c,'light bleeds through thin',120,126,'#e9edf2','rgba(10,14,24,.75)',6,'center')}};

/* REN-20 GI color bounce */
DEMOS['REN-20']={d:5,f:(c,t)=>{const bounce=prTri(t),lx=30+Math.sin(t*TAU)*8;for(const i of[0,1])prLane(c,i,i?'GI bounce '+bounce.toFixed(2):'emit wall',i?P.cyan:P.red,gy=>{R(c,20,gy-50,40,50,P.red);R(c,20,gy-50,40,3,P.roofD);R(c,180,gy-50,40,50,P.wall);R(c,180,gy-50,40,3,P.wallD);R(c,0,gy,W,14,P.dirtD);R(c,0,gy,W,3,P.grass);
  R(c,100,gy-36,40,36,P.wall);R(c,100,gy-36,40,3,P.wallD);if(i){c.globalAlpha=.15+bounce*.4;R(c,100,gy-34,18,32,P.red);c.globalAlpha=.1+bounce*.3;R(c,0,gy,90,3,P.red);c.globalAlpha=1}circ(c,lx,gy-56,6,P.gold)},{bg:'#2a3344'});
 prTag(c,'red bleeds onto white',W-4,73,P.red,'rgba(10,14,24,.75)',6,'right')}};

/* REN-21 AO contact darkening */
DEMOS['REN-21']={d:5,f:(c,t)=>{const ao=prTri(t),hx=100+Math.sin(t*TAU)*30;for(const i of[0,1])prLane(c,i,i?'AO '+ao.toFixed(2):'no contact dark',i?P.cyan:'#9aa6b8',gy=>{house(c,70,gy);tree(c,160,gy);fence(c,30,gy,6);spr(c,'hero',hx,gy,{sx:2,sy:2,flip:Math.cos(t*TAU)<0});
  if(i){c.fillStyle='rgba(10,14,24,'+(.15+ao*.4).toFixed(2)+')';c.beginPath();c.ellipse(70,gy+1,22,4,0,0,TAU);c.fill();c.beginPath();c.ellipse(160,gy+1,14,3,0,0,TAU);c.fill();c.beginPath();c.ellipse(hx,gy+1,8,2.5,0,0,TAU);c.fill();R(c,55,gy-2,30,3,'rgba(10,14,24,'+(.1+ao*.3).toFixed(2)+')')}},{bg:P.sky});
 prTag(c,'crevice dark ≠ cast shadow',W-4,73,P.cyan,'rgba(10,14,24,.75)',6,'right')}};

/* REN-22 SSAO from depth buffer sketch */
DEMOS['REN-22']={d:5,f:(c,t)=>{const o=outData(c),d=o.data,aoK=prTri(t),bx=70+Math.sin(t*TAU)*20;rnBg(d,[90,140,180],[50,90,120]);
 const depth=(x,y)=>{const gy=100;if(y>gy)return .2+(y-gy)*.01;const s1=Math.hypot(x-bx,y-70),s2=Math.hypot(x-160,y-75);if(s1<28)return .55+(28-s1)*.01;if(s2<22)return .5+(22-s2)*.01;return .15+(gy-y)*.002};
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){const z=depth(x,y);let ao=1;if(aoK>.05){let acc=0,n=0;for(let k=0;k<8;k++){const ang=k/8*TAU+t,rr=3+k*.7,sx=Math.round(x+Math.cos(ang)*rr),sy=Math.round(y+Math.sin(ang)*rr);if(sx<0||sy<0||sx>=W||sy>=H)continue;acc+=Math.max(0,depth(sx,sy)-z-.01);n++}ao=lerp(1,clamp(1-acc/(n||1)*4.5,.35,1),aoK)}
  const base=y>100?[148,112,74]:z>.4?[200,90,70]:[95,168,200];rnPx(d,x,y,base[0]*ao,base[1]*ao,base[2]*ao)}
 c.putImageData(o,0,0);prTag(c,'SSAO '+aoK.toFixed(2),4,4,P.cyan);prTag(c,'samples nearby depth',W-4,4,'#e9edf2','rgba(10,14,24,.75)',6,'right')}};

/* REN-23 Reflection probe / IBL on sphere */
DEMOS['REN-23']={d:5,f:(c,t)=>{const o=outData(c),d=o.data,a=t*TAU;rnBg(d);
 /* bake tiny env strip colors */
 const env=u=>{const k=((u%1)+1)%1;if(k<.35)return[95,168,200];if(k<.55)return[90,150,70];if(k<.7)return[180,90,60];return[40,50,70]};
 rnBall(d,120,68,46,(nx,ny,nz)=>{const u=Math.atan2(nx*Math.cos(a)+nz*Math.sin(a),-nx*Math.sin(a)+nz*Math.cos(a))/TAU+.5;const E=env(u+(1-nz)*.15),F=.2+.8*Math.pow(1-Math.max(0,nz),2);const nd=.25+.5*Math.max(0,nz);return[lerp(60*nd,E[0],F),lerp(70*nd,E[1],F),lerp(90*nd,E[2],F)]});
 c.putImageData(o,0,0);/* env strip */for(let i=0;i<W;i++){const E=env(i/W+t);R(c,i,4,1,6,'rgb('+E[0]+','+E[1]+','+E[2]+')')}
 prTag(c,'probe / IBL',4,14,P.cyan);prTag(c,'env spins → reflection moves',120,126,'#e9edf2','rgba(10,14,24,.75)',6,'center')}};

/* REN-24 SSR needs on-screen source */
DEMOS['REN-24']={d:6,f:(c,t)=>{const u=prWrap(t),hide=u>.4&&u<.75,tx=160+Math.sin(t*TAU)*25;
 c.drawImage(scene('eday'),0,0);R(c,0,96,W,39,P.water);R(c,0,96,W,2,P.waterL);
 if(!hide){tower(c,tx,90);c.save();c.globalAlpha=.45;c.translate(tx,192);c.scale(1,-1);tower(c,0,90);c.restore();spr(c,'hero',70,100,{sx:2,sy:2})}
 else{prDash(c,tx-12,40,30,55,P.red);prTag(c,'OFF screen',tx-14,30,P.red);prLine(c,tx,100,tx,120,P.red,1,[2,2]);txt(c,'SSR miss',tx,128,P.red,6);spr(c,'hero',70+Math.sin(t*TAU*2)*8,100,{sx:2,sy:2})}
 prTag(c,hide?'SSR: no data → gap':'SSR: source visible',4,4,hide?P.red:P.cyan)}};

/* REN-25 Soft shadow penumbra grows with distance */
DEMOS['REN-25']={d:5,f:(c,t)=>{const elev=.2+.7*prTri(t);R(c,0,0,W,H,'#6fa8c4');R(c,0,90,W,45,P.dirt);R(c,0,90,W,3,P.grass);
 const lx=30+Math.sin(t*TAU)*20,ly=18+elev*45;circ(c,lx,ly,5,P.gold);ring(c,lx,ly,9,1,'rgba(242,201,76,.4)');
 R(c,100,50,16,40,P.wall);R(c,98,46,20,6,P.roof);spr(c,'hero',200,100,{sx:2,sy:2});
 const gap=90-ly,pen=4+gap*.35,sx=118+(100-lx)*.15+gap*.35;c.fillStyle='rgba(20,26,36,.55)';
 for(let i=0;i<6;i++){c.globalAlpha=.12;c.beginPath();c.ellipse(sx,100,18+pen*i*.35,5+i*.6,0,0,TAU);c.fill()}c.globalAlpha=1;
 c.fillStyle='rgba(20,26,36,.7)';c.beginPath();c.ellipse(sx,100,14,4,0,0,TAU);c.fill();
 prTag(c,'umbra',sx-20,108,P.ink,'rgba(233,237,242,.7)',5);prTag(c,'penumbra ↑ with dist',4,4,P.gold);bar(c,160,8,60,4,elev,P.gold);txt(c,'light elev',158,6,'#e9edf2',5,'right')}};

/* REN-26 Distance fog */
DEMOS['REN-26']={d:5,f:(c,t)=>{const dens=.1+.85*prTri(t),hx=50+Math.sin(t*TAU)*40;c.drawImage(scene('eday'),0,0);
 const fog=[184,196,208];for(let band=0;band<4;band++){const a=dens*(.15+band*.18);c.fillStyle='rgba('+fog[0]+','+fog[1]+','+fog[2]+','+a+')';c.fillRect(0,20+band*18,W,H)}
 tree(c,40,100);house(c,100,100);tree(c,180,100);spr(c,'hero',hx,100,{sx:2,sy:2,flip:Math.cos(t*TAU)<0});
 prTag(c,'fog dens '+dens.toFixed(2),4,4,P.cyan);prTag(c,'far washes out',W-4,4,'#e9edf2','rgba(10,14,24,.75)',6,'right')}};

/* REN-27 God rays / light shafts + dust motes */
DEMOS['REN-27']={d:5,f:(c,t)=>{c.drawImage(scene('enight'),0,0);R(c,0,0,W,H,'rgba(5,8,20,.45)');
 const lx=40+Math.sin(t*TAU)*20,ly=10;circ(c,lx,ly,4,'#fff6c8');
 c.save();c.globalCompositeOperation='lighter';for(let i=0;i<7;i++){const a=-.2+i*.12+Math.sin(t*TAU+i)*.03,len=130;const gr=c.createLinearGradient(lx,ly,lx+Math.cos(a)*len,ly+Math.sin(a)*len+80);gr.addColorStop(0,'rgba(255,220,150,.35)');gr.addColorStop(.5,'rgba(255,180,100,.12)');gr.addColorStop(1,'rgba(255,160,80,0)');c.fillStyle=gr;c.beginPath();c.moveTo(lx,ly);c.lineTo(lx+Math.cos(a-0.04)*len,ly+Math.sin(a-.04)*len+80);c.lineTo(lx+Math.cos(a+.04)*len,ly+Math.sin(a+.04)*len+80);c.closePath();c.fill()}
 /* dust motes drifting; brighten inside beams */
 for(let i=0;i<28;i++){const a0=-.2+(i%7)*.12,len=20+hash(i)*100;const px=lx+Math.cos(a0)*len+Math.sin(t*TAU*1.3+i)*6,py=ly+Math.sin(a0)*len+80*(len/130)+Math.cos(t*TAU*.9+i*1.7)*4;const inBeam=1;const a=.25+.55*hash(i+3);R(c,px,py,1+hash(i+5)>.7?2:1,'rgba(255,240,200,'+(a*inBeam)+')')}
 house(c,90,100);c.restore();R(c,90,55,36,45,'#1a2030');R(c,88,50,40,8,P.roofD);
 prTag(c,'godrays + dust',4,4,P.gold);prTag(c,'occluder blocks beam',W-4,4,'#e9edf2','rgba(10,14,24,.75)',6,'right')}};

/* REN-28 HDR values > 1 (stored), SDR can't show */
DEMOS['REN-28']={d:5,f:(c,t)=>{const peak=.4+6*t,hi=Math.min(5,Math.floor(t*6));R(c,0,0,W,H,'#141a24');
 const sw=[.2,.5,1,2,4,8];for(let i=0;i<6;i++){const v=sw[i]*peak/4,x=16+i*36,disp=Math.min(1,v);R(c,x,40,30,50,'rgb('+Math.round(disp*255)+','+Math.round(disp*220)+','+Math.round(disp*160)+')');txt(c,sw[i]+'×',x+15,100,sw[i]>1?P.gold:'#e9edf2',6);if(v>1){prDash(c,x,40,30,50,P.red);txt(c,'CLIP',x+15,55,P.red,5)}if(i===hi)prDash(c,x-1,39,32,52,P.cyan)}
 R(c,8,112,224,6,'#5e636e');R(c,8+t*220,110,4,10,P.gold);spr(c,'hero',20+t*200,128,{sx:1.5,sy:1.5});prTag(c,'HDR peak '+peak.toFixed(1),4,4,P.gold);prTag(c,'SDR display clips >1',W-4,4,P.red,'rgba(10,14,24,.75)',6,'right')}};

/* REN-29 Bloom / HALATION / BLACK-MIST cycle */
DEMOS['REN-29']={d:6,f:(c,t)=>{const ph=Math.min(2,Math.floor(t*3));c.drawImage(scene('enight'),0,0);R(c,0,0,W,H,'rgba(0,0,10,.35)');
 const lx=120+Math.sin(t*TAU)*40,ly=40;circ(c,lx,ly,5,'#fff8e0');circ(c,lx,ly,2,'#fff');
 c.save();c.globalCompositeOperation='lighter';
 if(ph===0){for(const r of[10,18,28,40]){const gr=c.createRadialGradient(lx,ly,0,lx,ly,r);gr.addColorStop(0,'rgba(255,230,180,'+(r===10?.7:.25*10/r)+')');gr.addColorStop(1,'rgba(255,180,80,0)');c.fillStyle=gr;c.fillRect(lx-r,ly-r,2*r,2*r)}}
 else if(ph===1){/* HALATION: red fringe beyond bloom */for(const r of[12,22,34]){const gr=c.createRadialGradient(lx,ly,0,lx,ly,r);gr.addColorStop(0,'rgba(255,230,180,.55)');gr.addColorStop(1,'rgba(255,180,80,0)');c.fillStyle=gr;c.fillRect(lx-r,ly-r,2*r,2*r)}for(const r of[28,42,56]){const gr=c.createRadialGradient(lx,ly,r*.4,lx,ly,r);gr.addColorStop(0,'rgba(220,40,50,0)');gr.addColorStop(.5,'rgba(220,40,50,.35)');gr.addColorStop(1,'rgba(180,20,40,0)');c.fillStyle=gr;c.fillRect(lx-r,ly-r,2*r,2*r)}}
 else{/* BLACK-MIST: soft diffusion veil */for(const r of[16,30,48,70]){const gr=c.createRadialGradient(lx,ly,0,lx,ly,r);gr.addColorStop(0,'rgba(255,240,220,'+(r===16?.4:.12*16/r)+')');gr.addColorStop(1,'rgba(200,210,220,0)');c.fillStyle=gr;c.fillRect(lx-r,ly-r,2*r,2*r)}c.globalCompositeOperation='source-over';c.fillStyle='rgba(180,190,200,.12)';c.fillRect(0,0,W,H)}
 c.restore();
 const lab=['BLOOM','HALATION (red fringe)','BLACK-MIST'][ph];prTag(c,lab,4,4,ph===1?P.red:P.cyan);prTag(c,'cycle variants',W-4,4,'#e9edf2','rgba(10,14,24,.75)',6,'right');tl(c,t,[1/3,2/3])}};

/* REN-31 Tonemap compresses HDR into display range */
DEMOS['REN-31']={d:5,f:(c,t)=>{const o=outData(c),d=o.data,L=rnL(t),on=t>.5;rnBg(d,[20,24,36],[8,10,16]);
 rnBall(d,120,68,48,(nx,ny,nz)=>{const nd=Math.max(0,nx*L[0]+ny*L[1]+nz*L[2]),H=rnN(L[0],L[1],L[2]+1),nh=Math.max(0,nx*H[0]+ny*H[1]+nz*H[2]);let r=.15+.9*nd+Math.pow(nh,80)*6,g=.2+.7*nd+Math.pow(nh,80)*5.5,b=.35+.5*nd+Math.pow(nh,80)*5;if(on){r=r/(1+r);g=g/(1+g);b=b/(1+b)}else{r=Math.min(1,r);g=Math.min(1,g);b=Math.min(1,b)}return[r*255,g*255,b*255]});
 c.putImageData(o,0,0);rnSun(c,L,120,68,65);
 /* curve plot */R(c,8,100,50,28,'rgba(10,14,24,.75)');for(let i=0;i<48;i++){const x=i/47,y=on?x/(1+x):Math.min(1,x*1.8);R(c,10+i,126-y*24,1,1,on?P.cyan:P.red)}
 prTag(c,on?'TONEMAP reinhard':'CLIP hard',4,4,on?P.cyan:P.red);prTag(c,'highlights kept',W-4,4,'#e9edf2','rgba(10,14,24,.75)',6,'right')}};

/* REN-32 Color grade / LUT palette shift (+ day-for-night) */
DEMOS['REN-32']={d:6,f:(c,t)=>{const ph=Math.min(2,Math.floor(t*3)),k=ease((t*3)%1),s=imgData('eday').data,o=outData(c),d=o.data;
 const A=[1,1,1,0,0,0],B=[[1.15,.92,.7,14,-8,-24],[.8,.95,1.2,-12,6,28],[.45,.55,.95,-20,-10,40]][ph];
 const grade=A.map((v,i)=>lerp(v,B[i],k));
 for(let i=0;i<d.length;i+=4){d[i]=clamp(s[i]*grade[0]+grade[3],0,255);d[i+1]=clamp(s[i+1]*grade[1]+grade[4],0,255);d[i+2]=clamp(s[i+2]*grade[2]+grade[5],0,255);d[i+3]=255}
 c.putImageData(o,0,0);spr(c,'hero',40+Math.sin(t*TAU)*30,100,{sx:2,sy:2});prTag(c,['→ warm LUT','→ cool LUT','→ day-for-night'][ph],4,4,ph===2?P.cyan:P.gold);R(c,W-50,8,42,4,'#5e636e');R(c,W-50+k*38,6,4,8,P.gold);tl(c,t,[1/3,2/3])}};

/* REN-34 Depth of field + SPLIT-DIOPTER lane */
DEMOS['REN-34']={d:7,f:(c,t)=>{const split=t>=.5;if(!split){const f=prKeys([[0,0],[.3,0],[.5,1],[.8,1],[1,0]],prWrap(t*2));const k=TMP(),g=k.getContext('2d');g.drawImage(scene('eday'),0,0);const nx=170+Math.sin(t*TAU)*8;shadow(g,nx,74,5);prWalker(g,nx,74,t*8,{name:'npc',s:1.5,flip:Math.cos(t*TAU)<0});
 c.save();c.filter='blur('+((1-f)*2.2).toFixed(2)+'px)';c.drawImage(k,0,0);c.restore();
 const k2=TMP2(),g2=k2.getContext('2d');fence(g2,-4,140,14);spr(g2,'hero',62,142,{sx:5,sy:5});c.save();c.filter='blur('+(f*2.8).toFixed(2)+'px)';c.drawImage(k2,0,0);c.restore();
 R(c,70,4,100,12,'rgba(10,14,24,.75)');txt(c,'near',76,10,f<.5?P.cyan:'#9aa6b8',6,'left');txt(c,'far',164,10,f>.5?P.cyan:'#9aa6b8',6,'right');R(c,96,9,46,1,'#5e636e');R(c,96+f*44,7,3,5,P.gold);prTag(c,'DoF focus',4,122,P.gold)}
 else{/* SPLIT-DIOPTER: near+far sharp, middle soft */const base=TMP(),g=base.getContext('2d');g.drawImage(scene('eday'),0,0);shadow(g,50,100,5);spr(g,'hero',50,100,{sx:2,sy:2});shadow(g,200,70,4);spr(g,'npc',200,70,{sx:1.3,sy:1.3});
 c.drawImage(base,0,0);/* soft middle band */const soft=TMP2(),sg=soft.getContext('2d');sg.drawImage(base,0,0);c.save();c.beginPath();c.rect(90,0,60,H);c.clip();c.filter='blur(2.4px)';c.drawImage(soft,0,0);c.restore();
 c.strokeStyle=P.gold;c.setLineDash([3,2]);c.strokeRect(90.5,1,59,H-2);c.setLineDash([]);prTag(c,'SPLIT-DIOPTER',4,4,P.gold);prTag(c,'near+far sharp · mid soft',4,122,P.cyan)}
 tl(c,t,[.5])}};

/* REN-35 Lens flare ghosts + long directional streaks */
DEMOS['REN-35']={d:5,f:(c,t)=>{c.drawImage(scene('eday'),0,0);const lx=30+Math.sin(t*TAU)*20,ly=24,cx=W/2,cy=H/2;
 circ(c,lx,ly,4,'#fff8e0');c.save();c.globalCompositeOperation='lighter';const gr=c.createRadialGradient(lx,ly,0,lx,ly,30);gr.addColorStop(0,'rgba(255,240,200,.8)');gr.addColorStop(1,'rgba(255,200,100,0)');c.fillStyle=gr;c.fillRect(0,0,W,H);
 for(let i=1;i<=5;i++){const u=.3+i*.15,gx=lerp(lx,2*cx-lx,u),gy=lerp(ly,2*cy-ly,u),r=3+i*2,a=.35-i*.04;circ(c,gx,gy,r,'rgba(180,220,255,'+a+')');circ(c,gx,gy,r*.5,'rgba(255,200,220,'+(a*.7)+')')}
 /* long directional streaks from point light */const ang=Math.atan2(cy-ly,cx-lx);for(const da of[0,.15,-.15,.32,-.32]){const a=ang+da,len=90+Math.abs(da)*40;const sg=c.createLinearGradient(lx,ly,lx+Math.cos(a)*len,ly+Math.sin(a)*len);sg.addColorStop(0,'rgba(255,245,210,.55)');sg.addColorStop(.4,'rgba(255,220,160,.2)');sg.addColorStop(1,'rgba(255,200,120,0)');c.strokeStyle=sg;c.lineWidth=1.2+(.32-Math.abs(da))*2;c.beginPath();c.moveTo(lx,ly);c.lineTo(lx+Math.cos(a)*len,ly+Math.sin(a)*len);c.stroke()}
 c.restore();prTag(c,'lens ghosts + streaks',4,4,P.gold);prTag(c,'along sun axis',W-4,4,'#e9edf2','rgba(10,14,24,.75)',6,'right')}};

/* REN-36 Chromatic aberration */
DEMOS['REN-36']={d:5,f:(c,t)=>{const amt=.5+7*prTri(t),s=imgData('eday').data,o=outData(c),d=o.data,cx=W/2+Math.sin(t*TAU)*20,cy=H/2;
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=(y*W+x)*4,dx=x-cx,dy=y-cy,len=Math.hypot(dx,dy)||1,r=len/140,ox=Math.round(dx/len*amt*r),oy=Math.round(dy/len*amt*r);
  const sr=(clamp(y,0,H-1)*W+clamp(x+ox,0,W-1))*4,sg=i,sb=(clamp(y,0,H-1)*W+clamp(x-ox,0,W-1))*4;d[i]=s[sr];d[i+1]=s[sg+1];d[i+2]=s[sb+2];d[i+3]=255}
 c.putImageData(o,0,0);ring(c,cx,cy,8,1,P.gold);prTag(c,'CA offset '+amt.toFixed(1)+'px',4,4,P.red);prTag(c,'R/B split at edges',W-4,4,P.cyan,'rgba(10,14,24,.75)',6,'right')}};

/* REN-37 Aliasing / jaggies on thin geometry */
DEMOS['REN-37']={d:5,f:(c,t)=>{const o=outData(c),d=o.data,ang=t*TAU*1.5,shift=Math.sin(t*TAU)*12;rnBg(d,[95,168,200],[148,112,74]);
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){let v=0;for(let i=0;i<4;i++){const a=ang+i*.35,nx=-Math.sin(a),ny=Math.cos(a),dd=nx*x+ny*y;if(Math.abs(dd-(40+i*28+shift))<.5)v=1}if(y>100){rnPx(d,x,y,148,112,74);if(v)rnPx(d,x,y,32,28,36)}else if(v)rnPx(d,x,y,32,28,36)}
 c.putImageData(o,0,0);for(let yy=0;yy<14;yy++)for(let xx=0;xx<14;xx++){const q=((30+yy)*W+50+xx)*4;R(c,W-50+xx*3,8+yy*3,3,3,'rgb('+d[q]+','+d[q+1]+','+d[q+2]+')')}prDash(c,49,29,16,16,'#e9edf2');prDash(c,W-50,8,42,42,P.gold);
 prTag(c,'jaggies / shimmer',4,4,P.red);prTag(c,'1× point sample',W-4,H-12,'#e9edf2','rgba(10,14,24,.75)',6,'right')}};

/* REN-38 MSAA: multiple samples per pixel */
DEMOS['REN-38']={d:5,f:(c,t)=>{const o=outData(c),d=o.data,ang=t*TAU,off=40+Math.sin(t*TAU)*20;rnBg(d,[95,168,200],[148,112,74]);
 const cov=(x,y)=>{const nx=-Math.sin(ang),ny=Math.cos(ang);return Math.abs(nx*x+ny*y-off)<.7?1:0};
 const offs=[[.25,.25],[.75,.25],[.25,.75],[.75,.75]];
 for(let y=0;y<H;y++){const lane=y<66?0:y>=69?1:-1;for(let x=0;x<W;x++){if(lane<0){rnPx(d,x,y,20,26,36);continue}const ly=lane?y-69:y;let v;if(!lane)v=cov(x+.5,ly+.5);else{v=0;for(const[ox,oy]of offs)v+=cov(x+ox,ly+oy);v/=4}
  const bg=ly>52?[148,112,74]:[95,168,200];rnPx(d,x,y,lerp(bg[0],32,v),lerp(bg[1],28,v),lerp(bg[2],36,v))}}
 c.putImageData(o,0,0);R(c,0,66,W,3,P.ink);prTag(c,'1 sample: stair',4,3,P.red);prTag(c,'MSAA 4× coverage',4,72,P.cyan);
 for(const y0 of[0,69]){for(let yy=0;yy<10;yy++)for(let xx=0;xx<10;xx++){const q=((y0+20+yy)*W+40+xx)*4;R(c,W-38+xx*3,y0+8+yy*3,3,3,'rgb('+d[q]+','+d[q+1]+','+d[q+2]+')')}prDash(c,W-38,y0+8,30,30,'#e9edf2')}
 spr(c,'hero',30+Math.sin(t*TAU)*90,54,{sx:1.5,sy:1.5});spr(c,'hero',30+Math.sin(t*TAU)*90,123,{sx:1.5,sy:1.5})}};

/* REN-39 FXAA: soften stair-steps in post */
DEMOS['REN-39']={d:5,f:(c,t)=>{const o=outData(c),d=o.data,ang=t*TAU,off=50+Math.cos(t*TAU)*25;rnBg(d,[95,168,200],[148,112,74]);
 const line=(x,y)=>{const nx=-Math.sin(ang),ny=Math.cos(ang);return Math.abs(nx*x+ny*y-off)<.55?1:0};
 const raw=new Float32Array(W*66);for(let y=0;y<66;y++)for(let x=0;x<W;x++)raw[y*W+x]=line(x+.5,y+.5);
 for(let y=0;y<H;y++){const lane=y<66?0:y>=69?1:-1;for(let x=0;x<W;x++){if(lane<0){rnPx(d,x,y,20,26,36);continue}const ly=lane?y-69:y;let v=raw[ly*W+x];if(lane){const l=raw[ly*W+clamp(x-1,0,W-1)],r=raw[ly*W+clamp(x+1,0,W-1)],u=raw[clamp(ly-1,0,65)*W+x],dn=raw[clamp(ly+1,0,65)*W+x];if(Math.abs(l-r)+Math.abs(u-dn)>.1)v=(v+l+r+u+dn)/5}
  const bg=ly>52?[148,112,74]:[95,168,200];rnPx(d,x,y,lerp(bg[0],32,v),lerp(bg[1],28,v),lerp(bg[2],36,v))}}
 c.putImageData(o,0,0);R(c,0,66,W,3,P.ink);prTag(c,'aliased',4,3,P.red);prTag(c,'FXAA soften',4,72,P.cyan);spr(c,'hero',40+t*160,54,{sx:1.5,sy:1.5});spr(c,'hero',40+t*160,123,{sx:1.5,sy:1.5})}};

/* REN-42 Upscale / temporal reconstruct */
DEMOS['REN-42']={d:5,f:(c,t)=>{const src=scene('eday'),low=TMP(),lg=low.getContext('2d');lg.imageSmoothingEnabled=false;/* render 1/3 res */
 const sw=80,sh=45;lg.drawImage(src,0,0,W,H,0,0,sw,sh);
 R(c,0,0,W,H,'#141a24');
 /* left: nearest upscale */c.imageSmoothingEnabled=false;c.drawImage(low,0,0,sw,sh,4,20,110,62);
 /* right: "reconstruct" = bilinear-ish via smoothing + slight sharpen feel */
 const hi=TMP2(),hg=hi.getContext('2d');hg.imageSmoothingEnabled=true;hg.drawImage(low,0,0,sw,sh,0,0,110,62);c.drawImage(hi,0,0,110,62,126,20,110,62);
 prDash(c,4,20,110,62,P.red);prDash(c,126,20,110,62,P.cyan);
 /* jitter hint */const jx=Math.sin(t*TAU*4)*2,jy=Math.cos(t*TAU*4)*2;R(c,126+55+jx,90,3,3,P.gold);
 prTag(c,'LOW '+sw+'×'+sh,4,4,P.red);prTag(c,'nearest',4,88,'#9aa6b8');prTag(c,'reconstruct',126,88,P.cyan);prTag(c,'temporal samples rebuild detail',120,126,'#e9edf2','rgba(10,14,24,.75)',6,'center')}};

})();
