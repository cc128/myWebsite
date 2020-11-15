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
                        <el-input v-model="planUrl" :disabled="true" placeholder="" clearable @change="planUrl = planUrl"></el-input>
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
    mounted() {
        //     this.$confirm('删除此图层和已添加的设备, 是否继续?', '提示', {
        //         confirmButtonText: '确定',
        //         cancelButtonText: '取消',
        //         closeOnClickModal: false,
        //         closeOnPressEscape: false,
        //         type: 'warning'
        //     }).then(() => {
        //     }).catch(() => { });
    },
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
                this.formInline = {
                    name: e.name,
                    url: this.planUrl, // 地图路径
                    lock_info: `[{"isShow":true,"url":"img/a.31cd71ba.jpg","id":"0.9920852321256761","type":"parent","left":165,"top":123,"lock":{"width":789.12,"height":518.4,"left":164.76,"top":123.28},"width":789.12,"height":518.4,"resultX":165,"resultY":123,"zIndex":0,"children":[{"id":"0.12999307552525097","url":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABQCAYAAABRX4iyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFHGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTExLTEwVDE0OjQ0OjEwKzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMC0xMS0xMFQxNToyMDoxMSswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMC0xMS0xMFQxNToyMDoxMSswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpiN2E2N2Q1ZS1kZjlj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","type":"children","left":414.2523576460739,"top":239.74044685103922,"lock":{},"width":75,"height":80,"resultX":414.2523576460739,"resultY":239.74044685103922,"zIndex":5,"parentX":249.2523576460739,"parentY":116.74044685103924},{"id":"0.03208408715853861","url":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABQCAYAAABRX4iyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFHGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTExLTEwVDE0OjQzOjIzKzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMC0xMS0xMFQxNToxODo1MyswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMC0xMS0xMFQxNToxODo1MyswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1MzljZDJmNy1iYjU5LWQwNDQtODg3MS1kYWQxZDI4ZmE4MzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTM5Y2QyZjctYmI1OS1kMDQ0LTg4NzEtZGFkMWQyOGZhODMxIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NTM5Y2QyZjctYmI1OS1kMDQ0LTg4NzEtZGFkMWQyOGZhODMxIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo1MzljZDJmNy1iYjU5LWQwNDQtODg3MS1kYWQxZDI4ZmE4MzEiIHN0RXZ0OndoZW49IjIwMjAtMTEtMTBUMTQ6NDM6MjMrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6PWHLaAAAIv0lEQVR4nO2aeYxV1R2Av3Pu9jaGjswwZcCJLRVEUEBGLUbEoHUDtUoopqLQWBciNLaxadLUdNH0j2pD1CZ1aatGk2rFrUVrI3Rh0QBFRSXsFZV9mBmGmfu2e+85/eMO4wzM4Nx27hs09/vr5b1z7/2d751z7u8sQmtNQv+Qgx3A54lEVgQSWRFIZEUgkRWBRFYEElkRSGRFIJEVgURWBBJZEUhkRSCRFYFEVgQSWRFIZEUgkRWBRFYEElkRSGRFwIzjpvW/dPtb9MvApcCFwBlAA2B3/nYY2AZ8ALwBrOrvTff+ONvfopGIRVY/aAS+D1wLZAG0BtVto0kIRkrBeOA64B5gE/A74BGgWOF4gcrLygC/Au4UnV+0lTSuq0GjsIWSAgloFaDxtIktqMkKHJPxSrOEUPKPgGcrHHtFZZ0DPCfga0LCviMaVdKqoVaWrj3TDCaNkEwcYZRSJhnA39euy+/uC5y1Hyu15qMgVW7RdnW1JGvTECj+CEwHFlYw/orJmg4sNyRmvgwtzYqxDUZ+4VTL+9ZZpjliiLAAB8h1v2ju2aYPlNZ+EhQfX+cVn9jgO63t2hk5TKIVd+hwjJtZoTog4tiRPmaAPxN435TIZleT79D+XTPs/L2XOzJnk6H/b+Ty6l1BcdHLJWPjriA7YrhECNCaPxOOfV3ENcDHnTo4wN8NiTzkavJFXXpyXqpjydVOOmeTi/h8+8LTjKq1izP6msnmkX0HlNYaBFwD3BtP+D2JW9ZjQlDnlqDgav/Zm9L5+VOsIYD1v97QMci9Mj9tfuMss2PfQYUMa/ATYOIAxdwnccqaCNysgdYWpX8608nPPdusAowBuHfm5flp2VAnC/vbNDJ8tf5+AO57QuIc4O8TAg60aSaONgo/u8Q26YeoPUc02w8p1u9WbG1S5D3N7edbTP9Kz0szFplHZ6far3wkb3tKGIZgCjCNCMlrVOKSVQ/MUhqCkg7umWEHwJBjC/kKtjYp3tuv2LhP8f7+gC1Nit1tmnKZMEstwkubfNYvyjChrkdHEFeMMZxLxpuFFVv9XP2XJBoW8TmUdT1Ac14zrsEozZ5gdjWL17f5vL1H8WGrZsOegE/aNIfaNQSAARkHqhyBmQYhBFLAnv2KJzd4PHCVc+xznFsbrfKKTX6gw1Z7FVALNMVRqbhkXSwAr0Nz5QUGdM73nnnH46ani6GYkgZDQAZGVEsE0FsSozSQEmw/1HuKc8VY0xxZK4PWojaGOiJHmNMtjaNScQ3w4wINmHjnjjICOv+UFz8IAEhVCW67zOapW1JcfLrJ/vYwB+g1QAEEYPUx2g1NISfVG+X8p7PF2N6Kccmq9wJwMkKNqZH+0S9dT0OrpnGUwaPXp7j5HItlC1KMr5M0uz1bjhAQKNhzWIOrmHlGn51Aja0RPuWu6xtiqRHxdcMcgC2x0lb4WQM/v9QmJUF1a0VZW3DnVIuFfyqi0wIhwt7petDqasbWCb47K8V3pvQZqp22hNmtDx/3Ihko4pKlj/0sgK83GCy51mHM/Xl2tmhGnyJ6lNKE3a6tpPECePqGFHPOMnDMPvpoz0tjJ65u2AFQCvDcEj0mil+tlswYbTBpicvbewPW7Q64f2UZgjAnK/rgluCWRot5k83PFAWU3bJ2u9WkbcBr00lcLWuPZVBdbtPGliZlNY6Smm5D+NIbU5z7mwJT7nPDbzOCBdNslNa8uiUg5wjuvihcMO1xYe/ILU3KwuoqtSuG+gDxydpkCCagMNftDuS8yaZPt/lgVUqw9e4MD7/pcaBDc/kYg2mnha+7K58o8vpmn5pMWLbF1cx8qsCwjGBklaQ6DbedZzF6WNiUml0dvLtX2bl017M3xlSn2GT9Q8NcJyf467ZA+ArflMdPnhdfcPx8OmuDMGD5joCUJXh1i8/aD1W47hwIKCnOO9XokvXatkAdOKTM+lqJDrvgypjqFJusl4BHTkkLdnwS2M+95+dvnGT2o0dBS16jDyque6wA5TD/qhtpYEhBwYO8J8nZXbcpPr7eQ9pdI9YyoCWeKsUn6yDwvBDMsdLC+MWKsvntSWYhzNdPzJ1TLRqGCtK2YNRQQZOrefCfXmcqL8DTFMLMTb+wyS+v2uxn68JWBfBQTPUB4l11uEdr5tQOFWz7OEjdtazU/uAsp8ynW129MnuCyewJPcNqHGmwo1mx+aBiV6vinHqBp+i444Wi7WSEYQpQmn8B62KsT6yytgIPo1hcUyPFQyvK2XG10r3jfEtGfe68yccVz0/7bcE4dFinRg2XBAqAWwck6hMQ90rp9zTsTFkwpEoYC58tZpes9vL8H/t+nqJ9+qMFvXqzn6mv7RL1Q2D7AMXcJ5XYvr8sUBSHpgVDqqTxgxeK2QXPF8sHOnQ74fpDfym+tiVoG/dr11i51c/Wj5BH8/ZngAfiCPxYKrEV9h/gokCxpiqFlbak8dSbXtXyHUH+9vMs94ZJJqcPkxbhelT38UwBvq8I3tgeeH/Y4LF0o59FYHbrekuBmypQB6AyW2FHaQRWCUhJCU0dmlKHpvoUWZjaIP3zTzVUbVZkhueEWw4w97dra2ezKq75KHDe3asMPG3VVEsco2ubfykwp7cHxbUVVklZAJOBtwBHAIhwHthW0EdzKoUlPDQST1tIMFKCYWmBaYR5aScvArP7esgX5WDIO4SbCms0WGjI2JCxBSDQGhnoUKQhe+av3UT9hROIipPBOJ+1nnDpVx37gxBgSjD6jmoZ4abqoDBYh9neAi6iF2En4BXg6njC6R+DefJvDWGX9D+rIPAy8M04g+kPg31M8k3CFnaifOtVwgNtg85gy4KwS06jd2GvAbMqG07fnAyyIBR2MT3X0v9GBc9e9YeTRRbAakJhAP8Grhi8UHonlqT0i8rJ1LJOehJZEUhkRSCRFYFEVgQSWRFIZEUgkRWBRFYEElkRSGRFIJEVgURWBBJZEUhkRSCRFYFEVgQSWRFIZEUgkRWB/wLxKQRAz+Q3hAAAAABJRU5ErkJggg==","type":"children","left":508.03300291397227,"top":182.02928053233256,"lock":{},
                    "width":75,"height":80,"resultX":508.03300291397227,"resultY":182.02928053233256,"zIndex":4,"parentX":343.03300291397227,"parentY":59.02928053233256}],"parentX":0,"parentY":0}]`,
                    // lock_info: `{}`,
                };
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
