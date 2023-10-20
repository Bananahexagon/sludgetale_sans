const z=(e,t)=>{e()||(t(),requestAnimationFrame(()=>z(e,t)))},P=(e,t,u=0)=>{u<e&&(t(u),requestAnimationFrame(()=>P(e,t,u+1)))},A=e=>{e(),requestAnimationFrame(()=>A(e))},F=[{type:"image",name:"soul",src:"./assets/images/soul.png"},{type:"image",name:"soul_blue",src:"./assets/images/soul_blue.png"},{type:"image",name:"commands",src:"./assets/images/commands.png"},{type:"image",name:"back",src:"./assets/images/back.png"},{type:"image",name:"sans",src:"./assets/images/sans.png"},{type:"image",name:"hp_kr_purple",src:"./assets/images/hp_kr_purple.png"},{type:"image",name:"determination_white",src:"./assets/images/font/determination_white.png"},{type:"image",name:"determination_red",src:"./assets/images/font/determination_red.png"},{type:"image",name:"determination_orange",src:"./assets/images/font/determination_orange.png"},{type:"image",name:"determination_blue",src:"./assets/images/font/determination_blue.png"},{type:"image",name:"determination_yellow",src:"./assets/images/font/determination_yellow.png"},{type:"image",name:"status_white",src:"./assets/images/font/status_white.png"},{type:"image",name:"status_red",src:"./assets/images/font/status_red.png"},{type:"image",name:"status_orange",src:"./assets/images/font/status_orange.png"},{type:"image",name:"status_blue",src:"./assets/images/font/status_blue.png"},{type:"image",name:"status_yellow",src:"./assets/images/font/status_yellow.png"},{type:"image",name:"status_purple",src:"./assets/images/font/status_purple.png"},{type:"image",name:"hp_kr_white",src:"./assets/images/hp_kr_white.png"},{type:"image",name:"hp_kr_red",src:"./assets/images/hp_kr_red.png"},{type:"image",name:"hp_kr_purple",src:"./assets/images/hp_kr_purple.png"},{type:"image",name:"bone_head_white",src:"./assets/images/bone_head_white.png"},{type:"image",name:"bananahexagon",src:"./assets/images/normal_icon.png"},{type:"audio",name:"damage",src:"./assets/audios/damage.wav"}],E=async()=>{const e={},t={},u={},f=F,a=[];return console.log(f),f.forEach(s=>a.push(new Promise(i=>{switch(s.type){case"image":{const h=new Image;h.src=s.src,h.onload=()=>{e[s.name]=h,i()}}break;case"audio":{const h=new Audio(s.src);h.onload=()=>{t[s.name]=h,i()}}break;case"font":(async()=>{const g=await(await(await fetch(s.src)).text()).match(/url\(.+?\)/g);if(!g)throw new Error("フォントが見つかりませんでした");const d=[];g.forEach(o=>{d.push((async()=>{const l=new FontFace(s.name,o);await l.load(),u[s.name]=l,await document.fonts.add(l)})())}),Promise.all(d)})().then(i)}}))),await Promise.all(a),console.log(u),{Images:e,Audios:t,Fonts:u}},_=e=>Math.sin(e/360*Math.PI*2),y=e=>Math.cos(e/360*Math.PI*2),I=(e,t,u,f,a,s)=>{const i=(d,o,l,n=0,r=100,w=1,c="center",m,$=!1)=>{if($){const b=u[d],[k,M,q,v]=m===void 0?[0,0,b.width,b.height]:[m.left,m.top,m.width,m.height];switch(t.globalAlpha=w,c){case"center":t.save(),t.translate(o*a.display_quality,-l*a.display_quality+e.height),t.rotate(n*Math.PI/180),t.drawImage(b,k,M,q,v,-q*r/200*a.display_quality,-v*r/200*a.display_quality,q*r/100*a.display_quality,v*r/100*a.display_quality),t.restore();break;case"start":t.save(),t.translate(o*a.display_quality,-l*a.display_quality+e.height),t.rotate(n*Math.PI/180),t.drawImage(b,k,M,q,v,0,0,q*r/100*a.display_quality,v*r/100*a.display_quality),t.restore()}}else{const b=(y(s.d)*o-_(s.d)*l+s.x)*s.size/100,k=(_(s.d)*o+y(s.d)*l+s.y)*s.size/100,M=n+s.d;i(d,b,k,M,r*s.size/100,w,c,m,!0)}};return{stamp:i,drawRect:(d,o,l,n,r,w=0,c="center")=>{switch(t.save(),c){case"center++":t.translate(d*a.display_quality,-o*a.display_quality+e.height),t.rotate(w*Math.PI/180),t.beginPath(),t.rect(-l/2*a.display_quality,-n/2*a.display_quality,l*a.display_quality,n*a.display_quality);break;case"center":t.translate((d-l/2)*a.display_quality,-(o-n/2)*a.display_quality+e.height),t.rotate(w*Math.PI/180),t.beginPath(),t.rect(0,0,l*a.display_quality,-n*a.display_quality);break;case"start":default:t.translate(d*a.display_quality,-o*a.display_quality+e.height),t.rotate(w*Math.PI/180),t.beginPath(),t.rect(0,0,l*a.display_quality,-n*a.display_quality);break}t.fillStyle=r,t.fill(),t.restore()},drawLine:(d,o,l,n,r,w,c=0)=>{switch(t.beginPath(),c){case 0:t.moveTo((d-n*Math.sin(l)/2)*a.display_quality,-(o+n*Math.cos(l)/2)*a.display_quality+e.height),t.lineTo((d+n*Math.sin(l)/2)*a.display_quality,-(o-n*Math.cos(l)/2)*a.display_quality+e.height);break;case 1:t.moveTo(d*a.display_quality,-o*a.display_quality+e.height),t.lineTo((d+n*Math.sin(l))*a.display_quality,-(o-n*Math.cos(l))*a.display_quality+e.height);break}t.strokeStyle=w,t.lineWidth=r*a.display_quality,t.stroke()},drawText:(d,o,l,n,r,w="serif",c="left")=>{const[m,$]=[o*a.display_quality,-l*a.display_quality+e.height];t.font=`${n*a.display_quality}px ${w}`,t.textAlign=c,t.fillStyle=r,t.fillText(d,m,$)}}},L=e=>{class t{constructor(f,a,s=0,i=100,h="",p=!1){this.x=f,this.y=a,this.d=s,this.size=i,this.costume=h,this.visible=p}stamp(){this.visible&&e.stamp(this.costume,this.x,this.y,this.d,this.size)}move(f){this.x+=_(this.d)*f,this.y+=y(this.d)*f}}return t},D=(e,t,u)=>({raw_to_stage:(a,s,i=0)=>{const h=e.getBoundingClientRect(),p=((a-h.left)/u.size*100-u.x)*t.stage_width/t.display_width,g=(t.display_height-((s-h.top)/u.size*100-u.y))*t.stage_height/t.display_height,d=i+u.d;return{x:p,y:g,d}}}),R=e=>({play:u=>{e[u].play()}}),S=async e=>{const t=document.getElementById(e.canvas_name);t.height=e.stage_height*e.display_quality,t.width=e.stage_width*e.display_quality;const u=t.getContext("2d"),{Images:f,Audios:a,Fonts:s}=await E(),i={up:!1,down:!1,left:!1,right:!1,z:!1,x:!1,c:!1,d:!1},h={x:0,y:0,clicking:!1,is_in_rect(n,r,w,c,m="center"){switch(m){case"center":return n-w/2<this.x&&this.x<n+w/2&&r-c/2<this.y&&this.y<r+c/2;case"start":default:return n<this.x&&this.x<n+w&&r<this.y&&this.y<r+c}}},p={canvas:{size:100,x:0,y:0,d:0}},g=I(t,u,f,s,e,p.canvas),d=R(a),o=L(g);u.imageSmoothingEnabled=!1;const l=D(t,e,p.canvas);return window.addEventListener("keydown",n=>{switch(n.key){case"ArrowUp":i.up=!0;break;case"ArrowDown":i.down=!0;break;case"ArrowLeft":i.left=!0;break;case"ArrowRight":i.right=!0;break;case"z":case"Z":i.z=!0;break;case"x":case"X":i.x=!0;break;case"c":case"C":i.c=!0;break;case"d":case"D":i.d=!0;break}}),window.addEventListener("keyup",n=>{switch(n.key){case"ArrowUp":i.up=!1;break;case"ArrowDown":i.down=!1;break;case"ArrowLeft":i.left=!1;break;case"ArrowRight":i.right=!1;break;case"z":case"Z":i.z=!1;break;case"x":case"X":i.x=!1;break;case"c":case"C":i.c=!1;break;case"d":case"D":i.d=!1;break}}),t.addEventListener("mousedown",n=>{h.clicking=!0;const r=l.raw_to_stage(n.x,n.y);h.x=r.x,h.y=r.y}),t.addEventListener("mousemove",n=>{const r=l.raw_to_stage(n.x,n.y);h.x=r.x,h.y=r.y}),t.addEventListener("mouseup",n=>{h.clicking=!1;const r=l.raw_to_stage(n.x,n.y);h.x=r.x,h.y=r.y}),{canvas:t,ctx:u,Images:f,Audios:a,Fonts:s,inputKeys:i,inputMouse:h,props:p,cLib:g,aLib:d,Sprite:o,for:P,while:z,loop:A}},B=2,G=640,T=480,j=800,C=400,W="canvas",K={display_quality:B,stage_width:G,stage_height:T,display_width:j,display_height:C,canvas_name:W},U=(e,t)=>{let u={};const f=class x extends t{constructor(h,p,g,d,o,l,n,r,w,c){super(h,p,g,d,void 0,!0),this.start_x=h,this.start_y=p,this.start_d=g,this.move_x=l,this.move_y=n,this.move_d=r,this.start_len=o,this.move_len=w,this.len=o,this.age=0,this.id=x.current_id,this.width=d,u[this.id]=this,x.current_id++}move_self(){this.age++,this.x=this.start_x+x.get_move(this.move_x,this.age),this.y=this.start_y+x.get_move(this.move_y,this.age),this.d=this.start_d+x.get_move(this.move_d,this.age),this.len=this.start_len+x.get_move(this.move_len,this.age)}draw(){y(this.d),e.stamp("bone_head_white",this.x+y(this.d)*this.width*8/6,this.y-_(this.d)*this.width*8/6,this.d+180,this.width*100/6,1,"start"),e.drawRect(this.x+_(this.d)*this.width*6/6,this.y+y(this.d)*this.width*6/6,this.width,this.len+this.width*2/6,"white",this.d,"start"),e.stamp("bone_head_white",this.x+_(this.d)*(this.len+this.width*14/6)-y(this.d)*this.width*2/6,this.y+y(this.d)*(this.len+this.width*14/6)+_(this.d)*this.width*2/6,this.d,this.width*100/6,1,"start")}static process(){for(const h in u){const p=u[h];p.move_self(),p.draw()}}static get_move(h,p){if(typeof h=="number")return h*p;switch(h.type){case"sin":case"cos":return _(h.cycle*p)*h.amp;case"custom":return h.fn(p)}}};f.current_id=0;let a=f;return{boneDict:u,normal:a,process:()=>{a.process()}}},X={height_basic:15,width_basic:2,name:"determination"},Z={left:10,up:34,width:6,height:9,gap:0},H={left:20,up:34,width:6,height:9,gap:0},J={left:30,up:34,width:6,height:9,gap:0},N={left:40,up:34,width:6,height:9,gap:0},O={left:50,up:34,width:6,height:9,gap:0},Q={left:60,up:34,width:6,height:9,gap:0},V={left:70,up:34,width:6,height:9,gap:0},Y={left:80,up:34,width:6,height:9,gap:0},tt={left:90,up:34,width:6,height:9,gap:0},et={left:100,up:34,width:6,height:9,gap:0},st={left:110,up:34,width:6,height:9,gap:0},it={left:120,up:34,width:6,height:9,gap:0},ht={left:130,up:34,width:7,height:9,gap:0},at={left:140,up:34,width:6,height:9,gap:0},nt={left:150,up:34,width:6,height:9,gap:0},pt={left:0,up:50,width:6,height:9,gap:0},lt={left:10,up:50,width:6,height:9,gap:0},gt={left:20,up:50,width:6,height:9,gap:0},dt={left:30,up:50,width:6,height:9,gap:0},ot={left:40,up:50,width:6,height:9,gap:0},rt={left:50,up:50,width:6,height:9,gap:0},ct={left:60,up:50,width:6,height:9,gap:0},ut={left:70,up:50,width:7,height:9,gap:0},wt={left:80,up:50,width:6,height:9,gap:0},ft={left:90,up:50,width:6,height:9,gap:0},_t={left:100,up:50,width:6,height:9,gap:0},yt={left:10,up:68,width:6,height:7,gap:2},mt={left:20,up:66,width:6,height:9,gap:0},bt={left:30,up:68,width:6,height:7,gap:2},$t={left:40,up:66,width:6,height:9,gap:0},xt={left:50,up:68,width:6,height:7,gap:2},kt={left:60,up:66,width:6,height:9,gap:0},qt={left:70,up:68,width:6,height:10,gap:5},vt={left:80,up:66,width:6,height:9,gap:0},Mt={left:90,up:65,width:6,height:10,gap:-1},zt={left:100,up:65,width:6,height:13,gap:2},Pt={left:110,up:66,width:6,height:9,gap:0},At={left:120,up:66,width:6,height:9,gap:0},Ft={left:130,up:68,width:7,height:7,gap:2},Et={left:140,up:68,width:6,height:7,gap:2},It={left:150,up:68,width:6,height:7,gap:2},Lt={left:0,up:84,width:6,height:10,gap:5},Dt={left:10,up:84,width:6,height:10,gap:5},Rt={left:20,up:84,width:6,height:7,gap:2},St={left:30,up:84,width:6,height:7,gap:2},Bt={left:40,up:82,width:6,height:9,gap:0},Gt={left:50,up:84,width:6,height:7,gap:2},Tt={left:60,up:84,width:6,height:7,gap:2},jt={left:70,up:84,width:7,height:7,gap:2},Ct={left:80,up:84,width:6,height:7,gap:2},Wt={left:90,up:84,width:6,height:10,gap:5},Kt={left:100,up:84,width:6,height:7,gap:2},Ut={left:0,up:0,width:1,height:1,gap:0},Xt={left:150,up:82,width:6,height:9,gap:0},Zt={left:40,up:0,width:6,height:13,gap:0},Ht={left:150,up:61,width:4,height:1,gap:14},Jt={0:{left:0,up:18,width:6,height:9,gap:0},1:{left:10,up:18,width:6,height:9,gap:0},2:{left:20,up:18,width:6,height:9,gap:0},3:{left:30,up:18,width:6,height:9,gap:0},4:{left:40,up:18,width:6,height:9,gap:0},5:{left:50,up:18,width:6,height:9,gap:0},6:{left:60,up:18,width:6,height:9,gap:0},7:{left:70,up:18,width:6,height:9,gap:0},8:{left:80,up:18,width:6,height:9,gap:0},9:{left:90,up:18,width:6,height:9,gap:0},props:X,A:Z,B:H,C:J,D:N,E:O,F:Q,G:V,H:Y,I:tt,J:et,K:st,L:it,M:ht,N:at,O:nt,P:pt,Q:lt,R:gt,S:dt,T:ot,U:rt,V:ct,W:ut,X:wt,Y:ft,Z:_t,a:yt,b:mt,c:bt,d:$t,e:xt,f:kt,g:qt,h:vt,i:Mt,j:zt,k:Pt,l:At,m:Ft,n:Et,o:It,p:Lt,q:Dt,r:Rt,s:St,t:Bt,u:Gt,v:Tt,w:jt,x:Ct,y:Wt,z:Kt,space:Ut,irregular:Xt,"!":{left:10,up:1,width:4,height:10,gap:-1},'"':{left:20,up:2,width:5,height:4,gap:-5},"#":{left:30,up:2,width:7,height:9,gap:0},$:Zt,"%":{left:50,up:2,width:7,height:9,gap:0},"&":{left:60,up:2,width:7,height:9,gap:0},"'":{left:70,up:2,width:2,height:4,gap:-5},"(":{left:80,up:2,width:4,height:9,gap:0},")":{left:90,up:2,width:4,height:9,gap:0},"*":{left:100,up:4,width:8,height:5,gap:0},"+":{left:110,up:4,width:6,height:5,gap:0},",":{left:120,up:9,width:2,height:4,gap:7},"-":{left:130,up:6,width:5,height:1,gap:0},".":{left:140,up:9,width:2,height:2,gap:7},"/":{left:150,up:2,width:6,height:10,gap:1},":":{left:100,up:20,width:2,height:7,gap:2},";":{left:110,up:20,width:2,height:9,gap:4},"<":{left:120,up:18,width:5,height:9,gap:0},"=":{left:130,up:21,width:5,height:3,gap:0},">":{left:140,up:18,width:5,height:9,gap:0},"?":{left:150,up:18,width:6,height:9,gap:0},"@":{left:0,up:34,width:6,height:9,gap:0},"[":{left:110,up:50,width:4,height:9,gap:0},"\\":{left:120,up:50,width:6,height:10,gap:1},"]":{left:130,up:50,width:4,height:9,gap:0},"^":{left:140,up:49,width:6,height:4,gap:-5},_:Ht,"`":{left:10,up:68,width:3,height:2,gap:2},"{":{left:110,up:82,width:5,height:9,gap:0},"|":{left:120,up:82,width:2,height:9,gap:0},"}":{left:130,up:82,width:5,height:9,gap:0},"~":{left:140,up:85,width:7,height:2,gap:-1}},Nt={height_basic:6,width_basic:1,name:"status"},Ot={left:6,up:14,width:4,height:5,gap:0},Qt={left:12,up:14,width:4,height:5,gap:0},Vt={left:18,up:14,width:4,height:5,gap:0},Yt={left:24,up:14,width:4,height:5,gap:0},te={left:30,up:14,width:4,height:5,gap:0},ee={left:36,up:14,width:4,height:5,gap:0},se={left:42,up:14,width:4,height:5,gap:0},ie={left:48,up:14,width:4,height:5,gap:0},he={left:54,up:14,width:4,height:5,gap:0},ae={left:60,up:14,width:4,height:5,gap:0},ne={left:66,up:14,width:4,height:5,gap:0},pe={left:72,up:14,width:4,height:5,gap:0},le={left:78,up:14,width:5,height:5,gap:0},ge={left:84,up:14,width:4,height:5,gap:0},de={left:90,up:14,width:4,height:5,gap:0},oe={left:0,up:21,width:4,height:5,gap:0},re={left:6,up:21,width:4,height:5,gap:0},ce={left:12,up:21,width:4,height:5,gap:0},ue={left:18,up:21,width:4,height:5,gap:0},we={left:24,up:21,width:4,height:5,gap:0},fe={left:30,up:21,width:4,height:5,gap:0},_e={left:36,up:21,width:4,height:5,gap:0},ye={left:42,up:21,width:5,height:5,gap:0},me={left:48,up:21,width:4,height:5,gap:0},be={left:54,up:21,width:4,height:5,gap:0},$e={left:60,up:21,width:4,height:5,gap:0},xe={left:6,up:28,width:4,height:5,gap:0},ke={left:12,up:28,width:4,height:5,gap:0},qe={left:18,up:28,width:4,height:5,gap:0},ve={left:24,up:28,width:4,height:5,gap:0},Me={left:30,up:28,width:4,height:5,gap:0},ze={left:36,up:28,width:4,height:5,gap:0},Pe={left:42,up:28,width:4,height:5,gap:0},Ae={left:48,up:28,width:4,height:5,gap:0},Fe={left:54,up:28,width:4,height:5,gap:0},Ee={left:60,up:28,width:4,height:5,gap:0},Ie={left:66,up:28,width:4,height:5,gap:0},Le={left:72,up:28,width:4,height:5,gap:0},De={left:78,up:28,width:5,height:5,gap:0},Re={left:84,up:28,width:4,height:5,gap:0},Se={left:90,up:28,width:4,height:5,gap:0},Be={left:0,up:35,width:4,height:5,gap:0},Ge={left:6,up:35,width:4,height:5,gap:0},Te={left:12,up:35,width:4,height:5,gap:0},je={left:18,up:35,width:4,height:5,gap:0},Ce={left:24,up:35,width:4,height:5,gap:0},We={left:30,up:35,width:4,height:5,gap:0},Ke={left:36,up:35,width:4,height:5,gap:0},Ue={left:42,up:35,width:5,height:5,gap:0},Xe={left:48,up:35,width:4,height:5,gap:0},Ze={left:54,up:35,width:4,height:5,gap:0},He={left:60,up:35,width:4,height:5,gap:0},Je={left:0,up:0,width:4,height:1,gap:0},Ne={left:90,up:35,width:4,height:5,gap:0},Oe={left:24,up:0,width:5,height:5,gap:0},Qe={left:90,up:25,width:4,height:1,gap:4},Ve={0:{left:0,up:7,width:4,height:5,gap:0},1:{left:6,up:7,width:4,height:5,gap:0},2:{left:12,up:7,width:4,height:5,gap:0},3:{left:18,up:7,width:4,height:5,gap:0},4:{left:24,up:7,width:4,height:5,gap:0},5:{left:30,up:7,width:4,height:5,gap:0},6:{left:36,up:7,width:4,height:5,gap:0},7:{left:42,up:7,width:4,height:5,gap:0},8:{left:48,up:7,width:4,height:5,gap:0},9:{left:54,up:7,width:4,height:5,gap:0},props:Nt,A:Ot,B:Qt,C:Vt,D:Yt,E:te,F:ee,G:se,H:ie,I:he,J:ae,K:ne,L:pe,M:le,N:ge,O:de,P:oe,Q:re,R:ce,S:ue,T:we,U:fe,V:_e,W:ye,X:me,Y:be,Z:$e,a:xe,b:ke,c:qe,d:ve,e:Me,f:ze,g:Pe,h:Ae,i:Fe,j:Ee,k:Ie,l:Le,m:De,n:Re,o:Se,p:Be,q:Ge,r:Te,s:je,t:Ce,u:We,v:Ke,w:Ue,x:Xe,y:Ze,z:He,space:Je,irregular:Ne,"!":{left:6,up:0,width:4,height:5,gap:0},'"':{left:12,up:0,width:3,height:2,gap:0},"#":{left:18,up:0,width:5,height:5,gap:0},$:Oe,"%":{left:30,up:1,width:4,height:4,gap:1},"&":{left:36,up:0,width:5,height:5,gap:0},"'":{left:42,up:0,width:1,height:2,gap:-3},"(":{left:48,up:0,width:3,height:5,gap:0},")":{left:54,up:0,width:3,height:5,gap:0},"*":{left:60,up:0,width:5,height:5,gap:0},"+":{left:66,up:0,width:5,height:5,gap:0},",":{left:72,up:3,width:1,height:2,gap:3},"-":{left:78,up:2,width:5,height:1,gap:0},".":{left:84,up:4,width:1,height:1,gap:4},"/":{left:90,up:1,width:4,height:4,gap:1},":":{left:60,up:8,width:1,height:3,gap:0},";":{left:66,up:8,width:1,height:4,gap:1},"<":{left:72,up:7,width:3,height:5,gap:0},"=":{left:78,up:8,width:5,height:3,gap:0},">":{left:84,up:7,width:3,height:5,gap:0},"?":{left:90,up:7,width:4,height:5,gap:0},"@":{left:0,up:14,width:4,height:5,gap:0},"[":{left:66,up:21,width:4,height:5,gap:0},"\\":{left:72,up:22,width:4,height:4,gap:1},"]":{left:78,up:21,width:4,height:5,gap:0},"^":{left:84,up:21,width:5,height:3,gap:-1},_:Qe,"`":{left:0,up:27,width:1,height:2,gap:-5},"{":{left:66,up:35,width:3,height:5,gap:0},"|":{left:72,up:35,width:1,height:5,gap:0},"}":{left:78,up:35,width:3,height:5,gap:0},"~":{left:84,up:35,width:4,height:2,gap:-3}},Ye=(e,t)=>{const u={en:Jt,status:Ve};let f={};class a{constructor(g){this.name=g}delete(){delete f[this.name]}}class s extends a{constructor(g,d,o,l,n,r,w){super(g),this._={all_str:w.reduce((c,m)=>c+m.str,""),now:[{str:"",color:w[0].color,spacing_x:w[0].spacing_x,spacing_y:w[0].spacing_y}],len_allow:0,count:0,current_char:0,current_char_true:0},this.x=d,this.y=o,this.direction=l,this.size=n,this.data=w,this.font=(c=>{switch(c){case"status":return u.status;default:return u.en}})(r),f[g]=this,this.process()}write(){const g=this.size,d=this.direction*Math.PI/180,o=this._.now.reduce((c,m)=>c+m.str.length,0);let l=0,n=0,r=0;const w=c=>c in this.font?this.font[c]:this.font.space;return this._.now.forEach(c=>{c.str.split("").forEach($=>{const b=w($);$==`
`?(l=0,n+=this.font.props.height_basic+c.spacing_y):(e.stamp(this.font.props.name+"_"+c.color,this.x+(Math.cos(d)*l-Math.sin(d)*(n+b.gap/2))*g/100,this.y+(Math.sin(d)*l+Math.cos(d)*(n+b.gap/2))*g/100,this.direction,g,1,"start",{left:b.left,top:b.up,width:b.width,height:b.height}),r+1<o&&(l+=b.width+this.font.props.width_basic+c.spacing_x)),r++})}),this}process(){const g=this.data.reduce((d,o)=>d+o.str.length,0);if(this._.len_allow==g&&t.z){delete f[this.name];return}else t.x?(this._.len_allow=g,this._.current_char=g):this._.len_allow<g&&(this._.len_allow+=1/this.data[this._.count].speed,this._.current_char+=1/this.data[this._.count].speed);for(;this._.current_char_true<Math.min(this._.len_allow,g);)for(this._.now[this._.count].str+=this.data[this._.count].str[this._.now[this._.count].str.length],this._.current_char_true++;this.data[this._.count].str.length<=this._.now[this._.count].str.length&&this._.count+1<this.data.length;)this._.count++,this._.now.push({str:"",color:this.data[this._.count].color===void 0?"white":this.data[this._.count].color,spacing_x:this.data[this._.count].spacing_x,spacing_y:this.data[this._.count].spacing_y}),this._.current_char-=this.data[this._.count].str.length}}class i extends a{constructor(g,d,o,l,n,r,w,c,m,$,b){super(g),this.str_now="",this.len_now=0,this.str=d,this.x=o,this.y=l,this.direction=n,this.size=r,this.color=w,this.spacing_x=c,this.spacing_y=m,this.speed=$,this.font=(k=>{switch(k){case"status":return u.status;default:return u.en}})(b),this.len_allow=0,f[g]=this,this.process()}write(){const g=this.str_now,d=this.size,o=this.direction*Math.PI/180;let l,n;[l,n]=[0,0];const r=w=>w in this.font?this.font[w]:this.font.space;for(let w=0;w<g.length;w++){const c=r(g[w]);g[w]==`
`?(l=0,n+=this.font.props.height_basic+this.spacing_y):(e.stamp(this.font.props.name+"_"+(this.color?this.color:"white"),this.x+(Math.cos(o)*l-Math.sin(o)*(n-c.gap))*d/100,this.y+(Math.sin(o)*l+Math.cos(o)*(n-c.gap))*d/100,this.direction,d,1,"start",{left:c.left,top:c.up,width:c.width,height:c.height}),w+1<g.length&&(l+=c.width+this.font.props.width_basic+this.spacing_x))}return this}process(){if(this.len_allow==this.str.length&&t.z){delete f[this.name];return}else t.x?this.len_allow=this.str.length:this.len_allow<this.str.length&&(this.len_allow+=1/this.speed);for(;this.str_now.length<Math.min(this.len_allow,this.str.length);)this.str_now+=this.str[this.str_now.length]}}return{Super:s,Plane:i,process:()=>{for(const p in f)f[p].process()},dict:f}},ts=(e,t)=>{class u{constructor(i,h,p,g,d,o,l=4){this.dx=i,this.dy=h,this.dd=p,this.len=g,this.align=d,this.width=l,this.soul_size=6,this.relative=o||(()=>{const n=this.dd,r=t.x-this.dx;return(t.y-this.dy)*y(n)+r*_(n)>0?"plus":"minus"})()}judge(){const i=this.dd,h=t.x-this.dx,p=t.y-this.dy,g=h*y(i)+p*-_(i),d=p*y(i)+h*_(i);if(this.len/2>g&&g>-this.len/2){if(this.relative=="minus"&&d>-(this.width/2+this.soul_size)||this.relative=="plus"&&this.width/2+this.soul_size>d){const o=g*y(-i)+(this.width/2+this.soul_size)*(this.relative=="minus"?1:-1)*_(-i),l=(this.width/2+this.soul_size)*(this.relative=="minus"?1:-1)*-y(-i)+g*_(-i);t.x=o+this.dx,t.y=l+this.dy}}else d>0?this.relative="plus":this.relative="minus"}draw(){e.drawRect(this.dx,this.dy,this.len,this.width,"white",this.dd,"center++")}}class f{constructor(i,h,p,g=4){this.dx=i,this.dy=h,this.dd=p,this.width=g}judge(){const i=this.dd,h=t.x-this.dx,p=t.y-this.dy,g=h*y(i)+p*-_(i);if(p*y(i)+h*_(i)>-this.width){const o=g*y(-i)+this.width*_(-i),l=this.width*-y(-i)+g*_(-i);t.x=o+this.dx,t.y=l+this.dy}}draw(){const i=this.dx+320*_(this.dd),h=this.dy+320*y(this.dd);e.drawRect(i,h,640,640,"#ffffff88",this.dd,"center++")}}const a={center_x:320,center_y:240,dire:0,width:100,height:100,thickness:6,walls:[],draw(){this.walls.forEach(s=>{const i=s.dx+640*_(s.dd),h=s.dy+640*y(s.dd);e.drawRect(i,h,1280,1280,"#ffffff",s.dd,"center++")}),this.walls.forEach(s=>{const i=s.dx+640*_(s.dd),h=s.dy+640*y(s.dd);e.drawRect(i,h,1280-s.width*2,1280-s.width*2,"#000000",s.dd,"center++")})},judge(){this.walls.forEach(s=>{s.judge()})},update(){{const s=this.dire,i=this.center_x,h=this.center_y,p=this.walls[0];p.dd=s,p.dx=i+this.height/2*_(s),p.dy=h+this.height/2*y(s)}{const s=this.dire+90,i=this.center_x,h=this.center_y,p=this.walls[1];p.dd=s,p.dx=i+this.height/2*_(s),p.dy=h+this.height/2*y(s)}{const s=this.dire+180,i=this.center_x,h=this.center_y,p=this.walls[2];p.dd=s,p.dx=i+this.height/2*_(s),p.dy=h+this.height/2*y(s)}{const s=this.dire+270,i=this.center_x,h=this.center_y,p=this.walls[3];p.dd=s,p.dx=i+this.height/2*_(s),p.dy=h+this.height/2*y(s)}},init(){this.walls.push(new f(0,0,0,this.thickness)),this.walls.push(new f(0,0,90,this.thickness)),this.walls.push(new f(0,0,180,this.thickness)),this.walls.push(new f(0,0,270,this.thickness))}};return a.init(),{Wall:u,box:a}},es=async()=>{const e=await S(K),t=new e.Sprite(320,240,0,80,"soul",!0),u=U(e.cLib,e.Sprite),f=Ye(e.cLib,e.inputKeys),a=ts(e.cLib,t);new u.normal(60,180,0,12,200,0,0,2,0,0);const s=a.box;let i=new f.Plane("test","Hello, world!",60,180,0,400,"white",0,0,5,"en");e.aLib.play("damage"),e.loop(()=>{e.ctx.clearRect(0,0,e.canvas.width,e.canvas.height),e.inputKeys.up&&(t.y+=3.5),e.inputKeys.down&&(t.y-=3.5),e.inputKeys.right&&(t.x+=3.5),e.inputKeys.left&&(t.x-=3.5),s.dire+=1,s.draw(),s.judge(),s.update(),u.process(),f.process(),i.write(),t.stamp()})};window.onload=es;
