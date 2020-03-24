<template>
    <el-dialog :title="title+'商品类别'" :visible="visible" @update:visible="(bol)=>$emit('update:visible',bol)">
        <el-form>

            <el-form-item label="商品类别名称" label-width="100px">
                <el-input v-model="goodsTypeForm.goodsTypeName" style="width:500px" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="商品所属店铺" label-width="100px">

                <el-select v-model="goodsTypeForm.shopTypeId" style="margin-right:10px" @change="goodsTypeForm.shopId='';$store.dispatch('getShopListByTypeId',goodsTypeForm.shopTypeId)" placeholder="请选择店铺类别">
                    <el-option v-for="item in $store.state.shop.allShopTypeList" :key="item._id" :value="item._id" :label="item.shopTypeName"></el-option>
                </el-select>

                <el-select v-model="goodsTypeForm.shopId" placeholder="请选择店铺">
                    <el-option v-for="item in $store.state.shop.shopListByTypeId" :key="item._id" :value="item._id" :label="item.shopName"></el-option>
                </el-select>
                
            </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
            <el-button @click="$emit('update:visible',false)">取 消</el-button>
            <el-button type="primary" @click="addShopTypeList">{{title}}</el-button>
        </div>

    </el-dialog>
</template>
<script>
    import axios from "axios"
    export default {
        name:"goods-type-dialog",
        props:{
            visible:{
                type:Boolean,
                default:false
            },
            shopTypeId:{
                type:String,
                default:""
            },
            shopId:{
                type:String,
                default:""
            },
            goodsTypeName:{
                type:String,
                default:""
            },
            goodsTypeId:{
                type:String,
                default:""
            }
        },
        data(){
            return {
                title:"添加",
                goodsTypeForm:{
                    goodsTypeName:"",
                    shopTypeId:"",
                    shopId:"",
                    goodsTypeId:""
                }
            }
        },
        methods:{
            async addShopTypeList(){
                if(this.goodsTypeName.length>0){
                    const data=await axios.put("/goodsTypeList/"+this.goodsTypeForm.goodsTypeId+"/"+this.goodsTypeForm.goodsTypeName+"/"+this.goodsTypeForm.shopTypeId+"/"+this.goodsTypeForm.shopId);
                    if(data.ok===1){
                        this.$emit('update:visible',false);
                        this.$store.dispatch("getGoodsTypeList");
                    }
                        
                }else{
                    this.$store.dispatch('addGoodsTypeList',this.goodsTypeForm);
                    this.$emit('update:visible',false);
                    this.$message.success("添加成功");
                    if(this.$route.name!=="goodsTypeList")
                        this.$router.push({name:"goodsTypeList"});
                    }
            },
        },
        created(){
            // console.log(this.shopTypeId)
            if(this.goodsTypeName.length>0)
                this.title="修改";
            if(this.shopTypeId)
                this.goodsTypeForm.shopTypeId=this.shopTypeId;
            if(this.shopId)
                this.goodsTypeForm.shopId=this.shopId;
            if(this.goodsTypeName)
                this.goodsTypeForm.goodsTypeName=this.goodsTypeName;
            if(this.goodsTypeId)
                this.goodsTypeForm.goodsTypeId=this.goodsTypeId;
        },
        mounted(){
            // console.log(this.goodsTypeForm.shopId);
            // console.log(this.$store.state.shop.allShopTypeList.length);
            if(this.$store.state.shop.allShopTypeList.length<1){
                this.$store.dispatch("getAllShopTypeList");
            }
            console.log(this.shopTypeId)
            if(this.shopTypeId)
                this.$store.dispatch("getShopListByTypeId",this.shopTypeId);

            // console.log(this.$store.state.shop.shopListByTypeId);
        }
    }
</script>