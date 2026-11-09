/* ===== Graphics demos (LGT/ENV/PP/NPR extensions) — local helpers gf* ===== */
(()=>{
const gfSat=v=>v<0?0:v>1?1:v;
const gfSS=(a,b,x)=>{const k=gfSat((x-a)/(b-a));return k*k*(3-2*k)};
const gfHex=h=>[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];
function gfTag(c,s,x,y,col='#e9edf2'){c.font='bold 7px monospace';const w=Math.ceil(c.measureText(s).width)+6;R(c,x-w/2,y-5,w,10,'rgba(10,14,24,.75)');txt(c,s,x,y,col,7)}
function gfDiv(c,x){R(c,x,0,1,H,'rgba(255,255,255,.85)')}
const gfLuma=(r,g,b)=>.2126*r+.7152*g+.0722*b;
function gfVN(x,y,s){const xi=Math.floor(x),yi=Math.floor(y),fx=x-xi,fy=y-yi,ux=fx*fx*(3-2*fx),uy=fy*fy*(3-2*fy);const h=(i,j)=>hash(i*31.7+j*97.1+s*13.3);return lerp(lerp(h(xi,yi),h(xi+1,yi),ux),lerp(h(xi,yi+1),h(xi+1,yi+1),ux),uy)}

/* ---------- LGT-15 komorebi: volumetric canopy shafts through misty forest ---------- */
DEMOS['LGT-15']={d:6,f:(c,t)=>{
  const sway=x=>Math.sin(t*TAU*1.2+x*.04)*2.4;
  const gapX=188+Math.sin(t*TAU)*.8,gapY=10+Math.cos(t*TAU*.5)*.4;
  const hx=lerp(48,168,(.5-.5*Math.cos(t*TAU))),hy=108+((Math.floor(t*22)%2)?-1:0);
  /* dark misty woodland + wet road receding toward bright opening */
  R(c,0,0,W,H,'#0c1410');
  const o=outData(c),d=o.data;
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){
    const mist=.08+gfVN(x*.04,y*.05,2.1)*.12+(y/H)*.1;
    let col=y<78?[12+mist*40,22+mist*55,16+mist*35]:[18+mist*30,28+mist*40,22+mist*28];
    /* asphalt road: curve from bottom-center toward bright right opening */
    const rd=y/H,cx=118+rd*52+Math.sin(rd*3.1)*6,hw=10+rd*22;
    if(y>42&&Math.abs(x-cx)<hw){const edge=1-Math.abs(x-cx)/hw;col=[28+edge*18,32+edge*16,36+edge*14];if(x>cx+hw*.55&&x<cx+hw*.72)col=[210,214,220]}
    /* distant glow near canopy opening */
    const glow=gfSS(70,8,Math.hypot(x-gapX,(y-gapY)*1.1));
    if(glow>0){col=[lerp(col[0],210,glow*.55),lerp(col[1],230,glow*.5),lerp(col[2],180,glow*.35)]}
    const p=(y*W+x)*4;d[p]=col[0];d[p+1]=col[1];d[p+2]=col[2];d[p+3]=255}
  blitData(c,o);
  /* dark trunks silhouetting the shafts */
  for(const[tx,ty,sc]of[[28,118,1.1],[58,122,1],[96,120,1.15],[132,124,.95],[168,118,1.05],[210,122,1.2]]){
    const sw=sway(tx);R(c,tx-2+sw*.2,ty-42*sc,4,42*sc,'#0a100c');R(c,tx-1+sw*.2,ty-42*sc,2,42*sc,'#152018')}
  /* leafy canopy; bright rim at the opening */
  for(const[tx,ty]of[[20,46],[50,38],[80,44],[110,36],[140,42],[170,34],[200,40],[225,36]])tree(c,tx,ty,sway(tx),'#1f4a28','#132e1a');
  for(const[lx,ly,r]of[[gapX-8,gapY+6,7],[gapX+4,gapY+10,6],[gapX-2,gapY+16,5],[gapX+10,gapY+4,5]]){
    const gr=c.createRadialGradient(lx+sway(lx)*.3,ly,0,lx,ly,r);gr.addColorStop(0,'rgba(160,210,90,.85)');gr.addColorStop(1,'rgba(60,110,40,0)');c.fillStyle=gr;c.beginPath();c.arc(lx,ly,r,0,TAU);c.fill()}
  /* hero shafts: 5 pale beams fan from canopy gap onto the road */
  const shafts=[];
  c.save();c.globalCompositeOperation='lighter';
  for(let i=0;i<5;i++){
    const a=.55+i*.16+Math.sin(t*TAU+i)*.035+sway(i*20)*.01,len=118+i*4;
    const x1=gapX+Math.cos(a)*len,y1=gapY+Math.sin(a)*len+8;
    const half=.028+i*.004;shafts.push([a,len,x1,y1,half]);
    const gr=c.createLinearGradient(gapX,gapY,x1,y1);
    gr.addColorStop(0,'rgba(255,248,220,.42)');gr.addColorStop(.45,'rgba(240,235,210,.18)');gr.addColorStop(1,'rgba(220,230,210,0)');
    c.fillStyle=gr;c.beginPath();c.moveTo(gapX,gapY);
    c.lineTo(gapX+Math.cos(a-half)*len,gapY+Math.sin(a-half)*len+8);
    c.lineTo(gapX+Math.cos(a+half)*len,gapY+Math.sin(a+half)*len+8);c.closePath();c.fill()}
  c.restore();
  /* elongated bright landings on the road (not round discs) */
  for(const[a,len,x1,y1]of shafts){
    const lx=gapX+Math.cos(a)*(len*.78),ly=Math.min(126,gapY+Math.sin(a)*(len*.78)+10);
    const gr=c.createRadialGradient(lx,ly,0,lx,ly,18);gr.addColorStop(0,'rgba(255,250,230,.55)');gr.addColorStop(.45,'rgba(230,235,210,.18)');gr.addColorStop(1,'rgba(200,210,190,0)');
    c.fillStyle=gr;c.beginPath();c.ellipse(lx,ly,16,5.5,a-.2,0,TAU);c.fill()}
  /* walker brightens while inside a shaft */
  let inShaft=0;for(const[a,len,,,half]of shafts){const dx=hx-gapX,dy=hy-14-gapY;const ang=Math.atan2(dy,dx),dist=Math.hypot(dx,dy);if(dist<len&&Math.abs(ang-a)<half*2.8)inShaft=Math.max(inShaft,1-Math.abs(ang-a)/(half*2.8))}
  shadow(c,hx,hy,6,.35);spr(c,'hero',hx,hy,{sx:1.55,sy:1.55,flip:Math.cos(t*TAU)>0,tint:'#fff6c8',tintA:inShaft*.55});
  /* soft mist veil so shafts read in air */
  c.fillStyle='rgba(180,200,190,.06)';c.fillRect(0,0,W,H);
  gfTag(c,'KOMOREBI',34,8,P.gold);gfTag(c,'SHAFTS',90,8,P.cyan);gfTag(c,'elongated landings',170,126,'#cfd8e3')}};

/* ---------- LGT-16 stained-glass LIGHT POOLS (not leaded image cells) ---------- */
DEMOS['LGT-16']={d:7,f:(c,t)=>{
  const o=outData(c),d=o.data,panes=[[40,18,28,48,[200,50,45]],[68,18,28,48,[50,70,200]],[96,18,28,48,[220,170,50]],[40,66,28,28,[60,140,90]],[68,66,28,28,[180,60,160]],[96,66,28,28,[90,180,210]]];
  const shift=Math.sin(t*TAU)*22;const hx=130+Math.sin(t*TAU*2)*8,hy=110;
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){
    let col;if(x<132&&y<100){/* stone wall + window */col=((x>>3)+(y>>3))&1?[92,88,80]:[78,74,68];
      for(const[px,py,pw,ph,pc]of panes){if(x>=px&&x<px+pw&&y>=py&&y<py+ph){const came=x===px||x===px+pw-1||y===py||y===py+ph-1||(x-px)%9===0||(y-py)%10===0;col=came?[18,16,14]:pc}}
    }else{/* floor */col=((x>>4)+(y>>3))&1?[118,112,100]:[104,98,88]}
    /* colour pools on floor matching panes, sliding */
    if(y>88){let pool=[0,0,0],w=0;for(const[px,py,pw,ph,pc]of panes){const cx=px+pw/2+shift+(py>50?8:-4),cy=108+(py>50?8:0),rr=16+pw*.2;const dd=Math.hypot(x-cx,(y-cy)*1.3);const a=gfSS(rr,2,dd);if(a>0){pool[0]+=pc[0]*a;pool[1]+=pc[1]*a;pool[2]+=pc[2]*a;w+=a}}
      if(w>0){const k=Math.min(1,w);col=[lerp(col[0],pool[0]/w,k*.85),lerp(col[1],pool[1]/w,k*.85),lerp(col[2],pool[2]/w,k*.85)]}}
    /* pools also tint figure */
    if(Math.abs(x-hx)<7&&y>hy-16&&y<hy){for(const[px,py,pw,ph,pc]of panes){const cx=px+pw/2+shift,cy=108,rr=18;const a=gfSS(rr,4,Math.hypot(hx-cx,0));if(a>.2){col=[lerp(col[0],pc[0],a*.5),lerp(col[1],pc[1],a*.5),lerp(col[2],pc[2],a*.5)]}}}
    const p=(y*W+x)*4;d[p]=col[0];d[p+1]=col[1];d[p+2]=col[2];d[p+3]=255}
  blitData(c,o);shadow(c,hx,hy,5);spr(c,'hero',hx,hy,{sx:1.5,sy:1.5});
  gfTag(c,'WINDOW',64,8,P.gold);gfTag(c,'FLOOR POOLS',180,8,P.cyan);gfTag(c,'not leaded cells',180,126,'#cfd8e3')}};

