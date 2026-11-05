/* ===== REN principle demos (canvas) ===== */
(()=>{
/* REN-30 eye adaptation: exposure lags behind the change in scene brightness */
const ox30=u=>prKeys([[0,0],[.15,0],[.32,240],[.6,240],[.77,0],[1,0]],u);
const lum30=u=>lerp(.32,1,clamp(ox30(u)/240));
const s30=prSeries('r30',()=>({e:.32}),(s,u,dt)=>{const L=lum30(u);s.e=Math.exp(lerp(Math.log(s.e),Math.log(L),Math.min(1,(L>s.e?4.5:2.5)*dt*6/1.2)))});
DEMOS['REN-30']={d:7,f:(c,t)=>{const u=prWrap(t),ox=ox30(u),e=prAt(s30,u).e,k=TMP(),g=k.getContext('2d');g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,W,H);g.save();g.translate(-Math.round(ox),0);
 g.fillStyle='rgb(46,40,52)';g.fillRect(0,0,240,H);g.fillStyle='rgb(36,30,40)';for(let y=0;y<100;y+=8)for(let x=(y/8%2)*8;x<240;x+=16)g.fillRect(x,y,15,7);g.fillStyle='rgb(60,44,32)';g.fillRect(0,100,240,35);
 const fl=.7+.3*Math.sin(u*TAU*9);circ(g,60,50,10*fl,'rgba(255,170,80,.35)');R(g,58,50,4,10,P.woodD);circ(g,60,47,3,P.orange);
 g.drawImage(scene('eday'),240,0);R(g,234,0,8,H,P.stoneD);g.restore();shadow(g,120,104,6);const mv=Math.abs(ox30(prWrap(u+.002))-ox)>.05;prWalker(g,120,104,ox/14,{s:2,flip:ox30(prWrap(u+.002))<ox,still:!mv});
 const br=clamp(.85/e,.6,2.6);c.save();c.filter='brightness('+br.toFixed(3)+')';c.drawImage(k,0,0);c.restore();
 const ev=Math.log2(e);R(c,W-58,4,54,22,'rgba(10,14,24,.8)');txt(c,'EV',W-54,10,'#e9edf2',6,'left');R(c,W-40,9,32,2,'#5e636e');R(c,W-40+clamp((ev+1.7)/1.7)*30,7,3,6,P.gold);txt(c,'gain x'+br.toFixed(1),W-31,20,P.gold,5);
 const blown=br*lum30(u)>1.25,dark=br*lum30(u)<.8;prTag(c,blown?'adapting: too bright':dark?'adapting: too dark':'adapted',4,4,blown||dark?P.gold:P.cyan)}};
/* REN-33 motion blur: accumulate several sub-frame samples along velocity */
DEMOS['REN-33']={d:3,f:(c,t)=>{const x=u=>120+Math.sin(u*TAU)*92,ang=u=>u*TAU*3;for(const i of[0,1])prLane(c,i,i?'ON: 8 samples':'OFF',i?P.cyan:'#e9edf2',gy=>{tree(c,40,gy);tree(c,200,gy);fence(c,96,gy,8);const N=i?8:1,sh=.035;for(let j=N-1;j>=0;j--){const uu=t-sh*j/Math.max(1,N-1)*(i?1:0);c.globalAlpha=i?(j===0?.45:.2):1;const hx=x(uu);spr(c,'hero',hx,gy,{sx:2,sy:2,flip:Math.cos(uu*TAU)<0});const wx=hx,wy=gy-34,a=ang(uu);for(let s=0;s<4;s++){const aa=a+s*Math.PI/2;R(c,wx+Math.cos(aa)*7-1,wy+Math.sin(aa)*7-1,3,3,P.gold)}}c.globalAlpha=1;const sp=Math.abs(Math.cos(t*TAU));if(i)bar(c,150,gy-46,40,3,sp,P.cyan),txt(c,'speed',148,gy-45,P.cyan,5,'right')});
 prTag(c,'shutter 0.035',W-4,4,'#e9edf2','rgba(10,14,24,.75)',6,'right')}};
/* REN-40 temporal AA: point-sampled thin lines crawl; jittered history converges */
const HAL=[[.5,.333],[.25,.667],[.75,.111],[.125,.444],[.625,.778],[.375,.222],[.875,.556],[.0625,.889]];
function lines40(u){const L=[];for(let i=0;i<5;i++){const a=.12+i*.13+Math.sin(u*TAU+i)*.03,nx=-Math.sin(a),ny=Math.cos(a);L.push([nx,ny,8+i*9+u*6+nx*0])}L.push([1,0,170+Math.sin(u*TAU)*3]);L.push([Math.sin(.9),Math.cos(.9),150+u*4]);return L}
DEMOS['REN-40']={d:6,f:(c,t,_w,_h,p)=>{const u=prWrap(t),fd=1/(p.dur*30);const img=c.createImageData(W,H),D=img.data;const sky=[95,168,200],ln=[32,28,36];
 const cov=(L,x,y)=>{for(const[nx,ny,d]of L)if(Math.abs(nx*x+ny*y-d)<.32)return 1;return 0};
 const hist=[];for(let k=0;k<8;k++)hist.push(lines40(u-k*fd));
 for(let y=0;y<H;y++){const lane=y<66?0:y>=69?1:-1;for(let x=0;x<W;x++){const o=(y*W+x)*4;if(lane<0){D[o]=20;D[o+1]=26;D[o+2]=36;D[o+3]=255;continue}const ly=lane?y-69:y;let v;if(!lane)v=cov(hist[0],x+.5,ly+.5);else{v=0;for(let k=0;k<8;k++)v+=cov(hist[k],x+HAL[k][0],ly+HAL[k][1]);v/=8}
  const g=ly>52?1:0;const bg=g?[148,112,74]:sky;D[o]=lerp(bg[0],ln[0],v);D[o+1]=lerp(bg[1],ln[1],v);D[o+2]=lerp(bg[2],ln[2],v);D[o+3]=255}}
 c.putImageData(img,0,0);for(const y0 of[0,69]){R(c,0,y0+52,W,2,P.grass);for(let i=0;i<5;i++)R(c,164+i*12,y0+40,2,12,P.woodD)}
 prTag(c,'NO AA: crawl',4,3,P.red);prTag(c,'TAA: 8 jittered frames',4,72,P.cyan);
 for(const[i,y0]of[[0,0],[1,69]]){for(let yy=0;yy<12;yy++)for(let xx=0;xx<12;xx++){const q=((y0+14+yy)*W+34+xx)*4;R(c,W-40+xx*3,y0+6+yy*3,3,3,'rgb('+D[q]+','+D[q+1]+','+D[q+2]+')')}prDash(c,33,y0+13,13,13,'rgba(233,237,242,.6)');prDash(c,W-40,y0+6,36,36,'#e9edf2')}}};
/* REN-41 TAA ghosting: rejected history vs smeared trails */
DEMOS['REN-41']={d:4,f:(c,t)=>{const x=u=>120+Math.sin(u*TAU)*95,y0s=[0,69];for(const i of[0,1])prLane(c,i,i?'GHOSTING':'CLEAN',i?P.red:P.cyan,gy=>{house(c,60,gy);tree(c,150,gy);tree(c,210,gy);if(i){for(let k=8;k>=1;k--){const uu=t-k*.018;c.globalAlpha=.42*Math.pow(.8,k);spr(c,'hero',x(uu),gy,{sx:2,sy:2,flip:Math.cos(uu*TAU)<0});c.globalAlpha=.25*Math.pow(.8,k);circ(c,x(uu),gy-30,4,P.gold)}c.globalAlpha=1}
  spr(c,'hero',x(t),gy,{sx:2,sy:2,flip:Math.cos(t*TAU)<0});circ(c,x(t),gy-30,4,P.gold);circ(c,x(t)-1,gy-31,1.5,'#fff6c8')});
 prTag(c,'history rejected',W-4,4,P.cyan,'rgba(10,14,24,.75)',6,'right');prTag(c,'history kept: trail',W-4,73,P.red,'rgba(10,14,24,.75)',6,'right')}};
})();
