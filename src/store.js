import { createStore } from 'vuex'

export default createStore({
    state: {
        //这里放全局参数
        nav: {
            title: "",
            left: "",
            right: "",
            leftDisabled: false,
            rightDisabled: false
        },

        notice: "",
        noticeText: [
            "江水悠悠，清水悠悠...",
            "春水碧于天，画船听雨眠...",
            "南风知我意，吹梦到西洲...",
            "烟雨入江南，山水如墨染...",
            "风飒飒兮木萧萧，思公子兮徒离忧...",
            "晴空一鹤排云上，便引诗情到碧霄...",
            "梦里不觉秋已深，余情岂是为他人...",
            "满堂花醉三千客，一剑霜寒十四州...",
            "二十四桥明月夜，波心荡，冷月无声...",
        ],

    },
    getters: {},
    modules: {}
})