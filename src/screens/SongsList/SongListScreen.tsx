import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { styles } from './styles';
import { SongCard } from '../../components/SongCard';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useGetAllSongsInfinite } from '../../hooks';
import { FlashList } from "@shopify/flash-list";


const PAGE_SIZE = 10;

export const SongListScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {
    data,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetAllSongsInfinite(PAGE_SIZE);

  const handleSongPress = (id: string) => {
    navigation.navigate('SongDetails', {
      songId: id,
    });
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const songs = data?.pages?.flatMap(page => page?.data ?? []) ?? [];

  if (isLoading) {
    return (
      <View style={styles.containerCenter}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.containerCenter}>
        <Text>Error loading songs: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlashList
        data={songs}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <SongCard song={item} onPress={() => handleSongPress(item.id)} />
        )}
        contentInset={{
          bottom: 120,
        }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? <ActivityIndicator size="small" /> : null
        }
        extraData={songs.length}
      />
    </View>
  );
};
