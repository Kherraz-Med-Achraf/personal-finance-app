<template>
  <TopSection
    :title="'Overview'"
  />
  <div>
    <h2>Overview Content</h2>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import TopSection from "@/layouts/TopSection.vue";

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
