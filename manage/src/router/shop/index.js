export default [
    {
        path:"/shopTypeList",
        name:"shopTypeList",
        component:()=>import("@/views/shop/shopTypeList.vue")
    },
    {
        path:"/shopList",
        name:"shopList",
        component:()=>import("@/views/shop/shopList.vue")
    }
] 