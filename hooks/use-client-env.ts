'use client';

import { useSyncExternalStore } from 'react';
import { getTodayIsoDate } from '@/lib/validation';

function subscribeNoop() {
  return () => {};
}

function getServerEmptyString() {
  return '';
}

/**
 * Returns the browser's local YYYY-MM-DD date string strictly after hydration,
 * returning '' during SSR and initial hydration so server and client HTML match
 * even when the server (UTC) and visitor browser are on different calendar dates.
 */
export function useClientTodayIso(): string {
  return useSyncExternalStore(
    subscribeNoop,
    getTodayIsoDate,
    getServerEmptyString
  );
}

function subscribeReducedMotion(callback: () => void) {
  const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

function getReducedMotionSnapshot(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getReducedMotionServerSnapshot(): boolean {
  return false;
}

/**
 * Hydration-safe reduced motion detector. Returns false during SSR and initial
 * hydration, then syncs immediately with the OS prefers-reduced-motion setting.
 */
export function useHydratedReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
}
