(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5301:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r(9993)}])},9993:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return V}});var n=r(5893),i=r(541),o=r(949),a=r(9343),s=r(7510),c=r(4051),u=r.n(c),l=r(8280),d=r(9876),f=r(4018),h=r(7167),p=r(9347),v=r(142),b=r(6371),m=r(871),x=r(7294),y=r(4181),g=r(6136);function j(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function S(e,t,r,n,i,o,a){try{var s=e[o](a),c=s.value}catch(u){return void r(u)}s.done?t(c):Promise.resolve(c).then(n,i)}function w(e){return function(){var t=this,r=arguments;return new Promise((function(n,i){var o=e.apply(t,r);function a(e){S(o,n,i,a,s,"next",e)}function s(e){S(o,n,i,a,s,"throw",e)}a(void 0)}))}}function O(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,i,o=[],a=!0,s=!1;try{for(r=r.call(e);!(a=(n=r.next()).done)&&(o.push(n.value),!t||o.length!==t);a=!0);}catch(c){s=!0,i=c}finally{try{a||null==r.return||r.return()}finally{if(s)throw i}}return o}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return j(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return j(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var k=r(7542),A=function(e){var t,r,n=null===(t=e.match(/execution reverted: ([^"]+)"/))||void 0===t?void 0:t[1];return n||((null===(r=e.match(/err: (insufficient funds)/))||void 0===r?void 0:r[1])?"insufficient funds for price + gas":e)},P=function(){var e,t=O((0,m.Z)(),2)[1],r=O((0,g.mA)(),1)[0].data,o=(0,x.useState)(""),a=o[0],s=o[1],c=(0,x.useState)(),j=c[0],S=c[1],P=(0,x.useState)("unsubmitted"),E=P[0],I=P[1],_=O((0,g.mx)(),1)[0],z=_.data,C=_.error,M=_.loading,N=(0,x.useState)("Loading..."),L=N[0],T=N[1],W=(0,g.yL)(),X=(0,x.useState)(),Z=X[0],q=X[1],K=(0,x.useState)(),D=K[0],U=K[1],H=(0,x.useState)(!1),J=H[0],R=H[1],V=(0,x.useState)(!1),F=V[0],G=V[1],$=((null===(e=O((0,g.LN)(),1)[0].data.chain)||void 0===e?void 0:e.name)||"mainnet").toLowerCase(),B=y.S[$],Q=B.address,Y=B.merkleTree,ee=B.blockExplorer,te=r?Y.proofs[null===r||void 0===r?void 0:r.address.toLowerCase()]:void 0,re=(0,g.cq)({addressOrName:Q,contractInterface:k,signerOrProvider:z||W});(0,x.useEffect)((function(){re._mintPrice().then((function(e){return q(e)})),re.isMintable().then((function(e){return U(e)})),(null===r||void 0===r?void 0:r.address)&&(0,b.isAddress)(null===r||void 0===r?void 0:r.address)&&re.hasMinted((0,b.getAddress)(null===r||void 0===r?void 0:r.address)).then((function(e){return G(e)}))}),[null===r||void 0===r?void 0:r.address,Q]);var ne="undefined"===typeof D,ie="undefined"===typeof Z;(0,x.useEffect)((function(){T(ne||ie||M?"Loading...":D?te?F?"Already minted!":J?"Minting...":"Mint":"Not on the whitelist!":"Minting disabled")}),[D,M,ie,F]);var oe=function(){var e=w(u().mark((function e(){var t;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(te&&!ne&&!ie){e.next=3;break}return console.error({proof:te,isMintableLoading:ne,isMintPriceLoading:ie}),e.abrupt("return");case 3:return e.prev=3,R(!0),e.next=7,re.mint(te,{value:Z});case 7:t=e.sent,S(t),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(3),I("error"),s(A(e.t0.message));case 15:case"end":return e.stop()}}),e,null,[[3,11]])})));return function(){return e.apply(this,arguments)}}(),ae=(0,x.useState)(),se=ae[0],ce=ae[1];return(0,g.y2)({addressOrName:Q,contractInterface:k},"Transfer",function(){var e=w(u().mark((function e(n){var i,o,a,s,c;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i=O(n,4),o=i[0],a=i[1],s=i[2],c=i[3],console.log({from:o,to:a,tokenId:s,event:c}),a.toLowerCase()===(null===r||void 0===r?void 0:r.address.toLowerCase())&&(console.log("your nft was minted!!",s.toNumber()),ce(s.toNumber()),T("Minted!"),R(!1),I("success"),t(!0));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),(0,n.jsx)(i.W2,{p:6,maxWidth:"400px",display:"block",overflow:"none",children:(0,n.jsx)(f.NI,{error:a||void 0,children:(0,n.jsxs)(i.Kq,{spacing:8,children:[(0,n.jsx)(l.y,{active:!!se&&"success"===E,pfpId:se}),(0,n.jsxs)(i.Kq,{spacing:2,hidden:!!te,children:[(0,n.jsx)(i.xv,{children:"Your address is not on the whitelist. "}),(0,n.jsx)(i.EK,{children:r&&r.address})]}),(0,n.jsx)(h.u,{children:(0,n.jsx)(p.zx,{isLoading:ne||ie||M||J,loadingText:L,onClick:oe,disabled:!!(!te||M||C||ie||!D||"Minted!"===L||F||J),boxShadow:"lg",fontWeight:"600",_hover:{boxShadow:"md"},_active:{boxShadow:"lg"},children:L})}),(0,n.jsx)(v.bZ,{status:"success"===E?"success":"error",fontSize:"md",alignItems:"center",justifyContent:"center",textAlign:"center",hidden:"unsubmitted"===E,children:"success"===E?(0,n.jsx)(v.X,{mt:-1,children:(0,n.jsxs)(i.kC,{children:[(0,n.jsx)(i.M5,{children:"Successfully minted!"}),j&&(0,n.jsx)(i.M5,{children:(0,n.jsx)(p.zx,{rightIcon:(0,n.jsx)(d.xP,{}),as:"a",size:"xs",ml:2,target:"_blank",href:"".concat(ee,"/tx/").concat(j.hash),children:"Etherscan"})})]})}):(0,n.jsxs)(v.X,{mt:-1,children:[(0,n.jsx)(i.xv,{mb:4,children:a}),(0,n.jsx)(i.xv,{as:"pre",fontSize:"8px",textAlign:"left",lineHeight:"8px",hidden:!te,children:JSON.stringify(te,void 0,4)})]})})]})})})},E=r(3942),I=r(9583);function _(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function z(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var C={github:I.hJX,linkedin:I.ltd,email:I.SRX,twitter:I.fWC,discord:I.j2d},M=function(e){var t=e.socialLinks,r=e.fontSize,i=z(e,["socialLinks","fontSize"]);return(0,n.jsx)(p.hE,function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){_(e,t,r[t])}))}return e}({variant:"ghost"},i,{children:t.map((function(e){var t=e.href,i=e.social;return(0,n.jsx)(p.hU,{as:"a",href:t,target:"_blank","aria-label":i,icon:(0,n.jsx)(E.JO,{as:C[i],fontSize:r})},"button-".concat(i,"-").concat(t))}))}))},N=r(8753),L=r(365),T=r.n(L),W=r(7563);function X(e,t,r,n,i,o,a){try{var s=e[o](a),c=s.value}catch(u){return void r(u)}s.done?t(c):Promise.resolve(c).then(n,i)}function Z(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function q(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){Z(e,t,r[t])}))}return e}function K(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var D="https://atxdao.us6.list-manage.com/subscribe/post-json?u=a4c2b4ef30c235da6122bddf8&id=189b82bd8d",U=function(e){var t=e.placeholder,r=e.children,i=e.setValue,a=K(e,["placeholder","children","setValue"]);return(0,n.jsx)(f.NI,{isRequired:!0,children:(0,n.jsxs)(N.BZ,{children:[(0,n.jsx)(N.Z8,{children:r}),(0,n.jsx)(N.II,q({placeholder:t,"aria-label":t,_placeholder:{color:(0,o.ff)("gray.600","gray.200")},onChange:function(e){return i(e.target.value)}},a))]})})},H=function(){var e=(0,x.useState)(""),t=e[0],r=e[1],o=(0,x.useState)(!1),a=o[0],s=o[1],c=(0,x.useState)("unsubmitted"),l=c[0],h=c[1],b=(0,x.useState)(""),m=b[0],y=b[1],g=function(){var e,r=(e=u().mark((function e(r){var n,i;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r.preventDefault(),n=(0,W.stringify)({MERGE0:t}),s(!0),i=[D,n].join("&"),T()(i,{param:"c"},(function(e,t){e?(h("error"),y("Failed to add to list: ".concat(e.toString()))):"success"===t.result||t.msg.includes("already subscribed")?(h("success"),y("Thanks for subscribing!")):(h("error"),y(t.msg)),s(!1)}));case 5:case"end":return e.stop()}}),e)})),function(){var t=this,r=arguments;return new Promise((function(n,i){var o=e.apply(t,r);function a(e){X(o,n,i,a,s,"next",e)}function s(e){X(o,n,i,a,s,"throw",e)}a(void 0)}))});return function(e){return r.apply(this,arguments)}}();return(0,n.jsx)(i.W2,{p:6,maxWidth:"420px",display:"block",overflow:"auto",children:(0,n.jsx)("form",{onSubmit:g,children:(0,n.jsxs)(i.Kq,{spacing:3,children:[(0,n.jsx)(U,{type:"email",name:"email",value:t,setValue:r,placeholder:"Email",children:(0,n.jsx)(d.Km,{})}),(0,n.jsx)(p.zx,{type:"submit",boxShadow:a?"lg":"sm",fontWeight:"600",disabled:a,_hover:{boxShadow:"md"},_active:{boxShadow:"lg"},children:"Sign up for dao updates"}),(0,n.jsx)(f.NI,{hidden:"unsubmitted"!==l,children:(0,n.jsx)(f.Q6,{color:"gray.600",children:"We will never share your email."})}),(0,n.jsxs)(v.bZ,{status:"success"===l?"success":"error",fontSize:"md",alignItems:"center",justifyContent:"center",textAlign:"center",hidden:"unsubmitted"===l,children:[(0,n.jsx)(v.zM,{}),(0,n.jsx)(v.X,{mt:-1,children:m})]})]})})})};function J(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function R(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,i,o=[],a=!0,s=!1;try{for(r=r.call(e);!(a=(n=r.next()).done)&&(o.push(n.value),!t||o.length!==t);a=!0);}catch(c){s=!0,i=c}finally{try{a||null==r.return||r.return()}finally{if(s)throw i}}return o}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return J(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return J(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var V=function(){var e=R((0,g.mA)(),1)[0].data;return(0,n.jsx)(a.A,{title:"atxdao",connected:!!e,children:(0,n.jsx)(i.xu,{textAlign:"center",fontSize:"xl",children:(0,n.jsx)(i.rj,{minH:"100vh",p:3,mt:"5vh",children:(0,n.jsxs)(i.gC,{spacing:[4,4,8],children:[e?(0,n.jsx)(P,{}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i.xv,{fontSize:["3.2rem","4rem","5rem"],lineHeight:1,children:"ATX DAO"}),(0,n.jsx)(s.T,{boxSize:["256px","256px","384px"],fill:(0,o.ff)("gray.800","gray.100")}),(0,n.jsx)(H,{})]}),(0,n.jsx)(M,{fontSize:["2rem","2rem","3rem"],color:(0,o.ff)("gray.800","gray.100"),spacing:[2,2,4],socialLinks:[{social:"discord",href:"https://discord.gg/3uGPbZhk3U"},{social:"github",href:"https://github.com/atxdao"}]})]})})})})}}},function(e){e.O(0,[445,615,676,167,774,888,179],(function(){return t=5301,e(e.s=t);var t}));var t=e.O();_N_E=t}]);