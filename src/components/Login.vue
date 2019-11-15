<template>
  <div class="homepage-hero-module">
    <div class="video-container">
      <div :style="fixStyle" class="filter">
        <div class="login_demo" style="height:360px">
          <form class="m_t" @keyup.enter="login" style="height:360px">
            <center><h1>秋名山报名系统</h1></center>
            <div class="form-group">
              <span class="user_input"></span>
              <input
                type="text"
                class="form-control"
                placeholder="账号"
                required
                v-model="userName"
                style="padding-left:40px;"/>
            </div>
            <div class="form-group">
              <span class="pasw_input"></span>
              <input
                type="password"
                class="form-control"
                placeholder="密码"
                required
                v-model="password"
                style="padding-left:40px;"/>
            </div>
            
            <div class="form-group has-feedback">
              <span class="yzm_input"></span>
              <input
                type="text"
                class="form-control login-code"
                placeholder="验证码"
                required
                v-model="captcha"
                style="width:161px;margin-right:10px;padding-left:40px;"
              />
              <img :src="imgSrc" alt @click="refreshCode" class="code_img" />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="javascript:;" @click="refreshCode" style="color:#fff">换一张</a>
            </div>
            <button
              type="button"
              class="btn btn-primary block full-width m-b login_btn"
              @click="login" >登 录</button><br/>
            <center><span style="color:black" @click="forget">忘记密码？点我点我</span></center>
          </form>
        </div>
      </div>
      <video :style="fixStyle" autoplay loop class="fillWidth" v-on:canplay="canplay">
        <source src="../assets/city.mp4" type="video/mp4" />浏览器不支持 video 标签，建议升级浏览器。
        <source src="../assets/city.mp4" type="video/webm" />浏览器不支持 video 标签，建议升级浏览器。
      </video>
      <div class="poster hidden" v-if="!vedioCanPlay">
        <img :style="fixStyle" src="../assets/cover.jpg" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 记住账号密码
      userName: "",
      password: "",
      captcha: "",
      imgSrc: "/dc-admin/captcha.jpg?a=1",
      vedioCanPlay: false,
      fixStyle: ""
    };
  },
  methods: {
    login() {
      var req = {
        userName: this.userName,
        password: this.password,
        captcha: this.captcha
      };

      this.$http
        .post("/dc-admin/sys/login", req)
        .then(response => {
          var res = response.data;
          if (res.code != 0) {
            this.$message({
              type: "error",
              message: res.msg
            });
            this.refreshCode();
          } else {
            this.$router.push({ path: "index" });
          }
        })
        .catch(error => {});
      this.$store.state.routerShow++;
    },

    refreshCode() {
      this.imgSrc = this.imgSrc + "1";
      this.captcha = "";
    },
    register() {
      this.$message.success("注册成功");
    },
    forget() {
      this.$message({
        message: "点我也没用",
        center: true
      });
    },
    canplay() {
      this.vedioCanPlay = true;
    }
  },

  mounted: function() {
    window.onresize = () => {
      const windowWidth = document.body.clientWidth;
      const windowHeight = document.body.clientHeight;
      const windowAspectRatio = windowHeight / windowWidth;
      let videoWidth;
      let videoHeight;
      if (windowAspectRatio < 0.5625) {
        videoWidth = windowWidth;
        videoHeight = videoWidth * 0.5625;
        this.fixStyle = {
          height: windowWidth * 0.5625 + "px",
          width: windowWidth + "px",
          "margin-bottom": (windowHeight - videoHeight) / 2 + "px",
          "margin-left": "initial"
        };
      } else {
        videoHeight = windowHeight;
        videoWidth = videoHeight / 0.5625;
        this.fixStyle = {
          height: windowHeight + "px",
          width: windowHeight / 0.5625 + "px",
          "margin-left": (windowWidth - videoWidth) / 2 + "px",
          "margin-bottom": "initial"
        };
      }
    };
    window.onresize();
  },
  props: {},
  watch: {}
};
</script>
<style lang="less">
// 记住账号密码谷歌兼容处理
input:-webkit-autofill {
  -webkit-animation: autofill-fix 1s infinite;
  -webkit-text-fill-color: #fff;
}

@-webkit-keyframes autofill-fix {
  from {
    background-color: transparent;
  }
  to {
    background-color: transparent;
  }
}
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

.logo-name {
  font-size: 110px !important;
}
/*body{
    
        background: -webkit-linear-gradient(bottom,#18a689 0%,#f3f3f4 10%,);  
        background: -o-linear-gradient(bottom,#18a689 0%,#f3f3f4 10%,);  
        background: -moz-linear-gradient(bottom,#18a689 0%,#f3f3f4 10%,);  
        background: -mos-linear-gradient(bottom,#18a689 0%,#f3f3f4 10%,);  
        background: linear-gradient(bottom,#18a689 0%,#f3f3f4 10%,); 

}*/
.login_demo_logo {
  display: inline-block;
  height: 97px;
  width: 353px;
  background: url("../../static/img/logo.png") no-repeat center center;
  background-size: cover;
  margin: 0;
  position: absolute;
  top: 5%;
  left: -20%;
}
.login_demo_qiu {
  display: inline-block;
  height: 800px;
  width: 800px;
  margin: 0;
  position: absolute;
  top: 10%;
  left: -15%;
}
.login_demo_qiu img {
  width: 100%;
  height: 100%;
}

