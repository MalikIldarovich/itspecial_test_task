<template>
  <router-link to="/" class="logo">
    <img src="/logo.png" alt="Logo" class="logo-image" />
  </router-link>
</template>

<script lang="ts" setup></script>

<style lang="scss">
@import "@assets/css/variables.scss";
.logo {
  width: 120px;
  height: 70px;
  border-radius: 8px;
  background-color: $primary-color;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  transition: all 0.3s ease-in-out;
}
.logo:hover {
  background-color: $secondary-color;
}
</style>
