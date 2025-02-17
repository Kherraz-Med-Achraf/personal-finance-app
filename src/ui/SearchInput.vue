<template>
  <div class="search-input">
    <input
      type="text"
      v-model="searchTerm"
      :placeholder="placeholder"
      @input="emit('update:modelValue', searchTerm)"
    />
    <component :is="SearchIcon" class="icon" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: "Rechercher...",
  },
});

import SearchIcon from "@/assets/images/icon-search.svg";

const emit = defineEmits(["update:modelValue"]);
const searchTerm = ref(props.modelValue);
</script>

<style scoped lang="scss">
.search-input {
  display: flex;
  align-items: center;
  border: 1px solid $beige-500;
  border-radius: 8px;
  padding: $spacing-150 $spacing-250;
  width: 100%;
  max-width: 320px;
  background-color: $white;
  position: relative;
  transition: all 0.2s;
  &:hover {
    border-color: $grey-900;
  }
  &::placeholder {
    color: $grey-500;
  }
  input {
    flex: 1;
    border: none;
    outline: none;
    @include text-preset-4;
    color: $grey-900;
  }

  .icon {
    position: absolute;
    right: 20px;
    height: 16px;
    width: 16px;
    fill: $grey-900;
    cursor: pointer;
  }
}
</style>
