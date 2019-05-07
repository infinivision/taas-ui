<template>
    <div class="app-container">
        <div class="filter-container">
            <el-button type="primary" class="filter-item" style="margin-left: 20px;" @click="getList">刷新
            </el-button>
        </div>
        <div>
            <el-table ref="dataTable" :data="fragmentList" v-loading="listLoading" element-loading-text="加载中..." border
                      fit
                      style="width: 100%" class="active-table">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-table :data="props.row.peers" border fit
                                  style="width: 100%">
                            <el-table-column label="ID">
                                <template slot-scope="scope2">
                                    <span>{{scope2.row.ID}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="ContainerID">
                                <template slot-scope="scope2">
                                    <span>{{scope2.row.ContainerID}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-table-column>

                <el-table-column align="left" label="分片ID">
                    <template slot-scope="scope">
                        <span>{{scope.row.id}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="version">
                    <template slot-scope="scope">
                        <span>{{scope.row.version}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="disableGrow">
                    <template slot-scope="scope">
                        <template v-if="scope.row.disableGrow">
                            <el-tag>{{scope.row.disableGrow}}</el-tag>
                        </template>
                        <template>
                            <el-tag type="danger">{{scope.row.disableGrow}}</el-tag>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="300px">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleToActiveList(scope.row.id)">查看活动事务
                        </el-button>
                        <template v-if="scope.row.peers.length > 0">
                            <template v-if="scope.row.branchOpen">
                                <el-button size="mini" type="info" @click="handleToggleBranch(scope.row)">收起peers
                                </el-button>
                            </template>
                            <template v-else>
                                <el-button size="mini" type="primary" @click="handleToggleBranch(scope.row)">展开peers
                                </el-button>
                            </template>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>

    import * as sysApi from '~/api/system';

    const _name = "homeIndex";

    export default {
        name: _name,

        data() {
            return {
                listQuery: {
                    // 搜索的东西
                    id: undefined,
                    version: undefined,
                },
                fragmentList: [],
                listLoading: true
            }
        },

        created() {
            this.init();
        },

        mounted() {

        },

        watch: {
            '$route': function (to, from) {
                if (to.name !== _name) {
                    this.$destroy();
                }
            },
        },

        methods: {

            getList() {
                this.listLoading = true;
                sysApi.getFragments().then((data) => {
                    this.listLoading = false;
                    this.fragmentList = (data || []).map((item) => {
                        item.branchOpen = false;
                        return item;
                    });
                }).catch(() => {

                });
            },

            init() {
                this.getList();
            },

            handleToActiveList(fid) {
                this.$router.push({path: '/active/index', query: {fid: fid}});
            },

            handleToggleBranch(item) {
                var branchOpen = item.branchOpen;
                this.$refs.dataTable.toggleRowExpansion(item, !branchOpen);
                item.branchOpen = !item.branchOpen;
            }
        }
    }
</script>
<style>
    .fragment-wrap .el-card__body {
        width: 100%;
    }
</style>

<style scoped>

    .app-container .fragment-wrap {
        width: 100%;
        padding: 10px 15px;
        margin-bottom: 20px;
        cursor: pointer;
    }


    .box-card-wrap .box-card {
        height: 140px;
        display: flex;
        align-items: center;
    }

    .box-card-item {
        margin-bottom: 10px;
    }

    .content-item {
        margin-top: 20px;
    }

    .card-tips {
        color: #06C;
        font-size: 24px;
    }

</style>
