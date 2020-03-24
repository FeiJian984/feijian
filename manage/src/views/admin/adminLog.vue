<template>
    <div>
        <el-table v-loading="$store.state.isLoading" :data="$store.state.admin.adminLog" style="width: 100%">
            <el-table-column label="ID" width="300">
                <template slot-scope="scope">
                    {{scope.row._id}}
                </template>
            </el-table-column>
            <el-table-column label="日期" width="300">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.loginTime | date }}</span>
                </template>
            </el-table-column>
            <el-table-column label="管理员名称">
                <template slot-scope="scope">
                    {{scope.row.adminName}}
                </template>
            </el-table-column>
            <el-table-column :data="$store.state.admin.adminLog" label="操作" width="300">
                <template slot-scope="scope">
                    <!-- 删除dialog -->
                    <delete :_id="scope.row._id" actions-name="deleteAdminLog"></delete>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页dialog -->
        <pageInfo actions-name="getAdminLog"></pageInfo>
    </div>
</template>
<script>
    import axios from "axios"
    export default {
        name:"admin-log",
        data(){
            return {
                pageIndex:1,
                pageSum:1,
                adminLog:[],
                isShopType:true
            }
        },
        methods:{
            // getAdminLog(pageIndex=1){
            //     this.$store.dispatch("getAdminLog",pageIndex)
            // }
            // async getAdminLog(pageIndex=1){
            //     const data=await axios.get("/adminLog",{
            //         params:{
            //             pageIndex
            //         }
            //     })
            //     this.adminLog=data.adminLog;
            //     this.pageIndex=data.pageIndex;
            //     this.pageSum=data.pageSum;
            // }
        },
        async mounted(){
            // this.getAdminLog();
            // this.$store.dispatch("getAdminLog");
        }
    }
</script>
<style scoped>

</style>