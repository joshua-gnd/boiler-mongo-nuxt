<template>
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
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: mapGetters([
    "allDates",
  ]),
    created() {
    this.sizeDatesArray();
  },
  methods: {
    ...mapActions(["sizeDatesArray"]),
  },
};
</script>

<style>
</style>