<template>
  <Transition name="bounce">
    <div class="dialog" v-if="isOpen" @click.stop="shuddle">
      <div class="dialog-content" @click.stop>
        <span class="dialog-content-close" @click.stop="close">
          <box-icon
            name="x"
            type="solid"
            color="white"
            class="dialog-content-close-icon"
          ></box-icon>
        </span>
        <div class="dialog-header">
          <slot name="title"></slot>
        </div>
        <slot name="content"></slot>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { watch, Transition } from "vue";
import "boxicons";

const props = withDefaults(
  defineProps<{
    isOpen?: boolean;
  }>(),
  {
    isOpen: false,
  }
);

const emit = defineEmits(["open:update"]);

function close() {
  emit("open:update", false);
}

function shuddle(e: Event) {
  const target = e.target as HTMLDivElement;
  if (target == null) return;

  target.classList.add("shuddle");
  setTimeout(() => {
    target.classList.remove("shuddle");
  }, 1000);
}

watch(
  () => props.isOpen,
  () => {
    if (props.isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }
);
</script>

<style lang="scss" scoped>
@import "@assets/css/variables.scss";

.dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-color: transparent;
  transition: all 0.3s ease-in-out;
  padding: 24px 0;
  margin: auto;
  backdrop-filter: blur(4px);
  overflow-y: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0;
  }
}
.dialog-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  width: 50%;
  max-width: 900px;
  height: fit-content;
  color: $light-color;
  background-color: $dark-color;
  border-radius: 16px;
  border: $border-light;
  padding: 24px;
  margin: 24px 0;
  box-shadow: $shadow-main;
}
.dialog-content-close {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: $secondary-color;
  cursor: pointer;
  transform: scale(1);
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: $primary-color;
    transform: scale(1.2);
  }
}
.dialog-header {
  padding: 0 32px;
}
.dialog-content-close-icon {
  position: relative;
  z-index: 100;
  width: 32px;
  height: 32px;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
.shuddle > .dialog-content {
  animation: shuddle 0.2s 3;
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
@keyframes shuddle {
  0%,
  100%,
  50% {
    translate: 0;
  }
  25% {
    translate: 8px 0;
  }
  75% {
    translate: -8px 0;
  }
}

@media (max-width: $lg) {
  .dialog-content {
    width: 85%;
    padding: 24px 16px;
  }
}
@media (max-width: $md) {
  .dialog-content {
    width: 90%;
    padding: 16px 12px;
  }
}
@media (max-width: $sm) {
  .dialog-content {
    width: 95%;
    padding: 12px 8px;
  }
}
</style>
