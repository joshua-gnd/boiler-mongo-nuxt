<template>
  <div class="text-blue-700 bg-indigo-50 h-screen overflow-auto">
    <div class="max-w-screen-lg m-auto mb-20">
      <p class="pt-12 pb-8 text-5xl font-bold text-center">
        {{ $moment().format("YYYY") }}
      </p>

      <DatesDisplay />
      <Tasks />
      <AddTask />
      
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DatesDisplay from "../components/DatesDisplay.vue";
import Tasks from "../components/Tasks.vue";
import AddTask from "../components/AddTask.vue";
export default {
  components: { DatesDisplay, Tasks, AddTask },
  data() {
    return {};
  },
  created() {
    this.fetchTasks();
    // this.deleteDates();
  },
  methods: {
    ...mapActions(["fetchTasks", "deleteDates"]),
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