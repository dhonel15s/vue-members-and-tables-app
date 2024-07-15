<template>
  <el-container
    id="topics-list"
    v-loading="isLoading"
    element-loading-text="Loading topics..."
  >
    <!-- IF EMPTY -->
    <el-empty
      v-if="topicsList.length === 0"
      description="No items to display."
    />
    <el-scrollbar v-else>
      <topic-detail
        v-for="topic in topicsList"
        :key="topic"
        :topic="topic"
        @data-updated="requestUpdate"
      ></topic-detail>
    </el-scrollbar>
  </el-container>
</template>

<script>
import TopicDetail from "./TopicDetail.vue";

export default {
  components: {
    TopicDetail,
  },
  props: {
    topicsList: {
      type: Array,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["data-updated"],
  methods: {
    requestUpdate() {
      this.$emit("data-updated");
    },
  },
};
</script>

<style scoped>
.el-container#topics-list {
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>
