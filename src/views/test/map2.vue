/*
创建者：cc
模块名称：xxxx
备注：xxxx
*/
<template>
    <div class="map">
        <div id="map" class="map"></div>
        <div class="tool-box">
            <el-button :plain="state === 6 ? false : true" type="primary" @click="state = 6, pMap.openMarker(marker)">标记位置</el-button>
            <el-button v-if="state === 6" type="primary" @click="state = 0, pMap.closeMarker()">取消标记</el-button>
            <el-button :plain="state === 2 ? false : true" type="primary" @click="state = 2, drawPolygon()">绘制多边形</el-button>
            <el-button v-if="state === 2" type="primary" @click="state = 0, pMap.closeDraw()">取消</el-button>
            <el-button :plain="state === 7 ? false : true" type="primary" @click="state = 7, drawPolygon('LineString', true)">测距离</el-button>
            <el-button v-if="state === 7" type="primary" @click="state = 0, pMap.closeDraw()">取消</el-button>
            <el-button :plain="state === 8 ? false : true" type="primary" @click="state = 8, drawPolygon('Polygon', true)">测面积</el-button>
            <el-button v-if="state === 8" type="primary" @click="state = 0, pMap.closeDraw()">取消</el-button>
            <el-button :plain="state === 4 ? false : true" type="primary" @click="state = 4, addAreaCoverage()">区域覆盖面</el-button>
            <el-button :plain="state === 3 ? false : true" type="primary" @click="state = 3, pMap.addMarker(marker2)">显示点位</el-button>
            <el-button :disabled="state ? false : true" type="primary" @click="state = 0, clear()">清除</el-button>
        </div>
        <div id="popup" class="ol-popup">
            1231231
        </div>
    </div>
</template>

