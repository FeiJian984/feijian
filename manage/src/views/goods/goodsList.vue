<template>
    <div>
        <div class="toolbar">
            <el-button type="primary" @click="goodsId='';goodsListDialog=true">添加商品</el-button>
        </div>

        <el-table v-loading="$store.state.isLoading" :data="$store.state.goods.goodsList" style="width: 100%">
            <el-table-column label="ID">
                <template slot-scope="scope">
                    {{scope.row._id}}
                </template>
            </el-table-column>
            <el-table-column label="创建时间">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.createTime | date }}</span>
                </template>
            </el-table-column>
            <el-table-column label="商品名称">
                <template slot-scope="scope">
                    {{scope.row.goodsName}}
                </template>
            </el-table-column>
            <el-table-column label="商品图片">
                <template slot-scope="scope">
                    <img :src="'/ele/'+scope.row.goodsPic" alt="" width="50">
                </template>
            </el-table-column>
            <el-table-column label="商品价格">
                <template slot-scope="scope">
                    {{scope.row.goodsPrice | price}}
                </template>
            </el-table-column>
            <el-table-column label="商品类别名称">
                <template slot-scope="scope">
                    {{scope.row.goodsTypeName}}
                </template>
            </el-table-column>
            <el-table-column label="店铺名称">
                <template slot-scope="scope">
                    {{scope.row.shopName}}
                </template>
            </el-table-column>
            <el-table-column label="店铺类别名称">
                <template slot-scope="scope">
                    {{scope.row.shopTypeName}}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button style="float:left;margin-left:20px;" @click="goodsId=scope.row._id;goodsListDialog=true;" type="text">修改</el-button>
                    <!-- 删除dialog -->
                    <delete :_id="scope.row._id" actions-name="deleteGoodsList"></delete>
                </template>
            </el-table-column>
        </el-table>

        <pageInfo actions-name="getGoodsList"></pageInfo>

        <goodsDialog :goods-id="goodsId" v-if="goodsListDialog" :goods-list-dialog.sync="goodsListDialog"></goodsDialog>
        
        <!-- <goodsUpdateDialog :goods-type-id="goodsTypeId" :is-hot="isHot" :goods-price="goodsPrice" :goods-name="goodsName" v-if="goodsUpdateVisible" :goods-update-visible.sync="goodsUpdateVisible"></goodsUpdateDialog> -->
    </div>
</template>
<script>
    export default{
        name:"goods-list",
        data(){
            return {
                goodsListDialog:false,
                // goodsUpdateVisible:false,
                goodsName:"",
                isHot:false,
                goodsTypeId:""
            }
        }
    }
</script>
<style scoped>

</style>