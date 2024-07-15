export default {
  // SIGNUP ------------------------------------------------
  async signup(context, payload) {
    const url = context.getters.urls.signup + context.getters.webApiKey;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });
    const responseData = await response.json();
    // If request is SUCCESS
    if (response.ok) {
      context.commit("commitSignupStatus", {
        isValid: true,
        message: "Signup is successful.",
      });
      context.commit("commitLoggedInUser", {
        email: responseData.email,
        token: responseData.idToken,
        localId: responseData.localId,
      });
    }
    // If request is ERROR
    else {
      context.commit("commitSignupStatus", {
        isValid: false,
        message: "Failed to sign up user.",
      });
    }
  },

  // LOGIN ------------------------------------------------
  async login(context, payload) {
    const url = context.getters.urls.login + context.getters.webApiKey;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });
    const responseData = await response.json();
    // If request is SUCCESS
    if (response.ok) {
      context.commit("commitLoginStatus", {
        isValid: true,
        message: "Login is successful.",
      });
      context.commit("commitLoggedInUser", {
        email: responseData.email,
        token: responseData.idToken,
        localId: responseData.localId,
      });
    }
    // If request is ERROR
    else {
      context.commit("commitLoginStatus", {
        isValid: false,
        message: "Invalid login. Email or password is incorrect.",
      });
    }
  },

  // LOGOUT ------------------------------------------------
  logout(context) {
    context.commit("commitLoggedUserAsEmpty");
  },
};
