<template>
  <footer class="footer">
    <div class="footer-container container">
      <Socials />
      <span class="footer-copy">@Malik WebDev 2023 г.</span>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import Socials from "@ui/Socials.vue";
</script>

<style lang="scss" scoped>
@import "@assets/css/variables.scss";
.footer {
  color: $light-color;
  background-color: $dark-color;
  border-top: $border-main;
  padding: 16px 12px;
}
.footer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.footer-copy {
  font-size: $fz-sm;
}
</style>
