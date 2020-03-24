import axios from "axios"
const state={
    pageIndex:1,
    shopTypeList:[],  //店铺类别列表
    allShopTypeList:[],  //所有店铺类别，做成下拉框的值
    shopList:[],  //店铺列表
    shopListByTypeId:[],
    allShopList:[]
}
const mutations={
    CHANGE_SHOP_TYPE_LIST(state,shopTypeList){
        state.shopTypeList=shopTypeList;
    },
    CHANGE_ALL_SHOP_TYPE_LIST(state,allShopTypeList){
        state.allShopTypeList=allShopTypeList;
    },
    CHANGE_SHOP_LIST(state,shopList){
        state.shopList=shopList;
    },
    CHANGE_SHOP_LIST_BY_ID(state,shopList){
        state.shopListByTypeId=shopList;
    },
    CHANGE_ALL_SHOP_lIST(state,allShopList){
        state.allShopList=allShopList;
    }
}
const actions={
    //获取店铺类别，渲染时使用
    async getShopTypeList({commit},query={}){
        const {pageIndex=1,shopTypeName=""}=query;
        const data=await axios.get("/shopTypeList",{
            params:{
                pageIndex,
                shopTypeName
            }
        })
        commit("CHANGE_SHOP_TYPE_LIST",data.shopTypeList);
    },
    async deleteShopTypeList({dispatch},query){
        const {id,pageIndex=1}=query;
        const data=await axios.delete("/shopTypeList/"+id);
        if(data.ok===1){
            dispatch("getShopTypeList",{pageIndex});
        }
    },
    //获取所有店铺类别，下拉列表使用
    async getAllShopTypeList({state,commit}){
        const data=await axios.get("/allShopTypeList");
        commit("CHANGE_ALL_SHOP_TYPE_LIST",data.allShopTypeList);
    },
    //获得店铺
    async getShopList({commit},query={}){
        const {pageIndex=1,shopTypeId=""}=query;
        const data=await axios.get("/shopList",{
            params:{
                pageIndex,
                shopTypeId
            }
        })
        commit("CHANGE_SHOP_LIST",data.shopList);
    },
    //根据店铺类别ID获得店铺信息
    async getShopListByTypeId({commit},shopTypeId){
        const data=await axios.get("/getShopListByTypeId/"+shopTypeId);
        commit("CHANGE_SHOP_LIST_BY_ID",data.shopList);
    },
    async deleteShopList({dispatch},query){
        const {id,pageIndex=1}=query;
        const data=await axios.delete("/shopList/"+id);
        if(data.ok===1){
            dispatch("getShopList",{pageIndex});
        }
    }
}

export default {
    state,
    mutations,
    actions
}