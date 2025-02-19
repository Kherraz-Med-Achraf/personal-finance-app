<template>
  <div :id="gridId" :class="customClass"></div>
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

// Génération d'un id unique pour chaque instance
const gridId = "gridjs-container-" + Math.random().toString(36).slice(2, 11);

const defaultOptions = {
  pagination: {
    enabled: true,
    limit: 5,
  },
  sort: true,
  resizable: true,
};

onMounted(() => {
  // Fusion des options par défaut et des options passées en prop
  const gridOptions = {
    ...defaultOptions,
    ...props.options, // les options du parent écrasent celles par défaut
    columns: props.columns,
    data: props.data,
  };

  new Grid(gridOptions).render(document.getElementById(gridId));
});
</script>

<style lang="scss" scoped>
.transactions-table {
  // Container
  :deep(.gridjs-container) {
    padding: 0;
  }

  // Table
  :deep(.gridjs-table) {
    border: none;
    border-collapse: collapse;
  }

  // En-têtes
  :deep(.gridjs-th) {
    @include text-preset-5;
    color: $grey-500;
    border: none;
    background-color: $white;
  }

  :deep(.gridjs-td) {
    border: none;
    background-color: $white;
  }

  // Lignes : ajout d'une bordure inférieure pour chaque ligne
  :deep(.gridjs-tr) {
    border-bottom: 1px solid $grey-100;
  }

  // Contenu spécifique du recipient (première colonne)
  :deep(.recipient-info) {
    display: flex;
    align-items: center;
    gap: 16px;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    span {
      @include text-preset-4-bold;
      color: $grey-900;
    }
  }

  // Styles spécifiques aux colonnes 2 et 3 (category et date)
  :deep(.gridjs-th.column-info),
  :deep(.gridjs-td.column-info) {
    background-color: #fff;
    padding: 12px;
    text-align: left;
  }

  // Styles pour la colonne 4 (amount)
  :deep(.gridjs-th.column-amount),
  :deep(.gridjs-td.column-amount) {
    background-color: #fff;
    padding: 12px;
    text-align: right;
  }

  // Styles pour les montants positifs et négatifs
  :deep(.positive) {
    color: green;
    font-weight: bold;
  }
  :deep(.negative) {
    color: red;
    font-weight: bold;
  }
}
</style>