/* ---------- LGT-17 front-lit → back-lit blades with veins ---------- */
DEMOS['LGT-17']={d:6,f:(c,t)=>{
  const u=((t%1)+1)%1,back=u>.5;const ang=-.35+Math.sin(u*TAU)*.55;const lx=back?200:40,ly=30;
  R(c,0,0,W,H,back?'#1a2838':'#6fa8c0');R(c,0,100,W,35,P.grass);
  /* branch */
  c.save();c.translate(120,100);c.rotate(ang);R(c,-2,-4,4,-70,P.woodD);
  for(let i=0;i<9;i++){const by=-12-i*7,bx=(i%2?1:-1)*(6+i*.4);c.save();c.translate(bx*.2,by);c.rotate((i%2?1:-1)*.35);
    const blade=(gx,gy,w,h,side)=>{const lit=back&&side;c.fillStyle=lit?'#9ad46a':back?'#1e3a22':'#4a8a3a';c.beginPath();c.moveTo(0,0);c.lineTo(w,h*.35);c.lineTo(w*.15,h);c.closePath();c.fill();
      if(lit){c.strokeStyle='rgba(220,255,180,.85)';c.lineWidth=1;c.beginPath();c.moveTo(w*.15,2);c.lineTo(w*.55,h*.4);c.lineTo(w*.2,h*.85);c.stroke();
        for(let v=0;v<3;v++){c.beginPath();c.moveTo(w*.2+v,h*.25+v*8);c.lineTo(w*.45,h*.35+v*7);c.stroke()}}};
    blade(0,0,18+i%3,10+i%2,i%2===0);blade(0,0,-(16+i%2),9,i%2===1);c.restore()}
  c.restore();
  circ(c,lx,ly,5,P.gold);c.strokeStyle=P.gold;c.beginPath();c.moveTo(lx,ly);c.lineTo(120+Math.cos(ang-1.2)*40,70);c.stroke();
  gfTag(c,back?'BACK-LIT · veins glow':'FRONT-LIT · opaque',120,8,back?P.cyan:P.gold)}};

