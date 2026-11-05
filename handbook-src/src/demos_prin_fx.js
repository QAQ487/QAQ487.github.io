/* ===== FX principle demos (canvas) ===== */
(()=>{
const puff=(c,x,y,r,a,col='200,205,215')=>{const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,'rgba('+col+','+a+')');g.addColorStop(1,'rgba('+col+',0)');c.fillStyle=g;c.fillRect(x-r,y-r,2*r,2*r)};
/* FX-01 billboards: smoke quads always turn to face the camera */
DEMOS['FX-01']={d:6,f:(c,t)=>{const th=Math.sin(t*TAU)*.9;prOrbit(c,th);const src=[30,-20],N=9,ps=[];for(let i=0;i<N;i++){const k=prWrap(t*2+i/N),wx=src[0]+Math.sin(i*2.3+k*3)*6*k,wz=src[1]+Math.cos(i*1.7)*4*k,p=prProj(wx,wz,th);if(!p)continue;ps.push({p,k,i,wx,wz})}
 const fp=prProj(src[0],src[1],th);if(fp){circ(c,fp.x,fp.y-2*fp.s,3*fp.s,P.orange);circ(c,fp.x,fp.y-3*fp.s,1.6*fp.s,P.gold);R(c,fp.x-4*fp.s,fp.y-1,8*fp.s,2,P.woodD)}
 ps.sort((a,b)=>b.p.z-a.p.z);for(const{p,k,i}of ps){const r=(4+k*10)*p.s,y=p.y-(6+k*46)*p.s;puff(c,p.x,y,r,.75*(1-k));if(i%3===0)prDash(c,p.x-r,y-r,2*r,2*r,'rgba(242,201,76,.7)')}
 const ix=W-28,iy=28,rr=22;R(c,ix-rr-3,iy-rr-3,2*rr+6,2*rr+6,'rgba(10,14,24,.8)');const camx=ix-Math.sin(th)*rr*.8,camy=iy-Math.cos(th)*rr*.8;R(c,camx-1.5,camy-1.5,3,3,P.cyan);
 for(const{wx,wz,i}of ps){if(i%3)continue;const qx=ix+wx/130*rr*2.2,qy=iy+wz/130*rr*2.2;const dx=Math.cos(th)*4,dy=-Math.sin(th)*4;prLine(c,qx-dx,qy-dy,qx+dx,qy+dy,P.gold,1.5);prLine(c,camx,camy,qx,qy,'rgba(127,227,216,.35)',1)}
 prTag(c,'Billboard',4,4,P.gold);prTag(c,'quads face camera',120,122,'#e9edf2','rgba(10,14,24,.75)',6,'center')}};
/* FX-02 ribbon trail built from position history */
const wisp=u=>[120+Math.sin(u*TAU)*80,60+Math.sin(u*TAU*2)*28];
DEMOS['FX-02']={d:5,f:(c,t)=>{c.drawImage(scene('enight'),0,0);R(c,0,0,W,H,'rgba(13,22,48,.35)');const N=22,pts=[];for(let i=0;i<N;i++)pts.push(wisp(t-i*.012));const wire=prWrap(t)>.5;
 const nrm=i=>{const a=pts[Math.max(0,i-1)],b=pts[Math.min(N-1,i+1)],dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy)||1;return[-dy/l,dx/l]};
 c.save();c.globalCompositeOperation='lighter';for(let i=0;i<N-1;i++){const w0=7*(1-i/N),w1=7*(1-(i+1)/N),[n0x,n0y]=nrm(i),[n1x,n1y]=nrm(i+1),a=pts[i],b=pts[i+1];c.fillStyle=`rgba(${Math.round(lerp(127,154,i/N))},${Math.round(lerp(227,90,i/N))},${Math.round(lerp(216,209,i/N))},${(.85*(1-i/N)).toFixed(3)})`;c.beginPath();c.moveTo(a[0]+n0x*w0,a[1]+n0y*w0);c.lineTo(b[0]+n1x*w1,b[1]+n1y*w1);c.lineTo(b[0]-n1x*w1,b[1]-n1y*w1);c.lineTo(a[0]-n0x*w0,a[1]-n0y*w0);c.fill()}c.restore();
 if(wire){c.save();c.strokeStyle='rgba(233,237,242,.7)';c.lineWidth=.5;for(let i=0;i<N-1;i++){const w0=7*(1-i/N),w1=7*(1-(i+1)/N),[n0x,n0y]=nrm(i),[n1x,n1y]=nrm(i+1),a=pts[i],b=pts[i+1];c.beginPath();c.moveTo(a[0]+n0x*w0,a[1]+n0y*w0);c.lineTo(b[0]+n1x*w1,b[1]+n1y*w1);c.lineTo(b[0]-n1x*w1,b[1]-n1y*w1);c.lineTo(a[0]-n0x*w0,a[1]-n0y*w0);c.closePath();c.stroke()}c.restore();for(const p of pts)R(c,p[0]-1,p[1]-1,2,2,P.gold)}
 const h=pts[0];circ(c,h[0],h[1],5,'rgba(127,227,216,.4)');circ(c,h[0],h[1],2.5,'#fff');prTag(c,'Ribbon trail',4,4,P.cyan);prTag(c,wire?'strip from history points':'shaded strip',W-4,4,wire?P.gold:'#e9edf2','rgba(10,14,24,.75)',6,'right')}};
/* FX-04 flipbook: one atlas cell per frame */
function fbFrame(c,x,y,s,i){const k=i/15,r=s*(.12+.36*eo(k));c.save();c.beginPath();c.rect(x-s/2,y-s/2,s,s);c.clip();if(k<.5)circ(c,x,y,r,k<.25?'#fff6c8':P.gold);circ(c,x,y,r*(k<.5?.75:1),k<.3?P.gold:k<.6?P.orange:'rgba(90,86,96,'+(1-k*.7)+')');if(k>.35)circ(c,x-r*.3,y-r*.3,r*.5,'rgba(130,126,136,'+(1-k)+')');if(k<.45)ring(c,x,y,r*1.4,1,'rgba(255,246,200,'+(1-k*2)+')');
 for(let j=0;j<6;j++){const a=hash(j+3)*TAU,d=r*(1+k*.8);R(c,x+Math.cos(a)*d-1,y+Math.sin(a)*d-1,2,2,k<.5?P.gold:'#6b6874')}c.restore()}
DEMOS['FX-04']={d:4,f:(c,t)=>{const u=prWrap(t),fi=Math.min(15,Math.floor(u*16));R(c,0,0,W,H,'#141a24');const cs=22,ax=6,ay=16;prTag(c,'ATLAS 4x4',ax,4,P.cyan);for(let i=0;i<16;i++){const gx=ax+(i%4)*cs,gy=ay+Math.floor(i/4)*cs;R(c,gx,gy,cs-1,cs-1,'#1d2533');fbFrame(c,gx+cs/2,gy+cs/2,cs-2,i);txt(c,String(i),gx+2,gy+4,'#5e636e',4,'left')}
 const hx=ax+(fi%4)*cs,hy=ay+Math.floor(fi/4)*cs;c.strokeStyle=P.gold;c.lineWidth=1;c.strokeRect(hx-.5,hy-.5,cs,cs);
 R(c,104,16,64,64,'#1d2533');fbFrame(c,136,48,62,fi);prTag(c,'PLAY frame '+fi,104,84,P.gold);
 R(c,176,16,58,58,'#1d2533');const k=u;c.save();c.globalAlpha=1-k;fbFrame(c,205,45,22+k*30,2);c.restore();prTag(c,'SCALE+FADE',176,78,'#9aa6b8');txt(c,'one image',205,96,'#9aa6b8',5);
 prTag(c,'shape changes per cell',104,100,'#e9edf2');for(let i=0;i<16;i++)R(c,104+i*8,116,7,4,i===fi?P.gold:'#2f3a4d')}};
