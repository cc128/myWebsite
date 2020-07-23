<template>
    <div class="look-live">
        <video v-for="(item, i) in liveList" :key="i" autoplay="autoplay" muted="muted" @click="getVideo($event, item)"></video>
    </div>
</template>

<script>
export default {
    data() {
        return {
            socketId: this.$store.state.socketId, //自己得id
            liveList: this.$store.state.openLiveUserList, //直播列表
            one: true,
            mYname: sessionStorage.getItem("mYname") || null,
            video: null,
            mediaSource: null,
            sourceBuffer: null
        };
    },
    watch: {
        // "$store.state.socketId": function (v1, v2) {
        //     if (v1) {
        //         console.log(222222)
        //         this.socketId = this.$store.state.socketId;
        //         this.$socket.emit("userLink", {
        //             name: this.mYname,
        //             socketId: this.socketId,
        //             type: this.$route.name
        //         }); //链接房间
        //     }
        // },
        "$store.state.openLiveUserList": function (v1, v2) {
            if (v1) {
                this.liveList = this.$store.state.openLiveUserList;
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
        // // 获取视频
        this.$socket.on("videoData", data => {
            console.log(data);
            this.sourceBuffer.appendBuffer(new Uint8Array(data.video));
            if (data.time && this.one) {
                this.one = false;
                this.video.currentTime = data.time;
            }
        });
        this.$socket.on("sendVideo", data => {
            console.log("接收视频流", data.video)
            this.sourceBuffer.appendBuffer(new Uint8Array(data.video));
        })
    },
    methods: {
        // 创建可添加视频流的url
        getVideo(el, e) {
            console.log(el.target)
            // console.log(el.target, e, 1111111)
            this.video = el.target;
            this.mediaSource = new MediaSource();
            this.video.src = window.URL.createObjectURL(this.mediaSource);
            this.mediaSource.addEventListener("sourceopen", this.sourceOpen);
            this.$socket.emit("getVideo", {
                socketId: this.socketId,
                videoId: e.socketId,
            })
        },
        // 接收视频流
        sourceOpen(e) {
            this.sourceBuffer = this.mediaSource.addSourceBuffer("video/webm;codecs=vp9");
            // //视频流结束
            // this.sourceBuffer.addEventListener("updateend", () => {
            //     this.mediaSource.endOfStream();
            //     URL.revokeObjectURL(this.video.src);
            // });
            // URL.revokeObjectURL(this.video.src);
        },
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
