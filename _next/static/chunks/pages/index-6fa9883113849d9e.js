(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5301:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r(9993)}])},9993:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return R}});var n=r(5893),i=r(541),o=r(949),a=r(9343),s=r(7510),c=r(4051),u=r.n(c),l=r(8280),d=r(9876),f=r(4018),h=r(9347),v=r(142),p=r(6371),m=r(871),b=r(7294),x=r(4181),y=r(6136);function g(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function j(e,t,r,n,i,o,a){try{var s=e[o](a),c=s.value}catch(u){return void r(u)}s.done?t(c):Promise.resolve(c).then(n,i)}function S(e){return function(){var t=this,r=arguments;return new Promise((function(n,i){var o=e.apply(t,r);function a(e){j(o,n,i,a,s,"next",e)}function s(e){j(o,n,i,a,s,"throw",e)}a(void 0)}))}}function w(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,i,o=[],a=!0,s=!1;try{for(r=r.call(e);!(a=(n=r.next()).done)&&(o.push(n.value),!t||o.length!==t);a=!0);}catch(c){s=!0,i=c}finally{try{a||null==r.return||r.return()}finally{if(s)throw i}}return o}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return g(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return g(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var O=r(7542),k=function(e){var t,r,n=null===(t=e.match(/execution reverted: ([^"]+)"/))||void 0===t?void 0:t[1];return n||((null===(r=e.match(/err: (insufficient funds)/))||void 0===r?void 0:r[1])?"insufficient funds for price + gas":e)},A=function(){var e,t=w((0,m.Z)(),2)[1],r=w((0,y.mA)(),1)[0].data,o=(0,b.useState)(""),a=o[0],s=o[1],c=(0,b.useState)(),g=c[0],j=c[1],A=(0,b.useState)("unsubmitted"),P=A[0],E=A[1],I=w((0,y.mx)(),1)[0],_=I.data,M=I.error,N=I.loading,z=w((0,y.KQ)({addressOrName:null===r||void 0===r?void 0:r.address,skip:!r}),1)[0],C=z.data,L=z.loading,T=(0,b.useState)("Loading..."),W=T[0],X=T[1],K=(0,y.yL)(),Z=(0,b.useState)(),q=Z[0],D=Z[1],U=(0,b.useState)(),H=U[0],J=U[1],R=(0,b.useState)(!1),V=R[0],F=R[1],G=(0,b.useState)(!1),Q=G[0],$=G[1],B=((null===(e=w((0,y.LN)(),1)[0].data.chain)||void 0===e?void 0:e.name)||"mainnet").toLowerCase(),Y=x.S[B],ee=Y.address,te=Y.merkleTree,re=Y.blockExplorer,ne=r?te.proofs[null===r||void 0===r?void 0:r.address.toLowerCase()]:void 0,ie=(0,y.cq)({addressOrName:ee,contractInterface:O,signerOrProvider:_||K}),oe=q&&C&&C.value.gte(q);(0,b.useEffect)((function(){ie._mintPrice().then((function(e){return D(e)})),ie.isMintable().then((function(e){return J(e)})),(null===r||void 0===r?void 0:r.address)&&(0,p.isAddress)(null===r||void 0===r?void 0:r.address)&&ie.hasMinted((0,p.getAddress)(null===r||void 0===r?void 0:r.address)).then((function(e){return $(e)}))}),[null===r||void 0===r?void 0:r.address,ee]);var ae="undefined"===typeof H,se="undefined"===typeof q;(0,b.useEffect)((function(){X(ae||se||N||L?"Loading...":H?ne?Q?"Already minted!":V?"Minting...":oe?"Mint for ".concat((0,p.formatEther)(q)," \u039e"):"Must have at least ".concat((0,p.formatEther)(q)," \u039e"):"Not on the whitelist!":"Minting disabled")}),[H,N,se,Q,oe]);var ce=function(){var e=S(u().mark((function e(){var t;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(ne&&!ae&&!se){e.next=3;break}return console.error({proof:ne,isMintableLoading:ae,isMintPriceLoading:se}),e.abrupt("return");case 3:return e.prev=3,F(!0),e.next=7,ie.mint(ne,{value:q});case 7:t=e.sent,j(t),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(3),E("error"),s(k(e.t0.message));case 15:case"end":return e.stop()}}),e,null,[[3,11]])})));return function(){return e.apply(this,arguments)}}(),ue=(0,b.useState)(),le=ue[0],de=ue[1];return(0,y.y2)({addressOrName:ee,contractInterface:O},"Transfer",function(){var e=S(u().mark((function e(n){var i,o,a,s,c;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i=w(n,4),o=i[0],a=i[1],s=i[2],c=i[3],console.log({from:o,to:a,tokenId:s,event:c}),a.toLowerCase()===(null===r||void 0===r?void 0:r.address.toLowerCase())&&(console.log("your nft was minted!!",s.toNumber()),de(s.toNumber()),X("Minted!"),F(!1),E("success"),t(!0));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),(0,n.jsx)(i.W2,{p:6,maxWidth:"400px",display:"block",overflow:"none",children:(0,n.jsx)(f.NI,{error:a||void 0,children:(0,n.jsxs)(i.Kq,{spacing:8,children:[(0,n.jsx)(l.y,{active:!!le&&"success"===P,pfpId:le}),(0,n.jsxs)(i.Kq,{spacing:2,hidden:!!ne,children:[(0,n.jsx)(i.xv,{children:"Your address is not on the whitelist. "}),(0,n.jsx)(i.EK,{children:r&&r.address})]}),(0,n.jsx)(h.zx,{isLoading:ae||se||N||V,loadingText:W,onClick:ce,disabled:!(!(!ne||N||M||se||!H||"Minted!"===W||Q||V)&&oe),boxShadow:"lg",fontWeight:"600",_hover:{boxShadow:"md"},_active:{boxShadow:"lg"},children:W}),(0,n.jsx)(v.bZ,{status:"success"===P?"success":"error",fontSize:"md",alignItems:"center",justifyContent:"center",textAlign:"center",hidden:"unsubmitted"===P,children:"success"===P?(0,n.jsx)(v.X,{mt:-1,children:(0,n.jsxs)(i.kC,{children:[(0,n.jsx)(i.M5,{children:"Successfully minted!"}),g&&(0,n.jsx)(i.M5,{children:(0,n.jsx)(h.zx,{rightIcon:(0,n.jsx)(d.xP,{}),as:"a",size:"xs",ml:2,target:"_blank",href:"".concat(re,"/tx/").concat(g.hash),children:"Etherscan"})})]})}):(0,n.jsxs)(v.X,{mt:-1,children:[(0,n.jsx)(i.xv,{mb:4,children:a}),(0,n.jsx)(i.xv,{as:"pre",fontSize:"8px",textAlign:"left",lineHeight:"8px",hidden:!ne,children:JSON.stringify(ne,void 0,4)})]})})]})})})},P=r(3942),E=r(9583);function I(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function _(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var M={github:E.hJX,linkedin:E.ltd,email:E.SRX,twitter:E.fWC,discord:E.j2d},N=function(e){var t=e.socialLinks,r=e.fontSize,i=_(e,["socialLinks","fontSize"]);return(0,n.jsx)(h.hE,function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){I(e,t,r[t])}))}return e}({variant:"ghost"},i,{children:t.map((function(e){var t=e.href,i=e.social;return(0,n.jsx)(h.hU,{as:"a",href:t,target:"_blank","aria-label":i,icon:(0,n.jsx)(P.JO,{as:M[i],fontSize:r})},"button-".concat(i,"-").concat(t))}))}))},z=r(8753),C=r(365),L=r.n(C),T=r(7563);function W(e,t,r,n,i,o,a){try{var s=e[o](a),c=s.value}catch(u){return void r(u)}s.done?t(c):Promise.resolve(c).then(n,i)}function X(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function K(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){X(e,t,r[t])}))}return e}function Z(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var q="https://atxdao.us6.list-manage.com/subscribe/post-json?u=a4c2b4ef30c235da6122bddf8&id=189b82bd8d",D=function(e){var t=e.placeholder,r=e.children,i=e.setValue,a=Z(e,["placeholder","children","setValue"]);return(0,n.jsx)(f.NI,{isRequired:!0,children:(0,n.jsxs)(z.BZ,{children:[(0,n.jsx)(z.Z8,{children:r}),(0,n.jsx)(z.II,K({placeholder:t,"aria-label":t,_placeholder:{color:(0,o.ff)("gray.600","gray.200")},onChange:function(e){return i(e.target.value)}},a))]})})},U=function(){var e=(0,b.useState)(""),t=e[0],r=e[1],o=(0,b.useState)(!1),a=o[0],s=o[1],c=(0,b.useState)("unsubmitted"),l=c[0],p=c[1],m=(0,b.useState)(""),x=m[0],y=m[1],g=function(){var e,r=(e=u().mark((function e(r){var n,i;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r.preventDefault(),n=(0,T.stringify)({MERGE0:t}),s(!0),i=[q,n].join("&"),L()(i,{param:"c"},(function(e,t){e?(p("error"),y("Failed to add to list: ".concat(e.toString()))):"success"===t.result||t.msg.includes("already subscribed")?(p("success"),y("Thanks for subscribing!")):(p("error"),y(t.msg)),s(!1)}));case 5:case"end":return e.stop()}}),e)})),function(){var t=this,r=arguments;return new Promise((function(n,i){var o=e.apply(t,r);function a(e){W(o,n,i,a,s,"next",e)}function s(e){W(o,n,i,a,s,"throw",e)}a(void 0)}))});return function(e){return r.apply(this,arguments)}}();return(0,n.jsx)(i.W2,{p:6,maxWidth:"420px",display:"block",overflow:"auto",children:(0,n.jsx)("form",{onSubmit:g,children:(0,n.jsxs)(i.Kq,{spacing:3,children:[(0,n.jsx)(D,{type:"email",name:"email",value:t,setValue:r,placeholder:"Email",children:(0,n.jsx)(d.Km,{})}),(0,n.jsx)(h.zx,{type:"submit",boxShadow:a?"lg":"sm",fontWeight:"600",disabled:a,_hover:{boxShadow:"md"},_active:{boxShadow:"lg"},children:"Sign up for dao updates"}),(0,n.jsx)(f.NI,{hidden:"unsubmitted"!==l,children:(0,n.jsx)(f.Q6,{color:"gray.600",children:"We will never share your email."})}),(0,n.jsxs)(v.bZ,{status:"success"===l?"success":"error",fontSize:"md",alignItems:"center",justifyContent:"center",textAlign:"center",hidden:"unsubmitted"===l,children:[(0,n.jsx)(v.zM,{}),(0,n.jsx)(v.X,{mt:-1,children:x})]})]})})})};function H(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function J(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,i,o=[],a=!0,s=!1;try{for(r=r.call(e);!(a=(n=r.next()).done)&&(o.push(n.value),!t||o.length!==t);a=!0);}catch(c){s=!0,i=c}finally{try{a||null==r.return||r.return()}finally{if(s)throw i}}return o}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return H(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return H(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var R=function(){var e=J((0,y.mA)(),1)[0].data;return(0,n.jsx)(a.A,{title:"atxdao",connected:!!e,children:(0,n.jsx)(i.xu,{textAlign:"center",fontSize:"xl",children:(0,n.jsx)(i.rj,{minH:"100vh",p:3,mt:"5vh",children:(0,n.jsxs)(i.gC,{spacing:[4,4,8],children:[e?(0,n.jsx)(A,{}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i.xv,{fontSize:["3.2rem","4rem","5rem"],lineHeight:1,children:"ATX DAO"}),(0,n.jsx)(s.T,{boxSize:["256px","256px","384px"],fill:(0,o.ff)("gray.800","gray.100")}),(0,n.jsx)(U,{})]}),(0,n.jsx)(N,{fontSize:["2rem","2rem","3rem"],color:(0,o.ff)("gray.800","gray.100"),spacing:[2,2,4],socialLinks:[{social:"discord",href:"https://discord.gg/3uGPbZhk3U"},{social:"github",href:"https://github.com/atxdao"}]})]})})})})}}},function(e){e.O(0,[445,124,755,167,774,888,179],(function(){return t=5301,e(e.s=t);var t}));var t=e.O();_N_E=t}]);