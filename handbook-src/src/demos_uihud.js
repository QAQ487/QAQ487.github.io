/* ===== UI/HUD expansion demos (UI-19 … UI-26) ===== */
(()=>{
const G=c=>c.scale(2,2);
const bg=(c,a='#0a1520',b='#061018')=>{const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,a);g.addColorStop(1,b);c.fillStyle=g;c.fillRect(0,0,W,H)};
const scan=(c,a=.08)=>{c.fillStyle='rgba(127,227,216,'+a+')';for(let y=0;y<H;y+=3)c.fillRect(0,y,W,1)};
const frame=(c,x,y,w,h,col=P.cyan)=>{c.strokeStyle=col;c.lineWidth=1;c.strokeRect(x+.5,y+.5,w-1,h-1)};
const SIX=[{n:'Sword',c:'#cfd8e3'},{n:'Bow',c:'#b9925e'},{n:'Bomb',c:'#5e636e'},{n:'Potion',c:P.red},{n:'Key',c:P.gold},{n:'Torch',c:P.orange}];
const sixIcon=(c,i,x,y,s=10)=>{const col=SIX[i].c;if(i===0){c.strokeStyle=col;c.lineWidth=2;c.beginPath();c.moveTo(x,y+s);c.lineTo(x+s,y);c.stroke()}
 else if(i===1){c.strokeStyle=col;c.lineWidth=2;c.beginPath();c.moveTo(x,y+s/2);c.lineTo(x+s,y+s/2);c.lineTo(x+s*.6,y);c.stroke()}
 else if(i===2){circ(c,x+s/2,y+s/2,s*.4,col);R(c,x+s/2-1,y+2,2,3,P.ink)}
 else if(i===3){R(c,x+2,y+2,s-4,s-3,col);R(c,x+s/2-1,y,2,3,P.gold)}
 else if(i===4){R(c,x+3,y+2,2,s-3,col);circ(c,x+4,y+3,3,col)}
 else{R(c,x+s/2-1,y+3,2,s-3,P.wood);circ(c,x+s/2,y+3,3,col)}};

/* UI-19 terminal vs themed collage pause — same options / focus / back */
DEMOS['UI-19']={d:6,hi:true,f:(c,t)=>{G(c);const u=prWrap(t),focus=Math.floor(u*9)%3,opts=['RESUME','OPTIONS','QUIT'];
 // left: themed collage pause
 c.save();c.beginPath();c.rect(0,0,119,H);c.clip();
 c.drawImage(scene('eday'),-20,0);R(c,0,0,119,H,'rgba(20,10,30,.35)');
 // collage scraps
 R(c,8,10,50,70,'#e3c99a');R(c,12,14,42,20,P.red);txt(c,'PAUSE',33,24,P.ink,7);
 spr(c,'hero',90,100,{sx:2.2,sy:2.2});
 opts.forEach((n,i)=>{const y=40+i*18,on=i===focus;R(c,10,y,70,14,on?'#fff':P.ink);R(c,11,y+1,68,12,on?P.gold:'#2a1a28');txt(c,n,44,y+7,on?P.ink:'#e9edf2',6)});
 txt(c,'[B] Back',16,120,'#cfd8e3',5,'left');txt(c,'COLLAGE',60,8,P.gold,6);c.restore();
 // right: industrial terminal
 c.save();c.beginPath();c.rect(121,0,119,H);c.clip();c.translate(121,0);
 bg(c);if(u%.2<.12)scan(c,.06);else scan(c,.1);
 frame(c,6,6,107,123,P.cyan);txt(c,'SYS // PAUSE',10,14,P.cyan,6,'left');txt(c,'T='+Math.floor(u*100),90,14,'#3a6a70',5,'left');
 R(c,10,20,99,1,P.cyan);txt(c,'O2 98%',10,30,P.cyan,5,'left');txt(c,'PWR 71%',60,30,P.cyan,5,'left');
 for(let i=0;i<12;i++)R(c,10+i*8,34,5,2,i<9?P.cyan:'#1a4050');
 opts.forEach((n,i)=>{const y=48+i*18,on=i===focus;frame(c,14,y,90,14,on?'#fff':P.cyan);if(on)R(c,16,y+2,86,10,'rgba(127,227,216,.15)');
  txt(c,(on?'> ':'  ')+n,18,y+8,on?'#fff':P.cyan,6,'left')});
 txt(c,'[ESC] BACK',10,120,P.cyan,5,'left');txt(c,'TERMINAL',60,8,P.cyan,6);c.restore();
 R(c,119,0,2,H,P.ink);label(c,'same options · focus · back',120,130,'#8aa')}};

/* UI-20 icon family at large vs tiny */
DEMOS['UI-20']={d:4,hi:true,f:(c,t)=>{G(c);bg(c,'#16202e','#0f1621');const u=prWrap(t);
 const icons=[['MAP',(c,x,y,s)=>{circ(c,x+s/2,y+s/2,s*.38,P.cyan);R(c,x+s*.3,y+s*.45,s*.4,2,P.ink)}],
  ['BAG',(c,x,y,s)=>{R(c,x+s*.2,y+s*.35,s*.6,s*.45,P.gold);R(c,x+s*.35,y+s*.22,s*.3,s*.2,P.gold)}],
  ['QUEST',(c,x,y,s)=>{R(c,x+s*.3,y+s*.2,s*.4,s*.55,'#e9edf2');R(c,x+s*.42,y+s*.3,s*.16,s*.28,P.ink);circ(c,x+s/2,y+s*.72,2,P.ink)}],
  ['GEAR',(c,x,y,s)=>{circ(c,x+s/2,y+s/2,s*.28,P.stone);circ(c,x+s/2,y+s/2,s*.12,'#16202e');for(let i=0;i<6;i++){const a=i*TAU/6;R(c,x+s/2+Math.cos(a)*s*.38-1.5,y+s/2+Math.sin(a)*s*.38-1.5,3,3,P.stone)}}]];
 txt(c,'ICON FAMILY',8,12,'#e9edf2',7,'left');
 icons.forEach(([n,draw],i)=>{const x=20+i*55,y=28,s=36;frame(c,x,y,s,s,'#5e636e');R(c,x+2,y+2,s-4,s-4,'#1d2533');draw(c,x+2,y+2,s-4);
  // new badge shared corner
  if(i===1&&Math.floor(u*4)%2){R(c,x+s-9,y+2,7,7,P.red);txt(c,'!',x+s-5.5,y+6,'#fff',5)}
  txt(c,n,x+s/2,y+s+8,'#9aa6b8',5);
  // tiny greyscale row
  const tx=28+i*50,ty=100,ts=14;R(c,tx,ty,ts,ts,'#2a3344');c.save();draw(c,tx,ty,ts);R(c,tx,ty,ts,ts,'rgba(20,26,36,.45)');c.restore();
  frame(c,tx,ty,ts,ts,'#8a8f99')});
 if(u<.5){R(c,72,22,70,12,'rgba(10,14,24,.85)');txt(c,'NEW: Bag',107,28,P.gold,5)}
 label(c,'same frame · greyscale still unique',120,128,'#8aa')}};

/* UI-21 hotbar — bottom centre + corner, same six items */
DEMOS['UI-21']={d:5,hi:true,f:(c,t)=>{G(c);c.drawImage(scene('eday'),0,0);const u=prWrap(t),eq=Math.floor(u*8)%6,cd=u>.55&&u<.85?1-seg(u,.55,.85):0;
 const drawBar=(ox,oy,corner)=>{SIX.forEach((it,i)=>{const x=ox+i*22,y=oy,on=i===eq;R(c,x-1,y-1,20,20,on?'#fff':P.ink);R(c,x,y,18,18,'#1d2533');
  if(on)frame(c,x-1,y-1,20,20,P.gold);sixIcon(c,i,x+4,y+4,10);txt(c,String(i+1),x+2,y+16,'#8aa',4,'left');
  if(i===3)txt(c,'x3',x+16,y+4,P.cyan,4,'right');
  if(i===2&&cd>0){R(c,x,y,18,18,'rgba(0,0,0,.55)');otxt(c,String(Math.ceil(cd*3)),x+9,y+9,'#fff',7)}
  if(i===5&&u>.9){/* empty kept */}});
  txt(c,corner?'CORNER':'BOTTOM',ox+66,oy-6,P.gold,5)};
 drawBar(54,108,0);drawBar(168,8,1);
 // depleted slot 6 still reserves space
 if(u>.88){const x=54+5*22,y=108;R(c,x,y,18,18,'#141a24');frame(c,x-1,y-1,20,20,eq===5?P.gold:'#5e636e');txt(c,'6',x+2,y+16,'#8aa',4,'left')}
 label(c,'equip frame · empty kept · CD in cell',120,128,'#fff');
 txt(c,'vs UI-11 radial · UI-22 grid · UI-23 list',8,8,'#cfd8e3',5,'left')}};

/* UI-22 spatial grid vs 1-cell */
DEMOS['UI-22']={d:6,hi:true,f:(c,t)=>{G(c);bg(c,'#16202e','#0f1621');const u=prWrap(t);
 const cell=12,ox=14,oy=28,cols=8,rows=5;
 txt(c,'MULTI-CELL',ox,18,P.cyan,6,'left');txt(c,'1-CELL',140,18,P.gold,6,'left');
 // left grid
 for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){R(c,ox+x*cell,oy+y*cell,cell-1,cell-1,'#1d2533')}
 // fixed items
 const place=(cells,col)=>{cells.forEach(([x,y])=>R(c,ox+x*cell,oy+y*cell,cell-1,cell-1,col))};
 place([[0,0],[1,0],[0,1]],'#5e636e');place([[3,2]],P.red);place([[5,0],[5,1],[5,2]],'#b9925e');
 // dragging 1x3 gun, rotate mid-way
 const rot=u>.45&&u<.8,gx=rot?2:1,gy=rot?3:1,foot=rot?[[0,0],[1,0],[2,0]]:[[0,0],[0,1],[0,2]];
 const oxg=2+Math.floor(seg(u,.1,.4)*3),oyg=1;const conflict=oxg+ (rot?2:0)>=cols||oyg+(rot?0:2)>=rows||(oxg===5);
 foot.forEach(([fx,fy])=>{const x=ox+(oxg+fx)*cell,y=oy+(oyg+fy)*cell;R(c,x,y,cell-1,cell-1,conflict?'rgba(224,74,58,.7)':'rgba(127,227,216,.55)')});
 if(conflict)txt(c,'CONFLICT → keep origin',ox,oy+rows*cell+8,P.red,5,'left');
 else txt(c,rot?'ROTATED 1x3':'DRAG 1x3',ox,oy+rows*cell+8,P.cyan,5,'left');
 // right 1-cell mode
 const ox2=140,oy2=28;for(let y=0;y<4;y++)for(let x=0;x<4;x++)R(c,ox2+x*cell,oy2+y*cell,cell-1,cell-1,'#1d2533');
 SIX.slice(0,6).forEach((it,i)=>{const x=i%3,y=Math.floor(i/3);R(c,ox2+x*cell,oy2+y*cell,cell-1,cell-1,it.c);sixIcon(c,i,ox2+x*cell+1,oy2+y*cell+1,8)});
 txt(c,'each item = 1 cell',ox2,oy2+4*cell+8,'#9aa6b8',5,'left');
 label(c,'preview · rotate · reject keeps slot',120,128,'#8aa')}};

