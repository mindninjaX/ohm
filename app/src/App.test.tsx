import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { App } from './App';
import { ROUTES } from './routes';

describe('App routes', () => {
  it('covers every route in the build plan', () => {
    // 18 from the first plan, plus the two sheets it listed in prose (/reading/stop, /home/sources),
    // plus /connection/on-your-bill (S05.2) and the Razorpay step /pay (specs/dev/SCREENS.md).
    expect(ROUTES).toHaveLength(22);
  });

  it.each(ROUTES.map((r) => [r.path, r.name] as const))('%s renders %s', (path, name) => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { level: 1, name })).toBeInTheDocument();
  });

  it('sends unknown paths home', () => {
    render(
      <MemoryRouter initialEntries={['/nope']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { level: 1, name: 'S01 Home' })).toBeInTheDocument();
  });
});
