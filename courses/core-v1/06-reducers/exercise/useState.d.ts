export function useState<StateValue>(
  initialState: StateValue | (() => StateValue)
): [StateValue, (next: StateValue | ((prev: StateValue) => StateValue)) => void]
