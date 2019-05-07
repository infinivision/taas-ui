<template>
    <div>
        <template v-if="item.statusDangerous">
            <el-tag type="danger">{{item.status | globalStatus}}</el-tag>
        </template>

        <template v-else-if="item.statusWarning">
            <el-tag type="warning">{{item.status | globalStatus}}</el-tag>
        </template>

        <template v-else-if="item.statusSuccess">
            <el-tag type="success">{{item.status | globalStatus}}</el-tag>
        </template>
        <template v-else>
            <el-tag type="info">{{item.status | globalStatus}}</el-tag>
        </template>
    </div>
</template>

<script>
    export default {
        name: "GlobalStatus",
        props: ['item'],
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
