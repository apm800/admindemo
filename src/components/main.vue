<template>
    <div id="wrapper">
        <navbar v-if="isLoading"></navbar>
        <page-wrapper v-if="isLoading"></page-wrapper>
        <right-sidebar v-if="isLoading"></right-sidebar>
    </div>
</template>

<script>
    import '../assets/css/common.css'
    import navbar from './navbar'
    import pageWrapper from './pageWrapper'
    import rightSidebar from './rightSidebar'

    export default {
        name: 'app',
        data(){
          return {
              	isLoading:false,
                datashopname:{
                    apiName:'get_project_shop',
                },
          }
        },
        components:{
            navbar,
            pageWrapper,
            rightSidebar
        },
        created(){
          // 如果是页面刷新过来的就直接去index页面，不要再渲染其他页面
          if(performance.navigation.type==1){
              this.$router.push('/index')
          }
        },
        mounted(){
            this.$http.get('/dc-admin/sys/menu/getUserAllPerms').then((response)=>{
                var res=response.data;
                console.log(res)
                if(res.code==0){
                    window.permission=res.allPerms;
                    window.permission.push('*');
                    setTimeout(()=>{
                        this.isLoading=true;
                    },200)
                }
            })
            // 请求用户信息
            this.$http.get('/dc-admin/sys/user/info/').then((response)=>{
                window.userMes = response.data.user;
            });
            // 请求店铺信息
            this.axios.post('/dc-admin/admin/shop/query/',
            {type: 'payload'}
             ).then(res =>{
                window.shopName = JSON.parse(res.data.list);
                console.log(window.shopName)
            });
            this.axios.post('/dc-admin/gate/api', 
                this.datashopname,
                {type: 'payload'}
                ).then(res =>{
                	window.shopNamedata = JSON.parse(res.data.data).data
                	console.log(window.shopNamedata)
                })
        },
        watch: {
            routerPath: function(val) {
                this.urlPath = this.getUrlPath()
            },
             "$route":function(to,from){
               //from 对象中包含当前地址
               //to 对象中包含目标地址
               //其实还有一个next参数的，这个参数是控制路由是否跳转的，如果没写，可以不用写next()来代表允许路由跳转，如果写了就必须写next(),否则路由是不会生效的。
             },
            $route(to,from){
                console.log(to.path);
                try{
                    window.clearInterval(proJD);
                }catch(err){}
                try{
                    window.clearInterval(dingshi);
                }catch(err){}
            }
        },
    }
</script>
<style lang="less">
</style>
