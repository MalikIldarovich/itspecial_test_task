<template>
  <div>
    <div :class="['text-field', color]">
      <label v-if="label" :for="name" class="text-field-label">
        <span class="label-text">{{ label }}</span>
        <span v-if="required && !disabled" class="required-mark">*</span>
      </label>
      <input
        :id="name"
        :name="name"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        type="text"
        v-bind:value="value"
        @input="onInput"
        @blur="onBlur"
        :class="['text-field-input', error ? 'invalid-input' : '']"
      />
      <div v-if="icon != null" class="icon-container">
        <box-icon
          :name="icon"
          :color="color === 'primary' ? '#646cff' : '#036096'"
          type="solid"
          class="text-field-icon"
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
    color: "primary" | "secondary";
    icon?: string;
    disabled?: boolean;
    required?: boolean;
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
      minLength: 2,
      maxLength: 50,
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

.text-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
  padding: 4px 0;
}
.text-field-label {
  font-size: $fz-md;
  line-height: $lh-base;
  margin-bottom: 4px;
}
.required-mark {
  color: $error-color;
  padding: 0 4px;
}
.text-field-input {
  min-height: 48px;
  color: $light-color;
  background-color: $dark-color;
  border-radius: 4px;
  border: $border-light;
  border-width: 2px;
  padding: 0 16px;
  transition: all 0.3s ease-in-out;
  &::placeholder {
    color: $gray-color;
    font-style: italic;
  }
}

.primary > .text-field-input {
  border-color: $primary-color;
  &:focus {
    border-color: $secondary-color;
  }
}
.secondary > .text-field-input {
  border-color: $secondary-color;
  &:focus {
    border-color: $primary-color;
  }
}
.text-field-input.invalid-input {
  border-color: $error-color;
}
.text-field-icon {
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
