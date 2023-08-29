<template>
  <section class="users-page">
    <div class="users-page-container container">
      <div class="users-page-top">
        <Typography
          title="Таблица пользователей"
          variant="h3"
          color="light"
          weight="bold"
          align="left"
        />
        <div class="users-description-lists">
          <ul class="users-description-list">
            <li>Цели задания:</li>
            <li>Реализовать список пользователей</li>
            <li>Функционал добавления и редактирования пользователя</li>
            <li>Флаг для отображения/скрытия Фамилии пользователя</li>
            <li>Отсутсвие возможности смены роли при редактировании</li>
          </ul>
          <ul class="users-description-list">
            <li>Условия выполнения:</li>
            <li>Использовать фрэймворк Vue3</li>
            <li>Методология Compositions API</li>
            <li>Использование стора из пакета Pinia</li>
            <li>Типизация через Typescript</li>
            <li>
              Использования модального окна для добавления/редактирования
              данных.
            </li>
          </ul>
        </div>
        <div class="users-page-group">
          <Button
            text="Добавить пользователя"
            type="button"
            color="primary"
            variant="default"
            :handler="openCreateForm"
          />
          <Checkbox
            name="with_last_name"
            :value="withLastName"
            :label="withLastName ? 'Скрыть фамилии' : 'Показать фамилии'"
            @update:value="updateCheckbox"
          />
        </div>
      </div>
      <UserList />
      <Dialog
        :is-open="editorStore.editor"
        @open:update="editorStore.setEditor"
      >
        <template #title>
          <Typography
            :title="
              (editorStore.mode === 'create'
                ? 'Добавление нового'
                : 'Редактирование') + ' пользователя'
            "
            variant="h6"
            :color="editorStore.mode === 'create' ? 'primary' : 'secondary'"
            weight="bold"
            align="center"
          />
        </template>
        <template #content>
          <Form v-if="editorStore.editor" :mode="editorStore.mode" />
        </template>
      </Dialog>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed, provide } from "vue";
import { useStore } from "@/store";
import Form from "@/components/Form/Form.vue";
import Dialog from "@ui/Dialog.vue";
import Button from "@/components/UI/Button.vue";
import Typography from "@ui/Typography.vue";
import UserList from "@/components/User/UserList.vue";
import Checkbox from "@/components/UI/Checkbox.vue";

const store = useStore();

const editorStore = computed(() => {
  const { editor, mode, setEditor, setMode, resetEditUser } =
    store.modules.useEditorStore();

  return {
    editor,
    mode,
    setEditor,
    setMode,
    resetEditUser,
  };
});

const withLastName = ref(true);

provide("withLastName", withLastName);

function openCreateForm() {
  editorStore.value.resetEditUser();
  editorStore.value.setMode("create");
  editorStore.value.setEditor(true);
}

function updateCheckbox(boolean: boolean) {
  withLastName.value = boolean;
}
</script>

<style lang="scss" scoped>
@import "@assets/css/variables.scss";

.users-page-top {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 80%;
}
.users-page-group {
  display: flex;
  align-items: center;
  gap: 24px;
}
.users-description-lists {
  display: flex;
  align-items: start;
  gap: 24px;
  margin-top: 24px;
}
.users-description-list {
  display: flex;
  align-items: start;
  flex-direction: column;
  gap: 8px;
  font-weight: 500;
  padding-inline: 16px;

  & > li:first-child {
    color: $primary-color;
    font-size: $fz-lg;
    font-weight: 700;
    list-style: none;
  }
  & > li {
    list-style: disc;
  }
}
@media (max-width: 1452px) {
  .users-page-top {
    max-width: 100%;
  }
}
@media (max-width: $md) {
  .users-description-lists {
    flex-direction: column;
    gap: 24px;
  }
}
@media (max-width: $sm) {
  .users-page-group {
    flex-direction: column;
    gap: 16px;
  }
}
</style>
