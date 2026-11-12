/* ===== Nintendo-inspired movement & ability demos (ACT-49..57, FB-34..38, ENV-22) ===== */
(()=>{
const GY=100;
const nTag=(c,s,x,y,col='#e9edf2',size=6,align='center')=>prTag(c,s,x,y,col,'rgba(10,14,24,.8)',size,align);
const nLine=(c,x0,y0,x1,y1,col,w=2)=>{c.save();c.strokeStyle=col;c.lineWidth=w;c.lineCap='round';c.beginPath();c.moveTo(x0,y0);c.lineTo(x1,y1);c.stroke();c.restore()};
const nStar=(c,x,y,r,col,n=5,rot=0)=>{c.fillStyle=col;c.beginPath();for(let j=0;j<n*2;j++){const a=rot+j*Math.PI/n-Math.PI/2,rr=j%2?r*.42:r;c.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr)}c.closePath();c.fill()};
const nGlow=(c,x,y,o,col,a)=>{if(a<=0)return;for(const[dx,dy]of[[-1,0],[1,0],[0,-1],[0,1]])prWalker(c,x+dx,y+dy,0,Object.assign({},o,{still:1,alpha:a,flash:1}));};
const nSlab=(c,x,y,w,h)=>{R(c,x,y,w,h,P.stone);R(c,x,y,w,2,'#a3a8b1');R(c,x,y+h-2,w,2,P.stoneD);for(let i=0;i<w;i+=12)R(c,x+i+((y/4)%2?6:0),y+2,1,h-4,P.stoneD)};
const nHat=(c,x,y,col=P.red,s=1)=>{c.fillStyle=col;c.beginPath();c.ellipse(x,y,5*s,2.2*s,0,Math.PI,0);c.fill();R(c,x-6*s,y-.5,12*s,1.5*s,col);R(c,x-2*s,y-4*s,3*s,1.5*s,'#fff')};
const nDots=(c,pts,col,step=1)=>{for(let i=0;i<pts.length;i+=step)R(c,pts[i][0]-.5,pts[i][1]-.5,1,1,col)};
const nSky=(c,top='#1b2547',bot='#3b4a7a')=>{const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,top);g.addColorStop(1,bot);c.fillStyle=g;c.fillRect(0,0,W,H);for(let i=0;i<40;i++)R(c,hash(i+3)*W,hash(i+70)*H,1,1,i%5?'#9fb0d8':'#fff')};
const nPlanet=(c,x,y,r)=>{circ(c,x,y,r+1,P.ink);circ(c,x,y,r,P.grass);circ(c,x-r*.2,y-r*.2,r*.78,P.grass2);for(let i=0;i<6;i++){const a=hash(i+x)*TAU;R(c,x+Math.cos(a)*r*.5,y+Math.sin(a)*r*.5,2,2,P.grassD)}};

/* ACT-49 phase-through: press ability under a ceiling, rise through it, surface on top */
DEMOS['ACT-49']={d:6,f:(c,t)=>{const u=prWrap(t);prSide(c,120,67,{props:false});
 const SY=54,SH=14,SX=70,SW=100;
 const aim=u>=.12&&u<.24, go=u>=.24&&u<.62, top=u>=.62&&u<.92;
 nSlab(c,SX,SY,SW,SH);R(c,SX+30,SY-8,14,8,P.wood);R(c,SX+30,SY-8,14,1,P.woodD);
 let hy=GY,hx=112,al=1;
 if(go){const q=ease(seg(u,.24,.62));hy=lerp(GY,SY,q)}else if(top){hy=SY}else if(u>=.92){const q=seg(u,.92,1);hy=lerp(SY,SY-30,q);hx=lerp(112,150,q);al=1-q}
 if(aim){const a=.5+.5*Math.sin(u*120);c.save();c.globalAlpha=.35+.4*a;c.strokeStyle=P.cyan;c.setLineDash([3,2]);c.strokeRect(SX+.5,SY+.5,SW-1,SH-1);c.restore();prLine(c,hx,GY-20,hx,SY+SH+1,P.cyan,1,[2,2]);nTag(c,'ASCEND?',hx,GY-46,P.cyan,6)}
 if(go){const q=seg(u,.24,.62);
  // inside the slab: draw a silhouette behind translucent stone
  shadow(c,hx,GY,6,.2*(1-q));
  c.save();c.globalAlpha=.85;prWalker(c,hx,hy,0,{s:1.8,still:1,flash:.6});c.restore();
  c.save();c.globalAlpha=.55;nSlab(c,SX,SY,SW,SH);c.restore();
  const rp=(k)=>{for(let i=0;i<2;i++){const r=(k*14+i*5)%14;c.save();c.globalAlpha=1-r/14;c.strokeStyle=P.cyan;c.lineWidth=1;c.beginPath();c.ellipse(hx,SY+SH,4+r,1.5+r*.2,0,0,TAU);c.stroke();c.restore()}};
  if(q<.5)rp(q*4);
  if(q>.6){for(let i=0;i<2;i++){const r=((q-.6)*30+i*5)%14;c.save();c.globalAlpha=1-r/14;c.strokeStyle=P.cyan;c.lineWidth=1;c.beginPath();c.ellipse(hx,SY,4+r,1.5+r*.2,0,0,TAU);c.stroke();c.restore()}}
  for(let i=0;i<5;i++){const y=hy-4+((u*300+i*7)%14);R(c,hx-9+i*4,y,1,3,'rgba(127,227,216,.7)')}
  nTag(c,'PASS THROUGH',hx,22,P.cyan,6)}
 else{shadow(c,hx,hy,6);prWalker(c,hx,hy,0,{s:1.8,still:1,alpha:al})}
 if(top&&u<.72){burst(c,hx,SY-2,(u-.62)*2,12,49,{speed:40,life:.35,col:(l,i)=>i%2?P.cyan:'#fff'});nTag(c,'SURFACE',hx,SY-38,'#e9edf2',6)}
 sBtnN(c,16,16,'Y',aim||go);
 nTag(c,'ASCEND THROUGH CEILING',236,3,P.gold,7,'right')}};
