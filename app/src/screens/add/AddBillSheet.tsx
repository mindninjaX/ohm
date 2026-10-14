import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { SheetPanel } from '@/components/ohm';
import { UploadSimulation } from '@/illustrations';
import { AddBillTile } from './components/AddBillTile';
import { CameraOverlay } from './CameraOverlay';
import { ADD_TILE_GAP, ADD_TILE_WIDTH, UPLOAD_FILE } from './copy';
import { clearReadingDone } from './useReadingSimulation';

type Mode = 'choose' | 'uploading';

/**
 * S03 Add a bill (/add, a sheet over Home). Figma: Ohm / Sheet with the four Add bill tiles in a 2 x 2
 * grid (Add methods).
 *
 *  - Upload the PDF: the sheet shows the simulated upload (the file chip, a bar that fills in about
 *    1.2 s, then the file flies into the bill) and then Reading opens.
 *  - Take a photo: the simulated camera fills the screen (brackets lock on, shutter, flash) and then
 *    Reading opens.
 *  - Forward the email: S03.1.
 *  - Link your Northgrid account is coming soon: disabled.
 *
 * Reading replaces this sheet in the history, so Back from Reading lands on Home, not on a stale sheet.
 *
 * The Figma grid has two fixed 168 px columns 11 apart inside a 353 px content box, so the right tile
 * ends 6 px short of the right margin. The columns here are 168 at most and shrink on a narrower phone;
 * ADD_TILE_WIDTH in copy.ts is the one number to change when the Figma grid is made fluid.
 */
export function AddBillSheet() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>('choose');
  const [camera, setCamera] = useState(false);

  // A new read starts here (Upload the PDF or Take a photo): forget any bill that was read before.
  const openReading = () => {
    clearReadingDone();
    navigate('/reading', { replace: true });
  };

  return (
    <SheetPanel title={mode === 'uploading' ? 'Uploading your bill' : 'Add a bill'}>
      <AnimatePresence mode="wait" initial={false}>
        {mode === 'choose' ? (
          <motion.div
            key="choose"
            data-slot="add-methods"
            className="grid"
            style={{
              gridTemplateColumns: `repeat(2, minmax(0, ${ADD_TILE_WIDTH}px))`,
              gap: ADD_TILE_GAP,
              justifyContent: 'start',
            }}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
          >
            <AddBillTile type="upload" title="Upload the PDF" subtitle="From the Files app" onClick={() => setMode('uploading')} />
            <AddBillTile type="photo" title="Take a photo" subtitle="Of your paper bill" onClick={() => setCamera(true)} />
            <AddBillTile type="forward" title="Forward the email" subtitle="From your mail app" onClick={() => navigate('/add/email')} />
            <AddBillTile
              type="connect"
              disabled
              title={
                <>
                  Link your
                  <br />
                  Northgrid account
                </>
              }
            />
          </motion.div>
        ) : (
          <motion.div
            key="uploading"
            data-slot="upload"
            // Same height as the tile grid, so the sheet does not jump while the file uploads.
            className="flex min-h-[365px] items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2, delay: 0.05 } }}
          >
            <UploadSimulation fileName={UPLOAD_FILE.name} fileSize={UPLOAD_FILE.size} onComplete={openReading} />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {camera && <CameraOverlay key="camera" onClose={() => setCamera(false)} onCapture={openReading} />}
      </AnimatePresence>
    </SheetPanel>
  );
}
