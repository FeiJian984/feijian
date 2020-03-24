<template>
    <div>
        <el-form :model="passWord" status-icon label-width="100px" class="demo-ruleForm">
        <el-form-item  label="原密码" prop="old">
            <el-input v-model="passWord.old" style="width:500px;" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new">
            <el-input v-model="passWord.new" style="width:500px;" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="renew">
            <el-input v-model="passWord.renew" style="width:500px;" type="password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button @click="passWord={}">重置</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import md5 from "md5"
    import axios from "axios";
    export default {
        name:"admin-update",
        data(){
            return {
                passWord:{
                    old:"",
                    new:"",
                    renew:""
                }
            }
        },
        methods:{
            async submit(){
                // 查看当前登录管理员的密码，然后看他与用户输入的原密码是否匹配
                const status=await axios.get("/adminUpdate/"+this.$store.state.admin.adminName);
                if(status.result.passWord===md5(this.passWord.old+"%^&*(")){
                    //查看两次新密码是否输入一致
                    if(this.passWord.new===this.passWord.renew){
                        const data=await axios.put("/adminUpdate/"+status.result._id+"/"+this.passWord.new);
                        if(data.ok===1){
                            this.$message.success(data.msg);
                            this.passWord={};
                        }
                    }
                    else
                        this.$message.error("两次密码输入不一致");
                }else{
                    this.$message.error("原密码输入有误");
                }
                const newPass=this.passWord.new;
                const renewPass=this.passWord.renew;
            }
        }
    }
</script>