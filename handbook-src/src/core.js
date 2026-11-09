"use strict";
const W=240,H=135,TAU=Math.PI*2;
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const lerp=(a,b,t)=>a+(b-a)*t;
const ease=x=>{x=clamp(x);return x*x*(3-2*x)};
const eo=x=>1-Math.pow(1-clamp(x),3);
const ei=x=>Math.pow(clamp(x),3);
const seg=(t,a,b)=>clamp((t-a)/(b-a));
const hash=n=>{n=Math.sin(n*127.1+311.7)*43758.5453;return n-Math.floor(n)};
const P={sky:'#5fa8c8',grass:'#5a9a4a',grass2:'#4f8c42',grassD:'#3d7236',dirt:'#b9925e',dirtD:'#94704a',wood:'#7a5034',woodD:'#55361f',roof:'#b6483a',roofD:'#86302a',wall:'#e3c99a',wallD:'#bf9f72',stone:'#8a8f99',stoneD:'#5e636e',water:'#3d7fc4',waterL:'#6fb3e8',skin:'#f0c69a',foe:'#6fbf4a',foeD:'#3f7f2a',red:'#e04a3a',white:'#ffffff',ink:'#141a24',gold:'#f2c94c',purple:'#9a5ad1',cyan:'#7fe3d8',blue:'#4a78c8',night:'#0d1630',leaf:'#3f8f3a',leafD:'#2c6a2e',orange:'#f08a3a'};
function R(c,x,y,w,h,col){if(col)c.fillStyle=col;c.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))}
function circ(c,x,y,r,col){c.fillStyle=col;c.beginPath();c.arc(x,y,Math.max(0,r),0,TAU);c.fill()}
function ring(c,x,y,r,w,col){c.strokeStyle=col;c.lineWidth=w;c.beginPath();c.arc(x,y,Math.max(0,r),0,TAU);c.stroke()}
function txt(c,s,x,y,col,size=8,align='center',font='bold'){c.font=font+' '+size+'px monospace';c.textAlign=align;c.textBaseline='middle';c.fillStyle=col;c.fillText(s,x,y)}
function otxt(c,s,x,y,col,size=8,align='center'){c.font='bold '+size+'px monospace';c.textAlign=align;c.textBaseline='middle';c.fillStyle=P.ink;for(const[dx,dy]of[[-1,0],[1,0],[0,-1],[0,1]])c.fillText(s,x+dx,y+dy);c.fillStyle=col;c.fillText(s,x,y)}
function mk(w,h){const k=document.createElement('canvas');k.width=w;k.height=h;return k}
/* ---- sprites ---- */
const SPR={
foe:{c:{g:P.foe,G:P.foeD,k:P.ink,t:P.wood,d:P.woodD,w:'#ffe9a8'},m:["g.......g","gg.ggg.gg",".GgggggG.",".gwkgwkg.",".ggggggg.","..gGGGg..","..ttttt..",".gtttttg.","..t...t..","..d...d.."]},
npc:{c:{h:P.woodD,s:P.skin,k:P.ink,b:P.blue,B:'#34589a',d:P.woodD},m:["..hhh..",".hhhhh.",".sksks.",".sssss.","..bbb..",".bbbbb.","s.bBb.s","..bbb..","..b.b..","..d.d.."]},
hero:{c:{h:'#d9a441',s:P.skin,k:P.ink,b:P.red,B:'#a8342a',d:P.woodD,m:'#cfd8e3'},m:["..hhh...",".hhhhh..",".sksks..",".sssss.m","..bbb..m",".bbbbbsm","s.bBb...","..bbb...","..b.b...","..d.d..."]},
coin:{c:{y:P.gold,o:'#b8892a',w:'#fff6c8'},m:[".yyy.","ywyyo","ywyyo","yyyyo",".ooo."]},
heart:{c:{r:P.red,w:'#ffb3a8'},m:[".r.r.","rwrrr","rrrrr",".rrr.","..r.."]},
};
const sprCache={};
function sprCanvas(name,mode){const key=name+'|'+(mode||'');if(sprCache[key])return sprCache[key];const s=SPR[name],m=s.m,h=m.length,w=m[0].length,k=mk(w,h),g=k.getContext('2d');for(let y=0;y<h;y++)for(let x=0;x<w;x++){const ch=m[y][x];if(ch==='.')continue;g.fillStyle=mode?(mode[0]==='#'?mode:'#fff'):s.c[ch];g.fillRect(x,y,1,1)}return sprCache[key]=k}
/* draw sprite with feet at (x,y). o:{flash,tint,tintA,sx,sy,alpha,flip,sil} */
function spr(c,name,x,y,o={}){const k=sprCanvas(name),w=k.width,h=k.height,sx=o.sx||1,sy=o.sy||1;c.save();c.globalAlpha=o.alpha==null?1:o.alpha;c.translate(Math.round(x),Math.round(y));if(o.flip)c.scale(-1,1);c.scale(sx,sy);const dx=-Math.floor(w/2),dy=-h;if(o.sil){c.drawImage(sprCanvas(name,o.sil),dx,dy)}else{c.drawImage(k,dx,dy);if(o.tint&&o.tintA){c.globalAlpha*=o.tintA;c.drawImage(sprCanvas(name,o.tint),dx,dy)}if(o.flash){c.globalAlpha=(o.alpha==null?1:o.alpha)*o.flash;c.drawImage(sprCanvas(name,'w'),dx,dy)}}c.restore()}
function shadow(c,x,y,w=6,a=.35){c.fillStyle='rgba(0,0,0,'+a+')';c.beginPath();c.ellipse(Math.round(x),Math.round(y),w,w*.4,0,0,TAU);c.fill()}
function tree(c,x,y,sway=0,col=P.leaf,colD=P.leafD){R(c,x-2,y-7,4,7,P.woodD);c.fillStyle=colD;c.beginPath();c.moveTo(x-9+sway*.5,y-6);c.lineTo(x+sway,y-24);c.lineTo(x+9+sway*.5,y-6);c.fill();c.fillStyle=col;c.beginPath();c.moveTo(x-7+sway*.6,y-11);c.lineTo(x+sway*1.1,y-27);c.lineTo(x+6+sway*.6,y-11);c.fill()}
function house(c,x,y,lit=0){R(c,x-12,y-14,24,14,P.wall);R(c,x-12,y-3,24,3,P.wallD);c.fillStyle=P.roof;c.beginPath();c.moveTo(x-15,y-13);c.lineTo(x,y-25);c.lineTo(x+15,y-13);c.fill();R(c,x-15,y-14,30,2,P.roofD);R(c,x-3,y-8,6,8,P.woodD);R(c,x-10,y-10,5,4,lit>0?'rgba(255,214,120,'+(.35+lit*.65)+')':'#6f8a99');R(c,x+5,y-10,5,4,lit>0?'rgba(255,214,120,'+(.35+lit*.65)+')':'#6f8a99')}
function tower(c,x,y){R(c,x-6,y-22,12,22,P.stone);R(c,x-6,y-4,12,4,P.stoneD);for(let i=0;i<3;i++)R(c,x-7+i*5,y-26,4,4,P.stone);R(c,x-1,y-15,2,4,P.ink)}
function fence(c,x,y,n){for(let i=0;i<n;i++)R(c,x+i*6,y-6,2,6,P.wood);R(c,x,y-5,n*6-4,1,P.woodD);R(c,x,y-2,n*6-4,1,P.woodD)}
function ground(c,ox=0,oy=0,col=P.grass,col2=P.grass2){R(c,0,0,W,H,col);c.fillStyle=col2;for(let i=0;i<70;i++){const x=((hash(i)*W*1.3-ox)%W+W)%W,y=((hash(i+99)*H*1.3-oy)%H+H)%H;c.fillRect(Math.round(x),Math.round(y),2,1)}}
function path(c,ox=0){c.fillStyle=P.dirt;c.beginPath();c.moveTo(100-ox,H);c.bezierCurveTo(110-ox,90,150-ox,70,140-ox,0);c.lineTo(160-ox,0);c.bezierCurveTo(170-ox,70,130-ox,95,135-ox,H);c.fill()}
/* the shared town scene, night 0..1 */
function town(c,o={}){const ox=o.ox||0,oy=o.oy||0,n=o.night||0,sway=o.sway||0;ground(c,ox,oy,o.g1,o.g2);c.save();c.translate(-ox,-oy);path(c);house(c,50,52,n);house(c,195,40,n);tower(c,120,30);fence(c,20,92,6);tree(c,20,40,sway);tree(c,85,100,sway);tree(c,215,95,sway);tree(c,170,120,sway);tree(c,232,60,sway);c.restore();if(n>0){c.fillStyle='rgba(12,22,58,'+(n*.62)+')';c.fillRect(0,0,W,H);c.save();c.globalCompositeOperation='lighter';for(const[x,y]of[[43,44],[58,44],[188,32],[203,32]]){const g=c.createRadialGradient(x-ox,y-oy,0,x-ox,y-oy,14);g.addColorStop(0,'rgba(255,190,90,'+(n*.45)+')');g.addColorStop(1,'rgba(255,190,90,0)');c.fillStyle=g;c.fillRect(x-ox-14,y-oy-14,28,28)}c.restore()}}
/* forest / alt scene */
function forest(c,o={}){const ox=o.ox||0;R(c,0,0,W,H,'#2f5f4a');c.fillStyle='#3a7356';for(let i=0;i<60;i++)c.fillRect(Math.round(((hash(i+5)*W*1.4-ox)%W+W)%W),Math.round(hash(i+50)*H),3,1);for(let i=0;i<14;i++){const x=((hash(i+300)*W*1.5-ox)%(W+30)+W+30)%(W+30)-15,y=20+hash(i+400)*115;tree(c,x,y,0,'#2f7a4a','#1f5a38')}R(c,0,0,W,H,'rgba(40,20,80,.15)')}
let SCN={};
function scene(name){if(SCN[name])return SCN[name];const k=mk(W,H),g=k.getContext('2d');if(name==='day'){town(g);spr(g,'hero',120,80)}else if(name==='night'){town(g,{night:1});spr(g,'hero',120,80)}else if(name==='forest'){forest(g);spr(g,'hero',120,80)}else if(name==='eday'){town(g)}else if(name==='enight'){town(g,{night:1})}else if(name==='eforest'){forest(g)}else if(name==='battle'){R(g,0,0,W,H,'#2a2440');R(g,0,90,W,45,'#3d3460');circ(g,170,62,22,'#463a70');spr(g,'foe',170,72,{sx:3,sy:3});spr(g,'hero',60,118,{sx:3,sy:3})}return SCN[name]=k}
/* deterministic particle burst: returns positions */
function burst(c,x,y,p,n,seed,o={}){const sp=o.speed||40,g=o.grav||0,life=o.life||1;for(let i=0;i<n;i++){const a=(o.a0||0)+(o.spread==null?TAU:o.spread)*hash(seed+i)-(o.spread==null?0:o.spread/2),v=sp*(.4+.6*hash(seed+i*7)),lt=p/(life*(.6+.4*hash(seed+i*3)));if(lt>=1||lt<0)continue;const px=x+Math.cos(a)*v*lt*life,py=y+Math.sin(a)*v*lt*life+g*lt*lt;const col=typeof o.col==='function'?o.col(lt,i):(o.col||P.gold);const s=o.size?o.size(lt,i):(lt<.5?2:1);c.globalAlpha=o.fade?1-lt:1;R(c,px-s/2,py-s/2,s,s,col)}c.globalAlpha=1}
function vignette(c,col,a,inner=.35){const g=c.createRadialGradient(W/2,H/2,H*inner,W/2,H/2,W*.62);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,col.replace('A',a));c.fillStyle=g;c.fillRect(0,0,W,H)}
function label(c,s,x,y,col='#e9edf2'){txt(c,s,x,y,col,7,'center','bold')}
function bar(c,x,y,w,h,v,col,bg='#1d2533'){R(c,x-1,y-1,w+2,h+2,P.ink);R(c,x,y,w,h,bg);R(c,x,y,w*clamp(v),h,col)}
const DEMOS={};
let _tmp=null;function TMP(){if(!_tmp)_tmp=mk(W,H);const g=_tmp.getContext('2d');g.setTransform(1,0,0,1,0,0);g.globalAlpha=1;g.globalCompositeOperation='source-over';g.clearRect(0,0,W,H);return _tmp}
let _tmp2=null;function TMP2(){if(!_tmp2)_tmp2=mk(W,H);const g=_tmp2.getContext('2d');g.setTransform(1,0,0,1,0,0);g.globalAlpha=1;g.globalCompositeOperation='source-over';g.clearRect(0,0,W,H);return _tmp2}

