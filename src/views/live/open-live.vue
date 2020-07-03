<template>
    <div class="open-live">
        <el-button v-if="isLive === false" class="btn" type="success" @click="startVideo">开始直播</el-button>
        <el-button v-else class="btn" type="danger" @click="overLive">结束直播</el-button>

        <video id="video"></video>
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
            videoBox: null, //视频容器
            isLive: false,
            socketId: null,
            userData: [],
            webRTC: new webrtc(),
            mYname: sessionStorage.getItem("mYname") || null
        };
    },
    created() {
        if (!this.mYname) {
            this.setPrompt();
        }
    },
    mounted() {
        // 自己得id
        this.$socket.on("socketId", socketId => {
            this.socketId = socketId;
            this.$socket.emit("userLink", {
                name: this.mYname,
                socketId: this.socketId,
                isZB: true
            }); //链接房间
        });
        // 获取链接房间得用户
        this.$socket.on("userList", list => {
            console.log(list);
            this.userData = Object.values(list);
        });
    },
    methods: {
        // 开始直播
        async startVideo() {
            this.isLive = true;
            //获取摄像头权限，将画面显示在页面
            let videoTag = await this.webRTC.getCamera("#video");
            if (videoTag.localStream) {
                //获取视频流。推向服务器
                this.webRTC.getStream(
                    videoTag.localStream,
                    callBack => {
                        this.videoBox = document.querySelector("#video");
                        console.log(callBack, 33333333);
                        this.$socket.emit("liveVideoStreaming", {
                            video: callBack.data,
                            socketId: this.socketId,
                            time: this.videoBox.currentTime
                        });
                    },
                    5000
                );
            }
        },
        // 结束直播
        overLive() {
            let tracks = this.videoBox.srcObject.getTracks();
            tracks[0].stop();
            window.URL.revokeObjectURL(this.videoBox.src);
            this.webRTC.overVideo()
            this.isLive = false;
            //通知服务器结束直播
            this.$socket.emit("overLive", {
                socketId: this.socketId
            });
        },
        // 昵称
        setPrompt() {
            this.mYname = prompt("请输入昵称");
            if (this.mYname) {
                sessionStorage.setItem("mYname", this.mYname);
            } else {
                this.setPrompt();
            }
        }
    },
    beforeDestroy() {
        // window.onbeforeunload = function () {
        //     return '1111111';
        // }
        this.overLive()
    }
};
</script>

<style lang="scss">
.open-live {
    width: 100%;
    height: 100%;
    background: red;
    .btn {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -50px;
        margin-top: -20px;
    }
    #video {
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
