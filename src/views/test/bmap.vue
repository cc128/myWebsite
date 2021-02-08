/*
创建者：cc
模块名称：xxxx
备注：xxxx
*/
<template>
    <div class="bmap">
        <div id="viewer"></div>
    </div>
</template>

<script>
export default {
    props: {},
    data() {
        return {
            imageLoaded: false,
            PSV: null,
            factoryLink: require('../../../public/model/a.jpg')
        };
    },
    computed: {},
    created() { },
    mounted() {
        if (this.PSV) {
            // this.PSV.destroy()
            // this.imageLoaded = false
            // console.log(this.imageLoaded)
            // this.PSV.setPanorama(this.factoryLink, true, true).then(() => {
            //     this.imageLoaded = true
            //     console.log('-------替换图片完成--------')
            // });
        }
        this.$nextTick(() => {
            // this.initPhotoSphere()
            var viewer = new PhotoSphereViewer.Viewer({
                container: document.querySelector('#viewer'),
                panorama: this.factoryLink
                // panorama: "https://img.zcool.cn/community/019bac5ab0a444a8012182078a07d4.jpg@3000w_1l_0o_100sh.jpg"
                
            });
        })
    },
    watch: {},
    methods: {
        initPhotoSphere() {
            console.log(new PhotoSphereViewer);
            return
            this.PSV = PhotoSphereViewer({
                container: document.getElementById('viewer'),
                panorama: this.factoryLink,
                size: {
                    width: '100%',
                    height: screen.availHeight
                    // width: '680',
                    // height: '400'
                },
                caption: '1111111', // 标题
                autoload: true, // 自动加载
                time_anim: 3000, // 多少毫秒后自动播放
                anim_speed: "0.4rpm", //自动旋转速度
                navbar: false, //不显示下面的导航
                // default_long: 1.4441088145446443,
                // default_lat: 0.0800613513013615,
                // sphere_correction: { pan: 30.01, tilt: 0, roll: 0 },
                // max_fov: 100,         // 最大缩放值
                // min_fov: 99,          // 最小缩放值
                // default_fov: 100,     // 默认缩放值，在1-179之间
                // latitude_range: [0,0],//禁止上下滑动
                // mousewheel: false,    // 禁止鼠标滚轮缩放
                // navbar: false,
                // navbar: [
                //     'autorotate',
                //     'zoom',
                //     'markers',
                //     'caption',
                //     'fullscreen'
                // ],
                // theta_offset: 1000, // 旋转速度
                // markers: this.markersData
            })
        }
    },
    components: {},
};
</script>

<style lang="scss">
.bmap {
    width: 100%;
    height: 100%;
    #viewer {
        width: 100vw;
        height: 100vh;
        // width: 100vw;
        // height: 50vh;
    }
}
</style>
