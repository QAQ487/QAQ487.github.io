/* ===== Graphics demos (LGT/ENV/PP/NPR extensions) — local helpers gf* =====
   Each demo is a pure f(c,t) on the 240×135 logical frame. Split compares use a
   1px divider with a short label on each side; HUD tags are drawn after any
   per-pixel filter so they stay readable. */
(()=>{
const gfSat=v=>v<0?0:v>1?1:v;
const gfSS=(a,b,x)=>{const k=gfSat((x-a)/(b-a));return k*k*(3-2*k)};
const gfHex=h=>[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];
const gfMix=(a,b,k)=>[a[0]+(b[0]-a[0])*k,a[1]+(b[1]-a[1])*k,a[2]+(b[2]-a[2])*k];
const gfLuma=(r,g,b)=>.2126*r+.7152*g+.0722*b;
const gfRGB=(a,al)=>al==null?'rgb('+(a[0]|0)+','+(a[1]|0)+','+(a[2]|0)+')':'rgba('+(a[0]|0)+','+(a[1]|0)+','+(a[2]|0)+','+al+')';
/* short label on a dark plate; clamped inside the frame */
function gfTag(c,s,x,y,col='#e9edf2',sz=7){c.font='bold '+sz+'px monospace';const w=Math.ceil(c.measureText(s).width)+6,h=sz+3;const x0=Math.max(1,Math.min(W-w-1,x-w/2));R(c,x0,y-h/2,w,h,'rgba(10,14,24,.8)');txt(c,s,x0+w/2,y,col,sz)}
function gfDiv(c,x){R(c,x,0,1,H,'rgba(255,255,255,.9)')}
function gfLane(c,x,w,fn){c.save();c.beginPath();c.rect(x,0,w,H);c.clip();fn();c.restore()}
/* thin pointer line from a tag to a target */
function gfPoint(c,x0,y0,x1,y1,col='#e9edf2'){c.strokeStyle=col;c.lineWidth=1;c.beginPath();c.moveTo(x0,y0);c.lineTo(x1,y1);c.stroke();R(c,x1-1,y1-1,2,2,col)}
function gfGrab(k){return k.getContext('2d').getImageData(0,0,W,H)}
/* per-pixel pass over a source ImageData: fn(r,g,b,x,y) → [r,g,b] */
function gfMap(c,src,fn){const o=outData(c),s=src.data,d=o.data;for(let y=0;y<H;y++)for(let x=0;x<W;x++){const p=(y*W+x)*4,r=fn(s[p],s[p+1],s[p+2],x,y);d[p]=r[0];d[p+1]=r[1];d[p+2]=r[2];d[p+3]=255}blitData(c,o)}
/* per-pixel generator: fn(x,y) → [r,g,b] */
function gfPix(c,fn){const o=outData(c),d=o.data;for(let y=0;y<H;y++)for(let x=0;x<W;x++){const p=(y*W+x)*4,r=fn(x,y);d[p]=r[0];d[p+1]=r[1];d[p+2]=r[2];d[p+3]=255}blitData(c,o)}
function gfVN(x,y,s){const xi=Math.floor(x),yi=Math.floor(y),fx=x-xi,fy=y-yi,ux=fx*fx*(3-2*fx),uy=fy*fy*(3-2*fy);const h=(i,j)=>hash(i*31.7+j*97.1+s*13.3);return lerp(lerp(h(xi,yi),h(xi+1,yi),ux),lerp(h(xi,yi+1),h(xi+1,yi+1),ux),uy)}
const gfFBM=(x,y,s)=>gfVN(x,y,s)*.57+gfVN(x*2.03,y*2.03,s+7)*.29+gfVN(x*4.1,y*4.1,s+3)*.14;
/* draw the same world view into both lanes: lane L shows world x [cx-60,cx+60] */
function gfPair(fn,cx=120){const k=TMP(),g=k.getContext('2d');for(const L of[0,1]){g.save();g.beginPath();g.rect(L*120,0,120,H);g.clip();g.translate(L*120+60-cx,0);fn(g,L);g.restore()}return k}
/* recoloured sprite (cached by key): fn(r,g,b,v,u) with v,u = row/col 0..1 */
const _gfS={};
function gfSpr(c,name,x,y,s,key,fn,flip){const ck=name+'|'+key;let k=_gfS[ck];if(!k){const b=sprCanvas(name),w=b.width,h=b.height;k=mk(w,h);const g=k.getContext('2d');g.drawImage(b,0,0);const id=g.getImageData(0,0,w,h),d=id.data;for(let i=0;i<d.length;i+=4){if(!d[i+3])continue;const q=i/4,v=Math.floor(q/w)/(h-1),u=(q%w)/(w-1),r=fn(d[i],d[i+1],d[i+2],v,u);d[i]=r[0];d[i+1]=r[1];d[i+2]=r[2]}g.putImageData(id,0,0);_gfS[ck]=k}
  const w=k.width,h=k.height;c.save();c.translate(Math.round(x),Math.round(y));if(flip)c.scale(-1,1);c.drawImage(k,-Math.floor(w/2)*s,-h*s,w*s,h*s);c.restore()}
/* front-view house with chosen colours (side-view streets) */
function gfHouse(g,x,y,w,h,wall,roof,win='#6f8a99'){R(g,x-w/2,y-h,w,h,wall);R(g,x-w/2,y-3,w,3,'rgba(0,0,0,.18)');g.fillStyle=roof;g.beginPath();g.moveTo(x-w/2-3,y-h+1);g.lineTo(x,y-h-w*.45);g.lineTo(x+w/2+3,y-h+1);g.fill();R(g,x-w/2-3,y-h,w+6,2,'rgba(0,0,0,.25)');R(g,x-3,y-9,6,9,P.woodD);R(g,x-w/2+3,y-h+4,5,4,win);R(g,x+w/2-8,y-h+4,5,4,win)}
function gfRoundTree(g,x,y,r,col,colD,trunk=P.woodD){R(g,x-1.5,y-r,3,r,trunk);circ(g,x,y-r-r*.55,r,colD);circ(g,x-r*.25,y-r-r*.75,r*.72,col)}

/* ---------- LGT-15 komorebi: pale shafts through a canopy gap, elongated landings ---------- */
DEMOS['LGT-15']={d:6,f:(c,t)=>{
  const T=t*TAU,vx=140,vy=58,k=TMP(),g=k.getContext('2d');
  const bg=g.createLinearGradient(0,0,0,70);bg.addColorStop(0,'#16241b');bg.addColorStop(1,'#2a3b2f');g.fillStyle=bg;g.fillRect(0,0,W,70);
  R(g,0,58,W,77,'#111b14');
  for(let i=0;i<20;i++)R(g,hash(i+3)*W,16,1+hash(i+9)*1.5,44,'#2b3d31');      /* far misty trunks */
  g.fillStyle='#222b27';g.beginPath();g.moveTo(vx-2,vy);g.lineTo(vx+2,vy);g.lineTo(198,H);g.lineTo(68,H);g.fill();  /* wet road */
  g.fillStyle='#38443f';g.beginPath();g.moveTo(vx,vy);g.lineTo(vx+.7,vy);g.lineTo(142,H);g.lineTo(126,H);g.fill();
  for(let i=0;i<48;i++){const u=hash(i*3+1),y=vy+3+u*(H-vy),s=i%2?1:-1,e=vx+s*(2+(y-vy)/(H-vy)*60);g.fillStyle=i%3?'#0e1c13':'#17301f';g.beginPath();g.ellipse(e+s*(3+hash(i+40)*10),y,3+u*7,1.5+u*2.5,0,0,TAU);g.fill()}
  for(const[x,w,b]of[[8,3,74],[24,6,96],[54,4,82],[86,3,70],[106,2,64],[176,2,64],[196,4,78],[220,6,98]]){R(g,x,8,w,b-8,'#0a130d');R(g,x,8,1,b-8,'#1d2e22')}
  /* canopy: dark leaf mass with one bright opening */
  R(g,0,0,W,18,'#09130c');
  const op=g.createRadialGradient(140,3,2,140,3,36);op.addColorStop(0,'#fbfbe2');op.addColorStop(.45,'#c4dc90');op.addColorStop(1,'rgba(60,90,50,0)');g.fillStyle=op;g.beginPath();g.ellipse(140,3,40,15,0,0,TAU);g.fill();
  for(let i=0;i<120;i++){const x=hash(i+700)*W,y=hash(i+800)*30-5,d=Math.hypot((x-140)/34,(y-3)/12);if(d<1)continue;const sw=Math.sin(T+i)*1.2;g.fillStyle=d<1.35?'#46773a':i%2?'#0c1b12':'#14301c';g.beginPath();g.ellipse(x+sw,y,5+hash(i+900)*5,3+hash(i+950)*2.5,0,0,TAU);g.fill()}
  /* five shafts fan from the gap; leaves flutter their strength */
  const S=[];for(let i=0;i<5;i++){const sw=Math.sin(T+i*1.7)*1.4;S.push({x0:116+i*12+sw,y0:10,x1:42+i*39+sw*2,y1:100+(i%2)*14,f:.8+.2*Math.sin(T*2+i*2.1)})}
  gfMap(c,gfGrab(k),(r,gg,b,x,y)=>{let I=0,L=0;for(const s of S){if(y<s.y0)continue;const u=(y-s.y0)/(s.y1-s.y0);if(u<1.05){const cx=lerp(s.x0,s.x1,u),hw=lerp(1.6,7.5,u),dd=Math.abs(x-cx);if(dd<hw){const n=gfVN(x*.09+Math.cos(T)*1.3,y*.07+Math.sin(T)*1.3,4);I+=gfSS(hw,hw*.3,dd)*(.78-.3*u)*(.62+.5*n)*s.f*(u>1?1-(u-1)/.05:1)}}
      const ex=(x-s.x1)/16,ey=(y-s.y1)/3.6,e=ex*ex+ey*ey;if(e<1)L+=(1-e)*(1-e)*s.f}
    I=Math.min(1,I);L=Math.min(1,L);let a=r+(250-r)*I*.78,b2=gg+(247-gg)*I*.78,c2=b+(214-b)*I*.72;a+=(255-a)*L*.92;b2+=(246-b2)*L*.9;c2+=(196-c2)*L*.82;return[a,b2,c2]});
  /* walker crosses the floor; brightens inside a shaft, dim between */
  const hx=lerp(26,214,.5-.5*Math.cos(T)),hy=121;let lit=0;
  for(const s of S){const u=(110-s.y0)/(s.y1-s.y0),cx=lerp(s.x0,s.x1,u),hw=lerp(1.6,7.5,u)+3;lit=Math.max(lit,gfSS(hw,hw*.35,Math.abs(hx-cx))*s.f)}
  shadow(c,hx,hy,6,.4);spr(c,'hero',hx,hy,{sx:1.7,sy:1.7,flip:Math.sin(T)<0,tint:lit>.05?'#fff4c8':'#08100b',tintA:lit>.05?lit*.6:.5});
  if(lit>.45)gfTag(c,'LIT',hx,hy-24,P.gold,6);
  R(c,0,0,5,H,'#040705');R(c,234,0,6,H,'#040705');
  gfTag(c,'KOMOREBI',36,8,P.gold);gfTag(c,'SHAFTS',214,30,P.cyan);gfPoint(c,201,32,S[4].x0+(S[4].x1-S[4].x0)*.3,40,P.cyan);
  gfTag(c,'elongated landings',52,128,'#cfd8e3',6);gfPoint(c,40,124,S[0].x1,S[0].y1+2,'#cfd8e3')}};

/* ---------- LGT-16 stained-glass light: window panes → coloured floor pools ---------- */
DEMOS['LGT-16']={d:7,f:(c,t)=>{
  const T=t*TAU,PAL=['#d8342c','#2c50d8','#f2bc2c','#2ca04e','#9a3ccc'],wx=24,wy=30,pw=12,ph=10,rows=5;
  R(c,0,0,W,88,'#2b2629');
  for(let y=0;y<88;y+=8)for(let x=((y/8)%2)*9-9;x<W;x+=18){R(c,x+1,y+1,16,6,'#363034')}            /* stone blocks */
  for(const px of[78,206]){R(c,px,0,12,88,'#231f22');R(c,px,0,2,88,'#4a4246')}                        /* piers */
  /* floor with perspective joints */
  R(c,0,88,W,47,'#2f2b2a');c.strokeStyle='#211e1d';c.lineWidth=1;for(let i=0;i<5;i++){const y=88+i*i*2.2+i*3;c.beginPath();c.moveTo(0,y);c.lineTo(W,y);c.stroke()}
  for(let i=-6;i<=6;i++){c.beginPath();c.moveTo(120+i*14,88);c.lineTo(120+i*44,H);c.stroke()}
  /* the window: arched frame, distinct leaded panes, glowing */
  R(c,wx-4,wy-4,3*pw+8,rows*ph+8,'#151114');c.fillStyle='#151114';c.beginPath();c.arc(wx+1.5*pw,wy,1.5*pw+4,Math.PI,0);c.fill();
  const glow=.85+.15*Math.sin(T*2);
  for(let j=0;j<rows;j++)for(let i=0;i<3;i++){const col=gfHex(PAL[(i+j*2)%5]);R(c,wx+i*pw+1,wy+j*ph+1,pw-2,ph-2,gfRGB(gfMix(col,[255,255,255],.12*glow)));R(c,wx+i*pw+3,wy+j*ph+3,pw-6,ph-6,gfRGB(gfMix(col,[255,255,255],.35*glow)))}
  c.fillStyle='#f2e6b0';c.beginPath();c.arc(wx+1.5*pw,wy,1.5*pw-1,Math.PI,0);c.fill();circ(c,wx+1.5*pw,wy-6,5,'#d8342c');
  /* faint dusty beam from window to floor */
  const x0=96+Math.sin(T)*20;c.fillStyle='rgba(255,240,200,.07)';c.beginPath();c.moveTo(wx+3*pw,wy-8);c.lineTo(wx+3*pw,wy+rows*ph);c.lineTo(x0+rows*18+30,128);c.lineTo(x0+6*18+10,96);c.fill();
  /* pools: same pane grid projected as skewed cells on the floor */
  const cell=(i,j)=>{const y0=96+i*11,y1=y0+10,sk=y=>(y-96)*.75,xa=x0+(rows-1-j)*18;return[[xa+sk(y0),y0],[xa+16+sk(y0),y0],[xa+16+sk(y1),y1],[xa+sk(y1),y1]]};
  c.save();c.globalCompositeOperation='lighter';
  for(let j=0;j<rows;j++)for(let i=0;i<3;i++){const q=cell(i,j),col=gfHex(PAL[(i+j*2)%5]);c.fillStyle=gfRGB(col,.25);c.beginPath();c.moveTo(q[0][0]-2,q[0][1]-1);c.lineTo(q[1][0]+2,q[1][1]-1);c.lineTo(q[2][0]+2,q[2][1]+1);c.lineTo(q[3][0]-2,q[3][1]+1);c.fill();
    c.fillStyle=gfRGB(col,.8);c.beginPath();q.forEach((p,n)=>n?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.fill()}
  c.restore();
  /* walker on the back pool row picks up whatever pane lands on them */
  const hx=lerp(70,226,.5-.5*Math.cos(T*2)),hy=126;let tc=null;
  for(let j=0;j<rows;j++){const q=cell(2,j);const xl=lerp(q[0][0],q[3][0],.6),xr=lerp(q[1][0],q[2][0],.6);if(hx>=xl-1&&hx<=xr+1)tc=PAL[(2+j*2)%5]}
  shadow(c,hx,hy,6,.45);spr(c,'hero',hx,hy,{sx:1.8,sy:1.8,flip:Math.sin(T*2)<0,tint:tc||'#0a0a14',tintA:tc?.6:.4});
  if(tc){c.fillStyle=tc;c.globalAlpha=.35;c.beginPath();c.ellipse(hx,hy-9,7,10,0,0,TAU);c.fill();c.globalAlpha=1}
  gfTag(c,'WINDOW',42,93,P.gold);gfTag(c,'FLOOR POOLS',150,80,P.cyan);gfPoint(c,150,85,x0+60,104,P.cyan);
  if(tc)gfTag(c,'TINTED',hx,hy-28,'#cfd8e3',6)}};

/* ---------- LGT-17 backlit leaf translucency: front-lit → back-lit ---------- */
DEMOS['LGT-17']={d:7,f:(c,t)=>{
  const T=t*TAU,b=ease(seg(t,.38,.5))*(1-ease(seg(t,.9,1))),sx=156,sy=56;
  /* sky: cool and even when the sun is behind the viewer; warm with the disc behind the branch */
  const g1=c.createLinearGradient(0,0,0,H);g1.addColorStop(0,'#7ab8da');g1.addColorStop(1,'#cfe6ee');c.fillStyle=g1;c.fillRect(0,0,W,H);
  c.globalAlpha=b;const g2=c.createRadialGradient(sx,sy,0,sx,sy,170);g2.addColorStop(0,'#fff6d0');g2.addColorStop(.18,'#f8d27a');g2.addColorStop(1,'#a8603a');c.fillStyle=g2;c.fillRect(0,0,W,H);circ(c,sx,sy,10,'#fffbe8');c.globalAlpha=1;
  /* branch + five big leaves */
  const sw=Math.sin(T*2)*1.5,tw=gfMix([92,62,34],[36,24,14],b);
  c.strokeStyle=gfRGB(tw);c.lineWidth=4;c.beginPath();c.moveTo(-4,100);c.quadraticCurveTo(90,70+sw,226,48);c.stroke();
  const L=[[34,88,-2.2,40],[70,78,.7,44],[104,70,-1.9,46],[142,62,.9,42],[184,55,-1.6,40]];
  for(let n=0;n<L.length;n++){const[bx,by,a0,len]=L[n],a=a0+Math.sin(T*2+n)*.06,dx=Math.cos(a),dy=Math.sin(a),px=-dy,py=dx,wd=len*.36;
    const tx=bx+dx*len,ty=by+dy*len;c.lineWidth=2;c.beginPath();c.moveTo(bx,by);c.lineTo(bx+dx*4,by+dy*4);c.stroke();
    const shape=()=>{c.beginPath();c.moveTo(bx+dx*4,by+dy*4);c.quadraticCurveTo(bx+dx*len*.5+px*wd,by+dy*len*.5+py*wd,tx,ty);c.quadraticCurveTo(bx+dx*len*.5-px*wd,by+dy*len*.5-py*wd,bx+dx*4,by+dy*4)};
    /* FRONT: opaque mid-green, top-lit, veins hidden */
    const fg=c.createLinearGradient(bx,by-wd,bx,by+wd);fg.addColorStop(0,'#5c9a44');fg.addColorStop(1,'#3c7330');c.fillStyle=fg;shape();c.fill();
    /* BACK: the lamina itself glows yellow-green; veins show darker */
    if(b>0){c.globalAlpha=b;const bg=c.createRadialGradient(sx,sy,0,sx,sy,150);bg.addColorStop(0,'#f2fa8a');bg.addColorStop(.5,'#b8e050');bg.addColorStop(1,'#7cb83a');c.fillStyle=bg;shape();c.fill();
      c.strokeStyle='#6e8a24';c.lineWidth=1;c.beginPath();c.moveTo(bx+dx*4,by+dy*4);c.lineTo(tx,ty);c.stroke();
      for(let v=1;v<=4;v++){const m=v/5.2,cx=bx+dx*len*m,cy=by+dy*len*m,vl=wd*(1-Math.abs(m-.45)*1.2)*.85;for(const sd of[1,-1]){c.beginPath();c.moveTo(cx,cy);c.lineTo(cx+dx*vl*.6+px*vl*sd,cy+dy*vl*.6+py*vl*sd);c.stroke()}}
      c.strokeStyle='rgba(255,255,200,.8)';shape();c.stroke();c.globalAlpha=1}
    c.strokeStyle=gfRGB(tw)}
  /* mini map: where is the sun? */
  R(c,4,92,46,40,'rgba(10,14,24,.75)');const my=lerp(127,98,b);R(c,12,106,30,2,P.leaf);circ(c,27,117,2.5,'#e9edf2');circ(c,27,my,3,P.gold);txt(c,'sun',41,my,P.gold,6);txt(c,'eye',39,117,'#cfd8e3',6);txt(c,'leaf',14,101,'#7ee36b',6);
  gfTag(c,'FRONT-LIT · opaque',60,8,b<.5?P.gold:'#6a7484');gfTag(c,'BACK-LIT · veins glow',178,8,b>=.5?P.cyan:'#6a7484')}};

/* ---------- LGT-18 character–environment lighting: LINKED | SEPARATE ---------- */
DEMOS['LGT-18']={d:5,f:(c,t)=>{
  const T=t*TAU,fl=.75+.25*(Math.sin(T*6)>.8?.3:1),bob=Math.round(Math.sin(T*2)*1);
  for(const L of[0,1])gfLane(c,L*120,120,()=>{const o=L*120;
    R(c,o,0,120,H,'#142238');                                                          /* cool alley */
    c.fillStyle='#1d3150';c.beginPath();c.moveTo(o+34,14);c.lineTo(o+86,14);c.lineTo(o+86,92);c.lineTo(o+34,92);c.fill();
    c.fillStyle='#0f1a2c';c.beginPath();c.moveTo(o,0);c.lineTo(o+34,14);c.lineTo(o+34,92);c.lineTo(o,135);c.fill();c.beginPath();c.moveTo(o+120,0);c.lineTo(o+86,14);c.lineTo(o+86,92);c.lineTo(o+120,135);c.fill();
    c.fillStyle='#1a2a3e';c.beginPath();c.moveTo(o+34,92);c.lineTo(o+86,92);c.lineTo(o+120,135);c.lineTo(o,135);c.fill();
    for(let i=0;i<3;i++)for(let j=0;j<2;j++)R(c,o+40+j*24,22+i*20,12,10,'#3a6aa8');
    R(c,o+8,30,16,30,gfRGB([90*fl,200*fl,255*fl]));R(c,o+10,32,12,26,'#0f1a2c');txt(c,'BAR',o+16,45,gfRGB([120*fl,220*fl,255*fl]),6);   /* blue neon */
    c.fillStyle='rgba(90,200,255,'+(.18*fl)+')';c.beginPath();c.ellipse(o+30,120,20,4,0,0,TAU);c.fill();
    for(let i=0;i<14;i++){const x=o+hash(i+L)*120,y=((hash(i+5)*H+t*H*4)%H);R(c,x,y,1,4,'rgba(150,190,240,.35)')}
    shadow(c,o+60,121,10,.5);
    if(L===0)gfSpr(c,'hero',o+60,120+bob,3.4,'lgt18link',(r,g,b,v,u)=>[r*.28+12+(u<.25?24:0),g*.42+22+(u<.25?50:0),b*.7+52+(u<.25?70:0)]);
    else gfSpr(c,'hero',o+60,120+bob,3.4,'lgt18sep',(r,g,b,v,u)=>[Math.min(255,r*1.05+22+(u>.75?30:0)),Math.min(255,g*1.0+10+(u>.75?16:0)),b*.86]);
    const sk=L?gfHex(P.skin).map((v,i)=>Math.min(255,[v*1.05+22,v+10,v*.86][i])):[gfHex(P.skin)[0]*.28+12,gfHex(P.skin)[1]*.42+22,gfHex(P.skin)[2]*.7+52];
    R(c,o+92,58,14,10,P.ink);R(c,o+93,59,12,8,gfRGB(sk));txt(c,'skin',o+99,73,'#cfd8e3',6)});
  gfDiv(c,120);gfTag(c,'LINKED',60,7,P.cyan);gfTag(c,'SEPARATE',180,7,P.gold);gfTag(c,'dyed by room',60,128,'#cfd8e3',6);gfTag(c,'own warm key',180,128,'#cfd8e3',6)}};

/* ---------- LGT-19 hemisphere ambient: FLAT | SKY + GROUND ---------- */
DEMOS['LGT-19']={d:6,f:(c,t)=>{
  const T=t*TAU,k=TMP(),g=k.getContext('2d');
  for(const L of[0,1]){const o=L*120,sg=g.createLinearGradient(0,0,0,82);sg.addColorStop(0,'#5d9fd8');sg.addColorStop(1,'#bfe0f0');g.fillStyle=sg;g.fillRect(o,0,120,82);R(g,o,82,120,53,P.grass);for(let i=0;i<40;i++)R(g,o+hash(i+L*50)*120,84+hash(i+9)*50,2,1,P.grass2)}
  const key=[Math.cos(T)*.6,.25,Math.sin(T)*.4+.6],kl=Math.hypot(...key),sky=[.55,.78,1.18],grd=[.36,.8,.28];
  gfMap(c,gfGrab(k),(r,gg,b,x,y)=>{const L=x<120?0:1,cx=L*120+36,cy=60,rr=20,nx=(x-cx)/rr,ny=(cy-y)/rr,q=nx*nx+ny*ny;if(q>1)return[r,gg,b];const nz=Math.sqrt(1-q),kd=Math.max(0,(nx*key[0]+ny*key[1]+nz*key[2])/kl)*.16,al=228;
    if(!L){const a=.66+kd;return[al*a,al*a,al*a]}const h=ny*.5+.5;return[al*(lerp(grd[0],sky[0],h)*.86+kd),al*(lerp(grd[1],sky[1],h)*.86+kd),al*(lerp(grd[2],sky[2],h)*.86+kd)]});
  c.fillStyle='rgba(0,0,0,.25)';for(const o of[0,120]){c.beginPath();c.ellipse(o+36,86,14,3,0,0,TAU);c.fill()}
  const hx=Math.round(Math.sin(T)*6),fl=Math.cos(T)<0;
  shadow(c,88+hx,110,8,.3);gfSpr(c,'hero',88+hx,110,3,'lgt19flat',(r,g,b)=>[r*.76,g*.76,b*.76],fl);
  shadow(c,208+hx,110,8,.3);gfSpr(c,'hero',208+hx,110,3,'lgt19hemi',(r,g,b,v)=>{const h=1-v;return[r*lerp(grd[0],sky[0],h)*1.05,g*lerp(grd[1],sky[1],h)*1.05,b*lerp(grd[2],sky[2],h)*1.05]},fl);
  gfTag(c,'SKY',156,18,'#9ad0ff',6);gfPoint(c,156,23,156,40,'#9ad0ff');gfTag(c,'GRASS',156,118,'#7ee36b',6);gfPoint(c,156,113,156,82,'#7ee36b');
  gfDiv(c,120);gfTag(c,'FLAT AMBIENT',60,7);gfTag(c,'SKY + GROUND',196,7,P.cyan);gfTag(c,'one grey',36,128,'#cfd8e3',6);gfTag(c,'blue top · green under',186,128,'#cfd8e3',6)}};

/* ---------- ENV-21 sun glitter: short-lived glints crowd the sun's reflection path ---------- */
DEMOS['ENV-21']={d:5,f:(c,t)=>{
  const T=t*TAU,hz=46,sx=148,sy=24,shore=x=>121+Math.sin(x*.05)*2.5;
  gfPix(c,(x,y)=>{
    if(y<hz){const u=y/hz,d=Math.hypot(x-sx,y-sy),gl=Math.exp(-d/16)*.9+Math.exp(-d/50)*.35;let col=gfMix([58,110,170],[236,206,150],u*u);col=gfMix(col,[255,246,214],Math.min(1,gl));if(d<6)col=[255,252,236];
      if(y>hz-5&&(x<70||x>214)&&y>hz-5+Math.sin(x*.2)*2)col=[44,60,70];return col}
    const sy2=shore(x);if(y>sy2){const w=y-sy2;const foam=w<1.6+Math.sin(T*2+x*.1)*.8;return foam?[236,240,236]:gfMix([150,128,86],[216,192,138],Math.min(1,w/6))}
    const u=(y-hz)/(sy2-hz),pw=3+u*34,dx=(x-sx)/pw,path=Math.exp(-dx*dx);
    const wave=.5+.5*Math.sin(x*(.5-u*.3)+y*1.7-T*3+Math.sin(x*.07+T)*2);
    let col=gfMix([34,70,112],[40,104,140],u);col=gfMix(col,[18,48,84],wave*.35*(1-u*.4));col=gfMix(col,[214,170,96],path*.38*(1-u*.25));
    const calm=1-gfSS(sy2-24,sy2-4,y)*.88;
    const id=Math.floor(x/2)*131+y*977,dens=(path*.42+.012)*calm;
    if(hash(id)<dens){const sp=2+Math.floor(hash(id+5)*5),l=Math.sin(T*sp+hash(id+9)*TAU),s=gfSS(.82,.98,l);if(s>0)col=gfMix(col,[255,250,226],s)}
    return col});
  /* the brightest facets flash as little stars, still hugging the path */
  for(let i=0;i<46;i++){const y=hz+2+hash(i+11)*(shore(150)-hz-14),u=(y-hz)/75,pw=3+u*34,x=sx+(hash(i+12)-.5)*2.2*pw,l=Math.sin(T*(3+Math.floor(hash(i+13)*4))+hash(i+14)*TAU);if(l<.78)continue;const a=(l-.78)/.22,r=1+Math.round(a*2+u*1.5);
    c.globalAlpha=a;R(c,x-r,y,r*2+1,1,'#fffbe6');R(c,x,y-r,1,r*2+1,'#fffbe6');c.globalAlpha=1}
  gfTag(c,'SUN PATH GLINTS',148,56,P.gold);gfTag(c,'few on the sides',40,70,'#cfd8e3',6);gfTag(c,'calmer near shore',196,129,'#cfd8e3',6)}};

/* ---------- PP-14 bleach bypass: OFF | BYPASS ---------- */
DEMOS['PP-14']={d:5,f:(c,t)=>{
  const T=t*TAU,hx=120+Math.sin(T)*16;
  const k=gfPair(g=>{g.drawImage(scene('eday'),0,0);spr(g,'npc',92,62,{sx:1.4,sy:1.4});shadow(g,hx,84,6);spr(g,'hero',hx,84,{sx:1.7,sy:1.7,flip:Math.cos(T)<0});spr(g,'coin',150,96,{sx:1.4,sy:1.4})});
  const crv=v=>{let u=gfSat((v/255-.24)/.6);u=lerp(u,u*u*(3-2*u),1);return u*255};
  gfMap(c,gfGrab(k),(r,g,b,x)=>{if(x<120)return[r,g,b];const l=gfLuma(r,g,b);return[crv(lerp(l,r,.34))+3,crv(lerp(l,g,.34))+3,crv(lerp(l,b,.34))+6]});
  gfDiv(c,120);gfTag(c,'OFF',60,7);gfTag(c,'BYPASS',180,7,P.gold);gfTag(c,'full colour · soft',60,128,'#cfd8e3',6);gfTag(c,'crushed blacks · less colour',180,128,'#cfd8e3',6)}};

/* ---------- PP-15 selective colour: only the red umbrella + coat keep their hue ---------- */
DEMOS['PP-15']={d:6,f:(c,t)=>{
  const T=t*TAU,hx=120+Math.sin(T)*22,hy=118+(Math.floor(t*36)%2?-1:0);
  const k=gfPair(g=>{
    const sg=g.createLinearGradient(0,0,0,90);sg.addColorStop(0,'#5a9ad6');sg.addColorStop(1,'#c4e2f0');g.fillStyle=sg;g.fillRect(60,0,120,92);
    for(const[x,y]of[[80,18],[150,14],[175,26]]){circ(g,x,y,7,'#f4f8fa');circ(g,x+8,y+2,6,'#f4f8fa');circ(g,x-8,y+2,5,'#f4f8fa')}
    g.fillStyle='#7aaa6a';g.beginPath();g.moveTo(60,92);for(let x=60;x<=180;x+=8)g.lineTo(x,64+Math.sin(x*.05)*6);g.lineTo(180,92);g.fill();
    gfHouse(g,86,92,28,26,'#e8d070','#3a6aa8');gfHouse(g,120,92,30,32,'#7ac0a8','#4a5a8a');gfHouse(g,156,92,28,24,'#f0e6c8','#2c7a5a');
    gfRoundTree(g,102,92,8,'#4f9a3a','#2f6a2a');gfRoundTree(g,142,92,9,'#5aa848','#2f6a2a');
    R(g,60,92,120,5,'#bdb6a6');R(g,60,97,120,23,'#7e7a72');for(let x=60;x<180;x+=24)R(g,x,108,12,2,'#e6e2d6');R(g,60,120,120,15,P.grass);
    const cx=120+Math.cos(T)*18;g.fillStyle='#f0c23a';R(g,cx-16,99,32,8);R(g,cx-10,93,20,7);R(g,cx-7,94,6,5,'#9ad0f0');R(g,cx+1,94,6,5,'#9ad0f0');circ(g,cx-9,107,3,P.ink);circ(g,cx+9,107,3,P.ink);
    spr(g,'npc',120-Math.cos(T)*20,96,{sx:1.6,sy:1.6,flip:Math.sin(T)>0});
    shadow(g,hx,hy,7,.35);spr(g,'hero',hx,hy,{sx:2.2,sy:2.2,flip:Math.cos(T)<0});
    R(g,hx-1,hy-34,1,14,P.ink);g.fillStyle='#e02a2a';g.beginPath();g.moveTo(hx-15,hy-30);g.quadraticCurveTo(hx,hy-46,hx+15,hy-30);g.fill();
    g.fillStyle='#a01a1a';for(const ox of[-15,-5,5])g.fillRect(hx+ox,hy-31,4,1);g.fillStyle='#ff6a5a';g.fillRect(hx-6,hy-40,6,2);
    for(let i=0;i<24;i++){const x=60+hash(i+4)*120,y=(hash(i+7)*H+t*H*6)%H;g.fillStyle='rgba(220,230,240,.4)';g.fillRect(x,y,1,4)}
  });
  gfMap(c,gfGrab(k),(r,gg,bb,x)=>{if(x<120)return[r,gg,bb];const mx=Math.max(r,gg,bb),mn=Math.min(r,gg,bb),d=mx-mn,l=gfLuma(r,gg,bb);let keep=0;
    if(d>0&&mx===r){let h=60*((gg-bb)/d);if(h<0)h+=360;const hd=Math.min(h,360-h);keep=gfSS(26,12,hd)*gfSS(.3,.5,d/mx)*gfSS(60,100,mx)}
    const gr=[l*.97,l*.99,l*1.04];return[lerp(gr[0],r,keep),lerp(gr[1],gg,keep),lerp(gr[2],bb,keep)]});
  gfDiv(c,120);gfTag(c,'FULL COLOUR',60,7);gfTag(c,'SELECTIVE RED',180,7,P.red);
  R(c,4,124,8,8,P.ink);R(c,5,125,6,6,'#e02a2a');gfTag(c,'keep reds',36,128,'#e9edf2',6)}};

DEMOS['PP-16']={d:6,f:(c,t)=>{
  const T=t*TAU,k=TMP2(),g=k.getContext('2d');
  const sg=g.createLinearGradient(0,0,0,90);sg.addColorStop(0,'#5a9ad6');sg.addColorStop(1,'#cfe6f0');g.fillStyle=sg;g.fillRect(0,0,W,96);
  g.fillStyle='#86b070';g.beginPath();g.moveTo(0,96);for(let x=0;x<=W;x+=8)g.lineTo(x,70+Math.sin(x*.04+1)*7);g.lineTo(W,96);g.fill();
  R(g,0,94,W,41,P.grass);R(g,0,104,W,16,P.dirt);R(g,0,104,W,2,P.dirtD);
  house(g,96,96);gfRoundTree(g,58,96,11,P.leaf,P.leafD);gfRoundTree(g,150,96,9,P.leaf,P.leafD);tower(g,196,96);fence(g,112,104,5);
  const hx=lerp(100,160,.5-.5*Math.cos(T));shadow(g,hx,116,6);spr(g,'hero',hx,116,{sx:2,sy:2,flip:Math.sin(T)<0});
  c.drawImage(k,0,0);
  const d1=Math.sin(T)*3,d2=Math.cos(T)*3;
  const shards=[
    {p:[[0,0],[46,0],[30,74],[0,92]],m:g2=>{g2.translate(2*(72+d1),-44);g2.scale(-1,1)}},          /* mirrored copy (person + house) */
    {p:[[0,104],[34,84],[84,135],[0,135]],m:g2=>{g2.translate(-96+d2,10)}},                          /* offset copy */
    {p:[[176,0],[240,0],[240,62]],m:g2=>{g2.translate(116+d1,2*(54)-0);g2.scale(1,-1)}}];             /* upside-down copy */
  for(const s of shards){c.save();c.beginPath();s.p.forEach((q,i)=>i?c.lineTo(q[0],q[1]):c.moveTo(q[0],q[1]));c.closePath();c.clip();c.save();s.m(c);c.drawImage(k,0,0);c.restore();
    c.fillStyle='rgba(200,235,255,.16)';c.fillRect(0,0,W,H);c.restore();
    c.lineWidth=1;for(let i=0;i<s.p.length;i++){const a=s.p[i],b=s.p[(i+1)%s.p.length];const onEdge=(a[0]<=0&&b[0]<=0)||(a[1]<=0&&b[1]<=0)||(a[0]>=W&&b[0]>=W)||(a[1]>=H&&b[1]>=H);if(onEdge)continue;
      c.strokeStyle='rgba(255,255,255,.95)';c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.stroke();c.strokeStyle='rgba(20,40,60,.5)';c.beginPath();c.moveTo(a[0]+1,a[1]+1);c.lineTo(b[0]+1,b[1]+1);c.stroke();
      const u=(t*2+i*.37)%1,gx=lerp(a[0],b[0],u),gy=lerp(a[1],b[1],u);R(c,gx-2,gy,5,1,'#fff');R(c,gx,gy-2,1,5,'#fff')}}
  gfTag(c,'GLASS SHARDS',120,7,P.cyan);gfTag(c,'flipped',24,100,'#e9edf2',6);gfTag(c,'offset',60,128,'#e9edf2',6);gfTag(c,'upside-down',212,70,'#e9edf2',6)}};

/* ---------- PP-17 cross-processing: OFF | X-PRO ---------- */
DEMOS['PP-17']={d:5,f:(c,t)=>{
  const T=t*TAU,hx=120+Math.sin(T)*16;
  const k=gfPair(g=>{g.drawImage(scene('eday'),0,0);g.fillStyle='rgba(0,0,0,.42)';for(const[x,y,w]of[[85,100,14],[170,120,12],[50,56,16],[120,32,8]]){g.beginPath();g.ellipse(x+6,y,w,4,0,0,TAU);g.fill()}spr(g,'npc',92,62,{sx:1.4,sy:1.4});shadow(g,hx,84,6);spr(g,'hero',hx,84,{sx:1.7,sy:1.7,flip:Math.cos(T)<0});const vg=g.createRadialGradient(120,60,30,120,60,90);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.55)');g.fillStyle=vg;g.fillRect(0,0,W,H)});
  const cn=v=>gfSat((v-.5)*1.4+.5);
  gfMap(c,gfGrab(k),(r,g,b,x)=>{if(x<120)return[r,g,b];r/=255;g/=255;b/=255;const l=gfLuma(r,g,b),sh=(1-l)*(1-l),hi=l*l;
    let R0=cn(r)*1.04-sh*.16+hi*.1,G0=cn(g)*.96+sh*.14+hi*.08,B0=cn(b)*.78+sh*.2-hi*.26;const m=(R0+G0+B0)/3;R0=m+(R0-m)*1.18;G0=m+(G0-m)*1.1;B0=m+(B0-m)*1.18;return[gfSat(R0)*255,gfSat(G0)*255,gfSat(B0)*255]});
  const chip=(x,col,s)=>{R(c,x,118,12,10,P.ink);R(c,x+1,119,10,8,col);txt(c,s,x+6,113,'#e9edf2',6)};
  chip(84,'#3a3a3c','SH');chip(100,'#e6e6e2','HI');chip(204,'#1f7a6a','SH');chip(220,'#f2e05a','HI');
  gfDiv(c,120);gfTag(c,'OFF',60,7);gfTag(c,'X-PRO',180,7,P.gold);gfTag(c,'cyan-green shadows',160,104,'#7fe3d8',6)}};

/* ---------- PP-18 night vision: DARK | NVG GREEN ---------- */
DEMOS['PP-18']={d:7,f:(c,t)=>{
  const T=t*TAU,hx=lerp(108,160,.5-.5*Math.cos(T)),lampX=92,lampY=68;
  const k=gfPair(g=>{R(g,0,0,W,96,'#8a7a66');R(g,0,96,W,39,'#6a5640');for(let i=0;i<6;i++)R(g,60+i*22,96,1,39,'#5a4834');
    R(g,62,30,22,66,P.woodD);for(let s=0;s<4;s++){R(g,62,42+s*14,22,2,P.wood);for(let b=0;b<5;b++)R(g,64+b*4,32+s*14,3,10,['#b6483a','#4a78c8','#e3c99a','#3f8f3a','#9a5ad1'][(b+s)%5])}
    R(g,134,22,30,30,'#2a3a5a');R(g,134,22,30,30);g.strokeStyle='#d8ccb8';g.lineWidth=2;g.strokeRect(134,22,30,30);R(g,148,22,2,30,'#d8ccb8');R(g,134,36,30,2,'#d8ccb8');
    R(g,104,30,16,12,'#c8a060');R(g,106,32,12,8,'#5a7a5a');
    R(g,80,82,32,4,P.wood);R(g,82,86,3,12,P.woodD);R(g,107,86,3,12,P.woodD);R(g,90,72,4,10,'#3a3a3a');
    g.fillStyle='#f0e0a8';g.beginPath();g.moveTo(lampX-7,lampY+4);g.lineTo(lampX-4,lampY-6);g.lineTo(lampX+4,lampY-6);g.lineTo(lampX+7,lampY+4);g.fill();
    R(g,170,40,14,56,'#5a3a24');circ(g,173,70,1,P.gold);
    R(g,96,108,56,10,'#7a3a3a');shadow(g,hx,118,7,.4);spr(g,'npc',hx,118,{sx:2.4,sy:2.4,flip:Math.sin(T)>0})});
  const white=t>.74&&t<.95,fr=Math.floor(t*48);
  gfMap(c,gfGrab(k),(r,g,b,x,y)=>{const L=x<120?0:1,lx=L*120+60+(lampX-120),d=Math.hypot(x-lx,(y-(lampY))*1.2),shade=Math.abs(x-lx)<7&&y>lampY-6&&y<lampY+4;
    if(!L){if(shade)return[255,236,170];const halo=Math.exp(-d/9)*.9;return[r*.05+255*halo*.9,g*.05+190*halo*.8,b*.06+110*halo*.6]}
    const tube=Math.hypot(x-180,y-67);if(tube>64)return[0,0,0];
    let v=gfLuma(r,g,b)/255*1.55+(hash(x*7.13+y*131.7+fr*977.1)-.5)*.32+Math.exp(-d/18)*1.3+(shade?1.5:0);v*=(y%2?.86:1)*(1-gfSS(50,64,tube)*.8);
    const hi=gfSat(v-1);v=gfSat(v);return white?[v*230+hi*25,v*236+hi*19,v*250]:[v*80+hi*170,v*255,v*70+hi*160]});
  gfDiv(c,120);gfTag(c,'DARK',60,7);gfTag(c,white?'WHITE PHOSPHOR':'NVG GREEN',180,7,white?'#e9edf2':'#7ee36b');
  gfTag(c,'naked eye',60,128,'#cfd8e3',6);gfTag(c,'lamp blooms',206,48,'#e9edf2',6);gfPoint(c,206,53,lampX+120-60+6,lampY,'#e9edf2');gfTag(c,'figure',hx+60,92,'#e9edf2',6)}};

/* ---------- PP-19 thermal: VISIBLE | THERMAL (same lamp, kettle, person) ---------- */
DEMOS['PP-19']={d:6,f:(c,t)=>{
  const T=t*TAU,bob=Math.sin(T*2),kv=TMP(),gv=kv.getContext('2d'),kt=TMP2(),gt=kt.getContext('2d');
  /* lane-local scene, once as colour, once as temperature (grey = heat) */
  const draw=(g,o,th)=>{const Tc=v=>{const q=Math.round(v*255);return'rgb('+q+','+q+','+q+')'};const col=(vis,tmp)=>th?Tc(tmp):vis;
    R(g,o,0,120,86,col('#cfc6b4',.22));for(let i=0;i<5;i++)R(g,o,i*18,120,1,col('#bdb3a0',.22));R(g,o,86,120,6,col('#8a7a66',.26));R(g,o,92,120,43,col('#6a5a48',.2));for(let i=0;i<4;i++)R(g,o+i*30+2,96,26,36,col('#7a6a56',.21));
    /* LED desk lamp: blinding to the eye, barely warm */
    R(g,o+12,82,14,4,col('#d8d8dc',.28));R(g,o+18,56,2,26,col('#c8c8cc',.27));R(g,o+12,48,18,8,col('#e8e8ec',.29));
    if(!th){const gl=g.createRadialGradient(o+21,58,0,o+21,58,26);gl.addColorStop(0,'rgba(255,255,240,1)');gl.addColorStop(.25,'rgba(255,255,230,.7)');gl.addColorStop(1,'rgba(255,255,220,0)');g.fillStyle=gl;g.fillRect(o-6,30,56,56);R(g,o+13,55,16,3,'#ffffff')}else R(g,o+13,55,16,3,Tc(.34));
    /* black cast-iron kettle on a burner: dark to the eye, hottest thing here */
    if(th){const hg=g.createRadialGradient(o+56,74,0,o+56,74,22);hg.addColorStop(0,Tc(.62));hg.addColorStop(1,'rgba(56,56,56,0)');g.fillStyle=hg;g.fillRect(o+30,48,52,44)}
    g.fillStyle=col('#1e1e22',.98);g.beginPath();g.ellipse(o+56,76,13,10,0,0,TAU);g.fill();R(g,o+44,78,24,8);R(g,o+52,62,8,4);g.strokeStyle=col('#2a2a30',.9);g.lineWidth=2;g.beginPath();g.arc(o+56,68,9,Math.PI*1.1,Math.PI*1.9);g.stroke();
    g.beginPath();g.moveTo(o+68,74);g.lineTo(o+76,66);g.stroke();
    for(let i=0;i<5;i++){const u=((t*2+i/5)%1),sx=o+77+Math.sin(u*6+i)*3,sy=64-u*30;g.fillStyle=th?'rgba(200,200,200,'+(.55*(1-u))+')':'rgba(240,240,240,'+(.6*(1-u))+')';g.beginPath();g.arc(sx,sy,2+u*4,0,TAU);g.fill()}
    /* person */
    const px=o+98,py=86+Math.round(bob*.6);R(g,px-7,py-30,14,30,col('#4a78c8',.6));R(g,px-10,py-28,3,16,col('#4a78c8',.62));R(g,px+7,py-28,3,14,col('#4a78c8',.62));R(g,px-10,py-12,3,4,col(P.skin,.82));R(g,px+7,py-14,3,4,col(P.skin,.82));
    circ(g,px,py-38,7,col(P.skin,.88));R(g,px-7,py-46,14,5,col(P.woodD,.66));R(g,px-3,py-39,2,2,col(P.ink,.85));R(g,px+2,py-39,2,2,col(P.ink,.85));R(g,px-3,py-2,6,2,col('#34589a',.55))};
  draw(gv,0,false);draw(gt,120,true);
  const v=gfGrab(kv).data,tm=gfGrab(kt).data,stops=[[0,[0,0,8]],[.24,[44,0,110]],[.42,[150,0,140]],[.6,[224,48,40]],[.76,[252,146,0]],[.9,[255,224,70]],[1,[255,255,244]]];
  const pal=q=>{for(let i=1;i<stops.length;i++)if(q<=stops[i][0]){const a=stops[i-1],b=stops[i];return gfMix(a[1],b[1],(q-a[0])/(b[0]-a[0]))}return stops[6][1]};
  gfPix(c,(x,y)=>{const p=(y*W+x)*4;if(x<120)return[v[p],v[p+1],v[p+2]];return pal(gfSat(tm[p]/255+(hash(x*3.1+y*71.3+Math.floor(t*30))-.5)*.03))});
  /* HUD: scale bar + readouts */
  const g2=c.createLinearGradient(196,0,236,0);stops.forEach(s=>g2.addColorStop(s[0],gfRGB(s[1])));c.fillStyle=g2;c.fillRect(196,124,40,5);txt(c,'cold',190,126,'#cfd8e3',5,'right');
  gfTag(c,'bright · cold',22,24,'#e9edf2',6);gfPoint(c,22,29,21,48,'#e9edf2');gfTag(c,'dark · hot',56,106,'#e9edf2',6);gfPoint(c,56,101,56,86,'#e9edf2');
  gfTag(c,'LAMP 24°C',144,24,'#9ad0ff',6);gfPoint(c,144,29,141,48,'#9ad0ff');gfTag(c,'KETTLE 96°C',176,106,'#ffe08a',6);gfPoint(c,176,101,176,86,'#ffe08a');gfTag(c,'36°C',218,40,'#ffb070',6);
  gfDiv(c,120);gfTag(c,'VISIBLE',60,7);gfTag(c,'THERMAL',180,7,P.orange)}};

/* ---------- PP-20 Aerochrome false-colour IR: OFF | IR ---------- */
DEMOS['PP-20']={d:6,f:(c,t)=>{
  const T=t*TAU,sw=Math.sin(T)*1.5;
  /* mask pass: R = living foliage (reflects IR), B = sky */
  const scn=(g,m)=>{const F=(v,mk)=>m?mk:v;
    if(m){g.fillStyle='#000';g.fillRect(-60,0,W+120,H)}
    const sg=g.createLinearGradient(0,0,0,70);sg.addColorStop(0,'#4a90d0');sg.addColorStop(1,'#b8dcee');g.fillStyle=m?'#0000ff':sg;g.fillRect(-60,0,W+120,72);
    if(!m)for(const[x,y]of[[96,16],[150,24]]){circ(g,x,y,6,'#f4f8fa');circ(g,x+7,y+1,5,'#f4f8fa')}else{circ(g,96,16,6,'#000');circ(g,103,17,5,'#000');circ(g,150,24,6,'#000');circ(g,157,25,5,'#000')}
    g.fillStyle=F('#5a8a4a','#ff0000');g.beginPath();g.moveTo(-60,74);for(let x=-60;x<=W+60;x+=6)g.lineTo(x,58+Math.sin(x*.09)*4+hash(Math.floor(x/6))*4);g.lineTo(W+60,74);g.fill();
    R(g,-60,72,W+120,63,F(P.grass,'#ff0000'));R(g,-60,100,W+120,10,F(P.dirt,'#000'));
    gfRoundTree(g,84+sw*.3,100,13,F(P.leaf,'#ff0000'),F(P.leafD,'#ff0000'),F(P.woodD,'#000'));gfRoundTree(g,170+sw*.3,98,10,F('#4f9a3a','#ff0000'),F(P.leafD,'#ff0000'),F(P.woodD,'#000'));
    for(let i=0;i<5;i++)circ(g,104+i*7,100,5,F(i%2?P.leaf:'#4f9a3a','#ff0000'));
    /* green-painted crate: same green as the leaves, but no chlorophyll */
    R(g,130,90,24,22,F('#3f9a3a','#000'));if(!m){R(g,130,90,24,2,'#5ab050');R(g,130,100,24,1,'#2c6a2a');R(g,141,90,1,22,'#2c6a2a');R(g,130,110,24,2,'#2a5a26')}
    spr(g,'hero',120+Math.sin(T)*8,124,m?{sx:1.8,sy:1.8,sil:'#000000'}:{sx:1.8,sy:1.8})};
  const kv=gfPair(g=>scn(g,false)),vd=gfGrab(kv).data,km=TMP2(),gm=km.getContext('2d');
  for(const L of[0,1]){gm.save();gm.beginPath();gm.rect(L*120,0,120,H);gm.clip();gm.translate(L*120-60,0);scn(gm,true);gm.restore()}
  const md=gfGrab(km).data;
  gfPix(c,(x,y)=>{const p=(y*W+x)*4,r=vd[p],g=vd[p+1],b=vd[p+2];if(x<120)return[r,g,b];const fol=md[p]/255,sky=md[p+2]/255,l=gfLuma(r,g,b);
    if(fol>.5){const q=gfSat(l/150);return[110+q*140,10+q*60,50+q*80]}
    if(sky>.5)return[r*.45,g*.55,Math.min(255,b*.95+10)];
    return[gfSat((r-128)*1.15/255+.5)*255,gfSat((g-128)*1.15/255+.5)*255,gfSat((b-128)*1.15/255+.5)*255]});
  for(const o of[0,120]){gfTag(c,'PAINT',o+82,84,'#7ee36b',6)}
  gfDiv(c,120);gfTag(c,'OFF',60,7);gfTag(c,'AEROCHROME',180,7,'#ff6a9a');gfTag(c,'foliage → crimson',172,128,'#ff8ab0',6);gfTag(c,'crate stays green',204,60,'#7ee36b',6);gfPoint(c,204,65,204,92,'#7ee36b');gfTag(c,'all green',60,128,'#cfd8e3',6)}};

/* ---------- PP-21 gate weave: the picture drifts inside a fixed film gate ---------- */
DEMOS['PP-21']={d:6,f:(c,t)=>{
  const T=t*TAU,dx=2.3*Math.sin(T*3+.4)+1.1*Math.sin(T*7+1.3),dy=1.9*Math.sin(T*4+2)+.9*Math.sin(T*9+.2),qx=Math.round(dx*2)/2,qy=Math.round(dy*2)/2;
  R(c,0,0,W,H,'#000');
  c.save();c.beginPath();c.rect(20,16,200,103);c.clip();c.drawImage(scene('day'),qx,qy);
  const fl=.04+.03*Math.sin(T*11);c.fillStyle='rgba(255,240,210,'+fl+')';c.fillRect(20,16,200,103);
  for(let i=0;i<30;i++){const gx=20+hash(i+Math.floor(t*24)*31)*200,gy=16+hash(i*7+Math.floor(t*24)*17)*103;R(c,gx,gy,1,1,'rgba(20,16,10,.6)')}
  c.restore();
  /* fixed references: rest outline around the house, centre ticks on the gate */
  c.strokeStyle=P.cyan;c.lineWidth=1;c.setLineDash([2,2]);c.strokeRect(35.5,25.5,30,28);c.setLineDash([]);
  c.strokeStyle='#d8d8d8';c.strokeRect(19.5,15.5,201,104);for(const[x,y,w,h]of[[119,13,1,5],[119,117,1,5],[17,67,5,1],[218,67,5,1]])R(c,x,y,w,h,'#d8d8d8');
  /* HUD stays put */
  circ(c,8,7,2.5,Math.sin(T*4)>0?P.red:'#5a1a14');txt(c,'REC',14,7,'#e9edf2',6,'left');const fr=Math.floor(t*6*24);txt(c,'00:00:0'+Math.floor(fr/24)+':'+String(fr%24).padStart(2,'0'),234,7,'#e9edf2',6,'right');
  txt(c,'dx '+(qx>=0?'+':'')+qx.toFixed(1)+'  dy '+(qy>=0?'+':'')+qy.toFixed(1),234,128,P.gold,6,'right');
  gfTag(c,'picture drifts · frame stays',82,128,P.cyan,6);gfTag(c,'rest',50,60,P.cyan,5)}};

/* ---------- NPR-15 sumi-e: ink pine, washes dissolving into reserved paper ---------- */
DEMOS['NPR-15']={d:8,f:(c,t)=>{
  const T=t*TAU,paper=[242,234,216],ink=[24,22,28],mist=Math.sin(T)*6;
  gfPix(c,(x,y)=>{let a=0;
    const h1=44+Math.sin(x*.028+1)*9+gfFBM(x*.04,1.3,1)*16;if(y>h1){const d=(y-h1)/26;a=Math.max(a,(.3-.12*gfFBM(x*.12,y*.1,2))*(1-gfSS(0,1,d))+(y-h1<1.4?.08:0))}
    const h2=66+Math.sin(x*.045+3)*7+gfFBM(x*.06,4.2,5)*12;if(y>h2){const d=(y-h2)/22;a=Math.max(a,(.52-.18*gfFBM(x*.1,y*.12,6))*(1-gfSS(0,1,d))+(y-h2<1.4?.12:0))}
    a*=1-gfSS(10,0,Math.abs(y-(88+mist+Math.sin(x*.03)*4)))*.9;                                  /* drifting mist band = untouched paper */
    if(y>116)a=Math.max(a,gfSS(116,135,y)*.12*gfVN(x*.05,y*.2,9));
    const fib=gfVN(x*.7,y*.09,3)*.035+hash(x*13.1+y*7.7)*.025;const col=gfMix(paper,ink,Math.min(1,a));return[col[0]-fib*60,col[1]-fib*60,col[2]-fib*60]});
  /* bristle brush stroke along a quadratic, width w0→w1, dry-brush gaps toward the tail */
  const brush=(x0,y0,cx,cy,x1,y1,w0,w1,seed,al)=>{const N=Math.ceil(Math.hypot(x1-x0,y1-y0)*1.4);for(let i=0;i<=N;i++){const u=i/N,m=1-u,px=m*m*x0+2*m*u*cx+u*u*x1,py=m*m*y0+2*m*u*cy+u*u*y1,tx=2*m*(cx-x0)+2*u*(x1-cx),ty=2*m*(cy-y0)+2*u*(y1-cy),tl=Math.hypot(tx,ty)||1,nx=-ty/tl,ny=tx/tl,w=lerp(w0,w1,u);
    for(let j=0;j<9;j++){if(gfVN(u*12,j*1.9,seed)<.12+u*.3)continue;const o=(j/8-.5)*w;c.fillStyle='rgba(22,20,26,'+(al*(.5+.5*hash(seed+j*13+i*.7)))+')';c.fillRect(px+nx*o,py+ny*o,1.3,1.3)}}};
  const clump=(x,y,r,seed)=>{c.fillStyle='rgba(40,40,46,.13)';c.beginPath();c.ellipse(x,y,r*1.3,r*.7,0,0,TAU);c.fill();c.strokeStyle='rgba(18,16,22,.78)';c.lineWidth=1;
    for(let i=0;i<18;i++){const a=-Math.PI/2+(hash(seed+i)-.5)*2.8,l=r*(.6+.5*hash(seed+i*3));c.beginPath();c.moveTo(x,y+2);c.lineTo(x+Math.cos(a)*l,y+2+Math.sin(a)*l*.6);c.stroke()}};
  brush(30,136,18,84,60,26,10,4,1,.95);brush(48,64,80,46,112,50,4.5,1.4,2,.9);brush(40,92,70,80,98,86,4,1.2,3,.85);brush(58,34,46,24,26,22,3,1,4,.8);
  clump(112,48,11,10);clump(96,84,10,20);clump(26,22,9,30);clump(66,26,9,40);clump(84,46,8,50);
  for(let i=0;i<6;i++)brush(196+i*5,135,198+i*5,126,192+i*7+Math.sin(T+i)*2,114+hash(i)*6,1.6,.5,60+i,.7);   /* grass flicks */
  /* the walker dissolves into the paper, then is brushed back in */
  const a=1-ease(seg(t,.2,.55))+ease(seg(t,.8,1)),fx=152+t*14;c.globalAlpha=a*.9;
  c.fillStyle='#18161c';c.beginPath();c.moveTo(fx-6,106);c.lineTo(fx,99);c.lineTo(fx+6,106);c.fill();c.beginPath();c.moveTo(fx-3,106);c.lineTo(fx+3,106);c.lineTo(fx+5,118);c.lineTo(fx-5,118);c.fill();R(c,fx+6,104,1,15,'#18161c');c.globalAlpha=1;
  R(c,220,8,12,14,'#b8322a');R(c,223,11,6,2,'#f2ead8');R(c,223,15,2,5,'#f2ead8');R(c,227,15,2,5,'#f2ead8');
  gfTag(c,'SUMI-E',150,8,'#e9edf2');gfTag(c,'figure → paper',fx,128,'#e9edf2',6)}};

/* ---------- NPR-16 ukiyo-e: flat plates, key block, bokashi, 1px misregistration ---------- */
DEMOS['NPR-16']={d:6,f:(c,t)=>{
  const T=t*TAU,mx=Math.sin(T)*2,my=Math.cos(T)*1.2,bob=Math.sin(T*2)*1,KEY='#1c1a22';
  R(c,0,0,W,H,'#efe3c8');
  const sky=c.createLinearGradient(0,0,0,74);sky.addColorStop(0,'#1f3f6a');sky.addColorStop(.55,'#9aaeb4');sky.addColorStop(1,'rgba(239,227,200,0)');c.fillStyle=sky;c.fillRect(0,0,W,74);
  const P_={mtn:g=>{g.moveTo(104,98);g.lineTo(150,38);g.lineTo(159,38);g.lineTo(214,98);g.closePath()},
    snow:g=>{g.moveTo(150,38);g.lineTo(159,38);g.lineTo(171,54);g.lineTo(165,51);g.lineTo(161,57);g.lineTo(155,50);g.lineTo(149,56);g.lineTo(144,50);g.lineTo(138,54);g.closePath()},
    wave:g=>{g.moveTo(-2,135);g.bezierCurveTo(6,100,20,68,54,56);g.bezierCurveTo(78,48,100,60,94,76);g.bezierCurveTo(86,66,72,64,66,74);g.bezierCurveTo(60,90,76,112,104,135);g.closePath()},
    band:g=>{g.moveTo(10,135);g.bezierCurveTo(16,104,28,78,54,66);g.bezierCurveTo(66,61,78,62,84,68);g.bezierCurveTo(70,66,60,74,58,84);g.bezierCurveTo(56,100,66,118,84,135);g.closePath()},
    boat:g=>{g.moveTo(118,113+bob);g.lineTo(156,113+bob);g.lineTo(150,119+bob);g.lineTo(124,119+bob);g.closePath()},
    robe:g=>{g.moveTo(132,113+bob);g.lineTo(137,101+bob);g.lineTo(142,113+bob);g.closePath()}};
  const fill=(k,col,o)=>{c.save();if(o)c.translate(mx,my);c.fillStyle=col;c.beginPath();P_[k](c);c.fill();c.restore()};
  const key=k=>{c.strokeStyle=KEY;c.lineWidth=1;c.beginPath();P_[k](c);c.stroke()};
  /* blue plate (shifted) */
  c.save();c.translate(mx,my);const sea=c.createLinearGradient(0,96,0,135);sea.addColorStop(0,'#7aa2c2');sea.addColorStop(1,'#1d3c66');c.fillStyle=sea;c.fillRect(0,96,W,39);c.restore();
  fill('mtn','#3d5c8c',1);fill('wave','#1f4a80',1);fill('band','#7aa6c6',1);
  /* paper-white snow + foam, red + ochre plates (registered) */
  fill('snow','#f6efe0',0);fill('boat','#c89a58',0);fill('robe','#c0392b',0);
  for(let i=0;i<9;i++){const u=i/8,x=lerp(56,94,u)+Math.sin(u*3)*2,y=lerp(55,74,u*u)-Math.sin(u*Math.PI)*4;circ(c,x,y,2.6,'#f6efe0');c.strokeStyle=KEY;c.lineWidth=1;c.beginPath();c.arc(x,y,2.6,Math.PI*.9,Math.PI*2.1);c.stroke()}
  circ(c,137,99+bob,2.5,KEY);
  /* key block on top, never moves */
  for(const k of['mtn','snow','wave','band','boat','robe'])key(k);
  c.strokeStyle=KEY;for(let i=0;i<6;i++){const y=104+i*5,x0=110+i*9;c.beginPath();c.moveTo(x0,y);c.quadraticCurveTo(x0+8,y-2,x0+16,y);c.stroke()}
  R(c,206,10,16,40,'#e6c45a');c.strokeStyle=KEY;c.strokeRect(206.5,10.5,15,39);for(let i=0;i<5;i++)R(c,210,15+i*7,8,3,KEY);
  for(let y=0;y<H;y+=3)R(c,0,y,W,1,'rgba(120,90,50,'+(.03+.03*hash(y))+')');                     /* woodgrain in the paper */
  gfTag(c,'UKIYO-E',34,8,'#e9edf2');gfTag(c,'bokashi',100,24,P.cyan,6);gfTag(c,'misregister',178,72,P.gold,6);gfPoint(c,180,77,196,80,P.gold);gfTag(c,'key block fixed',60,128,'#cfd8e3',6)}};

/* ---------- NPR-17 impasto: SMOOTH | IMPASTO of the same orange ---------- */
DEMOS['NPR-17']={d:6,f:(c,t)=>{
  const T=t*TAU,lx0=-.55+.3*Math.sin(T),ly0=.55,lz0=.62,ll=Math.hypot(lx0,ly0,lz0),L=[lx0/ll,ly0/ll,lz0/ll],Hh=(()=>{const h=[L[0],L[1],L[2]+1],n=Math.hypot(...h);return h.map(v=>v/n)})();
  const OR=[238,132,40],shade=(nx,ny,nz)=>{const d=Math.max(0,nx*L[0]+ny*L[1]+nz*L[2]),s=Math.pow(Math.max(0,nx*Hh[0]+ny*Hh[1]+nz*Hh[2]),28),b=Math.max(0,-ny)*.15;return[OR[0]*(.22+.86*d+b)+255*s*.55,OR[1]*(.22+.86*d+b*.6)+240*s*.55,OR[2]*(.3+.8*d)+220*s*.5]};
  const bgc=(x,y)=>y>92?[96,70,120]:[198,186,160];
  gfPix(c,(x,y)=>{const o=x<120?0:120,cx=o+60,cy=66,r=30,nx=(x-cx)/r,ny=(cy-y)/r,q=nx*nx+ny*ny;
    if(q<1){if(x<120)return shade(nx,ny,Math.sqrt(1-q));return shade(nx,ny,Math.sqrt(1-q)).map(v=>v*.9)}
    const b=bgc(x,y),sh=y>92&&Math.hypot((x-cx-8)/30,(y-98)/6)<1?.6:1;const v=x<120?(y>92?1-(y-92)/120:1-(y/300)):1;return[b[0]*v*sh,b[1]*v*sh,b[2]*v*sh]});
  /* right lane: discrete strokes that wrap the form; thick paint catches a ridge highlight */
  gfLane(c,120,120,()=>{c.lineCap='round';
    for(let i=0;i<70;i++){const x=120+hash(i+1)*120,y=hash(i+2)*H,top=y<92,col=top?gfMix([206,194,168],[176,164,140],hash(i+3)):gfMix([104,76,130],[78,56,100],hash(i+3));c.strokeStyle=gfRGB(col);c.lineWidth=3;c.beginPath();c.moveTo(x-5,y+(top?2:0));c.lineTo(x+5,y-(top?2:0));c.stroke()}
    for(let gy=-30;gy<=30;gy+=5)for(let gx=-30;gx<=30;gx+=5){const id=(gx+40)*97+gy,jx=gx+(hash(id)-.5)*3,jy=gy+(hash(id+7)-.5)*3,q=(jx*jx+jy*jy)/900;if(q>.86)continue;
      const nx=jx/30,ny=-jy/30,nz=Math.sqrt(1-q),col=shade(nx,ny,nz),a=Math.atan2(jy,jx)+Math.PI/2+(hash(id+3)-.5)*.6,len=3.5+hash(id+5)*2.5,dx=Math.cos(a)*len,dy=Math.sin(a)*len,x=180+jx,y=66+jy;
      c.lineWidth=4.2;c.strokeStyle='rgba(60,24,6,.55)';c.beginPath();c.moveTo(x-dx+.6,y-dy+.8);c.lineTo(x+dx+.6,y+dy+.8);c.stroke();
      c.strokeStyle=gfRGB(col);c.beginPath();c.moveTo(x-dx,y-dy);c.lineTo(x+dx,y+dy);c.stroke();
      const rid=Math.max(0,nx*L[0]+ny*L[1]+nz*L[2]);c.lineWidth=1;c.strokeStyle='rgba(255,246,220,'+(.15+.6*rid*rid)+')';c.beginPath();c.moveTo(x-dx-.6,y-dy-.8);c.lineTo(x+dx-.6,y+dy-.8);c.stroke()}
    c.lineCap='butt'});
  for(const o of[0,120]){R(c,o+59,32,2,6,P.woodD);c.fillStyle=P.leaf;c.beginPath();c.ellipse(o+66,34,6,2.5,-.4,0,TAU);c.fill()}
  gfDiv(c,120);gfTag(c,'SMOOTH',60,7);gfTag(c,'IMPASTO',180,7,P.gold);gfTag(c,'blended gradient',60,128,'#cfd8e3',6);gfTag(c,'strokes follow form · ridges',180,128,'#cfd8e3',6)}};

/* ---------- NPR-18 risograph: two spot inks overprint, grainy stencil, drifting plate ---------- */
DEMOS['NPR-18']={d:5,f:(c,t)=>{
  const T=t*TAU,ox=Math.round(Math.sin(T)*1.6),oy=Math.round(Math.cos(T)*1.2),kp=TMP(),gp=kp.getContext('2d'),kb=TMP2(),gb=kb.getContext('2d');
  gp.fillStyle='#000';gp.fillRect(0,0,W,H);gb.fillStyle='#000';gb.fillRect(0,0,W,H);
  const reg=(g,x,y)=>{g.strokeStyle='#fff';g.lineWidth=1;g.beginPath();g.moveTo(x-5,y);g.lineTo(x+5,y);g.moveTo(x,y-5);g.lineTo(x,y+5);g.stroke();g.beginPath();g.arc(x,y,3,0,TAU);g.stroke()};
  /* PINK plate: sun, house walls, face, ground tint */
  circ(gp,150,52,30,'#fff');gp.fillStyle='rgba(255,255,255,.45)';gp.fillRect(30,100,180,26);
  for(const hx of[62,98])R(gp,hx-12,78,24,22,'rgba(255,255,255,.8)');circ(gp,178,98,6,'#fff');R(gp,40,24,60,3,'#fff');
  /* BLUE plate: hills, roofs, windows, body, title, sky screen */
  gb.fillStyle='#fff';gb.beginPath();gb.moveTo(30,100);for(let x=30;x<=210;x+=6)gb.lineTo(x,74+Math.sin(x*.05)*8);gb.lineTo(210,100);gb.fill();
  for(const hx of[62,98]){gb.beginPath();gb.moveTo(hx-15,79);gb.lineTo(hx,64);gb.lineTo(hx+15,79);gb.fill();R(gb,hx-8,84,5,5,'#000');R(gb,hx+3,84,5,5,'#000');R(gb,hx-2,90,4,10,'#fff')}
  R(gb,172,104,12,14,'#fff');R(gb,170,118,5,7,'#fff');R(gb,181,118,5,7,'#fff');
  for(let y=30;y<62;y+=3)for(let x=110;x<210;x+=3){const r=(1-(y-30)/32)*1.1;if(r>.2){gb.beginPath();gb.arc(x,y,r,0,TAU);gb.fill()}}
  gb.font='bold 16px monospace';gb.textAlign='left';gb.textBaseline='alphabetic';gb.fillText('RISO',40,22+0);
  for(const[x,y]of[[16,12],[224,12],[16,123],[224,123]]){reg(gp,x,y);reg(gb,x,y)}
  const pd=gfGrab(kp).data,bd=gfGrab(kb).data,paper=[244,236,216],PK=[255,72,176],BL=[0,120,191];
  gfPix(c,(x,y)=>{const sx=x-ox,sy=y-oy,pi=(sx>=0&&sx<W&&sy>=0&&sy<H)?pd[(sy*W+sx)*4]/255:0,bi=bd[(y*W+x)*4]/255;
    const n1=hash(x*1.7+y*91.3)*.5+gfVN(x*.3,y*.3,2)*.5,n2=hash(x*5.3+y*17.9+3)*.5+gfVN(x*.3,y*.3,8)*.5;
    const ip=gfSat((pi-n1*.9+.06)*5)*(.82+.18*gfVN(x*.06,y*.06,4)),ib=gfSat((bi-n2*.9+.06)*5)*(.85+.15*gfVN(x*.06,y*.06,5));
    const f=(k)=>paper[k]*(1-ip*(1-PK[k]/255))*(1-ib*(1-BL[k]/255));const fib=hash(x*3.3+y*5.1)*6;return[f(0)-fib,f(1)-fib,f(2)-fib]});
  gfTag(c,'RISO',120,8,'#e9edf2');gfTag(c,'overlap → purple',200,40,'#e9edf2',6);gfPoint(c,190,45,160,74,'#e9edf2');gfTag(c,'pink + blue offset',120,128,'#ff7ac8',6)}};

/* ---------- NPR-19 papercraft: cut sheets with edges and drop shadows ---------- */
DEMOS['NPR-19']={d:6,f:(c,t)=>{
  const T=t*TAU;
  const layer=(i,shape,face,side)=>{const ox=Math.sin(T+i*.7)*i*.7,oy=Math.cos(T*2+i)*.3;
    c.save();c.translate(ox+2.5,oy+3.5);shape('rgba(30,20,40,.28)');c.restore();
    c.save();c.translate(ox,oy+2);shape(side);c.restore();c.save();c.translate(ox,oy);shape(face);c.restore()};
  const fillP=pts=>col=>{c.fillStyle=col;c.beginPath();pts.forEach((p,n)=>n?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.closePath();c.fill()};
  const hill=(y0,a,f,ph)=>{const p=[[-10,H+4]];for(let x=-10;x<=W+10;x+=5)p.push([x,y0+Math.sin(x*f+ph)*a]);p.push([W+10,H+4]);return fillP(p)};
  R(c,0,0,W,H,'#cfe6ee');for(let i=0;i<5;i++)R(c,0,i*14,W,7,'rgba(255,255,255,.12)');
  layer(1,col=>circ(c,186,30,14,col),'#f6d266','#c8a23e');
  layer(2,col=>{for(const[x,y]of[[40,22],[110,16]]){c.fillStyle=col;c.beginPath();c.ellipse(x,y,14,6,0,0,TAU);c.ellipse(x+10,y-4,9,6,0,0,TAU);c.fill()}},'#ffffff','#c8d4dc');
  layer(3,hill(62,7,.035,0),'#b4d496','#8aae70');
  layer(4,hill(76,6,.05,2),'#86bf6c','#5f9a4c');
  layer(5,col=>{c.fillStyle=col;for(const[x,w,h]of[[48,26,18],[92,22,22],[150,28,16]]){c.fillRect(x-w/2,96-h,w,h)}for(const x of[124,196,24])c.fillRect(x-1.5,82,3,14)},'#f2e0b8','#c8b088');
  layer(6,col=>{c.fillStyle=col;for(const[x,w,h]of[[48,26,18],[92,22,22],[150,28,16]]){c.beginPath();c.moveTo(x-w/2-3,97-h);c.lineTo(x,82-h);c.lineTo(x+w/2+3,97-h);c.fill()}for(const x of[124,196,24]){c.beginPath();c.arc(x,76,9,0,TAU);c.fill()}},'#d0604a','#9a4434');
  for(const[x,w,h]of[[48,26,18],[92,22,22],[150,28,16]]){const ox=Math.sin(T+5*.7)*5*.7;R(c,x-3+ox,88,6,8,'#5a4632');R(c,x-w/2+3+ox,96-h+3,4,4,'#4a6a7a')}
  for(const x of[124,196,24]){const ox=Math.sin(T+6*.7)*6*.7;circ(c,x+ox,76,8,'#4f9a4a')}
  layer(7,hill(100,4,.06,1),'#5a9a4a','#3d7236');
  layer(8,fillP([[-10,112],[W+10,108],[W+10,120],[-10,124]]),'#e2c48a','#b89a62');
  /* paper-doll hero hops along the front sheet */
  const hx=lerp(30,210,.5-.5*Math.cos(T)),hy=116-Math.abs(Math.sin(T*6))*4;c.fillStyle='rgba(30,20,40,.28)';c.beginPath();c.ellipse(hx+3,118,7,2,0,0,TAU);c.fill();
  spr(c,'hero',hx+1,hy+2,{sx:2,sy:2,sil:'#7a5a40',flip:Math.sin(T)<0});spr(c,'hero',hx,hy,{sx:2,sy:2,flip:Math.sin(T)<0});R(c,hx-1,hy,2,6,'#b89a62');
  layer(9,hill(126,2,.08,3),'#4a8a3e','#2f6230');
  gfTag(c,'PAPERCRAFT',40,8,'#e9edf2');gfTag(c,'stacked layers',120,8,P.cyan,6);gfTag(c,'2px edge + shadow',196,58,'#e9edf2',6);gfPoint(c,196,63,200,72,'#e9edf2')}};

/* ---------- NPR-20 stained-glass cells: the picture itself is leaded glass ---------- */
let _gf20=null;
DEMOS['NPR-20']={d:6,f:(c,t)=>{
  const T=t*TAU;
  const COL=[[26,22,24],[255,206,70],[40,70,190],[90,146,228],[120,84,184],[46,160,66],[136,80,40],[250,200,150],[216,44,44],[232,190,110],[76,170,74]];
  if(!_gf20){const reg=new Int8Array(W*H),cell=new Int32Array(W*H),dd=new Float32Array(W*H),S=10,sd=(i,j)=>[i*S+S/2+(hash(i*17+j*131)-.5)*S*.8,j*S+S/2+(hash(i*29+j*71+5)-.5)*S*.8];
    for(let y=0;y<H;y++)for(let x=0;x<W;x++){const p=y*W+x,ar=y-(64-Math.sqrt(Math.max(0,84*84-(x-120)*(x-120))));let r;
      if(x<40||x>200||ar<0)r=0;else if(Math.hypot(x-152,y-38)<13)r=1;else if(Math.hypot(x-128,y-88)<5.5)r=7;else if(y>=93&&y<=114&&Math.abs(x-128)<4+(y-93)*.3)r=8;
      else if(Math.hypot(x-74,y-72)<17)r=5;else if(Math.abs(x-74)<3&&y>86&&y<116)r=6;else if(y<80+Math.sin(x*.05)*6)r=y<46?2:3;else if(y<94+Math.sin(x*.03+1)*5)r=4;else if(y>94&&Math.abs(x-108)<(y-94)*.9+2)r=9;else r=10;
      reg[p]=r;const gi=Math.floor(x/S),gj=Math.floor(y/S);let d1=1e9,d2=1e9,id=0;for(let j=gj-1;j<=gj+1;j++)for(let i=gi-1;i<=gi+1;i++){const s=sd(i,j),d=Math.hypot(x-s[0],y-s[1]);if(d<d1){d2=d1;d1=d;id=i*1000+j}else if(d<d2)d2=d}
      cell[p]=id;dd[p]=(d2-d1)<1.3?-1:d1}
    _gf20={reg,cell,dd}}
  const{reg,cell,dd}=_gf20;
  gfPix(c,(x,y)=>{const p=y*W+x,r=reg[p];if(!r){const s=((x>>3)+(y>>3))&1?30:24;return[s,s-3,s-1]}
    const edge=dd[p]<0||(x<W-1&&reg[p+1]!==r)||(y<H-1&&reg[p+W]!==r)||(x<W-1&&reg[p+1]===0);if(edge)return[22,20,24];
    const key=cell[p]*16+r,v=.78+.22*hash(key),glow=.82+.3*(1-Math.min(1,dd[p]/7))+.12*Math.sin(T+hash(key*3)*TAU)+(r===1?.15*Math.sin(T*2):0),n=(hash(x*3.7+y*11.1)-.5)*.06,b=COL[r];
    return[Math.min(255,b[0]*v*(glow+n)),Math.min(255,b[1]*v*(glow+n)),Math.min(255,b[2]*v*(glow+n))]});
  gfTag(c,'LEADED CELLS',36,8,P.gold);gfTag(c,'the picture is glass',204,128,P.cyan,6)}};

/* ---------- NPR-21 authored shadow colours: SWATCH | MULTIPLY BLACK ---------- */
DEMOS['NPR-21']={d:6,f:(c,t)=>{
  const T=t*TAU,l0=[Math.cos(T),Math.sin(T)*.8,.3],ln=Math.hypot(...l0),L=l0.map(v=>v/ln);
  const M=[['SKIN',gfHex('#f0c69a'),gfHex('#b4503a')],['CLOTH',gfHex('#e05a64'),gfHex('#2e2870')],['LEAF',gfHex('#84c84c'),gfHex('#1c5c66')]];
  gfPix(c,(x,y)=>{const lane=x<120?0:1,o=lane*120;for(let m=0;m<3;m++){const cx=o+22+m*38,cy=54,r=15,nx=(x-cx)/r,ny=(cy-y)/r,q=nx*nx+ny*ny;if(q>1)continue;const nz=Math.sqrt(1-q),nd=nx*L[0]+ny*L[1]+nz*L[2],k=gfSS(-.18,.28,nd),al=M[m][1];
      if(!lane){const s=gfMix(M[m][2],al,k);return s.map((v,i)=>Math.min(255,v+al[i]*.14*Math.max(0,nd)))}return al.map(v=>Math.min(255,v*lerp(.16,1,k)+v*.14*Math.max(0,nd)))}
    const s=y>74?212:224;return[s,s-4,s-10]});
  for(let lane=0;lane<2;lane++)for(let m=0;m<3;m++){const o=lane*120,cx=o+22+m*38,al=M[m][1],sh=lane?al.map(v=>v*.16):M[m][2];
    c.fillStyle='rgba(0,0,0,.18)';c.beginPath();c.ellipse(cx,73,12,2.5,0,0,TAU);c.fill();
    R(c,cx-12,84,24,12,P.ink);R(c,cx-11,85,11,10,gfRGB(al));R(c,cx,85,11,10,gfRGB(sh));txt(c,M[m][0],cx,103,'#2a3040',6);txt(c,'lit',cx-6,111,'#5a6070',5);txt(c,'shd',cx+6,111,'#5a6070',5)}
  gfDiv(c,120);gfTag(c,'SWATCH',60,7,P.gold);gfTag(c,'MULTIPLY BLACK',180,7);gfTag(c,'shadow = new hue',60,126,'#e9edf2',6);gfTag(c,'shadow = darker albedo',180,126,'#e9edf2',6)}};

/* ---------- NPR-22 core-shadow band: dark band at the terminator, lighter form shadow ---------- */
DEMOS['NPR-22']={d:7,f:(c,t)=>{
  const T=t*TAU,az=lerp(.55,1.45,.5-.5*Math.cos(T))+Math.sin(T)*.12,l0=[Math.sin(az),.35,Math.cos(az)*.6],ln=Math.hypot(...l0),L=l0.map(v=>v/ln),AL=[226,150,118],CORE=[118,44,40];
  const val=(nx,ny,nz)=>{const nd=nx*L[0]+ny*L[1]+nz*L[2],base=nd>0?.64+.36*nd:.5+.14*Math.max(0,-ny)+.1*Math.min(1,-nd*1.5),core=gfSS(.1,0,nd)*gfSS(-.36,-.2,nd);
    return gfMix(AL.map(v=>v*base),CORE,core)};
  const balls=[[72,58,30],[176,70,20]];
  gfPix(c,(x,y)=>{for(const[cx,cy,r]of balls){const nx=(x-cx)/r,ny=(cy-y)/r,q=nx*nx+ny*ny;if(q<=1)return val(nx,ny,Math.sqrt(1-q))}
    if(y>92){const s=Math.hypot((x-72+L[0]*24)/30,(y-96)/5)<1||Math.hypot((x-176+L[0]*16)/20,(y-94)/3.5)<1?.62:1;return[70*s,76*s,92*s]}return[46,52,66]});
  /* value profile along the big ball's equator */
  const gx0=20,gw=104,gy=128;R(c,gx0-2,gy-20,gw+4,22,'rgba(10,14,24,.72)');let mn=9,mx=0;
  for(let i=0;i<gw;i++){const nx=(i/(gw-1))*2-1,nz=Math.sqrt(Math.max(0,1-nx*nx)),v=val(nx,0,nz),lv=gfLuma(...v)/255;if(lv<mn){mn=lv;mx=i}R(c,gx0+i,gy-lv*18,1,lv*18,gfRGB(v))}
  const coreX=balls[0][0]+((mx/(gw-1))*2-1)*balls[0][2];R(c,gx0+mx,gy-19,1,19,P.gold);
  gfTag(c,'CORE',coreX,balls[0][1]-38,P.gold);gfPoint(c,coreX,balls[0][1]-33,coreX,balls[0][1]-6,P.gold);
  gfTag(c,'CORE BAND',36,7,P.gold);gfTag(c,'at terminator',204,7,P.cyan);txt(c,'value across',gx0+gw+6,gy-14,'#cfd8e3',5,'left');txt(c,'the equator',gx0+gw+6,gy-7,'#cfd8e3',5,'left');
  gfTag(c,'form shadow lighter',150,104,'#e9edf2',6)}};

/* ---------- NPR-23 face shadows: CAVITY AO | AUTHORED shapes ---------- */
DEMOS['NPR-23']={d:6,f:(c,t)=>{
  const T=t*TAU,yaw=Math.sin(T)*.38,blink=Math.abs(Math.sin(T*3))<.06;
  for(const lane of[0,1])gfLane(c,lane*120,120,()=>{const cx=lane*120+60,cy=62,fx=cx+yaw*20,sp=11*(1-Math.abs(yaw)*.3);
    R(c,lane*120,0,120,H,'#3a4558');c.fillStyle='#4a78c8';c.beginPath();c.ellipse(cx,cy+66,40,22,0,0,TAU);c.fill();R(c,cx-9,cy+26,18,24,P.skin);
    c.fillStyle=P.skin;c.beginPath();c.ellipse(cx,cy,28,34,0,0,TAU);c.fill();c.beginPath();c.ellipse(cx-27-yaw*6,cy+2,4,7,0,0,TAU);c.ellipse(cx+27-yaw*6,cy+2,4,7,0,0,TAU);c.fill();
    c.save();c.beginPath();c.ellipse(cx,cy,28,34,0,0,TAU);c.rect(cx-40,cy+30,80,40);c.clip();
    if(!lane){/* anatomical cavities: soft, and they slide through the creases as the head turns */
      const blob=(x,y,r,a)=>{const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,'rgba(90,40,30,'+a+')');g.addColorStop(1,'rgba(90,40,30,0)');c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2)};
      for(const s of[-1,1])blob(fx+s*sp,cy-3,10,.42);blob(fx+yaw*8-3,cy+11,6,.35);blob(fx+yaw*8+3,cy+11,6,.35);blob(fx,cy+25,6,.32);blob(cx,cy+34,18,.55);
      c.strokeStyle='rgba(110,50,40,.35)';c.lineWidth=1;for(const s of[-1,1]){c.beginPath();c.arc(fx+s*7,cy+16,7,s>0?-.4:Math.PI-.9,s>0?.9:Math.PI+.4);c.stroke()}}
    else{/* authored: flat designed shapes that keep their silhouette */
      const ox=yaw*14,SH='#c47c62';c.fillStyle=SH;
      c.beginPath();c.moveTo(cx-28+ox*.4,cy-8);c.lineTo(cx-12+ox,cy-2);c.lineTo(cx-16+ox,cy+16);c.lineTo(cx-8+ox,cy+30);c.lineTo(cx-28,cy+30);c.closePath();c.fill();
      c.beginPath();c.moveTo(fx+yaw*8-5,cy+13);c.lineTo(fx+yaw*8+5,cy+13);c.lineTo(fx+yaw*8,cy+17);c.closePath();c.fill();
      c.beginPath();c.moveTo(cx-14,cy+30);c.quadraticCurveTo(cx+ox*.5,cy+42,cx+16,cy+28);c.lineTo(cx+16,cy+44);c.lineTo(cx-14,cy+44);c.closePath();c.fill();
      for(const s of[-1,1])R(c,fx+s*sp-5,cy-8,10,2,SH)}
    c.restore();
    c.fillStyle=P.woodD;c.beginPath();c.ellipse(cx+yaw*6,cy-22,29,16,0,Math.PI,0);c.fill();R(c,cx-29+yaw*6,cy-24,58,6,P.woodD);
    for(const s of[-1,1]){const ex=fx+s*sp;if(blink)R(c,ex-4,cy-2,8,1,P.ink);else{R(c,ex-4,cy-4,8,5,'#ffffff');R(c,ex-1+yaw*3,cy-4,3,5,P.ink)}R(c,ex-5,cy-9,10,2,P.woodD)}
    R(c,fx+yaw*8-1,cy+2,2,10,'#d8a878');R(c,fx-6,cy+21,12,2,'#a8503c')});
  gfDiv(c,120);gfTag(c,'CAVITY AO',60,7,P.cyan);gfTag(c,'AUTHORED',180,7,P.gold);gfTag(c,'crawls with creases',60,128,'#cfd8e3',6);gfTag(c,'shapes hold as head turns',180,128,'#cfd8e3',6)}};

/* ---------- NPR-24 cavity + ridge on a carved panel: AO ONLY | CAVITY + RIDGE ---------- */
let _gf24=null;
DEMOS['NPR-24']={d:6,f:(c,t)=>{
  const T=t*TAU,LW=120;
  if(!_gf24){const h=new Float32Array(LW*H);
    for(let v=0;v<H;v++)for(let u=0;u<LW;u++){let z=-1;if(u>=10&&u<110&&v>=14&&v<124){const e=Math.min(u-10,109-u,v-14,123-v);z=e<6?1-Math.max(0,e-3)/3*.0:0;if(e<6)z=e<3?1:1-(e-3)/3;
      const dx=u-60,dy=v-50,d=Math.hypot(dx,dy),a=Math.atan2(dy,dx),pr=13+5*Math.cos(a*6);if(d<pr)z=Math.max(z,.85*Math.sqrt(1-(d/pr)**2));if(d<5)z=Math.max(z,1.1*Math.sqrt(1-(d/5)**2)+.2);if(Math.abs(d-24)<1.2)z=-.45;
      if(v>66&&v<74)for(let i=0;i<10;i++){const bd=Math.hypot(u-(19+i*9.1),v-70);if(bd<3.2)z=Math.max(z,.6*Math.sqrt(1-(bd/3.2)**2))}
      const vy=100+7*Math.sin((u-14)*.09),vd=Math.abs(v-vy);if(u>16&&u<104&&vd<3)z=Math.max(z,.75*Math.sqrt(1-(vd/3)**2));
      for(let i=0;i<5;i++){const lu=24+i*18,lv=100+7*Math.sin((lu-14)*.09)+(i%2?-8:8),ld=Math.hypot((u-lu)/6,(v-lv)/3);if(ld<1)z=Math.max(z,.55*Math.sqrt(1-ld*ld))}
      for(const[cu,cv]of[[22,26],[98,26],[22,112],[98,112]]){if(Math.abs((u-cu)+(v-cv))<1&&Math.abs(u-cu)<5)z=-.4}}
      h[v*LW+u]=z*6}
    const bl=new Float32Array(LW*H),tmp=new Float32Array(LW*H),r=5;
    for(let v=0;v<H;v++)for(let u=0;u<LW;u++){let s=0,n=0;for(let k=-r;k<=r;k++){const uu=u+k;if(uu>=0&&uu<LW){s+=h[v*LW+uu];n++}}tmp[v*LW+u]=s/n}
    for(let v=0;v<H;v++)for(let u=0;u<LW;u++){let s=0,n=0;for(let k=-r;k<=r;k++){const vv=v+k;if(vv>=0&&vv<H){s+=tmp[vv*LW+u];n++}}bl[v*LW+u]=s/n}
    const hh=(u,v)=>h[clamp(v,0,H-1)*LW+clamp(u,0,LW-1)],ao=new Float32Array(LW*H),cv=new Float32Array(LW*H),nx=new Float32Array(LW*H),ny=new Float32Array(LW*H);
    for(let v=0;v<H;v++)for(let u=0;u<LW;u++){const p=v*LW+u;ao[p]=gfSat((bl[p]-h[p])*.32);const lap=hh(u+1,v)+hh(u-1,v)+hh(u,v+1)+hh(u,v-1)-4*h[p];cv[p]=Math.max(-1,Math.min(1,lap*.35));nx[p]=-(hh(u+1,v)-hh(u-1,v))*.5;ny[p]=-(hh(u,v+1)-hh(u,v-1))*.5}
    _gf24={h,ao,cv,nx,ny}}
  const{h,ao,cv,nx,ny}=_gf24,lx=Math.cos(T)*.3,ly=-.25+Math.sin(T)*.15,AL=[178,136,92];
  gfPix(c,(x,y)=>{const lane=x<120?0:1,u=x-lane*120,p=y*LW+u;if(h[p]<-5)return[34,28,24];const n=[nx[p],ny[p],1],nl=Math.hypot(...n),nd=(n[0]*lx+n[1]*ly+1)/nl/Math.hypot(lx,ly,1),dif=.72+.28*nd;
    let k=dif*(1-ao[p]*.6);if(!lane)return AL.map(v=>v*k);const cav=Math.max(0,cv[p]),rid=Math.max(0,-cv[p]);k*=1-cav*.75;return AL.map((v,i)=>Math.min(255,v*k+rid*[120,104,80][i]))});
  gfTag(c,'groove',214,30,'#e9edf2',6);gfPoint(c,214,35,180+24*Math.cos(.6),50+24*Math.sin(.6),'#e9edf2');gfTag(c,'ridge',210,88,P.gold,6);gfPoint(c,206,93,190,100+7*Math.sin((70-14)*.09),P.gold);
  gfDiv(c,120);gfTag(c,'AO ONLY',60,7);gfTag(c,'CAVITY + RIDGE',180,7,P.gold);gfTag(c,'corners dark only',60,129,'#cfd8e3',6);gfTag(c,'grooves darker · edges lifted',180,129,'#cfd8e3',6)}};
})();
