/*
    创建者：cc
    创建时间：2020-05-11 14:21
    模块名称：
    备注：xxxx
*/
<template>
    <div>
        <el-button type="primary" @click="refresh">刷新</el-button>
        <div v-if="isShow" class="frame">
            <div class="top-wire"></div>
            <div class="bottom-wire"></div>
            <div class="left-wire"></div>
            <div class="right-wire"></div>
            <div class="left-top-wire"></div>
            <div class="left-bottom-wire"></div>
            <div class="right-top-wire"></div>
            <div class="right-bottom-wire"></div>

            <div class="left-top-wire2"></div>
            <div class="left-bottom-wire2"></div>
            <div class="right-top-wire2"></div>
            <div class="right-bottom-wire2"></div>
            <br />
            <div class="txt1">
                <span class="text">文本加载动画</span>
            </div>
            <br />
            <div class="txt2">
                <span class="text">文本加载动画</span>
            </div>
            <br />
            <div class="txt3">
                <span class="text">文本加载动画</span>
            </div>
            <br />
            <div class="txt4">
                <span v-for="(item, i) in '文本加载动画'" :key="i" :style="{animation: `blink ${3 + 0.1 * i}s linear`}">{{ item }}</span>
            </div>
            <br />
            <div class="txt4">
                <span v-for="(item, i) in '文本加载动画'" :key="i" :style="{animation: `moverTxt2 ${4 + 0.1 * i}s linear`}">{{ item }}</span>
            </div>
            <br />
            <div class="txt4">
                <span v-for="(item, i) in '文本加载动画'" :key="i" :style="{animation: `moverTxt4 ${5 + 0.1 * i}s linear`}">{{ item }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isShow: true,
        };
    },
    created() { },
    methods: {
        refresh() {
            this.isShow = false;
            setTimeout(() => {
                this.isShow = true;
            }, 100);
        }
        //=====================================获取远程数据==================================//
        //=====================================前后端交互====================================//
        //=====================================组件间交互====================================//
        //=====================================其他操作=====================================//
    }
};
</script>



