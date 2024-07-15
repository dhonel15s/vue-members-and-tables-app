export default {
  setIsTokenExpired(context, payload) {
    context.commit("commitIsTokenExpired", payload);
  },
};
