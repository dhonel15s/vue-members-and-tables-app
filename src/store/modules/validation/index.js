import getters from "./getters";

export default {
  state() {
    return {
      regex: {
        name: new RegExp(/^[ぁ-ゔァ-ヴー]+$/u),
        phone: new RegExp(/^[0-9]+$/),
        email: new RegExp(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
        password: new RegExp(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[a-zA-Z0-9!#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{6,20}$/
        ),
      },
    };
  },
  getters,
};
