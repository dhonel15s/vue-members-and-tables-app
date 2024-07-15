<template>
  <router-view v-slot="slotProps">
    <transition :name="transitionStyle" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
export default {
  data() {
    return {
      transitionStyle: "fade-scale",
    };
  },
  watch: {
    async $route(to, from) {
      // set transition style
      if (
        (to.path === "/login" || to.path === "/signup") &&
        (from.path === "/login" || from.path === "/signup")
      ) {
        this.transitionStyle = "fade-scale";
      } else {
        this.transitionStyle = "fade";
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap");
:root {
  --el-color-primary: #7f4af1;
  --el-color-primary-light-3: #a17af5;
  --el-color-primary-light-5: #bca0f8;
  --el-color-primary-light-7: #c9b3f9;
  --el-color-primary-light-8: #d7c6fb;
  --el-color-primary-light-9: #f2ecfe;
  --el-color-primary-dark: #150439;

  --bg-gradient: linear-gradient(
    109.6deg,
    rgba(119, 44, 232, 0.68) 11.5%,
    rgb(119, 44, 232) 91.2%
  );
  --el-font-family: "Inter", sans-serif;
}
* {
  font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
  margin: 0;
  padding: 0;
}

body {
  background: var(--bg-gradient);
}

/* Transition */
/* Fade+Scale */
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0.5;
  transform: scale(0.95);
}
.fade-scale-leave-from,
.fade-scale-enter-to {
  opacity: 1;
  transform: scale(1);
}
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s linear;
}

/* Fade */
.fade-enter-from,
.fade-leave-to {
  opacity: 0.5;
}
.fade-leave-from,
.fade-enter-to {
  opacity: 1;
}
.fade-enter-active.fade-leave-active {
  transition: all 0.1s linear;
}
</style>
