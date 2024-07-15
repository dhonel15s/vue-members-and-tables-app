<template>
  <el-card shadow="never" body-style="padding: 0.7rem 1rem" id="main">
    <!-- Title -->
    <el-row id="title">
      <el-col>
        <el-text id="title" type="primary" tag="b">{{ topic.title }}</el-text>
      </el-col>
    </el-row>

    <!-- Owner + Timestamp-->
    <el-row align="middle">
      <el-col :span="21">
        <el-container>
          <el-aside width="50px">
            <el-avatar id="owner">
              {{ topic.owner_email.charAt(0).toUpperCase() }}
            </el-avatar>
          </el-aside>

          <el-main>
            <el-row>
              <el-col>
                <el-text size="large">{{ topic.owner_email }}</el-text>
              </el-col>
              <el-col>
                <el-text size="small">{{ topic.timestamp }}</el-text>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
      </el-col>

      <el-col :span="3">
        <el-container id="header-right">
          <el-button
            color="dodgerblue"
            @click="handleClickEditTopic"
            v-if="isOwnedByCurrentUser"
          >
            <el-icon><Edit /></el-icon>&nbsp;Edit
          </el-button>
          <el-tooltip effect="light" placement="right">
            <template #content>
              <el-container
                v-if="topic.likes.length !== 0"
                style="flex-direction: column; justify-content: start"
              >
                <el-text
                  size="small"
                  v-for="like in topic.likes"
                  :key="like.likesId"
                >
                  {{ like.liker_email }}
                </el-text>
              </el-container>

              <el-text size="small" v-else>no likes yet.</el-text>
            </template>
            <!-- UNLIKE BUTTON -->
            <el-button
              circle
              v-if="isLiked"
              @click="handleClickUnlike"
              :disabled="isOngoingRequest"
            >
              <el-icon size="25">
                <svg
                  width="64px"
                  height="64px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
                      fill="#a17af5"
                    ></path>
                  </g>
                </svg>
              </el-icon>
            </el-button>
            <!-- LIKE BUTTON -->
            <el-button
              circle
              v-else
              @click="handleClickLike"
              :disabled="isOngoingRequest"
            >
              <el-icon size="25">
                <svg
                  width="64px"
                  height="64px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#a17af5"
                  stroke-width="1.3679999999999999"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
                      fill="#fff"
                    ></path>
                  </g>
                </svg>
              </el-icon>
            </el-button>
          </el-tooltip>
          <el-text>{{ topic.likes.length }}</el-text>
        </el-container>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <el-card shadow="never" id="content">
          <el-text v-html="topic.content" id="content"></el-text>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
import router from "@/router";
import { ElMessage } from "element-plus";
export default {
  props: {
    topic: {
      required: true,
      type: Object,
    },
  },
  emits: ["data-updated"],
  data() {
    return {
      isOngoingRequest: false,
    };
  },
  computed: {
    isLiked() {
      const loggedUserLocalId = this.$store.getters.localId;
      let result = false;
      this.topic.likes.forEach((like) => {
        if (like.liker_localId === loggedUserLocalId) {
          result = true;
        }
      });
      return result;
    },
    isOwnedByCurrentUser() {
      return this.$store.getters.localId === this.topic.owner_localId
        ? true
        : false;
    },
  },
  methods: {
    handleClickEditTopic() {
      router.push({
        name: "topic-edit",
        query: { id: this.topic.id },
      });
    },
    async handleClickLike() {
      this.isOngoingRequest = true;
      const payload = {
        id: this.topic.id,
        title: this.topic.title,
        newData: {
          liker_localId: this.$store.getters.localId,
          liker_email: this.$store.getters.email,
        },
      };
      await this.$store.dispatch("likeTopic", payload);
      const status = this.$store.getters.likeTopicStatus;
      if (status.isValid) {
        this.showDialogBox(status.message, "success");
        this.requestUpdate();
      } else {
        this.showDialogBox(status.message, "error");
      }
      this.isOngoingRequest = false;
    },
    async handleClickUnlike() {
      this.isOngoingRequest = true;
      const payload = {
        topicId: this.topic.id,
        title: this.topic.title,
      };
      await this.$store.dispatch("unlikeTopic", payload);
      const status = this.$store.getters.unlikeTopicStatus;
      if (status.isValid) {
        this.showDialogBox(status.message, "success");
      } else {
        this.showDialogBox(status.message, "error");
      }
      this.requestUpdate();
      this.isOngoingRequest = false;
    },
    showDialogBox(message, type) {
      ElMessage({
        message: message,
        type: type,
        offset: 50,
      });
    },
    requestUpdate() {
      this.$emit("data-updated");
    },
  },
};
</script>

<style scoped>
.el-main {
  padding: 0;
}
.el-card#main {
  background: #f9f9fc;
  margin: 0.5rem 0;
}
.el-row#title {
  margin-bottom: 0.5rem;
}
.el-col.icons {
  display: flex;
  align-items: center;
  justify-content: start;
}
.el-text#title {
  font-size: 1.25rem;
}
.el-avatar#owner {
  font-size: 1rem;
  font-weight: bold;
  background: #d7c6fb;
}
.el-container#header-right {
  justify-content: end;
}
.el-container#header-right > .el-button {
  margin: 0 1rem;
}
.el-card#content {
  margin-top: 1rem;
}

.el-text#content {
  white-space: pre-wrap;
}
</style>
