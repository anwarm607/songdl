import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Text } from '../components/Text';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';

export const InitialNavHeader = ({ options }: NativeStackHeaderProps) => {
  const { colors } = useTheme();
  return (
    <SafeAreaView
      edges={['top']}
      style={[{ backgroundColor: colors.background }, styles.navHeaderContainer]}
    >
      <Text variant="headlineLarge" color="text">
        {options.title}
      </Text>
    </SafeAreaView>
  );
};
