const q=(t,s)=>{t()||(s(),requestAnimationFrame(()=>q(t,s)))},M=(t,s,p=0)=>{p<t&&(s(p),requestAnimationFrame(()=>M(t,s,p+1)))},v=t=>{t(),requestAnimationFrame(()=>v(t))},S=[{type:"image",name:"iyowa",src:"./assets/iyowa.png"},{type:"image",name:"igusuri_kk",src:"./assets/igusuri_kk.png"},{type:"image",name:"igusuri_ad",src:"./assets/igusuri_ad.png"},{type:"image",name:"igusuri_kn",src:"./assets/igusuri_kn.png"},{type:"image",name:"igusuri_lm",src:"./assets/igusuri_lm.png"},{type:"image",name:"girls_kk",src:"./assets/girls_kk.png"},{type:"image",name:"girls_ad",src:"./assets/girls_ad.png"},{type:"image",name:"girls_kn",src:"./assets/girls_kn.png"},{type:"image",name:"girls_lm",src:"./assets/girls_lm.png"},{type:"image",name:"achieve_box",src:"./assets/wide_iyowa.png"},{type:"font",name:"Zen Kurenaido",src:"https://fonts.googleapis.com/css2?family=Zen+Kurenaido&display=swap"}],T=async()=>{const t={},s={},p={},y=S,e=[];return console.log(y),y.forEach(o=>e.push(new Promise(c=>{switch(o.type){case"image":{const r=new Image;r.src=o.src,r.onload=()=>{t[o.name]=r,c()}}break;case"audio":{const r=new Audio;r.src=o.src,r.onload=()=>{s[o.name]=r,c()}}break;case"font":(async()=>{const n=await(await(await fetch(o.src)).text()).match(/url\(.+?\)/g);if(!n)throw new Error("フォントが見つかりませんでした");const l=[];n.forEach(h=>{l.push((async()=>{const a=new FontFace(o.name,h);await a.load(),p[o.name]=a,await document.fonts.add(a)})())}),Promise.all(l)})().then(c)}}))),await Promise.all(e),console.log(p),{Images:t,Audios:s,Fonts:p}},f=t=>Math.sin(t/360*Math.PI*2),L=t=>Math.cos(t/360*Math.PI*2),R=(t,s,p,y)=>Math.sqrt((p-t)**2+(y-s)**2),A=(t,s,p,y,e,o)=>{const c=(l,h,a,u=0,_=100,d=1,w="center",k=!1)=>{if(k){const g=p[l],m=g.width,b=g.height;switch(s.globalAlpha=d,w){case"center":s.save(),s.translate(h*e.display_quality,-a*e.display_quality+t.height),s.rotate(u*Math.PI/180),s.drawImage(g,-m*_/200*e.display_quality,-b*_/200*e.display_quality,m*_/100*e.display_quality,b*_/100*e.display_quality),s.restore();break;case"start":s.save(),s.translate(h*e.display_quality,-a*e.display_quality+t.height),s.rotate(u*Math.PI/180),s.drawImage(g,0,0,m*_/100*e.display_quality,b*_/100*e.display_quality),s.restore()}}else{const g=(L(o.d)*h-f(o.d)*a+o.x)*o.size/100,m=(f(o.d)*h+L(o.d)*a+o.y)*o.size/100,b=u+o.d;c(l,g,m,b,_*o.size/100,d,w,!0)}};return{stamp:c,drawRect:(l,h,a,u,_,d=0,w="center")=>{switch(s.save(),w){case"center++":s.translate(l*e.display_quality,-h*e.display_quality+t.height),s.rotate(d*Math.PI/180),s.beginPath(),s.rect(-a/2*e.display_quality,-u/2*e.display_quality,a*e.display_quality,u*e.display_quality);break;case"center":s.translate((l-a/2)*e.display_quality,-(h-u/2)*e.display_quality+t.height),s.rotate(d*Math.PI/180),s.beginPath(),s.rect(0,0,a*e.display_quality,-u*e.display_quality);break;case"start":default:s.translate(l*e.display_quality,-h*e.display_quality+t.height),s.rotate(d*Math.PI/180),s.beginPath(),s.rect(0,0,a*e.display_quality,-u*e.display_quality);break}s.fillStyle=_,s.fill(),s.restore()},drawLine:(l,h,a,u,_,d,w=0)=>{switch(s.beginPath(),w){case 0:s.moveTo((l-u*Math.sin(a)/2)*e.display_quality,-(h+u*Math.cos(a)/2)*e.display_quality+t.height),s.lineTo((l+u*Math.sin(a)/2)*e.display_quality,-(h-u*Math.cos(a)/2)*e.display_quality+t.height);break;case 1:s.moveTo(l*e.display_quality,-h*e.display_quality+t.height),s.lineTo((l+u*Math.sin(a))*e.display_quality,-(h-u*Math.cos(a))*e.display_quality+t.height);break}s.strokeStyle=d,s.lineWidth=_*e.display_quality,s.stroke()},drawText:(l,h,a,u,_,d="serif",w="left")=>{const[k,g]=[h*e.display_quality,-a*e.display_quality+t.height];s.font=`${u*e.display_quality}px ${d}`,s.textAlign=w,s.fillStyle=_,s.fillText(l,k,g)}}},x=t=>{class s{constructor(y,e,o=0,c=100,r="",i=!1){this.x=y,this.y=e,this.d=o,this.size=c,this.costume=r,this.visible=i}stamp(){this.visible&&t.stamp(this.costume,this.x,this.y,this.d,this.size)}move(y){this.x+=f(this.d)*y,this.y+=L(this.d)*y}}return s},F=(t,s,p)=>({raw_to_stage:(e,o,c=0)=>{const r=t.getBoundingClientRect(),i=((e-r.left)/p.size*100-p.x)*s.stage_width/s.display_width,n=(s.display_height-((o-r.top)/p.size*100-p.y))*s.stage_height/s.display_height,l=c+p.d;return{x:i,y:n,d:l}}}),E=async t=>{const s=document.getElementById(t.canvas_name);s.height=t.stage_height*t.display_quality,s.width=t.stage_width*t.display_quality;const p=s.getContext("2d"),{Images:y,Audios:e,Fonts:o}=await T(),c={up:!1,down:!1,left:!1,right:!1,z:!1,x:!1,c:!1,d:!1},r={x:0,y:0,clicking:!1,is_in_rect(a,u,_,d,w="center"){switch(w){case"center":return a-_/2<this.x&&this.x<a+_/2&&u-d/2<this.y&&this.y<u+d/2;case"start":default:return a<this.x&&this.x<a+_&&u<this.y&&this.y<u+d}}},i={canvas:{size:100,x:0,y:0,d:0}},n=A(s,p,y,o,t,i.canvas),l=x(n);p.imageSmoothingEnabled=!1;const h=F(s,t,i.canvas);return window.addEventListener("keydown",a=>{switch(a.key){case"ArrowUp":c.up=!0;break;case"ArrowDown":c.down=!0;break;case"ArrowLeft":c.left=!0;break;case"ArrowRight":c.right=!0;break;case"z":case"Z":c.z=!0;break;case"x":case"X":c.x=!0;break;case"c":case"C":c.c=!0;break;case"d":case"D":c.d=!0;break}}),window.addEventListener("keyup",a=>{switch(a.key){case"ArrowUp":c.up=!1;break;case"ArrowDown":c.down=!1;break;case"ArrowLeft":c.left=!1;break;case"ArrowRight":c.right=!1;break;case"z":case"Z":c.z=!1;break;case"x":case"X":c.x=!1;break;case"c":case"C":c.c=!1;break;case"d":case"D":c.d=!1;break}}),s.addEventListener("mousedown",a=>{r.clicking=!0;const u=h.raw_to_stage(a.x,a.y);r.x=u.x,r.y=u.y}),s.addEventListener("mousemove",a=>{const u=h.raw_to_stage(a.x,a.y);r.x=u.x,r.y=u.y}),s.addEventListener("mouseup",a=>{r.clicking=!1;const u=h.raw_to_stage(a.x,a.y);r.x=u.x,r.y=u.y}),{canvas:s,ctx:p,Images:y,Audios:e,Fonts:o,inputKeys:c,inputMouse:r,props:i,cLib:n,Sprite:l,for:M,while:q,loop:v}},$=2,z=800,P=480,j=1e3,I=600,K="canvas",Z={display_quality:$,stage_width:z,stage_height:P,display_width:j,display_height:I,canvas_name:K},C=(t,s)=>{const p={},y=[],e=(r,i,n)=>{if(p[r]===void 0){const l={title:i,explain:n,age:0,life:100};p[r]=l,y.push(l),console.log(`実績"${i}"を解除しました。`)}};return{dict:p,render_queue:y,check:()=>{1<=s.iyowa&&e("test_1","テスト実績1","テスト実績1の説明文"),2<=s.iyowa&&e("test_2","テスト実績2","テスト実績2の説明文"),3<=s.iyowa&&e("test_3","テスト実績3","テスト実績3の説明文"),4<=s.iyowa&&e("test_4","テスト実績4","テスト実績4の説明文"),5<=s.iyowa&&e("test_5","テスト実績5","テスト実績5の説明文"),148<=s.iyowa&&e("iyowa_1","胃が弱いからいよわです","解放条件:148いよわ生産する")},unlock:e,render:()=>{for(let r=0;r<Math.min(3,y.length);r++){const i=y[r];if(i.age+=1,i.life<i.age){y.shift(),r-=1;continue}const n=((l,h)=>l<15?l/15:h-15<l?(h-l)/15:1)(i.age,i.life);t.cLib.stamp("achieve_box",160,90+r*120,0,65,n,"center"),t.cLib.drawText(i.title,160,110+r*120,20,"black","Zen Kurenaido","center"),t.cLib.drawText(`${i.explain}`,25,85+r*120,15,"black","Zen Kurenaido","start")}}}},D=(t,s)=>{class p{constructor(e,o,c,r,i,n,l){this.igusuri={name:e,image:c,price:i,price_real:i,perf:0,perf_real:1,price_ratio:n,perf_ratio:l,level:1},this.girl={name:o,image:r,price:i,perf:0,price_ratio:100,level:0}}buy_igusuri(){t.iyowa-=this.igusuri.price,this.igusuri.perf_real=this.igusuri.perf_real*this.igusuri.perf_ratio,this.igusuri.price_real=this.igusuri.price_real*this.igusuri.price_ratio,this.igusuri.price=Math.floor(this.igusuri.price_real),this.igusuri.perf=Math.floor(this.igusuri.perf_real)-1,this.igusuri.level+=1}buy_girl(){t.iyowa-=this.girl.price,this.girl.perf+=.1,this.girl.price=this.girl.price*this.girl.price_ratio,this.girl.level+=1}}return p},G=async()=>{const t=await E(Z);let s=0;class p extends t.Sprite{constructor(n,l,h,a,u,_,d){super(n,l,h,20,"iyowa",!0),this.jump_x=a,this.jump_y=u,this.jump_d=_,this.age=0,this.life=d}proc(){this.x+=this.jump_x,this.y+=this.jump_y,this.d+=this.jump_d,this.jump_y-=.5,this.age+=1}}const y=new t.Sprite(160,240,0,100,"iyowa",!0),e={iyowa:0,iyowa_real:0,ipc:1,ips:0,shop_tab:"igusuri",opus:[]},o=D(e),c=C(t,e);e.opus=[new o("きゅうくらりん","くらり","igusuri_kk","girls_kk",10,1.3,1.25),new o("あだぽしゃ","アダ","igusuri_ad","girls_ad",10,1.3,1.25),new o("1000年生きてる","1000年ちゃん","igusuri_lm","girls_lm",10,1.3,1.25),new o("くろうばあないと","みどり","igusuri_kn","girls_kn",10,1.3,1.25)];const r={};window.addEventListener("mousedown",i=>{if(R(y.x,y.y,t.inputMouse.x,t.inputMouse.y)<70)r[s]=new p(t.inputMouse.x,t.inputMouse.y,0,Math.random()*9-3,Math.random()*7+6,Math.random()*10,100),y.size+=30,e.iyowa_real+=e.ipc;else if(t.inputMouse.clicking)if(t.inputMouse.is_in_rect(400,345,160,30,"center"))e.shop_tab="igusuri";else if(t.inputMouse.is_in_rect(560,345,160,30,"center"))e.shop_tab="girls";else if(t.inputMouse.is_in_rect(720,345,160,30,"center"))e.shop_tab="gacha";else switch(e.shop_tab){case"igusuri":{e.ipc=1,e.ips=0;for(let n=0;n<e.opus.length;n++){const l=e.opus[n],h=l.igusuri;t.inputMouse.is_in_rect(480,290-n*60,300,60,"center")&&h.price<=e.iyowa&&l.buy_igusuri(),e.ipc+=h.perf,e.ips+=l.girl.perf*h.perf}}break;case"girls":{e.ips=0;for(let n=0;n<e.opus.length;n++){const l=e.opus[n],h=l.girl;t.inputMouse.is_in_rect(480,290-n*60,300,60,"center")&&h.price<=e.iyowa&&l.buy_girl(),e.ips+=h.perf*l.igusuri.perf}}break}}),t.loop(()=>{s++,y.d=f(s*2)*5,y.size=Math.max(75,40+y.size*.6),c.check(),e.iyowa_real+=e.ips/60,e.iyowa=Math.floor(e.iyowa_real),t.inputKeys.d&&(e.ipc+=100),t.ctx.clearRect(0,0,t.canvas.width,t.canvas.height),y.stamp();for(const i in r){const n=r[i];n.age<n.life?(n.proc(),n.stamp()):delete r[i]}switch(t.cLib.drawText(`${e.iyowa.toLocaleString()} iyowa`,160,430,30,"white","serif","center"),t.cLib.drawText(`${e.ipc.toLocaleString()} ipc`,160,405,20,"white","serif","center"),t.cLib.drawText(`${e.ips.toLocaleString()} ips`,160,380,20,"white","serif","center"),t.cLib.drawRect(320,0,480,480,"#b88e98",0,"start"),t.cLib.drawRect(400,345,160,30,e.shop_tab=="igusuri"?"#eee":"#fff",0,"center++"),t.cLib.drawRect(560,345,160,30,e.shop_tab=="girls"?"#eee":"#fff",0,"center++"),t.cLib.drawRect(720,345,160,30,e.shop_tab=="gacha"?"#eee":"#fff",0,"center++"),t.cLib.drawText("Shop",560,400,50,"white","serif","center"),t.cLib.drawText("igusuri",400,340,20,"black","serif","center"),t.cLib.drawText("girls",560,340,20,"black","serif","center"),t.cLib.drawText("gacha",720,340,20,"black","serif","center"),e.shop_tab){case"igusuri":{t.cLib.drawRect(320,0,480,330,"#a87e88",0,"start");for(let i=0;i<e.opus.length;i++){const n=e.opus[i].igusuri;t.inputMouse.is_in_rect(560,290-i*60,440,60,"center")?t.cLib.drawRect(560,290-i*60,460,60,"#c89ea8",0,"center++"):t.cLib.drawRect(560,290-i*60,460,60,"#b88e98",0,"center++"),t.cLib.stamp(n.image,360,290-i*60,0,200),t.cLib.drawText(n.name,400,295-i*60,20,"white","Zen Kurenaido","start"),t.cLib.drawText(`Lv: ${n.level.toLocaleString()} | price: ${n.price.toLocaleString()} iyowa`,400,270-i*60,15,"white","Serif","start")}}break;case"girls":{t.cLib.drawRect(320,0,480,330,"#a87e88",0,"start");for(let i=0;i<e.opus.length;i++){const n=e.opus[i].girl;t.inputMouse.is_in_rect(560,290-i*60,440,60,"center")?t.cLib.drawRect(560,290-i*60,460,60,"#c89ea8",0,"center++"):t.cLib.drawRect(560,290-i*60,460,60,"#b88e98",0,"center++"),t.cLib.stamp(n.image,360,290-i*60,0,200),t.cLib.drawText(n.name,400,295-i*60,20,"white","Zen Kurenaido","start"),t.cLib.drawText(`Lv: ${n.level.toLocaleString()} | price: ${n.price.toLocaleString()} iyowa`,400,270-i*60,15,"white","Serif","start")}}break}c.render()})};window.onload=G;