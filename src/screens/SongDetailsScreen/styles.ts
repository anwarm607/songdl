import { StyleSheet } from "react-native";
import { hexToRgba } from "../../shared/utils/convertRgba";
import { Colors } from "../../theme";

export const createStyles = (colors: Colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
    boxShadow: `3px 10px 42px 6px ${hexToRgba(colors.black, 0.25)}`

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
    backgroundColor: colors.surface,
  },
  durationText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  downloadButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});