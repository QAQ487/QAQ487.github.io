/* ===== NPR demos (stylised rendering, batch 3) — all names local to this IIFE, helpers prefixed np ===== */
(()=>{
/* ---------- tiny maths ---------- */
const npIH=(x)=>{x=Math.imul(x^(x>>>16),0x45d9f3b);x=Math.imul(x^(x>>>16),0x45d9f3b);return ((x^(x>>>16))>>>0)/4294967296};
const npH2=(x,y,s)=>npIH((x*73856093)^(y*19349663)^(s*83492791));
function npVN(x,y,s=0){const xi=Math.floor(x),yi=Math.floor(y),fx=x-xi,fy=y-yi,ux=fx*fx*(3-2*fx),uy=fy*fy*(3-2*fy);const a=npH2(xi,yi,s),b=npH2(xi+1,yi,s),c=npH2(xi,yi+1,s),d=npH2(xi+1,yi+1,s);return a+(b-a)*ux+(c-a)*uy+(a-b-c+d)*ux*uy}
function npFbm(x,y,s=0){return .5*npVN(x,y,s)+.3*npVN(x*2.03,y*2.03,s+7)+.2*npVN(x*4.1,y*4.1,s+13)}
const npSS=(a,b,x)=>{x=clamp((x-a)/(b-a));return x*x*(3-2*x)};
const npHex=(h)=>[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];
function npTag(c,s,x,y){c.font='bold 7px monospace';const w=c.measureText(s).width+6;R(c,x-w/2,y-5,w,10,'rgba(10,14,24,.78)');txt(c,s,x,y,'#e9edf2',7)}
function npDiv(c,x,h){R(c,x,0,1,h||H,'rgba(255,255,255,.9)')}
function npLight(t,el=.95){const a=t*TAU+.6,x=Math.cos(a)*.85,z=Math.sin(a)*.85,y=el,l=Math.hypot(x,y,z);return [x/l,y/l,z/l]}

/* ---------- SDF still-life scene → cached G-buffer (normal, depth, id, AO, edges) ---------- */
const NP_EYE=[0,2.6,6.4],NP_TGT=[0,.6,0];
const NP_COL=[[.80,.88,.95],[.56,.70,.42],[.85,.38,.30],[.90,.70,.25],[.36,.54,.82],[.62,.42,.80]]; /* sky, ground, sphere, torus, box, capsule */
let npId=0;
function npMap(x,y,z){let d=y,id=1;
 let dx=x+1.7,dy=y-.9,dd=Math.sqrt(dx*dx+dy*dy+z*z)-.9;if(dd<d){d=dd;id=2}
 {const px=x-.25,py=y-.62,pz=z-1.05,c=.5,s=.866,ty=c*py-s*pz,tz=s*py+c*pz,q=Math.sqrt(px*px+tz*tz)-.6;dd=Math.sqrt(q*q+ty*ty)-.24;if(dd<d){d=dd;id=3}}
 {let px=x-1.9,py=y-.7,pz=z+.4;const c=.866,s=.5,rx=c*px-s*pz,rz=s*px+c*pz;const qx=Math.abs(rx)-.6,qy=Math.abs(py)-.6,qz=Math.abs(rz)-.6;const mx=Math.max(qx,0),my=Math.max(qy,0),mz=Math.max(qz,0);dd=Math.sqrt(mx*mx+my*my+mz*mz)+Math.min(Math.max(qx,qy,qz),0)-.1;if(dd<d){d=dd;id=4}}
 {const cy=clamp(y,.45,1.75),px=x+.15,py=y-cy,pz=z+2.0;dd=Math.sqrt(px*px+py*py+pz*pz)-.45;if(dd<d){d=dd;id=5}}
 npId=id;return d}
let npGB={};
function npG(w){if(npGB[w])return npGB[w];
 const h=Math.round(w*9/16),N=w*h,G={w,h,id:new Uint8Array(N),n:new Float32Array(N*3),t:new Float32Array(N),p:new Float32Array(N*3),ao:new Float32Array(N),v:new Float32Array(N*3)};
 if(w===240){const B=npG(480);for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=y*w+x,j=(y*2)*480+x*2;G.id[i]=B.id[j];G.t[i]=B.t[j];G.ao[i]=B.ao[j];for(let k=0;k<3;k++){G.n[i*3+k]=B.n[j*3+k];G.p[i*3+k]=B.p[j*3+k];G.v[i*3+k]=B.v[j*3+k]}}}
 else{const f=[NP_TGT[0]-NP_EYE[0],NP_TGT[1]-NP_EYE[1],NP_TGT[2]-NP_EYE[2]],fl=Math.hypot(...f);f[0]/=fl;f[1]/=fl;f[2]/=fl;const r=[-f[2],0,f[0]],rl=Math.hypot(...r);r[0]/=rl;r[2]/=rl;const u=[r[1]*f[2]-r[2]*f[1],r[2]*f[0]-r[0]*f[2],r[0]*f[1]-r[1]*f[0]];const th=Math.tan(20*Math.PI/180);
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=y*w+x,sx=((x+.5)/w*2-1)*th*w/h,sy=(1-(y+.5)/h*2)*th;let dx=f[0]+r[0]*sx+u[0]*sy,dy=f[1]+r[1]*sx+u[1]*sy,dz=f[2]+r[2]*sx+u[2]*sy;const dl=Math.sqrt(dx*dx+dy*dy+dz*dz);dx/=dl;dy/=dl;dz/=dl;G.v[i*3]=dx;G.v[i*3+1]=dy;G.v[i*3+2]=dz;
  let t=0,id=0;for(let k=0;k<110;k++){const px=NP_EYE[0]+dx*t,py=NP_EYE[1]+dy*t,pz=NP_EYE[2]+dz*t;const d=npMap(px,py,pz);if(d<.0008*t+.0004){id=npId;break}t+=d;if(t>38)break}
  if(!id){G.t[i]=40;G.n[i*3+1]=1;continue}
  const px=NP_EYE[0]+dx*t,py=NP_EYE[1]+dy*t,pz=NP_EYE[2]+dz*t,e=.0015;G.id[i]=id;G.t[i]=t;G.p[i*3]=px;G.p[i*3+1]=py;G.p[i*3+2]=pz;
  let nx=npMap(px+e,py,pz)-npMap(px-e,py,pz),ny=npMap(px,py+e,pz)-npMap(px,py-e,pz),nz=npMap(px,py,pz+e)-npMap(px,py,pz-e);const nl=Math.sqrt(nx*nx+ny*ny+nz*nz)||1;nx/=nl;ny/=nl;nz/=nl;G.n[i*3]=nx;G.n[i*3+1]=ny;G.n[i*3+2]=nz;
  let o=0,sc=1;for(let k=1;k<=5;k++){const hh=.06*k;o+=(hh-npMap(px+nx*hh,py+ny*hh,pz+nz*hh))*sc;sc*=.6}G.ao[i]=clamp(1-2.2*o,.25,1)}}
 /* edges: depth (relative Sobel) and normal (Sobel on n) */
 G.eD=new Float32Array(N);G.eN=new Float32Array(N);
 for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){const i=y*w+x,T=(a,b)=>G.t[(y+b)*w+x+a];
  const gx=(T(1,-1)+2*T(1,0)+T(1,1))-(T(-1,-1)+2*T(-1,0)+T(-1,1)),gy=(T(-1,1)+2*T(0,1)+T(1,1))-(T(-1,-1)+2*T(0,-1)+T(1,-1));G.eD[i]=Math.sqrt(gx*gx+gy*gy)/Math.min(G.t[i],12);{let obj=0;for(let b=-1;b<=1;b++)for(let a=-1;a<=1;a++)if(G.id[(y+b)*w+x+a]>1)obj=1;if(!obj)G.eD[i]=0}
  let s=0;for(let k=0;k<3;k++){const Nn=(a,b)=>G.n[((y+b)*w+x+a)*3+k];const nx=(Nn(1,-1)+2*Nn(1,0)+Nn(1,1))-(Nn(-1,-1)+2*Nn(-1,0)+Nn(-1,1)),ny=(Nn(-1,1)+2*Nn(0,1)+Nn(1,1))-(Nn(-1,-1)+2*Nn(0,-1)+Nn(1,-1));s+=nx*nx+ny*ny}G.eN[i]=Math.sqrt(s)}
 return npGB[w]=G}