const _idc={};function imgData(name){if(_idc[name])return _idc[name];const k=scene(name);return _idc[name]=k.getContext('2d').getImageData(0,0,W,H)}
let _out=null;function outData(c){if(!_out)_out=c.createImageData(W,H);return _out}
/* putImageData ignores the destination transform and paints into the backing
   store. Full-frame 240×135 buffers go onto an offscreen canvas first, then
   drawImage, so a scaled caller still covers the logical frame. */
let _blit=null;
function blitData(c,img){
  const w=img.width||W,h=img.height||H;
  if(!_blit)_blit=mk(w,h);
  if(_blit.width!==w||_blit.height!==h){_blit.width=w;_blit.height=h}
  const g=_blit.getContext('2d');
  g.setTransform(1,0,0,1,0,0);
  g.putImageData(img,0,0);
  const sm=c.imageSmoothingEnabled;
  c.imageSmoothingEnabled=false;
  c.drawImage(_blit,0,0,w,h,0,0,w,h);
  c.imageSmoothingEnabled=sm;
}
const BAYER4=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];
/* timeline bar for transitions */
function tl(c,t,marks){R(c,0,H-4,W,4,'rgba(0,0,0,.55)');R(c,0,H-3,W*t,2,P.cyan);for(const m of marks)R(c,W*m,H-4,1,4,P.gold)}
function trnK(t,a=.15,b=.85){return clamp((t-a)/(b-a))}
