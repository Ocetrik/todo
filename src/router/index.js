import Vue from "vue";
import VueRouter from "vue-router";
import todoList from "@/components/todo.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "todoList",
    component: todoList,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