/* FX-05 sprite vs mesh debris */
function cube(c,x,y,s,ax,ay,col){const v=[];for(const a of[-1,1])for(const b of[-1,1])for(const d of[-1,1]){let X=a,Y=b,Z=d;let x1=X*Math.cos(ay)+Z*Math.sin(ay),z1=-X*Math.sin(ay)+Z*Math.cos(ay);let y1=Y*Math.cos(ax)-z1*Math.sin(ax),z2=Y*Math.sin(ax)+z1*Math.cos(ax);v.push([x1,y1,z2])}
 const F=[[0,1,3,2],[4,6,7,5],[0,4,5,1],[2,3,7,6],[0,2,6,4],[1,5,7,3]];const fs=[];for(const f of F){const[a,b,cc]=f.map(i=>v[i]);const nx=(b[1]-a[1])*(cc[2]-a[2])-(b[2]-a[2])*(cc[1]-a[1]),ny=(b[2]-a[2])*(cc[0]-a[0])-(b[0]-a[0])*(cc[2]-a[2]),nz=(b[0]-a[0])*(cc[1]-a[1])-(b[1]-a[1])*(cc[0]-a[0]);const z=f.reduce((q,i)=>q+v[i][2],0);fs.push({f,nz,l:clamp(.35+.75*(-nx*.3-ny*.5-nz*.8)/Math.hypot(nx,ny,nz),.3,1.15),z})}
 fs.sort((a,b)=>a.z-b.z);for(const q of fs){if(q.nz>0)continue;c.fillStyle=`rgb(${Math.round(col[0]*q.l)},${Math.round(col[1]*q.l)},${Math.round(col[2]*q.l)})`;c.beginPath();q.f.forEach((i,j)=>{const px=x+v[i][0]*s,py=y+v[i][1]*s;j?c.lineTo(px,py):c.moveTo(px,py)});c.fill()}}
DEMOS['FX-05']={d:4,f:(c,t,_w,_h,p)=>{const u=prWrap(t),e=seg(u,.1,.85)*p.dur*.75;for(const i of[0,1])prLane(c,i,i?'MESH: volume':'SPRITE: flat',i?P.gold:'#e9edf2',gy=>{const ox=120,oy=gy-6;if(u<.1||u>.85){R(c,ox-8,oy-10,16,16,P.stone);R(c,ox-8,oy-10,16,3,'#a6abb5')}else{for(let j=0;j<9;j++){const a=-Math.PI/2+(hash(j+1)-.5)*2.2,v=40+hash(j+5)*45;let x=ox+Math.cos(a)*v*e,y=oy+Math.sin(a)*v*e+90*e*e;y=Math.min(y,gy-2);const s=2+hash(j+9)*2,rot=e*(4+hash(j)*6);
  if(i)cube(c,x,y,s,rot,rot*.7,[138,143,153]);else{c.save();c.translate(x,y);c.rotate(rot*.3);R(c,-s,-s,2*s,2*s,P.stone);c.restore()}}}});
 prTag(c,'same burst',W-4,4,'#e9edf2','rgba(10,14,24,.75)',6,'right')}};
/* FX-09 timing: a swing is not a hit; the spark marks contact */
function slash(c,x,y,a0,a1,k,col){c.save();c.strokeStyle=col;c.lineCap='round';for(let j=0;j<3;j++){c.globalAlpha=(1-k)*(1-j*.3);c.lineWidth=3-j;c.beginPath();c.arc(x,y,16+j*3,a0,lerp(a0,a1,Math.min(1,k*3)));c.stroke()}c.restore()}
function star(c,x,y,r,col){c.fillStyle=col;c.beginPath();for(let i=0;i<8;i++){const a=i*Math.PI/4,rr=i%2?r*.3:r;c.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr)}c.fill()}
DEMOS['FX-09']={d:5,f:(c,t,_w,_h,p)=>{const u=prWrap(t);prSide(c,120,67,{props:false});const gy=100,fx=u<.45?170:lerp(170,128,ease(seg(u,.45,.55)));
 const sw=(a,b)=>seg(u,a,b);const s1=sw(.12,.2),s2=sw(.6,.68);const arm=u<.4?lerp(-1.3,.7,eo(s1)):lerp(-1.3,.7,eo(s2));const rc=u<.4?seg(u,.25,.35):seg(u,.73,.83);
 c.save();c.translate(100,gy);shadow(c,0,0,7);c.scale(2,2);c.drawImage(sprCanvas('hero'),0,0,7,10,-4,-10,7,10);c.restore();c.save();c.translate(106,gy-10);c.rotate(lerp(arm,-1.3,ease(rc)));R(c,0,-1,16,2,'#e9edf2');c.restore();
 if(s1>0&&u<.3)slash(c,106,gy-10,-1.3,.7,seg(u,.12,.3),'#fff');if(s2>0&&u<.78)slash(c,106,gy-10,-1.3,.7,seg(u,.6,.78),'#fff');
 const hit=u>=.66,hk=(u-.66)*p.dur;shadow(c,fx,gy,7);spr(c,'foe',fx+(hit?Math.max(0,4-hk*16):0),gy,{sx:2,sy:2,flip:true,flash:hit&&hk<.08?1:0});
 if(hit&&hk<.5){star(c,120,gy-12,lerp(3,12,eo(hk/.12))*(1-seg(hk,.12,.5)),'#fff6c8');star(c,120,gy-12,lerp(2,7,eo(hk/.12))*(1-seg(hk,.12,.5)),P.gold);burst(c,120,gy-12,hk,10,7,{speed:70,life:.4,col:P.gold})}
 prTag(c,u<.45?'SWING: no contact':u<.66?'closing in':'HIT: spark on contact',4,4,u<.45?'#e9edf2':u<.66?'#9aa6b8':P.gold);if(u>.18&&u<.4)prTag(c,'SWING ≠ HIT',W-4,4,P.red,'rgba(10,14,24,.75)',6,'right')}};
/* FX-13 charge-up VFX: gather, glow, contract, release (character pose stays) */
DEMOS['FX-13']={d:5,f:(c,t,_w,_h,p)=>{const u=prWrap(t);c.drawImage(scene('enight'),0,0);R(c,0,0,W,H,'rgba(13,22,48,.45)');const hx=70,gy=104,ox=hx+12,oy=gy-20;shadow(c,hx,gy,8);spr(c,'hero',hx,gy,{sx:2.5,sy:2.5});
 const ch=seg(u,.08,.62),fire=u>=.62&&u<.82,fk=seg(u,.62,.82);c.save();c.globalCompositeOperation='lighter';
 if(u<.62){for(let i=0;i<22;i++){const ph=prWrap(ch*3+hash(i+2)),a=hash(i+7)*TAU,d=lerp(48,2,ei(ph));R(c,ox+Math.cos(a)*d-1,oy+Math.sin(a)*d-1,ph>.7?2:1,ph>.7?2:1,i%3?'rgba(127,227,216,.9)':'rgba(242,201,76,.9)')}const r=2+ch*9;puff(c,ox,oy,r*2.2,.55*ch+.1,'127,227,216');circ(c,ox,oy,r*.5,'rgba(255,255,255,.9)');for(let k=0;k<2;k++){const rk=prWrap(ch*4+k*.5);ring(c,ox,oy,lerp(30,r,rk),1,'rgba(242,201,76,'+(rk*.8)+')')}}
 if(fire){const wv=lerp(14,2,fk);R(c,ox,oy-wv/2,W,wv,'rgba(127,227,216,.55)');R(c,ox,oy-wv/5,W,wv/2.5,'rgba(255,255,255,.95)');puff(c,ox,oy,18*(1-fk)+6,.8,'255,255,255');if(fk<.15){c.globalAlpha=1-fk/.15;R(c,0,0,W,H,'rgba(255,255,255,.35)')}}
 if(u>=.82)burst(c,ox,oy,(u-.82)*p.dur,10,4,{speed:20,life:.7,col:P.cyan,fade:1});c.restore();
 R(c,150,118,80,10,'rgba(10,14,24,.8)');bar(c,153,121,50,4,u<.62?ch:fire?1-fk:0,P.cyan);txt(c,u<.62?'CHARGE':fire?'RELEASE':'RESOLVE',228,123,u<.62?P.cyan:P.gold,5,'right');prTag(c,'Charge-up',4,4,P.cyan);prTag(c,'pose unchanged',W-4,4,'#e9edf2','rgba(10,14,24,.75)',6,'right')}};
