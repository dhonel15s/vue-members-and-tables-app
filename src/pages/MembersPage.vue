<template>
  <el-container id="main">
    <el-card body-style="height: 550px">
      <template #header>
        <el-container id="members-card-header">
          <el-text tag="b" type="primary" id="title">
            <el-icon><Management /></el-icon> Members
          </el-text>

          <el-container id="new-button">
            <el-button color="#7f4af1" @click="handleNewMember">
              <el-icon><CirclePlus /></el-icon>&nbsp;New
            </el-button>
          </el-container>
        </el-container>
      </template>

      <members-table
        :table-data="slicedMembers"
        :is-preview="false"
        :is-loading="isLoading"
        @update-members-list="fetchMembers"
      ></members-table>

      <template #footer>
        <el-container id="pagination">
          <el-pagination
            background
            small
            layout="prev, pager, next"
            :total="totalMembers"
            :page-size="12"
            @current-change="handlePageChange"
          />
        </el-container>
      </template>
    </el-card>
  </el-container>
</template>

<script>
import MembersTable from "@/components/members/MembersTable.vue";
import router from "@/router";
import { ElMessage } from "element-plus";

export default {
  components: {
    MembersTable,
  },
  data() {
    return {
      members: [],
      currentPage: 1,
      isLoading: true,
    };
  },
  watch: {
    "$store.getters.fetchingMemberStatus"(value) {
      if (!value.isValid) {
        ElMessage({
          message: value.message,
          type: "warning",
          offset: 50,
        });
      }
    },
  },
  computed: {
    totalMembers() {
      return this.members.length;
    },
    slicedMembers() {
      let array = this.members;
      const startIndex = (this.currentPage - 1) * 12;
      const endIndex = this.currentPage * 12;
      return array.slice(startIndex, endIndex);
    },
  },
  methods: {
    handleNewMember() {
      router.push({
        name: "members-edit",
        query: { id: null },
      });
    },
    handlePageChange(index) {
      this.currentPage = index;
    },
    async fetchMembers() {
      await this.$store.dispatch("fetchMembers");
      this.members = this.$store.getters.members;

      // disable loading
      this.isLoading = false;
    },
  },
  created() {
    this.fetchMembers();
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
.el-container#pagination {
  justify-content: center;
}
.el-container#new-button {
  justify-content: end;
  margin-top: 0;
}
.el-card {
  width: 80%;
  height: 100%;
}
.el-container#members-card-header {
  align-content: center;
}
.el-text#title {
  font-size: 1.25rem;
}
</style>
