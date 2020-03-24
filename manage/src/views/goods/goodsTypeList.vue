<template>
    <div>
        <div class="toolbar">
            <el-button type="primary" @click="goodsTypeId='';goodsTypeName='';shopTypeId='';shopId='';visible=true">添加商品类别</el-button>
        </div>

        <el-table v-loading="$store.state.isLoading" :data="$store.state.goods.goodsTypeList" style="width: 100%">
            <el-table-column label="ID" width="220">
                <template slot-scope="scope">
                    {{scope.row._id}}
                </template>
            </el-table-column>
            <el-table-column label="创建时间" width="190">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.createTime | date }}</span>
                </template>
            </el-table-column>
            <el-table-column label="商品类别名称" width="150">
                <template slot-scope="scope">
                    {{scope.row.goodsTypeName}}
                </template>
            </el-table-column>
            <el-table-column label="店铺名称" width="150">
                <template slot-scope="scope">
                    {{scope.row.shopName}}
                </template>
            </el-table-column>
            <el-table-column label="店铺类别名称" width="150">
                <template slot-scope="scope">
                    {{scope.row.shopTypeName}}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="visible=true;goodsTypeId=scope.row._id;shopTypeId=scope.row.shopTypeId;shopId=scope.row.shopId;goodsTypeName=scope.row.goodsTypeName;" style="float:left;margin-left:10px;">修改</el-button>
                    <el-button type="text" @click="shopTypeId=scope.row.shopTypeId;shopId=scope.row.shopId;goodsTypeId=scope.row._id;goodsListDialog=true" style="float:left;margin-left:10px;margin-right:10px;">添加商品信息</el-button>

                    <!-- 删除dialog -->
                    <delete style="float:left;" :_id="scope.row._id" actions-name="deleteGoodsTypeList"></delete>
                    <!-- <el-button size="mini" type="danger">删除</el-button> -->
                </template>
            </el-table-column>
        </el-table>

        <pageInfo actions-name="getGoodsTypeList"></pageInfo>

        <!-- 添加商品的dialog -->
        <goodsDialog :goods-type-id="goodsTypeId" :shop-id="shopId" :shop-type-id="shopTypeId" v-if="goodsListDialog" :goods-list-dialog.sync="goodsListDialog"></goodsDialog>
        <!-- 添加商品类型的dialog -->
        <goodsTypeDialog :goods-type-id="goodsTypeId" :goods-type-name="goodsTypeName" :shop-id="shopId" :shop-type-id="shopTypeId" v-if="visible" :visible.sync="visible"></goodsTypeDialog>
    </div>
</template>
<script>
    export default{
        name:"goods-type-list",
        data(){
            return {
                visible:false,
                goodsListDialog:false,
                shopTypeId:"",
                shopId:"",
                goodsTypeId:""
            }
        }
    }
</script>
<style scoped>

</style>