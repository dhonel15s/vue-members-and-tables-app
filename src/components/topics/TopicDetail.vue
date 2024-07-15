<template>
  <el-card shadow="never" body-style="padding: 0.7rem 1rem">
    <el-row id="title">
      <el-col>
        <el-button class="button-link" link @click="handleClickTopicDetails">
          {{ topic.title }}
        </el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <el-avatar id="owner">
          {{ topic.owner_email.charAt(0).toUpperCase() }}
        </el-avatar>
        <el-text size="large">&nbsp;{{ topic.owner_email }}</el-text>
      </el-col>
    </el-row>

    <el-row justify="end">
      <el-col :span="2" class="icons">
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
          <!-- LIKE BUTTON -->
          <el-button
            size="small"
            circle
            v-if="isLiked"
            @click="handleClickUnlike"
            :disabled="isOngoingRequest"
          >
            <el-icon size="20">
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
          <!-- DISLIKE BUTTON -->
          <el-button
            size="small"
            circle
            v-else
            @click="handleClickLike"
            :disabled="isOngoingRequest"
          >
            <el-icon size="20">
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
        <el-text>&nbsp;{{ topic.likes.length }}</el-text>
      </el-col>

      <el-col :span="2" class="icons">
        <!-- COMMENTS BUTTON -->
        <el-button size="small" circle disabled style="cursor: default">
          <el-icon size="16">
            <svg
              width="64px"
              height="64px"
              viewBox="0 0 32 32"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
              fill="#000000"
              stroke="#000000"
              v-if="topic.comments.length !== 0"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <title>comment 2</title>
                <desc>Created with Sketch Beta.</desc>
                <defs></defs>
                <g
                  id="Page-1"
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                  sketch:type="MSPage"
                >
                  <g
                    id="Icon-Set-Filled"
                    sketch:type="MSLayerGroup"
                    transform="translate(-154.000000, -257.000000)"
                    fill="#a17af5"
                  >
                    <path
                      d="M177,270 L163,270 C162.448,270 162,269.553 162,269 C162,268.448 162.448,268 163,268 L177,268 C177.552,268 178,268.448 178,269 C178,269.553 177.552,270 177,270 L177,270 Z M175,276 L165,276 C164.448,276 164,275.553 164,275 C164,274.447 164.448,274 165,274 L175,274 C175.552,274 176,274.447 176,275 C176,275.553 175.552,276 175,276 L175,276 Z M170,257 C161.164,257 154,263.269 154,271 C154,275.419 156.345,279.354 160,281.919 L160,289 L167.009,284.747 C167.979,284.907 168.977,285 170,285 C178.836,285 186,278.732 186,271 C186,263.269 178.836,257 170,257 L170,257 Z"
                      id="comment-2"
                      sketch:type="MSShapeGroup"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
            <svg
              v-else
              width="64px"
              height="64px"
              viewBox="-3.2 -3.2 38.40 38.40"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
              fill="#a17af5"
              stroke="#a17af5"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <title>comment 2</title>
                <desc>Created with Sketch Beta.</desc>
                <defs></defs>
                <g
                  id="Page-1"
                  stroke-width="1.984"
                  fill="none"
                  fill-rule="evenodd"
                  sketch:type="MSPage"
                >
                  <g
                    id="Icon-Set-Filled"
                    sketch:type="MSLayerGroup"
                    transform="translate(-154.000000, -257.000000)"
                    fill=""
                  >
                    <path
                      d="M177,270 L163,270 C162.448,270 162,269.553 162,269 C162,268.448 162.448,268 163,268 L177,268 C177.552,268 178,268.448 178,269 C178,269.553 177.552,270 177,270 L177,270 Z M175,276 L165,276 C164.448,276 164,275.553 164,275 C164,274.447 164.448,274 165,274 L175,274 C175.552,274 176,274.447 176,275 C176,275.553 175.552,276 175,276 L175,276 Z M170,257 C161.164,257 154,263.269 154,271 C154,275.419 156.345,279.354 160,281.919 L160,289 L167.009,284.747 C167.979,284.907 168.977,285 170,285 C178.836,285 186,278.732 186,271 C186,263.269 178.836,257 170,257 L170,257 Z"
                      id="comment-2"
                      sketch:type="MSShapeGroup"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
          </el-icon>
        </el-button>
        <el-text>&nbsp;{{ topic.comments.length }}</el-text>
      </el-col>

      <el-col :span="2.5" id="timestamp">
        <el-text size="small">{{ topic.timestamp }}</el-text>
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
  },
  methods: {
    handleClickTopicDetails() {
      router.push({
        name: "topics-detail",
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
      this.isOngoingRequest = true;
      const payload = {
        topicId: this.topic.id,
        title: this.topic.title,
      };
      await this.$store.dispatch("unlikeTopic", payload);
      const status = this.$store.getters.unlikeTopicStatus;
      if (status.isValid) {
        this.showDialogBox(status.message, "success");
        this.requestUpdate();
      } else {
        this.showDialogBox(status.message, "error");
      }
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
.el-card {
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
.el-col#timestamp {
  display: flex;
  justify-content: end;
}
.el-button.button-link {
  font-size: 1.2rem;
  color: rgb(95, 94, 94);
}
.el-button.button-link:hover {
  color: #7f4af1;
}
.el-avatar#owner {
  background: #d7c6fb;
  font-size: 1rem;
  font-weight: bold;
}
</style>
