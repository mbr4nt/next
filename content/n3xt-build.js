!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(n.async=n.async||{})}(this,function(n){"use strict";function t(n,t){t|=0;for(var e=Math.max(n.length-t,0),r=Array(e),u=0;u<e;u++)r[u]=n[t+u];return r}function e(n){var t=typeof n;return null!=n&&("object"==t||"function"==t)}function r(n){setTimeout(n,0)}function u(n){return function(e){var r=t(arguments,1);n(function(){e.apply(null,r)})}}function i(n){return ct(function(t,r){var u;try{u=n.apply(this,t)}catch(n){return r(n)}e(u)&&"function"==typeof u.then?u.then(function(n){o(r,null,n)},function(n){o(r,n.message?n:new Error(n))}):r(null,u)})}function o(n,t,e){try{n(t,e)}catch(n){lt(c,n)}}function c(n){throw n}function f(n){return st&&"AsyncFunction"===n[Symbol.toStringTag]}function a(n){return f(n)?i(n):n}function l(n){return function(e){var r=t(arguments,1),u=ct(function(t,r){var u=this;return n(e,function(n,e){a(n).apply(u,t.concat(e))},r)});return r.length?u.apply(this,r):u}}function s(n){var t=mt.call(n,bt),e=n[bt];try{n[bt]=void 0;var r=!0}catch(n){}var u=gt.call(n);return r&&(t?n[bt]=e:delete n[bt]),u}function p(n){return St.call(n)}function h(n){return null==n?void 0===n?Lt:kt:Ot&&Ot in Object(n)?s(n):p(n)}function y(n){if(!e(n))return!1;var t=h(n);return t==xt||t==Et||t==wt||t==At}function v(n){return"number"==typeof n&&n>-1&&n%1==0&&n<=Tt}function d(n){return null!=n&&v(n.length)&&!y(n)}function m(){}function g(n){return function(){if(null!==n){var t=n;n=null,t.apply(this,arguments)}}}function b(n,t){for(var e=-1,r=Array(n);++e<n;)r[e]=t(e);return r}function j(n){return null!=n&&"object"==typeof n}function S(n){return j(n)&&h(n)==_t}function k(){return!1}function L(n,t){return t=null==t?Nt:t,!!t&&("number"==typeof n||Qt.test(n))&&n>-1&&n%1==0&&n<t}function O(n){return j(n)&&v(n.length)&&!!me[h(n)]}function w(n){return function(t){return n(t)}}function x(n,t){var e=Vt(n),r=!e&&Pt(n),u=!e&&!r&&Wt(n),i=!e&&!r&&!u&&Oe(n),o=e||r||u||i,c=o?b(n.length,String):[],f=c.length;for(var a in n)!t&&!xe.call(n,a)||o&&("length"==a||u&&("offset"==a||"parent"==a)||i&&("buffer"==a||"byteLength"==a||"byteOffset"==a)||L(a,f))||c.push(a);return c}function E(n){var t=n&&n.constructor,e="function"==typeof t&&t.prototype||Ee;return n===e}function A(n,t){return function(e){return n(t(e))}}function T(n){if(!E(n))return Ae(n);var t=[];for(var e in Object(n))Be.call(n,e)&&"constructor"!=e&&t.push(e);return t}function B(n){return d(n)?x(n):T(n)}function F(n){var t=-1,e=n.length;return function(){return++t<e?{value:n[t],key:t}:null}}function I(n){var t=-1;return function(){var e=n.next();return e.done?null:(t++,{value:e.value,key:t})}}function _(n){var t=B(n),e=-1,r=t.length;return function(){var u=t[++e];return e<r?{value:n[u],key:u}:null}}function M(n){if(d(n))return F(n);var t=It(n);return t?I(t):_(n)}function U(n){return function(){if(null===n)throw new Error("Callback was already called.");var t=n;n=null,t.apply(this,arguments)}}function z(n){return function(t,e,r){function u(n,t){if(f-=1,n)c=!0,r(n);else{if(t===Bt||c&&f<=0)return c=!0,r(null);i()}}function i(){for(;f<n&&!c;){var t=o();if(null===t)return c=!0,void(f<=0&&r(null));f+=1,e(t.value,t.key,U(u))}}if(r=g(r||m),n<=0||!t)return r(null);var o=M(t),c=!1,f=0;i()}}function P(n,t,e,r){z(t)(n,a(e),r)}function V(n,t){return function(e,r,u){return n(e,t,r,u)}}function q(n,t,e){function r(n,t){n?e(n):++i!==o&&t!==Bt||e(null)}e=g(e||m);var u=0,i=0,o=n.length;for(0===o&&e(null);u<o;u++)t(n[u],u,U(r))}function D(n){return function(t,e,r){return n(Ie,t,a(e),r)}}function R(n,t,e,r){r=r||m,t=t||[];var u=[],i=0,o=a(e);n(t,function(n,t,e){var r=i++;o(n,function(n,t){u[r]=t,e(n)})},function(n){r(n,u)})}function C(n){return function(t,e,r,u){return n(z(e),t,a(r),u)}}function $(n,t){for(var e=-1,r=null==n?0:n.length;++e<r&&t(n[e],e,n)!==!1;);return n}function W(n){return function(t,e,r){for(var u=-1,i=Object(t),o=r(t),c=o.length;c--;){var f=o[n?c:++u];if(e(i[f],f,i)===!1)break}return t}}function N(n,t){return n&&Ve(n,t,B)}function Q(n,t,e,r){for(var u=n.length,i=e+(r?1:-1);r?i--:++i<u;)if(t(n[i],i,n))return i;return-1}function G(n){return n!==n}function H(n,t,e){for(var r=e-1,u=n.length;++r<u;)if(n[r]===t)return r;return-1}function J(n,t,e){return t===t?H(n,t,e):Q(n,G,e)}function K(n,t){for(var e=-1,r=null==n?0:n.length,u=Array(r);++e<r;)u[e]=t(n[e],e,n);return u}function X(n){return"symbol"==typeof n||j(n)&&h(n)==De}function Y(n){if("string"==typeof n)return n;if(Vt(n))return K(n,Y)+"";if(X(n))return $e?$e.call(n):"";var t=n+"";return"0"==t&&1/n==-Re?"-0":t}function Z(n,t,e){var r=-1,u=n.length;t<0&&(t=-t>u?0:u+t),e=e>u?u:e,e<0&&(e+=u),u=t>e?0:e-t>>>0,t>>>=0;for(var i=Array(u);++r<u;)i[r]=n[r+t];return i}function nn(n,t,e){var r=n.length;return e=void 0===e?r:e,!t&&e>=r?n:Z(n,t,e)}function tn(n,t){for(var e=n.length;e--&&J(t,n[e],0)>-1;);return e}function en(n,t){for(var e=-1,r=n.length;++e<r&&J(t,n[e],0)>-1;);return e}function rn(n){return n.split("")}function un(n){return Xe.test(n)}function on(n){return n.match(mr)||[]}function cn(n){return un(n)?on(n):rn(n)}function fn(n){return null==n?"":Y(n)}function an(n,t,e){if(n=fn(n),n&&(e||void 0===t))return n.replace(gr,"");if(!n||!(t=Y(t)))return n;var r=cn(n),u=cn(t),i=en(r,u),o=tn(r,u)+1;return nn(r,i,o).join("")}function ln(n){return n=n.toString().replace(kr,""),n=n.match(br)[2].replace(" ",""),n=n?n.split(jr):[],n=n.map(function(n){return an(n.replace(Sr,""))})}function sn(n,t){var e={};N(n,function(n,t){function r(t,e){var r=K(u,function(n){return t[n]});r.push(e),a(n).apply(null,r)}var u,i=f(n),o=!i&&1===n.length||i&&0===n.length;if(Vt(n))u=n.slice(0,-1),n=n[n.length-1],e[t]=u.concat(u.length>0?r:n);else if(o)e[t]=n;else{if(u=ln(n),0===n.length&&!i&&0===u.length)throw new Error("autoInject task functions require explicit parameters.");i||u.pop(),e[t]=u.concat(r)}}),qe(e,t)}function pn(){this.head=this.tail=null,this.length=0}function hn(n,t){n.length=1,n.head=n.tail=t}function yn(n,t,e){function r(n,t,e){if(null!=e&&"function"!=typeof e)throw new Error("task callback must be a function");if(s.started=!0,Vt(n)||(n=[n]),0===n.length&&s.idle())return lt(function(){s.drain()});for(var r=0,u=n.length;r<u;r++){var i={data:n[r],callback:e||m};t?s._tasks.unshift(i):s._tasks.push(i)}f||(f=!0,lt(function(){f=!1,s.process()}))}function u(n){return function(t){o-=1;for(var e=0,r=n.length;e<r;e++){var u=n[e],i=J(c,u,0);0===i?c.shift():i>0&&c.splice(i,1),u.callback.apply(u,arguments),null!=t&&s.error(t,u.data)}o<=s.concurrency-s.buffer&&s.unsaturated(),s.idle()&&s.drain(),s.process()}}if(null==t)t=1;else if(0===t)throw new Error("Concurrency must not be zero");var i=a(n),o=0,c=[],f=!1,l=!1,s={_tasks:new pn,concurrency:t,payload:e,saturated:m,unsaturated:m,buffer:t/4,empty:m,drain:m,error:m,started:!1,paused:!1,push:function(n,t){r(n,!1,t)},kill:function(){s.drain=m,s._tasks.empty()},unshift:function(n,t){r(n,!0,t)},remove:function(n){s._tasks.remove(n)},process:function(){if(!l){for(l=!0;!s.paused&&o<s.concurrency&&s._tasks.length;){var n=[],t=[],e=s._tasks.length;s.payload&&(e=Math.min(e,s.payload));for(var r=0;r<e;r++){var f=s._tasks.shift();n.push(f),c.push(f),t.push(f.data)}o+=1,0===s._tasks.length&&s.empty(),o===s.concurrency&&s.saturated();var a=U(u(n));i(t,a)}l=!1}},length:function(){return s._tasks.length},running:function(){return o},workersList:function(){return c},idle:function(){return s._tasks.length+o===0},pause:function(){s.paused=!0},resume:function(){s.paused!==!1&&(s.paused=!1,lt(s.process))}};return s}function vn(n,t){return yn(n,1,t)}function dn(n,t,e,r){r=g(r||m);var u=a(e);Or(n,function(n,e,r){u(t,n,function(n,e){t=e,r(n)})},function(n){r(n,t)})}function mn(){var n=K(arguments,a);return function(){var e=t(arguments),r=this,u=e[e.length-1];"function"==typeof u?e.pop():u=m,dn(n,e,function(n,e,u){e.apply(r,n.concat(function(n){var e=t(arguments,1);u(n,e)}))},function(n,t){u.apply(r,[n].concat(t))})}}function gn(n){return n}function bn(n,t){return function(e,r,u,i){i=i||m;var o,c=!1;e(r,function(e,r,i){u(e,function(r,u){r?i(r):n(u)&&!o?(c=!0,o=t(!0,e),i(null,Bt)):i()})},function(n){n?i(n):i(null,c?o:t(!1))})}}function jn(n,t){return t}function Sn(n){return function(e){var r=t(arguments,1);r.push(function(e){var r=t(arguments,1);"object"==typeof console&&(e?console.error&&console.error(e):console[n]&&$(r,function(t){console[n](t)}))}),a(e).apply(null,r)}}function kn(n,e,r){function u(n){if(n)return r(n);var e=t(arguments,1);e.push(i),c.apply(this,e)}function i(n,t){return n?r(n):t?void o(u):r(null)}r=U(r||m);var o=a(n),c=a(e);i(null,!0)}function Ln(n,e,r){r=U(r||m);var u=a(n),i=function(n){if(n)return r(n);var o=t(arguments,1);return e.apply(this,o)?u(i):void r.apply(null,[null].concat(o))};u(i)}function On(n,t,e){Ln(n,function(){return!t.apply(this,arguments)},e)}function wn(n,t,e){function r(n){return n?e(n):void o(u)}function u(n,t){return n?e(n):t?void i(r):e(null)}e=U(e||m);var i=a(t),o=a(n);o(u)}function xn(n){return function(t,e,r){return n(t,r)}}function En(n,t,e){Ie(n,xn(a(t)),e)}function An(n,t,e,r){z(t)(n,xn(a(e)),r)}function Tn(n){return f(n)?n:ct(function(t,e){var r=!0;t.push(function(){var n=arguments;r?lt(function(){e.apply(null,n)}):e.apply(null,n)}),n.apply(this,t),r=!1})}function Bn(n){return!n}function Fn(n){return function(t){return null==t?void 0:t[n]}}function In(n,t,e,r){var u=new Array(t.length);n(t,function(n,t,r){e(n,function(n,e){u[t]=!!e,r(n)})},function(n){if(n)return r(n);for(var e=[],i=0;i<t.length;i++)u[i]&&e.push(t[i]);r(null,e)})}function _n(n,t,e,r){var u=[];n(t,function(n,t,r){e(n,function(e,i){e?r(e):(i&&u.push({index:t,value:n}),r())})},function(n){n?r(n):r(null,K(u.sort(function(n,t){return n.index-t.index}),Fn("value")))})}function Mn(n,t,e,r){var u=d(t)?In:_n;u(n,t,a(e),r||m)}function Un(n,t){function e(n){return n?r(n):void u(e)}var r=U(t||m),u=a(Tn(n));e()}function zn(n,t,e,r){r=g(r||m);var u={},i=a(e);P(n,t,function(n,t,e){i(n,t,function(n,r){return n?e(n):(u[t]=r,void e())})},function(n){r(n,u)})}function Pn(n,t){return t in n}function Vn(n,e){var r=Object.create(null),u=Object.create(null);e=e||gn;var i=a(n),o=ct(function(n,o){var c=e.apply(null,n);Pn(r,c)?lt(function(){o.apply(null,r[c])}):Pn(u,c)?u[c].push(o):(u[c]=[o],i.apply(null,n.concat(function(){var n=t(arguments);r[c]=n;var e=u[c];delete u[c];for(var i=0,o=e.length;i<o;i++)e[i].apply(null,n)})))});return o.memo=r,o.unmemoized=n,o}function qn(n,e,r){r=r||m;var u=d(e)?[]:{};n(e,function(n,e,r){a(n)(function(n,i){arguments.length>2&&(i=t(arguments,1)),u[e]=i,r(n)})},function(n){r(n,u)})}function Dn(n,t){qn(Ie,n,t)}function Rn(n,t,e){qn(z(t),n,e)}function Cn(n,t){if(t=g(t||m),!Vt(n))return t(new TypeError("First argument to race must be an array of functions"));if(!n.length)return t();for(var e=0,r=n.length;e<r;e++)a(n[e])(t)}function $n(n,e,r,u){var i=t(n).reverse();dn(i,e,r,u)}function Wn(n){var e=a(n);return ct(function(n,r){return n.push(function(n,e){if(n)r(null,{error:n});else{var u;u=arguments.length<=2?e:t(arguments,1),r(null,{value:u})}}),e.apply(this,n)})}function Nn(n){var t;return Vt(n)?t=K(n,Wn):(t={},N(n,function(n,e){t[e]=Wn.call(this,n)})),t}function Qn(n,t,e,r){Mn(n,t,function(n,t){e(n,function(n,e){t(n,!e)})},r)}function Gn(n){return function(){return n}}function Hn(n,t,e){function r(n,t){if("object"==typeof t)n.times=+t.times||i,n.intervalFunc="function"==typeof t.interval?t.interval:Gn(+t.interval||o),n.errorFilter=t.errorFilter;else{if("number"!=typeof t&&"string"!=typeof t)throw new Error("Invalid arguments for async.retry");n.times=+t||i}}function u(){f(function(n){n&&l++<c.times&&("function"!=typeof c.errorFilter||c.errorFilter(n))?setTimeout(u,c.intervalFunc(l)):e.apply(null,arguments)})}var i=5,o=0,c={times:i,intervalFunc:Gn(o)};if(arguments.length<3&&"function"==typeof n?(e=t||m,t=n):(r(c,n),e=e||m),"function"!=typeof t)throw new Error("Invalid arguments for async.retry");var f=a(t),l=1;u()}function Jn(n,t){qn(Or,n,t)}function Kn(n,t,e){function r(n,t){var e=n.criteria,r=t.criteria;return e<r?-1:e>r?1:0}var u=a(t);_e(n,function(n,t){u(n,function(e,r){return e?t(e):void t(null,{value:n,criteria:r})})},function(n,t){return n?e(n):void e(null,K(t.sort(r),Fn("value")))})}function Xn(n,t,e){var r=a(n);return ct(function(u,i){function o(){var t=n.name||"anonymous",r=new Error('Callback function "'+t+'" timed out.');r.code="ETIMEDOUT",e&&(r.info=e),f=!0,i(r)}var c,f=!1;u.push(function(){f||(i.apply(null,arguments),clearTimeout(c))}),c=setTimeout(o,t),r.apply(null,u)})}function Yn(n,t,e,r){for(var u=-1,i=iu(uu((t-n)/(e||1)),0),o=Array(i);i--;)o[r?i:++u]=n,n+=e;return o}function Zn(n,t,e,r){var u=a(e);Ue(Yn(0,n,1),t,u,r)}function nt(n,t,e,r){arguments.length<=3&&(r=e,e=t,t=Vt(n)?[]:{}),r=g(r||m);var u=a(e);Ie(n,function(n,e,r){u(t,n,e,r)},function(n){r(n,t)})}function tt(n,e){var r,u=null;e=e||m,Ur(n,function(n,e){a(n)(function(n,i){r=arguments.length>2?t(arguments,1):i,u=n,e(!n)})},function(){e(u,r)})}function et(n){return function(){return(n.unmemoized||n).apply(null,arguments)}}function rt(n,e,r){r=U(r||m);var u=a(e);if(!n())return r(null);var i=function(e){if(e)return r(e);if(n())return u(i);var o=t(arguments,1);r.apply(null,[null].concat(o))};u(i)}function ut(n,t,e){rt(function(){return!n.apply(this,arguments)},t,e)}var it,ot=function(n){var e=t(arguments,1);return function(){var r=t(arguments);return n.apply(null,e.concat(r))}},ct=function(n){return function(){var e=t(arguments),r=e.pop();n.call(this,e,r)}},ft="function"==typeof setImmediate&&setImmediate,at="object"==typeof process&&"function"==typeof process.nextTick;it=ft?setImmediate:at?process.nextTick:r;var lt=u(it),st="function"==typeof Symbol,pt="object"==typeof global&&global&&global.Object===Object&&global,ht="object"==typeof self&&self&&self.Object===Object&&self,yt=pt||ht||Function("return this")(),vt=yt.Symbol,dt=Object.prototype,mt=dt.hasOwnProperty,gt=dt.toString,bt=vt?vt.toStringTag:void 0,jt=Object.prototype,St=jt.toString,kt="[object Null]",Lt="[object Undefined]",Ot=vt?vt.toStringTag:void 0,wt="[object AsyncFunction]",xt="[object Function]",Et="[object GeneratorFunction]",At="[object Proxy]",Tt=9007199254740991,Bt={},Ft="function"==typeof Symbol&&Symbol.iterator,It=function(n){return Ft&&n[Ft]&&n[Ft]()},_t="[object Arguments]",Mt=Object.prototype,Ut=Mt.hasOwnProperty,zt=Mt.propertyIsEnumerable,Pt=S(function(){return arguments}())?S:function(n){return j(n)&&Ut.call(n,"callee")&&!zt.call(n,"callee")},Vt=Array.isArray,qt="object"==typeof n&&n&&!n.nodeType&&n,Dt=qt&&"object"==typeof module&&module&&!module.nodeType&&module,Rt=Dt&&Dt.exports===qt,Ct=Rt?yt.Buffer:void 0,$t=Ct?Ct.isBuffer:void 0,Wt=$t||k,Nt=9007199254740991,Qt=/^(?:0|[1-9]\d*)$/,Gt="[object Arguments]",Ht="[object Array]",Jt="[object Boolean]",Kt="[object Date]",Xt="[object Error]",Yt="[object Function]",Zt="[object Map]",ne="[object Number]",te="[object Object]",ee="[object RegExp]",re="[object Set]",ue="[object String]",ie="[object WeakMap]",oe="[object ArrayBuffer]",ce="[object DataView]",fe="[object Float32Array]",ae="[object Float64Array]",le="[object Int8Array]",se="[object Int16Array]",pe="[object Int32Array]",he="[object Uint8Array]",ye="[object Uint8ClampedArray]",ve="[object Uint16Array]",de="[object Uint32Array]",me={};me[fe]=me[ae]=me[le]=me[se]=me[pe]=me[he]=me[ye]=me[ve]=me[de]=!0,me[Gt]=me[Ht]=me[oe]=me[Jt]=me[ce]=me[Kt]=me[Xt]=me[Yt]=me[Zt]=me[ne]=me[te]=me[ee]=me[re]=me[ue]=me[ie]=!1;var ge="object"==typeof n&&n&&!n.nodeType&&n,be=ge&&"object"==typeof module&&module&&!module.nodeType&&module,je=be&&be.exports===ge,Se=je&&pt.process,ke=function(){try{return Se&&Se.binding&&Se.binding("util")}catch(n){}}(),Le=ke&&ke.isTypedArray,Oe=Le?w(Le):O,we=Object.prototype,xe=we.hasOwnProperty,Ee=Object.prototype,Ae=A(Object.keys,Object),Te=Object.prototype,Be=Te.hasOwnProperty,Fe=V(P,1/0),Ie=function(n,t,e){var r=d(n)?q:Fe;r(n,a(t),e)},_e=D(R),Me=l(_e),Ue=C(R),ze=V(Ue,1),Pe=l(ze),Ve=W(),qe=function(n,e,r){function u(n,t){j.push(function(){f(n,t)})}function i(){if(0===j.length&&0===v)return r(null,y);for(;j.length&&v<e;){var n=j.shift();n()}}function o(n,t){var e=b[n];e||(e=b[n]=[]),e.push(t)}function c(n){var t=b[n]||[];$(t,function(n){n()}),i()}function f(n,e){if(!d){var u=U(function(e,u){if(v--,arguments.length>2&&(u=t(arguments,1)),e){var i={};N(y,function(n,t){i[t]=n}),i[n]=u,d=!0,b=Object.create(null),r(e,i)}else y[n]=u,c(n)});v++;var i=a(e[e.length-1]);e.length>1?i(y,u):i(u)}}function l(){for(var n,t=0;S.length;)n=S.pop(),t++,$(s(n),function(n){0===--k[n]&&S.push(n)});if(t!==h)throw new Error("async.auto cannot execute tasks due to a recursive dependency")}function s(t){var e=[];return N(n,function(n,r){Vt(n)&&J(n,t,0)>=0&&e.push(r)}),e}"function"==typeof e&&(r=e,e=null),r=g(r||m);var p=B(n),h=p.length;if(!h)return r(null);e||(e=h);var y={},v=0,d=!1,b=Object.create(null),j=[],S=[],k={};N(n,function(t,e){if(!Vt(t))return u(e,[t]),void S.push(e);var r=t.slice(0,t.length-1),i=r.length;return 0===i?(u(e,t),void S.push(e)):(k[e]=i,void $(r,function(c){if(!n[c])throw new Error("async.auto task `"+e+"` has a non-existent dependency `"+c+"` in "+r.join(", "));o(c,function(){i--,0===i&&u(e,t)})}))}),l(),i()},De="[object Symbol]",Re=1/0,Ce=vt?vt.prototype:void 0,$e=Ce?Ce.toString:void 0,We="\\ud800-\\udfff",Ne="\\u0300-\\u036f",Qe="\\ufe20-\\ufe2f",Ge="\\u20d0-\\u20ff",He=Ne+Qe+Ge,Je="\\ufe0e\\ufe0f",Ke="\\u200d",Xe=RegExp("["+Ke+We+He+Je+"]"),Ye="\\ud800-\\udfff",Ze="\\u0300-\\u036f",nr="\\ufe20-\\ufe2f",tr="\\u20d0-\\u20ff",er=Ze+nr+tr,rr="\\ufe0e\\ufe0f",ur="["+Ye+"]",ir="["+er+"]",or="\\ud83c[\\udffb-\\udfff]",cr="(?:"+ir+"|"+or+")",fr="[^"+Ye+"]",ar="(?:\\ud83c[\\udde6-\\uddff]){2}",lr="[\\ud800-\\udbff][\\udc00-\\udfff]",sr="\\u200d",pr=cr+"?",hr="["+rr+"]?",yr="(?:"+sr+"(?:"+[fr,ar,lr].join("|")+")"+hr+pr+")*",vr=hr+pr+yr,dr="(?:"+[fr+ir+"?",ir,ar,lr,ur].join("|")+")",mr=RegExp(or+"(?="+or+")|"+dr+vr,"g"),gr=/^\s+|\s+$/g,br=/^(?:async\s+)?(function)?\s*[^\(]*\(\s*([^\)]*)\)/m,jr=/,/,Sr=/(=.+)?(\s*)$/,kr=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;pn.prototype.removeLink=function(n){return n.prev?n.prev.next=n.next:this.head=n.next,n.next?n.next.prev=n.prev:this.tail=n.prev,n.prev=n.next=null,this.length-=1,n},pn.prototype.empty=function(){for(;this.head;)this.shift();return this},pn.prototype.insertAfter=function(n,t){t.prev=n,t.next=n.next,n.next?n.next.prev=t:this.tail=t,n.next=t,this.length+=1},pn.prototype.insertBefore=function(n,t){t.prev=n.prev,t.next=n,n.prev?n.prev.next=t:this.head=t,n.prev=t,this.length+=1},pn.prototype.unshift=function(n){this.head?this.insertBefore(this.head,n):hn(this,n)},pn.prototype.push=function(n){this.tail?this.insertAfter(this.tail,n):hn(this,n)},pn.prototype.shift=function(){return this.head&&this.removeLink(this.head)},pn.prototype.pop=function(){return this.tail&&this.removeLink(this.tail)},pn.prototype.toArray=function(){for(var n=Array(this.length),t=this.head,e=0;e<this.length;e++)n[e]=t.data,t=t.next;return n},pn.prototype.remove=function(n){for(var t=this.head;t;){var e=t.next;n(t)&&this.removeLink(t),t=e}return this};var Lr,Or=V(P,1),wr=function(){return mn.apply(null,t(arguments).reverse())},xr=Array.prototype.concat,Er=function(n,e,r,u){u=u||m;var i=a(r);Ue(n,e,function(n,e){i(n,function(n){return n?e(n):e(null,t(arguments,1))})},function(n,t){for(var e=[],r=0;r<t.length;r++)t[r]&&(e=xr.apply(e,t[r]));return u(n,e)})},Ar=V(Er,1/0),Tr=V(Er,1),Br=function(){var n=t(arguments),e=[null].concat(n);return function(){var n=arguments[arguments.length-1];return n.apply(this,e)}},Fr=D(bn(gn,jn)),Ir=C(bn(gn,jn)),_r=V(Ir,1),Mr=Sn("dir"),Ur=V(An,1),zr=D(bn(Bn,Bn)),Pr=C(bn(Bn,Bn)),Vr=V(Pr,1),qr=D(Mn),Dr=C(Mn),Rr=V(Dr,1),Cr=function(n,t,e,r){r=r||m;var u=a(e);Ue(n,t,function(n,t){u(n,function(e,r){return e?t(e):t(null,{key:r,val:n})})},function(n,t){for(var e={},u=Object.prototype.hasOwnProperty,i=0;i<t.length;i++)if(t[i]){var o=t[i].key,c=t[i].val;u.call(e,o)?e[o].push(c):e[o]=[c]}return r(n,e)})},$r=V(Cr,1/0),Wr=V(Cr,1),Nr=Sn("log"),Qr=V(zn,1/0),Gr=V(zn,1);Lr=at?process.nextTick:ft?setImmediate:r;var Hr=u(Lr),Jr=function(n,t){var e=a(n);return yn(function(n,t){e(n[0],t)},t,1)},Kr=function(n,t){var e=Jr(n,t);return e.push=function(n,t,r){if(null==r&&(r=m),"function"!=typeof r)throw new Error("task callback must be a function");if(e.started=!0,Vt(n)||(n=[n]),0===n.length)return lt(function(){e.drain()});t=t||0;for(var u=e._tasks.head;u&&t>=u.priority;)u=u.next;for(var i=0,o=n.length;i<o;i++){var c={data:n[i],priority:t,callback:r};u?e._tasks.insertBefore(u,c):e._tasks.push(c)}lt(e.process)},delete e.unshift,e},Xr=D(Qn),Yr=C(Qn),Zr=V(Yr,1),nu=function(n,t){t||(t=n,n=null);var e=a(t);return ct(function(t,r){function u(n){e.apply(null,t.concat(n))}n?Hn(n,u,r):Hn(u,r)})},tu=D(bn(Boolean,gn)),eu=C(bn(Boolean,gn)),ru=V(eu,1),uu=Math.ceil,iu=Math.max,ou=V(Zn,1/0),cu=V(Zn,1),fu=function(n,e){function r(t){var e=a(n[i++]);t.push(U(u)),e.apply(null,t)}function u(u){return u||i===n.length?e.apply(null,arguments):void r(t(arguments,1))}if(e=g(e||m),!Vt(n))return e(new Error("First argument to waterfall must be an array of functions"));if(!n.length)return e();var i=0;r([])},au={apply:ot,applyEach:Me,applyEachSeries:Pe,asyncify:i,auto:qe,autoInject:sn,cargo:vn,compose:wr,concat:Ar,concatLimit:Er,concatSeries:Tr,constant:Br,detect:Fr,detectLimit:Ir,detectSeries:_r,dir:Mr,doDuring:kn,doUntil:On,doWhilst:Ln,during:wn,each:En,eachLimit:An,eachOf:Ie,eachOfLimit:P,eachOfSeries:Or,eachSeries:Ur,ensureAsync:Tn,every:zr,everyLimit:Pr,everySeries:Vr,filter:qr,filterLimit:Dr,filterSeries:Rr,forever:Un,groupBy:$r,groupByLimit:Cr,groupBySeries:Wr,log:Nr,map:_e,mapLimit:Ue,mapSeries:ze,mapValues:Qr,mapValuesLimit:zn,mapValuesSeries:Gr,memoize:Vn,nextTick:Hr,parallel:Dn,parallelLimit:Rn,priorityQueue:Kr,queue:Jr,race:Cn,reduce:dn,reduceRight:$n,reflect:Wn,reflectAll:Nn,reject:Xr,rejectLimit:Yr,rejectSeries:Zr,retry:Hn,retryable:nu,seq:mn,series:Jn,setImmediate:lt,some:tu,someLimit:eu,someSeries:ru,sortBy:Kn,timeout:Xn,times:ou,timesLimit:Zn,timesSeries:cu,transform:nt,tryEach:tt,unmemoize:et,until:ut,waterfall:fu,whilst:rt,all:zr,allLimit:Pr,allSeries:Vr,any:tu,anyLimit:eu,anySeries:ru,find:Fr,findLimit:Ir,findSeries:_r,forEach:En,forEachSeries:Ur,forEachLimit:An,forEachOf:Ie,forEachOfSeries:Or,forEachOfLimit:P,inject:dn,foldl:dn,foldr:$n,select:qr,selectLimit:Dr,selectSeries:Rr,wrapSync:i};n.default=au,n.apply=ot,n.applyEach=Me,n.applyEachSeries=Pe,n.asyncify=i,n.auto=qe,n.autoInject=sn,n.cargo=vn,n.compose=wr,n.concat=Ar,n.concatLimit=Er,n.concatSeries=Tr,n.constant=Br,n.detect=Fr,n.detectLimit=Ir,n.detectSeries=_r,n.dir=Mr,n.doDuring=kn,n.doUntil=On,n.doWhilst=Ln,n.during=wn,n.each=En,n.eachLimit=An,n.eachOf=Ie,n.eachOfLimit=P,n.eachOfSeries=Or,n.eachSeries=Ur,n.ensureAsync=Tn,n.every=zr,n.everyLimit=Pr,n.everySeries=Vr,n.filter=qr,n.filterLimit=Dr,n.filterSeries=Rr,n.forever=Un,n.groupBy=$r,n.groupByLimit=Cr,n.groupBySeries=Wr,n.log=Nr,n.map=_e,n.mapLimit=Ue,n.mapSeries=ze,n.mapValues=Qr,n.mapValuesLimit=zn,n.mapValuesSeries=Gr,n.memoize=Vn,n.nextTick=Hr,n.parallel=Dn,n.parallelLimit=Rn,n.priorityQueue=Kr,n.queue=Jr,n.race=Cn,n.reduce=dn,n.reduceRight=$n,n.reflect=Wn,n.reflectAll=Nn,n.reject=Xr,n.rejectLimit=Yr,n.rejectSeries=Zr,n.retry=Hn,n.retryable=nu,n.seq=mn,n.series=Jn,n.setImmediate=lt,n.some=tu,n.someLimit=eu,n.someSeries=ru,n.sortBy=Kn,n.timeout=Xn,n.times=ou,n.timesLimit=Zn,n.timesSeries=cu,n.transform=nt,n.tryEach=tt,n.unmemoize=et,n.until=ut,n.waterfall=fu,n.whilst=rt,n.all=zr,n.allLimit=Pr,n.allSeries=Vr,n.any=tu,n.anyLimit=eu,n.anySeries=ru,n.find=Fr,n.findLimit=Ir,n.findSeries=_r,n.forEach=En,n.forEachSeries=Ur,n.forEachLimit=An,n.forEachOf=Ie,n.forEachOfSeries=Or,n.forEachOfLimit=P,n.inject=dn,n.foldl=dn,n.foldr=$n,n.select=qr,n.selectLimit=Dr,n.selectSeries=Rr,n.wrapSync=i,Object.defineProperty(n,"__esModule",{value:!0})});
//# sourceMappingURL=async.min.map
/*****************************/
var n3xt = function(scene) {
    return new N3xt(scene);
};

