import { SaveButton, LoadButton, UndoButton, PixelEditor } from "./components";

import SetSizeButtons from "./components/uiControls/top";
import ToolBar from "./components/uiControls/left";
import RightControls from "./components/uiControls/right";
import BottomControls from "./components/uiControls/bottom";

import { draw, fill, rectangle, pick } from "./utils/drawHelpers";

import { EditorState, ActionType } from "./types";
import Picture from "./models/picture";
import { historyUpdateState } from "./models/reducers";

const initialState: EditorState = {
  currentTool: "draw",
  currentSize: 64,
  size: 128,
  tool: "draw",
  color: "#000000",
  picture: Picture.empty(128, 128, "#f0f0f000"),
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
  LeftControls: ToolBar,
  TopControls: SetSizeButtons,
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
    dispatch(action: ActionType) {
      // TODO: add 'clear' action reducer
      state = historyUpdateState(state, action);
      app.syncState(state);
    },
  });
  return app.dom;
}

export default startPixelEditor;
