import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Card } from '../Card';
import { styles } from './styles';
import { lightColors } from '../../theme';
import { Row } from '../Row';

interface ISongCardProps {
  song: { thumbnail: string; title: string; artist: string; album: string };
  onPress: () => void;
}

export const SongCard = ({ song, onPress }: ISongCardProps) => {
  const colors = lightColors;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.7}
    >
      <Card pv={12} ph={12} borderRadius={12} borderColor="border" borderWidth={1}>
        <Row center>
        {/* Thumbnail */}
        <Image source={{ uri: song.thumbnail }} style={styles.thumbnail} />

        {/* Song Info */}
        <View style={styles.infoContainer}>
          <Text
            style={[
              styles.title,
              {
                color: colors.text,
              },
            ]}
            numberOfLines={1}
          >
            {song.title}
          </Text>
          <Text
            style={[
              styles.artist,
              {
                color: colors.textSecondary,
              },
            ]}
            numberOfLines={1}
          >
            {song.artist}
          </Text>
          <Text
            style={[
              styles.album,
              {
                color: colors.textSecondary,
              },
            ]}
            numberOfLines={1}
          >
            {song.album}
          </Text>
        </View>
        </Row>
      </Card>
    </TouchableOpacity>
  );
};
