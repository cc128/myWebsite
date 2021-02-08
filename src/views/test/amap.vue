/*
创建者：cc
模块名称：xxxx
备注：xxxx
*/
<template>
    <div class="amap">
        <div id="map"></div>
        <div class="tool-box">
            <el-button :plain="state === 5 ? false : true" type="primary" @click="state = 5, setmodel()">添加模型</el-button>
            <el-button :plain="state === 4 ? false : true" type="primary" @click="state = 4, polygon()">区域轮廓</el-button>
            <el-button :plain="state === 3 ? false : true" type="primary" @click="state = 3">标记位置</el-button>
            <el-button :plain="state === 1 ? false : true" type="primary" @click="state = 1, draw('rule')">距离测量</el-button>
            <el-button :plain="state === 2 ? false : true" type="primary" @click="state = 2, draw('measureArea')">面积测量</el-button>
            <el-button :disabled="state ? false : true" type="primary" @click="clear">清除</el-button>
        </div>
    </div>
</template>

<script>
export default {
    props: {},
    data() {
        return {
            cityMeshes: null, //模型
            state: 0,
            map: null, //地图
            ruler1: null, //测距 
            mouseTool: null, //距离、面积测量
            polygonData: [], //多边形数据
            markerData: [], //点数据
            object3Dlayer: null, // 3d图层
            prismData: [], //图层对象
            // <div class="close-btn">X</div>
            markerContent:
                `
                <div class="custom-content-marker">
                    <img src="//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png">
                </div>
                `
        };
    },
    computed: {},
    created() { },
    mounted() {
        this.initAmap();
    },
    watch: {},
    methods: {
        //初始化地图
        initAmap() {
            this.map = new AMap.Map('map', {
                viewMode: '3D',
                pitch: 60,
                maxPitch: 60,
                rotation: 10,
                zoom: 6,
                zooms: [5, 20],
                expandZoomRange: true,
                // mapStyle: 'amap://styles/macaron',
                showIndoorMap: false,
                // zoomEnable: false,
                // dragEnable: false,
                // mapStyle: "amap://styles/5620d86322408398e4d7d503032f1aa9",
                mapStyle: "amap://styles/6a05cb11c6ad73ab70375fbe01422da4",
                // features: ["bg", "road"],
                // center: [104.0660046479492, 30.65734350355415],
                center: [106.6002446778297, 31.461960766462195],
                // center: [121.499809, 31.236666],
                // labelzIndex: 130,
            });
            this.object3Dlayer = new AMap.Object3DLayer(); // 加载3d图层
            this.map.add(this.object3Dlayer);
            this.setAreaCover("四川省"); // 行政单位轮廓
            this.map.on('click', (e) => {
                if (this.state === 3) {
                    let position = new AMap.LngLat(e.lnglat.lng, e.lnglat.lat);
                    this.addDot(position, true); // 标记位置
                }; //标记位置
                if (this.state === 5) {
                    var pixel = e.pixel;
                    var px = new AMap.Pixel(pixel.x, pixel.y);
                    var obj = this.map.getObject3DByContainerPos(px, [this.object3Dlayer], false) || {};
                    if (obj && obj.object) {
                        var meshId = obj.object.id;
                        if (this.cityMeshes && this.cityMeshes.layerMesh) {
                            for (var i = 0; i < this.cityMeshes.layerMesh.length; i++) {
                                if (meshId === this.cityMeshes.layerMesh[i].id) {
                                    return log.info("您点击了陆家嘴模型！");
                                }
                            }
                        }
                    }
                } //模型
            })
            // this.ruler1 = new AMap.RangingTool(this.map); //测距
            this.mouseTool = new AMap.MouseTool(this.map); //距离、面积测量

            this.mouseTool.on("draw", (obj) => {
                if (this.state === 1) {
                    console.log(obj.obj.getPath(), "经纬度")
                    console.log(obj.obj.getLength(), "总长度")
                    console.log(obj.obj.getOptions(), "线")
                }
                if (this.state === 2) {
                    console.log(obj.obj.getPath(), "经纬度")
                    console.log(obj.obj.getArea() / 1000000, "平方公里")
                }
            })
        },
        // 距离、面积测量
        draw(type) {
            switch (type) {
                case 'rule': {
                    this.mouseTool.rule({
                        startMarkerOptions: {//可缺省
                            icon: new AMap.Icon({
                                size: new AMap.Size(19, 31),//图标大小
                                imageSize: new AMap.Size(19, 31),
                                image: "https://webapi.amap.com/theme/v1.3/markers/b/start.png"
                            })
                        },
                        endMarkerOptions: {//可缺省
                            icon: new AMap.Icon({
                                size: new AMap.Size(19, 31),//图标大小
                                imageSize: new AMap.Size(19, 31),
                                image: "https://webapi.amap.com/theme/v1.3/markers/b/end.png"
                            }),
                            offset: new AMap.Pixel(-9, -31)
                        },
                        midMarkerOptions: {//可缺省
                            icon: new AMap.Icon({
                                size: new AMap.Size(19, 31),//图标大小
                                imageSize: new AMap.Size(19, 31),
                                image: "https://webapi.amap.com/theme/v1.3/markers/b/mid.png"
                            }),
                            offset: new AMap.Pixel(-9, -31)
                        },
                        lineOptions: {//可缺省
                            strokeStyle: "solid", //轮廓线样式，实线:solid，虚线:dashed
                            strokeColor: "#FF33FF", // 线条颜色
                            strokeOpacity: 1, //透明度
                            strokeWeight: 2, //线宽
                            showDir: true, //是否显示白色方向箭头
                        }
                        //同 RangingTool 的 自定义 设置，缺省为默认样式
                    });
                    break;
                }
                case 'measureArea': {
                    this.mouseTool.measureArea({
                        draggable: true, //设置多边形是否可拖拽移动
                        strokeStyle: "solid", //轮廓线样式，实线:solid，虚线:dashed
                        strokeColor: '#80d8ff',// 线条颜色
                        fillColor: '#80d8ff', // 多边形填充颜色，使用16进制颜色代码赋值，如：#FFAA00
                        fillOpacity: 0.3, //多边形填充透明度，取值范围[0,1]
                        //同 Polygon 的 Option 设置
                    });
                    break;
                }
            }
        },
        // 标记位置
        addDot(position, isMove = false) {
            let marker = new AMap.Marker({
                position: position,
                // 将 html 传给 content
                content: this.markerContent,
                // 以 icon 的 [center bottom] 为原点
                offset: new AMap.Pixel(-10, -65),
                draggable: isMove,
                cursor: 'move',
                // raiseOnDrag: true,
            })
            // marker.bindPopup("123").openPopup();
            marker.on("click", (e) => {
                this.map.remove(e.target);
            });
            this.markerData.push(marker)
            this.map.add(marker);
        },
        // 自定义区域轮廓
        polygon(paths = []) {
            // 多边形轮廓线的节点坐标数组
            let path = []
            if (paths.length === 0) {
                path = [
                    new AMap.LngLat(104.0217160126953, 30.672109238686833),
                    new AMap.LngLat(104.02308930371092, 30.642575512491867),
                    new AMap.LngLat(104.04574860546873, 30.62544181747206),
                    new AMap.LngLat(104.0663479707031, 30.620714746994413),
                    new AMap.LngLat(104.09518708203123, 30.621896536256397),
                    new AMap.LngLat(104.1102932832031, 30.643757034780023),
                    new AMap.LngLat(104.11441315624998, 30.66502196740319),
                    new AMap.LngLat(104.10617341015623, 30.680967596656085),
                    new AMap.LngLat(104.09038056347654, 30.692777476701472),
                    new AMap.LngLat(104.0217160126953, 30.67329040002229),
                ];
            } else {
                path = paths;
            }
            let polygon = new AMap.Polygon({
                path: paths,
                fillOpacity: 0,
                fillColor: 'red', // 多边形填充颜色
                borderWeight: 0, // 线条宽度，默认为 1
                strokeColor: '#000', // 线条颜色
            });
            this.map.add(polygon);
            this.polygonData.push(polygon);
        },
        // 3添加模型
        setmodel() {
            // this.map.setZoomAndCenter(10, [121.499809, 31.236666]);
            // this.map.setPointToCenter(121.499809, 31.236666)
            this.map.setCenter([106.6002446778297, 31.461960766462195])
            this.map.setZoom(20); //设置地图层级
            // this.setAreaCover("上海市"); // 行政单位轮廓
            // 添加 Object3DLayer 图层，用于添加 3DObject 对象
            this.map.plugin(["AMap.GltfLoader"], () => {
                // var urlCity = 'https://a.amap.com/jsapi_demos/static/gltf-online/shanghai/scene.gltf';
                // var urlCity = '../../../public/model/scene.gltf';
                var urlCity = 'http://192.168.2.157:8081/zhudeguju.gltf';
                var paramCity = {
                    position: new AMap.LngLat(106.600991, 31.461806), // 必须
                    scale: 1, // 非必须，默认1
                    height: 50,  // 非必须，默认0
                    scene: 0, // 非必须，默认0
                };
                var gltfObj = new AMap.GltfLoader();
                gltfObj.load(urlCity, (gltfCity) => {
                    console.log(gltfCity, 111111)
                    this.cityMeshes = gltfCity;
                    gltfCity.setOption(paramCity);
                    gltfCity.rotateX(90);
                    // gltfCity.rotateY(0);
                    gltfCity.rotateZ(65);
                    this.object3Dlayer.add(gltfCity);
                });
            });
            // this.addDot([106.600406, 31.461737]); //打点
            //构建自定义信息窗体
            var infoWindow = new AMap.InfoWindow({
                anchor: 'bottom-center',
                content: '朱德故居',
                offset: new AMap.Pixel(0, 0)
            });
            infoWindow.open(this.map, [106.600991, 31.461806])
            fetch("https://restapi.amap.com/v3/place/text?key=7b69eaac561f6d7d27d9a6eb0ba7c301&keywords=朱德故居")
                .then((response) => {
                    response.json().then(res => {
                        res.pois.forEach(e => {
                            let arr = e.location.split(",");
                            this.addDot(arr); //打点
                        })
                    })
                }).catch(function (err) {
                    //中途的任何地方出错  都会在这里被捕获到
                })
            // // 以不规则棱柱体 Prism 为例，添加至 3DObjectLayer 图层中
            // var paths = [
            //     [104.04119957897947, 30.665612593200194],
            //     [104.05119957897947, 30.765612593200194],
            //     [104.06119957897947, 30.665612593200194],
            // ];
            // var bounds = paths.map(function (path) {
            //     return new AMap.LngLat(path[0], path[1]);
            // });
            // // 创建 Object3D 对象
            // var prism = new AMap.Object3D.Prism({
            //     path: bounds,
            //     height: 5000,
            //     color: 'rgba(100, 150, 230, 0.7)' // 支持 #RRGGBB、rgb()、rgba() 格式数据
            // });
            // // 开启透明度支持
            // prism.transparent = true;
            // this.prismData.push(prism);
            // // 添加至 3D 图层
            // this.object3Dlayer.add(prism);
        },
        // 清除
        clear() {
            if (this.state === 4) {
                this.polygonData.forEach(e => {
                    this.map.remove(e);
                }); //清除轮廓
            } else if (this.state === 3) {
                this.markerData.forEach(e => {
                    this.map.remove(e);
                }); //清除打点
            } else if (this.state === 1 || this.state === 2) {
                this.mouseTool.close(true)
            } else if (this.state === 5) {
                this.prismData.forEach(e => {
                    this.object3Dlayer.remove(e);
                }); //清除3d图层
            }
            this.state = 0;
        },
        //测距
        ranging() {
            this.ruler1.turnOn();
            // console.log(this.ruler1.addnode())
            this.ruler1.on('addnode', (marker, positon, type) => {
                console.log("添加标记", marker, positon, type)
            });
            this.ruler1.on('removenode', (target, polyline, points, distance) => {
                console.log("删除标记", target, polyline, points, distance)
            });
            this.ruler1.on('end', (target, polyline, points, distance) => {
                console.log("结束测距", target, polyline, points, distance)
            });
        },
        //利用行政区查询获取边界
        setAreaCover(areaName) {
            const opts = {
                showbiz: false, //是否显示商圈
                level: "province", //country：国家 province：省/直辖市 city：市 district：区/县 biz_area：商圈
                // subdistrict: 1, //显示下级行政区级数
                extensions: "all", // 是否返回行政区边界坐标点 默认值：base，不返回行政区边界坐标点 取值：all，返回完整行政区边界坐标点
            };
            const district = new AMap.DistrictSearch(opts);
            district.search(areaName, (status, result) => {
                const bounds = result.districtList[0].boundaries;
                const height = 1000;
                const color = [0, 0, 1, 0.051];//rgba
                const wall = new AMap.Object3D.Prism({
                    path: bounds,
                    height: height,
                    color: color,
                });
                wall.backOrFront = "both";
                wall.transparent = true;
                this.object3Dlayer.add(wall);
            });
        },
    },
    components: {},
};
</script>

<style lang="scss">
.amap {
    // width: 100%;
    // height: 100%;
    width: 3840px;
    height: 2160px;
    #map {
        width: 100%;
        height: 100%;
    }
    .tool-box {
        position: absolute;
        top: 50px;
        right: 50px;
    }
    .custom-content-marker {
        position: relative;
        width: 25px;
        height: 34px;
        img {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            bottom: 0;
        }
        .close-btn {
            position: absolute;
            top: -6px;
            right: -8px;
            width: 15px;
            height: 15px;
            font-size: 12px;
            background: #ccc;
            border-radius: 50%;
            color: #fff;
            text-align: center;
            line-height: 15px;
            box-shadow: -1px 1px 1px rgba(10, 10, 10, 0.2);
        }
        .close-btn:hover {
            background: #666;
        }
    }
}
</style>