/* ---------- LGT-18 cool alley + warm key; LINKED | SEPARATE ---------- */
DEMOS['LGT-18']={d:6,f:(c,t)=>{
  for(const lane of[0,1]){const ox=lane*120,useLinked=lane===0&&t<.5;c.save();c.beginPath();c.rect(ox,0,120,H);c.clip();
    R(c,ox,0,120,H,'#2a4058');R(c,ox,0,28,H,'#1a2838');R(c,ox+92,0,28,H,'#1a2838');R(c,ox,100,120,35,'#3a4a58');
    for(let i=0;i<4;i++)R(c,ox+32,20+i*22,12,14,'#4a6078');
    const hx=ox+60,hy=108;c.fillStyle='rgba(80,140,200,.55)';c.fillRect(ox,0,120,H);
    if(useLinked){c.fillStyle='rgba(255,180,90,.25)';c.fillRect(ox,0,120,H);spr(c,'hero',hx,hy,{sx:1.8,sy:1.8})}
    else{spr(c,'hero',hx,hy,{sx:1.8,sy:1.8});const m=TMP(),g=m.getContext('2d');spr(g,'hero',hx,hy,{sx:1.8,sy:1.8});g.globalCompositeOperation='source-atop';g.fillStyle='rgba(255,170,70,.55)';g.fillRect(0,0,W,H);c.drawImage(m,0,0);
      const gr=c.createRadialGradient(hx-6,hy-14,0,hx-6,hy-14,22);gr.addColorStop(0,'rgba(255,200,120,.45)');gr.addColorStop(1,'rgba(255,160,80,0)');c.fillStyle=gr;c.fillRect(hx-28,hy-36,56,50)}
    c.restore()}
  gfDiv(c,120);gfTag(c,t<.5?'LINKED grade':'→ flip to SEPARATE',60,8,t<.5?P.gold:P.cyan);gfTag(c,'SEPARATE',180,8,P.cyan);gfTag(c,'cool alley',60,126);gfTag(c,'warm key only',180,126)}};

/* ---------- LGT-19 sky+bounce fill: cool tops, greenish undersides ---------- */
DEMOS['LGT-19']={d:5,f:(c,t)=>{
  const o=outData(c),d=o.data,skyPulse=.5+.5*Math.sin(t*TAU);
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){const sky=y<78;const p=(y*W+x)*4;if(sky){const u=y/78;d[p]=lerp(110+skyPulse*20,170+skyPulse*20,u);d[p+1]=lerp(160,205,u);d[p+2]=lerp(210,235,u)}else{const g=((x>>3)+(y>>3))&1;d[p]=g?90:78;d[p+1]=g?150:132;d[p+2]=g?70:58}d[p+3]=255}
  /* sphere with sky/bounce, weak drifting fill (no hard key) */
  const cx=80,cy=72,rad=28,ka=t*TAU*.5,key=[Math.sin(ka)*.2,.35,.85];
  for(let y=cy-rad;y<=cy+rad;y++)for(let x=cx-rad;x<=cx+rad;x++){const nx=(x-cx)/rad,ny=(cy-y)/rad,q=nx*nx+ny*ny;if(q>1)continue;const nz=Math.sqrt(1-q);const nd=Math.max(0,nx*key[0]+ny*key[1]+nz*key[2])*.22;
    const skyT=Math.max(0,ny)*(.45+.2*skyPulse),bounce=Math.max(0,-ny)*.65;const r=140*nd+90*skyT+40*bounce,g=150*nd+110*skyT+110*bounce,b=170*nd+180*skyT+55*bounce;const p=(y*W+x)*4;d[p]=r;d[p+1]=g;d[p+2]=b;d[p+3]=255}
  blitData(c,o);const hx=160+Math.sin(t*TAU)*16;shadow(c,hx,105,7);spr(c,'hero',hx,105,{sx:2.2,sy:2.2,flip:Math.cos(t*TAU)>0});
  /* tint hero: cool top / green underside via overlay strips */
  const m=TMP(),g=m.getContext('2d');spr(g,'hero',hx,105,{sx:2.2,sy:2.2,flip:Math.cos(t*TAU)>0});g.globalCompositeOperation='source-atop';
  const gr=g.createLinearGradient(0,80,0,105);gr.addColorStop(0,'rgba(140,180,230,.45)');gr.addColorStop(.55,'rgba(255,255,255,0)');gr.addColorStop(1,'rgba(90,160,80,.5)');g.fillStyle=gr;g.fillRect(0,0,W,H);c.drawImage(m,0,0);
  gfTag(c,'NO HARD KEY',40,8,P.cyan);gfTag(c,'cool top · green bounce',160,8,P.gold)}};

/* ---------- ENV-21 sun sparkles on waves (not floor caustics) ---------- */
DEMOS['ENV-21']={d:5,f:(c,t)=>{
  const o=outData(c),d=o.data,ph=t*TAU,sun=[200,28];
  for(let y=0;y<H;y++){const edge=gfSat((y-20)/90); /* deeper mid, calmer near shore y~H */
    const calm=gfSat((y-100)/30); /* fewer glints near bottom edge */
    for(let x=0;x<W;x++){const wave=Math.sin(x*.11+ph*1.2+y*.07)+.55*Math.sin(x*.23-ph*1.6+y*.13);const deep=lerp([40,100,160],[20,60,110],edge);let col=[deep[0]+wave*8,deep[1]+wave*10,deep[2]+wave*6];
      /* sun path sparkles */
      const toward=Math.hypot(x-sun[0],y-sun[1]);const band=Math.abs((x-sun[0])*.35-(y-sun[1]))<6+toward*.02;const glitter=band&&wave>.85&&hash(x*13+y*7+Math.floor(t*40))>.55&&calm<.85;
      if(glitter){const a=1-calm;col=[lerp(col[0],255,a),lerp(col[1],250,a),lerp(col[2],220,a)]}
      if(y>118)col=lerp(col,[210,190,140],gfSat((y-118)/16)); /* sand edge */
      const p=(y*W+x)*4;d[p]=col[0];d[p+1]=col[1];d[p+2]=col[2];d[p+3]=255}}
  blitData(c,o);circ(c,sun[0],sun[1],6,'#fff6c8');circ(c,sun[0],sun[1],3,'#fff');
  gfTag(c,'SUN PATH GLINTS',50,8,P.gold);gfTag(c,'calmer near shore',170,126,P.cyan)}};

