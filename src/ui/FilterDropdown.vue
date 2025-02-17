<template>
  <div class="filter-dropdown" :style="{ width: props.width }" @click="toggleDropdown">
    <div class="dropdown-header" :class="{ open: isOpen }">
      {{ selectedLabel || placeholder }}
      <component :is="CaretDown" class="arrow" />
    </div>
    <ul v-if="isOpen" class="dropdown-list">
      <li
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
        :class="{ selected: option.value === internalValue }"
      >
        {{ option.label }}
        <div class="divider"></div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: "All Transactions",
  },
  modelValue: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "177px",
  },
});

import CaretDown from "@/assets/images/icon-caret-down.svg";

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const internalValue = ref(props.modelValue);

const selectedLabel = computed(() => {
  const selected = props.options.find(
    (opt) => opt.value === internalValue.value
  );
  return selected ? selected.label : "";
});

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function selectOption(option) {
  internalValue.value = option.value;
  emit("update:modelValue", option.value);
  isOpen.value = false;
}
</script>

<style lang="scss" scoped>
.filter-dropdown {
  position: relative;
  z-index: 100;
  user-select: none;
  width: 177px;
  cursor: pointer;
  font-size: 1rem;
  color: $grey-900;
  .dropdown-header {
    padding: $spacing-150 $spacing-250;
    background-color: $white;
    border: 1px solid $beige-500;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include text-preset-4;
    color: $grey-900;
    .arrow {
      transition: transform 0.2s ease;
      font-size: 32px;
    }
    &:hover {
      border-color: $grey-500;
    }
    &.open {
      .arrow {
        transform: rotate(180deg);
      }
    }
  }
  .dropdown-list {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: $white;
    border-radius: 8px;
    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);
    list-style: none;
    padding: $spacing-150 $spacing-250;
    margin: 16px 0;
    display: flex;
    flex-direction: column;
    gap: $spacing-150;
    & li {
      transition: all 0.2s ease;
      cursor: pointer;
      @include text-preset-4;
      &:hover {
        @include text-preset-4-bold;
      }
      &.selected {
        @include text-preset-4-bold;
      }
      .divider {
        margin-top: $spacing-150;
        height: 1px;
        background: $grey-100;
      }
      &:last-child .divider {
        display: none;
      }
    }
  }
}
</style>
