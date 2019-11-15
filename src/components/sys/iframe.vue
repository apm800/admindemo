<template>
    <div>
        <!-- <iframe class="iframe J_iframe" :src="'http://'+$route.params.url" ref="iframe" v-loading.fullscreen.lock="fullscreenLoading"></iframe> -->
        <iframe class="iframe J_iframe" :src="url" ref="iframe" v-loading.fullscreen.lock="fullscreenLoading"></iframe>
        <!-- <span>{{$route.params.url}}</span> -->
    </div>
</template>

<script>
    export default {
        name: 'myiframe',
        data() {
            return {
                fullscreenLoading: false,
                url:'',
            }
        },
        created() {
            this.fullscreenLoading = true
        },
        mounted() {
            // 更正url格式
            this.iframeUrl();
            this.iframeInit()
            window.onresize = () => {
                this.iframeInit()
            }
        },
        props: ['routerPath'],
        watch: {
             "$route":function(to,from){
                this.iframeUrl();
             }
        },
        computed:{
            newRender:function(){
                var a = window.location.href;
                a = unescape(a);
                var num=a.indexOf("?") 
                a=a.substr(num+1); 
                return a
            }
        },
        components: {

        },
        methods: {
            iframeInit() {
                const iframe = this.$refs.iframe
                const clientHeight = document.documentElement.clientHeight - 90
                iframe.style.height = `${clientHeight}px`
                if (iframe.attachEvent) {
                    iframe.attachEvent('onload', () => {
                        this.fullscreenLoading = false
                    })
                } else {
                    iframe.onload = () => {
                        this.fullscreenLoading = false
                    }
                }
            },
            // 更正url格式
            iframeUrl(){
                this.url = this.$route.params.url;
                if (this.url.indexOf('dc-admin/')!=0) {
                    this.url = 'http://'+this.$route.params.url;
                }else{
                    this.url = this.$route.params.url;
                };
            }
        },
        route: {
          data() {
            this.$root.showLoading();
            return this.fetchCertificates().then((res) => {
              this.$root.dismissLoading();
              if (res.error) return this.$root.toastError(res.error);
              if(res.data.certificates.length >0){
                return res.data;
              }else{
                console.log(this.$route ,"----当前页面的url信息----");
              }
            });
          },
          canActivate (transition) {
            console.log(transition,"======上一个页面的url信息=======");
            transition.next();
          }
        },
    }
</script>

<style>
    .iframe {
        width: 100%;
        height: 100%;
        border: 0;
        overflow: hidden;
        box-sizing: border-box;
    }
</style>