function sBtnN(c,x,y,s,on){circ(c,x,y,7,P.ink);circ(c,x,y,6,on?P.cyan:'#2b3446');txt(c,s,x,y+.5,on?P.ink:'#9aa6b8',6,'center')}

/* ACT-50 wall merge: step into a wall, slide along it as a flat painting, pop out at the far end */
DEMOS['ACT-50']={d:7,f:(c,t)=>{const u=prWrap(t);prSide(c,120,67,{props:false});
 const WX=40,WW=160,WY=40,WH=60;
 R(c,WX,WY,WW,WH,P.wall);R(c,WX,WY,WW,3,P.wallD);for(let y=WY+8;y<GY;y+=9){R(c,WX,y,WW,1,P.wallD);for(let x=WX+((y/9)%2?6:0);x<WX+WW;x+=14)R(c,x,y,1,9,P.wallD)}
 const merged=u>=.2&&u<.76;let hx;
 if(u<.2)hx=lerp(20,52,ease(seg(u,0,.18)));else if(merged)hx=lerp(56,184,ease(seg(u,.26,.72)));else hx=lerp(188,222,ease(seg(u,.78,.96)));
 if(merged){const sq=seg(u,.2,.26),y=GY-6;
  // flat painted figure: drawn as an outlined 2D sprite inside the wall
  for(let i=1;i<4;i++)spr(c,'hero',hx-i*7,y,{sx:1.8,sy:1.8,sil:'#d9b88a',alpha:.5-i*.12});
  for(const[dx,dy]of[[-1,0],[1,0],[0,-1],[0,1]])spr(c,'hero',hx+dx,y+dy,{sx:1.8,sy:1.8,sil:'#55361f'});
  spr(c,'hero',hx,y,{sx:1.8*lerp(1,1.1,sq),sy:1.8,tint:'#b9925e',tintA:.45});
  prLine(c,hx-12,GY-1,hx+12,GY-1,'rgba(85,54,31,.6)',1,[2,2]);
  if(u<.3)burst(c,56,GY-10,(u-.2)*3,10,7,{speed:30,life:.3,col:'#fff6c8'});
  bar(c,92,124,56,4,1-seg(u,.26,.76),P.cyan);txt(c,'ENERGY',120,118,'#e9edf2',5);
  nTag(c,'IN WALL: FLAT',120,8,P.gold,6)}
 else{shadow(c,hx,GY,6);prWalker(c,hx,GY,u*14,{s:1.8,still:u>.96})}
 if(u>=.76&&u<.84){burst(c,190,GY-10,(u-.76)*3,10,17,{speed:34,life:.3,col:'#fff6c8'});nTag(c,'POP OUT',192,GY-44,'#e9edf2',6)}
 if(u<.2&&u>.1)nTag(c,'MERGE',52,GY-44,P.cyan,6);
 nTag(c,'WALL MERGE',236,3,P.gold,7,'right')}};

/* ACT-51 planetoid gravity: walk all the way round a small planet; down always points at its centre */
DEMOS['ACT-51']={d:6,f:(c,t)=>{const u=prWrap(t);nSky(c);
 const cx=110,cy=70,r=30;nPlanet(c,cx,cy,r);nPlanet(c,206,30,10);
 // tiny tree on the planet
 c.save();c.translate(cx,cy);c.rotate(-.9);tree(c,0,-r+1,0);c.restore();
 const a=u*TAU-Math.PI/2;const fx=cx+Math.cos(a)*r,fy=cy+Math.sin(a)*r;
 for(let i=0;i<8;i++){const b=i*TAU/8,k=(u*3+i/8)%1;const x0=cx+Math.cos(b)*(r+22-k*14),y0=cy+Math.sin(b)*(r+22-k*14);c.globalAlpha=.35;nLine(c,x0,y0,cx+Math.cos(b)*(r+14-k*14),cy+Math.sin(b)*(r+14-k*14),P.cyan,1);c.globalAlpha=1}
 c.save();c.translate(fx,fy);c.rotate(a+Math.PI/2);c.fillStyle='rgba(0,0,0,.35)';c.beginPath();c.ellipse(0,0,6,2,0,0,TAU);c.fill();prWalker(c,0,0,u*24,{s:1.6});c.restore();
 // gravity arrow from hero to centre
 const ax=fx+Math.cos(a)*-8,ay=fy+Math.sin(a)*-8;prLine(c,lerp(fx,cx,.25),lerp(fy,cy,.25),lerp(fx,cx,.7),lerp(fy,cy,.7),P.gold,1,[2,2]);circ(c,cx,cy,2,P.gold);
 nTag(c,'DOWN = CENTRE',cx,cy+r+12,P.gold,6);
 nTag(c,'PLANETOID GRAVITY',236,3,P.gold,7,'right')}};

/* ACT-52 launch star: step in, star spins up, fly a fixed arc to the next planet */
DEMOS['ACT-52']={d:6,f:(c,t)=>{const u=prWrap(t);nSky(c);
 const A=[44,98,22],B=[196,82,18];nPlanet(c,...A);nPlanet(c,...B);
 const sx=60,sy=66;const spin=u<.2?u*4:u<.32?.8+(u-.2)*60:u*4;
 const path=[];for(let i=0;i<=40;i++){const q=i/40;path.push([lerp(sx,B[0],q),lerp(sy,B[1]-B[2],q)-60*Math.sin(q*Math.PI)])}
 c.globalAlpha=.45;nDots(c,path,'#fff6c8',2);c.globalAlpha=1;
 const pull=u>=.2&&u<.32;nStar(c,sx,sy,pull?9:8,P.gold,5,spin);nStar(c,sx,sy,4,'#fff6c8',5,spin);
 let hx,hy,rot=0,show=1;
 if(u<.12){hx=lerp(40,sx,ease(seg(u,0,.12)));hy=A[1]-A[2]}else if(u<.32){const q=seg(u,.12,.2);hx=sx;hy=lerp(A[1]-A[2],sy+5,ease(q));if(pull){rot=(u-.2)*60}}
 else if(u<.7){const q=ease(seg(u,.32,.7));const i=Math.min(39,Math.floor(q*40));const f=q*40-i;hx=lerp(path[i][0],path[i+1][0],f);hy=lerp(path[i][1],path[i+1][1],f)+5;rot=u*40;
  for(let j=1;j<7;j++){const qq=Math.max(0,q-j*.025),k=Math.min(39,Math.floor(qq*40));R(c,path[k][0]-1,path[k][1]+3-1,2,2,j%2?P.gold:'#fff')}
  nTag(c,'FIXED ARC',120,8,P.gold,6)}
 else{hx=B[0];hy=B[1]-B[2];if(u<.78)burst(c,hx,hy,(u-.7)*3,10,52,{speed:30,life:.3,col:P.gold})}
 c.save();c.translate(hx,hy);c.rotate(rot);prWalker(c,0,0,0,{s:1.6,still:1});c.restore();
 if(pull)nTag(c,'SPIN UP',sx,sy-28,'#e9edf2',6);
 nTag(c,'LAUNCH STAR',236,3,P.gold,7,'right')}};

