import axios from "axios"
import bus from "@/bus"
const state={
    adminName:localStorage.adminName,
    token:localStorage.token,
    adminLog:[],
    adminList:[],
    pageIndex:1,
    // pageSum:1
}
const mutations={
    CHANGE_LOGIN_INFO(state,info){
        state.adminName=localStorage.adminName=info.adminName;
        state.token=localStorage.token=info.token;
    },
    OUT_LOGIN(state){
        localStorage.clear();
        state.adminName=state.token=null;
    },
    CHANGE_ADMIN_LOG(state,adminLog){
        state.adminLog=adminLog;
        state.pageIndex=adminLog.pageIndex;
        // state.pageSum=info.pageSum;
    },
    CHANGE_ADMIN_LIST(state,adminList){
        state.adminList=adminList;
    }
}
const actions={
    async login({commit},params){
        const data=await axios.post("/login",params);
        return data;
    },
    async getAdminLog({commit},query={}){
        const {pageIndex=1}=query;
        const data=await axios.get("/adminLog",{
            params:{
                pageIndex
            }
        });
        commit("CHANGE_ADMIN_LOG",data.adminLog);
        return data;
    },
    async deleteAdminLog({dispatch},query){
        const {id,pageIndex=1}=query;
        const data=await axios.delete("/adminLog/"+id);
        if(data.ok===1){
            dispatch("getAdminLog",{pageIndex});
        }
    },
    async getAdminList({commit},query={}){
        const {pageIndex=1}=query;
        const data=await axios.get("/adminList",{
            params:{
                pageIndex
            }
        })
        commit("CHANGE_ADMIN_LIST",data.adminList);
        return data;
    },
    async deleteAdminList({dispatch},query){
        const {id,pageIndex=1}=query;
        const data=await axios.delete("/adminList/"+id);
        if(data.ok===1)
            dispatch("getAdminList",{pageIndex});
    }
    // async login({commit},params){
    //     const {data}=await axios.post("/ele/login",params);
    //     if(data.ok===1){  //登录成功时保存token
    //         commit("CHANGE_LOGIN_INFO",data);
    //     }else{
    //         bus.$message.error('请输入合法的信息'); // message在vue中，此时没有vue实例，可以从外部创建并引入bus
    //     }
    // }
    // async login({commit},_this){
    //     const {data}=await axios.post("/ele/login",_this.adminForm);
    //     if(data.ok===1){  //登录成功时保存token
    //         commit("CHANGE_LOGIN_INFO",data);
    //     }else{
    //         _this.$message.error(data.msg); // message此时在vue实例中，所以传一个vue实例的参数进来
    //     }
    // }
}
export default{
    state,
    actions,
    mutations
}