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
        time: {
            type: Number,
            default: 2
        },
        num: {
            type: [Number, String],
            default: 0
        }
    },
    data() {
        return {
            num1: this.num,
        };
    },
    watch: {
        num: function (v1, v2) {
            clearInterval(this.Interval);
            this.setNum();
        },
    },
    created() { 
        this.setNum();
    },
    methods: {
        setNum() {
            console.time("执行时间");
            this.num1 = 0
            this.Interval = setInterval(() => {
                if (this.num / (this.time * 1000 / 80) < 1) {
                    this.num1++;
                } else {
                    this.num1 += parseInt(this.num / (this.time * 1000 / 80));
                }
                if(this.num1 >= this.num) {
                    this.num1 = this.num;
                    clearInterval(this.Interval);
                    console.timeEnd("执行时间");
                }
            }, 80);
        }
    }
};
</script>



<style lang="scss">
</style>
