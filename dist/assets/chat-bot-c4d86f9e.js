import{j as e,w as Z,T as v,K as a,r as m,I as k,C as y,a3 as _,N as E,F as O,a4 as $,a5 as ee,O as ne,a6 as D,a7 as te,Q as se,S as ae,R as L,E as ie,a8 as re,a9 as le,M as W,W as oe}from"./index-0fca6773.js";import{T as S,a as g,b as ce,c as de,d as he,e as ue,u as b,f as xe,g as pe,C as me}from"./user-bcbc9869.js";import{L as U}from"./label-6990dc07.js";function q({query:n}){return e.jsx(S,{children:e.jsx(g,{align:"center",colSpan:6,sx:{py:3},children:e.jsxs(Z,{sx:{textAlign:"center"},children:[e.jsx(v,{variant:"h6",paragraph:!0,children:"Not found"}),e.jsxs(v,{variant:"body2",children:["No results found for  ",e.jsxs("strong",{children:['"',n,'"']}),".",e.jsx("br",{})," Try checking for typos or using complete words."]})]})})})}q.propTypes={query:a.string};function z({selected:n,name:t,avatarUrl:s,company:c,domain:i,role:d,isVerified:x,status:j,email:l,handleClick:C}){const[p,w]=m.useState(null),T=P=>{w(P.currentTarget)},f=()=>{w(null)};return e.jsxs(e.Fragment,{children:[e.jsxs(S,{hover:!0,tabIndex:-1,role:"checkbox",selected:n,children:[e.jsx(g,{children:i}),e.jsx(g,{children:e.jsx(U,{color:j==="banned"&&"error"||"success",children:j})}),e.jsx(g,{children:e.jsx(U,{children:l})}),e.jsx(g,{align:"right",children:e.jsx(k,{onClick:T,children:e.jsx(y,{icon:"eva:more-vertical-fill"})})})]}),e.jsxs(_,{open:!!p,anchorEl:p,onClose:f,anchorOrigin:{vertical:"top",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"right"},PaperProps:{sx:{width:140}},children:[e.jsx(E,{onClick:f,children:"Active"}),e.jsx(E,{onClick:f,sx:{color:"error.main"},children:"Inactive"})]})]})}z.propTypes={avatarUrl:a.any,company:a.any,handleClick:a.func,isVerified:a.any,name:a.any,email:a.any,role:a.any,selected:a.any,status:a.string,domain:a.string};const ge={border:0,margin:-1,padding:0,width:"1px",height:"1px",overflow:"hidden",position:"absolute",whiteSpace:"nowrap",clip:"rect(0 0 0 0)"};function je(n,t,s){return n?Math.max(0,(1+n)*t-s):0}function M(n,t,s){return n[s]===null?1:t[s]===null||t[s]<n[s]?-1:t[s]>n[s]?1:0}function fe(n,t){return n==="desc"?(s,c)=>M(s,c,t):(s,c)=>-M(s,c,t)}function be({inputData:n,comparator:t,filterName:s}){const c=n.map((i,d)=>[i,d]);return c.sort((i,d)=>{const x=t(i[0],d[0]);return x!==0?x:i[1]-d[1]}),n=c.map(i=>i[0]),s&&(n=n.filter(i=>i.name.toLowerCase().indexOf(s.toLowerCase())!==-1)),n}function H({order:n,orderBy:t,rowCount:s,headLabel:c,numSelected:i,onRequestSort:d,onSelectAllClick:x}){const j=l=>C=>{d(C,l)};return e.jsx(ce,{children:e.jsx(S,{children:c.map(l=>e.jsx(g,{align:l.align||"left",sortDirection:t===l.id?n:!1,sx:{width:l.width,minWidth:l.minWidth},children:e.jsxs(de,{hideSortIcon:!0,active:t===l.id,direction:t===l.id?n:"asc",onClick:j(l.id),children:[l.label,t===l.id?e.jsx(O,{sx:{...ge},children:n==="desc"?"sorted descending":"sorted ascending"}):null]})},l.id))})})}H.propTypes={order:a.oneOf(["asc","desc"]),orderBy:a.string,rowCount:a.number,headLabel:a.array,numSelected:a.number,onRequestSort:a.func,onSelectAllClick:a.func};function V({emptyRows:n,height:t}){return n?e.jsx(S,{sx:{...t&&{height:t*n}},children:e.jsx(g,{colSpan:9})}):null}V.propTypes={emptyRows:a.number,height:a.number};function K({numSelected:n,filterName:t,onFilterName:s}){return e.jsxs($,{sx:{height:96,display:"flex",justifyContent:"space-between",p:c=>c.spacing(0,1,0,3),...n>0&&{color:"primary.main",bgcolor:"primary.lighter"}},children:[n>0?e.jsxs(v,{component:"div",variant:"subtitle1",children:[n," selected"]}):e.jsx(ee,{value:t,onChange:s,placeholder:"Search user...",startAdornment:e.jsx(ne,{position:"start",children:e.jsx(y,{icon:"eva:search-fill",sx:{color:"text.disabled",width:20,height:20}})})}),n>0?e.jsx(D,{title:"Delete",children:e.jsx(k,{children:e.jsx(y,{icon:"eva:trash-2-fill"})})}):e.jsx(D,{title:"Filter list",children:e.jsx(k,{children:e.jsx(y,{icon:"ic:round-filter-list"})})})]})}K.propTypes={numSelected:a.number,filterName:a.string,onFilterName:a.func};function ye(){const[n,t]=m.useState(0),[s,c]=m.useState("asc"),[i,d]=m.useState([]),[x,j]=m.useState("name"),[l,C]=m.useState(""),[p,w]=m.useState(5),T=(r,o)=>{o!==""&&(c(x===o&&s==="asc"?"desc":"asc"),j(o))},f=r=>{if(r.target.checked){const o=b.map(h=>h.name);d(o);return}d([])},P=(r,o)=>{const h=i.indexOf(o);let u=[];h===-1?u=u.concat(i,o):h===0?u=u.concat(i.slice(1)):h===i.length-1?u=u.concat(i.slice(0,-1)):h>0&&(u=u.concat(i.slice(0,h),i.slice(h+1))),d(u)},Q=(r,o)=>{t(o)},Y=r=>{t(0),w(parseInt(r.target.value,10))},B=r=>{t(0),C(r.target.value)},I=be({inputData:b,comparator:fe(s,x),filterName:l}),G=!I.length&&!!l,[J,N]=te.useState(!1),X=()=>{N(!0)},R=()=>{N(!1)},[A,F]=m.useState({email:"",company:""});return e.jsxs(se,{children:[e.jsxs(ae,{direction:"row",alignItems:"center",justifyContent:"space-between",mb:5,children:[e.jsx(v,{variant:"h4",children:"Chatbot"}),e.jsx(L,{variant:"contained",color:"inherit",startIcon:e.jsx(y,{icon:"eva:plus-fill"}),onClick:X,children:"New Chatbot"})]}),e.jsxs(ie,{children:[e.jsx(K,{numSelected:i.length,filterName:l,onFilterName:B}),e.jsx(re,{children:e.jsx(he,{sx:{overflow:"unset"},children:e.jsxs(ue,{sx:{minWidth:800},children:[e.jsx(H,{order:s,orderBy:x,rowCount:b.length,numSelected:i.length,onRequestSort:T,onSelectAllClick:f,headLabel:[{id:"domain",label:"Domain"},{id:"status",label:"Status"},{id:"email",label:"Email"},{id:""}]}),e.jsxs(xe,{children:[I.slice(n*p,n*p+p).map(r=>e.jsx(z,{domain:r.domain,status:r.status,email:r.email,company:r.company,selected:i.indexOf(r.name)!==-1,handleClick:o=>P(o,r.name)},r.id)),e.jsx(V,{height:77,emptyRows:je(n,p,b.length)}),G&&e.jsx(q,{query:l})]})]})})}),e.jsx(pe,{page:n,component:"div",count:b.length,rowsPerPage:p,onPageChange:Q,rowsPerPageOptions:[5,10,25],onRowsPerPageChange:Y})]}),e.jsx(le,{open:J,onClose:R,sx:{width:"100vw"},children:e.jsxs(O,{width:"30vw",p:2,display:"flex",flexDirection:"column",gap:2,children:[e.jsxs(O,{display:"flex",alignItems:"center",justifyContent:"space-between",children:[e.jsx(v,{variant:"h5",children:"Add New Chatbot"}),e.jsx(me,{sx:{cursor:"pointer"},onClick:()=>{R()}})]}),e.jsx(W,{label:"Email",variant:"outlined",placeholder:"Please Enter Your Email",onChange:r=>{F(o=>({...o,email:r.target.value}))},value:A.email,fullWidth:!0,height:"20px"}),e.jsx(W,{label:"Domain Name",placeholder:"Please Enter Company Name",variant:"outlined",onChange:r=>{F(o=>({...o,company:r.target.value}))},value:A.company,fullWidth:!0,height:"20px"}),e.jsx(L,{fullWidth:!0,variant:"contained",color:"primary",children:"Add"})]})})]})}function Se(){return e.jsxs(e.Fragment,{children:[e.jsx(oe,{children:e.jsx("title",{children:" Email "})}),e.jsx(ye,{})]})}export{Se as default};