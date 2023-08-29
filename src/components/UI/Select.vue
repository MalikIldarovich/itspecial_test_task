<template>
  <div>
    <div :class="['select', color]">
      <label v-if="label" :for="name" class="select-label">
        <span class="label-text">{{ label }}</span>
        <span v-if="required && !disabled" class="required-mark">*</span>
      </label>
      <select
        :id="name"
        :name="name"
        :required="required"
        :disabled="disabled"
        v-bind:value="value"
        :class="['select-input', error ? 'invalid-input' : '']"
        @blur="onBlur"
        @input="onInput"
      >
        <option disabled selected value="">{{ placeholder }}</option>
        <option
          v-for="option of options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.title }}
        </option>
      </select>
      <div v-if="icon != null">
        <box-icon
          :name="icon"
          :color="color === 'primary' ? '#646cff' : '#036096'"
          type="solid"
          class="select-icon"
        ></box-icon>
      </div>
    </div>
    <Transition name="slide-fade">
      <div v-if="error">
        <span class="text-field-error">{{ error }}</span>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, Transition } from "vue";
import { inputValidate } from "@utils/input.validate";
import "boxicons";

const props = withDefaults(
  defineProps<{
    value: string;
    name: string;
    label: string;
    placeholder: string;
    disabled?: boolean;
    icon?: string;
    error?: string;
    color?: "primary" | "secondary";
    required?: boolean;
    options: { value: string; title: string }[];
  }>(),
  {
    color: "primary",
    required: false,
    disabled: false,
  }
);

const emit = defineEmits(["update:value", "update:error"]);
const error = ref<string | undefined>("");

function onInput(e: Event) {
  const target = e.target as HTMLInputElement;
  const name = target.name;
  const newValue = target.value;
  emit("update:value", { name, value: newValue });
}

function onBlur() {
  if (!props.required) return;
  error.value = inputValidate(
    {
      type: "text",
      name: props.name,
      label: props.label,
      value: props.value,
    },
    {
      minLength: 0,
      maxLength: Infinity,
    }
  );

  if (error.value) {
    emit("update:error", { name: props.name, value: true });
  } else {
    emit("update:error", { name: props.name, value: false });
  }
}
</script>

<style lang="scss" scoped>
@import "@assets/css/variables.scss";

.select {
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
  padding: 4px 0;
}
.select-label {
  font-size: $fz-md;
  line-height: $lh-base;
  margin-bottom: 4px;
}
.required-mark {
  color: $error-color;
  padding: 0 4px;
}
.select-input {
  min-height: 48px;
  cursor: pointer;
  color: $light-color;
  background-color: $dark-color;
  border-radius: 4px;
  border: $border-light;
  border-width: 2px;
  padding: 0 16px;
  &::placeholder {
    color: $gray-color;
    font-style: italic;
  }
  &:focus {
    border-color: $light-color;
  }
}
.primary > .select-input {
  border-color: $primary-color;
  &:focus {
    border-color: $secondary-color;
  }
}
.secondary > .select-input {
  border-color: $secondary-color;
  &:focus {
    border-color: $primary-color;
  }
}
.select-input.invalid-input {
  border-color: $error-color;
}
.select-icon {
  position: absolute;
  top: 50%;
  right: 12px;
}
.text-field-error {
  font-size: $fz-xs;
  color: $error-color;
  font-style: italic;
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
