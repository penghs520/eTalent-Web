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
            '/api': {
                target: 'http://193.112.188.180/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            },
            '/hpi': {   /* 黄开添 */
                target: 'http://192.168.1.119:8080',
                changeOrigin: true,
                pathRewrite: {
                    '^/hpi/masterdata': ''
                }
            },
            '/ppi': {   /* 彭洪思 */
                target: 'http://192.168.1.138:8080',
                changeOrigin: true,
                pathRewrite: {
                    '^/ppi/masterdata': ''
                }
            },
        },
    }
}