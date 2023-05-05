"use strict";(self.webpackChunklucas_pluvinage=self.webpackChunklucas_pluvinage||[]).push([[116],{9547:function(t,n,o){o.r(n),o.d(n,{Head:function(){return U},default:function(){return L}});var e=o(8733),r=o(6405),i=o(7294);function a({width:t,height:n}){return t/n}function s(t,n=0){const o=10**n;return Math.round((t+Number.EPSILON)*o)/o}class l{constructor(t){this.comparator=t,this.heap=[],this.n=0}greater(t,n){return this.comparator(this.heap[t],this.heap[n])<0}swap(t,n){const o=this.heap[t];this.heap[t]=this.heap[n],this.heap[n]=o}swim(t){let n=t,o=Math.floor(n/2);for(;n>1&&this.greater(o,n);)this.swap(o,n),n=o,o=Math.floor(n/2)}sink(t){let n=t,o=2*n;for(;o<=this.n&&(o<this.n&&this.greater(o,o+1)&&(o+=1),this.greater(n,o));)this.swap(n,o),n=o,o=2*n}push(t){this.n+=1,this.heap[this.n]=t,this.swim(this.n)}pop(){if(0===this.n)return;this.swap(1,this.n),this.n-=1;const t=this.heap.pop();return this.sink(1),t}size(){return this.n}}function u(t,n,o){const e=function(t,n,o){const e=new Map,r=new Set,i=new Map;i.set(n,0);const a=new l((s=t=>t.weight,(t,n)=>s(n)-s(t)));var s;for(a.push({id:n,weight:0});a.size()>0;){const{id:n,weight:o}=a.pop();if(!r.has(n)){const s=t(n);r.add(n),s.forEach(((t,r)=>{const s=o+t,l=e.get(r),u=i.get(r);(void 0===u||u>s&&(u/s>1.005||void 0!==l&&l<n))&&(i.set(r,s),a.push({id:r,weight:s}),e.set(r,n))}))}}return i.has(o)?e:void 0}(t,n,o);return e?function(t,n){const o=[];for(let e=n;void 0!==e;e=t.get(e))o.push(e);return o.reverse()}(e,o):void 0}function c(t,n,o,e){return(n-(t.length-1)*o-2*e*t.length)/t.reduce(((t,n)=>t+a(n)),0)}function h(t,n,o,e,r,i,a){const s=t.slice(n,o),l=c(s,e,i,a);return l>0?(l-r)**2*s.length:void 0}function d({photos:t,layoutOptions:n}){const{spacing:o,padding:e,containerWidth:r,targetRowHeight:i,rowConstraints:l}=n,d=function({photos:t,targetRowHeight:n,containerWidth:o}){return s(o/n/t.reduce(((t,n)=>Math.min(a(n),t)),Number.MAX_VALUE))+2}({photos:t,containerWidth:r,targetRowHeight:i}),p=function({photos:t,layoutOptions:n,targetRowHeight:o,limitNodeSearch:e,rowConstraints:r}){return i=>{var a,s;const{containerWidth:l,spacing:u,padding:c}=n,d=new Map;d.set(i,0);const p=null!==(a=null==r?void 0:r.minPhotos)&&void 0!==a?a:1,m=Math.min(e,null!==(s=null==r?void 0:r.maxPhotos)&&void 0!==s?s:1/0);for(let n=i+p;n<t.length+1&&!(n-i>m);n+=1){const e=h(t,i,n,l,o,u,c);if(void 0===e)break;d.set(n,e)}return d}}({photos:t,layoutOptions:n,targetRowHeight:i,limitNodeSearch:d,rowConstraints:l}),m=u(p,0,t.length);if(void 0===m)return;const g=[];for(let s=1;s<m.length;s+=1){const n=t.map(((t,n)=>({photo:t,index:n}))).slice(m[s-1],m[s]),i=c(n.map((({photo:t})=>t)),r,o,e);g.push(n.map((({photo:t,index:o},e)=>({photo:t,layout:{height:i,width:i*a(t),index:o,photoIndex:e,photosCount:n.length}}))))}return g}function p(t,{width:n,photosCount:o},{spacing:e,padding:r,containerWidth:i}){const a=e*(o-1)+2*r*o;return`calc((${t} - ${a}px) / ${s((i-a)/n,5)})`}function m(t,n){return"rows"!==n.layout?`calc(100% - ${2*n.padding}px)`:p("100%",t,n)}function g(t,n,o){var e,r;return p(null!==(r=null===(e=t.match(/calc\((.*)\)/))||void 0===e?void 0:e[1])&&void 0!==r?r:t,n,o)}function f(t,n,o){let e,r;return t.images&&t.images.length>0&&(e=t.images.concat(t.images.find((({width:n})=>n===t.width))?[]:[{src:t.src,width:t.width,height:t.height}]).sort(((t,n)=>t.width-n.width)).map((t=>`${t.src} ${t.width}w`)).join(", ")),o.sizes?r=(o.sizes.sizes||[]).map((({viewport:t,size:e})=>`${t} ${g(e,n,o)}`)).concat(g(o.sizes.size,n,o)).join(", "):e&&(r=`${Math.ceil(n.width/o.containerWidth*100)}vw`),{srcSet:e,sizes:r}}function y(t){var n,o;const{photo:e,layout:r,layoutOptions:a,imageProps:{style:s,...l}={},renderPhoto:u}=t,{onClick:c}=a,h={display:"block",boxSizing:"content-box",width:m(r,a),height:"auto",aspectRatio:`${e.width} / ${e.height}`,...a.padding?{padding:`${a.padding}px`}:null,...("columns"===a.layout||"masonry"===a.layout)&&r.photoIndex<r.photosCount-1?{marginBottom:`${a.spacing}px`}:null,...c?{cursor:"pointer"}:null,...s},d=c?t=>{c({event:t,photo:e,index:r.index})}:void 0,p={src:e.src,alt:null!==(n=e.alt)&&void 0!==n?n:"",title:e.title,onClick:d,style:h,className:"react-photo-album--photo",loading:"lazy",decoding:"async",...f(e,r,a),...l},g=t=>{const{src:n,alt:o,srcSet:e,sizes:r,style:a,...s}=p;return i.createElement("img",{alt:o,...e?{srcSet:e,sizes:r}:null,src:n,style:(null==t?void 0:t.wrapped)?{display:"block",width:"100%",height:"100%"}:a,...s})},y=(({display:t,boxSizing:n,width:o,aspectRatio:e,padding:r,marginBottom:i,cursor:a})=>({display:t,boxSizing:n,width:o,aspectRatio:e,padding:r,marginBottom:i,cursor:a}))(h);return i.createElement(i.Fragment,null,null!==(o=null==u?void 0:u({photo:e,layout:r,layoutOptions:a,imageProps:p,renderDefaultPhoto:g,wrapperStyle:y}))&&void 0!==o?o:g())}function w({rowContainerProps:t,children:n}){return i.createElement("div",{...t},n)}function v(t){const{layoutOptions:n,rowIndex:o,rowsCount:e,renderRowContainer:r,rowContainerProps:{style:a,...s}={},children:l}=t,u={className:"react-photo-album--row",style:{display:"flex",flexDirection:"row",flexWrap:"nowrap",alignItems:"flex-start",justifyContent:"space-between",...o<e-1?{marginBottom:`${n.spacing}px`}:null,...a},...s};return i.createElement(i.Fragment,null,(null!=r?r:w)({layoutOptions:n,rowIndex:o,rowsCount:e,rowContainerProps:u,children:l}))}function C(t){const{photos:n,layoutOptions:o,renderPhoto:e,renderRowContainer:r,componentsProps:a}=t,s=d({photos:n,layoutOptions:o});return s?i.createElement(i.Fragment,null,s.map(((t,n)=>i.createElement(v,{key:`row-${n}`,layoutOptions:o,rowIndex:n,rowsCount:s.length,renderRowContainer:r,rowContainerProps:null==a?void 0:a.rowContainerProps},t.map((({photo:t,layout:n})=>i.createElement(y,{key:t.key||t.src,photo:t,layout:n,layoutOptions:o,renderPhoto:e,imageProps:null==a?void 0:a.imageProps}))))))):null}function x(t,n,o,e){return function(t,n,o){const e=[o];for(let r=o,i=n;i>0;i-=1)r=t.get(r)[i].node,e.push(r);return e.reverse()}(function(t,n,o,e){const r=new Map,i=new Set;i.add(o);for(let a=0;a<n;a+=1){const o=[...i.keys()];i.clear(),o.forEach((o=>{const s=a>0?r.get(o)[a].weight:0;t(o).forEach((({neighbor:t,weight:l})=>{let u=r.get(t);u||(u=[],r.set(t,u));const c=s+l,h=u[a+1];(!h||h.weight>c&&(h.weight/c>1.0001||o<h.node))&&(u[a+1]={node:o,weight:c}),a<n-1&&t!==e&&i.add(t)}))}))}return r}(t,n,o,e),n,e)}function P({path:t,photos:n,containerWidth:o,columnsGaps:e,columnsRatios:r,spacing:i,padding:s}){const l=[],u=r.reduce(((t,n)=>t+n),0);for(let c=0;c<t.length-1;c+=1){const h=n.map(((t,n)=>({photo:t,index:n}))).slice(t[c],t[c+1]),d=r.reduce(((t,n,o)=>t+(e[c]-e[o])*n),0),p=(o-(t.length-2)*i-2*(t.length-1)*s-d)*r[c]/u;l.push(h.map((({photo:t,index:n},o)=>({photo:t,layout:{width:p,height:p/a(t),index:n,photoIndex:o,photosCount:h.length}}))))}return l}function W({photos:t,layoutOptions:n,targetColumnWidth:o}){const{columns:e,spacing:r,padding:i,containerWidth:s}=n,l=[],u=[];if(t.length<=e){const n=t.length>0?t.reduce(((t,n)=>t+a(n)),0)/t.length:1;for(let o=0;o<e;o+=1)l[o]=2*i,u[o]=o<t.length?a(t[o]):n;return{columnsGaps:l,columnsRatios:u,columnsModel:P({path:Array.from({length:e+1}).map(((n,o)=>Math.min(o,t.length))),photos:t,columnsRatios:u,columnsGaps:l,containerWidth:s,spacing:r,padding:i})}}const c=(t.reduce(((t,n)=>t+o/a(n)),0)+r*(t.length-e)+2*i*t.length)/e,h=function({photos:t,spacing:n,padding:o,targetColumnWidth:e,targetColumnHeight:r}){return i=>{const s=[],l=1.5*r;let u=e/a(t[i])+2*o;for(let c=i+1;c<t.length+1&&(s.push({neighbor:c,weight:(r-u)**2}),!(u>l||c===t.length));c+=1)u+=e/a(t[c])+n+2*o;return s}}({photos:t,targetColumnWidth:o,targetColumnHeight:c,spacing:r,padding:i}),d=x(h,e,0,t.length);for(let p=0;p<d.length-1;p+=1){const n=t.slice(d[p],d[p+1]);l[p]=r*(n.length-1)+2*i*n.length,u[p]=1/n.reduce(((t,n)=>t+1/a(n)),0)}return{columnsGaps:l,columnsRatios:u,columnsModel:P({path:d,photos:t,columnsRatios:u,columnsGaps:l,containerWidth:s,spacing:r,padding:i})}}function b(t){const{photos:n,layoutOptions:o}=t,{columns:e,spacing:r,padding:i,containerWidth:a}=o,s=(a-r*(e-1)-2*i*e)/e,{columnsGaps:l,columnsRatios:u,columnsModel:c}=W({photos:n,layoutOptions:o,targetColumnWidth:s});return c.findIndex((t=>t.findIndex((({layout:{width:t,height:n}})=>t<0||n<0))>=0))>=0?e>1?b({photos:n,layoutOptions:{...o,columns:e-1}}):void 0:{columnsModel:c,columnsGaps:l,columnsRatios:u}}function O({photos:t,layoutOptions:n}){return b({photos:t,layoutOptions:n})}function R({columnContainerProps:t,children:n}){return i.createElement("div",{...t},n)}function k(t){const{layoutOptions:n,columnIndex:o,columnsCount:e,columnsGaps:r,columnsRatios:i}=t,{layout:a,spacing:l,padding:u}=n;if("masonry"===a||!r||!i)return`calc((100% - ${l*(e-1)}px) / ${e})`;const c=i.reduce(((t,n)=>t+n),0),h=i.reduce(((t,n,e)=>t+(r[o]-r[e])*n),0);return`calc((100% - ${s((e-1)*l+2*e*u+h,3)}px) * ${s(i[o]/c,5)} + ${2*u}px)`}function E(t){const{layoutOptions:n,renderColumnContainer:o,children:e,columnContainerProps:{style:r,...a}={},...s}=t,l={className:"react-photo-album--column",style:{display:"flex",flexDirection:"column",flexWrap:"nowrap",alignItems:"flex-start",width:k(t),justifyContent:"columns"===n.layout?"space-between":"flex-start",...r},...a};return i.createElement(i.Fragment,null,(null!=o?o:R)({layoutOptions:n,columnContainerProps:l,children:e,...s}))}function I(t){const{photos:n,layoutOptions:o,renderPhoto:e,renderColumnContainer:r,componentsProps:a}=t,s=O({photos:n,layoutOptions:o});if(!s)return null;const{columnsModel:l,columnsRatios:u,columnsGaps:c}=s;return i.createElement(i.Fragment,null,l.map(((t,n)=>i.createElement(E,{key:`column-${n}`,layoutOptions:o,columnIndex:n,columnsCount:l.length,columnsGaps:c,columnsRatios:u,renderColumnContainer:r,columnContainerProps:null==a?void 0:a.columnContainerProps},t.map((({photo:t,layout:n})=>i.createElement(y,{key:t.key||t.src,photo:t,layout:n,layoutOptions:o,renderPhoto:e,imageProps:null==a?void 0:a.imageProps})))))))}function $(t){const{photos:n,layoutOptions:o}=t,{columns:e,spacing:r,padding:i,containerWidth:s}=o,l=(s-r*(e-1)-2*i*e)/e;if(l<=0)return e>1?$({...t,layoutOptions:{...o,columns:e-1}}):void 0;const u=[];for(let a=0;a<e;a+=1)u[a]=0;return n.reduce(((t,n,o)=>{const e=u.reduce(((t,n,o)=>n<u[t]-1?o:t),0);return u[e]=u[e]+l/a(n)+r+2*i,t[e].push({photo:n,index:o}),t}),Array.from({length:e}).map((()=>[]))).map((t=>t.map((({photo:n,index:o},e)=>({photo:n,layout:{width:l,height:l/a(n),index:o,photoIndex:e,photosCount:t.length}})))))}function z(t){const{photos:n,layoutOptions:o,renderPhoto:e,renderColumnContainer:r,componentsProps:a}=t,s=$({photos:n,layoutOptions:o});return s?i.createElement(i.Fragment,null,s.map(((t,n)=>i.createElement(E,{key:`masonry-column-${n}`,layoutOptions:o,columnsCount:s.length,columnIndex:n,renderColumnContainer:r,columnContainerProps:null==a?void 0:a.columnContainerProps},t.map((({photo:t,layout:n})=>i.createElement(y,{key:t.key||t.src,photo:t,layout:n,layoutOptions:o,renderPhoto:e,imageProps:null==a?void 0:a.imageProps}))))))):null}function M({containerProps:t,children:n,containerRef:o}){return i.createElement("div",{ref:o,...t},n)}function S(t){const{layout:n,renderContainer:o,children:e,containerRef:r,containerProps:{style:a,...s}={}}=t,l={className:`react-photo-album react-photo-album--${n}`,style:{display:"flex",flexWrap:"nowrap",justifyContent:"space-between",flexDirection:"rows"===n?"column":"row",...a},...s};return i.createElement(i.Fragment,null,(null!=o?o:M)({containerProps:l,containerRef:r,layout:n,children:e}))}function G(t,{newContainerWidth:n,newScrollbarWidth:o}){const{containerWidth:e,scrollbarWidth:r}=t;return void 0!==e&&void 0!==r&&void 0!==n&&void 0!==o&&n>e&&n-e<=20&&o<r?{containerWidth:e,scrollbarWidth:o}:e!==n||r!==o?{containerWidth:n,scrollbarWidth:o}:t}function H(t,n){let o=null==t?void 0:t.clientWidth;if(void 0!==o&&n&&n.length>0){const t=[...n.filter((t=>t>0))].sort(((t,n)=>n-t));t.push(Math.floor(t[t.length-1]/2));const e=o;o=t.find(((n,o)=>n<=e||o===t.length-1))}return o}const N=Object.freeze([1200,600,300,0]);function j(t,n){return"function"==typeof t?t(n):t}function D(t,n){return void 0!==t?j(t,n):void 0}function F(t,n,o,e=0){const r=D(t,n);return Math.round(Math.max(void 0===r?function(t,n){const o=N.findIndex((t=>t<=n));return j(t[o>=0?o:0],n)}(o,n):r,e))}function A(t,n,o){const{photos:e,layout:r,renderPhoto:a,renderRowContainer:s,renderColumnContainer:l}=t,u=function({layout:t,onClick:n,containerWidth:o,targetRowHeight:e,rowConstraints:r,columns:i,spacing:a,padding:s,sizes:l}){return{layout:t,onClick:n,containerWidth:o,columns:F(i,o,[5,4,3,2],1),spacing:F(a,o,[20,15,10,5]),padding:F(s,o,[0,0,0,0,0]),targetRowHeight:F(e,o,[t=>t/5,t=>t/4,t=>t/3,t=>t/2]),rowConstraints:D(r,o),sizes:l}}({containerWidth:n,...t}),c={photos:e,renderPhoto:a,componentsProps:o};return"rows"===r?i.createElement(C,{layoutOptions:u,renderRowContainer:s,...c}):"columns"===r?i.createElement(I,{layoutOptions:u,renderColumnContainer:l,...c}):i.createElement(z,{layoutOptions:u,renderColumnContainer:l,...c})}function Z(t){const{photos:n,layout:o,renderContainer:e,defaultContainerWidth:r,breakpoints:a}=t,{containerRef:s,containerWidth:l}=function(t,n){const[{containerWidth:o},e]=i.useReducer(G,{containerWidth:n}),r=i.useRef(null),a=i.useRef();return{containerRef:i.useCallback((n=>{var o;null===(o=a.current)||void 0===o||o.disconnect(),a.current=void 0,r.current=n;const i=()=>e({newContainerWidth:H(r.current,t),newScrollbarWidth:window.innerWidth-document.documentElement.clientWidth});i(),n&&"undefined"!=typeof ResizeObserver&&(a.current=new ResizeObserver(i),a.current.observe(n))}),[t]),containerWidth:o}}(function(t){const n=i.useRef(t);return t&&n.current&&t.join()===n.current.join()||(n.current=t),n.current}(a),r);if(!o||!["rows","columns","masonry"].includes(o)||!Array.isArray(n))return null;const u=function(t,n){return"function"==typeof t?t(n):t}(t.componentsProps,l);return i.createElement(S,{layout:o,containerRef:s,renderContainer:e,containerProps:null==u?void 0:u.containerProps},l?A(t,l,u):null)}var B=o(8032),_=o(4321);var L=t=>(0,e.tZ)(r.A,{page:"photography",large:!0},(0,e.tZ)("h1",null,"i like taking pictures"),(0,e.tZ)(Z,{layout:"rows",photos:t.data.allFile.nodes.map((t=>{var n,o,e,r,i,a,s,l,u,c,h,d;return{width:null!==(n=null===(o=t.childImageSharp)||void 0===o||null===(e=o.gatsbyImageData)||void 0===e?void 0:e.width)&&void 0!==n?n:0,height:null!==(r=null===(i=t.childImageSharp)||void 0===i||null===(a=i.gatsbyImageData)||void 0===a?void 0:a.height)&&void 0!==r?r:0,src:null!==(s=null===(l=t.childImageSharp)||void 0===l||null===(u=l.gatsbyImageData)||void 0===u||null===(c=u.images)||void 0===c||null===(h=c.fallback)||void 0===h?void 0:h.src)&&void 0!==s?s:"",gatsby:null===(d=t.childImageSharp)||void 0===d?void 0:d.gatsbyImageData}})),renderImage:t=>(0,e.tZ)(B.G,{image:t.gatsby,alt:"photo",sx:{width:"100%",height:"100%"}})}));const U=()=>(0,e.tZ)(_.x,{title:"Photography"})}}]);
//# sourceMappingURL=component---src-pages-photography-tsx-a03fa3f857230a2d0611.js.map