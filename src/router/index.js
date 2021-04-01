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
                path: "/bmap",
                name: "全景",
                component: () => import("../views/test/bmap.vue")
            },
            {
                path: "/amap",
                name: "高德",
                component: () => import("../views/test/amap.vue")
            },
            // {
            //     path: "/map",
            //     name: "图表",
            //     component: () => import("../views/test/map.vue")
            // },
            {
                path: "/map2",
                name: "离线地图",
                component: () => import("../views/test/map2.vue")
            },
            {
                path: "/map3",
                name: "离线地图",
                component: () => import("../views/test/map3.vue")
            },
            {
                path: "/vr",
                name: "VR",
                component: () => import("../views/test/vr.vue")
            },
            {
                path: "/animation",
                name: "效果集合",
                component: () => import("../views/animation/index.vue")
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
            },
            {
                path: "/screenCAP",
                name: "录屏",
                component: () => import("../views/screenCAP")
            },
            {
                path: "/map",
                name: "地图",
                component: () => import("../views/map")
            },
            {
                path: "/plan",
                name: "平面图",
                component: () => import("../views/plan")
            },
            {
                path: "/pMap",
                name: "离线地图",
                component: () => import("../views/test/pMap")
            }
        ]
    }
];

const router = new VueRouter({
    routes
});

export default router;
