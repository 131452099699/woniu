// 定义电影院相关的接口
const express=require('express')
const router=express.Router()

// 引入mysql连接池
const pool=require('../utils/db')
// 引入joi模块
const Joi = require('joi')
// 引入封装响应对象
const Response=require('../utils/Response')


// 添加电影院接口
router.post('/cinema/add',(req,resp)=>{
    let {cinema_name,address,province,city,district,longitude,latitude,tags}=req.body
    // 表单验证
    let schema=Joi.object({
        cinema_name:Joi.string().required(), 
        address:Joi.string().required(),
        province:Joi.string().required(),
        city:Joi.string().required(),
        district:Joi.string().required(),
        longitude:Joi.number().required(),
        latitude:Joi.number().required(),
        tags:Joi.string().required(),
    })
    let{error,value} =schema.validate(req.body)
    if(error){
        resp.send(Response.error(400,error))
        return; //结束
    } 

    // 表单验证正确，执行添加操作
    let sql='insert into movie_cinema (cinema_name,address,province,city,district,longitude,latitude,tags) values (?,?,?,?,?,?,?,?)'
    pool.query(sql,[cinema_name,address,province,city,district,longitude,latitude,tags],(error,result)=>{
        if(error){
            resp.send(Response.error(500,error))
            throw error;
        }
         resp.send(Response.ok() )
    })
    
})

// 查询所有电影标签
router.get('/cinema/tags',(req,resp)=>{
    let sql="select * from movie_cinema_tag"
    pool.query(sql,(error,result)=>{
        if(error){
            resp.send(Response.error(500,error))
            throw error;
        }
         resp.send(Response.ok(result) )
    })
})

// 查询所有电影院
router.get('/cinemas',(req,resp)=>{
    let sql="select * from movie_cinema"
    pool.query(sql,(error,result)=>{
        if(error){
            resp.send(Response.error(500,error))
            throw error;
        }
         resp.send(Response.ok(result) )
    })
})

// 删除电影院接口
router.post('/cinema/del',(req,resp)=>{
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
    let sql="delete from movie_cinema where id=?"
    pool.query(sql,[id],(error,result)=>{
        if(error){
            resp.send(Response.error(500,error))
            throw error;
        }
        resp.send(Response.ok() )
    })
})

// 通过ID查询电影院接口
router.get('/cinema/query',(req,resp)=>{
    let {id}=req.query
    // 表单验证
    let schema=Joi.object({
        id:Joi.string().required(), 
    })
    let{error,value} =schema.validate(req.query)
    if(error){
        resp.send(Response.error(400,error))
        return; //结束
    } 
    // 执行查询业务
    let sql="select * from movie_cinema where id=?"
    pool.query(sql,[id],(error,result)=>{
        if(error){
            resp.send(Response.error(500,error))
            throw error;
        }
        if(result && result.length==0){
            resp.send(Response.ok(null) )
        }else{
    //查询到的是数组,用数组下标将对象拿出来
            resp.send(Response.ok(result[0]) )
        }

    })
})

// 修改电影院接口
router.post('/cinema/update',(req,resp)=>{
    let {id,cinema_name,address,province,city,district,longitude,latitude,tags}=req.body
    // 表单验证
    let schema=Joi.object({
        id:Joi.string().required(), 
        cinema_name:Joi.string().required(), 
        address:Joi.string().required(),
        province:Joi.string().required(),
        city:Joi.string().required(),
        district:Joi.string().required(),
        longitude:Joi.number().required(),
        latitude:Joi.number().required(),
        tags:Joi.string().required(),
    })
    let{error,value} =schema.validate(req.body)
    if(error){
        resp.send(Response.error(400,error))
        return; //结束
    } 

    // 表单验证正确，执行添加操作
    let sql=`update movie_cinema set 
    cinema_name=?,
    address=?,
    province=?,
    city=?,
    district=?,
    longitude=?,
    latitude=?,
    tags=?
       where id=?`;
    pool.query(sql,[cinema_name,address,province,city,district,longitude,latitude,tags,id],(error,result)=>{
        if(error){
            resp.send(Response.error(500,error))
            throw error;
        }
         resp.send(Response.ok() )
    })
    
})



// 将router对象导出
module.exports=router