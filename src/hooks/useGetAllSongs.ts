import { useInfiniteQuery } from '@tanstack/react-query';
import { Config } from 'react-native-config';
import { paths } from '../config/api';
import { Song } from '../screens/SongsList/types';
import axios from 'axios';

interface GetAllSongsParams {
  pageNo: number;
  pageSize: number;
}

interface GetAllSongsResponse {
  data: Song[];
  totalPages: number;
  pageNumber?: number;
  currentPage?: number;
}

const getAllSongs = async (
  params: GetAllSongsParams,
): Promise<GetAllSongsResponse> => {
  try {
    const { pageNo, pageSize } = params;
    const url = `${Config.BASE_URL}${paths.fetchSongs}?pageNumber=${pageNo}&pageSize=${pageSize}`;

    const response = await axios({
      url,
      method: 'GET',
    });

    return response.data;
  } catch (error) {
    console.error('[API] Error occurred:', error);
    throw error;
  }
};

export const useGetAllSongsInfinite = (pageSize: number) => {
  return useInfiniteQuery({
    queryKey: ['songs', 'infinite', pageSize],
    queryFn: async ({ pageParam }) => {
      const result = await getAllSongs({ pageNo: pageParam, pageSize });
      return result;
    },
    getNextPageParam: (lastPage: GetAllSongsResponse, pages) => {
      // Get the actual page number from the response
      const currentPageNumber =
        lastPage.pageNumber ??
        pages.length;

      // If current page is less than total pages, there are more pages to fetch
      return currentPageNumber < lastPage.totalPages
        ? currentPageNumber + 1
        : undefined;
    },
    initialPageParam: 1,
  });
};
