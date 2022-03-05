import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/Auth",
    name: "Auth",
    meta: { title: "Вход в систему", requiresAuth: false },
    component: () => import("../views/Auth/Auth.vue"),
  },
  {
    path: "/",
    name: "List",
    meta: { title: "Список дел", requiresAuth: true },
    component: () => import("../views/ToDoList/ToDoList.vue"),
  },
  {
    path: "/Add",
    name: "AddList",
    meta: { title: "Добавление", requiresAuth: true },
    component: () => import("../views/ToDoList/ToDoForm.vue"),
  },
  {
    path: "/Edit/:id",
    name: "EditList",
    meta: { title: "Редактирование", requiresAuth: true },
    component: () => import("../views/ToDoList/ToDoForm.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) document.title = to.meta.title;

  const isAuth = store.getters["auth/getIsAuth"];
  if (to.meta.requiresAuth && !isAuth) {
    next("/Auth");
  } else if (!to.meta.requiresAuth && isAuth) {
    next("/");
  } else {
    next();
  }
});

export default router;
