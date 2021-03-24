Initial outline:

## Day 1: Composition and API Design

- At the core of React's component API: composition

  - Composition means combining and arranging smaller units to form a larger unit
  - In React, we combine and arrange components to form an application
  - Components can be placed before, after, or delegated into specific sections of other components via props
  - React designed the `children` prop to simulate the composition of HTML elements for nesting components
  - Any props can be used to compose elements or behaviors in a component!
  - So when we set out to build a component in React, we have to think about how it's going to exist in the context of other components, and to what extend other components can manipulate its properties
  - This process is what I refer to as API design
    - Our components have an API that other components (or the app at large) can interface with
    - Just like any backend API, our component's API gets to dictate the extent to which outside elements can access or affect behavior of the component
  - So to start things off, I want everyone to design an API for a new component and build a very simple, naiive version of it
    - We aren't concerned with all of the functionality and complexity needed, just scaffold it out and give it very basic functionality if you want
  - Let's build a fake custom dropdown select menu with options!
    - Anatomy
      - Button that displays the currently selected option
      - The popover that shows all of the options when it's open
      - Individual option
    - Considerations
      - General purpose component; we don't necessarily know what options we'll have, that's up to the component that renders it
      - Our select needs some styles baked in so that it functions at a base level, but other components or apps that use it will need to be able to add styles on top (assume styling with plain CSS)
      - We also need to deal with user events for the select to work, but we want consuming apps or components to be able to deal with user events as well
    - Time: 25 minute exercise to get a scaffold built, then we'll walk through it together. Don't worry if you don't finish, mostly a thought exercise where we can talk through the different ways we might approach this!

--- 25 MINUTES ---

- Advanced Composition Patterns
  - Composing refs
  - Composing user supplied and library event handlers
  - Rendering dynamic elements with `as` prop
- Advanced scenarios with context
- Advanced scenarios with events
- Advanced non-DOM related scenarios for `useRef`
- Keyboard accessibility
  - Introduction to WAI ARIA best practicies and screen readers
  - Managing lists of descendents components for accessibility
- Controlled vs Uncontrolled vs. Derived State (Custom components, not forms)
- Tools for developing and distributing shared libraries
- Unit Testing
  - Testing Philosophy (what to test, what not to)
  - Testing components
  - Testing user events
  - Testing hooks
  - Testing async code
  - API testing for shared libraries
- React Footguns
  - useEffect deep dive
  - hook composition and keeping the linter helpful
  - closures
  - object identity
  - purity/immutability
