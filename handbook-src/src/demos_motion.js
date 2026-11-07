/* ===== Motion / immersion demos (14 new cards) — scrub-safe, P palette ===== */
(()=>{
const moTag=(c,s,x,y,col='#e9edf2',bg='rgba(10,14,24,.75)',size=6,align='left')=>{c.font='bold '+size+'px monospace';const w=Math.ceil(c.measureText(s).width)+6;const x0=align==='right'?x-w:align==='center'?x-w/2:x;R(c,x0,y,w,size+4,bg);txt(c,s,x0+3,y+size/2+2,col,size,'left')};
const moNoise=(t,seed,f)=>{const i=Math.floor(t*f),k=t*f-i;return lerp(hash(seed+i),hash(seed+i+1),ease(k))*2-1};
const moStrike=(c,x,gy,pose)=>{const{cr=0,lean=0,dx=0,arm=0}=pose;c.save();c.translate(x+dx,gy);c.rotate(lean);c.scale(1+cr*.12,1-cr*.18);shadow(c,0,0,7);c.scale(2,2);c.drawImage(sprCanvas('hero'),0,0,7,10,-4,-10,7,10);c.restore();
 const hx=x+dx+6+lean*10,hy=gy-10-lean*4+cr*3;c.save();c.translate(hx,hy);c.rotate(arm);R(c,0,-1,14,2,'#e9edf2');R(c,-2,-2,3,4,P.woodD);c.restore()};
const D2R=Math.PI/180;

/* CAM-33 handheld idle breathing — LOCKED vs BREATHING */
DEMOS['CAM-33']={d:6,f:(c,t)=>{for(const i of[0,1]){const x0=i*121;c.save();c.beginPath();c.rect(x0,0,119,H);c.clip();c.translate(x0,0);
  const yaw=i?moNoise(t,3,.22)*.9+moNoise(t,7,.11)*.5:0,pit=i?moNoise(t,5,.18)*.7:0;
  c.save();c.translate(60,67);c.rotate(yaw*.02);c.translate(0,pit*2);c.translate(-60,-67);
  c.drawImage(scene('eday'),-4,-4,W+8,H+8);shadow(c,60,92,6);spr(c,'hero',60,92,{sx:1.5,sy:1.5});
  tree(c,20,88,0);house(c,95,70,0);c.restore();
  moTag(c,i?'BREATHING':'LOCKED',4,4,i?P.cyan:'#e9edf2');c.restore()}
 R(c,119,0,2,H,P.ink);moTag(c,'idle drift only',120,H-12,'#cfd8e3','rgba(10,14,24,.75)',6,'center')}};

/* CAM-34 landing dip — hop vs drop */
DEMOS['CAM-34']={d:5,f:(c,t)=>{const u=((t%1)+1)%1;
  const phase=u<.18?'run':u<.28?'hop':u<.42?'land1':u<.55?'run2':u<.7?'fall':u<.88?'land2':'settle';
  for(const i of[0,1]){prLane(c,i,i?'HIGH DROP':'SHORT HOP',i?P.gold:P.cyan,gy=>{
    R(c,0,gy,W,12,P.dirtD);R(c,0,gy,W,3,P.grass);
    if(i){R(c,150,gy-40,60,40,P.stone);R(c,150,gy-40,60,3,P.stoneD)}
    let hx=40,hy=gy,dip=0,air=0;
    if(!i){ // short hop
      if(u<.2){hx=lerp(40,90,u/.2)}
      else if(u<.35){const k=seg(u,.2,.35);hx=lerp(90,130,k);hy=gy-Math.sin(k*Math.PI)*18;air=1}
      else if(u<.5){const k=seg(u,.35,.5);hx=lerp(130,150,k);hy=gy;dip=-Math.sin(k*Math.PI)*3*(1-k)}
      else{hx=lerp(150,200,seg(u,.5,1));hy=gy}
    }else{ // high drop
      if(u<.25){hx=lerp(40,160,u/.25);hy=gy-40}
      else if(u<.32){hx=170;hy=gy-40;air=1}
      else if(u<.55){const k=seg(u,.32,.55);hx=175;hy=lerp(gy-40,gy,eo(k));air=k<1;if(k>.85)dip=-Math.sin((k-.85)/.15*Math.PI)*10}
      else{const k=seg(u,.55,.85);hx=175;hy=gy;dip=-Math.exp(-k*4)*Math.sin(k*14)*8}
    }
    c.save();c.translate(0,dip);shadow(c,hx,gy-dip,6,air?0:.35);spr(c,'hero',hx,hy,{sx:1.6,sy:1.6*(1+dip*.02),flip:false});c.restore();
    if(Math.abs(dip)>.5){prLine(c,hx+12,gy+dip,hx+12,gy,P.gold,1,[2,2]);txt(c,'dip',hx+20,gy+dip*.5,P.gold,5,'left')}
  })}
}};

/* CAM-35 dithered occluder — camera stays, wall fades */
DEMOS['CAM-35']={d:5,f:(c,t)=>{const u=((t%1)+1)%1,hx=lerp(40,200,ease(prTri(u)));
  c.drawImage(scene('eday'),0,0);
  const behind=hx>100&&hx<160;const fade=behind?ease(Math.min(1,Math.abs(hx-130)<20?1:1-Math.abs(hx-130)/30)):0;
  // wall block
  for(let y=40;y<110;y++)for(let x=110;x<150;x++){const thr=(BAYER4[(y&3)*4+(x&3)]+.5)/16;const show=fade<(1-thr*.7+.15);if(show){const col=((x+y)&2)?P.wall:P.wallD;R(c,x,y,1,1,col)}}
  if(fade>.05){R(c,110,40,40,2,P.woodD);R(c,110,108,40,2,P.woodD)}
  shadow(c,hx,100,6);spr(c,'hero',hx,100,{sx:1.5,sy:1.5});
  moTag(c,'camera locked',4,4,P.cyan);moTag(c,behind?'OCCLUDER DITHER':'CLEAR',W-4,4,behind?P.gold:'#e9edf2','rgba(10,14,24,.75)',6,'right');
  // camera glyph
  R(c,8,118,14,10,P.ink);R(c,10,120,8,6,P.cyan);txt(c,'no dolly',28,123,'#cfd8e3',6,'left')}};

/* ANI-19 turn-in-place */
DEMOS['ANI-19']={d:6,f:(c,t)=>{R(c,0,0,W,H,'#2a3446');R(c,0,100,W,35,'#1f2836');R(c,0,100,W,1,'rgba(255,255,255,.12)');
  const u=((t%1)+1)%1,small=u<.35,twist=small?Math.sin(seg(u,.05,.3)*Math.PI)*.45:0;
  const turn=u>=.4&&u<.75,tk=seg(u,.4,.75),step=turn&&tk>.2&&tk<.8;
  [[70,'TWIST ONLY'],[170,'180° STEP']].forEach(([x,lab],i)=>{
    const face=i===0?1:(turn? (tk<.5?1:-1): (u>.75?-1:1));
    const lean=i===0?twist*.5:0;const bob=step?Math.round(Math.sin(tk*Math.PI)*2):0;
    shadow(c,x+(i&&step?(tk-.5)*8:0),101,10,.3);
    c.save();c.translate(x+(i&&step?(tk-.5)*8:0),bob);c.rotate(lean);
    spr(c,'hero',0,100,{sx:2,sy:2,flip:face<0});
    // torso twist cue: offset head mark
    if(i===0&&Math.abs(twist)>.05){R(c,twist*10,78,3,3,P.gold);moTag(c,'spine',0,70,P.gold,'rgba(10,14,24,.75)',5,'center')}
    if(i&&step){R(c,face*6,100,4,2,P.cyan);moTag(c,'step',0,70,P.cyan,'rgba(10,14,24,.75)',5,'center')}
    c.restore();moTag(c,lab,x,12,i&&step?P.gold:'#e9edf2','rgba(10,14,24,.75)',6,'center');
  });
  moTag(c,small?'spine twist · feet planted':step?'pivot step':'hold',120,118,P.cyan,'rgba(10,14,24,.75)',6,'center')}};

/* ANI-20 locomotion lean */
DEMOS['ANI-20']={d:5,f:(c,t)=>{const u=((t%1)+1)%1;R(c,0,0,W,H,'#2a3446');R(c,0,100,W,35,'#1f2836');
  const x=lerp(30,210,u),turn=Math.sin(u*TAU*2),accel=Math.cos(u*TAU*2);
  const lean=clamp(turn*accel*1.2+Math.sin(u*TAU)*.15,-.4,.4);
  const brake=u>.82&&u<.95?-0.3*Math.sin(seg(u,.82,.95)*Math.PI):0;
  shadow(c,x,101,10,.3);c.save();c.translate(x,100);c.rotate(lean+brake);spr(c,'hero',0,0,{sx:2,sy:2});c.restore();
  prLine(c,0,40.5,W,40.5,'rgba(127,227,216,.35)',1,[3,3]);moTag(c,'camera level',4,28,P.cyan);
  moTag(c,brake<-.05?'BRAKE lean-back':Math.abs(lean)>.12?'BANK':'RUN',W-4,4,P.gold,'rgba(10,14,24,.75)',6,'right');
  txt(c,'body tilts · camera unrolled',120,120,'#9aa6b8',6)}};

/* ANI-21 hand IK contact */
DEMOS['ANI-21']={d:5,f:(c,t)=>{const u=((t%1)+1)%1;R(c,0,0,W,H,'#2a3344');R(c,0,100,W,35,'#3a4558');
  R(c,160,30,30,70,P.wall);R(c,160,30,30,4,P.wallD);R(c,160,96,30,4,P.woodD);
  const hx=lerp(40,200,u),near=hx>130&&hx<175,w=near?ease(1-Math.abs(hx-152)/22):0;
  shadow(c,hx,100,8,.3);spr(c,'hero',hx,100,{sx:1.8,sy:1.8});
  if(w>.05){const hx2=lerp(hx+8,168,w),hy2=lerp(88,70,w);c.strokeStyle=P.skin;c.lineWidth=2;c.beginPath();c.moveTo(hx+6,90);c.lineTo(hx2,hy2);c.stroke();circ(c,hx2,hy2,2.5,P.skin);moTag(c,'CONTACT',168,55,P.gold)}
  moTag(c,near?'hand IK on':'walk clear',4,4,near?P.gold:'#e9edf2')}};

/* FB-23 weapon pull-back */
DEMOS['FB-23']={d:5,f:(c,t)=>{const u=((t%1)+1)%1;
  for(const i of[0,1]){const x0=i*121;c.save();c.beginPath();c.rect(x0,0,119,H);c.clip();c.translate(x0,0);
  R(c,0,0,119,H,'#1a2230');R(c,0,90,119,45,'#2a3344');
  // wall on right of each panel when near
  const near=i===0? (u>.35&&u<.7) : false; // left = wall tuck demo cycling, right = clear
  const wall=i===0;
  if(wall){R(c,90,20,30,90,P.stone);R(c,90,20,3,90,P.stoneD)}
  const tuck=wall&&near?ease(Math.sin(seg(u,.35,.7)*Math.PI)):0;
  // viewmodel gun
  const gx=55-tuck*18,gy=78-tuck*10,ang=-.2-tuck*1.1;
  c.save();c.translate(gx,gy);c.rotate(ang);R(c,0,-3,40,6,P.stoneD);R(c,28,-4,14,3,P.ink);R(c,-6,-5,10,10,P.wood);R(c,-4,-2,6,6,P.skin);c.restore();
  moTag(c,i?'CLEAR':'WALL',4,4,i?P.cyan:P.gold);if(tuck>.2)moTag(c,'TUCK',70,50,P.gold);c.restore()}
 R(c,119,0,2,H,P.ink)}};

/* FB-24 damage vibration — FREEZE vs VIBRATE */
DEMOS['FB-24']={d:4,f:(c,t)=>{const u=((t%1)+1)%1,hit=.3,fz=u>=hit&&u<.55;
  for(const i of[0,1])prLane(c,i,i?'VIBRATE':'FREEZE',i?P.gold:P.cyan,gy=>{
    tree(c,200,gy,Math.sin((u)*8)); // world keeps slight motion cue on both? keep stable for read
    const a=fz?hit:u; const sw=seg(a,.2,hit);
    const vib=i&&fz?Math.sin(u*400)*2.2*Math.exp(-(u-hit)*8):0;
    const vibY=i&&fz?Math.sin(u*350)*1.2*Math.exp(-(u-hit)*8):0;
    moStrike(c,70+vib,gy+vibY,{dx:eo(sw)*8,arm:lerp(-1.3,.6,eo(sw))});
    prDummy(c,100+vib*.6,gy+vibY*.5,0,fz&&u<hit+.05);
    if(fz&&!i)moTag(c,'STATIC',88,gy-40,P.cyan);
    if(fz&&i)moTag(c,'BUZZ',88,gy-40,P.gold);
  });
  moTag(c,'bg stable',W-4,H-12,'#e9edf2','rgba(10,14,24,.75)',6,'right')}};

/* FB-25 weapon model recoil — camera frame fixed */
DEMOS['FB-25']={d:4,f:(c,t)=>{const u=((t%1)+1)%1;R(c,0,0,W,H,'#243044');
  // background room — camera fixed
  R(c,0,70,W,65,'#3a4a5e');for(let i=0;i<8;i++)R(c,20+i*28,50,16,20,P.wall);
  moTag(c,'CAMERA FIXED',4,4,P.cyan);
  // shots at .15 .28 .41 .54
  const shots=[.15,.28,.41,.54];let kick=0,back=0;
  for(const s of shots){const e=u-s;if(e>=0&&e<.35){const k=Math.exp(-e*10);kick=Math.max(kick,k*18);back=Math.max(back,k*10)}}
  const gx=150,gy=95;c.save();c.translate(gx,gy-back);c.rotate(-kick*D2R*.8);
  R(c,-8,-6,55,8,P.stoneD);R(c,40,-7,18,4,P.ink);R(c,-16,-10,14,14,P.wood);R(c,-12,-6,8,8,P.skin);
  if(kick>8){c.globalAlpha=clamp(kick/18);circ(c,58,-4,4,P.gold);c.globalAlpha=1}
  c.restore();
  prDash(c,2,2,W-5,H-5,'rgba(233,237,242,.4)');
  moTag(c,'MODEL KICK',W-4,4,P.gold,'rgba(10,14,24,.75)',6,'right');
  txt(c,'model ≠ camera',120,124,'#9aa6b8',6)}};

/* ENV-19 leaf litter */
DEMOS['ENV-19']={d:5,f:(c,t)=>{const u=((t%1)+1)%1;R(c,0,0,W,H,'#4a6a3a');R(c,0,0,W,H,P.grass);
  // leaf patch
  const leaves=[];for(let i=0;i<40;i++){const bx=70+hash(i)*100,by=50+hash(i+40)*50;leaves.push([bx,by,hash(i+9)*TAU,i])}
  const hx=lerp(20,220,u),hy=78,moving=u>.05&&u<.95;
  for(const [bx,by,ang,i] of leaves){const dx=bx-hx,dy=by-hy,d=Math.hypot(dx,dy);let x=bx,y=by,a=ang;
    if(moving&&d<18){const f=(1-d/18)*(hx>bx?-1:1);const age=u;x=bx+f*12*Math.cos(ang+i);y=by+f*6*Math.sin(ang)+Math.abs(f)*3;a=ang+f*2}
    c.save();c.translate(x,y);c.rotate(a);R(c,-2,-1,4,2,i%3?P.orange:'#c45a2a');c.restore()}
  shadow(c,hx,hy,6);spr(c,'hero',hx,hy+(Math.floor(u*30)%2?-1:0),{sx:1.4,sy:1.4});
  moTag(c,moving?'WAKE':'STAND: no emit',4,4,moving?P.gold:P.cyan)}};

/* ENV-20 runoff / drip after rain */
DEMOS['ENV-20']={d:7,f:(c,t)=>{const u=((t%1)+1)%1,rain=u<.45,after=u>=.45;
  R(c,0,0,W,90,P.sky);R(c,0,90,W,45,P.grass2);
  // roof
  R(c,40,50,80,30,P.wall);c.fillStyle=P.roof;c.beginPath();c.moveTo(35,52);c.lineTo(80,30);c.lineTo(125,52);c.fill();
  // bush
  tree(c,180,95,rain?Math.sin(u*40)*.5:after&&u<.7?Math.sin((u-.55)*30)*2:0);
  if(rain){for(let i=0;i<30;i++){const x=hash(i)*W,y=((hash(i+3)*H+u*180)%H);R(c,x,y,1,3,'rgba(180,210,240,.7)')}}
  // eaves drip after rain
  if(after){const drip=u-.45;for(let i=0;i<5;i++){const ph=(drip*3+i*.2)%1;const x=50+i*16;const y=52+ph*50;if(ph<.85){R(c,x,y,1,3,P.waterL);if(ph>.7)ring(c,x,95,2+(ph-.7)*8,1,'rgba(180,220,255,'+(1-ph)+')')}}
    // bush shed burst
    if(u>.55&&u<.72){const e=u-.55;burst(c,180,70,e*2,8,11,{speed:25,grav:40,life:.6,col:()=>P.waterL,size:()=>1})}
  }
  moTag(c,rain?'RAIN':'AFTER: eaves drip',4,4,rain?P.cyan:P.gold);moTag(c,'object wetness',W-4,4,'#e9edf2','rgba(10,14,24,.75)',6,'right')}};

/* FX-40 footfall dust DIRT vs STONE */
DEMOS['FX-40']={d:5,f:(c,t)=>{const u=((t%1)+1)%1;
  R(c,0,0,120,H,P.dirt);R(c,120,0,120,H,P.stone);R(c,118,0,4,H,P.ink);
  txt(c,'DIRT',40,12,P.gold,7);txt(c,'STONE',180,12,'#cfd8e3',7);
  const hx=lerp(20,220,u),hy=90,plant=Math.floor(u*12);
  // dust only on dirt side when stepping
  for(let s=0;s<plant;s++){const su=s/12;if(su>u)break;const x=lerp(20,220,su);if(x>=118)continue;const age=(u-su)*5;if(age>1)continue;
    for(let k=0;k<4;k++){const px=x+(hash(s*9+k)-.5)*10,py=hy-2-age*8-hash(k+s)*4;R(c,px,py,1+ (age<.3?1:0),1,'rgba(180,150,100,'+(1-age)+')')}}
  shadow(c,hx,hy,6);spr(c,'hero',hx,hy+(Math.floor(u*20)%2?-1:0),{sx:1.4,sy:1.4});
  moTag(c,hx<118?'PUFF':'NONE',hx,hy-28,hx<118?P.gold:P.cyan,'rgba(10,14,24,.75)',6,'center')}};

/* PHY-04 damped prop settle — sign + door */
DEMOS['PHY-04']={d:6,f:(c,t)=>{const u=((t%1)+1)%1;R(c,0,0,W,H,P.sky);R(c,0,100,W,35,P.grass);
  // bumps at .15 and .45
  const ang=(t0,amp)=>{let a=0,w=0;for(const [hit,imp] of [[.15,amp],[.45,amp*.7]]){const e=(u-hit)*6;if(e<0)continue;w+=imp*Math.exp(-e*2.2);a+=w*Math.sin(e*10)}return a};
  // hanging sign
  const sa=ang(.15,1.2);R(c,70,20,4,20,P.woodD);c.save();c.translate(72,40);c.rotate(sa*.4);R(c,-18,0,36,16,P.wood);R(c,-16,2,32,12,P.gold);txt(c,'INN',0,8,P.ink,7);c.restore();
  // door
  const da=ang(.2,0.9);R(c,160,40,6,60,P.woodD);c.save();c.translate(166,40);c.rotate(Math.max(-.15,Math.min(.55,da*.35)));R(c,0,0,28,60,P.wood);R(c,20,28,4,4,P.gold);c.restore();
  // bumper character
  const hx=u<.15?lerp(20,65,u/.15):u<.45?lerp(65,150,seg(u,.15,.45)):lerp(150,210,seg(u,.45,1));
  shadow(c,hx,100,6);spr(c,'hero',hx,100,{sx:1.4,sy:1.4});
  moTag(c,'additive re-hit',4,4,P.cyan);moTag(c,'settle',W-4,4,P.gold,'rgba(10,14,24,.75)',6,'right')}};

/* LGT-14 swinging light pool */
DEMOS['LGT-14']={d:6,f:(c,t)=>{const u=((t%1)+1)%1;
  // dark room
  const o=outData(c),d=o.data;
  const hit=.2,e=u-hit;const swing=e>0?Math.exp(-e*2.5)*Math.sin(e*14)*28:0;
  const lx=120+swing,ly=36,poolX=120+swing*1.6,poolY=100;
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){const floor=y>70;const base=floor?((x>>3)+(y>>3))&1?[50,48,44]:[40,38,34]:[22,24,32];
    const dd=Math.hypot(x-poolX,(y-poolY)*1.2);const L=Math.exp(-dd*dd/900)*.9; // steady brightness
    // soft shadow of hanging box
    const sx=120+swing*.5,sy=55;const sd=Math.hypot(x-sx,(y-sy)*1.4);const sh=y>50&&sd<18?0.45:1;
    const p=(y*W+x)*4;d[p]=Math.min(255,base[0]*(.15+L)*sh+L*40);d[p+1]=Math.min(255,base[1]*(.15+L)*sh+L*30);d[p+2]=Math.min(255,base[2]*(.15+L)*sh+L*10);d[p+3]=255}
  blitData(c,o);
  // fixture
  R(c,118,8,4,12,P.woodD);c.save();c.translate(120,20);c.rotate(swing*.04);R(c,-6,0,12,14,P.gold);R(c,-4,2,8,8,'#fff6c8');c.restore();
  moTag(c,'LIGHT POOL',4,4,P.gold);moTag(c,'not flicker',W-4,4,P.cyan,'rgba(10,14,24,.75)',6,'right');
  // bump cue
  if(u>.15&&u<.28){spr(c,'hero',90,100,{sx:1.3,sy:1.3});moTag(c,'BUMP',90,70,P.cyan)}
}};
})();
