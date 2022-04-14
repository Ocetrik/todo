<template>
  <div class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        autofocus
        @keyup.enter="addTodo(newTodo)"
        v-model="newTodo"
      />
    </header>
    <div class="todo-body" v-if="GET_TODOS.length">
      <div
        v-for="(todo, index) in isFilteredTodos"
        :key="index"
        class="todo-item"
      >
        <input type="checkbox" class="toggle" v-model="todo.completed" />
        <span>{{ todo.title }}</span>
        <img
          src="@/assets/cross.svg"
          class="todo-item__delete"
          @click="REMOVE_TODO(todo)"
        />
      </div>
      <div class="todo-footer">
        <div class="todo-count">{{ isFilteredTodos.length }} item left</div>
        <div class="todo-filter">
          <div
            class="todo-filter__item"
            v-for="filter in todoFilters"
            :key="filter"
          >
            <input
              type="radio"
              name="todo-filter"
              v-model="selectedFilter"
              :value="filter"
            />
            {{ filter }}
          </div>
        </div>
        <div class="todo-clear" @click="CLEAR_TODO" v-if="hasCompletedTodos">
          Clear completed
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "todoList",
  data: () => ({
    selectedFilter: "All",
    todoFilters: ["Active", "Completed", "All"],
    newTodo: "",
  }),
  methods: {
    ...mapMutations(["ADD_TODO", "REMOVE_TODO", "CLEAR_TODO"]),
    addTodo(text) {
      this.ADD_TODO(text);
      this.newTodo = "";
    },
  },
  computed: {
    ...mapGetters(["GET_TODOS"]),
    //Не уверен что это нужно переносить во vuex
    hasCompletedTodos() {
      return this.GET_TODOS.filter((item) => item.completed).length;
    },
    isFilteredTodos() {
      if (this.selectedFilter === "Completed") {
        return this.GET_TODOS.filter((item) => item.completed);
      }
      if (this.selectedFilter === "Active") {
        return this.GET_TODOS.filter((item) => !item.completed);
      }
      return this.GET_TODOS;
    },
  },
};
</script>

<style scoped lang="scss">
.todoapp {
  font: 14px "Helvetica Neue", Helvetica, Arial, sans-serif;
  line-height: 1.4em;
  color: #4d4d4d;
  min-width: 230px;
  max-width: 550px;
  margin: 0 auto;
  font-weight: 300;
  background: #fff;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
  padding: 3em;
}
h1 {
  font-size: 60px;
}
.main {
  position: relative;
  z-index: 2;
  border-top: 1px solid #e6e6e6;
}
.new-todo {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  line-height: 1.4em;
  border: 0;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
}
.todo-body {
  margin-top: 2em;
}
.toggle {
  margin-right: 1em;
}
.todo-footer {
  display: flex;
  gap: 2em;
}
.todo-filter {
  display: flex;
  gap: 3em;
}
.todo-item__delete {
  cursor: pointer;
  width: 1em;
  height: 1em;
}
.todo-item {
  display: flex;
  align-items: center;
}
</style>
