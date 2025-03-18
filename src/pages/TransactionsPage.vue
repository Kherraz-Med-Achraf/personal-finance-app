<template>
  <TopSection
    :title="'Transactions'"
    :buttonText="'Add New Budget'"
    :onButtonClick="
      () => {
        console.log('Add new budget');
      }
    "
  />

  <div class="table-container">
    <!-- Contrôles de filtrage et de tri -->
    <div class="table-controls">
      <SearchInput v-model="searchTerm" placeholder="Search transaction" />
      <div class="filtres">
        <div class="filtre">
          <span>Sort by</span>
          <FilterDropdown
            :options="sortOptions"
            placeholder="Latest"
            v-model="selectedSort"
            width="114px"
            icone="sort"
          />
        </div>
        <div class="filtre">
          <span>Category</span>
          <FilterDropdown
            :options="categoryOptions"
            placeholder="All Transactions"
            v-model="selectedCategory"
            width="177px"
            icone="category"
          />
        </div>
      </div>
    </div>

    <!-- VERSION DESKTOP -->
    <div v-if="!isMobile" class="table-desktop">
      <GridTable
        :data="desktopData"
        :columns="tableColumns"
        :options="tableOptions"
        :key="gridKey"
        customClass="transactions-table"
      />
    </div>

    <!-- VERSION MOBILE -->
    <div v-else class="table-mobile">
      <GridTable
        :data="mobileData"
        :columns="mobileColumns"
        :options="mobileTableOptions"
        :key="gridKey + '-mobile'"
        customClass="transactions-table-mobile"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted, onBeforeUnmount } from "vue";
import TopSection from "@/layouts/TopSection.vue";
import GridTable from "../utils/GridTable.vue";
import SearchInput from "@/ui/SearchInput.vue";
import FilterDropdown from "@/ui/FilterDropdown.vue";
import data from "@/data.json";
import { html } from "gridjs";

// Détecter mobile vs desktop
const isMobile = ref(false);

function handleResize() {
  isMobile.value = window.innerWidth < 768;
}

onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});

// États pour la recherche, tri, etc.
const searchTerm = ref("");
const selectedCategory = ref("");
const selectedSort = ref("latest");

// Charger les images depuis le dossier avatars
const images = import.meta.glob("@/assets/images/avatars/*", {
  eager: true,
  query: "?url",
  import: "default",
});

function getImageUrl(filepath) {
  const filename = filepath.split("/").pop();
  return images[`/src/assets/images/avatars/${filename}`] || "";
}

// Colonnes de la version DESKTOP
const tableColumns = [
  {
    id: "recipient",
    name: "Recipient / Sender",
    formatter: (cell) =>
      html(`
        <div class="recipient-info">
          <img src="${getImageUrl(cell.avatar)}" alt="${cell.name}" />
          <span>${cell.name}</span>
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
    formatter: (cell) => {
      const amountClass = cell >= 0 ? "positive" : "negative";
      const sign = cell >= 0 ? "+" : "-";
      return html(
        `<span class="${amountClass}">${sign}$${Math.abs(cell)}</span>`
      );
    },
  },
];

// Colonnes de la version MOBILE
const mobileColumns = [
  {
    id: "info", // regroupera recipient.name + category
    name: "",
    formatter: (cell) => {
      return html(`
        <div class="recipient-info">
          <img src="${getImageUrl(cell.avatar)}" alt="${cell.name}" />
          <div class="info">
            <span class="name">${cell.name}</span>
            <span class="category">${cell.category}</span>
          </div>
        </div>
      `);
    },
  },
  {
    id: "details", // regroupera date + amount
    name: "",
    formatter: (cell) => {
      const amountClass = cell.amount >= 0 ? "positive" : "negative";
      const sign = cell.amount >= 0 ? "+" : "-";
      return html(`
        <div class="details">
          <span class="amount ${amountClass}">
            ${sign}$${Math.abs(cell.amount)}
          </span>
          <span class="date">${cell.date}</span>
        </div>
      `);
    },
  },
];

// Options de la table
const tableOptions = {
  pagination: {
    enabled: true,
    limit: 5,
    summary: false,
    buttonsCount: 3,
  },
  sort: false,
  resizable: false,
};

// Pour la version mobile
const mobileTableOptions = {
  ...tableOptions,
  pagination: {
    ...tableOptions.pagination,
    buttonsCount: 2,
  },
};

// Liste des catégories (pour le filtre)
const categoryOptions = computed(() => {
  const cats = data.transactions.map((item) => item.category);
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

// Données filtrées et triées (communes à desktop et mobile)
const computedData = computed(() => {
  let filtered = data.transactions.filter((item) => {
    const term = searchTerm.value.trim().toLowerCase();
    let matchesSearch = true;
    if (term) {
      const avatar =
        typeof item.avatar === "string" ? item.avatar.toLowerCase() : "";
      const name = item.name.toLowerCase();
      const category = item.category.toLowerCase();
      const date = item.date;
      const amount = item.amount.toString();
      matchesSearch =
        avatar.includes(term) ||
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
        return a.name.localeCompare(b.name);
      case "zToA":
        return b.name.localeCompare(a.name);
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

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

// Préparation des données version desktop
const desktopData = computed(() => {
  return computedData.value.map((transaction) => ({
    recipient: {
      avatar: transaction.avatar,
      name: transaction.name,
    },
    category: transaction.category,
    date: formatDate(transaction.date),
    amount: transaction.amount,
  }));
});

// Préparation des données version mobile
const mobileData = computed(() => {
  return computedData.value.map((transaction) => ({
    info: {
      avatar: transaction.avatar,
      name: transaction.name,
      category: transaction.category,
    },
    details: {
      date: formatDate(transaction.date),
      amount: transaction.amount,
    },
  }));
});

// Clé dynamique (pour forcer le re-render)
const gridKey = computed(() => {
  return `${selectedCategory.value}-${selectedSort.value}-${searchTerm.value}`;
});
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
  padding: $spacing-300 $spacing-250;
  border-radius: 12px;
  .table-controls {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    .filtres {
      display: flex;
      align-items: center;
      gap: 24px;
      .filtre {
        display: flex;
        align-items: center;
        gap: 8px;
        span {
          display: none;
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
  .table-mobile {
    width: 100%;
  }
}

@media (min-width: 768px) {
  .table-container {
    .table-controls {
      .filtres {
        .filtre {
          span {
            display: block;
          }
        }
      }
    }
  }
}
</style>
