/* ===== PP demos (post-processing, batch 2) — all names local to this IIFE ===== */
(()=>{
const ppIH=(x)=>{x=Math.imul(x^(x>>>16),0x45d9f3b);x=Math.imul(x^(x>>>16),0x45d9f3b);return ((x^(x>>>16))>>>0)/4294967296};
/* smooth-lit version of the town: soft gradients so posterize / grain have something to act on */
let ppSm=null,ppSmD=null;
function ppSmooth(){if(ppSm)return ppSm;ppSm=mk(W,H);const g=ppSm.getContext('2d');g.drawImage(scene('eday'),0,0);spr(g,'hero',120,80);
 let gr=g.createLinearGradient(0,0,W,H);gr.addColorStop(0,'rgba(255,240,200,0)');gr.addColorStop(1,'rgba(20,30,70,.55)');g.fillStyle=gr;g.fillRect(0,0,W,H);
 g.globalCompositeOperation='lighter';gr=g.createRadialGradient(70,35,0,70,35,120);gr.addColorStop(0,'rgba(255,200,120,.32)');gr.addColorStop(1,'rgba(255,200,120,0)');g.fillStyle=gr;g.fillRect(0,0,W,H);g.globalCompositeOperation='source-over';return ppSm}
function ppSmData(){if(!ppSmD)ppSmD=ppSmooth().getContext('2d').getImageData(0,0,W,H);return ppSmD}
function ppTag(c,s,x,y){c.font='bold 7px monospace';const w=c.measureText(s).width+6;R(c,x-w/2,y-5,w,10,'rgba(10,14,24,.75)');txt(c,s,x,y,'#e9edf2',7)}
function ppDiv(c,x){R(c,x,0,1,H,'rgba(255,255,255,.85)')}

/* PP-01 Vignette — intensity breathes 0 → 1 */
DEMOS['PP-01']={d:4,f:(c,t)=>{c.drawImage(scene('day'),0,0);const a=.5-.5*Math.cos(t*TAU);const g=c.createRadialGradient(W/2,H/2,H*.40*.9,W/2,H/2,Math.hypot(W/2,H/2));g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(.5,'rgba(0,0,0,'+(a*.25)+')');g.addColorStop(1,'rgba(0,0,0,'+(a*.8)+')');c.fillStyle=g;c.fillRect(0,0,W,H);ppTag(c,'VIGNETTE '+Math.round(a*100)+'%',W/2,H-8)}};

/* PP-02 Film grain — split OFF | GRAIN, pattern changes at 24 fps */
DEMOS['PP-02']={d:2,f:(c,t)=>{const s=ppSmData().data,o=outData(c),d=o.data,fr=Math.floor(t*48),half=W/2;for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=(y*W+x)*4;let r=s[i],g=s[i+1],b=s[i+2];if(x>=half){const L=(r*.2126+g*.7152+b*.0722)/255,n=(ppIH(y*W+x+fr*100003)-.5)*2*24*(.25+3*L*(1-L));r+=n;g+=n;b+=n}d[i]=r;d[i+1]=g;d[i+2]=b;d[i+3]=255}c.putImageData(o,0,0);ppDiv(c,half);ppTag(c,'OFF',half/2,8);ppTag(c,'GRAIN',half*1.5,8)}};

/* PP-03 CRT filter — hi-res; sweeping divider: plain integer scale | CRT (scanlines, RGB mask, curvature, rolling band) */
let ppCrtO=null;
DEMOS['PP-03']={d:6,hi:true,f:(c,t)=>{const OW=480,OH=270,s=imgData('day').data;if(!ppCrtO)ppCrtO=c.createImageData(OW,OH);const d=ppCrtO.data,split=Math.round(240+170*Math.sin(t*TAU)),band=(1-t)*(OH+60)-30,X0=60,Y0=34;
 for(let y=0;y<OH;y++)for(let x=0;x<OW;x++){const i=(y*OW+x)*4;let r,g,b;if(x<split){const j=((Y0+(y>>2))*W+X0+(x>>2))*4;r=s[j];g=s[j+1];b=s[j+2]}else{let u=x/OW*2-1,v=y/OH*2-1;const rr=u*u+v*v,k=1+.05*rr;u*=k;v*=k;if(Math.abs(u)>1||Math.abs(v)>1){r=g=b=0}else{const sx=X0+(u+1)/2*W/2,sy=Y0+(v+1)/2*H/2,j=((Math.min(H-1,sy|0))*W+Math.min(W-1,sx|0))*4,fy=sy-Math.floor(sy);const scan=.35+.8*Math.sin(Math.PI*fy);const m=x%3;const ed=Math.min(1,(1-Math.abs(u))*10)*Math.min(1,(1-Math.abs(v))*10);const bb=1+.06*Math.max(0,1-Math.abs(y-band)/14);const f=scan*ed*bb;r=s[j]*f*(m===0?1.06:.86);g=s[j+1]*f*(m===1?1.06:.86);b=s[j+2]*f*(m===2?1.06:.86)}}d[i]=r;d[i+1]=g;d[i+2]=b;d[i+3]=255}
 blitData(c,ppCrtO);c.fillStyle='rgba(255,255,255,.9)';c.fillRect(split,0,2,OH);c.save();c.scale(2,2);if(split>40)ppTag(c,'PLAIN',Math.min(split/4,60),8);if(split<440)ppTag(c,'CRT',Math.max((split/2+W)/2,180),8);ppTag(c,'4x ZOOM',W/2,H-8);c.restore()}};

/* PP-04 Posterization — levels per channel step down then back up */
const ppLv=[32,12,8,5,4,3,2,3,5,8];
DEMOS['PP-04']={d:5,f:(c,t)=>{const N=ppLv[Math.floor(t*ppLv.length)%ppLv.length],s=ppSmData().data,o=outData(c),d=o.data,q=N-1;for(let i=0;i<d.length;i+=4){d[i]=Math.floor(s[i]/255*q+.5)/q*255;d[i+1]=Math.floor(s[i+1]/255*q+.5)/q*255;d[i+2]=Math.floor(s[i+2]/255*q+.5)/q*255;d[i+3]=255}c.putImageData(o,0,0);ppTag(c,'LEVELS / CHANNEL: '+N,W/2,H-8)}};

/* PP-05 Pixelation — full-screen block size ramp, then a local screen-aligned mosaic following the hero */
const ppBs=[1,2,3,4,6,8,6,4,3,2];let ppPxK=null;
DEMOS['PP-05']={d:5,f:(c,t)=>{if(!ppPxK)ppPxK=mk(W,H);const g=ppPxK.getContext('2d');g.drawImage(scene('eday'),0,0);const local=t>=.5,hx=local?Math.round(lerp(40,200,(t-.5)/.5)):120;spr(g,'hero',hx,local?44:80);const s=g.getImageData(0,0,W,H).data,o=outData(c),d=o.data;
 let B,x0=0,y0=0,x1=W,y1=H;if(!local){B=ppBs[Math.floor(t*2*ppBs.length)%ppBs.length]}else{B=8;x0=Math.floor((hx-32)/8)*8;y0=8;x1=x0+64;y1=56}
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=(y*W+x)*4;let sx=x,sy=y;if(x>=x0&&x<x1&&y>=y0&&y<y1&&B>1){sx=Math.min(W-1,Math.floor(x/B)*B+(B>>1));sy=Math.min(H-1,Math.floor(y/B)*B+(B>>1))}const j=(sy*W+sx)*4;d[i]=s[j];d[i+1]=s[j+1];d[i+2]=s[j+2];d[i+3]=255}c.putImageData(o,0,0);if(local){c.strokeStyle='rgba(255,255,255,.7)';c.setLineDash([2,2]);c.strokeRect(x0+.5,y0+.5,x1-x0-1,y1-y0-1);c.setLineDash([])}ppTag(c,local?'LOCAL MOSAIC  B=8':'FULL SCREEN  B='+B,W/2,H-8)}};

