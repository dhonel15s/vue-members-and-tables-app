export default {
  commitMembersList(state, payload) {
    state.members = [];
    for (const id in payload) {
      state.members.push({
        id: id,
        name: payload[id].name,
        sex: payload[id].sex,
        birthday: payload[id].birthday,
        occupation: payload[id].occupation,
        phone: payload[id].phone,
        email: payload[id].email,
        interest: payload[id].interest,
      });
    }
  },
  commitSelectedMember(state, payload) {
    state.selectedMember = {
      id: payload.id,
      name: payload.name,
      sex: payload.sex,
      birthday: payload.birthday,
      occupation: payload.occupation,
      phone: payload.phone,
      email: payload.email,
      interest: payload.interest,
    };
  },
  commitFetchingMemberStatus(state, payload) {
    state.fetchingMemberStatus.isValid = payload.isValid;
    state.fetchingMemberStatus.message = payload.message;
  },
  commitDeleteMemberStatus(state, payload) {
    state.deleteMemberStatus.isValid = payload.isValid;
    state.deleteMemberStatus.message = payload.message;
  },

  commitAddMemberStatus(state, payload) {
    state.addMemberStatus.isValid = payload.isValid;
    state.addMemberStatus.message = payload.message;
  },

  commitEditMemberStatus(state, payload) {
    state.editMemberStatus.isValid = payload.isValid;
    state.editMemberStatus.message = payload.message;
  },
};
