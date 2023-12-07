<script setup lang="ts">
const drawer = ref<boolean>(true)
</script>

<template>
    <v-app>
        <v-app-bar flat :border="true">
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer">
            <v-list nav>
                <v-list-item prepend-icon="mdi-email" title="Welcome" value="inbox"></v-list-item>
                <v-list-item prepend-icon="mdi-account-supervisor-circle" title="Menu 1" value="supervisors"></v-list-item>
                <v-list-item prepend-icon="mdi-clock-start" title="Menu 2" value="clockin"></v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-main>
            <slot />
        </v-main>
    </v-app>
</template>