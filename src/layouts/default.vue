<template>
  <div class="layout-default">
    <Header />
    <main class="main">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from "vue";
import Header from "@components/Header.vue";
import Footer from "@components/Footer.vue";

defineComponent({
  components: {
    Header,
    Footer,
  },
});
</script>

<style lang="scss" scoped>
.layout-default {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}
.main {
  margin: 40px 0;
}
</style>
