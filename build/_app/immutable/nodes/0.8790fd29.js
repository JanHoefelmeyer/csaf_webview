import{s as N,c as R,u as k,g as q,d as P,r as W,e as B}from"../chunks/scheduler.8b5db029.js";import{S as J,i as K,g as v,s as j,m as O,h,j as E,x as Q,c as T,n as C,f as p,k as m,a as U,y as n,z as F,o as X,d as Y,t as Z}from"../chunks/index.6c9b7412.js";import{a as x}from"../chunks/store.05414360.js";import{b as G}from"../chunks/paths.f201ac10.js";const ee=!0,re=Object.freeze(Object.defineProperty({__proto__:null,prerender:ee},Symbol.toStringTag,{value:"Module"}));function te(e){let a,s,r,S='<h1 role="heading">CSAF Webview</h1>',_,f,i,b,w,c,o,y,D,I,u,L,H;const M=e[6].default,l=R(M,e,e[5],null);return{c(){a=v("div"),s=v("div"),r=v("div"),r.innerHTML=S,_=j(),f=v("div"),i=v("a"),b=O(e[0]),w=j(),c=v("div"),o=v("h4"),y=O("v"),D=O(e[2]),I=j(),l&&l.c(),this.h()},l(t){a=h(t,"DIV",{class:!0});var d=E(a);s=h(d,"DIV",{class:!0});var g=E(s);r=h(g,"DIV",{class:!0,"data-svelte-h":!0}),Q(r)!=="svelte-1pu8gju"&&(r.innerHTML=S),_=T(g),f=h(g,"DIV",{});var $=E(f);i=h($,"A",{href:!0,class:!0});var z=E(i);b=C(z,e[0]),z.forEach(p),$.forEach(p),w=T(g),c=h(g,"DIV",{class:!0});var A=E(c);o=h(A,"H4",{});var V=E(o);y=C(V,"v"),D=C(V,e[2]),V.forEach(p),A.forEach(p),g.forEach(p),I=T(d),l&&l.l(d),d.forEach(p),this.h()},h(){m(r,"class","programname svelte-1ba10ha"),m(i,"href",e[1]),m(i,"class","switchbutton button svelte-1ba10ha"),m(c,"class","version svelte-1ba10ha"),m(s,"class","header svelte-1ba10ha"),m(a,"class","content svelte-1ba10ha")},m(t,d){U(t,a,d),n(a,s),n(s,r),n(s,_),n(s,f),n(f,i),n(i,b),n(s,w),n(s,c),n(c,o),n(o,y),n(o,D),n(a,I),l&&l.m(a,null),u=!0,L||(H=[F(window,"dragover",e[3]),F(window,"drop",e[3])],L=!0)},p(t,[d]){(!u||d&1)&&X(b,t[0]),(!u||d&2)&&m(i,"href",t[1]),l&&l.p&&(!u||d&32)&&k(l,M,t,t[5],u?P(M,t[5],d,null):q(t[5]),null)},i(t){u||(Y(l,t),u=!0)},o(t){Z(l,t),u=!1},d(t){t&&p(a),l&&l.d(t),L=!1,W(H)}}}function se(e,a,s){let r,S,_;B(e,x,o=>s(4,_=o));let{$$slots:f={},$$scope:i}=a;const b="0.7.2-dev",w={SINGLE:"Switch to ROLIE-feed",FEED:"Switch to single view"},c=o=>{o.preventDefault()};return e.$$set=o=>{"$$scope"in o&&s(5,i=o.$$scope)},e.$$.update=()=>{e.$$.dirty&16&&s(0,r=_.ui.appMode),e.$$.dirty&1&&s(1,S=r===w.SINGLE?`${G}/feed`:`${G}/`)},[r,S,b,c,_,i,f]}class ie extends J{constructor(a){super(),K(this,a,se,te,N,{})}}export{ie as component,re as universal};
