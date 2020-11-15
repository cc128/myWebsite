/*
    创建者：cc
    创建时间：2019-06-28 13:54
    模块名称：上传
    备注：xxxx
*/
<template>
    <div v-if="state" class="g-upload-box" @click.stop="''">
        <input id="file" type="file" class="up-input" title="" @change="upLoadFunc" />
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        url: {
            type: String,
            default: ""
        },
        upType: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            state: true,
            loading: false,
            fileType: {
                img: ["image/png", "image/jpg", "image/jpeg"],
                word: [
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    "application/msword"
                ],
                excel: [
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "application/vnd.ms-excel"
                ],
                zip: ["application/x-zip-compressed"]
            }
        };
    },
    created() {},
    methods: {
        upLoadFunc(e) {
            this.$emit("toStart") //加载loading
            const typeData = ["img", "word", "excel", "pdf", "zip"];
            this.loading = true;
            this.file = e.target.files[0];
            if (typeData.includes(this.upType)) {
                if (!this.fileType[this.upType].includes(this.file.type)) {
                    const reminder = {
                        img: "请上传png/jpg/jpeg格式图片",
                        word: "请导入.docx类型文件",
                        excel: "请导入.xlsx/.xls类型文件",
                        zip: "请导入.zip类型压缩包"
                    };
                    this.$confirm(reminder[this.upType], "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        showCancelButton: false,
                        closeOnClickModal: false,
                        type: "warning"
                    });
                    this.state = false;
                    setTimeout(() => {
                        this.state = true;
                    }, 100);
                    return;
                }
            } else {
                const type = [
                    ...this.fileType.img,
                    ...this.fileType.word,
                    ...this.fileType.excel,
                    ...this.fileType.zip
                ];
                if (!type.includes(this.file.type)) {
                    this.$confirm("不支持此类型文件", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        showCancelButton: false,
                        closeOnClickModal: false,
                        type: "warning"
                    });
                    this.state = false;
                    setTimeout(() => {
                        this.state = true;
                    }, 100);
                    return;
                }
            }
            var formData = new FormData();
            formData.append("file", this.file);
            if (!this.url) {
                this.$emit("upSucceed", formData);
                return
            } 
            this.axios
                .post(this.url, formData)
                .then(res => {
                    if (res.code === 200) {
                        this.$emit("upSucceed", res);
                    } else {
                        this.$emit("upError", res);
                    }
                })
                .finally(() => {
                    this.loading = false;
                    this.state = false;
                    this.$emit("toEnd") //加载loading结束
                    setTimeout(() => {
                        this.state = true;
                    }, 100);
                });
        }
    }
};
</script>



<style lang="scss">
.g-upload-box {
    position: relative;
    display: inline-block;
    .up-input {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 0 solid;
        opacity: 0;
    }
}
</style>
