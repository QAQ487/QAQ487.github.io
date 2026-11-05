/* ===== A11Y demos (可讀性與無障礙) — slow, non-flashing motion only; everything local to this IIFE ===== */
(()=>{
const dec=x=>x<=.04045?x/12.92:Math.pow((x+.055)/1.055,2.4);
const lum=c=>.2126*dec(c[0])+.7152*dec(c[1])+.0722*dec(c[2]);
const ratio=(a,b)=>{const la=lum(a),lb=lum(b);return (Math.max(la,lb)+.05)/(Math.min(la,lb)+.05)};
const hex=c=>'rgb('+c.map(v=>Math.round(clamp(v)*255)).join(',')+')';
const tag=(c,s,x,y,col='#e9edf2')=>{c.font='bold 7px monospace';const w=Math.ceil(c.measureText(s).width)+6;R(c,x-w/2,y-5,w,10,'rgba(0,0,0,.6)');txt(c,s,x,y,col,7)};
/* background palette cycles smoothly: snow -> explosion glow -> dark room -> sky (no flashing: one slow pass per 8 s) */
const KEYS=[[.95,.96,.98],[1,.84,.48],[.06,.07,.1],[.45,.62,.8]];
const bgAt=u=>{u=((u%1)+1)%1*4;const i=Math.floor(u),f=ease(u-i),a=KEYS[i],b=KEYS[(i+1)%4];return [0,1,2].map(j=>lerp(a[j],b[j],f))};

/* A11Y-01 text contrast: plain vs backplate vs dual outline over a slowly changing background */
DEMOS['A11Y-01']={d:8,f:(c,t)=>{R(c,0,0,W,H,'#0b0f16');const rows=[['PLAIN',0],['BACKPLATE 60%',1],['DUAL OUTLINE',2]];
rows.forEach(([lab,m],i)=>{const y0=6+i*42,h=36;for(let x=0;x<W;x+=4){const col=bgAt(t+x/W*.35);R(c,x,y0,4,h,hex(col))}
const under=bgAt(t+.5*.35),tc=[1,1,1];const s='Behind you!',ty=y0+h/2+2;c.font='bold 11px monospace';const tw=c.measureText(s).width;
let eff=under;if(m===1){c.fillStyle='rgba(8,10,16,.6)';const x=120-tw/2-6,yy=ty-9,w=tw+12,hh=17,r=4;c.beginPath();c.moveTo(x+r,yy);c.arcTo(x+w,yy,x+w,yy+hh,r);c.arcTo(x+w,yy+hh,x,yy+hh,r);c.arcTo(x,yy+hh,x,yy,r);c.arcTo(x,yy,x+w,yy,r);c.fill();eff=under.map(v=>v*.4+.03*.6)}
if(m===2){c.textAlign='center';c.textBaseline='middle';c.fillStyle='#f4f6fa';for(let a=0;a<16;a++){const an=a/16*TAU;c.fillText(s,120+Math.cos(an)*2,ty+Math.sin(an)*2)}c.fillStyle='#10131a';for(let a=0;a<8;a++){const an=a/8*TAU;c.fillText(s,120+Math.cos(an),ty+Math.sin(an))}eff=[.06,.07,.1]}
txt(c,s,120,ty,'#ffffff',11);const cr=ratio(tc,eff),ok=cr>=4.5;
tag(c,lab,32,y0+7,'#e9edf2');tag(c,cr.toFixed(1)+':1 '+(ok?'OK':'LOW'),210,y0+h-7,ok?P.cyan:'#ff9a8a')});
txt(c,'contrast measured against what is actually behind the letters',120,132,'#9aa6b8',5);}};

/* A11Y-02 text scaling: fixed lines clipped vs measure-then-layout reflow */
const MSG='Press E to open the old gate. The key is hidden in the tower.';
const wrap=(c,s,maxW)=>{const w=s.split(' '),L=[];let cur='';for(const x of w){const tst=cur?cur+' '+x:x;if(c.measureText(tst).width>maxW&&cur){L.push(cur);cur=x}else cur=tst}if(cur)L.push(cur);return L};
DEMOS['A11Y-02']={d:8,f:(c,t)=>{R(c,0,0,W,H,'#1c2433');for(let i=0;i<12;i++)R(c,i*20,0,10,H,'rgba(255,255,255,.02)');
const k=t<.15?0:t<.4?ease((t-.15)/.25)*.5:t<.5?.5:t<.75?.5+ease((t-.5)/.25)*.5:t<.9?1:1-ease((t-.9)/.1);const sc=1+k,fs=5*sc;
tag(c,'TEXT SIZE '+Math.round(sc*100)+'%',120,7,P.gold);bar(c,70,14,100,3,k,P.gold);
/* left: lines broken once at 100%, box fixed -> clipped */
const bx=8,by=26,bw=104,bh=40;c.font='bold 5px monospace';const base=wrap(c,MSG,bw-8);R(c,bx,by,bw,bh,'#0f1520');R(c,bx,by,bw,1,'#5a6a86');
c.save();c.beginPath();c.rect(bx,by,bw,bh);c.clip();base.forEach((l,i)=>txt(c,l,bx+4,by+7+i*fs*1.35,'#ffffff',fs,'left','bold'));c.restore();
c.font='bold '+fs+'px monospace';const over=base.some(l=>c.measureText(l).width>bw-8)||base.length*fs*1.35+4>bh;if(over){R(c,bx+bw-2,by,2,bh,P.red);R(c,bx,by+bh-2,bw,2,P.red)}
tag(c,'FIXED BOX',bx+bw/2,by+bh+8,over?'#ff9a8a':'#e9edf2');txt(c,over?'text clipped':'fits',bx+bw/2,by+bh+18,over?'#ffb3a8':'#9aa6b8',6);
/* right: measure -> wrap -> grow box (nine-slice) -> scroll when taller than max */
const rx=128,rw=104,maxH=92;c.font='bold '+fs+'px monospace';const lines=wrap(c,MSG,rw-8);const need=lines.length*fs*1.35+6,rh=Math.min(maxH,need);
R(c,rx,by,rw,rh,'#0f1520');R(c,rx,by,rw,1,P.cyan);R(c,rx,by+rh-1,rw,1,P.cyan);c.save();c.beginPath();c.rect(rx,by,rw,rh);c.clip();lines.forEach((l,i)=>txt(c,l,rx+4,by+3+fs*.7+i*fs*1.35,'#ffffff',fs,'left','bold'));c.restore();
if(need>maxH){R(c,rx+rw-3,by+2,2,rh-4,'#33405a');R(c,rx+rw-3,by+2,2,(rh-4)*maxH/need,P.cyan)}
tag(c,'MEASURE > REFLOW',rx+rw/2,Math.min(by+rh+8,126),P.cyan);txt(c,lines.length+' lines, box '+Math.round(rh)+' px',rx+rw/2,Math.min(by+rh+18,132),'#bff3ec',6);tl(c,t,[.15,.5,.9])}};
})();
