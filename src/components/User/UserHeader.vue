<template>
  <div
    class="user-header"
    :style="{
      gridTemplateColumns: withLastName
        ? 'max-content 74px repeat(6, 1fr)'
        : 'max-content 74px repeat(5, 1fr)',
    }"
  >
    <div class="user-header-field">№</div>
    <div class="user-header-field">Фото</div>
    <UserHeaderButton
      v-for="(headerValue, index) in headerValues"
      :key="index"
      :index="index"
      :header-value="headerValue"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, inject } from "vue";
import { IUsersFields } from "@/types/user.interface";
import UserHeaderButton from "./UserHeaderButton.vue";

const withLastName = ref(inject("withLastName"));

const headerValues = computed(() => {
  const fields = Object.values(IUsersFields);
  if (!withLastName.value) {
    const indexToRemove = fields.indexOf(IUsersFields.last_name);
    if (indexToRemove !== -1) {
      fields.splice(indexToRemove, 1);
    }
  }
  return fields;
});
</script>

<style lang="scss" scoped>
@import "@assets/css/variables.scss";

.user-header {
  display: grid;
  grid-template-columns: max-content 74px repeat(6, 1fr);
  column-gap: 8px;
  width: 1440px;
  background-color: $dark-color;
  border-radius: 4px;
}
.user-header-field {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: $fz-sm;
  background-color: $dark-color;
  border-radius: 4px;
  padding: 12px 24px;
  transition: background-color 0.3 ease-in-out;
  &:first-child {
    width: 70px;
  }
  &:second-child {
    width: 74px;
  }
  &:hover {
    background-color: $secondary-color;
  }
}
</style>
