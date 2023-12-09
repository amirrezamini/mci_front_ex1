<script setup lang="ts">
interface Props {
  users: User[];
  page: number;
  records: number;
}

const p = withDefaults(defineProps<Props>(), {
  users: () => [],
  page: 1,
  records: 10,
});

const filteredUsers = computed(() =>
  p.users.slice((p.page - 1) * p.records, p.page * p.records),
);
</script>

<template>
  <v-table :hover="true">
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>City</th>
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
        <slot />
      </tr>
    </tfoot>
  </v-table>
</template>
