import axios from 'axios';
import moment from 'moment';

const state = () => ({
    // todos: [],
    tasks: [],
    dates: [],
    categories: []
});

const getters = {
    // allTodos: (state) => state.todos,
    allTasks: (state) => state.tasks,
    allDates: (state) => state.dates,
    allCategories: (state) => state.categories,
    tasksLength: (state) => state.tasks.length,
    datesLength: (state) => state.dates.length,

};

const actions = {
    // Tasks
    async fetchTasks({ commit }) {
        const response = await axios.get('http://localhost:3001/api/tasks/')
        commit('setTasks', response.data)
    },

    async addTask({ commit }, task, priority) {
        const response = await axios.post('http://localhost:3001/api/tasks/', { task, priority })
        commit('newTask', response.data)

    },

    async deleteTask({ commit }, id) {
        await axios.delete(`http://localhost:3001/api/dates/${id}`)
        commit('removeTask', id)
    },

    // async filterTasks({ commit }, event) {
    //     // get selected number
    //     const limit = parseInt(event.target.options[event.target.options.selectedIndex].value);
    //     const response = await axios.get(`http://jsonplaceholder.typicode.com/tasks?_limit=${limit}`)
    //     commit('setTasks', response.data)
    // },

    async updateTask({ commit }, updateTask) {
        const response = await axios.put(
            `http://localhost:3001/api/tasks/${updateTask.id}`,
            updateTask
        );

        console.log(response.data);

        commit('updateTask', response.data);
    },

    async groupTaskCategories({ commit }) {
        const response = await axios.get('http://localhost:3001/api/tasks/')
        let tasks = response.data
        let categories = [];

        for (let i = 0; i < tasks.length; i++) {
            let taskCategory = tasks[i].category;

            let index = categories.findIndex(function (category, index) {
                if (category.category == taskCategory) return true;
            });

            if (index >= 0) {
                categories[index]["tasks"].push(tasks[i]);
            } else {
                let newCategory = {
                    category: taskCategory,
                    tasks: [tasks[i]],
                };

                categories.push(newCategory);
            }
        }

        commit('setCategories', categories)

        // this.categories = _.groupBy(array, "category");
        // console.log(this.categories)
    },


    // Dates
    async fetchDates({ commit }) {
        const response = await axios.get('http://localhost:3001/api/dates/')
        commit('setDates', response.data)
    },

    async sizeDatesArray({ commit }) {
        const response = await axios.get('http://localhost:3001/api/dates/')
        let dates = response.data
        // console.log(dates.length)

        let dateLength = dates.length
        let dateDelete = dateLength - 30

        let id = moment().format("YYYYMMDD");
        let month = moment().format("MMM").toUpperCase();
        let date = moment().format("DD");
        let day = moment().format("ddd").toUpperCase();

        let iEnd = dates.length - 1;

        // add today's date
        if (dates.length == 0 || dates[iEnd].id != id) {
            const response = await axios.post('http://localhost:3001/api/dates/', { id, month, date, day })
            commit('newDate', response.data)
        }

        // console.log(dates[iEnd].day, dates[iEnd].date, dates[iEnd].month)

        // resize array to length 30
        if (dateLength < 30) {

            id = "•"
            month = "•"
            date = 0
            day = "•"

            while (dateLength < 30) {
                const response2 = await axios.post('http://localhost:3001/api/dates/', { id, month, date, day })
                commit('newDate', response2.data)
            }

            // console.log("add. date array length: ", dateLength)

        } else {

            for (let i = 0; i < dateDelete; i++) {
                let _id = dates[i]._id
                await axios.delete(`http://localhost:3001/api/dates/${_id}`)
                commit('removeDate', _id)

            }

            // console.log("delete. date array length: ", dateLength)

        }

        commit('setDates', dates)
    },

    async addDate({ commit }, date, priority) {
        const response = await axios.post('http://localhost:3001/api/dates/', { date, priority })
        commit('newDate', response.data)

    },

    async deleteDate({ commit }, id) {
        await axios.delete(`http://localhost:3001/api/dates/${id}`)
        commit('removeDate', id)
    },

    async updateDate({ commit }, updateDate) {
        const response = await axios.put(
            `http://localhost:3001/api/dates/${updateDate.id}`,
            updateDate
        );

        // console.log(response.data);

        commit('updateDate', response.data);
    }
};

const mutations = {
    // tasks
    setTasks: (state, tasks) => (state.tasks = tasks),
    newTask: (state, task) => (state.tasks.unshift(task)),
    removeTask: (state, id) => (state.tasks = state.tasks.filter(task => task.id !== id)),
    updateTask: (state, updateTask) => {
        const index = state.tasks.findIndex(task => task.id === updateTask.id);
        if (index !== -1) {
            state.tasks.splice(index, 1, updateTask);
        }
    },

    // dates
    setDates: (state, dates) => (state.dates = dates),
    newDate: (state, date) => (state.dates.unshift(date)),
    removeDate: (state, id) => (state.dates = state.dates.filter(date => date.id !== id)),
    updateDate: (state, updateDate) => {
        const index = state.dates.findIndex(date => date.id === updateDate.id);
        if (index !== -1) {
            state.dates.splice(index, 1, updateDate);
        }
    },

    // categories
    setCategories: (state, categories) => (state.categories = categories),

};

export default {
    state,
    getters,
    actions,
    mutations
}