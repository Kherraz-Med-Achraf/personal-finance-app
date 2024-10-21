<template>
  <TopSection
    :title="'Transactions'"
    :buttonText="'+ Add New Budget'"
    :onButtonClick="handleButtonClick"
  />
  <div>
    <TabulatorTable :data="tableData" :columns="tableColumns" :options="tableOptions" />
  </div>
</template>

<script setup>
import { reactive } from "vue";
import TopSection from "@/layouts/TopSection.vue";
import TabulatorTable from "@/utils/TabulatorTable.vue";


// Définir les données du tableau
const tableData = reactive([
  { id: 1, name: "John", age: 28, city: "New York" },
  { id: 2, name: "Jane", age: 35, city: "San Francisco" },
  { id: 3, name: "Alice", age: 24, city: "Los Angeles" },
]);

// Définir les colonnes
const tableColumns = reactive([
  { title: "ID", field: "id", sorter: "number" },
  { title: "Name", field: "name", sorter: "string" },
  { title: "Age", field: "age", sorter: "number" },
  { title: "City", field: "city", sorter: "string" },
]);

// Options supplémentaires pour Tabulator
const tableOptions = reactive({
  pagination: "local",
  paginationSize: 5,
});


const handleButtonClick = () => {
  console.log('Button clicked');
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  h1 {
    color: #333;
  }
}
</style>