/* ---------- PP-14 OFF | BYPASS (hard blacks, reduced sat, colour kept) ---------- */
DEMOS['PP-14']={d:5,f:(c,t)=>{
  const s=imgData('eday').data,o=outData(c),d=o.data,half=W/2,on=t>.12,hx=50+Math.sin(t*TAU)*18;
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=(y*W+x)*4;let r=s[i],g=s[i+1],b=s[i+2];
    if(x>=half&&on){const L=gfLuma(r,g,b);const sat=.55;r=lerp(L,r,sat);g=lerp(L,g,sat);b=lerp(L,b,sat); /* crush blacks */const crush=gfSS(40,0,L);r*=1-crush*.55;g*=1-crush*.55;b*=1-crush*.5;r=Math.min(255,r*1.05+8);g=Math.min(255,g*1.02);b=Math.min(255,b*.98)}
    d[i]=r;d[i+1]=g;d[i+2]=b;d[i+3]=255}
  blitData(c,o);spr(c,'hero',hx,90,{sx:1.5,sy:1.5,flip:Math.cos(t*TAU)>0});spr(c,'hero',hx+half,90,{sx:1.5,sy:1.5,flip:Math.cos(t*TAU)>0});
  gfDiv(c,half);gfTag(c,'OFF',half/2,8);gfTag(c,'BYPASS',half*1.5,8,P.cyan)}};

/* ---------- PP-15 selective colour: one red coat/umbrella ---------- */
DEMOS['PP-15']={d:5,f:(c,t)=>{
  const on=t>.35&&t<.85;R(c,0,0,W,H,'#7a8490');R(c,0,95,W,40,'#5e666e');for(let i=0;i<8;i++)R(c,i*32,20,18,50,i%2?'#6a7380':'#74808c');
  const hx=lerp(30,200,(.5-.5*Math.cos(t*TAU))),hy=100;
  /* umbrella + coat in red */
  c.fillStyle=P.red;c.beginPath();c.ellipse(hx,hy-22,16,7,0,Math.PI,TAU);c.fill();R(c,hx-1,hy-22,2,14,P.woodD);
  spr(c,'hero',hx,hy,{sx:1.6,sy:1.6,flip:Math.cos(t*TAU)>0});R(c,hx-5,hy-12,10,8,P.red); /* coat overlay */
  if(on){const id=c.getImageData(0,0,W,H),d=id.data;for(let i=0;i<d.length;i+=4){const r=d[i],g=d[i+1],b=d[i+2];if(!(r>g*1.35&&r>b*1.25&&r>90)){const L=gfLuma(r,g,b);d[i]=L;d[i+1]=L;d[i+2]=L}}c.putImageData(id,0,0)}
  /* HUD unfiltered */
  R(c,6,6,54,16,'rgba(10,14,24,.8)');txt(c,'HP ████',32,14,P.cyan,7);R(c,W-50,6,44,16,'rgba(10,14,24,.8)');txt(c,'12:00',W-28,14,'#e9edf2',7);
  gfTag(c,on?'SELECTIVE RED':'FULL COLOUR',120,126,on?P.red:P.gold)}};

/* ---------- PP-16 glass shards with flipped/offset scene copies ---------- */
DEMOS['PP-16']={d:5,f:(c,t)=>{
  c.drawImage(scene('day'),0,0);const src=TMP(),g=src.getContext('2d');g.drawImage(c.canvas,0,0,W,H);
  const shards=[[W-38,12,34,50,-1,.08],[W-52,70,48,40,1,-.06],[W-28,100,26,30,-1,.12]];
  shards.forEach((sh,i)=>{const[x,y,w,h,flip,off]=sh;const ox=Math.sin(t*TAU+i)*6+off*40;c.save();c.beginPath();
    if(i===0){c.moveTo(x,y);c.lineTo(x+w,y+8);c.lineTo(x+w-4,y+h);c.lineTo(x+2,y+h-6)}
    else if(i===1){c.moveTo(x+4,y);c.lineTo(x+w,y+4);c.lineTo(x+w-6,y+h);c.lineTo(x,y+h-2)}
    else{c.moveTo(x,y+4);c.lineTo(x+w,y);c.lineTo(x+w-2,y+h);c.lineTo(x+2,y+h)}
    c.closePath();c.clip();c.translate(x+w/2+ox,y+h/2);c.scale(flip,1);c.drawImage(src,-(x+w/2)+ox*flip,-(y+h/2),W,H);c.restore();
    c.strokeStyle='rgba(200,230,255,.7)';c.lineWidth=1;c.beginPath();if(i===0){c.moveTo(x,y);c.lineTo(x+w,y+8);c.lineTo(x+w-4,y+h);c.lineTo(x+2,y+h-6)}
    else if(i===1){c.moveTo(x+4,y);c.lineTo(x+w,y+4);c.lineTo(x+w-6,y+h);c.lineTo(x,y+h-2)}
    else{c.moveTo(x,y+4);c.lineTo(x+w,y);c.lineTo(x+w-2,y+h);c.lineTo(x+2,y+h)}c.closePath();c.stroke()});
  gfTag(c,'GLASS SHARDS',50,8,P.cyan);gfTag(c,'flipped · offset',170,8)}};

/* ---------- PP-17 OFF | X-PRO (cyan shadows / yellow highlights) ---------- */
DEMOS['PP-17']={d:5,f:(c,t)=>{
  const s=imgData('eday').data,o=outData(c),d=o.data,half=W/2,amt=.55+.45*Math.sin(t*TAU);
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=(y*W+x)*4;let r=s[i],g=s[i+1],b=s[i+2];
    if(x>=half){const L=gfLuma(r,g,b)/255;const sh=gfSS(.45,0,L)*amt,hi=gfSS(.55,1,L)*amt;r=r*(1-sh*.15)+40*sh+hi*50;g=g*(1-sh*.05)+90*sh+hi*40;b=b+sh*70-hi*30;r=clamp(r,0,255);g=clamp(g,0,255);b=clamp(b,0,255)}
    d[i]=r;d[i+1]=g;d[i+2]=b;d[i+3]=255}
  blitData(c,o);spr(c,'hero',half/2,100,{sx:1.4,sy:1.4});spr(c,'hero',half*1.5,100,{sx:1.4,sy:1.4});
  gfDiv(c,half);gfTag(c,'OFF',half/2,8);gfTag(c,'X-PRO',half*1.5,8,P.gold);
  R(c,half+8,H-14,20,6,'#3a8a9a');R(c,half+32,H-14,20,6,'#e8d060');txt(c,'sh',half+18,H-20,'#cfd8e3',5);txt(c,'hi',half+42,H-20,'#cfd8e3',5)}};