class N3xt {
    constructor(scene) {
        this.drawing = new n3xt.Drawing([], scene);
        this.scene = scene;
    }

    animate() {
        this.drawing.updateScene();
    }

    add(element) {
        this.drawing.add(element);
    }

}

var tests = [];
/*****************************/
n3xt.functions = {};

n3xt.functions.guid = function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

n3xt.namespace = function(namespace) {
  if(namespace) namespace;
  return {};
}
/*****************************/
n3xt.Element = class {
    constructor(model=null, position=new n3xt.Position()) {
        this.model = model;
        this.position = position;
        this.id = n3xt.functions.guid();
        this.group = null;
        this.status = n3xt.elementStatus.stale; 
        this.name = "Generic Element";
    }


    fetch3D(done) {
        var self = this;
        var geometries = self.geometries;

        async.map(geometries, function(geometry, callback){
            geometry.instantiate(self.model, function(threeObj) {
                callback(null, threeObj);
            });
        }, function(err, result) {
            done(result);
        });
    }

    get geometries() {
        return [];
    }

    remove() {
        if(this.group) this.group.remove(this);
    }

    invalidate() {
        if(this.group) this.group.invalidate(this);
    }
}

n3xt.elementStatus = {
    stale: -1,
    processing: 0,
    valid: 1
}
/*****************************/
n3xt.Position = class {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.yaw = 0;
    }
}
/*****************************/
n3xt.Group = class {
    constructor(elements=[]) { 
        this.index = {};
        elements.forEach(function(element) {
            this.add(element);
        });
    }

    add(element) {
        this.index[element.id] = element;
        element.group = this;
        this.onAdded(element);
    }

    onAdded(element) { }

    remove(element) {
        this.removeById(element.id);
    }
    
    removeById(id) {
        var element = this.index[id];
        if(element) {
            delete this[id];
            element.group = null;
            this.onRemoved(element);
        }
    }

    onRemoved(element) { }
}
/*****************************/
n3xt.Drawing = class extends n3xt.Group {
    constructor(elements, scene) {
        super(elements);
        this.scene = scene;

        this.stalePool = [];
        this.processing = [];
    }

    updateScene() {
        var staleElements = [];

        var index = this.index;
        var scene = this.scene;

        this.stalePool.forEach(function(id){
            var element = index[id];
            if(element) {
                staleElements.push(element);
            }
        });

        async.map(staleElements, this.fetchElement3D, function(err, result) {
            result.forEach(function(info) {
                info.forEach(function(item){
                    if(item.old3D) scene.remove(item.old3D);
                    item.element.threeObj = item.new3D;
                    scene.add(item.new3D);
                    item.element.status = n3xt.elementStatus.valid;
                });
            });
        });
        this.updateStatus();
    }

    fetchElement3D(element, callback) {
        
        element.fetch3D(function(threeObjs){
            var info = [];
            threeObjs.forEach(function(threeObj) {
                threeObj.n3xtID = element.id;
                info.push({
                    element: element,
                    old3D: element.threeObj,
                    new3D: threeObj
                });
            });
            callback(null, info);
        });
    }

    updateStatus() {
        var pool = this.stalePool;
        var index = this.index;

        pool.forEach(function(id) {
            pool.pop(id);
            var element = index[id];
            if(element) {
                element.status = n3xt.elementStatus.processing;
            }
        });
    }

    cleanupStale3D() {
        var pool = this.stalePool;
        var index = this.index;
        var scene = this.scene;
        
        this.scene.traverse(function(child){
            if(pool.indexOf(child.n3xtID) != -1) {
                var element = index[child.n3xtID];
                if(element) scene.remove(element);
            }
        });
    }

    

    removeFromStalePool(element) {
        this.stalePool.pop(element.id);
    }

    invalidate(element) {
        element.status = n3xt.elementStatus.stale;
        this.stalePool.push(element.id);
    }



    /************ syncing with THREE.js scene ************ */
    onAdded(element) {
        this.invalidate(element);
    }

    onRemoved(element) {
        this.removeFromStalePool(element);
    }
}
/*****************************/
n3xt.TestElement = class extends n3xt.Element {
    constructor(model = {
        radius: 2
    }) { super(model); }

    fetch3D(done) {
        var geometry = new THREE.SphereGeometry( this.model.radius, 32, 32 );
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        var sphere = new THREE.Mesh( geometry, material );

        done(sphere);
    }
}
/*****************************/
n3xt.Material = class {
    constructor() {
        this.textureMapUrl = "textures/test/checkerboard.jpg";
        this.bumpMapUrl = "";
        this.roughness = 0.8;
        this.color = 0xffffff;
        this.metalness = 0.2;
        this.bumpScale = 0.0005;
        this.repeatX = 1;
        this.repeatY = 1;
    }

    threeMaterial(uvScale, done) {
        n3xt.textureMaterial(this, uvScale, done);
    }
}

