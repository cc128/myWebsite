<template>
    <div class="animation-box">
        <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane label="翻拍(2种)" :name="1">
                <el-divider>效果1</el-divider>
                <div class="turn1">
                    <div style="width: 50%;">
                        <turn1 v-if="isShow && activeName === 1" :num="num"></turn1>
                    </div>
                    <el-input v-model="input" class="input" placeholder="请输入"></el-input>
                    <el-button class="btn" type="primary" @click="refresh">效果</el-button>
                </div>
                <el-divider>效果2</el-divider>
                <div class="turn1">
                    <div style="width: 50%;">
                        <turn2 v-if="isShow2 && activeName === 1" :num="num2"></turn2>
                    </div>
                    <el-input v-model="input2" class="input" placeholder="请输入"></el-input>
                    <el-button class="btn" type="primary" @click="refresh2">效果</el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane label="签名" :name="2">
                <signature v-if="activeName === 2"></signature>
            </el-tab-pane>
            <el-tab-pane label="弹幕" :name="3">
                <div style="height: 80vh">
                    <barrage v-if="activeName === 3"></barrage>
                </div>
            </el-tab-pane>
            <el-tab-pane label="文字动画" :name="4">
                <frame v-if="activeName === 4"></frame>
            </el-tab-pane>
            <el-tab-pane label="树形控件" :name="5">
                <tree v-if="activeName === 5"></tree>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
export default {
    components: {
        "turn1": () => import("./turn/turn1"),
        "turn2": () => import("./turn/turn2"),
        "signature": () => import("./signature/signature"), //签名
        "barrage": () => import("./barrage/barrage"), //弹幕
        "frame": () => import("./frame/frame"), //文字
        "tree": () => import("./tree/tree"), //树形控件
    },
    data() {
        return {
            activeName: 1,
            num: "654321",
            num2: 100,
            input: "",
            input2: "",
            isShow: true,
            isShow2: true,
        };
    },
    created() {

    },
    mounted() {
        // setTimeout(() => {
        //     this.num2 = 60.45;
        // }, 500);
    },
    methods: {
        refresh() {
            if (this.input) {
                this.num = this.input;
            } else {
                this.isShow = false;
                setTimeout(() => {
                    this.isShow = true;
                }, 100);
            }
        },
        refresh2() {
            if (this.input2) {
                this.num2 = this.input2;
            } else {
                this.isShow2 = false;
                setTimeout(() => {
                    this.isShow2 = true;
                }, 100);
            }
        }
    }
};
</script>



<style lang="scss">
.animation-box {
    .turn1 {
        display: flex;
        align-items: center;
        .input {
            width: 200px;
        }
    }
}
</style>
