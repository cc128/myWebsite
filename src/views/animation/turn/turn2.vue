/*
    创建者：cc
    创建时间：2020-04-22 16:05
    模块名称：数字增加效果
    备注：xxxx
*/
<template>
    <div>{{ num1 }}</div>
</template>

<script>
export default {
    props: {
        num: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            num1: this.num,
            index: 0,
            timeout: null
        };
    },
    watch: {
        num: function (v1, v2) {
            this.setNum();
        },
        index: function (v1, v2) {
            // 小于50的值定时器执行的次数为当前传入值
            // 大于等于50的值定时器执行的次数为50次
            if (v1 === (this.num < 50 ? this.num : 50)) {
                this.num1 = this.num;
                clearInterval(this.Interval);
                console.timeEnd("执行时间");
            }
        }
    },
    created() { },
    methods: {
        setNum() {
            this.Interval = setInterval(
                () => {
                    // 小于50的值定时器每次加1
                    // 大于等于50的值定时器每次加等====传入值/1千毫秒*20毫秒
                    this.num1 +=
                        this.num < 50 ? 1 : parseInt((this.num / 1000) * 20);
                    this.index++; //定时器累计执行次数
                },
                this.num < 50 ? 1000 / this.num : 20
            );
            console.time("执行时间");
        }
    }
};
</script>



<style lang="scss">
</style>
