module.exports = {
    outputDir: 'dist',   //build输出目录
    assetsDir: 'assets', //静态资源目录（js, css, img）
    lintOnSave: true, //是否开启eslint
    devServer: {
        open: true, //是否自动弹出浏览器页面
        // host: "localhost", 
        port: '8080', 
        https: false,   //是否使用https协议
        hotOnly: false, //是否开启热更新
        proxy: {
            '/dev': {
                target: 'http://193.112.188.180/',
                changeOrigin: true,
                pathRewrite: {
                    '^/dev': ''
                }
            }
        },
    }
}