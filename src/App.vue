<template>
  <div id="app">
    <top-menu />

    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import TopMenu from "./components/TopMenu";
export default {
  components: {
    TopMenu,
  },
};
</script>

<style lang="scss">
@import "assets/css/reset.css";
@import "assets/css/common.css";
</style>
