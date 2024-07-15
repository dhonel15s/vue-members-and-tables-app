export default {
  // FETCH ALL MEMBERS ---------------------------------------------------------------
  async fetchMembers(context) {
    const url =
      context.getters.urls.firebase +
      "members.json?auth=" +
      context.getters.token;

    const response = await fetch(url);
    const responseData = await response.json();
    // If request is SUCCESS
    if (response.ok) {
      context.commit("commitMembersList", responseData);
    }
    // If request is ERROR
    else {
      if (response.status === 401) {
        context.dispatch("setIsTokenExpired", true);
      }
    }
  },

  // FETCH 1 MEMBER ---------------------------------------------------------------
  async fetchMember(context, payload) {
    const url =
      context.getters.urls.firebase +
      `members/${payload.id}.json?auth=` +
      context.getters.token;

    const response = await fetch(url);
    const responseData = await response.json();
    // If request is SUCCESS
    if (response.ok) {
      context.commit("commitSelectedMember", {
        id: payload.id,
        name: responseData.name,
        sex: responseData.sex,
        birthday: responseData.birthday,
        occupation: responseData.occupation,
        phone: responseData.phone,
        email: responseData.email,
        interest: responseData.interest,
      });
    }
    // If request is ERROR
    else {
      if (response.status === 401) {
        context.dispatch("setIsTokenExpired", true);
      } else {
        context.commit("commitFetchingMemberStatus", {
          isValid: false,
          message: "Failed to fetch member. Redirecting to Members Page.",
        });
      }
    }
  },

  // DELETE MEMBER ---------------------------------------------------------------
  async deleteMember(context, payload) {
    const url =
      context.getters.urls.firebase +
      "members/" +
      payload.id +
      ".json?auth=" +
      context.getters.token;

    const response = await fetch(url, {
      method: "DELETE",
    });
    // If request is SUCCESS
    if (response.ok) {
      context.commit("commitDeleteMemberStatus", {
        isValid: true,
        message: `${payload.name} was deleted successfully.`,
      });
    }
    // If request is ERROR
    else {
      if (response.status === 401) {
        context.dispatch("setIsTokenExpired", true);
      } else {
        context.commit("commitDeleteMemberStatus", {
          isValid: false,
          message: `Failed to delete ${payload.name}.`,
        });
      }
    }
  },

  // ADD MEMBER ---------------------------------------------------------------
  async addMember(context, payload) {
    const url =
      context.getters.urls.firebase +
      "/members.json?auth=" +
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
      context.commit("commitAddMemberStatus", {
        isValid: true,
        message: `${payload.name} was successfully added.`,
      });
    }
    // If request is ERROR
    else {
      if (response.status === 401) {
        context.dispatch("setIsTokenExpired", true);
      } else {
        context.commit("commitAddMemberStatus", {
          isValid: false,
          message: `Failed to add ${payload.name}.`,
        });
      }
    }
  },

  // EDIT MEMBER ---------------------------------------------------------------
  async editMember(context, payload) {
    const url =
      context.getters.urls.firebase +
      "members/" +
      payload.id +
      ".json?auth=" +
      context.getters.token;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload.updatedData),
    });
    // If request is SUCCESS
    if (response.ok) {
      context.commit("commitEditMemberStatus", {
        isValid: true,
        message: `${payload.updatedData.name} was successfully edited.`,
      });
    }
    // If request is ERROR
    else {
      if (response.status === 401) {
        context.dispatch("setIsTokenExpired", true);
      } else {
        context.commit("commitEditMemberStatus", {
          isValid: false,
          message: `Failed to edit ${payload.updatedData.name}.`,
        });
      }
    }
  },
};
