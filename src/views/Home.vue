/*
    创建者：cc
    创建时间：2020-07-03 17:27
    模块名称：首页
    备注：xxxx
*/
<template>
    <div class="home">
        <div class="header-box">
            <div class="logo">lcc</div>
            <el-menu class="home-menu" :default-active="activeIndex2" mode="horizontal" :collapse="false" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                <el-menu-item index="1">
                    <!-- <i class="el-icon-setting"></i> -->
                    <span slot="title">聊天室</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <!-- <i class="el-icon-setting"></i> -->
                    <span slot="title">直播</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <!-- <i class="el-icon-setting"></i> -->
                    <span slot="title">视频通话</span>
                </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeIndex2: "1"
        };
    },
    created() {},
    methods: {
        //=====================================获取远程数据==================================//
        //=====================================前后端交互====================================//
        //=====================================组件间交互====================================//
        //=====================================其他操作=====================================//
    }
};
</script>



<style lang="scss">
.home {
    height: 100%;
    // display: flex;
    .el-menu {
        border-right: none;
    }
    .header-box {
        width: 100%;
        min-height: 60px;
        display: flex;
        box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
        .logo {
            width: 200px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            background: #545c64;
        }
        .home-menu {
            width: 100%;
        }
    }
}
</style>
