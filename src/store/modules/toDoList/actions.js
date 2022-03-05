import * as types from "./types";
import * as mutation_types from "./mutation_types";

export default {
  [types.A_ADD_ITEM](context, payload) {
    return new Promise((resolve) => {
      context.commit(mutation_types.M_ADD_ITEM, payload);
      resolve();
    });
  },
  [types.A_EDIT_ITEM](context, payload) {
    return new Promise((resolve) => {
      context.commit(mutation_types.M_EDIT_ITEM, payload);
      resolve();
    });
  },
  [types.A_REMOVE_ITEM](context, payload) {
    return new Promise((resolve) => {
      context.commit(mutation_types.M_REMOVE_ITEM, payload);
      resolve();
    });
  },
};
