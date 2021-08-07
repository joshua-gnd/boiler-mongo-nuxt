<template>
  <div>
    <div class="max-w-screen-lg m-auto">
      <div class="mt-12 mb-8 text-4xl font-bold">
        <p class="text-center">{{ $moment().format("MMMM") }}</p>
      </div>
      <div class="flex flex-col items-end">
        <div class="flex flex-row w-5/6 justify-between">
          <div
            v-for="date in dates"
            :key="date"
            class="
              border border-b-0 border-blue-500
              rounded-t
              h-6
              w-6
              text-center
              pt-
            "
          >
            {{ date }}
          </div>
        </div>
        <div class="flex flex-row w-5/6 justify-between">
          <div
            v-for="day in days"
            :key="day"
            class="
              border border-t-0 border-blue-500
              rounded-b
              h-6
              w-6
              text-center
              pt-
            "
          >
            {{ day }}
          </div>
        </div>
      </div>

      <!-- <div v-if="categories"> -->
      <div class="mb-6" v-for="(category, index) in categories" :key="index">
        <div>
          <h3>{{ category.category }}</h3>
          <div v-for="(task, index) in category.tasks" :key="index">
            {{ task.name }}
          </div>
        </div>
      </div>
      <!-- </div> -->
    </div>
    <div class="container">
      <!-- <AddTodo /> -->
      <!-- <FilterTodos/> -->
      <!-- <Todos /> -->
    </div>
    <!-- <PostComponent /> -->
  </div>
</template>

<script>
// import _ from "lodash";
import FilterTodos from "../components/FilterTodos.vue";
export default {
  components: { FilterTodos },
  data() {
    return {
      dates: [],
      days: [],
      tasks: [
        {
          name: "Yoga",
          category: "Daily",
          rating: [{ date: 3 }],
        },
        {
          name: "French",
          category: "Daily",
          rating: [{ date: 3 }],
        },
        {
          name: "Coding",
          category: "Daily",
          rating: [{ date: 3 }],
        },
        {
          name: "Food preparation",
          category: "Routine",
          rating: [{ date: 3 }],
        },
        {
          name: "Wares washing",
          category: "Routine",
          rating: [{ date: 3 }],
        },
        {
          name: "Haircare",
          category: "Routine",
          rating: [{ date: 3 }],
        },
        {
          name: "Clean bedroom",
          category: "Temporary",
          rating: [{ date: 3 }],
        },
        {
          name: "Move bed",
          category: "Temporary",
          rating: [{ date: 3 }],
        },
        {
          name: "Scan pictures",
          category: "Temporary",
          rating: [{ date: 3 }],
        },
        {
          name: "Plant pineapples",
          category: "Garden",
          rating: [{ date: 3 }],
        },
        {
          name: "Plant vicks",
          category: "Garden",
          rating: [{ date: 3 }],
        },
      ],
      categories: [],
    };
  },
  mounted() {
    this.createDates();
    this.groupTaskCategories("Category", this.tasks);
    this.consoleLog();
  },
  methods: {
    createDates() {
      for (let i = 1; this.dates.length < 30; i++) {
        this.dates.push(i);
      }

      let days = ["S", "M", "T", "W", "T", "F", "S"];
      for (let i = 1; this.days.length < 30; i++) {
        this.days.push(i);
      }
    },
    groupTaskCategories(key, array) {
      array = this.tasks;

      for (let i = 0; i < array.length; i++) {
        let taskCategory = array[i].category;

        let index = this.categories.findIndex(function (category, index) {
          if (category.category == taskCategory) return true;
        });

        if (index >= 0) {
          this.categories[index]["tasks"].push(array[i]);
        } else {
          let newCategory = {
            category: taskCategory,
            tasks: [array[i]],
          };

          this.categories.push(newCategory);
        }
      }

      // this.categories = _.groupBy(array, "category");
      // console.log(this.categories)
    },
    consoleLog() {
      let time = new Date();
      // console.log("day ", time.getDay())
      // console.log("date: ", time.getDate())
      // console.log(time == time.getMonth())
      // console.log("full: ", time.toString())
      // console.log(this.$moment)
    },
  },
};
</script>

<style>
body {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  line-height: 1.6;
  background: #e8f7f0;
}
.container {
  max-width: 1100px;
  margin: auto;
  overflow: auto;
  padding: 0 2rem;
}
</style>