import { lightColors } from '../theme/colors';

export interface DownloadState {
  songId: string;
  progress: number;
  isDownloading: boolean;
  isDownloaded: boolean;
  filePath?: string;
  error?: string;
}

export interface DownloadSlice {
  downloads: Record<string, DownloadState>;
  startDownload: (songId: string) => void;
  updateProgress: (songId: string, progress: number) => void;
  completeDownload: (songId: string) => void;
  failDownload: (songId: string, error: string) => void;
  resetDownload: (songId: string) => void;
  setDownloadFilePath: (songId: string, filePath: string) => void;
  getDownloadState: (songId: string) => DownloadState | undefined;
}

export interface PlaybackState {
  songId: string;
  isPlaying: boolean;
  currentPosition: number;
  duration: number;
}

export interface ThemeSlice {
  themeMode: 'light' | 'dark' | 'system';
  colors: typeof lightColors;
  setThemeMode: (mode: 'light' | 'dark' | 'system', systemColorScheme?: 'light' | 'dark' | null | 'unspecified') => void;
  initializeTheme: (systemColorScheme?: 'light' | 'dark' | null | 'unspecified') => void;
}

export type CombinedStoreState = DownloadSlice & ThemeSlice;