n3xt.setMaterial = function(node, map) {
    if(node instanceof THREE.Mesh) {
        if(map && map[node.name]) {
            node.material = map[node.name];
        }
        //TODO: do this somewhere else
        node.castShadow = true;
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        n3xt.setMaterial(node.children[i], map);
      }
    }
}

n3xt.textureMaterial = function(definition, uvScale, done) {
    var material = new THREE.MeshStandardMaterial( {
        roughness: definition.roughness,
        color: definition.color,
        metalness: definition.metalness,
        bumpScale: definition.bumpScale
    });

    var textureLoader = new THREE.TextureLoader();
    textureLoader.load( definition.textureMapUrl, function( map ) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set( definition.repeatX / uvScale, definition.repeatY / uvScale );
        material.map = map;
        material.needsUpdate = true;

        if(!definition.bumpMapUrl) done(material);
        else {
            textureLoader.load( definition.bumpMapUrl, function( map ) {
                map.wrapS = THREE.RepeatWrapping;
                map.wrapT = THREE.RepeatWrapping;
                map.anisotropy = 4;
                map.repeat.set( definition.repeatX / uvScale, definition.repeatY / uvScale );
                material.bumpMap = map;
                material.needsUpdate = true;

                if(!definition.roughnessMapUrl) done(material);
                else {
                    textureLoader.load( definition.roughnessMapUrl, function( map ) {
                        map.wrapS = THREE.RepeatWrapping;
                        map.wrapT = THREE.RepeatWrapping;
                        map.anisotropy = 4;
                        map.repeat.set( definition.repeatX / uvScale, definition.repeatY / uvScale );
                        material.roughnessMap = map;
                        material.needsUpdate = true;
                        $next.materials.hardwood = floorMat;
    
                        done(material);
                    });
                }
            });
        }

    });
}
/*****************************/
n3xt.Geometry = class {
    constructor() {
        this.uvScale = 1;
    }

    instantiate(model, done) {
        done(null);
    }
}

