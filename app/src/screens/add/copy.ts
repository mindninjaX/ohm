/**
 * Words the Add bill area needs that are not in the bill data module (src/data/bill.ts).
 * Figures never go here: every number on these screens comes from the data module.
 */

/** The address people forward Northgrid's email to (S03.1). Display only: nothing receives mail. */
export const FORWARD_ADDRESS = 'bills+harbourline@ohm.app';

/** The file the simulated upload shows in its chip (S03 > Upload the PDF). */
export const UPLOAD_FILE = { name: 'August bill.pdf', size: '1.4 MB' } as const;

/** The 168 px columns of the Figma grid on S03 (Add methods). See AddBillSheet. */
export const ADD_TILE_WIDTH = 168;
/** The gap Figma uses between the tiles on S03, both ways. */
export const ADD_TILE_GAP = 11;

