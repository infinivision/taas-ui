(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-0dd3"],{VGKh:function(t,e,a){"use strict";var s={name:"GlobalStatus",props:["item"]},n=a("KHd+"),r=Object(n.a)(s,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.item.statusDangerous?[a("el-tag",{attrs:{type:"danger"}},[t._v(t._s(t._f("globalStatus")(t.item.status)))])]:t.item.statusWarning?[a("el-tag",{attrs:{type:"warning"}},[t._v(t._s(t._f("globalStatus")(t.item.status)))])]:t.item.statusSuccess?[a("el-tag",{attrs:{type:"success"}},[t._v(t._s(t._f("globalStatus")(t.item.status)))])]:[a("el-tag",{attrs:{type:"info"}},[t._v(t._s(t._f("globalStatus")(t.item.status)))])]],2)},[],!1,null,"06ccc42c",null);e.a=r.exports},"gH+a":function(t,e,a){"use strict";var s={name:"BranchStatus",props:["item"]},n=a("KHd+"),r=Object(n.a)(s,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.item.statusDangerous||t.item.statusWarning?[a("el-tag",{staticStyle:{color:"white"},attrs:{type:"info"}},[t._v(t._s(t._f("branchStatus")(t.item.status)))])]:[a("el-tag",{attrs:{type:"info"}},[t._v(t._s(t._f("branchStatus")(t.item.status)))])]],2)},[],!1,null,"2f01256c",null);e.a=r.exports},j6lA:function(t,e,a){"use strict";a.d(e,"a",function(){return n}),a.d(e,"b",function(){return r});var s=a("JDVc");function n(t){var e={id:t.id,name:t.n,timeout:t.t,creator:t.c,startAt:t.s,status:t.st,proxy:t.p,action:t.a,branchList:function(t){var e=[];return(t=t||[]).forEach(function(t){var a={id:t.id,gid:t.g,rmsId:t.r,resource:t.rs,lockKeyList:t.l,startAt:t.s,status:t.st},n=[s.e.Unknown,s.e.PhaseOneFailed,s.e.PhaseOneTimeout,s.e.PhaseTwoCommitFailedUnretriable,s.e.PhaseTwoRollbackFailedUnretriable],r=[s.e.PhaseTwoCommitFailedRetriable,s.e.PhaseTwoRollbackFailedRetriable];n.includes(a.status)?a.statusDangerous=!0:r.includes(a.status)&&(a.statusWarning=!0),[s.e.PhaseTwoCommitted].includes(a.status)&&(a.statusSuccess=!0),e.push(a)}),e}(t.bs),branchOpen:!1,branchRegistered:0,branchPhaseOne:0,branchPhaseTwo:0},a=0,n=0,r=0,i=0;e.branchList.forEach(function(t){var e=function(t){var e;1===t?e=s.c.Registered:t>1&&t<5?e=s.c.PhaseOne:t>4&&(e=s.c.PhaseTwo);return e}(t.status);e===s.c.Registered?a+=1:e===s.c.PhaseTwo?r+=1:e===s.c.PhaseOne&&(n+=1),t.statusSuccess&&(i+=1)});var o=[s.h.Committed,s.h.CommitFailed,s.h.Rollbacked,s.h.RollbackFailed,s.h.RollbackedSinceTimeout,s.h.RollbackFailedSinceTimeout,s.h.Finished],l=[s.h.RetryCommitting,s.h.CommitFailed,s.h.RollbackFailed],c=[s.h.RollbackingSinceTimeout,s.h.RetryRollbackingSinceTimeout,s.h.RollbackedSinceTimeout,s.h.RollbackFailedSinceTimeout],u=[s.h.Committed];return o.includes(e.status)&&(e.statusFinal=!0),l.includes(e.status)?e.statusDangerous=!0:c.includes(e.status)?e.statusWarning=!0:u.includes(e.status)&&(e.statusSuccess=!0),e.branchRegistered=a,e.branchPhaseOne=n,e.branchPhaseTwo=r,e.isAllBranchSuccess=i===e.branchList.length,e}function r(t){var e=[];return(t=t||[]).forEach(function(t){var a=n(t);e.push(a)}),e}},pr5Q:function(t,e,a){"use strict";a.d(e,"c",function(){return o}),a.d(e,"b",function(){return l}),a.d(e,"d",function(){return c}),a.d(e,"a",function(){return u});var s=a("t3Un"),n=a("7Qib"),r="/fragments/",i="/transactions";function o(t){var e={limit:t.size||10};return t.id&&(e.after=t.id),t.name&&(e.name=t.name),!Object(n.b)(t.name)&&t.name&&(e.name=t.name),Object(n.b)(t.status)||(e.status=t.status),Object(n.b)(t.action)||(e.action=t.action),Object(s.a)({url:r+t.fid+i,method:"GET",params:e})}function l(t,e){return!(!e||!t)&&Object(s.a)({url:r+t+i+"/"+e,method:"GET"})}function c(t,e){return!(!e||!t)&&Object(s.a)({url:r+t+i+"/"+e+"/rollback",method:"PUT"})}function u(t,e){return!(!e||!t)&&Object(s.a)({url:r+t+i+"/"+e+"/commit",method:"PUT"})}},r3U1:function(t,e,a){"use strict";a.r(e);var s=a("pr5Q"),n=a("j6lA"),r=a("VGKh"),i=a("gH+a"),o={name:"show",data:function(){return{tempItem:{},loading:!0,fid:void 0}},components:{GlobalStatus:r.a,BranchStatus:i.a},created:function(){this.init()},watch:{$route:function(t,e){"activeShow"!=t.name&&this.$destroy()}},methods:{init:function(){var t=this.$route.query.id;if(this.fid=this.$route.query.fid,!t||!this.fid)return!1;this.loading=!0;var e=this;s.b(this.fid,t).then(function(t){e.loading=!1,e.tempItem=Object(n.a)(t)}).catch(function(){e.loading=!1})},tableDangerousClassName:function(t){var e=t.row;return e.statusDangerous?"danger-row":e.statusWarning?"warning-row":""},goList:function(){this.$router.replace("/active?fid="+this.fid)},handleRollback:function(){var t=this,e=this.tempItem.id;this.$confirm("是否回滚该事务？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t._doRollbackItem(e)}).catch(function(){})},_doRollbackItem:function(t){var e=this;t&&this.fid&&s.d(this.fid,t).then(function(){e.$message({type:"success",message:"回滚成功!"}),setTimeout(function(){e.goList()},2e3)})},handleSubmit:function(){var t=this,e=this.tempItem.id;this.$confirm("是否提交事务？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t._doSubmitItem(e)}).catch(function(){})},_doSubmitItem:function(t){var e=this;t&&this.fid&&s.a(this.fid,t).then(function(){e.$message({type:"success",message:"提交成功!"}),setTimeout(function(){e.goList()},2e3)})}}},l=a("KHd+"),c=Object(l.a)(o,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("el-form",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{"label-width":"180px"}},[a("el-form-item",{attrs:{label:"事务ID"}},[a("span",[t._v(t._s(t.tempItem.id))])]),t._v(" "),a("el-form-item",{attrs:{label:"事务名称"}},[a("span",[t._v(t._s(t.tempItem.name))])]),t._v(" "),a("el-form-item",{attrs:{label:"超时时间(毫秒)"}},[a("span",[t._v(t._s(t._f("toMsByNsFilter")(t.tempItem.timeout)))])]),t._v(" "),a("el-form-item",{attrs:{label:"状态"}},[a("global-status",{attrs:{item:t.tempItem}})],1),t._v(" "),a("el-form-item",{attrs:{label:"创建者"}},[a("span",[t._v(t._s(t.tempItem.creator))])]),t._v(" "),a("el-form-item",{attrs:{label:"代理"}},[t._v("\n            "+t._s(t.tempItem.proxy)+"\n        ")]),t._v(" "),a("el-form-item",{attrs:{label:"行动"}},[a("el-tag",{attrs:{type:"info"}},[t._v(t._s(t._f("action")(t.tempItem.action)))])],1),t._v(" "),a("el-form-item",{attrs:{label:"开始时间"}},[a("span",[t._v(t._s(t._f("parseTime")(t.tempItem.startAt)))])]),t._v(" "),a("el-form-item",{attrs:{label:"分支统计"}},[a("el-table",{staticStyle:{width:"500px"},attrs:{border:"",fit:"",data:[{phaseOne:t.tempItem.branchPhaseOne,phaseTwo:t.tempItem.branchPhaseTwo}]}},[a("el-table-column",{attrs:{prop:"phaseOne",label:"phaseOne阶段个数"}}),t._v(" "),a("el-table-column",{attrs:{prop:"phaseTwo",label:"PhaseTwo阶段个数"}})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"分支详情"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tempItem.branchList,"row-class-name":t.tableDangerousClassName,border:"",fit:""}},[a("el-table-column",{attrs:{label:"ID",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.id))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"开始时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("parseTime")(e.row.startAt)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"状态"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("branch-status",{attrs:{item:t.row}})]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"资源地址"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.resource))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"资源会话ID"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.rmsId))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"lockKey"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.row.lockKeyList,border:"",fit:""}},[a("el-table-column",{attrs:{prop:"namespace",label:"数据库表"}}),t._v(" "),a("el-table-column",{attrs:{prop:"key",label:"关键词"}})],1)]}}])})],1)],1),t._v(" "),a("div",{staticStyle:{"margin-left":"70px"}},[a("el-button",{on:{click:t.goList}},[t._v("返回")]),t._v(" "),t.tempItem.statusFinal?t._e():[a("el-button",{attrs:{type:"danger"},on:{click:t.handleRollback}},[t._v("回滚")]),t._v(" "),t.tempItem.isAllBranchSuccess?[a("el-button",{attrs:{type:"success"},on:{click:t.handleSubmit}},[t._v("提交")])]:t._e()]],2)],1)],1)},[],!1,null,"83241440",null);e.default=c.exports},t3Un:function(t,e,a){"use strict";var s=a("4d7F"),n=a.n(s),r=a("vDqi"),i=a.n(r),o=a("XJYT"),l=i.a.create({baseURL:"/v1",timeout:6e4});l.interceptors.request.use(function(t){return t},function(t){console.error(t),n.a.reject(t)}),l.interceptors.response.use(function(t){var e=t.data||{};t.headers;return 0===e.code?e.value:(Object(o.Message)({message:e.message,type:"error",duration:5e3}),n.a.reject("error"))},function(t){return Object(o.Message)({message:t.data||"网络异常",type:"error",duration:5e3}),n.a.reject(t)}),e.a=l}}]);