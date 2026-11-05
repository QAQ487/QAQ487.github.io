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
/* ---- remaining ACT principle demos ---- */
const fBar=(c,x,y,w,u,parts)=>{R(c,x,y,w,4,'#1d2533');for(const[a,b,col]of parts)R(c,x+a*w,y,(b-a)*w,4,col);R(c,x+u*w-1,y-2,2,8,'#fff')};
const ledge=(c,gy,x,w)=>{R(c,x,gy-28,w,28,P.dirtD);R(c,x,gy-28,w,3,P.grass)};
/* ACT-02 jump buffer: early press retained until landing */
DEMOS['ACT-02']={d:5,f:(c,t)=>{const u=prWrap(t),fall=seg(u,.15,.55),land=.55,press=.38;
 prLane(c,0,'NO BUFFER',P.red,gy=>{const y=u<land?gy-Math.sin(fall*Math.PI)*36:gy;shadow(c,90,gy,5,u<land?0:.35);prWalker(c,90,y,0,{s:1.5,still:1});
  if(u>=press&&u<land){prTag(c,'PRESS',90,gy-48,P.gold,'rgba(10,14,24,.75)',6,'center');bar(c,74,gy-42,32,3,1-seg(u,press,land),P.gold)}
  if(u>=land&&u<.85){txt(c,'ignored',90,gy-36,P.red,5);prTag(c,'no jump',90,gy-46,P.red)}});
 prLane(c,1,'JUMP BUFFER',P.cyan,gy=>{const jumped=u>=land&&u<.85,k=seg(u,land,.78);const y=u<land?gy-Math.sin(fall*Math.PI)*36:jumped?gy-Math.sin(k*Math.PI)*28:gy;
  shadow(c,90,gy,5,u<land||(jumped&&k<.95)?0:.35);prWalker(c,90,y,0,{s:1.5,still:1});
  if(u>=press&&u<land){prTag(c,'PRESS',90,gy-48,P.gold);bar(c,74,gy-42,32,3,1-seg(u,press,land),P.cyan);txt(c,'held',90,gy-36,P.cyan,5)}
  if(jumped)prTag(c,'JUMP',90,gy-46,P.cyan)})}};
/* ACT-04 corner correction: lateral nudge clears a grazing ledge */
DEMOS['ACT-04']={d:5,f:(c,t)=>{const u=prWrap(t),k=seg(u,.1,.75);
 prLane(c,0,'BLOCKED',P.red,gy=>{ledge(c,gy,120,90);const rise=Math.min(k/.45,1),hit=k>.32;const x=lerp(70,118,Math.min(k/.35,1)),y=hit?gy-28:gy-rise*40;
  shadow(c,x,gy,5,hit?0:.2);prWalker(c,x,y,0,{s:1.5,still:1});if(hit){prLine(c,120.5,gy-28,120.5,gy-4,P.red,1);prTag(c,'HEAD HIT',x,y-22,P.red)}});
 prLane(c,1,'CORNER FIX',P.cyan,gy=>{ledge(c,gy,120,90);const rise=Math.min(k/.55,1);let x=lerp(70,118,Math.min(k/.32,1)),y=gy-rise*42;
  if(k>.32&&k<.5){const n=ease(seg(k,.32,.5));x=lerp(118,132,n);y=gy-28-n*14}else if(k>=.5){x=lerp(132,160,seg(k,.5,.75));y=gy-42+seg(k,.55,.75)*14;if(k>.7)y=gy}
  if(k>.32&&k<.55){prLine(c,118,gy-28,132,gy-28,P.cyan,1);txt(c,'nudge',125,gy-34,P.cyan,5)}
  shadow(c,x,gy,5,y<gy-.5?0:.35);prWalker(c,x,y,0,{s:1.5,still:1});if(k>.32&&k<.5)prTag(c,'SLIDE',x,y-20,P.cyan)})}};
/* ACT-05 wall-jump grace: jump accepted within gold distance of wall */
DEMOS['ACT-05']={d:5,f:(c,t)=>{const u=prWrap(t);
 prLane(c,0,'STRICT',P.red,gy=>{R(c,200,gy-54,20,54,P.stone);R(c,200,gy-54,2,54,P.stoneD);const near=u<.45,x=near?196:188,fall=seg(u,.2,.7);
  const y=gy-Math.sin(Math.min(fall,1)*Math.PI)*10*(u<.5?1:0)+seg(u,.45,.8)*20;shadow(c,x,gy,4,.2);prWalker(c,x,Math.min(y,gy),0,{s:1.5,still:1,flip:1});
  if(u>=.35&&u<.55)prTag(c,'JUMP',x-8,gy-40,P.gold);if(u>=.45)prTag(c,'fail',x-10,gy-28,P.red)});
 prLane(c,1,'WALL GRACE',P.cyan,gy=>{R(c,200,gy-54,20,54,P.stone);R(c,200,gy-54,2,54,P.stoneD);R(c,176,gy-54,24,54,'rgba(242,201,76,.18)');prDash(c,176,gy-54,24,54,P.gold);
  const press=u>=.32&&u<.48,k=seg(u,.4,.72);let x=188,y=gy-8;if(u>=.4){x=lerp(188,120,eo(k));y=gy-8-Math.sin(k*Math.PI)*26}
  shadow(c,x,gy,4,y<gy?0:.3);prWalker(c,x,y,0,{s:1.5,still:1,flip:u<.4});txt(c,'ok zone',188,gy-58,P.gold,5);if(press)prTag(c,'JUMP',x-6,y-18,P.cyan)})}};
