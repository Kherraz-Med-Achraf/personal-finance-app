<template>
  <li>
    <router-link :to="to" exact-active-class="active">
      <component :is="getIconForTitle(title)" />
      <transition name="fade" mode="out-in">
        <span v-if="sidebarMenuOpen">{{ title }}</span>
      </transition>
    </router-link>
  </li>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  to: String,
  title: String,
  sidebarMenuOpen: Boolean,
  responsiveMode: Boolean,
});

import OverviewIcon from "@/assets/images/icon-nav-overview.svg";
import TransactionsIcon from "@/assets/images/icon-nav-transactions.svg";
import BudgetsIcon from "@/assets/images/icon-nav-budgets.svg";
import PotsIcon from "@/assets/images/icon-nav-pots.svg";
import RecurringBillsIcon from "@/assets/images/icon-nav-recurring-bills.svg";

// Fonction qui retourne l'icône en fonction du titre
const getIconForTitle = (title) => {
  const iconMap = {
    Overview: OverviewIcon,
    Transactions: TransactionsIcon,
    Budgets: BudgetsIcon,
    Pots: PotsIcon,
    "Recurring Bills": RecurringBillsIcon,
  };
  return iconMap[title] || null;
};
</script>

<style lang="scss" scoped>
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
    svg {
      height: 24px;
      min-width: 24px;
      fill: $grey-300;
      transition: fill 0.3s ease;
    }
    span {
      @include text-preset-3;
      color: $grey-300;
      transition: all 0.3s ease;
      white-space: nowrap;
    }
    &.active {
      background-color: $grey-100;
      border-radius: 0 $spacing-150 $spacing-150 0;
      box-shadow: inset 4px 0 0 0 $green;
      svg {
        fill: $green;
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
      svg {
        fill: $grey-100;
      }
    }
  }
}
@media (max-width: 768px) {
  li {
    width: 104px;
    height: 66px;
    a {
      flex-direction: column;
      justify-content: center;
      gap: $spacing-50;
      padding: 0;
      span {
        @include text-preset-5-bold;
      }
      &.active {
        border-radius: $spacing-100 $spacing-100 0 0;
        box-shadow: inset 0 -4px 0 0 $green;
      }
    }
  }
}
@media (max-width: 507px) {
  li {
    a {
      span {
        display: none;
      }
    }
  }
}
</style>
