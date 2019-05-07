<template>
    <div>
        <template v-if="item.statusDangerous || item.statusWarning">
            <el-tag type="info" style="color: white">{{item.status | branchStatus}}</el-tag>
        </template>
        <template v-else>
            <el-tag type="info">{{item.status | branchStatus}}</el-tag>
        </template>
    </div>
</template>

<script>
    export default {
        name: "BranchStatus",
        props: ['item'],
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
