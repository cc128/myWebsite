/*
    创建者：cc
    创建时间：2020-06-17 10:47
    模块名称：弹幕
    备注：xxxx
*/
<template>
    <div class="barrage-box">
        <div v-for="(item, i) in listNum" :key="i" class="pathway-box">
            <!-- <span v-for="(items, k) in 20" :key="k" class="text1">{{ txt.substr(sum(1, 57), sum(1, 10)) }}</span> -->
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            num: 0,
            color: [
                "#2C3E50",
                "#FF0000",
                "#1E87F0",
                "#7AC84B",
                "#FF7F00",
                "#9B39F4",
                "#FF69B4"
            ],
            txt:
                "伐尔尕飞机哦IP德法俄港口排名v奥胖价格放坡哦i个昂i好呢按飞高阿房宫帕纳给我发i经过培训欧冠i噢俄警告斜杠荣根和",
            listNum: parseInt(window.innerHeight / 30)
        };
    },
    created() { },
    mounted() {
        setInterval(() => {
            let num = this.sum(0, this.listNum - 1);
            if (num === this.num) {
                if (this.num === this.listNum - 2) {
                    this.num++;
                }
            } else {
                this.num = num;
            }
            let el = document.getElementsByClassName("pathway-box")[this.num];
            let span = document.createElement("span");
            span.innerText = this.txt.substr(this.sum(0, 20), this.sum(0, 20));
            span.className = "text1";
            span.style.color = this.color[this.sum(0, 7)];
            let left = window.innerWidth;
            el.childNodes.forEach(e => {
                // console.log(window.innerWidth / 2 - e.offsetLeft)
                left += e.offsetWidth;
                // left += window.innerWidth / 2 - e.offsetLeft
            });
            // if (left > window.innerWidth) return;
            span.style.left = left + "px";
            el.appendChild(span);
            el.insertBefore(span, el.childNodes[0]);
            let c = setInterval(() => {
                // console.log(left, span.offsetWidth);
                if (left < -span.offsetWidth) {
                    el.removeChild(span);
                    clearInterval(c);
                    return;
                } else {
                    span.style.left = (left -= 5) + "px";
                }
            }, 16.7);
        }, 1000);
    },
    methods: {
        sum(m, n) {
            var num = Math.floor(Math.random() * (m - n) + n);
            return num;
        }
        //=====================================获取远程数据==================================//
        //=====================================前后端交互====================================//
        //=====================================组件间交互====================================//
        //=====================================其他操作=====================================//
    }
};
</script>



<style lang="scss">
.barrage-box {
    width: 50%;
    height: 100%;
    font-size: 16px;
    font-weight: bold;
    background: #ccc;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // overflow: hidden;
    .pathway-box {
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid red;
        position: relative;
        &:hover {
            background: rgba(0, 0, 0, 0.5);
        }
        .text1 {
            white-space: nowrap;
            padding: 0 10px;
            position: absolute;
            // left: 100%;
            // animation: moverEl 10s linear;
        }
        // @keyframes moverEl {
        //     0% {
        //         left: 100%;
        //     }
        //     100% {
        //         left: 0;
        //     }
        // }
    }
}
</style>
