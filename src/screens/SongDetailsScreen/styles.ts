import { StyleSheet } from "react-native";
import { lightColors } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  thumbnailContainer: {
    width: '90%',
    height: 330,
    alignSelf: 'center',
    marginBottom: 40,
    borderRadius: 20,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
     borderRadius: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  songInfoContainer: {
    marginBottom: 40,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  artist: {
    marginBottom: 12,
    textAlign: 'center',
  },
  album: {
    textAlign: 'center',
    marginBottom: 24,
  },
  durationBadge: {
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: lightColors.surface,
  },
  durationText: {
    fontSize: 12,
    color: lightColors.textSecondary,
  },
  downloadButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});