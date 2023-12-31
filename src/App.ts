import { PixelEditor } from "./components";

import SetSizeButtons from "./components/uiControls/top";
import ToolBar from "./components/uiControls/left";
import RightControls from "./components/uiControls/right";
import BottomControls from "./components/uiControls/bottom";

import { draw, fill, rectangle, pick } from "./utils/drawHelpers";

import { EditorState, ActionObj } from "./types";
import Picture from "./models/picture";
import { reducer } from "./models/reducer";

const initialState: EditorState = {
  currentTool: "draw",
  currentSize: 32,
  color: "#000000",
  picture: Picture.empty(32, 32),
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
const baseControls = {
  TopControls: SetSizeButtons,
  LeftControls: ToolBar,
  RightControls,
  BottomControls,
};

function startPixelEditor({
  state = initialState,
  tools = baseTools,
  controls = baseControls,
}) {
  const app = new PixelEditor(state, {
    tools,
    controls,
    dispatch(action: ActionObj) {
      state = reducer(state, action);
      app.syncState(state);
    },
  });
  return app.dom;
}

export default startPixelEditor;
