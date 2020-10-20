/*
创建者：cc
模块名称：xxxx
备注：xxxx
*/
<template>
    <div>
        <s-map></s-map>
    </div>
</template>

<script>
export default {
    props: {},
    data() {
        return {};
    },
    computed: {},
    created() { },
    mounted() { },
    watch: {},
    methods: {},
    components: {
        "s-map": () => import("./map")
    },
};
</script>

<style scoped lang="scss"></style>
