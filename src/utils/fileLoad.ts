import elt from "./createElement";
import { pictureFromImage } from "./drawHelpers";

export function startLoad(dispatch: (...args: any[]) => void) {
  let input = elt("input", {
    type: "file",
    onchange: () => finishLoad(input.files![0], dispatch),
  }) as HTMLInputElement;
  document.body.appendChild(input);
  input.click();
  input.remove();
}

export function finishLoad(file: Blob, dispatch: (...args: any[]) => void) {
  if (file == null) return;
  let reader = new FileReader();
  reader.addEventListener("load", () => {
    let image = elt("img", {
      onload: () =>
        dispatch({
          picture: pictureFromImage(image as HTMLImageElement),
        }),
      src: reader.result,
    });
  });
  reader.readAsDataURL(file);
}
