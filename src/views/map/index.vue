/*
创建者：cc
模块名称：xxxx
备注：xxxx
*/
<template>
    <div>
        <s-map @ready="handleReady"></s-map>
    </div>
</template>

<script>
export default {
    props: {},
    data() {
        return {};
    },
    computed: {},
    created() {
        // console.log(returnCitySN, 2222)
    },
    mounted() {
    },
    watch: {},
    methods: {
        handleReady(scene, _this) {
            // console.log(_this, 11111)
            _this.createFBX("", (bolb) => {
                // console.log(bolb, 11111)
            })
        }
    },
    components: {
        "s-map": () => import("./map")
    },
};
</script>

<style scoped lang="scss"></style>
