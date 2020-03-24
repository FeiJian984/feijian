<template>
    <!-- <el-dialog title="添加店铺" :visible.sync="shopListVisible"> -->
    <!-- 控制右上角关闭 -->
    <el-dialog :title="title+'店铺'" :visible="shopListVisible" @update:visible="bol=>$emit('update:shop-list-visible',bol)"> 
        <el-form>
            <el-form-item label="店铺名称" label-width="100px">
                <el-input v-model="shopListForm.shopName" auto-complete="off" style="width:500px"></el-input>
            </el-form-item>

            <el-form-item label="店铺类别" label-width="100px">
                <el-select v-model="shopListForm.shopTypeId" placeholder="请选择">
                    <el-option v-for="item in $store.state.shop.allShopTypeList" :key="item._id" :value="item._id" :label="item.shopTypeName"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="是否推荐" label-width="100px">
                <el-radio v-model="shopListForm.isSuggest" :label="true">是</el-radio>
                <el-radio v-model="shopListForm.isSuggest" :label="false">否</el-radio>
            </el-form-item>

            <el-form-item label="店铺图片" label-width="100px">
                <el-upload :file-list="fileList" :on-success="success" :data="shopListForm" name="shopPic" ref="upload" :auto-upload="false" :limit="1" style="width:500px"  :headers="{authorization:$store.state.admin.token}" class="upload-demo" action="/ele/shopList" list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="$emit('update:shop-list-visible',false)">取 消</el-button>
            <el-button type="primary" @click="shopListSubmit">{{title}}</el-button>
        </div>
    </el-dialog>
</template>
<script>
    import axios from "axios"
    export default {
        name:"shop-list-dialog",
        props:{
            shopListVisible:{
                type:Boolean,
                default:false
            },
            shopId:{
                type:String,
                default:""
            },
            shopTypeId:{
                type:String,
                default:""
            }
        },
        data(){
            return {
                title:"添加",
                fileList:[],
                shopListForm:{
                    shopName:"",
                    shopTypeId:"",
                    isSuggest:false, //是否推荐，默认为否
                }
            }
        },
        methods:{
            success(res){  //上传成功时执行的钩子函数,res参数为请求的返回值
                if(res.ok===1){
                    if(this.$route.name==="shopList"){
                        this.$message.success("添加成功");
                        this.$store.dispatch("getShopList");
                    }else{
                        this.$router.push({name:"shopList"})
                    }
                    console.log(this.shopId)
                    this.$emit('update:shop-list-visible',false);
                }else{
                    this.$message.error(res.msg);
                    this.$emit('update:shop-list-visible',false);
                }
            },
            async shopListSubmit(){
                if(this.shopId.length>0){  //修改
                    const formdata=new FormData();
                    formdata.set("shopId",this.shopId);
                    formdata.set("shopName",this.shopListForm.shopName);
                    formdata.set("shopTypeId",this.shopListForm.shopTypeId);
                    formdata.set("isSuggest",this.shopListForm.isSuggest);
                    formdata.set("shopPic",document.querySelector(".el-upload__input").files[0]);
                    const data=await axios.put("/shopList",formdata);
                    if(data.ok===1)
                        this.success(data);
                }else
                    this.$refs.upload.submit();
                
            }
        },
        created(){
            if(this.shopId.length>0)
                this.title="修改";
        },
        async mounted(){
            if(this.shopTypeId)  //dialog被两个页面路由使用，在店铺列表页直接添加的时候不需要传入shopTypeId，所以在这里接收到shopList传来的参数是undefined，加个判断避免这种情况
                this.shopListForm.shopTypeId=this.shopTypeId; //将接收到的店铺分类id赋值给el-select绑定shopListForm.shopTypeId
            //当this.$store.state.shop.allShopTypeList已经有值，说明已经获取过所有店铺分类了，不需要每次都获取，降低了ajax的请求次数
            if(this.$store.state.shop.allShopTypeList.length<1)
                this.$store.dispatch("getAllShopTypeList");
            if(this.shopId.length>0){  //修改，先通过shopId来获取该店铺的所有信息
                const data=await axios.get("/getShopById",{
                    params:{
                        id:this.shopId
                    }
                });
                if(data.ok===1){
                    this.shopListForm.shopName=data.shopInfo.shopName;
                    this.shopListForm.shopTypeId=data.shopInfo.shopTypeId;
                    this.shopListForm.isSuggest=data.shopInfo.isSuggest;
                    this.$set(this.fileList,0,{
                        name:data.shopInfo.shopPic,
                        url:"/ele/"+data.shopInfo.shopPic
                    })
                }
            }
        }
    }
</script>