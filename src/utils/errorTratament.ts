/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import EventHandler from "./custom-alert/event-handler";

interface ErrorProps {
  error: any;
  title?: string;
  text?: string;
  didClose?: () => void;
  report?: boolean;
}

export async function handleError({
  error,
  title,
  text,
  didClose,
  report = true,
}: ErrorProps) {
  console.log(error);

  const auxError = (error as AxiosError)?.response?.data || error;

  await EventHandler({
    variant: "error",
    title: title || "Error",
    text:
      text || auxError?.message || auxError?.error || auxError?.statusMsg || "",
    timer: 10000,
    confirmButtonText: "Aceptar",
    headerAction: report,
    headerActionText: "Descargar reporte",
    onClickHeaderAction: () => {
      const isAxiosError = (err: any): err is AxiosError =>
        !!err && typeof err === "object" && "isAxiosError" in err;

      const safeStringify = (value: any) => {
        try {
          return JSON.stringify(value ?? "", null, 2);
        } catch {
          return String(value);
        }
      };

      const formatDate = (date: Date) => {
        const pad = (n: number) => n.toString().padStart(2, "0");
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
          date.getDate()
        )}_${pad(date.getHours())}-${pad(date.getMinutes())}-${pad(
          date.getSeconds()
        )}`;
      };

      const now = new Date();

      // Sección general del log
      let log = `Fecha: ${now.toLocaleString()}
Versión de la app: ${__APP_VERSION__}

----------------------------------------------------------------
`;

      // Solo agregar esta parte si es un error de Axios
      if (isAxiosError(error)) {
        const axiosError = error as AxiosError;
        log += `BASEURL: ${safeStringify(axiosError.config?.baseURL)}
METHOD: ${safeStringify(axiosError.config?.method)}
URL: ${safeStringify(axiosError.config?.url)}
DATA: ${safeStringify(axiosError.config?.data)}

----------------------------------------------------------------
`;
      }

      if (auxError && "status" in auxError) {
        log += `Estado: ${auxError.status ?? ""}`;
      }

      // Parte común a todos los errores
      log += `
Mensaje: ${
        auxError?.statusMsg ||
        auxError?.message ||
        auxError?.error ||
        text ||
        ""
      }

----------------------------------------------------------------

Error detallado: ${
        typeof auxError === "string" ? auxError : safeStringify(auxError)
      }
`;

      // Crear archivo
      const blob = new Blob([log], { type: "text/plain;charset=utf-8" });
      const fileName = `Error-${formatDate(now)}.txt`;

      const element = document.createElement("a");
      element.href = URL.createObjectURL(blob);
      element.download = fileName;
      document.body.appendChild(element);
      element.click();

      // Limpieza segura
      setTimeout(() => {
        document.body.removeChild(element);
        URL.revokeObjectURL(element.href);
      }, 100);
    },
    didClose,
  });
}
