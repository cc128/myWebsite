class pMap {
    constructor(el, config = {}) {
        this.el = el; //渲染的容器
        this.map = null; //地图,
        this.isMarker = false; //是否开启标记
        this.draw = null; //绘制实例
        this.view = {
            isHover: false,
            zoom: 4, //显示级别
            minZoom: 4, //最小显示级别
            maxZoom: 19, //最大显示级别
            center: [104.06667, 30.66667],
            ...config
        }
        this.viewObj = null;

        this.sketch; //当前绘制的要素
        // this.helpTooltipElement; //帮助提示框对象
        this.helpTooltip; //帮助提示框显示的信息
        this.measureTooltipElement; //测量工具提示框对象
        this.measureTooltip; //测量工具中显示的测量值
        this.listener; //监听器
        this.highlight;
        this.pointmove;
        this.selected = null;
        this.vectorLayer = null;
        this.initMap();
        this.featureOverlay;
    };
    // 初始化地图
    initMap() {
        this.view.center = this.coordinateTransform(this.view.center);
        this.viewObj = new ol.View({
            ...this.view
        })
        this.map = new ol.Map({
            target: this.el, //地图显示容器
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                }),
                // vector
                // this.vectorLayer
            ],
            view: this.viewObj
            // view: new ol.View({
            //     ...this.view,
            //     center: this.coordinateTransform(this.view.center),
            //     // projection: 'EPSG:4326',
            //     // projection: 'EPSG:3857',
            // }), //地图配置
        });
        // this.moverMap({
        //     center: this.coordinateTransform(this.view.center, false)
        // });
        // this.createScaleLine(); //比例尺
        this.forbidDDBclick(); //地图禁止双击
        if (this.view.isHover) {
            //鼠标经过
            this.pointmove = new ol.interaction.Select({
                condition: ol.events.condition.pointerMove,
                style: new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: "rgba(31, 89, 146, 0.24)"
                    }),
                    stroke: new ol.style.Stroke({
                        color: "rgba(62, 187, 228, 1)",
                        width: 2
                    }),
                }),
            });
            this.map.addInteraction(this.pointmove);
        }
        // var layerSwitcher = new ol.control.LayerSwitcher({});
        // map.addControl(layerSwitcher);
        // var ctls = this.map.getControls();
        // let ctlsLength = ctls.getArray().length;
        // for (let i = 0; i < ctlsLength; i) {
        //     this.map.removeControl(ctls.getArray()[0]);
        // }
        //放大缩小
        var Rotate = new ol.control.Rotate();
        this.map.addControl(Rotate);
        // setTimeout(() => {
        //     this.map.removeInteraction(this.pointmove);
        // }, 10000);
    };
    // 添加-鼠标移入-地图覆盖面
    addOndblClick(callBack) {
        this.map.on("dblclick", (e) => {
            var feature = this.map.forEachFeatureAtPixel(e.pixel, function (feature, layer) { return feature; });
            if (feature.values_.level) {
                if (feature.values_.level == "province") {
                    feature.level = "省";
                } else if (feature.values_.level == "city") {
                    feature.level = "市";
                } else if (feature.values_.level == "district") {
                    feature.level = "区";
                } else if (feature.values_.level == "town") {
                    feature.level = "镇";
                }
                feature.adcode = feature.values_.adcode;
                feature.name = feature.values_.name;
                feature.center = feature.values_.center;
                feature.centroid = feature.values_.centroid;
                feature.type = "area";
                callBack(feature, this.coordinateTransform(e.coordinate, false))
            } else {
                feature.type = "echarts";
                callBack(feature, this.coordinateTransform(e.coordinate, false))
            }
        })
    }
    // 添加瓦片（离线图）
    addTile(tile = ["http://192.168.2.232:83/roadmap/{z}/{x}/{y}.png"]) {
        let source;
        tile.forEach((e) => {
            source = new ol.source.XYZ({
                url: e //特别注意，这里的z-x-y的顺序
            })
            let coverage = new ol.layer.Tile({
                source: source
            });
            this.map.addLayer(coverage);
        })
        return source
    };
    // 地区覆盖面
    hoverMouse(p, callBack) {
        let params = {
            strokeWidth: 0,
            strokeColor: "rgba(0, 0, 0, 0)",
            fillColor: 'rgba(0, 0, 0, 0)',
            url: 'https://sudos.xrdev.cn/map/china.json',
            ...p
        }
        let vectorLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                url: params.url,
                format: new ol.format.GeoJSON()
            }),
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: params.fillColor
                }),
                stroke: new ol.style.Stroke({
                    color: params.strokeColor,
                    width: params.strokeWidth
                }),
            }),
            zIndex: 1
        }); //地图json
        vectorLayer.adcode = params.url.split("=")[1];
        // vectorLayer.type = "area";
        this.map.addLayer(vectorLayer);
        callBack(vectorLayer)
    }
    // 鼠标移动
    moverMouse(callBack, p) {
        let params = {
            strokeWidth: 2,
            strokeColor: "#3ebbe4",
            fillColor: 'rgba(0, 0, 0, 0.1)',
            ...p
        }
        var highlightStyle = new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: params.strokeColor,
                width: params.strokeWidth
            }), //边线颜色
            fill: new ol.style.Fill({
                color: params.fillColor
            }),//填充色
            // text: new ol.style.Text({
            //     font: '14px Calibri,sans-serif',
            //     fill: new ol.style.Fill({
            //         color: '#fff',
            //     }),
            //     stroke: new ol.style.Stroke({
            //         color: '#31b1ff',
            //         width: 3,
            //     }),
            // }),
        });
        this.featureOverlay = new ol.layer.Vector({
            source: new ol.source.Vector(),
            map: this.map,
            style: function (feature) {
                //     // highlightStyle.getText().setText(feature.get('name'));
                return highlightStyle;
            },
        });
        this.map.on('pointermove', (e) => {
            var pixel = this.map.getEventPixel(e.originalEvent);
            var hit = this.map.hasFeatureAtPixel(pixel);
            this.map.getTargetElement().style.cursor = hit ? 'pointer' : '';
            // //判断当前单击处是否有要素，捕获到要素时弹出popup
            var feature = this.map.forEachFeatureAtPixel(e.pixel, (feature) => { return feature; });
            callBack(e, this.coordinateTransform(e.coordinate, false), feature);
            if (e.dragging) {
                return;
            };
            // this.displayFeatureInfo(pixel)
            // if (this.highlight) {
            //     this.featureOverlay.getSource().removeFeature(this.highlight);
            // }
        });
    };

    //定义事件响应函数
    displayFeatureInfo(pixel) {
        // //对于每个与事件像素点相交的图层上的多个Feature执行回调函数--返回每个Feature
        var feature = this.map.forEachFeatureAtPixel(pixel, (feature) => {
            return feature;
        });
        if (feature !== this.highlight) {
            if (this.highlight) {
                this.featureOverlay.getSource().removeFeature(this.highlight);
            }
            if (feature) {
                this.featureOverlay.getSource().addFeature(feature);
            }
            this.highlight = feature;
        }
        return feature;
    };
    // 开启地图标点功能
    openMarker(p) {
        this.isMarker = 1;
        this.map.on("click", (e) => {
            if (this.isMarker === 1) {
                var feature = this.map.forEachFeatureAtPixel(e.pixel, function (feature, layer) { return feature; });
                if (feature) return
                this.addMarker({ ...p, XY: this.coordinateTransform(e.coordinate, false) })
            }
        })
    };
    // 地图点击事件
    clickMouse(callBack) {
        this.map.on("click", (e) => {
            var feature = this.map.forEachFeatureAtPixel(e.pixel, function (feature, layer) { return feature; });
            if (feature) return
            callBack(e)
        })
    };
    /*
        地图上标记点位
        isMover：布尔值, //是否可拖动
        XY：[经度, 纬度],
        anchor:[0.5, height], anchor[0]--取值范围0-1，水平对齐位置，anchor[1]--为图片高度，原图高度垂直对齐位置
    */
    addMarker(p) {
        let params = {
            XY: [104.06667, 30.66667],
            isMover: false,
            url: "https://webapi.amap.com/theme/v1.3/markers/b/start.png",
            ...p
        }
        const vectorSource = new ol.source.Vector();
        let labelFeature = new ol.Feature({
            geometry: new ol.geom.Point(this.coordinateTransform(params.XY))
        });
        // 标注样式
        const labelStyle = new ol.style.Style({
            image: new ol.style.Icon({
                src: params.url,
                scale: params.scale || 1,
                anchor: params.anchor || [0.5, 60],
                anchorOrigin: 'top-right',
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                offsetOrigin: 'top-right',
            })
        });
        // 设置标注的样式
        labelFeature.setStyle(labelStyle);
        // 将标注要素添加到矢量图层中
        vectorSource.addFeature(labelFeature);
        // 创建矢量层
        let vector = new ol.layer.Vector({
            source: vectorSource
        });
        // this.VectorData.push(vector);
        this.map.addLayer(vector);
        vector.id = String(Math.random());
        if (params.isMover) {
            // 增加可移动点位元素
            let iconTranslate = new ol.interaction.Translate({
                features: new ol.Collection([labelFeature])
            })
            this.map.addInteraction(iconTranslate);
            // 为元素增加事件
            iconTranslate.on("translateend", () => {
                let clickPoint = labelFeature.getGeometry().flatCoordinates;
                // 将点位转成EPSG:4326坐标系
                // console.log(this.coordinateTransform(clickPoint, false));
                if (params.moverSeat) {
                    params.moverSeat(vector, this.coordinateTransform(clickPoint, false))
                }
            })
        }
        if (params.clickLocation) {
            params.clickLocation(vector, params.XY); // 返回当前点位
        }
    };
    /*
        多边形覆盖面
        p.data; 经纬度数据
        callBack; 回调方法
    */
    addPolygon(p, callBack) {
        let params = {
            data: [],
            strokeWidth: 2,
            strokeColor: "red",
            fillColor: 'rgba(0, 0, 0, 0.2)',
            properties: {},
            ...p
        }
        let arr = [];
        // console.log(params.data, 333333)
        params.data.forEach(e => {
            e[0] = Number(e[0]);
            e[1] = Number(e[1]);
            arr.push(this.coordinateTransform(e))
        });
        //创建一个多边形
        var Polygon = new ol.Feature({
            geometry: new ol.geom.Polygon([arr])
        });
        //设置区样式信息
        Polygon.setStyle(new ol.style.Style({
            //填充色
            fill: new ol.style.Fill({
                color: params.fillColor
            }),
            //边线颜色
            stroke: new ol.style.Stroke({
                color: params.strokeColor,
                width: params.strokeWidth
            }),
        }));
        //实例化一个矢量图层Vector作为绘制层
        var source = new ol.source.Vector({
            features: [Polygon]
        });
        //创建一个图层
        var vector = new ol.layer.Vector({
            source: source
        });
        // this.VectorData.push(vector)
        //将绘制层添加到地图容器中
        vector.id = String(Math.random());
        vector.properties = params.properties;
        this.map.addLayer(vector);
        callBack(vector);
    };
    // 绘制多边形 LineString/Polygon
    drawPolygon(p, callBack) {
        let params = {
            type: "Polygon", // Polygon为画面积-LineString为画线
            fillColor: 'rgba(0, 0, 0, 0.2)', //背景色
            strokeColor: "red", //线的颜色
            strokeWidth: 2, // 线的宽度
            isValue: false, // 是否显示测量的值
            ...p
        }
        this.map.removeInteraction(this.draw);
        //实例化一个矢量图层Vector作为绘制层
        var source = new ol.source.Vector();
        var vector = new ol.layer.Vector({
            source: source,
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: params.fillColor
                }),
                stroke: new ol.style.Stroke({
                    color: params.strokeColor,
                    width: params.strokeWidth
                }),
            })
        });
        // this.VectorData.push(vector);
        vector.isValue = params.isValue;
        this.map.addLayer(vector); //将绘制层添加到地图容器中
        //实例化交互绘制类对象并添加到地图容器中
        this.draw = new ol.interaction.Draw({
            //绘制层数据源
            source: source,
            /** @type {ol.geom.GeometryType}几何图形类型 */
            type: params.type,//绘制类型
            //最大点数
            // maxPoints: 3,
        });
        this.map.addInteraction(this.draw);
        this.draw.on('drawstart', (evt) => {
            vector.id = String(Math.random());
            if (params.isValue) {
                this.createMeasureTooltip(vector.id); //创建测量工具提示框
                // this.createHelpTooltip(); //创建帮助提示框
                this.sketch = evt.feature; //绘制的要素
                var tooltipCoord = evt.coordinate;// 绘制的坐标
                //绑定change事件，根据绘制几何类型得到测量长度值或面积值，并将其设置到测量工具提示框中显示
                this.listener = this.sketch.getGeometry().on('change', (e) => {
                    var geom = e.target;//绘制几何要素
                    var output;
                    if (geom instanceof ol.geom.Polygon) {
                        output = this.formatArea(geom);//面积值
                        tooltipCoord = geom.getInteriorPoint().getCoordinates();//坐标
                    } else if (geom instanceof ol.geom.LineString) {
                        output = this.formatLength(geom);//长度值
                        tooltipCoord = geom.getLastCoordinate();//坐标
                    }
                    this.measureTooltipElement.innerHTML = output;//将测量值设置到测量工具提示框中显示
                    this.measureTooltip.setPosition(tooltipCoord);//设置测量工具提示框的显示位置
                });
            }
        });
        this.draw.on("drawend", e => {
            if (params.isValue) {
                // this.measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
                this.measureTooltip.setOffset([0, -7]);
                this.sketch = null;
                this.measureTooltipElement = null;
                this.createMeasureTooltip();
            }

            var feature = e.feature;
            var geometry = feature.getGeometry();
            var coordinate = geometry.getCoordinates();
            let arr = [];
            coordinate[0].forEach(item => {
                arr.push(this.coordinateTransform(item, false));
            })
            ol.Observable.unByKey(this.listener);
            callBack(arr, vector);
        })
    };
    // 返回多边形的面积
    formatArea(polygon) {
        let area = polygon.getArea();//直接获取多边形的面积
        let output;
        if (area > 10000) {
            output = (Math.round(area / 1000000 * 100) / 100) + ' ' + 'km<sup>2</sup>'; //换算成KM单位
        } else {
            output = (Math.round(area * 100) / 100) + ' ' + 'm<sup>2</sup>';//m为单位
        }
        return output;
    };
    //返回线的长度
    formatLength = function (line) {
        let length = line.getLength();
        let output;
        if (length > 100) {
            output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
        } else {
            output = Math.round(length * 100) / 100 + ' ' + 'm';
        }
        return output;
    };
    //创建测量工具提示框
    createMeasureTooltip(id) {
        if (this.measureTooltipElement) {
            this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement);
        }
        this.measureTooltipElement = document.createElement('div');
        if (id) {
            this.measureTooltipElement.id = id
        }
        this.measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
        this.measureTooltip = new ol.Overlay({
            element: this.measureTooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center',
        });
        this.map.addOverlay(this.measureTooltip);
    };

    closeMarker() {
        this.isMarker = null;
    };
    // 清除图层
    clear(e) {
        // alert(e.isValue)
        this.map.removeLayer(e);
        // if (e.isValue) {
        //     // document.getElementById(e.id).parentNode.remove()
        // }
    };
    // 关闭绘制功能
    closeDraw() {
        this.map.removeInteraction(this.draw);
    };
    //创建比例尺控件
    createScaleLine() {
        var scaleLineControl = new ol.control.ScaleLine({
            units: 'metric',
            target: 'scalebar',
            className: 'ol-scale-line'
        });
        this.map.addControl(scaleLineControl);
    };
    // 移动地图
    moverMap(p) {
        let params = {
            center: this.coordinateTransform(this.view.center, false),
            duration: 2000,
            zoom: this.view.zoom,
            ...p
        }
        // var london = ol.proj.fromLonLat(this.coordinateTransform(center));//伦敦的坐标
        this.viewObj.animate({
            zoom: params.zoom,
            center: this.coordinateTransform(params.center),
            duration: params.time,
        });
    };
    // 地图-标注
    addLabel(p, callBack) {
        let params = {
            XY: [105.6476018865204, 28.742805396403895],
            url: "https://webapi.amap.com/theme/v1.3/markers/b/start.png",
            width: "19",
            height: "30",
            ...p
        }
        params.XY = this.coordinateTransform(params.XY)
        let el
        if (params.el) {
            el = params.el;
        } else {
            let width = Number(params.width) ? params.width + "px" : params.width;
            let height = Number(params.height) ? params.height + "px" : params.height;
            let img = document.createElement("img");
            img.src = params.url;
            img.style.width = width;
            img.style.height = height;
            img.style.position = "relative";
            img.style.left = -(parseInt(params.width) / 2) + ((width).toString().slice(parseInt(params.width).toString().length));
            img.style.top = -(parseInt(params.height)) + ((height).toString().slice(parseInt(params.height).toString().length))
            img.style.cursor = "pointer";
        }
        let dot = new ol.Overlay({
            element: el
        });
        el.onclick = e => {
            callBack(e, dot)
        }
        dot.setPosition(params.XY)
        // this.dotData.push(dot)
        this.map.addOverlay(dot);
        if (callBack) {
            callBack(dot)
        }
    };
    //清除点位
    removeOverlay(e) {
        this.map.removeOverlay(e);
    };
    // 地图禁止双击
    forbidDDBclick() {
        const dblClickInteraction = this.map
            .getInteractions()
            .getArray()
            .find(interaction => {
                return interaction instanceof ol.interaction.DoubleClickZoom;
            });
        this.map.removeInteraction(dblClickInteraction);
    };
    //经纬度/坐标==转换
    coordinateTransform(XY, type = true) {
        if (type) {
            return ol.proj.transform(XY, 'EPSG:4326', 'EPSG:3857'); //经纬度转坐标
        } else {
            return ol.proj.transform(XY, 'EPSG:3857', 'EPSG:4326'); //坐标转经纬度
        }
    };
    // //创建帮助提示框
    // createHelpTooltip() {
    //     if (this.helpTooltipElement) {
    //         this.helpTooltipElement.parentNode.removeChild(this.helpTooltipElement);
    //     }
    //     this.helpTooltipElement = document.createElement('div');
    //     this.helpTooltipElement.className = 'ol-tooltip hidden';
    //     this.helpTooltip = new ol.Overlay({
    //         element: this.helpTooltipElement,
    //         offset: [15, 0],
    //         positioning: 'center-left'
    //     });
    //     this.map.addOverlay(this.helpTooltip);
    // }
    // 关闭标记点位功能
}