/* UI-23 list-detail with same six items */
DEMOS['UI-23']={d:5,hi:true,f:(c,t)=>{G(c);bg(c,'#16202e','#0f1621');const u=prWrap(t),fi=Math.floor(u*8)%6,confirm=u>.7&&u<.85;
 R(c,8,10,100,112,'#1d2533');R(c,8,10,100,1,P.gold);txt(c,'ITEMS',14,20,'#9aa6b8',6,'left');
 SIX.forEach((it,i)=>{const y=28+i*14,on=i===fi;R(c,12,y,92,12,on?'rgba(127,227,216,.2)':'#141a24');if(on)R(c,12,y,2,12,P.cyan);
  sixIcon(c,i,16,y+1,10);txt(c,it.n,30,y+7,on?'#fff':'#cfd8e3',6,'left')});
 // detail pane
 R(c,116,10,116,112,'#1d2533');R(c,116,10,116,1,P.gold);txt(c,'DETAIL',122,20,'#9aa6b8',6,'left');
 const it=SIX[fi];sixIcon(c,fi,130,36,20);txt(c,it.n,160,42,'#fff',8,'left');
 txt(c,'ATK '+(8+fi*3),122,70,'#cfd8e3',6,'left');txt(c,'WT  '+(1+fi*0.5).toFixed(1),122,82,'#cfd8e3',6,'left');
 txt(c,'Quick-use tool #'+(fi+1),122,96,'#9aa6b8',5,'left');
 R(c,122,108,60,12,confirm?P.gold:'#2a3a52');txt(c,confirm?'EQUIPPED':'[A] EQUIP',152,114,confirm?P.ink:'#e9edf2',6);
 // narrow note
 if(u>.85){R(c,116,10,116,112,'rgba(13,22,48,.92)');txt(c,'NARROW: detail page',174,50,P.cyan,6);txt(c,'back keeps #'+(fi+1),174,66,'#cfd8e3',5)}
 label(c,'focus updates pane · confirm equips',120,128,'#8aa')}};

