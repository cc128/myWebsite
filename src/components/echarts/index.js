import * as Echarts from "echarts";
import "echarts-gl";
// import { throttle } from "@/lib/utils.js";

const Events = [
    "click",
    "dblclick",
    "mouseover",
    "mouseout",
    "mousedown",
    "mouseup",
    "globalout",
    "legendselectchanged",
    "legendselected",
    "legendunselected",
    "datazoom",
    "datarangeselected",
    "timelinechanged",
    "timelineplaychanged",
    "restore",
    "dataviewchanged",
    "magictypechanged",
    "geoselectchanged",
    "geoselected",
    "geounselected",
    "pieselectchanged",
    "pieselected",
    "pieunselected",
    "mapselectchanged",
    "mapselected",
    "mapunselected",
    "axisareaselected",
    "brush",
    "brushselected"
];

require("echarts/map/js/china.js");

export default {
    components: {},
    props: {
        //图表容器样式默认百分之百
        styles: {
            type: Object,
            default() {
                return {
                    width: "100%",
                    height: "100%"
                };
            }
        },
        theme: {
            type: String
        },
        //devicePixelRatio设备像素比,renderer渲染器(canvas，svg),width,height
        initOpts: {
            type: Object
        },
        //echarts相关设置
        options: {
            type: Object,
            require: true
        },
        //是否有加载圈
        isLoading: {
            type: Boolean
        },
        //加载圈样式
        loadingOpts: {
            type: Object
        },
        //绑定事件的查询方法
        eventQuery: {
            type: [Object, String]
        }
    },
    data() {
        return {
            wraper: null, //当前包裹框
            instance: null //echarts实例
        };
    },
    created() {
        // window.addEventListener("resize", () => {
        //     if (this.instance) {
        //         // console.log("resize")
        //         this.instance.resize();
        //     }
        // })
        window.addEventListener(
            "resize",
            () => {
                if (this.instance) {
                    this.instance.resize();
                }
            }
        );
    },
    mounted() {
        this.wraper = this.$el;
        this.instance = Echarts.init(this.wraper, this.theme, this.initOpts);
        this.$emit("ready", this.instance, Echarts);
        this.instance.setOption(this.options);
        this.isLoading
            ? this.instance.showLoading("default", this.loadingOpts)
            : this.instance.hideLoading("default", this.loadingOpts);
        this.initEvents();
    },
    methods: {
        //初始化所有事件
        initEvents() {
            Events.forEach(event => {
                const query = this.eventQuery ? this.eventQuery[event] : "";
                if (this.instance) {
                    if (query) {
                        // this.instance.on(event, query, () => {
                        //     this.$emit(event, this.instance, query);
                        // });
                        this.instance.on(event, e => {
                            this.$emit(event, e, this.instance);
                        });
                    } else {
                        // this.instance.on(event, () => {
                        //     this.$emit(event, this.instance, query);
                        // });
                        this.instance.on(event, e => {
                            this.$emit(event, e, this.instance);
                        });
                    }
                }
            });
        }
    },
    watch: {
        options: {
            handler() {
                if (this.options.clear) {
                    this.instance.clear();
                }
                this.instance.setOption(this.options);
            },
            deep: true
        },
        isLoading() {
            this.isLoading
                ? this.instance.showLoading("default", this.loadingOpts)
                : this.instance.hideLoading("default", this.loadingOpts);
        }
    },
    render(h) {
        return h("div", {
            style: this.styles
        });
    }
};
