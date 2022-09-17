import myAxios from '../MyAxios';
import BASEURL from '../BaseUrl';

const actorApi={
    // 查询演员列表接口
    // params:封装了请求参数的对象{page:1,pagesize:100 }
    list:(params)=>{
       return myAxios.get(BASEURL+'/movie-actors',params)
    },
    //添加演员接口
    // params:{actorName:xxx,actorAvatar:xxx}
    add:(params)=>{
        return myAxios.post(BASEURL+'/movie-actor/add',params)
    },
    // 删除演员接口
    // params:{id:1}
    delete:(params)=>{
        return myAxios.post(BASEURL+'/movie-actor/del',params)
    },
    // 模糊查询接口
    // params:{name:'马'}
    listByName:(params)=>{
        return myAxios.post(BASEURL+'/movie-actors/name',params)
    },

    // 通过movie_id查询演员列表
    listByMovieId(params){
        return myAxios.get(BASEURL+'/movie-actors/movieid',params)
    }
}

export default actorApi