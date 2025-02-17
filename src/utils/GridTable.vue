<template>
  <div id="gridjs-container" :class="customClass"></div>
</template>

<script setup>
import { onMounted } from "vue";
import { Grid } from "gridjs";
import "gridjs/dist/theme/mermaid.css";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  options: {
    type: Object,
    default: () => ({}),
  },
  customClass: {
    type: String,
    default: "",
  },
});

// Valeurs par défaut
const defaultOptions = {
  pagination: {
    enabled: true,
    limit: 5,
  },
  sort: true,
  resizable: true,
  style: {
    table: {
      border: "1px solid #ccc",
    },
  },
};

onMounted(() => {
  // Fusion des options par défaut avec celles du parent
  const gridOptions = {
    ...defaultOptions,
    ...props.options, // Les options du parent écrasent celles par défaut
    columns: props.columns,
    data: props.data,
  };

  new Grid(gridOptions).render(document.getElementById("gridjs-container"));
});
</script>
<style lang="scss" scoped>
</style>
