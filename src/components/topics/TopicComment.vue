<template>
  <el-container>
    <el-aside width="50px">
      <el-avatar id="username">{{
        comment.comment_email.charAt(0).toUpperCase()
      }}</el-avatar>
    </el-aside>

    <el-main>
      <el-row>
        <el-col id="upper">
          <el-container>
            <el-main>
              <el-row>
                <el-col>
                  <el-text tag="b" type="primary">
                    {{ comment.comment_email }}
                  </el-text>
                </el-col>

                <el-col>
                  <el-text size="small">{{
                    comment.comment_timestamp
                  }}</el-text>
                </el-col>
              </el-row>
            </el-main>
            <el-aside width="90px" id="delete">
              <el-button
                type="danger"
                size="small"
                v-if="isOwnedByCurrentUser"
                @click="handleClickDelete"
                :loading="isOngoingRequest"
              >
                <el-icon><CircleClose /></el-icon>&nbsp;Delete
              </el-button>
            </el-aside>
          </el-container>
        </el-col>

        <el-col>
          <el-card shadow="never" body-style="padding: 0.75rem">
            <el-text v-html="comment.comment_content"></el-text>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import { ElMessage } from "element-plus";

export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
    topicOwner: {
      type: String,
      required: true,
    },
    topicId: {
      type: String,
      required: true,
    },
  },
  emits: ["data-updated"],
  data() {
    return {
      isOngoingRequest: false,
    };
  },
  computed: {
    isOwnedByCurrentUser() {
      return this.$store.getters.localId === this.topicOwner ? true : false;
    },
  },
  methods: {
    async handleClickDelete() {
      this.isOngoingRequest = true;
      const payload = {
        commentId: this.comment.id,
        topicId: this.topicId,
      };
      await this.$store.dispatch("deleteComment", payload);
      const status = this.$store.getters.deleteCommentStatus;
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
.el-main {
  padding: 0;
}
.el-avatar#username {
  font-size: 1rem;
  background: #c6cdfb;
}
.el-aside#delete {
  display: flex;
  justify-content: end;
  align-items: end;
}
.el-col#upper {
  margin-bottom: 0.5rem;
}
</style>
