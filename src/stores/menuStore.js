import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMenuStore = defineStore('menu', () => {
  const sidebarMenuOpen = ref(true);

  function toggleSidebarMenu() {
    sidebarMenuOpen.value = !sidebarMenuOpen.value;
  }
  return { sidebarMenuOpen, toggleSidebarMenu };
});