/* FX-14 intensity curve */
const I14=[u=>.55+.05*Math.sin(u*TAU*7),u=>u<.5?.08+.6*ei(u/.5):u<.56?1:lerp(1,.08,eo(seg(u,.56,1)))];
DEMOS['FX-14']={d:5,f:(c,t,_w,_h,p)=>{const u=prWrap(t);for(const i of[0,1])prLane(c,i,i?'BUILD > BURST > RESOLVE':'CONSTANT',i?P.gold:'#9aa6b8',(gy,y0)=>{R(c,0,y0,W,66,'#1b2238');R(c,0,gy,W,12,'#2a2440');const I=I14[i](u),ox=70,oy=gy-20;
  c.save();c.globalCompositeOperation='lighter';puff(c,ox,oy,8+I*26,.25+I*.6,'242,170,80');circ(c,ox,oy,2+I*6,'rgba(255,246,200,.9)');if(i&&u>=.5&&u<.75)burst(c,ox,oy,(u-.5)*p.dur,16,5,{speed:60,life:.8,col:P.gold,fade:1});if(i&&u>=.5&&u<.56){c.globalAlpha=.5;R(c,0,y0,W,66,'rgba(255,246,200,.5)')}c.restore();
  const gx=130,gw=100,gh=36,g0=y0+16;R(c,gx-2,g0-2,gw+4,gh+4,'rgba(10,14,24,.75)');for(let j=0;j<gw;j++)R(c,gx+j,g0+gh-I14[i](j/gw)*gh,1,1,i?P.gold:'#9aa6b8');R(c,gx+u*gw-1,g0+gh-I*gh-1,3,3,'#fff');txt(c,'intensity',gx,g0-6,'#9aa6b8',5,'left')})}};
/* FX-15 disappearance: pop vs fade vs noise erode with a hot edge */
function vnoise(x,y){const xi=Math.floor(x),yi=Math.floor(y),fx=x-xi,fy=y-yi,h=(a,b)=>hash(a*57+b*131+7);const sx=fx*fx*(3-2*fx),sy=fy*fy*(3-2*fy);return lerp(lerp(h(xi,yi),h(xi+1,yi),sx),lerp(h(xi,yi+1),h(xi+1,yi+1),sx),sy)}
let _fx15=null;
DEMOS['FX-15']={d:5,f:(c,t)=>{const u=prWrap(t),k=u<.15?0:u<.6?seg(u,.15,.6):u<.75?1:1-seg(u,.75,.95);R(c,0,0,W,H,'#141a24');const names=['POP','FADE','ERODE'];
 if(!_fx15){_fx15=mk(36,40);spr(_fx15.getContext('2d'),'foe',18,40,{sx:4,sy:4})}const src=_fx15;
 for(let j=0;j<3;j++){const x0=j*80,cx=x0+40,gy=104;R(c,x0+2,20,76,100,'#1d2533');R(c,x0+2,gy,76,16,'#2f3a4d');prTag(c,names[j],cx,24,j===2?P.gold:'#e9edf2','rgba(10,14,24,.75)',6,'center');shadow(c,cx,gy,12,.35*(j===0?(k<.5?1:0):j===1?1-k:1-k));
  if(j===0){if(k<.5)c.drawImage(src,cx-18,gy-40);else if(k<.6)burst(c,cx,gy-18,(k-.5)*2,10,3,{speed:40,life:.4,col:'#cfd8e3'})}
  else if(j===1){c.globalAlpha=1-k;c.drawImage(src,cx-18,gy-40);c.globalAlpha=1}
  else{const g=src.getContext('2d'),d=g.getImageData(0,0,36,40),o=c.createImageData(36,40);for(let i=0;i<36*40;i++){const x=i%36,y=Math.floor(i/36),n=vnoise(x/5,y/5)*.8+vnoise(x/2,y/2)*.2,th=k*1.15-.08;if(d.data[i*4+3]===0||n<th)continue;const edge=n<th+.08;o.data[i*4]=edge?255:d.data[i*4];o.data[i*4+1]=edge?150:d.data[i*4+1];o.data[i*4+2]=edge?60:d.data[i*4+2];o.data[i*4+3]=255}
   const tk=TMP2(),tg=tk.getContext('2d');tg.clearRect(0,0,40,44);tg.putImageData(o,0,0);c.drawImage(tk,0,0,36,40,cx-18,gy-40,36,40)}
  txt(c,j===0?'instant':j===1?'alpha':'noise mask',cx,gy+9,'#9aa6b8',5)}
 R(c,40,126,160,3,'#2f3a4d');R(c,40,126,160*k,3,P.gold);txt(c,'t',36,127,'#9aa6b8',5,'right')}};
/* ---- shared audio / haptic glyphs ---- */
const fxWave=(c,x,y,w,h,ph,amp,col,n=40)=>{c.save();c.strokeStyle=col;c.lineWidth=1.2;c.beginPath();for(let i=0;i<=n;i++){const u=i/n,px=x+u*w,py=y+Math.sin((u*6+ph)*TAU)*amp*h*.45*(.55+.45*Math.sin(u*Math.PI));i?c.lineTo(px,py):c.moveTo(px,py)}c.stroke();c.restore()};
const fxEnv=(c,x,y,w,h,pts,col)=>{c.save();c.strokeStyle=col;c.lineWidth=1.5;c.beginPath();pts.forEach((p,i)=>{const px=x+p[0]*w,py=y+(1-p[1])*h;i?c.lineTo(px,py):c.moveTo(px,py)});c.stroke();c.restore()};
const fxPad=(c,x,y,rum=0,col=P.cyan)=>{R(c,x,y,28,18,'#1d2533');R(c,x+1,y+1,26,16,'#2a3348');R(c,x+4,y+4,8,8,'#3a4560');R(c,x+16,y+4,8,8,'#3a4560');circ(c,x+8,y+8,2.2,P.gold);circ(c,x+20,y+8,2.2,'#9aa6b8');if(rum>0){const j=(hash(Math.floor(rum*40)+3)-.5)*rum*3;R(c,x+j,y-3,28,1,'rgba(127,227,216,'+(.3+rum*.5)+')');R(c,x-j,y+20,28,1,'rgba(224,74,58,'+(.2+rum*.5)+')')};prTag(c,'PAD',x+1,y-8,col,'rgba(10,14,24,.75)',5)};
const fxSpec=(c,x,y,w,h,gains,col)=>{const n=gains.length,bw=w/n;for(let i=0;i<n;i++){const v=clamp(gains[i]);R(c,x+i*bw+1,y+(1-v)*h,Math.max(1,bw-2),v*h,typeof col==='function'?col(i,n):col)}};
/* FX-03 afterimages: discrete poses, not a continuous smear */
DEMOS['FX-03']={d:5,f:(c,t)=>{const u=prWrap(t),x=p=>lerp(36,200,prWrap(p));for(const i of[0,1])prLane(c,i,i?'AFTERIMAGES':'SMEAR',i?P.cyan:P.red,gy=>{const hx=x(u);if(i===0){c.save();c.globalAlpha=.35;c.filter='blur(1.5px)';for(let k=1;k<=6;k++){const xx=x(u-k*.012);spr(c,'hero',xx,gy,{sx:2,sy:2,flip:Math.cos((u-k*.012)*TAU)<0})}c.filter='none';c.restore()}else{for(let k=4;k>=1;k--){c.globalAlpha=.18*k;spr(c,'hero',x(u-k*.06),gy,{sx:2,sy:2,flip:Math.cos((u-k*.06)*TAU)<0})}c.globalAlpha=1}shadow(c,hx,gy,7);spr(c,'hero',hx,gy,{sx:2,sy:2,flip:Math.cos(u*TAU)<0})});
 prTag(c,'separate poses',W-4,4,P.cyan,'rgba(10,14,24,.75)',6,'right')}};