function npEdge(G,i,kd=.35,kn=1.2){return Math.max(npSS(kd*.6,kd,G.eD[i]),npSS(kn*.6,kn,G.eN[i]))}
function npNdl(G,i,L){return G.n[i*3]*L[0]+G.n[i*3+1]*L[1]+G.n[i*3+2]*L[2]}
function npSpec(G,i,L,pw){let hx=L[0]-G.v[i*3],hy=L[1]-G.v[i*3+1],hz=L[2]-G.v[i*3+2];const hl=Math.sqrt(hx*hx+hy*hy+hz*hz);return Math.pow(Math.max(0,(G.n[i*3]*hx+G.n[i*3+1]*hy+G.n[i*3+2]*hz)/hl),pw)}
const npOut={};function npImg(c,w,h){const k=w+'x'+h;if(!npOut[k])npOut[k]=c.createImageData(w,h);return npOut[k]}
function npSky(G,i,y){const k=y/G.h;return [.72+.2*k,.84+.1*k,.97]}

/* ---------- triangle rasteriser (perspective-correct or affine) ---------- */
function npCam(eye,tgt,fovDeg,vx,vy,vw,vh,ortho){const f=[tgt[0]-eye[0],tgt[1]-eye[1],tgt[2]-eye[2]],fl=Math.hypot(...f);f[0]/=fl;f[1]/=fl;f[2]/=fl;let r=[-f[2],0,f[0]];const rl=Math.hypot(...r);r=[r[0]/rl,0,r[2]/rl];const u=[r[1]*f[2]-r[2]*f[1],r[2]*f[0]-r[0]*f[2],r[0]*f[1]-r[1]*f[0]];
 const foc=(vh/2)/Math.tan(fovDeg*Math.PI/360),cx=vx+vw/2,cy=vy+vh/2;
 return {eye,f,r,u,vx,vy,vw,vh,proj(p){const dx=p[0]-eye[0],dy=p[1]-eye[1],dz=p[2]-eye[2];const xv=dx*r[0]+dy*r[1]+dz*r[2],yv=dx*u[0]+dy*u[1]+dz*u[2],zv=dx*f[0]+dy*f[1]+dz*f[2];if(ortho)return {x:cx+xv*ortho,y:cy-yv*ortho,z:zv,iw:1};return {x:cx+xv*foc/zv,y:cy-yv*foc/zv,z:zv,iw:1/zv}}}}
/* buf: Uint8ClampedArray (RGBA) of width bw; zb Float32Array; clip rect; v{ x,y,z,iw,a:[...] }; sh(a,out) → out[0..2] */
const npO=[0,0,0];
function npTri(buf,zb,bw,cl,v0,v1,v2,sh,o={}){const ar=(v1.x-v0.x)*(v2.y-v0.y)-(v1.y-v0.y)*(v2.x-v0.x);if(o.cull!==false&&ar>=0)return;if(Math.abs(ar)<1e-6)return;
 const x0=Math.max(cl[0],Math.floor(Math.min(v0.x,v1.x,v2.x))),x1=Math.min(cl[2]-1,Math.ceil(Math.max(v0.x,v1.x,v2.x))),y0=Math.max(cl[1],Math.floor(Math.min(v0.y,v1.y,v2.y))),y1=Math.min(cl[3]-1,Math.ceil(Math.max(v0.y,v1.y,v2.y)));
 const n=v0.a.length,A=new Array(n),inv=1/ar;
 const d0x=(v1.y-v2.y)*inv,d1x=(v2.y-v0.y)*inv;
 for(let y=y0;y<=y1;y++){const py=y+.5,px0=x0+.5;let b0=((v1.x-px0)*(v2.y-py)-(v1.y-py)*(v2.x-px0))*inv,b1=((v2.x-px0)*(v0.y-py)-(v2.y-py)*(v0.x-px0))*inv;b0-=d0x;b1-=d1x;
 for(let x=x0;x<=x1;x++){b0+=d0x;b1+=d1x;const b2=1-b0-b1;if(b0<0||b1<0||b2<0)continue;
  const iw=b0*v0.iw+b1*v1.iw+b2*v2.iw,z=o.ortho?b0*v0.z+b1*v1.z+b2*v2.z:1/iw,idx=y*bw+x;if(zb&&zb[idx]<=z)continue;
  if(o.affine||o.ortho){for(let k=0;k<n;k++)A[k]=b0*v0.a[k]+b1*v1.a[k]+b2*v2.a[k]}else{for(let k=0;k<n;k++)A[k]=(b0*v0.a[k]*v0.iw+b1*v1.a[k]*v1.iw+b2*v2.a[k]*v2.iw)/iw}
  if(sh(A,npO,x,y)===false)continue;if(zb)zb[idx]=z;const j=idx*4;buf[j]=npO[0];buf[j+1]=npO[1];buf[j+2]=npO[2];buf[j+3]=255}}}
function npFill(buf,bw,cl,f){for(let y=cl[1];y<cl[3];y++)for(let x=cl[0];x<cl[2];x++){f(x,y,npO);const j=(y*bw+x)*4;buf[j]=npO[0];buf[j+1]=npO[1];buf[j+2]=npO[2];buf[j+3]=255}}
const npZ={};function npZB(n){if(!npZ[n])npZ[n]=new Float32Array(n);npZ[n].fill(1e9);return npZ[n]}
/* meshes */
function npCube(cx,cy,cz,s,ry){const P8=[];for(let i=0;i<8;i++){const x=(i&1?1:-1)*s,y=(i&2?1:-1)*s,z=(i&4?1:-1)*s,c=Math.cos(ry),sn=Math.sin(ry);P8.push([cx+c*x-sn*z,cy+y,cz+sn*x+c*z])}
 const F=[[0,2,3,1,[0,0,-1]],[4,5,7,6,[0,0,1]],[0,4,6,2,[-1,0,0]],[1,3,7,5,[1,0,0]],[2,6,7,3,[0,1,0]],[0,1,5,4,[0,-1,0]]];
 return F.map(q=>{const n=q[4],c=Math.cos(ry),sn=Math.sin(ry);return {p:[P8[q[0]],P8[q[1]],P8[q[2]],P8[q[3]]],n:[c*n[0]-sn*n[2],n[1],sn*n[0]+c*n[2]]}})}
function npIco(sub,seed,amp){const t=(1+Math.sqrt(5))/2;let V=[[-1,t,0],[1,t,0],[-1,-t,0],[1,-t,0],[0,-1,t],[0,1,t],[0,-1,-t],[0,1,-t],[t,0,-1],[t,0,1],[-t,0,-1],[-t,0,1]].map(v=>{const l=Math.hypot(...v);return v.map(a=>a/l)});
 let F=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]];
 for(let s=0;s<sub;s++){const mid={},nf=[];const m=(a,b)=>{const k=a<b?a+'_'+b:b+'_'+a;if(mid[k]!=null)return mid[k];const p=V[a].map((x,i)=>(x+V[b][i])/2),l=Math.hypot(...p);V.push(p.map(x=>x/l));return mid[k]=V.length-1};for(const [a,b,c] of F){const ab=m(a,b),bc=m(b,c),ca=m(c,a);nf.push([a,ab,ca],[b,bc,ab],[c,ca,bc],[ab,bc,ca])}F=nf}
 V=V.map((v,i)=>{const k=1+(npIH(i*7+seed)-.5)*2*amp;return [v[0]*k,v[1]*k*.8,v[2]*k]});
 const VN=V.map(()=>[0,0,0]);const FN=F.map(([a,b,c])=>{const e1=V[b].map((x,i)=>x-V[a][i]),e2=V[c].map((x,i)=>x-V[a][i]);let n=[e1[1]*e2[2]-e1[2]*e2[1],e1[2]*e2[0]-e1[0]*e2[2],e1[0]*e2[1]-e1[1]*e2[0]];const l=Math.hypot(...n);n=n.map(x=>x/l);for(const k of [a,b,c])for(let i=0;i<3;i++)VN[k][i]+=n[i];return n});
 return {V,F,FN,VN:VN.map(n=>{const l=Math.hypot(...n);return n.map(x=>x/l)})}}
const npRotY=(p,a)=>{const c=Math.cos(a),s=Math.sin(a);return [c*p[0]-s*p[2],p[1],s*p[0]+c*p[2]]};

