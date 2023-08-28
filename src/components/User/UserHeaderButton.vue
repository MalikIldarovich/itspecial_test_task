<template>
  <button
    :id="headerValue"
    class="user-header-btn"
    @click="() => handleSort(index)"
  >
    <span class="text">{{ headerValue }}</span>
    <box-icon
      type="solid"
      name="down-arrow"
      color="white"
      :rotate="descDir ? 0 : 180"
      class="user-header-btn-icon"
    ></box-icon>
  </button>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed } from "vue";
import { useStore } from "@/store";
import { IUsersFields } from "@/types/user.interface";

const props = defineProps<{
  headerValue: string;
  index: number;
}>();

const { headerValue } = toRefs(props);

const descDir = ref(true);
const store = useStore();
const usersStore = computed(() => {
  const { sortByField } = store.modules.useUsersStore();
  return { sortByField };
});

function handleSort(index: number) {
  descDir.value = !descDir.value;
  const key = Object.keys(IUsersFields)[index];
  usersStore.value.sortByField(key as keyof IUsersFields);
}
</script>

<style lang="scss" scoped>
@import "@assets/css/variables.scss";

.user-header-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 8px;
  font-size: $fz-sm;
  background-color: $dark-color;
  border-radius: 4px;
  padding: 12px 0;
  transition: background-color 0.3 ease-in-out;
  &:hover {
    background-color: $secondary-color;
  }
}
.user-header-btn-icon {
  position: absolute;
  right: 8px;
  width: 12px;
  font-size: $fz-xs;
}

.text {
  width: 200px;
  padding: 8px;
}
</style>
