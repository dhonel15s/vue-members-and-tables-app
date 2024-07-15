<template>
  <el-container>
    <el-header>
      <the-header></the-header>
    </el-header>

    <el-main>
      <el-scrollbar>
        <the-main></the-main>
      </el-scrollbar>
    </el-main>

    <el-footer>
      <the-footer></the-footer>
    </el-footer>
  </el-container>
</template>

<script>
import TheHeader from "@/components/layout/TheHeader.vue";
import TheMain from "@/components/layout/TheMain.vue";
import TheFooter from "@/components/layout/TheFooter.vue";
import { ElMessage } from "element-plus";
import router from "@/router";

export default {
  components: {
    TheHeader,
    TheMain,
    TheFooter,
  },
  watch: {
    "$store.getters.isTokenExpired"(value) {
      if (value === true) {
        this.$store.dispatch("logout");
        router.replace({ name: "login" });
        ElMessage({
          message: "Invalid or expired token. You need to login first.",
          type: "warning",
          offset: 50,
        });
      }
    },
  },
};
</script>

<style scoped>
.el-header {
  width: 100vw;
  position: fixed;
  top: 0;
  padding: 0;
}
.el-main {
  margin-top: 60px;
  margin-bottom: 50px;
  height: calc(100vh - 110px);
  padding: 0;
}
.el-footer {
  width: 100vw;
  height: 50px;
  position: fixed;
  bottom: 0;
  padding: 0;
  background-color: #f9f9fc;
  display: flex;
  justify-content: center;
}
</style>
