import { fn } from "vitest";
import mediaQuery from "css-mediaquery";

const createMatchMedia =
  (width: number) =>
  (query: string): MediaQueryList => ({
    matches: mediaQuery.match(query, { width }),
    media: query,
    onchange: null,
    addListener: fn(),
    removeListener: fn(),
    addEventListener: fn(),
    removeEventListener: fn(),
    dispatchEvent: fn(),
  });

window.matchMedia = createMatchMedia(window.innerWidth);