/* FX-06 decals adhere to receiving surfaces */
DEMOS['FX-06']={d:5,f:(c,t)=>{const u=prWrap(t),stamp=seg(u,.2,.35),hold=u>=.35;c.drawImage(scene('eday'),0,0);R(c,0,0,W,H,'rgba(13,22,48,.2)');
 const wallX=148,gy=100;R(c,wallX,40,18,60,P.stone);R(c,wallX,40,18,3,'#a6abb5');R(c,0,gy,W,H-gy,P.dirtD);R(c,0,gy,W,3,P.grass);
 const scorch=(cx,cy,a,sx,sy)=>{c.save();c.translate(cx,cy);c.rotate(a);c.scale(sx,sy);c.globalAlpha=.85;circ(c,0,0,10,'rgba(40,28,24,.85)');circ(c,-3,-2,4,'rgba(90,50,30,.7)');circ(c,4,1,3,'rgba(30,20,18,.8)');c.restore()};
 if(u<.2){const fall=ease(seg(u,0,.2));circ(c,90,lerp(20,gy-2,fall),4,P.orange);circ(c,90,lerp(20,gy-2,fall),2,P.gold)}
 else{scorch(90,gy-1,0,1+.1*stamp,.35+.05*stamp);if(hold){const climb=ease(seg(u,.4,.7));scorch(wallX+1,lerp(gy-2,70,climb),-Math.PI/2,.35+.05*climb,1);prTag(c,'on wall',wallX+22,lerp(gy-8,66,climb),P.gold)}}
 shadow(c,60,gy,7);spr(c,'hero',60,gy,{sx:2,sy:2});prTag(c,'Decal on surface',4,4,P.cyan);prTag(c,u<.2?'impact':u<.4?'floor mark':'follows receiver',W-4,4,'#e9edf2','rgba(10,14,24,.75)',6,'right')}};
/* FX-07 distortion offsets background samples */
DEMOS['FX-07']={d:5,f:(c,t)=>{const u=prWrap(t),src=scene('eday'),k=TMP(),g=k.getContext('2d');g.drawImage(src,0,0);c.drawImage(src,0,0);
 const cx=120+Math.sin(u*TAU)*30,cy=70,rr=28;for(let y=cy-rr;y<cy+rr;y++){const dy=y-cy;if(dy*dy>rr*rr)continue;const w=Math.sqrt(rr*rr-dy*dy)|0,off=Math.round(Math.sin(dy*.35+u*TAU*3)*6*(1-Math.abs(dy)/rr));c.drawImage(k,cx-w+off,y,2*w,1,cx-w,y,2*w,1)}
 ring(c,cx,cy,rr,1,'rgba(127,227,216,.55)');prDash(c,cx-rr,cy-rr,2*rr,2*rr,'rgba(242,201,76,.45)');
 prTag(c,'Distortion',4,4,P.cyan);prTag(c,'offsets samples',W-4,4,P.gold,'rgba(10,14,24,.75)',6,'right');txt(c,'not a tint',120,122,'#e9edf2',6)}};
/* FX-08 telegraph cue vs active AoE zone */
DEMOS['FX-08']={d:6,f:(c,t)=>{const u=prWrap(t);c.drawImage(scene('battle'),0,0);R(c,0,0,W,H,'rgba(13,22,48,.25)');const fx=170,fy=90,hx=60,hy=118;
 const tel=u<.45,act=u>=.45&&u<.75,rec=u>=.75;const pulse=tel?.35+.65*Math.abs(Math.sin(u*TAU*4)):1;
 if(tel||act){c.save();c.globalAlpha=tel?.35*pulse:.55;circ(c,fx,fy+8,38,tel?'rgba(242,201,76,.35)':'rgba(224,74,58,.4)');c.restore();ring(c,fx,fy+8,38,1.5,tel?P.gold:P.red);if(tel){for(let i=0;i<8;i++){const a=i/8*TAU+u*2;R(c,fx+Math.cos(a)*38-1,fy+8+Math.sin(a)*38-1,2,2,P.gold)}}
  if(act){const k=seg(u,.45,.75);burst(c,fx,fy,(u-.45)*4,14,5,{speed:50,life:.6,col:P.red,fade:1});if(Math.hypot(hx-fx,hy-(fy+8))<40)spr(c,'hero',hx,hy,{sx:3,sy:3,flash:k<.2?1-.5*k:0})}}
 prTag(c,tel?'TELEGRAPH: upcoming':act?'AoE ACTIVE':rec?'resolve':'',4,4,tel?P.gold:act?P.red:'#e9edf2');prTag(c,'related ≠ synonyms',W-4,4,'#9aa6b8','rgba(10,14,24,.75)',6,'right');tl(c,u,[.45,.75])}};
/* FX-10 shape language: direction / spread / guard */
DEMOS['FX-10']={d:5,f:(c,t)=>{const u=prWrap(t);R(c,0,0,W,H,'#141a24');const names=['DIRECTION','SPREAD','GUARD'],cols=[P.cyan,P.gold,P.orange];
 for(let i=0;i<3;i++){const x0=8+i*78,cx=x0+36,gy=100;R(c,x0,18,72,104,'#1d2533');prTag(c,names[i],cx,22,cols[i],'rgba(10,14,24,.75)',6,'center');const k=eo(seg(prWrap(u+.2*i),.1,.55));
  if(i===0){c.fillStyle=cols[i];c.globalAlpha=.4+.6*k;c.beginPath();c.moveTo(cx-20,gy-8);c.lineTo(cx+8,gy-28);c.lineTo(cx+8,gy-16);c.lineTo(cx+24,gy-16);c.lineTo(cx+24,gy);c.lineTo(cx+8,gy);c.lineTo(cx+8,gy-8);c.closePath();c.fill();c.globalAlpha=1}
  else if(i===1){ring(c,cx,gy-20,8+k*22,2,cols[i]);ring(c,cx,gy-20,4+k*12,1,'rgba(242,201,76,.5)');circ(c,cx,gy-20,3,cols[i])}
  else{c.strokeStyle=cols[i];c.lineWidth=2;c.beginPath();c.moveTo(cx-18,gy-8);c.quadraticCurveTo(cx,gy-48-k*8,cx+18,gy-8);c.lineTo(cx+12,gy);c.lineTo(cx-12,gy);c.closePath();c.stroke();c.globalAlpha=.25+k*.35;c.fillStyle=cols[i];c.fill();c.globalAlpha=1}
  txt(c,i===0?'arrow':i===1?'radial':'dome',cx,gy+10,'#9aa6b8',5)}
 prTag(c,'teach in context',4,4,'#e9edf2')}};
