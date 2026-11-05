/* ===== PIX demos — original procedural pixel art, all crisp nearest-neighbour (rect fills only, no anti-aliased paths) ===== */
const pxM={
npc:{m:["...hhhhh...","..hhhhhhh..","..hhhhsss..","..hhsssks..","..hhssssss.","...hsssss..","....sss....","...bbbbb...","..bbbbbbb..",".bbBbbbbbb.",".sbBbbbbbs.","..bBbbbbb..","...ppppp...","...pp.pp...","...pp.pp...","...ddd.ddd."],
 c:{h:'#6b3f22',s:P.skin,k:P.ink,b:P.blue,B:'#34589a',p:'#5b4a3a',d:P.woodD}},
foe:{m:["G.........G","Gg.ggggg.gG",".ggggggggg.","..gggggwkg.","..gggggggg.","...gggGGg..","....ggg....","...ttttt...","..gtttttg..","..gtTtttg..","...ttttt...","...g...g...","...dd...dd."],
 c:{g:P.foe,G:P.foeD,w:'#ffe9a8',k:P.ink,t:P.wood,T:P.woodD,d:'#3b2a1a'}},
sword:{m:["............kk..","...........kwwk.","..........kwwBk.",".........kwwBk..","........kwwBk...",".......kwwBk....","......kwwBk.....","..kk.kwwBk......","..kgkwwBk.......","...kgwBk........","....kgk.........","...kbkgk........","..kbk.kgk.......",".kbk...kk.......",".kk.............","................"],
 c:{k:P.ink,w:'#e8eef5',B:'#8d9aab',g:P.gold,b:P.woodD}}
};
const pxC={};
function pxSpr(n,pal,key){const ck=n+'|'+(key||(pal?JSON.stringify(pal):''));if(pxC[ck])return pxC[ck];const d=pxM[n],m=d.m,h=m.length,w=Math.max(...m.map(r=>r.length)),k=mk(w,h),g=k.getContext('2d'),cp=Object.assign({},d.c,pal||{});for(let y=0;y<h;y++)for(let x=0;x<w;x++){const ch=m[y][x];if(!ch||ch==='.')continue;g.fillStyle=cp[ch]||'#f0f';g.fillRect(x,y,1,1)}k.pv=Math.floor(w/2);return pxC[ck]=k}
/* pivot column lands on pixel column x, feet bottom row on y-1; flip mirrors about the pivot column (no 1px hop) */
function pxDrawK(c,k,x,y,o={}){const s=o.s||1,w=k.width,h=k.height,pv=k.pv==null?Math.floor(w/2):k.pv;x=Math.round(x);y=Math.round(y);c.save();c.imageSmoothingEnabled=false;if(o.alpha!=null)c.globalAlpha=o.alpha;if(o.flip){c.translate(x+(pv+1)*s,y-h*s);c.scale(-1,1);c.drawImage(k,0,0,w*s,h*s)}else c.drawImage(k,x-pv*s,y-h*s,w*s,h*s);c.restore()}
function pxDraw(c,n,x,y,o={}){pxDrawK(c,pxSpr(n,o.pal,o.key),x,y,o)}
function pxDisc(c,cx,cy,r,col){for(let j=-r;j<r;j++){const hw=Math.floor(Math.sqrt(Math.max(0,r*r-(j+.5)*(j+.5)))+.5);if(hw>0)R(c,cx-hw,cy+j,hw*2,1,col)}}
function pxShadow(c,x,y,rw,a=.35){const hh=Math.max(1,Math.round(rw*.4));c.fillStyle='rgba(0,0,0,'+a+')';for(let j=-hh;j<hh;j++){const hw=Math.floor(rw*Math.sqrt(Math.max(0,1-((j+.5)/hh)**2))+.5);if(hw>0)c.fillRect(Math.round(x)-hw+1,Math.round(y)+j-1,hw*2-1,1)}}
function pxTree(c,x,y,r=8){x=Math.round(x);y=Math.round(y);R(c,x-1,y-7,3,7,P.woodD);R(c,x-1,y-1,3,1,'#3a2414');const cy=y-7-r+2;pxDisc(c,x+1,cy,r,P.leafD);pxDisc(c,x,cy-1,r-1,P.leaf);pxDisc(c,x-2,cy-3,Math.max(2,r-5),'#5aa84a')}
function pxHouse(c,x,y){x=Math.round(x);y=Math.round(y);R(c,x-12,y-12,25,12,P.wall);R(c,x-12,y-2,25,2,P.wallD);R(c,x-2,y-8,5,8,P.woodD);R(c,x-9,y-9,4,4,'#6f8a99');R(c,x+6,y-9,4,4,'#6f8a99');for(let i=0;i<7;i++)R(c,x-14+i*2,y-14-i*2,29-i*4,2,i%2?P.roofD:P.roof);R(c,x-14,y-13,29,1,P.roofD)}
function pxGrass(c,x0,y0,w,h,ox=0,oy=0,c1=P.grass,c2=P.grass2){R(c,x0,y0,w,h,c1);c.fillStyle=c2;for(let i=0;i<260;i++){const wx=Math.floor(hash(i+11)*480),wy=Math.floor(hash(i+77)*270);let sx=((wx-Math.round(ox))%480+480)%480,sy=((wy-Math.round(oy))%270+270)%270;if(sx<w&&sy<h)c.fillRect(x0+sx,y0+sy,2,1)}}
function pxLab(c,s,x,y,col='#e9edf2'){const ww=Math.ceil(s.length*4.3);R(c,x-ww/2-2,y-5,ww+4,10,'rgba(10,14,22,.78)');label(c,s,x,y,col)}
function pxHiLab(c,s,x,y,col='#e9edf2'){const ww=Math.ceil(s.length*8.5);R(c,x-ww/2-4,y-10,ww+8,20,'rgba(10,14,22,.82)');txt(c,s,x,y,col,14)}
function pxClip(c,x,y,w,h){c.save();c.beginPath();c.rect(x,y,w,h);c.clip()}
function pxHex(h){h=h.replace('#','');return[parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)]}
function pxHsl(hh,s,l){hh=((hh%360)+360)%360/360;const f=n=>{const k=(n+hh*12)%12,a=s*Math.min(l,1-l);return Math.round(255*(l-a*Math.max(-1,Math.min(k-3,9-k,1))))};return[f(0),f(8),f(4)]}
function pxRgb(a){return'rgb('+a[0]+','+a[1]+','+a[2]+')'}
/* Scale2x / EPX on a canvas -> new canvas (2x) */
const pxS2c={};
function pxScale2x(k,key){if(key&&pxS2c[key])return pxS2c[key];const w=k.width,h=k.height,s=new Uint32Array(k.getContext('2d').getImageData(0,0,w,h).data.buffer),o=mk(w*2,h*2),og=o.getContext('2d'),id=og.createImageData(w*2,h*2),d=new Uint32Array(id.data.buffer),A=(x,y)=>s[Math.min(h-1,Math.max(0,y))*w+Math.min(w-1,Math.max(0,x))];for(let y=0;y<h;y++)for(let x=0;x<w;x++){const E=A(x,y),B=A(x,y-1),D=A(x-1,y),F=A(x+1,y),Hh=A(x,y+1);let e0=E,e1=E,e2=E,e3=E;if(B!==Hh&&D!==F){e0=D===B?D:E;e1=B===F?F:E;e2=D===Hh?D:E;e3=Hh===F?F:E}const i=(2*y)*2*w+2*x;d[i]=e0;d[i+1]=e1;d[i+2*w]=e2;d[i+2*w+1]=e3}og.putImageData(id,0,0);o.pv=k.pv!=null?k.pv*2:undefined;if(key)pxS2c[key]=o;return o}
function pxGrid(c,x,y,w,h,s,col='rgba(0,0,0,.18)'){c.fillStyle=col;for(let i=0;i<=w;i++)c.fillRect(x+i*s,y,1,h*s);for(let j=0;j<=h;j++)c.fillRect(x,y+j*s,w*s,1)}
/* a small world strip used by scrolling demos (world coords) */
function pxWorld(g,ox,oy,w,h){pxGrass(g,0,0,w,h,ox,oy);R(g,0,Math.round(64-oy),w,12,P.dirt);R(g,0,Math.round(75-oy),w,1,P.dirtD);for(let i=-1;i<12;i++){const wx=i*44+10;const sx=Math.round(wx-ox);if(sx>-20&&sx<w+20)pxTree(g,sx,Math.round(56-oy),7)}for(let i=0;i<40;i++){const sx=Math.round(i*10-ox);if(sx>-4&&sx<w+4){R(g,sx,Math.round(84-oy),2,6,P.wood)}}R(g,0,Math.round(85-oy),w,1,P.woodD);R(g,0,Math.round(88-oy),w,1,P.woodD)}

