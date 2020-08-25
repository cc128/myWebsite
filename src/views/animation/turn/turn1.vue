/*
    创建者：cc
    创建时间：2020-08-05 15:42
    模块名称：数字加载效果
    备注：xxxx
*/
<template>
    <div class="turn1-box isShow">
        <div v-for="(item, i) in num2" v-show="isShow[i]" :key="i" class="turn-num isShow">
            <div v-for="(item2, k) in Number(item === '.' ? 1 : item)" :key="k" class="img1" :style="{animation: `numX ${animationTime}s ${k * delaySpeed}s linear`, 'z-index': 9 - k}">{{ k }}</div>
            <div v-for="(item2, k) in Number(item === '.' ? 1 : item)" :key="k + 10" class="img2" :style="{animation: `numX2 ${animationTime}s ${k * delaySpeed}s linear`, 'z-index': k}">{{ k+1 }}</div>
            <div v-show="isShow2[i]" class="num isShow">{{ valueData[i] }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        animationTime: {
            type: Number,
            default: 1
        },
        delaySpeed: {
            type: Number,
            default: 0.2
        }, // 翻拍速度
        num: {
            type: [Number, String],
            default: 0
        }
    },
    data() {
        return {
            setTimeout: [],
            index: null,
            valueData: [],
            isShow: [],
            isShow2: [],
            num2: 0,
        };
    },
    watch: {
        num: function (v1, v2) {
            this.init()
        }
    },
    created() {
        this.init()
    },
    mounted() {
    },
    methods: {
        init() {
            this.setTimeout.forEach((e) => {
                clearTimeout(e);
            })
            this.num2 = 0;
            const num = this.num.toString();
            this.num2 = num;
            // this.delaySpeed = this.animationTime / 2;
            this.isShow = new Array(this.num2.length).fill(false);
            this.isShow2 = new Array(this.num2.length).fill(false);
            this.valueData = [];
            this.num2.split("").forEach(e => {
                this.valueData.push(e)
            });
            this.manner()
        },
        // Manner2() {
        //     this.$set(this.isShow, 0, true)
        //     let sum = 0;
        //     this.num2.split("").reduce((e, e2, i) => {
        //         sum += Number(e2) + (e ? Number(e) : 0);
        //         const sum2 = (sum - e2) * this.delaySpeed;
        //         setTimeout(() => {
        //             this.$set(this.isShow, i, true)
        //         }, sum2 * 1000);
        //         setTimeout(() => {
        //             this.$set(this.isShow2, i, true)
        //         }, sum * this.delaySpeed * 1000);
        //         if (e) {
        //             setTimeout(() => {
        //                 this.$set(this.isShow2, 0, true)
        //             }, (Number(e) * this.delaySpeed) * 1000);
        //         }
        //     });
        // }
        manner() {
            this.num2.split("").reduce((e, e2, i) => {
                // this.delaySpeed = this.animationTime / (Number(e2) || 1);
                this.$set(this.isShow, 0, true)
                this.setTimeout[i] = setTimeout(() => {
                    this.$set(this.isShow, i, true)
                    if (e) {
                        this.$set(this.isShow2, 0, true)
                    }
                    this.$set(this.isShow2, i, true)
                    if (this.num2.length - 1 === i) {
                        this.$emit("turnOver")
                    }
                }, i * 1000);
            });
        }
        //=====================================获取远程数据==================================//

        //=====================================前后端交互====================================//

        //=====================================组件间交互====================================//  

        //=====================================其他操作=====================================//

    }
};
</script>



<style lang="scss">
.turn1-box {
    // width: 275px;
    display: flex;
    .turn-num {
        width: 51px;
        height: 74px;
        text-align: center;
        margin: 0 2px;
        position: relative;
        perspective: 150px;
        background: url("./img/1.png") no-repeat bottom;
        background-size: 51px 74px;
        font-family: "庞门正道";
        font-size: 43px;
        .num {
            line-height: 74px;
            // position: relative;
            // z-index: 1;
            // animation: isShow 3s ease-in infinite;
        }
        .img1 {
            width: 51px;
            height: 37px;
            background: url("./img/1.png") no-repeat;
            // background: red;
            background-size: 51px 74px;
            position: absolute;
            top: 0;
            left: 0;
            overflow: hidden;
            transform-origin: bottom;
            // animation: numX 3s linear infinite;
            line-height: 74px;
            opacity: 0;
        }
        @keyframes numX {
            0% {
                transform: rotateX(0);
                opacity: 1;
            }
            50% {
                transform: rotateX(-90deg);
                opacity: 1;
            }
            50.1% {
                transform: rotateX(-90deg);
                opacity: 0;
            }
            100% {
                transform: rotateX(-180deg);
                opacity: 0;
            }
        }
        @keyframes numX2 {
            0% {
                transform: rotateX(180deg);
                opacity: 0;
            }
            49.9% {
                transform: rotateX(90deg);
                opacity: 0;
            }
            50% {
                transform: rotateX(90deg);
                opacity: 1;
            }
            100% {
                transform: rotateX(0);
                opacity: 1;
            }
        }
        .img2 {
            width: 51px;
            height: 37px;
            background: url("./img/1.png") no-repeat bottom;
            background-size: 51px 74px;
            position: absolute;
            bottom: 0;
            left: 0;
            overflow: hidden;
            line-height: 0px;
            transform: rotateX(180deg);
            transform-origin: top;
            // animation: numX2 3s linear infinite;
            opacity: 0;
        }
    }
}
</style>
