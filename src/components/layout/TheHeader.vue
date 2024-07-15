<template>
  <el-menu
    :default-active="defaultIndex"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-image :src="logo" alt="logo" />

    <el-menu-item index="/home">
      <el-icon><HomeFilled /></el-icon>Home
    </el-menu-item>
    <el-menu-item index="/members">
      <el-icon><Management /></el-icon>Members
    </el-menu-item>
    <el-menu-item index="/topics">
      <el-icon><Comment /></el-icon>Topics
    </el-menu-item>

    <div class="flex-grow"></div>

    <el-sub-menu index="/logout">
      <template #title>
        <el-icon><UserFilled /></el-icon>{{ username }}
      </template>
      <el-menu-item index="/logout" @click="handleClickLogout">
        <el-icon><Back /></el-icon>Logout
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script>
import Logo from "@/assets/logo.png";
import router from "@/router";
export default {
  data() {
    return {
      logo: Logo,
    };
  },
  watch: {
    $route(to) {
      this.handleSelect(to.fullPath);
    },
  },
  computed: {
    username() {
      return this.$store.getters.email;
    },
    defaultIndex() {
      let route = this.$route.fullPath;
      if (route.includes("home")) {
        route = "/home";
      }
      if (route.includes("member")) {
        route = "/members";
      }
      if (route.includes("topic")) {
        route = "/topics";
      }
      return route;
    },
  },
  methods: {
    handleSelect(key) {
      router.push(key);
    },
    handleClickLogout() {
      this.$store.dispatch("logout");
      router.push({ name: "login" });
    },
  },
};
</script>

<style scoped>
:deep(.el-menu-item.is-active) {
  background-color: none;
}

:deep(.el-menu-item:hover) {
  background-color: none;
}
.el-menu {
  background: #f9f9fc;
}
.flex-grow {
  flex-grow: 1;
}
.el-image {
  height: 75%;
  padding: 0.5rem;
}
</style>
