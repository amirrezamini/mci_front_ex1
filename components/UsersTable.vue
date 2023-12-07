<script setup lang="ts">

interface Props {
    users: User
}

const props = defineProps<Props>()

</script>

<template>
    <v-table>
        <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>City</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(user, index) in props.users" :key="index">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.city }}</td>
            </tr>
        </tbody>
    </v-table>
</template>