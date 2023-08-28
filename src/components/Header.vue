<template>
  <header class="header">
    <div class="header-container container">
      <Logo />
      <Nav />
    </div>
  </header>
</template>

<script lang="ts" setup>
import { defineComponent } from "vue";
import Nav from "@components/Nav.vue";
import Logo from "@components/UI/Logo.vue";

defineComponent({
  components: Nav,
});
</script>

<style lang="scss" scoped>
@import "@assets/css/variables.scss";

.header {
  background-color: $dark-color;
  border-bottom: $border-main;
  padding: 8px 0;
}
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media (max-width: $sm) {
  .header-container {
    flex-direction: column;
    gap: 24px;
  }
}
</style>