/* ACT-53 possession: throw the cap, dive into the enemy, control it wearing the cap, then leave */
DEMOS['ACT-53']={d:8,f:(c,t)=>{const u=prWrap(t);prSide(c,120,67,{props:false});
 const cap=u>=.08&&u<.24, enter=u>=.24&&u<.34, ctl=u>=.34&&u<.82, out=u>=.82;
 let fx=150;if(ctl)fx=150-50*Math.sin(seg(u,.4,.8)*Math.PI)+ (u>.6?0:0);
 const hx=60;
 // enemy
 const ff=ctl?(u<.6?1:0):1;
 shadow(c,fx,GY,8);spr(c,'foe',fx,GY,{sx:1.8,sy:1.8,flip:ff,flash:enter?.6:0,tint:ctl?'#f2c94c':null,tintA:ctl?.18:0});
 if(ctl||enter){nHat(c,fx,GY-17,P.red,1);R(c,fx-6,GY-12,2,2,'#e9edf2');}
 if(ctl){// eyebrows marker + HUD
  R(c,fx-5,GY-12,3,1,P.ink);R(c,fx+2,GY-12,3,1,P.ink);
  nTag(c,'CAPTURED',fx,GY-44,P.gold,6);R(c,8,8,52,16,'rgba(10,14,24,.8)');spr(c,'foe',18,22,{sx:1.2,sy:1.2});nHat(c,18,11,P.red,.6);txt(c,'FOE MOVES',40,16,'#e9edf2',5)}
 // hero
 if(!enter&&!ctl){let hxx=hx;if(out){const q=seg(u,.82,.92);hxx=lerp(fx,fx-34,eo(q));const hy=GY-18*Math.sin(q*Math.PI);shadow(c,hxx,GY,6);prWalker(c,hxx,u>.92?GY:hy,0,{s:1.8,still:1})}else{shadow(c,hx,GY,6);prWalker(c,hx,GY,0,{s:1.8,still:1});if(!cap)nHat(c,hx,GY-18,P.red,.9)}}
 if(cap){const q=seg(u,.08,.24);const x=lerp(hx+8,fx,ease(q)),y=GY-16-8*Math.sin(q*Math.PI);c.save();c.translate(x,y);c.rotate(u*60);nHat(c,0,0,P.red,1);c.restore();prLine(c,hx+8,GY-16,x,y,'rgba(255,255,255,.35)',1,[2,2])}
 if(enter){const q=seg(u,.24,.34);for(let i=0;i<6;i++){const x=lerp(hx,fx,q*(.7+i*.05));R(c,x,GY-12+((i*3)%7)-3,4,1,P.cyan)}nTag(c,'POSSESS',(hx+fx)/2,GY-44,P.cyan,6)}
 if(out&&u<.92){burst(c,fx,GY-12,(u-.82)*3,10,5,{speed:30,life:.3,col:'#fff'});nTag(c,'LEAVE',fx,GY-44,'#e9edf2',6)}
 if(out){for(let i=0;i<3;i++){const a=u*30+i*TAU/3;nStar(c,fx+Math.cos(a)*7,GY-24+Math.sin(a)*2,2,P.gold)}}
 nTag(c,'POSSESSION',236,3,P.gold,7,'right')}};

/* ACT-54 cap jump: jump, throw the cap ahead, land on it in mid-air and spring higher onto a ledge */
DEMOS['ACT-54']={d:6,f:(c,t)=>{const u=prWrap(t);prSide(c,120,67,{props:false,plats:[[-2000,100,5000],[176,44,90]]});
 // pit marker: spikes between
 for(let x=104;x<170;x+=6){c.fillStyle=P.stoneD;c.beginPath();c.moveTo(x,GY);c.lineTo(x+3,GY-6);c.lineTo(x+6,GY);c.fill()}
 const capX=132,capY=70;let hx,hy,capOn=false,capA=0,sq=0;
 if(u<.1){hx=lerp(50,70,seg(u,0,.1));hy=GY}
 else if(u<.32){const q=seg(u,.1,.32);hx=lerp(70,118,q);hy=GY-44*Math.sin(q*Math.PI*.62)}
 else if(u<.46){const q=seg(u,.32,.46);hx=lerp(118,capX,q);hy=lerp(GY-44*Math.sin(Math.PI*.62),capY,q*q)}
 else if(u<.72){const q=seg(u,.46,.72);hx=lerp(capX,196,q);hy=lerp(capY,44,q)-36*Math.sin(q*Math.PI)}
 else{hx=196;hy=44}
 const thrown=u>=.24&&u<.52;
 if(thrown){const q=seg(u,.24,.32);const cx=u<.32?lerp(118,capX,eo(q)):capX,cy=u<.32?lerp(GY-38,capY+3,eo(q)):capY+3;
  sq=u>=.46&&u<.5?1-seg(u,.46,.5):0;c.save();c.translate(cx,cy);c.rotate(u<.46?u*80:0);c.scale(1+sq*.4,1-sq*.5);nHat(c,0,0,P.red,1.2);c.restore();
  if(u>=.32&&u<.46){ring(c,cx,cy,8+2*Math.sin(u*90),1,'rgba(255,255,255,.5)');nTag(c,'CAP HOVERS',cx,cy-30,'#e9edf2',6)}
  capOn=true}
 if(u>=.46&&u<.56){burst(c,capX,capY+2,(u-.46)*3,10,31,{speed:30,life:.3,col:(l,i)=>i%2?P.gold:'#fff'});nTag(c,'BOUNCE',capX,capY+10,P.gold,6)}
 shadow(c,hx,u>=.72?44:GY,5,.25);prWalker(c,hx,hy,u*12,{s:1.8,still:u>.1});
 if(!capOn&&u<.24)nHat(c,hx,hy-18,P.red,.9);
 if(u>=.72&&u<.9)nTag(c,'LEDGE REACHED',190,22,P.cyan,6);
 nTag(c,'CAP JUMP',236,3,P.gold,7,'right')}};

