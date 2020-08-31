<template>
    <div class="video-call">
        <div v-for="(item,i) in userData" :key="i" class="user-list" v-show="item.socketId !== socketId">
            <div>{{ item.name }}</div>
            <div style="flex: 1;"></div>
            <div class="icon-btn" @click="callF(item)">
                <svg t="1588602834610" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3774" width="25" height="25">
                    <path d="M641.489535 506.850196H361.543284a35.169772 35.169772 0 1 1 0-70.339544h279.946251a35.169772 35.169772 0 0 1 0 70.339544zM641.489535 328.690913H361.543284a35.169772 35.169772 0 1 1 0-70.339544h279.946251a35.169772 35.169772 0 0 1 0 70.339544z" fill="#FF4B9D" p-id="3775" />
                    <path d="M509.025284 720.692678a203.060508 203.060508 0 0 1-202.803794-202.932152V208.035491a202.932151 202.932151 0 1 1 405.735946 0v309.725035A203.060508 203.060508 0 0 1 509.025284 720.692678z m0-645.249795a132.592607 132.592607 0 0 0-132.46425 132.592608v309.725035a132.592607 132.592607 0 0 0 265.056858 0V208.035491A132.720964 132.720964 0 0 0 509.025284 75.442883zM688.724849 825.303496a35.298129 35.298129 0 0 1-18.483384-65.205271 303.820621 303.820621 0 0 0 145.428291-260.179298v-68.029121a35.169772 35.169772 0 0 1 70.339544 0v68.029121a373.903452 373.903452 0 0 1-178.801067 320.121939 34.913058 34.913058 0 0 1-18.483384 5.26263z" fill="#0060F7" p-id="3776" />
                    <path d="M510.052139 875.747731A376.342231 376.342231 0 0 1 134.223335 499.918927v-68.029121a35.169772 35.169772 0 0 1 70.339544 0v68.029121a305.874331 305.874331 0 0 0 305.48926 305.48926 35.169772 35.169772 0 1 1 0 70.339544z" fill="#0060F7" p-id="3777" />
                    <path d="M510.052139 1023.999872a35.169772 35.169772 0 0 1-35.169772-35.169772V840.577959a35.298129 35.298129 0 0 1 70.467901 0v148.252141a35.169772 35.169772 0 0 1-35.298129 35.169772z" fill="#0060F7" p-id="3778" />
                </svg>
            </div>
            <div class="icon-btn" @click="callF(item)">
                <svg t="1588602941840" class="icon" viewBox="0 0 1521 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6769" width="30" height="30">
                    <path d="M791.426681 1024H200.773245A201.149577 201.149577 0 0 1 0 823.226755V200.773245A201.149577 201.149577 0 0 1 200.773245 0h696.214627a201.149577 201.149577 0 0 1 200.961411 200.773245v768.470415a51.557516 51.557516 0 0 1-103.115031 0V200.773245a97.84638 97.84638 0 0 0-97.658214-97.658214h-696.214627a97.84638 97.84638 0 0 0-97.658214 97.658214v622.45351a97.84638 97.84638 0 0 0 97.658214 97.658214h590.46527a51.557516 51.557516 0 0 1 0 103.115031z" fill="#0060F7" p-id="6770" />
                    <path d="M1425.922822 826.049247a96.341051 96.341051 0 0 1-56.449834-18.816612L1026.44616 553.396545a51.557516 51.557516 0 0 1 0-82.79309l342.46233-253.647924a95.776553 95.776553 0 0 1 152.790885 76.959941v436.357222a96.152885 96.152885 0 0 1-95.776553 95.776553z m-282.249173-314.049247L1418.584344 715.031239V308.404263z" fill="#0060F7" p-id="6771" />
                    <path d="M793.308343 795.37817H282.249173a51.557516 51.557516 0 1 1 0-103.115031h511.05917a51.557516 51.557516 0 0 1 0 103.115031zM776.185226 355.257626H639.764792a51.745682 51.745682 0 0 1 0-103.303197h136.796766a51.745682 51.745682 0 0 1 0 103.303197z" fill="#FF4B9D" p-id="6772" />
                </svg>
            </div>
        </div>
        <div v-show="userData.length <= 1" style="text-align: center;">
            <br />
            <br />
            <span>暂无连接用户</span>
        </div>
        <div v-show="who === 2" class="call-box">
            <div>{{ stateText }}</div>
            <div class="btn-box">
                <el-button type="danger" @click="overCallF">挂断</el-button>
                <el-button v-show="isReception" type="success" @click="takeInF">接听</el-button>
            </div>
        </div>
        <div v-show="who === 1" class="call-box">
            <div>{{ stateText }}</div>
            <div class="btn-box">
                <el-button type="danger" @click="overCallF">挂断</el-button>
                <!-- <svg t="1588603825413" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6968" width="50" height="50" @click="overCallF(1)">
                    <path d="M841.216 856.064c185.856-185.856 185.856-487.424 0-673.792C655.36-3.584 353.792-3.584 167.424 182.272c-185.856 185.856-185.856 487.424 0 673.792 186.368 185.856 487.936 185.856 673.792 0zM218.624 495.104c0-47.616 111.104-113.664 285.696-113.664 175.104 0 285.696 66.048 285.696 113.664 0 40.96 10.752 102.4-73.728 93.184-84.48-9.216-78.848-40.96-78.848-83.456 0-29.696-68.608-36.352-133.12-36.352-65.024 0-133.12 6.656-133.12 36.352 0 42.496 5.632 74.24-78.848 83.456-84.992 9.216-73.728-51.712-73.728-93.184z" fill="red" p-id="6969"></path>
                </svg>-->
            </div>
        </div>
        <video v-show="this.callVideo" id="callVideo" autoplay></video>
        <!-- controls="controls" -->
        <video v-show="this.calledVideo" id="calledVideo" autoplay="autoplay" muted="muted"></video>
    </div>
