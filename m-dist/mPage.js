!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.mPage=t():e.mPage=t()}("undefined"!=typeof self?self:this,function(){return function(e){function t(n){if(o[n])return o[n].exports;var r=o[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var o={};return t.m=e,t.c=o,t.d=function(e,o,n){t.o(e,o)||Object.defineProperty(e,o,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{currentPage:1,pageSize:20,noData:!1,pageLoading:!1}},directives:{page:{bind:function(e,t,o){var n=void 0,r=void 0,a=t.value,i=a.wrapperCls,u=a.callback,c=e.childNodes[0],l=o.context;i&&c&&c.classList.contains(i)?e.addEventListener("scroll",l.throttle(function(t){n=e.offsetHeight,r=c.offsetHeight,!l.pageLoading&&!l.noData&&n+t.target.scrollTop>=r&&0!==r&&(l.pageLoading=!0,l.currentPage++,u&&u(function(e){l.pageLoading=!1,e instanceof Array?l.noData=0===e.length:console.error("params type must be an Array for page callback")}))},10)):console.log("you should give wrapper class name")}}},methods:{throttle:function(e,t){var o=void 0,n=void 0,r=void 0,a=void 0,i=0,u=function(){clearTimeout(n),e.apply(a,r),n=a=r=null};return function(){r=arguments,a=this,o=Date.now(),n||0!==i||(i=o);var c=t-(o-i);c<=0?(i=o,n&&(clearTimeout(n),n=null),e.apply(a,r),a=r=null):n||(n=setTimeout(u,c))}}}}}])});
//# sourceMappingURL=mPage.js.map