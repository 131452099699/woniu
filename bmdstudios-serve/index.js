const express=require('express')
 const app=express()

//  配置跨域
 const cors=require('cors')
 app.use(cors({
    origin:"*"
 }))
//  解析post请求参数
app.use(express.urlencoded())

//  接口  处理请求
app.get('/',(req,resp)=>{
    resp.send('heollw word')
})
 app.listen(3000,()=>{
    console.log('服务器已启动');
 })

 // 自定义token全局中间件
 const jwt=require('jsonwebtoken')
 const JWT_SECRET_KEY='JWT_SECRET_KEY'
 const Response = require("./utils/Response");

const tokenTools=function(req,resp,next){
    //若请求路径是/user/login,则不拦截，直接向后执行即可
    if(req.path=='/user/login'){
        next()
        return
    }
    // 执行token验证
   let token=req.headers['authorization']
   try {
       let payload= jwt.verify(token,JWT_SECRET_KEY)   
       req.tokenPayload=payload  //将token存储的数据直接赋值给亲请求对象    
   } catch (error) {
       resp.send(Response.error(401,'用户验证失败，请重新登录'))
       return
   }
   next() 
}
app.use(tokenTools)


// 引入演员路由
let movieActorRouter=require('./router/MovieActor')
app.use(movieActorRouter)
// 引入导演路由
let movieDirectorRouter=require('./router/MovieDirector')
app.use(movieDirectorRouter)
// 引入电影路由
let MovieInfoRouter=require('./router/MovieInfo')
app.use(MovieInfoRouter)
// 引入剧照路由
let MovieThumbRouter=require('./router/MovieThumb')
app.use(MovieThumbRouter)
// 引入影院路由
let CinemaRouter=require('./router/Cinema.js')
app.use(CinemaRouter)
// 引入放映厅路由
let CinemaRoomRouter=require('./router/CinemaRoom.js')
app.use(CinemaRoomRouter)
// 引入排片路由
let ShowingonPlanRouter=require('./router/ShowingonPlan.js')
app.use(ShowingonPlanRouter)
// 引入管理员路由
let AdminRouter=require('./router/Admin.js')
app.use(AdminRouter)






