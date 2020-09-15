/*
    创建者：cc
    创建时间：2020-05-06 13:05
    模块名称：
    备注：xxxx
*/
<template>
    <div class="screenCAP-box">
        <video id="upFileBox" width="300" height="150" controls="controls"></video>
        <video id="upFileBox2" width="300" height="150" controls="controls"></video>
        <div class="start-transcribe">
            <input v-if="!isTranscribe" type="file" value="视频" @change="getVideoFile" />
            <!-- <input v-if="!isTranscribe" type="button" value="开始录制" @click="startVCR" />
            <input v-if="isTranscribe" type="button" value="结束录制" @click="overVCR" /> -->
        </div>
        <video v-show="isTranscribe" id="video" autoplay="autoplay"></video>
    </div>
</template>

<script>
export default {
    data() {
        return {
            upFileURL: null, // 上传文件路径
            isTranscribe: false,
            elVideo: null,
            file: null, //文件
            sectionVideo: [],
            mediaSource: null,
            sourceBuffer: null,
            unitK: 1024 * 200
        };
    },
    created() {

    },
    methods: {
        getVideoFile(e) {
            let video = document.querySelectorAll("#upFileBox")[0];
            this.file = e.target.files[0];
            video.src = window.URL.createObjectURL(this.file)
            // 播放
            video.onloadedmetadata = e => {
                video.play();
            };
            // 视频切片
            let reader = new FileReader();
            reader.readAsArrayBuffer(this.file);
            let forNum = parseInt(this.file.size / (1024 * this.unitK) + 1)
            reader.addEventListener("load", (e) => {
                console.log(e.target)
                this.sectionVideo = [];
                for (let i = 0; i < forNum; i++) {
                    // //每10M切割一段,这里只做一个切割演示，实际切割需要循环切割，
                    this.sectionVideo.push(e.target.result.slice(this.unitK * 1024 * i, this.unitK * 1024 * (i + 1)));
                    // console.log(this.sectionVideo, 2)
                    // console.log()
                }
                // console.log(this.sectionVideo, 3)
                // window.URL.revokeObjectURL(video.src);
                this.playSectionVideo();
            })
            // 视频切片



            // let mediaRecorder = new MediaRecorder(this.file, {
            //     mimeType: "video/webm;codecs=vp9"
            // })
            // // 500毫秒发送一次，视频流到后端
            // this.mediaRecorder.ondataavailable = blob => {
            //     console.log(blob, 111111);
            // };
            // this.mediaRecorder.start(100);
            // console.log(mediaRecorder)
            // // this.upFileURL = e.target.value;
            // // console.log(this.upFileURL, 222222)
        },
        //播放切片视频
        playSectionVideo() {
            let video2 = document.querySelectorAll("#upFileBox2")[0];
            this.mediaSource = new MediaSource();
            video2.src = window.URL.createObjectURL(this.mediaSource);
            this.mediaSource.addEventListener("sourceopen", this.sourceOpen, false)
        },
        sourceOpen() {
            console.log(this.sectionVideo[0], 222222222)
            this.sourceBuffer = this.mediaSource.addSourceBuffer(`video/mp4; codecs="avc1.4d401f,mp4a.40.2"`);
            this.sourceBuffer.appendBuffer(new Uint8Array(this.sectionVideo[0]));
            // setTimeout(() => {
            //     this.sourceBuffer.appendBuffer(new Uint8Array(this.sectionVideo[1]));
            // }, 1000);
            // this.sourceBuffer.addEventListener("updateend", () => {
            //     this.mediaSource.endOfStream();
            //     // document.querySelectorAll("#upFileBox2")[0].play();
            //     //console.log(mediaSource.readyState); // ended
            // });
            // var i = 0;
            // let a = setInterval(() => {
            //     if (i >= this.sectionVideo.length) {
            //         clearInterval(a);
            //         return;
            //     }
            //     console.log(this.sectionVideo[i], 111111)
            //     this.sourceBuffer.appendBuffer(new Uint8Array(this.sectionVideo[i]));
            //     i++;
            // }, 1000);
        },

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
