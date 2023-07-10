import Picture from "./models/picture";

// UIs are modeled as components.
// Each component builds corresponding HTML elements
// UI change => dispatch actions => generate new state => sysnState() new UI
// syncState does not generate new state. It receives new state and update UI
export interface UIComponent {
  dom: HTMLElement;
  syncState(state: EditorState): void;
}

// https://stackoverflow.com/questions/13407036/how-does-interfaces-with-construct-signatures-work
declare var UIComponent: {
  new (...args: any[]): UIComponent;
};

export interface EditorState {
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
}

export interface EditorConfig {
  tools: any;
  controls: BaseControls;
  dispatch: (action: ActionObj) => void;
}

export interface Position {
  x: number;
  y: number;
}

interface ActionPayload {
  undo?: boolean;
  picture?: Picture;
  clear?: boolean;
  currentSize?: number;
  currentTool?: string;
  color?: string;
  tool?: string;
}

export interface ActionObj {
  type: "set-size" | "select-tool" | "clear" | "undo" | "draw" | "select-color";
  payload?: ActionPayload;
}
