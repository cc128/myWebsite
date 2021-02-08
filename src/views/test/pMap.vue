/*
创建者：cc
模块名称：xxxx
备注：xxxx
*/
<template>
    <div class="pMap">
        <div id="map1"></div>
        <div id="map2"></div>
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
    mounted() {
        this.initMap1();
        // this.initMap2();
    },
    watch: {},
    methods: {
        initMap1() {
            // 初始化地图
            this.pMap = new pMap(document.getElementById("map1"), {
                zoom: 5,
                isHover: true,
                // minZoom: 7,
                // maxZoom: 11,
                center: [104.06667, 30.66667]
            });
            let tileObj = this.pMap.addTile(["http://192.168.2.238:83/roadmap/{z}/{x}/{y}.png"]); // 添加瓦片数据
            // setTimeout(() => {
            //     tileObj.setUrl("http://192.168.2.238:83/tileImg/{z}/{x}/{y}.png")
            // }, 5000);
        },
        initMap2() {
            // 初始化地图
            this.pMap = new pMap(document.getElementById("map2"), {
                zoom: 5,
                isHover: true,
                // minZoom: 7,
                // maxZoom: 11,
                center: [104.06667, 30.66667]
            });
            this.pMap.addTile(["http://192.168.2.238:83/roadmap/{z}/{x}/{y}.png"]); // 添加瓦片数据
        }
    },
    components: {},
};
</script>

<style lang="scss">
.pMap {
    width: 100vw;
    height: 100vh;
    display: flex;
    #map1 {
        flex: 1;
    }
    #map2 {
        flex: 1;
    }
}
</style>
