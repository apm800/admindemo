<template>
      <!-- <div style="height:100%"> -->
        <!-- <keep-alive> -->
            <!-- <router-view v-if="$route.meta.keepAlive" :key="$store.state.routerShow"></router-view> -->
        <!-- </keep-alive> -->
        <!-- <router-view v-if="!$route.meta.keepAlive"></router-view> -->
      <!-- </div> -->
      <router-view></router-view>
</template>

<script>
    export default {
        name: 'app',
        mounted(){
            // 上传需要线上地址
            if(window.location.origin=='http://localhost:8099'){
//               this.$store.state.xianshang  = "47.93.9.224";
              this.$store.state.xianshang  = "172.18.15.243";
            }else{
              this.$store.state.xianshang  = window.location.hostname;
            }
        }
    }
</script>

<style lang="less">
    body,html{
      height: 100%;
      // background: #18a689 !important;
    }
    .el-notification{
        z-index: 5000 !important;
    }

  input:focus{
    border-color: #1ab394 !important;
  }
  input:hover{
    border-color: #1ab394 !important;
  }

/*修改element-UI*/
  /*分页居中显示*/
  .el-pagination{
    text-align: center !important;
    margin-top: 10px !important;
  }
  .el-pagination .active{
    background-color: #1ab394 !important;
  }
  .el-pagination li:hover{
    color: #1ab394 !important;
  }
  .el-select-dropdown__list .selected{
    color: #1ab394 !important;
  }
  .el-pagination .el-pager .active{
    color: #fff !important;
    height: 30px;
  }
  /*日期中间文字显示不全*/
  .el-date-editor .el-range-separator{
  	display: inline-block !important;
    width: 10% !important;
  }
  // 选择年月,图标显示不全样式
  .el-input__icon{
    line-height: 0 !important;
  }
  /*按钮颜色*/
  .el-button--success{
    background: #1ab394 !important;
    border-color: #1ab394 !important;
  }
  .el-button--success:hover{
    background: #18a689 !important;
    border-color: #18a689 !important;
  }
  /*输入框*/
  /*input:focus {
        border: 1px solid #1ab394 !important;

  }*/
  .el-input input{
    height: 30px;
    line-height: 30px !important;
  }
  button{
    height: 30px !important;
    line-height: 6px !important;
  }
  .el-button--success:focus, .el-button--success:hover{
    background: #1ab394 !important;
    border-color:#1ab394 !important;
  }
  .content-tabs button{
    height: 100% !important;
  }
  .el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus{
    border-color:#1ab394 !important;
  }
  /*日期选择的颜色修改*/
  .el-date-editor{
    height: 30px !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  .el-date-editor .el-range-separator,.el-date-editor .el-range__icon{
    line-height: 28px !important;
  }
  .el-date-editor input{
    height: 28px !important;
  }
  .el-date-editor:hover , .is-active{
    border-color: #1ab394 !important;
  }
  .el-picker-panel__content .start-date span,.el-picker-panel__content .end-date span{
    background-color: #1ab394 !important;
  }
  .el-picker-panel__content .el-date-table td.today span{
    color: #fa5555 !important;
  }
  .el-picker-panel__content .el-date-table span:hover{
    color: #fa5555 !important;
  }

  /*选择后的背景颜色*/
  ::selection{background:#1ab394 !important; color:white !important;}  
  ::-moz-selection{background:#1ab394 !important; color:white !important;}  
  ::-webkit-selection{background:#1ab394 !important; color:white !important;} 
  /*弹出框样式*/
  .el-dialog{
    border-radius: 10px !important;
  }
 .el-dialog .el-dialog__header{
    border-bottom: 1px solid #c0c4cc !important;
  }
 .el-dialog .el-dialog__footer{
    border-top: 1px solid #c0c4cc !important;
  }
  /*表格选中*/
 .el-table--striped .el-table__body tr.el-table__row--striped.current-row td, .el-table__body tr.current-row>td, .el-table__body tr.hover-row.current-row>td, .el-table__body tr.hover-row.el-table__row--striped.current-row>td, .el-table__body tr.hover-row.el-table__row--striped>td, .el-table__body tr.hover-row>td{
    background: #c7f1e8 !important;
  }
  /*滚动条*/
  ::-webkit-scrollbar-thumb{
    background-color:#1ab394 !important;
  }
  .el-table__fixed-right::before, .el-table__fixed::before{
    z-index: -1 !important;
  }
  /*复选框*/
  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color: #1ab394 !important;
    border-color: #1ab394 !important;
  }
  /*是否启用*/
  .el-switch.is-checked .el-switch__core{
    background-color: #1ab394 !important;
  }
  .el-checkbox__inner:hover{    
    border-color: #1ab394 !important;
  }
  .el-checkbox__input.is-checked+.el-checkbox__label{
    color: #1ab394 !important;
  }

  .el-carousel__mask, .el-cascader-menu, .el-cascader-menu__item.is-disabled:hover, .el-collapse-item__header, .el-collapse-item__wrap{
    background-color: rgba(0,0,0,0) !important;
  }
  input[type=file]{
    // display: none !important;
  }
  // ※号，必填项
  .mustFill{
    color: #f56c6c;
  }
  //自定义loading
  .loading_Tan{
    color: #1ab394;
    display: inline-block;
    height: 300px;
    width: 250px;
    background: url('../static/img/loading_Tan.gif') no-repeat center center;
    background-size: cover;
    border-radius: 10px;
    position: relative;
    padding-top: 250px;
  }
</style>
