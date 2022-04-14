import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    todos: [],
  },
  getters: {
    GET_TODOS(state) {
      return state.todos;
    },
  },
  mutations: {
    ADD_TODO(state, todoText = "") {
      state.todos.push({
        title: todoText,
        completed: false,
        id: state.todos[state.todos.length - 1]?.id
          ? state.todos[state.todos.length - 1]?.id + 1
          : 1,
      });
      console.log(state);
    },
    REMOVE_TODO(state, todo) {
      state.todos = state.todos.filter((item) => item.id !== todo.id);
    },
    CLEAR_TODO(state) {
      state.todos = state.todos.filter((item) => !item.completed);
    },
  },
  modules: {},
});
