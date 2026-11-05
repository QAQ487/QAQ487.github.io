/* ===== ACT principle demos (canvas) ===== */
(()=>{
const pit=(c,gy,a,b)=>{R(c,a,gy,b-a,12,'#1d1712');R(c,a,gy,1,12,P.dirtD);R(c,b-1,gy,1,12,P.dirtD)};
const hud=(c,s,col)=>prTag(c,s,W-4,H-12,col||'#e9edf2','rgba(10,14,24,.75)',6,'right');
/* ACT-01 coyote time */
DEMOS['ACT-01']={d:5,f:(c,t)=>{const u=prWrap(t),run=u<.35,xr=lerp(40,132,Math.min(u,.35)/.35),edge=.304;
 prLane(c,0,'OFF',P.red,gy=>{pit(c,gy,120,168);let x=xr,y=gy,al=1;if(u>edge){const f=u-edge;x=Math.min(xr+(u>.35?(u-.35)*120:0),160);y=gy+700*f*f}if(u>.78){x=40;y=gy;al=seg(u,.78,.86)}if(y<gy+14)shadow(c,x,gy,5,x>120&&x<168?0:.35);prWalker(c,x,y,x/12,{s:1.5,alpha:al,still:u>.78||u>edge});
  if(u>=.35&&u<.5){prTag(c,'JUMP',132,gy-34,P.red,'rgba(10,14,24,.75)',6,'center');txt(c,'too late',132,gy-40,P.red,5)}if(u>.45&&u<.78)prTag(c,'FALL',144,gy-30,P.red,'rgba(10,14,24,.75)',6,'center')});
 prLane(c,1,'COYOTE TIME',P.cyan,gy=>{pit(c,gy,120,168);let x=xr,y=gy;if(u>=.35){const k=seg(u,.35,.57);x=lerp(132,196,k);y=gy-Math.sin(k*Math.PI)*22;if(u>.57){x=lerp(196,212,seg(u,.57,.65));y=gy}}shadow(c,x,gy,5,x>120&&x<168?0:.35);prWalker(c,x,y,x/12,{s:1.5,still:(u>.35&&u<.57)||u>.65});
  if(u>edge&&u<.45){const g=u<.35?1-(u-edge)/.1:1-(.35-edge)/.1;bar(c,108,gy-40,30,3,g,P.cyan);txt(c,'grace',123,gy-45,P.cyan,5)}if(u>=.35&&u<.5)prTag(c,'JUMP',132,gy-34,P.gold,'rgba(10,14,24,.75)',6,'center');prLine(c,120.5,gy-24,120.5,gy,'rgba(233,237,242,.6)',1,[2,2])})}};
/* ACT-03 apex hang */
const jy=(k,hang)=>{const s=hang?.5+.4*(k-.5)+2.4*Math.pow(k-.5,3):k;return 4*s*(1-s)};
DEMOS['ACT-03']={d:5,f:(c,t)=>{const u=prWrap(t),k=seg(u,.1,.8);for(const i of[0,1])prLane(c,i,i?'APEX HANG':'NORMAL',i?P.cyan:'#e9edf2',gy=>{const H0=36,X=kk=>lerp(36,204,kk);if(i){R(c,X(.3),gy-H0-4,X(.7)-X(.3),12,'rgba(127,227,216,.14)');txt(c,'hang',120,gy-H0-8,P.cyan,5)}
  for(let j=0;j<=20;j++){const kk=j/20;if(kk>k)break;R(c,X(kk)-1,gy-jy(kk,i)*H0-1,2,2,i?P.cyan:'#cfd8e3')}const x=k>=1?204:X(k),y=gy-jy(k,i)*H0;shadow(c,x,gy,5,.35*(1-jy(k,i)));prWalker(c,x,y,0,{s:1.5,still:1,sy:k>0&&k<1?1.05:1})});
 prTag(c,'same height, longer top',W-4,4,'#e9edf2','rgba(10,14,24,.75)',6,'right')}};
/* ACT-09 anticipation: body pose only (no effects) */
function striker(c,x,gy,pose){const{cr=0,lean=0,dx=0,arm=0}=pose;c.save();c.translate(x+dx,gy);c.rotate(lean);c.scale(1+cr*.12,1-cr*.18);shadow(c,0,0,7);c.scale(2,2);c.drawImage(sprCanvas('hero'),0,0,7,10,-4,-10,7,10);c.restore();
 const hx=x+dx+6+lean*10,hy=gy-10-lean*4+cr*3;c.save();c.translate(hx,hy);c.rotate(arm);R(c,0,-1,14,2,'#e9edf2');R(c,-2,-2,3,4,P.woodD);c.restore()}
DEMOS['ACT-09']={d:5,f:(c,t)=>{const u=prWrap(t);
 prLane(c,0,'NO ANTICIPATION','#e9edf2',gy=>{const s=seg(u,.45,.52),r=seg(u,.6,.85);const arm=lerp(lerp(-1.2,.6,eo(s)),-1.2,ease(r));striker(c,80,gy,{dx:eo(s)*8*(1-ease(r)),arm});const hit=u>.5&&u<.75;prDummy(c,106,gy,hit?Math.sin((u-.5)*40)*.3*(1-seg(u,.5,.75)):0,u>.5&&u<.54);txt(c,u<.45?'idle':u<.6?'strike':'recover',80,gy-36,'#cfd8e3',5)});
 prLane(c,1,'ANTICIPATION',P.gold,gy=>{const a=ease(seg(u,.15,.45)),s=seg(u,.45,.52),r=seg(u,.6,.85),w=a*(1-s);const arm=lerp(lerp(lerp(-1.2,-2.6,a),.6,eo(s)),-1.2,ease(r));striker(c,80,gy,{cr:w,lean:-.22*w,dx:-4*w+eo(s)*8*(1-ease(r)),arm});const hit=u>.5&&u<.75;prDummy(c,106,gy,hit?Math.sin((u-.5)*40)*.3*(1-seg(u,.5,.75)):0,u>.5&&u<.54);txt(c,u<.15?'idle':u<.45?'wind-up':u<.6?'strike':'recover',80,gy-36,u>=.15&&u<.45?P.gold:'#cfd8e3',5)});
 for(const y0 of[57,126]){R(c,150,y0,80,3,'#1d2533');R(c,150+.45*80,y0,.07*80,3,'#e9edf2');if(y0>100)R(c,150+.15*80,y0,.3*80,3,P.gold);R(c,150+u*80,y0-2,1,7,'#fff')}}};
/* ACT-10 squash & stretch with a fixed collider */
const ss=u=>{if(u<.15)return 0;if(u<.25)return-seg(u,.15,.25);if(u<.32)return lerp(-1,.9,seg(u,.25,.32));if(u<.6)return lerp(.9,0,seg(u,.32,.45));if(u<.66)return-ei(1-seg(u,.6,.66))*0-seg(u,.6,.63)+seg(u,.63,.75)*1;return u<.75?-(1-seg(u,.63,.75)):0};
DEMOS['ACT-10']={d:4,f:(c,t)=>{const u=prWrap(t),k=seg(u,.25,.6),y=Math.sin(k*Math.PI)*30;let q=0;if(u>=.15&&u<.25)q=-ease(seg(u,.15,.25));else if(u>=.25&&u<.6)q=lerp(-1,.9,eo(seg(u,.25,.32)))*(1-seg(u,.32,.6))+(u>.45?0:0);else if(u>=.6&&u<.8)q=-(1-ease(seg(u,.6,.8)))*(u<.63?seg(u,.6,.63)*3:1);q=clamp(q,-1,1);
 for(const i of[0,1])prLane(c,i,i?'SQUASH & STRETCH':'RIGID',i?P.gold:'#e9edf2',gy=>{const x=120,yy=gy-y;shadow(c,x,gy,7,.35*(1-y/40));const sx=i?1+(q<0?-q*.35:-q*.2):1,sy=i?1+(q<0?q*.3:q*.35):1;spr(c,'hero',x,yy,{sx:2*sx,sy:2*sy});prDash(c,x-8,yy-20,16,20,'rgba(127,227,216,.9)');if(i)txt(c,q<-.05?'squash':q>.05?'stretch':'',x+28,yy-10,P.gold,5,'left')});
 prTag(c,'collider unchanged',W-4,4,P.cyan,'rgba(10,14,24,.75)',6,'right')}};
/* ACT-12 easing: linear vs ease spacing */
DEMOS['ACT-12']={d:4,f:(c,t)=>{const u=prWrap(t),k=seg(u,.15,.65);const A0=-2.4,A1=.5;for(const i of[0,1])prLane(c,i,i?'EASE IN-OUT':'LINEAR',i?P.gold:'#e9edf2',gy=>{const fn=i?(x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2):(x=>x),px=74,py=gy-12;shadow(c,64,gy,7);spr(c,'hero',64,gy,{sx:2,sy:2});
  for(let j=0;j<=12;j++){const kk=j/12;if(kk>k+1e-6)break;const a=lerp(A0,A1,fn(kk));R(c,px+Math.cos(a)*24-1,py+Math.sin(a)*24-1,2,2,i?P.gold:'#cfd8e3')}const a=lerp(A0,A1,fn(k));c.save();c.translate(px,py);c.rotate(a);R(c,0,-1,24,2,'#e9edf2');R(c,-2,-2,4,4,P.woodD);c.restore();
  const gx=150,gw=80,gh=40,g0=gy-46;R(c,gx-2,g0-2,gw+4,gh+4,'rgba(10,14,24,.7)');for(let j=0;j<=gw;j++)R(c,gx+j,g0+gh-fn(j/gw)*gh,1,1,i?P.gold:'#cfd8e3');R(c,gx+k*gw-1,g0+gh-fn(k)*gh-1,3,3,'#fff');txt(c,'time',gx+gw,g0+gh+6,'#9aa6b8',5,'right')})}};
/* ACT-13 follow-through: body stops, cape keeps swinging and settles */
const p13=u=>prKeys([[0,40],[.08,40],[.32,170],[.5,170],[.58,170],[.82,40],[1,40]],u,x=>x);
const s13=prSeries('a13',()=>({a:0,v:0}),(s,u,dt)=>{const vel=(p13(prWrap(u+.002))-p13(u))/.002;const tgt=clamp(-vel/700,-1.1,1.1);const k=900,d=9;s.v+=(k*(tgt-s.a)-d*s.v)*dt;s.a+=s.v*dt});
DEMOS['ACT-13']={d:6,f:(c,t)=>{const u=prWrap(t),x=p13(u),mv=p13(prWrap(u+.002))-x,st=prAt(s13,u);prSide(c,120,67,{props:false});const gy=100;
 const face=(u>=.08&&u<.58)?1:-1,ax=x-face*4,ay=gy-21,L=20,a=st.a,tx=ax+Math.sin(a)*L,ty=ay+Math.cos(a)*L,mx=ax+Math.sin(a*.5)*L*.55,my=ay+Math.cos(a*.5)*L*.55;c.fillStyle=P.purple;c.beginPath();c.moveTo(ax-4,ay);c.lineTo(ax+4,ay);c.quadraticCurveTo(mx+5,my,tx+5,ty);c.lineTo(tx-5,ty);c.quadraticCurveTo(mx-5,my,ax-4,ay);c.fill();c.fillStyle='#6f3f9e';c.fillRect(Math.round(tx-5),Math.round(ty-2),10,2);
 shadow(c,x,gy,9);prWalker(c,x,gy,x/20,{s:3,flip:face<0,still:Math.abs(mv)<.01});
 R(c,0,110,W,25,'#141a24');for(let i=0;i<W;i++){const a=prAt(s13,i/W).a;R(c,i,122-a*9,1,1,P.purple);const v=Math.abs(p13(prWrap(i/W+.002))-p13(i/W))>.01;if(v)R(c,i,132,1,1,P.cyan)}R(c,Math.floor(u*W),111,1,24,'#fff');txt(c,'cape angle',4,114,P.purple,5,'left');txt(c,'body moving',236,128,P.cyan,5,'right');
 prTag(c,Math.abs(mv)<.01?(Math.abs(st.v)>.3?'body stopped: cape follows through':'settled'):'moving',4,4,Math.abs(mv)<.01&&Math.abs(st.v)>.3?P.gold:'#e9edf2')}};
/* ACT-16 secondary action: clenched trembling fist on top of the walk */
DEMOS['ACT-16']={d:4,f:(c,t,_w,_h,p)=>{const u=prWrap(t),x=lerp(30,210,u),fr=Math.floor(u*p.dur*24);for(const i of[0,1])prLane(c,i,i?'WALK + FIST':'WALK',i?P.gold:'#e9edf2',gy=>{shadow(c,x,gy,8);prWalker(c,x,gy,u*8,{s:3});if(i){const jx=Math.round((hash(fr*3+1)-.5)*2),jy=Math.round((hash(fr*3+2)-.5)*2),fx=x+9+jx,fy=gy-13+jy+Math.round(Math.sin(u*8*TAU)*1);R(c,fx-2,fy-2,6,6,P.ink);R(c,fx-1,fy-1,4,4,P.skin);R(c,fx-1,fy,4,1,'#c99a72');R(c,fx-1,fy+2,4,1,'#c99a72');ring(c,fx+1,fy+1,7,1,'rgba(242,201,76,.8)')}});
 prTag(c,'main: walk  /  secondary: fist',W-4,H-12,'#e9edf2','rgba(10,14,24,.75)',6,'right')}};
/* ACT-21 hitstop: actors freeze on impact while the world keeps ticking */
function scene21(c,gy,a,s,stop){const tr=Math.sin(s*3)*2;tree(c,200,gy,tr);const cx=218,cy=gy-44;circ(c,cx,cy,7,'#e9edf2');ring(c,cx,cy,7,1,P.ink);prLine(c,cx,cy,cx+Math.cos(s*4)*5,cy+Math.sin(s*4)*5,P.red,1);
 const sw=seg(a,.3,.4),rc=seg(a,.55,.8);const arm=lerp(lerp(-1.4,.7,eo(sw)),-1.4,ease(rc));striker(c,70,gy,{dx:eo(sw)*10*(1-ease(rc)),arm});const hit=a>=.4&&a<.7;prDummy(c,100,gy,hit?Math.sin((a-.4)*45)*.35*(1-seg(a,.4,.7)):0,stop)}
DEMOS['ACT-21']={d:5,f:(c,t,_w,_h,p)=>{const u=prWrap(t),s=u*p.dur;prLane(c,0,'OFF',P.red,gy=>scene21(c,gy,u,s,u>=.4&&u<.43));
 prLane(c,1,'HITSTOP',P.gold,gy=>{const fz=u>=.4&&u<.5,a=u<.4?u:fz?.4:u-.1;scene21(c,gy,a,s,fz);if(fz){prTag(c,'FROZEN',96,gy-46,P.gold,'rgba(10,14,24,.75)',6,'center')}});
 prTag(c,'world keeps time',W-4,H-12,'#e9edf2','rgba(10,14,24,.75)',6,'right')}};
/* ACT-29 knockback distance vs stun duration */
function kb(c,gy,u,dist,stun,col){const hit=.15,push=eo(seg(u,hit,hit+.12)),rec=seg(u,hit+.12+stun,hit+.12+stun+.15);const fx=lerp(104+dist*push,104,ease(rec)),hx=78;const sw=seg(u,.08,.15),r=seg(u,.2,.35);striker(c,hx,gy,{dx:eo(sw)*8*(1-ease(r)),arm:lerp(lerp(-1.3,.6,eo(sw)),-1.3,ease(r))});
 const stunned=u>hit+.05&&u<hit+.12+stun;shadow(c,fx,gy,6);spr(c,'foe',fx,gy,{sx:2,sy:2,flash:u>hit&&u<hit+.03?1:0,flip:true});
 if(stunned){for(let j=0;j<3;j++){const a=u*30+j*TAU/3;R(c,fx+Math.cos(a)*8-1,gy-24+Math.sin(a)*2-1,2,2,P.gold)}bar(c,fx-10,gy-31,20,3,1-seg(u,hit+.05,hit+.12+stun),col)}
 const a=hx+14,b=fx-9;if(u>hit+.1&&b>a+4){prLine(c,a,gy+6.5,b,gy+6.5,'#e9edf2',1);R(c,a,gy+4,1,5,'#e9edf2');R(c,b,gy+4,1,5,'#e9edf2');txt(c,'GAP',(a+b)/2,gy+3,'#e9edf2',5)}
 return stunned}
DEMOS['ACT-29']={d:6,f:(c,t)=>{const u=prWrap(t);prLane(c,0,'FAR PUSH / SHORT STUN',P.cyan,gy=>kb(c,gy,u,70,.12,P.cyan));prLane(c,1,'SHORT PUSH / LONG STUN',P.gold,gy=>kb(c,gy,u,14,.45,P.gold))}};
/* ACT-30 root motion vs in-place drift */
DEMOS['ACT-30']={d:5,f:(c,t)=>{const u=prWrap(t),k=ease(seg(u,.2,.5)),back=ease(seg(u,.7,.95));
 prLane(c,0,'ROOT MOTION',P.cyan,gy=>{const cx=lerp(lerp(60,100,k),60,back);prDash(c,cx-9,gy-22,18,22,P.cyan);shadow(c,cx,gy,7);prWalker(c,cx,gy,0,{s:2,still:1,sx:1});txt(c,'capsule follows',cx+14,gy-26,P.cyan,5,'left')});
 prLane(c,1,'IN-PLACE + DRIFT',P.red,gy=>{const snap=u>.5&&u<.7,m=u<.5?lerp(60,100,k):snap?60+40*(1-seg(u,.5,.53)):60,cap=60;prDash(c,cap-9,gy-22,18,22,P.red);shadow(c,m,gy,7);prWalker(c,m,gy,0,{s:2,still:1});if(m-cap>3){prLine(c,cap,gy-26.5,m,gy-26.5,P.red,1);txt(c,'offset '+Math.round(m-cap),(cap+m)/2,gy-31,P.red,5)}if(snap&&u<.58)prTag(c,'POP',m+12,gy-20,P.red)});
 prTag(c,'lunge',W-4,4,'#e9edf2','rgba(10,14,24,.75)',6,'right')}};
/* ACT-31 treadmill: in-place asset vs controller-driven world move */
DEMOS['ACT-31']={d:5,f:(c,t)=>{const u=prWrap(t),ph=u*5;R(c,0,0,W,H,'#141a24');
 R(c,6,6,90,60,'#1d2533');prTag(c,'ASSET: in-place',8,8,P.cyan);for(let i=0;i<12;i++){const x=6+((i*10-u*5*24)%120+120)%120;if(x<96)R(c,x,55,5,2,'#5e636e')}R(c,6,57,90,1,'#9aa6b8');prWalker(c,51,55,ph,{s:2.5,amp:2});prLine(c,51.5,18,51.5,58,'rgba(127,227,216,.5)',1,[2,2]);
 c.save();c.beginPath();c.rect(0,70,W,65);c.clip();R(c,0,70,W,65,P.sky);const gy=122;R(c,0,gy,W,13,P.dirtD);R(c,0,gy,W,3,P.grass);tree(c,30,gy);tree(c,180,gy);fence(c,96,gy,5);
 const x=lerp(10,230,u);for(let j=0;j<40;j++){const fxp=10+j*5.5;if(fxp>x-2)break;R(c,fxp,gy+4,2,1,'rgba(20,26,36,.5)')}shadow(c,x,gy,6);prWalker(c,x,gy,ph,{s:2,amp:2});c.restore();prTag(c,'GAME: controller moves it',4,72,P.gold);
 txt(c,'speed = stride / cycle',170,30,'#e9edf2',6);txt(c,'feet planted: no slide',170,42,P.cyan,5)}};
})();
