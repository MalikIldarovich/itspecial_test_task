<template>
  <div class="socials">
    <a
      v-for="social in socials"
      :key="social.link"
      :href="social.link"
      target="_blank"
      class="socials-link"
    >
      <span @mouseenter="hoverLink = true" @mouseleave="hoverLink = false">
        <box-icon
          :type="social.type"
          :name="social.icon"
          color="#cce2ec"
          class="socials-icon"
        ></box-icon>
      </span>
    </a>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import "boxicons";

const hoverLink = ref(false);
const socials = [
  {
    icon: "github",
    type: "logo",
    link: "https://github.com/MalikIldarovich",
  },
  {
    icon: "linkedin-square",
    type: "logo",
    link: "https://www.linkedin.com/in/malik-ildarovich",
  },
  {
    icon: "telegram",
    type: "logo",
    link: "https://t.me/Malik1994",
  },
  {
    icon: "world",
    type: "",
    link: "https://the-void.ru",
  },
];
</script>

<style lang="scss" scoped>
@import "@assets/css/variables.scss";

.socials {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
}
.socials-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: #cce2ec;
  transition: opacity 0.3s ease-in-out;
  &:hover {
    opacity: 0.7;
  }
}
.socials-icon {
  color: white;
}
</style>