/* ACT-55 ground pound: mid-air spin pause, straight drop, impact ring breaks a crate; then a dive cancel */
DEMOS['ACT-55']={d:7,f:(c,t)=>{const u=prWrap(t);const A=u<.55,k=A?u/.55:(u-.55)/.45;
 let shx=0;if(A&&k>=.5&&k<.6)shx=Math.round(Math.sin(k*300)*2);c.save();c.translate(shx,0);
 prSide(c,120,67,{props:false});
 const bx=110;let hx=bx,hy=GY,rot=0,sx=1,sy=1;
 const crateBroken=A&&k>=.5;
 if(!crateBroken){R(c,bx-8,GY-14,16,14,P.wood);c.strokeStyle=P.woodD;c.lineWidth=1;c.strokeRect(bx-7.5,GY-13.5,15,13);nLine(c,bx-7,GY-13,bx+7,GY-1,P.woodD,1)}
 if(A){if(k<.25){const q=seg(k,0,.25);hx=lerp(70,bx,q);hy=GY-14-46*Math.sin(q*Math.PI/2)}else if(k<.4){hx=bx;hy=GY-60;rot=seg(k,.25,.4)*TAU;nTag(c,'SPIN',bx,GY-90,'#e9edf2',6)}else if(k<.5){const q=seg(k,.4,.5);hy=lerp(GY-60,GY,q*q);sy=1.15;sx=.9;for(let i=0;i<4;i++)nLine(c,bx-7+i*5,hy-30,bx-7+i*5,hy-44,'rgba(255,255,255,.6)',1)}else{hy=GY;if(k<.6){sx=1.3;sy=.75}}
  if(k>=.5&&k<.8){const q=seg(k,.5,.8);c.save();c.globalAlpha=1-q;ring(c,bx,GY-2,4+q*40,2,'#fff');c.restore();burst(c,bx,GY-6,(k-.5)*1.6,14,77,{speed:60,life:.45,grav:30,col:(l,i)=>i%2?P.wood:P.woodD,size:()=>3});burst(c,bx,GY,(k-.5)*1.6,10,9,{speed:30,life:.4,a0:Math.PI,spread:Math.PI,col:P.dirt});nTag(c,'IMPACT',bx,GY-48,P.gold,6)}}
 else{if(k<.25){const q=seg(k,0,.25);hx=lerp(60,90,q);hy=GY-55*Math.sin(q*Math.PI/2)}else if(k<.38){hx=90;hy=GY-55;rot=seg(k,.25,.38)*TAU}else if(k<.45){hx=90;hy=lerp(GY-55,GY-40,seg(k,.38,.45));sy=1.15}else if(k<.8){const q=seg(k,.45,.8);hx=lerp(90,190,q);hy=lerp(GY-40,GY,q)-10*Math.sin(q*Math.PI);rot=Math.PI/2;nTag(c,'DIVE CANCEL',140,22,P.cyan,6);for(let i=1;i<5;i++)R(c,hx-i*7,hy-8,4,1,'rgba(255,255,255,.5)')}else{hx=190;hy=GY;rot=0}
}
 shadow(c,hx,GY,6);c.save();c.translate(hx,hy-9);c.rotate(rot);c.scale(sx,sy);prWalker(c,0,9,0,{s:1.8,still:1});c.restore();
 if(!A&&k>=.38&&k<.5)nTag(c,'PRESS DURING DROP',90,GY-86,'#e9edf2',5);
 c.restore();
 nTag(c,A?'GROUND POUND':'GROUND POUND → DIVE',236,3,P.gold,7,'right')}};

/* ACT-56 hover: jump over a gap, puff up and drift slowly with flaps, exhale to drop onto the far side */
DEMOS['ACT-56']={d:6,f:(c,t)=>{const u=prWrap(t);prSide(c,120,67,{props:false,plats:[[-2000,100,2070],[170,100,2000]]});
 R(c,70,100,100,35,'#2a3550');for(let x=72;x<170;x+=6){c.fillStyle=P.stoneD;c.beginPath();c.moveTo(x,134);c.lineTo(x+3,124);c.lineTo(x+6,134);c.fill()}
 let hx,hy,puff=0;
 if(u<.14){hx=lerp(30,64,seg(u,0,.14));hy=GY}
 else if(u<.24){const q=seg(u,.14,.24);hx=lerp(64,84,q);hy=GY-30*Math.sin(q*Math.PI/2)}
 else if(u<.72){const q=seg(u,.24,.72);hx=lerp(84,168,q);hy=GY-30+4*Math.sin(q*TAU*4)-3*q;puff=Math.min(1,seg(u,.24,.28))}
 else if(u<.82){const q=seg(u,.72,.82);hx=lerp(168,180,q);hy=lerp(GY-33,GY,q*q);puff=1-seg(u,.72,.75)}
 else{hx=180;hy=GY}
 shadow(c,hx,GY,6,hx>70&&hx<170?0:.35);
 if(puff>0){circ(c,hx,hy-9,8*puff+3,P.waterL);circ(c,hx-2,hy-11,3*puff,'#cfe6f7');R(c,hx-3,hy-11,1,2,P.ink);R(c,hx+2,hy-11,1,2,P.ink);circ(c,hx,hy-6,1.5,P.ink);
  const fl=Math.sin(u*TAU*16);R(c,hx-12*puff-2,hy-10+fl*2,4,2,P.waterL);R(c,hx+12*puff-2,hy-10-fl*2,4,2,P.waterL);
  if(u<.72){for(let i=0;i<3;i++){const p=(u*8+i/3)%1;c.globalAlpha=1-p;circ(c,hx-10-p*10,hy-2+p*6,1.5+p*2,'#e9edf2')}c.globalAlpha=1}}
 else prWalker(c,hx,hy,u*14,{s:1.8,still:u>.14&&u<.82});
 if(u>=.3&&u<.66)nTag(c,'PUFF & FLOAT',120,14,P.waterL,6);
 if(u>=.72&&u<.84){const q=seg(u,.72,.84);c.globalAlpha=1-q;circ(c,hx+8+q*10,hy-12,3+q*4,'#e9edf2');c.globalAlpha=1;nTag(c,'EXHALE',hx+6,hy-40,'#e9edf2',6)}
 nTag(c,'HOVER FLOAT',236,3,P.gold,7,'right')}};

