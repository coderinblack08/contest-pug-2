import { RefCallback, useRef, useCallback, useMemo } from "react";
import { createPopper, Options } from "@popperjs/core";

export function usePopper(
  options?: Partial<Options>
): [RefCallback<Element | null>, RefCallback<HTMLElement | null>] {
  const reference = useRef<Element>(null);
  const popper = useRef<HTMLElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const cleanupCallback = useRef(() => {});

  const instantiatePopper = useCallback(() => {
    if (!reference.current) return;
    if (!popper.current) return;

    if (cleanupCallback.current) cleanupCallback.current();

    cleanupCallback.current = createPopper(reference.current, popper.current, options).destroy;
  }, [reference, popper, cleanupCallback, options]);

  return useMemo(
    () => [
      (referenceDomNode) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        reference.current = referenceDomNode;
        instantiatePopper();
      },
      (popperDomNode) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        popper.current = popperDomNode;
        instantiatePopper();
      },
    ],
    [reference, popper, instantiatePopper]
  );
}
