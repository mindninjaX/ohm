import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';
import { Toast, EASE_OUT, useReduced } from '@/components/ohm';
import { useCapture } from '@/shell';

/**
 * The toast on the Connection screens (Figma S05.8, S05.9): the Ohm / Toast sits in the page 12 above the footer,
 * with 4 above it. It takes its place in the layout, so the frame is as tall as Figma draws it, rises in
 * with a fade and dissolves after 4 s, giving the room back. In capture mode (the Figma frame) it stays.
 *
 * It sticks to the bottom of the scroll area, 12 above the two-button footer (150 tall), so it shows even when the
 * page is long. In capture mode every sticky element sits in the flow (capture.css), so the offset is dropped there.
 */
export function InlineToast({ message, onDismiss }: { message: string | null; onDismiss: () => void }) {
  const reduced = useReduced();
  const capture = useCapture();

  useEffect(() => {
    if (!message || capture) return;
    const id = window.setTimeout(onDismiss, 4000);
    return () => window.clearTimeout(id);
  }, [message, capture, onDismiss]);

  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.div
          key={message}
          data-slot="inline-toast"
          className="pointer-events-none sticky bottom-[162px] z-20 mx-4 overflow-visible [html[data-capture]_&]:bottom-auto"
          initial={{ height: 0, opacity: 0, marginTop: 0, marginBottom: 0 }}
          animate={{ height: 48, opacity: 1, marginTop: 4, marginBottom: 12 }}
          exit={{ height: 0, opacity: 0, marginTop: 0, marginBottom: 0 }}
          transition={reduced ? { duration: 0.15 } : { duration: 0.3, ease: EASE_OUT }}
        >
          <motion.div
            className="pointer-events-auto"
            initial={reduced ? false : { y: 8 }}
            animate={{ y: 0 }}
            exit={reduced ? undefined : { y: 8 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
          >
            <Toast tone="success">{message}</Toast>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
