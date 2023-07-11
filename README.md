# Description

A pixel editor allows you to edit pixel icon and export.

demo: [pixel-me](https://pixel-me.netlify.app/)

The original idea and code structure is bought from [Eloquent JavaScript Chapter 19](https://eloquentjavascript.net/19_paint.html).

I converted the code into TypeScript and expanded somehow in order to explore how to draw pixel in HTML canvas and how to manage states in vanilla way.

It turns out the way to manage states in vanilla JavaScript(TypeScript) is quite "Reduxful" in which component dispatches actions, and reducer function caculates the latest state and notifies every component to sync the state(by calling component's syncState()). Component decides whether and how to update its own state when got notifies.

The core elements of the way consists of: 

1. A state object of the whole App
2. State object and dispatch function are passed down to each component. When component's state changes, it dispatches actions instead of handle events by itself. Eg.

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
4. App component notifys every component to sync their state each time the reducer returns the newest state.