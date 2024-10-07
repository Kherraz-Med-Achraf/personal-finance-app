<template>
  <div class="sidebar-menu">
    <div class="logo">
      <img v-if="sidebarMenuOpen" :src="LogoLarge" alt="logo" />
      <img v-else :src="logoSmall" alt="logo" />
    </div>
    <ul>
      <li class="">
        <router-link to="/" exact-active-class="active"
          ><img :src="OverviewIcon" alt="Overview Icon" /><span
            v-if="sidebarMenuOpen"
            >Overview</span
          ></router-link
        >
      </li>
      <li>
        <router-link to="/transactions" active-class="active"
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
  border-radius: 0 $spacing-200 $spacing-200 0;
  padding-bottom: $spacing-300;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  .logo {
    height: 101.76px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 $spacing-400;
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
    width: 100%;
    padding-right: $spacing-300;
    li {
      height: 58px;
      width: 100%;  
      cursor: pointer;
      a {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: $spacing-200;
        text-decoration: none;
        height: 100%;
        width: 100%;
        padding: 0 $spacing-400;
        img {
          height: 24px;
          width: auto;
        }
        span {
          @include text-preset-3;
          color: $grey-300;
        }
        &.active {
          background-color: $grey-100;
          border-radius: 0 $spacing-150 $spacing-150 0;
          border-left: 4px solid $green;
          img {
            filter: brightness(0) saturate(100%) invert(39%) sepia(8%)
              saturate(2896%) hue-rotate(128deg) brightness(102%) contrast(91%);
          }
          span {
          color: $grey-900;
        }
        }
      }
      &:hover {
        a:not(.active) {
          span {
            color: $grey-100;
          }
          img {
            filter: brightness(0) saturate(100%) invert(94%) sepia(53%)
              saturate(153%) hue-rotate(16deg) brightness(112%) contrast(93%);
          }
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
