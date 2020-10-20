/*
    创建者：cc
    创建时间：2019-11-11 17:10
    模块名称：签名
    备注：xxxx
*/
<template>
    <div class="signature">
        <canvas id="myCanvas" style="border: 1px solid #000" @touchstart.stop="touchstart" @touchmove.stop="touchmoveF" @touchend.stop="touchendF" @mouseup="mouseupF" @mousedown="mousedownF" @mousemove="mousemoveF"></canvas>
        <br />
        <input type="button" value="重置" @click="clearRect" />
        <input type="button" value="确定" @click="confirm" />
        <img v-if="src" :src="src" alt />
    </div>
</template>

<script>
export default {
    props: {
        width: {
            type: Number,
            default: 292
        },
        height: {
            type: Number,
            default: 208
        }
    },
    data() {
        return {
            src: "",
            canvas: null,
            ctx: null,
            isShow: false //鼠标是否按下
        };
    },
    created() { },
    mounted() {
        this.init();
    },
    methods: {
        // 手指触摸到屏幕
        touchstart(e) {
            this.ctx.moveTo(
                e.changedTouches[0].clientX - 15,
                e.changedTouches[0].clientY - document.getElementsByClassName("el-menu")[0].offsetHeight - document.getElementsByClassName("el-tabs__header")[0].offsetHeight - 15
            );
            this.isShow = true;
        },
        // 手指滑动
        touchmoveF(e) {
            e.preventDefault();
            if (this.isShow === true) {
                this.ctx.lineTo(
                    e.changedTouches[0].clientX - 15,
                    e.changedTouches[0].clientY - document.getElementsByClassName("el-menu")[0].offsetHeight - document.getElementsByClassName("el-tabs__header")[0].offsetHeight - 15
                );
                this.ctx.stroke();
            }
        },
        // 手指离开屏幕
        touchendF() {
            this.isShow = false;
        },
        //鼠标按下
        mousedownF(e) {
            //左键
            if (e.which === 1) {
                console.log(e)
                this.ctx.moveTo(e.layerX, e.layerY);
                this.isShow = true;
            }
        },
        //鼠标松开
        mouseupF() {
            this.isShow = false;
        },
        //鼠标移动
        mousemoveF(e) {
            if (this.isShow === true) {
                this.ctx.lineTo(e.layerX, e.layerY);
                this.ctx.stroke();
                // this.img1 = this.canvas.toDataURL("image/png", 1);
            }
        },
        // 重置
        clearRect() {
            this.init();
            // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },
        // 确定
        confirm() {
            console.log(this.canvas.toDataURL("image/png", 1));
            this.src = this.canvas.toDataURL("image/png", 1);
            this.$emit("imgData", this.canvas.toDataURL("image/png", 1));
        },
        // 初始化
        init() {
            this.canvas = document.querySelector("#myCanvas");
            this.canvas.width = this.width || this.canvas.parentNode.clientWidth;
            this.canvas.height = this.height || this.canvas.parentNode.clientHeight;
            this.ctx = this.canvas.getContext("2d");
            this.ctx.lineWidth = 1;
        }
    }
};
</script>



<style lang="scss">
.signature {
    #myCanvas {
        cursor: crosshair;
    }
}
</style>
