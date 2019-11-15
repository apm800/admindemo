<template>
    <div class="role-sys">
        <div style="margin-bottom: 20px" v-show="!flag">
            <el-button size="mini" type="success" @click="append()">增加</el-button>
        </div>

        <el-table v-show="!flag"
                  :data="tableData"
                  style="width: 100%">
            <el-table-column
                label="操作"
                width="180">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="edit(scope.row.roleId)">修改</el-button>
                    <el-button size="mini" type="danger" @click="remove(scope.row.roleId)">删除</el-button>
                </template>
            </el-table-column>
            <el-table-column
                label="角色名称"
                width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.roleName }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="所属部门"
                width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.deptName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="备注">
                <template slot-scope="scope">
                    <span>{{ scope.row.remark }}</span>
                </template>
            </el-table-column>
            <el-table-column label="创建时间">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
                </template>
            </el-table-column>
        </el-table>

        <!--新增-->
        <div v-show="flag=='add'" class="addbox">
            <el-form ref="form" :model="addForm" label-width="80px">
                <el-form-item label="角色名称">
                    <el-input v-model="addForm.roleName"></el-input>
                </el-form-item>
                <el-form-item label="所属部门" class="choosedept">
                    <el-button readonly @click="chooseDept">{{chooseDeptData.deptName ? chooseDeptData.deptName : '请选择部门'}}
                    </el-button>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="addForm.remark"></el-input>
                </el-form-item>


                <el-row style="margin-bottom: 20px">
                    <el-col :span="11" v-if="menu_authority">
                        <strong>菜单权限</strong>
                        <el-tree
                            :check-strictly='lianD'
                            ref="menu"
                            :data="menuList"
                            :props="menuProps"
                            node-key="menuId"
                            show-checkbox
                            default-expand-all                           
                            highlight-current
                        >
                        </el-tree>
                    </el-col>
                    <el-col :span="2"></el-col>
                    <el-col :span="11" v-if="dept_authority">
                        <strong>数据权限</strong>
                        <el-tree
                            :check-strictly='lianD'
                            ref="dept"
                            :data="deptList"
                            :props="deptProps"
                            node-key="deptId"
                            show-checkbox
                            default-expand-all
                            
                            :expand-on-click-node="false"
                        >
                        </el-tree>
                    </el-col>
                    <!--店铺新增权限-->
                    <el-col :span="11" v-if="shop_authority">
                        <strong>店铺权限</strong>
                        <el-tree
                            :check-strictly='lianD'
                            ref="addshop"
                            :data="shopList"
                            :props="shopProps"
                            node-key="id"
                            show-checkbox
                            default-expand-all
                            
                            :expand-on-click-node="false"
                        >
                        </el-tree>
                    </el-col>
                    <el-col :span="2"></el-col>
                    <!--仓库新增权限-->
                    <el-col :span="11" v-if="ware_authority">
                        <strong>仓库权限</strong>
                        <el-tree
                            :check-strictly='lianD'
                            ref="addware"
                            :data="wareList"
                            :props="wareProps"
                            node-key="id"
                            show-checkbox
                            default-expand-all
                            
                            :expand-on-click-node="false"
                        >
                        </el-tree>
                    </el-col>
             
                </el-row>

                <el-form-item>
                    <el-button type="primary" @click="addFinish">立即创建</el-button>
                    <el-button @click="addCancel">取消</el-button>
                </el-form-item>
            </el-form>
        </div>


        <!--修改-->
        <div v-show="flag=='edit'" class="addbox">
            <el-form ref="form" :model="editForm" label-width="80px">
                <el-form-item label="角色名称">
                    <el-input v-model="editForm.roleName"></el-input>
                </el-form-item>
                <el-form-item label="所属部门" class="choosedept">
                    <el-button readonly @click="chooseDept">{{chooseDeptData.deptName ? chooseDeptData.deptName : '请选择部门'}}
                    </el-button>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="editForm.remark"></el-input>
                </el-form-item>


                <el-row  style="margin-bottom: 20px">
                    <el-col :span="11" v-if="menu_authority">
                        <strong>菜单权限</strong>
                        <el-tree
                            :check-strictly='lianD'
                            ref="editmenu"
                            :data="menuList"
                            :props="menuProps"
                            node-key="menuId"
                            show-checkbox
                            default-expand-all                           
                            :expand-on-click-node="false"
                        >
                        </el-tree>
                    </el-col>
                    <el-col :span="2"></el-col>
                    <el-col :span="11" v-if="dept_authority">
                        <strong>数据权限</strong>
                        <el-tree
                            :check-strictly='lianD'
                            ref="editdept"
                            :data="deptList"
                            :props="deptProps"
                            node-key="deptId"
                            show-checkbox
                            default-expand-all
                            
                            :expand-on-click-node="false"
                        >
                        </el-tree>
                    </el-col>
                    <!--店铺修改权限-->
                    <el-col :span="11" v-if="shop_authority">
                        <strong>店铺权限</strong>
                        <el-tree
                            :check-strictly='lianD'
                            ref="editstore"
                            :data="shopList"
                            :props="shopProps"
                            node-key="id"
                            show-checkbox
                            default-expand-all
                            
                            :expand-on-click-node="false"
                        >
                        </el-tree>
                    </el-col>
                    <el-col :span="2"></el-col>
                    <!--仓库修改权限-->
                    <el-col v-if="ware_authority" :span="11">
                        <strong>仓库权限</strong>
                        <el-tree
                            :check-strictly='lianD'
                            ref="editware"
                            :data="wareList"
                            :props="wareProps"
                            node-key="id"
                            show-checkbox
                            default-expand-all
                            
                            :expand-on-click-node="false"
                        >
                        </el-tree>
                    </el-col>                 
                </el-row>

                <el-form-item>
                    <el-button type="primary" @click="editFinish">确认修改</el-button>
                    <el-button @click="editCancel">取消</el-button>
                </el-form-item>
            </el-form>
        </div>


        <el-dialog
            title="请选择部门"
            :visible.sync="deptset"
            width="30%">
            <strong>已选中的部门为：{{chooseDeptData.deptName}}</strong>
            <el-tree
                :data="deptList"
                :props="deptProps"
                node-key="deptId"
                default-expand-all
                @node-click="clickDept"

                :expand-on-click-node="false"
            >
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deptset = false;chooseDeptData={}">取 消</el-button>
                <el-button type="primary" @click="deptset = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                
                tableData: [],
                menuList: [],
                deptList: [],  //部门
                shopList:[],   //仓库权限数据列表
                wareList:[],   //仓库权限数据列表
                lianD:true,// 是否联动
                deptset: false,
                flag: '',//add-新s增  edit-编辑   ''-列表状态
                menu_authority:false,
                dept_authority:false,
                shop_authority:false,
                ware_authority:false, // menu_authority,dept_authority,shop_authority,ware_authority
                addForm: {
                    deptName: '',
                    deptId: '',
                    remark: '',
                    deptIdList: [],     //数据权限选中的id列表
                    menuIdList: [],     //菜单选中的id列表
                    shopIdList:[],      //店铺选中的id列表
                    warehouseIdList:[], //仓库选中的id列表
                    show_authority:'',
                    roleName: '',
                },//新增form
                editForm: {
                    deptName: '',
                    deptId: '',
                    remark: '',
                    deptIdList: [],
                    menuIdList: [],
                    shopIdList:[],  //店铺选中的id列表
                    warehouseIdList:[],  //仓库选中的id列表
                    show_authority:'',
                    roleName: '',
                },//编辑form
                menuProps: {
                    children: 'list',
                    label: 'name'
                },
                deptProps: {
                    children: 'list',
                    label: 'name'
                },
                //店铺权限数据
                //页面展示仅仅展示name
                shopProps: {
                    children: '',
                    label: 'name'
                },
                //仓库
                wareProps: {
                    label: 'name',
                    children:''
                },  
                //默认选中的数据              
                chooseDeptData: {
                    deptName: '',
                    deptId: '',
                },//选择部门数据


            }
        },
        mounted() {
            this.init();
            this.menuInit();
            this.deptInit();
            this.storeInit();
            this.wareInit();

        },
        methods: {
            //获取角色列表
            init() {
                this.$http.get('/dc-admin/sys/role/select').then((response) => {
                    var res = response.data;
                    console.log('qw',res)
                    if (res.code == 0) {
                        this.tableData = res.list;
                    }
                })
            },
            //获取菜单权限数据
            menuInit() {
                this.$http.get('/dc-admin/sys/menu/list').then((response) => {
                    var res = response.data;
                    if (res.code == 0) {
                        this.menuList = res.menuList;
                    }
                    if (res.menuList !== []){
                        this.menu_authority = true; //如果数据为空 没有权限，数据不为空，有权限
                    }
                });
            },
            
            //获取部门角色数据
            deptInit() {
                this.$http.get('/dc-admin/sys/dept/list').then((response) => {
                    var res = response.data;
                    console.log(res)
                    if (res.code == 0) {
                        this.deptList = res.dept;
                    	console.log(this.deptList)
                    }
                    if (this.deptList.length !== 0 ){
                        this.dept_authority = true; //如果数据为空 没有权限，数据不为空，有权限
                    }
                }).catch((error) => {

                });
            },
            //获取店铺数据
            storeInit() {
                this.$http.get('/dc-admin/admin/shop/all').then((response) => {
                    var res = response.data;
                    // console.log('店铺权限数据',res)
                    if (res.code == 0) {
                        this.shopList = res.shopList; // 对列表进行赋值
                    }
                    // 
                    if (this.shopList.length !== 0 ){
                        this.shop_authority = true; //如果数据为空 没有权限，数据不为空，有权限
                    }                    
                }).catch((error) => {
                });
            },
            //获取仓库数据
            wareInit() {
                this.$http.get('/dc-admin/admin/warehouse/all').then((response) => {
                    var res = response.data;
                    // console.log('店铺权限数据',res)
                    if (res.code == 0) {
                        this.wareList = res.wareHouseList; // 对列表进行赋值
                        // this.data2 = res.wareHouseList;
                    }
                    // console.log('仓库数据长度',this.wareList.length)
                     if (this.wareList.length !== 0 ){
                        this.ware_authority = true; //如果数据为空 没有权限，数据不为空，有权限
                    }
                }).catch((error) => {

                });
            },
            chooseDept() {
                //新增角色--选择角色
                this.deptset = true;
            },
            clickDept(data) {
                //新增角色--选择角色-确认
                this.chooseDeptData = {
                    deptName: data.name,
                    deptId: data.deptId,
                }
            },
            append() {
                //点击新增角色
                this.flag = 'add';
            },
            addFinish() {
            	console.log(this.$refs['menu'])
            	
                //新增角色完成
                this.$set(this.addForm,'deptName',this.chooseDeptData.deptName);
                this.$set(this.addForm,'deptId',this.chooseDeptData.deptId);

                this.$set(this.addForm,'deptIdList',this.$refs['dept'].getCheckedKeys());
                this.$set(this.addForm,'menuIdList',this.$refs['menu'].getCheckedKeys());
                this.$set(this.addForm,'shopIdList',this.$refs['addshop'].getCheckedKeys());
                this.$set(this.addForm,'warehouseIdList',this.$refs['addware'].getCheckedKeys());



                this.$http.post('/dc-admin/sys/role/save',this.addForm,{type:'payload'}).then((response)=>{
                    var res= response.data;
                    if(res.code==0){
                        this.flag='';
                        this.$message({
                            type: 'success',
                            message: '新增成功'
                        });
                        this.init();
                    }else {
                        this.$message({
                            type: 'error',
                            message: res.msg
                        });
                    }
                })

            },
            addCancel() {
                //新增返回
                this.addForm = {
                    deptName: '',
                    deptId: '',
                    remark: '',
                    deptIdList: [],
                    menuIdList: [],
                    shopIdList:[],      //店铺选中的id列表
                    warehouseIdList:[], //仓库选中的id列表
                    roleName: '',
                }
                this.$refs['menu'].setCheckedKeys([]);
                this.$refs['dept'].setCheckedKeys([]);
                this.$refs['addshop'].setCheckedKeys([]);//增加店铺默认选中清空
                this.$refs['addware'].setCheckedKeys([]);//增加仓库默认选中清空

                this.flag = '';
            },
            //获取默认选中的节点数据
            edit(id) {
                this.flag='edit';
                //获取全部的选中的去节点数据
                this.$http.get('/dc-admin/sys/role/info/'+id).then((response)=>{
                    var res = response.data;
                    if(res.code==0){
                        this.editForm=res.role; //权限数据 menuIdList deptIdList shopIdList warehouseIdList
                        this.chooseDeptData={
                            deptName:this.editForm.deptName,
                            deptId:this.editForm.deptId
                        }

                        // console.log('菜单数据',this.editForm.menuIdList)
                        // console.log('全部的数据',this.editForm)
                        // console.log('店铺数据1111',this.editForm.shopIdList)
                        // console.log('数据权限',this.editForm.deptIdList)
                        
                        this.$refs['editmenu'].setCheckedKeys(this.editForm.menuIdList);
                        this.$refs['editdept'].setCheckedKeys(this.editForm.deptIdList);
                        //通过key获取节点 例子this.$refs.tree.setCheckedKeys([3]);  其中的tree是 :ref绑定的名字
                        /*
                        实例：
                           this.$refs['editstore'].setCheckedKeys([1,2]);// 获取店铺选中的节点 对应的是数据中的node-key
                        */                     
                        this.$refs['editstore'].setCheckedKeys(this.editForm.shopIdList);//店铺设置默认选中的=的数据
                        this.$refs['editware'].setCheckedKeys(this.editForm.warehouseIdList);//仓库设置默认选中的=的数据
                   }   
                })
            },
            editFinish() {
                //新增角色完成
                this.$set(this.editForm,'deptName',this.chooseDeptData.deptName);
                this.$set(this.editForm,'deptId',this.chooseDeptData.deptId);
                this.$set(this.editForm,'deptIdList',this.$refs['editdept'].getCheckedKeys());//设置修改后的数据权限id list
                this.$set(this.editForm,'menuIdList',this.$refs['editmenu'].getCheckedKeys());//设置修改后的菜单权限id list
                this.$set(this.editForm,'shopIdList',this.$refs['editstore'].getCheckedKeys());//设置修改后的店铺权限id list
                this.$set(this.editForm,'warehouseIdList',this.$refs['editware'].getCheckedKeys());//设置修改后的仓库权限id list

                console.log('获取ware 选中的id  list',this.editForm,'warehouseIdList',this.$refs['editware'].getCheckedKeys())
                this.$delete(this.editForm,'createTime');

                this.$http.post('/dc-admin/sys/role/update',this.editForm,{type:'payload'}).then((response)=>{
                    var res= response.data;
                    if(res.code==0){
                        this.flag='';
                        this.$message({
                            type: 'success',
                            message: '更新成功'
                        });
                        this.init();
                    }else {
                        this.$message({
                            type: 'error',
                            message: res.msg
                        });
                    }
                })

            },
            editCancel() {
                //编辑返回
                this.editForm = {
                    deptName: '',
                    deptId: '',
                    remark: '',
                    deptIdList: [],
                    menuIdList: [],
                    shopIdList:[],      //店铺选中的id列表
                    warehouseIdList:[], //仓库选中的id列表
                    roleName: '',
                    roleId:0
                }
                this.$refs['editmenu'].setCheckedKeys([]);
                this.$refs['editdept'].setCheckedKeys([]);
                this.$refs['editstore'].setCheckedKeys([]);
                this.$refs['editware'].setCheckedKeys([]);
                this.flag = '';
            },
            remove(id) {
                this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {


                    var req = [id];
                    this.$http.post('/dc-admin/sys/role/delete',req,{type:'payload'}).then((response)=>{
                        var res = response.data;
                        if (res.code == 0) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });

                            this.init();
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
        },
        props: {},
        watch: {}
    }
</script>
<style lang="less">
    .role-sys {
        .addbox {
            width: 100%;
            background: white;
            padding: 20px;

            .el-form {
                width: 100%;
            }
            .el-col{
                width:25%
            }

            .choosedept {
                .el-button {
                    width: 100%;
                }
            }
        }

    }


</style>
