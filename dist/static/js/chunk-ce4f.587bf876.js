(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-ce4f"],{KDOj:function(t,e,n){},LiLr:function(t,e,n){"use strict";var r=n("KDOj");n.n(r).a},er4n:function(t,e,n){"use strict";n.r(e);var r=n("hZMg"),a={name:"homeIndex",data:function(){return{listQuery:{id:void 0,version:void 0},fragmentList:[],listLoading:!0}},created:function(){this.init()},mounted:function(){},watch:{$route:function(t,e){"homeIndex"!==t.name&&this.$destroy()}},methods:{getList:function(){var t=this;this.listLoading=!0,r.a().then(function(e){t.listLoading=!1,t.fragmentList=(e||[]).map(function(t){return t.branchOpen=!1,t})}).catch(function(){})},init:function(){this.getList()},handleToActiveList:function(t){this.$router.push({path:"/active/index",query:{fid:t}})},handleToggleBranch:function(t){var e=t.branchOpen;this.$refs.dataTable.toggleRowExpansion(t,!e),t.branchOpen=!t.branchOpen}}},i=(n("pPLE"),n("LiLr"),n("KHd+")),o=Object(i.a)(a,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"filter-container"},[n("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"20px"},attrs:{type:"primary"},on:{click:t.getList}},[t._v("刷新\n        ")])],1),t._v(" "),n("div",[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],ref:"dataTable",staticClass:"active-table",staticStyle:{width:"100%"},attrs:{data:t.fragmentList,"element-loading-text":"加载中...",border:"",fit:""}},[n("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.row.peers,border:"",fit:""}},[n("el-table-column",{attrs:{label:"ID"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.ID))])]}}],!0)}),t._v(" "),n("el-table-column",{attrs:{label:"ContainerID"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.ContainerID))])]}}],!0)})],1)]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"left",label:"分片ID"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.id))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"version"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.version))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"disableGrow"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.disableGrow?[n("el-tag",[t._v(t._s(e.row.disableGrow))])]:t._e(),t._v(" "),[n("el-tag",{attrs:{type:"danger"}},[t._v(t._s(e.row.disableGrow))])]]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"操作",width:"300px"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{size:"mini"},on:{click:function(n){return t.handleToActiveList(e.row.id)}}},[t._v("查看活动事务\n                    ")]),t._v(" "),e.row.peers.length>0?[e.row.branchOpen?[n("el-button",{attrs:{size:"mini",type:"info"},on:{click:function(n){return t.handleToggleBranch(e.row)}}},[t._v("收起peers\n                            ")])]:[n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(n){return t.handleToggleBranch(e.row)}}},[t._v("展开peers\n                            ")])]]:t._e()]}}])})],1)],1)])},[],!1,null,"d619c22e",null);e.default=o.exports},hUK8:function(t,e,n){},hZMg:function(t,e,n){"use strict";n.d(e,"a",function(){return a});var r=n("t3Un");function a(){return Object(r.a)({url:"/fragments",method:"GET"})}},pPLE:function(t,e,n){"use strict";var r=n("hUK8");n.n(r).a},t3Un:function(t,e,n){"use strict";var r=n("4d7F"),a=n.n(r),i=n("vDqi"),o=n.n(i),s=n("XJYT"),l=o.a.create({baseURL:"/v1",timeout:6e4});l.interceptors.request.use(function(t){return t},function(t){console.error(t),a.a.reject(t)}),l.interceptors.response.use(function(t){var e=t.data||{};t.headers;return 0===e.code?e.value:(Object(s.Message)({message:e.message,type:"error",duration:5e3}),a.a.reject("error"))},function(t){return Object(s.Message)({message:t.data||"网络异常",type:"error",duration:5e3}),a.a.reject(t)}),e.a=l}}]);