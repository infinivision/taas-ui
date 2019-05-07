<template>
    <div class="app-container">
        <div class="filter-container">

            <el-select class="filter-item" filterable v-model.number="listQuery.fid" @change="handleFilter"
                       placeholder="请选择分片进行查询">
                <el-option v-for="(item2,index2) in fragmentList" :label="item2.id"
                           :value="item2.id" :key="item2.id"></el-option>
            </el-select>

            <template v-if="listQuery.fid">
                <el-input prefix-icon="el-icon-search" class="filter-item" style="width: 200px" clearable
                          placeholder="请输入事务名称" v-model="listQuery.name"></el-input>

                <el-select clearable style="width: 250px" class="filter-item" v-model="listQuery.status"
                           placeholder="请选择状态">
                    <el-option v-for="item in globalStatusConstant" :key="item.value" :label="item.title"
                               :value="item.value">
                    </el-option>
                </el-select>

                <el-button type="primary" class="filter-item" style="margin-left: 20px;" @click="handleSearch">搜索
                </el-button>
            </template>

            <!--<el-select clearable class="filter-item" v-model="listQuery.action" placeholder="请选择行为">-->
            <!--<el-option v-for="item in actionConstant" :key="item.value" :label="item.title" :value="item.value">-->
            <!--</el-option>-->
            <!--</el-select>-->
        </div>
        <div v-show="listQuery.fid">
            <el-table ref="dataTable" :data="dataList" v-loading="listLoading" element-loading-text="加载中..." border fit
                      style="width: 100%" class="active-table">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-table :data="props.row.branchList" :row-class-name=tableDangerousClassName border fit
                                  style="width: 100%">
                            <el-table-column label="ID">
                                <template slot-scope="scope2">
                                    <span>{{scope2.row.id}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="开始时间">
                                <template slot-scope="scope2">
                                    <span>{{scope2.row.startAt | parseTime}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="状态">
                                <template slot-scope="scope2">
                                    <branch-status :item="scope2.row"></branch-status>
                                </template>
                            </el-table-column>
                            <!--<el-table-column label="资源地址">-->
                            <!--<template slot-scope="scope2">-->
                            <!--<span>{{scope2.row.resourceManager.r}}</span>-->
                            <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column label="资源IP">-->
                            <!--<template slot-scope="scope2">-->
                            <!--<span>{{scope2.row.resourceManager.a}}</span>-->
                            <!--</template>-->
                            <!--</el-table-column>-->
                        </el-table>
                    </template>

                </el-table-column>

                <!--<el-table-column align="center" label="序号" width="65">-->
                <!--<template slot-scope="scope">-->
                <!--<span>{{scope.$index+1}}</span>-->
                <!--</template>-->
                <!--</el-table-column>-->
                <el-table-column align="left" label="事务ID/分支条数" width="150px">
                    <template slot-scope="scope">
                        <span>{{scope.row.id}}/{{scope.row.branchList.length}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="事务名称">
                    <template slot-scope="scope">
                        <span>{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="超时时间(毫秒)" width="120px">
                    <template slot-scope="scope">
                        <span>{{scope.row.timeout | toMsByNsFilter }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="状态" width="210px">
                    <template slot-scope="scope">
                        <!--<el-tag>{{scope.row.status | globalStatus}}</el-tag>-->
                        <global-status :item="scope.row"></global-status>
                    </template>
                </el-table-column>
                <!--<el-table-column align="center" label="创建者">-->
                <!--<template slot-scope="scope">-->
                <!--<span>{{scope.row.creator}}</span>-->
                <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column align="center" label="行动" width="100px">-->
                <!--<template slot-scope="scope">-->

                <!--<el-tag type="info">{{scope.row.action | action}}</el-tag>-->
                <!--</template>-->
                <!--</el-table-column>-->
                <el-table-column align="center" label="开始时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.startAt | parseTime}}</span>
                    </template>
                </el-table-column>
                <!--<el-table-column align="center" label="分支条数" width="100px">-->
                <!--<template slot-scope="scope">-->
                <!--<span>{{scope.row.branchList.length}}</span>-->
                <!--</template>-->
                <!--</el-table-column>-->
                <el-table-column align="center" label="分支(phaseOne/PhaseTwo)">
                    <template slot-scope="scope">
                        <span>{{scope.row.branchPhaseOne}}/{{scope.row.branchPhaseTwo}}</span>
                    </template>
                </el-table-column>
                <!-- 展开分支，收起分支 -->
                <el-table-column align="left" label="操作" width="320px">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleShow(scope.row)">查看</el-button>
                        <template v-if="scope.row.branchList.length > 0">
                            <template v-if="scope.row.branchOpen">
                                <el-button size="mini" type="info" @click="handleToggleBranch(scope.row)">收起分支
                                </el-button>
                            </template>
                            <template v-else>
                                <el-button size="mini" type="primary" @click="handleToggleBranch(scope.row)">展开分支
                                </el-button>
                            </template>
                        </template>
                        <template v-if="!scope.row.statusFinal">
                            <el-button type="danger" size="mini" @click="handleRollback(scope.row)">回滚</el-button>
                            <template v-if="scope.row.isAllBranchSuccess">
                                <el-button type="success" size="mini" @click="handleSubmit(scope.row)">提交</el-button>
                            </template>
                        </template>

                    </template>
                </el-table-column>
            </el-table>
            <!--page footer-->
            <div class="pagination-container">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page.sync="listQuery.page" :page-sizes="[1,10, 20, 30, 50]"
                               :page-size="listQuery.size"
                               layout="sizes, prev, pager, next, jumper">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import * as listApi from '~/api/transaction';
    import * as sysApi from '~/api/system';
    import {clone, extend} from "~/utils/index";
    import {GLOBAL_STATUS_ARRAY2, ACTION_ARRAY2, BRANCH_STATUS} from '~/constant/constant';
    import waves from '~/directive/waves'; // 水波纹指令
    const _name = 'activeIndex';
    import {formatServerList, getBranchStatus} from './util';
    import GlobalStatus from './components/GlobalStatus';
    import BranchStatus from './components/BranchStatus';


    export default {
        name: _name,
        directives: {
            waves
        },
        data() {
            return {
                listQuery: {
                    page: 1,
                    size: 10,// 默认值 10 个一页
                    // 搜索的东西
                    name: undefined,
                    status: undefined,
                    fid: undefined
                    // action: undefined,
                },
                dataList: [],
                fragmentList: [],
                listLoading: true,
                // 页面信息
                pageInfo: {
                    totalSize: undefined, // 所有个数
                    lastId: undefined, //
                    lastIdList: [
                        {page: 1, lastId: null}
                    ]
                },
                globalStatusConstant: GLOBAL_STATUS_ARRAY2,
                actionConstant: ACTION_ARRAY2
            }
        },
        components: {GlobalStatus, BranchStatus},
        created() {
            this.init();
        },
        watch: {
            '$route': function (to, from) {
                if (to.name !== _name) {
                    this.$destroy();
                }
            },
        },
        methods: {
            init() {
                this.listQuery.fid = this.$route.query.fid;

                sysApi.getFragments().then((data) => {
                    this.fragmentList = data || [];
                    this.listLoading = false;
                }).catch(() => {
                    this.listLoading = false;
                });

                //
                if (this.listQuery.fid) {
                    this.handleFilter();
                }
            },

            //
            handleFilter() {
                // init list query
                this.listLoading = true;
                this.listQuery.name = undefined;
                this.listQuery.status = undefined;
                this.getList();
            },

            getList(lastId) {
                this.listLoading = true;
                var that = this;

                var options = clone(this.listQuery);
                options.id = lastId || '';

                //
                listApi.getList(options).then(function (data) {
                    that.listLoading = false;
                    that.dataList = formatServerList(data);
                    var lastId = that._getLastId();
                    if (lastId) {
                        var page = that.listQuery.page + 1;

                        var tempLastId = that._getLastIdByPage(page);

                        if (!tempLastId) {
                            var tempInfo = {page: page, lastId: lastId};
                            that.pageInfo.lastIdList.push(tempInfo);
                        }
                    }

                }).catch(function () {
                    that.listLoading = false;
                });
            },

            handleSearch() {
                this.getList();
            },

            //
            handleSizeChange(size) {
                this.listQuery.size = size;
                this.pageInfo.lastIdList = [{page: 1, lastId: null}];
                this.getList();
            },

            //
            handleCurrentChange(page) {
                // 检查下 page 是否合法，如果超过了当前最大页面，则不变化
                if (page > this.pageInfo.lastIdList.length) {
                    this.$nextTick(() => {
                        this.listQuery.page = this.pageInfo.lastIdList.length
                    });

                    return;
                }

                var lastId = this._getLastIdByPage(page);
                this.getList(lastId);
            },

            //
            handleToggleBranch(item) {
                var branchOpen = item.branchOpen;

                this.$refs.dataTable.toggleRowExpansion(item, !branchOpen);

                item.branchOpen = !item.branchOpen;
            },

            //
            handleShow(item) {
                this.$router.push({path: '/active/show', query: {id: item.id, fid: this.listQuery.fid}});
            },

            //
            handleRollback(item) {
                let id = item.id;
                this.$confirm('是否回滚该事务？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this._doRollbackItem(id);
                }).catch(() => {

                });
            },
            _doRollbackItem(id) {
                var that = this;

                if (id && this.listQuery.fid) {
                    listApi.rollback(this.listQuery.fid, id).then(function () {
                        that.$message({
                            type: 'success',
                            message: '回滚成功!'
                        });
                        setTimeout(function () {
                            that.getList();
                        }, 2000);
                    })
                }
            },


            handleSubmit(item) {
                let id = item.id;
                this.$confirm('是否提交事务？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this._doSubmitItem(id);
                }).catch(() => {

                });
            },

            _doSubmitItem(id) {
                var that = this;

                if (id && this.listQuery.fid) {
                    listApi.commit(this.listQuery.fid, id).then(function () {
                        that.$message({
                            type: 'success',
                            message: '提交成功!'
                        });

                        setTimeout(function () {
                            that.getList();
                        }, 2000);
                    })
                }
            },

            //
            tableDangerousClassName({row, rowIndex}) {
                if (row.statusDangerous) {
                    return 'danger-row'
                } else if (row.statusWarning) {
                    return 'warning-row'
                }
                return '';
            },


            _getLastId() {
                var result = null;
                var listLength = this.dataList.length;

                // 说明还存在下一页。
                if (listLength === this.listQuery.size) {
                    var lastItem = this.dataList[listLength - 1];
                    result = lastItem.id;
                }
                return result;
            },

            _getLastIdByPage(page) {
                var result = null;

                //
                for (var i = 0, len = this.pageInfo.lastIdList.length; i < len; i++) {
                    var tempItem = this.pageInfo.lastIdList[i];
                    if (tempItem.page === page) {
                        result = tempItem.lastId;
                        break;
                    }
                }
                return result;
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>