/* FX-11 primary silhouette before secondary detail */
DEMOS['FX-11']={d:5,f:(c,t)=>{const u=prWrap(t),pri=eo(seg(u,.05,.35)),sec=eo(seg(u,.4,.75));R(c,0,0,W,H,'#141a24');R(c,0,100,W,35,'#1d2533');
 const x0=30,y0=78;c.save();c.globalCompositeOperation='lighter';c.globalAlpha=.85*pri;c.fillStyle=P.cyan;c.beginPath();c.moveTo(x0,y0);c.quadraticCurveTo(120,30,210,70);c.quadraticCurveTo(120,55,x0,y0);c.fill();
 if(sec>0){for(let i=0;i<18;i++){const p=hash(i+2),q=hash(i+9),px=lerp(50,200,p),py=lerp(40,90,q)-Math.sin(p*Math.PI)*20;R(c,px,py,1+(hash(i)*2|0),1,'rgba(242,201,76,'+(sec*(.4+hash(i+4)*.6))+')')}}c.restore();
 R(c,176,8,56,40,'#1d2533');c.save();c.beginPath();c.rect(178,10,52,36);c.clip();c.translate(178,10);c.scale(.28,.28);c.globalAlpha=pri;c.fillStyle=P.cyan;c.beginPath();c.moveTo(x0,y0);c.quadraticCurveTo(120,30,210,70);c.quadraticCurveTo(120,55,x0,y0);c.fill();c.restore();
 prTag(c,'PRIMARY',4,4,P.cyan);prTag(c,sec>0?'+ secondary sparks':'silhouette first',W-4,4,sec>0?P.gold:'#e9edf2','rgba(10,14,24,.75)',6,'right');prTag(c,'small test',178,50,'#9aa6b8','rgba(10,14,24,0)',5)}};
/* FX-12 value vs saturation hierarchy */
DEMOS['FX-12']={d:5,f:(c,t)=>{const u=prWrap(t),gray=prWrap(t*2)>.5;R(c,0,0,W,H,'#141a24');const cols=[[P.ink,'low'],[P.stoneD,''],[P.stone,''],['#cfd8e3','high'],[P.gold,'FOCUS']];
 prTag(c,gray?'GRAYSCALE check':'COLOR',4,4,gray?'#9aa6b8':P.cyan);
 for(let i=0;i<5;i++){const x=16+i*44,y=40,col=cols[i][0];R(c,x,y,38,50,col);if(gray){const g=c.getImageData(x,y,38,50),d=g.data;for(let j=0;j<d.length;j+=4){const v=(d[j]*299+d[j+1]*587+d[j+2]*114)/1000;d[j]=d[j+1]=d[j+2]=v}c.putImageData(g,x,y)}
  if(cols[i][1])txt(c,cols[i][1],x+19,y+58,i===4?P.gold:'#9aa6b8',5)}
 R(c,16,108,208,16,'rgba(10,14,24,.8)');txt(c,'value ladder · sat alone ≠ focus',120,116,'#e9edf2',6);const blink=Math.sin(u*TAU*2)*.5+.5;ring(c,16+4*44+19,65,22,1,'rgba(242,201,76,'+(.3+blink*.5)+')')}};
/* FX-16 clarity vs visual noise budget */
DEMOS['FX-16']={d:5,f:(c,t)=>{const u=prWrap(t);for(const i of[0,1])prLane(c,i,i?'CLEAR':'NOISY',i?P.cyan:P.red,gy=>{shadow(c,70,gy,7);spr(c,'hero',70,gy,{sx:2,sy:2});shadow(c,160,gy,7);spr(c,'foe',160,gy,{sx:2,sy:2,flip:1});
  ring(c,160,gy-6,16+Math.sin(u*TAU)*2,1.5,P.red);if(!i){for(let j=0;j<40;j++){const px=20+hash(j+1)*200,py=gy-10-hash(j+7)*40;R(c,px,py,1+hash(j)*2,1,j%3?P.purple:P.gold);if(j%5===0)circ(c,px,py,3+hash(j+3)*4,'rgba(154,90,209,.25)')}}
  else{txt(c,'threat',160,gy-28,P.red,5);txt(c,'actor',70,gy-28,P.cyan,5)}});
 prTag(c,'decoration loses',W-4,4,'#e9edf2','rgba(10,14,24,.75)',6,'right')}};
/* FX-17 layering: attack + body + tail */
DEMOS['FX-17']={d:5,f:(c,t)=>{const u=prWrap(t);R(c,0,0,W,H,'#141a24');const layers=[{n:'ATTACK',col:P.gold,a:.9,ph:0,amp:.9},{n:'BODY',col:P.cyan,a:.7,ph:.2,amp:.55},{n:'TAIL',col:'#9aa6b8',a:.5,ph:.45,amp:.3}];
 R(c,10,20,220,70,'#1d2533');layers.forEach((L,i)=>{fxWave(c,14,40+i*12,212,18,u*2+L.ph,L.amp,L.col);prTag(c,L.n,16,22+i*14,L.col,'rgba(10,14,24,.65)',5)});
 const hit=u%.33;R(c,10,100,220,24,'#1d2533');fxEnv(c,14,104,212,16,[[0,0],[.08,1],[.22,.55],[.55,.35],[1,0]],P.gold);R(c,14+hit*212,104,1,16,'#fff');
 prTag(c,'Layering',4,4,P.cyan);prTag(c,'diagram ≠ listening',W-4,4,'#9aa6b8','rgba(10,14,24,.75)',6,'right')}};
/* FX-18 one-shot: one trigger, finite end */
DEMOS['FX-18']={d:5,f:(c,t)=>{const u=prWrap(t),trig=u>=.15&&u<.2,play=seg(u,.2,.75),done=u>=.75;R(c,0,0,W,H,'#141a24');
 c.drawImage(scene('enight'),0,0);R(c,0,0,W,90,'rgba(13,22,48,.55)');shadow(c,70,100,7);spr(c,'hero',70,100,{sx:2,sy:2});
 if(trig||(play>0&&play<1)){const k=trig?0:play;burst(c,88,78,k*1.2,12,8,{speed:55,life:.55,col:P.gold,fade:1});circ(c,88,78,3+k*6,'rgba(255,246,200,'+(1-k)+')')}
 R(c,120,20,110,50,'#1d2533');const env=play>0?play<1?(play<.15?play/.15:1-eo(seg(play,.15,1))):0:0;fxEnv(c,124,24,102,30,[[0,0],[.1,1],[.35,.45],[1,0]],P.cyan);R(c,124+clamp(play)*102,24,2,30,P.gold);bar(c,124,58,102,4,env,P.cyan);
 prTag(c,trig?'TRIGGER':play>0&&play<1?'ONE-SHOT playing':done?'ended':'idle',4,4,trig?P.gold:play>0&&play<1?P.cyan:'#e9edf2');tl(c,u,[.15,.2,.75])}};
/* FX-19 loop: start / sustain / stop */
DEMOS['FX-19']={d:6,f:(c,t)=>{const u=prWrap(t);R(c,0,0,W,H,'#141a24');const ph=u<.2?'START':u<.75?'SUSTAIN':u<.9?'STOP':'idle';const cols={START:P.gold,SUSTAIN:P.cyan,STOP:P.orange,idle:'#9aa6b8'};
 [[0,'START',40],[.2,'SUSTAIN ↔',120],[.75,'STOP',40]].forEach(([a,lab,w],i)=>{const x=10+(i===0?0:i===1?50:180);R(c,x,24,i===1?120:w,28,ph===lab.split(' ')[0]||(ph==='SUSTAIN'&&i===1)?cols[ph]:'#1d2533');txt(c,lab,x+(i===1?60:w/2),38,ph===(i===1?'SUSTAIN':lab)?'#fff':'#9aa6b8',6)});
 R(c,10,64,220,50,'#1d2533');const seam=u>=.2&&u<.75?prWrap((u-.2)/.55*4):0;fxWave(c,14,88,212,28,u<.2?u*3:u<.75?seam*2:1-seg(u,.75,.9),u<.2?eo(u/.2):u<.75?.7:1-seg(u,.75,.9),cols[ph]||'#9aa6b8');
 if(u>=.2&&u<.75){for(let i=0;i<4;i++){const sx=14+(i/4)*212;prLine(c,sx,68,sx,108,'rgba(127,227,216,.35)',1,[2,2]);if(Math.abs(seam-i/4)<.02)R(c,sx-1,68,3,40,P.gold)}}
 prTag(c,'audition loop seams',4,4,P.cyan);prTag(c,ph,W-4,4,cols[ph],'rgba(10,14,24,.75)',6,'right');tl(c,u,[.2,.75,.9])}};