/* ACT-57 magnetic crawl: a ball rolls up a wall and along the ceiling on a glowing magnetic track */
DEMOS['ACT-57']={d:7,f:(c,t)=>{const u=prWrap(t);R(c,0,0,W,H,'#1d2436');
 for(let i=0;i<W;i+=16)R(c,i,0,1,H,'#232b40');for(let j=0;j<H;j+=16)R(c,0,j,W,1,'#232b40');
 const L=60,Rr=180,T=26,B=108,r=5;
 nSlab(c,0,B,W,27);nSlab(c,Rr,T-12,W-Rr,B-T+12);nSlab(c,0,0,Rr+60,T);
 // track: floor -> wall -> ceiling
 const pts=[[20,B],[Rr,B],[Rr,T],[L,T]];const segL=[Rr-20,B-T,Rr-L],tot=segL[0]+segL[1]+segL[2];
 const on=(x,y,h)=>{R(c,x,y,h?1:3,h?3:1,P.purple)};
 for(let x=20;x<Rr;x+=4){R(c,x,B-2,3,2,'#6b3f99')}for(let y=T;y<B;y+=4)R(c,Rr,y,2,3,'#6b3f99');for(let x=L;x<Rr;x+=4)R(c,x,T,3,2,'#6b3f99');
 const glow=(u*3)%1;for(let i=0;i<6;i++){const s=((glow+i/6)%1)*tot;let x,y;if(s<segL[0]){x=20+s;y=B-1}else if(s<segL[0]+segL[1]){x=Rr+1;y=B-(s-segL[0])}else{x=Rr-(s-segL[0]-segL[1]);y=T+1}R(c,x-1,y-1,2,2,'#d9b8ff')}
 const q=prKeys([[0,0],[.85,1],[1,1]],u)*tot;let bx,by,att='FLOOR';
 if(q<segL[0]){bx=20+q;by=B-r-2}else if(q<segL[0]+segL[1]){bx=Rr-r-2;by=B-(q-segL[0]);att='WALL'}else{bx=Rr-(q-segL[0]-segL[1]);by=T+r+2;att='CEILING'}
 const rot=q/r;circ(c,bx,by,r+1,P.ink);circ(c,bx,by,r,P.orange);circ(c,bx+Math.cos(rot)*2.5,by+Math.sin(rot)*2.5,1.5,'#ffd08a');
 for(let i=0;i<3;i++){const a=u*40+i*2;R(c,bx+Math.cos(a)*(r+3),by+Math.sin(a)*(r+3),1,1,'#d9b8ff')}
 nTag(c,'ON '+att,bx,att==='CEILING'?by+10:by-22,'#d9b8ff',6,att==='WALL'?'right':'center');
 nTag(c,'MAGNETIC TRACK',8,118,'#d9b8ff',5,'left');
 nTag(c,'MAGNET CRAWL',236,3,P.gold,7,'right')}};

/* FB-34 inhale & spit: suck the enemy in, hold it with puffed cheeks, spit it out as a star */
DEMOS['FB-34']={d:6,f:(c,t)=>{const u=prWrap(t);prSide(c,120,67,{props:false});
 const hx=60;const suck=u>=.08&&u<.36,hold=u>=.36&&u<.6,spit=u>=.6&&u<.8;
 // crate target
 const crateHit=u>=.72;if(!crateHit||u>.95){R(c,196,GY-16,16,16,P.wood);c.strokeStyle=P.woodD;c.strokeRect(196.5,GY-15.5,15,15)}
 if(crateHit&&u<.86)burst(c,204,GY-8,(u-.72)*2,14,8,{speed:50,life:.35,grav:30,col:(l,i)=>i%2?P.wood:P.woodD,size:()=>3});
 // enemy
 if(u<.36){const q=suck?ease(seg(u,.12,.36)):0;const fx=lerp(150,hx+8,q);const st=suck?1+.6*q:1;shadow(c,fx,GY,8);spr(c,'foe',fx,GY-q*6,{sx:1.8*st,sy:1.8/st,flip:1,alpha:1-q*.6})}
 // body
 const big=hold?1:spit?1-seg(u,.6,.66):suck?seg(u,.3,.36):0;
 shadow(c,hx,GY,8);circ(c,hx,GY-10,9+3*big,P.waterL);R(c,hx-4,GY-14,1,3,P.ink);R(c,hx+2,GY-14,1,3,P.ink);
 if(suck){circ(c,hx+6,GY-9,3,P.ink);for(let i=0;i<6;i++){const p=(u*10+i/6)%1;const x=lerp(150,hx+10,p),y=GY-10+(i%3-1)*10*(1-p);R(c,x,y,5,1,'rgba(255,255,255,.75)')}nTag(c,'INHALE',110,GY-50,'#e9edf2',6)}
 else if(hold){circ(c,hx+4,GY-7,2,P.blue);nTag(c,'HOLDING',hx,GY-46,P.gold,6)}
 else if(spit&&u<.64)circ(c,hx+8,GY-9,3,P.ink);
 R(c,hx-8,GY-2,6,3,P.red);R(c,hx+2,GY-2,6,3,P.red);
 if(spit){const q=seg(u,.6,.72);if(u<.72){const x=lerp(hx+12,196,q);nStar(c,x,GY-10,7,P.gold,5,u*40);nStar(c,x,GY-10,3,'#fff6c8',5,u*40);for(let i=1;i<4;i++)R(c,x-i*7,GY-10,3,1,P.gold)}nTag(c,'SPIT STAR',140,GY-50,P.gold,6)}
 nTag(c,'INHALE & SPIT',236,3,P.gold,7,'right')}};

