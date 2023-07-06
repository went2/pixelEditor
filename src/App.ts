import {
  ToolSelect,
  ColorSelect,
  SaveButton,
  LoadButton,
  UndoButton,
  PixelEditor,
} from "./components";

import { draw, fill, rectangle, pick } from "./utils/drawHelpers";

import { EditorState } from "./types";
import Picture from "./models/Picture";
import { historyUpdateState } from "./models/reducers";

const initialState: EditorState = {
  tool: "draw",
  color: "#000000",
  picture: Picture.empty(60, 30, "#f0f0f0"),
  done: [],
  doneAt: 0,
};

const baseTools = {
  draw,
  fill,
  rectangle,
  pick,
};

// UI components
const baseControls = [
  ToolSelect,
  ColorSelect,
  SaveButton,
  LoadButton,
  UndoButton,
];

function startPixelEditor({
  state = initialState,
  tools = baseTools,
  controls = baseControls,
}) {
  const app = new PixelEditor(state, {
    tools,
    controls,
    dispatch(action: { undo: boolean; picture: Picture }) {
      state = historyUpdateState(state, action);
      app.syncState(state);
    },
  });
  return app.dom;
}

export default startPixelEditor;
