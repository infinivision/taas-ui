<template>
    <div class="app-container">
        <el-form label-width="180px" v-loading="loading">
            <el-form-item label="事务ID">
                <span>{{tempItem.id}}</span>
            </el-form-item>
            <el-form-item label="事务名称">
                <span>{{tempItem.name}}</span>
            </el-form-item>
            <el-form-item label="超时时间(毫秒)">
                <span>{{tempItem.timeout | toMsByNsFilter}}</span>
            </el-form-item>
            <el-form-item label="状态">
                <global-status :item="tempItem"></global-status>
            </el-form-item>
            <el-form-item label="创建者">
                <span>{{tempItem.creator}}</span>
            </el-form-item>
            <el-form-item label="代理">
                {{tempItem.proxy}}
            </el-form-item>
            <el-form-item label="行动">
                <el-tag type="info">{{tempItem.action | action}}</el-tag>
            </el-form-item>
            <el-form-item label="开始时间">
                <span>{{tempItem.startAt | parseTime}}</span>
            </el-form-item>

            <el-form-item label="分支统计">
                <el-table style="width: 500px" border fit
                          :data="[{phaseOne:tempItem.branchPhaseOne,phaseTwo:tempItem.branchPhaseTwo}]">
                    <!--<el-table-column-->
                    <!--prop="registered"-->
                    <!--label="Registered个数">-->
                    <!--</el-table-column>-->
                    <el-table-column
                            prop="phaseOne"
                            label="phaseOne阶段个数">
                    </el-table-column>
                    <el-table-column
                            prop="phaseTwo"
                            label="PhaseTwo阶段个数">
                    </el-table-column>
                </el-table>
            </el-form-item>

            <el-form-item label="分支详情">
                <el-table :data="tempItem.branchList" :row-class-name=tableDangerousClassName border fit
                          style="width: 100%">
                    <el-table-column label="ID" width="180">
                        <template slot-scope="scope">
                            <span>{{scope.row.id}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="开始时间">
                        <template slot-scope="scope">
                            <span>{{scope.row.startAt | parseTime}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态">
                        <template slot-scope="scope">
                            <branch-status :item="scope.row"></branch-status>
                        </template>
                    </el-table-column>
                    <el-table-column label="资源地址">
                        <template slot-scope="scope">
                            <span>{{scope.row.resource}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="资源会话ID">
                        <template slot-scope="scope">
                            <span>{{scope.row.rmsId}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="lockKey">
                        <template slot-scope="scope">
                            <el-table :data="scope.row.lockKeyList" border fit
                                      style="width: 100%">
                                <el-table-column
                                        prop="namespace"
                                        label="数据库表">
                                </el-table-column>
                                <el-table-column
                                        prop="key"
                                        label="关键词">
                                </el-table-column>
                            </el-table>

                        </template>
                    </el-table-column>

                </el-table>
            </el-form-item>

            <div style="margin-left: 70px">
                <el-button @click="goList">返回</el-button>

                <template v-if="!tempItem.statusFinal">
                    <el-button type="danger" @click="handleRollback">回滚</el-button>

                    <template v-if="tempItem.isAllBranchSuccess">
                        <el-button type="success" @click="handleSubmit">提交</el-button>
                    </template>
                </template>


            </div>

        </el-form>
    </div>
</template>

<script>
    import * as listApi from '~/api/transaction';
    import {formatServerItem} from './util';
    import GlobalStatus from './components/GlobalStatus';
    import BranchStatus from './components/BranchStatus';

    const _name = 'activeShow';

    export default {
        name: "show",
        data() {
            return {
                tempItem: {},
                loading: true,
                fid: undefined
            }
        },
        components: {GlobalStatus, BranchStatus},
        created() {
            this.init();
        },
        watch: {
            '$route': function (to, from) {
                if (to.name != _name) {
                    this.$destroy();
                }
            }
        },

        methods: {
            init() {
                var id = this.$route.query.id;
                this.fid = this.$route.query.fid;
                if (!id || !this.fid) {
                    return false;
                }
                this.loading = true;
                var that = this;
                listApi.getItem(this.fid, id).then(function (data) {
                    that.loading = false;
                    that.tempItem = formatServerItem(data);
                }).catch(function () {
                    that.loading = false;
                })
            },

            tableDangerousClassName({row}) {
                if (row.statusDangerous) {
                    return 'danger-row'
                } else if (row.statusWarning) {
                    return 'warning-row'
                }
                return '';
            },

            goList() {
                this.$router.replace('/active?fid=' + this.fid);
            },

            handleRollback() {
                let id = this.tempItem.id;
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

                if (id && this.fid) {
                    listApi.rollback(this.fid, id).then(function () {
                        that.$message({
                            type: 'success',
                            message: '回滚成功!'
                        });
                        setTimeout(function () {
                            that.goList();
                        }, 2000);
                    })
                }
            },


            handleSubmit() {
                let id = this.tempItem.id;
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

                if (id && this.fid) {
                    listApi.commit(this.fid, id).then(function () {
                        that.$message({
                            type: 'success',
                            message: '提交成功!'
                        });
                        setTimeout(function () {
                            that.goList();
                        }, 2000);
                    })
                }
            },
        }

    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
