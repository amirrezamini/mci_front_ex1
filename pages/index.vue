<script setup lang="ts">
const { $api } = useNuxtApp();

const loading = ref<boolean>(true);

const users = await $api.user.getUsers().finally(() => {
  loading.value = !loading.value;
});
</script>

<template>
  <v-container>
    <UsersTable :loading="loading" :users="users" />
  </v-container>
</template>
