<template>
  <section class="home-page">
    <div class="home-page-container container">
      <h1 class="home-page-title">
        Тестовое задание для
        <span>ITSpecial</span>
      </h1>
      <Typography
        title="Используемый стэк технологий:"
        variant="h4"
        color="light"
        weight="bold"
        align="left"
      />
      <div class="home-page-tech">
        <box-icon name="vuejs" type="logo" size="lg" color="#3fb27f"></box-icon>
        <box-icon type="logo" name="sass" size="lg" color="#c76395"></box-icon>
        <box-icon
          name="javascript"
          type="logo"
          size="lg"
          color="#e8d44d"
        ></box-icon>
        <box-icon
          name="typescript"
          type="logo"
          size="lg"
          color="#2f74c0"
        ></box-icon>
        <span class="pinia-logo">
          <img src="/pinia.svg" alt="Pinia" />
        </span>
      </div>
      <Typography
        title="По вопросам сотрудничества звоните по тел:"
        variant="h6"
        color="light"
        weight="bold"
        align="left"
      />
      <a href="tel:+79177476813" class="phone-link">
        <Typography
          title="+7 (917) 747-68-13"
          variant="h6"
          color="primary"
          weight="bold"
          align="left"
        />
      </a>
    </div>
  </section>
</template>

<script lang="ts" setup>
import Typography from "@ui/Typography.vue";
import "boxicons";
</script>

<style lang="scss" scoped>
@import "@assets/css/variables.scss";

.home-page-title {
  font-weight: bold;
  margin-bottom: 24px;
  & > span {
    color: $primary-color;
  }
}
.home-page-tech {
  display: flex;
  align-items: center;
  gap: 32px;
  margin-top: 24px;
  margin-bottom: 100px;
}
.phone-link:hover {
  :deep(.h6) {
    transition: color 0.3s ease-in-out;
    color: $light-color;
  }
}
.pinia-logo {
  width: 36px;
  height: 60px;
  overflow: hidden;
}
@media (max-width: $md) {
  h1.home-page-title {
    font-size: 28px;
  }
}
</style>
