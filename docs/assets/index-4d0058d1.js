var C=Object.defineProperty;var k=(i,t,e)=>t in i?C(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var n=(i,t,e)=>(k(i,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const b of c.addedNodes)b.tagName==="LINK"&&b.rel==="modulepreload"&&s(b)}).observe(document,{childList:!0,subtree:!0});function e(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerPolicy&&(c.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?c.credentials="include":r.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(r){if(r.ep)return;r.ep=!0;const c=e(r);fetch(r.href,c)}})();class h{}n(h,"infoBox",document.getElementById("infoBox")),n(h,"boardCanvas",document.getElementById("boardCanvas")),n(h,"UICanvas",document.getElementById("UICanvas")),n(h,"buttonLeft",document.getElementById("buttonLeft")),n(h,"buttonRight",document.getElementById("buttonRight")),n(h,"buttonRotate",document.getElementById("buttonRotate")),n(h,"buttonDown",document.getElementById("buttonDown"));class p{constructor(){n(this,"isPressed",!1);n(this,"onCurrentFrame",!1)}get isPressedOnCurrentFrame(){return this.isPressed&&this.onCurrentFrame}}class u{static init(){this.isInitiated||(document.addEventListener("keydown",this.handleKeyDown.bind(this)),document.addEventListener("keyup",this.handleKeyUp.bind(this)),h.buttonLeft.addEventListener("touchstart",()=>this.handleTapStart("ArrowLeft")),h.buttonRight.addEventListener("touchstart",()=>this.handleTapStart("ArrowRight")),h.buttonDown.addEventListener("touchstart",()=>this.handleTapStart("ArrowDown")),h.buttonRotate.addEventListener("touchstart",()=>this.handleTapStart("ArrowUp")),h.buttonLeft.addEventListener("mouseup",()=>this.handleTapEnd("ArrowLeft")),h.buttonRight.addEventListener("mouseup",()=>this.handleTapEnd("ArrowRight")),h.buttonDown.addEventListener("mouseup",()=>this.handleTapEnd("ArrowDown")),h.buttonRotate.addEventListener("mouseup",()=>this.handleTapEnd("ArrowUp")),this.isInitiated=!0)}static handleTapStart(t){const e=new KeyboardEvent("keydown",{key:t});this.handleKeyDown(e)}static handleTapEnd(t){const e=new KeyboardEvent("keyup",{key:t});this.handleKeyUp(e)}static handleKeyDown(t){switch(t.key){case"ArrowLeft":{t.preventDefault(),this.left.isPressed=!0,this.left.onCurrentFrame=!0;break}case"ArrowRight":{t.preventDefault(),this.right.isPressed=!0,this.right.onCurrentFrame=!0;break}case"ArrowDown":{t.preventDefault(),this.down.isPressed=!0,this.down.onCurrentFrame=!0;break}case"ArrowUp":case"Shift":{t.preventDefault(),this.rotate.isPressed=!0,this.rotate.onCurrentFrame=!0;break}case"Enter":{t.preventDefault(),this.enter.isPressed=!0,this.enter.onCurrentFrame=!0;break}case"P":case"p":{t.preventDefault(),this.pause.isPressed=!0,this.pause.onCurrentFrame=!0;break}}}static handleKeyUp(t){switch(t.preventDefault(),t.key){case"ArrowLeft":{t.preventDefault(),this.left.isPressed=!1,this.left.onCurrentFrame=!0;break}case"ArrowRight":{t.preventDefault(),this.right.isPressed=!1,this.right.onCurrentFrame=!0;break}case"ArrowDown":{t.preventDefault(),this.down.isPressed=!1,this.down.onCurrentFrame=!0;break}case"ArrowUp":case"Shift":{t.preventDefault(),this.rotate.isPressed=!1,this.rotate.onCurrentFrame=!0;break}case"Enter":{t.preventDefault(),this.enter.isPressed=!1,this.enter.onCurrentFrame=!0;break}case"P":case"p":{t.preventDefault(),this.pause.isPressed=!1,this.pause.onCurrentFrame=!0;break}}}static update(){this.down.onCurrentFrame=!1,this.left.onCurrentFrame=!1,this.right.onCurrentFrame=!1,this.rotate.onCurrentFrame=!1,this.pause.onCurrentFrame=!1,this.enter.onCurrentFrame=!1}}n(u,"isInitiated",!1),n(u,"enter",new p),n(u,"down",new p),n(u,"left",new p),n(u,"right",new p),n(u,"rotate",new p),n(u,"pause",new p);function E(i){return JSON.parse(JSON.stringify(i))}function D(i,t){return Math.floor(Math.random()*(t-i+1)+i)}function w(i,t){const e=[];for(let s=0;s<t;s++){const r=Array(i).fill(0);e.push(r)}return e}class v{constructor(t){n(this,"x",4);n(this,"y",0);n(this,"data",w(4,3));n(this,"id");this.data=E(t.data),this.id=t.id}get width(){return this.data[0].length}get height(){return this.data.length}getBlockData(t,e){return this.data[e][t]}rotate(t){const e=this.data[0].map((s,r)=>this.data.map(c=>c[r]).reverse());for(let s=0;s<e.length;s++)for(let r=0;r<e[s].length;r++)if(this.x+r>=t.width||this.y+s>=t.height||e[s][r]&&t.boardData[this.y+s][this.x+r])return;this.data=e}clone(){const t=new v({data:this.data,id:this.id});return t.x=this.x,t.y=this.y,t}}var m=(i=>(i.T="T",i.S="S",i.L="L",i.S_INVERTED="T_INVERTED",i.L_INVERTED="L_INVERTED",i.SQUARE="SQUARE",i.LINE="LINE",i))(m||{});const x=[{id:m.L,data:[[0,0,1],[1,1,1]]},{id:m.L_INVERTED,data:[[1,0,0],[1,1,1]]},{id:m.SQUARE,data:[[1,1],[1,1]]},{id:m.T,data:[[0,1,0],[1,1,1]]},{id:m.S,data:[[0,1,1],[1,1,0]]},{id:m.S_INVERTED,data:[[1,1,0],[0,1,1]]},{id:m.LINE,data:[[1,1,1,1]]}],o={speedMultiplier:10,grid:{width:10,height:20},block:{size:20}},d=class d{static get width(){return this.boardData[0].length}static get height(){return this.boardData.length}static init(){this.canvas.width=o.block.size*o.grid.width,this.canvas.height=o.block.size*o.grid.height,this.context.imageSmoothingEnabled=!1}static render(){this.context.lineWidth=2,this.context.fillStyle="#fcbe24",this.context.strokeStyle="#fcbe24",this.context.clearRect(0,0,this.canvas.width,this.canvas.height);for(let e=0;e<o.grid.height;e++)for(let s=0;s<o.grid.width;s++){const r=s*o.block.size,c=e*o.block.size;d.boardData[e][s]?this.context.fillRect(r,c,o.block.size,o.block.size):this.context.strokeRect(r,c,o.block.size,o.block.size)}for(let e=0;e<d.currentTetromino.height;e++)for(let s=0;s<d.currentTetromino.width;s++){if(!d.currentTetromino.getBlockData(s,e))continue;const r=(s+d.currentTetromino.x)*o.block.size,c=(e+d.currentTetromino.y)*o.block.size;this.context.fillRect(r,c,o.block.size,o.block.size)}const t=this.currentTetromino.clone();for(;;)if(t.y++,d.hasCollistion(t)){t.y--;break}for(let e=0;e<t.height;e++)for(let s=0;s<t.width;s++){if(!t.getBlockData(s,e))continue;const r=(s+t.x)*o.block.size,c=(e+t.y)*o.block.size;this.context.fillStyle="#fcbe2488",this.context.fillRect(r,c,o.block.size,o.block.size)}}static reset(){this.boardData=w(o.grid.width,o.grid.height),this.createNewTetromino()}static hasBlocksInFirstRow(){return this.boardData[0].some(Boolean)}static getRandomTetromino(){const t=D(0,x.length-1);return new v(x[t])}static createNewTetromino(){this.currentTetromino=this.nextTetromino,this.nextTetromino=this.getRandomTetromino()}static getBlockData(t,e){return this.boardData[e][t]}static hasCollistion(t=this.currentTetromino){if(t.y+t.height>this.height||t.x<0||t.x+t.width>this.width)return!0;for(let e=0;e<t.height;e++)for(let s=0;s<t.width;s++){const r=t.x+s,c=t.y+e,b=this.getBlockData(r,c);if(t.getBlockData(s,e)&&b)return!0}return!1}static fixCurrentTetrominoToBoard(){for(let t=0;t<this.currentTetromino.height;t++)for(let e=0;e<this.currentTetromino.width;e++)if(this.currentTetromino.getBlockData(e,t)){const s=this.currentTetromino.x+e,r=this.currentTetromino.y+t;this.boardData[r][s]=1}}static processCompletdeRows(){let t=0;for(let e=0;e<this.boardData.length;e++)!this.boardData[e].some(c=>c===0)&&(t++,this.boardData.splice(e,1),this.boardData.unshift([0,0,0,0,0,0,0,0,0,0]),this.createNewTetromino());return t}};n(d,"context",h.boardCanvas.getContext("2d")),n(d,"canvas",h.boardCanvas),n(d,"currentTetromino",d.getRandomTetromino()),n(d,"nextTetromino",d.getRandomTetromino()),n(d,"boardData",w(o.grid.width,o.grid.height));let a=d;class g{static init(){this.canvas.width=o.block.size*6,this.canvas.height=o.block.size*4,this.context.imageSmoothingEnabled=!1,this.context.strokeStyle="#fcbe24",this.context.fillStyle="#fcbe24",this.context.lineWidth=2}static render(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.context.strokeRect(0,0,this.canvas.width,this.canvas.height);const t=20,e=20;for(let s=0;s<a.nextTetromino.height;s++)for(let r=0;r<a.nextTetromino.width;r++){if(!a.nextTetromino.data[s][r])continue;const c=r*o.block.size+t,b=s*o.block.size+e;this.context.fillRect(c,b,o.block.size,o.block.size)}h.infoBox.innerHTML=`
     ${l.isPaused?"PAUSED<br/><br/>":""}
     Level: ${l.level}<br/>
     Points: ${l.score}<br/><br/>
     ARROW = Move<br/>
     SHIFT = Rotate<br/>
     ENTER = Fall<br/>
     P = Pause<br/>
   `}}n(g,"context",h.UICanvas.getContext("2d")),n(g,"canvas",h.UICanvas);const f=class f{static get level(){return Math.floor(this.speed/5)}static pause(){this.isPaused=!0}static resume(){this.isPaused=!1}static start(){g.init(),u.init(),a.init(),this.loop(0)}static loop(t){this.update(t),this.render(t),u.update(),requestAnimationFrame(this.boundedLoopMethod)}static onUpdate(t){this.update=t}static onRender(t){this.render=t}};n(f,"score",0),n(f,"speed",0),n(f,"isPaused",!1),n(f,"boundedLoopMethod",f.loop.bind(f)),n(f,"update",()=>{}),n(f,"render",()=>{});let l=f,y=0;function R(i){i-y>1500-l.speed*o.speedMultiplier&&(y=i,a.currentTetromino.y++,a.hasCollistion()&&(a.currentTetromino.y--,T()))}function F(i){if(u.enter.isPressedOnCurrentFrame){for(;;)if(a.currentTetromino.y++,a.hasCollistion()){a.currentTetromino.y--,T();break}}u.rotate.isPressedOnCurrentFrame&&a.currentTetromino.rotate(a),u.left.isPressedOnCurrentFrame&&(a.currentTetromino.x--,a.hasCollistion()&&a.currentTetromino.x++),u.right.isPressedOnCurrentFrame&&(a.currentTetromino.x++,a.hasCollistion()&&a.currentTetromino.x--),u.down.isPressedOnCurrentFrame&&(a.currentTetromino.y++,a.hasCollistion()?(a.currentTetromino.y--,T()):y=i)}function T(){a.fixCurrentTetrominoToBoard();const i=a.processCompletdeRows();i&&(l.score+=i*10,l.speed+=1),a.hasBlocksInFirstRow()&&(a.reset(),l.score=0,l.speed=0),a.createNewTetromino()}l.onUpdate(i=>{u.pause.isPressed&&u.pause.onCurrentFrame&&(l.isPaused?l.resume():l.pause()),!l.isPaused&&(R(i),F(i))});l.onRender(()=>{a.render(),g.render()});l.start();
