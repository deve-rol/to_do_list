import * as mutation_types from "./mutation_types";

export default {
  [mutation_types.M_AUTH](state, payload) {
    state.isAuth = payload;
  },
};