/* ---------- PP-18 NVG toggle ---------- */
DEMOS['PP-18']={d:6,f:(c,t)=>{
  const ph=Math.floor(t*3)%3; /* 0 dark, 1 green NVG, 2 white phosphor */
  c.drawImage(scene('enight'),0,0);R(c,0,0,W,H,'rgba(0,0,10,.55)');
  const lx=70,ly=50;circ(c,lx,ly,3,'#ffd080');R(c,150,60,8,6,'#ff9060'); /* practicals */
  if(ph===0){gfTag(c,'DARK',40,8);gfTag(c,'naked eye',140,8)}
  else{const id=c.getImageData(0,0,W,H),d=id.data,fr=Math.floor(t*48);
    for(let i=0;i<d.length;i+=4){const L=gfLuma(d[i],d[i+1],d[i+2]);const n=(hash(i*.01+fr)-.5)*28;let v=L*1.35+n;if(ph===1){d[i]=v*.15;d[i+1]=Math.min(255,v*1.1);d[i+2]=v*.2}else{d[i]=Math.min(255,v*.95);d[i+1]=Math.min(255,v);d[i+2]=Math.min(255,v*.9)}}
    c.putImageData(id,0,0);c.save();c.globalCompositeOperation='lighter';
    for(const[x,y,r]of[[lx,ly,28],[154,63,18]]){const gr=c.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,ph===1?'rgba(180,255,160,.7)':'rgba(255,255,240,.65)');gr.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=gr;c.fillRect(x-r,y-r,2*r,2*r)}c.restore();
    gfTag(c,ph===1?'NVG GREEN':'WHITE PHOSPHOR',70,8,P.cyan);gfTag(c,'bloom + grain',180,8)}
  spr(c,'hero',120,100,{sx:1.5,sy:1.5})}};

/* ---------- PP-19 THERMAL: hot dark kettle vs cold bright lamp ---------- */
DEMOS['PP-19']={d:6,f:(c,t)=>{
  const on=t>.4;R(c,0,0,W,H,'#2a3040');R(c,0,100,W,35,'#3a4050');
  /* bright cold lamp */circ(c,50,40,10,'#fff8e0');circ(c,50,40,4,'#fff');const gr=c.createRadialGradient(50,40,0,50,40,30);gr.addColorStop(0,'rgba(255,240,200,.5)');gr.addColorStop(1,'rgba(255,200,100,0)');c.fillStyle=gr;c.fillRect(20,10,60,60);
  /* dark hot kettle */R(c,100,78,22,22,'#1a1a1e');R(c,104,72,14,8,'#222');R(c,118,80,8,4,'#1a1a1e');
  spr(c,'hero',180,105,{sx:1.8,sy:1.8});
  if(on){const id=c.getImageData(0,0,W,H),d=id.data;
    /* heat map: kettle hottest, person warm, lamp cold (dim), walls cool */
    for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=(y*W+x)*4;const L=gfLuma(d[i],d[i+1],d[i+2]);
      let heat=.15;const inKettle=x>=100&&x<122&&y>=72&&y<100;const inLamp=Math.hypot(x-50,y-40)<14;const inHero=Math.abs(x-180)<10&&y>85&&y<108;
      if(inKettle)heat=.95;else if(inHero)heat=.7+hash(x+y)*.05;else if(inLamp)heat=.12;else heat=.2+L/255*.15;
      /* white-hot palette */const v=heat;let r,g,b;if(v<.25){r=0;g=0;b=lerp(40,180,v/.25)}else if(v<.5){r=0;g=lerp(0,255,(v-.25)/.25);b=255}else if(v<.75){r=lerp(0,255,(v-.5)/.25);g=255;b=lerp(255,0,(v-.5)/.25)}else{r=255;g=lerp(255,255,(v-.75)/.25);b=lerp(0,255,(v-.75)/.25)}
      d[i]=r;d[i+1]=g;d[i+2]=b}c.putImageData(id,0,0);
    gfTag(c,'THERMAL',40,8,P.gold);gfTag(c,'hot kettle bright',120,8,P.cyan);gfTag(c,'cold lamp dim',200,126,P.cyan)}
  else{gfTag(c,'VISIBLE',40,8);gfTag(c,'dark kettle · bright lamp',150,8)}}};

/* ---------- PP-20 Aerochrome: trees magenta, green-painted crate stays ---------- */
DEMOS['PP-20']={d:6,f:(c,t)=>{
  const on=t>.35&&t<.85;R(c,0,0,W,H,P.sky);R(c,0,95,W,40,P.grass);path(c);
  for(const[x,y]of[[40,90],[90,100],[200,95],[160,110]])tree(c,x,y);
  /* green-painted crate */R(c,118,88,28,20,'#3a9a4a');R(c,118,88,28,3,'#2e7a3a');R(c,131,88,2,20,'#2e7a3a');txt(c,'PAINT',132,98,'#e8ffe8',5);
  spr(c,'hero',70,105,{sx:1.4,sy:1.4});
  if(on){const id=c.getImageData(0,0,W,H),d=id.data;
    for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=(y*W+x)*4;const r=d[i],g=d[i+1],b=d[i+2];
      const isCrate=x>=118&&x<146&&y>=88&&y<108;const isTreeGreen=!isCrate&&g>r*1.05&&g>b*1.05&&g>60&&y<110;
      if(isTreeGreen){d[i]=Math.min(255,r*.4+g*1.1);d[i+1]=g*.35;d[i+2]=Math.min(255,b*.5+g*.6)} /* magenta/red foliage */
      else if(isCrate){/* keep green distinct */d[i]=r*.85;d[i+1]=Math.min(255,g*1.05);d[i+2]=b*.7}}
    c.putImageData(id,0,0);gfTag(c,'AEROCHROME',50,8,P.red);gfTag(c,'crate stays green',170,8,P.cyan)}
  else gfTag(c,'OFF · full colour',80,8,P.gold)}};

