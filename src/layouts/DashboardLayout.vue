<template>
  <div class="dashboard-layout">
    <SidebarMenu @toggle-sidebar="handleSidebarToggle" />
    <div class="spacing"></div>
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import SidebarMenu from "../components/sidebar/SidebarMenu.vue";
import { animate } from "@motionone/dom";

const handleSidebarToggle = (sidebarMenuOpen) => {
  if (sidebarMenuOpen) {
    animate(".spacing", { width: "300px" }, { duration: 0.5 });
  } else {
    animate(".spacing", { width: "88px" }, { duration: 0.5 });
  }
};
</script>

<style lang="scss" scoped>
.dashboard-layout {
  display: flex;
  height: 100%;
  width: 100%;
  .spacing {
    width: 300px;
  }
  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    min-height: 100vh;
    padding: $spacing-400 $spacing-500;
  }
}
</style>
