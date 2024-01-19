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

    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',

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
    onClickLeft() {
      this.$router.go(-1);
    },

    onClickRight() {

    },
  },
}
</script>

<style>
</style>
