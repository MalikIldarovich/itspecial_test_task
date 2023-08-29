<template>
  <div class="not-found-page">
    <div class="not-found-page-container container">
      <h1 class="not-found-title">
        <span>Страница не найдена.</span>
      </h1>
      <p class="not-found-description">Запрошенная страница не существует.</p>
      <div class="not-found-image">
        <img src="/404.png" alt="Page Not Found 404" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import "@assets/css/variables.scss";

.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  flex-direction: column;
  gap: 16px;
}
.not-found-title {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 16px;
  & > span {
    color: $error-color;
  }
}
.not-found-title,
.not-found-description {
  text-align: center;
}
.not-found-image {
  max-width: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  & > img {
    width: 100%;
    object-fit: cover;
  }
}
@media (max-width: $sm) {
  .not-found-title {
    font-size: 28px;
  }
}
</style>
