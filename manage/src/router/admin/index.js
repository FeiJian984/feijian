//所有和管理员相关的路由
import AdminLog from "@/views/admin/adminLog"
import AdminList from "@/views/admin/adminList"
import AdminUpdate from "@/views/admin/adminUpdate"
export default [
    {
        path:"/",
        name:"adminLog",
        component:AdminLog
    },
    {
        path:"/adminList",
        name:"adminList",
        component:AdminList
    },
    {
        path:"/adminUpdate",
        name:"adminUpdate",
        component:AdminUpdate
    }
]