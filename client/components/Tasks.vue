<template>
  <div>
    <div class="mb-6" v-for="(category, index) in allCategories" :key="index">
      <div>
        <h3 class="text-2xl font-medium mb-2">{{ category.category }}</h3>
        <div
          class="flex flex-row"
          v-for="(task, index2) in category.tasks"
          :key="index2"
        >
          <div class="w-1/6 flex flex-row justify-between">
            <span>{{ task.name }}</span>
            <i
              @click="confirmTaskDelete(task._id)"
              class="el-icon-delete mr-3 pt-1 cursor-pointer"
            ></i>
          </div>

          <form
            class="flex flex-row justify-between w-5/6 mb-1"
            v-if="
              categories &&
              categories[index] &&
              categories[index].tasks &&
              categories[index].tasks[index2] &&
              categories[index].tasks[index2].ratings 
            "
          >
            <select
              id="mySelect"
              class="
                border border-indigo-200
                bg-white
                rounded
                h-6
                w-6
                pl-1.5
                pb-1
                m-0
                text-center
                cursor-pointer
              "
              v-for="(rating, index3) in task.ratings"
              :key="index3"
              @change="
                updateRating({
                  id: rating._id,
                  rating: {
                    rating:
                      categories[index].tasks[index2].ratings[index3].rating,
                  },
                })
              "
              v-model="categories[index].tasks[index2].ratings[index3].rating"
            >
              <option :value="rating.rating">
                {{ rating.rating == 0 ? "•" : rating.rating }}
              </option>
              <option value="0">•</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </form>
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
      value: "",
      categories: [],
    };
  },
  computed: mapGetters(["allTasks", "allCategories"]),
  created() {
    this.fetchCategories();
  },
  mounted() {
    this.populateCategories();
    this.$root.$on("populateCategories", () => {
      this.populateCategories();
    });
  },
  methods: {
    ...mapActions(["updateRating", "fetchCategories", "deleteTaskAndRatings"]),
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
          await this.deleteTaskAndRatings(taskId);
          await this.$root.$emit("populateCategories");
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
    async populateCategories() {
      await this.fetchCategories();
      this.categories = await [...this.allCategories];
    },
  },
};
</script>

<style>
</style>