/* =========================================================== */
/* NPR-01 Gooch shading — left Lambert (shadow side goes black, form lost) | right Gooch cool→warm, edges + highlight */
DEMOS['NPR-01']={d:6,f:(c,t)=>{const G=npG(240),o=npImg(c,W,H),d=o.data,L=npLight(t,.8),half=W/2;
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=y*W+x,j=i*4,id=G.id[i];let r,g,b;
  if(!id){const s=npSky(G,i,y);r=s[0];g=s[1];b=s[2];if(x>=half){r=g=b=.96}}
  else{const B=NP_COL[id],ndl=npNdl(G,i,L);
   if(x<half){const k=.06+.94*Math.max(0,ndl);r=B[0]*k;g=B[1]*k;b=B[2]*k}
   else{const k=(1+ndl)/2,cr=.25*B[0],cg=.25*B[1],cb=.45+.25*B[2],wr=.45+.55*B[0],wg=.4+.55*B[1],wb=.55*B[2];r=cr+(wr-cr)*k;g=cg+(wg-cg)*k;b=cb+(wb-cb)*k;
    if(id>1&&npSpec(G,i,L,48)>.55){r=g=b=1}const e=npEdge(G,i);r*=1-e;g*=1-e;b*=1-e}}
  d[j]=r*255;d[j+1]=g*255;d[j+2]=b*255;d[j+3]=255}
 c.putImageData(o,0,0);npDiv(c,half);npTag(c,'LAMBERT',half/2,8);npTag(c,'GOOCH  cool -> warm',half*1.5,8);
 /* light gizmo */const gx=W-14,gy=H-14;ring(c,gx,gy,8,1,'rgba(20,20,30,.6)');circ(c,gx+L[0]*7,gy+L[2]*7,2.5,P.gold);
 /* swatch */for(let k=0;k<20;k++){const q=k/19;R(c,half+6+k*3,H-12,3,6,'rgb('+Math.round((.25*.85+(.45+.55*.85-.25*.85)*q)*255)+','+Math.round((.25*.38+(.4+.55*.38-.25*.38)*q)*255)+','+Math.round((.45+.25*.30+(.55*.30-.45-.25*.30)*q)*255)+')')}txt(c,'cool',half+12,H-17,'#334',6);txt(c,'warm',half+60,H-17,'#334',6)}};

/* NPR-02 Stylised specular / anime hair highlight — two heads, light swings L↔R */
/* static per-pixel head data (computed once): type 0 out,1 outline,2 hair,3 skin,4 pupil,5 glint; normal; angel-ring lat/jitter/width/core */
let npHP=null;
function npHeadPre(rad){if(npHP)return npHP;const S=Math.ceil(rad+3)*2+1,N=S*S,o=Math.floor(S/2),H8=new Uint8Array(N),nn=new Float32Array(N*3),lj=new Float32Array(N),wd=new Float32Array(N),co=new Uint8Array(N);
 for(let yy=0;yy<S;yy++)for(let xx=0;xx<S;xx++){const i=yy*S+xx,nx=(xx-o)/rad,ny=(o-yy)/rad,q=nx*nx+ny*ny;
  if(q>1){if(q<Math.pow(1+3/rad,2))H8[i]=1;continue}
  const nz=Math.sqrt(1-q);nn[i*3]=nx;nn[i*3+1]=ny;nn[i*3+2]=nz;const ang=Math.atan2(nx,nz),bang=.18-.16*Math.abs(Math.sin(ang*7.5));
  if(ny>bang||Math.abs(nx)>.78){H8[i]=2;const lat=Math.asin(clamp(ny,-1,1)),st=(ang+Math.PI)*24/Math.PI,si=Math.floor(st),fr=st-si;lj[i]=ny<.97?lat-(npIH(si*31+5)-.5)*.10:99;wd[i]=.085*(1-Math.abs(fr-.5)*1.5);co[i]=Math.abs(fr-.5)<.2?1:0}
  else{H8[i]=3;const ex=Math.abs(nx)-.32,ey=ny+.12;if(ex*ex/.012+ey*ey/.03<1){H8[i]=4;if((ex+.03)*(ex+.03)/.002+(ey-.06)*(ey-.06)/.004<1)H8[i]=5}}}
 return npHP={S,o,H8,nn,lj,wd,co}}
function npHead(d,cx,cy,rad,L,toon){const P=npHeadPre(rad),S=P.S;let hx=L[0],hy=L[1],hz=L[2]+1;const hl=Math.hypot(hx,hy,hz);hx/=hl;hy/=hl;hz/=hl;const c0=.72+.05*L[0];
 for(let yy=0;yy<S;yy++){const y=cy-P.o+yy;if(y<0||y>=270)continue;for(let xx=0;xx<S;xx++){const x=cx-P.o+xx,i=yy*S+xx,ty=P.H8[i];if(!ty||x<0||x>=480)continue;const j=(y*480+x)*4;
  if(ty===1){if(toon){d[j]=30;d[j+1]=22;d[j+2]=40}continue}
  let r,g,b;if(ty>=4){if(ty===5){r=g=b=1}else{r=.12;g=.1;b=.2}d[j]=r*255;d[j+1]=g*255;d[j+2]=b*255;continue}
  const nx=P.nn[i*3],ny=P.nn[i*3+1],nz=P.nn[i*3+2],ndl=nx*L[0]+ny*L[1]+nz*L[2];
  if(ty===2){if(!toon){const k=.12+.88*Math.max(0,ndl),ndh=Math.max(0,nx*hx+ny*hy+nz*hz);let s=ndh*ndh;s*=s;s*=s;s=s*s*ndh;s=s*s*s*s*.9;r=.36*k+s;g=.24*k+s;b=.55*k+s}
   else{const lit=ndl>.15;r=lit?.36:.17;g=lit?.24:.11;b=lit?.55:.30;const dl=Math.abs(P.lj[i]-c0),w=P.wd[i];if(dl<w){r=.86;g=.80;b=1;if(dl<w*.35&&P.co[i]){r=g=b=1}}}}
  else{if(!toon){const k=.25+.75*Math.max(0,ndl),ndh=Math.max(0,nx*hx+ny*hy+nz*hz);let s=ndh*ndh;s*=s;s*=s;s*=s;s=s*s*.25;r=.96*k+s;g=.80*k+s;b=.66*k+s}
   else{const lit=ndl>.1;r=lit?.96:.85;g=lit?.80:.58;b=lit?.66:.52}}
  d[j]=r*255;d[j+1]=g*255;d[j+2]=b*255}}}
let npHBg=null;
DEMOS['NPR-02']={d:6,hi:true,f:(c,t)=>{const o=npImg(c,480,270),d=o.data;if(!npHBg){npHBg=new Uint8ClampedArray(480*270*4);for(let y=0;y<270;y++){const k=y/270;for(let x=0;x<480;x++){const j=(y*480+x)*4;npHBg[j]=(.16+.1*k)*255;npHBg[j+1]=(.18+.1*k)*255;npHBg[j+2]=(.26+.08*k)*255;npHBg[j+3]=255}}}d.set(npHBg);
 const s=Math.sin(t*TAU),L=[s*.8,.55,.45],ll=Math.hypot(...L);L[0]/=ll;L[1]/=ll;L[2]/=ll;
 npHead(d,125,150,88,L,false);npHead(d,355,150,88,L,true);blitData(c,o);
 c.save();c.scale(2,2);npDiv(c,W/2);npTag(c,'REALISTIC (Blinn-Phong)',60,8);npTag(c,'TOON + ANGEL RING',180,8);
 for(const cx of [62,177]){circ(c,cx+s*40,24,3,P.gold);}txt(c,'light',W/2,24,'#c9d1dc',6);c.restore()}};

/* NPR-03 Edge-detection outline — phases: no lines → depth edges (red) → normal edges (cyan) → combined black on toon */
DEMOS['NPR-03']={d:8,f:(c,t)=>{const G=npG(240),o=npImg(c,W,H),d=o.data,L=npLight(.15,.8),ph=Math.min(3,Math.floor(t*4));
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=y*W+x,j=i*4,id=G.id[i];let r,g,b;
  if(!id){r=.85;g=.92;b=.98}else{const B=NP_COL[id],ndl=npNdl(G,i,L),k=ndl>.3?1:.62;r=B[0]*k;g=B[1]*k;b=B[2]*k}
  const ed=npSS(.21,.35,G.eD[i]),en=npSS(.7,1.2,G.eN[i]);
  if(ph===1&&ed>0){r+=(1-r)*ed;g*=1-ed;b*=1-ed}
  else if(ph===2&&en>0){r*=1-en;g+=(1-g)*en;b+=(1-b)*en}
  else if(ph===3){const e=Math.max(ed,en);r*=1-e;g*=1-e;b*=1-e}
  d[j]=r*255;d[j+1]=g*255;d[j+2]=b*255;d[j+3]=255}
 c.putImageData(o,0,0);npTag(c,['1. SHADING ONLY','2. DEPTH EDGES (silhouettes)','3. NORMAL EDGES (creases)','4. DEPTH + NORMAL = OUTLINE'][ph],W/2,8);tl(c,t,[.25,.5,.75])}};

