export default {
  members(state) {
    return state.members.reverse();
  },
  selectedMember(state) {
    return state.selectedMember;
  },
  fetchingMemberStatus(state) {
    return state.fetchingMemberStatus;
  },
  deleteMemberStatus(state) {
    return state.deleteMemberStatus;
  },
  addMemberStatus(state) {
    return state.addMemberStatus;
  },
  editMemberStatus(state) {
    return state.editMemberStatus;
  },
};
