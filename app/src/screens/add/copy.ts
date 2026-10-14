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


/**
 * Prototype-only controls ("Skip" on S04, "Simulate the email arriving" on S03.1). In capture mode (the Figma
 * frames, `npm run diff`, /compare) a control is left out unless its flag is true, so the frame is exactly what
 * Figma draws. Both are drawn in Figma since 14 Oct (S04 and the S04 backdrop of S04.2; S03.1), so both are true.
 */
export const IN_FIGMA = { skip: true, simulateEmail: true } as const;
