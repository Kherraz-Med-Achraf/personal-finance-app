<template>
  <TopSection
    :title="'Transactions'"
    :buttonText="'Add New Budget'"
    :onButtonClick="handleButtonClick"
  />
  <div class="table-container">
    <TabulatorTable
      :data="tableData"
      :columns="tableColumns"
      :options="tableOptions"
      customClass="transactions-table"
    />
  </div>
</template>

<script setup>
import { reactive, onMounted, watch, computed } from "vue";
import TopSection from "@/layouts/TopSection.vue";
import TabulatorTable from "@/utils/TabulatorTable.vue";
import data from "@/data.json"; // Importer les données JSON directement

const tableData = reactive([]);

// Charger toutes les URLs des images du dossier "avatars" avec Vite
const images = import.meta.glob("@/assets/images/avatars/*", {
  eager: true, // Charge immédiatement les fichiers
  as: "url", // Retourne chaque fichier sous forme d'URL
});

function getImageUrl(filepath) {
  // Extraire uniquement le nom de fichier à partir du chemin
  const filename = filepath.split("/").pop();
  return images[`/src/assets/images/avatars/${filename}`] || "";
}

// Préparer les données lors du montage du composant
onMounted(() => {
  tableData.push(
    ...data.transactions.map((transaction) => ({
      recipientSender: {
        avatar: getImageUrl(transaction.avatar),
        name: transaction.name,
      },
      category: transaction.category,
      transactionDate: new Date(transaction.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      amount: transaction.amount.toFixed(2),
      recurring: transaction.recurring,
    }))
  );
});

const tableColumns = reactive([
  {
    title: "Recipient / Sender",
    field: "recipientSender",
    cssClass: "recipient-column",
    widthGrow: 2,
    formatter: (cell) => {
      const { avatar, name } = cell.getValue();
      return `<div style="display: flex; align-items: center;">
                <img src="${avatar}" alt="${name}" style="width: 30px; height: 30px; border-radius: 50%; margin-right: 8px;">
                <span>${name}</span>
              </div>`;
    },
    resizable: true,
  },
  {
    title: "Category",
    field: "category",
    sorter: "string",
    cssClass: "category-column",
    resizable: true,
  },
  {
    title: "Transaction Date",
    field: "transactionDate",
    sorter: "string",
    cssClass: "date-column",
    resizable: true,
  },
  {
    title: "Amount",
    field: "amount",
    sorter: "number",
    hozAlign: "right",
    cssClass: "amount-column",
    resizable: true,
  },
  {
    title: "Recurring",
    field: "recurring",
    sorter: "boolean",
    cssClass: "recurring-column last-column",
    resizable: true,
  },
]);

// Options supplémentaires pour Tabulator
const tableOptions = reactive({
  pagination: "local",
  responsiveLayout: "hide",
  resizableColumnFit: true,
  layout: "fitColumns",
  movableColumns: true,
});

// Définir une réactivité pour ajuster `paginationSize` en fonction de `tableData` et des pages souhaitées
const pagesDesired = 5; // Nombre de pages souhaité

const paginationSize = computed(() => {
  return Math.ceil(tableData.length / pagesDesired);
});

// Observer les changements pour mettre à jour `paginationSize`
watch(
  () => paginationSize.value,
  (newSize) => {
    tableOptions.paginationSize = newSize;
  }
);

const handleButtonClick = () => {
  console.log("Button clicked");
};
</script>

<style lang="scss" scoped>


</style>
