# Notes for Instructor

1. Intro the idea of composition, and break it down to specifics in context of React components

2. Then, have the students do a pre-exercise before the lecture

   - The main idea is to get them thinking about how to write components. They will probably write a single element or maybe even a single element with a render props thing.

3. Lecture

- Review participants' solutions and make note of different approaches
- Start designing a closed API, then open it up with compound components one step at a time

  - Accept options as a prop on the top-level component
  - Go back to the initial requirements and note we need to accept user styles (classnames) and deal with events. Note how complicated this gets for options!
  - Instead of an `options` prop, let's let the user pass in their own options as a component
  - For simplicity, let's just assume the user always controls the state, and our component can just accept the selected option as well as the setter.
  - For low-level components, a good rule of thumb is to create one component per DOM node (go ahead and create one for Button, List, and Option)
    - Makes it clear for consuming components what is being rendered to the DOM by the component
    - Simplifies passing DOM props along
    - Simplifies DOM element refs
  - Now that we have some separate components, we see that we've got some implicitly shared data floating around all of our components. This is a great use case for React context! Let's create some context in the top-level component so we can use it in all of our tree where needed
  - So we said we want to allow the consuming compoment or app to be able to do some custom styling, which we're handling with plain CSS. So we probably want to accept classnames from the user. BUT we don't want the user to override our classnames! So instead let's compose the classname from props with our internal classname.
  - We also need to do the same thing with event handlers. So we can write a little helper function that spits out a new handler given an external handler and internal handler
  - This looks pretty good! Now, we've got these DOM refs we used internally to deal with focus management. What if the user wanted to pass some refs to do their own imperative logic? We can compose those too! But we also need to forwardRef because...reasons
    - `React.forwardRef` was designed because earlier versions of React did not allow us to pass the `ref` prop to custom components; the `ref` would only be placed directly on a JSX tag that renders a DOM node. Some people seem to think this is more flexible than allowing custom components to forward refs (or not) directly from props.
    - I'm still not 100% sure why we can't just pass `ref` directly and let our components manage the forwarding, but Dan has a gist here that talks about it a bit: https://gist.github.com/gaearon/1a018a023347fe1c2476073330cc5509. Basically, it'd be a breaking change that I assume would be hard to write a codemod for, which means it'd break Facebook, which means we can't have nice things.
  - Since we are composing refs by creating a new callback ref, we want to memoize the callback by wrapping it in the `useCallback` because refs should generally be stable references and prevent re-renders. Let's do this by wrapping our `composeRefs` function into a `useComposedRefs` hook!

  - Now that we have that, let's start re-factoring our app to compose all the child components per our new API

Now we have a nice, explicit API for our custom select! But when we actually use it in our app we have to write a lot of extra components that probably won't change much in practice between usage. It's kind of nice to have `Option` as a separate component, but `Button` and `List` always kind of do the same thing and we probably don't want to change them too much once we add this to our design system.

So what if we called this our *base* Select -- the low-level implementation -- and created a new component where we simplified the API a bit through abstraction and only exposed the bits we wanted users to access? Let's assume this is in our design system, so we no longer want outside consumers overriding our styles.

- Refactors:
  - Make Compound Components
    - Don't introduce context yet, the curriculum flows better if the know `React.Children.map` and `React.cloneElement` for the next lecture.
  - Add an `<Disclosure onChange>` onChange so the owner component can know the disclosure state and adjust the icon
  - adjust from class names to data-attributes
  - Forward Props
  - Forward Ref
  - Add display name because of forwarding ref
  - Add aria stuff (see checklist)
    - `useId()` gives us something more dynamic that just `id="panel"`
    - Show the real one being imported or just make one. The real one is a bit complex because of SSR and re-hydration.

A quick note on `propTypes`, we're not doing them because they take up so much space and lots of teams are using type systems anyways.

This whole thing is a great primer for "controlled vs uncontrolled components". Not that we're doing or going to talk about controlled yet (that's in the lessons later), but we do have our own `onChange` and `defaultOpen`, thus "uncontrolled".

1. Exercise

Let the attendees refactor to get caught up to where we have our lecture code. Main lesson learned: React gives us the ability to make a composable API which offer more flexibility.
