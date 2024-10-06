<template>
  <div class="sidebar-menu">
    <div class="logo">
      <img v-if="sidebarMenuOpen" :src="LogoLarge" alt="logo" />
      <img v-else :src="logoSmall" alt="logo" />

    </div>
    <ul>
      <li>
        <router-link to="/"
          ><img :src="OverviewIcon" alt="Overview Icon" /><span v-if="sidebarMenuOpen">Overview</span></router-link
        >
      </li>
      <li>
        <router-link to="/"
          ><img :src="TransactionsIcon" alt="Transactions Icon" /><span v-if="sidebarMenuOpen">Transactions</span></router-link
        >
      </li>
    </ul>
    <button>
      <img :src="MinimiseIcon" alt="Minimize Menu Icon" />
      <span v-if="sidebarMenuOpen">Minimize Menu</span>
    </button>
  </div>
</template>

<script setup>
import { animate } from "@motionone/dom";
import { ref, onMounted } from "vue";
import LogoLarge from "@/assets/images/logo-large.svg";
import logoSmall from "@/assets/images/logo-small.svg";
import OverviewIcon from "@/assets/images/icon-nav-overview.svg";
import TransactionsIcon from "@/assets/images/icon-nav-transactions.svg";
import MinimiseIcon from "@/assets/images/icon-minimize-menu.svg";

let sidebarMenuOpen = ref(true);

// onMounted(() => {
//   // Anime l'élément quand le composant est monté
//   animate(".sidebar-menu h1", { transform: ["scale(0.5)", "scale(1)"] }, { duration: 1 });
// });
</script>

<style lang="scss" scoped>
.sidebar-menu {
  h1 {
    color: #333;
  }
}
</style>
