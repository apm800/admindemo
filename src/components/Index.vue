<template>
    <div class="text-center animated fadeInDown">
        <h1 style="font-size: 100px">Admin</h1>
        <h3 class="font-bold">admin后台管理系统</h3>
        <br>
        <!-- <button @click = "aaa">api测试按钮</button> -->
        <!-- <br> -->
        <!-- <a href="./123.xlsx" download="123">下载</a> -->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                data1:{
                    apiName:'zhu',
                    param:{
                        name:'zhurui',
                        age:15
                    }
                },
            }
        },
        methods: {
            aaa(){
                this.axios.post('/dc-admin/gate/api',

                    this.data1,

                    {type:'payload'}

                ).then(res =>{
                    console.log('测试',res)

                });
                this.$http.post('/dc-admin/gate/api',this.data1,{type:'payload'}).then((response)=>{
                    alert(JSON.stringify(response.data) );

                })
            }
        },
        mounted() {
        },
        props: {},
        watch: {}
    }
</script>
<style lang="less">

</style>
