import Vue from "vue";
import Vuex from "vuex";

import Auth from "./modules/auth/store";
import ToDoList from "./modules/toDoList/store";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: Auth,
    toDoList: ToDoList,
  },
});