/* FB-35 copy ability: swallow a fire enemy, gain its hat and move; a strong hit knocks the ability out as a bouncing star */
DEMOS['FB-35']={d:8,f:(c,t)=>{const u=prWrap(t);prSide(c,120,67,{props:false});
 const hx=70;const has=u>=.3&&u<.72;
 const flameHat=(x,y)=>{for(let i=0;i<3;i++){const f=Math.sin(u*60+i*2)*1.5;c.fillStyle=i===1?P.gold:P.orange;c.beginPath();c.moveTo(x-6+i*4,y);c.lineTo(x-4+i*4,y-7-f-(i===1?3:0));c.lineTo(x-2+i*4,y);c.fill()}R(c,x-7,y-1,14,2,P.red)};
 const body=(x,col=P.waterL)=>{shadow(c,x,GY,8);circ(c,x,GY-9,9,col);R(c,x-4,GY-13,1,3,P.ink);R(c,x+2,GY-13,1,3,P.ink);R(c,x-8,GY-2,6,3,P.red);R(c,x+2,GY-2,6,3,P.red)};
 // fire enemy before copying
 if(u<.2){const q=ease(seg(u,.06,.2));const fx=lerp(150,hx+6,q);spr(c,'foe',fx,GY,{sx:1.8,sy:1.8,flip:1,tint:P.orange,tintA:.6,alpha:1-q*.5});flameHat(fx,GY-18);if(u>.06)nTag(c,'SWALLOW',110,GY-50,'#e9edf2',6)}
 const fl=u>=.2&&u<.3?(Math.sin(u*200)>0?1:0):0;
 body(hx,fl?'#ffffff':P.waterL);
 if(u>=.2&&u<.3){c.save();c.globalAlpha=.8;R(c,0,40,W,22,'rgba(10,14,24,.85)');c.restore();txt(c,'COPY: FIRE',120,51,P.orange,9)}
 if(has){flameHat(hx,GY-19);if(u>=.36&&u<.56){for(let i=0;i<10;i++){const p=(u*12+i/10)%1;c.globalAlpha=1-p;circ(c,hx+12+p*50,GY-9+Math.sin(i*3)*p*8,2+p*3,i%2?P.orange:P.gold)}c.globalAlpha=1;nTag(c,'FIRE BREATH',120,GY-50,P.orange,6)}}
 // enemy shot hits and knocks the ability out
 if(u>=.58&&u<.66){const x=lerp(230,hx+9,seg(u,.58,.66));circ(c,x,GY-9,3,P.purple)}
 if(u>=.66){const q=seg(u,.66,.98);const sx=lerp(hx,200,q),sy=GY-8-Math.abs(Math.sin(q*Math.PI*3))*36*(1-q*.6);
  if(u<.96){nStar(c,sx,sy,7,P.gold,5,u*30);nStar(c,sx,sy,3,'#fff6c8',5,u*30);c.save();c.translate(sx,sy-10);c.scale(.6,.6);flameHat(0,0);c.restore()}
  if(u<.74){burst(c,hx+6,GY-9,(u-.66)*3,10,12,{speed:30,life:.3,col:'#fff'});nTag(c,'ABILITY LOST',hx,GY-46,P.red,6)}
  else if(u<.92)nTag(c,'RE-GRAB THE STAR',150,12,P.gold,6)}
 nTag(c,'COPY ABILITY',236,3,P.gold,7,'right')}};

/* FB-36 percentage knockback: same move at 20%, 70%, 140%; higher % flies farther, last one steers then blasts off */
DEMOS['FB-36']={d:9,f:(c,t)=>{const u=prWrap(t);R(c,0,0,W,H,'#3d5f8a');for(let i=0;i<8;i++)R(c,hash(i+2)*W,20+hash(i+9)*50,26,4,'#5a7aa3');
 // floating stage
 R(c,40,92,160,8,P.stone);R(c,40,92,160,2,'#a3a8b1');c.fillStyle=P.stoneD;c.beginPath();c.moveTo(48,100);c.lineTo(192,100);c.lineTo(160,124);c.lineTo(80,124);c.fill();
 const hits=[[.04,20,30],[.3,70,58],[.56,140,400]];
 let pct=0,vx=130,vy=92,trail=[],stop=0,off=false,bend=0;
 for(let i=0;i<3;i++){const[s,p,d]=hits[i];if(u>=s)pct=p;}
 if(u>=.88)pct=0;
 const cur=u<.3?0:u<.56?1:2;const[s0,p0,d0]=hits[cur];const k=u-s0;
 const hs=[.02,.04,.07][cur];
 const fly=Math.max(0,k-hs);
 if(u<s0){vx=130}else if(cur<2){const q=eo(Math.min(1,fly/.14));vx=130+d0*q;vy=92-18*Math.sin(q*Math.PI)*(cur+1)*.6;vx=Math.min(vx,190);if(fly>.14)vx=lerp(130+d0>190?190:130+d0,130,seg(fly,.16,.24))}
 else{const q=Math.min(1,fly/.24);bend=u>=s0&&k<hs?1:Math.min(1,1);vx=130+240*q;vy=92-70*q+30*q*q*0;off=vx>240;for(let j=1;j<10;j++){const qq=Math.max(0,q-j*.025);trail.push([130+240*qq,92-70*qq])}}
 stop=u>=s0&&k<hs;
 // DI ghost path (without steer) vs steered path
 if(cur===2&&u>=s0&&u<.84){prLine(c,130,86,230,8,'rgba(255,255,255,.35)',1,[2,2]);txt(c,'NO DI',212,22,'#cfd8e3',5)}
 for(let j=0;j<trail.length;j++){c.globalAlpha=.6-j*.05;circ(c,trail[j][0],trail[j][1]-6,3+j*.6,'#cfd8e3')}c.globalAlpha=1;
 // attacker
 shadow(c,108,92,6);prWalker(c,108,92,0,{s:1.8,still:1});
 if(u>=s0&&k<hs+.02){c.save();c.strokeStyle='#fff';c.lineWidth=3;c.beginPath();c.arc(112,80,10,-1,.6);c.stroke();c.restore()}
 // victim
 if(!off){shadow(c,vx,92,6,vy<88?.15:.35);spr(c,'foe',vx,vy,{sx:1.7,sy:1.7,flip:1,flash:stop?1:0})}
 if(stop){burst(c,124,80,k*6,10,cur*9+3,{speed:40,life:.3,col:(l,i)=>i%2?P.gold:'#fff'});nTag(c,cur===2?'BIG HITSTOP':'HIT',124,52,'#e9edf2',6)}
 if(stop&&cur===2){sBtnStick(c,20,22);nTag(c,'STEER',36,40,P.cyan,5)}
 if(cur===2&&u>=.74&&u<.88){const q=seg(u,.74,.88);c.save();c.globalAlpha=1-q;R(c,226,0,14,H,P.gold);R(c,230,0,6,H,'#fff');c.restore();nTag(c,'KO',220,60,P.red,8,'right')}
 // % readout
 const col=pct<50?'#ffffff':pct<100?'#f08a3a':'#c0302a';const bump=hits.some(h=>u>=h[0]&&u<h[0]+.03)?1:0;
 R(c,150,108,52,20,'rgba(10,14,24,.85)');txt(c,pct+'%',176,119,col,bump?11:10);spr(c,'foe',160,124,{sx:.9,sy:.9});
 nTag(c,'PERCENT KNOCKBACK',236,3,P.gold,7,'right')}};
