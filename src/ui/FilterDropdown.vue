<template>
  <div class="filter-dropdown" :style="{ width: controlWidth }" @click="toggleDropdown">
    <div class="dropdown-header" :class="{ open: isOpen }">
      <!-- Affichage sur mobile -->
      <template v-if="isMobile">
        <template v-if="props.icone === 'category'">
          <img :src="CategoryIcon" alt="Category Icon" />
        </template>
        <template v-else-if="props.icone === 'sort'">
          <img :src="SortIcon" alt="Sort Icon" />
        </template>
      </template>
      <!-- Affichage sur desktop -->
      <template v-else>
        {{ selectedLabel || placeholder }}
        <component :is="CaretDown" class="arrow" />
      </template>
    </div>
    <ul v-if="isOpen" class="dropdown-list" :style="{ width: dropdownWidth }">
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
import { ref, computed, onMounted, onUnmounted } from "vue";

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
  icone: {
    type: String,
    default: "",
  },
});

import CaretDown from "@/assets/images/icon-caret-down.svg";
import CategoryIcon from "@/assets/images/icon-filter-mobile.svg?url"; 
import SortIcon from "@/assets/images/icon-sort-mobile.svg?url";

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const internalValue = ref(props.modelValue);

// Variable réactive pour détecter si l'écran est mobile (< 768px)
const isMobile = ref(window.innerWidth < 768);
const updateIsMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  window.addEventListener("resize", updateIsMobile);
});
onUnmounted(() => {
  window.removeEventListener("resize", updateIsMobile);
});

const controlWidth = computed(() => {
  return isMobile.value ? "20px" : props.width;
});


const dropdownWidth = computed(() => {
  if (!isMobile.value) {
    return "100%";
  } else {
    return props.width;
  }
});

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
    padding: 0;
    img {
      width: 100%;
      height: 20px;
    }
    background-color: $white;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .dropdown-list {
    position: absolute;
    top: 100%;
    right: 0;
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
    li {
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

@media (min-width: 768px) {
  .filter-dropdown {
  .dropdown-header {
    padding: $spacing-150 $spacing-250;
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
}
}
</style>
