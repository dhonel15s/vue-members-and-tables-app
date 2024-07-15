import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

export default {
  state() {
    return {
      signupStatus: {
        isValid: null,
        message: "",
      },
      loginStatus: {
        isValid: null,
        message: "",
      },
      email: null,
      token: null,
      localId: null,
    };
  },
  getters,
  actions,
  mutations,
};
