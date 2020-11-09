/*
创建者：cc
模块名称：xxxx
备注：xxxx
*/
<template>
    <div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="地图名称">
            </el-table-column>
            <el-table-column prop="hierarchy" label="地图层级">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="edit">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="编辑" :visible.sync="dialogVisible" width="80%" :modal-append-to-body="false" :fullscreen="fullscreen" :close-on-click-modal="false">
            <input type="file" value="图层" name="上传" accept=".jpeg,.png,.jpg" @change="upLayer" />
            <div class="plan" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                <div class="plan-tree">
                    <el-tree :data="data" :props="defaultProps">
                        <div class="custom-tree-node" style="flex: 1" slot-scope="{ node, data }">
                            <el-tooltip class="item" effect="dark" :content="node.label" placement="left">
                                <div style="user-select: none;" @dblclick="addEquipment(data)">{{ node.label }}</div>
                            </el-tooltip>
                        </div>
                    </el-tree>
                </div>
                <div class="plan-container" @mousemove="mousemove">
                    <div v-if="drawing[ELid]" class="lock">
                        <i v-if="Object.keys(drawing[ELid].lock).length" class="el-icon-lock" @click="drawing[ELid].lock = {}"></i>
                        <i v-else class="el-icon-unlock" @click="lockImgVal"></i>
                    </div>
                    <div class="full-screen" @click="fullscreen = !fullscreen">
                        <span v-if="fullscreen">
                            <svg t="1604932164354" class="icon" viewBox="0 0 1028 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3289" width="30" height="30">
                                <path d="M984.632966 274.877757l-161.960735-0.592277 181.721237-180.64437C1024.261656 73.557548 1024.261656 41.036177 1004.393468 21.006459 984.417593 0.97674 952.111595 0.97674 932.243406 21.006459l-183.498067 182.528887 1.238397-165.191335c0.48459-20.729682-15.883782-38.767197-36.505777-38.282607l-26.114015 0c-20.621995 0.538433-37.690331 12.868556-38.121077 33.598238l-1.076867 286.608043c0 0.376903 1.346083 0.64612 1.346083 1.023023l-1.992203 18.791322C647.35835 350.419948 649.7813 359.734844 656.457873 366.357574c6.568886 6.730416 15.829939 10.768666 26.114015 10.499449L701.20168 376.48012c0.430747 0 0.699963-0.16153 1.076867-0.215373L989.263492 377.880046c20.621995-0.48459 37.636487-17.606769 38.174921-38.390294L1027.438413 313.160364C1024.3155 288.715493 1005.201118 274.393167 984.632966 274.877757zM1025.500053 711.816376l-0.053843-26.329388c-0.48459-20.783525-17.445239-37.905704-37.959547-38.390294l-285.477333 1.561457c-0.430747 0-0.699963-0.16153-1.076867-0.16153l-18.575949-0.430747c-10.230233-0.32306-19.437442 3.769033-26.006328 10.445606-6.62273 6.676573-9.045679 15.991469-8.830306 26.383231l1.992203 18.791322c0 0.376903-1.346083 0.64612-1.346083 1.023023l1.076867 284.400466c0.430747 20.729682 17.391395 33.059804 37.959547 33.544394l27.675471 0.053843c20.514309 0.48459 36.774994-17.606769 36.290404-38.336451l-1.184553-161.853048 182.74426 181.398177c19.760502 20.029719 51.958813 20.029719 71.773158 0s19.814345-52.55109 0-72.634651l-182.528887-182.25967 160.883868-0.592277C1003.316601 748.968273 1022.37714 736.261247 1025.500053 711.816376zM369.04218 658.565323c-6.568886-6.676573-15.829939-10.768666-26.114015-10.445606l-18.683635 0.430747c-0.32306 0-0.64612 0.16153-1.023023 0.16153L40.059437 647.096694c-20.568152 0.48459-37.636487 17.606769-38.121077 38.390294l-0.053843 26.329388c3.122913 24.444872 22.237295 37.098054 42.805447 36.721151l159.699315 0.592277L21.160428 931.33563C1.238397 951.419192 1.238397 983.940563 21.160428 1003.970281s52.174186 20.029719 72.096218 0l183.498067-182.475044-1.238397 160.883868c-0.48459 20.729682 15.883782 38.767197 36.451934 38.282607l26.167858 0c20.621995-0.538433 37.690331-12.814712 38.121077-33.598238l1.076867-282.35442c0-0.376903-1.346083-0.64612-1.346083-1.023023l2.046047-18.791322C378.141703 674.556792 375.718753 665.241896 369.04218 658.565323zM377.28021 320.267684l-1.076867-286.608043C375.82644 12.929959 358.811948 0.545993 338.297639 0.00756L310.622168 0.00756C290.107859-0.423186 273.847174 17.614329 274.331764 38.290167l1.238397 164.060625L92.879743 21.006459C73.011555 0.97674 40.867087 0.97674 21.052742 21.006459S1.238397 73.557548 21.052742 93.64111l180.913587 180.64437-159.376255 0.592277C22.129608 274.393167 3.122913 288.715493 0 313.160364l0.053843 26.329388C0.538433 360.273278 17.499082 377.395456 38.013391 377.880046l285.477333-1.6153c0.376903 0.053843 0.64612 0.215373 1.023023 0.215373l18.575949 0.430747c10.230233 0.269217 19.491285-3.769033 26.006328-10.499449C375.718753 359.734844 378.141703 350.419948 377.92633 340.028186L375.880283 321.236864C375.880283 320.85996 377.28021 320.644587 377.28021 320.267684z" p-id="3290" fill="#409eff"></path>
                            </svg>
                        </span>
                        <span v-else>
                            <svg t="1604932084606" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2344" width="30" height="30">
                                <path d="M848.448 910.208l-187.328-187.328a56.96 56.96 0 1 1 80.512-80.448l168.576 168.64v-128.384H1024V1024h-341.312v-113.792h165.76z m-673.088 0h165.952V1024H0v-341.312h113.792v128.128L281.6 643.008a56.96 56.96 0 0 1 80.448 80.512L175.36 910.208zM829.568 113.792h-146.88V0H1024v341.312h-113.792V193.984l-168.576 168.704a56.96 56.96 0 0 1-80.64-80.512l168.512-168.384z m-635.328 0L362.048 281.6A56.896 56.896 0 0 1 281.6 362.048L113.792 194.24v147.072H0V0h341.312v113.792H194.24z" p-id="2345" fill="#409eff"></path>
                            </svg>
                        </span>
                    </div>
                    <ul v-show="isShow" class="right-key">
                        <li @click="deleEl">删除</li>
                    </ul>
                    <div v-if="drawing[ELid]" class="list">
                        <div>左{{ drawing[ELid].left }} 上{{ drawing[ELid].top }} 宽{{ drawing[ELid].width }} 高{{ drawing[ELid].width }} x{{ drawing[ELid].resultX }} y{{ drawing[ELid].resultY }} px{{ drawing[ELid].parentX }} py{{ drawing[ELid].parentY }}</div>
                        <div>锁定值{{ drawing[ELid].lock }}</div>
                    </div>
                    <!-- <img src="./a.jpg" alt="" srcset="" @mousedown="mousedown" @mouseup="mouseup" @mousewheel="mousewheel" @mouseenter.stop="mouseenter" @mouseleave="mouseleave"> -->
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {},
    data() {
        return {
            fullscreen: false, //是否全屏
            dialogVisible: false, //弹框状态
            tableData: [
                {
                    name: "总评",
                    hierarchy: 1
                }
            ],
            data: [
                {
                    label: '设备1',
                    id: 1,
                },
                {
                    label: '设备2',
                    id: 2,
                },
                {
                    label: '设备3',
                    id: 3,
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            },

            moverW: 0, //移动宽度
            moverL: 0, //下移值
            moverT: 0, // 上移值
            ELid: "", //当前元素的唯一标识
            rightKeyEl: null, //右键菜单
            isShow: false, //右键菜单
            drawing: {}, //图纸-存储所有操作信息
            loading: false,
            elScale: 1, // 缩放比例
            planContainer: "", //图层容器
            div: null, //
            isRightKey: false, // 右键是否按下
            conEl: null, // 存储元素
            rightKeyX: 0, //鼠标右键按下的x点
            rightKeyY: 0, //鼠标右键按下的y点
            left: 0, //容器外的距离
            top: 0, //容器外的距离
            centralPointXY: [0, 0], //图片鼠标移入的位置
            ctrlKey: false, //
        };
    },
    computed: {},
    created() { },
    mounted() {
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
    },
    watch: {},
    methods: {
        // 编辑
        edit() {
            this.dialogVisible = true;
            this.$nextTick(() => {
                this.div = document.getElementsByClassName("plan")[0];
                this.planContainer = document.getElementsByClassName("plan-container")[0];
                this.rightKeyEl = document.getElementsByClassName("right-key")[0];
                // 右键菜单
                this.div.oncontextmenu = (e) => {
                    e.preventDefault();
                    return false
                }
                // 禁用滚轮
                this.div.onmousewheel = (e) => {
                    e.preventDefault();
                    return false
                }
            })
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
                this.drawing[this.ELid].resultX = this.conEl.offsetLeft;
                this.drawing[this.ELid].resultY = this.conEl.offsetTop;
            } else if (e.button === 2) {
                this.isShow = true;
                this.rightKeyEl.style.left = e.target.offsetLeft + e.offsetX + 20 + "px";
                this.rightKeyEl.style.top = e.target.offsetTop + e.offsetY + "px";
            }
        },
        // 鼠标移动
        mousemove(e) {
            // 判断移入的元素是否为图片
            if (e.path[0].getAttribute("src")) {
                // e.style.transformOrigin = "center";
            }
            if (this.isRightKey && e.button === 0) {
                let left = e.clientX - this.rightKeyX + this.drawing[this.ELid].resultX; // 计算移动距离
                let top = e.clientY - this.rightKeyY + this.drawing[this.ELid].resultY; // 计算移动距离
                // if (left <= 0) left = 0;
                // if (top <= 0) top = 0;
                e.target.style.left = left + "px";
                e.target.style.top = top + "px";
                // 更新数据
                this.drawing[this.ELid].left = left;
                this.drawing[this.ELid].top = top;
                let img = document.getElementsByTagName("img");
                this.drawing[this.ELid].parentX = left - img[0].offsetLeft;
                this.drawing[this.ELid].parentY = top - img[0].offsetTop;
                if (this.drawing[this.ELid].parentX == 0) {
                    for (let i = 0; i < img.length; i++) {
                        if (i !== 0) {
                            let id = img[i].getAttribute("id");
                            img[i].style.left = left + this.drawing[id].parentX + "px";
                            img[i].style.top = top + this.drawing[id].parentY + "px";
                            this.drawing[id].left = img[i].offsetLeft;
                            this.drawing[id].top = img[i].offsetTop;
                            this.drawing[id].resultX = img[i].offsetLeft;
                            this.drawing[id].resultY = img[i].offsetTop;
                        }
                    }
                }
            }
        },
        // 鼠标移入
        mouseenter(e) {
            this.ELid = e.path[0].getAttribute("id"); // 获取唯一标识
            this.conEl = e.target; //存鼠标移入的元素
            e.target.style.boxShadow = "0 0 10px #fff";
            e.target.style.cursor = "pointer";
        },
        // 鼠标移开
        mouseleave(e) {
            e.target.style.boxShadow = "0 0 0px #fff";
            this.isRightKey = false;
            this.drawing[this.ELid].resultX = this.conEl.offsetLeft;
            this.drawing[this.ELid].resultY = this.conEl.offsetTop;
        },
        // 滚轮事件
        mousewheel(e) {
            if (e.deltaY > 0) {
                this.elScale = -0.04
            } else {
                this.elScale = 0.04
            }
            e.target.style.left = e.target.offsetLeft - e.offsetX * this.elScale + "px";
            e.target.style.top = e.target.offsetTop - e.offsetY * this.elScale + "px";
            e.target.style.width = e.target.offsetWidth + e.target.offsetWidth * this.elScale + "px";
            let img = document.getElementsByTagName("img");
            for (let i = 0; i < img.length; i++) {
                if (i !== 0) {
                    let id = img[i].getAttribute("id");
                    img[i].style.left = (e.target.offsetLeft*this.elScale) + this.drawing[id].parentX + "px";
                    img[i].style.top = (e.target.offsetTop*this.elScale) + this.drawing[id].parentY + "px";
                    this.drawing[id].left = img[i].offsetLeft;
                    this.drawing[id].top = img[i].offsetTop;
                    this.drawing[id].resultX = img[i].offsetLeft;
                    this.drawing[id].resultY = img[i].offsetTop;
                }
            }
            this.drawing[this.ELid].width = e.target.offsetWidth; //宽
            this.drawing[this.ELid].height = e.target.offsetHeight; //宽
            this.drawing[this.ELid].left = e.target.offsetLeft; //元素x位置
            this.drawing[this.ELid].top = e.target.offsetTop; //元素x位置
            this.drawing[this.ELid].resultX = e.target.offsetLeft; //最后的位置
            this.drawing[this.ELid].resultY = e.target.offsetTop; //最后的位置
        },
        // 添加设备
        addEquipment(e) {
            let img = document.createElement("img");
            img.src = require("./af.png");
            img.onmousedown = this.mousedown; //鼠标按下
            img.onmouseup = this.mouseup; //鼠标松开
            img.onmouseenter = this.mouseenter; //鼠标移入
            img.onmouseleave = this.mouseleave; //鼠标移开
            let id = String(Math.random())
            img.setAttribute("id", id);
            img.style.opacity = 0;
            img.style.zIndex = 1;
            this.planContainer.appendChild(img);
            setTimeout(() => {
                this.$set(this.drawing, id, {
                    id: id, //唯一标识
                    left: 0, //左-坐标
                    top: 0, //上-坐标
                    lock: {}, //锁定值
                    width: img.offsetWidth, // 宽
                    height: img.offsetHeight, // 高
                    resultX: 0, // 最后的位置
                    resultY: 0, // 最后的位置
                    parentX: 0, // 父x
                    parentY: 0, // 父y
                });
                this.ELid = id; //当前元素id
                this.conEl = img; //当前元素
                img.style.left = this.drawing[id].left + "px";
                img.style.top = this.drawing[id].top + "px";
                img.style.opacity = 1;
            }, 100);
        },
        // 上传的图层
        upLayer(e) {
            let img = document.createElement("img");
            img.src = URL.createObjectURL(e.target.files[0]);
            img.onmousedown = this.mousedown; //鼠标按下
            img.onmouseup = this.mouseup; //鼠标松开
            img.onmouseenter = this.mouseenter; //鼠标移入
            img.onmouseleave = this.mouseleave; //鼠标移开
            img.onmousewheel = this.mousewheel; //鼠标滚轮
            let id = String(Math.random())
            img.setAttribute("id", id);
            this.planContainer.appendChild(img)
            img.style.position = "absolute";
            img.style.opacity = 0;
            img.style.zIndex = 0;
            setTimeout(() => {
                this.$set(this.drawing, id, {
                    id: id, //唯一标识
                    left: 0, //左-坐标
                    top: 0, //上-坐标
                    lock: {}, //锁定值
                    width: img.offsetWidth, // 宽
                    height: img.offsetHeight, // 高
                    resultX: 0, // 最后的位置
                    resultY: 0, // 最后的位置
                });
                this.ELid = id; //当前元素id
                this.conEl = img; //当前元素
                img.style.left = this.drawing[id].left + "px";
                img.style.top = this.drawing[id].top + "px";
                img.style.opacity = 1;
            }, 100);
        },
        //删除元素
        deleEl() {
            this.conEl.remove();
            // delete this.drawing[this.ELid];
            // let index = this.getIndex();
            // this.drawing.splice(index, 1)
            // this.isShow = false;
            // this.resultX = 0; //元素最后的停留坐标
            // this.resultY = 0; //元素最后的停留坐标
        },
        lockImgVal() {
            this.drawing[this.ELid].lock = {
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
.plan {
    width: 100%;
    min-height: 70vh;
    // height: 100%;
    overflow: auto;
    // background: #333;
    // position: relative;
    // position: fixed;
    // top: 0;
    // left: 0;
    display: flex;
    .plan-tree {
        width: 200px;
        height: 100%;
    }
    .plan-container {
        background: #ccc;
        flex: 1;
        position: relative;
        overflow: hidden;
        img {
            position: absolute;
        }
    }
    .upLayer {
        position: absolute;
        top: 0;
        right: 0;
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
