/*
创建者：cc
模块名称：xxxx
备注：xxxx
*/
<template>
    <div class="map">
        <c-echarts :options="options" @ready="handleReady" @click="clickMap"></c-echarts>
    </div>
</template>

<script>
import { hejiang, fushun } from "./hejiang";
export default {
    props: {},
    data() {
        return {
            instance: null,
            Echarts: null,
            options: {
                geo: {
                    show: true,
                    map: "di_tu",
                    itemStyle: {
                        borderWidth: 2,
                        borderColor: "#56DDFF",
                        shadowColor: "#56DDFF",
                        shadowBlur: 10,
                        areaColor: {
                            type: "linear",
                            x: 0,
                            y: 1,
                            x2: 0,
                            y2: 0,
                            colorStops: [{
                                offset: 0, color: "#05114C" // 0% 处的颜色
                            }, {
                                offset: 1, color: "#1149A6" // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        }
                    },
                    label: {
                        color: "#fff",
                        show: true
                    }
                },
                series: [
                    {
                        type: "map",
                        map: "di_tu",
                        itemStyle: {
                            borderWidth: 2,
                            borderColor: "#56DDFF",
                            shadowColor: "#56DDFF",
                            shadowBlur: 10,
                            areaColor: {
                                type: "linear",
                                x: 0,
                                y: 1,
                                x2: 0,
                                y2: 0,
                                colorStops: [{
                                    offset: 0, color: "#05114C" // 0% 处的颜色
                                }, {
                                    offset: 1, color: "#1149A6" // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        label: {
                            show: false,
                            color: "#fff",
                            fontSize: 16,
                        },
                        data: []
                    },
                    {
                        type: "effectScatter",
                        coordinateSystem: "geo",
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

    },
    watch: {},
    methods: {
        // 图表加载回调
        handleReady(instance, Echarts) {
            this.instance = instance;
            this.instance.clear();
            this.Echarts = Echarts;
            fetch("https://sudos.xrdev.cn/map/sichuan.json")
                .then((response) => {
                    return response.json()   //执行成功第一步
                }).then((res) => {
                    this.Echarts.registerMap("di_tu", res);
                    this.instance.setOption(this.options);
                    this.instance.resize();
                }).catch(function (err) {
                    //中途的任何地方出错  都会在这里被捕获到
                })
        },
        clickMap(e) {
            if (e.componentSubType === "effectScatter") {
                alert(e.name)
            }
            // if (e.name === "上海") {
            //     this.num = 8562;
            //     this.num2 = 326;
            //     this.num3 = 206;
            //     this.$store.state.areaName = e.name;
            //     this.$getMap("https://sudos.xrdev.cn/map/shanghai.json").then(res => {
            //         this.Echarts.registerMap("di_tu", res);
            //         this.instance.setOption(this.options);
            //         this.instance.resize();
            //     })
            // }
        },
    },
    components: {},
};
</script>

<style lang="scss">
.map {
    width: 100%;
    height: 100%;
    display: flex;
    .area-box {
        width: 500px;
        height: 500px;
        box-shadow: 0 0 6px inset;
    }
}
</style>
