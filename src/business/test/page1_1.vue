<template>
    <div>
        <h1>page1_1</h1>
        <input type="text" value="1_1">
        <table border="1">
            <tr v-for="item in dataList">
                <td v-for="str in item">{{str}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dataList:[
                    ['职务','1班','2班','3班'],
                    ['男班长','50','60','90'],
                    ['女班长','50','60','90'],
                    ['劳动委员','50','60','90'],
                ]
            }
        },
        methods: {},
        mounted() {
        },
        props: {},
        watch: {}
    }
</script>
<style lang="less">

</style>