/* ACT-06 lift momentum storage after platform stops */
DEMOS['ACT-06']={d:6,f:(c,t)=>{const u=prWrap(t),move=seg(u,0,.35),stop=.35,jp=.48;
 prLane(c,0,'NO STORAGE',P.red,gy=>{const py=u<stop?lerp(gy,gy-22,eo(move)):gy-22;R(c,70,py,50,6,P.wood);R(c,70,py,50,2,P.woodD);
  let hx=95,hy=py;if(u>=jp){const k=seg(u,jp,.85);hy=py-Math.sin(Math.min(k,1)*Math.PI)*18}
  if(u>=stop&&u<jp)prTag(c,'stopped',95,py-10,'#e9edf2');shadow(c,hx,py,5,.3);prWalker(c,hx,hy,0,{s:1.5,still:1});
  if(u>=jp&&u<.7)prTag(c,'weak jump',hx,hy-18,P.red)});
 prLane(c,1,'LIFT STORED',P.cyan,gy=>{const py=u<stop?lerp(gy,gy-22,eo(move)):gy-22;R(c,70,py,50,6,P.wood);R(c,70,py,50,2,P.woodD);
  if(u>=stop&&u<jp+.15){bar(c,78,py-8,34,3,1-seg(u,stop,jp+.15),P.cyan);txt(c,'boost',95,py-14,P.cyan,5)}
  let hx=95,hy=py;if(u>=jp){const k=seg(u,jp,.9);hy=py-Math.sin(Math.min(k*1.1,1)*Math.PI)*36}
  shadow(c,hx,py,5,.3);prWalker(c,hx,hy,0,{s:1.5,still:1});if(u>=jp&&u<.75)prTag(c,'boosted',hx,hy-18,P.cyan)})}};
/* ACT-07 accel vs brake curves */
DEMOS['ACT-07']={d:6,f:(c,t)=>{const u=prWrap(t);
 const xOf=(soft,uu)=>{if(uu<.12)return 36;if(uu<.42)return lerp(36,140,eo(seg(uu,.12,.42)));if(uu<.5)return 140;const end=soft?.92:.72;if(uu>=end)return soft?210:168;return lerp(140,soft?210:168,eo(seg(uu,.5,end)))};
 const vOf=(soft,uu)=>xOf(soft,prWrap(uu+.002))-xOf(soft,uu);
 for(const i of[0,1])prLane(c,i,i?'SOFT BRAKE':'HARD BRAKE',i?P.gold:P.cyan,gy=>{const soft=!!i,x=xOf(soft,u),v=vOf(soft,u);
  for(let j=0;j<20;j++){const uu=j/20;if(uu>u)break;R(c,xOf(soft,uu)-1,gy-2,2,2,i?P.gold:P.cyan)}
  shadow(c,x,gy,6);prWalker(c,x,gy,u*6,{s:1.5,still:Math.abs(v)<.05});
  const gx=160,gw=70,gh=28,g0=gy-42;R(c,gx-2,g0-2,gw+4,gh+4,'rgba(10,14,24,.7)');
  for(let j=0;j<=gw;j++){const uu=j/gw,spd=Math.abs(vOf(soft,uu))*40;R(c,gx+j,g0+gh-clamp(spd)*gh,1,1,i?P.gold:P.cyan)}
  R(c,gx+u*gw-1,g0+gh-clamp(Math.abs(v)*40)*gh-1,3,3,'#fff');txt(c,'speed',gx+gw,g0+gh+5,'#9aa6b8',5,'right')})}};
/* ACT-08 air control / steering */
DEMOS['ACT-08']={d:5,f:(c,t)=>{const u=prWrap(t),k=seg(u,.12,.85);
 prLane(c,0,'LOCKED AIR',P.red,gy=>{const x=lerp(40,150,k),y=gy-Math.sin(k*Math.PI)*34;
  for(let j=0;j<=16;j++){const kk=j/16;if(kk>k)break;R(c,lerp(40,150,kk)-1,gy-Math.sin(kk*Math.PI)*34-1,2,2,'#cfd8e3')}
  shadow(c,x,gy,5,k>0&&k<1?0:.35);prWalker(c,x,y,0,{s:1.5,still:1});R(c,148,gy-2,4,2,P.red);txt(c,'land',150,gy+8,P.red,5)});
 prLane(c,1,'AIR STEER',P.cyan,gy=>{const steer=ease(seg(k,.35,.75)),x=lerp(40,lerp(150,200,steer),k),y=gy-Math.sin(k*Math.PI)*34;
  for(let j=0;j<=16;j++){const kk=j/16;if(kk>k)break;const s=ease(seg(kk,.35,.75));R(c,lerp(40,lerp(150,200,s),kk)-1,gy-Math.sin(kk*Math.PI)*34-1,2,2,P.cyan)}
  if(k>.35&&k<.8)prTag(c,'→ input',x+10,y-16,P.cyan);shadow(c,x,gy,5,k>0&&k<1?0:.35);prWalker(c,x,y,0,{s:1.5,still:1});R(c,198,gy-2,4,2,P.cyan);txt(c,'land',200,gy+8,P.cyan,5)})}};
/* ACT-11 timing vs spacing on an arm raise */
DEMOS['ACT-11']={d:5,f:(c,t)=>{const u=prWrap(t),k=seg(u,.1,.8);
 const spacings=[0,.2,.4,.6,.8,1],[easeSp]=[0,.05,.15,.4,.75,1];
 prLane(c,0,'EVEN SPACING',P.cyan,gy=>{const A0=1.2,A1=-1.6,fn=x=>x,a=lerp(A0,A1,fn(k));shadow(c,70,gy,7);spr(c,'hero',70,gy,{sx:2,sy:2});
  for(let j=0;j<spacings.length;j++){const kk=spacings[j];if(kk>k+1e-6)break;const aa=lerp(A0,A1,fn(kk));R(c,70+6+Math.cos(aa)*22-1,gy-12+Math.sin(aa)*22-1,2,2,P.cyan)}
  c.save();c.translate(76,gy-12);c.rotate(a);R(c,0,-1,22,2,'#e9edf2');R(c,-2,-2,4,4,P.woodD);c.restore();txt(c,'equal Δpose / Δt',150,gy-30,'#cfd8e3',5)});
 prLane(c,1,'EASED SPACING',P.gold,gy=>{const A0=1.2,A1=-1.6,fn=x=>x*x*(3-2*x),a=lerp(A0,A1,fn(k));shadow(c,70,gy,7);spr(c,'hero',70,gy,{sx:2,sy:2});
  for(let j=0;j<easeSp.length;j++){const kk=j/(easeSp.length-1);if(kk>k+1e-6)break;const aa=lerp(A0,A1,easeSp[j]);R(c,70+6+Math.cos(aa)*22-1,gy-12+Math.sin(aa)*22-1,2,2,P.gold)}
  c.save();c.translate(76,gy-12);c.rotate(a);R(c,0,-1,22,2,'#e9edf2');R(c,-2,-2,4,4,P.woodD);c.restore();txt(c,'same duration, crisp finish',150,gy-30,P.gold,5)})}};