/* ---------- PP-21 film weave in framed window; HUD/letterbox still ---------- */
DEMOS['PP-21']={d:4,f:(c,t)=>{
  R(c,0,0,W,H,P.ink);R(c,0,0,W,14,'#0a0e18');R(c,0,H-14,W,14,'#0a0e18'); /* letterbox */
  const weaveX=Math.sin(t*TAU*2)*.8,weaveY=Math.sin(t*TAU*2.7+.4)*.6; /* low amplitude */
  c.save();c.beginPath();c.rect(20,18,200,99);c.clip();c.translate(weaveX,weaveY);c.drawImage(scene('day'),0,0);c.restore();
  R(c,18,16,204,2,'#cfd8e3');R(c,18,117,204,2,'#cfd8e3');R(c,18,16,2,103,'#cfd8e3');R(c,220,16,2,103,'#cfd8e3');
  /* HUD fixed */txt(c,'REC ●',40,7,P.red,6);txt(c,'00:12:04',200,7,'#e9edf2',6);txt(c,'FILM WINDOW WEAVES',120,H-7,'#9aa6b8',6);
  gfTag(c,'weave ±1px',120,28,P.cyan)}};

/* ---------- NPR-15 sumi-e ---------- */
DEMOS['NPR-15']={d:7,f:(c,t)=>{
  R(c,0,0,W,H,'#f2ead8'); /* paper */
  /* distant hills reserved wash */c.globalAlpha=.35;c.fillStyle='#2a3038';c.beginPath();c.moveTo(0,70);for(let x=0;x<=W;x+=4)c.lineTo(x,62+Math.sin(x*.04)*6+Math.sin(x*.11)*3);c.lineTo(W,H);c.lineTo(0,H);c.fill();c.globalAlpha=1;
  /* pine */c.strokeStyle='#1a1e24';c.lineWidth=2;c.beginPath();c.moveTo(70,110);c.lineTo(70,40);c.stroke();
  for(let i=0;i<6;i++){const y=45+i*10,w=18-i*2;c.beginPath();c.moveTo(70,y);c.quadraticCurveTo(70-w,y+4,70-w-4,y+8);c.moveTo(70,y);c.quadraticCurveTo(70+w,y+4,70+w+4,y+8);c.stroke()}
  /* figure dissolving into paper */const hx=160,hy=105,fade=ease(seg(t,.2,.85));c.globalAlpha=1-fade*.85;spr(c,'hero',hx,hy,{sx:1.8,sy:1.8,sil:'#1a1e24'});c.globalAlpha=1;
  /* ink splash strokes */c.strokeStyle='rgba(20,24,30,'+(0.4+0.3*Math.sin(t*TAU))+')';c.lineWidth=1.5;for(let i=0;i<5;i++){const x=100+hash(i)*100,y=30+hash(i+3)*40;c.beginPath();c.moveTo(x,y);c.quadraticCurveTo(x+10,y+hash(i)*20,x+20+hash(i+1)*10,y+8);c.stroke()}
  /* reserved white */R(c,190,20,30,25,'#f2ead8');gfTag(c,'SUMI-E',40,8,'#1a1e24');gfTag(c,'figure → paper',170,8,'#1a1e24')}};

/* ---------- NPR-16 ukiyo-e (flat fields, key line, bokashi, misregister) ---------- */
DEMOS['NPR-16']={d:6,f:(c,t)=>{
  const mis=Math.sin(t*TAU)*.8; /* plate misregister */
  /* sky bokashi */for(let y=0;y<70;y++){const u=y/70;R(c,0,y,W,1,'rgb('+Math.round(lerp(110,220,u))+','+Math.round(lerp(150,230,u))+','+Math.round(lerp(200,235,u))+')')}
  R(c,0,70,W,65,'#d8c08a'); /* ground flat */
  /* Mt shape flat */c.fillStyle='#e8eef2';c.beginPath();c.moveTo(40,70);c.lineTo(100,28);c.lineTo(160,70);c.fill();
  c.fillStyle='#3a6a9a';c.beginPath();c.moveTo(160,70);c.lineTo(200,40);c.lineTo(240,70);c.fill();
  /* figure flat colour + key line with misregister */const hx=120+mis,hy=105;
  R(c,hx-6,hy-16,12,10,'#e8b898');R(c,hx-7,hy-8,14,12,P.blue);R(c,hx-5,hy-18,10,4,P.woodD);
  c.strokeStyle='#1a1a20';c.lineWidth=1.2;c.strokeRect(hx-6+mis*.5,hy-16,12,10);c.strokeRect(hx-7-mis*.5,hy-8,14,12);
  gfTag(c,'UKIYO-E',40,8,'#1a1a20');gfTag(c,'bokashi + misregister',170,8,'#1a1a20')}};

/* ---------- NPR-17 impasto ---------- */
DEMOS['NPR-17']={d:5,f:(c,t)=>{
  R(c,0,0,W,H,'#3a342c');const cx=120,cy=70,rad=40,a=t*TAU;
  for(let i=0;i<120;i++){const ang=hash(i)*TAU,rr=hash(i+2)*rad,nx=Math.cos(ang),ny=Math.sin(ang);const x=cx+nx*rr,y=cy+ny*rr*.9;
    const nd=Math.max(0,nx*Math.cos(a)*.7+ny*.4+.3);const len=4+nd*5;const thick=2+nd*2;
    const col=nd>.5?P.orange:nd>.25?P.gold:'#8a5030';
    c.save();c.translate(x,y);c.rotate(Math.atan2(ny,nx)+.5);R(c,0,-thick/2,len,thick,col);
    /* specular ridge on thick paint */if(nd>.55){R(c,1,-1,len*.5,1,'rgba(255,240,200,.7)')}c.restore()}
  gfTag(c,'IMPASTO',40,8,P.gold);gfTag(c,'form strokes + ridge',160,8,P.cyan)}};

