import { NavigationType } from 'react-router';

export type NavDirection = 'forward' | 'back' | 'none';

export interface NavInfo {
  /** Position of this entry in the session history (0 is the first entry we saw). */
  index: number;
  direction: NavDirection;
}

/**
 * Works out whether a navigation went forward or back, and where each history entry sits.
 *
 * React Router tells us PUSH, POP or REPLACE, but a POP can be back or forward and can jump
 * several entries. BrowserRouter keeps an `idx` in `history.state`; MemoryRouter does not, so
 * we also remember the index of every location key we have seen.
 *
 * `update` is idempotent for the same key, so calling it on every render (and twice in
 * StrictMode) is safe.
 */
export class HistoryTracker {
  private byKey = new Map<string, number>();
  private lastKey: string | null = null;
  private lastInfo: NavInfo = { index: 0, direction: 'none' };

  update(key: string, type: NavigationType, stateIndex?: number): NavInfo {
    if (key === this.lastKey) return this.lastInfo;

    const prev = this.lastKey === null ? null : this.lastInfo.index;
    let index = this.byKey.get(key);
    if (index === undefined || (type !== NavigationType.Pop && stateIndex !== undefined)) {
      if (stateIndex !== undefined) index = stateIndex;
      else if (prev === null) index = 0;
      else if (type === NavigationType.Push) index = prev + 1;
      else if (type === NavigationType.Replace) index = prev;
      else index = prev - 1; // a POP to a key we never saw: assume one step back
    }
    this.byKey.set(key, index);

    let direction: NavDirection = 'none';
    if (prev !== null) {
      if (index > prev) direction = 'forward';
      else if (index < prev) direction = 'back';
      else direction = type === NavigationType.Pop ? 'back' : 'forward';
    }

    this.lastKey = key;
    this.lastInfo = { index, direction };
    return this.lastInfo;
  }

  indexOf(key: string): number | undefined {
    return this.byKey.get(key);
  }
}

/** The `idx` BrowserRouter stores in history.state, if there is one. */
export function readHistoryStateIndex(): number | undefined {
  if (typeof window === 'undefined') return undefined;
  try {
    const state: unknown = window.history.state;
    if (state && typeof state === 'object' && 'idx' in state) {
      const idx = (state as { idx: unknown }).idx;
      if (typeof idx === 'number') return idx;
    }
  } catch {
    // history.state can throw in sandboxed frames; fall back to counting.
  }
  return undefined;
}