/* FX-20 randomization: sample choice ≠ pitch only */
DEMOS['FX-20']={d:5,f:(c,t)=>{const u=prWrap(t),step=Math.floor(u*6),samp=Math.floor(hash(step+11)*3),pitch=.85+hash(step+21)*.3;R(c,0,0,W,H,'#141a24');
 prLane(c,0,'SAMPLE CHOICE',P.cyan,gy=>{shadow(c,50,gy,7);prWalker(c,50,gy,u*6,{s:2,amp:2});['A','B','C'].forEach((L,i)=>{const on=samp===i;R(c,100+i*40,gy-36,34,24,on?'#2a4050':'#1d2533');txt(c,'Smp '+L,117+i*40,gy-24,on?P.cyan:'#9aa6b8',6);if(on)ring(c,117+i*40,gy-24,16,1,P.gold)})});
 prLane(c,1,'PITCH VARY',P.gold,gy=>{shadow(c,50,gy,7);prWalker(c,50,gy,u*6,{s:2,amp:2});R(c,100,gy-40,120,30,'#1d2533');fxWave(c,104,gy-24,112,20,u*4,pitch- .7,P.gold);txt(c,'pitch '+pitch.toFixed(2),160,gy-8,P.gold,5)});
 prTag(c,'avoid pure random repeats',W-4,H-14,'#e9edf2','rgba(10,14,24,.75)',5,'right')}};
/* FX-21 parameter-driven: crossfade layers by speed */
DEMOS['FX-21']={d:5,f:(c,t)=>{const u=prWrap(t),spd=.5+.5*Math.sin(u*TAU);R(c,0,0,W,H,'#141a24');c.drawImage(scene('eday'),0,0);R(c,0,0,W,H,'rgba(13,22,48,.35)');
 const x=lerp(40,200,u);shadow(c,x,100,7);prWalker(c,x,100,u*8,{s:2,amp:1+spd});
 R(c,8,8,120,54,'rgba(10,14,24,.8)');txt(c,'speed',14,16,'#9aa6b8',5,'left');bar(c,14,22,100,5,spd,P.gold);const gWalk=1-spd,gRun=spd;txt(c,'WALK layer',14,36,P.cyan,5,'left');bar(c,70,33,44,4,gWalk,P.cyan);txt(c,'RUN layer',14,48,P.orange,5,'left');bar(c,70,45,44,4,gRun,P.orange);
 fxWave(c,140,20,90,20,u*3,.3+gWalk*.5,P.cyan,24);fxWave(c,140,42,90,20,u*5,.2+gRun*.7,P.orange,24);
 prTag(c,'crossfade ≠ pitch only',W-4,H-14,'#e9edf2','rgba(10,14,24,.75)',5,'right')}};
/* FX-22 pan L/R (not full 3D) */
DEMOS['FX-22']={d:5,f:(c,t)=>{const u=prWrap(t),pan=Math.sin(u*TAU);R(c,0,0,W,H,P.sky);R(c,0,100,W,35,P.grass);const sx=120+pan*70;circ(c,120,70,10,P.cyan);txt(c,'YOU',120,70,P.ink,5);shadow(c,sx,100,6);spr(c,'coin',sx,100,{sx:2,sy:2});
 const L=clamp(.5-pan/2),Rgt=clamp(.5+pan/2);R(c,8,8,70,40,'rgba(10,14,24,.8)');txt(c,'L',14,18,P.cyan,7,'left');bar(c,24,14,46,6,L,P.cyan);txt(c,'R',14,34,P.gold,7,'left');bar(c,24,30,46,6,Rgt,P.gold);
 fxWave(c,160,14,70,14,u*4,.3+L*.5,P.cyan,20);fxWave(c,160,34,70,14,u*4,.3+Rgt*.5,P.gold,20);
 prTag(c,'stereo pan',4,H-14,'#e9edf2');prTag(c,'≠ binaural 3D',W-4,H-14,P.gold,'rgba(10,14,24,.75)',6,'right')}};
/* FX-23 distance attenuation with near plateau */
DEMOS['FX-23']={d:5,f:(c,t)=>{const u=prWrap(t),d=ease(prTri(u))*120;R(c,0,0,W,H,'#141a24');R(c,0,90,W,45,'#1d2533');circ(c,40,100,8,P.cyan);txt(c,'ear',40,100,P.ink,5);const sx=50+d;circ(c,sx,100,6,P.gold);txt(c,'src',sx,88,P.gold,5);
 const near=30,gain=d<near?1:clamp(1-((d-near)/90));bar(c,20,20,200,8,gain,P.cyan);txt(c,'gain',14,24,'#9aa6b8',5,'right');R(c,20,18,near/120*200,12,'rgba(242,201,76,.2)');txt(c,'near plateau',20+near/120*100,14,P.gold,5);
 fxWave(c,20,40,200,30,u*3,.15+gain*.7,P.cyan);prTag(c,'Distance atten',4,H-14,P.cyan);prTag(c,'vol ≠ proof of distance',W-4,H-14,'#e9edf2','rgba(10,14,24,.75)',5,'right')}};
/* FX-24 directivity cone from source orientation */
DEMOS['FX-24']={d:5,f:(c,t)=>{const u=prWrap(t),ang=u*TAU;R(c,0,0,W,H,'#141a24');const sx=110,sy=75;circ(c,180,75,7,P.cyan);txt(c,'ear',180,75,P.ink,5);
 c.save();c.translate(sx,sy);c.rotate(ang);c.fillStyle='rgba(242,201,76,.25)';c.beginPath();c.moveTo(0,0);c.arc(0,0,55,-.55,.55);c.fill();c.strokeStyle=P.gold;c.lineWidth=1.5;c.beginPath();c.moveTo(0,0);c.arc(0,0,55,-.55,.55);c.stroke();R(c,-3,-3,10,6,P.orange);c.restore();
 const toEar=Math.atan2(75-sy,180-sx),delta=Math.atan2(Math.sin(toEar-ang),Math.cos(toEar-ang)),onAxis=Math.abs(delta)<.55,gain=onAxis?1-Math.abs(delta)/.55:.08;
 bar(c,8,8,80,6,gain,onAxis?P.gold:P.red);txt(c,'directivity',8,22,P.gold,5,'left');fxWave(c,160,20,70,20,u*4,.2+gain*.7,onAxis?P.gold:'#5e636e');
 prTag(c,'source-facing cone',4,H-14,'#e9edf2');prTag(c,'≠ listener pan',W-4,H-14,P.cyan,'rgba(10,14,24,.75)',6,'right')}};
/* FX-25 air absorption: distance dulls highs */
DEMOS['FX-25']={d:5,f:(c,t)=>{const u=prWrap(t),d=prTri(u);R(c,0,0,W,H,'#141a24');prTag(c,'Air absorption',4,4,P.cyan);txt(c,'distance '+Math.round(d*100),W-4,10,'#9aa6b8',5,'right');
 const n=16,gains=[];for(let i=0;i<n;i++){const base=.3+hash(i+3)*.7,hi=i/n;gains.push(base*(1-d*hi*hi*.95)*(.7+.3*Math.sin(u*TAU*2+i)))}
 R(c,20,30,200,70,'#1d2533');fxSpec(c,24,34,192,60,gains,(i,n)=>i>n*.55?P.gold:P.cyan);txt(c,'LOW',30,108,'#9aa6b8',5,'left');txt(c,'HIGH',210,108,P.gold,5,'right');
 prTag(c,'filter ≠ only walls',4,H-14,'#e9edf2')}};
