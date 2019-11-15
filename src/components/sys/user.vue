<template>
    <div class="user-sys">
        <div style="margin-bottom: 20px;" >
            <el-button size="mini" type="success" @click="append">增加</el-button>
            <el-input placeholder="请输入角色名称或者邮箱" @keyup.enter.native='userClasSou(input22)' v-model="input22" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click='userClasSou(input22)'></el-button>
            </el-input>
        </div>

        <el-table :data="tableData"
                  style="width: 100%">
            <el-table-column
                label="操作"
                width="260">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="edit(scope.row.userId)">修改</el-button>
                    <el-button size="mini" type="danger" @click="remove(scope.row.userId)">删除</el-button>
                    <el-button size="mini" type="danger" @click="editpwd(scope.row.userId)">修改密码</el-button>
                </template>
            </el-table-column>
            <el-table-column
                label="角色名称"
                width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.username }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="所属部门"
                width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.deptName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="邮箱">
                <template slot-scope="scope">
                    <span>{{ scope.row.email }}</span>
                </template>
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <span>{{ scope.row.status==1?'正常':'封禁' }}</span>
                </template>
            </el-table-column>
            <el-table-column label="创建时间">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="page-block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="page"
                :page-sizes="pagesizes"
                :page-size="limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>

        <!--增加-->
        <el-dialog title="新增" :visible.sync="addDialog">
            <el-form :model="addForm">
                <el-form-item label="用户名" :label-width="'120px'">
                    <el-input v-model="addForm.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="'120px'">
                    <el-input v-model="addForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="'120px'">
                    <el-input v-model="addForm.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="'120px'">
                    <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="部门" :label-width="'120px'">
                    <el-button @click="depyDialog=true">{{chooseDeptData.deptId?chooseDeptData.deptName:'请选择部门'}}</el-button>
                </el-form-item>

                <el-dialog
                    width="30%"
                    title="请选择部门"
                    :visible.sync="depyDialog"
                    append-to-body>
                        <el-tree
                            :data="deptList"
                            :props="defaultProps"
                            node-key="deptId"
                            accordion
                            @node-click="clickDept"
                            :expand-on-click-node="false"
                            >
                        </el-tree>
					<div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="depyDialog=false">确定</el-button>
                    </div>
                </el-dialog>

                <el-form-item label="角色" :label-width="'120px'">
                    <el-checkbox-group v-model="addForm.roleIdList">
                        <el-checkbox v-for="item in roleList" :label="item.roleId" :key="item.roleId" >{{item.roleName}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialog = false">取消</el-button>
                <el-button type="primary" @click="addFinish">确定</el-button>
            </div>
        </el-dialog>


        <!--修改-->
        <el-dialog title="修改" :visible.sync="editDialog">
            <el-form :model="editForm">
                <el-form-item label="用户名" :label-width="'120px'">
                    <el-input v-model="editForm.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="'120px'">
                    <el-input v-model="editForm.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="'120px'">
                    <el-input v-model="editForm.mobile" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="部门" :label-width="'120px'">
                    <el-button @click="depyDialog=true">{{chooseDeptData.deptId?chooseDeptData.deptName:'请选择部门'}}</el-button>
                </el-form-item>

                <el-dialog
                    width="30%"
                    title="请选择部门"
                    :visible.sync="depyDialog"
                    append-to-body>
                    <el-tree
                        :data="deptList"
                        :props="defaultProps"
                        node-key="deptId"
                        accordion
                        @node-click="clickDept"
                        :expand-on-click-node="false"
                    >
                    </el-tree>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="depyDialog=false">确定</el-button>
                    </div>
                </el-dialog>

                <el-form-item label="角色" :label-width="'120px'">
                    <el-checkbox-group v-model="editForm.roleIdList">
                        <el-checkbox v-for="item in roleList" :label="item.roleId" :key="item.roleId" >{{item.roleName}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item label="状态" :label-width="'120px'">
                    <el-switch
                        v-model="editForm.status"
                        active-color="#1ab394"
                        inactive-color="#666666"
                        :active-value="1"
                        :inactive-value="0">
                    </el-switch>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="editDialog = false">取消</el-button>
                <el-button type="primary" @click="editFinish">确定</el-button>
            </div>
        </el-dialog>


        <!--修改密码-->
        <el-dialog title="修改密码" :visible.sync="editPwdDialog">
            <el-form :model="editPwdForm">
                <el-form-item label="原密码" :label-width="'120px'">
                    <el-input v-model="editPwdForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" :label-width="'120px'">
                    <el-input v-model="editPwdForm.newPassword" auto-complete="off"></el-input>
                </el-form-item>

            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="editPwdDialog = false">取消</el-button>
                <el-button type="primary" @click="editPwdFinish">确定</el-button>
            </div>
        </el-dialog>

    </div>
</template>


<script>
    import pageination from '../../assets/js/mixins/pagination'
    export default {
        mixins:[pageination],
        data() {
            return {
                input22:'',
                reqUrl:'/dc-admin/sys/user/list',
                addDialog:false,
                editDialog:false,
                depyDialog:false,
                editPwdDialog:false,
                editPwdId:'',
                addForm:{
                    "username": "",
                    "deptId": '',
                    "password": "",
                    "email": "",
                    "mobile": "",
                    "status": '1',
                    "roleIdList": []
                },
                editForm:{
                    'userId':'',
                    "username": "",
                    "deptId": '',
                    "password": "",
                    "email": "",
                    "mobile": "",
                    "status": '1',
                    "roleIdList": []
                },
                editPwdForm:{
                    password:'',
                    newPassword:'',
                },
                chooseDeptData:{
                    deptName: '',
                    deptId: '',
                },
                deptList: [],
                roleList:[],
                defaultProps: {
                    children: 'list',
                    label: 'name'
                },
                checkList:[],
                tableData:[],
            }
        },
        mounted() {
            this.$http.get('/dc-admin/sys/dept/list').then((response) => {
                var res = response.data;
                if (res.code == 0) {
                    this.deptList = [res.dept[0]];
                    console.log(this.deptList)
                }
            })

            this.$http.get('/dc-admin/sys/role/select').then((response) => {
                var res = response.data;
                if (res.code == 0) {
                    this.roleList = res.list;
                }
            })
        },
        methods: {
            // 搜索
            userClasSou(key){
                this.$http.get('/dc-admin/sys/user/list?key='+key+'&page=1&limit=10').then((response) => {
                    var res = response.data;
                    
                    this.tableData = res.page.list
                })
            },
            edit(id){
                this.$http.get('/dc-admin/sys/user/info/'+id).then((response)=>{
                    var res = response.data;
                    if(res.code==0){
                        this.editDialog=true;
                        this.editForm=res.user;
                        this.chooseDeptData={
                            deptName: this.editForm.deptName,
                            deptId: this.editForm.deptId,
                        }
                    }
                })
            },
            remove(id){
                this.$confirm('是否删除该用户', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var req=[id];
                    this.$http.post('/dc-admin/sys/user/delete', req,{type:'payload'}).then((response) => {
                        var res = response.data;
                        if (res.code == 0) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });

                            this.pageDataReq();
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.msg
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            clickDept(data) {
                //新增角色--选择角色-确认
                this.chooseDeptData = {
                    deptName: data.name,
                    deptId: data.deptId,
                }
            },
            append(){
                this.addDialog=true;
            },
            addFinish(){
                this.$set(this.addForm,'deptId',this.chooseDeptData.deptId);
                this.$http.post('/dc-admin/sys/user/save',this.addForm,{type:'payload'}).then((response)=>{
                    var res= response.data;
                    this.addDialog=false;
                    if(res.code==0){
                        this.pageDataReq();
                        this.$message({
                            type: 'success',
                            message: '新增成功'
                        });
                    }else {
                        this.$message({
                            type: 'error',
                            message: res.msg
                        });
                    }
                })
            },
            editFinish(){
                this.$set(this.editForm,'deptId',this.chooseDeptData.deptId);
                this.$http.post('/dc-admin/sys/user/update',this.editForm,{type:'payload'}).then((response)=>{
                    var res= response.data;
                    this.editDialog=false;
                    if(res.code==0){
                        this.pageDataReq();
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        });
                    }else {
                        this.$message({
                            type: 'error',
                            message: res.msg
                        });
                    }
                })
            },
            editpwd(id){
                this.editPwdId=id;
                this.editPwdDialog=true;
            },
            editPwdFinish(){
                var req={
                    userId:this.editPwdId,
                    password:this.editPwdForm.password,
                    newPassword:this.editPwdForm.newPassword,
                }

                this.$http.post('/dc-admin/sys/user/password',req).then((response)=>{
                    var res= response.data;
                    this.editDialog=false;
                    if(res.code==0){
                        this.editPwdDialog=false;
                        this.pageDataReq();
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        });
                    }else {
                        this.$message({
                            type: 'error',
                            message: res.msg
                        });
                    }
                })
            },
            basicsSuppSou(data){
                console.log(this.input21)
            }
        },
        props: {},
        watch: {}
    }
</script>
<style lang="less">
    .user-sys {
        .page-block{
            padding: 30px 24px;
            border-bottom: 1px solid #eff2f6;
        }
        .el-pagination{
            /*float: right;*/
            width: 70%;
            margin: 0 auto;
        }

        .el-form-item__content>div{
            width: 80%;
        }
        .el-form-item__content .el-button{
            width: 80%;
        }
        .input-with-select{
            max-width: 30%;
            margin-left: 10px;
        }
        .el-input-group__append , .el-input__inner{
            height: 30px;
        }

    }
    .page-block{
        text-align: center;
    }



</style>