/* ACT-14 overlapping action / drag: torso leads, limbs lag */
DEMOS['ACT-14']={d:5,f:(c,t)=>{const u=prWrap(t),turn=ease(seg(u,.15,.55)),back=ease(seg(u,.7,.95)),body=turn*(1-back);
 prLane(c,0,'ALL AT ONCE',P.red,gy=>{const a=body*1.1;c.save();c.translate(120,gy);c.rotate(a*.15);
  shadow(c,0,0,8);spr(c,'hero',0,0,{sx:2.5,sy:2.5});c.save();c.rotate(a);R(c,4,-12,12,2,'#e9edf2');R(c,14,-13,3,4,P.woodD);c.restore();
  R(c,-2,-16,8,3,P.purple);c.restore();txt(c,'same beat',120,gy-40,P.red,5)});
 prLane(c,1,'OVERLAP / DRAG',P.cyan,gy=>{const torso=body,sh=ease(seg(u,.28,.65))*(1-ease(seg(u,.78,.98))),hair=ease(seg(u,.38,.72))*(1-ease(seg(u,.82,1)));
  c.save();c.translate(120,gy);c.rotate(torso*.18);shadow(c,0,0,8);spr(c,'hero',0,0,{sx:2.5,sy:2.5});
  c.save();c.rotate(sh*1.2);R(c,4,-12,12,2,'#e9edf2');R(c,14,-13,3,4,P.woodD);c.restore();
  c.save();c.translate(-2,-16);c.rotate(-hair*.8);R(c,-1,0,8,3,P.purple);c.restore();c.restore();
  const rows=[['torso',torso,P.cyan],['arm',sh,P.gold],['hair',hair,P.purple]];rows.forEach(([n,v,col],i)=>{R(c,170,gy-40+i*10,40,4,'#1d2533');R(c,170,gy-40+i*10,40*v,4,col);txt(c,n,168,gy-38+i*10,'#cfd8e3',5,'right')})})}};
/* ACT-15 motion arcs: curved vs angular hand path */
DEMOS['ACT-15']={d:5,f:(c,t)=>{const u=prWrap(t),k=seg(u,.1,.8);
 prLane(c,0,'ANGULAR',P.red,gy=>{const px=70,py=gy-10;shadow(c,60,gy,7);spr(c,'hero',60,gy,{sx:2,sy:2});
  const path=kk=>kk<.5?[lerp(80,120,kk*2),lerp(py,gy-40,kk*2)]:[lerp(120,160, (kk-.5)*2),lerp(gy-40,py,(kk-.5)*2)];
  for(let j=0;j<=18;j++){const kk=j/18;if(kk>k)break;const[x,y]=path(kk);R(c,x-1,y-1,2,2,'#cfd8e3')}
  const[hx,hy]=path(k);c.save();c.translate(hx,hy);c.rotate(k<.5?-1.2:lerp(-1.2,.4,seg(k,.5,1)));R(c,0,-1,16,2,'#e9edf2');R(c,-2,-2,3,4,P.woodD);c.restore()});
 prLane(c,1,'ARC',P.cyan,gy=>{const px=70,py=gy-10;shadow(c,60,gy,7);spr(c,'hero',60,gy,{sx:2,sy:2});
  const path=kk=>{const a=lerp(-2.4,.5,kk);return[76+Math.cos(a)*34,py+Math.sin(a)*28]};
  for(let j=0;j<=18;j++){const kk=j/18;if(kk>k)break;const[x,y]=path(kk);R(c,x-1,y-1,2,2,P.cyan)}
  const[hx,hy]=path(k),a=lerp(-2.4,.5,k);c.save();c.translate(hx,hy);c.rotate(a);R(c,0,-1,16,2,'#e9edf2');R(c,-2,-2,3,4,P.woodD);c.restore();txt(c,'path ≠ hitbox',170,gy-36,'#cfd8e3',5)})}};
/* ACT-17 staging / pose readability */
DEMOS['ACT-17']={d:5,f:(c,t)=>{const u=prWrap(t),wind=ease(seg(u,.2,.55)),strike=eo(seg(u,.55,.7)),rec=ease(seg(u,.75,.95));
 const pose=wind*(1-strike)+strike*(1-rec);
 prLane(c,0,'OBSCURED',P.red,gy=>{R(c,40,gy-50,80,50,'#3a4558');shadow(c,80,gy,7);spr(c,'foe',80,gy,{sx:2.2,sy:2.2,flip:1});
  const arm=lerp(-.4,1.2,pose);c.save();c.translate(78,gy-14);c.rotate(arm);R(c,-14,-1,14,3,P.stone);c.restore();
  if(u>.5&&u<.75)txt(c,'hidden?',80,gy-40,P.red,5)});
 prLane(c,1,'STAGED',P.cyan,gy=>{R(c,140,gy-50,70,50,'#4a6a7a');shadow(c,100,gy,7);spr(c,'foe',100,gy,{sx:2.2,sy:2.2,flip:1});
  const arm=lerp(-1.8,.9,pose);c.save();c.translate(92,gy-16);c.rotate(arm);R(c,0,-1,18,3,'#e9edf2');R(c,-2,-2,3,4,P.woodD);c.restore();
  if(pose>.4&&pose<.95){prLine(c,92,gy-16,92+Math.cos(arm)*20,gy-16+Math.sin(arm)*20,P.gold,1,[2,2]);prTag(c,'CLEAR',110,gy-44,P.cyan)}})}};
