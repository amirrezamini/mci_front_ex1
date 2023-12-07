<script setup lang="ts">
const drawer = ref<boolean>(false);

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};
</script>

<template>
  <v-app>
    <v-layout :full-height="true">
      <header-component @click="toggleDrawer()" />
      <v-main>
        <sidebar-component :drawer="drawer" />
        <slot />
      </v-main>
    </v-layout>
  </v-app>
</template>
