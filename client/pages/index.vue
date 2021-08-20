<template>
  <div class="text-blue-700 bg-indigo-50 h-screen overflow-auto">
    <div class="max-w-screen-lg m-auto mb-20">
      <p class="pt-12 pb-8 text-5xl font-bold text-center">
        {{ $moment().format("YYYY") }}
      </p>
      <div class="relative h-20">
        <div
          v-if="allDates"
          class="flex flex-row w-5/6 justify-around absolute inset-y-0 right-0"
        >
          <div v-for="(date, index) in allDates" :key="index" class="">
            <div
              class="
                flex flex-col
                justify-around
                border border-indigo-200
                bg-white
                rounded
                h-12
                w-6
                text-center
                cursor-default
              "
            >
              <span class="text-xxxs font-semibold">{{ date.month }}</span>
              <span class="text-sm">{{ date.date }}</span>
              <span class="text-xxxs font-semibold">{{ date.day }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-6" v-for="(category, index) in categories" :key="index">
        <div>
          <h3 class="text-2xl font-medium mb-2">{{ category.category }}</h3>
          <div
            class="flex flex-row"
            v-for="(task, index) in category.tasks"
            :key="index"
          >
            <div class="w-1/6">{{ task.name }}</div>

            <!-- <div class="flex flex-row justify-between w-5/6 mb-1"> -->
            <!-- <div
                class="
                  border border-indigo-200
                  bg-white
                  rounded
                  h-6
                  w-6
                  text-center
                  cursor-pointer
                "
                v-for="(rating, index) in task.ratings"
                :key="index"
              >
                {{ rating.rating }}
              </div> -->

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
    <div class="container">
      <!-- <AddTodo /> -->
      <!-- <FilterTodos/> -->
      <!-- <Todos /> -->
    </div>
    <!-- <PostComponent /> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  // components: { FilterTodos },
  data() {
    return {
      dates: [],
      tasks: [
        {
          name: "Yoga",
          category: "Daily",
          ratings: [
            // { id: "23091994", rating: 2 },
            // { id: "13021970", rating: 3 },
          ],
        },
        {
          name: "French",
          category: "Daily",
          ratings: [
            // { id: "23091994", rating: 2 },
            // { id: "13021970", rating: 3 },
          ],
        },
        {
          name: "Coding",
          category: "Daily",
          ratings: [
            // { id: "23091994", rating: 2 },
            // { id: "13021970", rating: 3 },
          ],
        },
        {
          name: "Food preparation",
          category: "Routine",
          ratings: [
            // { id: "23091994", rating: 2 },
            // { id: "13021970", rating: 3 },
          ],
        },
        {
          name: "Wares washing",
          category: "Routine",
          ratings: [
            // { id: "23091994", rating: 2 },
            // { id: "13021970", rating: 3 },
          ],
        },
        {
          name: "Haircare",
          category: "Routine",
          ratings: [
            // { id: "23091994", rating: 2 },
            // { id: "13021970", rating: 3 },
          ],
        },
        {
          name: "Clean bedroom",
          category: "Temporary",
          ratings: [
            // { id: "23091994", rating: 2 },
            // { id: "13021970", rating: 3 },
          ],
        },
        {
          name: "Move bed",
          category: "Temporary",
          ratings: [
            // { id: "23091994", rating: 2 },
            // { id: "13021970", rating: 3 },
          ],
        },
        {
          name: "Scan pictures",
          category: "Temporary",
          ratings: [
            // { id: "23091994", rating: 2 },
            // { id: "13021970", rating: 3 },
          ],
        },
        {
          name: "Plant pineapples",
          category: "Garden",
          ratings: [
            // { id: "23091994", rating: 2 },
            // { id: "13021970", rating: 3 },
          ],
        },
        {
          name: "Plant vicks",
          category: "Garden",
          ratings: [
            // { id: "23091994", rating: 2 },
            // { id: "13021970", rating: 3 },
          ],
        },
      ],
      categories: [],

      options: [
        {
          value: "Option1",
          label: "Option1",
        },
        {
          value: "Option2",
          label: "Option2",
        },
        {
          value: "Option3",
          label: "Option3",
        },
        {
          value: "Option4",
          label: "Option4",
        },
        {
          value: "Option5",
          label: "Option5",
        },
      ],
      value: "",
    };
  },
  computed: mapGetters([
    "allTasks",
    "allDates",
    "getTasksLength",
    "datesLength",
  ]),
  created() {
    this.fetchTasks();
    // this.fetchDates();
    this.sizeDatesArray();
  },
  async mounted() {
    // await this.createDates();
    // await this.affectState();
    this.groupTaskCategories();
    this.consoleLog();
  },
  methods: {
    ...mapActions(["fetchTasks", "fetchDates", "sizeDatesArray"]),

    async createDates() {
      // await this.fetchDates();

      let datesLength = null;

      if (this.datesLength == 0) {
        setTimeout(() => {
          this.createDates();
        }, 750);
      } else {
        datesLength = await this.datesLength;
      }

      let iEnd = this.dates.length - 1;
      // let iEnd = datesLength - 1;

      let id = this.$moment().format("YYYYMMDD");
      let month = this.$moment().format("MMM").toUpperCase();
      let date = this.$moment().format("DD");
      let day = this.$moment().format("ddd").toUpperCase();

      let today = { id, month, date, day };

      // add today's date to header row
      if (this.dates.length == 0 || this.dates[iEnd].id != today.id) {
        // if (datesLength == 0 || this.dates[iEnd].id != today.id) {
        this.dates.push(today);

        let emptyArray = {
          id: "•",
          month: "•",
          date: "•",
          day: "•",
        };

        while (this.dates.length < 30) {
          // while (datesLength < 30) {
          this.dates.unshift(emptyArray);
        }

        emptyArray = { id: "•", rating: "•" };

        for (let i = 0; i < this.tasks.length; i++) {
          let rating = { id, rating: 0 };
          this.tasks[i].ratings.push(rating);

          while (this.tasks[i].ratings.length < 30) {
            this.tasks[i].ratings.unshift(emptyArray);
          }
        }
      }

      // remove oldest index in array if array length > 30
      if (this.dates.length > 30) {
        // if (datesLength > 30) {
        this.dates.shift();

        for (let i = 0; i < this.tasks.length; i++) {
          this.tasks[i].ratings.shift();
        }
      }
    },

    createNewTask() {
      // on the creation of new tasks, the newly created rating
      // entry in the ratings array is preceded by 29 empty entries:
      // { id: "23091994", rating: 2 }

      // for (let i = 0; i < this.tasks.length; i++) {
      //   this.tasks[i].ratings.shift();
      // }

      this.groupTaskCategories();
    },
    adjustRatingColor() {
      switch (expression) {
        case x:
          // code block
          break;
        case y:
          // code block
          break;
        default:
        // code block
      }
    },
    groupTaskCategories() {
      let array = this.tasks;

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
    async consoleLog() {
      // setTimeout(() => {
      //   console.log(this.allTasks);
      // }, 1000);
      // setTimeout(() => {
      //   console.log(this.allDates);
      // }, 1000);
      // setTimeout(() => {
      //   console.log(this.datesLength);
      // }, 1500);
      // await console.log(this.allTasks);
    },
  },
};
</script>

<style>
select {
  /* for Firefox */
  -moz-appearance: none;
  /* for Chrome */
  -webkit-appearance: none;
}

/* For IE10 */
select::-ms-expand {
  display: none;
}
</style>