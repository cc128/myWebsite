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
        <el-dialog title="编辑" :visible.sync="dialogVisible" width="80%" :modal-append-to-body="false">
            <input type="file" value="图层" name="上传" accept=".jpeg,.png,.jpg" @change="upLayer" />
            <div class="plan" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                <!-- <el-button class="upLayer" type="primary" @click="loading = false">
                </el-button> -->
                <div class="plan-tree">
                    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick">
                        <div class="custom-tree-node" style="flex: 1" slot-scope="{ node, data }">
                            <el-tooltip class="item" effect="dark" :content="node.label" placement="left">
                                <div @dblclick="addEquipment(data)">{{ node.label }}</div>
                            </el-tooltip>
                        </div>
                    </el-tree>
                </div>
                <div class="plan-container" @mousemove="mousemove">
                    <!-- <img src="./a.jpg" alt="" srcset="" @mousedown="mousedown" @mouseup="mouseup" @mousewheel="mousewheel" @mouseenter.stop="mouseenter" @mouseleave="mouseleave"> -->
                </div>
                <div class="list">
                    <div v-for="(item, i) in drawing" :key="i">
                        <div>宽度{{ item.width }} / 高度{{ item.height }} / x{{ item.left }} / y{{ item.top }}</div>
                    </div>
                </div>
                <ul v-show="isShow" class="right-key">
                    <li @click="deleEl">删除</li>
                </ul>
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
            dialogVisible: false,
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
            drawing: [], //图纸-存储所有操作信息
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
            resultX: 0, //元素最后的停留坐标
            resultY: 0, //元素最后的停留坐标
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
        handleNodeClick(data) {
            // console.log(data);
        },
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
                this.left = e.clientX - this.rightKeyX;
                this.top = e.clientY - this.rightKeyY;
                this.conEl = e.target; //存左键的元素
                e.target.style.position = "absolute";
            }
            // //右键
            // this.isRightKey = true;
            // this.rightKeyX = e.offsetX;
            // this.rightKeyY = e.offsetY;
            // this.left = e.clientX - this.rightKeyX;
            // this.top = e.clientY - this.rightKeyY;
            // // this.conEl = e.target; //存右键的元素
            // e.target.style.position = "absolute";

        },
        // 鼠标松开
        mouseup(e) {
            e.target.style.cursor = "pointer";
            if (e.button === 0) {
                this.isRightKey = false;
                this.resultX = this.conEl.offsetLeft;
                this.resultY = this.conEl.offsetTop;
            } else if (e.button === 2) {
                this.isShow = true;
                this.rightKeyEl.style.left = e.clientX + 10 + "px";
                this.rightKeyEl.style.top = e.clientY + 10 + "px";
            }
        },
        // 鼠标移动
        mousemove(e) {
            // e.target.style.transformOrigin = `${e.offsetX}px ${e.offsetY}px`;
            // this.centralPointXY
            // 判断移入的元素是否为图片
            if (e.path[0].getAttribute("src")) {
                // e.style.transformOrigin = "center";
            }
            if (this.isRightKey && e.button === 0) {
                let left = e.clientX - this.rightKeyX - this.left + this.resultX; // 计算移动距离
                let top = e.clientY - this.rightKeyY - this.top + this.resultY; // 计算移动距离
                // console.log(e.clientX)
                // if (left <= 0) left = 0;
                // if (top <= 0) top = 0;
                e.target.style.left = left + "px";
                e.target.style.top = top + "px";
                // 更新数据
                let index = this.getIndex();
                // this.drawing[index].left = left;
                // this.drawing[index].top = top;
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
            this.resultX = this.conEl.offsetLeft;
            this.resultY = this.conEl.offsetTop;
        },
        // 滚轮事件
        mousewheel(e) {
            if (e.deltaY > 0) {
                this.elScale = -0.04
                // if (this.elScale <= 0.3) this.elScale = 0.3;
            } else {
                this.elScale = 0.04
                // e.target.style.transform = `scale(${this.elScale})`; //放大
            }
            e.target.style.left = e.target.offsetLeft - e.offsetX * this.elScale + "px";
            e.target.style.top = e.target.offsetTop - e.offsetY * this.elScale + "px";
            e.target.style.width = e.target.offsetWidth + e.target.offsetWidth * this.elScale + "px";
            this.resultX = e.target.offsetLeft; // 计算移动距离
            this.resultY = e.target.offsetTop; // 计算移动距离
        },
        // 添加设备
        addEquipment(e) {
            console.log(e, 111111)
            let img = document.createElement("img");
            img.src = require("./af.png");
            img.onmousedown = this.mousedown; //鼠标按下
            img.onmouseup = this.mouseup; //鼠标松开
            img.onmouseenter = this.mouseenter; //鼠标移入
            img.onmouseleave = this.mouseleave; //鼠标移开
            let id = String(Math.random())
            img.setAttribute("id", id);
            this.planContainer.appendChild(img);
            let obj = {
                id: id, //唯一标识
                left: 0, //左-坐标
                top: 0, //上-坐标
            }
            this.drawing[0].children.push(obj)
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
            // this.loading = false;
            setTimeout(() => {
                let obj = {
                    id: id, //唯一标识
                    scale: 1, //放大倍数
                    // hierarchy: 1, //所属层级
                    // width: img.offsetWidth, //宽度
                    // height: img.offsetHeight, //高度
                    children: [],
                    left: (this.planContainer.offsetWidth - img.offsetWidth) / 2, //左-坐标
                    top: (this.planContainer.offsetHeight - img.offsetHeight) / 2, //上-坐标
                }
                this.drawing.push(obj)
                img.style.left = obj.left + "px";
                img.style.top = obj.top + "px";
                this.resultX = obj.left;
                this.resultY = obj.top;
                img.style.opacity = 1;
            }, 100);
        },
        //删除元素
        deleEl() {
            let index = this.getIndex();
            this.drawing.splice(index, 1)
            this.conEl.remove()
            this.isShow = false;
            this.resultX = 0; //元素最后的停留坐标
            this.resultY = 0; //元素最后的停留坐标
        },
        getIndex() {
            let index = this.drawing.findIndex((e) => {
                return e.id === this.ELid
            })
            return index
        }
    },
    components: {},
};
</script>

<style lang="scss">
.plan {
    width: 100%;
    height: 70vh;
    // height: 100%;
    overflow: auto;
    // background: #333;
    position: relative;
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
        color: #fff;
        position: absolute;
        top: 50px;
        left: 0;
    }
    .right-key {
        background: #fff;
        position: absolute;
        padding: 10px 0;
        cursor: pointer;
        box-shadow: 0 0 12px #333;
        border-radius: 2px;
        overflow: hidden;
        li {
            padding: 10px 20px;
        }
        li:hover {
            background: #ccc;
        }
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
