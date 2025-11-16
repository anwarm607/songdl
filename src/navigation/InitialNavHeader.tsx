import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Text } from '../components/Text';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { lightColors } from '../theme';

export const InitialNavHeader = ({ options }: NativeStackHeaderProps) => {
  const color = lightColors;
  return (
    <SafeAreaView
      edges={['top']}
      style={[{ backgroundColor: color.background }, styles.navHeaderContainer]}
    >
      <Text variant="headlineLarge" color="text">
        {options.title}
      </Text>
    </SafeAreaView>
  );
};
