import store from '@/store';
import axios from 'axios';
const instance=axios.create()
import qs from 'qs';


// 添加请求拦截器
instance.interceptors.request.use(config=>{
    // 从vuex中获取token
  let token=  store.state.token
  if(token){
    config.headers.authorization=token
  }
  return config;
})

// 添加响应拦截器
instance.interceptors.response.use(response=>{
    if(response.data.code==401){
        // 用户token失效
        window.location='/user/login'
    }else{
        return response
    }
})

const myAxios={
    //用于发送get请求
    //url是请求资源路径 params是对象{参数名1：参数1，参数名2：参数2}
    get(url,params){
      return  instance({
            method:'get',
            url:url,
            params:params
           })
    },
    // //用于发送post请求
    // url是请求资源路径 params是对象
    post(url,params){
        return  instance({
            method:'post',
            url:url,
            // 将params对象转为查询字符串 key=value&key2=value2
            data:qs.stringify(params) 
           })
    },
}
export default myAxios;