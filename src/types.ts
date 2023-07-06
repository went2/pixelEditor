// UIs are modeled as components.
// Each component creates corresponding HTML elements
// and expose sysnState() to outside world
export interface UIComponent {
  syncState(state: EditorState): void;
}

// https://stackoverflow.com/questions/13407036/how-does-interfaces-with-construct-signatures-work
declare var UIComponent: {
  new (...args: any[]): UIComponent;
};

export interface EditorState {
  tool: string;
  color: string; // like "#000000",
  picture: Picture;
  done: any[];
  doneAt: number;
}

export interface EditorConfig {
  tools: any;
  controls: (typeof UIComponent)[];
  dispatch: any;
}

// store coordinates of color
export class Pixel {
  public x: number;
  public y: number;
  public color: string; // like "#000000"
}

export interface Position {
  x: number;
  y: number;
}
