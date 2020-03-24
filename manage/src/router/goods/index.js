export default [
    {
        path:"/goodsTypeList",
        name:"goodsTypeList",
        component:()=>import("@/views/goods/goodsTypeList.vue")
    },
    {
        path:"/goodsList",
        name:"goodsList",
        component:()=>import("@/views/goods/goodsList.vue")
    },
]