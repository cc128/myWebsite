import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/",
                redirect: "/video-call"
            },
            {
                path: "/video-call",
                name: "视频语音",
                component: () => import("../views/video-call/video-call.vue")
            },
            {
                path: "/chatroom",
                name: "聊天室",
                component: () => import("../views/chatroom/chatroom.vue")
            },
            {
                path: "/game",
                name: "小游戏",
                component: () => import("../views/game/game.vue")
            },
            {
                path: "/open-live",
                name: "开直播",
                component: () => import("../views/live/open-live.vue")
            },
            {
                path: "/look-live",
                name: "看直播",
                component: () => import("../views/live/look-live.vue")
            }
        ]
    }
];

const router = new VueRouter({
    routes
});

export default router;
