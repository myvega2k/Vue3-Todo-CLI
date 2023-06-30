import { createStore, createLogger } from "vuex";
import { modulePost, ModulePostState } from "./modules/modulePost";
import { moduleTodo, ModuleTodoState } from "./modules/moduleTodo";

export interface RootState {
  moduleTodo: ModuleTodoState;
  modulePost: ModulePostState;
}

export const store = createStore({
  plugins: process.env.NODE_ENV === "development" ? [createLogger()] : [],
  modules: {
    moduleTodo,
    modulePost
  },
});
