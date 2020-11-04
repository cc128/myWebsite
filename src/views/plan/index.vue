/*
创建者：cc
模块名称：xxxx
备注：xxxx
*/
<template>
    <div class="plan" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-button class="upLayer" type="primary" @click="loading = false">
            <input type="file" value="图层" accept=".jpeg,.png,.jpg" @change="upLayer" />
        </el-button>
        <div class="plan-container" @mousemove="mousemove">
            <img src="./a.jpg" alt="" srcset="" @mousedown="mousedown" @mouseup="mouseup" @mousewheel="mousewheel" @mouseenter.stop="mouseenter" @mouseleave="mouseleave">
        </div>
        <div class="list">
            <div v-for="(item, i) in drawing" :key="i">
                <div>名字{{ item.name }} / 宽度{{ item.width }} / 高度{{ item.height }} / x{{ item.left }} / y{{ item.top }}</div>
            </div>
        </div>
        <div class="right-key">
            <div>删除</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {},
    data() {
        return {
            drawing: [], //图纸-存储所有操作信息
            loading: false,
            elScale: 1, // 缩放比例
            planContainer: "", //图层容器
            div: null, //
            isRightKey: false, // 右键是否按下
            conEl: null, // 存储右键元素
            rightKeyX: 0, //鼠标右键按下的x点
            rightKeyY: 0, //鼠标右键按下的y点
            left: 0, //容器外的距离
            top: 0, //容器外的距离
            resultX: 0, //元素最后的停留坐标
            resultY: 0, //元素最后的停留坐标
            centralPointXY: [0, 0], //图片鼠标移入的位置
            ctrlKey: false, //
        };
    },
    computed: {},
    created() { },
    mounted() {
        this.div = document.getElementsByClassName("plan")[0];
        this.planContainer = document.getElementsByClassName("plan-container")[0];
        // 右键菜单
        this.div.oncontextmenu = (e) => {
            e.preventDefault();
            return false
        }
        // 禁用滚轮
        this.div.onmousewheel = (e) => {
            e.preventDefault();
            return false
        }
        document.onkeydown = (e) => {
            // 按下ctrl键
            if (e.key === "Control") {
                this.ctrlKey = true;
            }
        }
        document.onkeyup = (e) => {
            // 松开ctrl键
            if (e.key === "Control") {
                this.ctrlKey = false;
            }
        }
    },
    watch: {},
    methods: {
        // 鼠标按下
        mousedown(e) {
            // console.log(e)
            e.preventDefault();
            if (e.button === 0) {
                //左键
                this.isRightKey = true;
                this.rightKeyX = e.offsetX;
                this.rightKeyY = e.offsetY;
                this.left = e.clientX - this.rightKeyX;
                this.top = e.clientY - this.rightKeyY;
                // this.conEl = e.target; //存左键的元素
                e.target.style.position = "absolute";
                // console.log(e.offsetX)
            }
            // //右键
            // this.isRightKey = true;
            // this.rightKeyX = e.offsetX;
            // this.rightKeyY = e.offsetY;
            // this.left = e.clientX - this.rightKeyX;
            // this.top = e.clientY - this.rightKeyY;
            // // this.conEl = e.target; //存右键的元素
            // e.target.style.position = "absolute";

        },
        // 鼠标松开
        mouseup(e) {
            if (e.button === 0) {
                this.isRightKey = false;
                this.resultX = e.clientX - this.rightKeyX - this.left + this.resultX; // 计算移动距离
                this.resultY = e.clientY - this.rightKeyY - this.top + this.resultY; // 计算移动距离
            } else if (e.button === 2) {
                alert(1)
            }
        },
        // 鼠标移动
        mousemove(e) {
            if (this.isRightKey && e.button === 0) {
                let left = e.clientX - this.rightKeyX - this.left + this.resultX; // 计算移动距离
                let top = e.clientY - this.rightKeyY - this.top + this.resultY; // 计算移动距离
                // if (left <= 0) left = 0;
                // if (top <= 0) top = 0;
                e.target.style.left = left + "px"
                e.target.style.top = top + "px"
            }
        },
        // 鼠标移入
        mouseenter(e) {
            // this.isRightKey = true;
            // this.conEl = e.target; //存鼠标移入的元素
            e.target.style.boxShadow = "0 0 10px #fff";
            // e.preventDefault();
        },
        // 鼠标移开
        mouseleave(e) {
            e.target.style.boxShadow = "0 0 0px #fff";
            this.isRightKey = false;
        },
        // 滚轮事件
        mousewheel(e) {
            // if (this.ctrlKey) {
            e.target.style.transformOrigin = `${e.offsetX}px ${e.offsetY}px`;
            e.target.style.position = "absolute";
            // console.log(`${e.offsetX}px ${e.offsetY}px`)
            // let w = (e.target.offsetWidth * this.elScale - e.target.offsetWidth) / 2;
            // let h = (e.target.offsetHeight * this.elScale - e.target.offsetHeight) / 2;
            // e.target.style.transformOrigin = `${e.offsetX - w}px ${e.offsetY - h}px`;
            // console.log(w, h)
            console.log(e.target.offsetWidth / e.target.offsetHeight)
            if (e.deltaY > 0) {
                this.elScale -= 0.04
                if (this.elScale <= 0.3) this.elScale = 0.3;
                // e.target.style.transform = `scale(${this.elScale})`; //缩小
                e.target.style.width = e.target.offsetWidth - 12 + "px"; //缩小
                e.target.style.left = (this.resultX += 6) + "px";
                e.target.style.top = (this.resultY += 6) + "px";
            } else {
                // e.target.style.transform = `scale(${this.elScale += 0.04})`; //放大
                e.target.style.width = e.target.offsetWidth + 12 + "px"; //缩小
                e.target.style.left = (this.resultX -= 6) + "px"
                e.target.style.top = (this.resultY -= 6) + "px"
            }
            // }
        },
        // 上传的图层
        upLayer(e) {
            let img = document.createElement("img");
            img.src = URL.createObjectURL(e.target.files[0]);
            img.onmousedown = this.mousedown; //鼠标按下
            img.onmouseup = this.mouseup; //鼠标松开
            img.onmouseenter = this.mouseenter; //鼠标移入
            img.onmouseleave = this.mouseleave; //鼠标移开
            img.onmousewheel = this.mousewheel; //鼠标移开
            this.planContainer.appendChild(img)
            // this.loading = false;
            setTimeout(() => {
                console.log(img.offsetWidth, 111111)
                this.drawing.push({
                    name: "a", //所属名称
                    type: "img",
                    hierarchy: 1, //所属层级
                    width: img.offsetWidth, //宽度
                    height: img.offsetHeight, //高度
                    left: 0, //左-坐标
                    top: 0, //上-坐标
                })
            }, 100);
        }
    },
    components: {},
};
</script>

<style scoped lang="scss">
.plan {
    width: 100vw;
    height: 600px;
    // height: 100%;
    overflow: auto;
    background: #333;
    // position: relative;
    position: fixed;
    top: 0;
    left: 0;
    .plan-container {
        width: 200%;
        height: 200%;
        img {
            position: absolute;
        }
    }
    .upLayer {
        position: absolute;
        top: 0;
        right: 0;
    }
    .list {
        color: #fff;
        position: fixed;
        top: 50px;
        left: 0;
    }
    .right-key {
        position: absolute;
    }
}
.plan::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background-color: rgba(255, 255, 255, 0.15);
}
/*定义滑块 内阴影+圆角*/
.plan::-webkit-scrollbar-thumb {
    border-radius: 10px;
    // box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgba(0, 210, 255, 0.61);
}
</style>
