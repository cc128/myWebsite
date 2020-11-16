class contentScene {
    constructor(el) {
        this.el = el; //渲染的容器
        this.width = this.el ? this.el.offsetWidth : window.innerWidth; //窗口宽度
        this.height = this.el ? this.el.offsetHeight : window.innerHeight; //窗口高度
        this.scene = new THREE.Scene(); // 场景
        this.renderer = new THREE.WebGLRenderer(); //渲染器
        this.camera = null; //相机
        this.light = null; //光源
        this.mouse = new THREE.Vector2(); //二维向量
        this.initCameraXYZ = null; //初值相机位置
    }
    createLight() {
        // let light = new THREE.PointLight(0xffffff); //点光源/
        // let light = new THREE.SpotLight(0xffffff); //聚光灯光源
        let light = new THREE.DirectionalLight(0xffffff); //平行光
        // let light = new THREE.AmbientLight(0xffffff); //环境光--没有影子
        light.position.set(-150, 400, -300); //点光源位置
        light.shadow.camera.near = 0;
        light.shadow.camera.far = 1000;
        light.shadow.camera.left = -500;
        light.shadow.camera.right = 500;
        light.shadow.camera.top = 500;
        light.shadow.camera.bottom = -500;
        this.scene.add(light); //光源添加到场景中
        // 设置投影
        light.castShadow = true; //投射影子
        this.light = light;
        return light;
    } //  光源
    createCamera(params = { x: 0, y: 300, z: 300 }) {
        this.camera = new THREE.PerspectiveCamera(20, this.width / this.height, 0.1, 10000);
        this.camera.position.set(params.x, params.y, params.z); //设置相机位置
        this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)
        this.initCameraXYZ = JSON.parse(JSON.stringify(this.camera.position))
        return this.camera;
    } // 摄像机
    createRender() {
        this.renderer.setSize(this.width, this.height); //设置渲染区域尺寸
        // this.renderer.setClearColor(0xffffff, 1); //设置背景颜色
        // this.scene.background = new THREE.CubeTextureLoader().load(["https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"]);; //作为背景贴图
        this.scene.background = new THREE.CubeTextureLoader()
            .setPath('./model/')
            .load([
                // 'gray_nx.jpg',
                // 'gray_ny.jpg',
                // 'gray_nz.jpg',
                // 'gray_px.jpg',
                // 'gray_py.jpg',
                // 'gray_pz.jpg',
                'TropicalSunnyDay_px.jpg',
                'TropicalSunnyDay_nx.jpg',
                'TropicalSunnyDay_py.jpg',
                'TropicalSunnyDay_ny.jpg',
                'TropicalSunnyDay_pz.jpg',
                'TropicalSunnyDay_nz.jpg',
            ]);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 默认的是，没有设置的这个清晰 THREE.PCFShadowMap
        if (this.el) {
            this.el.appendChild(this.renderer.domElement); //body元素中插入canvas对象
        } else {
            document.body.appendChild(this.renderer.domElement); //body元素中插入canvas对象
        }
        this.renderer.render(this.scene, this.camera);
        let controls = new THREE.OrbitControls(
            this.camera,
            this.renderer.domElement
        ); //创建控件对象
        // controls.zoomSpeed = 0.4; // 滚轮-滚动速度
        controls.rotateSpeed = 0.5; // 拖到旋转速度
        controls.dampingFactor = 0.1;
        controls.addEventListener("change", () => {
            // if (this.isMover) return;
            this.initCameraXYZ = JSON.parse(JSON.stringify(this.camera.position))
            // console.log(this.initCameraXYZ)
            console.log(this.camera)
            this.renderer.render(this.scene, this.camera);
        }); //监听鼠标、键盘事件

        return this.renderer;
    } //  渲染器
    gridHelper(
        size = 200,
        divisions = 20,
        colorCenterLine = "red",
        colorGrid = "#fff"
    ) {
        let gridHelper = new THREE.GridHelper(
            size,
            divisions,
            colorCenterLine,
            colorGrid
        );
        this.scene.add(gridHelper);
    } //平面辅助线
    axesHelper(num = 200) {
        let AxesHelper = new THREE.AxesHelper(num);
        this.scene.add(AxesHelper);
    } // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
    cameraHelper() {
        let helper = new THREE.CameraHelper(this.light.shadow.camera);
        this.scene.add(helper);
    } //显示光照区域
    render() {
        this.renderer.render(this.scene, this.camera);
    } //执行渲染操作   指定场景、相机作为参数
    createPlane(w = 200, h = 200, z = -0.1) {
        let planeGeometry = new THREE.PlaneGeometry(w, h);
        let material = new THREE.MeshLambertMaterial({
            color: 0xffffff
            // wireframe: true
        }); //Lambert网格材质，与光照有反应，漫反射
        let plane = new THREE.Mesh(planeGeometry, material);
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.set(0, z, 0); //位置
        this.scene.add(plane);
        // 设置投影
        plane.receiveShadow = true;
        this.planeGeometry = plane;
        // console.log(plane);
    } //平面
}
class MAP3D extends contentScene {
    constructor(el) {
        super(el);
        this.provinceInfo = document.getElementById("provinceInfo");
        this.activeInstersect = [];
        this.eventOffset = {};
        this.markingObj = {}; // 标记地点three对象
        this.linkZ = 10; //线条弧度
        this.raycaster = new THREE.Raycaster(); //Raycaster(光射线投射)，可以获取鼠标经过哪个物体上。
        this.map = new THREE.Object3D(); // 建一个空对象存放对象
        this.fileLoader = new THREE.FileLoader(); //文件加载器
        this.circularRadio = 1; // 圆锥体和球体直径
        this.circularHeight = 2; // 标记圆锥体高度
        this.shapeGeometryObj = {}; // three中shapeGeometry对象数组
        this.mapData = null; // 地图数据
        this.metapNum = 150; // 迁徙路径分段数
        this.meshLineColor = "red"; // 迁徙轨迹颜色// 轨迹标记颜色
        this.lineWidth = 20; // 迁徙线条宽度
        this.markingNum = 50; // 迁徙路径标记分段数
        this.dotWidth = 0.5; // 线条上运动的点宽度
        this.areaData = {
            marking: [
                {
                    textValue: "北京",
                    fontColor: "#c6aa0e",
                    fontSize: 14,
                    pos: [116.4551, 40.1439]
                },
                {
                    textValue: "上海",
                    fontColor: "#af0da9",
                    fontSize: 14,
                    pos: [121.480539, 31.235929]
                }
            ]
        }; //地区信息
        // this.getMap(); //获取地图json资源
        this.mapParams = {
            url: "./map/全国.json", //地图地址
            tier: 1, //地图大小
            mapColor: "#02A1E2", // 地图正面颜色
            frontTransparency: 0.5, // 正面透明度
            sideTransparency: 0.5, // 侧面透明度
            moveMapColor: "#ff0000", // 地图鼠标移入颜色
            sideMapColor: "#02A1E2", // 地图侧边颜色
            markingColor: "#B48872", // 标记颜色
            borderColor: "#fff", //地图边框颜色
            textBackground: "rgba(0,0,0,0.8)", // 打点文字背景颜色
            zHeight: 4,  // 地图z轴厚度
            centrepoint: [104.0, 37.5], //地图中心点
            areaData: [],
        }
    }
    //获取地图json资源
    getMap(params) {
        let num = this.map.children.length
        for (let i = 0; i < num; i++) {
            this.map.remove(this.map.children[0]);
        }
        this.mapParams = { ...this.mapParams, ...params };
        this.fileLoader.load(this.mapParams.url, e => {
            this.mapData = JSON.parse(e);
            console.log(this.mapData, 11111)
            this.mapParams.centrepoint = this.mapData.features[0].properties.centroid || this.mapData.features[0].properties.cp;
            this.initMap(JSON.parse(e),); // 绘制地图
            // this.drawMetap(); //绘制线图
            // this.frawFontMarking(); // 绘制标记函数
        });
    }
    async initMap(chinaJson) {
        let num = this.mapParams.tier === 1 ? 100 : (this.mapParams.tier === 2 ? 1000 : 100)
        // 墨卡托投影转换
        this.projection = d3
            .geoMercator()
            .center(this.mapParams.centrepoint)
            .scale(num)
            .translate([0, 0]);
        // console.log(d3, 111111)
        // function aaa() {
        //     let textureLoader = new THREE.TextureLoader(); // TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
        //     return new Promise((resolve, reject) => {
        //         textureLoader.load("/c.png", texture => {
        //             var material = new THREE.MeshLambertMaterial({
        //                 // color: 0x0000ff,
        //                 // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
        //                 map: texture //设置颜色贴图属性值
        //             }); //材质对象Material
        //             resolve(material);
        //         });
        //     });
        // }
        // let a = await aaa();
        chinaJson.features.forEach(elem => {
            const province = new THREE.Object3D(); // 定一个省份3D对象
            const coordinates = elem.geometry.coordinates; // 每个的 坐标 数组
            coordinates.forEach(multiPolygon => {
                multiPolygon.forEach(polygon => {
                    const shape = new THREE.Shape();
                    const lineMaterial = new THREE.LineBasicMaterial({
                        color: this.mapParams.borderColor,
                        // lineWidth: 500
                    });
                    const lineGeometry = new THREE.Geometry();
                    for (let i = 0; i < polygon.length; i++) {
                        const [x, y] = this.projection(polygon[i]);
                        if (i === 0) {
                            shape.moveTo(x, -y);
                        }
                        shape.lineTo(x, -y);
                        lineGeometry.vertices.push(
                            new THREE.Vector3(x, -y, 4.15)
                        );
                    }
                    const extrudeSettings = {
                        depth: this.mapParams.zHeight,
                        bevelEnabled: false
                    }; //地图厚度
                    const geometry = new THREE.ExtrudeGeometry(
                        shape,
                        extrudeSettings
                    );
                    const material = new THREE.MeshBasicMaterial({
                        color: this.mapParams.mapColor,
                        transparent: true,
                        opacity: this.mapParams.frontTransparency
                    });  // 地图正面
                    const material1 = new THREE.MeshBasicMaterial({
                        color: this.mapParams.sideMapColor,
                        transparent: true,
                        opacity: this.mapParams.sideTransparency
                    }); // 地图侧面
                    const mesh = new THREE.Mesh(geometry, [
                        material,
                        material1
                    ]);
                    // const mesh = new THREE.Mesh(geometry, a);
                    const line = new THREE.Line(lineGeometry, lineMaterial);
                    province.add(mesh);
                    province.add(line);
                });
            }); // 循环坐标数组
            // 将geo的属性放到省份模型中
            province.properties = elem.properties;
            if (elem.properties.contorid) {
                const [x, y] = this.projection(elem.properties.contorid);
                province.properties.centroid = [x, y];
            }
            this.map.add(province);
        });
        this.map.rotation.x = -0.5 * Math.PI;
        // this.map.scale.set(1.5, 1.5, 1.5)
        // this.map.scale = {
        //     x: 0.9,
        //     y: 0.9,
        //     z: 0.9
        // }
        this.scene.add(this.map);
        this.render();
        this.setRaycaster();
    }
    //计算鼠标位置的标准化设备坐标
    setRaycaster() {
        let onMouseMove = event => {
            //将鼠标点击位置的屏幕坐标转换成threejs中的标准坐标
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            this.eventOffset.x = event.clientX;
            this.eventOffset.y = event.clientY;
            this.provinceInfo.style.left = this.eventOffset.x + 2 + "px"; // 动态设置提示框的位置
            this.provinceInfo.style.top = this.eventOffset.y + 2 + "px"; // 动态设置提示框的位置
            this.createProvinceInfo();
            this.animate();
        };
        let onMouseClick = event => {
            //将鼠标点击位置的屏幕坐标转换成threejs中的标准坐标
            // this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            // this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            this.animate("click");
        };
        window.addEventListener("mousemove", onMouseMove, false);
        window.addEventListener("click", onMouseClick, false);
    }
    animate(Event) {
        // requestAnimationFrame(this.animate.bind(this));
        // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
        this.raycaster.setFromCamera(this.mouse, this.camera);
        if (this.map) {
            // 计算与拾取射线相交的物体
            let intersects = this.raycaster.intersectObjects(
                this.map.children,
                true
            );
            if (intersects.length && Event === "click") {
                let areaValue = this.mapParams.areaData.filter((e) => {
                    return e.name === this.activeInstersect[0].object.parent.properties.name
                })
                if (areaValue.length) {
                    this.getMap(areaValue[0]);
                }
            } else {
                if (this.activeInstersect && this.activeInstersect.length > 0) {
                    this.activeInstersect.forEach(element => {
                        element.object.material[0].color.set(this.mapParams.mapColor);
                        element.object.material[1].color.set(this.mapParams.sideMapColor);
                    });
                }
                this.activeInstersect = [];
                for (let i = 0; i < intersects.length; i++) {
                    if (intersects[i].object.material && intersects[i].object.material.length === 2) {
                        this.activeInstersect.push(intersects[i]);
                        intersects[i].object.material[0].color.set(
                            this.mapParams.moveMapColor
                        );
                        intersects[i].object.material[1].color.set(
                            this.mapParams.moveMapColor
                        );
                        intersects[i].object.geometry.parameters.options.depth =
                            Math.random() * 10;
                        intersects[i].object.geometry.needsUpdate = true;
                        break; // 只取第一个
                    }
                }
            }
        }
        this.renderer.render(this.scene, this.camera);
    }
    // 显示省份的信息
    createProvinceInfo() {
        if (this.activeInstersect.length !== 0 && this.activeInstersect[0].object.parent.properties.name) {
            let properties = this.activeInstersect[0].object.parent.properties;
            this.provinceInfo.textContent = properties.name;
            // visibility
            this.provinceInfo.style.display = "block";
            document.body.style.cursor = "pointer"
        } else {
            this.provinceInfo.style.display = "none";
            document.body.style.cursor = "default"
        }
    }
    //绘制线图
    drawMetap() {
        // 经纬度信息
        var metapArray = [];
        // 组装线条连接经纬度信息
        this.areaData.marking.forEach(e => {
            const [x, y] = this.projection(e.pos);
            metapArray.push({
                x: x,
                y: -y,
                z: this.mapParams.zHeight
            });
        });
        // 线条集合
        var animateDots = [];
        // 存放线条对象集合
        var groupLines = new THREE.Group();
        // 绘制迁徙线条
        metapArray.forEach((metapItem, metapIndex) => {
            if (metapIndex > 0) {
                var line = this.drawMetapLine(metapArray[0], metapItem);
                groupLines.add(line.lineMesh);
                animateDots.push(line.curve.getPoints(this.metapNum));
            }
        });
        // 添加迁徙线条到场景中
        groupLines.rotation.x = -0.5 * Math.PI;
        this.scene.add(groupLines);
        // 添加线上滑动的物质
        var aGroup = new THREE.Group();
        for (var i = 0; i < animateDots.length; i++) {
            for (var j = 0; j < this.markingNum; j++) {
                var aGeo = new THREE.SphereGeometry(this.dotWidth, 10, 10);
                var aMater = new THREE.MeshPhongMaterial({
                    color: this.mapParams.markingColor,
                    transparent: true,
                    opacity: 1 - (j * 1) / this.markingNum
                });
                var aMesh = new THREE.Mesh(aGeo, aMater);
                aGroup.add(aMesh);
            }
        }
        var vIndex = 0;
        // 表示第一次循环运行
        var firstBool = true;
        let animationLine = () => {
            this.render();
            aGroup.children.forEach((elem, index) => {
                var _index = parseInt(index / this.markingNum);
                // 保证当前数组与迁徙轨迹匹配
                var index2 = index - _index * this.markingNum;
                var _vIndex = 0;
                if (firstBool) {
                    _vIndex =
                        vIndex - (index2 % this.markingNum) >= 0
                            ? vIndex - (index2 % this.markingNum)
                            : 0;
                } else {
                    _vIndex =
                        vIndex - (index2 % this.markingNum) >= 0
                            ? vIndex - (index2 % this.markingNum)
                            : 150 + vIndex - index2;
                }
                var v = animateDots[_index][_vIndex];
                elem.position.set(v.x, v.y, v.z);
            });
            vIndex++;
            if (vIndex > this.metapNum) {
                vIndex = 0;
            }
            if (vIndex == 150 && firstBool) {
                firstBool = false;
            }
            requestAnimationFrame(animationLine);
        };
        aGroup.rotation.x = -0.5 * Math.PI;
        this.scene.add(aGroup);
        animationLine();
    }
    // 绘制标记函数
    frawFontMarking() {
        this.areaData.marking.forEach((e, i) => {
            var average = this.getAverage();
            const [x, y] = this.projection(e.pos);
            var markingGroup = new THREE.Group();
            // 圆锥体
            var cylinder = new THREE.Mesh(
                new THREE.CylinderGeometry(
                    this.circularRadio,
                    0,
                    this.circularHeight,
                    50,
                    50,
                    false
                ),
                new THREE.MeshBasicMaterial({
                    color: this.mapParams.markingColor
                })
            );
            // 球体
            var ball = new THREE.Mesh(
                new THREE.SphereGeometry(this.circularRadio, 30, 30),
                new THREE.MeshBasicMaterial({
                    color: this.mapParams.markingColor
                })
            );
            ball.position.set(x, -y, this.circularHeight + this.mapParams.zHeight);
            cylinder.position.set(
                x,
                -y,
                this.circularHeight / 2 + this.mapParams.zHeight
            );
            cylinder.rotation.x = 1.5;
            // 添加文字说明
            var textLength = e.textValue.split("").length;
            var texture = new THREE.CanvasTexture(
                this.getCanvasFont(
                    textLength * e.fontSize * average,
                    e.fontSize * average,
                    e.textValue,
                    e.fontColor
                )
            );
            var fontMesh = new THREE.Sprite(
                new THREE.SpriteMaterial({
                    map: texture
                })
            );
            fontMesh.scale.x = (e.fontSize / average) * textLength;
            fontMesh.scale.y = e.fontSize / average;
            // 定义提示文字显示位置
            fontMesh.position.set(x, -y, this.mapParams.zHeight * 2);
            markingGroup.add(ball);
            markingGroup.add(cylinder);
            markingGroup.add(fontMesh);
            this.markingObj["markingGroup" + i] = markingGroup;
            markingGroup.rotation.x = -0.5 * Math.PI;
            this.scene.add(markingGroup);
        });
    }
    // canvas实现文字函数
    getCanvasFont(w, h, textValue, fontColor) {
        var canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = this.mapParams.textBackground;
        ctx.fillRect(0, 0, w, h);
        ctx.font = h + "px '微软雅黑'";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = fontColor;
        ctx.fillText(textValue, w / 2, h / 2);
        // document.body.append(canvas);
        return canvas;
    }
    // 获取average函数
    getAverage() {
        var average = 0;
        if (this.el.clientWidth > this.el.clientHeight) {
            average = this.el.clientHeight / 180;
        } else {
            average = this.el.clientWidth / 360;
        }
        return average;
    }
    // 绘制迁徙线条函数
    drawMetapLine(v0, v3) {
        var v1 = {};
        v1.x = (v0.x + v3.x) / 2;
        v1.y = (v0.y + v3.y) / 2;
        v1.z = this.linkZ;
        // 绘制贝塞尔曲线
        var curve = new THREE.CubicBezierCurve3(v0, v1, v1, v3);
        var geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        var line = new MeshLine();
        line.setGeometry(geometry);
        var material = new MeshLineMaterial({
            color: this.meshLineColor,
            lineWidth: this.lineWidth
        });
        return {
            curve: curve,
            lineMesh: new THREE.Mesh(line.geometry, material)
        };
    }
}
class SCENE extends contentScene {
    constructor(el) {
        super(el);
        // this.isMover = false;
        this.fbxloader = new THREE.FBXLoader(); //FBX加载器

        this.mixer = null;
        this.fbx = null; //模型

        this.clock = new THREE.Clock(); // 创建一个时钟对象Clock

        this.AnimationAction = null; //动画

        // this.createLight(); //光源
        // this.createCamera(); //摄像机
        // this.createRender(); //渲染器

        this.planeGeometry = null; //平面
        this.stop = null;
    }
    createGlobe() {
        let geometry = new THREE.SphereGeometry(60, 25, 25);
        let textureLoader = new THREE.TextureLoader(); // TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
    }
    // 导入模型
    createFBX(callBack) {
        return new Promise((resolve, reject) => {
            this.fbxloader.load(
                "./Walk.fbx",
                fbx => {
                    this.fbx = fbx;
                    fbx.traverse(item => {
                        if (item instanceof THREE.Mesh) {
                            item.castShadow = true;
                            item.receiveShadow = true;
                        }
                    });
                    this.scene.add(fbx);
                    this.createAnimation(fbx);
                    resolve(fbx);
                },
                onProgress => {
                    callBack(onProgress);
                },
                onError => {
                    reject(onError);
                }
            );
        });
    }
    //加载模板动画
    createAnimation(fbx) {
        this.mixer = new THREE.AnimationMixer(fbx);
        let AnimationAction = this.mixer.clipAction(fbx.animations[0]);
        // AnimationAction.timeScale = 1; //默认1，可以调节播放速度
        // AnimationAction.loop = THREE.LoopOnce; //不循环播放
        // AnimationAction.clampWhenFinished=true;//暂停在最后一帧播放的状态
        AnimationAction.play(); //播放动画
        this.AnimationAction = AnimationAction;
        this.runAnimation();
        // 渲染函数
        // const render = () => {
        //     this.renderer.render(this.scene, this.camera); //执行渲染操作
        //     window.requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
        //     if (mixer !== null) {
        //         //clock.getDelta()方法获得两帧的时间间隔
        //         // 更新混合器相关的时间
        //         // console.log(clock.getDelta(), 1111);
        //         mixer.update(0.015);
        //     }
        // };
        // render();
    }
    //执行动画-每次多少帧
    runAnimation(isContinue) {
        // this.isMover = false;
        // this.mixer.update(0.0167); //一帧时间
        this.mixer.update(0.0334); //二帧时间
        this.render();
        // if (isContinue) {
        //     window.cancelAnimationFrame(this.stop); //可以取消该次动画。
        // } else {
        //     const render = () => {
        //         this.renderer.render(this.scene, this.camera); //执行渲染操作
        //         this.stop = requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
        //         if (this.mixer !== null) {
        //             //clock.getDelta()方法获得两帧的时间间隔
        //             // 更新混合器相关的时间
        //             // console.log(clock.getDelta(), 1111);
        //             this.mixer.update(0.0167);
        //         }
        //     };
        //     render();
        // }
    }
    //移动
    moverModel(x = 0, y = 0, z = 0) {
        this.fbx.position.set(x, y, z);
        // console.log(this.initCameraXYZ)
        // this.camera.position.set(x + this.initCameraXYZ.x, y + this.initCameraXYZ.y, z + this.initCameraXYZ.z); //设置相机位置
        // console.log(this.camera.position);
    }
    //旋转-方向
    rotateModel(x = 0, y = 0, z = 0) {
        this.fbx.rotation.set(x, y, z);
    }
    animationStop() {
        // 共42帧
        this.mixer.update(0.7014); //最后1帧时间
        this.render();
    }
}
