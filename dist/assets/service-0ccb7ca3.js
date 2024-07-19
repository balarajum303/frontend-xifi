import{j as e,w as ie,T as w,K as c,r as g,I as R,C as T,a3 as le,N as L,a1 as E,a2 as P,F as I,a4 as de,a5 as ue,O as ge,a6 as M,a7 as he,Q as pe,S as xe,R as H,E as ye,a8 as me,a9 as fe,M as O,W as je}from"./index-0fca6773.js";import{T as D,a as m,b as Ce,c as be,d as ve,e as Se,u as N,f as Te,g as we,C as Ne}from"./user-bcbc9869.js";import{L as _}from"./label-6990dc07.js";import{e as Ee}from"./edit_icon-feef8411.js";const Pe={border:0,margin:-1,padding:0,width:"1px",height:"1px",overflow:"hidden",position:"absolute",whiteSpace:"nowrap",clip:"rect(0 0 0 0)"};function De(o,i,h){return o?Math.max(0,(1+o)*i-h):0}function $({query:o}){return e.jsx(D,{children:e.jsx(m,{align:"center",colSpan:6,sx:{py:3},children:e.jsxs(ie,{sx:{textAlign:"center"},children:[e.jsx(w,{variant:"h6",paragraph:!0,children:"Not found"}),e.jsxs(w,{variant:"body2",children:["No results found for  ",e.jsxs("strong",{children:['"',o,'"']}),".",e.jsx("br",{})," Try checking for typos or using complete words."]})]})})})}$.propTypes={query:c.string};function z({selected:o,domain:i,status:h,email:x,publicId:l,concurrencyStamp:p}){const[f,j]=g.useState(null),n=v=>{j(v.currentTarget)},C=()=>{j(null)},b=v=>{console.log("check-ststua ",l,p);const y={status:v};console.log(y,"statusUpdateBody");const A=`${P.STATUS_UPDATE_CATEGORY}/${l}`;E.patch(A,y,{headers:{"x-coreplatform-concurrencyStamp":p}}).then(d=>{d.status===204?window.location.reload():console.error("Unexpected response:",d)}).catch(d=>{d.response&&(d.response.status===417?console.error("Error 417:",d):d.response.status===500&&console.error("Error 500:",d))})};return e.jsxs(e.Fragment,{children:[e.jsxs(D,{hover:!0,tabIndex:-1,role:"checkbox",selected:o,children:[e.jsx(m,{children:i}),e.jsx(m,{children:e.jsx(_,{color:h==="banned"&&"error"||"success",children:h})}),e.jsx(m,{children:e.jsx(_,{children:x})}),e.jsx(m,{align:"right",children:e.jsx(R,{onClick:n,children:e.jsx(T,{icon:"eva:more-vertical-fill"})})})]}),e.jsxs(le,{open:!!f,anchorEl:f,onClose:C,anchorOrigin:{vertical:"top",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"right"},PaperProps:{sx:{width:140}},children:[e.jsx(L,{onClick:()=>b("active"),children:"Active"}),e.jsx(L,{onClick:()=>b("inactive"),sx:{color:"error.main"},children:"Inactive"})]})]})}z.propTypes={selected:c.any,domain:c.string,status:c.string,email:c.any,publicId:c.any,concurrencyStamp:c.any};function K({order:o,orderBy:i,rowCount:h,headLabel:x,numSelected:l,onRequestSort:p,onSelectAllClick:f}){const j=n=>C=>{p(C,n)};return e.jsx(Ce,{children:e.jsx(D,{children:x.map(n=>e.jsx(m,{align:n.align||"left",sortDirection:i===n.id?o:!1,sx:{width:n.width,minWidth:n.minWidth},children:e.jsxs(be,{hideSortIcon:!0,active:i===n.id,direction:i===n.id?o:"asc",onClick:j(n.id),children:[n.label,i===n.id?e.jsx(I,{sx:{...Pe},children:o==="desc"?"sorted descending":"sorted ascending"}):null]})},n.id))})})}K.propTypes={order:c.oneOf(["asc","desc"]),orderBy:c.string,rowCount:c.number,headLabel:c.array,numSelected:c.number,onRequestSort:c.func,onSelectAllClick:c.func};function Q({emptyRows:o,height:i}){return o?e.jsx(D,{sx:{...i&&{height:i*o}},children:e.jsx(m,{colSpan:9})}):null}Q.propTypes={emptyRows:c.number,height:c.number};function V({numSelected:o,filterName:i,onFilterName:h}){return e.jsxs(de,{sx:{height:96,display:"flex",justifyContent:"space-between",p:x=>x.spacing(0,1,0,3),...o>0&&{color:"primary.main",bgcolor:"primary.lighter"}},children:[o>0?e.jsxs(w,{component:"div",variant:"subtitle1",children:[o," selected"]}):e.jsx(ue,{value:i,onChange:h,placeholder:"Search user...",startAdornment:e.jsx(ge,{position:"start",children:e.jsx(T,{icon:"eva:search-fill",sx:{color:"text.disabled",width:20,height:20}})})}),o>0?e.jsx(M,{title:"Delete",children:e.jsx(R,{children:e.jsx(T,{icon:"eva:trash-2-fill"})})}):e.jsx(M,{title:"Filter list",children:e.jsx(R,{children:e.jsx(T,{icon:"ic:round-filter-list"})})})]})}V.propTypes={numSelected:c.number,filterName:c.string,onFilterName:c.func};function Ae(){const[o,i]=g.useState(0),[h,x]=g.useState("asc"),[l,p]=g.useState([]),[f,j]=g.useState([]),[n,C]=g.useState(!1),[b,v]=g.useState("name"),[y,A]=g.useState(""),[d,J]=g.useState(5),[a,S]=g.useState({categoryName:"",categoryDescription:"",categoryCode:""}),[k,U]=g.useState({categoryName:"",categoryDescription:"",categoryCode:""}),[F,B]=g.useState("");g.useEffect(()=>{(()=>{const r=`${P.GET_CATEGORY}`;E.get(r).then(s=>{console.log("get-all category",s),j(s.data)}).catch(s=>{console.error(s)})})()},[]),console.log(f,"get Data");const X=()=>{const t={};if(a.categoryName||(t.categoryName="categoryName is required."),a.categoryDescription||(t.categoryDescription="categoryDescription is required."),a.categoryCode||(t.categoryCode="categoryCode is required."),Object.keys(t).length>0){U(t),B("");return}U({categoryName:"",categoryDescription:"",categoryCode:""});const r=P.POST_CATEGORY,s={categoryName:a.categoryName,categoryDescription:a.categoryName,categoryCode:a.categoryCode,status:"active"};E.post(r,s).then(u=>{u.status===201?(B("service added successfully"),window.location.reload()):console.error("Unexpected response:",u)}).catch(u=>{console.log("err",u)})},Z=(t,r)=>{r!==""&&(x(b===r&&h==="asc"?"desc":"asc"),v(r))},ee=t=>{if(t.target.checked){const r=N.map(s=>s.name);p(r);return}p([])},te=(t,r)=>{const s=l.indexOf(r);let u=[];s===-1?u=u.concat(l,r):s===0?u=u.concat(l.slice(1)):s===l.length-1?u=u.concat(l.slice(0,-1)):s>0&&(u=u.concat(l.slice(0,s),l.slice(s+1))),p(u)},se=(t,r)=>{i(r)};console.log(o,"page");const oe=t=>{i(0),J(parseInt(t.target.value,10))},re=t=>{i(0),A(t.target.value)},q=f.filter(t=>t.categoryName.toLowerCase().includes(y.toLowerCase())),ae=!q.length&&!!y,[ne,W]=he.useState(!1),Y=t=>{console.log("row",t),t.categoryCode?(C(!0),S({...t,categoryName:t.categoryName})):(C(!1),S({categoryName:""})),console.log("isEdit:",n),W(!0)},ce=()=>{console.log("formdetails in update",a);const t={categoryName:a==null?void 0:a.categoryName,categoryDescription:a.categoryDescription,categoryCode:a.categoryCode};console.log(t,"updateCategoryBody");const r=`${P.UPDATE_CATEGORY}/${a.publicId}`;E.patch(r,t,{headers:{"x-coreplatform-concurrencystamp":a.concurrencyStamp}}).then(s=>{s.status===204?window.location.reload():console.error("Unexpected response:",s)}).catch(s=>{s.response&&(s.response.status===417?console.error("Error 417:",s):s.response.status===500&&console.error("Error 500:",s))})},G=()=>{W(!1)};return e.jsxs(pe,{children:[e.jsxs(xe,{direction:"row",alignItems:"center",justifyContent:"space-between",mb:5,children:[e.jsx(w,{variant:"h4",children:"Services"}),e.jsx("h6",{children:F&&e.jsx("div",{className:"success-message",children:F})}),e.jsx(H,{variant:"contained",color:"inherit",startIcon:e.jsx(T,{icon:"eva:plus-fill"}),onClick:Y,children:"New Service"})]}),e.jsxs(ye,{children:[e.jsx(V,{numSelected:l.length,filterName:y,onFilterName:re}),e.jsx(me,{children:e.jsx(ve,{sx:{overflow:"unset"},children:e.jsxs(Se,{sx:{minWidth:800},children:[e.jsx(K,{order:h,orderBy:b,rowCount:N.length,numSelected:l.length,onRequestSort:Z,onSelectAllClick:ee,headLabel:[{id:"Category Name",label:"Category Name"},{id:"status",label:"Status"},{id:"Edit",label:"Edit"},{id:""}]}),e.jsxs(Te,{children:[q.slice(o*d,o*d+d).map(t=>e.jsx(z,{domain:t.categoryName,status:t.status,email:e.jsx("img",{src:Ee,alt:"Edit",style:{cursor:"pointer"},onClick:()=>Y(t)}),publicId:t.publicId,concurrencyStamp:t.concurrencyStamp,selected:l.indexOf(t.name)!==-1,handleClick:r=>te(r,t.name)},t.id)),e.jsx(Q,{height:77,emptyRows:De(o,d,N.length)}),ae&&e.jsx($,{query:y})]})]})})}),e.jsx(we,{page:o,component:"div",count:N.length,rowsPerPage:d,onPageChange:se,rowsPerPageOptions:[5,10,20,50,100],onRowsPerPageChange:oe})]}),e.jsx(fe,{open:ne,onClose:G,sx:{width:"100vw"},children:e.jsxs(I,{width:"30vw",p:2,display:"flex",flexDirection:"column",gap:2,children:[e.jsxs(I,{display:"flex",alignItems:"center",justifyContent:"space-between",children:[e.jsx(w,{variant:"h5",children:n?"Update Service":"Add New Service"}),e.jsx(Ne,{sx:{cursor:"pointer"},onClick:()=>{G()}})]}),e.jsx(O,{variant:"outlined",placeholder:"Please Enter Your categoryName",onChange:t=>{S(r=>({...r,categoryName:t.target.value}))},value:a.categoryName,fullWidth:!0,height:"20px",style:{border:k.categoryName&&!a.categoryName?"1px solid red":"none",borderRadius:"8px"}}),e.jsx(O,{variant:"outlined",placeholder:"Please Enter Your categoryDescription",onChange:t=>{S(r=>({...r,categoryDescription:t.target.value}))},value:a.categoryDescription,fullWidth:!0,height:"20px",style:{border:k.categoryDescription&&!a.categoryDescription?"1px solid red":"none",borderRadius:"8px"}}),e.jsx(O,{variant:"outlined",placeholder:"Please Enter Your categoryCode",onChange:t=>{S(r=>({...r,categoryCode:t.target.value}))},value:a.categoryCode,fullWidth:!0,height:"20px",style:{border:k.categoryCode&&!a.categoryCode?"1px solid red":"none",borderRadius:"8px"}}),e.jsx(H,{fullWidth:!0,variant:"contained",color:"primary",onClick:n?ce:X,children:n?"Update":"Add"})]})})]})}function Ue(){return e.jsxs(e.Fragment,{children:[e.jsx(je,{children:e.jsx("title",{children:" Services "})}),e.jsx(Ae,{})]})}export{Ue as default};
