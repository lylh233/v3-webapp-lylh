import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store';
import router from '@/router';
import axios from 'axios'

const app = createApp(App);

app.use(store);
app.use(router);

//全局变量
app.config.globalProperties.$store = store;
app.config.globalProperties.$router = router;
app.config.globalProperties.$http = axios;

//配置axios
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = process.env.TIMEOUT;
axios.defaults.baseURL = process.env.BASE_URL;

//引入vant
import 'vant/lib/index.css';
import { Button, NavBar, Toast, Form, Field, Swipe, SwipeItem, Lazyload, Divider, Tab, Tabs,
    Grid, GridItem, NoticeBar, Cell, CellGroup, Collapse, CollapseItem, Search, List, PullRefresh,
    Tag, Dialog, Popup, Picker} from 'vant';
app.use(Button) .use(Toast) .use(Form) .use(Field) .use(NavBar) .use(Swipe) .use(SwipeItem) .use(Lazyload) .use(Divider) .use(Tab) .use(Tabs)
    .use(Grid) .use(GridItem) .use(NoticeBar) .use(Cell) .use(CellGroup) .use(Collapse) .use(CollapseItem) .use(Search) .use(List) .use(PullRefresh)
    .use(Tag) .use(Dialog). use(Popup) .use(Picker);

app.mount('#app')
