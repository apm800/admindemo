<template>
    <div class="middle-box text-center loginscreen  animated fadeInDown">
        <!-- 宽1200 -->
        <div class="login_new">
        <div class="login_demo_logo"></div>
        <div class="login_demo_qiu"></div>
        <div class="login_demo">
            <!-- <div> -->
                <!-- <h1 class="logo-name">BFEC</h1> -->
            <!-- </div> -->
            <!-- <h3>欢迎使用 BFEC-ADMIN</h3> -->
            <h6></h6>
            <form class="m-t" @keyup.enter="login">
                <div class="form-group">
                    <span class="user_input"></span>
                    <input type="text" class="form-control" placeholder="用户名" required="" v-model="username" style="
                        padding-left:40px;
                    ">
                </div>
                <div class="form-group">
                    <span class="pasw_input"></span>
                    <input type="password" class="form-control" placeholder="密码" required="" v-model="password"style="
                        padding-left:40px;
                    ">
                </div>
                <!-- <div class="form-group">
                    <input type="text" class="form-control" placeholder="验证码" required="" v-model="captcha">
                </div> -->
                <div class="form-group has-feedback">
                    <span class="yzm_input"></span>
                    <input type="text" class="form-control" placeholder="验证码" required="" v-model="captcha" style="
                        width:161px;
                        margin-right:10px;
                        padding-left:40px;
                    ">
                    <img :src="imgSrc" alt="" @click="refreshCode" style="width:90px;height:38px;">
                    &nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;" @click="refreshCode" style="color:#fff">换一张</a>
                </div>
                <button type="button" class="btn btn-primary block full-width m-b"  @click="login"
                    style="
                        background:rgba(255,255,255,0.8);
                        border-color:rgba(255,255,255,0); 
                        height:45px;
                        border-radius:16px; 
                        color:#114c8a;
                        margin-top:4px;
                        outline:none;
                    "
                >登 录</button>
            </form>
        </div>
        <!-- 宽1200 -->
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // 记住账号密码
                username:'',
                password:'',
                captcha:'',
                imgSrc:'/dc-admin/captcha.jpg?a=1'
            }
        },
        methods: {
            login(){
                var req={
                    username:this.username,
                    password:this.password,
                    captcha:this.captcha,
                }

                this.$http.post('/dc-admin/sys/login', req).then((response)=> {
                   var res=response.data;
                   if(res.code!=0){
                       this.$message({
                           type: 'error',
                           message: res.msg
                       })
                       this.refreshCode();
                   }else {
                       this.$router.push({path:'index'})
                   }
                }).catch((error)=> {

                });

            },
            refreshCode(){
                this.imgSrc=this.imgSrc+'1';
            },
        },
        mounted() {
            console.log(window.location.origin)
            if(window.location.origin=='http://localhost:8099'||window.location.origin=='http://'+this.$store.state.xianshang+':8077'){
                this.username = 'admin';
                this.password = 'admin';
            }
        },
        props: {},
        watch: {}
    }
</script>
<style lang="less">

// 记住账号密码谷歌兼容处理
input:-webkit-autofill {
    -webkit-animation: autofill-fix 1s infinite;
    -webkit-text-fill-color: #fff;  
}

@-webkit-keyframes autofill-fix {
    from {
        background-color: transparent
    }
    to {
        background-color: transparent
    }
}



.logo-name{
    font-size: 110px !important;
}
/*body{
    
        background: -webkit-linear-gradient(bottom,#18a689 0%,#f3f3f4 10%,);  
        background: -o-linear-gradient(bottom,#18a689 0%,#f3f3f4 10%,);  
        background: -moz-linear-gradient(bottom,#18a689 0%,#f3f3f4 10%,);  
        background: -mos-linear-gradient(bottom,#18a689 0%,#f3f3f4 10%,);  
        background: linear-gradient(bottom,#18a689 0%,#f3f3f4 10%,); 

}*/
.login_demo_logo{
    display: inline-block;
    height: 97px;
    width: 353px;
    background: url('../../static/img/logo.png') no-repeat center center;
    background-size: cover;
    margin: 0;
    position: absolute;
    top: 5%;
    left: -20%;
}
.login_demo_qiu{
    display: inline-block;
    height: 800px;
    width: 800px;
    background: url('../../static/img/qiu.png') no-repeat center center;
    background-size: cover;
    margin: 0;
    position: absolute;
    top: 10%;
    left: -15%;
}
.login_demo{
    display: inline-block;
    height: 500px;
    width: 370px;
    position: absolute;
    top: 100px;
    right: 4%;
}
.login_demo h6{
    display: inline-block;
    height: 160px;
    width: 100%;
    background: url('../assets/img/login/ztxt.png') no-repeat center center;
    margin: 0;
}
.login_demo form{
    display: inline-block;
    width: 100%;
    height: 325px;
    background: rgba(255,255,255,0.2);
    padding: 32px 0;
    margin: 0;
}
.login_demo form>div input{
    display: inline-block;
    width: 322px;
    height: 40px !important;
    background: rgba(0,0,0,0) !important;
    color:#fff !important;
}
.login_demo form button{
    display: inline-block;
    width: 322px !important;
    height: 40px !important;
}
.middle-box{
    max-width: none !important;
}
.loginscreen.middle-box{
    width: auto !important;
}
.form-group{
    position: relative;
    margin-bottom: 32px;
}
.user_input{
    display: inline-block;
    width:19px;
    height: 20px;
    background: url('../assets/img/login/user.png') no-repeat center center;
    background-size: cover;
    position: absolute;
    left: 35px;
    top: 9px;
}
.pasw_input{
    display: inline-block;
    width:17px;
    height: 20px;
    background: url('../assets/img/login/pass.png') no-repeat center center;
    background-size: cover;
    position: absolute;
    left: 37px;
    top: 9px;
}
.yzm_input{
    display: inline-block;
    width:17px;
    height: 20px;
    background: url('../assets/img/login/yzm.png') no-repeat center center;
    background-size: cover;
    position: absolute;
    left: 37px;
    top: 9px;
}
.login_new{
    display: inline-block;
    width: 1200px;
    position: relative;
}
</style>