</template>

<script>
import webrtc from "@/assets/js/webrtc";
export default {
    data() {
        return {
            track: null, //
            mYname: sessionStorage.getItem("mYname") || "用户",
            webRTC: new webrtc(),
            localStream: null, //呼叫人的视频流
            callVideo: null, //呼叫人的视频播放元素
            calledVideo: null,  //被呼叫人的视频播放元素


            isReception: false, //是否接受通讯连接
            who: 0, //1为呼叫者，2为被呼叫者
            stateText: "", //连接状态文字
            callId: "", //呼叫人id
            calledId: "", //被呼叫人id
            socketId: this.$store.state.socketId, //自己得id
            userData: this.$store.state.videoCallUserList, // 视频语音用户列表

            mediaRecorder: null, //视频流对象
            mediaSource: null, //推流对象
            sourceBuffer: null
        };
    },
    watch: {
        "$store.state.socketId": function (v1, v2) {
            if (v1) {
                this.socketId = this.$store.state.socketId;
                this.$socket.emit("userLink", {
                    name: this.mYname,
                    socketId: this.socketId,
                    type: this.$route.name
                }); //链接房间
            }
        },
        "$store.state.videoCallUserList": function (v1, v2) {
            if (v1) {
                this.userData = this.$store.state.videoCallUserList;
            }
        }
    },
    created() {
        if (this.socketId) {
            this.$socket.emit("userLink", {
                name: this.mYname,
                socketId: this.socketId,
                type: this.$route.name
            }); //链接房间
        }
    },
    mounted() {
        // 被呼叫方-显示呼叫页面
        this.$socket.on("showCall", data => {
            this.isReception = true; //显示接听按钮
            this.stateText = `呼叫人：${data.name}`;
            this.who = 2; // 被呼叫方-显示接听和挂断按钮
            this.callId = data.callId; //呼叫人id
            this.calledId = data.calledId; //被呼叫人id
        });
        //接收私密消息
        this.$socket.on("secretMsg", res => {
            if (res.isConsent === true) {
                // 接通操作-并调用摄像头
                this.isReception = false; //接通后，隐藏接听按钮
                this.stateText = "视频已链接";
                this.$nextTick(() => {
                    this.calledVideo = document.querySelector("#calledVideo");
                    // 创建可添加视频流的url
                    this.mediaSource = new MediaSource();
                    this.calledVideo.src = window.URL.createObjectURL(this.mediaSource);
                    // 创建可添加视频流的url
                    this.mediaSource.addEventListener("sourceopen", this.sourceOpen);
                    this.webRTC.getCamera("#callVideo").then(data => {
                        this.localStream = data.localStream; //自己的视频流
                        this.callVideo = data.videoBox // 自己的视频播放元素
                        this.sendVideo(res.sendVideoId)
                    }).catch(err => {
                        console.log("无可调用设备", err)
                    });
                })

            } else if (res.isConsent === false) {
                this.webRTC.closeCamera(); // 关闭摄像头
                // 挂断操作
                this.who = 0;
                this.stateText = "";
                if (this.calledVideo) {
                    window.URL.revokeObjectURL(this.calledVideo.src);
                    this.calledVideo.src = "";
                    this.calledVideo.removeAttribute("src")
                    this.calledVideo.load()
                    console.log("挂断")
                }
                if (this.mediaRecorder) {
                    this.mediaRecorder.stop(); //停止获取视频流
                }
                // if (this.sourceBuffer) {
                //     this.sourceBuffer.abort(); //
                // }
                if (this.mediaSource) {
                    this.mediaSource.removeEventListener("sourceopen", this.sourceOpen);
                }
                this.callVideo = null; //呼叫人的视频播放元素
                this.calledVideo = null;  //被呼叫人的视频播放元素
                this.mediaRecorder = null; //视频流对象
                this.mediaSource = null; //推流对象
                this.sourceBuffer = null;
            }
        });
        // 接收视频流
        this.$socket.on("videoMsg", data => {
            console.log("接收视频流")
            if (this.who) {
                this.sourceBuffer.appendBuffer(new Uint8Array(data.video));
            }
        });
    },
    methods: {
        // 呼叫
        callF(item) {
            // this.webRTC.getCamera("#callVideo").then(data => {
            //     this.localStream = data.localStream; //自己的视频流
            //     this.callVideo = data.videoBox // 自己的视频播放元素
            // }).catch(err => {
            //     console.log("无可调用设备", err)
            // });
            this.who = 1; // 自己的页面显示挂断按钮
            this.stateText = `呼叫：${item.name}中...`;
            this.calledId = item.socketId; //被呼叫人得id
            // 发送呼叫信息给服务器
            this.$socket.emit("sendCall", {
                callId: this.socketId, //呼叫人id
                calledId: this.calledId, //被呼叫人id
                name: this.$store.state.mYname, //呼叫人名称
            });
        },
        // 挂断
        overCallF() {
            // who传 1为呼叫方挂断-2为被呼叫方挂断
            this.$socket.emit("overCall", {
                callId: this.callId,
                calledId: this.calledId,
                who: this.who
            });
        },
        // 接受
        takeInF() {
            this.$socket.emit("tokeCall", {
                callId: this.callId,
                calledId: this.calledId
            });
        },
        // 创建视频流-发送给服务器
        sendVideo(userId) {
            this.mediaRecorder = new MediaRecorder(this.localStream, {
                mimeType: "video/webm;codecs=vp9"
            });
            // 200毫秒发送一次，视频流到后端
            this.mediaRecorder.ondataavailable = blob => {
                if (this.who) {
                    this.$socket.emit("videoStreaming", {
                        video: blob.data,
                        receiveUserId: userId
                    });
                }
            };
            this.mediaRecorder.start(300);
        },
        // 设置视频流格式
        sourceOpen(e) {
            console.log("111111111111")
            this.sourceBuffer = this.mediaSource.addSourceBuffer("video/webm;codecs=vp9");
            // window.URL.revokeObjectURL(this.calledVideo.src);
        }
    },
    // beforeRouteLeave(to, from, next) {
    //     this.$socket.emit("setType", {
    //         socketId: this.socketId,
    //         newType: to.name,
    //         formerType: from.name
    //     })
    //     next()
    // }
};
</script>



