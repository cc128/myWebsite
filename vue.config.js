module.exports = {
    //css相关配置
    devServer: {
        disableHostCheck: true,
        https: true
    },
    css: {
        loaderOptions: {
            css: {
                // 这里的选项会传递给 css-loader
            },
            sass: {
                prependData: `@import "@/scss/index.scss";`
            }
        },
        sourceMap: false
    },
    //第三方依赖剥离
    configureWebpack: {},
    //代理服务器配置
    // devServer: {
    //     proxy: {
    //         "/": {
    //             target: "http://mvi.xrdata.net/draw/evaluation", //线上
    //             ws: false,
    //             changeOrigin: true
    //         }
    //     }
    // },
    // publicPath: "/video2",
    publicPath: "./",
    outputDir: "dist",
    productionSourceMap: false //打包时候js是否添加sourceMap
};
