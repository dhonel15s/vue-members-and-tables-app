<template>
  <router-view v-slot="{ Component }">
    <transition :name="transitionStyle">
      <div :key="$route.fullPath">
        <component :is="Component"></component>
      </div>
    </transition>
  </router-view>
</template>

<script>
export default {
  data() {
    return {
      transitionStyle: "slide-right",
    };
  },
  watch: {
    $route(to, from) {
      if (to.meta.index > from.meta.index) {
        this.transitionStyle = "slide-left";
      } else {
        this.transitionStyle = "slide-right";
      }
    },
  },
};
</script>

<style scoped>
/* Transitions ---------------*/
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.75s ease-out;
  width: 100%;
}
.slide-left-enter-to,
.slide-left-leave-from {
  position: absolute;
  right: 0;
}
.slide-left-enter-from {
  position: absolute;
  right: -100%;
}
.slide-left-leave-to {
  position: absolute;
  right: 100%;
}
.slide-right-enter-to,
.slide-right-leave-from {
  position: absolute;
  left: 0;
}
.slide-right-enter-from {
  position: absolute;
  left: -100%;
}
.slide-right-leave-to {
  position: absolute;
  left: 100%;
}
</style>
