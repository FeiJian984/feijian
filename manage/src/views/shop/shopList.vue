<template>
    <div>
        <div class="toolbar">
            <el-select v-model="shopTypeId" @change="$store.dispatch('getShopList',{shopTypeId})">
                <el-option v-for="item in $store.state.shop.allShopTypeList" :key="item._id" :value="item._id" :label="item.shopTypeName"></el-option>
            </el-select>
            <el-button type="primary" @click="isShopType=true" style="margin-left:10px;">添加店铺类别</el-button>
            <el-button type="primary" @click="shopId='';shopListVisible=true">添加店铺</el-button>
        </div>

        <el-table v-loading="$store.state.isLoading" :data="$store.state.shop.shopList" style="width: 100%">
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
            <el-table-column label="店铺名称" width="150">
                <template slot-scope="scope">
                    {{scope.row.shopName}}
                </template>
            </el-table-column>
            <el-table-column label="店铺类别名称" width="110">
                <template slot-scope="scope">
                    {{scope.row.shopTypeName}}
                </template>
            </el-table-column>
            <el-table-column label="店铺图片" width="180">
                <template slot-scope="scope">
                    <img :src="'/ele/'+scope.row.shopPic" alt="" width="50">
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" style="float:left;margin-left:10px;" @click="shopListVisible=true;shopId=scope.row._id;">修改</el-button>
                    <el-button type="text" style="float:left;margin-right:10px;" @click="visible=true;shopTypeDialogId=scope.row.shopTypeId;shopId=scope.row._id;">添加商品类别</el-button>
                    <!-- 删除dialog -->
                    <delete style="float:left;" :_id="scope.row._id" actions-name="deleteShopList"></delete>
                    <!-- <el-button size="mini" type="danger">删除</el-button> -->
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <pageInfo :query="{shopTypeId}" actions-name="getShopList"></pageInfo>

        <!-- 添加店铺类别dialog -->
        <shopTypeDialog v-if="isShopType" :visible.sync="isShopType"></shopTypeDialog>
        <!-- <shopListDialog @update:change-list-visible="bol=>shopListVisible=bol" :shop-list-visible="shopListVisible"></shopListDialog> -->
        <!-- 添加店铺dialog -->
        <shopListDialog :shop-id="shopId" v-if="shopListVisible" :shop-list-visible.sync="shopListVisible"></shopListDialog>
        <!-- 添加商品类别dialog -->
        <goodsTypeDialog :shop-id="shopId" :shop-type-id="shopTypeDialogId" v-if="visible" :visible.sync="visible"></goodsTypeDialog>
    </div>
</template>
<script>
    export default {
        name:"shop-list",
        data(){
            return {
                visible:false,
                shopListVisible:false,
                isShopType:false,
                shopTypeId:"",
                shopTypeDialogId:"",
                shopId:""
            }
        },
        created(){  //修改shopTypeId的值必须在created中，如果在mounted中写的话，在执行mounted之前shopTypeId的值已经传给pageInfo了，mounted是在所有元素挂载完成后才执行的，也就是说修改后的shopTypeId并没有传给pageInfo，pageInfo接收到的是undefined，那获取到的shopList是全部的店铺，并不是shopTypeId这个分类下的店铺
            // console.log("shoplistcreated",this.$route.params.shopTypeId);
            if(this.$route.params.shopTypeId)
                this.shopTypeId=this.$route.params.shopTypeId;
        },
        mounted(){
            // console.log("shoplistmounted",this.$route.params.shopTypeId);
            // if(this.$route.params.shopTypeId)
            //     this.shopTypeId=this.$route.params.shopTypeId;
            if(this.$store.state.shop.allShopTypeList<1)
                this.$store.dispatch("getAllShopTypeList");
        }
    }
</script>
<style scoped>

</style>