/* UI-24 contextual HUD */
DEMOS['UI-24']={d:6,hi:true,f:(c,t)=>{G(c);c.drawImage(scene('eday'),0,0);const u=prWrap(t);
 const hx=lerp(60,160,ease(prTri(u)));shadow(c,hx,98,6);spr(c,'hero',hx,98,{sx:2,sy:2,flip:u>.5});
 // damage events
 const hits=[.2,.35,.5],lastHit=hits.reduce((a,h)=>u>=h?h:a,-1);
 const hp=clamp(.9-hits.filter(h=>u>=h).length*.18);const critical=hp<.35;
 const since=lastHit<0?9:u-lastHit;const showHp=critical||(since>=0&&since<.55)||(u>.75); // always-on option at end
 const aHp=critical?1:showHp?(u>.75?1:clamp(1-seg(since,.35,.55))):0;
 if(aHp>0){c.globalAlpha=aHp;bar(c,8,8,70,6,hp,critical?P.red:'#5be35b');txt(c,Math.round(hp*100)+'%',84,11,'#e9edf2',5,'left');c.globalAlpha=1}
 // quest tracker only when tracked
 const quest=u>.15&&u<.72;if(quest){const qa=u<.25?ease(seg(u,.15,.25)):1-ease(seg(u,.62,.72));c.globalAlpha=qa;R(c,W-78,8,70,20,'rgba(10,14,24,.75)');txt(c,'OBJ: Bridge',W-43,14,P.gold,5);txt(c,'240 m',W-43,23,'#cfd8e3',5);c.globalAlpha=1}
 prTag(c,critical?'CRITICAL — stay on':aHp>0?'HP on change':'HUD idle',4,H-14,critical?P.red:aHp>0?P.cyan:'#9aa6b8');
 if(u>.75)prTag(c,'always-on option',W-4,H-14,P.gold,'rgba(10,14,24,.75)',6,'right')}};

