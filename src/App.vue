<template>
    <div id="app" :style="{transform: `scale(${x}, ${y})`}">
        <router-view />
    </div>
</template>

<script>
export default {
    data() {
        return {
            x: 1,
            y: 1
        };
    },
    created() {
        // this.getToken();
    },
    mounted() {
        this.$nextTick(() => {
            // this.x = (document.body.offsetWidth / 3840);
            // this.y = (document.body.offsetHeight / 2160);
            // window.addEventListener("resize", () => {
            //     this.x = (document.body.offsetWidth / 3840);
            //     this.y = (document.body.offsetHeight / 2160);
            // });
        })
    },
    methods: {}
};
</script>

<style lang="scss">
::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    background-color: rgba(255, 255, 255, 0.15);
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    // box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgba(0, 210, 255, 0.61);
}
#app {
    width: 100%;
    height: 100%;
    transform-origin: 0 0;
    // width: 3840px;
    // height: 2160px;
    overflow: hidden;
    .el-menu.el-menu--horizontal {
        border: none;
    }
    .isShow {
        animation: isShow 1s linear;
    }
    @keyframes isShow {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
}
</style>
