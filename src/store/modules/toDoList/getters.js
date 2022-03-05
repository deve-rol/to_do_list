export default {
  getToDoList: (state) => {
    return state.toDoList;
  },
  getItemById: (state) => (id) => {
    return state.toDoList.find((item) => item.id === id);
  },
};
