/*
创建者：cc
模块名称：xxxx
备注：xxxx
*/
<template>
    <div id="viewer">
        <div class="img-box">
            <img src="../../../public/model/a.jpg" alt="" srcset="" title="点击切换" @click="replaceImg">
            <img src="../../../public/model/c.jpg" alt="" srcset="" title="点击切换" @click="replaceImg">
        </div>
        <!-- <button id="gyro">
            Toggle Gyro
        </button> -->
    </div>
</template>
<script>
export default {
    props: {},
    data() {
        return {
            PSV: null,
            factoryLink: require("../../../public/model/a.jpg")
        };
    },
    computed: {},
    created() { },
    mounted() {
        // this.initPhotoSphere()
        this.PSV = new PhotoSphereViewer.Viewer({
            container: document.querySelector('#viewer'),
            panorama: require('../../../public/model/c.jpg'), // 必须的参数：图片路径
            // navbar: ['autorotate'],
            size: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            // plugins: [
            //     PhotoSphereViewer.GyroscopePlugin,
            // ],
        });

        setTimeout(() => {
            // this.PSV.setPanorama(this.factoryLink).then(() => {
            //     console.log('-------替换图片完成--------')
            // });
        }, 5000);
        // var btn = document.querySelector('#gyro');
        // if (btn) {
        //     btn.addEventListener('click', function onClick() {
        //         // getPosition
        //         var gyro = PSV.getPlugin(PhotoSphereViewer.GyroscopePlugin);

        //         if (!gyro) {
        //             console.log('gyro unavailable?');
        //         } else if (typeof gyro.isEnabled === 'function') {
        //             console.log('gyro.isEnabled():', gyro.isEnabled());
        //         } else {
        //             console.log('no isEnabled fn found?');
        //         }
        //     });
        // }
    },
    watch: {},
    methods: {
        replaceImg(e) {
            this.PSV.setPanorama(e.target.src)
            // console.log(e.target.src)
        }
    },
    components: {},
};
</script>

<style lang="scss">
#viewer {
    width: 100%;
    height: 100%;
    .img-box {
        position: fixed;
        bottom: 50px;
        left: 50%;
        margin-left: -110px;
        z-index: 1;
        // background: #ccc;
        img {
            width: 100px;
            margin: 5px;
            cursor: pointer;
            transition: all 0.2s linear;
            &:hover {
                transform: scale(1.1);
            }
        }
    }
}
</style>
