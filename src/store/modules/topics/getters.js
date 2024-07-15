export default {
  // TOPICS -------------------
  topics(state) {
    return state.topics.reverse();
  },
  selectedTopic(state) {
    return state.selectedTopic;
  },
  fetchingTopicStatus(state) {
    return state.fetchingTopicStatus;
  },
  addTopicStatus(state) {
    return state.addTopicStatus;
  },
  editTopicStatus(state) {
    return state.editTopicStatus;
  },

  // LIKES -------------------
  fetchedLikes(state) {
    return state.fetchedLikes;
  },
  likeTopicStatus(state) {
    return state.likeTopicStatus;
  },
  unlikeTopicStatus(state) {
    return state.unlikeTopicStatus;
  },
  // COMMENTS -------------------
  fetchedComments(state) {
    return state.fetchedComments;
  },
  addCommentStatus(state) {
    return state.addCommentStatus;
  },
  deleteCommentStatus(state) {
    return state.deleteCommentStatus;
  },
};
