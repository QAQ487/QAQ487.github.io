/* ===== Principle demos (CAM/REN/ACT/FX/UX) migrated from SVG to canvas — shared helpers, prefix pr ===== */
const prTag=(c,s,x,y,col='#e9edf2',bg='rgba(10,14,24,.75)',size=6,align='left')=>{c.font='bold '+size+'px monospace';const w=Math.ceil(c.measureText(s).width)+6;const x0=align==='right'?x-w:align==='center'?x-w/2:x;R(c,x0,y,w,size+4,bg);txt(c,s,x0+3,y+size/2+2,col,size,'left')};
const prDash=(c,x,y,w,h,col,lw=1)=>{c.save();c.strokeStyle=col;c.lineWidth=lw;c.setLineDash([3,2]);c.strokeRect(Math.round(x)+.5,Math.round(y)+.5,Math.round(w),Math.round(h));c.restore()};
const prLine=(c,x0,y0,x1,y1,col,lw=1,dash)=>{c.save();c.strokeStyle=col;c.lineWidth=lw;if(dash)c.setLineDash(dash);c.beginPath();c.moveTo(x0,y0);c.lineTo(x1,y1);c.stroke();c.restore()};
const prWrap=t=>((t%1)+1)%1;
const prTri=t=>1-Math.abs(1-2*prWrap(t));
/* keyframes [[u,v],...] with smoothstep between keys */
function prKeys(keys,u,fn=ease){if(u<=keys[0][0])return keys[0][1];for(let i=1;i<keys.length;i++){const[a,va]=keys[i-1],[b,vb]=keys[i];if(u<=b)return lerp(va,vb,fn((u-a)/(b-a||1)))}return keys[keys.length-1][1]}
/* deterministic stateful follower sampled over one loop after one warm-up loop; returns array of snapshots (scrub-safe, cached) */
const _prSer={};
function prSeries(key,init,step,n=480){if(_prSer[key])return _prSer[key];const s=init(),out=new Array(n);for(let i=-n;i<n;i++){step(s,prWrap(i/n),1/n);if(i>=0)out[i]=Object.assign({},s)}return _prSer[key]=out}
const prAt=(ser,t)=>ser[Math.min(ser.length-1,Math.floor(prWrap(t)*ser.length))];
/* walking figure: sprite body rows + animated 2-pixel legs; feet at (x,y) */
function prWalker(c,x,y,ph,o={}){const name=o.name||'hero',k=sprCanvas(name),w=k.width,s=o.s||1;const a=o.still?0:Math.sin(ph*TAU)*(o.amp==null?1.5:o.amp),bob=o.still?0:Math.round(Math.abs(Math.cos(ph*TAU))*.9);const pc=name==='npc'?P.blue:P.red;c.save();c.globalAlpha=o.alpha==null?1:o.alpha;c.translate(Math.round(x),Math.round(y));if(o.flip)c.scale(-1,1);c.scale(s*(o.sx||1),s*(o.sy||1));const dx=-Math.floor(w/2);R(c,dx+2+Math.round(a),-2-bob,1,1+bob,pc);R(c,dx+2+Math.round(a),-1,1,1,P.woodD);R(c,dx+4-Math.round(a),-2-bob,1,1+bob,pc);R(c,dx+4-Math.round(a),-1,1,1,P.woodD);c.drawImage(k,0,0,w,8,dx,-10-bob,w,8);if(o.flash){c.globalAlpha=o.flash;c.drawImage(sprCanvas(name,'w'),0,0,w,8,dx,-10-bob,w,8)}c.restore()}
/* ---- side-view platform world: camera centre (cx,cy) maps to screen centre ---- */
function prBlock(c,x,y,w,d=70){R(c,x,y,w,d,P.dirtD);R(c,x,y,w,4,P.grass);R(c,x,y+4,w,1,P.grassD);for(let i=0;i<w/9;i++)R(c,x+3+i*9,y+9+((i*7)%5)*4,2,2,P.dirt)}
const PR_PROPS=[];for(let i=-8;i<26;i++){const x=i*64+Math.round(hash(i+11)*30),r=hash(i+57);PR_PROPS.push([x,r<.55?'tree':r<.8?'fence':'house'])}
function prSide(c,cx,cy,o={}){const ox=Math.round(W/2-cx),oy=Math.round(H/2-cy);R(c,0,0,W,H,P.sky);
 for(let i=0;i<7;i++){const x=((hash(i+40)*420-cx*.15)%420+420)%420-60,y=10+hash(i+41)*28+(oy-34)*.1;R(c,x,y,24,5,'#d8eef7');R(c,x+6,y-3,12,3,'#d8eef7')}
 c.fillStyle='#8cc79a';for(let i=-1;i<7;i++){const hx=i*50-((cx*.35)%50+50)%50;c.beginPath();c.arc(hx+25,108+(oy-34)*.4,26+hash(i+Math.floor(cx*.35/50))*8,Math.PI,0);c.fill()}
 c.save();c.translate(ox,oy);const plats=o.plats||[[-2000,100,5000]];for(const[x,y,w]of plats)prBlock(c,x,y,w);
 if(o.props!==false)for(const[x,k]of PR_PROPS){if(x+ox<-30||x+ox>W+30)continue;if(k==='tree')tree(c,x,100);else if(k==='fence')fence(c,x-12,100,4);else house(c,x,100)}
 c.restore()}
