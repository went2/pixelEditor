import Picture from "./models/picture";

// UIs are modeled as components.
// Each component creates corresponding HTML elements
// and expose sysnState() to outside world
export interface UIComponent {
  dom: HTMLElement;
  syncState(state: EditorState): void;
}

// https://stackoverflow.com/questions/13407036/how-does-interfaces-with-construct-signatures-work
declare var UIComponent: {
  new (...args: any[]): UIComponent;
};

export interface EditorState {
  size: 16 | 32 | 64 | 128;
  currentSize: 16 | 32 | 64 | 128; // 64 means 64 * 64
  currentTool: string; // TODO: maybe change to enum
  tool: string;
  color: string; // like "#000000",
  picture: Picture;
  done: any[];
  doneAt: number;
}

interface BaseControls {
  [key: string]: typeof UIComponent;
  // LeftControls: typeof UIComponent;
  // TopControls: typeof UIComponent;
  // RightControls: typeof UIComponent;
  // BottomControls: typeof UIComponent;
}

export interface EditorConfig {
  tools: any;
  controls: BaseControls;
  dispatch: (state: any, action?: any) => void;
}

export interface Position {
  x: number;
  y: number;
}

export interface ActionType {
  undo: boolean;
  picture: Picture;
  clear: boolean;
}
