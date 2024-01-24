# Description

A pixel editor allows you to edit pixel icon and export.

demo: [pixel-me](https://pixel-me.netlify.app/)

The idea and code structure originates from [Eloquent JavaScript Chapter 19](https://eloquentjavascript.net/19_paint.html).

I converted the code into TypeScript and add some features in order to explore how to draw pixel in HTML canvas as well as manage states without any library.

It turns out the way to manage states in JavaScript is quite "Reduxful" in which component dispatches actions, and reducer function caculates the latest state and notifies all components to sync the state. Component decides whether and how to update its own state and render when got notifies.

The approach consists of: 

1. A state object of the whole App
2. A dispatch function which passes down to every component. When component's state changes, it dispatches actions instead of handle events by itself. Eg.

```ts
class UndoButton implements UIComponent {
  public dom: HTMLButtonElement;
  // 1. UndoButton is initialized with global state and dispatch function
  constructor(state: EditorState, { dispatch }: EditorConfig) {
    this.dom = <HTMLButtonElement>elt(
      "button",
      {
        // 2. It dispatches action instead of handle click event itself when clicked.
        // So the global reducer handles "undo" action and generates a new state
        onclick: () => dispatch({ type: "undo" }),
        disabled: state.done.length == 0,
      },
      "⮪ Undo"
    );
  }
  // 3. The top App component will call every component's syncState with latest state.
  // Then each component updates its own state
  syncState(state: EditorState) {
    this.dom.disabled = state.done.length == 0;
  }
}
```

3. A reducer function(can be splitted into several) to caculate and return the newest state object based on the current object and action object.