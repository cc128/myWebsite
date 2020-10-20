/*
创建者：cc
模块名称：xxxx
备注：xxxx
*/
<template>
    <div id="map-box"></div>
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
            initCameraXYZ: null, //初值相机位置
            planeGeometry: null, //平面
        };
    },
    computed: {},
    created() {
        this.createLight(); //光源
        this.createCamera({ x: 15, y: 400, z: 120 }); //相机
    },
    mounted() {
        // this.init(); //初始化
        this.createRender(); //渲染器
    },
    watch: {},
    methods: {
        //-------------------------------------------------------------------------------------------初始化
        init() {
            // this.createPlane();
            // setTimeout(() => {
            //     this.render()
            // }, 5000);
        },
        //-------------------------------------------------------------------------------------------摄像机
        createCamera(params = { x: 0, y: 300, z: 300 }) {
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
                    console.log(e, 11111)
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
        //-------------------------------------------------------------------------------------------执行渲染操作   指定场景、相机作为参数
        render() {
            this.renderer.render(this.scene, this.camera);
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
        } //平面
    },
    components: {},
};
</script>

<style scoped lang="scss"></style>