/* PIX-01 integer scaling */
let px01k=null;
DEMOS['PIX-01']={d:3,hi:true,f:(c,t)=>{const k=px01k||(px01k=mk(48,36)),g=k.getContext('2d');g.imageSmoothingEnabled=false;pxGrass(g,0,0,48,36,5,9);pxTree(g,9,24,7);const vx=26+Math.round(12*Math.sin(t*TAU));pxShadow(g,vx,32,4);pxDraw(g,'npc',vx,32,{flip:Math.cos(t*TAU)<0});pxDraw(g,'foe',41,20,{flip:true});
R(c,0,0,480,270,'#121822');const chk=mk(16,1),cg=chk.getContext('2d');for(let i=0;i<16;i++){cg.fillStyle=i%2?P.ink:'#fff';cg.fillRect(i,0,1,1)}
const cols=[[10,3,false,'3x integer',P.cyan],[166,2.5,false,'2.5x nearest',P.gold],[322,3,true,'3x bilinear',P.red]];
cols.forEach(([x,s,sm,l,col])=>{c.imageSmoothingEnabled=sm;c.drawImage(k,x,40,Math.round(48*s),Math.round(36*s));c.drawImage(chk,x,40+112+10,Math.round(16*s),12);c.drawImage(chk,0,0,8,1,x,40+112+30,Math.round(8*s*2),24);c.imageSmoothingEnabled=false;pxHiLab(c,l,x+72,22,col)});
txt(c,'every pixel 3x3',82,245,P.cyan,12);txt(c,'pixels 2 or 3 wide',238,245,P.gold,12);txt(c,'soft edges',394,245,P.red,12)}};

/* PIX-02 pixel snapping */
DEMOS['PIX-02']={d:4,f:(c,t,_w,_h,p)=>{const s=t*p.dur,hx=40+s*9.37,cam=hx-59+2.6*Math.sin(s*1.7);const T=TMP(),g=T.getContext('2d');
for(const [ox,snap] of [[0,false],[122,true]]){g.save();g.beginPath();g.rect(ox,0,118,135);g.clip();g.imageSmoothingEnabled=!snap;const cx=snap?Math.round(cam):cam;g.translate(ox-cx,10);
/* draw world in world coords (fractional translate = blurry/AA edges) */
g.fillStyle=P.grass;g.fillRect(cx-2,-12,124,140);for(let i=0;i<30;i++){g.fillStyle=P.grass2;g.fillRect(i*13+(i%3)*4,(i*37)%100,2,1)}g.fillStyle=P.dirt;g.fillRect(cx-2,64,124,12);g.fillStyle=P.dirtD;g.fillRect(cx-2,75,124,1);for(let i=0;i<12;i++){const wx=i*44+10;g.fillStyle=P.woodD;g.fillRect(wx-1,49,3,7);g.fillStyle=P.leafD;g.fillRect(wx-6,36,13,13);g.fillStyle=P.leaf;g.fillRect(wx-5,35,10,10);g.fillStyle='#5aa84a';g.fillRect(wx-4,36,4,3)}for(let i=0;i<40;i++){g.fillStyle=P.wood;g.fillRect(i*10,84,2,6)}
const k=pxSpr('npc'),x=snap?Math.round(hx):hx;g.drawImage(k,x-5,73-16);g.restore()}
c.drawImage(T,0,0);R(c,118,0,4,135,'#0b0f16');
for(const ox of [0,122]){const srcx=ox+Math.round(hx-cam)-7;R(c,ox+4,88,47,47,P.ink);c.imageSmoothingEnabled=false;c.drawImage(T,srcx,60,15,15,ox+5,89,45,45)}
pxLab(c,'float positions',59,8,P.red);pxLab(c,'snapped (whole px)',181,8,P.cyan);label(c,'3x zoom',80,124);label(c,'3x zoom',202,124)}};

/* PIX-03 sub-pixel camera smoothing */
let px03k=null;
DEMOS['PIX-03']={d:4,hi:true,f:(c,t,_w,_h,p)=>{const s=t*p.dur,cam=40+s*2.6;const k=px03k||(px03k=mk(60,46)),g=k.getContext('2d');R(c,0,0,480,270,'#121822');
const draw=(ci)=>{g.imageSmoothingEnabled=false;g.clearRect(0,0,60,46);pxWorld(g,ci,30,60,46);const hx=Math.round(cam+29)-ci;pxDraw(g,'npc',hx,44)};
/* left: camera snapped to whole art pixels -> 4px screen steps */
const ci=Math.round(cam);draw(ci);pxClip(c,8,34,228,176);c.drawImage(k,0,0,57,44,8,34,228,176);c.restore();
/* right: render at floor(cam) with 1px margin, then offset the upscaled image by the remainder in screen pixels */
const cf=Math.floor(cam),fr=cam-cf;draw(cf);pxClip(c,244,34,228,176);c.drawImage(k,244-Math.round(fr*4),34,240,184);c.restore();
pxHiLab(c,'snapped camera',122,18,P.gold);pxHiLab(c,'+ remainder offset',358,18,P.cyan);
/* position-over-time plot */
R(c,8,216,464,48,'#0b0f16');for(let i=0;i<=200;i++){const u=i/200,cv=40+u*p.dur*2.6,ys=(cv-40)/(p.dur*2.6);R(c,12+i*1.1,258-Math.round(Math.round(cv)-40)*3.5,2,2,P.gold);R(c,250+i*1.1,258-Math.round((cv-40)*3.5),2,2,P.cyan)}R(c,12+t*220,218,1,44,'#fff');R(c,250+t*220,218,1,44,'#fff');txt(c,'steps',200,226,P.gold,11);txt(c,'smooth',440,226,P.cyan,11)}};

/* PIX-04 pixel-art upscaling filters */
const px04k=[];
DEMOS['PIX-04']={d:2,hi:true,f:(c,t)=>{const fr=Math.floor(t*4)%2;let k=px04k[fr];if(!k){k=px04k[fr]=mk(36,28);const g=k.getContext('2d');pxGrass(g,0,0,36,28,20,40);pxDisc(g,28,7,5,P.leafD);pxDisc(g,27,6,4,P.leaf);pxShadow(g,12,26,4);pxDraw(g,'npc',12,26);pxShadow(g,26,26,4);pxDraw(g,'foe',26,26-fr,{flip:true})}
const k4=pxScale2x(pxScale2x(k,'px04a'+fr),'px04b'+fr);R(c,0,0,480,270,'#121822');
c.imageSmoothingEnabled=false;c.drawImage(k,8,60,144,112);c.drawImage(k4,168,60,144,112);c.imageSmoothingEnabled=true;c.drawImage(k,328,60,144,112);c.imageSmoothingEnabled=false;
pxHiLab(c,'nearest 4x',80,36,P.cyan);pxHiLab(c,'Scale2x x2 (EPX)',240,36,P.gold);pxHiLab(c,'bilinear 4x',400,36,P.red);
/* 1:1 source */
c.drawImage(k,222,196,36,28);txt(c,'source 36x28 (1:1)',240,236,'#cbd3df',11);txt(c,'blocky, exact',80,190,'#cbd3df',11);txt(c,'rounded, new detail',400-160,250,'#cbd3df',11);txt(c,'blurred',400,190,'#cbd3df',11)}};

