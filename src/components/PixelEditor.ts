import elt from "../utils/createElement";
import PictureCanvas from "./PictureCanvas";

class PixelEditor implements UIComponent {
  public state: EditorState;
  public canvas: PictureCanvas;
  public controls: any[];
  public dom: HTMLElement;

  constructor(state: EditorState, config: EditorConfig) {
    const { tools, controls, dispatch } = config;
    this.state = state;

    this.canvas = new PictureCanvas(state.picture, (pos) => {
      const tool = tools[this.state.tool];
      const onMove = tool(pos, this.state, dispatch);
      if (onMove) return (pos) => onMove(pos, this.state);
    });

    this.controls = controls.map((Control) => new Control(state, config));
    this.dom = elt(
      "div",
      {},
      this.canvas.dom,
      elt("br"),
      ...this.controls.reduce((a, c) => a.concat(" ", c.dom), [])
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
