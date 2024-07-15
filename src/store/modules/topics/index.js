import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

export default {
  state() {
    return {
      // TOPICS -------------------
      topics: [],
      selectedTopic: {
        id: "",
        title: "",
        content: "",
        owner_localId: "",
        owner_email: "",
        timestamp: "",
        likes: [],
        comments: [],
      },
      fetchingTopicStatus: {
        isValid: null,
        message: "",
      },
      deleteTopicStatus: {
        isValid: null,
        message: "",
      },
      addTopicStatus: {
        isValid: null,
        message: "",
      },
      editTopicStatus: {
        isValid: null,
        message: "",
      },
      // LIKES -------------------
      fetchedLikes: [],
      likeTopicStatus: {
        isValid: null,
        message: "",
      },
      unlikeTopicStatus: {
        isValid: null,
        message: "",
      },
      // COMMENTS -------------------
      fetchedComments: [],
      addCommentStatus: {
        isValid: null,
        message: "",
      },
      deleteCommentStatus: {
        isValid: null,
        message: "",
      },
    };
  },
  mutations,
  actions,
  getters,
};
