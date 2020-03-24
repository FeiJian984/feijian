<template>
    <div>
        <!-- <el-button size="mini" type="danger" @click="$store.dispatch('deleteAdminLog',scope.row._id)">删除</el-button> -->
        <template>
            <el-button type="text" @click="open2">删除</el-button>
        </template>
    </div>
    
</template>
<script>
    export default {
        name:"delete",
        props:["_id","actionsName"],
        methods: {
            open2() {
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',                    
                    }).then(() => {
                        this.$store.dispatch(this.actionsName,{id:this._id,pageIndex:this.$store.state.pageIndex});
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                    });
                }
            }
        }
</script>
<style scoped>

</style>