n3xt.ExternalGeometry = class extends n3xt.Geometry {
    constructor() {
        super();
        this.url = "";
        this.materialMap = {
            layerName: new n3xt.Material()
        };
    }

    //use this to have different layer names here than what's in the the 3d file
    layerAlias(friendlyName) {
        return friendlyName;
    }

    instantiate(model, done) {
        console.log(model, "modis");
        var self = this;
        self.instantiateMaterialMap(function(threeMaterialMap) {
            self.import(self.url, function(meshes) {
                n3xt.setMaterial(meshes, threeMaterialMap);
                done(meshes);
            });
        });
    }

    instantiateMaterialMap(done) {
        var self = this;
        var keys = Object.keys(self.materialMap);
        var threeMaterialMap = { };
        async.map(keys, function(key, done) {
            var n3xtMaterial = self.materialMap[key];
            n3xtMaterial.threeMaterial(self.uvScale, function(threeMaterial) {
                done(null, {
                    key: key,
                    threeMaterial: threeMaterial,
                    n3xtMaterial: n3xtMaterial
                });
            });
        }, function(err, materialInfo) {
            materialInfo.forEach(function(info) {
                threeMaterialMap[info.key] = info.threeMaterial;
            });
            done(threeMaterialMap);
        });
    }

    import(fileUrl, callback) {
        if (fileUrl.indexOf(".obj") >= 0) {
            // instantiate a loader
            var loader = new THREE.OBJLoader();
    
            // load a resource
            loader.load(
                // resource URL
                fileUrl,
                // Function when resource is loaded
                callback
            );
        }
        else if(fileUrl.indexOf(".dae") >= 0) {
            var loader = new THREE.ColladaLoader();
            loader.load(fileUrl, function(result) {
                callback(result.scene);
            });
        } else {
            callback(null);
        }
    }
}
/*****************************/
var gunlocke = n3xt.namespace(gunlocke);

