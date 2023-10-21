const z=h=>{const t=(s,e)=>{s()||(e(),h.tick(),requestAnimationFrame(()=>t(s,e)))},u=(s,e,i=0)=>{i<s&&(e(i),h.tick(),requestAnimationFrame(()=>u(s,e,i+1)))},c=s=>{s(),h.tick(),requestAnimationFrame(()=>c(s))};return{frameWhile:t,frameFor:u,frameLoop:c}},F=[{type:"image",name:"soul",src:"./assets/images/soul.png"},{type:"image",name:"soul_blue",src:"./assets/images/soul_blue.png"},{type:"image",name:"commands",src:"./assets/images/commands.png"},{type:"image",name:"back",src:"./assets/images/back.png"},{type:"image",name:"sans",src:"./assets/images/sans.png"},{type:"image",name:"hp_kr_purple",src:"./assets/images/hp_kr_purple.png"},{type:"image",name:"determination_white",src:"./assets/images/font/determination_white.png"},{type:"image",name:"determination_red",src:"./assets/images/font/determination_red.png"},{type:"image",name:"determination_orange",src:"./assets/images/font/determination_orange.png"},{type:"image",name:"determination_blue",src:"./assets/images/font/determination_blue.png"},{type:"image",name:"determination_yellow",src:"./assets/images/font/determination_yellow.png"},{type:"image",name:"status_white",src:"./assets/images/font/status_white.png"},{type:"image",name:"status_red",src:"./assets/images/font/status_red.png"},{type:"image",name:"status_orange",src:"./assets/images/font/status_orange.png"},{type:"image",name:"status_blue",src:"./assets/images/font/status_blue.png"},{type:"image",name:"status_yellow",src:"./assets/images/font/status_yellow.png"},{type:"image",name:"status_purple",src:"./assets/images/font/status_purple.png"},{type:"image",name:"hp_kr_white",src:"./assets/images/hp_kr_white.png"},{type:"image",name:"hp_kr_red",src:"./assets/images/hp_kr_red.png"},{type:"image",name:"hp_kr_purple",src:"./assets/images/hp_kr_purple.png"},{type:"image",name:"bone_head_white",src:"./assets/images/bone_head_white.png"},{type:"image",name:"bananahexagon",src:"./assets/images/normal_icon.png"},{type:"audio",name:"damage",src:"./assets/audios/damage.mp3"}],P=async()=>{const h={},t={},u={},c=F,s=[];return console.log(c),c.forEach(e=>s.push(new Promise(i=>{switch(e.type){case"image":{const a=new Image;a.src=e.src,a.onload=()=>{h[e.name]=a,i()}}break;case"audio":{const a=new Audio(e.src);a.autoplay=!1,console.log(a),a.addEventListener("loadeddata",()=>{t[e.name]=[a,0],i()})}break;case"font":(async()=>{const g=await(await(await fetch(e.src)).text()).match(/url\(.+?\)/g);if(!g)throw new Error("フォントが見つかりませんでした");const d=[];g.forEach(o=>{d.push((async()=>{const l=new FontFace(e.name,o);await l.load(),u[e.name]=l,await document.fonts.add(l)})())}),Promise.all(d)})().then(i);break}}))),await Promise.all(s),{Images:h,Audios:t,Fonts:u}},y=h=>Math.sin(h/360*Math.PI*2),m=h=>Math.cos(h/360*Math.PI*2),E=(h,t,u,c,s,e)=>{const i=(d,o,l,r=0,_=100,w=1,n="center",f,$=!1)=>{if($){const b=u[d],[x,M,q,v]=f===void 0?[0,0,b.width,b.height]:[f.left,f.top,f.width,f.height];switch(t.globalAlpha=w,n){case"center":t.save(),t.translate(o*s.display_quality,-l*s.display_quality+h.height),t.rotate(r*Math.PI/180),t.drawImage(b,x,M,q,v,-q*_/200*s.display_quality,-v*_/200*s.display_quality,q*_/100*s.display_quality,v*_/100*s.display_quality),t.restore();break;case"start":t.save(),t.translate(o*s.display_quality,-l*s.display_quality+h.height),t.rotate(r*Math.PI/180),t.drawImage(b,x,M,q,v,0,0,q*_/100*s.display_quality,v*_/100*s.display_quality),t.restore()}}else{const b=(m(e.d)*o-y(e.d)*l+e.x)*e.size/100,x=(y(e.d)*o+m(e.d)*l+e.y)*e.size/100,M=r+e.d;i(d,b,x,M,_*e.size/100,w,n,f,!0)}};return{stamp:i,drawRect:(d,o,l,r,_,w=0,n="center")=>{switch(t.save(),n){case"center++":t.translate(d*s.display_quality,-o*s.display_quality+h.height),t.rotate(w*Math.PI/180),t.beginPath(),t.rect(-l/2*s.display_quality,-r/2*s.display_quality,l*s.display_quality,r*s.display_quality);break;case"center":t.translate((d-l/2)*s.display_quality,-(o-r/2)*s.display_quality+h.height),t.rotate(w*Math.PI/180),t.beginPath(),t.rect(0,0,l*s.display_quality,-r*s.display_quality);break;case"start":default:t.translate(d*s.display_quality,-o*s.display_quality+h.height),t.rotate(w*Math.PI/180),t.beginPath(),t.rect(0,0,l*s.display_quality,-r*s.display_quality);break}t.fillStyle=_,t.fill(),t.restore()},drawLine:(d,o,l,r,_,w,n=0)=>{switch(t.beginPath(),n){case 0:t.moveTo((d-r*Math.sin(l)/2)*s.display_quality,-(o+r*Math.cos(l)/2)*s.display_quality+h.height),t.lineTo((d+r*Math.sin(l)/2)*s.display_quality,-(o-r*Math.cos(l)/2)*s.display_quality+h.height);break;case 1:t.moveTo(d*s.display_quality,-o*s.display_quality+h.height),t.lineTo((d+r*Math.sin(l))*s.display_quality,-(o-r*Math.cos(l))*s.display_quality+h.height);break}t.strokeStyle=w,t.lineWidth=_*s.display_quality,t.stroke()},drawText:(d,o,l,r,_,w="serif",n="left")=>{const[f,$]=[o*s.display_quality,-l*s.display_quality+h.height];t.font=`${r*s.display_quality}px ${w}`,t.textAlign=n,t.fillStyle=_,t.fillText(d,f,$)}}},L=h=>{class t{constructor(c,s,e=0,i=100,a="",p=!1){this.x=c,this.y=s,this.d=e,this.size=i,this.costume=a,this.visible=p}stamp(){this.visible&&h.stamp(this.costume,this.x,this.y,this.d,this.size)}move(c){this.x+=y(this.d)*c,this.y+=m(this.d)*c}}return t},I=(h,t,u)=>({raw_to_stage:(s,e,i=0)=>{const a=h.getBoundingClientRect(),p=((s-a.left)/u.size*100-u.x)*t.stage_width/t.display_width,g=(t.display_height-((e-a.top)/u.size*100-u.y))*t.stage_height/t.display_height,d=i+u.d;return{x:p,y:g,d}}}),A=h=>({play:(s,e,i=0)=>{h[s][1]==0&&(h[s][0].play(),e!==void 0&&(h[s][0].currentTime=e),h[s][1]=i)},get:s=>h[s][0],tick:()=>{for(const s in h){const e=h[s];0<e[1]&&(e[1]-=1)}}}),D=async h=>{const t=document.getElementById(h.canvas_name);t.height=h.stage_height*h.display_quality,t.width=h.stage_width*h.display_quality;const u=t.getContext("2d"),{Images:c,Audios:s,Fonts:e}=await P(),i={up:!1,down:!1,left:!1,right:!1,z:!1,x:!1,c:!1,d:!1},a={x:0,y:0,clicking:!1,is_in_rect(n,f,$,b,x="center"){switch(x){case"center":return n-$/2<this.x&&this.x<n+$/2&&f-b/2<this.y&&this.y<f+b/2;case"start":default:return n<this.x&&this.x<n+$&&f<this.y&&this.y<f+b}}},p={canvas:{size:100,x:0,y:0,d:0}},g=E(t,u,c,e,h,p.canvas),d=A(s),o=L(g);u.imageSmoothingEnabled=!1;const l=I(t,h,p.canvas);window.addEventListener("keydown",n=>{switch(n.key){case"ArrowUp":i.up=!0;break;case"ArrowDown":i.down=!0;break;case"ArrowLeft":i.left=!0;break;case"ArrowRight":i.right=!0;break;case"z":case"Z":i.z=!0;break;case"x":case"X":i.x=!0;break;case"c":case"C":i.c=!0;break;case"d":case"D":i.d=!0;break}}),window.addEventListener("keyup",n=>{switch(n.key){case"ArrowUp":i.up=!1;break;case"ArrowDown":i.down=!1;break;case"ArrowLeft":i.left=!1;break;case"ArrowRight":i.right=!1;break;case"z":case"Z":i.z=!1;break;case"x":case"X":i.x=!1;break;case"c":case"C":i.c=!1;break;case"d":case"D":i.d=!1;break}}),t.addEventListener("mousedown",n=>{a.clicking=!0;const f=l.raw_to_stage(n.x,n.y);a.x=f.x,a.y=f.y}),t.addEventListener("mousemove",n=>{const f=l.raw_to_stage(n.x,n.y);a.x=f.x,a.y=f.y}),t.addEventListener("mouseup",n=>{a.clicking=!1;const f=l.raw_to_stage(n.x,n.y);a.x=f.x,a.y=f.y});const{frameWhile:r,frameFor:_,frameLoop:w}=z(d);return{canvas:t,ctx:u,Images:c,Audios:s,Fonts:e,inputKeys:i,inputMouse:a,props:p,cLib:g,aLib:d,Sprite:o,for:_,while:r,loop:w}},R=2,S=640,G=480,B=800,T=400,j="canvas",C={display_quality:R,stage_width:S,stage_height:G,display_width:B,display_height:T,canvas_name:j},W=(h,t)=>{let u={};const c=class k extends t{constructor(a,p,g,d,o,l,r,_,w,n){super(a,p,g,d,void 0,!0),this.start_x=a,this.start_y=p,this.start_d=g,this.move_x=l,this.move_y=r,this.move_d=_,this.start_len=o,this.move_len=w,this.len=o,this.age=0,this.id=k.current_id,this.width=d,u[this.id]=this,k.current_id++}move_self(){this.age++,this.x=this.start_x+k.get_move(this.move_x,this.age),this.y=this.start_y+k.get_move(this.move_y,this.age),this.d=this.start_d+k.get_move(this.move_d,this.age),this.len=this.start_len+k.get_move(this.move_len,this.age)}draw(){m(this.d),h.stamp("bone_head_white",this.x+m(this.d)*this.width*8/6,this.y-y(this.d)*this.width*8/6,this.d+180,this.width*100/6,1,"start"),h.drawRect(this.x+y(this.d)*this.width*6/6,this.y+m(this.d)*this.width*6/6,this.width,this.len+this.width*2/6,"white",this.d,"start"),h.stamp("bone_head_white",this.x+y(this.d)*(this.len+this.width*14/6)-m(this.d)*this.width*2/6,this.y+m(this.d)*(this.len+this.width*14/6)+y(this.d)*this.width*2/6,this.d,this.width*100/6,1,"start")}static process(){for(const a in u){const p=u[a];p.move_self(),p.draw()}}static get_move(a,p){if(typeof a=="number")return a*p;switch(a.type){case"sin":case"cos":return y(a.cycle*p)*a.amp;case"custom":return a.fn(p)}}};c.current_id=0;let s=c;return{boneDict:u,normal:s,process:()=>{s.process()}}},K={height_basic:15,width_basic:2,name:"determination"},U={left:10,up:34,width:6,height:9,gap:0},X={left:20,up:34,width:6,height:9,gap:0},Z={left:30,up:34,width:6,height:9,gap:0},H={left:40,up:34,width:6,height:9,gap:0},J={left:50,up:34,width:6,height:9,gap:0},N={left:60,up:34,width:6,height:9,gap:0},O={left:70,up:34,width:6,height:9,gap:0},Q={left:80,up:34,width:6,height:9,gap:0},V={left:90,up:34,width:6,height:9,gap:0},Y={left:100,up:34,width:6,height:9,gap:0},tt={left:110,up:34,width:6,height:9,gap:0},et={left:120,up:34,width:6,height:9,gap:0},st={left:130,up:34,width:7,height:9,gap:0},it={left:140,up:34,width:6,height:9,gap:0},ht={left:150,up:34,width:6,height:9,gap:0},at={left:0,up:50,width:6,height:9,gap:0},nt={left:10,up:50,width:6,height:9,gap:0},pt={left:20,up:50,width:6,height:9,gap:0},lt={left:30,up:50,width:6,height:9,gap:0},gt={left:40,up:50,width:6,height:9,gap:0},dt={left:50,up:50,width:6,height:9,gap:0},ot={left:60,up:50,width:6,height:9,gap:0},rt={left:70,up:50,width:7,height:9,gap:0},ct={left:80,up:50,width:6,height:9,gap:0},ut={left:90,up:50,width:6,height:9,gap:0},wt={left:100,up:50,width:6,height:9,gap:0},ft={left:10,up:68,width:6,height:7,gap:2},_t={left:20,up:66,width:6,height:9,gap:0},yt={left:30,up:68,width:6,height:7,gap:2},mt={left:40,up:66,width:6,height:9,gap:0},bt={left:50,up:68,width:6,height:7,gap:2},$t={left:60,up:66,width:6,height:9,gap:0},xt={left:70,up:68,width:6,height:10,gap:5},kt={left:80,up:66,width:6,height:9,gap:0},qt={left:90,up:65,width:6,height:10,gap:-1},vt={left:100,up:65,width:6,height:13,gap:2},Mt={left:110,up:66,width:6,height:9,gap:0},zt={left:120,up:66,width:6,height:9,gap:0},Ft={left:130,up:68,width:7,height:7,gap:2},Pt={left:140,up:68,width:6,height:7,gap:2},Et={left:150,up:68,width:6,height:7,gap:2},Lt={left:0,up:84,width:6,height:10,gap:5},It={left:10,up:84,width:6,height:10,gap:5},At={left:20,up:84,width:6,height:7,gap:2},Dt={left:30,up:84,width:6,height:7,gap:2},Rt={left:40,up:82,width:6,height:9,gap:0},St={left:50,up:84,width:6,height:7,gap:2},Gt={left:60,up:84,width:6,height:7,gap:2},Bt={left:70,up:84,width:7,height:7,gap:2},Tt={left:80,up:84,width:6,height:7,gap:2},jt={left:90,up:84,width:6,height:10,gap:5},Ct={left:100,up:84,width:6,height:7,gap:2},Wt={left:0,up:0,width:1,height:1,gap:0},Kt={left:150,up:82,width:6,height:9,gap:0},Ut={left:40,up:0,width:6,height:13,gap:0},Xt={left:150,up:61,width:4,height:1,gap:14},Zt={0:{left:0,up:18,width:6,height:9,gap:0},1:{left:10,up:18,width:6,height:9,gap:0},2:{left:20,up:18,width:6,height:9,gap:0},3:{left:30,up:18,width:6,height:9,gap:0},4:{left:40,up:18,width:6,height:9,gap:0},5:{left:50,up:18,width:6,height:9,gap:0},6:{left:60,up:18,width:6,height:9,gap:0},7:{left:70,up:18,width:6,height:9,gap:0},8:{left:80,up:18,width:6,height:9,gap:0},9:{left:90,up:18,width:6,height:9,gap:0},props:K,A:U,B:X,C:Z,D:H,E:J,F:N,G:O,H:Q,I:V,J:Y,K:tt,L:et,M:st,N:it,O:ht,P:at,Q:nt,R:pt,S:lt,T:gt,U:dt,V:ot,W:rt,X:ct,Y:ut,Z:wt,a:ft,b:_t,c:yt,d:mt,e:bt,f:$t,g:xt,h:kt,i:qt,j:vt,k:Mt,l:zt,m:Ft,n:Pt,o:Et,p:Lt,q:It,r:At,s:Dt,t:Rt,u:St,v:Gt,w:Bt,x:Tt,y:jt,z:Ct,space:Wt,irregular:Kt,"!":{left:10,up:1,width:4,height:10,gap:-1},'"':{left:20,up:2,width:5,height:4,gap:-5},"#":{left:30,up:2,width:7,height:9,gap:0},$:Ut,"%":{left:50,up:2,width:7,height:9,gap:0},"&":{left:60,up:2,width:7,height:9,gap:0},"'":{left:70,up:2,width:2,height:4,gap:-5},"(":{left:80,up:2,width:4,height:9,gap:0},")":{left:90,up:2,width:4,height:9,gap:0},"*":{left:100,up:4,width:8,height:5,gap:0},"+":{left:110,up:4,width:6,height:5,gap:0},",":{left:120,up:9,width:2,height:4,gap:7},"-":{left:130,up:6,width:5,height:1,gap:0},".":{left:140,up:9,width:2,height:2,gap:7},"/":{left:150,up:2,width:6,height:10,gap:1},":":{left:100,up:20,width:2,height:7,gap:2},";":{left:110,up:20,width:2,height:9,gap:4},"<":{left:120,up:18,width:5,height:9,gap:0},"=":{left:130,up:21,width:5,height:3,gap:0},">":{left:140,up:18,width:5,height:9,gap:0},"?":{left:150,up:18,width:6,height:9,gap:0},"@":{left:0,up:34,width:6,height:9,gap:0},"[":{left:110,up:50,width:4,height:9,gap:0},"\\":{left:120,up:50,width:6,height:10,gap:1},"]":{left:130,up:50,width:4,height:9,gap:0},"^":{left:140,up:49,width:6,height:4,gap:-5},_:Xt,"`":{left:10,up:68,width:3,height:2,gap:2},"{":{left:110,up:82,width:5,height:9,gap:0},"|":{left:120,up:82,width:2,height:9,gap:0},"}":{left:130,up:82,width:5,height:9,gap:0},"~":{left:140,up:85,width:7,height:2,gap:-1}},Ht={height_basic:6,width_basic:1,name:"status"},Jt={left:6,up:14,width:4,height:5,gap:0},Nt={left:12,up:14,width:4,height:5,gap:0},Ot={left:18,up:14,width:4,height:5,gap:0},Qt={left:24,up:14,width:4,height:5,gap:0},Vt={left:30,up:14,width:4,height:5,gap:0},Yt={left:36,up:14,width:4,height:5,gap:0},te={left:42,up:14,width:4,height:5,gap:0},ee={left:48,up:14,width:4,height:5,gap:0},se={left:54,up:14,width:4,height:5,gap:0},ie={left:60,up:14,width:4,height:5,gap:0},he={left:66,up:14,width:4,height:5,gap:0},ae={left:72,up:14,width:4,height:5,gap:0},ne={left:78,up:14,width:5,height:5,gap:0},pe={left:84,up:14,width:4,height:5,gap:0},le={left:90,up:14,width:4,height:5,gap:0},ge={left:0,up:21,width:4,height:5,gap:0},de={left:6,up:21,width:4,height:5,gap:0},oe={left:12,up:21,width:4,height:5,gap:0},re={left:18,up:21,width:4,height:5,gap:0},ce={left:24,up:21,width:4,height:5,gap:0},ue={left:30,up:21,width:4,height:5,gap:0},we={left:36,up:21,width:4,height:5,gap:0},fe={left:42,up:21,width:5,height:5,gap:0},_e={left:48,up:21,width:4,height:5,gap:0},ye={left:54,up:21,width:4,height:5,gap:0},me={left:60,up:21,width:4,height:5,gap:0},be={left:6,up:28,width:4,height:5,gap:0},$e={left:12,up:28,width:4,height:5,gap:0},xe={left:18,up:28,width:4,height:5,gap:0},ke={left:24,up:28,width:4,height:5,gap:0},qe={left:30,up:28,width:4,height:5,gap:0},ve={left:36,up:28,width:4,height:5,gap:0},Me={left:42,up:28,width:4,height:5,gap:0},ze={left:48,up:28,width:4,height:5,gap:0},Fe={left:54,up:28,width:4,height:5,gap:0},Pe={left:60,up:28,width:4,height:5,gap:0},Ee={left:66,up:28,width:4,height:5,gap:0},Le={left:72,up:28,width:4,height:5,gap:0},Ie={left:78,up:28,width:5,height:5,gap:0},Ae={left:84,up:28,width:4,height:5,gap:0},De={left:90,up:28,width:4,height:5,gap:0},Re={left:0,up:35,width:4,height:5,gap:0},Se={left:6,up:35,width:4,height:5,gap:0},Ge={left:12,up:35,width:4,height:5,gap:0},Be={left:18,up:35,width:4,height:5,gap:0},Te={left:24,up:35,width:4,height:5,gap:0},je={left:30,up:35,width:4,height:5,gap:0},Ce={left:36,up:35,width:4,height:5,gap:0},We={left:42,up:35,width:5,height:5,gap:0},Ke={left:48,up:35,width:4,height:5,gap:0},Ue={left:54,up:35,width:4,height:5,gap:0},Xe={left:60,up:35,width:4,height:5,gap:0},Ze={left:0,up:0,width:4,height:1,gap:0},He={left:90,up:35,width:4,height:5,gap:0},Je={left:24,up:0,width:5,height:5,gap:0},Ne={left:90,up:25,width:4,height:1,gap:4},Oe={0:{left:0,up:7,width:4,height:5,gap:0},1:{left:6,up:7,width:4,height:5,gap:0},2:{left:12,up:7,width:4,height:5,gap:0},3:{left:18,up:7,width:4,height:5,gap:0},4:{left:24,up:7,width:4,height:5,gap:0},5:{left:30,up:7,width:4,height:5,gap:0},6:{left:36,up:7,width:4,height:5,gap:0},7:{left:42,up:7,width:4,height:5,gap:0},8:{left:48,up:7,width:4,height:5,gap:0},9:{left:54,up:7,width:4,height:5,gap:0},props:Ht,A:Jt,B:Nt,C:Ot,D:Qt,E:Vt,F:Yt,G:te,H:ee,I:se,J:ie,K:he,L:ae,M:ne,N:pe,O:le,P:ge,Q:de,R:oe,S:re,T:ce,U:ue,V:we,W:fe,X:_e,Y:ye,Z:me,a:be,b:$e,c:xe,d:ke,e:qe,f:ve,g:Me,h:ze,i:Fe,j:Pe,k:Ee,l:Le,m:Ie,n:Ae,o:De,p:Re,q:Se,r:Ge,s:Be,t:Te,u:je,v:Ce,w:We,x:Ke,y:Ue,z:Xe,space:Ze,irregular:He,"!":{left:6,up:0,width:4,height:5,gap:0},'"':{left:12,up:0,width:3,height:2,gap:0},"#":{left:18,up:0,width:5,height:5,gap:0},$:Je,"%":{left:30,up:1,width:4,height:4,gap:1},"&":{left:36,up:0,width:5,height:5,gap:0},"'":{left:42,up:0,width:1,height:2,gap:-3},"(":{left:48,up:0,width:3,height:5,gap:0},")":{left:54,up:0,width:3,height:5,gap:0},"*":{left:60,up:0,width:5,height:5,gap:0},"+":{left:66,up:0,width:5,height:5,gap:0},",":{left:72,up:3,width:1,height:2,gap:3},"-":{left:78,up:2,width:5,height:1,gap:0},".":{left:84,up:4,width:1,height:1,gap:4},"/":{left:90,up:1,width:4,height:4,gap:1},":":{left:60,up:8,width:1,height:3,gap:0},";":{left:66,up:8,width:1,height:4,gap:1},"<":{left:72,up:7,width:3,height:5,gap:0},"=":{left:78,up:8,width:5,height:3,gap:0},">":{left:84,up:7,width:3,height:5,gap:0},"?":{left:90,up:7,width:4,height:5,gap:0},"@":{left:0,up:14,width:4,height:5,gap:0},"[":{left:66,up:21,width:4,height:5,gap:0},"\\":{left:72,up:22,width:4,height:4,gap:1},"]":{left:78,up:21,width:4,height:5,gap:0},"^":{left:84,up:21,width:5,height:3,gap:-1},_:Ne,"`":{left:0,up:27,width:1,height:2,gap:-5},"{":{left:66,up:35,width:3,height:5,gap:0},"|":{left:72,up:35,width:1,height:5,gap:0},"}":{left:78,up:35,width:3,height:5,gap:0},"~":{left:84,up:35,width:4,height:2,gap:-3}},Qe=(h,t)=>{const u={en:Zt,status:Oe};let c={};class s{constructor(g){this.name=g}delete(){delete c[this.name]}}class e extends s{constructor(g,d,o,l,r,_,w){super(g),this._={all_str:w.reduce((n,f)=>n+f.str,""),now:[{str:"",color:w[0].color,spacing_x:w[0].spacing_x,spacing_y:w[0].spacing_y}],len_allow:0,count:0,current_char:0,current_char_true:0},this.x=d,this.y=o,this.direction=l,this.size=r,this.data=w,this.font=(n=>{switch(n){case"status":return u.status;default:return u.en}})(_),c[g]=this,this.process()}write(){const g=this.size,d=this.direction*Math.PI/180,o=this._.now.reduce((n,f)=>n+f.str.length,0);let l=0,r=0,_=0;const w=n=>n in this.font?this.font[n]:this.font.space;return this._.now.forEach(n=>{n.str.split("").forEach($=>{const b=w($);$==`
`?(l=0,r+=this.font.props.height_basic+n.spacing_y):(h.stamp(this.font.props.name+"_"+n.color,this.x+(Math.cos(d)*l-Math.sin(d)*(r+b.gap/2))*g/100,this.y+(Math.sin(d)*l+Math.cos(d)*(r+b.gap/2))*g/100,this.direction,g,1,"start",{left:b.left,top:b.up,width:b.width,height:b.height}),_+1<o&&(l+=b.width+this.font.props.width_basic+n.spacing_x)),_++})}),this}process(){const g=this.data.reduce((d,o)=>d+o.str.length,0);if(this._.len_allow==g&&t.z){delete c[this.name];return}else t.x?(this._.len_allow=g,this._.current_char=g):this._.len_allow<g&&(this._.len_allow+=1/this.data[this._.count].speed,this._.current_char+=1/this.data[this._.count].speed);for(;this._.current_char_true<Math.min(this._.len_allow,g);)for(this._.now[this._.count].str+=this.data[this._.count].str[this._.now[this._.count].str.length],this._.current_char_true++;this.data[this._.count].str.length<=this._.now[this._.count].str.length&&this._.count+1<this.data.length;)this._.count++,this._.now.push({str:"",color:this.data[this._.count].color===void 0?"white":this.data[this._.count].color,spacing_x:this.data[this._.count].spacing_x,spacing_y:this.data[this._.count].spacing_y}),this._.current_char-=this.data[this._.count].str.length}}class i extends s{constructor(g,d,o,l,r,_,w,n,f,$,b){super(g),this.str_now="",this.len_now=0,this.str=d,this.x=o,this.y=l,this.direction=r,this.size=_,this.color=w,this.spacing_x=n,this.spacing_y=f,this.speed=$,this.font=(x=>{switch(x){case"status":return u.status;default:return u.en}})(b),this.len_allow=0,c[g]=this,this.process()}write(){const g=this.str_now,d=this.size,o=this.direction*Math.PI/180;let l,r;[l,r]=[0,0];const _=w=>w in this.font?this.font[w]:this.font.space;for(let w=0;w<g.length;w++){const n=_(g[w]);g[w]==`
`?(l=0,r+=this.font.props.height_basic+this.spacing_y):(h.stamp(this.font.props.name+"_"+(this.color?this.color:"white"),this.x+(Math.cos(o)*l-Math.sin(o)*(r-n.gap))*d/100,this.y+(Math.sin(o)*l+Math.cos(o)*(r-n.gap))*d/100,this.direction,d,1,"start",{left:n.left,top:n.up,width:n.width,height:n.height}),w+1<g.length&&(l+=n.width+this.font.props.width_basic+this.spacing_x))}return this}process(){if(this.len_allow==this.str.length&&t.z){delete c[this.name];return}else t.x?this.len_allow=this.str.length:this.len_allow<this.str.length&&(this.len_allow+=1/this.speed);for(;this.str_now.length<Math.min(this.len_allow,this.str.length);)this.str_now+=this.str[this.str_now.length]}}return{Super:e,Plane:i,process:()=>{for(const p in c)c[p].process()},dict:c}},Ve=(h,t)=>{class u{constructor(i,a,p,g,d,o,l=4){this.dx=i,this.dy=a,this.dd=p,this.len=g,this.align=d,this.width=l,this.soul_size=6,this.relative=o||(()=>{const r=this.dd,_=t.x-this.dx;return(t.y-this.dy)*m(r)+_*y(r)>0?"plus":"minus"})()}judge(){const i=this.dd,a=t.x-this.dx,p=t.y-this.dy,g=a*m(i)+p*-y(i),d=p*m(i)+a*y(i);if(this.len/2>g&&g>-this.len/2){if(this.relative=="minus"&&d>-(this.width/2+this.soul_size)||this.relative=="plus"&&this.width/2+this.soul_size>d){const o=g*m(-i)+(this.width/2+this.soul_size)*(this.relative=="minus"?1:-1)*y(-i),l=(this.width/2+this.soul_size)*(this.relative=="minus"?1:-1)*-m(-i)+g*y(-i);t.x=o+this.dx,t.y=l+this.dy}}else d>0?this.relative="plus":this.relative="minus"}draw(){h.drawRect(this.dx,this.dy,this.len,this.width,"white",this.dd,"center++")}}class c{constructor(i,a,p,g=4){this.dx=i,this.dy=a,this.dd=p,this.width=g}judge(){const i=this.dd,a=t.x-this.dx,p=t.y-this.dy,g=a*m(i)+p*-y(i);if(p*m(i)+a*y(i)>-this.width){const o=g*m(-i)+this.width*y(-i),l=this.width*-m(-i)+g*y(-i);t.x=o+this.dx,t.y=l+this.dy}}draw(){const i=this.dx+320*y(this.dd),a=this.dy+320*m(this.dd);h.drawRect(i,a,640,640,"#ffffff88",this.dd,"center++")}}const s={center_x:320,center_y:240,dire:0,width:100,height:100,thickness:6,walls:[],draw(){this.walls.forEach(e=>{const i=e.dx+640*y(e.dd),a=e.dy+640*m(e.dd);h.drawRect(i,a,1280,1280,"#ffffff",e.dd,"center++")}),this.walls.forEach(e=>{const i=e.dx+640*y(e.dd),a=e.dy+640*m(e.dd);h.drawRect(i,a,1280-e.width*2,1280-e.width*2,"#000000",e.dd,"center++")})},judge(){this.walls.forEach(e=>{e.judge()})},update(){{const e=this.dire,i=this.center_x,a=this.center_y,p=this.walls[0];p.dd=e,p.dx=i+this.height/2*y(e),p.dy=a+this.height/2*m(e)}{const e=this.dire+90,i=this.center_x,a=this.center_y,p=this.walls[1];p.dd=e,p.dx=i+this.height/2*y(e),p.dy=a+this.height/2*m(e)}{const e=this.dire+180,i=this.center_x,a=this.center_y,p=this.walls[2];p.dd=e,p.dx=i+this.height/2*y(e),p.dy=a+this.height/2*m(e)}{const e=this.dire+270,i=this.center_x,a=this.center_y,p=this.walls[3];p.dd=e,p.dx=i+this.height/2*y(e),p.dy=a+this.height/2*m(e)}},init(){this.walls.push(new c(0,0,0,this.thickness)),this.walls.push(new c(0,0,90,this.thickness)),this.walls.push(new c(0,0,180,this.thickness)),this.walls.push(new c(0,0,270,this.thickness))}};return s.init(),{Wall:u,box:s}},Ye=async()=>{const h=await D(C),t=new h.Sprite(320,240,0,80,"soul",!0),u=W(h.cLib,h.Sprite),c=Qe(h.cLib,h.inputKeys),s=Ve(h.cLib,t);new u.normal(60,180,0,12,200,0,0,2,0,0);const e=s.box;let i=new c.Plane("test","Hello, world!",60,180,0,400,"white",0,0,5,"en");h.aLib.play("damage"),h.loop(()=>{h.ctx.clearRect(0,0,h.canvas.width,h.canvas.height),h.inputKeys.up&&(t.y+=3.5,console.log(h.Audios.damage),h.aLib.play("damage",.03,1)),h.inputKeys.down&&(t.y-=3.5),h.inputKeys.right&&(t.x+=3.5),h.inputKeys.left&&(t.x-=3.5),e.dire+=1,e.draw(),e.judge(),e.update(),u.process(),c.process(),i.write(),t.stamp()})};window.onload=Ye;