/* PIX-05 RotSprite */
let px05o=null;
function pxRot(k,a,N,mode){/* returns N x N canvas: rotate sprite k by angle a. mode 'naive' or 'rs' (Scale2x x3 then rotate+sample) */
const w=k.width,h=k.height,src=mode==='rs'?pxScale2x(pxScale2x(pxScale2x(k,'pxr1'+w),'pxr2'+w),'pxr3'+w):k,f=mode==='rs'?8:1,sd=new Uint32Array(src.getContext('2d').getImageData(0,0,src.width,src.height).data.buffer),o=mk(N,N),og=o.getContext('2d'),id=og.createImageData(N,N),d=new Uint32Array(id.data.buffer),ca=Math.cos(-a),sa=Math.sin(-a);
for(let y=0;y<N;y++)for(let x=0;x<N;x++){const rx=x+.5-N/2,ry=y+.5-N/2,sx=(rx*ca-ry*sa+w/2)*f,sy=(rx*sa+ry*ca+h/2)*f,ix=Math.floor(sx),iy=Math.floor(sy);if(ix>=0&&iy>=0&&ix<src.width&&iy<src.height)d[y*N+x]=sd[iy*src.width+ix]}og.putImageData(id,0,0);o.pv=Math.floor(N/2);return o}
DEMOS['PIX-05']={d:6,f:(c,t)=>{R(c,0,0,W,H,'#1a2130');const a=Math.round(t*24)/24*TAU;const kn=pxRot(pxSpr('sword'),a,24,'naive'),kr=pxRot(pxSpr('sword'),a,24,'rs');
for(const [x,k,l,col] of [[12,kn,'naive rotate',P.red],[132,kr,'RotSprite',P.cyan]]){R(c,x-1,13,98,98,P.ink);R(c,x,14,96,96,'#2a3448');c.imageSmoothingEnabled=false;c.drawImage(k,x,14,96,96);pxGrid(c,x,14,24,24,4,'rgba(255,255,255,.05)');pxLab(c,l,x+48,6,col);R(c,x+35,111,26,24,'#2a3448');c.drawImage(k,x+36,111);label(c,'1x',x+70,123)}
pxLab(c,Math.round(a/TAU*360)+'°',120,60)}};

/* PIX-06 palette swap */
const px06=[{n:'index',v:{h:'#3a3a3a',s:'#c8c8c8',k:'#101010',b:'#7a7a7a',B:'#5a5a5a',p:'#4a4a4a',d:'#2a2a2a'},g:{g:'#9a9a9a',G:'#6a6a6a',w:'#e8e8e8',k:'#101010',t:'#7c7c7c',T:'#5c5c5c',d:'#2a2a2a'}},
{n:'default',v:{},g:{}},{n:'swap A',v:{h:'#d9a441',b:P.red,B:'#a8342a',p:'#3a3a52'},g:{g:'#d0533c',G:'#8a2a22',t:'#3a3a52',T:'#26263a'}},{n:'swap B',v:{h:'#2b2b3a',b:'#5aa84a',B:'#3d7236',p:'#7a5034'},g:{g:'#9fd8ff',G:'#4a78c8',w:'#ffffff',t:'#cfd8e3',T:'#8d9aab'}}];
DEMOS['PIX-06']={d:2,f:(c,t)=>{R(c,0,0,W,H,'#1a2130');const bob=Math.floor(t*8)%2;
px06.forEach((pl,i)=>{const x=30+i*60;R(c,x-26,14,53,117,i?'#243049':'#2b2b2b');pxShadow(c,x,62,12,.3);pxDraw(c,'npc',x,62-bob*3,{s:3,pal:pl.v,key:'v'+i});pxShadow(c,x,118,12,.3);pxDraw(c,'foe',x,118-(1-bob)*3,{s:3,pal:pl.g,key:'g'+i,flip:true});const cs=Object.values(Object.assign({},pxM.npc.c,pl.v));cs.forEach((col,j)=>R(c,x-21+j*6,66,5,4,col));pxLab(c,pl.n,x,8,i?P.cyan:'#bbb')});
R(c,53,14,1,117,P.gold)}};

/* PIX-07 colour cycling */
let px07=null;
DEMOS['PIX-07']={d:4,f:(c,t)=>{if(!px07){const k=mk(W,H),g=k.getContext('2d');pxGrass(g,0,0,W,H,3,3);const idx=new Int8Array(W*H).fill(-1);for(let y=0;y<H;y++){const cy=70+Math.round(10*Math.sin(y*0)),top=58+Math.round(4*Math.sin(0));}
for(let x=0;x<W;x++){const top=62+Math.round(5*Math.sin(x*.045)),bot=top+26+Math.round(3*Math.sin(x*.08+1));R(g,x,top-2,1,2,P.dirtD);R(g,x,bot,1,2,P.dirtD);for(let y=top;y<bot;y++)idx[y*W+x]=((Math.floor(x/5+hash(y)*6+(y%2)*3)%6)+6)%6}
for(let y=0;y<64;y++)for(let x=26;x<44;x++){idx[y*W+x]=((Math.floor(-y/3+hash(x)*6))%6+6)%6}R(g,22,0,4,66,P.stoneD);R(g,44,0,4,66,P.stoneD);
for(let x=118;x<140;x++){R(g,x,58,1,2,P.woodD);R(g,x,60,1,32,P.wood);if(x%4===0)R(g,x,60,1,32,P.woodD)}pxTree(g,80,40,8);pxTree(g,200,44,9);pxTree(g,170,124,8);pxHouse(g,200,124);px07={k,base:g.getImageData(0,0,W,H),idx,out:g.createImageData(W,H)}}
const ramp=['#1d3f7a','#2a5aa0','#3d7fc4','#3d7fc4','#6fb3e8','#d6f1ff'].map(pxHex),sh=Math.floor(t*48)%6,b=px07.base.data,o=px07.out.data,I=px07.idx;
for(let i=0;i<W*H;i++){const v=I[i];if(v<0){o[i*4]=b[i*4];o[i*4+1]=b[i*4+1];o[i*4+2]=b[i*4+2]}else{const r=ramp[(v+sh)%6];o[i*4]=r[0];o[i*4+1]=r[1];o[i*4+2]=r[2]}o[i*4+3]=255}c.putImageData(px07.out,0,0);
pxDraw(c,'npc',128,82);R(c,150,5,84,22,'rgba(10,14,22,.85)');label(c,'palette index shift '+sh,192,11);for(let j=0;j<6;j++){R(c,155+j*12,17,11,7,pxRgb(ramp[(j+sh)%6]))}}};

/* PIX-08 dithering */
let px08=null;
DEMOS['PIX-08']={d:5,f:(c,t)=>{if(!px08)px08=c.createImageData(W,H);const o=px08.data,pal=['#1a1838','#3a2a5c','#7a3a6a','#c8566a','#f08a5a','#ffd28a'].map(pxHex),n=pal.length,sy=30+Math.round(40*ease(t<.5?t*2:2-t*2)),sx=120;
for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=(y*W+x)*4;let v=1-y/100;const dx=x-sx,dy=(y-sy)*1.3,dd=Math.sqrt(dx*dx+dy*dy);v=clamp(v*.75+clamp(1-dd/70)*.55);if(dd<9)v=1.05;
let q;if(x<W/2-1)q=Math.floor(v*(n-1)+.5);else q=Math.floor(v*(n-1)+BAYER4[(y&3)*4+(x&3)]/16);q=clamp(q,0,n-1);let col=pal[q];if(y>100+Math.round(6*Math.sin(x*.07))+(x%23<3?-4:0))col=[18,14,30];if(x===W/2-1||x===W/2)col=[8,10,16];o[i]=col[0];o[i+1]=col[1];o[i+2]=col[2];o[i+3]=255}c.putImageData(px08,0,0);pxLab(c,'banding (6 colours)',59,8,P.red);pxLab(c,'Bayer 4x4 (same 6)',181,8,P.cyan)}};

/* PIX-09 hue shifting */
let px09=null;
DEMOS['PIX-09']={d:4,f:(c,t)=>{if(!px09)px09=c.createImageData(W,H);const o=px09.data;
const flat=[0,1,2,3,4].map(i=>pxHsl(110,.42,.14+i*.15)),hue=[[248,.38,.18],[200,.42,.28],[140,.45,.40],[95,.55,.55],[60,.75,.75]].map(a=>pxHsl(...a));
const la=t*TAU,lx=Math.cos(la)*.7,ly=Math.sin(la)*.45-.35,lz=.55,ll=Math.hypot(lx,ly,lz);
for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=(y*W+x)*4;let col=[34,40,58];for(const [cx,rp] of [[62,flat],[178,hue]]){const dx=(x+.5-cx)/30,dy=(y+.5-58)/30,r2=dx*dx+dy*dy;if(r2<1){const nz=Math.sqrt(1-r2),d=(dx*lx+dy*ly+nz*lz)/ll;const q=clamp(Math.floor((d*.5+.5)*5),0,4);col=rp[q]}else if(y>86&&y<93&&Math.abs(x-cx)<26-Math.abs(y-89.5)*2)col=[24,28,42]}
o[i]=col[0];o[i+1]=col[1];o[i+2]=col[2];o[i+3]=255}c.putImageData(px09,0,0);
[[62,flat],[178,hue]].forEach(([cx,rp])=>rp.forEach((col,j)=>R(c,cx-30+j*12,104,11,10,pxRgb(col))));pxLab(c,'value only (same hue)',62,124,P.red);pxLab(c,'hue-shifted ramp',178,124,P.cyan);
const sx=120+Math.round(Math.cos(la)*20),sy=40+Math.round((Math.sin(la)*.45-.35)*30);pxDisc(c,sx,sy,3,P.gold);label(c,'light',sx,sy-8,P.gold)}};

