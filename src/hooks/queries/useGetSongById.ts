import { useQueryClient } from '@tanstack/react-query';
import { Song } from '../../screens/SongsList/types';

/**
 * Hook to retrieve a song by ID from the cached infinite query data
 * This avoids additional API calls since the list response contains all song information
 */
export const useGetSongById = (songId: string): Song | undefined => {
  const queryClient = useQueryClient();

  // Get the cached data from the infinite query
  const cachedData = queryClient.getQueryData(['songs', 'infinite', 10]);

  if (!cachedData) {
    return undefined;
  }

  // Extract all songs from all pages and find the one with matching ID
  const allSongs = (cachedData as any).pages?.flatMap((page: any) => page.data) ?? [];
  const song = allSongs.find((s: Song) => s.id === songId);

  return song;
};
