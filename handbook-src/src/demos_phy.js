/* ===== PHY demos — deterministic: each sim is baked once at 30 Hz, then sampled by t ===== */
(()=>{
const bake=(n,init,step)=>{const fr=[];let s=init();for(let i=0;i<n;i++){fr.push(s.map(p=>[p[0],p[1]]));step(s,i/30)}return fr};
const at=(fr,t)=>fr[Math.min(fr.length-1,Math.floor(clamp(t)*(fr.length-1)))];
const bgSky=c=>{const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#5b8fb8');g.addColorStop(1,'#a9c9dc');c.fillStyle=g;c.fillRect(0,0,W,H);R(c,0,112,W,23,P.grass2);R(c,0,112,W,1,P.grassD)};
/* PHY-01 PBD cloth flag: grid 12×8, left column pinned to a pole, gusting wind */
const CW=12,CH=8,SP=8;let CL=null;
const clothBake=()=>{const n=CW*CH,D=6*30;const idx=(i,j)=>j*CW+i;const E=[];for(let j=0;j<CH;j++)for(let i=0;i<CW;i++){if(i<CW-1)E.push([idx(i,j),idx(i+1,j),SP]);if(j<CH-1)E.push([idx(i,j),idx(i,j+1),SP]);if(i<CW-2)E.push([idx(i,j),idx(i+2,j),SP*2])}
const X=[],V=[];for(let j=0;j<CH;j++)for(let i=0;i<CW;i++){X.push([70+i*SP,28+j*SP]);V.push([0,0])}const fr=[];const dt=1/30,sub=3,h=dt/sub;
for(let f=0;f<D;f++){fr.push(X.map(p=>[p[0],p[1]]));const tt=f/30,sprint=(Math.sin(tt*TAU/2)>0.6?220:0),wind=150+110*Math.sin(tt*TAU/3)+45*Math.sin(tt*TAU*1.3)+sprint;
for(let s=0;s<sub;s++){const Pp=X.map((p,k)=>{const i=k%CW,j=(k/CW)|0;if(i===0)return [p[0],p[1]];const w=wind*(0.6+0.4*Math.sin(j*.7+tt*4+i*.5));V[k][0]+=w*h;V[k][1]+=(90+70*Math.sin(i*.9+tt*5+j*.4))*h;V[k][0]*=.985;V[k][1]*=.985;return [p[0]+V[k][0]*h,p[1]+V[k][1]*h]});
for(let it=0;it<6;it++)for(const [a,b,L] of E){const wa=a%CW===0?0:1,wb=b%CW===0?0:1;if(!wa&&!wb)continue;const dx=Pp[b][0]-Pp[a][0],dy=Pp[b][1]-Pp[a][1],d=Math.hypot(dx,dy)||1e-6,k=(d-L)/d/(wa+wb);Pp[a][0]+=wa*k*dx;Pp[a][1]+=wa*k*dy;Pp[b][0]-=wb*k*dx;Pp[b][1]-=wb*k*dy}
Pp.forEach((p,k)=>{if(k%CW===0)return;p[1]=Math.min(p[1],110);V[k]=[(p[0]-X[k][0])/h,(p[1]-X[k][1])/h];X[k]=p})}}return fr};
DEMOS['PHY-01']={d:6,f:(c,t)=>{bgSky(c);if(!CL)CL=clothBake();const X=at(CL,t);R(c,66,22,4,92,P.woodD);R(c,64,20,8,3,P.wood);
for(let j=0;j<CH-1;j++)for(let i=0;i<CW-1;i++){const a=X[j*CW+i],b=X[j*CW+i+1],d=X[(j+1)*CW+i+1],e=X[(j+1)*CW+i];const sx=(b[0]-a[0])/SP,sh=clamp(.55+.45*sx);const red=(j<3)?[200,70,58]:[236,226,206];c.fillStyle=`rgb(${red.map(v=>Math.round(v*sh)).join(',')})`;c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.lineTo(d[0],d[1]);c.lineTo(e[0],e[1]);c.closePath();c.fill()}
c.fillStyle='rgba(20,26,36,.5)';for(let k=0;k<X.length;k+=1){const p=X[k];if((k%CW)%3===0&&((k/CW)|0)%2===0)R(c,p[0],p[1],1,1)}
label(c,'pinned column → pole',58,12);label(c,'relative wind (−vel) · curtains hold',150,126,P.gold);}};
/* PHY-02 Verlet rope: anchored at top, end held by a hand that drags right, then released at t=.45 */
const RN=18,RL=5;let RP=null;
const ropeBake=()=>{const D=7*30;let X=[],O=[];for(let i=0;i<RN;i++){X.push([60,16+i*RL]);O.push([60,16+i*RL])}const fr=[];const hand=tt=>{const u=ease(tt/3);return [60+u*95,16+RN*RL*.85-u*40]};
for(let f=0;f<D;f++){const tt=f/30;fr.push(X.map(p=>[p[0],p[1]]));const held=tt<3.15;for(let s=0;s<2;s++){const h=1/60;for(let i=1;i<RN;i++){const p=X[i],o=O[i];const nx=p[0]+(p[0]-o[0])*.992,ny=p[1]+(p[1]-o[1])*.992+300*h*h;O[i]=[p[0],p[1]];X[i]=[nx,ny]}
if(held){const hp=hand(tt);X[RN-1]=hp.slice();O[RN-1]=hp.slice()}
for(let it=0;it<10;it++){for(let i=0;i<RN-1;i++){const a=X[i],b=X[i+1],dx=b[0]-a[0],dy=b[1]-a[1],d=Math.hypot(dx,dy)||1e-6,df=(d-RL)/d;const wa=i===0?0:1,wb=(i+1===RN-1&&held)?0:1;if(!wa&&!wb)continue;const k=df/(wa+wb);a[0]+=wa*k*dx;a[1]+=wa*k*dy;b[0]-=wb*k*dx;b[1]-=wb*k*dy}}}}return {fr,hand}};
DEMOS['PHY-02']={d:7,f:(c,t)=>{R(c,0,0,W,H,'#20283a');R(c,0,118,W,17,'#2e3a52');R(c,40,10,40,6,P.stoneD);if(!RP)RP=ropeBake();const X=at(RP.fr,t),held=t*7<3.15;
for(let i=0;i<RN-1;i++){const a=X[i],b=X[i+1];c.strokeStyle=i%2?'#c9a46a':'#a8834e';c.lineWidth=2;c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.stroke()}
X.forEach((p,i)=>{if(i%3===0)R(c,p[0]-1,p[1]-1,2,2,'#e8d3a8')});const e=X[RN-1];if(held){circ(c,e[0],e[1],4,P.skin);label(c,'pull',e[0],e[1]-9,P.gold)}else{R(c,e[0]-4,e[1],8,7,P.stone);label(c,'released → swing',e[0],e[1]-8,P.cyan)}
label(c,'x += (x − x_prev)·0.99 + g·dt²   then length constraints',120,128);}};
/* PHY-03 jelly slime: shape matching + area pressure, drops and bounces */
const JN=16,JR=16;let JB=null;
const jellyBake=()=>{const D=6*30;const rest=[];for(let i=0;i<JN;i++){const a=i/JN*TAU;rest.push([Math.cos(a)*JR,Math.sin(a)*JR*.85])}let X=rest.map(q=>[120+q[0],30+q[1]]),V=rest.map(()=>[0,0]);const fr=[];const FY=112;const A0=area(rest);
for(let f=0;f<D;f++){fr.push(X.map(p=>[p[0],p[1]]));if(f===100){X=rest.map(q=>[120+q[0],30+q[1]]);V=rest.map(()=>[0,0])}const h=1/60;for(let s=0;s<2;s++){X.forEach((p,i)=>{V[i][1]+=260*h;p[0]+=V[i][0]*h;p[1]+=V[i][1]*h;if(p[1]>FY){p[1]=FY;V[i][1]*=-.25;V[i][0]*=.8}});
let cx=0,cy=0;X.forEach(p=>{cx+=p[0];cy+=p[1]});cx/=JN;cy/=JN;let s1=0,s2=0;X.forEach((p,i)=>{const px=p[0]-cx,py=p[1]-cy,q=rest[i];s1+=px*q[1]-py*q[0];s2+=px*q[0]+py*q[1]});const ang=-Math.atan2(s1,s2),ca=Math.cos(ang),sa=Math.sin(ang);
const ar=area(X),pr=(A0-ar)/A0*.6;X.forEach((p,i)=>{const q=rest[i],gx=cx+q[0]*ca-q[1]*sa,gy=cy+q[0]*sa+q[1]*ca;const nx=p[0]-cx,ny=p[1]-cy,nl=Math.hypot(nx,ny)||1;const dx=(gx-p[0])*.06+nx/nl*pr*2,dy=(gy-p[1])*.06+ny/nl*pr*2;p[0]+=dx;p[1]+=dy;V[i][0]+=dx/h*.5;V[i][1]+=dy/h*.5;V[i][0]*=.985;V[i][1]*=.985})}}return fr};
function area(X){let a=0;for(let i=0;i<X.length;i++){const p=X[i],q=X[(i+1)%X.length];a+=p[0]*q[1]-q[0]*p[1]}return Math.abs(a)/2}
DEMOS['PHY-03']={d:6,f:(c,t)=>{R(c,0,0,W,H,'#1c2436');R(c,0,112,W,23,'#3a3060');R(c,0,112,W,1,'#6a5aa0');if(!JB)JB=jellyBake();const X=at(JB,t);
c.fillStyle='#5fd08a';c.beginPath();X.forEach((p,i)=>{const q=X[(i+1)%JN],mx=(p[0]+q[0])/2,my=(p[1]+q[1])/2;if(i===0)c.moveTo(mx,my);else c.quadraticCurveTo(p[0],p[1],mx,my)});const p0=X[0],q0=X[1];c.quadraticCurveTo(p0[0],p0[1],(p0[0]+q0[0])/2,(p0[1]+q0[1])/2);c.fill();
let cx=0,cy=0,mn=1e9;X.forEach(p=>{cx+=p[0];cy+=p[1];mn=Math.min(mn,p[1])});cx/=JN;cy/=JN;R(c,cx-6,cy-3,3,4,P.ink);R(c,cx+3,cy-3,3,4,P.ink);circ(c,cx-6,mn+6,3,'rgba(255,255,255,.55)');
c.strokeStyle='rgba(255,255,255,.25)';c.setLineDash([2,2]);c.beginPath();for(let i=0;i<JN;i++){const a=i/JN*TAU,x=cx+Math.cos(a)*JR,y=cy+Math.sin(a)*JR*.85;i?c.lineTo(x,y):c.moveTo(x,y)}c.closePath();c.stroke();c.setLineDash([]);
label(c,'dashed = rest shape (shape-matching goal)',120,10);label(c,'squash on landing → wobble back',120,126);}};
})();
