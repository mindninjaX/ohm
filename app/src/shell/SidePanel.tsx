import { useLocation } from 'react-router';
import { motion, useReducedMotion } from 'motion/react';
import { EASE_OUT, STAGGER } from './motion';
import { FLOWS, useStartFlow } from './PrototypeMenu';
import { QrCode } from './QrCode';

/**
 * The column beside the phone frame on desktop: what this is, a QR code to open it on a
 * phone, and the three flow shortcuts (the same ones as the Prototype menu).
 */
export function SidePanel() {
  const startFlow = useStartFlow();
  const reduce = useReducedMotion();
  useLocation(); // re-render on every route change so the QR code opens the screen you are on
  const href = typeof window === 'undefined' ? '' : window.location.href;
  const local = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(
    typeof window === 'undefined' ? '' : window.location.hostname,
  );

  const item = (i: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.35, ease: EASE_OUT, delay: 0.15 + i * STAGGER },
  });

  return (
    <aside aria-label="About this prototype" className="hidden w-[300px] shrink-0 flex-col gap-6 min-[900px]:flex [@media(max-height:760px)]:gap-4">
      <motion.div {...item(0)} className="flex flex-col gap-3">
        <span className="grid size-10 place-items-center rounded-[10px] bg-primary text-xl font-semibold text-white [@media(max-height:660px)]:hidden">
          Ω
        </span>
        <h2 className="text-3xl font-semibold tracking-[-0.01em] text-ink-strong [@media(max-height:660px)]:text-2xl">Ohm prototype</h2>
        <p className="text-base text-ink-muted">
          Check and pay a large electricity bill, in plain words. A clickable prototype.
        </p>
      </motion.div>

      <motion.figure {...item(1)} className="flex flex-col items-start gap-3">
        <div className="rounded-2xl border border-line bg-card p-4 shadow-sm [@media(max-height:760px)]:p-3">
          <QrCode
            value={href}
            size={136}
            className="[@media(max-height:760px)]:size-[104px]"
            label="QR code that opens this prototype on your phone"
          />
        </div>
        <figcaption className="flex flex-col gap-0.5">
          <span className="text-sm font-medium text-ink-strong">Open on your phone</span>
          {local && (
            <span className="text-xs text-ink-muted">
              This address only works on this computer.
            </span>
          )}
        </figcaption>
      </motion.figure>

      <motion.div {...item(2)} className="flex flex-col gap-2">
        <h3 className="text-xs font-semibold text-ink-muted">Start from</h3>
        <ul className="flex flex-col gap-2">
          {FLOWS.map((f, i) => (
            <li key={f.id}>
              <button
                type="button"
                onClick={() => startFlow(f.id)}
                className="group flex w-full items-center gap-3 rounded-xl border border-line bg-card px-3 py-2.5 text-left outline-none transition-[background-color,box-shadow,transform] duration-150 hover:bg-surface-muted hover:shadow-sm focus-visible:ring-[3px] focus-visible:ring-ring-subtle active:scale-[0.985] motion-reduce:transition-none motion-reduce:active:scale-100"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary-subtle text-sm font-semibold text-primary">
                  {i + 1}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-ink-strong">{f.title}</span>
                  <span className="block text-xs text-ink-muted [@media(max-height:660px)]:hidden">{f.hint}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </motion.div>
    </aside>
  );
}
