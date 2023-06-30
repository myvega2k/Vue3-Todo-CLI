import { createStore, createLogger } from "vuex";
import TodoItem from "@/types/TodoItem";
import http from "@/common/http-common";

export type State = { todoItems: TodoItem[] };
const state: State = { todoItems: [] };

export const store = createStore({
  plugins: process.env.NODE_ENV === "development" ? [createLogger()] : [],
  state, //state: state,
  actions: {},
  mutations: {
    setTodoItems(state, items) {
      state.todoItems = items;
    },
    addTodo(state: State, todoItem: string) {
      const obj: TodoItem = { completed: false, item: todoItem };
      localStorage.setItem(todoItem, JSON.stringify(obj));
      state.todoItems.push(obj);
    },
    removeTodo(state: State, payload) {
      const {
        todoItem: { item },
        index,
      } = payload;
      localStorage.removeItem(item);
      state.todoItems.splice(index, 1);
    },
    toggleTodo(state: State, payload) {
      const {
        todoItem: { item, completed },
        index,
      } = payload;
      state.todoItems[index].completed = !completed;
      localStorage.removeItem(item);
      localStorage.setItem(item, JSON.stringify(state.todoItems[index]));
    },
    clearTodo(state: State) {
      localStorage.clear();
      state.todoItems = [];
    },
  },
});
