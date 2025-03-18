<template>
  <div :id="gridId" :class="customClass" :key="gridKey"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { Grid } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import CaretRightIcon from "@/assets/images/icon-caret-right.svg?url";
import CaretLeftIcon from "@/assets/images/icon-caret-left.svg?url";

const props = defineProps({
  data: { type: Array, required: true },
  columns: { type: Array, required: true },
  options: { type: Object, default: () => ({}) },
  customClass: { type: String, default: "" },
});

// Génère un id unique pour le conteneur
const gridId = "gridjs-container-" + Math.random().toString(36).slice(2, 11);

// Options par défaut pour Grid.js
const defaultOptions = {
  pagination: { enabled: true, limit: 5 },
  sort: true,
  resizable: true,
};

// Ref pour détecter l'état mobile et pour forcer le remount du conteneur
const isMobile = ref(window.innerWidth < 768);
const gridKey = ref(0);

let gridInstance = null;
let mutationObserver = null;

// Retourne les colonnes en fonction de la taille de l'écran
const getGridColumns = () => {
  return isMobile.value
    ? [props.columns[0], props.columns[props.columns.length - 1]]
    : props.columns;
};

// Configure l'observateur pour customiser les boutons de pagination
const setupMutationObserver = () => {
  const container = document.getElementById(gridId);
  if (!container) return;
  if (mutationObserver) {
    mutationObserver.disconnect();
  }
  mutationObserver = new MutationObserver(() => {
    const prevButtons = container.querySelectorAll('button[title="Previous"]');
    const nextButtons = container.querySelectorAll('button[title="Next"]');

    mutationObserver.disconnect();
    prevButtons.forEach((btn) => {
      isMobile ? btn.innerHTML = `<img src="${CaretLeftIcon}" alt="Previous" />` : btn.innerHTML = `<img src="${CaretLeftIcon}" alt="Previous" /> Prev` ;
    });
    nextButtons.forEach((btn) => {
      isMobile ? btn.innerHTML = `<img src="${CaretRightIcon}" alt="Next" />` : btn.innerHTML = `Next <img src="${CaretRightIcon}" alt="Next" />`;
    });

    mutationObserver.observe(container, {
      childList: true,
      subtree: true,
    });
  });
  mutationObserver.observe(container, {
    childList: true,
    subtree: true,
  });
};

// Fonction d'initialisation/recréation de la grille
const initGrid = () => {
  const container = document.getElementById(gridId);
  if (!container) return;

  // Détruire l'instance précédente si possible
  if (gridInstance && typeof gridInstance.destroy === "function") {
    gridInstance.destroy();
  }

  // Nettoyage complet du conteneur
  container.innerHTML = "";

  const gridOptions = {
    ...defaultOptions,
    ...props.options,
    columns: getGridColumns(),
    data: props.data,
  };

  gridInstance = new Grid(gridOptions).render(container);
  setupMutationObserver();
};

// Gestion du redimensionnement avec nextTick pour attendre la mise à jour du DOM
const handleResize = async () => {
  const currentIsMobile = window.innerWidth < 768;
  if (currentIsMobile !== isMobile.value) {
    isMobile.value = currentIsMobile;
    gridKey.value++; // Forcer Vue à remonter le conteneur
    await nextTick(); // Attendre que le DOM soit mis à jour
    initGrid();
  }
};

onMounted(() => {
  initGrid();
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  if (mutationObserver) mutationObserver.disconnect();
  if (gridInstance && typeof gridInstance.destroy === "function") {
    gridInstance.destroy();
  }
});
</script>

<style lang="scss" scoped>
.transactions-table {
  width: 100%;
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
    // border-bottom: 1px solid $grey-100;
    border-bottom: 1px solid black;
    height: 72px;
    &:last-child {
      border-bottom: none;
    }
  }

  // Cellules
  :deep(.gridjs-td) {
    border: none;
    color: $grey-500;
  }

  :deep(.gridjs-th),
  :deep(.gridjs-td) {
    &:last-child {
      text-align: right;
    }
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
    padding: 0;
    &:last-child {
      text-align: right;
    }
  }
  :deep(.gridjs-td) {
    &:last-child {
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
      @include text-preset-4;
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
      &[title="Previous"],
      &[title="Next"] {
        width: 96px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 16px;
        img {
          width: 11px;
          height: 11px;
        }
      }
    }
  }

  // Styles pour le tableau sur mobile
  &-mobile {
    width: 100%;
    // Container
    :deep(.gridjs-container) {
      padding: 0;
    }

    // En-têtes
    :deep(.gridjs-thead) {
      display: none;
    }

    // Lignes : ajout d'une bordure inférieure pour chaque ligne
    :deep(.gridjs-tr) {
      border-bottom: 1px solid $grey-100;
      min-height: 43px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;
      &:first-child {
        padding: 0 0 16px 0;
      }
      &:last-child {
        border-bottom: none;
      }
    }

    // Cellules
    :deep(.gridjs-td) {
      border: none;
      color: $grey-500;
      padding: 0;
    }

    // Contenu spécifique du recipient (première colonne)
    :deep(.recipient-info) {
      display: flex;
      align-items: center;
      gap: $spacing-150;

      img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }
      .info {
        display: flex;
        flex-direction: column;
        gap: $spacing-50;
        .name {
          @include text-preset-4-bold;
          color: $grey-900;
        }
        .category {
          @include text-preset-5;
          color: $grey-500;
        }
      }
    }

    // Contenu spécifique des détails (deuxième colonne)
    :deep(.details) {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: $spacing-50;
      width: fit-content;
      .amount {
        @include text-preset-4-bold;
        color: $grey-900;
        &.positive {
          color: $green;
          font-weight: bold;
        }
      }
      .date {
        @include text-preset-5;
        color: $grey-500;
      }
    }

    // Footer
    :deep(.gridjs-footer) {
      border-top: none;
      box-shadow: none;
      width: 100%;
      padding: 0;
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
      @include text-preset-4;
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
      &[title="Previous"],
      &[title="Next"] {
        width: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 16px;
        img {
          width: 11px;
          height: 11px;
        }
      }
    }
  }
  }
}
</style>