/* PP-06 Desaturation — ramp to grayscale, then selective colour (keep reds) */
DEMOS['PP-06']={d:5,f:(c,t)=>{const s=imgData('day').data,o=outData(c),d=o.data,keep=t>=.6,sat=keep?0:1-ease(seg(t,.08,.4));for(let i=0;i<d.length;i+=4){const r=s[i],g=s[i+1],b=s[i+2],L=.2126*r+.7152*g+.0722*b;let k=1-sat;if(keep&&r>g*1.6&&r>b*1.6)k=0;d[i]=lerp(r,L,k);d[i+1]=lerp(g,L,k);d[i+2]=lerp(b,L,k);d[i+3]=255}c.putImageData(o,0,0);ppTag(c,keep?'GRAYSCALE + KEEP RED':'SATURATION '+Math.round(sat*100)+'%',W/2,H-8)}};

/* PP-07 Radial blur — dash pulse centred on the hero */
DEMOS['PP-07']={d:3,f:(c,t)=>{const src=scene('day'),cx=120,cy=72,st=t<.2?0:t<.28?.16*eo((t-.2)/.08):.16*(1-eo((t-.28)/.42));c.drawImage(src,0,0);if(st>.002){const N=10;for(let i=1;i<=N;i++){const sc=1+st*i/N;c.globalAlpha=1/(i+1);c.drawImage(src,cx-cx*sc,cy-cy*sc,W*sc,H*sc)}c.globalAlpha=1;c.save();c.beginPath();c.arc(cx,cy,16,0,TAU);c.clip();c.drawImage(src,0,0);c.restore()}ppTag(c,'STRENGTH '+st.toFixed(2),W/2,H-8)}};

