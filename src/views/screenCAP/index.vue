/*
    创建者：cc
    创建时间：2020-05-06 13:05
    模块名称：
    备注：xxxx
*/
<template>
    <div class="screenCAP-box">
        <div class="start-transcribe">
            <input v-if="!isTranscribe" type="button" value="开始录制" @click="startVCR" />
            <input v-if="isTranscribe" type="button" value="结束录制" @click="overVCR" />
        </div>
        <video v-show="isTranscribe" id="video" autoplay="autoplay"></video>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isTranscribe: false,
            elVideo: null
        };
    },
    created() { },
    methods: {
        async startVCR() {
            try {
                let stream = await navigator.mediaDevices.getDisplayMedia({
                    video: true,
                    cursor: "always"
                });
                this.elVideo = document.querySelector("video");
                this.elVideo.srcObject = stream;
                this.isTranscribe = true;
            } catch {
                // alert(1);
            }
            // .then(stream => {
            //     console.log(stream, 1);
            //     this.isTranscribe = true;
            //     this.$nextTick(() => {
            //         this.elVideo = document.querySelector("video");
            //         this.elVideo.srcObject = stream;
            //     });
            // })
            // .catch(err => {
            //     console.log(err, 2);
            // });
        },
        overVCR() {
            let tracks = this.elVideo.srcObject.getTracks();
            tracks[0].stop();
            window.URL.revokeObjectURL(this.elVideo.src);
            this.isTranscribe = false;
            this.elVideo.load()

            // this.elVideo.pause();
            // this.elVideo.removeAttribute('src'); // empty source
            // this.elVideo.load();
        }
    }
};
</script>



<style lang="scss">
.screenCAP-box {
    height: 100%;
    background: #ccc;
    position: relative;
    .start-transcribe {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        input {
            display: inline-block;
            line-height: 1;
            white-space: nowrap;
            cursor: pointer;
            background: #409eff;
            border: 1px solid #409eff;
            color: #fff;
            -webkit-appearance: none;
            text-align: center;
            box-sizing: border-box;
            outline: none;
            margin: 5px;
            transition: 0.1s;
            font-weight: 500;
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            padding: 12px 20px;
            font-size: 14px;
            border-radius: 4px;
        }
    }
    #video {
        width: 160px;
        height: 90px;
        background: red;
        // max-width: 100%;
        // max-height: 100%;
        border: 1px solid red;
    }
}
</style>
