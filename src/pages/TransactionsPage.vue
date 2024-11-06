<template>
  <TopSection
    :title="'Transactions'"
    :buttonText="'Add New Budget'"
    :onButtonClick="handleButtonClick"
  />
  <TabulatorTable
    :data="tableData"
    :columns="tableColumns"
    :options="tableOptions"
    customClass="transactions-table"
  />
</template>

<script setup>
import { reactive, onMounted, watch, computed } from "vue";
import TopSection from "@/layouts/TopSection.vue";
import TabulatorTable from "@/utils/TabulatorTable.vue";
import data from "@/data.json"; // Importer les données JSON directement
import { useMenuStore } from "@/stores/menuStore";
import { animate } from "@motionone/dom";

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
    widthGrow: 10, // Permet à cette colonne de s'étirer davantage
    formatter: (cell) => {
      const { avatar, name } = cell.getValue();
      return `<div style="display: flex; align-items: center; width: 100%;">
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
    width: 150,
    resizable: false,
  },
  {
    title: "Transaction Date",
    field: "transactionDate",
    sorter: "string",
    cssClass: "date-column",
    width: 150, 
    resizable: false, 
  },
  {
    title: "Amount",
    field: "amount",
    sorter: "number",
    hozAlign: "right",
    cssClass: "amount-column",
    width: 150, 
    resizable: false,
  },
  {
    title: "Recurring",
    field: "recurring",
    sorter: "boolean",
    cssClass: "recurring-column last-column",
   
    resizable: false, 
  },
]);

const tableOptions = reactive({
  pagination: "local",
  resizableColumnFit: false,
  layout: "fitColumns", 
  movableColumns: true,
  autoResize: false, // Garder autoResize à false pour gérer manuellement le redimensionnement
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
