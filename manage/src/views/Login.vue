<template>
    <div>
        <el-form :model="adminForm" :rules="rules" ref="adminForm" class="container">
            <h3>饿了么后台管理系统</h3>
            <el-form-item prop="adminName">
                <el-input v-model="adminForm.adminName" placeholder="请输入管理员账号"></el-input>
            </el-form-item>
            <el-form-item prop="passWord">
                <el-input v-model="adminForm.passWord" placeholder="请输入管理员账号密码" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button :loading="$store.state.isLoading" class="btn" @click="submitForm" type="primary">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        name:"login",
        data(){
            return {
                adminForm:{
                    adminName:"",
                    passWord:""
                },
                rules:{
                    adminName: [
                        { required: true, message: '请输入管理员账号', trigger: 'blur' },
                        { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
                    ],
                    passWord:[
                        { required: true, message: '请输入管理员账号密码', trigger: 'blur' },
                        { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            submitForm(){
                this.$refs.adminForm.validate(async valid=>{  //valid为文本框是否为空
                    if(valid){
                        //发送登录请求
                        const data=await this.$store.dispatch("login",this.adminForm); //this.$store.dispatch("login",this.adminForm)得到的结果是一个promise
                        if(data.ok===1){
                            this.$store.commit("CHANGE_LOGIN_INFO",data);
                        }else{
                            this.$message.error(data.msg);
                        }
                    }else{
                        this.$message.error('请输入合法的信息')
                    }
                })
            }
        }
    }
</script>
<style scoped lang="less">
    .container{
        width: 350px;
        margin: 180px auto;
        // border: 1px solid #ccc;
        // padding: 10px;
        h3{
            text-align: center;
            margin-bottom:20px;
        }
        .btn{
            margin-left: 130px;
        }
    }
</style>