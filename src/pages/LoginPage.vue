<template>
  <el-container id="form">
    <el-card>
      <el-form
        :model="form"
        :rules="rules"
        label-width="auto"
        label-position="right"
        ref="form"
      >
        <el-container class="form-item" style="padding-bottom: 1rem">
          <el-image :src="logo" alt="logo" />
        </el-container>

        <el-form-item label="Email" prop="email">
          <el-input type="email" v-model="form.email" clearable>
            <template #prepend>
              <el-icon><Message /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="Password" prop="password">
          <el-input
            type="password"
            v-model="form.password"
            clearable
            show-password
          >
            <template #prepend>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-container class="form-item buttons">
            <el-button
              round
              color="#7f4af1"
              @click="submitForm"
              v-if="!isLoading"
            >
              <el-icon><UserFilled /></el-icon>&nbsp;LOGIN
            </el-button>
            <el-container v-loading="true" v-else></el-container>
          </el-container>
        </el-form-item>

        <el-container class="form-item">
          <el-text>No account?&nbsp;</el-text>
          <el-link type="primary" :underline="false" href="#/signup">
            signup now.
          </el-link>
        </el-container>
      </el-form>
    </el-card>
  </el-container>
</template>

<script>
import Logo from "@/assets/logo.png";
import router from "@/router";
import { ElMessage } from "element-plus";

export default {
  data() {
    return {
      logo: Logo,
      form: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: "Email is empty",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Password is empty",
            trigger: "blur",
          },
        ],
      },
      isLoading: false,
    };
  },
  methods: {
    async submitForm() {
      // set loading button
      this.isLoading = true;
      await this.$refs.form.validate(async (valid) => {
        // check form validity
        if (valid) {
          const payload = {
            email: this.form.email.trim(),
            password: this.form.password.trim(),
          };
          await this.$store.dispatch("login", payload);
          // check request status
          const status = this.$store.getters.loginStatus;
          if (status.isValid) {
            this.isLoading = false;
            this.showDialogBox(status.message, "success");
            this.clearForm();
            router.push({ name: "home" });
          } else {
            this.isLoading = false;
            this.showDialogBox(status.message, "error");
          }
        } else {
          this.isLoading = false;
          this.showDialogBox("Please fix the form before submit.", "warning");
        }
      });
    },
    clearForm() {
      this.form.email = "";
      this.form.password = "";
      console.clear();
    },
    showDialogBox(message, type) {
      ElMessage({
        message: message,
        type: type,
        offset: 50,
      });
    },
  },
};
</script>
<style scoped>
.el-container#form {
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.el-container.form-item {
  justify-content: center;
  align-items: center;
}
.el-container.buttons {
  height: 40px;
}
.el-card {
  border-radius: 0 3rem 0 3rem;
  padding: 2rem 4rem;
  width: 500px;
}
.el-form {
  align-content: center;
  justify-items: center;
}

.el-image {
  height: 5rem;
  padding: 0.5rem;
}
.el-button {
  min-width: 100px;
}
</style>