gunlocke.TypicalZero = class extends n3xt.Element {
    constructor(model) {
        super(model);
        this.name = "Gunlocke Typical Zero";
    }

    get geometries() {
        console.log("passoqui");
        return [
            new gunlocke.TypicalZeroGeometry()
        ];
    }
}

gunlocke.TypicalZeroGeometry = class extends n3xt.ExternalGeometry {
    constructor() {
        super();
        this.url = "3d/test-02-3ds.dae";
        this.uvScale = 3.5;

        var layerMap = {
            grometBorder: " Extrusion [4678]",
            grometLid: " Extrusion [4821]",
            tvFrame: " Extrusion [5154]",
            tvScreen: " Extrusion [5555]",
            tableTop: " Joined Solid Geometry [3927]",
            tableTray: " Extrusion [4360]"
        };


        this.materialMap = { };
        this.materialMap[layerMap.tableTop] = new n3xt.Material();
        this.materialMap[layerMap.tvFrame] = new n3xt.Material();
        this.materialMap[layerMap.tvScreen] = new n3xt.Material();
        this.materialMap[layerMap.grometBorder] = new n3xt.Material();
        this.materialMap[layerMap.grometLid] = new n3xt.Material();
    }
}

tests.push(function(engine) {
    console.log("passokitoo");
    engine.add(new gunlocke.TypicalZero({}));
});