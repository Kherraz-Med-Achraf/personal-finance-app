<template>
    <button @click="handleClick">{{ text }}</button>
  </template>
  
  <script setup>
  const props = defineProps({
    text: {
      type: String,
      required: true,
    },
    onClick: {
      type: Function,
      required: true,
    },
  });
  
  const handleClick = () => {
    if (typeof props.onClick === 'function') {
      props.onClick();
    }
  };
  </script>
  
  <style lang="scss" scoped>
  button {
    cursor: pointer;
    @include text-preset-4-bold;
    color: $white;
    background-color: $grey-900;
    padding: $spacing-200;
    border-radius: $spacing-100;
    border: none;
    transition: all 0.3s ease;
    &:hover {
      background-color: $grey-500;
    } 
  }
  </style>
  