/* PP-08 Gaussian blur (3× box ≈ Gaussian) — radius ramps up behind a pause panel */
let ppA=null,ppB=null;
function ppBoxH(src,dst,r){const w=W,h=H,n=2*r+1;for(let y=0;y<h;y++)for(let ch=0;ch<3;ch++){let acc=0;const row=y*w;for(let k=-r;k<=r;k++)acc+=src[(row+clamp(k,0,w-1))*4+ch];for(let x=0;x<w;x++){dst[(row+x)*4+ch]=acc/n;acc+=src[(row+Math.min(w-1,x+r+1))*4+ch]-src[(row+Math.max(0,x-r))*4+ch]}}}
function ppBoxV(src,dst,r){const w=W,h=H,n=2*r+1;for(let x=0;x<w;x++)for(let ch=0;ch<3;ch++){let acc=0;for(let k=-r;k<=r;k++)acc+=src[(clamp(k,0,h-1)*w+x)*4+ch];for(let y=0;y<h;y++){dst[(y*w+x)*4+ch]=acc/n;acc+=src[(Math.min(h-1,y+r+1)*w+x)*4+ch]-src[(Math.max(0,y-r)*w+x)*4+ch]}}}
function ppBlur(s,r){if(!ppA){ppA=new Float32Array(W*H*4);ppB=new Float32Array(W*H*4)}for(let i=0;i<s.length;i++)ppA[i]=s[i];for(let p=0;p<3;p++){ppBoxH(ppA,ppB,r);ppBoxV(ppB,ppA,r)}return ppA}
DEMOS['PP-08']={d:4,f:(c,t)=>{const k=t<.5?ease(seg(t,.12,.32)):1-ease(seg(t,.78,.95)),r=Math.round(k*4),s=imgData('day').data,o=outData(c),d=o.data;const b=r>0?ppBlur(s,r):s,dim=1-.3*k;for(let i=0;i<d.length;i+=4){d[i]=b[i]*dim;d[i+1]=b[i+1]*dim;d[i+2]=b[i+2]*dim;d[i+3]=255}c.putImageData(o,0,0);if(k>.5){const a=(k-.5)*2;c.globalAlpha=a;R(c,80,40,80,46,'rgba(14,20,34,.92)');R(c,80,40,80,1,P.cyan);txt(c,'PAUSED',120,52,'#fff',8);txt(c,'> Resume',120,66,P.gold,7,'center','normal');txt(c,'  Options',120,76,'#c9d2de',7,'center','normal');c.globalAlpha=1}ppTag(c,'BLUR r≈'+(r*1.7).toFixed(1)+'px',W/2,H-8)}};

/* PP-09 Screen-space distortion — a refracting bubble travels across; image is resampled, not the objects */
DEMOS['PP-09']={d:4,f:(c,t)=>{const s=imgData('day').data,o=outData(c),d=o.data,bx=lerp(-20,W+20,t),by=48+16*Math.sin(t*TAU*1.5),Rr=28,mx=6;for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=(y*W+x)*4;let sx=x,sy=y;const dx=x-bx,dy=y-by,r=Math.hypot(dx,dy);if(r<Rr&&r>0){const f=r/Rr,off=mx*2.6*f*(1-f*f);sx=Math.round(x-dx/r*off);sy=Math.round(y-dy/r*off)}sx=clamp(sx,0,W-1);sy=clamp(sy,0,H-1);const j=(sy*W+sx)*4;d[i]=s[j];d[i+1]=s[j+1];d[i+2]=s[j+2];d[i+3]=255}c.putImageData(o,0,0);ring(c,bx,by,Rr-.5,1,'rgba(255,255,255,.55)');c.fillStyle='rgba(255,255,255,.7)';c.beginPath();c.arc(bx-8,by-9,2.2,0,TAU);c.fill();ppTag(c,'UV OFFSET ≤ 6px',W/2,H-8)}};

