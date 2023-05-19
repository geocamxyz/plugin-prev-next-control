(function(a,r){typeof exports=="object"&&typeof module<"u"?r(exports):typeof define=="function"&&define.amd?define(["exports"],r):(a=typeof globalThis<"u"?globalThis:a||self,r(a.prevNextControl={}))})(this,function(a){"use strict";const r=(i,e={},s="")=>{const o=document.createElement(i);for(let t in e)o.setAttribute(t,e[t]);return o.innerHTML=s,o},h=(i,e)=>(document.getElementById(i)||document.getElementsByTagName("head")[0].prepend(r("STYLE",{type:"text/css"},e)),!0),b=function(i=null){let e,s,o,t,l,c;h("prev-next-controls",`

    .geocam-nav-button-disabled {
      cursor: auto;
      background-color: rgba(127,127,127,0.5);
    }

    .geocam-prev-button {
      background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 8.793l7 7 7-7v1.414l-7 7-7-7z"/><path fill="none" d="M0 0h24v24H0z"/></svg>');
    }

    .geocam-next-button {
      background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 13.793l7-7 7 7v1.414l-7-7-7 7z"/><path fill="none" d="M0 0h24v24H0z"/></svg>');
    }
  `);const d=()=>{t===null?(s.classList.add("geocam-nav-button-disabled"),o.classList.add("geocam-nav-button-disabled")):(t===0?s.classList.add("geocam-nav-button-disabled"):s.classList.remove("geocam-nav-button-disabled"),t===l.length-1?o.classList.add("geocam-nav-button-disabled"):o.classList.remove("geocam-nav-button-disabled"))},u=n=>{t!==null&&(t+=n,t<0?t=0:t>l.length-1&&(t=l.length-1),c=l[t],console.log("current is",c),e.capture(c.attributes.capture),e.shot(c.attributes.shot),d())},p=n=>{u(-1)},f=n=>{u(1)},g=n=>{if(console.log("set shots",n),Array.isArray(n)||console.error("Prev-Next-Controls plugin - you must pass an ordered array of shots"),n.length<1)l=[],t=null;else{l=n;const v=l.findIndex(m=>m.attributes.shot===e.shot()&&m.attributes.capture===e.capture());t=v<0?null:v,c=t!==null?l[t]:null}return d(),this};this.shots=g,this.currentShot=()=>c,this.init=function(n){e=n,s=r("DIV",{class:"geocam-nav-button geocam-prev-button geocam-viewer-control-button",title:"go to previous shot in sequence"}),e.addControl(s,"bottom"),o=r("DIV",{class:"geocam-nav-button geocam-next-button geocam-viewer-control-button",title:"go to next shot in sequence"}),e.addControl(o,"bottom"),s.addEventListener("click",p,!1),o.addEventListener("click",f,!1),i&&g(i)},this.destroy=function(){e.wrapper.removeChild(o),e.wrapper.removeChild(s)}};a.prevNextControls=b,Object.defineProperty(a,Symbol.toStringTag,{value:"Module"})});
