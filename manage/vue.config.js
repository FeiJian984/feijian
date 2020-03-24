module.exports={
    devServer:{
        open:true,
        host:"127.0.0.1",
        port:8080,
        //代理：正向代理前端（翻墙软件访问国外网站），反向代理后端（访问某一个服务器）
        proxy:{
            // /ele当你请求的地址以/ele开头会使用该代理服务
            "/ele":{
                //指定你要代理的服务器是谁
                target:"http://127.0.0.1",
                changeOrigin:true, //是否开启代理
                pathRewrite:{ //将地址进行重写，将/ele替换为空，去除/ele
                    "^/ele":""
                }
            }
        }
    }
}