/* NPR-04 Line boil — same doodle; left stable, right 3 redrawn line sets cycling at 8 fps (fills stay still) */
const npDoodle=(()=>{const S=[];const circP=(cx,cy,rx,ry,n,a0=0,a1=TAU)=>{const p=[];for(let i=0;i<=n;i++){const a=a0+(a1-a0)*i/n;p.push([cx+Math.cos(a)*rx,cy+Math.sin(a)*ry])}return p};
 S.push({p:[[-22,20],[-24,-2],[-16,-18],[0,-24],[16,-18],[24,-2],[22,20],[-22,20]],fill:'#8fd3a8'});
 S.push({p:circP(-8,-4,4,5,10),fill:'#ffffff'});S.push({p:circP(8,-4,4,5,10),fill:'#ffffff'});
 S.push({p:circP(-7,-3,1.6,2,6),fill:'#1d1b26'});S.push({p:circP(9,-3,1.6,2,6),fill:'#1d1b26'});
 S.push({p:circP(0,6,6,4,8,.2,Math.PI-.2)});
 S.push({p:[[-34,20],[34,20]]});S.push({p:[[-14,-22],[-18,-34],[-10,-28]]});
 S.push({p:circP(26,-30,6,6,12),fill:'#f2c94c'});return S})();
function npDrawDoodle(c,ox,oy,seed,amp){for(const s of npDoodle){if(s.fill){c.fillStyle=s.fill;c.beginPath();s.p.forEach((q,i)=>i?c.lineTo(ox+q[0],oy+q[1]):c.moveTo(ox+q[0],oy+q[1]));c.fill()}}
 c.strokeStyle='#1d1b26';c.lineJoin='round';c.lineCap='round';let si=0;
 for(const s of npDoodle){si++;c.lineWidth=amp?1.3+npIH(seed*97+si)*.7:1.6;c.beginPath();s.p.forEach((q,i)=>{const jx=amp?(npIH(seed*1013+si*131+i*7)-.5)*2*amp:0,jy=amp?(npIH(seed*2027+si*71+i*13)-.5)*2*amp:0;const X=ox+q[0]+jx,Y=oy+q[1]+jy;i?c.lineTo(X,Y):c.moveTo(X,Y)});c.stroke()}}
DEMOS['NPR-04']={d:3,hi:true,f:(c,t)=>{R(c,0,0,480,270,'#f4efe4');c.save();c.scale(2,2);const k=Math.floor(t*24)%3;
 npDrawDoodle(c,60,72,0,0);npDrawDoodle(c,180,72,k+1,1.25);npDiv(c,W/2);
 npTag(c,'STABLE LINES',60,8);npTag(c,'LINE BOIL  8 fps, 3 drawings',180,8);
 for(let i=0;i<3;i++){circ(c,168+i*12,118,3.2,i===k?P.red:'#c9c1b0')}txt(c,'drawing '+(k+1)+'/3',180,128,'#5a5248',7);txt(c,'fills do not move',60,118,'#5a5248',7);c.restore()}};

/* NPR-05 Hatching — tone → stroke layers (45°, −45°, horizontal, dense) in screen space; TAM legend */
function npHatchInk(x,y,tone){const w=1.1*Math.sin(y*.05+x*.031);const L=(v,s,th)=>((v%s)+s)%s<th;
 return (tone<.78&&L(x+y+w,7,1.25))||(tone<.52&&L(x-y+w,7,1.25))||(tone<.3&&L(y+w*.6,5,1.1))||(tone<.14&&L(x+y+3.5+w,3.5,1.1))}
/* per-pixel cache: bit k set = screen-space stroke layer k covers this pixel; 16 = ink edge; 32 = legend ink (static) */
let npHB=null;
function npHatchBits(){if(npHB)return npHB;const G=npG(480),w=480,h=270,B=new Uint8Array(w*h);
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=y*w+x;let m=0;{const w=1.1*Math.sin(y*.05+x*.031),Lr=(v,s,t)=>((v%s)+s)%s<t;if(Lr(x+y+w,7,1.25))m|=1;if(Lr(x-y+w,7,1.25))m|=2;if(Lr(y+w*.6,5,1.1))m|=4;if(Lr(x+y+3.5+w,3.5,1.1))m|=8}
  if(y>=244&&y<262&&x>=140&&x<340){m=npHatchInk(x,y,(x-140)/200)||y===244||y===261||x===140||x===339?32:64}else if(G.id[i]&&npEdge(G,i)>.5)m|=16;B[i]=m}
 return npHB=B}
DEMOS['NPR-05']={d:6,hi:true,f:(c,t)=>{const G=npG(480),w=480,h=270,o=npImg(c,w,h),d=o.data,L=npLight(t,.85),PA=[243,236,216],IN=[42,34,56],HB=npHatchBits(),TH=[.78,.52,.3,.14],nn=G.n;
 for(let i=0;i<w*h;i++){const j=i*4,id=G.id[i],m=HB[i];let ink=false;
  if(m&96)ink=m===32;else if(m&16)ink=!!id;else if(id&&(m&15)){let tone=clamp((.08+.92*Math.max(0,nn[i*3]*L[0]+nn[i*3+1]*L[1]+nn[i*3+2]*L[2]))*G.ao[i]);if(id===1)tone=Math.min(1,tone*1.15);
   ink=((m&1)&&tone<TH[0])||((m&2)&&tone<TH[1])||((m&4)&&tone<TH[2])||((m&8)&&tone<TH[3])}
  const col=ink?IN:PA;d[j]=col[0];d[j+1]=col[1];d[j+2]=col[2];d[j+3]=255}
 blitData(c,o);c.save();c.scale(2,2);npTag(c,'HATCHING  tone -> stroke layers',W/2,8);txt(c,'dark',62,126,'#2a2238',7);txt(c,'light',178,126,'#2a2238',7);c.restore()}};

/* NPR-06 Kuwahara — painterly filter via summed-area tables; divider sweeps SOURCE | KUWAHARA */
let npKw=null;
function npKuwa(c){if(npKw)return npKw;const G=npG(480),w=480,h=270,N=w*h,src=new Float32Array(N*3),L=npLight(.12,.8);
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=y*w+x,id=G.id[i];let r,g,b;
  if(!id){const cl=npFbm(x*.012,y*.03,3);r=.55+.3*cl;g=.72+.2*cl;b=.95;}
  else{const B=NP_COL[id],ndl=Math.max(0,npNdl(G,i,L)),k=(.22+.78*ndl)*G.ao[i],px=G.p[i*3],pz=G.p[i*3+2];let tex=id===1?(npFbm(px*3,pz*3,1)-.5)*.5+(npH2(x,y,9)-.5)*.25:(npFbm(x*.08,y*.08,id)-.5)*.35+(npH2(x,y,4)-.5)*.15;
   r=B[0]*k+tex*.4;g=B[1]*k+tex*.45;b=B[2]*k+tex*.3;const s=npSpec(G,i,L,40)*.7;r+=s;g+=s;b+=s}
  src[i*3]=clamp(r);src[i*3+1]=clamp(g);src[i*3+2]=clamp(b)}
 /* SAT of r,g,b and luminance² */const W1=w+1,S=[0,1,2,3,4].map(()=>new Float64Array(W1*(h+1)));
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=y*w+x,r=src[i*3],g=src[i*3+1],b=src[i*3+2],l=.3*r+.59*g+.11*b,vals=[r,g,b,l,l*l],k=(y+1)*W1+x+1;for(let m=0;m<5;m++)S[m][k]=vals[m]+S[m][k-1]+S[m][k-W1]-S[m][k-W1-1]}
 const box=(m,x0,y0,x1,y1)=>S[m][(y1+1)*W1+x1+1]-S[m][y0*W1+x1+1]-S[m][(y1+1)*W1+x0]+S[m][y0*W1+x0];
 const A=c.createImageData(w,h),B=c.createImageData(w,h),rd=5;
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=y*w+x,j=i*4;A.data[j]=src[i*3]*255;A.data[j+1]=src[i*3+1]*255;A.data[j+2]=src[i*3+2]*255;A.data[j+3]=255;
  let best=1e9,br=0,bg=0,bb=0;for(const [qx,qy] of [[-1,-1],[1,-1],[-1,1],[1,1]]){const x0=Math.max(0,qx<0?x-rd:x),x1=Math.min(w-1,qx<0?x:x+rd),y0=Math.max(0,qy<0?y-rd:y),y1=Math.min(h-1,qy<0?y:y+rd),n=(x1-x0+1)*(y1-y0+1);const ml=box(3,x0,y0,x1,y1)/n,v=box(4,x0,y0,x1,y1)/n-ml*ml;if(v<best){best=v;br=box(0,x0,y0,x1,y1)/n;bg=box(1,x0,y0,x1,y1)/n;bb=box(2,x0,y0,x1,y1)/n}}
  B.data[j]=br*255;B.data[j+1]=bg*255;B.data[j+2]=bb*255;B.data[j+3]=255}
 return npKw={A,B}}
