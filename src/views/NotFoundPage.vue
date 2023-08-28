<template>
  <div class="not-found-page">
    <div class="not-found-page-container container">
      <h1 class="not-found-title">404 Not Found</h1>
      <p class="not-found-description">The requested page does not exist.</p>
      <img src="/404.png" alt="Page Not Found 404" class="not-found-image" />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
}
.not-found-image {
  max-width: 900px;
  object-fit: cover;
}
</style>
