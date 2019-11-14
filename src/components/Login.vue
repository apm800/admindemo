<template>
  <!-- 基于 Vue.js 2.0 酷炫自适应背景视频登录页面的设计  https://www.jianshu.com/p/8097bb3d9d49-->

  <div class="homepage-hero-module">
    
    <div class="video-container">
      
      <div :style="fixStyle" class="filter">        
        <div class="login_form">
          <el-header><h1>秋名山报名系统</h1></el-header> 
          <el-main>
            <el-input v-model="userName" placeholder="=账号=" style="width:20%" clearable></el-input>
            <br><br/>
            <el-input v-model="password" placeholder="=密码=" style="width:20%" clearable></el-input>
            <div class="form-group has-feedback">
                    <span class="yzm_input"></span>
                    <input type="text" class="form-control login-code" placeholder="验证码" required="" v-model="captcha" style="
                        width:161px;
                        margin-right:10px;
                        padding-left:40px;
                    ">
                    <img :src="imgSrc" alt="" @click="refreshCode" class="code_img">
                    &nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;" @click="refreshCode" style="color:#fff">换一张</a>
            </div>
            <br><br/>
            <el-row :gutter="10">
              <el-col :span="2"><el-button type="primary" @click="login">登录</el-button></el-col>
              <el-col :span="2" :offset="1"><el-button plain @click="register">注册</el-button></el-col>              
            </el-row>
          </el-main>
          <el-footer>
            <span style="color: #A9A9AB" @click="forget">忘记密码？点我点我</span>
          </el-footer>
        </div>
      </div>
        <video :style="fixStyle" autoplay loop class="fillWidth" v-on:canplay="canplay">
          <source src="../assets/city.mp4" type="video/mp4"/>
          浏览器不支持 video 标签，建议升级浏览器。
          <source src="../assets/city.mp4" type="video/webm"/>
          浏览器不支持 video 标签，建议升级浏览器。
        </video>
      <div class="poster hidden" v-if="!vedioCanPlay">
        <img :style="fixStyle" src="../assets/cover.jpg" alt="">
      </div>
    </div>    
  </div>
</template>
 
<script>
  export default {
    name: 'login',
    data() {
      return {
        userName: '',
        password: '',
        captcha:'',
        imgSrc:'/dc-admin/captcha.jpg?a=1',
        vedioCanPlay: false,
        fixStyle: ''
      }
    },
    methods: {
      login() {
        if (!this.userName) {
          this.$message.error('请输入用户名');
          return;
        }
        if (!this.password) {
          this.$message.error('请输入密码');
          return;
        }

        var req={
                    username:this.userName,
                    password:this.password,
                    captcha:this.captcha,
                }

        this.$http.post('/dc-admin/sys/login', req).then((response)=> {
          console.log('参数'+req.username)
            var res=response.data;
            if(res.code!=0){
                this.$message({
                    type: 'error',
                    message: res.msg
                })
                this.refreshCode();
            }else {
                // alert("跳转")
                this.$router.push({path:'index'})
            }
        }).catch((error)=> {

        });
        // this.$store.state.routerShow++;
      },
      refreshCode(){
        this.imgSrc=this.imgSrc+'1';
        this.captcha=''
      },
      register(){
          this.$message.success('注册成功');
      },
      forget(){
           this.$message({
          message: '点我也没用',
          center: true
        });
      },
      canplay() {
        this.vedioCanPlay = true
      }
    },
    mounted: function() {
      window.onresize = () => {
        const windowWidth = document.body.clientWidth
        const windowHeight = document.body.clientHeight
        const windowAspectRatio = windowHeight / windowWidth
        let videoWidth
        let videoHeight
        if (windowAspectRatio < 0.5625) {
          videoWidth = windowWidth
          videoHeight = videoWidth * 0.5625
          this.fixStyle = {
            height: windowWidth * 0.5625 + 'px',
            width: windowWidth + 'px',
            'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
            'margin-left': 'initial'
          }
        } else {
          videoHeight = windowHeight
          videoWidth = videoHeight / 0.5625
          this.fixStyle = {
            height: windowHeight + 'px',
            width: windowHeight / 0.5625 + 'px',
            'margin-left': (windowWidth - videoWidth) / 2 + 'px',
            'margin-bottom': 'initial'
          }
        }
      }
      window.onresize()
    }
  }
</script>

<style scoped>
  .login_form {
    padding-top: 15%;
    padding-left: 10%;
    padding-right: 10%;
  }
  .el-row {
    margin-bottom: 10px;
  }
  .el-col {
    border-radius: 4px;
  }
  .homepage-hero-module,
  .video-container {
    position: relative;
    height: 100vh;
    overflow: hidden;
  }

  .video-container .poster img,
  .video-container video {
    z-index: 0;
    position: absolute;
  }

  .video-container .filter {
    z-index: 1;
    position: absolute;
    background: rgba(0, 0, 0, 0.1);
  }
</style>