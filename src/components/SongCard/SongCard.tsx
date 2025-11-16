import { Image, TouchableOpacity, View } from 'react-native';
import { Card } from '../Card';
import { styles } from './styles';
import { Row } from '../Row';
import { Text } from '../Text';
import { DownloadButton } from '../DownloadButton';

interface ISongCardProps {
  song: { thumbnail: string; title: string; artist: string; album: string };
  onPress: () => void;
}

export const SongCard = ({ song, onPress }: ISongCardProps) => {
  const handleDownload = () => {
    console.log('Downloading...');
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.7}
    >
      <Card
        pv={12}
        ph={12}
        borderRadius={12}
        borderColor="border"
        borderWidth={1}
        style={styles.card}
      >
        <Row center isSpaceBetween style={{flex: 1}}>
          <Row center style={{flex: 1}}>
            {/* Thumbnail */}
            <Image source={{ uri: song.thumbnail }} style={styles.thumbnail} />

            {/* Song Info */}
            <View style={styles.infoContainer}>
              <Text
                variant="titleMedium"
                style={styles.title}
                numberOfLines={1}
              >
                {song.title}
              </Text>
              <Text
                variant="bodySmall"
                color="textSecondary"
                style={styles.artist}
                numberOfLines={1}
              >
                {song.artist}
              </Text>
              <Text
                variant="captionLarge"
                color="textSecondary"
                numberOfLines={1}
              >
                {song.album}
              </Text>
            </View>
          </Row>

          {/* Download Button */}
          <View style={styles.downloadButtonContainer}>
            <DownloadButton onPress={handleDownload} />
          </View>
        </Row>
      </Card>
    </TouchableOpacity>
  );
};