DEMOS['NPR-06']={d:6,hi:true,f:(c,t)=>{const K=npKuwa(c),split=Math.round(240+170*Math.sin(t*TAU)),o=npImg(c,480,270),d=o.data,a=K.A.data,b=K.B.data;
 for(let y=0;y<270;y++){const r=y*480*4;d.set(a.subarray(r,r+split*4),r);d.set(b.subarray(r+split*4,r+480*4),r+split*4)}blitData(c,o);
 c.save();c.scale(2,2);npDiv(c,split/2);if(split>60)npTag(c,'SOURCE',Math.min(split/4,60),8);if(split<420)npTag(c,'KUWAHARA r=5',Math.max((split/2+W)/2,180),8);c.restore()}};

/* NPR-07 Watercolour — washes, edge darkening, granulation, wobbly bleeds, paper; painted in with a wet front */
let npWc=null;
function npWater(){if(npWc)return npWc;const G=npG(480),w=480,h=270,N=w*h,col=new Float32Array(N*3),mask=new Float32Array(N),L=npLight(.12,.85),PA=[.97,.95,.90];
 const idAt=(x,y)=>G.id[clamp(Math.round(y),0,h-1)*w+clamp(Math.round(x),0,w-1)];
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=y*w+x;const wx=x+(npVN(x*.035,y*.035,21)-.5)*7,wy=y+(npVN(x*.035,y*.035,22)-.5)*7,xi=clamp(Math.round(wx),0,w-1),yi=clamp(Math.round(wy),0,h-1),k=yi*w+xi,id=G.id[k];
  const paper=.94+.06*npVN(x*.6,y*.6,5),gran=npVN(x*.45,y*.45,8);let pig,dens;
  if(!id){pig=[.45,.66,.92];dens=.18+.22*npFbm(x*.01,y*.02,6)*(1-y/h)}
  else{const B=NP_COL[id],ndl=Math.max(0,npNdl(G,k,L));pig=B;dens=.42+.22*npSS(.62,.52,ndl)+.22*npSS(.26,.16,ndl)+.12*(1-G.ao[k]);if(id===1)dens*=.7;if(npSpec(G,k,L,30)>.5)dens*=.15}
  /* edge darkening: pigment pools where the wobbled region changes */
  let edge=0;for(const [ox,oy] of [[3,0],[-3,0],[0,3],[0,-3],[2,2],[-2,-2]])if(idAt(wx+ox,wy+oy)!==id){edge=1;break}
  dens=clamp(dens*(.82+.36*gran)+edge*.25);const m=1-dens*.95;
  col[i*3]=PA[0]*paper*(m+(1-m)*pig[0]);col[i*3+1]=PA[1]*paper*(m+(1-m)*pig[1]);col[i*3+2]=PA[2]*paper*(m+(1-m)*pig[2]);
  const bx=Math.min(x,w-1-x),by=Math.min(y,h-1-y),deckle=Math.min(bx,by)-10-6*npVN(x*.08+y*.08,0,30);if(deckle<0)mask[i]=9;else mask[i]=x/w*.78+npFbm(x*.02,y*.02,40)*.3}
 return npWc={col,mask}}
DEMOS['NPR-07']={d:7,hi:true,f:(c,t)=>{const WC=npWater(),PP=WC.pp||(WC.pp=(()=>{const a=new Float32Array(480*270);for(let i=0;i<a.length;i++)a[i]=.94+.06*npVN((i%480)*.6,((i/480)|0)*.6,5);return a})()),o=npImg(c,480,270),d=o.data,rv=seg(t,.03,.62)*1.12-.02,fade=seg(t,.9,.99);
 for(let i=0;i<480*270;i++){const j=i*4,m=WC.mask[i],paper=PP[i];let r=.97*paper,g=.95*paper,b=.90*paper;
  if(m<rv){const k=1-fade;r=r+(WC.col[i*3]-r)*k;g=g+(WC.col[i*3+1]-g)*k;b=b+(WC.col[i*3+2]-b)*k;const dlt=rv-m;if(dlt<.025&&rv<1.05){const e=.8+.2*dlt/.025;r*=e;g*=e;b*=e}}
  d[j]=r*255;d[j+1]=g*255;d[j+2]=b*255;d[j+3]=255}
 blitData(c,o);c.save();c.scale(2,2);npTag(c,t<.64?'WET WASH SPREADING':'WATERCOLOUR: washes, dark edges, granulation',W/2,8);c.restore()}};

/* NPR-08 Halftone — left continuous tone | right 45° dot screen, dot size from shade, Ben-Day tint + ink edges */
let npHT=null;
function npHalfPre(){if(npHT)return npHT;const G=npG(480),w=480,h=270,N=w*h,si=new Int32Array(N),dist=new Float32Array(N),fl=new Uint8Array(N),cs=7,R2=Math.SQRT1_2;
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=y*w+x,u=(x+y)*R2,v=(y-x)*R2,cu=(Math.floor(u/cs)+.5)*cs,cv=(Math.floor(v/cs)+.5)*cs;dist[i]=Math.hypot(u-cu,v-cv);
  si[i]=clamp(Math.round((cv*0+(cu+cv)*R2)),0,h-1)*w+clamp(Math.round((cu-cv)*R2),0,w-1);
  const bu=(x-y)*R2,bv=(x+y)*R2,du=bu/4-Math.round(bu/4),dv=bv/4-Math.round(bv/4);fl[i]=(du*du+dv*dv<.11?1:0)|(G.id[i]&&npEdge(G,i)>.5?2:0)}
 return npHT={si,dist,fl}}
/* NPR-08: dot radius from the tone sampled at each screen cell's centre */
DEMOS['NPR-08']={d:6,hi:true,f:(c,t)=>{const G=npG(480),w=480,h=270,o=npImg(c,w,h),d=o.data,L=npLight(t,1.5),split=170,cs=7,HP=npHalfPre(),nn=G.n;
 const tone=(i)=>{const id=G.id[i];if(!id)return 1;const v=clamp((.24+.76*Math.max(0,nn[i*3]*L[0]+nn[i*3+1]*L[1]+nn[i*3+2]*L[2]))*G.ao[i]);return id===1?Math.min(1,v*1.2+.12):v};
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=y*w+x,j=i*4,id=G.id[i];let r,g,b;
  if(x<split){if(!id){r=.85;g=.92;b=.98}else{const tn=tone(i),B=NP_COL[id];r=B[0]*(.15+.85*tn);g=B[1]*(.15+.85*tn);b=B[2]*(.15+.85*tn)}}
  else{const f=HP.fl[i];if(f&2){r=.1;g=.08;b=.14}else{
   if(id){const B=NP_COL[id];if(f&1){r=B[0];g=B[1];b=B[2]}else{r=.5+.5*B[0];g=.5+.5*B[1];b=.5+.5*B[2]}}else{r=1;g=1;b=.97}
   const tn=tone(HP.si[i]);if(tn<1&&HP.dist[i]<cs*.56*Math.sqrt(1-tn)){r=.1;g=.08;b=.14}}}
  d[j]=r*255;d[j+1]=g*255;d[j+2]=b*255;d[j+3]=255}
 blitData(c,o);c.save();c.scale(2,2);npDiv(c,split/2);npTag(c,'CONTINUOUS',split/4,8);npTag(c,'HALFTONE 45deg + BEN-DAY TINT',(split/2+W)/2,8);c.restore()}};

