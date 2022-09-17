import myAxios from '../MyAxios';
import BASEURL from '../BaseUrl';

const adminApi={
    // 执行登录业务
    login(params){
        return myAxios.post(BASEURL+'/user/login',params)
    }
}

export default adminApi