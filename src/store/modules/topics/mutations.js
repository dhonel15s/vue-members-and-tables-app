export default {
  // TOPICS -------------------
  commitTopicsList(state, payload) {
    state.topics = [];
    for (const id in payload) {
      let topic = {
        id: id,
        title: payload[id].title,
        content: payload[id].content,
        owner_localId: payload[id].owner_localId,
        owner_email: payload[id].owner_email,
        timestamp: payload[id].timestamp,
        likes: [],
        comments: [],
      };
      // add likes
      for (let ids in payload[id].likes) {
        if (ids != 0) {
          topic.likes.push(payload[id].likes[ids]);
        }
      }
      // add comments
      for (let ids in payload[id].comments) {
        if (ids != 0) {
          let newObject = {
            id: ids,
            comment_content: payload[id].comments[ids].comment_content,
            comment_email: payload[id].comments[ids].comment_email,
            comment_localId: payload[id].comments[ids].comment_localId,
            comment_timestamp: payload[id].comments[ids].comment_timestamp,
          };
          topic.comments.push(newObject);
        }
      }
      state.topics.push(topic);
    }
  },
  commitSelectedTopic(state, payload) {
    let topic = {
      id: payload.id,
      title: payload.data.title,
      content: payload.data.content,
      owner_localId: payload.data.owner_localId,
      owner_email: payload.data.owner_email,
      timestamp: payload.data.timestamp,
      likes: [],
      comments: [],
    };
    // add likes
    for (let ids in payload.data.likes) {
      if (ids != 0) {
        topic.likes.push(payload.data.likes[ids]);
      }
    }
    // add comments
    for (let ids in payload.data.comments) {
      if (ids != 0) {
        let newObject = {
          id: ids,
          comment_content: payload.data.comments[ids].comment_content,
          comment_email: payload.data.comments[ids].comment_email,
          comment_localId: payload.data.comments[ids].comment_localId,
          comment_timestamp: payload.data.comments[ids].comment_timestamp,
        };
        topic.comments.push(newObject);
      }
    }
    state.selectedTopic = topic;
  },
  commitAddTopicStatus(state, payload) {
    state.addTopicStatus = {
      isValid: payload.isValid,
      message: payload.message,
    };
  },
  commitEditTopicStatus(state, payload) {
    state.editTopicStatus = {
      isValid: payload.isValid,
      message: payload.message,
    };
  },
  // LIKES -------------------
  commitFetchedLikes(state, payload) {
    let likes = [];
    for (let id in payload) {
      likes.push({
        likesId: id,
        liker_localId: payload[id].liker_localId,
        liker_email: payload[id].liker_email,
      });
    }

    state.fetchedLikes = likes;
  },
  commitLikeTopicStatus(state, payload) {
    state.likeTopicStatus = {
      isValid: payload.isValid,
      message: payload.message,
    };
  },
  commitUnlikeTopicStatus(state, payload) {
    state.unlikeTopicStatus = {
      isValid: payload.isValid,
      message: payload.message,
    };
  },
  // COMMENTS -------------------
  commitFetchedComments(state, payload) {
    let comments = [];
    for (let id in payload) {
      comments.push({
        commentId: id,
        comment_content: payload[id].comment_content,
        comment_timestamp: payload[id].comment_timestamp,
        comment_email: payload[id].comment_email,
        comment_localId: payload[id].comment_localId,
      });
    }
    state.fetchedComments = comments;
  },
  commitAddCommentStatus(state, payload) {
    state.addCommentStatus = {
      isValid: payload.isValid,
      message: payload.message,
    };
  },
  commitDeleteCommentStatus(state, payload) {
    state.deleteCommentStatus = {
      isValid: payload.isValid,
      message: payload.message,
    };
  },
};