<style lang="scss">
.video-call {
    .user-list {
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        margin: 3px 0;
        border-radius: 5px;
        background: #f8f8f8;
        display: flex;

        .icon-btn {
            display: flex;
            align-items: center;
            width: 50px;
        }
    }
    .call-box {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        text-align: center;
        z-index: 3;
        display: flex;
        justify-content: center;
        align-items: center;
        background: radial-gradient(
            rgba(0, 0, 0, 0.1),
            rgba(0, 0, 0, 0) 0.5%,
            rgba(0, 0, 0, 1)
        );
        .btn-box {
            width: 100%;
            position: absolute;
            bottom: 20px;
            z-index: 2;
            display: flex;
            justify-content: center;
        }
    }
    #callVideo {
        width: 50vw;
        // height: 100vh;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 1;
        // border: 1px solid #000;
        background: rgba(225, 225, 255, 0.5);
        border-top: 1px solid red;
    }
    #calledVideo {
        border-top: 1px solid #000;
        width: 50vw;
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: 2;
        background: rgba(0, 0, 0, 0.5);
    }
}
// const link = document.createElement("a");
// link.style.display = "none";
// const downloadUrl = window.URL.createObjectURL(new Blob(this.videoData));
// this.calledVideo.src = downloadUrl;
// link.href = downloadUrl;
// link.download = "mediafegaegag.mp4";
// document.body.appendChild(link);
// link.click();
// link.remove();

// var canvas = document.getElementById("canvas");
// var context = canvas.getContext("2d");
// video.oncanplay = function() {
//     video.play();
//     switchToCanvas();
// };
// let switchToCanvas = () => {
//     if (video.ended) {
//         return;
//     }
//     // 将video上的图片的每一帧以图片的形式绘制的canvas上
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);
//     window.requestAnimationFrame(switchToCanvas);
// };
// const stream = canvas.captureStream(60); // 60 FPS recording
// let mediaRecorder = new MediaRecorder(stream);
// console.log(stream, 3333)

// if (MediaRecorder.isTypeSupported("video/webm;codecs=vp9")) {
//     this.mimeType = "video/webm;codecs=vp9";
//     console.log("当前视频格式", "video/webm;codecs=vp9");
// } else if (MediaRecorder.isTypeSupported("video/webm;codecs=vp8")) {
//     this.mimeType = "video/webm;codecs=vp8";
//     console.log("当前视频格式", "video/webm;codecs=vp8");
// } else if (MediaRecorder.isTypeSupported("video/webm;codecs=h264")) {
//     this.mimeType = "video/webm;codecs=h264";
//     console.log("当前视频格式", "video/webm;codecs=h264");
// } else if (MediaRecorder.isTypeSupported("video/webm;codecs=avc1")) {
//     this.mimeType = "video/webm;codecs=avc1";
//     console.log("当前视频格式", "video/webm;codecs=avc1");
// } else if (
//     MediaRecorder.isTypeSupported("video/x-matroska;codecs=avc1")
// ) {
//     this.mimeType = "video/x-matroska;codecs=avc1";
//     console.log("当前视频格式", "video/x-matroska;codecs=avc1");
// } else {
//     console.log("没有您支持的视频格式");
// }
</style>
