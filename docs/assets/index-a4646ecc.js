var R=Object.defineProperty;var D=(s,t,e)=>t in s?R(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var o=(s,t,e)=>(D(s,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const c of i)if(c.type==="childList")for(const d of c.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function e(i){const c={};return i.integrity&&(c.integrity=i.integrity),i.referrerPolicy&&(c.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?c.credentials="include":i.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(i){if(i.ep)return;i.ep=!0;const c=e(i);fetch(i.href,c)}})();class l{}o(l,"infoBox",document.getElementById("infoBox")),o(l,"boardCanvas",document.getElementById("boardCanvas")),o(l,"UICanvas",document.getElementById("UICanvas")),o(l,"buttonLeft",document.getElementById("buttonLeft")),o(l,"buttonRight",document.getElementById("buttonRight")),o(l,"buttonRotate",document.getElementById("buttonRotate")),o(l,"buttonDown",document.getElementById("buttonDown")),o(l,"mobileControls",document.getElementById("mobileControls"));class w{constructor(){o(this,"isPressed",!1);o(this,"onCurrentFrame",!1)}get isPressedOnCurrentFrame(){return this.isPressed&&this.onCurrentFrame}}class f{static init(){this.isInitiated||(document.addEventListener("keydown",this.handleKeyDown.bind(this)),document.addEventListener("keyup",this.handleKeyUp.bind(this)),l.buttonLeft.addEventListener("touchstart",()=>this.handleTapStart("ArrowLeft")),l.buttonRight.addEventListener("touchstart",()=>this.handleTapStart("ArrowRight")),l.buttonDown.addEventListener("touchstart",()=>this.handleTapStart("ArrowDown")),l.buttonRotate.addEventListener("touchstart",()=>this.handleTapStart("ArrowUp")),l.buttonLeft.addEventListener("mouseup",()=>this.handleTapEnd("ArrowLeft")),l.buttonRight.addEventListener("mouseup",()=>this.handleTapEnd("ArrowRight")),l.buttonDown.addEventListener("mouseup",()=>this.handleTapEnd("ArrowDown")),l.buttonRotate.addEventListener("mouseup",()=>this.handleTapEnd("ArrowUp")),this.isInitiated=!0)}static handleTapStart(t){const e=new KeyboardEvent("keydown",{key:t});this.handleKeyDown(e)}static handleTapEnd(t){const e=new KeyboardEvent("keyup",{key:t});this.handleKeyUp(e)}static handleKeyDown(t){switch(t.key){case"ArrowLeft":{t.preventDefault(),this.left.isPressed=!0,this.left.onCurrentFrame=!0;break}case"ArrowRight":{t.preventDefault(),this.right.isPressed=!0,this.right.onCurrentFrame=!0;break}case"ArrowDown":{t.preventDefault(),this.down.isPressed=!0,this.down.onCurrentFrame=!0;break}case"ArrowUp":case"Shift":{t.preventDefault(),this.rotate.isPressed=!0,this.rotate.onCurrentFrame=!0;break}case"Enter":{t.preventDefault(),this.enter.isPressed=!0,this.enter.onCurrentFrame=!0;break}case"P":case"p":{t.preventDefault(),this.pause.isPressed=!0,this.pause.onCurrentFrame=!0;break}}}static handleKeyUp(t){switch(t.key){case"ArrowLeft":{t.preventDefault(),this.left.isPressed=!1,this.left.onCurrentFrame=!0;break}case"ArrowRight":{t.preventDefault(),this.right.isPressed=!1,this.right.onCurrentFrame=!0;break}case"ArrowDown":{t.preventDefault(),this.down.isPressed=!1,this.down.onCurrentFrame=!0;break}case"ArrowUp":case"Shift":{t.preventDefault(),this.rotate.isPressed=!1,this.rotate.onCurrentFrame=!0;break}case"Enter":{t.preventDefault(),this.enter.isPressed=!1,this.enter.onCurrentFrame=!0;break}case"P":case"p":{t.preventDefault(),this.pause.isPressed=!1,this.pause.onCurrentFrame=!0;break}}}static update(){this.down.onCurrentFrame=!1,this.left.onCurrentFrame=!1,this.right.onCurrentFrame=!1,this.rotate.onCurrentFrame=!1,this.pause.onCurrentFrame=!1,this.enter.onCurrentFrame=!1}}o(f,"isInitiated",!1),o(f,"enter",new w),o(f,"down",new w),o(f,"left",new w),o(f,"right",new w),o(f,"rotate",new w),o(f,"pause",new w);function P(s){return JSON.parse(JSON.stringify(s))}function F(s,t){return Math.floor(Math.random()*(t-s+1)+s)}function y(s,t){const e=[];for(let r=0;r<t;r++){const i=Array(s).fill(0);e.push(i)}return e}var g=(s=>(s.T="T",s.S="S",s.L="L",s.S_INVERTED="T_INVERTED",s.L_INVERTED="L_INVERTED",s.SQUARE="SQUARE",s.LINE="LINE",s))(g||{});class T{constructor(t){o(this,"x",4);o(this,"y",0);o(this,"matrix",y(4,3));o(this,"id");this.matrix=P(t.matrix),this.id=t.id}get width(){return this.matrix[0].length}get height(){return this.matrix.length}getBlockData(t,e){return this.matrix[e][t]}getPivotCoords(t=this.matrix){for(let e=0;e<t.length;e++)for(let r=0;r<t[e].length;r++)if(t[e][r]===2)return{x:r,y:e};throw new Error("Pivot not found")}rotate(t){if(this.id===g.SQUARE)return;const e={x:this.x,y:this.y},r=this.matrix,i=r[0].map((b,p)=>r.map(k=>k[p]).reverse()),c=this.getPivotCoords(r),d=this.getPivotCoords(i);this.x+=c.x-d.x,this.y+=c.y-d.y,this.matrix=i;for(let b=0;b<i.length;b++)if(!(b+this.y<0)){for(let p=0;p<i[b].length;p++)if(i[b][p]&&(this.x+p<0||this.x+p>=t.width||this.y+b>=t.height||t.getBlockData(p+this.x,b+this.y))){this.matrix=r,this.x=e.x,this.y=e.y;return}}}clone(){const t=new T({matrix:this.matrix,id:this.id});return t.x=this.x,t.y=this.y,t}}const E=[{id:g.L,matrix:[[0,0,1],[1,2,1]]},{id:g.L_INVERTED,matrix:[[1,0,0],[1,2,1]]},{id:g.SQUARE,matrix:[[1,1],[2,1]]},{id:g.T,matrix:[[1,2,1],[0,1,0]]},{id:g.S,matrix:[[0,1,1],[1,2,0]]},{id:g.S_INVERTED,matrix:[[1,1,0],[0,2,1]]},{id:g.LINE,matrix:[[1,1,2,1]]}],n={speedMultiplier:10,grid:{width:10,height:20},block:{size:20}},u=class u{static get width(){return this.boardData[0].length}static get height(){return this.boardData.length}static init(){this.canvas.width=n.block.size*n.grid.width,this.canvas.height=n.block.size*n.grid.height,this.context.imageSmoothingEnabled=!1}static render(){this.context.lineWidth=2,this.context.fillStyle="#fcbe24",this.context.strokeStyle="#fcbe24",this.context.clearRect(0,0,this.canvas.width,this.canvas.height);for(let r=0;r<n.grid.height;r++)for(let i=0;i<n.grid.width;i++){const c=i*n.block.size,d=r*n.block.size;u.boardData[r][i]?this.context.fillRect(c,d,n.block.size,n.block.size):this.context.strokeRect(c,d,n.block.size,n.block.size)}const t=u.currentTetromino.getPivotCoords();for(let r=0;r<u.currentTetromino.height;r++)for(let i=0;i<u.currentTetromino.width;i++){if(!u.currentTetromino.getBlockData(i,r))continue;const c=(i+u.currentTetromino.x)*n.block.size,d=(r+u.currentTetromino.y)*n.block.size;this.context.fillStyle=t.x===i&&t.y===r?"#faaa20":"#fcbe24",this.context.fillRect(c,d,n.block.size,n.block.size)}const e=this.currentTetromino.clone();for(;;)if(e.y++,u.hasCollision(e)){e.y--;break}for(let r=0;r<e.height;r++)for(let i=0;i<e.width;i++){if(!e.getBlockData(i,r))continue;const c=(i+e.x)*n.block.size,d=(r+e.y)*n.block.size;this.context.fillStyle="#fcbe2488",this.context.fillRect(c,d,n.block.size,n.block.size)}}static reset(){this.boardData=y(n.grid.width,n.grid.height),this.createNewTetromino()}static hasBlocksInFirstRow(){return this.boardData[0].some(Boolean)}static getRandomTetromino(){const t=F(0,E.length-1);return new T(E[t])}static createNewTetromino(){this.currentTetromino=this.nextTetromino,this.nextTetromino=this.getRandomTetromino()}static getBlockData(t,e){return this.boardData[e][t]}static hasCollision(t=this.currentTetromino){if(t.y+t.height>this.height||t.x<0||t.x+t.width>this.width)return!0;for(let e=0;e<t.height;e++)if(!(e+this.currentTetromino.y<0))for(let r=0;r<t.width;r++){const i=t.x+r,c=t.y+e,d=this.getBlockData(i,c);if(t.getBlockData(r,e)&&d)return!0}return!1}static fixCurrentTetrominoToBoard(){for(let t=0;t<this.currentTetromino.height;t++)for(let e=0;e<this.currentTetromino.width;e++)if(this.currentTetromino.getBlockData(e,t)){const r=this.currentTetromino.x+e,i=this.currentTetromino.y+t;this.boardData[i][r]=1}}static processCompletedRows(){let t=0;for(let e=0;e<this.boardData.length;e++)!this.boardData[e].some(c=>c===0)&&(t++,this.boardData.splice(e,1),this.boardData.unshift([0,0,0,0,0,0,0,0,0,0]));return t}};o(u,"context",l.boardCanvas.getContext("2d")),o(u,"canvas",l.boardCanvas),o(u,"currentTetromino",u.getRandomTetromino()),o(u,"nextTetromino",u.getRandomTetromino()),o(u,"boardData",y(n.grid.width,n.grid.height));let a=u;class x{static init(){this.canvas.width=n.block.size*6,this.canvas.height=n.block.size*4,this.context.imageSmoothingEnabled=!1,this.context.strokeStyle="#fcbe24",this.context.fillStyle="#fcbe24",this.context.lineWidth=2,h.isMobile&&(this.showMobileControls(),this.mobileControls.addEventListener("click",this.hideMobileControls.bind(this)))}static hideMobileControls(){document.body.removeAttribute("preview-controls")}static showMobileControls(){document.body.setAttribute("preview-controls","true")}static render(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.context.strokeRect(0,0,this.canvas.width,this.canvas.height);const t=20,e=20;for(let r=0;r<a.nextTetromino.height;r++)for(let i=0;i<a.nextTetromino.width;i++){if(!a.nextTetromino.matrix[r][i])continue;const c=i*n.block.size+t,d=r*n.block.size+e;this.context.fillRect(c,d,n.block.size,n.block.size)}l.infoBox.innerHTML=`
     ${h.isPaused?"PAUSED<br/><br/>":""}
     Level: ${h.level}<br/>
     Points: ${h.score}<br/><br/>
     ARROW = Move<br/>
     SHIFT = Rotate<br/>
     ENTER = Fall<br/>
     P = Pause<br/>
   `}}o(x,"context",l.UICanvas.getContext("2d")),o(x,"mobileControls",l.mobileControls),o(x,"canvas",l.UICanvas);const m=class m{static get level(){return Math.floor(this.speed/5)}static get isMobile(){return window.innerWidth<800}static pause(){this.isPaused=!0}static resume(){this.isPaused=!1}static start(){x.init(),f.init(),a.init(),this.loop(0)}static loop(t){this.update(t),this.render(t),f.update(),requestAnimationFrame(this.boundedLoopMethod)}static onUpdate(t){this.update=t}static onRender(t){this.render=t}};o(m,"score",0),o(m,"speed",0),o(m,"isPaused",!1),o(m,"boundedLoopMethod",m.loop.bind(m)),o(m,"update",()=>{}),o(m,"render",()=>{});let h=m,v=0;function L(s){s-v>1500-h.speed*n.speedMultiplier&&(v=s,a.currentTetromino.y++,a.hasCollision()&&(a.currentTetromino.y--,C()))}function S(s){if(f.enter.isPressedOnCurrentFrame){for(;;)if(a.currentTetromino.y++,a.hasCollision()){a.currentTetromino.y--,C();break}}f.rotate.isPressedOnCurrentFrame&&a.currentTetromino.rotate(a),f.left.isPressedOnCurrentFrame&&(a.currentTetromino.x--,a.hasCollision()&&a.currentTetromino.x++),f.right.isPressedOnCurrentFrame&&(a.currentTetromino.x++,a.hasCollision()&&a.currentTetromino.x--),f.down.isPressedOnCurrentFrame&&(a.currentTetromino.y++,a.hasCollision()?(a.currentTetromino.y--,C()):v=s)}function C(){a.fixCurrentTetrominoToBoard();const s=a.processCompletedRows();s&&(h.score+=s*10,h.speed+=1),a.hasBlocksInFirstRow()&&(a.reset(),h.score=0,h.speed=0),a.createNewTetromino()}h.onUpdate(s=>{f.pause.isPressedOnCurrentFrame&&(h.isPaused?h.resume():h.pause()),!h.isPaused&&(L(s),S(s))});h.onRender(()=>{a.render(),x.render()});h.start();