/* UI-25 safe area anchors — ultrawide vs split vs narrow */
DEMOS['UI-25']={d:5,hi:true,f:(c,t)=>{G(c);const u=prWrap(t),mode=u<.33?0:u<.66?1:2; // ultra, split, narrow
 bg(c,'#0d1630','#061018');
 const drawHud=(x0,y0,w,h,tag)=>{const m=6;frame(c,x0+m,y0+m,w-2*m,h-2*m,'rgba(127,227,216,.35)');
  // widgets clamped inside
  bar(c,x0+m+2,y0+m+2,Math.min(50,w*.35),5,.7,P.red);R(c,x0+w-m-28,y0+m+2,26,16,'#1d2533');txt(c,'MAP',x0+w-m-15,y0+m+10,P.cyan,5);
  R(c,x0+w/2-30,y0+h-m-14,60,12,'#1d2533');SIX.slice(0,4).forEach((_,i)=>R(c,x0+w/2-28+i*14,y0+h-m-12,12,8,'#2a3344'));
  txt(c,tag,x0+w/2,y0+h/2,'#8aa',6)};
 if(mode===0){ // ultrawide letterbox simulation
  R(c,0,20,W,95,'#1a2440');drawHud(0,20,W,95,'ULTRA — inset');txt(c,'no edge clip',120,16,P.cyan,6)}
 else if(mode===1){R(c,0,10,118,115,'#1a2440');R(c,122,10,118,115,'#1a2440');drawHud(0,10,118,115,'P1');drawHud(122,10,118,115,'P2');txt(c,'SPLIT — per pane safe',120,6,P.gold,6)}
 else{R(c,50,5,140,125,'#1a2440');drawHud(50,5,140,125,'NARROW');txt(c,'reflow stack',120,6,P.gold,6);txt(c,'LANG: Angriffsreichweite',70,118,P.cyan,4,'left')}
 label(c,'anchors follow safe rect',120,132,'#8aa')}};

