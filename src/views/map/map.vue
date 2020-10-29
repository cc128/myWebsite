/*
创建者：cc
模块名称：xxxx
备注：xxxx
*/
<template>
    <div id="map-box">
    </div>
</template>

<script>
export default {
    props: {},
    data() {
        return {
            width: 500,
            height: 500,
            scene: new THREE.Scene(), // 场景
            camera: null, //相机
            light: null, //光源
            renderer: new THREE.WebGLRenderer(), //渲染器
            Vector2: new THREE.Vector2(), //二维向量
            Vector3: new THREE.Vector3(), //三维向量
            fbxloader: new THREE.FBXLoader(), //FBX加载器
            initCameraXYZ: null, //初值相机位置
            planeGeometry: null, //平面
        };
    },
    computed: {},
    created() {
    },
    mounted() {
        this.init(); //初始化
        window.addEventListener("resize", this.throttle(() => {
            this.onResize(); //更新
        }, 1000 / 60));
        // window.addEventListener("resize", () => {
        //     this.onResize(); //更新
        // });
        // window.onresize = () => {
        //     return (() => {
        //         this.onResize(); //更新
        //     })()
        // }
    },
    watch: {},
    methods: {
        //-------------------------------------------------------------------------------------------执行渲染操作   指定场景、相机作为参数
        render() {
            this.renderer.render(this.scene, this.camera);
            this.$emit("ready", this.scene, {
                createModel: this.createModel,
                axesHelper: this.axesHelper, //辅助坐标系
                gridHelper: this.gridHelper, //平面辅助线
                cameraHelper: this.cameraHelper, //显示光照区域
            })
        },
        //-------------------------------------------------------------------------------------------更新
        onResize() {
            this.width = this.$el.offsetWidth;
            this.height = this.$el.offsetHeight;
            this.camera.aspect = (this.width / this.height)
            this.camera.updateProjectionMatrix()
            this.renderer.setSize(this.width, this.height)
            this.render()
        },
        //-------------------------------------------------------------------------------------------节流
        throttle(fn, delay = 300) {
            let later = 0;
            return function () {
                const now = Date.now();
                if (now - later > delay) {
                    fn.call(this);
                    later = now;
                }
            };
        },
        //-------------------------------------------------------------------------------------------初始化
        init() {
            this.width = this.$el.offsetWidth;
            this.height = this.$el.offsetHeight;
            this.createLight(); //光源
            this.createCamera(); //相机
            this.createRender(); //渲染器
        },
        //-------------------------------------------------------------------------------------------摄像机
        createCamera(params = { x: 1, y: 10, z: 10 }) {
            this.camera = new THREE.PerspectiveCamera(20, this.width / this.height, 0.1, 10000);
            this.camera.position.set(params.x, params.y, params.z); //设置相机位置
            this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)
            this.initCameraXYZ = JSON.parse(JSON.stringify(this.camera.position))
            // return this.camera;
        },
        //-------------------------------------------------------------------------------------------光源
        createLight() {
            // let light = new THREE.PointLight(0xffffff); //点光源/
            // let light = new THREE.SpotLight(0xffffff); //聚光灯光源
            let light = new THREE.DirectionalLight(0xffffff); //平行光
            // let light = new THREE.AmbientLight(0xffffff); //环境光--没有影子
            light.position.set(-150, 400, -300); //点光源位置
            light.shadow.camera.near = 0; //空间值--近边界
            light.shadow.camera.far = 1000; //空间值--远边界
            light.shadow.camera.left = -500; //空间值--左边界
            light.shadow.camera.right = 500; //空间值--右边界
            light.shadow.camera.top = 500; //空间值--上边界
            light.shadow.camera.bottom = -500; //空间值--下边界
            this.scene.add(light); //光源添加到场景中
            // 设置投影
            light.castShadow = true; //投射影子
            this.light = light;
            // return light;
        },
        //-------------------------------------------------------------------------------------------渲染器
        createRender() {
            this.renderer.setSize(this.width, this.height); //设置渲染区域尺寸
            this.renderer.setClearColor(0xffffff, 1); //设置背景颜色
            // this.scene.background = new THREE.CubeTextureLoader().load(["https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"]);; //作为背景贴图
            this.scene.background = new THREE.CubeTextureLoader()
                // .setPath(require("../../../public/model/"))
                .load([
                    // require('../../../public/model/gray_nx.jpg'),
                    // require('../../../public/model/gray_ny.jpg'),
                    // require('../../../public/model/gray_nz.jpg'),
                    // require('../../../public/model/gray_px.jpg'),
                    // require('../../../public/model/gray_py.jpg'),
                    // require('../../../public/model/gray_pz.jpg'),
                    require('../../../public/model/TropicalSunnyDay_px.jpg'),
                    require('../../../public/model/TropicalSunnyDay_nx.jpg'),
                    require('../../../public/model/TropicalSunnyDay_py.jpg'),
                    require('../../../public/model/TropicalSunnyDay_ny.jpg'),
                    require('../../../public/model/TropicalSunnyDay_pz.jpg'),
                    require('../../../public/model/TropicalSunnyDay_nz.jpg'),
                ], (e) => {
                    this.render()
                })
            this.renderer.shadowMap.enabled = true; // 启动阴影
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 默认的是，没有设置的这个清晰 THREE.PCFShadowMap
            if (this.$el) {
                this.$el.appendChild(this.renderer.domElement); //body元素中插入canvas对象
            } else {
                document.body.appendChild(this.renderer.domElement); //body元素中插入canvas对象
            }
            // this.renderer.render(this.scene, this.camera);
            let controls = new THREE.OrbitControls(this.camera, this.renderer.domElement); //创建控件对象
            // controls.zoomSpeed = 0.4; // 滚轮-滚动速度
            controls.rotateSpeed = 0.5; // 拖到旋转速度
            controls.dampingFactor = 0.1;
            controls.addEventListener("change", () => {
                // if (this.isMover) return;
                this.initCameraXYZ = JSON.parse(JSON.stringify(this.camera.position))
                // console.log(this.initCameraXYZ)
                // console.log(this.camera)
                this.renderer.render(this.scene, this.camera);
            }); //监听鼠标、键盘事件

            return this.renderer;
        },
        //-------------------------------------------------------------------------------------------平面
        createPlane(w = 200, h = 200, z = -0.1) {
            let planeGeometry = new THREE.PlaneGeometry(w, h);
            let material = new THREE.MeshLambertMaterial({
                color: 0xcccccc
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
        }, //平面
        //-------------------------------------------------------------------------------------------导入模型
        createModel(url, callBack) {
            return new Promise((resolve, reject) => {
                this.fbxloader.load(
                    url,
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
        },
        //-------------------------------------------------------------------------------------------辅助坐标系
        axesHelper(num = 10) {
            let AxesHelper = new THREE.AxesHelper(num);
            this.scene.add(AxesHelper);
        },
        //-------------------------------------------------------------------------------------------平面辅助线
        gridHelper(
            size = 50,
            divisions = 60,
            colorCenterLine = "",
            colorGrid = "#fff"
        ) {
            let gridHelper = new THREE.GridHelper(
                size,
                divisions,
                colorCenterLine,
                colorGrid
            );
            this.scene.add(gridHelper);
        },
        //-------------------------------------------------------------------------------------------显示光照区域
        cameraHelper() {
            let helper = new THREE.CameraHelper(this.light.shadow.camera);
            this.scene.add(helper);
        }
    },
    components: {},
};
</script>

<style scoped lang="scss">
#map-box {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
