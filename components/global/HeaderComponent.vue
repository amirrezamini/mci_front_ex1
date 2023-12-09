<script setup lang="ts">
interface Emits {
  (e: "click"): void;
}

const emits = defineEmits<Emits>();
</script>

<template>
  <v-app-bar flat :border="true">
    <template #prepend>
      <v-app-bar-nav-icon @click="emits('click')" />
    </template>
    <template #append>
      <v-avatar image="/memoji.png" size="40" />
    </template>
  </v-app-bar>
</template>
