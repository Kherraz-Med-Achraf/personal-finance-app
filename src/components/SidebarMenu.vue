<template>
  <div class="sidebar-menu">
    <div class="logo">
      <img v-if="sidebarMenuOpen" :src="LogoLarge" alt="logo" />
      <img v-else :src="logoSmall" alt="logo" />
    </div>
    <ul>
      <li>
        <router-link to="/"
          ><img :src="OverviewIcon" alt="Overview Icon" /><span
            v-if="sidebarMenuOpen"
            >Overview</span
          ></router-link
        >
      </li>
      <li>
        <router-link to="/"
          ><img :src="TransactionsIcon" alt="Transactions Icon" /><span
            v-if="sidebarMenuOpen"
            >Transactions</span
          ></router-link
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
  width: 300px;
  background-color: $grey-900;
  border-radius: 0 16px 16px 0;
  padding: 0 32px 32px $spacing-300;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  .logo {
    height: 101.76px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img {
      height: 21.76px;
      width: auto;
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
    li {
      height: 58px;
      a {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: $spacing-200;
        text-decoration: none;
        img {
          height: 24px;
          width: auto;
        }
        span {
          @include text-preset-3;
          color: $grey-300;
        }
      }
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
    img {
      height: 24px;
      width: auto;
    }
    span {
      @include text-preset-3;
      color: $grey-300;
    }
  }
}
</style>
