import { useMemo } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '../../components/Text';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { DownloadButton } from '../../components/DownloadButton';
import { createStyles } from './styles';
import FastImage from '@d11/react-native-fast-image';
import { useGetSongById } from '../../hooks';
import { useDownloadSong } from '../../hooks/useDownloadSong';
import { useTheme } from '../../hooks/useTheme';
import { formatDuration } from '../../shared/utils/duration';
import { UI_CONSTANTS } from '../../shared/constants/ui';

export const SongDetailsScreen = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, 'SongDetails'>>();

  const song = useGetSongById(params.songId);
  const { downloadState, handleButtonPress } = useDownloadSong(song);
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const isDownloaded = downloadState?.isDownloaded ?? false;
  const isDownloading = downloadState?.isDownloading ?? false;
  const progress = downloadState?.progress ?? 0;

  if (!song) {
    return (
      <View style={styles.container}>
        <View style={styles.scrollContent}>
          <Text variant="headlineMedium" color="text">
            Song not found
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          {/* Thumbnail */}
          <View style={styles.thumbnailContainer}>
            <FastImage
              source={{ uri: song.thumbnail }}
              style={styles.thumbnail}
            />
          </View>

          {/* Song Information */}
          <View style={styles.songInfoContainer}>
            <Text
              variant="headlineLarge"
              style={styles.title}
              numberOfLines={2}
            >
              {song.title}
            </Text>

            <Text
              variant="bodyLarge"
              color="textSecondary"
              style={styles.artist}
              numberOfLines={1}
            >
              {song.artist}
            </Text>

            <Text
              variant="bodyMedium"
              color="textSecondary"
              style={styles.album}
              numberOfLines={1}
            >
              {song.album}
            </Text>

            {/* Duration Badge */}
            <View style={styles.durationBadge}>
              <Text style={styles.durationText}>
                Duration: {formatDuration(song.duration)}
              </Text>
            </View>
          </View>

          {/* Download/Play Button */}
          <View style={styles.downloadButtonContainer}>
            <TouchableOpacity
              style={styles.downloadButtonContainer}
              onPress={handleButtonPress}
              activeOpacity={UI_CONSTANTS.ACTIVE_OPACITY}
            >
              <DownloadButton
                onPress={handleButtonPress}
                isDownloading={isDownloading}
                progress={progress}
                size="xxl"
                isDownloaded={isDownloaded}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
