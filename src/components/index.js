import whiteBoard from "../views/animation/whiteBoard";
import Cupload from "./upload/c-upload.vue";

const commonalityStype = {
    install: function (Vue) {
        Vue.component("c-whiteBoard", whiteBoard);
        Vue.component("c-upload", Cupload);
    }
};
export default commonalityStype;
// 导出组件
