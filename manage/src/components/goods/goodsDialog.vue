<template>
    <el-dialog :title="title+'商品'" :visible="goodsListDialog" @update:visible="bol=>$emit('update:goods-list-dialog',bol)">
        <el-form>

            <el-form-item label="商品名称" label-width="100px">
                <el-input v-model="goodsForm.goodsName" style="width:500px" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="商品类别" label-width="100px">

                <el-select style="width:150px;margin-right:20px;" v-model="goodsForm.shopTypeId" placeholder="请选择店铺类别" @change="goodsForm.shopId='';$store.dispatch('getShopListByTypeId',goodsForm.shopTypeId)">
                    <el-option v-for="item in $store.state.shop.allShopTypeList" :key="item._id" :value="item._id" :label="item.shopTypeName"></el-option>
                </el-select>

                <el-select style="width:150px;margin-right:20px;" v-model="goodsForm.shopId" placeholder="请选择店铺" @change="goodsForm.goodsTypeId='';$store.dispatch('getGoodsTypeListByShopId',goodsForm.shopId)">
                    <el-option v-for="item in $store.state.shop.shopListByTypeId" :key="item._id" :value="item._id" :label="item.shopName"></el-option>
                </el-select>

                <el-select style="width:150px;" v-model="goodsForm.goodsTypeId" placeholder="请选择商品类别">
                    <el-option v-for="item in $store.state.goods.goodsTypeListByShopId" :key="item._id" :value="item._id" :label="item.goodsTypeName"></el-option>
                </el-select>

            </el-form-item>

            <el-form-item label="商品价格" label-width="100px">
                <el-input v-model="goodsForm.goodsPrice" style="width:150px" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="商品图片" label-width="100px">
                <el-upload :file-list="fileList" :on-success="success" :data="goodsForm" name="goodsPic" ref="upload" :auto-upload="false" :limit="1" style="width:500px"  :headers="{authorization:$store.state.admin.token}" class="upload-demo" action="/ele/goodsList" list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>

            <el-form-item label="是否热销" label-width="100px">
                <el-radio v-model="goodsForm.isHot" :label="true">是</el-radio>
                <el-radio v-model="goodsForm.isHot" :label="false">否</el-radio>
            </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
            <el-button @click="$emit('update:goods-list-dialog',false)">取 消</el-button>
            <el-button type="primary" @click="goodsListSubmit">{{title}}</el-button>
        </div>

    </el-dialog>
</template>
<script>
    import axios from "axios"
    export default {
        name:"goods-dialog",
        props:{
            goodsListDialog:{
                type:Boolean,
                dafault:false
            },
            shopTypeId:{
                type:String,
                default:""
            },
            shopId:{
                type:String,
                default:""
            },
            goodsTypeId:{
                type:String,
                default:""
            },
            goodsId:{
                type:String,
                default:""
            }
        },
        data(){
            return {
                title:"添加",
                goodsForm:{
                    goodsName:"",
                    shopTypeId:"",
                    shopId:"",
                    goodsTypeId:"",
                    goodsPrice:"",
                    isHot:false
                },
                fileList:[]
            }
        },
        methods:{
            success(res){
                if(res.ok===1){
                    if(this.$route.name==="goodsList"){
                        this.$emit('update:goods-list-dialog',false);
                        this.$message.success("提交成功");
                        this.$store.dispatch("getGoodsList");
                    }else
                        this.$router.push({name:"goodsList"});
                    
                }
            },
            async goodsListSubmit(){
                if(this.goodsId.length>0){
                    const formdata=new FormData();
                    formdata.set("goodsId",this.goodsId);
                    formdata.set("goodsName",this.goodsForm.goodsName);
                    formdata.set("shopTypeId",this.goodsForm.shopTypeId);
                    formdata.set("shopId",this.goodsForm.shopId);
                    formdata.set("goodsTypeId",this.goodsForm.goodsTypeId);
                    formdata.set("goodsPrice",this.goodsForm.goodsPrice);
                    formdata.set("isHot",this.goodsForm.isHot);
                    formdata.set("goodsPic",document.querySelector(".el-upload__input").files[0]);
                    const data=await axios.put("/goodsList",formdata);
                    if(data.ok===1)
                        this.success(data);
                }else
                    this.$refs.upload.submit();
            }
        },
        created(){
            if(this.goodsId)
                this.title="修改";
            if(this.shopTypeId)
                this.goodsForm.shopTypeId=this.shopTypeId;
            if(this.shopId)
                this.goodsForm.shopId=this.shopId;
            if(this.goodsTypeId)
                this.goodsForm.goodsTypeId=this.goodsTypeId;
        },
        async mounted(){
            if(this.$store.state.shop.allShopTypeList.length<1)
                this.$store.dispatch("getAllShopTypeList");
            if(this.shopTypeId)
                this.$store.dispatch("getShopListByTypeId",this.shopTypeId);
            if(this.shopId)
                this.$store.dispatch("getGoodsTypeListByShopId",this.shopId);
            if(this.goodsId.length>0){
                const {ok,goodsInfo}=await axios.get("/getGoodsById",{
                    params:{
                        goodsId:this.goodsId
                    }
                })
                if(ok===1){
                    this.goodsForm.goodsName=goodsInfo.goodsName;
                    this.goodsForm.shopTypeId=goodsInfo.shopTypeId;
                    this.goodsForm.shopId=goodsInfo.shopId;
                    this.goodsForm.goodsTypeId=goodsInfo.goodsTypeId;
                    this.goodsForm.goodsPrice=goodsInfo.goodsPrice;
                    this.goodsForm.isHot=goodsInfo.isHot;
                    this.$set(this.fileList,0,{
                        name:goodsInfo.goodsPic,
                        url:"/ele/"+goodsInfo.goodsPic
                    })
                }
            }
            this.$store.dispatch("getShopListByTypeId",this.goodsForm.shopTypeId);
            this.$store.dispatch("getGoodsTypeListByShopId",this.goodsForm.shopId);
        }
    }
</script>