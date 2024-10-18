<template>
  <TopSection
    :title="'Transactions'"
    :buttonText="'test'"
    :onButtonClick="handleButtonClick"
  />
</template>

<script setup>
import TopSection from "@/layouts/TopSection.vue";
const handleButtonClick = () => {
  console.log('Button clicked');
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  h1 {
    color: #333;
  }
}
</style>
