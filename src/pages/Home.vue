<template>
  <div class="home">
    <!--banner-->
    <div class="banner">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image.url" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <van-divider>分割线</van-divider>
    <!--content-->
    <div class="content">
      <van-grid :column-num="3">
        <van-grid-item v-for="(content, index) in contents"
                       :to="content.router"
                       :key="index"
                       :icon="content.image"
                       :text="content.text" @click="onClickContent(content)"/>
      </van-grid>
  </div>
  </div>
</template>

<script>
import http from "@/utils/http.js";
import { setNav } from '@/utils/serverUtils.js'

export default {
  name: "v3-home",

  props: {

  },

  components: {

  },

  data() {
    return {
      // api receive
      images: [],
      contents: [],

      location: '',
    }
  },

  mounted(){
    setNav("首页", "返回", "", false, true);
    this.getImages();
    this.getContents();
  },

  created() {

  },

  methods: {
    //api begin

    getImages: function () {
      let _this = this;
      http({
        url: "/mock/index_images.json",
        method: "get",
        onSuccess: function (res) {
          _this.images = res.data;
        }
      });
    },

    getContents: function () {
      let _this = this;
      http({
        url: "/mock/index_contents.json",
        method: "get",
        onSuccess: function (res) {
          _this.contents = res.data;
        }
      });
    },

    //api end

    //event begin

    onClickContent(data){
      console.log(data)
    },

    //event end

    //router begin

    toLogin() {
      this.$router.replace({
        path: "/login"
      })}

    //router end
  },
}

</script>

<style scoped>
.van-swipe-item {
  width: 100vm;
  height: 12rem;
}

.van-swipe-item > img {
  width: 100%;
  height: 100%;
}

</style>