/*
创建者：cc
模块名称：xxxx
备注：xxxx
*/
<template>
    <div class="floor-plan">
        <div class="plan-container" @mousemove="mousemove">
            <div v-if="floorPlanData.length" class="lock">
                <i v-if="Object.keys(floorPlanData[0].lock).length" class="el-icon-lock" @click="floorPlanData[0].lock = {}"></i>
                <i v-else class="el-icon-unlock" @click="lockImgVal"></i>
            </div>
            <div v-if="floorPlanData.length && isIconBtn" class="full-screen">
                <span @click="zoom(0.04)">
                    <svg t="1605081419908" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2860" width="30" height="30">
                        <path d="M980.700543 468.454893H557.401933V45.156283a43.350032 43.350032 0 0 0-86.700063 0v423.29861H47.396035a43.350032 43.350032 0 0 0 0 86.700064h423.305835v423.31306a43.350032 43.350032 0 0 0 86.700063 0v-423.31306h423.29861a43.350032 43.350032 0 0 0 0-86.700064z" fill="#409eff" p-id="2861"></path>
                    </svg>
                </span>
                <br>
                <span @click="zoom(-0.04)">
                    <svg t="1605081503523" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3738" width="30" height="30">
                        <path d="M939 537c0 8.284-5.373 15-12 15H97c-6.627 0-12-6.716-12-15v-50c0-8.284 5.373-15 12-15h830c6.627 0 12 6.716 12 15v50z" fill="#409eff" p-id="3739"></path>
                    </svg>
                </span>
                <br>
                <span v-if="fullscreen" @click="setFullScreen">
                    <svg t="1604932164354" class="icon" viewBox="0 0 1028 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3289" width="30" height="30">
                        <path d="M984.632966 274.877757l-161.960735-0.592277 181.721237-180.64437C1024.261656 73.557548 1024.261656 41.036177 1004.393468 21.006459 984.417593 0.97674 952.111595 0.97674 932.243406 21.006459l-183.498067 182.528887 1.238397-165.191335c0.48459-20.729682-15.883782-38.767197-36.505777-38.282607l-26.114015 0c-20.621995 0.538433-37.690331 12.868556-38.121077 33.598238l-1.076867 286.608043c0 0.376903 1.346083 0.64612 1.346083 1.023023l-1.992203 18.791322C647.35835 350.419948 649.7813 359.734844 656.457873 366.357574c6.568886 6.730416 15.829939 10.768666 26.114015 10.499449L701.20168 376.48012c0.430747 0 0.699963-0.16153 1.076867-0.215373L989.263492 377.880046c20.621995-0.48459 37.636487-17.606769 38.174921-38.390294L1027.438413 313.160364C1024.3155 288.715493 1005.201118 274.393167 984.632966 274.877757zM1025.500053 711.816376l-0.053843-26.329388c-0.48459-20.783525-17.445239-37.905704-37.959547-38.390294l-285.477333 1.561457c-0.430747 0-0.699963-0.16153-1.076867-0.16153l-18.575949-0.430747c-10.230233-0.32306-19.437442 3.769033-26.006328 10.445606-6.62273 6.676573-9.045679 15.991469-8.830306 26.383231l1.992203 18.791322c0 0.376903-1.346083 0.64612-1.346083 1.023023l1.076867 284.400466c0.430747 20.729682 17.391395 33.059804 37.959547 33.544394l27.675471 0.053843c20.514309 0.48459 36.774994-17.606769 36.290404-38.336451l-1.184553-161.853048 182.74426 181.398177c19.760502 20.029719 51.958813 20.029719 71.773158 0s19.814345-52.55109 0-72.634651l-182.528887-182.25967 160.883868-0.592277C1003.316601 748.968273 1022.37714 736.261247 1025.500053 711.816376zM369.04218 658.565323c-6.568886-6.676573-15.829939-10.768666-26.114015-10.445606l-18.683635 0.430747c-0.32306 0-0.64612 0.16153-1.023023 0.16153L40.059437 647.096694c-20.568152 0.48459-37.636487 17.606769-38.121077 38.390294l-0.053843 26.329388c3.122913 24.444872 22.237295 37.098054 42.805447 36.721151l159.699315 0.592277L21.160428 931.33563C1.238397 951.419192 1.238397 983.940563 21.160428 1003.970281s52.174186 20.029719 72.096218 0l183.498067-182.475044-1.238397 160.883868c-0.48459 20.729682 15.883782 38.767197 36.451934 38.282607l26.167858 0c20.621995-0.538433 37.690331-12.814712 38.121077-33.598238l1.076867-282.35442c0-0.376903-1.346083-0.64612-1.346083-1.023023l2.046047-18.791322C378.141703 674.556792 375.718753 665.241896 369.04218 658.565323zM377.28021 320.267684l-1.076867-286.608043C375.82644 12.929959 358.811948 0.545993 338.297639 0.00756L310.622168 0.00756C290.107859-0.423186 273.847174 17.614329 274.331764 38.290167l1.238397 164.060625L92.879743 21.006459C73.011555 0.97674 40.867087 0.97674 21.052742 21.006459S1.238397 73.557548 21.052742 93.64111l180.913587 180.64437-159.376255 0.592277C22.129608 274.393167 3.122913 288.715493 0 313.160364l0.053843 26.329388C0.538433 360.273278 17.499082 377.395456 38.013391 377.880046l285.477333-1.6153c0.376903 0.053843 0.64612 0.215373 1.023023 0.215373l18.575949 0.430747c10.230233 0.269217 19.491285-3.769033 26.006328-10.499449C375.718753 359.734844 378.141703 350.419948 377.92633 340.028186L375.880283 321.236864C375.880283 320.85996 377.28021 320.644587 377.28021 320.267684z" p-id="3290" fill="#409eff"></path>
                    </svg>
                </span>
                <span v-else @click="setFullScreen">
                    <svg t="1604932084606" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2344" width="30" height="30">
                        <path d="M848.448 910.208l-187.328-187.328a56.96 56.96 0 1 1 80.512-80.448l168.576 168.64v-128.384H1024V1024h-341.312v-113.792h165.76z m-673.088 0h165.952V1024H0v-341.312h113.792v128.128L281.6 643.008a56.96 56.96 0 0 1 80.448 80.512L175.36 910.208zM829.568 113.792h-146.88V0H1024v341.312h-113.792V193.984l-168.576 168.704a56.96 56.96 0 0 1-80.64-80.512l168.512-168.384z m-635.328 0L362.048 281.6A56.896 56.896 0 0 1 281.6 362.048L113.792 194.24v147.072H0V0h341.312v113.792H194.24z" p-id="2345" fill="#409eff"></path>
                    </svg>
                </span>
            </div>
            <div v-show="floorPlanData.length && id" class="right-key" @click="deleEl">
                <div>
                    <svg t="1605451157155" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3410" width="30" height="30">
                        <path d="M841.142857 128h-658.285714c-60.635429 0-109.714286 42.934857-109.714286 96.036571V256h877.714286v-31.963429c0-53.101714-49.078857-96.036571-109.714286-96.036571zM649.508571 64l16.091429 100.937143H358.4l16.091429-100.937143h275.017142zM658.285714 0H365.714286c-30.208 0-58.221714 21.357714-62.464 47.542857l-21.357715 133.924572c-4.242286 26.185143 17.042286 47.542857 47.250286 47.542857h365.714286c30.208 0 51.492571-21.357714 47.250286-47.542857L720.749714 47.542857C716.507429 21.357714 688.493714 0 658.285714 0z m201.142857 320h-694.857142c-40.228571 0-70.217143 28.672-66.56 63.780571l59.977142 576.438858c3.584 35.108571 39.497143 63.780571 79.725715 63.780571h548.571428c40.228571 0 76.141714-28.672 79.725715-63.780571l59.977142-576.438858c3.657143-35.108571-26.331429-63.780571-66.56-63.780571zM365.714286 896H256L219.428571 448h146.285715v448z m219.428571 0H438.857143V448h146.285714v448z m182.857143 0H658.285714V448h146.285715l-36.571429 448z" p-id="3411" fill="#409eff"></path>
                    </svg>
                </div>
                <!-- <div>删除</div> -->
            </div>
            <img class="plan-img" v-for="(item, i) in floorPlanData" :key="item.id" :src="item.url" :style="{width: `${item.width}px`, height: `${item.height}px`, left: `${item.left}px`, top: `${item.top}px`, zIndex: item.zIndex}" :id="item.id" :type="item.type" :index="i" @mousedown="mousedown" @mouseup="mouseup" @mousewheel="mousewheel" @mouseenter.stop="mouseenter" @mouseleave="mouseleave">
            <!--   -->
            <img class="children-img" v-for="(item, i) in floorPlanData[0] ? floorPlanData[0].children : []" :key="item.id" :src="item.url" alt="" :style="{width: `${item.width}px`, height: `${item.height}px`, left: `${item.left}px`, top: `${item.top}px`, zIndex: `${item.zIndex}`}" :id="item.id" :type="item.type" :index="i" :class="{highlighticon: item.id === id}" @mousedown="mousedown" @mouseup="mouseup" @mouseenter.stop="mouseenter" @mouseleave="mouseleave">
        </div>
        <!-- <div v-if="floorPlanData.length" class="list">
            {{ floorPlanData }}
        </div> -->
    </div>
