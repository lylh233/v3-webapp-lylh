import axios from 'axios'
import qs from 'qs'
import { showFailToast } from 'vant';
import Cookies from "js-cookie";
import router from '@/router'


//请求白名单
const whitelist = ['/login', "/core/*", "/mock/*"];

//请求拦截器
axios.interceptors.request.use(config => {
    for (let i = 0; i < whitelist.length; i++) {
        if (config.url.indexOf(whitelist[i]) > -1) {
            return config;
        }
    }

    let token = Cookies.get(process.env.VUE_APP_TOKEN)
    if (token == null || token === "") {
        //todo 返回登录
        console.log("token 不存在！");
        return config;
    }

    config.headers[process.env.VUE_APP_TOKEN] = token;
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

    if (opts.method === 'get' || opts.method === 'delete') {
        httpRequestOpts.params = _data;
    } else {
        //这里后台接收的是json, x-www-form-urlencoded用qs.stringify
        httpRequestOpts.data = qs.parse(_data, { allowDots: true });
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
                            router.replace({
                                path: "/login"
                            }).then(r => console.log(r))
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
                console.log(error);
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




