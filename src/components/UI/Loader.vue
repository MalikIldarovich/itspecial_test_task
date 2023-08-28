<template>
  <box-icon name="loader-alt" :color="color" class="loader"></box-icon>
</template>

<script lang="ts" setup>
import "boxicons";

withDefaults(
  defineProps<{
    color: "black" | "white";
  }>(),
  {
    color: "white",
  }
);
</script>

<style lang="scss">
.loader {
  transform: rotate(0);
  animation: spin 1s infinite linear;
  transition: all 0.3s ease-in-out;
}

@keyframes spin {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
