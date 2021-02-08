/*
创建者：cc
模块名称：xxxx
备注：xxxx
*/
<template>
    <div class="mapBox" id="mapBox">
        123123
    </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
export default {
    props: {},
    data() {
        return {};
    },
    computed: {},
    created() { },
    mounted() {
        const map = new mapboxgl.Map({
            container: 'mapBox',
            style: {
                "version": 8,
                // "name": "Mapbox Streets",
                // "sprite": "http://localhost:8080/mapbox_build/sprite/sprite",
                // "glyphs": "http://localhost:8080/mapbox_build/fonts/{fontstack}/{range}.pbf",
                "sources": {
                    "osm-tiles": {
                        "type": "raster",
                        'tiles': [
                            // "http://192.168.2.121:8082/roadmap/{z}/{x}/{y}.png",
                            "http://192.168.2.121:8082/roadmap/{z}/{x}/{y}.png"
                        ],
                        'tileSize': 256
                    }
                },
                "layers": [{
                    "id": "123",
                    "type": "raster",
                    "source": "osm-tiles",
                    "source-layer": "osmtiles"
                }]
            },
            center: [104.06667, 30.66667],
            zoom: 5
        });
    },
    watch: {},
    methods: {},
    components: {},
};
</script>

<style lang="scss">
.mapBox {
    width: 100%;
    height: 100%;
}
</style>
