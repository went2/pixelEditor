import elt from "../utils/createElement";
import PictureCanvas from "./PictureCanvas";
import { UIComponent, EditorState, EditorConfig, Position } from "../types";

// whole app holds the state and all UI components
class PixelEditor implements UIComponent {
  public state: EditorState;
  public canvas: PictureCanvas;
  public controls: UIComponent[];
  public dom: HTMLElement;

  constructor(state: EditorState, config: EditorConfig) {
    const { tools, controls, dispatch } = config;
    this.state = state;

    this.canvas = new PictureCanvas(
      state.picture,
      (pos: Position) => {
        const tool = tools[this.state.tool];
        const onMove = tool(pos, this.state, dispatch);
        if (onMove) return (pos: Position) => onMove(pos, this.state);
      },
      state.size
    );

    this.controls = Object.keys(controls).map(
      (key) => new controls[key](state, config)
    );

    this.dom = elt(
      "div",
      {
        className: "app-container",
      },
      ...this.controls.map((controlUI) => controlUI.dom),
      this.canvas.dom
    );
  }

  public syncState(state: EditorState) {
    this.state = state;
    this.canvas.syncState(state.picture);
    for (let ctrl of this.controls) {
      ctrl.syncState(state);
    }
  }
}

export default PixelEditor;