/* PIX-10 limited palette (k-means on the scene's colours, cached per size) */
const px10={};
function px10pal(n){if(px10[n])return px10[n];const d=imgData('day').data,cnt=new Map();for(let i=0;i<d.length;i+=4){const key=(d[i]<<16)|(d[i+1]<<8)|d[i+2];cnt.set(key,(cnt.get(key)||0)+1)}const cols=[...cnt.entries()].map(([k,v])=>[k>>16&255,k>>8&255,k&255,v]).sort((a,b)=>b[3]-a[3]);
let cen=[cols[0].slice(0,3)];while(cen.length<n&&cen.length<cols.length){let best=null,bd=-1;for(const q of cols){let m=1e9;for(const e of cen){const dd=(q[0]-e[0])**2+(q[1]-e[1])**2+(q[2]-e[2])**2;if(dd<m)m=dd}const sc=m*Math.sqrt(q[3]);if(sc>bd){bd=sc;best=q}}cen.push(best.slice(0,3))}
const near=q=>{let bi=0,m=1e9;cen.forEach((e,i)=>{const dd=(q[0]-e[0])**2+(q[1]-e[1])**2+(q[2]-e[2])**2;if(dd<m){m=dd;bi=i}});return bi};
for(let it=0;it<8;it++){const acc=cen.map(()=>[0,0,0,0]);for(const q of cols){const a=acc[near(q)];a[0]+=q[0]*q[3];a[1]+=q[1]*q[3];a[2]+=q[2]*q[3];a[3]+=q[3]}cen=cen.map((e,i)=>acc[i][3]?[0,1,2].map(j=>Math.round(acc[i][j]/acc[i][3])):e)}
const id=new ImageData(W,H),o=id.data;for(let i=0;i<d.length;i+=4){const e=cen[near([d[i],d[i+1],d[i+2]])];o[i]=e[0];o[i+1]=e[1];o[i+2]=e[2];o[i+3]=255}const k=mk(W,H);k.getContext('2d').putImageData(id,0,0);return px10[n]={k,cen}}
DEMOS['PIX-10']={d:6,f:(c,t)=>{const ns=[32,16,8,4],n=ns[Math.min(3,Math.floor(t*4))],q=px10pal(n);R(c,0,0,W,H,'#121822');c.drawImage(scene('day'),62,8,116,104,1,14,116,104);c.drawImage(q.k,62,8,116,104,123,14,116,104);pxLab(c,'source',59,7);pxLab(c,n+' colours',181,7,P.cyan);
const sw=Math.max(3,Math.floor(116/n));q.cen.forEach((e,i)=>R(c,123+i*sw,121,sw-1,10,pxRgb(e)));label(c,'palette',40,126,'#cbd3df')}};

/* PIX-11 manual anti-aliasing */
DEMOS['PIX-11']={d:4,f:(c,t)=>{R(c,0,0,W,H,'#1a2130');const N=18,r=6.2+1.6*Math.sin(t*TAU),ry=r*(1.15+.25*Math.cos(t*TAU)),bg=P.wall,full=P.ink,mid='#8a7458';
const cell=(x,y)=>{const dx=(x+.5-N/2)/r,dy=(y+.5-N/2)/ry,d=(Math.sqrt(dx*dx+dy*dy)-1)*Math.min(r,ry);return clamp(1-Math.abs(d))};
for(const [ox,aa,l,col] of [[8,false,'jaggies',P.red],[128,true,'manual AA',P.cyan]]){R(c,ox,14,108,108,bg);const k=mk(N,N),g=k.getContext('2d');R(g,0,0,N,N,bg);for(let y=0;y<N;y++)for(let x=0;x<N;x++){const v=cell(x,y);if(aa?v>.62:v>.5)R(g,x,y,1,1,full);else if(aa&&v>.22)R(g,x,y,1,1,mid)}c.imageSmoothingEnabled=false;c.drawImage(k,ox,14,108,108);pxGrid(c,ox,14,N,N,6,'rgba(0,0,0,.08)');R(c,ox+84,96,20,20,P.ink);c.drawImage(k,ox+85,97);pxLab(c,l,ox+54,7,col)}
label(c,'1x',112,124);label(c,'1x',232,124)}};

/* PIX-12 selective outlining */
const px12={};
function pxOutline(k,mode,key){if(px12[key])return px12[key];const w=k.width,h=k.height,o=mk(w+2,h+2),g=o.getContext('2d');g.drawImage(k,1,1);const d=g.getImageData(0,0,w+2,h+2).data,A=(x,y)=>x>=0&&y>=0&&x<w+2&&y<h+2&&d[(y*(w+2)+x)*4+3]>0;
for(let y=0;y<h+2;y++)for(let x=0;x<w+2;x++){if(A(x,y))continue;let nb=null,lit=false;for(const [dx,dy,l] of [[0,1,1],[1,0,1],[0,-1,0],[-1,0,0]])if(A(x+dx,y+dy)){nb=[x+dx,y+dy];lit=l;break}if(!nb)continue;if(mode==='black')g.fillStyle=P.ink;else{const j=(nb[1]*(w+2)+nb[0])*4,f=lit?.72:.42;g.fillStyle=pxRgb([d[j]*f|0,d[j+1]*f|0,d[j+2]*f|0])}g.fillRect(x,y,1,1)}o.pv=k.pv+1;return px12[key]=o}
DEMOS['PIX-12']={d:4,f:(c,t)=>{R(c,0,0,W,H,P.grassD);const k=pxSpr('foe'),ks=[[k,'none',P.red],[pxOutline(k,'black','b'),'black outline',P.gold],[pxOutline(k,'sel','s'),'sel-out',P.cyan]];
ks.forEach(([kk,l,col],i)=>{const x=40+i*80;R(c,x-38,64,77,71,P.dirt);for(let j=0;j<6;j++)R(c,x-36+j*13,64+((j*7)%9),4,1,P.dirtD);const y=Math.round(84+26*Math.sin(t*TAU));pxShadow(c,x,y,13,.3);pxDrawK(c,kk,x,y,{s:3,flip:true});pxLab(c,l,x,8,col)});R(c,78,0,4,135,'#0b0f16');R(c,158,0,4,135,'#0b0f16')}};

/* PIX-13 silhouette readability */
const px13={};
function px13k(good,sil){const key=good+'|'+sil;if(px13[key])return px13[key];const k=mk(17,17),g=k.getContext('2d');g.drawImage(pxSpr('foe'),3,4);if(good){R(g,12,11,2,1,P.foe);R(g,13,10,2,1,P.foe);R(g,14,4,2,6,P.wood);R(g,13,2,4,3,P.woodD);R(g,2,16,2,1,'#3b2a1a');R(g,6,15,1,1,P.foe)}else{R(g,7,10,3,5,P.wood);R(g,7,9,3,1,P.woodD)}
if(sil){g.globalCompositeOperation='source-in';R(g,0,0,17,17,P.ink)}k.pv=8;return px13[key]=k}
DEMOS['PIX-13']={d:4,f:(c,t)=>{const sv=t<.5?ease(seg(t,.3,.42)):1-ease(seg(t,.85,.97));R(c,0,0,W,H,sv>.5?'#d8dde6':'#2a3448');
for(const [x,good,l,col] of [[62,false,'weak: club inside body',P.red],[178,true,'strong: club breaks outline',P.cyan]]){const y=112-(Math.floor(t*8)%2)*4;pxShadow(c,x,y,22,.25);pxDrawK(c,px13k(good,sv>.5),x,y,{s:4});pxDrawK(c,px13k(good,false),x+42,124,{s:1,alpha:1});pxLab(c,l,x,10,col)}pxLab(c,sv>.5?'silhouette test':'full colour',120,124,P.gold)}};

