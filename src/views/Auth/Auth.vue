<template>
  <div class="auth">
    <validation-observer ref="form" tag="div" v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(login)">
        <span v-show="authErrorText" class="exist-error-text">{{
          authErrorText
        }}</span>
        <validation-provider
          rules="required"
          v-slot="{ errors }"
          class="p-relative"
        >
          <input
            v-model="form.login"
            type="text"
            autofocus
            class="form-input"
            placeholder="Введите логин"
          />
          <span class="form-error-text">{{ errors[0] }}</span>
        </validation-provider>

        <validation-provider
          rules="required"
          v-slot="{ errors }"
          class="p-relative"
        >
          <input
            v-model="form.password"
            type="text"
            class="form-input"
            placeholder="Введите пароль"
          />
          <span class="form-error-text">{{ errors[0] }}</span>
        </validation-provider>

        <button type="submit" class="primary-btn">Войти</button>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "Это поле обязательно к заполнению",
});

export default {
  name: "Auth",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      form: {
        login: "",
        password: "",
      },
      authErrorText: "",
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("auth/A_AUTH", this.form)
        .then(() => {
          this.$router.push("/");
        })
        .catch(() => {
          this.authErrorText = "Логин или пароль указаны неверно.";
        });
    },
    resetForm() {
      this.form = {
        login: "",
        password: "",
      };
      this.authErrorText = "";
      this.$refs.form.reset();
    },
  },
  beforeRouteLeave(to, from, next) {
    this.resetForm();
    next();
  },
};
</script>

<style scoped lang="scss">
.auth {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 40px;

  form {
    display: grid;
    grid-gap: 20px;
    width: 300px;

    .exist-error-text {
      color: red;
      font-size: 14px;
    }
  }
}
</style>
