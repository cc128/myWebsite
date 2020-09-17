/*
    创建者：cc
    创建时间：2020-05-06 13:05
    模块名称：
    备注：xxxx
*/
<template>
    <div class="screenCAP-box">
        <div style="display: flex; align-items: center;">
            <div>
                <video id="video" controls="controls" autoplay="true"></video>
            </div>
            <div>
                <el-button :disabled="state === '开始录制' ? false : true" type="primary" @click="startVCR">开始录制</el-button>
                <el-button :disabled="state === '录制中' ? false : true" type="danger" @click="overVCR">结束录制</el-button>
                <el-button :disabled="!isDownload" type="success" @click="download">下载</el-button>
            </div>
        </div>
        <div style="display: flex; align-items: center;">
            <video id="upFileBox" width="300" height="150" controls="controls" style="background: #aaa;"></video>
            <div>
                <input class="upInput" type="file" value="视频" accept=".webm,.mp4,.ogv,.AVI,.mov,.rmvb,.flv,.3GP" @change="getVideoFile" />
            </div>
            <video id="upFileBox2" width="300" height="150" controls="controls" style="background: #aaa;"></video>
        </div>
        <canvas id="canvas" width="900" height="450" style="width:300px; height:150px; background: #aaa;"></canvas>
    </div>
</template>

