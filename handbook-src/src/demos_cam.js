/* ===== CAMX demos (鏡頭與構圖 補充) — all helpers local to this IIFE, prefixed cm ===== */
(()=>{
const cmMark=(c,s,x,y,col='#fff',bg='rgba(0,0,0,.6)',size=6,align='left')=>{c.font='bold '+size+'px monospace';const w=c.measureText(s).width+6;const x0=align==='right'?x-w:align==='center'?x-w/2:x;R(c,x0,y,w,size+4,bg);txt(c,s,x0+3,y+size/2+2,col,size,'left')};
const cmSlime=(c,x,y,col='#7ccf5a',s=1)=>{c.save();c.translate(x,y);c.scale(s,s);c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(0,0,7,2.5,0,0,TAU);c.fill();c.fillStyle=col;c.beginPath();c.moveTo(-7,0);c.quadraticCurveTo(-7,-10,0,-10);c.quadraticCurveTo(7,-10,7,0);c.closePath();c.fill();c.fillStyle='#fff';c.fillRect(-4,-6,2,2);c.fillRect(2,-6,2,2);c.fillStyle=P.ink;c.fillRect(-3,-5,1,1);c.fillRect(3,-5,1,1);c.restore()};
const cmDash=(c,x,y,w,h,col,lw=1)=>{c.save();c.strokeStyle=col;c.lineWidth=lw;c.setLineDash([3,2]);c.strokeRect(x,y,w,h);c.restore()};
const cmLine=(c,x0,y0,x1,y1,col,lw=1)=>{c.strokeStyle=col;c.lineWidth=lw;c.beginPath();c.moveTo(x0,y0);c.lineTo(x1,y1);c.stroke()};
const cmTri=(t)=>1-Math.abs(1-2*((t%1+1)%1)); // 0..1..0
/* ---- a 2D world drawn in world coords (approx 0..900 x 0..400) ---- */
const CM_TREES=[[40,60],[90,330],[210,40],[300,300],[380,90],[470,350],[560,60],[640,260],[730,120],[820,330],[870,60],[150,190],[520,200],[700,380]];
const CM_HOUSES=[[130,110],[340,200],[600,140],[780,230],[250,360]];
function cmWorldDraw(g,x0,y0,x1,y1,opt={}){g.fillStyle=opt.g1||P.grass;g.fillRect(x0-2,y0-2,x1-x0+4,y1-y0+4);g.fillStyle=opt.g2||P.grass2;for(let i=0;i<600;i++){const x=hash(i)*900,y=hash(i+999)*400;if(x>x0-3&&x<x1&&y>y0-2&&y<y1)g.fillRect(Math.round(x),Math.round(y),2,1)}
 g.fillStyle=P.dirt;g.fillRect(-200,186,1400,14);g.fillStyle=P.dirtD;g.fillRect(-200,199,1400,1);
 for(const[hx,hy]of CM_HOUSES)if(hx>x0-30&&hx<x1+30&&hy>y0-10&&hy<y1+40)house(g,hx,hy,0);
 for(const[tx,ty]of CM_TREES)if(tx>x0-20&&tx<x1+20&&ty>y0-5&&ty<y1+30)tree(g,tx,ty,0)}
/* render world with camera centre (cx,cy) and zoom z into the current logical 240x135 area (or clip) */
function cmView(c,cx,cy,z=1,opt){c.save();c.translate(W/2,H/2);c.scale(z,z);c.translate(-cx,-cy);const hw=W/2/z,hh=H/2/z;cmWorldDraw(c,cx-hw,cy-hh,cx+hw,cy+hh,opt);c.restore()}
const cmW2S=(x,y,cx,cy,z=1)=>[W/2+(x-cx)*z,H/2+(y-cy)*z];

/* CAMX-01 Cue-focus */
const cm1Hero=t=>[lerp(250,560,t),188];
const cm1Cue=[420,150];
DEMOS['CAMX-01']={d:6,hi:true,f:(c,t)=>{c.scale(2,2);
 const k=cmTri(t),hx=lerp(250,560,ease(k)),hy=188,rad=110;
 // camera target computed for current position, then damped (approximate by sampling lag)
 const tgt=(xx)=>{const dx=cm1Cue[0]-xx,dy=cm1Cue[1]-hy,d=Math.hypot(dx,dy),w=.55*clamp(1-d/rad);return [xx+dx*w,hy+dy*w,w]};
 let cx=0,cy=0;const N=8;for(let i=0;i<N;i++){const kk=cmTri(t-i*.012),[a,b]=tgt(lerp(250,560,ease(kk)));cx+=a/N;cy+=b/N}
 const w=tgt(hx)[2];
 cmView(c,cx,cy,1);
 const [sx,sy]=cmW2S(cm1Cue[0],cm1Cue[1],cx,cy);
 c.save();c.globalAlpha=.5;c.setLineDash([3,3]);ring(c,sx,sy,rad,1,P.gold);c.restore();
 // chest
 R(c,sx-7,sy-6,14,9,P.wood);R(c,sx-7,sy-6,14,3,P.woodD);R(c,sx-1,sy-3,2,3,P.gold);const gl=.5+.5*Math.sin(t*TAU*6);c.globalAlpha=.25+.25*gl;circ(c,sx,sy-2,10,'#fff3a0');c.globalAlpha=1;
 const [px,py]=cmW2S(hx,hy,cx,cy);shadow(c,px,py,6);spr(c,'hero',px,py,{flip:k<.5?false:true});
 // weight line
 if(w>0){c.globalAlpha=.8;cmLine(c,px,py-6,sx,sy-2,P.gold,1);c.globalAlpha=1}
 // centre cross
 cmLine(c,W/2-4,H/2,W/2+4,H/2,'#fff');cmLine(c,W/2,H/2-4,W/2,H/2+4,'#fff');
 cmMark(c,'cue weight '+w.toFixed(2),4,4,w>0?P.gold:'#fff');cmMark(c,'+ = camera centre',W-4,4,'#fff','rgba(0,0,0,.6)',6,'right');
}};

/* CAMX-02 Zoom-to-fit */
DEMOS['CAMX-02']={d:6,hi:true,f:(c,t)=>{c.scale(2,2);
 const s=.5-.5*Math.cos(t*TAU);// 0 close ..1 spread
 const base=[[430,190],[460,175],[445,205]],dirs=[[-1,-.25],[1,-.35],[.3,1]];
 const ps=base.map((b,i)=>[b[0]+dirs[i][0]*s*190+Math.sin(t*TAU*2+i)*6,b[1]+dirs[i][1]*s*110]);
 let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;for(const[x,y]of ps){x0=Math.min(x0,x-8);x1=Math.max(x1,x+8);y0=Math.min(y0,y-14);y1=Math.max(y1,y+2)}
 const m=24,bw=x1-x0+2*m,bh=y1-y0+2*m;const z=clamp(Math.min(W/bw,H/bh),.6,1.5);const cx=(x0+x1)/2,cy=(y0+y1)/2;
 cmView(c,cx,cy,z);
 const cols=[P.red,P.blue,P.gold];
 ps.forEach(([x,y],i)=>{const[a,b]=cmW2S(x,y,cx,cy,z);c.save();c.translate(a,b);c.scale(z,z);shadow(c,0,0,6);spr(c,'hero',0,0,{tint:cols[i],tintA:.45,flip:i===0});c.restore()});
 const[a0,b0]=cmW2S(x0,y0,cx,cy,z),[a1,b1]=cmW2S(x1,y1,cx,cy,z);cmDash(c,a0,b0,a1-a0,b1-b0,'#fff');
 cmDash(c,a0-m*z,b0-m*z,a1-a0+2*m*z,b1-b0+2*m*z,'rgba(255,230,120,.7)');
 cmMark(c,'zoom '+z.toFixed(2)+'x',4,4,P.gold);cmMark(c,'box + 24px margin',W-4,4,'#fff','rgba(0,0,0,.6)',6,'right');
 const zz=(z-.6)/.9;R(c,4,H-10,60,4,'rgba(0,0,0,.6)');R(c,4,H-10,60*zz,4,P.cyan);txt(c,'0.6',4,H-15,'#fff',5,'left');txt(c,'1.5',64,H-15,'#fff',5,'right');
}};

/* simple perspective projector for pseudo-3D demos (yaw, pitch) */
function cmProj(cam,x,y,z){const dx=x-cam.x,dy=y-cam.y,dz=z-cam.z;const cy=Math.cos(cam.yaw),sy=Math.sin(cam.yaw);let X=dx*cy-dz*sy,Z=dx*sy+dz*cy;const cp=Math.cos(cam.pitch||0),sp=Math.sin(cam.pitch||0);const Y=dy*cp-Z*sp;Z=dy*sp+Z*cp;if(Z<.15)return null;const f=cam.f||150;return [W/2+f*X/Z,H/2-f*Y/Z,f/Z]}
/* CAMX-03 Lock-on camera */
DEMOS['CAMX-03']={d:6,hi:true,f:(c,t)=>{c.scale(2,2);
 const lock=t>.14&&t<.9;
 const ang=lerp(-.9,1.4,ease(seg(t,.18,.82)));const r=5;const hx=Math.sin(ang)*r,hz=-Math.cos(ang)*r;
 const lk=ease(seg(t,.1,.2))*(1-ease(seg(t,.88,.98)));
 const yawLock=Math.atan2(-hx,-hz),yawFree=Math.atan2(Math.cos(ang),Math.sin(ang));
 let dyaw=((yawLock-yawFree+Math.PI)%TAU+TAU)%TAU-Math.PI;const yaw=yawFree+dyaw*lk;
 const fx=Math.sin(yaw),fz=Math.cos(yaw),rx=Math.cos(yaw),rz=-Math.sin(yaw);
 const cam={x:hx-fx*4+rx*1.6,y:1.6,z:hz-fz*4+rz*1.6,yaw:yaw,pitch:-.12,f:140};
 const hzY=H/2-140*Math.tan(.12);const g=c.createLinearGradient(0,0,0,hzY);g.addColorStop(0,'#3b6fa0');g.addColorStop(1,'#a9d3e8');c.fillStyle=g;c.fillRect(0,0,W,hzY+1);R(c,0,hzY,W,H-hzY,P.grass);
 c.fillStyle='#6d8fa8';for(let i=0;i<14;i++){const a=i/14*TAU;const rel=((a-yaw+Math.PI)%TAU+TAU)%TAU-Math.PI;if(Math.abs(rel)>1.2)continue;const sx=W/2+140*Math.tan(rel);c.beginPath();c.moveTo(sx-26,hzY+1);c.lineTo(sx,hzY-12-8*hash(i));c.lineTo(sx+26,hzY+1);c.fill()}
 const items=[];for(let i=0;i<24;i++){const a=i/24*TAU;items.push({x:Math.cos(a)*11,z:Math.sin(a)*11,k:'post'})}
 for(let i=0;i<70;i++)items.push({x:(hash(i)-.5)*34,z:(hash(i+40)-.5)*34,k:'tuft'});
 items.push({x:0,z:0,k:'enemy'});items.push({x:hx,z:hz,k:'hero'});
 const pr=items.map(o=>({o,p:cmProj(cam,o.x,0,o.z)})).filter(q=>q.p&&q.p[0]>-40&&q.p[0]<W+40).sort((a,b)=>a.p[2]-b.p[2]);
 for(const {o,p} of pr){const[sx,sy,s]=p;if(o.k==='tuft'){R(c,sx,sy,Math.max(1,s*.15),1,P.grass2)}else if(o.k==='post'){const h=s*1.6,w=Math.max(1,s*.2);R(c,sx-w/2,sy-h,w,h,P.wood);R(c,sx-w/2,sy-h,w,Math.max(1,w*.6),P.woodD)}else if(o.k==='enemy'){cmSlime(c,sx,sy,'#8a5fd0',s*.12);
   if(lock){const rr=Math.max(6,s*.9)+2*Math.sin(t*TAU*8);c.save();c.translate(sx,sy-s*.6);c.rotate(t*TAU*2);c.strokeStyle=P.red;c.lineWidth=1.5;for(let q=0;q<4;q++){c.rotate(TAU/4);c.beginPath();c.arc(0,0,rr,-.4,.4);c.stroke()}c.restore()}}else{c.save();c.translate(sx,sy);c.scale(s*.09,s*.09);shadow(c,0,0,6);spr(c,'hero',0,0,{flip:true});c.restore()}}
 const mx=W-30,my=30,ms=1.8;R(c,mx-24,my-24,48,48,'rgba(0,0,0,.55)');c.save();c.beginPath();c.rect(mx-24,my-24,48,48);c.clip();
 const cxm=mx+cam.x*ms,czm=my-cam.z*ms;c.globalAlpha=.35;c.fillStyle='#fff';c.beginPath();c.moveTo(cxm,czm);c.lineTo(cxm+(fx*14-rx*8)*ms/1.8*1.8,czm-(fz*14-rz*8)*ms);c.lineTo(cxm+(fx*14+rx*8)*ms,czm-(fz*14+rz*8)*ms);c.fill();c.globalAlpha=1;
 circ(c,mx,my,2.5,'#8a5fd0');circ(c,mx+hx*ms,my-hz*ms,2,P.red);R(c,cxm-1.5,czm-1.5,3,3,'#fff');c.restore();txt(c,'top view',mx,my+28,'#fff',5);
 cmMark(c,lock?'LOCK-ON: camera faces target':'FREE: camera follows heading',4,4,lock?P.red:'#fff');
 tl(c,t,[.14,.9]);
}};

/* CAMX-04 Edge scrolling */
const cm4Cur=t=>{const k=(t%1+1)%1;const pts=[[120,68],[234,62],[234,64],[120,68],[6,70],[6,68],[120,60],[118,4],[120,4],[112,131],[114,131],[120,68]];const ts=[0,.1,.22,.3,.38,.5,.58,.66,.74,.84,.92,1];let i=0;while(i<ts.length-2&&k>ts[i+1])i++;const u=ease((k-ts[i])/(ts[i+1]-ts[i]));return [lerp(pts[i][0],pts[i+1][0],u),lerp(pts[i][1],pts[i+1][1],u)]};
const cm4Band=16,cm4Spd=170;
const cm4Vel=(x,y)=>{let vx=0,vy=0;if(x<cm4Band)vx=-(cm4Band-x)/cm4Band;else if(x>W-cm4Band)vx=(x-(W-cm4Band))/cm4Band;if(y<cm4Band)vy=-(cm4Band-y)/cm4Band;else if(y>H-cm4Band)vy=(y-(H-cm4Band))/cm4Band;return [vx*cm4Spd,vy*cm4Spd]};
let cm4Tab=null;const cm4D=6;
function cm4Cam(t){if(!cm4Tab){cm4Tab=[];let x=0,y=0;const N=600;for(let i=0;i<=N;i++){cm4Tab.push([x,y]);const[a,b]=cm4Cur(i/N),[vx,vy]=cm4Vel(a,b);x+=vx*cm4D/N;y+=vy*cm4D/N}
  // remove drift so the loop closes
  const[ex,ey]=cm4Tab[N];for(let i=0;i<=N;i++){cm4Tab[i][0]-=ex*i/N;cm4Tab[i][1]-=ey*i/N}}
 const f=clamp(t)*600,i=Math.min(599,Math.floor(f)),u=f-i;return [lerp(cm4Tab[i][0],cm4Tab[i+1][0],u),lerp(cm4Tab[i][1],cm4Tab[i+1][1],u)]}
DEMOS['CAMX-04']={d:cm4D,hi:true,f:(c,t)=>{c.scale(2,2);const[ox,oy]=cm4Cam(t);cmView(c,450+ox,200+oy,1);
 // a few units (RTS-ish) in world
 for(let i=0;i<5;i++){const wx=410+i*14,wy=215+(i%2)*8;const[a,b]=cmW2S(wx,wy,450+ox,200+oy);shadow(c,a,b,5);spr(c,'hero',a,b,{tint:P.blue,tintA:.35})}
 const[x,y]=cm4Cur(t),[vx,vy]=cm4Vel(x,y),act=vx||vy;
 c.fillStyle='rgba(255,220,90,'+(act?.28:.12)+')';c.fillRect(0,0,cm4Band,H);c.fillRect(W-cm4Band,0,cm4Band,H);c.fillRect(cm4Band,0,W-2*cm4Band,cm4Band);c.fillRect(cm4Band,H-cm4Band,W-2*cm4Band,cm4Band);
 if(act){const a=Math.atan2(vy,vx);c.save();c.translate(W/2,H/2);c.rotate(a);c.fillStyle='rgba(255,255,255,.85)';c.beginPath();c.moveTo(14,0);c.lineTo(4,-6);c.lineTo(4,6);c.fill();R(c,-8,-2,12,4);c.restore()}
 // cursor arrow
 c.save();c.translate(Math.round(x),Math.round(y));c.fillStyle='#fff';c.strokeStyle=P.ink;c.lineWidth=1;c.beginPath();c.moveTo(0,0);c.lineTo(0,10);c.lineTo(3,7);c.lineTo(6,12);c.lineTo(8,11);c.lineTo(5,6);c.lineTo(9,6);c.closePath();c.fill();c.stroke();c.restore();
 cmMark(c,act?'PAN '+Math.round(Math.hypot(vx,vy))+' px/s':'cursor inside: no pan',W/2-40,cm4Band+3,act?P.gold:'#fff');
}};

/* CAMX-05 Auto-scrolling */
DEMOS['CAMX-05']={d:6,hi:true,f:(c,t)=>{c.scale(2,2);const spd=40,camL=t*6*spd;
 R(c,0,0,W,H,'#7fb6d6');c.fillStyle='#a9cfe2';for(let i=0;i<8;i++){const x=((i*70-camL*.3)%560+560)%560-60;c.beginPath();c.ellipse(x,30+hash(i)*20,22,6,0,0,TAU);c.fill()}
 c.fillStyle='#5e8a6a';for(let i=0;i<10;i++){const x=((i*50-camL*.6)%500+500)%500-40;c.beginPath();c.moveTo(x-30,100);c.lineTo(x,60+hash(i+3)*20);c.lineTo(x+30,100);c.fill()}
 const gy=110;R(c,0,gy,W,H-gy,P.dirt);R(c,0,gy,W,3,P.grass);c.fillStyle=P.dirtD;for(let i=0;i<30;i++){const x=((hash(i)*600-camL)%600+600)%600-20;c.fillRect(Math.round(x),gy+6+hash(i+7)*18,3,2)}
 const wallX=200,wx=wallX-camL;R(c,wx,gy-26,12,26,P.stone);R(c,wx,gy-26,12,3,P.stoneD);R(c,wx,gy-14,12,1,P.stoneD);
 let px,jump=0;if(t<.2)px=camL+140;else if(t<.74)px=Math.min(camL+140,wallX-8);else{const u=seg(t,.74,.84);px=lerp(wallX-8,wallX+24,u);jump=Math.sin(u*Math.PI)*30;if(t>.84)px=lerp(wallX+24,camL+140,ease(seg(t,.84,1)))}
 px=Math.max(px,camL+10);const sx=px-camL;const near=clamp(1-(sx-10)/50);
 shadow(c,sx,gy,6);spr(c,'hero',sx,gy-jump,{flip:false});
 const warn=.12+near*(.5+.2*Math.sin(t*TAU*20));const g=c.createLinearGradient(0,0,26,0);g.addColorStop(0,'rgba(230,40,40,'+warn+')');g.addColorStop(1,'rgba(230,40,40,0)');c.fillStyle=g;c.fillRect(0,0,26,H);
 c.fillStyle='rgba(255,255,255,.85)';c.beginPath();c.moveTo(W-6,H/2);c.lineTo(W-14,H/2-6);c.lineTo(W-14,H/2+6);c.fill();
 cmMark(c,'AUTO-SCROLL '+spd+' px/s',4,4,P.gold);if(near>.5&&t<.76)cmMark(c,'EDGE CLOSING IN',4,16,'#fff',P.red);
 tl(c,t,[.2,.74]);
}};

/* CAMX-06 Flip-screen */
const cm6Rooms=[{g1:'#5a9a4a',g2:'#4f8c42',n:'ROOM A'},{g1:'#6e6a8a',g2:'#5d5a78',n:'ROOM B'},{g1:'#b9925e',g2:'#a47f50',n:'ROOM C'}];
function cm6Room(c,i){const r=cm6Rooms[i];R(c,0,0,W,H,r.g1);c.fillStyle=r.g2;for(let k=0;k<70;k++)c.fillRect(Math.round(hash(k+i*100)*W),Math.round(hash(k+i*100+50)*H),2,1);
 // walls with door gaps left/right
 const wc=i===1?P.stoneD:P.woodD;R(c,0,0,W,10,wc);R(c,0,H-10,W,10,wc);R(c,0,0,6,50,wc);R(c,0,86,6,H-86,wc);R(c,W-6,0,6,50,wc);R(c,W-6,86,6,H-86,wc);if(i===0)R(c,0,50,6,36,wc);if(i===2)R(c,W-6,50,6,36,wc);
 if(i===0){tree(c,50,45);tree(c,190,120);house(c,120,40,0)}else if(i===1){for(let k=0;k<4;k++){R(c,40+k*45,30,10,22,P.stone);R(c,40+k*45,30,10,3,'#a5aab3')}}else{R(c,100,40,40,26,P.wood);R(c,100,40,40,4,P.woodD);R(c,117,52,6,4,P.gold)}}
DEMOS['CAMX-06']={d:6,hi:true,f:(c,t)=>{c.scale(2,2);const wx=lerp(20,3*W-30,t);const room=Math.min(2,Math.floor(wx/W)),lx=wx-room*W;cm6Room(c,room);
 const bob=Math.abs(Math.sin(t*TAU*12))*1;shadow(c,lx,80,6);spr(c,'hero',lx,80-bob);
 // flash on cut frame
 if(room>0&&lx<4){c.fillStyle='rgba(255,255,255,.5)';c.fillRect(0,0,W,H)}
 cmMark(c,cm6Rooms[room].n+'  '+(room+1)+'/3',4,13,'#fff');cmMark(c,'camera locked to room grid',W-4,13,P.gold,'rgba(0,0,0,.6)',6,'right');
 // mini room strip
 for(let i=0;i<3;i++){R(c,W/2-27+i*18,H-22,16,9,i===room?P.gold:'rgba(0,0,0,.55)')}R(c,W/2-27+wx/W*18,H-20,1,5,P.red);
 tl(c,t,[(W-20)/(3*W-50),(2*W-20)/(3*W-50)]);
}};

/* top-down / 3/4 shared scene: boxes with (x,y,w,d,h) */
const CM_BOX=[{x:40,y:30,w:50,d:30,h:24,top:P.roof,front:P.wall,side:P.wallD},{x:150,y:60,w:40,d:26,h:20,top:P.roofD,front:P.wall,side:P.wallD},{x:110,y:20,w:22,d:16,h:12,top:P.woodD,front:P.wood,side:P.woodD}];
const CM_TR=[[25,95],[205,30],[200,105],[105,100]];
function cmTilt(c,k,s,t,hero){ // k: front-face height factor, s: depth squash, y offset to keep centred
 R(c,0,0,W,H,P.grass);c.fillStyle=P.grass2;for(let i=0;i<14;i++)for(let j=0;j<9;j++){if((i+j)%2)c.fillRect(i*17,j*16*s+ (H-H*s)/2,17,16*s)}
 const oy=(H-H*s)/2;const items=[];
 for(const b of CM_BOX)items.push({y:b.y+b.d,draw:()=>{const y=oy+b.y*s-b.h*k,fy=oy+(b.y+b.d)*s-b.h*k;c.fillStyle='rgba(0,0,0,.25)';c.fillRect(b.x+3*(1-k),oy+b.y*s+3*(1-k),b.w,b.d*s);R(c,b.x,fy,b.w,b.h*k,b.front);R(c,b.x,fy+b.h*k-2*k,b.w,2*k,b.side);if(b.h*k>8){R(c,b.x+b.w/2-3,fy+b.h*k-8,6,8,P.woodD)}R(c,b.x,y,b.w,b.d*s,b.top);R(c,b.x,y+b.d*s-1,b.w,1,'rgba(0,0,0,.3)')}});
 for(const[tx,ty]of CM_TR)items.push({y:ty,draw:()=>{const y=oy+ty*s;c.fillStyle='rgba(0,0,0,.25)';c.beginPath();c.ellipse(tx+2*(1-k),y,8,8*s,0,0,TAU);c.fill();R(c,tx-2,y-10*k,4,10*k,P.woodD);circ(c,tx,y-14*k,8,P.leafD);circ(c,tx-1,y-15*k-1,6,P.leaf)}});
 items.push({y:hero[1],draw:()=>{const y=oy+hero[1]*s;if(k<.25){c.fillStyle='rgba(0,0,0,.25)';c.beginPath();c.ellipse(hero[0]+1,y+1,5,5*s,0,0,TAU);c.fill();c.save();c.translate(hero[0],y);c.rotate(hero[2]);c.fillStyle=P.red;c.beginPath();c.ellipse(0,0,5,3,0,0,TAU);c.fill();circ(c,0,0,2.6,'#d9a441');c.fillStyle=P.skin;c.fillRect(2,-1,2,2);c.restore();c.globalAlpha=clamp(k*4);}if(k>0){shadow(c,hero[0],y,5);spr(c,'hero',hero[0],y,{flip:Math.cos(hero[2])<0,sy:clamp(k*1.4,.2,1)})}c.globalAlpha=1}});
 items.sort((a,b)=>a.y-b.y);for(const it of items)it.draw()}
const cmHeroPath=t=>{const a=t*TAU;const x=120+70*Math.cos(a),y=78+22*Math.sin(2*a);const dx=-70*Math.sin(a),dy=44*Math.cos(2*a);return [x,y,Math.atan2(dy,dx)]};
DEMOS['CAMX-07']={d:6,hi:true,f:(c,t)=>{c.scale(2,2);cmTilt(c,0,1,t,cmHeroPath(t));cmMark(c,'TOP-DOWN 90°: roofs & heads only',4,4,P.gold)}};
DEMOS['CAMX-08']={d:6,hi:true,f:(c,t)=>{c.scale(2,2);const m=ease(seg(cmTri(t),.15,.85));const k=lerp(0,.85,m),s=lerp(1,.78,m);cmTilt(c,k,s,t,cmHeroPath(t));const ang=Math.round(lerp(90,55,m));cmMark(c,(m>.5?'3/4 VIEW':'TOP-DOWN')+'  tilt '+ang+'°',4,4,m>.5?P.gold:'#fff');cmMark(c,'tops + fronts',W-4,4,'#fff','rgba(0,0,0,.6)',6,'right');
 // tilt gauge
 const gx=W-22,gy=H-22;ring(c,gx,gy,12,1,'rgba(255,255,255,.4)');const a=ang*Math.PI/180;cmLine(c,gx,gy,gx+Math.cos(a)*12,gy-Math.sin(a)*12,P.gold,2);R(c,gx-14,gy,28,1,'#fff')}};

/* CAMX-09 Isometric / dimetric */
const CM_CUBES=[[1,1,1],[1,2,1],[1,2,2],[4,1,1],[4,4,2],[2,4,1],[5,1,1]];
function cmIsoTile(c,ox,oy,i,j,col,line){const x=ox+(i-j)*16,y=oy+(i+j)*8;c.fillStyle=col;c.beginPath();c.moveTo(x,y);c.lineTo(x+16,y+8);c.lineTo(x,y+16);c.lineTo(x-16,y+8);c.closePath();c.fill();if(line){c.strokeStyle=line;c.lineWidth=1;c.stroke()}}
function cmIsoCube(c,ox,oy,i,j,h){const x=ox+(i-j)*16,y=oy+(i+j)*8-h*16;c.fillStyle='#c9cfd8';c.beginPath();c.moveTo(x,y);c.lineTo(x+16,y+8);c.lineTo(x,y+16);c.lineTo(x-16,y+8);c.closePath();c.fill();c.fillStyle='#8a8f99';c.beginPath();c.moveTo(x-16,y+8);c.lineTo(x,y+16);c.lineTo(x,y+32);c.lineTo(x-16,y+24);c.closePath();c.fill();c.fillStyle='#5e636e';c.beginPath();c.moveTo(x+16,y+8);c.lineTo(x,y+16);c.lineTo(x,y+32);c.lineTo(x+16,y+24);c.closePath();c.fill()}
DEMOS['CAMX-09']={d:7,hi:true,f:(c,t)=>{c.scale(2,2);R(c,0,0,W,H,'#20304a');const ox=W/2,oy=10;
 for(let i=0;i<7;i++)for(let j=0;j<7;j++)cmIsoTile(c,ox,oy,i,j,(i+j)%2?P.grass:P.grass2,'rgba(0,0,0,.15)');
 // hero path along tiles (i,j) loop
 const path=[[0,0],[3,0],[3,3],[6,3],[6,6],[3,6],[3,3],[0,3],[0,0]];const n=path.length-1,f=((t%1)*n),q=Math.floor(f),u=f-q;const hi=lerp(path[q][0],path[q+1][0],u),hj=lerp(path[q][1],path[q+1][1],u);
 cmIsoTile(c,ox,oy,Math.round(hi),Math.round(hj),'rgba(255,230,120,.45)','#ffe680');
 const items=CM_CUBES.map(([i,j,h])=>({d:i+j,draw:()=>{for(let k=0;k<h;k++)cmIsoCube(c,ox,oy,i,j,k)}}));
 items.push({d:hi+hj+.01,draw:()=>{const x=ox+(hi-hj)*16,y=oy+(hi+hj)*8+8;shadow(c,x,y,6);spr(c,'hero',x,y,{flip:(path[q+1][0]-path[q][0])<0||(path[q+1][1]-path[q][1])>0})}});
 items.sort((a,b)=>a.d-b.d);for(const it of items)it.draw();
 // axis legend
 const lx=24,ly=H-24;cmLine(c,lx,ly,lx+16,ly+8,P.red,1.5);cmLine(c,lx,ly,lx-16,ly+8,P.cyan,1.5);cmLine(c,lx,ly,lx,ly-16,'#fff',1.5);txt(c,'2:1',lx+22,ly-8,'#fff',6,'left');
 cmMark(c,'2:1 DIMETRIC  tile 32x16',4,4,P.gold);cmMark(c,'no vanishing point',W-4,4,'#fff','rgba(0,0,0,.6)',6,'right');
}};

/* CAMX-10 Oblique projection */
function cmObl(c,x,y,w,h,d,ang,col,top,side){const dx=Math.cos(ang)*d,dy=-Math.sin(ang)*d;c.fillStyle=top;c.beginPath();c.moveTo(x,y-h);c.lineTo(x+dx,y-h+dy);c.lineTo(x+w+dx,y-h+dy);c.lineTo(x+w,y-h);c.closePath();c.fill();c.fillStyle=side;c.beginPath();c.moveTo(x+w,y);c.lineTo(x+w+dx,y+dy);c.lineTo(x+w+dx,y-h+dy);c.lineTo(x+w,y-h);c.closePath();c.fill();R(c,x,y-h,w,h,col)}
DEMOS['CAMX-10']={d:6,hi:true,f:(c,t)=>{c.scale(2,2);const ang=lerp(30,60,.5-.5*Math.cos(t*TAU))*Math.PI/180;
 R(c,0,0,W,H,'#8fc2dc');R(c,0,92,W,H-92,P.grass);c.fillStyle=P.grass2;for(let i=0;i<40;i++)c.fillRect(Math.round(hash(i)*W),Math.round(95+hash(i+9)*36),2,1);
 const bs=[[20,100,56,40,40],[96,100,40,56,30],[160,100,60,30,36]];
 for(const[x,y,w,h,dd]of bs){cmObl(c,x,y,w,h,dd*.5,ang,P.wall,P.roof,P.wallD);
  // windows & door on front: undistorted
  R(c,x+w/2-4,y-12,8,12,P.woodD);R(c,x+6,y-h+8,8,7,'#8fd3ff');R(c,x+w-14,y-h+8,8,7,'#8fd3ff');
  // receding guide lines
  c.save();c.globalAlpha=.7;c.setLineDash([2,2]);const dx=Math.cos(ang)*dd*.5,dy=-Math.sin(ang)*dd*.5;cmLine(c,x,y-h,x+dx,y-h+dy,'#fff');cmLine(c,x+w,y-h,x+w+dx,y-h+dy,'#fff');cmLine(c,x+w,y,x+w+dx,y+dy,'#fff');c.restore()}
 // front face highlight on first building
 cmDash(c,20,60,56,40,P.gold,1);
 const hx=lerp(10,230,t);shadow(c,hx,118,6);spr(c,'hero',hx,118);
 cmMark(c,'CABINET  angle '+Math.round(ang*180/Math.PI)+'°  depth x0.5',4,4,P.gold);cmMark(c,'front = true shape',W-4,4,'#fff','rgba(0,0,0,.6)',6,'right');
}};

/* CAMX-11 Fixed camera angles */
const CM11A={x:.9,y:2.6,z:-2.5,yaw:-.0,pitch:-.32,f:120},CM11B={x:-.9,y:2.6,z:21,yaw:Math.PI,pitch:-.32,f:120};
function cm11Draw(c,cam,hz,t){R(c,0,0,W,H,'#101418');
 const quad=(pts,col)=>{const p=pts.map(q=>cmProj(cam,q[0],q[1],q[2]));if(p.some(v=>!v))return;c.fillStyle=col;c.beginPath();p.forEach((v,i)=>i?c.lineTo(v[0],v[1]):c.moveTo(v[0],v[1]));c.closePath();c.fill()};
 // order: far to near along camera's forward
 const zs=[];for(let z=0;z<20;z++)zs.push(z);const near=cam===CM11A?(a,b)=>b-a:(a,b)=>a-b;zs.sort(near);
 for(const z of zs){quad([[-2,0,z],[2,0,z],[2,0,z+1],[-2,0,z+1]],(z%2)?'#5b4a3e':'#4e4036');quad([[-2,0,z],[-2,3,z],[-2,3,z+1],[-2,0,z+1]],(z%4<2)?'#7d7f88':'#72747d');quad([[2,0,z],[2,3,z],[2,3,z+1],[2,0,z+1]],(z%4<2)?'#6a6c75':'#62646c');
  if(z===6||z===14){const lp=cmProj(cam,0,2.9,z+.5);if(lp){c.globalAlpha=.25;circ(c,lp[0],lp[1],lp[2]*1.2,'#ffe9a8');c.globalAlpha=1;circ(c,lp[0],lp[1],Math.max(1,lp[2]*.12),'#fff3c0')}}}
 // trigger line at z=10
 const a=cmProj(cam,-2,.01,10),b=cmProj(cam,2,.01,10);if(a&&b){c.save();c.setLineDash([3,2]);cmLine(c,a[0],a[1],b[0],b[1],'rgba(255,220,90,.8)');c.restore()}
 const hp=cmProj(cam,0,0,hz);if(hp){c.save();c.translate(hp[0],hp[1]);const s=hp[2]*.06;c.scale(s,s);shadow(c,0,0,6);spr(c,'hero',0,-Math.abs(Math.sin(t*TAU*10)),{});c.restore()}}
DEMOS['CAMX-11']={d:7,hi:true,f:(c,t)=>{c.scale(2,2);const hz=lerp(1.5,18.5,ease(cmTri(t)));const cam=hz<10?CM11A:CM11B;cm11Draw(c,cam,hz,t);
 // plan inset
 const mx=W-30,my=8;R(c,mx-12,my-2,24,52,'rgba(0,0,0,.6)');R(c,mx-4,my+2,8,42,'#5b4a3e');R(c,mx-6,my+2+21,12,1,P.gold);const pz=v=>my+2+v*2.1;circ(c,mx,pz(hz),2,P.red);
 const camI=(C,on)=>{const x=mx+C.x*2,y=pz(C.z);R(c,x-2,y-2,4,4,on?P.gold:'#777');c.globalAlpha=on?.35:.12;c.fillStyle=on?P.gold:'#fff';c.beginPath();c.moveTo(x,y);const dir=C===CM11A?1:-1;c.lineTo(x-8,y+dir*16);c.lineTo(x+8,y+dir*16);c.fill();c.globalAlpha=1};
 camI(CM11A,cam===CM11A);camI(CM11B,cam===CM11B);
 cmMark(c,cam===CM11A?'CAM 1 (fixed)':'CAM 2 (fixed)',4,4,P.gold);cmMark(c,'cut at trigger',4,16,'#fff');tl(c,t,[])}};

/* CAMX-12 Dynamic split screen */
DEMOS['CAMX-12']={d:8,hi:true,f:(c,t)=>{c.scale(2,2);
 const sp=.5-.5*Math.cos(t*TAU);const a=t*TAU*.5+.3;const mid=[450,200];const d=lerp(30,260,sp);
 const p0=[mid[0]-Math.cos(a)*d/2,mid[1]-Math.sin(a)*d/2*.6],p1=[mid[0]+Math.cos(a)*d/2,mid[1]+Math.sin(a)*d/2*.6];
 const dx=p1[0]-p0[0],dy=p1[1]-p0[1],dist=Math.hypot(dx,dy),nx=dx/dist,ny=dy/dist;const r=H*.6/2;
 const split=dist/2>r;
 const drawPlayers=(cx,cy)=>{[[p0,P.red],[p1,P.blue]].forEach(([p,col],i)=>{const[sx,sy]=cmW2S(p[0],p[1],cx,cy);shadow(c,sx,sy,6);spr(c,'hero',sx,sy,{tint:col,tintA:.5,flip:i===0?nx<0:nx>0})})};
 if(!split){const cx=(p0[0]+p1[0])/2,cy=(p0[1]+p1[1])/2;cmView(c,cx,cy);drawPlayers(cx,cy)}
 else{const cams=[[p0[0]+nx*r,p0[1]+ny*r],[p1[0]-nx*r,p1[1]-ny*r]];
  for(let i=0;i<2;i++){c.save();c.beginPath();const s=i===0?-1:1;// half-plane where dot(p-centre,n)*s>0
   const px=-ny,py=nx,L=400;c.moveTo(W/2+px*L,H/2+py*L);c.lineTo(W/2-px*L,H/2-py*L);c.lineTo(W/2-px*L+s*nx*L,H/2-py*L+s*ny*L);c.lineTo(W/2+px*L+s*nx*L,H/2+py*L+s*ny*L);c.closePath();c.clip();cmView(c,cams[i][0],cams[i][1]);drawPlayers(cams[i][0],cams[i][1]);c.restore()}
  const lw=clamp((dist/2-r)/40)*3;c.strokeStyle='#111';c.lineWidth=lw+1;c.beginPath();c.moveTo(W/2-ny*300,H/2+nx*300);c.lineTo(W/2+ny*300,H/2-nx*300);c.stroke();c.strokeStyle='#fff';c.lineWidth=Math.max(.5,lw-1);c.stroke()}
 cmMark(c,split?'SPLIT: divider ⟂ to P1-P2':'MERGED: one shared camera',4,4,split?P.gold:'#fff');cmMark(c,'dist '+Math.round(dist)+' / '+Math.round(2*r),W-4,4,'#fff','rgba(0,0,0,.6)',6,'right');
}};

/* CAMX-13 Camera banking */
const cm13Curve=t=>Math.sin(t*TAU)*.9+Math.sin(t*TAU*2+1)*.35;
DEMOS['CAMX-13']={d:8,hi:true,f:(c,t)=>{c.scale(2,2);const cur=cm13Curve(t);let lag=0;for(let i=0;i<12;i++)lag+=cm13Curve(t-i*.006)/12;const roll=-lag*8*Math.PI/180;
 const k=TMP(),g=k.getContext('2d');const hz=50;const sky=g.createLinearGradient(0,0,0,hz);sky.addColorStop(0,'#2d5d8a');sky.addColorStop(1,'#f0c890');g.fillStyle=sky;g.fillRect(0,0,W,hz);
 let yawI=0;for(let i=0;i<40;i++)yawI+=cm13Curve(i/40*t)*t/40;
 g.fillStyle='#5a6e88';for(let i=0;i<9;i++){const x=((i*40-yawI*260)%360+360)%360-60;g.beginPath();g.moveTo(x-30,hz);g.lineTo(x,hz-14-10*hash(i));g.lineTo(x+30,hz);g.fill()}
 const travel=t*320;
 for(let y=hz;y<H;y++){const p=(y-hz+1)/(H-hz);const zz=30/(p+.02);const band=Math.floor((zz+travel)/4)%2;const cx=W/2+cur*90*(1-p)*(1-p);const rw=110*p+1;
  g.fillStyle=band?P.grass:P.grass2;g.fillRect(0,y,W,1);g.fillStyle=band?'#d9d9d9':'#b8322a';g.fillRect(cx-rw*1.12,y,rw*2.24,1);g.fillStyle=band?'#666b74':'#5f646c';g.fillRect(cx-rw,y,rw*2,1);if(band){g.fillStyle='#f2f2f2';g.fillRect(cx-.5-rw*.02,y,1+rw*.04,1)}}
 c.save();c.imageSmoothingEnabled=true;c.translate(W/2,H/2);c.rotate(roll);c.scale(1.2,1.2);c.drawImage(k,-W/2,-H/2);c.restore();
 const cx=W/2,cy=H-18;c.save();c.translate(cx,cy);c.fillStyle='rgba(0,0,0,.35)';c.beginPath();c.ellipse(0,6,20,4,0,0,TAU);c.fill();R(c,-18,-6,36,12,P.red);R(c,-12,-14,24,9,'#a8342a');R(c,-10,-12,20,5,'#9fd0ef');R(c,-18,4,6,4,P.ink);R(c,12,4,6,4,P.ink);R(c,-16,-3,5,3,'#ffd27a');R(c,11,-3,5,3,'#ffd27a');c.restore();
 const gx=24,gy=36;c.fillStyle='rgba(0,0,0,.55)';c.beginPath();c.arc(gx,gy,14,0,TAU);c.fill();c.save();c.translate(gx,gy);c.rotate(roll);R(c,-12,-.5,24,1.5,P.gold);c.restore();R(c,gx-14,gy,4,1,'#fff');R(c,gx+10,gy,4,1,'#fff');
 cmMark(c,'ROLL '+(-roll*180/Math.PI).toFixed(1)+'° (lags steering)',4,4,P.gold);cmMark(c,'steer '+(cur>0?'R ':'L ')+Math.abs(cur).toFixed(2),W-4,4,'#fff','rgba(0,0,0,.6)',6,'right');
}};
/* ---- round 2: CAMX-14 ---- */
const cm14hit=(a,b,r)=>{for(let i=0;i<=40;i++){const k=i/40,x=lerp(a[0],b[0],k),y=lerp(a[1],b[1],k);if(x>r[0]&&x<r[0]+r[2]&&y>r[1]&&y<r[1]+r[3])return [x,y]}return null};
DEMOS['CAMX-14']={d:9,f:(c,t)=>{R(c,0,0,W,H,'#1e2633');R(c,0,0,150,H,'#26303f');
for(let i=0;i<8;i++)R(c,0,i*18,150,1,'rgba(255,255,255,.05)');
const cov=[52,58,30,12];R(c,cov[0],cov[1],cov[2],cov[3],'#7a6a55');R(c,cov[0],cov[1],cov[2],2,'#9c8a70');
const E=[92,18];circ(c,E[0],E[1],5,'#ff8a7a');txt(c,'target',E[0]+16,E[1],'#ff8a7a',6);
const px=lerp(34,112,ease(seg(t,.05,.7))),P0=[px,100];
const sw=ease(seg(t,.78,.92)),side=lerp(1,-1,sw);const cam=[px+16*side,124];
cmLine(c,cam[0],cam[1],E[0],E[1],'rgba(143,180,255,.7)',1);
const hit=cm14hit(P0,E,cov);const blocked=!!hit;
c.setLineDash([3,2]);cmLine(c,P0[0],P0[1],hit?hit[0]:E[0],hit?hit[1]:E[1],blocked?'#ff8a7a':P.cyan,1.4);c.setLineDash([]);
if(hit){const[hx,hy]=hit;cmLine(c,hx-3,hy-3,hx+3,hy+3,'#ff8a7a',1.5);cmLine(c,hx-3,hy+3,hx+3,hy-3,'#ff8a7a',1.5)}
circ(c,P0[0],P0[1],5,P.cyan);circ(c,P0[0],P0[1]-1,2.4,P.skin);
c.fillStyle='#cfd6e2';c.beginPath();c.moveTo(cam[0],cam[1]-6);c.lineTo(cam[0]-4,cam[1]+3);c.lineTo(cam[0]+4,cam[1]+3);c.fill();txt(c,'cam',cam[0],cam[1]+8,'#cfd6e2',6);
cmMark(c,'blue = camera ray · dashed = muzzle ray',3,3,'#cfd6e2','rgba(0,0,0,.55)',5);
/* screen view */
const sx=152,sy=20,swd=84,sh=60;R(c,sx,sy,swd,sh,'#3a4a5f');R(c,sx,sy+sh*.62,swd,sh*.38,'#2b3644');
const ex=sx+swd/2,ey=sy+sh*.42;circ(c,ex,ey,4,'#ff8a7a');
const cx=sx+swd/2-side*14;const cvw=26*(1-clamp((px-40)/60))+4;if(px<96)R(c,cx-cvw/2+side*10,sy+sh*.45,cvw,sh*.55,'#7a6a55');
const rc=blocked?'#ff8a7a':P.cyan;ring(c,ex,ey,6,1.2,rc);R(c,ex-.5,ey-10,1,5,rc);R(c,ex-.5,ey+5,1,5,rc);R(c,ex-10,ey-.5,5,1,rc);R(c,ex+5,ey-.5,5,1,rc);
txt(c,'SCREEN',sx+swd/2,sy-6,'#9aa6b8',6);
cmMark(c,blocked?'MUZZLE BLOCKED':'clear shot',sx+swd/2,sy+sh+6,rc,'rgba(0,0,0,.6)',6,'center');
cmMark(c,side>0?'R shoulder':side<0?'L shoulder':'swap…',sx+swd/2,sy+sh+20,'#e9edf2','rgba(0,0,0,.6)',6,'center');
tl(c,t,[.78])}};

})();
