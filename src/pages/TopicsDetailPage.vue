<template>
  <el-container id="main">
    <el-card
      id="card"
      body-style="height: 400px"
      v-loading="isLoading"
      element-loading-text="Loading topic data..."
    >
      <!-- Details -->
      <template #header>
        <el-container>
          <el-button color="#7f4af1" @click="handleClickBack">
            <el-icon><ArrowLeftBold /></el-icon>&nbsp;Back
          </el-button>
        </el-container>
        <el-container>
          <topic-detailv2
            style="width: 100%"
            :topic="topic"
            @data-updated="fetchTopic"
          ></topic-detailv2>
        </el-container>
      </template>

      <!-- Comments -->

      <el-text type="primary" tag="b" id="divider">Comments</el-text>

      <el-scrollbar>
        <el-empty
          v-if="topic.comments.length === 0"
          description="No items to display."
        />
        <el-card
          id="comment"
          shadow="never"
          v-for="comment in reversedComments"
          :key="comment"
          v-else
        >
          <topic-comment
            :comment="comment"
            :topic-owner="topic.owner_localId"
            :topic-id="topic.id"
            @data-updated="fetchTopic"
          ></topic-comment>
        </el-card>
      </el-scrollbar>

      <!-- Comment Box -->
      <template #footer>
        <el-container id="comment-box">
          <el-form :model="commentForm" :rules="commentRules" ref="form">
            <el-form-item prop="comment">
              <el-input
                :rows="3"
                type="textarea"
                placeholder="Type your comment here"
                v-model="commentForm.comment"
              />
            </el-form-item>
            <el-form-item>
              <el-container id="sendcomment">
                <el-button
                  color="#7f4af1"
                  @click="validateComment"
                  :loading="isOngoingRequest"
                >
                  <el-icon><Promotion /></el-icon>&nbsp;Send
                </el-button>
              </el-container>
            </el-form-item>
          </el-form>
        </el-container>
      </template>
    </el-card>
  </el-container>
</template>

<script>
import TopicDetailv2 from "@/components/topics/TopicDetailv2.vue";
import TopicComment from "@/components/topics/TopicComment.vue";
import router from "@/router";
import moment from "moment";
import { ElMessage } from "element-plus";

export default {
  components: {
    TopicDetailv2,
    TopicComment,
  },
  data() {
    return {
      id: this.$route.query.id,
      topic: {
        id: "",
        title: "",
        content: "",
        owner_localId: "",
        owner_email: "",
        timestamp: "2024-06-19",
        likes: [],
        comments: [],
      },
      commentForm: {
        comment: "",
      },
      commentRules: {
        comment: [
          {
            required: true,
            message: "Comment is empty",
            trigger: "blur",
          },
        ],
      },
      isLoading: true,
      isOngoingRequest: false,
    };
  },
  computed: {
    reversedComments() {
      let comments = this.topic.comments;
      return comments.reverse();
    },
  },
  methods: {
    async fetchTopic() {
      await this.$store.dispatch("fetchTopic", { id: this.id });
      const fetchedTopic = this.$store.getters.selectedTopic;
      this.topic = {
        id: fetchedTopic.id,
        title: fetchedTopic.title,
        content: fetchedTopic.content,
        owner_localId: fetchedTopic.owner_localId,
        owner_email: fetchedTopic.owner_email,
        timestamp: fetchedTopic.timestamp,
        likes: fetchedTopic.likes,
        comments: fetchedTopic.comments,
      };
      // disable loading
      this.isLoading = false;
    },
    handleClickBack() {
      router.push({ name: "topics" });
    },
    validateComment() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.handleClickSendComment();
          console.clear();
        }
      });
    },
    async handleClickSendComment() {
      this.isOngoingRequest = true;
      const currentTimestamp = `${moment().format("L")} ${moment().format(
        "LT"
      )}`;
      const payload = {
        id: this.topic.id,
        newData: {
          comment_content: this.commentForm.comment.trim(),
          comment_timestamp: currentTimestamp,
          comment_email: this.$store.getters.email,
          comment_localId: this.$store.getters.localId,
        },
      };
      await this.$store.dispatch("addComment", payload);
      const status = this.$store.getters.addCommentStatus;
      if (status.isValid) {
        this.showDialogBox(status.message, "success");
        this.fetchTopic();
        this.commentForm.comment = "";
      } else {
        this.showDialogBox("Failed to add comment", "error");
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
  },
  created() {
    this.fetchTopic();
  },
};
</script>

<style scoped>
.el-container#main {
  justify-content: center;
  align-items: start;
  padding: 1rem 0;
}
.el-card#card {
  width: 80%;
  height: 100%;
}
.el-form {
  width: 100%;
}
.el-form-item {
  margin: 0;
  text-align: end;
  align-content: end;
  align-self: flex-end;
}
.el-card#comment {
  background: #f9f9fc;
  margin: 0.5rem 0;
}
.el-container#sendcomment {
  width: 100%;
  justify-content: end;
}
.el-container#sendcomment > .el-button {
  width: 80px;
  margin-top: 0.5rem;
}
.el-text#divider {
  padding-bottom: 0.5rem;
}
</style>
