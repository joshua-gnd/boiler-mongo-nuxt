<template>
  <div>
    <h3 class="text-xl font-medium mt-16 mb-2 text-blue-500">Add new task</h3>
    <div class="flex flex-col">
      <form @submit="submit" class="flex flex-col justify-between w-1/6 mt-1.5">
        <el-input
          class="mt-1.5"
          placeholder="name"
          v-model="task.name"
        ></el-input>

        <el-select
          class="mt-1.5"
          v-model="value"
          @change="checkCategory"
          placeholder="category"
        >
          <el-option
            v-for="category in selectCategories"
            :key="category.category"
            :label="category.category"
            :value="category.category"
            @click="checkCategory"
          >
          </el-option>
        </el-select>

        <el-input
          class="mt-1.5"
          placeholder="other category"
          v-model="input"
          v-show="other == true"
        ></el-input>

        <input
          class="
            px-3
            py-1
            text-blue-500
            hover:text-green-500
            bg-blue-100
            hover:bg-green-100
            border
            rounded
            border-blue-500
            hover:border-green-500
            mt-1.5
          "
          type="submit"
          value="Add"
        />
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      task: {
        name: "",
        category: "",
      },
      value: "",
      input: "",
      other: "",
    };
  },
  computed: mapGetters(["allCategories", "selectCategories"]),
  mounted() {
    this.fetchCategoryOther();
  },
  created() {},
  methods: {
    ...mapActions(["addTaskAndRatings", "fetchCategoryOther", "addRatings"]),
    async submit(event) {
      event.preventDefault();

      if (this.task.name == "") {
        return this.alertTaskName();
      }

      let category = "";

      if (this.other !== false) {
        category = this.input;
        if (this.input == "") {
          category = "Other";
        }
      } else {
        category = this.value;
      }

      let task = { name: this.task.name, category };
      await this.addTaskAndRatings(task);

      this.task.name = "";
      //   this.value = "";
      //   this.checkCategory();

      // add backend success receipt
      this.confirmAddTask();

      // this.addRatings();
      this.fetchCategoryOther();
    },

    checkCategory() {
      if (this.value == "Other") {
        this.other = true;
      } else {
        this.other = false;
      }
    },

    alertTaskName() {
      this.$alert(
        "A task must at least have a name to be added to list",
        "Enter task name",
        {
          confirmButtonText: "OK",
          callback: (action) => {
            this.$message({
              type: "info",
              message: `action: ${action}`,
            });
          },
          center: true,
        }
      );
    },
    confirmAddTask() {
      this.$notify({
        title: "Success",
        message: "This is a success message",
        type: "success",
      });
    },
  },
};
</script>

<style>
</style>