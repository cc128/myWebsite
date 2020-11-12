/*
创建者：cc
模块名称：xxxx
备注：xxxx
*/
<template>
    <div class="floor-plan">
        <div class="plan-container" @mousemove="mousemove">
            <div v-if="lock_info[ELid]" class="lock">
                <i v-if="Object.keys(lock_info[ELid].lock).length" class="el-icon-lock" @click="lock_info[ELid].lock = {}"></i>
                <i v-else class="el-icon-unlock" @click="lockImgVal"></i>
            </div>
            <div class="full-screen">
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
            <ul v-show="isShow" class="right-key">
                <li @click="deleEl">删除</li>
            </ul>
            <img class="plan-img" :src="url" alt="" srcset="" @mousedown="mousedown" @mouseup="mouseup" @mousewheel="mousewheel" @mouseenter.stop="mouseenter" @mouseleave="mouseleave">
        </div>
        <!-- <div v-if="lock_info[ELid]" class="list">
            <div>左{{ lock_info[ELid].left }} 上{{ lock_info[ELid].top }} 宽{{ lock_info[ELid].width }} 高{{ lock_info[ELid].height }} x{{ lock_info[ELid].resultX }} y{{ lock_info[ELid].resultY }} px{{ lock_info[ELid].parentX }} py{{ lock_info[ELid].parentY }}</div>
            <div>锁定值{{ lock_info[ELid].lock }}zIndex{{ zIndex }}</div>
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
            lock_info: {}, //图纸-存储所有操作信息
            url: "", //图纸
            parentID: null, //图层id
            fullscreen: false, //是否全屏
            ELid: "", //当前元素的唯一标识
            rightKeyEl: null, //右键菜单元素
            isShow: false, //是否显示右键菜单
            elScale: 0, // 缩放比例
            planContainer: "", //图层容器
            div: null, //根节点
            isRightKey: false, // 右键是否按下
            conEl: null, // 存储元素
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
        this.planContainer = document.getElementsByClassName("plan-container")[0]; //容器
        this.rightKeyEl = document.getElementsByClassName("right-key")[0];//右键菜单元素
        this.planImg = document.getElementsByClassName("plan-img")[0]; // 平面图
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
            handler(n, o) {
                this.lock_info = JSON.parse(this.formInline.lock_info);
            },
            // immediate: true,  //刷新加载 立马触发一次handler
            deep: true  // 可以深度检测到 person 对象的属性值的变化
        }
    },
    methods: {
        // 暴露是否全屏方法
        setFullScreen() {
            this.fullscreen = !this.fullscreen;
            this.$emit("fullscreen", this.fullscreen)
        },
        // 暴露获取值的方法
        confirm() {
            return this.lock_info
        },
        // 鼠标按下
        mousedown(e) {
            this.isShow = false;
            e.preventDefault();
            if (e.button === 0) {
                e.target.style.cursor = "move";
                //左键
                this.isRightKey = true;
                this.rightKeyX = e.clientX;
                this.rightKeyY = e.clientY;
                this.conEl = e.target; //存左键的元素
                e.target.style.position = "absolute";
            }
            // //右键

        },
        // 鼠标松开
        mouseup(e) {
            e.target.style.cursor = "pointer";
            if (e.button === 0) {
                this.isRightKey = false;
                this.lock_info[this.ELid].resultX = this.conEl.offsetLeft;
                this.lock_info[this.ELid].resultY = this.conEl.offsetTop;
            } else if (e.button === 2) {
                this.conEl = e.target; //存鼠标移入的元素
                this.isShow = true;
                this.rightKeyEl.style.left = e.target.offsetLeft + e.offsetX + 30 + "px";
                this.rightKeyEl.style.top = e.target.offsetTop + e.offsetY - 20 + "px";
            }
        },
        // 鼠标移动
        mousemove(e) {
            let img = document.getElementsByTagName("img");
            // 判断移入的元素是否为图片
            if (e.path[0].getAttribute("src")) {
                // e.style.transformOrigin = "center";
            }
            if (this.isRightKey && e.button === 0) {
                // 左移动距离 === 鼠标移动位置 - 鼠标按下时的位置 + 拖动前-鼠标松开的值
                let left = e.clientX - this.rightKeyX + this.lock_info[this.ELid].resultX; // 计算移动距离
                let top = e.clientY - this.rightKeyY + this.lock_info[this.ELid].resultY; // 计算移动距离
                // if (left <= 0) left = 0;
                // if (top <= 0) top = 0;
                if (this.lock_info[this.ELid].type === "children") {
                    if (((top + e.target.offsetHeight * 0.75) >= img[0].offsetTop + img[0].offsetHeight) || ((left + e.target.offsetWidth / 2) >= img[0].offsetLeft + img[0].offsetWidth) || (left <= img[0].offsetLeft - e.target.offsetWidth / 2) || (top <= img[0].offsetTop - e.target.offsetHeight * 0.75)) {
                        return;
                    }
                }; //限制设备的移动范围
                e.target.style.left = left + "px";
                e.target.style.top = top + "px";
                // 更新数据
                this.lock_info[this.ELid].left = left;
                this.lock_info[this.ELid].top = top;
                this.lock_info[this.ELid].parentX = left - img[0].offsetLeft;
                this.lock_info[this.ELid].parentY = top - img[0].offsetTop;
                if (this.lock_info[this.ELid].type === "parent") {
                    for (let i = 0; i < img.length; i++) {
                        let id = img[i].getAttribute("id");
                        if (this.lock_info[id].type === "children") {
                            // if ((this.lock_info[id].parentX <= e.target.width - this.lock_info[id].width / 2) && (this.lock_info[id].parentY <= e.target.height - this.lock_info[id].height * 0.75) && (this.lock_info[id].parentX >= -(this.lock_info[id].width / 2)) && (this.lock_info[id].parentY >= -(this.lock_info[id].height * 0.75))) {
                            img[i].style.left = left + this.lock_info[id].parentX + "px";
                            img[i].style.top = top + this.lock_info[id].parentY + "px";
                            this.lock_info[id].left = img[i].offsetLeft;
                            this.lock_info[id].top = img[i].offsetTop;
                            this.lock_info[id].resultX = img[i].offsetLeft;
                            this.lock_info[id].resultY = img[i].offsetTop;
                            // } // 设备移除图层外，不做联动
                        }
                    }
                }
            }
        },
        // 鼠标移入
        mouseenter(e) {
            // if (this.isShow) return;
            this.ELid = e.path[0].getAttribute("id"); // 获取唯一标识
            this.conEl = e.target; //存鼠标移入的元素
            e.target.style.boxShadow = "0 0 10px #fff";
            e.target.style.cursor = "pointer";
            // 鼠标移入图标时提高层级
            if (this.lock_info[this.ELid].type === "children") {
                e.target.style.zIndex = this.zIndex += 1;
            }
        },
        // 鼠标移开
        mouseleave(e) {
            e.target.style.boxShadow = "0 0 0px #fff";
            this.isRightKey = false;
            this.lock_info[this.ELid].resultX = this.conEl.offsetLeft;
            this.lock_info[this.ELid].resultY = this.conEl.offsetTop;
        },
        // 缩放
        zoom(elScale) {
            let w = this.planImg.offsetWidth * elScale + this.planImg.offsetWidth;
            let l = this.planImg.offsetLeft - this.planImg.offsetWidth / 2 * elScale;
            let t = this.planImg.offsetTop - this.planImg.offsetHeight / 2 * elScale;
            this.planImg.style.left = l + "px";
            this.planImg.style.top = t + "px";
            this.planImg.style.width = w + "px";

            let img = document.getElementsByTagName("img");
            for (let i = 0; i < img.length; i++) {
                let id = img[i].getAttribute("id");
                if (this.lock_info[id].type === "children") {
                    // if ((this.lock_info[id].parentX <= this.planImg.width - this.lock_info[id].width / 2) && (this.lock_info[id].parentY <= this.planImg.height - this.lock_info[id].height * 0.75) && (this.lock_info[id].parentX >= -(this.lock_info[id].width / 2)) && (this.lock_info[id].parentY >= -(this.lock_info[id].height * 0.75))) {
                    // 左移动距离 === 设备距离父级的值 + 设备宽的一半 * 缩放倍数 + 设备距离父级的值 + 父级的左值
                    img[i].style.left = (this.lock_info[id].parentX + this.lock_info[id].width / 2) * elScale + this.lock_info[id].parentX + this.planImg.offsetLeft + "px";
                    img[i].style.top = (this.lock_info[id].parentY + this.lock_info[id].height * 0.75) * elScale + this.lock_info[id].parentY + this.planImg.offsetTop + "px";
                    this.lock_info[id].parentX += (this.lock_info[id].parentX + this.lock_info[id].width / 2) * elScale;
                    this.lock_info[id].parentY += (this.lock_info[id].parentY + this.lock_info[id].height * 0.75) * elScale;
                    this.lock_info[id].left = img[i].offsetLeft;
                    this.lock_info[id].top = img[i].offsetTop;
                    this.lock_info[id].resultX = img[i].offsetLeft;
                    this.lock_info[id].resultY = img[i].offsetTop;
                    // } // 设备移除图层外，不做联动
                }
            }
            this.lock_info[this.parentID].width = this.planImg.offsetWidth; //宽
            this.lock_info[this.parentID].height = this.planImg.offsetHeight; //宽
            this.lock_info[this.parentID].left = this.planImg.offsetLeft; //元素x位置
            this.lock_info[this.parentID].top = this.planImg.offsetTop; //元素x位置
            this.lock_info[this.parentID].resultX = this.planImg.offsetLeft; //最后的位置
            this.lock_info[this.parentID].resultY = this.planImg.offsetTop; //最后的位置
        },
        // 滚轮事件
        mousewheel(e) {
            if (e.deltaY > 0) {
                if (e.target.offsetWidth <= this.planContainer.offsetWidth / 2) {
                    // 最小缩放为容器宽度的一半
                    return
                }
                if (Object.keys(this.lock_info[this.ELid].lock).length) {
                    if (e.target.offsetWidth <= this.lock_info[this.ELid].lock.w) {
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
            e.target.style.left = e.target.offsetLeft - e.offsetX * this.elScale + "px";
            e.target.style.top = e.target.offsetTop - e.offsetY * this.elScale + "px";
            e.target.style.width = e.target.offsetWidth + e.target.offsetWidth * this.elScale + "px";
            let img = document.getElementsByTagName("img");
            for (let i = 0; i < img.length; i++) {
                let id = img[i].getAttribute("id");
                if (this.lock_info[id].type === "children") {
                    // if ((this.lock_info[id].parentX <= e.target.width - this.lock_info[id].width / 2) && (this.lock_info[id].parentY <= e.target.height - this.lock_info[id].height * 0.75) && (this.lock_info[id].parentX >= -(this.lock_info[id].width / 2)) && (this.lock_info[id].parentY >= -(this.lock_info[id].height * 0.75))) {
                    // 左移动距离 === 设备距离父级的值 + 设备宽的一半 * 缩放倍数 + 设备距离父级的值 + 父级的左值
                    img[i].style.left = (this.lock_info[id].parentX + this.lock_info[id].width / 2) * this.elScale + this.lock_info[id].parentX + e.target.offsetLeft + "px";
                    img[i].style.top = (this.lock_info[id].parentY + this.lock_info[id].height * 0.75) * this.elScale + this.lock_info[id].parentY + e.target.offsetTop + "px";
                    this.lock_info[id].parentX += (this.lock_info[id].parentX + this.lock_info[id].width / 2) * this.elScale;
                    this.lock_info[id].parentY += (this.lock_info[id].parentY + this.lock_info[id].height * 0.75) * this.elScale;
                    this.lock_info[id].left = img[i].offsetLeft;
                    this.lock_info[id].top = img[i].offsetTop;
                    this.lock_info[id].resultX = img[i].offsetLeft;
                    this.lock_info[id].resultY = img[i].offsetTop;
                    // } // 设备移除图层外，不做联动
                }
            }
            this.lock_info[this.ELid].width = e.target.offsetWidth; //宽
            this.lock_info[this.ELid].height = e.target.offsetHeight; //宽
            this.lock_info[this.ELid].left = e.target.offsetLeft; //元素x位置
            this.lock_info[this.ELid].top = e.target.offsetTop; //元素x位置
            this.lock_info[this.ELid].resultX = e.target.offsetLeft; //最后的位置
            this.lock_info[this.ELid].resultY = e.target.offsetTop; //最后的位置
        },
        //添加图标
        addIcon(url) {
            let img = document.createElement("img");
            img.src = url;
            img.onmousedown = this.mousedown; //鼠标按下
            img.onmouseup = this.mouseup; //鼠标松开
            img.onmouseenter = this.mouseenter; //鼠标移入
            img.onmouseleave = this.mouseleave; //鼠标移开
            let id = String(Math.random())
            img.setAttribute("id", id);
            img.style.opacity = 0;
            img.style.zIndex = this.zIndex += 1;
            let parentImg = document.getElementsByTagName("img")[0];
            this.planContainer.appendChild(img);
            setTimeout(() => {
                this.$set(this.lock_info, id, {
                    id: id, //唯一标识
                    type: "children", // 表示父级
                    left: parentImg.offsetLeft, //左-坐标 初始化在图片左上角
                    top: parentImg.offsetTop, //上-坐标 初始化在图片左上角
                    lock: {}, //锁定值
                    width: img.offsetWidth, // 宽
                    height: img.offsetHeight, // 高
                    resultX: 0, // 最后的位置
                    resultY: 0, // 最后的位置
                    // parentX: img.offsetLeft - parentImg.offsetLeft, // 父x 初始化距离图层的位置
                    // parentY: img.offsetTop - parentImg.offsetTop, // 父y 初始化距离图层的位置
                    // parentX: img.offsetWidth / 2, // 父x
                    // parentY: img.offsetHeight * 0.75, // 父y
                    parentX: 0, // 父x 初始化距离图层的位置
                    parentY: 0, // 父y初始化距离图层的位置
                });
                this.ELid = id; //当前元素id
                this.conEl = img; //当前元素
                img.style.left = this.lock_info[id].left + "px";
                img.style.top = this.lock_info[id].top + "px";
                img.style.opacity = 1;
            }, 100);
        },
        //添加平面图
        upFunc(url) {
            this.url = url;
            if (Object.keys(this.lock_info).length) {
                let img = document.getElementsByTagName("img");
                let imgLength = img.length;
                for (let i = 0; i < imgLength - 1; i++) {
                    img[img.length - 1].remove();
                }
                this.lock_info = {};
            };
            if (url) {
                let id = String(Math.random());
                this.parentID = id; // 图层id
                this.planImg.setAttribute("id", id);
                setTimeout(() => {
                    this.$set(this.lock_info, id, {
                        isShow: true,
                        id: id, //唯一标识
                        type: "parent", // 表示父级
                        left: 0, //左-坐标
                        top: 0, //上-坐标
                        lock: {}, //锁定值
                        width: this.planContainer.offsetWidth, // 容器的宽
                        height: this.planContainer.offsetHeight, // 容器的高
                        resultX: 0, // 最后的位置
                        resultY: 0, // 最后的位置
                    });
                    this.ELid = id; //当前元素id
                    this.conEl = this.planImg; //当前元素
                    this.planImg.style.width = this.lock_info[id].width + "px";
                    this.planImg.style.left = this.lock_info[id].left + "px";
                    this.planImg.style.top = this.lock_info[id].top + "px";
                    this.planImg.style.opacity = 1;
                }, 100)
            }


            // let img = document.createElement("img");
            // img.src = URL.createObjectURL(e.target.files[0]);
            // img.onmousedown = this.mousedown; //鼠标按下
            // img.onmouseup = this.mouseup; //鼠标松开
            // img.onmouseenter = this.mouseenter; //鼠标移入
            // img.onmouseleave = this.mouseleave; //鼠标移开
            // img.onmousewheel = this.mousewheel; //鼠标滚轮
            // this.planContainer.appendChild(img)
            // img.style.position = "absolute";
            // img.style.opacity = 0;
            // img.style.zIndex = 0;
            ;
        },
        //删除元素
        deleEl() {
            if (this.lock_info[this.ELid].type === "parent") {
                this.$confirm('删除此图层和已添加的设备, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,
                    closeOnPressEscape: false,
                    type: 'warning'
                }).then(() => {
                    this.conEl.remove();
                    let img = document.getElementsByTagName("img");
                    let imgLength = img.length;
                    for (let i = 0; i < imgLength; i++) {
                        img[img.length - 1].remove();
                    }
                    this.lock_info = {}
                }).catch(() => { });
            } else {
                this.$confirm('删除此设备, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,
                    closeOnPressEscape: false,
                    type: 'warning'
                }).then(() => {
                    this.conEl.remove();
                    delete this.lock_info[this.ELid];
                }).catch(() => { });

            }
            this.isShow = false;
        },
        // 锁定
        lockImgVal() {
            this.lock_info[this.ELid].lock = {
                w: this.conEl.offsetWidth,
                h: this.conEl.offsetHeight,
                l: this.conEl.offsetLeft,
                t: this.conEl.offsetTop,
            }
        }
    },
    components: {},
};
</script>

<style lang="scss">
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
            opacity: 0;
            z-index: 0;
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
        background: #fff;
        position: absolute;
        padding: 10px 0;
        cursor: pointer;
        box-shadow: 0 0 12px #333;
        border-radius: 2px;
        overflow: hidden;
        z-index: 999;
        li {
            padding: 10px 20px;
        }
        li:hover {
            background: #ccc;
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
