import { InteractionManager, Platform } from 'react-native';
import moment from 'moment';
import ReactNativeBlobUtil, {
  ReactNativeBlobUtilConfig,
} from 'react-native-blob-util';
import { getSystemVersion } from 'react-native-device-info';
import FileViewer from 'react-native-file-viewer';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

export interface DownloadProgressCallback {
  (progress: number): void;
}

/**
 * Check and request storage permission for Android
 * For Android 13+ (API 33+), WRITE_EXTERNAL_STORAGE is no longer needed
 * as scoped storage is used for downloads
 */
const requestStoragePermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') {
    return true;
  }

  try {
    const deviceVersion = parseFloat(getSystemVersion());

    if (deviceVersion >= 10) {
      return true;
    }
    return new Promise<boolean>(resolve => {
      InteractionManager.runAfterInteractions(async () => {
        try {
          const permissionStatus = await check(
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          );

          if (permissionStatus === RESULTS.GRANTED) {
            resolve(true);
            return;
          }

          try {
            const requestResult = await request(
              PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
            );

            resolve(requestResult === RESULTS.GRANTED);
          } catch (requestError) {
            console.error('Permission request error: ', requestError);
            resolve(false);
          }
        } catch (checkError) {
          console.error('Permission check error: ', checkError);
          resolve(false);
        }
      });
    });
  } catch (error) {
    console.error('Storage permission error: ', error);
    return false;
  }
};

/**
 * Download a music file without automatically opening it
 * @param url - The URL of the music file to download
 * @param fileName - The name of the file (without extension)
 * @param onProgress - Callback for download progress (0-100)
 */
export const downloadMusicFile = async (
  url: string,
  fileName: string,
  onProgress?: DownloadProgressCallback,
): Promise<{ filePath: string; status: 'success' | 'failed' }> => {
  try {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      throw new Error('Storage permission denied');
    }

    const filePath = await downloadFile(url, fileName, onProgress);
    return { filePath, status: 'success' };
  } catch (error) {
    console.error('Download music file error: ', error);
    return { filePath: '', status: 'failed' };
  }
};

/**
 * Open a music file with the native player
 * @param filePath - The path to the music file
 */
export const openMusicFile = async (filePath: string): Promise<void> => {
  try {
    await openFileViewer(filePath);
  } catch (error) {
    throw error;
  }
};

/**
 * Open an already downloaded file with the native file viewer
 */
export const openFileViewer = async (filePath: string): Promise<void> => {
  try {
    const cleanPath = filePath.replace(/^file:\/\//, '');
    const exists = await ReactNativeBlobUtil.fs.exists(cleanPath);
    if (!exists) {
      throw new Error('File does not exist: ' + cleanPath);
    }

    await FileViewer.open(cleanPath, { showOpenWithDialog: true });
  } catch (e) {
    throw e;
  }
};

/**
 * Internal: Download file to disk
 */
const downloadFile = async (
  url: string,
  filename: string,
  onProgress?: DownloadProgressCallback,
): Promise<string> => {
  try {
    const extension = 'mp3';

    const { dirs } = ReactNativeBlobUtil.fs;
    const { config } = ReactNativeBlobUtil;

    const aPath = Platform.select({
      ios: dirs.DocumentDir,
      android: dirs.DownloadDir,
    });

    const fPath = `${aPath}/${filename}-${moment().format(
      'YYYYMMDDHHmmss',
    )}.${extension}`;

    const configOptions = Platform.select({
      ios: {
        fileCache: true,
        path: fPath,
        notification: true,
      },
      android: {
        fileCache: false,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: fPath,
          description: 'Downloading...',
        },
      },
    });

    if (!aPath || !fPath) {
      throw new Error('Cannot determine download path');
    }

    return await config(configOptions as ReactNativeBlobUtilConfig)
      .fetch('GET', url, {})
      .progress((received: string, total: string) => {
        const _received = Number(received);
        const _total = Number(total);
        if (_total > 0) {
          const progress = Math.round((_received / _total) * 100);
          onProgress?.(progress);
        }
      })
      .then(_res => {
        return fPath;
      })
      .catch((error: Error) => {
        throw new Error('Download file error: ' + error.message);
      });
  } catch (error) {
    throw error;
  }
};
