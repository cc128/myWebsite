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
                <div>宽度{{ item.width }} / 高度{{ item.height }} / x{{ item.left }} / y{{ item.top }}</div>
            </div>
        </div>
        <ul v-show="isShow" class="right-key">
            <li @click="deleEl">删除</li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {},
    data() {
        return {
            moverW: 0, //移动宽度
            moverL: 0, //下移值
            moverT: 0, // 上移值
            ELid: "", //当前元素的唯一标识
            rightKeyEl: null, //右键菜单
            isShow: false, //右键菜单
            drawing: [], //图纸-存储所有操作信息
            loading: false,
            elScale: 1, // 缩放比例
            planContainer: "", //图层容器
            div: null, //
            isRightKey: false, // 右键是否按下
            conEl: null, // 存储元素
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
        this.rightKeyEl = document.getElementsByClassName("right-key")[0];
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
            this.isShow = false;
            e.preventDefault();
            if (e.button === 0) {
                e.target.style.cursor = "move";
                //左键
                this.isRightKey = true;
                this.rightKeyX = e.offsetX;
                this.rightKeyY = e.offsetY;
                this.left = e.clientX - this.rightKeyX;
                this.top = e.clientY - this.rightKeyY;
                // this.conEl = e.target; //存左键的元素
                e.target.style.position = "absolute";
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
            e.target.style.cursor = "pointer";
            if (e.button === 0) {
                this.isRightKey = false;
                this.resultX = e.clientX - this.rightKeyX - this.left + this.resultX; // 计算移动距离
                this.resultY = e.clientY - this.rightKeyY - this.top + this.resultY; // 计算移动距离
            } else if (e.button === 2) {
                this.isShow = true;
                this.rightKeyEl.style.left = e.clientX + 10 + "px";
                this.rightKeyEl.style.top = e.clientY + 10 + "px";
            }
        },
        // 鼠标移动
        mousemove(e) {
            // e.target.style.transformOrigin = `${e.offsetX}px ${e.offsetY}px`;
            // this.centralPointXY
            // 判断移入的元素是否为图片
            if (e.path[0].getAttribute("src")) {
                // e.style.transformOrigin = "center";
                // console.log(e.offsetX, e.offsetY, this.centralPointXY)
            }
            // console.log(e.path[0].getAttribute("src"))
            if (this.isRightKey && e.button === 0) {
                let left = e.clientX - this.rightKeyX - this.left + this.resultX; // 计算移动距离
                let top = e.clientY - this.rightKeyY - this.top + this.resultY; // 计算移动距离
                // if (left <= 0) left = 0;
                // if (top <= 0) top = 0;
                // e.target.style.left = left + "px";
                // e.target.style.top = top + "px";
                // 更新数据
                let index = this.getIndex();
                this.drawing[index].left = left;
                this.drawing[index].top = top;
            }
        },
        // 鼠标移入
        mouseenter(e) {
            this.ELid = e.path[0].getAttribute("id"); // 获取唯一标识
            // this.isRightKey = true;
            this.conEl = e.target; //存鼠标移入的元素
            e.target.style.boxShadow = "0 0 10px #fff";
            e.target.style.cursor = "pointer";
            // e.preventDefault();
        },
        // 鼠标移开
        mouseleave(e) {
            e.target.style.boxShadow = "0 0 0px #fff";
            this.isRightKey = false;
        },
        // 滚轮事件
        mousewheel(e) {
            // let Xdirection = e.offsetX < (e.target.offsetWidth - e.offsetX) ? "左" : "有"
            // let Ydirection = e.offsetY < (e.target.offsetHeight - e.offsetY) ? "上" : "下"
            // let arr = [e.offsetX, (e.target.offsetWidth - e.offsetX)]
            // arr.sort((a, b) => {
            //     return a - b
            // })
            // let arr2 = [e.offsetY, (e.target.offsetHeight - e.offsetY)]
            // arr2.sort((a, b) => {
            //     return a - b
            // })
            // let Lratio = (arr[0] / arr[1]).toFixed(2); //鼠标在元素上左右距离的比例 -- 结果为左移动的倍数
            // let Rratio = (arr2[0] / arr2[1]).toFixed(2); //鼠标在元素上左右距离的比例 -- 结果为左移动的倍数
            // let ratio = e.target.offsetWidth / e.target.offsetHeight * 10; //长宽比例*10 --用于计算top移动距离
            // let w = ratio * (Xdirection === "左" ? (1 - Lratio) : Lratio); //-----------------------------------------------图片每次放大多少个px
            // let left = w / 2 * (Xdirection === "左" ? Lratio : (1 - Lratio)); //----------------------------------------图片缩放时向左移动的距离
            // let top = (w / 2 / (w / 10)) * (Ydirection === "上" ? Rratio : (1 - Rratio)); //------------------------图片缩放时向上移动的距离

            // // let ratio = e.target.offsetWidth / e.target.offsetHeight * 10; //长宽比例*10 --用于计算top移动距离
            // // let w = ratio; //-----------------------------------------------图片每次放大多少个px
            // // let left = w / 2; //----------------------------------------图片缩放时向左移动的距离
            // // let top = (w / 2 / (w / 10)); //------------------------图片缩放时向上移动的距离


            // // if (this.ctrlKey) {
            // e.target.style.transformOrigin = `${e.offsetX}px ${e.offsetY}px`;
            // this.centralPointXY = [e.offsetX, e.offsetY];

            // e.target.style.position = "absolute";
            let w = e.target.offsetWidth;
            if (e.deltaY > 0) {
                w = w - 20;
                this.elScale -= 0.04
                // if (this.elScale <= 0.3) this.elScale = 0.3;
                // e.target.style.transform = `scale(${this.elScale})`; //缩小
                // e.target.style.width = e.target.offsetWidth - w + "px"; //缩小
                // e.target.style.left = (this.resultX += left) + "px";
                // e.target.style.top = (this.resultY += top) + "px"
            } else {
                w = w + 20;
                this.elScale += 0.04
                // e.target.style.transform = `scale(${this.elScale})`; //放大
                // e.target.style.left = (this.resultX -= left) + "px"
                // e.target.style.width = e.target.offsetWidth + w + "px"; //缩小
                // e.target.style.left = (this.resultX -= left) + "px"
                // e.target.style.top = (this.resultY -= top) + "px"
            }
            // console.log(e.offsetX, e.offsetY)
            // e.target.style.width = w + "px";
            // console.log(e.target.offsetWidth)
            e.target.style.left = -(e.clientX * this.elScale - e.clientX) + this.moverT + "px";
            e.target.style.top = -(e.clientY * this.elScale - e.clientY) + this.moverT + "px";
            // e.target.style.width = e.target.offsetWidth -  * this.elScale + "px";
            // console.log(e.clientX * this.elScale - e.clientX, e.clientY * this.elScale - e.clientY)
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
            let id = String(Math.random())
            img.setAttribute("id", id);
            // img.style.transition = "all 0.3s";
            this.planContainer.appendChild(img)
            img.style.position = "absolute";
            img.style.opacity = 0;
            // this.loading = false;
            setTimeout(() => {
                let obj = {
                    id: id, //唯一标识
                    scale: 1, //放大倍数
                    // hierarchy: 1, //所属层级
                    // width: img.offsetWidth, //宽度
                    // height: img.offsetHeight, //高度
                    left: (this.planContainer.offsetWidth - img.offsetWidth) / 2, //左-坐标
                    top: (this.planContainer.offsetHeight - img.offsetHeight) / 2, //上-坐标
                }
                this.drawing.push(obj)
                img.style.left = obj.left + "px";
                img.style.top = obj.top + "px";
                this.resultX = obj.left;
                this.resultY = obj.top;
                img.style.opacity = 1;
            }, 100);
        },
        //删除元素
        deleEl() {
            let index = this.getIndex();
            this.drawing.splice(index, 1)
            this.conEl.remove()
            this.isShow = false;
            this.resultX = 0; //元素最后的停留坐标
            this.resultY = 0; //元素最后的停留坐标
        },
        getIndex() {
            let index = this.drawing.findIndex((e) => {
                return e.id === this.ELid
            })
            return index
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
    position: relative;
    // position: fixed;
    // top: 0;
    // left: 0;
    .plan-container {
        width: 100%;
        height: 100%;
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
        background: #fff;
        position: absolute;
        padding: 10px 0;
        cursor: pointer;
        box-shadow: 0 0 12px #333;
        border-radius: 2px;
        overflow: hidden;
        li {
            padding: 10px 20px;
        }
        li:hover {
            background: #ccc;
        }
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
