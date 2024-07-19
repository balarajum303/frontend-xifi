import{j as e,w as _,T as v,K as a,r as m,I as P,C,a3 as $,N as F,F as k,a4 as B,a5 as ee,O as ne,a6 as E,a7 as te,Q as se,S as ae,R as L,E as ie,a8 as re,a9 as le,M as U,W as oe}from"./index-0fca6773.js";import{T as w,a as g,b as ce,c as de,d as he,e as ue,u as y,f as xe,g as pe,C as me}from"./user-bcbc9869.js";import{L as D}from"./label-6990dc07.js";function q({query:n}){return e.jsx(w,{children:e.jsx(g,{align:"center",colSpan:6,sx:{py:3},children:e.jsxs(_,{sx:{textAlign:"center"},children:[e.jsx(v,{variant:"h6",paragraph:!0,children:"Not found"}),e.jsxs(v,{variant:"body2",children:["No results found for  ",e.jsxs("strong",{children:['"',n,'"']}),".",e.jsx("br",{})," Try checking for typos or using complete words."]})]})})})}q.propTypes={query:a.string};function W({selected:n,name:t,avatarUrl:s,company:c,role:i,isVerified:d,status:h,email:f,handleClick:l}){const[j,p]=m.useState(null),S=T=>{p(T.currentTarget)},b=()=>{p(null)};return e.jsxs(e.Fragment,{children:[e.jsxs(w,{hover:!0,tabIndex:-1,role:"checkbox",selected:n,children:[e.jsx(g,{children:c}),e.jsx(g,{children:e.jsx(D,{color:h==="banned"&&"error"||"success",children:h})}),e.jsx(g,{children:e.jsx(D,{children:f})}),e.jsx(g,{align:"right",children:e.jsx(P,{onClick:S,children:e.jsx(C,{icon:"eva:more-vertical-fill"})})})]}),e.jsxs($,{open:!!j,anchorEl:j,onClose:b,anchorOrigin:{vertical:"top",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"right"},PaperProps:{sx:{width:140}},children:[e.jsx(F,{onClick:b,children:"Active"}),e.jsx(F,{onClick:b,sx:{color:"error.main"},children:"Inactive"})]})]})}W.propTypes={avatarUrl:a.any,company:a.any,handleClick:a.func,isVerified:a.any,name:a.any,email:a.any,role:a.any,selected:a.any,status:a.string};const ge={border:0,margin:-1,padding:0,width:"1px",height:"1px",overflow:"hidden",position:"absolute",whiteSpace:"nowrap",clip:"rect(0 0 0 0)"};function je(n,t,s){return n?Math.max(0,(1+n)*t-s):0}function M(n,t,s){return n[s]===null?1:t[s]===null||t[s]<n[s]?-1:t[s]>n[s]?1:0}function fe(n,t){return n==="desc"?(s,c)=>M(s,c,t):(s,c)=>-M(s,c,t)}function be({inputData:n,comparator:t,filterName:s}){const c=n.map((i,d)=>[i,d]);return c.sort((i,d)=>{const h=t(i[0],d[0]);return h!==0?h:i[1]-d[1]}),n=c.map(i=>i[0]),s&&(n=n.filter(i=>i.name.toLowerCase().indexOf(s.toLowerCase())!==-1)),n}function z({order:n,orderBy:t,rowCount:s,headLabel:c,numSelected:i,onRequestSort:d,onSelectAllClick:h}){const f=l=>j=>{d(j,l)};return e.jsx(ce,{children:e.jsx(w,{children:c.map(l=>e.jsx(g,{align:l.align||"left",sortDirection:t===l.id?n:!1,sx:{width:l.width,minWidth:l.minWidth},children:e.jsxs(de,{hideSortIcon:!0,active:t===l.id,direction:t===l.id?n:"asc",onClick:f(l.id),children:[l.label,t===l.id?e.jsx(k,{sx:{...ge},children:n==="desc"?"sorted descending":"sorted ascending"}):null]})},l.id))})})}z.propTypes={order:a.oneOf(["asc","desc"]),orderBy:a.string,rowCount:a.number,headLabel:a.array,numSelected:a.number,onRequestSort:a.func,onSelectAllClick:a.func};function H({emptyRows:n,height:t}){return n?e.jsx(w,{sx:{...t&&{height:t*n}},children:e.jsx(g,{colSpan:9})}):null}H.propTypes={emptyRows:a.number,height:a.number};function V({numSelected:n,filterName:t,onFilterName:s}){return e.jsxs(B,{sx:{height:96,display:"flex",justifyContent:"space-between",p:c=>c.spacing(0,1,0,3),...n>0&&{color:"primary.main",bgcolor:"primary.lighter"}},children:[n>0?e.jsxs(v,{component:"div",variant:"subtitle1",children:[n," selected"]}):e.jsx(ee,{value:t,onChange:s,placeholder:"Search user...",startAdornment:e.jsx(ne,{position:"start",children:e.jsx(C,{icon:"eva:search-fill",sx:{color:"text.disabled",width:20,height:20}})})}),n>0?e.jsx(E,{title:"Delete",children:e.jsx(P,{children:e.jsx(C,{icon:"eva:trash-2-fill"})})}):e.jsx(E,{title:"Filter list",children:e.jsx(P,{children:e.jsx(C,{icon:"ic:round-filter-list"})})})]})}V.propTypes={numSelected:a.number,filterName:a.string,onFilterName:a.func};function ye(){const[n,t]=m.useState(0),[s,c]=m.useState("asc"),[i,d]=m.useState([]),[h,f]=m.useState("name"),[l,j]=m.useState(""),[p,S]=m.useState(5),b=(r,o)=>{o!==""&&(c(h===o&&s==="asc"?"desc":"asc"),f(o))},T=r=>{if(r.target.checked){const o=y.map(u=>u.name);d(o);return}d([])},K=(r,o)=>{const u=i.indexOf(o);let x=[];u===-1?x=x.concat(i,o):u===0?x=x.concat(i.slice(1)):u===i.length-1?x=x.concat(i.slice(0,-1)):u>0&&(x=x.concat(i.slice(0,u),i.slice(u+1))),d(x)},Q=(r,o)=>{t(o)},Y=r=>{t(0),S(parseInt(r.target.value,10))},G=r=>{t(0),j(r.target.value)},N=be({inputData:y,comparator:fe(s,h),filterName:l}),J=!N.length&&!!l,[X,O]=te.useState(!1),Z=()=>{O(!0)},I=()=>{O(!1)},[R,A]=m.useState({email:"",company:""});return e.jsxs(se,{children:[e.jsxs(ae,{direction:"row",alignItems:"center",justifyContent:"space-between",mb:5,children:[e.jsx(v,{variant:"h4",children:"Noise Cancellation"}),e.jsx(L,{variant:"contained",color:"inherit",startIcon:e.jsx(C,{icon:"eva:plus-fill"}),onClick:Z,children:"New Noise Cancellation"})]}),e.jsxs(ie,{children:[e.jsx(V,{numSelected:i.length,filterName:l,onFilterName:G}),e.jsx(re,{children:e.jsx(he,{sx:{overflow:"unset"},children:e.jsxs(ue,{sx:{minWidth:800},children:[e.jsx(z,{order:s,orderBy:h,rowCount:y.length,numSelected:i.length,onRequestSort:b,onSelectAllClick:T,headLabel:[{id:"company",label:"Company"},{id:"status",label:"Status"},{id:"email",label:"Email"},{id:""}]}),e.jsxs(xe,{children:[N.slice(n*p,n*p+p).map(r=>e.jsx(W,{status:r.status,email:r.email,company:r.company,selected:i.indexOf(r.name)!==-1,handleClick:o=>K(o,r.name)},r.id)),e.jsx(H,{height:77,emptyRows:je(n,p,y.length)}),J&&e.jsx(q,{query:l})]})]})})}),e.jsx(pe,{page:n,component:"div",count:y.length,rowsPerPage:p,onPageChange:Q,rowsPerPageOptions:[5,10,25],onRowsPerPageChange:Y})]}),e.jsx(le,{open:X,onClose:I,sx:{width:"100vw"},children:e.jsxs(k,{width:"30vw",p:2,display:"flex",flexDirection:"column",gap:2,children:[e.jsxs(k,{display:"flex",alignItems:"center",justifyContent:"space-between",children:[e.jsx(v,{variant:"h5",children:"Add New Noise Cancellation"}),e.jsx(me,{sx:{cursor:"pointer"},onClick:()=>{I()}})]}),e.jsx(U,{label:"Email",variant:"outlined",placeholder:"Please Enter Your Email",onChange:r=>{A(o=>({...o,email:r.target.value}))},value:R.email,height:"20px",width:"90%"}),e.jsx(U,{label:"Company Name",placeholder:"Please Enter Company Name",variant:"outlined",onChange:r=>{A(o=>({...o,company:r.target.value}))},value:R.company,width:"90%",height:"20px"}),e.jsx(L,{width:"90%",variant:"contained",color:"primary",children:"Add"})]})})]})}function Se(){return e.jsxs(e.Fragment,{children:[e.jsx(oe,{children:e.jsx("title",{children:" Email "})}),e.jsx(ye,{})]})}export{Se as default};