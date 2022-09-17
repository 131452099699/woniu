// 定义剧照相关的接口
const express=require('express')
const router=express.Router()

// 引入mysql连接池
const pool=require('../utils/db')
// 引入joi模块
const Joi = require('joi')
// 引入封装响应对象
const Response=require('../utils/Response')

// 添加剧照接口
router.post('/movie-thumb/add',(req,resp)=>{
    let {url,movie_id}=req.body
    // 表单验证
    let schema=Joi.object({
        url:Joi.string().required(), 
        movie_id:Joi.string().required()
    })
    let{error,value} =schema.validate(req.body)
    if(error){
        resp.send(Response.error(400,error))
        return; //结束
    } 

    // 表单验证正确，执行添加操作
    let sql='insert into movie_thumb (url,movie_id) values (?,?)'
    pool.query(sql,[url,movie_id],(error,result)=>{
        if(error){
            resp.send(Response.error(500,error))
            throw error;
        }
         resp.send(Response.ok(result) )
    })   
})

// 删除剧照接口
router.post('/movie-thumb/del',(req,resp)=>{
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
    let sql="delete from movie_thumb where id=?"
    pool.query(sql,[id],(error,result)=>{
        if(error){
            resp.send(Response.error(500,error))
            throw error;
        }
        resp.send(Response.ok() )
    })
})

// 通过movieid查询所有剧照接口
router.get('/movie-thumbs/movieid',(req,resp)=>{
    let {movie_id}=req.query
    // 表单验证
    let schema=Joi.object({
        movie_id:Joi.string().required(), 
    })
    let{error,value} =schema.validate(req.query)
    if(error){
        resp.send(Response.error(400,error))
        return; //结束
    } 
    // 执行查询业务
    let sql="select * from movie_thumb where movie_id=?"
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