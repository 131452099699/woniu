// 定义电影导演相关的接口
const express=require('express')
const router=express.Router()

// 引入mysql连接池
const pool=require('../utils/db')
// 引入joi模块
const Joi = require('joi')
// 引入封装响应对象
const Response=require('../utils/Response')

// 查询所有导演接口
// page 1 当前页
// pagesize 10 每页条目数
router.get('/movie-directors',(req,resp)=>{
    // 获取请求参数
    let {page,pagesize} =req.query

    // 服务表单验证 
    let schema=Joi.object({
        page:Joi.number().required(), //page必须是数字，必填
        pagesize:Joi.number().integer().max(100).required()//pagesize必须是不大于100的数字，必填
    })
    let{error,value} =schema.validate(req.query)
    if(error){
        resp.send(Response.error(400,error))
        throw error;
    }
    
    // 查询数据库
    // limit  从下标为x向后查询n条数据
    let startIndex=(page-1)*10 //下标
    let size=parseInt(pagesize)  //条数
    let sql="select * from movie_director limit ?,?"
    pool.query(sql,[startIndex,size],(err,result)=>{
        if(err){
            throw err
        }
        resp.send(Response.ok(result))
        return; //结束
    })
})

// 添加导演接口
// directorName 导演名字   directorAvatar  导演头像路径
router.post('/movie-director/add',(req,resp)=>{
    let {directorName,directorAvatar}=req.body
    // 表单验证
    let schema=Joi.object({
        directorName:Joi.string().required(), 
        directorAvatar:Joi.string().required()
    })
    let{error,value} =schema.validate(req.body)
    if(error){
        resp.send(Response.error(400,error))
        return; //结束
    } 

    // 表单验证正确，执行添加操作
    let sql='insert into movie_director (director_name,director_avatar) values (?,?)'
    pool.query(sql,[directorName,directorAvatar],(error,result)=>{
        if(error){
            resp.send(Response.error(500,error))
            throw error;
        }
         resp.send(Response.ok() )
    })
    
})


// 删除导演接口
router.post('/movie-director/del',(req,resp)=>{
    let {id}=req.body
    // 表单验证
    let schema=Joi.object({
        id:Joi.string().required(), 
    })
    let{error,value} =schema.validate(req.body)
    if(error){
        resp.send(Response.error(400,error))
        return; //结束
    } 
    // 执行删除业务
    let sql="delete from movie_director where id=?"
    pool.query(sql,[id],(error,result)=>{
        if(error){
            resp.send(Response.error(500,error))
            throw error;
        }
        resp.send(Response.ok() )
    })
})

//模糊查询 通过姓名关键字查询导演
router.post('/movie-directors/name',(req,resp)=>{
    let {name}=req.body
      // 表单验证
      let schema=Joi.object({
        name:Joi.string().required(), 
    })
    let{error,value} =schema.validate(req.body)
    if(error){
        resp.send(Response.error(400,error))
        return; //结束
    } 
    // 执行模糊查询
    let sql="select * from movie_director where director_name like ?"
    pool.query(sql,[`%${name}%`],(err,result)=>{
        if(err){
            throw err
        }
        resp.send(Response.ok(result))
        return; //结束
    })
})



// 将router对象导出
module.exports=router