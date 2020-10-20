<template>
    <canvas class="whiteBoard">
    </canvas>
</template>

<script>
export default {
    data() {
        return {
            canvas: null,
            ctx: null
        }
    },
    created() { },
    mounted() { },
    methods: {
        init() {
            this.canvas = document.querySelectorAll("#whiteBoard");
            this.ctx = this.canvas.getContext("2d");
            let img = new Image();
            img.src = "";  
        }
    }

}
</script>

<style lang="scss">
.whiteBoard {
    position: fixed;
    width: 50vw;
    height: 50vh;
    border: 1px solid red;
    top: 50%;
    left: 50%;
    margin-left: -25vw;
    margin-top: -25vh;
    .bg-box {
        width: 300px;
        height: 200px;
        border: 1px solid red;
    }
}
</style>