import myAxios from '../MyAxios';
import BASEURL from '../BaseUrl';

const showingonPlanApi={
    //添加排片计划接口
    // params:{actorName:xxx,actorAvatar:xxx}
    add:(params)=>{
        return myAxios.post(BASEURL+'/plan/add',params)
    },

    // 通过room_id查询放映厅列表
    queryByRoomId(params){
        return myAxios.get(BASEURL+'/plans/roomid',params)
    },
    //根据id删除排片计划
    delete(params){
        return myAxios.post(BASEURL+'/plan/del',params)
    },
    // 发布排片计划
    publish(params){
        return myAxios.post(BASEURL+'/plan/publish',params)
    },
    // 将排片计划设置为未发布状态
    noPublish(params){
        return myAxios.post(BASEURL+'/plan/no-publish',params)
    },

}

export default showingonPlanApi