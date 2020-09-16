/*
    创建者：cc
    创建时间：2020-05-06 13:05
    模块名称：
    备注：xxxx
*/
<template>
    <div class="screenCAP-box">
        <canvas id="canvas" width="900" height="450" style="width:300px; height:150px; background: #aaa;"></canvas>
        <video id="upFileBox" width="300" height="150" controls="controls" loop="loop" style="background: #aaa;"></video>
        <video id="upFileBox2" width="300" height="150" style="background: #aaa;"></video>
        <input v-if="!isTranscribe" class="选择视频" type="file" value="视频" accept=".mp4,.ogv,.AVI,.mov,.rmvb,.flv,.3GP" @change="getVideoFile" />
        <input v-if="!isTranscribe" type="button" value="开始录制" @click="startVCR" />
        <input v-if="isTranscribe" type="button" value="结束录制" @click="overVCR" />
        <video v-show="isTranscribe" id="video" autoplay="autoplay"></video>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dh: null,
            video: null, //视频容器
            video2: null, //视频容器2
            upFileURL: null, // 上传文件路径
            isTranscribe: false,
            elVideo: null,
            file: null, //文件
            sectionVideo: [],
            mediaSource: null,
            sourceBuffer: null,
            unitK: 1024 * 1024 * 20,
        };
    },
    created() {

    },
    methods: {
        // 直播本地视频
        getVideoFile(e) {
            this.video = document.querySelectorAll("#upFileBox")[0];
            this.file = e.target.files[0];
            // console.log(this.file)
            this.video.src = window.URL.createObjectURL(this.file)
            // 播放
            this.video.onloadedmetadata = e => {
                this.video.play();
                this.playSectionVideo();//播放切片视频
                let stream = this.canvasVideo(); //把视频绘制在canvas上
                this.createVideoStream(stream); //创建视频流
            };
            // this.video.ontimeupdate = () => {
            //     // //获取当前的播放时间
            //     // console.log(this.video.currentTime);
            //     //false 点击了播放  true 点击了暂停
            //     console.log(this.video.paused)
            //     if (this.video.paused) {
            //         cancelAnimationFrame(this.dh)
            //         console.log(this.dh === null)
            //         // let stream = this.canvasVideo(); //把视频绘制在canvas上
            //         // this.createVideoStream(stream); //创建视频流
            //     };
            // };

            // // 视频切片
            // let reader = new FileReader();
            // reader.readAsArrayBuffer(this.file);
            // let forNum = parseInt(this.file.size / this.unitK + 1)
            // reader.addEventListener("load", (e) => {
            //     this.sectionVideo = [];
            //     for (let i = 0; i < forNum; i++) {
            //         // //每10M切割一段,这里只做一个切割演示，实际切割需要循环切割，
            //         // this.sectionVideo.push(e.target.result.slice(this.unitK * i, this.unitK * (i + 1)));
            //         this.sectionVideo.push(e.target.result.slice(0, 1024 * 1024 * 10));
            //     }
            //     // console.log(this.sectionVideo, 3)
            //     // // window.URL.revokeObjectURL(video.src);
            //     // this.playSectionVideo();
            // })
            // // 视频切片
        },
        // 把视频绘制在canvas上
        canvasVideo() {
            let canvas = document.getElementById("canvas");
            let context = canvas.getContext("2d");
            let switchToCanvas = () => {
                if (this.video.ended) {
                    this.mediaRecorder.stop();
                    this.video2.pause();
                    return;
                }
                // if (this.video.paused) {
                //     console.log(222)
                // } else {
                //     console.log(333)
                // }
                context.drawImage(this.video, 0, 0, canvas.width, canvas.height);
                this.dh = window.requestAnimationFrame(switchToCanvas);
            }
            const stream = canvas.captureStream(60); // 60 FPS recording
            switchToCanvas()
            return stream
        },
        // 创建视频流
        createVideoStream(stream) {
            this.mediaRecorder = new MediaRecorder(stream, {
                mimeType: "video/webm;codecs=vp9"
            })
            // 100毫秒发送一次，视频流到后端
            this.mediaRecorder.ondataavailable = blob => {
                // console.log(blob.data, 111111);
                // this.sourceBuffer.appendBuffer(new Uint8Array(blob.data));
                let reader = new FileReader();
                reader.readAsArrayBuffer(blob.data);
                reader.addEventListener("load", (e) => {
                    console.log(111)
                    this.sourceBuffer.appendBuffer(new Uint8Array(e.target.result));
                })

            };
            this.mediaRecorder.start(100);
        },
        //播放切片视频
        playSectionVideo() {
            this.video2 = document.querySelectorAll("#upFileBox2")[0];
            // // 播放
            this.video2.onloadedmetadata = e => {
                this.video2.play();
            };
            this.mediaSource = new MediaSource();
            this.video2.src = window.URL.createObjectURL(this.mediaSource);
            this.mediaSource.addEventListener("sourceopen", this.sourceOpen);
        },
        // 设置视频流格式
        sourceOpen() {
            // this.sourceBuffer = this.mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
            this.sourceBuffer = this.mediaSource.addSourceBuffer('video/webm;codecs=vp9');
        },

        async startVCR() {
            navigator.mediaDevices.getDisplayMedia({
                video: true,
                cursor: "always"
            })
            // try {
            //     let stream = await navigator.mediaDevices.getDisplayMedia({
            //         video: true,
            //         cursor: "always"
            //     });
            //     this.elVideo = document.getElementById("video");
            //     this.elVideo.srcObject = stream;
            //     this.isTranscribe = true;
            // } catch {
            //     alert(1);
            // }
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
    #canvas {
        border: 1px solid red;
        position: absolute;
        top: 0;
        left: 0;
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
