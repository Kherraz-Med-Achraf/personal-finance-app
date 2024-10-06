<template>
    <div class="sidebar-menu">
        <h1>Hello World side</h1>
    </div>
</template>

<script setup>
import { animate } from "@motionone/dom";
import { onMounted } from "vue";

onMounted(() => {
  // Anime l'élément quand le composant est monté
  animate(".sidebar-menu h1", { transform: ["scale(0.5)", "scale(1)"] }, { duration: 1 });
});
</script>

<style lang="scss" scoped>
.sidebar-menu {
    h1 {
        color: #333;
    }
}
</style>