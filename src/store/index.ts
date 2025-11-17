import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { createDownloadSlice } from './slices/downloadSlice';
import { createThemeSlice } from './slices/themeSlice';
import type { CombinedStoreState } from './types';

export type { CombinedStoreState };

export const useStore = create<CombinedStoreState>()(
  immer((...a) => ({
    ...createDownloadSlice(...a),
    ...createThemeSlice(...a),
  }))
);
