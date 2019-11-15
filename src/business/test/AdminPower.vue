<template>
    <div class="adminPower">
      <div class="liCommonStyle">
        <el-form :inline="true" ref="formInline" :model="formInline" label-width="60px">
          <el-col :span="8">
            <el-form-item label="学区" prop="selectedZone" >
              <el-select v-model="formInline.selectedZone" placeholder="选择学区">
                <el-option v-for="item in zoneList" :key="item.globalId"  :label="item.name" :value="item.globalId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="学部" prop="selectedDivision">
              <el-select v-model="formInline.selectedDivision" placeholder="选择学部">
                <el-option v-for="item in divisionList" :key="item.globalId" :label="item.name" :value="item.globalId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="年级" prop="selectedGrade">
              <el-select v-model="formInline.selectedGrade" placeholder="选择年级">
                <el-option v-for="item in gradeList" :key="item.globalId" :label="item.name" :value="item.globalId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item  label="角色" prop="selectedRole" >
              <el-select v-model="formInline.selectedRole" placeholder="选择角色">
                <el-option v-for="item in roleList" :key="item.globalId"  :label="item.name" :value="item.globalId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item   label="用户" prop="selectedUser" >
                <el-input type="text" v-model="formInline.selectedUser"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button icon="el-icon-search" class="btnSearch" type="primary">筛选</el-button>

          </el-col>


        </el-form>
      </div>
      <div class="liCommonStyle">
        <div class="addOpeBtn"><el-button icon="el-icon-plus">添加角色</el-button></div>
        <table class="table table-bordered table-hover">
          <thead>
          <tr>
            <th>学区/学部/年级</th>
            <th>职务</th>
            <th width="200">操作</th>
          </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              zoneList:[], // 学区
              divisionList:[], //学部
              gradeList:[], //年级
              roleList:[], //角色
              formInline:{
                selectedZone:'', //学区
                selectedDivision:'',//学部
                selectedGrade:'',//年级
                selectedRole:'',//角色
                selectedUser:'', //用户

              }
            }
        }
    }
</script>

<style>
.el-select,.el-input{
  width: 100%;
}
</style>
