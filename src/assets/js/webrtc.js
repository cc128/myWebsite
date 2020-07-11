class webrtc {
    constructor(x, y) {
        this.mediaRecorder = null;
        this.videoBox = null; //视频元素
        this.tracks = null;
        this.front = true;
    }
    getCamera(tag) {
        this.videoBox = document.querySelector(tag);
        return navigator.mediaDevices
            .getUserMedia({
                audio: false,
                video: {
                    // width: { min: 1024, ideal: 1280, max: 1920 },
                    // height: { min: 576, ideal: 720, max: 1080 },
                    width: this.videoBox.offsetHeight,
                    height: this.videoBox.offsetWidth,

                    facingMode: this.front ? "environment" : "user"
                }
            })
            .then(localStream => {
                this.tracks = localStream.getTracks()[0];
                // 获取摄像头画面，赋值给video标签
                this.videoBox.srcObject = localStream;
                // 播放
                this.videoBox.onloadedmetadata = e => {
                    this.videoBox.play();
                };
                return {
                    videoBox: this.videoBox,
                    localStream: localStream
                };
            });
    }
    // 创建视频流
    getStream(localStream, callBack, time = 500) {
        this.mediaRecorder = new MediaRecorder(localStream, {
            mimeType: "video/webm;codecs=vp9"
        });
        // 500毫秒发送一次，视频流到后端
        this.mediaRecorder.ondataavailable = blob => {
            callBack(blob);
        };
        this.mediaRecorder.start(time);
    }
    closeCamera(el) {
        if (this.tracks) {
            this.tracks.stop();
        }
        // let tracks = el.srcObject.getTracks();
        // tracks[0].stop();
        // window.URL.revokeObjectURL(el.src);
        // el = "";
    }
    // 结束视频流
    overVideo(el) {
        if (this.mediaRecorder) {
            this.mediaRecorder.stop();
        }
    }
    reversal() {
        this.front = !this.front;
    }
}
export default webrtc;
