<script setup lang="ts">
interface Props {
  loading: boolean;
  users: User[];
}

const p = withDefaults(defineProps<Props>(), {
  loading: true,
  users: () => [],
});

const headers: string[] = ["Id", "Name", "City"];
const records = ref<number>(10);
const page = ref<number>(1);
const length = ref<number>(10);

watch(
  records,
  (value: number) => {
    length.value = Math.ceil(p.users.length / value);
  },
  { immediate: true },
);

const filteredUsers = computed(() =>
  p.users.slice((page.value - 1) * records.value, page.value * records.value),
);
</script>

<template>
  <v-table :hover="true">
    <thead>
      <tr>
        <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, index) in filteredUsers" :key="index">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.city }}</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td>
          <div class="d-inline-flex">
            <v-select
              id="records"
              v-model="records"
              :disabled="p.loading"
              density="compact"
              :hide-details="true"
              :items="[10, 25, 100]"
              name="records"
              variant="outlined"
            ></v-select>
            <v-label for="records" text="Records per page" class="ms-2" />
          </div>
        </td>
        <td class="pa-0">
          <div class="d-inline-flex">
            <v-pagination
              v-model="page"
              :disabled="p.loading"
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
                :disabled="p.loading"
                icon="mdi-filter"
                variant="text"
              />
            </template>
          </v-tooltip>
        </td>
      </tr>
    </tfoot>
  </v-table>
</template>