function sBtnStick(c,x,y){R(c,x-12,y-12,24,24,'rgba(10,14,24,.8)');ring(c,x,y,8,1,'#5e636e');circ(c,x-4,y-4,4,P.cyan)}

/* FB-37 object rewind: a block falls, the world tints, its past path shows as ghosts, then it rewinds carrying the hero up */
DEMOS['FB-37']={d:8,f:(c,t)=>{const u=prWrap(t);prSide(c,120,67,{props:false,plats:[[-2000,100,5000],[150,40,200]]});
 const path=[];for(let i=0;i<=30;i++){const q=i/30;path.push([lerp(168,110,ease(Math.min(1,q*1.4))),lerp(40,GY,q*q)])}
 const at=q=>{q=clamp(q);const i=Math.min(29,Math.floor(q*30)),f=q*30-i;return[lerp(path[i][0],path[i+1][0],f),lerp(path[i][1],path[i+1][1],f)]};
 let q=0;const sel=u>=.24&&u<.36,rew=u>=.36&&u<.76;
 if(u<.18)q=seg(u,0,.18);else if(u<.36)q=1;else if(rew)q=1-ease(seg(u,.4,.74));else q=0;
 const[bx,by]=at(q);
 const tint=sel||rew;
 if(tint){R(c,0,0,W,H,'rgba(20,40,30,.5)');R(c,0,0,W,H,'rgba(240,200,80,.12)')}
 // hero
 let hx=70,hy=GY;
 if(u>=.36&&u<.42){const k=seg(u,.36,.42);hx=lerp(70,110,k);hy=lerp(GY,GY-12,k)-10*Math.sin(k*Math.PI)}
 else if(u>=.42&&u<.76){hx=bx;hy=by-12}else if(u>=.76&&u<.9){hx=lerp(170,200,seg(u,.76,.9));hy=40}else if(u>=.9){hx=200;hy=40}
 if(tint&&u<.74){for(let i=2;i<30;i+=4){c.globalAlpha=.25;R(c,path[i][0]-10,path[i][1]-12,20,12,'#bdf5c8');c.globalAlpha=1}nDots(c,path,'#e9ffe0',1)}
 // block
 R(c,bx-10,by-12,20,12,P.stone);R(c,bx-10,by-12,20,2,'#a3a8b1');R(c,bx-10,by-2,20,2,P.stoneD);
 if(tint){c.save();c.strokeStyle='#9bf07a';c.lineWidth=1;c.strokeRect(Math.round(bx-11)+.5,Math.round(by-13)+.5,21,13);c.restore()}
 if(u>=.17&&u<.24)burst(c,110,GY,(u-.17)*3,10,4,{speed:30,life:.3,a0:Math.PI,spread:Math.PI,col:P.dirt});
 shadow(c,hx,hy>60?GY:40,6,.25);prWalker(c,hx,hy,u*14,{s:1.8,still:!(u>=.76&&u<.9)});
 if(sel)nTag(c,'SELECT: PAST PATH',100,8,'#9bf07a',6);
 if(rew){nTag(c,'REWIND <<',100,8,'#9bf07a',6);nTag(c,'RIDE IT',bx,Math.max(22,by-40),'#e9edf2',6)}
 if(u<.18)nTag(c,'FALLS',150,60,'#e9edf2',6);
 nTag(c,'OBJECT REWIND',236,3,P.gold,7,'right')}};

