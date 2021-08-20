// Traversy media
import axios from 'axios';

const state = () => ({
    todos: [
        {
            id: 1,
            title: 'todo one'
        },
        {
            id: 2,
            title: 'todo two'
        }
    ]
});
const getters = {
    // allTodos: (state) => state.todos
};
const actions = {};
const mutations = {};

export default {
    state,
    getters,
    actions,
    mutations
}

// Nuxt documentation
// export const state = () => ({
//     list: []
//   })

//   export const mutations = {
//     add(state, text) {
//       state.list.push({
//         text,
//         done: false
//       })
//     },
//     remove(state, { todo }) {
//       state.list.splice(state.list.indexOf(todo), 1)
//     },
//     toggle(state, todo) {
//       todo.done = !todo.done
//     }
//   }