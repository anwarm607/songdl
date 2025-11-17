import { View, ScrollView } from 'react-native';
import { Text } from '../../components/Text';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { mockSongs } from '../SongsList/mock';
import { DownloadButton } from '../../components/DownloadButton';
import { useState } from 'react';
import { styles } from './styles';
import { hexToRgba } from '../../shared/utils/convertRgba';
import { lightColors } from '../../theme';
import FastImage from '@d11/react-native-fast-image';

const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const SongDetailsScreen = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, 'SongDetails'>>();

  const song = mockSongs.find(s => s.id === params.songId);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadState, setDownloadState] = useState<
    'idle' | 'downloading' | 'completed' | 'error'
  >('idle');

  const colors = lightColors;

  const handleDownloadPress = () => {
    if (downloadState === 'idle') {
      setDownloadState('downloading');
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setDownloadProgress(100);
          setDownloadState('completed');
          setTimeout(() => {
            setDownloadProgress(0);
            setDownloadState('idle');
          }, 2000);
        } else {
          setDownloadProgress(progress);
        }
      }, 500);
    }
  };

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
          <View style={[styles.thumbnailContainer, {
                boxShadow: `3px 10px 42px 6px ${hexToRgba(colors.black, 0.25)}`
          }]}>
            <FastImage source={{ uri: song.thumbnail }} style={styles.thumbnail} />
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

          {/* Download Button */}
          <View style={styles.downloadButtonContainer}>
            <DownloadButton
              onPress={handleDownloadPress}
              progress={downloadProgress}
              state={downloadState}
              size='xxl'
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
