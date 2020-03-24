<template>
    <div>
        <div class="toolbar">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="店铺类别名称">
                    <el-input v-model="shopTypeName" placeholder="类别名称" ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="$store.dispatch('getShopTypeList',{shopTypeName})">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="shopTypeId='';isShopType=true">添加店铺类别</el-button>
                </el-form-item>
            </el-form>
        </div>
        
        <el-table v-loading="$store.state.isLoading" :data="$store.state.shop.shopTypeList" style="width: 100%">
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
            <el-table-column label="店铺类别名称" width="150">
                <template slot-scope="scope">
                    {{scope.row.shopTypeName}}
                </template>
            </el-table-column>
            <el-table-column label="店铺类别图片" width="150">
                <template slot-scope="scope">
                    <img :src="'/ele/'+scope.row.shopTypePic" alt="" width="50">
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="shopTypeId=scope.row._id;isShopType=true" style="float:left;margin-left:20px">修改</el-button>
                    <el-button type="text" style="float:left;margin-left:10px" @click="$router.push({name:'shopList',params:{shopTypeId:scope.row._id}})">查看该类别下的所有店铺</el-button>

                    <!-- 点击添加店铺的同时，将点击的店铺分类的id向下传给shopListDialog，接收后赋值给el-select绑定的shopTypeId -->
                    <el-button type="text" @click="shopTypeId=scope.row._id;shopListVisible=true" style="float:left;margin-right:10px;">添加店铺</el-button>
                    <!-- 删除dialog -->
                    <delete style="float:left;" :_id="scope.row._id" actions-name="deleteShopTypeList"></delete>
                    <!-- <el-button size="mini" type="danger">删除</el-button> -->
                </template>
            </el-table-column>
        </el-table>

        <pageInfo :query="{shopTypeName}" actions-name="getShopTypeList"></pageInfo>

        <shopTypeDialog :shop-type-id="shopTypeId" v-if="isShopType" :visible.sync="isShopType"></shopTypeDialog>

        <shopListDialog :shop-type-id="shopTypeId" v-if="shopListVisible" :shop-list-visible.sync="shopListVisible"></shopListDialog>
        <!-- <el-dialog title="添加店铺类别" :visible.sync="dialogFormVisible">
        <el-form>
            <el-form-item label="店铺名称" label-width="100px">
            <el-input v-model="shopTypeForm.shopTypeName" style="width:500px" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <el-form>
            <el-form-item label="店铺图片" label-width="100px">
            <el-upload
                :data="shopTypeForm"
                name="shopTypePic"
                ref="upload"
                :auto-upload="false"
                :limit="1"
                style="width:500px"
                class="upload-demo"
                action="/ele/shopType"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addShopType">确 定</el-button>
        </div>
        </el-dialog> -->
    </div>
</template>
<script>
    export default {
        name: "shop-type-list",
        data(){
            return {
                isShopType:false,
                shopListVisible:false,
                shopTypeId:"",
                shopTypeName:""
            }
        },
        methods:{
            
            // addShopType(){
            //     this.isShopType = true;
            //     setTimeout(()=>{
            //         this.$refs.shopTypeDialog.dialogFormVisible = true;
            //         console.log(this.$refs.shopTypeDialog);
            //     },100)
            // }
        }
    }
</script>
<style scoped>

</style>