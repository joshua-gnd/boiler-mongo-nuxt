import axios from 'axios';

const state = () => ({
    todos: [
        // {
        //     id: 1,
        //     title: 'todo one'
        // },
        // {
        //     id: 2,
        //     title: 'todo two'
        // }
    ]
});

const getters = {
    allTodos: (state) => state.todos
};
const actions = {
    async fetchTodos({ commit }) {
        const response = await axios.get('http://jsonplaceholder.typicode.com/todos')
        commit('setTodos', response.data)
    },

    async addTodo({ commit }, title) {
        const response = await axios.post('http://jsonplaceholder.typicode.com/todos', { title, complete: false })
        commit('newTodo', response.data)

    },

    async deleteTodo({ commit }, id) {
        await axios.delete(`http://jsonplaceholder.typicode.com/todos/${id}`)
        commit('removeTodo', id)
    },

    async filterTodos({ commit }, event) {
        // get selected number
        const limit = parseInt(event.target.options[event.target.options.selectedIndex].value);
        const response = await axios.get(`http://jsonplaceholder.typicode.com/todos?_limit=${limit}`)
        commit('setTodos', response.data)
    },

    async updateTodo({ commit }, updateTodo) {
        const response = await axios.put(
            `https://jsonplaceholder.typicode.com/todos/${updateTodo.id}`,
            updateTodo
        );

        console.log(response.data);

        commit('updateTodo', response.data);
    }
};

const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => (state.todos.unshift(todo)),
    removeTodo: (state, id) => (state.todos = state.todos.filter(todo => todo.id !== id)),
    updateTodo: (state, updateTodo) => {
        const index = state.todos.findIndex(todo => todo.id === updateTodo.id);
        if (index !== -1) {
            state.todos.splice(index, 1, updateTodo);
        }
    }

};

export default {
    state,
    getters,
    actions,
    mutations
}

// NUXT DOCUMENTATION
// export const state = () => ({
//     counter: 0
//   })

//   export const mutations = {
//     increment(state) {
//       state.counter++
//     }
//   }