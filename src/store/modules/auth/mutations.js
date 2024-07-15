export default {
  commitSignupStatus(state, payload) {
    state.signupStatus.isValid = payload.isValid;
    state.signupStatus.message = payload.message;
  },
  commitLoginStatus(state, payload) {
    state.loginStatus = {
      isValid: payload.isValid,
      message: payload.message,
    };
  },
  commitLoggedInUser(state, payload) {
    state.email = payload.email;
    state.token = payload.token;
    state.localId = payload.localId;
    localStorage.setItem("email", payload.email);
    localStorage.setItem("token", payload.token);
    localStorage.setItem("localId", payload.localId);
  },
  commitLoggedUserAsEmpty(state) {
    state.email = null;
    state.token = null;
    state.localId = null;
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("localId");
  },
};
