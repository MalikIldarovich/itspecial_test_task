import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useUsersStore } from "./users";
import { nanoid } from "nanoid";
import { dateCreate } from "@/utils/date.create";

import { IUser } from "@/types/user.interface";
import { ModeType } from "../store.types";

const initUser: IUser = {
  id: nanoid(),
  first_name: "",
  last_name: "",
  profile_image: null,
  role: "",
  phone: null,
  date_created: dateCreate(),
  date_updated: null,
};

export const useEditorStore = defineStore("editorStore", () => {
  const usersStore = computed(() => {
    const { users, addUser, updateUser } = useUsersStore();
    return {
      users,
      addUser,
      updateUser,
    };
  });

  const mode = ref<ModeType>("create");
  const editor = ref(false);
  const editUser = ref<IUser>(initUser as IUser);

  function setMode(modeValue: ModeType) {
    mode.value = modeValue;
    if (modeValue === "create") resetEditUser();
  }

  function setEditor(bool: boolean) {
    editor.value = bool;
    return editor;
  }

  function setEditUser(id: string) {
    const currentUser = usersStore.value.users.find((i) => i.id === id);
    if (currentUser) {
      editUser.value = currentUser;
    }
  }

  function resetEditUser() {
    editUser.value = initUser;
  }

  function getCurrentEditUser() {
    return editUser.value;
  }

  function sendEditableUser(user: IUser) {
    if (mode.value === "create") {
      usersStore.value.addUser(user);
    } else {
      usersStore.value.updateUser(user);
    }
  }

  return {
    mode,
    editor,
    editUser,
    setMode,
    setEditor,
    setEditUser,
    resetEditUser,
    getCurrentEditUser,
    sendEditableUser,
  };
});
