/*
    创建者：cc
    创建时间：2020-06-16 17:29
    模块名称：
    备注：xxxx
*/
<template>
    <div class="tree-box">
        <div v-for="(item, i) in data" :key="item.id" class="list-box">
            <div class="list">
                <div class="checkbox">
                    <!-- <span v-if="item.selectedNum > 0 && item.selectedNum < item.children.length" class="el-checkbox__input is-indeterminate" tabindex="0" role="checkbox" aria-checked="mixed" @click="selectList(item, i, !item.selected, 'parent')">
                        <span class="el-checkbox__inner"></span>
                        <input type="checkbox" aria-hidden="true" class="el-checkbox__original" value tabindex="-1" />
                    </span> -->
                    <input v-model="item.selected" type="checkbox" :disabled="item.children.length ? false : true" @change="selectList(item, i, item.selected, 'parent')">
                    <!-- <el-checkbox v-else v-model="item.selected" :disabled="item.children.length ? false : true" @change="selectList(item, i, item.selected, 'parent')"></el-checkbox> -->
                </div>
                <div class="text" @click="item.children.length ? active === i ? active = '' : active = i : ''">{{ item.lable }}（{{ item.selectedNum }}/{{ item.children.length }}）</div>
                <div class="off-icon" :class="{rotate90: active === i}" @click="item.children.length ? active === i ? active = '' : active = i : ''">
                    <!-- <i class="el-icon-arrow-down"></i> -->
                    <svg t="1592300869012" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2661" width="15" height="15"><path d="M113.27683429 155.94627634l799.4199333 0c44.24124361 0 80.02419363 35.50497793 80.02419365 79.74225054 0 20.57390573-7.89043628 39.17023849-20.57390572 53.25945242l-395.33984827 527.4996929c-26.49074017 34.93712067-76.36290417 42.2676418-111.58990998 15.78087266-6.20274865-4.5110899-11.55172587-9.86403813-15.78087266-15.78087266L49.59342845 283.31308797c-26.20482607-34.9410917-19.15624802-85.09519879 16.0628158-111.30399583C80.03137236 161.01728144 96.65410329 155.94627634 113.27683429 155.94627634L113.27683429 155.94627634z" p-id="2662" fill="#0287DC"></path></svg>
                </div>
            </div>
            <div class="scroll-box" :style="{'max-height': active === i ? '' : 0}">
                <!-- <div v-if="item.children.length > 1" class="search-box">
                    <slot :row="item">
                        <el-input class="input" v-model="query" placeholder="请输入搜素内容" size="mini" @keydown.native.enter.prevent="filterList"></el-input>
                    </slot>
                </div>-->
                <div v-for="(items) in item.children" :key="items.id" class="chilList-box">
                    <div class="chilList" v-show="items.lable.includes(query)">
                        <div class="checkbox">
                            <input  v-model="items.selected" type="checkbox" @change="selectList(items, i, items.selected, 'chil', item)">
                            <!-- <el-checkbox v-model="items.selected" @change="selectList(items, i, items.selected, 'chil', item)"></el-checkbox> -->
                        </div>
                        <div class="text" @click="selectList(items, i, !items.selected, 'chil', item)">{{ items.lable }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        //回显值
        selectedData: {
            type: Array,
            default: () => {
                return [];
            }
        },
        //渲染树
        treeData: {
            type: Array,
            default: () => {
                return [
                    {
                        key: "enterpriseSamplingSpot",
                        value: 1,
                        lable: "一级1",
                        children: [
                            {
                                lable: "一级1-1"
                            },
                            {
                                value: 12,
                                lable: "一级1-2"
                            },
                            {
                                value: 13,
                                lable: "一级1-3"
                            },
                            {
                                value: 14,
                                lable: "一级1-4"
                            },
                            {
                                value: 15,
                                lable: "一级1-5"
                            },
                            {
                                value: 16,
                                lable: "一级1-6"
                            },
                            {
                                value: 17,
                                lable: "一级1-7"
                            },
                            {
                                value: 18,
                                lable: "一级1-8"
                            },
                            {
                                value: 19,
                                lable: "一级1-9"
                            },
                            {
                                value: 20,
                                lable: "一级1-10"
                            },
                            {
                                value: 21,
                                lable: "一级1-11"
                            },
                            {
                                value: 22,
                                lable: "一级1-12"
                            },
                            {
                                value: 23,
                                lable: "一级1-13"
                            }
                        ]
                    },
                    {
                        value: 2,
                        lable: "一级2",
                        children: [
                            {
                                value: 22,
                                lable: "一级 2-1"
                            }
                        ]
                    },
                    {
                        value: 3,
                        lable: "一级3",
                        children: [
                            {
                                value: 33,
                                lable: "一级 3-1"
                            }
                        ]
                    }
                ];
            }
        }
    },
    watch: {
        selectedData: {
            handler(newName, oldName) {
                this.setData(this.data, false, true); // 参数3 传入true为显示默认选中的
            },
            deep: true
        },
        treeData: {
            handler(newName, oldName) {
                this.setData(this.data, false, true); // 参数3 传入true为显示默认选中的
            },
            deep: true
        }
    },
    data() {
        return {
            query: "", //搜索
            active: "", //展开列的下标
            data: JSON.parse(JSON.stringify(this.treeData)),
        };
    },
    created() {
        this.setData(this.data, false, true); // 参数3 传入true为显示默认选中的
    },
    methods: {
        // 搜素
        filterList() {
            // console.log(this.getSelectedData(this.data, []));
        },
        //给数组里添加selected属性并赋值为isTrue(true/false)
        setData(data, isTrue = false, initSelect = false, lastData) {
            for (let i = 0; i < data.length; i++) {
                // 默认选中个数-赋值为0
                this.$set(data[i], "selectedNum", 0);
                // 根据传入的selectedData-来显示默认选中
                if (initSelect) {
                    // 判断当前列是否是传入的-回显值
                    if (
                        this.selectedData.includes(data[i].value) &&
                        data[i].children &&
                        data[i].children.length
                    ) {
                        //并且这个回显值-包含子级-代表是父级id，子级就是全部选中状态
                        this.setData(data[i].children, true, false); //设置子级为选中状态
                        this.$set(
                            data[i],
                            "selectedNum",
                            data[i].children.length
                        ); //设置子级的选中个数
                        this.$set(data[i], "selected", true); //设置父级也为选中状态
                    } else {
                        // 回显的值不是包含子级的值
                        if (
                            this.selectedData.includes(data[i].value) &&
                            lastData
                        ) {
                            this.$set(data[i], "selected", true); //设置当前子级为选中状态
                            this.$set(
                                lastData,
                                "selectedNum",
                                (lastData.selectedNum += 1)
                            ); //当前选中子级的个数
                            // 如果选中子级的个数===当前-子级的总个数
                            if (
                                lastData.selectedNum ===
                                lastData.children.length
                            ) {
                                this.$set(lastData, "selected", true); //设置父级为选中状态
                            }
                        }
                    }
                } else {
                    // 根据传入的isTrue， 来设置是否为选中
                    this.$set(data[i], "selected", isTrue);
                }
                // 包含子级-就传入子级-继续循环
                if (data[i].children && data[i].children.length) {
                    this.setData(data[i].children, isTrue, initSelect, data[i]);
                }
            }
        },
        //点击菜单
        selectList(e, index, boole, rank, parentData) {
            this.$set(e, "selected", boole);
            // //判断选中的是子/父
            if (rank === "parent") {
                this.setData(e.children, boole); // 重置子级的，全选或全不选
                this.$set(e, "selectedNum", boole ? e.children.length : 0); //选中子级个数
            } else if (rank === "chil") {
                //选中子级个数
                this.$set(
                    parentData,
                    "selectedNum",
                    parentData.selectedNum + (Number(boole) || -1)
                );
            }
            // 根据子级选中个数-判断父级是否为选中状态
            if (parentData) {
                this.$set(
                    parentData,
                    "selected",
                    parentData.selectedNum === parentData.children.length
                ); //设置父级是否选中--根据子级全选/或未选
            }
            //把选中的值、选择后的原数组--回调出去
            this.$emit(
                "selectedData",
                this.getSelectedData(this.data, []),
                this.data
            );
            console.log(this.getSelectedData(this.data, []));
        },
        // 获取数组中-选中的对象
        getSelectedData(data, arr, parentData) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].selected && data[i].lable.includes(this.query)) {
                    if (parentData) {
                        arr.push({ ...data[i], parentKey: parentData.lable });
                    }
                }
                if (data[i].children) {
                    this.getSelectedData(data[i].children, arr, data[i]);
                }
            }
            return arr;
        }
        //=====================================获取远程数据==================================//
        //=====================================前后端交互====================================//
        //=====================================组件间交互====================================//
        //=====================================其他操作=====================================//
    }
};
</script>



