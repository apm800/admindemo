<template>
    <li>
        <!--v-checkup="item.perms"-->
    	<a v-if="item.type == 0" href="#">
        		<i v-if="item.icon != null" :class="item.icon"></i>
        		<span class="nav-label">{{item.name}}</span>
        		<span class="fa arrow"></span>
        </a>
    	<ul v-if="item.type == 0" class="nav nav-second-level">
        		<menu-list :item="item" v-for="item in item.list" :key="item.menuId"></menu-list>
        </ul>
        <a v-if="item.type == 1" :href="item.url" class="J_menuItem"><i v-if="item.icon != null" :class="item.icon"></i><i v-else class="fa fa-circle-o"></i> {{item.name}}</a>
        <!-- <router-link v-if="item.type == 1" :to="item.url" class="J_menuItem"><i v-if="item.icon != null" :class="item.icon"></i><i v-else class="fa fa-circle-o"></i> {{item.name}}</router-link> -->
    </li>
</template>

<script>
    import menuList from './menuItem'
    export default {
        name: 'menu-list',
        data() {
            return {
            }
        },
        methods: {
        },
        mounted() {
            // console.log(this.item)
        },
        props: {
            item:{}
        },
        watch: {},
        components:{
            menuList
        }
    }
</script>
<style lang="less">

</style>
