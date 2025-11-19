import Swal from "sweetalert2";
import withReactContent, { ReactSweetAlert } from "sweetalert2-react-content";

const styleNode = document.createElement("style");

document.head.appendChild(styleNode);

styleNode.sheet!.insertRule(
  `
.swal2-container {
  z-index: 1000000 !important;
}
`,
  0
);

export type MySwalType = typeof Swal & ReactSweetAlert;

// sweetalert2 custom class

const MySwal = withReactContent(Swal).mixin({
  allowEscapeKey: false,
  allowOutsideClick: false,
  allowEnterKey: false,
}) as MySwalType;

export default MySwal;