/* PIX-14 sub-pixel animation */
DEMOS['PIX-14']={d:3,f:(c,t)=>{R(c,0,0,W,H,'#121822');const bg=pxHex('#2a3348'),fg=pxHex('#9fc0ff'),N=14,x0=3+4*(.5-.5*Math.cos(t*TAU));
const lvl=v=>{const q=Math.round(v*3)/3;return bg.map((b,i)=>Math.round(b+(fg[i]-b)*q))};
for(const [ox,sub,l,col] of [[8,false,'whole-pixel steps',P.red],[128,true,'sub-pixel (edge shades)',P.cyan]]){const k=mk(N,6),g=k.getContext('2d');R(g,0,0,N,6,pxRgb(bg));const xs=sub?x0:Math.round(x0);for(let i=0;i<N;i++){const cov=clamp(Math.min(i+1,xs+4)-Math.max(i,xs));if(cov>0)for(let y=1;y<5;y++){const v=(y===1||y===4)&&(i===Math.floor(xs)||i===Math.ceil(xs+3))?cov*.6:cov;R(g,i,y,1,1,pxRgb(lvl(v)))}}
c.imageSmoothingEnabled=false;c.drawImage(k,ox,24,N*8,48);pxGrid(c,ox,24,N,6,8,'rgba(0,0,0,.25)');R(c,ox+48,84,18,10,P.ink);c.drawImage(k,ox+50,86,N,6);label(c,'1x',ox+76,89);pxLab(c,l,ox+56,12,col);R(c,ox,104,112,1,'#3a4560');R(c,ox+Math.round(xs*8),101,1,7,P.gold);label(c,'x = '+(Math.round(xs*100)/100).toFixed(2),ox+56,118,'#cbd3df')}}};

/* PIX-15 parallax scrolling */
let px15=null;
function px15L(){const L=[];const mkL=(h,fn)=>{const k=mk(W,h),g=k.getContext('2d');fn(g);return k};
L.push(mkL(H,g=>{const sky=['#9fd0e8','#8cc4e0','#78b6d8','#66a8cf'];sky.forEach((col,i)=>R(g,0,i*14,W,14,col));R(g,0,56,W,H,'#66a8cf');for(const [x,y,w] of [[20,14,22],[96,26,30],[170,10,18],[214,30,14]]){R(g,x,y,w,4,'#f4fbff');R(g,x+4,y-3,w-10,3,'#f4fbff');R(g,x+2,y+4,w-4,1,'#cfe6f2')}}));
L.push(mkL(H,g=>{for(let x=0;x<W;x++){const h1=Math.round(18+10*Math.sin(x*TAU/W*2)+5*Math.sin(x*TAU/W*5+1));R(g,x,78-h1,1,H,'#7a98b8');const h2=Math.round(10+6*Math.sin(x*TAU/W*3+2));R(g,x,86-h2,1,H,'#5f7f9e')}}));
L.push(mkL(H,g=>{R(g,0,88,W,H,'#3f7a46');for(let i=0;i<16;i++){const x=i*15+(i*7)%5;pxTree(g,x,96-(i%3)*2,7+(i%2))}}));
L.push(mkL(H,g=>{R(g,0,100,W,H,P.grass);R(g,0,112,W,10,P.dirt);R(g,0,121,W,1,P.dirtD);for(let i=0;i<W;i+=12){R(g,i,98,2,7,P.wood)}R(g,0,100,W,1,P.woodD);for(let i=0;i<30;i++)R(g,Math.floor(hash(i+3)*W),102+Math.floor(hash(i+9)*8),2,1,P.grass2)}));
L.push(mkL(H,g=>{for(let i=0;i<8;i++){const x=i*30+11;for(let j=0;j<5;j++)R(g,x+j*2,126-((j*3)%5),1,9,P.leafD)}}));return L}
DEMOS['PIX-15']={d:8,f:(c,t,_w,_h,p)=>{const L=px15||(px15=px15L()),cam=t*W*2,fs=[.1,.3,.6,1,1.5];L.forEach((k,i)=>{const o=((Math.round(cam*fs[i])%W)+W)%W;c.drawImage(k,-o,0);c.drawImage(k,W-o,0);if(i===3){const b=Math.floor(t*p.dur*6)%2;pxShadow(c,120,118,5);pxDraw(c,'npc',120,118-b)}});
R(c,198,4,40,52,'rgba(10,14,22,.7)');['sky 0.1','hills 0.3','trees 0.6','ground 1','front 1.5'].forEach((s,i)=>label(c,s,218,10+i*10,i===3?P.gold:'#e9edf2'))}};

/* PIX-16 Y-sorting */
DEMOS['PIX-16']={d:5,f:(c,t)=>{R(c,0,0,W,H,'#0b0f16');const a=t*TAU,vx=Math.round(59+24*Math.cos(a)),vy=Math.round(76+14*Math.sin(a)),gx=Math.round(59-30*Math.cos(a*2)),gy=104;
for(const [ox,sort,l,col] of [[0,false,'fixed order',P.red],[122,true,'sorted by foot Y',P.cyan]]){pxClip(c,ox,0,118,135);pxGrass(c,ox,0,118,135,ox,0);
const items=[{y:76,d:()=>pxTree(c,ox+59,76,11),k:0},{y:vy,d:()=>{pxShadow(c,ox+vx,vy,5);pxDraw(c,'npc',ox+vx,vy,{flip:Math.sin(a)>0?false:true})},k:1},{y:gy,d:()=>pxHouse(c,ox+40,gy),k:0},{y:110,d:()=>pxTree(c,ox+92,110,7),k:0}];
const ord=sort?items.slice().sort((p,q)=>p.y-q.y):items.filter(i=>!i.k).concat(items.filter(i=>i.k));ord.forEach(i=>i.d());
if(sort){for(const [fx,fy] of [[59,76],[vx,vy],[40,gy],[92,110]]){R(c,ox+fx-1,fy-1,3,1,P.red)}R(c,ox,vy-1,118,1,'rgba(255,90,90,.35)')}
c.restore();pxLab(c,l,ox+59,8,col)}R(c,118,0,4,135,'#0b0f16')}};

/* PIX-17 autotiling (4-neighbour bitmask) */
const px17path=(()=>{const a=[];for(let x=0;x<13;x++)a.push([x,5]);for(let y=0;y<12;y++)if(y!==5)a.push([6,y]);for(const [x,y] of [[9,8],[10,8],[9,9],[10,9],[8,8],[7,8],[2,2],[3,2],[2,3],[3,3],[2,4]])a.push([x,y]);return a})();
DEMOS['PIX-17']={d:6,f:(c,t)=>{R(c,0,0,W,H,'#0b0f16');const n=Math.floor(seg(t,.03,.8)*px17path.length),on=new Set(px17path.slice(0,n).map(([x,y])=>x+','+y)),has=(x,y)=>on.has(x+','+y),S=8,cur=px17path[Math.max(0,n-1)];let cm=0;
for(const [ox,auto,l,col] of [[6,false,'raw cells',P.red],[130,true,'autotiled (N1 E2 S4 W8)',P.cyan]]){const oy=18;pxGrass(c,ox,oy,104,96,ox,0);
for(let y=0;y<12;y++)for(let x=0;x<13;x++){if(!has(x,y))continue;const X=ox+x*S,Y=oy+y*S;if(!auto){R(c,X,Y,S,S,P.dirt);R(c,X,Y,S,1,P.dirtD);R(c,X,Y,1,S,P.dirtD);continue}
const N=has(x,y-1),E=has(x+1,y),So=has(x,y+1),Wt=has(x-1,y),m=(N?1:0)|(E?2:0)|(So?4:0)|(Wt?8:0);if(x===cur[0]&&y===cur[1])cm=m;R(c,X,Y,S,S,P.dirt);R(c,X+3,Y+3,1,1,P.dirtD);
if(!N){R(c,X,Y,S,1,P.grass);R(c,X,Y+1,S,1,P.dirtD);R(c,X+2,Y+1,2,1,P.grass)}if(!So){R(c,X,Y+S-1,S,1,P.grass);R(c,X,Y+S-2,S,1,'#a07c50');R(c,X+5,Y+S-2,2,1,P.grass)}if(!Wt){R(c,X,Y,1,S,P.grass);R(c,X+1,Y,1,S,P.dirtD);R(c,X+1,Y+4,1,2,P.grass)}if(!E){R(c,X+S-1,Y,1,S,P.grass);R(c,X+S-2,Y,1,S,'#a07c50');R(c,X+S-2,Y+2,1,2,P.grass)}
for(const [cx,cy,a,b] of [[0,0,N,Wt],[S-2,0,N,E],[0,S-2,So,Wt],[S-2,S-2,So,E]])if(!a&&!b)R(c,X+cx,Y+cy,2,2,P.grass)}
R(c,ox+cur[0]*S-1,oy+cur[1]*S-1,S+2,1,P.gold);R(c,ox+cur[0]*S-1,oy+cur[1]*S+S,S+2,1,P.gold);R(c,ox+cur[0]*S-1,oy+cur[1]*S-1,1,S+2,P.gold);R(c,ox+cur[0]*S+S,oy+cur[1]*S-1,1,S+2,P.gold);pxLab(c,l,ox+52,8,col)}
pxLab(c,'mask '+cm,182,124,P.gold)}};

