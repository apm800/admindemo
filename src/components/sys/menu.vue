<template>
    <div style="min-width: 865px" class="menu-set">
        <div style="margin-bottom: 20px">
            <el-button size="mini" type="success" @click="append()" v-checkup="':sys:menu:add'">增加</el-button>
        </div>
        <div class="tree-tr tree-title">
            <div>
                <span style="padding-left: 20px;padding-right: 20px">菜单</span>
                <!-- <el-button size="mini" type="success" round @click="append(null)" v-checkup="':sys:menu:add'">增加
                </el-button> -->
            </div>
            <div>
                <span class='tree-big-td'>操作
                </span><span class="tree-td">类型
                </span><span class="tree-td">图标
            </span><span class="tree-td">顺序
            </span><span class="tree-td">路径
            </span><span class="tree-big-td">授权标识</span>
            </div>
        </div>
        <el-tree
            :data="dataList"
            :props="defaultProps"
            node-key="menuId"
            draggable
            :allow-drop="allowDrop"
            accordion
            :expand-on-click-node="false"
            :render-content="renderContent"
            :default-expanded-keys="expanded"
        >
        </el-tree>


        <!--修改弹框-->
        <el-dialog title="修改菜单" :visible.sync="editDialog">
            <el-form :model="form">
                <el-form-item label="菜单名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="路径" :label-width="formLabelWidth" v-if="form.type==1">
                    <el-input v-model="form.url" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="授权标识" :label-width="formLabelWidth">
                    <el-input v-model="form.perms" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="API类型" :label-width="formLabelWidth"  v-if="form.type==2">
                    <el-radio-group v-model="radio2" @change='kaG'>
                        <el-radio :label="0">本地</el-radio>
                        <el-radio :label="1">远程</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="服务器" :label-width="formLabelWidth"  v-if="(form.type==2)&&radio2">
                    <el-select  @change="portName" v-model="sorT.gateServiceId" placeholder="查询服务器名称">
                        <el-option
                        v-for="item in options1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="API名称" :label-width="formLabelWidth"  v-if="(form.type==2)&&radio2">
                    <el-autocomplete
                        class="inline-input"
                        :disabled=!Boolean(sorT.gateServiceId)
                        popper-class="my-autocomplete"
                        v-model="value21.interfaceName"
                        :fetch-suggestions="querySearch"
                        placeholder="请选择API名称"
                        @select="handleSelect21">
                        <template slot-scope="{ item }">
                            <div class="name">{{ item.interfaceName }}</div>
                        </template>
                    </el-autocomplete>
                </el-form-item>

                <el-form-item label="顺序" :label-width="formLabelWidth" v-if="addform.type!=2">
                    <el-input v-model="form.orderNum" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="图标" :label-width="formLabelWidth" v-if="addform.type!=2">
                    <icon v-model="form.icon"></icon>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editDialog = false">取 消</el-button>
                <el-button type="primary" @click="editFinsh()">确 定</el-button>
            </div>
        </el-dialog>

        <!--新增弹框-->
        <el-dialog title="新增菜单" :visible.sync="addDialog">
            <el-form :model="addform">
                <el-form-item :label="addform.type==0?'目录名称':addform.type==1?'菜单名称':'按钮名称'"
                              :label-width="formLabelWidth">
                    <el-input v-model="addform.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="菜单类型" :label-width="formLabelWidth">
                    <el-radio-group v-model="addform.type">
                        <el-radio-button label="0">目录</el-radio-button>
                        <el-radio-button label="1">菜单</el-radio-button>
                        <el-radio-button label="2">按钮</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="路径" :label-width="formLabelWidth" v-if="addform.type==1">
                    <el-input v-model="addform.url" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="授权标识" :label-width="formLabelWidth">
                    <el-input v-model="addform.perms" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="顺序" :label-width="formLabelWidth" v-if="addform.type!=2">
                    <el-input v-model="addform.orderNum" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="图标" :label-width="formLabelWidth" v-if="addform.type!=2">
                    <icon v-model="addform.icon"></icon>
                </el-form-item>
                <el-form-item label="API类型" :label-width="formLabelWidth"  v-if="addform.type==2">
                    <el-radio-group v-model="radio2" @change='kaG'>
                        <el-radio :label="0">本地</el-radio>
                        <el-radio :label="1">远程</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="服务器" :label-width="formLabelWidth"  v-if="(addform.type==2)&&radio2">
                    <el-select  @change="portName" v-model="sorT.gateServiceId" placeholder="查询服务器名称">
                        <el-option
                        v-for="item in options1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="API名称" :label-width="formLabelWidth"  v-if="(addform.type==2)&&radio2">
                    <el-autocomplete
                        class="inline-input"
                        :disabled=!Boolean(sorT.gateServiceId)
                        popper-class="my-autocomplete"
                        v-model="value21.interfaceName"
                        :fetch-suggestions="querySearch"
                        placeholder="请选择API名称"
                        @select="handleSelect21">
                        <template slot-scope="{ item }">
                            <div class="name">{{ item.interfaceName }}</div>
                        </template>
                    </el-autocomplete>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialog = false">取 消</el-button>
                <el-button type="primary" @click="addFinsh()">确 定</el-button>
            </div>
        </el-dialog>


    </div>
