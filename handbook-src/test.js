const puppeteer=require('puppeteer-core');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--disable-gpu']});const p=await b.newPage();await p.setViewport({width:1280,height:900});const errs=[];p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
const file=process.env.HB||'batch1.html';await p.goto('file://'+__dirname+'/'+file);await p.waitForFunction('window.__ready');await p.addStyleTag({content:'.sitehead,.topbar{position:static!important}'});
const ts=[0.1,0.3,0.5,0.7,0.9];
const res=await p.evaluate(async(ts)=>{const out=[];for(const a of document.querySelectorAll('article')){const pl=a._p;if(!pl.cv)continue;pl.playing=false;const vals=[];for(const t of ts){pl.t=t;pl.render();const c=pl.cv,g=c.getContext('2d'),d=g.getImageData(0,0,c.width,c.height).data;let s=0,s2=0,n=0,h=0;for(let i=0;i<d.length;i+=4*37){const v=d[i]+d[i+1]*2+d[i+2];s+=v;s2+=v*v;n++;h=(h*31+v)%1000003}const m=s/n;vals.push({sd:Math.sqrt(s2/n-m*m),h})}out.push({id:a.id,kind:'canvas',err:!!pl.err,minsd:Math.min(...vals.map(v=>v.sd)),distinct:new Set(vals.map(v=>v.h)).size,static:pl.static})}return out},ts);
/* SVG principle players: element screenshots, stats computed in-page */
const ids=await p.evaluate(()=>[...document.querySelectorAll('article')].filter(a=>a._p&&a._p.svg).map(a=>a.id));
for(const id of ids){const st=await p.evaluate(id=>{const a=document.getElementById(id);a._p.playing=false;a.scrollIntoView();return {s:a._p.static,err:!!a._p.err}},id);const vals=[];for(const t of (st.s?[0]:ts)){await p.evaluate((id,t)=>{const pl=document.getElementById(id)._p;pl.t=t;pl.render()},id,t);const el=await p.$('#'+id+' svg');const b64=await el.screenshot({encoding:'base64'});vals.push(await p.evaluate(async b64=>{const im=new Image();im.src='data:image/png;base64,'+b64;await im.decode();const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const g=c.getContext('2d');g.drawImage(im,0,0);const d=g.getImageData(0,0,c.width,c.height).data;let s=0,s2=0,n=0,h=0;for(let i=0;i<d.length;i+=4*37){const v=d[i]+d[i+1]*2+d[i+2];s+=v;s2+=v*v;n++;h=(h*31+v)%1000003}const m=s/n;return {sd:Math.sqrt(s2/n-m*m),h}},b64))}
res.push({id,kind:'svg',err:st.err,minsd:Math.min(...vals.map(v=>v.sd)),distinct:new Set(vals.map(v=>v.h)).size,static:st.s})}
const bad=res.filter(r=>r.err||r.minsd<3||(!r.static&&r.distinct<2));
const weak=res.filter(r=>!bad.includes(r)&&(r.minsd<8||(!r.static&&r.distinct<4))).map(r=>r.id+'('+r.kind+',sd'+r.minsd.toFixed(1)+',d'+r.distinct+')');
console.log('checked',res.length,'canvas',res.filter(r=>r.kind==='canvas').length,'svg',res.filter(r=>r.kind==='svg').length,'static',res.filter(r=>r.static).length,'bad',JSON.stringify(bad));console.log('WEAK',JSON.stringify(weak));console.log('ERRORS',JSON.stringify(errs.slice(0,20)));
const reg=await p.evaluate(()=>{const fails=[];const src=Function.prototype.toString.call(DEMOS['TRN-09'].f);
if(!DEMOS['TRN-09'].buf||DEMOS['TRN-09'].hi)fails.push('TRN-09 must be buf, not hi');
if(/c\.scale\(\s*2\s*,\s*2\s*\)/.test(src))fails.push('TRN-09 was wrapped with scale(2,2)');
if(!/maskComp\s*\(\s*c\s*,/.test(src))fails.push('TRN-09 source lost maskComp(c)');
if(!DEMOS['TRN-03'].hi||DEMOS['TRN-03'].buf)fails.push('TRN-03 should stay on the hi path');
if(!DEMOS['TRN-06'].buf||DEMOS['TRN-06'].hi)fails.push('TRN-06 should stay buf');
const ink=c=>c[0]<40&&c[1]<48&&c[2]<60,red=c=>c[0]>180&&c[1]<120&&c[2]<100,dark=c=>c[0]<40&&c[1]<40&&c[2]<40;
const pl=document.getElementById('REN-04')._p;pl.playing=false;pl.t=0;pl.render();
const g=pl.cv.getContext('2d'),s=pl.hi?2*pl.dpr:pl.cv.width/240;
const at=(x,y)=>{const d=g.getImageData(Math.min(pl.cv.width-1,Math.round(x*s)),Math.min(pl.cv.height-1,Math.round(y*s)),1,1).data;return[d[0],d[1],d[2]]};
if(dark(at(80,24)))fails.push('REN-04 shell still paints a black block under the hero '+at(80,24));
let outline=false;for(let x=108;x<=132;x++){const a=at(x,44),b=at(x+1,44);if((ink(a)&&red(b))||(red(a)&&ink(b)))outline=true}
if(!outline)fails.push('REN-04 hull outline missing beside the hero');
const t=document.getElementById('TRN-09')._p;t.playing=false;t.t=.45;t.render();const tg=t.cv.getContext('2d');
const sdAt=(fx,fy)=>{const x=Math.floor(t.cv.width*fx),y=Math.floor(t.cv.height*fy),w=Math.max(1,Math.floor(t.cv.width/6)),h=Math.max(1,Math.floor(t.cv.height/6)),data=tg.getImageData(x,y,w,h).data;let s0=0,s2=0,n=0;for(let i=0;i<data.length;i+=16){const v=data[i]+data[i+1]+data[i+2];s0+=v;s2+=v*v;n++}const m=s0/n;return Math.sqrt(Math.max(0,s2/n-m*m))};
for(const[fx,fy]of[[.08,.18],[.72,.18],[.08,.62],[.72,.62]]){const sd=sdAt(fx,fy);if(sd<8)fails.push('TRN-09 quadrant flat '+fx+','+fy+' sd '+sd.toFixed(1))}
for(const id of['TRN-09','REN-04','TRN-03']){const cv=document.getElementById(id).querySelector('canvas'),r=cv.getBoundingClientRect(),fw=cv.parentElement.getBoundingClientRect().width;if(r.width>fw+1)fails.push(id+' canvas wider than its slot');if(Math.abs(r.width/r.height-16/9)>.03)fails.push(id+' aspect '+ (r.width/r.height).toFixed(3))}
return fails});
if(reg.length){console.error('REGRESS\n'+reg.join('\n'));process.exitCode=1}else console.log('REGRESS OK');
await p.setViewport({width:390,height:700});
const modalFit=await p.evaluate(()=>{document.documentElement.dataset.cols='1';const a=document.getElementById('TRN-09');a.scrollIntoView();a.click();const pl=a._p;pl.fit();pl.render();const r=pl.cv.getBoundingClientRect();const cap=Math.min(window.innerHeight*.56,520);const slot=pl.cv.parentElement.getBoundingClientRect().width;closeModal();return{w:+r.width.toFixed(2),h:+r.height.toFixed(2),ratio:+(r.width/r.height).toFixed(4),cap:+cap.toFixed(2),slot:+slot.toFixed(2),overH:r.height>cap+1.5,overW:r.width>slot+1.5}});
if(modalFit.overH||modalFit.overW||Math.abs(modalFit.ratio-16/9)>.03){console.error('MODAL FIT',JSON.stringify(modalFit));process.exitCode=1}else console.log('MODAL FIT',JSON.stringify(modalFit));
await p.setViewport({width:1280,height:900});
const shots=(process.argv[2]||'').split(',').filter(Boolean);for(const s of shots){const [id,t,lang]=s.split(':');if(lang){await p.evaluate(l=>document.querySelector('[data-lang='+l+']').click(),lang)}const el=await p.$('#'+id);await p.evaluate((id,t)=>{const a=document.getElementById(id);a._p.playing=false;a._p.t=+t;a._p.render();a._p.ui();a.scrollIntoView()},id,t||'0.5');await new Promise(r=>setTimeout(r,150));await el.screenshot({path:'shots/'+id+(lang?'-'+lang:'')+'.png'});}
await b.close()})();
