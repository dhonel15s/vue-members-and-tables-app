import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

export default {
  state() {
    return {
      members: [],
      selectedMember: {
        id: "",
        name: "",
        sex: "",
        birthday: "",
        occupation: "",
        phone: "",
        email: "",
        interest: "",
      },
      fetchingMemberStatus: {
        isValid: null,
        message: "",
      },
      deleteMemberStatus: {
        isValid: null,
        message: "",
      },
      addMemberStatus: {
        isValid: null,
        message: "",
      },
      editMemberStatus: {
        isValid: null,
        message: "",
      },
    };
  },
  mutations,
  actions,
  getters,
};
