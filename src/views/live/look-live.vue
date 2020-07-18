<template>
    <div class="look-live">
        <div v-for="(item, i) in ">
            <video autoplay="autoplay" muted="muted"></video>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            socketId: this.$store.state.socketId, //自己得id
            liveList: [], //直播列表
            one: true,
            socketId: null,
            mYname: sessionStorage.getItem("mYname") || null,
            video: null,
            mediaSource: null,
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
        "$store.state.openLiveUserList": function (v1, v2) {
            if (v1) {
                this.liveList = this.$store.state.openLiveUserList;
            }
        }
    },
    created() {
        if (this.socketId) {
            this.socketId = this.$store.state.socketId;
            this.$socket.emit("userLink", {
                name: this.mYname,
                socketId: this.socketId,
                type: this.$route.name
            }); //链接房间
        }
    },
    mounted() {
        this.video = document.querySelector("video");
        // 创建可添加视频流的url
        this.mediaSource = new MediaSource();
        this.video.src = window.URL.createObjectURL(this.mediaSource);
        // 创建可添加视频流的url
        this.mediaSource.addEventListener("sourceopen", this.sourceOpen);

        // 获取视频
        this.$socket.on("videoData", data => {
            console.log(data);
            this.sourceBuffer.appendBuffer(new Uint8Array(data.video));
            if (data.time && this.one) {
                this.one = false;
                this.video.currentTime = data.time;
            }
        });
    },
    methods: {
        // 接收视频流
        sourceOpen(e) {
            this.sourceBuffer = this.mediaSource.addSourceBuffer(
                "video/webm;codecs=vp9"
            );
            //视频流结束
            this.sourceBuffer.addEventListener("updateend", () => {
                this.mediaSource.endOfStream();
                URL.revokeObjectURL(this.video.src);
            });
            URL.revokeObjectURL(this.video.src);
        },
        setPrompt() {
            this.mYname = prompt("请输入昵称");
            if (this.mYname) {
                sessionStorage.setItem("mYname", this.mYname);
            } else {
                this.setPrompt();
            }
        }
    }
};
</script>

<style lang="scss">
.look-live {
    width: 100%;
    height: 100%;
    position: relative;
    video {
        // width: 100%;
        // height: 100%;
        border: 1px solid #000;
    }
}
</style>
