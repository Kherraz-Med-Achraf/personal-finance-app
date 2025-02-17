<template>
  <TopSection
    :title="'Transactions'"
    :buttonText="'Add New Budget'"
    :onButtonClick="handleButtonClick"
  />

  <!-- Contrôles de filtrage et tri -->
  <div class="table-controls">
    <!-- Recherche globale -->
    <SearchInput v-model="searchTerm" placeholder="Chercher une moto..." />

    <!-- Filtre par catégorie -->
    <FilterDropdown
      :options="categoryOptions"
      placeholder="All Transactions"
      v-model="selectedCategory"
      width="250px"
    />

    <!-- Tri personnalisé -->
    <FilterDropdown
      :options="sortOptions"
      placeholder="Latest"
      v-model="selectedSort"
      width="177px"
    />
  </div>

  <!-- GridTable : on lui passe les données calculées et une clé dynamique pour re-render -->
  <GridTable
    :data="computedData"
    :columns="tableColumns"
    :options="tableOptions"
    :key="gridKey"
    customClass="transactions-table"
  />
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
        <div style="display: flex; align-items: center;">
          <img src="${getImageUrl(cell.avatar)}" alt="${
        cell.name
      }" style="width: 30px; height: 30px; border-radius: 50%; margin-right: 10px;">
          ${cell.name}
        </div>
      `),
  },
  {
    id: "category",
    name: "Category",
  },
  {
    id: "date",
    name: "Transaction Date",
  },
  {
    id: "amount",
    name: "Amount",
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
  sort: true,
  resizable: true,
  style: {
    table: {
      border: "1px solid #ccc",
    },
  },
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
.table-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;

  input {
    padding: 0.5rem;
    font-size: 1rem;
  }
}
</style>