/* FX-26 occlusion muffles behind obstacle */
DEMOS['FX-26']={d:5,f:(c,t)=>{const u=prWrap(t),occ=u>.35&&u<.85;R(c,0,0,W,H,P.sky);R(c,0,100,W,35,P.dirtD);R(c,0,100,W,3,P.grass);circ(c,40,90,8,P.cyan);txt(c,'ear',40,78,P.cyan,5);circ(c,200,90,7,P.gold);txt(c,'src',200,78,P.gold,5);
 if(occ){R(c,110,40,28,60,P.stone);R(c,110,40,28,4,'#a6abb5');prTag(c,'OCCLUDED',120,28,P.red)}else{prLine(c,48,90,192,90,'rgba(127,227,216,.5)',1,[3,2]);prTag(c,'direct path',120,28,P.cyan)}
 const muff=occ?.35:1,n=12,g=[];for(let i=0;i<n;i++)g.push((.4+hash(i)*.6)*muff*(1-(occ?i/n*.8:0)));R(c,8,8,90,40,'rgba(10,14,24,.8)');fxSpec(c,12,12,82,30,g,occ?P.orange:P.cyan);fxWave(c,110,12,120,30,u*3,.2+muff*.6,occ?P.orange:P.cyan);
 prTag(c,'obstruction',4,H-14,'#e9edf2')}};
/* FX-27 reverb dry/wet balance */
DEMOS['FX-27']={d:5,f:(c,t)=>{const u=prWrap(t),wet=.15+.7*prTri(u),dry=1-wet*.7;R(c,0,0,W,H,'#141a24');R(c,10,20,220,40,'#1d2533');
 fxWave(c,14,40,100,24,u*4,.5*dry,P.cyan);fxWave(c,120,40,100,24,u*4- .15,.55*wet,P.gold);txt(c,'DRY',64,28,P.cyan,6);txt(c,'WET',170,28,P.gold,6);
 bar(c,20,70,200,8,wet,P.gold);txt(c,'wet '+Math.round(wet*100)+'%',120,88,P.gold,6);R(c,20,100,200,22,'#1d2533');fxEnv(c,24,102,192,18,[[0,0],[.05,1*dry],[.12,.2],[.2,.55*wet],[.45,.3*wet],[1,0]],P.orange);
 prTag(c,'Reverb balance',4,4,P.cyan);prTag(c,'tail ≠ echoes',W-4,4,'#e9edf2','rgba(10,14,24,.75)',6,'right')}};
/* FX-28 mix hierarchy / separation */
DEMOS['FX-28']={d:5,f:(c,t)=>{const u=prWrap(t),vo=u>.3&&u<.7,duck=vo?.35:1;R(c,0,0,W,H,'#141a24');const buses=[['MUSIC',duck*.7,P.cyan],['SFX',.55+.2*Math.sin(u*TAU*3),P.gold],['VO',vo?1:0,P.orange]];
 buses.forEach((b,i)=>{const y=24+i*32;R(c,16,y,208,26,'#1d2533');txt(c,b[0],24,y+13,b[2],6,'left');bar(c,70,y+8,140,10,b[1],b[2]);txt(c,Math.round(b[1]*100)+'%',218,y+13,'#9aa6b8',5,'right')});
 prTag(c,'Mix hierarchy',4,4,P.cyan);prTag(c,vo?'VO priority · music ducks':'separation > loudness',W-4,4,vo?P.orange:'#e9edf2','rgba(10,14,24,.75)',6,'right')}};
/* FX-29 vertical adaptive music layers */
DEMOS['FX-29']={d:6,f:(c,t)=>{const u=prWrap(t),threat=ease(seg(u,.15,.55))*(1-ease(seg(u,.75,.95)));R(c,0,0,W,H,'#141a24');const stems=[['Drone',.5,P.stone],['Pulse',.35+threat*.5,P.cyan],['Perc',threat*.9,P.gold],['Stabs',Math.max(0,threat-.4)*1.5,P.orange]];
 stems.forEach((s,i)=>{const y=18+i*24;R(c,10,y,160,20,'#1d2533');fxWave(c,14,y+10,152,14,u*2+i*.2,s[1],s[2],28);txt(c,s[0],178,y+10,s[2],5,'left');bar(c,178,y+14,50,4,s[1],s[2])});
 prTag(c,'VERTICAL layers',4,H-14,P.cyan);prTag(c,'sync stems · not next seg',W-4,H-14,P.gold,'rgba(10,14,24,.75)',5,'right')}};
/* FX-30 horizontal resequencing */
DEMOS['FX-30']={d:6,f:(c,t)=>{const u=prWrap(t);R(c,0,0,W,H,'#141a24');const segs=[['A',0,.33,P.cyan],['B',.33,.66,P.gold],['C',.66,1,P.orange]];let cur='A';
 segs.forEach(s=>{const x=16+s[1]*208,w=(s[2]-s[1])*208-4;const on=u>=s[1]&&u<s[2];if(on)cur=s[0];R(c,x,40,w,36,on?s[3]:'#1d2533');txt(c,'Seg '+s[0],x+w/2,58,on?'#fff':'#9aa6b8',7);R(c,x+w-2,40,2,36,P.gold)});
 txt(c,'transition points',120,88,P.gold,5);R(c,16,100,208,16,'#1d2533');R(c,16+u*208,100,3,16,'#fff');fxWave(c,20,108,200,8,u*3+({'A':0,'B':1,'C':2}[cur]),.5,({'A':P.cyan,'B':P.gold,'C':P.orange})[cur],30);
 prTag(c,'HORIZONTAL reseq',4,4,P.cyan);prTag(c,'now: '+cur,W-4,4,P.gold,'rgba(10,14,24,.75)',6,'right')}};
/* FX-31 stinger overlays score */
DEMOS['FX-31']={d:5,f:(c,t)=>{const u=prWrap(t),sting=u>=.4&&u<.62,sk=seg(u,.4,.62);R(c,0,0,W,H,'#141a24');R(c,10,24,220,36,'#1d2533');fxWave(c,14,42,212,24,u*2,.45,P.cyan);prTag(c,'SCORE continues',16,28,P.cyan,'rgba(10,14,24,0)',5);
 R(c,10,70,220,36,'#1d2533');if(sting){fxWave(c,14,88,212,24,sk*3,.2+eo(1-sk)*.8,P.gold);R(c,14+sk*200,72,40,32,'rgba(242,201,76,.2)')}else fxWave(c,14,88,212,24,0,.08,'#5e636e');
 prTag(c,sting?'STINGER overlay':'waiting…',16,74,sting?P.gold:'#9aa6b8','rgba(10,14,24,0)',5);
 R(c,170,8,60,40,'#1d2533');c.save();c.beginPath();c.rect(172,10,56,36);c.clip();c.drawImage(scene('battle'),172,10);if(sting){c.globalAlpha=.45;R(c,172,10,56,36,P.gold);c.globalAlpha=1;otxt(c,'!',200,28,P.gold,12)}c.restore();
 prTag(c,'does not replace score',4,H-14,'#e9edf2')}};
/* FX-32 haptic rumble on event */
DEMOS['FX-32']={d:5,f:(c,t,_w,_h,p)=>{const u=prWrap(t),hit=u>=.4,hk=hit?(u-.4)*p.dur:0;R(c,0,0,W,H,'#2a2440');R(c,0,90,W,45,'#3d3460');circ(c,170,62,22,'#463a70');
 const hx=lerp(50,120,ease(seg(u,.05,.4))),rum=hit?eo(1-clamp(hk/1.2)):0,kick=hit&&hk<.15?eo(1-hk/.15):0;
 shadow(c,hx,118,8);spr(c,'hero',hx,118,{sx:3,sy:3});shadow(c,170+kick*6,90,8);spr(c,'foe',170+kick*6,90,{sx:3,sy:3,flip:1,flash:kick});
 if(hit&&hk<.6){burst(c,145,85,hk,14,6,{speed:70,life:.5,col:P.gold,fade:1});star(c,145,80,lerp(4,14,eo(Math.min(1,hk/.1)))*(1-seg(hk,.1,.5)),'#fff6c8')}
 fxPad(c,8,8,rum,rum?P.gold:P.cyan);R(c,44,8,100,22,'#1d2533');for(let i=0;i<12;i++){const v=rum*(.35+.65*hash(i+3+Math.floor(u*24)));R(c,46+i*8,10+(1-v)*16,6,v*16,i%2?P.red:P.cyan)}
 R(c,150,8,82,22,'rgba(10,14,24,.85)');bar(c,154,16,74,6,rum,P.gold);txt(c,'motor',154,12,'#9aa6b8',5,'left');
 prTag(c,hit?'RUMBLE':'approach',W-4,H-14,hit?P.gold:'#e9edf2','rgba(10,14,24,.75)',6,'right');tl(c,u,[.4])}};
