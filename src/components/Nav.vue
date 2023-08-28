<template>
  <nav class="nav">
    <router-link
      v-for="navLink in navsList"
      :key="navLink.to"
      :to="navLink.to"
      class="nav-link"
      active-class="nav-link-active"
    >
      {{ navLink.title }}
    </router-link>
  </nav>
</template>

<script lang="ts" setup>
const navsList = [
  { title: "Главная", to: "/" },
  { title: "Задание 1", to: "/users" },
  { title: "Задание 2", to: "/textarea" },
];
</script>

<style lang="scss" scoped>
@import "@assets/css/variables.scss";
.nav {
  display: flex;
  align-items: center;
  gap: 48px;
}
.nav-link {
  position: relative;
  color: $primary-color;
  transition: all 0.3s ease-in-out;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -8px;
    height: 2px;
    width: 0;
    background-color: $secondary-color;
    transition: all 0.3s ease-in-out;
  }

  &:hover {
    color: $secondary-color;
  }
  &:hover::after {
    width: 100%;
  }
}
.nav-link-active {
  color: $light-color;
  cursor: default;
  &:hover {
    color: $light-color;
  }
  &:hover::after {
    width: 0;
  }
}
</style>
