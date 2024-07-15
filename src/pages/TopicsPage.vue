<template>
  <el-container id="main">
    <el-card body-style="height: 550px" id="topics-card">
      <template #header>
        <el-container id="topics-card-header">
          <el-text tag="b" type="primary" id="title">
            <el-icon><Comment /></el-icon> Topics
          </el-text>

          <el-container id="new-button">
            <el-button color="#7f4af1" @click="handleClickNewTopic">
              <el-icon><CirclePlus /></el-icon>&nbsp;New
            </el-button>
          </el-container>
        </el-container>
      </template>

      <topics-list
        :topics-list="slicedTopics"
        :is-loading="isTopicsLoading"
        @data-updated="fetchTopics"
      ></topics-list>

      <template #footer>
        <el-container id="pagination">
          <el-pagination
            background
            small
            layout="prev, pager, next"
            :total="totalTopics"
            :page-size="5"
            @current-change="handlePageChange"
          />
        </el-container>
      </template>
    </el-card>
  </el-container>
</template>

<script>
import TopicsList from "@/components/topics/TopicsList.vue";
import router from "@/router";
import { ElMessage } from "element-plus";

export default {
  components: {
    TopicsList,
  },
  data() {
    return {
      topics: [],
      currentPage: 1,
      isTopicsLoading: true,
    };
  },
  computed: {
    totalTopics() {
      return this.topics.length;
    },
    slicedTopics() {
      let array = this.topics;
      const startIndex = (this.currentPage - 1) * 5;
      const endIndex = this.currentPage * 5;
      return array.slice(startIndex, endIndex);
    },
  },
  watch: {
    "$store.getters.fetchingTopicStatus"(value) {
      if (!value.isValid) {
        ElMessage({
          message: value.message,
          type: "warning",
          offset: 50,
        });
      }
    },
  },
  methods: {
    handleClickNewTopic() {
      router.push({
        name: "topic-edit",
        query: { id: null },
      });
    },
    handlePageChange(index) {
      this.currentPage = index;
    },
    async fetchTopics() {
      await this.$store.dispatch("fetchTopics");
      this.topics = this.$store.getters.topics;
      // disable loading
      this.isTopicsLoading = false;
    },
  },

  created() {
    this.fetchTopics();
  },
};
</script>

<style scoped>
.el-container#main {
  justify-content: center;
  align-items: start;
  height: 100%;
  padding: 1rem 0;
}
.el-container#new-button {
  justify-content: end;
  margin-top: 0;
}
.el-container#topics-card-header {
  align-content: center;
}

.el-container#pagination {
  justify-content: center;
}
.el-card#topics-card {
  width: 80%;
  height: 100%;
}
.el-text#title {
  font-size: 1.25rem;
}
</style>