/* ACT-18 startup / wind-up before active */
DEMOS['ACT-18']={d:5,f:(c,t)=>{const u=prWrap(t),st=.2,ac=.48,rc=.62;
 for(const i of[0,1])prLane(c,i,i?'WITH STARTUP':'INSTANT SWING',i?P.gold:P.red,gy=>{
  fBar(c,40,gy-8,160,u,i?[[st,ac,P.gold],[ac,rc,P.red],[rc,.9,'#5e636e']]:[[.2,.35,P.red],[.35,.9,'#5e636e']]);
  if(i){txt(c,'startup',40+(st+ac)/2*160,gy-16,P.gold,5);txt(c,'active',40+(ac+rc)/2*160,gy-16,P.red,5);
   const a=u<st?-1.2:u<ac?lerp(-1.2,-2.4,ease(seg(u,st,ac))):u<rc?lerp(-2.4,.6,eo(seg(u,ac,rc))):lerp(.6,-1.2,ease(seg(u,rc,.9)));
   striker(c,60,gy,{cr:u>=st&&u<ac?seg(u,st,ac)*.8:0,lean:u>=st&&u<ac?-0.2*seg(u,st,ac):0,arm:a,dx:u>=ac&&u<rc?6:0});
   prDummy(c,110,gy,u>=ac&&u<rc?Math.sin((u-ac)*40)*.25:0,u>=ac&&u<ac+.05);
   if(u>=st&&u<ac)prTag(c,'WIND-UP',80,gy-40,P.gold);if(u>=ac&&u<rc)prTag(c,'HIT',110,gy-40,P.red)}
  else{const a=u<.2?-1.2:u<.35?lerp(-1.2,.6,eo(seg(u,.2,.35))):lerp(.6,-1.2,ease(seg(u,.35,.7)));
   striker(c,60,gy,{arm:a,dx:u>=.2&&u<.35?8:0});prDummy(c,110,gy,u>=.2&&u<.4?Math.sin((u-.2)*40)*.25:0,u>=.2&&u<.25);
   if(u>=.2&&u<.35)prTag(c,'instant',80,gy-40,P.red)}})}};
/* ACT-19 active hit window only */
DEMOS['ACT-19']={d:5,f:(c,t)=>{const u=prWrap(t),st=.18,ac=.42,ae=.58,rc=.85;
 const arm=u<st?-1.3:u<ac?lerp(-1.3,-2.2,ease(seg(u,st,ac))):u<ae?lerp(-2.2,.5,eo(seg(u,ac,ae))):lerp(.5,-1.3,ease(seg(u,ae,rc)));
 const active=u>=ac&&u<ae;
 prLane(c,0,'SWORD VISIBLE',P.gold,gy=>{fBar(c,30,gy-6,180,u,[[st,ac,P.gold],[ac,ae,P.red],[ae,rc,'#5e636e']]);striker(c,70,gy,{dx:active?6:0,arm});
  prDummy(c,120,gy,active?Math.sin((u-ac)*50)*.3:0,active&&u<ac+.04);txt(c,active?'ACTIVE HIT':'swing only',160,gy-30,active?P.red:'#9aa6b8',5)});
 prLane(c,1,'HITBOX',P.cyan,gy=>{striker(c,70,gy,{dx:active?6:0,arm});if(active){R(c,88,gy-18,28,10,'rgba(224,74,58,.35)');prDash(c,88,gy-18,28,10,P.red);prTag(c,'ON',102,gy-30,P.red)}
  else{prDash(c,88,gy-18,28,10,'#5e636e');txt(c,'off',102,gy-30,'#9aa6b8',5)}prDummy(c,120,gy,active?Math.sin((u-ac)*50)*.3:0,0)})}};
/* ACT-20 recovery / endlag locks actions */
DEMOS['ACT-20']={d:5,f:(c,t)=>{const u=prWrap(t),ac=.3,ae=.42,rc=.85;
 const arm=u<ac?lerp(-1.3,.5,eo(seg(u,.18,ac))):u<ae?.5:lerp(.5,-1.3,ease(seg(u,ae,rc)));
 const recovering=u>=ae&&u<rc;
 prLane(c,0,'AFTER MISS',P.gold,gy=>{fBar(c,30,gy-6,180,u,[[.18,ac,P.gold],[ac,ae,P.red],[ae,rc,'#8a8f99']]);striker(c,70,gy,{arm,dx:u>=ac&&u<ae?8:0});
  if(recovering){prTag(c,'ENDLAG',100,gy-40,P.gold);bar(c,80,gy-32,40,3,1-seg(u,ae,rc),P.gold);txt(c,'no dodge / attack',120,gy-22,'#cfd8e3',5)}
  if(u>=.5&&u<.65){prTag(c,'input',160,gy-40,P.red);txt(c,'blocked',160,gy-28,P.red,5)}});
 prLane(c,1,'UNLOCKED',P.cyan,gy=>{const free=u>=rc;striker(c,70,gy,{arm:free?-1.2:arm});if(free){prWalker(c,130,gy,u*4,{s:1.5});prTag(c,'can act',130,gy-28,P.cyan)}
  else{prDash(c,118,gy-22,24,22,'#5e636e');txt(c,'locked',130,gy-30,'#9aa6b8',5)}})}};
