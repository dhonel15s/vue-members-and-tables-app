<template>
  <el-carousel trigger="click" height="auto" arrow="always">
    <el-carousel-item v-for="item in 4" :key="item" style="height: 25vh">
      <el-image
        :src="banners[item]"
        fit="cover"
        style="width: 100%; height: 100%"
      />
    </el-carousel-item>
  </el-carousel>
  <!-- Members -->
  <el-container class="main">
    <el-card class="main-card">
      <template #header>
        <el-container class="card-header">
          <el-text size="large" tag="b" type="primary">
            <el-icon><Management /></el-icon> Members
          </el-text>

          <el-container class="view-all-button">
            <el-button color="#7f4af1" @click="handleViewAllMembers">
              View All&nbsp;<el-icon><ArrowRightBold /></el-icon>
            </el-button>
          </el-container>
        </el-container>
      </template>

      <members-table
        :table-data="members"
        :is-preview="true"
        :is-loading="isMembersLoading"
      ></members-table>
    </el-card>
  </el-container>

  <!-- Topics -->
  <el-container class="main">
    <el-card class="main-card">
      <template #header>
        <el-container class="card-header">
          <el-text size="large" tag="b" type="primary">
            <el-icon><Comment /></el-icon> Topics
          </el-text>

          <el-container class="view-all-button">
            <el-button color="#7f4af1" @click="handleViewAllTopics">
              View All&nbsp;<el-icon><ArrowRightBold /></el-icon>
            </el-button>
          </el-container>
        </el-container>
      </template>

      <topics-list
        :topics-list="topics"
        :is-loading="isTopicsLoading"
        @data-updated="fetchTopics"
      ></topics-list>
    </el-card>
  </el-container>
</template>

<script>
import MembersTable from "@/components/members/MembersTable.vue";
import TopicsList from "@/components/topics/TopicsList.vue";
import Banner1 from "@/assets/banners/banner1.jpg";
import Banner2 from "@/assets/banners/banner2.jpg";
import Banner3 from "@/assets/banners/banner3.jpg";
import Banner4 from "@/assets/banners/banner4.jpg";
import router from "@/router";

export default {
  components: {
    MembersTable,
    TopicsList,
  },
  data() {
    return {
      banners: {
        1: Banner1,
        2: Banner2,
        3: Banner3,
        4: Banner4,
      },
      members: [],
      topics: [],
      isMembersLoading: true,
      isTopicsLoading: true,
    };
  },
  methods: {
    handleViewAllMembers() {
      router.push({ name: "members" });
    },
    handleViewAllTopics() {
      router.push({ name: "topics" });
    },
    async fetchMembers() {
      await this.$store.dispatch("fetchMembers");
      this.members = this.$store.getters.members.slice(0, 8);
      // disable loading
      this.isMembersLoading = false;
    },
    async fetchTopics() {
      await this.$store.dispatch("fetchTopics");
      this.topics = this.$store.getters.topics.slice(0, 4);
      // disable loading
      this.isTopicsLoading = false;
    },
  },
  created() {
    this.fetchMembers();
    this.fetchTopics();
  },
};
</script>
<style scoped>
.el-container.main {
  justify-content: center;
  align-items: start;
  padding: 1rem 0;
}
.el-card.main-card {
  width: 80%;
}
.el-container.card-header {
  align-content: center;
}
.el-container.view-all-button {
  justify-content: end;
  margin-top: 0;
}
</style>
