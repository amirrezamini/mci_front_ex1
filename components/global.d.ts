interface User {
  id: number;
  name: string;
  city: string;
}

type FilterCondition = "<" | "=" | ">" | string;

interface Input {
  header: keyof User;
  condition: FilterCondition;
  value: string;
  error: string
}
