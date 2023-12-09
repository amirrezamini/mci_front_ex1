<script setup lang="ts">
interface Emits {
  (e: "searchUser", value: Input[]): void;
}

const emits = defineEmits<Emits>();

const inputs = ref<Input[]>([
  { header: "id", condition: "<", value: "1", error: "" },
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

const updateInput = (
  value: FilterCondition,
  type: "condition" | "value",
  index: number,
) => {
  inputs.value[index][type] = value;
};

const validateInputs = (): boolean => {
  let status: boolean = true;

  inputs.value.map((input) => (input.error = ""));
  const id = inputs.value[0].value;
  const name = inputs.value[1] && inputs.value[1].value;
  const city = inputs.value[2] && inputs.value[2].value;

  if (!id || +id < 0) {
    inputs.value[0].error = "Id is invalid!";
    status = false;
  } else if (+id < 1 && inputs.value[0].condition === "<") {
    inputs.value[0].error = "The minimum value for this condition is 1!";
    status = false;
  }

  if (inputs.value[1]) {
    if (!name) {
      inputs.value[1].error = "Name cannot be empty!";
      status = false;
    } else if (containsDigits(name)) {
      inputs.value[1].error = "Name should not contain digits!";
      status = false;
    }
  }

  if (inputs.value[2]) {
    if (!city) {
      inputs.value[2].error = "City cannot be empty!";
      status = false;
    } else if (containsDigits(city)) {
      inputs.value[2].error = "City should not contain digits!";
      status = false;
    }
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
          <th></th>
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
        ></filter-input>
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
