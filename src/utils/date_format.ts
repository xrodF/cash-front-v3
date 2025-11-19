export const DateFormat = (date: string | Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    minute: "2-digit",
    hour: "2-digit",
  };

  const aux = new Date(date);

  return aux.toLocaleDateString("es-ES", {
    timeZone: "America/Asuncion",
    ...options,
  });
};

export const OnlyDateFormat = (date: string | Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const aux = new Date(date);

  return aux.toLocaleDateString("es-ES", {
    timeZone: "America/Asuncion",
    ...options,
  });
};

export const HourFormat = (date: string | Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    minute: "2-digit",
    hour: "2-digit",
  };

  const aux = new Date(date);

  return aux.toLocaleTimeString("es-ES", {
    timeZone: "America/Asuncion",
    ...options,
  });
};
