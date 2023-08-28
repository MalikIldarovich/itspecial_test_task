import { createPinia, defineStore } from "pinia";
import { useUsersStore } from "./modules/users";
import { useEditorStore } from "./modules/editor";

export const pinia = createPinia();

export const useStore = defineStore("store", () => {
  return {
    modules: {
      useUsersStore,
      useEditorStore,
    },
  };
});
