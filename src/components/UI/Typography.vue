<template>
  <component
    :is="variant"
    :class="['typography', variant, color, weight, align]"
    >{{ title }}</component
  >
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    title: string;
    variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    color:
      | "dark"
      | "light"
      | "primary"
      | "secondary"
      | "success"
      | "warning"
      | "error";
    align: "left" | "center" | "right";
    weight: "normal" | "medium" | "semibold" | "bold";
  }>(),
  {
    variant: "h2",
    color: "light",
    align: "center",
    weight: "bold",
  }
);
</script>

<style lang="scss" scoped>
@import "@assets/css/variables.scss";

.typography {
  width: 100%;
  line-height: $lh-lg;
}
.h1 {
  font-size: $fz-h1;
}
.h2 {
  font-size: $fz-h2;
}
.h3 {
  font-size: $fz-h3;
}
.h4 {
  font-size: $fz-h4;
}
.h5 {
  font-size: $fz-h5;
}
.h6 {
  font-size: $fz-h6;
}
.primary {
  color: $primary-color;
}
.secondary {
  color: $secondary-color;
}
.dark {
  color: $dark-color;
}
.light {
  color: $light-color;
}
.success {
  color: $success-color;
}
.warning {
  color: $warning-color;
}
.error {
  color: $error-color;
}
.center {
  text-align: center;
}
.left {
  text-align: left;
}
.right {
  text-align: right;
}
.normal {
  font-weight: normal;
}
.medium {
  font-weight: 500;
}
.semibold {
  font-weight: 600;
}
.bold {
  font-weight: 700;
}

@media (max-width: $lg) {
  .h1 {
    font-size: 40px;
  }
  .h2 {
    font-size: 36px;
  }
  .h3 {
    font-size: 32px;
  }
  .h4 {
    font-size: 28px;
  }
  .h5 {
    font-size: 24px;
  }
  .h6 {
    font-size: 22px;
  }
}
</style>