</template>


<script type="text/jsx">
    import icon from './icon'
import iframeVue from './iframe.vue';

    let id = 1000;
    let editData = {};
    let addData = {};

    export default {
        data() {
            return {
                radio2:'1',//远程本地
                expanded:[],
                dataList: [],
                defaultProps: {
                    children: 'list',
                    label: 'name'
                },
                editDialog: false,
                addDialog: false,
                form: {
                    name: '',
                    icon: '',
                    orderNum: '',
                    url: '',
                    perms: '',
                },
                addform: {
                    name: '',
                    icon: 'el-icon-tickets',
                    orderNum: '',
                    url: '',
                    perms: '',
                    type: 0,
                    menuId: (new Date()).getTime()
                },
                formLabelWidth: '80px',
                // 按钮服务器
                sorT:{
                    gateServiceId:'',
                    // order:null,
                },
                options1: [{
                    value: '选项1',
                    label: '店铺1'
                }],
                value21:{

                },
                value22:'',
                // 接口集合
                portNames:[],
            }
        },
        mounted() {
            this.init();
        },
        components: {
            icon
        },
        methods: {
            // 节点能否被放置
            allowDrop(draggingNode, dropNode, type){
                // console.log(draggingNode)
                // console.log(dropNode)
                // console.log(type)
                return 0;
            },
            init() {
                this.$http.get('/dc-admin/sys/menu/list').then((response) => {
                    var res = response.data;
                    console.log(response.data)
                    console.log(res.code)
                    if (res.code == 0) {
                        this.dataList = res.menuList;
                    }
                });
            },
            editFinsh() {
                if(this.radio2==1&& (this.sorT.gateServiceId==''||this.value21.interfaceName=='')){
                        this.$message({
                            type: 'error',
                            message: '请将API信息填写完整'
                        });
                }
                // else if(this.value21.interfaceName!=this.value22.interfaceName){
                //         this.$message({
                //             type: 'error',
                //             message: '请选择已有API'
                //         });
                // }
                else{
                    if(this.radio2==0){
                         this.sorT.gateServiceId='';
                         this.value21.interfaceName='';
                    }
                        this.editDialog = false;
                        editData = {};
                        editData.name = this.form.name;
                        editData.icon = this.form.icon;
                        editData.orderNum = this.form.orderNum;
                        editData.url = this.form.url;
                        editData.perms = this.form.perms;
                        editData.menuId = this.form.menuId;
                        editData.parentId = this.form.parentId;
                        editData.type = this.form.type;
                        editData.apiType = this.radio2;//apiType （api 类型 0 本地；1 远程）
                        editData.gateServiceId = this.sorT.gateServiceId;//服务器id
                        editData.interfaceName = this.value21.interfaceName;//api名称
                        this.expanded=[editData.menuId];
                        console.log('aaa',editData)
                        this.$http.post('/dc-admin/sys/menu/update', editData, {type: 'payload'}).then((response) => {
                            var res = response.data;
                            if (res.code == 0) {
                                this.$message({
                                    type: 'success',
                                    message: '修改成功'
                                });
                                this.init();

                            }else {
                                this.$message({
                                    type: 'error',
                                    message: res.msg
                                });
                            }
                        }).catch((error) => {

                        });
                }
            },
            // 修改
            edit(node, data) {
                this.editDialog = true;
                editData = data;
                this.form = JSON.parse(JSON.stringify(data));
                this.radio2 = this.form.apiType
                this.sorT.gateServiceId = this.form.gateServiceId
                this.value21.interfaceName = this.form.interfaceName
                console.log(this.form)
                // 服务器列表
                this.axios.get('/dc-admin/gateservices/map', {type: 'payload'}
                  ).then(res =>{
                    this.map = res.data.data
                    // 下拉框数据
                    this.options1 = [{
                      label:'',
                      value:'',
                    }];
                    for(var i in this.map){
                        var obj = {};
                        obj.label = this.map[i];
                        obj.value = i;
                        this.options1.push(obj)
                    }
                });
            },
            // 请求接口的名称portName
            portName(a){
                this.value21 = this.value22 = {};
                console.log(a)
                this.axios.get('/dc-admin/gateinsterface/list?page=1&limit=1000&gateServiceId='+a, {type: 'payload'}
                  ).then(res =>{
                   this.portNames = res.data.page.list
                });
            },      
            // 返回提示接口名称
            querySearch(queryString, cb) {
                var restaurants = this.portNames;
                var results = queryString ? this.portNames.filter(this.createFilter(queryString)) : this.portNames;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            // 选择之后
            handleSelect21(item) {
                this.value21 = item;
                this.value22 = item.interfaceName;
                console.log(item);
            },
            handleSelect(item) {
                console.log('121322',item);
            },
            // 远程本地开关
            kaG(a){
                console.log(a)
            },
            
            addFinsh() {
                if (this.addform.type == 2) {
                    this.addform.icon = ''
                }
                        this.addform.apiType = this.radio2;//apiType （api 类型 0 本地；1 远程）
                        this.addform.gateServiceId = this.sorT.gateServiceId;//服务器id
                        this.addform.interfaceName = this.value21.interfaceName;//api名称
                if(this.addform.apiType=='' && this.addform.type=='2'){
                        this.$message({
                            type: 'error',
                            message: '请选择API类型'
                        });
                }
                

                this.expanded=[this.addform.parentId];
                this.$http.post('/dc-admin/sys/menu/save', this.addform, {type: 'payload'}).then((response) => {
                    var res = response.data;
                    if (res.code == 0) {
                        this.$message({
                            type: 'success',
                            message: '新增成功'
                        });
                        this.addDialog = false;
                        this.init();
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.msg
                        });
                    }
                })


            },
            append(data) {
                this.radio2 = 0
                this.sorT.gateServiceId = ''
                this.value21.interfaceName = ''
                this.addDialog = true;
                addData = data;
                this.addform = {
                    name: '',
                    icon: 'el-icon-tickets',
                    orderNum: '',
                    url: '',
                    perms: '',
                    type: 0,
                    menuId: 0,
                    parentId:data?data.menuId:0
                }
                // 服务器列表
                this.axios.get('/dc-admin/gateservices/map', {type: 'payload'}
                  ).then(res =>{
                    this.map = res.data.data
                    // 下拉框数据
                    this.options1 = [{
                      label:'',
                      value:'',
                    }];
                    for(var i in this.map){
                        var obj = {};
                        obj.label = this.map[i];
                        obj.value = i;
                        this.options1.push(obj)
                    }
                });
            },
            remove(node, data) {

                this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const parent = node.parent;
                    const children = parent.data.list || parent.data;
                    const index = children.findIndex(d => d.menuId === data.menuId);

                    var req = {
                        menuId: children[index]['menuId']
                    }

                    this.expanded=[parent.data.menuId];
                    this.$http.post('/dc-admin/sys/menu/delete', req).then((response) => {
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
            renderContent(h, {node, data, store}) {
                return (
                    <div class='tree-tr'>
                        <div>
                            <span>{data.name}</span>
                        </div>
                        <div>
                        <span class='tree-big-td'>
                            <el-button size="mini" type="danger" round
                                       on-click={() => this.remove(node, data)}>删除</el-button>
                            <el-button size="mini" type="primary" round
                                       on-click={() => this.edit(node, data)}>修改</el-button>
                            {data.type != 2 ?
                                <el-button size="mini" type="success" round on-click={() => this.append(data)}>
                                    增加</el-button> : ''}
                        </span>
                            <span class='tree-td'>{data.type == 0 ?
                                <el-tag type="success">目录</el-tag> : data.type == 1 ?
                                    <el-tag type="warning">菜单</el-tag> : <el-tag type="info">按钮</el-tag>}</span>
                            <span class='tree-td'><span class={data.icon}></span></span>
                            <span class='tree-td'>{data.orderNum}</span>
                            <span class='tree-td'>{data.url}</span>
                            <span class='tree-big-td'>{data.perms}</span>
                        </div>
                    </div>);
            },
        }
    };
</script>
<style lang="less">
    .menu-set{
        .el-dialog {
            .el-input, .el-select {
                width: 300px;
            }
        }

        .el-tree-node__content {
            height: 37px;
        }

        .el-tree-node {
            border: 1px solid #ddd;

            .el-tree-node {
                border-bottom: none;
                border-left: none;
                border-right: none;
            }

        }

        .tree-td {
            width: 80px;
            display: inline-block;
            border-left: 1px solid #ddd;
            padding-right: 8px;
            padding-left: 8px;
            height: 37px;
            line-height: 37px;
            vertical-align: middle;
            text-align: center;
            box-sizing: border-box;
            overflow: hidden;
        }

        .tree-big-td {
            .tree-td;
            width: 200px;
            text-align: left;
            padding-left: 5px;
        }

        .tree-tr {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            padding-right: 8px;
            height: 41px;
        }

        .tree-title {
            border: 1px solid #ddd;
            border-bottom: 0;
            background: #fff;
            span {
                font-weight: 900;
            }
        }
    }

</style>
