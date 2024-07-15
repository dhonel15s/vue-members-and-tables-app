<template>
  <el-scrollbar>
    <el-table
      v-loading="isLoading"
      element-loading-text="Loading members..."
      :data="tableData"
      stripe
      border
      table-layout="auto"
      :header-cell-style="{ background: '#7f4af1', color: 'white' }"
    >
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="sex" label="Sex" />
      <el-table-column prop="birthday" label="Birthday" />
      <el-table-column prop="occupation" label="Occupation" />
      <el-table-column prop="phone" label="Phone" />
      <el-table-column prop="email" label="Email" />
      <el-table-column prop="interest" label="Interest" />
      <el-table-column
        align="center"
        label="Actions"
        fixed="right"
        v-if="!isPreview"
        prop="id"
      >
        <template #default="scope">
          <el-button
            color="dodgerblue"
            size="small"
            @click="handleClickEdit(scope.row.id)"
            class="action-button"
          >
            <el-icon><Edit /></el-icon>&nbsp;Edit
          </el-button>

          <!-- <el-popconfirm
            :title="'Are you sure to delete ' + scope.row.name + '?'"
            :hide-icon="true"
            confirm-button-type="danger"
            @confirm="handleClickDelete(scope.row.id, scope.row.name)"
          >
            <template #reference>
              <el-button
                type="danger"
                size="small"
                :disabled="isOngoingRequest"
              >
                <el-icon><CircleClose /></el-icon>&nbsp;Delete
              </el-button>
            </template>
          </el-popconfirm> -->

          <el-button
            type="danger"
            size="small"
            :disabled="isOngoingRequest"
            @click="handleClickDelete(scope.row.id, scope.row.name)"
            class="action-button"
          >
            <el-icon><CircleClose /></el-icon>&nbsp;Delete
          </el-button>
        </template>
      </el-table-column>

      <template #empty>
        <el-empty description="No items to display." />
      </template>
    </el-table>
  </el-scrollbar>

  <el-dialog
    v-model="dialog.isVisible"
    title="Confirm deletion"
    width="500"
    align-center
  >
    <span
      >Are you sure you want to delete <b>{{ dialog.selectedMemberName }}</b
      >?</span
    >
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClickCancel" :loading="isOngoingRequest"
          >Cancel</el-button
        >
        <el-button
          type="primary"
          @click="deleteMember"
          :loading="isOngoingRequest"
        >
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import router from "@/router";
import { ElMessage } from "element-plus";

export default {
  props: {
    tableData: {
      type: Array,
      required: true,
    },
    isPreview: {
      type: Boolean,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["update-members-list"],
  data() {
    return {
      isOngoingRequest: false,
      dialog: {
        isVisible: false,
        selectedMemberName: "",
        selectedMemberId: "",
      },
    };
  },
  methods: {
    handleClickEdit(id) {
      router.push({
        name: "members-edit",
        query: { id: id },
      });
    },
    handleClickDelete(id, name) {
      this.dialog = {
        isVisible: true,
        selectedMemberName: name,
        selectedMemberId: id,
      };
    },
    handleClickCancel() {
      this.resetDialog();
    },
    resetDialog() {
      this.dialog = {
        isVisible: false,
        selectedMemberName: "",
        selectedMemberId: "",
      };
    },
    async deleteMember() {
      this.isOngoingRequest = true;
      const payload = {
        id: this.dialog.selectedMemberId,
        name: this.dialog.selectedMemberName,
      };
      await this.$store.dispatch("deleteMember", payload);
      // check request status
      const status = this.$store.getters.deleteMemberStatus;
      if (status.isValid) {
        this.showDialogBox(status.message, "success");
        this.$emit("update-members-list");
      } else if (!this.$store.getters.isTokenExpired) {
        this.showDialogBox(status.message, "error");
      }
      this.isOngoingRequest = false;
      this.resetDialog();
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
.el-table {
  min-width: 70vw;
}
.el-button.action-button {
  width: 70px;
  margin: 2px;
}
</style>
