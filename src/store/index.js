import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        mYname: "", //连接者的名字
        socketId: "", //连接者的id
        videoLinkUserList: [] //连接的-视频语音用户
    },
    mutations: {},
    actions: {},
    modules: {}
});