/* ---------- NPR-18 riso pink+blue plates ---------- */
DEMOS['NPR-18']={d:5,f:(c,t)=>{
  R(c,0,0,W,H,'#f4f0e8');const ox=1+Math.sin(t*TAU)*1.5,oy=Math.cos(t*TAU)*.8;
  const draw=(dx,dy,col,a)=>{c.save();c.globalAlpha=a;c.translate(dx,dy);c.fillStyle=col;c.beginPath();c.arc(90,70,28,0,TAU);c.fill();R(c,140,50,40,50,col);spr(c,'hero',200,100,{sx:1.8,sy:1.8,sil:col});c.restore()};
  draw(-ox,-oy,'#ff5a9a',.75);draw(ox,oy,'#3a7ad8',.7);
  /* grain */const id=c.getImageData(0,0,W,H),d=id.data,fr=Math.floor(t*24);for(let i=0;i<d.length;i+=4){if(hash(i+fr)>.82){d[i]=Math.min(255,d[i]+20);d[i+1]=Math.min(255,d[i+1]+15);d[i+2]=Math.min(255,d[i+2]+10)}}c.putImageData(id,0,0);
  gfTag(c,'RISO',30,8,'#1a1a20');gfTag(c,'pink + blue offset',140,8,'#1a1a20')}};

/* ---------- NPR-19 papercraft layers ---------- */
DEMOS['NPR-19']={d:5,f:(c,t)=>{
  R(c,0,0,W,H,'#d8e4f0');const bob=Math.sin(t*TAU)*3;
  const layers=[[0,40,W,95,'#7eb86a',0],[20,55,200,70,'#e8d090',1],[50,70,140,50,'#c07050',2],[90,80+bob,60,40,'#f0c69a',3]];
  layers.forEach(([x,y,w,h,col,z])=>{R(c,x+3,y+4,w,h,'rgba(20,30,40,'+(0.15+z*.08)+')');R(c,x,y,w,h,col);R(c,x,y,w,2,'rgba(255,255,255,.35)');R(c,x,y+h-2,w,2,'rgba(0,0,0,.12)')});
  spr(c,'hero',120,110+bob,{sx:1.5,sy:1.5});
  gfTag(c,'PAPERCRAFT',50,8,'#1a2030');gfTag(c,'drop shadows',170,8)}};

/* ---------- NPR-20 stained-glass CELLS (leaded came) — not floor pools ---------- */
DEMOS['NPR-20']={d:6,f:(c,t)=>{
  R(c,0,0,W,H,'#1a1420');const pulse=.7+.3*Math.sin(t*TAU);
  /* rose window cells */const cx=80,cy=68,cells=[];for(let i=0;i<12;i++){const a=i/12*TAU,cols=[[200,50,50],[50,70,200],[220,180,50],[60,160,100],[160,60,180],[90,180,210]];cells.push([cx+Math.cos(a)*28,cy+Math.sin(a)*28,10,cols[i%6]])}
  cells.push([cx,cy,14,[240,220,160]]);
  cells.forEach(([x,y,r,col])=>{circ(c,x,y,r+1,'#0a080c');circ(c,x,y,r,'rgb('+col.map(v=>Math.min(255,v*pulse|0))+')')});
  /* came lines */c.strokeStyle='#0a080c';c.lineWidth=2;for(let i=0;i<12;i++){const a=i/12*TAU;c.beginPath();c.moveTo(cx,cy);c.lineTo(cx+Math.cos(a)*38,cy+Math.sin(a)*38);c.stroke()}ring(c,cx,cy,38,2,'#0a080c');
  /* character as leaded cells */const hx=180,hy=95;const parts=[[0,-14,6,[240,200,160]],[-5,-4,5,[200,60,50]],[5,-4,5,[200,60,50]],[0,4,6,[200,60,50]],[-4,12,4,[80,50,40]],[4,12,4,[80,50,40]]];
  parts.forEach(([dx,dy,r,col])=>{circ(c,hx+dx,hy+dy,r+1,'#0a080c');circ(c,hx+dx,hy+dy,r,'rgb('+col.map(v=>v*pulse|0)+')')});
  gfTag(c,'LEADED CELLS',50,8,P.gold);gfTag(c,'glow + came',180,8,P.cyan)}};

/* ---------- NPR-21 SWATCH vs MULTIPLY BLACK by material ---------- */
DEMOS['NPR-21']={d:6,f:(c,t)=>{
  const L=[Math.cos(t*TAU)*.8,.3,Math.sin(t*TAU)*.5],mats=[['SKIN',[240,180,140],[140,60,40]],['CLOTH',[70,90,160],[20,30,80]],['LEAF',[90,160,70],[30,70,50]]];
  for(const lane of[0,1]){const ox=lane*120;c.save();c.beginPath();c.rect(ox,0,120,H);c.clip();R(c,ox,0,120,H,'#2a3040');
    mats.forEach((m,i)=>{const cy=28+i*36,cx=ox+60,rad=14;const [name,lit,sh]=m;
      for(let y=-rad;y<=rad;y++)for(let x=-rad;x<=rad;x++){if(x*x+y*y>rad*rad)continue;const nx=x/rad,ny=-y/rad,nz=Math.sqrt(Math.max(0,1-nx*nx-ny*ny));const nd=nx*L[0]+ny*L[1]+nz*L[2];
        let col;if(!lane){/* SWATCH: hard shadow colour */col=nd>0?lit:sh}else{/* MULTIPLY BLACK: lit * shadow-as-mul */const k=nd>0?1:.35;const mul=nd>0?[1,1,1]:[sh[0]/80,sh[1]/80,sh[2]/80];col=[lit[0]*k*mul[0],lit[1]*k*mul[1],lit[2]*k*mul[2]]}
        R(c,cx+x,cy+y,1,1,'rgb('+col.map(v=>clamp(v,0,255)|0)+')')}
      txt(c,name,cx,cy+20,'#cfd8e3',5)});
    c.restore()}
  gfDiv(c,120);gfTag(c,'SWATCH',60,8,P.gold);gfTag(c,'MULTIPLY BLACK',180,8,P.cyan);
  txt(c,'rust',60,126,'#c07050',5);txt(c,'indigo',120,126,'#5060a0',5);txt(c,'cool green',190,126,'#508050',5)}};

