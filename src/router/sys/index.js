const index = () => import('../../components/index')
const menu = () => import('../../components/sys/menu')
const dept = () => import('../../components/sys/dept')
const role = () => import('../../components/sys/role')
const user = () => import('../../components/sys/user')
const test = () => import('../../components/sys/test')
const iframe = () => import('../../components/sys/iframe')
const usercenter = () => import('../../components/sys/usercenter')

// 基础信息    路由部分
const basicsStor = () => import('../../components/sys/basics/store')//店铺
const basicsWare = () => import('../../components/sys/basics/warehouse')//仓库
const basicsBran = () => import('../../components/sys/basics/brand')//品牌
const basicsClas = () => import('../../components/sys/basics/classify')//产品分类
const basicsProd = () => import('../../components/sys/basics/product')//单品
const basicsSuit = () => import('../../components/sys/basics/suit')//套装  
const basicsSupp = () => import('../../components/sys/basics/supplier')//供应商
const basicsExpr = () => import('../../components/sys/basics/expressage')//快递维护
// 供应链管理    路由部分
const supplySub = () => import('../../components/sys/supply/Sub')//店铺
const supplyTally = () => import('../../components/sys/supply/Tally')//仓库
// 财务管理    路由部分
const financeCollect = () => import('../../components/sys/finance/Collect')//订单核销
const financeOrder = () => import('../../components/sys/finance/Order')//发货订单汇总
const financeWaste = () => import('../../components/sys/finance/Waste')//支付宝流水
const financeReport = () => import('../../components/sys/finance/Report')//支付宝流水
const ProjectDetail = () => import('../../components/sys/finance/PDetail')//项目明细
const Beginning = () => import('../../components/sys/finance/Beginning')//
// 人力分摊    路由部分
const cycle = () => import('../../components/sys/apportion/cycle')//结算周期定义维护
const project = () => import('../../components/sys/apportion/project')//项目信息维护
const staffInfo = () => import('../../components/sys/apportion/staffInfo')//员工信息维护
const salary = () => import('../../components/sys/apportion/salary')//薪资导入
const scale = () => import('../../components/sys/apportion/scale')//分摊比例维护
const reportForms = () => import('../../components/sys/apportion/reportForms')//查看报表
const office = () => import('../../components/sys/apportion/office')//办公室信息维护
const RLdownload = () => import('../../components/sys/apportion/RLdownload')//导出人力分摊最终数据
// const RLdept = () => import('../../components/sys/apportion/RLdept')//员工部门维护
//人力分摊 导入历史查看
const rlHistory = () => import('../../components/sys/apportion/history')
// 网关管理    路由部分
const webmasterServer = () => import('../../components/sys/webmaster/Server')//服务器信息管理
const webmasterPort = () => import('../../components/sys/webmaster/Port')//接口信息列表
// 数据采集    路由部分
const EDBdataget = () => import('../../components/sys/datagather/EDBdataget')//易店宝订单数据抓取
const EDBdatagetList = () => import('../../components/sys/datagather/EDBdatagetList')//易店宝订单数据抓取历史详情
// 数据源维护   路由部分
const compList = () => import('../../components/sys/datamaintain/list')//数据源列表
const compHistory = () => import('../../components/sys/datamaintain/history')//所有子页面的导入历史查看

const compListZenter = () => import('../../components/sys/datamaintain/list/Zenter')//自仓入库单导入
const compListZcome = () => import('../../components/sys/datamaintain/list/Zcome')//自仓出库单导入
const compListCcome = () => import('../../components/sys/datamaintain/list/Ccome')//菜鸟出入库导入
const compListCenter = () => import('../../components/sys/datamaintain/list/Center')//菜鸟订单出库导入
const compListPurchase = () => import('../../components/sys/datamaintain/list/Purchase')//采购订单导入
const compListafterasle = () => import('../../components/sys/datamaintain/list/afterasle')//线下售后单导入

