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
          <div class="w-1/6">{{ task.name }}</div>

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
    };
  },
  computed: mapGetters(["allTasks", "allCategories"]),
  created() {
    this.sizeRatingsArray();
    this.groupTaskCategories();
  },
  methods: {
    ...mapActions(["sizeRatingsArray", "groupTaskCategories"]),
  },
};
</script>

<style>
</style>