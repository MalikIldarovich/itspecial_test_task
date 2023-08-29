<template>
  <div class="user-list">
    <UserHeader />
    <TransitionGroup name="list">
      <UserRow
        v-for="(user, id) in usersStore.users"
        :key="id"
        :index="id"
        :user="user"
      />
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
import { computed, TransitionGroup } from "vue";
import { useStore } from "@/store";
import UserRow from "@components/User/UserRow.vue";
import UserHeader from "./UserHeader.vue";

const store = useStore();

const usersStore = computed(() => {
  const { users } = store.modules.useUsersStore();
  return { users };
});
</script>

<style lang="scss" scoped>
@import "@assets/css/variables.scss";

.user-list {
  background-color: $primary-color;
  border-radius: 4px;
  max-width: fit-content;
  box-shadow: $shadow-main;
  padding: 8px;
  margin-top: 24px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1.2s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

@media (max-width: 1452px) {
  .user-list {
    position: relative;
    left: -16px;
    width: 100vw;
    overflow-x: auto;
    border-radius: 0;
    padding: 4px 8px;
  }
}
</style>
