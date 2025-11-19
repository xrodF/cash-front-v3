import MySwal from "./custom_swal";

import { SweetAlertResult } from "sweetalert2";

interface ConfirmProps {
  text?: string;
  title?: string;
  footer?: string | HTMLElement | JQuery | undefined;
  html?: string;
  confirmButtonText?: string;
  denyButtonText?: string;
  cancelButtonText?: string;
}

export const handleConfirm = async ({
  text = "No podrás revertir esta acción",
  title = "¿Seguro que quieres continuar?",
  confirmButtonText = "Si, Seguro",
  denyButtonText = "No, Cancelar",
  cancelButtonText = "Cancelar",
  html,
  footer,
}: ConfirmProps): Promise<boolean | SweetAlertResult> => {
  const resp = await MySwal.fire({
    icon: "warning",
    title,
    text,
    showDenyButton: true,
    reverseButtons: true,
    confirmButtonText,
    denyButtonText,
    cancelButtonText,
    html,
    footer,
  });

  if (resp.isConfirmed) {
    return true;
  }

  return false;
};
