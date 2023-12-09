<script setup lang="ts">
const { $api } = useNuxtApp();

const loading = ref<boolean>(true);
const dialog = ref<boolean>(false);
const filterEnabled = ref<boolean>(false);
const inputs = ref<Input[]>([]);
const records = ref<number>(10);
const page = ref<number>(1);

const users = ref<User[]>([]);
await $api.user
  .getUsers()
  .then((value: User[]) => {
    users.value = value;
  })
  .finally(() => {
    loading.value = !loading.value;
  });

const toggleDialog = () => (dialog.value = !dialog.value);
const resetPage = () => (page.value = 1);
const searchUser = (_inputs: Input[]) => {
  dialog.value = !dialog.value;

  resetPage();

  inputs.value = _inputs;
  filterEnabled.value = true;
};

const filteredUsers = computed(() => {
  if (filterEnabled.value) {
    const i = inputs.value;

    const { condition, value } = i[0];
    const nameEnabled: boolean = !!i[1];
    const cityEnabled: boolean = !!i[2];

    return users.value.filter((user) => {
      if (condition === "=") {
        return user.id === +value;
      } else if (cityEnabled) {
        return condition === "<"
          ? user.id < +value
          : user.id > +value &&
              user.name.toLowerCase() === i[1].value.toLowerCase() &&
              user.city.toLowerCase() === i[2].value.toLowerCase();
      } else if (nameEnabled) {
        return condition === "<"
          ? user.id < +value
          : user.id > +value &&
              user.name.toLowerCase() === i[1].value.toLowerCase();
      } else {
        return condition === "<" ? user.id < +value : user.id > +value;
      }
    });
  }

  return users.value;
});
const length = computed(() =>
  Math.ceil(filteredUsers.value.length / records.value),
);
</script>

<template>
  <v-container>
    <v-btn
      v-if="filterEnabled"
      prepend-icon="mdi-close"
      rounded
      color="#5865f2"
      variant="flat"
      @click="filterEnabled = false"
    >
      Click to remove filter
    </v-btn>

    <users-table :users="filteredUsers" :page="page" :records="records">
      <td>
        <div class="d-inline-flex">
          <v-select
            id="records"
            v-model="records"
            :disabled="loading"
            :hide-details="true"
            :items="[10, 25, 100]"
            density="compact"
            name="records"
            variant="outlined"
            @update:model-value="resetPage()"
          />
          <v-label for="records" text="Records per page" class="ms-2" />
        </div>
      </td>
      <td class="pa-0">
        <div class="d-inline-flex">
          <v-pagination
            v-model="page"
            :disabled="loading"
            density="compact"
            rounded
            :length="length"
            :total-visible="4"
          />
        </div>
      </td>
      <td>
        <v-tooltip text="Filter">
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              :disabled="loading"
              icon="mdi-filter"
              variant="text"
              @click="toggleDialog()"
            />
          </template>
        </v-tooltip>
      </td>
    </users-table>

    <v-dialog
      v-model="dialog"
      content-class="bg-white rounded pa-4"
      width="500"
    >
      <filters-dialog @search-user="searchUser($event)" />
    </v-dialog>
  </v-container>
</template>
