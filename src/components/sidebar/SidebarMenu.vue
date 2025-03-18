<template>
  <div class="sidebar-menu">
    <div class="logo">
      <transition name="fade" mode="out-in">
        <logo-large v-if="menuStore.sidebarMenuOpen" />
        <logoSmall v-else class="mini" />
      </transition>
    </div>
    <ul :class="{ close: !menuStore.sidebarMenuOpen }">
      <SidebarMenuItem
        to="/"
        title="Overview"
        :sidebarMenuOpen="menuStore.sidebarMenuOpen"
        :responsiveMode="responsiveMode"
      />
      <SidebarMenuItem
        to="/transactions"
        title="Transactions"
        :sidebarMenuOpen="menuStore.sidebarMenuOpen"
        :responsiveMode="responsiveMode"
      />
      <SidebarMenuItem
        to="/budgets"
        title="Budgets"
        :sidebarMenuOpen="menuStore.sidebarMenuOpen"
        :responsiveMode="responsiveMode"
      />
      <SidebarMenuItem
        to="/pots"
        title="Pots"
        :sidebarMenuOpen="menuStore.sidebarMenuOpen"
        :responsiveMode="responsiveMode"
      />
      <SidebarMenuItem
        to="/recurring-bills"
        title="Recurring Bills"
        :sidebarMenuOpen="menuStore.sidebarMenuOpen"
        :responsiveMode="responsiveMode"
      />
    </ul>
    <button @click="menuStore.toggleSidebarMenu">
      <MinimiseIcon id="Minimize-btn" class="svg-icon" />
      <transition name="fade" mode="out-in">
        <span v-if="menuStore.sidebarMenuOpen">Minimize Menu</span>
      </transition>
    </button>
  </div>
</template>

<script setup>
import { animate } from "@motionone/dom";
import { ref, onMounted, watch } from "vue";
import { useMenuStore } from "@/stores/menuStore";
import SidebarMenuItem from "@/components/sidebar/SidebarMenuItem.vue";
import LogoLarge from "@/assets/images/logo-large.svg";
import logoSmall from "@/assets/images/logo-small.svg";
import MinimiseIcon from "@/assets/images/icon-minimize-menu.svg";

const menuStore = useMenuStore();


let responsiveMode = ref(false);
const emit = defineEmits(["toggle-sidebar"]);

const sideBarAnimation = () => {
  if (menuStore.sidebarMenuOpen) {
    animate(".sidebar-menu", { width: "300px" }, { duration: 0.5 });
    animate("#Minimize-btn", { rotate: ["180deg", "0deg"] }, { duration: 0.5 });
  } else {
    animate(".sidebar-menu", { width: "88px" }, { duration: 0.5 });
    animate("#Minimize-btn", { rotate: ["0deg", "180deg"] }, { duration: 0.5 });
  }
};

watch(
  () => menuStore.sidebarMenuOpen,
  (newValue) => {
    sideBarAnimation(); 
    emit("toggle-sidebar", newValue);
  }
);


const handleResize = () => {
  if (window.innerWidth <= 768 && !menuStore.sidebarMenuOpen) {
    menuStore.sidebarMenuOpen = true;
    emit("toggle-sidebar", menuStore.sidebarMenuOpen);
    sideBarAnimation();
  }
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize();
});
</script>

<style lang="scss" scoped>
.sidebar-menu {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 300px;
  background-color: $grey-900;
  border-radius: 0 $spacing-200 $spacing-200 0;
  padding-bottom: $spacing-300;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  .logo {
    height: 101.76px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 36px;
    svg {
      height: 21.76px;
      width: auto;
      fill: $white;
      &.mini {
        height: 21.44px;
      }
    }
  }
  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: $spacing-50;
    padding: $spacing-300 0;
    width: 100%;
    padding-right: $spacing-300;
    transition: padding-right 0.3s ease;
    &.close {
      padding-right: $spacing-100;
    }
  }
  button {
    height: 58px;
    margin-top: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: $spacing-200;
    background-color: transparent;
    border: none;
    padding: 0 $spacing-400;
    cursor: pointer;
    .svg-icon {
      height: 24px;
      width: auto;
      fill: $grey-300;
      transition: fill 0.3s ease;
    }
    span {
      @include text-preset-3;
      color: $grey-300;
      white-space: nowrap;
      transition: all 0.3s ease;
    }
    &:hover {
      span {
        color: $grey-100;
      }
      .svg-icon {
        fill: $grey-100;
      }
    }
  }
}
@media (max-width: 768px) {
  .sidebar-menu {
    z-index: 1000;
    width: 100% !important;
    border-radius: $spacing-100 $spacing-100 0 0;
    height: 74px;
    top: unset;
    bottom: 0;
    flex-direction: row;
    align-items: center;
    padding: 0;
    .logo {
      display: none;
    }
    ul {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: $spacing-100 $spacing-500 0 $spacing-500;
      gap: unset;
      height: 100%;
    }
    button {
      display: none;
    }
  }
}
@media (max-width: 507px) {
  .sidebar-menu {
    ul {
      padding: $spacing-100 $spacing-200 0 $spacing-200;
    }
  }
}
</style>
