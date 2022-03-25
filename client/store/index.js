import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';

const state = () => ({
    tasks: [],
    dates: [],
    categories: [],
    selectCategories: []
});

const getters = {
    allTasks: (state) => state.tasks,
    allDates: (state) => state.dates,
    allCategories: (state) => state.categories,
    selectCategories: (state) => state.selectCategories,
};

const actions = {
    // Tasks
    async fetchTasks({ commit }) {
        const response = await axios.get('http://localhost:3001/api/tasks/')
        commit('setTasks', response.data)
    },

    async addTask({ commit }, { name, category }) {
        const response = await axios.post('http://localhost:3001/api/tasks/', { name, category })
        await commit('newTask', response.data)
    },

    async addTaskAndRatings({ dispatch, getters }, { name, category }) {
        await dispatch('addTask', { name, category })
        await dispatch('fetchDates')

        let dates = [...getters.allDates]
        let tasks = [...getters.allTasks]

        for (let i = 0; i < dates.length; i++) {
            let rating = 0
            let date = dates[i]._id
            let taskId = tasks[0]._id
            await dispatch('addRating', { rating, date, taskId })
            console.log(`/${dates.length}`)
        }

    },

    async deleteTask({ commit }, id) {
        await axios.delete(`http://localhost:3001/api/tasks/${id}`)
        commit('removeTask', id)
    },

    async deleteTaskAndRatings({ dispatch }, taskId) {
        const response = await axios.get(`http://localhost:3001/api/tasks/${taskId}`)
        let task = response.data
        let ratings = task.ratings

        for (let i = 0; i < ratings.length; i++) {
            let ratingId = ratings[i]._id
            await dispatch('deleteRating', ratingId)
            console.log(`${ratings.length}`)
        }
        await dispatch('deleteTask', taskId)
    },

    async updateTask({ commit }, updateTask) {
        const response = await axios.put(
            `http://localhost:3001/api/tasks/${updateTask.id}`,
            updateTask
        );

        commit('updateTask', response.data);
    },

    async fetchCategories({ commit }) {
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

    async fetchCategoryOther({ commit, dispatch, getters }) {
        await dispatch('fetchCategories')
        let categories = [...getters.allCategories]

        // check if any key of category has a value of other
        let index = _.findIndex(categories, { 'category': 'Other' });

        if (index < 0) {
            categories.push({ category: "Other" })
        }

        commit('setselectCategories', categories)
    },


    // Dates
    async fetchDates({ commit }) {
        const response = await axios.get('http://localhost:3001/api/dates/')
        commit('setDates', response.data)
    },

    async populateDatesArray({ dispatch, getters }) {
        await dispatch('fetchDates')
        let dates = [...getters.allDates]

        if (dates.length < 30) {
            let difference = 30 - dates.length
            let id = 0
            let month = "•"
            let date = 0
            let day = "•"

            for (let i = difference; i > 0; i--) {
                await dispatch('addDate', { id, month, date, day })
            }
        }
        await dispatch('addDateToday')
    },

    async addDateToday({ dispatch, getters }) {
        await dispatch('fetchDates')
        let dates = [...getters.allDates]
        let i = dates.length - 1
        let id = moment().format("YYYYMMDD");

        if (dates[i].id != id) {
            let month = moment().format("MMM").toUpperCase();
            let date = moment().format("DD");
            let day = moment().format("ddd").toUpperCase();

            await dispatch('deleteDate', dates[0]._id)
            await dispatch('addDate', { id, month, date, day })
        }

        let todaysId = dates[i].id
        await dispatch('updateRatingsToday', todaysId)
    },

    async updateRatingsToday({ dispatch, getters }, todaysId) {
        // console.log({todaysId, todaysId2})
        await dispatch('fetchDates')
        await dispatch('fetchTasks')
        let dates = [...getters.allDates]
        let tasks = [...getters.allTasks]
        let rating = 0
        let date = dates[dates.length - 1]._id

        for (let i = 0; i < tasks.length; i++) {
            let taskId = tasks[i]._id
            let ratingId = tasks[i].ratings[0]._id
            let ratingId2 = tasks[i].ratings[tasks[i].ratings.length - 1].date.id

            if (ratingId2 != todaysId) {
                await dispatch('deleteRating', ratingId)
                await dispatch('addRating', { rating, date, taskId })
                console.log(`/${tasks.length}`)
            }
        }
        // await dispatch('fetchDates')
        // await dispatch('fetchTasks')
    },

    async addDate({ commit }, { id, month, date, day }) {
        const response = await axios.post('http://localhost:3001/api/dates/', { id, month, date, day })
        commit('newDate', response.data)

    },

    async deleteDate({ commit }, id) {
        await axios.delete(`http://localhost:3001/api/dates/${id}`)
        commit('removeDate', id)
    },

    // async deleteDates({ dispatch, getters }, id) {
    //     await dispatch('fetchDates')
    //     let dates = [...getters.allDates]

    //     for (let i = 0; i < dates.length; i++) {
    //         let id = dates[i]._id
    //         dispatch('deleteDate', id)
    //     }
    // },

    async updateDate({ commit }, updateDate) {
        const response = await axios.put(
            `http://localhost:3001/api/dates/${updateDate.id}`,
            updateDate
        );
        commit('updateDate', response.data);
    },

    // Ratings
    async addRating({ commit }, { rating, date, taskId }) {
        const response = await axios.post(`http://localhost:3001/api/ratings/${taskId}`, { rating, date, task: taskId })
        commit('newRating', response.data)
    },

    async updateRating({ commit }, rating) {
        const response = await axios.put(
            `http://localhost:3001/api/ratings/${rating.id}`,
            rating.rating
        );
        commit('updRating', response.data);
    },

    async deleteRating({ commit }, id) {
        await axios.delete(`http://localhost:3001/api/ratings/${id}`)
        // commit('removeDate', id)
    },
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
    setselectCategories: (state, selectCategories) => (state.selectCategories = selectCategories),

    // ratings
    newRating: (state, rating) => {
        const index = state.tasks.findIndex(task => task._id === rating.task);
        if (index !== -1) {
            state.tasks[index].ratings.unshift(rating);
        }
    },
    updRating: (state, rating) => {
        const index = state.tasks.findIndex(task => task._id === rating.task);
        if (index !== -1) {
            const index2 = state.tasks[index].ratings.findIndex(rate => rate._id === rating._id);
            if (index2 !== -1) {
                state.tasks[index].ratings.splice(index2, 1, rating);
            }
        }
    },
    removeRating: (state, id) => {
        // (state.dates = state.dates.filter(date => date.id !== id))
    },

};

export default {
    state,
    getters,
    actions,
    mutations
}