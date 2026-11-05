/* ===== batch2 demos — slow, no full-screen flashing, no luminance strobing ===== */
(()=>{
const room=c=>{R(c,0,0,W,H,'#2a3348');for(let i=0;i<6;i++)R(c,i*42,20,30,50,i%2?'#36415c':'#3c4866');R(c,0,96,W,39,'#4a3a32');R(c,0,96,W,1,'#6a5444')};
/* PP-12 glitch: RGB channel split + band offsets in short bursts; total luminance unchanged */
let GL=null;const glBase=()=>{const k=mk(W,H),g=k.getContext('2d');room(g);spr(g,'hero',80,96,{sx:3,sy:3});spr(g,'npc',165,96,{sx:3,sy:3});g.font='bold 10px monospace';g.fillStyle=P.cyan;g.textAlign='center';g.fillText('SIGNAL',120,12);
const d=g.getImageData(0,0,W,H),ch=[0,1,2].map(n=>{const kk=mk(W,H),gg=kk.getContext('2d'),dd=gg.createImageData(W,H);for(let i=0;i<d.data.length;i+=4){dd.data[i+n]=d.data[i+n];dd.data[i+3]=255}gg.putImageData(dd,0,0);return kk});return {k,ch}};
DEMOS['PP-12']={d:6,f:(c,t)=>{if(!GL)GL=glBase();const s=t*6;const burstA=(s>1.2&&s<1.95)||(s>3.6&&s<3.9)||(s>4.4&&s<4.8);const amt=burstA?1:0,q=Math.floor(s*12);
R(c,0,0,W,H,'#000');c.globalCompositeOperation='lighter';const off=amt?2+3*hash(q):0;c.drawImage(GL.ch[0],-off,0);c.drawImage(GL.ch[1],0,0);c.drawImage(GL.ch[2],off,0);c.globalCompositeOperation='source-over';
if(amt){for(let b=0;b<4;b++){const y=Math.floor(hash(q*7+b)*120),h=4+Math.floor(hash(q*3+b)*10),dx=Math.round((hash(q*5+b)-.5)*24);c.drawImage(GL.k,0,y,W,h,dx,y,W,h)}}
bar(c,6,126,60,4,amt?1:0,P.cyan);txt(c,'REC '+s.toFixed(1)+'s',234,6,'#e9edf2',7,'right');label(c,amt?'burst: split + band shift':'idle (no glitch)',150,128,amt?P.gold:'#9fb0c8')}};
/* PP-13 manga speed lines around a charging hero */
DEMOS['PP-13']={d:5,f:(c,t)=>{R(c,0,0,W,H,'#f4efe4');const on=ease(seg(t,.1,.25))*(1-ease(seg(t,.8,.95)));const cx=120,cy=72,q=Math.floor(t*5*10);c.fillStyle='#141a24';
for(let i=0;i<54;i++){const a=i/54*TAU+hash(q*31+i)*.08,len=(40+hash(q*17+i)*40)*on,r0=120-len*.9,w=.018+hash(i*3+q)*.02;if(on<.02)break;c.beginPath();c.moveTo(cx+Math.cos(a-w)*160,cy+Math.sin(a-w)*160);c.lineTo(cx+Math.cos(a)*Math.max(36,r0),cy+Math.sin(a)*Math.max(36,r0));c.lineTo(cx+Math.cos(a+w)*160,cy+Math.sin(a+w)*160);c.fill()}
const sc=3+on*.6;spr(c,'hero',cx,cy+18,{sx:sc,sy:sc});label(c,on>.5?'focus lines: reseed every 0.1 s':'calm',120,128,'#141a24')}};
/* FB-19 reticle bloom */
DEMOS['FB-19']={d:6,f:(c,t)=>{R(c,0,0,W,H,'#3a4257');R(c,40,20,160,90,'#56617d');R(c,40,20,160,90,null);const s=t*6,fire=s>.6&&s<2.8;let spread=0;const shots=[];for(let k=0;k<40;k++){const ts=.6+k*.08;if(ts>=2.8||ts>s)break;shots.push({ts,sp:Math.min(16,2+k*1.1)})}
if(shots.length){const last=shots[shots.length-1];spread=last.sp*Math.exp(-Math.max(0,s-last.ts-.15)*2.2)}else spread=2;spread=Math.max(2,spread);
shots.forEach((o,i)=>{const a=hash(i*13)*TAU,r=Math.sqrt(hash(i*7))*o.sp;R(c,120+Math.cos(a)*r-1,65+Math.sin(a)*r-1,2,2,'#1d2230')});
const g=4+spread;c.fillStyle=P.white;R(c,120-g-6,64,6,2);R(c,120+g,64,6,2);R(c,119,65-g-6,2,6);R(c,119,65+g,2,6);R(c,119,64,2,2,fire?P.gold:P.white);
bar(c,8,122,80,5,spread/16,P.orange);label(c,'spread',48,114);label(c,fire?'firing: +1.1 per shot':'recover: exp decay',170,124,fire?P.gold:P.cyan)}};
/* FB-20 aim assist: friction (slowdown) + magnetism (pull) vs none */
const aimPanel=(c,ox,t,assist)=>{R(c,ox,0,118,112,'#28324a');const tx=ox+59+26*Math.sin(t*TAU),ty=56;spr(c,'foe',tx,ty+9,{sx:2,sy:2});
let rx=ox+10,trail=[];for(let k=0;k<=40;k++){const tt=t-(.4*k/40);const stick=ox+10+((tt*1.6)%1+1)%1*98;let x=stick;if(assist){const d=stick-(ox+59+26*Math.sin(tt*TAU));const near=Math.exp(-(d*d)/180);x=stick-d*near*.55}trail.push(x);if(k===0)rx=x}
c.fillStyle='rgba(127,227,216,.35)';trail.forEach((x,i)=>R(c,x,ty-1+(i%2),1,1));ring(c,rx,ty,5,1,assist?P.cyan:P.white);R(c,rx,ty,1,1,P.white);label(c,assist?'friction + magnetism':'no assist',ox+59,8,assist?P.cyan:'#c8d0dc')};
DEMOS['FB-20']={d:5,f:(c,t)=>{R(c,0,0,W,H,'#141a24');aimPanel(c,1,t,false);aimPanel(c,121,t,true);label(c,'same input · assist slows + pulls near target',120,124)}};
/* FB-21 beat quantization */
DEMOS['FB-21']={d:8,f:(c,t)=>{R(c,0,0,W,H,'#1a1630');const bpm=120,s=t*8,beat=s*bpm/60,ph=beat%1;const pulse=Math.exp(-ph*5);
R(c,0,0,W,4,'rgba(154,90,209,'+(.25+.35*pulse)+')');const sc=1+.04*pulse;c.save();c.translate(60,50);c.scale(sc,sc);R(c,-22,-14,44,28,'#2d2550');txt(c,'♪',0,0,P.gold,14);c.restore();
const ins=[.3,1.15,1.7,2.55,3.4,3.62,4.9,5.3,6.1,7.05];const step=.25;txt(c,'input',8,98,'#c8d0dc',7,'left');txt(c,'FX',8,114,'#c8d0dc',7,'left');
const x=v=>40+(v-s+4)*24;for(let b=Math.floor((s-4)/.5)*.5;b<s+5;b+=.5){const X=x(b);if(X<36||X>W)continue;R(c,X,92,1,28,b%1?'#3a3260':'#6a5aa0')}R(c,x(s),88,1,36,P.white);
ins.forEach(v=>{const X=x(v);if(X<36||X>W)return;const qv=Math.ceil(v/step)*step,QX=x(qv);R(c,X-1,95,3,6,P.orange);c.strokeStyle='rgba(240,138,58,.5)';c.beginPath();c.moveTo(X,101);c.lineTo(QX,111);c.stroke();R(c,QX-2,110,5,6,P.cyan);
if(s>=qv&&s<qv+.6){const a=(s-qv)/.6;ring(c,170,50,6+a*26,2,'rgba(127,227,216,'+(1-a)+')')}if(s>=v&&s<v+.5)otxt(c,'12',150+(v*37%30),40-(s-v)*20,P.white,8)});
label(c,'number instant · ring snapped to 1/8 note',140,10,'#c8d0dc')}};
/* FB-22 weapon sway */
DEMOS['FB-22']={d:6,f:(c,t)=>{const s=t*6;const look=Math.sin(s*TAU/3)*60+Math.sin(s*TAU/1.5)*14;R(c,0,0,W,H,'#6d9cc0');for(let i=-2;i<9;i++){const x=((i*44-look)%(W+88)+W+88)%(W+88)-44;R(c,x,40,30,58,'#4f5f7a');R(c,x+4,46,8,8,'#a9c9dc')}R(c,0,98,W,37,'#5b6a4a');
const prev=Math.sin((s-.15)*TAU/3)*60+Math.sin((s-.15)*TAU/1.5)*14,vel=look-prev;const ox=clamp(-vel*.8,-14,14),oy=Math.abs(ox)*.25+Math.sin(s*TAU*.5)*1.5;
c.strokeStyle='rgba(255,255,255,.45)';c.setLineDash([2,2]);c.strokeRect(160,88,56,30);c.setLineDash([]);R(c,160+ox,88+oy,56,30,'#2b2f3a');R(c,150+ox,94+oy,18,8,'#3d4250');R(c,190+ox,110+oy,14,25,'#232630');
R(c,119,60,2,10,P.white);R(c,115,64,10,2,P.white);label(c,'crosshair fixed · weapon lags with spring',120,10,P.ink);label(c,'dashed = no-lag pose',188,82,P.ink)}};
/* VFX-21 voxel disintegration */
let VX=null;const vox=()=>{const k=sprCanvas('foe'),g=k.getContext('2d'),d=g.getImageData(0,0,k.width,k.height).data,out=[];for(let y=0;y<k.height;y++)for(let x=0;x<k.width;x++){const i=(y*k.width+x)*4;if(d[i+3]>0)out.push({x,y,col:`rgb(${d[i]},${d[i+1]},${d[i+2]})`,h:k.height})}return {out,w:k.width,h:k.height}};
DEMOS['VFX-21']={d:6,f:(c,t)=>{R(c,0,0,W,H,'#1b2232');R(c,0,108,W,27,'#2c3850');if(!VX)VX=vox();const S=7,ox=120-VX.w*S/2,oy=108-VX.h*S;const front=seg(t,.2,.75)*(VX.h+3),back=ease(seg(t,.85,1));
VX.out.forEach((v,i)=>{const row=VX.h-1-v.y;const lt=clamp((front-row-hash(i)*2)/3);const x=ox+v.x*S,y=oy+v.y*S;if(t>.85){c.globalAlpha=back;R(c,x,y,S-1,S-1,v.col);c.globalAlpha=1;return}
if(lt<=0){R(c,x,y,S-1,S-1,v.col);return}if(lt>=1)return;const dx=(hash(i*3)-.5)*30*lt,dy=-lt*lt*60,sz=(S-1)*(1-lt*.7);c.globalAlpha=1-lt;R(c,x+dx,y+dy,sz,sz,lt>.3?P.cyan:v.col);c.globalAlpha=1});
label(c,t<.2?'intact':t<.85?'bottom-up: cubes detach, rise, shrink':'respawn fade-in',120,124)}};
/* MATX-11 frosted glass */
const blurBg=(c,t)=>{R(c,0,0,W,H,'#1c2a40');for(let i=0;i<5;i++){const x=((t*90+i*60)%300)-30;circ(c,x,40+i*14,14,['#e0604a','#f2c94c','#5fd08a','#7fb2f0','#c37fe0'][i])}txt(c,'TEXT BEHIND',120,108,P.white,12)};
let FG=null;
DEMOS['MATX-11']={d:6,f:(c,t)=>{if(!FG)FG=mk(W,H);const g=FG.getContext('2d');blurBg(g,t);c.drawImage(FG,0,0);
[[24,.08,'rough 0.1'],[128,.5,'rough 0.6']].forEach(([x,r,lab])=>{const px=4+r*10;c.save();c.beginPath();c.rect(x,18,88,96);c.clip();c.filter=`blur(${px}px)`;c.drawImage(FG,0,0);c.filter='none';c.fillStyle='rgba(230,240,255,.18)';c.fillRect(x,18,88,96);c.restore();c.strokeStyle='rgba(255,255,255,.7)';c.strokeRect(x+.5,18.5,87,95);R(c,x+1,19,86,1,'rgba(255,255,255,.9)');label(c,lab,x+44,12)});label(c,'blur(background behind panel) + tint + rim',120,128)}};
/* A11Y-03 colour-blind simulation: colour-only vs colour+shape */
const deut=d=>{for(let i=0;i<d.length;i+=4){const r=d[i],g=d[i+1],b=d[i+2];d[i]=.367*r+.861*g-.228*b;d[i+1]=.280*r+.673*g+.047*b;d[i+2]=-.012*r+.043*g+.969*b}};
DEMOS['A11Y-03']={d:8,f:(c,t)=>{R(c,0,0,W,H,'#2a2f3a');const mark=(x,y,team,shape)=>{const col=team?'#3fbf4a':'#e0443a';if(!shape){circ(c,x,y,6,col);return}c.fillStyle=col;if(team){c.beginPath();c.moveTo(x,y-7);c.lineTo(x+7,y+6);c.lineTo(x-7,y+6);c.fill()}else R(c,x-6,y-6,12,12)};
for(let row=0;row<2;row++)for(let i=0;i<6;i++){const x=12+i*36+((t*36+i*7)%10),y=32+row*52;mark(x%228+6,y,i%2,row===1)}
label(c,'colour only',60,12);label(c,'colour + shape',60,64);R(c,0,121,W,14,'#141a24');
const half=Math.round(W/2),d=c.getImageData(half,0,W-half,121);deut(d.data);c.putImageData(d,half,0);R(c,half,0,1,121,P.white);label(c,'normal',60,128);label(c,'deuteranopia sim',180,128)}};
/* A11Y-04 flash limiter shown as a graph, scene brightening capped & slow */
DEMOS['A11Y-04']={d:8,f:(c,t)=>{const s=t*8;const ev=[.5,.7,.9,1.1,1.3,3.2,5,5.15,5.3,5.45,5.6,5.75];let req=0;ev.forEach(e=>{const a=s-e;if(a>=0&&a<.3)req=Math.max(req,1-a/.3)});
const win=ev.filter(e=>e<=s&&e>s-1);const allowed=[];ev.forEach(e=>{const w=allowed.filter(a=>a>e-1).length;if(w<3)allowed.push(e)});let lim=0;allowed.forEach(e=>{const a=s-e;if(a>=0&&a<.6)lim=Math.max(lim,.1*(1-a/.6))});
R(c,0,0,W,70,'#2a3348');R(c,0,56,W,14,'#3a2c26');spr(c,'hero',60,56,{sx:2,sy:2});circ(c,170,40,8+req*10,'rgba(240,138,58,'+(.3+.3*req)+')');R(c,0,0,W,70,'rgba(255,240,220,'+lim.toFixed(3)+')');
R(c,0,70,W,65,'#141a24');const gx=v=>10+(v-s+5)*22;for(let k=0;k<=110;k++){const v=s-5+k/22,X=gx(v);let r=0,l=0;ev.forEach(e=>{const a=v-e;if(a>=0&&a<.3)r=Math.max(r,1-a/.3)});allowed.forEach(e=>{const a=v-e;if(a>=0&&a<.6)l=Math.max(l,.3*(1-a/.6))});R(c,X,118-r*36,1,1,'#e0604a');R(c,X,118-l*36,1,2,P.cyan)}
R(c,gx(s),78,1,42,P.white);R(c,10,109,220,1,'rgba(255,255,255,.2)');txt(c,'requested',12,76,'#e0604a',7,'left');txt(c,'limited: ≤3 per 1 s, soft 0.6 s fade (demo dimmed)',12,128,P.cyan,7,'left');label(c,'flashes this second: '+win.length,180,76)}};
/* A11Y-05 comfort vignette + centre anchor */
DEMOS['A11Y-05']={d:8,f:(c,t)=>{const s=t*8,spd=clamp(.5-.5*Math.cos(s*TAU/4)),z=s*(.6+spd*2.4);R(c,0,0,W,H,'#6d9cc0');R(c,0,62,W,73,'#4a5a3a');c.strokeStyle='#7a8a5a';for(let i=0;i<10;i++){const p=((i/10+z)%1),y=62+p*p*73;c.beginPath();c.moveTo(0,y);c.lineTo(W,y);c.stroke()}
for(let k=-4;k<=4;k++){c.beginPath();c.moveTo(120+k*6,62);c.lineTo(120+k*80,H);c.stroke()}const v=spd;const g=c.createRadialGradient(120,67,lerp(110,34,v),120,67,lerp(140,95,v));g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,'+(.85*v).toFixed(3)+')');c.fillStyle=g;c.fillRect(0,0,W,H);
circ(c,120,67,2,P.white);bar(c,8,8,60,5,spd,P.orange);label(c,'speed',38,20);label(c,'vignette narrows with speed, eases 0.4 s',150,10);label(c,'centre dot = fixed anchor',120,128)}};
/* A11Y-06 high-contrast silhouettes with slow wipe */
DEMOS['A11Y-06']={d:8,f:(c,t)=>{const wipe=Math.round(120+80*Math.sin(t*TAU));const hx=60+20*Math.sin(t*TAU*2);
const draw=(hc)=>{if(!hc){c.drawImage(scene('eforest'),0,0);for(let i=0;i<30;i++)R(c,(i*37+t*60)%W,(i*23)%110,2,2,'rgba(255,240,180,.7)')}else{R(c,0,0,W,H,'#3a3a3a');R(c,0,96,W,39,'#4a4a4a')}
spr(c,'hero',hx,100,hc?{sx:2,sy:2,sil:'#3fa0ff'}:{sx:2,sy:2});spr(c,'foe',170,100,hc?{sx:2,sy:2,sil:'#ff3b3b'}:{sx:2,sy:2});spr(c,'coin',120,96,hc?{sx:2,sy:2,sil:'#ffd400'}:{sx:2,sy:2});R(c,196,104,26,6,hc?'#ff40ff':'#7a5034')};
draw(false);c.save();c.beginPath();c.rect(wipe,0,W-wipe,H);c.clip();draw(true);c.restore();R(c,wipe,0,1,H,P.white);label(c,'normal',wipe/2,8);label(c,'high contrast',(wipe+W)/2,8);label(c,'player blue · enemy red · pickup yellow · hazard magenta',120,128)}};
/* NAV-07 guiding wind (top-down) */
DEMOS['NAV-07']={d:8,f:(c,t)=>{R(c,0,0,W,H,'#4f8c42');const s=t*8;const tg=s<4?[212,22]:[30,112];const px=120,py=70;const want=Math.atan2(tg[1]-py,tg[0]-px);const prevT=s<4?[30,112]:[212,22],pw=Math.atan2(prevT[1]-py,prevT[0]-px);
const sm=ease(clamp((s%4)/.8));let da=want-pw;while(da>Math.PI)da-=TAU;while(da<-Math.PI)da+=TAU;const dir=pw+da*sm;const boost=1+2*ease(seg(s%4,.5,2))*(1-ease(seg(s%4,3,4)));
c.strokeStyle='#8fd06a';c.lineWidth=1;for(let i=0;i<120;i++){const x=hash(i)*W,y=hash(i+99)*H,sway=Math.sin(s*3+x*.05+y*.03)*.25,len=3+boost*1.6;const a=dir+sway;c.beginPath();c.moveTo(x,y);c.lineTo(x+Math.cos(a)*len,y+Math.sin(a)*len);c.stroke()}
for(let i=0;i<14;i++){const life=((s*.35+hash(i*5))%1),d=life*140*boost/2;const x=px+(hash(i*7)-.5)*80+Math.cos(dir)*d,y=py+(hash(i*11)-.5)*60+Math.sin(dir)*d;R(c,x,y,3,2,i%2?P.gold:P.orange)}
spr(c,'hero',px,py+8);ring(c,tg[0],tg[1],5,1,'rgba(255,255,255,.35)');label(c,'(target hidden in game)',tg[0]>120?180:60,tg[1]<60?tg[1]+12:tg[1]-12,'rgba(255,255,255,.6)');label(c,'wind = dir(player → target) · boost '+boost.toFixed(1)+'×',120,8)}};
/* NAV-08 detective-vision trail */
let DV=null;
DEMOS['NAV-08']={d:8,f:(c,t)=>{if(!DV)DV=mk(W,H);const g=DV.getContext('2d');g.drawImage(scene('eday'),0,0);R(g,150,40,10,72,P.stoneD);spr(g,'hero',30,112);spr(g,'foe',180,108);
const m=ease(seg(t,.15,.22))*(1-ease(seg(t,.85,.92)));c.drawImage(DV,0,0);if(m>0){c.save();c.globalAlpha=m;c.filter='grayscale(0.8) brightness(0.4)';c.drawImage(DV,0,0);c.filter='none';c.fillStyle='rgba(40,80,160,.35)';c.fillRect(0,0,W,H);c.restore();
const steps=[[44,114],[56,110],[68,114],[80,110],[92,114],[104,110],[116,114],[128,110],[140,114]];const n=Math.floor(clamp((t-.25)/.45)*steps.length);steps.forEach((p,i)=>{if(i<n){c.globalAlpha=m;R(c,p[0],p[1],5,3,'#ffb040');c.globalAlpha=1}});
c.globalAlpha=m;spr(c,'foe',180,108,{sil:'#ff6a6a'});c.strokeStyle=P.cyan;c.lineWidth=2;c.strokeRect(150-2,40-2,14,76);c.globalAlpha=1}
label(c,m>.5?'investigation: desat 80% · trail lights in sequence':'normal view',120,8,m>.5?P.cyan:P.white)}};
})();
