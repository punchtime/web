!function t(e,n,r){function i(a,u){if(!n[a]){if(!e[a]){var s="function"==typeof require&&require;if(!u&&s)return s(a,!0);if(o)return o(a,!0);throw new Error("Cannot find module '"+a+"'")}var f=n[a]={exports:{}};e[a][0].call(f.exports,function(t){var n=e[a][1][t];return i(n?n:t)},f,f.exports,t,e,n,r)}return n[a].exports}for(var o="function"==typeof require&&require,a=0;a<r.length;a++)i(r[a]);return i}({1:[function(t,e,n){(function(t,e,r,i,o,a,u,s,f){var l="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";!function(t){"use strict";function e(t){var e=t.charCodeAt(0);return e===o||e===c?62:e===a||e===h?63:u>e?-1:u+10>e?e-u+26+26:f+26>e?e-f:s+26>e?e-s+26:void 0}function n(t){function n(t){f[c++]=t}var r,o,a,u,s,f;if(t.length%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var l=t.length;s="="===t.charAt(l-2)?2:"="===t.charAt(l-1)?1:0,f=new i(3*t.length/4-s),a=s>0?t.length-4:t.length;var c=0;for(r=0,o=0;a>r;r+=4,o+=3)u=e(t.charAt(r))<<18|e(t.charAt(r+1))<<12|e(t.charAt(r+2))<<6|e(t.charAt(r+3)),n((16711680&u)>>16),n((65280&u)>>8),n(255&u);return 2===s?(u=e(t.charAt(r))<<2|e(t.charAt(r+1))>>4,n(255&u)):1===s&&(u=e(t.charAt(r))<<10|e(t.charAt(r+1))<<4|e(t.charAt(r+2))>>2,n(u>>8&255),n(255&u)),f}function r(t){function e(t){return l.charAt(t)}function n(t){return e(t>>18&63)+e(t>>12&63)+e(t>>6&63)+e(63&t)}var r,i,o,a=t.length%3,u="";for(r=0,o=t.length-a;o>r;r+=3)i=(t[r]<<16)+(t[r+1]<<8)+t[r+2],u+=n(i);switch(a){case 1:i=t[t.length-1],u+=e(i>>2),u+=e(i<<4&63),u+="==";break;case 2:i=(t[t.length-2]<<8)+t[t.length-1],u+=e(i>>10),u+=e(i>>4&63),u+=e(i<<2&63),u+="="}return u}var i="undefined"!=typeof Uint8Array?Uint8Array:Array,o="+".charCodeAt(0),a="/".charCodeAt(0),u="0".charCodeAt(0),s="a".charCodeAt(0),f="A".charCodeAt(0),c="-".charCodeAt(0),h="_".charCodeAt(0);t.toByteArray=n,t.fromByteArray=r}("undefined"==typeof n?this.base64js={}:n)}).call(this,t("rH1JPG"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},t("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/base64-js/lib/b64.js","/../../node_modules/base64-js/lib")},{buffer:2,rH1JPG:4}],2:[function(t,e,n){(function(e,r,i,o,a,u,s,f,l){function i(t,e,n){if(!(this instanceof i))return new i(t,e,n);var r=typeof t;if("base64"===e&&"string"===r)for(t=N(t);t.length%4!==0;)t+="=";var o;if("number"===r)o=P(t);else if("string"===r)o=i.byteLength(t,e);else{if("object"!==r)throw new Error("First argument needs to be a number, array or string.");o=P(t.length)}var a;i._useTypedArrays?a=i._augment(new Uint8Array(o)):(a=this,a.length=o,a._isBuffer=!0);var u;if(i._useTypedArrays&&"number"==typeof t.byteLength)a._set(t);else if(J(t))for(u=0;o>u;u++)i.isBuffer(t)?a[u]=t.readUInt8(u):a[u]=t[u];else if("string"===r)a.write(t,0,e);else if("number"===r&&!i._useTypedArrays&&!n)for(u=0;o>u;u++)a[u]=0;return a}function c(t,e,n,r){n=Number(n)||0;var o=t.length-n;r?(r=Number(r),r>o&&(r=o)):r=o;var a=e.length;Q(a%2===0,"Invalid hex string"),r>a/2&&(r=a/2);for(var u=0;r>u;u++){var s=parseInt(e.substr(2*u,2),16);Q(!isNaN(s),"Invalid hex string"),t[n+u]=s}return i._charsWritten=2*u,u}function h(t,e,n,r){var o=i._charsWritten=W(G(e),t,n,r);return o}function d(t,e,n,r){var o=i._charsWritten=W(Y(e),t,n,r);return o}function g(t,e,n,r){return d(t,e,n,r)}function p(t,e,n,r){var o=i._charsWritten=W(O(e),t,n,r);return o}function m(t,e,n,r){var o=i._charsWritten=W(z(e),t,n,r);return o}function y(t,e,n){return 0===e&&n===t.length?V.fromByteArray(t):V.fromByteArray(t.slice(e,n))}function w(t,e,n){var r="",i="";n=Math.min(t.length,n);for(var o=e;n>o;o++)t[o]<=127?(r+=q(i)+String.fromCharCode(t[o]),i=""):i+="%"+t[o].toString(16);return r+q(i)}function v(t,e,n){var r="";n=Math.min(t.length,n);for(var i=e;n>i;i++)r+=String.fromCharCode(t[i]);return r}function b(t,e,n){return v(t,e,n)}function E(t,e,n){var r=t.length;(!e||0>e)&&(e=0),(!n||0>n||n>r)&&(n=r);for(var i="",o=e;n>o;o++)i+=H(t[o]);return i}function I(t,e,n){for(var r=t.slice(e,n),i="",o=0;o<r.length;o+=2)i+=String.fromCharCode(r[o]+256*r[o+1]);return i}function B(t,e,n,r){r||(Q("boolean"==typeof n,"missing or invalid endian"),Q(void 0!==e&&null!==e,"missing offset"),Q(e+1<t.length,"Trying to read beyond buffer length"));var i=t.length;if(!(e>=i)){var o;return n?(o=t[e],i>e+1&&(o|=t[e+1]<<8)):(o=t[e]<<8,i>e+1&&(o|=t[e+1])),o}}function A(t,e,n,r){r||(Q("boolean"==typeof n,"missing or invalid endian"),Q(void 0!==e&&null!==e,"missing offset"),Q(e+3<t.length,"Trying to read beyond buffer length"));var i=t.length;if(!(e>=i)){var o;return n?(i>e+2&&(o=t[e+2]<<16),i>e+1&&(o|=t[e+1]<<8),o|=t[e],i>e+3&&(o+=t[e+3]<<24>>>0)):(i>e+1&&(o=t[e+1]<<16),i>e+2&&(o|=t[e+2]<<8),i>e+3&&(o|=t[e+3]),o+=t[e]<<24>>>0),o}}function x(t,e,n,r){r||(Q("boolean"==typeof n,"missing or invalid endian"),Q(void 0!==e&&null!==e,"missing offset"),Q(e+1<t.length,"Trying to read beyond buffer length"));var i=t.length;if(!(e>=i)){var o=B(t,e,n,!0),a=32768&o;return a?-1*(65535-o+1):o}}function k(t,e,n,r){r||(Q("boolean"==typeof n,"missing or invalid endian"),Q(void 0!==e&&null!==e,"missing offset"),Q(e+3<t.length,"Trying to read beyond buffer length"));var i=t.length;if(!(e>=i)){var o=A(t,e,n,!0),a=2147483648&o;return a?-1*(4294967295-o+1):o}}function _(t,e,n,r){return r||(Q("boolean"==typeof n,"missing or invalid endian"),Q(e+3<t.length,"Trying to read beyond buffer length")),Z.read(t,e,n,23,4)}function L(t,e,n,r){return r||(Q("boolean"==typeof n,"missing or invalid endian"),Q(e+7<t.length,"Trying to read beyond buffer length")),Z.read(t,e,n,52,8)}function T(t,e,n,r,i){i||(Q(void 0!==e&&null!==e,"missing value"),Q("boolean"==typeof r,"missing or invalid endian"),Q(void 0!==n&&null!==n,"missing offset"),Q(n+1<t.length,"trying to write beyond buffer length"),R(e,65535));var o=t.length;if(!(n>=o))for(var a=0,u=Math.min(o-n,2);u>a;a++)t[n+a]=(e&255<<8*(r?a:1-a))>>>8*(r?a:1-a)}function U(t,e,n,r,i){i||(Q(void 0!==e&&null!==e,"missing value"),Q("boolean"==typeof r,"missing or invalid endian"),Q(void 0!==n&&null!==n,"missing offset"),Q(n+3<t.length,"trying to write beyond buffer length"),R(e,4294967295));var o=t.length;if(!(n>=o))for(var a=0,u=Math.min(o-n,4);u>a;a++)t[n+a]=e>>>8*(r?a:3-a)&255}function S(t,e,n,r,i){i||(Q(void 0!==e&&null!==e,"missing value"),Q("boolean"==typeof r,"missing or invalid endian"),Q(void 0!==n&&null!==n,"missing offset"),Q(n+1<t.length,"Trying to write beyond buffer length"),X(e,32767,-32768));var o=t.length;n>=o||(e>=0?T(t,e,n,r,i):T(t,65535+e+1,n,r,i))}function C(t,e,n,r,i){i||(Q(void 0!==e&&null!==e,"missing value"),Q("boolean"==typeof r,"missing or invalid endian"),Q(void 0!==n&&null!==n,"missing offset"),Q(n+3<t.length,"Trying to write beyond buffer length"),X(e,2147483647,-2147483648));var o=t.length;n>=o||(e>=0?U(t,e,n,r,i):U(t,4294967295+e+1,n,r,i))}function F(t,e,n,r,i){i||(Q(void 0!==e&&null!==e,"missing value"),Q("boolean"==typeof r,"missing or invalid endian"),Q(void 0!==n&&null!==n,"missing offset"),Q(n+3<t.length,"Trying to write beyond buffer length"),K(e,3.4028234663852886e38,-3.4028234663852886e38));var o=t.length;n>=o||Z.write(t,e,n,r,23,4)}function M(t,e,n,r,i){i||(Q(void 0!==e&&null!==e,"missing value"),Q("boolean"==typeof r,"missing or invalid endian"),Q(void 0!==n&&null!==n,"missing offset"),Q(n+7<t.length,"Trying to write beyond buffer length"),K(e,1.7976931348623157e308,-1.7976931348623157e308));var o=t.length;n>=o||Z.write(t,e,n,r,52,8)}function N(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}function j(t,e,n){return"number"!=typeof t?n:(t=~~t,t>=e?e:t>=0?t:(t+=e,t>=0?t:0))}function P(t){return t=~~Math.ceil(+t),0>t?0:t}function D(t){return(Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)})(t)}function J(t){return D(t)||i.isBuffer(t)||t&&"object"==typeof t&&"number"==typeof t.length}function H(t){return 16>t?"0"+t.toString(16):t.toString(16)}function G(t){for(var e=[],n=0;n<t.length;n++){var r=t.charCodeAt(n);if(127>=r)e.push(t.charCodeAt(n));else{var i=n;r>=55296&&57343>=r&&n++;for(var o=encodeURIComponent(t.slice(i,n+1)).substr(1).split("%"),a=0;a<o.length;a++)e.push(parseInt(o[a],16))}}return e}function Y(t){for(var e=[],n=0;n<t.length;n++)e.push(255&t.charCodeAt(n));return e}function z(t){for(var e,n,r,i=[],o=0;o<t.length;o++)e=t.charCodeAt(o),n=e>>8,r=e%256,i.push(r),i.push(n);return i}function O(t){return V.toByteArray(t)}function W(t,e,n,r){for(var i=0;r>i&&!(i+n>=e.length||i>=t.length);i++)e[i+n]=t[i];return i}function q(t){try{return decodeURIComponent(t)}catch(e){return String.fromCharCode(65533)}}function R(t,e){Q("number"==typeof t,"cannot write a non-number as a number"),Q(t>=0,"specified a negative value for writing an unsigned value"),Q(e>=t,"value is larger than maximum value for type"),Q(Math.floor(t)===t,"value has a fractional component")}function X(t,e,n){Q("number"==typeof t,"cannot write a non-number as a number"),Q(e>=t,"value larger than maximum allowed value"),Q(t>=n,"value smaller than minimum allowed value"),Q(Math.floor(t)===t,"value has a fractional component")}function K(t,e,n){Q("number"==typeof t,"cannot write a non-number as a number"),Q(e>=t,"value larger than maximum allowed value"),Q(t>=n,"value smaller than minimum allowed value")}function Q(t,e){if(!t)throw new Error(e||"Failed assertion")}var V=t("base64-js"),Z=t("ieee754");n.Buffer=i,n.SlowBuffer=i,n.INSPECT_MAX_BYTES=50,i.poolSize=8192,i._useTypedArrays=function(){try{var t=new ArrayBuffer(0),e=new Uint8Array(t);return e.foo=function(){return 42},42===e.foo()&&"function"==typeof e.subarray}catch(n){return!1}}(),i.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"raw":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},i.isBuffer=function(t){return!(null===t||void 0===t||!t._isBuffer)},i.byteLength=function(t,e){var n;switch(t+="",e||"utf8"){case"hex":n=t.length/2;break;case"utf8":case"utf-8":n=G(t).length;break;case"ascii":case"binary":case"raw":n=t.length;break;case"base64":n=O(t).length;break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":n=2*t.length;break;default:throw new Error("Unknown encoding")}return n},i.concat=function(t,e){if(Q(D(t),"Usage: Buffer.concat(list, [totalLength])\nlist should be an Array."),0===t.length)return new i(0);if(1===t.length)return t[0];var n;if("number"!=typeof e)for(e=0,n=0;n<t.length;n++)e+=t[n].length;var r=new i(e),o=0;for(n=0;n<t.length;n++){var a=t[n];a.copy(r,o),o+=a.length}return r},i.prototype.write=function(t,e,n,r){if(isFinite(e))isFinite(n)||(r=n,n=void 0);else{var i=r;r=e,e=n,n=i}e=Number(e)||0;var o=this.length-e;n?(n=Number(n),n>o&&(n=o)):n=o,r=String(r||"utf8").toLowerCase();var a;switch(r){case"hex":a=c(this,t,e,n);break;case"utf8":case"utf-8":a=h(this,t,e,n);break;case"ascii":a=d(this,t,e,n);break;case"binary":a=g(this,t,e,n);break;case"base64":a=p(this,t,e,n);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":a=m(this,t,e,n);break;default:throw new Error("Unknown encoding")}return a},i.prototype.toString=function(t,e,n){var r=this;if(t=String(t||"utf8").toLowerCase(),e=Number(e)||0,n=void 0!==n?Number(n):n=r.length,n===e)return"";var i;switch(t){case"hex":i=E(r,e,n);break;case"utf8":case"utf-8":i=w(r,e,n);break;case"ascii":i=v(r,e,n);break;case"binary":i=b(r,e,n);break;case"base64":i=y(r,e,n);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":i=I(r,e,n);break;default:throw new Error("Unknown encoding")}return i},i.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},i.prototype.copy=function(t,e,n,r){var o=this;if(n||(n=0),r||0===r||(r=this.length),e||(e=0),r!==n&&0!==t.length&&0!==o.length){Q(r>=n,"sourceEnd < sourceStart"),Q(e>=0&&e<t.length,"targetStart out of bounds"),Q(n>=0&&n<o.length,"sourceStart out of bounds"),Q(r>=0&&r<=o.length,"sourceEnd out of bounds"),r>this.length&&(r=this.length),t.length-e<r-n&&(r=t.length-e+n);var a=r-n;if(100>a||!i._useTypedArrays)for(var u=0;a>u;u++)t[u+e]=this[u+n];else t._set(this.subarray(n,n+a),e)}},i.prototype.slice=function(t,e){var n=this.length;if(t=j(t,n,0),e=j(e,n,n),i._useTypedArrays)return i._augment(this.subarray(t,e));for(var r=e-t,o=new i(r,void 0,!0),a=0;r>a;a++)o[a]=this[a+t];return o},i.prototype.get=function(t){return console.log(".get() is deprecated. Access using array indexes instead."),this.readUInt8(t)},i.prototype.set=function(t,e){return console.log(".set() is deprecated. Access using array indexes instead."),this.writeUInt8(t,e)},i.prototype.readUInt8=function(t,e){return e||(Q(void 0!==t&&null!==t,"missing offset"),Q(t<this.length,"Trying to read beyond buffer length")),t>=this.length?void 0:this[t]},i.prototype.readUInt16LE=function(t,e){return B(this,t,!0,e)},i.prototype.readUInt16BE=function(t,e){return B(this,t,!1,e)},i.prototype.readUInt32LE=function(t,e){return A(this,t,!0,e)},i.prototype.readUInt32BE=function(t,e){return A(this,t,!1,e)},i.prototype.readInt8=function(t,e){if(e||(Q(void 0!==t&&null!==t,"missing offset"),Q(t<this.length,"Trying to read beyond buffer length")),!(t>=this.length)){var n=128&this[t];return n?-1*(255-this[t]+1):this[t]}},i.prototype.readInt16LE=function(t,e){return x(this,t,!0,e)},i.prototype.readInt16BE=function(t,e){return x(this,t,!1,e)},i.prototype.readInt32LE=function(t,e){return k(this,t,!0,e)},i.prototype.readInt32BE=function(t,e){return k(this,t,!1,e)},i.prototype.readFloatLE=function(t,e){return _(this,t,!0,e)},i.prototype.readFloatBE=function(t,e){return _(this,t,!1,e)},i.prototype.readDoubleLE=function(t,e){return L(this,t,!0,e)},i.prototype.readDoubleBE=function(t,e){return L(this,t,!1,e)},i.prototype.writeUInt8=function(t,e,n){n||(Q(void 0!==t&&null!==t,"missing value"),Q(void 0!==e&&null!==e,"missing offset"),Q(e<this.length,"trying to write beyond buffer length"),R(t,255)),e>=this.length||(this[e]=t)},i.prototype.writeUInt16LE=function(t,e,n){T(this,t,e,!0,n)},i.prototype.writeUInt16BE=function(t,e,n){T(this,t,e,!1,n)},i.prototype.writeUInt32LE=function(t,e,n){U(this,t,e,!0,n)},i.prototype.writeUInt32BE=function(t,e,n){U(this,t,e,!1,n)},i.prototype.writeInt8=function(t,e,n){n||(Q(void 0!==t&&null!==t,"missing value"),Q(void 0!==e&&null!==e,"missing offset"),Q(e<this.length,"Trying to write beyond buffer length"),X(t,127,-128)),e>=this.length||(t>=0?this.writeUInt8(t,e,n):this.writeUInt8(255+t+1,e,n))},i.prototype.writeInt16LE=function(t,e,n){S(this,t,e,!0,n)},i.prototype.writeInt16BE=function(t,e,n){S(this,t,e,!1,n)},i.prototype.writeInt32LE=function(t,e,n){C(this,t,e,!0,n)},i.prototype.writeInt32BE=function(t,e,n){C(this,t,e,!1,n)},i.prototype.writeFloatLE=function(t,e,n){F(this,t,e,!0,n)},i.prototype.writeFloatBE=function(t,e,n){F(this,t,e,!1,n)},i.prototype.writeDoubleLE=function(t,e,n){M(this,t,e,!0,n)},i.prototype.writeDoubleBE=function(t,e,n){M(this,t,e,!1,n)},i.prototype.fill=function(t,e,n){if(t||(t=0),e||(e=0),n||(n=this.length),"string"==typeof t&&(t=t.charCodeAt(0)),Q("number"==typeof t&&!isNaN(t),"value is not a number"),Q(n>=e,"end < start"),n!==e&&0!==this.length){Q(e>=0&&e<this.length,"start out of bounds"),Q(n>=0&&n<=this.length,"end out of bounds");for(var r=e;n>r;r++)this[r]=t}},i.prototype.inspect=function(){for(var t=[],e=this.length,r=0;e>r;r++)if(t[r]=H(this[r]),r===n.INSPECT_MAX_BYTES){t[r+1]="...";break}return"<Buffer "+t.join(" ")+">"},i.prototype.toArrayBuffer=function(){if("undefined"!=typeof Uint8Array){if(i._useTypedArrays)return new i(this).buffer;for(var t=new Uint8Array(this.length),e=0,n=t.length;n>e;e+=1)t[e]=this[e];return t.buffer}throw new Error("Buffer.toArrayBuffer not supported in this browser")};var $=i.prototype;i._augment=function(t){return t._isBuffer=!0,t._get=t.get,t._set=t.set,t.get=$.get,t.set=$.set,t.write=$.write,t.toString=$.toString,t.toLocaleString=$.toString,t.toJSON=$.toJSON,t.copy=$.copy,t.slice=$.slice,t.readUInt8=$.readUInt8,t.readUInt16LE=$.readUInt16LE,t.readUInt16BE=$.readUInt16BE,t.readUInt32LE=$.readUInt32LE,t.readUInt32BE=$.readUInt32BE,t.readInt8=$.readInt8,t.readInt16LE=$.readInt16LE,t.readInt16BE=$.readInt16BE,t.readInt32LE=$.readInt32LE,t.readInt32BE=$.readInt32BE,t.readFloatLE=$.readFloatLE,t.readFloatBE=$.readFloatBE,t.readDoubleLE=$.readDoubleLE,t.readDoubleBE=$.readDoubleBE,t.writeUInt8=$.writeUInt8,t.writeUInt16LE=$.writeUInt16LE,t.writeUInt16BE=$.writeUInt16BE,t.writeUInt32LE=$.writeUInt32LE,t.writeUInt32BE=$.writeUInt32BE,t.writeInt8=$.writeInt8,t.writeInt16LE=$.writeInt16LE,t.writeInt16BE=$.writeInt16BE,t.writeInt32LE=$.writeInt32LE,t.writeInt32BE=$.writeInt32BE,t.writeFloatLE=$.writeFloatLE,t.writeFloatBE=$.writeFloatBE,t.writeDoubleLE=$.writeDoubleLE,t.writeDoubleBE=$.writeDoubleBE,t.fill=$.fill,t.inspect=$.inspect,t.toArrayBuffer=$.toArrayBuffer,t}}).call(this,t("rH1JPG"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},t("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/buffer/index.js","/../../node_modules/buffer")},{"base64-js":1,buffer:2,ieee754:3,rH1JPG:4}],3:[function(t,e,n){(function(t,e,r,i,o,a,u,s,f){n.read=function(t,e,n,r,i){var o,a,u=8*i-r-1,s=(1<<u)-1,f=s>>1,l=-7,c=n?i-1:0,h=n?-1:1,d=t[e+c];for(c+=h,o=d&(1<<-l)-1,d>>=-l,l+=u;l>0;o=256*o+t[e+c],c+=h,l-=8);for(a=o&(1<<-l)-1,o>>=-l,l+=r;l>0;a=256*a+t[e+c],c+=h,l-=8);if(0===o)o=1-f;else{if(o===s)return a?NaN:(d?-1:1)*(1/0);a+=Math.pow(2,r),o-=f}return(d?-1:1)*a*Math.pow(2,o-r)},n.write=function(t,e,n,r,i,o){var a,u,s,f=8*o-i-1,l=(1<<f)-1,c=l>>1,h=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,d=r?0:o-1,g=r?1:-1,p=0>e||0===e&&0>1/e?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(u=isNaN(e)?1:0,a=l):(a=Math.floor(Math.log(e)/Math.LN2),e*(s=Math.pow(2,-a))<1&&(a--,s*=2),e+=a+c>=1?h/s:h*Math.pow(2,1-c),e*s>=2&&(a++,s/=2),a+c>=l?(u=0,a=l):a+c>=1?(u=(e*s-1)*Math.pow(2,i),a+=c):(u=e*Math.pow(2,c-1)*Math.pow(2,i),a=0));i>=8;t[n+d]=255&u,d+=g,u/=256,i-=8);for(a=a<<i|u,f+=i;f>0;t[n+d]=255&a,d+=g,a/=256,f-=8);t[n+d-g]|=128*p}}).call(this,t("rH1JPG"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},t("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/ieee754/index.js","/../../node_modules/ieee754")},{buffer:2,rH1JPG:4}],4:[function(t,e,n){(function(t,n,r,i,o,a,u,s,f){function l(){}var t=e.exports={};t.nextTick=function(){var t="undefined"!=typeof window&&window.setImmediate,e="undefined"!=typeof window&&window.postMessage&&window.addEventListener;if(t)return function(t){return window.setImmediate(t)};if(e){var n=[];return window.addEventListener("message",function(t){var e=t.source;if((e===window||null===e)&&"process-tick"===t.data&&(t.stopPropagation(),n.length>0)){var r=n.shift();r()}},!0),function(t){n.push(t),window.postMessage("process-tick","*")}}return function(t){setTimeout(t,0)}}(),t.title="browser",t.browser=!0,t.env={},t.argv=[],t.on=l,t.addListener=l,t.once=l,t.off=l,t.removeListener=l,t.removeAllListeners=l,t.emit=l,t.binding=function(t){throw new Error("process.binding is not supported")},t.cwd=function(){return"/"},t.chdir=function(t){throw new Error("process.chdir is not supported")}}).call(this,t("rH1JPG"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},t("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/process/browser.js","/../../node_modules/process")},{buffer:2,rH1JPG:4}],5:[function(t,e,n){(function(t,e,n,r,i,o,a,u,s){"use strict";!function(){d3.timeline=function(){function t(t){function e(t,e){return I.left+(t.starting_time-v)*O}function u(t,e){return I.left+(t.starting_time-v)*O+5}function s(){if(h||M.attr("height"))h?M.attr("height",h):h=M.attr("height");else{if(!_)throw"height of the timeline is not set";h=et.height+et.top-T.top,d3.select(t[0][0]).attr("height",h)}}function f(){if(c||T.width){if(!c||!T.width)try{c=M.attr("width")}catch(t){console.log(t)}}else try{if(c=M.attr("width"),!c)throw"width of the timeline is not set. As of Firefox 27, timeline().with(x) needs to be explicitly set in order to render"}catch(t){console.log(t)}}function b(e,n){t.append("svg:line").attr("x1",e).attr("y1",n.marginTop).attr("x2",e).attr("y2",h-n.marginBottom).style("stroke",n.color).style("stroke-width",n.width)}var k=t.append("g"),T=t[0][0].getBoundingClientRect(),M=d3.select(t[0][0]),D={},J=1,H=0,G=0;f(),x&&k.each(function(t,e){t.forEach(function(t,e){t.times.forEach(function(t,n){0===e&&0===n?(originTime=t.starting_time,t.starting_time=0,t.ending_time=t.ending_time-originTime):(t.starting_time=t.starting_time-originTime,t.ending_time=t.ending_time-originTime)})})}),(B||0===E||0===v)&&(k.each(function(t,e){t.forEach(function(t,e){B&&-1==Object.keys(D).indexOf(e)&&(D[e]=J,J++),t.times.forEach(function(t,e){0===v&&(t.starting_time<H||0===H&&x===!1)&&(H=t.starting_time),0===E&&t.ending_time>G&&(G=t.ending_time)})})}),0===E&&(E=G),0===v&&(v=H));var O=1/(E-v)*(c-I.left-I.right),W=d3.time.scale().domain([v,E]).range([I.left,c-I.right]),q=d3.svg.axis().scale(W).orient(l).tickFormat(p.format).ticks(p.numTicks||p.tickTime,p.tickInterval).tickSize(p.tickSize);k.each(function(a,s){Y=a,a.forEach(function(a,s){function f(t,e){return B?I.top+(_+L)*D[s]:I.top}function l(t,e){return B?I.top+(_+L)*D[s]+.75*_:I.top+.75*_}var h=a.times,p="undefined"!=typeof a.label;"undefined"!=typeof a.id&&window.console&&console.warn("d3Timeline Warning: Ids per dataset is deprecated in favour of a class key. Ids are now per data element."),g&&X(D,s,k,h,a);var v=2;if(k.selectAll("svg").data(h).enter().append(function(t,e){return document.createElementNS(d3.ns.prefix.svg,"display"in t?t.display:w)}).attr("x",e).attr("y",f).attr("rx",v).attr("ry",v).attr("width",function(t,e){return(t.ending_time-t.starting_time)*O}).attr("cy",function(t,e){return f(t,e)+_/2}).attr("cx",e).attr("r",_/2).attr("height",_).style("fill",function(t,e){var n;return t.color?t.color:y?(n=t[y],m(n?n:a[y])):m(s)}).on("mousemove",function(t,e){n(t,s,a)}).on("mouseover",function(t,e){r(t,e,a)}).on("mouseout",function(t,e){i(t,e,a)}).on("click",function(t,e){o(t,s,a)}).attr("class",function(t,e){return a["class"]?"timelineSeries_"+a["class"]:"timelineSeries_"+s}).attr("id",function(t,e){return a.id&&!t.id?"timelineItem_"+a.id:t.id?t.id:"timelineItem_"+s+"_"+e}),k.selectAll("svg").data(h).enter().append("text").attr("x",u).attr("y",l).text(function(t){return t.label}),d){var b=_+L/2+I.top+(_+L)*D[s];t.append("svg:line").attr("class","row-seperator").attr("x1",0+I.left).attr("x2",c-I.right).attr("y1",b).attr("y2",b).attr("stroke-width",1).attr("stroke",d)}p&&K(t,D,s,p,a),"undefined"!=typeof a.icon&&t.append("image").attr("class","timeline-label").attr("transform","translate(0,"+(I.top+(_+L)*D[s])+")").attr("xlink:href",a.icon).attr("width",I.left).attr("height",_)})});var Q=I.top+(_+L)*J,V=I.top,Z=S?V:Q;if(U&&z(k,q,Z),F&&R(k,q,J),c>T.width){var $=function(){var t=Math.min(0,Math.max(T.width-c,d3.event.translate[0]));tt.translate([t,0]),k.attr("transform","translate("+t+",0)"),a(t*O,W)},tt=d3.behavior.zoom().x(W).on("zoom",$);t.attr("class","scrollable").call(tt)}A&&k.selectAll(".tick text").attr("transform",function(t){return"rotate("+A+")translate("+(this.getBBox().width/2+10)+","+this.getBBox().height/2+")"});var et=k[0][0].getBoundingClientRect();if(s(),j&&k.each(function(t,e){t.forEach(function(t){var e=t.times;e.forEach(function(t){b(W(t.starting_time),P),b(W(t.ending_time),P)})})}),C){var nt=W(new Date);b(nt,N)}}var e=["circle","rect"],n=function(){},r=function(){},i=function(){},o=function(){},a=function(){},u=function(t){return t},s=function(){},f=function(){},l="bottom",c=null,h=null,d=null,g=null,p={format:d3.time.format("%I %p"),tickTime:d3.time.hours,tickInterval:1,tickSize:6},m=d3.scale.category20(),y=null,w="rect",v=0,b=0,E=0,I={left:30,right:30,top:30,bottom:30},B=!1,A=!1,x=!1,k=!1,_=20,L=5,T=60,U=!0,S=!1,C=!1,F=!1,M={stroke:"stroke-dasharray",spacing:"4 10"},N={marginTop:25,marginBottom:0,width:1,color:m},j=!1,P={marginTop:25,marginBottom:0,width:1,color:m},D=!1,J=!1,H=!1,G="white",Y={},z=function(t,e,n){D&&q(t,0,0),J&&W(t);t.append("g").attr("class","axis").attr("transform","translate(0,"+n+")").call(e)},O=function(t){var e=v.getFullYear();v.getFullYear()!=E.getFullYear()&&(e=v.getFullYear()+"-"+E.getFullYear()),t.append("text").attr("transform","translate(20, 0)").attr("x",0).attr("y",14).attr("class","calendarYear").text(e)},W=function(t){var e=6,n=I.left-T,r=(c-I.left)/e,i=c-I.right-r+T,o=t.append("g").attr("class","axis").attr("transform","translate(0, 20)");H&&O(o),o.append("text").attr("transform","translate("+n+", 0)").attr("x",0).attr("y",14).attr("class","chevron").text("<").on("click",function(){return s(v,Y)}),o.append("text").attr("transform","translate("+i+", 0)").attr("x",0).attr("y",14).attr("class","chevron").text(">").on("click",function(){return f(E,Y)})},q=function(t,e,n){t.insert("rect").attr("class","row-green-bar").attr("x",e).attr("width",c).attr("y",n).attr("height",_).attr("fill",G)},R=function(t,e,n){t.append("g").attr("class","axis").attr("transform","translate(0,"+(I.top+(_+L)*n)+")").attr(M.stroke,M.spacing).call(e.tickFormat("").tickSize(-(I.top+(_+L)*(n-1)+3),0,0))},X=function(t,e,n,r,i){var o=(_+L)*t[e]+I.top;n.selectAll("svg").data(r).enter().insert("rect").attr("class","row-green-bar").attr("x",k?0:I.left).attr("width",k?c:c-I.right-I.left).attr("y",o).attr("height",_).attr("fill",g instanceof Function?g(i,e):g)},K=function(t,e,n,r,i){var a=_+L,s=I.top+a/2+a*(e[n]||1);t.append("text").attr("class","timeline-label").attr("transform","translate("+b+","+s+")").text(r?u(i.label):i.id).on("click",function(t,e){o(t,n,i)})};return t.margin=function(e){return arguments.length?(I=e,t):I},t.orient=function(e){return arguments.length?(l=e,t):l},t.itemHeight=function(e){return arguments.length?(_=e,t):_},t.itemMargin=function(e){return arguments.length?(L=e,t):L},t.navMargin=function(e){return arguments.length?(T=e,t):T},t.height=function(e){return arguments.length?(h=e,t):h},t.width=function(e){return arguments.length?(c=e,t):c},t.display=function(n){return arguments.length&&-1!=e.indexOf(n)?(w=n,t):w},t.labelFormat=function(e){return arguments.length?(u=e,t):null},t.tickFormat=function(e){return arguments.length?(p=e,t):p},t.hover=function(e){return arguments.length?(n=e,t):n},t.mouseover=function(e){return arguments.length?(r=e,t):e},t.mouseout=function(e){return arguments.length?(i=e,t):e},t.click=function(e){return arguments.length?(o=e,t):o},t.scroll=function(e){return arguments.length?(a=e,t):a},t.colors=function(e){return arguments.length?(m=e,t):m},t.beginning=function(e){return arguments.length?(v=e,t):v},t.ending=function(e){return arguments.length?(E=e,t):E},t.labelMargin=function(e){return arguments.length?(b=e,t):E},t.rotateTicks=function(e){return A=e,t},t.stack=function(){return B=!B,t},t.relativeTime=function(){return x=!x,t},t.showBorderLine=function(){return j=!j,t},t.showBorderFormat=function(e){return arguments.length?(P=e,t):P},t.showToday=function(){return C=!C,t},t.showTodayFormat=function(e){return arguments.length?(N=e,t):N},t.colorProperty=function(e){return arguments.length?(y=e,t):y},t.rowSeperators=function(e){return arguments.length?(d=e,t):d},t.background=function(e){return arguments.length?(g=e,t):g},t.showTimeAxis=function(){return U=!U,t},t.showAxisTop=function(){return S=!S,t},t.showAxisCalendarYear=function(){return H=!H,t},t.showTimeAxisTick=function(){return F=!F,t},t.fullLengthBackgrounds=function(){return k=!k,t},t.showTimeAxisTickFormat=function(e){return arguments.length?(M=e,t):M},t.showAxisHeaderBackground=function(e){return D=!D,e&&(G=e),t},t.navigate=function(e,n){return s=e,f=n,J=!J,t},t}}()}).call(this,t("rH1JPG"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},t("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/fake_40b9e7dc.js","/")},{buffer:2,rH1JPG:4}]},{},[5]);