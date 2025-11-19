import { darken, SxProps } from "@mui/material";

export function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

export function stringAvatar({
  name,
  styles,
  bgColor = true,
}: {
  name: string;
  styles?: SxProps;
  bgColor?: boolean;
}) {
  const aux = name.split(" ");

  const color = stringToColor(name);

  return {
    sx: {
      ...(bgColor && { bgcolor: color }),
      width: 48,
      height: 48,
      color: darken(color, 0.5),
      ...styles,
    },
    children: `${aux[0][0]}${aux.length > 1 ? aux[1][0] : ""}`,
  };
}
