import myAxios from '../MyAxios';
import BASEURL from '../BaseUrl';

const directorApi={
    // 查询导演列表接口
    // params:封装了请求参数的对象{page:1,pagesize:100 }
    list:(params)=>{
       return myAxios.get(BASEURL+'/movie-directors',params)
    },
    //添加导演接口
    // params:{directorName:xxx,directorAvatar:xxx}
    add:(params)=>{
        return myAxios.post(BASEURL+'/movie-director/add',params)
    },
    // 删除导演接口
    // params:{id:1}
    delete:(params)=>{
        return myAxios.post(BASEURL+'/movie-director/del',params)
    },
    // 模糊查询接口
    // params:{name:'马'}
    listByName:(params)=>{
        return myAxios.post(BASEURL+'/movie-directors/name',params)
    } 
}

export default directorApi