import axios from 'axios'
import qs from 'qs'
import { showFailToast } from 'vant';
import { getCookie } from '@/utils/cookie.js'


//请求白名单
const whitelist = ['/login', "/core/*", "/mock/*"];

//请求拦截器
axios.interceptors.request.use(config => {
    for (let i = 0; i < whitelist.length; i++) {
        if (whitelist.indexOf(config.url) === -1 || whitelist.some(url => config.url.includes(url))) {
            return config;
        }
    }
    let token = getCookie(process.env.VUE_APP_TOKEN);
    if (token == null) {
        //todo 返回登录
        console.log("token 不存在！");
    }
    config.headers.common[process.env.VUE_APP_TOKEN] = token;
    return config;
},error => {
    //todo something
    console.log("axios.interceptors.request error:", error);
    Promise.error(error);
    return error;
})

//自定义响应
const httpServer = (opts) => {
    if (!opts.method) {
        opts.method = 'get';
    }
    let httpRequestOpts = {
        method: opts.method,
        url: opts.url
    };

    let _data = Object.assign({}, opts.data);
    if (opts.method === 'get') {
        httpRequestOpts.params = _data;
    } else {
        httpRequestOpts.data = qs.stringify(_data, { allowDots: true });
    }

    return new Promise(function () {
        axios(httpRequestOpts).then(
            (res) => {
                //mock数据直接返回
                if (opts.url.includes("/mock/")) {
                    opts.onSuccess(res);
                    return;
                }

                if (res.status === 200) {
                    switch (res.data.code) {
                        case 200:
                            opts.onSuccess(res);
                            break;
                        case 401:
                            showFailToast(res.data.msg);
                            //todo 无token
                            break;
                        default:
                            showFailToast(res.data.msg);
                    }

                } else {
                    if (opts.onError) {
                        showFailToast('系统异常，请联系管理员');
                        opts.onError(res);
                    } else {
                        showFailToast('系统异常，请联系管理员');
                    }
                }
            }
        ).catch(
            (error) => {
                if (opts.onReject) {
                    opts.onReject(error);
                } else {
                    showFailToast('系统异常，请联系管理员');
                }
            }
        )

    })
};

export default httpServer




