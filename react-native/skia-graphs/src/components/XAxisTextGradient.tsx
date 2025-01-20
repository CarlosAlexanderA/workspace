import {Text, useFont} from '@shopify/react-native-skia';

type Props = {
  x: number;
  y: number;
  text: string;
};

export const XAxisTextGradient = ({x, y, text}: Props) => {
  const font = useFont(
    require('../../src/assets/fonts/Roboto-Regular.ttf'),
    18
  );

  if (!font) {
    return null;
  }

  const fontSize = font.measureText(text);
  return (
    <Text
      text={text}
      color={'white'}
      font={font}
      x={x - fontSize.width / 2}
      y={y}
    />
  );
};
