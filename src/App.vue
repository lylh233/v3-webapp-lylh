<template>
  <div id="app">

    <!--navBar-->
    <div class="nav-bar">
      <van-nav-bar
          :title="$store.state.nav.title"
          :left-text="$store.state.nav.left"
          :right-text="$store.state.nav.right"
          :left-disabled = "$store.state.nav.leftDisabled"
          :right-disabled = "$store.state.nav.rightDisabled"
          @click-left="onClickLeft"
          @click-right="onClickRight"
      />
    </div>

    <!--noticeBar-->
    <div class="notice-bar">
      <van-notice-bar
          left-icon="volume-o"
          :text="$store.state.notice === '' ? $store.state.noticeText[Math.floor(Math.random()*$store.state.noticeText.length)] : $store.state.notice"
      />
    </div>

    <!--vue3的router-view绑定ref不能直接写，不然获取的是router-view实例-->
    <router-view v-slot="{ Component }">
      <component ref="routerViewRef" :is="Component" />
    </router-view>

  </div>
</template>

<script>

import router from '@/router';
import {ref} from 'vue';


export default {
  name: 'App',

  setup() {

    const routerViewRef = ref(null);

    const onClickLeft = ()=>{
      router.go(-1);
    }

    const onClickRight = ()=>{
      let currentRoute = router.currentRoute.value.fullPath;
      console.log(currentRoute);
      if (currentRoute.indexOf("/member") === 0) {
        routerViewRef.value.addDialogOpen();
      }
    }

    return {
      routerViewRef,
      onClickLeft,
      onClickRight,
    }
  },

  props: {

  },

  components: {

  },

  data() {
    return {
      // nav: this.$store.state.nav,
    }
  },

  methods: {
    // onClickLeft() {
    //   this.$router.go(-1);
    // },
    //
    // onClickRight() {
    //   this.$refs
    // },
  },
}
</script>

<style>
</style>