/* PP-10 Sharpening — hi-res soft (upscaled + blurred) image; right half sharpened, amount ramps up to overdone halos */
let ppSoft=null,ppShO=null;
function ppSoftData(){if(ppSoft)return ppSoft;const k=mk(480,270),g=k.getContext('2d');g.imageSmoothingEnabled=true;g.imageSmoothingQuality='high';g.drawImage(scene('day'),0,0,480,270);const a=g.getImageData(0,0,480,270),s=a.data,out=new Uint8ClampedArray(s.length);for(let y=0;y<270;y++)for(let x=0;x<480;x++)for(let ch=0;ch<3;ch++){let acc=0;for(let j=-2;j<=2;j++)for(let i=-2;i<=2;i++)acc+=s[((clamp(y+j,0,269))*480+clamp(x+i,0,479))*4+ch];out[(y*480+x)*4+ch]=acc/25}return ppSoft=out}
DEMOS['PP-10']={d:4,hi:true,f:(c,t)=>{const s=ppSoftData(),OW=480,OH=270;if(!ppShO)ppShO=c.createImageData(OW,OH);const d=ppShO.data,amt=2.4*(.5-.5*Math.cos(t*TAU)),half=240;for(let y=0;y<OH;y++)for(let x=0;x<OW;x++){const i=(y*OW+x)*4;if(x<half||x===0||y===0||x===OW-1||y===OH-1){d[i]=s[i];d[i+1]=s[i+1];d[i+2]=s[i+2]}else{for(let ch=0;ch<3;ch++){const v=s[i+ch];d[i+ch]=v+amt*(4*v-s[i+ch-4]-s[i+ch+4]-s[i+ch-OW*4]-s[i+ch+OW*4])}}d[i+3]=255}blitData(c,ppShO);c.fillStyle='rgba(255,255,255,.9)';c.fillRect(half,0,2,OH);c.save();c.scale(2,2);ppTag(c,'SOFT (e.g. after TAA)',60,8);ppTag(c,'SHARPEN '+amt.toFixed(2),180,8);c.restore()}};

/* PP-11 Lens dirt — screen-fixed dirt mask lit only by the wide bloom of a moving bright light */
let ppDirt=null;
function ppDirtMask(){if(ppDirt)return ppDirt;ppDirt=mk(W,H);const g=ppDirt.getContext('2d');for(let i=0;i<46;i++){const x=hash(i*3.1+1)*W,y=hash(i*5.7+2)*H,r=2+hash(i*1.9+3)*(i<10?16:7),a=.18+hash(i*2.3)*.35;const gr=g.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,'rgba(255,255,255,'+a+')');gr.addColorStop(.7,'rgba(255,255,255,'+(a*.6)+')');gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.fillRect(x-r,y-r,2*r,2*r)}
 for(let i=0;i<9;i++){const x=hash(i+70)*W,y=hash(i+90)*H,r=3+hash(i+110)*4;g.strokeStyle='rgba(255,255,255,.55)';g.lineWidth=1;g.beginPath();for(let k=0;k<=6;k++){const a=k/6*TAU;g.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r)}g.stroke()}
 g.strokeStyle='rgba(255,255,255,.35)';for(let i=0;i<4;i++){const x=hash(i+200)*W,y=hash(i+210)*H;g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x+20,y+6,x+38+hash(i+220)*20,y-4);g.stroke()}return ppDirt}
DEMOS['PP-11']={d:5,f:(c,t)=>{c.drawImage(scene('night'),0,0);R(c,0,0,W,H,'rgba(0,0,10,.35)');const lx=lerp(-30,W+30,t),ly=40-26*Math.sin(t*Math.PI),I=.6+.4*Math.sin(t*Math.PI);
 c.save();c.globalCompositeOperation='lighter';let gr=c.createRadialGradient(lx,ly,0,lx,ly,46);gr.addColorStop(0,'rgba(255,240,210,'+I+')');gr.addColorStop(.15,'rgba(255,200,130,'+(I*.6)+')');gr.addColorStop(1,'rgba(255,160,80,0)');c.fillStyle=gr;c.fillRect(0,0,W,H);circ(c,lx,ly,4,'#fff8e8');c.restore();
 const tm=TMP(),g=tm.getContext('2d');gr=g.createRadialGradient(lx,ly,0,lx,ly,95);gr.addColorStop(0,'rgba(255,225,170,'+I+')');gr.addColorStop(.4,'rgba(255,190,120,'+(I*.5)+')');gr.addColorStop(1,'rgba(255,170,90,0)');g.fillStyle=gr;g.fillRect(0,0,W,H);g.globalCompositeOperation='destination-in';g.drawImage(ppDirtMask(),0,0);
 c.save();c.globalCompositeOperation='lighter';c.globalAlpha=1;c.drawImage(tm,0,0);c.drawImage(tm,0,0);c.restore();ppTag(c,'DIRT = BLOOM x MASK',W/2,H-8)}};
})();