/* FX-33 haptic pattern identity */
DEMOS['FX-33']={d:6,f:(c,t)=>{const u=prWrap(t);R(c,0,0,W,H,'#141a24');const pats=[['HIT',[1,0,0,1,0,0,0,0],P.red],['LOOT',[1,1,0,0,1,1,0,0],P.gold],['WARN',[1,0,1,0,1,0,1,0],P.orange]];
 const cur=Math.min(2,Math.floor(u*3)),ph=prWrap(u*3),step=Math.floor(ph*8);
 pats.forEach((p,i)=>{const y=22+i*36,on=i===cur;R(c,10,y,220,30,on?'#243044':'#1d2533');txt(c,p[0],24,y+15,p[2],6,'left');p[1].forEach((b,j)=>{const x=60+j*18,lit=on&&b&&j===step;R(c,x,y+8,14,14,b?(lit?p[2]:'#3a4560'):'#252b38');if(lit)circ(c,x+7,y+15,3,'#fff')})});
 fxPad(c,196,100,pats[cur][1][step]?1:0,pats[cur][2]);prTag(c,'pattern ID',4,4,P.cyan)}};
/* FX-34 haptic opt-out / intensity */
DEMOS['FX-34']={d:5,f:(c,t)=>{const u=prWrap(t),modes=[{n:'OFF',v:0},{n:'LOW',v:.35},{n:'MID',v:.7},{n:'HIGH',v:1}],mi=Math.min(3,Math.floor(u*4)),m=modes[mi];R(c,0,0,W,H,'#141a24');
 modes.forEach((x,i)=>{R(c,12+i*56,24,50,22,i===mi?'#2a4050':'#1d2533');txt(c,x.n,37+i*56,35,i===mi?P.gold:'#9aa6b8',6)});
 fxPad(c,30,70,m.v,m.v?P.gold:'#5e636e');R(c,70,70,150,18,'#1d2533');bar(c,74,74,142,10,m.v,m.v?P.cyan:'#5e636e');txt(c,Math.round(m.v*100)+'%',145,100,m.v?P.cyan:'#9aa6b8',7);
 prTag(c,'Opt-out + intensity',4,4,P.cyan);prTag(c,'% ≠ equal feel',W-4,4,P.gold,'rgba(10,14,24,.75)',6,'right')}};
/* FX-35 multimodal redundancy: one warning, many senses */
DEMOS['FX-35']={d:5,f:(c,t)=>{const u=prWrap(t),warn=Math.sin(u*TAU*2)>.2;c.drawImage(scene('battle'),0,0);R(c,0,0,W,H,'rgba(13,22,48,.35)');
 if(warn){R(c,0,0,W,H,'rgba(224,74,58,.12)');ring(c,170,80,30+Math.sin(u*TAU*6)*3,2,P.red);otxt(c,'!',170,70,P.red,14)}
 R(c,6,6,100,50,'rgba(10,14,24,.85)');txt(c,'VISUAL',12,14,warn?P.red:'#5e636e',5,'left');txt(c,'AUDIO',12,28,warn?P.cyan:'#5e636e',5,'left');fxWave(c,48,28,50,10,u*6,warn?.7:.05,warn?P.cyan:'#5e636e',16);txt(c,'HAPTIC',12,42,warn?P.gold:'#5e636e',5,'left');R(c,48,38,50,8,'#1d2533');if(warn)for(let i=0;i<6;i++)R(c,50+i*8,38+(i%2),6,6,P.gold);
 prTag(c,'test each channel OFF',W-4,H-14,'#e9edf2','rgba(10,14,24,.75)',5,'right')}};
/* FX-36 captions / visualized sound cues */
DEMOS['FX-36']={d:5,f:(c,t)=>{const u=prWrap(t);c.drawImage(scene('battle'),0,0);R(c,0,0,W,H,'rgba(13,22,48,.25)');
 const cues=[{t:.1,s:'FOOTSTEP',x:90,y:100,dir:-1},{t:.4,s:'GROWL',x:170,y:60,dir:1},{t:.7,s:'RELOAD',x:50,y:50,dir:-1}];
 cues.forEach((q,i)=>{const age=prWrap(u-q.t);if(age>.55)return;const a=1-age/.55;c.globalAlpha=a;R(c,q.x-28,q.y-18,56,14,'rgba(10,14,24,.85)');txt(c,q.s,q.x,q.y-11,'#e9edf2',5);prLine(c,q.x,q.y-4,q.x+q.dir*16,q.y+6,P.gold,1.5);c.beginPath();c.moveTo(q.x+q.dir*16,q.y+6);c.lineTo(q.x+q.dir*10,q.y+2);c.lineTo(q.x+q.dir*12,q.y+10);c.fillStyle=P.gold;c.fill();c.globalAlpha=1});
 prTag(c,'Sound captions',4,4,P.cyan);prTag(c,'source · dir · event',W-4,4,'#e9edf2','rgba(10,14,24,.75)',6,'right')}};
/* FX-37 reduced motion option preserves hazard geometry */
DEMOS['FX-37']={d:5,f:(c,t)=>{const u=prWrap(t);for(const i of[0,1])prLane(c,i,i?'REDUCED':'FULL VFX',i?P.cyan:P.gold,gy=>{shadow(c,160,gy,7);spr(c,'foe',160,gy,{sx:2,sy:2,flip:1});
  ring(c,160,gy-4,20,1.5,P.red);txt(c,'AoE',160,gy-28,P.red,5);if(!i){for(let j=0;j<16;j++){const a=hash(j)*TAU+u*6,r=10+hash(j+3)*24;R(c,160+Math.cos(a)*r,gy-8+Math.sin(a)*r*.5,2,2,P.gold)}puff(c,160,gy-10,18,.4,'242,170,80');burst(c,100,gy-20,prWrap(u*2),8,3,{speed:40,life:.5,col:P.purple,fade:1})}
  else{prDash(c,140,gy-24,40,24,P.cyan);txt(c,'hazard kept',100,gy-20,P.cyan,5)}});
 prTag(c,'options ≠ comfort guarantee',W-4,4,'#9aa6b8','rgba(10,14,24,.75)',5,'right')}};
/* FX-38 photosensitivity: safe nonflashing review diagram */
DEMOS['FX-38']={d:6,f:(c,t)=>{const u=prWrap(t);R(c,0,0,W,H,'#141a24');prTag(c,'Photosensitivity review',4,4,P.cyan);
 R(c,10,20,140,90,'#1d2533');c.drawImage(scene('battle'),12,22,136,70);R(c,12,92,136,14,'rgba(10,14,24,.85)');txt(c,'composited gameplay',80,99,'#9aa6b8',5);
 const checks=[['flash rate',u>.2],['area lit',u>.4],['contrast',u>.6],['pattern',u>.8]];checks.forEach((ch,i)=>{const y=22+i*22;R(c,158,y,72,18,'#1d2533');R(c,162,y+4,10,10,ch[1]?P.cyan:'#2f3a4d');if(ch[1])txt(c,'+',167,y+9,P.ink,6);txt(c,ch[0],176,y+9,'#e9edf2',5,'left')});
 prTag(c,'nonflashing diagram',4,H-14,P.gold);prTag(c,'≠ certification',W-4,H-14,P.red,'rgba(10,14,24,.75)',6,'right')}};
})();
