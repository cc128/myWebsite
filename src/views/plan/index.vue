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
                    <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-drawer title="编辑" :visible.sync="dialogVisible" direction="rtl" size="70%" append-to-body :close-on-press-escape="false">
            <div class="edit-box">
                <el-form :inline="true" label-width="105px">
                    <el-form-item label="地图名称：">
                        <el-input v-model="formInline.name" placeholder="请输入地图名称"></el-input>
                    </el-form-item>
                    <el-form-item label="地图路径：">
                        <el-input v-model="planUrl" :disabled="false" placeholder="" clearable @change="planUrl = ''"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <!-- <c-upload> -->
                        <el-button type="primary" @click="upFile">上传文件</el-button>
                        <!-- </c-upload> -->
                    </el-form-item>
                </el-form>
                <div class="floor-plan-box">
                    <div class="plan-tree">
                        <el-tree :data="data" :props="defaultProps">
                            <div class="custom-tree-node" style="flex: 1" slot-scope="{ node, data }">
                                <el-tooltip class="item" effect="dark" :content="node.label" placement="left">
                                    <el-button :disabled="planUrl ? false : true" type="text" style="user-select: none;" @click="addEquipment(data)">{{ node.label }}</el-button>
                                </el-tooltip>
                            </div>
                        </el-tree>
                    </div>
                    <s-2d v-if="dialogVisible" :formInline="formInline" :upPlan="planUrl" :upIcon="iconUrl" @confirm="getMsg"></s-2d>
                </div>
                <br>
                <div style="text-align: right;">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="confirm">确 定</el-button>
                </div>
                <!-- <input type="file" value="图层" name="上传" accept=".jpeg,.png,.jpg" /> -->
            </div>
            <!-- <span slot="footer" class="dialog-footer">
            </span> -->
        </el-drawer>
    </div>
</template>

<script>
export default {
    props: {},
    data() {
        return {
            planUrl: "", //平面图地址
            iconUrl: "", //设备图片地址
            formInline: {}, //图纸数据
            dialogVisible: false, //弹框状态
            tableData: [
                {
                    name: "总评",
                    hierarchy: 1,
                }
            ],
            data: [
                {
                    label: '消防设备1',
                    id: 1,
                    type: "xf",
                    url: require("./xf.png"), // 地图路径
                },
                {
                    label: '安防设备1',
                    id: 2,
                    type: "af",
                    url: require("./af.png"), // 设备路径
                }
            ], //树的数据
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            getMsgFun: null, //获取值
        };
    },
    computed: {},
    created() { },
    mounted() { },
    watch: {},
    methods: {
        // 上传的图层
        upFile(e) {
            this.planUrl = require("./a.jpg");
        },
        // 接受暴露的方法
        getMsg(e) {
            this.getMsgFun = e;
        },
        //-获取数据
        confirm() {
            console.log(JSON.stringify(this.getMsgFun()))
            this.dialogVisible = false
        },
        // 编辑
        edit(e) {
            this.dialogVisible = true;
            setTimeout(() => {
                this.planUrl = require("./a.jpg");
                // this.formInline = {
                //     name: e.name,
                //     url: this.planUrl, // 地图路径
                //     // lock_info: `{"0.21654622947149615":{"isShow":true,"url":"img/a.31cd71ba.jpg","id":"0.21654622947149615","type":"parent","left":0,"top":0,"lock":{},"width":1094,"height":719,"resultX":0,"resultY":0},"0.4783508436807098":{"id":"0.4783508436807098","url":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABQCAYAAABRX4iyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFHGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTExLTEwVDE0OjQ0OjEwKzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMC0xMS0xMFQxNToyMDoxMSswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMC0xMS0xMFQxNToyMDoxMSswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpiN2E2N2Q1ZS1kZjlj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","type":"children","left":0,"top":0,"lock":{},"width":75,"height":80,"resultX":0,"resultY":0,"zIndex":3,"parentX":0,"parentY":0}}`,
                //     lock_info: `{}`,
                // };
            }, 500);
        },
        // 添加设备
        addEquipment(e) {
            this.iconUrl = e.url;
        },
    },
    components: {
        "s-2d": () => import("./2d")
    },
};
</script>

<style lang="scss">
.edit-box {
    // background: #ccc;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
    padding-right: 50px;
    .floor-plan-box {
        flex: 1;
        display: flex;
        // padding-bottom: 50px;
        // padding-right: 50px;
        .plan-tree {
            width: 200px;
            height: 100%;
        }
    }
}
</style>