/* ---- top-down town world (world coords ~0..960 x 0..420) ---- */
const PR_TREES=[[40,60],[90,330],[210,40],[300,300],[380,70],[470,350],[560,60],[640,290],[730,120],[820,330],[880,60],[150,230],[520,130],[700,380],[930,250],[20,190]];
const PR_HOUSES=[[130,120],[340,150],[610,150],[790,250],[250,370],[880,160]];
function prTopDraw(g,x0,y0,x1,y1){g.fillStyle=P.grass;g.fillRect(x0-2,y0-2,x1-x0+4,y1-y0+4);g.fillStyle=P.grass2;for(let i=0;i<900;i++){const x=hash(i+3)*1000-20,y=hash(i+777)*440-10;if(x>x0-3&&x<x1&&y>y0-2&&y<y1)g.fillRect(Math.round(x),Math.round(y),2,1)}
 g.fillStyle=P.dirt;g.fillRect(-300,192,1600,14);g.fillStyle=P.dirtD;g.fillRect(-300,205,1600,1);g.fillStyle=P.dirt;g.fillRect(452,-100,12,292);
 g.fillStyle=P.water;g.beginPath();g.ellipse(720,60,46,22,0,0,TAU);g.fill();g.fillStyle=P.waterL;g.fillRect(700,52,14,2);g.fillRect(730,64,10,2);
 for(const[hx,hy]of PR_HOUSES)if(hx>x0-30&&hx<x1+30&&hy>y0-10&&hy<y1+40)house(g,hx,hy,0);
 for(const[tx,ty]of PR_TREES)if(tx>x0-20&&tx<x1+20&&ty>y0-5&&ty<y1+30)tree(g,tx,ty,0)}
