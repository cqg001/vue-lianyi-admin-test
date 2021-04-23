module.exports = {
    devServer: {
        proxy: {
            '/api': {
                // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
                target: 'http://121.36.94.221:6600',
                // 允许跨域
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': 'http://121.36.94.221:6600'
                }
            },
			'/info':{
				target: 'http://ckk.xiaoandcai.cn/',
				// 允许跨域
				changeOrigin: true,
				ws: true,
				pathRewrite: {
                    // eslint-disable-next-line no-mixed-spaces-and-tabs
				    '^/info': 'http://ckk.xiaoandcai.cn/'
				}
			},
            
            
        }
    }
}