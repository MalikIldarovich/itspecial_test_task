<template>
  <div :class="['textarea', color]" tabindex="1">
    <div class="textarea-label">
      <span class="label-text" ref="labelRef">{{ label }}</span>
      <span v-if="required && !disabled" class="required-mark">*</span>
    </div>
    <textarea
      :id="name"
      :name="name"
      :value="value"
      ref="textareaRef"
      class="textarea-field"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    ></textarea>
    <Transition name="slide-fade">
      <div v-if="error">
        <span class="text-field-error">{{ error }}</span>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
const props = withDefaults(
  defineProps<{
    value: string;
    name: string;
    label: string;
    placeholder?: string;
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

const emit = defineEmits(["update:value"]);
const error = ref<string | undefined>("");

const labelRef = ref<HTMLLabelElement | null>(null);
const textareaRef = ref<HTMLTextAreaElement | null>(null);

function onFocus(e: Event) {
  const target = e.target as HTMLTextAreaElement;
  const value = target.value.trim();
  if (labelRef.value != null && !value) {
    labelRef.value.classList.add("move-up");
  }
}

function onBlur(e: Event) {
  const target = e.target as HTMLTextAreaElement;
  const value = target.value.trim();
  if (labelRef.value != null && !value) {
    labelRef.value.classList.remove("move-up");
  }
}

function onInput(e: Event) {
  const target = e.target as HTMLTextAreaElement;
  const newValue = target.value.trim();
  emit("update:value", newValue);
}

watch(
  () => props.value,
  () => {
    if (textareaRef.value != null) textareaRef.value.focus();
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
@import "@assets/css/variables.scss";
.textarea-field {
  resize: none;
}
.textarea {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 100%;
  height: 400px;
  position: relative;
  background-color: $dark-color;
  border-radius: 16px;
  border: $border-light;
  border-width: 2px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  padding: 16px;
}
.textarea-label {
  position: absolute;
  top: 6px;
  left: 6px;
  right: 6px;
  background: linear-gradient(
    180deg,
    $dark-color 50%,
    rgba($dark-color, 0.7) 70%,
    transparent 100%
  );
  max-width: calc(100% - 12px);
  height: 60px;
  padding: 8px 0;
}
.label-text {
  position: absolute;
  font-size: $fz-md;
  line-height: $lh-base;
  background-color: transparent;
  transform: translate(32px, 16px);
  transition: all 0.2s ease-in-out;
}
.move-up {
  font-size: $fz-sm;
  transform: translate(18px, 6px);
}
.required-mark {
  color: $error-color;
  padding: 0 4px;
}
.textarea-field {
  color: $light-color;
  overflow-x: hidden;
  outline: none;
  border: none;
  height: 380px;
  transition: all 0.3s ease-in-out;
  margin-top: 24px;
  padding: 12px;
  scrollbar-width: thin;
  scrollbar-color: $primary-color rgba(#fff, 0.5);
  &::placeholder {
    color: $gray-color;
    font-style: italic;
  }
  &:focus {
    outline: none;
    border: none;
  }
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    border-radius: 6px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(#fff, 0.5);
  }
  &::-webkit-scrollbar-thumb {
    cursor: pointer;
    background: $primary-color;
    border-radius: 5px;
  }
}
.primary {
  border-color: $primary-color;
}
.secondary {
  border-color: $secondary-color;
}
.textarea-error {
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
