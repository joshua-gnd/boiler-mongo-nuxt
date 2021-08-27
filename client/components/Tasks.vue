<template>
  <div>
    <div class="mb-6" v-for="(category, index) in allCategories" :key="index">
      <div>
        <h3 class="text-2xl font-medium mb-2">{{ category.category }}</h3>
        <div
          class="flex flex-row"
          v-for="(task, index) in category.tasks"
          :key="index"
        >
          <div class="w-1/6 flex flex-row justify-between">
            <span>{{ task.name }}</span>
            <i
              @click="confirmTaskDelete(task._id)"
              class="el-icon-delete mr-3 pt-1 cursor-pointer"
            ></i>
          </div>

          <form class="flex flex-row justify-between w-5/6 mb-1">
            <select
              id="mySelect"
              class="
                border border-indigo-200
                bg-white
                rounded
                h-6
                w-6
                p-0
                m-0
                text-center
                cursor-pointer
              "
              v-for="(rating, index) in task.ratings"
              :key="index"
            >
              <option>{{ rating.rating }}</option>
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
            <!-- <input type="button" onclick="getOption()" value="Click Me!" /> -->
          </form>

          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  date() {
    return {
      tasks: [],
    };
  },
  computed: mapGetters(["allTasks", "allCategories"]),
  created() {
    this.addRatings();
    this.fetchCategories();
  },
  methods: {
    ...mapActions(["addRatings", "fetchCategories", "deleteTask"]),
    confirmTaskDelete(taskId) {
      this.$confirm(
        "This task will be permanently deleted. Would you like to continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
          center: true,
        }
      )
        .then(async () => {
          await this.deleteTask(taskId);
          this.fetchCategories();
          this.$message({
            type: "success",
            message: "Delete completed",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
  },
};
</script>

<style>
</style>