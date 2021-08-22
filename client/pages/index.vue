<template>
  <div class="text-blue-700 bg-indigo-50 h-screen overflow-auto">
    <div class="max-w-screen-lg m-auto mb-20">
      <p class="pt-12 pb-8 text-5xl font-bold text-center">
        {{ $moment().format("YYYY") }}
      </p>

      <DatesDisplay />
      <Tasks />
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
import DatesDisplay from "../components/DatesDisplay.vue";
import Tasks from "../components/Tasks.vue";
export default {
  components: { DatesDisplay, Tasks },
  data() {
    return {
      dates: [],
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
  computed: mapGetters(["allTasks"]),
  created() {
    // this.groupTaskCategories();
  },
  async mounted() {
    // await this.createDates();
    this.consoleLog();
  },
  methods: {
    ...mapActions(["fetchTasks", "fetchDates"]),

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

      this.groupTaskCategory();
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
    groupTaskCategory() {
      // let array = this.tasks;
      // for (let i = 0; i < array.length; i++) {
      //   let taskCategory = array[i].category;
      //   let index = this.categories.findIndex(function (category, index) {
      //     if (category.category == taskCategory) return true;
      //   });
      //   if (index >= 0) {
      //     this.categories[index]["tasks"].push(array[i]);
      //   } else {
      //     let newCategory = {
      //       category: taskCategory,
      //       tasks: [array[i]],
      //     };
      //     this.categories.push(newCategory);
      //   }
      // }
      // this.categories = _.groupBy(array, "category");
      // console.log(this.categories)
    },
    async consoleLog() {
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