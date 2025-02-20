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
    @include text-preset-5;
  }

  // En-têtes
  :deep(.gridjs-th) {
    color: $grey-500;
    border: none;
    background-color: $white;
  }

  // Lignes : ajout d'une bordure inférieure pour chaque ligne
  :deep(.gridjs-tr) {
    border-bottom: 1px solid $grey-100;
    &:last-child {
      border-bottom: none;
    }
  }

  // Cellules
  :deep(.gridjs-td) {
    border: none;
    color: $grey-500;
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

  // Styles pour la colonne 4 (amount)
  :deep(.gridjs-th),
  :deep(.gridjs-td) {
    &:nth-child(4) {
      text-align: right;
    }
  }
  :deep(.gridjs-td) {
    &:nth-child(4) {
      @include text-preset-4-bold;
    }
  }

  // Styles pour les montants positifs et négatifs
  :deep(.positive) {
    color: $green;
    font-weight: bold;
  }
  :deep(.negative) {
    color: $grey-900;
    font-weight: bold;
  }

  // Footer
  :deep(.gridjs-footer) {
    border-top: none;
    box-shadow: none;
  }

  :deep(.gridjs-pages) {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    button {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      padding: 0;
      border-right: unset;
      border: 1px solid $beige-500;
      &.gridjs-currentPage {
        background-color: $grey-900;
        color: $white;
      }
      &:focus {
        outline: none;
        box-shadow: none;
        margin: 0;
      }
      &:first-child {
        margin-right: auto;
      }
      &:last-child {
        margin-left: auto;
      }
    }
  }
}
</style>
