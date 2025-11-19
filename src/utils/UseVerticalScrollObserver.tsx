import { useEffect, useRef, useState } from "react";

export function useVerticalScrollObserver(ref: React.RefObject<HTMLElement | null>) {
  const [hasScroll, setHasScroll] = useState(false);
  const [showChip, setShowChip] = useState(false);
  const prevScrollHeight = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const checkScroll = () => {
      const currentHasScroll = el.scrollHeight > el.clientHeight;
      const currentScrollHeight = el.scrollHeight;

      // Detectar aumento de scroll (más contenido)
      const scrollIncreased = currentScrollHeight > prevScrollHeight.current;

      setHasScroll(currentHasScroll);

      if (scrollIncreased && currentHasScroll) {
        // Mostrar chip cuando crece el scroll
        setShowChip(true);

        // Reiniciar temporizador
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setShowChip(false), 2000);
      }

      // Guardar altura actual
      prevScrollHeight.current = currentScrollHeight;
    };

    const resizeObserver = new ResizeObserver(checkScroll);
    resizeObserver.observe(el);

    const mutationObserver = new MutationObserver(checkScroll);
    mutationObserver.observe(el, { childList: true, subtree: true });

    // Primer chequeo
    checkScroll();

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [ref]);

  return { hasScroll, showChip };
}
