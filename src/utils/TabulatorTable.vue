<template>
    <div ref="tabulatorTable"></div>
  </template>
  
  <script setup>
  import { onMounted, ref } from "vue";
  import { TabulatorFull as Tabulator } from "tabulator-tables"; // Import nommé de Tabulator
  import "tabulator-tables/dist/css/tabulator.min.css"; // Importation des styles Tabulator
  
  // Props pour recevoir les données et les colonnes
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
  });
  
  // Ref pour le tableau Tabulator
  const tabulatorTable = ref(null);
  
  // Initialisation du tableau avec Tabulator lors du montage du composant
  onMounted(() => {
    new Tabulator(tabulatorTable.value, {
      data: props.data, // Les données à afficher
      columns: props.columns, // Les colonnes du tableau
      ...props.options, // Options supplémentaires passées par les props
    });
  });
  </script>
  
  <style scoped>
  /* Ajoute des styles personnalisés si nécessaire */
  </style>
  