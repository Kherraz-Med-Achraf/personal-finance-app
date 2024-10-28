<template>
    <div class="top-section">
      <h1>{{ title }}</h1>
      <UiButton v-if="buttonText" :text="buttonText" :onClick="handleClick" />
    </div>
  </template>
  
  <script setup>
  import UiButton from '@/ui/UiButton.vue';


  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
    onButtonClick: {
      type: Function,
      required: true,
    },
  });
  
  const handleClick = () => {
    if (typeof props.onButtonClick === 'function') {
      props.onButtonClick();
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .top-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 56px;
    padding: $spacing-100 0;
    h1 {
      @include text-preset-1;
      color: $grey-900;
    }
  }
  </style>
  