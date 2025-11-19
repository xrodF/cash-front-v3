import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";

interface CountdownProgressProps {
  duration: number; // en ms
  onFinish?: () => void;
  variant?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
}

export default function CountdownProgress({
  duration,
  onFinish,
  variant = "secondary",
}: CountdownProgressProps) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (duration <= 0) return;

    const start = performance.now();
    let frameId: number;

    const animate = (now: number) => {
      const elapsed = now - start;
      const percentage = Math.max(100 - (elapsed / duration) * 100, 0);

      setProgress(percentage);

      if (elapsed < duration) {
        frameId = requestAnimationFrame(animate);
      } else {
        setProgress(0); // aseguramos que se pinte en 0

        setTimeout(() => {
          onFinish?.();
        }, 400);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [duration, onFinish]);

  return (
    <LinearProgress variant="determinate" value={progress} color={variant} />
  );
}
