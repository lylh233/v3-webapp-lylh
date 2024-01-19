<template>
  <div class="login" style="padding: 1rem">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit" @click="login()">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import http from "@/utils/http.js";
import authApi from "@/utils/auth.js";
import { setNav } from '@/utils/serverUtils.js'
import { showFailToast } from 'vant';
import { setCookie } from '@/utils/cookie.js'


export default {
  name: "v3-login",

  data() {
    return {
      username: "",
      password: ""
    }
  },

  mounted(){
    setNav("登录", "", "", true, true)
  },

  created() {

  },

  methods: {
    login: function () {
      let _this = this;
      http({
        url: authApi.login.url,
        method: authApi.login.method,
        data: {
          username: _this.username,
          password: _this.password
        },

        onSuccess: function (res) {
          console.log(res);
          setCookie(process.env.VUE_APP_TOKEN, res.data, 1);
          _this.toHome(res.data);
        },

        onError: function (res) {
          showFailToast(res.data.msg);
        }
      });
    },

    toHome(data) {
      this.$router.replace({
        path: "/",
        params: data,
      })}
  }

}
</script>

<style scoped>

</style>