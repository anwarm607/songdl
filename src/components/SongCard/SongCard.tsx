import { TouchableOpacity, View } from 'react-native';
import { Card } from '../Card';
import { styles } from './styles';
import { Row } from '../Row';
import { Text } from '../Text';
import { DownloadButton } from '../DownloadButton';
import FastImage from '@d11/react-native-fast-image';
import { useDownloadSong } from '../../hooks/useDownloadSong';
import { UI_CONSTANTS } from '../../shared/constants/ui';
import { Song } from '../../screens/SongsList/types';

interface ISongCardProps {
  song: Song;
  onPress: () => void;
}

export const SongCard = ({ song, onPress }: ISongCardProps) => {
  const { downloadState, handleButtonPress } = useDownloadSong(song);

  const isDownloaded = downloadState?.isDownloaded ?? false;
  const isDownloading = downloadState?.isDownloading ?? false;
  const progress = downloadState?.progress ?? 0;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={UI_CONSTANTS.ACTIVE_OPACITY}
    >
      <Card
        pv={12}
        ph={12}
        borderRadius={12}
        borderColor="border"
        borderWidth={UI_CONSTANTS.DEFAULT_BORDER_WIDTH}
        style={styles.card}
      >
        <Row center isSpaceBetween style={styles.outerRow}>
          <Row center style={styles.innerRow}>
            {/* Thumbnail */}
            <FastImage
              source={{ uri: song.thumbnail }}
              style={styles.thumbnail}
            />

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

          {/* Download/Play Button */}
          <TouchableOpacity
            style={styles.downloadButtonContainer}
            onPress={handleButtonPress}
            activeOpacity={UI_CONSTANTS.ACTIVE_OPACITY}
          >
            <DownloadButton
              isDownloaded={isDownloaded}
              onPress={handleButtonPress}
              isDownloading={isDownloading}
              progress={progress}
            />
          </TouchableOpacity>
        </Row>
      </Card>
    </TouchableOpacity>
  );
};
