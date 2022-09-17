const express=require('express')
const app=express()
// 服务器端口
const port=9000
const Response=require('./utils/Response')
//  配置跨域
const cors=require('cors')
app.use(cors({
   origin:"*"
}))
// 引入uuid模块
const uuid=require('uuid')

// 配置静态资源托管文件夹 static
app.use(express.static('static'))

// 配置multer文件，处理文件上传
const multer=require('multer')
const uploadTools=multer({
    storage:multer.diskStorage({
        destination:(req,file,callback)=>{
            callback(null,'static')
        },
        filename:(req,file,callback)=>{
            // 通过file获取原始文件名
          let name=file.originalname
        //   获取源文件的后缀
        let ext=name.substr(name.lastIndexOf('.'))
        // 生成一个随机文件名，调用callback返回即可
        let newName=uuid.v4()+ext
            callback(null,newName)
        }
    })
})
app.post('/upload',uploadTools.single('file'),(req,resp)=>{
    // uploadTools.array('file')将会把file字段中传输文件数据通过uploadTools接收并保存
    let url="http://127.0.0.1:9000/"+req.file.filename
    console.log(req.file);
    resp.send(Response.ok(url))
})
app.listen(port,()=>{
    console.log('上传文件服务已启动') 
}) 