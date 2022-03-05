<template>
  <div class="to-do-form">
    <div class="content">
      <validation-observer ref="form" tag="div" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submit)">
          <validation-provider
            rules="required"
            v-slot="{ errors }"
            class="p-relative"
          >
            <input
              v-model="form.name"
              type="text"
              autofocus
              class="form-input"
              placeholder="Введите наименование"
            />
            <span class="form-error-text">{{ errors[0] }}</span>
          </validation-provider>

          <validation-provider
            rules="required"
            v-slot="{ errors }"
            class="p-relative"
          >
            <textarea
              v-model="form.description"
              type="text"
              class="form-input"
              placeholder="Введите описание"
            />
            <span class="form-error-text">{{ errors[0] }}</span>
          </validation-provider>

          <validation-provider v-slot="{ errors }" class="p-relative">
            <textarea
              v-model="form.note"
              type="text"
              class="form-input"
              placeholder="Заметка"
            />
            <span class="form-error-text">{{ errors[0] }}</span>
          </validation-provider>

          <div class="btn-group">
            <button type="submit" class="primary-btn">
              <span v-if="!isEdit">Добавить</span>
              <span v-else>Сохранить</span>
            </button>

            <router-link to="/" tag="button" class="grey-btn">
              Отменить
            </router-link>
          </div>
        </form>
      </validation-observer>
    </div>
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
  name: "ToDoForm",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      form: {
        name: "",
        description: "",
        note: "",
      },
    };
  },
  computed: {
    isEdit() {
      return !!this.$route.params.id;
    },
  },
  methods: {
    setForm() {
      const item = this.$store.getters["toDoList/getItemById"](
        +this.$route.params.id
      );

      if (!item) {
        this.$router.push("/Add");
        return;
      }

      this.form = { ...item };
    },
    submit() {
      const actionType = this.isEdit ? "A_EDIT_ITEM" : "A_ADD_ITEM";
      this.$store
        .dispatch(`toDoList/${actionType}`, this.form)
        .then(() => {
          this.$router.push("/");
        })
        .catch(() => {
          alert("Ошибка");
        });
    },
    resetForm() {
      this.form = {
        name: "",
        description: "",
        note: "",
      };
      this.$refs.form.reset();
    },
  },
  beforeRouteLeave(to, from, next) {
    this.resetForm();
    next();
  },
  watch: {
    "$route.params.id": {
      immediate: true,
      handler(val) {
        if (val) {
          this.setForm();
        }
      },
    },
  },
};
</script>

<style scoped lang="scss">
.to-do-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 40px;

  .content {
    width: 50%;
    min-width: 500px;

    form {
      display: grid;
      grid-gap: 20px;

      textarea {
        resize: vertical;
      }

      .btn-group {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 15px;
      }
    }
  }
}
</style>
