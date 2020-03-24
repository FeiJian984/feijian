<template>
    <div class="toolbar">
        <el-pagination background layout="prev, pager, next" :page-count="$store.state.pageSum" :current-page="$store.state.pageIndex" @current-change="pageIndex=>$store.dispatch(actionsName,{
            ...{pageIndex},
            ...query
        })"> <!-- getAdminLog当做参数传递进来，在使用该组件的时候绑定一个属性actions-name来传递 -->
        </el-pagination>
    </div>
</template>
<script>
    export default {
        name:"page-info",
        props:{
            actionsName:{
                type:String,
                default:""
            },
            query:{
                type:Object,
                default:()=>{return {}}  //如果设置的类型是一个对象或者数组，需要使用工厂模式来生成
            }
        },
        mounted(){
            // console.log("pageinfo",this.query.shopTypeId);
            this.$store.dispatch(this.actionsName,this.query);  //query是传递进来的一个对象，{pageIndex，shopTypeId}，根据这两个条件去获取有关的信息
        }
    }
</script>
<style scoped>

</style>