/* ACT-22 hitstun: defender action-locked after hit */
DEMOS['ACT-22']={d:5,f:(c,t)=>{const u=prWrap(t),hit=.28,stun=.45;
 prLane(c,0,'ATTACKER FREE',P.cyan,gy=>{const sw=seg(u,.18,hit),r=seg(u,hit+.08,.4);striker(c,70,gy,{dx:eo(sw)*8*(1-ease(r)),arm:lerp(lerp(-1.3,.6,eo(sw)),-1.3,ease(r))});
  if(u>hit+.1){prWalker(c,50,gy,(u-hit)*6,{s:1.4});prTag(c,'can move',50,gy-28,P.cyan)}});
 prLane(c,1,'HITSTUN',P.gold,gy=>{const push=eo(seg(u,hit,hit+.1));const fx=104+push*18;const stunned=u>hit&&u<hit+stun;
  shadow(c,fx,gy,6);spr(c,'foe',fx,gy,{sx:2,sy:2,flash:u>hit&&u<hit+.05?1:0,flip:true});
  if(stunned){for(let j=0;j<3;j++){const a=u*28+j*TAU/3;R(c,fx+Math.cos(a)*7-1,gy-24+Math.sin(a)*2-1,2,2,P.gold)}bar(c,fx-12,gy-32,24,3,1-seg(u,hit,hit+stun),P.gold);prTag(c,'LOCKED',fx,gy-42,P.gold)}
  tree(c,200,gy,Math.sin(u*8)*2);txt(c,'world ticks',190,gy-50,'#cfd8e3',5)})}};
/* ACT-23 blockstun: successful block still locks guard */
DEMOS['ACT-23']={d:5,f:(c,t)=>{const u=prWrap(t),hit=.3,stun=.4;
 prLane(c,0,'STRIKE',P.gold,gy=>{const sw=seg(u,.2,hit),r=seg(u,hit+.05,.45);striker(c,70,gy,{dx:eo(sw)*8*(1-ease(r)),arm:lerp(lerp(-1.3,.5,eo(sw)),-1.3,ease(r))});
  if(u>=hit&&u<hit+.08)burst(c,100,gy-12,(u-hit)*8,6,3,{speed:30,life:.4,col:P.cyan})});
 prLane(c,1,'BLOCKSTUN',P.cyan,gy=>{const locked=u>=hit&&u<hit+stun;shadow(c,120,gy,6);spr(c,'foe',120,gy,{sx:2,sy:2,flip:true});
  R(c,108,gy-18,6,14,locked?P.cyan:'#5e636e');R(c,106,gy-20,10,3,locked?P.cyan:'#5e636e');
  if(locked){bar(c,108,gy-32,24,3,1-seg(u,hit,hit+stun),P.cyan);prTag(c,'GUARD LOCK',120,gy-42,P.cyan);txt(c,'no punish yet',120,gy-22,'#cfd8e3',5)}
  if(u>hit+stun)prTag(c,'free',120,gy-40,P.gold)})}};
/* ACT-24 cancel: dodge replaces remaining recovery */
DEMOS['ACT-24']={d:5,f:(c,t)=>{const u=prWrap(t);
 prLane(c,0,'FULL RECOVER',P.red,gy=>{const arm=u<.25?lerp(-1.3,.5,eo(seg(u,.12,.25))):u<.4?.5:lerp(.5,-1.3,ease(seg(u,.4,.85)));
  striker(c,80,gy,{arm,dx:u>=.25&&u<.4?8:0});fBar(c,40,gy-6,160,u,[[.12,.25,P.gold],[.25,.4,P.red],[.4,.85,'#5e636e']]);if(u>.4&&u<.85)prTag(c,'stuck in recover',120,gy-36,P.red)});
 prLane(c,1,'CANCEL → DODGE',P.cyan,gy=>{const cancel=u>=.42;if(!cancel){const arm=u<.25?lerp(-1.3,.5,eo(seg(u,.12,.25))):u<.4?.5:lerp(.5,-.2,ease(seg(u,.4,.42)));striker(c,80,gy,{arm,dx:u>=.25&&u<.4?8:0})}
  else{const k=seg(u,.42,.7),x=lerp(80,150,eo(k)),al=k>.85?1-seg(u,.7,.85):1;shadow(c,x,gy,5,.2);prWalker(c,x,gy,0,{s:1.5,still:1,alpha:al,sy:.85+Math.sin(k*Math.PI)*.15});if(u<.7)prTag(c,'DODGE',x,gy-28,P.cyan)}
  fBar(c,40,gy-6,160,Math.min(u,.42),[[.12,.25,P.gold],[.25,.4,P.red],[.4,.42,P.cyan]]);if(u>=.4&&u<.55)prTag(c,'cancel',100,gy-40,P.cyan)})}};
/* ACT-25 cancel window: early input ignored, later allowed */
DEMOS['ACT-25']={d:6,f:(c,t)=>{const u=prWrap(t),winA=.55,winB=.75;
 const arm=u<.3?lerp(-1.3,.5,eo(seg(u,.15,.3))):u<.42?.5:lerp(.5,-1.3,ease(seg(u,.42,.9)));
 prLane(c,0,'EARLY INPUT',P.red,gy=>{fBar(c,30,gy-6,180,u,[[.15,.3,P.gold],[.3,.42,P.red],[.42,.9,'#5e636e'],[winA,winB,'rgba(127,227,216,.85)']]);
  striker(c,70,gy,{arm,dx:u>=.3&&u<.42?8:0});if(u>=.35&&u<.5){prTag(c,'DODGE?',150,gy-40,P.gold);txt(c,'too early',150,gy-28,P.red,5)}});
 prLane(c,1,'IN WINDOW',P.cyan,gy=>{const can=u>=winA;fBar(c,30,gy-6,180,u,[[.15,.3,P.gold],[.3,.42,P.red],[.42,.9,'#5e636e'],[winA,winB,P.cyan]]);
  if(u<winA+.05)striker(c,70,gy,{arm,dx:u>=.3&&u<.42?8:0});
  else{const k=seg(u,winA,.85),x=lerp(70,140,eo(k));shadow(c,x,gy,5);prWalker(c,x,gy,0,{s:1.5,still:1,sy:.9});prTag(c,'CANCEL OK',x,gy-28,P.cyan)}
  if(u>=winA&&u<winB)txt(c,'window',120,gy-40,P.cyan,5)})}};
