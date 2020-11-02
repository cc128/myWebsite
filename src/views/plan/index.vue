/*
创建者：cc
模块名称：xxxx
备注：xxxx
*/
<template>
    <div class="plan">
        <div class="plan-container" @mousemove="mousemove">
            <img src="./a.jpg" alt="" srcset="" @mousedown="mousedown" @mouseup="mouseup" @mousewheel="mousewheel" @mouseenter="mouseenter" @mouseleave="mouseleave">
            {{resultX}},
            {{resultY}}
        </div>
    </div>
</template>

<script>
export default {
    props: {},
    data() {
        return {
            elScale: 1,
            div: null, //
            isRightKey: false, // 右键是否按下
            conEl: null, // 存储右键元素
            rightKeyX: 0, //鼠标右键按下的x点
            rightKeyY: 0, //鼠标右键按下的y点
            left: 0, //容器外的距离
            top: 0, //容器外的距离
            resultX: 0, //元素最后的停留坐标
            resultY: 0, //元素最后的停留坐标
        };
    },
    computed: {},
    created() { },
    mounted() {
        this.div = document.getElementsByClassName("plan")[0];
        this.div.oncontextmenu = (e) => {
            if (e.button === 2) {
                e.preventDefault();
                return false
            }
        }
        this.div.onmousewheel = (e) => {
            e.preventDefault();
            return false
        }
    },
    watch: {},
    methods: {
        // 鼠标按下
        mousedown(e) {
            if (e.button === 2) {
                //右键
                this.isRightKey = true;
                this.rightKeyX = e.offsetX;
                this.rightKeyY = e.offsetY;
                this.left = e.clientX - this.rightKeyX;
                this.top = e.clientY - this.rightKeyY;
                this.conEl = e.target; //存右键的元素
                this.conEl.style.position = "absolute";
            }

        },
        // 鼠标松开
        mouseup(e) {
            this.isRightKey = false;
            this.resultX = e.clientX - this.rightKeyX - this.left + this.resultX;
            this.resultY = e.clientY - this.rightKeyY - this.top + this.resultY;
        },
        // 鼠标移动
        mousemove(e) {
            // transform-origin: 0 0;
            if (this.isRightKey) {
                this.conEl.style.transformOrigin = `${e.offsetX} ${e.offsetY}`
                let left = e.clientX - this.rightKeyX - this.left + this.resultX;
                let top = e.clientY - this.rightKeyY - this.top + this.resultY;
                if (left <= 0) left = 0;
                if (top <= 0) top = 0;
                this.conEl.style.left = left + "px"
                this.conEl.style.top = top + "px"
            }
        },
        // 鼠标移入
        mouseenter(e) {
            this.conEl = e.target; //存鼠标移入的元素
        },
        // 鼠标移开
        mouseleave(e) {
            this.isRightKey = false;
        },
        // 滚轮事件
        mousewheel(e) {
            if (e.deltaY > 0) {
                this.conEl.style.transform = `scale(${this.elScale -= 0.1})`; //缩小
            } else {
                this.conEl.style.transform = `scale(${this.elScale += 0.1})`; //放大
            }
            console.log(e, this.div.scrollTop, 111111)
        },
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
    .plan-container {
        width: 200%;
        height: 200%;
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