/* NPR-09 Sketch / pencil — paper tooth, repeated offset contours, loose graphite shading; drawn in, then boils at 4 fps */
let npSk=null;
function npSketch(){if(npSk)return npSk;const G=npG(480),w=480,h=270,N=w*h,L=npLight(.12,.85),cd=[new Float32Array(N),new Float32Array(N)],sd=new Float32Array(N),tc=new Float32Array(N),ts=new Float32Array(N),pap=new Float32Array(N);
 const E=new Float32Array(N);for(let i=0;i<N;i++)E[i]=G.id[i]||G.eD[i]>0?npEdge(G,i,.3,1.1):0;
 const eAt=(x,y)=>{const xi=Math.round(x),yi=Math.round(y);return xi<0||yi<0||xi>=w||yi>=h?0:E[yi*w+xi]};
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=y*w+x,tooth=npVN(x*.9,y*.35,3);pap[i]=.93+.05*npVN(x*.05,y*.05,1)+.02*tooth;
  for(let v=0;v<2;v++){let a=0;for(let p=0;p<3;p++){const s=p*17+v*101,ox=(npVN(x*.02,y*.02,s)-.5)*5,oy=(npVN(x*.02,y*.02,s+50)-.5)*5,gap=npVN(x*.06,y*.06,s+9);if(gap>.3)a+=eAt(x+ox,y+oy)*(p===0?.45:.32)*(.6+.4*tooth)}cd[v][i]=Math.min(.85,a*.55)}
  const id=G.id[i];if(id){let tn=clamp((.1+.9*Math.max(0,npNdl(G,i,L)))*G.ao[i]);if(id===1)tn=Math.min(1,tn*1.35);const q=x*.95+y+2.5*npVN(x*.02,y*.02,77),q2=x-y*.9+2.5*npVN(x*.02,y*.02,78),brk=npVN(x*.09,y*.09,79);
   let s=0;if(tn<.75&&((q%5)+5)%5<1.6&&brk>.25)s+=.35;if(tn<.42&&((q2%5)+5)%5<1.5&&brk<.8)s+=.35;if(tn<.2)s+=.25;sd[i]=s*(.5+.5*tooth)}
  tc[i]=x/w*.6+npVN(x*.03,y*.03,90)*.4;ts[i]=(x+y*.4)/(w*1.4)*.6+npVN(x*.05,y*.05,91)*.4}
 return npSk={cd,sd,tc,ts,pap}}
DEMOS['NPR-09']={d:7,hi:true,f:(c,t)=>{const S=npSketch(),o=npImg(c,480,270),d=o.data,pc=seg(t,.02,.36)*1.05,ps=seg(t,.36,.68)*1.05,v=t>.7?Math.floor(t*7*4)%2:0,gr=[58,58,66];
 for(let i=0;i<480*270;i++){const j=i*4,p=S.pap[i];let dk=(S.tc[i]<pc?S.cd[v][i]:0)+(S.ts[i]<ps?S.sd[i]:0);dk=Math.min(.9,dk);
  d[j]=(p*240)*(1-dk)+gr[0]*dk;d[j+1]=(p*236)*(1-dk)+gr[1]*dk;d[j+2]=(p*226)*(1-dk)+gr[2]*dk;d[j+3]=255}
 blitData(c,o);c.save();c.scale(2,2);npTag(c,t<.36?'1. LOOSE CONTOURS':t<.68?'2. GRAPHITE SHADING':'3. DONE (lines boil at 4 fps)',W/2,8);c.restore()}};

/* NPR-10 1-bit dithering — left 8-bit grey | right 2 colours via Bayer 8x8 threshold + ink edges */
const npB8=(()=>{const m=new Float32Array(64);for(let y=0;y<8;y++)for(let x=0;x<8;x++){let a=0;for(let k=0;k<3;k++){a=a*4+(((x^y)>>k)&1)*2+((y>>k)&1)}m[y*8+x]=(a+.5)/64}return m})();
DEMOS['NPR-10']={d:6,f:(c,t)=>{const G=npG(240),o=npImg(c,W,H),d=o.data,L=npLight(t,.8),half=W/2,D=[29,27,38],Lc=[230,225,197];
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=y*W+x,j=i*4,id=G.id[i];let tn=id?clamp((.04+.96*Math.max(0,npNdl(G,i,L)))*G.ao[i]):.9-.35*(y/H);if(id===1)tn=tn*.8+.1;
  const e=id&&npEdge(G,i)>.5;let r,g,b;
  if(x<half){const v=e?.1:tn;r=D[0]+(Lc[0]-D[0])*v;g=D[1]+(Lc[1]-D[1])*v;b=D[2]+(Lc[2]-D[2])*v}
  else{const on=!e&&tn>npB8[(y&7)*8+(x&7)];const q=on?Lc:D;r=q[0];g=q[1];b=q[2]}
  d[j]=r;d[j+1]=g;d[j+2]=b;d[j+3]=255}
 c.putImageData(o,0,0);npDiv(c,half);npTag(c,'8-BIT GREY (input)',half/2,8);npTag(c,'1-BIT  Bayer 8x8',half*1.5,8)}};

/* NPR-11 PS1 style — left modern (perspective-correct, sub-pixel, z-buffer) | right vertex snap + affine UV + no z-buffer */
const npTex=(()=>{const n=16,a=new Uint8Array(n*n*3*2);for(let y=0;y<n;y++)for(let x=0;x<n;x++){/* 0: floor checker with grout */let k=((x>>2)+(y>>2))&1,c=k?[200,110,70]:[235,200,140];if((x&3)===0||(y&3)===0)c=[120,80,60];a.set(c,(y*n+x)*3);
 /* 1: crate */let w=[176,124,70];if(x<2||y<2||x>13||y>13||Math.abs(x-y)<1.2)w=[110,70,40];else if(y%5===0)w=[150,100,56];a.set(w,(n*n+y*n+x)*3)}return a})();
function npTexS(t,u,v,o){const x=((Math.floor(u*16)%16)+16)%16,y=((Math.floor(v*16)%16)+16)%16,k=(t*256+y*16+x)*3;o[0]=npTex[k];o[1]=npTex[k+1];o[2]=npTex[k+2]}
function npPS1View(buf,bw,cl,t,ps1){const vw=cl[2]-cl[0],vh=cl[3]-cl[1],a=t*TAU,eye=[Math.sin(a)*5.2,1.9,Math.cos(a)*5.2],cam=npCam(eye,[0,.5,0],40,cl[0],cl[1],vw,vh);
 npFill(buf,bw,cl,(x,y,o)=>{const k=(y-cl[1])/vh;o[0]=40+30*k;o[1]=50+30*k;o[2]=90+20*k});
 const zb=ps1?null:npZB(bw*135);const q=[];
 const pv=(p,uv,ex)=>{const v=cam.proj(p);if(ps1){v.x=Math.round(v.x/2)*2;v.y=Math.round(v.y/2)*2}v.a=[uv[0],uv[1],ex];return v};
 /* floor: 3x3 big tiles (PS1 games subdivided too, but big triangles show the affine warp best) */const F=2.4,TS=1.6;for(let gz=0;gz<3;gz++)for(let gx=0;gx<3;gx++){const x0=-F+gx*TS,z0=-F+gz*TS,x1=x0+TS,z1=z0+TS,u0=gx*2,v0=gz*2;q.push({z:99,t:[[pv([x0,0,z0],[u0,v0],1),pv([x0,0,z1],[u0,v0+2],1),pv([x1,0,z1],[u0+2,v0+2],1)],[pv([x0,0,z0],[u0,v0],1),pv([x1,0,z1],[u0+2,v0+2],1),pv([x1,0,z0],[u0+2,v0],1)]],tex:0})}
 const L=[.5,.8,.3];for(const f of npCube(0,.6,0,.6,t*TAU*2)){const lt=.45+.55*Math.max(0,f.n[0]*L[0]+f.n[1]*L[1]+f.n[2]*L[2]),P4=f.p.map(p=>cam.proj(p));const vs=[pv(f.p[0],[0,0],lt),pv(f.p[1],[1,0],lt),pv(f.p[2],[1,1],lt),pv(f.p[3],[0,1],lt)];q.push({z:(P4[0].z+P4[2].z)/2,t:[[vs[0],vs[1],vs[2]],[vs[0],vs[2],vs[3]]],tex:1})}
 if(ps1)q.sort((a,b)=>b.z-a.z);
 for(const it of q)for(const tr of it.t){if(tr.some(v=>v.z<.05))continue;npTri(buf,zb,bw,cl,tr[0],tr[1],tr[2],(A,o)=>{npTexS(it.tex,A[0],A[1],o);o[0]*=A[2];o[1]*=A[2];o[2]*=A[2]},{affine:ps1,cull:it.tex===1?true:false})}}
DEMOS['NPR-11']={d:10,f:(c,t)=>{const o=npImg(c,W,H),d=o.data;npPS1View(d,W,[0,0,119,H],t,false);npPS1View(d,W,[121,0,W,H],t,true);for(let y=0;y<H;y++){const j=(y*W+119)*4;d[j]=d[j+1]=d[j+2]=230;d[j+4]=d[j+5]=d[j+6]=230;d[j+3]=d[j+7]=255}
 c.putImageData(o,0,0);npTag(c,'MODERN',60,8);npTag(c,'PS1: SNAP + AFFINE',180,8);npTag(c,'perspective-correct',60,H-7);npTag(c,'textures swim, verts jump',180,H-7)}};

