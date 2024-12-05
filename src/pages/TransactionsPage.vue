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
import { Grid, html } from "gridjs";


// Charger toutes les URLs des images du dossier "avatars" avec Vite
const images = import.meta.glob("@/assets/images/avatars/*", {
  eager: true, // Charge immédiatement les fichiers
  query: "?url", // Utilise la nouvelle syntaxe pour récupérer les URLs
  import: "default", // Importer les fichiers en tant qu'URLs par défaut
});

function getImageUrl(filepath) {
  // Extraire uniquement le nom de fichier à partir du chemin
  const filename = filepath.split("/").pop();
  return images[`/src/assets/images/avatars/${filename}`] || "";
}

const tableColumns = [
  {
    name: "Recipient / Sender",
    formatter: (_, row) =>
      html(`
        <div style="display: flex; align-items: center;">
          <img src="${getImageUrl(row.cells[0].data)}" alt="${
        row.cells[1].data
      }" style="width: 30px; height: 30px; border-radius: 50%; margin-right: 10px;">
          ${row.cells[1].data}
        </div>
      `),
  },
  "Category",
  "Transaction Date",
  "Amount",
];

const tableData = reactive(
  data.transactions.map((transaction) => [
    transaction.avatar, // URL de l'avatar
    transaction.name, // Nom
    transaction.category, // Catégorie
    transaction.date.split("T")[0], // Date (partie uniquement)
    transaction.amount, // Montant
  ])
);
</script>

<style lang="scss" scoped></style>
