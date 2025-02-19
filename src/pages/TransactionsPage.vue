<template>
  <TopSection
    :title="'Transactions'"
    :buttonText="'Add New Budget'"
    :onButtonClick="handleButtonClick"
  />

  <div class="table-container">
    <!-- Contrôles de filtrage et tri -->
    <div class="table-controls">
      <!-- Recherche globale -->
      <SearchInput v-model="searchTerm" placeholder="Search transaction" />
      <div class="filtres">
        <div class="filtre">
          <span>Sort by</span>
          <!-- Tri personnalisé -->
          <FilterDropdown
            :options="sortOptions"
            placeholder="Latest"
            v-model="selectedSort"
            width="114px"
          />
        </div>
        <div class="filtre">
          <span>Category</span>
          <!-- Filtre par catégorie -->
          <FilterDropdown
            :options="categoryOptions"
            placeholder="All Transactions"
            v-model="selectedCategory"
            width="177px"
          />
        </div>
      </div>
    </div>

    <!-- GridTable : on lui passe les données calculées et une clé dynamique pour re-render -->
    <GridTable
      :data="computedData"
      :columns="tableColumns"
      :options="tableOptions"
      :key="gridKey"
      customClass="transactions-table"
    />
  </div>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import TopSection from "@/layouts/TopSection.vue";
import GridTable from "../utils/GridTable.vue";
import SearchInput from "@/ui/SearchInput.vue";
import FilterDropdown from "@/ui/FilterDropdown.vue";
import data from "@/data.json";
import { html } from "gridjs";

// Charger les URLs des images du dossier "avatars" avec Vite
const images = import.meta.glob("@/assets/images/avatars/*", {
  eager: true,
  query: "?url",
  import: "default",
});

function getImageUrl(filepath) {
  const filename = filepath.split("/").pop();
  return images[`/src/assets/images/avatars/${filename}`] || "";
}

// Définition des colonnes pour Grid.js : on doit fournir un identifiant (id) pour chaque colonne
const tableColumns = [
  {
    id: "recipient",
    name: "Recipient / Sender",
    formatter: (cell) =>
      html(`
        <div class="recipient-info">
          <img src="${getImageUrl(cell.avatar)}" alt="${cell.name}">
          <span>${cell.name}</span>
        </div>
      `),
  },
  {
    id: "category",
    name: "Category",
    className: "column-info",
  },
  {
    id: "date",
    name: "Transaction Date",
    className: "column-info",
  },
  {
    id: "amount",
    name: "Amount",
    className: "column-amount",
    formatter: (cell) => {
      const amountClass = cell >= 0 ? "positive" : "negative";
      return html(`<span class="${amountClass}">${cell}</span>`);
    },
  },
];

// Préparer les données sous forme d'objets pour faciliter le filtrage/tri
const tableData = reactive(
  data.transactions.map((transaction) => ({
    recipient: { avatar: transaction.avatar, name: transaction.name },
    category: transaction.category,
    date: transaction.date.split("T")[0],
    amount: transaction.amount,
  }))
);

// Options de Grid.js (elles seront fusionnées dans GridTable)
const tableOptions = {
  pagination: {
    enabled: true,
    limit: 5,
  },
  sort: false,
  resizable: false,
};

// États réactifs pour les filtres et le tri
const searchTerm = ref("");
const selectedCategory = ref("");
const selectedSort = ref("latest");

// Options pour le dropdown de catégorie (générées dynamiquement)
const categoryOptions = computed(() => {
  const cats = tableData.map((item) => item.category);
  const uniqueCats = [...new Set(cats)];
  return [
    { value: "", label: "All Transactions" },
    ...uniqueCats.map((cat) => ({ value: cat, label: cat })),
  ];
});

// Options de tri
const sortOptions = [
  { value: "latest", label: "Latest" },
  { value: "oldest", label: "Oldest" },
  { value: "aToZ", label: "A to Z" },
  { value: "zToA", label: "Z to A" },
  { value: "highest", label: "Highest" },
  { value: "lowest", label: "Lowest" },
];

// Calculer les données filtrées et triées
const computedData = computed(() => {
  // Filtrage
  let filtered = tableData.filter((item) => {
    const term = searchTerm.value.trim().toLowerCase();
    let matchesSearch = true;
    if (term) {
      const name = item.recipient.name.toLowerCase();
      const category = item.category.toLowerCase();
      const date = item.date;
      const amount = item.amount.toString();
      matchesSearch =
        name.includes(term) ||
        category.includes(term) ||
        date.includes(term) ||
        amount.includes(term);
    }
    const matchesCategory = selectedCategory.value
      ? item.category === selectedCategory.value
      : true;
    return matchesSearch && matchesCategory;
  });

  // Tri
  filtered.sort((a, b) => {
    switch (selectedSort.value) {
      case "latest":
        return new Date(b.date) - new Date(a.date);
      case "oldest":
        return new Date(a.date) - new Date(b.date);
      case "aToZ":
        return a.recipient.name.localeCompare(b.recipient.name);
      case "zToA":
        return b.recipient.name.localeCompare(a.recipient.name);
      case "highest":
        return b.amount - a.amount;
      case "lowest":
        return a.amount - b.amount;
      default:
        return 0;
    }
  });

  return filtered;
});

// Une clé dynamique afin de forcer le re‑render de GridTable à chaque changement
const gridKey = computed(
  () => `${selectedCategory.value}-${selectedSort.value}-${searchTerm.value}`
);

// Exemple de fonction pour le bouton du TopSection
function handleButtonClick() {
  console.log("Ajouter un nouveau budget");
}
</script>

<style lang="scss" scoped>
.table-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 24px;
  background-color: $white;
  padding: 32px;
  border-radius: 12px;
  .table-controls {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .filtres {
      display: flex;
      align-items: center;
      gap: 24px;
      .filtre {
        display: flex;
        align-items: center;
        gap: 8px;
        span {
          @include text-preset-4;
          color: $grey-500;
        }
      }
    }

    input {
      padding: 0.5rem;
      font-size: 1rem;
    }
  }
}
</style>