/* UI-26 HUD edit mode */
DEMOS['UI-26']={d:5,hi:true,f:(c,t)=>{G(c);c.drawImage(scene('eday'),0,0);const u=prWrap(t),edit=u<.75;
 R(c,0,0,W,H,edit?'rgba(13,22,48,.45)':'rgba(0,0,0,0)');
 // snap grid in edit
 if(edit){c.strokeStyle='rgba(127,227,216,.15)';c.lineWidth=1;for(let x=0;x<W;x+=20){c.beginPath();c.moveTo(x,0);c.lineTo(x,H);c.stroke()}for(let y=0;y<H;y+=20){c.beginPath();c.moveTo(0,y);c.lineTo(W,y);c.stroke()}}
 const hpX=edit?lerp(8,40,ease(seg(u,.1,.35))):8,hpY=8;
 const mapX=edit?lerp(W-40,W-70,ease(seg(u,.2,.45))):W-40,mapY=edit?lerp(8,30,ease(seg(u,.2,.45))):8;
 const barY=edit?lerp(108,90,ease(seg(u,.3,.55))):108;
 bar(c,hpX,hpY,60,6,.65,P.red);frame(c,hpX-2,hpY-2,64,10,edit?P.gold:'rgba(0,0,0,0)');
 R(c,mapX,mapY,32,22,'#1d2533');frame(c,mapX-2,mapY-2,36,26,edit?P.cyan:'rgba(0,0,0,0)');txt(c,'MAP',mapX+16,mapY+11,P.cyan,5);
 SIX.slice(0,5).forEach((_,i)=>{R(c,70+i*18,barY,16,14,'#1d2533')});frame(c,68,barY-2,5*18+2,18,edit?P.gold:'rgba(0,0,0,0)');
 if(edit){txt(c,'EDIT MODE · drag / snap / save',8,128,P.gold,6,'left');R(c,170,120,60,10,'#2a3a52');txt(c,'RESET',200,125,'#e9edf2',5)}
 else{txt(c,'PLAY · locked layout',8,128,'#cfd8e3',6,'left');
  // reclamp cue
  if(u>.85){frame(c,6,6,W-12,H-18,P.cyan);txt(c,'reclamp to safe area',120,70,P.cyan,6)}}
}};
})();
