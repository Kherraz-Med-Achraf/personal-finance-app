<script setup>
import SidebarMenu from "../components/sidebar/SidebarMenu.vue";
</script>

<template>
  <div class="dashboard-layout">
    <SidebarMenu />
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dashboard-layout {
  display: flex;
  height: 100%;
  width: 100%;
  .main-content {
    flex: 1;
  }
}
</style>
