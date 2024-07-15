import { ElMessage } from "element-plus";
export default {
  // FETCH ALL TOPICS ---------------------------------------------------------------
  async fetchTopics(context) {
    const url =
      context.getters.urls.firebase +
      "topics.json?auth=" +
      context.getters.token;

    const response = await fetch(url);
    const responseData = await response.json();
    // If request is SUCCESS
    if (response.ok) {
      context.commit("commitTopicsList", responseData);
    }
    // If request is ERROR
    else {
      if (response.status === 401) {
        context.dispatch("setIsTokenExpired", true);
      }
    }
  },

  // FETCH 1 TOPIC ---------------------------------------------------------------
  async fetchTopic(context, payload) {
    const url =
      context.getters.urls.firebase +
      `topics/${payload.id}.json?auth=` +
      context.getters.token;

    const response = await fetch(url);
    const responseData = await response.json();
    // If request is SUCCESS
    if (response.ok) {
      context.commit("commitSelectedTopic", {
        id: payload.id,
        data: responseData,
      });
    }
    // If request is ERROR
    else {
      if (response.status === 401) {
        context.dispatch("setIsTokenExpired", true);
      } else {
        context.commit("commitFetchingTopicStatus", {
          isValid: false,
          message: "Failed to fetch topic. Redirecting to Topics Page.",
        });
      }
    }
  },

  // ADD TOPIC ---------------------------------------------------------------
  async addTopic(context, payload) {
    const url =
      context.getters.urls.firebase +
      "/topics.json?auth=" +
      context.getters.token;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    // If request is SUCCESS
    if (response.ok) {
      context.commit("commitAddTopicStatus", {
        isValid: true,
        message: `Topic was successfully added.`,
      });
    }
    // If request is ERROR
    else {
      if (response.status === 401) {
        context.dispatch("setIsTokenExpired", true);
      } else {
        context.commit("commitAddTopicStatus", {
          isValid: false,
          message: `Failed to add topic.`,
        });
      }
    }
  },

  // EDIT TOPIC ---------------------------------------------------------------
  async editTopic(context, payload) {
    const url =
      context.getters.urls.firebase +
      "topics/" +
      payload.id +
      ".json?auth=" +
      context.getters.token;

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload.updatedData),
    });
    // If request is SUCCESS
    if (response.ok) {
      context.commit("commitEditTopicStatus", {
        isValid: true,
        message: `Changes was sucessfully saved.`,
      });
    }
    // If request is ERROR
    else {
      if (response.status === 401) {
        context.dispatch("setIsTokenExpired", true);
      } else {
        context.commit("commitEditTopicStatus", {
          isValid: false,
          message: `Failed to save changes.`,
        });
      }
    }
  },

  // LIKE TOPIC ---------------------------------------------------------------
  async likeTopic(context, payload) {
    let isAlreadyLiked = false;
    let loggedUser = context.getters.localId;

    await context.dispatch("fetchLikes", { id: payload.id });
    let likes = context.getters.fetchedLikes;

    likes.forEach((like) => {
      if (like.liker_localId === loggedUser) {
        isAlreadyLiked = true;
      }
    });

    const url =
      context.getters.urls.firebase +
      "topics/" +
      payload.id +
      "/likes.json?auth=" +
      context.getters.token;

    if (!isAlreadyLiked) {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload.newData),
      });
      // If request is SUCCESS
      if (response.ok) {
        context.commit("commitLikeTopicStatus", {
          isValid: true,
          message: `You liked '${payload.title}'`,
        });
      }
      // If request is ERROR
      else {
        if (response.status === 401) {
          context.dispatch("setIsTokenExpired", true);
        } else {
          context.commit("commitLikeTopicStatus", {
            isValid: false,
            message: `Failed to like '${payload.title}'`,
          });
        }
      }
    } else {
      context.commit("commitLikeTopicStatus", {
        isValid: false,
        message: `You already liked this topic.`,
      });
    }
  },
  // UNLIKE TOPIC ---------------------------------------------------------------
  async unlikeTopic(context, payload) {
    let loggedUser = context.getters.localId;
    let targetLikeId = null;

    await context.dispatch("fetchLikes", { id: payload.topicId });
    let likes = context.getters.fetchedLikes;

    likes.forEach((like) => {
      if (like.liker_localId === loggedUser) {
        targetLikeId = like.likesId;
      }
    });

    const url =
      context.getters.urls.firebase +
      "topics/" +
      payload.topicId +
      "/likes/" +
      targetLikeId +
      ".json?auth=" +
      context.getters.token;
    if (targetLikeId !== null) {
      const response = await fetch(url, {
        method: "DELETE",
      });
      // If request is SUCCESS
      if (response.ok) {
        context.commit("commitUnlikeTopicStatus", {
          isValid: true,
          message: `You unliked '${payload.title}'`,
        });
      }
      // If request is ERROR
      else {
        if (response.status === 401) {
          context.dispatch("setIsTokenExpired", true);
        } else {
          context.commit("commitUnlikeTopicStatus", {
            isValid: false,
            message: `Failed to unlike '${payload.title}'`,
          });
        }
      }
    } else {
      context.commit("commitUnlikeTopicStatus", {
        isValid: false,
        message: `You already unliked this topic.`,
      });
    }
  },

  // FETCH LIKES ---------------------------------------------------------------
  async fetchLikes(context, payload) {
    const url =
      context.getters.urls.firebase +
      "topics/" +
      payload.id +
      "/likes.json?auth=" +
      context.getters.token;

    const response = await fetch(url);
    const responseData = await response.json();
    // If request is SUCCESS
    if (response.ok) {
      context.commit("commitFetchedLikes", responseData);
    }
    // If request is ERROR
    else {
      if (response.status === 401) {
        context.dispatch("setIsTokenExpired", true);
      } else {
        ElMessage({
          message: "Failed to fetch likes.",
          type: "warning",
          offset: 50,
        });
      }
    }
  },

  // FETCH COMMENTS ---------------------------------------------------------------
  async fetchComments(context, payload) {
    const url =
      context.getters.urls.firebase +
      "topics/" +
      payload.id +
      "/comments.json?auth=" +
      context.getters.token;

    const response = await fetch(url);
    const responseData = await response.json();
    // If request is SUCCESS
    if (response.ok) {
      context.commit("commitFetchedComments", responseData);
    }
    // If request is ERROR
    else {
      if (response.status === 401) {
        context.dispatch("setIsTokenExpired", true);
      } else {
        ElMessage({
          message: "Failed to fetch comments.",
          type: "warning",
          offset: 50,
        });
      }
    }
  },

  // ADD COMMENT ---------------------------------------------------------------
  async addComment(context, payload) {
    const url =
      context.getters.urls.firebase +
      "topics/" +
      payload.id +
      "/comments.json?auth=" +
      context.getters.token;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload.newData),
    });
    // If request is SUCCESS
    if (response.ok) {
      context.commit("commitAddCommentStatus", {
        isValid: true,
        message: `Comment added successfully.`,
      });
    }
    // If request is ERROR
    else {
      if (response.status === 401) {
        context.dispatch("setIsTokenExpired", true);
      } else {
        context.commit("commitAddCommentStatus", {
          isValid: false,
          message: `Failed to add comment.`,
        });
      }
    }
  },
  // DELETE COMMENT ---------------------------------------------------------------
  async deleteComment(context, payload) {
    const url =
      context.getters.urls.firebase +
      "topics/" +
      payload.topicId +
      "/comments/" +
      payload.commentId +
      ".json?auth=" +
      context.getters.token;
    const response = await fetch(url, {
      method: "DELETE",
    });
    // If request is SUCCESS
    if (response.ok) {
      context.commit("commitDeleteCommentStatus", {
        isValid: true,
        message: `Comment deleted.`,
      });
    }
    // If request is ERROR
    else {
      if (response.status === 401) {
        context.dispatch("setIsTokenExpired", true);
      } else {
        context.commit("commitDeleteCommentStatus", {
          isValid: false,
          message: `Failed to delete comment.`,
        });
      }
    }
  },
};
