import axios from "axios"

const state={
    pageIndex:1,
    goodsTypeList:[],
    goodsTypeListByShopId:[],
    goodsList:[]
}
const mutations={
    CHANGE_GOODS_TYPE_LIST(state,goodsTypeList){
        state.goodsTypeList=goodsTypeList;
    },
    CHANGE_GOODS_TYPE_LIST_BY_SHOPID(state,goodsTypeListByShopId){
        state.goodsTypeListByShopId=goodsTypeListByShopId;
    },
    CHANGE_GOODS_LIST(state,goodsList){
        state.goodsList=goodsList;
    }
}
const actions={
    async addGoodsTypeList({dispatch},params){
        const data=await axios.post("/goodsTypeList",params);
        if(data.ok===1)
            dispatch("getGoodsTypeList");
    },
    async getGoodsTypeList({commit},query={}){
        const {pageIndex=1}=query;
        const data=await axios.get("/goodsTypeList",{
            params:{
                pageIndex
            }
        });
        commit("CHANGE_GOODS_TYPE_LIST",data.goodsTypeList);
    },
    async getGoodsTypeListByShopId({commit},id){
        const data=await axios.get("/getGoodsTypeListByShopId/"+id);
        commit("CHANGE_GOODS_TYPE_LIST_BY_SHOPID",data.goodsTypeList);
    },
    async deleteGoodsTypeList({dispatch},query){
        const {id,pageIndex=1}=query;
        const data=await axios.delete("/goodsTypeList/"+id);
        if(data.ok===1)
            dispatch("getGoodsTypeList",{pageIndex});
    },
    async getGoodsList({commit},query={}){
        const {pageIndex=1}=query;
        const data=await axios.get("/goodsList",{
            params:{
                pageIndex
            }
        })
        commit("CHANGE_GOODS_LIST",data.goodsList);
    },
    async deleteGoodsList({dispatch},query){
        const {id,pageIndex=1}=query;
        const data=await axios.delete("/goodsList/"+id);
        if(data.ok===1)
            dispatch("getGoodsList",{pageIndex});
    }
}
export default {
    state,
    mutations,
    actions
}