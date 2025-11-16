import React from 'react';
import { FlatList, View } from 'react-native';
import { styles } from './styles';
import { mockSongs } from './mock';
import { SongCard } from '../../components/SongCard';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const SongListScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSongPress = (id: string) => {
    navigation.navigate('SongDetails', {
      songId: id,
    });
  };
  
  return (
    <View>
      <FlatList
        data={[...mockSongs, ...mockSongs]}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <SongCard song={item} onPress={() => handleSongPress(item.id)} />
        )}
        contentInset={{
          bottom: 120,
        }}
      />
    </View>
  );
};