</template>

<script>
export default {
    props: {
        formInline: {
            type: Object,
            default: () => {
                return {
                    name: "",
                    url: "",
                    lock_info: `{}`
                }
            }
        }, // 图纸-存储所有操作信息 
        upPlan: {
            type: String,
            default: ""
        }, //添加平面图
        upIcon: {
            type: String,
            default: ""
        }, //添加图标
    },
    data() {
        return {
            isIconBtn: false,
            id: "",
            active: null, //右键选中的值
            floorPlanData: [], //图片容器-存储所有操作信息
            fullscreen: false, //是否全屏
            ELid: "", //当前元素的唯一标识
            rightKeyEl: null, //右键菜单元素
            isShow: false, //是否显示右键菜单
            elScale: 0, // 缩放比例
            planContainer: "", //图层容器
            div: null, //根节点
            isRightKey: false, // 右键是否按下
            rightKeyX: 0, //鼠标右键按下的x点
            rightKeyY: 0, //鼠标右键按下的y点
            ctrlKey: false, //组合键使用，暂未使用
            zIndex: 2, //icon的层级
        };
    },
    computed: {},
    created() { },
    mounted() {
        this.div = document.getElementsByClassName("floor-plan")[0];//根节点
        // 右键菜单
        this.div.oncontextmenu = (e) => {
            e.preventDefault();
            return false
        };
        // 禁用滚轮
        this.div.onmousewheel = (e) => {
            e.preventDefault();
            return false
        };
        document.onkeydown = (e) => {
            // 按下ctrl键
            if (e.key === "Control") {
                this.ctrlKey = true;
            }
        }
        document.onkeyup = (e) => {
            // 松开ctrl键
            if (e.key === "Control") {
                this.ctrlKey = false;
            }
        }
        this.$emit("confirm", this.confirm);
        this.planContainer = document.getElementsByClassName("plan-container")[0]; //容器
        this.rightKeyEl = document.getElementsByClassName("right-key")[0];//右键菜单元素
        this.isDate();

    },
    watch: {
        upPlan: function (v1, v2) {
            this.upFunc(v1); //上传图纸
        },
        upIcon: function (v1, v2) {
            if (v1) {
                this.addIcon(v1); //添加图标
            }
        },//添加图标
        formInline: {
            handler(v1, v2) {
                this.floorPlanData = JSON.parse(this.formInline.lock_info);
            },
            // immediate: true,  //刷新加载 立马触发一次handler
            deep: true  // 可以深度检测到 person 对象的属性值的变化
        }
    },
    methods: {
        // 是否加载图片
        isDate() {
            if (this.floorPlanData.length) {
                this.planImg = document.getElementsByClassName("plan-img")[0]; // 平面图
            } else {
                setTimeout(() => {
                    this.isDate()
                }, 100);
            }
        },
        // 暴露是否全屏方法
        setFullScreen() {
            this.fullscreen = !this.fullscreen;
            this.$emit("fullscreen", this.fullscreen)
        },
        // 暴露获取值的方法
        confirm() {
            return this.floorPlanData
        },
        // 鼠标按下
        mousedown(e) {
            // this.isShow = false;
            e.preventDefault();
            // 左键
            if (e.button === 0) {
                e.target.style.cursor = "move";
                //左键
                this.isRightKey = true;
                this.rightKeyX = e.clientX;
                this.rightKeyY = e.clientY;
                e.target.style.position = "absolute";
            }
        },
        // 鼠标松开
        mouseup(e) {
            e.target.style.cursor = "pointer";
            let i = e.path[0].getAttribute("index");
            if (e.button === 0) {
                this.isRightKey = false;
                let obj;
                if (e.path[0].getAttribute("type") === "parent") {
                    obj = this.floorPlanData[0];
                } else {
                    obj = this.floorPlanData[0].children[i];
                    this.id = obj.id;
                }
                obj.resultX = e.target.offsetLeft;
                obj.resultY = e.target.offsetTop;

            } else if (e.button === 2) {
                if (e.path[0].getAttribute("type") === "children") {
                    // this.active = i;
                    // this.isShow = true;
                    // this.rightKeyEl.style.left = e.target.offsetLeft + e.offsetX + 30 + "px";
                    // this.rightKeyEl.style.top = e.target.offsetTop + e.offsetY - 20 + "px";
                }
            }
        },
        // 鼠标移动
        mousemove(e) {
            if (this.isRightKey && e.button === 0) {
                let obj;
                if (e.path[0].getAttribute("type") === "parent") {
                    obj = this.floorPlanData[0];
                } else {
                    let i = e.path[0].getAttribute("index");
                    obj = this.floorPlanData[0].children[i];
                }
                // 左移动距离 === 鼠标移动位置 - 鼠标按下时的位置 + 拖动前-鼠标松开的值
                let left = e.clientX - this.rightKeyX + obj.resultX; // 计算移动距离
                let top = e.clientY - this.rightKeyY + obj.resultY; // 计算移动距离
                // if (left <= 0) left = 0;
                // if (top <= 0) top = 0;
                if (obj.type === "children") {
                    if (((top + e.target.offsetHeight * 0.75) >= this.planImg.offsetTop + this.planImg.offsetHeight) || ((left + e.target.offsetWidth / 2) >= this.planImg.offsetLeft + this.planImg.offsetWidth) || (left <= this.planImg.offsetLeft - e.target.offsetWidth / 2) || (top <= this.planImg.offsetTop - e.target.offsetHeight * 0.75)) {
                        return;
                    }
                }; //限制设备的移动范围
                // // e.target.style.left = left + "px";
                // // e.target.style.top = top + "px";
                // // 更新数据
                obj.left = left;
                obj.top = top;
                obj.parentX = left - this.floorPlanData[0].left;
                obj.parentY = top - this.floorPlanData[0].top;
                if (obj.type === "parent") {
                    // let img = document.getElementsByTagName("img");
                    for (let i = 0; i < this.floorPlanData[0].children.length; i++) {
                        // if ((this.floorPlanData[0].children[i].parentX <= e.target.width - this.floorPlanData[0].children[i].width / 2) && (this.floorPlanData[0].children[i].parentY <= e.target.height - this.floorPlanData[0].children[i].height * 0.75) && (this.floorPlanData[0].children[i].parentX >= -(this.floorPlanData[0].children[i].width / 2)) && (this.floorPlanData[0].children[i].parentY >= -(this.floorPlanData[0].children[i].height * 0.75))) {
                        this.floorPlanData[0].children[i].left = left + this.floorPlanData[0].children[i].parentX;
                        this.floorPlanData[0].children[i].top = top + this.floorPlanData[0].children[i].parentY;
                        this.floorPlanData[0].children[i].resultX = left + this.floorPlanData[0].children[i].parentX;
                        this.floorPlanData[0].children[i].resultY = top + this.floorPlanData[0].children[i].parentY;
                        // } // 设备移除图层外，不做联动
                    }
                }
            }
        },
        // 鼠标移入
        mouseenter(e) {
            // // if (this.isShow) return;
            // e.target.style.boxShadow = "0 0 10px #fff";
            e.target.style.cursor = "pointer";
            // 鼠标移入图标时提高层级
            let obj;
            if (e.path[0].getAttribute("type") === "parent") {
                obj = this.floorPlanData[0];
            } else {
                let i = e.path[0].getAttribute("index");
                obj = this.floorPlanData[0].children[i];
                obj.zIndex = this.zIndex += 1;
            }
        },
        // 鼠标移开
        mouseleave(e) {
            // e.target.style.boxShadow = "0 0 0px #fff";
            this.isRightKey = false;
            let obj;
            if (e.path[0].getAttribute("type") === "parent") {
                obj = this.floorPlanData[0];
            } else {
                let i = e.path[0].getAttribute("index");
                obj = this.floorPlanData[0].children[i];
            }
            obj.resultX = e.target.offsetLeft;
            obj.resultY = e.target.offsetTop;
        },
        // 缩放
        zoom(elScale) {
            if (elScale < 0) {
                if (this.floorPlanData[0].width <= this.planContainer.offsetWidth / 2) {
                    // 最小缩放为容器宽度的一半
                    return
                }
                if (Object.keys(this.floorPlanData[0].lock).length) {
                    if (this.floorPlanData[0].width <= this.floorPlanData[0].lock.width) {
                        // 锁定时禁止缩小
                        return
                    }
                }
            } else {
                if (this.floorPlanData[0].width >= 10000 || this.floorPlanData[0].height >= 10000) {
                    // 最大放大等级
                    return
                }
            }
            let w = this.floorPlanData[0].width * elScale + this.floorPlanData[0].width;
            let h = this.floorPlanData[0].height * elScale + this.floorPlanData[0].height;
            let l = this.floorPlanData[0].left - this.floorPlanData[0].width / 2 * elScale;
            let t = this.floorPlanData[0].top - this.floorPlanData[0].height / 2 * elScale;
            this.floorPlanData[0].width = w;
            this.floorPlanData[0].height = h;
            this.floorPlanData[0].top = t;
            this.floorPlanData[0].left = l;
            this.floorPlanData[0].resultX = l;
            this.floorPlanData[0].resultY = t;
            for (let i = 0; i < this.floorPlanData[0].children.length; i++) {
                // // 左移动距离 === 设备距离父级的值 + 设备宽的一半 * 缩放倍数 + 设备距离父级的值 + 父级的左值
                let parentX = (this.floorPlanData[0].children[i].parentX + this.floorPlanData[0].children[i].width / 2) * elScale;
                let parentY = (this.floorPlanData[0].children[i].parentY + this.floorPlanData[0].children[i].height * 0.75) * elScale;
                this.floorPlanData[0].children[i].left = l + parentX + this.floorPlanData[0].children[i].parentX;
                this.floorPlanData[0].children[i].top = t + parentY + this.floorPlanData[0].children[i].parentY;
                this.floorPlanData[0].children[i].parentX += parentX;
                this.floorPlanData[0].children[i].parentY += parentY;
                this.floorPlanData[0].children[i].resultX = this.floorPlanData[0].children[i].left;
                this.floorPlanData[0].children[i].resultY = this.floorPlanData[0].children[i].top;
                // // if ((this.floorPlanData[0].children[i].parentX <= e.target.width - this.floorPlanData[0].children[i].width / 2) && (this.floorPlanData[0].children[i].parentY <= e.target.height - this.floorPlanData[0].children[i].height * 0.75) && (this.floorPlanData[0].children[i].parentX >= -(this.floorPlanData[0].children[i].width / 2)) && (this.floorPlanData[0].children[i].parentY >= -(this.floorPlanData[0].children[i].height * 0.75))) {
                // } // 设备移除图层外，不做联动
            }
        },
        // 滚轮事件
        mousewheel(e) {
            if (e.deltaY > 0) {
                if (e.target.offsetWidth <= this.planContainer.offsetWidth / 2) {
                    // 最小缩放为容器宽度的一半
                    return
                }
                if (Object.keys(this.floorPlanData[0].lock).length) {
                    if (e.target.offsetWidth <= this.floorPlanData[0].lock.width) {
                        // 锁定时禁止缩小
                        return
                    } else {
                        this.elScale = -0.04
                    }
                } else {
                    this.elScale = -0.04
                }
            } else {
                if (e.target.offsetWidth >= 10000 || e.target.offsetHeight >= 10000) {
                    // 最大放大等级
                    return
                }
                this.elScale = 0.04
            }
            let obj;
            if (e.path[0].getAttribute("type") === "parent") {
                obj = this.floorPlanData[0];
            } else {
                let i = e.path[0].getAttribute("index");
                obj = this.floorPlanData[0].children[i];
            }
            obj.left = e.target.offsetLeft - e.offsetX * this.elScale;
            obj.top = e.target.offsetTop - e.offsetY * this.elScale;
            obj.width = e.target.offsetWidth + e.target.offsetWidth * this.elScale;
            obj.height = e.target.offsetHeight + e.target.offsetHeight * this.elScale; //宽
            obj.resultX = obj.left; //最后的位置
            obj.resultY = obj.top; //最后的位置
            for (let i = 0; i < this.floorPlanData[0].children.length; i++) {
                // // 左移动距离 === 设备距离父级的值 + 设备宽的一半 * 缩放倍数 + 设备距离父级的值 + 父级的左值
                let parentX = (this.floorPlanData[0].children[i].parentX + this.floorPlanData[0].children[i].width / 2) * this.elScale;
                let parentY = (this.floorPlanData[0].children[i].parentY + this.floorPlanData[0].children[i].height * 0.75) * this.elScale;
                this.floorPlanData[0].children[i].left = obj.left + parentX + this.floorPlanData[0].children[i].parentX;
                this.floorPlanData[0].children[i].top = obj.top + parentY + this.floorPlanData[0].children[i].parentY;
                this.floorPlanData[0].children[i].parentX += parentX;
                this.floorPlanData[0].children[i].parentY += parentY;
                this.floorPlanData[0].children[i].resultX = this.floorPlanData[0].children[i].left;
                this.floorPlanData[0].children[i].resultY = this.floorPlanData[0].children[i].top;
                // // if ((this.floorPlanData[0].children[i].parentX <= e.target.width - this.floorPlanData[0].children[i].width / 2) && (this.floorPlanData[0].children[i].parentY <= e.target.height - this.floorPlanData[0].children[i].height * 0.75) && (this.floorPlanData[0].children[i].parentX >= -(this.floorPlanData[0].children[i].width / 2)) && (this.floorPlanData[0].children[i].parentY >= -(this.floorPlanData[0].children[i].height * 0.75))) {
                // } // 设备移除图层外，不做联动
            }
        },
        //添加图标
        addIcon(url) {
            let arr = this.floorPlanData[0].children.filter(e => {
                return e.url === url;
            })
            if (arr.length) {
                this.id = arr[0].id
                // console.log(arr[0].id);
            } else {
                let id = String(Math.random());
                this.floorPlanData[0].children.push({
                    id: id, //唯一标识
                    url: this.upIcon, //图标地址
                    type: "children", // 表示父级
                    left: this.floorPlanData[0].left, //左-坐标 初始化在图片左上角
                    top: this.floorPlanData[0].top, //上-坐标 初始化在图片左上角
                    lock: {}, //锁定值
                    width: 75, // 宽
                    height: 80, // 高
                    resultX: 0, // 最后的位置
                    resultY: 0, // 最后的位置
                    zIndex: this.zIndex,
                    parentX: 0, // 父x 初始化距离图层的位置
                    parentY: 0, // 父y初始化距离图层的位置
                });
            }
        },
        //添加平面图
        upFunc(url) {
            if (url) {
                let id = String(Math.random());
                this.$set(this.floorPlanData, 0, {
                    isShow: true,
                    url: this.upPlan, //图片地址
                    id: id, //唯一标识
                    type: "parent", // 表示父级
                    left: 0, //左-坐标
                    top: 0, //上-坐标
                    lock: {}, //锁定值
                    width: this.planContainer.offsetWidth, // 容器的宽
                    height: this.planContainer.offsetHeight, // 容器的高
                    resultX: 0, // 最后的位置
                    resultY: 0, // 最后的位置
                    zIndex: 0,
                    children: [],
                });
            } else {
                this.floorPlanData = [];
                this.id = null;
            }
        },
        //删除元素
        deleEl() {
            this.$confirm('删除此设备, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                closeOnClickModal: false,
                closeOnPressEscape: false,
                type: 'warning'
            }).then(() => {
                let i = this.floorPlanData[0].children.findIndex((e) => {
                    return e.id === this.id
                })
                if (i >= 0) {
                    this.floorPlanData[0].children.splice(i, 1);
                    this.id = null;
                }
                // console.log(i, 111111)
            }).catch(() => { });
            this.isShow = false;

        },
        // 锁定
        lockImgVal() {
            this.floorPlanData[0].lock = {
                width: this.floorPlanData[0].width,
                height: this.floorPlanData[0].height,
                left: this.floorPlanData[0].left,
                top: this.floorPlanData[0].top,
            }
        }
    },
    components: {},
};
</script>

