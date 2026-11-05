/* ===== UX principle demos (canvas, hi-res text) ===== */
(()=>{
const LBL=[['Potion','Ether','Rope','Key'],['Slash','Guard','Dash','Heal'],['Town','Field','Pond','Gate']];
const TABS=['ITEM','SKILL','MAP'],ROWS=[['Potion','x3'],['Ether','x1'],['Rope','x2'],['Key','x1']];
function panel(c,x,y,w,h,tab,tabX,focus,fs,dim=1){R(c,x,y,w,h,'rgba(20,26,36,.94)');R(c,x,y,w,1,P.gold);R(c,x,y+h-1,w,1,'#2f3a4d');
 TABS.forEach((s,i)=>txt(c,s,x+10+i*(w-20)/3+(w-20)/6,y+9,i===tab?'#e9edf2':'#7d8798',6));R(c,x+10+tabX*(w-20)/3+4,y+15,(w-20)/3-8,2,P.cyan);
 ROWS.forEach((r,i)=>{const ry=y+24+i*14,f=i===focus;if(f){c.save();const cx=x+w/2,cy=ry+5;c.translate(cx,cy);c.scale(fs,fs);c.translate(-cx,-cy);R(c,x+6,ry,w-12,11,'rgba(127,227,216,.18)');R(c,x+6,ry,2,11,P.cyan);c.restore()}txt(c,LBL[tab][i],x+14,ry+6,f?'#ffffff':'#cfd8e3',6,'left');if(tab===0)txt(c,r[1],x+w-12,ry+6,'#9aa6b8',6,'right')})}
/* timeline shared by both demos */
const tl16=u=>{const open=seg(u,.05,.18),close=seg(u,.86,.96),tabX=prKeys([[0,0],[.34,0],[.42,1],[.6,1],[.68,2],[1,2]],u,eo),tab=u<.38?0:u<.64?1:2,focus=u<.24?0:u<.3?1:u<.38?2:u<.5?0:u<.64?1:u<.76?0:1;const tf=[.24,.3,.38,.5,.64,.76].reduce((a,b)=>u>=b?b:a,0);return{open,close,tabX,tab,focus,tf}};
DEMOS['UX-16']={d:6,hi:true,f:(c,t,_w,_h,p)=>{c.scale(2,2);const u=prWrap(t),s=tl16(u);c.drawImage(scene('eday'),0,0);R(c,0,0,W,H,'rgba(13,22,48,'+(.45*eo(s.open)*(1-s.close)).toFixed(3)+')');
 const px=lerp(W+4,W-118,eo(s.open))+lerp(0,122,ei(s.close)),fe=(u-s.tf)*p.dur,fs=1+.08*Math.exp(-fe*10)*Math.cos(fe*30);panel(c,px,16,110,84,s.tab,s.tabX,s.focus,fs);
 prTag(c,u<.2?'panel slides in':u<.34?'focus bounce':u<.7?'tab underline glides':u<.86?'focus bounce':'panel slides out',4,4,P.gold);prTag(c,'UI motion',4,H-14,'#e9edf2')}};
/* UX-20 reduced motion: same states, no travel */
DEMOS['UX-20']={d:6,hi:true,f:(c,t,_w,_h,p)=>{c.scale(2,2);const u=prWrap(t),s=tl16(u);for(const i of[0,1]){const x0=i*121;c.save();c.beginPath();c.rect(x0,0,119,H);c.clip();c.translate(x0,0);
 R(c,0,0,119,H,P.sky);const drift=i?0:u*60;for(let k=0;k<4;k++){const x=((k*40+hash(k+3)*20-drift)%160+160)%160-30;R(c,x,10+k*7,22,4,'#d8eef7')}c.fillStyle='#8cc79a';for(let k=-1;k<4;k++){const hx=k*45-(i?0:(u*30)%45);c.beginPath();c.arc(hx+22,H,30,Math.PI,0);c.fill()}R(c,0,H-18,119,18,P.grass);
 const bob=i?0:Math.round(Math.sin(u*TAU*4)*2);spr(c,'hero',12,H-14+bob,{sx:2,sy:2});
 const op=i?(s.open>0?1:0)*(s.close<1?1:0):1,px=i?28:lerp(124,28,eo(s.open))+lerp(0,96,ei(s.close)),fe=(u-s.tf)*p.dur,fs=i?1:1+.08*Math.exp(-fe*10)*Math.cos(fe*30);
 if(op>0){c.save();c.translate(px,0);c.scale(.8,.8);panel(c,0,30,112,84,s.tab,i?s.tab:s.tabX,s.focus,fs);c.restore()}c.restore()}R(c,119,0,2,H,P.ink);
 prTag(c,'DEFAULT',4,4,'#e9edf2');prTag(c,'REDUCED MOTION',125,4,P.cyan);txt(c,'bg moves, slide, bob',70,H-7,'#ffffff',5);txt(c,'static, states snap',191,H-7,'#ffffff',5)}};
})();
