<template>
  <div :class="customClass" ref="tabulatorTable"></div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";

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
    default: "", // Classe personnalisée
  },
});

const tabulatorTable = ref(null);
let tabulatorInstance = null;

const initializeTable = () => {
  if (tabulatorInstance) {
    tabulatorInstance.destroy(); // Détruire l'instance précédente pour éviter les doublons
  }
  tabulatorInstance = new Tabulator(tabulatorTable.value, {
    data: props.data,
    columns: props.columns,
    ...props.options,
  });
};

onMounted(() => {
  initializeTable();
});

// Réinitialiser Tabulator à chaque changement de données ou colonnes
watch(
  () => [props.data, props.columns],
  () => {
    initializeTable();
  },
  { deep: true }
);
</script>
<style lang="scss" scoped>
.transactions-table {
  width: 100%;
  height: 100%;
}
</style>
