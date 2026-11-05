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
})();
