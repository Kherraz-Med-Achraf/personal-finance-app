<template>
    <div class="top-section">
      <h1>{{ title }}</h1>
      <button @click="handleClick">{{ buttonText }}</button>
    </div>
  </template>
  
  <script setup>
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
  
  <style scoped>
  .top-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  </style>
  