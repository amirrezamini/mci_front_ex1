<script setup lang="ts">
interface Props {
  input: Input & { header: keyof User };
}
interface Emits {
  (e: "update:condition", val: FilterCondition): void;
  (e: "update:value", val: string): void;
  (e: "delete"): void;
}

const p = defineProps<Props>();
const emits = defineEmits<Emits>();

const conditions = ["<", "=", ">",];

const isId = computed(() => p.input.header === "id");
const availableConditions = computed(() => (isId.value ? conditions : ["=",]));
</script>

<template>
  <tr>
    <td class="pa-2">
      <div>
        <v-text-field
          :model-value="p.input.header"
          readonly
          variant="outlined"
        />
      </div>
    </td>
    <td class="pa-2">
      <div>
        <v-select
          :model-value="p.input.condition"
          :items="availableConditions"
          variant="outlined"
          @update:model-value="emits('update:condition', $event)"
        />
      </div>
    </td>
    <td class="pa-2">
      <div>
        <v-text-field
          :model-value="p.input.value"
          :type="isId ? 'number' : 'text'"
          hide-spin-buttons
          variant="outlined"
          :error-messages="p.input.error"
          @input="emits('update:value', $event.target.value)"
        />
      </div>
    </td>
    <td class="pa-2">
      <div>
        <v-btn
          v-if="!isId"
          icon="mdi-delete"
          variant="text"
          color="error"
          @click="emits('delete')"
        />
      </div>
    </td>
  </tr>
</template>
