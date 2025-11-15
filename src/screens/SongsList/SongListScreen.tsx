import React from 'react';
import { FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { lightColors } from '../../theme';
import { mockSongs } from './mock';
import { SongCard } from '../../components/SongCard';

export const SongListScreen = () => {
  const colors = lightColors;

  const handleSongPress = (id: string) =>{
    console.log("Clicked", id)
  }
  return (
    <SafeAreaView>
      <Text
        style={[
          styles.header,
          {
            color: colors.text,
          },
        ]}
      >
        Songs
      </Text>

      <FlatList
        data={mockSongs}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <SongCard
            song={item}
            onPress={() => handleSongPress(item.id)}
          />
        )}
        scrollIndicatorInsets={{ right: 1 }}
      />
    </SafeAreaView>
  );
};