/* ACT-26 frame advantage +/- after contact */
DEMOS['ACT-26']={d:6,f:(c,t)=>{const u=prWrap(t);
 const show=(plus)=>{const hit=.25,atkFree=plus?.55:.72,defFree=plus?.72:.55;
  prLane(c,plus?1:0,plus?'PLUS (+)':'MINUS (−)',plus?P.cyan:P.red,gy=>{
   const sw=seg(u,.15,hit),r=seg(u,hit,.4);striker(c,60,gy,{dx:eo(sw)*6*(1-ease(r)),arm:lerp(lerp(-1.3,.5,eo(sw)),-1.3,ease(r))});
   const stun=u>hit&&u<defFree,fx=110+(u>hit?eo(seg(u,hit,hit+.08))*10:0);
   shadow(c,fx,gy,5);spr(c,'foe',fx,gy,{sx:2,sy:2,flip:true,flash:u>hit&&u<hit+.04?1:0});
   const aFree=u>=atkFree,dFree=u>=defFree;
   R(c,40,gy-6,70,4,'#1d2533');R(c,40,gy-6,70*clamp((u-hit)/(atkFree-hit)),4,plus?P.cyan:P.red);txt(c,'atk',38,gy-4,'#cfd8e3',5,'right');
   R(c,130,gy-6,70,4,'#1d2533');R(c,130,gy-6,70*clamp((u-hit)/(defFree-hit)),4,P.gold);txt(c,'def',202,gy-4,'#cfd8e3',5,'left');
   if(aFree&&!dFree)prTag(c,'FREE FIRST',60,gy-36,plus?P.cyan:P.red);
   if(dFree&&!aFree)prTag(c,'FREE FIRST',fx,gy-36,P.gold);
   if(stun){for(let j=0;j<2;j++)R(c,fx+Math.cos(u*20+j)*6,gy-22,2,2,P.gold)}})};
 show(0);show(1)}};
/* ACT-27 i-frames: roll passes through strike */
DEMOS['ACT-27']={d:5,f:(c,t)=>{const u=prWrap(t);
 prLane(c,0,'NO I-FRAMES',P.red,gy=>{const sw=seg(u,.35,.48);striker(c,50,gy,{dx:eo(sw)*10*(1-seg(u,.48,.7)),arm:lerp(lerp(-1.3,.6,eo(sw)),-1.3,ease(seg(u,.55,.8)))});
  const x=lerp(160,70,ease(seg(u,.2,.7)));shadow(c,x,gy,5);prWalker(c,x,gy,u*4,{s:1.5,flip:1});
  if(u>=.45&&u<.65){prTag(c,'HIT',x,gy-30,P.red);spr(c,'hero',x,gy,{sx:1.5,sy:1.5,flash:u<.5?1:0,flip:1})}});
 prLane(c,1,'I-FRAMES',P.cyan,gy=>{const sw=seg(u,.35,.48);striker(c,50,gy,{dx:eo(sw)*10*(1-seg(u,.48,.7)),arm:lerp(lerp(-1.3,.6,eo(sw)),-1.3,ease(seg(u,.55,.8)))});
  const roll=u>=.25&&u<.7,x=lerp(160,70,ease(seg(u,.2,.7))),ifr=u>=.35&&u<.6;
  shadow(c,x,gy,5);if(roll){c.save();c.translate(x,gy-6);c.rotate(seg(u,.25,.7)*TAU);spr(c,'hero',0,6,{sx:1.5,sy:1.5,flip:1,alpha:ifr?.55:1});c.restore()}
  else prWalker(c,x,gy,0,{s:1.5,flip:1});
  if(ifr){prDash(c,x-10,gy-22,20,22,P.cyan);prTag(c,'INVULN',x,gy-34,P.cyan);R(c,70,gy-16,20,8,'rgba(224,74,58,.25)')}})}};
/* ACT-28 super armor: hit doesn't interrupt heavy attack */
DEMOS['ACT-28']={d:5,f:(c,t)=>{const u=prWrap(t),hit=.4;
 prLane(c,0,'NO ARMOR',P.red,gy=>{const interrupted=u>=hit;const sw=seg(u,.2,hit);if(!interrupted)striker(c,80,gy,{dx:eo(sw)*6,arm:lerp(-1.4,.2,eo(sw)),cr:.3});
  else{const k=seg(u,hit,.7);shadow(c,80+k*20,gy,6);spr(c,'hero',80+k*20,gy,{sx:2,sy:2,flash:u<hit+.06?1:0});for(let j=0;j<3;j++)R(c,90+k*20+Math.cos(u*20+j)*6,gy-24,2,2,P.gold)}
  spr(c,'foe',130,gy,{sx:1.8,sy:1.8,flip:true});if(u>=.3&&u<hit){c.save();c.translate(125,gy-12);c.rotate(-.5);R(c,0,-1,14,2,'#e9edf2');c.restore()}
  if(interrupted)prTag(c,'STUNNED',100,gy-40,P.red)});
 prLane(c,1,'SUPER ARMOR',P.cyan,gy=>{const sw=seg(u,.2,.55),r=seg(u,.6,.9);striker(c,80,gy,{dx:eo(sw)*10*(1-ease(r)),arm:lerp(lerp(-1.5,.7,eo(sw)),-1.3,ease(r)),cr:u<.55?.4:0});
  spr(c,'foe',130,gy,{sx:1.8,sy:1.8,flip:true});if(u>=.3&&u<hit+.1){c.save();c.translate(125,gy-12);c.rotate(-.5);R(c,0,-1,14,2,'#e9edf2');c.restore()}
  if(u>=hit&&u<.7){prTag(c,'ARMOR',80,gy-42,P.cyan);bar(c,70,gy-34,28,3,.7,P.cyan);txt(c,'HP−',100,gy-34,P.red,5);R(c,78,gy-28,4,4,u<hit+.08?'#fff':P.red)}
  if(u>=.55&&u<.75){prDummy(c,130,gy,Math.sin((u-.55)*40)*.4,u<.58);prTag(c,'continues',130,gy-40,P.gold)}})}};
