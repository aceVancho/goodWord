import { useRef, useState, useEffect } from 'react';

type Opts = {
  inClass?: string;   // default enter animation
  outClass?: string;  // default exit animation
  durationMs?: number; // optional override via CSS var
};

export function useAnimateCss(opts: Opts = {}): {
  ref: React.RefObject<HTMLDivElement>;
  className: string;
  exit: (after?: () => void) => void;
  setAnim: React.Dispatch<React.SetStateAction<string>>;
} {
  const { inClass = 'animate__fadeInRight', outClass = 'animate__fadeOutLeft', durationMs } = opts;

  const ref = useRef<HTMLDivElement | null>(null);
  const [anim, setAnim] = useState(inClass);

  // Optional: set a custom duration via Animate.css CSS variable
  useEffect(() => {
    if (ref.current && durationMs) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (ref.current.style as any).setProperty('--animate-duration', `${durationMs}ms`);
    }
  }, [durationMs]);

  // call this to play exit animation and then run a callback (e.g., navigate)
  const exit = (after?: () => void) => {
    if (!ref.current) {
      after?.();
      return;
    }
    const el = ref.current;

    const onEnd = () => {
      el.removeEventListener('animationend', onEnd);
      after?.();
    };

    el.addEventListener('animationend', onEnd, { once: true });
    setAnim(outClass);
  };

  // classes to apply to your screen container
  const className = `animate__animated ${anim}`;

  return { ref, className, exit, setAnim };
}
