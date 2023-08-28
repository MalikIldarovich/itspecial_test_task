<template>
  <div class="checkbox">
    <Transition name="bounce">
      <label v-if="label" :for="name" class="checkbox-label">
        <span class="label-text">{{ label }}</span>
        <span v-if="required && !disabled" class="required-mark">*</span>
      </label>
    </Transition>
    <div class="checkbox-container">
      <input
        :id="name"
        type="checkbox"
        :required="required"
        :disabled="disabled"
        :checked="value"
        @change="onChange"
        class="checkbox-input"
      />
      <Transition name="bounce">
        <box-icon
          v-if="value"
          name="check"
          color="#646cff"
          class="checkmark"
          size="md"
        ></box-icon>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Transition } from "vue";
import "boxicons";

const props = withDefaults(
  defineProps<{
    name: string;
    value: boolean;
    label?: string;
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

function onChange() {
  emit("update:value", !props.value);
}
</script>
<style lang="scss" scoped>
@import "@assets/css/variables.scss";

.checkbox {
  display: flex;
  align-items: end;
  gap: 24px;
}
.checkbox-container {
  position: relative;
  width: 36px;
  height: 36px;
  border: 2px solid $primary-color;
  border-radius: 8px;
  background-color: transparent;
}
.checkbox-label {
  font-size: $fz-md;
  line-height: $lh-base;
  margin-bottom: 4px;
}
.required-mark {
  color: $error-color;
  padding: 0 4px;
}
.checkbox-input {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  opacity: 0;
  cursor: pointer;
}
.checkmark {
  position: absolute;
  top: -4px;
  left: -2px;
  right: 0;
  bottom: 0;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>
