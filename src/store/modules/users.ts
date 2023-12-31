import { ref } from "vue";
import { defineStore } from "pinia";
import { IUser, IUsersFields } from "@/types/user.interface";
import * as usersData from "@/example-data.json";
import { dateCreate } from "@/utils/date.create";
import { nanoid } from "nanoid";

function initialUsersState(): IUser[] {
  return usersData.data as IUser[];
}

export const useUsersStore = defineStore("usersStore", () => {
  const users = ref<IUser[]>([...initialUsersState()]);
  const sort = ref("desc");

  function getByRole(role: string) {
    return users.value.filter((i) => i.role === role);
  }

  function sortByField(field: keyof IUsersFields) {
    const compareFunction = (a: IUser, b: IUser) => {
      const aValue = a[field as keyof IUser];
      const bValue = b[field as keyof IUser];

      if (aValue == null) return -1;
      if (bValue == null) return 1;

      return aValue > bValue ? 1 : -1;
    };

    if (sort.value === "desc") {
      users.value.sort((a, b) => compareFunction(a, b));
      sort.value = "asc";
    } else {
      users.value.sort((a, b) => compareFunction(b, a));
      sort.value = "desc";
    }
  }

  function getCount() {
    return users.value.length;
  }

  function getBySearchParam(searchParam: string) {
    if (users.value.length === 0) return;
    const params = searchParam.toLowerCase();

    return users.value.map((i) => {
      if (i.first_name.toLowerCase().includes(params)) {
        return i;
      } else if (i.last_name.toLowerCase().includes(params)) {
        return i;
      } else if (i.role.toLowerCase().includes(params)) {
        return i;
      } else if (i.phone && i.phone.toLowerCase().includes(params)) {
        return i;
      }
      return;
    });
  }

  function addUser(user: IUser) {
    user.date_created = dateCreate();
    user.id = nanoid();
    users.value.push(user);
  }

  function updateUser(user: IUser) {
    users.value = users.value.map((i) => {
      if (i.id === user.id) {
        user.date_updated = dateCreate();
        i = user;
        return i;
      }
      return i;
    });

    console.log(users.value, user);
  }

  return {
    users,
    sortByField,
    getByRole,
    getBySearchParam,
    getCount,
    addUser,
    updateUser,
  };
});