<style lang="scss">
.tree-box {
    flex: 0 0 auto;
    background: #202a3c;
    .banner-title {
        color: #fff;
        // height: 150px;
        padding: 25px;
        background: #2a344e;
        .text1 {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .text2 {
            font-size: 16px;
            margin-bottom: 15px;
        }
        .input {
            .el-input__inner {
                color: #fff;
                background: transparent;
            }
        }
    }
    .list-box {
        // border: 1px solid red;
        cursor: pointer;
        .scroll-box {
            transition: all 0.2s ease-in;
            max-height: 300px;
            overflow-y: auto;
            &::-webkit-scrollbar {
                width: 5px;
                // height: 5px;
                background-color: transparent;
            }
            /*定义滑块 内阴影+圆角*/
            &::-webkit-scrollbar-thumb {
                border-radius: 5px;
                // box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
                background-color: rgba(225, 225, 225, 0.5);
            }
        }
        .list {
            font-size: 16px;
            color: #fff;
            // font-weight: bold;
            display: flex;
            align-items: center;
            padding: 0 20px;
            min-height: 20px;
            &:hover {
                background: rgba(225, 225, 225, 0.3);
            }
            .checkbox {
            }
            .text {
                padding: 10px 0;
                flex: 1;
                padding-left: 10px;
            }
        }
        .chilList-box {
            color: #999;
            font-size: 14px;
            // padding: 5px;
            &:hover {
                background: rgba(225, 225, 225, 0.3);
            }
            .chilList {
                display: flex;
                align-items: center;
                margin-left: 25px;
                min-height: 35px;
                padding: 0 10px;
                .checkbox {
                }
                .text {
                    padding: 10px 0;
                    flex: 1;
                    padding-left: 10px;
                }
            }
        }
        .search-box {
            margin: 10px 10px;
            .el-input__inner {
                color: #fff;
                background: transparent;
            }
        }
    }
    .off-icon {
        transition: all 0.3s linear;
        transform: rotate(-90deg);
    }
    .rotate90 {
        transform: rotate(0deg);
        transition: all 0.3s linear;
    }
}
</style>