/* NPR-12 Low-poly flat shading — same rock: left smooth (interpolated normals) | right flat (one normal per face) */
const npRock=npIco(1,11,.16);
function npRockView(buf,bw,cl,t,flat){const vw=cl[2]-cl[0],vh=cl[3]-cl[1],cam=npCam([0,1.1,3.6],[0,0,0],40,cl[0],cl[1],vw,vh),zb=npZB(bw*135),a=t*TAU,K=[.55,.7,.45],Fl=[-.6,.1,-.5];
 npFill(buf,bw,cl,(x,y,o)=>{const k=(y-cl[1])/vh;o[0]=24+40*k;o[1]=34+40*k;o[2]=52+30*k});
 const sh=(n)=>{const k=Math.max(0,n[0]*K[0]+n[1]*K[1]+n[2]*K[2]),f=Math.max(0,n[0]*Fl[0]+n[1]*Fl[1]+n[2]*Fl[2]);return [.18+.8*k*1.0+.12*f,.5*(.18+.8*k)+.25*f+.12,.42*(.18+.8*k)+.45*f+.1]};
 const M=npRock;for(let fi=0;fi<M.F.length;fi++){const [ia,ib,ic]=M.F[fi],fn=npRotY(M.FN[fi],a),fc=sh(fn);
  const vv=[ia,ib,ic].map(k=>{const v=cam.proj(npRotY(M.V[k],a));const n=npRotY(M.VN[k],a);v.a=[n[0],n[1],n[2]];return v});
  npTri(buf,zb,bw,cl,vv[0],vv[1],vv[2],(A,o)=>{let col;if(flat)col=fc;else{const l=Math.hypot(A[0],A[1],A[2]);col=sh([A[0]/l,A[1]/l,A[2]/l])}o[0]=clamp(col[0])*255;o[1]=clamp(col[1])*255;o[2]=clamp(col[2])*255})}}
DEMOS['NPR-12']={d:8,f:(c,t)=>{const o=npImg(c,W,H),d=o.data;npRockView(d,W,[0,0,119,H],t,false);npRockView(d,W,[121,0,W,H],t,true);for(let y=0;y<H;y++)for(const x of [119,120]){const j=(y*W+x)*4;d[j]=d[j+1]=d[j+2]=230;d[j+3]=255}
 c.putImageData(o,0,0);npTag(c,'SMOOTH NORMALS',60,8);npTag(c,'FLAT SHADING',180,8);npTag(c,'same 80 triangles',W/2,H-8)}};

/* NPR-13 3D pixel art — orthographic diorama: left full-res smooth | right rendered at 1/4 res, toon bands, 1px outline, nearest upscale */
function npDiorama(a){const T=[];const nn=(p,q,s)=>{const e1=q.map((x,i)=>x-p[i]),e2=s.map((x,i)=>x-p[i]);let n=[e1[1]*e2[2]-e1[2]*e2[1],e1[2]*e2[0]-e1[0]*e2[2],e1[0]*e2[1]-e1[1]*e2[0]];const l=Math.hypot(...n);n=n.map(x=>x/l);return n};
 const tri=(p,q,r,col,g,n)=>T.push({p:[p,q,r],n:n||nn(p,q,r),col,g});const quad=(p,q,r,s,col,g,n)=>{tri(p,q,r,col,g,n);tri(p,r,s,col,g,n)};
 const G=1.6;quad([-G,0,-G],[-G,0,G],[G,0,G],[G,0,-G],[.45,.68,.35],1,[0,1,0]);
 for(const f of npCube(-.45,.42,-.1,.42,0))if(f.n[1]>=0)quad(f.p[0],f.p[1],f.p[2],f.p[3],[.90,.80,.62],2,f.n);
 const x0=-.95,x1=.05,z0=-.6,z1=.4,yb=.84,yt=1.32,zm=-.1,RC=[.75,.30,.25],WC=[.85,.74,.56];
 quad([x0,yb,z1],[x1,yb,z1],[x1,yt,zm],[x0,yt,zm],RC,3,nn([x0,yb,z1],[x1,yb,z1],[x1,yt,zm]).map((v,i,arr)=>arr[1]<0?-v:v));
 quad([x0,yb,z0],[x1,yb,z0],[x1,yt,zm],[x0,yt,zm],RC,3,nn([x0,yb,z0],[x1,yb,z0],[x1,yt,zm]).map((v,i,arr)=>arr[1]<0?-v:v));
 tri([x0,yb,z0],[x0,yt,zm],[x0,yb,z1],WC,2,[-1,0,0]);tri([x1,yb,z0],[x1,yt,zm],[x1,yb,z1],WC,2,[1,0,0]);
 for(const f of npCube(.9,.25,.6,.12,.3))if(f.n[1]>=0)quad(f.p[0],f.p[1],f.p[2],f.p[3],[.45,.30,.18],4,f.n);
 const ap=[.9,1.55,.6],bs=[[.45,.45,.15],[1.35,.45,.15],[1.35,.45,1.05],[.45,.45,1.05]];for(let k=0;k<4;k++){const p=bs[k],q=bs[(k+1)%4];let n=nn(p,ap,q);if(n[1]<0)n=n.map(x=>-x);tri(p,ap,q,[.25,.58,.30],5,n)}
 return T.map(tr=>({p:tr.p.map(p=>npRotY(p,a)),n:npRotY(tr.n,a),col:tr.col,g:tr.g}))}
let npPx=null;
DEMOS['NPR-13']={d:10,hi:true,f:(c,t)=>{const o=npImg(c,480,270),d=o.data,a=t*TAU,T=npDiorama(a),L=[.45,.8,.35];
 /* left: full-res smooth */const cl=[0,0,239,270],cam=npCam([4,3.4,4],[0,.4,0],0,0,0,239,270,62),zb=npZB(480*270);
 npFill(d,480,cl,(x,y,oo)=>{oo[0]=150;oo[1]=190;oo[2]=220});
 for(const tr of T){const vv=tr.p.map(p=>{const v=cam.proj(p);v.a=[0];return v});const k=.35+.65*Math.max(0,tr.n[0]*L[0]+tr.n[1]*L[1]+tr.n[2]*L[2]);const col=tr.col.map(x=>clamp(x*k)*255);
  npTri(d,zb,480,cl,vv[0],vv[1],vv[2],(A,oo)=>{oo[0]=col[0];oo[1]=col[1];oo[2]=col[2]},{ortho:true,cull:false})}
 blitData(c,o);
 /* right: 60x68 low-res buffer */const lw=60,lh=68;if(!npPx){npPx={k:mk(lw,lh)};npPx.g=npPx.k.getContext('2d');npPx.o=npPx.g.createImageData(lw,lh);npPx.id=new Int16Array(lw*lh);npPx.zz=new Float32Array(lw*lh)}
 const lo=npPx.o.data,lz=npPx.zz,lid=npPx.id;lz.fill(1e9);lid.fill(-1);const cam2=npCam([4,3.4,4],[0,.4,0],0,0,0,lw,lh,62/4);
 npFill(lo,lw,[0,0,lw,lh],(x,y,oo)=>{oo[0]=150;oo[1]=190;oo[2]=220});
 T.forEach((tr,ti)=>{const vv=tr.p.map(p=>{const v=cam2.proj(p);v.a=[0];return v});const k0=Math.max(0,tr.n[0]*L[0]+tr.n[1]*L[1]+tr.n[2]*L[2]),k=k0>.6?1:k0>.25?.78:.56;const col=tr.col.map(x=>Math.round(clamp(x*k)*255/32)*32);
  const grp=tr.g;npTri(lo,lz,lw,[0,0,lw,lh],vv[0],vv[1],vv[2],(A,oo,x,y)=>{oo[0]=col[0];oo[1]=col[1];oo[2]=col[2];lid[y*lw+x]=grp},{ortho:true,cull:false})});
 /* 1px outline where object group changes (darker of the two) */
 for(let y=0;y<lh;y++)for(let x=0;x<lw;x++){const i=y*lw+x,g=lid[i];if(g<=0)continue;let e=false;for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const xx=x+dx,yy=y+dy;if(xx<0||yy<0||xx>=lw||yy>=lh){continue}const g2=lid[yy*lw+xx];if(g2!==g&&(g2<g||lz[yy*lw+xx]>lz[i]+.05&&g2!==g)){e=true;break}}if(e){const j=i*4;lo[j]*=.35;lo[j+1]*=.35;lo[j+2]*=.4}}
 npPx.g.putImageData(npPx.o,0,0);c.imageSmoothingEnabled=false;c.drawImage(npPx.k,0,0,lw,lh,241,0,240,272);R(c,239,0,2,270,'#e6e6e6');
 c.save();c.scale(2,2);npTag(c,'FULL-RES 3D',60,8);npTag(c,'1/4 RES + TOON + OUTLINE',180,8);c.restore()}};

