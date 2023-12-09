<script setup lang="ts">
interface Props {
  drawer: boolean;
}

const p = withDefaults(defineProps<Props>(), {
  drawer: false,
});
</script>

<template>
  <v-navigation-drawer name="default" :model-value="p.drawer">
    <v-list nav>
      <v-list-item
        prepend-icon="mdi-email"
        title="Welcome"
        value="inbox"
      />
      <v-list-item
        prepend-icon="mdi-account-supervisor-circle"
        title="Menu 1"
        value="supervisors"
      />
      <v-list-item
        prepend-icon="mdi-clock-start"
        title="Menu 2"
        value="clockin"
      />
    </v-list>
  </v-navigation-drawer>
</template>
