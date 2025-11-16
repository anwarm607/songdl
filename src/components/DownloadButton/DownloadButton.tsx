import { DownloadIcon } from '../../assets/icons/DownloadIcon';
import { Button } from '../Button';

interface IDownloadButton {
  onPress: () => void;
}

export const DownloadButton = ({ onPress }: IDownloadButton) => {
  return (
    <Button onPress={onPress} shape="circle" variant="icon" borderWidth={2}>
      <DownloadIcon />
    </Button>
  );
};
