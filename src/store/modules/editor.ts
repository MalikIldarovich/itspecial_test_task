import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useUsersStore } from "./users";
import { IUser } from "@/types/user.interface";
import { nanoid } from "nanoid";

type modeType = "create" | "edit";

const initUser: IUser = {
  id: nanoid(),
  first_name: "",
  last_name: "",
  profile_image: null,
  role: "",
  phone: null,
  date_created: new Date().toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }),
  date_updated: null,
};

export const useEditorStore = defineStore("editorStore", () => {
  const users = computed(() => useUsersStore().users);
  const mode = ref<modeType>("create");
  const editor = ref(false);
  const editUser = ref<IUser>(initUser as IUser);

  function getCurrentEditUser() {
    return editUser.value;
  }

  function setMode(modeValue: modeType) {
    mode.value = modeValue;
    if (modeValue === "create") resetEditUser();
  }

  function setEditUser(id: string) {
    const currentUser = users.value.find((i) => i.id === id);
    if (currentUser) {
      editUser.value = currentUser;
    }
  }

  function setEditor(bool: boolean) {
    editor.value = bool;
    return editor;
  }

  function resetEditUser() {
    editUser.value = initUser;
  }

  return {
    mode,
    editor,
    editUser,
    getCurrentEditUser,
    setMode,
    setEditor,
    setEditUser,
    resetEditUser,
  };
});
