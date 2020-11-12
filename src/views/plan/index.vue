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
                    <s-2d :formInline="formInline" :upPlan="planUrl" :upIcon="iconUrl" @confirm="getMsg"></s-2d>
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
            console.log(this.getMsgFun())
            this.dialogVisible = false
        },
        // 编辑
        edit(e) {
            this.formInline = {
                name: e.name,
                url: this.planUrl, // 地图路径
                lock_info: {},
            };
            this.dialogVisible = true;
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
