<template>
    <div>
        <el-table v-loading="$store.state.isLoading" :data="$store.state.admin.adminList" style="width: 100%">
            <el-table-column label="ID" width="300">
                <template slot-scope="scope">
                    {{scope.row._id}}
                </template>
            </el-table-column>
            <el-table-column label="管理员名称">
                <template slot-scope="scope">
                    {{scope.row.adminName}}
                </template>
            </el-table-column>
            <el-table-column label="管理员密码" width="300">
                <template slot-scope="scope">
                    {{scope.row.passWord}}
                </template>
            </el-table-column>
            <el-table-column :data="$store.state.admin.adminList" label="操作">
                <template slot-scope="scope">
                    <!-- 删除dialog -->
                    <delete :_id="scope.row._id" actions-name="deleteAdminList"></delete>
                </template>
            </el-table-column>
        </el-table>
        <pageInfo actions-name="getAdminList"></pageInfo>
    </div>
</template>
<script>
    export default {
        name:"admin-list"
    }
</script>
<style scoped>

</style>