<template>
  <div class="top-menu">
    <h2>{{ title }}</h2>
    <span v-show="isAuth" @click="logout" class="exit">Выход</span>
  </div>
</template>

<script>
export default {
  name: "TopMenu",
  computed: {
    title() {
      return this.$route.meta.title;
    },
    isAuth() {
      return this.$store.getters["auth/getIsAuth"];
    },
  },
  methods: {
    logout() {
      this.$store
        .dispatch("auth/A_LOGOUT")
        .then(() => {
          this.$router.push("/Auth");
        })
        .catch(() => {
          alert("Ошибка");
        });
    },
  },
};
</script>

<style scoped lang="scss">
.top-menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 60px;
  border-bottom: 1px solid #aaa;

  .exit {
    cursor: pointer;
  }
}
</style>
