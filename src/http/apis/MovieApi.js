import myAxios from '../MyAxios';
import BASEURL from '../BaseUrl';
import { del } from 'vue';

const movieApi={
    //添加电影接口
    // params:{actorName:xxx,actorAvatar:xxx}
    add:(params)=>{
        return myAxios.post(BASEURL+'/movie-info/add',params)
    },
    // 查询电影类型的列表
    listAllMovieTypes(){
        return myAxios.get(BASEURL+'/movie-types')
    },

    // 查询所有电影
    list(params){
        return myAxios.get(BASEURL+'/movie-infos',params)
    },

    // 删除电影
    delete(params){
        return myAxios.post(BASEURL+'/movie-info/del',params)
    },

    // 通过ID查询电影详情
    queryById(params){
        return myAxios.get(BASEURL+'/movie-info/query',params)
    },
    //更新电影接口
    update(params){
        return myAxios.post(BASEURL+'/movie-info/update',params)
    },
    // 为电影绑定演员列表
    bindActors(params){
        return myAxios.post(BASEURL+'/movie-info/bind-actors',params)
    },
       // 通过电影名称模糊查询所有电影
       listByName(params){
        return myAxios.post(BASEURL+'/movie-infos/name',params)
    },
}

export default movieApi