/* PIX-18 fake height */
DEMOS['PIX-18']={d:3,f:(c,t)=>{R(c,0,0,W,H,'#0b0f16');const u=t,gx=Math.round(18+u*82),hop=Math.abs(Math.sin(u*TAU)),z=Math.round(hop*26),gy=96;
for(const [ox,ok,l,col] of [[0,false,'y only, no shadow',P.red],[122,true,'z offset + ground shadow',P.cyan]]){pxClip(c,ox,0,118,135);pxGrass(c,ox,0,118,135,ox*3,0);R(c,ox,gy+4,118,8,P.dirt);for(let i=0;i<10;i++)R(c,ox+4+i*12,gy-14,2,8,P.wood);R(c,ox,gy-13,118,1,P.woodD);
if(ok){const rw=Math.round(lerp(6,3,hop));pxShadow(c,ox+gx,gy,rw,lerp(.4,.2,hop));pxDraw(c,'foe',ox+gx,gy-z);R(c,ox+gx,gy-z,1,z,'rgba(127,227,216,.35)')}else pxDraw(c,'foe',ox+gx,gy-z);
c.restore();pxLab(c,l,ox+59,8,col)}R(c,118,0,4,135,'#0b0f16');label(c,'z = '+z,181,124,P.gold);label(c,'looks like walking north',59,124,'#cbd3df')}};

/* PIX-19 sprite stacking */
let px19=null;
function px19mk(){const S=[];for(let i=0;i<14;i++){const k=mk(14,14),g=k.getContext('2d');if(i<8){R(g,1,1,12,12,i%3===0?P.wallD:P.wall);R(g,1,1,12,1,'#f3dcb0');if(i<5)R(g,5,12,4,2,P.woodD);if(i>=4&&i<6){R(g,0,4,1,3,'#4a6070');R(g,13,4,1,3,'#4a6070');R(g,4,0,3,1,'#4a6070')}R(g,1,1,1,12,P.woodD);R(g,12,1,1,12,P.woodD)}else{const m=i-8;R(g,m,m,14-2*m,14-2*m,m%2?P.roofD:P.roof);R(g,6,m,2,14-2*m,P.roofD)}S.push(k)}
const B=[];for(let i=0;i<9;i++){const k=mk(8,8),g=k.getContext('2d');const r=i===0||i===8?3:4;pxDisc(g,4,4,r,i%4===1?P.stoneD:P.wood);if(i===8)pxDisc(g,4,4,2,P.woodD);B.push(k)}return{S,B}}
DEMOS['PIX-19']={d:6,f:(c,t)=>{const o=px19||(px19=px19mk()),a=t*TAU,T=TMP(),g=T.getContext('2d');g.imageSmoothingEnabled=false;pxGrass(g,0,0,W,H,7,7);
const stack=(L,x,y,sp)=>{L.forEach((k,i)=>{g.save();g.translate(x,y-i*sp);g.rotate(a);g.drawImage(k,-k.width/2,-k.height/2);g.restore()})};
pxShadow(g,40,52,11,.3);stack(o.S,40,48,1);pxShadow(g,74,52,5,.3);stack(o.B,74,49,1);c.drawImage(T,0,0);
R(c,100,0,140,135,'#121822');c.imageSmoothingEnabled=false;c.drawImage(T,22,18,38,40,104,6,114,120);R(c,103,5,1,122,P.ink);
R(c,0,62,100,73,'#121822');o.S.forEach((k,i)=>c.drawImage(k,4+(i%7)*13,74+Math.floor(i/7)*18,12,12));label(c,'14 slices, each rotated',50,68);label(c,'and drawn 1px higher',50,114);label(c,'1x',50,124,P.gold);pxLab(c,'3x view',171,126,P.cyan)}};

/* PIX-20 Mode 7 + line scroll */
let px20=null;
DEMOS['PIX-20']={d:8,f:(c,t)=>{if(!px20){const k=mk(64,64),g=k.getContext('2d');pxGrass(g,0,0,64,64,1,1);R(g,0,30,64,5,P.dirt);R(g,30,0,5,64,P.dirt);for(const [x,y] of [[10,10],[46,12],[12,46],[48,48]]){R(g,x,y,9,7,P.wall);R(g,x-1,y-2,11,3,P.roof)}pxDisc(g,48,24,4,P.water);for(const [x,y] of [[20,20],[54,40],[22,56]])pxDisc(g,x,y,3,P.leafD);px20={tex:new Uint32Array(g.getImageData(0,0,64,64).data.buffer),id:c.createImageData(W,H)}}
const d=new Uint32Array(px20.id.data.buffer),hz=38,ang=t*TAU,ca=Math.cos(ang),sa=Math.sin(ang),cx=32+Math.cos(ang)*40,cz=32+Math.sin(ang)*40,hgt=14,f=110;const sky=[pxHex('#78b6d8'),pxHex('#a8d4ea')];
for(let y=0;y<H;y++){if(y<hz){const q=y<hz-14?0:1,col=y>hz-6&&((y*7+ (y%2)*3)%5)<3?[95,127,158]:sky[q];const v=(255<<24)|(col[2]<<16)|(col[1]<<8)|col[0];for(let x=0;x<W;x++)d[y*W+x]=v;continue}
const dz=hgt*f/(y-hz+.5),xr=150;for(let x=0;x<xr;x++){const dx=(x-xr/2+.5)*dz/f,u=cx+dx*(-sa)+dz*ca,v=cz+dx*ca+dz*sa;const tx=((Math.floor(u)%64)+64)%64,ty=((Math.floor(v)%64)+64)%64;d[y*W+x]=px20.tex[ty*64+tx]}}
/* right: line scroll heat-wave on a flat scene strip */
for(let y=0;y<H;y++){const off=Math.round(2*Math.sin(y*.5+t*TAU*4));for(let x=150;x<W;x++){const sx=((x-150+off)%64+64)%64,sy=(y+8)%64;d[y*W+x]=px20.tex[sy*64+sx]}}
c.putImageData(px20.id,0,0);R(c,150,0,1,H,P.ink);pxLab(c,'Mode 7 (per-line scale)',75,124,P.cyan);pxLab(c,'line scroll',195,124,P.gold);R(c,73,124-24,4,4,'#fff');R(c,74,99,2,1,P.red)}};

