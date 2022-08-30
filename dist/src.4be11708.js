parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"mLEp":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.aboutCallback=n,exports.contactCallback=o,exports.homeCallback=c,exports.projectsCallback=e;var t=require("../index.js");function c(c){c.forEach(function(c){c.isIntersecting&&(console.log("home"),t.links.forEach(function(t){t.classList.remove("active")}),document.querySelector(".nav-right__link--home").classList.add("active"))})}function e(c){c.forEach(function(c){c.isIntersecting&&(console.log("projects"),t.links.forEach(function(t){t.classList.remove("active")}),document.querySelector(".nav-right__link--projects").classList.add("active"))})}function o(c){c.forEach(function(c){c.isIntersecting&&(console.log("contact"),t.links.forEach(function(t){t.classList.remove("active")}),document.querySelector(".nav-right__link--contact").classList.add("active"))})}function n(c){c.forEach(function(c){c.isIntersecting&&(console.log("about"),t.links.forEach(function(t){t.classList.remove("active")}),document.querySelector(".nav-right__link--about").classList.add("active"))})}
},{"../index.js":"Focm"}],"Focm":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.links=void 0;var e=require("./js modules/intersectionObservers.js"),t=document.querySelector(".nav-right__ul"),n=document.querySelectorAll(".nav-right__link");exports.links=n,t.addEventListener("click",function(e){if(!e.target.classList.contains("nav-right__ul")){if(e.target.classList.contains("nav-right__link-ordinal")){if(e.target.closest("a").classList.contains("active"))return;n.forEach(function(e){return e.classList.remove("active")}),e.target.closest(".nav-right__link").classList.add("active")}if(e.target.classList.contains("nav-right__link")){if(e.target.classList.contains("active"))return;n.forEach(function(e){return e.classList.remove("active")}),e.target.classList.add("active")}}});var r=document.querySelector(".nav-progress"),o=document.querySelector(".header");document.addEventListener("scroll",function(){var e=(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0)/(document.documentElement.scrollHeight-document.documentElement.clientHeight)*100;e>9?o.classList.add("box-shadow"):o.classList.remove("box-shadow"),r.style.width="".concat(e,"%")});var c=document.querySelector(".nav-left__toggler"),a=document.querySelector("body");c.addEventListener("click",function(e){var t=document.querySelector(".fa-sun"),n=document.querySelector(".fa-moon");e.target.classList.contains("fa-moon")?(n.style.display="none",a.dataset.theme="dark",t.style.display="block"):(t.style.display="none",a.dataset.theme="default",n.style.display="block")});var s=document.querySelector("#toggle"),i=document.querySelector(".top-menu");s.addEventListener("click",function(){this.checked?i.style.top="0":i.style.top="-22rem"}),i.addEventListener("click",function(e){e.target.classList.contains("top-menu__a")&&(s.checked=!1,this.style.top="-22rem")}),window.addEventListener("resize",function(){var e=window.innerWidth;s.checked&&e>900&&(s.checked=!1,i.style.top="-22rem")});var l=document.querySelectorAll(".project"),d=document.querySelector(".frame-arrow__right"),u=document.querySelector(".frame-arrow__left"),m=document.querySelector(".dots-container"),v={currentImage:0,threshold:l.length-1};function f(e){l.forEach(function(t,n){return t.style.transform="translateX(".concat(100*(n-e),"%")})}function g(){l.forEach(function(e,t){var n='<span class="dot" data-image="'.concat(t,'"></span>');m.insertAdjacentHTML("beforeend",n)})}function h(e){document.querySelectorAll(".dot").forEach(function(e){return e.classList.remove("dot-active")}),document.querySelector('.dot[data-image="'.concat(e,'"]')).classList.add("dot-active")}function y(){v.currentImage===v.threshold?v.currentImage=0:v.currentImage++,h(v.currentImage),f(v.currentImage)}function L(){0===v.currentImage?v.currentImage=v.threshold:v.currentImage--,h(v.currentImage),f(v.currentImage)}f(0),g(),h(0),d.addEventListener("click",y),u.addEventListener("click",L),m.addEventListener("click",function(e){if(e.target.classList.contains("dot")){var t=e.target.dataset.image;v.currentImage=Number(t),h(t),f(t)}});var _=document.querySelector(".modal-container"),b=function(e){var t='<div class="modal__zoom--content add-width">\n  <img src="'.concat(e,'" alt="Zoomed image" class="zoomed-img" />\n</div>');_.insertAdjacentHTML("beforeend",t)},k=function(e){e.innerHTML=""},p=document.querySelector(".frame");p.addEventListener("click",function(e){if(e.target.classList.contains("project-left__image")){var t=e.target.getAttribute("src");b(t)}}),a.addEventListener("click",function(e){e.target.classList.contains("modal__zoom--content")&&k(_)}),window.addEventListener("load",function(){this.window.scrollTo(0,0)});var q=document.querySelector("#main"),S=document.querySelector("#projects"),w=document.querySelector("#about"),E=document.querySelector("#contact"),I={root:null,threshold:0},j=new IntersectionObserver(e.homeCallback,I);j.observe(q);var O={root:null,threshold:.9},A=new IntersectionObserver(e.projectsCallback,O);A.observe(S);var T={root:null,threshold:.8},x=new IntersectionObserver(e.contactCallback,T);x.observe(E);var H={root:null,threshold:.2},z=new IntersectionObserver(e.aboutCallback,H);z.observe(w);
},{"./js modules/intersectionObservers.js":"mLEp"}]},{},["Focm"], null)
//# sourceMappingURL=/src.4be11708.js.map