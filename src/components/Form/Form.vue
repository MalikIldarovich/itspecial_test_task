<template>
  <form class="form" @submit="onSubmit">
    <TextField
      name="first_name"
      icon="rename"
      label="Имя"
      placeholder="Введите имя"
      :required="true"
      :value="user.first_name"
      :color="editorStore.mode === 'create' ? 'primary' : 'secondary'"
      @update:error="updateError"
      @update:value="onChange"
    />
    <TextField
      name="last_name"
      icon="rename"
      label="Фамилия"
      placeholder="Введите фамилию"
      :required="true"
      :value="user.last_name"
      :color="editorStore.mode === 'create' ? 'primary' : 'secondary'"
      @update:error="updateError"
      @update:value="onChange"
    />
    <ImageCapture
      :value="fileImage"
      :src="newImage || user.profile_image"
      name="file_image"
      label="Фото профиля"
      @update:value="onChangeImage"
      :color="editorStore.mode === 'create' ? 'primary' : 'secondary'"
    />
    <Select
      name="role"
      icon="user"
      label="Роль"
      placeholder="Выберите роль пользователя"
      :value="user.role"
      :options="roles"
      :required="true"
      :disabled="editorStore.mode === 'edit'"
      :color="editorStore.mode === 'create' ? 'primary' : 'secondary'"
      @update:error="updateError"
      @update:value="onChange"
    />
    <Transition name="slide-fade" mode="out-in">
      <TextField
        v-if="user.role === 'chief'"
        name="phone"
        icon="phone"
        label="Телефон"
        placeholder="Введите номер телефона"
        :value="user.phone || ''"
        :color="editorStore.mode === 'create' ? 'primary' : 'secondary'"
        @update:value="onChange"
      />
    </Transition>
    <Transition name="slide-fade" mode="out-in">
      <div v-if="formErrorMessage" class="form-error-message">
        {{ formErrorMessage }}
      </div>
    </Transition>
    <Button
      type="submit"
      icon="send"
      text="Добавить"
      variant="default"
      :is-loading="isLoading"
      :handler="onSubmit"
      :color="editorStore.mode === 'create' ? 'primary' : 'secondary'"
    />
  </form>
</template>

<script lang="ts" setup>
import { ref, watch, computed, Transition } from "vue";
import { useStore } from "@/store";
import { nanoid } from "nanoid";
import { IUser } from "@/types/user.interface";
import Button from "@ui/Button.vue";
import Select from "@ui/Select.vue";
import TextField from "@ui/TextField.vue";
import ImageCapture from "@ui/ImageCapture.vue";

interface IEmitDataText {
  name: keyof Pick<IUser, "first_name" | "last_name">;
  value: string;
}
interface IEmitDataFile {
  name: "file_image";
  value: File;
}
interface IEmitDataError {
  name: keyof Pick<IUser, "first_name" | "last_name" | "role">;
  value: boolean;
}

const roles = [
  { value: "worker", title: "Работник" },
  { value: "chief", title: "Начальник" },
];

const store = useStore();
const usersStore = computed(() => {
  const { users, updateOrAdd } = store.modules.useUsersStore();
  return { users, updateOrAdd };
});

const editorStore = computed(() => {
  const { mode, setEditor, getCurrentEditUser } =
    store.modules.useEditorStore();
  return { mode, setEditor, getCurrentEditUser };
});

const user = ref<IUser>({ ...editorStore.value.getCurrentEditUser() });
const isLoading = ref(false);
const fileImage = ref(null);
const newImage = ref("");

const formErrorMessage = ref("");

const errors = ref({
  first_name: user.value.first_name || true,
  last_name: user.value.last_name || true,
  role: user.value.role || true,
});

function updateError(error: IEmitDataError) {
  errors.value = {
    ...errors.value,
    [error.name]: error.value,
  };
}

function onChange({ name, value }: IEmitDataText) {
  user.value[name] = value;
}

function onChangeImage(file: IEmitDataFile) {
  const formData = new FormData();
  formData.append("file", file.value);
  const path = URL.createObjectURL(file.value);

  user.value.profile_image = path;
  newImage.value = path;
}

function onSubmit() {
  if (
    editorStore.value.mode === "edit" &&
    JSON.stringify(user.value) ===
      JSON.stringify(editorStore.value.getCurrentEditUser())
  ) {
    formErrorMessage.value =
      "Для редактирование необходимо внести какое-либо изменение";
    return;
  } else {
    formErrorMessage.value = "";
  }

  if (Object.values(errors.value).some((i) => i === true)) {
    formErrorMessage.value = "Проверьте правильность заполненения полей";
    return;
  } else {
    isLoading.value = true;
    user.value.id = nanoid();
    usersStore.value.updateOrAdd(user.value, editorStore.value.mode);
    formErrorMessage.value = "";

    // Эмитацтия запроса
    setTimeout(() => {
      editorStore.value.setEditor(false);
      isLoading.value = false;
    }, 300);
  }
}

watch(
  () => user.value.role,
  () => (user.value.phone = "")
);
</script>

<style lang="scss">
@import "@assets/css/variables.scss";

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: $light-color;
  margin-top: 24px;
}
.form-error-message {
  font-size: $fz-base;
  color: $error-color;
  font-style: italic;
  text-align: center;
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.5, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
