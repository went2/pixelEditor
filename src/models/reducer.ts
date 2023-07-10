import { EditorState, ActionObj } from "../types";
import Picture from "./picture";

export function historyUpdateState(state: EditorState, action: ActionObj) {
  if (action.type == "undo") {
    if (state.done.length == 0) return state;
    return Object.assign({}, state, {
      picture: state.done[0],
      done: state.done.slice(1),
      doneAt: 0,
    });
  } else if (action.type == "clear") {
    return Object.assign({}, state, {
      picture: Picture.empty(state.currentSize, state.currentSize),
    });
  } else if (action.type == "set-size") {
    const currentSize = action.payload!.currentSize!;
    return Object.assign({}, state, {
      currentSize,
      picture: Picture.empty(currentSize, currentSize),
    });
  } else if (action.payload?.picture && state.doneAt < Date.now() - 1000) {
    return Object.assign({}, state, action.payload, {
      done: [state.picture, ...state.done],
      doneAt: Date.now(),
    });
  } else if (action.type == "select-color") {
    const newColor = action.payload!.color;
    console.log("select-color", newColor);

    return Object.assign({}, state, {
      color: newColor,
    });
  } else {
    return Object.assign({}, state, action.payload);
  }
}
