<template>
  <div class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        autofocus
        @keyup.enter="addTodo"
        v-model="newTodo"
      />
    </header>
    <div class="todo-body" v-if="todos.length">
      <div
        v-for="(todo, index) in isFilteredTodos"
        :key="index"
        class="todo-item"
      >
        <input type="checkbox" class="toggle" v-model="todo.completed" />
        <span>{{ todo.title }}</span>
        <button class="todo-item__delete" @click="removeTodo(todo.id)"></button>
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
        <div
          class="todo-clear"
          @click="removeCompleted"
          v-if="hasCompletedTodos"
        >
          Clear completed
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "todoList",
  props: {},
  data: () => ({
    selectedFilter: "All",
    todoFilters: ["Active", "Completed", "All"],
    todos: [
      {
        title: "asd",
        completed: true,
        id: 1,
      },
    ],
    newTodo: "",
  }),
  methods: {
    addTodo() {
      if (this.newTodo.length === 0) return;
      this.todos.push({
        title: this.newTodo,
        completed: false,
        id: this.todos[this.todos.length - 1].id + 1 || 1,
      });
      this.newTodo = "";
    },
    removeTodo(id) {
      this.todos = this.todos.filter((item) => item.id !== id);
    },
    removeCompleted() {
      this.todos = this.todos.filter((item) => !item.completed);
    },
  },
  computed: {
    hasCompletedTodos() {
      return this.todos.filter((item) => item.completed).length;
    },
    isFilteredTodos() {
      if (this.selectedFilter === "Completed") {
        return this.todos.filter((item) => item.completed);
      }
      if (this.selectedFilter === "Active") {
        return this.todos.filter((item) => !item.completed);
      }
      return this.todos;
    },
  },
};
</script>

<style scoped lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}

body {
  font: 14px "Helvetica Neue", Helvetica, Arial, sans-serif;
  line-height: 1.4em;
  background: #f5f5f5;
  color: #4d4d4d;
  min-width: 230px;
  max-width: 550px;
  margin: 0 auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 300;
}
.todoapp {
  background: #fff;
  margin: 130px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
}
.todoapp input::-webkit-input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

.todoapp input::-moz-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

.todoapp input::input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}
.main {
  position: relative;
  z-index: 2;
  border-top: 1px solid #e6e6e6;
}
.todo-footer {
  display: flex;
  gap: 20px;
}
.todo-filter {
  display: flex;
  gap: 20px;
}
.delete {
  background-color: #000;
  margin-left: auto;
}
.todo-list {
  display: flex;
}
</style>
