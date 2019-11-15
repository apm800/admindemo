<template>
    <div class="navbar-default navbar-static-side" role="navigation">
        <div class="nav-close"><i class="fa fa-times-circle"></i>
        </div>
        <div class="sidebar-collapse">
            <ul class="nav" id="side-menu">
                <!--nav-header-->
                <li class="nav-header">
                    <nav-header></nav-header>
                    <div class="logo-element">BF</div>
                </li>
                <!--nav-list-->
                <menu-List :item="item" v-for="item in dataList" :key="item.menuId"></menu-List>

            </ul>
        </div>
    </div>
</template>

<script>
    import contabs from '../assets/js/contabs'
    import navinit from '../assets/js/navinit'
    import hplus from '../assets/js/hplus'

    import navHeader from './navbar/navHeader'
    import menuList from './navbar/menuItem'

    export default {
        data() {
            return {
                dataList:[]
            }
        },
        methods: {

        },
        mounted() {
            this.$http.get('/dc-admin/sys/menu/nav').then((response) => {
                var res = response.data;
                console.log('21111111111',res)
                if (res.code == 0) {
                    this.dataList=res.menuList;
                    this.$nextTick(()=>{
                        navinit();
                        contabs(this.$router);
                        hplus();
                    })
                }
            }).catch((error) => {

            });


        },
        props: {},
        watch: {},
        components: {
            navHeader,
            menuList
        }
    }
</script>
<style lang="less">

</style>
