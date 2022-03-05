import * as mutation_types from "./mutation_types";

export default {
  [mutation_types.M_ADD_ITEM](state, payload) {
    const item = { ...payload };
    item.id = state.toDoList.length
      ? state.toDoList[state.toDoList.length - 1].id + 1
      : 1;

    state.toDoList.push(item);
    localStorage.setItem("toDoList", JSON.stringify(state.toDoList));
  },
  [mutation_types.M_EDIT_ITEM](state, payload) {
    state.toDoList = state.toDoList.map((item) =>
      item.id === payload.id ? payload : item
    );
    localStorage.setItem("toDoList", JSON.stringify(state.toDoList));
  },
  [mutation_types.M_REMOVE_ITEM](state, payload) {
    state.toDoList = state.toDoList.filter((item) => item.id !== payload);
    localStorage.setItem("toDoList", JSON.stringify(state.toDoList));
  },
};
