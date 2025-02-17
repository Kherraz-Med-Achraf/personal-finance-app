<template>
  <div class="dashboard-layout">
    <SidebarMenu @toggle-sidebar="handleSidebarToggle" />
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
    animate(
      ".main-content",
      { width: "calc(100% - 300px)" },
      { duration: 0.5 }
    );
  } else {
    animate(".main-content", { width: "calc(100% - 88px)" }, { duration: 0.5 });
  }
};
</script>

<style lang="scss" scoped>
.dashboard-layout {
  display: flex;
  justify-content: flex-end;
  height: 100%;
  width: 100%;
  .main-content {
    width: calc(100% - 300px);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: $spacing-400;
    min-height: 100vh;
    padding: $spacing-400 $spacing-500;
    transition: width 0.3s ease;
  }
}
@media (max-width: 768px) {
  .dashboard-layout {
    justify-content: flex-start;
    .spacing {
      display: none;
    }
    .main-content {
      width: 100%;
    }
  }
}
</style>
