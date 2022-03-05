import * as types from "./types";
import * as mutation_types from "./mutation_types";

export default {
  [types.A_AUTH](context, payload) {
    return new Promise((resolve, reject) => {
      const isExist = payload.login === "admin" && payload.password === "12345";

      if (isExist) {
        context.commit(mutation_types.M_AUTH, true);
        localStorage.setItem("IsAuth", "on");

        resolve();
      } else {
        reject();
      }
    });
  },
  [types.A_LOGOUT](context) {
    return new Promise((resolve) => {
      context.commit(mutation_types.M_AUTH, false);
      localStorage.removeItem("IsAuth");
      resolve();
    });
  },
};
