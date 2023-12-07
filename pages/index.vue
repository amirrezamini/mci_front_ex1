<script setup lang="ts">
const { $api } = useNuxtApp();

const users = ref<any>([])

const handleSubmit = async (): Promise<void> => {
    try {
        const response = await $api.user.getUsers()
        users.value = response
    } catch (e: unknown) {

    }
}

onMounted(() => {
    handleSubmit()
})
</script>

<template>
    <v-container>
        <UsersTable :users="users" />
    </v-container>
</template>