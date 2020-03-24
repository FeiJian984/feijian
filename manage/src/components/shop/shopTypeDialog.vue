<template>
    <!-- <el-dialog title="添加店铺类别" :visible.sync="dialogFormVisible"> -->
    <el-dialog :title="title+'店铺类别'" :visible="visible" @update:visible="(bol)=>$emit('update:visible',bol)">
        <el-form>

            <el-form-item label="店铺类别名称" label-width="100px">
                <el-input v-model="shopTypeForm.shopTypeName" style="width:500px" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="店铺类别图片" label-width="100px">
                <el-upload :file-list="fileList" :on-success="success" :data="shopTypeForm" name="shopTypePic" ref="upload" :auto-upload="false" :headers="{authorization:$store.state.admin.token}" :limit="1" style="width:500px" class="upload-demo" action="/ele/shopType" list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>

        </el-form>

        <div slot="footer" class="dialog-footer">
            <el-button @click="$emit('update:visible',false)">取 消</el-button>
            <el-button type="primary" @click="addShopType">{{title}}</el-button>
        </div>

    </el-dialog>
</template>
<script>
    import axios from "axios"
    export default {
        name:"shop-type-dialog",
        props:{
            visible:{
                type:Boolean,
                default:false
            },
            shopTypeId:{
                type:String,
                default:""
            }
        },
        data(){
            return {
                dialogFormVisible:false,
                title:"添加",
                shopTypeForm:{
                    shopTypeName:""
                },
                fileList:[]
            }
        },
        methods:{
            async addShopType(){
                if(this.shopTypeId.length>0){  //修改
                    const formdata=new FormData();
                    formdata.set("shopTypeId",this.shopTypeId);
                    formdata.set("shopTypeName",this.shopTypeForm.shopTypeName);
                    formdata.set("shopTypePic",document.querySelector(".el-upload__input").files[0]);
                    const data=await axios.put("/shopTypeList",formdata);
                    if(data.ok===1)
                        this.success(data);
                }else  //添加
                    this.$refs.upload.submit();
            },
            //上传成功时的钩子
            success(res){  //上传成功后刷新并跳转
                if(res.ok === 1){
                    if(this.$route.name==="shopTypeList"){  //店铺分类如果当前是在店铺类别页面添加的，就调用方法获得店铺分类列表，并且渲染
                        this.$store.dispatch("getShopTypeList");
                        this.$message.success("添加成功");
                    }    
                    else     //店铺分类如果是在店铺列表添加的，就跳转到店铺类别页面，在店铺类别页面再执行获取和渲染
                        this.$router.push({name:"shopTypeList"}); 
                }
                this.$emit("update:visible",false);  //上传成功后，让dialog消失
            }
        },
        created(){
            if(this.shopTypeId)
                this.title="修改";
        },
        async mounted(){
            if(this.shopTypeId.length>0){ //this.shopTypeId有值说明是在修改，然后发送ajax请求来获取该店铺类别的信息
                const data=await axios.get("/getShopTypeById",{
                    params:{
                        id:this.shopTypeId
                    }
                });
                if(data.ok===1){
                    this.shopTypeForm.shopTypeName=data.shopTypeInfo.shopTypeName;
                    this.$set(this.fileList,0,{
                        name:data.shopTypeInfo.shopTypePic,
                        url:"/ele/"+data.shopTypeInfo.shopTypePic
                    })
                    // this.fileList=[
                    //     {
                    //         name:data.shopTypeInfo.shopTypePic,
                    //         url:"/ele/"+data.shopTypeInfo.shopTypePic
                    //     }
                    // ]
                }
                
                    
            }
        }
    }
</script>
<style scoped>

</style>