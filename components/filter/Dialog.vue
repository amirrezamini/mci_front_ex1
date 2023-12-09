<script setup lang="ts">
interface Emits {
  (e: "searchUser", value: Input[]): void;
}

const emits = defineEmits<Emits>();

const inputs = ref<Input[]>([
  { header: "id", condition: "<", value: "1", error: "", },
]);

const addInput = () => {
  const input: Input = {
    header: inputs.value.length === 1 ? "name" : "city",
    condition: "=",
    value: "",
    error: "",
  };

  inputs.value.push(input);
};
const deleteInput = (index: number) => inputs.value.splice(index, 1);

const updateInput = (value: FilterCondition, type: "condition" | "value", index: number) => {
  inputs.value[index][type] = value;
};

const validateId = (id: string): string => {
  if (!id || +id < 0) {
    return "Id is invalid!";
  } else if (+id < 1 && inputs.value[0].condition === "<") {
    return "The minimum value for this condition is 1!";
  }
  return "";
};

const validateName = (name: string): string => {
  if (containsDigits(name)) {
    return "Name should not contain digits!";
  }
  return "";
};

const validateCity = (city: string): string => {
  if (containsDigits(city)) {
    return "City should not contain digits!";
  }
  return "";
};

const validateInputs = (): boolean => {
  let status: boolean = true;

  inputs.value.forEach(input => (input.error = ""));

  const [
    idInput,
    nameInput,
    cityInput,
  ] = inputs.value;

  inputs.value[0].error = validateId(idInput.value);
  status = !inputs.value[0].error;

  if (nameInput.value) {
    inputs.value[1].error = validateName(nameInput.value);
    status = status && !inputs.value[1].error;
  }

  if (cityInput.value) {
    inputs.value[2].error = validateCity(cityInput.value);
    status = status && !inputs.value[2].error;
  }

  return status;
};

const search = () => {
  if (validateInputs()) {
    emits("searchUser", inputs.value);
  }
};
</script>

<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Header</th>
          <th>Condition</th>
          <th>Value</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <filter-input
          v-for="(input, index) in inputs"
          :key="index"
          :input="input"
          @update:condition="updateInput($event, 'condition', index)"
          @update:value="updateInput($event, 'value', index)"
          @delete="deleteInput(index)"
        />
      </tbody>
    </table>
    <v-btn
      v-if="inputs.length != 3"
      class="mt-4"
      color="#5865f2"
      variant="flat"
      @click="addInput()"
    >
      New Rule
    </v-btn>
    <div class="d-flex justify-center mt-10">
      <v-btn width="200" color="#5865f2" variant="flat" @click="search()">
        Search
      </v-btn>
    </div>
  </div>
</template>
