import { createStore } from "vuex";
import validationModule from "./modules/validation/index";
import authModule from "./modules/auth/index";
import membersModule from "./modules/members/index";
import topicsModule from "./modules/topics/index";

import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

const store = createStore({
  namespaced: true,
  modules: {
    validation: validationModule,
    auth: authModule,
    members: membersModule,
    topics: topicsModule,
  },
  state() {
    return {
      webApiKey: "AIzaSyDNKzXt738OU1tcT_6InfDznjGw4VUN4U0",
      urls: {
        login:
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=",
        signup:
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=",
        firebase:
          "https://vue-practice6-7-default-rtdb.asia-southeast1.firebasedatabase.app/",
      },
      isTokenExpired: false,
    };
  },
  getters,
  actions,
  mutations,
});

export default store;