function prView(c,cx,cy,z=1,extra){c.save();c.translate(Math.round(W/2-cx*z),Math.round(H/2-cy*z));c.scale(z,z);const hw=W/2/z,hh=H/2/z;prTopDraw(c,cx-hw,cy-hh,cx+hw,cy+hh);if(extra)extra(c);c.restore()}
const prW2S=(x,y,cx,cy,z=1)=>[Math.round(W/2-cx*z)+x*z,Math.round(H/2-cy*z)+y*z];
/* ---- pseudo-3D third-person view around the hero at origin; yaw th (camera behind = th 0) ---- */
const PR_3D=[[0,-70,'tower'],[60,-40,'tree'],[-55,-30,'house'],[80,25,'tree'],[-70,45,'tree'],[20,75,'house'],[-25,-90,'tree'],[95,-80,'tree'],[-100,-60,'tree'],[40,30,'foe']];
function prProj(wx,wz,th,D=60,F=100){const cxw=-Math.sin(th)*D,czw=-Math.cos(th)*D,px=wx-cxw,pz=wz-czw;const z=px*Math.sin(th)+pz*Math.cos(th),x=px*Math.cos(th)-pz*Math.sin(th);return z<8?null:{x:W/2+x/z*F,y:45+33*F/z,s:D/z,z}}
function prOrbit(c,th,o={}){R(c,0,0,W,45,P.sky);for(let i=0;i<5;i++){const x=(((hash(i+3)*TAU-th)/TAU*480)%480+480)%480-120;R(c,x,10+i*5,26,4,'#d8eef7')}R(c,0,45,W,H-45,P.grass);
 for(let i=0;i<260;i++){const a=hash(i+5)*TAU,r=8+hash(i+9)*150,p=prProj(Math.cos(a)*r,Math.sin(a)*r,th);if(p&&p.y<H+2)R(c,p.x,p.y,p.s>1?2:1,1,P.grass2)}
 const list=[];for(const[x,z,k]of PR_3D){const p=prProj(x,z,th);if(p)list.push([p,k])}list.push([prProj(0,0,th),'hero']);if(o.arrow){const p=prProj(0,22,th);if(p)list.push([p,'arrow'])}list.sort((a,b)=>b[0].z-a[0].z);
 for(const[p,k]of list){if(p.x<-40||p.x>W+40)continue;c.save();c.translate(Math.round(p.x),Math.round(p.y));const s=p.s;c.scale(s,s);if(k==='tree')tree(c,0,0);else if(k==='house')house(c,0,0);else if(k==='tower')tower(c,0,0);else if(k==='foe'){shadow(c,0,0,5);spr(c,'foe',0,0,{sx:1.4,sy:1.4})}else if(k==='hero'){shadow(c,0,0,6);prWalker(c,0,0,o.ph||0,{s:2,still:o.ph==null})}else if(k==='arrow'){c.fillStyle=P.gold;c.beginPath();c.moveTo(0,-3);c.lineTo(4,2);c.lineTo(-4,2);c.fill()}c.restore()}}
/* top-view inset for orbit-type demos */
function prInset(c,x,y,r,th,o={}){R(c,x-r-3,y-r-3,2*r+6,2*r+6,'rgba(10,14,24,.75)');ring(c,x,y,r*.75,1,'rgba(233,237,242,.35)');for(const[wx,wz,k]of PR_3D){R(c,x+wx/130*r-1,y+wz/130*r-1,2,2,k==='house'?P.roof:k==='tower'?P.stone:P.leaf)}R(c,x-1,y-1,3,3,P.red);
 const cam=(a,col)=>{const px=x-Math.sin(a)*r*.75,py=y-Math.cos(a)*r*.75;prLine(c,px,py,px+Math.sin(a-.5)*9,py+Math.cos(a-.5)*9,col);prLine(c,px,py,px+Math.sin(a+.5)*9,py+Math.cos(a+.5)*9,col);R(c,px-1.5,py-1.5,3,3,col)};
 if(o.goal!=null)cam(o.goal,P.gold);cam(th,o.col||'#cfd8e3')}
/* ---- two-lane comparison frame: fn(gy,y0) draws inside lane i (0 top / 1 bottom); ground surface at gy ---- */
function prLane(c,i,name,col,fn,o={}){const y0=i?69:0,h=66,gy=y0+h-12;c.save();c.beginPath();c.rect(0,y0,W,h);c.clip();R(c,0,y0,W,h,o.bg||P.sky);
 for(let k=0;k<3;k++){const x=30+k*80+hash(k+i*5)*30;R(c,x,y0+10+hash(k+9)*12,22,4,'#d8eef7')}R(c,0,gy,W,12,P.dirtD);R(c,0,gy,W,3,P.grass);R(c,0,gy+3,W,1,P.grassD);
 fn(gy,y0);c.restore();prTag(c,name,4,y0+3,col||'#e9edf2');if(i===0)R(c,0,66,W,3,P.ink)}
/* training dummy that leans by angle a */
function prDummy(c,x,gy,a=0,fl=0){R(c,x-1,gy-6,3,6,P.woodD);c.save();c.translate(x,gy-6);c.rotate(a);R(c,-4,-12,9,12,fl?'#fff':P.dirt);R(c,-4,-9,9,1,P.woodD);R(c,-4,-4,9,1,P.woodD);circ(c,.5,-15,3.5,fl?'#fff':P.wallD);c.restore()}
