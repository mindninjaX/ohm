import { X } from 'lucide-react';
import { motion } from 'motion/react';
import { createPortal } from 'react-dom';
import { IconButton } from '@/components/ohm';
import { CameraSimulation } from '@/illustrations';
import { useAppViewport, useChromeTone, usePortalContainer } from '@/shell';
import { StatusBar } from '@/shell/StatusBar';

/**
 * S03 > Take a photo: the simulated camera, full screen over the sheet. A dark viewfinder, the bill
 * drifting, brackets that search then lock on, a shutter, a flash. No camera is opened and nothing is
 * captured: `onCapture` fires after the flash and the app carries on to Reading.
 *
 * It mounts into the portal layer (above the sheet and its scrim), so it brings its own copy of the drawn
 * status bar when the shell draws one (the phone frame, capture mode), in white on the dark view.
 */
export function CameraOverlay({ onClose, onCapture }: { onClose: () => void; onCapture: () => void }) {
  const portal = usePortalContainer();
  const { framed } = useAppViewport();
  useChromeTone({ statusBar: 'light', homeIndicator: 'light', themeColor: '#091e42' });
  if (!portal) return null;
  return createPortal(
    <motion.div
      data-slot="camera"
      role="dialog"
      aria-modal="true"
      aria-label="Take a photo of your bill"
      className="absolute inset-0 z-10 bg-ink-strong"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {framed && <StatusBar />}
      {/* Fills the whole overlay, so the flash covers the status bar area too. */}
      <CameraSimulation className="pt-[calc(var(--safe-top,0px)+4px)]" onCapture={onCapture} />
      <IconButton
        icon={X}
        label="Close camera"
        className="absolute top-[calc(var(--safe-top,0px)+8px)] left-2 z-10 text-white hover:bg-white/10 active:bg-white/15"
        onClick={onClose}
      />
    </motion.div>,
    portal,
  );
}
