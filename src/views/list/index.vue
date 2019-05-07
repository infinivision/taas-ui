<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input prefix-icon="el-icon-search" class="filter-item" style="width: 200px" clearable
                      placeholder="请输入名称"></el-input>
            <el-button type="primary" class="filter-item" style="margin-left: 20px;">搜索</el-button>
        </div>
        <div>
            <el-table :data="dataList" v-loading="listLoading" element-loading-text="加载中..." border fit
                      highlight-current-row
                      style="width: 100%">
                <el-table-column align="center" label="序号" width="65">
                    <template slot-scope="scope">
                        <span>{{scope.$index+1}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="事务实例ID">
                    <template slot-scope="scope">
                        <span>{{scope.row.id}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="事务实例名">
                    <template slot-scope="scope">
                        <span>{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="状态">
                    <template slot-scope="scope">
                        <span>{{scope.row.status}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="超时时间（毫秒）">
                    <template slot-scope="scope">
                        <span>{{scope.row.timeout }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="首次运行时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.startAt | parseTime}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="创建者">
                    <template slot-scope="scope">
                        <span>{{scope.row.creator}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="行动">
                    <template slot-scope="scope">
                        <span>{{scope.row.action}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleTerminal(scope.row)">监控</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--page footer-->
        <div class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="listQuery.page" :page-sizes="[10, 20, 30, 50]"
                           :page-size="listQuery.size"
                           layout="total, sizes, prev, pager, next" :total="pageInfo.totalSize">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import * as listApi from '~/api/transaction';
    import waves from '~/directive/waves'; // 水波纹指令
    const _name = 'listIndex';

    export default {
        name: _name,
        directives: {
            waves
        },
        data() {
            return {
                listQuery: {
                    size: 10,// 默认值 10 个一页
                },

                dataList: [],
                listLoading: true,
                // 页面信息
                pageInfo: {
                    totalSize: undefined, // 所有个数
                    lastId: undefined //
                },
            }
        },
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
                this.updatePageInfo();
                this.getList();
            },

            //
            updatePageInfo(options) {
                options = options || {};
            },

            getList() {
                this.listLoading = true;
                var that = this;
                var options = {
                    size: this.listQuery.size,
                    id: this.pageInfo.lastId || ''
                };
                //
                listApi.getList(options).then(function (data) {
                    that.listLoading = false;
                    that.dataList = that._formatServerData(data);
                }).catch(function () {
                    that.listLoading = false;
                });
            },

            //
            handleSizeChange() {

            },

            handleCurrentChange() {

            },

            // 监控的内容有：
            //
            handleTerminal() {

            },

            //
            _formatServerData(data) {
                data = data || [];
                var result = [];

                //
                function _formatBranchList(branchList) {
                    branchList = branchList || [];
                    var result = [];
                    branchList.forEach(function (branch) {
                        var tempItem = {
                            id: branch.id,
                            gid: branch.g,
                            //resourceManager: branch.r,
                            rmsId: branch.r,
                            resource: branch.rs,
                            lockKeys: branch.l,
                            startAt: branch.s,
                            status: branch.st
                        };
                        result.push(tempItem);
                    });

                    return result;
                }

                //
                data.forEach(function (item) {
                    var tempItem = {
                        id: item.id,
                        name: item.n,
                        timeout: item.t,
                        creator: item.c,
                        startAt: item.s,
                        status: item.st,
                        action: item.a,
                        branchList: _formatBranchList(item.bs)
                    };

                    result.push(tempItem);
                });

                return result;
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