<style lang="scss">
.frame {
    color: #fff;
    width: 600px;
    height: 400px;
    margin: 0 auto;
    position: relative;
    padding: 5px;
    .top-wire,
    .bottom-wire {
        width: 90%;
        border-top: 1px solid #0cd2d5;
    }
    .top-wire {
        position: absolute;
        top: 0;
        left: 5%;
        animation: moverTop 1s linear;
    }
    .bottom-wire {
        position: absolute;
        bottom: 0;
        left: 5%;
        animation: moverBottom 1s linear;
    }
    @keyframes moverTop {
        0% {
            width: 0;
            position: absolute;
            top: 50%;
            left: 50%;
        }
        50% {
            width: 90%;
            position: absolute;
            top: 50%;
            left: 5%;
        }
        100% {
            width: 90%;
            position: absolute;
            top: 0%;
            left: 5%;
        }
    }
    @keyframes moverBottom {
        0% {
            width: 0;
            position: absolute;
            bottom: 50%;
            left: 50%;
        }
        50% {
            width: 90%;
            position: absolute;
            bottom: 50%;
            left: 5%;
        }
        100% {
            width: 90%;
            position: absolute;
            bottom: 0%;
            left: 5%;
        }
    }
    .left-wire,
    .right-wire {
        height: 90%;
        border-left: 1px solid #0cd2d5;
    }
    .left-wire {
        position: absolute;
        left: 0;
        top: 5%;
        animation: moverLeft 1s linear;
    }
    .right-wire {
        position: absolute;
        right: 0;
        top: 5%;
        animation: moverRight 1s linear;
    }
    @keyframes moverLeft {
        0% {
            height: 0;
            position: absolute;
            left: 0;
            top: 45%;
        }
        50% {
            height: 0;
            position: absolute;
            left: 0;
            top: 45%;
        }
        100% {
            height: 90%;
            position: absolute;
            left: 0;
            top: 5%;
        }
    }
    @keyframes moverRight {
        0% {
            height: 0;
            position: absolute;
            right: 0;
            top: 45%;
        }
        50% {
            height: 0;
            position: absolute;
            right: 0;
            top: 45%;
        }
        100% {
            height: 90%;
            position: absolute;
            right: 0;
            top: 5%;
        }
    }
    .left-top-wire,
    .left-bottom-wire,
    .right-top-wire,
    .right-bottom-wire {
        width: 3%;
        height: 3px;
        background: #0cd2d5;
        position: absolute;
        animation: blink 1.5s linear;
    }
    .left-top-wire2,
    .left-bottom-wire2,
    .right-top-wire2,
    .right-bottom-wire2 {
        width: 3px;
        height: 3%;
        background: #0cd2d5;
        position: absolute;
        animation: blink 1.5s linear;
    }
    .left-top-wire,
    .left-top-wire2 {
        top: 0;
        left: 0;
    }
    .right-top-wire,
    .right-top-wire2 {
        top: 0;
        right: 0;
    }
    .left-bottom-wire,
    .left-bottom-wire2 {
        bottom: 0;
        left: 0;
    }
    .right-bottom-wire,
    .right-bottom-wire2 {
        bottom: 0;
        right: 0;
    }
    //闪烁显示
    @keyframes blink {
        0% {
            opacity: 0;
        }
        75% {
            opacity: 0;
        }
        80% {
            opacity: 1;
        }
        85% {
            opacity: 0;
        }
        90% {
            opacity: 1;
        }
        95% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    .txt1,
    .txt2,
    .txt3,
    .txt4,
    .txt5 {
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        span {
            background: linear-gradient(
                to left,
                #ffffff,
                #ff0000 6.25%,
                #ff7d00 12.5%,
                #ffff00 18.75%,
                #00ff00 25%,
                #00ffff 31.25%,
                #0000ff 37.5%,
                #ff00ff 43.75%,
                #ffff00 50%,
                #ff0000 56.25%,
                #ff7d00 62.5%,
                #ffff00 68.75%,
                #00ff00 75%,
                #00ffff 81.25%,
                #0000ff 87.5%,
                #ff00ff 93.75%,
                #ffff00 100%
            );
            background-clip: text;
            color: transparent;
            animation: moverBG 5s linear infinite;
            @keyframes moverBG {
                0% {
                    background-position-x: 0;
                }
                100% {
                    background-position-x: 120px;
                }
            }
        }
    }
    .txt1 {
        animation: moverTxt 1.5s linear;
    }
    .txt2 {
        animation: moverTxt2 2s linear;
    }
    .txt3 {
        animation: blink 2.5s linear;
    }
    .txt4 {
        span {
            display: inline-block;
        }
    }
    //向右回弹显示
    @keyframes moverTxt {
        0% {
            opacity: 0;
            position: relative;
            left: -15px;
        }
        75% {
            opacity: 0;
            position: relative;
            left: -15px;
        }
        90% {
            opacity: 1;
            position: relative;
            left: 5px;
        }
        100% {
            opacity: 1;
            position: relative;
            left: 0px;
        }
    }
    //从小到大缩放显示
    @keyframes moverTxt2 {
        0% {
            opacity: 0;
            transform: scale(0);
        }
        75% {
            opacity: 0;
            transform: scale(0);
        }
        90% {
            opacity: 1;
            transform: scale(1.1);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
    //下移显示
    @keyframes moverTxt4 {
        0% {
            opacity: 0;
            position: relative;
            top: -0.5em;
        }
        80% {
            opacity: 0;
            position: relative;
            top: -0.5em;
        }
        90% {
            opacity: 1;
            position: relative;
            top: 0.5em;
        }
        100% {
            opacity: 1;
            position: relative;
            top: 0;
        }
    }
}
</style>
