<template>
  <el-container>
    <el-card>
      <el-form
        :model="form"
        :rules="rules"
        label-width="auto"
        label-position="right"
        ref="form"
        v-loading="isLoading"
        element-loading-text="Loading topic data..."
      >
        <el-form-item label="Title" prop="title">
          <el-input v-model="form.title" type="text" clearable> </el-input>
        </el-form-item>

        <el-form-item label="Content" prop="content">
          <el-input v-model="form.content" type="textarea" rows="5" />
        </el-form-item>

        <el-container id="buttons">
          <el-form-item id="buttons">
            <el-button
              color="#7f4af1"
              @click="submitForm"
              v-if="mode === 'new'"
              :loading="isOngoingRequest"
            >
              <el-icon><CirclePlusFilled /></el-icon>&nbsp;Create
            </el-button>
            <el-button
              color="#7f4af1"
              @click="submitForm"
              v-else
              :loading="isOngoingRequest"
            >
              <el-icon><CircleCheckFilled /></el-icon>&nbsp;Edit
            </el-button>
            <el-button
              color="#7f4af1"
              plain
              @click="handleClickCancel"
              :loading="isOngoingRequest"
            >
              <el-icon><CircleCloseFilled /></el-icon>&nbsp;Cancel
            </el-button>
          </el-form-item>
        </el-container>
      </el-form>
    </el-card>
  </el-container>
</template>

<script>
import router from "@/router";
import { ElMessage } from "element-plus";
import moment from "moment";
export default {
  data() {
    return {
      id: this.$route.query.id,
      form: {
        title: "",
        content: "",
      },
      rules: {
        title: [
          {
            required: true,
            message: "Title is empty",
            trigger: "blur",
          },
          {
            max: 50,
            message: "Character limit exceeded",
            trigger: "blur",
          },
        ],
        content: [
          {
            required: true,
            message: "Content is empty",
            trigger: "blur",
          },
          {
            max: 4000,
            message: "Character limit exceeded",
            trigger: "blur",
          },
        ],
      },
      isLoading: true,
      isOngoingRequest: false,
    };
  },
  computed: {
    mode() {
      return this.$route.query.id === null ? "new" : "edit";
    },
    parsedFormData() {
      const currentTimestamp = `${moment().format("L")} ${moment().format(
        "LT"
      )}`;
      if (this.mode === "new") {
        return {
          title: this.form.title.trim(),
          content: this.form.content.trim(),
          owner_localId: this.$store.getters.localId,
          owner_email: this.$store.getters.email,
          timestamp: currentTimestamp,
          likes: [
            {
              liker_localId: "placeholder",
              liker_email: "placeholder",
            },
          ],
          comments: [
            {
              commenter_localId: "placeholder",
              commenter_email: "placeholder",
              comment_timestamp: "placeholder",
              comment_content: "placeholder",
            },
          ],
        };
      } else {
        return {
          id: this.id,
          updatedData: {
            title: this.form.title.trim(),
            content: this.form.content.trim(),
            timestamp: currentTimestamp,
          },
        };
      }
    },
  },
  methods: {
    async populateForm() {
      if (this.mode === "new") {
        this.clearForm();
      } else {
        await this.$store.dispatch("fetchTopic", { id: this.id });
        const topic = this.$store.getters.selectedTopic;
        // populate
        this.form = {
          title: topic.title,
          content: topic.content,
        };
      }
      // disable loading
      this.isLoading = false;
    },
    submitForm() {
      this.isOngoingRequest = true;
      this.$refs.form.validate((valid) => {
        // check form validity
        if (valid) {
          if (this.mode === "new") {
            this.submitAdd();
          } else {
            this.submitEdit();
          }
        } else {
          this.isOngoingRequest = false;
          this.showDialogBox("Please fix the form before submit.", "warning");
        }
      });
    },
    async submitAdd() {
      const payload = this.parsedFormData;
      await this.$store.dispatch("addTopic", payload);
      // check request status
      const status = this.$store.getters.addTopicStatus;
      if (status.isValid) {
        this.showDialogBox(status.message, "success");
        this.clearForm();
        router.push({ name: "topics" });
      } else if (!this.$store.getters.isTokenExpired) {
        this.showDialogBox(status.message, "error");
      }
      this.isOngoingRequest = false;
    },
    async submitEdit() {
      const payload = this.parsedFormData;
      await this.$store.dispatch("editTopic", payload);
      // check request status
      const status = this.$store.getters.editTopicStatus;
      if (status.isValid) {
        this.showDialogBox(status.message, "success");
        this.clearForm();
        router.push({
          name: "topics-detail",
          query: { id: this.id },
        });
      } else if (!this.$store.getters.isTokenExpired) {
        this.showDialogBox(status.message, "error");
      }
      this.isOngoingRequest = false;
    },
    clearForm() {
      this.form = {
        title: "",
        content: "",
      };
      console.clear();
    },
    showDialogBox(message, type) {
      ElMessage({
        message: message,
        type: type,
        offset: 50,
      });
    },
    handleClickCancel() {
      if (this.mode === "new") {
        router.push({ name: "topics" });
      } else {
        router.push({
          name: "topics-detail",
          query: { id: this.id },
        });
      }
    },
  },
  async created() {
    await this.populateForm();
  },
};
</script>

<style scoped>
.el-container {
  justify-content: center;
  align-items: start;
  padding: 1rem 0;
}
.el-container#buttons {
  justify-content: end;
}
.el-card {
  display: flex;
  justify-content: center;
}
.el-form {
  width: 500px;
}
.el-form-item#buttons {
  margin: 0;
}

@media (width <= 1500px) {
  .el-card {
    padding: 1rem 0;
    min-width: 80vw;
    max-width: 90vw;
  }
}

@media (width >= 1501px) {
  .el-card {
    padding: 3rem 0;
    min-width: 50vw;
    max-width: 90vw;
  }
}
</style>