/* ACT-32 animation blend / crossfade stand→walk */
DEMOS['ACT-32']={d:5,f:(c,t)=>{const u=prWrap(t),w=ease(seg(u,.25,.55)),back=ease(seg(u,.75,.95)),blend=w*(1-back);
 prLane(c,0,'POP CUT',P.red,gy=>{const walk=blend>.5;shadow(c,80,gy,7);prWalker(c,80,gy,walk?u*8:0,{s:2,still:!walk});
  prTag(c,walk?'walk':'stand',80,gy-32,P.red);R(c,140,gy-40,70,8,'#1d2533');R(c,140,gy-40,blend>.5?70:0,8,P.red);txt(c,'weight',138,gy-36,'#cfd8e3',5,'right')});
 prLane(c,1,'CROSSFADE',P.cyan,gy=>{shadow(c,80,gy,7);prWalker(c,80,gy,u*8*blend,{s:2,still:blend<.05,amp:1.5*blend,sy:1+blend*.02});
  R(c,140,gy-40,70,8,'#1d2533');R(c,140,gy-40,70*blend,8,P.cyan);txt(c,'stand',140,gy-48,'#9aa6b8',5,'left');txt(c,'walk',210,gy-48,P.cyan,5,'right');
  prTag(c,'blend '+blend.toFixed(2),80,gy-32,P.cyan)})}};
/* ACT-33 blend space: speed selects walk/run samples */
DEMOS['ACT-33']={d:6,f:(c,t)=>{const u=prWrap(t),spd=prTri(u);
 R(c,0,0,W,H,P.sky);const gy=100;R(c,0,gy,W,35,P.dirtD);R(c,0,gy,W,3,P.grass);tree(c,30,gy);tree(c,200,gy);
 const x=lerp(40,200,u),ph=u*(4+spd*8);shadow(c,x,gy,7);prWalker(c,x,gy,ph,{s:2,amp:1+spd*1.5,sy:1+spd*.05});
 R(c,40,16,160,10,'#1d2533');R(c,40,16,80,10,'rgba(127,227,216,.35)');R(c,120,16,80,10,'rgba(242,201,76,.35)');R(c,40+spd*160-2,14,4,14,'#fff');
 txt(c,'WALK',50,12,P.cyan,5,'left');txt(c,'RUN',190,12,P.gold,5,'right');
 prTag(c,'speed '+spd.toFixed(2),120,30,'#e9edf2','rgba(10,14,24,.75)',6,'center');prTag(c,'1D blend space',4,H-12)}};
/* ACT-34 layers / bone mask: legs locomote, upper reloads */
DEMOS['ACT-34']={d:5,f:(c,t)=>{const u=prWrap(t),x=lerp(40,190,u);
 prLane(c,0,'FULL BODY',P.red,gy=>{shadow(c,x,gy,7);const reload=u>.3&&u<.7;prWalker(c,x,gy,reload?0:u*8,{s:2,still:!!reload});
  if(reload){c.save();c.translate(x+6,gy-14);c.rotate(-.8+Math.sin(u*40)*.1);R(c,0,-1,10,2,P.stone);c.restore();prTag(c,'legs stop',x,gy-34,P.red)}});
 prLane(c,1,'MASKED LAYERS',P.cyan,gy=>{shadow(c,x,gy,7);prWalker(c,x,gy,u*8,{s:2});
  const reload=u>.3&&u<.7;if(reload){c.save();c.translate(x+6,gy-14);c.rotate(-1+seg(u,.3,.5)*1.2);R(c,0,-1,10,2,P.gold);R(c,8,-2,3,4,P.woodD);c.restore();
   R(c,x-6,gy-20,12,10,'rgba(242,201,76,.2)');R(c,x-4,gy-2,10,4,'rgba(127,227,216,.25)');prTag(c,'upper:reload',x+20,gy-34,P.gold);txt(c,'legs:run',x+20,gy-24,P.cyan,5)}});
}};
/* ACT-35 additive: recoil layered on base gait */
DEMOS['ACT-35']={d:5,f:(c,t)=>{const u=prWrap(t),x=lerp(50,180,u),kick=u>.4&&u<.55;
 prLane(c,0,'BASE ONLY',P.cyan,gy=>{shadow(c,x,gy,7);prWalker(c,x,gy,u*8,{s:2});txt(c,'run cycle',x,gy-30,'#cfd8e3',5)});
 prLane(c,1,'BASE + ADDITIVE',P.gold,gy=>{const rec=kick?Math.sin(seg(u,.4,.55)*Math.PI)*6:0;shadow(c,x,gy,7);
  c.save();c.translate(x,gy);c.rotate(-rec*.04);prWalker(c,0,0,u*8,{s:2});if(rec>0){R(c,4,-16-rec,8,3,P.gold);burst(c,8,-14,(u-.4)*6,5,2,{speed:20,life:.35,col:P.orange})}
  c.restore();if(kick)prTag(c,'+ recoil',x+16,gy-36,P.gold);txt(c,'additive pose',x,gy-24,'#cfd8e3',5)})}};
