!function e(t,n,r){function o(a,u){if(!n[a]){if(!t[a]){var f="function"==typeof require&&require;if(!u&&f)return f(a,!0);if(i)return i(a,!0);throw new Error("Cannot find module '"+a+"'")}var s=n[a]={exports:{}};t[a][0].call(s.exports,function(e){var n=t[a][1][e];return o(n?n:e)},s,s.exports,e,t,n,r)}return n[a].exports}for(var i="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(e,t,n){(function(e,t,r,o,i,a,u,f,s){var l="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";!function(e){"use strict";function t(e){var t=e.charCodeAt(0);return t===i||t===c?62:t===a||t===h?63:u>t?-1:u+10>t?t-u+26+26:s+26>t?t-s:f+26>t?t-f+26:void 0}function n(e){function n(e){s[c++]=e}var r,i,a,u,f,s;if(e.length%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var l=e.length;f="="===e.charAt(l-2)?2:"="===e.charAt(l-1)?1:0,s=new o(3*e.length/4-f),a=f>0?e.length-4:e.length;var c=0;for(r=0,i=0;a>r;r+=4,i+=3)u=t(e.charAt(r))<<18|t(e.charAt(r+1))<<12|t(e.charAt(r+2))<<6|t(e.charAt(r+3)),n((16711680&u)>>16),n((65280&u)>>8),n(255&u);return 2===f?(u=t(e.charAt(r))<<2|t(e.charAt(r+1))>>4,n(255&u)):1===f&&(u=t(e.charAt(r))<<10|t(e.charAt(r+1))<<4|t(e.charAt(r+2))>>2,n(u>>8&255),n(255&u)),s}function r(e){function t(e){return l.charAt(e)}function n(e){return t(e>>18&63)+t(e>>12&63)+t(e>>6&63)+t(63&e)}var r,o,i,a=e.length%3,u="";for(r=0,i=e.length-a;i>r;r+=3)o=(e[r]<<16)+(e[r+1]<<8)+e[r+2],u+=n(o);switch(a){case 1:o=e[e.length-1],u+=t(o>>2),u+=t(o<<4&63),u+="==";break;case 2:o=(e[e.length-2]<<8)+e[e.length-1],u+=t(o>>10),u+=t(o>>4&63),u+=t(o<<2&63),u+="="}return u}var o="undefined"!=typeof Uint8Array?Uint8Array:Array,i="+".charCodeAt(0),a="/".charCodeAt(0),u="0".charCodeAt(0),f="a".charCodeAt(0),s="A".charCodeAt(0),c="-".charCodeAt(0),h="_".charCodeAt(0);e.toByteArray=n,e.fromByteArray=r}("undefined"==typeof n?this.base64js={}:n)}).call(this,e("rH1JPG"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/base64-js/lib/b64.js","/../../node_modules/base64-js/lib")},{buffer:2,rH1JPG:4}],2:[function(e,t,n){(function(t,r,o,i,a,u,f,s,l){function o(e,t,n){if(!(this instanceof o))return new o(e,t,n);var r=typeof e;if("base64"===t&&"string"===r)for(e=j(e);e.length%4!==0;)e+="=";var i;if("number"===r)i=J(e);else if("string"===r)i=o.byteLength(e,t);else{if("object"!==r)throw new Error("First argument needs to be a number, array or string.");i=J(e.length)}var a;o._useTypedArrays?a=o._augment(new Uint8Array(i)):(a=this,a.length=i,a._isBuffer=!0);var u;if(o._useTypedArrays&&"number"==typeof e.byteLength)a._set(e);else if(D(e))for(u=0;i>u;u++)o.isBuffer(e)?a[u]=e.readUInt8(u):a[u]=e[u];else if("string"===r)a.write(e,0,t);else if("number"===r&&!o._useTypedArrays&&!n)for(u=0;i>u;u++)a[u]=0;return a}function c(e,t,n,r){n=Number(n)||0;var i=e.length-n;r?(r=Number(r),r>i&&(r=i)):r=i;var a=t.length;Q(a%2===0,"Invalid hex string"),r>a/2&&(r=a/2);for(var u=0;r>u;u++){var f=parseInt(t.substr(2*u,2),16);Q(!isNaN(f),"Invalid hex string"),e[n+u]=f}return o._charsWritten=2*u,u}function h(e,t,n,r){var i=o._charsWritten=z(H(t),e,n,r);return i}function d(e,t,n,r){var i=o._charsWritten=z(W(t),e,n,r);return i}function g(e,t,n,r){return d(e,t,n,r)}function p(e,t,n,r){var i=o._charsWritten=z(O(t),e,n,r);return i}function y(e,t,n,r){var i=o._charsWritten=z(q(t),e,n,r);return i}function w(e,t,n){return 0===t&&n===e.length?V.fromByteArray(e):V.fromByteArray(e.slice(t,n))}function b(e,t,n){var r="",o="";n=Math.min(e.length,n);for(var i=t;n>i;i++)e[i]<=127?(r+=R(o)+String.fromCharCode(e[i]),o=""):o+="%"+e[i].toString(16);return r+R(o)}function v(e,t,n){var r="";n=Math.min(e.length,n);for(var o=t;n>o;o++)r+=String.fromCharCode(e[o]);return r}function m(e,t,n){return v(e,t,n)}function E(e,t,n){var r=e.length;(!t||0>t)&&(t=0),(!n||0>n||n>r)&&(n=r);for(var o="",i=t;n>i;i++)o+=G(e[i]);return o}function I(e,t,n){for(var r=e.slice(t,n),o="",i=0;i<r.length;i+=2)o+=String.fromCharCode(r[i]+256*r[i+1]);return o}function B(e,t,n,r){r||(Q("boolean"==typeof n,"missing or invalid endian"),Q(void 0!==t&&null!==t,"missing offset"),Q(t+1<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i;return n?(i=e[t],o>t+1&&(i|=e[t+1]<<8)):(i=e[t]<<8,o>t+1&&(i|=e[t+1])),i}}function A(e,t,n,r){r||(Q("boolean"==typeof n,"missing or invalid endian"),Q(void 0!==t&&null!==t,"missing offset"),Q(t+3<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i;return n?(o>t+2&&(i=e[t+2]<<16),o>t+1&&(i|=e[t+1]<<8),i|=e[t],o>t+3&&(i+=e[t+3]<<24>>>0)):(o>t+1&&(i=e[t+1]<<16),o>t+2&&(i|=e[t+2]<<8),o>t+3&&(i|=e[t+3]),i+=e[t]<<24>>>0),i}}function L(e,t,n,r){r||(Q("boolean"==typeof n,"missing or invalid endian"),Q(void 0!==t&&null!==t,"missing offset"),Q(t+1<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i=B(e,t,n,!0),a=32768&i;return a?-1*(65535-i+1):i}}function U(e,t,n,r){r||(Q("boolean"==typeof n,"missing or invalid endian"),Q(void 0!==t&&null!==t,"missing offset"),Q(t+3<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i=A(e,t,n,!0),a=2147483648&i;return a?-1*(4294967295-i+1):i}}function _(e,t,n,r){return r||(Q("boolean"==typeof n,"missing or invalid endian"),Q(t+3<e.length,"Trying to read beyond buffer length")),Z.read(e,t,n,23,4)}function S(e,t,n,r){return r||(Q("boolean"==typeof n,"missing or invalid endian"),Q(t+7<e.length,"Trying to read beyond buffer length")),Z.read(e,t,n,52,8)}function C(e,t,n,r,o){o||(Q(void 0!==t&&null!==t,"missing value"),Q("boolean"==typeof r,"missing or invalid endian"),Q(void 0!==n&&null!==n,"missing offset"),Q(n+1<e.length,"trying to write beyond buffer length"),X(t,65535));var i=e.length;if(!(n>=i))for(var a=0,u=Math.min(i-n,2);u>a;a++)e[n+a]=(t&255<<8*(r?a:1-a))>>>8*(r?a:1-a)}function k(e,t,n,r,o){o||(Q(void 0!==t&&null!==t,"missing value"),Q("boolean"==typeof r,"missing or invalid endian"),Q(void 0!==n&&null!==n,"missing offset"),Q(n+3<e.length,"trying to write beyond buffer length"),X(t,4294967295));var i=e.length;if(!(n>=i))for(var a=0,u=Math.min(i-n,4);u>a;a++)e[n+a]=t>>>8*(r?a:3-a)&255}function T(e,t,n,r,o){o||(Q(void 0!==t&&null!==t,"missing value"),Q("boolean"==typeof r,"missing or invalid endian"),Q(void 0!==n&&null!==n,"missing offset"),Q(n+1<e.length,"Trying to write beyond buffer length"),Y(t,32767,-32768));var i=e.length;n>=i||(t>=0?C(e,t,n,r,o):C(e,65535+t+1,n,r,o))}function M(e,t,n,r,o){o||(Q(void 0!==t&&null!==t,"missing value"),Q("boolean"==typeof r,"missing or invalid endian"),Q(void 0!==n&&null!==n,"missing offset"),Q(n+3<e.length,"Trying to write beyond buffer length"),Y(t,2147483647,-2147483648));var i=e.length;n>=i||(t>=0?k(e,t,n,r,o):k(e,4294967295+t+1,n,r,o))}function N(e,t,n,r,o){o||(Q(void 0!==t&&null!==t,"missing value"),Q("boolean"==typeof r,"missing or invalid endian"),Q(void 0!==n&&null!==n,"missing offset"),Q(n+3<e.length,"Trying to write beyond buffer length"),K(t,3.4028234663852886e38,-3.4028234663852886e38));var i=e.length;n>=i||Z.write(e,t,n,r,23,4)}function x(e,t,n,r,o){o||(Q(void 0!==t&&null!==t,"missing value"),Q("boolean"==typeof r,"missing or invalid endian"),Q(void 0!==n&&null!==n,"missing offset"),Q(n+7<e.length,"Trying to write beyond buffer length"),K(t,1.7976931348623157e308,-1.7976931348623157e308));var i=e.length;n>=i||Z.write(e,t,n,r,52,8)}function j(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}function F(e,t,n){return"number"!=typeof e?n:(e=~~e,e>=t?t:e>=0?e:(e+=t,e>=0?e:0))}function J(e){return e=~~Math.ceil(+e),0>e?0:e}function P(e){return(Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)})(e)}function D(e){return P(e)||o.isBuffer(e)||e&&"object"==typeof e&&"number"==typeof e.length}function G(e){return 16>e?"0"+e.toString(16):e.toString(16)}function H(e){for(var t=[],n=0;n<e.length;n++){var r=e.charCodeAt(n);if(127>=r)t.push(e.charCodeAt(n));else{var o=n;r>=55296&&57343>=r&&n++;for(var i=encodeURIComponent(e.slice(o,n+1)).substr(1).split("%"),a=0;a<i.length;a++)t.push(parseInt(i[a],16))}}return t}function W(e){for(var t=[],n=0;n<e.length;n++)t.push(255&e.charCodeAt(n));return t}function q(e){for(var t,n,r,o=[],i=0;i<e.length;i++)t=e.charCodeAt(i),n=t>>8,r=t%256,o.push(r),o.push(n);return o}function O(e){return V.toByteArray(e)}function z(e,t,n,r){for(var o=0;r>o&&!(o+n>=t.length||o>=e.length);o++)t[o+n]=e[o];return o}function R(e){try{return decodeURIComponent(e)}catch(t){return String.fromCharCode(65533)}}function X(e,t){Q("number"==typeof e,"cannot write a non-number as a number"),Q(e>=0,"specified a negative value for writing an unsigned value"),Q(t>=e,"value is larger than maximum value for type"),Q(Math.floor(e)===e,"value has a fractional component")}function Y(e,t,n){Q("number"==typeof e,"cannot write a non-number as a number"),Q(t>=e,"value larger than maximum allowed value"),Q(e>=n,"value smaller than minimum allowed value"),Q(Math.floor(e)===e,"value has a fractional component")}function K(e,t,n){Q("number"==typeof e,"cannot write a non-number as a number"),Q(t>=e,"value larger than maximum allowed value"),Q(e>=n,"value smaller than minimum allowed value")}function Q(e,t){if(!e)throw new Error(t||"Failed assertion")}var V=e("base64-js"),Z=e("ieee754");n.Buffer=o,n.SlowBuffer=o,n.INSPECT_MAX_BYTES=50,o.poolSize=8192,o._useTypedArrays=function(){try{var e=new ArrayBuffer(0),t=new Uint8Array(e);return t.foo=function(){return 42},42===t.foo()&&"function"==typeof t.subarray}catch(n){return!1}}(),o.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"raw":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},o.isBuffer=function(e){return!(null===e||void 0===e||!e._isBuffer)},o.byteLength=function(e,t){var n;switch(e+="",t||"utf8"){case"hex":n=e.length/2;break;case"utf8":case"utf-8":n=H(e).length;break;case"ascii":case"binary":case"raw":n=e.length;break;case"base64":n=O(e).length;break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":n=2*e.length;break;default:throw new Error("Unknown encoding")}return n},o.concat=function(e,t){if(Q(P(e),"Usage: Buffer.concat(list, [totalLength])\nlist should be an Array."),0===e.length)return new o(0);if(1===e.length)return e[0];var n;if("number"!=typeof t)for(t=0,n=0;n<e.length;n++)t+=e[n].length;var r=new o(t),i=0;for(n=0;n<e.length;n++){var a=e[n];a.copy(r,i),i+=a.length}return r},o.prototype.write=function(e,t,n,r){if(isFinite(t))isFinite(n)||(r=n,n=void 0);else{var o=r;r=t,t=n,n=o}t=Number(t)||0;var i=this.length-t;n?(n=Number(n),n>i&&(n=i)):n=i,r=String(r||"utf8").toLowerCase();var a;switch(r){case"hex":a=c(this,e,t,n);break;case"utf8":case"utf-8":a=h(this,e,t,n);break;case"ascii":a=d(this,e,t,n);break;case"binary":a=g(this,e,t,n);break;case"base64":a=p(this,e,t,n);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":a=y(this,e,t,n);break;default:throw new Error("Unknown encoding")}return a},o.prototype.toString=function(e,t,n){var r=this;if(e=String(e||"utf8").toLowerCase(),t=Number(t)||0,n=void 0!==n?Number(n):n=r.length,n===t)return"";var o;switch(e){case"hex":o=E(r,t,n);break;case"utf8":case"utf-8":o=b(r,t,n);break;case"ascii":o=v(r,t,n);break;case"binary":o=m(r,t,n);break;case"base64":o=w(r,t,n);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":o=I(r,t,n);break;default:throw new Error("Unknown encoding")}return o},o.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},o.prototype.copy=function(e,t,n,r){var i=this;if(n||(n=0),r||0===r||(r=this.length),t||(t=0),r!==n&&0!==e.length&&0!==i.length){Q(r>=n,"sourceEnd < sourceStart"),Q(t>=0&&t<e.length,"targetStart out of bounds"),Q(n>=0&&n<i.length,"sourceStart out of bounds"),Q(r>=0&&r<=i.length,"sourceEnd out of bounds"),r>this.length&&(r=this.length),e.length-t<r-n&&(r=e.length-t+n);var a=r-n;if(100>a||!o._useTypedArrays)for(var u=0;a>u;u++)e[u+t]=this[u+n];else e._set(this.subarray(n,n+a),t)}},o.prototype.slice=function(e,t){var n=this.length;if(e=F(e,n,0),t=F(t,n,n),o._useTypedArrays)return o._augment(this.subarray(e,t));for(var r=t-e,i=new o(r,void 0,!0),a=0;r>a;a++)i[a]=this[a+e];return i},o.prototype.get=function(e){return console.log(".get() is deprecated. Access using array indexes instead."),this.readUInt8(e)},o.prototype.set=function(e,t){return console.log(".set() is deprecated. Access using array indexes instead."),this.writeUInt8(e,t)},o.prototype.readUInt8=function(e,t){return t||(Q(void 0!==e&&null!==e,"missing offset"),Q(e<this.length,"Trying to read beyond buffer length")),e>=this.length?void 0:this[e]},o.prototype.readUInt16LE=function(e,t){return B(this,e,!0,t)},o.prototype.readUInt16BE=function(e,t){return B(this,e,!1,t)},o.prototype.readUInt32LE=function(e,t){return A(this,e,!0,t)},o.prototype.readUInt32BE=function(e,t){return A(this,e,!1,t)},o.prototype.readInt8=function(e,t){if(t||(Q(void 0!==e&&null!==e,"missing offset"),Q(e<this.length,"Trying to read beyond buffer length")),!(e>=this.length)){var n=128&this[e];return n?-1*(255-this[e]+1):this[e]}},o.prototype.readInt16LE=function(e,t){return L(this,e,!0,t)},o.prototype.readInt16BE=function(e,t){return L(this,e,!1,t)},o.prototype.readInt32LE=function(e,t){return U(this,e,!0,t)},o.prototype.readInt32BE=function(e,t){return U(this,e,!1,t)},o.prototype.readFloatLE=function(e,t){return _(this,e,!0,t)},o.prototype.readFloatBE=function(e,t){return _(this,e,!1,t)},o.prototype.readDoubleLE=function(e,t){return S(this,e,!0,t)},o.prototype.readDoubleBE=function(e,t){return S(this,e,!1,t)},o.prototype.writeUInt8=function(e,t,n){n||(Q(void 0!==e&&null!==e,"missing value"),Q(void 0!==t&&null!==t,"missing offset"),Q(t<this.length,"trying to write beyond buffer length"),X(e,255)),t>=this.length||(this[t]=e)},o.prototype.writeUInt16LE=function(e,t,n){C(this,e,t,!0,n)},o.prototype.writeUInt16BE=function(e,t,n){C(this,e,t,!1,n)},o.prototype.writeUInt32LE=function(e,t,n){k(this,e,t,!0,n)},o.prototype.writeUInt32BE=function(e,t,n){k(this,e,t,!1,n)},o.prototype.writeInt8=function(e,t,n){n||(Q(void 0!==e&&null!==e,"missing value"),Q(void 0!==t&&null!==t,"missing offset"),Q(t<this.length,"Trying to write beyond buffer length"),Y(e,127,-128)),t>=this.length||(e>=0?this.writeUInt8(e,t,n):this.writeUInt8(255+e+1,t,n))},o.prototype.writeInt16LE=function(e,t,n){T(this,e,t,!0,n)},o.prototype.writeInt16BE=function(e,t,n){T(this,e,t,!1,n)},o.prototype.writeInt32LE=function(e,t,n){M(this,e,t,!0,n)},o.prototype.writeInt32BE=function(e,t,n){M(this,e,t,!1,n)},o.prototype.writeFloatLE=function(e,t,n){N(this,e,t,!0,n)},o.prototype.writeFloatBE=function(e,t,n){N(this,e,t,!1,n)},o.prototype.writeDoubleLE=function(e,t,n){x(this,e,t,!0,n)},o.prototype.writeDoubleBE=function(e,t,n){x(this,e,t,!1,n)},o.prototype.fill=function(e,t,n){if(e||(e=0),t||(t=0),n||(n=this.length),"string"==typeof e&&(e=e.charCodeAt(0)),Q("number"==typeof e&&!isNaN(e),"value is not a number"),Q(n>=t,"end < start"),n!==t&&0!==this.length){Q(t>=0&&t<this.length,"start out of bounds"),Q(n>=0&&n<=this.length,"end out of bounds");for(var r=t;n>r;r++)this[r]=e}},o.prototype.inspect=function(){for(var e=[],t=this.length,r=0;t>r;r++)if(e[r]=G(this[r]),r===n.INSPECT_MAX_BYTES){e[r+1]="...";break}return"<Buffer "+e.join(" ")+">"},o.prototype.toArrayBuffer=function(){if("undefined"!=typeof Uint8Array){if(o._useTypedArrays)return new o(this).buffer;for(var e=new Uint8Array(this.length),t=0,n=e.length;n>t;t+=1)e[t]=this[t];return e.buffer}throw new Error("Buffer.toArrayBuffer not supported in this browser")};var $=o.prototype;o._augment=function(e){return e._isBuffer=!0,e._get=e.get,e._set=e.set,e.get=$.get,e.set=$.set,e.write=$.write,e.toString=$.toString,e.toLocaleString=$.toString,e.toJSON=$.toJSON,e.copy=$.copy,e.slice=$.slice,e.readUInt8=$.readUInt8,e.readUInt16LE=$.readUInt16LE,e.readUInt16BE=$.readUInt16BE,e.readUInt32LE=$.readUInt32LE,e.readUInt32BE=$.readUInt32BE,e.readInt8=$.readInt8,e.readInt16LE=$.readInt16LE,e.readInt16BE=$.readInt16BE,e.readInt32LE=$.readInt32LE,e.readInt32BE=$.readInt32BE,e.readFloatLE=$.readFloatLE,e.readFloatBE=$.readFloatBE,e.readDoubleLE=$.readDoubleLE,e.readDoubleBE=$.readDoubleBE,e.writeUInt8=$.writeUInt8,e.writeUInt16LE=$.writeUInt16LE,e.writeUInt16BE=$.writeUInt16BE,e.writeUInt32LE=$.writeUInt32LE,e.writeUInt32BE=$.writeUInt32BE,e.writeInt8=$.writeInt8,e.writeInt16LE=$.writeInt16LE,e.writeInt16BE=$.writeInt16BE,e.writeInt32LE=$.writeInt32LE,e.writeInt32BE=$.writeInt32BE,e.writeFloatLE=$.writeFloatLE,e.writeFloatBE=$.writeFloatBE,e.writeDoubleLE=$.writeDoubleLE,e.writeDoubleBE=$.writeDoubleBE,e.fill=$.fill,e.inspect=$.inspect,e.toArrayBuffer=$.toArrayBuffer,e}}).call(this,e("rH1JPG"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/buffer/index.js","/../../node_modules/buffer")},{"base64-js":1,buffer:2,ieee754:3,rH1JPG:4}],3:[function(e,t,n){(function(e,t,r,o,i,a,u,f,s){n.read=function(e,t,n,r,o){var i,a,u=8*o-r-1,f=(1<<u)-1,s=f>>1,l=-7,c=n?o-1:0,h=n?-1:1,d=e[t+c];for(c+=h,i=d&(1<<-l)-1,d>>=-l,l+=u;l>0;i=256*i+e[t+c],c+=h,l-=8);for(a=i&(1<<-l)-1,i>>=-l,l+=r;l>0;a=256*a+e[t+c],c+=h,l-=8);if(0===i)i=1-s;else{if(i===f)return a?NaN:(d?-1:1)*(1/0);a+=Math.pow(2,r),i-=s}return(d?-1:1)*a*Math.pow(2,i-r)},n.write=function(e,t,n,r,o,i){var a,u,f,s=8*i-o-1,l=(1<<s)-1,c=l>>1,h=23===o?Math.pow(2,-24)-Math.pow(2,-77):0,d=r?0:i-1,g=r?1:-1,p=0>t||0===t&&0>1/t?1:0;for(t=Math.abs(t),isNaN(t)||t===1/0?(u=isNaN(t)?1:0,a=l):(a=Math.floor(Math.log(t)/Math.LN2),t*(f=Math.pow(2,-a))<1&&(a--,f*=2),t+=a+c>=1?h/f:h*Math.pow(2,1-c),t*f>=2&&(a++,f/=2),a+c>=l?(u=0,a=l):a+c>=1?(u=(t*f-1)*Math.pow(2,o),a+=c):(u=t*Math.pow(2,c-1)*Math.pow(2,o),a=0));o>=8;e[n+d]=255&u,d+=g,u/=256,o-=8);for(a=a<<o|u,s+=o;s>0;e[n+d]=255&a,d+=g,a/=256,s-=8);e[n+d-g]|=128*p}}).call(this,e("rH1JPG"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/ieee754/index.js","/../../node_modules/ieee754")},{buffer:2,rH1JPG:4}],4:[function(e,t,n){(function(e,n,r,o,i,a,u,f,s){function l(){}var e=t.exports={};e.nextTick=function(){var e="undefined"!=typeof window&&window.setImmediate,t="undefined"!=typeof window&&window.postMessage&&window.addEventListener;if(e)return function(e){return window.setImmediate(e)};if(t){var n=[];return window.addEventListener("message",function(e){var t=e.source;if((t===window||null===t)&&"process-tick"===e.data&&(e.stopPropagation(),n.length>0)){var r=n.shift();r()}},!0),function(e){n.push(e),window.postMessage("process-tick","*")}}return function(e){setTimeout(e,0)}}(),e.title="browser",e.browser=!0,e.env={},e.argv=[],e.on=l,e.addListener=l,e.once=l,e.off=l,e.removeListener=l,e.removeAllListeners=l,e.emit=l,e.binding=function(e){throw new Error("process.binding is not supported")},e.cwd=function(){return"/"},e.chdir=function(e){throw new Error("process.chdir is not supported")}}).call(this,e("rH1JPG"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/process/browser.js","/../../node_modules/process")},{buffer:2,rH1JPG:4}],5:[function(e,t,n){(function(e,r,o,i,a,u,f,s,l){"use strict";var c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};!function(e,r){"function"==typeof define&&define.amd?define([],function(){return e.welcome=r()}):"object"===("undefined"==typeof n?"undefined":c(n))?t.exports=r():e.welcome=r()}(void 0,function(){var e=function(){console.log("%cWelcome to punchtime\nAll our code is open source, if you want to help, take a look at https://github.com/punchtime","font-family: sans-serif; color: red; font-size: 1em;")};return e})}).call(this,e("rH1JPG"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/fake_2a098280.js","/")},{buffer:2,rH1JPG:4}]},{},[5]);