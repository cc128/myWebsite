/*
创建者：cc
模块名称：xxxx
备注：xxxx
*/
<template>
    <div class="plan">
        <div class="plan-container" @mousemove="mousemove">
            <img src="./a.jpg" alt="" srcset="" @contextmenu="rightClick" @mousedown="mousedown" @mouseup="mouseup">
        </div>
    </div>
</template>

<script>
export default {
    props: {},
    data() {
        return {
            isRightKey: false, // 右键是否按下
            conEl: null, // 存储右键元素
            rightKeyX: 0, //鼠标右键按下的x点
            rightKeyY: 0, //鼠标右键按下的y点
            left: 0,
            top: 0,
        };
    },
    computed: {},
    created() { },
    mounted() {
        document.getElementsByClassName("plan")[0].oncontextmenu = (e) => {
            if (e.button === 2) {
                e.preventDefault();
                // this.rightClick(e)
                return false
            }
        }

    },
    watch: {},
    methods: {
        // 鼠标按下
        mousedown(e) {
            if (e.button === 2) {
                console.log(e)
                //右键
                this.isRightKey = true;
                this.rightKeyX = e.offsetX;
                this.rightKeyY = e.offsetY;
                this.left = e.clientX - this.rightKeyX;
                this.top = e.clientY - this.rightKeyY;
                this.conEl = e.target; //存右键的元素
                this.conEl.style.position = "relative";
                // this.conEl.style.top = e.clientX - this.rightKeyX - this.left + "px";
                // this.conEl.style.left = e.clientY - this.rightKeyY - this.top + "px";
            }

        },
        // 鼠标松开
        mouseup(e) {
            this.isRightKey = false;
            console.log(e, 1111111)
        },
        mousemove(e) {
            if (this.isRightKey) {
                console.log(e.offsetX - this.rightKeyX)
                // let left = e.clientX - e.offsetX;
                // let top = e.clientY - e.offsetY;
                // if (left <= 0) left = 0;
                // if (top <= 0) top = 0;
                // console.log(left, top)
                // this.conEl.style.left = left + "px"
                // this.conEl.style.top = top + "px"
            }
        },
        rightClick(e) {
            // console.log(e)
        }
    },
    components: {},
};
</script>

<style scoped lang="scss">
.plan {
    width: 100vw;
    height: 100vh;
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
