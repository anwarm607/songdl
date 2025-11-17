import { StateCreator } from 'zustand';
import type { CombinedStoreState, DownloadSlice } from '../types';

export type { DownloadState } from '../types';
export type { DownloadSlice } from '../types';

interface DownloadSliceWithFilePath extends DownloadSlice {
  setDownloadFilePath: (songId: string, filePath: string) => void;
}

export const createDownloadSlice: StateCreator<
  CombinedStoreState,
  [['zustand/immer', never]],
  [],
  DownloadSliceWithFilePath
> = (set, get) => ({
  downloads: {},

  startDownload: (songId: string) => {
    set((state: CombinedStoreState) => {
      state.downloads[songId] = {
        songId,
        progress: 0,
        isDownloading: true,
        isDownloaded: false,
        error: undefined,
      };
    });
  },

  updateProgress: (songId: string, progress: number) => {
    set((state: CombinedStoreState) => {
      if (state.downloads[songId]) {
        state.downloads[songId].progress = progress;
      }
    });
  },

  completeDownload: (songId: string) => {
    set((state: CombinedStoreState) => {
      if (state.downloads[songId]) {
        state.downloads[songId].progress = 100;
        state.downloads[songId].isDownloading = false;
        state.downloads[songId].isDownloaded = true;
      }
    });
  },

  setDownloadFilePath: (songId: string, filePath: string) => {
    set((state: CombinedStoreState) => {
      if (state.downloads[songId]) {
        state.downloads[songId].filePath = filePath;
      }
    });
  },

  failDownload: (songId: string, error: string) => {
    set((state: CombinedStoreState) => {
      if (state.downloads[songId]) {
        state.downloads[songId].isDownloading = false;
        state.downloads[songId].isDownloaded = false;
        state.downloads[songId].error = error;
      }
    });
  },

  resetDownload: (songId: string) => {
    set((state: CombinedStoreState) => {
      state.downloads[songId] = {
        songId,
        progress: 0,
        isDownloading: false,
        isDownloaded: false,
        error: undefined,
      };
    });
  },

  getDownloadState: (songId: string) => {
    return get().downloads[songId];
  },
});