/* NPR-14 HD-2D — same tile map + sprites: flat top-down → tilted perspective camera, tilt-shift DOF, bloom, warm grade */
const npTile=(()=>{const n=16,a=new Uint8Array(n*n*3*3);for(let t=0;t<3;t++)for(let y=0;y<n;y++)for(let x=0;x<n;x++){let c;const hh=npH2(x,y,t+3);
 if(t===0){c=hh>.86?[70,128,62]:hh<.08?[120,170,80]:[92,150,70]}else if(t===1){c=hh>.8?[160,120,80]:[190,150,100];if(hh<.06)c=[140,140,140]}else{c=(x+y*2+Math.floor(hh*2))%7<1?[120,180,230]:[60,120,190]}a.set(c,((t*n+y)*n+x)*3)}return a})();
function npTileAt(tx,ty){if(ty>=5)return 2;if(Math.abs(tx-1-Math.round(Math.sin(ty*.9)*.6))<1)return 1;return 0}
let npHd=null;
function npHdS(){if(npHd)return npHd;const T=mk(24,30),g=T.getContext('2d');tree(g,12,29,0);const Ho=mk(34,28),h=Ho.getContext('2d');house(h,17,27,1);const He=mk(12,16),e=He.getContext('2d');spr(e,'hero',6,15);
 const B=mk(120,68),Bg=B.getContext('2d'),F=mk(480,270),Fg=F.getContext('2d');return npHd={T,Ho,He,B,Bg,F,Fg}}
DEMOS['NPR-14']={d:9,hi:true,f:(c,t)=>{const S=npHdS();if(!S.G){S.G=mk(240,135);S.Gg=S.G.getContext('2d');S.Go=S.Gg.createImageData(240,135)}const o=S.Go,d=o.data,m=npSS(.3,.55,t),zb=npZB(240*135),tz=1.2*Math.sin(t*TAU);
 /* camera: m=0 steep near-orthographic top-down, m=1 low tilted perspective */
 const pitch=lerp(1.5,.62,m),dist=lerp(40,12.5,m),fov=lerp(15.5,44,m),tgt=[0,0,2.2+tz*.3],eye=[0,Math.sin(pitch)*dist,tgt[2]+Math.cos(pitch)*dist],cam=npCam(eye,tgt,fov,0,0,480,270),camL=npCam(eye,tgt,fov,0,0,240,135);/* tiles at half res (texels stay blocky), sprites at full res */
 for(let y=0;y<135;y++){const k=y/135,r=lerp(110,250,m*(1-k)),g=lerp(160,190,k),bb=lerp(210,160,m*(1-k));for(let x=0,j=y*960;x<240;x++,j+=4){d[j]=r;d[j+1]=g;d[j+2]=bb;d[j+3]=255}}
 const warm=m;for(let ty=-7;ty<9;ty++)for(let tx=-11;tx<11;tx++){const tt=npTileAt(tx,ty),P4=[[tx,0,ty],[tx+1,0,ty],[tx+1,0,ty+1],[tx,0,ty+1]].map((p,k)=>{const v=camL.proj(p);v.a=[k===1||k===2?1:0,k>=2?1:0];return v});if(P4.some(v=>v.z<.1))continue;
  const sh=(A,oo)=>{let u=A[0],v=A[1];if(tt===2)u+=t*2;const x=((Math.floor(u*16)%16)+16)%16,y=Math.min(15,Math.floor(v*16)),k=((tt*16+y)*16+x)*3;oo[0]=npTile[k]*(1+.12*warm);oo[1]=npTile[k+1]*(1+.02*warm);oo[2]=npTile[k+2]*(1-.12*warm)};
  npTri(d,zb,240,[0,0,240,135],P4[0],P4[1],P4[2],sh,{cull:false});npTri(d,zb,240,[0,0,240,135],P4[0],P4[2],P4[3],sh,{cull:false})}
 S.Gg.putImageData(o,0,0);c.imageSmoothingEnabled=false;c.drawImage(S.G,0,0,480,270);
 /* billboard sprites, far → near; px-per-unit from projection, nearest filtering */
 const sp=[[-4.5,-1.5,'T'],[-2.6,-3,'T'],[3.2,-2.5,'T'],[4.6,0,'T'],[-5,2.5,'T'],[5.5,3.4,'T'],[2.6,1.6,'Ho'],[-2.8,0.6,'Ho'],[1.4+.3*Math.sin(t*TAU*2),2.8,'He'],[-1,4.2,'T'],[-6,-4,'T'],[6,-4.5,'T'],[3.5,4.6,'T']];
 const items=sp.map(s=>{const v=cam.proj([s[0],0,s[1]]),v2=cam.proj([s[0]+1,0,s[1]]);return {s,v,ppu:Math.hypot(v2.x-v.x,v2.y-v.y)}}).filter(i=>i.v.z>.1).sort((a,b)=>b.v.z-a.v.z);
 c.imageSmoothingEnabled=false;for(const it of items){const im=S[it.s[2]],sc=it.ppu/16*(it.s[2]==='He'?1:1.25),w=im.width*sc,h=im.height*sc;c.globalAlpha=.35*m;c.fillStyle='#000';c.beginPath();c.ellipse(it.v.x,it.v.y,w*.35,w*.12,0,0,TAU);c.fill();c.globalAlpha=1;c.drawImage(im,Math.round(it.v.x-w/2),Math.round(it.v.y-h),Math.round(w),Math.round(h))}
 /* lanterns (bloom) */const lan=[[-.4,1.2],[2.6,3.4],[-2.6,2.2]];for(const l of lan){const v=cam.proj([l[0],.9,l[1]]);if(v.z<.1)continue;const s=cam.proj([l[0]+1,.9,l[1]]),ppu=Math.abs(s.x-v.x);R(c,v.x-ppu*.05,v.y,ppu*.1,ppu*.9,'#3a2a20');circ(c,v.x,v.y,ppu*.1,'#ffe39a');
  if(m>0){c.globalCompositeOperation='lighter';const g=c.createRadialGradient(v.x,v.y,0,v.x,v.y,ppu*1.2);g.addColorStop(0,'rgba(255,200,110,'+(.55*m)+')');g.addColorStop(1,'rgba(255,200,110,0)');c.fillStyle=g;c.fillRect(v.x-ppu*1.2,v.y-ppu*1.2,ppu*2.4,ppu*2.4);c.globalCompositeOperation='source-over'}}
 if(m>0){/* tilt-shift: blurred copy masked to top & bottom bands */const B=S.B,Bg=S.Bg,F=S.F,Fg=S.Fg;Bg.imageSmoothingEnabled=true;Bg.clearRect(0,0,120,68);Bg.drawImage(c.canvas,0,0,480,270,0,0,120,68);Fg.globalCompositeOperation='source-over';Fg.clearRect(0,0,480,270);Fg.imageSmoothingEnabled=true;Fg.drawImage(B,0,0,120,68,0,0,480,270);
  Fg.globalCompositeOperation='destination-in';const g=Fg.createLinearGradient(0,0,0,270);g.addColorStop(0,'rgba(0,0,0,1)');g.addColorStop(.3,'rgba(0,0,0,0)');g.addColorStop(.72,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,1)');Fg.fillStyle=g;Fg.fillRect(0,0,480,270);Fg.globalCompositeOperation='source-over';
  c.globalAlpha=m;c.drawImage(F,0,0);c.globalAlpha=1;
  /* light shafts + grade + vignette */c.globalCompositeOperation='lighter';for(let k=0;k<3;k++){c.fillStyle='rgba(255,220,160,'+(.06*m)+')';c.beginPath();const x0=60+k*90+20*Math.sin(t*TAU+k);c.moveTo(x0,0);c.lineTo(x0+40,0);c.lineTo(x0+140,270);c.lineTo(x0+80,270);c.fill()}c.globalCompositeOperation='source-over';
  const vg=c.createRadialGradient(240,135,90,240,135,290);vg.addColorStop(0,'rgba(20,10,30,0)');vg.addColorStop(1,'rgba(20,10,30,'+(.55*m)+')');c.fillStyle=vg;c.fillRect(0,0,480,270)}
 c.save();c.scale(2,2);npTag(c,m<.5?'FLAT 2D (top-down, no post)':'HD-2D: tilt + DOF + bloom + grade',W/2,8);tl(c,t,[.3,.55]);c.restore()}};
})();
