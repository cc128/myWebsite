import whiteBoard from "../views/animation/whiteBoard"; // 白板
import Cupload from "./upload/c-upload.vue";// 上传
import Cecharts from "./echarts";// 上传

const commonalityStype = {
    install: function (Vue) {
        Vue.component("c-whiteBoard", whiteBoard);
        Vue.component("c-upload", Cupload);
        Vue.component("c-echarts", Cecharts);
    }
};
export default commonalityStype;
// 导出组件
