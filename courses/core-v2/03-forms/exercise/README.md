# Forms

## ✅ Task 1: Controlled `name` and `content` fields

1. Open `Task.tsx` and create state for `name` and `content` to complete our `task` object.
2. Make the input and textarea form fields "controlled" by giving them a `value` and an `onChange` prop that controls the newly created state.

## ✅ Task 2: Simulate a loading state on form submission

3. When the form is submitted, we want to act as though we are updating a database with our task data. Make a call to `updateTask` that puts our form in a loading state.
   - That function returns a promise with our task data
   - When the promise resolves, log the task data to the console and clear all of the form fields
4. When the form is busy making the fake DB request, render the `LoadingOverlay` component. Note that it's already in place to be rendered, we just need to make sure the condition is truthy when we're in a loading state.

## ✅ BONUS TASK!

5. Let's reset the focus of the cursor to be back on the name input field after submission as well. There is no way to "declaratively" do this with JSX. So you'll have to imperatively do it by working directly with the DOM. For this we'll use a ref.
6. Create a ref using `useRef()`:

```ts
// For TypeScript, refs can be weird. Make sure you pass the type
// of the element that will be stored in the ref.
const nameRef = useRef<HTMLInputElement>()

// For JavaScript, you can just do:
const nameRef = useRef()
```

- https://github.com/typescript-cheatsheets/react#useref
- https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator

7. Assign the ref to the input like this: `<input ref={nameRef} />`
8. Now at the end of the `handleSubmit` function, make the input focused again. You can get the value of a ref by it's `current` property:

```js
console.log(nameRef.current) // HTMLInputElement
```
