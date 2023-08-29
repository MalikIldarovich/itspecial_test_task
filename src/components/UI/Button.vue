<template>
  <button
    :type="type"
    :class="['btn', variant, color]"
    @click.prevent="handler"
  >
    <span class="btn-text">
      {{ text }}
    </span>
    <span v-if="icon && !isLoading" class="btn-icon">
      <box-icon type="solid" :name="icon" color="white"></box-icon>
    </span>
    <Loader v-if="isLoading" :color="color !== 'light' ? 'white' : 'black'" />
  </button>
</template>

<script lang="ts" setup>
import Loader from "./Loader.vue";
import "boxicons";

withDefaults(
  defineProps<{
    icon?: string;
    text: string;
    isLoading?: boolean;
    type: "button" | "submit";
    variant: "default" | "outlined";
    color:
      | "dark"
      | "light"
      | "primary"
      | "secondary"
      | "success"
      | "warning"
      | "error";
    handler: (e: Event) => void;
  }>(),
  {
    isLoading: false,
  }
);
</script>

<style lang="scss" scoped>
@import "@assets/css/variables.scss";

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  font-weight: bold;
  border-radius: 8px;
  border: 2px solid transparent;
  padding: 12px 24px;
  margin: 8px 0;
  &:hover {
    opacity: 0.7;
  }
  &.default {
    color: $light-color;
    &.primary {
      background-color: $primary-color;
    }
    &.secondary {
      background-color: $secondary-color;
    }
    &.dark {
      background-color: $dark-color;
    }
    &.light {
      color: $dark-color;
      background-color: $light-color;
    }
    &.success {
      background-color: $success-color;
    }
    &.warning {
      background-color: $warning-color;
    }
    &.error {
      background-color: $error-color;
    }
  }
  &.outlined {
    background-color: rgba(#000, 0.1);
    backdrop-filter: blur(4px);

    &.primary {
      color: $primary-color;
      border-color: $primary-color;
    }
    &.secondary {
      color: $secondary-color;
      border-color: $secondary-color;
    }
    &.dark {
      color: $dark-color;
      border-color: $dark-color;
    }
    &.light {
      color: $light-color;
      border-color: $light-color;
    }
    &.success {
      color: $success-color;
      border-color: $success-color;
    }
    &.warning {
      color: $warning-color;
      border-color: $warning-color;
    }
    &.error {
      color: $error-color;
      border-color: $error-color;
    }
  }
}
</style>
