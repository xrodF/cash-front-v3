import {
  CircularProgress,
  LinearProgress,
  styled,
  useTheme,
} from "@mui/material";

interface SpinnerProps {
  height?: number;
  maxHeight?: number;
  colorMui?: "warning" | "error" | "primary" | "secondary" | "success" | "info";
  customColor?: string;
  linear?: boolean;
}

const Progress = ({
  height,
  maxHeight,
  colorMui,
  customColor,
  linear = false,
}: SpinnerProps) => {
  const theme = useTheme();

  return (
    <Container height={height} linear={linear}>
      {linear ? (
        <LinearProgress
          {...(colorMui && {
            color: colorMui,
          })}
        />
      ) : (
        <CircularProgress
          sx={{
            ...(maxHeight && { maxHeight: maxHeight, maxWidth: maxHeight }),
            color: customColor || theme.palette[colorMui || "primary"].main,
          }}
        />
      )}
    </Container>
  );
};

export default Progress;

const Container = styled("div")<{ height?: number; linear: boolean }>(
  ({ height, linear }) => ({
    ...(!linear && {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      flexGrow: 1,
      height: height || "100%",
    }),
  })
);
