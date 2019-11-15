<template>
    <div class="compList">
        <el-row :gutter="12">
            <el-col v-for="i in list"  :span="22" style="margin-bottom:20px;">
                <el-card shadow="hover">
                    <a :href="i.href" class="J_menuItem">{{i.name}}</a>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import contabs from '../../../assets/js/contabs';
    export default {
        data() {
            return {
                list:[{
                    name:'自仓入库单导入',
                    href:'/compListZenter'
                },{
                    name:'自仓出库单导入',
                    href:'/compListZcome'
                },{
                    name:'菜鸟出入库导入',
                    href:'/compListCcome'
                },{
                    name:'菜鸟订单出库导入',
                    href:'/compListCenter'
                },{
                    name:'采购订单导入',
                    href:'/compListPurchase'
                },
                {
                    name:'自仓销售出库',
                    href:'/supplyTally'
                },
                {
                    name:'线下售后单导入',
                    href:'/compListafterasle'
                },
                ]
            }
        },
        methods: {
            goList(i){
                // console.log(i)
            }
        },
        mounted() {
            contabs(this.$router);
            this.$router.push('/compList')
        },
        props: {},
        watch: {}
    }
</script>
<style lang="less">
</style>
