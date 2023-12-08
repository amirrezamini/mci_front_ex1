<script setup lang="ts">
const { $api } = useNuxtApp();

const loading = ref<boolean>(true);
const users = ref<User[]>([]);
const dialog = ref<boolean>(false);

await $api.user
  .getUsers()
  .then((value: User[]) => {
    users.value = value;
  })
  .finally(() => {
    loading.value = !loading.value;
  });

const toggleDialog = () => {
  dialog.value = !dialog.value;
};

const search = (inputs: Input[]) => {
  console.log(inputs);
};
</script>

<template>
  <v-container>
    <users-table :loading="loading" :users="users" @click="toggleDialog()" />
    <v-dialog
      v-model="dialog"
      content-class="filters-dialog bg-white rounded pa-4"
      width="500"
    >
      <filters-dialog @search="search($event)" />
    </v-dialog>
  </v-container>
</template>

<style lang="scss"></style>