<script>
export default {
    data() {
        return {
			isDownload: false, //是否可下载
            elVideo: null, //录屏视频容器
            VCR: null, //录制视频流
            recorder: null, //媒体记录对象
            state: "开始录制", //录屏按钮状态

            video: null, //视频容器
            video2: null, //视频容器2
            file: null, //上传的文件
            sectionVideo: [], //分段视频容器
            mediaSource: null, //媒体源
            sourceBuffer: null, //缓冲区
            unitK: 1024 * 1024 * 1, //分段值
            dh: null, //60帧执行动画对象
        };
    },
    created() {
    },
    methods: {
        // 开始录制
        async startVCR() {
            try {
                this.VCR = await navigator.mediaDevices.getDisplayMedia(
                    {
                        video: true,
                        audio: true,
                        cursor: "always"
                    }
				);
				this.isDownload = false;
                this.state = "录制中";
                this.elVideo = document.getElementById("video");
                window.URL.revokeObjectURL(this.elVideo.src);
                this.elVideo.autoplay = true;
                this.elVideo.srcObject = this.VCR; //实时的播放录屏
                // new 一个媒体记录
                this.recorder = new MediaRecorder(this.VCR, { mimeType: `video/webm;codecs=vp9` })
                this.recorder.start();
                this.VCR.getVideoTracks()[0].onended = () => {
                    this.state = "开始录制";
                    this.recorder.stop(); // 录屏结束完成
                }
                this.recorder.ondataavailable = blob => {
                    console.log(blob.data)
                    //     let videoUrl = URL.createObjectURL(event.data, { type: 'video/ogg' })
                    let videoUrl = URL.createObjectURL(event.data);
                    this.elVideo.srcObject = null;
                    this.elVideo.src = videoUrl;
                    this.elVideo.autoplay = false; //暂停播放
                }
            } catch (err) {
                console.error("错误: " + err);
            }
            // this.playSectionVideo();//播放切片视频
            // let stream = this.canvasVideo(this.elVideo); //把视频绘制在canvas上
            // this.createVideoStream(stream); //创建视频流
            // console.log(stream);
        },
        //结束录制
        overVCR() {
            let tracks = this.elVideo.srcObject.getTracks();
            tracks.forEach(track => track.stop())
            this.recorder.stop();
			this.state = "开始录制";
			this.isDownload = true;
        },
        //下载
        download() {
            const url = this.elVideo.src
            const name = new Date().toISOString().slice(0, 19).replace('T', ' ').replace(" ", "_").replace(/:/g, "-")
            const a = document.createElement('a')
            a.style = "display: none"
            a.download = `${name}.webm`
            a.href = url
            document.body.appendChild(a)
            a.click();
        },
        // 直播本地视频
        getVideoFile(e) {
            this.video = document.querySelectorAll("#upFileBox")[0];
            window.URL.revokeObjectURL(this.video.src);
            this.file = e.target.files[0];
            console.log(this.file)
            this.video.src = window.URL.createObjectURL(this.file);
            // this.watchFn(); //监听方法
            // 播放
            this.video.onloadedmetadata = e => {
                this.video.play();
                this.playSectionVideo();//播放切片视频
                // 视频切片
                let reader = new FileReader();
                reader.readAsArrayBuffer(this.file);
                let forNum = parseInt(this.file.size / this.unitK + 1)
                console.log(forNum, "分段个数")
                reader.addEventListener("load", (e) => {
                    this.sectionVideo = [];
                    for (let i = 0; i < forNum; i++) {
                        //每this.unit兆切割一段视频
                        this.sectionVideo.push(e.target.result.slice(this.unitK * i, this.unitK * (i + 1)));
                        // this.sectionVideo.push(e.target.result.slice(0, 1024 * 1024 * 10));
                    }
                    // console.log(this.sectionVideo, 3)
                    let i = 0;
                    let setStream = () => {
                        console.log(i)
                        setTimeout(() => {
                            this.sourceBuffer.appendBuffer(new Uint8Array(this.sectionVideo[i]));
                            i++;
                            if (i >= this.sectionVideo.length) {
								i = 0;
                                return false
                            } else {
                                setStream()
                            }
                        }, 16);
                    };
                    setStream();
                })
                // let stream = this.canvasVideo(this.video); //把视频绘制在canvas上
                // this.createVideoStream(stream); //创建视频流
            };
            this.video.ontimeupdate = () => {
                // console.log(this.video.ended)
                if (this.video.ended) {
                    this.video2.pause();
                }
                // //获取当前的播放时间
                // console.log(this.video.currentTime);
                //false 点击了播放  true 点击了暂停
                // if (this.video.paused) {
                //     cancelAnimationFrame(this.dh)
                //     console.log(this.dh === null)
                //     // let stream = this.canvasVideo(); //把视频绘制在canvas上
                //     // this.createVideoStream(stream); //创建视频流
                // };
            };


        },
        //播放切片视频
        playSectionVideo() {
            this.video2 = document.querySelectorAll("#upFileBox2")[0];
            window.URL.revokeObjectURL(this.video2.src);
            // // 播放
            this.video2.onloadedmetadata = e => {
                this.video2.play();
            };
            this.mediaSource = new MediaSource();
            this.video2.src = window.URL.createObjectURL(this.mediaSource);
            this.mediaSource.addEventListener("sourceopen", () => {
                this.sourceBuffer = this.mediaSource.addSourceBuffer('video/webm;codecs=vp9');// 设置视频流格式
            });
        },
        // 监听方法
        watchFn() {
            if (this.video.ended) {
                alert("结束")
            }
            console.log(1111)
            this.dh = window.requestAnimationFrame(this.watchFn);
        },

        // 把视频绘制在canvas上
        canvasVideo(el) {
            let canvas = document.getElementById("canvas");
            let context = canvas.getContext("2d");
            let switchToCanvas = () => {
                // if (el.ended) {
                //     this.mediaRecorder.stop();
                //     this.video2.pause();
                //     return;
                // }
                // if (el.paused) {
                //     console.log(222)
                // } else {
                //     console.log(333)
                // }
                context.drawImage(el, 0, 0, canvas.width, canvas.height);
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
                    // console.log(111)
                    this.sourceBuffer.appendBuffer(new Uint8Array(e.target.result));
                })

            };
            this.mediaRecorder.start(100);
        },
    }
};
</script>



<style lang="scss">
.screenCAP-box {
    height: 100%;
    background: #ccc;
    position: relative;
    #video,
    #upFileBox,
    #upFileBox2 {
        width: 320px;
        border: 12px solid #a5adb0;
        border-radius: 15px;
        height: 180px;
        background-color: black;
        text-align: center;
        margin: 10px 20px;
    }
    .upInput {
        // width: 98px;
        height: 38px;
        line-height: 38px;
        background: #409eff;
        border: 1px solid #409eff;
        // color: #fff;
        font-size: 18px;
        border-radius: 4px;
    }
    #canvas {
        display: none;
        border: 1px solid red;
        // position: absolute;
        top: 0;
        left: 0;
    }
}
</style>
