// 定义电影演员相关的接口
const express=require('express')
const router=express.Router()

// 引入mysql连接池
const pool=require('../utils/db')
// 引入joi模块
const Joi = require('joi')
// 引入封装响应对象
const Response = require("../utils/Response.js");

// 查询所有演员接口
// page 1 当前页
// pagesize 10 每页条目数

router.get('/movie-actors',(req,resp)=>{
   

    // 获取请求参数
    let {page,pagesize} =req.query
    // 服务表单验证 
    let schema=Joi.object({
        page:Joi.number().required(), //page必须是数字，必填
        pagesize:Joi.number().integer().required()//pagesize必须是不大于100的数字，必填
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
    let sql="select * from movie_actor limit ?,?"
    pool.query(sql,[startIndex,size],(err,result)=>{
        if(err){
            resp.send(Response.error(500,error))
            throw err
        }
        resp.send(Response.ok(result))
        return; //结束
    })
})

// 添加演员接口
// actorName 演员名字   actorAvatar  演员头像路径
router.post('/movie-actor/add',(req,resp)=>{
    let {actorName,actorAvatar}=req.body
    // 表单验证
    let schema=Joi.object({
        actorName:Joi.string().required(), 
        actorAvatar:Joi.string().required()
    })
    let{error,value} =schema.validate(req.body)
    if(error){
        resp.send(Response.error(400,error))
        return; //结束
    } 

    // 表单验证正确，执行添加操作
    let sql='insert into movie_actor (actor_name,actor_avatar) values (?,?)'
    pool.query(sql,[actorName,actorAvatar],(error,result)=>{
        if(error){
            resp.send(Response.error(500,error))
            throw error;
        }
         resp.send(Response.ok() )
    })
    
})


// 删除演员接口
router.post('/movie-actor/del',(req,resp)=>{
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
    let sql="delete from movie_actor where id=?"
    pool.query(sql,[id],(error,result)=>{
        if(error){
            resp.send(Response.error(500,error))
            throw error;
        }
        resp.send(Response.ok() )
    })
})

//模糊查询 通过姓名关键字查询演员
router.post('/movie-actors/name',(req,resp)=>{
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
    let sql="select * from movie_actor where actor_name like ?"
    pool.query(sql,[`%${name}%`],(err,result)=>{
        if(err){
            throw err
        }
        resp.send(Response.ok(result))
        return; //结束
    })
})

// 通过movie_id查询演员接口
router.get('/movie-actors/movieid',(req,resp)=>{
    let {movie_id} =req.query
    // 服务表单验证 
    let schema=Joi.object({
        movie_id:Joi.number().required(),
    })
    let{error,value} =schema.validate(req.query)
    if(error){
        resp.send(Response.error(400,error))
       return
    }
    let sql=`
    select
    ma.id actor_id,
    mima.movie_id movie_id,
    ma.actor_name actor_name,
    ma.actor_avatar actor_avatar
    from movie_actor ma join movie_info_map_actor mima on ma.id=mima.actor_id
    where
    mima.movie_id= ? `
    pool.query(sql,[movie_id],(error,result)=>{
        if(error){
            resp.send(Response.error(500,error))
            throw error;
        }
        resp.send(Response.ok(result) )
    })
})


// 将router对象导出
module.exports=router