<template>
    <div class="animation-box">
        <el-tabs type="border-card">
            <el-tab-pane label="翻拍(2种)">
                <el-divider>效果1</el-divider>
                <div class="turn1">
                    <div style="width: 50%;">
                        <turn1 v-if="isShow" :num="num"></turn1>
                    </div>
                    <el-input v-model="input" class="input" placeholder="请输入"></el-input>
                    <el-button class="btn" type="primary" @click="refresh">效果</el-button>
                </div>
                <el-divider>效果2</el-divider>
                <div class="turn1">
                    <div style="width: 50%;">
                        <turn2 v-if="isShow2" :num="num2"></turn2>
                    </div>
                    <el-input v-model="input2" class="input" placeholder="请输入"></el-input>
                    <el-button class="btn" type="primary" @click="refresh2">效果</el-button>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    components: {
        "turn1": () => import("./turn/turn1"),
        "turn2": () => import("./turn/turn2"),
    },
    data() {
        return {
            num: "654321",
            num2: 0,
            input: "",
            input2: "",
            isShow: true,
            isShow2: true,
        };
    },
    created() {

    },
    mounted() {
        setTimeout(() => {
            this.num2 = 60.45;
        }, 500);
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
                this.num2 = this.input;
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
        .btn {
        }
    }
}
</style>