// 数据展示   路由部分
const compCome = () => import('../../components/sys/datadisplay/come')//出库单数据源展示
const compEnter = () => import('../../components/sys/datadisplay/enter')//入库单数据源展示
const CaiNiaoOrder = () => import('../../components/sys/datadisplay/CaiNiaoOrder')//出库单数据源展示
const deliveryOrder = () => import('../../components/sys/datadisplay/deliveryOrder')//入库单数据源展示
const purchaseOrder = () => import('../../components/sys/datadisplay/purchaseOrder')//采购订单数据源展示
const CaiNiaoFrom = () => import('../../components/sys/datadisplay/CaiNiaoFrom')//采购订单数据源展示
const CarryOver = () => import('../../components/sys/datadisplay/CarryOver')//结转订单数据源展示
const aftersaleshow = () => import('../../components/sys/datadisplay/aftersaleshow')//线下售后数据源展示
// 数据展示 人力分摊 路由部分
const rlData = () => import('../../components/sys/datadisplay/rlData')//采购订单数据源展示

// 收发存   路由部分
const sendCreate = () => import('../../components/sys/sendingSave/create')//收发存汇总表
const sendList = () => import('../../components/sys/sendingSave/list')//收发存列表
const sendColl = () => import('../../components/sys/sendingSave/collect')//收发存汇总表
// 数据提交   路由部分
const dataWaitsub = () => import('../../components/sys/datasub/waitsub')//待提交表单
// 外部数据采集   路由部分
const exeMana = () => import('../../components/sys/externalData/management')//采集任务管理
const exeManaUser = () => import('../../components/sys/externalData/management_user')//采集任务管理用户版
const exeTole = () => import('../../components/sys/externalData/tolead')//导入目标数据
const exeDownload = () => import('../../components/sys/externalData/download')//数据汇总下载
const exeDownloads = () => import('../../components/sys/externalData/downloads')//数据汇总下载2
// 外部数据展示   路由部分
const waidataColler = () => import('../../components/sys/waibudatashow/coller')//月度销售数据
const waidataRibao = () => import('../../components/sys/waibudatashow/ribao')//销售日报
const waidataJiaoyi = () => import('../../components/sys/waibudatashow/jiaoyigoucheng')//销售交易构成
const PCts = () => import('../../components/sys/waibudatashow/PC_TrafficSources')//PC流量来源
const MBts = () => import('../../components/sys/waibudatashow/MB_TrafficSources')//MB流量来源
const goodsEF = () => import('../../components/sys/waibudatashow/goodsEF')//爆款商品效果
const SKUEF = () => import('../../components/sys/waibudatashow/SKUEF')//SKU商品效果
const DSRsale = () => import('../../components/sys/waibudatashow/DSRsale')//DSR和售后指标
const waidataTarget = () => import('../../components/sys/waibudatashow/Target')//SKU流量无线端
const waidataTargetPC = () => import('../../components/sys/waibudatashow/TargetPC')//SKU流量无线端
const LineTrain = () => import('../../components/sys/waibudatashow/linetrain')//直通车推广数据
const DSR = () => import('../../components/sys/waibudatashow/DSR')//DSR
// ORALB定制
const waidataContend = () => import('../../components/sys/waibudatashow/contend')//竞品，
const Contendsales = () => import('../../components/sys/waibudatashow/contendSales')//竞品销量，
const waiwatch = () => import('../../components/sys/waibudatashow/watch')//数据看板，


const waic1 = () => import('../../components/sys/waibudatashow/c1')//数据看板，
const waic2 = () => import('../../components/sys/waibudatashow/c2')//数据看板，
const waic3 = () => import('../../components/sys/waibudatashow/c3')//数据看板，
const waic4 = () => import('../../components/sys/waibudatashow/c4')//数据看板，
const waic5 = () => import('../../components/sys/waibudatashow/c5')//数据看板，
const waic6 = () => import('../../components/sys/waibudatashow/c6')//数据看板，
const waic7 = () => import('../../components/sys/waibudatashow/c7')//数据看板，
const waic8 = () => import('../../components/sys/waibudatashow/c8')//数据看板，

//帮宝适
const pamcontent = () => import('../../components/sys/pampers/pamcontent')//内容，
const videocontent = () => import('../../components/sys/pampers/videocontent')//短视频内容，


