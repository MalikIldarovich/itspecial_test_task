<template>
  <div :class="['image-capture', color]">
    <label v-if="label" :for="name" class="image-capture-label">
      <span class="label-text">{{ label }}</span>
      <span v-if="required" class="required-mark">*</span>
    </label>
    <div class="image-capture-container">
      <input
        :id="name"
        :name="name"
        v-bind:value="value"
        type="file"
        accept="image/*,.png,.jpg,.jpeg,.gif,.web,.avif"
        @input="onInput"
        class="image-capture-container-input"
      />
      <img
        v-if="src"
        :src="src"
        alt="Profile Image"
        class="image-capture-placeholder"
      />
      <box-icon
        v-else
        type="solid"
        name="user-circle"
        :color="color === 'primary' ? '#646cff' : '#036096'"
        class="image-capture-placeholder"
      ></box-icon>
    </div>
    <div v-if="error != null">
      <Transition name="slide-fade">
        <span class="text-field-error">{{ error }}</span>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "boxicons";

withDefaults(
  defineProps<{
    value: File | null | string;
    name: string;
    src?: string | null;
    label?: string;
    color: "primary" | "secondary";
    error?: string;
    disabled?: boolean;
    required?: boolean;
  }>(),
  {
    color: "primary",
    required: false,
  }
);

const emit = defineEmits(["update:value"]);

function onInput(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target.files != null) {
    const file = target.files[0];

    if (file) {
      emit("update:value", { name: "", value: file });
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@assets/css/variables.scss";

.image-capture {
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
  padding: 4px 0;
}
.image-capture-label {
  font-size: $fz-md;
  line-height: $lh-base;
  margin-bottom: 4px;
}
.required-mark {
  color: $error-color;
  padding: 0 4px;
}
.image-capture-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $light-color;
  border-radius: 4px;
  border: 2px dashed $light-color;
  border-width: 2px;
  padding: 16px;
  transition: all 0.3s ease-in-out;
}
.image-capture-placeholder {
  height: 120px;
  width: 120px;
  border: $border-light;
  border-radius: 50%;
}
.image-capture-container-input {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  opacity: 0;
  cursor: pointer;
  border: none;
  outline: none;
}
.primary > .image-capture-container {
  border-color: $primary-color;
}
.secondary > .image-capture-container {
  border-color: $secondary-color;
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
