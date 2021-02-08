/*
创建者：cc
模块名称：xxxx
备注：xxxx
*/
<template>
    <div class="map">
        <div id="map" class="map"></div>
        <div class="tool-box">
            <el-button :plain="state === 5 ? false : true" type="primary" @click="state = 5">添加模型</el-button>
            <el-button :plain="state === 4 ? false : true" type="primary" @click="state = 4">区域轮廓</el-button>
            <el-button :plain="state === 3 ? false : true" type="primary" @click="state = 3, addInteractions('Point')">标记位置</el-button>
            <el-button :plain="state === 1 ? false : true" type="primary" @click="state = 1">距离测量</el-button>
            <el-button :plain="state === 2 ? false : true" type="primary" @click="state = 2, addInteractions('Polygon')">面积测量</el-button>
            <el-button :disabled="state ? false : true" type="primary" @click="state = 0, clear()">取消</el-button>
        </div>
    </div>
</template>

<script>
import Map from 'ol/Map';
import View from 'ol/View';
import { ScaleLine } from 'ol/control';

import { Pointer as PointerInteraction, defaults as defaultInteractions } from 'ol/interaction';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { TileJSON, Vector as VectorSource, XYZ } from 'ol/source';
import Feature from 'ol/Feature';
import { Fill, Icon, Stroke, Style } from 'ol/style';
import { LineString, Point, Polygon } from 'ol/geom';
export default {
    props: {},
    data() {
        return {
            state: 0, //选中状态
            tool: null, //工具
            snap: null, //
            type: "Polygon", // 多边形
            map: null,
            view: new View({
                center: [104.06667, 30.66667],
                zoom: 5,
                // minZoom: 5,
                // maxZoom: 11,
            }), //地图的视图
        };
    },
    computed: {},
    created() { },
    mounted() {
        // var view = map.getView();
        // var zoom = view.getZoom();
        // var center = view.getCenter();
        // var rotation = view.getRotation();
        // console.log(view, zoom, center, rotation)
        this.initMap()
    },
    watch: {},
    methods: {
        // 初始化地图
        initMap() {
            // var Drag = /*@__PURE__*/(function (PointerInteraction) {
            //     function Drag() {
            //         PointerInteraction.call(this, {
            //             handleDownEvent: handleDownEvent,
            //             handleDragEvent: handleDragEvent,
            //             handleMoveEvent: handleMoveEvent,
            //             handleUpEvent: handleUpEvent,
            //         });
            //         /**
            //          * @type {import("../src/ol/coordinate.js").Coordinate}
            //          * @private
            //          */
            //         this.coordinate_ = null;
            //         /**
            //          * @type {string|undefined}
            //          * @private
            //          */
            //         this.cursor_ = 'pointer';
            //         /**
            //          * @type {Feature}
            //          * @private
            //          */
            //         this.feature_ = null;
            //         /**
            //          * @type {string|undefined}
            //          * @private
            //          */
            //         this.previousCursor_ = undefined;
            //     }

            //     if (PointerInteraction) Drag.__proto__ = PointerInteraction;
            //     Drag.prototype = Object.create(PointerInteraction && PointerInteraction.prototype);
            //     Drag.prototype.constructor = Drag;

            //     return Drag;
            // }(PointerInteraction));
            // var key = 'Your Mapbox access token from https://mapbox.com/ here';
            // var pointFeature = new Feature(new Point([0, 0]));
            // var lineFeature = new Feature(
            //     new LineString([[-1e7, 1e6], [-1e6, 3e6]])
            // );
            // var polygonFeature = new Feature(
            //     new Polygon(
            //         [
            //             [
            //                 [-3e6, -1e6],
            //                 [-3e6, 1e6],
            //                 [-1e6, 1e6],
            //                 [-1e6, -1e6],
            //                 [-3e6, -1e6]
            //             ]
            //         ])
            // );
            // this.map = new Map({
            //     // interactions: defaultInteractions().extend([new Drag()]),
            //     layers: [
            //         new ol.layer.Tile({
            //             source: new ol.source.OSM()
            //         }),
            //         // new TileLayer({
            //         //     source: new TileJSON({
            //         //         url:
            //         //             'https://a.tiles.mapbox.com/v4/aj.1x1-degrees.json?secure&access_token=' +
            //         //             key,
            //         //     }),
            //         // }),
            //         // new VectorLayer({
            //         //     source: new VectorSource({
            //         //         features: [pointFeature, lineFeature, polygonFeature],
            //         //     }),
            //         //     style: new Style({
            //         //         image: new Icon({
            //         //             anchor: [0.5, 46],
            //         //             anchorXUnits: 'fraction',
            //         //             anchorYUnits: 'pixels',
            //         //             opacity: 0.95,
            //         //             src: 'data/icon.png',
            //         //         }),
            //         //         stroke: new Stroke({
            //         //             width: 3,
            //         //             color: [255, 0, 0, 1],
            //         //         }),
            //         //         fill: new Fill({
            //         //             color: [0, 0, 255, 0.6],
            //         //         }),
            //         //     }),
            //         // })
            //     ],
            //     target: 'map',
            //     view: this.view
            // });
            // var scaleLineControl = new ScaleLine({
            //     units: 'metric',
            //     target: 'scalebar',
            //     className: 'ol-scale-line'
            // });
            // this.map.addControl(scaleLineControl); // 添加比例尺控件
            // this.moverMap();// 移动地图
            // function handleDownEvent(evt) {
            //     var map = evt.map;
            //     var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
            //         return feature;
            //     });
            //     if (feature) {
            //         this.coordinate_ = evt.coordinate;
            //         this.feature_ = feature;
            //     }
            //     return !!feature;
            // }
            // function handleDragEvent(evt) {
            //     var deltaX = evt.coordinate[0] - this.coordinate_[0];
            //     var deltaY = evt.coordinate[1] - this.coordinate_[1];
            //     var geometry = this.feature_.getGeometry();
            //     geometry.translate(deltaX, deltaY);
            //     this.coordinate_[0] = evt.coordinate[0];
            //     this.coordinate_[1] = evt.coordinate[1];
            // }
            // function handleMoveEvent(evt) {
            //     if (this.cursor_) {
            //         var map = evt.map;
            //         var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
            //             return feature;
            //         });
            //         var element = evt.map.getTargetElement();
            //         if (feature) {
            //             if (element.style.cursor != this.cursor_) {
            //                 this.previousCursor_ = element.style.cursor;
            //                 element.style.cursor = this.cursor_;
            //             }
            //         } else if (this.previousCursor_ !== undefined) {
            //             element.style.cursor = this.previousCursor_;
            //             this.previousCursor_ = undefined;
            //         }
            //     }
            // }
            // function handleUpEvent() {
            //     this.coordinate_ = null;
            //     this.feature_ = null;
            //     return false;
            // }
            var polygonFeature = new Feature(
                new Polygon(
                    [
                        [
                            [-3e6, -1e6],
                            [-3e6, 1e6],
                            [-1e6, 1e6],
                            [-1e6, -1e6],
                            [-3e6, -1e6]
                        ]
                    ])
            );
            this.map = new ol.Map({
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.OSM()
                    }),
                    // new VectorLayer({
                    //     source: new VectorSource({
                    //         features: [polygonFeature]
                    //     })
                    // })
                    // new ol.layer.Tile({
                    //     source: new ol.source.XYZ({
                    //         url: 'http://192.168.2.121:8082/satellite/{z}/{x}/{y}.jpg'//特别注意，这里的z-x-y的顺序
                    //     })
                    // }),
                    // new ol.layer.Tile({
                    //     source: new ol.source.XYZ({
                    //         url: 'http://192.168.2.121:8082/overlay/{z}/{x}/{y}.png'//特别注意，这里的z-x-y的顺序
                    //     })
                    // })
                ],
                // controls: [this.attribution, this.fullScreen],//如果不设置 controls ，地图会默认设置
                view: this.view,
                loadTilesWhileAnimating: true,//将这个设置为true，默认为false
                target: 'map',
            })
            this.moverMap()
        },
        pointerMoveHandler(evt) {
            //创建一个当前要绘制的对象
            var sketch = new ol.Feature();
            //创建一个帮助提示框对象
            var helpTooltipElement;
            //创建一个帮助提示信息对象
            var helpTooltip;
            //创建一个测量提示框对象
            var measureTooltipElement;
            //创建一个测量提示信息对象
            var measureTooltip;
            //继续绘制多边形的提示信息
            var continuePolygonMsg = 'Click to continue drawing the polygon';
            //继续绘制线段的提示信息
            var continueLineMsg = 'Click to continue drawing the line';
            //如果是平移地图则直接结束
            console.log(evt, 111111111111)
            if (evt.dragging) {
                return;
            }
            //帮助提示信息
            var helpMsg = 'Click to start drawing';

            if (sketch) {
                //Get the feature's default geometry. 
                //A feature may have any number of named geometries.
                //获取绘图对象的几何要素
                var geom = sketch.getGeometry();
                //如果当前绘制的几何要素是多边形，则将绘制提示信息设置为多边形绘制提示信息
                //如果当前绘制的几何要素是多线段，则将绘制提示信息设置为多线段绘制提示信息
                if (geom instanceof ol.geom.Polygon) {
                    helpMsg = continuePolygonMsg;
                } else if (geom instanceof ol.geom.LineString) {
                    helpMsg = continueLineMsg;
                }
            }
            //设置帮助提示要素的内标签为帮助提示信息
            helpTooltipElement.innerHTML = helpMsg;
            //设置帮助提示信息的位置
            //The coordinate in view projection corresponding to the original browser event.
            helpTooltip.setPosition(evt.coordinate);
            //移除帮助提示要素的隐藏样式
        },
        // 移动地图
        moverMap(longitude = [104.06667, 30.66667]) {
            var london = ol.proj.fromLonLat(longitude);//伦敦的坐标
            this.view.animate({
                center: london,
            });
        },
        // 交互方法
        addInteractions(type = "Polygon") {
            this.tool = new ol.interaction.Draw({
                source: new ol.source.Vector(),
                type: type,
                style: new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(255,255,255,0.2)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'rgba(0,0,0,0.5)',
                        lineDash: [10, 10],
                        width: 2
                    }),
                    image: new ol.style.Circle({
                        radius: 5,
                        stroke: new ol.style.Stroke({
                            color: 'rgba(0,0,0,0.7)'
                        }),
                        fill: new ol.style.Fill({
                            color: 'rgba(255,255,255,0.2)'
                        })
                    })
                })
            })
            // this.map.addInteraction(this.tool);
            // this.createMeasureTooltip(); //创建测量提示框
            // this.snap = new ol.interaction.Snap({ source: new ol.source.Vector() });
            // this.map.addInteraction(this.snap);
            // // 可修改
            // var modify = new ol.interaction.Modify({ source: new ol.source.Vector() });
            // this.map.addInteraction(modify);
            // this.map.on('pointermove', this.pointerMoveHandler());
        },
        //创建测量提示框
        createMeasureTooltip() {
            //创建测量提示框的div
            // measureTooltipElement = document.createElement('div');
            // measureTooltipElement.setAttribute('id', 'lengthLabel');
            // //设置测量提示要素的样式
            // measureTooltipElement.className = 'tooltip tooltip-measure';
            // //创建一个测量提示的覆盖标注
            measureTooltip = new ol.Overlay({
                element: `<div>123123</div`,
                offset: [0, -15],
                positioning: 'bottom-center'
            });
            //将测量提示的覆盖标注添加到地图中
            this.map.addOverlay(measureTooltip);
        },
        // 清除
        clear() {
            this.map.removeInteraction(this.tool);
            this.map.removeInteraction(this.snap);;
        },
        initMap33() {
            // setTimeout(() => {
            //     var london = new ol.proj.fromLonLat([-0.12755, 51.507222]);//伦敦的坐标
            //     //移动到伦敦，移动时是有动画的
            //     view.animate({
            //         center: london,
            //     });
            // }, 3000);
            //1、创建地图
            var map = new ol.Map({
                view: new ol.View({
                    center: [104.06667, 30.66667],
                    projection: 'EPSG:4326',
                    zoom: 4, //瓦片的层级-请根据自身需要
                }),
                loadTilesWhileAnimating: true,
                target: 'map',
            });
            //2、添加一个使用离线瓦片地图的层
            var offlineMapLayer = new ol.layer.Tile({
                source: new ol.source.XYZ({
                    // url: 'http://192.168.2.121:8083/maps/{z}/{x}/{y}.png'//特别注意，这里的z-x-y的顺序
                    url: 'http://192.168.2.121:8082/satellite/{z}/{x}/{y}.jpg'//特别注意，这里的z-x-y的顺序
                })
            });
            var offlineMapLayer2 = new ol.layer.Tile({
                source: new ol.source.XYZ({
                    // url: 'http://192.168.2.121:8083/maps/{z}/{x}/{y}.png'//特别注意，这里的z-x-y的顺序
                    url: 'http://192.168.2.121:8082/overlay/{z}/{x}/{y}.png'//特别注意，这里的z-x-y的顺序
                })
            });
            var offlineMapLayer3 = new ol.layer.Tile({
                source: new ol.source.OSM()
            })
            // //3、将瓦片层级添加到地图里面
            map.getFun(offlineMapLayer3);
            map.addLayer(offlineMapLayer);
            map.addLayer(offlineMapLayer2);
            // let pan = this.getPan();
            // pan.setActive(false);//false：当前地图不可拖动。true：可拖动
        },
        // 是否可拖动
        getFun() {
            let pan;
            this.map.getInteractions().forEach(function (element, index, array) {
                if (element instanceof ol.interaction.DragPan) {
                    pan = element;
                }
            })
            return pan;
        },
    },
    components: {},
};
</script>

<style lang="scss">
.map {
    height: 100%;
    width: 100%;
    position: relative;
    .tool-box {
        position: absolute;
        top: 50px;
        right: 50px;
    }
}
</style>