<style lang="scss">
:root {
    --radial-gradient: radial-gradient(
        yellow 15%,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0)
    );
}
.floor-plan {
    flex: 1;
    // width: 90%;
    // min-height: 70vh;
    // height: 90%;
    overflow: auto;
    // background: #333;
    // position: relative;
    // position: fixed;
    // top: 0;
    // left: 0;
    display: flex;
    .plan-container {
        // background: #ccc;
        flex: 1;
        position: relative;
        overflow: hidden;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) inset;
        .plan-img {
            position: absolute;
            // opacity: 0;
            z-index: 0;
        }
        .children-img {
            // border: 1px solid red;
            border-radius: 50%;
            &:hover {
                background-image: radial-gradient(
                    yellow 15%,
                    rgba(0, 0, 0, 0),
                    rgba(0, 0, 0, 0)
                ) !important;
            }
        }
        .highlighticon {
            background-image: var(--radial-gradient);
        }
        img {
            position: absolute;
        }
    }
    .list {
        color: red;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 999;
    }
    .right-key {
        left: 50%;
        position: absolute;
        bottom: 10px;
        cursor: pointer;
        overflow: hidden;
        z-index: 999;
        font-size: 14px;
        // li {
        //     padding: 10px 20px;
        // }
        &:hover {
            transform: scale(1.1);
        }
    }
    .lock {
        color: #409eff;
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;
        font-size: 30px;
        z-index: 999;
        user-select: none;
    }
    .full-screen {
        color: #409eff;
        position: absolute;
        right: 10px;
        bottom: 10px;
        cursor: pointer;
        font-size: 30px;
        z-index: 999;
        user-select: none;
    }
}
.plan::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background-color: rgba(255, 255, 255, 0.15);
}
/*定义滑块 内阴影+圆角*/
.plan::-webkit-scrollbar-thumb {
    border-radius: 10px;
    // box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgba(0, 210, 255, 0.61);
}
</style>
