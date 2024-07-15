<template>
  <el-container>
    <el-card
      v-loading="isLoading"
      element-loading-text="Loading member data..."
    >
      <el-form
        :model="form"
        :rules="rules"
        label-width="auto"
        label-position="right"
        ref="form"
      >
        <el-form-item label="Name" prop="name">
          <el-input v-model="form.name" type="text" clearable>
            <template #prepend>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="Sex" prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio-button value="Male">
              <el-icon><Male /></el-icon> Male
            </el-radio-button>
            <el-radio-button value="Female">
              <el-icon><Female /></el-icon> Female
            </el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="Birthday" prop="birthday">
          <el-date-picker
            v-model="form.birthday"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="Pick a date"
            style="width: 100%"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="Occupation" prop="occupation">
          <el-input v-model="form.occupation" type="text" clearable>
            <template #prepend>
              <el-icon><SuitcaseLine /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="Phone" prop="phone">
          <el-input v-model="form.phone" type="text" clearable>
            <template #prepend>
              <el-icon><Phone /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email" type="text" clearable>
            <template #prepend>
              <el-icon><Message /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="Interest" prop="interest">
          <el-input v-model="form.interest" type="text" clearable>
            <template #prepend>
              <el-icon><Star /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-container id="buttons">
          <el-form-item id="buttons">
            <el-button
              v-if="mode === 'new'"
              color="#7f4af1"
              @click="submitForm"
              :loading="isOngoingRequest"
            >
              <el-icon><CirclePlusFilled /></el-icon>&nbsp;Add
            </el-button>
            <el-button
              v-else
              color="#7f4af1"
              @click="submitForm"
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

export default {
  data() {
    return {
      id: this.$route.query.id,
      form: {
        id: "",
        name: "",
        sex: "",
        birthday: "",
        occupation: "",
        phone: "",
        email: "",
        interest: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "Name is empty",
            trigger: "blur",
          },
          {
            max: 20,
            message: "Character limit exceeded",
            trigger: "blur",
          },
          {
            pattern: this.$store.getters.nameRegex,
            message: "Katakana or Hiragana characters only",
            trigger: "blur",
          },
        ],
        sex: [
          {
            required: true,
            message: "No sex selected",
            trigger: "blur",
          },
        ],
        birthday: [
          {
            required: true,
            message: "No date selected",
            trigger: "blur",
          },
          {
            validator: this.isDateValid,
            trigger: "blur",
          },
        ],
        occupation: [
          {
            required: true,
            message: "Occupation is empty",
            trigger: "blur",
          },
          {
            max: 40,
            message: "Character limit exceeded",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: "Phone is empty",
            trigger: "blur",
          },
          {
            min: 9,
            message: "Minimum of 9 characters",
            trigger: "blur",
          },
          {
            max: 12,
            message: "Character limit exceeded",
            trigger: "blur",
          },
          {
            pattern: this.$store.getters.phoneRegex,
            message: "Use 0-9 digits only",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "Email is empty",
            trigger: "blur",
          },
          {
            min: 5,
            message: "Minimum of 5 characters",
            trigger: "blur",
          },
          {
            max: 50,
            message: "Character limit exceeded",
            trigger: "blur",
          },
          {
            pattern: this.$store.getters.emailRegex,
            message: "Email is invalid. Use 'xxx@xxx.xx' format",
            trigger: "blur",
          },
        ],
        interest: [
          {
            required: true,
            message: "Interest is empty",
            trigger: "blur",
          },
          {
            max: 30,
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
      return {
        name: this.form.name.trim(),
        sex: this.form.sex,
        birthday: this.form.birthday,
        occupation: this.form.occupation.trim(),
        phone: this.form.phone.trim(),
        email: this.form.email.trim(),
        interest: this.form.interest.trim(),
      };
    },
  },
  methods: {
    async populateForm() {
      if (this.mode === "new") {
        this.clearForm();
      } else {
        await this.$store.dispatch("fetchMember", { id: this.id });
        const member = this.$store.getters.selectedMember;
        // populate
        this.form = {
          id: member.id,
          name: member.name,
          sex: member.sex,
          birthday: member.birthday,
          occupation: member.occupation,
          phone: member.phone,
          email: member.email,
          interest: member.interest,
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
    async submitEdit() {
      const payload = {
        id: this.form.id,
        updatedData: this.parsedFormData,
      };
      await this.$store.dispatch("editMember", payload);
      // check request status
      const status = this.$store.getters.editMemberStatus;
      if (status.isValid) {
        this.showDialogBox(status.message, "success");
        this.clearForm();
        router.push({ name: "members" });
      } else if (!this.$store.getters.isTokenExpired) {
        this.showDialogBox(status.message, "error");
      }
      this.isOngoingRequest = false;
    },
    async submitAdd() {
      const payload = this.parsedFormData;
      await this.$store.dispatch("addMember", payload);
      // check request status
      const status = this.$store.getters.addMemberStatus;
      if (status.isValid) {
        this.showDialogBox(status.message, "success");
        this.clearForm();
        router.push({ name: "members" });
      } else if (!this.$store.getters.isTokenExpired) {
        this.showDialogBox(status.message, "error");
      }
      this.isOngoingRequest = false;
    },
    isDateValid(_, value, callback) {
      const date = new Date(value);
      const currentDate = new Date();
      // check if valid date
      if (isNaN(date)) {
        callback(new Error("Invalid date"));
      }
      // check if future date
      else if (date > currentDate) {
        callback(new Error("Cannot select future dates"));
      } else {
        callback();
      }
    },
    clearForm() {
      this.form = {
        id: "",
        name: "",
        sex: "",
        birthday: "",
        occupation: "",
        phone: "",
        email: "",
        interest: "",
      };
      console.clear();
    },
    handleClickCancel() {
      router.push({ name: "members" });
    },
    showDialogBox(message, type) {
      ElMessage({
        message: message,
        type: type,
        offset: 50,
      });
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
.el-date-picker {
  width: 100%;
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