/* ---------- NPR-22 CORE band at terminator ---------- */
DEMOS['NPR-22']={d:5,f:(c,t)=>{
  const o=outData(c),d=o.data,a=t*TAU,L=[Math.cos(a)*.9,.2,Math.sin(a)*.4];
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){const p=(y*W+x)*4;d[p]=40;d[p+1]=44;d[p+2]=56;d[p+3]=255}
  const balls=[[80,70,36],[175,72,32]];
  for(const[cx,cy,rad]of balls){for(let y=cy-rad;y<=cy+rad;y++)for(let x=cx-rad;x<=cx+rad;x++){const nx=(x-cx)/rad,ny=(cy-y)/rad,q=nx*nx+ny*ny;if(q>1)continue;const nz=Math.sqrt(1-q);const nd=nx*L[0]+ny*L[1]+nz*L[2];
    let col;const core=nd>-.08&&nd<.12;
    if(core)col=[220,90,70];else if(nd>0){const k=.35+.65*nd;col=[240*k,190*k,160*k]}else{const k=.2;col=[80*k,50*k,45*k]}
    const p=(y*W+x)*4;d[p]=col[0];d[p+1]=col[1];d[p+2]=col[2];d[p+3]=255}}
  blitData(c,o);
  for(const[cx,cy,rad]of balls)gfTag(c,'CORE',cx+Math.cos(a)*rad*.85,cy-8,P.gold);
  gfTag(c,'CORE BAND',40,8,P.gold);gfTag(c,'at terminator',160,8,P.cyan)}};

/* ---------- NPR-23 CAVITY vs AUTHORED face shadows ---------- */
DEMOS['NPR-23']={d:6,f:(c,t)=>{
  const sway=Math.sin(t*TAU)*4,blink=Math.sin(t*TAU*2)>.85;
  for(const lane of[0,1]){const ox=lane*120;c.save();c.beginPath();c.rect(ox,0,120,H);c.clip();R(c,ox,0,120,H,'#3a4558');
    const cx=ox+60+sway*.3,cy=70;circ(c,cx,cy,32,P.skin);if(!blink){circ(c,cx-10,cy-4,4,'#fff');circ(c,cx+10,cy-4,4,'#fff');circ(c,cx-9,cy-3,2,P.ink);circ(c,cx+11,cy-3,2,P.ink)}else{R(c,cx-12,cy-4,8,2,P.ink);R(c,cx+6,cy-4,8,2,P.ink)}
    if(!lane){/* CAVITY: soft AO in eye sockets / nose / neck */const a=.35+.15*Math.sin(t*TAU);c.fillStyle='rgba(40,20,20,'+a+')';c.beginPath();c.ellipse(cx-10,cy-2,7,5,0,0,TAU);c.fill();c.beginPath();c.ellipse(cx+10,cy-2,7,5,0,0,TAU);c.fill();
      c.fillStyle='rgba(40,20,20,.3)';c.beginPath();c.ellipse(cx,cy+6,5,4,0,0,TAU);c.fill();c.fillStyle='rgba(30,15,15,.4)';c.beginPath();c.ellipse(cx,cy+28,18,8,0,0,TAU);c.fill()}
    else{/* AUTHORED: deliberate graphic shadow shapes that hold as head turns */const ox2=sway;c.fillStyle='#5a3040';c.beginPath();c.moveTo(cx-18+ox2,cy-8);c.lineTo(cx-4+ox2,cy-2);c.lineTo(cx-16+ox2,cy+6);c.closePath();c.fill();
      c.beginPath();c.moveTo(cx+4+ox2,cy-2);c.lineTo(cx+18+ox2,cy-8);c.lineTo(cx+16+ox2,cy+6);c.closePath();c.fill();R(c,cx-14,cy+18,28,10,'#4a2838')}
    c.restore()}
  gfDiv(c,120);gfTag(c,'CAVITY AO',60,8,P.cyan);gfTag(c,'AUTHORED',180,8,P.gold)}};

/* ---------- NPR-24 carved panel AO-only vs CAVITY+RIDGE ---------- */
DEMOS['NPR-24']={d:5,f:(c,t)=>{
  const light=Math.sin(t*TAU);
  for(const lane of[0,1]){const ox=lane*120;c.save();c.beginPath();c.rect(ox,0,120,H);c.clip();R(c,ox,0,120,H,'#2a2218');R(c,ox+10,12,100,110,'#8a6a48');
    /* carved pattern */const pattern=(ridge)=>{for(let row=0;row<4;row++)for(let col=0;col<3;col++){const x=ox+22+col*30,y=24+row*26;
      R(c,x,y,22,20,'#7a5a3a'); /* recess */
      /* AO in corners */c.fillStyle='rgba(20,10,5,'+(.45+.15*light)+')';c.fillRect(x,y,22,3);c.fillRect(x,y,3,20);c.fillRect(x,y+17,22,3);
      if(ridge){const hi=.35+.25*Math.max(0,light);R(c,x+2,y+2,18,2,'rgba(255,230,180,'+hi+')');R(c,x+2,y+2,2,16,'rgba(255,230,180,'+(hi*.7)+')');R(c,x+18,y+4,2,14,'rgba(20,10,5,.4)')}
      circ(c,x+11,y+10,5,'#6a4a30');if(ridge){circ(c,x+9+light,y+8,2,'rgba(255,230,180,.5)')}}};
    pattern(lane===1);c.restore()}
  gfDiv(c,120);gfTag(c,'AO ONLY',60,8);gfTag(c,'CAVITY + RIDGE',180,8,P.gold)}};
})();