/* PIX-21 normal-mapped sprites, quantised to 3 bands */
let px21=null;
function px21mk(){const w=116,h=120,al=new Uint8ClampedArray(w*h*3),nm=new Float32Array(w*h*3);const set=(x,y,col,n)=>{const i=y*w+x;al.set(col,i*3);nm.set(n,i*3)};
const dirt=pxHex('#6a5a48'),brick=pxHex('#a85a44'),mort=pxHex('#4a3a34'),wood=pxHex('#8a5a34'),hoop=pxHex('#5e636e'),rock=pxHex('#8a8f99');
for(let y=0;y<h;y++)for(let x=0;x<w;x++){set(x,y,(x*7+y*3)%11===0?pxHex('#5e4f3e'):dirt,[0,0,1]);
if(y>=8&&y<46&&x>=6&&x<110){const row=Math.floor((y-8)/7),bx=(x-6+(row%2)*6)%12,by=(y-8)%7;if(bx===0||by===0)set(x,y,mort,[0,0,1]);else{let n=[0,0,1];if(bx===1)n=[-.7,0,.7];else if(bx===11)n=[.7,0,.7];else if(by===1)n=[0,-.7,.7];else if(by===6)n=[0,.7,.7];set(x,y,brick,n)}}
const bx=(x+.5-34)/12;if(Math.abs(bx)<1&&y>=60&&y<100){const nz=Math.sqrt(1-bx*bx),hp=(y>=66&&y<69)||(y>=91&&y<94);set(x,y,hp?hoop:wood,[bx,0,nz])}if(Math.abs(bx)<1&&y>=55&&y<60){set(x,y,pxHex('#6a4428'),[0,-.4,.9])}
const rx=(x+.5-82)/18,ry=(y+.5-86)/13,r2=rx*rx+ry*ry;if(r2<1){const nz=Math.sqrt(1-r2);set(x,y,(x+y)%9===0?pxHex('#6e737e'):rock,[rx,ry,nz])}}return{w,h,al,nm}}
DEMOS['PIX-21']={d:5,f:(c,t)=>{const m=px21||(px21=px21mk());if(!m.id)m.id=c.createImageData(W,H);const d=m.id.data,a=t*TAU,lx=58+42*Math.cos(a),ly=58+30*Math.sin(a),lz=16,lev=[.16,.42,.7,1];
d.fill(0);for(let p=0;p<2;p++){const ox=p?124:0;for(let y=0;y<m.h;y++)for(let x=0;x<m.w;x++){const i=y*m.w+x,dx=lx-x,dy=ly-y,dist=Math.hypot(dx,dy,lz),att=clamp(1-dist/80);let df;if(p){const nx=m.nm[i*3],ny=m.nm[i*3+1],nz=m.nm[i*3+2];df=clamp((nx*dx+ny*dy+nz*lz)/dist)*att}else df=att*.8;const q=lev[df<.12?0:df<.35?1:df<.6?2:3],j=((y+8)*W+x+ox)*4;
d[j]=m.al[i*3]*q*(p?1:1);d[j+1]=m.al[i*3+1]*q;d[j+2]=Math.min(255,m.al[i*3+2]*q+(1-q)*14);d[j+3]=255}}
for(let y=0;y<8;y++)for(let x=0;x<W;x++){const j=(y*W+x)*4;d[j]=11;d[j+1]=15;d[j+2]=22;d[j+3]=255}for(let y=128;y<H;y++)for(let x=0;x<W;x++){const j=(y*W+x)*4;d[j]=11;d[j+1]=15;d[j+2]=22;d[j+3]=255}
c.putImageData(m.id,0,0);for(const ox of [0,124]){const X=Math.round(ox+lx),Y=Math.round(ly+8);R(c,X-1,Y-3,3,4,P.gold);R(c,X,Y-4,1,1,'#fff7c8');R(c,X-1,Y+1,3,1,P.ink)}R(c,116,0,8,H,'#0b0f16');pxLab(c,'flat sprite',58,4,P.red);pxLab(c,'normal map, 3 bands',182,4,P.cyan)}};

/* PIX-22 2D shadow casting (pixel ray march, dithered penumbra) */
let px22=null;
DEMOS['PIX-22']={d:6,f:(c,t)=>{if(!px22){const k=mk(W,H),g=k.getContext('2d');pxGrass(g,0,0,W,H,40,10,'#4f7a44','#456c3c');R(g,0,60,W,14,P.dirt);const occ=new Uint8Array(W*H),box=(x,y,w,h)=>{for(let j=y;j<y+h;j++)for(let i=x;i<x+w;i++)if(i>=0&&j>=0&&i<W&&j<H)occ[j*W+i]=1};
for(const [x,y] of [[50,48],[160,46],[110,120],[200,118]]){pxHouse(g,x,y);box(x-12,y-14,25,14)}for(let i=0;i<9;i++){R(g,20+i*7,96,2,6,P.wood);box(20+i*7,98,2,4)}for(const [x,y] of [[96,34],[140,94],[24,124],[226,82]]){pxTree(g,x,y,7);box(x-1,y-4,3,4)}
for(const [x,y] of [[178,84],[70,82]]){pxDisc(g,x,y,4,P.stone);box(x-4,y-3,8,6)}px22={base:g.getImageData(0,0,W,H).data,occ,id:c.createImageData(W,H)}}
const a=t*TAU,Lx=120+70*Math.cos(a),Ly=78+22*Math.sin(a*2),o=px22.id.data,b=px22.base,O=px22.occ,Rr=86;
const vis=(sx,sy,x,y)=>{const dx=x-sx,dy=y-sy,n=Math.ceil(Math.max(Math.abs(dx),Math.abs(dy)));for(let k=1;k<n;k++){const px=Math.round(sx+dx*k/n),py=Math.round(sy+dy*k/n);if(O[py*W+px]&&!(px===x&&py===y))return 0}return 1};
for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=y*W+x,j=i*4,dd=Math.hypot(x-Lx,y-Ly);let lv=.18;if(dd<Rr){let v=O[i]?1:(vis(Lx-1.5,Ly,x,y)+vis(Lx+1.5,Ly,x,y))/2;if(v===.5)v=((x+y)&1)?1:0;const fall=dd/Rr,band=fall+BAYER4[(y&3)*4+(x&3)]/16*.18;lv=v?(band<.45?1:band<.75?.7:band<.98?.45:.18):.18}
o[j]=Math.min(255,b[j]*lv+(lv>.5?18:0));o[j+1]=b[j+1]*lv+(lv>.5?8:0);o[j+2]=b[j+2]*lv*.9+(1-lv)*26;o[j+3]=255}c.putImageData(px22.id,0,0);
pxDraw(c,'npc',Lx-2,Ly+6,{flip:Math.sin(a)>0});R(c,Math.round(Lx)+3,Math.round(Ly)-2,1,4,P.woodD);R(c,Math.round(Lx)+2,Math.round(Ly)-5,3,3,P.orange);R(c,Math.round(Lx)+3,Math.round(Ly)-6,1,1,P.gold);pxLab(c,'hard shadows, dithered edge',120,6,P.cyan)}};

/* PIX-23 mixels vs one pixel density */
DEMOS['PIX-23']={d:3,f:(c,t)=>{R(c,0,0,W,H,'#0b0f16');const b=Math.floor(t*6)%2,T=TMP(),g=T.getContext('2d');
for(const [ox,ok] of [[0,false],[60,true]]){g.save();g.beginPath();g.rect(ox,0,58,62);g.clip();pxGrass(g,ox,0,58,62,ox,0);g.imageSmoothingEnabled=false;pxShadow(g,ox+14,56,4);pxDraw(g,'npc',ox+14,56);
const gk=pxSpr('foe');if(ok){const big=pxScale2x(gk,'px23g');pxShadow(g,ox+40,54,9);pxDrawK(g,big,ox+40,54-b,{flip:true})}else{pxShadow(g,ox+40,54,9);pxDrawK(g,gk,ox+40,54-b*2,{s:2,flip:true})}
if(ok){g.drawImage(pxRot(pxSpr('sword'),.6,24,'rs'),ox+2,6)}else{g.imageSmoothingEnabled=true;g.save();g.translate(ox+14,18);g.rotate(.6);g.scale(1.4,1.4);g.drawImage(pxSpr('sword'),-8,-8);g.restore();g.imageSmoothingEnabled=false}g.restore()}
c.imageSmoothingEnabled=false;c.drawImage(T,0,0,58,62,1,10,116,124);c.drawImage(T,60,0,58,62,123,10,116,124);R(c,118,0,4,H,'#0b0f16');pxLab(c,'mixels (2x/rotated)',59,6,P.red);pxLab(c,'one pixel size',181,6,P.cyan)}};

