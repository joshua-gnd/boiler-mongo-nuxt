<template>
  <div>
    <div class="mb-6" v-for="todo in allTodos" :key="todo._id">
      <div>Task: {{ todo.task }}</div>
      <div>Priority: {{ todo.priority }}</div>
      <div>Completed: {{ todo.completed?'yes':'no' }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["fetchTodos"]),
    // onDoubleClick(todo) {
    //   const updateTodo = {
    //     id: todo.id,
    //     title: todo.title,
    //     completed: !todo.completed
    //   };
    //   this.updateTodo(updateTodo);
    // }
  },

  computed: mapGetters(["allTodos"]),
  created() {
    this.fetchTodos();
  },
};
</script>

<style>
</style>