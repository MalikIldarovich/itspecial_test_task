<template>
  <div
    class="user-row"
    @click="() => handleClick(userValues.id)"
    :style="{
      gridTemplateColumns: withLastName
        ? 'max-content 74px repeat(6, 1fr)'
        : 'max-content 74px repeat(5, 1fr)',
    }"
  >
    <div class="user-row-field index">{{ index + 1 }}</div>
    <div class="user-row-field">
      <Avatar
        size="md"
        :src="userValues.profile_image || ''"
        :alt="userValues.first_name + ' ' + userValues.last_name"
      />
    </div>
    <div class="user-row-field name">
      <span class="text">
        {{ userValues.first_name }}
      </span>
    </div>
    <div v-if="withLastName" class="user-row-field surname">
      <span class="text">
        {{ userValues.last_name }}
      </span>
    </div>
    <div class="user-row-field role">
      <span class="text">
        {{
          userValues.role !== "" ? IUsersRoles[userValues.role] : "Не указана"
        }}
      </span>
    </div>
    <div class="user-row-field phone">
      <span class="text">
        {{ userValues.phone || "Не указан" }}
      </span>
    </div>
    <div class="user-row-field phone">
      <span class="text">
        {{ userValues.date_created }}
      </span>
    </div>
    <div class="user-row-field phone">
      <span class="text">
        {{ userValues.date_updated || "Без изменений" }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, toRefs, inject } from "vue";
import { useStore } from "@/store";
import { IUser, IUsersRoles } from "@/types/user.interface";
import Avatar from "../UI/Avatar.vue";

const props = defineProps<{
  index: number;
  user: IUser;
}>();

const { user } = toRefs(props);
const userValues = ref(user);
const store = useStore();
const editorStore = computed(() => {
  const { setEditor, setEditUser, resetEditUser, setMode } =
    store.modules.useEditorStore();

  return {
    setMode,
    setEditor,
    setEditUser,
    resetEditUser,
  };
});

const withLastName = ref(inject("withLastName"));
function handleClick(id: string) {
  editorStore.value.resetEditUser();
  editorStore.value.setMode("edit");
  editorStore.value.setEditUser(id);
  editorStore.value.setEditor(true);
}
</script>

<style lang="scss">
@import "@assets/css/variables.scss";

.user-row {
  display: grid;
  column-gap: 8px;
  font-size: $fz-sm;
  width: 1440px;
  cursor: pointer;
  overflow-x: visible;
  background-color: $dark-color;
  border-radius: 4px;
  padding: 4px 0;
  margin: 12px 0 0;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: $secondary-color;
  }
  &-field {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 200px;
    padding: 0 12px;
    margin: 8px auto 8px;

    &:first-child {
      width: 70px !important;
    }
    &:second-child {
      width: 74px !important;
    }
  }
}
.text {
  width: 200px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  padding: 8px;
  text-align: center;
}
.index {
  width: 70px;
}
</style>
