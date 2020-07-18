<template>
    <div class="open-live">
        <el-button v-if="isLive === false" class="btn" type="success" @click="startVideo">开始直播</el-button>
        <el-button v-else class="btn" type="danger" @click="overLive">结束直播</el-button>

        <video v-show="isLive" id="anchor-video"></video>
        <div class="user-list">
            <div v-for="(item,i) in userData" :key="i">{{ item.name }}</div>
        </div>
    </div>
</template>

<script>
import webrtc from "@/assets/js/webrtc";
export default {
    data() {
        return {
            anchorVideo: null, //视频容器
            isLive: false, //是否开播
            socketId: this.$store.state.socketId, //自己得id
            userData: [],
            webRTC: new webrtc(),
            mYname: sessionStorage.getItem("mYname") || null
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
    mounted() { },
    methods: {
        // 开始直播
        startVideo() {
            // 获取摄像头权限
            this.webRTC.getCamera("#anchor-video").then(data => {
                this.socketId = this.$store.state.socketId;
                this.$socket.emit("userLink", {
                    name: this.mYname,
                    socketId: this.socketId,
                    type: this.$route.name
                }); //链接房间

                this.localStream = data.localStream; //自己的视频流
                this.anchorVideo = data.videoBox // 自己的视频播放元素
                this.isLive = true;
                this.webRTC.getStream(this.localStream, (blob) => {
                    console.log(blob)
                    this.$socket.emit("liveVideStream", {
                        socketId: this.socketId,
                        video: blob.data,
                        time: this.anchorVideo.currentTime
                    })
                }, 1000)
            }).catch(err => {
                console.log("无可调用设备", err)
            });
        },
        // 结束直播
        overLive() {
            this.webRTC.closeCamera(this.anchorVideo);
            this.isLive = false;
        },
        // async startVideo() {
        //     this.isLive = true;
        //     //获取摄像头权限，将画面显示在页面
        //     let videoTag = await this.webRTC.getCamera("#video");
        //     if (videoTag.localStream) {
        //         //获取视频流。推向服务器
        //         this.webRTC.getStream(
        //             videoTag.localStream,
        //             callBack => {
        //                 this.videoBox = document.querySelector("#video");
        //                 console.log(callBack, 33333333);
        //                 this.$socket.emit("liveVideoStreaming", {
        //                     video: callBack.data,
        //                     socketId: this.socketId,
        //                     time: this.videoBox.currentTime
        //                 });
        //             },
        //             5000
        //         );
        //     }
        // },
        // 结束直播
        // overLive() {
        //     if (this.videoBox) {
        //         let tracks = this.videoBox.srcObject.getTracks();
        //         tracks[0].stop();
        //         window.URL.revokeObjectURL(this.videoBox.src);
        //         this.webRTC.overVideo();
        //         this.isLive = false;
        //         //通知服务器结束直播
        //         this.$socket.emit("overLive", {
        //             socketId: this.socketId
        //         });
        //     }
        // },
    },
    beforeDestroy() {
        // window.onbeforeunload = function () {
        //     return '1111111';
        // }
        if (this.anchorVideo) {
            this.overLive();
        }
    }
};
</script>

<style lang="scss">
.open-live {
    width: 100%;
    height: 100%;
    .btn {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -50px;
        margin-top: -20px;
    }
    #anchor-video {
        // width: 100%;
        // height: 100%;
        // border: 1px solid #000;
    }
    // .user-list {
    //     width: 50%;
    //     height: 50%;
    //     border: 1px solid red;
    //     position: absolute;
    //     bottom: 0;
    //     left: 0;
    //     background: rgab(225, 225, 225, 0.5);
    //     overflow: auto;
    // }
}
</style>
