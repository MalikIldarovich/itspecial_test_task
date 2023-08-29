<template>
  <div :class="`avatar ${size}`">
    <img
      v-if="src"
      class="avatar-image"
      :src="src"
      :alt="alt"
      @click.stop="open = true"
    />
    <box-icon
      v-else
      type="solid"
      name="user-circle"
      color="white"
      class="avatar-placeholder"
      @click.stop
    ></box-icon>
  </div>
  <Dialog :is-open="open" @open:update="updateOpen">
    <template #title>
      <Typography
        :title="'Фото пользователя: ' + alt"
        variant="h6"
        color="primary"
        weight="bold"
        align="center"
      />
    </template>
    <template #content>
      <div class="avatar-opened">
        <img :src="src" :alt="alt" />
      </div>
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref, toRefs } from "vue";
import Dialog from "@ui/Dialog.vue";
import Typography from "@ui/Typography.vue";
import "boxicons";

const props = defineProps<{
  src: string;
  alt: string;
  size: "xl" | "lg" | "md" | "sm";
}>();

const { src, alt, size } = toRefs(props);

const open = ref(false);

function updateOpen(value: boolean) {
  open.value = value;
}
</script>

<style lang="scss" scoped>
@import "@assets/css/variables.scss";

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  border: $border-light;
  .avatar-placeholder {
    width: 100%;
    height: 100%;
  }
  &.xl {
    width: 96px;
    height: 96px;
  }
  &.lg {
    width: 64px;
    height: 64px;
  }
  &.md {
    width: 48px;
    height: 48px;
  }
  &.sm {
    width: 32px;
    height: 32px;
  }
  & > .avatar-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.avatar-opened {
  overflow: hidden;
  border-radius: 16px;
  margin: 24px auto 0;
  & > img {
    width: 100%;
    object-fit: contain;
  }
}
</style>
