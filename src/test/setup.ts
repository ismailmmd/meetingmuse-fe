import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Global test utilities
Object.defineProperty(globalThis, 'ResizeObserver', {
  value: vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  })),
  writable: true,
});

Object.defineProperty(globalThis, 'fetch', {
  value: vi.fn(),
  writable: true,
});
