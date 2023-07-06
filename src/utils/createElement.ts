// dom building
function elt(
  type: string,
  props?: any,
  ...children: (HTMLElement | string)[]
): HTMLElement {
  let dom = document.createElement(type);
  if (props) Object.assign(dom, props);
  for (let child of children) {
    if (typeof child != "string") dom.appendChild(child);
    else dom.appendChild(document.createTextNode(child));
  }
  return dom;
}

export default elt;