/* ACT-36 IK vs FK */
DEMOS['ACT-36']={d:6,f:(c,t)=>{const u=prWrap(t);
 prLane(c,0,'FK',P.gold,gy=>{const sh=100,sy=gy-28,a1=lerp(-.6,.9,ease(prTri(u))),a2=lerp(.4,1.2,ease(prTri(u+.2)));
  const e1x=sh+Math.cos(a1)*16,e1y=sy+Math.sin(a1)*16,hx=e1x+Math.cos(a1+a2)*14,hy=e1y+Math.sin(a1+a2)*14;
  shadow(c,80,gy,6);spr(c,'hero',80,gy,{sx:2,sy:2});prLine(c,sh,sy,e1x,e1y,'#e9edf2',2);prLine(c,e1x,e1y,hx,hy,P.gold,2);
  circ(c,sh,sy,2,P.cyan);circ(c,e1x,e1y,2,P.cyan);circ(c,hx,hy,3,P.gold);txt(c,'joint angles → tip',150,gy-40,'#cfd8e3',5);
  R(c,170,lerp(gy-40,gy-10,prTri(u))-2,8,4,P.wood);txt(c,'handle',174,gy-48,'#9aa6b8',5)});
 prLane(c,1,'IK',P.cyan,gy=>{const sh=100,sy=gy-28,tx=178,ty=lerp(gy-40,gy-10,prTri(u));
  const dx=tx-sh,dy=ty-sy,dist=Math.min(Math.hypot(dx,dy),28),L1=16,L2=14;
  const cosA=clamp((L1*L1+dist*dist-L2*L2)/(2*L1*dist),-1,1),ang=Math.atan2(dy,dx),a1=ang-Math.acos(cosA);
  const e1x=sh+Math.cos(a1)*L1,e1y=sy+Math.sin(a1)*L1;
  shadow(c,80,gy,6);spr(c,'hero',80,gy,{sx:2,sy:2});prLine(c,sh,sy,e1x,e1y,'#e9edf2',2);prLine(c,e1x,e1y,tx,ty,P.cyan,2);
  circ(c,sh,sy,2,P.gold);circ(c,e1x,e1y,2,P.gold);circ(c,tx,ty,3,P.cyan);R(c,tx-4,ty-2,8,4,P.wood);prDash(c,tx-6,ty-6,12,12,P.cyan);txt(c,'solve → target',140,gy-48,P.cyan,5)})}};
/* ACT-37 motion warp: same lunge retargets root travel */
DEMOS['ACT-37']={d:5,f:(c,t)=>{const u=prWrap(t),k=ease(seg(u,.2,.55)),back=ease(seg(u,.75,.95));
 prLane(c,0,'AUTHORED',P.gold,gy=>{const cx=lerp(lerp(50,110,k),50,back);prDash(c,cx-8,gy-20,16,20,P.gold);shadow(c,cx,gy,6);prWalker(c,cx,gy,0,{s:1.8,still:1});
  spr(c,'foe',150,gy,{sx:1.8,sy:1.8,flip:true});txt(c,'fixed end',110,gy-30,'#cfd8e3',5);R(c,108,gy-2,4,2,P.gold)});
 prLane(c,1,'WARPED',P.cyan,gy=>{const tgt=u<.5?170:130;const cx=lerp(lerp(50,tgt-20,k),50,back);prDash(c,cx-8,gy-20,16,20,P.cyan);shadow(c,cx,gy,6);prWalker(c,cx,gy,0,{s:1.8,still:1});
  spr(c,'foe',tgt,gy,{sx:1.8,sy:1.8,flip:true});if(k>0&&k<1){prLine(c,50,gy-26,cx,gy-26,P.cyan,1,[2,2]);prTag(c,'warp window',(50+cx)/2,gy-36,P.cyan)}
  txt(c,'retarget '+tgt,tgt,gy-30,P.cyan,5)})}};
/* ACT-38 anim event / notify: footstep + trail state */
DEMOS['ACT-38']={d:5,f:(c,t,_w,_h,p)=>{const u=prWrap(t),x=lerp(40,200,u),ph=u*6,foot=(Math.sin(ph*TAU)>0.92);
 R(c,0,0,W,90,P.sky);const gy=78;R(c,0,gy,W,12,P.dirtD);R(c,0,gy,W,3,P.grass);shadow(c,x,gy,6);prWalker(c,x,gy,ph,{s:2});
 if(foot){circ(c,x+(Math.cos(ph*TAU)>0?4:-4),gy-1,3,P.gold);prTag(c,'FOOTSTEP',x,gy-28,P.gold);burst(c,x,gy,(u*p.dur)%1*.15,4,5,{speed:12,life:.25,col:P.dirt})}
 /* swing notify-state trail */
 const sw=seg(u,.35,.55),trail=u>=.4&&u<.62;c.save();c.translate(x+8,gy-12);c.rotate(lerp(-1.5,.6,eo(sw)));
 if(trail){for(let i=0;i<5;i++){c.globalAlpha=.15+i*.12;R(c,i*2,-1-i,12,2,P.cyan)}c.globalAlpha=1}R(c,0,-1,14,2,'#e9edf2');c.restore();
 if(trail)prTag(c,'TRAIL ON',x+30,gy-40,P.cyan);
 R(c,0,92,W,43,'#141a24');fBar(c,20,110,200,u,[[0,1,'#2a3344']]);
 const marks=[[.08,'step'],[.25,'step'],[.4,'trail+'],[.62,'trail−'],[.75,'step'],[.92,'step']];
 for(const[m,lab]of marks){R(c,20+m*200,108,2,8,lab[0]==='t'?P.cyan:P.gold);if(Math.abs(u-m)<.04)txt(c,lab,20+m*200,102,lab[0]==='t'?P.cyan:P.gold,5)}
 txt(c,'point notify',20,124,P.gold,5,'left');txt(c,'notify state',220,124,P.cyan,5,'right')}};
})();
