import elt from "../utils/createElement";

class LoadButton implements UIComponent {
  public dom: HTMLElement;
  constructor(_, { dispatch }) {
    this.dom = elt(
      "button",
      {
        onclick: () => startLoad(dispatch),
      },
      "📁 Load"
    );
  }
  syncState() {}
}

export default LoadButton;