/* FB-38 beat-switch platforms: red and blue sets swap on each bar, warning blink one beat before */
DEMOS['FB-38']={d:8,f:(c,t)=>{const u=prWrap(t);R(c,0,0,W,H,'#20203a');
 const beats=16,b=Math.floor(u*beats),bf=u*beats-b,bar=Math.floor(b/4),inBar=b%4;
 const redOn=bar%2===0;const warn=inBar===3;
 const RED=[[20,96],[100,96],[180,96]],BLUE=[[60,76],[140,76],[210,58]];
 const blk=(x,y,col,solid,blink)=>{if(solid&&!(blink&&bf>.5)){R(c,x,y,28,8,col);R(c,x,y,28,2,'#fff6');R(c,x,y+6,28,2,'rgba(0,0,0,.3)')}else{c.save();c.strokeStyle=col;c.setLineDash([2,2]);c.lineWidth=1;c.strokeRect(x+.5,y+.5,27,7);c.restore()}};
 for(const[x,y]of RED)blk(x,y,P.red,redOn,warn&&redOn);
 for(const[x,y]of BLUE)blk(x,y,P.blue,!redOn,warn&&!redOn);
 // bobbing props on the beat
 const bob=Math.round(2*Math.pow(1-bf,3));for(let i=0;i<5;i++){const x=12+i*50;R(c,x,128-6-bob,4,6+bob,P.leaf);circ(c,x+2,120-bob,4,P.leafD)}
 // hero hops to the set that will be solid next bar
 const seq=[RED[0],BLUE[0],RED[1],BLUE[1]];
 const from=seq[bar%4],to=seq[(bar+1)%4];
 let hx=from[0]+14,hy=from[1];
 if(warn){const k=ease(bf);hx=lerp(from[0]+14,to[0]+14,k);hy=lerp(from[1],to[1],k)-14*Math.sin(k*Math.PI)}
 shadow(c,hx,hy,5,.3);prWalker(c,hx,hy,u*16,{s:1.6,still:!warn});
 // beat HUD
 for(let i=0;i<4;i++){const on=i===inBar;circ(c,16+i*10,14,on?3.5:2.5,on?(warn?P.gold:'#e9edf2'):'#4a5068')}
 if(warn)nTag(c,'BEEP BEEP',70,8,P.gold,6,'left');
 nTag(c,redOn?'RED SOLID':'BLUE SOLID',120,30,redOn?P.red:'#7aa2e8',6);
 nTag(c,'BEAT BLOCKS',236,3,P.gold,7,'right')}};

/* ENV-22 spray to clean: water jet sweeps a grimy wall; grime washes off in strips revealing the clean mural */
const _clean={};
function cleanMap(){if(_clean.m)return _clean.m;const cs=4,cols=Math.ceil(150/cs),rows=Math.ceil(70/cs),m=[];
 const pathAt=s=>{const lanes=4,l=Math.min(lanes-1,Math.floor(s*lanes)),f=s*lanes-l;const x=l%2?lerp(150,0,f):lerp(0,150,f);return[x,8+l*18]};
 for(let r=0;r<rows;r++)for(let q=0;q<cols;q++){const x=q*cs+2,y=r*cs+2;let first=-1,second=-1,last=-9;const thick=hash(q*7+r*13)>.75;for(let i=0;i<=800;i++){const s=i/800,[px,py]=pathAt(s);if(Math.hypot(px-x,py-y)<11+hash(q+r*31)*3){if(first<0)first=s;else if(s-last>.08&&second<0)second=s;last=s}}m.push({q,r,thick,t:thick?Math.min(.96,second>0?second:first+.12):first,t1:first})}
 _clean.path=pathAt;return _clean.m=m}
DEMOS['ENV-22']={d:8,f:(c,t)=>{const u=prWrap(t);prSide(c,120,67,{props:false});
 const WX=60,WY=24,m=cleanMap(),path=_clean.path;
 // clean mural underneath
 R(c,WX,WY,150,70,'#f4e6c4');circ(c,WX+110,WY+22,12,P.gold);for(let i=0;i<8;i++){const a=i*TAU/8;nLine(c,WX+110+Math.cos(a)*15,WY+22+Math.sin(a)*15,WX+110+Math.cos(a)*19,WY+22+Math.sin(a)*19,P.gold,1)}
 c.fillStyle=P.grass;c.beginPath();c.moveTo(WX,WY+70);c.lineTo(WX+40,WY+40);c.lineTo(WX+80,WY+70);c.fill();c.fillStyle=P.leaf;c.beginPath();c.moveTo(WX+50,WY+70);c.lineTo(WX+90,WY+46);c.lineTo(WX+130,WY+70);c.fill();
 const s=seg(u,.06,.78);let done=0;
 for(const e of m){const x=WX+e.q*4,y=WY+e.r*4;if(e.t<0||s<e.t1){R(c,x,y,4,4,(e.q+e.r)%3?'#5a4a3a':'#4d3f31');if(e.thick)R(c,x+1,y+1,2,2,'#3a2e24')}else if(s<e.t){R(c,x,y,4,4,'rgba(90,74,58,.55)')}else{done++;if(s-e.t<.06&&u<.79)R(c,x,y,4,4,'rgba(200,235,255,.45)')}}
 c.strokeStyle=P.woodD;c.lineWidth=2;c.strokeRect(WX-1,WY-1,152,72);
 const frac=done/m.length;
 // hero + jet
 const hx=30,hy=GY;shadow(c,hx,hy,6);prWalker(c,hx,hy,0,{s:1.8,still:1});R(c,hx+4,hy-12,8,3,P.blue);
 if(u>=.06&&u<.78){const[px,py]=path(s);const tx=WX+px,ty=WY+py;const nx=hx+12,ny=hy-11;
  for(let i=0;i<14;i++){const k=i/14;const x=lerp(nx,tx,k),y=lerp(ny,ty,k)-6*Math.sin(k*Math.PI)+((i+Math.floor(u*90))%2);R(c,x,y,2,2,i%2?P.waterL:'#e9f6ff')}
  burst(c,tx,ty,(u*20)%1*.3,8,Math.floor(u*20),{speed:28,life:.3,col:(l,i)=>i%2?P.waterL:'#fff'});nTag(c,'SPRAY',hx,hy-40,P.waterL,6)}
 bar(c,WX+40,WY+78,70,4,u>=.78?1:frac,P.cyan);txt(c,'CLEAN',WX+24,WY+80,'#e9edf2',5);
 if(u>=.8&&u<.95){const q=seg(u,.8,.9);c.save();c.globalAlpha=(1-q)*.6;R(c,WX+lerp(-20,150,q),WY,14,70,'#fff');c.restore();nTag(c,'AREA CLEAN!',WX+75,WY+30,P.gold,7)}
 nTag(c,'SPRAY TO CLEAN',236,3,P.gold,7,'right')}};
})();
