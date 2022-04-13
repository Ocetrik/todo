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
    getTodos(state) {
      return state.todos;
    },
  },
  mutations: {
    ADD_TODO(state, todo) {
      state.todos.push(todo);
    },
    REMOVE_TODO(state, todo) {
      state.todos = state.todos.filter((item) => item.id !== todo.id);
    },
    CLEAR_TODO(state) {
      state.todos = state.todos.filter((item) => item.completed);
    },
  },
  modules: {},
});