//直通车
const throughtrain = () => import('../../components/sys/throughtrain/throughtrain')//竞品直通车监控，
const throughactivity = () => import('../../components/sys/throughtrain/throughactivity')//竞品活动监控，

export default [
    {
        path: '/',
        redirect: '/index',
        meta: {keepAlive: true,perm: '*'},
        // meta: {
        //   keepAlive: true // 需要被缓存
        // }
    },
    {
        path: '/index',
        name: 'index',
        component: index,
        meta: {keepAlive: true,perm: '*'}
    },
    {
        path: '/menu',
        name: 'menu',
        component: menu,
        meta: {keepAlive: true,perm: 'sys:menu'}
    },
    {
        path: '/dept',
        name: 'dept',
        component: dept,
        meta: {keepAlive: true,perm: 'sys:dept'}
    },
    {
        path: '/role',
        name: 'role',
        component: role,
        meta: {keepAlive: true,perm: 'sys:role'}
    },
    {
        path: '/user',
        name: 'user',
        component: user,
        meta: {keepAlive: true,perm: 'sys:user'}
    },
    {
        path: '/test',
        name: 'test',
        component: test,
        meta: {keepAlive: true,perm: '*'}
    },
    // {
    //     path: '/iframe/*',
    //     name: 'iframe',
    //     component: iframe,
    //     meta: {keepAlive: true,perm: '*'}
    // },
    {
        path: '/iframe/:url*',
        name: 'iframe',
        component: iframe,
        meta: {keepAlive: true,perm: '*'},
        // redirect: '/iframe',
    },
    {
        path: '/usercenter',
        name: 'usercenter',
        component: usercenter,
        meta: {keepAlive: true,perm: '*'}
    },
    // 基础信息管理路由
    
    {
        path: '/basicsStor',
        name: 'basicsStor',
        component: basicsStor,
        meta: {keepAlive: true,perm: '*'}
    },{
        path: '/basicsWare',
        name: 'basicsWare',
        component: basicsWare,
        meta: {keepAlive: true,perm: '*'}
    },{
        path: '/basicsBran',
        name: 'basicsBran',
        component: basicsBran,
        meta: {keepAlive: true,perm: '*'}
    },{
        path: '/basicsClas',
        name: 'basicsClas',
        component: basicsClas,
        meta: {keepAlive: true,perm: '*'}
    },{
        path: '/basicsProd',
        name: 'basicsProd',
        component: basicsProd,
        meta: {keepAlive: true,perm: '*'}
    },{
        path: '/basicsSuit',
        name: 'basicsSuit',
        component: basicsSuit,
        meta: {keepAlive: true,perm: '*'}
    },{
        path: '/basicsSupp',
        name: 'basicsSupp',
        component: basicsSupp,
        meta: {keepAlive: true,perm: '*'}
    },{
        path: '/basicsExpr',
        name: 'basicsExpr',
        component: basicsExpr,
        meta: {keepAlive: true,perm: '*'}
    },
    //供应链管理路由
    
    {
        path: '/supplySub',
        name: 'supplySub',
        component: supplySub,
        meta: {keepAlive: true,perm: '*'}
    },{
        path: '/supplyTally',
        name: 'supplyTally',
        component: supplyTally,
        meta: {keepAlive: true,perm: '*'}
    },
// 财务管理    路由部分
    
    {
        path: '/financeCollect',
        name: 'financeCollect',
        component: financeCollect,
        meta: {keepAlive: true,perm: '*'}
    },{
        path: '/financeOrder',
        name: 'financeOrder',
        component: financeOrder,
        meta: {keepAlive: true,perm: '*'}
    },{
        path: '/financeWaste',
        name: 'financeWaste',
        component: financeWaste,
        meta: {keepAlive: true,perm: '*'}
    },{
        path: '/financeReport',
        name: 'financeReport',
        component: financeReport,
        meta: {keepAlive: true,perm: '*'}
    },{
        path: '/ProjectDetail',
        name: 'ProjectDetail',
        component: ProjectDetail,
        meta: {keepAlive: true,perm: '*'}
    },{
        path: '/Beginning',
        name: 'Beginning',
        component: Beginning,
        meta: {keepAlive: true,perm: '*'}
    },
// 人力分摊    路由部分   
    {
        path: '/cycle',
        name: 'cycle',
        component: cycle,
        meta: {keepAlive: true,perm: '*'}
    },{
        path: '/project',
        name: 'project',
        component: project,
        meta: {perm: '*'}
    },{
        path: '/staffInfo',
        name: 'staffInfo',
        component: staffInfo,
        meta: {perm: '*'}
    },{
        path: '/salary',
        name: 'salary',
        component: salary,
        meta: {perm: '*'}
    },{
        path: '/scale',
        name: 'scale',
        component: scale,
        meta: {keepAlive: true,perm: '*'}
    },{
        path: '/reportForms',
        name: 'reportForms',
        component: reportForms,
        meta: {perm: '*'}
    },{
        path: '/office',
        name: 'office',
        component: office,
        meta: {keepAlive: true,perm: '*'}
    },{
        path: '/RLdownload',
        name: 'RLdownload',
        component: RLdownload,
        meta: {perm: '*'}
    },{
        path: '/rlHistory',//人力分摊 导入历史查看
        name: 'rlHistory',
        component: rlHistory,
        meta: {perm: '*'}
    },     
// 网关管理    路由部分
    
    {
        path: '/webmasterServer',
        name: 'webmasterServer',
        component: webmasterServer,
        meta: {keepAlive: true,perm: '*'}
    },
    
    {
        path: '/webmasterPort',
        name: 'webmasterPort',
        component: webmasterPort,
        meta: {keepAlive: true,perm: '*'}
    },
// 数据采集    路由部分
    
    {
        path: '/EDBdataget',
        name: 'EDBdataget',
        component: EDBdataget,
        meta: {keepAlive: true,perm: '*'}
    },
    {
        path: '/EDBdatagetList',
        name: 'EDBdatagetList',
        component: EDBdatagetList,
        meta: {keepAlive: true,perm: '*'}
    },

// 数据源维护    路由部分
        
        {
            path: '/compList',//数据源列表
            name: 'compList',
            component: compList,
            meta: {keepAlive: true,perm: '*'}
        },{
            path: '/compHistory',//所有子页面的导入历史查看
            name: 'compHistory',
            component: compHistory,
            meta: {perm: '*'}
        },
        {
            path: '/compListZenter',//自仓出库单导入
            name: 'compListZenter',
            component: compListZenter,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/compListZcome',//自仓入库单导入
            name: 'compListZcome',
            component: compListZcome,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/compListCcome',//菜鸟出入库导入
            name: 'compListCcome',
            component: compListCcome,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/compListCenter',//菜鸟订单出库导入
            name: 'compListCenter',
            component: compListCenter,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/compListPurchase',//采购订单导入
            name: 'compListPurchase',
            component: compListPurchase,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/compListafterasle',//线下售后单导入
            name: 'compListafterasle',
            component: compListafterasle,
            meta: {keepAlive: true,perm: '*'}
        },
//数据展示      路由部分
        {
            path: '/compCome',//出库单数据源展示
            name: 'compCome',
            component: compCome,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/compEnter',//入库单数据源展示
            name: 'compEnter',
            component: compEnter,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/CaiNiaoOrder',//发货订单展示
            name: 'CaiNiaoOrder',
            component: CaiNiaoOrder,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/deliveryOrder',//菜鸟出入库订单
            name: 'deliveryOrder',
            component: deliveryOrder,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/purchaseOrder',//采购订单
            name: 'purchaseOrder',
            component: purchaseOrder,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/CaiNiaoFrom',//菜鸟订单
            name: 'CaiNiaoFrom',
            component: CaiNiaoFrom,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/CarryOver',//结转订单
            name: 'CarryOver',
            component: CarryOver,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/aftersaleshow',//线下售后数据源展示
            name: 'aftersaleshow',
            component: aftersaleshow,
            meta: {perm: '*'}
        },
//人力分摊   数据展示      路由部分
        {
            path: '/rlData',//人力Data数据源展示
            name: 'rlData',
            component: rlData,
            meta: {keepAlive: true,perm: '*'}
        },
//收发存      路由部分
        {
            path: '/sendCreate',//出库单数据源展示
            name: 'sendCreate',
            component: sendCreate,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/sendList',//入库单数据源展示
            name: 'sendList',
            component: sendList,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/sendColl',//发货订单展示
            name: 'sendColl',
            component: sendColl,
            meta: {perm: '*'}
        },
//数据提交      路由部分
        {
            path: '/dataWaitsub',//出库单数据源展示
            name: 'dataWaitsub',
            component: dataWaitsub,
            meta: {keepAlive: true,perm: '*'}
        },
//外部数据采集      路由部分
        {
            path: '/exeMana',//采集任务管理
            name: 'exeMana',
            component: exeMana,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/exeManaUser',//采集任务管理
            name: 'exeManaUser',
            component: exeManaUser,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/exeTole',//导入目标数据
            name: 'exeTole',
            component: exeTole,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/exeDownload',//数据汇总下载
            name: 'exeDownload',
            component: exeDownload,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/exeDownloads',//数据汇总下载2
            name: 'exeDownloads',
            component: exeDownloads,
            meta: {keepAlive: true,perm: '*'}
        },
//外部数据展示     路由部分
        {
            path: '/waidataColler',//月度销售数据	
            name: 'waidataColler',
            component: waidataColler,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/waidataRibao',//销售总揽
            name: 'waidataRibao',
            component: waidataRibao,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/waidataJiaoyi',//交易构成
            name: 'waidataJiaoyi',
            component: waidataJiaoyi,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/PCts',//PC流量来源
            name: 'PCts',
            component: PCts,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/MBts',//PC流量来源
            name: 'MBts',
            component: MBts,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/goodsEF',//爆款商品效果
            name: 'goodsEF',
            component: goodsEF,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/SKUEF',//SKU商品效果
            name: 'SKUEF',
            component: SKUEF,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/DSRsale',//SKU商品效果
            name: 'DSRsale',
            component: DSRsale,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/waidataTarget',//SKU流量无线端
            name: 'waidataTarget',
            component: waidataTarget,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/waidataTargetPC',//SKU流量pc端
            name: 'waidataTargetPC',
            component: waidataTargetPC,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/LineTrain',//直通车推广数据
            name: 'LineTrain',
            component: LineTrain,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/DSR',//DSR
            name: 'DSR',
            component: DSR,
            meta: {keepAlive: true,perm: '*'}
        },

        // 定制
        {
            path: '/waidataContend',//竞品
            name: 'waidataContend',
            component: waidataContend,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/Contendsales',//竞品销量
            name: 'Contendsales',
            component: Contendsales,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/waiwatch',//数据看板
            name: 'waiwatch',
            component: waiwatch,
            meta: {keepAlive: true,perm: '*'}
        },

        
        {
            path: '/waic1',//数据看板
            name: 'waic1',
            component: waic1,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/waic2',//数据看板
            name: 'waic2',
            component: waic2,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/waic3',//数据看板
            name: 'waic3',
            component: waic3,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/waic4',//数据看板
            name: 'waic4',
            component: waic4,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/waic5',//数据看板
            name: 'waic5',
            component: waic5,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/waic6',//数据看板
            name: 'waic6',
            component: waic6,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/waic7',//数据看板
            name: 'waic7',
            component: waic7,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/waic8',//数据看板
            name: 'waic8',
            component: waic8,
            meta: {keepAlive: true,perm: '*'}
        },
        
//      内容		
        {
            path: '/pamcontent',//内容
            name: 'pamcontent',
            component: pamcontent,
            meta: {keepAlive: true,perm: '*'}
        },
        {
            path: '/videocontent',//内容
            name: 'videocontent',
            component: videocontent,
            meta: {perm: '*'}
        },
        {
            path: '/throughtrain',//竞品直通车
            name: 'throughtrain',
            component: throughtrain,
            meta: {perm: '*'}
        },
        {
            path: '/throughactivity',//竞品活动
            name: 'throughactivity',
            component: throughactivity,
            meta: {perm: '*'}
        },
        
        
        
]
