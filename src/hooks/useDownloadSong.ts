import { useCallback } from 'react';
import { downloadMusicFile, openMusicFile } from '../shared/utils/downloadManager';
import { useStore } from '../store';
import { DownloadState } from '../store/types';
import { Song } from '../screens/SongsList/types';

interface UseDownloadSongReturn {
  downloadState: DownloadState | undefined;
  handleDownload: () => Promise<void>;
  handleButtonPress: () => Promise<void>;
  canDownload: boolean;
  canOpenFile: boolean;
}

/**
 * Reusable hook for handling song downloads
 * Eliminates duplicate logic between SongCard and SongDetailsScreen
 */
export const useDownloadSong = (song: Song | undefined): UseDownloadSongReturn => {
  const { startDownload, updateProgress, completeDownload, failDownload, setDownloadFilePath } =
    useStore();
  const downloadState = useStore(state => (song ? state.downloads[song.id] : undefined));

  const handleDownload = useCallback(async () => {
    if (!song || downloadState?.isDownloading) {
      return;
    }

    startDownload(song.id);

    try {
      const result = await downloadMusicFile(
        song.url,
        song.title,
        (progress: number) => {
          updateProgress(song.id, progress);
        },
      );

      if (result.status === 'success') {
        setDownloadFilePath(song.id, result.filePath);
        completeDownload(song.id);
      } else {
        failDownload(song.id, 'Download failed');
      }
    } catch (error) {
      failDownload(
        song.id,
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  }, [song, downloadState?.isDownloading, startDownload, updateProgress, completeDownload, failDownload, setDownloadFilePath]);

  const handleButtonPress = useCallback(async () => {
    if (!song) {
      return;
    }

    const filePath = downloadState?.filePath;
    const canOpen = downloadState?.isDownloaded && filePath;
    
    if (canOpen && filePath) {
      try {
        await openMusicFile(filePath);
      } catch (error) {
        console.error('Error opening music file:', error);
      }
    } else {
      await handleDownload();
    }
  }, [song, downloadState, handleDownload]);

  const canDownload = !downloadState?.isDownloading;
  const canOpenFile = Boolean(downloadState?.isDownloaded && downloadState.filePath);

  return {
    downloadState,
    handleDownload,
    handleButtonPress,
    canDownload,
    canOpenFile,
  };
};

