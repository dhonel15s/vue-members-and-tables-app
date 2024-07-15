export default {
  signupStatus(state) {
    return state.signupStatus;
  },
  loginStatus(state) {
    return state.loginStatus;
  },
  email(state) {
    return state.email || localStorage.getItem("email");
  },
  token(state) {
    return state.token || localStorage.getItem("token");
  },
  localId(state) {
    return state.localId || localStorage.getItem("localId");
  },
};