.login_demo {
  display: inline-block;
  height: 500px;
  width: 370px;
  position: absolute;
  top: 100px;
  left: 15%;
}
.login_demo h6 {
  display: inline-block;
  height: 160px;
  width: 100%;
  background: url("../assets/img/login/ztxt.png") no-repeat center center;
  margin: 0;
}
.login_demo form {
  display: inline-block;
  width: 100%;
  height: 325px;
  // 调整form背景颜色
  background: rgba(255, 255, 255, 0.2);
  padding: 32px 0;
  margin: 0;
}
.login_demo form > div input {
  display: inline-block;
  width: 322px;
  height: 40px !important;
  background: rgba(0, 0, 0, 0) !important;
  color: #fff !important;
}
.login_demo form button {
  display: inline-block;
}
.middle-box {
  max-width: none !important;
}
.loginscreen.middle-box {
  width: auto !important;
}
.form-group {
  position: relative;
  margin-bottom: 32px;
}
.user_input {
  display: inline-block;
  width: 19px;
  height: 20px;
  background: url("../assets/img/login/user.png") no-repeat center center;
  background-size: cover;
  position: absolute;
  left: 35px;
  top: 9px;
}
.pasw_input {
  display: inline-block;
  width: 17px;
  height: 20px;
  background: url("../assets/img/login/pass.png") no-repeat center center;
  background-size: cover;
  position: absolute;
  left: 37px;
  top: 9px;
}
.yzm_input {
  display: inline-block;
  width: 17px;
  height: 20px;
  background: url("../assets/img/login/yzm.png") no-repeat center center;
  background-size: cover;
  position: absolute;
  left: 37px;
  top: 9px;
}
.login_new {
  display: inline-block;
  width: 1200px;
  position: relative;
}
.login_btn {
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(255, 255, 255, 0);
  width: 322px !important;
  height: 45px !important;
  border-radius: 16px;
  color: #114c8a;
  margin-top: 4px;
  outline: none;
}
.code_img {
  width: 90px;
  height: 38px;
}
.login-code {
}
@media only screen and (max-width: 1300px) {
  .login_new {
    width: 812.5px;
  }
  .login_demo_qiu {
    height: 521.6px;
    width: 521.6px;
  }
  .login_demo_logo {
    width: 220.6px;
    height: 60.6px;
  }
  .login_demo {
    height: 312.5px;
    width: 231.25px;
    top: 62.5px;
  }
  .login_demo h6 {
    height: 100px;
  }
  .login_demo form > div input {
    width: 201.25px;
    height: 25px !important;
    padding-left: 29px !important;
  }
  .user_input {
    width: 11.87px;
    height: 12.5px;
    left: 21.87px;
    top: 5.625px;
  }
  .pasw_input {
    width: 10.625px;
    height: 12.5px;
    left: 23.125px;
    top: 5.625px;
  }
  .yzm_input {
    width: 10.625px;
    height: 12.5px;
    left: 23.125px;
    top: 5.625px;
  }
  .login_demo form {
    height: 240px;
    padding: 20px 0;
  }
  .login_btn {
    width: 201.25px !important;
    height: 28.125px !important;
    border-radius: 10px;
    margin-top: 2.5px;
  }
  .form-group {
    position: relative;
    margin-bottom: 20px;
  }
  .code_img {
    width: 56.25px;
    height: 25px;
  }
  .login-code {
    width: 80px !important;
    margin-right: 6.25px !important;
    padding-left: 23px !important;
  }
  .has-feedback .form-control {
    padding-right: 6.56px;
  }
}
@media screen and (min-width: 1301px) and (max-width: 1700px) {
  .login_new {
    width: 936px;
  }
  .login_demo_qiu {
    height: 624px;
    width: 624px;
  }
  .login_demo_logo {
    width: 275.34px;
    height: 75.66px;
  }
  .login_demo {
    height: 390px;
    width: 288.6px;
    top: 188px;
  }
  
  .login_demo h6 {
    height: 124.8px;
  }
  .login_demo form > div input {
    width: 251px;
    height: 31.2px !important;
    padding-left: 31.2px !important;
  }
  .user_input {
    width: 14.82px;
    height: 15.6px;
    left: 12.86px;
    top: 7.02px;
  }
  .pasw_input {
    width: 13.26px;
    height: 15.6px;
    left: 12.86px;
    top: 7.02px;
  }
  .yzm_input {
    width: 13.62px;
    height: 15.6px;
    left: 12.86px;
    top: 7.02px;
  }
  .login_demo form {
    height: 253.5px;
    padding: 25px 0;
  }
  .login_btn {
    width: 251px !important;
    height: 35px !important;
    border-radius: 12px;
    margin-top: 3px;
    margin-left:18px;
  }
  .form-group {
    position: relative;
    margin-bottom: 15px;
    margin-left:18px;
  }
  .code_img {
    width: 70px;
    height: 29px;
  }
  .login-code {
    width: 116.6px !important;
    margin-right: 7.8px !important;
    padding-left: 31px !important;
  }
  .has-feedback .form-control {
    padding-right: 7px;
  }
}
</style>