/* PIX-24 sprite pivot at the feet */
let px24=null;
function px24mk(){const v=pxSpr('npc'),F=[];const fr=(w,h,dx,dy,pv,extra)=>{const k=mk(w,h),g=k.getContext('2d');g.drawImage(v,dx,dy);if(extra)extra(g);k.pv=pv;return k};
F.push(fr(11,16,0,0,5));
F.push(fr(15,16,4,0,9,g=>{R(g,0,4,5,1,'#e8eef5');R(g,0,5,5,1,'#8d9aab');R(g,4,4,1,3,P.gold)}));
F.push(fr(16,16,0,0,5,g=>{R(g,10,9,6,1,'#e8eef5');R(g,10,10,6,1,'#8d9aab');R(g,9,8,1,3,P.gold)}));
F.push((()=>{const k=mk(11,13),g=k.getContext('2d');g.drawImage(v,0,0,11,7,0,0,11,7);g.drawImage(v,0,10,11,6,0,7,11,6);k.pv=5;return k})());return F}
DEMOS['PIX-24']={d:2.4,f:(c,t)=>{const F=px24||(px24=px24mk()),seq=[0,0,1,1,2,2,3,3,0,0],k=F[seq[Math.floor(t*seq.length)%seq.length]],s=4,base=118;R(c,0,0,W,H,'#0b0f16');
for(const [ox,ok,l,col] of [[0,false,'top-left origin',P.red],[122,true,'pivot = feet centre',P.cyan]]){pxClip(c,ox,0,118,135);R(c,ox,0,118,135,'#26304a');pxGrid(c,ox+3,14,28,26,4,'rgba(255,255,255,.04)');R(c,ox,base,118,17,'#3a4560');const px=ox+59-2;
c.imageSmoothingEnabled=false;const F0=F[0];c.save();c.globalAlpha=.22;c.drawImage(F0,px-5*s,base-16*s,F0.width*s,F0.height*s);c.restore();let fx=px,fy=base;if(ok)pxDrawK(c,k,px,base,{s});else{c.drawImage(k,px-5*s,base-16*s,k.width*s,k.height*s);fx=px-5*s+k.pv*s;fy=base-16*s+k.height*s}const dx=Math.round((fx-px)/s),dy=Math.round((fy-base)/s),bad=dx||dy;R(c,fx-1,fy-2,s+2,3,bad?'#ff5a5a':P.cyan);pxLab(c,bad?('feet off by '+(dx?'x'+(dx>0?'+':'')+dx+' ':'')+(dy?'y'+dy:'')+' px'):'feet locked',ox+59,22,bad?'#ff8a8a':P.cyan);
R(c,ox,base,118,1,'rgba(255,80,80,.9)');c.fillStyle='rgba(127,227,216,.28)';c.fillRect(px,14,s,base-14);c.restore();pxLab(c,l,ox+59,7,col)}R(c,118,0,4,H,'#0b0f16');label(c,'baseline',30,126,'#ff8a8a');label(c,'centre column',204,126,P.cyan)}};

/* PIX-25 flip for facing */
let px25=null;
DEMOS['PIX-25']={d:2,f:(c,t)=>{if(!px25){px25=mk(12,16);px25.getContext('2d').drawImage(pxSpr('npc'),0,0)}const fl=Math.floor(t*4)%2===1,s=5,base=114;R(c,0,0,W,H,'#0b0f16');
for(const [ox,ok,l,col] of [[0,false,'12px, flip at centre',P.red],[122,true,'11px, flip at pivot column',P.cyan]]){pxClip(c,ox,0,118,135);R(c,ox,0,118,135,'#26304a');R(c,ox,base,118,21,'#3a4560');const px=ox+57;pxGrid(c,ox+2,20,23,19,s,'rgba(255,255,255,.04)');c.fillStyle='rgba(127,227,216,.28)';c.fillRect(px,20,s,base-20);
c.save();c.globalAlpha=.22;c.drawImage(px25,px-5*s,base-16*s,12*s,16*s);c.restore();const sh=!ok&&fl;R(c,px+(sh?s:0)-1,base-1,s+2,3,sh?'#ff5a5a':P.cyan);pxLab(c,sh?'body jumps 1 px →':(fl?'same column':'—'),ox+59,22,sh?'#ff8a8a':P.cyan);if(ok)pxDraw(c,'npc',px,base,{s,flip:fl});else{const X0=px-5*s,Y0=base-16*s;c.save();c.imageSmoothingEnabled=false;if(fl){c.translate(X0+12*s,Y0);c.scale(-1,1);c.drawImage(px25,0,0,12*s,16*s)}else c.drawImage(px25,X0,Y0,12*s,16*s);c.restore()}
c.restore();pxLab(c,l,ox+59,7,col)}R(c,118,0,4,H,'#0b0f16');pxLab(c,fl?'facing left':'facing right',120,126,P.gold)}};

/* PIX-26 atlas bleeding vs extrusion (software sampler) */
let px26=null;
function px26mk(){const tiles=[[P.grass,P.grass2],[P.dirt,P.dirtD],[P.water,P.waterL],[P.stone,P.stoneD]].map(([a,b])=>[pxHex(a),pxHex(b)]),tex=(ti,x,y)=>{const[a,b]=tiles[ti];return(hash(ti*97+x*13+y*7)>.72||(ti===3&&(x===7||y===7)))?b:a};
const mkA=(cell,pad)=>{const w=4*cell+2,h=cell+2,d=new Array(w*h).fill(pxHex('#ff00ff'));for(let ti=0;ti<4;ti++)for(let y=0;y<cell;y++)for(let x=0;x<cell;x++){const lx=clamp(x-pad,0,7),ly=clamp(y-pad,0,7);d[(y+1)*w+1+ti*cell+x]=tex(ti,lx,ly)}return{w,h,d,cell,pad}};
const map=[];for(let y=0;y<16;y++)for(let x=0;x<16;x++){let v=0;if(y===7||x===9)v=1;if((x-4)**2+(y-11)**2<6)v=2;if(x>11&&y<4)v=3;map.push(v)}return{A:mkA(8,0),B:mkA(10,1),map,id:null}}
DEMOS['PIX-26']={d:6,f:(c,t)=>{const m=px26||(px26=px26mk());if(!m.id)m.id=c.createImageData(W,H);const d=m.id.data,z=2.35+.3*Math.sin(t*TAU),cx=20+18*Math.sin(t*TAU*.5)+.37,cy=26+10*Math.cos(t*TAU)+.21;
const samp=(A,ax,ay,bil)=>{const g=(x,y)=>A.d[clamp(y,0,A.h-1)*A.w+clamp(x,0,A.w-1)];if(!bil)return g(Math.floor(ax),Math.floor(ay));const x0=Math.floor(ax-.5),y0=Math.floor(ay-.5),fx=ax-.5-x0,fy=ay-.5-y0,a=g(x0,y0),b=g(x0+1,y0),e=g(x0,y0+1),f=g(x0+1,y0+1);return[0,1,2].map(i=>(a[i]*(1-fx)+b[i]*fx)*(1-fy)+(e[i]*(1-fx)+f[i]*fx)*fy)};
d.fill(255);for(let y=0;y<H;y++)for(let x=0;x<W;x++){const j=(y*W+x)*4;d[j]=11;d[j+1]=15;d[j+2]=22}
[[0,m.A,true],[80,m.B,true],[160,m.B,false]].forEach(([ox,A,bil])=>{for(let y=0;y<92;y++)for(let x=0;x<78;x++){let ux,uy;if(bil){ux=(x+cx*z)/z;uy=(y+cy*z)/z}else{const zi=Math.round(z);ux=Math.floor((x+Math.round(cx*zi))/zi);uy=Math.floor((y+Math.round(cy*zi))/zi)}
const tx=Math.floor(ux/8),ty=Math.floor(uy/8),ti=m.map[(((ty%16)+16)%16)*16+(((tx%16)+16)%16)],lx=ux-tx*8,ly=uy-ty*8,ax=1+ti*A.cell+A.pad+lx+(bil?0:.5),ay=1+A.pad+ly+(bil?0:.5),col=samp(A,ax,ay,bil),j=((y+14)*W+x+ox+1)*4;d[j]=col[0];d[j+1]=col[1];d[j+2]=col[2]}
for(let y=0;y<A.h;y++)for(let x=0;x<A.w;x++){const col=A.d[y*A.w+x],j=((y+112)*W+x+ox+4)*4;d[j]=col[0];d[j+1]=col[1];d[j+2]=col[2]}});
c.putImageData(m.id,0,0);pxLab(c,'tight + bilinear',40,6,P.red);pxLab(c,'extruded + bilinear',120,6,P.gold);pxLab(c,'extruded + point',200,6,P.cyan);[40,120,200].forEach((x,i)=>pxLab(c,i?'1px border':'no padding',x,128,'#cbd3df'))}};