<script>
export default {
    props: {},
    data() {
        return {
            polygonData: [], //多边形
            marker: {},
            marker2: {},
            pMap: null,
            VectorData: [], //矢量图层数据
            dotData: [], //点位数据
            draw: null, //绘制图层
            state: 0, //选中状态
            snap: null, //
            type: "Polygon", // 多边形
            map: null,
            options: {
                // geo: {
                //     show: true,
                //     map: "di_tu",
                //     itemStyle: {
                //         borderWidth: 2,
                //         borderColor: "#56DDFF",
                //         shadowColor: "#56DDFF",
                //         shadowBlur: 10,
                //         areaColor: {
                //             type: "linear",
                //             x: 0,
                //             y: 1,
                //             x2: 0,
                //             y2: 0,
                //             colorStops: [{
                //                 offset: 0, color: "#05114C" // 0% 处的颜色
                //             }, {
                //                 offset: 1, color: "#000" // 100% 处的颜色
                //             }],
                //             global: false // 缺省为 false
                //         }
                //     },
                //     label: {
                //         color: "#fff",
                //         show: true
                //     }
                // },
                series: [
                    // {
                    //     type: "map",
                    //     map: "di_tu",
                    //     itemStyle: {
                    //         borderWidth: 2,
                    //         borderColor: "#56DDFF",
                    //         shadowColor: "#56DDFF",
                    //         shadowBlur: 10,
                    //         areaColor: {
                    //             type: "linear",
                    //             x: 0,
                    //             y: 1,
                    //             x2: 0,
                    //             y2: 0,
                    //             colorStops: [{
                    //                 offset: 0, color: "#05114C" // 0% 处的颜色
                    //             }, {
                    //                 offset: 1, color: "#1149A6" // 100% 处的颜色
                    //             }],
                    //             global: false // 缺省为 false
                    //         }
                    //     },
                    //     label: {
                    //         show: false,
                    //         color: "#fff",
                    //         fontSize: 16,
                    //     },
                    //     data: []
                    // },
                    {
                        type: "effectScatter",
                        // coordinateSystem: "geo",
                        zlevel: 2,
                        rippleEffect: {
                            period: 2, //动画时间，值越小速度越快
                            brushType: "fill", //波纹绘制方式 stroke, fill
                            scale: 3 //波纹圆环最大限制，值越大波纹越大
                        },//涟漪特效
                        symbol: "circle",
                        // symbol: `image://${require("../../ee/images/bg12.png")}`,
                        // symbol: "path://M59.99,78c-33.137,0-60-10.3-60-23s26.863-23,60-23,60,10.3,60,23S93.127,78,59.99,78ZM60,40c-27.614,0-50,6.716-50,15S32.386,70,60,70s50-6.716,50-15S87.614,40,60,40Z",
                        symbolSize: 10,
                        // symbolSize: function(val) {
                        //     return val[2] * 2;
                        // },
                        itemStyle: {
                            color: "red"
                        },
                        hoverAnimation: true,
                        data: [
                            {
                                name: "富顺文庙",
                                value: [105.010219, 29.185122],
                                label: {
                                    normal: {
                                        show: true,
                                        formatter: function (params) {
                                            return '{area|地点：' + params.data.name + '}';
                                        },
                                        position: 'top',
                                        backgroundColor: 'rgba(233,63,66,.9)',
                                        borderRadius: 3,
                                        color: '#ffffff',
                                        rich: {
                                            area: {
                                                fontSize: 16,
                                                padding: [10, 10, 10, 10],
                                                color: '#ffffff'
                                            },
                                        }
                                    },
                                    emphasis: {
                                    }
                                },
                            }
                        ]
                    },
                ]
            },
        };
    },
    computed: {},
    created() { },
    mounted() {
        // console.log(new EChartsLayer(this.getOption()))
        this.marker = {
            anchor: [0.5, 60], //0.5为水平居中，60为图片高度
            scale: 0.5, //缩放倍数
            url: "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
            isMover: true,
            clickLocation: (e, location) => {
                // this.VectorData.push(e);
                console.log(this.VectorData, location, "点击的位置")
            },
            moverSeat: (e) => {
                console.log(e, "鼠标位置")
            }
        }
        this.marker2 = {
            clickLocation: (e, location) => {
                this.VectorData.push(e);
                console.log(this.VectorData, location, 2222222)
            },
        }
        // var view = map.getView();
        // var zoom = view.getZoom();
        // var center = view.getCenter();
        // var rotation = view.getRotation();
        // console.log(view, zoom, center, rotation)
        // this.initMap()
        this.pMap = new pMap(document.getElementById("map"));
        this.pMap.addTile(["http://192.168.2.232:83/roadmap/{z}/{x}/{y}.png"]);//添加瓦片数据
        this.pMap.moverMouse((e, a) => {
            // console.log(e, a)
        }); //移动鼠标事件
        var echartslayer = new EChartsLayer(this.options);
        echartslayer.appendTo(this.pMap.map)
        fetch("https://sudos.xrdev.cn/map/china.json")
            .then((response) => {
                return response.json()   //执行成功第一步
            }).then((res) => {
                res.features.forEach((e, i) => {
                    // this.pMap.addPolygon({ data: e.geometry.coordinates[0][0] }, e => {
                    //     // this.VectorData.push(e);
                    //     // console.log(e, "多边形覆盖面")
                    // }); //多边形覆盖面
                });
            }).catch(function (err) {
                //中途的任何地方出错  都会在这里被捕获到
            })
        // fetch("https://sudos.xrdev.cn/map/sichuan.json")
        //     .then((response) => {
        //         return response.json()   //执行成功第一步
        //     }).then((res) => {
        //         console.log(this.$echarts)
        //         // this.$echarts.registerMap("di_tu", res);
        //     }).catch(function (err) {
        //         //中途的任何地方出错  都会在这里被捕获到
        //     })


    },
    watch: {},
    methods: {
        // 绘制多边形
        drawPolygon(type = "Polygon", isValue = false) {
            this.pMap.drawPolygon({ type: type, isValue: isValue }, (e, obj) => {
                this.VectorData.push(obj);
                console.log(e, "多边形经纬度")
            });
        },
        // 多边形覆盖面
        addAreaCoverage() {
            fetch("http://192.168.2.171:10001/v1/demon/getMapJsonS/510000")
                .then((response) => {
                    return response.json()   //执行成功第一步
                }).then((res) => {
                    this.pMap.addPolygon({ data: res.features[0].geometry.coordinates[0][0] }, e => {
                        this.VectorData.push(e);
                        console.log(e, "多边形覆盖面")
                    }); //多边形覆盖面
                }).catch(function (err) {
                    //中途的任何地方出错  都会在这里被捕获到
                })
        },
        // 清除
        clear() {
            this.pMap.clear(this.VectorData[1]);
            // console.log(this.VectorData)
            let num = this.VectorData.length;
            for (let i = 0; i < num; i++) {
                this.VectorData[i].id
                // this.VectorData.splice(0, 1)
            }
        },
    },
    components: {},
};
</script>

<style lang="scss">
.map {
    height: 100%;
    width: 100%;
    // width: 3840px;
    // height: 2160px;
    position: relative;
    .tool-box {
        position: absolute;
        top: 50px;
        right: 50px;
    }
    .ol-popup {
        position: absolute;
        background-color: white;
        -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
        filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
        padding: 15px;
        border-radius: 10px;
        border: 1px solid #cccccc;
        bottom: 45px;
        left: -50px;
    }
    .ol-tooltip {
        position: relative;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 4px;
        color: white;
        padding: 4px 8px;
        opacity: 0.7;
        white-space: nowrap;
    }

    .ol-tooltip-measure {
        opacity: 1;
        font-weight: bold;
    }

    .ol-tooltip-measure:before {
        border-top: 6px solid rgba(0, 0, 0, 0.5);
        border-right: 6px solid transparent;
        border-left: 6px solid transparent;
        content: "";
        position: absolute;
        bottom: -6px;
        margin-left: -7px;
        left: 50%;
    }
}
</style>
